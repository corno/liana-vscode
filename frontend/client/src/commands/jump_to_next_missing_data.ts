import * as vscode from 'vscode'

export function registerJumpToNextMissingDataCommand(): vscode.Disposable {
	return vscode.commands.registerCommand('liana.jump_to_next_missing_data', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('No active editor');
			return;
		}

		const document = editor.document;
		const currentPosition = editor.selection.active;
		const text = document.getText();

		const currentOffset = document.offsetAt(currentPosition);
		const nextHashIndex = text.indexOf('#', currentOffset + 1);
		const targetIndex = nextHashIndex === -1 ? text.indexOf('#') : nextHashIndex;

		if (targetIndex === -1) {
			vscode.window.showInformationMessage('No # character found in the document');
			return;
		}

		const position = document.positionAt(targetIndex);
		editor.selection = new vscode.Selection(position, position);
		editor.revealRange(new vscode.Range(position, position));
		void vscode.commands.executeCommand('editor.action.triggerSuggest');
	});
}