import * as p_ from 'pareto-core/transformer'
import * as ser_unmarshalling_error from 'liana-runtime/modules/value_unmarshalling/schemas/unmarshalling/serializers'
import type { types as reader_errors } from '../../modules/schema.generated/schemas/reader_errors/schema.js'
import type * as core from 'pareto-core/schema'

const Names = <T extends core.Value>(dictionary: core.Dictionary<T>): string => {
    let names = ''
    p_.from.dictionary(dictionary).map((_, id) => {
        names += `${names === '' ? '' : ', '}"${id}"`
        return null
    })
    return names === '' ? '(none)' : names
}

export const Unmarshalling_Error = ($: reader_errors.Unmarshalling_Error): string => {
    switch ($[0]) {
        case 'value': {
            const error = $[1]
            if (error[0] === 'astn value unmarshalling' && error[1].type[0] === 'type' &&
                error[1].type[1][0] === 'unexpected properties') {
                const properties = error[1].type[1][1]
                return `Unexpected properties: ${Names(properties.found)}; expected properties: ${Names(properties.expected)}`
            }
            return ser_unmarshalling_error.Error(error)
        }
        case 'token syntax': return `Invalid ${$[1].type}: expected ${$[1].expected}, found ${$[1].found}`
        case 'token regular expression': return `Invalid ${$[1].type}: ${$[1].value} does not match ${$[1].pattern}`
        default: return p_.exhaustive($[0])
    }
}
