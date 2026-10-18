
import type * as s_resolving from "../../temp/liana_runtime_resolving_schema.js"
import type * as s_write_file from "pareto-filesystem-unrestricted-api/modules/unrestricted/schemas/write_file/schema"

export type Error =
    | ['error writing file', s_write_file.Error]
    | ['resolving', s_resolving.Error]