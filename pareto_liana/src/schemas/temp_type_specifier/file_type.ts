import * as p from 'pareto-core/transformer'
import list_from_text from 'pareto-core/refiner/specials/list_from_text'
import type * as core from 'pareto-core/schema'
import type * as schema from '../liana_next_schema/current_generated/structure/schemas/resolved.js'

export type File_Path = { directories: core.List<string>, 'file name': string }
type Abort = (message: string) => never

const valid_segment = (name: string, abort: Abort): void => {
    if (name === '' || name === '.' || name === '..') abort(`Invalid path segment: "${name}"`)
    p.from.list(list_from_text(name, ($) => $)).map(($) => {
        if ($ === 47 || $ === 92 || $ === 0) abort(`Invalid path segment: "${name}"`)
        return null
    })
}

export const file_directory = (specification: schema.Authoring_Specification, directories: core.List<string>, abort: Abort): schema.Directory => {
    let directory = specification.directory
    p.from.list(directories).map((name) => {
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
    return directory
}

export const file_type = (specification: schema.Authoring_Specification, path: File_Path, abort: Abort): schema.Node.file.type_.value => {
    const directory = file_directory(specification, path.directories, abort)
    valid_segment(path['file name'], abort)
    const file_name = path['file name']
    const file = directory[0] === 'dictionary' ? directory[1].node
        : p.from.dictionary(directory[1].nodes).get_possible_entry(file_name,
            ($) => $,
            () => abort(`No such file node: ${file_name}`),
        )
    if (file[0] !== 'file') return abort(`Expected file node: ${file_name}`)
    return file[1].type.value
}
