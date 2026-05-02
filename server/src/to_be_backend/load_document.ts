import * as _p from 'pareto-core/dist/assign'
import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'
import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'
import __query_result from 'pareto-core/dist/__internals/async/__query_result'

import {
	DocumentUri,
	TextDocument,
} from 'vscode-languageserver-textdocument'

import * as url from "url"

import * as d_unmarshall_result from "liana-authoring/dist/interface/to_be_generated/unmashall_result"
import * as d_deserialize from "liana-authoring/dist/interface/to_be_generated/deserialize"

import * as d_temp_module_specifier from "pareto-liana/dist/interface/to_be_generated/temp_module_specifier"
import * as d_get_schema from "liana-authoring/dist/interface/to_be_generated/get_schema"
import { $$ as qr_stat } from "pareto-host-nodejs/dist/queries/stat_possible_node"
import { $$ as qr_read_file } from "pareto-host-nodejs/dist/queries/read_file"


import * as r_path_from_text from "pareto-resources/dist/implementation/manual/refiners/path/text"
import * as t_path_to_text from "pareto-resources/dist/implementation/manual/transformers/path/text"
import { $$ as q_deserialize } from "liana-authoring/dist/implementation/manual/queries/deserialize"
import { $$ as q_get_schema_path } from "liana-authoring/dist/implementation/manual/queries/get_schema_path"
import { $$ as q_get_schema } from "liana-authoring/dist/implementation/manual/queries/get_schema"
import { Cache, get_cached_or_fresh } from '../cache'
import { Schema_Cache_Entry } from '../schema_cache'

export const load_document = <T>(
	document: TextDocument,
	schema_cache: Cache<Schema_Cache_Entry>,
	on_errorx: ($: d_deserialize.Error) => T,
	on_successx: ($: d_unmarshall_result.Document) => T,
	resolve: ($: T) => void,
) => {

	q_deserialize(
		{
			'get schema path': q_get_schema_path({
				'stat': qr_stat
			}),
			'get schema': ($p, e_t) => {
				return __query_result(
					(on_success, on_error) => {
						get_cached_or_fresh<d_temp_module_specifier.Temp_Module_Specifier, d_get_schema.Error>(
							schema_cache,
							t_path_to_text.Node_Path($p['schema path']),
							(on_cache_success, on_cache_error) => {
								q_get_schema(
									{
										'read file': qr_read_file
									},
								)(
									$p,
									($) => $
								).__extract_data(
									on_cache_success,
									on_cache_error,
								)
							},
							on_success,
							($) => on_error(e_t($)),
						)
					}
				)
			}
		}
	)(
		{
			'content': document.getText(),
			'tab size': 1, // LSP uses character offsets, not visual columns (tab = 1 character)
			'file path': r_path_from_text.Node_Path(
				url.fileURLToPath(document.uri),
				() => _p_unreachable_code_path("vscode is providing an unexpected file URI: " + url.fileURLToPath(document.uri)),
				{
					'pedantic': false
				}
			),
		},
		($): d_deserialize.Error => $
	).__extract_data(
		($) => resolve(on_successx($)),
		($) => resolve(on_errorx($)),
	)

}