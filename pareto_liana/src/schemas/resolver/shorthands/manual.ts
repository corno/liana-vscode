import * as p_t from 'pareto-core/transformer'

import * as sh from '../../../temp/shorthands.js'

import type * as s_target from "../schema.js"

import * as temp_schema from "../../schema/shorthands/manual.js"

export const resolver_types = (
    resolvers: sh.Raw_Or_Normal_Dictionary<s_target.namespaces.resolver.types.Types.D>,
): s_target.namespaces.resolver.types.Types => {
    return sh.dictionary(resolvers)
}


export const type_reference = temp_schema.type_reference


/**
 * lookup selection
 */
export namespace ls {

    export const parameter = (parameter: string): s_target.namespaces.resolver.types.Lookup_Selection => {
        return {
            'type': sh.state(['parameter', sh.reference(parameter)]),
        }
    }

    export namespace acyclic {

        export const siblings = (): s_target.namespaces.resolver.types.Lookup_Selection => {
            return {
                'type': sh.state(['acyclic', sh.state(['siblings', null])]),
            }
        }

        export const resolved_dictionary = (
            value_selection: s_target.namespaces.resolver.types.Guaranteed_Value_Selection
        ): s_target.namespaces.resolver.types.Lookup_Selection => {
            return {
                'type': sh.state(['acyclic', sh.state(['resolved dictionary', {
                    'selection': value_selection,
                }])]),
            }
        }
    }

    export namespace cyclic {

        export const siblings = (): s_target.namespaces.resolver.types.Lookup_Selection => {
            return {
                'type': sh.state(['cyclic', sh.state(['siblings', null])]),
            }
        }
    }

}

/**
 * node resolver lookup arguments
 */
export namespace al {

    export namespace acyclic {

        export const not_set = (
        ): s_target.namespaces.resolver.types.Value.component.arguments_.O.lookups.O.D => {
            return sh.state(['acyclic', null])
        }

        /**
         * this one is only usable in the context of an ordered dictionary
         */
        export const siblings = (): s_target.namespaces.resolver.types.Value.component.arguments_.O.lookups.O.D => {
            return sh.state(['selection', {
                'type': sh.state(['acyclic', sh.state(['siblings', null])]),
            }])
        }

        export const dictionary = (value_selection: s_target.namespaces.resolver.types.Guaranteed_Value_Selection): s_target.namespaces.resolver.types.Value.component.arguments_.O.lookups.O.D => {
            return sh.state(['selection', {
                'type': sh.state(['acyclic', sh.state(['resolved dictionary', {
                    'selection': value_selection,
                }])]),
            }])
        }

    }

    export namespace cyclic {


        /**
         * this one is only usable in the context of a dictionary (ordered or not)
         */
        export const siblings = (

        ): s_target.namespaces.resolver.types.Value.component.arguments_.O.lookups.O.D => {
            return sh.state(['selection', {
                'type': sh.state(['cyclic', sh.state(['siblings', null])]),
            }])
        }


        export const not_set = (
        ): s_target.namespaces.resolver.types.Value.component.arguments_.O.lookups.O.D => {
            return sh.state(['cyclic', null])
        }
    }


    /**
     * selects a lookup parameter of this resolver and passes it to the next resolver
     */
    export const parameter = (parameter: string): s_target.namespaces.resolver.types.Value.component.arguments_.O.lookups.O.D => {
        return sh.state(['selection', {
            'type': sh.state(['parameter', sh.reference(parameter)]),
        }])
    }



}

/**
 * value selection path step
 */
export namespace rvs {

    export const component = (
    ): s_target.namespaces.resolver.types.Relative_Value_Selection.path.L => {
        return sh.state(['component', null])
    }

    export const group = (
        property: string,
    ): s_target.namespaces.resolver.types.Relative_Value_Selection.path.L => {
        return sh.state(['group', sh.reference(property)])
    }

    export const reference = (
    ): s_target.namespaces.resolver.types.Relative_Value_Selection.path.L => {
        return sh.state(['reference', {
        }])
    }

}

/**
 * optional value initialization
 */
export namespace ovi {

    export const not_set = (

    ): s_target.namespaces.resolver.types.Optional_Value_Initialization => {
        return sh.state(['not set', null])
    }

    export const set = (
        value: s_target.namespaces.resolver.types.Guaranteed_Value_Selection,
    ): s_target.namespaces.resolver.types.Optional_Value_Initialization => {
        return sh.state(['set', value])
    }

    export const selection = (
        selection: s_target.namespaces.resolver.types.Possible_Value_Selection,
    ): s_target.namespaces.resolver.types.Optional_Value_Initialization => {
        return sh.state(['selection', selection])
    }

}

/**
 * possible value selection
 */
export namespace pvs {
    export const state = (
        state: string,
    ): s_target.namespaces.resolver.types.Possible_Value_Selection => {
        return sh.state<s_target.namespaces.resolver.types.Possible_Value_Selection>(['result', sh.state<s_target.namespaces.resolver.types.Possible_Value_Selection.result>(['state', {
            'property': sh.reference(state),
        }])])
    }

    export const optional_value = (
        optional_value: string,
    ): s_target.namespaces.resolver.types.Possible_Value_Selection => {
        return sh.state<s_target.namespaces.resolver.types.Possible_Value_Selection>(['result', sh.state<s_target.namespaces.resolver.types.Possible_Value_Selection.result>(['optional value', {
            'property': sh.reference(optional_value),
        }])])
    }

    export const parameter = (
        parameter: string,
    ): s_target.namespaces.resolver.types.Possible_Value_Selection => {
        return sh.state(['parameter', sh.reference(parameter)])
    }

}

/**
 * guaranteed value selection
 */
export namespace gvs {

    export const component = (
        component: string,
        constraint: string,
        tail: s_target.namespaces.resolver.types.Relative_Value_Selection.path.L[],
    ): s_target.namespaces.resolver.types.Guaranteed_Value_Selection => {
        return {
            'start': sh.state(['constraint', sh.state<s_target.namespaces.resolver.types.Guaranteed_Value_Selection.start.constraint>(['component', {
                'property': sh.reference(component),
                'constraint': sh.reference(constraint),
            }])]),
            'tail': {
                'path': sh.list(tail),
            },
        }
    }

    export const reference = (
        reference: string,
        constraint: string,
        tail: s_target.namespaces.resolver.types.Relative_Value_Selection.path.L[],
    ): s_target.namespaces.resolver.types.Guaranteed_Value_Selection => {
        return {
            'start': sh.state(['constraint', sh.state<s_target.namespaces.resolver.types.Guaranteed_Value_Selection.start.constraint>(['reference', {
                'property': sh.reference(reference),
                'constraint': sh.reference(constraint),
            }])]),
            'tail': {
                'path': sh.list(tail),
            },
        }
    }

    export const list = (
        list: string,
        tail: s_target.namespaces.resolver.types.Relative_Value_Selection.path.L[],
    ): s_target.namespaces.resolver.types.Guaranteed_Value_Selection => {
        return {
            'start': sh.state<s_target.namespaces.resolver.types.Guaranteed_Value_Selection.start>(['result', sh.state<s_target.namespaces.resolver.types.Guaranteed_Value_Selection.start.result>(['list', {
                'property': sh.reference(list),
            }])]),
            'tail': {
                'path': sh.list(tail),
            },
        }
    }

    export const state = (
        state: string,
        tail: s_target.namespaces.resolver.types.Relative_Value_Selection.path.L[],
    ): s_target.namespaces.resolver.types.Guaranteed_Value_Selection => {
        return {
            'start': sh.state<s_target.namespaces.resolver.types.Guaranteed_Value_Selection.start>(['result', sh.state<s_target.namespaces.resolver.types.Possible_Value_Selection.result>(['state', {
                'property': sh.reference(state),
            }])]),
            'tail': {
                'path': sh.list(tail),
            },
        }
    }

    export const optional_value = (
        optional_value: string,
        tail: s_target.namespaces.resolver.types.Relative_Value_Selection.path.L[],
    ): s_target.namespaces.resolver.types.Guaranteed_Value_Selection => {
        return {
            'start': sh.state<s_target.namespaces.resolver.types.Guaranteed_Value_Selection.start>(['result', sh.state<s_target.namespaces.resolver.types.Possible_Value_Selection.result>(['optional value', {
                'property': sh.reference(optional_value),
            }])]),
            'tail': {
                'path': sh.list(tail),
            },
        }
    }

    export const parameter = (
        parameter: string,
        tail: s_target.namespaces.resolver.types.Relative_Value_Selection.path.L[],
    ): s_target.namespaces.resolver.types.Guaranteed_Value_Selection => {
        return {
            'start': sh.state<s_target.namespaces.resolver.types.Guaranteed_Value_Selection.start>(['parameter', sh.reference(parameter)]),
            'tail': {
                'path': sh.list(tail),
            },
        }
    }

    export const list_cursor = (
        tail: s_target.namespaces.resolver.types.Relative_Value_Selection.path.L[],
    ): s_target.namespaces.resolver.types.Guaranteed_Value_Selection => {
        return {
            'start': sh.state(['list cursor', null]),
            'tail': {
                'path': sh.list(tail),
            },
        }
    }

    export const linked_entry = (
        tail: s_target.namespaces.resolver.types.Relative_Value_Selection.path.L[],
    ): s_target.namespaces.resolver.types.Guaranteed_Value_Selection => {
        return {
            'start': sh.state(['linked entry', null]),
            'tail': {
                'path': sh.list(tail),
            },
        }
    }

    export const sibling = (
        sibling: string,
        tail: s_target.namespaces.resolver.types.Relative_Value_Selection.path.L[],
    ): s_target.namespaces.resolver.types.Guaranteed_Value_Selection => {
        return {
            'start': sh.state(['sibling', sh.reference(sibling)]),
            'tail': {
                'path': sh.list(tail),
            },
        }
    }

    export const parent_sibling = (
        parent_sibling: string,
        tail: s_target.namespaces.resolver.types.Relative_Value_Selection.path.L[],
    ): s_target.namespaces.resolver.types.Guaranteed_Value_Selection => {
        return {
            'start': sh.state(['parent sibling', sh.reference(parent_sibling)]),
            'tail': {
                'path': sh.list(tail),
            },
        }
    }

    export const option_constraint = (
        constraint: string,
        tail: s_target.namespaces.resolver.types.Relative_Value_Selection.path.L[],
    ): s_target.namespaces.resolver.types.Guaranteed_Value_Selection => {
        return {
            'start': sh.state(['option constraint', sh.reference(constraint)]),
            'tail': {
                'path': sh.list(tail),
            },
        }
    }

}

/**
 * node resolver value argument
 */
export namespace av {

    export const parameter = (
        parameter: string,
    ): s_target.namespaces.resolver.types.Value.component.arguments_.O.types.O.D => {
        return sh.state(['parameter', sh.reference(parameter)])
    }

    export const required = (
        value: s_target.namespaces.resolver.types.Guaranteed_Value_Selection,
    ): s_target.namespaces.resolver.types.Value.component.arguments_.O.types.O.D => {
        return sh.state(['required', value])
    }

    export const optional = (
        value: s_target.namespaces.resolver.types.Optional_Value_Initialization,
    ): s_target.namespaces.resolver.types.Value.component.arguments_.O.types.O.D => {
        return sh.state(['optional', value])
    }

}

export const option = (
    resolver: s_target.namespaces.resolver.types.Value,
): s_target.namespaces.resolver.types.Value.state.options.D => {
    return {
        'constraints': sh.optional.not_set(),
        'resolver': resolver,
        'result': sh.optional.not_set<s_target.namespaces.resolver.types.Result_Selection>(),
    }
}

export const option_constrained = (
    constraints: sh.Raw_Or_Normal_Dictionary<s_target.namespaces.resolver.types.Option_Constraints.O.D>,
    resolver: s_target.namespaces.resolver.types.Value,
): s_target.namespaces.resolver.types.Value.state.options.D => {
    return {
        'constraints': sh.optional.set(sh.dictionary(constraints)),
        'resolver': resolver,
        'result': sh.optional.not_set<s_target.namespaces.resolver.types.Result_Selection>(),
    }
}

/**
 * option constraint
 */
export namespace oc {

    export const state = (
        value_selection: s_target.namespaces.resolver.types.Guaranteed_Value_Selection,
        state: string,
    ): s_target.namespaces.resolver.types.Option_Constraints.O.D => {
        return sh.state(['state', {
            'selection': value_selection,
            'option': sh.reference(state),
        }])
    }

    export const assert_set = (
        possibly_optional: s_target.namespaces.resolver.types.Possible_Value_Selection,
    ): s_target.namespaces.resolver.types.Option_Constraints.O.D => {
        return sh.state(['assert is set', possibly_optional])
    }

}

/**
 * value constraint resolvers
 */
export namespace vcr {

    /**
     * starting from the value
     */
    export const value = (
        value_selection_tail: s_target.namespaces.resolver.types.Relative_Value_Selection.path.L[],
        state?: string,
    ): s_target.namespaces.resolver.types.Value_Constraints.D => {
        return {
            'start': sh.state(['value', null]),
            'constraint': {
                'selection': {
                    'path': sh.list(value_selection_tail),
                },
                'type': state === undefined
                    ? sh.state(['optional value', {
                    }])
                    : sh.state(['state', {
                        'option': sh.reference(state),
                    }])
            },
        }
    }

    export const constraint = (
        constraint: string,
        value_selection_tail: s_target.namespaces.resolver.types.Relative_Value_Selection.path.L[],
        state?: string,
    ): s_target.namespaces.resolver.types.Value_Constraints.D => {
        return {
            'start': sh.state(['sibling', sh.reference(constraint)]),
            'constraint': {
                'selection': {
                    'path': sh.list(value_selection_tail),
                },
                'type': state === undefined
                    ? sh.state(['optional value', {
                    }])
                    : sh.state(['state', {
                        'option': sh.reference(state),
                    }])
            },
        }
    }

}

/**
 * node resolver
 */
export namespace r {

    export const simple = (): s_target.namespaces.resolver.types.Value => {
        return sh.state(['simple', null])
    }

    export const component = (
        type: string,
        types: null | sh.Raw_Or_Normal_Dictionary<s_target.namespaces.resolver.types.Value.component.arguments_.O.types.O.D>,
        lookups: null | sh.Raw_Or_Normal_Dictionary<s_target.namespaces.resolver.types.Value.component.arguments_.O.lookups.O.D>,
    ): s_target.namespaces.resolver.types.Value => {
        return sh.state(['component', {
            'location': sh.state(['internal', sh.reference(type)]),
            'arguments': sh.optional.set({
                'types': types === null
                    ? sh.optional.not_set()
                    : sh.optional.set(
                        sh.dictionary(types)
                    ),
                'lookups': lookups === null ? sh.optional.not_set() : sh.optional.set(
                    sh.dictionary(lookups)),
            }),
            'constraints': sh.optional.not_set<s_target.namespaces.resolver.types.Value_Constraints>(),
        }])
    }
    export const component_constrained = (
        type: string,
        types: null | sh.Raw_Or_Normal_Dictionary<s_target.namespaces.resolver.types.Value.component.arguments_.O.types.O.D>,
        lookups: null | sh.Raw_Or_Normal_Dictionary<s_target.namespaces.resolver.types.Value.component.arguments_.O.lookups.O.D>,
        constraints: sh.Raw_Or_Normal_Dictionary<s_target.namespaces.resolver.types.Value_Constraints.D>,
    ): s_target.namespaces.resolver.types.Value => {
        return sh.state(['component', {
            'location': sh.state(['internal', sh.reference(type)]),
            'arguments': sh.optional.set({
                'types': types === null ? sh.optional.not_set() : sh.optional.set(
                    sh.dictionary(types)),
                'lookups': lookups === null ? sh.optional.not_set() : sh.optional.set(
                    sh.dictionary(lookups)),
            }),
            'constraints': sh.optional.set(sh.dictionary(constraints)),
        }])
    }

    export const dictionary = (resolver: s_target.namespaces.resolver.types.Value): s_target.namespaces.resolver.types.Value => {
        return sh.state(['dictionary', {
            'resolver': resolver,
            'benchmark': sh.optional.not_set(),
        }])
    }

    export const dictionary_linked = (
        dense: 'dense' | 'sparse',
        selection: s_target.namespaces.resolver.types.Guaranteed_Value_Selection,
        resolver: s_target.namespaces.resolver.types.Value,
    ): s_target.namespaces.resolver.types.Value => {
        return sh.state(['dictionary', {
            'resolver': resolver,
            'benchmark': sh.optional.set({
                'selection': selection,
                'coverage': dense === 'dense' ? ['dense', null] : ['sparse', null],
            }),
        }])
    }

    export const group = (
        properties: sh.Raw_Or_Normal_Dictionary<s_target.namespaces.resolver.types.Value_Group.D.resolver> //FIXME: remove the 'this entry' step
    ): s_target.namespaces.resolver.types.Value => {
        const temp_dict = sh.dictionary(properties)
        return sh.state(['group', p_t.from.dictionary(temp_dict).map(
            ($) => ({ 'resolver': $ })
        )])
    }

    export const list = (
        type_resolver: s_target.namespaces.resolver.types.Value
    ): s_target.namespaces.resolver.types.Value => {
        return sh.state(['list', {
            'resolver': type_resolver,
            'result': sh.optional.not_set<s_target.namespaces.resolver.types.Value.list.result.O>(),
        }])
    }
    export const list_with_result = (
        type_resolver: s_target.namespaces.resolver.types.Value,
        result: s_target.namespaces.resolver.types.Value_List_Result,

    ): s_target.namespaces.resolver.types.Value => {
        return sh.state(['list', {
            'resolver': type_resolver,
            'result': sh.optional.set(result),
        }])
    }

    export const nothing = (): s_target.namespaces.resolver.types.Value => {
        return sh.state(['nothing', null])
    }

    export const optional = (
        type_resolver: s_target.namespaces.resolver.types.Value
    ): s_target.namespaces.resolver.types.Value => {
        return sh.state(['optional', {
            'constraints': sh.optional.not_set<s_target.namespaces.resolver.types.Option_Constraints.O>(),
            'not set constraints': sh.optional.not_set(),
            'resolver': type_resolver,
            'result': sh.optional.not_set<s_target.namespaces.resolver.types.Result_Selection>(),
        }])
    }

    export const optional_constrained = (
        constraints: sh.Raw_Or_Normal_Dictionary<s_target.namespaces.resolver.types.Option_Constraints.O.D>,
        type_resolver: s_target.namespaces.resolver.types.Value
    ): s_target.namespaces.resolver.types.Value => {
        return sh.state(['optional', {
            'not set constraints': sh.optional.not_set(),
            'constraints': sh.optional.set(sh.dictionary(constraints)),
            'resolver': type_resolver,
            'result': sh.optional.not_set<s_target.namespaces.resolver.types.Result_Selection>(),
        }])
    }

    export const reference = (
        lookup_selection: s_target.namespaces.resolver.types.Lookup_Selection,
        constraints?: sh.Raw_Or_Normal_Dictionary<s_target.namespaces.resolver.types.Value_Constraints.D>,
    ): s_target.namespaces.resolver.types.Value => {
        return sh.state(['reference', {
            'type': {
                'lookup': lookup_selection,
                'constraints': sh.optional.set(sh.dictionary(constraints === undefined
                    ? {}
                    : constraints
                )),
            }
        }])
    }

    export const state = (
        states: sh.Raw_Or_Normal_Dictionary<s_target.namespaces.resolver.types.Value.state.options.D>
    ): s_target.namespaces.resolver.types.Value => {
        return sh.state(['state', {
            'options': sh.dictionary(states),
        }])
    }
}

export const resolver = (
    value_resolver: s_target.namespaces.resolver.types.Value
): s_target.namespaces.resolver.types.Types.D => {
    return {
        'root value resolver': value_resolver,
    }
}