import * as p_ from 'pareto-core/refiner'
import type * as s_out from '../schema.js'
import type * as s_function from 'liana-runtime/modules/resolved_document_deserialization/schemas/resolved_document_deserialization/schema'
import type * as s_in from 'astn-runtime/modules/deserialization/schemas/list_of_characters/schema'
import * as r_schema from '../../../modules/schema.generated/schemas/resolved/refiners/unresolved_manual.js'
import * as r_unresolved from '../../../modules/schema.generated/schemas/unresolved/refiners/astn_parse_tree.js'
import * as r_tree from 'astn-runtime/modules/deserialization/schemas/parse_tree/refiners/list_of_characters'
import * as location from 'astn-runtime/modules/deserialization/schemas/parse_tree/transformers/start_token_range'
import * as v from 'liana-runtime/modules/value_unmarshalling/schemas/unmarshalled_value/refiners/astn_parse_tree'
import type * as s_unmarshalling from 'liana-runtime/modules/value_unmarshalling/schemas/unmarshalling/schema'

export const Type_Specifier: p_.Refiner_With_Parameter<
    s_out.Temp_Type_Specifier,
    s_function.Error,
    s_in.List_Of_Characters,
    { 'tab size': number }
> = ($, abort, $p) => {
    const tree = r_tree.Document(
        $,
        error => abort(['unresolved document deserialization', ['parse tree deserialization', error]]),
        $p,
    ).content
    const unmarshalling_error = (error: s_unmarshalling.Error): never =>
        abort(['unresolved document deserialization', ['unmarshalling', error]])
    const unresolved = r_unresolved.Type_Specification(tree, unmarshalling_error)
    const group = v.Verbose_Group(tree, unmarshalling_error, {
        'expected properties': p_.literal.dictionary({ 'file extension': null, schema: null, 'root type': null }),
    })
    const root = v.Property(group, unmarshalling_error, { id: 'root type' })
    const specification = r_schema.Type_Specification(
        unresolved,
        error => abort(['resolving', { ...error, location: location.Value(root) }]),
    )
    return ['constrained', {
        resolver: specification.schema,
        'root resolver': p_.from.dictionary(specification.schema.resolver.types).get_entry(specification['root type']['l id'], {
            no_such_entry: () => abort(['resolving', {
                type: ['lookup', ['no such entry', specification['root type']['l id']]],
                location: location.Value(root),
            }]),
        }),
        'root type': {
            id: specification['root type']['l id'],
            entry: specification['root type']['l entry'],
        },
    }]
}
