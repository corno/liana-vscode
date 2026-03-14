import { $$ as ttt_convert_to_json } from 'liana-authoring/dist/implementation/manual/text_to_text/convert_to_json'

import * as vscode from 'vscode'

export function registerConvertToJsonCommand(): vscode.Disposable {
	return vscode.commands.registerCommand('liana.convert_to_json', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('Open a Liana file first to save as JSON');
			return;
		}

		try {
			const newText = ttt_convert_to_json(
				editor.document.getText(),
				(): never => {
					throw new Error('Conversion to JSON failed because the file is not valid ASTN.');
				},
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

			void editor.edit((editBuilder) => {
				editBuilder.replace(
					new vscode.Range(
						new vscode.Position(0, 0),
						editor.document.lineAt(editor.document.lineCount - 1).range.end,
					),
					newText,
				)
			})
		} catch (error) {
			vscode.window.showErrorMessage('Cannot convert to JSON because the file is not valid ASTN.');
		}
	})
}