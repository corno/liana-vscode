import * as path from "path"
import * as url from "url"

import * as vscode_node from 'vscode-languageserver/node'
import * as vscode_textdocument from 'vscode-languageserver-textdocument'
import { Connection_Context } from '../connection_context'

import p_unreachable_code_path from "pareto-core/transformer/specials/unreachable_code_path"
import * as deser_path from "pareto-filesystem-unrestricted-api/modules/unrestricted/schemas/path/deserializers"
import * as ser_path from "pareto-filesystem-unrestricted-api/modules/unrestricted/schemas/path/serializers"

export const create_on_did_change_watched_files: (
	connection_context: Connection_Context,
) => vscode_node.NotificationHandler<vscode_node.DidChangeWatchedFilesParams> = (connection_context) => {
	return (_change) => {
		// Monitored files have change in VSCode
		connection_context.connection.console.log('We received a file change event')

		// Invalidate schema cache for any changed files and re-validate affected documents
		for (const change of _change.changes) {
			const file_path = url.fileURLToPath(change.uri)
			// Check if this is a schema file
			if (file_path.endsWith(path.join('.liana', 'schema.slna'))
				|| file_path.endsWith(path.join('.liana', 'schema.native.slna'))) {
				// The schemas cache is keyed by the same serialized Node_Path format used
				// for document paths in load_document.ts, not by this raw fs path string,
				// so round-trip it through the same (de)serializer pair to get a matching key.
				const cache_key = ser_path.Node_Path(
					deser_path.Node_Path(
						path.join(path.dirname(file_path), 'schema.slna'),
						() => p_unreachable_code_path("unexpected schema file path: " + file_path),
						{ 'pedantic': false }
					)
				)
				connection_context['cache']['schemas'].map.delete(cache_key)
				connection_context.connection.console.log(`Schema cache invalidated for: ${file_path} (${cache_key})`)

				// Find the directory that contains the .liana folder
				// Schema path is like: /path/to/project/.liana/schema.slna
				// We want to re-validate all .liana files in /path/to/project/
				const schema_dir = path.dirname(file_path) // .../project/.liana
				const project_dir = path.dirname(schema_dir) // .../project

				// Re-validate all open documents that use this schema
				const affected_documents: vscode_textdocument.TextDocument[] = []
				connection_context.documents.all().forEach(doc => {
					const doc_path = url.fileURLToPath(doc.uri)
					// Check if this document is in the project directory or subdirectories
					if (doc_path.startsWith(project_dir + path.sep) || path.dirname(doc_path) === project_dir) {
						affected_documents.push(doc)
					}
				})

				connection_context.connection.console.log(`Re-validating ${affected_documents.length} document(s) affected by schema change:`)


				// Invalidate document cache for affected documents so they are re-evaluated
				// against the new schema (cache key is uri@version, so same version with
				// different schema would otherwise return the old cached result)
				for (const doc of affected_documents) {
					connection_context.connection.console.log(`-${doc.uri}`)

					for (const key of connection_context['cache']['documents'].map.keys()) {
						if (key.startsWith(doc.uri + '@')) {
							connection_context['cache']['documents'].map.delete(key)
						}
					}
				}

				// Trigger diagnostic refresh for affected documents
				if (affected_documents.length > 0) {
					connection_context.connection.languages.diagnostics.refresh()
				}
			}
		}
	}
}
