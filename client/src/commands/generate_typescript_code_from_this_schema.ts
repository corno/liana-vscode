
import * as vscode from 'vscode'
import * as c_generate_typescript from "pareto-liana/dist/implementation/manual/commands/generate_typescript"
import * as cx_copy from "pareto-host-nodejs/dist/commands/copy"
import * as cx_make_directory from "pareto-host-nodejs/dist/commands/make_directory"
import * as cx_remove from "pareto-host-nodejs/dist/commands/remove"
import * as cx_write_file from "pareto-host-nodejs/dist/commands/write_file"
import * as qx_read_file from "pareto-host-nodejs/dist/queries/read_file"
import * as c_write_to_directory from "pareto-fountain-pen-file-structure/dist/implementation/manual/commands/write_to_directory"
import * as c_write_to_file from "pareto-fountain-pen-file-structure/dist/implementation/manual/commands/write_to_file"
import * as r_path_from_text from "pareto-resources/dist/implementation/manual/refiners/path/text"
import * as t_generate_typescript_to_fp from "pareto-liana/dist/implementation/manual/transformers/generate_typescript/fountain_pen"
import * as t_prose_to_text from "pareto-fountain-pen/dist/implementation/manual/transformers/prose/text"
import * as pareto_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'
import * as _p from 'pareto-core/dist/assign'
import { $$ as ttt_seal } from 'liana-authoring/dist/implementation/manual/text_to_text/seal'
import create_refinement_context from 'pareto-core/dist/__internals/async/create_refinement_context'
import { load_applicable_schema } from '../to_be_backend/load_applicable_schema'
import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'

export default function $(): vscode.Disposable {
	return vscode.commands.registerCommand('liana.generate_typescript_code_from_this_schema', async () => {
		const editor = vscode.window.activeTextEditor
		if (!editor) {
			vscode.window.showInformationMessage('Open a liana file first to generate TypeScript code')
			return
		}
		
		// First, load the schema and convert to verbose notation
		load_applicable_schema(
			editor.document,
			($) => {
				_p.decide.state($.type, ($) => {
					switch ($[0]) {
						case 'read file': return _p.ss($, ($) => {
							vscode.window.showErrorMessage('Cannot generate TypeScript code because no .liana/schema.slna file could be found: ' + $.error.message)
						})
						case 'parse schema': return _p.ss($, ($) => {
							vscode.window.showErrorMessage('Cannot generate TypeScript code because the .liana/schema.slna file is not a valid schema.')
						})
						default: return _p.au($[0])
					}
				})
			},
			async ($) => {
				// Convert to verbose notation using seal
				create_refinement_context<string, string>(
					(abort) => ttt_seal(
						editor.document.getText(),
						($) => abort("Cannot generate TypeScript code because the file is not valid Liana."),
						{
							'unmarshall': $,
							'target': {
								'indentation': '\t',
								'newline': '\n',
							},
						}
					)
				).__extract_data(
					async (verbose_text) => {
						// Create a temporary file with verbose notation
						const tmp_dir = os.tmpdir()
						const tmp_file_name = `liana-verbose-${Date.now()}.liana.lna`
						const tmp_file_path = path.join(tmp_dir, tmp_file_name)
						
						try {
							// Write verbose notation to temp file
							fs.writeFileSync(tmp_file_path, verbose_text, 'utf8')
							
							// Now proceed with TypeScript generation
							const target_uris = await vscode.window.showOpenDialog({
								canSelectFiles: false,
								canSelectFolders: true,
								canSelectMany: false,
								openLabel: 'Select Target Directory',
								title: 'Select directory to generate TypeScript code',
							})

							if (!target_uris || target_uris.length === 0) {
								// Clean up temp file
								fs.unlinkSync(tmp_file_path)
								return
							}

							c_generate_typescript.$$(
								{
									'copy': cx_copy.$$,
									'make directory': cx_make_directory.$$,
									'remove': cx_remove.$$,
									'write file': cx_write_file.$$,
								},
								{
									'read file': qx_read_file.$$,
								}
							).execute(
								{
									'type': ['module specification', null],
									'source': r_path_from_text.Node_Path(
										tmp_file_path,
										() => {
											vscode.window.showInformationMessage('unexpected error: the file path is not valid.')
											throw new Error('The file path is not valid.')
										},
										{
											'pedantic': true,
										}
									),
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
										t_generate_typescript_to_fp.Error($),
										{
											'indentation': "  ",
											'newline': "\n",
										}
									)
									vscode.window.showErrorMessage(`Error generating TypeScript: ${message}`)
									// Clean up temp file
									try {
										fs.unlinkSync(tmpFilePath)
									} catch (e) {
										// Ignore cleanup errors
									}
								}
							)
						} catch (error) {
							// Clean up temp file on error
							try {
								if (fs.existsSync(tmpFilePath)) {
									fs.unlinkSync(tmpFilePath)
								}
							} catch (e) {
								// Ignore cleanup errors
							}
							
							if (error instanceof Error) {
								console.error('Error generating TypeScript code:', error.message)
								vscode.window.showErrorMessage(`Error: ${error.message}`)
							} else if (error instanceof pareto_unreachable_code_path.Unreachable_Code_Path_Error) {
								console.error('Unreachable code path reached:', error.message)
								vscode.window.showErrorMessage(`Error: ${error.message}`)
							} else {
								console.error('Unexpected error:', error)
								vscode.window.showErrorMessage('An unexpected error occurred')
							}
						}
					},
					async ($) => {
						vscode.window.showErrorMessage(`Cannot convert to verbose notation: ${$}`)
					}
				)
			}
		)
	})
}