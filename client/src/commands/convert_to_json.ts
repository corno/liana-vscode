import create_refinement_context from 'pareto-core/implementation/__internal/sync/create_refinement_context'
import p_schema from 'pareto-core/interface/schema'

import { $$ as ttt_convert_to_json } from "../helpers/convert_to_json"

import * as vscode from 'vscode'

import * as types from "../types"

export default ((deps) => () => {
	const editor = vscode.window.activeTextEditor
	if (!editor) {
		vscode.window.showInformationMessage('Open a Liana file first to save as JSON')
		return
	}

	create_refinement_context<p_schema.List<string>, string>(
		(abort) => ttt_convert_to_json(
			editor.document.getText(),
			($) => abort('Safe as JSON failed because the file is not valid ASTN.'),
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
			editor.edit((editBuilder) => {
				editBuilder.replace(
					new vscode.Range(
						new vscode.Position(0, 0),
						editor.document.lineAt(editor.document.lineCount - 1).range.end,
					),
					$.__get_raw().join("\n") + "\n",
				)
			})
		},
		($) => {
			vscode.window.showErrorMessage('Cannot convert to JSON because the file is not valid ASTN.')
		}
	)

}) satisfies types.Register_Command