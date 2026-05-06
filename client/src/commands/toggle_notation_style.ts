import * as vscode from 'vscode'
import { getClient, getNotationStyle, setNotationStyle } from '../extension'

export default function $(
	context: vscode.ExtensionContext,
	statusBarItem: vscode.StatusBarItem,
	updateStatusBar: (editor?: vscode.TextEditor) => void
): vscode.Disposable {
	return vscode.commands.registerCommand('liana.toggle_notation_style', async () => {
		const editor = vscode.window.activeTextEditor
		if (!editor || editor.document.languageId !== 'liana') {
			vscode.window.showInformationMessage('No active Liana document')
			return
		}

		const documentUri = editor.document.uri.toString()
		const currentStyle = getNotationStyle(context, documentUri)
		const newStyle: 'verbose' | 'concise' = currentStyle === 'verbose' ? 'concise' : 'verbose'
		
		setNotationStyle(context, newStyle, documentUri)
		
		// Update status bar
		updateStatusBar(editor)
		
		// Notify the language server
		const client = getClient()
		if (client) {
			await client.sendRequest('liana/updateNotationStyle', { 
				uri: documentUri, 
				style: newStyle 
			}).catch(() => {})
		}
		
		vscode.window.showInformationMessage(`Liana notation style for this document: ${newStyle}`)
	})
}
