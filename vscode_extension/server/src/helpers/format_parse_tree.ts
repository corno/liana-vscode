import type * as s_parse_tree from "astn-runtime/modules/deserialization/schemas/parse_tree/schema"
import type * as s_token from "astn-runtime/modules/deserialization/schemas/token/schema"
import * as ser_primitives from "astn-runtime/modules/serialization/schemas/primitives/serializers"

import { optional_value_to_possibly_undefined } from './pareto_optional_value'

// Renders a parse tree with the same layout as astn's authoring_target paragraph renderer, but keeps
// all comments. That renderer cannot be used for this: its trivia output is unimplemented and its
// input schema has no place for comments after ids, ':', state options and include paths.

type Part =
	| readonly ['text', string, { readonly 'on new line': New_Line_Indentation }]
	| readonly ['space']
	| readonly ['break']
	| readonly ['block', Sentence[]]
type Sentence = Part[]

/**
 * The indentation for text that has to start a new line because a line comment or an own-line comment precedes it.
 * 'sentence': the indentation of the sentence (own-line comments)
 * 'continuation': one level deeper than the sentence (tokens that continue the sentence)
 * 'same': the indentation of the previous line (closing tokens)
 */
type New_Line_Indentation = 'sentence' | 'continuation' | 'same'

type Comment = {
	readonly 'text': string
	readonly 'is line comment': boolean
	readonly 'on own line': boolean
}

const comment_text = ($: ReturnType<s_token.Trivia['comments']['__get_raw']>[number]): string =>
	$['type'][0] === 'line'
		? `//${$['content']}`
		: `/*${$['content']}*/`

const whitespace_value = ($: s_token.Whitespace): string =>
	optional_value_to_possibly_undefined($, ($) => $['value']) ?? ""

const comments_of = ($: s_token.Trivia): Comment[] => {
	let whitespace_before = whitespace_value($['leading whitespace'])
	return $['comments'].__get_raw().map(($) => {
		const result: Comment = {
			'text': comment_text($),
			'is line comment': $['type'][0] === 'line',
			'on own line': whitespace_before.includes("\n"),
		}
		whitespace_before = whitespace_value($['trailing whitespace'])
		return result
	})
}

const add_comment = (parts: Part[], $: Comment) => {
	parts.push($['on own line'] ? ['break'] : ['space'])
	parts.push(['text', $['text'], { 'on new line': $['on own line'] ? 'sentence' : 'continuation' }])
	if ($['is line comment']) {
		parts.push(['break'])
	}
}

const trailing_comments = (parts: Part[], $: s_token.Trivia) => {
	comments_of($).forEach(($) => add_comment(parts, $))
}

const token = (parts: Part[], text: string, $: s_parse_tree.Structural_Token | s_parse_tree.Text, on_new_line: New_Line_Indentation = 'continuation') => {
	parts.push(['text', text, { 'on new line': on_new_line }])
	trailing_comments(parts, $['trailing trivia'])
}

/**
 * Comments on the same line as an opening token stay on that line,
 * comments on their own line become the first sentences of the indented block.
 */
const opening_token = (parts: Part[], text: string, $: s_parse_tree.Structural_Token): Sentence[] => {
	parts.push(['text', text, { 'on new line': 'continuation' }])
	const block_sentences: Sentence[] = []
	comments_of($['trailing trivia']).forEach(($) => {
		if ($['on own line'] || block_sentences.length > 0) {
			if ($['on own line']) {
				block_sentences.push([['text', $['text'], { 'on new line': 'sentence' }]])
			} else {
				const last = block_sentences[block_sentences.length - 1]
				add_comment(last, $)
			}
		} else {
			add_comment(parts, $)
		}
	})
	return block_sentences
}

const id_value_pairs = (
	parts: Part[],
	open: string,
	open_token: s_parse_tree.Structural_Token,
	$: s_parse_tree.ID_Value_Pairs,
	serialize_id: (id: string) => string,
	close: string,
	close_token: s_parse_tree.Structural_Token,
) => {
	const sentences = opening_token(parts, open, open_token)
	$.__get_raw().forEach(($) => {
		const entry: Sentence = []
		token(entry, serialize_id($['id']['token']['value']), $['id'])
		// An entry without ':' stays without one; adding it would make the next entry its value.
		optional_value_to_possibly_undefined($['assignment'], ($) => {
			token(entry, ":", $[':'])
			entry.push(['space'])
			optional_value_to_possibly_undefined($['value'], ($) => value(entry, $))
		})
		sentences.push(entry)
	})
	parts.push(['block', sentences])
	token(parts, close, close_token, 'same')
}

const items = (
	parts: Part[],
	open: string,
	open_token: s_parse_tree.Structural_Token,
	$: s_parse_tree.Items,
	close: string,
	close_token: s_parse_tree.Structural_Token,
) => {
	const sentences = opening_token(parts, open, open_token)
	$.__get_raw().forEach(($) => {
		const item: Sentence = []
		value(item, $['value'])
		sentences.push(item)
	})
	parts.push(['block', sentences])
	token(parts, close, close_token, 'same')
}

const value = (parts: Part[], $: s_parse_tree.Value): void => {
	const type = $['type']
	switch (type[0]) {
		case 'include': {
			const $ = type[1]
			token(parts, "@", $['@'])
			parts.push(['space'])
			token(parts, ser_primitives.Quoted($['path']['token']['value'], { 'add delimiters': true }), $['path'])
			return
		}
		case 'missing': {
			token(parts, "#", type[1]['#'])
			return
		}
		case 'concrete': {
			const concrete = type[1]
			switch (concrete[0]) {
				case 'dictionary': {
					const $ = concrete[1]
					id_value_pairs(parts, "{", $['{'], $['entries'], ($) => ser_primitives.Apostrophed($, { 'add delimiters': true }), "}", $['}'])
					return
				}
				case 'group': {
					const group = concrete[1]
					switch (group[0]) {
						case 'concise': {
							const $ = group[1]
							token(parts, "<", $['<'])
							$['properties'].__get_raw().forEach(($) => {
								parts.push(['space'])
								value(parts, $['value'])
							})
							parts.push(['space'])
							token(parts, ">", $['>'], 'same')
							return
						}
						case 'verbose': {
							const $ = group[1]
							id_value_pairs(parts, "(", $['('], $['properties'], ($) => ser_primitives.Backticked($, { 'add delimiters': true }), ")", $[')'])
							return
						}
						default: return assert_never(group[0])
					}
				}
				case 'list': {
					const $ = concrete[1]
					items(parts, "[", $['['], $['items'], "]", $[']'])
					return
				}
				case 'nothing': {
					token(parts, "~", concrete[1]['~'])
					return
				}
				case 'optional': {
					const optional = concrete[1]
					switch (optional[0]) {
						case 'not set': {
							token(parts, "_", optional[1]['_'])
							return
						}
						case 'set': {
							const $ = optional[1]
							token(parts, "*", $['*'])
							parts.push(['space'])
							value(parts, $['value'])
							return
						}
						default: return assert_never(optional[0])
					}
				}
				case 'state': {
					const $ = concrete[1]
					token(parts, "|", $['|'])
					parts.push(['space'])
					const status = $['status']
					switch (status[0]) {
						case 'missing': {
							token(parts, "#", status[1]['#'])
							return
						}
						case 'set': {
							const $ = status[1]
							token(parts, ser_primitives.Backticked($['option']['token']['value'], { 'add delimiters': true }), $['option'])
							parts.push(['space'])
							value(parts, $['value'])
							return
						}
						default: return assert_never(status[0])
					}
				}
				case 'text': {
					const $ = concrete[1]
					const text = $['token']['value']
					const token_type = $['token']['type']
					switch (token_type[0]) {
						case 'apostrophed': return token(parts, ser_primitives.Apostrophed(text, { 'add delimiters': true }), $)
						case 'quoted':
						case 'backticked': return token(parts, ser_primitives.Quoted(text, { 'add delimiters': true }), $)
						case 'undelimited': return token(parts, ser_primitives.Undelimited(text), $)
						default: return assert_never(token_type[0])
					}
				}
				default: return assert_never(concrete[0])
			}
		}
		default: return assert_never(type[0])
	}
}

const assert_never = ($: never): never => {
	throw new Error(`unexpected parse tree node: ${$}`)
}

/**
 * The parse tree does not contain the comments before the first token, so they are read from the text.
 */
const leading_comments = (text: string): Comment[] => {
	const result: Comment[] = []
	let position = 0
	let whitespace_before = ""
	while (position < text.length) {
		const whitespace = /^\s*/.exec(text.slice(position))![0]
		whitespace_before += whitespace
		position += whitespace.length
		if (text.startsWith("//", position)) {
			const end = text.indexOf("\n", position)
			const comment_end = end === -1 ? text.length : end
			result.push({ 'text': text.slice(position, comment_end).replace(/\r$/, ""), 'is line comment': true, 'on own line': result.length === 0 || whitespace_before.includes("\n") })
			position = comment_end
		} else if (text.startsWith("/*", position)) {
			const end = text.indexOf("*/", position + 2)
			if (end === -1) break
			result.push({ 'text': text.slice(position, end + 2), 'is line comment': false, 'on own line': result.length === 0 || whitespace_before.includes("\n") })
			position = end + 2
		} else {
			break
		}
		whitespace_before = ""
	}
	return result
}

const lines_of_sentences = (sentences: Sentence[], prefix: string, indentation: string, lines: string[]) => {
	sentences.forEach((sentence) => {
		let current_line: string | null = null
		let current_prefix = prefix
		let pending_space = false
		let pending_break = false
		let found_block = false
		sentence.forEach((part) => {
			switch (part[0]) {
				case 'text': {
					if (pending_break && current_line !== null) {
						lines.push(current_prefix + current_line)
						current_line = null
						switch (part[2]['on new line']) {
							case 'sentence': current_prefix = prefix; break
							case 'continuation': current_prefix = prefix + indentation; break
							case 'same': break
							default: assert_never(part[2]['on new line'])
						}
					} else if (pending_space && current_line !== null) {
						current_line += " "
					}
					pending_space = false
					pending_break = false
					current_line = (current_line ?? "") + part[1]
					return
				}
				case 'space': {
					pending_space = true
					return
				}
				case 'break': {
					pending_break = true
					return
				}
				case 'block': {
					const block_lines: string[] = []
					lines_of_sentences(part[1], current_prefix + indentation, indentation, block_lines)
					if (block_lines.length === 0) return
					found_block = true
					if (current_line !== null) {
						lines.push(current_prefix + current_line)
						current_line = null
					}
					lines.push(...block_lines)
					pending_space = false
					pending_break = false
					return
				}
				default: return assert_never(part[0])
			}
		})
		if (current_line !== null) {
			lines.push(current_prefix + current_line)
		} else if (!found_block) {
			lines.push(prefix)
		}
	})
}

export const format_document = (
	$: s_parse_tree.Document,
	text: string,
	indentation: string,
): string => {
	const sentences: Sentence[] = []
	leading_comments(text).forEach(($) => {
		if ($['on own line'] || sentences.length === 0) {
			sentences.push([['text', $['text'], { 'on new line': 'sentence' }]])
		} else {
			add_comment(sentences[sentences.length - 1], $)
		}
	})
	optional_value_to_possibly_undefined($['header'], ($) => {
		const header: Sentence = []
		token(header, "!", $['!'])
		header.push(['space'])
		value(header, $['value'])
		sentences.push(header)
	})
	const content: Sentence = []
	value(content, $['content'])
	sentences.push(content)
	const lines: string[] = []
	lines_of_sentences(sentences, "", indentation, lines)
	return lines.join("\n")
}
