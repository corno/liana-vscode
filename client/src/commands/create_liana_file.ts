import * as path from 'path'
import * as vscode from 'vscode'

export default function $(): vscode.Disposable {
	return vscode.commands.registerCommand('liana.create_liana_file', async (uri: vscode.Uri) => {
		try {
			let target_folder: vscode.Uri
			if (uri && uri.fsPath) {
				const stat = await vscode.workspace.fs.stat(uri)
				if (stat.type === vscode.FileType.Directory) {
					target_folder = uri
				} else {
					target_folder = vscode.Uri.file(path.dirname(uri.fsPath))
				}
			} else if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
				target_folder = vscode.workspace.workspaceFolders[0].uri
			} else {
				vscode.window.showErrorMessage('No workspace folder found')
				return
			}

			const schema_path = vscode.Uri.file(path.join(target_folder.fsPath, ".liana", "schema.slna"))
			try {
				await vscode.workspace.fs.stat(schema_path)
			} catch {
				vscode.window.showErrorMessage('This folder does not contain a .liana/schema.slna file. Please select a folder with a .liana/schema.slna file.')
				return
			}

			const file_name = await vscode.window.showInputBox({
				prompt: 'Enter the name for your new Liana file',
				placeHolder: 'filename.lna',
				validateInput: (value: string) => {
					if (!value || value.trim() === '') {
						return 'Filename cannot be empty'
					}
					return null
				}
			})

			if (!file_name) {
				return
			}

			let final_file_name = file_name
			if (!file_name.endsWith('.liana') && !file_name.endsWith('.lna')) {
				final_file_name = `${file_name}.lna`
			}
			const file_uri = vscode.Uri.file(path.join(target_folder.fsPath, final_file_name))

			const encoder = new TextEncoder()
			await vscode.workspace.fs.writeFile(file_uri, encoder.encode("#"))

			const document = await vscode.workspace.openTextDocument(file_uri)
			await vscode.window.showTextDocument(document)
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error)
			vscode.window.showErrorMessage(`Failed to create Liana file: ${message}`)
		}
	})
}