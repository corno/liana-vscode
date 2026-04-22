"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = $;
const vscode = require("vscode");
const c_generate_typescript = require("pareto-liana/dist/implementation/manual/commands/generate_typescript");
const cx_copy = require("pareto-host-nodejs/dist/commands/copy");
const cx_make_directory = require("pareto-host-nodejs/dist/commands/make_directory");
const cx_remove = require("pareto-host-nodejs/dist/commands/remove");
const cx_write_file = require("pareto-host-nodejs/dist/commands/write_file");
const qx_read_file = require("pareto-host-nodejs/dist/queries/read_file");
const c_write_to_directory = require("pareto-fountain-pen-file-structure/dist/implementation/manual/commands/write_to_directory");
const c_write_to_file = require("pareto-fountain-pen-file-structure/dist/implementation/manual/commands/write_to_file");
const r_path_from_text = require("pareto-resources/dist/implementation/manual/refiners/path/text");
const t_generate_typescript_to_fp = require("pareto-liana/dist/implementation/manual/transformers/generate_typescript/fountain_pen");
const t_prose_to_text = require("pareto-fountain-pen/dist/implementation/manual/transformers/prose/text");
const pareto_unreachable_code_path = require("pareto-core/dist/_p_unreachable_code_path");
function $() {
    return vscode.commands.registerCommand('liana.generate_typescript_code_from_this_schema', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('Open a liana file first to create authoring environment');
            return;
        }
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
        try {
            c_generate_typescript.$$({
                'copy': cx_copy.$$,
                'make directory': cx_make_directory.$$,
                'remove': cx_remove.$$,
                'write to directory': c_write_to_directory.$$({
                    'remove': cx_remove.$$,
                    'write to_file': c_write_to_file.$$({
                        'make directory': cx_make_directory.$$,
                        'write file': cx_write_file.$$
                    }, null)
                }, null)
            }, {
                'read file': qx_read_file.$$,
            }).execute({
                'type': ['module specification', null],
                'source': r_path_from_text.Node_Path(editor.document.uri.fsPath, () => {
                    vscode.window.showInformationMessage('unexpected error: the file path is not valid.');
                    throw new Error('The file path is not valid.');
                }, {
                    'pedantic': true,
                }),
                'target': r_path_from_text.Context_Path(targetUris[0].fsPath)
            }, ($) => $).__start(() => {
                vscode.window.showInformationMessage('code generated');
            }, ($) => {
                const message = t_prose_to_text.Phrase(t_generate_typescript_to_fp.Error($, { 'character location reporting': ['one based', null] }), {
                    'indentation': "  ",
                    'newline': "\n",
                });
                vscode.window.showInformationMessage(`error encountered: ${message}`);
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
        }
    });
}
//# sourceMappingURL=generate_typescript_code_from_this_schema.js.map