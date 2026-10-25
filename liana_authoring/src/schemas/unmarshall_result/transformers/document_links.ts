
import * as p_ from 'pareto-core/transformer'

//schemas
import type * as s_in from "../../../schemas/unmarshall_result/schema.js"
import type * as s_out from "../../../schemas/document_links/schema.js"


namespace declarations_ {

    export type Document = p_.Transformer<
        s_in.Document,
        s_out.Links
    >

    export type Value = p_.Transformer<
        s_in.Value,
        s_out.Links
    >
}

export const Document: declarations_.Document = ($) => Value($.content)

export const Value: declarations_.Value = ($) => p_.from.state($['unmarshall result']).decide(
    ($) => {
        switch ($[0]) {
            case 'error': return p_.option($, ($) => p_.literal.list([]))
            case 'success': return p_.option($, ($) => p_.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'component': return p_.option($, ($) => Value($.value))
                        case 'dictionary': return p_.option($, ($) => p_.from.dictionary($.derived.entries).flatten_to_list(
                            ($, id) => p_.from.state($.result).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'success': return p_.option($, ($) => p_.from.state($.value).decide(
                                            ($) => {
                                                switch ($[0]) {
                                                    case 'set': return p_.option($, ($) => Value($))
                                                    case 'not set': return p_.option($, ($) => p_.literal.list([]))
                                                    default: return p_.exhaustive($[0])
                                                }
                                            }))
                                        case 'error': return p_.option($, ($) => p_.literal.list([]))
                                        default: return p_.exhaustive($[0])
                                    }
                                }
                            )
                        ))
                        case 'group': return p_.option($, ($) => p_.from.state($.derived.style).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'verbose': return p_.option($, ($) => p_.from.list($.properties).flatten(
                                        ($) => p_.from.state($['definition found']).decide(
                                            ($) => {
                                                switch ($[0]) {
                                                    case 'yes': return p_.option($, ($) => p_.from.optional($['value']).decide(
                                                        ($) => Value($),
                                                        () => p_.literal.list([])
                                                    ))
                                                    case 'no': return p_.option($, ($) => p_.literal.list([]))
                                                    default: return p_.exhaustive($[0])
                                                }
                                            }
                                        )
                                    ))
                                    case 'concise': return p_.option($, ($) => p_.from.list($.properties).flatten(
                                        ($) => p_.from.state($['definition found']).decide(
                                            ($) => {
                                                switch ($[0]) {
                                                    case 'no': return p_.option($, ($) => p_.literal.list([]))
                                                    case 'yes': return p_.option($, ($) => Value($['value']))
                                                    default: return p_.exhaustive($[0])
                                                }
                                            }
                                        )
                                    ))
                                    default: return p_.exhaustive($[0])
                                }
                            }))
                        case 'list': return p_.option($, ($) => p_.from.list($.derived.items).flatten(
                            ($) => Value($)
                        ))
                        case 'nothing': return p_.option($, ($) => p_.literal.list([]))
                        case 'optional': return p_.option($, ($) => p_.from.state($.derived.status).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'set': return p_.option($, ($) => Value($['child value']))
                                    case 'not set': return p_.option($, ($) => p_.literal.list([]))
                                    default: return p_.exhaustive($[0])
                                }
                            }
                        ))
                        case 'reference': return p_.option($, ($) => p_.literal.list([]))
                        case 'simple': return p_.option($, ($) => p_.from.optional($.definition.value['l entry'].hyperlink).decide(
                            (link) => p_.literal.list([{
                                range: $.instance.range,
                                target: link.prefix + $.instance.token.value + link.suffix,
                                tooltip: p_.literal.not_set<string>(),
                            }]),
                            () => p_.literal.list([]),
                        ))
                        case 'state': return p_.option($, ($) => p_.from.state($.derived['option status']).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'set': return p_.option($, ($) => Value($.value))
                                    case 'missing data': return p_.option($, ($) => p_.literal.list([]))
                                    default: return p_.exhaustive($[0])
                                }
                            }
                        ))
                        case 'text': return p_.option($, ($) => p_.literal.list([]))
                        default: return p_.exhaustive($[0])
                    }
                }
            ))
            default: return p_.exhaustive($[0])
        }
    })
