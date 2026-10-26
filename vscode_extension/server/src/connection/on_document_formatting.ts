import p_list_from_text from "pareto-core/refiner/specials/list_from_text"
import p_variables from "pareto-core/transformer/specials/variables"
import create_refinement_context from "pareto-core/__internal/sync/create_refinement_context"

import * as r_parse_tree_from_loc from "pareto-liana/temp/astn_document"
import { format_document } from '../helpers/format_parse_tree'

import * as vscode_node from 'vscode-languageserver/node'
import { Connection_Context } from '../connection_context'

export const create_on_document_formatting: (
	connection_context: Connection_Context,
) => vscode_node.ServerRequestHandler<vscode_node.DocumentFormattingParams, vscode_node.TextEdit[] | null | undefined, never, void> = (connection_context) => {
	return (params: vscode_node.DocumentFormattingParams): vscode_node.TextEdit[] => {
		const document = connection_context.documents.get(params.textDocument.uri)
		if (document === undefined) {
			connection_context.connection.console.log('Document formatting called but document not found')
			return []
		}

		const result: vscode_node.TextEdit[] = []

		create_refinement_context(
			(abort) => r_parse_tree_from_loc.Document(
				p_list_from_text(
					document.getText(),
					($) => $
				),
				($) => abort($),
				{
					'tab size': params.options.tabSize || 4,
				}
			)
		).__extract_data(
			($) => {
				const formatted = format_document(
					$,
					document.getText(),
					params.options.insertSpaces === false ? '\t' : ' '.repeat(params.options.tabSize || 4),
				)
				// An unchanged document needs no edit; replacing it anyway would mark it dirty and add an undo step.
				if (formatted === document.getText()) return
				result.push(
					vscode_node.TextEdit.replace(
						p_variables(() => {
							// Create range covering the entire document
							const last_line = document.lineCount - 1
							const last_line_length = document.getText(vscode_node.Range.create(last_line, 0, last_line + 1, 0)).length
							return vscode_node.Range.create(
								0,
								0,
								last_line,
								last_line_length
							)
						}),
						formatted
					)
				)
			},
			($) => {
				connection_context.connection.window.showInformationMessage(`could not format document due to parsing error`)
			}
		)
		return result
	}
}
