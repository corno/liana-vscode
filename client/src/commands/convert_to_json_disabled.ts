import * as vscode from 'vscode'

export default function $(): vscode.Disposable {
	return vscode.commands.registerCommand('liana.convert_to_json_disabled', () => {
		vscode.window.showErrorMessage('Cannot convert to JSON because the file has errors. Fix the errors first.');
	})
}