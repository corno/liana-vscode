import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import Module, { createRequire } from 'node:module'
import test from 'node:test'

const require = createRequire(import.meta.url)
const { Completion_Style } = require('../client/out/helpers/completion_style.js')
const document = (uri = 'file:///document.lna', version = 1) => ({
    uri: { toString: () => uri }, version,
})
const position = { line: 0, character: 2 }

test('opposite completion styles are scoped to one request and do not leak across documents or edits', () => {
    const styles = new Completion_Style()
    const doc = document()
    for (const style of ['verbose', 'concise']) {
        styles.set(doc, position, style)
        assert.equal(styles.take(doc, position), style)
        assert.equal(styles.take(doc, position), undefined)
    }
    for (const [otherDocument, otherPosition] of [
        [document('file:///other.lna'), position],
        [document(undefined, 2), position],
        [doc, { line: 1, character: 2 }],
        [doc, { line: 0, character: 3 }],
    ]) {
        styles.set(doc, position, 'verbose')
        assert.equal(styles.take(otherDocument, otherPosition), undefined)
        assert.equal(styles.take(doc, position), undefined)
    }
    styles.set(doc, position, 'verbose')
    styles.set(doc, position)
    assert.equal(styles.take(doc, position), undefined)
})

test('both missing-data commands share next-marker navigation and wraparound', async () => {
    let editor
    const messages = []
    const requests = []
    class Selection {
        constructor(anchor, active) { this.anchor = anchor; this.active = active }
    }
    const vscode = {
        window: {
            get activeTextEditor() { return editor },
            showInformationMessage: message => messages.push(message),
        },
        Selection,
        Range: class { constructor(start, end) { this.start = start; this.end = end } },
    }
    const original_load = Module._load
    let jump
    try {
        Module._load = function (id, ...args) {
            return id === 'vscode' ? vscode : original_load.call(this, id, ...args)
        }
        jump = require('../client/out/commands/jump_to_next_missing_data.js').default
    } finally {
        Module._load = original_load
    }
    const deps = {
        trigger_missing_data_completion: async (target, opposite) => {
            requests.push({ position: target.selection.active.character, opposite })
        },
    }
    for (const opposite of [false, true]) {
        const text = '# #'
        editor = {
            document: {
                getText: () => text,
                offsetAt: position => position.character,
                positionAt: character => ({ line: 0, character }),
            },
            selection: new Selection(position, position),
            revealRange: range => assert.equal(range.start, editor.selection.active),
        }
        await jump(deps, opposite)()
        await jump(deps, opposite)()
        assert.deepEqual(requests.splice(0), [{ position: 0, opposite }, { position: 2, opposite }])
    }
    editor.document.getText = () => ''
    await jump(deps, true)()
    assert.equal(messages.pop(), 'No # character found in the document')
    editor = undefined
    await jump(deps, true)()
    assert.equal(messages.pop(), 'No active editor')
    assert.deepEqual(requests, [])
})

test('Ctrl+Shift+D is contributed only for Liana editors with a named command', () => {
    const manifest = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))
    const binding = manifest.contributes.keybindings.find(binding => binding.key === 'ctrl+shift+d')
    assert.equal(binding.command, 'liana.jump_to_next_missing_data_opposite_style')
    assert.equal(binding.when, 'editorTextFocus && editorLangId == liana')
    assert.equal(manifest.contributes.commands.filter(command => command.command === binding.command && command.title).length, 1)
})
