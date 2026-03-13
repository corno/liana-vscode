//data types
import * as d_convert_to_json from "liana-authoring/dist/interface/generated/liana/schemas/convert_to_json/data"
import * as d_location from "liana-authoring/dist/interface/generated/liana/schemas/location/data"


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as path from 'path';
import { workspace, ExtensionContext } from 'vscode';


import { $$ as ttt_convert_to_json } from "liana-authoring/dist/implementation/manual/text_to_text/convert_to_json"


import * as fs from "fs"

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient/node';

import * as vscode from 'vscode'

let client: LanguageClient;

// Helper function to find the folding range that contains the cursor position
function findContainingFoldingRange(foldingRanges: vscode.FoldingRange[], position: vscode.Position): vscode.FoldingRange | undefined {
	// Sort ranges by specificity (smaller ranges first, as they are more specific)
	const sortedRanges = foldingRanges.sort((a, b) => {
		const aSize = a.end - a.start;
		const bSize = b.end - b.start;
		return aSize - bSize;
	});

	// Find the smallest range that contains the cursor
	for (const range of sortedRanges) {
		if (position.line >= range.start && position.line <= range.end) {
			return range;
		}
	}

	// If no containing range found, look for ranges that start near the cursor (within 2 lines)
	for (const range of sortedRanges) {
		if (Math.abs(position.line - range.start) <= 2) {
			return range;
		}
	}

	return undefined;
}

// Helper function to find direct child folding ranges within a parent range (shallow strategy)
function findChildFoldingRanges(foldingRanges: vscode.FoldingRange[], parentRange: vscode.FoldingRange): vscode.FoldingRange[] {
	// First, find all ranges that are within the parent
	const candidateRanges = foldingRanges.filter(range => {
		return range !== parentRange &&
			range.start > parentRange.start &&
			range.end < parentRange.end;
	});

	// Now filter to only include direct children (not grandchildren)
	const directChildren = candidateRanges.filter(candidate => {
		// A range is a direct child if no other candidate range contains it
		return !candidateRanges.some(other => {
			return other !== candidate &&
				other.start < candidate.start &&
				other.end > candidate.end;
		});
	});

	return directChildren;
}

const create_vscode_position = (position: d_location.Position): vscode.Position => {
	return new vscode.Position(position.line, position.character);
}

const create_vscode_range = (backend_range: d_location.Range): vscode.Range => {
	return new vscode.Range(create_vscode_position(backend_range.start), create_vscode_position(backend_range.end));
}

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
				// Clear context when not in ASTN file
				vscode.commands.executeCommand('setContext', 'liana.has_parse_errors', false);
			}
		})
	);

	// Initialize context for current file
	const activeEditor = vscode.window.activeTextEditor;
	if (activeEditor && activeEditor.document.languageId === 'liana') {
		updateErrorContext(activeEditor.document.uri);
	}

	// Register command to create a new .liana file
	context.subscriptions.push(vscode.commands.registerCommand('liana.create_liana_file', async (uri: vscode.Uri) => {
		try {
			// Determine the folder where the file should be created
			let targetFolder: vscode.Uri;
			if (uri && uri.fsPath) {
				// Check if the URI is a directory or file
				const stat = await vscode.workspace.fs.stat(uri);
				if (stat.type === vscode.FileType.Directory) {
					targetFolder = uri;
				} else {
					// If it's a file, use its parent directory
					targetFolder = vscode.Uri.file(path.dirname(uri.fsPath));
				}
			} else if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
				// Default to workspace root if no URI provided
				targetFolder = vscode.workspace.workspaceFolders[0].uri;
			} else {
				vscode.window.showErrorMessage('No workspace folder found');
				return;
			}

			// Prompt for filename
			const fileName = await vscode.window.showInputBox({
				prompt: 'Enter the name for your new Liana file',
				placeHolder: 'filename.liana',
				validateInput: (value: string) => {
					if (!value || value.trim() === '') {
						return 'Filename cannot be empty';
					}
					return null;
				}
			});

			if (!fileName) {
				return; // User cancelled
			}

			// Ensure .liana extension
			const finalFileName = fileName.endsWith('.liana') ? fileName : `${fileName}.liana`;
			const fileUri = vscode.Uri.file(path.join(targetFolder.fsPath, finalFileName));

			// Create the file with default content (single # character)
			const defaultContent = '#';
			const encoder = new TextEncoder();
			await vscode.workspace.fs.writeFile(fileUri, encoder.encode(defaultContent));

			// Open the file in the editor
			const document = await vscode.workspace.openTextDocument(fileUri);
			await vscode.window.showTextDocument(document);
		} catch (error) {
			vscode.window.showErrorMessage(`Failed to create Liana file: ${error.message}`);
		}
	}));

	{
		context.subscriptions.push(vscode.commands.registerCommand('liana.save_as_json', () => {

			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				vscode.window.showInformationMessage('Open a Liana file first to convert to JSON');
				return;
			}

			try {

				const new_text = ttt_convert_to_json(
					editor.document.getText(),
					(): never => {
						throw new Error("Conversion to JSON failed because the file is not valid ASTN.");
					},
					{
						'source': {
							'document resource identifier': editor.document.uri.toString(),
							'tab size': 4,
						},
						'target': {
							'indentation': "	",
							'newline': "\n",
						}
					}
				)

				vscode.window.showSaveDialog({}).then(fileInfos => {
					fs.writeFileSync(fileInfos.path, new_text, 'utf8');
					vscode.window.showInformationMessage('file saved as json');

				})
			} catch (error) {
				vscode.window.showErrorMessage("Cannot save as JSON because the file is not valid ASTN.");
			}
		}))
	}
	{
		context.subscriptions.push(vscode.commands.registerCommand('liana.sort_alphabetically', () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				vscode.window.showInformationMessage('Open a Liana file first to sort alphabetically');
				return;
			}

			vscode.window.showErrorMessage("IMPLEMENT ME");
			// q_sort_alphabetically(
			// 	{
			// 		'content': editor.document.getText(),
			// 		'position': editor.selection.active
			// 	}
			// ).__start(
			// 	($) => {
			// 		vscode.window.showErrorMessage("IMPLEMENT ME");

			// 		// editor.edit(editBuilder => {
			// 		// 	editBuilder.replace(create_vscode_range($.range), $.text);
			// 		// })
			// 	},
			// 	() => {
			// 		vscode.window.showErrorMessage("Sorting failed because the file is not valid liana.");

			// 	}
			// )
		}))
	}
	{
		context.subscriptions.push(vscode.commands.registerCommand('liana.convert_to_json', () => {

			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				vscode.window.showInformationMessage('Open a Liana file first to save as JSON');
				return;
			}

			try {

				const new_text = ttt_convert_to_json(
					editor.document.getText(),
					($): never => {
						throw new Error("Conversion to JSON failed because the file is not valid ASTN.");
					},
					{
						'source': {
							'document resource identifier': editor.document.uri.toString(),
							'tab size': 4,
						},
						'target': {
							'indentation': "	",
							'newline': "\n",
						}
					}
				)

				editor.edit((cb) => {
					cb.replace(
						new vscode.Range(
							new vscode.Position(0, 0),
							editor.document.lineAt(editor.document.lineCount - 1).range.end
						),
						new_text
					)
				})
			} catch (error) {
				vscode.window.showErrorMessage("Cannot convert to JSON because the file is not valid ASTN.");
			}
		}))
	}
	{
		context.subscriptions.push(vscode.commands.registerCommand('liana.jump_to_next_missing_data', () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				vscode.window.showInformationMessage('No active editor');
				return;
			}

			const document = editor.document;
			const currentPosition = editor.selection.active;
			const text = document.getText();

			// Get the current position as an offset in the document
			const currentOffset = document.offsetAt(currentPosition);

			// Find the next # character starting from the position after the cursor
			const nextHashIndex = text.indexOf('#', currentOffset + 1);

			if (nextHashIndex === -1) {
				// If no # found after cursor, search from the beginning
				const firstHashIndex = text.indexOf('#');
				if (firstHashIndex === -1) {
					vscode.window.showInformationMessage('No # character found in the document');
					return;
				}
				// Jump to the first # in the document
				const position = document.positionAt(firstHashIndex);
				editor.selection = new vscode.Selection(position, position);
				editor.revealRange(new vscode.Range(position, position));
				// Trigger completion after jumping
				vscode.commands.executeCommand('editor.action.triggerSuggest');
			} else {
				// Jump to the next # character
				const position = document.positionAt(nextHashIndex);
				editor.selection = new vscode.Selection(position, position);
				editor.revealRange(new vscode.Range(position, position));
				// Trigger completion after jumping
				vscode.commands.executeCommand('editor.action.triggerSuggest');
			}
		}))
	}
	{
		context.subscriptions.push(vscode.commands.registerCommand('liana.initialize_schema_development_environment', async () => {
			try {
				// Ask user for target directory
				const targetUris = await vscode.window.showOpenDialog({
					canSelectFiles: false,
					canSelectFolders: true,
					canSelectMany: false,
					openLabel: 'Select Target Directory',
					title: 'Select directory to initialize schema development environment'
				});

				if (!targetUris || targetUris.length === 0) {
					return; // User cancelled
				}

				const targetPath = targetUris[0].fsPath;

				// Get the template directory path relative to the extension
				const templatePath = context.asAbsolutePath('schema_development_environment_template');

				// Check if template exists
				if (!fs.existsSync(templatePath)) {
					vscode.window.showErrorMessage('Schema development environment template not found in extension.');
					console.error('Template not found at:', templatePath);
					return;
				}

				// Check if target directory is empty or ask for confirmation
				const existingFiles = fs.readdirSync(targetPath);
				if (existingFiles.length > 0) {
					const overwrite = await vscode.window.showWarningMessage(
						'Target directory is not empty. Copy template files anyway?',
						'Yes', 'No'
					);
					if (overwrite !== 'Yes') {
						return;
					}
				}

				// Copy template directory contents to target (not the directory itself)
				const entries = fs.readdirSync(templatePath, { withFileTypes: true });
				for (const entry of entries) {
					const sourcePath = path.join(templatePath, entry.name);
					const destinationPath = path.join(targetPath, entry.name);

					if (entry.isDirectory()) {
						fs.cpSync(sourcePath, destinationPath, { recursive: true });
					} else {
						fs.copyFileSync(sourcePath, destinationPath);
					}
				}

				vscode.window.showInformationMessage(`Schema development environment initialized successfully in: ${targetPath}`);

				// Ask if user wants to open the new directory
				const openChoice = await vscode.window.showInformationMessage(
					'Would you like to open the initialized schema development environment?',
					'Yes', 'No'
				);

				if (openChoice === 'Yes') {
					const uri = vscode.Uri.file(targetPath);
					await vscode.commands.executeCommand('vscode.openFolder', uri, true);
				}

			} catch (error) {
				console.error('Error initializing schema development environment:', error);
				vscode.window.showErrorMessage(`Failed to initialize schema development environment: ${error instanceof Error ? error.message : String(error)}`);
			}
		}))
	}
	{
		context.subscriptions.push(vscode.commands.registerCommand('liana.collapse_all_entries', async () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				vscode.window.showInformationMessage('No active editor');
				return;
			}

			const document = editor.document;
			const cursorPosition = editor.selection.active;

			try {
				// Get folding ranges from VS Code
				const foldingRanges = await vscode.commands.executeCommand<vscode.FoldingRange[]>(
					'vscode.executeFoldingRangeProvider',
					document.uri
				);

				if (!foldingRanges || foldingRanges.length === 0) {
					vscode.window.showInformationMessage('No foldable regions found');
					return;
				}

				// Find the folding range that contains or starts near the cursor
				const containingRange = findContainingFoldingRange(foldingRanges, cursorPosition);

				if (!containingRange) {
					vscode.window.showInformationMessage('No foldable structure found at cursor position');
					return;
				}

				// Find all child folding ranges within the containing range
				const childRanges = findChildFoldingRanges(foldingRanges, containingRange);

				if (childRanges.length === 0) {
					vscode.window.showInformationMessage('No entries found to collapse');
					return;
				}

				// Fold all child ranges
				for (const range of childRanges) {
					// Set selection to the start of the range and fold it
					const startPosition = new vscode.Position(range.start, 0);
					const endPosition = new vscode.Position(range.start, 0);
					editor.selection = new vscode.Selection(startPosition, endPosition);

					await vscode.commands.executeCommand('editor.fold');
				}

				vscode.window.showInformationMessage(`Collapsed ${childRanges.length} entries`);

			} catch (error) {
				console.error('Error collapsing entries:', error);
				vscode.window.showErrorMessage('Failed to collapse entries');
			}
		}))
	}
	{
		context.subscriptions.push(vscode.commands.registerCommand('liana.seal', () => {
			vscode.window.showInformationMessage('Seal!');

			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				vscode.window.showInformationMessage('Open a liana file first to seal');
				return;
			}

			// q_seal(
			// 	{
			// 		'read file': xxxx
			// 	},
			// )(
			// 	{
			// 		'content': editor.document.getText(),
			// 		'source': {
			// 			'file path': xxxx,
			// 			'tab size': 4
			// 		},
			// 		'target': {
			// 			'indentation': "	",
			// 			'newline': "\n",
			// 		}
			// 	},
			// 	($) => $
			// ).__extract_data(
			// 	($) => {
			// 		vscode.window.showSaveDialog({}).then(fileInfos => {
			// 			if (fileInfos) {
			// 				fs.writeFileSync(fileInfos.path, $, 'utf8');
			// 			}
			// 		})
			// 	},
			// 	($) => {
			// 		vscode.window.showErrorMessage("Cannot seal because the file is not valid ASTN.");
			// 	}
			// )
		}))
	}
	{
		// Disabled command versions that show when there are errors
		context.subscriptions.push(vscode.commands.registerCommand('liana.convert_to_json_disabled', () => {
			vscode.window.showErrorMessage('Cannot convert to JSON because the file has errors. Fix the errors first.');
		}))
	}
	{
		context.subscriptions.push(vscode.commands.registerCommand('liana.save_as_json_disabled', () => {
			vscode.window.showErrorMessage('Cannot save as JSON because the file has errors. Fix the errors first.');
		}))
	}
	{
		context.subscriptions.push(vscode.commands.registerCommand('liana.seal_disabled', () => {
			vscode.window.showErrorMessage('Cannot seal because the file has errors. Fix the errors first.');
		}))
	}


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
