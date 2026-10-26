import * as vscode from 'vscode'

import collapse_all_entries from './commands/collapse_all_entries'
import convert_to_json from './commands/convert_to_json'
import convert_to_json_disabled from './commands/convert_to_json_disabled'
import create_liana_file from './commands/create_liana_file'
import publish_schema_to_authoring_environment from './commands/publish_schema_to_authoring_environment'
import initialize_liana_schema_authoring_environment from './commands/initialize_liana_schema_authoring_environment'
import jump_to_next_missing_data from './commands/jump_to_next_missing_data'
import save_as_json from './commands/save_as_json'
import save_as_json_disabled from './commands/save_as_json_disabled'
import seal from './commands/seal'
import seal_disabled from './commands/seal_disabled'
import sort_alphabetically from './commands/sort_alphabetically'
import toggle_notation_style from './commands/toggle_notation_style'

import * as types from './types'

export function register_commands(deps: types.Command_Dependencies): void {
	deps.context.subscriptions.push(
		vscode.commands.registerCommand('liana.collapse_all_entries', collapse_all_entries(deps)),
		vscode.commands.registerCommand('liana.convert_to_json_disabled', convert_to_json_disabled(deps)),
		vscode.commands.registerCommand('liana.convert_to_json', convert_to_json(deps)),
		vscode.commands.registerCommand('liana.create_liana_file', create_liana_file(deps)),
		vscode.commands.registerCommand('liana.initialize_liana_schema_authoring_environment', initialize_liana_schema_authoring_environment(deps)),
		vscode.commands.registerCommand('liana.publish_schema_to_authoring_environment', publish_schema_to_authoring_environment(deps)),
		vscode.commands.registerCommand('liana.jump_to_next_missing_data', jump_to_next_missing_data(deps)),
		vscode.commands.registerCommand('liana.jump_to_next_missing_data_opposite_style', jump_to_next_missing_data(deps, true)),
		vscode.commands.registerCommand('liana.save_as_json_disabled', save_as_json_disabled(deps)),
		vscode.commands.registerCommand('liana.save_as_json', save_as_json(deps)),
		vscode.commands.registerCommand('liana.seal_disabled', seal_disabled(deps)),
		vscode.commands.registerCommand('liana.seal', seal(deps)),
		vscode.commands.registerCommand('liana.sort_alphabetically', sort_alphabetically(deps)),
		vscode.commands.registerCommand('liana.toggle_notation_style', toggle_notation_style(deps)),
	)
}