import * as p_ from 'pareto-core/transformer'
import type * as s from 'pareto-core/schema'
import * as sh from 'pareto-core-shorthands/unconstrained_deprecated'

export type Raw_Or_Normal_Dictionary<T extends s.Value> = { [id: string]: T } | s.Dictionary<T>
export type Raw_Or_Normal_List<T extends s.Value> = T[] | s.List<T>
export type Raw_Optional<T extends s.Value> = T | null | undefined

export const dictionary = sh.dictionary
export const list = sh.list
export const state = <const T extends s.State>($: T): T => $
export const reference = ($: string): string => $
export namespace optional {
    export const set = p_.literal.set
    export const not_set = p_.literal.not_set
    export const null_or_value = <T extends s.Value>($: Raw_Optional<T>): s.Optional_Value<T> =>
        $ === null || $ === undefined ? not_set() : set($)
}
