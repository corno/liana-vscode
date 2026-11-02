import * as p from 'pareto-core/refiner'
import * as transform from 'pareto-core/transformer'
import type * as core from 'pareto-core/schema'
import type * as tree from 'astn-runtime/modules/deserialization/schemas/parse_tree/schema'
import type * as schema from '../liana_next_schema/current_generated/structure/schemas/resolved.js'
import type * as errors from '../../modules/schema.generated/schemas/reader_errors/schema.js'
import { Header } from './header.js'
import type { File_Path } from './file_type.js'
import * as read from '../liana_next_schema/load.js'
import * as location from 'astn-runtime/modules/deserialization/schemas/parse_tree/transformers/start_token_range'
import * as value_reader from 'liana-runtime/modules/value_unmarshalling/schemas/unmarshalled_value/refiners/astn_parse_tree'
import type * as unmarshalling from 'liana-runtime/modules/value_unmarshalling/schemas/unmarshalling/schema'

export type Document_Header = { path: File_Path, specification: schema.Authoring_Specification, schema_body: tree.Value }

export const document_header = (
    document: tree.Document,
    abort: (error: errors.types.Resolved_Error) => never,
): core.Optional_Value<Document_Header> => p.from.optional(document.header).decide(header => {
    const value = header.value
    if (value.type[0] === 'concrete' && value.type[1][0] === 'group' &&
        value.type[1][1][0] === 'verbose' &&
        transform.from.list(value.type[1][1][1].properties).reduce_to_boolean(
            false, (property, found) => found || property.id.token.value === 'schema-signature',
        )) {
        const error = (error: unmarshalling.Error): never =>
            abort(['unresolved document deserialization', ['unmarshalling', ['value', error]]])
        const group = value_reader.Verbose_Group(value, error, {
            'expected properties': p.literal.dictionary({ 'schema-signature': null }),
        })
        value_reader.Text(value_reader.Property(group, error, { id: 'schema-signature' }), error)
        return p.literal.not_set()
    }
    const parsed = Header(header.value, error => abort(['unresolved document deserialization', ['unmarshalling', error]]))
    return p.literal.set({
        path: parsed.path,
        schema_body: parsed.schema,
        specification: read.Authoring_Specification(parsed.schema, error => abort([
            'resolving',
            {
                ...error,
                location: location.Value(parsed.schema),
            },
        ])),
    })
}, () => p.literal.not_set())
