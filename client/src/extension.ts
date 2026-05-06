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

import { registerCommands } from './command_index'

let client: LanguageClient

// Export the notation style state so it can be accessed by the server
export function getNotationStyle(context: ExtensionContext, documentUri?: string): 'verbose' | 'concise' {
	if (documentUri) {
		// Check for document-specific preference
		const docStyles = context.workspaceState.get<Record<string, 'verbose' | 'concise'>>('liana.documentNotationStyles', {})
		if (docStyles[documentUri]) {
			return docStyles[documentUri]
		}
	}
	// Fall back to workspace default
	return context.workspaceState.get<'verbose' | 'concise'>('liana.defaultNotationStyle', 'verbose')
}

export function setNotationStyle(context: ExtensionContext, style: 'verbose' | 'concise', documentUri?: string): void {
	if (documentUri) {
		// Set document-specific preference
		const docStyles = context.workspaceState.get<Record<string, 'verbose' | 'concise'>>('liana.documentNotationStyles', {})
		docStyles[documentUri] = style
		context.workspaceState.update('liana.documentNotationStyles', docStyles)
	} else {
		// Set workspace default
		context.workspaceState.update('liana.defaultNotationStyle', style)
	}
}

// Export function to get the client for sending notifications
export function getClient(): LanguageClient | undefined {
	return client
}

function updateStatusBar(context: ExtensionContext, statusBarItem: vscode.StatusBarItem, editor?: vscode.TextEditor) {
	if (editor && editor.document.languageId === 'liana') {
		const style = getNotationStyle(context, editor.document.uri.toString())
		const hasDocSpecific = context.workspaceState.get<Record<string, 'verbose' | 'concise'>>('liana.documentNotationStyles', {})[editor.document.uri.toString()] !== undefined
		statusBarItem.text = `$(symbol-property) ${style === 'verbose' ? 'Verbose' : 'Concise'}${hasDocSpecific ? ' (doc)' : ''}`
		statusBarItem.tooltip = `Liana notation style: ${style}${hasDocSpecific ? ' (document-specific)' : ' (workspace default)'}\nClick to toggle`
		statusBarItem.show()
	} else {
		statusBarItem.hide()
	}
}

export function activate(context: ExtensionContext) {
	// Create status bar item for notation style
	const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100)
	statusBarItem.command = 'liana.toggle_notation_style'
	context.subscriptions.push(statusBarItem)
	
	// Update status bar for current editor
	updateStatusBar(context, statusBarItem, vscode.window.activeTextEditor)
	
	// Update status bar when active editor changes
	context.subscriptions.push(
		vscode.window.onDidChangeActiveTextEditor(editor => {
			updateStatusBar(context, statusBarItem, editor)
			if (editor && editor.document.languageId === 'liana' && client) {
				const style = getNotationStyle(context, editor.document.uri.toString())
				client.sendRequest('liana/updateNotationStyle', { 
					uri: editor.document.uri.toString(), 
					style 
				}).catch(() => {})
			}
		})
	)

	// Set up diagnostic monitoring for error state
	function updateErrorContext(uri: vscode.Uri) {
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
			const activeEditor = vscode.window.activeTextEditor
			if (activeEditor && activeEditor.document.languageId === 'liana') {
				for (const uri of event.uris) {
					if (uri.toString() === activeEditor.document.uri.toString()) {
						updateErrorContext(uri)
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
				updateErrorContext(editor.document.uri)
			} else {
				vscode.commands.executeCommand('setContext', 'liana.has_parse_errors', false)
			}
		})
	)

	const activeEditor = vscode.window.activeTextEditor
	if (activeEditor && activeEditor.document.languageId === 'liana') {
		updateErrorContext(activeEditor.document.uri)
	}

	async function updateWorkspaceHasSchemaContext() {
		try {
			const schemaFiles = await vscode.workspace.findFiles("**/.liana/schema.slna", null, 1)
			const hasSchema = schemaFiles.length > 0
			vscode.commands.executeCommand('setContext', 'liana.workspaceHasSchema', hasSchema)
		} catch (error) {
			vscode.commands.executeCommand('setContext', 'liana.workspaceHasSchema', false)
		}
	}

	updateWorkspaceHasSchemaContext()

	const schemaWatcher = vscode.workspace.createFileSystemWatcher("**/.liana/schema.slna")
	context.subscriptions.push(schemaWatcher.onDidCreate(() => updateWorkspaceHasSchemaContext()))
	context.subscriptions.push(schemaWatcher.onDidDelete(() => updateWorkspaceHasSchemaContext()))
	context.subscriptions.push(schemaWatcher)
	
	registerCommands(context, statusBarItem, (editor) => updateStatusBar(context, statusBarItem, editor))


	// The server is implemented in node
	const serverModule = context.asAbsolutePath(
		path.join("server", "out", "server.js")
	)

	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used
	const serverOptions: ServerOptions = {
		run: {
			module: serverModule,
			transport: TransportKind.ipc
		},
		debug: {
			module: serverModule,
			transport: TransportKind.ipc,
		}
	}

	// Options to control the language client
	const clientOptions: LanguageClientOptions = {
		// Register the server for plain text documents
		documentSelector: [{ scheme: 'file', language: 'liana' }],
		synchronize: {
			// Notify the server about file changes to '.clientrc' and schema files
			fileEvents: [
				workspace.createFileSystemWatcher('**/.clientrc'),
				schemaWatcher
			]
		},
		initializationOptions: {
			notationStyle: vscode.window.activeTextEditor && vscode.window.activeTextEditor.document.languageId === 'liana'
				? getNotationStyle(context, vscode.window.activeTextEditor.document.uri.toString())
				: getNotationStyle(context)
		}
	}

	// Create the language client and start the client.
	client = new LanguageClient(
		'ASNTLanguageServer',
		'ASTN Language Server',
		serverOptions,
		clientOptions
	)

	// Register a custom request handler to get current notation style
	context.subscriptions.push(
		vscode.commands.registerCommand('liana.getNotationStyle', () => {
			return getNotationStyle(context)
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
