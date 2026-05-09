import * as vscode from 'vscode'

import * as types from "../types"

export default (() => () => {
	const editor = vscode.window.activeTextEditor
	if (!editor) {
		vscode.window.showInformationMessage('Open a Liana file first to sort alphabetically')
		return
	}

	vscode.window.showErrorMessage('IMPLEMENT ME')

}) satisfies types.Register_Command