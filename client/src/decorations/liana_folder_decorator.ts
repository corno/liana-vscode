import * as vscode from 'vscode'
import * as path from 'path'

/**
 * File decoration provider that makes .liana folders appear grayed out
 * and marked as sealed/readonly content
 */
export class Liana_Folder_Decorator implements vscode.FileDecorationProvider {
	private _on_did_change_file_decorations = new vscode.EventEmitter<vscode.Uri | vscode.Uri[] | undefined>()
	readonly onDidChangeFileDecorations = this._on_did_change_file_decorations.event

	provideFileDecoration(uri: vscode.Uri): vscode.FileDecoration | undefined {
		// Check if this is a .liana directory or a file within it
		const path_parts = uri.fsPath.split(path.sep)
		const has_liana_dir = path_parts.includes('.liana')

		if (has_liana_dir) {
			// Gray out the folder/file and add a badge
			// Don't propagate to avoid decorating parent directories
			return {
				badge: 'S', // S for "Sealed"
				tooltip: 'Sealed Liana file - Do not edit manually',
				color: new vscode.ThemeColor('descriptionForeground') // Grayed out
			}
		}

		return undefined
	}

	refresh(): void {
		this._on_did_change_file_decorations.fire(undefined)
	}
}
