import * as t_unmarshall_result_to_hover_info from "liana-authoring/dist/implementation/manual/transformers/unmarshall_result/hover_info"

import { load_document } from '../to_be_backend/load_document'
import { schema_cache } from '../schema_cache'

import * as vscode_node from 'vscode-languageserver/node'
import * as vscode_textdocument from 'vscode-languageserver-textdocument'

export const create_on_hover: (
	documents: vscode_node.TextDocuments<vscode_textdocument.TextDocument>,
) => vscode_node.ServerRequestHandler<vscode_node.HoverParams, vscode_node.Hover | null, never, void> = (documents) => {
	return (hover_params, cancellation_token, workdone_progress, result_progress) => {
		// The pass parameter contains the position of the text document in
		// which code complete got requested.

		const doc = documents.get(hover_params.textDocument.uri)
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
							instance,
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
