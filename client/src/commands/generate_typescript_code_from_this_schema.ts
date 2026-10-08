import * as fs from 'node:fs'
import * as path from 'node:path'
import * as vscode from 'vscode'
import { prepare_native_schema } from '../../../native/out'
import * as types from '../types'

export default ((_deps?: types.Command_Dependencies) => async () => {
    const editor = vscode.window.activeTextEditor
    if (!editor) {
        void vscode.window.showInformationMessage('Open a native Liana schema first to generate TypeScript code')
        return
    }
    try {
        const schema = prepare_native_schema(editor.document.getText())
        const targets = await vscode.window.showOpenDialog({
            canSelectFiles: false, canSelectFolders: true, canSelectMany: false,
            openLabel: 'Select Target Directory', title: 'Select an empty directory for generated TypeScript',
        })
        if (!targets?.length) return
        const directory = targets[0].fsPath
        if (fs.readdirSync(directory).length !== 0)
            throw new Error('Generation requires an empty output directory')
        for (const [filename, content] of schema.typescript) {
            const destination = path.join(directory, filename)
            fs.mkdirSync(path.dirname(destination), { recursive: true })
            fs.writeFileSync(destination, content)
        }
        void vscode.window.showInformationMessage(
            `Generated ${schema.typescript.size} TypeScript files using native Liana`,
        )
    } catch (error) {
        console.error('Native TypeScript generation failed:', error)
        void vscode.window.showErrorMessage(
            'Cannot generate TypeScript: ' + (error instanceof Error ? error.message : String(error)),
        )
    }
}) satisfies types.Register_Command
