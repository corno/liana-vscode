import * as vscode from 'vscode-languageserver/node'
import { TextDocument } from 'vscode-languageserver-textdocument'
import * as values from 'liana-authoring/schemas/resolve_result/transformers/find_value'
import { Missing_Benchmark_Entries } from 'liana-authoring/schemas/resolve_result/transformers/resolve_errors'
import type { Connection_Context } from '../connection_context'
import { load_document } from '../to_be_backend/load_document'
import { dictionary_entry_edit, generated_snippet } from './generated_snippet'
import { create_cache } from '../core/cache'
import { create_position_from_location } from './range'

export const missing_entry_actions = async (
    context: Connection_Context,
    params: vscode.CodeActionParams,
): Promise<vscode.CodeAction[]> => {
    if (params.context.only && !params.context.only.some((kind) =>
        vscode.CodeActionKind.QuickFix === kind || vscode.CodeActionKind.QuickFix.startsWith(kind + '.'))) return []
    const document = context.documents.get(params.textDocument.uri)
    if (document === undefined) return []
    const style = context['document notation styles'].get(document.uri)
        ?? context['document notation styles'].get('__default__') ?? 'verbose'
    let proposed = document
    let count = 0
    const insertions: { offset: number, text: string }[] = []
    for (;;) {
        const loaded = await new Promise<import('liana-authoring/schemas/resolve_result/schema').Document | null>((resolve, reject) => load_document(
            proposed, { schemas: context.cache.schemas, documents: create_cache() },
            (error) => {
                // Source syntax errors and missing `.liana` schema directories are reported by diagnostics,
                // not failed code-action requests.
                if (proposed === document && (error[0] === 'deserialize parse tree' || error[0] === 'schema path')) return null
                reject(new vscode.ResponseError(vscode.ErrorCodes.InternalError,
                    'Cannot load document for missing-entry fixes: ' + JSON.stringify(error)))
                return null
            },
            (instance) => instance[0] === 'constrained' ? instance[1] : null,
            resolve,
        ))
        if (loaded === null) return []
        const edits: vscode.TextEdit[] = []
        let relevant = false
        const collect = (value: import('liana-authoring/schemas/resolve_result/schema').Value,
            ancestors: readonly import('pareto-liana/modules/schema.generated/schemas/resolved/schema').namespaces.structure.types.Value[]) => {
            const result = value['unmarshall result']
            const definition = value.unmarshalled.definition
            if (result[0] === 'success' && result[1][0] === 'dictionary' && !ancestors.includes(definition)) {
                const dictionary = result[1][1]
                const missing = Missing_Benchmark_Entries(dictionary).__get_raw()
                const edit = missing.length === 0 ? undefined : dictionary_entry_edit(proposed, dictionary, missing, style)
                if (edit !== undefined) {
                    const instance = dictionary.unmarshalled.intermediate.instance
                    const open = create_position_from_location(instance['{'].range.start)
                    const close = create_position_from_location(instance['}'].range.start)
                    relevant ||= proposed.offsetAt(params.range.start) <= proposed.offsetAt(close)
                        && proposed.offsetAt(params.range.end) >= proposed.offsetAt(open)
                    edits.push(edit)
                    count += missing.length
                }
            }
            for (const child of values.Children(value).__get_raw()) collect(child,
                definition[0] === 'dictionary' ? [...ancestors, definition] : ancestors)
        }
        collect(loaded.content, [])
        if (insertions.length === 0 && !relevant) return []
        if (edits.length === 0) break
        edits.sort((left, right) => proposed.offsetAt(left.range.start) - proposed.offsetAt(right.range.start))
        const before = proposed
        proposed = TextDocument.create(document.uri, document.languageId, proposed.version + 1,
            TextDocument.applyEdits(proposed, edits))
        const refined: { offset: number, text: string }[] = []
        let delta = 0
        for (const edit of edits) {
            const offset = before.offsetAt(edit.range.start)
            const start = offset + delta
            const range = { start: proposed.positionAt(start), end: proposed.positionAt(start + edit.newText.length) }
            const replacement = await generated_snippet(context, proposed, { range, newText: edit.newText }, style)
            refined.push({ offset, text: replacement.newText })
            proposed = TextDocument.create(document.uri, document.languageId, proposed.version + 1,
                TextDocument.applyEdits(proposed, [replacement]))
            delta += replacement.newText.length
        }
        // Fold later insertions inside generated text back into the original insertion edit.
        for (const addition of refined.reverse()) {
            let delta = 0
            let merged = false
            for (const insertion of insertions) {
                const start = insertion.offset + delta
                if (addition.offset < start) break
                if (addition.offset <= start + insertion.text.length) {
                    const index = addition.offset - start
                    insertion.text = insertion.text.slice(0, index) + addition.text + insertion.text.slice(index)
                    merged = true
                    break
                }
                delta += insertion.text.length
            }
            if (!merged) insertions.push({ offset: addition.offset - delta, text: addition.text })
            insertions.sort((left, right) => left.offset - right.offset)
        }
    }
    if (context.documents.get(document.uri)?.version !== document.version) return []
    return [{
        title: `Add all missing required entries (${count})`,
        kind: vscode.CodeActionKind.QuickFix,
        isPreferred: true,
        diagnostics: params.context.diagnostics.filter((diagnostic) => typeof diagnostic.message === 'string'
            && diagnostic.message.startsWith('Missing required benchmark entry ')),
        edit: { documentChanges: [vscode.TextDocumentEdit.create(
            { uri: document.uri, version: document.version }, insertions.map(({ offset, text }) =>
                vscode.TextEdit.insert(document.positionAt(offset), text)),
        )] },
    }]
}
