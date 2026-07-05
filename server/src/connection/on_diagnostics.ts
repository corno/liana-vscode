import * as vscode_node from 'vscode-languageserver/node'
import { Connection_Context } from '../connection_context'
import * as p_ from "pareto-core/implementation/transformer"
import * as helpers_range from '../helpers/range'
import * as helpers_pareto_optional_value from '../helpers/pareto_optional_value'
import { load_document } from '../to_be_backend/load_document'
import * as vscode_textdocument from 'vscode-languageserver-textdocument'
import { Cache_Context } from '../connection_context'

//dependencies
import * as t_unmarshall_result_to_diagnostics from "liana-authoring/implementation/manual/transformers/unmarshall_result/diagnostics"
import * as t_resolve_result_to_diagnostics from "liana-authoring/implementation/manual/transformers/resolve_result/diagnostics"
import * as t_node_path_to_text from "pareto-resources/implementation/manual/transformers/unrestricted_path/text"
import * as t_deserialize_to_diagnostic from "liana-authoring/implementation/manual/transformers/deserialize/diagnostics"



export const create_on_diagnostics: (
	connection_context: Connection_Context,
) => vscode_node.ServerRequestHandler<vscode_node.DocumentDiagnosticParams, vscode_node.DocumentDiagnosticReport, vscode_node.DocumentDiagnosticReportPartialResult, vscode_node.DiagnosticServerCancellationData> = (connection_context) => {
	return async (params) => {
		const document = connection_context.documents.get(params.textDocument.uri)
		if (document !== undefined) {


			function validate_text_document(
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
						($) => p_.literal.segmented_list([
							t_unmarshall_result_to_diagnostics.Document(p_.from.state($).decide(($) => {
								switch ($[0]) {
									case 'constrained': return p_.ss($, ($) => $.unmarshalled)
									case 'unconstrained': return p_.ss($, ($) => $)
									default: return p_.au($[0])
								}
							})),
							p_.from.state($).decide(($) => {
								switch ($[0]) {
									case 'constrained': return p_.ss($, ($) => t_resolve_result_to_diagnostics.Document($))
									case 'unconstrained': return p_.ss($, ($) => p_.literal.list([]))
									default: return p_.au($[0])
								}
							})
						]),
						($) => {
							resolve($.__get_raw().map(
								($): vscode_node.Diagnostic => {
									const related_information: vscode_node.DiagnosticRelatedInformation[] = helpers_pareto_optional_value.optional_value_convert(
										$['related information'],
										($) => $.__get_raw().map(($) => ({
												'location': {
													'uri': t_node_path_to_text.Node_Path($.location['file path']),
													'range': helpers_range.create_range_from_possible_range($.location.range),
												},
												'message': $.message,
											})
										),
										() => []
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
										range: helpers_pareto_optional_value.optional_value_convert(
											$.range,
											(range) => helpers_range.create_range_from_possible_range(range),
											() => vscode_node.Range.create(0, 0, 0, 1) // if we don't have a range, we put it at the start of the document
										),
										source: p_.from.state($.type).decide(($) => {
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

			return {
				'kind': vscode_node.DocumentDiagnosticReportKind.Full,
				'items': await validate_text_document(document, connection_context.cache)
			}
		} else {
			// We don't know the document. We can either try to read it from disk
			// or we don't report problems for it.
			return {
				'kind': vscode_node.DocumentDiagnosticReportKind.Full,
				'items': []
			}
		}
	}
}
