import type * as s_path from "pareto-filesystem-unrestricted-api/modules/unrestricted/schemas/path/schema"
import type * as s_unmarshall_result from "../unmarshall_result/schema.js"
import type * as s_resolve_result from "../resolve_result/schema.js"
import type * as s_schema from "pareto-liana/schemas/liana_next_schema/authoring_schema"
import type * as s_deserialize_parse_tree from "astn-runtime/modules/deserialization/schemas/parse_tree_deserialization/schema"
import type * as s_load_schema from "../retrieval_of_schema/schema.js"
import type * as s_schema_path from "../retrieval_of_schema_path/schema.js"
import type * as schema_errors from "pareto-liana/modules/schema.generated/schemas/reader_errors/schema"

export type Constrained_Result = s_resolve_result.Document & {
    'type specification': s_schema.Type_Specification
    'root type': s_schema.Node.type_.file.type_.value
}

export type Result =
| ['unconstrained', s_unmarshall_result.Document]
| ['constrained', Constrained_Result]

export type Error =
    | ['schema header', schema_errors.types.Resolved_Error]
    | ['file type', string]
    | ['schema path', s_schema_path.Error]
    | ['schema', {
        'schema path': s_path.Node_Path,
        'error': s_load_schema.Error
    }]
    | ['deserialize parse tree', s_deserialize_parse_tree.Error]

export type Parameters = {
    'tab size': number,
    'file path': s_path.Node_Path,
    'content': string,
}