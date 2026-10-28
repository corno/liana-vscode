
import type * as unresolved_uptransformers_unmarshal from "./schemas/unresolved/uptransformers/unmarshal.js"
import type * as unresolved_downtransformers_marshal from "./schemas/unresolved/downtransformers/marshal.js"
import type * as resolved_uptransformers_resolve from "./schemas/resolved/uptransformers/resolve.js"
import type * as resolved_downtransformers_unresolve from "./schemas/resolved/downtransformers/unresolve.js"

export type API = {
    readonly 'unresolved': {
        readonly 'uptransformers': {
            readonly 'unmarshal': {
                readonly 'Directory': unresolved_uptransformers_unmarshal.Directory
                readonly 'Node': unresolved_uptransformers_unmarshal.Node
                readonly 'Type Specification': unresolved_uptransformers_unmarshal.Type_Specification
                readonly 'structure': {
                    readonly 'Basic Types': unresolved_uptransformers_unmarshal.structure.Basic_Types
                    readonly 'Types': unresolved_uptransformers_unmarshal.structure.Types
                    readonly 'Namespaces': unresolved_uptransformers_unmarshal.structure.Namespaces
                    readonly 'Type': unresolved_uptransformers_unmarshal.structure.Type
                    readonly 'Group': unresolved_uptransformers_unmarshal.structure.Group
                    readonly 'Value': unresolved_uptransformers_unmarshal.structure.Value
                    readonly 'Dictionary': unresolved_uptransformers_unmarshal.structure.Dictionary
                    readonly 'Value Reference': unresolved_uptransformers_unmarshal.structure.Value_Reference
                    readonly 'Option Constraints': unresolved_uptransformers_unmarshal.structure.Option_Constraints
                    readonly 'Reference': unresolved_uptransformers_unmarshal.structure.Reference
                    readonly 'Reference Constraints': unresolved_uptransformers_unmarshal.structure.Reference_Constraints
                    readonly 'Regular Expression': unresolved_uptransformers_unmarshal.structure.Regular_Expression
                    readonly 'Structure': unresolved_uptransformers_unmarshal.structure.Structure
                    readonly 'Value Result': unresolved_uptransformers_unmarshal.structure.Value_Result
                }
                readonly 'declarations': {
                    readonly 'Presence': unresolved_uptransformers_unmarshal.declarations.Presence
                    readonly 'Signature Value Reference': unresolved_uptransformers_unmarshal.declarations.Signature_Value_Reference
                    readonly 'Signature': unresolved_uptransformers_unmarshal.declarations.Signature
                    readonly 'Declarations': unresolved_uptransformers_unmarshal.declarations.Declarations
                    readonly 'Declaration': unresolved_uptransformers_unmarshal.declarations.Declaration
                    readonly 'Namespaces': unresolved_uptransformers_unmarshal.declarations.Namespaces
                    readonly 'Declaration Namespace': unresolved_uptransformers_unmarshal.declarations.Declaration_Namespace
                }
                readonly 'resolver': {
                    readonly 'Value Reference': unresolved_uptransformers_unmarshal.resolver.Value_Reference
                    readonly 'Relative Value Selection': unresolved_uptransformers_unmarshal.resolver.Relative_Value_Selection
                    readonly 'Possible Value Selection': unresolved_uptransformers_unmarshal.resolver.Possible_Value_Selection
                    readonly 'Option Constraints': unresolved_uptransformers_unmarshal.resolver.Option_Constraints
                    readonly 'Guaranteed Value Selection': unresolved_uptransformers_unmarshal.resolver.Guaranteed_Value_Selection
                    readonly 'Lookup Selection': unresolved_uptransformers_unmarshal.resolver.Lookup_Selection
                    readonly 'Reference Constraints': unresolved_uptransformers_unmarshal.resolver.Reference_Constraints
                    readonly 'Resolver': unresolved_uptransformers_unmarshal.resolver.Resolver
                    readonly 'Result Selection': unresolved_uptransformers_unmarshal.resolver.Result_Selection
                    readonly 'Checks': unresolved_uptransformers_unmarshal.resolver.Checks
                    readonly 'Value': unresolved_uptransformers_unmarshal.resolver.Value
                }
            }
        }
        readonly 'downtransformers': {
            readonly 'marshal': {
                readonly 'Directory': unresolved_downtransformers_marshal.Directory
                readonly 'Node': unresolved_downtransformers_marshal.Node
                readonly 'Type Specification': unresolved_downtransformers_marshal.Type_Specification
                readonly 'structure': {
                    readonly 'Basic Types': unresolved_downtransformers_marshal.structure.Basic_Types
                    readonly 'Types': unresolved_downtransformers_marshal.structure.Types
                    readonly 'Namespaces': unresolved_downtransformers_marshal.structure.Namespaces
                    readonly 'Type': unresolved_downtransformers_marshal.structure.Type
                    readonly 'Group': unresolved_downtransformers_marshal.structure.Group
                    readonly 'Value': unresolved_downtransformers_marshal.structure.Value
                    readonly 'Dictionary': unresolved_downtransformers_marshal.structure.Dictionary
                    readonly 'Value Reference': unresolved_downtransformers_marshal.structure.Value_Reference
                    readonly 'Option Constraints': unresolved_downtransformers_marshal.structure.Option_Constraints
                    readonly 'Reference': unresolved_downtransformers_marshal.structure.Reference
                    readonly 'Reference Constraints': unresolved_downtransformers_marshal.structure.Reference_Constraints
                    readonly 'Regular Expression': unresolved_downtransformers_marshal.structure.Regular_Expression
                    readonly 'Structure': unresolved_downtransformers_marshal.structure.Structure
                    readonly 'Value Result': unresolved_downtransformers_marshal.structure.Value_Result
                }
                readonly 'declarations': {
                    readonly 'Presence': unresolved_downtransformers_marshal.declarations.Presence
                    readonly 'Signature Value Reference': unresolved_downtransformers_marshal.declarations.Signature_Value_Reference
                    readonly 'Signature': unresolved_downtransformers_marshal.declarations.Signature
                    readonly 'Declarations': unresolved_downtransformers_marshal.declarations.Declarations
                    readonly 'Declaration': unresolved_downtransformers_marshal.declarations.Declaration
                    readonly 'Namespaces': unresolved_downtransformers_marshal.declarations.Namespaces
                    readonly 'Declaration Namespace': unresolved_downtransformers_marshal.declarations.Declaration_Namespace
                }
                readonly 'resolver': {
                    readonly 'Value Reference': unresolved_downtransformers_marshal.resolver.Value_Reference
                    readonly 'Relative Value Selection': unresolved_downtransformers_marshal.resolver.Relative_Value_Selection
                    readonly 'Possible Value Selection': unresolved_downtransformers_marshal.resolver.Possible_Value_Selection
                    readonly 'Option Constraints': unresolved_downtransformers_marshal.resolver.Option_Constraints
                    readonly 'Guaranteed Value Selection': unresolved_downtransformers_marshal.resolver.Guaranteed_Value_Selection
                    readonly 'Lookup Selection': unresolved_downtransformers_marshal.resolver.Lookup_Selection
                    readonly 'Reference Constraints': unresolved_downtransformers_marshal.resolver.Reference_Constraints
                    readonly 'Resolver': unresolved_downtransformers_marshal.resolver.Resolver
                    readonly 'Result Selection': unresolved_downtransformers_marshal.resolver.Result_Selection
                    readonly 'Checks': unresolved_downtransformers_marshal.resolver.Checks
                    readonly 'Value': unresolved_downtransformers_marshal.resolver.Value
                }
            }
        }
    }
    readonly 'resolved': {
        readonly 'uptransformers': {
            readonly 'resolve': {
                readonly 'Directory': resolved_uptransformers_resolve.Directory
                readonly 'Node': resolved_uptransformers_resolve.Node
                readonly 'Type Specification': resolved_uptransformers_resolve.Type_Specification
                readonly 'structure': {
                    readonly 'Basic Types': resolved_uptransformers_resolve.structure.Basic_Types
                    readonly 'Types': resolved_uptransformers_resolve.structure.Types
                    readonly 'Namespaces': resolved_uptransformers_resolve.structure.Namespaces
                    readonly 'Type': resolved_uptransformers_resolve.structure.Type
                    readonly 'Group': resolved_uptransformers_resolve.structure.Group
                    readonly 'Value': resolved_uptransformers_resolve.structure.Value
                    readonly 'Dictionary': resolved_uptransformers_resolve.structure.Dictionary
                    readonly 'Value Reference': resolved_uptransformers_resolve.structure.Value_Reference
                    readonly 'Option Constraints': resolved_uptransformers_resolve.structure.Option_Constraints
                    readonly 'Reference': resolved_uptransformers_resolve.structure.Reference
                    readonly 'Reference Constraints': resolved_uptransformers_resolve.structure.Reference_Constraints
                    readonly 'Regular Expression': resolved_uptransformers_resolve.structure.Regular_Expression
                    readonly 'Structure': resolved_uptransformers_resolve.structure.Structure
                    readonly 'Value Result': resolved_uptransformers_resolve.structure.Value_Result
                }
                readonly 'declarations': {
                    readonly 'Presence': resolved_uptransformers_resolve.declarations.Presence
                    readonly 'Signature Value Reference': resolved_uptransformers_resolve.declarations.Signature_Value_Reference
                    readonly 'Signature': resolved_uptransformers_resolve.declarations.Signature
                    readonly 'Declarations': resolved_uptransformers_resolve.declarations.Declarations
                    readonly 'Declaration': resolved_uptransformers_resolve.declarations.Declaration
                    readonly 'Namespaces': resolved_uptransformers_resolve.declarations.Namespaces
                    readonly 'Declaration Namespace': resolved_uptransformers_resolve.declarations.Declaration_Namespace
                }
                readonly 'resolver': {
                    readonly 'Value Reference': resolved_uptransformers_resolve.resolver.Value_Reference
                    readonly 'Relative Value Selection': resolved_uptransformers_resolve.resolver.Relative_Value_Selection
                    readonly 'Possible Value Selection': resolved_uptransformers_resolve.resolver.Possible_Value_Selection
                    readonly 'Option Constraints': resolved_uptransformers_resolve.resolver.Option_Constraints
                    readonly 'Guaranteed Value Selection': resolved_uptransformers_resolve.resolver.Guaranteed_Value_Selection
                    readonly 'Lookup Selection': resolved_uptransformers_resolve.resolver.Lookup_Selection
                    readonly 'Reference Constraints': resolved_uptransformers_resolve.resolver.Reference_Constraints
                    readonly 'Resolver': resolved_uptransformers_resolve.resolver.Resolver
                    readonly 'Result Selection': resolved_uptransformers_resolve.resolver.Result_Selection
                    readonly 'Checks': resolved_uptransformers_resolve.resolver.Checks
                    readonly 'Value': resolved_uptransformers_resolve.resolver.Value
                }
            }
        }
        readonly 'downtransformers': {
            readonly 'unresolve': {
                readonly 'Directory': resolved_downtransformers_unresolve.Directory
                readonly 'Node': resolved_downtransformers_unresolve.Node
                readonly 'Type Specification': resolved_downtransformers_unresolve.Type_Specification
                readonly 'structure': {
                    readonly 'Basic Types': resolved_downtransformers_unresolve.structure.Basic_Types
                    readonly 'Types': resolved_downtransformers_unresolve.structure.Types
                    readonly 'Namespaces': resolved_downtransformers_unresolve.structure.Namespaces
                    readonly 'Type': resolved_downtransformers_unresolve.structure.Type
                    readonly 'Group': resolved_downtransformers_unresolve.structure.Group
                    readonly 'Value': resolved_downtransformers_unresolve.structure.Value
                    readonly 'Dictionary': resolved_downtransformers_unresolve.structure.Dictionary
                    readonly 'Value Reference': resolved_downtransformers_unresolve.structure.Value_Reference
                    readonly 'Option Constraints': resolved_downtransformers_unresolve.structure.Option_Constraints
                    readonly 'Reference': resolved_downtransformers_unresolve.structure.Reference
                    readonly 'Reference Constraints': resolved_downtransformers_unresolve.structure.Reference_Constraints
                    readonly 'Regular Expression': resolved_downtransformers_unresolve.structure.Regular_Expression
                    readonly 'Structure': resolved_downtransformers_unresolve.structure.Structure
                    readonly 'Value Result': resolved_downtransformers_unresolve.structure.Value_Result
                }
                readonly 'declarations': {
                    readonly 'Presence': resolved_downtransformers_unresolve.declarations.Presence
                    readonly 'Signature Value Reference': resolved_downtransformers_unresolve.declarations.Signature_Value_Reference
                    readonly 'Signature': resolved_downtransformers_unresolve.declarations.Signature
                    readonly 'Declarations': resolved_downtransformers_unresolve.declarations.Declarations
                    readonly 'Declaration': resolved_downtransformers_unresolve.declarations.Declaration
                    readonly 'Namespaces': resolved_downtransformers_unresolve.declarations.Namespaces
                    readonly 'Declaration Namespace': resolved_downtransformers_unresolve.declarations.Declaration_Namespace
                }
                readonly 'resolver': {
                    readonly 'Value Reference': resolved_downtransformers_unresolve.resolver.Value_Reference
                    readonly 'Relative Value Selection': resolved_downtransformers_unresolve.resolver.Relative_Value_Selection
                    readonly 'Possible Value Selection': resolved_downtransformers_unresolve.resolver.Possible_Value_Selection
                    readonly 'Option Constraints': resolved_downtransformers_unresolve.resolver.Option_Constraints
                    readonly 'Guaranteed Value Selection': resolved_downtransformers_unresolve.resolver.Guaranteed_Value_Selection
                    readonly 'Lookup Selection': resolved_downtransformers_unresolve.resolver.Lookup_Selection
                    readonly 'Reference Constraints': resolved_downtransformers_unresolve.resolver.Reference_Constraints
                    readonly 'Resolver': resolved_downtransformers_unresolve.resolver.Resolver
                    readonly 'Result Selection': resolved_downtransformers_unresolve.resolver.Result_Selection
                    readonly 'Checks': resolved_downtransformers_unresolve.resolver.Checks
                    readonly 'Value': resolved_downtransformers_unresolve.resolver.Value
                }
            }
        }
    }
}
