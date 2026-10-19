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
const { create_on_completion } = require('../server/out/connection/on_completion.js')
const { create_on_definition } = require('../server/out/connection/on_definition.js')
const { create_on_references } = require('../server/out/connection/on_references.js')
const { create_on_document_highlight } = require('../server/out/connection/on_document_highlight.js')
const { create_on_prepare_rename, create_on_rename } = require('../server/out/connection/on_rename.js')
const { create_on_initialize } = require('../server/out/connection/on_initialize.js')
const completion = require('liana-authoring/schemas/resolve_result/transformers/completion_suggestions')
const unmarshalCompletion = require('liana-authoring/schemas/unmarshall_result/transformers/completion_suggestions')
const p = require('pareto-core/transformer')

const chars = source => p.literal.list(Array.from(source, c => c.codePointAt(0)))
const snippetText = text => text.replace(/^\$0/, '').replace(/\\([\\$}])/g, '$1')
const { quote_identifier } = require('../server/out/helpers/quote_identifier.js')
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

const requestAt = async (source, schema, offset, createHandler, parameters = {}) => {
    const dir = mkdtempSync(join(tmpdir(), 'liana-completion-'))
    try {
        mkdirSync(join(dir, '.liana'))
        writeFileSync(join(dir, '.liana', 'schema.slna'), schema)
        const doc = TextDocument.create(pathToFileURL(join(dir, 'document.lna')).href, 'liana', 1, source)
        return await createHandler({
            documents: { get: () => doc },
            cache: { schemas: create_cache(), documents: create_cache() },
            'document notation styles': new Map(),
        })({ textDocument: { uri: doc.uri }, position: doc.positionAt(offset), ...parameters })
    } finally {
        rmSync(dir, { recursive: true, force: true })
    }
}

const complete = (source, schema, offset) => requestAt(source, schema, offset, create_on_completion)
const definitionAt = (source, schema, offset) => requestAt(source, schema, offset, create_on_definition)
const referencesAt = (source, schema, offset, includeDeclaration = false) =>
    requestAt(source, schema, offset, create_on_references, { context: { includeDeclaration } })
const renameAt = (source, schema, offset, newName) =>
    requestAt(source, schema, offset, create_on_rename, { newName })

test('a missing constrained root value offers its schema skeleton', async () => {
    const schema = readFileSync(new URL('../liana_authoring_environment_template/.liana/schema.slna', import.meta.url), 'utf8')
    const result = await complete('#', schema, 0)
    assert.equal(result.items.length, 1)
    assert.match(result.items[0].textEdit.newText, /`schema`:/)
    assert.match(result.items[0].textEdit.newText, /`root type`: #/)
    assert.equal(result.items[0].textEdit.range.end.character, 1)
})

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

test('nested components pass through whole categories or explicitly bind every type argument', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'liana-server-parameters-'))
    try {
        mkdirSync(join(dir, '.liana'))
        const parameter = presence => `(\`type\`: (\`location\`: | \`internal\` 'Leaf' \`resulting type\`: ~) \`presence\`: | \`${presence}\` ~)`
        const signature = types => `(\`type\`: ~ \`parameters\`: | \`local\` (\`types\`: ${types} \`lookups\`: {}) \`resolved parameters\`: ~)`
        const component = (name, args) => `(\`signature\`: ~ \`root value resolver\`: | \`component\` (
            \`definition\`: ~ \`location\`: | \`internal\` '${name}' \`signature\`: ~ \`arguments\`: ${args} \`constraints\`: {}
        ))`
        for (const [index, args] of [
            '* (`types`: _ `lookups`: * {})',
            '_',
            '* (`types`: * { \'child namespaces\': | `optional` | `not set` ~ \'basic types\': | `optional` | `not set` ~ \'inherited\': | `parameter` \'inherited\' } `lookups`: * {})',
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
                        'Root': ${signature(`{ 'child namespaces': ${parameter('optional')} 'basic types': ${parameter('optional')} 'inherited': ${parameter('required')} }`)}
                        'Middle': ${signature(`{ 'child namespaces': ${parameter('optional')} 'basic types': ${parameter('optional')} 'inherited': ${parameter('required')} }`)}
                        'Leaf': ${signature(`{ 'forwarded': ${parameter('optional')} 'inherited': ${parameter('required')} }`)}
                    }
                    \`resolvers\`: {
                        'Root': ${component('Middle', args)}
                        'Middle': ${component('Leaf', '* (`types`: * { \'forwarded\': | `parameter` \'basic types\' \'inherited\': | `parameter` \'inherited\' } `lookups`: * {})')}
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

test('definition navigation follows dependent references to exact dictionary key ranges', async () => {
    const schema = dependentReferenceSchema()
    for (const token of ["'alpha'", '"alpha"', '`alpha`', 'alpha']) {
        const source = `(\`member\`: ${token} \`chosen\`: 'Known' \`entries\`: {'Known': (\`members\`: {'alpha': ~})})`
        const links = await definitionAt(source, schema, source.indexOf(token) + 2)
        assert.equal(links.length, 1)
        const doc = TextDocument.create('file:///test.lna', 'liana', 1, source)
        assert.equal(doc.getText(links[0].originSelectionRange), token)
        assert.equal(doc.getText(links[0].targetSelectionRange), "'alpha'")
        assert.equal(doc.offsetAt(links[0].targetSelectionRange.start), source.lastIndexOf("'alpha'"))
        assert.deepEqual(links[0].targetRange, links[0].targetSelectionRange)
        assert.match(links[0].targetUri, /^file:.*document\.lna$/)
    }
    const multiline = "(\n\t`member`: \"a\\nb\" `chosen`: 'Known'\n\t`entries`: {'Known': (`members`: {\"a\\nb\": ~})})"
    const links = await definitionAt(multiline, schema, multiline.indexOf('"a\\nb"') + 2)
    const doc = TextDocument.create('file:///test.lna', 'liana', 1, multiline)
    assert.equal(doc.offsetAt(links[0].targetSelectionRange.start), multiline.lastIndexOf('"a\\nb"'))
    assert.equal(doc.getText(links[0].targetSelectionRange), '"a\\nb"')
})

test('definition navigation supports forwarded acyclic and cyclic lookups, including forward targets', async () => {
    for (const mode of ['internal', 'internal acyclic']) {
        const root = typeReference('Other', mode)
        const source = specification(root).replace(
            '`signatures`: {',
            '`signatures`: { \'Other\': (`type`: ~ `parameters`: | `local` (`types`: {} `lookups`: {}) `resolved parameters`: ~)',
        ).replace(
            `\`types\`: { 'Root': (\`root value\`: ${root}) }`,
            `\`types\`: { 'Root': (\`root value\`: ${root}) 'Other': (\`root value\`: | \`nothing\` ~) }`,
        )
        const links = await definitionAt(source, template(), source.indexOf("'Other'") + 2)
        // The signature dictionary is a separate lookup from the types dictionary.
        const doc = TextDocument.create('file:///test.lna', 'liana', 1, source)
        assert.equal(links.length, 1)
        assert.equal(doc.offsetAt(links[0].targetSelectionRange.start), source.indexOf("'Other':"))
    }
    const source = specification(typeReference('Root', 'internal'))
    const links = await definitionAt(source, template(), source.indexOf("'Root'", source.indexOf('`internal`')) + 2)
    assert.equal(links.length, 1)
    const doc = TextDocument.create('file:///test.lna', 'liana', 1, source)
    assert.equal(doc.offsetAt(links[0].targetSelectionRange.start), source.indexOf("'Root'"))
})

test('definition navigation does not guess targets for missing, invalid, derived or non-reference values', async () => {
    const schema = dependentReferenceSchema()
    for (const source of [
        "(`member`: # `chosen`: 'Known' `entries`: {})",
        "(`member`: 'missing' `chosen`: 'Known' `entries`: {'Known': (`members`: {})})",
        "(`member`: 'alpha' `chosen`: 'missing' `entries`: #)",
        "(`member`: 'alpha' `chosen`: 'Known' `entries`: {'Known': (`members`: {'alpha': ~ 'alpha': ~})})",
    ]) {
        assert.equal(await definitionAt(source, schema, source.indexOf(':') + 3), null)
    }
    const source = specification()
    assert.equal(await definitionAt(source, template(), source.indexOf('`nothing`') + 2), null)
    assert.equal(await definitionAt(source, template(), source.indexOf('`type`: ~') + 8), null)
    assert.equal(create_on_definition({ documents: { get: () => undefined } })({
        textDocument: { uri: 'file:///closed.lna' }, position: { line: 0, character: 0 },
    }), null)
})

test('the language server advertises definition navigation', () => {
    const noop = () => {}
    const result = create_on_initialize({
        'set has configuration capability': noop,
        'set has workspace folder capability': noop,
        'set has diagnostic related information capability': noop,
    })({ capabilities: {} })
    assert.equal(result.capabilities.definitionProvider, true)
    assert.equal(result.capabilities.referencesProvider, true)
    assert.equal(result.capabilities.documentHighlightProvider, true)
    assert.deepEqual(result.capabilities.renameProvider, { prepareProvider: true })
})

const identitySource = "(`member`: 'alpha' `chosen`: 'Known' `entries`: {'Known': (`members`: {'alpha': ~ 'beta': ~}) 'Other': (`members`: {'alpha': ~})})"
const applyRename = (source, result) => {
    assert.equal(result.documentChanges.length, 1)
    assert.equal(result.documentChanges[0].textDocument.version, 1)
    const doc = TextDocument.create('file:///test.lna', 'liana', 1, source)
    return TextDocument.applyEdits(doc, result.documentChanges[0].edits)
}

test('references and highlights work from declarations and references without matching same-named entries', async () => {
    const source = identitySource
    const schema = dependentReferenceSchema()
    const doc = TextDocument.create('file:///test.lna', 'liana', 1, source)
    const reference = source.indexOf("'alpha'")
    const declaration = source.indexOf("'alpha':")
    const other = source.lastIndexOf("'alpha':")
    for (const offset of [reference, declaration]) {
        const refs = await referencesAt(source, schema, offset + 2)
        assert.deepEqual(refs.map(ref => doc.offsetAt(ref.range.start)), [reference])
        const all = await referencesAt(source, schema, offset + 2, true)
        assert.deepEqual(all.map(ref => doc.offsetAt(ref.range.start)), [declaration, reference])
        const highlights = await requestAt(source, schema, offset + 2, create_on_document_highlight)
        assert.deepEqual(highlights.map(item => [doc.offsetAt(item.range.start), item.kind]), [
            [declaration, 3], [reference, 2],
        ])
    }
    assert.deepEqual(await referencesAt(source, schema, other + 2), [])
    assert.equal((await referencesAt(source, schema, other + 2, true)).length, 1)
})

test('safe rename edits only the resolved declaration and its references with correct quoting', async () => {
    for (const newName of ['renamed', '', 'two words', "a'b\"c\\$1}\n\r\t", '\u{1f600}', 'alpha']) {
        const source = identitySource
        const schema = dependentReferenceSchema()
        for (const offset of [source.indexOf("'alpha'") + 2, source.indexOf("'alpha':") + 2]) {
            const prepared = await requestAt(source, schema, offset, create_on_prepare_rename)
            assert.equal(prepared.placeholder, 'alpha')
            const doc = TextDocument.create('file:///test.lna', 'liana', 1, source)
            assert.equal(doc.getText(prepared.range), "'alpha'")
            const result = await renameAt(source, schema, offset, newName)
            if (newName === 'alpha') {
                assert.deepEqual(result.documentChanges, [])
                continue
            }
            const updated = applyRename(source, result)
            assert.equal(result.documentChanges[0].edits.length, 2)
            assert.ok(updated.includes("'Other': (`members`: {'alpha': ~})"))
            assert.deepEqual(resolveDiagnostics.Document(await loadWithSchema(updated, schema)).__get_raw(), [])
            assert.equal(result.documentChanges[0].edits[0].newText, quote_identifier(newName))
        }
    }
})

test('renaming a dependent lookup owner preserves downstream reference bindings', async () => {
    const source = identitySource
    const schema = dependentReferenceSchema()
    const result = await renameAt(source, schema, source.indexOf("'Known'") + 2, 'Renamed owner')
    assert.equal(result.documentChanges[0].edits.length, 2)
    const updated = applyRename(source, result)
    assert.deepEqual(resolveDiagnostics.Document(await loadWithSchema(updated, schema)).__get_raw(), [])
    const refs = await referencesAt(updated, schema, updated.indexOf("'alpha'") + 2)
    assert.equal(refs.length, 1)
})

test('safe rename rejects dictionary collisions and newly captured references', async () => {
    const schema = dependentReferenceSchema()
    await assert.rejects(renameAt(identitySource, schema, identitySource.indexOf("'alpha'") + 2, 'beta'), /already exists/)
    const source = identitySource.replace("'alpha' `chosen`", "'missing' `chosen`")
    await assert.rejects(renameAt(source, schema, source.indexOf("'alpha':") + 2, 'missing'), /reference binding/)
})

test('safe rename rejects implicit dependencies and invalid rename positions explicitly', async () => {
    const source = specification()
    await assert.rejects(renameAt(source, template(), source.indexOf("'Root':") + 2, 'Renamed'), /new diagnostic/)
    await assert.rejects(renameAt(source, template(), source.indexOf('`nothing`') + 2, 'Renamed'), /requires a dictionary entry/)
    await assert.rejects(requestAt(source, template(), source.indexOf('`nothing`') + 2, create_on_prepare_rename), /requires a dictionary entry/)
    const invalid = identitySource.replace("'alpha' `chosen`", "'missing' `chosen`")
    assert.deepEqual(await referencesAt(invalid, dependentReferenceSchema(), invalid.indexOf("'missing'") + 2), [])
    assert.deepEqual(await requestAt(invalid, dependentReferenceSchema(), invalid.indexOf("'missing'") + 2, create_on_document_highlight), [])
    await assert.rejects(renameAt(invalid, dependentReferenceSchema(), invalid.indexOf("'missing'") + 2, 'valid'), /requires a dictionary entry/)
})

test('references and highlights follow cyclic and acyclic targets without traversing reference cycles', async () => {
    for (const mode of ['internal', 'internal acyclic']) {
        const root = typeReference(mode === 'internal' ? 'Root' : 'Other', mode)
        const source = mode === 'internal' ? specification(root) : specification(root).replace(
            `\`types\`: { 'Root': (\`root value\`: ${root}) }`,
            `\`types\`: { 'Root': (\`root value\`: ${root}) 'Other': (\`root value\`: | \`nothing\` ~) }`,
        )
        const name = mode === 'internal' ? "'Root'" : "'Other'"
        const offset = source.indexOf(name, source.indexOf(`\`${mode}\``))
        const refs = await referencesAt(source, template(), offset + 2)
        assert.equal(refs.length, 1)
        const doc = TextDocument.create('file:///test.lna', 'liana', 1, source)
        assert.equal(doc.offsetAt(refs[0].range.start), offset)
        const highlights = await requestAt(source, template(), offset + 2, create_on_document_highlight)
        assert.equal(highlights.length, 2)
    }
})

test('rename refuses partial edits to mutually cyclic symbols with implicit benchmark dependencies', async () => {
    const schema = template()
    const source = specification(typeReference('Other', 'internal')).replace(
        '`types`: {',
        `\`types\`: { 'Other': (\`root value\`: ${typeReference('Root', 'internal')})`,
    )
    const refs = await referencesAt(source, schema, source.indexOf("'Other':") + 2)
    assert.equal(refs.length, 1)
    await assert.rejects(renameAt(source, schema, source.indexOf("'Other':") + 2, 'renamed'), /new diagnostic/)
})

test('rename permits unrelated existing errors and emits versioned edits without stale cache results', async () => {
    const schema = dependentReferenceSchema()
    const source = identitySource.replace("'alpha' `chosen`", "'missing' `chosen`")
    const offset = source.indexOf("'beta':") + 2
    const result = await renameAt(source, schema, offset, 'unreferenced')
    const updated = applyRename(source, result)
    assert.equal(result.documentChanges[0].edits.length, 1)
    assert.deepEqual(resolveDiagnostics.Document(await loadWithSchema(updated, schema)).__get_raw().map(d => d.message),
        ["Reference 'missing' does not exist."])
    let calls = 0
    await assert.rejects(requestAt(identitySource, schema, identitySource.indexOf("'alpha'") + 2, (context) =>
        create_on_rename({
            ...context,
            documents: { get: uri => {
                const doc = context.documents.get(uri)
                return ++calls === 1 ? doc : TextDocument.create(doc.uri, doc.languageId, doc.version + 1, doc.getText())
            } },
        }), { newName: 'renamed' }), /document changed/)
    assert.deepEqual(await referencesAt('(', schema, 0), [])
    assert.deepEqual(await requestAt('(', schema, 0, create_on_document_highlight), [])
    await assert.rejects(renameAt('(', schema, 0, 'renamed'), /could not be resolved/)
})

test('parent skeletons retain reference markers without offering marker-to-marker completion', () => {
    const schema = dependentReferenceSchema()
    const source = '(`member`: # `chosen`: # `entries`: {})'
    assert.equal(unmarshalCompletion.Document(document(source, schema), {
        position: { line: 0, character: source.indexOf('#') }, indent: '    ', style: ['verbose', null],
    }).__get_raw()[0].suggestions.__get_raw()[0]['insert lines'].__get_raw().join(''), "''")
    const result = unmarshalCompletion.Document(document('#', schema), {
        position: { line: 0, character: 0 }, indent: '    ', style: ['verbose', null],
    }).__get_raw()[0]
    const text = result.suggestions.__get_raw()[0]['insert lines'].__get_raw().join('\n')
    assert.match(text, /`member`: #/)
    assert.match(text, /`chosen`: #/)
    assert.doesNotMatch(text, /'\.\.\.'/)
})

test('reference completion replaces missing markers and whole quoted tokens using dependent lookups', async () => {
    const schema = dependentReferenceSchema()
    for (const reference of ['#', "'part'", '"part"', '`part`', 'part', '"par\nt"']) {
        const source = `(\`member\`: ${reference} \`chosen\`: 'Known' \`entries\`: {'Known': (\`members\`: {'alpha': ~ 'beta': ~})})`
        const offset = source.indexOf(reference) + (reference === '#' ? 0 : 2)
        const result = await complete(source, schema, offset)
        assert.deepEqual(result.items.map(item => item.label), ['alpha', 'beta'])
        const edit = result.items[0].textEdit
        assert.equal(edit.range.start.character, source.indexOf(reference))
        const doc = TextDocument.create('file:///completion.lna', 'liana', 1, source)
        assert.deepEqual(edit.range.end, doc.positionAt(source.indexOf(reference) + reference.length))
        assert.equal(edit.newText, '"alpha"')
        assert.equal(result.items[0].insertTextFormat, 1)
        const delimiter = reference[0]
        const expectedFilter = delimiter === '#' ? '#alpha'
            : ['"', "'", '`'].includes(delimiter) ? `${delimiter}alpha${delimiter}` : 'alpha'
        assert.equal(result.items[0].filterText, expectedFilter)
    }
})

test('reference filtering matches quoted prefixes including spaces and escaped identifiers', async () => {
    const schema = dependentReferenceSchema()
    for (const [token, id, filter] of [
        ["'def'", 'definition', "'definition'"],
        ['"source def"', 'source definitions', '"source definitions"'],
        ["'a\\\\b'", 'a\\b', "'a\\\\b'"],
        ["'a\\'b'", "a'b", "'a\\'b'"],
        ['`a\\`b`', 'a`b', '`a\\`b`'],
        ['"a\\nb"', 'a\nb', '"a\\nb"'],
        ["''", '', "''"],
    ]) {
        const source = `(\`member\`: ${token} \`chosen\`: 'Known' \`entries\`: {'Known': (\`members\`: {${JSON.stringify(id)}: ~})})`
        const result = await complete(source, schema, source.indexOf(token) + token.length - 1)
        assert.equal(result.items.length, 1)
        assert.equal(result.items[0].filterText, filter)
        const start = source.indexOf(token)
        const updated = source.slice(0, start) + result.items[0].textEdit.newText + source.slice(start + token.length)
        assert.deepEqual(resolveDiagnostics.Document(await loadWithSchema(updated, schema)).__get_raw(), [])
    }
})

test('reference completion quotes empty and special identifiers without snippet interpretation', async () => {
    const schema = dependentReferenceSchema()
    const source = "(`member`: # `chosen`: # `entries`: { '': (`members`: {}) \"a'b\\\\c$1}\": (`members`: {}) })"
    const result = await complete(source, schema, source.indexOf('#', source.indexOf('#') + 1))
    assert.equal(result.items.length, 2)
    assert.equal(result.items[0].textEdit.newText, '""')
    const special = result.items[1]
    assert.equal(special.insertTextFormat, 1)
    const updated = source.slice(0, special.textEdit.range.start.character) + special.textEdit.newText + source.slice(special.textEdit.range.end.character)
    const diagnostics = resolveDiagnostics.Document(await loadWithSchema(updated, schema)).__get_raw()
    assert.deepEqual(diagnostics, [])
})

test('reference completion supports forwarded lookups and offers an empty identifier without candidates', async () => {
    for (const mode of ['internal', 'internal acyclic']) {
        const source = specification(`| \`component\` (\`type\`: | \`${mode}\` # \`results\`: _)`)
        const result = await complete(source, template(), source.indexOf('#'))
        assert.ok(result.items.some(item => item.label === 'Root'))
    }
    for (const invalid of [
        "(`member`: # `chosen`: 'missing' `entries`: #)",
        "(`member`: # `chosen`: 'Known' `entries`: {'Known': (`members`: {})})",
        "(`member`: # `chosen`: 'Known' `entries`: {'Known': (`members`: #)})",
    ]) {
        const result = await complete(invalid, dependentReferenceSchema(), invalid.indexOf('#'))
        assert.deepEqual(result.items.map(item => item.label), ["''"])
        const item = result.items[0]
        assert.equal(item.textEdit.newText, "''")
        assert.equal(item.insertTextFormat, 1)
        assert.equal(item.filterText, '#')
        assert.deepEqual(item.textEdit.range, {
            start: { line: 0, character: invalid.indexOf('#') },
            end: { line: 0, character: invalid.indexOf('#') + 1 },
        })
        const concrete = invalid.replace('#', "'unknown'")
        assert.deepEqual((await complete(concrete, dependentReferenceSchema(), concrete.indexOf("'unknown'") + 2)).items, [])
        assert.match(item.documentation.value, /Reference identifier/)
        assert.match(item.documentation.value, /no reference candidates/)
    }
})

const benchmarkSchema = dense => specification(`| \`group\` {
    'supplied': (\`description\`: _ \`value\`: | \`dictionary\` (\`value\`: | \`nothing\` ~))
    'expected': (\`description\`: _ \`value\`: | \`dictionary\` (\`value\`: | \`nothing\` ~))
}`, `| \`group\` {
    'supplied': (\`definition\`: ~ \`resolver\`: | \`dictionary\` (
        \`definition\`: ~ \`resolver\`: | \`nothing\` ~
        \`benchmark\`: * (
            \`selection\`: (\`start\`: | \`sibling\` 'expected' \`tail\`: (\`path\`: [] \`resulting node\`: ~) \`resulting node\`: ~)
            \`resulting dictionary\`: ~ \`dense\`: ${dense})))
    'expected': (\`definition\`: ~ \`resolver\`: | \`dictionary\` (\`definition\`: ~ \`resolver\`: | \`nothing\` ~ \`benchmark\`: _))
}`)

const argumentBindingSchema = args => {
    const parameter = `(\`type\`: (\`location\`: | \`internal\` 'Leaf' \`resulting type\`: ~) \`presence\`: | \`optional\` ~)`
    const signature = types => `(\`type\`: ~ \`parameters\`: | \`local\` (\`types\`: ${types} \`lookups\`: {}) \`resolved parameters\`: ~)`
    return `(\`schema\`: (
        \`basic types\`: {}
        \`types\`: {
            'Root': (\`root value\`: | \`component\` (\`type\`: | \`internal acyclic\` 'Leaf' \`results\`: _))
            'Leaf': (\`root value\`: | \`nothing\` ~)
        }
        \`signatures\`: {
            'Root': ${signature(`{ 'input': ${parameter} }`)}
            'Leaf': ${signature(`{ 'child': ${parameter} }`)}
        }
        \`resolvers\`: {
            'Root': (\`signature\`: ~ \`root value resolver\`: | \`component\` (
                \`definition\`: ~ \`location\`: | \`internal\` 'Leaf' \`signature\`: ~
                \`arguments\`: ${args} \`constraints\`: {}))
            'Leaf': (\`signature\`: ~ \`root value resolver\`: | \`nothing\` ~)
        }
    ) \`root type\`: 'Root')`
}

test('argument diagnostics accept pass-through boundaries and complete explicit dictionaries', async () => {
    for (const args of [
        '_',
        '* (`types`: _ `lookups`: _)',
        '* (`types`: * { \'child\': | `parameter` \'input\' } `lookups`: * {})',
        '* (`types`: * { \'child\': | `optional` | `not set` ~ } `lookups`: * {})',
    ]) {
        const source = argumentBindingSchema(args)
        assert.doesNotThrow(() => parse(source))
        assert.deepEqual(resolveDiagnostics.Document(await loadWithSchema(source, template())).__get_raw(), [])
    }
})

test('explicit type dictionaries cannot omit even optional callee arguments', async () => {
    const source = argumentBindingSchema('* (`types`: * {} `lookups`: * {})')
    assert.throws(() => parse(source), error => {
        assert.equal(error[0], 'resolving')
        assert.equal(error[1].type[0], 'missing required entries')
        return true
    })
    const diagnostics = resolveDiagnostics.Document(await loadWithSchema(source, template())).__get_raw()
    assert.deepEqual(diagnostics.map(d => d.message), ["Missing required benchmark entry 'child'."])
})

test('runtime type initialization inherits only at whole/category boundaries, never per explicit entry', () => {
    const schema = argumentBindingSchema('* (`types`: * { \'child\': | `parameter` \'input\' } `lookups`: * {})')
        .replace("'Leaf': (`root value`: | `nothing` ~)", "'Leaf': (`root value`: | `optional` | `nothing` ~)")
        .replace("'Leaf': (`signature`: ~ `root value resolver`: | `nothing` ~)",
            "'Leaf': (`signature`: ~ `root value resolver`: | `optional` (`constraints`: { 'present': | `assert is set` | `parameter` 'child' } `resolver`: | `nothing` ~))")
    const resolved = parse(schema)[1].resolver
    const definition = entry(resolved.resolvers, 'Root')['root value resolver']
    const parsed = document('* ~', schema).content
    const seed = nothingValue()
    for (const [args, expected] of [
        [p.literal.not_set(), 'resolved'],
        [p.literal.set({ types: p.literal.not_set(), lookups: p.literal.not_set() }), 'resolved'],
        [p.literal.set({ types: p.literal.set(p.literal.dictionary({})), lookups: p.literal.not_set() }), 'constraint failed'],
        [p.literal.set({ types: p.literal.set(p.literal.dictionary({
            child: ['optional', ['not set', null]],
        })), lookups: p.literal.not_set() }), 'constraint failed'],
    ]) {
        const result = resolver.Value(parsed, {}, {
            definition: ['component', { ...definition[1], arguments: args }],
            resolver: resolved,
            'type parameters': p.literal.dictionary({ child: ['resolved', seed], input: ['resolved', seed] }),
        })
        const component = result['unmarshall result'][1][1]
        assert.equal(component.value['unmarshall result'][0], 'success')
        const status = entry(component.value.constraints, 'present')
        assert.equal(status[0], expected)
        if (expected === 'resolved') assert.equal(status[1], seed)
        else assert.match(status[1], /missing type argument|expected an optional value to be set/)
    }
})

const lookupBindingSchema = (mode, args) => {
    const component = name => `| \`component\` (\`type\`: | \`internal acyclic\` '${name}' \`results\`: _)`
    const call = (name, args = '_') => `| \`component\` (\`definition\`: ~ \`location\`: | \`internal\` '${name}' \`signature\`: ~ \`arguments\`: ${args} \`constraints\`: {})`
    const parameter = `(\`referent\`: (\`location\`: | \`internal\` 'Nodes' \`resulting type\`: ~) \`dictionary\`: ~ \`type\`: | \`${mode}\` ~ \`presence\`: | \`optional\` ~)`
    const signature = (lookups = '{}') => `(\`type\`: ~ \`parameters\`: | \`local\` (\`types\`: {} \`lookups\`: ${lookups}) \`resolved parameters\`: ~)`
    return `(\`schema\`: (
        \`basic types\`: {}
        \`types\`: {
            'Root': (\`root value\`: | \`group\` {
                'entries': (\`description\`: _ \`value\`: ${component('Nodes')})
                'value': (\`description\`: _ \`value\`: ${component('Middle')})
            })
            'Middle': (\`root value\`: ${component('Leaf')})
            'Leaf': (\`root value\`: | \`reference\` (
                \`referent\`: (\`type\`: (\`location\`: | \`internal\` 'Nodes' \`resulting type\`: ~) \`path\`: (\`tail\`: [] \`resulting node\`: ~))
                \`type\`: | \`selected\` (\`dictionary\`: ~ \`dependency\`: | \`${mode}\` ~ \`results\`: _)))
            'Nodes': (\`root value\`: | \`dictionary\` (\`value\`: | \`nothing\` ~))
        }
        \`signatures\`: {
            'Root': ${signature()} 'Nodes': ${signature()}
            'Middle': ${signature(`{ 'source': ${parameter} 'unused': ${parameter} }`)}
            'Leaf': ${signature(`{ 'source': ${parameter} 'unused': ${parameter} }`)}
        }
        \`resolvers\`: {
            'Root': (\`signature\`: ~ \`root value resolver\`: | \`group\` {
                'entries': (\`definition\`: ~ \`resolver\`: ${call('Nodes')})
                'value': (\`definition\`: ~ \`resolver\`: ${call('Middle', `* (\`types\`: * {} \`lookups\`: * {
                    'source': | \`selection\` (\`type\`: | \`acyclic\` | \`resolved dictionary\` (
                        \`selection\`: (\`start\`: | \`sibling\` 'entries' \`tail\`: (\`path\`: [| \`component\` ~] \`resulting node\`: ~) \`resulting node\`: ~)
                        \`selected dictionary\`: ~) \`resulting dictionary\`: ~)
                    'unused': | \`${mode}\` | \`not set\` ~
                })`)})
            })
            'Middle': (\`signature\`: ~ \`root value resolver\`: ${call('Leaf', args)})
            'Leaf': (\`signature\`: ~ \`root value resolver\`: | \`reference\` (\`definition\`: ~
                \`type\`: | \`selected\` (\`definition\`: ~ \`lookup\`: (\`type\`: | \`parameter\` 'source' \`resulting dictionary\`: ~) \`constraints\`: {})))
            'Nodes': (\`signature\`: ~ \`root value resolver\`: | \`dictionary\` (\`definition\`: ~ \`benchmark\`: _ \`resolver\`: | \`nothing\` ~))
        }
    ) \`root type\`: 'Root')`
}

test('lookup arguments pass through only at category boundaries and explicit dictionaries are dense', async () => {
    for (const mode of ['acyclic', 'cyclic']) {
        for (const args of ['_', '* (`types`: _ `lookups`: _)',
            '* (`types`: * {} `lookups`: * { \'source\': | `selection` (`type`: | `parameter` \'source\' `resulting dictionary`: ~) \'unused\': | `' + mode + '` | `not set` ~ })']) {
            const schema = lookupBindingSchema(mode, args)
            assert.doesNotThrow(() => parse(schema))
            const source = "(`entries`: {'Known': ~} `value`: 'Known')"
            assert.deepEqual(resolveDiagnostics.Document(await loadWithSchema(source, schema)).__get_raw(), [], `${mode}: ${args}`)
            assert.deepEqual(resolveDiagnostics.Document(await loadWithSchema(
                source.replace("`value`: 'Known'", "`value`: 'Missing'"), schema,
            )).__get_raw().map(d => d.message), ["Reference 'Missing' does not exist."], `${mode}: ${args}`)
        }
        const notSet = lookupBindingSchema(mode, `* (\`types\`: _ \`lookups\`: * {
            'source': | \`${mode}\` | \`not set\` ~ 'unused': | \`${mode}\` | \`not set\` ~
        })`)
        assert.deepEqual(resolveDiagnostics.Document(await loadWithSchema(
            "(`entries`: {'Known': ~} `value`: 'Missing')", notSet,
        )).__get_raw(), [])
        for (const [args, missing] of [
            ['* (`types`: _ `lookups`: * {})', ['source', 'unused']],
            [`* (\`types\`: _ \`lookups\`: * { 'source': | \`${mode}\` | \`not set\` ~ })`, ['unused']],
        ]) {
            const invalid = lookupBindingSchema(mode, args)
            assert.throws(() => parse(invalid), error => error[0] === 'resolving' && error[1].type[0] === 'missing required entries')
            assert.deepEqual(resolveDiagnostics.Document(await loadWithSchema(invalid, template())).__get_raw().map(d => d.message).sort(),
                missing.map(id => `Missing required benchmark entry '${id}'.`))
        }
        const schema = lookupBindingSchema(mode, '_')
        const resolved = parse(schema)[1].resolver
        const middle = entry(resolved.resolvers, 'Middle')
        const modified = { ...resolved, resolvers: p.from.dictionary(resolved.resolvers).map((value, id) =>
            id !== 'Middle' ? value : { ...middle, 'root value resolver': ['component', {
                ...middle['root value resolver'][1],
                arguments: p.literal.set({ types: p.literal.not_set(), lookups: p.literal.set(p.literal.dictionary({})) }),
            }] }),
        }
        const source = "(`entries`: {'Known': ~} `value`: 'Known')"
        const content = resolver.Value(document(source, schema).content, {}, {
            definition: entry(modified.resolvers, 'Root')['root value resolver'],
            resolver: modified, 'type parameters': p.literal.dictionary({}),
        })
        const outer = entry(content['unmarshall result'][1][1].properties, 'value')['unmarshall result'][1].resolved
        const middleValue = outer['unmarshall result'][1][1].value
        const leaf = middleValue['unmarshall result'][1][1].value
        assert.deepEqual(leaf['unmarshall result'][1][1][1]['resolve status'],
            ['selected', ['constraint failed', "missing lookup argument 'source' in explicit arguments"]])
    }
})

test('argument keys and parameter references are independently checked against callee and caller signatures', async () => {
    for (const [key, reference] of [['child', 'wrong-input'], ['wrong-child', 'input'], ['wrong-child', 'wrong-input']]) {
        const source = argumentBindingSchema(`* (\`types\`: * { '${key}': | \`parameter\` '${reference}' } \`lookups\`: * {})`)
        assert.throws(() => parse(source))
        const diagnostics = resolveDiagnostics.Document(await loadWithSchema(source, template())).__get_raw()
        const expected = []
        if (key !== 'child') expected.push(`Entry '${key}' does not exist in the benchmark dictionary.`, "Missing required benchmark entry 'child'.")
        if (reference !== 'input') expected.push(`Reference '${reference}' does not exist.`)
        assert.deepEqual(diagnostics.map(d => d.message).sort(), expected.sort())
        for (const diagnostic of diagnostics) {
            if (diagnostic.message.startsWith('Missing required')) continue
            const range = diagnostic.range.__get_raw()[0][1]
            const id = diagnostic.message.startsWith('Entry') ? key : reference
            assert.equal(source.slice(range.start.absolute, range.end.absolute), `'${id}'`)
        }
    }
})

test('sparse benchmarks validate supplied keys without requiring complete coverage', async () => {
    const schema = benchmarkSchema(false)
    for (const source of [
        '< {} { \'a\': ~ \'b\': ~ } >',
        '< { \'a\': ~ } { \'a\': ~ \'b\': ~ } >',
        '< { \'\': ~ } { \'\': ~ } >',
    ]) assert.deepEqual(resolveDiagnostics.Document(await loadWithSchema(source, schema)).__get_raw(), [])

    const source = '< { \'typo\': ~ } { \'a\': ~ } >'
    const diagnostics = resolveDiagnostics.Document(await loadWithSchema(source, schema)).__get_raw()
    assert.equal(diagnostics.length, 1)
    assert.equal(diagnostics[0].message, "Entry 'typo' does not exist in the benchmark dictionary.")
    assert.equal(diagnostics[0].severity[0], 'error')
    const range = diagnostics[0].range.__get_raw()[0][1]
    assert.equal(range.start.absolute, source.indexOf("'typo'"))
    assert.equal(range.end.absolute, source.indexOf("'typo'") + "'typo'".length)
})

test('dense benchmarks require complete coverage and report both sides of a renamed key', async () => {
    const schema = benchmarkSchema(true)
    for (const source of ['< {} {} >', '< { \'a\': ~ } { \'a\': ~ } >']) {
        assert.deepEqual(resolveDiagnostics.Document(await loadWithSchema(source, schema)).__get_raw(), [])
    }
    const source = '< { \'typo\': ~ } { \'a\': ~ \'b\': ~ } >'
    const diagnostics = resolveDiagnostics.Document(await loadWithSchema(source, schema)).__get_raw()
    assert.deepEqual(diagnostics.map(d => d.message).sort(), [
        "Entry 'typo' does not exist in the benchmark dictionary.",
        "Missing required benchmark entry 'a'.",
        "Missing required benchmark entry 'b'.",
    ])
    for (const diagnostic of diagnostics.filter(d => d.message.startsWith('Missing'))) {
        const range = diagnostic.range.__get_raw()[0][1]
        assert.equal(source.slice(range.start.absolute, range.end.absolute), "{ 'typo': ~ }")
    }
})

test('invalid benchmark inputs suppress coverage cascades and malformed entries retain their own errors', async () => {
    for (const dense of [false, true]) {
        const schema = benchmarkSchema(dense)
        for (const source of [
            '< { \'typo\': ~ } # >',
            '< # { \'a\': ~ } >',
            '< { \'a\': ~ \'a\': ~ } { \'a\': ~ } >',
            '< {} { \'a\': ~ \'a\': ~ } >',
            '< { \'a\': # } { \'a\': ~ } >',
        ]) assert.deepEqual(resolveDiagnostics.Document(await loadWithSchema(source, schema)).__get_raw(), [])
    }
})

test('renaming a self-schema resolver reports the unexpected implementation and missing dense entry', async () => {
    const source = template()
    const at = source.lastIndexOf("'Resolver Types':")
    assert.ok(at > source.indexOf('`resolvers`:'))
    const renamed = source.slice(0, at) + source.slice(at).replace("'Resolver Types':", "'Resolver Tydpes':")
    const diagnostics = resolveDiagnostics.Document(await loadWithSchema(renamed, source)).__get_raw()
    assert.deepEqual(diagnostics.map(d => d.message).sort(), [
        "Entry 'Resolver Tydpes' does not exist in the benchmark dictionary.",
        "Missing required benchmark entry 'Resolver Types'.",
    ])
    const unexpected = diagnostics.find(d => d.message.startsWith('Entry'))
    const range = unexpected.range.__get_raw()[0][1]
    assert.equal(renamed.slice(range.start.absolute, range.end.absolute), "'Resolver Tydpes'")
    assert.throws(() => parse(renamed))
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

test('state completion marks failed entry constraints without removing selectable options', async () => {
    for (const [value, valid] of [['| `nothing` ~', 'nothing'], ['| `optional` | `nothing` ~', 'optional']]) {
        const source = specification(value, '| #')
        const result = await complete(source, template(), source.indexOf('#'))
        const allowed = result.items.find(item => item.label === valid)
        assert.ok(allowed)
        assert.equal(allowed.tags, undefined)
        assert.ok(result.items.length > 1)
        for (const item of result.items.filter(item => item.label !== valid)) {
            assert.deepEqual(item.tags, [1])
            assert.match(item.documentation.value, /Unavailable in this context: definition: expected state option/)
            assert.ok(item.textEdit.newText.length > 0)
        }
        const updated = source.replace('#', snippetText(allowed.textEdit.newText))
        assert.deepEqual(resolveDiagnostics.Document(await loadWithSchema(updated, template())).__get_raw(), [])
    }
    const incomplete = specification('#', '| #')
    const unresolved = await complete(incomplete, template(), incomplete.lastIndexOf('#'))
    assert.ok(unresolved.items.length > 1)
    assert.ok(unresolved.items.every(item => item.tags === undefined))
})

test('state completion reuses presence and state checks but leaves unknown constraints unmarked', () => {
    const schema = specification(stateValueType, stateResolverText)
    const unmarshalled = document('| #', schema)
    const gate = resolveState('| `left` ~', stateDefinition())
    for (const [input, marked] of [
        [['not set', null], true],
        [['resolved', gate], false],
        [['unavailable', null], false],
        [['cycle', p.literal.list(['input'])], false],
    ]) {
        const definition = stateDefinition(p.literal.not_set(), undefined, id => id === 'left'
            ? p.literal.dictionary({ present: ['assert is set', ['parameter', { 'l id': 'input' }]] })
            : p.literal.dictionary({ gate: ['state', {
                selection: guaranteed(['parameter', { 'l id': 'gate' }]), option: { 'l id': 'right' },
            }] }))
        const content = resolver.Value(unmarshalled.content, {}, {
            definition, 'type parameters': p.literal.dictionary({ input, gate: ['resolved', gate] }),
        })
        const result = completion.Document({ unmarshalled, content }, {
            position: { line: 0, character: 2 }, indent: '    ', style: ['verbose', null],
        }).__get_raw()[0]
        const items = result.suggestions.__get_raw()
        assert.deepEqual(items.map(item => item.label), ['left', 'right'])
        assert.equal(items[0]['invalid reason'] !== undefined, marked)
        if (marked) assert.match(items[0]['invalid reason'], /present: expected an optional value to be set/)
        assert.match(items[1]['invalid reason'], /gate: expected state option 'right'/)
        assert.deepEqual(resolveDiagnostics.Document({ content }).__get_raw(), [])
    }
})

test('optional value constraints require optional nodes, matching the handwritten resolver', async () => {
    const constraint = `\`constraints\`: {
        'present': (\`start\`: | \`value\` ~ \`constraint\`: (
            \`selection\`: (\`path\`: [] \`resulting node\`: ~)
            \`type\`: | \`optional value\` (\`selected optional value\`: ~)))
    }`
    const invalid = argumentBindingSchema('_').replace('`constraints`: {}', constraint)
    const valid = invalid
        .replace("'Leaf': (`root value`: | `nothing` ~)", "'Leaf': (`root value`: | `optional` | `nothing` ~)")
        .replace("'Leaf': (`signature`: ~ `root value resolver`: | `nothing` ~)",
            "'Leaf': (`signature`: ~ `root value resolver`: | `optional` (`constraints`: {} `resolver`: | `nothing` ~))")
    assert.doesNotThrow(() => parse(valid))
    assert.deepEqual(resolveDiagnostics.Document(await loadWithSchema(valid, template())).__get_raw(), [])
    assert.throws(() => parse(invalid))
    const diagnostics = resolveDiagnostics.Document(await loadWithSchema(invalid, template())).__get_raw()
    assert.ok(diagnostics.length > 0)
    assert.ok(diagnostics.every(d => d.message === "Constraint failed: expected state option 'optional'."), JSON.stringify(diagnostics.map(d => d.message)))
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

const { create_on_code_action } = require('../server/out/connection/on_code_action.js')
const { create_on_code_action_resolve } = require('../server/out/connection/on_code_action_resolve.js')
const actionsAt = (source, schema, offset, only) => {
    const position = TextDocument.create('file:///action.lna', 'liana', 1, source).positionAt(offset)
    return requestAt(source, schema, offset, create_on_code_action, {
        range: { start: position, end: position },
        context: { diagnostics: [], ...(only === undefined ? {} : { only }) },
    })
}

test('one quick fix inserts every missing dense entry without rewriting supplied entries or comments', async () => {
    const source = '< { \'kept\': ~ /* keep this */ } { \'kept\': ~ \'new\': ~ "a\\\"b": ~ } >'
    const actions = await actionsAt(source, benchmarkSchema(true), source.indexOf('{'), ['quickfix'])
    assert.equal(actions.length, 1)
    assert.equal(actions[0].title, 'Add all missing required entries (2)')
    assert.equal(actions[0].isPreferred, true)
    const change = actions[0].edit.documentChanges[0]
    assert.equal(change.textDocument.version, 1)
    const doc = TextDocument.create(change.textDocument.uri, 'liana', 1, source)
    const updated = TextDocument.applyEdits(doc, change.edits)
    assert.ok(updated.includes("'kept': ~ /* keep this */"))
    assert.ok(updated.includes("'new': ~"))
    assert.ok(updated.includes("'a\"b': ~"))
    assert.deepEqual(resolveDiagnostics.Document(await loadWithSchema(updated, benchmarkSchema(true))).__get_raw(), [])
    assert.deepEqual(await create_on_code_action_resolve({})(actions[0]), actions[0])
    assert.deepEqual(await actionsAt(updated, benchmarkSchema(true), updated.indexOf('{'), ['quickfix']), [])
    assert.equal((await actionsAt(source, benchmarkSchema(true), source.indexOf('{'), ['refactor'])).length, 4)
})

test('missing-entry fixes ignore sparse, unavailable, and duplicate benchmark keys', async () => {
    for (const [source, schema] of [
        ['< {} { \'a\': ~ } >', benchmarkSchema(false)],
        ['< {} # >', benchmarkSchema(true)],
        ['< {} { \'a\': ~ \'a\': ~ } >', benchmarkSchema(true)],
    ]) assert.deepEqual(await actionsAt(source, schema, source.indexOf('{'), ['quickfix']), [])
})

test('generated completion snippets select the only constraint-eligible state option', async () => {
    const source = specification('| `nothing` ~', '#')
    const result = await complete(source, template(), source.indexOf('#'))
    assert.equal(result.items.length, 1)
    assert.equal(result.items[0].textEdit.newText, '$0| `nothing` ~')
    const unknown = specification('#', '#')
    const unresolved = await complete(unknown, template(), unknown.lastIndexOf('#'))
    assert.equal(unresolved.items[0].textEdit.newText, '$0| #')
    const ambiguous = await complete('#', specification(stateValueType, stateResolverText), 0)
    assert.equal(ambiguous.items[0].textEdit.newText, '$0| #')
    const singleton = specification(
        '| `state` (`options`: { \'only\': (`description`: _ `constraints`: _ `value`: | `nothing` ~) } `results`: _)',
        '| `state` (`definition`: ~ `result`: _ `options`: { \'only\': (`constraints`: {} `resolver`: | `nothing` ~ `result`: _) })')
    assert.equal((await complete('#', singleton, 0)).items[0].textEdit.newText, '$0| `only` ~')
})

test('bulk resolver-entry fixes generate constraint-aware state choices', async () => {
    const source = specification().replace("'Root': (`signature`: ~ `root value resolver`: | `nothing` ~)", '')
    const offset = source.indexOf('`resolvers`: {') + '`resolvers`: '.length
    const actions = await actionsAt(source, template(), offset, ['quickfix'])
    assert.equal(actions.length, 1)
    const change = actions[0].edit.documentChanges[0]
    const updated = TextDocument.applyEdits(TextDocument.create(change.textDocument.uri, 'liana', 1, source), change.edits)
    assert.match(updated, /`root value resolver`: \| `nothing` ~/)
    assert.deepEqual(resolveDiagnostics.Document(await loadWithSchema(updated, template())).__get_raw(), [])
})

test('bulk fixes preserve multiline closing indentation and empty identifiers', async () => {
    const source = '(\n    `supplied`: {\n        // keep this\n    }\n    `expected`: { \'\': ~ \'a\': ~ }\n)'
    const actions = await actionsAt(source, benchmarkSchema(true), source.indexOf('{'), ['quickfix'])
    const change = actions[0].edit.documentChanges[0]
    const updated = TextDocument.applyEdits(TextDocument.create(change.textDocument.uri, 'liana', 1, source), change.edits)
    assert.ok(updated.includes("        // keep this\n        '': ~\n        'a': ~\n    }"))
    assert.deepEqual(resolveDiagnostics.Document(await loadWithSchema(updated, benchmarkSchema(true))).__get_raw(), [])
})

test('recursive singleton states stop at a placeholder instead of expanding forever', async () => {
    const schema = specification(
        '| `state` (`options`: { \'next\': (`description`: _ `constraints`: _ `value`: | `component` (`type`: | `internal` \'Root\' `results`: _)) } `results`: _)',
        '| `state` (`definition`: ~ `result`: _ `options`: { \'next\': (`constraints`: {} `resolver`: | `component` (`definition`: ~ `location`: | `internal` \'Root\' `signature`: ~ `arguments`: _ `constraints`: {}) `result`: _) })')
    const result = await complete('#', schema, 0)
    assert.equal(result.items[0].textEdit.newText, '$0| `next` | #')
})

test('completion fills dense benchmark dictionaries and leaves sparse or unavailable ones empty', async () => {
    for (const [dense, expected, names] of [
        [true, "{ 'a': ~ 'b': ~ }", ['a', 'b']],
        [false, "{ 'a': ~ 'b': ~ }", []],
        [true, '#', []],
    ]) {
        const source = `< # ${expected} >`
        const result = await complete(source, benchmarkSchema(dense), source.indexOf('#'))
        assert.equal(result.items.length, 1)
        const edit = result.items[0].textEdit
        const updated = TextDocument.applyEdits(TextDocument.create('file:///dense.lna', 'liana', 1, source),
            [{ ...edit, newText: snippetText(edit.newText) }])
        const loaded = await loadWithSchema(updated, benchmarkSchema(dense))
        const supplied = loaded.content['unmarshall result'][1][1].properties.__get_raw().find(([id]) => id === 'supplied')[1]['unmarshall result'][1].resolved
        assert.deepEqual(supplied['unmarshall result'][1][1].entries.__get_raw().map(([id]) => id), names)
        assert.ok(!resolveDiagnostics.Document(loaded).__get_raw().some(d => d.message.startsWith('Missing required benchmark entry')))
    }
})

test('completion recursively fills dense resolver dictionaries and chooses their constrained states', async () => {
    const source = specification('| `group` { \'left\': (`description`: _ `value`: | `nothing` ~) \'right\': (`description`: _ `value`: | `nothing` ~) }', '#')
    const result = await complete(source, template(), source.indexOf('#'))
    const edit = result.items[0].textEdit
    const updated = TextDocument.applyEdits(TextDocument.create('file:///nested.lna', 'liana', 1, source),
        [{ ...edit, newText: snippetText(edit.newText) }])
    assert.match(updated, /'left':/)
    assert.match(updated, /'right':/)
    assert.deepEqual(resolveDiagnostics.Document(await loadWithSchema(updated, template())).__get_raw(), [])
})

test('one quick fix handles missing signatures and resolvers together', async () => {
    const source = specification()
        .replace("'Root': (`type`: ~ `parameters`: | `local` (`types`: {} `lookups`: {}) `resolved parameters`: ~)", '')
        .replace("'Root': (`signature`: ~ `root value resolver`: | `nothing` ~)", '')
    const offset = source.indexOf('`signatures`: {') + '`signatures`: '.length
    const actions = await actionsAt(source, template(), offset, ['quickfix'])
    assert.equal(actions.length, 1)
    assert.equal(actions[0].edit.documentChanges[0].edits.length, 2)
    const change = actions[0].edit.documentChanges[0]
    const updated = TextDocument.applyEdits(TextDocument.create(change.textDocument.uri, 'liana', 1, source), change.edits)
    assert.deepEqual(resolveDiagnostics.Document(await loadWithSchema(updated, template())).__get_raw(), [])
})

test('dense completion honors concise notation for generated entry payloads', async () => {
    const source = specification('| `group` { \'left\': (`description`: _ `value`: | `nothing` ~) }', '#')
    const result = await requestAt(source, template(), source.indexOf('#'), context => create_on_completion({
        ...context, 'document notation styles': new Map([['__default__', 'concise']]),
    }))
    const edit = result.items[0].textEdit
    const updated = TextDocument.applyEdits(TextDocument.create('file:///concise.lna', 'liana', 1, source),
        [{ ...edit, newText: snippetText(edit.newText) }])
    assert.match(edit.newText, /'left': </)
    assert.deepEqual(resolveDiagnostics.Document(await loadWithSchema(updated, template())).__get_raw(), [])
})

test('generated dense dictionary identifiers remain literal snippet text', async () => {
    const id = 'a$1}\\b'
    const source = `< # { ${JSON.stringify(id)}: ~ } >`
    const result = await complete(source, benchmarkSchema(true), source.indexOf('#'))
    const edit = result.items[0].textEdit
    assert.ok(edit.newText.includes('\\$1\\}'))
    const updated = TextDocument.applyEdits(TextDocument.create('file:///escaped.lna', 'liana', 1, source),
        [{ ...edit, newText: snippetText(edit.newText) }])
    assert.ok(updated.includes(quote_identifier(id) + ': ~'))
    assert.deepEqual(resolveDiagnostics.Document(await loadWithSchema(updated, benchmarkSchema(true))).__get_raw(), [])
})

test('missing reference quick fix creates the entry in the selected dependent dictionary', async () => {
    const schema = dependentReferenceSchema()
    for (const id of ['foo', '', 'a$1}\\b', 'a"b', "a'b", 'a\nb\r\tc']) {
        const source = `(\`member\`: ${JSON.stringify(id)} \`chosen\`: 'Known' \`entries\`: {'Known': (\`members\`: {/* keep */}) 'Other': (\`members\`: {})})`
        const offset = source.indexOf(JSON.stringify(id)) + 1
        const actions = await actionsAt(source, schema, offset, ['quickfix'])
        assert.equal(actions.length, 1)
        assert.equal(actions[0].title, `Create entry '${id}' in referenced dictionary`)
        assert.equal(actions[0].diagnostics[0].message, `Reference '${id}' does not exist.`)
        const change = actions[0].edit.documentChanges[0]
        assert.equal(change.textDocument.version, 1)
        const updated = TextDocument.applyEdits(TextDocument.create(change.textDocument.uri, 'liana', 1, source), change.edits)
        assert.ok(updated.includes('/* keep */'))
        assert.ok(updated.includes(`${quote_identifier(id)}: ~`))
        assert.ok(updated.includes("'Other': (`members`: {})"))
        assert.deepEqual(resolveDiagnostics.Document(await loadWithSchema(updated, schema)).__get_raw(), [])
        assert.deepEqual(await actionsAt(updated, schema, offset, ['quickfix']), [])
    }
})

test('missing reference fixes follow acyclic and cyclic sibling lookups forwarded through components', async () => {
    for (const mode of ['internal', 'internal acyclic']) {
        const source = specification(typeReference('Missing', mode))
        const actions = await actionsAt(source, template(), source.indexOf("'Missing'") + 2, ['quickfix'])
        assert.equal(actions.length, 1)
        const change = actions[0].edit.documentChanges[0]
        const updated = TextDocument.applyEdits(TextDocument.create(change.textDocument.uri, 'liana', 1, source), change.edits)
        assert.match(updated, /'Missing':/)
        assert.ok(!resolveDiagnostics.Document(await loadWithSchema(updated, template())).__get_raw()
            .some(diagnostic => diagnostic.message === "Reference 'Missing' does not exist."))
    }
})

test('missing reference fixes do not guess unavailable targets or overwrite duplicate/existing entries', async () => {
    for (const source of [
        "(`member`: 'foo' `chosen`: # `entries`: {})",
        "(`member`: 'foo' `chosen`: 'Known' `entries`: {'Known': (`members`: #)})",
        "(`member`: 'foo' `chosen`: 'Known' `entries`: {'Known': (`members`: {'foo': ~ 'foo': ~})})",
        "(`member`: 'foo' `chosen`: 'Known' `entries`: {'Known': (`members`: {'foo': ~})})",
    ]) assert.deepEqual(await actionsAt(source, dependentReferenceSchema(), source.indexOf("'foo'") + 2, ['quickfix']), [])
})

test('unexpected constrained dictionary entries can be added to their sparse or dense benchmark', async () => {
    for (const dense of [false, true]) {
        for (const id of ['foo', '', "a'b\\c$1}", 'a\nb\r\tc']) {
            const source = `< { ${JSON.stringify(id)}: ~ 'kept': ~ } { 'kept': ~ /* benchmark comment */ } >`
            const offset = source.indexOf(JSON.stringify(id)) + 1
            const actions = await actionsAt(source, benchmarkSchema(dense), offset, ['quickfix'])
            assert.equal(actions.length, 1)
            assert.equal(actions[0].title, `Add entry '${id}' to benchmark dictionary`)
            assert.equal(actions[0].diagnostics[0].message, `Entry '${id}' does not exist in the benchmark dictionary.`)
            const change = actions[0].edit.documentChanges[0]
            assert.equal(change.textDocument.version, 1)
            const doc = TextDocument.create(change.textDocument.uri, 'liana', 1, source)
            const updated = TextDocument.applyEdits(doc, change.edits)
            assert.equal(updated.slice(0, source.indexOf('}')), source.slice(0, source.indexOf('}')))
            assert.ok(updated.includes("'kept': ~ /* benchmark comment */"))
            assert.ok(change.edits[0].newText.includes(quote_identifier(id) + ': ~'))
            assert.deepEqual(resolveDiagnostics.Document(await loadWithSchema(updated, benchmarkSchema(dense))).__get_raw(), [])
            assert.deepEqual(await actionsAt(updated, benchmarkSchema(dense), offset, ['quickfix']), [])
        }
    }
})

test('benchmark creation fixes require an unexpected nonduplicate key and an available target', async () => {
    for (const source of [
        "< { 'foo': ~ } # >",
        "< { 'foo': ~ } { 'foo': ~ } >",
        "< { 'foo': ~ 'foo': ~ } {} >",
        "< { 'foo': ~ } { 'foo': ~ 'foo': ~ } >",
    ]) {
        const actions = await actionsAt(source, benchmarkSchema(false), source.indexOf("'foo'") + 2, ['quickfix'])
        assert.deepEqual(actions, [])
    }
    const source = "< { 'foo': ~ } {} >"
    assert.deepEqual(await actionsAt(source, benchmarkSchema(false), source.lastIndexOf('}'), ['quickfix']), [])
    assert.equal((await actionsAt(source, benchmarkSchema(false), source.indexOf("'foo'") + 2, ['refactor'])).length, 4)
})

test('generated dictionary identifiers always use escaped single quotes', () => {
    for (const [id, expected] of [
        ['foo', "'foo'"], ['', "''"], ["a'b", "'a\\'b'"], ['a"b', "'a\"b'"],
        ['a\\b', "'a\\\\b'"], ['a\nb\r\tc', "'a\\nb\\r\\tc'"],
    ]) assert.equal(quote_identifier(id), expected)
})
