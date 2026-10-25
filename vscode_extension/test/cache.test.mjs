import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import test from 'node:test'

const require = createRequire(import.meta.url)
const { create_cache, get_cached_or_fresh } = require('../server/out/core/cache.js')

for (const outcome of ['success', 'error']) {
    test(`invalidating a pending ${outcome} still settles its original callers without restoring stale data`, () => {
        const cache = create_cache()
        const received = []
        let complete
        const start = (on_success, on_error) => {
            complete = outcome === 'success' ? on_success : on_error
        }
        const on_success = value => { received.push(['success', value]) }
        const on_error = error => { received.push(['error', error]) }
        get_cached_or_fresh(cache, 'document@1', start, on_success, on_error)
        get_cached_or_fresh(cache, 'document@1', () => assert.fail('duplicate query'), on_success, on_error)

        cache.map.delete('document@1')
        complete('old')

        assert.deepEqual(received, [[outcome, 'old'], [outcome, 'old']])
        assert.equal(cache.map.has('document@1'), false)
    })

    test(`a replaced pending ${outcome} cannot settle or overwrite the replacement request`, () => {
        const cache = create_cache()
        const received = []
        let complete_old
        let complete_new
        get_cached_or_fresh(cache, 'schema', (on_success, on_error) => {
            complete_old = outcome === 'success' ? on_success : on_error
        }, value => { received.push(['old success', value]) }, error => { received.push(['old error', error]) })

        cache.map.delete('schema')
        get_cached_or_fresh(cache, 'schema', on_success => {
            complete_new = on_success
        }, value => { received.push(['new', value]) }, () => assert.fail('unexpected error'))
        complete_old('stale')

        assert.deepEqual(received, [[`old ${outcome}`, 'stale']])
        assert.equal(cache.map.get('schema')[0], 'pending')
        complete_new('fresh')
        assert.deepEqual(received, [[`old ${outcome}`, 'stale'], ['new', 'fresh']])
        assert.deepEqual(cache.map.get('schema'), ['success', 'fresh'])
    })
}

test('completion publishes the cached result before notifying reentrant callers', () => {
    const cache = create_cache()
    const received = []
    let complete
    const read_again = value => {
        received.push(value)
        get_cached_or_fresh(cache, 'schema', () => assert.fail('duplicate query'),
            cached => { received.push(cached) }, () => assert.fail('unexpected error'))
    }
    get_cached_or_fresh(cache, 'schema', on_success => { complete = on_success },
        read_again, () => assert.fail('unexpected error'))
    complete('result')
    assert.deepEqual(received, ['result', 'result'])
})
