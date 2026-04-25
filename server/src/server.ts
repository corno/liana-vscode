import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'
import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'
import _p_unreachable from 'pareto-core/dist/_p_unreachable_code_path'
import * as pareto_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'
import create_refinement_context from 'pareto-core/dist/__internals/async/create_refinement_context'

//data types
import * as d_path from "pareto-resources/dist/interface/generated/liana/schemas/path/data"
import * as d_diagnostics from "liana-authoring/dist/interface/generated/liana/schemas/diagnostics/data"
import * as d_unmarshall_result_from_lines_of_characters from "liana-authoring/dist/interface/to_be_generated/unmarshall_result_from_loc"
import * as d_location from "liana-authoring/dist/interface/generated/liana/schemas/location/data"
import * as d_text_edits from "liana-authoring/dist/interface/generated/liana/schemas/text_edits/data"

/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as t_unmarshall_result_to_hover_info from "liana-authoring/dist/implementation/manual/transformers/unmarshall_result/hover_info"
import * as t_unmarshall_result_to_completion_suggestions from "liana-authoring/dist/implementation/manual/transformers/unmarshall_result/completion_suggestions"
import * as t_unmarshall_result_to_diagnostics from "liana-authoring/dist/implementation/manual/transformers/unmarshall_result/diagnostics"
import * as t_unmarshall_result_to_formatting_edits from "liana-authoring/dist/implementation/manual/transformers/unmarshall_result/formatting_edits"
import * as r_parse_tree_from_loc from "astn-core/dist/implementation/manual/refiners/parse_tree/list_of_characters"
import * as t_node_path_to_text from "pareto-resources/dist/implementation/manual/transformers/path/text"
import * as t_parse_tree_to_text from "astn/dist/implementation/manual/transformers/parse_tree/text"

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
	InsertTextFormat,
	CompletionTriggerKind,
	TextDocumentSyncKind,
	InitializeResult,
	DocumentDiagnosticReportKind,
	DocumentDiagnosticReport,
	DocumentSymbol,
	SymbolKind,
	DocumentSymbolParams,
	TextEdit,
	Range,
	MarkupKind,
	CodeAction,
	CodeActionKind,
	CodeActionParams,
	DocumentFormattingParams,
} from 'vscode-languageserver/node';

import * as vscode_types from 'vscode-languageserver-types';

import {
	DocumentUri,
	TextDocument
} from 'vscode-languageserver-textdocument';

import * as url from "url"
import { Completion_Suggestions } from 'liana-authoring/dist/interface/generated/liana/schemas/completion_suggestions/data'
import load_possibly_cached_schema from './load_possibly_cached_schema'
import { Schema_Cache } from './schema_cache'
import { load_instance } from './to_be_backend/load_instance'



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
					'`', //to set a keyword or start a property
					'\'', //to set a id or a reference
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
			codeActionProvider: {
				codeActionKinds: [CodeActionKind.Refactor],
				resolveProvider: true
			},
			documentFormattingProvider: true,
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

// Schema cache to avoid re-reading and re-parsing schemas
type Cached_Schema = {
	unmarshall_parameters: d_unmarshall_result_from_lines_of_characters.Parameters
	schema_path: d_path.Node_Path
}

const schema_cache = new Schema_Cache()


const create_range = (
	$: d_location.Range_FE
): vscode_types.Range => {
	return vscode_types.Range.create(
		$.start.line,
		$.start.character,
		$.end.line,
		$.end.character
	)
}


async function validateTextDocument(textDocument: TextDocument): Promise<Diagnostic[]> {
	// In this simple example we get the settings for every validate run.
	return new Promise<Diagnostic[]>((resolve) => {

		const convert_diagnostics = ($: d_diagnostics.Diagnostics, source: string): Diagnostic[] => {
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
				range: create_range($.range),
				source: source,
				relatedInformation: $['related information'].__decide(
					($) => $.__get_raw_copy().map(($): vscode_types.DiagnosticRelatedInformation => ({
						'location': {
							'uri': t_node_path_to_text.Node_Path($.location['file path']),
							'range': create_range($.location.range),
						},
						'message': $.message,
					})),
					() => undefined
				)
			})).__get_raw_copy().map(($) => $)
		}

		load_instance(
			textDocument.uri,
			textDocument.getText(),
			schema_cache,
			($) => _p.decide.state($, ($) => {
				switch ($[0]) {
					case 'schema': return _p.ss($, ($) => {
						const schema_path = $['schema path']
						resolve(_p.decide.state($.type, ($) => {
							switch ($[0]) {
								case 'read file': return _p.ss($, ($) => [
									{
										'severity': DiagnosticSeverity.Error,
										'message': `Failed to read schema file: ${schema_path}`,
										'range': vscode_types.Range.create(0, 0, 0, 1),
									}
								])
								case 'parse schema': return _p.ss($, ($) => [
									{
										'severity': DiagnosticSeverity.Error,
										'message': `Failed to parse schema: ${schema_path}`,
										'range': vscode_types.Range.create(0, 0, 0, 1),
									}
								])
								default: return _p.au($[0])
							}
						}))

					})
					case 'unmarshall': return _p.ss($, ($) => {
						return [
							{
								'severity': DiagnosticSeverity.Error,
								'message': `Failed to unmarshall (FIXME)`,
								'range': vscode_types.Range.create(0, 0, 0, 1),

							}
						]

						// convert_diagnostics(
						// 	_p.list.literal([
						// 		$
						// 	]),
						// 	_p.decide.state($.type, ($) => {
						// 		switch ($[0]) {
						// 			case 'schema': return _p.ss($, ($) => "schema")
						// 			case 'deserialize': return _p.ss($, ($) => "deserialize")
						// 			default: return _p.au($[0])
						// 		}
						// 	}))
						// resolve(convert_diagnostics($, 'liana-unmarshall'))
					})
					default: return _p.au($[0])
				}
			}),
			($) => {
				resolve(convert_diagnostics(t_unmarshall_result_to_diagnostics.Document($), 'liana-semantic'))
			}
		)



	})
}

const map_text_edits = ($: d_text_edits.Text_Edits): vscode_types.TextEdit[] => $.__l_map(($): TextEdit => _p.decide.state($, ($) => {
	switch ($[0]) {
		case 'replace': return _p.ss($, ($) => TextEdit.replace(
			create_range($.range),
			$.text
		))
		case 'delete': return _p.ss($, ($) => TextEdit.del(
			create_range($.range)
		))
		case 'insert': return _p.ss($, ($) => TextEdit.insert(
			$.location,
			$.text
		))
		default: return _p.au($[0])
	}
})).__get_raw_copy().map(($) => $)

connection.onDidChangeWatchedFiles(_change => {
	// Monitored files have change in VSCode
	connection.console.log('We received a file change event');

	// Invalidate schema cache for any changed files
	_change.changes.forEach(change => {
		const file_path = url.fileURLToPath(change.uri)
		// Check if this is a schema file
		if (file_path.endsWith(path.join('.liana', 'schema.slna'))) {
			schema_cache.delete(file_path)
			connection.console.log(`Schema cache invalidated for: ${file_path}`);
		}
	})
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

		return new Promise<vscode_types.CompletionList>((resolve) => {
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

			load_instance(
				params.textDocument.uri,
				doc.getText(),
				schema_cache,
				($) => {
					resolve({ 'isIncomplete': false, 'items': [] })
				},
				(instance) => {
					// We have the instance, now we can compute the completion items
					const xxxxx = t_unmarshall_result_to_completion_suggestions.Document(
						instance,
						{
							'indent': "    ",
							'position': params.position,
						}
					)

					const items = xxxxx.__decide(
						($) => $.__l_map(($) => {
							return ({
								'label': $.label,
								'insertText': $['insert text'],
								'insertTextFormat': InsertTextFormat.Snippet,
								'kind': _p.decide.state($.type, ($): CompletionItemKind => {
									switch ($[0]) {
										case 'simple': return _p.ss($, ($) => CompletionItemKind.Value)
										case 'component': return _p.ss($, ($) => CompletionItemKind.Class)
										case 'dictionary': return _p.ss($, ($) => CompletionItemKind.Class)
										case 'group': return _p.ss($, ($) => CompletionItemKind.Struct)
										case 'list': return _p.ss($, ($) => CompletionItemKind.Class)
										case 'nothing': return _p.ss($, ($) => CompletionItemKind.Value)
										case 'optional': return _p.ss($, ($) => CompletionItemKind.Field)
										case 'reference': return _p.ss($, ($) => CompletionItemKind.Reference)
										case 'state': return _p.ss($, ($) => CompletionItemKind.Enum)
										case 'text': return _p.ss($, ($) => CompletionItemKind.Text)
										default: return _p.au($[0])
									}
								}),
								'additionalTextEdits': map_text_edits($['additional text edits']),
								'documentation': {
									kind: MarkupKind.PlainText,
									value: $.documentation
								},
								'data': {
									'documentation': $.documentation
								}
							})
						}).__get_raw_copy().map(($) => $),
						() => []
					)
					resolve({
						'isIncomplete': false,
						'items': items
					})
				}
			)
		})

	}
);

// This handler resolves additional information for the item selected in
// the completion list.
connection.onCompletionResolve(
	(item: CompletionItem): CompletionItem => {
		if (item.data && item.data.documentation) {
			item.documentation = {
				kind: MarkupKind.PlainText,
				value: item.data.documentation
			};
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

				load_instance(
					hoverParams.textDocument.uri,
					doc.getText(),
					schema_cache,
					($) => {
						resolve({
							'contents': []
						})
					},
					(instance) => {
						// We have the instance, now we can compute the hover info
						resolve({
							'contents': t_unmarshall_result_to_hover_info.Document(
								instance,
								{
									'position': hoverParams.position,
									'full path': "",
									'id path': ""
								}
							).__decide(
								($) => $.__get_raw_copy(),
								() => []
							).map(($) => $)
						})
					}
				)
			},
		)
	}
)

connection.onCodeAction(
	(params: CodeActionParams) => {
		connection.console.log(`Code action requested at position: ${params.range.start.line}:${params.range.start.character}`);

		// Return lightweight actions without computing edits
		const actions: CodeAction[] = [];

		const notationTypes: Array<[string, 'verbose' | 'concise', boolean]> = [
			['Convert to verbose notation (shallow)', 'verbose', true],
			['Convert to verbose notation (deep)', 'verbose', false],
			['Convert to concise notation (shallow)', 'concise', true],
			['Convert to concise notation (deep)', 'concise', false],
		];

		for (const [actionTitle, style, shallow] of notationTypes) {
			actions.push({
				title: actionTitle,
				kind: CodeActionKind.Refactor,
				data: {
					uri: params.textDocument.uri,
					position: params.range.start,
					style: style,
					shallow: shallow
				}
			});
		}

		connection.console.log(`Returning ${actions.length} code actions`);
		return actions;
	}
);

connection.onCodeActionResolve(
	(action: CodeAction) => {
		return new Promise<CodeAction>((resolve) => {
			if (!action.data) {
				connection.console.log('Code action resolve called without data');
				resolve(action);
				return;
			}

			const { uri, position, style, shallow } = action.data;
			const document = documents.get(uri);

			if (document === undefined) {
				connection.console.log('Code action resolve called but document not found');
				resolve(action);
				return;
			}

			connection.console.log(`Resolving code action: ${action.title}`);

			load_instance(
				uri,
				document.getText(),
				schema_cache,
				($) => {
					// connection.console.log(`Instance could not be loaded for code action: ${$['schema path']}`);
					resolve(action);
				},
				(instance) => {
					const formattingResult = t_unmarshall_result_to_formatting_edits.Document(
						instance,
						{
							'conversion': {
								'style': [style, null],
								'impact': shallow
									? ['shallow', null]
									: ['deep', null]
							},
							'indent': "    ",
							'position': position,
						}
					)

					action.edit = {
						changes: {
							[uri]: [
								TextEdit.replace(
									create_range(formattingResult.replace.range),
									formattingResult.replace.text
								)
							]
						}
					}
					resolve(action)
				}
			)
		});
	}
);

connection.onDocumentFormatting(
	(params: DocumentFormattingParams): TextEdit[] => {
		const document = documents.get(params.textDocument.uri);
		if (document === undefined) {
			connection.console.log('Document formatting called but document not found');
			return [];
		}

		try {
			connection.console.log('Formatting document...');

			// Parse the document to a parse tree
			const parseTree = r_parse_tree_from_loc.Document(
				_p_list_from_text(
					document.getText(),
					($) => $
				),
				($) => {
					throw new Error('Parse error occurred');
				},
				{
					'tab size': params.options.tabSize || 4,
				}
			);

			// Transform the parse tree back to formatted text
			const formattedText = t_parse_tree_to_text.Document(
				parseTree,
				{
					'indentation': ' '.repeat(params.options.tabSize || 4),
					'newline': '\n'
				}
			);

			// Create range covering the entire document
			const lastLine = document.lineCount - 1;
			const lastLineLength = document.getText(Range.create(lastLine, 0, lastLine + 1, 0)).length;

			connection.console.log(`Formatting complete. Original lines: ${document.lineCount}, Formatted length: ${formattedText.length}`);

			// Return a single edit that replaces the entire document
			return [
				TextEdit.replace(
					Range.create(
						0,
						0,
						lastLine,
						lastLineLength
					),
					formattedText
				)
			];
		} catch (e) {
			if (e instanceof pareto_unreachable_code_path.Unreachable_Code_Path_Error) {
				connection.console.error(`Unreachable code path reached while formatting document: ${e.message}`);
			} else {
				connection.console.error(`Formatting error: ${e instanceof Error ? e.message : String(e)}`);
			}
			return [];
		}
	}
);

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
