"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = $;
const seal_1 = require("liana-authoring/dist/implementation/manual/text_to_text/seal");
const fs = require("fs");
const path = require("path");
const vscode = require("vscode");
const schema_1 = require("../command_support/schema");
function $() {
    return vscode.commands.registerCommand('liana.seal', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('Open a liana file first to seal');
            return;
        }
        try {
            (0, schema_1.readSchema)(editor.document.uri.toString(), () => {
                vscode.window.showErrorMessage('Cannot seal because no .liana/schema.slna file could be found in the same directory as the liana file.');
            }, ($) => {
                const newText = (0, seal_1.$$)(editor.document.getText(), () => {
                    throw new Error('Sealing failed because the file is not valid Liana.');
                }, {
                    'unmarshall': $,
                    'target': {
                        'indentation': '',
                        'newline': '',
                    },
                });
                void vscode.window.showSaveDialog({
                    filters: {
                        'Sealed Liana': ['slna'],
                    },
                    defaultUri: vscode.Uri.file(path.join(path.dirname(editor.document.uri.fsPath), `${path.basename(editor.document.uri.fsPath, path.extname(editor.document.uri.fsPath))}.slna`)),
                    saveLabel: 'Save Sealed File',
                }).then((fileInfos) => {
                    if (!fileInfos) {
                        return;
                    }
                    fs.writeFileSync(fileInfos.fsPath, newText, 'utf8');
                    vscode.window.showInformationMessage('File saved as sealed Liana');
                });
            });
        }
        catch (error) {
            vscode.window.showErrorMessage('Cannot seal because the file is not valid Liana.');
        }
    });
}
//# sourceMappingURL=seal.js.map