import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'
import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'

import * as helpers from '../helpers'

//data types
import * as d_text_edits from "liana-authoring/dist/interface/generated/liana/schemas/text_edits/data"

import * as t_unmarshall_result_to_completion_suggestions from "liana-authoring/dist/implementation/manual/transformers/unmarshall_result/completion_suggestions"

import { load_document } from '../to_be_backend/load_document'
import { schema_cache } from '../schema_cache'

import * as vscode_node from 'vscode-languageserver/node'
import * as vscode_textdocument from 'vscode-languageserver-textdocument'

export const create_on_completion: (
	documents: vscode_node.TextDocuments<vscode_textdocument.TextDocument>,
	get_notation_style: (uri: string) => 'verbose' | 'concise',
) => vscode_node.ServerRequestHandler<vscode_node.CompletionParams, vscode_node.CompletionList | null, vscode_node.CompletionItem[], void> = (documents, get_notation_style) => {
	return (params) => {
		// The pass parameter contains the position of the text document in
		// which code complete got requested. For the example we ignore this
		// info and always provide the same completion items.

		const doc = documents.get(params.textDocument.uri)
		if (doc === undefined) {
			return null
		}

		return new Promise<vscode_node.CompletionList>((resolve) => {
			const context = params.context

			const remove_trigger_character = context &&
				context.triggerKind === vscode_node.CompletionTriggerKind.TriggerCharacter &&
				context.triggerCharacter === '#'

			const additional_text_edits = remove_trigger_character
				? [
					// Remove the trigger character
					vscode_node.TextEdit.del(vscode_node.Range.create(
						params.position.line,
						params.position.character - 1,
						params.position.line,
						params.position.character
					))
				]
				: []

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
							'style': get_notation_style(params.textDocument.uri) === 'verbose' ? ['verbose', null] : ['concise', null]
						}
					).__decide(
						($) => $.__l_map(($) => {

							const map_text_edits = ($: d_text_edits.Text_Edits): vscode_node.TextEdit[] => $.__l_map(($): vscode_node.TextEdit => _p.decide.state($, ($) => {
								switch ($[0]) {
									case 'replace': return _p.ss($, ($) => vscode_node.TextEdit.replace(
										helpers.create_range_from_range($.range),
										$.text
									))
									case 'delete': return _p.ss($, ($) => vscode_node.TextEdit.del(
										helpers.create_range_from_range($.range)
									))
									case 'insert': return _p.ss($, ($) => vscode_node.TextEdit.insert(
										helpers.create_position_from_location($.location),
										$.text
									))
									default: return _p.au($[0])
								}
							})).__get_raw_copy().map(($) => $)
							return ({
								'label': $.label,
								'insertText': $['insert text'],
								'insertTextFormat': vscode_node.InsertTextFormat.Snippet,
								'kind': _p.decide.state($.type, ($): vscode_node.CompletionItemKind => {
									switch ($[0]) {
										case 'simple': return _p.ss($, ($) => vscode_node.CompletionItemKind.Value)
										case 'component': return _p.ss($, ($) => vscode_node.CompletionItemKind.Class)
										case 'dictionary': return _p.ss($, ($) => vscode_node.CompletionItemKind.Class)
										case 'group': return _p.ss($, ($) => vscode_node.CompletionItemKind.Struct)
										case 'list': return _p.ss($, ($) => vscode_node.CompletionItemKind.Class)
										case 'nothing': return _p.ss($, ($) => vscode_node.CompletionItemKind.Value)
										case 'optional': return _p.ss($, ($) => vscode_node.CompletionItemKind.Field)
										case 'reference': return _p.ss($, ($) => vscode_node.CompletionItemKind.Reference)
										case 'state': return _p.ss($, ($) => vscode_node.CompletionItemKind.Enum)
										case 'text': return _p.ss($, ($) => vscode_node.CompletionItemKind.Text)
										default: return _p.au($[0])
									}
								}),
								'additionalTextEdits': map_text_edits($['additional text edits']),
								'documentation': {
									kind: vscode_node.MarkupKind.PlainText,
									value: $.documentation
								},
								'data': {
									'documentation': $.documentation
								}
							})
						}).__get_raw_copy().map(($) => $),
						() => []
					)
				}),
				resolve,
			)
		})
	}
}