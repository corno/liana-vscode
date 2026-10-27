import type * as s_schema from './schema.js'

export const component_type = (type: s_schema.namespaces.structure.types.Value.component.type_): s_schema.namespaces.structure.types.Type => {
    if (type[0] === 'navigable') return type[1].result
    const location = type[1]
    switch (location[0]) {
        case 'local': return location[1]['l entry'].get_circular_dependent()
        case 'child namespace':
        case 'sibling namespace': return location[1].type.value['l entry']
    }
}
