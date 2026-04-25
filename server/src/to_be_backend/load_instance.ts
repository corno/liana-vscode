import create_refinement_context from 'pareto-core/dist/__internals/async/create_refinement_context'
import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'

import { Load_Schema_Error } from "./load_applicable_schema"

import {
	DocumentUri,
} from 'vscode-languageserver-textdocument'

import load_possibly_cached_schema from '../load_possibly_cached_schema'

import * as d_unmarshall_result from "liana-authoring/dist/interface/to_be_generated/unmashall_result"
import * as d_unmarshall_result_from_lines_of_characters from "liana-authoring/dist/interface/to_be_generated/unmarshall_result_from_loc"
import { Schema_Cache } from '../schema_cache'


import * as r_unmarshall_result_from_loc from "liana-authoring/dist/implementation/manual/refiners/unmarshall_result/list_of_characters"

type Load_Instance_Error =
	| ['schema', Load_Schema_Error]
	| ['unmarshall', d_unmarshall_result_from_lines_of_characters.Error]

export const load_instance = (
	document_uri: DocumentUri,
	document_content: string,
	schema_cache: Schema_Cache,
	on_error: ($: Load_Instance_Error) => void,
	on_success: ($: d_unmarshall_result.Document) => void
) => {
	load_possibly_cached_schema(
		document_uri,
		schema_cache,
		($) => {
			on_error(['schema', $])
		},
		(unmarshall_parameters) => {
			create_refinement_context<d_unmarshall_result.Document, d_unmarshall_result_from_lines_of_characters.Error>(
				(abort) => r_unmarshall_result_from_loc.Document(
					_p_list_from_text(
						document_content,
						($) => $
					),
					($) => abort($),
					unmarshall_parameters.parameters
				)
			).__extract_data(
				($) => {
					on_success($)
				},
				($) => {
					on_error(['unmarshall', $])
				}
			)
		}
	)

}