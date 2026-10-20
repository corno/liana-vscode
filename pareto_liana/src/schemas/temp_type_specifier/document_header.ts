import * as p from 'pareto-core/refiner'
import type * as core from 'pareto-core/schema'
import type * as tree from 'astn-runtime/modules/deserialization/schemas/parse_tree/schema'
import type * as schema from '../../modules/schema.generated/schemas/resolved/schema.js'
import type * as errors from '../../modules/schema.generated/schemas/reader_errors/schema.js'
import { Header } from './header.js'
import type { File_Path } from './file_type.js'
import * as read from '../../modules/schema.generated/schemas/unresolved/refiners/astn_parse_tree.js'
import * as resolve from '../../modules/schema.generated/schemas/resolved/refiners/unresolved_manual.js'
import * as location from 'astn-runtime/modules/deserialization/schemas/parse_tree/transformers/start_token_range'

export type Document_Header = { path: File_Path, specification: schema.types.Type_Specification }

export const document_header = (
    document: tree.Document,
    abort: (error: errors.types.Resolved_Error) => never,
): core.Optional_Value<Document_Header> => p.from.optional(document.header).map(header => {
    const parsed = Header(header.value, error => abort(['unresolved document deserialization', ['unmarshalling', error]]))
    return {
        path: parsed.path,
        specification: resolve.Type_Specification(
            read.Type_Specification(parsed.schema, error => abort(['unresolved document deserialization', ['unmarshalling', error]])),
            error => abort(['resolving', { ...error, location: location.Value(parsed.schema) }]),
        ),
    }
})
