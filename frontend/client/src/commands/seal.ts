import { $$ as ttt_seal } from 'liana-authoring/dist/implementation/manual/text_to_text/seal'

import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode'

import { readSchema } from '../command_support/schema'

export default function $(): vscode.Disposable {
	return vscode.commands.registerCommand('liana.seal', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('Open a liana file first to seal');
			return;
		}

		try {
			readSchema(
				editor.document.uri.toString(),
				() => {
					vscode.window.showErrorMessage('Cannot seal because no liana-schema file could be found in the same directory as the liana file.');
				},
				($) => {
					const newText = ttt_seal(
						editor.document.getText(),
						(): never => {
							throw new Error('Sealing failed because the file is not valid Liana.');
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
					}).then((fileInfos) => {
						if (!fileInfos) {
							return;
						}

						fs.writeFileSync(fileInfos.fsPath, newText, 'utf8');
						vscode.window.showInformationMessage('File saved as sealed Liana');
					})
				}
			)
		} catch (error) {
			vscode.window.showErrorMessage('Cannot seal because the file is not valid Liana.');
		}
	})
}