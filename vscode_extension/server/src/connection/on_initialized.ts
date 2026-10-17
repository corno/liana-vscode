import * as vscode_node from 'vscode-languageserver/node'
import { Connection_Context } from '../connection_context'

export const create_on_initialized: (
	connection_context: Connection_Context,
) => vscode_node.NotificationHandler<vscode_node.InitializedParams> = (
	connection_context,
) => {
	return () => {
		if (connection_context['has configuration capability']()) {
			// Register for all configuration changes.
			connection_context.connection.client.register(vscode_node.DidChangeConfigurationNotification.type, undefined)
		}
		if (connection_context['has workspace folder capability']()) {
			connection_context.connection.workspace.onDidChangeWorkspaceFolders(_event => {
				connection_context.connection.console.log('Workspace folder change event received.')
			})
		}
	}
}
