import { show_error_message } from './error_report'
import * as vscode from 'vscode'
import create_refinement_context from 'pareto-core/__internal/sync/create_refinement_context'
import list_from_text from 'pareto-core/refiner/specials/list_from_text'
import { Document } from 'pareto-liana/temp/astn_document'
import { validate_schema_signature } from 'pareto-liana/schemas/temp_type_specifier/schema_signature'

export const is_authoring_schema = (text: string): boolean => {
    let matches = false
    create_refinement_context<boolean, null>(abort => {
        const document = Document(list_from_text(text, $ => $), () => abort(null), { 'tab size': 1 })
        validate_schema_signature(document.header, () => abort(null))
        return true
    }).__extract_data(value => { matches = value; return undefined }, () => undefined)
    return matches
}

export const schema_command_document = async (operation: string, uri?: vscode.Uri): Promise<vscode.TextDocument | undefined> => {
    const document = uri === undefined
        ? vscode.window.activeTextEditor?.document
        : await vscode.workspace.openTextDocument(uri)
    if (document === undefined || !is_authoring_schema(document.getText())) {
        show_error_message(`Cannot ${operation}: this document must declare the current Liana Authoring Specification schema-signature.`)
        return undefined
    }
    if (vscode.languages.getDiagnostics(document.uri).some(diagnostic => diagnostic.severity === vscode.DiagnosticSeverity.Error)) {
        show_error_message(`Cannot ${operation} because the document has errors. Fix them first.`)
        return undefined
    }
    return document
}

export const register_schema_command_context = (context: vscode.ExtensionContext): void => {
    const update = () => {
        const schemas = vscode.workspace.textDocuments.filter(document => is_authoring_schema(document.getText()))
        const active = vscode.window.activeTextEditor?.document
        void vscode.commands.executeCommand('setContext', 'liana.is_authoring_schema',
            active !== undefined && schemas.includes(active))
        void vscode.commands.executeCommand('setContext', 'liana.authoring_schema_resources',
            schemas.map(document => document.uri.toString()))
        void vscode.commands.executeCommand('setContext', 'liana.valid_authoring_schema_resources',
            schemas.filter(document => !vscode.languages.getDiagnostics(document.uri).some(
                diagnostic => diagnostic.severity === vscode.DiagnosticSeverity.Error,
            )).map(document => document.uri.toString()))
    }
    context.subscriptions.push(
        vscode.window.onDidChangeActiveTextEditor(update),
        vscode.workspace.onDidOpenTextDocument(update),
        vscode.workspace.onDidCloseTextDocument(update),
        vscode.workspace.onDidChangeTextDocument(update),
        vscode.languages.onDidChangeDiagnostics(update),
    )
    update()
}
