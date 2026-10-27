import { Type_Specification as Resolve } from './next_generated/implementations/schemas/resolved/uptransformers/unresolved.js'
import type * as source from './next_generated/structure/schemas/unresolved.js'
import type * as target from './next_generated/structure/schemas/resolved.js'
import type { Resolving_Error } from './resolving_error.js'
import { Validate } from './validate.js'

export const Type_Specification = (
    input: source.Type_Specification, abort: (error: Resolving_Error) => never,
): target.Type_Specification => {
    const schema = Resolve(input, abort)
    Validate(schema, message => abort({ type: ['schema validation', { message }] }))
    return schema
}
