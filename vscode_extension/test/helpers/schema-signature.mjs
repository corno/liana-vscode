import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
export const { schema_signature_header } = require('pareto-liana/schemas/temp_type_specifier/schema_signature')
export const signed_schema = source => source.trimStart().startsWith('!')
    ? source
    : `${schema_signature_header}\n${source}`
