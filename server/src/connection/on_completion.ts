import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'
import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'

//data types
import * as t_unmarshall_result_to_completion_suggestions from "liana-authoring/dist/implementation/manual/transformers/unmarshall_result/completion_suggestions"

import { load_document } from '../to_be_backend/load_document'
import { schema_cache } from '../schema_cache'

import * as vscode_node from 'vscode-languageserver/node'
import * as vscode_textdocument from 'vscode-languageserver-textdocument'

export const create_on_completion: (
	documents: vscode_node.TextDocuments<vscode_textdocument.TextDocument>,
	document_notation_styles: Map<string, 'verbose' | 'concise'>,
) => vscode_node.ServerRequestHandler<vscode_node.CompletionParams, vscode_node.CompletionList | null, vscode_node.CompletionItem[], void> = (documents, document_notation_styles) => {
	return (params) => {
		// The pass parameter contains the position of the text document in
		// which code complete got requested. For the example we ignore this
		// info and always provide the same completion items.

		const doc = documents.get(params.textDocument.uri)
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
				schema_cache,
				($) => ({ 'isIncomplete': false, 'items': [] }),
				(instance) => ({
					'isIncomplete': false,
					'items': t_unmarshall_result_to_completion_suggestions.Document(
						instance,
						{
							'indent': "    ",
							'position': params.position,
							'style': (document_notation_styles.get(params.textDocument.uri) || document_notation_styles.get('__default__') || 'verbose') === 'verbose' ? ['verbose', null] : ['concise', null]
						}
					).__decide(
						($) => {
							const type = $.type

							// Backend signals semantic intent through type
							// For missing value/option, hash must be present (assertion)
							const shouldRemoveHash = _p.decide.state(type, ($) => {
								switch ($[0]) {
									case 'missing value': return _p.ss($, ($) => true)
									case 'missing option': return _p.ss($, ($) => true)
									case 'reference': return _p.ss($, ($) => false)
									case 'property name': return _p.ss($, ($) => false)
									case 'option name': return _p.ss($, ($) => false)
									default: return _p.au($[0])
								}
							})


							return $.suggestions.__l_map(($) => {
								const completionItem: vscode_node.CompletionItem = {
									'label': $.label,
									'insertTextFormat': vscode_node.InsertTextFormat.Snippet,
									'kind': _p.decide.state(type, ($): vscode_node.CompletionItemKind => {
										switch ($[0]) {
											case 'missing value': return _p.ss($, ($) => vscode_node.CompletionItemKind.Value)
											case 'missing option': return _p.ss($, ($) => vscode_node.CompletionItemKind.EnumMember)
											case 'reference': return _p.ss($, ($) => vscode_node.CompletionItemKind.Reference)
											case 'property name': return _p.ss($, ($) => vscode_node.CompletionItemKind.Property)
											case 'option name': return _p.ss($, ($) => vscode_node.CompletionItemKind.EnumMember)
											default: return _p.au($[0])
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
							}).__get_raw_copy().map(($) => $)
						},
						() => []
					)
				}),
				resolve,
			)
		})
	}
}