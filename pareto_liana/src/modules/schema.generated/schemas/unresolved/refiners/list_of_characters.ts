import * as p_ from 'pareto-core/refiner'

// schemas
import * as s_target from "../schema.js"
import * as s_source from "astn-runtime/modules/deserialization/schemas/list_of_characters/schema"
import * as s_error from "liana-runtime/modules/unresolved_document_deserialization/schemas/unresolved_document_deserialization/schema"
import * as s_parameters from "liana-runtime/modules/unresolved_document_deserialization/schemas/unresolved_document_deserialization/schema"

// refiner dependencies
import * as r_from_parse_tree from "./astn_parse_tree.js"
import * as r_parse_tree_from_list_of_characters from "astn-runtime/modules/deserialization/schemas/parse_tree/refiners/list_of_characters"

export namespace declarations {
    
    export type Basic_Type = p_.Refiner_With_Parameter<
        s_target.Basic_Type,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Basic_Types = p_.Refiner_With_Parameter<
        s_target.Basic_Types,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Dictionary = p_.Refiner_With_Parameter<
        s_target.Dictionary,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Group = p_.Refiner_With_Parameter<
        s_target.Group,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Types = p_.Refiner_With_Parameter<
        s_target.Types,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Value = p_.Refiner_With_Parameter<
        s_target.Value,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Type = p_.Refiner_With_Parameter<
        s_target.Type,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Type_Reference = p_.Refiner_With_Parameter<
        s_target.Type_Reference,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Value_Path = p_.Refiner_With_Parameter<
        s_target.Value_Path,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Value_Reference = p_.Refiner_With_Parameter<
        s_target.Value_Reference,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Option_Constraints = p_.Refiner_With_Parameter<
        s_target.Option_Constraints,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Presence = p_.Refiner_With_Parameter<
        s_target.Presence,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Resolver_Value_Group = p_.Refiner_With_Parameter<
        s_target.Resolver_Value_Group,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Resolver_Signature_Parameters = p_.Refiner_With_Parameter<
        s_target.Resolver_Signature_Parameters,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Resolver_Signatures = p_.Refiner_With_Parameter<
        s_target.Resolver_Signatures,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Resolver_Value_Constraints = p_.Refiner_With_Parameter<
        s_target.Resolver_Value_Constraints,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Resolver_Relative_Value_Selection = p_.Refiner_With_Parameter<
        s_target.Resolver_Relative_Value_Selection,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >

    export type Resolver_Result_Selection = p_.Refiner_With_Parameter<
        s_target.Resolver_Result_Selection,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >

    export type Resolver_Value_List_Result = p_.Refiner_With_Parameter<
        s_target.Resolver_Value_List_Result,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Resolver_Value = p_.Refiner_With_Parameter<
        s_target.Resolver_Value,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Resolver_Possible_Value_Selection = p_.Refiner_With_Parameter<
        s_target.Resolver_Possible_Value_Selection,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Resolver_Option_Constraints = p_.Refiner_With_Parameter<
        s_target.Resolver_Option_Constraints,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Resolver_Guaranteed_Value_Selection = p_.Refiner_With_Parameter<
        s_target.Resolver_Guaranteed_Value_Selection,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Resolver_Benchmark = p_.Refiner_With_Parameter<
        s_target.Resolver_Benchmark,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Resolver_Constraint = p_.Refiner_With_Parameter<
        s_target.Resolver_Constraint,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Resolver_Lookup_Selection = p_.Refiner_With_Parameter<
        s_target.Resolver_Lookup_Selection,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Resolver_Optional_Value_Constraints = p_.Refiner_With_Parameter<
        s_target.Resolver_Optional_Value_Constraints,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Resolver_Optional_Value_Initialization = p_.Refiner_With_Parameter<
        s_target.Resolver_Optional_Value_Initialization,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Resolver_Reference_To_Value_Constraint = p_.Refiner_With_Parameter<
        s_target.Resolver_Reference_To_Value_Constraint,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Resolver_Signature = p_.Refiner_With_Parameter<
        s_target.Resolver_Signature,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Resolver_Types = p_.Refiner_With_Parameter<
        s_target.Resolver_Types,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Resolver_Value_Constraint = p_.Refiner_With_Parameter<
        s_target.Resolver_Value_Constraint,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Schema = p_.Refiner_With_Parameter<
        s_target.Schema,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Type_Specification = p_.Refiner_With_Parameter<
        s_target.Type_Specification,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Value_Results = p_.Refiner_With_Parameter<
        s_target.Value_Results,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
}

// implementations

export const Basic_Type: declarations.Basic_Type = ($, abort, $p) => r_from_parse_tree.Basic_Type(
    r_parse_tree_from_list_of_characters.Document(
        $,
        ($) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    ($) => abort(['unmarshalling', $]),
)

export const Basic_Types: declarations.Basic_Types = ($, abort, $p) => r_from_parse_tree.Basic_Types(
    r_parse_tree_from_list_of_characters.Document(
        $,
        ($) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    ($) => abort(['unmarshalling', $]),
)

export const Dictionary: declarations.Dictionary = ($, abort, $p) => r_from_parse_tree.Dictionary(
    r_parse_tree_from_list_of_characters.Document(
        $,
        ($) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    ($) => abort(['unmarshalling', $]),
)

export const Group: declarations.Group = ($, abort, $p) => r_from_parse_tree.Group(
    r_parse_tree_from_list_of_characters.Document(
        $,
        ($) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    ($) => abort(['unmarshalling', $]),
)

export const Types: declarations.Types = ($, abort, $p) => r_from_parse_tree.Types(
    r_parse_tree_from_list_of_characters.Document(
        $,
        ($) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    ($) => abort(['unmarshalling', $]),
)

export const Value: declarations.Value = ($, abort, $p) => r_from_parse_tree.Value(
    r_parse_tree_from_list_of_characters.Document(
        $,
        ($) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    ($) => abort(['unmarshalling', $]),
)

export const Type: declarations.Type = ($, abort, $p) => r_from_parse_tree.Type(
    r_parse_tree_from_list_of_characters.Document(
        $,
        ($) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    ($) => abort(['unmarshalling', $]),
)

export const Type_Reference: declarations.Type_Reference = ($, abort, $p) => r_from_parse_tree.Type_Reference(
    r_parse_tree_from_list_of_characters.Document(
        $,
        ($) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    ($) => abort(['unmarshalling', $]),
)

export const Value_Path: declarations.Value_Path = ($, abort, $p) => r_from_parse_tree.Value_Path(
    r_parse_tree_from_list_of_characters.Document(
        $,
        ($) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    ($) => abort(['unmarshalling', $]),
)

export const Value_Reference: declarations.Value_Reference = ($, abort, $p) => r_from_parse_tree.Value_Reference(
    r_parse_tree_from_list_of_characters.Document(
        $,
        ($) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    ($) => abort(['unmarshalling', $]),
)

export const Option_Constraints: declarations.Option_Constraints = ($, abort, $p) => r_from_parse_tree.Option_Constraints(
    r_parse_tree_from_list_of_characters.Document(
        $,
        ($) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    ($) => abort(['unmarshalling', $]),
)

export const Presence: declarations.Presence = ($, abort, $p) => r_from_parse_tree.Presence(
    r_parse_tree_from_list_of_characters.Document(
        $,
        ($) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    ($) => abort(['unmarshalling', $]),
)

export const Resolver_Value_Group: declarations.Resolver_Value_Group = ($, abort, $p) => r_from_parse_tree.Resolver_Value_Group(
    r_parse_tree_from_list_of_characters.Document(
        $,
        ($) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    ($) => abort(['unmarshalling', $]),
)

export const Resolver_Signature_Parameters: declarations.Resolver_Signature_Parameters = ($, abort, $p) => r_from_parse_tree.Resolver_Signature_Parameters(
    r_parse_tree_from_list_of_characters.Document(
        $,
        ($) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    ($) => abort(['unmarshalling', $]),
)

export const Resolver_Signatures: declarations.Resolver_Signatures = ($, abort, $p) => r_from_parse_tree.Resolver_Signatures(
    r_parse_tree_from_list_of_characters.Document(
        $,
        ($) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    ($) => abort(['unmarshalling', $]),
)

export const Resolver_Value_Constraints: declarations.Resolver_Value_Constraints = ($, abort, $p) => r_from_parse_tree.Resolver_Value_Constraints(
    r_parse_tree_from_list_of_characters.Document(
        $,
        ($) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    ($) => abort(['unmarshalling', $]),
)

export const Resolver_Relative_Value_Selection: declarations.Resolver_Relative_Value_Selection = ($, abort, $p) => r_from_parse_tree.Resolver_Relative_Value_Selection(
    r_parse_tree_from_list_of_characters.Document(
        $,
        ($) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    ($) => abort(['unmarshalling', $]),
)

export const Resolver_Result_Selection: declarations.Resolver_Result_Selection = ($, abort, $p) => r_from_parse_tree.Resolver_Result_Selection(
    r_parse_tree_from_list_of_characters.Document(
        $,
        ($) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    ($) => abort(['unmarshalling', $]),
)

export const Resolver_Value_List_Result: declarations.Resolver_Value_List_Result = ($, abort, $p) => r_from_parse_tree.Resolver_Value_List_Result(
    r_parse_tree_from_list_of_characters.Document(
        $,
        ($) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    ($) => abort(['unmarshalling', $]),
)

export const Resolver_Value: declarations.Resolver_Value = ($, abort, $p) => r_from_parse_tree.Resolver_Value(
    r_parse_tree_from_list_of_characters.Document(
        $,
        ($) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    ($) => abort(['unmarshalling', $]),
)

export const Resolver_Possible_Value_Selection: declarations.Resolver_Possible_Value_Selection = ($, abort, $p) => r_from_parse_tree.Resolver_Possible_Value_Selection(
    r_parse_tree_from_list_of_characters.Document(
        $,
        ($) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    ($) => abort(['unmarshalling', $]),
)

export const Resolver_Option_Constraints: declarations.Resolver_Option_Constraints = ($, abort, $p) => r_from_parse_tree.Resolver_Option_Constraints(
    r_parse_tree_from_list_of_characters.Document(
        $,
        ($) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    ($) => abort(['unmarshalling', $]),
)

export const Resolver_Guaranteed_Value_Selection: declarations.Resolver_Guaranteed_Value_Selection = ($, abort, $p) => r_from_parse_tree.Resolver_Guaranteed_Value_Selection(
    r_parse_tree_from_list_of_characters.Document(
        $,
        ($) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    ($) => abort(['unmarshalling', $]),
)

export const Resolver_Benchmark: declarations.Resolver_Benchmark = ($, abort, $p) => r_from_parse_tree.Resolver_Benchmark(
    r_parse_tree_from_list_of_characters.Document(
        $,
        ($) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    ($) => abort(['unmarshalling', $]),
)

export const Resolver_Constraint: declarations.Resolver_Constraint = ($, abort, $p) => r_from_parse_tree.Resolver_Constraint(
    r_parse_tree_from_list_of_characters.Document(
        $,
        ($) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    ($) => abort(['unmarshalling', $]),
)

export const Resolver_Lookup_Selection: declarations.Resolver_Lookup_Selection = ($, abort, $p) => r_from_parse_tree.Resolver_Lookup_Selection(
    r_parse_tree_from_list_of_characters.Document(
        $,
        ($) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    ($) => abort(['unmarshalling', $]),
)

export const Resolver_Optional_Value_Constraints: declarations.Resolver_Optional_Value_Constraints = ($, abort, $p) => r_from_parse_tree.Resolver_Optional_Value_Constraints(
    r_parse_tree_from_list_of_characters.Document(
        $,
        ($) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    ($) => abort(['unmarshalling', $]),
)

export const Resolver_Optional_Value_Initialization: declarations.Resolver_Optional_Value_Initialization = ($, abort, $p) => r_from_parse_tree.Resolver_Optional_Value_Initialization(
    r_parse_tree_from_list_of_characters.Document(
        $,
        ($) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    ($) => abort(['unmarshalling', $]),
)

export const Resolver_Reference_To_Value_Constraint: declarations.Resolver_Reference_To_Value_Constraint = ($, abort, $p) => r_from_parse_tree.Resolver_Reference_To_Value_Constraint(
    r_parse_tree_from_list_of_characters.Document(
        $,
        ($) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    ($) => abort(['unmarshalling', $]),
)

export const Resolver_Signature: declarations.Resolver_Signature = ($, abort, $p) => r_from_parse_tree.Resolver_Signature(
    r_parse_tree_from_list_of_characters.Document(
        $,
        ($) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    ($) => abort(['unmarshalling', $]),
)

export const Resolver_Types: declarations.Resolver_Types = ($, abort, $p) => r_from_parse_tree.Resolver_Types(
    r_parse_tree_from_list_of_characters.Document(
        $,
        ($) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    ($) => abort(['unmarshalling', $]),
)

export const Resolver_Value_Constraint: declarations.Resolver_Value_Constraint = ($, abort, $p) => r_from_parse_tree.Resolver_Value_Constraint(
    r_parse_tree_from_list_of_characters.Document(
        $,
        ($) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    ($) => abort(['unmarshalling', $]),
)

export const Schema: declarations.Schema = ($, abort, $p) => r_from_parse_tree.Schema(
    r_parse_tree_from_list_of_characters.Document(
        $,
        ($) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    ($) => abort(['unmarshalling', $]),
)

export const Type_Specification: declarations.Type_Specification = ($, abort, $p) => r_from_parse_tree.Type_Specification(
    r_parse_tree_from_list_of_characters.Document(
        $,
        ($) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    ($) => abort(['unmarshalling', $]),
)

export const Value_Results: declarations.Value_Results = ($, abort, $p) => r_from_parse_tree.Value_Results(
    r_parse_tree_from_list_of_characters.Document(
        $,
        ($) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    ($) => abort(['unmarshalling', $]),
)
