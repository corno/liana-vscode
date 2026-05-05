import * as _p from 'pareto-core/dist/assign'

import { $$ as ttt_seal } from 'liana-authoring/dist/implementation/manual/text_to_text/seal'

import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode'

import { load_applicable_schema } from '../to_be_backend/load_applicable_schema'
import create_refinement_context from 'pareto-core/dist/__internals/async/create_refinement_context'

export default function $(): vscode.Disposable {
	return vscode.commands.registerCommand('liana.initialize_authoring_environment_with_this_schema', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('Open a liana file first to create authoring environment');
			return;
		}
		load_applicable_schema(
			editor.document,
			($) => {

				_p.decide.state($.type, ($) => {
					switch ($[0]) {
						case 'read file': return _p.ss($, ($) => {
							vscode.window.showErrorMessage('Cannot initialize authoring environment because no .liana/schema.slna file could be found in the same directory as the liana file: ' + $.error.message);
						})
						case 'parse schema': return _p.ss($, ($) => {
							vscode.window.showErrorMessage('Cannot initialize authoring environment because the .liana/schema.slna file is not a valid schema.');
						})
						default: return _p.au($[0])
					}
				})
			},
			async ($) => {
				create_refinement_context<string, string>(
					(abort) => ttt_seal(
						editor.document.getText(),
						($) => abort("Cannot initialize authoring environment because the file is not valid Liana."),
						{
							'unmarshall': $,
							'target': {
								'indentation': '\t',
								'newline': '\n',
							},
						}
					)
				).__extract_data(
					async ($) => {
						const newText = $


						const target_URIs = await vscode.window.showOpenDialog({
							canSelectFiles: false,
							canSelectFolders: true,
							canSelectMany: false,
							openLabel: 'Select Directory',
							title: 'Select directory to save .liana/schema.slna file',
						});

						if (!target_URIs || target_URIs.length === 0) {
							return;
						}

						const targetPath = target_URIs[0].fsPath;
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
					},
					async ($) => {
						vscode.window.showErrorMessage(`Cannot create schema: ${$}`);
					}
				)
			}
		)
	})
}