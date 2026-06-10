import * as _p from 'pareto-core/dist/assign'

export type Cache_Entry<Result, Error> =
	| ['success', Result]
	| ['error', Error]

type Pending_Request<Result, Error> = {
	callbacks: Array<{
		on_success: ($: Result) => void
		on_error: ($: Error) => void
	}>
}

export type Cache<Cache_Entry> = {
	map: Map<string, Cache_Entry>
	pending_requests: Map<string, Pending_Request<any, any>>
}

export function create_cache<Cache_Entry>(): Cache<Cache_Entry> {
	return {
		map: new Map<string, Cache_Entry>(),
		pending_requests: new Map<string, Pending_Request<any, any>>()
	}
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
	const cached = cache.map.get(key)
	if (cached !== undefined) {
		// Cache hit - return immediately
		switch (cached[0]) {
			case 'success': return on_success(cached[1])
			case 'error': return on_error(cached[1])
			default: return _p.au(cached[0])
		}
	}
	
	// Check if there's already a request in flight for this key
	const pending = cache.pending_requests.get(key)
	if (pending !== undefined) {
		// Request already in progress - add our callbacks to the queue
		pending.callbacks.push({ on_success, on_error })
		return
	}
	
	// No cache hit and no pending request - create a new pending request
	const new_pending: Pending_Request<Result, Error> = {
		callbacks: [{ on_success, on_error }]
	}
	cache.pending_requests.set(key, new_pending)
	
	// Execute the query once
	if_not_in_cache(
		(result) => {
			cache.map.set(key, ['success', result])
			// Notify all waiting callbacks
			const pending = cache.pending_requests.get(key)
			cache.pending_requests.delete(key)
			if (pending) {
				pending.callbacks.forEach(cb => cb.on_success(result))
			}
		},
		(error) => {
			cache.map.set(key, ['error', error])
			// Notify all waiting callbacks
			const pending = cache.pending_requests.get(key)
			cache.pending_requests.delete(key)
			if (pending) {
				pending.callbacks.forEach(cb => cb.on_error(error))
			}
		}
	)
}
