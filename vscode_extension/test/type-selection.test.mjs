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
const { file_type } = require('pareto-liana/schemas/temp_type_specifier/file_type')
const { Type_Specifier } = require('pareto-liana/schemas/temp_type_specifier/refiners/list_of_characters')
const unmarshall = require('liana-authoring/schemas/unmarshall_result/refiners/list_of_characters')
const skeleton = require('liana-authoring/schemas/liana_schema/transformers/authoring_target')
const links = require('liana-authoring/schemas/unmarshall_result/transformers/document_links')
const resolveDiagnostics = require('liana-authoring/schemas/resolve_result/transformers/diagnostics')
const resolveErrors = require('liana-authoring/schemas/resolve_result/transformers/resolve_errors')
const resolver = require('liana-authoring/schemas/unmarshall_result/transformers/resolve_result')
const { $$: seal } = require('../client/out/helpers/seal.js')
const { create_cache } = require('../server/out/core/cache.js')
const { create_on_completion } = require('../server/out/connection/on_completion.js')
const { create_on_hover } = require('../server/out/connection/on_hover.js')
const { create_on_definition } = require('../server/out/connection/on_definition.js')
const { create_on_references } = require('../server/out/connection/on_references.js')
const { create_on_document_highlight } = require('../server/out/connection/on_document_highlight.js')
const { create_on_prepare_rename, create_on_rename } = require('../server/out/connection/on_rename.js')
const { create_on_initialize } = require('../server/out/connection/on_initialize.js')
const completion = require('liana-authoring/schemas/resolve_result/transformers/completion_suggestions')
const unmarshalCompletion = require('liana-authoring/schemas/unmarshall_result/transformers/completion_suggestions')
const unmarshal_diagnostics = require('liana-authoring/schemas/unmarshall_result/transformers/diagnostics')
const found = require('liana-authoring/schemas/unmarshall_result/transformers/found')
const authoring_target = require('liana-authoring/schemas/unmarshall_result/transformers/authoring_target')
const { matches_token } = require('liana-authoring/schemas/liana_schema/token_pattern')
const p = require('pareto-core/transformer')

const chars = source => p.literal.list(Array.from(source, c => c.codePointAt(0)))
const snippetText = text => text.replace(/^\$0/, '').replace(/\\([\\$}])/g, '$1')
const { quote_identifier } = require('../server/out/helpers/quote_identifier.js')
const fail = error => { throw error }
const parse = source => Type_Specifier(chars(source), fail, { 'tab size': 4 })
const signature = (values = '{}', lookups = '{}') =>
    `(\`signature\`: | \`local\` (\`values\`: ${values} \`lookups\`: ${lookups}))`
const signature_value = (type, presence = 'required', tail = '[]') =>
    `(\`value\`: (\`type\`: (\`location\`: | \`local\` '${type}') \`subselection\`: (\`tail\`: ${tail})) \`presence\`: | \`${presence}\` ~)`
const signature_lookup = (type, mode, presence = 'required') =>
    `(\`referent\`: (\`type\`: (\`location\`: | \`local\` '${type}') \`subselection\`: (\`tail\`: [])) \`type\`: | \`${mode}\` ~ \`presence\`: | \`${presence}\` ~)`
const basic = (type, resolver = '| `simple` ~', expression = '_') => specification(`| \`simple\` 'Basic'`, resolver, `{ 'Basic': (\`type\`: ${type} \`regular expression\`: ${expression} \`hyperlink\`: _) }`)
const specification = (value = '| `nothing` ~', resolver = '| `nothing` ~', basicTypes = '{}', root = 'Root') =>
    `(\`schema\`: (\`structure\`: (\`namespaces\`: {} \`basic types\`: ${basicTypes}
        \`types\`: { 'Root': (\`visibility\`: | \`public\` ~ \`root value\`: ${value}) }
        ) \`resolver\`: (\`declarations\`: (\`namespaces\`: {} \`types\`: { 'Root': ${signature()} }) \`implementations\`: (\`namespaces\`: {} \`types\`: { 'Root': (\`root value resolver\`: ${resolver}) })
    )) \`directory\`: | \`dictionary\` (\`node\`: | \`file\` (\`file extension\`: "" \`type\`: '${root}')))`
const selectedType = specification => file_type(specification, { directories: p.literal.list([]), 'file name': 'document.liana.lna' }, fail)
const rootType = source => selectedType(parse(source)[1])['l entry']
const document = (source, schema) => unmarshall.Document(chars(source), fail, {
    type: rootType(schema), 'tab size': 4,
})
const sealed = (source, schema) => seal(source, fail, {
    unmarshall: { type: rootType(schema), 'tab size': 4 },
    target: { indentation: '', newline: '' },
}).__get_raw().join('')
const entry = (dictionary, name) => p.from.dictionary(dictionary).get_possible_entry(name, value => value, () => assert.fail(name))
const componentKind = mode => mode === 'local cyclic' ? 'cyclic' : 'simple'

const loadWithSchema = async (source, schema) => {
    const dir = mkdtempSync(join(tmpdir(), 'liana-server-references-'))
    try {
        mkdirSync(join(dir, '.liana'))
        writeFileSync(join(dir, '.liana', 'schema.slna'), schema)
        const result = await new Promise(resolve => load_document(
            TextDocument.create(pathToFileURL(join(dir, 'document.liana.lna')).href, 'liana', 1, source),
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
        const doc = TextDocument.create(pathToFileURL(join(dir, 'document.liana.lna')).href, 'liana', 1, source)
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
const hoverAt = (source, schema, offset) => requestAt(source, schema, offset, create_on_hover)
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
    assert.match(result.items[0].textEdit.newText, /`directory`:/)
    assert.equal(result.items[0].textEdit.range.end.character, 1)
})

test('hover on not-set optional value shows the property description in verbose notation', async () => {
    const schema = specification(`| \`group\` {
        'maybe': (\`description\`: * "set this only when an override is needed" \`value\`: | \`optional\` (\`constraints\`: _ \`value\`: | \`nothing\` ~ \`result\`: _))
    }`, `| \`group\` {
        'maybe': (\`resolver\`: | \`optional\` (\`presence\`: _ \`constraints\`: _ \`checks\`: _ \`not set constraints\`: _ \`resolver\`: | \`nothing\` ~ \`result\`: _))
    }`)
    const source = "(`maybe`: _)"
    const hover = await hoverAt(source, schema, source.indexOf('_'))
    assert.ok(hover)
    assert.ok(Array.isArray(hover.contents))
    assert.equal(hover.contents[0], 'maybe')
    assert.equal(hover.contents[1], 'set this only when an override is needed')
    assert.equal(hover.contents[2], 'not set optional')
    const unmarshalled = document(source, schema)
    const selected = found.Document(unmarshalled, { position: { line: 0, character: source.indexOf('_') } })
    const original = entry(unmarshalled.content['unmarshall result'][1][1].derived.properties, 'maybe').result[1]
    assert.equal(selected[0], 'value')
    assert.equal(selected[1], original, 'hover metadata must preserve the value identity used by completion')
    const property_hover = await hoverAt(source, schema, source.indexOf('maybe'))
    assert.deepEqual(property_hover.contents, ['maybe', 'set this only when an override is needed'])
})

test('hover on not-set optional value shows the property description in concise notation', async () => {
    const schema = specification(`| \`group\` {
        'maybe': (\`description\`: * "concise optional description" \`value\`: | \`optional\` (\`constraints\`: _ \`value\`: | \`nothing\` ~ \`result\`: _))
    }`, `| \`group\` {
        'maybe': (\`resolver\`: | \`optional\` (\`presence\`: _ \`constraints\`: _ \`checks\`: _ \`not set constraints\`: _ \`resolver\`: | \`nothing\` ~ \`result\`: _))
    }`)
    const source = "< _ >"
    const hover = await hoverAt(source, schema, source.indexOf('_'))
    assert.ok(hover)
    assert.ok(Array.isArray(hover.contents))
    assert.equal(hover.contents[0], 'maybe')
    assert.equal(hover.contents[1], 'concise optional description')
    assert.equal(hover.contents[2], 'not set optional')
})

test('optional markers show their property description without leaking it into nested values', async () => {
    const schema = specification(`| \`group\` {
        'maybe': (\`description\`: * "outer optional" \`value\`: | \`optional\` (\`constraints\`: _ \`value\`: | \`group\` {
            'inner': (\`description\`: * "inner optional" \`value\`: | \`optional\` (\`constraints\`: _ \`value\`: | \`nothing\` ~ \`result\`: _))
            'plain': (\`description\`: _ \`value\`: | \`optional\` (\`constraints\`: _ \`value\`: | \`nothing\` ~ \`result\`: _))
        } \`result\`: _))
    }`, `| \`group\` {
        'maybe': (\`resolver\`: | \`optional\` (\`presence\`: _ \`constraints\`: _ \`checks\`: _ \`not set constraints\`: _ \`resolver\`: | \`group\` {
            'inner': (\`resolver\`: | \`optional\` (\`presence\`: _ \`constraints\`: _ \`checks\`: _ \`not set constraints\`: _ \`resolver\`: | \`nothing\` ~ \`result\`: _))
            'plain': (\`resolver\`: | \`optional\` (\`presence\`: _ \`constraints\`: _ \`checks\`: _ \`not set constraints\`: _ \`resolver\`: | \`nothing\` ~ \`result\`: _))
        } \`result\`: _))
    }`)
    for (const source of ["(`maybe`: * (`inner`: _ `plain`: _))", "< * < _ _ > >"]) {
        const marker = await hoverAt(source, schema, source.indexOf('*'))
        assert.ok(marker.contents.includes('outer optional'))
        assert.ok(marker.contents.includes('optional'))
        const inner = await hoverAt(source, schema, source.indexOf('_'))
        assert.ok(inner.contents.includes('inner optional'))
        assert.ok(!inner.contents.includes('outer optional'))
        const plain = await hoverAt(source, schema, source.lastIndexOf('_'))
        assert.equal(plain.contents.length, 2)
        assert.equal(plain.contents[1], 'not set optional')
    }
})

test('the shared loader binds structural root type to its root resolver', () => {
    const loaded = parse(specification())
    assert.equal(loaded[0], 'constrained')
    assert.equal(selectedType(loaded[1])['l id'], 'Root')
    assert.equal(selectedType(loaded[1])['l entry']['root value'][0], 'nothing')
    assert.equal(entry(loaded[1].schema.structure.types, 'Root'), selectedType(loaded[1])['l entry'])
})

test('missing file-tree root type returns a structured schema diagnostic', () => {
    const source = specification(undefined, undefined, undefined, 'missing')
    assert.throws(() => parse(source), error => {
        assert.equal(error[0], 'resolving')
        assert.deepEqual(error[1].type, ['missing reference', { identifier: 'missing' }])
        assert.equal(error[1].location.start.absolute, 0)
        return true
    })
})

test('old type resolver, globals and text-value schemas are rejected', () => {
    for (const source of [
        specification().replace('`directory`', '`root type`'),
        specification().replace('`basic types`: {}', '`globals`: ()'),
        specification('| `text` | `global` \'Basic\''),
    ]) assert.throws(() => parse(source))
    const with_ignored_legacy_path = specification().replace(
        '`directory`: | `dictionary`',
        '`schema path`: [] `directory`: | `dictionary`',
    )
    assert.equal(selectedType(parse(with_ignored_legacy_path)[1])['l id'], 'Root')
})

test('basic type lookup failures are reported instead of defaulting', () => {
    assert.throws(() => parse(specification('| `simple` \'missing\'')), error => {
        assert.equal(error[0], 'resolving')
        assert.deepEqual(error[1].type, ['missing reference', { identifier: 'missing' }])
        return true
    })
})

test('the bundled template exposes the namespace-aware schema and root type', () => {
    const loaded = parse(readFileSync(new URL('../liana_authoring_environment_template/.liana/schema.slna', import.meta.url), 'utf8'))
    assert.equal(selectedType(loaded[1])['l id'], 'Type Specification')
    const properties = selectedType(loaded[1])['l entry']['root value'][1]
    assert.equal(entry(properties, 'schema').value[0], 'group')
    assert.equal(entry(properties, 'directory').value[0], 'component')
    assert.deepEqual(properties.__get_raw().map(([id]) => id), ['schema', 'directory'])
    assert.equal(entry(loaded[1].schema.structure['basic types'], 'text').type[0], 'double quoted')
})

test('latest references and resolvers use the current schema model', () => {
    const source = readFileSync(new URL('../liana_authoring_environment_template/.liana/schema.slna', import.meta.url), 'utf8')
    const specification = parse(source)[1]
    assert.deepEqual(Object.keys(specification.schema), ['structure', 'resolver'])
    assert.deepEqual(Object.keys(specification.schema.resolver), ['declarations', 'implementations'])
    assert.equal(selectedType(specification)['l id'], 'Type Specification')
})

test('the bundled template completes all three visibility states', async () => {
    const schema = readFileSync(new URL('../liana_authoring_environment_template/.liana/schema.slna', import.meta.url), 'utf8')
    const source = specification().replace('| `public` ~', '| #')
    const result = await complete(source, schema, source.indexOf('#'))
    assert.deepEqual(result.items.map(item => item.label).sort(), ['private', 'private single use', 'public'])
})

test('visibility is required and private file roots are rejected', () => {
    for (const visibility of ['private', 'private single use', 'protected']) {
        assert.throws(() => parse(specification().replace('| `public` ~', `| \`${visibility}\` ~`)))
    }
    assert.throws(() => parse(specification().replace('`visibility`: | `public` ~ ', '')))
})

for (const visibility of ['private', 'private single use']) {
    for (const sibling of [false, true]) {
        test(`${visibility} ${sibling ? 'sibling' : 'child'} component targets are rejected`, () => {
            const schema = namespaced_schema(sibling).replace('| `public` ~', `| \`${visibility}\` ~`)
            assert.throws(() => parse(schema), error => {
                assert.match(JSON.stringify(error), /"constraint":"public"/)
                return true
            })
        })
    }
}

test('double quoted tokens complete with quotes and seal punctuation safely', () => {
    const schema = basic('| `double quoted` ~')
    const type = rootType(schema)['root value']
    const completion = skeleton.Value(type, { style: ['verbose', null] }).data[1].type[1]
    assert.deepEqual(completion.delimiter, ['quote', null])
    const value = document('"a (b)"', schema)
    assert.equal(value.content['unmarshall result'][1][0], 'simple')
    assert.equal(links.Document(value).__get_raw().length, 0)
    const formatted = authoring_target.Document(value, { style: ['verbose', null], impact: ['deep', null] })
    assert.deepEqual(formatted.content.data[1].type[1].delimiter, ['quote', null])
    assert.match(sealed('"a (b)"', schema), /"a \(b\)"/)
    assert.equal(document('{}', schema).content['unmarshall result'][0], 'error')
})

test('undelimited tokens seal without inventing numeric or boolean semantics', () => {
    for (const value of ['true', '2026-10-18', '42']) {
        const type = '| `undelimited` ~'
        const schema = basic(type)
        const completion = skeleton.Value(rootType(schema)['root value'], { style: ['verbose', null] }).data
        assert.equal(completion[0], 'missing')
        assert.equal(document(value, schema).content['unmarshall result'][1][0], 'simple')
        assert.equal(sealed(value, schema), value)
    }
})

test('nested components pass through whole categories or explicitly bind every type argument', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'liana-server-parameters-'))
    try {
        mkdirSync(join(dir, '.liana'))
        const parameter = presence => signature_value('Leaf', presence)
        const component = (name, args) => `(\`root value resolver\`: | \`component\` (
            \`location\`: | \`local\` '${name}' \`arguments\`: ${args} \`constraints\`: _
        ))`
        for (const [index, args] of [
            '* (`types`: _ `lookups`: * {})',
            '_',
            '* (`types`: * { \'child namespaces\': | `optional` | `not set` ~ \'basic types\': | `optional` | `not set` ~ \'inherited\': | `parameter` \'inherited\' } `lookups`: * {})',
        ].entries()) {
            const schema = `(
                \`schema\`: (\`structure\`: (\`namespaces\`: {} \`basic types\`: {}
                    \`types\`: {
                        'Root': (\`visibility\`: | \`public\` ~ \`root value\`: | \`component\` (\`constraints\`: _ \`type\`: | \`simple\` | \`local\` 'Middle'))
                        'Middle': (\`visibility\`: | \`public\` ~ \`root value\`: | \`component\` (\`constraints\`: _ \`type\`: | \`simple\` | \`local\` 'Leaf'))
                        'Leaf': (\`visibility\`: | \`public\` ~ \`root value\`: | \`nothing\` ~)
                    }
                    ) \`resolver\`: (\`declarations\`: (\`namespaces\`: {} \`types\`: {
                        'Root': ${signature(`{ 'child namespaces': ${parameter('optional')} 'basic types': ${parameter('optional')} 'inherited': ${parameter('required')} }`)}
                        'Middle': ${signature(`{ 'child namespaces': ${parameter('optional')} 'basic types': ${parameter('optional')} 'inherited': ${parameter('required')} }`)}
                        'Leaf': ${signature(`{ 'forwarded': ${parameter('optional')} 'inherited': ${parameter('required')} }`)}
                    }) \`implementations\`: (\`namespaces\`: {} \`types\`: {
                        'Root': ${component('Middle', args)}
                        'Middle': ${component('Leaf', '* (`types`: * { \'forwarded\': | `parameter` \'basic types\' \'inherited\': | `parameter` \'inherited\' } `lookups`: * {})')}
                        'Leaf': (\`root value resolver\`: | \`nothing\` ~)
                    })
                )) \`directory\`: | \`dictionary\` (\`node\`: | \`file\` (\`file extension\`: "" \`type\`: 'Root'))
            )`
            writeFileSync(join(dir, '.liana', 'schema.slna'), schema)
            const result = await new Promise(resolve => {
                const doc = TextDocument.create(pathToFileURL(join(dir, 'document.liana.lna')).href, 'liana', index, '~')
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

const template = () => readFileSync(new URL('./fixtures/latest_liana/.liana/schema.slna', import.meta.url), 'utf8')
const typeReference = (name, mode = 'local') =>
    `| \`component\` (\`constraints\`: _ \`type\`: | \`${componentKind(mode)}\` ${mode === 'local cyclic' ? '' : '| `local` '}'${name}')`

test('state resolver results belong to options rather than the resolver itself', () => {
    const schema = parse(template())[1].schema
    const stateDefinition = entry(entry(entry(schema.structure.namespaces, 'resolver').types, 'Value')['root value'][1].options, 'state').value
    assert.equal(stateDefinition[0], 'group')
    assert.deepEqual(stateDefinition[1].__get_raw().map(([id]) => id), ['options'])

    const stateResolver = entry(entry(schema.resolver.implementations.namespaces, 'resolver').value.types, 'Value').value['root value resolver']
    const properties = entry(stateResolver[1].value.options, 'state').value.resolver[1].value
    assert.deepEqual(properties.__get_raw().map(([id]) => id), ['options'])
})

test('the self-schema binds local constraints when entering optional values and state options', async () => {
    const schema = parse(template())[1].schema
    const options = entry(entry(schema.resolver.implementations.namespaces, 'resolver').value.types, 'Value').value['root value resolver'][1].value.options
    const optionalProperties = entry(options, 'optional').value.resolver[1].value
    const stateProperties = entry(entry(options, 'state').value.resolver[1].value, 'options').value.resolver[1].value.resolver[1].value
    for (const [properties, start] of [[optionalProperties, 'option constraint'], [stateProperties, 'linked entry']]) {
        const args = entry(properties, 'resolver').value.resolver[1].value.arguments.__get_raw()[0]
        const binding = entry(args.types.__get_raw()[0], 'option constraints').value
        assert.equal(binding[0], 'optional')
        assert.equal(binding[1][0], 'set')
        assert.equal(binding[1][1].start.value[0], start)
        if (start === 'option constraint') assert.equal(binding[1][1].start.value[1].value['l id'], 'definition')
        assert.deepEqual(binding[1][1].tail.path.value.__get_raw().map(item => item.value.value[0]), ['group', 'cyclic component'])
    }
    const diagnostics = resolveDiagnostics.Document(await loadWithSchema(template(), template())).__get_raw()
    assert.deepEqual(diagnostics, [])
})

test('selected references report missing dictionary entries at the identifier token', async () => {
    for (const mode of ['local', 'local cyclic']) {
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
            source.replace("'Text Tsypes'", "'Root'").replace('| `simple` | `local`', '| `cyclic`'), template()
        )).__get_raw().filter(d => d.message.startsWith('Reference \'')), [])
    }
})

test('acyclic references reject cycles while cyclic references allow mutual dependencies', async () => {
    for (const mode of ['local', 'local cyclic']) {
        const source = specification(typeReference('Other', mode)).replace(
            "'Root': (`visibility`: | `public` ~ `root value`: ",
            `'Other': (\`visibility\`: | \`public\` ~ \`root value\`: ${typeReference('Root', mode)}) 'Root': (\`visibility\`: | \`public\` ~ \`root value\`: `,
        )
        const diagnostics = resolveDiagnostics.Document(await loadWithSchema(source, template())).__get_raw()
            .filter(d => d.message.startsWith('Reference \'') || d.message === 'Cyclic reference dependency.')
        if (mode === 'local cyclic') assert.deepEqual(diagnostics, [])
        else {
            assert.ok(diagnostics.length > 0)
            assert.ok(diagnostics.every(d => d.message === 'Cyclic reference dependency.'))
        }
    }
})

const dependentReferenceSchema = () => {
    const component = name =>
        `| \`component\` (\`constraints\`: _ \`type\`: | \`simple\` | \`local\` '${name}')`
    const resolverComponent = name => `| \`component\` (\`location\`: | \`local\` '${name}' \`arguments\`: _ \`constraints\`: _)`
    const reference = name => `| \`reference\` (
        \`referent\`: (\`type\`: (\`location\`: | \`local\` '${name}' ) \`path\`: (\`tail\`: [] ))
        \`type\`: (\`dependency\`: | \`acyclic\` ~ \`constraints\`: _))`
    const resolverReference = (start, path) => `| \`reference\` (
        \`type\`: (\`lookup\`: (\`type\`: | \`acyclic\` | \`resolved dictionary\` (
                \`selection\`: (\`start\`: | \`sibling property\` '${start}' \`tail\`: (\`path\`: [${path}] ) )
                ) ) \`constraints\`: _))`
    const declarations = ['Root', 'Nodes', 'Members'].map(name =>
        `'${name}': ${signature()}`
    ).join('')
    return `(\`schema\`: (\`structure\`: (\`namespaces\`: {} \`basic types\`: {}
        \`types\`: {
            'Root': (\`visibility\`: | \`public\` ~ \`root value\`: | \`group\` {
                'member': (\`description\`: _ \`value\`: ${reference('Members')})
                'chosen': (\`description\`: _ \`value\`: ${reference('Nodes')})
                'entries': (\`description\`: _ \`value\`: ${component('Nodes')})
            })
            'Nodes': (\`visibility\`: | \`public\` ~ \`root value\`: | \`dictionary\` (\`benchmark\`: _ \`value\`: | \`group\` {
                'members': (\`description\`: _ \`value\`: ${component('Members')})
            }))
            'Members': (\`visibility\`: | \`public\` ~ \`root value\`: | \`dictionary\` (\`benchmark\`: _ \`value\`: | \`nothing\` ~))
        }
        ) \`resolver\`: (\`declarations\`: (\`namespaces\`: {} \`types\`: {${declarations}}) \`implementations\`: (\`namespaces\`: {} \`types\`: {
            'Root': (\`root value resolver\`: | \`group\` {
                'member': (\`resolver\`: ${resolverReference('chosen', '| `reference` () | `group` \'members\' | `component` ~')})
                'chosen': (\`resolver\`: ${resolverReference('entries', '| `component` ~')})
                'entries': (\`resolver\`: ${resolverComponent('Nodes')})
            })
            'Nodes': (\`root value resolver\`: | \`dictionary\` (\`resolver\`: | \`group\` {
                'members': (\`resolver\`: ${resolverComponent('Members')})
            } \`benchmark\`: _))
            'Members': (\`root value resolver\`: | \`dictionary\` (\`resolver\`: | \`nothing\` ~ \`benchmark\`: _))
        })
    )) \`directory\`: | \`dictionary\` (\`node\`: | \`file\` (\`file extension\`: "" \`type\`: 'Root')))`
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
        assert.match(links[0].targetUri, /^file:.*document\.liana\.lna$/)
    }
    const multiline = "(\n\t`member`: \"a\\nb\" `chosen`: 'Known'\n\t`entries`: {'Known': (`members`: {\"a\\nb\": ~})})"
    const links = await definitionAt(multiline, schema, multiline.indexOf('"a\\nb"') + 2)
    const doc = TextDocument.create('file:///test.lna', 'liana', 1, multiline)
    assert.equal(doc.offsetAt(links[0].targetSelectionRange.start), multiline.lastIndexOf('"a\\nb"'))
    assert.equal(doc.getText(links[0].targetSelectionRange), '"a\\nb"')
})

test('definition navigation supports forwarded acyclic and cyclic lookups, including forward targets', async () => {
    for (const mode of ['local cyclic', 'local']) {
        const root = typeReference('Other', mode)
        const source = specification(root).replace(
            "'Root': (`signature`: | `local` (`values`: {} `lookups`: {})) }",
            "'Root': (`signature`: | `local` (`values`: {} `lookups`: {})) 'Other': (`signature`: | `local` (`values`: {} `lookups`: {})) }",
        ).replace(
            `\`types\`: { 'Root': (\`visibility\`: | \`public\` ~ \`root value\`: ${root}) }`,
            `\`types\`: { 'Root': (\`visibility\`: | \`public\` ~ \`root value\`: ${root}) 'Other': (\`visibility\`: | \`public\` ~ \`root value\`: | \`nothing\` ~) }`,
        )
        const links = await definitionAt(source, template(), source.indexOf("'Other'") + 2)
        // The declaration dictionary is a separate lookup from the types dictionary.
        const doc = TextDocument.create('file:///test.lna', 'liana', 1, source)
        assert.equal(links.length, 1)
        assert.equal(doc.offsetAt(links[0].targetSelectionRange.start), source.indexOf("'Other':"))
    }
    const source = specification(typeReference('Root', 'local cyclic'))
    const links = await definitionAt(source, template(), source.indexOf("'Root'", source.indexOf('`local cyclic`')) + 2)
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
    assert.equal(await definitionAt(source, template(), source.indexOf('') + 8), null)
    assert.equal(create_on_definition({ documents: { get: () => undefined } })({
        textDocument: { uri: 'file:///closed.lna' }, position: { line: 0, character: 0 },
    }), null)
})

test('the language server advertises definition navigation', () => {
    const result = create_on_initialize({
        'document notation styles': new Map(),
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

test('safe rename follows benchmark links and rejects invalid rename positions explicitly', async () => {
    const source = specification()
    const renamed = applyRename(source, await renameAt(source, template(), source.indexOf("'Root':") + 2, 'Renamed'))
    assert.equal(renamed, specification(undefined, undefined, undefined, 'Renamed').replaceAll("'Root'", "'Renamed'"))
    assert.deepEqual(resolveDiagnostics.Document(await loadWithSchema(renamed, template())).__get_raw(), [])
    await assert.rejects(renameAt(source, template(), source.indexOf('`nothing`') + 2, 'Renamed'), /requires a dictionary entry/)
    await assert.rejects(requestAt(source, template(), source.indexOf('`nothing`') + 2, create_on_prepare_rename), /requires a dictionary entry/)
    const invalid = identitySource.replace("'alpha' `chosen`", "'missing' `chosen`")
    assert.deepEqual(await referencesAt(invalid, dependentReferenceSchema(), invalid.indexOf("'missing'") + 2), [])
    assert.deepEqual(await requestAt(invalid, dependentReferenceSchema(), invalid.indexOf("'missing'") + 2, create_on_document_highlight), [])
    await assert.rejects(renameAt(invalid, dependentReferenceSchema(), invalid.indexOf("'missing'") + 2, 'valid'), /requires a dictionary entry/)
})

test('rename renames benchmark-linked entries in dense and sparse dependents from either side', async () => {
    for (const dense of [true, false]) {
        const schema = benchmarkSchema(dense)
        const source = dense ? "< { 'a': ~ 'b': ~ } { 'a': ~ 'b': ~ } >" : "< { 'a': ~ } { 'a': ~ 'b': ~ } >"
        const expected = dense ? "< { 'c': ~ 'b': ~ } { 'c': ~ 'b': ~ } >" : "< { 'c': ~ } { 'c': ~ 'b': ~ } >"
        for (const offset of [source.indexOf("'a'"), source.lastIndexOf("'a'")]) {
            const result = await renameAt(source, schema, offset + 1, 'c')
            assert.equal(applyRename(source, result), expected)
            assert.deepEqual(resolveDiagnostics.Document(await loadWithSchema(expected, schema)).__get_raw(), [])
        }
        await assert.rejects(renameAt(source, schema, source.lastIndexOf("'a'") + 1, 'b'), /already exists/)
    }
    const conflicting = "< { 'a': ~ 'x': ~ } { 'a': ~ } >"
    await assert.rejects(renameAt(conflicting, benchmarkSchema(false), conflicting.lastIndexOf("'a'") + 1, 'x'),
        /benchmark-linked dictionary/)
})

test('sort offers topological orders only when entries depend on each other, ignoring cyclic references', async () => {
    const { create_on_sort_dictionary } = require('../server/out/connection/on_sort_dictionary.js')
    const type = (name, value) => `'${name}': (\`visibility\`: | \`public\` ~ \`root value\`: ${value})`
    const withTypes = (types) => specification().replace(`\`types\`: { ${type('Root', '| `nothing` ~')} }`, `\`types\`: { ${types.join(' ')} }`)
    const sortAt = async (source, scope = 'shallow', offset = source.indexOf("'", source.indexOf('`types`')) + 1) =>
        requestAt(source, template(), offset, (context) => (params) => create_on_sort_dictionary(context)({
            uri: params.textDocument.uri, position: params.position, scope,
        }))
    const typeOrder = (source, edits) => {
        const sorted = TextDocument.applyEdits(TextDocument.create('file:///x.lna', 'liana', 1, source), edits)
        const types = sorted.slice(sorted.indexOf('`types`'), sorted.indexOf('`resolver`'))
        return [...types.matchAll(/'(\w+)': \(`visibility`/g)].map(($) => $[1])
    }

    const independent = withTypes([type('Root', '| `nothing` ~'), type('Other', '| `nothing` ~')])
    assert.notEqual(independent, specification())
    const plain = await sortAt(independent)
    assert.equal(plain.dependencies, 'none')
    assert.deepEqual(Object.keys(plain.orders), ['alphabetical'])
    assert.deepEqual(typeOrder(independent, plain.orders.alphabetical), ['Other', 'Root'])

    const dependent = withTypes([
        type('Root', typeReference('Middle')),
        type('Middle', typeReference('Zeta')),
        type('Zeta', '| `nothing` ~'),
        type('Alpha', typeReference('Root', 'local cyclic')),
    ])
    const response = await sortAt(dependent)
    assert.equal(response.dependencies, 'present')
    assert.deepEqual(typeOrder(dependent, response.orders.alphabetical), ['Alpha', 'Middle', 'Root', 'Zeta'])
    assert.deepEqual(typeOrder(dependent, response.orders.topological), ['Alpha', 'Zeta', 'Middle', 'Root'])
    assert.deepEqual(typeOrder(dependent, response.orders['topological only']), ['Zeta', 'Middle', 'Root', 'Alpha'])
    assert.equal(response.dictionaries, 1)

    // the whole document: only the types depend on each other, the other dictionaries are sorted alphabetically
    const whole = await sortAt(dependent, 'deep', 0)
    assert.equal(whole.dependencies, 'present')
    assert.equal(whole['with dependencies'], 1)
    assert.ok(whole.dictionaries > 1)
    assert.deepEqual(typeOrder(dependent, whole.orders.topological), ['Alpha', 'Zeta', 'Middle', 'Root'])
    assert.deepEqual(typeOrder(dependent, whole.orders['topological only']), ['Zeta', 'Middle', 'Root', 'Alpha'])

    const ordered = withTypes([
        type('Zeta', '| `nothing` ~'),
        type('Root', typeReference('Zeta')),
        type('Alpha', '| `nothing` ~'),
    ])
    const already = await sortAt(ordered)
    assert.equal(already.dependencies, 'present')
    assert.equal(already.orders['topological only'], null)
    assert.deepEqual(typeOrder(ordered, already.orders.topological), ['Alpha', 'Zeta', 'Root'])

    // a resolver refers to its siblings through the dictionary it is keyed by (its benchmark)
    const optional = '| `optional` (`result`: _ `constraints`: _ `value`: | `nothing` ~)'
    const optionalResolver = (presence) => `| \`optional\` (\`presence\`: ${presence} \`result\`: _ \`constraints\`: _ \`checks\`: _ \`not set constraints\`: _ \`resolver\`: | \`nothing\` ~)`
    const sibling = "* | `optional value` (`selection`: (`start`: | `sibling property` 'b' `tail`: (`path`: [])) `tail`: (`path`: []))"
    const group = specification(
        `| \`group\` { 'a': (\`description\`: _ \`value\`: ${optional}) 'b': (\`description\`: _ \`value\`: ${optional}) }`,
        `| \`group\` { 'a': (\`resolver\`: ${optionalResolver(sibling)}) 'b': (\`resolver\`: ${optionalResolver('_')}) }`,
    )
    const resolverOrder = (edits) => {
        const sorted = edits === null ? group : TextDocument.applyEdits(TextDocument.create('file:///x.lna', 'liana', 1, group), edits)
        return [...sorted.slice(sorted.indexOf('`root value resolver`')).matchAll(/'(\w+)': \(`resolver`/g)].map(($) => $[1])
    }
    const resolverSort = await sortAt(group, 'shallow', group.indexOf("'a': (`resolver`") + 1)
    assert.equal(resolverSort.dependencies, 'present')
    assert.deepEqual(resolverOrder(resolverSort.orders.alphabetical), ['a', 'b'])
    assert.deepEqual(resolverOrder(resolverSort.orders.topological), ['b', 'a'])
    // the structure is not affected by the resolver's dependencies
    assert.equal((await sortAt(group, 'shallow', group.indexOf("'a': (`description`") + 1)).dependencies, 'none')
})

test('references and highlights follow cyclic and acyclic targets without traversing reference cycles', async () => {
    for (const mode of ['local cyclic', 'local']) {
        const root = typeReference(mode === 'local cyclic' ? 'Root' : 'Other', mode)
        const source = mode === 'local cyclic' ? specification(root) : specification(root).replace(
            `\`types\`: { 'Root': (\`visibility\`: | \`public\` ~ \`root value\`: ${root}) }`,
            `\`types\`: { 'Root': (\`visibility\`: | \`public\` ~ \`root value\`: ${root}) 'Other': (\`visibility\`: | \`public\` ~ \`root value\`: | \`nothing\` ~) }`,
        )
        const name = mode === 'local cyclic' ? "'Root'" : "'Other'"
        const offset = source.indexOf(name, source.indexOf(`\`${componentKind(mode)}\``))
        const refs = await referencesAt(source, template(), offset + 2)
        assert.equal(refs.length, mode === 'local cyclic' ? 2 : 1)
        const doc = TextDocument.create('file:///test.lna', 'liana', 1, source)
        assert.equal(doc.offsetAt(refs[0].range.start), offset)
        const highlights = await requestAt(source, template(), offset + 2, create_on_document_highlight)
        assert.equal(highlights.length, mode === 'local cyclic' ? 3 : 2)
    }
})

test('rename refuses partial edits to mutually cyclic symbols with implicit benchmark dependencies', async () => {
    const schema = template()
    const source = specification(typeReference('Other', 'local')).replace(
        '`types`: {',
        `\`types\`: { 'Other': (\`visibility\`: | \`public\` ~ \`root value\`: ${typeReference('Root', 'local cyclic')})`,
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
        assert.equal(edit.newText, "'alpha'")
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
        assert.equal(result.items[0].textEdit.newText, quote_identifier(id))
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
    assert.equal(result.items[0].textEdit.newText, "''")
    const special = result.items[1]
    assert.equal(special.textEdit.newText, quote_identifier("a'b\\c$1}"))
    assert.equal(special.insertTextFormat, 1)
    const updated = source.slice(0, special.textEdit.range.start.character) + special.textEdit.newText + source.slice(special.textEdit.range.end.character)
    const diagnostics = resolveDiagnostics.Document(await loadWithSchema(updated, schema)).__get_raw()
    assert.deepEqual(diagnostics, [])
})

test('reference completion supports forwarded lookups and offers an empty identifier without candidates', async () => {
    for (const mode of ['local cyclic', 'local']) {
        const source = specification(typeReference('#', mode))
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

const benchmarkSchema = dense => `(
    \`schema\`: (
        \`structure\`: (\`namespaces\`: {} \`basic types\`: {} \`types\`: {
            'Root': (\`visibility\`: | \`public\` ~ \`root value\`: | \`group\` {
                'supplied': (\`description\`: _ \`value\`: | \`dictionary\` (
                    \`benchmark\`: * (
                        \`selection\`: (\`type\`: (\`location\`: | \`local\` 'Expected') \`path\`: (\`tail\`: []))
                        \`coverage\`: | \`${dense ? 'dense' : 'sparse'}\` ~)
                    \`value\`: | \`nothing\` ~))
                'expected': (\`description\`: _ \`value\`: | \`component\` (\`constraints\`: _ \`type\`: | \`simple\` | \`local\` 'Expected'))
            })
            'Expected': (\`visibility\`: | \`public\` ~ \`root value\`: | \`dictionary\` (\`benchmark\`: _ \`value\`: | \`nothing\` ~))
        })
        \`resolver\`: (
            \`declarations\`: (\`namespaces\`: {} \`types\`: {
                'Root': ${signature()}
                'Expected': ${signature()}
            })
            \`implementations\`: (\`namespaces\`: {} \`types\`: {
                'Root': (\`root value resolver\`: | \`group\` {
                    'supplied': (\`resolver\`: | \`dictionary\` (
                        \`resolver\`: | \`nothing\` ~
                        \`benchmark\`: * (
                            \`selection\`: (\`start\`: | \`sibling property\` 'expected' \`tail\`: (\`path\`: [| \`component\` ~]))
                            \`coverage\`: | \`${dense ? 'dense' : 'sparse'}\` ~)))
                    'expected': (\`resolver\`: | \`component\` (\`location\`: | \`local\` 'Expected' \`arguments\`: _ \`constraints\`: _))
                })
                'Expected': (\`root value resolver\`: | \`dictionary\` (\`resolver\`: | \`nothing\` ~ \`benchmark\`: _))
            })
        )
    )
    \`directory\`: | \`dictionary\` (\`node\`: | \`file\` (\`file extension\`: "" \`type\`: 'Root'))
)`

const argumentBindingSchema = args => {
    const parameter = signature_value('Leaf', 'optional')
    return `(\`schema\`: (\`structure\`: (\`namespaces\`: {} \`basic types\`: {}
        \`types\`: {
            'Root': (\`visibility\`: | \`public\` ~ \`root value\`: | \`component\` (\`constraints\`: _ \`type\`: | \`simple\` | \`local\` 'Leaf'))
            'Leaf': (\`visibility\`: | \`public\` ~ \`root value\`: | \`nothing\` ~)
        }
        ) \`resolver\`: (\`declarations\`: (\`namespaces\`: {} \`types\`: {
            'Root': ${signature(`{ 'input': ${parameter} }`)}
            'Leaf': ${signature(`{ 'child': ${parameter} }`)}
        }) \`implementations\`: (\`namespaces\`: {} \`types\`: {
            'Root': (\`root value resolver\`: | \`component\` (
                \`location\`: | \`local\` 'Leaf' \`arguments\`: ${args} \`constraints\`: _))
            'Leaf': (\`root value resolver\`: | \`nothing\` ~)
        })
    )) \`directory\`: | \`dictionary\` (\`node\`: | \`file\` (\`file extension\`: "" \`type\`: 'Root')))`
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
        assert.equal(error[1].type[0], 'missing dense dictionary entry')
        return true
    })
    const diagnostics = resolveDiagnostics.Document(await loadWithSchema(source, template())).__get_raw()
    assert.deepEqual(diagnostics.map(d => d.message), ["Missing required benchmark entry 'child'."])
})

test('runtime type initialization inherits only at whole/category boundaries, never per explicit entry', () => {
    const schema = argumentBindingSchema('* (`types`: * { \'child\': | `parameter` \'input\' } `lookups`: * {})')
        .replace("'Leaf': (`visibility`: | `public` ~ `root value`: | `nothing` ~)", "'Leaf': (`visibility`: | `public` ~ `root value`: | `optional` (`result`: _ `constraints`: _ `value`: | `nothing` ~))")
        .replace("'Leaf': (`root value resolver`: | `nothing` ~)",
            "'Leaf': (`root value resolver`: | `optional` (`presence`: _ `checks`: _ `result`: _ `not set constraints`: _ `constraints`: _ `resolver`: | `nothing` ~))")
    const resolved = parse(schema)[1].schema
    const implementations = { ...resolved.resolver.implementations, types: p.from.dictionary(resolved.resolver.implementations.types).map((type, id) => {
        if (id !== 'Leaf') return type
        const definition = type.value['root value resolver']
        return { ...type, value: { 'root value resolver': resolved_value('optional', {
            ...definition[1].value,
            constraints: option_checks(p.literal.dictionary({ present: ['assert is set', possible_parameter('child')] })),
        }, definition[1].constraints.definition) } }
    }) }
    const definition = entry(resolved.resolver.implementations.types, 'Root').value['root value resolver']
    const parsed = document('* ~', schema).content
    const seed = nothingValue()
    for (const [args, expected] of [
        [p.literal.not_set(), 'resolved'],
        [p.literal.set({ types: p.literal.not_set(), lookups: p.literal.not_set() }), 'resolved'],
        [p.literal.set({ types: p.literal.set(p.literal.dictionary({})), lookups: p.literal.not_set() }), 'constraint failed'],
        [p.literal.set({ types: p.literal.set(p.literal.dictionary({
            child: { benchmark: null, value: ['optional', ['not set', null]] },
        })), lookups: p.literal.not_set() }), 'constraint failed'],
    ]) {
        const result = resolver.Value(parsed, {}, {
            definition: resolved_value('component', { ...definition[1].value, arguments: args }, definition[1].constraints.definition),
            resolver: implementations,
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
    const component = name => `| \`component\` (\`constraints\`: _ \`type\`: | \`simple\` | \`local\` '${name}')`
    const call = (name, args = '_') => `| \`component\` (\`location\`: | \`local\` '${name}' \`arguments\`: ${args} \`constraints\`: _)`
    const parameter = signature_lookup('Nodes', mode, 'optional')
    return `(\`schema\`: (\`structure\`: (\`namespaces\`: {} \`basic types\`: {}
        \`types\`: {
            'Root': (\`visibility\`: | \`public\` ~ \`root value\`: | \`group\` {
                'entries': (\`description\`: _ \`value\`: ${component('Nodes')})
                'value': (\`description\`: _ \`value\`: ${component('Middle')})
            })
            'Middle': (\`visibility\`: | \`public\` ~ \`root value\`: ${component('Leaf')})
            'Leaf': (\`visibility\`: | \`public\` ~ \`root value\`: | \`reference\` (
                \`referent\`: (\`type\`: (\`location\`: | \`local\` 'Nodes' ) \`path\`: (\`tail\`: [] ))
                \`type\`: (\`dependency\`: | \`${mode}\` ~ \`constraints\`: _)))
            'Nodes': (\`visibility\`: | \`public\` ~ \`root value\`: | \`dictionary\` (\`benchmark\`: _ \`value\`: | \`nothing\` ~))
        }
        ) \`resolver\`: (\`declarations\`: (\`namespaces\`: {} \`types\`: {
            'Root': ${signature()} 'Nodes': ${signature()}
            'Middle': ${signature('{}', `{ 'source': ${parameter} 'unused': ${parameter} }`)}
            'Leaf': ${signature('{}', `{ 'source': ${parameter} 'unused': ${parameter} }`)}
        }) \`implementations\`: (\`namespaces\`: {} \`types\`: {
            'Root': (\`root value resolver\`: | \`group\` {
                'entries': (\`resolver\`: ${call('Nodes')})
                'value': (\`resolver\`: ${call('Middle', `* (\`types\`: * {} \`lookups\`: * {
                    'source': | \`selection\` (\`type\`: | \`acyclic\` | \`resolved dictionary\` (
                        \`selection\`: (\`start\`: | \`sibling property\` 'entries' \`tail\`: (\`path\`: [| \`component\` ~] ) )
                        ) )
                    'unused': | \`${mode}\` ~
                })`)})
            })
            'Middle': (\`root value resolver\`: ${call('Leaf', args)})
            'Leaf': (\`root value resolver\`: | \`reference\` (\`type\`: (\`lookup\`: (\`type\`: | \`parameter\` 'source' ) \`constraints\`: _)))
            'Nodes': (\`root value resolver\`: | \`dictionary\` (\`benchmark\`: _ \`resolver\`: | \`nothing\` ~))
        })
    )) \`directory\`: | \`dictionary\` (\`node\`: | \`file\` (\`file extension\`: "" \`type\`: 'Root')))`
}

test('lookup arguments pass through only at category boundaries and explicit dictionaries are dense', async () => {
    for (const mode of ['acyclic', 'cyclic']) {
        for (const args of ['_', '* (`types`: _ `lookups`: _)',
            '* (`types`: * {} `lookups`: * { \'source\': | `selection` (`type`: | `parameter` \'source\' ) \'unused\': | `' + mode + '` ~ })']) {
            const schema = lookupBindingSchema(mode, args)
            assert.doesNotThrow(() => parse(schema))
            const source = "(`entries`: {'Known': ~} `value`: 'Known')"
            assert.deepEqual(resolveDiagnostics.Document(await loadWithSchema(source, schema)).__get_raw(), [], `${mode}: ${args}`)
            assert.deepEqual(resolveDiagnostics.Document(await loadWithSchema(
                source.replace("`value`: 'Known'", "`value`: 'Missing'"), schema,
            )).__get_raw().map(d => d.message), ["Reference 'Missing' does not exist."], `${mode}: ${args}`)
        }
        const notSet = lookupBindingSchema(mode, `* (\`types\`: _ \`lookups\`: * {
            'source': | \`${mode}\` ~ 'unused': | \`${mode}\` ~
        })`)
        assert.deepEqual(resolveDiagnostics.Document(await loadWithSchema(
            "(`entries`: {'Known': ~} `value`: 'Missing')", notSet,
        )).__get_raw(), [])
        for (const [args, missing] of [
            ['* (`types`: _ `lookups`: * {})', ['source', 'unused']],
            [`* (\`types\`: _ \`lookups\`: * { 'source': | \`${mode}\` ~ })`, ['unused']],
        ]) {
            const invalid = lookupBindingSchema(mode, args)
            assert.throws(() => parse(invalid), error => error[0] === 'resolving' && error[1].type[0] === 'missing dense dictionary entry')
            const messages = resolveDiagnostics.Document(await loadWithSchema(invalid, template())).__get_raw().map(d => d.message)
            assert.deepEqual(messages.filter(message => message.startsWith('Missing required')).sort(),
                missing.map(id => `Missing required benchmark entry '${id}'.`))
            assert.ok(messages.every(message => message.startsWith('Missing required')
                || message === 'Constraint failed: expected an optional value to be set.'))
        }
        const schema = lookupBindingSchema(mode, '_')
        const resolved = parse(schema)[1].schema
        const middle = entry(resolved.resolver.implementations.types, 'Middle')
        const modified = { ...resolved.resolver.implementations, types: p.from.dictionary(resolved.resolver.implementations.types).map((value, id) =>
            id !== 'Middle' ? value : { ...middle, value: { 'root value resolver': resolved_value('component', {
                ...middle.value['root value resolver'][1].value,
                arguments: p.literal.set({ types: p.literal.not_set(), lookups: p.literal.set(p.literal.dictionary({})) }),
            }, middle.value['root value resolver'][1].constraints.definition) } }),
        }
        const source = "(`entries`: {'Known': ~} `value`: 'Known')"
        const content = resolver.Value(document(source, schema).content, {}, {
            definition: entry(modified.types, 'Root').value['root value resolver'],
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
        assert.equal(source.slice(range.start.absolute, range.end.absolute), '{')
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
    const at = source.lastIndexOf("'Types':")
    assert.ok(at > source.indexOf('`types`:'))
    const renamed = source.slice(0, at) + source.slice(at).replace("'Types':", "'Tydpes':")
    const diagnostics = resolveDiagnostics.Document(await loadWithSchema(renamed, source)).__get_raw()
    assert.deepEqual(diagnostics.map(d => d.message).sort(), [
        "Entry 'Tydpes' does not exist in the benchmark dictionary.",
        "Missing required benchmark entry 'Types'.",
    ])
    const unexpected = diagnostics.find(d => d.message.startsWith('Entry'))
    const range = unexpected.range.__get_raw()[0][1]
    assert.equal(renamed.slice(range.start.absolute, range.end.absolute), "'Tydpes'")
    assert.throws(() => parse(renamed))
})

test('a missing list cursor is an explicit error rather than an unsupported warning', () => {
    const context = { lookups: {}, types: p.literal.dictionary({}) }
    assert.deepEqual(resolver.Resolver_Guaranteed_Value_Selection({
        ...guaranteed(['list cursor', null]),
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
    const mismatched = specification('| `dictionary` (`value`: | `nothing` ~)', '| `state` (`result`: _ `options`: {})')
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
            ? p.literal.dictionary({ present: ['assert is set', possible_parameter('input')] })
            : p.literal.dictionary({ gate: ['state', {
                selection: { value: guaranteed(['parameter', { 'l id': 'gate' }]) }, option: { 'l id': 'right' },
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
    const constraint = `\`constraints\`: * {
        'present': (\`start\`: | \`value\` ~ \`constraint\`: (
            \`selection\`: (\`path\`: [] )
            \`type\`: | \`optional value\` ()))
    }`
    const declaration = "`constraints`: * { 'present': (`type`: (`location`: | `local` 'Leaf') `path`: (`tail`: [| `optional` ~])) }"
    const invalid = argumentBindingSchema('_').replace('`constraints`: _', declaration)
        .replace('`arguments`: _ `constraints`: _', `\`arguments\`: _ ${constraint}`)
    const valid = invalid
        .replace("'Leaf': (`visibility`: | `public` ~ `root value`: | `nothing` ~)", "'Leaf': (`visibility`: | `public` ~ `root value`: | `optional` (`result`: _ `constraints`: _ `value`: | `nothing` ~))")
        .replace("'Leaf': (`root value resolver`: | `nothing` ~)",
            "'Leaf': (`root value resolver`: | `optional` (`presence`: _ `checks`: _ `result`: _ `not set constraints`: _ `constraints`: _ `resolver`: | `nothing` ~))")
    assert.doesNotThrow(() => parse(valid))
    assert.deepEqual(resolveDiagnostics.Document(await loadWithSchema(valid, template())).__get_raw(), [])
    assert.throws(() => parse(invalid))
    const diagnostics = resolveDiagnostics.Document(await loadWithSchema(invalid, template())).__get_raw()
    assert.ok(diagnostics.length > 0)
    assert.ok(diagnostics.every(d => d.message === "Constraint failed: expected state option 'optional'."), JSON.stringify(diagnostics.map(d => d.message)))
})

const resultType = root => ({
    type: { location: { value: ['local', { 'l id': 'Result', 'l entry': root }], result: root } },
    path: { tail: { value: p.literal.list([]), result: root['root value'] } },
})
const relative = (...path) => ({ path: { value: p.literal.list(path.map(([kind, value]) => ({
    value: { value: [kind, {
        constraints: { definition: kind === 'state result' ? { result: p.literal.set(value) } : null },
        value: kind === 'state result' ? null : value,
    }], result: null }, result: null,
}))), result: null } })
const guaranteed = (start, ...path) => ({ start: { value: start, result: null }, tail: relative(...path) })
const possible_parameter = name => ({ value: ['parameter', { 'l id': name }], result: null })
const resolved_value = (kind, value, definition = null) => [kind, { constraints: { definition }, value }]
const option_checks = checks => p.literal.set({
    constraints: { declarations: p.literal.dictionary({}) },
    value: p.from.dictionary(checks).map(value => ({ benchmark: null, value: { value, result: null } })),
})
const nothingValue = () => resolver.Value(document('~', specification()).content, {}, {
    definition: resolved_value('nothing', null), 'type parameters': p.literal.dictionary({}),
})
const stateValueType = '| `state` (`options`: { \'left\': (`description`: _ `constraints`: _ `value`: | `nothing` ~) \'right\': (`description`: _ `constraints`: _ `value`: | `nothing` ~) } `result`: _)'
const stateResolverText = '| `state` (`options`: { \'left\': (`constraints`: _ `checks`: _ `resolver`: | `nothing` ~ `result`: _) \'right\': (`constraints`: _ `checks`: _ `resolver`: | `nothing` ~ `result`: _) })'
const stateDefinition = (results = p.literal.not_set(), selection = ['value', relative()], constraints = () => p.literal.dictionary({})) => resolved_value('state', {
    options: p.literal.dictionary(Object.fromEntries(['left', 'right'].map(id => [id, { benchmark: null, value: {
        constraints: option_checks(constraints(id)), resolver: resolved_value('nothing', null),
        result: results.__get_raw() === null ? p.literal.not_set() : p.literal.set({
            constraints: { result: results.__get_raw()[0] },
            value: { value: selection, result: results.__get_raw()[0].path.tail.result },
        }),
    } }]))),
}, { result: results })
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
            selection: { value: guaranteed(['list cursor', null]) }, option: { 'l id': id === 'left' ? 'right' : 'left' },
        }],
    }))
    const schema = specification(`| \`list\` (\`value\`: ${stateValueType} \`result\`: _)`,
        `| \`list\` (\`resolver\`: ${stateResolverText} \`result\`: _)`)
    for (const source of ['[]', '[| `right` ~ | `left` ~ | `right` ~]']) {
        const value = resolver.Value(document(source, schema).content, {}, {
            definition: resolved_value('list', { resolver: item, result: p.literal.set({ constraints: { definition: null }, value: {
                type, initial: guaranteed(['parameter', { 'l id': 'seed' }]),
                next: { value: ['value', relative()], result: type.path.tail.result },
            } }) }),
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
    const selection = '* | `value` (`path`: [| `component` ~] )'
    const type = '* (`type`: (`location`: | `local` \'Nothing\') `path`: (`tail`: []))'
    const component = '| `component` (`constraints`: _ `type`: | `simple` | `local` \'Nothing\')'
    const componentResolver = '| `component` (`location`: | `local` \'Nothing\' `arguments`: _ `constraints`: _)'
    const schema = (parent, option) => specification(stateValueType.replaceAll('`value`: | `nothing` ~', `\`value\`: ${component}`)
        .replace('`result`: _', `\`result\`: ${parent}`), stateResolverText
        .replaceAll('`resolver`: | `nothing` ~ `result`: _', `\`resolver\`: ${componentResolver} \`result\`: ${option}`))
        .replace('`types`: {', '`types`: { \'Nothing\': (`visibility`: | `public` ~ `root value`: | `nothing` ~)')
        .replace('`declarations`: (`namespaces`: {} `types`: {', '`declarations`: (`namespaces`: {} `types`: { \'Nothing\': ' + signature())
        .replace("`types`: { 'Root': (`root value resolver`:", "`types`: { 'Nothing': (`root value resolver`: | `nothing` ~) 'Root': (`root value resolver`:")
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
        () => p.literal.dictionary({ check: ['assert is set', possible_parameter('input')] }),
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
    const unmarshalled = document(source, specification(
        '| `optional` (`result`: _ `constraints`: _ `value`: | `nothing` ~)',
        '| `optional` (`presence`: _ `checks`: _ `result`: _ `not set constraints`: _ `constraints`: _ `resolver`: | `nothing` ~)',
    )).content
    for (const [status, severity] of [
        [['not set', null], 'error'],
        [['constraint failed', 'invalid result type'], 'error'],
        [['unavailable', null], null],
    ]) {
        const value = resolver.Value(unmarshalled, {}, {
            definition: resolved_value('optional', {
                presence: p.literal.not_set(),
                constraints: option_checks(p.literal.dictionary({ required: ['assert is set', possible_parameter('input')] })),
                'not set constraints': p.literal.not_set(),
                resolver: resolved_value('nothing', null),
                result: p.literal.not_set(),
            }),
            'type parameters': p.literal.dictionary({ input: status }),
        })
        const diagnostics = resolveDiagnostics.Document({ content: value }).__get_raw()
        assert.equal(diagnostics.length, severity === null ? 0 : 1)
        if (severity !== null) assert.equal(diagnostics[0].severity[0], severity)
    }
})

test('optional presence matches both states and blocks constraints and payload resolution on failure', () => {
    const schema = specification(
        '| `optional` (`result`: _ `constraints`: _ `value`: | `nothing` ~)',
        '| `optional` (`presence`: _ `checks`: _ `result`: _ `not set constraints`: _ `constraints`: _ `resolver`: | `nothing` ~)',
    )
    const seed = nothingValue()
    for (const source of ['_', '* ~']) {
        for (const status of [
            ['resolved', seed], ['not set', null], ['constraint failed', 'invalid prerequisite'],
            ['unavailable', null], ['cycle', p.literal.list(['input'])],
        ]) {
            const matches = (status[0] === 'resolved' && source === '* ~') || (status[0] === 'not set' && source === '_')
            const value = resolver.Value(document(source, schema).content, {}, {
                definition: resolved_value('optional', {
                    presence: p.literal.set(possible_parameter('input')),
                    get constraints() { assert.ok(matches, 'present constraints evaluated before presence'); return p.literal.not_set() },
                    get 'not set constraints'() { assert.ok(matches, 'absent constraints evaluated before presence'); return p.literal.not_set() },
                    get resolver() { assert.ok(matches, 'payload evaluated before presence'); return resolved_value('nothing', null) },
                    result: p.literal.not_set(),
                }),
                'type parameters': p.literal.dictionary({ input: status }),
            })
            const optional = value['unmarshall result'][1][1]
            assert.equal(optional.status[0], matches ? source === '_' ? 'not set' : 'set' : 'unavailable')
            if (!matches) assert.equal(optional.result[0], 'unavailable')
            const diagnostics = resolveDiagnostics.Document({ content: value }).__get_raw()
            assert.equal(diagnostics.length, matches || status[0] === 'unavailable' ? 0 : 1)
            if (!matches && ['resolved', 'not set'].includes(status[0])) {
                assert.match(diagnostics[0].message, /presence does not match/)
            }
        }
    }
})

test('hyperlink metadata creates links without changing authored values and preserves URI targets', async () => {
    const { create_on_document_link } = require('../server/out/connection/on_document_link.js')
    for (const [prefix, suffix, token, expected] of [
        ['https://example.test/docs/', '.html', 'hello', 'https://example.test/docs/hello.html'],
        ['', '', 'file:///tmp/a%20b.txt', 'file:///tmp/a%20b.txt'],
        ['../assets/', '.png', 'image', '/assets/image.png'],
        ['', '', '/tmp/a b.txt', 'file:///tmp/a%20b.txt'],
    ]) {
        const schema = basic('| `double quoted` ~').replace('`hyperlink`: _',
            `\`hyperlink\`: * (\`prefix\`: "${prefix}" \`suffix\`: "${suffix}")`)
        const source = JSON.stringify(token)
        const parsed = document(source, schema)
        const generated = links.Document(parsed).__get_raw()
        assert.equal(generated.length, 1)
        assert.equal(generated[0].target, prefix + token + suffix)
        assert.equal(parsed.content['unmarshall result'][1][1].instance.token.value, token)
        const result = await requestAt(source, schema, 0, create_on_document_link)
        assert.equal(result.length, 1)
        if (prefix === '../assets/') assert.ok(result[0].target.endsWith(expected))
        else assert.equal(result[0].target, expected)
        assert.deepEqual(result[0].range, { start: { line: 0, character: 0 }, end: { line: 0, character: source.length } })
    }
})

test('production loading enforces optional presence against a sibling in both states', async () => {
    const optional = '| `optional` (`result`: _ `constraints`: _ `value`: | `nothing` ~)'
    const selection = "| `optional value` (`selection`: (`start`: | `sibling property` 'first' `tail`: (`path`: [])) `tail`: (`path`: []))"
    const optionalResolver = presence => `| \`optional\` (\`presence\`: ${presence} \`result\`: _ \`constraints\`: _ \`checks\`: _ \`not set constraints\`: _ \`resolver\`: | \`nothing\` ~)`
    const schema = specification(
        `| \`group\` { 'first': (\`description\`: _ \`value\`: ${optional}) 'second': (\`description\`: _ \`value\`: ${optional}) }`,
        `| \`group\` { 'first': (\`resolver\`: ${optionalResolver('_')}) 'second': (\`resolver\`: ${optionalResolver(`* ${selection}`)}) }`,
    )
    for (const first of ['_', '* ~']) {
        for (const second of ['_', '* ~']) {
            const loaded = await loadWithSchema(`(\`first\`: ${first} \`second\`: ${second})`, schema)
            const diagnostics = resolveDiagnostics.Document(loaded).__get_raw()
            assert.equal(diagnostics.length, first === second ? 0 : 1)
            if (first !== second) assert.match(diagnostics[0].message, /presence does not match/)
        }
    }
})

test('declaration parameters resolve and execute against nonempty structural subselections', () => {
    const schema = argumentBindingSchema('* (`types`: * { \'child\': | `parameter` \'input\' } `lookups`: * {})')
        .replace("'Leaf': (`visibility`: | `public` ~ `root value`: | `nothing` ~)", "'Leaf': (`visibility`: | `public` ~ `root value`: | `optional` (`result`: _ `constraints`: _ `value`: | `nothing` ~))")
        .replace("'Leaf': (`root value resolver`: | `nothing` ~)",
            "'Leaf': (`root value resolver`: | `optional` (`presence`: * | `parameter` 'child' `checks`: _ `result`: _ `not set constraints`: _ `constraints`: _ `resolver`: | `nothing` ~))")
        .replaceAll('`subselection`: (`tail`: [])', '`subselection`: (`tail`: [| `optional` ~])')
    const resolved = parse(schema)[1].schema
    const leaf = entry(resolved.structure.types, 'Leaf')['root value'][1].value
    assert.equal(entry(resolved.resolver.declarations.types, 'Leaf').value.signature.result.values.__get_raw()[0][1].value.subselection.tail.result, leaf)
    for (const [source, status, expected] of [
        ['_', ['not set', null], 0], ['* ~', ['resolved', nothingValue()], 0],
        ['_', ['resolved', nothingValue()], 1], ['* ~', ['not set', null], 1],
    ]) {
        const value = resolver.Value(document(source, schema).content, {}, {
            definition: entry(resolved.resolver.implementations.types, 'Root').value['root value resolver'],
            resolver: resolved.resolver.implementations,
            'type parameters': p.literal.dictionary({ input: status }),
        })
        assert.equal(resolveDiagnostics.Document({ content: value }).__get_raw().length, expected)
    }
})

test('legacy signatures and file-path metadata are rejected', () => {
    assert.throws(() => parse(specification().replace('`declarations`:', '`signatures`:')))
    assert.throws(() => parse(basic('| `double quoted` ~').replace('`hyperlink`:', '`file path`:')))
})

test('document loading uses Next root selection, preserves caching and reports schema errors', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'liana-server-next-'))
    try {
        mkdirSync(join(dir, '.liana'))
        const schemaPath = join(dir, '.liana', 'schema.slna')
        writeFileSync(schemaPath, basic('| `double quoted` ~'))
        const cache = { schemas: create_cache(), documents: create_cache() }
        const load = (version, caches = cache) => new Promise(resolve => {
            const doc = TextDocument.create(pathToFileURL(join(dir, 'document.liana.lna')).href, 'liana', version, '"hello (world)"')
            load_document(doc, caches, error => ['error', error], result => ['success', result], resolve)
        })
        const first = await load(1)
        assert.equal(first[0], 'success')
        assert.equal(first[1][0], 'constrained')
        assert.equal(first[1][1].content['unmarshall result'][1][0], 'simple')
        assert.equal((await load(2))[0], 'success')
        assert.equal(cache.schemas.map.size, 1)
        assert.equal(cache.documents.map.size, 2)
        writeFileSync(schemaPath, specification(undefined, undefined, undefined, 'missing'))
        const error = await load(3, { schemas: create_cache(), documents: create_cache() })
        assert.equal(error[0], 'error')
        assert.equal(error[1][0], 'schema')
        assert.deepEqual(error[1][1].error.type[1][1].type, ['missing reference', { identifier: 'missing' }])
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

test('code actions skip structural fixes for source parse errors while diagnostics retain the error', async () => {
    const { create_on_diagnostics } = require('../server/out/connection/on_diagnostics.js')
    const { missing_entry_actions } = require('../server/out/helpers/missing_entry_actions.js')
    const { missing_reference_actions } = require('../server/out/helpers/missing_reference_actions.js')
    for (const source of ['"unterminated', "'unterminated", '`unterminated', '< {']) {
        const schema = benchmarkSchema(true)
        assert.deepEqual(await actionsAt(source, schema, 0, ['quickfix']), [])
        assert.equal((await actionsAt(source, schema, 0)).length, 7)
        await requestAt(source, schema, 0, context => async params => {
            const actions = {
                ...params, range: { start: params.position, end: params.position },
                context: { diagnostics: [] },
            }
            assert.deepEqual(await missing_entry_actions(context, actions), [])
            assert.deepEqual(await missing_reference_actions(context, actions), [])
            const report = await create_on_diagnostics(context)(params)
            assert.equal(report.items.length, 1)
            assert.equal(report.items[0].severity, 1)
            assert.equal(report.items[0].source, 'liana-deserialize')
            assert.ok(report.items[0].message.length > 0)
        })
    }
})

test('code actions still report schema loading failures rather than suppressing them', async () => {
    await assert.rejects(actionsAt('#', 'invalid schema', 0, ['quickfix']),
        error => error.code === -32603 && error.message.startsWith('Cannot load document for missing-entry fixes:'))
})

test('schema parse errors point at LSP character columns, counting a tab as one character', async () => {
    const { create_on_diagnostics } = require('../server/out/connection/on_diagnostics.js')
    const report = await requestAt('~', '\t\t)', 0, context => () => create_on_diagnostics(context)({ textDocument: { uri: context.documents.get().uri } }))
    assert.equal(report.items.length, 1)
    assert.deepEqual(report.items[0].relatedInformation[0].location.range, {
        start: { line: 0, character: 2 }, end: { line: 0, character: 3 },
    })
})

test('code actions skip structural fixes when no .liana schema directory is found', async () => {
    const { missing_entry_actions } = require('../server/out/helpers/missing_entry_actions.js')
    const { missing_reference_actions } = require('../server/out/helpers/missing_reference_actions.js')
    const dir = mkdtempSync(join(tmpdir(), 'liana-no-schema-'))
    try {
        const doc = TextDocument.create(pathToFileURL(join(dir, 'document.liana.lna')).href, 'liana', 1, '< {} >')
        const context = {
            documents: { get: () => doc },
            cache: { schemas: create_cache(), documents: create_cache() },
            'document notation styles': new Map(),
        }
        const params = {
            textDocument: { uri: doc.uri },
            range: { start: doc.positionAt(0), end: doc.positionAt(0) },
            context: { diagnostics: [] },
        }
        assert.deepEqual(await missing_entry_actions(context, params), [])
        assert.deepEqual(await missing_reference_actions(context, params), [])
        // Not a parse error: JSON conversion (which needs no schema) must stay enabled in the client.
        const { create_on_diagnostics } = require('../server/out/connection/on_diagnostics.js')
        const report = await create_on_diagnostics(context)({ textDocument: { uri: doc.uri } })
        assert.deepEqual(report.items.map(item => item.source), ['schema'])
    } finally {
        rmSync(dir, { recursive: true, force: true })
    }
})

test('missing dense-entry diagnostics highlight only the opening dictionary brace', async () => {
    for (const source of [
        "< {} { 'first': ~ 'second': ~ } >",
        "< {\n    'kept': ~\n    /* a large dictionary can continue here */\n} { 'kept': ~ 'first': ~ 'second': ~ } >",
    ]) {
        const diagnostics = resolveDiagnostics.Document(await loadWithSchema(source, benchmarkSchema(true))).__get_raw()
        assert.equal(diagnostics.length, 2)
        const opening = source.indexOf('{')
        for (const diagnostic of diagnostics) {
            assert.match(diagnostic.message, /Missing required benchmark entry/)
            const range = diagnostic.range.__get_raw()[0][1]
            assert.equal(range.start.absolute, opening)
            assert.equal(range.end.absolute, opening + 1)
        }
        const actions = await actionsAt(source, benchmarkSchema(true), opening, ['quickfix'])
        assert.equal(actions[0].title, 'Add all missing required entries (2)')
    }
})

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
    assert.equal((await actionsAt(source, benchmarkSchema(true), source.indexOf('{'), ['refactor'])).length, 7)
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
        '| `state` (`options`: { \'only\': (`description`: _ `constraints`: _ `value`: | `nothing` ~) } `result`: _)',
        '| `state` (`options`: { \'only\': (`constraints`: _ `checks`: _ `resolver`: | `nothing` ~ `result`: _) })')
    assert.equal((await complete('#', singleton, 0)).items[0].textEdit.newText, '$0| `only` ~')
})

test('bulk resolver-entry fixes generate constraint-aware state choices', async () => {
    const source = specification().replace("'Root': (`root value resolver`: | `nothing` ~)", '')
    const offset = source.lastIndexOf('`types`: {') + '`types`: '.length
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
        '| `state` (`options`: { \'next\': (`description`: _ `constraints`: _ `value`: | `component` (`constraints`: _ `type`: | `cyclic` \'Root\')) } `result`: _)',
        '| `state` (`options`: { \'next\': (`constraints`: _ `checks`: _ `resolver`: | `component` (`location`: | `local` \'Root\' `arguments`: _ `constraints`: _) `result`: _) })')
    assert.deepEqual(resolveDiagnostics.Document(await loadWithSchema('~', schema, template())).__get_raw(), [])
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

test('one quick fix handles missing declarations and resolvers together', async () => {
    const source = specification()
        .replace(`'Root': ${signature()}`, '')
        .replace("'Root': (`root value resolver`: | `nothing` ~)", '')
    const offset = source.indexOf('`types`: {', source.indexOf('`declarations`:')) + '`types`: '.length
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

test('request-local notation overrides apply to skeletons and generated payloads without changing preferences', async () => {
    const source = specification('| `group` { \'left\': (`description`: _ `value`: | `nothing` ~) }', '#')
    for (const selected of ['concise', 'verbose']) {
        const opposite = selected === 'concise' ? 'verbose' : 'concise'
        await requestAt(source, template(), source.indexOf('#'), context => async params => {
            const styles = context['document notation styles']
            styles.set('__default__', opposite)
            styles.set(params.textDocument.uri, selected)
            const before = new Map(styles)
            const handler = create_on_completion(context)
            const normal = await handler(params)
            const override = await handler({ ...params, notationStyle: opposite })
            const subsequent = await handler(params)
            assert.deepEqual(styles, before)
            assert.deepEqual(subsequent, normal)
            for (const [result, style] of [[normal, selected], [override, opposite]]) {
                const edit = result.items[0].textEdit
                assert.match(edit.newText, /^\$0\| `group` \{/)
                assert.match(edit.newText, style === 'verbose' ? /'left': \(/ : /'left': </)
                const updated = TextDocument.applyEdits(
                    TextDocument.create('file:///override.lna', 'liana', 1, source),
                    [{ ...edit, newText: snippetText(edit.newText) }])
                assert.deepEqual(resolveDiagnostics.Document(await loadWithSchema(updated, template())).__get_raw(), [])
            }
        })
        await requestAt('#', template(), 0, context => async params => {
            context['document notation styles'].set('__default__', selected)
            const handler = create_on_completion(context)
            const result = await handler({ ...params, notationStyle: opposite })
            const text = result.items[0].textEdit.newText
            assert.ok(text.startsWith(opposite === 'verbose' ? '$0(' : '$0<'))
            if (opposite === 'verbose') assert.match(text, /`schema`:/)
            else assert.doesNotMatch(text, /`schema`:/)
            assert.equal(context['document notation styles'].get('__default__'), selected)
        })
    }
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
    for (const mode of ['local cyclic', 'local']) {
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
    assert.equal((await actionsAt(source, benchmarkSchema(false), source.indexOf("'foo'") + 2, ['refactor'])).length, 7)
})

test('generated dictionary identifiers always use escaped single quotes', () => {
    for (const [id, expected] of [
        ['foo', "'foo'"], ['', "''"], ["a'b", "'a\\'b'"], ['a"b', "'a\"b'"],
        ['a\\b', "'a\\\\b'"], ['a\nb\r\tc', "'a\\nb\\r\\tc'"],
    ]) assert.equal(quote_identifier(id), expected)
})

const namespaced_schema = (throughSibling = false, componentType = 'simple') => {
    const structure = `(
        \`namespaces\`: {} \`basic types\`: {} \`types\`: {
            'Root': (\`visibility\`: | \`public\` ~ \`root value\`: | \`group\` {
                'selected': (\`description\`: _ \`value\`: | \`reference\` (
                    \`referent\`: (\`type\`: (\`location\`: | \`local\` 'Nodes') \`path\`: (\`tail\`: []))
                    \`type\`: (\`dependency\`: | \`acyclic\` ~ \`constraints\`: _)))
                'entries': (\`description\`: _ \`value\`: ${typeReference('Nodes', componentType === 'cyclic' ? 'local cyclic' : 'local')})
            })
            'Nodes': (\`visibility\`: | \`public\` ~ \`root value\`: | \`dictionary\` (\`benchmark\`: _ \`value\`: | \`nothing\` ~))
        })`
    const declarations = `{
        'Root': ${signature()}
        'Nodes': ${signature()}
    }`
    const componentSelection = componentType === 'simple'
        ? '| \`component\` ~'
        : '| \`cyclic component\` ~'
    const implementation = `(
        \`namespaces\`: {} \`types\`: {
            'Root': (\`root value resolver\`: | \`group\` {
                'selected': (\`resolver\`: | \`reference\` (\`type\`: (
                    \`lookup\`: (\`type\`: | \`acyclic\` | \`resolved dictionary\` (
                        \`selection\`: (\`start\`: | \`sibling property\` 'entries' \`tail\`: (\`path\`: [${componentSelection}]))))
                    \`constraints\`: _)))
                'entries': (\`resolver\`: | \`component\` (
                    \`location\`: | \`local\` 'Nodes' \`arguments\`: _ \`constraints\`: _))
            })
            'Nodes': (\`root value resolver\`: | \`dictionary\` (\`resolver\`: | \`nothing\` ~ \`benchmark\`: _))
        })`
    const child = (name, location = 'child namespace', kind = 'simple') =>
        `| \`component\` (\`constraints\`: _ \`type\`: | \`${kind}\` | \`${location}\` (\`namespace\`: '${name}' \`type\`: 'Root'))`
    const call = (name, location = 'child namespace') => `| \`component\` (
        \`location\`: | \`${location}\` (\`namespace\`: '${name}' \`resolver\`: 'Root')
        \`arguments\`: _ \`constraints\`: _)`
    const root = location => `| \`group\` {
        'left': (\`description\`: _ \`value\`: ${child('left', location)})
        'right': (\`description\`: _ \`value\`: ${child('right', location)})
    }`
    const rootResolver = location => `| \`group\` {
        'left': (\`resolver\`: ${call('left', location)})
        'right': (\`resolver\`: ${call('right', location)})
    }`
    return `(
        \`schema\`: (
            \`structure\`: (
                \`namespaces\`: { 'left': ${structure} 'right': ${structure}
                    ${throughSibling ? `'bridge': (\`namespaces\`: {} \`basic types\`: {} \`types\`: {
                        'Root': (\`visibility\`: | \`public\` ~ \`root value\`: ${root('sibling namespace')})
                    })` : ''}
                }
                \`basic types\`: {}
                \`types\`: { 'Root': (\`visibility\`: | \`public\` ~ \`root value\`: ${throughSibling ? child('bridge') : root('child namespace')}) })
            \`resolver\`: (
                \`declarations\`: (
                    \`namespaces\`: {
                        'left': (\`namespaces\`: {} \`types\`: ${declarations})
                        'right': (\`namespaces\`: {} \`types\`: ${declarations})
                        ${throughSibling ? `'bridge': (\`namespaces\`: {} \`types\`: { 'Root': ${signature()} })` : ''}
                    }
                    \`types\`: { 'Root': ${signature()} })
                \`implementations\`: (
                \`namespaces\`: { 'left': ${implementation} 'right': ${implementation}
                    ${throughSibling ? `'bridge': (\`namespaces\`: {} \`types\`: {
                        'Root': (\`root value resolver\`: ${rootResolver('sibling namespace')})
                    })` : ''}
                }
                \`types\`: { 'Root': (\`root value resolver\`: ${throughSibling ? call('bridge') : rootResolver('child namespace')}) })))
        \`directory\`: | \`dictionary\` (\`node\`: | \`file\` (\`file extension\`: "" \`type\`: 'Root')))`
}

for (const componentType of ['simple', 'cyclic']) {
for (const sibling of [false, true]) {
test(`${componentType} components in ${sibling ? 'sibling' : 'child'} namespaces keep resolution, completion and navigation isolated`, async () => {
    const schema = namespaced_schema(sibling, componentType)
    const source = "< < 'shared' { 'shared': ~ 'left-only': ~ } > < 'shared' { 'shared': ~ 'right-only': ~ } > >"
    const loaded = await loadWithSchema(source, schema)
    assert.deepEqual(unmarshal_diagnostics.Document(loaded.unmarshalled).__get_raw(), [])
    assert.deepEqual(resolveDiagnostics.Document(loaded).__get_raw(), [])
    const offset = source.indexOf("'shared'") + 2
    const links = await definitionAt(source, schema, offset)
    const doc = TextDocument.create('file:///test.lna', 'liana', 1, source)
    assert.equal(links.length, 1)
    assert.equal(doc.offsetAt(links[0].targetSelectionRange.start), source.indexOf("'shared':"))
    const refs = await referencesAt(source, schema, offset, true)
    assert.equal(refs.length, 2)
    assert.ok(refs.every(ref => doc.offsetAt(ref.range.start) < source.indexOf("'right-only'") - 20))
    const missing = source.replace("'shared'", '#')
    const result = await complete(missing, schema, missing.indexOf('#'))
    assert.deepEqual(result.items.map(item => item.label).sort(), ['left-only', 'shared'])
    const renamed = applyRename(source, await renameAt(source, schema, offset, 'renamed'))
    assert.equal((renamed.match(/'renamed'/g) ?? []).length, 2)
    assert.equal((renamed.match(/'shared'/g) ?? []).length, 2)
})
}
}

test('sibling component locations reject missing targets, mismatched declarations and namespace cycles', () => {
    const schema = namespaced_schema(true)
    for (const [original, replacement] of [
        ["`type`: | `simple` | `sibling namespace` (`namespace`: 'left'", "`type`: | `simple` | `sibling namespace` (`namespace`: 'missing'"],
        ["`type`: | `simple` | `sibling namespace` (`namespace`: 'left' `type`: 'Root')", "`type`: | `simple` | `sibling namespace` (`namespace`: 'left' `type`: 'missing')"],
        ["`location`: | `sibling namespace` (`namespace`: 'left'", "`location`: | `sibling namespace` (`namespace`: 'missing'"],
        ["`location`: | `sibling namespace` (`namespace`: 'left' `resolver`: 'Root')", "`location`: | `sibling namespace` (`namespace`: 'left' `resolver`: 'missing')"],
        ["`location`: | `sibling namespace` (`namespace`: 'left'", "`location`: | `sibling namespace` (`namespace`: 'right'"],
        ["`type`: | `simple` | `sibling namespace` (`namespace`: 'left'", "`type`: | `simple` | `sibling namespace` (`namespace`: 'bridge'"],
    ]) {
        assert.ok(schema.includes(original), original)
        assert.throws(() => parse(schema.replace(original, replacement)))
    }
})

test('old component location tags are rejected without changing sibling property selections', () => {
    for (const [current, obsolete] of [
        ['local', 'internal'],
        ['child namespace', 'child'], ['sibling namespace', 'sibling'],
    ]) {
        const schema = namespaced_schema(true)
        const changed = schema.replace(`| \`${current}\``, `| \`${obsolete}\``)
        assert.notEqual(changed, schema)
        assert.throws(() => parse(changed))
    }
})

test('legacy structural component types and selection steps are rejected', () => {
    const typed = specification(typeReference('Root'))
    assert.throws(() => parse(typed.replace('| \`simple\` | \`local\`', '| \`local\`')))

    const selected = namespaced_schema()
    assert.throws(() => parse(selected.replace('| \`component\` ~', '| \`navigable component\` ~')))
    assert.throws(() => parse(selected.replace('| \`component\` ~', '| \`simple component\` | \`local\` \'Nodes\'')))
})

test('missing resolver coverage is reported instead of synthesizing a resolver', () => {
    const schema = specification().replace("'Root': (`root value resolver`: | `nothing` ~)", '')
        .replace(`'Root': ${signature()}`, '')
    assert.throws(() => parse(schema), error => {
        assert.equal(error[0], 'resolving')
        assert.equal(error[1].type[0], 'missing dense dictionary entry')
        assert.equal(error[1].type[1], null)
        return true
    })
})

test('structural token patterns validate whole tokens and surface editor and sealing errors', async () => {
    const schema = basic('| `undelimited` ~', undefined,
        '* | `sequence` [| `literal` "id." | `repetition` (`expression`: | `character set` "0123456789" `quantity`: | `one or more` ~)]')
    assert.equal(document('id.12', schema).content['unmarshall result'][0], 'success')
    assert.equal(sealed('id.12', schema), 'id.12')
    for (const value of ['idX12', 'id.12x', 'xid.12', 'id.']) {
        const parsed = document(value, schema)
        assert.equal(parsed.content['unmarshall result'][0], 'error')
        const diagnostics = unmarshal_diagnostics.Document(parsed).__get_raw()
        assert.equal(diagnostics.length, 1)
        assert.equal(diagnostics[0].message, 'Token does not match basic type Basic.')
        assert.equal(diagnostics[0].range.__get_raw()[0][1].start.absolute, 0)
        assert.throws(() => sealed(value, schema))
    }
    assert.equal((await complete('#', schema, 0)).items[0].textEdit.newText, '$0#')
})

test('regex constructs preserve literal metacharacters, Unicode, empty choices and newline boundaries', () => {
    const match = (expression, value) => matches_token({
        type: ['double quoted', null], 'regular expression': p.literal.set(expression),
    }, value)
    const literal = ['literal', 'a.*[]{}()^$?+\\-']
    assert.equal(match(literal, literal[1]), true)
    assert.equal(match(literal, 'a'), false)
    assert.equal(match(['character set', ']-^\\😀'], '😀'), true)
    assert.equal(match(['character set', ']-^\\😀'], '-'), true)
    assert.equal(match(['character set', ''], ''), false)
    assert.equal(match(['choice', p.literal.list([])], ''), false)
    assert.equal(match(['sequence', p.literal.list([])], ''), true)
    assert.equal(match(['any character', null], '\n'), true)
    assert.equal(match(['literal', 'x'], 'x\n'), false)
    assert.equal(match(['choice', p.literal.list([['literal', 'x'], ['literal', 'y']])], 'y'), true)
    for (const quantity of ['optional', 'zero or more', 'one or more']) {
        const expression = ['repetition', { expression: ['literal', 'x'], quantity: [quantity, null] }]
        assert.equal(match(expression, ''), quantity !== 'one or more')
        assert.equal(match(expression, 'xx'), quantity !== 'optional')
    }
})

test('not-set optional constraints reject present prerequisites without cascading from invalid ones', () => {
    const schema = specification(
        '| `optional` (`result`: _ `constraints`: _ `value`: | `nothing` ~)',
        '| `optional` (`presence`: _ `checks`: _ `result`: _ `not set constraints`: _ `constraints`: _ `resolver`: | `nothing` ~)',
    )
    const seed = nothingValue()
    for (const [status, expected] of [
        [['not set', null], []],
        [['resolved', seed], ['Constraint failed: expected an optional value to be absent.']],
        [['unavailable', null], []],
    ]) {
        const value = resolver.Value(document('_', schema).content, {}, {
            definition: resolved_value('optional', {
                presence: p.literal.not_set(),
                constraints: p.literal.not_set(),
                'not set constraints': p.literal.set(p.literal.dictionary({ absent: possible_parameter('input') })),
                resolver: resolved_value('nothing', null),
                result: p.literal.not_set(),
            }),
            'type parameters': p.literal.dictionary({ input: status }),
        })
        assert.deepEqual(resolveDiagnostics.Document({ content: value }).__get_raw().map(d => d.message), expected)
    }
})

test('new relative tails select component, optional, reference, benchmark and list results', () => {
    const seed = nothingValue()
    const selected = ['resolved', seed]
    const constraints = p.literal.dictionary({ selected })
    const sources = [
        [{ ...seed, 'benchmark link': selected }, ['benchmark link', {}]],
        [{ ...seed, 'unmarshall result': ['success', ['component', { value: seed, constraints }]] },
            ['component constraint', { name: { 'l id': 'selected' } }]],
        [{ ...seed, constraints }, ['optional value constraint', { 'l id': 'selected' }]],
        [{ ...seed, 'unmarshall result': ['success', ['optional', { status: ['set', { 'child value': seed }] }]] },
            ['optional', null]],
        [{ ...seed, 'unmarshall result': ['success', ['reference', ['selected', { constraints }]]] },
            ['reference constraint', { 'l id': 'selected' }]],
        [{ ...seed, 'unmarshall result': ['success', ['list', { result: selected }]] },
            ['list result', resultType({ 'root value': ['nothing', null] })]],
    ]
    for (const [source, step] of sources) {
        assert.deepEqual(resolver.Resolver_Guaranteed_Value_Selection(
            guaranteed(['parameter', { 'l id': 'input' }], step),
            { lookups: {}, types: p.literal.dictionary({ input: ['resolved', source] }) },
        ), selected, step[0])
    }
})

test('reference traversal distinguishes acyclic references from explicit expect-resolved cyclic references', () => {
    const acyclic = dependentReferenceSchema()
    const cyclic = acyclic.replaceAll('`dependency`: | `acyclic`', '`dependency`: | `cyclic`')
    const explicit = source => source.replace('| `reference` () | `group`', '| `expect resolved` () | `group`')
    assert.doesNotThrow(() => parse(acyclic))
    assert.throws(() => parse(explicit(acyclic)))
    assert.throws(() => parse(cyclic))
    assert.doesNotThrow(() => parse(explicit(cyclic)))
})

test('expect resolved traverses completed cyclic references and preserves unavailable selections', () => {
    const seed = nothingValue()
    const definition = { referent: { value: { path: { tail: { result: ['nothing', null] } } } } }
    const selection = {
        start: { value: ['parameter', { 'l id': 'input' }], result: null },
        tail: { path: { value: p.literal.list([{
            value: { value: ['expect resolved', { constraints: { definition }, value: {} }], result: null },
            result: null,
        }]), result: null } },
    }
    const source = status => ({
        ...seed,
        'unmarshall result': ['success', ['reference', ['selected', { 'resolve status': status }]]],
    })
    const consume = input => resolver.Resolver_Guaranteed_Value_Selection(selection, {
        lookups: {}, types: p.literal.dictionary({ input }),
    })
    assert.deepEqual(consume(['resolved', source(['cyclic', {
        get_circular_dependent: () => p.literal.set({
            'unmarshall result': ['success', { value: ['set', seed] }],
        }),
    }])]), ['resolved', seed])
    assert.deepEqual(consume(['resolved', source(['cyclic', {
        get_circular_dependent: () => p.literal.not_set(),
    }])]), ['unavailable', null])
    assert.deepEqual(consume(['resolved', source(['missing', 'unknown'])]), ['unavailable', null])
    assert.deepEqual(consume(['unavailable', null]), ['unavailable', null])
    assert.deepEqual(consume(['resolved', { ...seed, 'unmarshall result': ['error', null] }]), ['unavailable', null])
})
