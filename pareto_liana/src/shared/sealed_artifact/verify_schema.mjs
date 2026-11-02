#!/usr/bin/env node

import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const args = process.argv.slice(2)
const require_self = args[2] === '--require-self-schema'
if (args.length < 2 || args.length > 3 || (args.length === 3 && !require_self)) {
    throw new Error('Usage: node verify_schema.mjs <compiled-core-index.js> <schema.slna> [--require-self-schema]')
}
const core_path = resolve(args[0])
const schema_path = resolve(args[1])
const { Inspect_Schema } = await import(pathToFileURL(core_path).href)
const inspected = Inspect_Schema(await readFile(schema_path, 'utf8'), message => {
    throw new Error(`Cannot inspect schema ${schema_path}: ${message}`)
})
const body_key = inspected['body signature']
const governing_key = inspected['declared schema signature']
if (!/^[0-9a-f]{64}$/.test(body_key) ||
    (governing_key !== null && !/^[0-9a-f]{64}$/.test(governing_key))) {
    throw new Error('Schema signatures must be 64 lowercase hexadecimal characters')
}
if (require_self && governing_key !== body_key) {
    throw new Error('Schema is not self-linked: declared governing key differs from calculated body key')
}
console.log(JSON.stringify({
    source: schema_path,
    algorithm: 'sha256',
    canonicalization: 'sealed-artifact',
    body_key,
    declared_governing_key: governing_key,
    self_linked: governing_key === body_key,
}, null, 2))
