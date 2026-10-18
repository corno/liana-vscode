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
    
    export type Basic_Type = p_.Transformer_With_Parameter<
        s_source.Basic_Type,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Basic_Types = p_.Transformer_With_Parameter<
        s_source.Basic_Types,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Dictionary = p_.Transformer_With_Parameter<
        s_source.Dictionary,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Group = p_.Transformer_With_Parameter<
        s_source.Group,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Types = p_.Transformer_With_Parameter<
        s_source.Types,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Value = p_.Transformer_With_Parameter<
        s_source.Value,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Type = p_.Transformer_With_Parameter<
        s_source.Type,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Type_Reference = p_.Transformer_With_Parameter<
        s_source.Type_Reference,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Value_Path = p_.Transformer_With_Parameter<
        s_source.Value_Path,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Value_Reference = p_.Transformer_With_Parameter<
        s_source.Value_Reference,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Option_Constraints = p_.Transformer_With_Parameter<
        s_source.Option_Constraints,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Presence = p_.Transformer_With_Parameter<
        s_source.Presence,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Resolver_Value_Group = p_.Transformer_With_Parameter<
        s_source.Resolver_Value_Group,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Resolver_Signature_Parameters = p_.Transformer_With_Parameter<
        s_source.Resolver_Signature_Parameters,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Resolver_Signatures = p_.Transformer_With_Parameter<
        s_source.Resolver_Signatures,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Resolver_Value_Constraints = p_.Transformer_With_Parameter<
        s_source.Resolver_Value_Constraints,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Resolver_Relative_Value_Selection = p_.Transformer_With_Parameter<
        s_source.Resolver_Relative_Value_Selection,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Resolver_Result_Selection = p_.Transformer_With_Parameter<
        s_source.Resolver_Result_Selection,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Resolver_Value_List_Result = p_.Transformer_With_Parameter<
        s_source.Resolver_Value_List_Result,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Resolver_Value = p_.Transformer_With_Parameter<
        s_source.Resolver_Value,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Resolver_Possible_Value_Selection = p_.Transformer_With_Parameter<
        s_source.Resolver_Possible_Value_Selection,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Resolver_Option_Constraints = p_.Transformer_With_Parameter<
        s_source.Resolver_Option_Constraints,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Resolver_Guaranteed_Value_Selection = p_.Transformer_With_Parameter<
        s_source.Resolver_Guaranteed_Value_Selection,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Resolver_Benchmark = p_.Transformer_With_Parameter<
        s_source.Resolver_Benchmark,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Resolver_Constraint = p_.Transformer_With_Parameter<
        s_source.Resolver_Constraint,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Resolver_Lookup_Selection = p_.Transformer_With_Parameter<
        s_source.Resolver_Lookup_Selection,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Resolver_Optional_Value_Constraints = p_.Transformer_With_Parameter<
        s_source.Resolver_Optional_Value_Constraints,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Resolver_Optional_Value_Initialization = p_.Transformer_With_Parameter<
        s_source.Resolver_Optional_Value_Initialization,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Resolver_Reference_To_Value_Constraint = p_.Transformer_With_Parameter<
        s_source.Resolver_Reference_To_Value_Constraint,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Resolver_Signature = p_.Transformer_With_Parameter<
        s_source.Resolver_Signature,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Resolver_Types = p_.Transformer_With_Parameter<
        s_source.Resolver_Types,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Resolver_Value_Constraint = p_.Transformer_With_Parameter<
        s_source.Resolver_Value_Constraint,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Schema = p_.Transformer_With_Parameter<
        s_source.Schema,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Type_Specification = p_.Transformer_With_Parameter<
        s_source.Type_Specification,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Value_Results = p_.Transformer_With_Parameter<
        s_source.Value_Results,
        s_target.Lines,
        s_parameters.Parameters
    >
}

// implementations

export const Basic_Type: declarations.Basic_Type = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Basic_Type(
        $,
    ),
    $p,
)

export const Basic_Types: declarations.Basic_Types = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Basic_Types(
        $,
    ),
    $p,
)

export const Dictionary: declarations.Dictionary = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Dictionary(
        $,
    ),
    $p,
)

export const Group: declarations.Group = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Group(
        $,
    ),
    $p,
)

export const Types: declarations.Types = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Types(
        $,
    ),
    $p,
)

export const Value: declarations.Value = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Value(
        $,
    ),
    $p,
)

export const Type: declarations.Type = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Type(
        $,
    ),
    $p,
)

export const Type_Reference: declarations.Type_Reference = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Type_Reference(
        $,
    ),
    $p,
)

export const Value_Path: declarations.Value_Path = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Value_Path(
        $,
    ),
    $p,
)

export const Value_Reference: declarations.Value_Reference = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Value_Reference(
        $,
    ),
    $p,
)

export const Option_Constraints: declarations.Option_Constraints = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Option_Constraints(
        $,
    ),
    $p,
)

export const Presence: declarations.Presence = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Presence(
        $,
    ),
    $p,
)

export const Resolver_Value_Group: declarations.Resolver_Value_Group = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Resolver_Value_Group(
        $,
    ),
    $p,
)

export const Resolver_Signature_Parameters: declarations.Resolver_Signature_Parameters = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Resolver_Signature_Parameters(
        $,
    ),
    $p,
)

export const Resolver_Signatures: declarations.Resolver_Signatures = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Resolver_Signatures(
        $,
    ),
    $p,
)

export const Resolver_Value_Constraints: declarations.Resolver_Value_Constraints = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Resolver_Value_Constraints(
        $,
    ),
    $p,
)

export const Resolver_Relative_Value_Selection: declarations.Resolver_Relative_Value_Selection = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Resolver_Relative_Value_Selection(
        $,
    ),
    $p,
)

export const Resolver_Result_Selection: declarations.Resolver_Result_Selection = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Resolver_Result_Selection(
        $,
    ),
    $p,
)

export const Resolver_Value_List_Result: declarations.Resolver_Value_List_Result = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Resolver_Value_List_Result(
        $,
    ),
    $p,
)

export const Resolver_Value: declarations.Resolver_Value = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Resolver_Value(
        $,
    ),
    $p,
)

export const Resolver_Possible_Value_Selection: declarations.Resolver_Possible_Value_Selection = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Resolver_Possible_Value_Selection(
        $,
    ),
    $p,
)

export const Resolver_Option_Constraints: declarations.Resolver_Option_Constraints = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Resolver_Option_Constraints(
        $,
    ),
    $p,
)

export const Resolver_Guaranteed_Value_Selection: declarations.Resolver_Guaranteed_Value_Selection = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Resolver_Guaranteed_Value_Selection(
        $,
    ),
    $p,
)

export const Resolver_Benchmark: declarations.Resolver_Benchmark = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Resolver_Benchmark(
        $,
    ),
    $p,
)

export const Resolver_Constraint: declarations.Resolver_Constraint = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Resolver_Constraint(
        $,
    ),
    $p,
)

export const Resolver_Lookup_Selection: declarations.Resolver_Lookup_Selection = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Resolver_Lookup_Selection(
        $,
    ),
    $p,
)

export const Resolver_Optional_Value_Constraints: declarations.Resolver_Optional_Value_Constraints = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Resolver_Optional_Value_Constraints(
        $,
    ),
    $p,
)

export const Resolver_Optional_Value_Initialization: declarations.Resolver_Optional_Value_Initialization = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Resolver_Optional_Value_Initialization(
        $,
    ),
    $p,
)

export const Resolver_Reference_To_Value_Constraint: declarations.Resolver_Reference_To_Value_Constraint = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Resolver_Reference_To_Value_Constraint(
        $,
    ),
    $p,
)

export const Resolver_Signature: declarations.Resolver_Signature = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Resolver_Signature(
        $,
    ),
    $p,
)

export const Resolver_Types: declarations.Resolver_Types = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Resolver_Types(
        $,
    ),
    $p,
)

export const Resolver_Value_Constraint: declarations.Resolver_Value_Constraint = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Resolver_Value_Constraint(
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

export const Value_Results: declarations.Value_Results = ($, $p) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Value_Results(
        $,
    ),
    $p,
)
