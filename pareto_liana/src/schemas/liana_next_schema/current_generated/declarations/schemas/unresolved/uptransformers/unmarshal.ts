
import type * as s_source from "../../../../structure/schemas/astn_document.js"
import type * as s_target from "../../../../structure/schemas/unresolved.js"
import type * as s_error from "../../../../structure/schemas/unmarshalling.js"

export namespace temp_pareto_core {
    export type Refiner_With_Error_With_Source_Value<Target_Value, Error, Source_Value> = ($: Source_Value, abort: (error: Error) => never) => Target_Value
    export type Refiner_With_Error_With_Source_Value_With_Values_And_Lookups<Target_Value, Error, Source_Value, Values, Lookups> = ($: Source_Value, abort: (error: Error) => never, $values: Values, $lookups: Lookups) => Target_Value
    export type Refiner_With_Error_With_Source_Value_With_Directive<Target_Value, Error, Source_Value, Directive> = ($: Source_Value, abort: (error: Error) => never, $p: Directive) => Target_Value
    export type Refiner_With_Error_With_Source_Value_With_Directive_With_Values_And_Lookups<Target_Value, Error, Source_Value, Directive, Values, Lookups> = ($: Source_Value, abort: (error: Error) => never, $p: Directive, $values: Values, $lookups: Lookups) => Target_Value
    export type Refiner_With_Source_Value<Target_Value, Source_Value> = ($: Source_Value) => Target_Value
    export type Refiner_With_Source_Value_With_Values_And_Lookups<Target_Value, Source_Value, Values, Lookups> = ($: Source_Value, $values: Values, $lookups: Lookups) => Target_Value
    export type Refiner_With_Source_Value_With_Directive<Target_Value, Source_Value, Directive> = ($: Source_Value, $p: Directive) => Target_Value
    export type Refiner_With_Source_Value_With_Directive_With_Values_And_Lookups<Target_Value, Source_Value, Directive, Values, Lookups> = ($: Source_Value, $p: Directive, $values: Values, $lookups: Lookups) => Target_Value
    export type Production_With_Source_Value<Target_Value, Source_Value> = ($: Source_Value) => Target_Value
}

export type Directory = temp_pareto_core.Refiner_With_Error_With_Source_Value<
    s_target.Directory,
    s_error.Error,
    s_source.Value
>

export type Node = temp_pareto_core.Refiner_With_Error_With_Source_Value<
    s_target.Node,
    s_error.Error,
    s_source.Value
>

export type Type_Specification = temp_pareto_core.Refiner_With_Error_With_Source_Value<
    s_target.Type_Specification,
    s_error.Error,
    s_source.Value
>

export namespace structure {
    
    export type Basic_Types = temp_pareto_core.Refiner_With_Error_With_Source_Value<
        s_target.structure.Basic_Types,
        s_error.Error,
        s_source.Value
    >
    
    export type Types = temp_pareto_core.Refiner_With_Error_With_Source_Value<
        s_target.structure.Types,
        s_error.Error,
        s_source.Value
    >
    
    export type Namespaces = temp_pareto_core.Refiner_With_Error_With_Source_Value<
        s_target.structure.Namespaces,
        s_error.Error,
        s_source.Value
    >
    
    export type Type = temp_pareto_core.Refiner_With_Error_With_Source_Value<
        s_target.structure.Type,
        s_error.Error,
        s_source.Value
    >
    
    export type Group = temp_pareto_core.Refiner_With_Error_With_Source_Value<
        s_target.structure.Group,
        s_error.Error,
        s_source.Value
    >
    
    export type Value = temp_pareto_core.Refiner_With_Error_With_Source_Value<
        s_target.structure.Value,
        s_error.Error,
        s_source.Value
    >
    
    export type Dictionary = temp_pareto_core.Refiner_With_Error_With_Source_Value<
        s_target.structure.Dictionary,
        s_error.Error,
        s_source.Value
    >
    
    export type Value_Reference = temp_pareto_core.Refiner_With_Error_With_Source_Value<
        s_target.structure.Value_Reference,
        s_error.Error,
        s_source.Value
    >
    
    export type Option_Constraints = temp_pareto_core.Refiner_With_Error_With_Source_Value<
        s_target.structure.Option_Constraints,
        s_error.Error,
        s_source.Value
    >
    
    export type Reference = temp_pareto_core.Refiner_With_Error_With_Source_Value<
        s_target.structure.Reference,
        s_error.Error,
        s_source.Value
    >
    
    export type Reference_Constraints = temp_pareto_core.Refiner_With_Error_With_Source_Value<
        s_target.structure.Reference_Constraints,
        s_error.Error,
        s_source.Value
    >
    
    export type Regular_Expression = temp_pareto_core.Refiner_With_Error_With_Source_Value<
        s_target.structure.Regular_Expression,
        s_error.Error,
        s_source.Value
    >
    
    export type Structure = temp_pareto_core.Refiner_With_Error_With_Source_Value<
        s_target.structure.Structure,
        s_error.Error,
        s_source.Value
    >
    
    export type Value_Result = temp_pareto_core.Refiner_With_Error_With_Source_Value<
        s_target.structure.Value_Result,
        s_error.Error,
        s_source.Value
    >
}

export namespace declarations {
    
    export type Presence = temp_pareto_core.Refiner_With_Error_With_Source_Value<
        s_target.declarations.Presence,
        s_error.Error,
        s_source.Value
    >
    
    export type Signature_Value_Reference = temp_pareto_core.Refiner_With_Error_With_Source_Value<
        s_target.declarations.Signature_Value_Reference,
        s_error.Error,
        s_source.Value
    >
    
    export type Signature = temp_pareto_core.Refiner_With_Error_With_Source_Value<
        s_target.declarations.Signature,
        s_error.Error,
        s_source.Value
    >
    
    export type Declarations = temp_pareto_core.Refiner_With_Error_With_Source_Value<
        s_target.declarations.Declarations,
        s_error.Error,
        s_source.Value
    >
    
    export type Declaration = temp_pareto_core.Refiner_With_Error_With_Source_Value<
        s_target.declarations.Declaration,
        s_error.Error,
        s_source.Value
    >
    
    export type Namespaces = temp_pareto_core.Refiner_With_Error_With_Source_Value<
        s_target.declarations.Namespaces,
        s_error.Error,
        s_source.Value
    >
    
    export type Declaration_Namespace = temp_pareto_core.Refiner_With_Error_With_Source_Value<
        s_target.declarations.Declaration_Namespace,
        s_error.Error,
        s_source.Value
    >
}

export namespace resolver {
    
    export type Value_Reference = temp_pareto_core.Refiner_With_Error_With_Source_Value<
        s_target.resolver.Value_Reference,
        s_error.Error,
        s_source.Value
    >
    
    export type Simple_Component_Selection = temp_pareto_core.Refiner_With_Error_With_Source_Value<
        s_target.resolver.Simple_Component_Selection,
        s_error.Error,
        s_source.Value
    >
    
    export type Relative_Value_Selection = temp_pareto_core.Refiner_With_Error_With_Source_Value<
        s_target.resolver.Relative_Value_Selection,
        s_error.Error,
        s_source.Value
    >
    
    export type Possible_Value_Selection = temp_pareto_core.Refiner_With_Error_With_Source_Value<
        s_target.resolver.Possible_Value_Selection,
        s_error.Error,
        s_source.Value
    >
    
    export type Option_Constraints = temp_pareto_core.Refiner_With_Error_With_Source_Value<
        s_target.resolver.Option_Constraints,
        s_error.Error,
        s_source.Value
    >
    
    export type Guaranteed_Value_Selection = temp_pareto_core.Refiner_With_Error_With_Source_Value<
        s_target.resolver.Guaranteed_Value_Selection,
        s_error.Error,
        s_source.Value
    >
    
    export type Lookup_Selection = temp_pareto_core.Refiner_With_Error_With_Source_Value<
        s_target.resolver.Lookup_Selection,
        s_error.Error,
        s_source.Value
    >
    
    export type Reference_Constraints = temp_pareto_core.Refiner_With_Error_With_Source_Value<
        s_target.resolver.Reference_Constraints,
        s_error.Error,
        s_source.Value
    >
    
    export type Resolver = temp_pareto_core.Refiner_With_Error_With_Source_Value<
        s_target.resolver.Resolver,
        s_error.Error,
        s_source.Value
    >
    
    export type Result_Selection = temp_pareto_core.Refiner_With_Error_With_Source_Value<
        s_target.resolver.Result_Selection,
        s_error.Error,
        s_source.Value
    >
    
    export type Checks = temp_pareto_core.Refiner_With_Error_With_Source_Value<
        s_target.resolver.Checks,
        s_error.Error,
        s_source.Value
    >
    
    export type Value = temp_pareto_core.Refiner_With_Error_With_Source_Value<
        s_target.resolver.Value,
        s_error.Error,
        s_source.Value
    >
}
