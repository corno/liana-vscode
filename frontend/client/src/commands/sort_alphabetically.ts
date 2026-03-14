import * as vscode from 'vscode'

export default function $(): vscode.Disposable {
	return vscode.commands.registerCommand('liana.sort_alphabetically', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('Open a Liana file first to sort alphabetically');
			return;
		}

		vscode.window.showErrorMessage('IMPLEMENT ME');
	})
}