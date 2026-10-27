import type * as s from './generated/schemas/resolved/schema.js'

export const Component_Type = (component: s.namespaces.structure.types.Value.component): s.namespaces.structure.types.Type => {
    const type = component.type
    if (type[0] === 'navigable') return type[1].result
    const location = type[1]
    switch (location[0]) {
        case 'local': return location[1]['l entry'].get_circular_dependent()
        case 'child namespace':
        case 'sibling namespace': return location[1].type.value['l entry']
    }
}
