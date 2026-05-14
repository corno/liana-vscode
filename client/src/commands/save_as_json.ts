import create_refinement_context from 'pareto-core/dist/__internals/async/create_refinement_context'


import { $$ as ttt_convert_to_json } from "liana-authoring/dist/implementation/manual/text_to_text/convert_to_json"

import * as fs from 'fs'
import * as vscode from 'vscode'

import * as types from "../types"

export default ((deps) => () => {
		const editor = vscode.window.activeTextEditor
		if (!editor) {
			vscode.window.showInformationMessage('Open a Liana file first to convert to JSON')
			return
		}

		create_refinement_context<string, string>(
			(abort) => ttt_convert_to_json(
				editor.document.getText(),
				($) => abort('Saving as JSON failed because the file is not valid ASTN.'),
				{
					'source': {
						'document resource identifier': editor.document.uri.toString(),
						'tab size': 4,
					},
					'target': {
						'indentation': '\t',
						'newline': '\n',
					},
				}
			)
		).__extract_data(
			($) => {
				void vscode.window.showSaveDialog({}).then((file_infos) => {
					if (!file_infos) {
						return
					}

					fs.writeFileSync(file_infos.fsPath, $, 'utf8')
					vscode.window.showInformationMessage('file saved as json')
				})
			},
			($) => {
				vscode.window.showErrorMessage('Cannot save as JSON because the file is not valid ASTN.')
			}
		)
}) satisfies types.Register_Command