import * as p_ from 'pareto-core/dist/implementation/transformer'

import * as d_unmarshall_result from "liana-authoring/dist/interface/data/unmarshall_result"
import * as t_unmarshall_result_to_selection_ranges from "liana-authoring/dist/implementation/manual/transformers/unmarshall_result/selection_ranges"

import * as helpers from '../helpers/range'
import { load_document } from '../to_be_backend/load_document'

import * as vscode_node from 'vscode-languageserver/node'
import { Connection_Context } from '../connection_context'

function convert_selecton_range($: d_unmarshall_result.Range_Stack): vscode_node.SelectionRange {
	let parent: undefined | vscode_node.SelectionRange = undefined
	$.parent.__extract_data(
			($) => {
				parent = convert_selecton_range($)
			},
			() => {

			}
		)
	return {
		'range': helpers.create_range_from_range($.range),
		'parent': parent
	}
}

export const create_on_selection_ranges: (
	connection_context: Connection_Context,
) => vscode_node.ServerRequestHandler<vscode_node.SelectionRangeParams, vscode_node.SelectionRange[] | null, vscode_node.SelectionRange[], void> = (connection_context) => {
	return (params) => {

		return new Promise<vscode_node.SelectionRange[]>(
			(resolve) => {
				connection_context.connection.console.log(`Selection ranges requested at position: ${params.positions.map(p => `${p.line}:${p.character}`).join(', ')}`)
				const doc = connection_context.documents.get(params.textDocument.uri)
				if (doc === undefined) {
					connection_context.connection.console.log('Selection ranges: document not found, returning empty array')
					resolve([])
					return
				}
				load_document(
					doc,
					connection_context.cache,
					($) => {
						connection_context.connection.console.log('Selection ranges: load_document failed (deserialize error), returning empty array')
						return []
					},
					(instance) => {
						const result = t_unmarshall_result_to_selection_ranges.Document(
							p_.from.state(instance).decide(($) => {
								switch ($[0]) {
									case 'constrained': return p_.ss($, ($) => $.unmarshalled)
									case 'unconstrained': return p_.ss($, ($) => $)
									default: return p_.au($[0])
								}
							}),
							{
								'positions': p_.literal.list(params.positions),
							}
						).__get_raw_copy().map(($): vscode_node.SelectionRange => convert_selecton_range($))
					connection_context.connection.console.log(`Selection ranges: backend returned ${result.length} range(s): ${JSON.stringify(result, null, 2)}`)
					return result
				},
				(final_result) => {
					connection_context.connection.console.log(`Selection ranges: resolving with ${final_result.length} range(s)`)
					resolve(final_result)
				},
			)
		},
	)
}}