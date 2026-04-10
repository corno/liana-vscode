import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'

import * as d_unmarshall_result_from_lines_of_characters from 'liana-authoring/dist/interface/to_be_generated/unmarshall_result_from_loc'

import * as fs from 'fs'
import * as path from 'path'
import * as url from 'url'

export function readSchema(
	documentURI: string,
	onError: ($: {
		'error': NodeJS.ErrnoException
		'schema path': string
	}) => void,
	onSuccess: ($: d_unmarshall_result_from_lines_of_characters.Parameters) => void,
): void {
	const schemaPath = path.join(path.dirname(url.fileURLToPath(documentURI)), ".liana", "schema.slna")

	fs.readFile(
		schemaPath,
		{ 'encoding': 'utf-8' },
		(err, data) => {
			if (err) {
				onError({
					'error': err,
					'schema path': schemaPath,
				})
				return;
			}

			onSuccess({
				'schema': {
					'content': _p_list_from_text(data, ($) => $),
				},
				'tab size': 1,
			})
		}
	)
}