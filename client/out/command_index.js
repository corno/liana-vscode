"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCommands = registerCommands;
const collapse_all_entries_1 = require("./commands/collapse_all_entries");
const convert_to_json_1 = require("./commands/convert_to_json");
const convert_to_json_disabled_1 = require("./commands/convert_to_json_disabled");
const create_liana_file_1 = require("./commands/create_liana_file");
const generate_typescript_code_from_this_schema_1 = require("./commands/generate_typescript_code_from_this_schema");
const initialize_authoring_environment_with_this_schema_1 = require("./commands/initialize_authoring_environment_with_this_schema");
const initialize_liana_authoring_environment_1 = require("./commands/initialize_liana_authoring_environment");
const jump_to_next_missing_data_1 = require("./commands/jump_to_next_missing_data");
const save_as_json_1 = require("./commands/save_as_json");
const save_as_json_disabled_1 = require("./commands/save_as_json_disabled");
const seal_1 = require("./commands/seal");
const seal_disabled_1 = require("./commands/seal_disabled");
const sort_alphabetically_1 = require("./commands/sort_alphabetically");
function registerCommands(context) {
    context.subscriptions.push((0, create_liana_file_1.default)(), (0, save_as_json_1.default)(), (0, sort_alphabetically_1.default)(), (0, convert_to_json_1.default)(), (0, jump_to_next_missing_data_1.default)(), (0, initialize_liana_authoring_environment_1.default)(context), (0, collapse_all_entries_1.default)(), (0, seal_1.default)(), (0, generate_typescript_code_from_this_schema_1.default)(), (0, initialize_authoring_environment_with_this_schema_1.default)(), (0, convert_to_json_disabled_1.default)(), (0, save_as_json_disabled_1.default)(), (0, seal_disabled_1.default)());
}
//# sourceMappingURL=command_index.js.map