import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Native_Contract, prepare_native_schema, is_native_schema } from '../../../native/out'
import type * as unmarshalled from 'liana-authoring/schemas/unmarshall_result/schema'
import type * as location from 'astn-core/modules/deserialization/schemas/location/schema'

const contracts = new Map<string, { text: string, contract: Native_Contract }>()

export function load_native_schema(schema_path: string): Native_Contract | undefined {
    const native_path = path.join(path.dirname(schema_path), 'schema.slna')
    if (!fs.existsSync(native_path)) return undefined
    const text = fs.readFileSync(native_path, 'utf8')
    if (!fs.existsSync(path.join(path.dirname(native_path), 'schema.to_be_removed.slna'))
        && !is_native_schema(text)) return undefined
    const cached = contracts.get(native_path)
    if (cached?.text === text) return cached.contract
    const contract = prepare_native_schema(text)
    contracts.set(native_path, { text, contract })
    return contract
}

export function native_schema_path_for_document(uri: string): string | undefined {
    let directory = path.dirname(fileURLToPath(uri))
    while (true) {
        const schema_path = path.join(directory, '.liana', 'schema.slna')
        if (fs.existsSync(schema_path))
            return load_native_schema(schema_path) === undefined ? undefined : schema_path
        const parent = path.dirname(directory)
        if (parent === directory) return undefined
        directory = parent
    }
}

export function native_schema_for_document(uri: string): Native_Contract | undefined {
    const schema_path = native_schema_path_for_document(uri)
    return schema_path === undefined ? undefined : load_native_schema(schema_path)
}

export type Native_Reference = { id: string, range: location.Range, schema_path: readonly string[] }

export function native_references(document: unmarshalled.Document, root: string): Native_Reference[] {
    const references: Native_Reference[] = []
    const visit = (value: unmarshalled.Value, schema_path: readonly string[]): void => {
        if (value['unmarshall result'][0] !== 'success') {
            if (value.definition[0] === 'reference' && value.instance.type[0] === 'missing')
                references.push({ id: '', range: value.instance.type[1]['#'].range, schema_path })
            return
        }
        const result = value['unmarshall result'][1]
        switch (result[0]) {
            case 'component': {
                const type = result[1].definition.type
                const name = type[0] === 'external' ? type[1].module['l id'] : type[1]['l id']
                visit(result[1].value, [name])
                break
            }
            case 'dictionary':
                for (const [, entry] of result[1].derived.entries.__get_raw()) {
                    if (entry.result[0] === 'success' && entry.result[1].value[0] === 'set')
                        visit(entry.result[1].value[1], [...schema_path, 'dictionary'])
                }
                break
            case 'group':
                for (const [id, property] of result[1].derived.properties.__get_raw()) {
                    if (property.result[0] === 'success') visit(property.result[1], [...schema_path, id])
                }
                break
            case 'list':
                for (const item of result[1].derived.items.__get_raw()) visit(item, [...schema_path, 'list'])
                break
            case 'optional':
                if (result[1].derived.status[0] === 'set')
                    visit(result[1].derived.status[1]['child value'], [...schema_path, 'optional'])
                break
            case 'state':
                if (result[1].derived['option status'][0] === 'set') {
                    const option = result[1].derived['option status'][1]
                    visit(option.value, [...schema_path, option.option])
                }
                break
            case 'reference':
                if (result[1].type[0] === 'selected') {
                    const instance = result[1].type[1].intermediate.instance
                    references.push({ id: instance.token.value, range: instance.range, schema_path })
                }
                break
            case 'nothing': case 'simple': case 'text': break
        }
    }
    visit(document.content, [root])
    return references
}
