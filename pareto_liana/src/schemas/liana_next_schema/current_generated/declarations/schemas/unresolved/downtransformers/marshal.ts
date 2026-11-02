import type * as p_ from 'pareto-core/transformer/declaration'

import type * as s_source from "../../../../structure/schemas/unresolved.js"
import type * as s_target from "../../../../structure/schemas/astn_document.js"

export namespace structure {
    
    export type Basic_Types = p_.Transformer_With_Source_Value<
        s_target.Value,
        s_source.structure.Basic_Types
    >
    
    export type Types = p_.Transformer_With_Source_Value<
        s_target.Value,
        s_source.structure.Types
    >
    
    export type Namespaces = p_.Transformer_With_Source_Value<
        s_target.Value,
        s_source.structure.Namespaces
    >
    
    export type Type = p_.Transformer_With_Source_Value<
        s_target.Value,
        s_source.structure.Type
    >
    
    export type Group = p_.Transformer_With_Source_Value<
        s_target.Value,
        s_source.structure.Group
    >
    
    export type Value = p_.Transformer_With_Source_Value<
        s_target.Value,
        s_source.structure.Value
    >
    
    export type Dictionary = p_.Transformer_With_Source_Value<
        s_target.Value,
        s_source.structure.Dictionary
    >
    
    export type Value_Reference = p_.Transformer_With_Source_Value<
        s_target.Value,
        s_source.structure.Value_Reference
    >
    
    export type Option_Constraints = p_.Transformer_With_Source_Value<
        s_target.Value,
        s_source.structure.Option_Constraints
    >
    
    export type Reference = p_.Transformer_With_Source_Value<
        s_target.Value,
        s_source.structure.Reference
    >
    
    export type Reference_Constraints = p_.Transformer_With_Source_Value<
        s_target.Value,
        s_source.structure.Reference_Constraints
    >
    
    export type Regular_Expression = p_.Transformer_With_Source_Value<
        s_target.Value,
        s_source.structure.Regular_Expression
    >
    
    export type Structure = p_.Transformer_With_Source_Value<
        s_target.Value,
        s_source.structure.Structure
    >
    
    export type Optional_Result = p_.Transformer_With_Source_Value<
        s_target.Value,
        s_source.structure.Optional_Result
    >
}

export namespace declarations {
    
    export type Presence = p_.Transformer_With_Source_Value<
        s_target.Value,
        s_source.declarations.Presence
    >
    
    export type Signature_Value_Reference = p_.Transformer_With_Source_Value<
        s_target.Value,
        s_source.declarations.Signature_Value_Reference
    >
    
    export type Signature = p_.Transformer_With_Source_Value<
        s_target.Value,
        s_source.declarations.Signature
    >
    
    export type Declarations = p_.Transformer_With_Source_Value<
        s_target.Value,
        s_source.declarations.Declarations
    >
    
    export type Declaration = p_.Transformer_With_Source_Value<
        s_target.Value,
        s_source.declarations.Declaration
    >
    
    export type Namespaces = p_.Transformer_With_Source_Value<
        s_target.Value,
        s_source.declarations.Namespaces
    >
    
    export type Namespace = p_.Transformer_With_Source_Value<
        s_target.Value,
        s_source.declarations.Namespace
    >
}

export namespace resolver {
    
    export type Value_Reference = p_.Transformer_With_Source_Value<
        s_target.Value,
        s_source.resolver.Value_Reference
    >
    
    export type Relative_Value_Selection = p_.Transformer_With_Source_Value<
        s_target.Value,
        s_source.resolver.Relative_Value_Selection
    >
    
    export type Possible_Value_Branches = p_.Transformer_With_Source_Value<
        s_target.Value,
        s_source.resolver.Possible_Value_Branches
    >
    
    export type Possible_Value_Selection = p_.Transformer_With_Source_Value<
        s_target.Value,
        s_source.resolver.Possible_Value_Selection
    >
    
    export type Option_Constraints = p_.Transformer_With_Source_Value<
        s_target.Value,
        s_source.resolver.Option_Constraints
    >
    
    export type Guaranteed_Value_Selection = p_.Transformer_With_Source_Value<
        s_target.Value,
        s_source.resolver.Guaranteed_Value_Selection
    >
    
    export type Lookup_Selection = p_.Transformer_With_Source_Value<
        s_target.Value,
        s_source.resolver.Lookup_Selection
    >
    
    export type Reference_Constraints = p_.Transformer_With_Source_Value<
        s_target.Value,
        s_source.resolver.Reference_Constraints
    >
    
    export type Resolver = p_.Transformer_With_Source_Value<
        s_target.Value,
        s_source.resolver.Resolver
    >
    
    export type Result_Selection = p_.Transformer_With_Source_Value<
        s_target.Value,
        s_source.resolver.Result_Selection
    >
    
    export type Checks = p_.Transformer_With_Source_Value<
        s_target.Value,
        s_source.resolver.Checks
    >
    
    export type Value = p_.Transformer_With_Source_Value<
        s_target.Value,
        s_source.resolver.Value
    >
}

export type Directory = p_.Transformer_With_Source_Value<
    s_target.Value,
    s_source.Directory
>

export type Node = p_.Transformer_With_Source_Value<
    s_target.Value,
    s_source.Node
>

export type Schema = p_.Transformer_With_Source_Value<
    s_target.Value,
    s_source.Schema
>

export type Authoring_Specification = p_.Transformer_With_Source_Value<
    s_target.Value,
    s_source.Authoring_Specification
>

export type Document_Specification = p_.Transformer_With_Source_Value<
    s_target.Value,
    s_source.Document_Specification
>
