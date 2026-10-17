import * as p_ from 'pareto-core/refiner'

import * as s_in from "astn-runtime/modules/deserialization/schemas/list_of_characters/schema"
import * as s_out from "../schema.js"
import * as s_error from "liana-runtime/modules/resolved_document_deserialization/schemas/resolved_document_deserialization/schema"
import * as s_parameter from "liana-runtime/modules/resolved_document_deserialization/schemas/resolved_document_deserialization/schema"

namespace declarations {
    export type Module_Specification = p_.Refiner_With_Parameter<
        s_out.Module_Specification,
        s_error.Error,
        s_in.List_Of_Characters,
        s_parameter.Parameters
    >
}

//dependencies
import * as r_from_unresolved_manual from "./unresolved_manual.js"
import * as r_unresolved_from_list_of_characters from "../../unresolved/refiners/list_of_characters.js"

export const Module_Specification: declarations.Module_Specification = ($, abort, $p) => r_from_unresolved_manual.Module_Specification(
    r_unresolved_from_list_of_characters.Module_Specification(
        $,
        ($) => abort(['unresolved document deserialization', $]),
        $p,
    ),
    ($) => abort(['resolving', $]),
    p_.literal.nothing(),
    p_.literal.nothing()
)
