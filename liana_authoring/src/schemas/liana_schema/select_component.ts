import type * as s_schema from './schema.js'

export const component_type = (type: s_schema.namespaces.structure.types.Value.component.type_): s_schema.namespaces.structure.types.Type => {
    return type[0] === 'simple' ? type[1].result : type[1]['l entry'].get_circular_dependent()
}
