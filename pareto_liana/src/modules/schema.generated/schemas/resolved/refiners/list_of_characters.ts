import * as __operations from "./list_of_characters.js"
import * as p_ from 'pareto-core/refiner'

// schemas
import * as s_target from "../schema.js"
import * as s_source from "astn-runtime/modules/deserialization/schemas/list_of_characters/schema"
import * as s_error from "../../reader_errors/schema.js"
import * as s_parameters from "liana-runtime/modules/resolved_document_deserialization/schemas/resolved_document_deserialization/schema"

// refiner dependencies
import * as r_from_unresolved from "./unresolved.js"
import * as manual from "./unresolved_manual.js"
import * as parse from "astn-runtime/modules/deserialization/schemas/parse_tree/refiners/list_of_characters"
import * as range from "astn-runtime/modules/deserialization/schemas/parse_tree/transformers/start_token_range"
import * as r_unresolved_from_list_of_characters from "../../unresolved/refiners/list_of_characters.js"

export namespace declarations {
    
    export type Directory = p_.Refiner_With_Parameter<
        s_target.types.Directory,
        s_error.types.Resolved_Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Node = p_.Refiner_With_Parameter<
        s_target.types.Node,
        s_error.types.Resolved_Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Schema = p_.Refiner_With_Parameter<
        s_target.types.Schema,
        s_error.types.Resolved_Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Type_Specification = p_.Refiner_With_Parameter<
        s_target.types.Type_Specification,
        s_error.types.Resolved_Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
}

// implementations

export const Directory: declarations.Directory = ($, abort, $p) => r_from_unresolved.Directory(
    r_unresolved_from_list_of_characters.Directory(
        $,
        ($) => abort(['unresolved document deserialization', $]),
        $p,
    ),
    ($) => abort(['resolving', $]),
)

export const Node: declarations.Node = ($, abort, $p) => r_from_unresolved.Node(
    r_unresolved_from_list_of_characters.Node(
        $,
        ($) => abort(['unresolved document deserialization', $]),
        $p,
    ),
    ($) => abort(['resolving', $]),
)

export const Schema: declarations.Schema = ($, abort, $p) => manual.Schema(
    r_unresolved_from_list_of_characters.Schema(
        $,
        ($) => abort(['unresolved document deserialization', $]),
        $p,
    ),
    (error) => abort(['resolving', { ...error, location: range.Value(parse.Document($, error => abort(['unresolved document deserialization', ['parse tree deserialization', error]]), $p).content) }]),
)

export const Type_Specification: declarations.Type_Specification = ($, abort, $p) => manual.Type_Specification(
    r_unresolved_from_list_of_characters.Type_Specification(
        $,
        ($) => abort(['unresolved document deserialization', $]),
        $p,
    ),
    (error) => abort(['resolving', { ...error, location: range.Value(parse.Document($, error => abort(['unresolved document deserialization', ['parse tree deserialization', error]]), $p).content) }]),
)
export namespace namespaces {
    export namespace structure {
        
        export namespace declarations {
            
            export type Regular_Expression = p_.Refiner_With_Parameter<
                s_target.namespaces.structure.types.Regular_Expression,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Basic_Type = p_.Refiner_With_Parameter<
                s_target.namespaces.structure.types.Basic_Type,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Basic_Types = p_.Refiner_With_Parameter<
                s_target.namespaces.structure.types.Basic_Types,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Dictionary = p_.Refiner_With_Parameter<
                s_target.namespaces.structure.types.Dictionary,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Group = p_.Refiner_With_Parameter<
                s_target.namespaces.structure.types.Group,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Namespaces = p_.Refiner_With_Parameter<
                s_target.namespaces.structure.types.Namespaces,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Types = p_.Refiner_With_Parameter<
                s_target.namespaces.structure.types.Types,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Type = p_.Refiner_With_Parameter<
                s_target.namespaces.structure.types.Type,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Type_Reference = p_.Refiner_With_Parameter<
                s_target.namespaces.structure.types.Type_Reference,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Value = p_.Refiner_With_Parameter<
                s_target.namespaces.structure.types.Value,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Value_Path = p_.Refiner_With_Parameter<
                s_target.namespaces.structure.types.Value_Path,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Value_Reference = p_.Refiner_With_Parameter<
                s_target.namespaces.structure.types.Value_Reference,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Option_Constraints = p_.Refiner_With_Parameter<
                s_target.namespaces.structure.types.Option_Constraints,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Reference = p_.Refiner_With_Parameter<
                s_target.namespaces.structure.types.Reference,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Reference_Constraints = p_.Refiner_With_Parameter<
                s_target.namespaces.structure.types.Reference_Constraints,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Structure = p_.Refiner_With_Parameter<
                s_target.namespaces.structure.types.Structure,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Value_Result = p_.Refiner_With_Parameter<
                s_target.namespaces.structure.types.Value_Result,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
        }
        
        // implementations
        
        export const Regular_Expression: declarations.Regular_Expression = ($, abort, $p) => r_from_unresolved.namespaces.structure.Regular_Expression(
            r_unresolved_from_list_of_characters.namespaces.structure.Regular_Expression(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Basic_Type: declarations.Basic_Type = ($, abort, $p) => r_from_unresolved.namespaces.structure.Basic_Type(
            r_unresolved_from_list_of_characters.namespaces.structure.Basic_Type(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Basic_Types: declarations.Basic_Types = ($, abort, $p) => r_from_unresolved.namespaces.structure.Basic_Types(
            r_unresolved_from_list_of_characters.namespaces.structure.Basic_Types(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Dictionary: declarations.Dictionary = ($, abort, $p) => r_from_unresolved.namespaces.structure.Dictionary(
            r_unresolved_from_list_of_characters.namespaces.structure.Dictionary(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Group: declarations.Group = ($, abort, $p) => r_from_unresolved.namespaces.structure.Group(
            r_unresolved_from_list_of_characters.namespaces.structure.Group(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Namespaces: declarations.Namespaces = ($, abort, $p) => r_from_unresolved.namespaces.structure.Namespaces(
            r_unresolved_from_list_of_characters.namespaces.structure.Namespaces(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Types: declarations.Types = ($, abort, $p) => r_from_unresolved.namespaces.structure.Types(
            r_unresolved_from_list_of_characters.namespaces.structure.Types(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Type: declarations.Type = ($, abort, $p) => r_from_unresolved.namespaces.structure.Type(
            r_unresolved_from_list_of_characters.namespaces.structure.Type(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Type_Reference: declarations.Type_Reference = ($, abort, $p) => r_from_unresolved.namespaces.structure.Type_Reference(
            r_unresolved_from_list_of_characters.namespaces.structure.Type_Reference(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Value: declarations.Value = ($, abort, $p) => r_from_unresolved.namespaces.structure.Value(
            r_unresolved_from_list_of_characters.namespaces.structure.Value(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Value_Path: declarations.Value_Path = ($, abort, $p) => r_from_unresolved.namespaces.structure.Value_Path(
            r_unresolved_from_list_of_characters.namespaces.structure.Value_Path(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Value_Reference: declarations.Value_Reference = ($, abort, $p) => r_from_unresolved.namespaces.structure.Value_Reference(
            r_unresolved_from_list_of_characters.namespaces.structure.Value_Reference(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Option_Constraints: declarations.Option_Constraints = ($, abort, $p) => r_from_unresolved.namespaces.structure.Option_Constraints(
            r_unresolved_from_list_of_characters.namespaces.structure.Option_Constraints(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Reference: declarations.Reference = ($, abort, $p) => r_from_unresolved.namespaces.structure.Reference(
            r_unresolved_from_list_of_characters.namespaces.structure.Reference(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Reference_Constraints: declarations.Reference_Constraints = ($, abort, $p) => r_from_unresolved.namespaces.structure.Reference_Constraints(
            r_unresolved_from_list_of_characters.namespaces.structure.Reference_Constraints(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Structure: declarations.Structure = ($, abort, $p) => r_from_unresolved.namespaces.structure.Structure(
            r_unresolved_from_list_of_characters.namespaces.structure.Structure(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Value_Result: declarations.Value_Result = ($, abort, $p) => r_from_unresolved.namespaces.structure.Value_Result(
            r_unresolved_from_list_of_characters.namespaces.structure.Value_Result(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        export namespace namespaces {}
    }
    export namespace signatures {
        
        export namespace declarations {
            
            export type Presence = p_.Refiner_With_Parameter<
                s_target.namespaces.signatures.types.Presence,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Signature_Type_Reference = p_.Refiner_With_Parameter<
                s_target.namespaces.signatures.types.Signature_Type_Reference,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Signature_Parameters = p_.Refiner_With_Parameter<
                s_target.namespaces.signatures.types.Signature_Parameters,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Signatures = p_.Refiner_With_Parameter<
                s_target.namespaces.signatures.types.Signatures,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Signature = p_.Refiner_With_Parameter<
                s_target.namespaces.signatures.types.Signature,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Namespaces = p_.Refiner_With_Parameter<
                s_target.namespaces.signatures.types.Namespaces,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Signature_Namespace = p_.Refiner_With_Parameter<
                s_target.namespaces.signatures.types.Signature_Namespace,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
        }
        
        // implementations
        
        export const Presence: declarations.Presence = ($, abort, $p) => r_from_unresolved.namespaces.signatures.Presence(
            r_unresolved_from_list_of_characters.namespaces.signatures.Presence(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Signature_Type_Reference: declarations.Signature_Type_Reference = ($, abort, $p) => r_from_unresolved.namespaces.signatures.Signature_Type_Reference(
            r_unresolved_from_list_of_characters.namespaces.signatures.Signature_Type_Reference(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Signature_Parameters: declarations.Signature_Parameters = ($, abort, $p) => r_from_unresolved.namespaces.signatures.Signature_Parameters(
            r_unresolved_from_list_of_characters.namespaces.signatures.Signature_Parameters(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Signatures: declarations.Signatures = ($, abort, $p) => r_from_unresolved.namespaces.signatures.Signatures(
            r_unresolved_from_list_of_characters.namespaces.signatures.Signatures(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Signature: declarations.Signature = ($, abort, $p) => r_from_unresolved.namespaces.signatures.Signature(
            r_unresolved_from_list_of_characters.namespaces.signatures.Signature(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Namespaces: declarations.Namespaces = ($, abort, $p) => r_from_unresolved.namespaces.signatures.Namespaces(
            r_unresolved_from_list_of_characters.namespaces.signatures.Namespaces(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Signature_Namespace: declarations.Signature_Namespace = ($, abort, $p) => r_from_unresolved.namespaces.signatures.Signature_Namespace(
            r_unresolved_from_list_of_characters.namespaces.signatures.Signature_Namespace(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        export namespace namespaces {}
    }
    export namespace resolver {
        
        export namespace declarations {
            
            export type Absence_Constraints = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Absence_Constraints,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Type_Reference = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Type_Reference,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Value_Path = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Value_Path,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Value_Reference = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Value_Reference,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Relative_Value_Selection = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Relative_Value_Selection,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Guaranteed_Value_Selection = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Guaranteed_Value_Selection,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Benchmark = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Benchmark,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Constraint = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Constraint,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Lookup_Selection = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Lookup_Selection,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Namespaces = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Namespaces,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Possible_Value_Selection = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Possible_Value_Selection,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Option_Constraints = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Option_Constraints,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Optional_Value_Initialization = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Optional_Value_Initialization,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Reference_Constraints = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Reference_Constraints,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Reference_To_Value_Constraint = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Reference_To_Value_Constraint,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Resolver = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Resolver,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Result_Selection = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Result_Selection,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Value_Group = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Value_Group,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Value_List_Result = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Value_List_Result,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Value = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Value,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Types = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Types,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Value_Constraint = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Value_Constraint,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
            
            export type Value_Constraints = p_.Refiner_With_Parameter<
                s_target.namespaces.resolver.types.Value_Constraints,
                s_error.types.Resolved_Error,
                s_source.List_Of_Characters,
                s_parameters.Parameters
            >
        }
        
        // implementations
        
        export const Absence_Constraints: declarations.Absence_Constraints = ($, abort, $p) => r_from_unresolved.namespaces.resolver.Absence_Constraints(
            r_unresolved_from_list_of_characters.namespaces.resolver.Absence_Constraints(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Type_Reference: declarations.Type_Reference = ($, abort, $p) => r_from_unresolved.namespaces.resolver.Type_Reference(
            r_unresolved_from_list_of_characters.namespaces.resolver.Type_Reference(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Value_Path: declarations.Value_Path = ($, abort, $p) => r_from_unresolved.namespaces.resolver.Value_Path(
            r_unresolved_from_list_of_characters.namespaces.resolver.Value_Path(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Value_Reference: declarations.Value_Reference = ($, abort, $p) => r_from_unresolved.namespaces.resolver.Value_Reference(
            r_unresolved_from_list_of_characters.namespaces.resolver.Value_Reference(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Relative_Value_Selection: declarations.Relative_Value_Selection = ($, abort, $p) => r_from_unresolved.namespaces.resolver.Relative_Value_Selection(
            r_unresolved_from_list_of_characters.namespaces.resolver.Relative_Value_Selection(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Guaranteed_Value_Selection: declarations.Guaranteed_Value_Selection = ($, abort, $p) => r_from_unresolved.namespaces.resolver.Guaranteed_Value_Selection(
            r_unresolved_from_list_of_characters.namespaces.resolver.Guaranteed_Value_Selection(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Benchmark: declarations.Benchmark = ($, abort, $p) => r_from_unresolved.namespaces.resolver.Benchmark(
            r_unresolved_from_list_of_characters.namespaces.resolver.Benchmark(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Constraint: declarations.Constraint = ($, abort, $p) => r_from_unresolved.namespaces.resolver.Constraint(
            r_unresolved_from_list_of_characters.namespaces.resolver.Constraint(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Lookup_Selection: declarations.Lookup_Selection = ($, abort, $p) => r_from_unresolved.namespaces.resolver.Lookup_Selection(
            r_unresolved_from_list_of_characters.namespaces.resolver.Lookup_Selection(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Namespaces: declarations.Namespaces = ($, abort, $p) => r_from_unresolved.namespaces.resolver.Namespaces(
            r_unresolved_from_list_of_characters.namespaces.resolver.Namespaces(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Possible_Value_Selection: declarations.Possible_Value_Selection = ($, abort, $p) => r_from_unresolved.namespaces.resolver.Possible_Value_Selection(
            r_unresolved_from_list_of_characters.namespaces.resolver.Possible_Value_Selection(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Option_Constraints: declarations.Option_Constraints = ($, abort, $p) => r_from_unresolved.namespaces.resolver.Option_Constraints(
            r_unresolved_from_list_of_characters.namespaces.resolver.Option_Constraints(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Optional_Value_Initialization: declarations.Optional_Value_Initialization = ($, abort, $p) => r_from_unresolved.namespaces.resolver.Optional_Value_Initialization(
            r_unresolved_from_list_of_characters.namespaces.resolver.Optional_Value_Initialization(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Reference_Constraints: declarations.Reference_Constraints = ($, abort, $p) => r_from_unresolved.namespaces.resolver.Reference_Constraints(
            r_unresolved_from_list_of_characters.namespaces.resolver.Reference_Constraints(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Reference_To_Value_Constraint: declarations.Reference_To_Value_Constraint = ($, abort, $p) => r_from_unresolved.namespaces.resolver.Reference_To_Value_Constraint(
            r_unresolved_from_list_of_characters.namespaces.resolver.Reference_To_Value_Constraint(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Resolver: declarations.Resolver = ($, abort, $p) => r_from_unresolved.namespaces.resolver.Resolver(
            r_unresolved_from_list_of_characters.namespaces.resolver.Resolver(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Result_Selection: declarations.Result_Selection = ($, abort, $p) => r_from_unresolved.namespaces.resolver.Result_Selection(
            r_unresolved_from_list_of_characters.namespaces.resolver.Result_Selection(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Value_Group: declarations.Value_Group = ($, abort, $p) => r_from_unresolved.namespaces.resolver.Value_Group(
            r_unresolved_from_list_of_characters.namespaces.resolver.Value_Group(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Value_List_Result: declarations.Value_List_Result = ($, abort, $p) => r_from_unresolved.namespaces.resolver.Value_List_Result(
            r_unresolved_from_list_of_characters.namespaces.resolver.Value_List_Result(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Value: declarations.Value = ($, abort, $p) => r_from_unresolved.namespaces.resolver.Value(
            r_unresolved_from_list_of_characters.namespaces.resolver.Value(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Types: declarations.Types = ($, abort, $p) => r_from_unresolved.namespaces.resolver.Types(
            r_unresolved_from_list_of_characters.namespaces.resolver.Types(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Value_Constraint: declarations.Value_Constraint = ($, abort, $p) => r_from_unresolved.namespaces.resolver.Value_Constraint(
            r_unresolved_from_list_of_characters.namespaces.resolver.Value_Constraint(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        
        export const Value_Constraints: declarations.Value_Constraints = ($, abort, $p) => r_from_unresolved.namespaces.resolver.Value_Constraints(
            r_unresolved_from_list_of_characters.namespaces.resolver.Value_Constraints(
                $,
                ($) => abort(['unresolved document deserialization', $]),
                $p,
            ),
            ($) => abort(['resolving', $]),
        )
        export namespace namespaces {}
    }
}
