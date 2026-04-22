"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = $;
const convert_to_json_1 = require("liana-authoring/dist/implementation/manual/text_to_text/convert_to_json");
const vscode = require("vscode");
function $() {
    return vscode.commands.registerCommand('liana.convert_to_json', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('Open a Liana file first to save as JSON');
            return;
        }
        try {
            const newText = (0, convert_to_json_1.$$)(editor.document.getText(), () => {
                throw new Error('Safe as JSON failed because the file is not valid ASTN.');
            }, {
                'source': {
                    'document resource identifier': editor.document.uri.toString(),
                    'tab size': 4,
                },
                'target': {
                    'indentation': '\t',
                    'newline': '\n',
                },
            });
            void editor.edit((editBuilder) => {
                editBuilder.replace(new vscode.Range(new vscode.Position(0, 0), editor.document.lineAt(editor.document.lineCount - 1).range.end), newText);
            });
        }
        catch (error) {
            vscode.window.showErrorMessage('Cannot convert to JSON because the file is not valid ASTN.');
        }
    });
}
//# sourceMappingURL=convert_to_json.js.map