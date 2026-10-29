import * as p from 'pareto-core/transformer'

import type * as d from "../../../../declarations/schemas/unresolved/downtransformers/marshal.js"

import type * as s_target from "../../../../structure/schemas/astn_document.js"

export namespace temp_pareto_core {
    export const group_resolve_with_dependencies = <Dependencies, Result>(dependencies: Dependencies, resolve: ($parent_captures: Dependencies) => Result): Result => resolve(dependencies)
}

export const Directory: d.Directory = ($) => p.from.state($).decide(
    ($s): s_target.Value => {
        switch ($s[0]) {
            case 'group': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                    const $property_option: s_target.Value.type_.type_.state.option = 'group'
                    const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                        const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                            const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                {
                                    'nodes': p.change_context($['nodes'], ($) => p.literal.group_resolve(() => {
                                        const $property_type_: s_target.Value.type_ = ['dictionary', p.literal.group_resolve(() => {
                                            const $property_entries: s_target.Value.type_.type_.dictionary.entries = p.from.dictionary($).map(
                                                ($): s_target.Value.type_.type_.dictionary.entries.D => Node(
                                                    $,
                                                ),
                                            )
                                            return {
                                                'entries': $property_entries,
                                            }
                                        })]
                                        return {
                                            'type': $property_type_,
                                        }
                                    })),
                                },
                            )
                            return {
                                'properties': $property_properties,
                            }
                        })]
                        return {
                            'type': $property_type_,
                        }
                    })
                    return {
                        'option': $property_option,
                        'value': $property_value,
                    }
                })]
                return {
                    'type': $property_type_,
                }
            }))
            case 'dictionary': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                    const $property_option: s_target.Value.type_.type_.state.option = 'dictionary'
                    const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                        const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                            const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                {
                                    'node': p.change_context($['node'], ($) => Node(
                                        $,
                                    )),
                                },
                            )
                            return {
                                'properties': $property_properties,
                            }
                        })]
                        return {
                            'type': $property_type_,
                        }
                    })
                    return {
                        'option': $property_option,
                        'value': $property_value,
                    }
                })]
                return {
                    'type': $property_type_,
                }
            }))
            default: return p.exhaustive($s[0])
        }
    },
)

export const Node: d.Node = ($) => p.from.state($).decide(
    ($s): s_target.Value => {
        switch ($s[0]) {
            case 'file': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                    const $property_option: s_target.Value.type_.type_.state.option = 'file'
                    const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                        const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                            const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                {
                                    'file extension': p.change_context($['file extension'], ($) => p.literal.group_resolve(() => {
                                        const $property_type_: s_target.Value.type_ = ['text', $]
                                        return {
                                            'type': $property_type_,
                                        }
                                    })),
                                    'type': p.change_context($['type'], ($) => p.literal.group_resolve(() => {
                                        const $property_type_: s_target.Value.type_ = ['reference', $]
                                        return {
                                            'type': $property_type_,
                                        }
                                    })),
                                },
                            )
                            return {
                                'properties': $property_properties,
                            }
                        })]
                        return {
                            'type': $property_type_,
                        }
                    })
                    return {
                        'option': $property_option,
                        'value': $property_value,
                    }
                })]
                return {
                    'type': $property_type_,
                }
            }))
            case 'directory': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                    const $property_option: s_target.Value.type_.type_.state.option = 'directory'
                    const $property_value: s_target.Value.type_.type_.state.value = Directory(
                        $,
                    )
                    return {
                        'option': $property_option,
                        'value': $property_value,
                    }
                })]
                return {
                    'type': $property_type_,
                }
            }))
            default: return p.exhaustive($s[0])
        }
    },
)

export const Type_Specification: d.Type_Specification = ($) => p.literal.group_resolve(() => {
    const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
        const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
            {
                'schema': p.change_context($['schema'], ($) => p.literal.group_resolve(() => {
                    const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                        const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                            {
                                'structure': p.change_context($['structure'], ($) => structure.Structure(
                                    $,
                                )),
                                'resolver': p.change_context($['resolver'], ($) => p.literal.group_resolve(() => {
                                    const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                        const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                            {
                                                'declarations': p.change_context($['declarations'], ($) => declarations.Declaration_Namespace(
                                                    $,
                                                )),
                                                'implementations': p.change_context($['implementations'], ($) => resolver.Resolver(
                                                    $,
                                                )),
                                            },
                                        )
                                        return {
                                            'properties': $property_properties,
                                        }
                                    })]
                                    return {
                                        'type': $property_type_,
                                    }
                                })),
                            },
                        )
                        return {
                            'properties': $property_properties,
                        }
                    })]
                    return {
                        'type': $property_type_,
                    }
                })),
                'directory': p.change_context($['directory'], ($) => Directory(
                    $,
                )),
            },
        )
        return {
            'properties': $property_properties,
        }
    })]
    return {
        'type': $property_type_,
    }
})

export namespace structure {
    
    export const Basic_Types: d.structure.Basic_Types = ($) => p.literal.group_resolve(() => {
        const $property_type_: s_target.Value.type_ = ['dictionary', p.literal.group_resolve(() => {
            const $property_entries: s_target.Value.type_.type_.dictionary.entries = p.from.dictionary($).map(
                ($): s_target.Value.type_.type_.dictionary.entries.D => p.literal.group_resolve(() => {
                    const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                        const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                            {
                                'type': p.change_context($['type'], ($) => p.from.state($).decide(
                                    ($s): s_target.Value => {
                                        switch ($s[0]) {
                                            case 'double quoted': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                    const $property_option: s_target.Value.type_.type_.state.option = 'double quoted'
                                                    const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                        const $property_type_: s_target.Value.type_ = ['nothing', null]
                                                        return {
                                                            'type': $property_type_,
                                                        }
                                                    })
                                                    return {
                                                        'option': $property_option,
                                                        'value': $property_value,
                                                    }
                                                })]
                                                return {
                                                    'type': $property_type_,
                                                }
                                            }))
                                            case 'undelimited': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                    const $property_option: s_target.Value.type_.type_.state.option = 'undelimited'
                                                    const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                        const $property_type_: s_target.Value.type_ = ['nothing', null]
                                                        return {
                                                            'type': $property_type_,
                                                        }
                                                    })
                                                    return {
                                                        'option': $property_option,
                                                        'value': $property_value,
                                                    }
                                                })]
                                                return {
                                                    'type': $property_type_,
                                                }
                                            }))
                                            default: return p.exhaustive($s[0])
                                        }
                                    },
                                )),
                                'regular expression': p.change_context($['regular expression'], ($) => p.literal.group_resolve(() => {
                                    const $property_type_: s_target.Value.type_ = ['optional', p.from.optional($).map(
                                        ($): s_target.Value.type_.type_.optional.O => Regular_Expression(
                                            $,
                                        ),
                                    )]
                                    return {
                                        'type': $property_type_,
                                    }
                                })),
                                'hyperlink': p.change_context($['hyperlink'], ($) => p.literal.group_resolve(() => {
                                    const $property_type_: s_target.Value.type_ = ['optional', p.from.optional($).map(
                                        ($): s_target.Value.type_.type_.optional.O => p.literal.group_resolve(() => {
                                            const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                                const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                                    {
                                                        'prefix': p.change_context($['prefix'], ($) => p.literal.group_resolve(() => {
                                                            const $property_type_: s_target.Value.type_ = ['text', $]
                                                            return {
                                                                'type': $property_type_,
                                                            }
                                                        })),
                                                        'suffix': p.change_context($['suffix'], ($) => p.literal.group_resolve(() => {
                                                            const $property_type_: s_target.Value.type_ = ['text', $]
                                                            return {
                                                                'type': $property_type_,
                                                            }
                                                        })),
                                                    },
                                                )
                                                return {
                                                    'properties': $property_properties,
                                                }
                                            })]
                                            return {
                                                'type': $property_type_,
                                            }
                                        }),
                                    )]
                                    return {
                                        'type': $property_type_,
                                    }
                                })),
                            },
                        )
                        return {
                            'properties': $property_properties,
                        }
                    })]
                    return {
                        'type': $property_type_,
                    }
                }),
            )
            return {
                'entries': $property_entries,
            }
        })]
        return {
            'type': $property_type_,
        }
    })
    
    export const Types: d.structure.Types = ($) => p.literal.group_resolve(() => {
        const $property_type_: s_target.Value.type_ = ['dictionary', p.literal.group_resolve(() => {
            const $property_entries: s_target.Value.type_.type_.dictionary.entries = p.from.dictionary($).map(
                ($): s_target.Value.type_.type_.dictionary.entries.D => Type(
                    $,
                ),
            )
            return {
                'entries': $property_entries,
            }
        })]
        return {
            'type': $property_type_,
        }
    })
    
    export const Namespaces: d.structure.Namespaces = ($) => p.literal.group_resolve(() => {
        const $property_type_: s_target.Value.type_ = ['dictionary', p.literal.group_resolve(() => {
            const $property_entries: s_target.Value.type_.type_.dictionary.entries = p.from.dictionary($).map(
                ($): s_target.Value.type_.type_.dictionary.entries.D => Structure(
                    $,
                ),
            )
            return {
                'entries': $property_entries,
            }
        })]
        return {
            'type': $property_type_,
        }
    })
    
    export const Type: d.structure.Type = ($) => p.literal.group_resolve(() => {
        const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
            const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                {
                    'visibility': p.change_context($['visibility'], ($) => p.from.state($).decide(
                        ($s): s_target.Value => {
                            switch ($s[0]) {
                                case 'private': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                        const $property_option: s_target.Value.type_.type_.state.option = 'private'
                                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                            const $property_type_: s_target.Value.type_ = ['nothing', null]
                                            return {
                                                'type': $property_type_,
                                            }
                                        })
                                        return {
                                            'option': $property_option,
                                            'value': $property_value,
                                        }
                                    })]
                                    return {
                                        'type': $property_type_,
                                    }
                                }))
                                case 'private single use': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                        const $property_option: s_target.Value.type_.type_.state.option = 'private single use'
                                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                            const $property_type_: s_target.Value.type_ = ['nothing', null]
                                            return {
                                                'type': $property_type_,
                                            }
                                        })
                                        return {
                                            'option': $property_option,
                                            'value': $property_value,
                                        }
                                    })]
                                    return {
                                        'type': $property_type_,
                                    }
                                }))
                                case 'public': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                        const $property_option: s_target.Value.type_.type_.state.option = 'public'
                                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                            const $property_type_: s_target.Value.type_ = ['nothing', null]
                                            return {
                                                'type': $property_type_,
                                            }
                                        })
                                        return {
                                            'option': $property_option,
                                            'value': $property_value,
                                        }
                                    })]
                                    return {
                                        'type': $property_type_,
                                    }
                                }))
                                default: return p.exhaustive($s[0])
                            }
                        },
                    )),
                    'root value': p.change_context($['root value'], ($) => Value(
                        $,
                    )),
                },
            )
            return {
                'properties': $property_properties,
            }
        })]
        return {
            'type': $property_type_,
        }
    })
    
    export const Group: d.structure.Group = ($) => p.literal.group_resolve(() => {
        const $property_type_: s_target.Value.type_ = ['dictionary', p.literal.group_resolve(() => {
            const $property_entries: s_target.Value.type_.type_.dictionary.entries = p.from.dictionary($).map(
                ($): s_target.Value.type_.type_.dictionary.entries.D => p.literal.group_resolve(() => {
                    const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                        const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                            {
                                'description': p.change_context($['description'], ($) => p.literal.group_resolve(() => {
                                    const $property_type_: s_target.Value.type_ = ['optional', p.from.optional($).map(
                                        ($): s_target.Value.type_.type_.optional.O => p.literal.group_resolve(() => {
                                            const $property_type_: s_target.Value.type_ = ['text', $]
                                            return {
                                                'type': $property_type_,
                                            }
                                        }),
                                    )]
                                    return {
                                        'type': $property_type_,
                                    }
                                })),
                                'value': p.change_context($['value'], ($) => Value(
                                    $,
                                )),
                            },
                        )
                        return {
                            'properties': $property_properties,
                        }
                    })]
                    return {
                        'type': $property_type_,
                    }
                }),
            )
            return {
                'entries': $property_entries,
            }
        })]
        return {
            'type': $property_type_,
        }
    })
    
    export const Value: d.structure.Value = ($) => p.from.state($).decide(
        ($s): s_target.Value => {
            switch ($s[0]) {
                case 'component': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                        const $property_option: s_target.Value.type_.type_.state.option = 'component'
                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                            const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                    {
                                        'type': p.change_context($['type'], ($) => p.from.state($).decide(
                                            ($s): s_target.Value => {
                                                switch ($s[0]) {
                                                    case 'simple': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                        const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                            const $property_option: s_target.Value.type_.type_.state.option = 'simple'
                                                            const $property_value: s_target.Value.type_.type_.state.value = p.from.state($).decide(
                                                                ($s): s_target.Value => {
                                                                    switch ($s[0]) {
                                                                        case 'local': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                                            const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                                                const $property_option: s_target.Value.type_.type_.state.option = 'local'
                                                                                const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                                    const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                                    return {
                                                                                        'type': $property_type_,
                                                                                    }
                                                                                })
                                                                                return {
                                                                                    'option': $property_option,
                                                                                    'value': $property_value,
                                                                                }
                                                                            })]
                                                                            return {
                                                                                'type': $property_type_,
                                                                            }
                                                                        }))
                                                                        case 'child namespace': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                                            const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                                                const $property_option: s_target.Value.type_.type_.state.option = 'child namespace'
                                                                                const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                                    const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                                                                        const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                                                                            {
                                                                                                'namespace': p.change_context($['namespace'], ($) => p.literal.group_resolve(() => {
                                                                                                    const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                                                    return {
                                                                                                        'type': $property_type_,
                                                                                                    }
                                                                                                })),
                                                                                                'type': p.change_context($['type'], ($) => p.literal.group_resolve(() => {
                                                                                                    const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                                                    return {
                                                                                                        'type': $property_type_,
                                                                                                    }
                                                                                                })),
                                                                                            },
                                                                                        )
                                                                                        return {
                                                                                            'properties': $property_properties,
                                                                                        }
                                                                                    })]
                                                                                    return {
                                                                                        'type': $property_type_,
                                                                                    }
                                                                                })
                                                                                return {
                                                                                    'option': $property_option,
                                                                                    'value': $property_value,
                                                                                }
                                                                            })]
                                                                            return {
                                                                                'type': $property_type_,
                                                                            }
                                                                        }))
                                                                        case 'sibling namespace': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                                            const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                                                const $property_option: s_target.Value.type_.type_.state.option = 'sibling namespace'
                                                                                const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                                    const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                                                                        const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                                                                            {
                                                                                                'namespace': p.change_context($['namespace'], ($) => p.literal.group_resolve(() => {
                                                                                                    const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                                                    return {
                                                                                                        'type': $property_type_,
                                                                                                    }
                                                                                                })),
                                                                                                'type': p.change_context($['type'], ($) => p.literal.group_resolve(() => {
                                                                                                    const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                                                    return {
                                                                                                        'type': $property_type_,
                                                                                                    }
                                                                                                })),
                                                                                            },
                                                                                        )
                                                                                        return {
                                                                                            'properties': $property_properties,
                                                                                        }
                                                                                    })]
                                                                                    return {
                                                                                        'type': $property_type_,
                                                                                    }
                                                                                })
                                                                                return {
                                                                                    'option': $property_option,
                                                                                    'value': $property_value,
                                                                                }
                                                                            })]
                                                                            return {
                                                                                'type': $property_type_,
                                                                            }
                                                                        }))
                                                                        default: return p.exhaustive($s[0])
                                                                    }
                                                                },
                                                            )
                                                            return {
                                                                'option': $property_option,
                                                                'value': $property_value,
                                                            }
                                                        })]
                                                        return {
                                                            'type': $property_type_,
                                                        }
                                                    }))
                                                    case 'cyclic': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                        const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                            const $property_option: s_target.Value.type_.type_.state.option = 'cyclic'
                                                            const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                return {
                                                                    'type': $property_type_,
                                                                }
                                                            })
                                                            return {
                                                                'option': $property_option,
                                                                'value': $property_value,
                                                            }
                                                        })]
                                                        return {
                                                            'type': $property_type_,
                                                        }
                                                    }))
                                                    default: return p.exhaustive($s[0])
                                                }
                                            },
                                        )),
                                        'constraints': p.change_context($['constraints'], ($) => Reference_Constraints(
                                            $,
                                        )),
                                    },
                                )
                                return {
                                    'properties': $property_properties,
                                }
                            })]
                            return {
                                'type': $property_type_,
                            }
                        })
                        return {
                            'option': $property_option,
                            'value': $property_value,
                        }
                    })]
                    return {
                        'type': $property_type_,
                    }
                }))
                case 'dictionary': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                        const $property_option: s_target.Value.type_.type_.state.option = 'dictionary'
                        const $property_value: s_target.Value.type_.type_.state.value = Dictionary(
                            $,
                        )
                        return {
                            'option': $property_option,
                            'value': $property_value,
                        }
                    })]
                    return {
                        'type': $property_type_,
                    }
                }))
                case 'group': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                        const $property_option: s_target.Value.type_.type_.state.option = 'group'
                        const $property_value: s_target.Value.type_.type_.state.value = Group(
                            $,
                        )
                        return {
                            'option': $property_option,
                            'value': $property_value,
                        }
                    })]
                    return {
                        'type': $property_type_,
                    }
                }))
                case 'list': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                        const $property_option: s_target.Value.type_.type_.state.option = 'list'
                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                            const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                    {
                                        'value': p.change_context($['value'], ($) => Value(
                                            $,
                                        )),
                                        'result': p.change_context($['result'], ($) => Value_Result(
                                            $,
                                        )),
                                    },
                                )
                                return {
                                    'properties': $property_properties,
                                }
                            })]
                            return {
                                'type': $property_type_,
                            }
                        })
                        return {
                            'option': $property_option,
                            'value': $property_value,
                        }
                    })]
                    return {
                        'type': $property_type_,
                    }
                }))
                case 'nothing': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                        const $property_option: s_target.Value.type_.type_.state.option = 'nothing'
                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                            const $property_type_: s_target.Value.type_ = ['nothing', null]
                            return {
                                'type': $property_type_,
                            }
                        })
                        return {
                            'option': $property_option,
                            'value': $property_value,
                        }
                    })]
                    return {
                        'type': $property_type_,
                    }
                }))
                case 'simple': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                        const $property_option: s_target.Value.type_.type_.state.option = 'simple'
                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                            const $property_type_: s_target.Value.type_ = ['reference', $]
                            return {
                                'type': $property_type_,
                            }
                        })
                        return {
                            'option': $property_option,
                            'value': $property_value,
                        }
                    })]
                    return {
                        'type': $property_type_,
                    }
                }))
                case 'optional': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                        const $property_option: s_target.Value.type_.type_.state.option = 'optional'
                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                            const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                    {
                                        'constraints': p.change_context($['constraints'], ($) => Option_Constraints(
                                            $,
                                        )),
                                        'value': p.change_context($['value'], ($) => Value(
                                            $,
                                        )),
                                        'result': p.change_context($['result'], ($) => Value_Result(
                                            $,
                                        )),
                                    },
                                )
                                return {
                                    'properties': $property_properties,
                                }
                            })]
                            return {
                                'type': $property_type_,
                            }
                        })
                        return {
                            'option': $property_option,
                            'value': $property_value,
                        }
                    })]
                    return {
                        'type': $property_type_,
                    }
                }))
                case 'reference': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                        const $property_option: s_target.Value.type_.type_.state.option = 'reference'
                        const $property_value: s_target.Value.type_.type_.state.value = Reference(
                            $,
                        )
                        return {
                            'option': $property_option,
                            'value': $property_value,
                        }
                    })]
                    return {
                        'type': $property_type_,
                    }
                }))
                case 'state': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                        const $property_option: s_target.Value.type_.type_.state.option = 'state'
                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                            const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                    {
                                        'options': p.change_context($['options'], ($) => p.literal.group_resolve(() => {
                                            const $property_type_: s_target.Value.type_ = ['dictionary', p.literal.group_resolve(() => {
                                                const $property_entries: s_target.Value.type_.type_.dictionary.entries = p.from.dictionary($).map(
                                                    ($): s_target.Value.type_.type_.dictionary.entries.D => p.literal.group_resolve(() => {
                                                        const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                                            const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                                                {
                                                                    'description': p.change_context($['description'], ($) => p.literal.group_resolve(() => {
                                                                        const $property_type_: s_target.Value.type_ = ['optional', p.from.optional($).map(
                                                                            ($): s_target.Value.type_.type_.optional.O => p.literal.group_resolve(() => {
                                                                                const $property_type_: s_target.Value.type_ = ['text', $]
                                                                                return {
                                                                                    'type': $property_type_,
                                                                                }
                                                                            }),
                                                                        )]
                                                                        return {
                                                                            'type': $property_type_,
                                                                        }
                                                                    })),
                                                                    'constraints': p.change_context($['constraints'], ($) => Option_Constraints(
                                                                        $,
                                                                    )),
                                                                    'value': p.change_context($['value'], ($) => Value(
                                                                        $,
                                                                    )),
                                                                },
                                                            )
                                                            return {
                                                                'properties': $property_properties,
                                                            }
                                                        })]
                                                        return {
                                                            'type': $property_type_,
                                                        }
                                                    }),
                                                )
                                                return {
                                                    'entries': $property_entries,
                                                }
                                            })]
                                            return {
                                                'type': $property_type_,
                                            }
                                        })),
                                        'result': p.change_context($['result'], ($) => Value_Result(
                                            $,
                                        )),
                                    },
                                )
                                return {
                                    'properties': $property_properties,
                                }
                            })]
                            return {
                                'type': $property_type_,
                            }
                        })
                        return {
                            'option': $property_option,
                            'value': $property_value,
                        }
                    })]
                    return {
                        'type': $property_type_,
                    }
                }))
                default: return p.exhaustive($s[0])
            }
        },
    )
    
    export const Dictionary: d.structure.Dictionary = ($) => p.literal.group_resolve(() => {
        const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
            const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                {
                    'benchmark': p.change_context($['benchmark'], ($) => p.literal.group_resolve(() => {
                        const $property_type_: s_target.Value.type_ = ['optional', p.from.optional($).map(
                            ($): s_target.Value.type_.type_.optional.O => p.literal.group_resolve(() => {
                                const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                    const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                        {
                                            'selection': p.change_context($['selection'], ($) => Value_Reference(
                                                $,
                                            )),
                                            'coverage': p.change_context($['coverage'], ($) => p.from.state($).decide(
                                                ($s): s_target.Value => {
                                                    switch ($s[0]) {
                                                        case 'dense': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                            const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                                const $property_option: s_target.Value.type_.type_.state.option = 'dense'
                                                                const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                    const $property_type_: s_target.Value.type_ = ['nothing', null]
                                                                    return {
                                                                        'type': $property_type_,
                                                                    }
                                                                })
                                                                return {
                                                                    'option': $property_option,
                                                                    'value': $property_value,
                                                                }
                                                            })]
                                                            return {
                                                                'type': $property_type_,
                                                            }
                                                        }))
                                                        case 'sparse': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                            const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                                const $property_option: s_target.Value.type_.type_.state.option = 'sparse'
                                                                const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                    const $property_type_: s_target.Value.type_ = ['nothing', null]
                                                                    return {
                                                                        'type': $property_type_,
                                                                    }
                                                                })
                                                                return {
                                                                    'option': $property_option,
                                                                    'value': $property_value,
                                                                }
                                                            })]
                                                            return {
                                                                'type': $property_type_,
                                                            }
                                                        }))
                                                        default: return p.exhaustive($s[0])
                                                    }
                                                },
                                            )),
                                        },
                                    )
                                    return {
                                        'properties': $property_properties,
                                    }
                                })]
                                return {
                                    'type': $property_type_,
                                }
                            }),
                        )]
                        return {
                            'type': $property_type_,
                        }
                    })),
                    'value': p.change_context($['value'], ($) => Value(
                        $,
                    )),
                },
            )
            return {
                'properties': $property_properties,
            }
        })]
        return {
            'type': $property_type_,
        }
    })
    
    export const Value_Reference: d.structure.Value_Reference = ($) => p.literal.group_resolve(() => {
        const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
            const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                {
                    'type': p.change_context($['type'], ($) => p.literal.group_resolve(() => {
                        const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                            const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                {
                                    'location': p.change_context($['location'], ($) => p.from.state($).decide(
                                        ($s): s_target.Value => {
                                            switch ($s[0]) {
                                                case 'local': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                        const $property_option: s_target.Value.type_.type_.state.option = 'local'
                                                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                            const $property_type_: s_target.Value.type_ = ['reference', $]
                                                            return {
                                                                'type': $property_type_,
                                                            }
                                                        })
                                                        return {
                                                            'option': $property_option,
                                                            'value': $property_value,
                                                        }
                                                    })]
                                                    return {
                                                        'type': $property_type_,
                                                    }
                                                }))
                                                case 'child namespace': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                        const $property_option: s_target.Value.type_.type_.state.option = 'child namespace'
                                                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                            const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                                                const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                                                    {
                                                                        'namespace': p.change_context($['namespace'], ($) => p.literal.group_resolve(() => {
                                                                            const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                            return {
                                                                                'type': $property_type_,
                                                                            }
                                                                        })),
                                                                        'type': p.change_context($['type'], ($) => p.literal.group_resolve(() => {
                                                                            const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                            return {
                                                                                'type': $property_type_,
                                                                            }
                                                                        })),
                                                                    },
                                                                )
                                                                return {
                                                                    'properties': $property_properties,
                                                                }
                                                            })]
                                                            return {
                                                                'type': $property_type_,
                                                            }
                                                        })
                                                        return {
                                                            'option': $property_option,
                                                            'value': $property_value,
                                                        }
                                                    })]
                                                    return {
                                                        'type': $property_type_,
                                                    }
                                                }))
                                                case 'sibling namespace': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                        const $property_option: s_target.Value.type_.type_.state.option = 'sibling namespace'
                                                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                            const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                                                const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                                                    {
                                                                        'namespace': p.change_context($['namespace'], ($) => p.literal.group_resolve(() => {
                                                                            const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                            return {
                                                                                'type': $property_type_,
                                                                            }
                                                                        })),
                                                                        'type': p.change_context($['type'], ($) => p.literal.group_resolve(() => {
                                                                            const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                            return {
                                                                                'type': $property_type_,
                                                                            }
                                                                        })),
                                                                    },
                                                                )
                                                                return {
                                                                    'properties': $property_properties,
                                                                }
                                                            })]
                                                            return {
                                                                'type': $property_type_,
                                                            }
                                                        })
                                                        return {
                                                            'option': $property_option,
                                                            'value': $property_value,
                                                        }
                                                    })]
                                                    return {
                                                        'type': $property_type_,
                                                    }
                                                }))
                                                default: return p.exhaustive($s[0])
                                            }
                                        },
                                    )),
                                },
                            )
                            return {
                                'properties': $property_properties,
                            }
                        })]
                        return {
                            'type': $property_type_,
                        }
                    })),
                    'path': p.change_context($['path'], ($) => p.literal.group_resolve(() => {
                        const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                            const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                {
                                    'tail': p.change_context($['tail'], ($) => p.literal.group_resolve(() => {
                                        const $property_type_: s_target.Value.type_ = ['list', p.literal.group_resolve(() => {
                                            const $property_items: s_target.Value.type_.type_.list.items = p.from.list($).map_with_index(
                                                ($, $index): s_target.Value.type_.type_.list.items.L => p.from.state($).decide(
                                                    ($s): s_target.Value => {
                                                        switch ($s[0]) {
                                                            case 'benchmark': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                                const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                                    const $property_option: s_target.Value.type_.type_.state.option = 'benchmark'
                                                                    const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                        const $property_type_: s_target.Value.type_ = ['nothing', null]
                                                                        return {
                                                                            'type': $property_type_,
                                                                        }
                                                                    })
                                                                    return {
                                                                        'option': $property_option,
                                                                        'value': $property_value,
                                                                    }
                                                                })]
                                                                return {
                                                                    'type': $property_type_,
                                                                }
                                                            }))
                                                            case 'dictionary': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                                const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                                    const $property_option: s_target.Value.type_.type_.state.option = 'dictionary'
                                                                    const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                        const $property_type_: s_target.Value.type_ = ['nothing', null]
                                                                        return {
                                                                            'type': $property_type_,
                                                                        }
                                                                    })
                                                                    return {
                                                                        'option': $property_option,
                                                                        'value': $property_value,
                                                                    }
                                                                })]
                                                                return {
                                                                    'type': $property_type_,
                                                                }
                                                            }))
                                                            case 'group': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                                const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                                    const $property_option: s_target.Value.type_.type_.state.option = 'group'
                                                                    const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                        const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                        return {
                                                                            'type': $property_type_,
                                                                        }
                                                                    })
                                                                    return {
                                                                        'option': $property_option,
                                                                        'value': $property_value,
                                                                    }
                                                                })]
                                                                return {
                                                                    'type': $property_type_,
                                                                }
                                                            }))
                                                            case 'list': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                                const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                                    const $property_option: s_target.Value.type_.type_.state.option = 'list'
                                                                    const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                        const $property_type_: s_target.Value.type_ = ['nothing', null]
                                                                        return {
                                                                            'type': $property_type_,
                                                                        }
                                                                    })
                                                                    return {
                                                                        'option': $property_option,
                                                                        'value': $property_value,
                                                                    }
                                                                })]
                                                                return {
                                                                    'type': $property_type_,
                                                                }
                                                            }))
                                                            case 'optional': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                                const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                                    const $property_option: s_target.Value.type_.type_.state.option = 'optional'
                                                                    const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                        const $property_type_: s_target.Value.type_ = ['nothing', null]
                                                                        return {
                                                                            'type': $property_type_,
                                                                        }
                                                                    })
                                                                    return {
                                                                        'option': $property_option,
                                                                        'value': $property_value,
                                                                    }
                                                                })]
                                                                return {
                                                                    'type': $property_type_,
                                                                }
                                                            }))
                                                            case 'state': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                                const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                                    const $property_option: s_target.Value.type_.type_.state.option = 'state'
                                                                    const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                        const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                        return {
                                                                            'type': $property_type_,
                                                                        }
                                                                    })
                                                                    return {
                                                                        'option': $property_option,
                                                                        'value': $property_value,
                                                                    }
                                                                })]
                                                                return {
                                                                    'type': $property_type_,
                                                                }
                                                            }))
                                                            default: return p.exhaustive($s[0])
                                                        }
                                                    },
                                                ),
                                            )
                                            return {
                                                'items': $property_items,
                                            }
                                        })]
                                        return {
                                            'type': $property_type_,
                                        }
                                    })),
                                },
                            )
                            return {
                                'properties': $property_properties,
                            }
                        })]
                        return {
                            'type': $property_type_,
                        }
                    })),
                },
            )
            return {
                'properties': $property_properties,
            }
        })]
        return {
            'type': $property_type_,
        }
    })
    
    export const Option_Constraints: d.structure.Option_Constraints = ($) => p.literal.group_resolve(() => {
        const $property_type_: s_target.Value.type_ = ['optional', p.from.optional($).map(
            ($): s_target.Value.type_.type_.optional.O => p.literal.group_resolve(() => {
                const $property_type_: s_target.Value.type_ = ['dictionary', p.literal.group_resolve(() => {
                    const $property_entries: s_target.Value.type_.type_.dictionary.entries = p.from.dictionary($).map(
                        ($): s_target.Value.type_.type_.dictionary.entries.D => Value_Reference(
                            $,
                        ),
                    )
                    return {
                        'entries': $property_entries,
                    }
                })]
                return {
                    'type': $property_type_,
                }
            }),
        )]
        return {
            'type': $property_type_,
        }
    })
    
    export const Reference: d.structure.Reference = ($) => p.literal.group_resolve(() => {
        const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
            const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                {
                    'referent': p.change_context($['referent'], ($) => Value_Reference(
                        $,
                    )),
                    'type': p.change_context($['type'], ($) => p.literal.group_resolve(() => {
                        const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                            const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                {
                                    'dependency': p.change_context($['dependency'], ($) => p.from.state($).decide(
                                        ($s): s_target.Value => {
                                            switch ($s[0]) {
                                                case 'acyclic': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                        const $property_option: s_target.Value.type_.type_.state.option = 'acyclic'
                                                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                            const $property_type_: s_target.Value.type_ = ['nothing', null]
                                                            return {
                                                                'type': $property_type_,
                                                            }
                                                        })
                                                        return {
                                                            'option': $property_option,
                                                            'value': $property_value,
                                                        }
                                                    })]
                                                    return {
                                                        'type': $property_type_,
                                                    }
                                                }))
                                                case 'cyclic': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                        const $property_option: s_target.Value.type_.type_.state.option = 'cyclic'
                                                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                            const $property_type_: s_target.Value.type_ = ['nothing', null]
                                                            return {
                                                                'type': $property_type_,
                                                            }
                                                        })
                                                        return {
                                                            'option': $property_option,
                                                            'value': $property_value,
                                                        }
                                                    })]
                                                    return {
                                                        'type': $property_type_,
                                                    }
                                                }))
                                                default: return p.exhaustive($s[0])
                                            }
                                        },
                                    )),
                                    'constraints': p.change_context($['constraints'], ($) => Reference_Constraints(
                                        $,
                                    )),
                                },
                            )
                            return {
                                'properties': $property_properties,
                            }
                        })]
                        return {
                            'type': $property_type_,
                        }
                    })),
                },
            )
            return {
                'properties': $property_properties,
            }
        })]
        return {
            'type': $property_type_,
        }
    })
    
    export const Reference_Constraints: d.structure.Reference_Constraints = ($) => p.literal.group_resolve(() => {
        const $property_type_: s_target.Value.type_ = ['optional', p.from.optional($).map(
            ($): s_target.Value.type_.type_.optional.O => p.literal.group_resolve(() => {
                const $property_type_: s_target.Value.type_ = ['dictionary', p.literal.group_resolve(() => {
                    const $property_entries: s_target.Value.type_.type_.dictionary.entries = p.from.dictionary($).map(
                        ($): s_target.Value.type_.type_.dictionary.entries.D => Value_Reference(
                            $,
                        ),
                    )
                    return {
                        'entries': $property_entries,
                    }
                })]
                return {
                    'type': $property_type_,
                }
            }),
        )]
        return {
            'type': $property_type_,
        }
    })
    
    export const Regular_Expression: d.structure.Regular_Expression = ($) => p.from.state($).decide(
        ($s): s_target.Value => {
            switch ($s[0]) {
                case 'any character': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                        const $property_option: s_target.Value.type_.type_.state.option = 'any character'
                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                            const $property_type_: s_target.Value.type_ = ['nothing', null]
                            return {
                                'type': $property_type_,
                            }
                        })
                        return {
                            'option': $property_option,
                            'value': $property_value,
                        }
                    })]
                    return {
                        'type': $property_type_,
                    }
                }))
                case 'literal': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                        const $property_option: s_target.Value.type_.type_.state.option = 'literal'
                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                            const $property_type_: s_target.Value.type_ = ['text', $]
                            return {
                                'type': $property_type_,
                            }
                        })
                        return {
                            'option': $property_option,
                            'value': $property_value,
                        }
                    })]
                    return {
                        'type': $property_type_,
                    }
                }))
                case 'character set': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                        const $property_option: s_target.Value.type_.type_.state.option = 'character set'
                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                            const $property_type_: s_target.Value.type_ = ['text', $]
                            return {
                                'type': $property_type_,
                            }
                        })
                        return {
                            'option': $property_option,
                            'value': $property_value,
                        }
                    })]
                    return {
                        'type': $property_type_,
                    }
                }))
                case 'sequence': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                        const $property_option: s_target.Value.type_.type_.state.option = 'sequence'
                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                            const $property_type_: s_target.Value.type_ = ['list', p.literal.group_resolve(() => {
                                const $property_items: s_target.Value.type_.type_.list.items = p.from.list($).map_with_index(
                                    ($, $index): s_target.Value.type_.type_.list.items.L => Regular_Expression(
                                        $,
                                    ),
                                )
                                return {
                                    'items': $property_items,
                                }
                            })]
                            return {
                                'type': $property_type_,
                            }
                        })
                        return {
                            'option': $property_option,
                            'value': $property_value,
                        }
                    })]
                    return {
                        'type': $property_type_,
                    }
                }))
                case 'choice': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                        const $property_option: s_target.Value.type_.type_.state.option = 'choice'
                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                            const $property_type_: s_target.Value.type_ = ['list', p.literal.group_resolve(() => {
                                const $property_items: s_target.Value.type_.type_.list.items = p.from.list($).map_with_index(
                                    ($, $index): s_target.Value.type_.type_.list.items.L => Regular_Expression(
                                        $,
                                    ),
                                )
                                return {
                                    'items': $property_items,
                                }
                            })]
                            return {
                                'type': $property_type_,
                            }
                        })
                        return {
                            'option': $property_option,
                            'value': $property_value,
                        }
                    })]
                    return {
                        'type': $property_type_,
                    }
                }))
                case 'repetition': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                        const $property_option: s_target.Value.type_.type_.state.option = 'repetition'
                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                            const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                    {
                                        'expression': p.change_context($['expression'], ($) => Regular_Expression(
                                            $,
                                        )),
                                        'quantity': p.change_context($['quantity'], ($) => p.from.state($).decide(
                                            ($s): s_target.Value => {
                                                switch ($s[0]) {
                                                    case 'optional': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                        const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                            const $property_option: s_target.Value.type_.type_.state.option = 'optional'
                                                            const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                const $property_type_: s_target.Value.type_ = ['nothing', null]
                                                                return {
                                                                    'type': $property_type_,
                                                                }
                                                            })
                                                            return {
                                                                'option': $property_option,
                                                                'value': $property_value,
                                                            }
                                                        })]
                                                        return {
                                                            'type': $property_type_,
                                                        }
                                                    }))
                                                    case 'zero or more': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                        const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                            const $property_option: s_target.Value.type_.type_.state.option = 'zero or more'
                                                            const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                const $property_type_: s_target.Value.type_ = ['nothing', null]
                                                                return {
                                                                    'type': $property_type_,
                                                                }
                                                            })
                                                            return {
                                                                'option': $property_option,
                                                                'value': $property_value,
                                                            }
                                                        })]
                                                        return {
                                                            'type': $property_type_,
                                                        }
                                                    }))
                                                    case 'one or more': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                        const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                            const $property_option: s_target.Value.type_.type_.state.option = 'one or more'
                                                            const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                const $property_type_: s_target.Value.type_ = ['nothing', null]
                                                                return {
                                                                    'type': $property_type_,
                                                                }
                                                            })
                                                            return {
                                                                'option': $property_option,
                                                                'value': $property_value,
                                                            }
                                                        })]
                                                        return {
                                                            'type': $property_type_,
                                                        }
                                                    }))
                                                    default: return p.exhaustive($s[0])
                                                }
                                            },
                                        )),
                                    },
                                )
                                return {
                                    'properties': $property_properties,
                                }
                            })]
                            return {
                                'type': $property_type_,
                            }
                        })
                        return {
                            'option': $property_option,
                            'value': $property_value,
                        }
                    })]
                    return {
                        'type': $property_type_,
                    }
                }))
                default: return p.exhaustive($s[0])
            }
        },
    )
    
    export const Structure: d.structure.Structure = ($) => p.literal.group_resolve(() => {
        const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
            const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                {
                    'namespaces': p.change_context($['namespaces'], ($) => Namespaces(
                        $,
                    )),
                    'basic types': p.change_context($['basic types'], ($) => Basic_Types(
                        $,
                    )),
                    'types': p.change_context($['types'], ($) => Types(
                        $,
                    )),
                },
            )
            return {
                'properties': $property_properties,
            }
        })]
        return {
            'type': $property_type_,
        }
    })
    
    export const Value_Result: d.structure.Value_Result = ($) => p.literal.group_resolve(() => {
        const $property_type_: s_target.Value.type_ = ['optional', p.from.optional($).map(
            ($): s_target.Value.type_.type_.optional.O => Value_Reference(
                $,
            ),
        )]
        return {
            'type': $property_type_,
        }
    })
}

export namespace declarations {
    
    export const Presence: d.declarations.Presence = ($) => p.from.state($).decide(
        ($s): s_target.Value => {
            switch ($s[0]) {
                case 'optional': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                        const $property_option: s_target.Value.type_.type_.state.option = 'optional'
                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                            const $property_type_: s_target.Value.type_ = ['nothing', null]
                            return {
                                'type': $property_type_,
                            }
                        })
                        return {
                            'option': $property_option,
                            'value': $property_value,
                        }
                    })]
                    return {
                        'type': $property_type_,
                    }
                }))
                case 'required': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                        const $property_option: s_target.Value.type_.type_.state.option = 'required'
                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                            const $property_type_: s_target.Value.type_ = ['nothing', null]
                            return {
                                'type': $property_type_,
                            }
                        })
                        return {
                            'option': $property_option,
                            'value': $property_value,
                        }
                    })]
                    return {
                        'type': $property_type_,
                    }
                }))
                default: return p.exhaustive($s[0])
            }
        },
    )
    
    export const Signature_Value_Reference: d.declarations.Signature_Value_Reference = ($) => p.literal.group_resolve(() => {
        const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
            const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                {
                    'type': p.change_context($['type'], ($) => p.literal.group_resolve(() => {
                        const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                            const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                {
                                    'location': p.change_context($['location'], ($) => p.from.state($).decide(
                                        ($s): s_target.Value => {
                                            switch ($s[0]) {
                                                case 'local': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                        const $property_option: s_target.Value.type_.type_.state.option = 'local'
                                                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                            const $property_type_: s_target.Value.type_ = ['reference', $]
                                                            return {
                                                                'type': $property_type_,
                                                            }
                                                        })
                                                        return {
                                                            'option': $property_option,
                                                            'value': $property_value,
                                                        }
                                                    })]
                                                    return {
                                                        'type': $property_type_,
                                                    }
                                                }))
                                                case 'child namespace': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                        const $property_option: s_target.Value.type_.type_.state.option = 'child namespace'
                                                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                            const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                                                const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                                                    {
                                                                        'namespace': p.change_context($['namespace'], ($) => p.literal.group_resolve(() => {
                                                                            const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                            return {
                                                                                'type': $property_type_,
                                                                            }
                                                                        })),
                                                                        'type': p.change_context($['type'], ($) => p.literal.group_resolve(() => {
                                                                            const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                            return {
                                                                                'type': $property_type_,
                                                                            }
                                                                        })),
                                                                    },
                                                                )
                                                                return {
                                                                    'properties': $property_properties,
                                                                }
                                                            })]
                                                            return {
                                                                'type': $property_type_,
                                                            }
                                                        })
                                                        return {
                                                            'option': $property_option,
                                                            'value': $property_value,
                                                        }
                                                    })]
                                                    return {
                                                        'type': $property_type_,
                                                    }
                                                }))
                                                case 'sibling namespace': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                        const $property_option: s_target.Value.type_.type_.state.option = 'sibling namespace'
                                                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                            const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                                                const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                                                    {
                                                                        'namespace': p.change_context($['namespace'], ($) => p.literal.group_resolve(() => {
                                                                            const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                            return {
                                                                                'type': $property_type_,
                                                                            }
                                                                        })),
                                                                        'type': p.change_context($['type'], ($) => p.literal.group_resolve(() => {
                                                                            const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                            return {
                                                                                'type': $property_type_,
                                                                            }
                                                                        })),
                                                                    },
                                                                )
                                                                return {
                                                                    'properties': $property_properties,
                                                                }
                                                            })]
                                                            return {
                                                                'type': $property_type_,
                                                            }
                                                        })
                                                        return {
                                                            'option': $property_option,
                                                            'value': $property_value,
                                                        }
                                                    })]
                                                    return {
                                                        'type': $property_type_,
                                                    }
                                                }))
                                                default: return p.exhaustive($s[0])
                                            }
                                        },
                                    )),
                                },
                            )
                            return {
                                'properties': $property_properties,
                            }
                        })]
                        return {
                            'type': $property_type_,
                        }
                    })),
                    'subselection': p.change_context($['subselection'], ($) => p.literal.group_resolve(() => {
                        const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                            const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                {
                                    'tail': p.change_context($['tail'], ($) => p.literal.group_resolve(() => {
                                        const $property_type_: s_target.Value.type_ = ['list', p.literal.group_resolve(() => {
                                            const $property_items: s_target.Value.type_.type_.list.items = p.from.list($).map_with_index(
                                                ($, $index): s_target.Value.type_.type_.list.items.L => p.from.state($).decide(
                                                    ($s): s_target.Value => {
                                                        switch ($s[0]) {
                                                            case 'dictionary': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                                const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                                    const $property_option: s_target.Value.type_.type_.state.option = 'dictionary'
                                                                    const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                        const $property_type_: s_target.Value.type_ = ['nothing', null]
                                                                        return {
                                                                            'type': $property_type_,
                                                                        }
                                                                    })
                                                                    return {
                                                                        'option': $property_option,
                                                                        'value': $property_value,
                                                                    }
                                                                })]
                                                                return {
                                                                    'type': $property_type_,
                                                                }
                                                            }))
                                                            case 'group': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                                const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                                    const $property_option: s_target.Value.type_.type_.state.option = 'group'
                                                                    const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                        const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                        return {
                                                                            'type': $property_type_,
                                                                        }
                                                                    })
                                                                    return {
                                                                        'option': $property_option,
                                                                        'value': $property_value,
                                                                    }
                                                                })]
                                                                return {
                                                                    'type': $property_type_,
                                                                }
                                                            }))
                                                            case 'list': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                                const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                                    const $property_option: s_target.Value.type_.type_.state.option = 'list'
                                                                    const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                        const $property_type_: s_target.Value.type_ = ['nothing', null]
                                                                        return {
                                                                            'type': $property_type_,
                                                                        }
                                                                    })
                                                                    return {
                                                                        'option': $property_option,
                                                                        'value': $property_value,
                                                                    }
                                                                })]
                                                                return {
                                                                    'type': $property_type_,
                                                                }
                                                            }))
                                                            case 'optional': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                                const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                                    const $property_option: s_target.Value.type_.type_.state.option = 'optional'
                                                                    const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                        const $property_type_: s_target.Value.type_ = ['nothing', null]
                                                                        return {
                                                                            'type': $property_type_,
                                                                        }
                                                                    })
                                                                    return {
                                                                        'option': $property_option,
                                                                        'value': $property_value,
                                                                    }
                                                                })]
                                                                return {
                                                                    'type': $property_type_,
                                                                }
                                                            }))
                                                            case 'state': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                                const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                                    const $property_option: s_target.Value.type_.type_.state.option = 'state'
                                                                    const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                        const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                        return {
                                                                            'type': $property_type_,
                                                                        }
                                                                    })
                                                                    return {
                                                                        'option': $property_option,
                                                                        'value': $property_value,
                                                                    }
                                                                })]
                                                                return {
                                                                    'type': $property_type_,
                                                                }
                                                            }))
                                                            default: return p.exhaustive($s[0])
                                                        }
                                                    },
                                                ),
                                            )
                                            return {
                                                'items': $property_items,
                                            }
                                        })]
                                        return {
                                            'type': $property_type_,
                                        }
                                    })),
                                },
                            )
                            return {
                                'properties': $property_properties,
                            }
                        })]
                        return {
                            'type': $property_type_,
                        }
                    })),
                },
            )
            return {
                'properties': $property_properties,
            }
        })]
        return {
            'type': $property_type_,
        }
    })
    
    export const Signature: d.declarations.Signature = ($) => p.literal.group_resolve(() => {
        const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
            const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                {
                    'values': p.change_context($['values'], ($) => p.literal.group_resolve(() => {
                        const $property_type_: s_target.Value.type_ = ['dictionary', p.literal.group_resolve(() => {
                            const $property_entries: s_target.Value.type_.type_.dictionary.entries = p.from.dictionary($).map(
                                ($): s_target.Value.type_.type_.dictionary.entries.D => p.literal.group_resolve(() => {
                                    const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                        const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                            {
                                                'value': p.change_context($['value'], ($) => Signature_Value_Reference(
                                                    $,
                                                )),
                                                'presence': p.change_context($['presence'], ($) => Presence(
                                                    $,
                                                )),
                                            },
                                        )
                                        return {
                                            'properties': $property_properties,
                                        }
                                    })]
                                    return {
                                        'type': $property_type_,
                                    }
                                }),
                            )
                            return {
                                'entries': $property_entries,
                            }
                        })]
                        return {
                            'type': $property_type_,
                        }
                    })),
                    'lookups': p.change_context($['lookups'], ($) => p.literal.group_resolve(() => {
                        const $property_type_: s_target.Value.type_ = ['dictionary', p.literal.group_resolve(() => {
                            const $property_entries: s_target.Value.type_.type_.dictionary.entries = p.from.dictionary($).map(
                                ($): s_target.Value.type_.type_.dictionary.entries.D => p.literal.group_resolve(() => {
                                    const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                        const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                            {
                                                'referent': p.change_context($['referent'], ($) => Signature_Value_Reference(
                                                    $,
                                                )),
                                                'type': p.change_context($['type'], ($) => p.from.state($).decide(
                                                    ($s): s_target.Value => {
                                                        switch ($s[0]) {
                                                            case 'cyclic': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                                const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                                    const $property_option: s_target.Value.type_.type_.state.option = 'cyclic'
                                                                    const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                        const $property_type_: s_target.Value.type_ = ['nothing', null]
                                                                        return {
                                                                            'type': $property_type_,
                                                                        }
                                                                    })
                                                                    return {
                                                                        'option': $property_option,
                                                                        'value': $property_value,
                                                                    }
                                                                })]
                                                                return {
                                                                    'type': $property_type_,
                                                                }
                                                            }))
                                                            case 'acyclic': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                                const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                                    const $property_option: s_target.Value.type_.type_.state.option = 'acyclic'
                                                                    const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                        const $property_type_: s_target.Value.type_ = ['nothing', null]
                                                                        return {
                                                                            'type': $property_type_,
                                                                        }
                                                                    })
                                                                    return {
                                                                        'option': $property_option,
                                                                        'value': $property_value,
                                                                    }
                                                                })]
                                                                return {
                                                                    'type': $property_type_,
                                                                }
                                                            }))
                                                            default: return p.exhaustive($s[0])
                                                        }
                                                    },
                                                )),
                                                'presence': p.change_context($['presence'], ($) => Presence(
                                                    $,
                                                )),
                                            },
                                        )
                                        return {
                                            'properties': $property_properties,
                                        }
                                    })]
                                    return {
                                        'type': $property_type_,
                                    }
                                }),
                            )
                            return {
                                'entries': $property_entries,
                            }
                        })]
                        return {
                            'type': $property_type_,
                        }
                    })),
                },
            )
            return {
                'properties': $property_properties,
            }
        })]
        return {
            'type': $property_type_,
        }
    })
    
    export const Declarations: d.declarations.Declarations = ($) => p.literal.group_resolve(() => {
        const $property_type_: s_target.Value.type_ = ['dictionary', p.literal.group_resolve(() => {
            const $property_entries: s_target.Value.type_.type_.dictionary.entries = p.from.dictionary($).map(
                ($): s_target.Value.type_.type_.dictionary.entries.D => Declaration(
                    $,
                ),
            )
            return {
                'entries': $property_entries,
            }
        })]
        return {
            'type': $property_type_,
        }
    })
    
    export const Declaration: d.declarations.Declaration = ($) => p.literal.group_resolve(() => {
        const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
            const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                {
                    'signature': p.change_context($['signature'], ($) => p.from.state($).decide(
                        ($s): s_target.Value => {
                            switch ($s[0]) {
                                case 'local': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                        const $property_option: s_target.Value.type_.type_.state.option = 'local'
                                        const $property_value: s_target.Value.type_.type_.state.value = Signature(
                                            $,
                                        )
                                        return {
                                            'option': $property_option,
                                            'value': $property_value,
                                        }
                                    })]
                                    return {
                                        'type': $property_type_,
                                    }
                                }))
                                case 'same as': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                        const $property_option: s_target.Value.type_.type_.state.option = 'same as'
                                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                            const $property_type_: s_target.Value.type_ = ['reference', $]
                                            return {
                                                'type': $property_type_,
                                            }
                                        })
                                        return {
                                            'option': $property_option,
                                            'value': $property_value,
                                        }
                                    })]
                                    return {
                                        'type': $property_type_,
                                    }
                                }))
                                default: return p.exhaustive($s[0])
                            }
                        },
                    )),
                },
            )
            return {
                'properties': $property_properties,
            }
        })]
        return {
            'type': $property_type_,
        }
    })
    
    export const Namespaces: d.declarations.Namespaces = ($) => p.literal.group_resolve(() => {
        const $property_type_: s_target.Value.type_ = ['dictionary', p.literal.group_resolve(() => {
            const $property_entries: s_target.Value.type_.type_.dictionary.entries = p.from.dictionary($).map(
                ($): s_target.Value.type_.type_.dictionary.entries.D => Declaration_Namespace(
                    $,
                ),
            )
            return {
                'entries': $property_entries,
            }
        })]
        return {
            'type': $property_type_,
        }
    })
    
    export const Declaration_Namespace: d.declarations.Declaration_Namespace = ($) => p.literal.group_resolve(() => {
        const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
            const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                {
                    'namespaces': p.change_context($['namespaces'], ($) => Namespaces(
                        $,
                    )),
                    'types': p.change_context($['types'], ($) => Declarations(
                        $,
                    )),
                },
            )
            return {
                'properties': $property_properties,
            }
        })]
        return {
            'type': $property_type_,
        }
    })
}

export namespace resolver {
    
    export const Value_Reference: d.resolver.Value_Reference = ($) => p.literal.group_resolve(() => {
        const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
            const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                {
                    'type': p.change_context($['type'], ($) => p.literal.group_resolve(() => {
                        const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                            const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                {
                                    'location': p.change_context($['location'], ($) => p.from.state($).decide(
                                        ($s): s_target.Value => {
                                            switch ($s[0]) {
                                                case 'local': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                        const $property_option: s_target.Value.type_.type_.state.option = 'local'
                                                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                            const $property_type_: s_target.Value.type_ = ['reference', $]
                                                            return {
                                                                'type': $property_type_,
                                                            }
                                                        })
                                                        return {
                                                            'option': $property_option,
                                                            'value': $property_value,
                                                        }
                                                    })]
                                                    return {
                                                        'type': $property_type_,
                                                    }
                                                }))
                                                case 'child namespace': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                        const $property_option: s_target.Value.type_.type_.state.option = 'child namespace'
                                                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                            const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                                                const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                                                    {
                                                                        'namespace': p.change_context($['namespace'], ($) => p.literal.group_resolve(() => {
                                                                            const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                            return {
                                                                                'type': $property_type_,
                                                                            }
                                                                        })),
                                                                        'type': p.change_context($['type'], ($) => p.literal.group_resolve(() => {
                                                                            const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                            return {
                                                                                'type': $property_type_,
                                                                            }
                                                                        })),
                                                                    },
                                                                )
                                                                return {
                                                                    'properties': $property_properties,
                                                                }
                                                            })]
                                                            return {
                                                                'type': $property_type_,
                                                            }
                                                        })
                                                        return {
                                                            'option': $property_option,
                                                            'value': $property_value,
                                                        }
                                                    })]
                                                    return {
                                                        'type': $property_type_,
                                                    }
                                                }))
                                                case 'sibling namespace': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                        const $property_option: s_target.Value.type_.type_.state.option = 'sibling namespace'
                                                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                            const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                                                const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                                                    {
                                                                        'namespace': p.change_context($['namespace'], ($) => p.literal.group_resolve(() => {
                                                                            const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                            return {
                                                                                'type': $property_type_,
                                                                            }
                                                                        })),
                                                                        'type': p.change_context($['type'], ($) => p.literal.group_resolve(() => {
                                                                            const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                            return {
                                                                                'type': $property_type_,
                                                                            }
                                                                        })),
                                                                    },
                                                                )
                                                                return {
                                                                    'properties': $property_properties,
                                                                }
                                                            })]
                                                            return {
                                                                'type': $property_type_,
                                                            }
                                                        })
                                                        return {
                                                            'option': $property_option,
                                                            'value': $property_value,
                                                        }
                                                    })]
                                                    return {
                                                        'type': $property_type_,
                                                    }
                                                }))
                                                default: return p.exhaustive($s[0])
                                            }
                                        },
                                    )),
                                },
                            )
                            return {
                                'properties': $property_properties,
                            }
                        })]
                        return {
                            'type': $property_type_,
                        }
                    })),
                    'path': p.change_context($['path'], ($) => p.literal.group_resolve(() => {
                        const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                            const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                {
                                    'tail': p.change_context($['tail'], ($) => p.literal.group_resolve(() => {
                                        const $property_type_: s_target.Value.type_ = ['list', p.literal.group_resolve(() => {
                                            const $property_items: s_target.Value.type_.type_.list.items = p.from.list($).map_with_index(
                                                ($, $index): s_target.Value.type_.type_.list.items.L => p.from.state($).decide(
                                                    ($s): s_target.Value => {
                                                        switch ($s[0]) {
                                                            case 'dictionary': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                                const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                                    const $property_option: s_target.Value.type_.type_.state.option = 'dictionary'
                                                                    const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                        const $property_type_: s_target.Value.type_ = ['nothing', null]
                                                                        return {
                                                                            'type': $property_type_,
                                                                        }
                                                                    })
                                                                    return {
                                                                        'option': $property_option,
                                                                        'value': $property_value,
                                                                    }
                                                                })]
                                                                return {
                                                                    'type': $property_type_,
                                                                }
                                                            }))
                                                            case 'group': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                                const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                                    const $property_option: s_target.Value.type_.type_.state.option = 'group'
                                                                    const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                        const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                        return {
                                                                            'type': $property_type_,
                                                                        }
                                                                    })
                                                                    return {
                                                                        'option': $property_option,
                                                                        'value': $property_value,
                                                                    }
                                                                })]
                                                                return {
                                                                    'type': $property_type_,
                                                                }
                                                            }))
                                                            case 'list': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                                const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                                    const $property_option: s_target.Value.type_.type_.state.option = 'list'
                                                                    const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                        const $property_type_: s_target.Value.type_ = ['nothing', null]
                                                                        return {
                                                                            'type': $property_type_,
                                                                        }
                                                                    })
                                                                    return {
                                                                        'option': $property_option,
                                                                        'value': $property_value,
                                                                    }
                                                                })]
                                                                return {
                                                                    'type': $property_type_,
                                                                }
                                                            }))
                                                            case 'optional': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                                const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                                    const $property_option: s_target.Value.type_.type_.state.option = 'optional'
                                                                    const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                        const $property_type_: s_target.Value.type_ = ['nothing', null]
                                                                        return {
                                                                            'type': $property_type_,
                                                                        }
                                                                    })
                                                                    return {
                                                                        'option': $property_option,
                                                                        'value': $property_value,
                                                                    }
                                                                })]
                                                                return {
                                                                    'type': $property_type_,
                                                                }
                                                            }))
                                                            case 'state': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                                const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                                    const $property_option: s_target.Value.type_.type_.state.option = 'state'
                                                                    const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                        const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                        return {
                                                                            'type': $property_type_,
                                                                        }
                                                                    })
                                                                    return {
                                                                        'option': $property_option,
                                                                        'value': $property_value,
                                                                    }
                                                                })]
                                                                return {
                                                                    'type': $property_type_,
                                                                }
                                                            }))
                                                            default: return p.exhaustive($s[0])
                                                        }
                                                    },
                                                ),
                                            )
                                            return {
                                                'items': $property_items,
                                            }
                                        })]
                                        return {
                                            'type': $property_type_,
                                        }
                                    })),
                                },
                            )
                            return {
                                'properties': $property_properties,
                            }
                        })]
                        return {
                            'type': $property_type_,
                        }
                    })),
                },
            )
            return {
                'properties': $property_properties,
            }
        })]
        return {
            'type': $property_type_,
        }
    })
    
    export const Relative_Value_Selection: d.resolver.Relative_Value_Selection = ($) => p.literal.group_resolve(() => {
        const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
            const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                {
                    'path': p.change_context($['path'], ($) => p.literal.group_resolve(() => {
                        const $property_type_: s_target.Value.type_ = ['list', p.literal.group_resolve(() => {
                            const $property_items: s_target.Value.type_.type_.list.items = p.from.list($).map_with_index(
                                ($, $index): s_target.Value.type_.type_.list.items.L => p.from.state($).decide(
                                    ($s): s_target.Value => {
                                        switch ($s[0]) {
                                            case 'benchmark link': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                    const $property_option: s_target.Value.type_.type_.state.option = 'benchmark link'
                                                    const $property_value: s_target.Value.type_.type_.state.value = Value_Reference(
                                                        $,
                                                    )
                                                    return {
                                                        'option': $property_option,
                                                        'value': $property_value,
                                                    }
                                                })]
                                                return {
                                                    'type': $property_type_,
                                                }
                                            }))
                                            case 'component constraint': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                    const $property_option: s_target.Value.type_.type_.state.option = 'component constraint'
                                                    const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                        const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                                            const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                                                {
                                                                    'name': p.change_context($['name'], ($) => p.literal.group_resolve(() => {
                                                                        const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                        return {
                                                                            'type': $property_type_,
                                                                        }
                                                                    })),
                                                                    'target': p.change_context($['target'], ($) => Value_Reference(
                                                                        $,
                                                                    )),
                                                                },
                                                            )
                                                            return {
                                                                'properties': $property_properties,
                                                            }
                                                        })]
                                                        return {
                                                            'type': $property_type_,
                                                        }
                                                    })
                                                    return {
                                                        'option': $property_option,
                                                        'value': $property_value,
                                                    }
                                                })]
                                                return {
                                                    'type': $property_type_,
                                                }
                                            }))
                                            case 'component': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                    const $property_option: s_target.Value.type_.type_.state.option = 'component'
                                                    const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                        const $property_type_: s_target.Value.type_ = ['nothing', null]
                                                        return {
                                                            'type': $property_type_,
                                                        }
                                                    })
                                                    return {
                                                        'option': $property_option,
                                                        'value': $property_value,
                                                    }
                                                })]
                                                return {
                                                    'type': $property_type_,
                                                }
                                            }))
                                            case 'cyclic component': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                    const $property_option: s_target.Value.type_.type_.state.option = 'cyclic component'
                                                    const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                        const $property_type_: s_target.Value.type_ = ['nothing', null]
                                                        return {
                                                            'type': $property_type_,
                                                        }
                                                    })
                                                    return {
                                                        'option': $property_option,
                                                        'value': $property_value,
                                                    }
                                                })]
                                                return {
                                                    'type': $property_type_,
                                                }
                                            }))
                                            case 'group': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                    const $property_option: s_target.Value.type_.type_.state.option = 'group'
                                                    const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                        const $property_type_: s_target.Value.type_ = ['reference', $]
                                                        return {
                                                            'type': $property_type_,
                                                        }
                                                    })
                                                    return {
                                                        'option': $property_option,
                                                        'value': $property_value,
                                                    }
                                                })]
                                                return {
                                                    'type': $property_type_,
                                                }
                                            }))
                                            case 'list result': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                    const $property_option: s_target.Value.type_.type_.state.option = 'list result'
                                                    const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                        const $property_type_: s_target.Value.type_ = ['nothing', null]
                                                        return {
                                                            'type': $property_type_,
                                                        }
                                                    })
                                                    return {
                                                        'option': $property_option,
                                                        'value': $property_value,
                                                    }
                                                })]
                                                return {
                                                    'type': $property_type_,
                                                }
                                            }))
                                            case 'option constraint': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                    const $property_option: s_target.Value.type_.type_.state.option = 'option constraint'
                                                    const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                        const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                                            const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                                                {
                                                                    'option': p.change_context($['option'], ($) => p.literal.group_resolve(() => {
                                                                        const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                        return {
                                                                            'type': $property_type_,
                                                                        }
                                                                    })),
                                                                    'constraint': p.change_context($['constraint'], ($) => p.literal.group_resolve(() => {
                                                                        const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                        return {
                                                                            'type': $property_type_,
                                                                        }
                                                                    })),
                                                                },
                                                            )
                                                            return {
                                                                'properties': $property_properties,
                                                            }
                                                        })]
                                                        return {
                                                            'type': $property_type_,
                                                        }
                                                    })
                                                    return {
                                                        'option': $property_option,
                                                        'value': $property_value,
                                                    }
                                                })]
                                                return {
                                                    'type': $property_type_,
                                                }
                                            }))
                                            case 'optional': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                    const $property_option: s_target.Value.type_.type_.state.option = 'optional'
                                                    const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                        const $property_type_: s_target.Value.type_ = ['nothing', null]
                                                        return {
                                                            'type': $property_type_,
                                                        }
                                                    })
                                                    return {
                                                        'option': $property_option,
                                                        'value': $property_value,
                                                    }
                                                })]
                                                return {
                                                    'type': $property_type_,
                                                }
                                            }))
                                            case 'optional value constraint': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                    const $property_option: s_target.Value.type_.type_.state.option = 'optional value constraint'
                                                    const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                        const $property_type_: s_target.Value.type_ = ['reference', $]
                                                        return {
                                                            'type': $property_type_,
                                                        }
                                                    })
                                                    return {
                                                        'option': $property_option,
                                                        'value': $property_value,
                                                    }
                                                })]
                                                return {
                                                    'type': $property_type_,
                                                }
                                            }))
                                            case 'reference constraint': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                    const $property_option: s_target.Value.type_.type_.state.option = 'reference constraint'
                                                    const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                        const $property_type_: s_target.Value.type_ = ['reference', $]
                                                        return {
                                                            'type': $property_type_,
                                                        }
                                                    })
                                                    return {
                                                        'option': $property_option,
                                                        'value': $property_value,
                                                    }
                                                })]
                                                return {
                                                    'type': $property_type_,
                                                }
                                            }))
                                            case 'reference': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                    const $property_option: s_target.Value.type_.type_.state.option = 'reference'
                                                    const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                        const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                                            const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                                                {},
                                                            )
                                                            return {
                                                                'properties': $property_properties,
                                                            }
                                                        })]
                                                        return {
                                                            'type': $property_type_,
                                                        }
                                                    })
                                                    return {
                                                        'option': $property_option,
                                                        'value': $property_value,
                                                    }
                                                })]
                                                return {
                                                    'type': $property_type_,
                                                }
                                            }))
                                            case 'expect resolved': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                    const $property_option: s_target.Value.type_.type_.state.option = 'expect resolved'
                                                    const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                        const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                                            const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                                                {},
                                                            )
                                                            return {
                                                                'properties': $property_properties,
                                                            }
                                                        })]
                                                        return {
                                                            'type': $property_type_,
                                                        }
                                                    })
                                                    return {
                                                        'option': $property_option,
                                                        'value': $property_value,
                                                    }
                                                })]
                                                return {
                                                    'type': $property_type_,
                                                }
                                            }))
                                            case 'state result': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                    const $property_option: s_target.Value.type_.type_.state.option = 'state result'
                                                    const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                        const $property_type_: s_target.Value.type_ = ['nothing', null]
                                                        return {
                                                            'type': $property_type_,
                                                        }
                                                    })
                                                    return {
                                                        'option': $property_option,
                                                        'value': $property_value,
                                                    }
                                                })]
                                                return {
                                                    'type': $property_type_,
                                                }
                                            }))
                                            default: return p.exhaustive($s[0])
                                        }
                                    },
                                ),
                            )
                            return {
                                'items': $property_items,
                            }
                        })]
                        return {
                            'type': $property_type_,
                        }
                    })),
                },
            )
            return {
                'properties': $property_properties,
            }
        })]
        return {
            'type': $property_type_,
        }
    })
    
    export const Possible_Value_Branches: d.resolver.Possible_Value_Branches = ($) => p.literal.group_resolve(() => {
        const $property_type_: s_target.Value.type_ = ['dictionary', p.literal.group_resolve(() => {
            const $property_entries: s_target.Value.type_.type_.dictionary.entries = p.from.dictionary($).map(
                ($): s_target.Value.type_.type_.dictionary.entries.D => p.from.state($).decide(
                    ($s): s_target.Value => {
                        switch ($s[0]) {
                            case 'not set': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                    const $property_option: s_target.Value.type_.type_.state.option = 'not set'
                                    const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                        const $property_type_: s_target.Value.type_ = ['nothing', null]
                                        return {
                                            'type': $property_type_,
                                        }
                                    })
                                    return {
                                        'option': $property_option,
                                        'value': $property_value,
                                    }
                                })]
                                return {
                                    'type': $property_type_,
                                }
                            }))
                            case 'set': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                    const $property_option: s_target.Value.type_.type_.state.option = 'set'
                                    const $property_value: s_target.Value.type_.type_.state.value = Relative_Value_Selection(
                                        $,
                                    )
                                    return {
                                        'option': $property_option,
                                        'value': $property_value,
                                    }
                                })]
                                return {
                                    'type': $property_type_,
                                }
                            }))
                            default: return p.exhaustive($s[0])
                        }
                    },
                ),
            )
            return {
                'entries': $property_entries,
            }
        })]
        return {
            'type': $property_type_,
        }
    })
    
    export const Possible_Value_Selection: d.resolver.Possible_Value_Selection = ($) => p.from.state($).decide(
        ($s): s_target.Value => {
            switch ($s[0]) {
                case 'switch state': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                        const $property_option: s_target.Value.type_.type_.state.option = 'switch state'
                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                            const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                    {
                                        'target': p.change_context($['target'], ($) => Value_Reference(
                                            $,
                                        )),
                                        'selection': p.change_context($['selection'], ($) => Guaranteed_Value_Selection(
                                            $,
                                        )),
                                        'options': p.change_context($['options'], ($) => Possible_Value_Branches(
                                            $,
                                        )),
                                    },
                                )
                                return {
                                    'properties': $property_properties,
                                }
                            })]
                            return {
                                'type': $property_type_,
                            }
                        })
                        return {
                            'option': $property_option,
                            'value': $property_value,
                        }
                    })]
                    return {
                        'type': $property_type_,
                    }
                }))
                case 'optional value': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                        const $property_option: s_target.Value.type_.type_.state.option = 'optional value'
                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                            const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                    {
                                        'selection': p.change_context($['selection'], ($) => Guaranteed_Value_Selection(
                                            $,
                                        )),
                                        'tail': p.change_context($['tail'], ($) => Relative_Value_Selection(
                                            $,
                                        )),
                                    },
                                )
                                return {
                                    'properties': $property_properties,
                                }
                            })]
                            return {
                                'type': $property_type_,
                            }
                        })
                        return {
                            'option': $property_option,
                            'value': $property_value,
                        }
                    })]
                    return {
                        'type': $property_type_,
                    }
                }))
                case 'parameter': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                        const $property_option: s_target.Value.type_.type_.state.option = 'parameter'
                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                            const $property_type_: s_target.Value.type_ = ['reference', $]
                            return {
                                'type': $property_type_,
                            }
                        })
                        return {
                            'option': $property_option,
                            'value': $property_value,
                        }
                    })]
                    return {
                        'type': $property_type_,
                    }
                }))
                case 'result': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                        const $property_option: s_target.Value.type_.type_.state.option = 'result'
                        const $property_value: s_target.Value.type_.type_.state.value = p.from.state($).decide(
                            ($s): s_target.Value => {
                                switch ($s[0]) {
                                    case 'state': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                        const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                            const $property_option: s_target.Value.type_.type_.state.option = 'state'
                                            const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                                    const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                                        {
                                                            'property': p.change_context($['property'], ($) => p.literal.group_resolve(() => {
                                                                const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                return {
                                                                    'type': $property_type_,
                                                                }
                                                            })),
                                                        },
                                                    )
                                                    return {
                                                        'properties': $property_properties,
                                                    }
                                                })]
                                                return {
                                                    'type': $property_type_,
                                                }
                                            })
                                            return {
                                                'option': $property_option,
                                                'value': $property_value,
                                            }
                                        })]
                                        return {
                                            'type': $property_type_,
                                        }
                                    }))
                                    case 'optional value': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                        const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                            const $property_option: s_target.Value.type_.type_.state.option = 'optional value'
                                            const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                                    const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                                        {
                                                            'property': p.change_context($['property'], ($) => p.literal.group_resolve(() => {
                                                                const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                return {
                                                                    'type': $property_type_,
                                                                }
                                                            })),
                                                        },
                                                    )
                                                    return {
                                                        'properties': $property_properties,
                                                    }
                                                })]
                                                return {
                                                    'type': $property_type_,
                                                }
                                            })
                                            return {
                                                'option': $property_option,
                                                'value': $property_value,
                                            }
                                        })]
                                        return {
                                            'type': $property_type_,
                                        }
                                    }))
                                    default: return p.exhaustive($s[0])
                                }
                            },
                        )
                        return {
                            'option': $property_option,
                            'value': $property_value,
                        }
                    })]
                    return {
                        'type': $property_type_,
                    }
                }))
                default: return p.exhaustive($s[0])
            }
        },
    )
    
    export const Option_Constraints: d.resolver.Option_Constraints = ($) => p.literal.group_resolve(() => {
        const $property_type_: s_target.Value.type_ = ['optional', p.from.optional($).map(
            ($): s_target.Value.type_.type_.optional.O => p.literal.group_resolve(() => {
                const $property_type_: s_target.Value.type_ = ['dictionary', p.literal.group_resolve(() => {
                    const $property_entries: s_target.Value.type_.type_.dictionary.entries = p.from.dictionary($).map(
                        ($): s_target.Value.type_.type_.dictionary.entries.D => p.from.state($).decide(
                            ($s): s_target.Value => {
                                switch ($s[0]) {
                                    case 'state': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                        const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                            const $property_option: s_target.Value.type_.type_.state.option = 'state'
                                            const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                                    const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                                        {
                                                            'selection': p.change_context($['selection'], ($) => Guaranteed_Value_Selection(
                                                                $,
                                                            )),
                                                            'option': p.change_context($['option'], ($) => p.literal.group_resolve(() => {
                                                                const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                return {
                                                                    'type': $property_type_,
                                                                }
                                                            })),
                                                        },
                                                    )
                                                    return {
                                                        'properties': $property_properties,
                                                    }
                                                })]
                                                return {
                                                    'type': $property_type_,
                                                }
                                            })
                                            return {
                                                'option': $property_option,
                                                'value': $property_value,
                                            }
                                        })]
                                        return {
                                            'type': $property_type_,
                                        }
                                    }))
                                    case 'assert is set': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                        const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                            const $property_option: s_target.Value.type_.type_.state.option = 'assert is set'
                                            const $property_value: s_target.Value.type_.type_.state.value = Possible_Value_Selection(
                                                $,
                                            )
                                            return {
                                                'option': $property_option,
                                                'value': $property_value,
                                            }
                                        })]
                                        return {
                                            'type': $property_type_,
                                        }
                                    }))
                                    default: return p.exhaustive($s[0])
                                }
                            },
                        ),
                    )
                    return {
                        'entries': $property_entries,
                    }
                })]
                return {
                    'type': $property_type_,
                }
            }),
        )]
        return {
            'type': $property_type_,
        }
    })
    
    export const Guaranteed_Value_Selection: d.resolver.Guaranteed_Value_Selection = ($) => p.literal.group_resolve(() => {
        const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
            const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                {
                    'start': p.change_context($['start'], ($) => p.from.state($).decide(
                        ($s): s_target.Value => {
                            switch ($s[0]) {
                                case 'optional fallback': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                        const $property_option: s_target.Value.type_.type_.state.option = 'optional fallback'
                                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                            const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                                const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                                    {
                                                        'selection': p.change_context($['selection'], ($) => Possible_Value_Selection(
                                                            $,
                                                        )),
                                                        'fallback': p.change_context($['fallback'], ($) => Guaranteed_Value_Selection(
                                                            $,
                                                        )),
                                                    },
                                                )
                                                return {
                                                    'properties': $property_properties,
                                                }
                                            })]
                                            return {
                                                'type': $property_type_,
                                            }
                                        })
                                        return {
                                            'option': $property_option,
                                            'value': $property_value,
                                        }
                                    })]
                                    return {
                                        'type': $property_type_,
                                    }
                                }))
                                case 'sibling property': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                        const $property_option: s_target.Value.type_.type_.state.option = 'sibling property'
                                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                            const $property_type_: s_target.Value.type_ = ['reference', $]
                                            return {
                                                'type': $property_type_,
                                            }
                                        })
                                        return {
                                            'option': $property_option,
                                            'value': $property_value,
                                        }
                                    })]
                                    return {
                                        'type': $property_type_,
                                    }
                                }))
                                case 'parent sibling': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                        const $property_option: s_target.Value.type_.type_.state.option = 'parent sibling'
                                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                            const $property_type_: s_target.Value.type_ = ['reference', $]
                                            return {
                                                'type': $property_type_,
                                            }
                                        })
                                        return {
                                            'option': $property_option,
                                            'value': $property_value,
                                        }
                                    })]
                                    return {
                                        'type': $property_type_,
                                    }
                                }))
                                case 'option constraint': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                        const $property_option: s_target.Value.type_.type_.state.option = 'option constraint'
                                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                            const $property_type_: s_target.Value.type_ = ['reference', $]
                                            return {
                                                'type': $property_type_,
                                            }
                                        })
                                        return {
                                            'option': $property_option,
                                            'value': $property_value,
                                        }
                                    })]
                                    return {
                                        'type': $property_type_,
                                    }
                                }))
                                case 'sibling option constraint': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                        const $property_option: s_target.Value.type_.type_.state.option = 'sibling option constraint'
                                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                            const $property_type_: s_target.Value.type_ = ['reference', $]
                                            return {
                                                'type': $property_type_,
                                            }
                                        })
                                        return {
                                            'option': $property_option,
                                            'value': $property_value,
                                        }
                                    })]
                                    return {
                                        'type': $property_type_,
                                    }
                                }))
                                case 'list cursor': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                        const $property_option: s_target.Value.type_.type_.state.option = 'list cursor'
                                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                            const $property_type_: s_target.Value.type_ = ['nothing', null]
                                            return {
                                                'type': $property_type_,
                                            }
                                        })
                                        return {
                                            'option': $property_option,
                                            'value': $property_value,
                                        }
                                    })]
                                    return {
                                        'type': $property_type_,
                                    }
                                }))
                                case 'linked entry': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                        const $property_option: s_target.Value.type_.type_.state.option = 'linked entry'
                                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                            const $property_type_: s_target.Value.type_ = ['nothing', null]
                                            return {
                                                'type': $property_type_,
                                            }
                                        })
                                        return {
                                            'option': $property_option,
                                            'value': $property_value,
                                        }
                                    })]
                                    return {
                                        'type': $property_type_,
                                    }
                                }))
                                case 'constraint': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                        const $property_option: s_target.Value.type_.type_.state.option = 'constraint'
                                        const $property_value: s_target.Value.type_.type_.state.value = p.from.state($).decide(
                                            ($s): s_target.Value => {
                                                switch ($s[0]) {
                                                    case 'component': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                        const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                            const $property_option: s_target.Value.type_.type_.state.option = 'component'
                                                            const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                                                    const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                                                        {
                                                                            'property': p.change_context($['property'], ($) => p.literal.group_resolve(() => {
                                                                                const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                                return {
                                                                                    'type': $property_type_,
                                                                                }
                                                                            })),
                                                                            'constraint': p.change_context($['constraint'], ($) => p.literal.group_resolve(() => {
                                                                                const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                                return {
                                                                                    'type': $property_type_,
                                                                                }
                                                                            })),
                                                                        },
                                                                    )
                                                                    return {
                                                                        'properties': $property_properties,
                                                                    }
                                                                })]
                                                                return {
                                                                    'type': $property_type_,
                                                                }
                                                            })
                                                            return {
                                                                'option': $property_option,
                                                                'value': $property_value,
                                                            }
                                                        })]
                                                        return {
                                                            'type': $property_type_,
                                                        }
                                                    }))
                                                    case 'reference': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                        const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                            const $property_option: s_target.Value.type_.type_.state.option = 'reference'
                                                            const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                                                    const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                                                        {
                                                                            'property': p.change_context($['property'], ($) => p.literal.group_resolve(() => {
                                                                                const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                                return {
                                                                                    'type': $property_type_,
                                                                                }
                                                                            })),
                                                                            'constraint': p.change_context($['constraint'], ($) => p.literal.group_resolve(() => {
                                                                                const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                                return {
                                                                                    'type': $property_type_,
                                                                                }
                                                                            })),
                                                                        },
                                                                    )
                                                                    return {
                                                                        'properties': $property_properties,
                                                                    }
                                                                })]
                                                                return {
                                                                    'type': $property_type_,
                                                                }
                                                            })
                                                            return {
                                                                'option': $property_option,
                                                                'value': $property_value,
                                                            }
                                                        })]
                                                        return {
                                                            'type': $property_type_,
                                                        }
                                                    }))
                                                    default: return p.exhaustive($s[0])
                                                }
                                            },
                                        )
                                        return {
                                            'option': $property_option,
                                            'value': $property_value,
                                        }
                                    })]
                                    return {
                                        'type': $property_type_,
                                    }
                                }))
                                case 'parameter': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                        const $property_option: s_target.Value.type_.type_.state.option = 'parameter'
                                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                            const $property_type_: s_target.Value.type_ = ['reference', $]
                                            return {
                                                'type': $property_type_,
                                            }
                                        })
                                        return {
                                            'option': $property_option,
                                            'value': $property_value,
                                        }
                                    })]
                                    return {
                                        'type': $property_type_,
                                    }
                                }))
                                case 'result': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                        const $property_option: s_target.Value.type_.type_.state.option = 'result'
                                        const $property_value: s_target.Value.type_.type_.state.value = p.from.state($).decide(
                                            ($s): s_target.Value => {
                                                switch ($s[0]) {
                                                    case 'list': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                        const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                            const $property_option: s_target.Value.type_.type_.state.option = 'list'
                                                            const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                                                    const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                                                        {
                                                                            'property': p.change_context($['property'], ($) => p.literal.group_resolve(() => {
                                                                                const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                                return {
                                                                                    'type': $property_type_,
                                                                                }
                                                                            })),
                                                                        },
                                                                    )
                                                                    return {
                                                                        'properties': $property_properties,
                                                                    }
                                                                })]
                                                                return {
                                                                    'type': $property_type_,
                                                                }
                                                            })
                                                            return {
                                                                'option': $property_option,
                                                                'value': $property_value,
                                                            }
                                                        })]
                                                        return {
                                                            'type': $property_type_,
                                                        }
                                                    }))
                                                    case 'state': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                        const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                            const $property_option: s_target.Value.type_.type_.state.option = 'state'
                                                            const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                                                    const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                                                        {
                                                                            'property': p.change_context($['property'], ($) => p.literal.group_resolve(() => {
                                                                                const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                                return {
                                                                                    'type': $property_type_,
                                                                                }
                                                                            })),
                                                                        },
                                                                    )
                                                                    return {
                                                                        'properties': $property_properties,
                                                                    }
                                                                })]
                                                                return {
                                                                    'type': $property_type_,
                                                                }
                                                            })
                                                            return {
                                                                'option': $property_option,
                                                                'value': $property_value,
                                                            }
                                                        })]
                                                        return {
                                                            'type': $property_type_,
                                                        }
                                                    }))
                                                    case 'optional value': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                        const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                            const $property_option: s_target.Value.type_.type_.state.option = 'optional value'
                                                            const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                                                    const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                                                        {
                                                                            'property': p.change_context($['property'], ($) => p.literal.group_resolve(() => {
                                                                                const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                                return {
                                                                                    'type': $property_type_,
                                                                                }
                                                                            })),
                                                                        },
                                                                    )
                                                                    return {
                                                                        'properties': $property_properties,
                                                                    }
                                                                })]
                                                                return {
                                                                    'type': $property_type_,
                                                                }
                                                            })
                                                            return {
                                                                'option': $property_option,
                                                                'value': $property_value,
                                                            }
                                                        })]
                                                        return {
                                                            'type': $property_type_,
                                                        }
                                                    }))
                                                    default: return p.exhaustive($s[0])
                                                }
                                            },
                                        )
                                        return {
                                            'option': $property_option,
                                            'value': $property_value,
                                        }
                                    })]
                                    return {
                                        'type': $property_type_,
                                    }
                                }))
                                default: return p.exhaustive($s[0])
                            }
                        },
                    )),
                    'tail': p.change_context($['tail'], ($) => Relative_Value_Selection(
                        $,
                    )),
                },
            )
            return {
                'properties': $property_properties,
            }
        })]
        return {
            'type': $property_type_,
        }
    })
    
    export const Lookup_Selection: d.resolver.Lookup_Selection = ($) => p.literal.group_resolve(() => {
        const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
            const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                {
                    'type': p.change_context($['type'], ($) => p.from.state($).decide(
                        ($s): s_target.Value => {
                            switch ($s[0]) {
                                case 'acyclic': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                        const $property_option: s_target.Value.type_.type_.state.option = 'acyclic'
                                        const $property_value: s_target.Value.type_.type_.state.value = p.from.state($).decide(
                                            ($s): s_target.Value => {
                                                switch ($s[0]) {
                                                    case 'siblings': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                        const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                            const $property_option: s_target.Value.type_.type_.state.option = 'siblings'
                                                            const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                const $property_type_: s_target.Value.type_ = ['nothing', null]
                                                                return {
                                                                    'type': $property_type_,
                                                                }
                                                            })
                                                            return {
                                                                'option': $property_option,
                                                                'value': $property_value,
                                                            }
                                                        })]
                                                        return {
                                                            'type': $property_type_,
                                                        }
                                                    }))
                                                    case 'resolved dictionary': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                        const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                            const $property_option: s_target.Value.type_.type_.state.option = 'resolved dictionary'
                                                            const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                                                    const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                                                        {
                                                                            'selection': p.change_context($['selection'], ($) => Guaranteed_Value_Selection(
                                                                                $,
                                                                            )),
                                                                        },
                                                                    )
                                                                    return {
                                                                        'properties': $property_properties,
                                                                    }
                                                                })]
                                                                return {
                                                                    'type': $property_type_,
                                                                }
                                                            })
                                                            return {
                                                                'option': $property_option,
                                                                'value': $property_value,
                                                            }
                                                        })]
                                                        return {
                                                            'type': $property_type_,
                                                        }
                                                    }))
                                                    default: return p.exhaustive($s[0])
                                                }
                                            },
                                        )
                                        return {
                                            'option': $property_option,
                                            'value': $property_value,
                                        }
                                    })]
                                    return {
                                        'type': $property_type_,
                                    }
                                }))
                                case 'cyclic': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                        const $property_option: s_target.Value.type_.type_.state.option = 'cyclic'
                                        const $property_value: s_target.Value.type_.type_.state.value = p.from.state($).decide(
                                            ($s): s_target.Value => {
                                                switch ($s[0]) {
                                                    case 'siblings': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                        const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                            const $property_option: s_target.Value.type_.type_.state.option = 'siblings'
                                                            const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                const $property_type_: s_target.Value.type_ = ['nothing', null]
                                                                return {
                                                                    'type': $property_type_,
                                                                }
                                                            })
                                                            return {
                                                                'option': $property_option,
                                                                'value': $property_value,
                                                            }
                                                        })]
                                                        return {
                                                            'type': $property_type_,
                                                        }
                                                    }))
                                                    default: return p.exhaustive($s[0])
                                                }
                                            },
                                        )
                                        return {
                                            'option': $property_option,
                                            'value': $property_value,
                                        }
                                    })]
                                    return {
                                        'type': $property_type_,
                                    }
                                }))
                                case 'parameter': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                        const $property_option: s_target.Value.type_.type_.state.option = 'parameter'
                                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                            const $property_type_: s_target.Value.type_ = ['reference', $]
                                            return {
                                                'type': $property_type_,
                                            }
                                        })
                                        return {
                                            'option': $property_option,
                                            'value': $property_value,
                                        }
                                    })]
                                    return {
                                        'type': $property_type_,
                                    }
                                }))
                                default: return p.exhaustive($s[0])
                            }
                        },
                    )),
                },
            )
            return {
                'properties': $property_properties,
            }
        })]
        return {
            'type': $property_type_,
        }
    })
    
    export const Reference_Constraints: d.resolver.Reference_Constraints = ($) => p.literal.group_resolve(() => {
        const $property_type_: s_target.Value.type_ = ['optional', p.from.optional($).map(
            ($): s_target.Value.type_.type_.optional.O => p.literal.group_resolve(() => {
                const $property_type_: s_target.Value.type_ = ['dictionary', p.literal.group_resolve(() => {
                    const $property_entries: s_target.Value.type_.type_.dictionary.entries = p.from.dictionary($).map(
                        ($): s_target.Value.type_.type_.dictionary.entries.D => p.literal.group_resolve(() => {
                            const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                    {
                                        'start': p.change_context($['start'], ($) => p.from.state($).decide(
                                            ($s): s_target.Value => {
                                                switch ($s[0]) {
                                                    case 'value': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                        const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                            const $property_option: s_target.Value.type_.type_.state.option = 'value'
                                                            const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                const $property_type_: s_target.Value.type_ = ['nothing', null]
                                                                return {
                                                                    'type': $property_type_,
                                                                }
                                                            })
                                                            return {
                                                                'option': $property_option,
                                                                'value': $property_value,
                                                            }
                                                        })]
                                                        return {
                                                            'type': $property_type_,
                                                        }
                                                    }))
                                                    case 'sibling': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                        const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                            const $property_option: s_target.Value.type_.type_.state.option = 'sibling'
                                                            const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                return {
                                                                    'type': $property_type_,
                                                                }
                                                            })
                                                            return {
                                                                'option': $property_option,
                                                                'value': $property_value,
                                                            }
                                                        })]
                                                        return {
                                                            'type': $property_type_,
                                                        }
                                                    }))
                                                    default: return p.exhaustive($s[0])
                                                }
                                            },
                                        )),
                                        'constraint': p.change_context($['constraint'], ($) => p.literal.group_resolve(() => {
                                            const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                                const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                                    {
                                                        'selection': p.change_context($['selection'], ($) => Relative_Value_Selection(
                                                            $,
                                                        )),
                                                        'type': p.change_context($['type'], ($) => p.from.state($).decide(
                                                            ($s): s_target.Value => {
                                                                switch ($s[0]) {
                                                                    case 'state': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                                        const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                                            const $property_option: s_target.Value.type_.type_.state.option = 'state'
                                                                            const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                                const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                                                                    const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                                                                        {
                                                                                            'option': p.change_context($['option'], ($) => p.literal.group_resolve(() => {
                                                                                                const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                                                return {
                                                                                                    'type': $property_type_,
                                                                                                }
                                                                                            })),
                                                                                        },
                                                                                    )
                                                                                    return {
                                                                                        'properties': $property_properties,
                                                                                    }
                                                                                })]
                                                                                return {
                                                                                    'type': $property_type_,
                                                                                }
                                                                            })
                                                                            return {
                                                                                'option': $property_option,
                                                                                'value': $property_value,
                                                                            }
                                                                        })]
                                                                        return {
                                                                            'type': $property_type_,
                                                                        }
                                                                    }))
                                                                    case 'optional value': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                                        const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                                            const $property_option: s_target.Value.type_.type_.state.option = 'optional value'
                                                                            const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                                const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                                                                    const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                                                                        {},
                                                                                    )
                                                                                    return {
                                                                                        'properties': $property_properties,
                                                                                    }
                                                                                })]
                                                                                return {
                                                                                    'type': $property_type_,
                                                                                }
                                                                            })
                                                                            return {
                                                                                'option': $property_option,
                                                                                'value': $property_value,
                                                                            }
                                                                        })]
                                                                        return {
                                                                            'type': $property_type_,
                                                                        }
                                                                    }))
                                                                    default: return p.exhaustive($s[0])
                                                                }
                                                            },
                                                        )),
                                                    },
                                                )
                                                return {
                                                    'properties': $property_properties,
                                                }
                                            })]
                                            return {
                                                'type': $property_type_,
                                            }
                                        })),
                                    },
                                )
                                return {
                                    'properties': $property_properties,
                                }
                            })]
                            return {
                                'type': $property_type_,
                            }
                        }),
                    )
                    return {
                        'entries': $property_entries,
                    }
                })]
                return {
                    'type': $property_type_,
                }
            }),
        )]
        return {
            'type': $property_type_,
        }
    })
    
    export const Resolver: d.resolver.Resolver = ($) => p.literal.group_resolve(() => {
        const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
            const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                {
                    'namespaces': p.change_context($['namespaces'], ($) => p.literal.group_resolve(() => {
                        const $property_type_: s_target.Value.type_ = ['dictionary', p.literal.group_resolve(() => {
                            const $property_entries: s_target.Value.type_.type_.dictionary.entries = p.from.dictionary($).map(
                                ($): s_target.Value.type_.type_.dictionary.entries.D => Resolver(
                                    $,
                                ),
                            )
                            return {
                                'entries': $property_entries,
                            }
                        })]
                        return {
                            'type': $property_type_,
                        }
                    })),
                    'types': p.change_context($['types'], ($) => p.literal.group_resolve(() => {
                        const $property_type_: s_target.Value.type_ = ['dictionary', p.literal.group_resolve(() => {
                            const $property_entries: s_target.Value.type_.type_.dictionary.entries = p.from.dictionary($).map(
                                ($): s_target.Value.type_.type_.dictionary.entries.D => p.literal.group_resolve(() => {
                                    const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                        const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                            {
                                                'root value resolver': p.change_context($['root value resolver'], ($) => Value(
                                                    $,
                                                )),
                                            },
                                        )
                                        return {
                                            'properties': $property_properties,
                                        }
                                    })]
                                    return {
                                        'type': $property_type_,
                                    }
                                }),
                            )
                            return {
                                'entries': $property_entries,
                            }
                        })]
                        return {
                            'type': $property_type_,
                        }
                    })),
                },
            )
            return {
                'properties': $property_properties,
            }
        })]
        return {
            'type': $property_type_,
        }
    })
    
    export const Result_Selection: d.resolver.Result_Selection = ($) => p.from.state($).decide(
        ($s): s_target.Value => {
            switch ($s[0]) {
                case 'context': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                        const $property_option: s_target.Value.type_.type_.state.option = 'context'
                        const $property_value: s_target.Value.type_.type_.state.value = Guaranteed_Value_Selection(
                            $,
                        )
                        return {
                            'option': $property_option,
                            'value': $property_value,
                        }
                    })]
                    return {
                        'type': $property_type_,
                    }
                }))
                case 'value': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                        const $property_option: s_target.Value.type_.type_.state.option = 'value'
                        const $property_value: s_target.Value.type_.type_.state.value = Relative_Value_Selection(
                            $,
                        )
                        return {
                            'option': $property_option,
                            'value': $property_value,
                        }
                    })]
                    return {
                        'type': $property_type_,
                    }
                }))
                default: return p.exhaustive($s[0])
            }
        },
    )
    
    export const Checks: d.resolver.Checks = ($) => p.literal.group_resolve(() => {
        const $property_type_: s_target.Value.type_ = ['optional', p.from.optional($).map(
            ($): s_target.Value.type_.type_.optional.O => p.literal.group_resolve(() => {
                const $property_type_: s_target.Value.type_ = ['dictionary', p.literal.group_resolve(() => {
                    const $property_entries: s_target.Value.type_.type_.dictionary.entries = p.from.dictionary($).map(
                        ($): s_target.Value.type_.type_.dictionary.entries.D => p.literal.group_resolve(() => {
                            const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                    {
                                        'expected': p.change_context($['expected'], ($) => Result_Selection(
                                            $,
                                        )),
                                        'actual': p.change_context($['actual'], ($) => Result_Selection(
                                            $,
                                        )),
                                    },
                                )
                                return {
                                    'properties': $property_properties,
                                }
                            })]
                            return {
                                'type': $property_type_,
                            }
                        }),
                    )
                    return {
                        'entries': $property_entries,
                    }
                })]
                return {
                    'type': $property_type_,
                }
            }),
        )]
        return {
            'type': $property_type_,
        }
    })
    
    export const Value: d.resolver.Value = ($) => p.from.state($).decide(
        ($s): s_target.Value => {
            switch ($s[0]) {
                case 'component': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                        const $property_option: s_target.Value.type_.type_.state.option = 'component'
                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                            const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                    {
                                        'location': p.change_context($['location'], ($) => p.from.state($).decide(
                                            ($s): s_target.Value => {
                                                switch ($s[0]) {
                                                    case 'local': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                        const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                            const $property_option: s_target.Value.type_.type_.state.option = 'local'
                                                            const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                return {
                                                                    'type': $property_type_,
                                                                }
                                                            })
                                                            return {
                                                                'option': $property_option,
                                                                'value': $property_value,
                                                            }
                                                        })]
                                                        return {
                                                            'type': $property_type_,
                                                        }
                                                    }))
                                                    case 'child namespace': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                        const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                            const $property_option: s_target.Value.type_.type_.state.option = 'child namespace'
                                                            const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                                                    const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                                                        {
                                                                            'namespace': p.change_context($['namespace'], ($) => p.literal.group_resolve(() => {
                                                                                const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                                return {
                                                                                    'type': $property_type_,
                                                                                }
                                                                            })),
                                                                            'resolver': p.change_context($['resolver'], ($) => p.literal.group_resolve(() => {
                                                                                const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                                return {
                                                                                    'type': $property_type_,
                                                                                }
                                                                            })),
                                                                        },
                                                                    )
                                                                    return {
                                                                        'properties': $property_properties,
                                                                    }
                                                                })]
                                                                return {
                                                                    'type': $property_type_,
                                                                }
                                                            })
                                                            return {
                                                                'option': $property_option,
                                                                'value': $property_value,
                                                            }
                                                        })]
                                                        return {
                                                            'type': $property_type_,
                                                        }
                                                    }))
                                                    case 'sibling namespace': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                        const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                            const $property_option: s_target.Value.type_.type_.state.option = 'sibling namespace'
                                                            const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                                                    const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                                                        {
                                                                            'namespace': p.change_context($['namespace'], ($) => p.literal.group_resolve(() => {
                                                                                const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                                return {
                                                                                    'type': $property_type_,
                                                                                }
                                                                            })),
                                                                            'resolver': p.change_context($['resolver'], ($) => p.literal.group_resolve(() => {
                                                                                const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                                return {
                                                                                    'type': $property_type_,
                                                                                }
                                                                            })),
                                                                        },
                                                                    )
                                                                    return {
                                                                        'properties': $property_properties,
                                                                    }
                                                                })]
                                                                return {
                                                                    'type': $property_type_,
                                                                }
                                                            })
                                                            return {
                                                                'option': $property_option,
                                                                'value': $property_value,
                                                            }
                                                        })]
                                                        return {
                                                            'type': $property_type_,
                                                        }
                                                    }))
                                                    default: return p.exhaustive($s[0])
                                                }
                                            },
                                        )),
                                        'arguments': p.change_context($['arguments'], ($) => p.literal.group_resolve(() => {
                                            const $property_type_: s_target.Value.type_ = ['optional', p.from.optional($).map(
                                                ($): s_target.Value.type_.type_.optional.O => p.literal.group_resolve(() => {
                                                    const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                                        const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                                            {
                                                                'types': p.change_context($['types'], ($) => p.literal.group_resolve(() => {
                                                                    const $property_type_: s_target.Value.type_ = ['optional', p.from.optional($).map(
                                                                        ($): s_target.Value.type_.type_.optional.O => p.literal.group_resolve(() => {
                                                                            const $property_type_: s_target.Value.type_ = ['dictionary', p.literal.group_resolve(() => {
                                                                                const $property_entries: s_target.Value.type_.type_.dictionary.entries = p.from.dictionary($).map(
                                                                                    ($): s_target.Value.type_.type_.dictionary.entries.D => p.from.state($).decide(
                                                                                        ($s): s_target.Value => {
                                                                                            switch ($s[0]) {
                                                                                                case 'optional': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                                                                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                                                                        const $property_option: s_target.Value.type_.type_.state.option = 'optional'
                                                                                                        const $property_value: s_target.Value.type_.type_.state.value = p.from.state($).decide(
                                                                                                            ($s): s_target.Value => {
                                                                                                                switch ($s[0]) {
                                                                                                                    case 'not set': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                                                                                        const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                                                                                            const $property_option: s_target.Value.type_.type_.state.option = 'not set'
                                                                                                                            const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                                                                                const $property_type_: s_target.Value.type_ = ['nothing', null]
                                                                                                                                return {
                                                                                                                                    'type': $property_type_,
                                                                                                                                }
                                                                                                                            })
                                                                                                                            return {
                                                                                                                                'option': $property_option,
                                                                                                                                'value': $property_value,
                                                                                                                            }
                                                                                                                        })]
                                                                                                                        return {
                                                                                                                            'type': $property_type_,
                                                                                                                        }
                                                                                                                    }))
                                                                                                                    case 'set': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                                                                                        const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                                                                                            const $property_option: s_target.Value.type_.type_.state.option = 'set'
                                                                                                                            const $property_value: s_target.Value.type_.type_.state.value = Guaranteed_Value_Selection(
                                                                                                                                $,
                                                                                                                            )
                                                                                                                            return {
                                                                                                                                'option': $property_option,
                                                                                                                                'value': $property_value,
                                                                                                                            }
                                                                                                                        })]
                                                                                                                        return {
                                                                                                                            'type': $property_type_,
                                                                                                                        }
                                                                                                                    }))
                                                                                                                    case 'selection': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                                                                                        const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                                                                                            const $property_option: s_target.Value.type_.type_.state.option = 'selection'
                                                                                                                            const $property_value: s_target.Value.type_.type_.state.value = Possible_Value_Selection(
                                                                                                                                $,
                                                                                                                            )
                                                                                                                            return {
                                                                                                                                'option': $property_option,
                                                                                                                                'value': $property_value,
                                                                                                                            }
                                                                                                                        })]
                                                                                                                        return {
                                                                                                                            'type': $property_type_,
                                                                                                                        }
                                                                                                                    }))
                                                                                                                    default: return p.exhaustive($s[0])
                                                                                                                }
                                                                                                            },
                                                                                                        )
                                                                                                        return {
                                                                                                            'option': $property_option,
                                                                                                            'value': $property_value,
                                                                                                        }
                                                                                                    })]
                                                                                                    return {
                                                                                                        'type': $property_type_,
                                                                                                    }
                                                                                                }))
                                                                                                case 'required': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                                                                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                                                                        const $property_option: s_target.Value.type_.type_.state.option = 'required'
                                                                                                        const $property_value: s_target.Value.type_.type_.state.value = Guaranteed_Value_Selection(
                                                                                                            $,
                                                                                                        )
                                                                                                        return {
                                                                                                            'option': $property_option,
                                                                                                            'value': $property_value,
                                                                                                        }
                                                                                                    })]
                                                                                                    return {
                                                                                                        'type': $property_type_,
                                                                                                    }
                                                                                                }))
                                                                                                case 'parameter': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                                                                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                                                                        const $property_option: s_target.Value.type_.type_.state.option = 'parameter'
                                                                                                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                                                            const $property_type_: s_target.Value.type_ = ['reference', $]
                                                                                                            return {
                                                                                                                'type': $property_type_,
                                                                                                            }
                                                                                                        })
                                                                                                        return {
                                                                                                            'option': $property_option,
                                                                                                            'value': $property_value,
                                                                                                        }
                                                                                                    })]
                                                                                                    return {
                                                                                                        'type': $property_type_,
                                                                                                    }
                                                                                                }))
                                                                                                default: return p.exhaustive($s[0])
                                                                                            }
                                                                                        },
                                                                                    ),
                                                                                )
                                                                                return {
                                                                                    'entries': $property_entries,
                                                                                }
                                                                            })]
                                                                            return {
                                                                                'type': $property_type_,
                                                                            }
                                                                        }),
                                                                    )]
                                                                    return {
                                                                        'type': $property_type_,
                                                                    }
                                                                })),
                                                                'lookups': p.change_context($['lookups'], ($) => p.literal.group_resolve(() => {
                                                                    const $property_type_: s_target.Value.type_ = ['optional', p.from.optional($).map(
                                                                        ($): s_target.Value.type_.type_.optional.O => p.literal.group_resolve(() => {
                                                                            const $property_type_: s_target.Value.type_ = ['dictionary', p.literal.group_resolve(() => {
                                                                                const $property_entries: s_target.Value.type_.type_.dictionary.entries = p.from.dictionary($).map(
                                                                                    ($): s_target.Value.type_.type_.dictionary.entries.D => p.from.state($).decide(
                                                                                        ($s): s_target.Value => {
                                                                                            switch ($s[0]) {
                                                                                                case 'acyclic': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                                                                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                                                                        const $property_option: s_target.Value.type_.type_.state.option = 'acyclic'
                                                                                                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                                                            const $property_type_: s_target.Value.type_ = ['nothing', null]
                                                                                                            return {
                                                                                                                'type': $property_type_,
                                                                                                            }
                                                                                                        })
                                                                                                        return {
                                                                                                            'option': $property_option,
                                                                                                            'value': $property_value,
                                                                                                        }
                                                                                                    })]
                                                                                                    return {
                                                                                                        'type': $property_type_,
                                                                                                    }
                                                                                                }))
                                                                                                case 'cyclic': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                                                                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                                                                        const $property_option: s_target.Value.type_.type_.state.option = 'cyclic'
                                                                                                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                                                                                                            const $property_type_: s_target.Value.type_ = ['nothing', null]
                                                                                                            return {
                                                                                                                'type': $property_type_,
                                                                                                            }
                                                                                                        })
                                                                                                        return {
                                                                                                            'option': $property_option,
                                                                                                            'value': $property_value,
                                                                                                        }
                                                                                                    })]
                                                                                                    return {
                                                                                                        'type': $property_type_,
                                                                                                    }
                                                                                                }))
                                                                                                case 'selection': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                                                                                                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                                                                                                        const $property_option: s_target.Value.type_.type_.state.option = 'selection'
                                                                                                        const $property_value: s_target.Value.type_.type_.state.value = Lookup_Selection(
                                                                                                            $,
                                                                                                        )
                                                                                                        return {
                                                                                                            'option': $property_option,
                                                                                                            'value': $property_value,
                                                                                                        }
                                                                                                    })]
                                                                                                    return {
                                                                                                        'type': $property_type_,
                                                                                                    }
                                                                                                }))
                                                                                                default: return p.exhaustive($s[0])
                                                                                            }
                                                                                        },
                                                                                    ),
                                                                                )
                                                                                return {
                                                                                    'entries': $property_entries,
                                                                                }
                                                                            })]
                                                                            return {
                                                                                'type': $property_type_,
                                                                            }
                                                                        }),
                                                                    )]
                                                                    return {
                                                                        'type': $property_type_,
                                                                    }
                                                                })),
                                                            },
                                                        )
                                                        return {
                                                            'properties': $property_properties,
                                                        }
                                                    })]
                                                    return {
                                                        'type': $property_type_,
                                                    }
                                                }),
                                            )]
                                            return {
                                                'type': $property_type_,
                                            }
                                        })),
                                        'constraints': p.change_context($['constraints'], ($) => Reference_Constraints(
                                            $,
                                        )),
                                    },
                                )
                                return {
                                    'properties': $property_properties,
                                }
                            })]
                            return {
                                'type': $property_type_,
                            }
                        })
                        return {
                            'option': $property_option,
                            'value': $property_value,
                        }
                    })]
                    return {
                        'type': $property_type_,
                    }
                }))
                case 'dictionary': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                        const $property_option: s_target.Value.type_.type_.state.option = 'dictionary'
                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                            const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                    {
                                        'resolver': p.change_context($['resolver'], ($) => Value(
                                            $,
                                        )),
                                        'benchmark': p.change_context($['benchmark'], ($) => p.literal.group_resolve(() => {
                                            const $property_type_: s_target.Value.type_ = ['optional', p.from.optional($).map(
                                                ($): s_target.Value.type_.type_.optional.O => p.literal.group_resolve(() => {
                                                    const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                                        const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                                            {
                                                                'selection': p.change_context($['selection'], ($) => Guaranteed_Value_Selection(
                                                                    $,
                                                                )),
                                                            },
                                                        )
                                                        return {
                                                            'properties': $property_properties,
                                                        }
                                                    })]
                                                    return {
                                                        'type': $property_type_,
                                                    }
                                                }),
                                            )]
                                            return {
                                                'type': $property_type_,
                                            }
                                        })),
                                    },
                                )
                                return {
                                    'properties': $property_properties,
                                }
                            })]
                            return {
                                'type': $property_type_,
                            }
                        })
                        return {
                            'option': $property_option,
                            'value': $property_value,
                        }
                    })]
                    return {
                        'type': $property_type_,
                    }
                }))
                case 'group': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                        const $property_option: s_target.Value.type_.type_.state.option = 'group'
                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                            const $property_type_: s_target.Value.type_ = ['dictionary', p.literal.group_resolve(() => {
                                const $property_entries: s_target.Value.type_.type_.dictionary.entries = p.from.dictionary($).map(
                                    ($): s_target.Value.type_.type_.dictionary.entries.D => p.literal.group_resolve(() => {
                                        const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                            const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                                {
                                                    'resolver': p.change_context($['resolver'], ($) => Value(
                                                        $,
                                                    )),
                                                },
                                            )
                                            return {
                                                'properties': $property_properties,
                                            }
                                        })]
                                        return {
                                            'type': $property_type_,
                                        }
                                    }),
                                )
                                return {
                                    'entries': $property_entries,
                                }
                            })]
                            return {
                                'type': $property_type_,
                            }
                        })
                        return {
                            'option': $property_option,
                            'value': $property_value,
                        }
                    })]
                    return {
                        'type': $property_type_,
                    }
                }))
                case 'list': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                        const $property_option: s_target.Value.type_.type_.state.option = 'list'
                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                            const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                    {
                                        'resolver': p.change_context($['resolver'], ($) => Value(
                                            $,
                                        )),
                                        'result': p.change_context($['result'], ($) => p.literal.group_resolve(() => {
                                            const $property_type_: s_target.Value.type_ = ['optional', p.from.optional($).map(
                                                ($): s_target.Value.type_.type_.optional.O => p.literal.group_resolve(() => {
                                                    const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                                        const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                                            {
                                                                'initial': p.change_context($['initial'], ($) => Guaranteed_Value_Selection(
                                                                    $,
                                                                )),
                                                                'next': p.change_context($['next'], ($) => Result_Selection(
                                                                    $,
                                                                )),
                                                            },
                                                        )
                                                        return {
                                                            'properties': $property_properties,
                                                        }
                                                    })]
                                                    return {
                                                        'type': $property_type_,
                                                    }
                                                }),
                                            )]
                                            return {
                                                'type': $property_type_,
                                            }
                                        })),
                                    },
                                )
                                return {
                                    'properties': $property_properties,
                                }
                            })]
                            return {
                                'type': $property_type_,
                            }
                        })
                        return {
                            'option': $property_option,
                            'value': $property_value,
                        }
                    })]
                    return {
                        'type': $property_type_,
                    }
                }))
                case 'nothing': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                        const $property_option: s_target.Value.type_.type_.state.option = 'nothing'
                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                            const $property_type_: s_target.Value.type_ = ['nothing', null]
                            return {
                                'type': $property_type_,
                            }
                        })
                        return {
                            'option': $property_option,
                            'value': $property_value,
                        }
                    })]
                    return {
                        'type': $property_type_,
                    }
                }))
                case 'simple': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                        const $property_option: s_target.Value.type_.type_.state.option = 'simple'
                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                            const $property_type_: s_target.Value.type_ = ['nothing', null]
                            return {
                                'type': $property_type_,
                            }
                        })
                        return {
                            'option': $property_option,
                            'value': $property_value,
                        }
                    })]
                    return {
                        'type': $property_type_,
                    }
                }))
                case 'optional': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                        const $property_option: s_target.Value.type_.type_.state.option = 'optional'
                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                            const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                    {
                                        'presence': p.change_context($['presence'], ($) => p.literal.group_resolve(() => {
                                            const $property_type_: s_target.Value.type_ = ['optional', p.from.optional($).map(
                                                ($): s_target.Value.type_.type_.optional.O => Possible_Value_Selection(
                                                    $,
                                                ),
                                            )]
                                            return {
                                                'type': $property_type_,
                                            }
                                        })),
                                        'constraints': p.change_context($['constraints'], ($) => Option_Constraints(
                                            $,
                                        )),
                                        'resolver': p.change_context($['resolver'], ($) => Value(
                                            $,
                                        )),
                                        'not set constraints': p.change_context($['not set constraints'], ($) => p.literal.group_resolve(() => {
                                            const $property_type_: s_target.Value.type_ = ['optional', p.from.optional($).map(
                                                ($): s_target.Value.type_.type_.optional.O => p.literal.group_resolve(() => {
                                                    const $property_type_: s_target.Value.type_ = ['dictionary', p.literal.group_resolve(() => {
                                                        const $property_entries: s_target.Value.type_.type_.dictionary.entries = p.from.dictionary($).map(
                                                            ($): s_target.Value.type_.type_.dictionary.entries.D => Possible_Value_Selection(
                                                                $,
                                                            ),
                                                        )
                                                        return {
                                                            'entries': $property_entries,
                                                        }
                                                    })]
                                                    return {
                                                        'type': $property_type_,
                                                    }
                                                }),
                                            )]
                                            return {
                                                'type': $property_type_,
                                            }
                                        })),
                                        'result': p.change_context($['result'], ($) => p.literal.group_resolve(() => {
                                            const $property_type_: s_target.Value.type_ = ['optional', p.from.optional($).map(
                                                ($): s_target.Value.type_.type_.optional.O => Result_Selection(
                                                    $,
                                                ),
                                            )]
                                            return {
                                                'type': $property_type_,
                                            }
                                        })),
                                        'checks': p.change_context($['checks'], ($) => Checks(
                                            $,
                                        )),
                                    },
                                )
                                return {
                                    'properties': $property_properties,
                                }
                            })]
                            return {
                                'type': $property_type_,
                            }
                        })
                        return {
                            'option': $property_option,
                            'value': $property_value,
                        }
                    })]
                    return {
                        'type': $property_type_,
                    }
                }))
                case 'reference': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                        const $property_option: s_target.Value.type_.type_.state.option = 'reference'
                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                            const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                    {
                                        'type': p.change_context($['type'], ($) => p.literal.group_resolve(() => {
                                            const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                                const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                                    {
                                                        'lookup': p.change_context($['lookup'], ($) => Lookup_Selection(
                                                            $,
                                                        )),
                                                        'constraints': p.change_context($['constraints'], ($) => Reference_Constraints(
                                                            $,
                                                        )),
                                                    },
                                                )
                                                return {
                                                    'properties': $property_properties,
                                                }
                                            })]
                                            return {
                                                'type': $property_type_,
                                            }
                                        })),
                                    },
                                )
                                return {
                                    'properties': $property_properties,
                                }
                            })]
                            return {
                                'type': $property_type_,
                            }
                        })
                        return {
                            'option': $property_option,
                            'value': $property_value,
                        }
                    })]
                    return {
                        'type': $property_type_,
                    }
                }))
                case 'state': return p.option($s, ($): s_target.Value => p.literal.group_resolve(() => {
                    const $property_type_: s_target.Value.type_ = ['state', p.literal.group_resolve(() => {
                        const $property_option: s_target.Value.type_.type_.state.option = 'state'
                        const $property_value: s_target.Value.type_.type_.state.value = p.literal.group_resolve(() => {
                            const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                    {
                                        'options': p.change_context($['options'], ($) => p.literal.group_resolve(() => {
                                            const $property_type_: s_target.Value.type_ = ['dictionary', p.literal.group_resolve(() => {
                                                const $property_entries: s_target.Value.type_.type_.dictionary.entries = p.from.dictionary($).map(
                                                    ($): s_target.Value.type_.type_.dictionary.entries.D => p.literal.group_resolve(() => {
                                                        const $property_type_: s_target.Value.type_ = ['group', p.literal.group_resolve(() => {
                                                            const $property_properties: s_target.Value.type_.type_.group.properties = p.literal.dictionary(
                                                                {
                                                                    'constraints': p.change_context($['constraints'], ($) => Option_Constraints(
                                                                        $,
                                                                    )),
                                                                    'resolver': p.change_context($['resolver'], ($) => Value(
                                                                        $,
                                                                    )),
                                                                    'result': p.change_context($['result'], ($) => p.literal.group_resolve(() => {
                                                                        const $property_type_: s_target.Value.type_ = ['optional', p.from.optional($).map(
                                                                            ($): s_target.Value.type_.type_.optional.O => Result_Selection(
                                                                                $,
                                                                            ),
                                                                        )]
                                                                        return {
                                                                            'type': $property_type_,
                                                                        }
                                                                    })),
                                                                    'checks': p.change_context($['checks'], ($) => Checks(
                                                                        $,
                                                                    )),
                                                                },
                                                            )
                                                            return {
                                                                'properties': $property_properties,
                                                            }
                                                        })]
                                                        return {
                                                            'type': $property_type_,
                                                        }
                                                    }),
                                                )
                                                return {
                                                    'entries': $property_entries,
                                                }
                                            })]
                                            return {
                                                'type': $property_type_,
                                            }
                                        })),
                                    },
                                )
                                return {
                                    'properties': $property_properties,
                                }
                            })]
                            return {
                                'type': $property_type_,
                            }
                        })
                        return {
                            'option': $property_option,
                            'value': $property_value,
                        }
                    })]
                    return {
                        'type': $property_type_,
                    }
                }))
                default: return p.exhaustive($s[0])
            }
        },
    )
}
