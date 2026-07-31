import * as p_i from 'pareto-core/interface/refiner'
import p_list_from_text from 'pareto-core/implementation/refiner/specials/list_from_text'

import * as s_function from "liana-authoring/schemas/conversion_to_json/schema"
import * as s_parse_tree_deserialization from "astn-core/modules/deserialization/schemas/parse_tree_deserialization/schema"
import * as s_out from "pareto-fountain-pen/modules/paragraph/schemas/serialized/schema"

type Signature = p_i.Refiner_With_Parameter<
    s_out.Lines,
    s_parse_tree_deserialization.Error,
    string,
    s_function.Parameters
>

//dependencies
import * as t_ast_2_json from "astn/modules/parse_tree/schemas/parse_tree/transformers/json_target"
import * as t_json_to_serialized from "pareto-json/modules/serialization/schemas/without_guaranteed_unique_keys/transformers/serialized"
import * as r_astn_parse_tree_from_loc from "astn-core/modules/deserialization/schemas/parse_tree/refiners/list_of_characters"


export const $$: Signature = ($, abort, $p,) => t_json_to_serialized.Document(
    t_ast_2_json.Document(
        r_astn_parse_tree_from_loc.Document(
            p_list_from_text(
                $,
                ($) => $
            ),
            ($) => abort($),
            {
                'tab size': $p.source['tab size']
            },
        )
    ),
    $p.target
)