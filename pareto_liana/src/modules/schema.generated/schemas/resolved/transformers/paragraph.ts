import * as p_ from 'pareto-core/transformer'
import type * as s_in from '../schema.js'
import type * as s_out from 'pareto-fountain-pen/modules/paragraph/schemas/paragraph/schema'
import * as t from './astn_sealed_target.js'
import * as sh from 'pareto-fountain-pen/modules/paragraph/schemas/paragraph/shorthands/deprecated'
import * as serialize from 'astn-runtime/modules/serialization/schemas/sealed_target/transformers/paragraph'
export const Type_Specification: p_.Transformer<s_in.types.Type_Specification, s_out.Paragraph> = $ => sh.pg.sentences([sh.sentence([serialize.Value(t.Type_Specification($))])])
