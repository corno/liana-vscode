import * as _p from 'pareto-core/dist/assign'

import * as t_unmarshall_result_to_hover_info from "liana-authoring/dist/implementation/manual/transformers/unmarshall_result/hover_info"

import { load_document } from '../to_be_backend/load_document'
import { schema_cache } from '../schema_cache'

import * as vscode_node from 'vscode-languageserver/node'
import * as vscode_textdocument from 'vscode-languageserver-textdocument'
import { Connection_Context } from '../connection_context'

export const create_on_hover: (
	connection_context: Connection_Context,
) => vscode_node.ServerRequestHandler<vscode_node.HoverParams, vscode_node.Hover | null, never, void> = (connection_context) => {
	return (hover_params, cancellation_token, workdone_progress, result_progress) => {
		// The pass parameter contains the position of the text document in
		// which code complete got requested.

		const doc = connection_context.documents.get(hover_params.textDocument.uri)
		if (doc === undefined) {
			return null
		}

		return new Promise(
			(resolve) => {
				load_document(
					doc,
					schema_cache,
					($) => ({
						'contents': []
					}),
					(instance) => ({
						'contents': t_unmarshall_result_to_hover_info.Document(
							_p.decide.state(instance, ($) => {
								switch ($[0]) {
									case 'constrained': return _p.ss($, ($) => $.unmarshalled)
									case 'unconstrained': return _p.ss($, ($) => $)
									default: return _p.au($[0])
								}
							}),
							{
								'position': hover_params.position,
							}
						).__get_raw_copy().map(($) => $)
					}),
					resolve,
				)
			},
		)
	}
}
