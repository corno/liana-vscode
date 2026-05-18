import * as _p from 'pareto-core/dist/assign'

import { $$ as ttt_seal } from 'liana-authoring/dist/implementation/manual/text_to_text/seal'

import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode'

import { load_applicable_schema } from '../to_be_backend/load_applicable_schema'
import create_refinement_context from 'pareto-core/dist/__internals/async/create_refinement_context'

import * as types from "../types"

export default ((deps) => async () => {
	const editor = vscode.window.activeTextEditor
	if (!editor) {
		vscode.window.showInformationMessage('Open a liana file first to create authoring environment')
		return
	}
	const schema_file_uri = editor.document.uri.toString()
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
						'unmarshall': {
							'module': _p.decide.state($, ($) => {
								switch ($[0]) {
									case 'constrained': return _p.ss($, ($) => $['module resolver'].entry.signature.module)
									case 'unconstrained': return _p.ss($, ($) => $.module.entry)
									default: return _p.au($[0])
								}
							}),
							'tab size': 1, // vscode works with character, not with columns
						},
						'target': {
							'indentation': "",
							'newline': "",
						},
					}
				)
			).__extract_data(
				async ($) => {
					const new_text = $

					// Get last selected directory for this schema file
					const directory_map = deps!.context.workspaceState.get<Record<string, string>>('liana.authoring_environment_directories', {})
					const last_directory = directory_map[schema_file_uri]
					const default_uri = last_directory ? vscode.Uri.file(last_directory) : undefined

					const target_uris = await vscode.window.showOpenDialog({
						canSelectFiles: false,
						canSelectFolders: true,
						canSelectMany: false,
						openLabel: 'Select Directory',
						title: 'Select directory to save .liana/schema.slna file',
						defaultUri: default_uri,
					})

					if (!target_uris || target_uris.length === 0) {
						return
					}

					const target_path = target_uris[0].fsPath

					// Store the selected directory for this schema file
					const updated_map = deps!.context.workspaceState.get<Record<string, string>>('liana.authoring_environment_directories', {})
					updated_map[schema_file_uri] = target_path
					deps!.context.workspaceState.update('liana.authoring_environment_directories', updated_map)

					const schema_file_path = path.join(target_path, ".liana", "schema.slna")

					const schema_dir = path.dirname(schema_file_path)
					fs.mkdirSync(schema_dir, { recursive: true })

					// If file exists and is readonly, make it writable first
					if (fs.existsSync(schema_file_path)) {
						fs.chmodSync(schema_file_path, 0o644)
					}

					fs.writeFileSync(schema_file_path, new_text, 'utf8')

					// Make the schema file readonly at OS level
					fs.chmodSync(schema_file_path, 0o444)

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
}) satisfies types.Register_Command