import * as sh from '../../../temp/shorthands.js'
import type * as s_target from '../../../modules/schema.generated/schemas/unresolved/schema.js'

export const schema_ = (
    structure: s_target.namespaces.structure.types.Structure,
    resolver: s_target.types.Schema.resolver,
): s_target.types.Schema => ({ structure, resolver })

export const type_specification = (
    schema: s_target.types.Schema,
    directory: s_target.types.Directory,
): s_target.types.Type_Specification => ({ schema, directory })

export const structure = (
    basic_types: s_target.namespaces.structure.types.Basic_Types,
    types: s_target.namespaces.structure.types.Types,
    namespaces: s_target.namespaces.structure.types.Namespaces = sh.dictionary({}),
): s_target.namespaces.structure.types.Structure => ({ namespaces, 'basic types': basic_types, types })

export const basic_types = (types: sh.Raw_Or_Normal_Dictionary<s_target.namespaces.structure.types.Basic_Types.D>): s_target.namespaces.structure.types.Basic_Types => sh.dictionary(types)
export const types = (types: sh.Raw_Or_Normal_Dictionary<s_target.namespaces.structure.types.Types.D>): s_target.namespaces.structure.types.Types => sh.dictionary(types)
export const type_ = (value: s_target.namespaces.structure.types.Value): s_target.namespaces.structure.types.Type => ({ 'root value': value })
export const token = (
    type: 'double quoted' | 'undelimited',
    regular_expression: s_target.namespaces.structure.types.Regular_Expression | null = null,
): s_target.namespaces.structure.types.Basic_Type => ({
    type: type === 'double quoted' ? ['double quoted', null] : ['undelimited', null],
    'regular expression': sh.optional.null_or_value(regular_expression),
    'hyperlink': sh.optional.not_set(),
})

export const prop = (value: s_target.namespaces.structure.types.Value): s_target.namespaces.structure.types.Group.D => ({
    description: sh.optional.not_set(), value,
})
export const prop_with_description = (description: string, value: s_target.namespaces.structure.types.Value): s_target.namespaces.structure.types.Group.D => ({
    description: sh.optional.set(description), value,
})
export const toption = (value: s_target.namespaces.structure.types.Value): s_target.namespaces.structure.types.Value.state.options.D => ({
    description: sh.optional.not_set(), constraints: sh.optional.not_set(), value,
})
export const toption_constrained = (
    constraints: sh.Raw_Or_Normal_Dictionary<s_target.namespaces.structure.types.Option_Constraints.O.D>,
    value: s_target.namespaces.structure.types.Value,
): s_target.namespaces.structure.types.Value.state.options.D => ({
    description: sh.optional.not_set(), constraints: sh.optional.set(sh.dictionary(constraints)), value,
})
export const toption_with_description = (description: string, value: s_target.namespaces.structure.types.Value): s_target.namespaces.structure.types.Value.state.options.D => ({
    description: sh.optional.set(description), constraints: sh.optional.not_set(), value,
})
export const type_reference = (type: string): s_target.namespaces.structure.types.Type_Reference => ({ location: ['local', type] })
export const value_reference = (type: string, tail: s_target.namespaces.structure.types.Value_Subselection.tail.L[]): s_target.namespaces.structure.types.Value_Reference => ({
    type: type_reference(type), path: { tail: sh.list(tail) },
})

export namespace t {
    export const component = (type: string): s_target.namespaces.structure.types.Value => ['component', { type: ['local', type], constraints: sh.optional.not_set() }]
    export const component_cyclic = (type: string): s_target.namespaces.structure.types.Value => ['component', { type: ['local cyclic', type], constraints: sh.optional.not_set() }]
    export const component_child = (namespace: string, type: string): s_target.namespaces.structure.types.Value =>
        ['component', { type: ['child namespace', { namespace, type }], constraints: sh.optional.not_set() }]
    export const dictionary = (value: s_target.namespaces.structure.types.Value): s_target.namespaces.structure.types.Value => ['dictionary', { value }]
    export const group = (properties: sh.Raw_Or_Normal_Dictionary<s_target.namespaces.structure.types.Group.D>): s_target.namespaces.structure.types.Value => ['group', sh.dictionary(properties)]
    export const list = (value: s_target.namespaces.structure.types.Value, result: s_target.namespaces.structure.types.Value_Reference | null = null): s_target.namespaces.structure.types.Value =>
        ['list', { value, result: sh.optional.null_or_value(result) }]
    export const nothing = (): s_target.namespaces.structure.types.Value => ['nothing', null]
    export const simple = (name: string): s_target.namespaces.structure.types.Value => ['simple', name]
    export const optional = (value: s_target.namespaces.structure.types.Value): s_target.namespaces.structure.types.Value =>
        ['optional', { value, constraints: sh.optional.not_set(), result: sh.optional.not_set() }]
    export const reference = (
        type: string,
        tail: s_target.namespaces.structure.types.Value_Subselection.tail.L[],
        dependency: 'cyclic' | 'acyclic' = 'acyclic',
    ): s_target.namespaces.structure.types.Value => ['reference', {
        referent: value_reference(type, tail),
        type: { dependency: dependency === 'cyclic' ? ['cyclic', null] : ['acyclic', null], constraints: sh.optional.not_set() },
    }]
    export const state = (
        options: sh.Raw_Or_Normal_Dictionary<s_target.namespaces.structure.types.Value.state.options.D>,
        result: s_target.namespaces.structure.types.Value_Reference | null = null,
    ): s_target.namespaces.structure.types.Value => ['state', { options: sh.dictionary(options), result: sh.optional.null_or_value(result) }]
}

export namespace vp {
    export const d = (): s_target.namespaces.structure.types.Value_Subselection.tail.L => ['dictionary', null]
    export const g = (property: string): s_target.namespaces.structure.types.Value_Subselection.tail.L => ['group', property]
    export const s = (option: string): s_target.namespaces.structure.types.Value_Subselection.tail.L => ['state', option]
    export const o = (): s_target.namespaces.structure.types.Value_Subselection.tail.L => ['optional', null]
}
