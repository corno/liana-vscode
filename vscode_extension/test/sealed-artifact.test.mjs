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
const { file_root } = require('pareto-liana/schemas/temp_type_specifier/file_type')
const { document_specification_signature } = require('pareto-liana/schemas/liana_next_schema/document_specification')
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

test('Document Specification identity includes the selected root, not authoring directory metadata', () => {
    const text = readFileSync(new URL('./fixtures/latest_liana/.liana/schema.slna', import.meta.url), 'utf8')
    const authoring = Type_Specifier(chars(text), fail, { 'tab size': 1 })[1]
    const first = file_root(authoring, { directories: p.literal.list([]), 'file name': 'one' }, fail)
    const second = file_root(authoring, { directories: p.literal.list([]), 'file name': 'two.slna' }, fail)
    const specification = { schema: authoring.schema, 'root type': first }
    const key = document_specification_signature(specification)
    assert.equal(key, 'b712c6086e192d6b2e20527d991a4615470e489839c054365d73873b6a588205')
    assert.equal(key, document_specification_signature({ schema: authoring.schema, 'root type': second }))
    assert.notEqual(key, core.Schema_Signature(parse(text).content, fail))
    const other = p.from.dictionary(authoring.schema.structure.types).get_possible_entry('Document Specification',
        type => ({ value: { 'l id': 'Document Specification', 'l entry': type }, constraints: { public: null } }),
        () => assert.fail('Missing Document Specification type'))
    assert.notEqual(key, document_specification_signature({ schema: authoring.schema, 'root type': other }))
    assert.throws(() => seal_artifact('~', specification, fail, {
        unmarshall: { type: other.value['l entry'], 'tab size': 1 }, target: { indentation: '', newline: '' },
    }), /root type does not match/)
})

// Current CLI invocation outputs; owner-managed expected snapshots are not yet promoted.
const cliFixtures = [
    ['astn_schema', 12471, '28b991928416c1804eaaf3a465aebf5a7cb3571c3715d34367345998cd4f7bc1'],
    ['boekhouding', 58772, 'c8c734aea6d9717dc3f147df1c90cd8dd6186a812c65e2522911d189b09a6202'],
    ['liana', 159809, '8e63bc9d414ee6f6ae84b46aa8b91607afbbfc2020acaea254f8cafbec2f6f0d'],
    ['pareto', 258127, '0d155e608569cbd8cb1ba890dc7079597a1adf9abe09a428175fb7d9fcf9a2cd'],
]

for (const [name, bytes, digest] of cliFixtures) {
    test(`editor sealing matches the authoritative CLI canonical body for ${name}`, async () => {
        const context = readFileSync(new URL('./fixtures/latest_liana/.liana/schema.slna', import.meta.url), 'utf8')
        const source = readFileSync(new URL(`./fixtures/latest_liana/${name}.liana.lna`, import.meta.url), 'utf8')
        const specification = Type_Specifier(chars(context), fail, { 'tab size': 1 })[1]
        const root = file_root(specification, {
            directories: p.literal.list([]), 'file name': `${name}.liana.lna`,
        }, fail)
        const type = root.value['l entry']
        const governing = { schema: specification.schema, 'root type': root }
        const parameters = { unmarshall: { type, 'tab size': 1 }, target: { indentation: '', newline: '' } }
        const artifact = seal_artifact(source, governing, fail, parameters)
        const body = artifact.slice(artifact.indexOf(')') + 1)
        assert.equal(Buffer.byteLength(body), bytes)
        assert.equal(createHash('sha256').update(body).digest('hex'), digest)
        assert.equal(core.Inspect_Schema(artifact, fail)['declared schema signature'],
            document_specification_signature(governing))
        assert.equal(seal_artifact(artifact, governing, fail, parameters), artifact)
        const presealed = `!(\`path\`:(\`directories\`:[]\`file name\`:"${name}.liana.lna")\`schema\`:${context.slice(context.indexOf(')') + 1)})${source}`
        const selected = await new Promise((resolve, reject) => load_applicable_schema(
            { uri: { fsPath: `/unused/${name}.liana.lna` }, getText: () => presealed },
            reject, (specification, selectedType, schemaBody) => resolve({ selectedType, schemaBody }),
        ))
        assert.equal(core.Schema_Signature(selected.schemaBody, fail), core.Schema_Signature(parse(context).content, fail))
        assert.equal(selected.selectedType['root value'][0], type['root value'][0])
    })
}
