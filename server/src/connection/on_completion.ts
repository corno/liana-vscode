import * as p_ from "pareto-core/transformer"

//data types
import * as t_unmarshall_result_to_completion_suggestions from "liana-authoring/schemas/unmarshall_result/transformers/completion_suggestions"
import * as t_resolve_result_to_completion_suggestions from "liana-authoring/schemas/resolve_result/transformers/completion_suggestions"

import { load_document } from '../to_be_backend/load_document'

import * as vscode_node from 'vscode-languageserver/node'
import * as vscode_textdocument from 'vscode-languageserver-textdocument'
import { Connection_Context } from '../connection_context'
import { native_schema_for_document, native_references } from '../to_be_backend/native_schema'
import { create_range_from_range } from '../helpers/range'

export const create_on_completion: (
	connection_context: Connection_Context,
) => vscode_node.ServerRequestHandler<vscode_node.CompletionParams, vscode_node.CompletionList | null, vscode_node.CompletionItem[], void> = (connection_context) => {
	return (params) => {
		const doc = connection_context.documents.get(params.textDocument.uri)
		if (doc === undefined) {
			return null
		}

		return new Promise<vscode_node.CompletionList>((resolve) => {
			// Check if user typed filter letters before the cursor
			// These should be removed when a completion is selected (for certain types)
			const textBeforeCursor = doc.getText({
				start: { line: params.position.line, character: 0 },
				end: params.position
			})


			// Find filter text (letters typed before cursor)
			const wordMatch = textBeforeCursor.match(/([a-zA-Z0-9_]*)$/)
			const filterText = wordMatch ? wordMatch[1] : ''
			const filterStartIndex = params.position.character - filterText.length

			load_document(
				doc,
				connection_context.cache,
				($) => ({ 'isIncomplete': false, 'items': [] }),
				(instance) => {
					let items: vscode_node.CompletionItem[] = []
					const native = native_schema_for_document(doc.uri)
					if (native !== undefined && instance[0] === 'unconstrained') {
						const offset = doc.offsetAt(params.position)
						const reference = native_references(instance[1], native.root).find(reference => {
							const range = create_range_from_range(reference.range)
							return doc.offsetAt(range.start) <= offset && offset <= doc.offsetAt(range.end)
						})
						if (reference !== undefined) {
							const range = create_range_from_range(reference.range)
							const source = doc.getText()
							const token = doc.getText(range)
							let marker = 'liana editor completion'
							while (source.includes(marker)) marker += ' next'
							const completed = native.complete(
								source.slice(0, doc.offsetAt(range.start)) + "'" + marker + "'"
									+ source.slice(doc.offsetAt(range.end)), marker,
							)
							return {
								isIncomplete: false,
								items: completed.candidates.map(id => ({
									label: id,
									filterText: token[0] === '#' ? '#' + id : token[0] + id + token[0],
									kind: vscode_node.CompletionItemKind.Reference,
									insertTextFormat: vscode_node.InsertTextFormat.PlainText,
									textEdit: vscode_node.TextEdit.replace(range,
										"'" + id.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
											.replace(/\n/g, '\\n').replace(/\r/g, '\\r') + "'"),
								})),
							}
						}
					}

					const completionParameters: {
						indent: string, position: vscode_node.Position, style: ['verbose', null] | ['concise', null],
					} = {
							'indent': "    ",
							'position': params.position,
							'style': (connection_context['document notation styles'].get(params.textDocument.uri) || connection_context['document notation styles'].get('__default__') || 'verbose') === 'verbose' ? ['verbose', null] : ['concise', null]
					}
					const completion_suggestions_raw = (instance[0] === 'constrained'
						? t_resolve_result_to_completion_suggestions.Document(instance[1], completionParameters)
						: t_unmarshall_result_to_completion_suggestions.Document(instance[1], completionParameters)).__get_raw()
					if (completion_suggestions_raw !== null) {
						const $ = completion_suggestions_raw[0]


						const type = $.type

						// Backend signals semantic intent through type
						// For missing value/option, hash must be present (assertion)
						const shouldRemoveHash = p_.from.state(type).decide(($): boolean => {
							switch ($[0]) {
								case 'missing value': return p_.option($, ($) => true)
								case 'missing option': return p_.option($, ($) => true)
								case 'reference': return p_.option($, ($) => false)
								case 'property name': return p_.option($, ($) => false)
								case 'option name': return p_.option($, ($) => false)
								default: return p_.exhaustive($[0])
							}
						})


						items = $.suggestions.__get_raw().map(($): vscode_node.CompletionItem => {
							const completionItem: vscode_node.CompletionItem = {
								'label': $.label,
								'insertTextFormat': vscode_node.InsertTextFormat.Snippet,
								'kind': p_.from.state(type).decide(($): vscode_node.CompletionItemKind => {
									switch ($[0]) {
										case 'missing value': return p_.option($, ($) => vscode_node.CompletionItemKind.Value)
										case 'missing option': return p_.option($, ($) => vscode_node.CompletionItemKind.EnumMember)
										case 'reference': return p_.option($, ($) => vscode_node.CompletionItemKind.Reference)
										case 'property name': return p_.option($, ($) => vscode_node.CompletionItemKind.Property)
										case 'option name': return p_.option($, ($) => vscode_node.CompletionItemKind.EnumMember)
										default: return p_.exhaustive($[0])
									}
								}),
								'documentation': {
									kind: vscode_node.MarkupKind.PlainText,
									value: $.documentation
								},
								'data': {
									'documentation': $.documentation
								}
							}

							// Frontend handles hash + filter text removal based on backend's semantic signal
							if (type[0] === 'reference' && completion_suggestions_raw[0]['replace range'] !== undefined) {
								const range = completion_suggestions_raw[0]['replace range']
								const token = doc.getText(range)
								const delimiter = token[0]
								completionItem.filterText = delimiter === "'" || delimiter === '"' || delimiter === '`'
									? delimiter + $.label + delimiter : delimiter === '#' ? '#' + $.label : $.label
								completionItem.insertTextFormat = vscode_node.InsertTextFormat.PlainText
								completionItem.textEdit = vscode_node.TextEdit.replace(
									range, $['insert lines'].__get_raw().join("\n"),
								)
							} else if (shouldRemoveHash) {


								const fullLine = doc.getText({
									start: { line: params.position.line, character: 0 },
									end: { line: params.position.line + 1, character: 0 }
								}).replace(/\r?\n$/, '')

								const textAfterCursor = fullLine.substring(params.position.character)

								// Check if there's a # immediately after the cursor
								const hasHashAfterCursor = textAfterCursor.startsWith('#')
								if (!hasHashAfterCursor) {
									console.log(`INFO: Backend indicated ${type[0]} but no hash found after cursor`)
								}
								// Position cursor at beginning for missing data (need to fill it in)
								const insertTextWithCursor = '$0' + $['insert lines'].__get_raw().join("\n")
								completionItem.textEdit = vscode_node.TextEdit.replace(
									vscode_node.Range.create(
										params.position.line,
										filterStartIndex,  // Remove filter text
										params.position.line,
										params.position.character + (hasHashAfterCursor ? 1 : 0)  // +1 to include the # character
									),
									insertTextWithCursor
								)
							} else {
								// Regular completion: cursor at end, only remove filter text if any
								if (filterText.length > 0) {
									completionItem.textEdit = vscode_node.TextEdit.replace(
										vscode_node.Range.create(
											params.position.line,
											filterStartIndex,
											params.position.line,
											params.position.character
										),
										$['insert lines'].__get_raw().join("\n")
									)
								} else {
									completionItem.insertText = $['insert lines'].__get_raw().join("\n")
								}
							}

							return completionItem
						})
					}
					return {
						'isIncomplete': false,
						'items': items
					}
				},
				resolve,
			)
		})
	}
}