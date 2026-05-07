import * as _p from 'pareto-core/dist/assign'

import { $$ as ttt_seal } from 'liana-authoring/dist/implementation/manual/text_to_text/seal'

import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode'

import { load_applicable_schema } from '../to_be_backend/load_applicable_schema'
import create_refinement_context from 'pareto-core/dist/__internals/async/create_refinement_context'

/**
 * Create or update .vscode/settings.json to mark .liana folder as readonly
 */
function configure_workspace_settings(target_path: string): void {
	const vscode_dir = path.join(target_path, '.vscode')
	const settings_file = path.join(vscode_dir, 'settings.json')

	// Create .vscode directory if it doesn't exist
	if (!fs.existsSync(vscode_dir)) {
		fs.mkdirSync(vscode_dir, { recursive: true })
	}

	// Read existing settings or create new object
	let settings: any = {}
	if (fs.existsSync(settings_file)) {
		try {
			const content = fs.readFileSync(settings_file, 'utf8')
			settings = JSON.parse(content)
		} catch (error) {
			console.warn('Could not parse existing settings.json, will create new one')
		}
	}

	// Add readonly configuration for .liana folder
	if (!settings['files.readonlyInclude']) {
		settings['files.readonlyInclude'] = {}
	}
	settings['files.readonlyInclude']['**/.liana/**'] = true

	// Write settings back
	fs.writeFileSync(settings_file, JSON.stringify(settings, null, '\t'), 'utf8')
}

export default function $(): vscode.Disposable {
	return vscode.commands.registerCommand('liana.initialize_or_update_authoring_environment_with_this_schema', async () => {
		const editor = vscode.window.activeTextEditor
		if (!editor) {
			vscode.window.showInformationMessage('Open a liana file first to create authoring environment')
			return
		}
		load_applicable_schema(
			editor.document,
			($) => {

				_p.decide.state($.type, ($) => {
					switch ($[0]) {
						case 'read file': return _p.ss($, ($) => {
							vscode.window.showErrorMessage('Cannot initialize authoring environment because no .liana/schema.slna file could be found in the same directory as the liana file: ' + $.error.message)
						})
						case 'parse schema': return _p.ss($, ($) => {
							vscode.window.showErrorMessage('Cannot initialize authoring environment because the .liana/schema.slna file is not a valid schema.')
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
						const new_text = $


						const target_uris = await vscode.window.showOpenDialog({
							canSelectFiles: false,
							canSelectFolders: true,
							canSelectMany: false,
							openLabel: 'Select Directory',
							title: 'Select directory to save .liana/schema.slna file',
						})

						if (!target_uris || target_uris.length === 0) {
							return
						}

						const target_path = target_uris[0].fsPath
						const schema_file_path = path.join(target_path, ".liana", "schema.slna")

						const schema_dir = path.dirname(schema_file_path)
						fs.mkdirSync(schema_dir, { recursive: true })
						fs.writeFileSync(schema_file_path, new_text, 'utf8')
						
						// Make the schema file readonly at OS level
						fs.chmodSync(schema_file_path, 0o444)
						
						// Configure workspace settings to mark .liana folder as readonly
						configure_workspace_settings(target_path)
						
						vscode.window.showInformationMessage(`authoring environment created: ${target_path}`)

						const open_choice = await vscode.window.showInformationMessage(
							'Would you like to open the initialized authoring environment?',
							'Yes', 'No'
						)

						if (open_choice === 'Yes') {
							const uri = vscode.Uri.file(target_path)
							await vscode.commands.executeCommand('vscode.openFolder', uri, true)
						}
					},
					async ($) => {
						vscode.window.showErrorMessage(`Cannot create schema: ${$}`)
					}
				)
			}
		)
	})
}