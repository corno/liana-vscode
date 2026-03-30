/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as path from 'path';
import { workspace, ExtensionContext } from 'vscode';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient/node';

import * as vscode from 'vscode'

import { registerCommands } from './command_index'

let client: LanguageClient;

export function activate(context: ExtensionContext) {
	// Set up diagnostic monitoring for error state
	function updateErrorContext(uri: vscode.Uri) {
		const diagnostics = vscode.languages.getDiagnostics(uri);
		const has_errors = diagnostics.some(diagnostic =>
			diagnostic.severity === vscode.DiagnosticSeverity.Error
		);
		const has_parse_errors = diagnostics.some(diagnostic =>
			diagnostic.severity === vscode.DiagnosticSeverity.Error &&
			diagnostic.source === 'liana-parser'
		);
		vscode.commands.executeCommand('setContext', 'liana.has_errors', has_errors);
		vscode.commands.executeCommand('setContext', 'liana.has_parse_errors', has_parse_errors);
	}

	// Monitor diagnostic changes
	context.subscriptions.push(
		vscode.languages.onDidChangeDiagnostics(event => {
			const activeEditor = vscode.window.activeTextEditor;
			if (activeEditor && activeEditor.document.languageId === 'liana') {
				for (const uri of event.uris) {
					if (uri.toString() === activeEditor.document.uri.toString()) {
						updateErrorContext(uri);
						break;
					}
				}
			}
		})
	);

	// Monitor active editor changes
	context.subscriptions.push(
		vscode.window.onDidChangeActiveTextEditor(editor => {
			if (editor && editor.document.languageId === 'liana') {
				updateErrorContext(editor.document.uri);
			} else {
				vscode.commands.executeCommand('setContext', 'liana.has_parse_errors', false);
			}
		})
	);

	const activeEditor = vscode.window.activeTextEditor;
	if (activeEditor && activeEditor.document.languageId === 'liana') {
		updateErrorContext(activeEditor.document.uri);
	}

	async function updateWorkspaceHasSchemaContext() {
		try {
			const schemaFiles = await vscode.workspace.findFiles('**/liana-schema.slna', null, 1);
			const hasSchema = schemaFiles.length > 0;
			vscode.commands.executeCommand('setContext', 'liana.workspaceHasSchema', hasSchema);
		} catch (error) {
			vscode.commands.executeCommand('setContext', 'liana.workspaceHasSchema', false);
		}
	}

	updateWorkspaceHasSchemaContext();

	const schemaWatcher = vscode.workspace.createFileSystemWatcher('**/liana-schema.slna');
	context.subscriptions.push(schemaWatcher.onDidCreate(() => updateWorkspaceHasSchemaContext()));
	context.subscriptions.push(schemaWatcher.onDidDelete(() => updateWorkspaceHasSchemaContext()));
	context.subscriptions.push(schemaWatcher);
	registerCommands(context);


	// The server is implemented in node
	const serverModule = context.asAbsolutePath(
		path.join('server', 'out', 'server.js')
	);

	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used
	const serverOptions: ServerOptions = {
		run: { module: serverModule, transport: TransportKind.ipc },
		debug: {
			module: serverModule,
			transport: TransportKind.ipc,
		}
	};

	// Options to control the language client
	const clientOptions: LanguageClientOptions = {
		// Register the server for plain text documents
		documentSelector: [{ scheme: 'file', language: 'liana' }],
		synchronize: {
			// Notify the server about file changes to '.clientrc files contained in the workspace
			fileEvents: workspace.createFileSystemWatcher('**/.clientrc')
		}
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		'ASNTLanguageServer',
		'ASTN Language Server',
		serverOptions,
		clientOptions
	);


	vscode.languages.registerDocumentFormattingEditProvider('liana', {
		provideDocumentFormattingEdits(document: vscode.TextDocument, options) {
			const edits: vscode.TextEdit[] = [];
			// Read user configuration for formatting
			const config = vscode.workspace.getConfiguration('liana');

			return new Promise((resolve, reject) => {
				resolve([])
				// q_format(
				// 	{
				// 		'content': document.getText(),
				// 		'options': {
				// 			'preserve delimiters': config.get<boolean>('format.Preserve Delimiters', false),
				// 			'indent string': config.get<string>('format.Indentation String', '    '),
				// 			'preserve final newline state': config.get<boolean>('format.Preserve Final Newline State', true),
				// 			'preserve commas': config.get<boolean>('format.Preserve Commas', true),
				// 			'insert spaces': options.insertSpaces,
				// 		}
				// 	}
				// ).__extract_data(
				// 	($) => {
				// 		resolve($.map(edit => {
				// 			switch (edit[0]) {
				// 				case 'replace':
				// 					console.log("REPLACE", edit[1].range.start, edit[1].range.end, edit[1].text)

				// 					return vscode.TextEdit.replace(
				// 						create_vscode_range(edit[1].range),
				// 						edit[1].text
				// 					);
				// 				case 'delete':
				// 					return vscode.TextEdit.delete(
				// 						create_vscode_range(edit[1].range)
				// 					);
				// 				case 'insert':
				// 					return vscode.TextEdit.insert(
				// 						create_vscode_position(edit[1].location),
				// 						edit[1].text
				// 					);
				// 			}
				// 		}).__get_raw_copy().map(($) => $))
				// 	},
				// 	($) => {

				// 		console.error("Formatting failed:", $.message);
				// 		vscode.window.showErrorMessage("Formatting failed: " + $.message);
				// 		resolve([])
				// 	}
				// )
			})
		}
	})

	// Start the client. This will also launch the server
	client.start();


}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined
	}
	return client.stop()
}
