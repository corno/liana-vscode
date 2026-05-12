import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'
import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'
import _p_variables from 'pareto-core/dist/_p_variables'
import create_refinement_context from 'pareto-core/dist/__internals/async/create_refinement_context'

import * as helpers from './helpers'

import * as d_unmarshall_result from "liana-authoring/dist/interface/to_be_generated/unmashall_result"
import * as d_document_symbols from "liana-authoring/dist/interface/to_be_generated/document_symbols"

import * as r_parse_tree_from_loc from "astn-core/dist/implementation/manual/refiners/parse_tree/list_of_characters"
import * as t_unmarshall_result_to_hover_info from "liana-authoring/dist/implementation/manual/transformers/unmarshall_result/hover_info"
import * as t_unmarshall_result_to_diagnostics from "liana-authoring/dist/implementation/manual/transformers/unmarshall_result/diagnostics"
import * as t_unmarshall_result_to_formatting_edits from "liana-authoring/dist/implementation/manual/transformers/unmarshall_result/formatting_edits"
import * as t_unmarshall_result_to_selection_ranges from "liana-authoring/dist/implementation/manual/transformers/unmarshall_result/selection_ranges"
import * as t_unmarshall_result_to_document_symbols from "liana-authoring/dist/implementation/manual/transformers/unmarshall_result/document_symbols"
import * as t_node_path_to_text from "pareto-resources/dist/implementation/manual/transformers/path/text"
import * as t_parse_tree_to_text from "astn/dist/implementation/manual/transformers/parse_tree/text"
import * as t_deserialize_to_diagnostic from "liana-authoring/dist/implementation/manual/transformers/deserialize/diagnostics"

import * as path from "path"

import * as url from "url"
import { load_document } from './to_be_backend/load_document'
import { schema_cache } from './schema_cache'

import * as vscode_node from 'vscode-languageserver/node'
import * as vscode_textdocument from 'vscode-languageserver-textdocument'
import { Example_Settings } from './types'
import { create_on_completion } from './connection/on_completion'

export async function validate_text_document(text_document: vscode_textdocument.TextDocument): Promise<vscode_node.Diagnostic[]> {
	return new Promise<vscode_node.Diagnostic[]>((resolve) => {
		load_document(
			text_document,
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
	document_settings: Map<string, Thenable<Example_Settings>>,
	documents: vscode_node.TextDocuments<vscode_textdocument.TextDocument>,
) => {

	// The global settings, used when the `workspace/configuration` request is not supported by the client.
	// Please note that this is not the case when using this server with the client provided in this example
	// but could happen with other clients.
	const default_settings: Example_Settings = { max_number_of_problems: 1000 }


	let global_settings: Example_Settings = default_settings

	// Store the notation style preference per document
	const document_notation_styles: Map<string, 'verbose' | 'concise'> = new Map()

	let has_configuration_capability = false
	let has_workspace_folder_capability = false
	let has_diagnostic_related_information_capability = false

	const connection = vscode_node.createConnection(vscode_node.ProposedFeatures.all)


	connection.onInitialize((params: vscode_node.InitializeParams) => {
		// Get notation style from initialization options (for initial document)
		if (params.initializationOptions && params.initializationOptions.notationStyle) {
			// Store as default for documents without specific preference
			document_notation_styles.set('__default__', params.initializationOptions.notationStyle)
		}

		const capabilities = params.capabilities

		// Does the client support the `workspace/configuration` request?
		// If not, we fall back using global settings.
		has_configuration_capability = !!(
			capabilities.workspace && !!capabilities.workspace.configuration
		)
		has_workspace_folder_capability = !!(
			capabilities.workspace && !!capabilities.workspace.workspaceFolders
		)
		has_diagnostic_related_information_capability = !!(
			capabilities.textDocument &&
			capabilities.textDocument.publishDiagnostics &&
			capabilities.textDocument.publishDiagnostics.relatedInformation
		)

		const result: vscode_node.InitializeResult = {
			'capabilities': {
				'textDocumentSync': vscode_node.TextDocumentSyncKind.Incremental,
				// Tell the client that this server supports code completion.
				'completionProvider': {
					'resolveProvider': true,
					'triggerCharacters': [
						'(', //to fill a verbose group
						'<', //to fill a concise group
						'|', //to fill a state
						'`', //to set a keyword or start a property
						'\'', //to set an id or a reference
						':', //to set a property
						//',',
						'#' //to replace missing data
					],

				},
				'diagnosticProvider': {
					'interFileDependencies': false,
					'workspaceDiagnostics': false
				},
				'hoverProvider': true,
				'documentSymbolProvider': true,
				'codeActionProvider': {
					'codeActionKinds': [vscode_node.CodeActionKind.Refactor],
					'resolveProvider': true
				},
				'documentFormattingProvider': true,
				'selectionRangeProvider': true,
			}
		}
		if (has_workspace_folder_capability) {
			result.capabilities.workspace = {
				'workspaceFolders': {
					'supported': true
				}
			}
		}
		return result
	})

	connection.onInitialized(() => {
		if (has_configuration_capability) {
			// Register for all configuration changes.
			connection.client.register(vscode_node.DidChangeConfigurationNotification.type, undefined)
		}
		if (has_workspace_folder_capability) {
			connection.workspace.onDidChangeWorkspaceFolders(_event => {
				connection.console.log('Workspace folder change event received.')
			})
		}
	})


	connection.onDidChangeConfiguration(change => {
		if (has_configuration_capability) {
			// Reset all cached document settings
			document_settings.clear()
		} else {
			global_settings = <Example_Settings>(
				(change.settings.languageServerExample || default_settings)
			)
		}
		// Refresh the diagnostics since the `max_number_of_problems` could have changed.
		// We could optimize things here and re-fetch the setting first can compare it
		// to the existing setting, but this is out of scope for this example.
		connection.languages.diagnostics.refresh()
	})

	// function get_document_settings(resource: string): Thenable<Example_Settings> {
	// 	if (!has_configuration_capability) {
	// 		return Promise.resolve(global_settings)
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
				'kind': vscode_node.DocumentDiagnosticReportKind.Full,
				'items': await validate_text_document(document)
			}
		} else {
			// We don't know the document. We can either try to read it from disk
			// or we don't report problems for it.
			return {
				'kind': vscode_node.DocumentDiagnosticReportKind.Full,
				'items': []
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
				const schema_dir = path.dirname(file_path) // .../project/.liana
				const project_dir = path.dirname(schema_dir) // .../project

				// Re-validate all open documents that use this schema
				const affected_documents: vscode_textdocument.TextDocument[] = []
				documents.all().forEach(doc => {
					const doc_path = url.fileURLToPath(doc.uri)
					// Check if this document is in the project directory or subdirectories
					if (doc_path.startsWith(project_dir + path.sep) || path.dirname(doc_path) === project_dir) {
						affected_documents.push(doc)
					}
				})

				connection.console.log(`Re-validating ${affected_documents.length} document(s) affected by schema change`)

				// Trigger diagnostic refresh for affected documents
				if (affected_documents.length > 0) {
					connection.languages.diagnostics.refresh()
				}
			}
		}
	})

	// Register custom request to update notation style
	connection.onRequest('liana/updateNotationStyle', (params: { uri: string, style: 'verbose' | 'concise' }) => {
		document_notation_styles.set(params.uri, params.style)
		connection.console.log(`Notation style updated for ${params.uri}: ${params.style}`)
	})

	// This handler provides the initial list of the completion items.
	connection.onCompletion(
		create_on_completion(documents, (uri: string) => {
			// Get document-specific style, fall back to default
			return document_notation_styles.get(uri) || document_notation_styles.get('__default__') || 'verbose'
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
		(hover_params, cancellation_token, workdone_progress, result_progress) => {
			// The pass parameter contains the position of the text document in
			// which code complete got requested.

			const doc = documents.get(hover_params.textDocument.uri)
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
									'position': hover_params.position,
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

			const notation_types: Array<[string, 'verbose' | 'concise', boolean]> = [
				['Convert to verbose notation (shallow)', 'verbose', true],
				['Convert to verbose notation (deep)', 'verbose', false],
				['Convert to concise notation (shallow)', 'concise', true],
				['Convert to concise notation (deep)', 'concise', false],
			]

			for (const [action_title, style, shallow] of notation_types) {
				actions.push({
					title: action_title,
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

	function convert_selecton_range($: d_unmarshall_result.Range_Stack): vscode_node.SelectionRange {
		return {
			'range': helpers.create_range_from_range($.range),
			'parent': $.parent.__decide(
				($) => convert_selecton_range($),
				() => undefined
			)
		}
	}

	connection.onSelectionRanges(
		(params) => {

			return new Promise<vscode_node.SelectionRange[]>(
				(resolve) => {
					connection.console.log(`Selection ranges requested at position: ${params.positions.map(p => `${p.line}:${p.character}`).join(', ')}`)
					const doc = documents.get(params.textDocument.uri)
					if (doc === undefined) {
						connection.console.log('Selection ranges: document not found, returning empty array')
						resolve([])
						return
					}
					load_document(
						doc,
						schema_cache,
						($) => {
							connection.console.log('Selection ranges: load_document failed (deserialize error), returning empty array')
							return []
						},
						(instance) => {
							const result = t_unmarshall_result_to_selection_ranges.Document(
								instance,
								{
									'positions': _p.list.literal(params.positions),
								}
							).__get_raw_copy().map(($): vscode_node.SelectionRange => convert_selecton_range($))
							connection.console.log(`Selection ranges: backend returned ${result.length} range(s): ${JSON.stringify(result, null, 2)}`)
							return result
						},
						(final_result) => {
							connection.console.log(`Selection ranges: resolving with ${final_result.length} range(s)`)
							resolve(final_result)
						},
					)
				},
			)
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
						const formatting_result = t_unmarshall_result_to_formatting_edits.Document(
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


						return formatting_result
					},
					($) => {
						if ($ === null) {
							resolve(action)
						} else {

							function indent_replacement_text(
								range: vscode_node.Range,
								document: vscode_textdocument.TextDocument,
								replacement_text: string
							): string {
								// Calculate the base indentation from the start of the range
								const line_text = document.getText(vscode_node.Range.create(
									range.start.line,
									0,
									range.start.line,
									range.start.character
								))
								const base_indent = line_text.match(/^[\t ]*/)?.[0] || ''

								connection.console.log(`Base indentation: "${base_indent}" (${base_indent.length} chars), range starts at column ${range.start.character}`)

								// Apply base indentation to all lines of the replacement text
								const lines = replacement_text.split('\n')
								const indented_text = lines.map((line, index) => {
									// Don't indent empty lines
									if (line.trim() === '') {
										return line
									}
									// If range starts at column 0, add base indentation to ALL lines
									// If range preserves original position, skip first line (already positioned)
									if (index === 0 && range.start.character > 0) {
										return line // First line maintains its position
									}
									// For all other lines, add base indentation
									return base_indent + line
								}).join('\n')

								return indented_text
							}

							action.edit = {
								changes: {
									[uri]: $.__decide(
										($) => [
											vscode_node.TextEdit.replace(
												helpers.create_range_from_range($.range),
												indent_replacement_text(
													helpers.create_range_from_range($.range),
													document,
													$.text
												)
											)
										],
										() => []
									)
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
								const last_line = document.lineCount - 1
								const last_line_length = document.getText(vscode_node.Range.create(last_line, 0, last_line + 1, 0)).length
								return vscode_node.Range.create(
									0,
									0,
									last_line,
									last_line_length
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

	const on_document_symbol: vscode_node.ServerRequestHandler<vscode_node.DocumentSymbolParams, vscode_node.SymbolInformation[] | vscode_node.DocumentSymbol[] | undefined | null, vscode_node.SymbolInformation[] | vscode_node.DocumentSymbol[], void> = (params) => {
		const doc = documents.get(params.textDocument.uri)
		if (doc === undefined) {
			return []
		}

		function convert_value($: d_document_symbols.Value): vscode_node.DocumentSymbol[] {
			return _p.decide.state($.type, ($) => {
				switch ($[0]) {
					case 'primitive': return _p.ss($, ($) => [])
					case 'composite': return _p.ss($, ($) => $.children.__get_raw_copy().map(($): vscode_node.DocumentSymbol => ({
						'name': $.name,
						'detail': $.detail,
						'kind': _p.decide.state($.value.type, ($) => {
							switch ($[0]) {
								case 'primitive': return _p.ss($, ($) => _p.decide.state($.kind, ($) => {
									switch ($[0]) {
										case 'string': return _p.ss($, ($) => vscode_node.SymbolKind.String)
										case 'number': return _p.ss($, ($) => vscode_node.SymbolKind.Number)
										case 'boolean': return _p.ss($, ($) => vscode_node.SymbolKind.Boolean)
										case 'enum': return _p.ss($, ($) => vscode_node.SymbolKind.Enum)
										case 'null': return _p.ss($, ($) => vscode_node.SymbolKind.Null)
										default: return _p.au($[0])
									}
								}))
								case 'composite':return _p.ss($, ($) => _p.decide.state($.kind, ($) => {
									switch ($[0]) {
										case 'object': return _p.ss($, ($) => vscode_node.SymbolKind.Object)
										case 'struct': return _p.ss($, ($) => vscode_node.SymbolKind.Struct)
										case 'array': return _p.ss($, ($) => vscode_node.SymbolKind.Array)
										default: return _p.au($[0])
									}
								}))
								default: return _p.au($[0])
							}
						}),
						'range': helpers.create_range_from_range($.range),
						'selectionRange': helpers.create_range_from_range($['selection range']),
						'children': convert_value($.value)
					})))
					default: return _p.au($[0])
				}
			})
		}

		return new Promise<vscode_node.DocumentSymbol[]>(
			(resolve) => {
				load_document(
					doc,
					schema_cache,
					($) => [],
					(instance) => convert_value(t_unmarshall_result_to_document_symbols.Document(instance)),
					resolve,
				)
			},
		)
	}

	connection.onDocumentSymbol(
		on_document_symbol
	)

	// Make the text document manager listen on the connection
	// for open, change and close text document events
	documents.listen(connection)

	// Listen on the connection
	connection.listen()

	return connection
}