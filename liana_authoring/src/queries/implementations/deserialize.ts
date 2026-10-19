import * as p_ from 'pareto-core/query'
import * as p_r from 'pareto-core/refiner'
import * as p_t from 'pareto-core/transformer'
import p_list_from_text from 'pareto-core/refiner/specials/list_from_text'
import * as p_temp_dictionary from 'pareto-core/temp/Generic_Dictionary'
import * as p_select_lookup from 'pareto-core/transformer/specials/lookup'

import type * as query_interfaces from "../interfaces.js"

//schemas
import * as d from "../../schemas/deserialization/schema.js"

//depencencies
import * as r_unmarshall_result_from_loc from "../../schemas/unmarshall_result/refiners/list_of_characters.js"
import * as r_resolve_result_from_unmarshall_result from "../../schemas/unmarshall_result/transformers/resolve_result.js"

export const $$: p_.Query_Implementation<
    query_interfaces.deserialize,
    null,
    {
        'get schema': query_interfaces.get_schema
        'get schema path': query_interfaces.get_schema_path
    }
> = p_.query(
    (e, $s, $q, $d) => e.query(
        ($d) => $q['get schema path'](
            {
                'context path': $d['file path'].context,
            },
            ($): d.Error => ['schema path', $]
        )
    ).query(
        ($v) => $q['get schema'](
            {
                'schema path': $v,
                'tab size': $d.deprecated['tab size'],
            },
            ($): d.Error => ['schema', {
                'error': $,
                'schema path': $v,
            }]
        )
    ).refine(
        ($v, abort) => p_r.from.state($v).decide(
            ($) => {
                switch ($[0]) {
                    case 'constrained': return p_r.option($, ($): d.Result => {
                        const specification = $
                        const root_resolver = specification['root resolver']
                        const unmarshalled = r_unmarshall_result_from_loc.Document(
                            p_list_from_text(
                                $d.deprecated.content,
                                ($) => $
                            ),
                            ($) => abort(['deserialize parse tree', $]),
                            {
                                'type': $['root type'].entry,
                                'tab size': $d.deprecated['tab size'],
                            }
                        )
                        return ['constrained', r_resolve_result_from_unmarshall_result.Document(
                            unmarshalled,
                            {
                                'parameters': {
                                    'acyclic': p_temp_dictionary.map_value_dictionary_to_generic_dictionary(
                                        p_t.from.dictionary(root_resolver.signature['resolved parameters'].lookups).filter(
                                            ($) => $.type[0] === 'acyclic'
                                        ),
                                        ($) => ['not found because of root', null]
                                    ),
                                    'cyclic': p_temp_dictionary.map_value_dictionary_to_generic_dictionary(
                                        p_t.from.dictionary(root_resolver.signature['resolved parameters'].lookups).filter(
                                            ($) => $.type[0] === 'cyclic'
                                        ),
                                        ($) => ['not found because of root', null]
                                    ),
                                },
                                'siblings': {
                                    'acyclic': p_select_lookup.acyclic.not_set(),
                                    'cyclic': p_select_lookup.cyclic.not_set()
                                },
                            },
                            {
                                'definition': root_resolver,
                                'resolvers': specification.resolver,
                                'type parameters': p_t.from.dictionary(root_resolver.signature['resolved parameters'].types).map(
                                    ($) => ['not found because of root', null],
                                )
                            },
                        )]
                    })
                    default: return p_r.exhaustive($[0])
                }
            })
    )
)
