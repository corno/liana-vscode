import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { createRequire } from 'node:module'
import test from 'node:test'

const require = createRequire(import.meta.url)
const server_require = createRequire(new URL('../server/package.json', import.meta.url))
const { TextDocument } = server_require('vscode-languageserver-textdocument')
const p = require('pareto-core/transformer')
const { Type_Specifier } = require('pareto-liana/schemas/temp_type_specifier/refiners/list_of_characters')
const { file_type } = require('pareto-liana/schemas/temp_type_specifier/file_type')
const { error_message } = require('pareto-liana/schemas/temp_type_specifier/reader_error')
const { load_document } = require('../server/out/to_be_backend/load_document.js')
const { load_applicable_schema } = require('../client/out/to_be_backend/load_applicable_schema.js')
const { create_cache } = require('../server/out/core/cache.js')
const unmarshal_diagnostics = require('liana-authoring/schemas/unmarshall_result/transformers/diagnostics')
const resolve_diagnostics = require('liana-authoring/schemas/resolve_result/transformers/diagnostics')
const runtime = require('liana-authoring/schemas/unmarshall_result/transformers/resolve_result')
const sealed_target = require('pareto-liana/modules/schema.generated/schemas/resolved/transformers/astn_sealed_target')
const { $$: seal } = require('../client/out/helpers/seal.js')
const { $$: convert_to_json } = require('../client/out/helpers/convert_to_json.js')
const { create_on_document_formatting } = require('../server/out/connection/on_document_formatting.js')

const fail = error => { throw new Error(JSON.stringify(error)) }
const chars = source => p.literal.list(Array.from(source, c => c.codePointAt(0)))
const parse = source => Type_Specifier(chars(source), fail, { 'tab size': 1 })[1]
const fresh_cache = () => ({ schemas: create_cache(), documents: create_cache() })
const load = (file, source, cache = fresh_cache()) => new Promise(resolve => load_document(
    TextDocument.create(pathToFileURL(file).href, 'liana', 1, source), cache,
    error => ['error', error], value => ['success', value], resolve,
))
const client_load = (file, source) => new Promise(resolve => load_applicable_schema(
    { uri: { fsPath: file }, getText: () => source },
    error => resolve(['error', error]), (specification, type) => resolve(['success', { specification, type }]),
))
const dictionary = (extension, type) => `| \`dictionary\` (\`node\`: | \`file\` (\`file extension\`: "${extension}" \`type\`: '${type}'))`
const tree = `| \`group\` (\`nodes\`: {
    'settings': | \`file\` (\`file extension\`: "cfg" \`type\`: 'Text')
    'nested': | \`directory\` | \`group\` (\`nodes\`: {
        'empty': | \`file\` (\`file extension\`: "" \`type\`: 'Nothing')
        'items': | \`directory\` ${dictionary('item', 'Text')}
    })
})`
const specification = (directory = tree) => `(
    \`schema\`: (
        \`structure\`: (\`namespaces\`: {} \`basic types\`: {
            'text': (\`type\`: | \`double quoted\` ~ \`regular expression\`: _ \`file path\`: _)
        } \`types\`: {
            'Text': (\`root value\`: | \`simple\` 'text')
            'Nothing': (\`root value\`: | \`nothing\` ~)
        })
        \`resolver\`: (
            \`signatures\`: (\`namespaces\`: {} \`types\`: {
                'Text': (\`parameters\`: | \`local\` (\`lookups\`: {} \`types\`: {}))
                'Nothing': (\`parameters\`: | \`local\` (\`lookups\`: {} \`types\`: {}))
            })
            \`implementations\`: (\`namespaces\`: {} \`types\`: {
                'Text': (\`root value resolver\`: | \`simple\` ~)
                'Nothing': (\`root value resolver\`: | \`nothing\` ~)
            })
        )
    )
    \`directory\`: ${directory}
)`
const selected = (schema, directories, file) => file_type(schema, {
    directories: p.literal.list(directories), 'file name': file,
}, message => { throw new Error(message) })
const header = (schema, directories, file, body) =>
    `! (\`path\`: (\`directories\`: [${directories.map(directory => JSON.stringify(directory)).join(' ')}] \`file name\`: ${JSON.stringify(file)}) \`schema\`: ${schema})\n${body}`

test('latest file-tree selection covers named, nested, dictionary and encoded files', () => {
    const schema = parse(specification())
    for (const file of ['settings.cfg', 'settings.cfg.lna', 'settings.cfg.slna']) {
        assert.equal(selected(schema, [], file)['l id'], 'Text')
    }
    for (const file of ['empty', 'empty.lna', 'empty.slna']) {
        assert.equal(selected(schema, ['nested'], file)['l id'], 'Nothing')
    }
    for (const file of ['a.item', 'a.item.lna', 'a.item.slna']) {
        assert.equal(selected(schema, ['nested', 'items'], file)['l id'], 'Text')
    }
    const nested_dictionary = parse(specification(`| \`dictionary\` (\`node\`: | \`directory\` ${dictionary('', 'Nothing')})`))
    assert.equal(selected(nested_dictionary, ['arbitrary'], 'file')['l id'], 'Nothing')
})

test('invalid, unknown, mismatched and ambiguous paths are rejected without root fallback', () => {
    const schema = parse(specification())
    for (const segment of ['', '.', '..', 'a/b', 'a\\b', 'a\0b']) {
        assert.throws(() => selected(schema, [segment], 'empty'), /Invalid path segment/)
        assert.throws(() => selected(schema, [], segment), /Invalid path segment/)
    }
    assert.throws(() => selected(schema, ['unknown'], 'empty'), /No such directory/)
    assert.throws(() => selected(schema, ['settings'], 'empty'), /Expected directory/)
    assert.throws(() => selected(schema, [], 'nested'), /No such file/)
    assert.throws(() => selected(schema, ['nested', 'items'], 'a.wrong'), /extension mismatch/)
    assert.throws(() => selected(schema, ['nested', 'items'], '.item'), /extension mismatch/)
    const ambiguous = parse(specification(`| \`group\` (\`nodes\`: {
        'name': | \`file\` (\`file extension\`: "cfg" \`type\`: 'Text')
        'name.cfg': | \`file\` (\`file extension\`: "" \`type\`: 'Nothing')
    })`))
    assert.throws(() => selected(ambiguous, [], 'name.cfg'), /Ambiguous/)
})

test('server and client choose distinct roots per file while the server caches one specification', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'liana-file-tree-'))
    try {
        mkdirSync(join(dir, '.liana'))
        mkdirSync(join(dir, 'nested'))
        writeFileSync(join(dir, '.liana', 'schema.slna'), specification())
        const cache = fresh_cache()
        for (const [relative, body, kind] of [
            ['settings.cfg.lna', '"hello"', 'simple'], ['nested/empty.slna', '~', 'nothing'],
            ['nested/items/a.item.lna', '"item"', 'simple'],
        ]) {
            const file = join(dir, relative)
            const loaded = await load(file, body, cache)
            assert.equal(loaded[0], 'success', JSON.stringify(loaded))
            assert.equal(loaded[1][1].content['unmarshall result'][1][0], kind)
            const client = await client_load(file, body)
            assert.equal(client[0], 'success', JSON.stringify(client))
            assert.equal(client[1].type['root value'][0], kind)
        }
        assert.equal(cache.schemas.map.size, 1)
        assert.equal(cache.documents.map.size, 3)
    } finally {
        rmSync(dir, { recursive: true, force: true })
    }
})

test('the nearest schema context is authoritative, including missing and malformed schemas', async () => {
    for (const nearest of ['missing', 'invalid', 'file']) {
        const dir = mkdtempSync(join(tmpdir(), 'liana-nearest-context-'))
        try {
            mkdirSync(join(dir, '.liana'))
            mkdirSync(join(dir, 'nested'))
            writeFileSync(join(dir, '.liana', 'schema.slna'), specification())
            const marker = join(dir, 'nested', '.liana')
            if (nearest === 'file') writeFileSync(marker, '')
            else {
                mkdirSync(marker)
                if (nearest === 'invalid') writeFileSync(join(marker, 'schema.slna'), '()')
            }
            const file = join(dir, 'nested', 'empty')
            assert.equal((await load(file, '~'))[0], 'error', nearest)
            assert.equal((await client_load(file, '~'))[0], 'error', nearest)
        } finally {
            rmSync(dir, { recursive: true, force: true })
        }
    }
})

test('embedded current headers select their own path and schema without a filesystem context', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'liana-current-header-'))
    try {
        const file = join(dir, 'export.slna')
        const source = header(specification(), ['nested'], 'empty', '~')
        const loaded = await load(file, source)
        assert.equal(loaded[0], 'success', JSON.stringify(loaded))
        assert.equal(loaded[1][1].content['unmarshall result'][1][0], 'nothing')
        assert.deepEqual(unmarshal_diagnostics.Document(loaded[1][1].unmarshalled).__get_raw(), [])
        const client = await client_load(file, source)
        assert.equal(client[0], 'success', JSON.stringify(client))
        const sealed = seal(source, fail, {
            unmarshall: { type: client[1].type, 'tab size': 1 },
            target: { indentation: '', newline: '' },
        }).__get_raw().join('')
        assert.equal(sealed, '~')
        for (const invalid of [
            source.replace('`path`:', '`old path`:'),
            source.replace('"empty"', '"missing"'),
            source.replace('["nested"]', '[".."]'),
            `! ${specification()}\n~`,
        ]) {
            assert.equal((await load(file, invalid))[0], 'error')
            assert.equal((await client_load(file, invalid))[0], 'error')
        }
    } finally {
        rmSync(dir, { recursive: true, force: true })
    }
})

test('optional fallback is lazy and only handles absence, not failures or unavailable values', () => {
    const tail = { path: { value: p.literal.list([]), result: null } }
    const selection = {
        start: { value: ['optional fallback', {
            selection: { value: ['parameter', { 'l id': 'input' }], result: null },
            fallback: { start: { value: ['parameter', { 'l id': 'fallback' }], result: null }, tail },
        }], result: null },
        tail,
    }
    const seed = { constraints: p.literal.dictionary({}), 'unmarshall result': ['success', ['nothing', null]] }
    for (const status of [
        ['resolved', seed], ['not set', null], ['unavailable', null],
        ['constraint failed', 'invalid'], ['cycle', p.literal.list(['input'])],
    ]) {
        let evaluations = 0
        const fallback = ['resolved', seed]
        const fallback_entry = ['fallback', fallback]
        Object.defineProperty(fallback_entry, 1, { get() { evaluations++; return fallback } })
        const types = { __dictionary: true, __get_raw: () => [['input', status], fallback_entry] }
        const result = runtime.Resolver_Guaranteed_Value_Selection(selection, { lookups: {}, types })
        assert.deepEqual(result, status[0] === 'not set' ? fallback : status)
        assert.equal(evaluations, status[0] === 'not set' ? 1 : 0)
    }
})

test('formatting and JSON conversion consume the current header without losing the body', async () => {
    const source = header(specification(), [], 'settings.cfg.lna', '"hello"')
    const document = TextDocument.create('file:///export.slna', 'liana', 1, source)
    const handler = create_on_document_formatting({
        documents: { get: () => document },
        connection: { console: { log: assert.fail }, window: { showInformationMessage: assert.fail } },
    })
    const edits = handler({ textDocument: { uri: document.uri }, options: { tabSize: 4, insertSpaces: true } })
    assert.equal(edits.length, 1)
    const formatted = TextDocument.applyEdits(document, edits)
    assert.match(formatted, /^!/)
    const loaded = await load('/tmp/liana-format-header.slna', formatted)
    assert.equal(loaded[0], 'success', JSON.stringify(loaded))
    assert.equal(loaded[1][1].content['unmarshall result'][1][1].instance.token.value, 'hello')
    const json = convert_to_json(source, fail, {
        source: { 'document resource identifier': document.uri, 'tab size': 1 },
        target: { indentation: '    ' },
    }).__get_raw().join('\n')
    assert.equal(JSON.parse(json), 'hello')
})

test('optional fallback branches must resolve to the exact same structural target', () => {
    const selection = "(`start`: | `optional fallback` (`selection`: | `parameter` 'input' `fallback`: (`start`: | `parameter` 'fallback' `tail`: (`path`: []))) `tail`: (`path`: []))"
    const source = specification(dictionary('', 'Nothing'))
        .replace("'Nothing': (`parameters`: | `local` (`lookups`: {} `types`: {}))", `'Nothing': (\`parameters\`: | \`local\` (\`lookups\`: {} \`types\`: {
            'input': (\`type\`: (\`location\`: | \`internal\` 'Nothing') \`presence\`: | \`optional\` ~)
            'fallback': (\`type\`: (\`location\`: | \`internal\` 'Nothing') \`presence\`: | \`required\` ~)
        }))`)
    const component = `| \`component\` (\`location\`: | \`internal\` 'Nothing' \`arguments\`: * (\`lookups\`: * {} \`types\`: * {
        'input': | \`optional\` | \`set\` ${selection}
        'fallback': | \`parameter\` 'fallback'
    }) \`constraints\`: _)`
    // A call is placed under a component so the selected parameter target and callee match.
    const full = source
        .replace("'Nothing': (`root value`: | `nothing` ~)", "'Nothing': (`root value`: | `component` (`constraints`: _ `type`: | `internal cyclic` 'Nothing'))")
        .replace("'Nothing': (`root value resolver`: | `nothing` ~)", `'Nothing': (\`root value resolver\`: ${component})`)
    assert.doesNotThrow(() => parse(full))
    assert.throws(() => parse(full.replace("'fallback': (`type`: (`location`: | `internal` 'Nothing')", "'fallback': (`type`: (`location`: | `internal` 'Text')")))
})

test('current generated schema diagnostics describe invalid token syntax explicitly', () => {
    assert.throws(() => Type_Specifier(chars(specification().replace('"cfg"', 'cfg')), error => {
        assert.match(error_message(error), /Invalid|expected/)
        throw error
    }, { 'tab size': 1 }))
    assert.throws(() => Type_Specifier(chars(specification().replace('`directory`:', '`root type`:')), error => {
        assert.match(error_message(error), /Unexpected properties: "root type"; expected properties: "schema", "directory"/)
        assert.doesNotMatch(error_message(error), /FIXME/)
        throw error
    }, { 'tab size': 1 }))
})

test('optional producer results select the declared payload and remain absent when not set', async () => {
    const source = specification(dictionary('', 'Nothing'))
        .replace("'Nothing': (`root value`: | `nothing` ~)", `'Nothing': (\`root value\`: | \`optional\` (
            \`constraints\`: _ \`value\`: | \`component\` (\`type\`: | \`internal\` 'Text' \`constraints\`: _)
            \`result\`: * (\`type\`: (\`location\`: | \`internal\` 'Text') \`path\`: (\`tail\`: []))))`)
        .replace("'Nothing': (`root value resolver`: | `nothing` ~)", `'Nothing': (\`root value resolver\`: | \`optional\` (
            \`constraints\`: _ \`not set constraints\`: _
            \`resolver\`: | \`component\` (\`location\`: | \`internal\` 'Text' \`arguments\`: _ \`constraints\`: _)
            \`result\`: * | \`value\` (\`path\`: [| \`component\` ~])))`)
    const dir = mkdtempSync(join(tmpdir(), 'liana-optional-result-'))
    try {
        for (const [body, status] of [['* "hello"', 'resolved'], ['_', 'not set'], ['* #', 'unavailable']]) {
            const loaded = await load(join(dir, 'document.lna'), header(source, [], 'document.lna', body))
            assert.equal(loaded[0], 'success', JSON.stringify(loaded))
            const optional = loaded[1][1].content['unmarshall result'][1][1]
            assert.equal(optional.result[0], status)
            if (status === 'resolved') assert.equal(optional.result[1]['unmarshall result'][1][0], 'simple')
            assert.deepEqual(resolve_diagnostics.Document(loaded[1][1]).__get_raw(), [])
        }
    } finally {
        rmSync(dir, { recursive: true, force: true })
    }
})

for (const name of ['liana', 'boekhouding']) {
    test(`maintained ${name} authoring fixture parses, resolves, seals and round-trips`, async () => {
        const dir = mkdtempSync(join(tmpdir(), `liana-maintained-${name}-`))
        try {
            const context = readFileSync(new URL('../liana_authoring_environment_template/.liana/schema.slna', import.meta.url), 'utf8')
            const source = readFileSync(new URL(`./fixtures/latest_liana/${name}.liana.lna`, import.meta.url), 'utf8')
            mkdirSync(join(dir, '.liana'))
            writeFileSync(join(dir, '.liana', 'schema.slna'), context)
            const loaded = await load(join(dir, `${name}.liana.lna`), source)
            if (loaded[0] === 'error') assert.fail(JSON.stringify(loaded[1]))
            assert.deepEqual(unmarshal_diagnostics.Document(loaded[1][1].unmarshalled).__get_raw(), [])
            assert.deepEqual(resolve_diagnostics.Document(loaded[1][1]).__get_raw(), [])
            const type = selected(parse(context), [], `${name}.liana.lna`)['l entry']
            const sealed = seal(source, fail, {
                unmarshall: { type, 'tab size': 1 }, target: { indentation: '', newline: '' },
            }).__get_raw().join('')
            const parsed = parse(sealed)
            assert.ok(parsed.schema.structure.types.__get_raw().length > 0)
            const resealed = seal(sealed, fail, {
                unmarshall: { type, 'tab size': 1 }, target: { indentation: '', newline: '' },
            }).__get_raw().join('')
            assert.equal(resealed, sealed)
            assert.deepEqual(sealed_target.Directory(parse(resealed).directory), sealed_target.Directory(parsed.directory))
        } finally {
            rmSync(dir, { recursive: true, force: true })
        }
    })
}
