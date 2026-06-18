import * as p_ from 'pareto-core/dist/implementation/transformer'
import p_create_refinement_context from 'pareto-core/dist/implementation/__internal/sync/create_refinement_context'

import { $$ as ttt_seal } from 'liana-authoring/dist/implementation/manual/text_to_text/seal'

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
					case 'read file': return p_.ss($, ($) => {
						vscode.window.showErrorMessage('Cannot seal because no .liana/schema.slna file could be found in the same directory as the liana file: ' + $.error.message)
						return null
					})
					case 'parse schema': return p_.ss($, ($) => {
						vscode.window.showErrorMessage('Cannot seal because the .liana/schema.slna file is not a valid schema.')
						return null
					})
					default: return p_.au($[0])
				}
			})
		},
		($) => {
			p_create_refinement_context<string, string>(
				(abort) => ttt_seal(
					editor.document.getText(),
					($) => abort("Sealing failed because the file is not valid Liana."),
					{
						'unmarshall': {
							'module': p_.from.state($).decide(($) => {
								switch ($[0]) {
									case 'constrained': return p_.ss($, ($) => $['module resolver'].entry.signature.module)
									case 'unconstrained': return p_.ss($, ($) => $.module.entry)
									default: return p_.au($[0])
								}
							}),
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
					vscode.window.showErrorMessage('Cannot seal because the file is not valid Liana.')
				}
			)
		}
	)
}) satisfies types.Register_Command