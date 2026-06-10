import * as _p from 'pareto-core/dist/assign'

import * as t_unmarshall_result_to_document_links from "liana-authoring/dist/implementation/manual/transformers/unmarshall_result/document_links"

import * as helpers from '../helpers/range'

import { load_document } from '../to_be_backend/load_document'
import { schema_cache } from '../schema_cache'

import * as vscode_node from 'vscode-languageserver/node'
import * as vscode_textdocument from 'vscode-languageserver-textdocument'
import * as path from 'path'
import { pathToFileURL } from 'url'
import { Connection_Context } from '../connection_context'

export const create_on_document_link: (
	connection_context: Connection_Context,
) => vscode_node.ServerRequestHandler<vscode_node.DocumentLinkParams, vscode_node.DocumentLink[] | null, never, void> = (connection_context) => {
	return (link_params, cancellation_token, workdone_progress, result_progress) => {
		const doc = connection_context.documents.get(link_params.textDocument.uri)
		if (doc === undefined) {
			return null
		}

		return new Promise<vscode_node.DocumentLink[]>(
			(resolve) => {
				load_document(
					doc,
					schema_cache,
					($) => [],
					(instance) => {
						// Get the directory of the current document for resolving relative paths
						const doc_uri = doc.uri
						const doc_path = doc_uri.startsWith('file://') ? decodeURIComponent(doc_uri.slice(7)) : doc_uri
						const doc_dir = path.dirname(doc_path)
						
						// TODO: Replace with actual transformer call when available
						return t_unmarshall_result_to_document_links.Document(
						    _p.decide.state(instance, ($) => {
						        switch ($[0]) {
						            case 'constrained': return _p.ss($, ($) => $.unmarshalled)
						            case 'unconstrained': return _p.ss($, ($) => $)
						            default: return _p.au($[0])
						        }
						    }),
						).__get_raw_copy().map(($) => {
							// Resolve the target path (handle both relative and absolute paths)
							const target_path = path.isAbsolute($.target)
								? $.target
								: path.resolve(doc_dir, $.target)
							
							// Convert to file:// URI
							const target_uri = pathToFileURL(target_path).toString()
							
							return {
								'range': helpers.create_range_from_range($.range),
								'target': target_uri,
								'tooltip': $.tooltip.__decide(
									($) => $,
									() => undefined
								)
							}
						})
						
					},
					resolve,
				)
			},
		)
	}
}
