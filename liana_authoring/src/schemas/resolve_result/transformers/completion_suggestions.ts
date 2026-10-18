import * as p_ from 'pareto-core/transformer'
import type * as p_di from 'pareto-core/schema'
import type * as s_in from '../schema.js'
import type * as s_out from '../../completion_suggestions/schema.js'
import type * as s_location from '../../location/schema.js'
import * as found from '../../unmarshall_result/transformers/found.js'
import * as fallback from '../../unmarshall_result/transformers/completion_suggestions.js'
import * as full_range from 'astn-runtime/modules/deserialization/schemas/parse_tree/transformers/full_value_range'
import * as serialize from 'astn/modules/authoring_target/schemas/authoring_target/transformers/serialized'

export const Document = ($: s_in.Document, parameters: {
    position: s_location.Position
    indent: string
    style: ['verbose', null] | ['concise', null]
}): s_out.Completion_Suggestions => {
    const target = found.Document($.unmarshalled, parameters)
    if (target[0] !== 'value') return fallback.Found(target, parameters)
    const unmarshalled = target[1]
    const first = <T extends p_di.Value>(items: p_di.List<T>, select: (item: T) => s_out.Completion_Suggestions): s_out.Completion_Suggestions =>
        p_.from.list(items).on_has_first_item(
            (item, rest) => p_.from.optional(select(item)).decide(
                (value) => p_.literal.set(value),
                () => first(rest, select),
            ),
            () => p_.literal.not_set(),
        )
    const visit = (value: s_in.Value): s_out.Completion_Suggestions => {
        if (value.unmarshalled === unmarshalled && value['reference candidates']) {
            return p_.from.optional(value['reference candidates']).map((keys): s_out.Completion_Suggestions_.O => ({
                type: ['reference', null],
                'replacement range': full_range.Value(unmarshalled.instance),
                suggestions: p_.from.list(keys).map((id) => ({
                    label: id === '' ? "''" : id,
                    'reference identifier': id,
                    documentation: 'Reference to ' + id,
                    'insert lines': serialize.Value({
                        data: ['concrete', { type: ['text', {
                            delimiter: ['quote', null], value: id,
                            trivia: { comments: p_.literal.list([]) },
                        }] }],
                    }, { paragraph: { indentation: parameters.indent }, value: { 'write delimiters': true } }),
                })),
            }))
        }
        const result = value['unmarshall result']
        if (result[0] === 'error') return p_.literal.not_set()
        const content = result[1]
        switch (content[0]) {
            case 'component': return visit(content[1].value)
            case 'dictionary': return first(p_.from.dictionary(content[1].entries).convert_to_list((entry) => entry),
                (entry) => entry['unmarshall result'][0] === 'success' && entry['unmarshall result'][1].value[0] === 'set'
                    ? visit(entry['unmarshall result'][1].value[1]) : p_.literal.not_set(),
            )
            case 'group': return first(p_.from.dictionary(content[1].properties).convert_to_list((property) => property),
                (property) => property['unmarshall result'][0] === 'success'
                    ? visit(property['unmarshall result'][1].resolved) : p_.literal.not_set(),
            )
            case 'list': return first(content[1].items, visit)
            case 'optional': return content[1].status[0] === 'set' ? visit(content[1].status[1]['child value']) : p_.literal.not_set()
            case 'state': return p_.from.optional(content[1].option).decide(visit, () => p_.literal.not_set())
            default: return p_.literal.not_set()
        }
    }
    const suggestions = visit($.content)
    return p_.from.optional(suggestions).decide(
        (value) => p_.literal.set(value),
        () => fallback.Found(target, parameters),
    )
}
