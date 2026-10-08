import * as fs from 'node:fs'
import * as path from 'node:path'
import * as vscode from 'vscode'
import { prepare_native_schema } from '../../../native/out'
import * as types from '../types'

export default (deps => async () => {
    const editor = vscode.window.activeTextEditor
    if (!editor) {
        void vscode.window.showInformationMessage('Open a native Liana schema first to create an authoring environment')
        return
    }
    try {
        const text = editor.document.getText()
        const schema = prepare_native_schema(text)
        const schema_uri = editor.document.uri.toString()
        const directories = deps!.context.workspaceState.get<Record<string, string>>('liana.authoring_environment_directories', {})
        const previous = directories[schema_uri]
        const targets = await vscode.window.showOpenDialog({
            canSelectFiles: false, canSelectFolders: true, canSelectMany: false,
            openLabel: 'Select Directory', title: 'Select directory for the native authoring environment',
            defaultUri: previous ? vscode.Uri.file(previous) : undefined,
        })
        if (!targets?.length) return
        const directory = targets[0].fsPath
        const schema_directory = path.join(directory, '.liana')
        fs.mkdirSync(schema_directory, { recursive: true })
        for (const [filename, content] of [['schema.slna', schema.syntax], ['schema.native.slna', text]]) {
            const destination = path.join(schema_directory, filename)
            if (fs.existsSync(destination)) fs.chmodSync(destination, 0o644)
            fs.writeFileSync(destination, content)
            fs.chmodSync(destination, 0o444)
        }
        await deps!.context.workspaceState.update('liana.authoring_environment_directories', {
            ...directories, [schema_uri]: directory,
        })
        const open = await vscode.window.showInformationMessage(
            `Native authoring environment created: ${directory}. Open it?`, 'Yes', 'No',
        )
        if (open === 'Yes') await vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.file(directory), true)
    } catch (error) {
        console.error('Native authoring environment initialization failed:', error)
        void vscode.window.showErrorMessage(
            'Cannot initialize authoring environment: ' + (error instanceof Error ? error.message : String(error)),
        )
    }
}) satisfies types.Register_Command
