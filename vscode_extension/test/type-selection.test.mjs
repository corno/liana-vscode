import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { createRequire } from 'node:module'
import test from 'node:test'

const require = createRequire(import.meta.url)
const serverRequire = createRequire(new URL('../server/package.json', import.meta.url))
const { TextDocument } = serverRequire('vscode-languageserver-textdocument')
const { load_document } = require('../server/out/to_be_backend/load_document.js')
const { Type_Specifier } = require('pareto-liana/schemas/temp_type_specifier/refiners/list_of_characters')
const { Type_Specification } = require('pareto-liana/modules/schema.generated/schemas/resolved/refiners/list_of_characters')
const serialize_schema = require('pareto-liana/modules/schema.generated/schemas/resolved/transformers/paragraph')
const sealed_target = require('pareto-liana/modules/schema.generated/schemas/resolved/transformers/astn_sealed_target')
const serialize_paragraph = require('pareto-fountain-pen/modules/paragraph/schemas/paragraph/serializers')
const unmarshall = require('liana-authoring/schemas/unmarshall_result/refiners/list_of_characters')
const skeleton = require('liana-authoring/schemas/liana_schema/transformers/authoring_target')
const links = require('liana-authoring/schemas/unmarshall_result/transformers/document_links')
const resolveDiagnostics = require('liana-authoring/schemas/resolve_result/transformers/diagnostics')
const resolveErrors = require('liana-authoring/schemas/resolve_result/transformers/resolve_errors')
const resolver = require('liana-authoring/schemas/unmarshall_result/transformers/resolve_result')
const { $$: seal } = require('../client/out/helpers/seal.js')
const { create_cache } = require('../server/out/core/cache.js')
const p = require('pareto-core/transformer')

const chars = source => p.literal.list(Array.from(source, c => c.codePointAt(0)))
const fail = error => { throw error }
const parse = source => Type_Specifier(chars(source), fail, { 'tab size': 4 })
const basic = (type, resolver = '| `simple` ~') => specification(`| \`simple\` 'Basic'`, resolver, `{ 'Basic': (\`type\`: ${type}) }`)
const specification = (value = '| `nothing` ~', resolver = '| `nothing` ~', basicTypes = '{}', root = 'Root') =>
    `(\`schema\`: (
        \`basic types\`: ${basicTypes}
        \`types\`: { 'Root': (\`root value\`: ${value}) }
        \`signatures\`: { 'Root': (\`type\`: ~ \`parameters\`: | \`local\` (\`types\`: {} \`lookups\`: {}) \`resolved parameters\`: ~) }
        \`resolvers\`: { 'Root': (\`signature\`: ~ \`root value resolver\`: ${resolver}) }
    ) \`root type\`: '${root}')`
const rootType = source => parse(source)[1]['root type'].entry.signature.type
const document = (source, schema) => unmarshall.Document(chars(source), fail, {
    type: rootType(schema), 'tab size': 4,
})
const sealed = (source, schema) => seal(source, fail, {
    unmarshall: { type: rootType(schema), 'tab size': 4 },
    target: { indentation: '', newline: '' },
}).__get_raw().join('')
const entry = (dictionary, name) => p.from.dictionary(dictionary).get_possible_entry(name, value => value, () => assert.fail(name))

const loadWithSchema = async (source, schema) => {
    const dir = mkdtempSync(join(tmpdir(), 'liana-server-references-'))
    try {
        mkdirSync(join(dir, '.liana'))
        writeFileSync(join(dir, '.liana', 'schema.slna'), schema)
        const result = await new Promise(resolve => load_document(
            TextDocument.create(pathToFileURL(join(dir, 'document.lna')).href, 'liana', 1, source),
            { schemas: create_cache(), documents: create_cache() },
            error => ['error', error], value => ['success', value], resolve,
        ))
        if (result[0] === 'error') assert.fail(JSON.stringify(result[1]))
        assert.equal(result[1][0], 'constrained')
        return result[1][1]
    } finally {
        rmSync(dir, { recursive: true, force: true })
    }
}

test('the shared loader selects root type directly from the flat schema resolvers', () => {
    const loaded = parse(specification())
    assert.equal(loaded[0], 'constrained')
    assert.equal(loaded[1]['root type'].id, 'Root')
    assert.equal(loaded[1]['root type'].entry.signature.type['root value'][0], 'nothing')
    assert.equal(entry(loaded[1].resolver.resolvers, 'Root'), loaded[1]['root type'].entry)
})

test('missing root type returns a structured diagnostic at its identifier', () => {
    const source = specification(undefined, undefined, undefined, 'missing')
    assert.throws(() => parse(source), error => {
        assert.equal(error[0], 'resolving')
        assert.deepEqual(error[1].type, ['lookup', ['no such entry', 'missing']])
        assert.equal(error[1].location.start.absolute, source.indexOf("'missing'"))
        return true
    })
})

test('old type resolver, schema path, globals and text-value schemas are rejected', () => {
    for (const source of [
        specification().replace('`root type`', '`type resolver`'),
        specification().replace('`root type`:', '`schema path`: [] `root type`:'),
        specification().replace('`basic types`: {}', '`globals`: ()'),
        specification('| `text` | `global` \'Basic\''),
    ]) assert.throws(() => parse(source))
})

test('basic type lookup failures are reported instead of defaulting', () => {
    assert.throws(() => parse(specification('| `simple` \'missing\'')), error => {
        assert.equal(error[0], 'resolving')
        assert.deepEqual(error[1].type, ['lookup', ['no such entry', 'missing']])
        return true
    })
})

test('the bundled template exposes the flat Next schema and root type', () => {
    const loaded = parse(readFileSync(new URL('../liana_authoring_environment_template/.liana/schema.slna', import.meta.url), 'utf8'))
    assert.equal(loaded[1]['root type'].id, 'Type Specification')
    const properties = loaded[1]['root type'].entry.signature.type['root value'][1]
    assert.equal(entry(properties, 'schema').value[0], 'component')
    assert.equal(entry(properties, 'root type').value[0], 'reference')
    assert.deepEqual(properties.__get_raw().map(([id]) => id), ['schema', 'root type'])
    assert.equal(entry(loaded[1].resolver['basic types'], 'text').type[0], 'text')
})

test('Next references and resolvers round-trip without old wrapper fields', () => {
    const source = readFileSync(new URL('../liana_authoring_environment_template/.liana/schema.slna', import.meta.url), 'utf8')
    const resolved = Type_Specification(chars(source), fail, { 'tab size': 4 })
    let serialized = ''
    serialize_paragraph.Paragraph(serialize_schema.Type_Specification(resolved), {
        indentation: '', newline: '',
    }, text => { serialized += text })
    assert.match(serialized, /`root type`:/)
    assert.match(serialized, /`basic types`:/)
    assert.doesNotMatch(serialized, /`(?:schema path|complexity|globals|schema imports|resolver imports|type resolver)`:/)
    assert.equal(parse(serialized)[1]['root type'].id, 'Type Specification')
})

test('text basic types complete with quotes, retain links, and seal punctuation safely', () => {
    const schema = basic('| `text` (`type`: | `multi line` ~ `link`: | `yes` (`path prefix`: "prefix/" `path suffix`: ".lna"))')
    const type = rootType(schema)['root value']
    const completion = skeleton.Value(type, { style: ['verbose', null] }).data[1].type[1]
    assert.deepEqual(completion.delimiter, ['quote', null])
    const value = document('"a (b)"', schema)
    assert.equal(value.content['unmarshall result'][1][0], 'text')
    assert.equal(links.Document(value).__get_raw().length, 1)
    assert.match(sealed('"a (b)"', schema), /"a \(b\)"/)
    assert.equal(document('{}', schema).content['unmarshall result'][0], 'error')
})

test('non-text basic types still complete and seal as undelimited values', () => {
    for (const [type, value, defaultValue] of [
        ['| `boolean` ~', 'true', 'false'],
        ['| `date` ~', '2026-10-18', 'yyyy-mm-dd'],
        ['| `number` (`precision`: | `approximation` (`significant digits`: 6))', '42', '0'],
    ]) {
        const schema = basic(type)
        const completion = skeleton.Value(rootType(schema)['root value'], { style: ['verbose', null] }).data[1].type[1]
        assert.deepEqual(completion.delimiter, ['none', null])
        assert.equal(completion.value, defaultValue)
        assert.equal(document(value, schema).content['unmarshall result'][1][0], 'simple')
        assert.equal(sealed(value, schema), value)
    }
})

test('nested components can forward omitted optional type parameters', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'liana-server-parameters-'))
    try {
        mkdirSync(join(dir, '.liana'))
        const parameter = presence => `(\`type\`: (\`location\`: | \`internal\` 'Leaf' \`resulting type\`: ~) \`presence\`: | \`${presence}\` ~)`
        const signature = types => `(\`type\`: ~ \`parameters\`: | \`local\` (\`types\`: ${types} \`lookups\`: {}) \`resolved parameters\`: ~)`
        const component = (name, args) => `(\`signature\`: ~ \`root value resolver\`: | \`component\` (
            \`definition\`: ~ \`location\`: | \`internal\` '${name}' \`signature\`: ~ \`arguments\`: ${args} \`constraints\`: {}
        ))`
        for (const [index, args] of [
            '* (`types`: * { \'child namespaces\': | `optional` | `not set` ~ } `lookups`: * {})',
            '* (`types`: * {} `lookups`: * {})',
            '* (`types`: _ `lookups`: * {})',
            '_',
            '* (`types`: * { \'child namespaces\': | `optional` | `not set` ~ \'basic types\': | `optional` | `not set` ~ } `lookups`: * {})',
        ].entries()) {
            const schema = `(
                \`schema\`: (
                    \`basic types\`: {}
                    \`types\`: {
                        'Root': (\`root value\`: | \`component\` (\`type\`: | \`internal acyclic\` 'Middle' \`results\`: _))
                        'Middle': (\`root value\`: | \`component\` (\`type\`: | \`internal acyclic\` 'Leaf' \`results\`: _))
                        'Leaf': (\`root value\`: | \`nothing\` ~)
                    }
                    \`signatures\`: {
                        'Root': ${signature(`{ 'inherited': ${parameter('required')} }`)}
                        'Middle': ${signature(`{ 'child namespaces': ${parameter('optional')} 'basic types': ${parameter('optional')} 'inherited': ${parameter('required')} }`)}
                        'Leaf': ${signature(`{ 'forwarded': ${parameter('optional')} 'inherited': ${parameter('required')} }`)}
                    }
                    \`resolvers\`: {
                        'Root': ${component('Middle', args)}
                        'Middle': ${component('Leaf', '* (`types`: * { \'forwarded\': | `parameter` \'basic types\' } `lookups`: * {})')}
                        'Leaf': (\`signature\`: ~ \`root value resolver\`: | \`nothing\` ~)
                    }
                )
                \`root type\`: 'Root'
            )`
            writeFileSync(join(dir, '.liana', 'schema.slna'), schema)
            const result = await new Promise(resolve => {
                const doc = TextDocument.create(pathToFileURL(join(dir, 'document.lna')).href, 'liana', index, '~')
                load_document(doc, { schemas: create_cache(), documents: create_cache() },
                    error => ['error', error], value => ['success', value], resolve)
            })
            if (result[0] === 'error') assert.fail(`argument variant ${index}: ${JSON.stringify(result[1])}`)
            assert.equal(result[1][0], 'constrained')
            const root = result[1][1].content['unmarshall result']
            assert.equal(root[0], 'success')
            const middle = root[1][1].value['unmarshall result']
            assert.equal(middle[0], 'success')
            const leaf = middle[1][1].value['unmarshall result']
            assert.equal(leaf[0], 'success')
            assert.equal(leaf[1][0], 'nothing')
        }
    } finally {
        rmSync(dir, { recursive: true, force: true })
    }
})

const template = () => readFileSync(new URL('../liana_authoring_environment_template/.liana/schema.slna', import.meta.url), 'utf8')
const typeReference = (name, mode = 'internal acyclic') => `| \`component\` (\`type\`: | \`${mode}\` '${name}' \`results\`: _)`

test('state result types precede options in the schema, resolver and serialized format', () => {
    const schema = parse(template())[1].resolver
    const stateDefinition = entry(entry(schema.types, 'Resolver Value')['root value'][1].options, 'state').value
    assert.equal(stateDefinition[0], 'group')
    assert.deepEqual(stateDefinition[1].__get_raw().map(([id]) => id), ['definition', 'result', 'options'])

    const stateResolver = entry(schema.resolvers, 'Resolver Value')['root value resolver']
    const properties = entry(stateResolver[1].options, 'state').resolver[1]
    assert.deepEqual(properties.__get_raw().map(([id]) => id), ['definition', 'result', 'options'])

    const serialized = sealed_target.Resolver_Value(stateResolver)
    assert.equal(serialized[1].option, 'state')
    assert.deepEqual(serialized[1].value[1][1].__get_raw().map(([id]) => id), ['definition', 'result', 'options'])
})

test('the self-schema binds local constraints when entering optional values and state options', async () => {
    const schema = parse(template())[1].resolver
    const options = entry(schema.resolvers, 'Resolver Value')['root value resolver'][1].options
    const optionalProperties = entry(options, 'optional').resolver[1]
    const stateProperties = entry(entry(options, 'state').resolver[1], 'options').resolver[1].resolver[1]
    for (const properties of [optionalProperties, stateProperties]) {
        const args = entry(properties, 'resolver').resolver[1].arguments.__get_raw()[0]
        const binding = entry(args.types.__get_raw()[0], 'option constraints')
        assert.equal(binding[0], 'optional')
        assert.equal(binding[1][0], 'set')
        assert.equal(binding[1][1].start[0], 'sibling')
        assert.equal(binding[1][1].start[1]['l id'], 'constraints')
        assert.deepEqual(binding[1][1].tail.path.__get_raw(), [['component', null]])
    }
    const diagnostics = resolveDiagnostics.Document(await loadWithSchema(template(), template())).__get_raw()
    assert.deepEqual(diagnostics, [])
})

test('selected references report missing dictionary entries at the identifier token', async () => {
    for (const mode of ['internal acyclic', 'internal']) {
        const source = specification(typeReference('Text Tsypes', mode))
        const diagnostics = resolveDiagnostics.Document(await loadWithSchema(source, template())).__get_raw().filter(d => d.message.startsWith('Reference \''))
        assert.equal(diagnostics.length, 1)
        assert.equal(diagnostics[0].message, "Reference 'Text Tsypes' does not exist.")
        assert.equal(diagnostics[0].severity[0], 'error')
        const range = diagnostics[0].range.__get_raw()[0]
        assert.equal(range[0], 'range')
        assert.equal(range[1].start.absolute, source.indexOf("'Text Tsypes'"))
        assert.equal(range[1].end.absolute, source.indexOf("'Text Tsypes'") + "'Text Tsypes'".length)
        assert.deepEqual(resolveDiagnostics.Document(await loadWithSchema(
            source.replace("'Text Tsypes'", "'Root'").replace('`internal acyclic`', '`internal`'), template()
        )).__get_raw().filter(d => d.message.startsWith('Reference \'')), [])
    }
})

test('acyclic references reject cycles while cyclic references allow mutual dependencies', async () => {
    for (const mode of ['internal acyclic', 'internal']) {
        const source = specification(typeReference('Other', mode)).replace(
            "'Root': (`root value`: ",
            `'Other': (\`root value\`: ${typeReference('Root', mode)}) 'Root': (\`root value\`: `,
        )
        const diagnostics = resolveDiagnostics.Document(await loadWithSchema(source, template())).__get_raw()
            .filter(d => d.message.startsWith('Reference \'') || d.message === 'Cyclic reference dependency.')
        if (mode === 'internal') assert.deepEqual(diagnostics, [])
        else {
            assert.ok(diagnostics.length > 0)
            assert.ok(diagnostics.every(d => d.message === 'Cyclic reference dependency.'))
        }
    }
})

const dependentReferenceSchema = () => {
    const component = name => `| \`component\` (\`type\`: | \`internal acyclic\` '${name}' \`results\`: _)`
    const resolverComponent = name => `| \`component\` (\`definition\`: ~ \`location\`: | \`internal\` '${name}' \`signature\`: ~ \`arguments\`: _ \`constraints\`: {})`
    const reference = name => `| \`reference\` (
        \`referent\`: (\`type\`: (\`location\`: | \`internal\` '${name}' \`resulting type\`: ~) \`path\`: (\`tail\`: [] \`resulting node\`: ~))
        \`type\`: | \`selected\` (\`dictionary\`: ~ \`dependency\`: | \`acyclic\` ~ \`results\`: _))`
    const resolverReference = (start, path) => `| \`reference\` (
        \`definition\`: ~ \`type\`: | \`selected\` (\`definition\`: ~
            \`lookup\`: (\`type\`: | \`acyclic\` | \`resolved dictionary\` (
                \`selection\`: (\`start\`: | \`sibling\` '${start}' \`tail\`: (\`path\`: [${path}] \`resulting node\`: ~) \`resulting node\`: ~)
                \`selected dictionary\`: ~) \`resulting dictionary\`: ~) \`constraints\`: {}))`
    const signatures = ['Root', 'Nodes', 'Members'].map(name =>
        `'${name}': (\`type\`: ~ \`parameters\`: | \`local\` (\`types\`: {} \`lookups\`: {}) \`resolved parameters\`: ~)`
    ).join('')
    return `(\`schema\`: (
        \`basic types\`: {}
        \`types\`: {
            'Root': (\`root value\`: | \`group\` {
                'member': (\`description\`: _ \`value\`: ${reference('Members')})
                'chosen': (\`description\`: _ \`value\`: ${reference('Nodes')})
                'entries': (\`description\`: _ \`value\`: ${component('Nodes')})
            })
            'Nodes': (\`root value\`: | \`dictionary\` (\`value\`: | \`group\` {
                'members': (\`description\`: _ \`value\`: ${component('Members')})
            }))
            'Members': (\`root value\`: | \`dictionary\` (\`value\`: | \`nothing\` ~))
        }
        \`signatures\`: {${signatures}}
        \`resolvers\`: {
            'Root': (\`signature\`: ~ \`root value resolver\`: | \`group\` {
                'member': (\`definition\`: ~ \`resolver\`: ${resolverReference('chosen', '| `reference` (`definition`: ~) | `group` \'members\' | `component` ~')})
                'chosen': (\`definition\`: ~ \`resolver\`: ${resolverReference('entries', '| `component` ~')})
                'entries': (\`definition\`: ~ \`resolver\`: ${resolverComponent('Nodes')})
            })
            'Nodes': (\`signature\`: ~ \`root value resolver\`: | \`dictionary\` (\`definition\`: ~ \`resolver\`: | \`group\` {
                'members': (\`definition\`: ~ \`resolver\`: ${resolverComponent('Members')})
            } \`benchmark\`: _))
            'Members': (\`signature\`: ~ \`root value resolver\`: | \`dictionary\` (\`definition\`: ~ \`resolver\`: | \`nothing\` ~ \`benchmark\`: _))
        }
    ) \`root type\`: 'Root')`
}

test('dependent lookups traverse components, groups and resolved references in dependency order', async () => {
    const schema = dependentReferenceSchema()
    for (const id of ['Known', '']) {
        const source = `(\`member\`: 'a' \`chosen\`: '${id}' \`entries\`: { '${id}': (\`members\`: {'a': ~}) })`
        assert.deepEqual(resolveDiagnostics.Document(await loadWithSchema(source, schema)).__get_raw(), [])
        const missing = source.replace("`member`: 'a'", "`member`: 'missing'")
        const diagnostics = resolveDiagnostics.Document(await loadWithSchema(missing, schema)).__get_raw()
        assert.deepEqual(diagnostics.map(d => d.message), ["Reference 'missing' does not exist."])
    }
})

test('failed lookup sources do not produce cascading missing-reference errors', async () => {
    const schema = dependentReferenceSchema()
    for (const source of [
        "(`member`: 'missing' `chosen`: 'missing' `entries`: #)",
        "(`member`: 'missing' `chosen`: 'missing' `entries`: {'Known': (`members`: {})})",
        "(`member`: 'missing' `chosen`: 'Known' `entries`: {'Known': ~ 'Known': ~})",
    ]) {
        const diagnostics = resolveDiagnostics.Document(await loadWithSchema(source, schema)).__get_raw()
        assert.ok(diagnostics.length <= 1)
        assert.ok(diagnostics.every(d => d.message === "Reference 'missing' does not exist."))
    }
})

test('a missing list cursor is an explicit error rather than an unsupported warning', () => {
    const context = { lookups: {}, types: p.literal.dictionary({}) }
    assert.deepEqual(resolver.Resolver_Guaranteed_Value_Selection({
        start: ['list cursor', null],
        tail: { path: p.literal.list([]) },
    }, context), ['constraint failed', 'no list cursor is available in this context'])

    const range = { start: { absolute: 0, relative: { line: 0, column: 0 } },
        end: { absolute: 9, relative: { line: 0, column: 9 } } }
    for (const status of ['constraint failed']) {
        const document = { content: {
            constraints: p.literal.dictionary({}),
            'unmarshall result': ['success', ['reference', ['selected', {
                unmarshalled: { intermediate: { instance: { range, token: { value: 'unchecked' } } } },
                'resolve status': ['selected', ['unavailable', null]],
                constraints: p.literal.dictionary({ cursor: [status, 'no list cursor is available in this context'] }),
            }]]],
        } }
        const errors = resolveErrors.Document(document).__get_raw()
        assert.deepEqual(errors[0].type, [status, 'no list cursor is available in this context'])
        const diagnostics = resolveDiagnostics.Document(document).__get_raw()
        assert.equal(diagnostics.length, 1)
        assert.equal(diagnostics[0].severity[0], 'error')
        assert.match(diagnostics[0].message, /no list cursor is available/)
        assert.doesNotMatch(diagnostics[0].message, /does not exist/)
        assert.deepEqual(diagnostics[0].range.__get_raw()[0], ['range', range])
    }
})

test('option constraints report resolver mismatches without warnings for valid definitions', async () => {
    const mismatched = specification('| `dictionary` (`value`: | `nothing` ~)', '| `state` (`definition`: ~ `result`: _ `options`: {})')
    const diagnostics = resolveDiagnostics.Document(await loadWithSchema(mismatched, template())).__get_raw()
    assert.ok(diagnostics.some(d => d.severity[0] === 'error' && d.message === "Constraint failed: expected state option 'state'."), JSON.stringify(diagnostics.map(d => d.message)))

    const valid = specification('| `nothing` ~')
    assert.deepEqual(resolveDiagnostics.Document(await loadWithSchema(valid, template())).__get_raw(), [])

    const invalidDefinition = specification('#')
    const suppressed = resolveDiagnostics.Document(await loadWithSchema(invalidDefinition, template())).__get_raw()
    assert.ok(!suppressed.some(d => d.message.startsWith('Constraint failed:')))
})

const resultType = root => ({ location: ['internal', { 'l id': 'Result' }], 'resulting type': root })
const relative = (...path) => ({ path: p.literal.list(path) })
const guaranteed = (start, ...path) => ({ start, tail: relative(...path) })
const nothingValue = () => resolver.Value(document('~', specification()).content, {}, {
    definition: ['nothing', null], 'type parameters': p.literal.dictionary({}),
})
const stateValueType = '| `state` (`options`: { \'left\': (`description`: _ `constraints`: _ `value`: | `nothing` ~) \'right\': (`description`: _ `constraints`: _ `value`: | `nothing` ~) } `results`: _)'
const stateResolverText = '| `state` (`definition`: ~ `result`: _ `options`: { \'left\': (`constraints`: {} `resolver`: | `nothing` ~ `result`: _) \'right\': (`constraints`: {} `resolver`: | `nothing` ~ `result`: _) })'
const stateDefinition = (results = p.literal.not_set(), selection = ['value', relative()], constraints = () => p.literal.dictionary({})) => ['state', {
    result: results,
    options: p.literal.dictionary(Object.fromEntries(['left', 'right'].map(id => [id, {
        constraints: constraints(id), resolver: ['nothing', null],
        result: results.__get_raw() === null ? p.literal.not_set() : p.literal.set(selection),
    }]))),
}]
const resolveState = (source, definition, parameters = {}) => resolver.Value(
    document(source, specification(stateValueType, stateResolverText)).content,
    {},
    { definition, 'type parameters': p.literal.dictionary(parameters) },
)

test('state results select each option payload or explicit enclosing context', () => {
    const type = resultType({ 'root value': ['nothing', null] })
    const seed = nothingValue()
    for (const id of ['left', 'right']) {
        const value = resolveState(`| \`${id}\` ~`, stateDefinition(p.literal.set(type)))
        const state = value['unmarshall result'][1][1]
        assert.equal(state.result[0], 'resolved')
        assert.equal(state.result[1], state.option.__get_raw()[0])
        assert.deepEqual(resolveDiagnostics.Document({ content: value }).__get_raw(), [])

        const context = resolveState(`| \`${id}\` ~`, stateDefinition(
            p.literal.set(type), ['context', guaranteed(['parameter', { 'l id': 'seed' }])],
        ), { seed: ['resolved', seed] })
        assert.equal(context['unmarshall result'][1][1].result[1], seed)
    }
})

test('list results use the initial cursor for empty lists and advance it after each item', () => {
    const seed = resolveState('| `left` ~', stateDefinition())
    const type = resultType({ 'root value': ['state', {}] })
    const item = stateDefinition(p.literal.not_set(), undefined, id => p.literal.dictionary({
        previous: ['state', {
            selection: guaranteed(['list cursor', null]), option: { 'l id': id === 'left' ? 'right' : 'left' },
        }],
    }))
    const schema = specification(`| \`list\` (\`value\`: ${stateValueType} \`results\`: _)`,
        `| \`list\` (\`definition\`: ~ \`resolver\`: ${stateResolverText} \`result\`: _)`)
    for (const source of ['[]', '[| `right` ~ | `left` ~ | `right` ~]']) {
        const value = resolver.Value(document(source, schema).content, {}, {
            definition: ['list', { resolver: item, result: p.literal.set({
                type, initial: guaranteed(['parameter', { 'l id': 'seed' }]), next: ['value', relative()],
            }) }],
            'type parameters': p.literal.dictionary({ seed: ['resolved', seed] }),
        })
        const list = value['unmarshall result'][1][1]
        const items = list.items.__get_raw()
        assert.equal(list.result[0], 'resolved')
        assert.equal(list.result[1], items.length === 0 ? seed : items.at(-1))
        assert.deepEqual(resolveDiagnostics.Document({ content: value }).__get_raw(), [])
    }
})

test('state result declarations reject missing, unexpected and wrongly typed option selections', () => {
    const selection = '* | `value` (`path`: [| `component` ~] `resulting node`: ~)'
    const type = '* (`location`: | `internal` \'Nothing\' `resulting type`: ~)'
    const component = '| `component` (`type`: | `internal acyclic` \'Nothing\' `results`: _)'
    const componentResolver = '| `component` (`definition`: ~ `location`: | `internal` \'Nothing\' `signature`: ~ `arguments`: _ `constraints`: {})'
    const schema = (parent, option) => specification(stateValueType.replaceAll('`value`: | `nothing` ~', `\`value\`: ${component}`), stateResolverText
        .replace('`result`: _ `options`', `\`result\`: ${parent} \`options\``)
        .replaceAll('`resolver`: | `nothing` ~ `result`: _', `\`resolver\`: ${componentResolver} \`result\`: ${option}`))
        .replace('`types`: {', '`types`: { \'Nothing\': (`root value`: | `nothing` ~)')
        .replace('`signatures`: {', '`signatures`: { \'Nothing\': (`type`: ~ `parameters`: | `local` (`types`: {} `lookups`: {}) `resolved parameters`: ~)')
        .replace('`resolvers`: {', '`resolvers`: { \'Nothing\': (`signature`: ~ `root value resolver`: | `nothing` ~)')
    assert.doesNotThrow(() => parse(schema(type, selection)))
    assert.throws(() => parse(schema(type, '_')))
    assert.throws(() => parse(schema('_', selection)))
    assert.throws(() => parse(schema(type.replace("'Nothing'", "'Root'"), selection)))
})

test('typed state result consumers reject missing producer results and mismatched types', () => {
    const root = { 'root value': ['nothing', null] }
    const type = resultType(root)
    const producer = resolveState('| `left` ~', stateDefinition(p.literal.set(type)))
    const consume = (value, expected) => resolver.Resolver_Guaranteed_Value_Selection(
        guaranteed(['parameter', { 'l id': 'value' }], ['state result', expected]),
        { lookups: {}, types: p.literal.dictionary({ value: ['resolved', value] }) },
    )
    assert.equal(consume(producer, type)[0], 'resolved')
    assert.match(consume(producer, resultType({ 'root value': ['nothing', null] }))[1], /does not match/)
    assert.match(consume(resolveState('| `left` ~', stateDefinition()), type)[1], /does not declare a result/)
    assert.deepEqual(consume({ 'unmarshall result': ['error', null] }, type), ['unavailable', null])
})

test('result-selection failures are reported without a downstream consumer and invalid inputs suppress cascades', () => {
    const type = resultType({ 'root value': ['nothing', null] })
    const invalid = resolveState('| `left` ~', stateDefinition(
        p.literal.set(type), ['context', guaranteed(['list cursor', null])],
    ))
    const diagnostics = resolveDiagnostics.Document({ content: invalid }).__get_raw()
    assert.equal(diagnostics.length, 1)
    assert.match(diagnostics[0].message, /no list cursor is available/)
    const failedCheck = resolveState('| `left` ~', stateDefinition(
        p.literal.set(type), ['context', guaranteed(['list cursor', null])],
        () => p.literal.dictionary({ check: ['assert is set', ['parameter', { 'l id': 'input' }]] }),
    ), { input: ['not set', null] })
    const checks = resolveDiagnostics.Document({ content: failedCheck }).__get_raw()
    assert.equal(checks.length, 1)
    assert.match(checks[0].message, /expected an optional value to be set/)
    assert.equal(failedCheck['unmarshall result'][1][1].result[0], 'unavailable')
})

test('constraint diagnostics are emitted without a downstream selected reference', () => {
    const parsed = document('~', specification()).content
    for (const selection of [
        ['constraint failed', 'expected an optional value to be set'],
        ['unavailable', null],
        ['resolved', null],
    ]) {
        const value = {
            unmarshalled: parsed,
            constraints: p.literal.dictionary({ check: selection }),
            'unmarshall result': ['success', ['nothing', null]],
        }
        const diagnostics = resolveDiagnostics.Document({ content: value }).__get_raw()
        if (selection[0] === 'resolved' || selection[0] === 'unavailable') assert.deepEqual(diagnostics, [])
        else {
            assert.equal(diagnostics.length, 1)
            assert.equal(diagnostics[0].severity[0], 'error')
            assert.ok(diagnostics[0].message.includes(selection[0] === 'constraint failed' ? selection[1] : selection[0]))
        }
    }
})

test('optional presence checks distinguish absent, failed and invalid prerequisites', () => {
    const source = '* ~'
    const unmarshalled = document(source, specification('| `optional` | `nothing` ~')).content
    for (const [status, severity] of [
        [['not set', null], 'error'],
        [['constraint failed', 'invalid result type'], 'error'],
        [['unavailable', null], null],
    ]) {
        const value = resolver.Value(unmarshalled, {}, {
            definition: ['optional', {
                constraints: p.literal.dictionary({ required: ['assert is set', ['parameter', { 'l id': 'input' }]] }),
                resolver: ['nothing', null],
            }],
            'type parameters': p.literal.dictionary({ input: status }),
        })
        const diagnostics = resolveDiagnostics.Document({ content: value }).__get_raw()
        assert.equal(diagnostics.length, severity === null ? 0 : 1)
        if (severity !== null) assert.equal(diagnostics[0].severity[0], severity)
    }
})

test('document loading uses Next root selection, preserves caching and reports schema errors', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'liana-server-next-'))
    try {
        mkdirSync(join(dir, '.liana'))
        const schemaPath = join(dir, '.liana', 'schema.slna')
        writeFileSync(schemaPath, basic('| `text` (`type`: | `single line` ~ `link`: | `no` ~)'))
        const cache = { schemas: create_cache(), documents: create_cache() }
        const load = (version, caches = cache) => new Promise(resolve => {
            const doc = TextDocument.create(pathToFileURL(join(dir, 'document.lna')).href, 'liana', version, '"hello (world)"')
            load_document(doc, caches, error => ['error', error], result => ['success', result], resolve)
        })
        const first = await load(1)
        assert.equal(first[0], 'success')
        assert.equal(first[1][0], 'constrained')
        assert.equal(first[1][1].content['unmarshall result'][1][0], 'text')
        assert.equal((await load(2))[0], 'success')
        assert.equal(cache.schemas.map.size, 1)
        assert.equal(cache.documents.map.size, 2)
        writeFileSync(schemaPath, specification(undefined, undefined, undefined, 'missing'))
        const error = await load(3, { schemas: create_cache(), documents: create_cache() })
        assert.equal(error[0], 'error')
        assert.equal(error[1][0], 'schema')
        assert.deepEqual(error[1][1].error.type[1][1].type, ['lookup', ['no such entry', 'missing']])
    } finally {
        rmSync(dir, { recursive: true, force: true })
    }
})
