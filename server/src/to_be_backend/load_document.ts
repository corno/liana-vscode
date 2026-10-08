import p_unreachable_code_path from "pareto-core/transformer/specials/unreachable_code_path"
import query_result from "pareto-core/__internal/query/query_result"

import {
	TextDocument,
} from 'vscode-languageserver-textdocument'

import * as url from "url"
import p_list_from_text from 'pareto-core/refiner/specials/list_from_text'
import * as native_syntax from 'pareto-liana/schemas/temp_module_specifier/refiners/list_of_characters'
import { load_native_schema, native_schema_path_for_document } from './native_schema'

import * as d_deserialize from "liana-authoring/schemas/deserialization/schema"

import { $$ as qr_stat } from "pareto-resource-filesystem-unrestricted/queries/implementations/stat_possible_node"
import { $$ as qr_read_file } from "pareto-resource-filesystem-unrestricted/queries/implementations/read_file"


import * as deser_path from "pareto-filesystem-unrestricted-api/modules/unrestricted/schemas/path/deserializers"
import * as ser_path from "pareto-filesystem-unrestricted-api/modules/unrestricted/schemas/path/serializers"
import { $$ as q_deserialize } from "liana-authoring/queries/implementations/deserialize"
import { $$ as q_get_schema_path } from "liana-authoring/queries/implementations/get_schema_path"
import { $$ as q_get_schema } from "liana-authoring/queries/implementations/get_schema"
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
	const native_schema_path = native_schema_path_for_document(document.uri)
	const legacy_get_schema_path = q_get_schema_path(null, { stat: qr_stat })

	try {

		get_cached_or_fresh(
			cache.documents,
			cache_key,
			(on_cache_success, on_cache_error) => {
				q_deserialize(
					null,
					{
						'get schema path': ($p, e_t) => query_result((on_success, on_error) => {
							if (native_schema_path !== undefined) {
								on_success(deser_path.Node_Path(native_schema_path,
									() => p_unreachable_code_path('Unexpected native schema path: ' + native_schema_path),
									{ pedantic: false }))
							} else {
								legacy_get_schema_path($p, e_t).__extract_data(on_success, on_error)
							}
						}),
						'get schema': ($p, e_t) => {
							return query_result(
								(on_success, on_error) => {
									get_cached_or_fresh(
										cache.schemas,
										ser_path.Node_Path($p['schema path']),
										(on_cache_success, on_cache_error) => {
											const native = load_native_schema(ser_path.Node_Path($p['schema path']))
											if (native !== undefined) {
												const syntax = native_syntax.Module_Specifier(
													p_list_from_text(native.syntax, value => value),
													error => { throw new Error('Cannot load native structural projection: ' + JSON.stringify(error)) },
													{ 'tab size': 4 },
												)
												on_cache_success(syntax)
												return
											}
											q_get_schema(
												{
													'tab size': 4 //FIXME not hardcoded
												},
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
						'file path': deser_path.Node_Path(
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
	} catch (error) {
		console.log("CSCH: Error occurred while loading document:", error)
		throw error
	}


}