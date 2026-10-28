import type * as s from './current_generated/structure/schemas/resolved.js'

export const Component_Type = (component: s.structure.Value.type_.component): s.structure.Type => {
    const type = component.type
    if (type[0] === 'navigable') return type[1].result
    const location = type[1]
    switch (location[0]) {
        case 'local': return location[1]['l entry'].get_circular_dependent()
        case 'child namespace':
        case 'sibling namespace': return location[1].type.value['l entry']
    }
}
