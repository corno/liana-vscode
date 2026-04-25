import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'
import _p_unreachable from 'pareto-core/dist/_p_unreachable_code_path'
import * as _p from 'pareto-core/dist/assign'

import * as d_unmarshall_result_from_lines_of_characters from "liana-authoring/dist/interface/to_be_generated/unmarshall_result_from_loc"
import * as d_path from "pareto-resources/dist/interface/generated/liana/schemas/path/data"

//dependencies
import * as path from "path"
import * as url from "url"

import {
	DocumentUri,
} from 'vscode-languageserver-textdocument'
import { Schema_Cache } from './schema_cache'
import { load_schema, Load_Schema_Error, Load_Schema_Success } from './to_be_backend/load_applicable_schema'

export default function load_possibly_cached_schema(
	documentURI: DocumentUri,
	schema_cache: Schema_Cache,
	on_error: ($: Load_Schema_Error) => void,
	on_success: ($: Load_Schema_Success) => void,
): void {

	const schema_path = path.join(path.dirname(url.fileURLToPath(documentURI)), ".liana", "schema.slna")

	// Check cache first
	const cached = schema_cache.get(schema_path)
	if (cached !== undefined) {
		// Cache hit - return immediately
		_p.decide.state(cached, ($) => {
			switch ($[0]) {
				case 'success': return _p.ss($, ($) => {
					on_success($)
				})
				case 'error': return _p.ss($, ($) => {
					on_error($)
				})
				default: return _p.au($[0])
			}
		})
	} else {
		// Cache miss - load and parse the schema}

		load_schema(
			url.fileURLToPath(documentURI),
			($) => {
				schema_cache.set(schema_path, ['error', $])
				on_error($)
			},
			($) => {
				schema_cache.set(schema_path, ['success', $])
				on_success($)
			}
		)
	}
}
