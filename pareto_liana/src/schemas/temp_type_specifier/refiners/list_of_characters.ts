import * as p_ from 'pareto-core/refiner'
import type * as s_out from '../schema.js'
import type * as s_in from 'astn-runtime/modules/deserialization/schemas/list_of_characters/schema'
import type * as errors from '../../../modules/schema.generated/schemas/reader_errors/schema.js'
import * as resolve from '../../liana_next_schema/resolve.js'
import * as read from '../../../modules/schema.generated/schemas/unresolved/refiners/astn_parse_tree.js'
import * as tree from 'astn-runtime/modules/deserialization/schemas/parse_tree/refiners/list_of_characters'
import * as location from 'astn-runtime/modules/deserialization/schemas/parse_tree/transformers/start_token_range'

export const Type_Specifier: p_.Refiner_With_Parameter<
    s_out.Temp_Type_Specifier, errors.types.Resolved_Error, s_in.List_Of_Characters, { 'tab size': number }
> = ($, abort, parameters) => {
    const document = tree.Document($, error => abort(['unresolved document deserialization', ['parse tree deserialization', error]]), parameters)
    return ['constrained', resolve.Type_Specification(
        read.Type_Specification(document.content, error => abort(['unresolved document deserialization', ['unmarshalling', error]])),
        error => abort(['resolving', { ...error, location: location.Value(document.content) }]),
    )]
}
