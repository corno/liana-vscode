import * as vscode from 'vscode'

export default function $(): vscode.Disposable {
	return vscode.commands.registerCommand('liana.seal_disabled', () => {
		vscode.window.showErrorMessage('Cannot seal because the file has errors. Fix the errors first.');
	})
}