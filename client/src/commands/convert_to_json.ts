import create_refinement_context from 'pareto-core/dist/__internals/async/create_refinement_context'

import { $$ as ttt_convert_to_json } from "liana-authoring/dist/implementation/manual/text_to_text/convert_to_json"

import * as vscode from 'vscode'

import * as types from "../types"

export default ((deps) => () => {
	const editor = vscode.window.activeTextEditor
	if (!editor) {
		vscode.window.showInformationMessage('Open a Liana file first to save as JSON')
		return
	}

	create_refinement_context<string, string>(
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
					'newline': '\n',
				},
			}
		)
	).__extract_data(
		($) => {
			void editor.edit((editBuilder) => {
				editBuilder.replace(
					new vscode.Range(
						new vscode.Position(0, 0),
						editor.document.lineAt(editor.document.lineCount - 1).range.end,
					),
					$,
				)
			})
		},
		($) => {
			vscode.window.showErrorMessage('Cannot convert to JSON because the file is not valid ASTN.')
		}
	)

}) satisfies types.Register_Command