
import * as sh from '../../../temp/shorthands.js'

import type * as s_target from "../../../modules/schema.generated/schemas/unresolved/schema.js"

export const schema_ = (
    basic_types: s_target.Basic_Types,
    types: s_target.Types,
    signatures: s_target.Resolver_Signatures,
    resolvers: s_target.Resolver_Types,
): s_target.Schema => ({
    'basic types': basic_types,
    types,
    signatures,
    resolvers,
})

export const type_specification = (schema: s_target.Schema, root_type: string): s_target.Type_Specification => ({
    schema,
    'root type': root_type,
})

export const basic_types = (
    types: sh.Raw_Or_Normal_Dictionary<s_target.Basic_Types.D>,
): s_target.Basic_Types => sh.dictionary(types)
export const types = (
    types: sh.Raw_Or_Normal_Dictionary<s_target.Types.D>,
): s_target.Types => {
    return sh.dictionary(types)
}

export const type_ = (type: s_target.Value): s_target.Types.D => ({
    'root value': type,
})

export const text = (
    type: 'single line' | 'multi line',
    path?: [string, string]
): s_target.Basic_Type => ({
    'type': ['text', {
    'type': type === 'single line'
        ? sh.state(['single line', null])
        : sh.state(['multi line', null]),
    'link': path === undefined
        ? sh.state(['no', null])
        : sh.state(['yes', {
            'path prefix': path[0],
            'path suffix': path[1],
        }]),
    }],
})

export const prop = (
    node: s_target.Value,
): s_target.Group.D => ({
    'description': sh.optional.not_set(),
    'value': node,
})

export const toption = (
    node: s_target.Value,
): s_target.Value.state.options.D => ({
    'constraints': sh.optional.not_set(),
    'description': sh.optional.not_set(),
    'value': node,
})

export const toption_constrained = (
    constraints: sh.Raw_Or_Normal_Dictionary<s_target.Option_Constraints.O.D>,
    node: s_target.Value,
): s_target.Value.state.options.D => ({
    'constraints': sh.optional.set(
        sh.dictionary(constraints)),
    'description': sh.optional.not_set(),
    'value': node,
})

export const toption_with_description = (
    description: string,
    node: s_target.Value,
): s_target.Value.state.options.D => ({
    'constraints': sh.optional.not_set(),
    'description': sh.optional.set(description),
    'value': node,
})

export const prop_with_description = (
    description: string,
    node: s_target.Value,
): s_target.Group.D => ({
    'description': sh.optional.set(description),
    'value': node,
})

/**
 * number type
 */
export namespace n {

    export const date = (): s_target.Basic_Type => ({
        'type': sh.state(['date', null]),
    })

    export const integer = (number_of_fractional_digits: sh.Raw_Optional<number>): s_target.Basic_Type => ({
        'type': sh.state(['number', {
            'precision': sh.state<s_target.Basic_Type.type_.number_.precision>(['exact', {
                'number of fractional digits': sh.optional.null_or_value<number>(number_of_fractional_digits),
                'type': sh.state(['integer', null]),
            }])

        }]),
    })

    export const approximation = (significant_digits: number): s_target.Basic_Type => ({
        'type': sh.state(['number', {
            'precision': sh.state<s_target.Basic_Type.type_.number_.precision>(['approximation', {
                'significant digits': significant_digits,
            }])

        }]),
    })

    export const natural = (number_of_fractional_digits: sh.Raw_Optional<number>): s_target.Basic_Type => ({
        'type': sh.state(['number', {
            'precision': sh.state<s_target.Basic_Type.type_.number_.precision>(['exact', {
                'number of fractional digits': sh.optional.null_or_value<number>(number_of_fractional_digits),
                'type': sh.state(['natural', null]),
            }])

        }]),
    })

    export const boolean = (): s_target.Basic_Type => ({
        'type': sh.state(['boolean', null]),
    })

    export const positive_natural = (number_of_fractional_digits: sh.Raw_Optional<number>): s_target.Basic_Type => ({
        'type': sh.state(['number', {
            'precision': sh.state<s_target.Basic_Type.type_.number_.precision>(['exact', {
                'number of fractional digits': sh.optional.null_or_value<number>(number_of_fractional_digits),
                'type': sh.state(['positive natural', null]),
            }])

        }]),
    })

}

export const type_reference = (
    type: string,
): s_target.Type_Reference => ({
    'location': sh.state(['internal', sh.reference(type)]),
    'resulting type': null,
})

export const value_reference = (
    type: string,
    tail: s_target.Value_Path.tail.L[],

): s_target.Value_Reference => {
    return {
        'type': {
            'location': sh.state(['internal', sh.reference(type)]),
            'resulting type': null,
        },
        'path': {

            'tail': sh.list(tail),

            'resulting node': null,
        }
    }
}

/**
 * type node
 */
export namespace t {

    export const component_acyclic = (type: string): s_target.Value => {
        return sh.state(['component', {
            'type': sh.state(['internal acyclic', sh.reference(type)]),
            'results': sh.optional.not_set(),
        }])
    }

    export const component_with_results = (
        type: string,
        results: sh.Raw_Or_Normal_Dictionary<s_target.Value_Results.O.D>,
    ): s_target.Value => {
        return sh.state(['component', {
            'type': sh.state(['internal', sh.reference(type)]),
            'results': sh.optional.set(
                sh.dictionary(results)),
        }])
    }

    export const component = (type: string): s_target.Value => {
        return sh.state(['component', {
            'type': sh.state(['internal', sh.reference(type)]),
            'results': sh.optional.not_set(),
        }])
    }

    export const dictionary = (type: s_target.Value): s_target.Value => {
        return sh.state(['dictionary', {
            'value': type,
            'benchmark': sh.optional.not_set(),
        }])
    }

    export const group = (properties: sh.Raw_Or_Normal_Dictionary<s_target.Group.D>): s_target.Value => {
        return sh.state(['group', sh.dictionary(properties)])
    }

    export const list = (type: s_target.Value): s_target.Value => {
        return sh.state(['list', {
            'value': type,
            'results': sh.optional.not_set(),
        }])
    }

    export const list_with_results = (
        type: s_target.Value,
        results: sh.Raw_Or_Normal_Dictionary<s_target.Value_Results.O.D>,
    ): s_target.Value => {
        return sh.state(['list', {
            'value': type,
            'results': sh.optional.set(
                sh.dictionary(results)),
        }])
    }

    export const nothing = (): s_target.Value => {
        return sh.state(['nothing', null])
    }

    export const simple = (name: string): s_target.Value => {
        return sh.state(['simple', sh.reference(name)])
    }

    export const optional = (type: s_target.Value): s_target.Value => {
        return sh.state(['optional', type])
    }

    export const reference_derived = (
        type: string,
        tail: s_target.Value_Path.tail.L[],
    ): s_target.Value => {
        const x: s_target.Value_Reference = {
            'type': {
                'location': sh.state(['internal', sh.reference(type)]),
                'resulting type': null,
            },
            'path': {
                'tail': sh.list(tail),
                'resulting node': null
            }
        }
        return sh.state(['reference', {
            'referent': x,
            'type': sh.state(['derived', null]),
        }])
    }

    export const reference = (
        type: string,
        tail: s_target.Value_Path.tail.L[],
        dependency?: "cyclic" | "acyclic",
        results?: sh.Raw_Or_Normal_Dictionary<s_target.Value_Results.O.D>,
    ): s_target.Value => {

        const p_type: s_target.Value.reference.type_ = sh.state(['selected', {
            'referent': {
                'type': {
                    'location': sh.state(['internal', sh.reference(type)]),
                    'resulting node': null
                },
                'tail': sh.list(tail),
                'resulting node': null
            },
            'dictionary': null,
            'dependency': dependency === "cyclic"
                ? sh.state(['cyclic', null])
                : sh.state(['acyclic', null]),
            'results': results ? sh.optional.set(
                sh.dictionary(results)) : sh.optional.not_set(),
        }])
        return sh.state(['reference', {
            'referent': {
                'type': {
                    'location': sh.state(['internal', sh.reference(type)]),
                    'resulting node': null,
                    'resulting type': null,
                },
                'path': {
                    'tail': sh.list(tail),
                    'resulting node': null
                }
            },
            'type': p_type,
        }])
    }

    export const state = (
        options: sh.Raw_Or_Normal_Dictionary<s_target.Value.state.options.D>
    ): s_target.Value => {
        return sh.state(['state', {
            'options': sh.dictionary(options),
            'results': sh.optional.not_set(),
        }])
    }
    export const state_with_result = (
        options: sh.Raw_Or_Normal_Dictionary<s_target.Value.state.options.D>,
        results: sh.Raw_Or_Normal_Dictionary<s_target.Value_Results.O.D>,
    ): s_target.Value => {
        return sh.state(['state', {
            'options': sh.dictionary(options),
            'results': sh.optional.set(
                sh.dictionary(results)),
        }])
    }

    // export const type_parameter = (name: string): unresolved.Value => {
    //     return _psh.wrap_state(['type parameter', _psh.wrap_reference(name)])
    // }
}

/**
 * Value Path tail step
 */
export namespace vp {

    export const d = (): s_target.Value_Path.tail.L => {
        return sh.state(['dictionary', null])
    }
    export const g = (grp: string): s_target.Value_Path.tail.L => {
        return sh.state(['group', sh.reference(grp)])
    }
    export const s = (state: string): s_target.Value_Path.tail.L => {
        return sh.state(['state', sh.reference(state)])
    }
    export const o = (): s_target.Value_Path.tail.L => {
        return sh.state(['optional', null])
    }
}