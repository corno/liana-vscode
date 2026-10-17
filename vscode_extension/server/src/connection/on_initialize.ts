import * as vscode_node from 'vscode-languageserver/node'
import { Connection_Context } from '../connection_context'

export const create_on_initialize: (
	connection_context: Connection_Context,
) => vscode_node.ServerRequestHandler<vscode_node.InitializeParams, vscode_node.InitializeResult, never, vscode_node.InitializeError> = (
	connection_context,
) => {
	return (params: vscode_node.InitializeParams) => {
		// Get notation style from initialization options (for initial document)
		if (params.initializationOptions && params.initializationOptions.notationStyle) {
			// Store as default for documents without specific preference
			connection_context['document notation styles'].set('__default__', params.initializationOptions.notationStyle)
		}

		const capabilities = params.capabilities

		// Does the client support the `workspace/configuration` request?
		// If not, we fall back using global settings.
		const has_configuration_capability = !!(
			capabilities.workspace && !!capabilities.workspace.configuration
		)
		const has_workspace_folder_capability = !!(
			capabilities.workspace && !!capabilities.workspace.workspaceFolders
		)
		const has_diagnostic_related_information_capability = !!(
			capabilities.textDocument &&
			capabilities.textDocument.publishDiagnostics &&
			capabilities.textDocument.publishDiagnostics.relatedInformation
		)

		connection_context['set has configuration capability'](has_configuration_capability)
		connection_context['set has workspace folder capability'](has_workspace_folder_capability)
		connection_context['set has diagnostic related information capability'](has_diagnostic_related_information_capability)

		const result: vscode_node.InitializeResult = {
			'capabilities': {
				'textDocumentSync': vscode_node.TextDocumentSyncKind.Incremental,
				// Tell the client that this server supports code completion.
				'completionProvider': {
					'resolveProvider': true,
					'triggerCharacters': [
						'(', //to fill a verbose group
						'<', //to fill a concise group
						'|', //to fill a state
						'`', //to set a keyword or start a property
						'\'', //to set an id or a reference
						':', //to set a property
						//',',
						'#' //to replace missing data
					],

				},
				'diagnosticProvider': {
					'interFileDependencies': false,
					'workspaceDiagnostics': false
				},
				'hoverProvider': true,
				'documentSymbolProvider': true,
				'codeActionProvider': {
					'codeActionKinds': [vscode_node.CodeActionKind.Refactor],
					'resolveProvider': true
				},
				'documentFormattingProvider': true,
				'selectionRangeProvider': true,
				'documentLinkProvider': {
					'resolveProvider': false
				},
			}
		}
		if (has_workspace_folder_capability) {
			result.capabilities.workspace = {
				'workspaceFolders': {
					'supported': true
				}
			}
		}
		return result
	}
}
