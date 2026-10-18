import type * as vscode from 'vscode-languageserver/node'
import type { Connection_Context } from '../connection_context'
import { load_document } from '../to_be_backend/load_document'
import { reference_index } from './reference_index'

export const reference_document = (
    context: Connection_Context,
    params: vscode.TextDocumentPositionParams,
) => {
    const document = context.documents.get(params.textDocument.uri)
    if (document === undefined) return Promise.resolve(null)
    return new Promise<{
        document: typeof document
        resolved: import('liana-authoring/schemas/resolve_result/schema').Document
        index: ReturnType<typeof reference_index>
    } | null>((resolve) => load_document(
        document, context.cache, () => null,
        (instance) => instance[0] === 'constrained'
            ? { document, resolved: instance[1], index: reference_index(instance[1]) } : null,
        resolve,
    ))
}
