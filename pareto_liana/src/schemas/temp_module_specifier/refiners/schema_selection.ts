import * as p_ from 'pareto-core/refiner'
import p_unreachable_code_path from 'pareto-core/transformer/specials/unreachable_code_path'
import type * as p_i from 'pareto-core/__internal/Abort'
import type * as s_tree from 'astn-runtime/modules/deserialization/schemas/parse_tree/schema'
import type * as s_error from 'liana-runtime/modules/value_unmarshalling/schemas/unmarshalling/schema'
import * as v from 'liana-runtime/modules/value_unmarshalling/schemas/unmarshalled_value/refiners/astn_parse_tree'

// The bootstrap schema still uses flat paths. Keep its resolver and authoring result API
// while accepting the constrained path syntax, without changing token locations.
export const normalize = (
    value: s_tree.Value,
    abort: p_i.Abort<s_error.Error>,
): s_tree.Value => {
    if (value.type[0] !== 'concrete' || value.type[1][0] !== 'group' || value.type[1][1][0] !== 'verbose') return value
    const group = value.type[1][1][1]
    return { type: ['concrete', ['group', ['verbose', {
        ...group,
        properties: p_.from.list(group.properties).map((property) => {
            if (property.id.token.value !== 'schema path') return property
            return {
                ...property,
                assignment: p_.from.optional(property.assignment).map((assignment) => ({
                    ...assignment,
                    value: p_.from.optional(assignment.value).map((path): s_tree.Value => {
                        if (path.type[0] !== 'concrete' || path.type[1][0] !== 'group') return path
                        const fields = v.Verbose_Group(path, abort, {
                            'expected properties': p_.literal.dictionary({ tail: null, result: null }),
                        })
                        v.Nothing(v.Property(fields, abort, { id: 'result' }), abort)
                        const tail = v.List(v.Property(fields, abort, { id: 'tail' }), abort)
                        if (tail.value.type[0] !== 'concrete' || tail.value.type[1][0] !== 'list') return p_unreachable_code_path('Validated schema-path tail is not a list')
                        return { type: ['concrete', ['list', {
                            ...tail.value.type[1][1],
                            items: p_.from.list(tail.items).map((item) => {
                                const step = v.State(item.value, abort)
                                if (step.option.token.value !== 'set') return abort(['liana', {
                                    type: ['unknown option', step.option.token.value],
                                    range: step.option.range,
                                }])
                                return { ...item, value: step.value }
                            }),
                        }]] }
                    }),
                })),
            }
        }),
    }]]] }
}
