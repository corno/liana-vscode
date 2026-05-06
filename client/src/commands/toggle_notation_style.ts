import * as vscode from 'vscode'
import { getClient } from '../extension'

export default function $(
	context: vscode.ExtensionContext,
	statusBarItem: vscode.StatusBarItem
): vscode.Disposable {
	return vscode.commands.registerCommand('liana.toggle_notation_style', async () => {
		const currentStyle = context.workspaceState.get<'verbose' | 'concise'>('liana.notationStyle', 'verbose')
		const newStyle: 'verbose' | 'concise' = currentStyle === 'verbose' ? 'concise' : 'verbose'
		
		await context.workspaceState.update('liana.notationStyle', newStyle)
		
		// Update status bar
		statusBarItem.text = `$(symbol-property) ${newStyle === 'verbose' ? 'Verbose' : 'Concise'}`
		statusBarItem.tooltip = `Liana notation style: ${newStyle} (Click to toggle)`
		
		// Notify the language server
		const client = getClient()
		if (client) {
			await client.sendRequest('liana/updateNotationStyle', newStyle)
		}
		
		vscode.window.showInformationMessage(`Liana notation style: ${newStyle}`)
	})
}
