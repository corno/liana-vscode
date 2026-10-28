import type * as s_in_definition from "pareto-liana/schemas/liana_next_schema/authoring_schema"
import type * as s_out from "../unmarshall_result/schema.js"

export type Parameters = {
    'definition': s_in_definition.namespaces.structure.types.Type,
    'property path': s_out.Property_Path
}