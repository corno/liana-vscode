import type * as s_schema from "../../modules/schema.generated/schemas/resolved/schema.js"

export type Temp_Type_Specifier =
    | ['constrained', {
        'resolver': s_schema.Schema
        'root resolver': s_schema.Resolver_Types.D
        'root type': {
            'entry': s_schema.Type,
            'id': string
        }
    }]