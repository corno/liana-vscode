import * as p from 'pareto-core/transformer'
import type * as p_ from 'pareto-core/transformer'

import type * as s_source from './schemas/astn_document.js'
import type * as s_target from 'astn-runtime/modules/serialization/schemas/sealed_target/schema'

export const Value: p_.Transformer<
    s_source.Value,
    s_target.Value
> = ($) => p.from.state($.type).decide(
    ($s): s_target.Value => {
        switch ($s[0]) {
            case 'dictionary': return p.option($s, ($) => ['dictionary', p.from.dictionary($.entries).map(Value)])
            case 'group': return p.option($s, ($) => ['group', ['verbose', p.from.dictionary($.properties).map(Value)]])
            case 'list': return p.option($s, ($) => ['list', p.from.list($.items).map(Value)])
            case 'nothing': return p.option($s, ($) => ['nothing', null])
            case 'optional': return p.option($s, ($) => p.from.optional($).decide(
                ($): s_target.Value => ['optional', ['set', Value($)]],
                (): s_target.Value => ['optional', ['not set', null]],
            ))
            case 'reference': return p.option($s, ($) => ['reference', {
                'value': $,
            }])
            case 'state': return p.option($s, ($) => ['state', {
                'option': $.option,
                'value': Value($.value),
            }])
            case 'text': return p.option($s, ($) => ['text', {
                'value': $,
                'delimiter': ['quote', null],
            }])
            default: return p.exhaustive($s[0])
        }
    },
)
