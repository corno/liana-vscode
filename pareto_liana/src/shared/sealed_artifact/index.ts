import { createHash } from 'node:crypto'
import type * as tree from 'astn-runtime/modules/deserialization/schemas/parse_tree/schema'
import type * as sealed from 'astn-runtime/modules/serialization/schemas/sealed_target/schema'
import type * as paragraph from 'pareto-fountain-pen/modules/paragraph/schemas/paragraph/schema'
import * as p from 'pareto-core/transformer'
import * as sh from 'pareto-fountain-pen/modules/paragraph/schemas/paragraph/shorthands/deprecated'
import * as serializer from 'pareto-fountain-pen/modules/paragraph/schemas/paragraph/serializers'
import * as canonical from './canonical.js'
import { Value as Normalize } from './parse_tree_to_document.js'
import { Value as Sealed_Target } from './document_to_sealed_target.js'
import { Document as Parse } from './parse_document.js'
import list_from_text from 'pareto-core/refiner/specials/list_from_text'
import * as parse_error from 'astn-runtime/modules/deserialization/schemas/parse_tree_deserialization/serializers'

export { Value } from './canonical.js'

export const Canonical_Body = (value: sealed.Value): string => {
    let text = ""
    serializer.Paragraph(
        canonical.Document(value),
        { 'indentation': "", 'newline': "" },
        (chunk) => { text += chunk },
    )
    return text
}

export const Signature = (value: sealed.Value): string =>
    createHash('sha256').update(Canonical_Body(value), 'utf8').digest('hex')

export const Schema_Signature = (body: tree.Value, abort: (message: string) => never): string =>
    Signature(Sealed_Target(Normalize(body, abort)))

export const Inspect_Schema = (text: string, abort: (message: string) => never): {
    readonly 'body signature': string
    readonly 'declared schema signature': string | null
} => {
    const document = Parse(list_from_text(text, ($) => $), error => abort(parse_error.Error(error)), { 'tab size': 4 })
    const declared = p.from.optional(document.header).decide(header => {
        const value = Normalize(header.value, abort)
        if (value.type[0] !== 'group') return abort('Schema header must be a verbose group')
        const properties = value.type[1].properties
        if (p.from.dictionary(properties).convert_to_list(($) => $).__get_raw().length !== 1) {
            return abort('Schema header must contain only schema-signature')
        }
        return p.from.dictionary(properties).get_possible_entry('schema-signature', entry => {
            if (entry.type[0] !== 'text') return abort('Schema signature must be text')
            return entry.type[1]
        }, () => abort('Missing schema-signature'))
    }, () => null)
    return {
        'body signature': Schema_Signature(document.content, abort),
        'declared schema signature': declared,
    }
}

export const Header = (schema_signature: string): paragraph.Phrase =>
    sh.ph.composed([
        sh.ph.text("!"),
        canonical.Value(['group', ['verbose', p.literal.dictionary_from_entries([
            ['schema-signature', ['text', {
                'value': schema_signature,
                'delimiter': ['quote', null],
            }]],
        ])]]),
    ])

export const Document = (content: sealed.Value, schema_signature: string): paragraph.Paragraph =>
    sh.pg.sentences([
        sh.sentence([Header(schema_signature)]),
        sh.sentence([canonical.Value(content)]),
    ])
