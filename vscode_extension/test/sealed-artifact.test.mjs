import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import test from 'node:test'

const require = createRequire(import.meta.url)
const p = require('pareto-core/transformer')
const core = require('pareto-liana/shared/sealed_artifact/index')
const { Document } = require('pareto-liana/temp/astn_document')
const { document_header } = require('pareto-liana/schemas/temp_type_specifier/document_header')
const { Type_Specifier } = require('pareto-liana/schemas/temp_type_specifier/refiners/list_of_characters')
const { file_type } = require('pareto-liana/schemas/temp_type_specifier/file_type')
const { load_applicable_schema } = require('../client/out/to_be_backend/load_applicable_schema.js')
const { seal_artifact } = require('../client/out/helpers/seal.js')
const fail = error => { throw new Error(JSON.stringify(error)) }
const chars = source => p.literal.list(Array.from(source, character => character.codePointAt(0)))
const parse = source => Document(chars(source), fail, { 'tab size': 1 })

test('canonical signatures hash the body, not its formatting or governing header', () => {
    const body = '(`text`: "value" `state`: | `set` ~)'
    const spaced = '( /* comment */ `text` : "value"\n `state` : | `set` ~ )'
    const key = core.Inspect_Schema(body, fail)['body signature']
    assert.equal(key, core.Inspect_Schema(spaced, fail)['body signature'])
    assert.equal(key, createHash('sha256').update('(`text`:"value"`state`:|`set`~)').digest('hex'))
    const inspected = core.Inspect_Schema(`!(\`schema-signature\`:"${'a'.repeat(64)}")${body}`, fail)
    assert.equal(inspected['body signature'], key)
    assert.equal(inspected['declared schema signature'], 'a'.repeat(64))
    for (const invalid of ['< ~ >', '@ "schema.slna"', "('same':~'same':~)", ')']) {
        assert.throws(() => core.Inspect_Schema(invalid, fail))
    }
})

test('the selected path does not enter the governing-schema hash', () => {
    const schema = readFileSync(new URL('./fixtures/latest_liana/.liana/schema.slna', import.meta.url), 'utf8')
    const body = schema.slice(schema.indexOf(')') + 1)
    const key = core.Schema_Signature(parse(schema).content, fail)
    for (const name of ['first.liana.lna', 'second.liana.lna']) {
        const document = parse(`!(\`path\`:(\`directories\`:[]\`file name\`:"${name}")\`schema\`:${body})~`)
        const header = document_header(document, fail).__get_raw()[0]
        assert.equal(core.Schema_Signature(header.schema_body, fail), key)
    }
})

// Canonical body fingerprints from clean_start/test_results/expected/seal_liana.
const cliFixtures = [
    ['astn_schema', 12521, '8c65571bda2f1cffe22530cd90ab7f725c6508b42c6a3d00e18245b0deefb003'],
    ['boekhouding', 58802, 'e52780b928073c049f8f43ecbaa1d325beb5ff9fc8dabf08979da16f52317f18'],
    ['liana', 158395, '8743fe5747ba3999ff1693ffc081084980bac543e513f86c24e6abccfd119ba2'],
    ['pareto', 258149, '4052b573356e101faaccd954b57de017ccd109128073b553e3dcfe92a5d3421f'],
]

for (const [name, bytes, digest] of cliFixtures) {
    test(`editor sealing matches the authoritative CLI canonical body for ${name}`, async () => {
        const context = readFileSync(new URL('./fixtures/latest_liana/.liana/schema.slna', import.meta.url), 'utf8')
        const source = readFileSync(new URL(`./fixtures/latest_liana/${name}.liana.lna`, import.meta.url), 'utf8')
        const specification = Type_Specifier(chars(context), fail, { 'tab size': 1 })[1]
        const type = file_type(specification, {
            directories: p.literal.list([]), 'file name': `${name}.liana.lna`,
        }, fail)['l entry']
        const governing = parse(context).content
        const parameters = { unmarshall: { type, 'tab size': 1 }, target: { indentation: '', newline: '' } }
        const artifact = seal_artifact(source, governing, fail, parameters)
        const body = artifact.slice(artifact.indexOf(')') + 1)
        assert.equal(Buffer.byteLength(body), bytes)
        assert.equal(createHash('sha256').update(body).digest('hex'), digest)
        assert.equal(core.Inspect_Schema(artifact, fail)['declared schema signature'],
            core.Schema_Signature(governing, fail))
        assert.equal(seal_artifact(artifact, governing, fail, parameters), artifact)
        const presealed = `!(\`path\`:(\`directories\`:[]\`file name\`:"${name}.liana.lna")\`schema\`:${context.slice(context.indexOf(')') + 1)})${source}`
        const selected = await new Promise((resolve, reject) => load_applicable_schema(
            { uri: { fsPath: `/unused/${name}.liana.lna` }, getText: () => presealed },
            reject, (specification, selectedType, schemaBody) => resolve({ selectedType, schemaBody }),
        ))
        assert.equal(core.Schema_Signature(selected.schemaBody, fail), core.Schema_Signature(governing, fail))
        assert.equal(selected.selectedType['root value'][0], type['root value'][0])
    })
}
