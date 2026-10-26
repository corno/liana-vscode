import * as vscode_node from 'vscode-languageserver/node'
import * as vscode_textdocument from 'vscode-languageserver-textdocument'
import { Cache } from './core/cache'


import * as d_get_schema from "liana-authoring/schemas/retrieval_of_schema/schema"
import * as d_deserialize from "liana-authoring/schemas/deserialization/schema"

export type Cache_Context = {
	'schemas': Cache<d_get_schema.Result, d_get_schema.Error>
	'documents': Cache<d_deserialize.Result, d_deserialize.Error>
}

export type Connection_Context = {
	'documents': vscode_node.TextDocuments<vscode_textdocument.TextDocument>
	'connection': vscode_node.Connection
	'document notation styles': Map<string, 'verbose' | 'concise'>
	'cache': Cache_Context
}