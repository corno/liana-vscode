import * as p_ from 'pareto-core/transformer'

import * as s_in from "../schema.js"
import * as s_out from "pareto-fountain-pen/modules/paragraph/schemas/paragraph/schema"


//shorthands
import * as sh from "pareto-fountain-pen/modules/paragraph/schemas/paragraph/shorthands/deprecated"

//dependencies
import * as ser_resolving from "liana-runtime/modules/resolved_document_deserialization/schemas/resolving/serializers"
import * as ser_write_file from "pareto-filesystem-unrestricted-api/modules/unrestricted/schemas/write_file/serializers"
import * as ser_location from "astn-runtime/modules/deserialization/schemas/location/serializers"

export const Error: p_.Transformer_With_Parameter<
    s_in.Error,
    s_out.Phrase,
    {
        'id': string
    }
> = ($, $p) => sh.ph.composed([
    sh.ph.text("Error serializing schema for module '"),
    sh.ph.text($p.id),
    sh.ph.text("': "),
    p_.from.state($).decide(
        ($) => {
            switch ($[0]) {
                case 'resolving': return p_.option($, ($) => sh.ph.composed([
                    sh.ph.text(
                        ser_location.Range(
                            $.location,
                            {
                                'character location reporting': ['one based', null]
                            }
                        )
                    ),
                    sh.ph.text(": "),
                    sh.ph.text(
                        ser_resolving.Error(
                            $,
                        )
                    )
                ]))
                case 'error writing file': return p_.option($, ($) => sh.ph.text(ser_write_file.Error($)))
                default: return p_.exhaustive($[0])
            }
        })
])