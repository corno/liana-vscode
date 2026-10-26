import type * as resolved from 'liana-authoring/schemas/resolve_result/schema'
import type * as s_location from 'astn-runtime/modules/deserialization/schemas/location/schema'
import * as values from 'liana-authoring/schemas/resolve_result/transformers/find_value'
import type { Reference_Index, Symbol } from './reference_index'

export type Linked_Entry = {
    dictionary: resolved.Dictionary
    ranges: s_location.Range[]
}

const as_dictionary = (value: resolved.Value): resolved.Dictionary | undefined => {
    const result = value['unmarshall result']
    return result[0] === 'success' && result[1][0] === 'dictionary' ? result[1][1] : undefined
}

const benchmark_of = (dictionary: resolved.Dictionary): resolved.Dictionary | undefined => {
    const benchmark = dictionary.benchmark.__get_raw()
    if (benchmark === null) return undefined
    const selection = benchmark[0].selection
    return selection[0] === 'resolved' ? as_dictionary(selection[1]) : undefined
}

const key_range = (dictionary: resolved.Dictionary, name: string): s_location.Range | undefined => {
    const entry = dictionary.unmarshalled.derived.entries.__get_raw().find(([id]) => id === name)
    return entry === undefined || entry[1].result[0] !== 'success'
        ? undefined : entry[1].result[1].intermediate['id value pair'].id.range
}

/**
 * An entry key is shared by every dictionary that is benchmarked (densely or sparsely) against
 * the dictionary that declares it, so renaming one of them must rename all of them.
 * Starting at the symbol's dictionary, this walks up to the outermost benchmark that still has the entry,
 * then collects that entry and the same-named entries of all (transitively) dependent dictionaries,
 * together with the references to each of them.
 */
export const benchmark_linked_entries = (
    document: resolved.Document,
    index: Reference_Index,
    symbol: Symbol,
): Linked_Entry[] => {
    const name = symbol.declaration.name
    const dictionaries = values.Values(document.content).__get_raw().flatMap((value) => {
        const dictionary = as_dictionary(value)
        return dictionary === undefined ? [] : [dictionary]
    })
    const dependents = new Map<resolved.Dictionary, resolved.Dictionary[]>()
    for (const dictionary of dictionaries) {
        const benchmark = benchmark_of(dictionary)
        if (benchmark === undefined || benchmark === dictionary) continue
        dependents.set(benchmark, [...dependents.get(benchmark) ?? [], dictionary])
    }
    let root = symbol.declaration.dictionary
    for (const visited = new Set([root]); ;) {
        const benchmark = benchmark_of(root)
        if (benchmark === undefined || visited.has(benchmark) || key_range(benchmark, name) === undefined) break
        visited.add(benchmark)
        root = benchmark
    }
    const result: Linked_Entry[] = []
    const visited = new Set<resolved.Dictionary>()
    const pending = [root]
    while (pending.length > 0) {
        const dictionary = pending.shift()!
        if (visited.has(dictionary)) continue
        visited.add(dictionary)
        const range = key_range(dictionary, name)
        if (range === undefined) continue
        const linked = index.symbols.find(({ declaration }) => declaration.dictionary === dictionary && declaration.name === name)
        result.push({ dictionary, ranges: [range, ...linked?.references.map((reference) => reference.range) ?? []] })
        pending.push(...dependents.get(dictionary) ?? [])
    }
    return result
}
