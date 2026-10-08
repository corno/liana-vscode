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
const { create_on_completion } = require('../server/out/connection/on_completion.js')
const { createMessageConnection, StreamMessageReader, StreamMessageWriter } = serverRequire('vscode-jsonrpc/node')
const examplePath = fileURLToPath(new URL('../../newstyle_projects/projects/yabnf/sketch/examples/astn.yabnf.lna', import.meta.url))
const exampleSource = () => {
    const source = readFileSync(examplePath, 'utf8')
    assert.match(source, /'id': \| `terminal` '(Text|Texdt)'/)
    return source.replace(/('id': \| `terminal` )'(Text|Texdt)'/, "$1'Texdt'")
        .replace(/('value': \| `nonterminal` )'(Value|Valuke)'/, "$1'Valuke'")
}
const tokenRange = (source, id) => {
    const before = source.slice(0, source.indexOf("'" + id + "'")).split('\n')
    const start = { line: before.length - 1, character: before.at(-1).length }
    return { start, end: { ...start, character: start.character + id.length + 2 } }
}
const correctedSource = source => source.replace("'Texdt'", "'Text'").replace("'Valuke'", "'Value'")
const sqlExampleSource = () => readFileSync(new URL('../../newstyle_projects/projects/sql_query/sketch/examples/orders.sq.lna', import.meta.url), 'utf8')

test('SQL instance completion suggests tables at an empty from reference', async () => {
    const path = fileURLToPath(new URL('../../newstyle_projects/projects/sql_query/sketch/transformers/sql_sketch/tests/fixtures/orders.sq.lna', import.meta.url))
    const uri = pathToFileURL(path).href
    const source = sqlExampleSource().replace(/(`from`:\s*)'[^']*'/, "$1''")
    const document = TextDocument.create(uri, 'liana', 1, source)
    const context = {
        cache: { schemas: create_cache(), documents: create_cache() },
        documents: { get: id => id === uri ? document : undefined },
        'document notation styles': new Map(),
    }
    const offset = source.indexOf("''")
    const result = await create_on_completion(context)({
        textDocument: { uri }, position: document.positionAt(offset + 1),
    })
    assert.deepEqual(result.items.map(item => item.label).sort(), ['countries', 'customers', 'orders'])
    for (const item of result.items) {
        assert.deepEqual(item.textEdit.range, { start: document.positionAt(offset), end: document.positionAt(offset + 2) })
    }
})

test('SQL reference constraints diagnose non-unique foreign-key targets at the field token', async () => {
    const path = fileURLToPath(new URL('../../newstyle_projects/projects/sql_query/sketch/transformers/sql_sketch/tests/fixtures/orders.sq.lna', import.meta.url))
    const uri = pathToFileURL(path).href
    const fixture = sqlExampleSource()
    const statementStart = fixture.indexOf('`statements`:')
    assert.ok(statementStart >= 0)
    const source = fixture.slice(0, statementStart) + '`statements`: []\n)'
    let document = TextDocument.create(uri, 'liana', 1, source)
    const context = {
        cache: { schemas: create_cache(), documents: create_cache() },
        documents: { get: id => id === uri ? document : undefined },
        'document notation styles': new Map(),
    }
    const report = create_on_diagnostics(context)
    assert.deepEqual((await report({ textDocument: { uri } })).items, [])
    const field = /(`table`:\s*'customers'\s*`field`:\s*)'id'/
    assert.match(source, field)
    const invalid = source.replace(field, "$1'name'")
    document = TextDocument.create(uri, 'liana', 2, invalid)
    const errors = (await report({ textDocument: { uri } })).items
    const unique = errors.find(error => error.message.includes('Expected state "yes"'))
    assert.ok(unique, JSON.stringify(errors))
    const offset = invalid.indexOf("'name'")
    assert.deepEqual(unique.range, { start: document.positionAt(offset), end: document.positionAt(offset + 6) })
    assert.equal(unique.severity, 1)
    document = TextDocument.create(uri, 'liana', 3, source)
    assert.deepEqual((await report({ textDocument: { uri } })).items, [])
})

test('SQL list paths complete in their selected table and diagnose only scalar intermediate fields', async () => {
    const path = fileURLToPath(new URL('../../newstyle_projects/projects/sql_query/sketch/transformers/sql_sketch/tests/fixtures/orders.sq.lna', import.meta.url))
    const uri = pathToFileURL(path).href
    const source = sqlExampleSource()
    const originalPath = "( `head`: 'customer_id' `tail`: [ 'country_id' 'name' ] )"
    assert.ok(source.includes(originalPath))
    let document = TextDocument.create(uri, 'liana', 1, source)
    const context = {
        cache: { schemas: create_cache(), documents: create_cache() },
        documents: { get: id => id === uri ? document : undefined },
        'document notation styles': new Map(),
    }
    const report = create_on_diagnostics(context)
    const complete = create_on_completion(context)
    assert.deepEqual((await report({ textDocument: { uri } })).items, [])
    let version = 2
    for (const [path, expected] of [
        ["( `head`: 'absent' `tail`: [  ] )", ['customer_id', 'id', 'total']],
        ["( `head`: 'customer_id' `tail`: [ 'absent' ] )", ['country_id', 'id', 'name']],
        ["( `head`: 'customer_id' `tail`: [ 'country_id' 'absent' ] )", ['id', 'name']],
    ]) {
        const modified = source.replace(originalPath, path)
        document = TextDocument.create(uri, 'liana', version++, modified)
        const offset = modified.indexOf("'absent'")
        const result = await complete({ textDocument: { uri }, position: document.positionAt(offset + 1) })
        assert.deepEqual(result.items.map(item => item.label).sort(), expected)
        for (const item of result.items) {
            assert.equal(item.insertTextFormat, 1)
            assert.deepEqual(item.textEdit.range, { start: document.positionAt(offset), end: document.positionAt(offset + 8) })
        }
    }
    const invalid = source.replace(originalPath, "( `head`: 'customer_id' `tail`: [ 'name' 'id' ] )")
    document = TextDocument.create(uri, 'liana', version++, invalid)
    const errors = (await report({ textDocument: { uri } })).items
    assert.equal(errors.length, 1, JSON.stringify(errors))
    assert.match(errors[0].message, /Expected state "reference".*found "value"/)
    assert.equal(errors[0].severity, 1)
    const offset = invalid.indexOf("'id'", invalid.indexOf("( `head`: 'customer_id' `tail`: [ 'name' 'id' ] )"))
    assert.deepEqual(errors[0].range, { start: document.positionAt(offset), end: document.positionAt(offset + 4) })
    for (const path of ["( `head`: 'customer_id' `tail`: [ 'name' ] )", "( `head`: 'customer_id' `tail`: [ 'country_id' ] )"]) {
        document = TextDocument.create(uri, 'liana', version++, source.replace(originalPath, path))
        assert.deepEqual((await report({ textDocument: { uri } })).items, [])
    }
    document = TextDocument.create(uri, 'liana', version++, source.replace(originalPath, "( `head`: 'total' `tail`: [ 'id' ] )"))
    const scalarHeadErrors = (await report({ textDocument: { uri } })).items
    assert.equal(scalarHeadErrors.length, 1)
    assert.match(scalarHeadErrors[0].message, /Expected state "reference".*found "value"/)
})

test('SQL requires a head selection and completes the unfinished foo projection in the user fixture', async () => {
    const path = fileURLToPath(new URL('../../newstyle_projects/projects/sql_query/sketch/transformers/sql_sketch/tests/fixtures/orders.sq.lna', import.meta.url))
    const uri = pathToFileURL(path).href
    const source = readFileSync(path, 'utf8')
    assert.match(source, /'foo':\s*\(\s*`head`:\s*#/)
    let document = TextDocument.create(uri, 'liana', 1, source)
    const context = {
        cache: { schemas: create_cache(), documents: create_cache() },
        documents: { get: id => id === uri ? document : undefined },
        'document notation styles': new Map(),
    }
    const report = create_on_diagnostics(context)
    const errors = (await report({ textDocument: { uri } })).items
    assert.ok(errors.length > 0, 'A missing head must not be accepted')
    assert.ok(errors.every(error => error.severity === 1))
    const offset = source.indexOf('#', source.indexOf("'foo'"))
    const result = await create_on_completion(context)({ textDocument: { uri }, position: document.positionAt(offset) })
    assert.deepEqual(result.items.map(item => item.label).sort(), ['customer_id', 'id', 'total'])
    const selected = result.items.find(item => item.label === 'id')
    assert.deepEqual(selected.textEdit, {
        range: { start: document.positionAt(offset), end: document.positionAt(offset + 1) }, newText: "'id'",
    })
    document = TextDocument.create(uri, 'liana', 2, source.slice(0, offset) + selected.textEdit.newText + source.slice(offset + 1))
    assert.deepEqual((await report({ textDocument: { uri } })).items, [])
    const example = sqlExampleSource()
    const pathText = "( `head`: 'customer_id' `tail`: [ 'country_id' 'name' ] )"
    for (const invalid of ['[]', '( `tail`: [] )']) {
        document = TextDocument.create(uri, 'liana', 3, example.replace(pathText, invalid))
        assert.ok((await report({ textDocument: { uri } })).items.length > 0, invalid)
    }
})

test('language server diagnoses terminal and cyclic nonterminal typos and clears both after correction', async () => {
    const path = examplePath
    const uri = pathToFileURL(path).href
    const source = exampleSource()
    const cache = { schemas: create_cache(), documents: create_cache() }
    const documents = new Map()
    const context = {
        cache,
        documents: { get: id => documents.get(id) },
        'document notation styles': new Map(),
    }
    const report = create_on_diagnostics(context)
    documents.set(uri, TextDocument.create(uri, 'liana', 1, source))
    const first = await report({ textDocument: { uri } })
    const diagnostic = first.items.find(d => d.message.includes('Texdt'))
    assert.ok(diagnostic, JSON.stringify(first))
    assert.equal(diagnostic.source, 'liana-semantic')
    assert.equal(diagnostic.severity, 1)
    assert.deepEqual(diagnostic.range, tokenRange(source, 'Texdt'))
    const cyclicDiagnostic = first.items.find(d => d.message.includes('Valuke'))
    assert.ok(cyclicDiagnostic)
    assert.equal(cyclicDiagnostic.severity, 1)
    assert.deepEqual(cyclicDiagnostic.range, tokenRange(source, 'Valuke'))
    const completion = create_on_completion(context)
    for (const [id, expected] of [['Texdt', 'Text'], ['Valuke', 'Value']]) {
        const range = tokenRange(source, id)
        const suggestions = await completion({
            textDocument: { uri }, position: { ...range.start, character: range.start.character + 2 },
        })
        const item = suggestions.items.find(item => item.label === expected)
        assert.ok(item, JSON.stringify(suggestions))
        assert.equal(item.kind, 18)
        assert.equal(item.insertTextFormat, 1)
        assert.equal(item.filterText, "'" + expected + "'")
        assert.deepEqual(item.textEdit, { range, newText: "'" + expected + "'" })
    }
    let version = 2
    for (const token of ['#', "''", '"Texdt"']) {
        const offset = source.indexOf("'Texdt'")
        const modified = source.replace("'Texdt'", token)
        const document = TextDocument.create(uri, 'liana', version++, modified)
        documents.set(uri, document)
        const range = { start: document.positionAt(offset), end: document.positionAt(offset + token.length) }
        const suggestions = await completion({ textDocument: { uri }, position: document.positionAt(offset + 1) })
        const item = suggestions.items.find(item => item.label === 'Text')
        assert.ok(item, JSON.stringify(suggestions))
        assert.deepEqual(item.textEdit, { range, newText: "'Text'" })
        assert.equal(item.filterText, token === '#' ? '#Text' : token[0] + 'Text' + token[0])
    }
    documents.set(uri, TextDocument.create(uri, 'liana', version, correctedSource(source)))
    const corrected = await report({ textDocument: { uri } })
    assert.deepEqual(corrected.items, [])
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
        assert.deepEqual(diagnostic.range, tokenRange(source, 'Texdt'))
        const cyclicDiagnostic = report.items.find(d => d.message.includes('Valuke'))
        assert.ok(cyclicDiagnostic, JSON.stringify(report))
        assert.equal(cyclicDiagnostic.severity, 1)
        assert.equal(cyclicDiagnostic.source, 'liana-semantic')
        assert.deepEqual(cyclicDiagnostic.range, tokenRange(source, 'Valuke'))
        let completedSource = source
        for (const [id, expected] of [['Texdt', 'Text'], ['Valuke', 'Value']]) {
            const range = tokenRange(source, id)
            const suggestions = await connection.sendRequest('textDocument/completion', {
                textDocument: { uri }, position: { ...range.start, character: range.start.character + 2 },
            })
            const item = suggestions.items.find(item => item.label === expected)
            assert.ok(item, JSON.stringify(suggestions) + stderr)
            assert.equal(item.kind, 18)
            assert.equal(item.insertTextFormat, 1)
            assert.equal(item.filterText, "'" + expected + "'")
            assert.deepEqual(item.textEdit.range, range)
            const lines = completedSource.split('\n')
            const line = lines[range.start.line]
            lines[range.start.line] = line.slice(0, range.start.character) + item.textEdit.newText + line.slice(range.end.character)
            completedSource = lines.join('\n')
        }
        await connection.sendNotification('textDocument/didChange', {
            textDocument: { uri, version: 2 }, contentChanges: [{ text: completedSource }],
        })
        const corrected = await connection.sendRequest('textDocument/diagnostic', { textDocument: { uri } })
        assert.deepEqual(corrected.items, [])
        const sqlPath = fileURLToPath(new URL('../../newstyle_projects/projects/sql_query/sketch/transformers/sql_sketch/tests/fixtures/orders.sq.lna', import.meta.url))
        const sqlUri = pathToFileURL(sqlPath).href
        const sqlFixture = sqlExampleSource()
        const statementStart = sqlFixture.indexOf('`statements`:')
        assert.ok(statementStart >= 0)
        const sqlSource = sqlFixture.slice(0, statementStart) + '`statements`: []\n)'
        const target = /(`table`:\s*'customers'\s*`field`:\s*)'id'/
        assert.match(sqlSource, target)
        const invalidSql = sqlSource.replace(target, "$1'name'")
        await connection.sendNotification('textDocument/didOpen', {
            textDocument: { uri: sqlUri, languageId: 'liana', version: 1, text: invalidSql },
        })
        const sqlReport = await connection.sendRequest('textDocument/diagnostic', { textDocument: { uri: sqlUri } })
        const unique = sqlReport.items.find(error => error.message.includes('Expected state "yes"'))
        assert.ok(unique, JSON.stringify(sqlReport) + stderr)
        assert.equal(unique.severity, 1)
        assert.equal(unique.source, 'liana-semantic')
        assert.deepEqual(unique.range, tokenRange(invalidSql, 'name'))
        await connection.sendNotification('textDocument/didChange', {
            textDocument: { uri: sqlUri, version: 2 }, contentChanges: [{ text: sqlSource }],
        })
        assert.deepEqual((await connection.sendRequest('textDocument/diagnostic', { textDocument: { uri: sqlUri } })).items, [])
        let sqlVersion = 3
        const originalPath = "( `head`: 'customer_id' `tail`: [ 'country_id' 'name' ] )"
        assert.ok(sqlFixture.includes(originalPath))
        for (const [path, expected, replacement] of [
            ["( `head`: 'absent' `tail`: [  ] )", ['customer_id', 'id', 'total'], 'id'],
            ["( `head`: 'customer_id' `tail`: [ 'absent' ] )", ['country_id', 'id', 'name'], 'name'],
            ["( `head`: 'customer_id' `tail`: [ 'country_id' 'absent' ] )", ['id', 'name'], 'name'],
        ]) {
            let text = sqlFixture.replace(originalPath, path)
            await connection.sendNotification('textDocument/didChange', {
                textDocument: { uri: sqlUri, version: sqlVersion++ }, contentChanges: [{ text }],
            })
            const range = tokenRange(text, 'absent')
            const suggestions = await connection.sendRequest('textDocument/completion', {
                textDocument: { uri: sqlUri }, position: { ...range.start, character: range.start.character + 1 },
            })
            assert.deepEqual(suggestions.items.map(item => item.label).sort(), expected)
            const item = suggestions.items.find(item => item.label === replacement)
            assert.equal(item.insertTextFormat, 1)
            assert.deepEqual(item.textEdit.range, range)
            const document = TextDocument.create(sqlUri, 'liana', sqlVersion, text)
            text = text.slice(0, document.offsetAt(item.textEdit.range.start)) + item.textEdit.newText +
                text.slice(document.offsetAt(item.textEdit.range.end))
            await connection.sendNotification('textDocument/didChange', {
                textDocument: { uri: sqlUri, version: sqlVersion++ }, contentChanges: [{ text }],
            })
            assert.deepEqual((await connection.sendRequest('textDocument/diagnostic', { textDocument: { uri: sqlUri } })).items, [])
        }
        const scalarPath = "( `head`: 'customer_id' `tail`: [ 'name' 'id' ] )"
        const scalarSql = sqlFixture.replace(originalPath, scalarPath)
        await connection.sendNotification('textDocument/didChange', {
            textDocument: { uri: sqlUri, version: sqlVersion++ }, contentChanges: [{ text: scalarSql }],
        })
        const scalarReport = await connection.sendRequest('textDocument/diagnostic', { textDocument: { uri: sqlUri } })
        assert.equal(scalarReport.items.length, 1, JSON.stringify(scalarReport) + stderr)
        const scalarError = scalarReport.items[0]
        assert.match(scalarError.message, /Expected state "reference".*found "value"/)
        assert.equal(scalarError.severity, 1)
        const scalarDocument = TextDocument.create(sqlUri, 'liana', sqlVersion, scalarSql)
        const scalarOffset = scalarSql.indexOf("'id'", scalarSql.indexOf(scalarPath))
        assert.deepEqual(scalarError.range, {
            start: scalarDocument.positionAt(scalarOffset), end: scalarDocument.positionAt(scalarOffset + 4),
        })
        for (const path of ["( `head`: 'customer_id' `tail`: [ 'name' ] )", "( `head`: 'customer_id' `tail`: [ 'country_id' ] )"]) {
            await connection.sendNotification('textDocument/didChange', {
                textDocument: { uri: sqlUri, version: sqlVersion++ }, contentChanges: [{ text: sqlFixture.replace(originalPath, path) }],
            })
            assert.deepEqual((await connection.sendRequest('textDocument/diagnostic', { textDocument: { uri: sqlUri } })).items, [])
        }
        const unfinished = readFileSync(sqlPath, 'utf8')
        const headOffset = unfinished.indexOf('#', unfinished.indexOf("'foo'"))
        assert.ok(headOffset >= 0)
        await connection.sendNotification('textDocument/didChange', {
            textDocument: { uri: sqlUri, version: sqlVersion++ }, contentChanges: [{ text: unfinished }],
        })
        const missingHead = await connection.sendRequest('textDocument/diagnostic', { textDocument: { uri: sqlUri } })
        assert.ok(missingHead.items.length > 0, JSON.stringify(missingHead) + stderr)
        const headDocument = TextDocument.create(sqlUri, 'liana', sqlVersion, unfinished)
        const headSuggestions = await connection.sendRequest('textDocument/completion', {
            textDocument: { uri: sqlUri }, position: headDocument.positionAt(headOffset),
        })
        assert.deepEqual(headSuggestions.items.map(item => item.label).sort(), ['customer_id', 'id', 'total'])
        const headEdit = headSuggestions.items.find(item => item.label === 'id').textEdit
        const finished = unfinished.slice(0, headDocument.offsetAt(headEdit.range.start)) + headEdit.newText +
            unfinished.slice(headDocument.offsetAt(headEdit.range.end))
        await connection.sendNotification('textDocument/didChange', {
            textDocument: { uri: sqlUri, version: sqlVersion++ }, contentChanges: [{ text: finished }],
        })
        assert.deepEqual((await connection.sendRequest('textDocument/diagnostic', { textDocument: { uri: sqlUri } })).items, [])
        await connection.sendRequest('shutdown')
        await connection.sendNotification('exit')
    } finally {
        connection.dispose()
        server.kill()
    }
})
