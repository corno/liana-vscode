import * as vscode_node from 'vscode-languageserver/node'

export const create_on_update_notation_style: (
	connection: vscode_node.Connection,
	document_notation_styles: Map<string, 'verbose' | 'concise'>,
) => vscode_node.RequestHandler<{ uri: string, style: 'verbose' | 'concise' }, void, void> = (connection, document_notation_styles) => {
	return (params: { uri: string, style: 'verbose' | 'concise' }) => {
		document_notation_styles.set(params.uri, params.style)
		connection.console.log(`Notation style updated for ${params.uri}: ${params.style}`)
	}
}
