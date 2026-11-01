import * as p from 'pareto-core/transformer'
import type * as unmarshalled from 'liana-authoring/schemas/unmarshall_result/schema'

export const include_paths = (document: unmarshalled.Document): string[] => {
    const result = new Set<string>()

    const value = ($: unmarshalled.Value): void => {
        const unmarshall_result = $['unmarshall result']
        if (unmarshall_result[0] !== 'success') return

        const content = unmarshall_result[1]
        switch (content[0]) {
            case 'include':
                result.add(content[1].path)
                return
            case 'component':
                value(content[1].value)
                return
            case 'dictionary':
                p.from.dictionary(content[1].derived.entries).map(entry => {
                    if (entry.result[0] === 'success' && entry.result[1].value[0] === 'set') {
                        value(entry.result[1].value[1])
                    }
                    return null
                })
                return
            case 'group':
                p.from.dictionary(content[1].derived.properties).map(property => {
                    if (property.result[0] === 'success') value(property.result[1])
                    return null
                })
                return
            case 'list':
                p.from.list(content[1].derived.items).map(item => {
                    value(item)
                    return null
                })
                return
            case 'optional':
                if (content[1].derived.status[0] === 'set') value(content[1].derived.status[1]['child value'])
                return
            case 'state':
                if (content[1].derived['option status'][0] === 'set') {
                    value(content[1].derived['option status'][1].value)
                }
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

    value(document.content)
    return [...result]
}
