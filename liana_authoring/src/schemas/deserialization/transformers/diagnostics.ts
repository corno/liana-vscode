
import * as p_ from 'pareto-core/transformer'

//schemas
import type * as s_in from "../schema.js"
import type * as s_out from "../../diagnostics/schema.js"


namespace declarations_ {

    export type Error = p_.Transformer<
        s_in.Error,
        s_out.Diagnostics.L
    >
}

//depencencies
import * as t_get_schema from "../../retrieval_of_schema/transformers/diagnostics.js"
import * as t_deserialize_to_location from "astn-runtime/modules/deserialization/schemas/parse_tree_deserialization/transformers/location"
import * as ser_parse_tree_deserialization from "astn-runtime/modules/deserialization/schemas/parse_tree_deserialization/serializers"
import { error_message, error_location } from "pareto-liana/schemas/temp_type_specifier/reader_error"

export const Error: declarations_.Error = ($) => p_.from.state($).decide(
	($) => {
		switch ($[0]) {
			case 'schema header': return {
				'severity': ['error', null],
				'message': error_message($[1]),
				'range': p_.literal.set(error_location($[1])),
				'related information': p_.literal.not_set(),
				'type': ['schema', null],
			}
			case 'file type': return {
				'severity': ['error', null],
				'message': $[1],
				'range': p_.literal.not_set(),
				'related information': p_.literal.not_set(),
				'type': ['schema', null],
			}
			case 'schema path': return p_.option($, ($) => ({
				'severity': ['error', null],
				'message': $[0] === 'invalid schema path' ? "The nearest .liana schema context is not a directory" : "Cannot find or inspect a .liana schema context",
				'range': p_.literal.not_set(),
				'related information': p_.literal.not_set(),
				'type': ['schema', null]
			}))
			case 'schema': return p_.option($, ($) => t_get_schema.Error($.error, { 'schema path': $['schema path'] }))
			case 'deserialize parse tree': return p_.option($, ($) => ({
				'severity': ['error', null],
				'message': ser_parse_tree_deserialization.Error($),
				'range': p_.literal.set(t_deserialize_to_location.Error($)),
				'related information': p_.literal.not_set(),
				'type': ['deserialize', null]
			}))
			default: return p_.exhaustive($[0])
		}
	}
)
