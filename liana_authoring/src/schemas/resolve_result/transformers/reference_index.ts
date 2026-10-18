import * as p_ from 'pareto-core/transformer'
import type * as p_di from 'pareto-core/schema'
import type * as s_in from '../schema.js'
import type * as s_location from 'astn-runtime/modules/deserialization/schemas/location/schema'
import * as owned from './find_value.js'

export type Declaration = {
    name: string
    range: s_location.Range
    dictionary: s_in.Dictionary
    value: s_in.Value
}

export type Reference = {
    name: string
    range: s_location.Range
    target: p_di.Optional_Value<s_in.Value>
}

export type Index = {
    declarations: p_di.List<Declaration>
    references: p_di.List<Reference>
}

export const Document = ($: s_in.Document): Index => {
    const values = owned.Values($.content)
    return {
        declarations: p_.from.list(values).flatten((value): p_di.List<Declaration> => {
            const result = value['unmarshall result']
            if (result[0] !== 'success' || result[1][0] !== 'dictionary') return p_.literal.list([])
            const dictionary = result[1][1]
            return p_.from.dictionary(dictionary.entries).flatten_to_list((entry, name) => {
                const result = entry['unmarshall result']
                if (result[0] !== 'success' || result[1].value[0] !== 'set') return p_.literal.list([])
                const selected = result[1].value[1]
                return p_.from.dictionary(dictionary.unmarshalled.derived.entries).get_possible_entry(name,
                    (entry) => entry.result[0] === 'success' ? p_.literal.list([{
                        name, range: entry.result[1].intermediate['id value pair'].id.range,
                        dictionary, value: selected,
                    }]) : p_.literal.list([]),
                    () => p_.literal.list([]),
                )
            })
        }),
        references: p_.from.list(values).flatten((value): p_di.List<Reference> => {
            const result = value['unmarshall result']
            if (result[0] !== 'success' || result[1][0] !== 'reference' || result[1][1][0] !== 'selected') return p_.literal.list([])
            const reference = result[1][1][1]
            const status = reference['resolve status']
            const selected: s_in.Selection = status[0] === 'selected' ? status[1]
                : status[0] === 'cyclic' ? p_.from.optional(status[1].get_circular_dependent()).decide(
                    (entry): s_in.Selection => {
                        const result = entry['unmarshall result']
                        return entry['resolution error'] === undefined && result[0] === 'success' && result[1].value[0] === 'set'
                            ? ['resolved', result[1].value[1]] : ['unavailable', null]
                    },
                    (): s_in.Selection => ['unavailable', null],
                ) : ['unavailable', null]
            return p_.literal.list([{
                name: reference.unmarshalled.intermediate.instance.token.value,
                range: reference.unmarshalled.intermediate.instance.range,
                target: selected[0] === 'resolved' ? p_.literal.set(selected[1]) : p_.literal.not_set(),
            }])
        }),
    }
}
