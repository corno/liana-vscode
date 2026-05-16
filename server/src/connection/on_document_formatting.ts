import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'
import _p_variables from 'pareto-core/dist/_p_variables'
import create_refinement_context from 'pareto-core/dist/__internals/async/create_refinement_context'

import * as r_parse_tree_from_loc from "astn-core/dist/implementation/manual/refiners/parse_tree/list_of_characters"
import * as t_parse_tree_to_text from "astn/dist/implementation/manual/transformers/parse_tree/text"

import * as vscode_node from 'vscode-languageserver/node'
import * as vscode_textdocument from 'vscode-languageserver-textdocument'

export const create_on_document_formatting: (
	documents: vscode_node.TextDocuments<vscode_textdocument.TextDocument>,
	connection: vscode_node.Connection,
) => vscode_node.ServerRequestHandler<vscode_node.DocumentFormattingParams, vscode_node.TextEdit[] | null | undefined, never, void> = (documents, connection) => {
	return (params: vscode_node.DocumentFormattingParams): vscode_node.TextEdit[] => {
		const document = documents.get(params.textDocument.uri)
		if (document === undefined) {
			connection.console.log('Document formatting called but document not found')
			return []
		}

		return create_refinement_context(
			(abort) => r_parse_tree_from_loc.Document(
				_p_list_from_text(
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

				return [
					vscode_node.TextEdit.replace(
						_p_variables(() => {
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
						t_parse_tree_to_text.Document(
							$,
							{
								'indentation': ' '.repeat(params.options.tabSize || 4),
								'newline': '\n'
							}
						)
					)
				]
			},
			($) => {
				connection.window.showInformationMessage(`could not format document due to parsing error`)
				return []
			}
		)
	}
}
