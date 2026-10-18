import * as p_ from 'pareto-core/refiner'

// schemas
import * as s_target from "../schema.js"
import * as s_source from "astn-runtime/modules/deserialization/schemas/list_of_characters/schema"
import * as s_error from "../../../../../temp/liana_runtime_resolved_document_deserialization_schema.js"
import * as s_parameters from "../../../../../temp/liana_runtime_resolved_document_deserialization_schema.js"

// refiner dependencies
import * as r_from_unresolved from "./unresolved_manual.js"
import * as r_unresolved_from_list_of_characters from "../../unresolved/refiners/list_of_characters.js"

export namespace declarations {

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
}

// implementations

export const Schema: declarations.Schema = (
    $,
    abort,
    $p,
) => r_from_unresolved.Schema(
    r_unresolved_from_list_of_characters.Schema(
        $,
        (
            $,
        ) => abort(['unresolved document deserialization', $]),
        $p,
    ),
    (
        $,
    ) => abort(['resolving', $]),
)

export const Type_Specification: declarations.Type_Specification = (
    $,
    abort,
    $p,
) => r_from_unresolved.Type_Specification(
    r_unresolved_from_list_of_characters.Type_Specification(
        $,
        (
            $,
        ) => abort(['unresolved document deserialization', $]),
        $p,
    ),
    (
        $,
    ) => abort(['resolving', $]),
)
