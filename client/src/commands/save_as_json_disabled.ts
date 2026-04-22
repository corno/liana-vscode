import * as vscode from 'vscode'

export default function $(): vscode.Disposable {
	return vscode.commands.registerCommand('liana.save_as_json_disabled', () => {
		vscode.window.showErrorMessage('Cannot save as JSON because the file has errors. Fix the errors first.');
	})
}