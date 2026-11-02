import * as p_ from "pareto-core/transformer"
import p_create_refinement_context from "pareto-core/__internal/sync/create_refinement_context"

import { seal_artifact } from "../helpers/seal"

import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode'

import { load_applicable_schema } from '../to_be_backend/load_applicable_schema'

import * as types from "../types"

export default ((deps) => () => {
	const editor = vscode.window.activeTextEditor
	if (!editor) {
		vscode.window.showInformationMessage('Open a liana file first to seal')
		return
	}

	load_applicable_schema(
		editor.document,
		($) => {
			p_.from.state($.type).decide(($): null => {
				switch ($[0]) {
					case 'read file': return p_.option($, ($) => {
						vscode.window.showErrorMessage('Cannot seal because no .liana/schema.slna file could be found in an ancestor directory of the Liana file: ' + $.error.message)
						return null
					})
					case 'parse schema': return p_.option($, ($) => {
						vscode.window.showErrorMessage('Cannot seal because the .liana/schema.slna file is not a valid schema: ' + $.error)
						return null
					})
					default: return p_.exhaustive($[0])
				}
			})
		},
		($, root_type, schema_body) => {
			p_create_refinement_context<string, string>(
				(abort) => seal_artifact(
					editor.document.getText(),
					schema_body,
					abort,
					{
						'unmarshall': {
							'type': root_type,
							'tab size': 1, // vscode works with character, not with columns
						},
						'target': {
							'indentation': '',
							'newline': '',
						},
					}
				)
			).__extract_data(
				($) => {
					 vscode.window.showSaveDialog({
						filters: {
							'Sealed Liana': ['slna'],
						},
						defaultUri: vscode.Uri.file(
							path.join(
								path.dirname(editor.document.uri.fsPath),
								`${path.basename(editor.document.uri.fsPath, path.extname(editor.document.uri.fsPath))}.slna`,
							)
						),
						saveLabel: 'Save Sealed File',
					}).then((file_infos) => {
						if (!file_infos) {
							return
						}

						fs.writeFileSync(file_infos.fsPath, $, 'utf8')
						vscode.window.showInformationMessage('File saved as sealed Liana')
					})
				},
				($) => {
					vscode.window.showErrorMessage(`Cannot seal: ${$}`)
				}
			)
		}
	)
}) satisfies types.Register_Command