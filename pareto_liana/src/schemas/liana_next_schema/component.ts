import type * as s from './current_generated/structure/schemas/resolved.js'

export const Component_Type = (component: s.structure.Value.component): s.structure.Type => {
    const type = component.type
    return type[0] === 'simple' ? type[1].result : type[1]['l entry'].get_circular_dependent()
}
