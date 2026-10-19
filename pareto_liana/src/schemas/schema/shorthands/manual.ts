import * as sh from '../../../temp/shorthands.js'
import type * as s_target from '../../../modules/schema.generated/schemas/unresolved/schema.js'

export const schema_ = (
    structure: s_target.Structure,
    resolver: s_target.Resolver,
): s_target.Schema => ({ structure, resolver })

export const type_specification = (
    schema: s_target.Schema,
    root_type: string,
    file_extension: string,
): s_target.Type_Specification => ({ schema, 'root type': root_type, 'file extension': file_extension })

export const structure = (
    basic_types: s_target.Basic_Types,
    types: s_target.Types,
    namespaces: s_target.Namespaces = sh.dictionary({}),
): s_target.Structure => ({ namespaces, 'basic types': basic_types, types })

export const basic_types = (types: sh.Raw_Or_Normal_Dictionary<s_target.Basic_Types.D>): s_target.Basic_Types => sh.dictionary(types)
export const types = (types: sh.Raw_Or_Normal_Dictionary<s_target.Types.D>): s_target.Types => sh.dictionary(types)
export const type_ = (value: s_target.Value): s_target.Type => ({ 'root value': value })
export const token = (
    type: 'double quoted' | 'undelimited',
    regular_expression: s_target.Regular_Expression | null = null,
): s_target.Basic_Type => ({
    type: type === 'double quoted' ? ['double quoted', null] : ['undelimited', null],
    'regular expression': sh.optional.null_or_value(regular_expression),
})

export const prop = (value: s_target.Value): s_target.Group.D => ({
    description: sh.optional.not_set(), value,
})
export const prop_with_description = (description: string, value: s_target.Value): s_target.Group.D => ({
    description: sh.optional.set(description), value,
})
export const toption = (value: s_target.Value): s_target.Value.state.options.D => ({
    description: sh.optional.not_set(), constraints: sh.optional.not_set(), value,
})
export const toption_constrained = (
    constraints: sh.Raw_Or_Normal_Dictionary<s_target.Option_Constraints.O.D>,
    value: s_target.Value,
): s_target.Value.state.options.D => ({
    description: sh.optional.not_set(), constraints: sh.optional.set(sh.dictionary(constraints)), value,
})
export const toption_with_description = (description: string, value: s_target.Value): s_target.Value.state.options.D => ({
    description: sh.optional.set(description), constraints: sh.optional.not_set(), value,
})
export const type_reference = (type: string): s_target.Type_Reference => ({ location: ['internal', type] })
export const value_reference = (type: string, tail: s_target.Value_Path.tail.L[]): s_target.Value_Reference => ({
    type: type_reference(type), path: { tail: sh.list(tail) },
})

export namespace t {
    export const component = (type: string): s_target.Value => ['component', { type: ['internal', type] }]
    export const component_cyclic = (type: string): s_target.Value => ['component', { type: ['internal cyclic', type] }]
    export const component_child = (namespace: string, type: string): s_target.Value =>
        ['component', { type: ['child', { namespace, type }] }]
    export const dictionary = (value: s_target.Value): s_target.Value => ['dictionary', { value }]
    export const group = (properties: sh.Raw_Or_Normal_Dictionary<s_target.Group.D>): s_target.Value => ['group', sh.dictionary(properties)]
    export const list = (value: s_target.Value, result: s_target.Value_Reference | null = null): s_target.Value =>
        ['list', { value, result: sh.optional.null_or_value(result) }]
    export const nothing = (): s_target.Value => ['nothing', null]
    export const simple = (name: string): s_target.Value => ['simple', name]
    export const optional = (value: s_target.Value): s_target.Value =>
        ['optional', { value, constraints: sh.optional.not_set() }]
    export const reference = (
        type: string,
        tail: s_target.Value_Path.tail.L[],
        dependency: 'cyclic' | 'acyclic' = 'acyclic',
    ): s_target.Value => ['reference', {
        referent: value_reference(type, tail),
        type: ['selected', { dependency: dependency === 'cyclic' ? ['cyclic', null] : ['acyclic', null], constraints: sh.optional.not_set() }],
    }]
    export const state = (
        options: sh.Raw_Or_Normal_Dictionary<s_target.Value.state.options.D>,
        result: s_target.Value_Reference | null = null,
    ): s_target.Value => ['state', { options: sh.dictionary(options), result: sh.optional.null_or_value(result) }]
}

export namespace vp {
    export const d = (): s_target.Value_Path.tail.L => ['dictionary', null]
    export const g = (property: string): s_target.Value_Path.tail.L => ['group', property]
    export const s = (option: string): s_target.Value_Path.tail.L => ['state', option]
    export const o = (): s_target.Value_Path.tail.L => ['optional', null]
}
