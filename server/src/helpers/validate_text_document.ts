import * as _p from 'pareto-core/dist/assign'
import * as helpers from './range'
import * as t_unmarshall_result_to_diagnostics from "liana-authoring/dist/implementation/manual/transformers/unmarshall_result/diagnostics"
import * as t_node_path_to_text from "pareto-resources/dist/implementation/manual/transformers/path/text"
import * as t_deserialize_to_diagnostic from "liana-authoring/dist/implementation/manual/transformers/deserialize/diagnostics"
import { load_document } from '../to_be_backend/load_document'
import { schema_cache } from '../schema_cache'
import * as vscode_node from 'vscode-languageserver/node'
import * as vscode_textdocument from 'vscode-languageserver-textdocument'

export async function validate_text_document(
	text_document: vscode_textdocument.TextDocument
): Promise<vscode_node.Diagnostic[]> {
	return new Promise<vscode_node.Diagnostic[]>((resolve) => {
		load_document(
			text_document,
			schema_cache,
			($) => _p.list.literal([
				t_deserialize_to_diagnostic.Error($)
			]),
			($) => t_unmarshall_result_to_diagnostics.Document($),
			($) => {
				resolve($.__l_map(($) => ({
					severity: (() => {
						switch ($.severity[0]) {
							case 'error': return vscode_node.DiagnosticSeverity.Error
							case 'warning': return vscode_node.DiagnosticSeverity.Warning
							case 'information': return vscode_node.DiagnosticSeverity.Information
							case 'hint': return vscode_node.DiagnosticSeverity.Hint
						}
					})(),
					message: $.message,
					range: $.range.__decide(
						($) => helpers.create_range_from_possible_range($),
						() => vscode_node.Range.create(0, 0, 0, 1) // if we don't have a range, we put it at the start of the document
					),
					source: _p.decide.state($.type, ($): string => {
						switch ($[0]) {
							case 'semantic': return _p.ss($, ($) => "liana-semantic")
							case 'deserialize': return _p.ss($, ($) => "liana-deserialize")
							case 'schema': return _p.ss($, ($) => "schema")
							default: return _p.au($[0])
						}
					}),
					relatedInformation: $['related information'].__decide(
						($) => $.__get_raw_copy().map(($): vscode_node.DiagnosticRelatedInformation => ({
							'location': {
								'uri': t_node_path_to_text.Node_Path($.location['file path']),
								'range': helpers.create_range_from_possible_range($.location.range),
							},
							'message': $.message,
						})),
						() => undefined
					)
				})).__get_raw_copy().map(($) => $))
			},
		)



	})
}
