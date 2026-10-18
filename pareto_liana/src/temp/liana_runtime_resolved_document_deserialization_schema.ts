import type * as s_original from 'liana-runtime/modules/resolved_document_deserialization/schemas/resolved_document_deserialization/schema'
import type * as s_unresolved from 'liana-runtime/modules/unresolved_document_deserialization/schemas/unresolved_document_deserialization/schema'
import type * as s_resolving from './liana_runtime_resolving_schema.js'

export type Error =
    | ['unresolved document deserialization', s_unresolved.Error]
    | ['resolving', s_resolving.Error]

export type Parameters = s_original.Parameters
