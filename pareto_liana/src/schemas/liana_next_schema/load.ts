import type * as tree from 'astn-runtime/modules/deserialization/schemas/parse_tree/schema'
import * as p from 'pareto-core/transformer'
import * as Normalize from './current_astn/parse_tree_to_document.js'
import * as Unmarshal from './current_generated/implementations/schemas/unresolved/uptransformers/unmarshal.js'
import type * as s_unmarshalling from './current_generated/structure/schemas/unmarshalling.js'
import type * as s_resolved from './current_generated/structure/schemas/resolved.js'
import { Type_Specification as Resolve } from './resolve.js'
import type { Resolving_Error } from './resolving_error.js'

const Value_Type = (type: s_unmarshalling.Value_Type): string => type[0]

const Unmarshal_Error = (error: s_unmarshalling.Error): string => {
    switch (error[0]) {
        case 'type mismatch': return `Expected ${Value_Type(error[1].expected)}, found ${Value_Type(error[1].found)}`
        case 'unknown state option': return `Unknown state option: ${error[1].identifier}`
        case 'missing property': return `Missing property: ${error[1].identifier}`
        default: return p.exhaustive(error[0])
    }
}

export const Type_Specification = (
    value: tree.Value,
    abort: (error: Resolving_Error) => never,
): s_resolved.Type_Specification => {
    const normalized = Normalize.Value(value, message => abort({
        type: ['schema validation', { message }],
    }))
    const unresolved = Unmarshal.Type_Specification(normalized, error => abort({
        type: ['schema validation', { message: Unmarshal_Error(error) }],
    }))
    return Resolve(unresolved, abort)
}
