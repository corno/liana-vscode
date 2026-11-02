import { show_error_message } from '../helpers/error_report'
import * as p_ from "pareto-core/transformer"
import p_create_refinement_context from "pareto-core/__internal/sync/create_refinement_context"

import { seal_artifact } from "../helpers/seal"

import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode'

import { load_applicable_schema } from '../to_be_backend/load_applicable_schema'

import * as types from "../types"
import { schema_command_document } from '../helpers/schema_commands'

export default ((deps) => async (uri?: vscode.Uri) => {
	const document = await schema_command_document('deploy schema', uri)
	if (document === undefined) return
	const schema_file_uri = document.uri.toString()
	load_applicable_schema(
		document,
		($) => {

			p_.from.state($.type).decide(($): null => {
				switch ($[0]) {
					case 'read file': return p_.option($, ($) => {
						show_error_message('Cannot deploy schema because no .liana/schema.slna file could be found in an ancestor directory of the Liana file: ' + $.error.message)
						return null
					})
					case 'parse schema': return p_.option($, ($) => {
						show_error_message('Cannot deploy schema because the .liana/schema.slna file is not a valid schema: ' + $.error)
						return null
					})
					default: return p_.exhaustive($[0])
				}
			})
		},
		($, root_type, _schema_body, root) => {
			p_create_refinement_context<string, string>(
				(abort) => seal_artifact(
					document.getText(),
					{ schema: $[1].schema, 'root type': root },
					abort,
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
						openLabel: 'Deploy',
						title: 'Select authoring environment directory to deploy .liana/schema.slna to',
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
							new_text,
							'utf8'
						)

						// Make the schema file readonly at OS level
						fs.chmodSync(schema_file_path, 0o444)

						vscode.window.showInformationMessage(`Schema deployed to ${target_path}`)

					})

				},
				($) => {
					show_error_message(`Cannot deploy schema: ${$}`)
				}
			)
		}
	)
}) satisfies types.Register_Command