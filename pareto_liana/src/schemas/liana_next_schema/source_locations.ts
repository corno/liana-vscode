import * as p from 'pareto-core/transformer'
import type * as tree from 'astn-runtime/modules/deserialization/schemas/parse_tree/schema'
import type * as schema from './current_generated/structure/schemas/resolved.js'
import * as range from 'astn-runtime/modules/deserialization/schemas/parse_tree/transformers/full_value_range'
import type { Range } from 'astn-runtime/modules/deserialization/schemas/location/schema'
import { weak_metadata } from '../../weak_metadata.js'

const locations = weak_metadata<object, { range: Range, specification: schema.Authoring_Specification }>()
const sources = weak_metadata<schema.Authoring_Specification, string>()

export const source_location = (definition: object) => {
    const location = locations.get(definition)
    return location === undefined ? undefined : { range: location.range, source: sources.get(location.specification) }
}

export const set_schema_source = (specification: schema.Authoring_Specification, source: string): void => {
    sources.set(specification, source)
}
export const schema_source = (specification: schema.Authoring_Specification): string | undefined => sources.get(specification)

export const register_schema_locations = (specification: schema.Authoring_Specification, body: tree.Value): void => {
    const property = (value: tree.Value | undefined, name: string): tree.Value | undefined => {
        if (value?.type[0] !== 'concrete' || value.type[1][0] !== 'group' || value.type[1][1][0] !== 'verbose') return undefined
        for (const found of value.type[1][1][1].properties.__get_raw()) {
            if (found.id.token.value === name) return found.assignment.__get_raw()?.[0].value.__get_raw()?.[0]
        }
        return undefined
    }
    const entries = (value: tree.Value | undefined): { get(id: string): tree.Value | undefined } => {
        const result: { id: string, value: tree.Value }[] = []
        if (value?.type[0] === 'concrete' && value.type[1][0] === 'dictionary') {
            for (const entry of value.type[1][1].entries.__get_raw()) {
                const child = entry.assignment.__get_raw()?.[0].value.__get_raw()?.[0]
                if (child !== undefined) result[result.length] = { id: entry.id.token.value, value: child }
            }
        }
        return { get: id => {
            for (const entry of result) if (entry.id === id) return entry.value
            return undefined
        } }
    }
    const optional = (value: tree.Value | undefined): tree.Value | undefined =>
        value?.type[0] === 'concrete' && value.type[1][0] === 'optional' && value.type[1][1][0] === 'set'
            ? value.type[1][1][1].value : undefined
    const state = (value: tree.Value | undefined): tree.Value | undefined =>
        value?.type[0] === 'concrete' && value.type[1][0] === 'state' && value.type[1][1].status[0] === 'set'
            ? value.type[1][1].status[1].value : undefined
    const constraints = (definitions: schema.resolver.Option_Constraints, raw: tree.Value | undefined): void => {
        const parsed = entries(optional(raw))
        p.from.optional(definitions).map(definitions => p.from.dictionary(definitions.value).map((definition, id) => {
            const value = parsed.get(id)
            if (value !== undefined) locations.set(definition.value.value, { range: range.Value(value), specification })
            return null
        }))
    }
    const reference_constraints = (definitions: schema.resolver.Reference_Constraints, raw: tree.Value | undefined): void => {
        const parsed = entries(optional(raw))
        p.from.optional(definitions).map(definitions => p.from.dictionary(definitions.value).map((definition, id) => {
            const value = parsed.get(id)
            const constraint = property(value, 'constraint')
            if (constraint !== undefined) locations.set(definition.value.constraint, { range: range.Value(constraint), specification })
            return null
        }))
    }
    const visit = (definition: schema.resolver.Value, raw: tree.Value | undefined): void => {
        const payload = state(raw)
        switch (definition[0]) {
            case 'state': {
                const options = entries(property(payload, 'options'))
                p.from.dictionary(definition[1].value.options).map((option, id) => {
                    const parsed = options.get(id)
                    constraints(option.value.constraints, property(parsed, 'constraints'))
                    visit(option.value.resolver, property(parsed, 'resolver'))
                    return null
                })
                break
            }
            case 'optional':
                constraints(definition[1].value.constraints, property(payload, 'constraints'))
                visit(definition[1].value.resolver, property(payload, 'resolver'))
                break
            case 'dictionary':
            case 'list': visit(definition[1].value.resolver, property(payload, 'resolver')); break
            case 'group': {
                const properties = entries(payload)
                p.from.dictionary(definition[1].value).map((child, id) => {
                    visit(child.value.resolver, property(properties.get(id), 'resolver'))
                    return null
                })
                break
            }
            case 'reference':
                reference_constraints(definition[1].value.type.constraints, property(property(payload, 'type'), 'constraints'))
                break
            case 'component':
                reference_constraints(definition[1].value.constraints, property(payload, 'constraints'))
                break
            case 'nothing':
            case 'simple': break
            default: p.exhaustive(definition[0])
        }
    }
    const namespace = (definition: schema.resolver.Resolver, raw: tree.Value | undefined): void => {
        const types = entries(property(raw, 'types'))
        p.from.dictionary(definition.types).map((type, id) => {
            visit(type.value['root value resolver'], property(types.get(id), 'root value resolver'))
            return null
        })
        const children = entries(property(raw, 'namespaces'))
        p.from.dictionary(definition.namespaces).map((child, id) => { namespace(child.value, children.get(id)); return null })
    }
    namespace(specification.schema.resolver.implementations, property(property(property(body, 'schema'), 'resolver'), 'implementations'))
}
