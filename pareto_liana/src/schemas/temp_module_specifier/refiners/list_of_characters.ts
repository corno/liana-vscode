import * as p_ from 'pareto-core/refiner'
import * as p_t from 'pareto-core/transformer'
import type * as p_i from 'pareto-core/__internal/Abort'
import type * as s_unmarshalling from 'liana-runtime/modules/value_unmarshalling/schemas/unmarshalling/schema'
import type * as s_schema from '../../../modules/schema.generated/schemas/resolved/schema.js'
import type * as s_function from 'liana-runtime/modules/resolved_document_deserialization/schemas/resolved_document_deserialization/schema'
import type * as s_in from 'astn-runtime/modules/deserialization/schemas/list_of_characters/schema'
import type * as s_resolving from 'liana-runtime/modules/resolved_document_deserialization/schemas/resolving/schema'
import type * as s_out from '../schema.js'
import * as r_schema from '../../../modules/schema.generated/schemas/resolved/refiners/unresolved_manual.js'
import * as r_unresolved from '../../../modules/schema.generated/schemas/unresolved/refiners/astn_parse_tree.js'
import * as r_tree from 'astn-runtime/modules/deserialization/schemas/parse_tree/refiners/list_of_characters'
import * as v from 'liana-runtime/modules/value_unmarshalling/schemas/unmarshalled_value/refiners/astn_parse_tree'
import * as location from 'astn-runtime/modules/deserialization/schemas/parse_tree/transformers/start_token_range'
import { normalize } from './schema_selection.js'

export const Module_Specifier: p_.Refiner_With_Parameter<
    s_out.Temp_Module_Specifier,
    s_function.Error,
    s_in.List_Of_Characters,
    { 'tab size': number }
> = ($, abort, $p) => {
    const unmarshalling_error: p_i.Abort<s_unmarshalling.Error> = ($) =>
        abort(['unresolved document deserialization', ['unmarshalling', $]])
    const parsed = normalize(r_tree.Document(
        $,
        ($) => abort(['unresolved document deserialization', ['parse tree deserialization', $]]),
        { 'tab size': $p['tab size'] },
    ).content, unmarshalling_error)
    const unresolved = r_unresolved.Module_Specification(parsed, unmarshalling_error)
    const specification = r_schema.Module_Specification(
        unresolved,
        ($) => abort(['resolving', $]),
        p_.literal.nothing(),
        p_.literal.nothing(),
    )
    const resolving_error = (type: s_resolving.Error.type_, range: s_resolving.Error.location): never =>
        abort(['resolving', { type, location: range }])
    let tree = specification.schema
    p_.from.list(unresolved['schema path']['l list']).map((step) => {
        tree = p_.from.state(tree).decide(($): s_schema.Schema_Tree => {
            switch ($[0]) {
                case 'schema': return resolving_error(
                    ['constraint', ['state', { expected: 'set', found: 'schema' }]],
                    step['l location'],
                )
                case 'set': return p_.option($, ($) => p_t.from.dictionary($).get_possible_entry(
                    step['l item'],
                    ($) => $,
                    () => resolving_error(['lookup', ['no such entry', step['l item']]], step['l location']),
                ))
                default: return p_.exhaustive($[0])
            }
        })
        return null
    })
    const schema = p_.from.state(tree).decide(($): s_schema.Schema => {
        switch ($[0]) {
            case 'schema': return p_.option($, ($) => $)
            case 'set': return resolving_error(
                ['constraint', ['state', { expected: 'schema', found: 'set' }]],
                unresolved['schema path']['l location'],
            )
            default: return p_.exhaustive($[0])
        }
    })
    const group = v.Verbose_Group(parsed, unmarshalling_error, {
        'expected properties': p_.literal.dictionary({ schema: null, 'schema path': null, complexity: null }),
    })
    const complexity = v.State(v.Property(group, unmarshalling_error, { id: 'complexity' }), unmarshalling_error)
    const field = specification.complexity[0] === 'constrained' ? 'module resolver' : 'module'
    const selection = v.Property(v.Verbose_Group(complexity.value, unmarshalling_error, {
        'expected properties': specification.complexity[0] === 'constrained'
            ? p_.literal.dictionary({ 'module resolver': null })
            : p_.literal.dictionary({ module: null }),
    }), unmarshalling_error, { id: field })
    const range = location.Value(selection)
    return p_.from.state(specification.complexity).decide(($): s_out.Temp_Module_Specifier => {
        switch ($[0]) {
            case 'constrained': return p_.option($, ($) => {
                const id = $['module resolver']
                const resolver = p_.from.state(schema.complexity).decide(($): s_schema.Resolver => {
                    switch ($[0]) {
                        case 'constrained': return p_.option($, ($) => $)
                        case 'unconstrained': return resolving_error(
                            ['constraint', ['state', { expected: 'constrained', found: 'unconstrained' }]],
                            range,
                        )
                        default: return p_.exhaustive($[0])
                    }
                })
                return ['constrained', {
                    resolver,
                    'module resolver': {
                        id,
                        entry: p_t.from.dictionary(resolver.modules).get_possible_entry(
                            id, ($) => $, () => resolving_error(['lookup', ['no such entry', id]], range),
                        ),
                    },
                }]
            })
            case 'unconstrained': return p_.option($, ($) => {
                const id = $.module
                return ['unconstrained', { module: {
                    id,
                    entry: p_t.from.dictionary(schema.modules).get_possible_entry(
                        id, ($) => $, () => resolving_error(['lookup', ['no such entry', id]], range),
                    ),
                } }]
            })
            default: return p_.exhaustive($[0])
        }
    })
}
