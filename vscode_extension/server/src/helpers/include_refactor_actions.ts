import * as path from 'node:path'
import * as url from 'node:url'
import * as vscode from 'vscode-languageserver/node'
import { TextDocument } from 'vscode-languageserver-textdocument'
import type * as unmarshalled from 'liana-authoring/schemas/unmarshall_result/schema'
import type * as schema from 'pareto-liana/schemas/liana_next_schema/authoring_schema'
import * as full_range from 'astn-runtime/modules/deserialization/schemas/parse_tree/transformers/full_value_range'
import * as values from 'liana-authoring/schemas/resolve_result/transformers/find_value'
import * as p from 'pareto-core/transformer'
import type { Connection_Context } from '../connection_context'
import { create_isolated_document_cache } from '../core/include_cache'
import { load_document, source_document, validate_include_target } from '../to_be_backend/load_document'
import { create_range_from_range } from './range'

type Extract_Target = {
  directories: string[]
  name: string | null
  extension: string
  rootType: string
  definition: schema.namespaces.structure.types.Value
}

const collect_targets = (
  specification: schema.Type_Specification,
  root_definition?: schema.namespaces.structure.types.Value,
): Extract_Target[] => {
  const targets: Extract_Target[] = []
  const visit = (directory: schema.Directory, directories: string[]) => {
    if (directory[0] === 'dictionary') {
      const node = directory[1].node
      if (node[0] === 'file' && (root_definition === undefined || node[1].type.value['l entry']['root value'] === root_definition)) {
        targets.push({
          directories,
          name: null,
          extension: node[1]['file extension'],
          rootType: node[1].type.value['l id'],
          definition: node[1].type.value['l entry']['root value'],
        })
      } else if (node[0] === 'directory') {
        visit(node[1], directories)
      }
      return
    }
    p.from.dictionary(directory[1].nodes).map((node, name) => {
      if (node[0] === 'file') {
        if (root_definition === undefined || node[1].type.value['l entry']['root value'] === root_definition) {
          targets.push({
            directories,
            name,
            extension: node[1]['file extension'],
            rootType: node[1].type.value['l id'],
            definition: node[1].type.value['l entry']['root value'],
          })
        }
      } else {
        visit(node[1], [...directories, name])
      }
      return null
    })
  }
  visit(specification.directory, [])
  return targets
}

const contains_position = (document: TextDocument, range: vscode.Range, position: vscode.Position): boolean =>
  document.offsetAt(range.start) <= document.offsetAt(position)
  && document.offsetAt(position) <= document.offsetAt(range.end)

const included_values = (document: unmarshalled.Document): {
  path: string
  range: vscode.Range
  definition: schema.namespaces.structure.types.Value
}[] => {
  const result: { path: string, range: vscode.Range, definition: schema.namespaces.structure.types.Value }[] = []
  const visit = (value: unmarshalled.Value): void => {
    const raw = value['unmarshall result']
    if (raw[0] !== 'success') return
    const content = raw[1]
    switch (content[0]) {
      case 'include':
        result.push({
          path: content[1].path,
          range: create_range_from_range(full_range.Value(value.instance)),
          definition: value.definition,
        })
        return
      case 'component':
        visit(content[1].value)
        return
      case 'dictionary':
        p.from.dictionary(content[1].derived.entries).map(entry => {
          if (entry.result[0] === 'success' && entry.result[1].value[0] === 'set') visit(entry.result[1].value[1])
          return null
        })
        return
      case 'group':
        p.from.dictionary(content[1].derived.properties).map(property => {
          if (property.result[0] === 'success') visit(property.result[1])
          return null
        })
        return
      case 'list':
        p.from.list(content[1].derived.items).map(item => {
          visit(item)
          return null
        })
        return
      case 'optional':
        if (content[1].derived.status[0] === 'set') visit(content[1].derived.status[1]['child value'])
        return
      case 'state':
        if (content[1].derived['option status'][0] === 'set') visit(content[1].derived['option status'][1].value)
        return
      case 'nothing':
      case 'simple':
      case 'reference':
      case 'text':
        return
      default:
        return p.exhaustive(content[0])
    }
  }
  visit(document.content)
  return result
}

const load_result = (document: TextDocument, context: Connection_Context): Promise<import('liana-authoring/schemas/deserialization/schema').Result | null> =>
  new Promise(resolve => load_document(
    document,
    create_isolated_document_cache(context.cache, document),
    () => { resolve(null); return null },
    result => { resolve(result); return null },
    resolve,
  ))

const document_actions = async (
  context: Connection_Context,
  document: TextDocument,
  params: vscode.CodeActionParams,
): Promise<vscode.CodeAction[]> => {
  const result = await load_result(document, context)
  if (result === null || result[0] !== 'constrained') return []
  const loaded = result[1]
  const actions: vscode.CodeAction[] = []
  for (const include of included_values(loaded.unmarshalled)) {
    if (!contains_position(document, include.range, params.range.start)) continue
    let target_uri: string
    try {
      target_uri = await validate_include_target(document, loaded, include.path)
    } catch {
      // The validation failure is already reported as an include diagnostic.
      continue
    }
    const target_document = await source_document(target_uri, context.cache)
    const target_result = await load_result(target_document, context)
    if (target_result === null || target_result[0] !== 'constrained'
      || target_result[1].unmarshalled.content.definition !== include.definition) continue
    const target_range = create_range_from_range(full_range.Value(target_result[1].unmarshalled.content.instance))
    const nested_includes: { range: vscode.Range, path: string }[] = []
    let nested_paths_are_valid = true
    for (const nested of included_values(target_result[1].unmarshalled)) {
      try {
        const nested_uri = await validate_include_target(target_document, target_result[1], nested.path)
        const rebased_path = path.relative(
          path.dirname(url.fileURLToPath(document.uri)),
          url.fileURLToPath(nested_uri),
        ).split(path.sep).join('/')
        if (await validate_include_target(document, loaded, rebased_path) !== nested_uri) {
          nested_paths_are_valid = false
          break
        }
        nested_includes.push({ range: nested.range, path: rebased_path })
      } catch {
        // The nested include has a diagnostic in its source document.
        nested_paths_are_valid = false
        break
      }
    }
    if (!nested_paths_are_valid) continue
    actions.push({
      title: 'Inline include',
      kind: vscode.CodeActionKind.Refactor,
      command: vscode.Command.create('Inline included value…', 'liana.inline_include', {
        sourceUri: document.uri,
        sourceVersion: document.version,
        targetUri: target_uri,
        range: include.range,
        targetRange: target_range,
        targetText: target_document.getText(target_range),
        nestedIncludes: nested_includes,
      }),
    })
  }

  const candidates = collect_targets(loaded['type specification'])
  const matching = values.Values(loaded.content).__get_raw().filter(value => {
    const range = create_range_from_range(full_range.Value(value.unmarshalled.instance))
    const unmarshalled_result = value.unmarshalled['unmarshall result']
    return contains_position(document, range, params.range.start)
      && !(unmarshalled_result[0] === 'success' && unmarshalled_result[1][0] === 'include')
      && candidates.some(candidate => value.unmarshalled.definition === candidate.definition)
  })
  const selected = matching.sort((left, right) => {
    const left_range = full_range.Value(left.unmarshalled.instance)
    const right_range = full_range.Value(right.unmarshalled.instance)
    const left_size = document.offsetAt(create_range_from_range(left_range).end) - document.offsetAt(create_range_from_range(left_range).start)
    const right_size = document.offsetAt(create_range_from_range(right_range).end) - document.offsetAt(create_range_from_range(right_range).start)
    return left_size - right_size
  })[0]
  if (selected !== undefined) {
    const allowed = candidates.filter(candidate => candidate.definition === selected.unmarshalled.definition)
    if (allowed.length > 0) {
      actions.push({
        title: 'Extract root value to a file…',
        kind: vscode.CodeActionKind.Refactor,
        command: vscode.Command.create('Extract root value…', 'liana.extract_root_value', {
          sourceUri: document.uri,
          sourceVersion: document.version,
          range: create_range_from_range(full_range.Value(selected.unmarshalled.instance)),
          rootType: allowed[0]!.rootType,
          candidates: allowed.map(({ directories, name, extension }) => ({ directories, name, extension })),
        }),
      })
    }
  }
  return actions
}

export const include_refactor_actions = async (
  context: Connection_Context,
  params: vscode.CodeActionParams,
): Promise<vscode.CodeAction[]> => {
  if (params.context.only && !params.context.only.some(kind =>
    vscode.CodeActionKind.Refactor === kind || vscode.CodeActionKind.Refactor.startsWith(kind + '.'))) return []
  const document = context.documents.get(params.textDocument.uri)
  if (document === undefined) return []
  const results = await document_actions(context, document, params)
  return results
}
