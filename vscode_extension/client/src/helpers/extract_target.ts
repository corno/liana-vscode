import * as path from 'node:path'
import * as p from 'pareto-core/transformer'
import type * as schema from 'pareto-liana/schemas/liana_next_schema/authoring_schema'
import { file_type } from 'pareto-liana/schemas/temp_type_specifier/file_type'

export type Extract_Target = {
  directories: string[]
  name: string | null
}

export const extract_target_suggestion = (
  source_directory: string,
  schema_root: string,
  target: Extract_Target,
): string => {
  const file = target.name ?? 'my_file.lna'
  const target_directory = path.join(schema_root, ...target.directories)
  return path.relative(source_directory, path.join(target_directory, file)).split(path.sep).join('/')
}

const candidate_matches = (candidate: Extract_Target, directories: string[], file_name: string): boolean => {
  if (candidate.directories.length !== directories.length
    || candidate.directories.some((segment, index) => segment !== directories[index])) return false
  return candidate.name === null || file_name === candidate.name
}

export const validate_extract_target = (
  specification_: schema.types.Authoring_Specification,
  schema_root: string,
  source_directory: string,
  value: string,
  root_type: string,
  candidates: Extract_Target[],
): string => {
  if (value.trim() === '' || path.isAbsolute(value) || /[\0\\]/.test(value)) {
    throw new Error('Enter a relative path using forward slashes')
  }
  const target_path = path.resolve(source_directory, value)
  const relative = path.relative(schema_root, target_path)
  if (relative === '' || relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error('The path must be inside the active schema directory')
  }
  const segments = relative.split(path.sep)
  const file_name = segments.pop()
  if (file_name === undefined) throw new Error('Enter a filename')
  const type = file_type(specification_, {
    directories: p.literal.list(segments),
    'file name': file_name,
  }, message => { throw new Error(message) })
  if (type['l id'] !== root_type
    || !candidates.some(candidate => candidate_matches(candidate, segments, file_name))) {
    throw new Error('This location is not declared for the selected root type in the Authoring Specification')
  }
  return target_path
}
