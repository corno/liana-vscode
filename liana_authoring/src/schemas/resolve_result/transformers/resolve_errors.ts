
import * as p_ from 'pareto-core/transformer'

//schemas
import type * as s_in from "../../../schemas/resolve_result/schema.js"
import type * as s_out from "../../../schemas/resolve_errors/schema.js"
import type * as s_location from "astn-runtime/modules/deserialization/schemas/location/schema"
import * as full_range from "astn-runtime/modules/deserialization/schemas/parse_tree/transformers/full_value_range"



namespace declarations_ {

    export type Document = p_.Transformer<
        s_in.Document,
        s_out.Errors
    >

    export type Value = p_.Transformer<
        s_in.Value,
        s_out.Errors
    >
}

export const Document: declarations_.Document = ($) => {
    return Value(
        $.content
    )
}

const Selection = ($: s_in.Selection, range: s_location.Range): s_out.Errors => {
    switch ($[0]) {
        case 'constraint failed': return p_.literal.list([{
            'range': range,
            'severity': ['error', null],
            'type': $,
        }])
        case 'cycle': return p_.literal.list([{
            'range': range, 'severity': ['error', null], 'type': ['reference cycle', $[1]],
        }])
        case 'resolved':
        case 'unavailable':
        case 'not set': return p_.literal.list([])
        default: return p_.exhaustive($[0])
    }
}

export const Value: declarations_.Value = ($) => p_.literal.segmented_list([
    p_.from.dictionary($.constraints).flatten_to_list(
        (selection) => Selection(selection, full_range.Value($.unmarshalled.instance))
    ),
    Content($),
])

const Content: declarations_.Value = (value) => p_.from.state(value['unmarshall result']).decide(
    ($) => {
        switch ($[0]) {
            case 'error': return p_.option($, ($) => p_.literal.list([])) //reported by the unmarshaller, it is not the responsibility of this transformer to report them
            case 'success': return p_.option($, ($) => p_.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'dictionary': return p_.option($, ($) => p_.from.dictionary($.entries).flatten_to_list(
                            ($) => p_.from.state($['unmarshall result']).decide(
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
                        case 'group': return p_.option($, ($) => p_.from.dictionary($.properties).flatten_to_list(
                            ($) => p_.from.state($['unmarshall result']).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'success': return p_.option($, ($) => Value($.resolved))
                                        case 'error': return p_.option($, ($) => p_.literal.list([]))
                                        default: return p_.exhaustive($[0])
                                    }
                                }
                            )
                        ))
                        case 'simple': return p_.option($, ($) => p_.literal.list([]))
                        case 'list': return p_.option($, ($) => p_.literal.segmented_list([
                            p_.from.list($.items).flatten(($) => Value($)),
                            Selection($.result, full_range.Value(value.unmarshalled.instance)),
                        ]))
                        case 'nothing': return p_.option($, ($) => p_.literal.list([]))
                        case 'reference': return p_.option($, ($) => p_.from.state($).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'derived': return p_.option($, ($) => Selection($, full_range.Value(
                                        // Derived values have no identifier token.
                                        value.unmarshalled.instance
                                    )))
                                    case 'selected': return p_.option($, ($) => {
                                        const reference = $
                                        const error = (type: s_out.Error['type']): s_out.Errors => p_.literal.list([{
                                            'severity': ['error', null],
                                            'range': reference.unmarshalled.intermediate.instance.range,
                                            'type': type,
                                        }])
                                        const status = $['resolve status']
                                        const diagnostics = (): s_out.Errors => {
                                        switch (status[0]) {
                                            case 'missing': return error(['missing reference', status[1]])
                                            case 'cyclic': return p_.from.optional(status[1].get_circular_dependent()).decide(
                                                () => p_.literal.list([]),
                                                () => error(['missing reference', reference.unmarshalled.intermediate.instance.token.value])
                                            )
                                            case 'selected': {
                                                const selection = status[1]
                                                switch (selection[0]) {
                                                    case 'constraint failed': return p_.literal.list([])
                                                    case 'cycle': return error(['reference cycle', selection[1]])
                                                    case 'resolved':
                                                    case 'not set':
                                                    case 'unavailable': return p_.literal.list([])
                                                    default: return p_.exhaustive(selection[0])
                                                }
                                            }
                                            default: return p_.exhaustive(status[0])
                                        }
                                        }
                                        return p_.literal.segmented_list([
                                            diagnostics(),
                                            p_.from.dictionary(reference.constraints).flatten_to_list(
                                                (selection) => Selection(selection, reference.unmarshalled.intermediate.instance.range)
                                            ),
                                        ])
                                    })
                                    default: return p_.exhaustive($[0])
                                }
                            }
                        ))
                        case 'component': return p_.option($, ($) => p_.literal.segmented_list([
                            Value($.value),
                            p_.from.dictionary($.constraints).flatten_to_list(
                                (selection) => Selection(selection, full_range.Value(value.unmarshalled.instance))
                            ),
                        ]))
                        case 'optional': return p_.option($, ($) => p_.from.state($.status).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'set': return p_.option($, ($) => Value($['child value']))
                                    case 'not set': return p_.option($, ($) => p_.literal.list([]))
                                    default: return p_.exhaustive($[0])
                                }
                            }
                        ))
                        case 'state': return p_.option($, ($) => {
                            return p_.literal.segmented_list([p_.from.optional($.option).decide(
                                ($) => Value($),
                                () => p_.literal.list([])
                            ), Selection($.result, full_range.Value(value.unmarshalled.instance))])
                        })
                        case 'text': return p_.option($, ($) => p_.literal.list([
                        ]))
                        default: return p_.exhaustive($[0])
                    }
                }
            ))
            default: return p_.exhaustive($[0])
        }
    }
)
