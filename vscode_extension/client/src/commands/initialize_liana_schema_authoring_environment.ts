import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode'

import * as types from "../types"

export default ((deps) => async () => {
		try {
			// Get last selected directory
			const last_directory = deps!.context.workspaceState.get<string>('liana.last_authoring_environment_directory')
			const default_uri = last_directory ? vscode.Uri.file(last_directory) : undefined
			
			const target_uris = await vscode.window.showOpenDialog({
				canSelectFiles: false,
				canSelectFolders: true,
				canSelectMany: false,
				openLabel: 'Select Target Directory',
				title: 'Select directory to initialize Liana authoring environment',
				defaultUri: default_uri,
			})

			if (!target_uris || target_uris.length === 0) {
				return
			}

			const target_path = target_uris[0].fsPath
			
			// Store the selected directory for next time
			deps!.context.workspaceState.update('liana.last_authoring_environment_directory', target_path)
			
			const template_path = deps!.context.asAbsolutePath("liana_authoring_environment_template")

			if (!fs.existsSync(template_path)) {
				vscode.window.showErrorMessage('Liana authoring environment template not found in extension.')
				console.error('Template not found at:', template_path)
				return
			}

			const existing_files = fs.readdirSync(target_path)
			if (existing_files.length > 0) {
				const overwrite = await vscode.window.showWarningMessage(
					'Target directory is not empty. Copy template files anyway?',
					'Yes', 'No'
				)
				if (overwrite !== 'Yes') {
					return
				}
			}

			const entries = fs.readdirSync(template_path, { withFileTypes: true })
			for (const entry of entries) {
				const source_path = path.join(template_path, entry.name)
				const destination_path = path.join(target_path, entry.name)

				if (entry.isDirectory()) {
					fs.cpSync(source_path, destination_path, { recursive: true, force: true })
				} else {
					fs.copyFileSync(source_path, destination_path)
				}
			}

			// Make any .slna files in .liana folder readonly at OS level
			const schema_file_path = path.join(target_path, '.liana', 'schema.slna')
			if (fs.existsSync(schema_file_path)) {
				// Ensure it's writable first, then make it readonly
				fs.chmodSync(schema_file_path, 0o644)
				fs.chmodSync(schema_file_path, 0o444)
			}

			vscode.window.showInformationMessage(`Authoring environment initialized successfully in: ${target_path}`)

			const open_choice = await vscode.window.showInformationMessage(
				'Would you like to open the initialized authoring environment?',
				'Yes', 'No'
			)

			if (open_choice === 'Yes') {
				const uri = vscode.Uri.file(target_path)
				await vscode.commands.executeCommand('vscode.openFolder', uri, true)
			}
		} catch (error) {
			console.error('Error initializing authoring environment:', error)
			const message = error instanceof Error ? error.message : String(error)
			vscode.window.showErrorMessage(`Failed to initialize authoring environment: ${message}`)
		}
}) satisfies types.Register_Command