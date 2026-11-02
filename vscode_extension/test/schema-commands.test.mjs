import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import Module, { createRequire } from 'node:module'
import test from 'node:test'

const require = createRequire(import.meta.url)
const { authoring_schema_signature, schema_signature } = require('pareto-liana/schemas/liana_next_schema/schema_signature')
const { schema_signature_header } = require('pareto-liana/schemas/temp_type_specifier/schema_signature')
const { document_specification_signature } = require('pareto-liana/schemas/liana_next_schema/document_specification')
const { Type_Specifier } = require('pareto-liana/schemas/temp_type_specifier/refiners/list_of_characters')
const p = require('pareto-core/transformer')
const fail = error => { throw new Error(JSON.stringify(error)) }
const context = readFileSync(new URL('./fixtures/latest_liana/.liana/schema.slna', import.meta.url), 'utf8')
const authoring = Type_Specifier(p.literal.list(Array.from(context, c => c.codePointAt(0))), fail, { 'tab size': 1 })[1]
const otherRoot = p.from.dictionary(authoring.schema.structure.types).get_possible_entry('Document Specification',
    entry => ({ constraints: { public: null }, value: { 'l id': 'Document Specification', 'l entry': entry } }), fail)
const documentKey = document_specification_signature({ schema: authoring.schema, 'root type': otherRoot })

let active
let documents = []
let diagnostics = new Map()
const contexts = new Map()
const listeners = {}
const errors = []
const messages = []
const document = (name, text) => ({
    uri: { toString: () => `file:///${name}` },
    getText: () => text,
})
const event = name => listener => {
    listeners[name] = listener
    return { dispose() {} }
}
const vscode = {
    window: {
        get activeTextEditor() { return active === undefined ? undefined : { document: active } },
        showErrorMessage: message => errors.push(message),
        showInformationMessage: message => messages.push(message),
        onDidChangeActiveTextEditor: event('active'),
    },
    workspace: {
        get textDocuments() { return documents },
        openTextDocument: async uri => documents.find(doc => doc.uri.toString() === uri.toString()),
        onDidOpenTextDocument: event('open'),
        onDidCloseTextDocument: event('close'),
        onDidChangeTextDocument: event('change'),
    },
    languages: {
        getDiagnostics: uri => diagnostics.get(uri.toString()) ?? [],
        onDidChangeDiagnostics: event('diagnostics'),
    },
    DiagnosticSeverity: { Error: 0 },
    commands: { executeCommand: async (_command, key, value) => contexts.set(key, value) },
}
const originalLoad = Module._load
let helpers
let publish
let deploy
try {
    Module._load = function (id, ...args) {
        return id === 'vscode' ? vscode : originalLoad.call(this, id, ...args)
    }
    helpers = require('../client/out/helpers/schema_commands.js')
    publish = require('../client/out/commands/publish_schema.js').default()
    deploy = require('../client/out/commands/deploy_schema_to_authoring_environment.js').default()
} finally {
    Module._load = originalLoad
}

test('schema command classification uses only a structurally valid Authoring governing signature', () => {
    assert.notEqual(documentKey, authoring_schema_signature)
    assert.notEqual(schema_signature, authoring_schema_signature)
    assert.equal(helpers.is_authoring_schema(`${schema_signature_header}~`), true)
    assert.equal(helpers.is_authoring_schema(`${schema_signature_header}#`), true)
    for (const text of [
        '~', '!', ')', '!()~', `!('schema-signature':'${authoring_schema_signature}')~`,
        `!(\`schema-signature\`:"${documentKey}")~`,
        `!(\`schema-signature\`:"${schema_signature}")~`,
        `!(\`schema-signature\`:"${'0'.repeat(64)}")~`,
        `${schema_signature_header.replace(')', '`extra`:~)')}~`,
        `${schema_signature_header}"unterminated`,
    ]) assert.equal(helpers.is_authoring_schema(text), false, text)
})

test('schema command visibility updates on open, edits, switches, diagnostics and close', () => {
    const subscriptions = []
    active = document('arbitrary.txt', `${schema_signature_header}~`)
    const misleading = document('wrong.liana.lna', '~')
    documents = [active, misleading]
    helpers.register_schema_command_context({ subscriptions })
    assert.equal(contexts.get('liana.is_authoring_schema'), true)
    assert.deepEqual(contexts.get('liana.authoring_schema_resources'), [active.uri.toString()])
    diagnostics.set(active.uri.toString(), [{ severity: 0 }])
    listeners.diagnostics()
    assert.deepEqual(contexts.get('liana.valid_authoring_schema_resources'), [])
    active = misleading
    listeners.active()
    assert.equal(contexts.get('liana.is_authoring_schema'), false)
    misleading.getText = () => `${schema_signature_header}~`
    listeners.change()
    assert.equal(contexts.get('liana.is_authoring_schema'), true)
    active = undefined
    documents = []
    listeners.close()
    assert.equal(contexts.get('liana.is_authoring_schema'), false)
    assert.deepEqual(contexts.get('liana.authoring_schema_resources'), [])
    documents = [misleading]
    listeners.open()
    assert.deepEqual(contexts.get('liana.authoring_schema_resources'), [misleading.uri.toString()])
    diagnostics = new Map()
})

test('publish is explicitly unimplemented and command guards reject wrong targets and errors', async () => {
    const schema = document('anything.data', `${schema_signature_header}~`)
    const wrong = document('misleading.liana.lna', `!(\`schema-signature\`:"${documentKey}")~`)
    active = wrong
    documents = [schema, wrong]
    await publish()
    assert.match(errors.pop(), /must declare/)
    await deploy()
    assert.match(errors.pop(), /must declare/)
    assert.deepEqual(messages, [])
    await publish(schema.uri)
    assert.match(messages.pop(), /not implemented.*when the repository is hosted.*Nothing has been published/)
    diagnostics.set(schema.uri.toString(), [{ severity: 0 }])
    await publish(schema.uri)
    assert.match(errors.pop(), /document has errors/)
    assert.deepEqual(messages, [])
    diagnostics = new Map()
})

test('schema command contributions hide palette and editor entries and scope Explorer to verified resource URIs', () => {
    const source = readFileSync(new URL('../package.json', import.meta.url), 'utf8')
    assert.equal(source.match(/"commandPalette"\s*:/g).length, 1)
    const manifest = JSON.parse(source)
    for (const command of ['liana.sort_dictionary', 'liana.convert_to_json', 'liana.inline_include', 'liana.extract_root_value']) {
        assert.equal(manifest.contributes.menus.commandPalette.find(item => item.command === command).when, 'false')
    }
    for (const command of ['liana.publish_schema', 'liana.deploy_schema_to_authoring_environment']) {
        for (const menu of ['commandPalette', 'editor/context']) {
            assert.match(manifest.contributes.menus[menu].find(item => item.command === command).when,
                /liana.is_authoring_schema/)
        }
        assert.equal(manifest.contributes.menus['explorer/context'].find(item => item.command === command).when,
            'resource in liana.authoring_schema_resources')
        assert.match(manifest.contributes.commands.find(item => item.command === command).enablement,
            /valid_authoring_schema_resources/)
    }
})
