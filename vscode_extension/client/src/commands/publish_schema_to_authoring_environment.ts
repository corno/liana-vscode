import * as p_schema from 'pareto-core/schema'
import * as p_ from "pareto-core/transformer"
import p_create_refinement_context from "pareto-core/__internal/sync/create_refinement_context"

import { $$ as ttt_seal } from "../helpers/seal"

import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode'

import { load_applicable_schema } from '../to_be_backend/load_applicable_schema'

import * as types from "../types"

export default ((deps) => async () => {
	const editor = vscode.window.activeTextEditor
	if (!editor) {
		vscode.window.showInformationMessage('Open a Liana schema file first to publish it to an authoring environment')
		return
	}
	const has_errors = vscode.languages.getDiagnostics(editor.document.uri).some(diagnostic =>
		diagnostic.severity === vscode.DiagnosticSeverity.Error
	)
	if (has_errors) {
		vscode.window.showErrorMessage('Cannot publish schema because the document has errors. Fix them first.')
		return
	}
	const schema_file_uri = editor.document.uri.toString()
	load_applicable_schema(
		editor.document,
		($) => {

			p_.from.state($.type).decide(($): null => {
				switch ($[0]) {
					case 'read file': return p_.option($, ($) => {
						vscode.window.showErrorMessage('Cannot publish schema because no .liana/schema.slna file could be found in an ancestor directory of the Liana file: ' + $.error.message)
						return null
					})
					case 'parse schema': return p_.option($, ($) => {
						vscode.window.showErrorMessage('Cannot publish schema because the .liana/schema.slna file is not a valid schema: ' + $.error)
						return null
					})
					default: return p_.exhaustive($[0])
				}
			})
		},
		($, root_type) => {
			p_create_refinement_context<p_schema.List<string>, string>(
				(abort) => ttt_seal(
					editor.document.getText(),
					($) => abort("Cannot publish schema because the file is not valid Liana."),
					{
						'unmarshall': {
							'type': root_type,
							'tab size': 1, // vscode works with character, not with columns
						},
						'target': {
							'indentation': "",
							'newline': "",
						},
					}
				)
			).__extract_data(
				($) => {
					const new_text = $

					// Get last selected directory for this schema file
					const directory_map = deps!.context.workspaceState.get<Record<string, string>>('liana.authoring_environment_directories', {})
					const last_directory = directory_map[schema_file_uri]
					const default_uri = last_directory ? vscode.Uri.file(last_directory) : undefined

					vscode.window.showOpenDialog({
						canSelectFiles: false,
						canSelectFolders: true,
						canSelectMany: false,
						openLabel: 'Publish',
						title: 'Select authoring environment directory to publish .liana/schema.slna to',
						defaultUri: default_uri,
					}).then((target_uris) => {

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

						fs.writeFileSync(
							schema_file_path,
							new_text.__get_raw().join(""),
							'utf8'
						)

						// Make the schema file readonly at OS level
						fs.chmodSync(schema_file_path, 0o444)

						vscode.window.showInformationMessage(`Schema published to ${target_path}`)

					})

				},
				($) => {
					vscode.window.showErrorMessage(`Cannot publish schema: ${$}`)
				}
			)
		}
	)
}) satisfies types.Register_Command