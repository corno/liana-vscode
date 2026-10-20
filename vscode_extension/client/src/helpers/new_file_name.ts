import * as p from 'pareto-core/transformer'
import type * as core from 'pareto-core/schema'
import type * as schema from 'pareto-liana/modules/schema.generated/schemas/resolved/schema'
import { file_directory, file_type } from 'pareto-liana/schemas/temp_type_specifier/file_type'

export type File_Choice = { name: string | null, extension: string }

export const file_choices = (
    specification: schema.types.Type_Specification,
    directories: core.List<string>,
    abort: (message: string) => never,
): File_Choice[] => {
    const directory = file_directory(specification, directories, abort)
    if (directory[0] === 'dictionary') {
        const node = directory[1].node
        if (node[0] !== 'file') return abort('This schema directory contains subdirectories, not files')
        return [{ name: null, extension: node[1]['file extension'] }]
    }
    const choices: File_Choice[] = []
    p.from.dictionary(directory[1].nodes).map((node, name) => {
        if (node[0] === 'file') choices.push({ name, extension: node[1]['file extension'] })
        return null
    })
    if (choices.length === 0) return abort('This schema directory does not declare any files')
    return choices
}

export const new_file_name = (name: string, extension: string): string => {
    if (name === '' || name.trim() === '' || name === '.' || name === '..' || /[/\\\0]/.test(name)) {
        throw new Error('Enter a filename without directory separators')
    }
    const base = name.replace(/\.(?:s?lna)$/, '')
    const logical = extension === '' || base.endsWith(`.${extension}`) ? base : `${base}.${extension}`
    if (base === '' || base === '.' || base === '..') throw new Error('Filename cannot be empty')
    return `${logical}.lna`
}

export const validate_new_file = (
    specification: schema.types.Type_Specification,
    directories: core.List<string>,
    name: string,
): void => {
    file_type(specification, { directories, 'file name': name }, message => { throw new Error(message) })
}
