import p_create_refinement_context from 'pareto-core/implementation/__internal/sync/create_refinement_context'
import p_list_from_text from 'pareto-core/implementation/refiner/specials/list_from_text'
import p_unreachable from 'pareto-core/implementation/transformer/specials/unreachable_code_path'

import * as s_resolved_document_deserialization from "liana-core/modules/resolved_document_deserialization/schemas/resolved_document_deserialization"
import * as s_temp_module_specifier from "pareto-liana/interface/schemas/temp_module_specifier"

//dependencies
import * as r_temp_module_specifier_from_loc from "pareto-liana/implementation/refiners/temp_module_specifier/list_of_characters"
import * as deser_path from "pareto-filesystem-unrestricted-api/modules/unrestricted/implementation/deserializers/path"

import * as fs from "fs"
import path from 'path'


function get_applicable_schema_path(document_path: string): string {
	//fixme: shoudl be retrieved with the get_schema_path query, but for now we can just assume it's always in the same place
	const schema_path = path.join(path.dirname(document_path), ".liana", "schema.slna")
	return schema_path
}

import { TextDocument } from 'vscode'

export type Load_Schema_Error = {
	'schema path': string
	'type':
	| ['read file', {
		// 'error': NodeJS.ErrnoException
		'error': {
			'message': string
		}
	}]
	| ['parse schema', {
		'error': s_resolved_document_deserialization.Error
	}]
}

export function load_applicable_schema(
	text_document: TextDocument,
	on_error: ($: Load_Schema_Error) => void,
	on_success: (
		$: s_temp_module_specifier.Temp_Module_Specifier,
	) => void,
): undefined {

	const schema_path = get_applicable_schema_path(text_document.uri.fsPath)

	console.log(`Loading schema from ${schema_path}`)

	fs.readFile(
		schema_path,
		{ 'encoding': 'utf-8' },
		(err, data) => {
			if (err) {
				on_error({
					'schema path': schema_path,
					'type': ['read file', {
						// 'error': err,
						'error': {
							'message': err.message
						},
					}]
				})
			} else {
				p_create_refinement_context<s_temp_module_specifier.Temp_Module_Specifier, s_resolved_document_deserialization.Error>(
					(abort) => r_temp_module_specifier_from_loc.Module_Specifier(
						p_list_from_text(data, ($) => $),
						($) => abort($)

					)
				).__extract_data(
					($) => {
						const parsed_schema_path = deser_path.Node_Path(
							schema_path,
							() => p_unreachable("the path is constructed above"),
							{
								'pedantic': true
							}
						)

						on_success(
							$,
						)

					},
					($) => {
						on_error({
							'schema path': schema_path,
							'type': ['parse schema', {
								'error': $
							}],

						})
					}
				)
			}
		}
	)
}
