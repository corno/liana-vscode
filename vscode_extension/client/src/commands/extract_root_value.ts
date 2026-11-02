import * as path from 'node:path'
import * as vscode from 'vscode'
import type * as specification from 'pareto-liana/schemas/temp_type_specifier/schema'
import * as types from '../types'
import { load_directory_schema } from '../to_be_backend/load_applicable_schema'
import { extract_target_suggestion, validate_extract_target, type Extract_Target } from '../helpers/extract_target'

type Export_Parameters = {
  sourceUri: string
  sourceVersion: number
  range: vscode.Range
  rootType: string
  candidates: Extract_Target[]
}

type Schema_Context = {
  specification: specification.Temp_Type_Specifier
  schemaPath: string
}

const load_schema = (directory: string): Promise<Schema_Context> => new Promise((resolve, reject) =>
  load_directory_schema(
    directory,
    error => reject(new Error(`${error['schema path']}: ${error.type[0] === 'read file' ? error.type[1].error.message : error.type[1].error}`)),
    (specification, _directories, schemaPath) => resolve({ specification, schemaPath }),
  ),
)

export default ((_deps) => async (parameters: Export_Parameters) => {
  try {
    const source_uri = vscode.Uri.parse(parameters.sourceUri)
    const source_document = await vscode.workspace.openTextDocument(source_uri)
    if (source_document.version !== parameters.sourceVersion) {
      throw new Error('The source document changed. Request the refactor again.')
    }
    const source_directory = path.dirname(source_uri.fsPath)
    const schema = await load_schema(source_directory)
    const schema_root = path.dirname(path.dirname(schema.schemaPath))
    const suggestions = [...new Set(parameters.candidates.map(candidate =>
      extract_target_suggestion(source_directory, schema_root, candidate),
    ))]
    const available_suggestions: string[] = []
    for (const candidate of suggestions) {
      try {
        await vscode.workspace.fs.stat(vscode.Uri.file(path.resolve(source_directory, candidate)))
      } catch (error) {
        if (error instanceof vscode.FileSystemError && error.code === 'FileNotFound') {
          available_suggestions.push(candidate)
          continue
        }
        throw error
      }
    }
    if (available_suggestions.length === 0 && !parameters.candidates.some(candidate => candidate.name === null)) {
      vscode.window.showInformationMessage('No unused Authoring Specification location is available for this root type.')
      return
    }
    const picked = await vscode.window.showQuickPick([
      ...available_suggestions.map(value => ({ label: value, value })),
      { label: 'Enter a custom path…', value: null },
    ], { placeHolder: 'Choose an Authoring Specification location for this root value' })
    if (picked === undefined) return

    let target_value = picked.value ?? undefined
    if (target_value === undefined) {
      const entered_path = await vscode.window.showInputBox({
        prompt: 'Enter a path relative to the current file',
        placeHolder: available_suggestions[0] ?? suggestions[0] ?? 'path/to/file.lna',
        validateInput: async value => {
          try {
            const target_path = validate_extract_target(
              schema.specification[1], schema_root, source_directory, value,
              parameters.rootType, parameters.candidates,
            )
            try {
              await vscode.workspace.fs.stat(vscode.Uri.file(target_path))
              return 'A file already exists at this location'
            } catch (error) {
              if (error instanceof vscode.FileSystemError && error.code === 'FileNotFound') return null
              throw error
            }
          } catch (error) {
            return error instanceof Error ? error.message : String(error)
          }
        },
      })
      if (entered_path === undefined) return
      target_value = entered_path
    }

    const target_path = validate_extract_target(
      schema.specification[1], schema_root, source_directory, target_value,
      parameters.rootType, parameters.candidates,
    )
    if (source_document.version !== parameters.sourceVersion) {
      throw new Error('The source document changed. Request the refactor again.')
    }
    const target_uri = vscode.Uri.file(target_path)
    try {
      await vscode.workspace.fs.stat(target_uri)
      throw new Error('A file already exists at this location')
    } catch (error) {
      if (!(error instanceof vscode.FileSystemError && error.code === 'FileNotFound')) throw error
    }

    const extracted_text = source_document.getText(parameters.range)
    if (extracted_text.trim() === '') throw new Error('The selected root value is empty')
    await vscode.workspace.fs.createDirectory(vscode.Uri.file(path.dirname(target_path)))
    const include_path = path.relative(source_directory, target_path).split(path.sep).join('/')
    const edit = new vscode.WorkspaceEdit()
    edit.createFile(target_uri, { overwrite: false, ignoreIfExists: false })
    edit.insert(target_uri, new vscode.Position(0, 0), extracted_text)
    edit.replace(source_uri, parameters.range, `@ ${JSON.stringify(include_path)}`)
    if (!await vscode.workspace.applyEdit(edit)) throw new Error('VS Code could not apply the export edit')
  } catch (error) {
    vscode.window.showErrorMessage(`Failed to extract root value: ${error instanceof Error ? error.message : String(error)}`)
  }
}) satisfies types.Register_Command
