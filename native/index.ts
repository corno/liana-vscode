import * as path from 'node:path'
import { runInThisContext } from 'node:vm'
import * as ts from 'typescript'
import * as p from '../../newstyle_projects/tools/dependencies/node_modules/pareto-core/dist/transformer.js'
import * as schema_runtime from '../../newstyle_projects/tools/dependencies/node_modules/pareto-core/dist/schema.js'
import * as refiner from '../../newstyle_projects/tools/dependencies/node_modules/pareto-core/dist/refiner.js'
import * as lookup from '../../newstyle_projects/tools/dependencies/node_modules/pareto-core/dist/refiner/specials/lookup.js'
import * as paragraph from '../../newstyle_projects/tools/dependencies/node_modules/pareto-fountain-pen/dist/modules/paragraph/schemas/paragraph/transformers/serialized.js'
import * as parse from '../../newstyle_projects/projects/liana/sketch/transformers/pareto_next_sketch/typescript/dist/modules/source.liana.generated/schemas/unresolved/refiners/list_of_characters.js'
import * as produce from '../../newstyle_projects/projects/liana/sketch/transformers/pareto_next_sketch/typescript/dist/transform.js'
import * as resolve from '../../newstyle_projects/projects/programming_languages/pareto_next/sketch/transformers/typescript_light/typescript/dist/resolve.js'
import * as emit from '../../newstyle_projects/projects/programming_languages/pareto_next/sketch/transformers/typescript_light/typescript/dist/transform.js'
import * as files from '../../newstyle_projects/projects/programming_languages/typescript_light/sketch/transformers/file_tree/typescript/dist/transform.js'
import * as names from '../../newstyle_projects/projects/programming_languages/pareto_next/sketch/transformers/typescript_light/typescript/dist/path_serializers.js'
import * as parse_tree from '../../newstyle_projects/tools/dependencies/node_modules/astn-runtime/dist/modules/deserialization/schemas/parse_tree/refiners/list_of_characters.js'
import * as unmarshall from '../../newstyle_projects/tools/dependencies/node_modules/liana-runtime/dist/modules/value_unmarshalling/schemas/unmarshalled_value/refiners/astn_parse_tree.js'
import * as serialize_primitives from '../../newstyle_projects/tools/dependencies/node_modules/liana-runtime/dist/modules/serialization/schemas/primitives/serializers.js'
import * as serialize_target from '../../newstyle_projects/tools/dependencies/node_modules/astn-runtime/dist/modules/serialization/schemas/sealed_target/transformers/serialized_paragraph.js'
import * as read_grammar from 'pareto-liana/schemas/temp_module_specifier/refiners/list_of_characters'
import * as seal from 'liana-authoring/schemas/astn_sealed_target/refiners/list_of_characters'
import * as sealed_paragraph from 'astn-core/modules/serialization/schemas/sealed_target/transformers/serialized_paragraph'
import authoring_grammar from '../../newstyle_projects/projects/liana/sketch/examples/.liana/schema.slna'

export type Native_Error = { type: string, id: string, path: readonly string[] }
export type Native_Contract = {
    syntax: string
    language: 'astn' | 'liana'
    root: string
    typescript: ReadonlyMap<string, string>
    validate: (text: string) => Native_Error | undefined
    complete: (text: string, marker: string) => { candidates: readonly string[], error?: Native_Error }
}

class Refinement_Error extends Error {
    constructor(readonly detail: unknown) {
        super(JSON.stringify(detail))
    }
}

class Completion_Result extends Error {
    constructor(readonly candidates: readonly string[]) {
        super('Native reference completion')
    }
}

const abort = (detail: unknown): never => { throw new Refinement_Error(detail) }
const characters = (text: string) => p.literal.list(Array.from(text, character => character.codePointAt(0)!))
export function is_native_schema(text: string): boolean {
    const value = parse_tree.Document(characters(text), abort, { 'tab size': 1 }).content.type
    if (value[0] !== 'concrete' || value[1][0] !== 'state') return false
    const state = value[1][1].status
    return state[0] === 'set' && ['astn', 'liana'].includes(state[1].option.token.value)
}

const syntax_grammar = (text: string) => {
    const specification = read_grammar.Module_Specifier(characters(text), abort, { 'tab size': 1 })
    if (specification[0] !== 'unconstrained') throw new Error('Native bootstrap grammars must be syntax-only')
    return specification[1].module.entry
}
const authoring = syntax_grammar(authoring_grammar)
const seal_text = (text: string, module: ReturnType<typeof syntax_grammar>): string =>
    sealed_paragraph.Document(seal.Document(characters(text), abort, {
        unmarshall: { module, 'tab size': 1 },
    }), { indentation: '    ' }).__get_raw().join('\n') + '\n'
const record = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === 'object'
type Runtime_Function = (value: unknown, abort: (error: unknown) => never, ...parameters: unknown[]) => schema_runtime.Value

type Reference_Edit = (id: string) => schema_runtime.Value
const is_dictionary = (value: schema_runtime.Value): value is schema_runtime.Dictionary<schema_runtime.Value> =>
    record(value) && value.__dictionary === true
const is_list = (value: schema_runtime.Value): value is schema_runtime.List<schema_runtime.Value> =>
    record(value) && value.__list === true
const is_optional = (value: schema_runtime.Value): value is schema_runtime.Optional_Value<schema_runtime.Value> =>
    record(value) && value.__optional_value === true

function reference_edit(value: schema_runtime.Value, marker: string): Reference_Edit | undefined {
    if (value === marker) return id => id
    if (value === null || typeof value !== 'object') return undefined
    if (is_dictionary(value)) {
        const entries = value.__get_raw().map(([key, child]) => ({ key, child, edit: reference_edit(child, marker) }))
        if (!entries.some(entry => entry.edit !== undefined)) return undefined
        return id => p.literal.dictionary(Object.fromEntries(entries.map(entry =>
            [entry.key, entry.edit === undefined ? entry.child : entry.edit(id)])))
    }
    if (is_list(value)) {
        const children = value.__get_raw()
        const edits = children.map(child => reference_edit(child, marker))
        if (!edits.some(edit => edit !== undefined)) return undefined
        return id => p.literal.list(children.map((child, index) => edits[index]?.(id) ?? child))
    }
    if (is_optional(value)) {
        const child = value.__get_raw()
        if (child === null) return undefined
        const edit = reference_edit(child[0], marker)
        return edit === undefined ? undefined : id => p.literal.set(edit(id))
    }
    if (Array.isArray(value)) {
        const edit = reference_edit(value[1], marker)
        return edit === undefined ? undefined : id => [value[0], edit(id)]
    }
    if ('get_circular_dependent' in value)
        throw new Error('Unresolved native completion input contains a circular dependency')
    const properties = Object.entries(value).map(([key, child]) => ({ key, child, edit: reference_edit(child, marker) }))
    if (!properties.some(property => property.edit !== undefined)) return undefined
    return id => Object.fromEntries(properties.map(property =>
        [property.key, property.edit === undefined ? property.child : property.edit(id)]))
}

function runtime_function(exports: unknown, name: string): Runtime_Function {
    if (!record(exports) || typeof exports[name] !== 'function')
        throw new Error('Generated native API has no function ' + name)
    return exports[name] as Runtime_Function
}

function native_error(detail: unknown): Native_Error {
    if (!record(detail) || typeof detail.type !== 'string' || typeof detail.id !== 'string'
        || !record(detail.path) || typeof detail.path.__get_raw !== 'function')
        throw new Error('Unexpected native resolver error: ' + JSON.stringify(detail))
    const result: unknown = detail.path.__get_raw()
    if (!Array.isArray(result) || !result.every(item => typeof item === 'string'))
        throw new Error('Invalid native resolver error path')
    return { type: detail.type, id: detail.id, path: result }
}

function runtime(sources: ReadonlyMap<string, string>) {
    let completion_marker: string | undefined
    const lookup_keys = new WeakMap<object, readonly string[]>()
    const check_completion = (id: string, keys: readonly string[]) => {
        if (id === completion_marker) throw new Completion_Result(keys)
    }
    const observed_lookup = <T extends schema_runtime.Value, L extends refiner.lookup.Acyclic<T> | refiner.lookup.Cyclic<T>>(
        value: L, keys: readonly string[],
    ): L => {
        const observed = new Proxy(value, {
            get(target, property, receiver) {
                if (property !== 'get_entry') return Reflect.get(target, property, receiver)
                return (id: string, ...arguments_: unknown[]) => {
                    check_completion(id, keys)
                    return Reflect.apply(target.get_entry, target, [id, ...arguments_])
                }
            },
        })
        lookup_keys.set(observed, keys)
        return observed
    }
    const observed_dictionary: typeof refiner.from.dictionary = dictionary => {
        const converted = refiner.from.dictionary(dictionary)
        const keys = dictionary.__get_raw().map(([id]) => id)
        return {
            ...converted,
            get_entry(id, abort) {
                check_completion(id, keys)
                return converted.get_entry(id, abort)
            },
            resolve(assign_entry) {
                return converted.resolve((value, id, acyclic, cyclic) => assign_entry(
                    value, id, observed_lookup(acyclic, keys), observed_lookup(cyclic, keys),
                ))
            },
        }
    }
    const observed_refiner = {
        ...refiner,
        from: { ...refiner.from, dictionary: observed_dictionary },
        convert: { ...refiner.convert, dictionary: observed_dictionary },
    }
    const observed_specials = {
        ...lookup,
        acyclic: {
            ...lookup.acyclic,
            from_resolved_dictionary: <T extends schema_runtime.Value>(dictionary: schema_runtime.Dictionary<T>) =>
                observed_lookup(lookup.acyclic.from_resolved_dictionary(dictionary), dictionary.__get_raw().map(([id]) => id)),
        },
        stack: {
            ...lookup.stack,
            push: <T extends schema_runtime.Value>(stack: refiner.lookup.Stack<T>, item: refiner.lookup.Acyclic<T>) => {
                const result = lookup.stack.push(stack, item)
                const keys = [...new Set([...(lookup_keys.get(item) ?? []), ...(lookup_keys.get(stack) ?? [])])]
                const observed = {
                    ...result,
                    get_entry: (...arguments_: Parameters<typeof result.get_entry>) => {
                        check_completion(arguments_[0], keys)
                        return result.get_entry(...arguments_)
                    },
                }
                lookup_keys.set(observed, keys)
                return observed
            },
        },
    }
    const external = new Map<string, unknown>([
        ['pareto-core/refiner', observed_refiner],
        ['pareto-core/transformer', p],
        ['pareto-core/schema', schema_runtime],
        ['pareto-core/refiner/specials/lookup', observed_specials],
        ['pareto-core-dev/implement_me', { default: () => { throw new Error('Native generation contains an unsupported operation') } }],
        ['astn-runtime/modules/deserialization/schemas/parse_tree/refiners/list_of_characters', parse_tree],
        ['liana-runtime/modules/value_unmarshalling/schemas/unmarshalled_value/refiners/astn_parse_tree', unmarshall],
        ['liana-runtime/modules/serialization/schemas/primitives/serializers', serialize_primitives],
        ['astn-runtime/modules/serialization/schemas/sealed_target/transformers/serialized_paragraph', serialize_target],
    ])
    const modules = new Map<string, { exports: unknown }>()
    const load = (filename: string): unknown => {
        const cached = modules.get(filename)
        if (cached) return cached.exports
        const source = sources.get(filename.replace(/\.js$/, '.ts'))
        if (source === undefined) throw new Error('Missing generated native module: ' + filename)
        const compiled = ts.transpileModule(source, {
            compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS, verbatimModuleSyntax: false },
            fileName: filename.replace(/\.js$/, '.ts'),
        }).outputText
        const module = { exports: {} }
        modules.set(filename, module)
        const execute: (exports: unknown, require: (id: string) => unknown, module: { exports: unknown }) => void =
            runInThisContext('(function(exports, require, module) {\n' + compiled + '\n})', { filename: 'liana-native/' + filename })
        execute(module.exports, id => {
            if (id.startsWith('.')) return load(path.posix.normalize(path.posix.join(path.posix.dirname(filename), id)))
            if (!external.has(id)) throw new Error('Unsupported generated native runtime import: ' + id)
            return external.get(id)
        }, module)
        return module.exports
    }
    return {
        load,
        with_completion<T>(marker: string, action: () => T): T {
            if (completion_marker !== undefined) throw new Error('Nested native completion evaluation')
            completion_marker = marker
            try {
                return action()
            } finally {
                completion_marker = undefined
            }
        },
    }
}

export function prepare_native_schema(text: string): Native_Contract {
    const source = parse.Root(characters(seal_text(text, authoring)), abort, { 'tab size': 1 })
    const syntax = produce.Syntax_Lines(source, abort).join('\n') + '\n'
    const output = files.Root(emit.Root(resolve.Root(produce.Root(source, abort), abort))).node
    const typescript = new Map<string, string>()
    const visit = (node: typeof output, filename: string): void => {
        if (node[0] === 'directory') {
            for (const [id, child] of node[1].__get_raw())
                visit(child, path.posix.join(filename, names.No_Space_Name(id)))
        } else {
            const text = paragraph.Paragraph(node[1], { indentation: '    ' }).__get_raw().join('\n') + '\n'
            if (/\bp_implement_me\s*\(/.test(text))
                throw new Error('Native schema generation contains unsupported operations in ' + filename)
            typescript.set(filename, text)
        }
    }
    visit(output, '')
    let requires_root_arguments = false
    if (source[0] === 'liana') {
        const signatures = source[1].resolver.signatures.signatures
        const seen = new Set<string>()
        let name = source[1].root
        while (true) {
            if (seen.has(name)) throw new Error('Cyclic native root resolver signature: ' + name)
            seen.add(name)
            const signature = p.from.dictionary(signatures).get_possible_entry(
                name, value => value, () => { throw new Error('Missing root resolver signature: ' + name) },
            )
            if (signature.parameters[0] === 'same as') {
                name = signature.parameters[1]
            } else {
                requires_root_arguments = signature.parameters[1].types.__get_raw().length !== 0
                    || signature.parameters[1].lookups.__get_raw().length !== 0
                break
            }
        }
    }
    const { load, with_completion } = runtime(typescript)
    const root = names.No_Space_Name(source[1].root)
    const parse_instance = runtime_function(load('schemas/unresolved/refiners/list_of_characters.js'), root)
    const resolve_instance = source[0] === 'liana'
        ? runtime_function(load('schemas/resolved/refiners/unresolved.js'), root) : undefined
    const instance_grammar = syntax_grammar(syntax)
    return {
        syntax, language: source[0], root: source[1].root, typescript,
        validate(text) {
            try {
                const unresolved = parse_instance(characters(seal_text(text, instance_grammar)), abort, { 'tab size': 1 })
                if (resolve_instance === undefined) return undefined
                if (requires_root_arguments)
                    return { type: 'editor root parameters and lookups are not configured', id: source[1].root, path: [] }
                resolve_instance(unresolved, abort, null, null)
                return undefined
            } catch (error) {
                if (!(error instanceof Refinement_Error)) throw error
                if (Array.isArray(error.detail))
                    return { type: 'native instance parsing failed: ' + error.message, id: '', path: [] }
                return native_error(error.detail)
            }
        },
        complete(text, marker) {
            if (resolve_instance === undefined) return { candidates: [] }
            if (requires_root_arguments)
                return { candidates: [], error: { type: 'editor root parameters and lookups are not configured', id: source[1].root, path: [] } }
            let unresolved: schema_runtime.Value = null
            try {
                unresolved = parse_instance(characters(seal_text(text, instance_grammar)), abort, { 'tab size': 1 })
                with_completion(marker, () => resolve_instance(unresolved, abort, null, null))
                return { candidates: [] }
            } catch (error) {
                if (error instanceof Completion_Result) {
                    const edit = reference_edit(unresolved, marker)
                    if (edit === undefined) throw new Error('Native completion marker is absent from the parsed instance')
                    return {
                        candidates: error.candidates.filter(id => {
                            try {
                                resolve_instance(edit(id), abort, null, null)
                                return true
                            } catch (error) {
                                if (!(error instanceof Refinement_Error)) throw error
                                native_error(error.detail)
                                return false
                            }
                        }),
                    }
                }
                if (error instanceof Refinement_Error) return {
                    candidates: [], error: Array.isArray(error.detail)
                        ? { type: 'native instance parsing failed: ' + error.message, id: '', path: [] }
                        : native_error(error.detail),
                }
                throw error
            }
        },
    }
}
