import type * as s_parse_tree_deserialization from "astn-runtime/modules/deserialization/schemas/parse_tree_deserialization/schema"
import type * as s_schema from "pareto-liana/schemas/liana_next_schema/authoring_schema"

export type Parameters = {
    'tab size': number
    'type': s_schema.namespaces.structure.types.Type
}

export type Error = s_parse_tree_deserialization.Error