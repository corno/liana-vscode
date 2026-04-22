"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = $;
const seal_1 = require("liana-authoring/dist/implementation/manual/text_to_text/seal");
const fs = require("fs");
const path = require("path");
const vscode = require("vscode");
const pareto_unreachable_code_path = require("pareto-core/dist/_p_unreachable_code_path");
const schema_1 = require("../command_support/schema");
function $() {
    return vscode.commands.registerCommand('liana.initialize_authoring_environment_with_this_schema', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('Open a liana file first to create authoring environment');
            return;
        }
        try {
            (0, schema_1.readSchema)(editor.document.uri.toString(), () => {
                vscode.window.showErrorMessage('Cannot seal because no .liana/schema.slna file could be found in the same directory as the liana file.');
            }, async ($) => {
                const newText = (0, seal_1.$$)(editor.document.getText(), () => {
                    throw new Error('Cannot seal because the file is not valid Liana.');
                }, {
                    'unmarshall': $,
                    'target': {
                        'indentation': '\t',
                        'newline': '\n',
                    },
                });
                const targetUris = await vscode.window.showOpenDialog({
                    canSelectFiles: false,
                    canSelectFolders: true,
                    canSelectMany: false,
                    openLabel: 'Select Directory',
                    title: 'Select directory to save .liana/schema.slna file',
                });
                if (!targetUris || targetUris.length === 0) {
                    return;
                }
                const targetPath = targetUris[0].fsPath;
                const schemaFilePath = path.join(targetPath, ".liana", "schema.slna");
                const schemaDir = path.dirname(schemaFilePath);
                fs.mkdirSync(schemaDir, { recursive: true });
                fs.writeFileSync(schemaFilePath, newText, 'utf8');
                vscode.window.showInformationMessage(`authoring environment created: ${targetPath}`);
                const openChoice = await vscode.window.showInformationMessage('Would you like to open the initialized authoring environment?', 'Yes', 'No');
                if (openChoice === 'Yes') {
                    const uri = vscode.Uri.file(targetPath);
                    await vscode.commands.executeCommand('vscode.openFolder', uri, true);
                }
            });
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error generating TypeScript code:', error.message);
            }
            else if (error instanceof pareto_unreachable_code_path.Unreachable_Code_Path_Error) {
                console.error('Unreachable code path reached:', error.message);
            }
            else {
                console.error('Unexpected error:', error);
            }
            const message = error instanceof Error ? error.message : String(error);
            vscode.window.showErrorMessage(`Cannot create schema: ${message}`);
        }
    });
}
//# sourceMappingURL=initialize_authoring_environment_with_this_schema.js.map