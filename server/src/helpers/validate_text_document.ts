import * as p_ from 'pareto-core/dist/assign'
import * as helpers from './range'

//dependencies
import * as t_unmarshall_result_to_diagnostics from "liana-authoring/dist/implementation/manual/transformers/unmarshall_result/diagnostics"
import * as t_resolve_result_to_diagnostics from "liana-authoring/dist/implementation/manual/transformers/resolve_result/diagnostics"
import * as t_node_path_to_text from "pareto-resources/dist/implementation/manual/transformers/unrestricted_path/text"
import * as t_deserialize_to_diagnostic from "liana-authoring/dist/implementation/manual/transformers/deserialize/diagnostics"


import { load_document } from '../to_be_backend/load_document'
import * as vscode_node from 'vscode-languageserver/node'
import * as vscode_textdocument from 'vscode-languageserver-textdocument'
import { Cache_Context } from '../connection_context'

export async function validate_text_document(
	text_document: vscode_textdocument.TextDocument,
	cache: Cache_Context,
): Promise<vscode_node.Diagnostic[]> {
	return new Promise((resolve) => {
		load_document(
			text_document,
			cache,
			($) => p_.literal.list([
				t_deserialize_to_diagnostic.Error($)
			]),
			($) => p_.literal.nested_list([
				t_unmarshall_result_to_diagnostics.Document(p_.decide.state($, ($) => {
					switch ($[0]) {
						case 'constrained': return p_.ss($, ($) => $.unmarshalled)
						case 'unconstrained': return p_.ss($, ($) => $)
						default: return p_.au($[0])
					}
				})),
				p_.decide.state($, ($) => {
					switch ($[0]) {
						case 'constrained': return p_.ss($, ($) => t_resolve_result_to_diagnostics.Document($))
						case 'unconstrained': return p_.ss($, ($) => p_.literal.list([]))
						default: return p_.au($[0])
					}
				})
			]),
			($) => {
				resolve($.__get_raw_copy().map(
					($): vscode_node.Diagnostic => {
						let related_information: vscode_node.DiagnosticRelatedInformation[] = []
						$['related information'].__extract_data(
							($) => {
								related_information = $.__get_raw_copy().map(($) => ({
									'location': {
										'uri': t_node_path_to_text.Node_Path($.location['file path']),
										'range': helpers.create_range_from_possible_range($.location.range),
									},
									'message': $.message,
								}))
							},
							() => {

							}
						)
						return {
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
							source: p_.decide.state($.type, ($) => {
								switch ($[0]) {
									case 'semantic': return p_.ss($, ($) => "liana-semantic")
									case 'deserialize': return p_.ss($, ($) => "liana-deserialize")
									case 'schema': return p_.ss($, ($) => "schema")
									default: return p_.au($[0])
								}
							}),
							relatedInformation: related_information
						}
					}
				))
			},
		)



	})
}
