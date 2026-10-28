import * as p from 'pareto-core/transformer'

import type * as d from "../../../../declarations/schemas/resolved/downtransformers/unresolve.js"

import type * as s_target from "../../../../structure/schemas/unresolved.js"

export namespace temp_pareto_core {
    export const group_resolve_with_dependencies = <Dependencies, Result>(dependencies: Dependencies, resolve: ($parent_captures: Dependencies) => Result): Result => resolve(dependencies)
}

export const Directory: d.Directory = ($) => p.from.state($).decide(
    ($s): s_target.Directory => {
        switch ($s[0]) {
            case 'group': return p.option($s, ($): s_target.Directory => ['group', p.literal.group_resolve(() => {
                const $property_nodes: s_target.Directory.type_.group.nodes = p.change_context($['nodes'], ($) => p.from.dictionary($).map(
                    ($): s_target.Directory.type_.group.nodes.D => Node(
                        $,
                    ),
                ))
                return {
                    'nodes': $property_nodes,
                }
            })])
            case 'dictionary': return p.option($s, ($): s_target.Directory => ['dictionary', p.literal.group_resolve(() => {
                const $property_node: s_target.Directory.type_.dictionary.node = p.change_context($['node'], ($) => Node(
                    $,
                ))
                return {
                    'node': $property_node,
                }
            })])
            default: return p.exhaustive($s[0])
        }
    },
)

export const Node: d.Node = ($) => p.from.state($).decide(
    ($s): s_target.Node => {
        switch ($s[0]) {
            case 'file': return p.option($s, ($): s_target.Node => ['file', p.literal.group_resolve(() => {
                const $property_file_extension: s_target.Node.type_.file.file_extension = p.change_context($['file extension'], ($) => $)
                const $property_type_: s_target.Node.type_.file.type_ = p.change_context($['type'], ($) => p.change_context($['value'], ($) => $['l id']))
                return {
                    'file extension': $property_file_extension,
                    'type': $property_type_,
                }
            })])
            case 'directory': return p.option($s, ($): s_target.Node => ['directory', Directory(
                $,
            )])
            default: return p.exhaustive($s[0])
        }
    },
)

export const Type_Specification: d.Type_Specification = ($) => p.literal.group_resolve(() => {
    const $property_schema: s_target.Type_Specification.schema = p.change_context($['schema'], ($) => p.literal.group_resolve(() => {
        const $property_structure: s_target.Type_Specification.schema.structure = p.change_context($['structure'], ($) => structure.Structure(
            $,
        ))
        const $property_resolver: s_target.Type_Specification.schema.resolver = p.change_context($['resolver'], ($) => p.literal.group_resolve(() => {
            const $property_declarations: s_target.Type_Specification.schema.resolver.declarations = p.change_context($['declarations'], ($) => declarations.Declaration_Namespace(
                $,
            ))
            const $property_implementations: s_target.Type_Specification.schema.resolver.implementations = p.change_context($['implementations'], ($) => resolver.Resolver(
                $,
            ))
            return {
                'declarations': $property_declarations,
                'implementations': $property_implementations,
            }
        }))
        return {
            'structure': $property_structure,
            'resolver': $property_resolver,
        }
    }))
    const $property_directory: s_target.Type_Specification.directory = p.change_context($['directory'], ($) => Directory(
        $,
    ))
    return {
        'schema': $property_schema,
        'directory': $property_directory,
    }
})

export namespace structure {
    
    export const Basic_Types: d.structure.Basic_Types = ($) => p.from.dictionary($).map(
        ($): s_target.structure.Basic_Types.D => p.literal.group_resolve(() => {
            const $property_type_: s_target.structure.Basic_Types.D.type_ = p.change_context($['type'], ($) => p.from.state($).decide(
                ($s): s_target.structure.Basic_Types.D.type_ => {
                    switch ($s[0]) {
                        case 'double quoted': return p.option($s, ($): s_target.structure.Basic_Types.D.type_ => ['double quoted', null])
                        case 'undelimited': return p.option($s, ($): s_target.structure.Basic_Types.D.type_ => ['undelimited', null])
                        default: return p.exhaustive($s[0])
                    }
                },
            ))
            const $property_regular_expression: s_target.structure.Basic_Types.D.regular_expression = p.change_context($['regular expression'], ($) => p.from.optional($).map(
                ($): s_target.structure.Basic_Types.D.regular_expression.O => Regular_Expression(
                    $,
                ),
            ))
            const $property_hyperlink: s_target.structure.Basic_Types.D.hyperlink = p.change_context($['hyperlink'], ($) => p.from.optional($).map(
                ($): s_target.structure.Basic_Types.D.hyperlink.O => p.literal.group_resolve(() => {
                    const $property_prefix: s_target.structure.Basic_Types.D.hyperlink.O.prefix = p.change_context($['prefix'], ($) => $)
                    const $property_suffix: s_target.structure.Basic_Types.D.hyperlink.O.suffix = p.change_context($['suffix'], ($) => $)
                    return {
                        'prefix': $property_prefix,
                        'suffix': $property_suffix,
                    }
                }),
            ))
            return {
                'type': $property_type_,
                'regular expression': $property_regular_expression,
                'hyperlink': $property_hyperlink,
            }
        }),
    )
    
    export const Types: d.structure.Types = ($) => p.from.dictionary($).map(
        ($): s_target.structure.Types.D => Type(
            $,
        ),
    )
    
    export const Namespaces: d.structure.Namespaces = ($) => p.from.dictionary($).map(
        ($): s_target.structure.Namespaces.D => Structure(
            $,
        ),
    )
    
    export const Type: d.structure.Type = ($) => p.literal.group_resolve(() => {
        const $property_visibility: s_target.structure.Type.visibility = p.change_context($['visibility'], ($) => p.from.state($).decide(
            ($s): s_target.structure.Type.visibility => {
                switch ($s[0]) {
                    case 'private': return p.option($s, ($): s_target.structure.Type.visibility => ['private', null])
                    case 'private single use': return p.option($s, ($): s_target.structure.Type.visibility => ['private single use', null])
                    case 'public': return p.option($s, ($): s_target.structure.Type.visibility => ['public', null])
                    default: return p.exhaustive($s[0])
                }
            },
        ))
        const $property_root_value: s_target.structure.Type.root_value = p.change_context($['root value'], ($) => Value(
            $,
        ))
        return {
            'visibility': $property_visibility,
            'root value': $property_root_value,
        }
    })
    
    export const Group: d.structure.Group = ($) => p.from.dictionary($).map(
        ($): s_target.structure.Group.D => p.literal.group_resolve(() => {
            const $property_description: s_target.structure.Group.D.description = p.change_context($['description'], ($) => p.from.optional($).map(
                ($): s_target.structure.Group.D.description.O => $,
            ))
            const $property_value: s_target.structure.Group.D.value = p.change_context($['value'], ($) => Value(
                $,
            ))
            return {
                'description': $property_description,
                'value': $property_value,
            }
        }),
    )
    
    export const Value: d.structure.Value = ($) => p.from.state($).decide(
        ($s): s_target.structure.Value => {
            switch ($s[0]) {
                case 'component': return p.option($s, ($): s_target.structure.Value => ['component', p.literal.group_resolve(() => {
                    const $property_type_: s_target.structure.Value.type_.component.type_ = p.change_context($['type'], ($) => p.from.state($).decide(
                        ($s): s_target.structure.Value.type_.component.type_ => {
                            switch ($s[0]) {
                                case 'simple': return p.option($s, ($): s_target.structure.Value.type_.component.type_ => ['simple', p.from.state($).decide(
                                    ($s): s_target.structure.Value.type_.component.type_.type_.simple => {
                                        switch ($s[0]) {
                                            case 'local': return p.option($s, ($): s_target.structure.Value.type_.component.type_.type_.simple => ['local', $['l id']])
                                            case 'child namespace': return p.option($s, ($): s_target.structure.Value.type_.component.type_.type_.simple => ['child namespace', p.literal.group_resolve(() => {
                                                const $property_namespace: s_target.structure.Value.type_.component.type_.type_.simple.type_.child_namespace.namespace = p.change_context($['namespace'], ($) => $['l id'])
                                                const $property_type_: s_target.structure.Value.type_.component.type_.type_.simple.type_.child_namespace.type_ = p.change_context($['type'], ($) => p.change_context($['value'], ($) => $['l id']))
                                                return {
                                                    'namespace': $property_namespace,
                                                    'type': $property_type_,
                                                }
                                            })])
                                            case 'sibling namespace': return p.option($s, ($): s_target.structure.Value.type_.component.type_.type_.simple => ['sibling namespace', p.literal.group_resolve(() => {
                                                const $property_namespace: s_target.structure.Value.type_.component.type_.type_.simple.type_.sibling_namespace.namespace = p.change_context($['namespace'], ($) => $['l id'])
                                                const $property_type_: s_target.structure.Value.type_.component.type_.type_.simple.type_.sibling_namespace.type_ = p.change_context($['type'], ($) => p.change_context($['value'], ($) => $['l id']))
                                                return {
                                                    'namespace': $property_namespace,
                                                    'type': $property_type_,
                                                }
                                            })])
                                            default: return p.exhaustive($s[0])
                                        }
                                    },
                                )])
                                case 'navigable': return p.option($s, ($): s_target.structure.Value.type_.component.type_ => ['navigable', p.change_context($['value'], ($) => p.from.state($).decide(
                                    ($s): s_target.structure.Value.type_.component.type_.type_.navigable => {
                                        switch ($s[0]) {
                                            case 'local': return p.option($s, ($): s_target.structure.Value.type_.component.type_.type_.navigable => ['local', $['l id']])
                                            case 'child namespace': return p.option($s, ($): s_target.structure.Value.type_.component.type_.type_.navigable => ['child namespace', p.literal.group_resolve(() => {
                                                const $property_namespace: s_target.structure.Value.type_.component.type_.type_.navigable.type_.child_namespace.namespace = p.change_context($['namespace'], ($) => $['l id'])
                                                const $property_type_: s_target.structure.Value.type_.component.type_.type_.navigable.type_.child_namespace.type_ = p.change_context($['type'], ($) => p.change_context($['value'], ($) => $['l id']))
                                                return {
                                                    'namespace': $property_namespace,
                                                    'type': $property_type_,
                                                }
                                            })])
                                            case 'sibling namespace': return p.option($s, ($): s_target.structure.Value.type_.component.type_.type_.navigable => ['sibling namespace', p.literal.group_resolve(() => {
                                                const $property_namespace: s_target.structure.Value.type_.component.type_.type_.navigable.type_.sibling_namespace.namespace = p.change_context($['namespace'], ($) => $['l id'])
                                                const $property_type_: s_target.structure.Value.type_.component.type_.type_.navigable.type_.sibling_namespace.type_ = p.change_context($['type'], ($) => p.change_context($['value'], ($) => $['l id']))
                                                return {
                                                    'namespace': $property_namespace,
                                                    'type': $property_type_,
                                                }
                                            })])
                                            default: return p.exhaustive($s[0])
                                        }
                                    },
                                ))])
                                default: return p.exhaustive($s[0])
                            }
                        },
                    ))
                    const $property_constraints: s_target.structure.Value.type_.component.constraints = p.change_context($['constraints'], ($) => Reference_Constraints(
                        $,
                    ))
                    return {
                        'type': $property_type_,
                        'constraints': $property_constraints,
                    }
                })])
                case 'dictionary': return p.option($s, ($): s_target.structure.Value => ['dictionary', Dictionary(
                    $,
                )])
                case 'group': return p.option($s, ($): s_target.structure.Value => ['group', Group(
                    $,
                )])
                case 'list': return p.option($s, ($): s_target.structure.Value => ['list', p.literal.group_resolve(() => {
                    const $property_value: s_target.structure.Value.type_.list.value = p.change_context($['value'], ($) => Value(
                        $,
                    ))
                    const $property_result: s_target.structure.Value.type_.list.result = p.change_context($['result'], ($) => Value_Result(
                        $,
                    ))
                    return {
                        'value': $property_value,
                        'result': $property_result,
                    }
                })])
                case 'nothing': return p.option($s, ($): s_target.structure.Value => ['nothing', null])
                case 'simple': return p.option($s, ($): s_target.structure.Value => ['simple', p.change_context($['value'], ($) => $['l id'])])
                case 'optional': return p.option($s, ($): s_target.structure.Value => ['optional', p.literal.group_resolve(() => {
                    const $property_constraints: s_target.structure.Value.type_.optional.constraints = p.change_context($['constraints'], ($) => Option_Constraints(
                        $,
                    ))
                    const $property_value: s_target.structure.Value.type_.optional.value = p.change_context($['value'], ($) => Value(
                        $,
                    ))
                    const $property_result: s_target.structure.Value.type_.optional.result = p.change_context($['result'], ($) => Value_Result(
                        $,
                    ))
                    return {
                        'constraints': $property_constraints,
                        'value': $property_value,
                        'result': $property_result,
                    }
                })])
                case 'reference': return p.option($s, ($): s_target.structure.Value => ['reference', Reference(
                    $,
                )])
                case 'state': return p.option($s, ($): s_target.structure.Value => ['state', p.literal.group_resolve(() => {
                    const $property_options: s_target.structure.Value.type_.state.options = p.change_context($['options'], ($) => p.from.dictionary($).map(
                        ($): s_target.structure.Value.type_.state.options.D => p.literal.group_resolve(() => {
                            const $property_description: s_target.structure.Value.type_.state.options.D.description = p.change_context($['description'], ($) => p.from.optional($).map(
                                ($): s_target.structure.Value.type_.state.options.D.description.O => $,
                            ))
                            const $property_constraints: s_target.structure.Value.type_.state.options.D.constraints = p.change_context($['constraints'], ($) => Option_Constraints(
                                $,
                            ))
                            const $property_value: s_target.structure.Value.type_.state.options.D.value = p.change_context($['value'], ($) => Value(
                                $,
                            ))
                            return {
                                'description': $property_description,
                                'constraints': $property_constraints,
                                'value': $property_value,
                            }
                        }),
                    ))
                    const $property_result: s_target.structure.Value.type_.state.result = p.change_context($['result'], ($) => Value_Result(
                        $,
                    ))
                    return {
                        'options': $property_options,
                        'result': $property_result,
                    }
                })])
                default: return p.exhaustive($s[0])
            }
        },
    )
    
    export const Dictionary: d.structure.Dictionary = ($) => p.literal.group_resolve(() => {
        const $property_benchmark: s_target.structure.Dictionary.benchmark = p.change_context($['benchmark'], ($) => p.from.optional($).map(
            ($): s_target.structure.Dictionary.benchmark.O => p.literal.group_resolve(() => {
                const $property_selection: s_target.structure.Dictionary.benchmark.O.selection = p.change_context($['selection'], ($) => p.change_context($['value'], ($) => Value_Reference(
                    $,
                )))
                const $property_coverage: s_target.structure.Dictionary.benchmark.O.coverage = p.change_context($['coverage'], ($) => p.from.state($).decide(
                    ($s): s_target.structure.Dictionary.benchmark.O.coverage => {
                        switch ($s[0]) {
                            case 'dense': return p.option($s, ($): s_target.structure.Dictionary.benchmark.O.coverage => ['dense', null])
                            case 'sparse': return p.option($s, ($): s_target.structure.Dictionary.benchmark.O.coverage => ['sparse', null])
                            default: return p.exhaustive($s[0])
                        }
                    },
                ))
                return {
                    'selection': $property_selection,
                    'coverage': $property_coverage,
                }
            }),
        ))
        const $property_value: s_target.structure.Dictionary.value = p.change_context($['value'], ($) => Value(
            $,
        ))
        return {
            'benchmark': $property_benchmark,
            'value': $property_value,
        }
    })
    
    export const Value_Reference: d.structure.Value_Reference = ($) => p.literal.group_resolve(() => {
        const $property_type_: s_target.structure.Value_Reference.type_ = p.change_context($['type'], ($) => p.literal.group_resolve(() => {
            const $property_location: s_target.structure.Value_Reference.type_.location = p.change_context($['location'], ($) => p.change_context($['value'], ($) => p.from.state($).decide(
                ($s): s_target.structure.Value_Reference.type_.location => {
                    switch ($s[0]) {
                        case 'local': return p.option($s, ($): s_target.structure.Value_Reference.type_.location => ['local', $['l id']])
                        case 'child namespace': return p.option($s, ($): s_target.structure.Value_Reference.type_.location => ['child namespace', p.literal.group_resolve(() => {
                            const $property_namespace: s_target.structure.Value_Reference.type_.location.type_.child_namespace.namespace = p.change_context($['namespace'], ($) => $['l id'])
                            const $property_type_: s_target.structure.Value_Reference.type_.location.type_.child_namespace.type_ = p.change_context($['type'], ($) => $['l id'])
                            return {
                                'namespace': $property_namespace,
                                'type': $property_type_,
                            }
                        })])
                        case 'sibling namespace': return p.option($s, ($): s_target.structure.Value_Reference.type_.location => ['sibling namespace', p.literal.group_resolve(() => {
                            const $property_namespace: s_target.structure.Value_Reference.type_.location.type_.sibling_namespace.namespace = p.change_context($['namespace'], ($) => $['l id'])
                            const $property_type_: s_target.structure.Value_Reference.type_.location.type_.sibling_namespace.type_ = p.change_context($['type'], ($) => $['l id'])
                            return {
                                'namespace': $property_namespace,
                                'type': $property_type_,
                            }
                        })])
                        default: return p.exhaustive($s[0])
                    }
                },
            )))
            return {
                'location': $property_location,
            }
        }))
        const $property_path: s_target.structure.Value_Reference.path = p.change_context($['path'], ($) => p.literal.group_resolve(() => {
            const $property_tail: s_target.structure.Value_Reference.path.tail = p.change_context($['tail'], ($) => p.change_context($['value'], ($) => p.from.list($).map_with_index(
                ($, $index): s_target.structure.Value_Reference.path.tail.L => p.change_context($['value'], ($) => p.change_context($['value'], ($) => p.from.state($).decide(
                    ($s): s_target.structure.Value_Reference.path.tail.L => {
                        switch ($s[0]) {
                            case 'benchmark': return p.option($s, ($): s_target.structure.Value_Reference.path.tail.L => ['benchmark', p.change_context($['value'], ($) => null)])
                            case 'dictionary': return p.option($s, ($): s_target.structure.Value_Reference.path.tail.L => ['dictionary', p.change_context($['value'], ($) => null)])
                            case 'group': return p.option($s, ($): s_target.structure.Value_Reference.path.tail.L => ['group', p.change_context($['value'], ($) => $['l id'])])
                            case 'list': return p.option($s, ($): s_target.structure.Value_Reference.path.tail.L => ['list', p.change_context($['value'], ($) => null)])
                            case 'optional': return p.option($s, ($): s_target.structure.Value_Reference.path.tail.L => ['optional', p.change_context($['value'], ($) => null)])
                            case 'state': return p.option($s, ($): s_target.structure.Value_Reference.path.tail.L => ['state', p.change_context($['value'], ($) => $['l id'])])
                            default: return p.exhaustive($s[0])
                        }
                    },
                ))),
            )))
            return {
                'tail': $property_tail,
            }
        }))
        return {
            'type': $property_type_,
            'path': $property_path,
        }
    })
    
    export const Option_Constraints: d.structure.Option_Constraints = ($) => p.from.optional($).map(
        ($): s_target.structure.Option_Constraints.O => p.from.dictionary($).map(
            ($): s_target.structure.Option_Constraints.O.D => Value_Reference(
                $,
            ),
        ),
    )
    
    export const Reference: d.structure.Reference = ($) => p.literal.group_resolve(() => {
        const $property_referent: s_target.structure.Reference.referent = p.change_context($['referent'], ($) => p.change_context($['value'], ($) => Value_Reference(
            $,
        )))
        const $property_type_: s_target.structure.Reference.type_ = p.change_context($['type'], ($) => p.literal.group_resolve(() => {
            const $property_dependency: s_target.structure.Reference.type_.dependency = p.change_context($['dependency'], ($) => p.from.state($).decide(
                ($s): s_target.structure.Reference.type_.dependency => {
                    switch ($s[0]) {
                        case 'acyclic': return p.option($s, ($): s_target.structure.Reference.type_.dependency => ['acyclic', null])
                        case 'cyclic': return p.option($s, ($): s_target.structure.Reference.type_.dependency => ['cyclic', null])
                        default: return p.exhaustive($s[0])
                    }
                },
            ))
            const $property_constraints: s_target.structure.Reference.type_.constraints = p.change_context($['constraints'], ($) => Reference_Constraints(
                $,
            ))
            return {
                'dependency': $property_dependency,
                'constraints': $property_constraints,
            }
        }))
        return {
            'referent': $property_referent,
            'type': $property_type_,
        }
    })
    
    export const Reference_Constraints: d.structure.Reference_Constraints = ($) => p.from.optional($).map(
        ($): s_target.structure.Reference_Constraints.O => p.from.dictionary($).map(
            ($): s_target.structure.Reference_Constraints.O.D => Value_Reference(
                $,
            ),
        ),
    )
    
    export const Regular_Expression: d.structure.Regular_Expression = ($) => p.from.state($).decide(
        ($s): s_target.structure.Regular_Expression => {
            switch ($s[0]) {
                case 'any character': return p.option($s, ($): s_target.structure.Regular_Expression => ['any character', null])
                case 'literal': return p.option($s, ($): s_target.structure.Regular_Expression => ['literal', $])
                case 'character set': return p.option($s, ($): s_target.structure.Regular_Expression => ['character set', $])
                case 'sequence': return p.option($s, ($): s_target.structure.Regular_Expression => ['sequence', p.from.list($).map_with_index(
                    ($, $index): s_target.structure.Regular_Expression.type_.sequence.L => Regular_Expression(
                        $,
                    ),
                )])
                case 'choice': return p.option($s, ($): s_target.structure.Regular_Expression => ['choice', p.from.list($).map_with_index(
                    ($, $index): s_target.structure.Regular_Expression.type_.choice.L => Regular_Expression(
                        $,
                    ),
                )])
                case 'repetition': return p.option($s, ($): s_target.structure.Regular_Expression => ['repetition', p.literal.group_resolve(() => {
                    const $property_expression: s_target.structure.Regular_Expression.type_.repetition.expression = p.change_context($['expression'], ($) => Regular_Expression(
                        $,
                    ))
                    const $property_quantity: s_target.structure.Regular_Expression.type_.repetition.quantity = p.change_context($['quantity'], ($) => p.from.state($).decide(
                        ($s): s_target.structure.Regular_Expression.type_.repetition.quantity => {
                            switch ($s[0]) {
                                case 'optional': return p.option($s, ($): s_target.structure.Regular_Expression.type_.repetition.quantity => ['optional', null])
                                case 'zero or more': return p.option($s, ($): s_target.structure.Regular_Expression.type_.repetition.quantity => ['zero or more', null])
                                case 'one or more': return p.option($s, ($): s_target.structure.Regular_Expression.type_.repetition.quantity => ['one or more', null])
                                default: return p.exhaustive($s[0])
                            }
                        },
                    ))
                    return {
                        'expression': $property_expression,
                        'quantity': $property_quantity,
                    }
                })])
                default: return p.exhaustive($s[0])
            }
        },
    )
    
    export const Structure: d.structure.Structure = ($) => p.literal.group_resolve(() => {
        const $property_namespaces: s_target.structure.Structure.namespaces = p.change_context($['namespaces'], ($) => Namespaces(
            $,
        ))
        const $property_basic_types: s_target.structure.Structure.basic_types = p.change_context($['basic types'], ($) => Basic_Types(
            $,
        ))
        const $property_types: s_target.structure.Structure.types = p.change_context($['types'], ($) => Types(
            $,
        ))
        return {
            'namespaces': $property_namespaces,
            'basic types': $property_basic_types,
            'types': $property_types,
        }
    })
    
    export const Value_Result: d.structure.Value_Result = ($) => p.from.optional($).map(
        ($): s_target.structure.Value_Result.O => Value_Reference(
            $,
        ),
    )
}

export namespace declarations {
    
    export const Presence: d.declarations.Presence = ($) => p.from.state($).decide(
        ($s): s_target.declarations.Presence => {
            switch ($s[0]) {
                case 'optional': return p.option($s, ($): s_target.declarations.Presence => ['optional', null])
                case 'required': return p.option($s, ($): s_target.declarations.Presence => ['required', null])
                default: return p.exhaustive($s[0])
            }
        },
    )
    
    export const Signature_Value_Reference: d.declarations.Signature_Value_Reference = ($) => p.literal.group_resolve(() => {
        const $property_type_: s_target.declarations.Signature_Value_Reference.type_ = p.change_context($['type'], ($) => p.literal.group_resolve(() => {
            const $property_location: s_target.declarations.Signature_Value_Reference.type_.location = p.change_context($['location'], ($) => p.change_context($['value'], ($) => p.from.state($).decide(
                ($s): s_target.declarations.Signature_Value_Reference.type_.location => {
                    switch ($s[0]) {
                        case 'local': return p.option($s, ($): s_target.declarations.Signature_Value_Reference.type_.location => ['local', $['l id']])
                        case 'child namespace': return p.option($s, ($): s_target.declarations.Signature_Value_Reference.type_.location => ['child namespace', p.literal.group_resolve(() => {
                            const $property_namespace: s_target.declarations.Signature_Value_Reference.type_.location.type_.child_namespace.namespace = p.change_context($['namespace'], ($) => $['l id'])
                            const $property_type_: s_target.declarations.Signature_Value_Reference.type_.location.type_.child_namespace.type_ = p.change_context($['type'], ($) => $['l id'])
                            return {
                                'namespace': $property_namespace,
                                'type': $property_type_,
                            }
                        })])
                        case 'sibling namespace': return p.option($s, ($): s_target.declarations.Signature_Value_Reference.type_.location => ['sibling namespace', p.literal.group_resolve(() => {
                            const $property_namespace: s_target.declarations.Signature_Value_Reference.type_.location.type_.sibling_namespace.namespace = p.change_context($['namespace'], ($) => $['l id'])
                            const $property_type_: s_target.declarations.Signature_Value_Reference.type_.location.type_.sibling_namespace.type_ = p.change_context($['type'], ($) => $['l id'])
                            return {
                                'namespace': $property_namespace,
                                'type': $property_type_,
                            }
                        })])
                        default: return p.exhaustive($s[0])
                    }
                },
            )))
            return {
                'location': $property_location,
            }
        }))
        const $property_subselection: s_target.declarations.Signature_Value_Reference.subselection = p.change_context($['subselection'], ($) => p.literal.group_resolve(() => {
            const $property_tail: s_target.declarations.Signature_Value_Reference.subselection.tail = p.change_context($['tail'], ($) => p.change_context($['value'], ($) => p.from.list($).map_with_index(
                ($, $index): s_target.declarations.Signature_Value_Reference.subselection.tail.L => p.change_context($['value'], ($) => p.change_context($['value'], ($) => p.from.state($).decide(
                    ($s): s_target.declarations.Signature_Value_Reference.subselection.tail.L => {
                        switch ($s[0]) {
                            case 'dictionary': return p.option($s, ($): s_target.declarations.Signature_Value_Reference.subselection.tail.L => ['dictionary', p.change_context($['value'], ($) => null)])
                            case 'group': return p.option($s, ($): s_target.declarations.Signature_Value_Reference.subselection.tail.L => ['group', p.change_context($['value'], ($) => $['l id'])])
                            case 'list': return p.option($s, ($): s_target.declarations.Signature_Value_Reference.subselection.tail.L => ['list', p.change_context($['value'], ($) => null)])
                            case 'optional': return p.option($s, ($): s_target.declarations.Signature_Value_Reference.subselection.tail.L => ['optional', p.change_context($['value'], ($) => null)])
                            case 'state': return p.option($s, ($): s_target.declarations.Signature_Value_Reference.subselection.tail.L => ['state', p.change_context($['value'], ($) => $['l id'])])
                            default: return p.exhaustive($s[0])
                        }
                    },
                ))),
            )))
            return {
                'tail': $property_tail,
            }
        }))
        return {
            'type': $property_type_,
            'subselection': $property_subselection,
        }
    })
    
    export const Signature: d.declarations.Signature = ($) => p.literal.group_resolve(() => {
        const $property_values: s_target.declarations.Signature.values = p.change_context($['values'], ($) => p.from.dictionary($).map(
            ($): s_target.declarations.Signature.values.D => p.literal.group_resolve(() => {
                const $property_value: s_target.declarations.Signature.values.D.value = p.change_context($['value'], ($) => Signature_Value_Reference(
                    $,
                ))
                const $property_presence: s_target.declarations.Signature.values.D.presence = p.change_context($['presence'], ($) => Presence(
                    $,
                ))
                return {
                    'value': $property_value,
                    'presence': $property_presence,
                }
            }),
        ))
        const $property_lookups: s_target.declarations.Signature.lookups = p.change_context($['lookups'], ($) => p.from.dictionary($).map(
            ($): s_target.declarations.Signature.lookups.D => p.literal.group_resolve(() => {
                const $property_referent: s_target.declarations.Signature.lookups.D.referent = p.change_context($['referent'], ($) => p.change_context($['value'], ($) => Signature_Value_Reference(
                    $,
                )))
                const $property_type_: s_target.declarations.Signature.lookups.D.type_ = p.change_context($['type'], ($) => p.from.state($).decide(
                    ($s): s_target.declarations.Signature.lookups.D.type_ => {
                        switch ($s[0]) {
                            case 'cyclic': return p.option($s, ($): s_target.declarations.Signature.lookups.D.type_ => ['cyclic', null])
                            case 'acyclic': return p.option($s, ($): s_target.declarations.Signature.lookups.D.type_ => ['acyclic', null])
                            default: return p.exhaustive($s[0])
                        }
                    },
                ))
                const $property_presence: s_target.declarations.Signature.lookups.D.presence = p.change_context($['presence'], ($) => Presence(
                    $,
                ))
                return {
                    'referent': $property_referent,
                    'type': $property_type_,
                    'presence': $property_presence,
                }
            }),
        ))
        return {
            'values': $property_values,
            'lookups': $property_lookups,
        }
    })
    
    export const Declarations: d.declarations.Declarations = ($) => p.from.dictionary($).map(
        ($): s_target.declarations.Declarations.D => p.change_context($['value'], ($) => Declaration(
            $,
        )),
    )
    
    export const Declaration: d.declarations.Declaration = ($) => p.literal.group_resolve(() => {
        const $property_signature: s_target.declarations.Declaration.signature = p.change_context($['signature'], ($) => p.change_context($['value'], ($) => p.from.state($).decide(
            ($s): s_target.declarations.Declaration.signature => {
                switch ($s[0]) {
                    case 'local': return p.option($s, ($): s_target.declarations.Declaration.signature => ['local', Signature(
                        $,
                    )])
                    case 'same as': return p.option($s, ($): s_target.declarations.Declaration.signature => ['same as', $['l id']])
                    default: return p.exhaustive($s[0])
                }
            },
        )))
        return {
            'signature': $property_signature,
        }
    })
    
    export const Namespaces: d.declarations.Namespaces = ($) => p.from.dictionary($).map(
        ($): s_target.declarations.Namespaces.D => p.change_context($['value'], ($) => Declaration_Namespace(
            $,
        )),
    )
    
    export const Declaration_Namespace: d.declarations.Declaration_Namespace = ($) => p.literal.group_resolve(() => {
        const $property_namespaces: s_target.declarations.Declaration_Namespace.namespaces = p.change_context($['namespaces'], ($) => Namespaces(
            $,
        ))
        const $property_types: s_target.declarations.Declaration_Namespace.types = p.change_context($['types'], ($) => Declarations(
            $,
        ))
        return {
            'namespaces': $property_namespaces,
            'types': $property_types,
        }
    })
}

export namespace resolver {
    
    export const Value_Reference: d.resolver.Value_Reference = ($) => p.literal.group_resolve(() => {
        const $property_type_: s_target.resolver.Value_Reference.type_ = p.change_context($['type'], ($) => p.literal.group_resolve(() => {
            const $property_location: s_target.resolver.Value_Reference.type_.location = p.change_context($['location'], ($) => p.change_context($['value'], ($) => p.from.state($).decide(
                ($s): s_target.resolver.Value_Reference.type_.location => {
                    switch ($s[0]) {
                        case 'local': return p.option($s, ($): s_target.resolver.Value_Reference.type_.location => ['local', $['l id']])
                        case 'child namespace': return p.option($s, ($): s_target.resolver.Value_Reference.type_.location => ['child namespace', p.literal.group_resolve(() => {
                            const $property_namespace: s_target.resolver.Value_Reference.type_.location.type_.child_namespace.namespace = p.change_context($['namespace'], ($) => $['l id'])
                            const $property_type_: s_target.resolver.Value_Reference.type_.location.type_.child_namespace.type_ = p.change_context($['type'], ($) => $['l id'])
                            return {
                                'namespace': $property_namespace,
                                'type': $property_type_,
                            }
                        })])
                        case 'sibling namespace': return p.option($s, ($): s_target.resolver.Value_Reference.type_.location => ['sibling namespace', p.literal.group_resolve(() => {
                            const $property_namespace: s_target.resolver.Value_Reference.type_.location.type_.sibling_namespace.namespace = p.change_context($['namespace'], ($) => $['l id'])
                            const $property_type_: s_target.resolver.Value_Reference.type_.location.type_.sibling_namespace.type_ = p.change_context($['type'], ($) => $['l id'])
                            return {
                                'namespace': $property_namespace,
                                'type': $property_type_,
                            }
                        })])
                        default: return p.exhaustive($s[0])
                    }
                },
            )))
            return {
                'location': $property_location,
            }
        }))
        const $property_path: s_target.resolver.Value_Reference.path = p.change_context($['path'], ($) => p.literal.group_resolve(() => {
            const $property_tail: s_target.resolver.Value_Reference.path.tail = p.change_context($['tail'], ($) => p.change_context($['value'], ($) => p.from.list($).map_with_index(
                ($, $index): s_target.resolver.Value_Reference.path.tail.L => p.change_context($['value'], ($) => p.change_context($['value'], ($) => p.from.state($).decide(
                    ($s): s_target.resolver.Value_Reference.path.tail.L => {
                        switch ($s[0]) {
                            case 'dictionary': return p.option($s, ($): s_target.resolver.Value_Reference.path.tail.L => ['dictionary', p.change_context($['value'], ($) => null)])
                            case 'group': return p.option($s, ($): s_target.resolver.Value_Reference.path.tail.L => ['group', p.change_context($['value'], ($) => $['l id'])])
                            case 'list': return p.option($s, ($): s_target.resolver.Value_Reference.path.tail.L => ['list', p.change_context($['value'], ($) => null)])
                            case 'optional': return p.option($s, ($): s_target.resolver.Value_Reference.path.tail.L => ['optional', p.change_context($['value'], ($) => null)])
                            case 'state': return p.option($s, ($): s_target.resolver.Value_Reference.path.tail.L => ['state', p.change_context($['value'], ($) => $['l id'])])
                            default: return p.exhaustive($s[0])
                        }
                    },
                ))),
            )))
            return {
                'tail': $property_tail,
            }
        }))
        return {
            'type': $property_type_,
            'path': $property_path,
        }
    })
    
    export const Simple_Component_Selection: d.resolver.Simple_Component_Selection = ($) => p.change_context($['value'], ($) => p.from.state($).decide(
        ($s): s_target.resolver.Simple_Component_Selection => {
            switch ($s[0]) {
                case 'local': return p.option($s, ($): s_target.resolver.Simple_Component_Selection => ['local', $['l id']])
                case 'child namespace': return p.option($s, ($): s_target.resolver.Simple_Component_Selection => ['child namespace', p.literal.group_resolve(() => {
                    const $property_namespace: s_target.resolver.Simple_Component_Selection.type_.child_namespace.namespace = p.change_context($['namespace'], ($) => $['l id'])
                    const $property_type_: s_target.resolver.Simple_Component_Selection.type_.child_namespace.type_ = p.change_context($['type'], ($) => $['l id'])
                    return {
                        'namespace': $property_namespace,
                        'type': $property_type_,
                    }
                })])
                case 'sibling namespace': return p.option($s, ($): s_target.resolver.Simple_Component_Selection => ['sibling namespace', p.literal.group_resolve(() => {
                    const $property_namespace: s_target.resolver.Simple_Component_Selection.type_.sibling_namespace.namespace = p.change_context($['namespace'], ($) => $['l id'])
                    const $property_type_: s_target.resolver.Simple_Component_Selection.type_.sibling_namespace.type_ = p.change_context($['type'], ($) => $['l id'])
                    return {
                        'namespace': $property_namespace,
                        'type': $property_type_,
                    }
                })])
                default: return p.exhaustive($s[0])
            }
        },
    ))
    
    export const Relative_Value_Selection: d.resolver.Relative_Value_Selection = ($) => p.literal.group_resolve(() => {
        const $property_path: s_target.resolver.Relative_Value_Selection.path = p.change_context($['path'], ($) => p.change_context($['value'], ($) => p.from.list($).map_with_index(
            ($, $index): s_target.resolver.Relative_Value_Selection.path.L => p.change_context($['value'], ($) => p.change_context($['value'], ($) => p.from.state($).decide(
                ($s): s_target.resolver.Relative_Value_Selection.path.L => {
                    switch ($s[0]) {
                        case 'benchmark link': return p.option($s, ($): s_target.resolver.Relative_Value_Selection.path.L => ['benchmark link', Value_Reference(
                            $,
                        )])
                        case 'simple component': return p.option($s, ($): s_target.resolver.Relative_Value_Selection.path.L => ['simple component', p.change_context($['value'], ($) => Simple_Component_Selection(
                            $,
                        ))])
                        case 'component constraint': return p.option($s, ($): s_target.resolver.Relative_Value_Selection.path.L => ['component constraint', p.change_context($['value'], ($) => p.literal.group_resolve(() => {
                            const $property_name: s_target.resolver.Relative_Value_Selection.path.L.type_.component_constraint.name = p.change_context($['name'], ($) => $['l id'])
                            const $property_target: s_target.resolver.Relative_Value_Selection.path.L.type_.component_constraint.target = p.change_context($['target'], ($) => Value_Reference(
                                $,
                            ))
                            return {
                                'name': $property_name,
                                'target': $property_target,
                            }
                        }))])
                        case 'navigable component': return p.option($s, ($): s_target.resolver.Relative_Value_Selection.path.L => ['navigable component', p.change_context($['value'], ($) => null)])
                        case 'group': return p.option($s, ($): s_target.resolver.Relative_Value_Selection.path.L => ['group', p.change_context($['value'], ($) => $['l id'])])
                        case 'list result': return p.option($s, ($): s_target.resolver.Relative_Value_Selection.path.L => ['list result', p.change_context($['value'], ($) => null)])
                        case 'option constraint': return p.option($s, ($): s_target.resolver.Relative_Value_Selection.path.L => ['option constraint', p.change_context($['value'], ($) => p.literal.group_resolve(() => {
                            const $property_option: s_target.resolver.Relative_Value_Selection.path.L.type_.option_constraint.option = p.change_context($['option'], ($) => $['l id'])
                            const $property_constraint: s_target.resolver.Relative_Value_Selection.path.L.type_.option_constraint.constraint = p.change_context($['constraint'], ($) => $['l id'])
                            return {
                                'option': $property_option,
                                'constraint': $property_constraint,
                            }
                        }))])
                        case 'optional': return p.option($s, ($): s_target.resolver.Relative_Value_Selection.path.L => ['optional', p.change_context($['value'], ($) => null)])
                        case 'optional value constraint': return p.option($s, ($): s_target.resolver.Relative_Value_Selection.path.L => ['optional value constraint', p.change_context($['value'], ($) => $['l id'])])
                        case 'reference constraint': return p.option($s, ($): s_target.resolver.Relative_Value_Selection.path.L => ['reference constraint', p.change_context($['value'], ($) => $['l id'])])
                        case 'reference': return p.option($s, ($): s_target.resolver.Relative_Value_Selection.path.L => ['reference', p.change_context($['value'], ($) => null)])
                        case 'state result': return p.option($s, ($): s_target.resolver.Relative_Value_Selection.path.L => ['state result', p.change_context($['value'], ($) => null)])
                        default: return p.exhaustive($s[0])
                    }
                },
            ))),
        )))
        return {
            'path': $property_path,
        }
    })
    
    export const Possible_Value_Selection: d.resolver.Possible_Value_Selection = ($) => p.change_context($['value'], ($) => p.from.state($).decide(
        ($s): s_target.resolver.Possible_Value_Selection => {
            switch ($s[0]) {
                case 'optional value': return p.option($s, ($): s_target.resolver.Possible_Value_Selection => ['optional value', p.literal.group_resolve(() => {
                    const $property_selection: s_target.resolver.Possible_Value_Selection.type_.optional_value.selection = p.change_context($['selection'], ($) => p.change_context($['value'], ($) => Guaranteed_Value_Selection(
                        $,
                    )))
                    const $property_tail: s_target.resolver.Possible_Value_Selection.type_.optional_value.tail = p.change_context($['tail'], ($) => Relative_Value_Selection(
                        $,
                    ))
                    return {
                        'selection': $property_selection,
                        'tail': $property_tail,
                    }
                })])
                case 'parameter': return p.option($s, ($): s_target.resolver.Possible_Value_Selection => ['parameter', $['l id']])
                case 'result': return p.option($s, ($): s_target.resolver.Possible_Value_Selection => ['result', p.change_context($['value'], ($) => p.from.state($).decide(
                    ($s): s_target.resolver.Possible_Value_Selection.type_.result => {
                        switch ($s[0]) {
                            case 'state': return p.option($s, ($): s_target.resolver.Possible_Value_Selection.type_.result => ['state', p.literal.group_resolve(() => {
                                const $property_property: s_target.resolver.Possible_Value_Selection.type_.result.type_.state.property = p.change_context($['property'], ($) => p.change_context($['value'], ($) => $['l id']))
                                return {
                                    'property': $property_property,
                                }
                            })])
                            case 'optional value': return p.option($s, ($): s_target.resolver.Possible_Value_Selection.type_.result => ['optional value', p.literal.group_resolve(() => {
                                const $property_property: s_target.resolver.Possible_Value_Selection.type_.result.type_.optional_value.property = p.change_context($['property'], ($) => p.change_context($['value'], ($) => $['l id']))
                                return {
                                    'property': $property_property,
                                }
                            })])
                            default: return p.exhaustive($s[0])
                        }
                    },
                ))])
                default: return p.exhaustive($s[0])
            }
        },
    ))
    
    export const Option_Constraints: d.resolver.Option_Constraints = ($) => p.from.optional($).map(
        ($): s_target.resolver.Option_Constraints.O => p.change_context($['value'], ($) => p.from.dictionary($).map(
            ($): s_target.resolver.Option_Constraints.O.D => p.change_context($['value'], ($) => p.change_context($['value'], ($) => p.from.state($).decide(
                ($s): s_target.resolver.Option_Constraints.O.D => {
                    switch ($s[0]) {
                        case 'state': return p.option($s, ($): s_target.resolver.Option_Constraints.O.D => ['state', p.literal.group_resolve(() => {
                            const $property_selection: s_target.resolver.Option_Constraints.O.D.type_.state.selection = p.change_context($['selection'], ($) => p.change_context($['value'], ($) => Guaranteed_Value_Selection(
                                $,
                            )))
                            const $property_option: s_target.resolver.Option_Constraints.O.D.type_.state.option = p.change_context($['option'], ($) => $['l id'])
                            return {
                                'selection': $property_selection,
                                'option': $property_option,
                            }
                        })])
                        case 'assert is set': return p.option($s, ($): s_target.resolver.Option_Constraints.O.D => ['assert is set', Possible_Value_Selection(
                            $,
                        )])
                        default: return p.exhaustive($s[0])
                    }
                },
            ))),
        )),
    )
    
    export const Guaranteed_Value_Selection: d.resolver.Guaranteed_Value_Selection = ($) => p.literal.group_resolve(() => {
        const $property_start: s_target.resolver.Guaranteed_Value_Selection.start = p.change_context($['start'], ($) => p.change_context($['value'], ($) => p.from.state($).decide(
            ($s): s_target.resolver.Guaranteed_Value_Selection.start => {
                switch ($s[0]) {
                    case 'optional fallback': return p.option($s, ($): s_target.resolver.Guaranteed_Value_Selection.start => ['optional fallback', p.literal.group_resolve(() => {
                        const $property_selection: s_target.resolver.Guaranteed_Value_Selection.start.type_.optional_fallback.selection = p.change_context($['selection'], ($) => Possible_Value_Selection(
                            $,
                        ))
                        const $property_fallback: s_target.resolver.Guaranteed_Value_Selection.start.type_.optional_fallback.fallback = p.change_context($['fallback'], ($) => Guaranteed_Value_Selection(
                            $,
                        ))
                        return {
                            'selection': $property_selection,
                            'fallback': $property_fallback,
                        }
                    })])
                    case 'sibling property': return p.option($s, ($): s_target.resolver.Guaranteed_Value_Selection.start => ['sibling property', $['l id']])
                    case 'parent sibling': return p.option($s, ($): s_target.resolver.Guaranteed_Value_Selection.start => ['parent sibling', $['l id']])
                    case 'option constraint': return p.option($s, ($): s_target.resolver.Guaranteed_Value_Selection.start => ['option constraint', p.change_context($['value'], ($) => $['l id'])])
                    case 'sibling option constraint': return p.option($s, ($): s_target.resolver.Guaranteed_Value_Selection.start => ['sibling option constraint', $['l id']])
                    case 'list cursor': return p.option($s, ($): s_target.resolver.Guaranteed_Value_Selection.start => ['list cursor', p.change_context($['value'], ($) => null)])
                    case 'linked entry': return p.option($s, ($): s_target.resolver.Guaranteed_Value_Selection.start => ['linked entry', p.change_context($['value'], ($) => null)])
                    case 'constraint': return p.option($s, ($): s_target.resolver.Guaranteed_Value_Selection.start => ['constraint', p.change_context($['value'], ($) => p.from.state($).decide(
                        ($s): s_target.resolver.Guaranteed_Value_Selection.start.type_.constraint => {
                            switch ($s[0]) {
                                case 'component': return p.option($s, ($): s_target.resolver.Guaranteed_Value_Selection.start.type_.constraint => ['component', p.literal.group_resolve(() => {
                                    const $property_property: s_target.resolver.Guaranteed_Value_Selection.start.type_.constraint.type_.component.property = p.change_context($['property'], ($) => p.change_context($['value'], ($) => $['l id']))
                                    const $property_constraint: s_target.resolver.Guaranteed_Value_Selection.start.type_.constraint.type_.component.constraint = p.change_context($['constraint'], ($) => $['l id'])
                                    return {
                                        'property': $property_property,
                                        'constraint': $property_constraint,
                                    }
                                })])
                                case 'reference': return p.option($s, ($): s_target.resolver.Guaranteed_Value_Selection.start.type_.constraint => ['reference', p.literal.group_resolve(() => {
                                    const $property_property: s_target.resolver.Guaranteed_Value_Selection.start.type_.constraint.type_.reference.property = p.change_context($['property'], ($) => p.change_context($['value'], ($) => $['l id']))
                                    const $property_constraint: s_target.resolver.Guaranteed_Value_Selection.start.type_.constraint.type_.reference.constraint = p.change_context($['constraint'], ($) => $['l id'])
                                    return {
                                        'property': $property_property,
                                        'constraint': $property_constraint,
                                    }
                                })])
                                default: return p.exhaustive($s[0])
                            }
                        },
                    ))])
                    case 'parameter': return p.option($s, ($): s_target.resolver.Guaranteed_Value_Selection.start => ['parameter', $['l id']])
                    case 'result': return p.option($s, ($): s_target.resolver.Guaranteed_Value_Selection.start => ['result', p.change_context($['value'], ($) => p.from.state($).decide(
                        ($s): s_target.resolver.Guaranteed_Value_Selection.start.type_.result => {
                            switch ($s[0]) {
                                case 'list': return p.option($s, ($): s_target.resolver.Guaranteed_Value_Selection.start.type_.result => ['list', p.literal.group_resolve(() => {
                                    const $property_property: s_target.resolver.Guaranteed_Value_Selection.start.type_.result.type_.list.property = p.change_context($['property'], ($) => p.change_context($['value'], ($) => $['l id']))
                                    return {
                                        'property': $property_property,
                                    }
                                })])
                                case 'state': return p.option($s, ($): s_target.resolver.Guaranteed_Value_Selection.start.type_.result => ['state', p.literal.group_resolve(() => {
                                    const $property_property: s_target.resolver.Guaranteed_Value_Selection.start.type_.result.type_.state.property = p.change_context($['property'], ($) => p.change_context($['value'], ($) => $['l id']))
                                    return {
                                        'property': $property_property,
                                    }
                                })])
                                case 'optional value': return p.option($s, ($): s_target.resolver.Guaranteed_Value_Selection.start.type_.result => ['optional value', p.literal.group_resolve(() => {
                                    const $property_property: s_target.resolver.Guaranteed_Value_Selection.start.type_.result.type_.optional_value.property = p.change_context($['property'], ($) => p.change_context($['value'], ($) => $['l id']))
                                    return {
                                        'property': $property_property,
                                    }
                                })])
                                default: return p.exhaustive($s[0])
                            }
                        },
                    ))])
                    default: return p.exhaustive($s[0])
                }
            },
        )))
        const $property_tail: s_target.resolver.Guaranteed_Value_Selection.tail = p.change_context($['tail'], ($) => Relative_Value_Selection(
            $,
        ))
        return {
            'start': $property_start,
            'tail': $property_tail,
        }
    })
    
    export const Lookup_Selection: d.resolver.Lookup_Selection = ($) => p.literal.group_resolve(() => {
        const $property_type_: s_target.resolver.Lookup_Selection.type_ = p.change_context($['type'], ($) => p.change_context($['value'], ($) => p.from.state($).decide(
            ($s): s_target.resolver.Lookup_Selection.type_ => {
                switch ($s[0]) {
                    case 'acyclic': return p.option($s, ($): s_target.resolver.Lookup_Selection.type_ => ['acyclic', p.change_context($['value'], ($) => p.from.state($).decide(
                        ($s): s_target.resolver.Lookup_Selection.type_.type_.acyclic => {
                            switch ($s[0]) {
                                case 'siblings': return p.option($s, ($): s_target.resolver.Lookup_Selection.type_.type_.acyclic => ['siblings', p.change_context($['value'], ($) => null)])
                                case 'resolved dictionary': return p.option($s, ($): s_target.resolver.Lookup_Selection.type_.type_.acyclic => ['resolved dictionary', p.literal.group_resolve(() => {
                                    const $property_selection: s_target.resolver.Lookup_Selection.type_.type_.acyclic.type_.resolved_dictionary.selection = p.change_context($['selection'], ($) => p.change_context($['value'], ($) => Guaranteed_Value_Selection(
                                        $,
                                    )))
                                    return {
                                        'selection': $property_selection,
                                    }
                                })])
                                default: return p.exhaustive($s[0])
                            }
                        },
                    ))])
                    case 'cyclic': return p.option($s, ($): s_target.resolver.Lookup_Selection.type_ => ['cyclic', p.change_context($['value'], ($) => p.from.state($).decide(
                        ($s): s_target.resolver.Lookup_Selection.type_.type_.cyclic => {
                            switch ($s[0]) {
                                case 'siblings': return p.option($s, ($): s_target.resolver.Lookup_Selection.type_.type_.cyclic => ['siblings', p.change_context($['value'], ($) => null)])
                                default: return p.exhaustive($s[0])
                            }
                        },
                    ))])
                    case 'parameter': return p.option($s, ($): s_target.resolver.Lookup_Selection.type_ => ['parameter', $['l id']])
                    default: return p.exhaustive($s[0])
                }
            },
        )))
        return {
            'type': $property_type_,
        }
    })
    
    export const Reference_Constraints: d.resolver.Reference_Constraints = ($) => p.from.optional($).map(
        ($): s_target.resolver.Reference_Constraints.O => p.change_context($['value'], ($) => p.from.dictionary($).map(
            ($): s_target.resolver.Reference_Constraints.O.D => p.change_context($['value'], ($) => p.literal.group_resolve(() => {
                const $property_start: s_target.resolver.Reference_Constraints.O.D.start = p.change_context($['start'], ($) => p.change_context($['value'], ($) => p.from.state($).decide(
                    ($s): s_target.resolver.Reference_Constraints.O.D.start => {
                        switch ($s[0]) {
                            case 'value': return p.option($s, ($): s_target.resolver.Reference_Constraints.O.D.start => ['value', null])
                            case 'sibling': return p.option($s, ($): s_target.resolver.Reference_Constraints.O.D.start => ['sibling', $['l id']])
                            default: return p.exhaustive($s[0])
                        }
                    },
                )))
                const $property_constraint: s_target.resolver.Reference_Constraints.O.D.constraint = p.change_context($['constraint'], ($) => p.literal.group_resolve(() => {
                    const $property_selection: s_target.resolver.Reference_Constraints.O.D.constraint.selection = p.change_context($['selection'], ($) => Relative_Value_Selection(
                        $,
                    ))
                    const $property_type_: s_target.resolver.Reference_Constraints.O.D.constraint.type_ = p.change_context($['type'], ($) => p.change_context($['value'], ($) => p.from.state($).decide(
                        ($s): s_target.resolver.Reference_Constraints.O.D.constraint.type_ => {
                            switch ($s[0]) {
                                case 'state': return p.option($s, ($): s_target.resolver.Reference_Constraints.O.D.constraint.type_ => ['state', p.change_context($['value'], ($) => p.literal.group_resolve(() => {
                                    const $property_option: s_target.resolver.Reference_Constraints.O.D.constraint.type_.type_.state.option = p.change_context($['option'], ($) => $['l id'])
                                    return {
                                        'option': $property_option,
                                    }
                                }))])
                                case 'optional value': return p.option($s, ($): s_target.resolver.Reference_Constraints.O.D.constraint.type_ => ['optional value', p.change_context($['value'], ($) => null)])
                                default: return p.exhaustive($s[0])
                            }
                        },
                    )))
                    return {
                        'selection': $property_selection,
                        'type': $property_type_,
                    }
                }))
                return {
                    'start': $property_start,
                    'constraint': $property_constraint,
                }
            })),
        )),
    )
    
    export const Resolver: d.resolver.Resolver = ($) => p.literal.group_resolve(() => {
        const $property_namespaces: s_target.resolver.Resolver.namespaces = p.change_context($['namespaces'], ($) => p.from.dictionary($).map(
            ($): s_target.resolver.Resolver.namespaces.D => p.change_context($['value'], ($) => Resolver(
                $,
            )),
        ))
        const $property_types: s_target.resolver.Resolver.types = p.change_context($['types'], ($) => p.from.dictionary($).map(
            ($): s_target.resolver.Resolver.types.D => p.change_context($['value'], ($) => p.literal.group_resolve(() => {
                const $property_root_value_resolver: s_target.resolver.Resolver.types.D.root_value_resolver = p.change_context($['root value resolver'], ($) => Value(
                    $,
                ))
                return {
                    'root value resolver': $property_root_value_resolver,
                }
            })),
        ))
        return {
            'namespaces': $property_namespaces,
            'types': $property_types,
        }
    })
    
    export const Result_Selection: d.resolver.Result_Selection = ($) => p.change_context($['value'], ($) => p.from.state($).decide(
        ($s): s_target.resolver.Result_Selection => {
            switch ($s[0]) {
                case 'context': return p.option($s, ($): s_target.resolver.Result_Selection => ['context', Guaranteed_Value_Selection(
                    $,
                )])
                case 'value': return p.option($s, ($): s_target.resolver.Result_Selection => ['value', Relative_Value_Selection(
                    $,
                )])
                default: return p.exhaustive($s[0])
            }
        },
    ))
    
    export const Checks: d.resolver.Checks = ($) => p.from.optional($).map(
        ($): s_target.resolver.Checks.O => p.from.dictionary($).map(
            ($): s_target.resolver.Checks.O.D => p.literal.group_resolve(() => {
                const $property_expected: s_target.resolver.Checks.O.D.expected = p.change_context($['expected'], ($) => Result_Selection(
                    $,
                ))
                const $property_actual: s_target.resolver.Checks.O.D.actual = p.change_context($['actual'], ($) => Result_Selection(
                    $,
                ))
                return {
                    'expected': $property_expected,
                    'actual': $property_actual,
                }
            }),
        ),
    )
    
    export const Value: d.resolver.Value = ($) => p.from.state($).decide(
        ($s): s_target.resolver.Value => {
            switch ($s[0]) {
                case 'component': return p.option($s, ($): s_target.resolver.Value => ['component', p.change_context($['value'], ($) => p.literal.group_resolve(() => {
                    const $property_location: s_target.resolver.Value.type_.component.location = p.change_context($['location'], ($) => p.change_context($['value'], ($) => p.from.state($).decide(
                        ($s): s_target.resolver.Value.type_.component.location => {
                            switch ($s[0]) {
                                case 'local': return p.option($s, ($): s_target.resolver.Value.type_.component.location => ['local', $['l id']])
                                case 'child namespace': return p.option($s, ($): s_target.resolver.Value.type_.component.location => ['child namespace', p.literal.group_resolve(() => {
                                    const $property_namespace: s_target.resolver.Value.type_.component.location.type_.child_namespace.namespace = p.change_context($['namespace'], ($) => $['l id'])
                                    const $property_resolver: s_target.resolver.Value.type_.component.location.type_.child_namespace.resolver = p.change_context($['resolver'], ($) => p.change_context($['value'], ($) => $['l id']))
                                    return {
                                        'namespace': $property_namespace,
                                        'resolver': $property_resolver,
                                    }
                                })])
                                case 'sibling namespace': return p.option($s, ($): s_target.resolver.Value.type_.component.location => ['sibling namespace', p.change_context($['value'], ($) => p.literal.group_resolve(() => {
                                    const $property_namespace: s_target.resolver.Value.type_.component.location.type_.sibling_namespace.namespace = p.change_context($['namespace'], ($) => $['l id'])
                                    const $property_resolver: s_target.resolver.Value.type_.component.location.type_.sibling_namespace.resolver = p.change_context($['resolver'], ($) => p.change_context($['value'], ($) => $['l id']))
                                    return {
                                        'namespace': $property_namespace,
                                        'resolver': $property_resolver,
                                    }
                                }))])
                                default: return p.exhaustive($s[0])
                            }
                        },
                    )))
                    const $property_arguments_: s_target.resolver.Value.type_.component.arguments_ = p.change_context($['arguments'], ($) => p.from.optional($).map(
                        ($): s_target.resolver.Value.type_.component.arguments_.O => p.literal.group_resolve(() => {
                            const $property_types: s_target.resolver.Value.type_.component.arguments_.O.types = p.change_context($['types'], ($) => p.from.optional($).map(
                                ($): s_target.resolver.Value.type_.component.arguments_.O.types.O => p.from.dictionary($).map(
                                    ($): s_target.resolver.Value.type_.component.arguments_.O.types.O.D => p.change_context($['value'], ($) => p.from.state($).decide(
                                        ($s): s_target.resolver.Value.type_.component.arguments_.O.types.O.D => {
                                            switch ($s[0]) {
                                                case 'optional': return p.option($s, ($): s_target.resolver.Value.type_.component.arguments_.O.types.O.D => ['optional', p.from.state($).decide(
                                                    ($s): s_target.resolver.Value.type_.component.arguments_.O.types.O.D.type_.optional => {
                                                        switch ($s[0]) {
                                                            case 'not set': return p.option($s, ($): s_target.resolver.Value.type_.component.arguments_.O.types.O.D.type_.optional => ['not set', null])
                                                            case 'set': return p.option($s, ($): s_target.resolver.Value.type_.component.arguments_.O.types.O.D.type_.optional => ['set', Guaranteed_Value_Selection(
                                                                $,
                                                            )])
                                                            case 'selection': return p.option($s, ($): s_target.resolver.Value.type_.component.arguments_.O.types.O.D.type_.optional => ['selection', Possible_Value_Selection(
                                                                $,
                                                            )])
                                                            default: return p.exhaustive($s[0])
                                                        }
                                                    },
                                                )])
                                                case 'required': return p.option($s, ($): s_target.resolver.Value.type_.component.arguments_.O.types.O.D => ['required', Guaranteed_Value_Selection(
                                                    $,
                                                )])
                                                case 'parameter': return p.option($s, ($): s_target.resolver.Value.type_.component.arguments_.O.types.O.D => ['parameter', $['l id']])
                                                default: return p.exhaustive($s[0])
                                            }
                                        },
                                    )),
                                ),
                            ))
                            const $property_lookups: s_target.resolver.Value.type_.component.arguments_.O.lookups = p.change_context($['lookups'], ($) => p.from.optional($).map(
                                ($): s_target.resolver.Value.type_.component.arguments_.O.lookups.O => p.from.dictionary($).map(
                                    ($): s_target.resolver.Value.type_.component.arguments_.O.lookups.O.D => p.change_context($['value'], ($) => p.from.state($).decide(
                                        ($s): s_target.resolver.Value.type_.component.arguments_.O.lookups.O.D => {
                                            switch ($s[0]) {
                                                case 'acyclic': return p.option($s, ($): s_target.resolver.Value.type_.component.arguments_.O.lookups.O.D => ['acyclic', null])
                                                case 'cyclic': return p.option($s, ($): s_target.resolver.Value.type_.component.arguments_.O.lookups.O.D => ['cyclic', null])
                                                case 'selection': return p.option($s, ($): s_target.resolver.Value.type_.component.arguments_.O.lookups.O.D => ['selection', Lookup_Selection(
                                                    $,
                                                )])
                                                default: return p.exhaustive($s[0])
                                            }
                                        },
                                    )),
                                ),
                            ))
                            return {
                                'types': $property_types,
                                'lookups': $property_lookups,
                            }
                        }),
                    ))
                    const $property_constraints: s_target.resolver.Value.type_.component.constraints = p.change_context($['constraints'], ($) => Reference_Constraints(
                        $,
                    ))
                    return {
                        'location': $property_location,
                        'arguments': $property_arguments_,
                        'constraints': $property_constraints,
                    }
                }))])
                case 'dictionary': return p.option($s, ($): s_target.resolver.Value => ['dictionary', p.change_context($['value'], ($) => p.literal.group_resolve(() => {
                    const $property_resolver: s_target.resolver.Value.type_.dictionary.resolver = p.change_context($['resolver'], ($) => Value(
                        $,
                    ))
                    const $property_benchmark: s_target.resolver.Value.type_.dictionary.benchmark = p.change_context($['benchmark'], ($) => p.from.optional($).map(
                        ($): s_target.resolver.Value.type_.dictionary.benchmark.O => p.change_context($['value'], ($) => p.literal.group_resolve(() => {
                            const $property_selection: s_target.resolver.Value.type_.dictionary.benchmark.O.selection = p.change_context($['selection'], ($) => p.change_context($['value'], ($) => Guaranteed_Value_Selection(
                                $,
                            )))
                            return {
                                'selection': $property_selection,
                            }
                        })),
                    ))
                    return {
                        'resolver': $property_resolver,
                        'benchmark': $property_benchmark,
                    }
                }))])
                case 'group': return p.option($s, ($): s_target.resolver.Value => ['group', p.change_context($['value'], ($) => p.from.dictionary($).map(
                    ($): s_target.resolver.Value.type_.group.D => p.change_context($['value'], ($) => p.literal.group_resolve(() => {
                        const $property_resolver: s_target.resolver.Value.type_.group.D.resolver = p.change_context($['resolver'], ($) => Value(
                            $,
                        ))
                        return {
                            'resolver': $property_resolver,
                        }
                    })),
                ))])
                case 'list': return p.option($s, ($): s_target.resolver.Value => ['list', p.change_context($['value'], ($) => p.literal.group_resolve(() => {
                    const $property_resolver: s_target.resolver.Value.type_.list.resolver = p.change_context($['resolver'], ($) => Value(
                        $,
                    ))
                    const $property_result: s_target.resolver.Value.type_.list.result = p.change_context($['result'], ($) => p.from.optional($).map(
                        ($): s_target.resolver.Value.type_.list.result.O => p.change_context($['value'], ($) => p.literal.group_resolve(() => {
                            const $property_initial: s_target.resolver.Value.type_.list.result.O.initial = p.change_context($['initial'], ($) => Guaranteed_Value_Selection(
                                $,
                            ))
                            const $property_next: s_target.resolver.Value.type_.list.result.O.next = p.change_context($['next'], ($) => Result_Selection(
                                $,
                            ))
                            return {
                                'initial': $property_initial,
                                'next': $property_next,
                            }
                        })),
                    ))
                    return {
                        'resolver': $property_resolver,
                        'result': $property_result,
                    }
                }))])
                case 'nothing': return p.option($s, ($): s_target.resolver.Value => ['nothing', p.change_context($['value'], ($) => null)])
                case 'simple': return p.option($s, ($): s_target.resolver.Value => ['simple', p.change_context($['value'], ($) => null)])
                case 'optional': return p.option($s, ($): s_target.resolver.Value => ['optional', p.change_context($['value'], ($) => p.literal.group_resolve(() => {
                    const $property_presence: s_target.resolver.Value.type_.optional.presence = p.change_context($['presence'], ($) => p.from.optional($).map(
                        ($): s_target.resolver.Value.type_.optional.presence.O => Possible_Value_Selection(
                            $,
                        ),
                    ))
                    const $property_constraints: s_target.resolver.Value.type_.optional.constraints = p.change_context($['constraints'], ($) => Option_Constraints(
                        $,
                    ))
                    const $property_resolver: s_target.resolver.Value.type_.optional.resolver = p.change_context($['resolver'], ($) => Value(
                        $,
                    ))
                    const $property_not_set_constraints: s_target.resolver.Value.type_.optional.not_set_constraints = p.change_context($['not set constraints'], ($) => p.from.optional($).map(
                        ($): s_target.resolver.Value.type_.optional.not_set_constraints.O => p.from.dictionary($).map(
                            ($): s_target.resolver.Value.type_.optional.not_set_constraints.O.D => Possible_Value_Selection(
                                $,
                            ),
                        ),
                    ))
                    const $property_result: s_target.resolver.Value.type_.optional.result = p.change_context($['result'], ($) => p.from.optional($).map(
                        ($): s_target.resolver.Value.type_.optional.result.O => p.change_context($['value'], ($) => Result_Selection(
                            $,
                        )),
                    ))
                    const $property_checks: s_target.resolver.Value.type_.optional.checks = p.change_context($['checks'], ($) => Checks(
                        $,
                    ))
                    return {
                        'presence': $property_presence,
                        'constraints': $property_constraints,
                        'resolver': $property_resolver,
                        'not set constraints': $property_not_set_constraints,
                        'result': $property_result,
                        'checks': $property_checks,
                    }
                }))])
                case 'reference': return p.option($s, ($): s_target.resolver.Value => ['reference', p.change_context($['value'], ($) => p.literal.group_resolve(() => {
                    const $property_type_: s_target.resolver.Value.type_.reference.type_ = p.change_context($['type'], ($) => p.literal.group_resolve(() => {
                        const $property_lookup: s_target.resolver.Value.type_.reference.type_.lookup = p.change_context($['lookup'], ($) => Lookup_Selection(
                            $,
                        ))
                        const $property_constraints: s_target.resolver.Value.type_.reference.type_.constraints = p.change_context($['constraints'], ($) => Reference_Constraints(
                            $,
                        ))
                        return {
                            'lookup': $property_lookup,
                            'constraints': $property_constraints,
                        }
                    }))
                    return {
                        'type': $property_type_,
                    }
                }))])
                case 'state': return p.option($s, ($): s_target.resolver.Value => ['state', p.change_context($['value'], ($) => p.literal.group_resolve(() => {
                    const $property_options: s_target.resolver.Value.type_.state.options = p.change_context($['options'], ($) => p.from.dictionary($).map(
                        ($): s_target.resolver.Value.type_.state.options.D => p.change_context($['value'], ($) => p.literal.group_resolve(() => {
                            const $property_constraints: s_target.resolver.Value.type_.state.options.D.constraints = p.change_context($['constraints'], ($) => Option_Constraints(
                                $,
                            ))
                            const $property_resolver: s_target.resolver.Value.type_.state.options.D.resolver = p.change_context($['resolver'], ($) => Value(
                                $,
                            ))
                            const $property_result: s_target.resolver.Value.type_.state.options.D.result = p.change_context($['result'], ($) => p.from.optional($).map(
                                ($): s_target.resolver.Value.type_.state.options.D.result.O => p.change_context($['value'], ($) => Result_Selection(
                                    $,
                                )),
                            ))
                            const $property_checks: s_target.resolver.Value.type_.state.options.D.checks = p.change_context($['checks'], ($) => Checks(
                                $,
                            ))
                            return {
                                'constraints': $property_constraints,
                                'resolver': $property_resolver,
                                'result': $property_result,
                                'checks': $property_checks,
                            }
                        })),
                    ))
                    return {
                        'options': $property_options,
                    }
                }))])
                default: return p.exhaustive($s[0])
            }
        },
    )
}
