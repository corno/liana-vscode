import * as p_ from 'pareto-core/transformer'

import type * as p_i from 'pareto-core/transformer'
import type * as p_di from 'pareto-core/schema'
import p_unreachable_code_path from 'pareto-core/transformer/specials/unreachable_code_path'
import * as p_temp_dictionary from 'pareto-core/temp/Generic_Dictionary'
import * as p_lookup from 'pareto-core/transformer/specials/lookup'

import type * as s_in from "../../../schemas/unmarshall_result/schema.js"
import type * as s_in_definition from "pareto-liana/schemas/liana_next_schema/authoring_schema"
import type * as s_out from "../../../schemas/resolve_result/schema.js"
import { component_type } from '../../liana_schema/select_component.js'

namespace p_i_temp {

    export type Transformer_With_Lookups_And_Parameter<
        Input extends p_di.Value,
        Result extends p_di.Value,
        My_Lookups,
        Parameter extends p_di.Value,
    > = (
        $: Input,
        $l: My_Lookups,
        $p: Parameter
    ) => Result

    export const from_option_decide = <T extends p_di.Value, R>(
        $: p_di.Optional_Value<T>,
        set: (value: T) => R,
        not_set: () => R
    ): R => {
        const raw = $.__get_raw()
        return raw === null
            ? not_set()
            : set(raw[0])
    }

}

namespace temp {

    export type Acyclic_Parameter_Resolve_Status =
        | ['to be implemented', null]
        | ['resolved', p_i.lookup.Acyclic<s_out.Entry>]
        | ['not found because of root', null]
        | ['selection', Lookup]

    export type Cyclic_Parameter_Resolve_Status =
        | ['to be implemented', null]
        | ['resolved', p_i.lookup.Cyclic<s_out.Entry>]
        | ['not found because of root', null]
        | ['selection', Lookup]

    type Lookup_Parameters = {
        'acyclic': p_temp_dictionary.Generic_Dictionary<Acyclic_Parameter_Resolve_Status>
        'cyclic': p_temp_dictionary.Generic_Dictionary<Cyclic_Parameter_Resolve_Status>
    }

    export type Lookups = {
        'implementations'?: p_di.List<Implementation>
        'parameters': Lookup_Parameters
        'siblings': {
            'acyclic': p_i.lookup.Acyclic<s_out.Entry>
            'cyclic': p_i.lookup.Cyclic<s_out.Entry>
            'keys'?: p_di.List<string>
            'dictionary'?: s_in.Dictionary | undefined
        }
        'properties'?: p_i.lookup.Acyclic<s_out.Property> | undefined
        'parent properties'?: p_i.lookup.Acyclic<s_out.Property> | undefined
        'option constraints'?: p_di.Dictionary<s_out.Selection>
        'sibling option constraints'?: p_i.lookup.Acyclic<s_out.Selection>
        'list cursor'?: s_out.Selection
        'linked entry'?: s_out.Selection
    }

    export type Type_Parameter_Resolve_Status =
        | ['constraint failed', string]
        | ['not found because of root', null]
        | ['not set', null]
        | ['to be implemented', null]
        | ['resolved', s_out.Value]
        | ['unavailable', null]
        | ['cycle', p_di.List<string>]

    export type Lookup =
        | ['constraint failed', string]
        | ['acyclic', p_i.lookup.Acyclic<s_out.Entry>, p_di.List<string>?, (s_in.Dictionary | undefined)?]
        | ['cyclic', p_i.lookup.Cyclic<s_out.Entry>, p_di.List<string>?, (s_in.Dictionary | undefined)?]
        | ['unavailable', null]
        | ['cycle', p_di.List<string>]

    export type Context = {
        'lookups': Lookups
        'types': p_di.Dictionary<Type_Parameter_Resolve_Status>
    }

}

type Implementation = {
    namespace: s_in_definition.namespaces.resolver.types.Resolver
    definition: s_in_definition.namespaces.resolver.types.Resolver.types.D
}

const Implementations = (namespace: s_in_definition.namespaces.resolver.types.Resolver): p_di.List<Implementation> =>
    p_.literal.segmented_list([
        p_.from.dictionary(namespace.types).convert_to_list(definition => ({ namespace, definition })),
        p_.from.dictionary(namespace.namespaces).flatten_to_list(child => Implementations(child.value)),
    ])

const Implementation_For = (
    implementations: p_di.List<Implementation>,
    declaration: s_in_definition.namespaces.declarations.types.Declaration,
): Implementation => p_.from.optional(p_.from.list(implementations).reduce_to_any_value<p_di.Optional_Value<Implementation>>(
    p_.literal.not_set(),
    (entry, previous) => entry.definition.benchmark.value === declaration ? p_.literal.set(entry) : previous,
)).decide($ => $, () => p_unreachable_code_path('missing implementation for selected resolver declaration'))

export const Document: p_i_temp.Transformer_With_Lookups_And_Parameter<
    s_in.Document,
    s_out.Document,
    temp.Lookups,
    {
        'definition': s_in_definition.namespaces.resolver.types.Resolver.types.D
        'resolvers': s_in_definition.types.Type_Specification.schema
        'type parameters': p_di.Dictionary<temp.Type_Parameter_Resolve_Status>
    }
> = ($, $l, $p) => ({
    'unmarshalled': $,
    'content': Value(
        $.content,
        { ...$l, implementations: Implementations($p.resolvers.resolver.implementations) },
        {
            'definition': $p.definition.value['root value resolver'],
            'resolver': $p.resolvers.resolver.implementations,
            'type parameters': $p['type parameters'],
        }
    )
})

const Unavailable = (): s_out.Selection => ['unavailable', null]

// Lookup environments contain functions and therefore are not pareto-core value dictionaries.
const Lookup_Parameter = <T, R>(
    $: p_temp_dictionary.Generic_Dictionary<T>,
    id: string,
    found: ($: T) => R,
    missing: () => R
): R => {
    const select = (index: number): R => {
        const entry = $.__get_raw()[index]
        return entry === undefined ? missing() : entry[0] === id ? found(entry[1]) : select(index + 1)
    }
    return select(0)
}

const Parameter = ($: temp.Type_Parameter_Resolve_Status): s_out.Selection => {
    switch ($[0]) {
        case 'not found because of root':
        case 'to be implemented': return Unavailable()
        default: return $
    }
}

const Property = (
    id: string,
    lookup: p_i.lookup.Acyclic<s_out.Property> | undefined
): s_out.Selection => lookup === undefined ? Unavailable() : p_.from.optional(lookup.get_entry(id, {
    no_context_lookup: () => p_.literal.not_set(),
    cycle_detected: () => p_.literal.not_set(),
})).decide(
    ($) => {
        switch ($['unmarshall result'][0]) {
            case 'error': return Unavailable()
            case 'success': return ['resolved', $['unmarshall result'][1].resolved]
            default: return p_.exhaustive($['unmarshall result'][0])
        }
    },
    Unavailable
)

const Entry = ($: s_out.Entry): s_out.Selection => {
    if ($['resolution error'] !== undefined) return $['resolution error']
    switch ($['unmarshall result'][0]) {
        case 'error': return Unavailable()
        case 'success': {
            const value = $['unmarshall result'][1].value
            switch (value[0]) {
                case 'not set': return ['not set', null]
                case 'set': return ['resolved', value[1]]
                default: return p_.exhaustive(value[0])
            }
        }
        default: return p_.exhaustive($['unmarshall result'][0])
    }
}

const Reference = ($: s_out.Reference): s_out.Selection => {
    switch ($[0]) {
        case 'derived': return $[1]
        case 'selected': {
            const status = $[1]['resolve status']
            switch (status[0]) {
                case 'selected': return status[1]
                case 'missing': return Unavailable()
                case 'cyclic': return p_.from.optional(status[1].get_circular_dependent()).decide(Entry, Unavailable)
                default: return p_.exhaustive(status[0])
            }
        }
        default: return p_.exhaustive($[0])
    }
}

const Select = (
    $: s_out.Selection,
    select: ($: s_out.Resolved_Value_Type) => s_out.Selection
): s_out.Selection => {
    switch ($[0]) {
        case 'constraint failed': return Unavailable()
        case 'resolved': {
            const result = $[1]['unmarshall result']
            switch (result[0]) {
                case 'error': return Unavailable()
                case 'success': return select(result[1])
                default: return p_.exhaustive(result[0])
            }
        }
        default: return $
    }
}

const Referenced_Value = ($: s_out.Selection, definition: s_in_definition.namespaces.structure.types.Value): s_out.Selection => {
    if ($[0] !== 'resolved' || definition[0] === 'component') return $
    const result = $[1]['unmarshall result']
    return result[0] === 'success' && result[1][0] === 'component'
        ? Referenced_Value(['resolved', result[1][1].value], definition)
        : $
}

const State_Result = (value: s_out.Value, expected: s_in_definition.namespaces.structure.types.Value.state): s_out.Selection => {
    const result = value['unmarshall result']
    if (result[0] === 'error') return Unavailable()
    if (result[1][0] !== 'state' || value.definition[0] !== 'state') {
        return ['constraint failed', 'expected a state value']
    }
    const state = result[1][1]
    return p_.from.optional(value.definition[1].constraints.definition.result).decide(
        actual => p_.from.optional(expected.result).decide(
            expected => actual.path.tail.result === expected.path.tail.result ? state.result
                : ['constraint failed', 'state result type does not match the declared producer result type'],
            () => ['constraint failed', 'the selected state does not declare a result'],
        ),
        () => ['constraint failed', 'the selected state does not declare a result'],
    )
}

const Relative = (
    $: s_in_definition.namespaces.resolver.types.Relative_Value_Selection,
    start: s_out.Selection
): s_out.Selection => {
    const path = (steps: s_in_definition.namespaces.resolver.types.Relative_Value_Selection.path.value, current: s_out.Selection): s_out.Selection =>
        p_.from.list(steps).on_has_first_item(
            (item, rest) => {
                const step = item.value.value
                const constraint = (id: string): s_out.Selection => current[0] === 'resolved'
                    ? p_.from.dictionary(current[1].constraints).get_possible_entry(id, $ => $, Unavailable)
                    : current
                const next: s_out.Selection = step[0] === 'component constraint' ? Select(current, value =>
                    value[0] === 'component'
                        ? p_.from.dictionary(value[1].constraints).get_possible_entry(step[1].value.name['l id'], $ => $, Unavailable) : Unavailable())
                : step[0] === 'option constraint' ? Select(current, value =>
                    value[0] === 'state' && value[1].unmarshalled.derived['option status'][0] === 'set'
                    && value[1].unmarshalled.derived['option status'][1].option === step[1].value.option['l id']
                        ? constraint(step[1].value.constraint['l id']) : ['constraint failed', 'unexpected state option'])
                : step[0] === 'optional value constraint' ? constraint(step[1].value['l id'])
                : step[0] === 'reference constraint' ? Select(current, value =>
                    value[0] === 'reference' && value[1][0] === 'selected'
                        ? p_.from.dictionary(value[1][1].constraints).get_possible_entry(step[1].value['l id'], $ => $, Unavailable)
                        : Unavailable())
                : step[0] === 'benchmark link' ? current[0] === 'resolved' ? current[1]['benchmark link'] ?? Unavailable() : current
                : step[0] === 'state result'
                ? current[0] === 'resolved' ? State_Result(current[1], step[1].constraints.definition) : Select(current, Unavailable)
                : Select(current, ($) => {
                switch (step[0]) {
                    case 'component':
                    case 'cyclic component': return $[0] === 'component' ? ['resolved', $[1].value] : Unavailable()
                    case 'group': return $[0] === 'group' ? Property(step[1].value['l id'], p_lookup.acyclic.from_resolved_dictionary($[1].properties)) : Unavailable()
                    case 'optional': return $[0] === 'optional'
                        ? $[1].status[0] === 'set' ? ['resolved', $[1].status[1]['child value']] : $[1].status : Unavailable()
                    case 'list result': return $[0] === 'list' ? $[1].result : Unavailable()
                    case 'reference':
                    case 'expect resolved': {
                        if ($[0] !== 'reference') return Unavailable()
                        const definition = step[1].constraints.definition
                        const referent = definition.referent.value.path.tail.result
                        return Referenced_Value(Reference($[1]), referent[0] === 'dictionary'
                            ? referent[1].value : referent)
                    }
                    default: return p_.exhaustive(step[0])
                }
                })
                if (next[0] === 'constraint failed') return next
                if ((step[0] === 'reference' || step[0] === 'expect resolved') && next[0] === 'resolved') {
                    const definition = step[1].constraints.definition
                    const referent = definition.referent.value.path.tail.result
                    const target = referent[0] === 'dictionary' ? referent[1].value : referent
                    if (target[0] === 'component') {
                        const root = component_type(target[1].type)['root value']
                        // Derived selections can already expose the declared component payload.
                        if (next[1].unmarshalled.definition === root) {
                            return p_.from.list(rest).on_has_first_item(
                                (following, tail) => following.value.value[0] === 'component' || following.value.value[0] === 'cyclic component' ? path(tail, next) : path(rest, next),
                                () => next,
                            )
                        }
                    }
                }
                return path(rest, next)
            },
            () => current
        )
    return path($.path.value, start)
}

const Possible = (
    $: s_in_definition.namespaces.resolver.types.Possible_Value_Selection,
    context: temp.Context
): s_out.Selection => {
    const selection = $.value
    switch (selection[0]) {
        case 'optional value': return Relative(selection[1].tail, Select(Guaranteed(selection[1].selection.value, context), value =>
            value[0] === 'optional'
                ? value[1].status[0] === 'set' ? ['resolved', value[1].status[1]['child value']] : value[1].status
                : Unavailable()))
        case 'parameter': return p_.from.dictionary(context.types).get_possible_entry(selection[1]['l id'], Parameter, Unavailable)
        case 'result': {
            const result = selection[1].value
            const selected = Property(result[1].property.value['l id'], context.lookups.properties)
            if (result[0] === 'state') return selected[0] === 'resolved'
                ? State_Result(selected[1], result[1].property.constraints.state) : Select(selected, Unavailable)
            return Select(selected, (value) => {
            switch (result[0]) {
                case 'optional value': return value[0] === 'optional'
                    ? value[1].result
                    : Unavailable()
                default: return p_.exhaustive(result[0])
            }
            })
        }
        default: return p_.exhaustive(selection[0])
    }
}

const Select_Constraint = (
    $: s_out.Selection,
    select: ($: s_out.Resolved_Value_Type) => s_out.Selection
): s_out.Selection => Select($, ($) => $[0] === 'component'
    ? Select_Constraint(['resolved', $[1].value], select)
    : select($)
)

const Constraint = (
    $: s_in_definition.namespaces.resolver.types.Reference_Constraints.O.value.D.value.constraint,
    start: s_out.Selection
): s_out.Selection => {
    const constraint = $.type.value
    return Select_Constraint(Relative($.selection, start), (value) => {
    switch (constraint[0]) {
        case 'state': return value[0] === 'state' ? p_.from.optional(value[1].option).decide(
            (option) => value[1].unmarshalled.derived['option status'][0] === 'set'
                && value[1].unmarshalled.derived['option status'][1].option === constraint[1].value.option['l id']
                ? ['resolved', option] : ['constraint failed', `expected state option '${constraint[1].value.option['l id']}'`],
            Unavailable
        ) : ['constraint failed', 'expected a state value']
        case 'optional value': return value[0] === 'optional'
            ? value[1].status[0] === 'set' ? ['resolved', value[1].status[1]['child value']]
                : value[1].status[0] === 'unavailable' ? Unavailable() : ['constraint failed', 'expected an optional value to be set']
            : ['constraint failed', 'expected an optional value']
        default: return p_.exhaustive(constraint[0])
    }
    })
}

const Constraints = (
    $: s_in_definition.namespaces.resolver.types.Reference_Constraints.O.value,
    start: s_out.Selection
): p_di.Dictionary<s_out.Selection> => p_.from.dictionary($).resolve(
    ({ value: $ }, id, siblings) => Constraint($.constraint, $.start.value[0] === 'value' ? start : p_.from.optional(
        siblings.get_entry($.start.value[1]['l id'], {
            no_context_lookup: () => p_.literal.not_set(),
            cycle_detected: ($) => p_.literal.set(['cycle', $]),
        })
    ).decide(
        (selection) => selection,
        Unavailable
    ))
)

const Guaranteed = (
    $: s_in_definition.namespaces.resolver.types.Guaranteed_Value_Selection,
    context: temp.Context
): s_out.Selection => {
    const source = $.start.value
    const start = (): s_out.Selection => {
        switch (source[0]) {
            case 'optional fallback': {
                const selection = Possible(source[1].selection, context)
                return selection[0] === 'not set' ? Guaranteed(source[1].fallback, context) : selection
            }
            case 'sibling property': return Property(source[1]['l id'], context.lookups.properties)
            case 'sibling option constraint': return p_.from.optional(
                context.lookups['sibling option constraints']?.get_entry(source[1]['l id'], {
                    no_context_lookup: () => p_.literal.not_set<s_out.Selection>(),
                    cycle_detected: ($) => p_.literal.set<s_out.Selection>(['cycle', $]),
                }) ?? p_.literal.not_set<s_out.Selection>(),
            ).decide(($) => $, Unavailable)
            case 'parent sibling': return Property(source[1]['l id'], context.lookups['parent properties'])
            case 'parameter': return p_.from.dictionary(context.types).get_possible_entry(source[1]['l id'], Parameter, Unavailable)
            case 'list cursor': return context.lookups['list cursor'] ?? ['constraint failed', 'no list cursor is available in this context']
            case 'linked entry': return context.lookups['linked entry'] ?? Unavailable()
            case 'option constraint': return p_.from.dictionary(context.lookups['option constraints'] ?? p_.literal.dictionary<s_out.Selection>({})).get_possible_entry(
                source[1].value['l id'], ($) => $, Unavailable
            )
            case 'result': {
                const result = source[1].value
                const selected = Property(result[1].property.value['l id'], context.lookups.properties)
                if (result[0] === 'state') return selected[0] === 'resolved'
                    ? State_Result(selected[1], result[1].property.constraints.state) : Select(selected, Unavailable)
                return Select(selected, (value) => {
                    switch (result[0]) {
                        case 'list': return value[0] === 'list' ? value[1].result : Unavailable()
                        case 'optional value': return value[0] === 'optional'
                            ? value[1].result
                            : Unavailable()
                        default: return p_.exhaustive(result[0])
                    }
                })
            }
            case 'constraint': {
                const constraint = source[1].value
                return Select(Property(constraint[1].property.value['l id'], context.lookups.properties), (value) => {
                    const selections = value[0] === 'component' ? value[1].constraints
                        : value[0] === 'reference' && value[1][0] === 'selected' ? value[1][1].constraints
                        : p_.literal.dictionary<s_out.Selection>({})
                    return p_.from.dictionary(selections).get_possible_entry(constraint[1].constraint['l id'], ($) => $, Unavailable)
                })
            }
            default: return p_.exhaustive(source[0])
        }
    }
    return Relative($.tail, start())
}

const Lookup = ($: s_in_definition.namespaces.resolver.types.Lookup_Selection, context: temp.Context): temp.Lookup => {
    switch ($.type.value[0]) {
        case 'acyclic': {
            const lookup = $.type.value[1].value
            switch (lookup[0]) {
                case 'siblings': return ['acyclic', context.lookups.siblings.acyclic, context.lookups.siblings.keys ?? p_.literal.list([]), context.lookups.siblings.dictionary]
                case 'resolved dictionary': {
                    const selection = Guaranteed(lookup[1].selection.value, context)
                    switch (selection[0]) {
                        case 'resolved': {
                            const value = selection[1]['unmarshall result']
                            return value[0] === 'success' && value[1][0] === 'dictionary'
                                ? ['acyclic', p_lookup.acyclic.from_resolved_dictionary(value[1][1].entries),
                                    p_.from.dictionary(value[1][1].entries).convert_to_list((_, id) => id), value[1][1].unmarshalled]
                                : ['unavailable', null]
                        }
                        case 'not set': return ['unavailable', null]
                        default: return selection
                    }
                }
                default: return p_.exhaustive(lookup[0])
            }
        }
        case 'cyclic': return ['cyclic', context.lookups.siblings.cyclic, context.lookups.siblings.keys ?? p_.literal.list([]), context.lookups.siblings.dictionary]
        case 'parameter': {
            const parameter = $.type.value[1]
            switch (parameter['l entry'].type[0]) {
                case 'acyclic': return Lookup_Parameter(context.lookups.parameters.acyclic, parameter['l id'], ($) => {
                    switch ($[0]) {
                        case 'resolved': return ['acyclic', $[1]]
                        case 'selection': return $[1]
                        default: return ['unavailable', null]
                    }
                }, () => ['unavailable', null])
                case 'cyclic': return Lookup_Parameter(context.lookups.parameters.cyclic, parameter['l id'], ($) => {
                    switch ($[0]) {
                        case 'resolved': return ['cyclic', $[1]]
                        case 'selection': return $[1]
                        default: return ['unavailable', null]
                    }
                }, () => ['unavailable', null])
                default: return p_.exhaustive(parameter['l entry'].type[0])
            }
        }
        default: return p_.exhaustive($.type.value[0])
    }
}

const Resolve_Reference = (lookup: temp.Lookup, id: string): s_out.Reference_Status => {
    switch (lookup[0]) {
        case 'acyclic': {
            return p_.from.optional(lookup[1].get_entry(id, {
                no_context_lookup: () => p_.literal.not_set(),
                cycle_detected: ($) => p_.literal.set({
                    'unmarshall result': ['error', null],
                    'resolution error': ['cycle', $],
                }),
            })).decide(
                ($): s_out.Reference_Status => ['selected', Entry($)],
                (): s_out.Reference_Status => ['missing', id]
            )
        }
        case 'cyclic': return ['cyclic', lookup[1].get_entry(id, {
            no_context_lookup: () => p_.literal.not_set(),
            accessing_cyclic_sibling_before_it_is_resolved: () => p_.literal.not_set(),
        })]
        default: return ['selected', lookup]
    }
}

const Lookup_Argument = (
    $: s_in_definition.namespaces.resolver.types.Value.component.value.arguments_,
    id: string,
    context: temp.Context
): ['selection', temp.Lookup] => {
    const inherited = (): temp.Lookup => Lookup_Parameter(
        context.lookups.parameters.acyclic,
        id,
        ($): temp.Lookup => $[0] === 'resolved' ? ['acyclic', $[1]] : $[0] === 'selection' ? $[1] : ['unavailable', null],
        () => Lookup_Parameter(
            context.lookups.parameters.cyclic,
            id,
            ($): temp.Lookup => $[0] === 'resolved' ? ['cyclic', $[1]] : $[0] === 'selection' ? $[1] : ['unavailable', null],
            () => ['unavailable', null]
        )
    )
    return ['selection', p_i_temp.from_option_decide($,
        ($) => p_i_temp.from_option_decide($.lookups,
            ($) => Lookup_Parameter($, id, ({ value: $ }): temp.Lookup => {
                switch ($[0]) {
                    case 'selection': return Lookup($[1], context)
                    case 'acyclic':
                    case 'cyclic': return ['unavailable', null]
                    default: return p_.exhaustive($[0])
                }
            }, () => ['constraint failed', `missing lookup argument '${id}' in explicit arguments`]),
            inherited
        ),
        inherited
    )]
}

const Complete_Component = (
    $: s_out.Component,
    constraints: s_in_definition.namespaces.resolver.types.Reference_Constraints
): s_out.Component => ({
    ...$,
    'constraints': p_.from.optional(constraints).decide(
        constraints => Constraints(constraints.value, ['resolved', $.value]), () => p_.literal.dictionary({})),
})

const Complete_Reference = (
    $: s_out.Selected_Reference,
    constraints: s_in_definition.namespaces.resolver.types.Reference_Constraints
): s_out.Selected_Reference => ({
    ...$,
    'constraints': p_.from.optional(constraints).decide(
        constraints => Constraints(constraints.value, Reference(['selected', $])),
        () => p_.literal.dictionary({}),
    ),
})

const Option_Constraints = (
    $: s_in_definition.namespaces.resolver.types.Option_Constraints,
    context: temp.Context
): p_di.Dictionary<s_out.Selection> => p_.from.optional($).decide($ => p_.from.dictionary($.value).resolve(({ value: { value: $ } }, _, siblings) => {
    const sibling_context: temp.Context = { ...context, lookups: { ...context.lookups, 'sibling option constraints': siblings } }
    switch ($[0]) {
        case 'assert is set': {
            const selection = Possible($[1], sibling_context)
            return selection[0] === 'not set' ? ['constraint failed', 'expected an optional value to be set'] : selection
        }
        case 'state': {
            const constraint = $[1]
            return Select_Constraint(Guaranteed(constraint.selection.value, sibling_context), (value) => value[0] === 'state'
                ? p_.from.optional(value[1].option).decide(
                    (option) => value[1].unmarshalled.derived['option status'][0] === 'set'
                        && value[1].unmarshalled.derived['option status'][1].option === constraint.option['l id']
                        ? ['resolved', option] : ['constraint failed', `expected state option '${constraint.option['l id']}'`],
                    Unavailable
                ) : ['constraint failed', 'expected a state value']
            )
        }
        default: return p_.exhaustive($[0])
    }
}), () => p_.literal.dictionary({}))

const Result_Selection = (
    $: s_in_definition.namespaces.resolver.types.Result_Selection,
    value: s_out.Value,
    context: temp.Context,
): s_out.Selection => {
    if (value['unmarshall result'][0] === 'error') return Unavailable()
    const expression = $.value
    switch (expression[0]) {
        case 'value': return Relative(expression[1], ['resolved', value])
        case 'context': return Guaranteed(expression[1], context)
        default: return p_.exhaustive(expression[0])
    }
}

const Checks_Passed = ($: p_di.Dictionary<s_out.Selection>): boolean => p_.from.list(
    p_.from.dictionary($).flatten_to_list((selection) => p_.literal.list([selection])),
).map_with_state(
    true,
    (selection) => selection,
    (selection, passed) => passed && selection[0] === 'resolved',
    (_, passed) => ({ passed }),
).passed

const Linked_Entry = (
    $: s_out.Dictionary['benchmark'],
    id: string,
): s_out.Selection => p_.from.optional($).decide(
    ($) => Select($.selection, ($) => $[0] === 'dictionary'
        ? p_.from.dictionary($[1].entries).get_possible_entry(id, Entry, Unavailable)
        : Unavailable()
    ),
    Unavailable
)

export const Resolver_Optional_Value_Initialization = (
    $: s_in_definition.namespaces.resolver.types.Value.component.value.arguments_.O.types.O.D.value.optional,
    context: temp.Context
): temp.Type_Parameter_Resolve_Status => {
    switch ($[0]) {
        case 'not set': return ['not set', null]
        case 'set': return Guaranteed($[1], context)
        case 'selection': return Possible($[1], context)
        default: return p_.exhaustive($[0])
    }
}

export const Resolver_Guaranteed_Value_Selection = (
    $: s_in_definition.namespaces.resolver.types.Guaranteed_Value_Selection,
    context: temp.Context
): temp.Type_Parameter_Resolve_Status => {
    return Guaranteed($, context)
}

const Type_Arguments = (
    args: s_in_definition.namespaces.resolver.types.Value.component.value.arguments_,
    signature: s_in_definition.namespaces.declarations.types.Signature,
    context: temp.Context,
): p_di.Dictionary<temp.Type_Parameter_Resolve_Status> => p_i_temp.from_option_decide(args,
    (args) => p_i_temp.from_option_decide(args.types,
        (supplied) => p_.from.dictionary(signature.values).map(
            (parameter, id): temp.Type_Parameter_Resolve_Status => {
                const assigned = p_.from.dictionary(supplied).get_possible_entry<temp.Type_Parameter_Resolve_Status>(id,
                    ({ value: binding }): temp.Type_Parameter_Resolve_Status => {
                        switch (binding[0]) {
                            case 'optional': return Resolver_Optional_Value_Initialization(binding[1], context)
                            case 'required': return Guaranteed(binding[1], context)
                            case 'parameter': return p_.from.dictionary(context.types).get_possible_entry(
                                binding[1]['l id'], ($) => $,
                                () => ['constraint failed', `type parameter '${binding[1]['l id']}' is not available`],
                            )
                            default: return p_.exhaustive(binding[0])
                        }
                    },
                    () => ['constraint failed', `missing type argument '${id}' in explicit arguments`],
                )
                return assigned[0] === 'resolved'
                    ? Referenced_Value(assigned, parameter.value.subselection.tail.result) : assigned
            },
        ),
        () => context.types,
    ),
    () => context.types,
)


export const Value: p_i_temp.Transformer_With_Lookups_And_Parameter<
    s_in.Value,
    s_out.Value,
    temp.Lookups,
    {
        'definition': s_in_definition.namespaces.resolver.types.Value
        'resolver': s_in_definition.namespaces.resolver.types.Resolver
        'type parameters': p_di.Dictionary<temp.Type_Parameter_Resolve_Status>
    }
> = ($, $l, $p) => {
    const context: temp.Context = { 'lookups': $l, 'types': $p['type parameters'] }
    const presence_failure: s_out.Selection | null = (() => {
        const definition = $p.definition
        const result = $['unmarshall result']
        if (definition[0] !== 'optional' || result[0] !== 'success' || result[1][0] !== 'optional') return null
        const present = result[1][1].derived.status[0] === 'set'
        return p_.from.optional(definition[1].value.presence).decide((selection): s_out.Selection | null => {
            const selected = Possible(selection, context)
            switch (selected[0]) {
                case 'resolved':
                case 'not set': return (selected[0] === 'resolved') === present
                    ? null : ['constraint failed', 'Optional presence does not match the selected value']
                default: return selected
            }
        }, () => null)
    })()
    const constraints = (): p_di.Dictionary<s_out.Selection> => {
        if (presence_failure !== null) return p_.literal.dictionary({})
        const result = $['unmarshall result']
        if (result[0] === 'error') return p_.literal.dictionary({})
        const definition = $p.definition
        const value = result[1]
        switch (definition[0]) {
            case 'state': {
                if (value[0] !== 'state') return p_.literal.dictionary({})
                const option = value[1].derived['option status']
                return option[0] === 'set' ? p_.from.dictionary(definition[1].value.options).get_possible_entry(
                    option[1].option,
                    ($) => Option_Constraints($.value.constraints, context),
                    () => p_unreachable_code_path("the definition is resolved")
                ) : p_.literal.dictionary({})
            }
            case 'optional': return value[0] !== 'optional' ? p_.literal.dictionary({})
                : value[1].derived.status[0] === 'set' ? Option_Constraints(definition[1].value.constraints, context)
                : p_.from.optional(definition[1].value['not set constraints']).decide(
                    constraints => p_.from.dictionary(constraints).map(selection => {
                        const selected = Possible(selection, context)
                        return selected[0] === 'resolved'
                            ? ['constraint failed', 'expected an optional value to be absent'] : selected
                    }),
                    () => p_.literal.dictionary({}))
            default: return p_.literal.dictionary({})
        }
    }
    const checks = constraints()
    return {
        ...(presence_failure === null ? {} : { 'presence check': presence_failure }),
        'benchmark link': $l['linked entry'] ?? Unavailable(),
        get 'state option constraints'() {
            const definition = $p.definition
            return definition[0] === 'state'
                ? p_.from.dictionary(definition[1].value.options).map((option) => Option_Constraints(option.value.constraints, context))
                : p_.literal.dictionary<p_di.Dictionary<s_out.Selection>>({})
        },
        get 'reference dictionary'() {
            const definition = $p.definition
            if (definition[0] !== 'reference') return p_.literal.not_set<s_in.Dictionary>()
            const lookup = Lookup(definition[1].value.type.lookup, context)
            return (lookup[0] === 'acyclic' || lookup[0] === 'cyclic') && lookup[3] !== undefined
                ? p_.literal.set(lookup[3]) : p_.literal.not_set<s_in.Dictionary>()
        },
        // Enumerate only when requested, after sibling resolution has finished.
        get 'reference candidates'() {
                const definition = $p.definition
                if (definition[0] !== 'reference') return p_.literal.not_set<p_di.List<string>>()
                const lookup = Lookup(definition[1].value.type.lookup, context)
                return lookup[0] === 'acyclic' || lookup[0] === 'cyclic'
                    ? p_.literal.set(lookup[2] ?? p_.literal.list<string>([]))
                    : p_.literal.not_set<p_di.List<string>>()
        },
        'constraints': checks,
        'definition': $p.definition,
        'unmarshalled': $,
        'unmarshall result': p_.from.state($['unmarshall result']).decide(
            ($): s_out.Value_Unmarshall_Result => {
                switch ($[0]) {
                    case 'error': return p_.option($, ($) => ['error', $])
                    case 'success': return p_.option($, ($) => {
                        const unmarshalled_value = $
                        return ['success', p_.from.state($p.definition).decide(
                            ($): s_out.Resolved_Value_Type => {
                                switch ($[0]) {
                                    case 'component': return p_.option($, ({ value: $ }) => {
                                        const def = $
                                        return ['component', p_.from.state(unmarshalled_value).decide(
                                            ($) => {
                                                switch ($[0]) {
                                                    case 'component': return p_.option($, ($) => {
                                                        const selected = Implementation_For(
                                                            $l.implementations ?? Implementations($p.resolver), def.location.result.value)
                                                        const resolver_namespace = selected.namespace
                                                        const def2 = selected.definition
                                                        return Complete_Component({
                                                            'unmarshalled': $,
                                                            'constraints': p_.literal.dictionary({}),
                                                            'value': Value(
                                                                $.value,
                                                                {
                                                                    ...$l,
                                                                    'parameters': {
                                                                        'acyclic': p_temp_dictionary.map_value_dictionary_to_generic_dictionary(
                                                                            p_.from.dictionary(def2.benchmark.value.signature.result.lookups).filter(($) => $.type[0] === 'acyclic'),
                                                                            (parameter, id): temp.Acyclic_Parameter_Resolve_Status => Lookup_Argument(def.arguments, id, context)
                                                                        ),
                                                                        'cyclic': p_temp_dictionary.map_value_dictionary_to_generic_dictionary(
                                                                            p_.from.dictionary(def2.benchmark.value.signature.result.lookups).filter(($) => $.type[0] === 'cyclic'),
                                                                            (parameter, id): temp.Cyclic_Parameter_Resolve_Status => Lookup_Argument(def.arguments, id, context)
                                                                        ),
                                                                    },
                                                                },
                                                                {
                                                                    'definition': def2.value['root value resolver'],
                                                                    'resolver': resolver_namespace,
                                                                    'type parameters': Type_Arguments(def.arguments, def2.benchmark.value.signature.result, context),
                                                                }
                                                            )
                                                        }, def.constraints)
                                                    })
                                                    default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                                }
                                            })]
                                    })
                                    case 'dictionary': return p_.option($, ({ value: $ }) => {
                                        const def = $
                                        const siblingKeys = unmarshalled_value[0] === 'dictionary'
                                            ? p_.from.dictionary(unmarshalled_value[1].derived.entries).convert_to_list((_, id) => id)
                                            : p_.literal.list<string>([])
                                        const benchmark = p_.from.optional(def.benchmark).map(($) => {
                                            const coverage = p_.from.state(unmarshalled_value).decide(
                                                value => value[0] === 'dictionary'
                                                    ? p_.from.optional(value[1].definition.benchmark).decide(
                                                        benchmark => benchmark.coverage,
                                                        () => p_unreachable_code_path('resolver benchmark requires a structural benchmark declaration'),
                                                    )
                                                    : p_unreachable_code_path('resolver benchmark requires a dictionary value'),
                                            )
                                            return {
                                                selection: Referenced_Value(Guaranteed($.value.selection.value, context), ['dictionary', $.value.selection.constraints.dictionary]),
                                                dense: coverage[0] === 'dense',
                                            }
                                        })
                                        return ['dictionary', p_.from.state(unmarshalled_value).decide(
                                            ($): s_out.Dictionary => {
                                                switch ($[0]) {
                                                    case 'dictionary': return p_.option($, ($): s_out.Dictionary => ({
                                                        'unmarshalled': $,
                                                        'benchmark': benchmark,
                                                        'entries': p_.from.dictionary($.derived.entries).resolve(
                                                            ($, id, $al, $cl): s_out.Entry => ({
                                                                'unmarshall result': p_.from.state($.result).decide(
                                                                    ($): s_out.Entry.Unmarshall_Result => {
                                                                        switch ($[0]) {
                                                                            case 'success': return p_.option($, ($) => p_.from.state($.value).decide(
                                                                                ($) => {
                                                                                    switch ($[0]) {
                                                                                        case 'set': return p_.option($, ($) => ['success', {
                                                                                            'value': ['set', Value(
                                                                                                $,
                                                                                                {
                                                                                                    ...$l,
                                                                                                    'parameters': $l.parameters,
                                                                                                    'siblings': {
                                                                                                        'acyclic': $al,
                                                                                                        'cyclic': $cl,
                                                                                                        'keys': siblingKeys,
                                                                                                        'dictionary': unmarshalled_value[0] === 'dictionary' ? unmarshalled_value[1] : undefined,
                                                                                                    },
                                                                                                    'linked entry': Linked_Entry(benchmark, id),
                                                                                                },
                                                                                                {
                                                                                                    'definition': def.resolver,
                                                                                                    'resolver': $p.resolver,
                                                                                                    'type parameters': $p['type parameters'],
                                                                                                }
                                                                                            )]
                                                                                        }])
                                                                                        case 'not set': return p_.option($, ($) => ['success', {
                                                                                            'value': ['not set', null]
                                                                                        }])
                                                                                        default: return p_.exhaustive($[0])
                                                                                    }
                                                                                }))
                                                                            case 'error': return p_.option($, ($) => ['error', null])
                                                                            default: return p_.exhaustive($[0])
                                                                        }
                                                                    })
                                                            }))
                                                    }))
                                                    default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                                }
                                            })]
                                    })
                                    case 'group': return p_.option($, ({ value: $ }) => {
                                        const def = $
                                        return ['group', p_.from.state(unmarshalled_value).decide(
                                            ($): s_out.Group => {
                                                switch ($[0]) {
                                                    case 'group': return p_.option($, ($): s_out.Group => ({
                                                        'unmarshalled': $,
                                                        'properties': p_.from.dictionary(
                                                            p_.from.dictionary(def).join(
                                                                $.derived.properties,
                                                                ($, $o, id) => {
                                                                    return {
                                                                        'definition': $.value.resolver,
                                                                        'unmarshalled': $o,
                                                                    }
                                                                }
                                                            )
                                                        ).resolve(
                                                            ($, id, $al, $cl) => {
                                                                const resolver = $.definition
                                                                return p_.from.optional($.unmarshalled).decide(
                                                                    ($) => p_.from.state($.result).decide(
                                                                        ($): s_out.Property => {
                                                                            switch ($[0]) {
                                                                                case 'success': return p_.option($, ($): s_out.Property => ({
                                                                                    'unmarshall result': ['success', {
                                                                                        'definition': resolver,
                                                                                        'resolved': Value(
                                                                                            $,
                                                                                            {
                                                                                                ...$l,
                                                                                                'properties': $al,
                                                                                                'parent properties': $l.properties,
                                                                                            },
                                                                                            {
                                                                                                'definition': resolver,
                                                                                                'resolver': $p.resolver,
                                                                                                'type parameters': $p['type parameters'],
                                                                                            }
                                                                                        )
                                                                                    }]
                                                                                }))
                                                                                case 'error': return p_.option($, ($): s_out.Property => ({
                                                                                    'unmarshall result': ['error', $]
                                                                                }))
                                                                                default: return p_.exhaustive($[0])
                                                                            }
                                                                        }),
                                                                    () => p_unreachable_code_path("both dictionaries are driven by the definitions in the schema")
                                                                )
                                                            }),

                                                    }))
                                                    default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                                }
                                            })]
                                    })
                                    case 'list': return p_.option($, ({ value: $ }) => {
                                        const def = $
                                        return ['list', p_.from.state(unmarshalled_value).decide(
                                            ($): s_out.List => {
                                                switch ($[0]) {
                                                    case 'list': return p_.option($, ($): s_out.List => {
                                                        const unmarshalled = $
                                                        return p_.from.optional(def.result).decide(
                                                            ({ value: result }) => p_.from.list(unmarshalled.derived.items).map_with_state(
                                                                Guaranteed(result.initial, context),
                                                                (item, cursor) => Value(item, { ...$l, 'list cursor': cursor }, {
                                                                    definition: def.resolver,
                                                                    resolver: $p.resolver,
                                                                    'type parameters': $p['type parameters'],
                                                                }),
                                                                (item, cursor) => cursor[0] === 'constraint failed' ? cursor
                                                                    : cursor[0] === 'unavailable' ? Unavailable()
                                                                    : Result_Selection(result.next, item, {
                                                                    ...context, lookups: { ...$l, 'list cursor': cursor },
                                                                }),
                                                                (items, result) => ({ unmarshalled, items, result }),
                                                            ),
                                                            () => ({
                                                                unmarshalled,
                                                                result: ['not set', null],
                                                                items: p_.from.list(unmarshalled.derived.items).map(
                                                                    (item) => Value(item, $l, {
                                                                        definition: def.resolver,
                                                                        resolver: $p.resolver,
                                                                        'type parameters': $p['type parameters'],
                                                                    }),
                                                                ),
                                                            }),
                                                        )
                                                    })
                                                    default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                                }
                                            })]
                                    })
                                    case 'nothing': return p_.option($, ($) => ['nothing', p_.from.state(unmarshalled_value).decide(
                                        ($) => {
                                            switch ($[0]) {
                                                case 'nothing': return p_.option($, ($) => $)
                                                default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                            }
                                        })])
                                    case 'simple': return p_.option($, ($) => p_.from.state(unmarshalled_value).decide(
                                        ($): s_out.Resolved_Value_Type => {
                                            switch ($[0]) {
                                                case 'simple': return p_.option($, ($) => ['simple', $])
                                                case 'text': return p_.option($, ($) => ['text', $])
                                                default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                            }
                                        }))
                                    case 'optional': return p_.option($, ({ value: $ }) => {
                                        const def = $
                                        return ['optional', p_.from.state(unmarshalled_value).decide(
                                            ($): s_out.Optional => {
                                                switch ($[0]) {
                                                    case 'optional': return p_.option($, ($): s_out.Optional => ({
                                                        'unmarshalled': $,
                                                        get result(): s_out.Selection {
                                                            if (presence_failure !== null) return Unavailable()
                                                            if (!Checks_Passed(checks)) return Unavailable()
                                                            if (this.status[0] !== 'set') return ['not set', null]
                                                            const child = this.status[1]['child value']
                                                            return p_.from.optional(def.result).decide(
                                                                result => Result_Selection(result.value, child, {
                                                                        ...context, lookups: { ...$l, 'option constraints': checks },
                                                                    }),
                                                                () => ['not set', null],
                                                            )
                                                        },
                                                        'status': presence_failure !== null ? ['unavailable', null] : p_.from.state($.derived.status).decide(
                                                            ($) => {
                                                                switch ($[0]) {
                                                                    case 'set': return p_.option($, ($) => ['set', {
                                                                        'child value': Value(
                                                                            $['child value'],
                                                                            {
                                                                                ...$l,
                                                                                'option constraints': checks,
                                                                            },
                                                                            {
                                                                                'definition': def.resolver,
                                                                                'resolver': $p.resolver,
                                                                                'type parameters': $p['type parameters'],
                                                                            }
                                                                        )
                                                                    }])
                                                                    case 'not set': return p_.option($, ($) => ['not set', null])
                                                                    default: return p_.exhaustive($[0])
                                                                }

                                                            }),
                                                    }))
                                                    default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                                }
                                            })]
                                    })
                                    case 'reference': return p_.option($, ({ value: definition }) => {
                                        if (unmarshalled_value[0] !== 'reference') return p_unreachable_code_path("unmarshalled value should match the definition")
                                        const unmarshalled = unmarshalled_value[1].type[1]
                                        return ['reference', ['selected', Complete_Reference({
                                            unmarshalled,
                                            'resolve status': Resolve_Reference(Lookup(definition.type.lookup, context), unmarshalled.intermediate.instance.token.value),
                                            constraints: p_.literal.dictionary({}),
                                        }, definition.type.constraints)]]
                                    })
                                    case 'state': return p_.option($, (definition) => {
                                        const $ = definition.value
                                        const $v_def = $
                                        return ['state', p_.from.state(unmarshalled_value).decide(
                                            ($) => {
                                                switch ($[0]) {
                                                    case 'state': return p_.option($, ($) => {
                                                        const unmarshalled = $
                                                        const option = p_.from.state($.derived['option status']).decide(
                                                            ($): p_di.Optional_Value<s_out.Value> => {
                                                                switch ($[0]) {
                                                                    case 'set': return p_.literal.set(Value($[1].value, {
                                                                        ...$l, 'option constraints': checks,
                                                                    }, {
                                                                        definition: p_.from.dictionary($v_def.options).get_possible_entry(
                                                                            $[1].option, ($) => $.value.resolver,
                                                                            () => p_unreachable_code_path("the definition is resolved"),
                                                                        ),
                                                                        resolver: $p.resolver,
                                                                        'type parameters': $p['type parameters'],
                                                                    }))
                                                                    case 'missing data': return p_.literal.not_set()
                                                                    default: return p_.exhaustive($[0])
                                                                }
                                                            },
                                                        )
                                                        return {
                                                            unmarshalled,
                                                            option,
                                                            result: !Checks_Passed(checks) ? Unavailable() : p_.from.optional(definition.constraints.definition.result).decide(
                                                                () => p_.from.optional(option).decide(
                                                                    (value) => unmarshalled.derived['option status'][0] === 'set'
                                                                        ? p_.from.dictionary($v_def.options).get_possible_entry(
                                                                            unmarshalled.derived['option status'][1].option,
                                                                            (option) => p_.from.optional(option.value.result).decide(
                                                                                (selection) => Result_Selection(selection.value, value, {
                                                                                    ...context, lookups: { ...$l, 'option constraints': checks },
                                                                                }),
                                                                                () => p_unreachable_code_path("every state option must declare its result selection"),
                                                                            ),
                                                                            () => p_unreachable_code_path("every state option must declare its result selection"),
                                                                        ) : Unavailable(),
                                                                    Unavailable,
                                                                ),
                                                                () => ['not set', null],
                                                            ),
                                                        }
                                                    })
                                                    default: return p_unreachable_code_path("unmarshalled value should match the definition")
                                                }
                                            })]
                                    })
                                    default: return p_.exhaustive($[0])
                                }
                            })]
                    })
                    default: return p_.exhaustive($[0])
                }
            })
    }
}
