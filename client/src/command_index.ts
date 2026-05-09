import * as vscode from 'vscode'

import collapse_all_entries from './commands/collapse_all_entries'
import convert_to_json from './commands/convert_to_json'
import convert_to_json_disabled from './commands/convert_to_json_disabled'
import create_liana_file from './commands/create_liana_file'
import generate_typescript_code_from_this_schema from './commands/generate_typescript_code_from_this_schema'
import initialize_or_update_authoring_environment_with_this_schema from './commands/initialize_or_update_authoring_environment_with_this_schema'
import initialize_liana_authoring_environment from './commands/initialize_liana_authoring_environment'
import jump_to_next_missing_data from './commands/jump_to_next_missing_data'
import save_as_json from './commands/save_as_json'
import save_as_json_disabled from './commands/save_as_json_disabled'
import seal from './commands/seal'
import seal_disabled from './commands/seal_disabled'
import sort_alphabetically from './commands/sort_alphabetically'
import toggle_notation_style from './commands/toggle_notation_style'

export function register_commands(
	context: vscode.ExtensionContext,
	status_bar_item: vscode.StatusBarItem,
	update_status_bar: (editor?: vscode.TextEditor) => void
): void {
	context.subscriptions.push(
		create_liana_file(),
		save_as_json(),
		vscode.commands.registerCommand('liana.sort_alphabetically', sort_alphabetically()),
		vscode.commands.registerCommand('liana.convert_to_json', convert_to_json),
		jump_to_next_missing_data(),
		initialize_liana_authoring_environment(context),
		collapse_all_entries(),
		seal(),
		generate_typescript_code_from_this_schema(),
		initialize_or_update_authoring_environment_with_this_schema(),
		convert_to_json_disabled(),
		save_as_json_disabled(),
		seal_disabled(),
		toggle_notation_style(context, status_bar_item, update_status_bar),
	)
}