import type * as p_ from 'pareto-core/transformer/declaration'
import type * as p_schema_deprecated from 'pareto-core/schema'

import type * as s_source from "../../../../structure/schemas/unresolved.js"
import type * as s_target from "../../../../structure/schemas/resolved.js"
import type * as s_error from "../../../../structure/schemas/resolving.js"

export namespace structure {
    
    export type Basic_Types = p_.Transformer_With_Error_With_Source_Value<
        s_target.structure.Basic_Types,
        s_error.Error,
        s_source.structure.Basic_Types
    >
    
    export type Dictionary = p_.Transformer_With_Error_With_Source_Value_With_Values_And_Lookups<
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
    
    export type Group = p_.Transformer_With_Error_With_Source_Value_With_Values_And_Lookups<
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
    
    export type Namespaces = p_.Transformer_With_Error_With_Source_Value<
        s_target.structure.Namespaces,
        s_error.Error,
        s_source.structure.Namespaces
    >
    
    export type Value_Reference = p_.Transformer_With_Error_With_Source_Value_With_Values_And_Lookups<
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
    
    export type Option_Constraints = p_.Transformer_With_Error_With_Source_Value_With_Values_And_Lookups<
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
    
    export type Value = p_.Transformer_With_Error_With_Source_Value_With_Values_And_Lookups<
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
    
    export type Reference = p_.Transformer_With_Error_With_Source_Value_With_Values_And_Lookups<
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
    
    export type Reference_Constraints = p_.Transformer_With_Error_With_Source_Value_With_Values_And_Lookups<
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
    
    export type Regular_Expression = p_.Transformer_With_Error_With_Source_Value<
        s_target.structure.Regular_Expression,
        s_error.Error,
        s_source.structure.Regular_Expression
    >
    
    export type Structure = p_.Transformer_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.structure.Structure,
        s_error.Error,
        s_source.structure.Structure,
        null,
        {
            readonly 'sibling namespaces': p_.lookup.Acyclic<s_target.structure.Namespaces.D>
        }
    >
    
    export type Type = p_.Transformer_With_Error_With_Source_Value_With_Values_And_Lookups<
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
    
    export type Types = p_.Transformer_With_Error_With_Source_Value_With_Values_And_Lookups<
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
    
    export type Optional_Result = p_.Transformer_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.structure.Optional_Result,
        s_error.Error,
        s_source.structure.Optional_Result,
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
    
    export type Presence = p_.Transformer_With_Error_With_Source_Value<
        s_target.declarations.Presence,
        s_error.Error,
        s_source.declarations.Presence
    >
    
    export type Declaration = p_.Transformer_With_Error_With_Source_Value_With_Values_And_Lookups<
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
    
    export type Signature = p_.Transformer_With_Error_With_Source_Value_With_Values_And_Lookups<
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
    
    export type Declarations = p_.Transformer_With_Error_With_Source_Value_With_Values_And_Lookups<
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
    
    export type Signature_Value_Reference = p_.Transformer_With_Error_With_Source_Value_With_Values_And_Lookups<
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
    
    export type Namespaces = p_.Transformer_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.declarations.Namespaces,
        s_error.Error,
        s_source.declarations.Namespaces,
        {
            readonly 'definition': s_target.structure.Namespaces
        },
        null
    >
    
    export type Namespace = p_.Transformer_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.declarations.Namespace,
        s_error.Error,
        s_source.declarations.Namespace,
        {
            readonly 'definition': s_target.structure.Structure
        },
        {
            readonly 'sibling namespaces': p_.lookup.Acyclic<s_target.structure.Namespaces.D>
        }
    >
}

export namespace resolver {
    
    export type Value = p_.Transformer_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.resolver.Value,
        s_error.Error,
        s_source.resolver.Value,
        {
            readonly 'definition': s_target.structure.Value
            readonly 'list cursor': p_schema_deprecated.Optional_Value<s_target.structure.Optional_Result>
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
    
    export type Guaranteed_Value_Selection = p_.Transformer_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.resolver.Guaranteed_Value_Selection,
        s_error.Error,
        s_source.resolver.Guaranteed_Value_Selection,
        {
            readonly 'definition': s_target.structure.Value
            readonly 'list cursor': p_schema_deprecated.Optional_Value<s_target.structure.Optional_Result>
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
    
    export type Lookup_Selection = p_.Transformer_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.resolver.Lookup_Selection,
        s_error.Error,
        s_source.resolver.Lookup_Selection,
        {
            readonly 'definition': s_target.structure.Value
            readonly 'list cursor': p_schema_deprecated.Optional_Value<s_target.structure.Optional_Result>
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
    
    export type Possible_Value_Branches = p_.Transformer_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.resolver.Possible_Value_Branches,
        s_error.Error,
        s_source.resolver.Possible_Value_Branches,
        {
            readonly 'target': s_target.structure.Value
            readonly 'options': s_target.structure.Value.state.options
            readonly 'types': s_target.structure.Types
            readonly 'child namespaces': s_target.structure.Namespaces
            readonly 'sibling namespaces': p_schema_deprecated.Optional_Value<s_target.structure.Namespaces>
        },
        null
    >
    
    export type Option_Constraints = p_.Transformer_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.resolver.Option_Constraints,
        s_error.Error,
        s_source.resolver.Option_Constraints,
        {
            readonly 'constraints': s_target.structure.Option_Constraints
            readonly 'definition': s_target.structure.Value
            readonly 'list cursor': p_schema_deprecated.Optional_Value<s_target.structure.Optional_Result>
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
    
    export type Possible_Value_Selection = p_.Transformer_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.resolver.Possible_Value_Selection,
        s_error.Error,
        s_source.resolver.Possible_Value_Selection,
        {
            readonly 'definition': s_target.structure.Value
            readonly 'list cursor': p_schema_deprecated.Optional_Value<s_target.structure.Optional_Result>
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
    
    export type Reference_Constraints = p_.Transformer_With_Error_With_Source_Value_With_Values_And_Lookups<
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
    
    export type Relative_Value_Selection = p_.Transformer_With_Error_With_Source_Value_With_Values_And_Lookups<
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
    
    export type Resolver = p_.Transformer_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.resolver.Resolver,
        s_error.Error,
        s_source.resolver.Resolver,
        {
            readonly 'definition': s_target.structure.Structure
            readonly 'declarations': s_target.declarations.Namespace
            readonly 'sibling declarations': p_schema_deprecated.Optional_Value<s_target.declarations.Namespaces>
            readonly 'sibling namespaces': p_schema_deprecated.Optional_Value<s_target.structure.Namespaces>
        },
        null
    >
    
    export type Result_Selection = p_.Transformer_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.resolver.Result_Selection,
        s_error.Error,
        s_source.resolver.Result_Selection,
        {
            readonly 'definition': s_target.structure.Value
            readonly 'list cursor': p_schema_deprecated.Optional_Value<s_target.structure.Optional_Result>
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
    
    export type Checks = p_.Transformer_With_Error_With_Source_Value_With_Values_And_Lookups<
        s_target.resolver.Checks,
        s_error.Error,
        s_source.resolver.Checks,
        {
            readonly 'definition': s_target.structure.Value
            readonly 'list cursor': p_schema_deprecated.Optional_Value<s_target.structure.Optional_Result>
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
    
    export type Value_Reference = p_.Transformer_With_Error_With_Source_Value_With_Values_And_Lookups<
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
}

export type Directory = p_.Transformer_With_Error_With_Source_Value_With_Values_And_Lookups<
    s_target.Directory,
    s_error.Error,
    s_source.Directory,
    {
        readonly 'types': s_target.structure.Types
    },
    null
>

export type Node = p_.Transformer_With_Error_With_Source_Value_With_Values_And_Lookups<
    s_target.Node,
    s_error.Error,
    s_source.Node,
    {
        readonly 'types': s_target.structure.Types
    },
    null
>

export type Schema = p_.Transformer_With_Error_With_Source_Value<
    s_target.Schema,
    s_error.Error,
    s_source.Schema
>

export type Authoring_Specification = p_.Transformer_With_Error_With_Source_Value<
    s_target.Authoring_Specification,
    s_error.Error,
    s_source.Authoring_Specification
>

export type Document_Specification = p_.Transformer_With_Error_With_Source_Value<
    s_target.Document_Specification,
    s_error.Error,
    s_source.Document_Specification
>
