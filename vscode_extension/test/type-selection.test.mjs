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
const serialize_paragraph = require('pareto-fountain-pen/modules/paragraph/schemas/paragraph/serializers')
const unmarshall = require('liana-authoring/schemas/unmarshall_result/refiners/list_of_characters')
const skeleton = require('liana-authoring/schemas/liana_schema/transformers/authoring_target')
const links = require('liana-authoring/schemas/unmarshall_result/transformers/document_links')
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
