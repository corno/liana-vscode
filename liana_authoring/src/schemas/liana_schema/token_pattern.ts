import * as p from 'pareto-core/transformer'
import * as serialize from 'pareto-core/serializer'
import p_unreachable_code_path from 'pareto-core/transformer/specials/unreachable_code_path'
import type * as schema from './schema.js'

declare const RegExp: new (pattern: string, flags: string) => { test(value: string): boolean }

const escape = (value: string): string => p.from.text(value).escape(p.literal.list([
    { character: 92, emit: '\\\\' },
    { character: 46, emit: '\\.' },
    { character: 94, emit: '\\^' },
    { character: 36, emit: '\\$' },
    { character: 42, emit: '\\*' },
    { character: 43, emit: '\\+' },
    { character: 63, emit: '\\?' },
    { character: 40, emit: '\\(' },
    { character: 41, emit: '\\)' },
    { character: 91, emit: '\\[' },
    { character: 93, emit: '\\]' },
    { character: 123, emit: '\\{' },
    { character: 125, emit: '\\}' },
    { character: 45, emit: '\\x2d' },
]), {
    invalid_character: () => p_unreachable_code_path('invalid regular-expression escape character'),
    duplicate_character: () => p_unreachable_code_path('duplicate regular-expression escape character'),
})

const pattern = (expression: schema.namespaces.structure.types.Regular_Expression): string => {
    switch (expression[0]) {
        case 'any character': return '[\\s\\S]'
        case 'literal': return escape(expression[1])
        case 'character set': return '[' + escape(expression[1]) + ']'
        case 'sequence': return serialize.ph.list(p.from.list(expression[1]).map(pattern))
        case 'choice': return '(?:' + serialize.ph.list(p.from.list(expression[1]).map(
            item => '(?:' + pattern(item) + ')|')) + '(?!))'
        case 'repetition': return '(?:' + pattern(expression[1].expression) + ')'
            + (expression[1].quantity[0] === 'optional' ? '?' : expression[1].quantity[0] === 'zero or more' ? '*' : '+')
        default: return p.exhaustive(expression[0])
    }
}

export const matches_token = (type: schema.namespaces.structure.types.Basic_Type, value: string): boolean =>
    p.from.optional(type['regular expression']).decide(
        expression => new RegExp('^(?:' + pattern(expression) + ')(?![\\s\\S])', 'u').test(value),
        () => true)
