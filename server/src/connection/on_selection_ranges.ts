import * as _p from 'pareto-core/dist/assign'

import * as d_unmarshall_result from "liana-authoring/dist/interface/to_be_generated/unmarshall_result"
import * as t_unmarshall_result_to_selection_ranges from "liana-authoring/dist/implementation/manual/transformers/unmarshall_result/selection_ranges"

import * as helpers from '../helpers/range'
import { load_document } from '../to_be_backend/load_document'

import * as vscode_node from 'vscode-languageserver/node'
import * as vscode_textdocument from 'vscode-languageserver-textdocument'
import { Connection_Context } from '../connection_context'

function convert_selecton_range($: d_unmarshall_result.Range_Stack): vscode_node.SelectionRange {
	return {
		'range': helpers.create_range_from_range($.range),
		'parent': $.parent.__decide(
			($) => convert_selecton_range($),
			() => undefined
		)
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
							_p.decide.state(instance, ($) => {
								switch ($[0]) {
									case 'constrained': return _p.ss($, ($) => $.unmarshalled)
									case 'unconstrained': return _p.ss($, ($) => $)
									default: return _p.au($[0])
								}
							}),
							{
								'positions': _p.list.literal(params.positions),
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