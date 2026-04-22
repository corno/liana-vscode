"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = $;
const vscode = require("vscode");
function $() {
    return vscode.commands.registerCommand('liana.seal_disabled', () => {
        vscode.window.showErrorMessage('Cannot seal because the file has errors. Fix the errors first.');
    });
}
//# sourceMappingURL=seal_disabled.js.map