"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = $;
const vscode = require("vscode");
function $() {
    return vscode.commands.registerCommand('liana.sort_alphabetically', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('Open a Liana file first to sort alphabetically');
            return;
        }
        vscode.window.showErrorMessage('IMPLEMENT ME');
    });
}
//# sourceMappingURL=sort_alphabetically.js.map