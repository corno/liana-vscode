import * as _p from 'pareto-core/dist/assign'
import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'

//data types
import * as d_diagnostics from "liana-authoring/dist/interface/generated/liana/schemas/diagnostics/data"
// import * as d_get_on_hover_info from "liana-authoring/dist/interface/generated/liana/schemas/get_on_hover_info/data"
// import * as d_get_completion_suggestions from "liana-authoring/dist/interface/generated/liana/schemas/get_completion_suggestions/data"

/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as r_hover_info_from_loc from "liana-authoring/dist/implementation/manual/refiners/hover_info/list_of_characters"
import * as r_completion_suggestions_from_loc from "liana-authoring/dist/implementation/manual/refiners/completion_suggestions/list_of_characters"
import * as r_diagnositics_from_loc from "liana-authoring/dist/implementation/manual/refiners/diagnostics/list_of_characters"
import * as t_ur_from_loc_to_fp from "pareto-liana/dist/implementation/manual/transformers/unmarshall_result_from_loc/fountain_pen"
import * as t_fp_to_text from "pareto-fountain-pen/dist/implementation/manual/transformers/prose/text"

import * as fs from "fs"
import * as path from "path"

import {
	createConnection,
	TextDocuments,
	Diagnostic,
	DiagnosticSeverity,
	ProposedFeatures,
	InitializeParams,
	DidChangeConfigurationNotification,
	CompletionItem,
	CompletionParams,
	CompletionItemKind,
	TextDocumentPositionParams,
	CompletionTriggerKind,
	TextDocumentSyncKind,
	InitializeResult,
	DocumentDiagnosticReportKind,
	Position,
	type DocumentDiagnosticReport,
	DocumentSymbol,
	SymbolKind,
	DocumentSymbolParams,
	TextEdit,
	Range,
} from 'vscode-languageserver/node';

import * as vscode_types from 'vscode-languageserver-types';

import {
	TextDocument
} from 'vscode-languageserver-textdocument';

import * as url from "url"



// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager.
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

let hasConfigurationCapability = false;
let hasWorkspaceFolderCapability = false;
let hasDiagnosticRelatedInformationCapability = false;

connection.onInitialize((params: InitializeParams) => {
	const capabilities = params.capabilities;

	// Does the client support the `workspace/configuration` request?
	// If not, we fall back using global settings.
	hasConfigurationCapability = !!(
		capabilities.workspace && !!capabilities.workspace.configuration
	);
	hasWorkspaceFolderCapability = !!(
		capabilities.workspace && !!capabilities.workspace.workspaceFolders
	);
	hasDiagnosticRelatedInformationCapability = !!(
		capabilities.textDocument &&
		capabilities.textDocument.publishDiagnostics &&
		capabilities.textDocument.publishDiagnostics.relatedInformation
	);

	const result: InitializeResult = {
		capabilities: {
			textDocumentSync: TextDocumentSyncKind.Incremental,
			// Tell the client that this server supports code completion.
			completionProvider: {
				resolveProvider: true,
				'triggerCharacters': [
					'{', //to fill a linked dictionary
					'(', //to fill a verbose type
					'<', //to fill a concise type
					//'[', 
					'|', //to fill a union type
					'`', //to set a reference
					'\'', //to set a keyword or start a property
					':', //to set a property
					//',',
					'#' //to replace missing data
				],

			},
			diagnosticProvider: {
				interFileDependencies: false,
				workspaceDiagnostics: false
			},
			hoverProvider: true,
			documentSymbolProvider: true,
		}
	};
	if (hasWorkspaceFolderCapability) {
		result.capabilities.workspace = {
			workspaceFolders: {
				supported: true
			}
		};
	}
	return result;
});

connection.onInitialized(() => {
	if (hasConfigurationCapability) {
		// Register for all configuration changes.
		connection.client.register(DidChangeConfigurationNotification.type, undefined);
	}
	if (hasWorkspaceFolderCapability) {
		connection.workspace.onDidChangeWorkspaceFolders(_event => {
			connection.console.log('Workspace folder change event received.');
		});
	}
});

// The example settings
interface ExampleSettings {
	maxNumberOfProblems: number;
}

// The global settings, used when the `workspace/configuration` request is not supported by the client.
// Please note that this is not the case when using this server with the client provided in this example
// but could happen with other clients.
const defaultSettings: ExampleSettings = { maxNumberOfProblems: 1000 };
let globalSettings: ExampleSettings = defaultSettings;

// Cache the settings of all open documents
const documentSettings: Map<string, Thenable<ExampleSettings>> = new Map();

connection.onDidChangeConfiguration(change => {
	if (hasConfigurationCapability) {
		// Reset all cached document settings
		documentSettings.clear();
	} else {
		globalSettings = <ExampleSettings>(
			(change.settings.languageServerExample || defaultSettings)
		);
	}
	// Refresh the diagnostics since the `maxNumberOfProblems` could have changed.
	// We could optimize things here and re-fetch the setting first can compare it
	// to the existing setting, but this is out of scope for this example.
	connection.languages.diagnostics.refresh();
});

function getDocumentSettings(resource: string): Thenable<ExampleSettings> {
	if (!hasConfigurationCapability) {
		return Promise.resolve(globalSettings);
	}
	let result = documentSettings.get(resource);
	if (!result) {
		result = connection.workspace.getConfiguration({
			scopeUri: resource,
			section: 'languageServerExample'
		});
		documentSettings.set(resource, result);
	}
	return result;
}

// Only keep settings for open documents
documents.onDidClose(e => {
	documentSettings.delete(e.document.uri);
});


connection.languages.diagnostics.on(async (params) => {
	const document = documents.get(params.textDocument.uri);
	if (document !== undefined) {
		return {
			kind: DocumentDiagnosticReportKind.Full,
			items: await validateTextDocument(document)
		} satisfies DocumentDiagnosticReport;
	} else {
		// We don't know the document. We can either try to read it from disk
		// or we don't report problems for it.
		return {
			kind: DocumentDiagnosticReportKind.Full,
			items: []
		} satisfies DocumentDiagnosticReport;
	}
});

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent(change => {
	validateTextDocument(change.document);
});

// const create_vscode_position = (position: backend.Relative_Location): vscode_types.Position => {
// 	return new Position(position.line, position.column);
// }


async function validateTextDocument(textDocument: TextDocument): Promise<Diagnostic[]> {
	// In this simple example we get the settings for every validate run.
	return new Promise<Diagnostic[]>((resolve, reject) => {


		const x = ($: d_diagnostics.Diagnostics): Diagnostic[] => {
			return $.__l_map(($) => ({
				severity: (() => {
					switch ($.severity[0]) {
						case 'error': return DiagnosticSeverity.Error
						case 'warning': return DiagnosticSeverity.Warning
						case 'information': return DiagnosticSeverity.Information
						case 'hint': return DiagnosticSeverity.Hint
					}
				})(),
				message: $.message,
				range: vscode_types.Range.create(
					$.range.start.line,
					$.range.start.character,
					$.range.end.line,
					$.range.end.character
				),
				relatedInformation: $['related information'].__decide(
					($) => $.__get_raw_copy().map(($): vscode_types.DiagnosticRelatedInformation => ({
						'location': {
							'uri': textDocument.uri,
							'range': $.location.range,
						},
						'message': $.message,
					})),
					() => undefined
				)
			})).__get_raw_copy().map(($) => $)
		}

		try {

			fs.readFile(
				path.dirname(url.fileURLToPath(textDocument.uri)) + path.sep + "liana.schema",
				{ 'encoding': 'utf-8' },
				(err, data) => {
					if (err) {
						resolve([
							{
								'severity': DiagnosticSeverity.Error,
								'message': `Failed to read schema file: ${err.message}`,
								'range': vscode_types.Range.create(0, 0, 0, 1),
							}
						])
					} else {
						r_diagnositics_from_loc.Document(
							_p_list_from_text(
								textDocument.getText(),
								($) => $
							),
							($) => {
								resolve(x($))
								throw new Error("")
							},
							{
								'unmarshall': {
									'instance path': url.fileURLToPath(textDocument.uri),
									'schema': {
										'path': path.dirname(url.fileURLToPath(textDocument.uri)) + path.sep + "liana.schema",
										'content': _p_list_from_text(data, ($) => $),
									},
									'tab size': 1 // vscode works with character, not with columns
								}
							}
						)
					}
				}
			)
		} catch (e) {
			//the error is already reported to the user via the diagnostics, so we can just do nothing here (I think)
		}

	})
}

connection.onDidChangeWatchedFiles(_change => {
	// Monitored files have change in VSCode
	connection.console.log('We received a file change event');
});

// This handler provides the initial list of the completion items.
connection.onCompletion(
	(params: CompletionParams) => {
		// The pass parameter contains the position of the text document in
		// which code complete got requested. For the example we ignore this
		// info and always provide the same completion items.

		const doc = documents.get(params.textDocument.uri)
		if (doc === undefined) {
			return null
		}


		return new Promise<CompletionItem[]>((resolve, reject) => {
			const context = params.context;

			const remove_trigger_character = context &&
				context.triggerKind === CompletionTriggerKind.TriggerCharacter &&
				context.triggerCharacter === '#';

			const additionalTextEdits = remove_trigger_character
				? [
					// Remove the trigger character
					TextEdit.del(Range.create(
						params.position.line,
						params.position.character - 1,
						params.position.line,
						params.position.character
					))
				]
				: []

			resolve([])

			// q_get_completion_suggestions({
			// 	'read file': q_read_file
			// })(
			// 	{
			// 		'content': doc.getText(),
			// 		'file path': url.fileURLToPath(params.textDocument.uri),
			// 		'position': params.position,
			// 		'indent': '    ',
			// 	},
			// 	($) => $
			// ).__extract_data(
			// 	($) => {
			// 		$['completion suggestions'].__l_map(($) => {
			// 			console.log(`Completion item: ${JSON.stringify($.label)}`);
			// 		})
			// 		resolve($['completion suggestions'].__get_raw_copy().map(($) => ({
			// 			'label': $.label,
			// 			'insertText': $['insert text'],
			// 			'kind': CompletionItemKind.Text,
			// 			'data': 1,
			// 			'additionalTextEdits': additionalTextEdits,
			// 			'documentation': $.documentation,
			// 			'detail': $.documentation,
			// 		})))
			// 	},
			// 	() => {
			// 		resolve([{
			// 			'label': 'Error',
			// 			'insertText': '',
			// 			'kind': CompletionItemKind.Text,
			// 		}])
			// 	}
			// )
			// if (context && context.triggerKind === CompletionTriggerKind.TriggerCharacter) {
			// 	resolve([
			// 		{
			// 			label: `found trigger character: '${context.triggerCharacter}'`,
			// 			//kind: CompletionItemKind.Text,
			// 			data: 1
			// 		},
			// 		{
			// 			label: `a text completion item`,
			// 			//kind: CompletionItemKind.Text,
			// 			data: 1
			// 		},
			// 		{
			// 			label: `a keyword completion item`,
			// 			//kind: CompletionItemKind.Keyword,
			// 			data: 1
			// 		},
			// 		{
			// 			label: `a struct completion item`,
			// 			//kind: CompletionItemKind.Struct,
			// 			data: 1
			// 		},
			// 		{
			// 			label: `a snippet completion item`,
			// 			kind: CompletionItemKind.Snippet,
			// 			data: 1
			// 		},

			// 	])
			// } else {
			// 	resolve([
			// 		{
			// 			label: 'TypeScddddript',
			// 			kind: CompletionItemKind.Text,
			// 			data: 1
			// 		},
			// 		{
			// 			label: 'JavaScrissssspt',
			// 			kind: CompletionItemKind.Text,
			// 			data: 2
			// 		}
			// 	])
			// }
		})

	}
);

// This handler resolves additional information for the item selected in
// the completion list.
connection.onCompletionResolve(
	(item: CompletionItem): CompletionItem => {
		if (item.data === 1) {
			// item.detail = 'TypeScript details';
			// item.documentation = 'TypeScript documentation';
		} else if (item.data === 2) {
			// item.detail = 'JavaScript details';
			// item.documentation = 'JavaScript documentation';
		}
		return item;
	}
);

connection.onHover(
	(hoverParams, cancellationToken, workdoneProgress, resultProgress) => {
		// The pass parameter contains the position of the text document in
		// which code complete got requested.

		const doc = documents.get(hoverParams.textDocument.uri)
		if (doc === undefined) {
			return null
		}

		return new Promise(
			(resolve) => {
				resolve({
					'contents': []
				})
				// q_get_on_hover_info({
				// 	'read file': q_read_file
				// })(
				// 	{
				// 		'content': doc.getText(),
				// 		'file path': url.fileURLToPath(hoverParams.textDocument.uri),
				// 		'position': hoverParams.position
				// 	},
				// 	($) => $
				// ).__extract_data(
				// 	($) => {
				// 		resolve({
				// 			contents: $.contents['hover texts'].__decide(
				// 				($) => $.__get_raw_copy().map(($) => $),
				// 				() => []
				// 			)
				// 		})
				// 	},
				// 	($) => {
				// 		resolve({
				// 			contents: []
				// 		})
				// 	}
				// )
			},
		)
	}
)

connection.onDocumentSymbol(
	(params: DocumentSymbolParams): DocumentSymbol[] => {
		// Stub implementation - returns empty array until backend support is added
		// This handler provides document symbols for the outline view and navigation
		const document = documents.get(params.textDocument.uri);
		if (document === undefined) {
			return [];
		}

		// TODO: Replace with actual backend call when symbol extraction is implemented
		// For now, return a sample symbol to demonstrate the structure
		const stubSymbol: DocumentSymbol = {
			name: 'Document Root',
			kind: SymbolKind.Module,
			range: vscode_types.Range.create(0, 0, document.lineCount - 1, 0),
			selectionRange: vscode_types.Range.create(0, 0, 0, 0),
			children: [
				{
					name: 'Example Symbol',
					kind: SymbolKind.Function,
					range: vscode_types.Range.create(0, 0, 0, 10),
					selectionRange: vscode_types.Range.create(0, 0, 0, 10),
				}
			]
		};

		return [stubSymbol];
	}
);

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
