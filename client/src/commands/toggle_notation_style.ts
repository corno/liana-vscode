import * as vscode from 'vscode'
import { get_client, get_notation_style } from '../extension'

import * as types from "../types"

export default ((deps) => async () => {
	const editor = vscode.window.activeTextEditor
	if (!editor || editor.document.languageId !== 'liana') {
		vscode.window.showInformationMessage('No active Liana document')
		return
	}

	const document_uri = editor.document.uri.toString()
	const current_style = get_notation_style(deps!.context, document_uri)
	const new_style: 'verbose' | 'concise' = current_style === 'verbose' ? 'concise' : 'verbose'




	function set_notation_style(context: vscode.ExtensionContext, style: 'verbose' | 'concise', document_uri?: string): void {
		if (document_uri) {
			// Set document-specific preference
			const doc_styles = context.workspaceState.get<Record<string, 'verbose' | 'concise'>>('liana.document_notation_styles', {})
			doc_styles[document_uri] = style
			context.workspaceState.update('liana.document_notation_styles', doc_styles)
		} else {
			// Set workspace default
			context.workspaceState.update('liana.default_notation_style', style)
		}
	}
	set_notation_style(deps!.context, new_style, document_uri)

	// Update status bar
	deps!.update_status_bar(editor)

	// Notify the language server
	const client = get_client()
	if (client) {
		await client.sendRequest('liana/updateNotationStyle', {
			uri: document_uri,
			style: new_style
		}).catch(() => { })
	}

	vscode.window.showInformationMessage(`Liana notation style for this document: ${new_style}`)
}) satisfies types.Register_Command
