import * as p from 'pareto-core/transformer'
import type { Error as Generated_Error } from './current_generated/structure/schemas/resolving.js'

export type Resolving_Error = Generated_Error | { readonly type: readonly ['schema validation', { readonly message: string }] }

export const Error = (error: Resolving_Error): string => {
    const type = error.type
    switch (type[0]) {
        case 'schema validation': return type[1].message
        case 'option constraint failed':
        case 'reference constraint failed': return `${type[0]}: ${type[1].constraint}`
        case 'missing component value argument': return `${type[0]}: ${type[1].argument}`
        case 'missing reference':
        case 'cyclic reference dependency':
        case 'premature reference access':
        case 'missing benchmark entry':
        case 'cyclic benchmark dependency':
        case 'premature benchmark access': return `${type[0]}: ${type[1].identifier}`
        case 'selection has no context':
        case 'reference lookup has no context':
        case 'benchmark lookup has no context':
        case 'missing dense dictionary entry': return type[0]
        default: return p.exhaustive(type[0])
    }
}
