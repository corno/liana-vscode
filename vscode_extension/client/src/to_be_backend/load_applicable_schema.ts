import p_create_refinement_context from 'pareto-core/__internal/sync/create_refinement_context'
import p_list_from_text from 'pareto-core/refiner/specials/list_from_text'
import * as p from 'pareto-core/transformer'
import type * as specification from 'pareto-liana/schemas/temp_type_specifier/schema'
import type * as schema from 'pareto-liana/modules/schema.generated/schemas/resolved/schema'
import { Type_Specifier } from 'pareto-liana/schemas/temp_type_specifier/refiners/list_of_characters'
import { file_type } from 'pareto-liana/schemas/temp_type_specifier/file_type'
import { error_message } from 'pareto-liana/schemas/temp_type_specifier/reader_error'
import { Document as parse_document } from 'pareto-liana/temp/astn_document'
import { document_header, type Document_Header } from 'pareto-liana/schemas/temp_type_specifier/document_header'
import type * as core from 'pareto-core/schema'
import * as parser_error from 'astn-runtime/modules/deserialization/schemas/parse_tree_deserialization/serializers'
import * as fs from 'fs'
import path from 'path'
import type { TextDocument } from 'vscode'

export type Load_Schema_Error = {
    'schema path': string
    'type':
    | ['read file', { error: { message: string } }]
    | ['parse schema', { error: string }]
}

export function load_applicable_schema(
    text_document: TextDocument,
    on_error: ($: Load_Schema_Error) => void,
    on_success: ($: specification.Temp_Type_Specifier, root_type: schema.namespaces.structure.types.Type) => void,
): undefined {
    const find_schema = (directory: string): void => {
        const schema_path = path.join(directory, '.liana', 'schema.slna')
        fs.stat(path.join(directory, '.liana'), (stat_error, marker) => {
            if (stat_error) {
                const parent = path.dirname(directory)
                if (stat_error.code === 'ENOENT' && parent !== directory) {
                    find_schema(parent)
                    return
                }
                on_error({ 'schema path': schema_path, type: ['read file', { error: { message: stat_error.message } }] })
                return
            }
            if (!marker.isDirectory()) {
                on_error({ 'schema path': schema_path, type: ['read file', { error: { message: 'The nearest .liana schema context is not a directory' } }] })
                return
            }
            fs.readFile(schema_path, { encoding: 'utf8' }, (error, data) => {
                if (error) {
                    on_error({ 'schema path': schema_path, type: ['read file', { error: { message: error.message } }] })
                    return
                }
                p_create_refinement_context<{
                    specification: specification.Temp_Type_Specifier,
                    type: schema.namespaces.structure.types.Type,
                }, string>(abort => {
                    const parsed = Type_Specifier(p_list_from_text(data, $ => $), $ => abort(error_message($)), { 'tab size': 4 })
                    const relative = path.relative(directory, text_document.uri.fsPath)
                    const parts = relative.split(path.sep)
                    const file_name = parts.pop()
                    if (file_name === undefined) return abort('Missing file name')
                    const selected = file_type(parsed[1], {
                        directories: p.literal.list(parts), 'file name': file_name,
                    }, abort)
                    return { specification: parsed, type: selected['l entry'] }
                }).__extract_data(
                    $ => { on_success($.specification, $.type); return undefined },
                    error => { on_error({ 'schema path': schema_path, type: ['parse schema', { error }] }); return undefined },
                )
            })
        })
    }
    p_create_refinement_context<core.Optional_Value<Document_Header>, string>(abort => document_header(
        parse_document(
            p_list_from_text(text_document.getText(), $ => $),
            error => abort(parser_error.Error(error)),
            { 'tab size': 1 },
        ),
        error => abort(error_message(error)),
    )).__extract_data(
        header => {
            const embedded = header.__get_raw()
            if (embedded === null) find_schema(path.dirname(text_document.uri.fsPath))
            else p_create_refinement_context<schema.namespaces.structure.types.Type, string>(abort =>
                file_type(embedded[0].specification, embedded[0].path, abort)['l entry'],
            ).__extract_data(
                type => { on_success(['constrained', embedded[0].specification], type); return undefined },
                error => { on_error({ 'schema path': text_document.uri.fsPath, type: ['parse schema', { error }] }); return undefined },
            )
            return undefined
        },
        error => { on_error({ 'schema path': text_document.uri.fsPath, type: ['parse schema', { error }] }); return undefined },
    )
}
