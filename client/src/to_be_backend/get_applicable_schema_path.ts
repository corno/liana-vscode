import path from 'path'

export default function get_applicable_schema_path(documentURI: string): string {
	const schema_path = path.join(path.dirname(documentURI), ".liana", "schema.slna")
	return schema_path
}