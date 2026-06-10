import * as vscode_node from 'vscode-languageserver/node'
import * as vscode_textdocument from 'vscode-languageserver-textdocument'
import { validate_text_document } from '../helpers/validate_text_document'
import { Connection_Context } from '../connection_context'

export const create_on_diagnostics: (
	connection_context: Connection_Context,
) => vscode_node.ServerRequestHandler<vscode_node.DocumentDiagnosticParams, vscode_node.DocumentDiagnosticReport, vscode_node.DocumentDiagnosticReportPartialResult, vscode_node.DiagnosticServerCancellationData> = (connection_context) => {
	return async (params) => {
		const document = connection_context.documents.get(params.textDocument.uri)
		if (document !== undefined) {
			return {
				'kind': vscode_node.DocumentDiagnosticReportKind.Full,
				'items': await validate_text_document(document)
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
