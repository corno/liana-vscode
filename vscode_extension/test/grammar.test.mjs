import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const grammar = JSON.parse(readFileSync(new URL('../syntaxes/astn.tmLanguage.json', import.meta.url), 'utf8'))

for (const kind of ['quoted_string', 'apostrophed_string', 'backticked_string']) {
    test(`${kind}: multiline content is permitted and the closing delimiter remains required`, () => {
        const rule = grammar.repository[kind]
        assert.equal(rule.begin, rule.end)
        assert.equal(rule.patterns.some(pattern => pattern.name?.startsWith('invalid.')), false)
        const content = new RegExp(rule.patterns[0].match)
        for (const newline of ['\n', '\r', '\r\n']) {
            assert.equal(content.exec(`a${newline}b`)[0], `a${newline}b`)
        }
        assert.equal(content.test(rule.end), false)
        assert.equal(content.test('\\'), false)
        assert.equal(rule.patterns[1].match, '\\\\.')
    })
}
