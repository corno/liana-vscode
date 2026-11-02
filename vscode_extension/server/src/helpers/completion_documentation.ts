import { pathToFileURL } from 'node:url'
import type { Completion_Suggestions } from 'liana-authoring/schemas/completion_suggestions/schema'
import type { Value } from 'liana-authoring/schemas/resolve_result/schema'
import { Values } from 'liana-authoring/schemas/resolve_result/transformers/find_value'
import { source_location } from 'pareto-liana/schemas/liana_next_schema/source_locations'
import { Value as value_range } from 'astn-runtime/modules/deserialization/schemas/parse_tree/transformers/full_value_range'
import { MarkupKind, type MarkupContent } from 'vscode-languageserver/node'

const origins = new WeakMap<Value['unmarshalled']['instance'], string>()

export const register_completion_sources = (value: Value, uri: string): void => {
    for (const child of Values(value).__get_raw()) origins.set(child.unmarshalled.instance, uri)
}

const escape = (text: string): string => text.replace(/&/g, '&amp;').replace(/[\\`*_{}\[\]()#+.!<>|~-]/g, '\\$&')
const link = (label: string, uri: string, line: number, column: number): string =>
    `[${label}](<${uri.split('#')[0]}#L${line + 1},${column + 1}>)`

export const completion_documentation = (
    suggestion: Completion_Suggestions.O.suggestions.L,
): MarkupContent => {
    const blockers = suggestion.blockers?.__get_raw() ?? []
    if (blockers.length === 0) return { kind: MarkupKind.PlainText, value: suggestion.documentation }
    const details = blockers.map(blocker => {
        const links: string[] = []
        if (blocker.value !== undefined) {
            const uri = origins.get(blocker.value.unmarshalled.instance)
            const start = value_range(blocker.value.unmarshalled.instance).start.relative
            if (uri !== undefined) links.push(link('Go to blocker', uri, start.line, start.column))
        }
        if (blocker.definition !== undefined) {
            const source = source_location(blocker.definition)
            if (source?.source !== undefined) {
                const start = source.range.start.relative
                links.push(link('Constraint definition', pathToFileURL(source.source).toString(), start.line, start.column))
            }
        }
        return `${escape(blocker.reason)}\n\n${links.length === 0 ? 'Source location unavailable.' : links.join(' | ')}`
    })
    return { kind: MarkupKind.Markdown, value: escape(suggestion.documentation) + '\n\n' + details.join('\n\n') }
}
