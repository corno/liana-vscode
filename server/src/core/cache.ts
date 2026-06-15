import * as p_ from 'pareto-core/dist/assign'

type Pending_Request<Result, Error> = {
	callbacks: Array<{
		on_success: ($: Result) => undefined
		on_error: ($: Error) => undefined
	}>
}

export type Cache_Entry<Result, Error> =
	| ['success', Result]
	| ['error', Error]
	| ['pending', Pending_Request<Result, Error>]

export type Cache<Result, Error> = {
	map: Map<string, Cache_Entry<Result, Error>>
}

export function create_cache<Result, Error>(): Cache<Result, Error> {
	return {
		map: new Map<string, Cache_Entry<Result, Error>>()
	}
}

export function get_cached_or_fresh<Result, Error>(
	cache: Cache<Result, Error>,
	key: string,
	if_not_in_cache: (
		on_success: ($: Result) => undefined,
		on_error: ($: Error) => undefined
	) => undefined,
	on_success: ($: Result) => undefined,
	on_error: ($: Error) => undefined
): undefined {
	const cached = cache.map.get(key)
	if (cached !== undefined) {
		switch (cached[0]) {
			case 'success': return on_success(cached[1])
			case 'error': return on_error(cached[1])
			case 'pending': {
				// Request already in progress - add our callbacks to the queue
				cached[1].callbacks.push({ on_success, on_error })
				return
			}
			default: return p_.au(cached[0])
		}
	}
	
	// No cache entry - create a new pending request
	const new_pending: Pending_Request<Result, Error> = {
		callbacks: [{ on_success, on_error }]
	}
	cache.map.set(key, ['pending', new_pending])
	
	// Execute the query once
	if_not_in_cache(
		(result) => {
			// Get pending entry and notify all waiting callbacks
			const pending_entry = cache.map.get(key)
			if (pending_entry && pending_entry[0] === 'pending') {
				pending_entry[1].callbacks.forEach(cb => cb.on_success(result))
			}
			cache.map.set(key, ['success', result])
		},
		(error) => {
			// Get pending entry and notify all waiting callbacks
			const pending_entry = cache.map.get(key)
			if (pending_entry && pending_entry[0] === 'pending') {
				pending_entry[1].callbacks.forEach(cb => cb.on_error(error))
			}
			cache.map.set(key, ['error', error])
		}
	)
}
