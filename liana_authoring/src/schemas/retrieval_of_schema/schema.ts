import type * as s_path from "pareto-filesystem-unrestricted-api/modules/unrestricted/schemas/path/schema"
import type * as s_read_file from "pareto-filesystem-unrestricted-api/modules/unrestricted/schemas/read_file/schema"
import type * as s_deserialize_resolved from "pareto-liana/modules/schema.generated/schemas/reader_errors/schema"
import type * as s_type_specfier from "pareto-liana/schemas/temp_type_specifier/schema"

export type Result = {
	'specification': s_type_specfier.Temp_Type_Specifier
	'schema path': s_path.Node_Path
}

export type Parameters = {
	'tab size': number
	'schema path': s_path.Node_Path
}

export type Error = {
	'schema path': s_path.Node_Path
	'type':
	| ['read file', s_read_file.Error]
	| ['deserialize', s_deserialize_resolved.types.Resolved_Error]
}