import * as p from '../../../../../temp/pareto_core_refiner.js'
import type * as core from 'pareto-core/schema'
import type * as source from '../../unresolved/schema.js'
import type * as target from '../schema.js'
import type * as errors from '../../../../../temp/liana_runtime_resolving_schema.js'

type Abort = (error: errors.Error) => never
type Types = {
    acyclic: p.lookup.Acyclic<target.Types.D>
    cyclic: p.lookup.Cyclic<target.Types.D>
    basic: core.Optional_Value<target.Basic_Types>
    children: target.Namespaces
    siblings: p.lookup.Acyclic<target.Namespaces.D>
}

type Type_Environment = {
    acyclic: Types['acyclic']
    children: Types['children']
    siblings: Types['siblings']
}

const Required = <T extends core.Value>(value: core.Optional_Value<T>, abort: Abort): T =>
    p.from.optional(value).decide(($) => $, () => abort({
        type: ['constraint', ['optional value is not set', null]],
    }))

const Entry = <T extends core.Value>(dictionary: core.Dictionary<T>, id: string, abort: Abort) => ({
    'l id': id,
    'l entry': p.from.dictionary(dictionary).get_entry(id, {
        no_such_entry: () => abort({ type: ['lookup', ['no such entry', id]] }),
    }),
})

const Lookup = <T extends core.Value>(lookup: p.lookup.Acyclic<T>, id: string, abort: Abort) => ({
    'l id': id,
    'l entry': lookup.get_entry(id, {
        no_such_entry: () => abort({ type: ['lookup', ['no such entry', id]] }),
        no_context_lookup: () => abort({ type: ['lookup', ['no context lookup', null]] }),
        cycle_detected: () => abort({ type: ['lookup', ['cycle detected', null]] }),
    }),
})

function Expect(node: target.Value, kind: 'component', abort: Abort): target.Value.component
function Expect(node: target.Value, kind: 'dictionary', abort: Abort): target.Value.dictionary
function Expect(node: target.Value, kind: 'group', abort: Abort): target.Value.group
function Expect(node: target.Value, kind: 'list', abort: Abort): target.Value.list
function Expect(node: target.Value, kind: 'optional', abort: Abort): target.Value.optional
function Expect(node: target.Value, kind: 'reference', abort: Abort): target.Value.reference
function Expect(node: target.Value, kind: 'state', abort: Abort): target.Value.state
function Expect(node: target.Value, kind: 'simple', abort: Abort): target.Value.simple
function Expect(node: target.Value, kind: 'nothing', abort: Abort): target.Value.nothing
function Expect(node: target.Value, kind: target.Value[0], abort: Abort): target.Value[1] {
    if (node[0] !== kind) return abort({ type: ['constraint', ['state', { expected: kind, found: node[0] }]] })
    return node[1]
}

const Component_Type = ($: target.Value.component): target.Type => {
    switch ($.type[0]) {
        case 'internal': return $.type[1]['l entry']
        case 'internal cyclic': return $.type[1]['l entry'].get_circular_dependent()
        case 'child': return $.type[1].type['l entry']
        default: return p.exhaustive($.type[0])
    }
}

const Type_Reference = ($: source.Type_Reference, types: Type_Environment, abort: Abort): target.Type_Reference => {
    switch ($.location[0]) {
        case 'internal': {
            const type = Lookup(types.acyclic, $.location[1], abort)
            return { location: ['internal', type], 'resulting type': type['l entry'] }
        }
        case 'child':
        case 'sibling': {
            const selected = $.location[1]
            const namespace = $.location[0] === 'child'
                ? Entry(types.children, selected.namespace, abort)
                : Lookup(types.siblings, selected.namespace, abort)
            const type = Entry(namespace['l entry'].types, selected.type, abort)
            const selection = { namespace, type }
            return {
                location: $.location[0] === 'child' ? ['child', selection] : ['sibling', selection],
                'resulting type': type['l entry'],
            }
        }
        default: return p.exhaustive($.location[0])
    }
}

const Value_Path = ($: source.Value_Path, root: target.Value, abort: Abort): target.Value_Path => {
    let current = root
    const tail = p.from.list($.tail).map((step): target.Value_Path.tail.L => {
        let item: target.Value_Path.tail.L
        switch (step[0]) {
            case 'dictionary':
                current = Expect(current, 'dictionary', abort).value
                item = ['dictionary', null]
                break
            case 'list':
                current = Expect(current, 'list', abort).value
                item = ['list', null]
                break
            case 'optional':
                current = Expect(current, 'optional', abort).value
                item = ['optional', null]
                break
            case 'group': {
                const entry = Entry(Expect(current, 'group', abort), step[1], abort)
                current = entry['l entry'].value
                item = ['group', entry]
                break
            }
            case 'state': {
                const entry = Entry(Expect(current, 'state', abort).options, step[1], abort)
                current = entry['l entry'].value
                item = ['state', entry]
                break
            }
            default: return p.exhaustive(step[0])
        }
        return item
    })
    return { tail, 'resulting node': current }
}

const Value_Reference = ($: source.Value_Reference, types: Type_Environment, abort: Abort): target.Value_Reference => {
    const type = Type_Reference($.type, types, abort)
    return { type, path: Value_Path($.path, type['resulting type']['root value'], abort) }
}

const Constraints = ($: source.Option_Constraints, types: Type_Environment, abort: Abort): target.Option_Constraints =>
    p.from.optional($).map(($) => p.from.dictionary($).map(($) => Value_Reference($, types, abort)))

const Value = ($: source.Value, types: Types, abort: Abort): target.Value => {
    switch ($[0]) {
        case 'component': {
            const selected = $[1].type
            let type: target.Value.component.type_
            switch (selected[0]) {
                case 'internal cyclic': type = ['internal cyclic', {
                    'l id': selected[1],
                    'l entry': types.cyclic.get_entry(selected[1], {
                        no_such_entry: () => abort({ type: ['lookup', ['no such entry', selected[1]]] }),
                        no_context_lookup: () => abort({ type: ['lookup', ['no context lookup', null]] }),
                        accessing_cyclic_sibling_before_it_is_resolved: () => abort({ type: ['lookup', ['cycle detected', null]] }),
                    }),
                }]; break
                case 'internal': type = ['internal', Lookup(types.acyclic, selected[1], abort)]; break
                case 'child': {
                    const namespace = Entry(types.children, selected[1].namespace, abort)
                    type = ['child', { namespace, type: Entry(namespace['l entry'].types, selected[1].type, abort) }]
                    break
                }
                default: return p.exhaustive(selected[0])
            }
            return ['component', { type }]
        }
        case 'dictionary': return ['dictionary', { value: Value($[1].value, types, abort) }]
        case 'group': return ['group', p.from.dictionary($[1]).map(($) => ({
            description: $.description,
            value: Value($.value, types, abort),
        }))]
        case 'list': return ['list', {
            value: Value($[1].value, types, abort),
            result: p.from.optional($[1].result).map(($) => Value_Reference($, types, abort)),
        }]
        case 'nothing': return ['nothing', null]
        case 'simple': return ['simple', Entry(Required(types.basic, abort), $[1], abort)]
        case 'optional': return ['optional', {
            constraints: Constraints($[1].constraints, types, abort),
            value: Value($[1].value, types, abort),
        }]
        case 'reference': {
            const referent = Value_Reference($[1].referent, types, abort)
            const selected = $[1].type[1]
            return ['reference', { referent, type: ['selected', {
                dictionary: Expect(referent.path['resulting node'], 'dictionary', abort),
                dependency: selected.dependency,
                constraints: Constraints(selected.constraints, types, abort),
            }] }]
        }
        case 'state': return ['state', {
            options: p.from.dictionary($[1].options).map(($) => ({
                constraints: Constraints($.constraints, types, abort),
                description: $.description,
                value: Value($.value, types, abort),
            })),
            result: p.from.optional($[1].result).map(($) => Value_Reference($, types, abort)),
        }]
        default: return p.exhaustive($[0])
    }
}

export const Schema = ($: source.Schema, abort: Abort): target.Schema => {
    const structure = Structure($.structure, p.select_lookup.acyclic.not_set(), abort)
    const links: Context['benchmark_links'] = { entries: undefined, checks: undefined, last_check: undefined }
    const schema = {
        structure,
        resolver: Resolver_Tree($.resolver, structure, p.select_lookup.acyclic.not_set(), links, abort),
    }
    Check_Benchmark_Links(links, abort)
    return schema
}

const Structure = ($: source.Structure, siblings: Types['siblings'], abort: Abort): target.Structure => {
    const namespaces = p.from.dictionary($.namespaces).resolve(($, id, siblings): target.Structure => Structure($, siblings, abort))
    const basic = $['basic types']
    const types = p.from.dictionary($.types).resolve(($, id, acyclic, cyclic): target.Type => ({
        'root value': Value($['root value'], { basic: p.literal.set(basic), acyclic, cyclic, children: namespaces, siblings }, abort),
    }))
    return { namespaces, 'basic types': basic, types }
}

const Resolver_Tree = ($: source.Resolver, definition: target.Structure, siblings: Types['siblings'],
    links: Context['benchmark_links'], abort: Abort): target.Resolver => {
    Dense($.namespaces, definition.namespaces, abort)
    const namespaces = p.from.dictionary($.namespaces).map(($, id) => Resolver_Tree($,
        Entry(definition.namespaces, id, abort)['l entry'],
        p.select_lookup.acyclic.from_resolved_dictionary(definition.namespaces), links, abort))
    const environment = {
        acyclic: p.select_lookup.acyclic.from_resolved_dictionary(definition.types),
        children: definition.namespaces,
        siblings,
    }
    const signatures = Signatures($.signatures, definition.types, environment, abort)
    return { namespaces, signatures, types: Resolvers($.types, definition.types, signatures, environment, namespaces, links, abort) }
}

export const Type_Specification = ($: source.Type_Specification, abort: Abort): target.Type_Specification => {
    const schema = Schema($.schema, abort)
    return { 'file extension': $['file extension'], schema, 'root type': Entry(schema.structure.types, $['root type'], abort) }
}

const Signatures = ($: source.Resolver_Signatures, types: target.Types, environment: Type_Environment, abort: Abort): target.Resolver_Signatures => {
    Dense($, types, abort)
    return p.from.dictionary($).resolve(($, id, siblings): target.Resolver_Signatures.D => {
        const benchmark = Entry(types, id, abort)['l entry']
        const parameters: target.Resolver_Signature.parameters = $.parameters[0] === 'same as'
            ? ['same as', Lookup(siblings, $.parameters[1], abort)]
            : ['local', {
                types: p.from.dictionary($.parameters[1].types).map(($) => ({
                    type: Type_Reference($.type, environment, abort),
                    presence: $.presence,
                })),
                lookups: p.from.dictionary($.parameters[1].lookups).map(($) => {
                    const value = Type_Reference($.referent, environment, abort)
                    const dictionary = Expect(value['resulting type']['root value'], 'dictionary', abort)
                    return { referent: value, dictionary, type: $.type, presence: $.presence }
                }),
            }]
        return {
            type: benchmark,
            parameters,
            'resolved parameters': parameters[0] === 'local' ? parameters[1] : parameters[1]['l entry']['resolved parameters'],
        }
    })
}

const Dense = <T extends core.Value, B extends core.Value>(values: core.Dictionary<T>, benchmark: core.Dictionary<B>, abort: Abort): void => {
    p.from.dictionary(benchmark).map((_, id) => p.from.dictionary(values).get_entry(id, {
        no_such_entry: () => abort({ type: ['missing required entries', p.literal.dictionary({ [id]: null })] }),
    }))
}

type Benchmark_Link = {
    owner: target.Value
    target: target.Value
    next: Benchmark_Link | undefined
}

type Context = {
    types: target.Types
    signatures: target.Resolver_Signatures
    environment: Type_Environment
    children: target.Resolver_Namespaces
    signature: target.Resolver_Signature
    siblings: p.lookup.Acyclic<target.Resolver_Value_Group.D>
    parent: p.lookup.Acyclic<target.Resolver_Value_Group.D>
    options: core.Optional_Value<target.Resolver_Option_Constraints>
    cursor: target.Value_Result
    benchmark: core.Optional_Value<target.Resolver_Benchmark>
    dictionary: core.Optional_Value<target.Dictionary>
    benchmark_links: {
        entries: Benchmark_Link | undefined
        checks: Benchmark_Link | undefined
        last_check: Benchmark_Link | undefined
    }
}

const Resolvers = ($: source.Resolver_Types, types: target.Types, signatures: target.Resolver_Signatures,
    environment: Type_Environment, children: target.Resolver_Namespaces,
    benchmark_links: Context['benchmark_links'], abort: Abort): target.Resolver_Types => {
    Dense($, signatures, abort)
    const resolvers = p.from.dictionary($).map(($, id) => {
        const benchmark = Entry(signatures, id, abort)['l entry']
        const signature = benchmark
        return { signature, 'root value resolver': Resolver($['root value resolver'], signature.type['root value'], {
            types, signatures, signature, benchmark_links, environment, children,
            siblings: p.select_lookup.acyclic.not_set(),
            parent: p.select_lookup.acyclic.not_set(),
            options: p.literal.not_set(),
            cursor: p.literal.not_set(),
            benchmark: p.literal.not_set(),
            dictionary: p.literal.not_set(),
        }, abort) }
    })
    return resolvers
}

const Check_Benchmark_Links = (benchmark_links: Context['benchmark_links'], abort: Abort): void => {
    let check = benchmark_links.checks
    while (check !== undefined) {
        let entry = benchmark_links.entries
        let found = false
        while (entry !== undefined) {
            if (entry.owner === check.owner) {
                found = true
                if (entry.target !== check.target) return abort({ type: ['constraint', ['same node', 'benchmark target']] })
            }
            entry = entry.next
        }
        if (!found) {
            const owner = check.owner
            const name = owner[0] === 'component'
                ? owner[1].type[0] === 'child' ? owner[1].type[1].type['l id'] : owner[1].type[1]['l id']
                : owner[0]
            return abort({ type: ['constraint', ['state', { expected: 'benchmarked dictionary entry', found: name }]] })
        }
        check = check.next
    }
}

const Type_Node = ($: source.Type_Reference, context: Context, abort: Abort) =>
    Type_Reference($, context.environment, abort)

const Relative = ($: source.Resolver_Relative_Value_Selection, root: target.Value, context: Context, abort: Abort): target.Resolver_Relative_Value_Selection => {
    let current = root
    const path = p.from.list($.path).map((step): target.Resolver_Relative_Value_Selection.path.L => {
        let item: target.Resolver_Relative_Value_Selection.path.L
        switch (step[0]) {
            case 'component':
                current = Component_Type(Expect(current, 'component', abort))['root value']
                item = ['component', null]
                break
            case 'group': {
                const entry = Entry(Expect(current, 'group', abort), step[1], abort)
                current = entry['l entry'].value
                item = ['group', entry]
                break
            }
            case 'reference': {
                const definition = Expect(current, 'reference', abort)
                current = definition.type[1].dictionary.value
                item = ['reference', { definition }]
                break
            }
            case 'optional':
                current = Expect(current, 'optional', abort).value
                item = ['optional', null]
                break
            case 'state result': {
                Expect(current, 'state', abort)
                const type = Type_Node(step[1], context, abort)
                current = type['resulting type']['root value']
                item = ['state result', type]
                break
            }
            case 'list result': {
                Expect(current, 'list', abort)
                const value = Type_Node(step[1], context, abort)
                current = value['resulting type']['root value']
                item = ['list result', value]
                break
            }
            case 'benchmark link': {
                const reference = Value_Reference(step[1], context.environment, abort)
                const check: Benchmark_Link = { owner: current, target: reference.path['resulting node'], next: undefined }
                if (context.benchmark_links.last_check === undefined) context.benchmark_links.checks = check
                else context.benchmark_links.last_check.next = check
                context.benchmark_links.last_check = check
                current = reference.path['resulting node']
                item = ['benchmark link', reference]
                break
            }
            case 'component constraint': {
                Expect(current, 'component', abort)
                const reference = Value_Reference(step[1].target, context.environment, abort)
                current = reference.path['resulting node']
                item = ['component constraint', { name: step[1].name, target: reference }]
                break
            }
            case 'option constraint': {
                const option = Entry(Expect(current, 'state', abort).options, step[1].option, abort)
                const declarations = Required(option['l entry'].constraints, abort)
                const constraint = Entry(declarations, step[1].constraint, abort)
                current = constraint['l entry'].path['resulting node']
                item = ['option constraint', {
                    option,
                    constraint,
                }]
                break
            }
            case 'optional value constraint': {
                const source = Expect(current, 'optional', abort).constraints
                const declarations = Required(source, abort)
                const constraint = Entry(declarations, step[1], abort)
                current = constraint['l entry'].path['resulting node']
                item = ['optional value constraint', {
                    source,
                    constraint,
                }]
                break
            }
            case 'reference constraint': {
                const source = Expect(current, 'reference', abort).type[1].constraints
                const declarations = Required(source, abort)
                const constraint = Entry(declarations, step[1][1], abort)
                current = constraint['l entry'].path['resulting node']
                item = ['reference constraint', ['selected', {
                    source,
                    constraint,
                }]]
                break
            }
            default: return p.exhaustive(step[0])
        }
        return item
    })
    return { path, 'resulting node': current }
}

const Possible_Node = ($: target.Resolver_Possible_Value_Selection): target.Value => {
    switch ($[0]) {
        case 'parameter': return $[1]['l entry'].type['resulting type']['root value']
        case 'optional value': return $[1].optional.value
        case 'result': return $[1][1].result['resulting type']['root value']
        default: return p.exhaustive($[0])
    }
}

const Option_Node = ($: target.Resolver_Option_Constraints.D): target.Value =>
    $[0] === 'state' ? $[1].option['l entry'].value : Possible_Node($[1])

const Constraint_Node = ($: target.Resolver_Value_Constraint): target.Value =>
    $.constraint.type[0] === 'state'
        ? $.constraint.type[1].option['l entry'].value
        : $.constraint.type[1]['selected optional value'].value

const Guaranteed = ($: source.Resolver_Guaranteed_Value_Selection, context: Context, abort: Abort): target.Resolver_Guaranteed_Value_Selection => {
    let node: target.Value
    let start: target.Resolver_Guaranteed_Value_Selection.start
    switch ($.start[0]) {
        case 'sibling':
        case 'parent sibling': {
            const entry = Lookup($.start[0] === 'sibling' ? context.siblings : context.parent, $.start[1], abort)
            start = $.start[0] === 'sibling' ? ['sibling', entry] : ['parent sibling', entry]
            node = entry['l entry'].definition.value
            break
        }
        case 'parameter': {
            const entry = Entry(context.signature['resolved parameters'].types, $.start[1], abort)
            start = ['parameter', entry]
            node = entry['l entry'].type['resulting type']['root value']
            break
        }
        case 'option constraint': {
            const entry = Entry(Required(context.options, abort), $.start[1], abort)
            start = ['option constraint', entry]
            node = Option_Node(entry['l entry'])
            break
        }
        case 'list cursor':
            node = Required(context.cursor, abort).path['resulting node']
            start = ['list cursor', null]
            break
        case 'linked entry':
            node = Required(context.benchmark, abort)['resulting dictionary'].value
            start = ['linked entry', null]
            break
        case 'constraint': {
            const selection = $.start[1]
            const value = Lookup(context.siblings, selection[1].property, abort)
            const resolver = value['l entry'].resolver
            if (selection[0] === 'component') {
                if (resolver[0] !== 'component') return abort({ type: ['constraint', ['state', { expected: 'component', found: resolver[0] }]] })
                const component = resolver[1]
                const constraints = Required(component.constraints, abort)
                const constraint = Entry(constraints, selection[1].constraint, abort)
                start = ['constraint', ['component', {
                    property: value,
                    constraint,
                }]]
                node = Constraint_Node(constraint['l entry'])
            } else {
                if (resolver[0] !== 'reference') return abort({ type: ['constraint', ['state', { expected: 'reference', found: resolver[0] }]] })
                const reference = resolver[1]
                const selected = reference.type[1]
                const constraints = Required(selected.constraints, abort)
                const constraint = Entry(constraints, selection[1].constraint, abort)
                start = ['constraint', ['reference', {
                    property: value,
                    constraint,
                }]]
                node = Constraint_Node(constraint['l entry'])
            }
            break
        }
        case 'result': {
            const result = $.start[1]
            if (result[0] !== 'list') {
                const possible = Possible(['result', result], context, abort)
                if (possible[0] !== 'result') return abort({ type: ['constraint', ['optional value is not set', null]] })
                start = ['result', possible[1]]
                node = Possible_Node(possible)
                break
            }
            const value = Lookup(context.siblings, result[1].property, abort)
            const resolver = value['l entry'].resolver
            if (resolver[0] !== 'list') return abort({ type: ['constraint', ['state', { expected: 'list', found: resolver[0] }]] })
            const list = resolver[1]
            const selection = Required(list.result, abort)
            start = ['result', ['list', {
                property: value,
                'list result': selection,
            }]]
            node = selection.type['resulting type']['root value']
            break
        }
        default: return p.exhaustive($.start[0])
    }
    const tail = Relative($.tail, node, context, abort)
    return { start, tail, 'resulting node': tail['resulting node'] }
}

const Possible = ($: source.Resolver_Possible_Value_Selection, context: Context, abort: Abort): target.Resolver_Possible_Value_Selection => {
    switch ($[0]) {
        case 'parameter': return ['parameter', Entry(context.signature['resolved parameters'].types, $[1], abort)]
        case 'optional value': {
            const value = Guaranteed($[1].selection, context, abort)
            const optional = Expect(value['resulting node'], 'optional', abort)
            return ['optional value', { selection: value, optional }]
        }
        case 'result': {
            const selection = $[1]
            const value = Lookup(context.siblings, selection[1].property, abort)
            const resolver = value['l entry'].resolver
            const result = Type_Node(selection[1].result, context, abort)
            switch (selection[0]) {
                case 'state': {
                    if (resolver[0] !== 'state') return abort({ type: ['constraint', ['state', { expected: 'state', found: resolver[0] }]] })
                    const state = resolver[1]
                    return ['result', ['state', { property: value, state, result }]]
                }
                case 'optional value': {
                    if (resolver[0] !== 'optional') return abort({ type: ['constraint', ['state', { expected: 'optional', found: resolver[0] }]] })
                    const optional = resolver[1]
                    return ['result', ['optional value', { property: value, 'optional value': optional, result }]]
                }
                default: return p.exhaustive(selection[0])
            }
        }
        default: return p.exhaustive($[0])
    }
}

const Option_Constraints = ($: source.Resolver_Option_Constraints, context: Context, abort: Abort): target.Resolver_Option_Constraints =>
    p.from.dictionary($).map(($): target.Resolver_Option_Constraints.D => {
        switch ($[0]) {
            case 'state': {
                const value = Guaranteed($[1].selection, context, abort)
                const state = Expect(value['resulting node'], 'state', abort)
                return ['state', {
                    selection: value,
                    'selected state': state,
                    option: Entry(state.options, $[1].option, abort),
                }]
            }
            case 'assert is set': return ['assert is set', Possible($[1], context, abort)]
            default: return p.exhaustive($[0])
        }
    })

const Value_Constraints = ($: source.Resolver_Value_Constraints, node: target.Value, context: Context, abort: Abort): target.Resolver_Value_Constraints =>
    p.from.dictionary($).resolve(($, id, siblings): target.Resolver_Value_Constraint => {
        const start: target.Resolver_Value_Constraint.start = $.start[0] === 'value'
            ? ['value', null] : ['sibling', Lookup(siblings, $.start[1], abort)]
        const selection = Relative($.constraint.selection,
            start[0] === 'value' ? node : Constraint_Node(start[1]['l entry']), context, abort)
        let type: target.Resolver_Constraint.type_
        switch ($.constraint.type[0]) {
            case 'state': {
                const state = Expect(selection['resulting node'], 'state', abort)
                type = ['state', { 'selected state': state, option: Entry(state.options, $.constraint.type[1].option, abort) }]
                break
            }
            case 'optional value':
                type = ['optional value', { 'selected optional value': Expect(selection['resulting node'], 'optional', abort) }]
                break
            default: return p.exhaustive($.constraint.type[0])
        }
        return { start, constraint: { selection, type } }
    })

const Result = ($: source.Resolver_Result_Selection, node: target.Value, context: Context, expected: target.Value, abort: Abort): target.Resolver_Result_Selection => {
    const selection: target.Resolver_Result_Selection = $[0] === 'value'
        ? ['value', Relative($[1], node, context, abort)]
        : ['context', Guaranteed($[1], context, abort)]
    if (selection[1]['resulting node'] !== expected) return abort({ type: ['constraint', ['same node', 'result type']] })
    return selection
}

const Benchmark = ($: source.Resolver_Benchmark, context: Context, abort: Abort): target.Resolver_Benchmark => {
    const value = Guaranteed($.selection, context, abort)
    const dictionary = Expect(value['resulting node'], 'dictionary', abort)
    return {
        selection: value,
        'resulting dictionary': dictionary,
        coverage: $.coverage,
    }
}

const Lookup_Selection = ($: source.Resolver_Lookup_Selection, context: Context, abort: Abort): target.Resolver_Lookup_Selection => {
    let type: target.Resolver_Lookup_Selection.type_
    let dictionary: target.Dictionary
    switch ($.type[0]) {
        case 'parameter': {
            const entry = Entry(context.signature['resolved parameters'].lookups, $.type[1], abort)
            dictionary = entry['l entry'].dictionary
            type = ['parameter', entry]
            break
        }
        case 'cyclic':
            dictionary = Required(context.dictionary, abort)
            type = ['cyclic', ['siblings', dictionary]]
            break
        case 'acyclic':
            if ($.type[1][0] === 'siblings') {
                dictionary = Required(context.dictionary, abort)
                type = ['acyclic', ['siblings', dictionary]]
            } else {
                const value = Guaranteed($.type[1][1].selection, context, abort)
                dictionary = Expect(value['resulting node'], 'dictionary', abort)
                type = ['acyclic', ['resolved dictionary', {
                    selection: value, 'selected dictionary': dictionary,
                }]]
            }
            break
        default: return p.exhaustive($.type[0])
    }
    return { type, 'resulting dictionary': dictionary }
}

const Optional_Initialization = ($: source.Resolver_Optional_Value_Initialization, context: Context, abort: Abort): target.Resolver_Optional_Value_Initialization => {
    switch ($[0]) {
        case 'not set': return ['not set', null]
        case 'set': return ['set', Guaranteed($[1], context, abort)]
        case 'selection': return ['selection', Possible($[1], context, abort)]
        default: return p.exhaustive($[0])
    }
}

const Resolver = ($: source.Resolver_Value, definition: target.Value, context: Context, abort: Abort): target.Resolver_Value => {
    switch ($[0]) {
        case 'component': {
            const component = Expect(definition, 'component', abort)
            const selected = $[1].location
            let location: target.Resolver_Value.component.location
            let signature: target.Resolver_Signature
            if (selected[0] === 'internal') {
                const entry = Entry(context.signatures, selected[1], abort)
                location = ['internal', entry]
                signature = entry['l entry']
            } else {
                const namespace = Entry(context.children, selected[1].namespace, abort)
                const resolver = Entry(namespace['l entry'].signatures, selected[1].resolver, abort)
                location = ['child', { namespace, resolver }]
                signature = resolver['l entry']
            }
            if (signature.type !== Component_Type(component)) return abort({ type: ['constraint', ['same node', 'component type']] })
            return ['component', {
                    definition: component,
                    location,
                    signature,
                    arguments: p.from.optional($[1].arguments).map(($) => ({
                        types: p.from.optional($.types).map(($) => {
                            Dense($, signature['resolved parameters'].types, abort)
                            return p.from.dictionary($).map(($, id) => {
                                Entry(signature['resolved parameters'].types, id, abort)
                                let value: target.Resolver_Value.component.arguments_.O.types.O.D
                                switch ($[0]) {
                                    case 'optional': value = ['optional', Optional_Initialization($[1], context, abort)]; break
                                    case 'required': value = ['required', Guaranteed($[1], context, abort)]; break
                                    case 'parameter': value = ['parameter', Entry(context.signature['resolved parameters'].types, $[1], abort)]; break
                                    default: return p.exhaustive($[0])
                                }
                                return value
                            })
                        }),
                        lookups: p.from.optional($.lookups).map(($) => {
                            Dense($, signature['resolved parameters'].lookups, abort)
                            return p.from.dictionary($).map(($, id): target.Resolver_Value.component.arguments_.O.lookups.O.D => {
                                Entry(signature['resolved parameters'].lookups, id, abort)
                                return $[0] === 'selection' ? ['selection', Lookup_Selection($[1], context, abort)] : $
                            })
                        }),
                    })),
                    constraints: p.from.optional($[1].constraints).map(($) =>
                        Value_Constraints($, signature.type['root value'], context, abort)),
            }]
        }
        case 'dictionary': {
            const dictionary = Expect(definition, 'dictionary', abort)
            const benchmark = p.from.optional($[1].benchmark).map(($) => Benchmark($, context, abort))
            p.from.optional(benchmark).map(($) => {
                context.benchmark_links.entries = {
                    owner: dictionary.value, target: $['resulting dictionary'].value, next: context.benchmark_links.entries,
                }
                return null
            })
            return ['dictionary', {
                    definition: dictionary,
                    benchmark,
                    resolver: Resolver($[1].resolver, dictionary.value, {
                        ...context, dictionary: p.literal.set(dictionary), benchmark,
                    }, abort),
            }]
        }
        case 'group': {
            const group = Expect(definition, 'group', abort)
            Dense($[1], group, abort)
            return ['group', p.from.dictionary($[1]).resolve(
                ($, id, siblings): target.Resolver_Value_Group.D => {
                    const benchmark = Entry(group, id, abort)['l entry']
                    return {
                        definition: benchmark,
                        resolver: Resolver($.resolver, benchmark.value, { ...context, siblings, parent: context.siblings }, abort),
                    }
                },
            )]
        }
        case 'list': {
            const list = Expect(definition, 'list', abort)
            p.from.optional(list.result).decide(
                () => Required($[1].result, abort),
                () => p.from.optional($[1].result).decide(
                    () => abort({ type: ['constraint', ['state', { expected: 'no structural list result', found: 'resolver list result' }]] }),
                    () => null,
                ),
            )
            const result = p.from.optional($[1].result).map(($): target.Resolver_Value_List_Result => {
                const declaration = Required(list.result, abort)
                const expected = declaration.path['resulting node']
                const type = Type_Node($.type, context, abort)
                if (type['resulting type']['root value'] !== expected) return abort({
                    type: ['constraint', ['same node', 'structural list result type']],
                })
                const initial = Guaranteed($.initial, context, abort)
                if (initial['resulting node'] !== expected) return abort({
                    type: ['constraint', ['same node', 'list initial result type']],
                })
                const next = Result($.next, list.value, { ...context, cursor: list.result }, expected, abort)
                return { type, initial, next }
            })
            return ['list', {
                    definition: list, result,
                    resolver: Resolver($[1].resolver, list.value, {
                        ...context, cursor: list.result,
                    }, abort),
            }]
        }
        case 'nothing': Expect(definition, 'nothing', abort); return ['nothing', null]
        case 'simple': Expect(definition, 'simple', abort); return ['simple', null]
        case 'optional': {
            const optional = Expect(definition, 'optional', abort)
            const constraints = p.from.optional($[1].constraints).map(($) => Option_Constraints($, context, abort))
            return ['optional', {
                    constraints,
                    resolver: Resolver($[1].resolver, optional.value, { ...context, options: constraints }, abort),
                    'not set constraints': p.from.optional($[1]['not set constraints']).map(($) =>
                        p.from.dictionary($).map(($) => Possible($, context, abort))),
            }]
        }
        case 'reference': {
            const reference = Expect(definition, 'reference', abort)
            const selected = $[1].type[1]
            const lookup = Lookup_Selection(selected.lookup, context, abort)
            return ['reference', {
                definition: reference, type: ['selected', {
                    definition: reference.type[1], lookup,
                    constraints: p.from.optional(selected.constraints).map(($) =>
                        Value_Constraints($, lookup['resulting dictionary'].value, context, abort)),
                }],
            }]
        }
        case 'state': {
            const state = Expect(definition, 'state', abort)
            Dense($[1].options, state.options, abort)
            const result = p.from.optional($[1].result).map(($) => Type_Node($, context, abort))
            return ['state', {
                    definition: state, result,
                    options: p.from.dictionary($[1].options).map(($, id) => {
                        const benchmark = Entry(state.options, id, abort)['l entry']
                        const constraints = p.from.optional($.constraints).map(($) => Option_Constraints($, context, abort))
                        const next = { ...context, options: constraints }
                        const resolver = Resolver($.resolver, benchmark.value, next, abort)
                        const result_context = resolver[0] === 'group'
                            ? { ...next, siblings: p.select_lookup.acyclic.from_resolved_dictionary(resolver[1]), parent: context.siblings }
                            : next
                        p.from.optional(result).decide(
                            () => Required($.result, abort),
                            () => p.from.optional($.result).decide(
                                () => abort({ type: ['constraint', ['state', { expected: 'no option result', found: 'option result' }]] }),
                                () => null,
                            ),
                        )
                        return {
                            constraints,
                            resolver,
                            result: p.from.optional($.result).map(($) => Result($, benchmark.value, result_context, Required(result, abort)['resulting type']['root value'], abort)),
                        }
                    }),
            }]
        }
        default: return p.exhaustive($[0])
    }
}
