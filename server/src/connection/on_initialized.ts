import * as vscode_node from 'vscode-languageserver/node'

export const create_on_initialized: (
	connection: vscode_node.Connection,
	has_configuration_capability: boolean,
	has_workspace_folder_capability: boolean,
) => vscode_node.NotificationHandler<vscode_node.InitializedParams> = (
	connection,
	has_configuration_capability,
	has_workspace_folder_capability,
) => {
	return () => {
		if (has_configuration_capability) {
			// Register for all configuration changes.
			connection.client.register(vscode_node.DidChangeConfigurationNotification.type, undefined)
		}
		if (has_workspace_folder_capability) {
			connection.workspace.onDidChangeWorkspaceFolders(_event => {
				connection.console.log('Workspace folder change event received.')
			})
		}
	}
}
