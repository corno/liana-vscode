import * as vscode from 'vscode-languageserver/node'
import type * as resolved from 'liana-authoring/schemas/resolve_result/schema'
import * as values from 'liana-authoring/schemas/resolve_result/transformers/find_value'
import * as errors from 'liana-authoring/schemas/resolve_result/transformers/resolve_errors'
import type { Connection_Context } from '../connection_context'
import { load_document } from '../to_be_backend/load_document'
import { create_range_from_range } from './range'
import { dictionary_entry_edit, generated_snippet } from './generated_snippet'

export const missing_reference_actions = async (
    context: Connection_Context,
    params: vscode.CodeActionParams,
): Promise<vscode.CodeAction[]> => {
    if (params.context.only && !params.context.only.some((kind) =>
        kind === vscode.CodeActionKind.QuickFix || vscode.CodeActionKind.QuickFix.startsWith(kind + '.'))) return []
    const document = context.documents.get(params.textDocument.uri)
    if (document === undefined) return []
    const loaded = await new Promise<resolved.Document | null>((resolve, reject) => load_document(
        document, context.cache,
        (error) => {
            // Source syntax errors are reported by diagnostics, not failed code-action requests.
            if (error[0] === 'deserialize parse tree') return null
            reject(new vscode.ResponseError(vscode.ErrorCodes.InternalError,
                'Cannot load document for reference creation: ' + JSON.stringify(error)))
            return null
        },
        (instance) => instance[0] === 'constrained' ? instance[1] : null,
        resolve,
    ))
    if (loaded === null) return []
    const owned = values.Values(loaded.content).__get_raw()
    const dictionaries = owned.flatMap((value) => {
        const result = value['unmarshall result']
        return result[0] === 'success' && result[1][0] === 'dictionary' ? [result[1][1]] : []
    })
    const style = context['document notation styles'].get(document.uri)
        ?? context['document notation styles'].get('__default__') ?? 'verbose'
    const actions: vscode.CodeAction[] = []
    const add = async (dictionary: resolved.Dictionary, id: string, range: vscode.Range, title: string, message: string) => {
        if (document.offsetAt(params.range.end) < document.offsetAt(range.start)
            || document.offsetAt(params.range.start) > document.offsetAt(range.end)) return
        if (dictionary.unmarshalled.derived.entries.__get_raw().some(([name]) => name === id)) return
        const insertion = dictionary_entry_edit(document, dictionary, [id], style)
        if (insertion === undefined) return
        const edit = await generated_snippet(context, document, insertion, style)
        actions.push({
            title,
            kind: vscode.CodeActionKind.QuickFix,
            diagnostics: [{ range, message, severity: vscode.DiagnosticSeverity.Error }],
            edit: { documentChanges: [vscode.TextDocumentEdit.create(
                { uri: document.uri, version: document.version }, [edit],
            )] },
        })
    }
    for (const value of owned) {
        const result = value['unmarshall result']
        if (result[0] !== 'success' || result[1][0] !== 'reference' || result[1][1][0] !== 'selected') continue
        const reference = result[1][1][1]
        const range = create_range_from_range(reference.unmarshalled.intermediate.instance.range)
        if (document.offsetAt(params.range.end) < document.offsetAt(range.start)
            || document.offsetAt(params.range.start) > document.offsetAt(range.end)) continue
        const id = reference.unmarshalled.intermediate.instance.token.value
        if (!errors.Value(value).__get_raw().some((error) => error.type[0] === 'missing reference' && error.type[1] === id)) continue
        const target = value['reference dictionary']?.__get_raw()
        if (target === undefined || target === null) continue
        const dictionary = dictionaries.find((dictionary) => dictionary.unmarshalled === target[0])
        if (dictionary !== undefined) await add(dictionary, id, range,
            `Create entry '${id}' in referenced dictionary`, `Reference '${id}' does not exist.`)
    }
    for (const supplied of dictionaries) {
        const benchmark = supplied.benchmark.__get_raw()
        if (benchmark === null || benchmark[0].selection[0] !== 'resolved') continue
        const selected = benchmark[0].selection[1]['unmarshall result']
        if (selected[0] !== 'success' || selected[1][0] !== 'dictionary') continue
        const targetDictionary = selected[1][1].unmarshalled
        const target = dictionaries.find((dictionary) => dictionary.unmarshalled === targetDictionary)
        if (target === undefined) continue
        for (const [id, entry] of supplied.unmarshalled.derived.entries.__get_raw()) {
            if (entry.result[0] !== 'success') continue
            const range = create_range_from_range(entry.result[1].intermediate['id value pair'].id.range)
            await add(target, id, range, `Add entry '${id}' to benchmark dictionary`,
                `Entry '${id}' does not exist in the benchmark dictionary.`)
        }
    }
    return context.documents.get(document.uri)?.version === document.version ? actions : []
}
