import * as vscode from 'vscode'
import { schema_signature, authoring_schema_signature } from 'pareto-liana/schemas/liana_next_schema/schema_signature'

export const error_report = (message: string, extension_version: string, vscode_version: string): string => {
    const redacted = message
        .replace(/file:\/\/[^\s"'<>]+/g, '[local path]')
        .replace(/[A-Za-z]:[\\/][^\s"'<>]+/g, '[local path]')
        .replace(/(^|[\s("'=])\/[^\s"'<>]+/g, '$1[local path]')
    return [
        'Liana error report',
        `Extension version: ${extension_version}`,
        `VS Code version: ${vscode_version}`,
        `Liana schema body SHA-256: ${schema_signature}`,
        `Authoring Specification governing SHA-256: ${authoring_schema_signature}`,
        '',
        'Error:',
        redacted,
        '',
        'Review before sharing: error messages may contain identifiers or values.',
        'Document contents are not attached. Local paths are redacted.',
    ].join('\n')
}

export const copy_error_report = async (message: string): Promise<void> => {
    const installed_version: unknown = vscode.extensions.getExtension('corno.liana')?.packageJSON.version
    const version = typeof installed_version === 'string' ? installed_version : 'unknown'
    try {
        await vscode.env.clipboard.writeText(error_report(message, version, vscode.version))
        void vscode.window.showInformationMessage('Error report copied. Review it before sharing; nothing was sent.')
    } catch (error) {
        void vscode.window.showErrorMessage(`Could not copy the error report: ${error instanceof Error ? error.message : String(error)}`)
    }
}

export const show_error_message = (message: string): Promise<void> =>
    Promise.resolve(vscode.window.showErrorMessage(message, 'Copy error report')).then(async choice => {
        if (choice === 'Copy error report') await copy_error_report(message)
    })
