import * as p_ from 'pareto-core/transformer'
import type * as s_in from '../schema.js'
import type * as s_out from '../../completion_suggestions/schema.js'
import type * as s_location from '../../location/schema.js'
import * as found from '../../unmarshall_result/transformers/found.js'
import * as fallback from '../../unmarshall_result/transformers/completion_suggestions.js'
import * as find from './find_value.js'
import * as full_range from 'astn-runtime/modules/deserialization/schemas/parse_tree/transformers/full_value_range'
import * as serialize from 'astn/modules/authoring_target/schemas/authoring_target/transformers/serialized'
import { blocker } from '../blockers.js'
import type * as core from 'pareto-core/schema'

const failures = (checks: core.Dictionary<s_in.Selection>) => {
    let reason = ''
    const blockers = p_.from.dictionary(checks).flatten_to_list((selection, id) => {
        if (selection[0] !== 'constraint failed') return p_.literal.list([])
        const explanation = id + ': ' + selection[1]
        reason += (reason === '' ? '' : '; ') + explanation
        return p_.literal.list([{ reason: explanation, ...blocker(selection) }])
    })
    return { reason, blockers }
}
const candidate_failures = (candidates: s_in.Value['reference candidate constraints'], id: string) => {
    for (const candidate of candidates?.__get_raw() ?? []) {
        if (candidate.id === id) return failures(candidate.checks)
    }
    return failures(p_.literal.dictionary<s_in.Selection>({}))
}

export const Document = ($: s_in.Document, parameters: {
    position: s_location.Position
    indent: string
    style: ['verbose', null] | ['concise', null]
}): s_out.Completion_Suggestions => {
    const target = found.Document($.unmarshalled, parameters)
    if (target[0] !== 'value' && target[0] !== 'state') return fallback.Found(target, parameters)
    return p_.from.optional(find.Value($.content, (value) => {
        if (target[0] === 'value') return value.unmarshalled === target[1]
        const result = value['unmarshall result']
        return result[0] === 'success' && result[1][0] === 'state' && result[1][1].unmarshalled === target[1]
    })).decide((value): s_out.Completion_Suggestions => {
        if (target[0] === 'value' && target[1].definition[0] === 'reference' && value.unmarshalled === target[1] && value['reference candidates']) {
            const unmarshalled = target[1]
            const candidate_checks = value['reference candidate constraints']
            const candidates = p_.from.optional(value['reference candidates']).map((keys): s_out.Completion_Suggestions_.O => ({
                type: ['reference', null],
                'replacement range': full_range.Value(unmarshalled.instance),
                suggestions: p_.from.list(keys).map((id) => {
                    const status = candidate_failures(candidate_checks, id)
                    return {
                        label: id === '' ? "''" : id,
                        'reference identifier': id,
                        documentation: 'Reference to ' + id + (status.reason === '' ? '' : '\nUnavailable in this context: ' + status.reason),
                        ...(status.reason === '' ? {} : { 'invalid reason': status.reason, blockers: status.blockers }),
                        'insert lines': serialize.Value({
                            data: ['concrete', { type: ['text', {
                                delimiter: ['apostrophe', null], value: id,
                                trivia: { comments: p_.literal.list([]) },
                            }] }],
                        }, { paragraph: { indentation: parameters.indent }, value: { 'write delimiters': true } }),
                    }
                }),
            }))
            return p_.from.optional(candidates).decide(
                (suggestions) => p_.from.list(suggestions.suggestions).on_has_first_item(
                    () => p_.literal.set(suggestions), () => fallback.Found(target, parameters),
                ),
                () => fallback.Found(target, parameters),
            )
        }
        const result = value['unmarshall result']
        if (result[0] === 'error') return fallback.Found(target, parameters)
        const content = result[1]
        if (target[0] === 'state' && content[0] === 'state' && content[1].unmarshalled === target[1]) {
            const constraints = value['state option constraints']
            return fallback.Found(target, constraints === undefined ? parameters : {
                ...parameters,
                'invalid state options': p_.from.dictionary(constraints).map(failures),
            })
        }
        return fallback.Found(target, parameters)
    }, () => fallback.Found(target, parameters))
}
