import * as _p from 'pareto-core/dist/assign'

export type Cache_Entry<Result, Error> =
	| ['success', Result]
	| ['error', Error]

export type Cache<Cache_Entry> = Map<string, Cache_Entry>

export function create_cache<Cache_Entry>(): Cache<Cache_Entry> {
	return new Map<string, Cache_Entry>()
}

export function get_cached_or_fresh<Result, Error>(
	cache: Cache<Cache_Entry<Result, Error>>,
	key: string,
	if_not_in_cache: (
		on_success: ($: Result) => void,
		on_error: ($: Error) => void
	) => void,
	on_success: ($: Result) => void,
	on_error: ($: Error) => void
): void {
	const cached = cache.get(key)
	if (cached !== undefined) {
		// Cache hit - return immediately
		switch (cached[0]) {
			case 'success': return on_success(cached[1])
			case 'error': return on_error(cached[1])
			default: return _p.au(cached[0])
		}
	} else {
		// Cache miss - execute the query and cache the result
		return if_not_in_cache(
			(result) => {
				cache.set(key, ['success', result])
				on_success(result)
			},
			(error) => {
				cache.set(key, ['error', error])
				on_error(error)
			}
		)
	}
}
