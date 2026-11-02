import type * as tree from 'astn-runtime/modules/deserialization/schemas/parse_tree/schema'
import * as location from 'astn-runtime/modules/deserialization/schemas/parse_tree/transformers/start_token_range'
import type * as errors from '../../modules/schema.generated/schemas/reader_errors/schema.js'
import { authoring_schema_signature as schema_signature } from '../liana_next_schema/schema_signature.js'
import { Header } from '../../shared/sealed_artifact/index.js'
import * as serializer from 'pareto-fountain-pen/modules/paragraph/schemas/paragraph/serializers'
import * as sh from 'pareto-fountain-pen/modules/paragraph/schemas/paragraph/shorthands/deprecated'

export const schema_signature_header = (() => {
    let text = ''
    serializer.Paragraph(sh.pg.sentences([sh.sentence([Header(schema_signature)])]),
        { indentation: '', newline: '' }, chunk => { text += chunk })
    return text
})()

export const validate_schema_signature = (
    header: tree.Document.header,
    abort: (error: errors.types.Resolved_Error) => never,
): void => {
    const value = header.__get_raw()?.[0].value
    let found: string | undefined
    if (value?.type[0] === 'concrete' && value.type[1][0] === 'group' && value.type[1][1][0] === 'verbose') {
        const properties = value.type[1][1][1].properties.__get_raw()
        if (properties.length === 1 && properties[0]?.id.token.value === 'schema-signature') {
            const text = properties[0].assignment.__get_raw()?.[0].value.__get_raw()?.[0]
            if (text?.type[0] === 'concrete' && text.type[1][0] === 'text' &&
                text.type[1][1].token.type[0] === 'quoted') found = text.type[1][1].token.value
        }
    }
    if (found !== schema_signature) {
        const start = { absolute: 0, relative: { line: 0, column: 0 } }
        abort(['resolving', {
            type: ['schema validation', {
                message: `Schema does not conform to the current Liana version: expected schema-signature "${schema_signature}", found ${found === undefined ? 'a missing or invalid schema-signature header' : `"${found}"`}. Regenerate and redeploy the schema with the current Liana version.`,
            }],
            location: value === undefined ? { start, end: start } : location.Value(value),
        }])
    }
}
