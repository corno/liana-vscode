
import * as p_ from 'pareto-core/transformer'
import type * as p_di from 'pareto-core/schema'

//schemas
import type * as s_out from "astn/modules/authoring_target/schemas/authoring_target/schema"
import type * as s_in from "../schema.js"
import { component_type } from '../select_component.js'

export namespace s_function {
    export type Parameters = {
        'state ancestors'?: p_di.List<s_in.namespaces.structure.types.Value.state>
        'style':
        | ['concise', null]
        | ['verbose', null]
    }
}


namespace declarations_ {

    export type Value = p_.Transformer_With_Parameter<
        s_in.namespaces.structure.types.Value,
        s_out.Value,
        s_function.Parameters
    >
    export type Value_data = p_.Transformer_With_Parameter<
        s_in.namespaces.structure.types.Value,
        s_out.Value.data,
        s_function.Parameters
    >
}

export const Value: declarations_.Value = ($, $p) => ({

    'data': Value_data($, $p)
})

export const Value_data: declarations_.Value_data = ($, $p) => p_.from.state($).decide(
    ($): s_out.Value.data => {
        switch ($[0]) {
            case 'simple': return p_.option($, ($) => $.value['l entry'].type[0] === 'undelimited'
                || p_.from.optional($.value['l entry']['regular expression']).decide(() => true, () => false)
                ? ['missing', { '#': { comments: p_.literal.list([]) } }]
                : ['concrete', {
                'type': ['text', {
                    'delimiter': $.value['l entry'].type[0] === 'double quoted' ? ['quote', null] : ['none', null],
                    'value': "",
                    'trivia': {
                        'comments': p_.literal.list([])
                    }
                }]
            }])
            case 'nothing': return p_.option($, ($) => ['concrete', {
                'type': ['nothing', {
                    '~': {
                        'comments': p_.literal.list([])
                    }
                }]
            }])
            case 'list': return p_.option($, ($) => ['concrete', {
                'type': ['list', {
                    '[': {
                        'comments': p_.literal.list([])
                    },
                    'items': p_.literal.list([]),
                    ']': {
                        'comments': p_.literal.list([])
                    },
                }]
            }])
            case 'reference': return p_.option($, ($) => ['missing', {
                '#': {
                    'comments': p_.literal.list([])
                }
            }])
            case 'component': return p_.option($, ($) => Value_data(component_type($.type)['root value'], $p))
            case 'dictionary': return p_.option($, ($) => ['concrete', {
                'type': ['dictionary', {
                    '{': {
                        'comments': p_.literal.list([])
                    },
                    'entries': p_.literal.list([]),
                    '}': {
                        'comments': p_.literal.list([])
                    },
                }]
            }])
            case 'group': return p_.option($, ($): s_out.Value.data => {
                const $v_xx = $
                return ['concrete', {
                    'type': ['group', p_.from.state($p.style).decide(
                        ($): s_out.Value.data.concrete.type_.group => {
                            switch ($[0]) {
                                case 'concise': return p_.option($, ($) => ['concise', {
                                    '<': {
                                        'comments': p_.literal.list([])
                                    },
                                    'properties': p_.from.dictionary($v_xx).convert_to_list(
                                        ($, id): s_out.Items.L => Value(
                                            $.value,
                                            $p
                                        )
                                    ),
                                    '>': {
                                        'comments': p_.literal.list([])
                                    },
                                }])
                                case 'verbose': return p_.option($, ($) => ['verbose', {
                                    '(': {
                                        'comments': p_.literal.list([])
                                    },
                                    'properties': p_.from.dictionary($v_xx).convert_to_list(
                                        ($, id): s_out.ID_Value_Pairs.L => ({
                                            'id': id,
                                            'value': p_.literal.set(Value(
                                                $.value,
                                                $p
                                            ))
                                        })
                                    ),
                                    ')': {
                                        'comments': p_.literal.list([])
                                    },
                                }])
                                default: return p_.exhaustive($[0])
                            }
                        })]
                }]
            })
            case 'optional': return p_.option($, ($) => ['concrete', {
                'type': ['optional', ['not set', {
                    '_': {
                        'comments': p_.literal.list([])
                    }
                }]]
            }])
            case 'state': return p_.option($, ($) => {
                const options = $.options.__get_raw()
                const only = options.length === 1 ? options[0] : undefined
                const ancestors = $p['state ancestors'] ?? p_.literal.list<s_in.namespaces.structure.types.Value.state>([])
                const recursive = p_.from.list(ancestors).on_has_match(
                    (state) => state === $ ? p_.literal.set(true) : p_.literal.not_set<boolean>(), () => false,
                )
                const canSelect = only !== undefined && !recursive
                    && p_.from.optional(only[1].constraints).decide((checks) => checks.__get_raw().length === 0, () => true)
                return ['concrete', {
                    'type': ['state', {
                        '|': { 'comments': p_.literal.list([]) },
                        'status': canSelect && only !== undefined
                            ? ['set', {
                                'option': only[0],
                                'value': Value(only[1].value, { ...$p, 'state ancestors': p_.literal.segmented_list([ancestors, p_.literal.list([$])]) }),
                            }]
                            : ['missing', { '#': { 'comments': p_.literal.list([]) } }],
                    }],
                }]
            })
            default: return p_.exhaustive($[0])
        }
    })

// export const Resolver_Value = (
//     $: s_in.Resolver_Value,
// ): s_out.Value => ({
//     'data': ['concrete', {
//         'type': p_.from.state($).decide(
//($): s_out.Value.data.concrete.type_ => {
//             switch ($[0]) {
//                 case 'simple': return p_.option($, ($) => ['text', {
//                     'delimiter': ['none', null],
//                     'value': "0",
//                     'trivia': {
//                         'comments': p_.literal.list([])
//                     }
//                 }])
//                 case 'nothing': return p_.option($, ($) => ['nothing', {
//                     '~': {
//                         'comments': p_.literal.list([])
//                     }
//                 }])
//                 case 'text': return p_.option($, ($) => ['text', {
//                     'delimiter': ['quote', null],
//                     'value': "",
//                     'trivia': {
//                         'comments': p_.literal.list([])
//                     }
//                 }])
//                 case 'list': return p_.option($, ($) => ['list', {
//                     '[': {
//                         'comments': p_.literal.list([])
//                     },
//                     'items': p_.literal.list([]),
//                     ']': {
//                         'comments': p_.literal.list([])
//                     },
//                 }])
//                 case 'reference': return p_.option($, ($) => ['text', {
//                     'delimiter': ['apostrophe', null],
//                     'value': "...",
//                     'trivia': {
//                         'comments': p_.literal.list([])
//                     }
//                 }])
//                 case 'component': return p_.option($, ($) => p_.from.state($.location).decide(
//($) => {
//                     switch ($[0]) {
//                         case 'external': return p_.option($, ($) => p_implement_me("xx"))
//                         case 'internal': return p_.option($, ($) => p_implement_me("xx"))
//                         default: return p_.exhaustive($[0])
//                     }
//                 }))
//                 case 'dictionary': return p_.option($, ($) => ['dictionary', {
//                     '{': {
//                         'comments': p_.literal.list([])
//                     },
//                     'entries': p_.literal.list([]),
//                     '}': {
//                         'comments': p_.literal.list([])
//                     },
//                 }])
//                 case 'group': return p_.option($, ($): s_out.Value.data.concrete.type_ => ['group', ['verbose', {
//                     '(': {
//                         'comments': p_.literal.list([])
//                     },
//                     'properties': p_.from.dictionary(//                         $
//                     ).convert(
//                         ($, id): s_out.ID_Value_Pairs.L => ({
//                             'id': id,
//                             'value': p_.literal.set(Resolver_Value($.resolver))
//                         })
//                     ),
//                     ')': {
//                         'comments': p_.literal.list([])
//                     },
//                 }]])
//                 case 'optional': return p_.option($, ($) => ['optional', ['not set', {
//                     '_': {
//                         'comments': p_.literal.list([])
//                     }
//                 }]])
//                 case 'state': return p_.option($, ($) => ['state', {
//                     '|': {
//                         'comments': p_.literal.list([])
//                     },
//                     'status': ['missing', {
//                         '#': {
//                             'comments': p_.literal.list([])
//                         }
//                     }]
//                 }])
//                 default: return p_.exhaustive($[0])
//             }
//         })
//     }]

// })
