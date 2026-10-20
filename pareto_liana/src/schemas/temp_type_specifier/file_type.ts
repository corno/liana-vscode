import * as p from 'pareto-core/transformer'
import list_from_text from 'pareto-core/refiner/specials/list_from_text'
import type * as core from 'pareto-core/schema'
import type * as schema from '../../modules/schema.generated/schemas/resolved/schema.js'

export type File_Path = { directories: core.List<string>, 'file name': string }
type Abort = (message: string) => never
const characters = (text: string) => list_from_text(text, ($) => $).__get_raw()

const valid_segment = (name: string, abort: Abort): void => {
    if (name === '' || name === '.' || name === '..') abort(`Invalid path segment: "${name}"`)
    p.from.list(list_from_text(name, ($) => $)).map(($) => {
        if ($ === 47 || $ === 92 || $ === 0) abort(`Invalid path segment: "${name}"`)
        return null
    })
}

const has_suffix = (file_name: string, ending: string): boolean => {
    const file = characters(file_name)
    const suffix = characters(ending)
    if (file.length <= suffix.length) return false
    for (let index = 0; index < suffix.length; index += 1) {
        if (file[file.length - suffix.length + index] !== suffix[index]) return false
    }
    return true
}

const matches_extension = (file_name: string, extension: string): boolean => extension === '' ||
    has_suffix(file_name, `.${extension}`) ||
    has_suffix(file_name, `.${extension}.lna`) ||
    has_suffix(file_name, `.${extension}.slna`)

const matches_name = (file_name: string, name: string, extension: string): boolean => {
    const logical = extension === '' ? name : `${name}.${extension}`
    return file_name === logical || file_name === `${logical}.lna` || file_name === `${logical}.slna`
}

export const file_type = (specification: schema.types.Type_Specification, path: File_Path, abort: Abort): schema.types.Node.file.type_ => {
    let directory = specification.directory
    p.from.list(path.directories).map((name) => {
        valid_segment(name, abort)
        const node = directory[0] === 'dictionary' ? directory[1].node
            : p.from.dictionary(directory[1].nodes).get_possible_entry(name,
                ($) => $,
                () => abort(`No such directory node: ${name}`),
            )
        if (node[0] !== 'directory') return abort(`Expected directory node: ${name}`)
        directory = node[1]
        return null
    })
    valid_segment(path['file name'], abort)
    const file_name = path['file name']
    const file = directory[0] === 'dictionary' ? directory[1].node
        : p.from.dictionary(p.from.dictionary(directory[1].nodes).filter((node, name) =>
            node[0] === 'file' && matches_name(file_name, name, node[1]['file extension']),
        )).on_has_single_entry(
            ($) => $,
            () => abort(`Ambiguous file node: ${file_name}`),
            () => abort(`No such file node: ${file_name}`),
        )
    if (file[0] !== 'file') return abort(`Expected file node: ${file_name}`)
    if (!matches_extension(file_name, file[1]['file extension'])) return abort(`File extension mismatch: ${file_name}`)
    return file[1].type
}
