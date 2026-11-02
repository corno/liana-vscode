import assert from 'node:assert/strict'
import Module, { createRequire } from 'node:module'
import test from 'node:test'

const require = createRequire(import.meta.url)
const { schema_signature, authoring_schema_signature } = require('pareto-liana/schemas/liana_next_schema/schema_signature')
let selection
let failClipboard = false
let diagnostics = []
const copied = []
const notifications = []
const document = { uri: {} }
const vscode = {
    version: 'test-vscode',
    extensions: { getExtension: () => ({ packageJSON: { version: 'test-extension' } }) },
    env: { clipboard: { writeText: async text => {
        if (failClipboard) throw new Error('Clipboard unavailable')
        copied.push(text)
    } } },
    window: {
        activeTextEditor: { document },
        showErrorMessage: async (message, ...actions) => {
            notifications.push({ message, actions })
            return selection
        },
        showInformationMessage: message => notifications.push({ message }),
    },
    languages: { getDiagnostics: () => diagnostics },
    DiagnosticSeverity: { Error: 0 },
}
const original = Module._load
let reports
let copyDiagnostics
try {
    Module._load = function (id, ...args) {
        return id === 'vscode' ? vscode : original.call(this, id, ...args)
    }
    reports = require('../client/out/helpers/error_report.js')
    copyDiagnostics = require('../client/out/commands/copy_error_report.js').default()
} finally {
    Module._load = original
}

test('error report contains the actual error and version keys, redacting common local paths', () => {
    const report = reports.error_report(
        'Cannot read /home/alice/private/schema.slna or C:\\Users\\Alice\\schema.slna at file:///home/alice/data.lna',
        '1.2.3', '4.5.6',
    )
    assert.match(report, /Cannot read/)
    assert.match(report, /Extension version: 1.2.3/)
    assert.match(report, /VS Code version: 4.5.6/)
    assert.ok(report.includes(schema_signature))
    assert.ok(report.includes(authoring_schema_signature))
    assert.doesNotMatch(report, /alice|Alice|schema\.slna|data\.lna/)
    assert.match(report, /Review before sharing/)
})

test('error notifications copy only when the user selects Copy error report', async () => {
    selection = undefined
    await reports.show_error_message('Example failure')
    assert.deepEqual(notifications.at(-1), { message: 'Example failure', actions: ['Copy error report'] })
    assert.equal(copied.length, 0)
    selection = 'Copy error report'
    await reports.show_error_message('Example failure')
    assert.equal(copied.length, 1)
    assert.match(copied[0], /Example failure/)
    assert.match(notifications.at(-1).message, /nothing was sent/)
    failClipboard = true
    await reports.show_error_message('Example failure')
    assert.match(notifications.at(-1).message, /Could not copy the error report: Clipboard unavailable/)
    assert.deepEqual(notifications.at(-1).actions, [])
    failClipboard = false
})

test('diagnostic errors can be copied explicitly without introducing diagnostic popups', async () => {
    diagnostics = [
        { severity: 0, source: 'schema', range: { start: { line: 2, character: 4 } }, message: 'Incompatible schema key' },
        { severity: 1, message: 'Warning not included' },
    ]
    await copyDiagnostics()
    assert.match(copied.at(-1), /schema \(3:5\): Incompatible schema key/)
    assert.doesNotMatch(copied.at(-1), /Warning not included/)
    diagnostics = []
    const count = copied.length
    await copyDiagnostics()
    assert.equal(copied.length, count)
    assert.match(notifications.at(-1).message, /no error diagnostics/)
})
