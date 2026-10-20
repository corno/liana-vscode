import * as p from 'pareto-core/transformer'
import * as vscode from 'vscode-languageserver/node'
import { TextDocument } from 'vscode-languageserver-textdocument'
import type * as resolved from 'liana-authoring/schemas/resolve_result/schema'
import type * as schema from 'pareto-liana/modules/schema.generated/schemas/resolved/schema'
import * as children from 'liana-authoring/schemas/resolve_result/transformers/find_value'
import * as skeleton from 'liana-authoring/schemas/liana_schema/transformers/authoring_target'
import { Missing_Benchmark_Entries } from 'liana-authoring/schemas/resolve_result/transformers/resolve_errors'
import * as serialize from 'astn/modules/authoring_target/schemas/authoring_target/transformers/serialized'
import * as full_range from 'astn-runtime/modules/deserialization/schemas/parse_tree/transformers/full_value_range'
import type { Connection_Context } from '../connection_context'
import { create_cache } from '../core/cache'
import { load_document } from '../to_be_backend/load_document'
import { create_range_from_range } from './range'
import { quote_identifier } from './quote_identifier'

export const dictionary_entry_edit = (
    document: TextDocument,
    dictionary: resolved.Dictionary,
    missing: readonly string[],
    style: 'verbose' | 'concise',
): vscode.TextEdit | undefined => {
    const close = create_range_from_range(dictionary.unmarshalled.intermediate.instance['}'].range).start
    if (document.getText().charAt(document.offsetAt(close)) !== '}') return undefined
    const linePrefix = document.getText({ start: { line: close.line, character: 0 }, end: close })
    const base = linePrefix.match(/^[\t ]*/)?.[0] ?? ''
    const indent = base + '    '
    const entries = missing.map((id) => {
        const lines = serialize.Value(skeleton.Value(dictionary.unmarshalled.definition.value, { style: [style, null] }),
            { paragraph: { indentation: '    ' }, value: { 'write delimiters': true } }).__get_raw()
        return indent + quote_identifier(id) + ': ' + lines.map((line, index) => index === 0 ? line : indent + line).join('\n')
    }).join('\n')
    const ownLine = /^[\t ]*$/.test(linePrefix)
    const range = ownLine ? vscode.Range.create(close.line, 0, close.line, 0) : vscode.Range.create(close, close)
    return vscode.TextEdit.replace(range, (ownLine ? '' : '\n') + entries + '\n' + (ownLine ? '' : base))
}

// Expand generated values using the resolved sibling and parameter context.
export const generated_snippet = async (
    context: Connection_Context,
    document: TextDocument,
    edit: vscode.TextEdit,
    style: 'verbose' | 'concise',
): Promise<vscode.TextEdit> => {
    const start = document.offsetAt(edit.range.start)
    let text = edit.newText
    let version = document.version
    for (;;) {
        const proposed = TextDocument.create(document.uri, document.languageId, ++version,
            document.getText().slice(0, start) + text + document.getText().slice(document.offsetAt(edit.range.end)))
        const loaded = await new Promise<resolved.Document | null>((resolve, reject) => load_document(
            proposed, { schemas: context.cache.schemas, documents: create_cache() },
            (error) => { reject(new vscode.ResponseError(vscode.ErrorCodes.InternalError,
                'Cannot resolve generated snippet: ' + JSON.stringify(error))); return null },
            (instance) => instance[0] === 'constrained' ? instance[1] : null,
            resolve,
        ))
        if (loaded === null) return { ...edit, newText: text }
        const select = (value: resolved.Value, ancestors: readonly schema.namespaces.structure.types.Value[]): vscode.TextEdit | undefined => {
            const definition = value.unmarshalled.definition
            const range = create_range_from_range(full_range.Value(value.unmarshalled.instance))
            const from = proposed.offsetAt(range.start)
            const to = proposed.offsetAt(range.end)
            if (from < start || to > start + text.length) {
                for (const child of children.Children(value).__get_raw()) {
                    const found = select(child, ancestors)
                    if (found !== undefined) return found
                }
                return undefined
            }
            const result = value['unmarshall result']
            if (result[0] === 'success' && result[1][0] === 'dictionary' && !ancestors.includes(definition)) {
                const dictionary = result[1][1]
                const missing = Missing_Benchmark_Entries(dictionary).__get_raw()
                if (missing.length !== 0) {
                    const edit = dictionary_entry_edit(proposed, dictionary, missing, style)
                    if (edit !== undefined) return edit
                }
            }

            if (definition[0] === 'state' && !ancestors.includes(definition)) {
                const instance = value.unmarshalled.instance.type
                const missing = instance[0] === 'missing' || (instance[0] === 'concrete'
                    && instance[1][0] === 'state' && instance[1][1].status[0] === 'missing')
                const checks = value['state option constraints']
                if (missing && checks !== undefined) {
                    const eligible = checks.__get_raw().filter(([, constraints]) =>
                        constraints.__get_raw().every(([, result]) => result[0] === 'resolved'))
                    const unknown = checks.__get_raw().some(([, constraints]) =>
                        !constraints.__get_raw().some(([, result]) => result[0] === 'constraint failed')
                        && constraints.__get_raw().some(([, result]) => result[0] !== 'resolved'))
                    if (!unknown && eligible.length === 1) {
                        const id = eligible[0]![0]
                        const option = definition[1].options.__get_raw().find(([name]) => name === id)?.[1]
                        if (option !== undefined) {
                            const lines = serialize.Value({ data: ['concrete', { type: ['state', {
                                '|': { comments: p.literal.list([]) },
                                status: ['set', { option: id, value: skeleton.Value(option.value, { style: [style, null] }) }],
                            }] }] }, { paragraph: { indentation: '    ' }, value: { 'write delimiters': true } }).__get_raw()
                            const indent = proposed.getText({ start: { line: range.start.line, character: 0 }, end: range.start }).match(/^[\t ]*/)?.[0] ?? ''
                            return vscode.TextEdit.replace(range, lines.map((line, index) => index === 0 ? line : indent + line).join('\n'))
                        }
                    }
                }
            }
            for (const child of children.Children(value).__get_raw()) {
                const found = select(child, definition[0] === 'state' || definition[0] === 'dictionary' ? [...ancestors, definition] : ancestors)
                if (found !== undefined) return found
            }
            return undefined
        }
        const next = select(loaded.content, [])
        if (next === undefined) return { ...edit, newText: text }
        const from = proposed.offsetAt(next.range.start) - start
        const to = proposed.offsetAt(next.range.end) - start
        text = text.slice(0, from) + next.newText + text.slice(to)
    }
}
