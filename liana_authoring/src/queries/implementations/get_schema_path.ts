import * as p_ from 'pareto-core/query'
import * as p_t from 'pareto-core/transformer'
import query_result from 'pareto-core/__internal/query/query_result'
import type * as query_interfaces from '../interfaces.js'
import type * as filesystem from 'pareto-filesystem-unrestricted-api/modules/unrestricted/queries/interfaces'
import type * as path from 'pareto-filesystem-unrestricted-api/modules/unrestricted/schemas/path/schema'
import type * as result from '../../schemas/retrieval_of_schema_path/schema.js'
import * as extend_path from 'pareto-filesystem-unrestricted-api/modules/unrestricted/schemas/path/transformers/path_extended_with_single_step'

export const $$: p_.Query_Implementation<
    query_interfaces.get_schema_path, null, { stat: filesystem.stat_possible_node }
> = p_.query((e, $s, $q, $d) => {
    return query_result<result.Result, result.Error>((on_success, on_error) => {
        const find = (context: path.Context_Path): undefined => {
            const schema_path: path.Node_Path = {
                context: extend_path.Context_Path(context, { addition: '.liana' }),
                node: 'schema.slna',
            }
            return $q.stat({ context, node: '.liana' }, ($): result.Error => ['stat error', $]).__extract_data(
                status => {
                    if (status[0] === 'directory') return on_success(schema_path)
                    if (status[0] === 'file') return on_error(['invalid schema path', null])
                    if (context.subpath.__get_raw().length === 0) return on_error(['not found', null])
                    const parent = p_t.from.list(context.subpath).on_has_last_item(
                        (_, parent) => parent, () => p_t.literal.list([]),
                    )
                    return find({ start: context.start, subpath: parent })
                },
                on_error,
            )
        }
        return find($d.deprecated['context path'])
    })
})
