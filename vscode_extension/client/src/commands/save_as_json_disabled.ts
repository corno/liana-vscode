import { show_error_message } from '../helpers/error_report'
import * as vscode from 'vscode'

import * as types from "../types"

export default ((deps) => () => {
	show_error_message('Cannot save as JSON because the file has errors. Fix the errors first.')
}) satisfies types.Register_Command