import type * as errors from '../../modules/schema.generated/schemas/reader_errors/schema.js'
import type * as location from 'astn-runtime/modules/deserialization/schemas/location/schema'
import type * as core from 'pareto-core/schema'
import * as p from 'pareto-core/transformer'
import * as parser from 'astn-runtime/modules/deserialization/schemas/parse_tree_deserialization/serializers'
import * as parser_location from 'astn-runtime/modules/deserialization/schemas/parse_tree_deserialization/transformers/location'
import * as value from 'liana-runtime/modules/value_unmarshalling/schemas/unmarshalling/serializers'
import * as value_location from 'liana-runtime/modules/value_unmarshalling/schemas/unmarshalling/transformers/location'
import * as resolving from 'liana-runtime/modules/resolved_document_deserialization/schemas/resolving/serializers'

const names = <T extends core.Value>(dictionary: core.Dictionary<T>): string => {
    let result = ''
    p.from.dictionary(dictionary).map((_, name) => {
        result += `${result === '' ? '' : ', '}"${name}"`
        return null
    })
    return result === '' ? '(none)' : result
}

export const error_message = ($: errors.types.Resolved_Error): string => {
    if ($[0] === 'resolving') return resolving.Error($[1])
    const error = $[1]
    if (error[0] === 'parse tree deserialization') return parser.Error(error[1])
    const unmarshalling = error[1]
    switch (unmarshalling[0]) {
        case 'value': {
            const error = unmarshalling[1]
            if (error[0] === 'astn value unmarshalling' && error[1].type[0] === 'type' &&
                error[1].type[1][0] === 'unexpected properties') {
                const properties = error[1].type[1][1]
                return `Unexpected properties: ${names(properties.found)}; expected properties: ${names(properties.expected)}`
            }
            return value.Error(error)
        }
        case 'token syntax': return `Invalid ${unmarshalling[1].type}: expected ${unmarshalling[1].expected}, found ${unmarshalling[1].found}`
        case 'token regular expression': return `Invalid ${unmarshalling[1].type}: ${unmarshalling[1].value} does not match ${unmarshalling[1].pattern}`
    }
}

export const error_location = ($: errors.types.Resolved_Error): location.Possible_Range => {
    if ($[0] === 'resolving') return ['range', $[1].location]
    const error = $[1]
    if (error[0] === 'parse tree deserialization') return parser_location.Error(error[1])
    return ['range', error[1][0] === 'value' ? value_location.Error(error[1][1]) : error[1][1].range]
}
