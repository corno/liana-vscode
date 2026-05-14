import * as vscode from 'vscode'

export type Command_Dependencies = {
	context: vscode.ExtensionContext
	status_bar_item: vscode.StatusBarItem
	update_status_bar: (editor?: vscode.TextEditor) => void
}

export type Register_Command = (deps?: Command_Dependencies) => () => void