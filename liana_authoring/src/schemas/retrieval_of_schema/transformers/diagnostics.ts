import * as p_ from 'pareto-core/transformer'
import * as p_s from 'pareto-core/serializer'

//schemas
import type * as s_in from "../../../schemas/retrieval_of_schema/schema.js"
import type * as s_out from "../../../schemas/diagnostics/schema.js"
import type * as s_path from "pareto-filesystem-unrestricted-api/modules/unrestricted/schemas/path/schema"

export namespace s_function {
    export type Parameters = {
        'schema path': s_path.Node_Path
    }
}


namespace declarations_ {

    export type Error = p_.Transformer_With_Parameter<
        s_in.Error,
        s_out.Diagnostics.L,
        s_function.Parameters
    >
}

//dependencies
import { error_message, error_location } from "pareto-liana/schemas/temp_type_specifier/reader_error"
import * as ser_rich_phrase from "pareto-fountain-pen/modules/rich_phrase/schemas/rich_phrase/serializers"

export const Error: declarations_.Error = ($, $p) => {
	return p_.from.state($.type).decide(
		($) => {
			switch ($[0]) {
				case 'read file': return p_.option($, ($) => ({
					'message': "Failed to read schema file",
					'severity': ['error', null],
					'related information': p_.literal.not_set(),
					'range': p_.literal.not_set(),
					'type': ['schema', null]
				}))
				case 'deserialize': return p_.option($, ($) => ({
					'message': p_s.ph.list(p_.literal.list([
						"failed to deserialize schema: ",
						error_message($)
					])),
					'severity': ['error', null],
					'related information': p_.literal.set(p_.literal.list([
						{
							'location': {
								'file path': $p['schema path'],
								'range': error_location($)
							},
							'message': error_message($)
						}
					])),
					'range': p_.literal.not_set(),
					'type': ['schema', null]

				}))
				default: return p_.exhaustive($[0])
			}
		})
}
