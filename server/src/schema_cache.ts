import {  Cache_Entry, create_cache } from './cache'

import * as d_temp_module_specifier from "pareto-liana/dist/interface/to_be_generated/temp_module_specifier"
import * as d_get_schema from "liana-authoring/dist/interface/to_be_generated/get_schema"


export type Schema_Cache_Entry = Cache_Entry<d_temp_module_specifier.Temp_Module_Specifier, d_get_schema.Error>

export const schema_cache = create_cache<Schema_Cache_Entry>()