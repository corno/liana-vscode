import * as p_ from 'pareto-core/transformer'
import type * as p_di from 'pareto-core/schema'
import type * as s_in from '../schema.js'

export const Children = (value: s_in.Value): p_di.List<s_in.Value> => {
    const result = value['unmarshall result']
    if (result[0] === 'error') return p_.literal.list([])
    const content = result[1]
    switch (content[0]) {
        case 'component': return p_.literal.list([content[1].value])
        case 'dictionary': return p_.from.dictionary(content[1].entries).flatten_to_list((entry) =>
            entry['unmarshall result'][0] === 'success' && entry['unmarshall result'][1].value[0] === 'set'
                ? p_.literal.list([entry['unmarshall result'][1].value[1]]) : p_.literal.list([]),
        )
        case 'group': return p_.from.dictionary(content[1].properties).flatten_to_list((property) =>
            property['unmarshall result'][0] === 'success'
                ? p_.literal.list([property['unmarshall result'][1].resolved]) : p_.literal.list([]),
        )
        case 'list': return content[1].items
        case 'optional': return content[1].status[0] === 'set' ? p_.literal.list([content[1].status[1]['child value']]) : p_.literal.list([])
        case 'state': return p_.from.optional(content[1].option).decide(
            (value) => p_.literal.list([value]), () => p_.literal.list([]),
        )
        default: return p_.literal.list([])
    }
}

export const Values = (value: s_in.Value): p_di.List<s_in.Value> => p_.literal.segmented_list([
    p_.literal.list([value]),
    p_.from.list(Children(value)).flatten(Values),
])

export const Value = (
    value: s_in.Value,
    matches: (value: s_in.Value) => boolean,
): p_di.Optional_Value<s_in.Value> => {
    if (matches(value)) return p_.literal.set(value)
    const first = <T extends p_di.Value>(
        items: p_di.List<T>,
        select: (item: T) => p_di.Optional_Value<s_in.Value>,
    ): p_di.Optional_Value<s_in.Value> => p_.from.list(items).on_has_first_item(
        (item, rest) => p_.from.optional(select(item)).decide(
            (value) => p_.literal.set(value), () => first(rest, select),
        ),
        () => p_.literal.not_set(),
    )
    const visit = (value: s_in.Value) => Value(value, matches)
    return first(Children(value), visit)
}
