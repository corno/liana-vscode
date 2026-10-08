import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync, readdirSync, cpSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'
import test from 'node:test'
import { spawn } from 'node:child_process'
import { runInNewContext } from 'node:vm'

const require = createRequire(import.meta.url)
const { prepare_native_schema } = require('../native/out/index.js')
const { TextDocument } = require('../server/node_modules/vscode-languageserver-textdocument')
const { create_cache } = require('../server/out/core/cache.js')
const { create_on_diagnostics } = require('../server/out/connection/on_diagnostics.js')
const { create_on_completion } = require('../server/out/connection/on_completion.js')
const { create_on_did_change_watched_files } = require('../server/out/connection/on_did_change_watched_files.js')
const { createMessageConnection, StreamMessageReader, StreamMessageWriter } = require('../server/node_modules/vscode-jsonrpc/node')
const schema = readFileSync(new URL('../../newstyle_projects/projects/json_schema_light/sketch/definition/schema.liana.lna', import.meta.url), 'utf8')
const value = constraint => `(description: _ comment: _ deprecated: _ readOnly: _ writeOnly: _
    default: _ examples: _ constraint: ${constraint ? '* ' + constraint : '_'})`
const local = id => value(`| ref | local '${id}'`)
const definitions = (values, namespaces = '{}') => `(namespaces: ${namespaces} values: ${values})`
const source = (values, root = '_', namespaces = '{}') =>
    `(schema: _ id: _ defs: ${definitions(values, namespaces)} 'root value': ${root})`

function environment(text = schema) {
    const directory = mkdtempSync(join(tmpdir(), 'liana-native-editor-'))
    mkdirSync(join(directory, '.liana'))
    writeFileSync(join(directory, '.liana/schema.slna'), 'not a legacy schema')
    writeFileSync(join(directory, '.liana/schema.native.slna'), text)
    const uri = pathToFileURL(join(directory, 'instance.lna')).href
    let document
    const context = {
        cache: { schemas: create_cache(), documents: create_cache() },
        documents: { get: id => id === uri ? document : undefined, all: () => [document] },
        'document notation styles': new Map(),
    }
    return {
        directory, uri, context,
        open: (text, version = 1) => document = TextDocument.create(uri, 'liana', version, text),
        dispose: () => rmSync(directory, { recursive: true, force: true }),
    }
}

test('native editor runtime executes local cyclic references and explicit namespace path computations', () => {
    const contract = prepare_native_schema(schema)
    assert.equal(contract.language, 'liana')
    assert.equal(contract.validate(source(`{self: ${local('self')} first: ${local('second')} second: ${local('first')}}`)), undefined)
    assert.equal(contract.validate(source('{}', '* ' + value(
        "| ref | external (namespace: (head: 'base' path: (tail: ['child'])) value: 'leaf')"),
    `{base: ${definitions('{}', `{child: ${definitions(`{leaf: ${value()}}`)}}`)}}`)), undefined)
    assert.deepEqual(contract.validate(source(`{self: ${local('missing')}}`)), {
        type: 'no such entry', id: 'missing', path: ['Reference', 'local'],
    })
})

test('native reference completion applies declared constraints rather than suggesting every dictionary key', () => {
    const schema = readFileSync(new URL('../../newstyle_projects/projects/liana/sketch/examples/sql_query.liana.lna', import.meta.url), 'utf8')
    const text = readFileSync(new URL('../../newstyle_projects/projects/sql_query/sketch/examples/orders.sq.lna', import.meta.url), 'utf8')
    const contract = prepare_native_schema(schema)
    assert.equal(contract.validate(text), undefined)
    const reference = /(`table`:\s*'customers'\s*`field`:\s*)'id'/
    assert.match(text, reference)
    const marker = 'native completion unique key'
    const result = contract.complete(text.replace(reference, "$1'" + marker + "'"), marker)
    assert.deepEqual(result, { candidates: ['id'] })
})

test('native LSP diagnostics use the declared resolver, report the reference token, and clear after correction', async () => {
    const env = environment()
    try {
        const invalid = source(`{self: ${local('missing')}}`)
        const document = env.open(invalid)
        const report = create_on_diagnostics(env.context)
        const errors = (await report({ textDocument: { uri: env.uri } })).items.filter(item => item.severity === 1)
        assert.equal(errors.length, 1, JSON.stringify(errors))
        assert.equal(errors[0].source, 'liana-native-resolver')
        assert.match(errors[0].message, /no such entry.*missing/)
        const offset = invalid.indexOf("'missing'")
        assert.deepEqual(errors[0].range, {
            start: document.positionAt(offset), end: document.positionAt(offset + "'missing'".length),
        })
        env.open(invalid.replace("'missing'", "'self'"), 2)
        assert.deepEqual((await report({ textDocument: { uri: env.uri } })).items.filter(item => item.severity === 1), [])
    } finally {
        env.dispose()
    }
})

test('native local reference completion enumerates only the current values lookup, including self', async () => {
    const env = environment()
    try {
        const text = source(`{self: ${local('')} target: ${value()}}`, '_',
            `{other: ${definitions(`{external: ${value()}}`)}}`)
        const document = env.open(text)
        const offset = text.indexOf("''")
        const result = await create_on_completion(env.context)({
            textDocument: { uri: env.uri }, position: document.positionAt(offset + 1),
        })
        assert.deepEqual(result.items.map(item => item.label).sort(), ['self', 'target'])
        assert.deepEqual(result.items[0].textEdit.range, {
            start: document.positionAt(offset), end: document.positionAt(offset + 2),
        })
        env.open(text.replace("''", '#'), 2)
        const missing = await create_on_completion(env.context)({
            textDocument: { uri: env.uri }, position: document.positionAt(offset),
        })
        assert.deepEqual(missing.items.map(item => item.label).sort(), ['self', 'target'])
        assert.equal(missing.items[0].filterText, '#self')
    } finally {
        env.dispose()
    }
})

test('native client commands create actual contracts and generate ASTN APIs instead of legacy resolved branches', async () => {
    const directory = mkdtempSync(join(tmpdir(), 'liana-native-commands-'))
    const native = readFileSync(new URL('../../newstyle_projects/projects/liana/sketch/examples/identifiers.liana.lna', import.meta.url), 'utf8')
    const messages = []
    const mock = {
        window: {
            activeTextEditor: { document: { getText: () => native, uri: { toString: () => 'file:///schema.liana.lna' } } },
            showOpenDialog: async () => [{ fsPath: directory }],
            showInformationMessage: async message => { messages.push(message); return 'No' },
            showErrorMessage: async message => { messages.push(message) },
        },
        Uri: { file: filename => ({ fsPath: filename }) },
        commands: { executeCommand: async () => {} },
    }
    const command = name => {
        const url = new URL('../client/out/commands/' + name + '.js', import.meta.url)
        const local_require = createRequire(url)
        const module = { exports: {} }
        runInNewContext(readFileSync(url, 'utf8'), {
            exports: module.exports, module, console,
            require: id => id === 'vscode' ? mock : local_require(id),
        }, { filename: url.pathname })
        return module.exports.default
    }
    try {
        await command('initialize_or_update_authoring_environment_with_this_schema')({
            context: { workspaceState: { get: () => ({}), update: async () => {} } },
        })()
        assert.equal(readFileSync(join(directory, '.liana/schema.native.slna'), 'utf8'), native)
        assert.equal(readFileSync(join(directory, '.liana/schema.slna'), 'utf8'), prepare_native_schema(native).syntax)
        rmSync(join(directory, '.liana'), { recursive: true })
        await command('generate_typescript_code_from_this_schema')()()
        const expected = prepare_native_schema(native).typescript
        for (const [filename, content] of expected)
            assert.equal(readFileSync(join(directory, filename), 'utf8'), content, filename)
        assert.deepEqual(readdirSync(join(directory, 'schemas')).sort(),
            ['astn_sealed_target', 'paragraph_serialization', 'serialized_paragraph', 'unresolved'])
        const before = readFileSync(join(directory, 'schemas/unresolved/schema.ts'), 'utf8')
        await command('generate_typescript_code_from_this_schema')()()
        assert.match(messages.at(-1), /empty output directory/)
        assert.equal(readFileSync(join(directory, 'schemas/unresolved/schema.ts'), 'utf8'), before)
    } finally {
        rmSync(directory, { recursive: true, force: true })
    }
})

test('the shipped server runs native diagnostics and completion with only its bundle and an authoring environment', { timeout: 20000 }, async () => {
    const env = environment()
    const server_path = join(env.directory, 'server.cjs')
    cpSync(new URL('../server/out/server.js', import.meta.url), server_path)
    const server = spawn(process.execPath, [server_path, '--stdio'], {
        cwd: env.directory, stdio: ['pipe', 'pipe', 'pipe'],
    })
    let stderr = ''
    server.stderr.on('data', chunk => { stderr += chunk })
    const connection = createMessageConnection(new StreamMessageReader(server.stdout), new StreamMessageWriter(server.stdin))
    connection.onRequest('workspace/diagnostic/refresh', () => null)
    connection.listen()
    try {
        await connection.sendRequest('initialize', {
            processId: process.pid, rootUri: null,
            capabilities: { textDocument: { diagnostic: {} }, workspace: { diagnostics: { refreshSupport: true } } },
        })
        await connection.sendNotification('initialized', {})
        const text = source(`{self: ${local('missing')} target: ${value()}}`)
        const document = env.open(text)
        await connection.sendNotification('textDocument/didOpen', {
            textDocument: { uri: env.uri, languageId: 'liana', version: 1, text },
        })
        const report = await connection.sendRequest('textDocument/diagnostic', { textDocument: { uri: env.uri } })
        assert.equal(report.items.filter(item => item.severity === 1).length, 1, JSON.stringify(report) + stderr)
        assert.equal(report.items.find(item => item.severity === 1).source, 'liana-native-resolver')
        const offset = text.indexOf("'missing'")
        const completion = await connection.sendRequest('textDocument/completion', {
            textDocument: { uri: env.uri }, position: document.positionAt(offset + 1),
        })
        assert.deepEqual(completion.items.map(item => item.label).sort(), ['self', 'target'])
        await connection.sendNotification('textDocument/didChange', {
            textDocument: { uri: env.uri, version: 2 }, contentChanges: [{ text: text.replace("'missing'", "'target'") }],
        })
        assert.deepEqual((await connection.sendRequest('textDocument/diagnostic', { textDocument: { uri: env.uri } })).items
            .filter(item => item.severity === 1), [])
        await connection.sendRequest('shutdown')
        await connection.sendNotification('exit')
    } finally {
        connection.dispose()
        server.kill()
        env.dispose()
    }
})

test('native external reference completion follows namespace selection and excludes ancestor values', async () => {
    const env = environment()
    try {
        const text = source(`{local: ${value()}}`,
            '* ' + value("| ref | external (namespace: (head: 'base' path: (tail: ['child'])) value: '')"),
            `{base: ${definitions(`{parent: ${value()}}`, `{child: ${definitions(`{leaf: ${value()}}`)}}`)}}`)
        const document = env.open(text)
        const result = await create_on_completion(env.context)({
            textDocument: { uri: env.uri }, position: document.positionAt(text.indexOf("''") + 1),
        })
        assert.deepEqual(result.items.map(item => item.label), ['leaf'])
    } finally {
        env.dispose()
    }
})

test('malformed native contracts report schema errors instead of falling back to a valid legacy grammar', async () => {
    const env = environment('not native')
    try {
        writeFileSync(join(env.directory, '.liana/schema.slna'), prepare_native_schema(schema).syntax)
        env.open(source('{}'))
        const errors = (await create_on_diagnostics(env.context)({ textDocument: { uri: env.uri } })).items
        assert.equal(errors.length, 1)
        assert.equal(errors[0].source, 'liana-native-schema')
        assert.match(errors[0].message, /Cannot load native schema/)
    } finally {
        env.dispose()
    }
})

test('a nearest native-only contract overrides an enclosing legacy environment without needing a bootstrap file', async () => {
    const env = environment()
    try {
        const child = join(env.directory, 'child')
        mkdirSync(join(child, '.liana'), { recursive: true })
        writeFileSync(join(child, '.liana/schema.native.slna'), schema)
        writeFileSync(join(env.directory, '.liana/schema.slna'), 'invalid enclosing legacy grammar')
        rmSync(join(env.directory, '.liana/schema.native.slna'))
        const uri = pathToFileURL(join(child, 'instance.lna')).href
        const document = TextDocument.create(uri, 'liana', 1, source(`{self: ${local('self')}}`))
        const context = {
            cache: { schemas: create_cache(), documents: create_cache() },
            documents: { get: id => id === uri ? document : undefined },
            'document notation styles': new Map(),
        }
        const report = await create_on_diagnostics(context)({ textDocument: { uri } })
        assert.deepEqual(report.items.filter(item => item.severity === 1), [])
        assert.equal(context.cache.schemas.map.size, 1)
    } finally {
        env.dispose()
    }
})

test('native schema changes invalidate structural and document caches and refresh diagnostics', async () => {
    const env = environment()
    try {
        env.open(source('{}'))
        const report = create_on_diagnostics(env.context)
        assert.deepEqual((await report({ textDocument: { uri: env.uri } })).items.filter(item => item.severity === 1), [])
        assert.equal(env.context.cache.schemas.map.size, 1)
        let refreshed = 0
        env.context.connection = { console: { log() {} }, languages: { diagnostics: { refresh: () => refreshed++ } } }
        const native_path = join(env.directory, '.liana/schema.native.slna')
        writeFileSync(native_path, 'not native')
        create_on_did_change_watched_files(env.context)({ changes: [{ uri: pathToFileURL(native_path).href, type: 2 }] })
        assert.equal(env.context.cache.schemas.map.size, 0)
        assert.equal(env.context.cache.documents.map.size, 0)
        assert.equal(refreshed, 1)
        assert.equal((await report({ textDocument: { uri: env.uri } })).items[0].source, 'liana-native-schema')
    } finally {
        env.dispose()
    }
})
