import * as vscode_node from 'vscode-languageserver/node'
import * as vscode_textdocument from 'vscode-languageserver-textdocument'
import { Cache } from './core/cache'


import * as d_temp_module_specifier from "pareto-liana/schemas/temp_module_specifier/schema"
import * as d_get_schema from "liana-authoring/schemas/retrieval_of_schema/schema"
import * as d_deserialize from "liana-authoring/schemas/deserialization/schema"

export interface Settings {
	max_number_of_problems: number
}

export type Cache_Context = {
	'schemas': Cache<d_temp_module_specifier.Temp_Module_Specifier, d_get_schema.Error>
	'documents': Cache<d_deserialize.Result, d_deserialize.Error>
}

export type Connection_Context = {
	'documents': vscode_node.TextDocuments<vscode_textdocument.TextDocument>
	'connection': vscode_node.Connection
	'document notation styles': Map<string, 'verbose' | 'concise'>
	'document settings': Map<string, Thenable<Settings>>
	'default settings': Settings
	'cache': Cache_Context
	'set has configuration capability': (value: boolean) => undefined
	'set has workspace folder capability': (value: boolean) => undefined
	'set has diagnostic related information capability': (value: boolean) => undefined
	'set global settings': (settings: Settings) => undefined
	'has configuration capability': () => boolean
	'has workspace folder capability': () => boolean
	'has diagnostic related information capability': () => boolean
}