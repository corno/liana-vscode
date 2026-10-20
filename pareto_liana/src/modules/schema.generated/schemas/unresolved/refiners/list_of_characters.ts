import * as __operations from "./list_of_characters.js"
import * as p_ from 'pareto-core/refiner'

// schemas
import * as s_target from "../schema.js"
import * as s_source from "astn-runtime/modules/deserialization/schemas/list_of_characters/schema"
import * as s_error from "../../reader_errors/schema.js"
import * as s_parameters from "liana-runtime/modules/unresolved_document_deserialization/schemas/unresolved_document_deserialization/schema"

// refiner dependencies
import * as r_from_parse_tree from "./astn_parse_tree.js"
import * as r_parse_tree_from_list_of_characters from "astn-runtime/modules/deserialization/schemas/parse_tree/refiners/list_of_characters"

export namespace declarations {
    
    export type Directory = p_.Refiner_With_Parameter<
        s_target.types.Directory,
        s_error.types.Unresolved_Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Node = p_.Refiner_With_Parameter<
        s_target.types.Node,
        s_error.types.Unresolved_Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Schema = p_.Refiner_With_Parameter<
        s_target.types.Schema,
        s_error.types.Unresolved_Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Type_Specification = p_.Refiner_With_Parameter<
        s_target.types.Type_Specification,
        s_error.types.Unresolved_Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
}

// implementations

export const Directory: declarations.Directory = ($, abort, $p) => r_from_parse_tree.Directory(
    r_parse_tree_from_list_of_characters.Document(
        $,
        ($) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    ($) => abort(['unmarshalling', $]),
)

export const Node: declarations.Node = ($, abort, $p) => r_from_parse_tree.Node(
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
export namespace namespaces {
    export namespace structure {
        
        export namespace declarations {
            
            export type Regular_Expression = p_.Refiner_With_Parameter<
                s_target.namespaces.structure.types.Regular_Expression,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Basic_Type = p_.Refiner_With_Parameter<
                s_target.namespaces.structure.types.Basic_Type,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Basic_Types = p_.Refiner_With_Parameter<
                s_target.namespaces.structure.types.Basic_Types,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Dictionary = p_.Refiner_With_Parameter<
                s_target.namespaces.structure.types.Dictionary,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Group = p_.Refiner_With_Parameter<
                s_target.namespaces.structure.types.Group,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Namespaces = p_.Refiner_With_Parameter<
                s_target.namespaces.structure.types.Namespaces,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Types = p_.Refiner_With_Parameter<
                s_target.namespaces.structure.types.Types,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Type = p_.Refiner_With_Parameter<
                s_target.namespaces.structure.types.Type,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Type_Reference = p_.Refiner_With_Parameter<
                s_target.namespaces.structure.types.Type_Reference,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Value = p_.Refiner_With_Parameter<
                s_target.namespaces.structure.types.Value,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Value_Path = p_.Refiner_With_Parameter<
                s_target.namespaces.structure.types.Value_Path,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Value_Reference = p_.Refiner_With_Parameter<
                s_target.namespaces.structure.types.Value_Reference,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Option_Constraints = p_.Refiner_With_Parameter<
                s_target.namespaces.structure.types.Option_Constraints,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Reference = p_.Refiner_With_Parameter<
                s_target.namespaces.structure.types.Reference,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Reference_Constraints = p_.Refiner_With_Parameter<
                s_target.namespaces.structure.types.Reference_Constraints,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Structure = p_.Refiner_With_Parameter<
                s_target.namespaces.structure.types.Structure,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Value_Result = p_.Refiner_With_Parameter<
                s_target.namespaces.structure.types.Value_Result,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
        }
        
        // implementations
        
        export const Regular_Expression: declarations.Regular_Expression = ($, abort, $p) => r_from_parse_tree.namespaces.structure.Regular_Expression(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Basic_Type: declarations.Basic_Type = ($, abort, $p) => r_from_parse_tree.namespaces.structure.Basic_Type(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Basic_Types: declarations.Basic_Types = ($, abort, $p) => r_from_parse_tree.namespaces.structure.Basic_Types(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Dictionary: declarations.Dictionary = ($, abort, $p) => r_from_parse_tree.namespaces.structure.Dictionary(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Group: declarations.Group = ($, abort, $p) => r_from_parse_tree.namespaces.structure.Group(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Namespaces: declarations.Namespaces = ($, abort, $p) => r_from_parse_tree.namespaces.structure.Namespaces(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Types: declarations.Types = ($, abort, $p) => r_from_parse_tree.namespaces.structure.Types(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Type: declarations.Type = ($, abort, $p) => r_from_parse_tree.namespaces.structure.Type(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Type_Reference: declarations.Type_Reference = ($, abort, $p) => r_from_parse_tree.namespaces.structure.Type_Reference(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Value: declarations.Value = ($, abort, $p) => r_from_parse_tree.namespaces.structure.Value(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Value_Path: declarations.Value_Path = ($, abort, $p) => r_from_parse_tree.namespaces.structure.Value_Path(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Value_Reference: declarations.Value_Reference = ($, abort, $p) => r_from_parse_tree.namespaces.structure.Value_Reference(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Option_Constraints: declarations.Option_Constraints = ($, abort, $p) => r_from_parse_tree.namespaces.structure.Option_Constraints(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Reference: declarations.Reference = ($, abort, $p) => r_from_parse_tree.namespaces.structure.Reference(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Reference_Constraints: declarations.Reference_Constraints = ($, abort, $p) => r_from_parse_tree.namespaces.structure.Reference_Constraints(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Structure: declarations.Structure = ($, abort, $p) => r_from_parse_tree.namespaces.structure.Structure(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Value_Result: declarations.Value_Result = ($, abort, $p) => r_from_parse_tree.namespaces.structure.Value_Result(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        export namespace namespaces {}
    }
    export namespace signatures {
        
        export namespace declarations {
            
            export type Presence = p_.Refiner_With_Parameter<
                s_target.namespaces.signatures.types.Presence,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Signature_Type_Reference = p_.Refiner_With_Parameter<
                s_target.namespaces.signatures.types.Signature_Type_Reference,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Signature_Parameters = p_.Refiner_With_Parameter<
                s_target.namespaces.signatures.types.Signature_Parameters,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Signatures = p_.Refiner_With_Parameter<
                s_target.namespaces.signatures.types.Signatures,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Signature = p_.Refiner_With_Parameter<
                s_target.namespaces.signatures.types.Signature,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Namespaces = p_.Refiner_With_Parameter<
                s_target.namespaces.signatures.types.Namespaces,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Signature_Namespace = p_.Refiner_With_Parameter<
                s_target.namespaces.signatures.types.Signature_Namespace,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
        }
        
        // implementations
        
        export const Presence: declarations.Presence = ($, abort, $p) => r_from_parse_tree.namespaces.signatures.Presence(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Signature_Type_Reference: declarations.Signature_Type_Reference = ($, abort, $p) => r_from_parse_tree.namespaces.signatures.Signature_Type_Reference(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Signature_Parameters: declarations.Signature_Parameters = ($, abort, $p) => r_from_parse_tree.namespaces.signatures.Signature_Parameters(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Signatures: declarations.Signatures = ($, abort, $p) => r_from_parse_tree.namespaces.signatures.Signatures(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Signature: declarations.Signature = ($, abort, $p) => r_from_parse_tree.namespaces.signatures.Signature(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Namespaces: declarations.Namespaces = ($, abort, $p) => r_from_parse_tree.namespaces.signatures.Namespaces(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Signature_Namespace: declarations.Signature_Namespace = ($, abort, $p) => r_from_parse_tree.namespaces.signatures.Signature_Namespace(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        export namespace namespaces {}
    }
    export namespace resolver {
        
        export namespace declarations {
            
            export type Absence_Constraints = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Absence_Constraints,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Type_Reference = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Type_Reference,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Value_Path = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Value_Path,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Value_Reference = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Value_Reference,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Relative_Value_Selection = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Relative_Value_Selection,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Guaranteed_Value_Selection = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Guaranteed_Value_Selection,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Benchmark = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Benchmark,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Constraint = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Constraint,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Lookup_Selection = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Lookup_Selection,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Namespaces = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Namespaces,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Possible_Value_Selection = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Possible_Value_Selection,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Option_Constraints = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Option_Constraints,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Optional_Value_Initialization = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Optional_Value_Initialization,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Reference_Constraints = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Reference_Constraints,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Reference_To_Value_Constraint = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Reference_To_Value_Constraint,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Resolver = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Resolver,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Result_Selection = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Result_Selection,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Value_Group = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Value_Group,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Value_List_Result = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Value_List_Result,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Value = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Value,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Types = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Types,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Value_Constraint = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Value_Constraint,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Value_Constraints = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Value_Constraints,
                s_error.types.Unresolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
        }
        
        // implementations
        
        export const Absence_Constraints: declarations.Absence_Constraints = ($, abort, $p) => r_from_parse_tree.namespaces.resolver.Absence_Constraints(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Type_Reference: declarations.Type_Reference = ($, abort, $p) => r_from_parse_tree.namespaces.resolver.Type_Reference(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Value_Path: declarations.Value_Path = ($, abort, $p) => r_from_parse_tree.namespaces.resolver.Value_Path(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Value_Reference: declarations.Value_Reference = ($, abort, $p) => r_from_parse_tree.namespaces.resolver.Value_Reference(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Relative_Value_Selection: declarations.Relative_Value_Selection = ($, abort, $p) => r_from_parse_tree.namespaces.resolver.Relative_Value_Selection(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Guaranteed_Value_Selection: declarations.Guaranteed_Value_Selection = ($, abort, $p) => r_from_parse_tree.namespaces.resolver.Guaranteed_Value_Selection(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Benchmark: declarations.Benchmark = ($, abort, $p) => r_from_parse_tree.namespaces.resolver.Benchmark(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Constraint: declarations.Constraint = ($, abort, $p) => r_from_parse_tree.namespaces.resolver.Constraint(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Lookup_Selection: declarations.Lookup_Selection = ($, abort, $p) => r_from_parse_tree.namespaces.resolver.Lookup_Selection(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Namespaces: declarations.Namespaces = ($, abort, $p) => r_from_parse_tree.namespaces.resolver.Namespaces(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Possible_Value_Selection: declarations.Possible_Value_Selection = ($, abort, $p) => r_from_parse_tree.namespaces.resolver.Possible_Value_Selection(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Option_Constraints: declarations.Option_Constraints = ($, abort, $p) => r_from_parse_tree.namespaces.resolver.Option_Constraints(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Optional_Value_Initialization: declarations.Optional_Value_Initialization = ($, abort, $p) => r_from_parse_tree.namespaces.resolver.Optional_Value_Initialization(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Reference_Constraints: declarations.Reference_Constraints = ($, abort, $p) => r_from_parse_tree.namespaces.resolver.Reference_Constraints(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Reference_To_Value_Constraint: declarations.Reference_To_Value_Constraint = ($, abort, $p) => r_from_parse_tree.namespaces.resolver.Reference_To_Value_Constraint(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Resolver: declarations.Resolver = ($, abort, $p) => r_from_parse_tree.namespaces.resolver.Resolver(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Result_Selection: declarations.Result_Selection = ($, abort, $p) => r_from_parse_tree.namespaces.resolver.Result_Selection(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Value_Group: declarations.Value_Group = ($, abort, $p) => r_from_parse_tree.namespaces.resolver.Value_Group(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Value_List_Result: declarations.Value_List_Result = ($, abort, $p) => r_from_parse_tree.namespaces.resolver.Value_List_Result(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Value: declarations.Value = ($, abort, $p) => r_from_parse_tree.namespaces.resolver.Value(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Types: declarations.Types = ($, abort, $p) => r_from_parse_tree.namespaces.resolver.Types(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Value_Constraint: declarations.Value_Constraint = ($, abort, $p) => r_from_parse_tree.namespaces.resolver.Value_Constraint(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        
        export const Value_Constraints: declarations.Value_Constraints = ($, abort, $p) => r_from_parse_tree.namespaces.resolver.Value_Constraints(
            r_parse_tree_from_list_of_characters.Document(
                $,
                ($) => abort(['parse tree deserialization', $]),
                $p,
            )['content'],
            ($) => abort(['unmarshalling', $]),
        )
        export namespace namespaces {}
    }
}
