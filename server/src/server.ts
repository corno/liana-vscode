import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'
import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'

import { create_connection, validate_text_document } from './create_connection'

import * as vscode_node from 'vscode-languageserver/node';
import * as vscode_textdocument from 'vscode-languageserver-textdocument';
import { ExampleSettings } from './types';

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.

// Create a simple text document manager.
const documents: vscode_node.TextDocuments<vscode_textdocument.TextDocument> = new vscode_node.TextDocuments(vscode_textdocument.TextDocument);

// Only keep settings for open documents
documents.onDidClose(e => {
	documentSettings.delete(e.document.uri);
});

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent(change => {
	validate_text_document(change.document);
});

// Cache the settings of all open documents
const documentSettings: Map<string, Thenable<ExampleSettings>> = new Map();


create_connection(
	documentSettings,
	documents,
)