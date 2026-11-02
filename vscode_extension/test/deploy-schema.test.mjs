import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync, rmSync, statSync } from 'node:fs'
import Module, { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'

const require = createRequire(import.meta.url)
const command = 'liana.deploy_schema_to_authoring_environment'

test('schema deployment is contributed and registered under the deploy command', () => {
    const manifest = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))
    assert.deepEqual(manifest.contributes.commands.find(entry => entry.command === command), {
        command, category: 'Liana', title: 'Deploy this Liana schema to an authoring environment...',
    })
    for (const menu of ['editor/context', 'explorer/context']) {
        assert.equal(manifest.contributes.menus[menu].filter(entry => entry.command === command).length, 1)
        assert.doesNotMatch(manifest.contributes.menus[menu].find(entry => entry.command === command).when,
            /resourceFilename|resourceExtname/)
    }
    assert.ok(manifest.contributes.languages.find(language => language.id === 'liana').extensions.includes('.slna'))
    const registration = readFileSync(new URL('../client/src/register_commands.ts', import.meta.url), 'utf8')
    assert.ok(registration.includes(`registerCommand('${command}', deploy_schema_to_authoring_environment(deps))`))
})

test('deployment keeps validation, sealing, remembered destinations and read-only output', async () => {
    const directory = mkdtempSync(join(tmpdir(), 'liana-deploy-'))
    let editor
    let diagnostics = []
    let dialog
    const messages = []
    const errors = []
    const directories = {}
    const rootType = {}
    const schemaBody = {}
    const vscode = {
        window: {
            get activeTextEditor() { return editor },
            showInformationMessage: message => messages.push(message),
            showErrorMessage: message => errors.push(message),
            showOpenDialog: async options => {
                dialog = options
                return [{ fsPath: directory }]
            },
        },
        languages: { getDiagnostics: () => diagnostics },
        DiagnosticSeverity: { Error: 0 },
        Uri: { file: fsPath => ({ fsPath }) },
    }
    const originalLoad = Module._load
    let deploy
    try {
        Module._load = function (id, ...args) {
            if (id === 'vscode') return vscode
            if (id === '../to_be_backend/load_applicable_schema') return {
                load_applicable_schema: (document, abort, success) => success({}, rootType, schemaBody),
            }
            if (id === '../helpers/seal') return {
                seal_artifact: (source, governing, abort, parameters) => {
                    assert.equal(source, 'schema source')
                    assert.equal(governing, schemaBody)
                    assert.equal(parameters.unmarshall.type, rootType)
                    return 'sealed artifact'
                },
            }
            return originalLoad.call(this, id, ...args)
        }
        deploy = require('../client/out/commands/deploy_schema_to_authoring_environment.js').default
    } finally {
        Module._load = originalLoad
    }
    try {
        const run = deploy({ context: { workspaceState: {
            get: key => {
                assert.equal(key, 'liana.authoring_environment_directories')
                return directories
            },
            update: async (key, value) => assert.equal(value, directories),
        } } })
        await run()
        assert.equal(messages.pop(), 'Open a Liana schema file first to deploy it to an authoring environment')
        editor = { document: {
            uri: { toString: () => 'file:///schema.liana.lna' },
            getText: () => 'schema source',
        } }
        diagnostics = [{ severity: vscode.DiagnosticSeverity.Error }]
        await run()
        assert.equal(errors.pop(), 'Cannot deploy schema because the document has errors. Fix them first.')
        assert.equal(dialog, undefined)
        diagnostics = []
        for (let attempt = 0; attempt < 2; attempt += 1) {
            await run()
            const target = join(directory, '.liana', 'schema.slna')
            assert.equal(readFileSync(target, 'utf8'), 'sealed artifact')
            assert.equal(statSync(target).mode & 0o777, 0o444)
            assert.equal(dialog.openLabel, 'Deploy')
            assert.equal(dialog.title, 'Select authoring environment directory to deploy .liana/schema.slna to')
            assert.deepEqual(dialog.defaultUri, attempt === 0 ? undefined : { fsPath: directory })
            assert.equal(directories['file:///schema.liana.lna'], directory)
            assert.equal(messages.pop(), `Schema deployed to ${directory}`)
        }
        assert.deepEqual(errors, [])
    } finally {
        rmSync(directory, { recursive: true, force: true })
    }
})
