import * as vscode from 'vscode-languageserver/node'
import type { Connection_Context } from '../connection_context'
import { reference_document } from '../helpers/reference_document'
import { symbol_at } from '../helpers/reference_index'
import { create_range_from_range } from '../helpers/range'

export const create_on_document_highlight = (
    context: Connection_Context,
): vscode.ServerRequestHandler<vscode.DocumentHighlightParams, vscode.DocumentHighlight[] | null, vscode.DocumentHighlight[], void> => async (params) => {
    const loaded = await reference_document(context, params)
    if (loaded === null) return []
    const target = symbol_at(loaded.index, params.position)
    if (target === undefined) return []
    return [
        vscode.DocumentHighlight.create(create_range_from_range(target.symbol.declaration.range), vscode.DocumentHighlightKind.Write),
        ...target.symbol.references.map((reference) =>
            vscode.DocumentHighlight.create(create_range_from_range(reference.range), vscode.DocumentHighlightKind.Read)),
    ]
}
