import * as p_schema from 'pareto-core/interface/schema'
import p_create_refinement_context from "pareto-core/implementation/__internal/sync/create_refinement_context"


import { $$ as ttt_convert_to_json } from "../helpers/convert_to_json"

import * as fs from 'fs'
import * as vscode from 'vscode'

import * as types from "../types"

export default ((deps) => () => {
	const editor = vscode.window.activeTextEditor
	if (!editor) {
		vscode.window.showInformationMessage('Open a Liana file first to convert to JSON')
		return
	}

	p_create_refinement_context<p_schema.List<string>, string>(
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
				},
			}
		)
	).__extract_data(
		($) => {
			vscode.window.showSaveDialog({}).then((file_infos) => {
				if (!file_infos) {
					return
				}

				fs.writeFileSync(
					file_infos.fsPath,
					$.__get_raw().join("\n") + "\n",
					'utf8'
				)
				vscode.window.showInformationMessage('file saved as json')
			})
		},
		($) => {
			vscode.window.showErrorMessage('Cannot save as JSON because the file is not valid ASTN.')
		}
	)
}) satisfies types.Register_Command