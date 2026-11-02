import * as p from 'pareto-core/query'
import * as transform from 'pareto-core/transformer'
import type * as core from 'pareto-core/schema'
import list_from_text from 'pareto-core/refiner/specials/list_from_text'
import * as dictionary from 'pareto-core/temp/Generic_Dictionary'
import * as lookup from 'pareto-core/transformer/specials/lookup'
import query_expression from 'pareto-core/__internal/query/super_query_result'
import type * as interfaces from '../interfaces.js'
import type * as result from '../../schemas/deserialization/schema.js'
import { Document as parse_document } from 'pareto-liana/temp/astn_document'
import { document_header } from 'pareto-liana/schemas/temp_type_specifier/document_header'
import { file_type, type File_Path } from 'pareto-liana/schemas/temp_type_specifier/file_type'
import * as unmarshal from '../../schemas/astn_parse_tree/transformers/unmarshall_result.js'
import * as resolve from '../../schemas/unmarshall_result/transformers/resolve_result.js'
import p_unreachable_code_path from 'pareto-core/transformer/specials/unreachable_code_path'
import type * as s_resolve_result from '../../schemas/resolve_result/schema.js'
import type * as s_schema from 'pareto-liana/schemas/liana_next_schema/authoring_schema'

export type Include_Results = { get(path: string): ['resolved', s_resolve_result.Value] | ['error', string] | undefined }

const resolve_document = (
    unmarshalled: import('../../schemas/unmarshall_result/schema.js').Document,
    specification: s_schema.Type_Specification,
    root_type: s_schema.Node.file.type_.value,
    includes: Include_Results,
): s_resolve_result.Document => {
    const root_resolver = transform.from.dictionary(specification.schema.resolver.implementations.types).get_possible_entry(
        root_type['l id'], $ => $, () => p_unreachable_code_path(`missing resolver for root type: ${root_type['l id']}`),
    )
    const signature = root_resolver.benchmark.value.signature.result
    return resolve.Document(unmarshalled, {
        parameters: {
            acyclic: dictionary.map_value_dictionary_to_generic_dictionary(
                transform.from.dictionary(signature.lookups).filter($ => $.type[0] === 'acyclic'),
                () => ['not found because of root', null],
            ),
            cyclic: dictionary.map_value_dictionary_to_generic_dictionary(
                transform.from.dictionary(signature.lookups).filter($ => $.type[0] === 'cyclic'),
                () => ['not found because of root', null],
            ),
        },
        siblings: { acyclic: lookup.acyclic.not_set(), cyclic: lookup.cyclic.not_set() },
        includes,
    }, {
        definition: root_resolver,
        resolvers: specification.schema,
        'type parameters': transform.from.dictionary(signature.values).map(() => ['not found because of root', null]),
    })
}

export const resolve_cached_document = (
    prepared: result.Constrained_Result,
    includes: Include_Results,
): result.Constrained_Result => ({
    ...resolve_document(
        prepared.unmarshalled,
        prepared['type specification'],
        prepared['root type'],
        includes,
    ),
    'type specification': prepared['type specification'],
    'root type': prepared['root type'],
})

const skip_directories = (path: core.List<string>, count: number): core.List<string> => count === 0 ? path
    : transform.from.list(path).on_has_first_item(
        (_, rest) => skip_directories(rest, count - 1),
        () => transform.literal.list([]),
    )

export const $$: p.Query_Implementation<
    interfaces.deserialize, null, { 'get schema': interfaces.get_schema, 'get schema path': interfaces.get_schema_path }
> = p.query((e, $s, $q, $d) => e.refine((parameters, abort) => {
    const document = parse_document(
        list_from_text(parameters.content, $ => $),
        error => abort(['deserialize parse tree', error]),
        { 'tab size': parameters['tab size'] },
    )
    return {
        document,
        header: document_header(document, error => abort(['schema header', error])),
    }
}).query(prepared => {
    const header = prepared.header.__get_raw()
    if (header !== null) return p.e_deprecated.deprecated_direct_result({
        document: prepared.document,
        specification: header[0].specification,
        path: header[0].path,
    })
    return query_expression($q['get schema path'](
        { 'context path': $d.deprecated['file path'].context },
        (error): result.Error => ['schema path', error],
    )).query(schema_path => $q['get schema'](
        { 'schema path': schema_path, 'tab size': $d.deprecated['tab size'] },
        (error): result.Error => ['schema', { error, 'schema path': schema_path }],
    )).transform(loaded => {
        const schema_depth = loaded['schema path'].context.subpath.__get_raw().length - 1
        const path: File_Path = {
            directories: skip_directories($d.deprecated['file path'].context.subpath, schema_depth),
            'file name': $d.deprecated['file path'].node,
        }
        return {
            document: prepared.document,
            specification: loaded.specification[1],
            path,
        }
    })
}).refine((prepared, abort): result.Result => {
    const specification = prepared.specification
    const root_type = file_type(specification, prepared.path, message => abort(['file type', message]))
    const unmarshalled = unmarshal.Document(prepared.document, {
        definition: root_type['l entry'],
        'property path': transform.literal.list([]),
    })
    return ['constrained', {
        ...resolve_document(
            unmarshalled,
            specification,
            root_type,
            { get: () => undefined },
        ),
        'type specification': specification,
        'root type': root_type,
    }]
}))
