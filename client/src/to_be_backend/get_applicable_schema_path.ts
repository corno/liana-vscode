import path from 'path'

export default function get_applicable_schema_path(document_path: string): string {
	const schema_path = path.join(path.dirname(document_path), ".liana", "schema.slna")
	return schema_path
}