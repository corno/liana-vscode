import type * as resolved from 'liana-authoring/schemas/resolve_result/schema'
import * as index from 'liana-authoring/schemas/resolve_result/transformers/reference_index'
import type * as vscode from 'vscode-languageserver/node'
import { create_range_from_range } from './range'

export type Symbol = {
    declaration: index.Declaration
    references: index.Reference[]
}

export type Reference_Index = {
    symbols: Symbol[]
    references: { reference: index.Reference, symbol: Symbol | undefined }[]
}

const cache = new WeakMap<resolved.Document, Reference_Index>()

export const reference_index = (document: resolved.Document): Reference_Index => {
    const cached = cache.get(document)
    if (cached !== undefined) return cached
    const raw = index.Document(document)
    const targets = new Map<resolved.Value, Map<string, Symbol>>()
    const symbols = raw.declarations.__get_raw().map((declaration): Symbol => {
        const symbol = { declaration, references: [] }
        let names = targets.get(declaration.value)
        if (names === undefined) {
            names = new Map()
            targets.set(declaration.value, names)
        }
        names.set(declaration.name, symbol)
        return symbol
    })
    const references = raw.references.__get_raw().map((reference) => {
        const target = reference.target.__get_raw()
        const symbol = target === null ? undefined : targets.get(target[0])?.get(reference.name)
        if (symbol !== undefined) symbol.references.push(reference)
        return { reference, symbol }
    })
    const result = { symbols, references }
    cache.set(document, result)
    return result
}

const contains = (range: vscode.Range, position: vscode.Position): boolean =>
    (position.line > range.start.line || position.line === range.start.line && position.character >= range.start.character)
    && (position.line < range.end.line || position.line === range.end.line && position.character <= range.end.character)

export const symbol_at = (index: Reference_Index, position: vscode.Position): {
    symbol: Symbol
    range: vscode.Range
} | undefined => {
    for (const symbol of index.symbols) {
        const range = create_range_from_range(symbol.declaration.range)
        if (contains(range, position)) return { symbol, range }
    }
    for (const { reference, symbol } of index.references) {
        const range = create_range_from_range(reference.range)
        if (symbol !== undefined && contains(range, position)) return { symbol, range }
    }
    return undefined
}
