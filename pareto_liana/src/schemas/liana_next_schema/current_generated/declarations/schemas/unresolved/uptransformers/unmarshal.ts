import type * as p_ from 'pareto-core/transformer/declaration'

import type * as s_source from "../../../../structure/schemas/astn_document.js"
import type * as s_target from "../../../../structure/schemas/unresolved.js"
import type * as s_error from "../../../../structure/schemas/unmarshalling.js"

export type Directory = p_.Transformer_With_Error_With_Source_Value<
    s_target.Directory,
    s_error.Error,
    s_source.Value
>

export type Node = p_.Transformer_With_Error_With_Source_Value<
    s_target.Node,
    s_error.Error,
    s_source.Value
>

export type Type_Specification = p_.Transformer_With_Error_With_Source_Value<
    s_target.Type_Specification,
    s_error.Error,
    s_source.Value
>

export namespace structure {
    
    export type Basic_Types = p_.Transformer_With_Error_With_Source_Value<
        s_target.structure.Basic_Types,
        s_error.Error,
        s_source.Value
    >
    
    export type Types = p_.Transformer_With_Error_With_Source_Value<
        s_target.structure.Types,
        s_error.Error,
        s_source.Value
    >
    
    export type Namespaces = p_.Transformer_With_Error_With_Source_Value<
        s_target.structure.Namespaces,
        s_error.Error,
        s_source.Value
    >
    
    export type Type = p_.Transformer_With_Error_With_Source_Value<
        s_target.structure.Type,
        s_error.Error,
        s_source.Value
    >
    
    export type Group = p_.Transformer_With_Error_With_Source_Value<
        s_target.structure.Group,
        s_error.Error,
        s_source.Value
    >
    
    export type Value = p_.Transformer_With_Error_With_Source_Value<
        s_target.structure.Value,
        s_error.Error,
        s_source.Value
    >
    
    export type Dictionary = p_.Transformer_With_Error_With_Source_Value<
        s_target.structure.Dictionary,
        s_error.Error,
        s_source.Value
    >
    
    export type Value_Reference = p_.Transformer_With_Error_With_Source_Value<
        s_target.structure.Value_Reference,
        s_error.Error,
        s_source.Value
    >
    
    export type Option_Constraints = p_.Transformer_With_Error_With_Source_Value<
        s_target.structure.Option_Constraints,
        s_error.Error,
        s_source.Value
    >
    
    export type Reference = p_.Transformer_With_Error_With_Source_Value<
        s_target.structure.Reference,
        s_error.Error,
        s_source.Value
    >
    
    export type Reference_Constraints = p_.Transformer_With_Error_With_Source_Value<
        s_target.structure.Reference_Constraints,
        s_error.Error,
        s_source.Value
    >
    
    export type Regular_Expression = p_.Transformer_With_Error_With_Source_Value<
        s_target.structure.Regular_Expression,
        s_error.Error,
        s_source.Value
    >
    
    export type Structure = p_.Transformer_With_Error_With_Source_Value<
        s_target.structure.Structure,
        s_error.Error,
        s_source.Value
    >
    
    export type Optional_Result = p_.Transformer_With_Error_With_Source_Value<
        s_target.structure.Optional_Result,
        s_error.Error,
        s_source.Value
    >
}

export namespace declarations {
    
    export type Presence = p_.Transformer_With_Error_With_Source_Value<
        s_target.declarations.Presence,
        s_error.Error,
        s_source.Value
    >
    
    export type Signature_Value_Reference = p_.Transformer_With_Error_With_Source_Value<
        s_target.declarations.Signature_Value_Reference,
        s_error.Error,
        s_source.Value
    >
    
    export type Signature = p_.Transformer_With_Error_With_Source_Value<
        s_target.declarations.Signature,
        s_error.Error,
        s_source.Value
    >
    
    export type Declarations = p_.Transformer_With_Error_With_Source_Value<
        s_target.declarations.Declarations,
        s_error.Error,
        s_source.Value
    >
    
    export type Declaration = p_.Transformer_With_Error_With_Source_Value<
        s_target.declarations.Declaration,
        s_error.Error,
        s_source.Value
    >
    
    export type Namespaces = p_.Transformer_With_Error_With_Source_Value<
        s_target.declarations.Namespaces,
        s_error.Error,
        s_source.Value
    >
    
    export type Namespace = p_.Transformer_With_Error_With_Source_Value<
        s_target.declarations.Namespace,
        s_error.Error,
        s_source.Value
    >
}

export namespace resolver {
    
    export type Value_Reference = p_.Transformer_With_Error_With_Source_Value<
        s_target.resolver.Value_Reference,
        s_error.Error,
        s_source.Value
    >
    
    export type Relative_Value_Selection = p_.Transformer_With_Error_With_Source_Value<
        s_target.resolver.Relative_Value_Selection,
        s_error.Error,
        s_source.Value
    >
    
    export type Possible_Value_Branches = p_.Transformer_With_Error_With_Source_Value<
        s_target.resolver.Possible_Value_Branches,
        s_error.Error,
        s_source.Value
    >
    
    export type Possible_Value_Selection = p_.Transformer_With_Error_With_Source_Value<
        s_target.resolver.Possible_Value_Selection,
        s_error.Error,
        s_source.Value
    >
    
    export type Option_Constraints = p_.Transformer_With_Error_With_Source_Value<
        s_target.resolver.Option_Constraints,
        s_error.Error,
        s_source.Value
    >
    
    export type Guaranteed_Value_Selection = p_.Transformer_With_Error_With_Source_Value<
        s_target.resolver.Guaranteed_Value_Selection,
        s_error.Error,
        s_source.Value
    >
    
    export type Lookup_Selection = p_.Transformer_With_Error_With_Source_Value<
        s_target.resolver.Lookup_Selection,
        s_error.Error,
        s_source.Value
    >
    
    export type Reference_Constraints = p_.Transformer_With_Error_With_Source_Value<
        s_target.resolver.Reference_Constraints,
        s_error.Error,
        s_source.Value
    >
    
    export type Resolver = p_.Transformer_With_Error_With_Source_Value<
        s_target.resolver.Resolver,
        s_error.Error,
        s_source.Value
    >
    
    export type Result_Selection = p_.Transformer_With_Error_With_Source_Value<
        s_target.resolver.Result_Selection,
        s_error.Error,
        s_source.Value
    >
    
    export type Checks = p_.Transformer_With_Error_With_Source_Value<
        s_target.resolver.Checks,
        s_error.Error,
        s_source.Value
    >
    
    export type Value = p_.Transformer_With_Error_With_Source_Value<
        s_target.resolver.Value,
        s_error.Error,
        s_source.Value
    >
}
