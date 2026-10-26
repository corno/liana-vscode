import * as vscode from 'vscode'
import { get_client } from '../extension'

import * as types from "../types"

type Text_Edit = { range: { start: { line: number, character: number }, end: { line: number, character: number } }, newText: string }

type Sort_Order = 'alphabetical' | 'topological' | 'topological only'

type Sort_Scope = 'shallow' | 'deep'

type Sort_Dictionary_Response =
	| {
		readonly 'status': 'found'
		readonly 'dependencies': 'none' | 'present' | 'unknown'
		readonly 'dictionaries': number
		readonly 'with dependencies': number
		readonly 'orders': { readonly [order in Sort_Order]?: Text_Edit[] | null }
	}
	| { readonly 'status': 'no dictionary' | 'parse error' | 'document not found' }

/** The arguments of the 'Sort dictionary' code actions; the editor context menu passes the document's uri instead. */
type Sort_Arguments = { readonly 'uri': string, readonly 'position': { line: number, character: number }, readonly 'scope': Sort_Scope }

const is_sort_arguments = ($: unknown): $ is Sort_Arguments =>
	typeof $ === 'object' && $ !== null && typeof ($ as Sort_Arguments).uri === 'string' && typeof ($ as Sort_Arguments).scope === 'string'

const order_choices: (vscode.QuickPickItem & { 'order': Sort_Order })[] = [
	{ 'order': 'alphabetical', label: 'Alphabetical', detail: 'Sort all entries by id' },
	{ 'order': 'topological', label: 'Topological, then alphabetical', detail: 'Entries come after the entries they depend on; otherwise sorted by id' },
	{ 'order': 'topological only', label: 'Topological only', detail: 'Entries come after the entries they depend on; otherwise the current order is kept' },
]

export default ((_deps) => async (argument?: unknown) => {
	const client = get_client()
	if (!client) {
		vscode.window.showErrorMessage('The Liana language server is not running')
		return
	}
	let document: vscode.TextDocument
	let position: vscode.Position
	let scope: Sort_Scope = 'shallow'
	if (is_sort_arguments(argument)) {
		const found = vscode.workspace.textDocuments.find(($) => $.uri.toString() === argument.uri)
		if (found === undefined) return vscode.window.showErrorMessage('Cannot sort: the document is not open')
		document = found
		position = client.protocol2CodeConverter.asPosition(argument.position)
		scope = argument.scope
	} else {
		const editor = vscode.window.activeTextEditor
		if (!editor || editor.document.languageId !== 'liana') {
			vscode.window.showInformationMessage('Open a Liana file first to sort a dictionary')
			return
		}
		document = editor.document
		position = editor.selection.active
	}
	const version = document.version
	const response = await client.sendRequest<Sort_Dictionary_Response>('liana/sort_dictionary', {
		'uri': document.uri.toString(),
		'position': client.code2ProtocolConverter.asPosition(position),
		'scope': scope,
	})
	switch (response.status) {
		case 'no dictionary': return vscode.window.showInformationMessage(scope === 'deep'
			? 'The document contains no dictionaries'
			: 'Place the cursor inside a dictionary ({ ... }) to sort its entries')
		case 'parse error': return vscode.window.showInformationMessage('Cannot sort: the document has syntax errors')
		case 'document not found': return vscode.window.showErrorMessage('Cannot sort: the language server does not know this document')
		case 'found': break
	}

	const several = response.dictionaries > 1
	let order: Sort_Order = 'alphabetical'
	if (response.dependencies === 'present') {
		const picked = await vscode.window.showQuickPick(
			order_choices.map(($) => response.orders[$.order] === null ? { ...$, description: '(already in this order)' } : $),
			{
				placeHolder: several
					? `In ${response['with dependencies']} of the ${response.dictionaries} dictionaries entries depend on each other. How should those be sorted? The others are sorted alphabetically.`
					: 'The entries of this dictionary depend on each other. How should they be sorted?',
			},
		)
		if (picked === undefined) return
		order = picked.order
	}
	const edits = response.orders[order]
	const label = order_choices.find(($) => $.order === order)!.label.toLowerCase()
	if (!edits) {
		vscode.window.showInformationMessage(several ? `The dictionaries are already in ${label} order` : `The dictionary is already in ${label} order`)
	} else if (document.version !== version) {
		vscode.window.showInformationMessage('The document changed while sorting; try again')
		return
	} else {
		const edit = new vscode.WorkspaceEdit()
		edit.set(document.uri, await client.protocol2CodeConverter.asTextEdits(edits))
		await vscode.workspace.applyEdit(edit)
	}
	if (response.dependencies === 'unknown') {
		vscode.window.showInformationMessage('Sorted alphabetically only: dependencies between the entries could not be determined because the document could not be resolved')
	}
}) satisfies types.Register_Command
