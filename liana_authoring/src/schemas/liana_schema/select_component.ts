import type * as s_schema from './schema.js'
import p_unreachable_code_path from 'pareto-core/transformer/specials/unreachable_code_path'

export const component_type = (type: s_schema.Value.component.type_): s_schema.Type => {
    switch (type[0]) {
        case 'internal': return type[1]['l entry']
        case 'internal cyclic': return type[1]['l entry'].get_circular_dependent()
        case 'child': return type[1].type['l entry']
        default: return p_unreachable_code_path('unknown component location')
    }
}
