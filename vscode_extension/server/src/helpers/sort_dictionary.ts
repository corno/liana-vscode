import p_list_from_text from "pareto-core/refiner/specials/list_from_text"
import create_refinement_context from "pareto-core/__internal/sync/create_refinement_context"

import type * as s_parse_tree from "astn-runtime/modules/deserialization/schemas/parse_tree/schema"
import type * as s_token from "astn-runtime/modules/deserialization/schemas/token/schema"

import * as r_parse_tree from "pareto-liana/temp/astn_document"

export type Text_Replacement = { readonly 'start': number, readonly 'end': number, readonly 'text': string }

export type Find_Dictionary_Result =
	| readonly ['found', Located_Dictionary]
	| readonly ['no dictionary', null]
	| readonly ['parse error', null]

type Dictionary = {
	readonly 'open': s_parse_tree.Structural_Token
	readonly 'entries': s_parse_tree.ID_Value_Pair[]
	readonly 'close': s_parse_tree.Structural_Token
}

type Token = s_parse_tree.Structural_Token | s_parse_tree.Text

const optional = <T>($: { __get_raw(): readonly T[] | null }): T | undefined => {
	const raw = $.__get_raw()
	return raw === null ? undefined : raw[0]
}

const last_token_of_value = ($: s_parse_tree.Value): Token => {
	const type = $['type']
	switch (type[0]) {
		case 'include': return type[1]['path']
		case 'missing': return type[1]['#']
		case 'concrete': {
			const concrete = type[1]
			switch (concrete[0]) {
				case 'dictionary': return concrete[1]['}']
				case 'group': return concrete[1][0] === 'concise' ? concrete[1][1]['>'] : concrete[1][1][')']
				case 'list': return concrete[1][']']
				case 'nothing': return concrete[1]['~']
				case 'optional': return concrete[1][0] === 'set' ? last_token_of_value(concrete[1][1]['value']) : concrete[1][1]['_']
				case 'state': {
					const status = concrete[1]['status']
					return status[0] === 'set' ? last_token_of_value(status[1]['value']) : status[1]['#']
				}
				case 'text': return concrete[1]
			}
		}
	}
}

const last_token_of_entry = ($: s_parse_tree.ID_Value_Pair): Token => {
	const assignment = optional($['assignment'])
	if (assignment === undefined) return $['id']
	const value = optional(assignment['value'])
	return value === undefined ? assignment[':'] : last_token_of_value(value)
}

type Dictionary_Node = Dictionary & { readonly 'children': Dictionary_Node[] }

/**
 * Collects the dictionaries in the value; dictionaries nested inside a dictionary become its children.
 */
const collect_dictionaries = ($: s_parse_tree.Value, into: Dictionary_Node[]): void => {
	const values_of_pairs = ($: s_parse_tree.ID_Value_Pairs, into: Dictionary_Node[]) => $.__get_raw().forEach(($) => {
		const value = optional(optional($['assignment'])?.['value'] ?? { __get_raw: () => null })
		if (value !== undefined) collect_dictionaries(value, into)
	})
	const values_of_items = ($: s_parse_tree.Items) => $.__get_raw().forEach(($) => collect_dictionaries($['value'], into))
	const type = $['type']
	if (type[0] !== 'concrete') return
	const concrete = type[1]
	switch (concrete[0]) {
		case 'dictionary': {
			const $ = concrete[1]
			const node: Dictionary_Node = { 'open': $['{'], 'entries': [...$['entries'].__get_raw()], 'close': $['}'], 'children': [] }
			values_of_pairs($['entries'], node['children'])
			into.push(node)
			return
		}
		case 'group': {
			if (concrete[1][0] === 'verbose') values_of_pairs(concrete[1][1]['properties'], into)
			else values_of_items(concrete[1][1]['properties'])
			return
		}
		case 'list': return values_of_items(concrete[1]['items'])
		case 'optional': {
			if (concrete[1][0] === 'set') collect_dictionaries(concrete[1][1]['value'], into)
			return
		}
		case 'state': {
			const status = concrete[1]['status']
			if (status[0] === 'set') collect_dictionaries(status[1]['value'], into)
			return
		}
		case 'nothing':
		case 'text':
			return
	}
}

type Comment_Span = { readonly 'start': number, readonly 'end': number, readonly 'on own line': boolean, readonly 'is line comment': boolean }

const comment_spans = ($: s_token.Trivia): Comment_Span[] => {
	const whitespace = ($: s_token.Whitespace) => optional($)?.['value'] ?? ""
	let whitespace_before = whitespace($['leading whitespace'])
	return $['comments'].__get_raw().map(($) => {
		const result = {
			'start': $['range']['start']['absolute'],
			'end': $['range']['end']['absolute'],
			'on own line': whitespace_before.includes("\n"),
			'is line comment': $['type'][0] === 'line',
		}
		whitespace_before = whitespace($['trailing whitespace'])
		return result
	})
}

/**
 * Splits the trivia after a token: comments on the same line as the token stay with it,
 * the first comment on its own line and everything after it belong to the next entry.
 */
const split_trivia = (token: Token): { readonly 'token end': number, readonly 'ends with line comment': boolean, readonly 'next start': number | undefined } => {
	let token_end = token['range']['end']['absolute']
	let ends_with_line_comment = false
	for (const comment of comment_spans(token['trailing trivia'])) {
		if (comment['on own line']) return { 'token end': token_end, 'ends with line comment': ends_with_line_comment, 'next start': comment['start'] }
		token_end = comment['end']
		ends_with_line_comment = comment['is line comment']
	}
	return { 'token end': token_end, 'ends with line comment': ends_with_line_comment, 'next start': undefined }
}

export type Dictionary_Entry = {
	readonly 'id': string
	/** the range of the entry itself, without the comments that move with it */
	readonly 'id start': number
	readonly 'end': number
}

export type Located_Dictionary = {
	readonly 'entries': Dictionary_Entry[]
	/** the text of every entry including the comments that move with it */
	readonly 'chunks': string[]
	readonly 'chunk starts': number[]
	readonly 'chunk ends': number[]
	readonly 'chunk ends with line comment': boolean[]
	readonly 'open start': number
	readonly 'close end': number
	/** the dictionaries nested in the entries, not inside another nested dictionary */
	readonly 'children': Located_Dictionary[]
}

const locate = (text: string, dictionary: Dictionary_Node): Located_Dictionary => {
	const starts: number[] = []
	const ends: number[] = []
	const ends_with_line_comment: boolean[] = []
	let previous = split_trivia(dictionary.open)
	dictionary.entries.forEach(($) => {
		starts.push(previous['next start'] ?? $['id']['range']['start']['absolute'])
		previous = split_trivia(last_token_of_entry($))
		ends.push(previous['token end'])
		ends_with_line_comment.push(previous['ends with line comment'])
	})
	return {
		'entries': dictionary.entries.map(($) => ({
			'id': $['id']['token']['value'],
			'id start': $['id']['range']['start']['absolute'],
			'end': last_token_of_entry($)['range']['end']['absolute'],
		})),
		'chunks': starts.map((start, index) => text.slice(start, ends[index])),
		'chunk starts': starts,
		'chunk ends': ends,
		'chunk ends with line comment': ends_with_line_comment,
		'open start': dictionary.open['range']['start']['absolute'],
		'close end': dictionary.close['range']['end']['absolute'],
		'children': dictionary.children.map(($) => locate(text, $)),
	}
}

/**
 * The outermost dictionaries of the document, or undefined when the document cannot be parsed.
 * Offsets are UTF-16 offsets, like the parse tree's absolute locations.
 */
const parse_dictionaries = (text: string): Located_Dictionary[] | undefined => {
	let result: Located_Dictionary[] | undefined
	create_refinement_context(
		(abort) => r_parse_tree.Document(p_list_from_text(text, ($) => $), abort, { 'tab size': 1 })
	).__extract_data(
		($) => {
			const roots: Dictionary_Node[] = []
			const header = optional($['header'])
			if (header !== undefined) collect_dictionaries(header['value'], roots)
			collect_dictionaries($['content'], roots)
			result = roots.map(($) => locate(text, $))
		},
		() => { },
	)
	return result
}

const innermost_at = (dictionaries: Located_Dictionary[], offset: number): Located_Dictionary | undefined => {
	const around = dictionaries.find(($) => $['open start'] <= offset && offset <= $['close end'])
	return around === undefined ? undefined : innermost_at(around['children'], offset) ?? around
}

/**
 * Finds the innermost dictionary around the offset.
 * Each entry moves together with the comments on the lines above it and the comments behind it on its last line.
 */
export const find_dictionary_at = (text: string, offset: number): Find_Dictionary_Result => {
	const dictionaries = parse_dictionaries(text)
	if (dictionaries === undefined) return ['parse error', null]
	const found = innermost_at(dictionaries, offset)
	return found === undefined ? ['no dictionary', null] : ['found', found]
}

export type Sort_Scope = 'shallow' | 'deep'

/**
 * 'shallow': the innermost dictionary around the offset.
 * 'deep': that dictionary including the dictionaries nested in it, or all dictionaries of the document when the offset is not in a dictionary.
 * The result contains the outermost dictionaries to sort; for 'deep' their children are sorted as well.
 */
export const find_dictionaries = (text: string, offset: number, scope: Sort_Scope):
	| readonly ['found', Located_Dictionary[]]
	| readonly ['no dictionary', null]
	| readonly ['parse error', null] => {
	const dictionaries = parse_dictionaries(text)
	if (dictionaries === undefined) return ['parse error', null]
	const found = innermost_at(dictionaries, offset)
	if (found !== undefined) return ['found', [found]]
	return scope === 'deep' && dictionaries.length > 0 ? ['found', dictionaries] : ['no dictionary', null]
}

/**
 * The dictionary and the dictionaries nested in it, innermost first.
 */
export const all_dictionaries = ($: Located_Dictionary): Located_Dictionary[] => [...$['children'].flatMap(all_dictionaries), $]

/**
 * Entries with the same id keep their current order.
 */
export const alphabetical_order = ($: Located_Dictionary): number[] =>
	$['entries']
		.map(($, index) => ({ 'id': $['id'], 'index': index }))
		.sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : a.index - b.index)
		.map(($) => $.index)

/**
 * Orders the entries so that every entry comes after the entries it depends on.
 * Among the entries whose dependencies are all placed, the first one by id ('alphabetical') or by current position ('current') goes next,
 * so 'current' keeps an order that is already topological unchanged.
 * Should the dependencies contain a cycle, the entries in it are placed in the tie-break order.
 */
export const topological_order = (
	$: Located_Dictionary,
	dependencies: ReadonlySet<number>[],
	tie_break: 'alphabetical' | 'current',
): number[] => {
	const rank: number[] = []
	; (tie_break === 'alphabetical' ? alphabetical_order($) : $['entries'].map((_, index) => index)).forEach((entry, position) => { rank[entry] = position })
	const placed = new Set<number>()
	const result: number[] = []
	const by_rank = $['entries'].map((_, index) => index).sort((a, b) => rank[a] - rank[b])
	while (result.length < by_rank.length) {
		const next = by_rank.find((entry) => !placed.has(entry) && [...dependencies[entry]].every((dependency) => placed.has(dependency) || dependency === entry))
			?? by_rank.find((entry) => !placed.has(entry))!
		placed.add(next)
		result.push(next)
	}
	return result
}

/**
 * Rewrites the dictionary in the given order of its entries; the whitespace between the entries stays in place.
 * Returns undefined when the order is the current order.
 */
export const arrange = (text: string, $: Located_Dictionary, order: number[]): Text_Replacement | undefined =>
	order.every((entry, index) => entry === index) ? undefined : rearrange(text, $, order, $['chunks'])

const rearrange = (text: string, $: Located_Dictionary, order: number[], chunks: string[]): Text_Replacement => {
	const starts = $['chunk starts']
	const ends = $['chunk ends']
	const separators = starts.slice(1).map((start, index) => text.slice(ends[index], start))
	const line_indentation = (offset: number) => {
		const before = text.slice(0, offset)
		return /^[ \t]*/.exec(before.slice(before.lastIndexOf("\n") + 1))![0]
	}
	const indentation = line_indentation(starts[0])
	let result = ""
	order.forEach((entry, index) => {
		result += chunks[entry]
		if (index < separators.length) {
			const separator = separators[index]
			// A line comment would swallow the next entry if the separator does not start a new line.
			result += $['chunk ends with line comment'][entry] && !separator.includes("\n") ? "\n" + indentation : separator
		}
	})
	const end = ends[ends.length - 1]
	if ($['chunk ends with line comment'][order[order.length - 1]] && !/^[ \t]*(\r?\n|$)/.test(text.slice(end))) {
		// The same for the token after the last entry, usually '}'.
		result += "\n" + line_indentation($['open start'])
	}
	return { 'start': starts[0], 'end': end, 'text': result }
}

/**
 * Rewrites the dictionary and the dictionaries nested in it, each in the order given for it.
 * Returns undefined when nothing changes.
 */
export const arrange_deep = (text: string, $: Located_Dictionary, order_of: ($: Located_Dictionary) => number[]): Text_Replacement | undefined => {
	const nested = $['children'].map(($) => arrange_deep(text, $, order_of)).filter(($) => $ !== undefined)
	const order = order_of($)
	if (nested.length === 0) return arrange(text, $, order)
	const chunks = $['chunks'].map((chunk, index) => {
		const start = $['chunk starts'][index]
		const end = $['chunk ends'][index]
		let result = ""
		let position = start
		nested.filter(($) => start <= $['start'] && $['end'] <= end).forEach(($) => {
			result += text.slice(position, $['start']) + $['text']
			position = $['end']
		})
		return result + text.slice(position, end)
	})
	return rearrange(text, $, order, chunks)
}
