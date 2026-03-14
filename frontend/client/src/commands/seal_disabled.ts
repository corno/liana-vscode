import * as vscode from 'vscode'

export function registerSealDisabledCommand(): vscode.Disposable {
	return vscode.commands.registerCommand('liana.seal_disabled', () => {
		vscode.window.showErrorMessage('Cannot seal because the file has errors. Fix the errors first.');
	})
}