import * as vscode_node from 'vscode-languageserver/node'
import { Connection_Context, Settings } from '../connection_context'

export const create_on_did_change_configuration: (
	connection_context: Connection_Context,
) => vscode_node.NotificationHandler<vscode_node.DidChangeConfigurationParams> = (
	connection_context,
) => {
	return (change) => {
		if (connection_context['has configuration capability']()) {
			// Reset all cached document settings
			connection_context['document settings'].clear()
		} else {
			connection_context['set global settings'](
				(change.settings.languageServerExample || connection_context['default settings'])
			)
		}
		// Refresh the diagnostics since the `max_number_of_problems` could have changed.
		// We could optimize things here and re-fetch the setting first can compare it
		// to the existing setting, but this is out of scope for this example.
		connection_context.connection.languages.diagnostics.refresh()
	}
}
