import { readFileSync } from 'node:fs'
import { Inspect_Schema, Signature } from 'sealed-artifact'
import { Document } from 'artifact-source/parse_document'
import { Value as Normalize } from 'artifact-source/parse_tree_to_document'
import { Value as Sealed_Target } from 'artifact-source/document_to_sealed_target'
import { Authoring_Specification as Unmarshal } from 'liana-generated/implementations/schemas/unresolved/uptransformers/unmarshal'
import { Document_Specification as Marshal } from 'liana-generated/implementations/schemas/unresolved/downtransformers/marshal'
import { Authoring_Specification as Resolve } from 'liana-generated/implementations/schemas/resolved/uptransformers/resolve'
import { Document_Specification as Unresolve } from 'liana-generated/implementations/schemas/resolved/downtransformers/unresolve'
import * as p from 'pareto-core/transformer'
import list_from_text from 'pareto-core/refiner/specials/list_from_text'

const source = process.argv[2]
if (source === undefined) throw new Error('Expected the deployed Liana schema path')
const fail = (message: string): never => { throw new Error(message) }
const text = readFileSync(source, 'utf8')
const inspected = Inspect_Schema(text, fail)
const document = Document(list_from_text(text, $ => $), error => fail(JSON.stringify(error)), { 'tab size': 4 })
const authoring = Resolve(Unmarshal(Normalize(document.content, fail), error => fail(JSON.stringify(error))),
    error => fail(JSON.stringify(error)))
const root = p.from.dictionary(authoring.schema.structure.types).get_possible_entry('Authoring Specification',
    entry => ({ value: { 'l id': 'Authoring Specification', 'l entry': entry }, constraints: { public: null } }),
    () => fail('Missing public Authoring Specification root'))
if (root.value['l entry'].visibility[0] !== 'public') fail('Authoring Specification root must be public')
const governing = Signature(Sealed_Target(Marshal(Unresolve({ schema: authoring.schema, 'root type': root }))))
process.stdout.write(`export const schema_signature = '${inspected['body signature']}'\nexport const authoring_schema_signature = '${governing}'\n`)
