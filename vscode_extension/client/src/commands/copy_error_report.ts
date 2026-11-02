import * as vscode from 'vscode'
import { copy_error_report } from '../helpers/error_report'
import type * as types from '../types'

export default ((_deps) => async () => {
    const document = vscode.window.activeTextEditor?.document
    const errors = document === undefined ? [] : vscode.languages.getDiagnostics(document.uri)
        .filter(diagnostic => diagnostic.severity === vscode.DiagnosticSeverity.Error)
    if (errors.length === 0) {
        void vscode.window.showInformationMessage('There are no error diagnostics in the active document to copy.')
        return
    }
    await copy_error_report(errors.map(error =>
        `${error.source ?? 'diagnostic'} (${error.range.start.line + 1}:${error.range.start.character + 1}): ${error.message}`,
    ).join('\n\n'))
}) satisfies types.Register_Command
