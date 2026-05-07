/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as path from 'path'
import { workspace, ExtensionContext } from 'vscode'

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient/node'

import * as vscode from 'vscode'

import { register_commands } from './command_index'

let client: LanguageClient

// Export the notation style state so it can be accessed by the server
export function get_notation_style(context: ExtensionContext, document_uri?: string): 'verbose' | 'concise' {
	if (document_uri) {
		// Check for document-specific preference
		const doc_styles = context.workspaceState.get<Record<string, 'verbose' | 'concise'>>('liana.documentNotationStyles', {})
		if (doc_styles[document_uri]) {
			return doc_styles[document_uri]
		}
	}
	// Fall back to workspace default
	return context.workspaceState.get<'verbose' | 'concise'>('liana.defaultNotationStyle', 'verbose')
}

export function set_notation_style(context: ExtensionContext, style: 'verbose' | 'concise', document_uri?: string): void {
	if (document_uri) {
		// Set document-specific preference
		const doc_styles = context.workspaceState.get<Record<string, 'verbose' | 'concise'>>('liana.documentNotationStyles', {})
		doc_styles[document_uri] = style
		context.workspaceState.update('liana.documentNotationStyles', doc_styles)
	} else {
		// Set workspace default
		context.workspaceState.update('liana.defaultNotationStyle', style)
	}
}

// Export function to get the client for sending notifications
export function get_client(): LanguageClient | undefined {
	return client
}

function update_status_bar(context: ExtensionContext, status_bar_item: vscode.StatusBarItem, editor?: vscode.TextEditor) {
	if (editor && editor.document.languageId === 'liana') {
		const style = get_notation_style(context, editor.document.uri.toString())
		const has_doc_specific = context.workspaceState.get<Record<string, 'verbose' | 'concise'>>('liana.documentNotationStyles', {})[editor.document.uri.toString()] !== undefined
		status_bar_item.text = `$(symbol-property) ${style === 'verbose' ? 'Verbose' : 'Concise'}${has_doc_specific ? ' (doc)' : ''}`
		status_bar_item.tooltip = `Liana notation style: ${style}${has_doc_specific ? ' (document-specific)' : ' (workspace default)'}\nClick to toggle`
		status_bar_item.show()
	} else {
		status_bar_item.hide()
	}
}

export function activate(context: ExtensionContext) {
	// Create status bar item for notation style
	const status_bar_item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100)
	status_bar_item.command = 'liana.toggle_notation_style'
	context.subscriptions.push(status_bar_item)
	
	// Update status bar for current editor
	update_status_bar(context, status_bar_item, vscode.window.activeTextEditor)
	
	// Update status bar when active editor changes
	context.subscriptions.push(
		vscode.window.onDidChangeActiveTextEditor(editor => {
			update_status_bar(context, status_bar_item, editor)
			if (editor && editor.document.languageId === 'liana' && client) {
				const style = get_notation_style(context, editor.document.uri.toString())
				client.sendRequest('liana/updateNotationStyle', { 
					uri: editor.document.uri.toString(), 
					style 
				}).catch(() => {})
			}
		})
	)

	// Set up diagnostic monitoring for error state
	function update_error_context(uri: vscode.Uri) {
		const diagnostics = vscode.languages.getDiagnostics(uri)
		const has_errors = diagnostics.some(diagnostic =>
			diagnostic.severity === vscode.DiagnosticSeverity.Error
		)
		const has_parse_errors = diagnostics.some(diagnostic =>
			diagnostic.severity === vscode.DiagnosticSeverity.Error &&
			diagnostic.source === 'liana-parser'
		)
		vscode.commands.executeCommand('setContext', 'liana.has_errors', has_errors)
		vscode.commands.executeCommand('setContext', 'liana.has_parse_errors', has_parse_errors)
	}

	// Monitor diagnostic changes
	context.subscriptions.push(
		vscode.languages.onDidChangeDiagnostics(event => {
			const active_editor = vscode.window.activeTextEditor
			if (active_editor && active_editor.document.languageId === 'liana') {
				for (const uri of event.uris) {
					if (uri.toString() === active_editor.document.uri.toString()) {
						update_error_context(uri)
						break
					}
				}
			}
		})
	)

	// Monitor active editor changes
	context.subscriptions.push(
		vscode.window.onDidChangeActiveTextEditor(editor => {
			if (editor && editor.document.languageId === 'liana') {
				update_error_context(editor.document.uri)
			} else {
				vscode.commands.executeCommand('setContext', 'liana.has_parse_errors', false)
			}
		})
	)

	const active_editor = vscode.window.activeTextEditor
	if (active_editor && active_editor.document.languageId === 'liana') {
		update_error_context(active_editor.document.uri)
	}

	async function update_workspace_has_schema_context() {
		try {
			const schema_files = await vscode.workspace.findFiles("**/.liana/schema.slna", null, 1)
			const has_schema = schema_files.length > 0
			vscode.commands.executeCommand('setContext', 'liana.workspaceHasSchema', has_schema)
		} catch (error) {
			vscode.commands.executeCommand('setContext', 'liana.workspaceHasSchema', false)
		}
	}

	update_workspace_has_schema_context()

	const schema_watcher = vscode.workspace.createFileSystemWatcher("**/.liana/schema.slna")
	context.subscriptions.push(schema_watcher.onDidCreate(() => update_workspace_has_schema_context()))
	context.subscriptions.push(schema_watcher.onDidDelete(() => update_workspace_has_schema_context()))
	context.subscriptions.push(schema_watcher)
	
	register_commands(context, status_bar_item, (editor) => update_status_bar(context, status_bar_item, editor))


	// The server is implemented in node
	const server_module = context.asAbsolutePath(
		path.join("server", "out", "server.js")
	)

	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used
	const server_options: ServerOptions = {
		run: {
			module: server_module,
			transport: TransportKind.ipc
		},
		debug: {
			module: server_module,
			transport: TransportKind.ipc,
		}
	}

	// Options to control the language client
	const client_options: LanguageClientOptions = {
		// Register the server for plain text documents
		documentSelector: [{ scheme: 'file', language: 'liana' }],
		synchronize: {
			// Notify the server about file changes to '.clientrc' and schema files
			fileEvents: [
				workspace.createFileSystemWatcher('**/.clientrc'),
				schema_watcher
			]
		},
		initializationOptions: {
			notationStyle: vscode.window.activeTextEditor && vscode.window.activeTextEditor.document.languageId === 'liana'
				? get_notation_style(context, vscode.window.activeTextEditor.document.uri.toString())
				: get_notation_style(context)
		}
	}

	// Create the language client and start the client.
	client = new LanguageClient(
		'ASNTLanguageServer',
		'ASTN Language Server',
		server_options,
		client_options
	)

	// Register a custom request handler to get current notation style
	context.subscriptions.push(
		vscode.commands.registerCommand('liana.getNotationStyle', () => {
			return get_notation_style(context)
		})
	)

	// Start the client. This will also launch the server
	client.start()


}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined
	}
	return client.stop()
}
