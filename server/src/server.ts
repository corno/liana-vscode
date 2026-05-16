import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'
import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'

import { create_connection } from './create_connection'

import * as vscode_node from 'vscode-languageserver/node'
import * as vscode_textdocument from 'vscode-languageserver-textdocument'
import { Settings } from './types'

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.

// Create a simple text document manager.
const documents: vscode_node.TextDocuments<vscode_textdocument.TextDocument> = new vscode_node.TextDocuments(vscode_textdocument.TextDocument)

// Only keep settings for open documents
documents.onDidClose(e => {
	document_settings.delete(e.document.uri)
})

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent(change => {
	// Trigger a diagnostic refresh to update the diagnostics
	connection.languages.diagnostics.refresh()
})

// Cache the settings of all open documents
const document_settings: Map<string, Thenable<Settings>> = new Map()

const connection = create_connection(
	document_settings,
	documents,
)