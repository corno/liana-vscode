import create_refinement_context from 'pareto-core/dist/__internals/async/create_refinement_context'
import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'
import _p_unreachable from 'pareto-core/dist/_p_unreachable_code_path'

import * as d_deserialize_resolved from "liana-core/dist/interface/to_be_generated/deserialize_resolved"
import * as d_unmarshall_result_from_lines_of_characters from "liana-authoring/dist/interface/to_be_generated/unmarshall_result_from_loc"
import * as d_path from "pareto-resources/dist/interface/generated/liana/schemas/path/data"
import * as d_temp_module_specifier from "pareto-liana/dist/interface/to_be_generated/temp_module_specifier"
import * as d_deserialize from "liana-authoring/dist/interface/to_be_generated/deserialize"

//dependencies
import * as r_temp_module_specifier_from_loc from "pareto-liana/dist/implementation/manual/refiners/temp_module_specifier/list_of_characters"
import * as r_path_from_text from "pareto-resources/dist/implementation/manual/refiners/path/text"

import * as fs from "fs"
import * as path from "path"
import get_applicable_schema_path from './get_applicable_schema_path'
import { TextDocument } from 'vscode'

export type Load_Schema_Error = {
	'schema path': string
	'type':
	| ['read file', {
		'error': NodeJS.ErrnoException
	}]
	| ['parse schema', {
		'error': d_deserialize_resolved.Error
	}]
}

export function load_applicable_schema(
	text_document: TextDocument,
	on_error: ($: Load_Schema_Error) => void,
	on_success: (
		$: d_temp_module_specifier.Temp_Module_Specifier,
	) => void,
): void {

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
						'error': err,
					}]
				})
			} else {
				create_refinement_context<d_temp_module_specifier.Temp_Module_Specifier, d_deserialize_resolved.Error>(
					(abort) => r_temp_module_specifier_from_loc.Module_Specifier(
						_p_list_from_text(data, ($) => $),
						($) => abort($)

					)
				).__extract_data(
					($) => {
						const parsed_schema_path = r_path_from_text.Node_Path(
							schema_path,
							() => _p_unreachable("the path is constructed above"),
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
