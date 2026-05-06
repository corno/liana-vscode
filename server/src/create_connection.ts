import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'
import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'
import _p_variables from 'pareto-core/dist/_p_variables'
import create_refinement_context from 'pareto-core/dist/__internals/async/create_refinement_context'

import * as helpers from './helpers'

import * as r_parse_tree_from_loc from "astn-core/dist/implementation/manual/refiners/parse_tree/list_of_characters"
import * as t_unmarshall_result_to_hover_info from "liana-authoring/dist/implementation/manual/transformers/unmarshall_result/hover_info"
import * as t_unmarshall_result_to_diagnostics from "liana-authoring/dist/implementation/manual/transformers/unmarshall_result/diagnostics"
import * as t_unmarshall_result_to_formatting_edits from "liana-authoring/dist/implementation/manual/transformers/unmarshall_result/formatting_edits"
import * as t_node_path_to_text from "pareto-resources/dist/implementation/manual/transformers/path/text"
import * as t_parse_tree_to_text from "astn/dist/implementation/manual/transformers/parse_tree/text"
import * as t_deserialize_to_diagnostic from "liana-authoring/dist/implementation/manual/transformers/deserialize/diagnostics"

import * as path from "path"

import * as url from "url"
import { load_document } from './to_be_backend/load_document'
import { schema_cache } from './schema_cache'

import * as vscode_node from 'vscode-languageserver/node'
import * as vscode_textdocument from 'vscode-languageserver-textdocument'
import { ExampleSettings } from './types'
import { create_on_completion } from './connection/on_completion'

export async function validate_text_document(textDocument: vscode_textdocument.TextDocument): Promise<vscode_node.Diagnostic[]> {
	return new Promise<vscode_node.Diagnostic[]>((resolve) => {
		load_document(
			textDocument,
			schema_cache,
			($) => _p.list.literal([
				t_deserialize_to_diagnostic.Error($)
			]),
			($) => t_unmarshall_result_to_diagnostics.Document($),
			($) => {
				resolve($.__l_map(($) => ({
					severity: (() => {
						switch ($.severity[0]) {
							case 'error': return vscode_node.DiagnosticSeverity.Error
							case 'warning': return vscode_node.DiagnosticSeverity.Warning
							case 'information': return vscode_node.DiagnosticSeverity.Information
							case 'hint': return vscode_node.DiagnosticSeverity.Hint
						}
					})(),
					message: $.message,
					range: $.range.__decide(
						($) => helpers.create_range_from_possible_range($),
						() => vscode_node.Range.create(0, 0, 0, 1) // if we don't have a range, we put it at the start of the document
					),
					source: _p.decide.state($.type, ($): string => {
						switch ($[0]) {
							case 'semantic': return _p.ss($, ($) => "liana-semantic")
							case 'deserialize': return _p.ss($, ($) => "liana-deserialize")
							case 'schema': return _p.ss($, ($) => "schema")
							default: return _p.au($[0])
						}
					}),
					relatedInformation: $['related information'].__decide(
						($) => $.__get_raw_copy().map(($): vscode_node.DiagnosticRelatedInformation => ({
							'location': {
								'uri': t_node_path_to_text.Node_Path($.location['file path']),
								'range': helpers.create_range_from_possible_range($.location.range),
							},
							'message': $.message,
						})),
						() => undefined
					)
				})).__get_raw_copy().map(($) => $))
			},
		)



	})
}



export const create_connection = (
	documentSettings: Map<string, Thenable<ExampleSettings>>,
	documents: vscode_node.TextDocuments<vscode_textdocument.TextDocument>,
) => {

	// The global settings, used when the `workspace/configuration` request is not supported by the client.
	// Please note that this is not the case when using this server with the client provided in this example
	// but could happen with other clients.
	const defaultSettings: ExampleSettings = { maxNumberOfProblems: 1000 }


	let globalSettings: ExampleSettings = defaultSettings

	// Store the notation style preference per document
	const documentNotationStyles: Map<string, 'verbose' | 'concise'> = new Map()

	let hasConfigurationCapability = false
	let hasWorkspaceFolderCapability = false
	let hasDiagnosticRelatedInformationCapability = false

	const connection = vscode_node.createConnection(vscode_node.ProposedFeatures.all)


	connection.onInitialize((params: vscode_node.InitializeParams) => {
		// Get notation style from initialization options (for initial document)
		if (params.initializationOptions && params.initializationOptions.notationStyle) {
			// Store as default for documents without specific preference
			documentNotationStyles.set('__default__', params.initializationOptions.notationStyle)
		}

		const capabilities = params.capabilities

		// Does the client support the `workspace/configuration` request?
		// If not, we fall back using global settings.
		hasConfigurationCapability = !!(
			capabilities.workspace && !!capabilities.workspace.configuration
		)
		hasWorkspaceFolderCapability = !!(
			capabilities.workspace && !!capabilities.workspace.workspaceFolders
		)
		hasDiagnosticRelatedInformationCapability = !!(
			capabilities.textDocument &&
			capabilities.textDocument.publishDiagnostics &&
			capabilities.textDocument.publishDiagnostics.relatedInformation
		)

		const result: vscode_node.InitializeResult = {
			capabilities: {
				textDocumentSync: vscode_node.TextDocumentSyncKind.Incremental,
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
					codeActionKinds: [vscode_node.CodeActionKind.Refactor],
					resolveProvider: true
				},
				documentFormattingProvider: true,
			}
		}
		if (hasWorkspaceFolderCapability) {
			result.capabilities.workspace = {
				workspaceFolders: {
					supported: true
				}
			}
		}
		return result
	})

	connection.onInitialized(() => {
		if (hasConfigurationCapability) {
			// Register for all configuration changes.
			connection.client.register(vscode_node.DidChangeConfigurationNotification.type, undefined)
		}
		if (hasWorkspaceFolderCapability) {
			connection.workspace.onDidChangeWorkspaceFolders(_event => {
				connection.console.log('Workspace folder change event received.')
			})
		}
	})


	connection.onDidChangeConfiguration(change => {
		if (hasConfigurationCapability) {
			// Reset all cached document settings
			documentSettings.clear()
		} else {
			globalSettings = <ExampleSettings>(
				(change.settings.languageServerExample || defaultSettings)
			)
		}
		// Refresh the diagnostics since the `maxNumberOfProblems` could have changed.
		// We could optimize things here and re-fetch the setting first can compare it
		// to the existing setting, but this is out of scope for this example.
		connection.languages.diagnostics.refresh()
	})

	// function getDocumentSettings(resource: string): Thenable<ExampleSettings> {
	// 	if (!hasConfigurationCapability) {
	// 		return Promise.resolve(globalSettings)
	// 	}
	// 	let result = documentSettings.get(resource)
	// 	if (!result) {
	// 		result = connection.workspace.getConfiguration({
	// 			scopeUri: resource,
	// 			section: 'languageServerExample'
	// 		})
	// 		documentSettings.set(resource, result)
	// 	}
	// 	return result
	// }



	connection.languages.diagnostics.on(async (params) => {
		const document = documents.get(params.textDocument.uri)
		if (document !== undefined) {
			return {
				kind: vscode_node.DocumentDiagnosticReportKind.Full,
				items: await validate_text_document(document)
			}
		} else {
			// We don't know the document. We can either try to read it from disk
			// or we don't report problems for it.
			return {
				kind: vscode_node.DocumentDiagnosticReportKind.Full,
				items: []
			}
		}
	})


	connection.onDidChangeWatchedFiles(async (_change) => {
		// Monitored files have change in VSCode
		connection.console.log('We received a file change event')

		// Invalidate schema cache for any changed files and re-validate affected documents
		for (const change of _change.changes) {
			const file_path = url.fileURLToPath(change.uri)
			// Check if this is a schema file
			if (file_path.endsWith(path.join('.liana', 'schema.slna'))) {
				schema_cache.delete(file_path)
				connection.console.log(`Schema cache invalidated for: ${file_path}`)
				
				// Find the directory that contains the .liana folder
				// Schema path is like: /path/to/project/.liana/schema.slna
				// We want to re-validate all .liana files in /path/to/project/
				const schemaDir = path.dirname(file_path) // .../project/.liana
				const projectDir = path.dirname(schemaDir) // .../project
				
				// Re-validate all open documents that use this schema
				const affectedDocuments: vscode_textdocument.TextDocument[] = []
				documents.all().forEach(doc => {
					const doc_path = url.fileURLToPath(doc.uri)
					// Check if this document is in the project directory or subdirectories
					if (doc_path.startsWith(projectDir + path.sep) || path.dirname(doc_path) === projectDir) {
						affectedDocuments.push(doc)
					}
				})
				
				connection.console.log(`Re-validating ${affectedDocuments.length} document(s) affected by schema change`)
				
				// Trigger validation for each affected document
				for (const doc of affectedDocuments) {
					const diagnostics = await validate_text_document(doc)
					connection.sendDiagnostics({ uri: doc.uri, diagnostics })
				}
			}
		}
	})

	// Register custom request to update notation style
	connection.onRequest('liana/updateNotationStyle', (params: { uri: string, style: 'verbose' | 'concise' }) => {
		documentNotationStyles.set(params.uri, params.style)
		connection.console.log(`Notation style updated for ${params.uri}: ${params.style}`)
	})

	// This handler provides the initial list of the completion items.
	connection.onCompletion(
		create_on_completion(documents, (uri: string) => {
			// Get document-specific style, fall back to default
			return documentNotationStyles.get(uri) || documentNotationStyles.get('__default__') || 'verbose'
		})
	)

	// This handler resolves additional information for the item selected in
	// the completion list.
	connection.onCompletionResolve(
		(item: vscode_node.CompletionItem): vscode_node.CompletionItem => {
			if (item.data && item.data.documentation) {
				item.documentation = {
					kind: vscode_node.MarkupKind.PlainText,
					value: item.data.documentation
				}
			}
			return item
		}
	)

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
					load_document(
						doc,
						schema_cache,
						($) => ({
							'contents': []
						}),
						(instance) => ({
							'contents': t_unmarshall_result_to_hover_info.Document(
								instance,
								{
									'position': hoverParams.position,
									'full path': "",
									'id path': ""
								}
							).__get_raw_copy().map(($) => $)
						}),
						resolve,
					)
				},
			)
		}
	)

	connection.onCodeAction(
		(params: vscode_node.CodeActionParams) => {
			//connection.console.log(`Code action requested at position: ${params.range.start.line}:${params.range.start.character}`)

			// Return lightweight actions without computing edits
			const actions: vscode_node.CodeAction[] = []

			const notationTypes: Array<[string, 'verbose' | 'concise', boolean]> = [
				['Convert to verbose notation (shallow)', 'verbose', true],
				['Convert to verbose notation (deep)', 'verbose', false],
				['Convert to concise notation (shallow)', 'concise', true],
				['Convert to concise notation (deep)', 'concise', false],
			]

			for (const [actionTitle, style, shallow] of notationTypes) {
				actions.push({
					title: actionTitle,
					kind: vscode_node.CodeActionKind.Refactor,
					data: {
						uri: params.textDocument.uri,
						position: params.range.start,
						style: style,
						shallow: shallow
					}
				})
			}

			//connection.console.log(`Returning ${actions.length} code actions`)
			return actions
		}
	)

	connection.onCodeActionResolve(
		(action: vscode_node.CodeAction) => {
			return new Promise<vscode_node.CodeAction>((resolve) => {
				if (!action.data) {
					connection.console.log('Code action resolve called without data')
					resolve(action)
					return
				}

				const { uri, position, style, shallow } = action.data
				const document = documents.get(uri)

				if (document === undefined) {
					connection.console.log('Code action resolve called but document not found')
					resolve(action)
					return
				}

				connection.console.log(`Resolving code action: ${action.title}`)

				load_document(
					document,
					schema_cache,
					($) => null,
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


						return formattingResult
					},
					($) => {
						if ($ === null) {
							resolve(action)
						} else {
							action.edit = {
								changes: {
									[uri]: [
										vscode_node.TextEdit.replace(
											helpers.create_range_from_range($.replace.range),
											$.replace.text
										)
									]
								}
							}
							resolve(action)
						}
					},
				)
			})
		}
	)

	connection.onDocumentFormatting(
		(params: vscode_node.DocumentFormattingParams): vscode_node.TextEdit[] => {
			const document = documents.get(params.textDocument.uri)
			if (document === undefined) {
				connection.console.log('Document formatting called but document not found')
				return []
			}

			return create_refinement_context(
				(abort) => r_parse_tree_from_loc.Document(
					_p_list_from_text(
						document.getText(),
						($) => $
					),
					($) => abort($),
					{
						'tab size': params.options.tabSize || 4,
					}
				)
			).__extract_data(
				($) => {

					return [
						vscode_node.TextEdit.replace(
							_p_variables(() => {
								// Create range covering the entire document
								const lastLine = document.lineCount - 1
								const lastLineLength = document.getText(vscode_node.Range.create(lastLine, 0, lastLine + 1, 0)).length
								return vscode_node.Range.create(
									0,
									0,
									lastLine,
									lastLineLength
								)
							}),
							t_parse_tree_to_text.Document(
								$,
								{
									'indentation': ' '.repeat(params.options.tabSize || 4),
									'newline': '\n'
								}
							)
						)
					]
				},
				($) => {
					connection.window.showInformationMessage(`could not format document due to parsing error`)
					return []
				}
			)
		}
	)

	const onDocumentSymbol: vscode_node.ServerRequestHandler<vscode_node.DocumentSymbolParams, vscode_node.SymbolInformation[] | vscode_node.DocumentSymbol[] | undefined | null, vscode_node.SymbolInformation[] | vscode_node.DocumentSymbol[], void> = (params) => {
		// Stub implementation - returns empty array until backend support is added
		// This handler provides document symbols for the outline view and navigation
		const document = documents.get(params.textDocument.uri)
		if (document === undefined) {
			return []
		}

		// TODO: Replace with actual backend call when symbol extraction is implemented
		// For now, return a sample symbol to demonstrate the structure
		const stubSymbol: vscode_node.DocumentSymbol = {
			name: 'Document Root',
			kind: vscode_node.SymbolKind.Module,
			range: vscode_node.Range.create(0, 0, document.lineCount - 1, 0),
			selectionRange: vscode_node.Range.create(0, 0, 0, 0),
			children: [
				{
					name: 'Example Symbol',
					kind: vscode_node.SymbolKind.Function,
					range: vscode_node.Range.create(0, 0, 0, 10),
					selectionRange: vscode_node.Range.create(0, 0, 0, 10),
				}
			]
		}

		return [stubSymbol]
	}

	connection.onDocumentSymbol(
		onDocumentSymbol
	)

	// Make the text document manager listen on the connection
	// for open, change and close text document events
	documents.listen(connection)

	// Listen on the connection
	connection.listen()
}