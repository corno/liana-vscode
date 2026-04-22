import { $$ as ttt_convert_to_json } from 'liana-authoring/dist/implementation/manual/text_to_text/convert_to_json'

import * as fs from 'fs'
import * as vscode from 'vscode'
import * as pareto_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'

export default function $(): vscode.Disposable {
	return vscode.commands.registerCommand('liana.save_as_json', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('Open a Liana file first to convert to JSON');
			return;
		}

		try {
			const newText = ttt_convert_to_json(
				editor.document.getText(),
				(): never => {
					throw new Error('Saving as JSON failed because the file is not valid ASTN.');
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

			void vscode.window.showSaveDialog({}).then((fileInfos) => {
				if (!fileInfos) {
					return;
				}

				fs.writeFileSync(fileInfos.fsPath, newText, 'utf8');
				vscode.window.showInformationMessage('file saved as json');
			})
		} catch (error) {
					if (error instanceof Error) {
						console.error('Error generating TypeScript code:', error.message);
					} else if (error instanceof pareto_unreachable_code_path.Unreachable_Code_Path_Error) {
						console.error('Unreachable code path reached:', error.message);
					} else {
						console.error('Unexpected error:', error);
					}
			vscode.window.showErrorMessage('Cannot save as JSON because the file is not valid ASTN.');
		}
	})
}