import * as vscode from 'vscode'

import * as types from "../types"

export default ((deps) => () => {
	vscode.window.showErrorMessage('Cannot seal because the file has errors. Fix the errors first.')
}) satisfies types.Register_Command