import * as p_ from 'pareto-core/dist/implementation/transformer'

import * as t_unmarshall_result_to_hover_info from "liana-authoring/dist/implementation/manual/transformers/unmarshall_result/hover_info"

import { load_document } from '../to_be_backend/load_document'

import * as vscode_node from 'vscode-languageserver/node'
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
					connection_context.cache,
					($) => ({
						'contents': []
					}),
					(instance) => ({
						'contents': t_unmarshall_result_to_hover_info.Document(
							p_.from.state(instance).decide(($) => {
								switch ($[0]) {
									case 'constrained': return p_.ss($, ($) => $.unmarshalled)
									case 'unconstrained': return p_.ss($, ($) => $)
									default: return p_.au($[0])
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
