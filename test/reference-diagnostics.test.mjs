import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { pathToFileURL, fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'
import test from 'node:test'

const require = createRequire(import.meta.url)
const serverRequire = createRequire(new URL('../server/package.json', import.meta.url))
const { TextDocument } = serverRequire('vscode-languageserver-textdocument')
const { create_cache } = require('../server/out/core/cache.js')
const { create_on_diagnostics } = require('../server/out/connection/on_diagnostics.js')
const { createMessageConnection, StreamMessageReader, StreamMessageWriter } = serverRequire('vscode-jsonrpc/node')
const examplePath = fileURLToPath(new URL('../../newstyle_projects/projects/yabnf/sketch/examples/astn.yabnf.lna', import.meta.url))
const exampleSource = () => {
    const source = readFileSync(examplePath, 'utf8')
    assert.match(source, /'id': \| `terminal` '(Text|Texdt)'/)
    return source.replace(/('id': \| `terminal` )'(Text|Texdt)'/, "$1'Texdt'")
}

test('language server reports Texdt at line 39 and clears it after correction', async () => {
    const path = examplePath
    const uri = pathToFileURL(path).href
    const source = exampleSource()
    const cache = { schemas: create_cache(), documents: create_cache() }
    const documents = new Map()
    const context = {
        cache,
        documents: { get: id => documents.get(id) },
    }
    const report = create_on_diagnostics(context)
    documents.set(uri, TextDocument.create(uri, 'liana', 1, source))
    const first = await report({ textDocument: { uri } })
    const diagnostic = first.items.find(d => d.message.includes('Texdt'))
    assert.ok(diagnostic, JSON.stringify(first))
    assert.equal(diagnostic.source, 'liana-semantic')
    assert.equal(diagnostic.severity, 1)
    assert.deepEqual(diagnostic.range, {
        start: { line: 38, character: 39 }, end: { line: 38, character: 46 },
    })
    documents.set(uri, TextDocument.create(uri, 'liana', 2, source.replace("'Texdt'", "'Text'")))
    const corrected = await report({ textDocument: { uri } })
    assert.ok(!corrected.items.some(d => d.message.includes('Texdt')))
    assert.equal(cache.schemas.map.size, 1)
})

test('bundled server sends the reference error over LSP and clears it on didChange', { timeout: 15000 }, async () => {
    const server = spawn(process.execPath, [new URL('../server/out/server.js', import.meta.url).pathname, '--stdio'], {
        stdio: ['pipe', 'pipe', 'pipe'],
    })
    let stderr = ''
    server.stderr.on('data', chunk => { stderr += chunk })
    const connection = createMessageConnection(new StreamMessageReader(server.stdout), new StreamMessageWriter(server.stdin))
    connection.onRequest('workspace/diagnostic/refresh', () => null)
    connection.listen()
    const uri = pathToFileURL(examplePath).href
    const source = exampleSource()
    try {
        const initialized = await connection.sendRequest('initialize', {
            processId: process.pid, rootUri: null,
            capabilities: { textDocument: { diagnostic: {} }, workspace: { diagnostics: { refreshSupport: true } } },
        })
        assert.ok(initialized.capabilities.diagnosticProvider)
        await connection.sendNotification('initialized', {})
        await connection.sendNotification('textDocument/didOpen', {
            textDocument: { uri, languageId: 'liana', version: 1, text: source },
        })
        const report = await connection.sendRequest('textDocument/diagnostic', { textDocument: { uri } })
        const diagnostic = report.items.find(d => d.message.includes('Texdt'))
        assert.ok(diagnostic, JSON.stringify(report) + stderr)
        assert.equal(diagnostic.severity, 1)
        assert.equal(diagnostic.source, 'liana-semantic')
        assert.deepEqual(diagnostic.range, { start: { line: 38, character: 39 }, end: { line: 38, character: 46 } })
        await connection.sendNotification('textDocument/didChange', {
            textDocument: { uri, version: 2 }, contentChanges: [{ text: source.replace("'Texdt'", "'Text'") }],
        })
        const corrected = await connection.sendRequest('textDocument/diagnostic', { textDocument: { uri } })
        assert.ok(!corrected.items.some(d => d.message.includes('Texdt')))
        await connection.sendRequest('shutdown')
        await connection.sendNotification('exit')
    } finally {
        connection.dispose()
        server.kill()
    }
})
