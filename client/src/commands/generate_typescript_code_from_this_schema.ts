import * as p_ from 'pareto-core/implementation/transformer'
import p_create_refinement_context from 'pareto-core/implementation/__internal/sync/create_refinement_context'

//data types
import * as d_path from "pareto-resources/interface/generated/liana/schemas/fs_unrestricted_path/data"

//resources
import * as cx_copy from "pareto-resource-filesystem-unrestricted/commands/copy"
import * as cx_make_directory from "pareto-resource-filesystem-unrestricted/commands/make_directory"
import * as cx_remove from "pareto-resource-filesystem-unrestricted/commands/remove"
import * as cx_write_file from "pareto-resource-filesystem-unrestricted/commands/write_file"
import * as qx_read_file from "pareto-resource-filesystem-unrestricted/queries/read_file"

//dependencies
import * as c_generate_typescript from "pareto-liana/implementation/manual/commands/generate_typescript"
import * as r_path_from_text from "pareto-resources/implementation/manual/refiners/path_unrestricted/text"
import * as t_generate_typescript_to_prose from "pareto-liana/implementation/manual/transformers/generate_typescript/prose"
import * as t_prose_to_text from "pareto-fountain-pen/implementation/manual/transformers/prose/text"
import { $$ as ttt_seal } from "../helpers/seal"
import { load_applicable_schema } from '../to_be_backend/load_applicable_schema'
import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import * as vscode from 'vscode'

import * as types from "../types"

export default ((deps) => async () => {
	const editor = vscode.window.activeTextEditor
	if (!editor) {
		vscode.window.showInformationMessage('Open a liana file first to generate TypeScript code')
		return
	}

	// First, load the schema and convert to verbose notation
	load_applicable_schema(
		editor.document,
		($) => {
			p_.from.state($.type).decide(($): null => {
				switch ($[0]) {
					case 'read file': return p_.ss($, ($) => {
						vscode.window.showErrorMessage('Cannot generate TypeScript code because no .liana/schema.slna file could be found: ' + $.error.message)
						return null
					})
					case 'parse schema': return p_.ss($, ($) => {
						vscode.window.showErrorMessage('Cannot generate TypeScript code because the .liana/schema.slna file is not a valid schema.')
						return null
					})
					default: return p_.au($[0])
				}
			})
		},
		($) => {
			// Convert to verbose notation using seal
			p_create_refinement_context<string, string>(
				(abort) => ttt_seal(
					editor.document.getText(),
					($) => abort("Cannot generate TypeScript code because the file is not valid Liana."),
					{
						'unmarshall': {
							'module': p_.from.state($).decide(($) => {
								switch ($[0]) {
									case 'constrained': return p_.ss($, ($) => $['module resolver'].entry.signature.module)
									case 'unconstrained': return p_.ss($, ($) => $.module.entry)
									default: return p_.au($[0])
								}
							}),
							'tab size': 1, // vscode works with character, not with columns
						},
						'target': {
							'indentation': '\t',
							'newline': '\n',
						},
					}
				)
			).__extract_data(
				($) => {
					// Create a temporary file with verbose notation
					const tmp_dir = os.tmpdir()
					const tmp_file_name = `liana-verbose-${Date.now()}.liana.lna`
					const tmp_file_path = path.join(tmp_dir, tmp_file_name)

					// Write verbose notation to temp file
					fs.writeFileSync(tmp_file_path, $, 'utf8')

					// Now proceed with TypeScript generation
					void vscode.window.showOpenDialog({
						canSelectFiles: false,
						canSelectFolders: true,
						canSelectMany: false,
						openLabel: 'Select Target Directory',
						title: 'Select directory to generate TypeScript code',
					}).then((target_uris) => {
						if (!target_uris || target_uris.length === 0) {
							// Clean up temp file
							fs.unlinkSync(tmp_file_path)
							return
						}

						p_create_refinement_context<d_path.Node_Path, string>(
							(abort) => r_path_from_text.Node_Path(
								tmp_file_path,
								($) => abort('The file path is not valid.'),
								{
									'pedantic': true,
								}
							)
						).__extract_data(
							($) => {
								c_generate_typescript.$$(
									null,
									{
										'read file': qx_read_file.$$,
									},
									{
										'copy': cx_copy.$$,
										'make directory': cx_make_directory.$$,
										'remove': cx_remove.$$,
										'write file': cx_write_file.$$,
									},
								).execute(
									{
										'type': ['module specification', null],
										'source': $,
										'target': r_path_from_text.Context_Path(target_uris[0].fsPath)
									},
									($) => $
								).__start(
									() => {
										vscode.window.showInformationMessage('TypeScript code generated successfully')
										// Clean up temp file
										try {
											fs.unlinkSync(tmp_file_path)
										} catch (e) {
											// Ignore cleanup errors
										}
									},
									($) => {
										const message: string = t_prose_to_text.Phrase(
											t_generate_typescript_to_prose.Error($),
											{
												'indentation': "  ",
												'newline': "\n",
											}
										)
										vscode.window.showErrorMessage(`Error generating TypeScript: ${message}`)
										// Clean up temp file
										try {
											fs.unlinkSync(tmp_file_path)
										} catch (e) {
											// Ignore cleanup errors
										}
									}
								)
							},
							($) => {
								vscode.window.showErrorMessage(`Error: ${$}`)
								// Clean up temp file
								try {
									fs.unlinkSync(tmp_file_path)
								} catch (e) {
									// Ignore cleanup errors
								}
							}
						)
					})
				},
				($) => {
					vscode.window.showErrorMessage(`Cannot convert to verbose notation: ${$}`)
				}
			)
		}
	)
}) satisfies types.Register_Command