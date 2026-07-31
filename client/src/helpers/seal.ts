import * as p_ri from 'pareto-core/interface/refiner'
import p_list_from_text from 'pareto-core/implementation/refiner/specials/list_from_text'

import * as d_out from "pareto-fountain-pen/modules/paragraph/schemas/serialized/schema"
import * as d_function from "liana-authoring/schemas/sealing/schema"

type Signature = p_ri.Refiner_With_Parameter<
    d_out.Lines,
    d_function.Error,
    string,
    d_function.Parameters
>

//dependencies
import * as r_sealed_target_from_loc from "liana-authoring/schemas/astn_sealed_target/refiners/list_of_characters"
import * as t_sealed_target_to_serialized from "astn-core/modules/serialization/schemas/sealed_target/transformers/serialized_paragraph"


export const $$: Signature = ($, abort, $p) => t_sealed_target_to_serialized.Document(
    r_sealed_target_from_loc.Document(
        p_list_from_text(
            $,
            ($) => $
        ),
        ($) => abort($),
        {
            'unmarshall': $p.unmarshall,
        }
    ),
    $p.target
)