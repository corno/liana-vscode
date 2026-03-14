import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode'

export default function $(context: vscode.ExtensionContext): vscode.Disposable {
	return vscode.commands.registerCommand('liana.initialize_liana_authoring_environment', async () => {
		try {
			const targetUris = await vscode.window.showOpenDialog({
				canSelectFiles: false,
				canSelectFolders: true,
				canSelectMany: false,
				openLabel: 'Select Target Directory',
				title: 'Select directory to initialize Liana authoring environment',
			});

			if (!targetUris || targetUris.length === 0) {
				return;
			}

			const targetPath = targetUris[0].fsPath;
			const templatePath = context.asAbsolutePath('liana_authoring_environment_template');

			if (!fs.existsSync(templatePath)) {
				vscode.window.showErrorMessage('Liana authoring environment template not found in extension.');
				console.error('Template not found at:', templatePath);
				return;
			}

			const existingFiles = fs.readdirSync(targetPath);
			if (existingFiles.length > 0) {
				const overwrite = await vscode.window.showWarningMessage(
					'Target directory is not empty. Copy template files anyway?',
					'Yes', 'No'
				);
				if (overwrite !== 'Yes') {
					return;
				}
			}

			const entries = fs.readdirSync(templatePath, { withFileTypes: true });
			for (const entry of entries) {
				const sourcePath = path.join(templatePath, entry.name);
				const destinationPath = path.join(targetPath, entry.name);

				if (entry.isDirectory()) {
					fs.cpSync(sourcePath, destinationPath, { recursive: true });
				} else {
					fs.copyFileSync(sourcePath, destinationPath);
				}
			}

			vscode.window.showInformationMessage(`Authoring environment initialized successfully in: ${targetPath}`);

			const openChoice = await vscode.window.showInformationMessage(
				'Would you like to open the initialized authoring environment?',
				'Yes', 'No'
			);

			if (openChoice === 'Yes') {
				const uri = vscode.Uri.file(targetPath);
				await vscode.commands.executeCommand('vscode.openFolder', uri, true);
			}
		} catch (error) {
			console.error('Error initializing authoring environment:', error);
			const message = error instanceof Error ? error.message : String(error);
			vscode.window.showErrorMessage(`Failed to initialize authoring environment: ${message}`);
		}
	})
}