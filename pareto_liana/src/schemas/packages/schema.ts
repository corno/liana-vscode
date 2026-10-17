import type * as p_ from 'pareto-core/schema'

import type * as s_schema from "../../modules/schema.generated/schemas/unresolved/schema.js"

export type Package = {
    // 'id': string,
    'target path': string,
    'package': s_schema.Package
}

export type Packages = p_.Dictionary<Package>