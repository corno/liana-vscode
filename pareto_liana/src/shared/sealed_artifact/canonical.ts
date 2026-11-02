import * as p from 'pareto-core/transformer'
import type * as s from 'astn-runtime/modules/serialization/schemas/sealed_target/schema'
import type * as paragraph from 'pareto-fountain-pen/modules/paragraph/schemas/paragraph/schema'
import * as primitives from 'astn-runtime/modules/serialization/schemas/primitives/serializers'
import * as sh from 'pareto-fountain-pen/modules/paragraph/schemas/paragraph/shorthands/deprecated'

export const Document = ($: s.Document): paragraph.Paragraph =>
    sh.pg.sentences([sh.sentence([Value($)])])

export const Value = ($: s.Value): paragraph.Phrase => {
    switch ($[0]) {
        case 'dictionary': return sh.ph.composed([
            sh.ph.text("{"),
            sh.ph.composed(p.from.dictionary($[1]).convert_to_list((value, id) => sh.ph.composed([
                sh.ph.text(primitives.Apostrophed(id, { 'add delimiters': true })),
                sh.ph.text(":"),
                Value(value),
            ]))),
            sh.ph.text("}"),
        ])
        case 'group': return sh.ph.composed([
            sh.ph.text("("),
            sh.ph.composed(p.from.dictionary($[1][1]).convert_to_list((value, id) => sh.ph.composed([
                sh.ph.text(primitives.Backticked(id, { 'add delimiters': true })),
                sh.ph.text(":"),
                Value(value),
            ]))),
            sh.ph.text(")"),
        ])
        case 'list': return sh.ph.composed([
            sh.ph.text("["),
            sh.ph.composed(p.from.list($[1]).map(Value)),
            sh.ph.text("]"),
        ])
        case 'nothing': return sh.ph.text("~")
        case 'optional': return $[1][0] === 'not set'
            ? sh.ph.text("_")
            : sh.ph.composed([sh.ph.text("*"), Value($[1][1])])
        case 'reference': return sh.ph.text(primitives.Apostrophed($[1].value, { 'add delimiters': true }))
        case 'state': return sh.ph.composed([
            sh.ph.text("|"),
            sh.ph.text(primitives.Backticked($[1].option, { 'add delimiters': true })),
            Value($[1].value),
        ])
        case 'text': return sh.ph.text(primitives.Quoted($[1].value, { 'add delimiters': true }))
        default: return p.exhaustive($[0])
    }
}
