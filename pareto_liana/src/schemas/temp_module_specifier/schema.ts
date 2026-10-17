import type * as s_schema from "../../modules/schema.generated/schemas/resolved/schema.js"

export type Temp_Module_Specifier =
    | ['constrained', {
        'resolver': s_schema.Resolver
        'module resolver': {
            'entry': s_schema.Resolver_Modules.D,
            'id': string
        }
    }]
    | ['unconstrained', {
        'module': {
            'entry': s_schema.Module,
            'id': string
        }
    }]