import * as sh from '../../../temp/shorthands.js'
import type * as s_target from '../../../modules/schema.generated/schemas/unresolved/schema.js'

export const declaration_namespace = (
    types: sh.Raw_Or_Normal_Dictionary<s_target.namespaces.declarations.types.Declarations.D>,
    namespaces: sh.Raw_Or_Normal_Dictionary<s_target.namespaces.declarations.types.Namespaces.D> = {},
): s_target.namespaces.declarations.types.Declaration_Namespace => ({
    types: sh.dictionary(types),
    namespaces: sh.dictionary(namespaces),
})

export const declarations = (
    declarations: sh.Raw_Or_Normal_Dictionary<s_target.namespaces.declarations.types.Declarations.D>,
): s_target.namespaces.declarations.types.Declarations => sh.dictionary(declarations)

export const signature = (
    values: sh.Raw_Or_Normal_Dictionary<s_target.namespaces.declarations.types.Signature.values.D>,
    lookups: sh.Raw_Or_Normal_Dictionary<s_target.namespaces.declarations.types.Signature.lookups.D>,
): s_target.namespaces.declarations.types.Signature => ({
    values: sh.dictionary(values),
    lookups: sh.dictionary(lookups),
})

export namespace declaration {
    export const local = (
        signature: s_target.namespaces.declarations.types.Signature,
    ): s_target.namespaces.declarations.types.Declarations.D => ({
        signature: sh.state(['local', signature]),
    })

    export const same_as = (
        name: string,
    ): s_target.namespaces.declarations.types.Declarations.D => ({
        signature: sh.state(['same as', sh.reference(name)]),
    })
}

export const type_reference = (
    name: string,
): s_target.namespaces.declarations.types.Signature_Type_Reference => ({
    location: sh.state(['local', sh.reference(name)]),
})

export const value_reference = (
    type: string,
    tail: s_target.namespaces.declarations.types.Signature_Value_Subselection.tail.L[],
): s_target.namespaces.declarations.types.Signature_Value_Reference => ({
    type: type_reference(type),
    subselection: { tail: sh.list(tail) },
})

export const presence = (
    value: 'optional' | 'required',
): s_target.namespaces.declarations.types.Presence =>
    value === 'optional' ? ['optional', null] : ['required', null]
