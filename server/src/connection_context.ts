import * as vscode_node from 'vscode-languageserver/node'
import * as vscode_textdocument from 'vscode-languageserver-textdocument'
import { Settings } from './types'


export type Connection_Context = {
	'documents': vscode_node.TextDocuments<vscode_textdocument.TextDocument>
	'connection': vscode_node.Connection
	'document notation styles': Map<string, 'verbose' | 'concise'>
	'document settings': Map<string, Thenable<Settings>>
	'default settings': Settings
	'set has configuration capability': (value: boolean) => void
	'set has workspace folder capability': (value: boolean) => void
	'set has diagnostic related information capability': (value: boolean) => void
	'has configuration capability': () => boolean
	'has workspace folder capability': () => boolean
	'has diagnostic related information capability': () => boolean
	'set global settings': (settings: Settings) => void
}