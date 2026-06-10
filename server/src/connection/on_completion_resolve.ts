import * as vscode_node from 'vscode-languageserver/node'
import { Connection_Context } from '../connection_context'

export const create_on_completion_resolve: (connection_context: Connection_Context) => (item: vscode_node.CompletionItem) => vscode_node.CompletionItem = (connection_context) => {
	return (item: vscode_node.CompletionItem): vscode_node.CompletionItem => {
		if (item.data && item.data.documentation) {
			item.documentation = {
				kind: vscode_node.MarkupKind.PlainText,
				value: item.data.documentation
			}
		}
		return item
	}
}
