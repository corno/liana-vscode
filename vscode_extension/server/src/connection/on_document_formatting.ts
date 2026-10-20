import p_list_from_text from "pareto-core/refiner/specials/list_from_text"
import p_variables from "pareto-core/transformer/specials/variables"
import create_refinement_context from "pareto-core/__internal/sync/create_refinement_context"

import * as r_parse_tree_from_loc from "pareto-liana/temp/astn_document"
import * as p from "pareto-core/transformer"
import * as target from "astn/modules/parse_tree/schemas/parse_tree/transformers/authoring_target"
import * as paragraph from "astn/modules/authoring_target/schemas/authoring_target/transformers/paragraph"
import * as serialize from "pareto-fountain-pen/modules/paragraph/schemas/paragraph/transformers/serialized"
import * as sh from "pareto-fountain-pen/modules/paragraph/schemas/paragraph/shorthands/deprecated"

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
						serialize.Paragraph(
							sh.pg.sentences(p.literal.segmented_list([
								p.from.optional($.header).decide(header => p.literal.list([
									sh.sentence(p.literal.segmented_list([
										p.literal.list([sh.ph.text("! ")]),
										paragraph.Token_Trivia({ comments: header['!']['trailing trivia'].comments }),
										paragraph.Value(target.Value(header.value), { 'write delimiters': true }),
									])),
								]), () => p.literal.list([])),
								p.literal.list([sh.sentence(paragraph.Value(target.Value($.content), { 'write delimiters': true }))]),
							])),
							{
								'indentation': ' '.repeat(params.options.tabSize || 4),
							}
						).__get_raw().join("\n")
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
