import * as vscode from 'vscode'

import * as types from "../types"

export default ((deps) => () => {
	vscode.window.showErrorMessage('Cannot convert to JSON because the file has errors. Fix the errors first.')
}) satisfies types.Register_Command