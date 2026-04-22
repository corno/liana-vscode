"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = $;
const path = require("path");
const vscode = require("vscode");
function $() {
    return vscode.commands.registerCommand('liana.create_liana_file', async (uri) => {
        try {
            let targetFolder;
            if (uri && uri.fsPath) {
                const stat = await vscode.workspace.fs.stat(uri);
                if (stat.type === vscode.FileType.Directory) {
                    targetFolder = uri;
                }
                else {
                    targetFolder = vscode.Uri.file(path.dirname(uri.fsPath));
                }
            }
            else if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
                targetFolder = vscode.workspace.workspaceFolders[0].uri;
            }
            else {
                vscode.window.showErrorMessage('No workspace folder found');
                return;
            }
            const schemaPath = vscode.Uri.file(path.join(targetFolder.fsPath, ".liana", "schema.slna"));
            try {
                await vscode.workspace.fs.stat(schemaPath);
            }
            catch {
                vscode.window.showErrorMessage('This folder does not contain a .liana/schema.slna file. Please select a folder with a .liana/schema.slna file.');
                return;
            }
            const fileName = await vscode.window.showInputBox({
                prompt: 'Enter the name for your new Liana file',
                placeHolder: 'filename.lna',
                validateInput: (value) => {
                    if (!value || value.trim() === '') {
                        return 'Filename cannot be empty';
                    }
                    return null;
                }
            });
            if (!fileName) {
                return;
            }
            let finalFileName = fileName;
            if (!fileName.endsWith('.liana') && !fileName.endsWith('.lna')) {
                finalFileName = `${fileName}.lna`;
            }
            const fileUri = vscode.Uri.file(path.join(targetFolder.fsPath, finalFileName));
            const encoder = new TextEncoder();
            await vscode.workspace.fs.writeFile(fileUri, encoder.encode('#'));
            const document = await vscode.workspace.openTextDocument(fileUri);
            await vscode.window.showTextDocument(document);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            vscode.window.showErrorMessage(`Failed to create Liana file: ${message}`);
        }
    });
}
//# sourceMappingURL=create_liana_file.js.map