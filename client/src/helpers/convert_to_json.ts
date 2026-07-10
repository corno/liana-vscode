import * as p_i from 'pareto-core/interface/refiner'

import * as d_function from "liana-authoring/interface/data/convert_to_json"
import * as d_function_deserialize_parse_tree from "astn-core/interface/data/deserialize_parse_tree"
import * as d_out from "pareto-fountain-pen/interface/data/text"
import * as d_in from "pareto-fountain-pen/interface/data/text"

type Signature = p_i.Refiner_With_Parameter<
    d_out.Text,
    d_function_deserialize_parse_tree.Error,
    d_in.Text,
    d_function.Parameters
>

//dependencies
import * as t_ast_2_json from "astn/implementation/transformers/parse_tree/json_target"
import * as t_json_to_text from "pareto-json/implementation/transformers/json_without_guaranteed_unique_keys/text"
import * as r_astn_parse_tree_from_text from "astn-core/implementation/refiners/parse_tree/text"


export const $$: Signature = ($, abort, $p,) => t_json_to_text.Value(
    t_ast_2_json.Document(
        r_astn_parse_tree_from_text.Document(
            $,
            ($) => abort($),
            {
                'tab size': $p.source['tab size']
            },
        )
    ),
    $p.target
)