import * as p_ri from 'pareto-core/refiner'
import p_list_from_text from 'pareto-core/refiner/specials/list_from_text'

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
import * as t_sealed_target_to_serialized from "astn-runtime/modules/serialization/schemas/sealed_target/transformers/serialized_paragraph"
import type { Document_Specification } from 'pareto-liana/schemas/liana_next_schema/authoring_schema'
import { document_specification_signature } from 'pareto-liana/schemas/liana_next_schema/document_specification'
import { Document } from 'pareto-liana/shared/sealed_artifact/index'
import * as serializer from 'pareto-fountain-pen/modules/paragraph/schemas/paragraph/serializers'

export const seal_artifact = (
    source: string,
    governing_specification: Document_Specification,
    abort: (message: string) => never,
    parameters: d_function.Parameters,
): string => {
    if (governing_specification['root type'].value['l entry'] !== parameters.unmarshall.type) {
        return abort('Sealing root type does not match the governing Document Specification')
    }
    const signature = document_specification_signature(governing_specification)
    const content = r_sealed_target_from_loc.Document(
        p_list_from_text(source, $ => $),
        error => abort(JSON.stringify(error)),
        { unmarshall: parameters.unmarshall },
    )
    let text = ''
    serializer.Paragraph(Document(content, signature), parameters.target, chunk => { text += chunk })
    return text
}


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