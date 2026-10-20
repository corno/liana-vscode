import * as __operations from "./serialized_paragraph.js"
import * as p_ from 'pareto-core/transformer'
import p_unreachable_code_path from 'pareto-core/transformer/specials/unreachable_code_path'

// schemas
import * as s_source from "../schema.js"
import * as s_target from "pareto-fountain-pen/modules/paragraph/schemas/serialized/schema"
import * as s_parameters from "pareto-fountain-pen/modules/paragraph/schemas/paragraph_serialization/schema"

// transformer dependencies
import * as t_to_sealed_target from "./astn_sealed_target.js"
import * as t_sealed_target_to_serialized_paragraph from "astn-runtime/modules/serialization/schemas/sealed_target/transformers/serialized_paragraph"

export namespace declarations {
    
    export type Directory = p_.Transformer_With_Parameter<
        s_source.types.Directory,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Node = p_.Transformer_With_Parameter<
        s_source.types.Node,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Schema = p_.Transformer_With_Parameter<
        s_source.types.Schema,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Type_Specification = p_.Transformer_With_Parameter<
        s_source.types.Type_Specification,
        s_target.Lines,
        s_parameters.Parameters
    >
}

// implementations

export const Directory: declarations.Directory = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Directory(
        $,
    ),
    $p,
)

export const Node: declarations.Node = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Node(
        $,
    ),
    $p,
)

export const Schema: declarations.Schema = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Schema(
        $,
    ),
    $p,
)

export const Type_Specification: declarations.Type_Specification = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Type_Specification(
        $,
    ),
    $p,
)
export namespace namespaces {
    export namespace structure {
        
        export namespace declarations {
            
            export type Regular_Expression = p_.Transformer_With_Parameter<
                s_source.namespaces.structure.types.Regular_Expression,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Basic_Type = p_.Transformer_With_Parameter<
                s_source.namespaces.structure.types.Basic_Type,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Basic_Types = p_.Transformer_With_Parameter<
                s_source.namespaces.structure.types.Basic_Types,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Dictionary = p_.Transformer_With_Parameter<
                s_source.namespaces.structure.types.Dictionary,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Group = p_.Transformer_With_Parameter<
                s_source.namespaces.structure.types.Group,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Namespaces = p_.Transformer_With_Parameter<
                s_source.namespaces.structure.types.Namespaces,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Types = p_.Transformer_With_Parameter<
                s_source.namespaces.structure.types.Types,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Type = p_.Transformer_With_Parameter<
                s_source.namespaces.structure.types.Type,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Type_Reference = p_.Transformer_With_Parameter<
                s_source.namespaces.structure.types.Type_Reference,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Value = p_.Transformer_With_Parameter<
                s_source.namespaces.structure.types.Value,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Value_Path = p_.Transformer_With_Parameter<
                s_source.namespaces.structure.types.Value_Path,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Value_Reference = p_.Transformer_With_Parameter<
                s_source.namespaces.structure.types.Value_Reference,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Option_Constraints = p_.Transformer_With_Parameter<
                s_source.namespaces.structure.types.Option_Constraints,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Reference = p_.Transformer_With_Parameter<
                s_source.namespaces.structure.types.Reference,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Reference_Constraints = p_.Transformer_With_Parameter<
                s_source.namespaces.structure.types.Reference_Constraints,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Structure = p_.Transformer_With_Parameter<
                s_source.namespaces.structure.types.Structure,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Value_Result = p_.Transformer_With_Parameter<
                s_source.namespaces.structure.types.Value_Result,
                s_target.Lines,
                s_parameters.Parameters
            >
        }
        
        // implementations
        
        export const Regular_Expression: declarations.Regular_Expression = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.structure.Regular_Expression(
                $,
            ),
            $p,
        )
        
        export const Basic_Type: declarations.Basic_Type = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.structure.Basic_Type(
                $,
            ),
            $p,
        )
        
        export const Basic_Types: declarations.Basic_Types = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.structure.Basic_Types(
                $,
            ),
            $p,
        )
        
        export const Dictionary: declarations.Dictionary = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.structure.Dictionary(
                $,
            ),
            $p,
        )
        
        export const Group: declarations.Group = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.structure.Group(
                $,
            ),
            $p,
        )
        
        export const Namespaces: declarations.Namespaces = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.structure.Namespaces(
                $,
            ),
            $p,
        )
        
        export const Types: declarations.Types = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.structure.Types(
                $,
            ),
            $p,
        )
        
        export const Type: declarations.Type = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.structure.Type(
                $,
            ),
            $p,
        )
        
        export const Type_Reference: declarations.Type_Reference = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.structure.Type_Reference(
                $,
            ),
            $p,
        )
        
        export const Value: declarations.Value = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.structure.Value(
                $,
            ),
            $p,
        )
        
        export const Value_Path: declarations.Value_Path = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.structure.Value_Path(
                $,
            ),
            $p,
        )
        
        export const Value_Reference: declarations.Value_Reference = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.structure.Value_Reference(
                $,
            ),
            $p,
        )
        
        export const Option_Constraints: declarations.Option_Constraints = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.structure.Option_Constraints(
                $,
            ),
            $p,
        )
        
        export const Reference: declarations.Reference = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.structure.Reference(
                $,
            ),
            $p,
        )
        
        export const Reference_Constraints: declarations.Reference_Constraints = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.structure.Reference_Constraints(
                $,
            ),
            $p,
        )
        
        export const Structure: declarations.Structure = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.structure.Structure(
                $,
            ),
            $p,
        )
        
        export const Value_Result: declarations.Value_Result = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.structure.Value_Result(
                $,
            ),
            $p,
        )
        export namespace namespaces {}
    }
    export namespace signatures {
        
        export namespace declarations {
            
            export type Presence = p_.Transformer_With_Parameter<
                s_source.namespaces.signatures.types.Presence,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Signature_Type_Reference = p_.Transformer_With_Parameter<
                s_source.namespaces.signatures.types.Signature_Type_Reference,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Signature_Parameters = p_.Transformer_With_Parameter<
                s_source.namespaces.signatures.types.Signature_Parameters,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Signatures = p_.Transformer_With_Parameter<
                s_source.namespaces.signatures.types.Signatures,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Signature = p_.Transformer_With_Parameter<
                s_source.namespaces.signatures.types.Signature,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Namespaces = p_.Transformer_With_Parameter<
                s_source.namespaces.signatures.types.Namespaces,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Signature_Namespace = p_.Transformer_With_Parameter<
                s_source.namespaces.signatures.types.Signature_Namespace,
                s_target.Lines,
                s_parameters.Parameters
            >
        }
        
        // implementations
        
        export const Presence: declarations.Presence = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.signatures.Presence(
                $,
            ),
            $p,
        )
        
        export const Signature_Type_Reference: declarations.Signature_Type_Reference = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.signatures.Signature_Type_Reference(
                $,
            ),
            $p,
        )
        
        export const Signature_Parameters: declarations.Signature_Parameters = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.signatures.Signature_Parameters(
                $,
            ),
            $p,
        )
        
        export const Signatures: declarations.Signatures = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.signatures.Signatures(
                $,
            ),
            $p,
        )
        
        export const Signature: declarations.Signature = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.signatures.Signature(
                $,
            ),
            $p,
        )
        
        export const Namespaces: declarations.Namespaces = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.signatures.Namespaces(
                $,
            ),
            $p,
        )
        
        export const Signature_Namespace: declarations.Signature_Namespace = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.signatures.Signature_Namespace(
                $,
            ),
            $p,
        )
        export namespace namespaces {}
    }
    export namespace resolver {
        
        export namespace declarations {
            
            export type Absence_Constraints = p_.Transformer_With_Parameter<
                s_source.namespaces.resolver.types.Absence_Constraints,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Type_Reference = p_.Transformer_With_Parameter<
                s_source.namespaces.resolver.types.Type_Reference,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Value_Path = p_.Transformer_With_Parameter<
                s_source.namespaces.resolver.types.Value_Path,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Value_Reference = p_.Transformer_With_Parameter<
                s_source.namespaces.resolver.types.Value_Reference,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Relative_Value_Selection = p_.Transformer_With_Parameter<
                s_source.namespaces.resolver.types.Relative_Value_Selection,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Guaranteed_Value_Selection = p_.Transformer_With_Parameter<
                s_source.namespaces.resolver.types.Guaranteed_Value_Selection,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Benchmark = p_.Transformer_With_Parameter<
                s_source.namespaces.resolver.types.Benchmark,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Constraint = p_.Transformer_With_Parameter<
                s_source.namespaces.resolver.types.Constraint,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Lookup_Selection = p_.Transformer_With_Parameter<
                s_source.namespaces.resolver.types.Lookup_Selection,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Namespaces = p_.Transformer_With_Parameter<
                s_source.namespaces.resolver.types.Namespaces,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Possible_Value_Selection = p_.Transformer_With_Parameter<
                s_source.namespaces.resolver.types.Possible_Value_Selection,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Option_Constraints = p_.Transformer_With_Parameter<
                s_source.namespaces.resolver.types.Option_Constraints,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Optional_Value_Initialization = p_.Transformer_With_Parameter<
                s_source.namespaces.resolver.types.Optional_Value_Initialization,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Reference_Constraints = p_.Transformer_With_Parameter<
                s_source.namespaces.resolver.types.Reference_Constraints,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Reference_To_Value_Constraint = p_.Transformer_With_Parameter<
                s_source.namespaces.resolver.types.Reference_To_Value_Constraint,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Resolver = p_.Transformer_With_Parameter<
                s_source.namespaces.resolver.types.Resolver,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Result_Selection = p_.Transformer_With_Parameter<
                s_source.namespaces.resolver.types.Result_Selection,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Value_Group = p_.Transformer_With_Parameter<
                s_source.namespaces.resolver.types.Value_Group,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Value_List_Result = p_.Transformer_With_Parameter<
                s_source.namespaces.resolver.types.Value_List_Result,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Value = p_.Transformer_With_Parameter<
                s_source.namespaces.resolver.types.Value,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Types = p_.Transformer_With_Parameter<
                s_source.namespaces.resolver.types.Types,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Value_Constraint = p_.Transformer_With_Parameter<
                s_source.namespaces.resolver.types.Value_Constraint,
                s_target.Lines,
                s_parameters.Parameters
            >
            
            export type Value_Constraints = p_.Transformer_With_Parameter<
                s_source.namespaces.resolver.types.Value_Constraints,
                s_target.Lines,
                s_parameters.Parameters
            >
        }
        
        // implementations
        
        export const Absence_Constraints: declarations.Absence_Constraints = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.resolver.Absence_Constraints(
                $,
            ),
            $p,
        )
        
        export const Type_Reference: declarations.Type_Reference = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.resolver.Type_Reference(
                $,
            ),
            $p,
        )
        
        export const Value_Path: declarations.Value_Path = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.resolver.Value_Path(
                $,
            ),
            $p,
        )
        
        export const Value_Reference: declarations.Value_Reference = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.resolver.Value_Reference(
                $,
            ),
            $p,
        )
        
        export const Relative_Value_Selection: declarations.Relative_Value_Selection = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.resolver.Relative_Value_Selection(
                $,
            ),
            $p,
        )
        
        export const Guaranteed_Value_Selection: declarations.Guaranteed_Value_Selection = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.resolver.Guaranteed_Value_Selection(
                $,
            ),
            $p,
        )
        
        export const Benchmark: declarations.Benchmark = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.resolver.Benchmark(
                $,
            ),
            $p,
        )
        
        export const Constraint: declarations.Constraint = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.resolver.Constraint(
                $,
            ),
            $p,
        )
        
        export const Lookup_Selection: declarations.Lookup_Selection = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.resolver.Lookup_Selection(
                $,
            ),
            $p,
        )
        
        export const Namespaces: declarations.Namespaces = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.resolver.Namespaces(
                $,
            ),
            $p,
        )
        
        export const Possible_Value_Selection: declarations.Possible_Value_Selection = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.resolver.Possible_Value_Selection(
                $,
            ),
            $p,
        )
        
        export const Option_Constraints: declarations.Option_Constraints = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.resolver.Option_Constraints(
                $,
            ),
            $p,
        )
        
        export const Optional_Value_Initialization: declarations.Optional_Value_Initialization = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.resolver.Optional_Value_Initialization(
                $,
            ),
            $p,
        )
        
        export const Reference_Constraints: declarations.Reference_Constraints = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.resolver.Reference_Constraints(
                $,
            ),
            $p,
        )
        
        export const Reference_To_Value_Constraint: declarations.Reference_To_Value_Constraint = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.resolver.Reference_To_Value_Constraint(
                $,
            ),
            $p,
        )
        
        export const Resolver: declarations.Resolver = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.resolver.Resolver(
                $,
            ),
            $p,
        )
        
        export const Result_Selection: declarations.Result_Selection = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.resolver.Result_Selection(
                $,
            ),
            $p,
        )
        
        export const Value_Group: declarations.Value_Group = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.resolver.Value_Group(
                $,
            ),
            $p,
        )
        
        export const Value_List_Result: declarations.Value_List_Result = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.resolver.Value_List_Result(
                $,
            ),
            $p,
        )
        
        export const Value: declarations.Value = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.resolver.Value(
                $,
            ),
            $p,
        )
        
        export const Types: declarations.Types = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.resolver.Types(
                $,
            ),
            $p,
        )
        
        export const Value_Constraint: declarations.Value_Constraint = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.resolver.Value_Constraint(
                $,
            ),
            $p,
        )
        
        export const Value_Constraints: declarations.Value_Constraints = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
            t_to_sealed_target.namespaces.resolver.Value_Constraints(
                $,
            ),
            $p,
        )
        export namespace namespaces {}
    }
}
