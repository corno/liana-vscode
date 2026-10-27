
import type * as d from "../declarations/index.js"
import * as resolved_uptransformers_unresolved from "./schemas/resolved/uptransformers/unresolved.js"

export const api: d.API = {
    'resolved': {
        'uptransformers': {
            'unresolved': {
                'Directory': resolved_uptransformers_unresolved.Directory,
                'Node': resolved_uptransformers_unresolved.Node,
                'Type Specification': resolved_uptransformers_unresolved.Type_Specification,
                'structure': {
                    'Regular Expression': resolved_uptransformers_unresolved.structure.Regular_Expression,
                    'Basic Types': resolved_uptransformers_unresolved.structure.Basic_Types,
                    'Types': resolved_uptransformers_unresolved.structure.Types,
                    'Namespaces': resolved_uptransformers_unresolved.structure.Namespaces,
                    'Type': resolved_uptransformers_unresolved.structure.Type,
                    'Group': resolved_uptransformers_unresolved.structure.Group,
                    'Value': resolved_uptransformers_unresolved.structure.Value,
                    'Dictionary': resolved_uptransformers_unresolved.structure.Dictionary,
                    'Value Reference': resolved_uptransformers_unresolved.structure.Value_Reference,
                    'Option Constraints': resolved_uptransformers_unresolved.structure.Option_Constraints,
                    'Reference': resolved_uptransformers_unresolved.structure.Reference,
                    'Reference Constraints': resolved_uptransformers_unresolved.structure.Reference_Constraints,
                    'Structure': resolved_uptransformers_unresolved.structure.Structure,
                    'Value Result': resolved_uptransformers_unresolved.structure.Value_Result,
                },
                'declarations': {
                    'Presence': resolved_uptransformers_unresolved.declarations.Presence,
                    'Signature Value Reference': resolved_uptransformers_unresolved.declarations.Signature_Value_Reference,
                    'Signature': resolved_uptransformers_unresolved.declarations.Signature,
                    'Declarations': resolved_uptransformers_unresolved.declarations.Declarations,
                    'Declaration': resolved_uptransformers_unresolved.declarations.Declaration,
                    'Namespaces': resolved_uptransformers_unresolved.declarations.Namespaces,
                    'Declaration Namespace': resolved_uptransformers_unresolved.declarations.Declaration_Namespace,
                },
                'resolver': {
                    'Value Reference': resolved_uptransformers_unresolved.resolver.Value_Reference,
                    'Simple Component Selection': resolved_uptransformers_unresolved.resolver.Simple_Component_Selection,
                    'Relative Value Selection': resolved_uptransformers_unresolved.resolver.Relative_Value_Selection,
                    'Possible Value Selection': resolved_uptransformers_unresolved.resolver.Possible_Value_Selection,
                    'Option Constraints': resolved_uptransformers_unresolved.resolver.Option_Constraints,
                    'Guaranteed Value Selection': resolved_uptransformers_unresolved.resolver.Guaranteed_Value_Selection,
                    'Lookup Selection': resolved_uptransformers_unresolved.resolver.Lookup_Selection,
                    'Reference Constraints': resolved_uptransformers_unresolved.resolver.Reference_Constraints,
                    'Result Selection': resolved_uptransformers_unresolved.resolver.Result_Selection,
                    'Value': resolved_uptransformers_unresolved.resolver.Value,
                    'Resolver': resolved_uptransformers_unresolved.resolver.Resolver,
                },
            },
        },
        'downtransformers': null,
    },
}
