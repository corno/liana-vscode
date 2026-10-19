import * as vscode_node from 'vscode-languageserver/node'
import * as vscode_textdocument from 'vscode-languageserver-textdocument'
import { Connection_Context } from '../connection_context'
import { missing_entry_actions } from '../helpers/missing_entry_actions'

export const create_on_code_action: (
	connection_context: Connection_Context,
) => vscode_node.ServerRequestHandler<vscode_node.CodeActionParams, (vscode_node.Command | vscode_node.CodeAction)[] | null | undefined, (vscode_node.Command | vscode_node.CodeAction)[], void> = (connection_context) => {
	return async (params: vscode_node.CodeActionParams) => [
		...await missing_entry_actions(connection_context, params), ...(
		[
			['Convert to verbose notation (shallow)', 'verbose', true],
			['Convert to verbose notation (deep)', 'verbose', false],
			['Convert to concise notation (shallow)', 'concise', true],
			['Convert to concise notation (deep)', 'concise', false],
		] as const
	).map(([action_title, style, shallow]) => ({
		title: action_title,
		kind: vscode_node.CodeActionKind.Refactor,
		data: {
			uri: params.textDocument.uri,
			position: params.range.start,
			style: style,
			shallow: shallow
		}
	})).filter(() => !params.context.only || params.context.only.some((kind) =>
		vscode_node.CodeActionKind.Refactor === kind || vscode_node.CodeActionKind.Refactor.startsWith(kind + '.')))]
}

