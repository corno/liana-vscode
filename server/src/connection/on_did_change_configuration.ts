import * as vscode_node from 'vscode-languageserver/node'
import { Settings } from '../types'

export const create_on_did_change_configuration: (
	connection: vscode_node.Connection,
	document_settings: Map<string, Thenable<Settings>>,
	has_configuration_capability: boolean,
	default_settings: Settings,
	set_global_settings: (settings: Settings) => void,
) => vscode_node.NotificationHandler<vscode_node.DidChangeConfigurationParams> = (
	connection,
	document_settings,
	has_configuration_capability,
	default_settings,
	set_global_settings,
) => {
	return (change) => {
		if (has_configuration_capability) {
			// Reset all cached document settings
			document_settings.clear()
		} else {
			set_global_settings(<Settings>(
				(change.settings.languageServerExample || default_settings)
			))
		}
		// Refresh the diagnostics since the `max_number_of_problems` could have changed.
		// We could optimize things here and re-fetch the setting first can compare it
		// to the existing setting, but this is out of scope for this example.
		connection.languages.diagnostics.refresh()
	}
}
