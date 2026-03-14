import * as vscode from 'vscode'

import { findChildFoldingRanges, findContainingFoldingRange } from '../command_support/folding'

export function registerCollapseAllEntriesCommand(): vscode.Disposable {
	return vscode.commands.registerCommand('liana.collapse_all_entries', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('No active editor');
			return;
		}

		const document = editor.document;
		const cursorPosition = editor.selection.active;

		try {
			const foldingRanges = await vscode.commands.executeCommand<vscode.FoldingRange[]>(
				'vscode.executeFoldingRangeProvider',
				document.uri,
			);

			if (!foldingRanges || foldingRanges.length === 0) {
				vscode.window.showInformationMessage('No foldable regions found');
				return;
			}

			const containingRange = findContainingFoldingRange(foldingRanges, cursorPosition);
			if (!containingRange) {
				vscode.window.showInformationMessage('No foldable structure found at cursor position');
				return;
			}

			const childRanges = findChildFoldingRanges(foldingRanges, containingRange);
			if (childRanges.length === 0) {
				vscode.window.showInformationMessage('No entries found to collapse');
				return;
			}

			for (const range of childRanges) {
				const startPosition = new vscode.Position(range.start, 0);
				editor.selection = new vscode.Selection(startPosition, startPosition);
				await vscode.commands.executeCommand('editor.fold');
			}

			vscode.window.showInformationMessage(`Collapsed ${childRanges.length} entries`);
		} catch (error) {
			console.error('Error collapsing entries:', error);
			vscode.window.showErrorMessage('Failed to collapse entries');
		}
	})
}