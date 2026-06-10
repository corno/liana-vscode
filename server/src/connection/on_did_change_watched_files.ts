import * as path from "path"
import * as url from "url"

import * as vscode_node from 'vscode-languageserver/node'
import * as vscode_textdocument from 'vscode-languageserver-textdocument'
import { Connection_Context } from '../connection_context'

export const create_on_did_change_watched_files: (
	connection_context: Connection_Context,
) => vscode_node.NotificationHandler<vscode_node.DidChangeWatchedFilesParams> = (connection_context) => {
	return async (_change) => {
		// Monitored files have change in VSCode
		connection_context.connection.console.log('We received a file change event')

		// Invalidate schema cache for any changed files and re-validate affected documents
		for (const change of _change.changes) {
			const file_path = url.fileURLToPath(change.uri)
			// Check if this is a schema file
			if (file_path.endsWith(path.join('.liana', 'schema.slna'))) {
				connection_context['cache']['schema'].map.delete(file_path)
				connection_context.connection.console.log(`Schema cache invalidated for: ${file_path}`)

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

				connection_context.connection.console.log(`Re-validating ${affected_documents.length} document(s) affected by schema change`)

				// Trigger diagnostic refresh for affected documents
				if (affected_documents.length > 0) {
					connection_context.connection.languages.diagnostics.refresh()
				}
			}
		}
	}
}
