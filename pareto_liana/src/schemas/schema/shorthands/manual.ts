
import * as sh from 'liana-runtime/temp/shorthand_helpers/unresolved_data'

import type * as s_target from "../../../modules/schema.generated/schemas/unresolved/schema.js"

export const package_ = (
    schema_tree: s_target.Schema_Tree,
    omit_de_serializer: boolean,
): s_target.Package => ({
    'omit (de)serializer': omit_de_serializer,
    'schema tree': schema_tree,
})


/**
 * schema tree
 */
export namespace st {

    export const set = (
        schemas: sh.Raw_Or_Normal_Dictionary<s_target.Schema_Tree>,
    ): s_target.Schema_Tree => {
        return sh.state(['set', sh.dictionary(schemas)])
    }

    export const schema = (
        schema: s_target.Schema,
    ): s_target.Schema_Tree => {
        return sh.state(['schema', schema])
    }

}

export const modules = (
    modules: sh.Raw_Or_Normal_Dictionary<s_target.Modules.l_dictionary.D.l_entry>,
): s_target.Modules => {
    return sh.dictionary(modules)
}

export const globals = (
    complexity: 'unconstrained' | 'constrained',
    text_types: sh.Raw_Or_Normal_Dictionary<s_target.Globals.text_types.l_dictionary.D.l_entry>,
    simple_types: sh.Raw_Or_Normal_Dictionary<s_target.Globals.simple_types.l_dictionary.D.l_entry>,
): s_target.Globals => {
    return {
        'complexity': complexity === 'unconstrained'
            ? sh.state(['unconstrained', null])
            : sh.state(['constrained', null]),
        'text types': sh.dictionary(text_types),
        'simple types': sh.dictionary(simple_types),
    }
}

export const module_ = (type: s_target.Value): s_target.Modules.l_dictionary.D.l_entry => ({
    'root value': type,
})

export const text = (
    type: 'single line' | 'multi line',
    path?: [string, string]
): s_target.Text_Type => ({
    'type': type === 'single line'
        ? sh.state(['single line', null])
        : sh.state(['multi line', null]),
    'link': path === undefined
        ? sh.state(['no', null])
        : sh.state(['yes', {
            'path prefix': path[0],
            'path suffix': path[1],
        }]),
})

export const prop = (
    node: s_target.Value,
): s_target.Group.l_dictionary.D.l_entry => ({
    'description': sh.optional.not_set(),
    'value': node,
})

export const toption = (
    node: s_target.Value,
): s_target.Value.l_state.state.options.l_dictionary.D.l_entry => ({
    'constraints': sh.optional.not_set(),
    'description': sh.optional.not_set(),
    'value': node,
})

export const toption_constrained = (
    constraints: sh.Raw_Or_Normal_Dictionary<s_target.Option_Constraints.O.l_dictionary.D.l_entry>,
    node: s_target.Value,
): s_target.Value.l_state.state.options.l_dictionary.D.l_entry => ({
    'constraints': sh.optional.set(
        sh.dictionary(constraints)),
    'description': sh.optional.not_set(),
    'value': node,
})

export const toption_with_description = (
    description: string,
    node: s_target.Value,
): s_target.Value.l_state.state.options.l_dictionary.D.l_entry => ({
    'constraints': sh.optional.not_set(),
    'description': sh.optional.set(description),
    'value': node,
})

export const prop_with_description = (
    description: string,
    node: s_target.Value,
): s_target.Group.l_dictionary.D.l_entry => ({
    'description': sh.optional.set(description),
    'value': node,
})

/**
 * number type
 */
export namespace n {

    export const date = (): s_target.Simple_Type => ({
        'type': sh.state(['date', null]),
    })

    export const integer = (number_of_fractional_digits: sh.Raw_Optional<number>): s_target.Simple_Type => ({
        'type': sh.state(['number', {
            'precision': sh.state<s_target.Simple_Type.type_.l_state.number_.precision.l_state>(['exact', {
                'number of fractional digits': sh.optional.null_or_value<number>(number_of_fractional_digits),
                'type': sh.state(['integer', null]),
            }])

        }]),
    })

    export const approximation = (significant_digits: number): s_target.Simple_Type => ({
        'type': sh.state(['number', {
            'precision': sh.state<s_target.Simple_Type.type_.l_state.number_.precision.l_state>(['approximation', {
                'significant digits': significant_digits,
            }])

        }]),
    })

    export const natural = (number_of_fractional_digits: sh.Raw_Optional<number>): s_target.Simple_Type => ({
        'type': sh.state(['number', {
            'precision': sh.state<s_target.Simple_Type.type_.l_state.number_.precision.l_state>(['exact', {
                'number of fractional digits': sh.optional.null_or_value<number>(number_of_fractional_digits),
                'type': sh.state(['natural', null]),
            }])

        }]),
    })

    export const boolean = (): s_target.Simple_Type => ({
        'type': sh.state(['boolean', null]),
    })

    export const positive_natural = (number_of_fractional_digits: sh.Raw_Optional<number>): s_target.Simple_Type => ({
        'type': sh.state(['number', {
            'precision': sh.state<s_target.Simple_Type.type_.l_state.number_.precision.l_state>(['exact', {
                'number of fractional digits': sh.optional.null_or_value<number>(number_of_fractional_digits),
                'type': sh.state(['positive natural', null]),
            }])

        }]),
    })

}

export const module_reference = (
    type: string,
): s_target.Module_Reference => ({
    'location': sh.state(['internal', sh.reference(type)]),
    'resulting module': null,
})

export const value_reference = (
    type: string,
    tail: s_target.Value_Path.tail.l_list.L.l_item[],

): s_target.Value_Reference => {
    return {
        'module': {
            'location': sh.state(['internal', sh.reference(type)]),
            'resulting module': null,
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
        results: sh.Raw_Or_Normal_Dictionary<s_target.Value_Results.O.l_dictionary.D.l_entry>,
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

    export const component_external = (imp: string, type: string): s_target.Value => {
        return sh.state(['component', {
            'type': sh.state(['external', {
                'import': sh.reference(imp),
                'module': sh.reference(type),
            }]),
            'results': sh.optional.not_set(),
        }])
    }

    export const dictionary = (type: s_target.Value): s_target.Value => {
        return sh.state(['dictionary', {
            'value': type,
            'benchmark': sh.optional.not_set(),
        }])
    }

    export const group = (properties: sh.Raw_Or_Normal_Dictionary<s_target.Group.l_dictionary.D.l_entry>): s_target.Value => {
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
        results: sh.Raw_Or_Normal_Dictionary<s_target.Value_Results.O.l_dictionary.D.l_entry>,
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
        return sh.state(['simple', sh.state(['global', sh.reference(name)])])
    }

    export const optional = (type: s_target.Value): s_target.Value => {
        return sh.state(['optional', type])
    }

    export const reference_derived = (
        type: string,
        tail: s_target.Value_Path.tail.l_list.L.l_item[],
    ): s_target.Value => {
        const x: s_target.Value_Reference = {
            'module': {
                'location': sh.state(['internal', sh.reference(type)]),
                'resulting module': null,
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

    export const reference_derived_external = (
        imp: string,
        type: string,
        tail: s_target.Value_Path.tail.l_list.L.l_item[],

    ): s_target.Value => {
        const x: s_target.Value_Reference = {
            'module': {
                'location': sh.state(['external', {
                    'import': sh.reference(imp),
                    'module': sh.reference(type),
                }]),
                'resulting module': null,
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
        tail: s_target.Value_Path.tail.l_list.L.l_item[],
        dependency?: "cyclic" | "acyclic",
        results?: sh.Raw_Or_Normal_Dictionary<s_target.Value_Results.O.l_dictionary.D.l_entry>,
    ): s_target.Value => {

        const p_type: s_target.Value.l_state.reference.type_ = sh.state(['selected', {
            'referent': {
                'module': {
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
                'module': {
                    'location': sh.state(['internal', sh.reference(type)]),
                    'resulting node': null,
                    'resulting module': null,
                },
                'path': {
                    'tail': sh.list(tail),
                    'resulting node': null
                }
            },
            'type': p_type,
        }])
    }

    export const reference_stack = (
        type: string,
        tail: s_target.Value_Path.tail.l_list.L.l_item[],
        results?: sh.Raw_Or_Normal_Dictionary<s_target.Value_Results.O.l_dictionary.D.l_entry>,
    ): s_target.Value => {

        const p_type: s_target.Value.l_state.reference.type_ = sh.state(['selected', {
            'dictionary': null,
            'dependency': sh.state(['stack', null]),
            'results': results ? sh.optional.set(
                sh.dictionary(results)) : sh.optional.not_set(),
        }])
        return sh.state(['reference', {
            'referent': {
                'module': {
                    'location': sh.state(['internal', sh.reference(type)]),
                    'resulting node': null,
                    'resulting module': null,
                },
                'path': {
                    'tail': sh.list(tail),
                    'resulting node': null
                }
            },
            'type': p_type,
        }])
    }

    export const reference_external = (
        schema: string,

        type: string,
        tail: s_target.Value_Path.tail.l_list.L.l_item[],
    ): s_target.Value => {

        const p_type: s_target.Value.l_state.reference.type_ = sh.state(['selected', {
            'dictionary': null,
            'dependency': sh.state(['acyclic', null]), // <-- external references cannot be cyclic, but this should not have to be specified here
            'results': sh.optional.not_set(),
        }])
        return sh.state(['reference', {
            'referent': {
                'module': {
                    'location': sh.state(['external', {
                        'import': sh.reference(schema),
                        'module': sh.reference(type),
                    }]),
                    'resulting node': null,
                    'resulting module': null,
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
        options: sh.Raw_Or_Normal_Dictionary<s_target.Value.l_state.state.options.l_dictionary.D.l_entry>
    ): s_target.Value => {
        return sh.state(['state', {
            'options': sh.dictionary(options),
            'results': sh.optional.not_set(),
        }])
    }
    export const state_with_result = (
        options: sh.Raw_Or_Normal_Dictionary<s_target.Value.l_state.state.options.l_dictionary.D.l_entry>,
        results: sh.Raw_Or_Normal_Dictionary<s_target.Value_Results.O.l_dictionary.D.l_entry>,
    ): s_target.Value => {
        return sh.state(['state', {
            'options': sh.dictionary(options),
            'results': sh.optional.set(
                sh.dictionary(results)),
        }])
    }

    export const text_global = (name: string): s_target.Value => {
        return sh.state(['text', sh.state(['global', sh.reference(name)])])
    }

    // export const type_parameter = (name: string): unresolved.Value => {
    //     return _psh.wrap_state(['type parameter', _psh.wrap_reference(name)])
    // }
}


export const schema_import_ = (
    name: string,
): s_target.Schema_Imports.l_dictionary.D.l_entry => {
    return {
        'schema set child': sh.reference(name),
        'schema': null,
    }
}
export const resolver_import_ = (
    name: string,
): s_target.Resolver_Imports.l_dictionary.D.l_entry => {
    return {
        'schema set child': sh.reference(name),
        'resolver': null,
    }
}

export const constrained = (
    signatures: s_target.Resolver.signatures,
    resolvers: s_target.Resolver_Modules,
): s_target.Schema.complexity.l_state.constrained => {
    return {
        'signatures': signatures,
        'modules': resolvers,
    }
}

export const unconstrained = (
): s_target.Schema.complexity.l_state.unconstrained => {
    return null
}
export const schema_ = (
    schema_imports: sh.Raw_Or_Normal_Dictionary<s_target.Schema_Imports.l_dictionary.D.l_entry>,
    resolver_imports: sh.Raw_Or_Normal_Dictionary<s_target.Resolver_Imports.l_dictionary.D.l_entry>,
    globals: s_target.Globals,
    modules: s_target.Modules,
    resolve: null | s_target.Schema.complexity.l_state.constrained,
): s_target.Schemas.l_dictionary.D.l_entry => {
    return sh.state(['schema', {
        'schema imports': sh.dictionary(schema_imports),
        'resolver imports': sh.dictionary(resolver_imports),
        'globals': globals,
        'modules': modules,
        'complexity': resolve === null
            ? sh.state(['unconstrained', null])
            : sh.state(['constrained', resolve])
    }])
}

/**
 * Value Path tail step
 */
export namespace vp {

    export const d = (): s_target.Value_Path.tail.l_list.L.l_item => {
        return sh.state(['dictionary', null])
    }
    export const g = (grp: string): s_target.Value_Path.tail.l_list.L.l_item => {
        return sh.state(['group', sh.reference(grp)])
    }
    export const s = (state: string): s_target.Value_Path.tail.l_list.L.l_item => {
        return sh.state(['state', sh.reference(state)])
    }
    export const o = (): s_target.Value_Path.tail.l_list.L.l_item => {
        return sh.state(['optional', null])
    }
}