import create_refinement_context from 'pareto-core/dist/__internals/async/create_refinement_context'
import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'
import _p_unreachable from 'pareto-core/dist/_p_unreachable_code_path'

import * as d_deserialize_resolved from "liana-core/dist/interface/to_be_generated/deserialize_resolved"
import * as d_unmarshall_result_from_lines_of_characters from "liana-authoring/dist/interface/to_be_generated/unmarshall_result_from_loc"
import * as d_path from "pareto-resources/dist/interface/generated/liana/schemas/path/data"
import * as d_temp_module_specifier from "pareto-liana/dist/interface/to_be_generated/temp_module_specifier"
import * as d_read_file from "pareto-resources/dist/interface/generated/liana/schemas/read_file/data"

//dependencies
import * as r_temp_module_specifier_from_loc from "pareto-liana/dist/implementation/manual/refiners/temp_module_specifier/list_of_characters"
import * as r_path_from_text from "pareto-resources/dist/implementation/manual/refiners/path/text"
import { $$ as q_read_file } from "pareto-host-nodejs/dist/queries/read_file"

import * as fs from "fs"
import get_applicable_schema_path from './get_applicable_schema_path'

export type Load_Schema_Error = {
	'schema path': d_path.Node_Path
	'type':
	| ['read file', d_read_file.Error]
	| ['deserialize', d_deserialize_resolved.Error]
}

export type Load_Schema_Success = {
	'schema path': d_path.Node_Path
	'parameters': d_unmarshall_result_from_lines_of_characters.Parameters
}

export function load_schema(
	instance_path: string,
	on_error: ($: Load_Schema_Error) => void,
	on_success: ($: Load_Schema_Success) => void,
): void {

	const schema_path = get_applicable_schema_path(instance_path)
	// Cache miss - read and parse the schema

	const parsed_schema_path = r_path_from_text.Node_Path(
		schema_path,
		() => _p_unreachable("the path is constructed above"),
		{
			'pedantic': true
		}
	)

	q_read_file(
		parsed_schema_path,
		($) => $
	).__extract_data(
		($) => {
			create_refinement_context<d_temp_module_specifier.Temp_Module_Specifier, d_deserialize_resolved.Error>(
				(abort) => r_temp_module_specifier_from_loc.Module_Specifier(
					$,
					($) => abort($)

				)
			).__extract_data(
				($) => {
					const unmarshall_parameters = {
						'schema': $,
						'tab size': 1 // vscode works with character, not with columns
					}

					on_success({
						'schema path': parsed_schema_path,
						'parameters': unmarshall_parameters
					})

				},
				($) => {
					on_error({
						'schema path': parsed_schema_path,
						'type': ['deserialize', $],

					})
				}
			)
		},
		($) => {
			on_error({
				'schema path': parsed_schema_path,
				'type': ['read file', $]
			})
		}
	)
}
