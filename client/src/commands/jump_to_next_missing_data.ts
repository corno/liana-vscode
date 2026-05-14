import * as vscode from 'vscode'

import * as types from "../types"

export default ((deps) => () => {
		const editor = vscode.window.activeTextEditor
		if (!editor) {
			vscode.window.showInformationMessage('No active editor')
			return
		}

		const document = editor.document
		const current_position = editor.selection.active
		const text = document.getText()

		const current_offset = document.offsetAt(current_position)
		const next_hash_index = text.indexOf('#', current_offset + 1)
		const target_index = next_hash_index === -1 ? text.indexOf('#') : next_hash_index

		if (target_index === -1) {
			vscode.window.showInformationMessage('No # character found in the document')
			return
		}

		const position = document.positionAt(target_index)
		editor.selection = new vscode.Selection(position, position)
		editor.revealRange(new vscode.Range(position, position))
		void vscode.commands.executeCommand('editor.action.triggerSuggest')
}) satisfies types.Register_Command