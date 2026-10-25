import * as vscode from 'vscode'

export type Command_Dependencies = {
	context: vscode.ExtensionContext
	status_bar_item: vscode.StatusBarItem
	update_status_bar: (editor?: vscode.TextEditor) => void
	trigger_missing_data_completion: (editor: vscode.TextEditor, opposite_style: boolean) => Thenable<unknown>
}

export type Register_Command = (deps?: Command_Dependencies) => (...args: any[]) => any