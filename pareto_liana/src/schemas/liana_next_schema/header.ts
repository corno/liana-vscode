import * as p from 'pareto-core/refiner'
import type * as core from 'pareto-core/schema'
import type * as tree from 'astn-runtime/modules/deserialization/schemas/parse_tree/schema'
import type * as errors from './generated/schemas/reader_errors/schema.js'
import * as read from 'liana-runtime/modules/value_unmarshalling/schemas/unmarshalled_value/refiners/astn_parse_tree'
import type * as unmarshalling from 'liana-runtime/modules/value_unmarshalling/schemas/unmarshalling/schema'

export type Path = {
    readonly directories: core.List<string>
    readonly 'file name': string
}
export type Header = {
    readonly path: Path
    readonly schema: tree.Value
}

export const Header: p.Refiner<Header, errors.types.Unmarshalling_Error, tree.Value> = ($, abort) => {
    const error = (error: unmarshalling.Error): never =>
        abort(['value', error])
    const group = read.Verbose_Group($, error, { 'expected properties': p.literal.dictionary({ path: null, schema: null }) })
    const path = read.Verbose_Group(read.Property(group, error, { id: 'path' }), error, {
        'expected properties': p.literal.dictionary({ directories: null, 'file name': null }),
    })
    return {
        schema: read.Property(group, error, { id: 'schema' }),
        path: {
            directories: p.from.list(read.List(read.Property(path, error, { id: 'directories' }), error).items)
                .map(($) => read.Text($.value, error)),
            'file name': read.Text(read.Property(path, error, { id: 'file name' }), error),
        },
    }
}
