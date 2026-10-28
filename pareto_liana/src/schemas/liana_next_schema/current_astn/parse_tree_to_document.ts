import * as p from 'pareto-core/transformer'
import * as p_refine from 'pareto-core/refiner'
import type * as p_ from 'pareto-core/refiner'
import type * as core from 'pareto-core/schema'

import type * as s_source from 'astn-runtime/modules/deserialization/schemas/parse_tree/schema'
import type * as s_target from './astn_document.js'

const ID_Value_Pairs: p_.Refiner<
    core.Dictionary<s_target.Value>,
    string,
    s_source.ID_Value_Pairs
> = ($, abort) => p_refine.from.list($).convert_to_dictionary(
    ($) => $.id.token.value,
    ($) => p.from.optional($.assignment).decide(
        (assignment) => p.from.optional(assignment.value).decide(
            ($) => Value($, abort),
            () => abort(`Missing ASTN value: ${$.id.token.value}`),
        ),
        () => abort(`Missing ASTN assignment: ${$.id.token.value}`),
    ),
    {
        'duplicate_id': ($) => abort(`Duplicate ASTN identifier: ${$}`),
    },
)

export const Value: p_.Refiner<
    s_target.Value,
    string,
    s_source.Value
> = ($, abort) => p.from.state($.type).decide(
    ($s): s_target.Value => {
        switch ($s[0]) {
            case 'concrete': return p.option($s, ($) => p.literal.group_resolve(() => {
                const $property_type: s_target.Value.type_ = p.from.state($).decide(
                    ($s): s_target.Value.type_ => {
                        switch ($s[0]) {
                            case 'dictionary': return p.option($s, ($) => ['dictionary', {
                                'entries': ID_Value_Pairs($.entries, abort),
                            }])
                            case 'group': return p.option($s, ($) => p.from.state($).decide(
                                ($s): s_target.Value.type_ => {
                                    switch ($s[0]) {
                                        case 'verbose': return p.option($s, ($) => ['group', {
                                            'properties': ID_Value_Pairs($.properties, abort),
                                        }])
                                        case 'concise': return p.option($s, ($) => abort('Concise ASTN groups require a schema before normalization'))
                                        default: return p.exhaustive($s[0])
                                    }
                                },
                            ))
                            case 'list': return p.option($s, ($) => ['list', {
                                'items': p.from.list($.items).map(($) => Value($.value, abort)),
                            }])
                            case 'nothing': return p.option($s, ($) => ['nothing', null])
                            case 'optional': return p.option($s, ($) => ['optional', p.from.state($).decide(
                                ($s): core.Optional_Value<s_target.Value> => {
                                    switch ($s[0]) {
                                        case 'set': return p.option($s, ($) => p.literal.set(Value($.value, abort)))
                                        case 'not set': return p.option($s, ($) => p.literal.not_set())
                                        default: return p.exhaustive($s[0])
                                    }
                                },
                            )])
                            case 'state': return p.option($s, ($) => p.from.state($.status).decide(
                                ($s): s_target.Value.type_ => {
                                    switch ($s[0]) {
                                        case 'set': return p.option($s, ($) => ['state', {
                                            'option': $.option.token.value,
                                            'value': Value($.value, abort),
                                        }])
                                        case 'missing': return p.option($s, ($) => abort('Missing ASTN state option'))
                                        default: return p.exhaustive($s[0])
                                    }
                                },
                            ))
                            case 'text': return p.option($s, ($) => p.from.state($.token.type).decide(
                                ($s): s_target.Value.type_ => {
                                    switch ($s[0]) {
                                        case 'apostrophed': return p.option($s, () => ['reference', $.token.value])
                                        case 'quoted': return p.option($s, () => ['text', $.token.value])
                                        case 'undelimited': return p.option($s, () => ['text', $.token.value])
                                        case 'backticked': return p.option($s, () => ['text', $.token.value])
                                        default: return p.exhaustive($s[0])
                                    }
                                },
                            ))
                            default: return p.exhaustive($s[0])
                        }
                    },
                )
                return {
                    'type': $property_type,
                }
            }))
            case 'include': return p.option($s, ($) => abort('Cannot normalize ASTN include'))
            case 'missing': return p.option($s, ($) => abort('Cannot normalize ASTN missing'))
            default: return p.exhaustive($s[0])
        }
    },
)
