import * as vscode_node from 'vscode-languageserver/node'
import { Connection_Context } from '../connection_context'
import { load_document } from '../to_be_backend/load_document'
import { create_range_from_range } from '../helpers/range'
import { reference_index, symbol_at } from '../helpers/reference_index'
import { benchmark_of, key_range } from '../helpers/benchmark_links'

export const create_on_definition = (
    context: Connection_Context,
): vscode_node.ServerRequestHandler<vscode_node.DefinitionParams, vscode_node.DefinitionLink[] | null, never, void> => (params) => {
    const document = context.documents.get(params.textDocument.uri)
    if (document === undefined) return null
    return new Promise<vscode_node.DefinitionLink[] | null>((resolve) => load_document(
        document, context.cache,
        () => null,
        (instance) => {
            if (instance[0] !== 'constrained') return null
            const target = symbol_at(reference_index(instance[1]), params.position)
            if (target === undefined) return null
            const declaration = target.symbol.declaration
            let destination = declaration.range
            if (target.is_declaration && declaration.dictionary.benchmark.__get_raw() !== null) {
                const benchmark = benchmark_of(declaration.dictionary)
                const range = benchmark === undefined ? undefined : key_range(benchmark, declaration.name)
                if (range === undefined || benchmark === declaration.dictionary) return null
                destination = range
            }
            const range = create_range_from_range(destination)
            return [{
                originSelectionRange: target.range,
                targetUri: document.uri,
                targetRange: range,
                targetSelectionRange: range,
            }]
        },
        resolve,
    ))
}
