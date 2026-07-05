import p_unreachable_code_path from "pareto-core/implementation/transformer/specials/unreachable_code_path"
import __query_result from "pareto-core/implementation/query/__internal/query_result"

import {
	TextDocument,
} from 'vscode-languageserver-textdocument'

import * as url from "url"

import * as d_deserialize from "liana-authoring/interface/data/deserialize"

import { $$ as qr_stat } from "pareto-host-nodejs/file_system_unrestricted/queries/stat_possible_node"
import { $$ as qr_read_file } from "pareto-host-nodejs/file_system_unrestricted/queries/read_file"


import * as r_path_from_text from "pareto-resources/implementation/manual/refiners/path_unrestricted/text"
import * as t_path_to_text from "pareto-resources/implementation/manual/transformers/unrestricted_path/text"
import { $$ as q_deserialize } from "liana-authoring/implementation/manual/queries/deserialize"
import { $$ as q_get_schema_path } from "liana-authoring/implementation/manual/queries/get_schema_path"
import { $$ as q_get_schema } from "liana-authoring/implementation/manual/queries/get_schema"
import { get_cached_or_fresh } from '../core/cache'
import { Cache_Context } from '../connection_context'

export const load_document = <T>(
	document: TextDocument,
	cache: Cache_Context,
	on_errorx: ($: d_deserialize.Error) => T,
	on_successx: ($: d_deserialize.Result) => T,
	resolve: ($: T) => void,
) => {

	const cache_key = `${document.uri}@${document.version}`

	get_cached_or_fresh(
		cache.documents,
		cache_key,
		(on_cache_success, on_cache_error) => {
			q_deserialize(
				null,
				{
					'get schema path': q_get_schema_path(
						null,
						{
							'stat': qr_stat
						},
					),
					'get schema': ($p, e_t) => {
						return __query_result(
							(on_success, on_error) => {
								get_cached_or_fresh(
									cache.schemas,
									t_path_to_text.Node_Path($p['schema path']),
									(on_cache_success, on_cache_error) => {
										q_get_schema(
											null,
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
				},
			)(
				{
					'content': document.getText(),
					'tab size': 1, // LSP uses character offsets, not visual columns (tab = 1 character)
					'file path': r_path_from_text.Node_Path(
						url.fileURLToPath(document.uri),
						() => p_unreachable_code_path("vscode is providing an unexpected file URI: " + url.fileURLToPath(document.uri)),
						{
							'pedantic': false
						}
					),
				},
				($): d_deserialize.Error => $
			).__extract_data(
				on_cache_success,
				on_cache_error,
			)
		},
		($) => {
			resolve(on_successx($))
		},
		($) => {
			resolve(on_errorx($))
		},
	)

}