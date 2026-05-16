import * as vscode_node from 'vscode-languageserver/node'
import * as vscode_textdocument from 'vscode-languageserver-textdocument'
import { Settings } from './types'
import { create_on_initialize } from './connection/on_initialize'
import { create_on_initialized } from './connection/on_initialized'
import { create_on_did_change_configuration } from './connection/on_did_change_configuration'
import { create_on_diagnostics } from './connection/on_diagnostics'
import { create_on_did_change_watched_files } from './connection/on_did_change_watched_files'
import { create_on_update_notation_style } from './connection/on_update_notation_style'
import { create_on_completion } from './connection/on_completion'
import { create_on_completion_resolve } from './connection/on_completion_resolve'
import { create_on_hover } from './connection/on_hover'
import { create_on_selection_ranges } from './connection/on_selection_ranges'
import { create_on_code_action } from './connection/on_code_action'
import { create_on_code_action_resolve } from './connection/on_code_action_resolve'
import { create_on_document_formatting } from './connection/on_document_formatting'
import { create_on_document_symbol } from './connection/on_document_symbol'

export const create_connection = (
	document_settings: Map<string, Thenable<Settings>>,
	documents: vscode_node.TextDocuments<vscode_textdocument.TextDocument>,
) => {

	// The global settings, used when the `workspace/configuration` request is not supported by the client.
	// Please note that this is not the case when using this server with the client provided in this example
	// but could happen with other clients.
	const default_settings: Settings = { max_number_of_problems: 1000 }


	let global_settings: Settings = default_settings

	// Store the notation style preference per document
	const document_notation_styles: Map<string, 'verbose' | 'concise'> = new Map()

	let has_configuration_capability = false
	let has_workspace_folder_capability = false
	let has_diagnostic_related_information_capability = false

	const connection = vscode_node.createConnection(vscode_node.ProposedFeatures.all)

	connection.onInitialize(
		create_on_initialize(
			document_notation_styles,
			(value) => { has_configuration_capability = value },
			(value) => { has_workspace_folder_capability = value },
			(value) => { has_diagnostic_related_information_capability = value }
		)
	)

	connection.onInitialized(
		create_on_initialized(
			connection,
			has_configuration_capability,
			has_workspace_folder_capability
		)
	)

	connection.onDidChangeConfiguration(
		create_on_did_change_configuration(
			connection,
			document_settings,
			has_configuration_capability,
			default_settings,
			(settings) => { global_settings = settings }
		)
	)

	connection.languages.diagnostics.on(
		create_on_diagnostics(documents)
	)

	connection.onDidChangeWatchedFiles(
		create_on_did_change_watched_files(connection, documents)
	)

	connection.onRequest('liana/update_notation_style',
		create_on_update_notation_style(connection, document_notation_styles)
	)

	connection.onCompletion(
		create_on_completion(documents, document_notation_styles)
	)

	connection.onCompletionResolve(
		create_on_completion_resolve()
	)

	connection.onHover(
		create_on_hover(documents)
	)

	connection.onCodeAction(
		create_on_code_action(documents)
	)

	connection.onSelectionRanges(
		create_on_selection_ranges(documents, connection)
	)

	connection.onCodeActionResolve(
		create_on_code_action_resolve(documents, connection)
	)

	connection.onDocumentFormatting(
		create_on_document_formatting(documents, connection)
	)

	connection.onDocumentSymbol(
		create_on_document_symbol(documents)
	)

	// Make the text document manager listen on the connection
	// for open, change and close text document events
	documents.listen(connection)

	// Listen on the connection
	connection.listen()

	return connection
}