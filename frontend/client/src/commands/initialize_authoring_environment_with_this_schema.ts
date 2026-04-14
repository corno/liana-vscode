import { $$ as ttt_seal } from 'liana-authoring/dist/implementation/manual/text_to_text/seal'

import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode'
import * as pareto_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'

import { readSchema } from '../command_support/schema'

export default function $(): vscode.Disposable {
	return vscode.commands.registerCommand('liana.initialize_authoring_environment_with_this_schema', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('Open a liana file first to create authoring environment');
			return;
		}

		try {
			readSchema(
				editor.document.uri.toString(),
				() => {
					vscode.window.showErrorMessage('Cannot seal because no .liana/schema.slna file could be found in the same directory as the liana file.');
				},
				async ($) => {
					const newText = ttt_seal(
						editor.document.getText(),
						(): never => {
							throw new Error('Cannot seal because the file is not valid Liana.');
						},
						{
							'unmarshall': $,
							'target': {
								'indentation': '\t',
								'newline': '\n',
							},
						}
					)

					const targetUris = await vscode.window.showOpenDialog({
						canSelectFiles: false,
						canSelectFolders: true,
						canSelectMany: false,
						openLabel: 'Select Directory',
						title: 'Select directory to save .liana/schema.slna file',
					});

					if (!targetUris || targetUris.length === 0) {
						return;
					}

					const targetPath = targetUris[0].fsPath;
					const schemaFilePath = path.join(targetPath, ".liana", "schema.slna");

					const schemaDir = path.dirname(schemaFilePath);
					fs.mkdirSync(schemaDir, { recursive: true });
					fs.writeFileSync(schemaFilePath, newText, 'utf8');
					vscode.window.showInformationMessage(`authoring environment created: ${targetPath}`);

					const openChoice = await vscode.window.showInformationMessage(
						'Would you like to open the initialized authoring environment?',
						'Yes', 'No'
					);

					if (openChoice === 'Yes') {
						const uri = vscode.Uri.file(targetPath);
						await vscode.commands.executeCommand('vscode.openFolder', uri, true);
					}
				}
			)
		} catch (error) {
			if (error instanceof Error) {
				console.error('Error generating TypeScript code:', error.message);
			} else if (error instanceof pareto_unreachable_code_path.Unreachable_Code_Path_Error) {
				console.error('Unreachable code path reached:', error.message);
			} else {
				console.error('Unexpected error:', error);
			}
			const message = error instanceof Error ? error.message : String(error);
			vscode.window.showErrorMessage(`Cannot create schema: ${message}`);
		}
	})
}