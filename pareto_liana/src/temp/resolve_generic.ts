import * as p_ from 'pareto-core/refiner'
import type * as p_di from 'pareto-core/schema'
import type * as p_ri from 'pareto-core/refiner'

import p_unreachable_code_path from 'pareto-core/transformer/specials/unreachable_code_path'

import { type Abort } from 'pareto-core/__internal/Abort'

import * as gen_loc from "astn-runtime/modules/deserialization/schemas/location/schema"
import * as gen_resolve from "liana-runtime/modules/resolved_document_deserialization/schemas/resolving/schema"

//types

export type Unresolved_Reference = {
    'l location': gen_loc.Range
    'l reference': string
}

export type Resolved_Reference<T> = {
    'l entry': T,
    'l id': string,
}

export type Resolved_Stack_Reference<T> = {
    'l entry': T,
    'l id': string,
    'l up steps': number,
}

//functions

export const resolve_dense_dictionary = <Unresolved extends p_di.Value, Resolved extends p_di.Value, Benchmark extends p_di.Value>(
    $: p_di.Dictionary<Unresolved>,
    location: gen_loc.Range,
    abort: Abort<gen_resolve.Error>,
    benchmark: p_di.Dictionary<Benchmark>,
    handle_entry: (
        $: Unresolved,
        id: string,
        $acyclic: p_ri.lookup.Acyclic<Resolved>,
        $cyclic: p_ri.lookup.Cyclic<Resolved>,
    ) => Resolved,
): p_di.Dictionary<Resolved> => {
    // const xx = p_temp.from.dictionary(
    //     p_temp.from.dictionary(benchmark).map_optionally(
    //         (_, id) => p_temp.from.dictionary($).get_possible_entry(
    //             id,
    //             () => p_.literal.not_set<null>(),
    //             () => p_.literal.set(null),
    //         )
    //     )
    // ).on_has_entries(
    //     ($) => abort({
    //         'type': ['missing required entries', $],
    //         'location': location,
    //     }),
    //     () => null
    // )
    return p_.from.dictionary($).resolve(
        handle_entry
    )
}
export namespace abort {

    export const state_constraint_found_expected = <T extends p_di.State>(
        found: string,
        expected: T,
        location: gen_loc.Range,
        abort: Abort<gen_resolve.Error>,
    ) => abort({
        'type': ['constraint', ['state', {
            'expected': expected[0],
            'found': found,
        }]],
        'location': location,
    })
    export const state_constraint_expected_found = <T extends p_di.State>(
        expected: string,
        found: T,
        location: gen_loc.Range,
        abort: Abort<gen_resolve.Error>,
    ) => abort({
        'type': ['constraint', ['state', {
            'expected': expected,
            'found': found[0],
        }]],
        'location': location,
    })

    export const same_node_constraint = (
        property: string,
        location: gen_loc.Range,
        abort: Abort<gen_resolve.Error>,
    ) => abort({
        'type': ['constraint', ['same node', property]],
        'location': location,
    })

    export const is_set_assertion = (
        parameter: string,
        location: gen_loc.Range,
        abort: Abort<gen_resolve.Error>,
    ) => abort({
        'type': ['constraint', ['optional value is not set', null]],
        'location': location,
    })

    export const parameter_is_set_assertion = (
        parameter: string,
        location: gen_loc.Range,
        abort: Abort<gen_resolve.Error>,
    ) => abort({
        'type': ['constraint', ['optional value is not set', null]],
        'location': location,
    })
}

export const get_entry_acyclic = <T extends p_di.Value>(
    lookup: p_ri.lookup.Acyclic<T>,
    ref: Unresolved_Reference,
    abort: Abort<gen_resolve.Error>,
): Resolved_Reference<T> => {
    return {
        'l entry': lookup.get_entry(
            ref['l reference'],
            {
                cycle_detected: () => abort({
                    'type': ['lookup', ['cycle detected', null]],
                    'location': ref['l location'],
                }),
                no_such_entry: () => abort({
                    'type': ['lookup', ['no such entry', ref['l reference']]],
                    'location': ref['l location'],
                }),
                no_context_lookup: () => abort({
                    'type': ['lookup', ['no context lookup', null]],
                    'location': ref['l location'],
                })
            }
        ),
        'l id': ref['l reference'],
    }
}

export const get_entry_cyclic = <
    T extends p_di.Value
>(
    lookup: p_ri.lookup.Cyclic<T>,
    reference: Unresolved_Reference,
    abort: Abort<gen_resolve.Error>,
): Resolved_Reference<p_di.Circular_Dependency<T>> => {
    return {
        'l id': reference['l reference'],
        'l entry': lookup.get_entry(
            reference['l reference'],
            {
                accessing_cyclic_sibling_before_it_is_resolved: () => p_unreachable_code_path("this should not happen, this means there is a bug in the implementation of the cyclic lookup, it should not allow access to cyclic entries before they are resolved"),
                no_such_entry: () => abort({
                    'type': ['lookup', ['no such entry', reference['l reference']]],
                    'location': reference['l location'],
                }),
                no_context_lookup: () => abort({
                    'type': ['lookup', ['no context lookup', null]],
                    'location': reference['l location'],
                })
            }
        )
    }
}

export const get_entry_stack = <
    T extends p_di.Value
>(
    stack: p_ri.lookup.Stack<T>,
    reference: Unresolved_Reference,
    abort: Abort<gen_resolve.Error>,
): Resolved_Stack_Reference<T> => {
    return {
        'l id': reference['l reference'],
        'l up steps': stack.get_entry_depth(
            reference['l reference'],
            {
                cycle_detected: () => abort({
                    'type': ['lookup', ['cycle detected', null]],
                    'location': reference['l location'],
                }),
                no_such_entry: () => abort({
                    'type': ['lookup', ['no such entry', reference['l reference']]],
                    'location': reference['l location'],
                }),
                no_context_lookup: () => abort({
                    'type': ['lookup', ['no context lookup', null]],
                    'location': reference['l location'],
                })
            },
        ),
        'l entry': stack.get_entry(
            reference['l reference'],
            {
                cycle_detected: () => abort({
                    'type': ['lookup', ['cycle detected', null]],
                    'location': reference['l location'],
                }),
                no_such_entry: () => abort({
                    'type': ['lookup', ['no such entry', reference['l reference']]],
                    'location': reference['l location'],
                }),
                no_context_lookup: () => abort({
                    'type': ['lookup', ['no context lookup', null]],
                    'location': reference['l location'],
                })
            }
        )
    }
}

export const temp_assert = <
    Type extends p_di.Value,
    Error extends p_di.Value
>(
    condition: () => p_di.Optional_Value<Error>,
    callback: () => Type,
    abort: Abort<Error>,
): Type => {
    const c = condition().__get_raw()
    return c === null ? callback() : abort(c[0])
}

export const temp_optional_map = <
    In extends p_di.Value,
    Out extends p_di.Value
>(
    $: p_di.Optional_Value<In>,
    callback: ($: In) => Out,
): p_di.Optional_Value<Out> => p_.from.optional($).map(
    callback
)

export const temp_resolve = <
    T extends p_di.Value,
    Resolved extends p_di.Value
>(
    $: p_di.Dictionary<T>,
    handle_entry: (
        $: T,
        id: string,
        acyclic_lookup: p_ri.lookup.Acyclic<Resolved>,
        cyclic_lookup: p_ri.lookup.Cyclic<Resolved>,
    ) => Resolved,
): p_di.Dictionary<Resolved> => {
    return p_.from.dictionary($).resolve(
        handle_entry
    )
}

export const temp_map_list_with_state = <
    T extends p_di.Value,
    Target_Item extends p_di.Value,
    State extends p_di.Value,
    Result_Type extends p_di.Group
>(
    $: p_di.List<T>,
    initial_state: State,
    handle_item: (
        value: T,
        state: State
    ) => Target_Item,
    update_state: (
        value: Target_Item,
        state: State
    ) => State,
    wrapup: (
        final_list: p_di.List<Target_Item>,
        final_state: State
    ) => Result_Type,
): Result_Type => p_.from.list($).map_with_state(
    initial_state,
    handle_item,
    update_state,
    wrapup
)
