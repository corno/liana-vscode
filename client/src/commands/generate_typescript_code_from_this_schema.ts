
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

import { readSchema } from '../command_support/schema'

export default function $(): vscode.Disposable {
	return vscode.commands.registerCommand('liana.generate_typescript_code_from_this_schema', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('Open a liana file first to create authoring environment');
			return;
		}
		const targetUris = await vscode.window.showOpenDialog({
			canSelectFiles: false,
			canSelectFolders: true,
			canSelectMany: false,
			openLabel: 'Select Target Directory',
			title: 'Select directory to initialize Liana authoring environment',
		});

		if (!targetUris || targetUris.length === 0) {
			return;
		}


		try {

			c_generate_typescript.$$(
				{
					'copy': cx_copy.$$,
					'make directory': cx_make_directory.$$,
					'remove': cx_remove.$$,
					'write to directory': c_write_to_directory.$$(
						{
							'remove': cx_remove.$$,
							'write to_file': c_write_to_file.$$(
								{
									'make directory': cx_make_directory.$$,
									'write file': cx_write_file.$$
								},
								null,
							)
						},
						null,
					)
				},
				{
					'read file': qx_read_file.$$,
				}
			).execute(
				{
					'type': ['module specification', null],
					'source': r_path_from_text.Node_Path(
						editor.document.uri.fsPath,
						() => {
							vscode.window.showInformationMessage('unexpected error: the file path is not valid.');

							throw new Error('The file path is not valid.');
						},
						{
							'pedantic': true,
						}
					),
					'target': r_path_from_text.Context_Path(targetUris[0].fsPath)
				},
				($) => $
			).__start(
				() => {
					vscode.window.showInformationMessage('code generated');
				},
				($) => {
					const message: string = t_prose_to_text.Phrase(
						t_generate_typescript_to_fp.Error($, { 'character location reporting': ['one based', null] }),
						{
							'indentation': "  ",
							'newline': "\n",
						}
					)
					vscode.window.showInformationMessage(`error encountered: ${message}`);
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
		}


	})
}