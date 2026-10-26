
import { create_connection } from './create_connection'
import { create_cache } from './core/cache'

import * as vscode_node from 'vscode-languageserver/node'
import * as vscode_textdocument from 'vscode-languageserver-textdocument'
import { Cache_Context } from './connection_context'

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.

// Create a simple text document manager.
const documents: vscode_node.TextDocuments<vscode_textdocument.TextDocument> = new vscode_node.TextDocuments(vscode_textdocument.TextDocument)

const cache_context: Cache_Context = {
	'schemas': create_cache(),
	'documents': create_cache(),
}

documents.onDidClose(e => {
	// Clear all document cache entries for this URI (across all versions)
	const uri = e.document.uri
	const keys_to_delete: string[] = []
	cache_context.documents.map.forEach((value, key) => {
		if (key.startsWith(`${uri}@`)) {
			keys_to_delete.push(key)
		}
	})
	keys_to_delete.forEach(key => cache_context.documents.map.delete(key))
})

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent(change => {
	// Clear all old document cache entries for this URI
	// The cache key is ${uri}@${version}, so we need to remove all old versions
	const uri = change.document.uri
	const keys_to_delete: string[] = []
	cache_context.documents.map.forEach((value, key) => {
		if (key.startsWith(`${uri}@`)) {
			keys_to_delete.push(key)
		}
	})
	keys_to_delete.forEach(key => cache_context.documents.map.delete(key))
	// No diagnostics refresh here: the client pulls diagnostics for the changed document itself,
	// and documents do not depend on each other (`interFileDependencies: false`).
})

create_connection(
	documents,
	cache_context,
)