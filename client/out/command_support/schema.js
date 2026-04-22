"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readSchema = readSchema;
const _p_list_from_text_1 = require("pareto-core/dist/_p_list_from_text");
const fs = require("fs");
const path = require("path");
const url = require("url");
function readSchema(documentURI, onError, onSuccess) {
    const schemaPath = path.join(path.dirname(url.fileURLToPath(documentURI)), ".liana", "schema.slna");
    fs.readFile(schemaPath, { 'encoding': 'utf-8' }, (err, data) => {
        if (err) {
            onError({
                'error': err,
                'schema path': schemaPath,
            });
            return;
        }
        onSuccess({
            'schema': {
                'content': (0, _p_list_from_text_1.default)(data, ($) => $),
            },
            'tab size': 1,
        });
    });
}
//# sourceMappingURL=schema.js.map