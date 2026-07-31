import * as p_ from "pareto-core/implementation/transformer"

import * as d_document_symbols from "liana-authoring/schemas/document_symbols/schema"
import * as t_unmarshall_result_to_document_symbols from "liana-authoring/schemas/unmarshall_result/transformers/document_symbols"

import * as helpers from '../helpers/range'
import { load_document } from '../to_be_backend/load_document'

import * as vscode_node from 'vscode-languageserver/node'
import { Connection_Context } from '../connection_context'

export const create_on_document_symbol: (
	connection_context: Connection_Context,
) => vscode_node.ServerRequestHandler<vscode_node.DocumentSymbolParams, vscode_node.SymbolInformation[] | vscode_node.DocumentSymbol[] | undefined | null, vscode_node.SymbolInformation[] | vscode_node.DocumentSymbol[], void> = (connection_context) => {
	return (params) => {
		const doc = connection_context.documents.get(params.textDocument.uri)
		if (doc === undefined) {
			return []
		}

		return new Promise<vscode_node.DocumentSymbol[]>(
			(resolve) => {

				function convert_value($: d_document_symbols.Value): vscode_node.DocumentSymbol[] {
					return $.children.__get_raw().map(($): vscode_node.DocumentSymbol => {
						return ({
							'name': $.name === "" ? "-empty-" : $.name, //empty strings result in a 'falsy name' errors
							'detail': $.detail,
							'kind': p_.from.state($.value.kind).decide(($) => {
								switch ($[0]) {
									case 'string': return p_.ss($, ($) => vscode_node.SymbolKind.String)
									case 'number': return p_.ss($, ($) => vscode_node.SymbolKind.Number)
									case 'boolean': return p_.ss($, ($) => vscode_node.SymbolKind.Boolean)
									case 'null': return p_.ss($, ($) => vscode_node.SymbolKind.Null)
									case 'object': return p_.ss($, ($) => vscode_node.SymbolKind.Object)
									case 'struct': return p_.ss($, ($) => vscode_node.SymbolKind.Struct)
									case 'array': return p_.ss($, ($) => vscode_node.SymbolKind.Array)
									case 'enum member': return p_.ss($, ($) => vscode_node.SymbolKind.EnumMember)
									default: return p_.au($[0])
								}
							}),
							'range': helpers.create_range_from_range($.range),
							'selectionRange': helpers.create_range_from_range($['selection range']),
							'children': convert_value($.value)
						})
					})
				}

				load_document(
					doc,
					connection_context.cache,
					($) => [],
					(instance) => convert_value(t_unmarshall_result_to_document_symbols.Document(p_.from.state(instance).decide( ($) => {
						switch ($[0]) {
							case 'constrained': return p_.ss($, ($) => $.unmarshalled)
							case 'unconstrained': return p_.ss($, ($) => $)
							default: return p_.au($[0])
						}
					}))),
					resolve,
				)
			},
		)
	}
}
