import * as vscode from 'vscode'
import { get_client, get_notation_style, set_notation_style } from '../extension'

export default function $(
	context: vscode.ExtensionContext,
	status_bar_item: vscode.StatusBarItem,
	update_status_bar: (editor?: vscode.TextEditor) => void
): vscode.Disposable {
	return vscode.commands.registerCommand('liana.toggle_notation_style', async () => {
		const editor = vscode.window.activeTextEditor
		if (!editor || editor.document.languageId !== 'liana') {
			vscode.window.showInformationMessage('No active Liana document')
			return
		}

		const document_uri = editor.document.uri.toString()
		const current_style = get_notation_style(context, document_uri)
		const new_style: 'verbose' | 'concise' = current_style === 'verbose' ? 'concise' : 'verbose'
		
		set_notation_style(context, new_style, document_uri)
		
		// Update status bar
		update_status_bar(editor)
		
		// Notify the language server
		const client = get_client()
		if (client) {
			await client.sendRequest('liana/updateNotationStyle', { 
				uri: document_uri, 
				style: new_style 
			}).catch(() => {})
		}
		
		vscode.window.showInformationMessage(`Liana notation style for this document: ${new_style}`)
	})
}
