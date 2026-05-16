import * as _p from 'pareto-core/dist/assign'

import * as d_document_symbols from "liana-authoring/dist/interface/to_be_generated/document_symbols"
import * as t_unmarshall_result_to_document_symbols from "liana-authoring/dist/implementation/manual/transformers/unmarshall_result/document_symbols"

import * as helpers from '../helpers/range'
import { load_document } from '../to_be_backend/load_document'
import { schema_cache } from '../schema_cache'

import * as vscode_node from 'vscode-languageserver/node'
import * as vscode_textdocument from 'vscode-languageserver-textdocument'

export const create_on_document_symbol: (
	documents: vscode_node.TextDocuments<vscode_textdocument.TextDocument>,
) => vscode_node.ServerRequestHandler<vscode_node.DocumentSymbolParams, vscode_node.SymbolInformation[] | vscode_node.DocumentSymbol[] | undefined | null, vscode_node.SymbolInformation[] | vscode_node.DocumentSymbol[], void> = (documents) => {
	return (params) => {
		const doc = documents.get(params.textDocument.uri)
		if (doc === undefined) {
			return []
		}

		return new Promise<vscode_node.DocumentSymbol[]>(
			(resolve) => {

				function convert_value($: d_document_symbols.Value): vscode_node.DocumentSymbol[] {
					return _p.decide.state($.type, ($) => {
						switch ($[0]) {
							case 'primitive': return _p.ss($, ($) => [])
							case 'composite': return _p.ss($, ($) => $.children.__get_raw_copy().map(($): vscode_node.DocumentSymbol => {
								return ({
									'name': $.name === "" ? "-empty-" : $.name, //empty strings result in a 'falsy name' errors
									'detail': $.detail,
									'kind': _p.decide.state($.value.type, ($) => {
										switch ($[0]) {
											case 'primitive': return _p.ss($, ($) => _p.decide.state($.kind, ($) => {
												switch ($[0]) {
													case 'string': return _p.ss($, ($) => vscode_node.SymbolKind.String)
													case 'number': return _p.ss($, ($) => vscode_node.SymbolKind.Number)
													case 'boolean': return _p.ss($, ($) => vscode_node.SymbolKind.Boolean)
													case 'enum': return _p.ss($, ($) => vscode_node.SymbolKind.Enum)
													case 'null': return _p.ss($, ($) => vscode_node.SymbolKind.Null)
													default: return _p.au($[0])
												}
											}))
											case 'composite': return _p.ss($, ($) => _p.decide.state($.kind, ($) => {
												switch ($[0]) {
													case 'object': return _p.ss($, ($) => vscode_node.SymbolKind.Object)
													case 'struct': return _p.ss($, ($) => vscode_node.SymbolKind.Struct)
													case 'array': return _p.ss($, ($) => vscode_node.SymbolKind.Array)
													default: return _p.au($[0])
												}
											}))
											default: return _p.au($[0])
										}
									}),
									'range': helpers.create_range_from_range($.range),
									'selectionRange': helpers.create_range_from_range($['selection range']),
									'children': convert_value($.value)
								})
							}))
							default: return _p.au($[0])
						}
					})
				}

				load_document(
					doc,
					schema_cache,
					($) => [],
					(instance) => convert_value(t_unmarshall_result_to_document_symbols.Document(instance)),
					resolve,
				)
			},
		)
	}
}
