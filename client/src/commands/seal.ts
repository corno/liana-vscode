import * as _p from 'pareto-core/dist/assign'

import { $$ as ttt_seal } from 'liana-authoring/dist/implementation/manual/text_to_text/seal'

import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode'

import { load_applicable_schema } from '../to_be_backend/load_applicable_schema'

export default function $(): vscode.Disposable {
	return vscode.commands.registerCommand('liana.seal', () => {
		const editor = vscode.window.activeTextEditor
		if (!editor) {
			vscode.window.showInformationMessage('Open a liana file first to seal')
			return
		}

		try {
			load_applicable_schema(
				editor.document,
				($) => {
					_p.decide.state($.type, ($) => {
						switch ($[0]) {
							case 'read file': return _p.ss($, ($) => {
								vscode.window.showErrorMessage('Cannot seal because no .liana/schema.slna file could be found in the same directory as the liana file: ' + $.error.message)
							})
							case 'parse schema': return _p.ss($, ($) => {
								vscode.window.showErrorMessage('Cannot seal because the .liana/schema.slna file is not a valid schema.')
							})
							default: return _p.au($[0])
						}
					})
				},
				($) => {
					const new_text = ttt_seal(
						editor.document.getText(),
						(): never => {
							throw new Error('Sealing failed because the file is not valid Liana.')
						},
						{
							'unmarshall': $,
							'target': {
								'indentation': '',
								'newline': '',
							},
						}
					)

					void vscode.window.showSaveDialog({
						filters: {
							'Sealed Liana': ['slna'],
						},
						defaultUri: vscode.Uri.file(
							path.join(
								path.dirname(editor.document.uri.fsPath),
								`${path.basename(editor.document.uri.fsPath, path.extname(editor.document.uri.fsPath))}.slna`,
							)
						),
						saveLabel: 'Save Sealed File',
					}).then((file_infos) => {
						if (!file_infos) {
							return
						}

						fs.writeFileSync(file_infos.fsPath, new_text, 'utf8')
						vscode.window.showInformationMessage('File saved as sealed Liana')
					})
				}
			)
		} catch (error) {
			vscode.window.showErrorMessage('Cannot seal because the file is not valid Liana.')
		}
	})
}