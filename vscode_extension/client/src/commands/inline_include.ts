import * as vscode from 'vscode'
import type * as types from '../types'

type Inline_Include_Parameters = {
  sourceUri: string
  sourceVersion: number
  targetUri: string
  range: vscode.Range
  targetRange: vscode.Range
  targetText: string
  nestedIncludes: { range: vscode.Range, path: string }[]
}

export default ((_deps) => async (parameters: Inline_Include_Parameters) => {
  try {
    const source_uri = vscode.Uri.parse(parameters.sourceUri)
    const target_uri = vscode.Uri.parse(parameters.targetUri)
    const source_document = await vscode.workspace.openTextDocument(source_uri)
    if (source_document.version !== parameters.sourceVersion) {
      throw new Error('The source document changed. Request the refactor again.')
    }
    const target_document = await vscode.workspace.openTextDocument(target_uri)
    const target_version = target_document.version
    let included_text = target_document.getText(parameters.targetRange)
    if (included_text !== parameters.targetText) {
      throw new Error('The included file changed. Request the refactor again.')
    }
    const root_start = target_document.offsetAt(parameters.targetRange.start)
    const nested_edits = parameters.nestedIncludes.map(nested => ({
      start: target_document.offsetAt(nested.range.start) - root_start,
      end: target_document.offsetAt(nested.range.end) - root_start,
      text: `@ ${JSON.stringify(nested.path)}`,
    })).sort((left, right) => right.start - left.start)
    for (const nested of nested_edits) {
      if (nested.start < 0 || nested.end > included_text.length || nested.start > nested.end) {
        throw new Error('A nested include range is outside the included value')
      }
      included_text = included_text.slice(0, nested.start) + nested.text + included_text.slice(nested.end)
    }
    if (included_text.trim() === '') throw new Error('The included root value is empty')

    const edit = new vscode.WorkspaceEdit()
    edit.replace(source_uri, parameters.range, included_text)
    if (!await vscode.workspace.applyEdit(edit)) throw new Error('VS Code could not apply the inline edit')

    const choice = await vscode.window.showInformationMessage(
      `The include was inlined. Delete ${target_uri.fsPath}? This may break other includes that still use it.`,
      'Yes',
      'No',
    )
    if (choice !== 'Yes') return
    if (target_document.version !== target_version) {
      vscode.window.showWarningMessage('The included file changed after it was inlined, so it was not deleted.')
      return
    }
    if (target_document.isDirty && !await target_document.save()) {
      vscode.window.showWarningMessage('The included file was not deleted because its pending changes could not be saved.')
      return
    }
    await vscode.workspace.fs.delete(target_uri)
  } catch (error) {
    vscode.window.showErrorMessage(`Failed to inline include: ${error instanceof Error ? error.message : String(error)}`)
  }
}) satisfies types.Register_Command
