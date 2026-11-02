import * as p_ from 'pareto-core/refiner'
import iterate from 'pareto-core/refiner/specials/iterate'

import type * as s_document from "astn-runtime/modules/deserialization/schemas/parse_tree/schema"
import type * as s_characters from "astn-runtime/modules/deserialization/schemas/list_of_characters/schema"
import type * as s_deserialization from "astn-runtime/modules/deserialization/schemas/parse_tree_deserialization/schema"

import * as r_characters from "astn-runtime/modules/deserialization/schemas/annotated_characters/refiners/list_of_characters"
import * as r_tokens from "astn-runtime/modules/deserialization/schemas/token/refiners/annotated_character"
import * as r_value from "astn-runtime/modules/deserialization/schemas/parse_tree/refiners/tokenizer_result"

export const Document: p_.Refiner_With_Parameter<
    s_document.Document,
    s_deserialization.Error,
    s_characters.List_Of_Characters,
    s_deserialization.Parameters
> = ($, abort, $p) => {
    const characters = r_characters.Annotated_Characters($, $p)
    const tokens = iterate({
        list: characters.characters,
        end_info: characters.end,
        assign: (iterator) => r_tokens.Tokenizer_Result(
            iterator,
            ($) => abort({ 'type': ['lexer', $] }),
            { 'end info': characters.end },
        ),
        on_dangling_item: null,
    })
    return iterate({
        list: tokens.tokens,
        end_info: tokens.end,
        assign: (iterator): s_document.Document => ({
            // Consume "!" once; the runtime's Document parser consumes the next token too.
            'header': iterator.peek(
                () => p_.literal.not_set(),
                ($) => $['type'][0] === '!'
                    ? p_.literal.set({
                        '!': r_value.Guaranteed_Structural_Token(
                            iterator,
                            ($) => abort({ 'type': ['parser', $] }),
                            { 'token': $ },
                        ),
                        'value': r_value.Value(iterator, ($) => abort({ 'type': ['parser', $] })),
                    })
                    : p_.literal.not_set(),
            ),
            'content': r_value.Value(iterator, ($) => abort({ 'type': ['parser', $] })),
        }),
        on_dangling_item: null,
    })
}
