import * as p from 'pareto-core/transformer'
import type * as core from 'pareto-core/schema'
import type * as s from './current_generated/structure/schemas/resolved.js'
import { Component_Type } from './component.js'

type Abort = (message: string) => never

export const Validate = (schema: s.Type_Specification, abort: Abort): void => {
    let benchmarks = p.literal.list<{ owner: s.structure.Value, target: s.structure.Value }>([])

    const same = (left: s.structure.Value, right: s.structure.Value, description: string, abort: Abort): void => {
        if (left !== right) abort(`same node: ${description}`)
    }

    const relative = (selection: s.resolver.Relative_Value_Selection, initial: s.structure.Value, abort: Abort): void => {
        let current = initial
        p.from.list(selection.path.value).map(item => {
            const step = item.value.value
            if (step[0] === 'simple component') {
                if (current[0] !== 'component' || current[1].type[0] !== 'simple') abort('simple component requires a simple component')
                else if (Component_Type(current[1]) !== step[1].value.result) abort('same node: simple component target')
            }
            if (step[0] === 'benchmark link') {
                const owner = current
                let found = false
                p.from.list(benchmarks).map(benchmark => {
                    if (benchmark.owner === owner) {
                        found = true
                        same(step[1].path.tail.result, benchmark.target, 'benchmark target', abort)
                    }
                    return null
                })
                if (!found) abort('benchmark link requires a benchmarked dictionary entry')
            }
            if (step[0] === 'component constraint') {
                same(step[1].value.target.path.tail.result, step[1].value.name['l entry'].path.tail.result, 'component constraint target', abort)
            }
            current = item.result
            return null
        })
    }

    const possible = (selection: s.resolver.Possible_Value_Selection, abort: Abort): void => {
        const value = selection.value
        if (value[0] === 'optional value') {
            guaranteed(value[1].selection.value, abort)
            relative(value[1].tail, value[1].selection.constraints.optional.value, abort)
        }
    }

    const guaranteed = (selection: s.resolver.Guaranteed_Value_Selection, abort: Abort): void => {
        relative(selection.tail, selection.start.result, abort)
        const start = selection.start.value
        if (start[0] === 'optional fallback') {
            possible(start[1].selection, abort)
            guaranteed(start[1].fallback, abort)
            same(start[1].selection.result, start[1].fallback.tail.path.result, 'optional fallback target type', abort)
        }
    }

    const lookup = (selection: s.resolver.Lookup_Selection, abort: Abort): void => {
        const type = selection.type.value
        if (type[0] === 'acyclic' && type[1].value[0] === 'resolved dictionary') {
            guaranteed(type[1].value[1].selection.value, abort)
        }
    }

    const reference_constraints = (constraints: s.resolver.Reference_Constraints, abort: Abort): void => {
        p.from.optional(constraints).map(constraints => p.from.dictionary(constraints.value).map((constraint, name) => {
            relative(constraint.value.constraint.selection, constraint.value.start.result, abort)
            same(constraint.value.constraint.type.result, constraint.benchmark.path.tail.result, `constraint ${name}`, abort)
            return null
        }))
    }

    const option_constraints = (constraints: s.resolver.Option_Constraints, abort: Abort): void => {
        p.from.optional(constraints).map(constraints => p.from.dictionary(constraints.value).map((constraint, name) => {
            const value = constraint.value.value
            if (value[0] === 'state') guaranteed(value[1].selection.value, abort)
            else possible(value[1], abort)
            same(constraint.value.result, constraint.benchmark.path.tail.result, `constraint ${name}`, abort)
            return null
        }))
    }

    const result = (selection: s.resolver.Result_Selection, expected: s.structure.Value, node: s.structure.Value, abort: Abort): void => {
        const expression = selection.value
        if (expression[0] === 'context') {
            guaranteed(expression[1], abort)
        } else {
            relative(expression[1], node, abort)
        }
        same(selection.result, expected, 'result type', abort)
    }

    const presence = <T extends core.Value, U extends core.Value>(
        declaration: core.Optional_Value<T>, implementation: core.Optional_Value<U>, abort: Abort,
    ): void => {
        const declared = p.from.optional(declaration).decide(() => true, () => false)
        const implemented = p.from.optional(implementation).decide(() => true, () => false)
        if (declared !== implemented) abort('optional result presence must match its structural declaration')
    }

    const value = (resolver: s.resolver.Value, abort: Abort): void => {
        switch (resolver[0]) {
            case 'component': {
                const component = resolver[1]
                const location = component.value.location.value
                const selected = location[0] === 'local' ? location[1]['l entry']
                    : location[0] === 'child namespace' ? location[1].resolver.value['l entry']
                    : location[1].value.resolver.value['l entry']
                if (selected.benchmark !== Component_Type(component.constraints.definition)) abort('same node: component type')
                reference_constraints(component.value.constraints, abort)
                p.from.optional(component.value.arguments).map(args => {
                    p.from.optional(args.types).map(types => p.from.dictionary(types).map(argument => {
                        const selected = argument.value
                        if (selected[0] === 'required') guaranteed(selected[1], abort)
                        else if (selected[0] === 'optional') {
                            if (selected[1][0] === 'set') guaranteed(selected[1][1], abort)
                            else if (selected[1][0] === 'selection') possible(selected[1][1], abort)
                        }
                        return null
                    }))
                    p.from.optional(args.lookups).map(lookups => p.from.dictionary(lookups).map(argument => {
                        if (argument.value[0] === 'selection') lookup(argument.value[1], abort)
                        return null
                    }))
                    return null
                })
                break
            }
            case 'dictionary':
                p.from.optional(resolver[1].value.benchmark).map(benchmark => {
                    guaranteed(benchmark.value.selection.value, abort)
                    return null
                })
                value(resolver[1].value.resolver, abort)
                break
            case 'group':
                p.from.dictionary(resolver[1].value).map(property => {
                    value(property.value.resolver, abort)
                    return null
                })
                break
            case 'list':
                presence(resolver[1].constraints.definition.result, resolver[1].value.result, abort)
                p.from.optional(resolver[1].value.result).map(cursor => {
                    guaranteed(cursor.value.initial, abort)
                    const expected = cursor.constraints.result.path.tail.result
                    same(cursor.value.initial.tail.path.result, expected, 'list initial result type', abort)
                    result(cursor.value.next, expected, resolver[1].constraints.definition.value, abort)
                    return null
                })
                value(resolver[1].value.resolver, abort)
                break
            case 'optional':
                presence(resolver[1].constraints.definition.result, resolver[1].value.result, abort)
                option_constraints(resolver[1].value.constraints, abort)
                p.from.optional(resolver[1].value.presence).map(selection => { possible(selection, abort); return null })
                p.from.optional(resolver[1].value['not set constraints']).map(constraints => p.from.dictionary(constraints).map(selection => {
                    possible(selection, abort)
                    return null
                }))
                p.from.optional(resolver[1].value.result).map(selection => {
                    result(selection.value, selection.constraints.result.path.tail.result, resolver[1].constraints.definition.value, abort)
                    return null
                })
                value(resolver[1].value.resolver, abort)
                break
            case 'reference':
                lookup(resolver[1].value.type.lookup, abort)
                if (resolver[1].value.type.lookup.type.result !== resolver[1].constraints.definition.referent.constraints.dictionary) {
                    abort('same node: reference lookup dictionary')
                }
                reference_constraints(resolver[1].value.type.constraints, abort)
                break
            case 'state':
                p.from.dictionary(resolver[1].value.options).map(option => {
                    presence(resolver[1].constraints.definition.result, option.value.result, abort)
                    option_constraints(option.value.constraints, abort)
                    value(option.value.resolver, abort)
                    p.from.optional(option.value.result).map(selection => {
                        p.from.optional(resolver[1].constraints.definition.result).map(expected => {
                            result(selection.value, expected.path.tail.result, option.benchmark.value, abort)
                            return null
                        })
                        return null
                    })
                    return null
                })
                break
            case 'nothing':
            case 'simple': break
            default: p.exhaustive(resolver[0])
        }
    }

    const namespace = (resolver: s.resolver.Resolver, abort: Abort): void => {
        p.from.dictionary(resolver.namespaces).map(child => { namespace(child.value, abort); return null })
        p.from.dictionary(resolver.types).map(type => { value(type.value['root value resolver'], abort); return null })
    }

    const collect = (resolver: s.resolver.Value): void => {
        switch (resolver[0]) {
            case 'dictionary':
                p.from.optional(resolver[1].value.benchmark).map(benchmark => {
                    benchmarks = p.literal.segmented_list([benchmarks, p.literal.list([{
                        owner: resolver[1].constraints.definition.value,
                        target: benchmark.value.selection.constraints.dictionary.value,
                    }])])
                    return null
                })
                collect(resolver[1].value.resolver)
                break
            case 'list':
            case 'optional': collect(resolver[1].value.resolver); break
            case 'group':
                p.from.dictionary(resolver[1].value).map(property => { collect(property.value.resolver); return null })
                break
            case 'state':
                p.from.dictionary(resolver[1].value.options).map(option => { collect(option.value.resolver); return null })
                break
            case 'component':
            case 'reference':
            case 'nothing':
            case 'simple': break
            default: p.exhaustive(resolver[0])
        }
    }
    const collect_namespace = (resolver: s.resolver.Resolver): void => {
        p.from.dictionary(resolver.types).map(type => { collect(type.value['root value resolver']); return null })
        p.from.dictionary(resolver.namespaces).map(child => { collect_namespace(child.value); return null })
    }
    collect_namespace(schema.schema.resolver.implementations)
    namespace(schema.schema.resolver.implementations, abort)
}
