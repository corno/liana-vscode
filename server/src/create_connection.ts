import * as vscode_node from 'vscode-languageserver/node'
import * as vscode_textdocument from 'vscode-languageserver-textdocument'
import { Connection_Context } from './connection_context'

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
import { create_on_document_link } from './connection/on_document_link'

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

	const connection_context: Connection_Context = {
		'documents': documents,
		'connection': connection,
		'document notation styles': document_notation_styles,
		'document settings': document_settings,
		'default settings': default_settings,
		'set has configuration capability': (value) => { has_configuration_capability = value },
		'set has workspace folder capability': (value) => { has_workspace_folder_capability = value },
		'set has diagnostic related information capability': (value) => { has_diagnostic_related_information_capability = value },
		'has configuration capability': () => has_configuration_capability,
		'has workspace folder capability': () => has_workspace_folder_capability,
		'has diagnostic related information capability': () => has_diagnostic_related_information_capability,
		'set global settings': (settings) => { global_settings = settings },
	}

	connection.onInitialize(
		create_on_initialize(connection_context)
	)

	connection.onInitialized(
		create_on_initialized(connection_context)
	)

	connection.onDidChangeConfiguration(
		create_on_did_change_configuration(connection_context)
	)

	connection.languages.diagnostics.on(
		create_on_diagnostics(connection_context)
	)

	connection.onDidChangeWatchedFiles(
		create_on_did_change_watched_files(connection_context)
	)

	connection.onRequest('liana/update_notation_style',
		create_on_update_notation_style(connection_context)
	)

	connection.onCompletion(
		create_on_completion(connection_context)
	)

	connection.onCompletionResolve(
		create_on_completion_resolve(connection_context)
	)

	connection.onHover(
		create_on_hover(connection_context)
	)

	connection.onCodeAction(
		create_on_code_action(connection_context)
	)

	connection.onSelectionRanges(
		create_on_selection_ranges(connection_context)
	)

	connection.onCodeActionResolve(
		create_on_code_action_resolve(connection_context)
	)

	connection.onDocumentFormatting(
		create_on_document_formatting(connection_context)
	)

	connection.onDocumentSymbol(
		create_on_document_symbol(connection_context)
	)

	connection.onDocumentLinks(
		create_on_document_link(connection_context)
	)

	// Handle shutdown gracefully
	connection.onShutdown(() => {
		// Clean up any resources if needed
		return Promise.resolve()
	})

	connection.onExit(() => {
		process.exit(0)
	})

	// Make the text document manager listen on the connection
	// for open, change and close text document events
	documents.listen(connection)

	// Listen on the connection
	connection.listen()

	return connection
}