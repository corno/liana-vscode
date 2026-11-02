import * as vscode from 'vscode'
import { schema_command_document } from '../helpers/schema_commands'
import type * as types from '../types'

export default ((_deps) => async (uri?: vscode.Uri) => {
    if (await schema_command_document('publish schema', uri) === undefined) return
    vscode.window.showInformationMessage(
        'Schema publication is not implemented. Publication will be implemented when the repository is hosted. Nothing has been published.',
    )
}) satisfies types.Register_Command
