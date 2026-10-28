import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import test from 'node:test'

const require = createRequire(import.meta.url)
const p = require('pareto-core/transformer')
const { Type_Specification: resolve } = require('pareto-liana/schemas/liana_next_schema/resolve')
const dictionary = p.literal.dictionary
const none = p.literal.not_set
const entry = (values, name) => {
    const found = values.__get_raw().find(([id]) => id === name)
    assert.ok(found, name)
    return found[1]
}
const fail = error => { throw new Error(JSON.stringify(error)) }
const signature = () => ({ signature: ['local', { values: dictionary({}), lookups: dictionary({}) }] })
const component = (location, namespace, kind = 'simple') => ['component', {
    type: [kind, kind === 'cyclic' ? 'Hidden' : [location, namespace === undefined ? 'Hidden' : { namespace, type: 'Item' }]], constraints: none(),
}]
const call = (location, namespace) => ['component', {
    location: [location, namespace === undefined ? 'Hidden' : { namespace, resolver: 'Item' }],
    arguments: none(), constraints: none(),
}]
const structure = value => ({
    namespaces: dictionary({}), 'basic types': dictionary({}),
    types: dictionary({ Item: { visibility: ['public', null], 'root value': value } }),
})
const declarations = () => ({ namespaces: dictionary({}), types: dictionary({ Item: signature() }) })
const implementations = resolver => ({
    namespaces: dictionary({}), types: dictionary({ Item: { 'root value resolver': resolver } }),
})
const fixture = () => ({
    directory: ['dictionary', { node: ['file', { 'file extension': 'test', type: 'Root' }] }],
    schema: {
        structure: {
            namespaces: dictionary({
                A: structure(['nothing', null]), B: structure(component('sibling namespace', 'A')),
            }),
            'basic types': dictionary({}),
            types: dictionary({ Root: { visibility: ['public', null], 'root value': component('child namespace', 'B') } }),
        },
        resolver: {
            declarations: {
                namespaces: dictionary({ A: declarations(), B: declarations() }),
                types: dictionary({ Root: signature() }),
            },
            implementations: {
                namespaces: dictionary({
                    A: implementations(['nothing', null]), B: implementations(call('sibling namespace', 'A')),
                }),
                types: dictionary({ Root: { 'root value resolver': call('child namespace', 'B') } }),
            },
        },
    },
})

for (const visibility of ['private', 'private single use']) {
    for (const kind of ['simple', 'cyclic']) {
        test(`${visibility} types allow local ${kind} components and preserve visibility`, () => {
            const input = fixture()
            const namespace = entry(input.schema.structure.namespaces, 'A')
            entry(namespace.types, 'Item')['root value'] = component('local', undefined, kind)
            namespace.types.__get_raw().push(['Hidden', { visibility: [visibility, null], 'root value': ['nothing', null] }])
            entry(input.schema.resolver.declarations.namespaces, 'A').types.__get_raw().push(['Hidden', signature()])
            const types = entry(input.schema.resolver.implementations.namespaces, 'A').types
            entry(types, 'Item')['root value resolver'] = call('local')
            types.__get_raw().push(['Hidden', { 'root value resolver': ['nothing', null] }])
            const resolved = resolve(input, fail)
            assert.deepEqual(entry(entry(resolved.schema.structure.namespaces, 'A').types, 'Hidden').visibility, [visibility, null])
        })
    }

    for (const location of ['child namespace', 'sibling namespace']) {
        test(`${visibility} types allow ${location} result and signature references`, () => {
            const input = fixture()
            const structure = input.schema.structure
            const declarations = input.schema.resolver.declarations
            const implementations = input.schema.resolver.implementations
            entry(entry(structure.namespaces, 'A').types, 'Item').visibility = [visibility, null]
            entry(entry(structure.namespaces, 'B').types, 'Item')['root value'] = ['nothing', null]
            entry(entry(implementations.namespaces, 'B').types, 'Item')['root value resolver'] = ['nothing', null]
            entry(structure.types, 'Root')['root value'] = ['nothing', null]
            entry(implementations.types, 'Root')['root value resolver'] = ['nothing', null]
            const type = { location: [location, { namespace: 'A', type: 'Item' }] }
            const owner = location === 'child namespace' ? entry(structure.types, 'Root')
                : entry(entry(structure.namespaces, 'B').types, 'Item')
            const declaration = location === 'child namespace' ? entry(declarations.types, 'Root')
                : entry(entry(declarations.namespaces, 'B').types, 'Item')
            const implementation = location === 'child namespace' ? entry(implementations.types, 'Root')
                : entry(entry(implementations.namespaces, 'B').types, 'Item')
            owner['root value'] = ['optional', {
                constraints: none(), value: ['nothing', null],
                result: p.literal.set({ type, path: { tail: p.literal.list([]) } }),
            }]
            declaration.signature[1].values = dictionary({
                input: { value: { type, subselection: { tail: p.literal.list([]) } }, presence: ['required', null] },
            })
            implementation['root value resolver'] = ['optional', {
                presence: none(), constraints: none(), checks: none(), 'not set constraints': none(), resolver: ['nothing', null],
                result: p.literal.set(['context', { start: ['parameter', 'input'], tail: { path: p.literal.list([]) } }]),
            }]
            assert.ok(resolve(input, fail))
        })

        test(`${visibility} ${location} resolver targets require public benchmarks`, () => {
            const input = fixture()
            const name = location === 'child namespace' ? 'B' : 'A'
            entry(input.schema.structure.namespaces, name).types.__get_raw().push([
                'Hidden', { visibility: [visibility, null], 'root value': ['nothing', null] },
            ])
            entry(input.schema.resolver.declarations.namespaces, name).types.__get_raw().push(['Hidden', signature()])
            entry(input.schema.resolver.implementations.namespaces, name).types.__get_raw().push([
                'Hidden', { 'root value resolver': ['nothing', null] },
            ])
            const resolver = location === 'child namespace' ? entry(input.schema.resolver.implementations.types, 'Root')
                : entry(entry(input.schema.resolver.implementations.namespaces, 'B').types, 'Item')
            resolver['root value resolver'][1].location[1].resolver = 'Hidden'
            assert.throws(() => resolve(input, fail), /"constraint":"public"/)
        })
    }
}
