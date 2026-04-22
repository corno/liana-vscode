"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = $;
const vscode = require("vscode");
function $() {
    return vscode.commands.registerCommand('liana.convert_to_json_disabled', () => {
        vscode.window.showErrorMessage('Cannot convert to JSON because the file has errors. Fix the errors first.');
    });
}
//# sourceMappingURL=convert_to_json_disabled.js.map