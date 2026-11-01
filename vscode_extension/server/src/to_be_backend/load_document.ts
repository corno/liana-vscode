import p_unreachable_code_path from "pareto-core/transformer/specials/unreachable_code_path"
import query_result from "pareto-core/__internal/query/query_result"
import {
	TextDocument,
} from 'vscode-languageserver-textdocument'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import * as url from "node:url"
import * as p from 'pareto-core/transformer'

import * as d_deserialize from "liana-authoring/schemas/deserialization/schema"

import { $$ as qr_stat } from "pareto-resource-filesystem-unrestricted/queries/implementations/stat_possible_node"
import { $$ as qr_read_file } from "pareto-resource-filesystem-unrestricted/queries/implementations/read_file"

import * as deser_path from "pareto-filesystem-unrestricted-api/modules/unrestricted/schemas/path/deserializers"
import * as ser_path from "pareto-filesystem-unrestricted-api/modules/unrestricted/schemas/path/serializers"
import { $$ as q_deserialize } from "liana-authoring/queries/implementations/deserialize"
import { $$ as q_get_schema_path } from "liana-authoring/queries/implementations/get_schema_path"
import { $$ as q_get_schema } from "liana-authoring/queries/implementations/get_schema"
import { resolve_cached_document, type Include_Results } from "liana-authoring/queries/implementations/deserialize"
import { get_cached_or_fresh } from '../core/cache'
import {
	include_would_create_cycle,
	invalidate_resolved_includers,
	replace_include_dependents,
} from '../core/include_cache'
import { include_paths } from '../helpers/include_paths'
import { Cache_Context } from '../connection_context'
import { file_type } from 'pareto-liana/schemas/temp_type_specifier/file_type'

type Load_Result =
	| ['success', d_deserialize.Result]
	| ['error', d_deserialize.Error]

const document_path = (document: TextDocument): string => url.fileURLToPath(document.uri)
const cache_key = (document: TextDocument): string => `${document.uri}@${document.version}`

const target_uri = (document: TextDocument, include_path: string): string => {
	if (path.isAbsolute(include_path)) throw new Error(`Include path must be relative: ${include_path}`)
	return url.pathToFileURL(path.resolve(path.dirname(document_path(document)), include_path)).toString()
}

const schema_root = async (document: TextDocument): Promise<string> => {
	let directory = path.dirname(document_path(document))
	for (;;) {
		const candidate = path.join(directory, '.liana')
		try {
			if ((await fs.stat(candidate)).isDirectory()) return directory
			throw new Error(`The nearest .liana context is not a directory: ${candidate}`)
		} catch (error) {
			if (error !== null && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
				const parent = path.dirname(directory)
				if (parent === directory) throw new Error(`No schema directory found for ${document.uri}`)
				directory = parent
				continue
			}
			throw error
		}
	}
}

const validate_include_target = async (
	document: TextDocument,
	prepared: d_deserialize.Constrained_Result,
	include_path: string,
): Promise<string> => {
	const target = url.fileURLToPath(target_uri(document, include_path))
	const root = await schema_root(document)
	const relative = path.relative(root, target)
	if (relative === '' || relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
		throw new Error(`Include target is outside the schema directory: ${include_path}`)
	}
	const segments = relative.split(path.sep)
	const file_name = segments.pop()
	if (file_name === undefined) throw new Error(`Invalid include path: ${include_path}`)
	file_type(prepared['type specification'], {
		directories: p.literal.list(segments),
		'file name': file_name,
	}, message => { throw new Error(message) })
	return url.pathToFileURL(target).toString()
}

const prepare_document = (
	document: TextDocument,
	cache: Cache_Context,
): Promise<Load_Result> => new Promise(resolve => {
	get_cached_or_fresh(
		cache.documents,
		cache_key(document),
		(on_cache_success, on_cache_error) => {
			q_deserialize(
				null,
				{
					'get schema path': q_get_schema_path(
						null,
						{ 'stat': qr_stat },
					),
					'get schema': ($p, e_t) => query_result(
						(on_success, on_error) => {
							get_cached_or_fresh(
								cache.schemas,
								ser_path.Node_Path($p['schema path']),
								(on_cache_success, on_cache_error) => {
									q_get_schema(
										{
											'tab size': 1,
										},
										{ 'read file': qr_read_file },
									)(
										$p,
										($) => $
									).__extract_data(on_cache_success, on_cache_error)
								},
								on_success,
								($) => on_error(e_t($)),
							)
						}
					),
				},
			)(
				{
					'content': document.getText(),
					'tab size': 1,
					'file path': deser_path.Node_Path(
						document_path(document),
						() => p_unreachable_code_path(`vscode supplied an unexpected file URI: ${document.uri}`),
						{ 'pedantic': false },
					),
				},
				($): d_deserialize.Error => $
			).__extract_data(
				on_cache_success,
				on_cache_error,
			)
		},
		($) => { resolve(['success', $]); return undefined },
		($) => { resolve(['error', $]); return undefined },
	)
})

const source_document = async (
	uri: string,
	cache: Cache_Context,
): Promise<TextDocument> => {
	const open = cache['open documents'].get(uri)
	if (open !== undefined) return open
	const text = await fs.readFile(url.fileURLToPath(uri), 'utf8')
	return TextDocument.create(uri, 'liana', 0, text)
}

const include_error = (include_path: string, error: unknown): string =>
	`Cannot load include "${include_path}": ${error instanceof Error ? error.message : JSON.stringify(error) ?? String(error)}`

const resolve_prepared_document = async (
	document: TextDocument,
	prepared: d_deserialize.Result,
	cache: Cache_Context,
	stack: string[],
): Promise<Load_Result> => {
	if (prepared[0] !== 'constrained') {
		replace_include_dependents(cache, document.uri, [])
		return ['success', prepared]
	}

	const paths = include_paths(prepared[1].unmarshalled)
	const included_uris: string[] = []
	const include_map = new Map<string, ['resolved', import('liana-authoring/schemas/resolve_result/schema').Value] | ['error', string]>()
	const includes: Include_Results = { get: include_path => include_map.get(include_path) }
	const include_stack = [...stack, document.uri]
	const targets: { path: string, uri: string }[] = []

	for (const include_path of paths) {
		try {
			const uri = await validate_include_target(document, prepared[1], include_path)
			targets.push({ path: include_path, uri })
		} catch (error) {
			include_map.set(include_path, ['error', include_error(include_path, error)])
		}
	}
	included_uris.push(...targets.map(target => target.uri))
	replace_include_dependents(cache, document.uri, included_uris)

	for (const { path: include_path, uri } of targets) {
		if (include_stack.includes(uri)) {
			include_map.set(include_path, ['error', `Include cycle detected: ${[...include_stack, uri].join(' -> ')}`])
			continue
		}
		if (include_would_create_cycle(cache, document.uri, uri)) {
			include_map.set(include_path, ['error', `Include cycle detected: ${document.uri} -> ${uri}`])
			continue
		}

		try {
			const target = await source_document(uri, cache)
			const loaded = await load_resolved_document(target, cache, include_stack)
			if (loaded[0] === 'error') {
				include_map.set(include_path, ['error', include_error(include_path, loaded[1])])
			} else if (loaded[1][0] !== 'constrained') {
				include_map.set(include_path, ['error', `Included file is not constrained by a Liana type: ${include_path}`])
			} else {
				include_map.set(include_path, ['resolved', loaded[1][1].content])
			}
		} catch (error) {
			include_map.set(include_path, ['error', include_error(include_path, error)])
		}
	}

	return ['success', ['constrained', resolve_cached_document(prepared[1], includes)]]
}

const load_resolved_document = (
	document: TextDocument,
	cache: Cache_Context,
	stack: string[],
): Promise<Load_Result> => new Promise(resolve => {
	get_cached_or_fresh(
		cache['resolved documents'],
		cache_key(document),
		(on_success, on_error) => {
			void prepare_document(document, cache).then(prepared => {
				if (prepared[0] === 'error') {
					replace_include_dependents(cache, document.uri, [])
					on_error(prepared[1])
					return
				}
				void resolve_prepared_document(document, prepared[1], cache, stack).then(result => {
					if (result[0] === 'success') on_success(result[1])
					else on_error(result[1])
				}, error => {
					replace_include_dependents(cache, document.uri, [])
					on_error(['file type', `Include resolution failed: ${error instanceof Error ? error.message : String(error)}`])
				})
			})
		},
		($) => { resolve(['success', $]); return undefined },
		($) => { resolve(['error', $]); return undefined },
	)
})

export const load_document = <T>(
	document: TextDocument,
	cache: Cache_Context,
	on_errorx: ($: d_deserialize.Error) => T,
	on_successx: ($: d_deserialize.Result) => T,
	resolve: ($: T) => void,
) => {
	cache['open documents'].set(document.uri, document)
	try {
		void load_resolved_document(document, cache, []).then(result => {
			resolve(result[0] === 'success' ? on_successx(result[1]) : on_errorx(result[1]))
		}, error => {
			resolve(on_errorx(['file type', `Document loading failed: ${error instanceof Error ? error.message : String(error)}`]))
		})
	} catch (error) {
		console.error("Error occurred while loading document:", error)
		throw error
	}
}
