import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import Module, { createRequire } from 'node:module'
import test from 'node:test'

const require = createRequire(import.meta.url)
const server_require = createRequire(new URL('../server/package.json', import.meta.url))
const { TextDocument } = server_require('vscode-languageserver-textdocument')
const p = require('pareto-core/transformer')
const { Type_Specifier } = require('pareto-liana/schemas/temp_type_specifier/refiners/list_of_characters')
const { file_type } = require('pareto-liana/schemas/temp_type_specifier/file_type')
const { error_message } = require('pareto-liana/schemas/temp_type_specifier/reader_error')
const { load_document } = require('../server/out/to_be_backend/load_document.js')
const { load_applicable_schema, load_directory_schema } = require('../client/out/to_be_backend/load_applicable_schema.js')
const { file_choices, new_file_name, validate_new_file } = require('../client/out/helpers/new_file_name.js')
const { create_cache } = require('../server/out/core/cache.js')
const unmarshal_diagnostics = require('liana-authoring/schemas/unmarshall_result/transformers/diagnostics')
const resolve_diagnostics = require('liana-authoring/schemas/resolve_result/transformers/diagnostics')
const runtime = require('liana-authoring/schemas/unmarshall_result/transformers/resolve_result')
const sealed_target = require('pareto-liana/modules/schema.generated/schemas/resolved/transformers/astn_sealed_target')
const { $$: seal } = require('../client/out/helpers/seal.js')
const { $$: convert_to_json } = require('../client/out/helpers/convert_to_json.js')
const { create_on_document_formatting } = require('../server/out/connection/on_document_formatting.js')
const { create_on_diagnostics } = require('../server/out/connection/on_diagnostics.js')

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
            'text': (\`type\`: | \`double quoted\` ~ \`regular expression\`: _ \`hyperlink\`: _)
        } \`types\`: {
            'Text': (\`visibility\`: | \`public\` ~ \`root value\`: | \`simple\` 'text')
            'Nothing': (\`visibility\`: | \`public\` ~ \`root value\`: | \`nothing\` ~)
        })
        \`resolver\`: (
            \`declarations\`: (\`namespaces\`: {} \`types\`: {
                'Text': (\`signature\`: | \`local\` (\`lookups\`: {} \`values\`: {}))
                'Nothing': (\`signature\`: | \`local\` (\`lookups\`: {} \`values\`: {}))
            })
            \`implementations\`: (\`namespaces\`: {} \`types\`: {
                'Text': (\`root value resolver\`: | \`simple\` ~)
                'Nothing': (\`root value resolver\`: | \`nothing\` ~)
            })
        )
    )
    \`directory\`: ${directory}
)`
const signature_value = (type, presence) =>
    `(\`value\`: (\`type\`: (\`location\`: | \`local\` '${type}') \`subselection\`: (\`tail\`: [])) \`presence\`: | \`${presence}\` ~)`
const selected = (schema, directories, file) => file_type(schema, {
    directories: p.literal.list(directories), 'file name': file,
}, message => { throw new Error(message) })
const header = (schema, directories, file, body) =>
    `! (\`path\`: (\`directories\`: [${directories.map(directory => JSON.stringify(directory)).join(' ')}] \`file name\`: ${JSON.stringify(file)}) \`schema\`: ${schema})\n${body}`

test('diagnostics settle after an edit invalidates an in-flight document load', { timeout: 5000 }, async () => {
    const directory = mkdtempSync(join(tmpdir(), 'liana-diagnostics-'))
    try {
        mkdirSync(join(directory, '.liana'))
        writeFileSync(join(directory, '.liana/schema.slna'), specification(dictionary('data', 'Text')))
        const uri = pathToFileURL(join(directory, 'document.data.lna')).href
        const cache = fresh_cache()
        let document = TextDocument.create(uri, 'liana', 1, '~')
        const diagnose = create_on_diagnostics({ documents: { get: () => document }, cache })
        const params = { textDocument: { uri } }
        const old_report = diagnose(params)
        assert.equal(cache.documents.map.get(`${uri}@1`)[0], 'pending')

        cache.documents.map.delete(`${uri}@1`)
        document = TextDocument.create(uri, 'liana', 2, '"fixed"')
        const new_report = diagnose(params)
        const [old_diagnostics, new_diagnostics] = await Promise.all([old_report, new_report])

        assert.ok(old_diagnostics.items.length > 0)
        assert.deepEqual(new_diagnostics.items, [])
        assert.equal(cache.documents.map.has(`${uri}@1`), false)
        assert.equal(cache.documents.map.get(`${uri}@2`)[0], 'success')
    } finally {
        rmSync(directory, { recursive: true, force: true })
    }
})

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

test('new-file names use the selected directory extension without duplicating supplied suffixes', () => {
    const schema = parse(specification())
    const directories = p.literal.list(['nested', 'items'])
    assert.deepEqual(file_choices(schema, directories, fail), [{ name: null, extension: 'item' }])
    for (const name of ['my_file', 'my_file.lna', 'my_file.item', 'my_file.item.lna', 'my_file.item.slna']) {
        const filename = new_file_name(name, 'item')
        assert.equal(filename, 'my_file.item.lna')
        assert.doesNotThrow(() => validate_new_file(schema, directories, filename))
    }
    assert.equal(new_file_name('my_file', ''), 'my_file.lna')
    for (const name of ['', ' ', '.', '..', '.lna', '../escape', 'nested/file', 'nested\\file', 'bad\0name']) {
        assert.throws(() => new_file_name(name, 'item'), /filename|Filename/)
    }
    assert.deepEqual(file_choices(schema, p.literal.list([]), fail), [{ name: 'settings', extension: 'cfg' }])
    assert.deepEqual(file_choices(schema, p.literal.list(['nested']), fail), [{ name: 'empty', extension: '' }])
    assert.throws(() => file_choices(parse(specification(`| \`dictionary\` (\`node\`: | \`directory\` ${dictionary('', 'Nothing')})`)), p.literal.list([]), fail), /subdirectories/)
    assert.throws(() => file_choices(schema, p.literal.list(['unknown']), fail), /No such directory/)
})

test('new-file command loads ancestor schemas, creates matching filenames and never overwrites files', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'liana-new-file-'))
    const errors = []
    const opened = []
    const prompts = []
    let input = 'my_file'
    let selected = 'settings.cfg.lna'
    const vscode = {
        Uri: { file: fsPath => ({ fsPath }) },
        FileType: { Directory: 2 },
        workspace: {
            fs: { stat: async () => ({ type: 2 }) },
            openTextDocument: async uri => { opened.push(uri.fsPath); return uri },
        },
        window: {
            showErrorMessage: message => errors.push(message),
            showInputBox: async options => {
                prompts.push(options)
                if (input !== undefined) assert.equal(options.validateInput(input), null)
                return input
            },
            showQuickPick: async items => items.find(item => item.label === selected),
            showTextDocument: async () => {},
        },
    }
    const original_load = Module._load
    let create_file
    try {
        Module._load = function (id, ...args) {
            return id === 'vscode' ? vscode : original_load.call(this, id, ...args)
        }
        create_file = require('../client/out/commands/create_liana_file.js').default()
    } finally {
        Module._load = original_load
    }
    try {
        mkdirSync(join(dir, '.liana'))
        mkdirSync(join(dir, 'nested', 'items'), { recursive: true })
        writeFileSync(join(dir, '.liana', 'schema.slna'), specification())
        const folder = { fsPath: join(dir, 'nested', 'items') }
        await create_file(folder)
        const created = join(folder.fsPath, 'my_file.item.lna')
        assert.equal(readFileSync(created, 'utf8'), '#')
        assert.deepEqual(opened, [created])
        assert.equal(prompts[0].placeHolder, 'my_file.item.lna')
        assert.deepEqual(errors, [])
        writeFileSync(created, 'do not overwrite')
        await create_file(folder)
        assert.match(errors.pop(), /EEXIST/)
        assert.equal(readFileSync(created, 'utf8'), 'do not overwrite')

        input = undefined
        await create_file(folder)
        assert.equal(opened.length, 1)

        // Fixed-name groups offer only declared file nodes, not arbitrary entry names.
        const grouped = specification(tree.replace(
            "'settings': | `file` (`file extension`: \"cfg\" `type`: 'Text')",
            "'settings': | `file` (`file extension`: \"cfg\" `type`: 'Text') 'other': | `file` (`file extension`: \"txt\" `type`: 'Text')",
        ))
        writeFileSync(join(dir, '.liana', 'schema.slna'), grouped)
        await create_file({ fsPath: dir })
        assert.equal(readFileSync(join(dir, 'settings.cfg.lna'), 'utf8'), '#')
        selected = undefined
        await create_file({ fsPath: dir })
        assert.equal(opened.length, 2)

        mkdirSync(join(folder.fsPath, '.liana'))
        await create_file(folder)
        assert.match(errors.pop(), /schema.slna/)
        assert.equal(opened.length, 2)
        assert.deepEqual(errors, [])
    } finally {
        rmSync(dir, { recursive: true, force: true })
    }
})

test('directory schema loading does not fall back past an invalid nearest context', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'liana-directory-context-'))
    try {
        mkdirSync(join(dir, '.liana'))
        mkdirSync(join(dir, 'nested', '.liana'), { recursive: true })
        writeFileSync(join(dir, '.liana', 'schema.slna'), specification())
        writeFileSync(join(dir, 'nested', '.liana', 'schema.slna'), 'invalid')
        const result = await new Promise(resolve => load_directory_schema(
            join(dir, 'nested'), error => resolve(['error', error]), () => resolve(['success']),
        ))
        assert.equal(result[0], 'error')
        assert.equal(result[1]['schema path'], join(dir, 'nested', '.liana', 'schema.slna'))
        assert.equal(result[1].type[0], 'parse schema')
    } finally {
        rmSync(dir, { recursive: true, force: true })
    }
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
    const reformatted = TextDocument.create(document.uri, 'liana', 2, formatted)
    assert.deepEqual(create_on_document_formatting({
        documents: { get: () => reformatted },
        connection: { console: { log: assert.fail }, window: { showInformationMessage: assert.fail } },
    })({ textDocument: { uri: document.uri }, options: { tabSize: 4, insertSpaces: true } }), [])
    const tabbed = TextDocument.applyEdits(reformatted, create_on_document_formatting({
        documents: { get: () => reformatted },
        connection: { console: { log: assert.fail }, window: { showInformationMessage: assert.fail } },
    })({ textDocument: { uri: document.uri }, options: { tabSize: 4, insertSpaces: false } }))
    assert.match(tabbed, /\n\t\S/)
    assert.doesNotMatch(tabbed, /\n /)
    assert.equal(tabbed.replaceAll('\t', '    '), formatted)
    const loaded = await load('/tmp/liana-format-header.slna', formatted)
    assert.equal(loaded[0], 'success', JSON.stringify(loaded))
    assert.equal(loaded[1][1].content['unmarshall result'][1][1].instance.token.value, 'hello')
    const json = convert_to_json(source, fail, {
        source: { 'document resource identifier': document.uri, 'tab size': 1 },
        target: { indentation: '    ' },
    }).__get_raw().join('\n')
    assert.equal(JSON.parse(json), 'hello')
})

const format_text = (source, options = { tabSize: 4, insertSpaces: true }) => {
    const document = TextDocument.create('file:///comments.lna', 'liana', 1, source)
    const edits = create_on_document_formatting({
        documents: { get: () => document },
        connection: { console: { log: assert.fail }, window: { showInformationMessage: assert.fail } },
    })({ textDocument: { uri: document.uri }, options })
    return TextDocument.applyEdits(document, edits)
}

test('formatting keeps comments at every token position', () => {
    const source = `/*c1*/ ! /*c2*/ "hdr" /*c3*/
/*c4*/ ( /*c5*/
    'a' /*c6*/ : /*c7*/ "x" /*c8*/
    'b' /*c9*/ : /*c10*/ | /*c11*/ 'opt' /*c12*/ ~ /*c13*/
    'c': < /*c14*/ "p" /*c15*/ > /*c16*/
    'd': [ /*c17*/ "i" /*c18*/ ] /*c19*/
    'e': { /*c20*/ 'k' /*c21*/ : /*c22*/ * /*c23*/ "v" /*c24*/ } /*c25*/
    'f': _ /*c26*/
    'g': # /*c27*/
    'h': @ /*c28*/ "p.lna" /*c29*/
    'i' /*c30*/
    'j': | /*c31*/ # /*c32*/
) /*c33*/
// c34
`
    const formatted = format_text(source)
    for (let i = 1; i <= 34; i++) {
        assert.match(formatted, new RegExp(`c${i}\\b`), `comment c${i} was lost:\n${formatted}`)
    }
    assert.equal(format_text(formatted), formatted)
})

test('formatting keeps line comments from swallowing the tokens after them', () => {
    const source = `// file header
/* block
   header */

(
    // before a
    'a': "x" // after a
    // between
    'b': { // after brace
    }
    'c': [
        // only comment
    ]
    'd': | 'o' // after option
        "v"
)
// end`
    const expected = `// file header
/* block
   header */
(
    // before a
    \`a\`: "x" // after a
    // between
    \`b\`: { // after brace
    }
    \`c\`: [
        // only comment
    ]
    \`d\`: | \`o\` // after option
        "v"
)
// end`
    assert.equal(format_text(source), expected)
    assert.equal(format_text(expected), expected)
    assert.equal(format_text(source, { tabSize: 4, insertSpaces: false }).replaceAll('\t', '    '), expected)
})

test('optional fallback branches must resolve to the exact same structural target', () => {
    const selection = "(`start`: | `optional fallback` (`selection`: | `parameter` 'input' `fallback`: (`start`: | `parameter` 'fallback' `tail`: (`path`: []))) `tail`: (`path`: []))"
    const source = specification(dictionary('', 'Nothing'))
        .replace("'Nothing': (`signature`: | `local` (`lookups`: {} `values`: {}))", `'Nothing': (\`signature\`: | \`local\` (\`lookups\`: {} \`values\`: {
            'input': ${signature_value('Nothing', 'optional')}
            'fallback': ${signature_value('Nothing', 'required')}
        }))`)
    const component = `| \`component\` (\`location\`: | \`local\` 'Nothing' \`arguments\`: * (\`lookups\`: * {} \`types\`: * {
        'input': | \`optional\` | \`set\` ${selection}
        'fallback': | \`parameter\` 'fallback'
    }) \`constraints\`: _)`
    // A call is placed under a component so the selected parameter target and callee match.
    const full = source
        .replace("'Nothing': (`visibility`: | `public` ~ `root value`: | `nothing` ~)", "'Nothing': (`visibility`: | `public` ~ `root value`: | `component` (`constraints`: _ `type`: | `local cyclic` 'Nothing'))")
        .replace("'Nothing': (`root value resolver`: | `nothing` ~)", `'Nothing': (\`root value resolver\`: ${component})`)
    assert.doesNotThrow(() => parse(full))
    assert.throws(() => parse(full.replace("'fallback': (`value`: (`type`: (`location`: | `local` 'Nothing')", "'fallback': (`value`: (`type`: (`location`: | `local` 'Text')")))
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
        .replace("'Nothing': (`visibility`: | `public` ~ `root value`: | `nothing` ~)", `'Nothing': (\`visibility\`: | \`public\` ~ \`root value\`: | \`optional\` (
            \`constraints\`: _ \`value\`: | \`component\` (\`type\`: | \`local\` 'Text' \`constraints\`: _)
            \`result\`: * (\`type\`: (\`location\`: | \`local\` 'Text') \`path\`: (\`tail\`: []))))`)
        .replace("'Nothing': (`root value resolver`: | `nothing` ~)", `'Nothing': (\`root value resolver\`: | \`optional\` (
            \`presence\`: _ \`constraints\`: _ \`not set constraints\`: _
            \`resolver\`: | \`component\` (\`location\`: | \`local\` 'Text' \`arguments\`: _ \`constraints\`: _)
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

for (const name of ['liana', 'boekhouding', 'pareto_next']) {
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
