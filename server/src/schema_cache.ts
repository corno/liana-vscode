
import * as d_unmarshall_result_from_lines_of_characters from "liana-authoring/dist/interface/to_be_generated/unmarshall_result_from_loc"
import * as d_path from "pareto-resources/dist/interface/generated/liana/schemas/path/data"
import { Load_Schema_Error, Load_Schema_Success } from './to_be_backend/load_applicable_schema'


export type Cached_Schema = 
| ['success', Load_Schema_Success]
| ['error', Load_Schema_Error]

export class Schema_Cache {
	private cache: Map<string, Cached_Schema>

	constructor() {
		this.cache = new Map<string, Cached_Schema>()
	}

	get(schema_path: string): Cached_Schema | undefined {
		return this.cache.get(schema_path)
	}

	set(schema_path: string, cached_schema: Cached_Schema): void {
		this.cache.set(schema_path, cached_schema)
	}
	
	delete(schema_path: string): void {
		this.cache.delete(schema_path)
	}
}

export const schema_cache = new Schema_Cache()