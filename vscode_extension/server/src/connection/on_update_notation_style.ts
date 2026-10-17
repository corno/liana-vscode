import * as vscode_node from 'vscode-languageserver/node'
import { Connection_Context } from '../connection_context'

export const create_on_update_notation_style: (
	connection_context: Connection_Context,
) => vscode_node.RequestHandler<{ uri: string, style: 'verbose' | 'concise' }, void, void> = (connection_context) => {
	return (params: { uri: string, style: 'verbose' | 'concise' }) => {
		connection_context['document notation styles'].set(params.uri, params.style)
		connection_context.connection.console.log(`Notation style updated for ${params.uri}: ${params.style}`)
	}
}
