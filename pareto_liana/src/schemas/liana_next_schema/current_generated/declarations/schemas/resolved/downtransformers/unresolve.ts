import type * as p_ from 'pareto-core/transformer/declaration'

import type * as s_source from "../../../../structure/schemas/resolved.js"
import type * as s_target from "../../../../structure/schemas/unresolved.js"

export namespace structure {
    
    export type Basic_Types = p_.Transformer_With_Source_Value<
        s_target.structure.Basic_Types,
        s_source.structure.Basic_Types
    >
    
    export type Types = p_.Transformer_With_Source_Value<
        s_target.structure.Types,
        s_source.structure.Types
    >
    
    export type Namespaces = p_.Transformer_With_Source_Value<
        s_target.structure.Namespaces,
        s_source.structure.Namespaces
    >
    
    export type Type = p_.Transformer_With_Source_Value<
        s_target.structure.Type,
        s_source.structure.Type
    >
    
    export type Group = p_.Transformer_With_Source_Value<
        s_target.structure.Group,
        s_source.structure.Group
    >
    
    export type Value = p_.Transformer_With_Source_Value<
        s_target.structure.Value,
        s_source.structure.Value
    >
    
    export type Dictionary = p_.Transformer_With_Source_Value<
        s_target.structure.Dictionary,
        s_source.structure.Dictionary
    >
    
    export type Value_Reference = p_.Transformer_With_Source_Value<
        s_target.structure.Value_Reference,
        s_source.structure.Value_Reference
    >
    
    export type Option_Constraints = p_.Transformer_With_Source_Value<
        s_target.structure.Option_Constraints,
        s_source.structure.Option_Constraints
    >
    
    export type Reference = p_.Transformer_With_Source_Value<
        s_target.structure.Reference,
        s_source.structure.Reference
    >
    
    export type Reference_Constraints = p_.Transformer_With_Source_Value<
        s_target.structure.Reference_Constraints,
        s_source.structure.Reference_Constraints
    >
    
    export type Regular_Expression = p_.Transformer_With_Source_Value<
        s_target.structure.Regular_Expression,
        s_source.structure.Regular_Expression
    >
    
    export type Structure = p_.Transformer_With_Source_Value<
        s_target.structure.Structure,
        s_source.structure.Structure
    >
    
    export type Optional_Result = p_.Transformer_With_Source_Value<
        s_target.structure.Optional_Result,
        s_source.structure.Optional_Result
    >
}

export namespace declarations {
    
    export type Presence = p_.Transformer_With_Source_Value<
        s_target.declarations.Presence,
        s_source.declarations.Presence
    >
    
    export type Signature_Value_Reference = p_.Transformer_With_Source_Value<
        s_target.declarations.Signature_Value_Reference,
        s_source.declarations.Signature_Value_Reference
    >
    
    export type Signature = p_.Transformer_With_Source_Value<
        s_target.declarations.Signature,
        s_source.declarations.Signature
    >
    
    export type Declarations = p_.Transformer_With_Source_Value<
        s_target.declarations.Declarations,
        s_source.declarations.Declarations
    >
    
    export type Declaration = p_.Transformer_With_Source_Value<
        s_target.declarations.Declaration,
        s_source.declarations.Declaration
    >
    
    export type Namespaces = p_.Transformer_With_Source_Value<
        s_target.declarations.Namespaces,
        s_source.declarations.Namespaces
    >
    
    export type Namespace = p_.Transformer_With_Source_Value<
        s_target.declarations.Namespace,
        s_source.declarations.Namespace
    >
}

export namespace resolver {
    
    export type Value_Reference = p_.Transformer_With_Source_Value<
        s_target.resolver.Value_Reference,
        s_source.resolver.Value_Reference
    >
    
    export type Relative_Value_Selection = p_.Transformer_With_Source_Value<
        s_target.resolver.Relative_Value_Selection,
        s_source.resolver.Relative_Value_Selection
    >
    
    export type Possible_Value_Branches = p_.Transformer_With_Source_Value<
        s_target.resolver.Possible_Value_Branches,
        s_source.resolver.Possible_Value_Branches
    >
    
    export type Possible_Value_Selection = p_.Transformer_With_Source_Value<
        s_target.resolver.Possible_Value_Selection,
        s_source.resolver.Possible_Value_Selection
    >
    
    export type Option_Constraints = p_.Transformer_With_Source_Value<
        s_target.resolver.Option_Constraints,
        s_source.resolver.Option_Constraints
    >
    
    export type Guaranteed_Value_Selection = p_.Transformer_With_Source_Value<
        s_target.resolver.Guaranteed_Value_Selection,
        s_source.resolver.Guaranteed_Value_Selection
    >
    
    export type Lookup_Selection = p_.Transformer_With_Source_Value<
        s_target.resolver.Lookup_Selection,
        s_source.resolver.Lookup_Selection
    >
    
    export type Reference_Constraints = p_.Transformer_With_Source_Value<
        s_target.resolver.Reference_Constraints,
        s_source.resolver.Reference_Constraints
    >
    
    export type Resolver = p_.Transformer_With_Source_Value<
        s_target.resolver.Resolver,
        s_source.resolver.Resolver
    >
    
    export type Result_Selection = p_.Transformer_With_Source_Value<
        s_target.resolver.Result_Selection,
        s_source.resolver.Result_Selection
    >
    
    export type Checks = p_.Transformer_With_Source_Value<
        s_target.resolver.Checks,
        s_source.resolver.Checks
    >
    
    export type Value = p_.Transformer_With_Source_Value<
        s_target.resolver.Value,
        s_source.resolver.Value
    >
}

export type Directory = p_.Transformer_With_Source_Value<
    s_target.Directory,
    s_source.Directory
>

export type Node = p_.Transformer_With_Source_Value<
    s_target.Node,
    s_source.Node
>

export type Schema = p_.Transformer_With_Source_Value<
    s_target.Schema,
    s_source.Schema
>

export type Authoring_Specification = p_.Transformer_With_Source_Value<
    s_target.Authoring_Specification,
    s_source.Authoring_Specification
>

export type Document_Specification = p_.Transformer_With_Source_Value<
    s_target.Document_Specification,
    s_source.Document_Specification
>
