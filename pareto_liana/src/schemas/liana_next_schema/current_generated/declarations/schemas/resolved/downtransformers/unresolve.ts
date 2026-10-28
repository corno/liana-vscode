
import type * as s_source from "../../../../structure/schemas/resolved.js"
import type * as s_target from "../../../../structure/schemas/unresolved.js"

export namespace temp_pareto_core {
    export type Transformer_With_Source_Value<Target_Value, Source_Value> = ($: Source_Value) => Target_Value
    export type Transformer_With_Source_Value_With_Directive<Target_Value, Source_Value, Directive> = ($: Source_Value, $p: Directive) => Target_Value
}

export type Directory = temp_pareto_core.Transformer_With_Source_Value<
    s_target.Directory,
    s_source.Directory
>

export type Node = temp_pareto_core.Transformer_With_Source_Value<
    s_target.Node,
    s_source.Node
>

export type Type_Specification = temp_pareto_core.Transformer_With_Source_Value<
    s_target.Type_Specification,
    s_source.Type_Specification
>

export namespace structure {
    
    export type Basic_Types = temp_pareto_core.Transformer_With_Source_Value<
        s_target.structure.Basic_Types,
        s_source.structure.Basic_Types
    >
    
    export type Types = temp_pareto_core.Transformer_With_Source_Value<
        s_target.structure.Types,
        s_source.structure.Types
    >
    
    export type Namespaces = temp_pareto_core.Transformer_With_Source_Value<
        s_target.structure.Namespaces,
        s_source.structure.Namespaces
    >
    
    export type Type = temp_pareto_core.Transformer_With_Source_Value<
        s_target.structure.Type,
        s_source.structure.Type
    >
    
    export type Group = temp_pareto_core.Transformer_With_Source_Value<
        s_target.structure.Group,
        s_source.structure.Group
    >
    
    export type Value = temp_pareto_core.Transformer_With_Source_Value<
        s_target.structure.Value,
        s_source.structure.Value
    >
    
    export type Dictionary = temp_pareto_core.Transformer_With_Source_Value<
        s_target.structure.Dictionary,
        s_source.structure.Dictionary
    >
    
    export type Value_Reference = temp_pareto_core.Transformer_With_Source_Value<
        s_target.structure.Value_Reference,
        s_source.structure.Value_Reference
    >
    
    export type Option_Constraints = temp_pareto_core.Transformer_With_Source_Value<
        s_target.structure.Option_Constraints,
        s_source.structure.Option_Constraints
    >
    
    export type Reference = temp_pareto_core.Transformer_With_Source_Value<
        s_target.structure.Reference,
        s_source.structure.Reference
    >
    
    export type Reference_Constraints = temp_pareto_core.Transformer_With_Source_Value<
        s_target.structure.Reference_Constraints,
        s_source.structure.Reference_Constraints
    >
    
    export type Regular_Expression = temp_pareto_core.Transformer_With_Source_Value<
        s_target.structure.Regular_Expression,
        s_source.structure.Regular_Expression
    >
    
    export type Structure = temp_pareto_core.Transformer_With_Source_Value<
        s_target.structure.Structure,
        s_source.structure.Structure
    >
    
    export type Value_Result = temp_pareto_core.Transformer_With_Source_Value<
        s_target.structure.Value_Result,
        s_source.structure.Value_Result
    >
}

export namespace declarations {
    
    export type Presence = temp_pareto_core.Transformer_With_Source_Value<
        s_target.declarations.Presence,
        s_source.declarations.Presence
    >
    
    export type Signature_Value_Reference = temp_pareto_core.Transformer_With_Source_Value<
        s_target.declarations.Signature_Value_Reference,
        s_source.declarations.Signature_Value_Reference
    >
    
    export type Signature = temp_pareto_core.Transformer_With_Source_Value<
        s_target.declarations.Signature,
        s_source.declarations.Signature
    >
    
    export type Declarations = temp_pareto_core.Transformer_With_Source_Value<
        s_target.declarations.Declarations,
        s_source.declarations.Declarations
    >
    
    export type Declaration = temp_pareto_core.Transformer_With_Source_Value<
        s_target.declarations.Declaration,
        s_source.declarations.Declaration
    >
    
    export type Namespaces = temp_pareto_core.Transformer_With_Source_Value<
        s_target.declarations.Namespaces,
        s_source.declarations.Namespaces
    >
    
    export type Declaration_Namespace = temp_pareto_core.Transformer_With_Source_Value<
        s_target.declarations.Declaration_Namespace,
        s_source.declarations.Declaration_Namespace
    >
}

export namespace resolver {
    
    export type Value_Reference = temp_pareto_core.Transformer_With_Source_Value<
        s_target.resolver.Value_Reference,
        s_source.resolver.Value_Reference
    >
    
    export type Simple_Component_Selection = temp_pareto_core.Transformer_With_Source_Value<
        s_target.resolver.Simple_Component_Selection,
        s_source.resolver.Simple_Component_Selection
    >
    
    export type Relative_Value_Selection = temp_pareto_core.Transformer_With_Source_Value<
        s_target.resolver.Relative_Value_Selection,
        s_source.resolver.Relative_Value_Selection
    >
    
    export type Possible_Value_Selection = temp_pareto_core.Transformer_With_Source_Value<
        s_target.resolver.Possible_Value_Selection,
        s_source.resolver.Possible_Value_Selection
    >
    
    export type Option_Constraints = temp_pareto_core.Transformer_With_Source_Value<
        s_target.resolver.Option_Constraints,
        s_source.resolver.Option_Constraints
    >
    
    export type Guaranteed_Value_Selection = temp_pareto_core.Transformer_With_Source_Value<
        s_target.resolver.Guaranteed_Value_Selection,
        s_source.resolver.Guaranteed_Value_Selection
    >
    
    export type Lookup_Selection = temp_pareto_core.Transformer_With_Source_Value<
        s_target.resolver.Lookup_Selection,
        s_source.resolver.Lookup_Selection
    >
    
    export type Reference_Constraints = temp_pareto_core.Transformer_With_Source_Value<
        s_target.resolver.Reference_Constraints,
        s_source.resolver.Reference_Constraints
    >
    
    export type Resolver = temp_pareto_core.Transformer_With_Source_Value<
        s_target.resolver.Resolver,
        s_source.resolver.Resolver
    >
    
    export type Result_Selection = temp_pareto_core.Transformer_With_Source_Value<
        s_target.resolver.Result_Selection,
        s_source.resolver.Result_Selection
    >
    
    export type Checks = temp_pareto_core.Transformer_With_Source_Value<
        s_target.resolver.Checks,
        s_source.resolver.Checks
    >
    
    export type Value = temp_pareto_core.Transformer_With_Source_Value<
        s_target.resolver.Value,
        s_source.resolver.Value
    >
}
