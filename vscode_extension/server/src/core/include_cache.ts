import type { Cache_Context } from '../connection_context'
import type { TextDocument } from 'vscode-languageserver-textdocument'
import { create_cache } from './cache'

const delete_uri_entries = (cache: { map: Map<string, unknown> }, uri: string): void => {
    for (const key of cache.map.keys()) {
        if (key.startsWith(`${uri}@`)) cache.map.delete(key)
    }
}

export const replace_include_dependents = (
    cache: Cache_Context,
    parent_uri: string,
    included_uris: Iterable<string>,
): void => {
    for (const [included_uri, dependents] of cache['include dependents']) {
        dependents.delete(parent_uri)
        if (dependents.size === 0) cache['include dependents'].delete(included_uri)
    }
    for (const included_uri of included_uris) {
        const dependents = cache['include dependents'].get(included_uri) ?? new Set<string>()
        dependents.add(parent_uri)
        cache['include dependents'].set(included_uri, dependents)
    }
}

export const include_would_create_cycle = (
    cache: Cache_Context,
    parent_uri: string,
    included_uri: string,
): boolean => {
    const pending = [included_uri]
    const visited = new Set<string>()
    while (pending.length > 0) {
        const current = pending.pop()
        if (current === undefined || visited.has(current)) continue
        if (current === parent_uri) return true
        visited.add(current)
        for (const [child_uri, dependents] of cache['include dependents']) {
            if (dependents.has(current)) pending.push(child_uri)
        }
    }
    return false
}

export const invalidate_resolved_includers = (cache: Cache_Context, changed_uri: string): Set<string> => {
    const invalidated = new Set<string>()
    const pending = [changed_uri]
    while (pending.length > 0) {
        const uri = pending.pop()
        if (uri === undefined) continue
        if (invalidated.has(uri)) continue
        invalidated.add(uri)
        delete_uri_entries(cache['resolved documents'], uri)
        cache['include dependents'].get(uri)?.forEach(parent => pending.push(parent))
    }
    return invalidated
}

export const create_isolated_document_cache = (
    cache: Cache_Context,
    document: TextDocument,
): Cache_Context => {
    const open_documents = new Map(cache['open documents'])
    open_documents.set(document.uri, document)
    return {
        schemas: cache.schemas,
        documents: create_cache(),
        'resolved documents': create_cache(),
        'open documents': open_documents,
        'include dependents': new Map(),
    }
}
