import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'
import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'

import { create_connection } from './create_connection'
import { create_cache } from './cache'
import { Schema_Cache_Entry } from './connection_context'
import { Document_Cache_Entry } from './connection_context'

import * as vscode_node from 'vscode-languageserver/node'
import * as vscode_textdocument from 'vscode-languageserver-textdocument'
import { Settings } from './types'
import { Cache_Context } from './connection_context'

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.

// Create a simple text document manager.
const documents: vscode_node.TextDocuments<vscode_textdocument.TextDocument> = new vscode_node.TextDocuments(vscode_textdocument.TextDocument)

const cache_context: Cache_Context = {
	'schema': create_cache<Schema_Cache_Entry>(),
	'document': create_cache<Document_Cache_Entry>(),
}

// Only keep settings for open documents
documents.onDidClose(e => {
	document_settings.delete(e.document.uri)
	// Clear all document cache entries for this URI (across all versions)
	const uri = e.document.uri
	const keys_to_delete: string[] = []
	cache_context.document.map.forEach((value, key) => {
		if (key.startsWith(`${uri}@`)) {
			keys_to_delete.push(key)
		}
	})
	keys_to_delete.forEach(key => cache_context.document.map.delete(key))
})

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent(change => {
	// Clear all old document cache entries for this URI
	// The cache key is ${uri}@${version}, so we need to remove all old versions
	const uri = change.document.uri
	const keys_to_delete: string[] = []
	cache_context.document.map.forEach((value, key) => {
		if (key.startsWith(`${uri}@`)) {
			keys_to_delete.push(key)
		}
	})
	keys_to_delete.forEach(key => cache_context.document.map.delete(key))
	
	// Trigger a diagnostic refresh to update the diagnostics
	connection.languages.diagnostics.refresh()
})

// Cache the settings of all open documents
const document_settings: Map<string, Thenable<Settings>> = new Map()

const connection = create_connection(
	document_settings,
	documents,
	cache_context,
)