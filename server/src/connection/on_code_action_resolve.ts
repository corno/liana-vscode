import * as p_ from "pareto-core/implementation/transformer"

import * as t_unmarshall_result_to_formatting_edits from "liana-authoring/implementation/manual/transformers/unmarshall_result/formatting_edits"

import * as helpers_range from '../helpers/range'
import * as helpers_pareto_optional_value from '../helpers/pareto_optional_value'
import { load_document } from '../to_be_backend/load_document'

import * as vscode_node from 'vscode-languageserver/node'
import * as vscode_textdocument from 'vscode-languageserver-textdocument'

import { Connection_Context } from '../connection_context'

function indent_replacement_text(
	range: vscode_node.Range,
	document: vscode_textdocument.TextDocument,
	replacement_text: string,
): string {
	// Calculate the base indentation from the start of the range
	const base_indent = document.getText(vscode_node.Range.create(
		range.start.line,
		0,
		range.start.line,
		range.start.character
	)).match(/^[\t ]*/)?.[0] || ''

	return replacement_text.split('\n').map((line, index) => {
		// Don't indent empty lines
		if (line.trim() === '') {
			return line
		}
		// If range starts at column 0, add base indentation to ALL lines
		// If range preserves original position, skip first line (already positioned)
		if (index === 0 && range.start.character > 0) {
			return line // First line maintains its position
		}
		// For all other lines, add base indentation
		return base_indent + line
	}).join('\n')
}

export const create_on_code_action_resolve: (
	connection_context: Connection_Context,
) => (action: vscode_node.CodeAction) => Thenable<vscode_node.CodeAction> = (connection_context) => {
	return (action: vscode_node.CodeAction) => {
		return new Promise<vscode_node.CodeAction>((resolve) => {
			if (!action.data) {
				connection_context.connection.console.log('Code action resolve called without data')
				resolve(action)
				return
			}

			const { uri, position, style, shallow } = action.data
			const document = connection_context.documents.get(uri)

			if (document === undefined) {
				connection_context.connection.console.log('Code action resolve called but document not found')
				resolve(action)
				return
			}

			connection_context.connection.console.log(`Resolving code action: ${action.title}`)

			load_document(
				document,
				connection_context.cache,
				($) => null,
				(instance) => t_unmarshall_result_to_formatting_edits.Document(
					p_.from.state(instance).decide(($) => {
						switch ($[0]) {
							case 'constrained': return p_.ss($, ($) => $.unmarshalled)
							case 'unconstrained': return p_.ss($, ($) => $)
							default: return p_.au($[0])
						}
					}),
					{
						'conversion': {
							'style': [style, null],
							'impact': shallow
								? ['shallow with entities', null]
								: ['deep', null]
						},
						'indent': "    ",
						'position': position,
					}
				),
				($) => {
					if ($ === null) {
						resolve(action)
					} else {


						action.edit = {
							changes: {
								[uri]: helpers_pareto_optional_value.optional_value_convert(
									$,
									($) => [
										vscode_node.TextEdit.replace(
											helpers_range.create_range_from_range($.range),
											indent_replacement_text(
												helpers_range.create_range_from_range($.range),
												document,
												$.text,
											)
										)
									],
									() => []
								)
							}
						}
						resolve(action)
					}
				},
			)
		})
	}
}
