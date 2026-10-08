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
const { Module_Specifier } = require('pareto-liana/schemas/temp_module_specifier/refiners/list_of_characters')
const { create_cache } = require('../server/out/core/cache.js')
const p = require('pareto-core/transformer')
const schema = `| \`schema\` (
    \`schema imports\`: {} \`resolver imports\`: {}
    \`globals\`: (\`complexity\`: | \`unconstrained\` ~ \`text types\`: {} \`simple types\`: {})
    \`modules\`: { 'Root': (\`root value\`: | \`nothing\` ~) }
    \`complexity\`: | \`unconstrained\` ~
)`
const specification = (tree = schema, tail = '', module = 'Root') =>
    `(\`schema\`: ${tree} \`schema path\`: (\`tail\`: [${tail}] \`result\`: ~) \`complexity\`: | \`unconstrained\` (\`module\`: '${module}'))`
const parse = source => Module_Specifier(p.literal.list(Array.from(source, c => c.codePointAt(0))), error => { throw error }, { 'tab size': 4 })

test('the shared loader selects nested schema children and preserves legacy flat paths', () => {
    const source = specification(`| \`set\` { 'folder': | \`set\` { 'leaf': ${schema} } }`, "| `set` 'folder' | `set` 'leaf'")
    assert.equal(parse(source)[1].module.id, 'Root')
    assert.equal(parse(specification().replace('(`tail`: [] `result`: ~)', '[ ]'))[1].module.id, 'Root')
})

test('module selection failures return structured diagnostics at the selected identifier', () => {
    for (const [source, expected, token] of [
        [specification(schema, "| `set` 'bad'"), ['constraint', ['state', { expected: 'set', found: 'schema' }]], "'bad'"],
        [specification('| `set` {}', "| `set` 'bad'"), ['lookup', ['no such entry', 'bad']], "'bad'"],
        [specification(schema, '', 'bad'), ['lookup', ['no such entry', 'bad']], "'bad'"],
    ]) assert.throws(() => parse(source), error => {
        assert.equal(error[0], 'resolving')
        assert.deepEqual(error[1].type, expected)
        assert.equal(error[1].location.start.absolute, source.indexOf(token))
        return true
    })
})

test('the bundled authoring template uses the canonical native schema document and its structural API', () => {
    const loaded = parse(readFileSync(new URL('../liana_authoring_environment_template/.liana/schema.to_be_removed.slna', import.meta.url), 'utf8'))
    assert.equal(loaded[0], 'unconstrained')
    assert.equal(loaded[1].module.id, 'Root')
    const entry = (dictionary, name) => p.from.dictionary(dictionary).get_possible_entry(name, value => value, () => assert.fail(name))
    const root = loaded[1].module.entry['root value']
    assert.equal(root[0], 'state')
    assert.deepEqual(root[1].options.__get_raw().map(([name]) => name), ['astn', 'liana'])
    const native = readFileSync(new URL('../liana_authoring_environment_template/.liana/schema.slna', import.meta.url), 'utf8')
    const canonical = readFileSync(new URL('../../newstyle_projects/projects/liana/sketch/definition/schema.liana.lna', import.meta.url), 'utf8')
    assert.equal(native, canonical)
    const { prepare_native_schema } = require('../native/out')
    const schema = prepare_native_schema(native)
    assert.equal(schema.language, 'astn')
    assert.equal(schema.validate(readFileSync(new URL('../liana_authoring_environment_template/my_schema.liana.lna', import.meta.url), 'utf8')), undefined)
    assert.equal(schema.typescript.has('schemas/resolved/schema.ts'), false)
    assert.equal(entry(root[1].options, 'astn').value[0], 'component')
})

test('document loading uses the shared schema query, preserves caching and reports schema errors', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'liana-server-selection-'))
    try {
        mkdirSync(join(dir, '.liana'))
        const schemaPath = join(dir, '.liana', 'schema.to_be_removed.slna')
        writeFileSync(schemaPath, specification(`| \`set\` { 'nested': ${schema} }`, "| `set` 'nested'"))
        const cache = { schemas: create_cache(), documents: create_cache() }
        const load = (version, caches = cache) => new Promise(resolve => {
            const doc = TextDocument.create(pathToFileURL(join(dir, 'document.lna')).href, 'liana', version, '~')
            load_document(doc, caches, error => ['error', error], result => ['success', result], resolve)
        })
        const first = await load(1)
        assert.equal(first[0], 'success')
        assert.equal(first[1][0], 'unconstrained')
        assert.equal(first[1][1].content['unmarshall result'][0], 'success')
        assert.equal((await load(2))[0], 'success')
        assert.equal(cache.schemas.map.size, 1)
        assert.equal(cache.documents.map.size, 2)
        writeFileSync(schemaPath, specification(schema, '', 'bad'))
        const error = await load(3, { schemas: create_cache(), documents: create_cache() })
        assert.equal(error[0], 'error')
        assert.equal(error[1][0], 'schema')
        assert.deepEqual(error[1][1].error.type[1][1].type, ['lookup', ['no such entry', 'bad']])
    } finally {
        rmSync(dir, { recursive: true, force: true })
    }
})
