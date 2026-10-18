import * as vscode from 'vscode-languageserver/node'
import type { Connection_Context } from '../connection_context'
import { reference_document } from '../helpers/reference_document'
import { symbol_at } from '../helpers/reference_index'
import { create_range_from_range } from '../helpers/range'

export const create_on_references = (
    context: Connection_Context,
): vscode.ServerRequestHandler<vscode.ReferenceParams, vscode.Location[] | null, vscode.Location[], void> => async (params) => {
    const loaded = await reference_document(context, params)
    if (loaded === null) return []
    const target = symbol_at(loaded.index, params.position)
    if (target === undefined) return []
    const ranges = target.symbol.references.map((reference) => reference.range)
    if (params.context.includeDeclaration) ranges.unshift(target.symbol.declaration.range)
    return ranges.map((range) => vscode.Location.create(loaded.document.uri, create_range_from_range(range)))
}
