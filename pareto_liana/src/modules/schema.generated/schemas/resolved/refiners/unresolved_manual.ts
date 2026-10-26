import * as p from '../../../../../temp/pareto_core_refiner.js'
import type * as core from 'pareto-core/schema'
import type * as source from './source.js'
import type * as target from '../schema.js'
import type * as errors from '../../../../../temp/liana_runtime_resolving_schema.js'

type Abort = (error: errors.Error) => never
type Types = {
    acyclic: p.lookup.Acyclic<target.namespaces.structure.types.Types.D>
    cyclic: p.lookup.Cyclic<target.namespaces.structure.types.Types.D>
    basic: core.Optional_Value<target.namespaces.structure.types.Basic_Types>
    children: target.namespaces.structure.types.Namespaces
    siblings: p.lookup.Acyclic<target.namespaces.structure.types.Namespaces.D>
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

function Expect(node: target.namespaces.structure.types.Value, kind: 'component', abort: Abort): target.namespaces.structure.types.Value.component
function Expect(node: target.namespaces.structure.types.Value, kind: 'dictionary', abort: Abort): target.namespaces.structure.types.Value.dictionary
function Expect(node: target.namespaces.structure.types.Value, kind: 'group', abort: Abort): target.namespaces.structure.types.Value.group
function Expect(node: target.namespaces.structure.types.Value, kind: 'list', abort: Abort): target.namespaces.structure.types.Value.list
function Expect(node: target.namespaces.structure.types.Value, kind: 'optional', abort: Abort): target.namespaces.structure.types.Value.optional
function Expect(node: target.namespaces.structure.types.Value, kind: 'reference', abort: Abort): target.namespaces.structure.types.Value.reference
function Expect(node: target.namespaces.structure.types.Value, kind: 'state', abort: Abort): target.namespaces.structure.types.Value.state
function Expect(node: target.namespaces.structure.types.Value, kind: 'simple', abort: Abort): target.namespaces.structure.types.Value.simple
function Expect(node: target.namespaces.structure.types.Value, kind: 'nothing', abort: Abort): target.namespaces.structure.types.Value.nothing
function Expect(node: target.namespaces.structure.types.Value, kind: target.namespaces.structure.types.Value[0], abort: Abort): target.namespaces.structure.types.Value[1] {
    if (node[0] !== kind) return abort({ type: ['constraint', ['state', { expected: kind, found: node[0] }]] })
    return node[1]
}

const Component_Type = ($: target.namespaces.structure.types.Value.component): target.namespaces.structure.types.Type => {
    return $.type.result
}

const require_public = (type: target.namespaces.structure.types.Type, abort: Abort): null => {
    if (type.visibility[0] !== 'public') return abort({
        type: ['constraint', ['state', { expected: 'public', found: type.visibility[0] }]],
    })
    return type.visibility[1]
}

const Type_Reference = ($: source.Type_Reference, types: Type_Environment, abort: Abort): target.namespaces.structure.types.Type_Reference => {
    switch ($.location[0]) {
        case 'local': {
            const type = Lookup(types.acyclic, $.location[1], abort)
            return { location: { value: ['local', type], result: type['l entry'] } }
        }
        case 'child namespace':
        case 'sibling namespace': {
            const selected = $.location[1]
            const namespace = $.location[0] === 'child namespace'
                ? Entry(types.children, selected.namespace, abort)
                : Lookup(types.siblings, selected.namespace, abort)
            const type = Entry(namespace['l entry'].types, selected.type, abort)
            const selection = { namespace, type }
            return {
                location: { value: $.location[0] === 'child namespace' ? ['child namespace', selection] : ['sibling namespace', selection],
                    result: type['l entry'] },
            }
        }
        default: return p.exhaustive($.location[0])
    }
}

const Value_Path = ($: source.Value_Path, root: target.namespaces.structure.types.Value, abort: Abort): target.namespaces.structure.types.Value_Subselection => {
    let current = root
    const tail = p.from.list($.tail).map((step): target.namespaces.structure.types.Value_Subselection.tail.value.L => {
        let item: target.namespaces.structure.types.Value_Subselection.tail.value.L.value.value
        const definition = current
        switch (step[0]) {
            case 'dictionary':
                current = Expect(current, 'dictionary', abort).value
                item = ['dictionary', { constraints: { definition: Expect(definition, 'dictionary', abort) }, value: null }]
                break
            case 'list':
                current = Expect(current, 'list', abort).value
                item = ['list', { constraints: { definition: Expect(definition, 'list', abort) }, value: null }]
                break
            case 'optional':
                current = Expect(current, 'optional', abort).value
                item = ['optional', { constraints: { definition: Expect(definition, 'optional', abort) }, value: null }]
                break
            case 'group': {
                const entry = Entry(Expect(current, 'group', abort), step[1], abort)
                current = entry['l entry'].value
                item = ['group', { constraints: { definition: Expect(definition, 'group', abort) }, value: entry }]
                break
            }
            case 'state': {
                const entry = Entry(Expect(current, 'state', abort).options, step[1], abort)
                current = entry['l entry'].value
                item = ['state', { constraints: { definition: Expect(definition, 'state', abort) }, value: entry }]
                break
            }
            default: return p.exhaustive(step[0])
        }
        return { value: { value: item, result: current }, result: current }
    })
    return { tail: { value: tail, result: current } }
}

const Signature_Value_Path = (
    $: source.Signature_Value_Subselection,
    root: target.namespaces.structure.types.Value,
    abort: Abort,
): target.namespaces.declarations.types.Signature_Value_Subselection => {
    let current = root
    const tail = p.from.list($.tail).map((step): target.namespaces.declarations.types.Signature_Value_Subselection.tail.value.L => {
        let item: target.namespaces.declarations.types.Signature_Value_Subselection.tail.value.L.value.value
        const definition = current
        switch (step[0]) {
            case 'dictionary':
                current = Expect(current, 'dictionary', abort).value
                item = ['dictionary', { constraints: { definition: Expect(definition, 'dictionary', abort) }, value: null }]
                break
            case 'list':
                current = Expect(current, 'list', abort).value
                item = ['list', { constraints: { definition: Expect(definition, 'list', abort) }, value: null }]
                break
            case 'optional':
                current = Expect(current, 'optional', abort).value
                item = ['optional', { constraints: { definition: Expect(definition, 'optional', abort) }, value: null }]
                break
            case 'group': {
                const entry = Entry(Expect(current, 'group', abort), step[1], abort)
                current = entry['l entry'].value
                item = ['group', { constraints: { definition: Expect(definition, 'group', abort) }, value: entry }]
                break
            }
            case 'state': {
                const entry = Entry(Expect(current, 'state', abort).options, step[1], abort)
                current = entry['l entry'].value
                item = ['state', { constraints: { definition: Expect(definition, 'state', abort) }, value: entry }]
                break
            }
            default: return p.exhaustive(step[0])
        }
        return { value: { value: item, result: current }, result: current }
    })
    return { tail: { value: tail, result: current } }
}

const Signature_Type_Reference = (
    $: source.Signature_Type_Reference,
    types: Type_Environment,
    abort: Abort,
): target.namespaces.declarations.types.Signature_Type_Reference => {
    const location = $.location
    switch (location[0]) {
        case 'local': {
            const type = Lookup(types.acyclic, location[1], abort)
            return { location: { value: ['local', type], result: type['l entry'] } }
        }
        case 'child namespace':
        case 'sibling namespace': {
            const selected = location[1]
            const namespace = location[0] === 'child namespace'
                ? Entry(types.children, selected.namespace, abort)
                : Lookup(types.siblings, selected.namespace, abort)
            const type = Entry(namespace['l entry'].types, selected.type, abort)
            const selection = { namespace, type }
            return {
                location: {
                    value: location[0] === 'child namespace' ? ['child namespace', selection] : ['sibling namespace', selection],
                    result: type['l entry'],
                },
            }
        }
        default: return p.exhaustive(location[0])
    }
}

const Signature_Value_Reference = (
    $: source.Signature_Value_Reference,
    types: Type_Environment,
    abort: Abort,
): target.namespaces.declarations.types.Signature_Value_Reference => {
    const type = Signature_Type_Reference($.type, types, abort)
    return {
        type,
        subselection: Signature_Value_Path($.subselection, type.location.result['root value'], abort),
    }
}

const Value_Reference = ($: source.Value_Reference, types: Type_Environment, abort: Abort): target.namespaces.structure.types.Value_Reference => {
    const type = Type_Reference($.type, types, abort)
    return { type, path: Value_Path($.path, type.location.result['root value'], abort) }
}

const Constraints = ($: source.Option_Constraints, types: Type_Environment, abort: Abort): target.namespaces.structure.types.Option_Constraints =>
    p.from.optional($).map(($) => p.from.dictionary($).map(($) => Value_Reference($, types, abort)))

const Value = ($: source.Value, types: Types, abort: Abort): target.namespaces.structure.types.Value => {
    switch ($[0]) {
        case 'component': {
            const selected = $[1].type
            let type: target.namespaces.structure.types.Value.component.type_.value
            switch (selected[0]) {
                case 'local cyclic': type = ['local cyclic', {
                    'l id': selected[1],
                    'l entry': types.cyclic.get_entry(selected[1], {
                        no_such_entry: () => abort({ type: ['lookup', ['no such entry', selected[1]]] }),
                        no_context_lookup: () => abort({ type: ['lookup', ['no context lookup', null]] }),
                        accessing_cyclic_sibling_before_it_is_resolved: () => abort({ type: ['lookup', ['cycle detected', null]] }),
                    }),
                }]; break
                case 'local': type = ['local', Lookup(types.acyclic, selected[1], abort)]; break
                case 'child namespace':
                case 'sibling namespace': {
                    const namespace = selected[0] === 'child namespace'
                        ? Entry(types.children, selected[1].namespace, abort)
                        : Lookup(types.siblings, selected[1].namespace, abort)
                    const entry = Entry(namespace['l entry'].types, selected[1].type, abort)
                    const selection = { namespace, type: {
                        constraints: { public: require_public(entry['l entry'], abort) }, value: entry,
                    } }
                    type = selected[0] === 'child namespace' ? ['child namespace', selection] : ['sibling namespace', selection]
                    break
                }
                default: return p.exhaustive(selected[0])
            }
            return ['component', { type: { value: type, get result() {
                return type[0] === 'child namespace' || type[0] === 'sibling namespace' ? type[1].type.value['l entry']
                    : type[0] === 'local' ? type[1]['l entry'] : type[1]['l entry'].get_circular_dependent()
            } }, constraints: Constraints($[1].constraints, types, abort) }]
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
        case 'simple': {
            const basic = Required(types.basic, abort)
            return ['simple', { constraints: { 'basic types': basic }, value: Entry(basic, $[1], abort) }]
        }
        case 'optional': return ['optional', {
            constraints: Constraints($[1].constraints, types, abort),
            value: Value($[1].value, types, abort),
            result: p.from.optional($[1].result).map(($) => Value_Reference($, types, abort)),
        }]
        case 'reference': {
            const referent = Value_Reference($[1].referent, types, abort)
            const selected = $[1].type
            return ['reference', { referent: {
                constraints: { dictionary: Expect(referent.path.tail.result, 'dictionary', abort) },
                value: referent,
            }, type: {
                dependency: selected.dependency,
                constraints: Constraints(selected.constraints, types, abort),
            } }]
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

export const Schema = ($: source.Schema, abort: Abort): target.types.Schema => {
    const structure = Structure($.structure, p.select_lookup.acyclic.not_set(), abort)
    const links: Context['benchmark_links'] = { entries: undefined, checks: undefined, last_check: undefined }
    const declarations = Declaration_Tree($.resolver.declarations, structure, p.select_lookup.acyclic.not_set(), abort)
    const schema = { structure, resolver: { declarations, implementations: Resolver_Tree(
        $.resolver.implementations, declarations, structure, p.select_lookup.acyclic.not_set(), p.literal.not_set(), links, abort,
    ) } }
    Check_Benchmark_Links(links, abort)
    return schema
}

const Structure = ($: source.Structure, siblings: Types['siblings'], abort: Abort): target.namespaces.structure.types.Structure => {
    const namespaces = p.from.dictionary($.namespaces).resolve(($, id, siblings): target.namespaces.structure.types.Structure => Structure($, siblings, abort))
    const basic = $['basic types']
    const types = p.from.dictionary($.types).resolve(($, id, acyclic, cyclic): target.namespaces.structure.types.Type => ({
        visibility: $.visibility,
        'root value': Value($['root value'], { basic: p.literal.set(basic), acyclic, cyclic, children: namespaces, siblings }, abort),
    }))
    return { namespaces, 'basic types': basic, types }
}

const Declaration_Tree = (
    $: source.Signature_Namespace,
    definition: target.namespaces.structure.types.Structure,
    siblings: Types['siblings'],
    abort: Abort,
): target.namespaces.declarations.types.Declaration_Namespace => {
    Dense($.namespaces, definition.namespaces, abort)
    const namespaces = p.from.dictionary($.namespaces).map(($, id) => {
        const benchmark = Entry(definition.namespaces, id, abort)['l entry']
        return { benchmark, value: Declaration_Tree(
            $, benchmark, p.select_lookup.acyclic.from_resolved_dictionary(definition.namespaces), abort,
        ) }
    })
    return { namespaces, types: Declarations($.types, definition.types, {
        acyclic: p.select_lookup.acyclic.from_resolved_dictionary(definition.types),
        children: definition.namespaces, siblings,
    }, abort) }
}

const Resolver_Tree = (
    $: source.Resolver,
    declarations: target.namespaces.declarations.types.Declaration_Namespace,
    definition: target.namespaces.structure.types.Structure,
    siblings: Types['siblings'],
    sibling_declarations: core.Optional_Value<target.namespaces.declarations.types.Namespaces>,
    links: Context['benchmark_links'],
    abort: Abort,
): target.namespaces.resolver.types.Resolver => {
    Dense($.namespaces, definition.namespaces, abort)
    const namespaces = p.from.dictionary($.namespaces).map(($, id) => {
        const benchmark = Entry(declarations.namespaces, id, abort)['l entry']
        return { benchmark, value: Resolver_Tree($, benchmark.value, Entry(definition.namespaces, id, abort)['l entry'],
            p.select_lookup.acyclic.from_resolved_dictionary(definition.namespaces), p.literal.set(declarations.namespaces), links, abort) }
    })
    const environment = {
        acyclic: p.select_lookup.acyclic.from_resolved_dictionary(definition.types),
        children: definition.namespaces,
        siblings,
    }
    return { namespaces, types: Resolvers($.types, definition.types, declarations.types, environment, declarations.namespaces, sibling_declarations, links, abort) }
}

export const Type_Specification = ($: source.Type_Specification, abort: Abort): target.types.Type_Specification => {
    const schema = Schema($.schema, abort)
    return { schema, directory: Directory($.directory, schema.structure.types, abort) }
}

const Directory = ($: source.Directory, types: target.namespaces.structure.types.Types, abort: Abort): target.types.Directory => {
    switch ($[0]) {
        case 'group': return ['group', { nodes: p.from.dictionary($[1].nodes).map(($) => File_Tree_Node($, types, abort)) }]
        case 'dictionary': return ['dictionary', { node: File_Tree_Node($[1].node, types, abort) }]
        default: return p.exhaustive($[0])
    }
}

const File_Tree_Node = ($: source.Node, types: target.namespaces.structure.types.Types, abort: Abort): target.types.Node => {
    switch ($[0]) {
        case 'file': {
            const entry = Entry(types, $[1].type, abort)
            return ['file', { 'file extension': $[1]['file extension'], type: {
                constraints: { public: require_public(entry['l entry'], abort) }, value: entry,
            } }]
        }
        case 'directory': return ['directory', Directory($[1], types, abort)]
        default: return p.exhaustive($[0])
    }
}

const Declarations = (
    $: source.Resolver_Signatures,
    types: target.namespaces.structure.types.Types,
    environment: Type_Environment,
    abort: Abort,
): target.namespaces.declarations.types.Declarations => {
    Dense($, types, abort)
    return p.from.dictionary($).resolve(($, id, siblings): target.namespaces.declarations.types.Declarations.D => {
        const benchmark = Entry(types, id, abort)['l entry']
        const signature: target.namespaces.declarations.types.Declaration.signature.value =
            $.signature[0] === 'same as'
                ? ['same as', Lookup(siblings, $.signature[1], abort)]
                : ['local', {
                    values: p.from.dictionary($.signature[1].values).map(($) => ({
                        value: Signature_Value_Reference($.value, environment, abort),
                        presence: $.presence,
                    })),
                    lookups: p.from.dictionary($.signature[1].lookups).map(($) => {
                        const value = Signature_Value_Reference($.referent, environment, abort)
                        const dictionary = Expect(value.subselection.tail.result, 'dictionary', abort)
                        return {
                            referent: { value, constraints: { dictionary } },
                            type: $.type,
                            presence: $.presence,
                        }
                    }),
                }]
        const result = signature[0] === 'local'
            ? signature[1]
            : signature[1]['l entry'].value.signature.result
        return {
            benchmark,
            value: { signature: { value: signature, result } },
        }
    })
}

const Dense = <T extends core.Value, B extends core.Value>(values: core.Dictionary<T>, benchmark: core.Dictionary<B>, abort: Abort): void => {
    p.from.dictionary(benchmark).map((_, id) => p.from.dictionary(values).get_entry(id, {
        no_such_entry: () => abort({ type: ['missing required entries', p.literal.dictionary({ [id]: null })] }),
    }))
}

type Benchmark_Link = {
    owner: target.namespaces.structure.types.Value
    target: target.namespaces.structure.types.Value
    next: Benchmark_Link | undefined
}

type Context = {
    types: target.namespaces.structure.types.Types
    signatures: target.namespaces.declarations.types.Declarations
    environment: Type_Environment
    children: target.namespaces.declarations.types.Namespaces
    sibling_declarations: core.Optional_Value<target.namespaces.declarations.types.Namespaces>
    signature: target.namespaces.declarations.types.Signature
    siblings: p.lookup.Acyclic<target.namespaces.structure.types.Group.D>
    parent: p.lookup.Acyclic<target.namespaces.structure.types.Group.D>
    options: target.namespaces.structure.types.Option_Constraints
    cursor: target.namespaces.structure.types.Value_Result
    benchmark: core.Optional_Value<target.namespaces.resolver.types.Benchmark>
    dictionary: core.Optional_Value<target.namespaces.structure.types.Dictionary>
    benchmark_links: {
        entries: Benchmark_Link | undefined
        checks: Benchmark_Link | undefined
        last_check: Benchmark_Link | undefined
    }
}

const Resolvers = (
    $: source.Resolver_Types,
    types: target.namespaces.structure.types.Types,
    signatures: target.namespaces.declarations.types.Declarations,
    environment: Type_Environment,
    children: target.namespaces.declarations.types.Namespaces,
    sibling_declarations: Context['sibling_declarations'],
    benchmark_links: Context['benchmark_links'], abort: Abort): target.namespaces.resolver.types.Types => {
    Dense($, signatures, abort)
    const resolvers = p.from.dictionary($).map(($, id) => {
        const benchmark = Entry(signatures, id, abort)['l entry']
        const signature = benchmark.value.signature.result
        return { benchmark, value: { 'root value resolver': Resolver($['root value resolver'], benchmark.benchmark['root value'], {
            types, signatures, signature, benchmark_links, environment, children, sibling_declarations,
            siblings: p.select_lookup.acyclic.not_set(),
            parent: p.select_lookup.acyclic.not_set(),
            options: p.literal.not_set(),
            cursor: p.literal.not_set(),
            benchmark: p.literal.not_set(),
            dictionary: p.literal.not_set(),
        }, abort) } }
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
                ? owner[1].type.value[0] === 'child namespace' || owner[1].type.value[0] === 'sibling namespace'
                    ? owner[1].type.value[1].type.value['l id'] : owner[1].type.value[1]['l id']
                : owner[0]
            return abort({ type: ['constraint', ['state', { expected: 'benchmarked dictionary entry', found: name }]] })
        }
        check = check.next
    }
}

const Type_Node = ($: source.Type_Reference, context: Context, abort: Abort) =>
    Type_Reference($, context.environment, abort)

const Relative = ($: source.Resolver_Relative_Value_Selection, root: target.namespaces.structure.types.Value, context: Context, abort: Abort): target.namespaces.resolver.types.Relative_Value_Selection => {
    let current = root
    const path = p.from.list($.path).map((step): target.namespaces.resolver.types.Relative_Value_Selection.path.value.L => {
        let item: target.namespaces.resolver.types.Relative_Value_Selection.path.value.L.value.value
        const definition = current
        switch (step[0]) {
            case 'component':
                current = Component_Type(Expect(current, 'component', abort))['root value']
                item = ['component', { constraints: { definition: Expect(definition, 'component', abort) }, value: null }]
                break
            case 'group': {
                const entry = Entry(Expect(current, 'group', abort), step[1], abort)
                current = entry['l entry'].value
                item = ['group', { constraints: { definition: Expect(definition, 'group', abort) }, value: entry }]
                break
            }
            case 'reference': {
                const definition = Expect(current, 'reference', abort)
                current = definition.referent.constraints.dictionary.value
                item = ['reference', { constraints: { definition }, value: {} }]
                break
            }
            case 'optional':
                current = Expect(current, 'optional', abort).value
                item = ['optional', { constraints: { definition: Expect(definition, 'optional', abort) }, value: null }]
                break
            case 'state result': {
                const type = Required(Expect(current, 'state', abort).result, abort)
                current = type.path.tail.result
                item = ['state result', { constraints: { definition: Expect(definition, 'state', abort) }, value: null }]
                break
            }
            case 'list result': {
                const value = Required(Expect(current, 'list', abort).result, abort)
                current = value.path.tail.result
                item = ['list result', { constraints: { definition: Expect(definition, 'list', abort) }, value: null }]
                break
            }
            case 'benchmark link': {
                const reference = Value_Reference(step[1], context.environment, abort)
                const check: Benchmark_Link = { owner: current, target: reference.path.tail.result, next: undefined }
                if (context.benchmark_links.last_check === undefined) context.benchmark_links.checks = check
                else context.benchmark_links.last_check.next = check
                context.benchmark_links.last_check = check
                current = reference.path.tail.result
                item = ['benchmark link', reference]
                break
            }
            case 'component constraint': {
                const component = Expect(current, 'component', abort)
                const declaration = Entry(Required(component.constraints, abort), step[1].name, abort)['l entry']
                const reference = Value_Reference(step[1].target, context.environment, abort)
                if (reference.path.tail.result !== declaration.path.tail.result) return abort({
                    type: ['constraint', ['same node', 'component constraint target']],
                })
                current = reference.path.tail.result
                item = ['component constraint', {
                    constraints: { definition: Expect(definition, 'component', abort) },
                    value: { name: step[1].name, target: reference },
                }]
                break
            }
            case 'option constraint': {
                const option = Entry(Expect(current, 'state', abort).options, step[1].option, abort)
                const declarations = Required(option['l entry'].constraints, abort)
                const constraint = Entry(declarations, step[1].constraint, abort)
                current = constraint['l entry'].path.tail.result
                item = ['option constraint', { constraints: { definition: Expect(definition, 'state', abort) },
                    value: { option, constraint } }]
                break
            }
            case 'optional value constraint': {
                const source = Expect(current, 'optional', abort).constraints
                const declarations = Required(source, abort)
                const constraint = Entry(declarations, step[1], abort)
                current = constraint['l entry'].path.tail.result
                item = ['optional value constraint', {
                    constraints: { definition: Expect(definition, 'optional', abort) }, value: constraint,
                }]
                break
            }
            case 'reference constraint': {
                const source = Expect(current, 'reference', abort).type.constraints
                const declarations = Required(source, abort)
                const constraint = Entry(declarations, step[1], abort)
                current = constraint['l entry'].path.tail.result
                item = ['reference constraint', {
                    constraints: { definition: Expect(definition, 'reference', abort) }, value: constraint,
                }]
                break
            }
            default: return p.exhaustive(step[0])
        }
        return { value: { value: item, result: current }, result: current }
    })
    return { path: { value: path, result: current } }
}

const Possible_Node = ($: target.namespaces.resolver.types.Possible_Value_Selection): target.namespaces.structure.types.Value => $.result

const Option_Node = ($: target.namespaces.resolver.types.Option_Constraints.O.value.D): target.namespaces.structure.types.Value => $.value.result

const Constraint_Node = ($: target.namespaces.resolver.types.Value_Constraint): target.namespaces.structure.types.Value =>
    $.constraint.type.result

const Check_Constraints = <T extends core.Value>(
    declarations: target.namespaces.structure.types.Option_Constraints, implementations: core.Optional_Value<core.Dictionary<T>>,
    node: (value: T) => target.namespaces.structure.types.Value, abort: Abort,
): void => {
    p.from.optional(declarations).decide((declarations) => {
        const values = Required(implementations, abort)
        Dense(values, declarations, abort)
        Dense(declarations, values, abort)
        p.from.dictionary(values).map((value, id) => {
            if (node(value) !== Entry(declarations, id, abort)['l entry'].path.tail.result) return abort({
                type: ['constraint', ['same node', `constraint ${id}`]],
            })
            return null
        })
        return null
    }, () => p.from.optional(implementations).decide(
        () => abort({ type: ['constraint', ['state', { expected: 'no constraint implementation', found: 'undeclared constraint implementation' }]] }),
        () => null,
    ))
}

const Guaranteed = ($: source.Resolver_Guaranteed_Value_Selection, context: Context, abort: Abort): target.namespaces.resolver.types.Guaranteed_Value_Selection => {
    let node: target.namespaces.structure.types.Value
    let start: target.namespaces.resolver.types.Guaranteed_Value_Selection.start.value
    switch ($.start[0]) {
        case 'optional fallback': {
            const selection = Possible($.start[1].selection, context, abort)
            const fallback = Guaranteed($.start[1].fallback, context, abort)
            node = fallback.tail.path.result
            if (selection.result !== node) return abort({ type: ['constraint', ['same node', 'optional fallback target type']] })
            start = ['optional fallback', { selection, fallback }]
            break
        }
        case 'sibling':
        case 'parent sibling': {
            const entry = Lookup($.start[0] === 'sibling' ? context.siblings : context.parent, $.start[1], abort)
            start = $.start[0] === 'sibling' ? ['sibling', entry] : ['parent sibling', entry]
            node = entry['l entry'].value
            break
        }
        case 'parameter': {
            const entry = Entry(context.signature.values, $.start[1], abort)
            start = ['parameter', entry]
            node = entry['l entry'].value.subselection.tail.result
            break
        }
        case 'option constraint': {
            const entry = Entry(Required(context.options, abort), $.start[1], abort)
            start = ['option constraint', { constraints: { oc: context.options }, value: entry }]
            node = entry['l entry'].path.tail.result
            break
        }
        case 'list cursor':
            node = Required(context.cursor, abort).path.tail.result
            start = ['list cursor', { constraints: { result: Required(context.cursor, abort) }, value: null }]
            break
        case 'linked entry':
            node = Required(context.benchmark, abort).selection.constraints.dictionary.value
            start = ['linked entry', { constraints: { entry: node }, value: null }]
            break
        case 'constraint': {
            const selection = $.start[1]
            const value = Lookup(context.siblings, selection[1].property, abort)
            const resolver = value['l entry'].value
            if (selection[0] === 'component') {
                if (resolver[0] !== 'component') return abort({ type: ['constraint', ['state', { expected: 'component', found: resolver[0] }]] })
                const component = resolver[1]
                const constraints = Required(component.constraints, abort)
                const constraint = Entry(constraints, selection[1].constraint, abort)
                node = constraint['l entry'].path.tail.result
                start = ['constraint', { value: ['component', {
                    property: { value, constraints: { component } },
                    constraint,
                }], result: node }]
            } else {
                if (resolver[0] !== 'reference') return abort({ type: ['constraint', ['state', { expected: 'reference', found: resolver[0] }]] })
                const reference = resolver[1]
                const selected = reference.type
                const constraints = Required(selected.constraints, abort)
                const constraint = Entry(constraints, selection[1].constraint, abort)
                node = constraint['l entry'].path.tail.result
                start = ['constraint', { value: ['reference', {
                    property: { value, constraints: { reference } },
                    constraint,
                }], result: node }]
            }
            break
        }
        case 'result': {
            const result = $.start[1]
            if (result[0] !== 'list') {
                const possible = Possible(['result', result], context, abort)
                if (possible.value[0] !== 'result') return abort({ type: ['constraint', ['optional value is not set', null]] })
                start = ['result', possible.value[1]]
                node = Possible_Node(possible)
                break
            }
            const value = Lookup(context.siblings, result[1].property, abort)
            const resolver = value['l entry'].value
            if (resolver[0] !== 'list') return abort({ type: ['constraint', ['state', { expected: 'list', found: resolver[0] }]] })
            const list = resolver[1]
            const selection = Required(list.result, abort)
            node = selection.path.tail.result
            start = ['result', { value: ['list', {
                property: { value, constraints: { list, result: selection } },
            }], result: node }]
            break
        }
        default: return p.exhaustive($.start[0])
    }
    const tail = Relative($.tail, node, context, abort)
    return { start: { value: start, result: node }, tail }
}

const Possible = ($: source.Resolver_Possible_Value_Selection, context: Context, abort: Abort): target.namespaces.resolver.types.Possible_Value_Selection => {
    switch ($[0]) {
        case 'parameter': {
            const entry = Entry(context.signature.values, $[1], abort)
            return { value: ['parameter', entry], result: entry['l entry'].value.subselection.tail.result }
        }
        case 'optional value': {
            const value = Guaranteed($[1].selection, context, abort)
            const optional = Expect(value.tail.path.result, 'optional', abort)
            const tail = Relative($[1].tail, optional.value, context, abort)
            return { value: ['optional value', { selection: { constraints: { optional }, value }, tail }], result: tail.path.result }
        }
        case 'result': {
            const selection = $[1]
            const value = Lookup(context.siblings, selection[1].property, abort)
            const resolver = value['l entry'].value
            switch (selection[0]) {
                case 'state': {
                    if (resolver[0] !== 'state') return abort({ type: ['constraint', ['state', { expected: 'state', found: resolver[0] }]] })
                    const state = resolver[1]
                    const result = Required(state.result, abort)
                    const node = result.path.tail.result
                    return { value: ['result', { value: ['state', { property: { value,
                        constraints: { state, result } } }], result: node }], result: node }
                }
                case 'optional value': {
                    if (resolver[0] !== 'optional') return abort({ type: ['constraint', ['state', { expected: 'optional', found: resolver[0] }]] })
                    const optional = resolver[1]
                    const result = Required(optional.result, abort)
                    const node = result.path.tail.result
                    return { value: ['result', { value: ['optional value', { property: { value,
                        constraints: { optional, result } } }], result: node }], result: node }
                }
                default: return p.exhaustive(selection[0])
            }
        }
        default: return p.exhaustive($[0])
    }
}

const Constraint_Declarations = <T extends core.Value>(
    implementations: core.Dictionary<T>, declarations: target.namespaces.structure.types.Reference_Constraints, abort: Abort,
): target.namespaces.structure.types.Reference_Constraints.O =>
    p.from.optional(declarations).decide(($) => {
        Dense(implementations, $, abort)
        Dense($, implementations, abort)
        return $
    }, () => abort({ type: ['constraint', ['state', {
        expected: 'no constraint implementation', found: 'undeclared constraint implementation',
    }]] }))

const Option_Constraints = ($: source.Resolver_Option_Constraints, declarations: target.namespaces.structure.types.Option_Constraints, context: Context, abort: Abort): target.namespaces.resolver.types.Option_Constraints.O => {
    const benchmark = Constraint_Declarations($, declarations, abort)
    const value = p.from.dictionary($).map(($, id): target.namespaces.resolver.types.Option_Constraints.O.value.D => {
        const declaration = Entry(benchmark, id, abort)['l entry']
        switch ($[0]) {
            case 'state': {
                const value = Guaranteed($[1].selection, context, abort)
                const state = Expect(value.tail.path.result, 'state', abort)
                const option = Entry(state.options, $[1].option, abort)
                return { benchmark: declaration, value: { value: ['state', {
                    selection: { value, constraints: { state } }, option,
                }], result: option['l entry'].value } }
            }
            case 'assert is set': {
                const value = Possible($[1], context, abort)
                return { benchmark: declaration, value: { value: ['assert is set', value], result: value.result } }
            }
            default: return p.exhaustive($[0])
        }
    })
    Check_Constraints(declarations, p.literal.set(value), Option_Node, abort)
    return { constraints: { declarations: benchmark }, value }
}

const Value_Constraints = ($: source.Resolver_Value_Constraints, declarations: target.namespaces.structure.types.Reference_Constraints, node: target.namespaces.structure.types.Value, context: Context, abort: Abort): target.namespaces.resolver.types.Reference_Constraints.O => {
    const benchmark = Constraint_Declarations($, declarations, abort)
    const value = p.from.dictionary($).map(($, id): target.namespaces.resolver.types.Value_Constraints.D => {
        const start: target.namespaces.resolver.types.Value_Constraint.start.value = $.start[0] === 'value'
            ? ['value', null] : ['sibling', Entry(benchmark, $.start[1], abort)]
        const initial = start[0] === 'value' ? node : start[1]['l entry'].path.tail.result
        const selection = Relative($.constraint.selection, initial, context, abort)
        let type: target.namespaces.resolver.types.Constraint.type_.value
        let result: target.namespaces.structure.types.Value
        switch ($.constraint.type[0]) {
            case 'state': {
                const state = Expect(selection.path.result, 'state', abort)
                const option = Entry(state.options, $.constraint.type[1].option, abort)
                type = ['state', { constraints: { state }, value: { option } }]
                result = option['l entry'].value
                break
            }
            case 'optional value': {
                const optional = Expect(selection.path.result, 'optional', abort)
                type = ['optional value', { constraints: { optional }, value: {} }]
                result = optional.value
                break
            }
            default: return p.exhaustive($.constraint.type[0])
        }
        return { benchmark: Entry(benchmark, id, abort)['l entry'],
            value: { start: { value: start, result: initial }, constraint: { selection, type: { value: type, result } } } }
    })
    Check_Constraints(declarations, p.literal.set(value), ($) => Constraint_Node($.value), abort)
    return { constraints: { declarations: benchmark }, value }
}

const Result = ($: source.Resolver_Result_Selection, node: target.namespaces.structure.types.Value, context: Context, expected: target.namespaces.structure.types.Value, abort: Abort): target.namespaces.resolver.types.Result_Selection => {
    const selection: target.namespaces.resolver.types.Result_Selection = $[0] === 'value'
        ? ['value', Relative($[1], node, context, abort)]
        : ['context', Guaranteed($[1], context, abort)]
    const result = selection[0] === 'value' ? selection[1].path.result : selection[1].tail.path.result
    if (result !== expected) return abort({ type: ['constraint', ['same node', 'result type']] })
    return selection
}

const Benchmark = ($: source.Resolver_Benchmark, context: Context, abort: Abort): target.namespaces.resolver.types.Benchmark => {
    const value = Guaranteed($.selection, context, abort)
    const dictionary = Expect(value.tail.path.result, 'dictionary', abort)
    return {
        selection: { value, constraints: { dictionary } },
        coverage: $.coverage,
    }
}

const Lookup_Selection = ($: source.Resolver_Lookup_Selection, context: Context, abort: Abort): target.namespaces.resolver.types.Lookup_Selection => {
    let type: target.namespaces.resolver.types.Lookup_Selection.type_.value
    let dictionary: target.namespaces.structure.types.Dictionary
    switch ($.type[0]) {
        case 'parameter': {
            const entry = Entry(context.signature.lookups, $.type[1], abort)
            dictionary = entry['l entry'].referent.constraints.dictionary
            type = ['parameter', entry]
            break
        }
        case 'cyclic':
            dictionary = Required(context.dictionary, abort)
            type = ['cyclic', { value: ['siblings', { constraints: { cd: dictionary }, value: null }], result: dictionary }]
            break
        case 'acyclic':
            if ($.type[1][0] === 'siblings') {
                dictionary = Required(context.dictionary, abort)
                type = ['acyclic', { value: ['siblings', { constraints: { cd: dictionary }, value: null }], result: dictionary }]
            } else {
                const value = Guaranteed($.type[1][1].selection, context, abort)
                dictionary = Expect(value.tail.path.result, 'dictionary', abort)
                type = ['acyclic', { value: ['resolved dictionary', {
                    selection: { value, constraints: { dictionary } },
                }], result: dictionary }]
            }
            break
        default: return p.exhaustive($.type[0])
    }
    return { type: { value: type, result: dictionary } }
}

const Optional_Initialization = ($: source.Resolver_Optional_Value_Initialization, context: Context, abort: Abort): target.namespaces.resolver.types.Optional_Value_Initialization => {
    switch ($[0]) {
        case 'not set': return ['not set', null]
        case 'set': return ['set', Guaranteed($[1], context, abort)]
        case 'selection': return ['selection', Possible($[1], context, abort)]
        default: return p.exhaustive($[0])
    }
}

const Resolver = ($: source.Resolver_Value, definition: target.namespaces.structure.types.Value, context: Context, abort: Abort): target.namespaces.resolver.types.Value => {
    switch ($[0]) {
        case 'component': {
            const component = Expect(definition, 'component', abort)
            const selected = $[1].location
            let location: target.namespaces.resolver.types.Value.component.value.location.value
            let declaration: target.namespaces.declarations.types.Declaration
            let signature: target.namespaces.declarations.types.Signature
            let selected_type: target.namespaces.structure.types.Type
            if (selected[0] === 'local') {
                const entry = Entry(context.signatures, selected[1], abort)
                location = ['local', entry]
                declaration = entry['l entry'].value
                signature = declaration.signature.result
                selected_type = entry['l entry'].benchmark
            } else {
                const namespaces = selected[0] === 'sibling namespace'
                    ? Required(context.sibling_declarations, abort) : context.children
                const namespace = Entry(namespaces, selected[1].namespace, abort)
                const resolver = Entry(namespace['l entry'].value.types, selected[1].resolver, abort)
                const public_resolver = { constraints: {
                    public: require_public(resolver['l entry'].benchmark, abort),
                }, value: resolver }
                location = selected[0] === 'child namespace'
                    ? ['child namespace', { namespace, resolver: public_resolver }]
                    : ['sibling namespace', { constraints: { declarations: namespaces }, value: { namespace, resolver: public_resolver } }]
                declaration = resolver['l entry'].value
                signature = declaration.signature.result
                selected_type = resolver['l entry'].benchmark
            }
            if (selected_type !== Component_Type(component)) return abort({ type: ['constraint', ['same node', 'component type']] })
            const constraints = p.from.optional($[1].constraints).map(($) =>
                Value_Constraints($, component.constraints, selected_type['root value'], context, abort))
            Check_Constraints(component.constraints, p.from.optional(constraints).map(($) => $.value), ($) => Constraint_Node($.value), abort)
            return ['component', {
                constraints: { definition: component }, value: {
                    location: { value: location, result: declaration },
                    arguments: p.from.optional($[1].arguments).map(($) => ({
                        types: p.from.optional($.types).map(($) => {
                            Dense($, signature.values, abort)
                            Dense(signature.values, $, abort)
                            return p.from.dictionary($).map(($, id) => {
                                const benchmark = Entry(signature.values, id, abort)['l entry']
                                let value: target.namespaces.resolver.types.Value.component.value.arguments_.O.types.O.D.value
                                switch ($[0]) {
                                    case 'optional': value = ['optional', Optional_Initialization($[1], context, abort)]; break
                                    case 'required': value = ['required', Guaranteed($[1], context, abort)]; break
                                    case 'parameter': value = ['parameter', Entry(context.signature.values, $[1], abort)]; break
                                    default: return p.exhaustive($[0])
                                }
                                return { benchmark, value }
                            })
                        }),
                        lookups: p.from.optional($.lookups).map(($) => {
                            Dense($, signature.lookups, abort)
                            Dense(signature.lookups, $, abort)
                            return p.from.dictionary($).map(($, id): target.namespaces.resolver.types.Value.component.value.arguments_.O.lookups.O.D => {
                                const benchmark = Entry(signature.lookups, id, abort)['l entry']
                                return { benchmark, value: $[0] === 'selection' ? ['selection', Lookup_Selection($[1], context, abort)] : $ }
                            })
                        }),
                    })),
                    constraints,
            } }]
        }
        case 'dictionary': {
            const dictionary = Expect(definition, 'dictionary', abort)
            const benchmark = p.from.optional($[1].benchmark).map(($) => Benchmark($, context, abort))
            p.from.optional(benchmark).map(($) => {
                context.benchmark_links.entries = {
                    owner: dictionary.value, target: $.selection.constraints.dictionary.value, next: context.benchmark_links.entries,
                }
                return null
            })
            return ['dictionary', {
                constraints: { definition: dictionary }, value: {
                    benchmark,
                    resolver: Resolver($[1].resolver, dictionary.value, {
                        ...context, dictionary: p.literal.set(dictionary), benchmark,
                    }, abort),
            } }]
        }
        case 'group': {
            const group = Expect(definition, 'group', abort)
            Dense($[1], group, abort)
            return ['group', { constraints: { definition: group }, value: p.from.dictionary($[1]).resolve(
                ($, id, siblings): target.namespaces.resolver.types.Value_Group.D => {
                    const benchmark = Entry(group, id, abort)['l entry']
                    return {
                        benchmark,
                        value: { resolver: Resolver($.resolver, benchmark.value, {
                            ...context, siblings: p.select_lookup.acyclic.from_resolved_dictionary(group), parent: context.siblings,
                        }, abort) },
                    }
                },
            ) }]
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
            const result = p.from.optional($[1].result).map(($): target.namespaces.resolver.types.Value.list.value.result.O => {
                const declaration = Required(list.result, abort)
                const expected = declaration.path.tail.result
                const initial = Guaranteed($.initial, context, abort)
                if (initial.tail.path.result !== expected) return abort({
                    type: ['constraint', ['same node', 'list initial result type']],
                })
                const next = Result($.next, list.value, { ...context, cursor: list.result }, expected, abort)
                return { constraints: { definition: list, result: declaration }, value: { initial, next } }
            })
            return ['list', {
                constraints: { definition: list }, value: { result,
                    resolver: Resolver($[1].resolver, list.value, {
                        ...context, cursor: list.result,
                    }, abort),
            } }]
        }
        case 'nothing': return ['nothing', { constraints: { definition: Expect(definition, 'nothing', abort) }, value: null }]
        case 'simple': return ['simple', { constraints: { definition: Expect(definition, 'simple', abort).value }, value: null }]
        case 'optional': {
            const optional = Expect(definition, 'optional', abort)
            const constraints = p.from.optional($[1].constraints).map(($) => Option_Constraints($, optional.constraints, context, abort))
            Check_Constraints(optional.constraints, p.from.optional(constraints).map(($) => $.value), Option_Node, abort)
            p.from.optional(optional.result).decide(
                () => Required($[1].result, abort),
                () => p.from.optional($[1].result).decide(
                    () => abort({ type: ['constraint', ['state', { expected: 'no optional result', found: 'optional result' }]] }),
                    () => null,
                ),
            )
            const next = { ...context, options: optional.constraints }
            return ['optional', {
                constraints: { definition: optional }, value: {
                    presence: p.from.optional($[1].presence).map(($) => Possible($, context, abort)),
                    constraints,
                    resolver: Resolver($[1].resolver, optional.value, next, abort),
                    result: p.from.optional($[1].result).map(($) => {
                        const result = Required(optional.result, abort)
                        return { constraints: { definition: optional, result },
                            value: Result($, optional.value, next, result.path.tail.result, abort) }
                    }),
                    'not set constraints': p.from.optional($[1]['not set constraints']).map(($) =>
                        p.from.dictionary($).map(($) => Possible($, context, abort))),
            } }]
        }
        case 'reference': {
            const reference = Expect(definition, 'reference', abort)
            const selected = $[1].type
            const lookup = Lookup_Selection(selected.lookup, context, abort)
            if (lookup.type.result !== reference.referent.constraints.dictionary) return abort({
                type: ['constraint', ['same node', 'reference lookup dictionary']],
            })
            const constraints = p.from.optional(selected.constraints).map(($) =>
                Value_Constraints($, reference.type.constraints, lookup.type.result.value, context, abort))
            Check_Constraints(reference.type.constraints, p.from.optional(constraints).map(($) => $.value), ($) => Constraint_Node($.value), abort)
            return ['reference', {
                constraints: { definition: reference }, value: { type: { lookup,
                    constraints,
                } },
            }]
        }
        case 'state': {
            const state = Expect(definition, 'state', abort)
            Dense($[1].options, state.options, abort)
            const result = state.result
            return ['state', {
                constraints: { definition: state }, value: {
                    options: p.from.dictionary($[1].options).map(($, id) => {
                        const benchmark = Entry(state.options, id, abort)['l entry']
                        const constraints = p.from.optional($.constraints).map(($) => Option_Constraints($, benchmark.constraints, context, abort))
                        Check_Constraints(benchmark.constraints, p.from.optional(constraints).map(($) => $.value), Option_Node, abort)
                        const next = { ...context, options: benchmark.constraints }
                        const resolver = Resolver($.resolver, benchmark.value, next, abort)
                        const result_context = resolver[0] === 'group'
                            ? { ...next, siblings: p.select_lookup.acyclic.from_resolved_dictionary(Expect(benchmark.value, 'group', abort)), parent: context.siblings }
                            : next
                        p.from.optional(result).decide(
                            () => Required($.result, abort),
                            () => p.from.optional($.result).decide(
                                () => abort({ type: ['constraint', ['state', { expected: 'no option result', found: 'option result' }]] }),
                                () => null,
                            ),
                        )
                        return {
                            benchmark, value: { constraints,
                            resolver,
                            result: p.from.optional($.result).map(($) => Result($, benchmark.value, result_context, Required(result, abort).path.tail.result, abort)) },
                        }
                    }),
            } }]
        }
        default: return p.exhaustive($[0])
    }
}
