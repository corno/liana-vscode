import * as vscode from 'vscode-languageserver/node'
import { TextDocument } from 'vscode-languageserver-textdocument'
import * as unmarshall_diagnostics from 'liana-authoring/schemas/unmarshall_result/transformers/diagnostics'
import * as resolve_diagnostics from 'liana-authoring/schemas/resolve_result/transformers/diagnostics'
import type * as resolved from 'liana-authoring/schemas/resolve_result/schema'
import type { Connection_Context } from '../connection_context'
import { reference_document } from '../helpers/reference_document'
import { reference_index, symbol_at } from '../helpers/reference_index'
import { create_range_from_range, create_range_from_possible_range } from '../helpers/range'
import { create_cache } from '../core/cache'
import { load_document } from '../to_be_backend/load_document'
import { quote_identifier } from '../helpers/quote_identifier'

const refuse = (message: string): never => {
    throw new vscode.ResponseError(vscode.LSPErrorCodes.RequestFailed, message)
}

export const create_on_prepare_rename = (
    context: Connection_Context,
): vscode.RequestHandler<vscode.PrepareRenameParams, { range: vscode.Range, placeholder: string } | null, void> => async (params) => {
    const loaded = await reference_document(context, params)
    const target = loaded === null ? undefined : symbol_at(loaded.index, params.position)
    if (target === undefined) return refuse('Rename requires a dictionary entry or a resolved reference in this document.')
    return { range: target.range, placeholder: target.symbol.declaration.name }
}

export const create_on_rename = (
    context: Connection_Context,
): vscode.ServerRequestHandler<vscode.RenameParams, vscode.WorkspaceEdit | null, never, void> => async (params) => {
    const loaded = await reference_document(context, params)
    if (loaded === null) return refuse('Cannot rename: the document could not be resolved.')
    const target = symbol_at(loaded.index, params.position)
    if (target === undefined) return refuse('Rename requires a dictionary entry or a resolved reference in this document.')
    const { symbol } = target
    if (symbol.declaration.name === params.newName) return { documentChanges: [] }
    if (symbol.declaration.dictionary.unmarshalled.derived.entries.__get_raw().some(([name]) => name === params.newName)) {
        return refuse(`Cannot rename: entry '${params.newName}' already exists in this dictionary.`)
    }
    const ranges = [symbol.declaration.range, ...symbol.references.map((reference) => reference.range)]
    const newText = quote_identifier(params.newName)
    const edits = ranges.map((range) => vscode.TextEdit.replace(create_range_from_range(range), newText))
    const offsets = edits.map((edit) => ({
        start: loaded.document.offsetAt(edit.range.start),
        end: loaded.document.offsetAt(edit.range.end),
    })).sort((a, b) => a.start - b.start)
    const translate = (offset: number, end = false): number => {
        let delta = 0
        for (const edit of offsets) {
            if (offset <= edit.start) break
            if (offset < edit.end) return edit.start + delta + (end ? newText.length : 0)
            delta += newText.length - (edit.end - edit.start)
        }
        return offset + delta
    }
    const proposed = TextDocument.create(
        loaded.document.uri, loaded.document.languageId, loaded.document.version + 1,
        TextDocument.applyEdits(loaded.document, edits),
    )
    const checked = await new Promise<resolved.Document | null>((resolve) => load_document(
        proposed, { schemas: context.cache.schemas, documents: create_cache() },
        () => null,
        (instance) => instance[0] === 'constrained' ? instance[1] : null,
        resolve,
    ))
    if (checked === null) return refuse('Cannot rename: the result could not be parsed or resolved.')
    const diagnostic_keys = (document: resolved.Document, text: TextDocument, move: (offset: number, end?: boolean) => number) =>
        [...unmarshall_diagnostics.Document(document.unmarshalled).__get_raw(), ...resolve_diagnostics.Document(document).__get_raw()]
            .filter((diagnostic) => diagnostic.severity[0] === 'error')
            .map((diagnostic) => {
                const range = diagnostic.range.__get_raw()
                const location = range === null ? undefined : create_range_from_possible_range(range[0])
                const start = location === undefined ? -1 : move(text.offsetAt(location.start))
                const end = location === undefined ? -1 : move(text.offsetAt(location.end), true)
                return { message: diagnostic.message, key: JSON.stringify([diagnostic.message, start, end]) }
            })
    const previous = diagnostic_keys(loaded.resolved, loaded.document, translate).map((diagnostic) => diagnostic.key)
    for (const diagnostic of diagnostic_keys(checked, proposed, (offset) => offset)) {
        const match = previous.indexOf(diagnostic.key)
        if (match === -1) return refuse('Cannot rename safely: it would introduce a new diagnostic: ' + diagnostic.message)
        previous.splice(match, 1)
    }
    const changed = reference_index(checked)
    const bindings = new Map(changed.references.map(({ reference, symbol }) => [
        proposed.offsetAt(create_range_from_range(reference.range).start),
        symbol === undefined ? null : proposed.offsetAt(create_range_from_range(symbol.declaration.range).start),
    ]))
    for (const { reference, symbol } of loaded.index.references) {
        const source = translate(loaded.document.offsetAt(create_range_from_range(reference.range).start))
        const destination = symbol === undefined ? null
            : translate(loaded.document.offsetAt(create_range_from_range(symbol.declaration.range).start))
        if (!bindings.has(source) || bindings.get(source) !== destination) {
            return refuse('Cannot rename safely: it would change another reference binding.')
        }
    }
    if (changed.references.length !== loaded.index.references.length) return refuse('Cannot rename safely: the reference structure would change.')
    if (context.documents.get(loaded.document.uri)?.version !== loaded.document.version) {
        throw new vscode.ResponseError(vscode.LSPErrorCodes.ContentModified, 'The document changed during rename. Please retry.')
    }
    return {
        documentChanges: [vscode.TextDocumentEdit.create(
            { uri: loaded.document.uri, version: loaded.document.version }, edits,
        )],
    }
}
