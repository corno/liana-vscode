import * as path from 'path'
import * as vscode from 'vscode'
import { writeFile } from 'fs/promises'

import * as types from "../types"
import { load_directory_schema } from '../to_be_backend/load_applicable_schema'
import { file_choices, new_file_name, validate_new_file } from '../helpers/new_file_name'
import type * as specification from 'pareto-liana/schemas/temp_type_specifier/schema'
import type * as core from 'pareto-core/schema'

export default ((deps) => async (uri: vscode.Uri) => {
		try {
			let target_folder: vscode.Uri
			if (uri && uri.fsPath) {
				const stat = await vscode.workspace.fs.stat(uri)
				if (stat.type === vscode.FileType.Directory) {
					target_folder = uri
				} else {
					target_folder = vscode.Uri.file(path.dirname(uri.fsPath))
				}
			} else if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
				target_folder = vscode.workspace.workspaceFolders[0].uri
			} else {
				vscode.window.showErrorMessage('No workspace folder found')
				return
			}

			const context = await new Promise<{ specification: specification.Temp_Type_Specifier, directories: core.List<string> }>((resolve, reject) =>
				load_directory_schema(
					target_folder.fsPath,
					error => reject(new Error(`${error['schema path']}: ${error.type[0] === 'read file' ? error.type[1].error.message : error.type[1].error}`)),
					(specification, directories) => resolve({ specification, directories }),
				),
			)
			const choices = file_choices(context.specification[1], context.directories, message => { throw new Error(message) })
			const choice = choices.length === 1 ? choices[0] : (await vscode.window.showQuickPick(
				choices.map(choice => ({
					label: `${choice.name}${choice.extension === '' ? '' : `.${choice.extension}`}.lna`,
					choice,
				})),
				{ placeHolder: 'Choose the schema file to create' },
			))?.choice
			if (choice === undefined) return

			let final_file_name: string
			if (choice.name !== null) {
				final_file_name = `${choice.name}${choice.extension === '' ? '' : `.${choice.extension}`}.lna`
			} else {
				const file_name = await vscode.window.showInputBox({
					prompt: 'Enter the name for your new Liana file',
					placeHolder: new_file_name('my_file', choice.extension),
					validateInput: (value: string) => {
						try {
							validate_new_file(context.specification[1], context.directories, new_file_name(value, choice.extension))
							return null
						} catch (error) {
							return error instanceof Error ? error.message : String(error)
						}
					},
				})
				if (file_name === undefined) return
				final_file_name = new_file_name(file_name, choice.extension)
			}
			validate_new_file(context.specification[1], context.directories, final_file_name)
			const file_uri = vscode.Uri.file(path.join(target_folder.fsPath, final_file_name))
			await writeFile(file_uri.fsPath, '#', { flag: 'wx' })

			const document = await vscode.workspace.openTextDocument(file_uri)
			await vscode.window.showTextDocument(document)
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error)
			vscode.window.showErrorMessage(`Failed to create Liana file: ${message}`)
		}
}) satisfies types.Register_Command