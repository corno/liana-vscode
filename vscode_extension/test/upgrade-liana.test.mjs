import assert from 'node:assert/strict'
import { cpSync, mkdtempSync, mkdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { spawnSync } from 'node:child_process'
import { createRequire } from 'node:module'
import test from 'node:test'

const require = createRequire(import.meta.url)
const { schema_signature, authoring_schema_signature } = require('pareto-liana/schemas/liana_next_schema/schema_signature')
const { document_specification_signature } = require('pareto-liana/schemas/liana_next_schema/document_specification')
const { Authoring_Specification } = require('pareto-liana/schemas/liana_next_schema/load')
const { file_root } = require('pareto-liana/schemas/temp_type_specifier/file_type')
const p = require('pareto-core/transformer')
const core = require('pareto-liana/shared/sealed_artifact/index')
const { Document } = require('pareto-liana/temp/astn_document')
const list_from_text = require('pareto-core/refiner/specials/list_from_text').default
const fail = message => { throw new Error(JSON.stringify(message)) }

test('upgrade copies the authoritative core and computes the body key before replacing files', () => {
    const root = mkdtempSync(join(tmpdir(), 'liana-upgrade-'))
    const workspace = join(root, 'extension')
    const generated = 'pareto_liana/src/schemas/liana_next_schema'
    const source = join(root, 'clean_start/instance/liana/.liana/schema.slna')
    const template = join(workspace, 'vscode_extension/liana_authoring_environment_template/.liana/schema.slna')
    const fixture = join(workspace, 'vscode_extension/test/fixtures/latest_liana/.liana/schema.slna')
    const input = join(root, 'clean_start/meta/shared/src/liana/liana/model.ts')
    const shared = join(root, 'clean_start/meta/shared/src/sealed_artifact')
    try {
        for (const file of [source, template, fixture, input, join(workspace, generated, 'current_generated/model.ts')]) {
            mkdirSync(dirname(file), { recursive: true })
        }
        writeFileSync(join(workspace, 'upgrade_liana.sh'), readFileSync(new URL('../../upgrade_liana.sh', import.meta.url)))
        cpSync(new URL('../../scripts', import.meta.url), join(workspace, 'scripts'), { recursive: true })
        cpSync(new URL('../../pareto_liana/src/shared/sealed_artifact', import.meta.url), shared, { recursive: true })
        cpSync(new URL('../../pareto_liana/src/schemas/liana_next_schema/current_generated', import.meta.url),
            dirname(input), { recursive: true })
        symlinkSync(new URL('../../pareto_liana/node_modules', import.meta.url).pathname, join(workspace, 'pareto_liana/node_modules'))
        symlinkSync(new URL('../node_modules', import.meta.url).pathname, join(workspace, 'vscode_extension/node_modules'))
        writeFileSync(input, 'promoted model')
        const original = readFileSync(new URL('./fixtures/latest_liana/.liana/schema.slna', import.meta.url), 'utf8')
        const schema = original.replace(authoring_schema_signature, 'a'.repeat(64))
        const expected = `export const schema_signature = '${schema_signature}'\nexport const authoring_schema_signature = '${authoring_schema_signature}'\n`
        writeFileSync(source, schema)
        const run = () => spawnSync('bash', ['./upgrade_liana.sh'], { cwd: workspace, encoding: 'utf8' })
        const upgraded = run()
        assert.equal(upgraded.status, 0, upgraded.stderr)
        const signature = join(workspace, generated, 'schema_signature.ts')
        assert.equal(readFileSync(signature, 'utf8'), expected)
        assert.equal(readFileSync(template, 'utf8'), schema)
        assert.equal(readFileSync(fixture, 'utf8'), schema)
        assert.equal(readFileSync(join(workspace, generated, 'current_generated/model.ts'), 'utf8'), 'promoted model')
        assert.equal(readFileSync(join(workspace, 'pareto_liana/src/shared/sealed_artifact/index.ts'), 'utf8'),
            readFileSync(join(shared, 'index.ts'), 'utf8'))
        for (const invalid of [')', '!(\`schema-signature\`:"invalid")', '< ~ >', '~']) {
            writeFileSync(source, invalid)
            writeFileSync(input, 'unreviewed model')
            const rejected = run()
            assert.notEqual(rejected.status, 0)
            assert.ok(rejected.stderr.length > 0)
            assert.equal(readFileSync(template, 'utf8'), schema)
            assert.equal(readFileSync(signature, 'utf8'), expected)
            assert.equal(readFileSync(join(workspace, generated, 'current_generated/model.ts'), 'utf8'), 'promoted model')
        }
    } finally {
        rmSync(root, { recursive: true, force: true })
    }
})

test('bundled schema contexts and recorded Liana signature stay synchronized', () => {
    for (const file of ['../liana_authoring_environment_template/.liana/schema.slna', './fixtures/latest_liana/.liana/schema.slna']) {
        const source = readFileSync(new URL(file, import.meta.url), 'utf8')
        const document = Document(list_from_text(source, $ => $), fail, { 'tab size': 1 })
        assert.equal(core.Schema_Signature(document.content, fail), schema_signature)
        const authoring = Authoring_Specification(document.content, fail)
        const root = file_root(authoring, { directories: p.literal.list([]), 'file name': 'any.lna' }, fail)
        assert.equal(document_specification_signature({ schema: authoring.schema, 'root type': root }),
            authoring_schema_signature)
        assert.equal(core.Inspect_Schema(source, fail)['declared schema signature'], authoring_schema_signature)
        assert.notEqual(schema_signature, authoring_schema_signature)
    }
})
