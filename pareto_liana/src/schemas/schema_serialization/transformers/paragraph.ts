import * as p_ from 'pareto-core/transformer'

import * as s_in from "../schema.js"
import * as s_out from "pareto-fountain-pen/modules/paragraph/schemas/paragraph/schema"


//shorthands
import * as sh from "pareto-fountain-pen/modules/paragraph/schemas/paragraph/shorthands/deprecated"

//dependencies
import * as ser_write_file from "pareto-filesystem-unrestricted-api/modules/unrestricted/schemas/write_file/serializers"

export const Error: p_.Transformer_With_Parameter<
    s_in.Error,
    s_out.Phrase,
    {
        'id': string
    }
> = ($, $p) => sh.ph.composed([
    sh.ph.text("Error serializing schema for type '"),
    sh.ph.text($p.id),
    sh.ph.text("': "),
    p_.from.state($).decide(
        ($) => {
            switch ($[0]) {
                case 'resolving': return p_.option($, ($) => p_.from.state($.type).decide(($) => {
                    switch ($[0]) {
                        case 'lookup': return p_.option($, ($) => p_.from.state($).decide(($) => {
                            switch ($[0]) {
                                case 'no such entry': return p_.option($, ($) => sh.ph.text("No such entry: " + $))
                                case 'cycle detected': return p_.option($, ($) => sh.ph.text("Cycle detected"))
                                case 'no context lookup': return p_.option($, ($) => sh.ph.text("No context lookup"))
                                default: return p_.exhaustive($[0])
                            }
                        }))
                        case 'constraint': return p_.option($, ($) => p_.from.state($).decide(($) => {
                            switch ($[0]) {
                                case 'state': return p_.option($, ($) => sh.ph.text("Expected '" + $.expected + "', found '" + $.found + "'"))
                                case 'optional value is not set': return p_.option($, ($) => sh.ph.text("Optional value is not set"))
                                case 'same node': return p_.option($, ($) => sh.ph.text("Expected the same node: " + $))
                                default: return p_.exhaustive($[0])
                            }
                        }))
                        case 'missing required entries': return p_.option($, ($) => sh.ph.composed([
                            sh.ph.text("Missing required entries: "),
                            sh.ph.composed(p_.from.dictionary($).convert_to_list(($, id) => sh.ph.text(id + " "))),
                        ]))
                        default: return p_.exhaustive($[0])
                    }
                }))
                case 'error writing file': return p_.option($, ($) => sh.ph.text(ser_write_file.Error($)))
                default: return p_.exhaustive($[0])
            }
        })
])