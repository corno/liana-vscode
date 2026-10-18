import type * as p_schema from 'pareto-core/schema'
import { from as refiner_from, literal } from 'pareto-core/refiner'
import { from as transformer_from } from 'pareto-core/transformer'

export * from 'pareto-core/refiner'
export * as select_lookup from 'pareto-core/refiner/specials/lookup'

const list = <Input extends p_schema.Value>($: p_schema.List<Input>) => ({
    ...refiner_from.list($),
    on_has_last_item: transformer_from.list($).on_has_last_item,
    resolve: <Result extends p_schema.Value>(
        assign_item: (
            item: Input,
            preceding: p_schema.Optional_Value<Result>,
        ) => Result,
    ): p_schema.List<Result> => {
        let preceding: p_schema.Optional_Value<Result> = literal.not_set()
        return refiner_from.list($).map((item) => {
            const resolved = assign_item(item, preceding)
            preceding = literal.set(resolved)
            return resolved
        })
    },
})

export const from = {
    ...refiner_from,
    'boolean': transformer_from.boolean,
    list,
}

export type Refiner_With_Lookups<
    Result extends p_schema.Value,
    Error extends p_schema.Value,
    Input extends p_schema.Value,
    Lookups,
    Parameters extends p_schema.Value,
> = (
    $: Input,
    abort: (
        error: Error,
    ) => never,
    $l: Lookups,
    $p: Parameters,
) => Result

export type Refiner_With_Error_And_Lookups<
    Result extends p_schema.Value,
    Error extends p_schema.Value,
    Input extends p_schema.Value,
    Lookups,
> = (
    $: Input,
    abort: (error: Error) => never,
    $l: Lookups,
) => Result

export type Refiner_With_Lookups_And_Parameter<
    Result extends p_schema.Value,
    Error extends p_schema.Value,
    Input extends p_schema.Value,
    Lookups,
    Parameters extends p_schema.Value,
> = Refiner_With_Lookups<Result, Error, Input, Lookups, Parameters>

export type Refiner_Without_Error_With_Lookups<
    Result extends p_schema.Value,
    Input extends p_schema.Value,
    Lookups,
> = (
    $: Input,
    $l: Lookups,
) => Result

export type Refiner_Without_Error_With_Lookups_And_Parameter<
    Result extends p_schema.Value,
    Input extends p_schema.Value,
    Lookups,
    Parameters extends p_schema.Value,
> = (
    $: Input,
    $l: Lookups,
    $p: Parameters,
) => Result