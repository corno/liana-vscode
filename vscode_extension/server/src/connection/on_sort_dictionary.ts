import * as vscode_node from 'vscode-languageserver/node'
import { Connection_Context } from '../connection_context'
import { reference_document } from '../helpers/reference_document'
import { alphabetical_order, all_dictionaries, arrange_deep, arrange, find_dictionaries, Located_Dictionary, Sort_Scope, topological_order } from '../helpers/sort_dictionary'

export type Sort_Dictionary_Params = {
	readonly 'uri': string
	readonly 'position': vscode_node.Position
	/** defaults to 'shallow' */
	readonly 'scope'?: Sort_Scope
}

export type Sort_Order = 'alphabetical' | 'topological' | 'topological only'

export type Sort_Dictionary_Response =
	| {
		readonly 'status': 'found'
		/** 'unknown' when the document could not be resolved, so the dependencies between the entries are not known */
		readonly 'dependencies': 'none' | 'present' | 'unknown'
		/** the number of dictionaries that are sorted */
		readonly 'dictionaries': number
		/** the number of those dictionaries in which entries depend on each other */
		readonly 'with dependencies': number
		/**
		 * null when the dictionaries are already in that order; the topological orders are only present when there are dependencies.
		 * The topological orders apply to the dictionaries with dependencies, the other dictionaries are sorted alphabetically.
		 */
		readonly 'orders': { readonly [order in Sort_Order]?: vscode_node.TextEdit[] | null }
	}
	| { readonly 'status': 'no dictionary' | 'parse error' | 'document not found' }

type Loaded = NonNullable<Awaited<ReturnType<typeof reference_document>>>

/**
 * An entry depends on a sibling when it contains an acyclic reference to it.
 * Cyclic references are ignored: they may point to entries that depend on the referencing entry.
 * A dictionary whose entries are not declarations in the resolved document cannot be referenced, so it has no dependencies.
 */
const create_dependencies_of = (loaded: Loaded): ($: Located_Dictionary) => Set<number>[] => {
	const declaration_by_start = new Map(loaded.index.symbols.map(($) => [$.declaration.range.start.absolute, $.declaration]))
	const references_by_dictionary = new Map<unknown, { 'source': number, 'target': number }[]>()
	loaded.index.references.forEach(({ reference, symbol }) => {
		if (reference.cyclic || symbol === undefined) return
		const dictionary = symbol.declaration.dictionary
		const references = references_by_dictionary.get(dictionary) ?? []
		references.push({ 'source': reference.range.start.absolute, 'target': symbol.declaration.range.start.absolute })
		references_by_dictionary.set(dictionary, references)
	})
	return ($) => {
		const dependencies = $['entries'].map(() => new Set<number>())
		const declaration = $['entries'].map((entry) => declaration_by_start.get(entry['id start'])).find(($) => $ !== undefined)
		if (declaration === undefined) return dependencies
		const entry_by_id_start = new Map($['entries'].map((entry, index) => [entry['id start'], index]))
		references_by_dictionary.get(declaration.dictionary)?.forEach(({ source: offset, target: target_start }) => {
			const target = entry_by_id_start.get(target_start)
			const source = $['entries'].findIndex((entry) => entry['id start'] <= offset && offset < entry['end'])
			if (target !== undefined && source !== -1 && source !== target) dependencies[source].add(target)
		})
		return dependencies
	}
}

export const create_on_sort_dictionary: (
	connection_context: Connection_Context,
) => vscode_node.RequestHandler<Sort_Dictionary_Params, Sort_Dictionary_Response, void> = (connection_context) => {
	return async (params) => {
		const document = connection_context.documents.get(params.uri)
		if (document === undefined) return { 'status': 'document not found' }
		const text = document.getText()
		const scope = params.scope ?? 'shallow'
		const found = find_dictionaries(text, document.offsetAt(params.position), scope)
		if (found[0] !== 'found') return { 'status': found[0] }
		const roots = found[1]
		const dictionaries = scope === 'deep' ? roots.flatMap(all_dictionaries) : roots
		const edits = (order_of: ($: Located_Dictionary) => number[]): vscode_node.TextEdit[] | null => {
			const replacements = roots
				.map(($) => scope === 'deep' ? arrange_deep(text, $, order_of) : arrange(text, $, order_of($)))
				.filter(($) => $ !== undefined)
			return replacements.length === 0 ? null : replacements.map(($) => vscode_node.TextEdit.replace(
				vscode_node.Range.create(document.positionAt($['start']), document.positionAt($['end'])),
				$['text'],
			))
		}
		const alphabetical = edits(alphabetical_order)
		const unknown = { 'status': 'found', 'dependencies': 'unknown', 'dictionaries': dictionaries.length, 'with dependencies': 0, 'orders': { 'alphabetical': alphabetical } } as const
		const loaded = await reference_document(connection_context, { textDocument: { uri: params.uri }, position: params.position })
		if (loaded === null || document.getText() !== text) return unknown
		const dependencies_of = create_dependencies_of(loaded)
		const dependencies = new Map(dictionaries.map(($) => [$, dependencies_of($)]))
		const with_dependencies = dictionaries.filter(($) => dependencies.get($)!.some(($) => $.size > 0))
		if (with_dependencies.length === 0) return { ...unknown, 'dependencies': 'none' }
		const topological = (tie_break: 'alphabetical' | 'current') => ($: Located_Dictionary) => {
			const $dependencies = dependencies.get($)
			return $dependencies === undefined || $dependencies.every(($) => $.size === 0) ? alphabetical_order($) : topological_order($, $dependencies, tie_break)
		}
		return {
			'status': 'found',
			'dependencies': 'present',
			'dictionaries': dictionaries.length,
			'with dependencies': with_dependencies.length,
			'orders': {
				'alphabetical': alphabetical,
				'topological': edits(topological('alphabetical')),
				'topological only': edits(topological('current')),
			},
		}
	}
}
