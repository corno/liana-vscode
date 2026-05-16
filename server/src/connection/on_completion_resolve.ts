import * as vscode_node from 'vscode-languageserver/node'

export const create_on_completion_resolve: () => (item: vscode_node.CompletionItem) => vscode_node.CompletionItem = () => {
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
