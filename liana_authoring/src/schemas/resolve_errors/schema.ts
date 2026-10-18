import * as p_ from 'pareto-core/schema'

import type * as s_location from "astn-runtime/modules/deserialization/schemas/location/schema"

export type Error = {
    'range': s_location.Range
    'type':
    | ['constraint failed', string]
    | ['to be implemented', null]
    | ['missing reference', string]
    | ['reference cycle', p_.List<string>]
    'severity':
    | ['error', null]
    | ['warning', null]
    | ['hint', null]
}

export type Errors = p_.List<Error>