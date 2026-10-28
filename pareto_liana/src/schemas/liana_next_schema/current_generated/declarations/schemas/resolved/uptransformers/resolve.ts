import type * as p_ from 'pareto-core/refiner'
import type * as p_schema_deprecated from 'pareto-core/schema'

import type * as s_source from "../../../../structure/schemas/unresolved.js"
import type * as s_target from "../../../../structure/schemas/resolved.js"
import type * as s_error from "../../../../structure/schemas/resolving.js"

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

export type Directory = temp_pareto_core.Refiner_With_Error_With_Source_Value_With_Values_And_Lookups<
    s_target.Directory,
    s_error.Error,
    s_source.Directory,
    {
        readonly 'types': s_target.structure.Types
    },
    null
>

export type Node = temp_pareto_core.Refiner_With_Error_With_Source_Value_With_Values_And_Lookups<
    s_target.Node,
    s_error.Error,
    s_source.Node,
    {
        readonly 'types': s_target.structure.Types
    },
    null
>

export type Type_Specification = temp_pareto_core.Refiner_With_Error_With_Source_Value<
    s_target.Type_Specification,
    s_error.Error,
    s_source.Type_Specification
>

export namespace structure {
    
    export type Basic_Types = temp_pareto_core.Refiner_With_Error_With_Source_Value<
        s_target.structure.Basic_Types,
        s_error.Error,
        s_source.structure.Basic_Types
    >
    
    export type Types = temp_pareto_core.Refiner_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.structure.Types,
        s_error.Error,
        s_source.structure.Types,
        {
            readonly 'basic types': p_schema_deprecated.Optional_Value<s_target.structure.Basic_Types>
            readonly 'child namespaces': s_target.structure.Namespaces
        },
        {
            readonly 'sibling namespaces': p_.lookup.Acyclic<s_target.structure.Namespaces.D>
        }
    >
    
    export type Namespaces = temp_pareto_core.Refiner_With_Error_With_Source_Value<
        s_target.structure.Namespaces,
        s_error.Error,
        s_source.structure.Namespaces
    >
    
    export type Type = temp_pareto_core.Refiner_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.structure.Type,
        s_error.Error,
        s_source.structure.Type,
        {
            readonly 'basic types': p_schema_deprecated.Optional_Value<s_target.structure.Basic_Types>
            readonly 'child namespaces': s_target.structure.Namespaces
        },
        {
            readonly 'noncircular sibling types': p_.lookup.Acyclic<s_target.structure.Types.D>
            readonly 'possibly circular dependent sibling types': p_.lookup.Cyclic<s_target.structure.Types.D>
            readonly 'sibling namespaces': p_.lookup.Acyclic<s_target.structure.Namespaces.D>
        }
    >
    
    export type Group = temp_pareto_core.Refiner_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.structure.Group,
        s_error.Error,
        s_source.structure.Group,
        {
            readonly 'basic types': p_schema_deprecated.Optional_Value<s_target.structure.Basic_Types>
            readonly 'child namespaces': s_target.structure.Namespaces
        },
        {
            readonly 'noncircular sibling types': p_.lookup.Acyclic<s_target.structure.Types.D>
            readonly 'possibly circular dependent sibling types': p_.lookup.Cyclic<s_target.structure.Types.D>
            readonly 'sibling namespaces': p_.lookup.Acyclic<s_target.structure.Namespaces.D>
        }
    >
    
    export type Value = temp_pareto_core.Refiner_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.structure.Value,
        s_error.Error,
        s_source.structure.Value,
        {
            readonly 'basic types': p_schema_deprecated.Optional_Value<s_target.structure.Basic_Types>
            readonly 'child namespaces': s_target.structure.Namespaces
        },
        {
            readonly 'noncircular sibling types': p_.lookup.Acyclic<s_target.structure.Types.D>
            readonly 'possibly circular dependent sibling types': p_.lookup.Cyclic<s_target.structure.Types.D>
            readonly 'sibling namespaces': p_.lookup.Acyclic<s_target.structure.Namespaces.D>
        }
    >
    
    export type Dictionary = temp_pareto_core.Refiner_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.structure.Dictionary,
        s_error.Error,
        s_source.structure.Dictionary,
        {
            readonly 'basic types': p_schema_deprecated.Optional_Value<s_target.structure.Basic_Types>
            readonly 'child namespaces': s_target.structure.Namespaces
        },
        {
            readonly 'noncircular sibling types': p_.lookup.Acyclic<s_target.structure.Types.D>
            readonly 'possibly circular dependent sibling types': p_.lookup.Cyclic<s_target.structure.Types.D>
            readonly 'sibling namespaces': p_.lookup.Acyclic<s_target.structure.Namespaces.D>
        }
    >
    
    export type Value_Reference = temp_pareto_core.Refiner_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.structure.Value_Reference,
        s_error.Error,
        s_source.structure.Value_Reference,
        {
            readonly 'child namespaces': s_target.structure.Namespaces
        },
        {
            readonly 'types': p_.lookup.Acyclic<s_target.structure.Types.D>
            readonly 'sibling namespaces': p_.lookup.Acyclic<s_target.structure.Namespaces.D>
        }
    >
    
    export type Option_Constraints = temp_pareto_core.Refiner_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.structure.Option_Constraints,
        s_error.Error,
        s_source.structure.Option_Constraints,
        {
            readonly 'child namespaces': s_target.structure.Namespaces
        },
        {
            readonly 'types': p_.lookup.Acyclic<s_target.structure.Types.D>
            readonly 'sibling namespaces': p_.lookup.Acyclic<s_target.structure.Namespaces.D>
        }
    >
    
    export type Reference = temp_pareto_core.Refiner_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.structure.Reference,
        s_error.Error,
        s_source.structure.Reference,
        {
            readonly 'basic types': p_schema_deprecated.Optional_Value<s_target.structure.Basic_Types>
            readonly 'child namespaces': s_target.structure.Namespaces
        },
        {
            readonly 'noncircular sibling types': p_.lookup.Acyclic<s_target.structure.Types.D>
            readonly 'possibly circular dependent sibling types': p_.lookup.Cyclic<s_target.structure.Types.D>
            readonly 'sibling namespaces': p_.lookup.Acyclic<s_target.structure.Namespaces.D>
        }
    >
    
    export type Reference_Constraints = temp_pareto_core.Refiner_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.structure.Reference_Constraints,
        s_error.Error,
        s_source.structure.Reference_Constraints,
        {
            readonly 'child namespaces': s_target.structure.Namespaces
        },
        {
            readonly 'types': p_.lookup.Acyclic<s_target.structure.Types.D>
            readonly 'sibling namespaces': p_.lookup.Acyclic<s_target.structure.Namespaces.D>
        }
    >
    
    export type Regular_Expression = temp_pareto_core.Refiner_With_Error_With_Source_Value<
        s_target.structure.Regular_Expression,
        s_error.Error,
        s_source.structure.Regular_Expression
    >
    
    export type Structure = temp_pareto_core.Refiner_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.structure.Structure,
        s_error.Error,
        s_source.structure.Structure,
        null,
        {
            readonly 'sibling namespaces': p_.lookup.Acyclic<s_target.structure.Namespaces.D>
        }
    >
    
    export type Value_Result = temp_pareto_core.Refiner_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.structure.Value_Result,
        s_error.Error,
        s_source.structure.Value_Result,
        {
            readonly 'child namespaces': s_target.structure.Namespaces
        },
        {
            readonly 'types': p_.lookup.Acyclic<s_target.structure.Types.D>
            readonly 'sibling namespaces': p_.lookup.Acyclic<s_target.structure.Namespaces.D>
        }
    >
}

export namespace declarations {
    
    export type Presence = temp_pareto_core.Refiner_With_Error_With_Source_Value<
        s_target.declarations.Presence,
        s_error.Error,
        s_source.declarations.Presence
    >
    
    export type Signature_Value_Reference = temp_pareto_core.Refiner_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.declarations.Signature_Value_Reference,
        s_error.Error,
        s_source.declarations.Signature_Value_Reference,
        {
            readonly 'child namespaces': s_target.structure.Namespaces
        },
        {
            readonly 'types': p_.lookup.Acyclic<s_target.structure.Types.D>
            readonly 'sibling namespaces': p_.lookup.Acyclic<s_target.structure.Namespaces.D>
        }
    >
    
    export type Signature = temp_pareto_core.Refiner_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.declarations.Signature,
        s_error.Error,
        s_source.declarations.Signature,
        {
            readonly 'types': s_target.structure.Types
            readonly 'child namespaces': s_target.structure.Namespaces
        },
        {
            readonly 'sibling namespaces': p_.lookup.Acyclic<s_target.structure.Namespaces.D>
        }
    >
    
    export type Declarations = temp_pareto_core.Refiner_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.declarations.Declarations,
        s_error.Error,
        s_source.declarations.Declarations,
        {
            readonly 'types': s_target.structure.Types
            readonly 'child namespaces': s_target.structure.Namespaces
        },
        {
            readonly 'sibling namespaces': p_.lookup.Acyclic<s_target.structure.Namespaces.D>
        }
    >
    
    export type Declaration = temp_pareto_core.Refiner_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.declarations.Declaration,
        s_error.Error,
        s_source.declarations.Declaration,
        {
            readonly 'types': s_target.structure.Types
            readonly 'child namespaces': s_target.structure.Namespaces
        },
        {
            readonly 'sibling declarations': p_.lookup.Acyclic<s_target.declarations.Declarations.D>
            readonly 'sibling namespaces': p_.lookup.Acyclic<s_target.structure.Namespaces.D>
        }
    >
    
    export type Namespaces = temp_pareto_core.Refiner_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.declarations.Namespaces,
        s_error.Error,
        s_source.declarations.Namespaces,
        {
            readonly 'definition': s_target.structure.Namespaces
        },
        null
    >
    
    export type Declaration_Namespace = temp_pareto_core.Refiner_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.declarations.Declaration_Namespace,
        s_error.Error,
        s_source.declarations.Declaration_Namespace,
        {
            readonly 'definition': s_target.structure.Structure
        },
        {
            readonly 'sibling namespaces': p_.lookup.Acyclic<s_target.structure.Namespaces.D>
        }
    >
}

export namespace resolver {
    
    export type Value_Reference = temp_pareto_core.Refiner_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.resolver.Value_Reference,
        s_error.Error,
        s_source.resolver.Value_Reference,
        {
            readonly 'child namespaces': s_target.structure.Namespaces
            readonly 'sibling namespaces': p_schema_deprecated.Optional_Value<s_target.structure.Namespaces>
        },
        {
            readonly 'types': p_.lookup.Acyclic<s_target.structure.Types.D>
        }
    >
    
    export type Simple_Component_Selection = temp_pareto_core.Refiner_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.resolver.Simple_Component_Selection,
        s_error.Error,
        s_source.resolver.Simple_Component_Selection,
        {
            readonly 'child namespaces': s_target.structure.Namespaces
            readonly 'sibling namespaces': p_schema_deprecated.Optional_Value<s_target.structure.Namespaces>
        },
        {
            readonly 'types': p_.lookup.Acyclic<s_target.structure.Types.D>
        }
    >
    
    export type Relative_Value_Selection = temp_pareto_core.Refiner_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.resolver.Relative_Value_Selection,
        s_error.Error,
        s_source.resolver.Relative_Value_Selection,
        {
            readonly 'value': s_target.structure.Value
            readonly 'types': s_target.structure.Types
            readonly 'child namespaces': s_target.structure.Namespaces
            readonly 'sibling namespaces': p_schema_deprecated.Optional_Value<s_target.structure.Namespaces>
        },
        null
    >
    
    export type Possible_Value_Selection = temp_pareto_core.Refiner_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.resolver.Possible_Value_Selection,
        s_error.Error,
        s_source.resolver.Possible_Value_Selection,
        {
            readonly 'definition': s_target.structure.Value
            readonly 'list cursor': p_schema_deprecated.Optional_Value<s_target.structure.Value_Result>
            readonly 'linked entry': p_schema_deprecated.Optional_Value<s_target.structure.Value>
            readonly 'current dictionary': p_schema_deprecated.Optional_Value<s_target.structure.Dictionary>
            readonly 'declaration': s_target.declarations.Declaration
            readonly 'declarations': s_target.declarations.Declarations
            readonly 'types': s_target.structure.Types
            readonly 'option constraints': p_schema_deprecated.Optional_Value<s_target.structure.Option_Constraints>
            readonly 'child namespaces': s_target.structure.Namespaces
            readonly 'child declarations': s_target.declarations.Namespaces
            readonly 'sibling declarations': p_schema_deprecated.Optional_Value<s_target.declarations.Namespaces>
            readonly 'containing group': p_schema_deprecated.Optional_Value<s_target.structure.Group>
            readonly 'parent containing group': p_schema_deprecated.Optional_Value<s_target.structure.Group>
            readonly 'sibling namespaces': p_schema_deprecated.Optional_Value<s_target.structure.Namespaces>
        },
        {
            readonly 'sibling option constraints': p_.lookup.Acyclic<s_target.resolver.Option_Constraints.O.value.D>
        }
    >
    
    export type Option_Constraints = temp_pareto_core.Refiner_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.resolver.Option_Constraints,
        s_error.Error,
        s_source.resolver.Option_Constraints,
        {
            readonly 'constraints': s_target.structure.Option_Constraints
            readonly 'definition': s_target.structure.Value
            readonly 'list cursor': p_schema_deprecated.Optional_Value<s_target.structure.Value_Result>
            readonly 'linked entry': p_schema_deprecated.Optional_Value<s_target.structure.Value>
            readonly 'current dictionary': p_schema_deprecated.Optional_Value<s_target.structure.Dictionary>
            readonly 'declaration': s_target.declarations.Declaration
            readonly 'declarations': s_target.declarations.Declarations
            readonly 'types': s_target.structure.Types
            readonly 'option constraints': p_schema_deprecated.Optional_Value<s_target.structure.Option_Constraints>
            readonly 'child namespaces': s_target.structure.Namespaces
            readonly 'child declarations': s_target.declarations.Namespaces
            readonly 'sibling declarations': p_schema_deprecated.Optional_Value<s_target.declarations.Namespaces>
            readonly 'containing group': p_schema_deprecated.Optional_Value<s_target.structure.Group>
            readonly 'parent containing group': p_schema_deprecated.Optional_Value<s_target.structure.Group>
            readonly 'sibling namespaces': p_schema_deprecated.Optional_Value<s_target.structure.Namespaces>
        },
        {
            readonly 'sibling option constraints': p_.lookup.Acyclic<s_target.resolver.Option_Constraints.O.value.D>
        }
    >
    
    export type Guaranteed_Value_Selection = temp_pareto_core.Refiner_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.resolver.Guaranteed_Value_Selection,
        s_error.Error,
        s_source.resolver.Guaranteed_Value_Selection,
        {
            readonly 'definition': s_target.structure.Value
            readonly 'list cursor': p_schema_deprecated.Optional_Value<s_target.structure.Value_Result>
            readonly 'linked entry': p_schema_deprecated.Optional_Value<s_target.structure.Value>
            readonly 'current dictionary': p_schema_deprecated.Optional_Value<s_target.structure.Dictionary>
            readonly 'declaration': s_target.declarations.Declaration
            readonly 'declarations': s_target.declarations.Declarations
            readonly 'types': s_target.structure.Types
            readonly 'option constraints': p_schema_deprecated.Optional_Value<s_target.structure.Option_Constraints>
            readonly 'child namespaces': s_target.structure.Namespaces
            readonly 'child declarations': s_target.declarations.Namespaces
            readonly 'sibling declarations': p_schema_deprecated.Optional_Value<s_target.declarations.Namespaces>
            readonly 'containing group': p_schema_deprecated.Optional_Value<s_target.structure.Group>
            readonly 'parent containing group': p_schema_deprecated.Optional_Value<s_target.structure.Group>
            readonly 'sibling namespaces': p_schema_deprecated.Optional_Value<s_target.structure.Namespaces>
        },
        {
            readonly 'sibling option constraints': p_.lookup.Acyclic<s_target.resolver.Option_Constraints.O.value.D>
        }
    >
    
    export type Lookup_Selection = temp_pareto_core.Refiner_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.resolver.Lookup_Selection,
        s_error.Error,
        s_source.resolver.Lookup_Selection,
        {
            readonly 'definition': s_target.structure.Value
            readonly 'list cursor': p_schema_deprecated.Optional_Value<s_target.structure.Value_Result>
            readonly 'linked entry': p_schema_deprecated.Optional_Value<s_target.structure.Value>
            readonly 'current dictionary': p_schema_deprecated.Optional_Value<s_target.structure.Dictionary>
            readonly 'declaration': s_target.declarations.Declaration
            readonly 'declarations': s_target.declarations.Declarations
            readonly 'types': s_target.structure.Types
            readonly 'option constraints': p_schema_deprecated.Optional_Value<s_target.structure.Option_Constraints>
            readonly 'child namespaces': s_target.structure.Namespaces
            readonly 'child declarations': s_target.declarations.Namespaces
            readonly 'sibling declarations': p_schema_deprecated.Optional_Value<s_target.declarations.Namespaces>
            readonly 'containing group': p_schema_deprecated.Optional_Value<s_target.structure.Group>
            readonly 'parent containing group': p_schema_deprecated.Optional_Value<s_target.structure.Group>
            readonly 'sibling namespaces': p_schema_deprecated.Optional_Value<s_target.structure.Namespaces>
        },
        {
            readonly 'sibling option constraints': p_.lookup.Acyclic<s_target.resolver.Option_Constraints.O.value.D>
        }
    >
    
    export type Reference_Constraints = temp_pareto_core.Refiner_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.resolver.Reference_Constraints,
        s_error.Error,
        s_source.resolver.Reference_Constraints,
        {
            readonly 'constraints': s_target.structure.Reference_Constraints
            readonly 'value': s_target.structure.Value
            readonly 'types': s_target.structure.Types
            readonly 'child namespaces': s_target.structure.Namespaces
            readonly 'sibling namespaces': p_schema_deprecated.Optional_Value<s_target.structure.Namespaces>
        },
        null
    >
    
    export type Resolver = temp_pareto_core.Refiner_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.resolver.Resolver,
        s_error.Error,
        s_source.resolver.Resolver,
        {
            readonly 'definition': s_target.structure.Structure
            readonly 'declarations': s_target.declarations.Declaration_Namespace
            readonly 'sibling declarations': p_schema_deprecated.Optional_Value<s_target.declarations.Namespaces>
            readonly 'sibling namespaces': p_schema_deprecated.Optional_Value<s_target.structure.Namespaces>
        },
        null
    >
    
    export type Result_Selection = temp_pareto_core.Refiner_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.resolver.Result_Selection,
        s_error.Error,
        s_source.resolver.Result_Selection,
        {
            readonly 'definition': s_target.structure.Value
            readonly 'list cursor': p_schema_deprecated.Optional_Value<s_target.structure.Value_Result>
            readonly 'linked entry': p_schema_deprecated.Optional_Value<s_target.structure.Value>
            readonly 'current dictionary': p_schema_deprecated.Optional_Value<s_target.structure.Dictionary>
            readonly 'declaration': s_target.declarations.Declaration
            readonly 'declarations': s_target.declarations.Declarations
            readonly 'types': s_target.structure.Types
            readonly 'option constraints': p_schema_deprecated.Optional_Value<s_target.structure.Option_Constraints>
            readonly 'child namespaces': s_target.structure.Namespaces
            readonly 'child declarations': s_target.declarations.Namespaces
            readonly 'sibling declarations': p_schema_deprecated.Optional_Value<s_target.declarations.Namespaces>
            readonly 'containing group': p_schema_deprecated.Optional_Value<s_target.structure.Group>
            readonly 'parent containing group': p_schema_deprecated.Optional_Value<s_target.structure.Group>
            readonly 'sibling namespaces': p_schema_deprecated.Optional_Value<s_target.structure.Namespaces>
        },
        {
            readonly 'sibling option constraints': p_.lookup.Acyclic<s_target.resolver.Option_Constraints.O.value.D>
        }
    >
    
    export type Checks = temp_pareto_core.Refiner_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.resolver.Checks,
        s_error.Error,
        s_source.resolver.Checks,
        {
            readonly 'definition': s_target.structure.Value
            readonly 'list cursor': p_schema_deprecated.Optional_Value<s_target.structure.Value_Result>
            readonly 'linked entry': p_schema_deprecated.Optional_Value<s_target.structure.Value>
            readonly 'current dictionary': p_schema_deprecated.Optional_Value<s_target.structure.Dictionary>
            readonly 'declaration': s_target.declarations.Declaration
            readonly 'declarations': s_target.declarations.Declarations
            readonly 'types': s_target.structure.Types
            readonly 'option constraints': p_schema_deprecated.Optional_Value<s_target.structure.Option_Constraints>
            readonly 'child namespaces': s_target.structure.Namespaces
            readonly 'child declarations': s_target.declarations.Namespaces
            readonly 'sibling declarations': p_schema_deprecated.Optional_Value<s_target.declarations.Namespaces>
            readonly 'containing group': p_schema_deprecated.Optional_Value<s_target.structure.Group>
            readonly 'parent containing group': p_schema_deprecated.Optional_Value<s_target.structure.Group>
            readonly 'sibling namespaces': p_schema_deprecated.Optional_Value<s_target.structure.Namespaces>
        },
        {
            readonly 'sibling option constraints': p_.lookup.Acyclic<s_target.resolver.Option_Constraints.O.value.D>
        }
    >
    
    export type Value = temp_pareto_core.Refiner_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.resolver.Value,
        s_error.Error,
        s_source.resolver.Value,
        {
            readonly 'definition': s_target.structure.Value
            readonly 'list cursor': p_schema_deprecated.Optional_Value<s_target.structure.Value_Result>
            readonly 'linked entry': p_schema_deprecated.Optional_Value<s_target.structure.Value>
            readonly 'current dictionary': p_schema_deprecated.Optional_Value<s_target.structure.Dictionary>
            readonly 'declaration': s_target.declarations.Declaration
            readonly 'declarations': s_target.declarations.Declarations
            readonly 'types': s_target.structure.Types
            readonly 'option constraints': p_schema_deprecated.Optional_Value<s_target.structure.Option_Constraints>
            readonly 'child namespaces': s_target.structure.Namespaces
            readonly 'child declarations': s_target.declarations.Namespaces
            readonly 'sibling declarations': p_schema_deprecated.Optional_Value<s_target.declarations.Namespaces>
            readonly 'containing group': p_schema_deprecated.Optional_Value<s_target.structure.Group>
            readonly 'parent containing group': p_schema_deprecated.Optional_Value<s_target.structure.Group>
            readonly 'sibling namespaces': p_schema_deprecated.Optional_Value<s_target.structure.Namespaces>
        },
        {
            readonly 'sibling option constraints': p_.lookup.Acyclic<s_target.resolver.Option_Constraints.O.value.D>
        }
    >
}
