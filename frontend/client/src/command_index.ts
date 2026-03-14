import * as vscode from 'vscode'

import { registerCollapseAllEntriesCommand } from './commands/collapse_all_entries'
import { registerConvertToJsonCommand } from './commands/convert_to_json'
import { registerConvertToJsonDisabledCommand } from './commands/convert_to_json_disabled'
import { registerCreateLianaFileCommand } from './commands/create_liana_file'
import { registerInitializeAuthoringEnvironmentWithThisSchemaCommand } from './commands/initialize_authoring_environment_with_this_schema'
import { registerInitializeLianaAuthoringEnvironmentCommand } from './commands/initialize_liana_authoring_environment'
import { registerJumpToNextMissingDataCommand } from './commands/jump_to_next_missing_data'
import { registerSaveAsJsonCommand } from './commands/save_as_json'
import { registerSaveAsJsonDisabledCommand } from './commands/save_as_json_disabled'
import { registerSealCommand } from './commands/seal'
import { registerSealDisabledCommand } from './commands/seal_disabled'
import { registerSortAlphabeticallyCommand } from './commands/sort_alphabetically'

export function registerCommands(context: vscode.ExtensionContext): void {
	context.subscriptions.push(
		registerCreateLianaFileCommand(),
		registerSaveAsJsonCommand(),
		registerSortAlphabeticallyCommand(),
		registerConvertToJsonCommand(),
		registerJumpToNextMissingDataCommand(),
		registerInitializeLianaAuthoringEnvironmentCommand(context),
		registerCollapseAllEntriesCommand(),
		registerSealCommand(),
		registerInitializeAuthoringEnvironmentWithThisSchemaCommand(),
		registerConvertToJsonDisabledCommand(),
		registerSaveAsJsonDisabledCommand(),
		registerSealDisabledCommand(),
	)
}