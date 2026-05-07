import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode'

/**
 * Create or update .vscode/settings.json to mark .liana folder as readonly
 */
function configure_workspace_settings(target_path: string): void {
	const vscode_dir = path.join(target_path, '.vscode')
	const settings_file = path.join(vscode_dir, 'settings.json')

	// Create .vscode directory if it doesn't exist
	if (!fs.existsSync(vscode_dir)) {
		fs.mkdirSync(vscode_dir, { recursive: true })
	}

	// Read existing settings or create new object
	let settings: any = {}
	if (fs.existsSync(settings_file)) {
		try {
			const content = fs.readFileSync(settings_file, 'utf8')
			settings = JSON.parse(content)
		} catch (error) {
			console.warn('Could not parse existing settings.json, will create new one')
		}
	}

	// Add readonly configuration for .liana folder
	if (!settings['files.readonlyInclude']) {
		settings['files.readonlyInclude'] = {}
	}
	settings['files.readonlyInclude']['**/.liana/**'] = true

	// Write settings back
	fs.writeFileSync(settings_file, JSON.stringify(settings, null, '\t'), 'utf8')
}

export default function $(context: vscode.ExtensionContext): vscode.Disposable {
	return vscode.commands.registerCommand('liana.initialize_liana_authoring_environment', async () => {
		try {
			const target_uris = await vscode.window.showOpenDialog({
				canSelectFiles: false,
				canSelectFolders: true,
				canSelectMany: false,
				openLabel: 'Select Target Directory',
				title: 'Select directory to initialize Liana authoring environment',
			})

			if (!target_uris || target_uris.length === 0) {
				return
			}

			const target_path = target_uris[0].fsPath
			const template_path = context.asAbsolutePath("liana_authoring_environment_template")

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
					fs.cpSync(source_path, destination_path, { recursive: true })
				} else {
					fs.copyFileSync(source_path, destination_path)
				}
			}

			// Make any .slna files in .liana folder readonly at OS level
			const schema_file_path = path.join(target_path, '.liana', 'schema.slna')
			if (fs.existsSync(schema_file_path)) {
				fs.chmodSync(schema_file_path, 0o444)
			}

			// Configure workspace settings to mark .liana folder as readonly
			configure_workspace_settings(target_path)

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
	})
}