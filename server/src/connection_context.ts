import * as vscode_node from 'vscode-languageserver/node'
import * as vscode_textdocument from 'vscode-languageserver-textdocument'
import { Settings } from './types'
import { Cache } from './cache'
import { Cache_Entry } from './cache'


import * as d_temp_module_specifier from "pareto-liana/dist/interface/to_be_generated/temp_module_specifier"
import * as d_get_schema from "liana-authoring/dist/interface/to_be_generated/get_schema"
import * as d_deserialize from "liana-authoring/dist/interface/to_be_generated/deserialize"

export type Schema_Cache_Entry = Cache_Entry<d_temp_module_specifier.Temp_Module_Specifier, d_get_schema.Error>
export type Document_Cache_Entry = Cache_Entry<d_deserialize.Result, d_deserialize.Error>

export type Cache_Context = {
	'schema': Cache<Schema_Cache_Entry>
	'document': Cache<Document_Cache_Entry>
}

export type Connection_Context = {
	'documents': vscode_node.TextDocuments<vscode_textdocument.TextDocument>
	'connection': vscode_node.Connection
	'document notation styles': Map<string, 'verbose' | 'concise'>
	'document settings': Map<string, Thenable<Settings>>
	'default settings': Settings
	'cache': Cache_Context
	'set has configuration capability': (value: boolean) => void
	'set has workspace folder capability': (value: boolean) => void
	'set has diagnostic related information capability': (value: boolean) => void
	'has configuration capability': () => boolean
	'has workspace folder capability': () => boolean
	'has diagnostic related information capability': () => boolean
	'set global settings': (settings: Settings) => void
}