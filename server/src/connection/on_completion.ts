import * as p_ from 'pareto-core/dist/implementation/transformer'

//data types
import * as t_unmarshall_result_to_completion_suggestions from "liana-authoring/dist/implementation/manual/transformers/unmarshall_result/completion_suggestions"

import { load_document } from '../to_be_backend/load_document'

import * as vscode_node from 'vscode-languageserver/node'
import * as vscode_textdocument from 'vscode-languageserver-textdocument'
import { Connection_Context } from '../connection_context'

export const create_on_completion: (
	connection_context: Connection_Context,
) => vscode_node.ServerRequestHandler<vscode_node.CompletionParams, vscode_node.CompletionList | null, vscode_node.CompletionItem[], void> = (connection_context) => {
	return (params) => {
		// The pass parameter contains the position of the text document in
		// which code complete got requested. For the example we ignore this
		// info and always provide the same completion items.

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

					t_unmarshall_result_to_completion_suggestions.Document(
						p_.from.state(instance).decide( ($) => {
							switch ($[0]) {
								case 'constrained': return p_.ss($, ($) => $.unmarshalled)
								case 'unconstrained': return p_.ss($, ($) => $)
								default: return p_.au($[0])
							}
						}),
						{
							'indent': "    ",
							'position': params.position,
							'style': (connection_context['document notation styles'].get(params.textDocument.uri) || connection_context['document notation styles'].get('__default__') || 'verbose') === 'verbose' ? ['verbose', null] : ['concise', null]
						}
					).__extract_data(
						($) => {
							const type = $.type

							// Backend signals semantic intent through type
							// For missing value/option, hash must be present (assertion)
							const shouldRemoveHash = p_.from.state(type).decide(($): boolean => {
								switch ($[0]) {
									case 'missing value': return p_.ss($, ($) => true)
									case 'missing option': return p_.ss($, ($) => true)
									case 'reference': return p_.ss($, ($) => false)
									case 'property name': return p_.ss($, ($) => false)
									case 'option name': return p_.ss($, ($) => false)
									default: return p_.au($[0])
								}
							})


							items = $.suggestions.__get_raw_copy().map(($): vscode_node.CompletionItem => {
								const completionItem: vscode_node.CompletionItem = {
									'label': $.label,
									'insertTextFormat': vscode_node.InsertTextFormat.Snippet,
									'kind': p_.from.state(type).decide(($): vscode_node.CompletionItemKind => {
										switch ($[0]) {
											case 'missing value': return p_.ss($, ($) => vscode_node.CompletionItemKind.Value)
											case 'missing option': return p_.ss($, ($) => vscode_node.CompletionItemKind.EnumMember)
											case 'reference': return p_.ss($, ($) => vscode_node.CompletionItemKind.Reference)
											case 'property name': return p_.ss($, ($) => vscode_node.CompletionItemKind.Property)
											case 'option name': return p_.ss($, ($) => vscode_node.CompletionItemKind.EnumMember)
											default: return p_.au($[0])
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
								if (shouldRemoveHash) {


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
									const insertTextWithCursor = '$0' + $['insert text']
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
											$['insert text']
										)
									} else {
										completionItem.insertText = $['insert text']
									}
								}

								return completionItem
							})
						},
						() => {

						}
					)
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