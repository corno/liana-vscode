"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = $;
const vscode = require("vscode");
function $() {
    return vscode.commands.registerCommand('liana.save_as_json_disabled', () => {
        vscode.window.showErrorMessage('Cannot save as JSON because the file has errors. Fix the errors first.');
    });
}
//# sourceMappingURL=save_as_json_disabled.js.map