import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync, readdirSync, cpSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'
import test from 'node:test'
import { spawn } from 'node:child_process'
import { runInNewContext } from 'node:vm'
import { boekhoudingYears } from './fixtures/boekhouding-years.mjs'

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
const sysml_directory = new URL('../../newstyle_projects/projects/liana/sketch/temp/lioncore/', import.meta.url)
const sysml_schema = readFileSync(new URL('.liana/schema.slna', sysml_directory), 'utf8')
const sysml = readFileSync(new URL('sysml.lna', sysml_directory), 'utf8')
const boekhouding_schema = readFileSync(new URL('../../newstyle_projects/projects/liana/sketch/examples/boekhouding.liana.lna', import.meta.url), 'utf8')
const boekhouding = readFileSync(new URL('fixtures/boekhouding.lna', import.meta.url), 'utf8')

function environment(text = schema) {
    const directory = mkdtempSync(join(tmpdir(), 'liana-native-editor-'))
    mkdirSync(join(directory, '.liana'))
    writeFileSync(join(directory, '.liana/schema.to_be_removed.slna'), 'not a legacy schema')
    writeFileSync(join(directory, '.liana/schema.slna'), text)
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

test('SysML LSP loads its native environment and reports missing targets at the edited token', async () => {
    const env = environment(sysml_schema)
    try {
        env.open(sysml)
        const report = create_on_diagnostics(env.context)
        assert.deepEqual((await report({ textDocument: { uri: env.uri } })).items.filter(item => item.severity === 1), [])
        const invalid = sysml.replace("'IElement'", "'MissingSysMLEntity'")
        const document = env.open(invalid, 2)
        const errors = (await report({ textDocument: { uri: env.uri } })).items.filter(item => item.severity === 1)
        assert.equal(errors.length, 1, JSON.stringify(errors))
        assert.equal(errors[0].source, 'liana-native-resolver')
        assert.match(errors[0].message, /no such entry.*MissingSysMLEntity/)
        const offset = invalid.indexOf("'MissingSysMLEntity'")
        assert.deepEqual(errors[0].range, {
            start: document.positionAt(offset), end: document.positionAt(offset + "'MissingSysMLEntity'".length),
        })
        env.open(sysml, 3)
        assert.deepEqual((await report({ textDocument: { uri: env.uri } })).items.filter(item => item.severity === 1), [])
    } finally {
        env.dispose()
    }
})

test('SysML LSP completion respects local cyclic, acyclic and external reference scopes', async () => {
    const env = environment(sysml_schema)
    try {
        const complete = create_on_completion(env.context)
        let version = 0
        const at = async (pattern, replacement) => {
            assert.match(sysml, pattern)
            const text = sysml.replace(pattern, replacement)
            const document = env.open(text, ++version)
            const offset = text.indexOf("''")
            assert.ok(offset >= 0)
            const result = await complete({
                textDocument: { uri: env.uri }, position: document.positionAt(offset + 1),
            })
            assert.deepEqual(result.items[0].textEdit.range, {
                start: document.positionAt(offset), end: document.positionAt(offset + 2),
            })
            return result.items.map(item => item.label).sort()
        }
        const start = performance.now()
        const cyclic = await at(/(`local cyclic`\s*<\s*)'IElement'/, "$1''")
        assert.equal(cyclic.length, 222)
        assert.ok(cyclic.includes('Subclassification'))
        assert.ok(cyclic.includes('IElement'))
        assert.ok(!cyclic.includes('Boolean'))
        assert.ok(performance.now() - start < 5000, 'SysML completion should finish within five seconds')
        const acyclic = await at(/(`local`\s*<\s*)'IElement'/, "$1''")
        assert.ok(acyclic.includes('IElement'))
        assert.ok(!acyclic.includes('Subclassification'), 'acyclic self-reference must not be suggested')
        assert.deepEqual(await at(/(`external`\s*<\s*)'types' 'Boolean'/, "$1'' 'Boolean'"), ['types'])
        assert.deepEqual(await at(/(`external`\s*<\s*'types'\s*)'Boolean'/, "$1''"),
            ['Boolean', 'Integer', 'Real', 'String'])
    } finally {
        env.dispose()
    }
})

test('Boekhouding LSP resolves fiscal and ledger references and clears scoped errors after correction', async () => {
    const env = environment(boekhouding_schema)
    try {
        const report = create_on_diagnostics(env.context)
        env.open(boekhouding)
        assert.deepEqual((await report({ textDocument: { uri: env.uri } })).items.filter(item => item.severity === 1), [])
        let version = 1
        for (const [original, replacement, id] of [
            ["'bezittingen' 'geld'", "'onbekend' 'geld'", 'onbekend'],
            ["'bezittingen' 'geld'", "'bezittingen' 'ontbrekende balanspost'", 'ontbrekende balanspost'],
            ["'uitgaven' 'inkoop'", "'uitgaven' 'ontbrekende resultaatpost'", 'ontbrekende resultaatpost'],
            ["'activa' 'liquide'", "'activa' 'ontbrekende balanscategorie'", 'ontbrekende balanscategorie'],
            ["'kosten' 'advies'", "'kosten' 'ontbrekende kostencategorie'", 'ontbrekende kostencategorie'],
            ["| `Ja` < 'beperkt aftrekbaar'", "| `Ja` < 'onbekende correctie'", 'onbekende correctie'],
        ]) {
            assert.ok(boekhouding.includes(original), original)
            const text = boekhouding.replace(original, replacement)
            const document = env.open(text, ++version)
            const errors = (await report({ textDocument: { uri: env.uri } })).items.filter(item => item.severity === 1)
            assert.equal(errors.length, 1, JSON.stringify(errors))
            assert.equal(errors[0].source, 'liana-native-resolver')
            assert.ok(errors[0].message.includes(JSON.stringify(id)), errors[0].message)
            const offset = text.indexOf(replacement) + replacement.indexOf("'" + id + "'")
            assert.deepEqual(errors[0].range, {
                start: document.positionAt(offset), end: document.positionAt(offset + id.length + 2),
            })
            env.open(boekhouding, ++version)
            assert.deepEqual((await report({ textDocument: { uri: env.uri } })).items.filter(item => item.severity === 1), [])
        }
    } finally {
        env.dispose()
    }
})

test('Boekhouding diagnoses a subcategory from the wrong fiscal parent without inventing an ambiguous token range', async () => {
    const env = environment(boekhouding_schema)
    try {
        env.open(boekhouding.replace("'bezittingen' 'geld'", "'bezittingen' 'leningen'"))
        const errors = (await create_on_diagnostics(env.context)({ textDocument: { uri: env.uri } })).items
            .filter(item => item.severity === 1)
        assert.equal(errors.length, 1)
        assert.equal(errors[0].source, 'liana-native-resolver')
        assert.match(errors[0].message, /no such entry.*leningen/)
        assert.deepEqual(errors[0].range, {
            start: { line: 0, character: 0 }, end: { line: 0, character: 1 },
        })
    } finally {
        env.dispose()
    }
})

test('Boekhouding reference completion follows selected fiscal and ledger categories', async () => {
    const env = environment(boekhouding_schema)
    try {
        const complete = create_on_completion(env.context)
        let version = 0
        for (const [original, replacement, expected] of [
            ["'bezittingen' 'geld'", "'' 'geld'", ['bezittingen']],
            ["'bezittingen' 'geld'", "'bezittingen' ''", ['geld', 'voorraad']],
            ["'schulden' 'leningen'", "'schulden' ''", ['leningen']],
            ["'uitgaven' 'inkoop'", "'uitgaven' ''", ['diensten', 'inkoop']],
            ["'inkomsten' 'omzet'", "'inkomsten' ''", ['omzet']],
            ["'activa' 'liquide'", "'activa' ''", ['goederen', 'liquide']],
            ["'passiva' 'lening'", "'passiva' ''", ['lening']],
            ["'kosten' 'advies'", "'kosten' ''", ['aankopen', 'advies']],
            ["'opbrengsten' 'verkoop'", "'opbrengsten' ''", ['verkoop']],
            ["| `Ja` < 'beperkt aftrekbaar'", "| `Ja` < ''", ['beperkt aftrekbaar', 'niet aftrekbaar']],
        ]) {
            assert.ok(boekhouding.includes(original), original)
            const text = boekhouding.replace(original, replacement)
            const document = env.open(text, ++version)
            const offset = text.indexOf("''")
            const result = await complete({
                textDocument: { uri: env.uri }, position: document.positionAt(offset + 1),
            })
            assert.deepEqual(result.items.map(item => item.label).sort(), expected, original)
            for (const item of result.items) {
                assert.deepEqual(item.textEdit.range, {
                    start: document.positionAt(offset), end: document.positionAt(offset + 2),
                })
                assert.equal(item.textEdit.newText, "'" + item.label + "'")
            }
        }
    } finally {
        env.dispose()
    }
})

test('multi-year Boekhouding resolves every transaction and mutation state and rejects missing or wrong-scope targets', () => {
    const contract = prepare_native_schema(boekhouding_schema)
    assert.equal(contract.validate(boekhoudingYears), undefined)
    for (const [original, replacement, id] of [
        ["| `Nee` < '2024' >", "| `Nee` < 'missing-year' >", 'missing-year'],
        ["| `Nee` < 'zakelijk' >", "| `Nee` < 'missing-bank' >", 'missing-bank'],
        ["| `Nee` < 'prive' >", "| `Nee` < 'missing-informal' >", 'missing-informal'],
        ["| `Nee` < 'voorraad' >", "| `Nee` < 'missing-stock' >", 'missing-stock'],
        ["'advieskosten' { 'maart'", "'missing-account' { 'maart'", 'missing-account'],
        ["'bank' 'bank' 'bank' 'bank' 'bank'", "'missing-balance' 'bank' 'bank' 'bank' 'bank'", 'missing-balance'],
        ["30 'kwartaal'", "30 'missing-vat-period'", 'missing-vat-period'],
        ["| `Inkoop (met crediteur)` < 'leverancier'", "| `Inkoop (met crediteur)` < 'missing-supplier'", 'missing-supplier'],
        ["| `Loonheffing` < 'maart'", "| `Loonheffing` < 'missing-payroll'", 'missing-payroll'],
        ["| `Salaris` < 'maart' 'medewerker'", "| `Salaris` < 'maart' 'missing-employee'", 'missing-employee'],
        ["| `Rekening courant` < 'prive'", "| `Rekening courant` < 'missing-current'", 'missing-current'],
        ["| `Balans` < 'voorraad'", "| `Balans` < 'missing-item'", 'missing-item'],
        ["| `Kosten` < 'advieskosten'", "| `Kosten` < 'missing-expense'", 'missing-expense'],
        ["'klant' | `Project`", "'missing-customer' | `Project`", 'missing-customer'],
        ["| `Project` < 'project' 'offerte'", "| `Project` < 'ander project' 'offerte'", 'ander project'],
        ["'project' 'offerte'", "'project' 'andere offerte'", 'andere offerte'],
        ["| `Project` < 'mijlpaal'", "| `Project` < 'andere mijlpaal'", 'andere mijlpaal'],
        ["| `Licentieovereenkomst` < 'licentie'", "| `Licentieovereenkomst` < 'andere licentie'", 'andere licentie'],
        ["| `Licentieovereenkomst` < 'periode'", "| `Licentieovereenkomst` < 'andere periode'", 'andere periode'],
        ["| `Standaard` < 'standaard'", "| `Standaard` < 'missing-vat'", 'missing-vat'],
        ["| `Opbrengsten` < 'verkopen'", "| `Opbrengsten` < 'missing-revenue'", 'missing-revenue'],
        ["| `Inkoop` 'factuur'", "| `Inkoop` 'missing-purchase'", 'missing-purchase'],
        ["| `Verkoop` 'projectfactuur'", "| `Verkoop` 'missing-sale'", 'missing-sale'],
        ["| `BTW-periode` 'kwartaal'", "| `BTW-periode` 'missing-period'", 'missing-period'],
        ["| `Informele rekening` < 'prive'", "| `Informele rekening` < 'missing-private'", 'missing-private'],
        ["| `Verrekenpost` < 'verrekening'", "| `Verrekenpost` < 'missing-settlement'", 'missing-settlement'],
        ["* '2024' | `Verkoop`", "* 'missing-previous' | `Verkoop`", 'missing-previous'],
    ]) {
        assert.ok(boekhoudingYears.includes(original), original)
        const error = contract.validate(boekhoudingYears.replace(original, replacement))
        assert.ok(error, original)
        assert.equal(error.id, id, JSON.stringify(error))
        assert.ok(['no such entry', 'no benchmark entry'].includes(error.type), JSON.stringify(error))
    }
    const selfCycle = boekhoudingYears.replace("| `Nee` < '2024' >", "| `Nee` < '2025' >")
    assert.equal(contract.validate(selfCycle)?.type, 'cycle detected')
    const mutualCycle = boekhoudingYears.replace('| `Ja` ~\n    <', "| `Nee` < '2025' >\n    <")
    assert.notEqual(mutualCycle, boekhoudingYears)
    assert.equal(contract.validate(mutualCycle)?.type, 'cycle detected')
    assert.equal(contract.validate(boekhoudingYears.replace("'standaard': ~", "'authored-vat-key': ~")), undefined,
        'VAT-period category dictionary keys have no declared benchmark/reference constraint')
})

test('multi-year Boekhouding completion follows customer, project, quotation, license and year scopes', async () => {
    const env = environment(boekhouding_schema)
    try {
        const complete = create_on_completion(env.context)
        let version = 0
        for (const [original, replacement, expected] of [
            ["| `Project` < 'project' 'offerte'", "| `Project` < '' 'offerte'", ['project']],
            ["'project' 'offerte'", "'project' ''", ['offerte']],
            ["| `Project` < 'mijlpaal'", "| `Project` < ''", ['mijlpaal']],
            ["| `Licentieovereenkomst` < 'licentie'", "| `Licentieovereenkomst` < ''", ['licentie']],
            ["| `Licentieovereenkomst` < 'periode'", "| `Licentieovereenkomst` < ''", ['periode']],
            ["| `Inkoop (met crediteur)` < 'leverancier'", "| `Inkoop (met crediteur)` < ''", ['leverancier']],
            ["| `Salaris` < 'maart' 'medewerker'", "| `Salaris` < 'maart' ''", ['medewerker']],
            ["| `BTW-periode` 'kwartaal'", "| `BTW-periode` ''", ['kwartaal', 'open']],
            ["| `Inkoop` 'factuur'", "| `Inkoop` ''", ['bon', 'factuur', 'loonheffing', 'salaris']],
            ["| `Verkoop` 'projectfactuur'", "| `Verkoop` ''", ['licentiefactuur', 'projectfactuur']],
            ["| `Nee` < '2024' >", "| `Nee` < '' >", ['2024']],
            ["* '2024' | `Verkoop`", "* '' | `Verkoop`", ['2024']],
        ]) {
            assert.ok(boekhoudingYears.includes(original), original)
            const text = boekhoudingYears.replace(original, replacement)
            const document = env.open(text, ++version)
            const result = await complete({
                textDocument: { uri: env.uri }, position: document.positionAt(text.indexOf("''") + 1),
            })
            assert.deepEqual(result.items.map(item => item.label).sort(), expected, original)
        }
    } finally {
        env.dispose()
    }
})

test('optional year selection completes purchases, sales and VAT from the prior year rather than current-year parameters', () => {
    const contract = prepare_native_schema(boekhouding_schema)
    for (const [option, id] of [
        ['Inkoop', 'factuur'], ['Verkoop', 'licentiefactuur'], ['BTW-periode', 'kwartaal'],
    ]) {
        const start = boekhoudingYears.indexOf("'2024':")
        const end = boekhoudingYears.indexOf("'2025':")
        const text = boekhoudingYears.slice(0, start)
            + boekhoudingYears.slice(start, end).replaceAll("'" + id + "'", "'historische " + id + "'")
            + boekhoudingYears.slice(end).replace("* '2024' | `Verkoop` 'licentiefactuur'",
                "* '2024' | `" + option + "` 'completion-marker'")
        const result = contract.complete(text, 'completion-marker')
        assert.ok(result.candidates.includes('historische ' + id), option)
        assert.ok(!result.candidates.includes(id), option + ' must exclude the current-year-only target')
        assert.equal(contract.validate(text.replace("'completion-marker'", "'historische " + id + "'")), undefined)
        assert.equal(contract.validate(text.replace("'completion-marker'", "'" + id + "'"))?.type, 'no such entry')
    }
})

test('optional sibling selectors reject non-optional properties during native generation', () => {
    const invalid = boekhouding_schema.replaceAll(
        "| `optional sibling` < 'Jaar'", "| `optional sibling` < 'type'",
    )
    assert.notEqual(invalid, boekhouding_schema)
    assert.throws(() => prepare_native_schema(invalid), /optional sibling requires optional value and resolver/)
})

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
        assert.equal(readFileSync(join(directory, '.liana/schema.slna'), 'utf8'), native)
        assert.equal(readFileSync(join(directory, '.liana/schema.to_be_removed.slna'), 'utf8'), prepare_native_schema(native).syntax)
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

for (const fixture of [
    {
        name: 'native JSL', schema, text: source(`{self: ${local('missing')} target: ${value()}}`),
        corrected: 'target', count: 2, included: ['self', 'target'],
    },
    {
        name: 'SysML', schema: sysml_schema, text: sysml.replace("'IElement'", "'missing'"),
        corrected: 'IElement', count: 222, included: ['IElement', 'Subclassification'],
    },
    {
        name: 'Boekhouding', schema: boekhouding_schema,
        text: boekhouding.replace("'bezittingen' 'geld'", "'bezittingen' 'missing'"),
        corrected: 'geld', count: 2, included: ['geld', 'voorraad'],
    },
    {
        name: 'multi-year Boekhouding', schema: boekhouding_schema,
        text: boekhoudingYears.replace("| `Project` < 'mijlpaal'", "| `Project` < 'missing'"),
        corrected: 'mijlpaal', count: 1, included: ['mijlpaal'],
    },
]) {
test(`the shipped server runs ${fixture.name} diagnostics and completion without the checkout`, { timeout: 20000 }, async () => {
    const env = environment(fixture.schema)
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
        const text = fixture.text
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
        const labels = completion.items.map(item => item.label)
        assert.equal(labels.length, fixture.count)
        for (const id of fixture.included) assert.ok(labels.includes(id), id)
        await connection.sendNotification('textDocument/didChange', {
            textDocument: { uri: env.uri, version: 2 }, contentChanges: [{ text: text.replace("'missing'", "'" + fixture.corrected + "'") }],
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
}

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
        writeFileSync(join(env.directory, '.liana/schema.to_be_removed.slna'), prepare_native_schema(schema).syntax)
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
        writeFileSync(join(child, '.liana/schema.slna'), schema)
        writeFileSync(join(env.directory, '.liana/schema.to_be_removed.slna'), 'invalid enclosing legacy grammar')
        rmSync(join(env.directory, '.liana/schema.slna'))
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
        const native_path = join(env.directory, '.liana/schema.slna')
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
