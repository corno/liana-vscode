import * as p from 'pareto-core/transformer/implementation'

import type * as d from "../../../../declarations/schemas/resolved/downtransformers/unresolve.js"

import type * as s_target from "../../../../structure/schemas/unresolved.js"

export namespace structure {
    
    export const Basic_Types: d.structure.Basic_Types = ($) => p.with.map_dictionary(
        $,
        ($, $id): s_target.structure.Basic_Types.D => p.initialize.group(() => {
            const $property_type: s_target.structure.Basic_Types.D.type_ = p.with.change_context($['type'], ($) => p.with.decide_state(
                $,
                ($s): s_target.structure.Basic_Types.D.type_ => {
                    switch ($s[0]) {
                        case 'double quoted': return p.option($s, ($): s_target.structure.Basic_Types.D.type_ => ['double quoted', null])
                        case 'undelimited': return p.option($s, ($): s_target.structure.Basic_Types.D.type_ => ['undelimited', null])
                        default: return p.exhaustive($s[0])
                    }
                },
            ))
            const $property_regular_expression: s_target.structure.Basic_Types.D.regular_expression = p.with.change_context($['regular expression'], ($) => p.with.map_optional(
                $,
                ($): s_target.structure.Basic_Types.D.regular_expression.O => Regular_Expression(
                    $,
                ),
            ))
            const $property_hyperlink: s_target.structure.Basic_Types.D.hyperlink = p.with.change_context($['hyperlink'], ($) => p.with.map_optional(
                $,
                ($): s_target.structure.Basic_Types.D.hyperlink.O => p.initialize.group(() => {
                    const $property_prefix: s_target.structure.Basic_Types.D.hyperlink.O.prefix = p.with.change_context($['prefix'], ($) => $)
                    const $property_suffix: s_target.structure.Basic_Types.D.hyperlink.O.suffix = p.with.change_context($['suffix'], ($) => $)
                    return {
                        'prefix': $property_prefix,
                        'suffix': $property_suffix,
                    }
                }),
            ))
            return {
                'type': $property_type,
                'regular expression': $property_regular_expression,
                'hyperlink': $property_hyperlink,
            }
        }),
    )
    
    export const Types: d.structure.Types = ($) => p.with.map_dictionary(
        $,
        ($, $id): s_target.structure.Types.D => Type(
            $,
        ),
    )
    
    export const Namespaces: d.structure.Namespaces = ($) => p.with.map_dictionary(
        $,
        ($, $id): s_target.structure.Namespaces.D => Structure(
            $,
        ),
    )
    
    export const Type: d.structure.Type = ($) => p.initialize.group(() => {
        const $property_visibility: s_target.structure.Type.visibility = p.with.change_context($['visibility'], ($) => p.with.decide_state(
            $,
            ($s): s_target.structure.Type.visibility => {
                switch ($s[0]) {
                    case 'private': return p.option($s, ($): s_target.structure.Type.visibility => ['private', null])
                    case 'private single use': return p.option($s, ($): s_target.structure.Type.visibility => ['private single use', null])
                    case 'public': return p.option($s, ($): s_target.structure.Type.visibility => ['public', null])
                    default: return p.exhaustive($s[0])
                }
            },
        ))
        const $property_root_value: s_target.structure.Type.root_value = p.with.change_context($['root value'], ($) => Value(
            $,
        ))
        return {
            'visibility': $property_visibility,
            'root value': $property_root_value,
        }
    })
    
    export const Group: d.structure.Group = ($) => p.with.map_dictionary(
        $,
        ($, $id): s_target.structure.Group.D => p.initialize.group(() => {
            const $property_description: s_target.structure.Group.D.description = p.with.change_context($['description'], ($) => p.with.map_optional(
                $,
                ($): s_target.structure.Group.D.description.O => $,
            ))
            const $property_value: s_target.structure.Group.D.value = p.with.change_context($['value'], ($) => Value(
                $,
            ))
            return {
                'description': $property_description,
                'value': $property_value,
            }
        }),
    )
    
    export const Value: d.structure.Value = ($) => p.with.decide_state(
        $,
        ($s): s_target.structure.Value => {
            switch ($s[0]) {
                case 'component': return p.option($s, ($): s_target.structure.Value => ['component', p.initialize.group(() => {
                    const $property_type: s_target.structure.Value.component.type_ = p.with.change_context($['type'], ($) => p.with.decide_state(
                        $,
                        ($s): s_target.structure.Value.component.type_ => {
                            switch ($s[0]) {
                                case 'simple': return p.option($s, ($): s_target.structure.Value.component.type_ => ['simple', p.with.change_context($['value'], ($) => p.with.decide_state(
                                    $,
                                    ($s): s_target.structure.Value.component.type_.simple => {
                                        switch ($s[0]) {
                                            case 'local': return p.option($s, ($): s_target.structure.Value.component.type_.simple => ['local', $['l id']])
                                            case 'child namespace': return p.option($s, ($): s_target.structure.Value.component.type_.simple => ['child namespace', p.initialize.group(() => {
                                                const $property_namespace: s_target.structure.Value.component.type_.simple.child_namespace.namespace = p.with.change_context($['namespace'], ($) => $['l id'])
                                                const $property_type: s_target.structure.Value.component.type_.simple.child_namespace.type_ = p.with.change_context($['type'], ($) => $['value']['l id'])
                                                return {
                                                    'namespace': $property_namespace,
                                                    'type': $property_type,
                                                }
                                            })])
                                            case 'sibling namespace': return p.option($s, ($): s_target.structure.Value.component.type_.simple => ['sibling namespace', p.initialize.group(() => {
                                                const $property_namespace: s_target.structure.Value.component.type_.simple.sibling_namespace.namespace = p.with.change_context($['namespace'], ($) => $['l id'])
                                                const $property_type: s_target.structure.Value.component.type_.simple.sibling_namespace.type_ = p.with.change_context($['type'], ($) => $['value']['l id'])
                                                return {
                                                    'namespace': $property_namespace,
                                                    'type': $property_type,
                                                }
                                            })])
                                            default: return p.exhaustive($s[0])
                                        }
                                    },
                                ))])
                                case 'cyclic': return p.option($s, ($): s_target.structure.Value.component.type_ => ['cyclic', $['l id']])
                                default: return p.exhaustive($s[0])
                            }
                        },
                    ))
                    const $property_constraints: s_target.structure.Value.component.constraints = p.with.change_context($['constraints'], ($) => Reference_Constraints(
                        $,
                    ))
                    return {
                        'type': $property_type,
                        'constraints': $property_constraints,
                    }
                })])
                case 'dictionary': return p.option($s, ($): s_target.structure.Value => ['dictionary', Dictionary(
                    $,
                )])
                case 'group': return p.option($s, ($): s_target.structure.Value => ['group', Group(
                    $,
                )])
                case 'list': return p.option($s, ($): s_target.structure.Value => ['list', p.initialize.group(() => {
                    const $property_value: s_target.structure.Value.list.value = p.with.change_context($['value'], ($) => Value(
                        $,
                    ))
                    const $property_result: s_target.structure.Value.list.result = p.with.change_context($['result'], ($) => Optional_Result(
                        $,
                    ))
                    return {
                        'value': $property_value,
                        'result': $property_result,
                    }
                })])
                case 'nothing': return p.option($s, ($): s_target.structure.Value => ['nothing', null])
                case 'simple': return p.option($s, ($): s_target.structure.Value => ['simple', p.with.change_context($['value'], ($) => $['l id'])])
                case 'optional': return p.option($s, ($): s_target.structure.Value => ['optional', p.initialize.group(() => {
                    const $property_constraints: s_target.structure.Value.optional.constraints = p.with.change_context($['constraints'], ($) => Option_Constraints(
                        $,
                    ))
                    const $property_value: s_target.structure.Value.optional.value = p.with.change_context($['value'], ($) => Value(
                        $,
                    ))
                    const $property_result: s_target.structure.Value.optional.result = p.with.change_context($['result'], ($) => Optional_Result(
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
                case 'state': return p.option($s, ($): s_target.structure.Value => ['state', p.initialize.group(() => {
                    const $property_options: s_target.structure.Value.state.options = p.with.change_context($['options'], ($) => p.with.map_dictionary(
                        $,
                        ($, $id): s_target.structure.Value.state.options.D => p.initialize.group(() => {
                            const $property_description: s_target.structure.Value.state.options.D.description = p.with.change_context($['description'], ($) => p.with.map_optional(
                                $,
                                ($): s_target.structure.Value.state.options.D.description.O => $,
                            ))
                            const $property_constraints: s_target.structure.Value.state.options.D.constraints = p.with.change_context($['constraints'], ($) => Option_Constraints(
                                $,
                            ))
                            const $property_value: s_target.structure.Value.state.options.D.value = p.with.change_context($['value'], ($) => Value(
                                $,
                            ))
                            return {
                                'description': $property_description,
                                'constraints': $property_constraints,
                                'value': $property_value,
                            }
                        }),
                    ))
                    const $property_result: s_target.structure.Value.state.result = p.with.change_context($['result'], ($) => Optional_Result(
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
    
    export const Dictionary: d.structure.Dictionary = ($) => p.initialize.group(() => {
        const $property_benchmark: s_target.structure.Dictionary.benchmark = p.with.change_context($['benchmark'], ($) => p.with.map_optional(
            $,
            ($): s_target.structure.Dictionary.benchmark.O => p.initialize.group(() => {
                const $property_selection: s_target.structure.Dictionary.benchmark.O.selection = p.with.change_context($['selection'], ($) => p.with.change_context($['value'], ($) => Value_Reference(
                    $,
                )))
                const $property_coverage: s_target.structure.Dictionary.benchmark.O.coverage = p.with.change_context($['coverage'], ($) => p.with.decide_state(
                    $,
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
        const $property_value: s_target.structure.Dictionary.value = p.with.change_context($['value'], ($) => Value(
            $,
        ))
        return {
            'benchmark': $property_benchmark,
            'value': $property_value,
        }
    })
    
    export const Value_Reference: d.structure.Value_Reference = ($) => p.initialize.group(() => {
        const $property_type: s_target.structure.Value_Reference.type_ = p.with.change_context($['type'], ($) => p.initialize.group(() => {
            const $property_location: s_target.structure.Value_Reference.type_.location = p.with.change_context($['location'], ($) => p.with.change_context($['value'], ($) => p.with.decide_state(
                $,
                ($s): s_target.structure.Value_Reference.type_.location => {
                    switch ($s[0]) {
                        case 'local': return p.option($s, ($): s_target.structure.Value_Reference.type_.location => ['local', $['l id']])
                        case 'child namespace': return p.option($s, ($): s_target.structure.Value_Reference.type_.location => ['child namespace', p.initialize.group(() => {
                            const $property_namespace: s_target.structure.Value_Reference.type_.location.child_namespace.namespace = p.with.change_context($['namespace'], ($) => $['l id'])
                            const $property_type: s_target.structure.Value_Reference.type_.location.child_namespace.type_ = p.with.change_context($['type'], ($) => $['l id'])
                            return {
                                'namespace': $property_namespace,
                                'type': $property_type,
                            }
                        })])
                        case 'sibling namespace': return p.option($s, ($): s_target.structure.Value_Reference.type_.location => ['sibling namespace', p.initialize.group(() => {
                            const $property_namespace: s_target.structure.Value_Reference.type_.location.sibling_namespace.namespace = p.with.change_context($['namespace'], ($) => $['l id'])
                            const $property_type: s_target.structure.Value_Reference.type_.location.sibling_namespace.type_ = p.with.change_context($['type'], ($) => $['l id'])
                            return {
                                'namespace': $property_namespace,
                                'type': $property_type,
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
        const $property_path: s_target.structure.Value_Reference.path = p.with.change_context($['path'], ($) => p.initialize.group(() => {
            const $property_tail: s_target.structure.Value_Reference.path.tail = p.with.change_context($['tail'], ($) => p.with.change_context($['value'], ($) => p.with.map_list(
                $,
                ($, $index): s_target.structure.Value_Reference.path.tail.L => p.with.change_context($['value'], ($) => p.with.change_context($['value'], ($) => p.with.decide_state(
                    $,
                    ($s): s_target.structure.Value_Reference.path.tail.L => {
                        switch ($s[0]) {
                            case 'dictionary': return p.option($s, ($): s_target.structure.Value_Reference.path.tail.L => ['dictionary', p.with.change_context($['value'], ($) => null)])
                            case 'group': return p.option($s, ($): s_target.structure.Value_Reference.path.tail.L => ['group', p.with.change_context($['value'], ($) => $['l id'])])
                            case 'list': return p.option($s, ($): s_target.structure.Value_Reference.path.tail.L => ['list', p.with.change_context($['value'], ($) => null)])
                            case 'optional': return p.option($s, ($): s_target.structure.Value_Reference.path.tail.L => ['optional', p.with.change_context($['value'], ($) => null)])
                            case 'state': return p.option($s, ($): s_target.structure.Value_Reference.path.tail.L => ['state', p.with.change_context($['value'], ($) => $['l id'])])
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
            'type': $property_type,
            'path': $property_path,
        }
    })
    
    export const Option_Constraints: d.structure.Option_Constraints = ($) => p.with.map_optional(
        $,
        ($): s_target.structure.Option_Constraints.O => p.with.map_dictionary(
            $,
            ($, $id): s_target.structure.Option_Constraints.O.D => Value_Reference(
                $,
            ),
        ),
    )
    
    export const Reference: d.structure.Reference = ($) => p.initialize.group(() => {
        const $property_referent: s_target.structure.Reference.referent = p.with.change_context($['referent'], ($) => p.with.change_context($['value'], ($) => Value_Reference(
            $,
        )))
        const $property_type: s_target.structure.Reference.type_ = p.with.change_context($['type'], ($) => p.initialize.group(() => {
            const $property_dependency: s_target.structure.Reference.type_.dependency = p.with.change_context($['dependency'], ($) => p.with.decide_state(
                $,
                ($s): s_target.structure.Reference.type_.dependency => {
                    switch ($s[0]) {
                        case 'acyclic': return p.option($s, ($): s_target.structure.Reference.type_.dependency => ['acyclic', null])
                        case 'cyclic': return p.option($s, ($): s_target.structure.Reference.type_.dependency => ['cyclic', null])
                        default: return p.exhaustive($s[0])
                    }
                },
            ))
            const $property_constraints: s_target.structure.Reference.type_.constraints = p.with.change_context($['constraints'], ($) => Reference_Constraints(
                $,
            ))
            return {
                'dependency': $property_dependency,
                'constraints': $property_constraints,
            }
        }))
        return {
            'referent': $property_referent,
            'type': $property_type,
        }
    })
    
    export const Reference_Constraints: d.structure.Reference_Constraints = ($) => p.with.map_optional(
        $,
        ($): s_target.structure.Reference_Constraints.O => p.with.map_dictionary(
            $,
            ($, $id): s_target.structure.Reference_Constraints.O.D => Value_Reference(
                $,
            ),
        ),
    )
    
    export const Regular_Expression: d.structure.Regular_Expression = ($) => p.with.decide_state(
        $,
        ($s): s_target.structure.Regular_Expression => {
            switch ($s[0]) {
                case 'any character': return p.option($s, ($): s_target.structure.Regular_Expression => ['any character', null])
                case 'literal': return p.option($s, ($): s_target.structure.Regular_Expression => ['literal', $])
                case 'character set': return p.option($s, ($): s_target.structure.Regular_Expression => ['character set', $])
                case 'sequence': return p.option($s, ($): s_target.structure.Regular_Expression => ['sequence', p.with.map_list(
                    $,
                    ($, $index): s_target.structure.Regular_Expression.sequence.L => Regular_Expression(
                        $,
                    ),
                )])
                case 'choice': return p.option($s, ($): s_target.structure.Regular_Expression => ['choice', p.with.map_list(
                    $,
                    ($, $index): s_target.structure.Regular_Expression.choice.L => Regular_Expression(
                        $,
                    ),
                )])
                case 'repetition': return p.option($s, ($): s_target.structure.Regular_Expression => ['repetition', p.initialize.group(() => {
                    const $property_expression: s_target.structure.Regular_Expression.repetition.expression = p.with.change_context($['expression'], ($) => Regular_Expression(
                        $,
                    ))
                    const $property_quantity: s_target.structure.Regular_Expression.repetition.quantity = p.with.change_context($['quantity'], ($) => p.with.decide_state(
                        $,
                        ($s): s_target.structure.Regular_Expression.repetition.quantity => {
                            switch ($s[0]) {
                                case 'optional': return p.option($s, ($): s_target.structure.Regular_Expression.repetition.quantity => ['optional', null])
                                case 'zero or more': return p.option($s, ($): s_target.structure.Regular_Expression.repetition.quantity => ['zero or more', null])
                                case 'one or more': return p.option($s, ($): s_target.structure.Regular_Expression.repetition.quantity => ['one or more', null])
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
    
    export const Structure: d.structure.Structure = ($) => p.initialize.group(() => {
        const $property_namespaces: s_target.structure.Structure.namespaces = p.with.change_context($['namespaces'], ($) => Namespaces(
            $,
        ))
        const $property_basic_types: s_target.structure.Structure.basic_types = p.with.change_context($['basic types'], ($) => Basic_Types(
            $,
        ))
        const $property_types: s_target.structure.Structure.types = p.with.change_context($['types'], ($) => Types(
            $,
        ))
        return {
            'namespaces': $property_namespaces,
            'basic types': $property_basic_types,
            'types': $property_types,
        }
    })
    
    export const Optional_Result: d.structure.Optional_Result = ($) => p.with.map_optional(
        $,
        ($): s_target.structure.Optional_Result.O => Value_Reference(
            $,
        ),
    )
}

export namespace declarations {
    
    export const Presence: d.declarations.Presence = ($) => p.with.decide_state(
        $,
        ($s): s_target.declarations.Presence => {
            switch ($s[0]) {
                case 'optional': return p.option($s, ($): s_target.declarations.Presence => ['optional', null])
                case 'required': return p.option($s, ($): s_target.declarations.Presence => ['required', null])
                default: return p.exhaustive($s[0])
            }
        },
    )
    
    export const Signature_Value_Reference: d.declarations.Signature_Value_Reference = ($) => p.initialize.group(() => {
        const $property_type: s_target.declarations.Signature_Value_Reference.type_ = p.with.change_context($['type'], ($) => p.initialize.group(() => {
            const $property_location: s_target.declarations.Signature_Value_Reference.type_.location = p.with.change_context($['location'], ($) => p.with.change_context($['value'], ($) => p.with.decide_state(
                $,
                ($s): s_target.declarations.Signature_Value_Reference.type_.location => {
                    switch ($s[0]) {
                        case 'local': return p.option($s, ($): s_target.declarations.Signature_Value_Reference.type_.location => ['local', $['l id']])
                        case 'child namespace': return p.option($s, ($): s_target.declarations.Signature_Value_Reference.type_.location => ['child namespace', p.initialize.group(() => {
                            const $property_namespace: s_target.declarations.Signature_Value_Reference.type_.location.child_namespace.namespace = p.with.change_context($['namespace'], ($) => $['l id'])
                            const $property_type: s_target.declarations.Signature_Value_Reference.type_.location.child_namespace.type_ = p.with.change_context($['type'], ($) => $['l id'])
                            return {
                                'namespace': $property_namespace,
                                'type': $property_type,
                            }
                        })])
                        case 'sibling namespace': return p.option($s, ($): s_target.declarations.Signature_Value_Reference.type_.location => ['sibling namespace', p.initialize.group(() => {
                            const $property_namespace: s_target.declarations.Signature_Value_Reference.type_.location.sibling_namespace.namespace = p.with.change_context($['namespace'], ($) => $['l id'])
                            const $property_type: s_target.declarations.Signature_Value_Reference.type_.location.sibling_namespace.type_ = p.with.change_context($['type'], ($) => $['l id'])
                            return {
                                'namespace': $property_namespace,
                                'type': $property_type,
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
        const $property_subselection: s_target.declarations.Signature_Value_Reference.subselection = p.with.change_context($['subselection'], ($) => p.initialize.group(() => {
            const $property_tail: s_target.declarations.Signature_Value_Reference.subselection.tail = p.with.change_context($['tail'], ($) => p.with.change_context($['value'], ($) => p.with.map_list(
                $,
                ($, $index): s_target.declarations.Signature_Value_Reference.subselection.tail.L => p.with.change_context($['value'], ($) => p.with.change_context($['value'], ($) => p.with.decide_state(
                    $,
                    ($s): s_target.declarations.Signature_Value_Reference.subselection.tail.L => {
                        switch ($s[0]) {
                            case 'dictionary': return p.option($s, ($): s_target.declarations.Signature_Value_Reference.subselection.tail.L => ['dictionary', p.with.change_context($['value'], ($) => null)])
                            case 'group': return p.option($s, ($): s_target.declarations.Signature_Value_Reference.subselection.tail.L => ['group', p.with.change_context($['value'], ($) => $['l id'])])
                            case 'list': return p.option($s, ($): s_target.declarations.Signature_Value_Reference.subselection.tail.L => ['list', p.with.change_context($['value'], ($) => null)])
                            case 'optional': return p.option($s, ($): s_target.declarations.Signature_Value_Reference.subselection.tail.L => ['optional', p.with.change_context($['value'], ($) => null)])
                            case 'state': return p.option($s, ($): s_target.declarations.Signature_Value_Reference.subselection.tail.L => ['state', p.with.change_context($['value'], ($) => $['l id'])])
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
            'type': $property_type,
            'subselection': $property_subselection,
        }
    })
    
    export const Signature: d.declarations.Signature = ($) => p.initialize.group(() => {
        const $property_values: s_target.declarations.Signature.values = p.with.change_context($['values'], ($) => p.with.map_dictionary(
            $,
            ($, $id): s_target.declarations.Signature.values.D => p.initialize.group(() => {
                const $property_value: s_target.declarations.Signature.values.D.value = p.with.change_context($['value'], ($) => Signature_Value_Reference(
                    $,
                ))
                const $property_presence: s_target.declarations.Signature.values.D.presence = p.with.change_context($['presence'], ($) => Presence(
                    $,
                ))
                return {
                    'value': $property_value,
                    'presence': $property_presence,
                }
            }),
        ))
        const $property_lookups: s_target.declarations.Signature.lookups = p.with.change_context($['lookups'], ($) => p.with.map_dictionary(
            $,
            ($, $id): s_target.declarations.Signature.lookups.D => p.initialize.group(() => {
                const $property_referent: s_target.declarations.Signature.lookups.D.referent = p.with.change_context($['referent'], ($) => p.with.change_context($['value'], ($) => Signature_Value_Reference(
                    $,
                )))
                const $property_type: s_target.declarations.Signature.lookups.D.type_ = p.with.change_context($['type'], ($) => p.with.decide_state(
                    $,
                    ($s): s_target.declarations.Signature.lookups.D.type_ => {
                        switch ($s[0]) {
                            case 'cyclic': return p.option($s, ($): s_target.declarations.Signature.lookups.D.type_ => ['cyclic', null])
                            case 'acyclic': return p.option($s, ($): s_target.declarations.Signature.lookups.D.type_ => ['acyclic', null])
                            default: return p.exhaustive($s[0])
                        }
                    },
                ))
                const $property_presence: s_target.declarations.Signature.lookups.D.presence = p.with.change_context($['presence'], ($) => Presence(
                    $,
                ))
                return {
                    'referent': $property_referent,
                    'type': $property_type,
                    'presence': $property_presence,
                }
            }),
        ))
        return {
            'values': $property_values,
            'lookups': $property_lookups,
        }
    })
    
    export const Declarations: d.declarations.Declarations = ($) => p.with.map_dictionary(
        $,
        ($, $id): s_target.declarations.Declarations.D => p.with.change_context($['value'], ($) => Declaration(
            $,
        )),
    )
    
    export const Declaration: d.declarations.Declaration = ($) => p.initialize.group(() => {
        const $property_signature: s_target.declarations.Declaration.signature = p.with.change_context($['signature'], ($) => p.with.change_context($['value'], ($) => p.with.decide_state(
            $,
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
    
    export const Namespaces: d.declarations.Namespaces = ($) => p.with.map_dictionary(
        $,
        ($, $id): s_target.declarations.Namespaces.D => p.with.change_context($['value'], ($) => Namespace(
            $,
        )),
    )
    
    export const Namespace: d.declarations.Namespace = ($) => p.initialize.group(() => {
        const $property_namespaces: s_target.declarations.Namespace.namespaces = p.with.change_context($['namespaces'], ($) => Namespaces(
            $,
        ))
        const $property_types: s_target.declarations.Namespace.types = p.with.change_context($['types'], ($) => Declarations(
            $,
        ))
        return {
            'namespaces': $property_namespaces,
            'types': $property_types,
        }
    })
}

export namespace resolver {
    
    export const Value_Reference: d.resolver.Value_Reference = ($) => p.initialize.group(() => {
        const $property_type: s_target.resolver.Value_Reference.type_ = p.with.change_context($['type'], ($) => p.initialize.group(() => {
            const $property_location: s_target.resolver.Value_Reference.type_.location = p.with.change_context($['location'], ($) => p.with.change_context($['value'], ($) => p.with.decide_state(
                $,
                ($s): s_target.resolver.Value_Reference.type_.location => {
                    switch ($s[0]) {
                        case 'local': return p.option($s, ($): s_target.resolver.Value_Reference.type_.location => ['local', $['l id']])
                        case 'child namespace': return p.option($s, ($): s_target.resolver.Value_Reference.type_.location => ['child namespace', p.initialize.group(() => {
                            const $property_namespace: s_target.resolver.Value_Reference.type_.location.child_namespace.namespace = p.with.change_context($['namespace'], ($) => $['l id'])
                            const $property_type: s_target.resolver.Value_Reference.type_.location.child_namespace.type_ = p.with.change_context($['type'], ($) => $['l id'])
                            return {
                                'namespace': $property_namespace,
                                'type': $property_type,
                            }
                        })])
                        case 'sibling namespace': return p.option($s, ($): s_target.resolver.Value_Reference.type_.location => ['sibling namespace', p.initialize.group(() => {
                            const $property_namespace: s_target.resolver.Value_Reference.type_.location.sibling_namespace.namespace = p.with.change_context($['namespace'], ($) => $['l id'])
                            const $property_type: s_target.resolver.Value_Reference.type_.location.sibling_namespace.type_ = p.with.change_context($['type'], ($) => $['l id'])
                            return {
                                'namespace': $property_namespace,
                                'type': $property_type,
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
        const $property_path: s_target.resolver.Value_Reference.path = p.with.change_context($['path'], ($) => p.initialize.group(() => {
            const $property_tail: s_target.resolver.Value_Reference.path.tail = p.with.change_context($['tail'], ($) => p.with.change_context($['value'], ($) => p.with.map_list(
                $,
                ($, $index): s_target.resolver.Value_Reference.path.tail.L => p.with.change_context($['value'], ($) => p.with.change_context($['value'], ($) => p.with.decide_state(
                    $,
                    ($s): s_target.resolver.Value_Reference.path.tail.L => {
                        switch ($s[0]) {
                            case 'dictionary': return p.option($s, ($): s_target.resolver.Value_Reference.path.tail.L => ['dictionary', p.with.change_context($['value'], ($) => null)])
                            case 'group': return p.option($s, ($): s_target.resolver.Value_Reference.path.tail.L => ['group', p.with.change_context($['value'], ($) => $['l id'])])
                            case 'list': return p.option($s, ($): s_target.resolver.Value_Reference.path.tail.L => ['list', p.with.change_context($['value'], ($) => null)])
                            case 'optional': return p.option($s, ($): s_target.resolver.Value_Reference.path.tail.L => ['optional', p.with.change_context($['value'], ($) => null)])
                            case 'state': return p.option($s, ($): s_target.resolver.Value_Reference.path.tail.L => ['state', p.with.change_context($['value'], ($) => $['l id'])])
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
            'type': $property_type,
            'path': $property_path,
        }
    })
    
    export const Relative_Value_Selection: d.resolver.Relative_Value_Selection = ($) => p.initialize.group(() => {
        const $property_path: s_target.resolver.Relative_Value_Selection.path = p.with.change_context($['path'], ($) => p.with.change_context($['value'], ($) => p.with.map_list(
            $,
            ($, $index): s_target.resolver.Relative_Value_Selection.path.L => p.with.change_context($['value'], ($) => p.with.change_context($['value'], ($) => p.with.decide_state(
                $,
                ($s): s_target.resolver.Relative_Value_Selection.path.L => {
                    switch ($s[0]) {
                        case 'benchmark link': return p.option($s, ($): s_target.resolver.Relative_Value_Selection.path.L => ['benchmark link', Value_Reference(
                            $,
                        )])
                        case 'component constraint': return p.option($s, ($): s_target.resolver.Relative_Value_Selection.path.L => ['component constraint', p.with.change_context($['value'], ($) => p.initialize.group(() => {
                            const $property_name: s_target.resolver.Relative_Value_Selection.path.L.component_constraint.name = p.with.change_context($['name'], ($) => $['l id'])
                            const $property_target: s_target.resolver.Relative_Value_Selection.path.L.component_constraint.target = p.with.change_context($['target'], ($) => Value_Reference(
                                $,
                            ))
                            return {
                                'name': $property_name,
                                'target': $property_target,
                            }
                        }))])
                        case 'component': return p.option($s, ($): s_target.resolver.Relative_Value_Selection.path.L => ['component', p.with.change_context($['value'], ($) => null)])
                        case 'cyclic component': return p.option($s, ($): s_target.resolver.Relative_Value_Selection.path.L => ['cyclic component', p.with.change_context($['value'], ($) => null)])
                        case 'group': return p.option($s, ($): s_target.resolver.Relative_Value_Selection.path.L => ['group', p.with.change_context($['value'], ($) => $['l id'])])
                        case 'list result': return p.option($s, ($): s_target.resolver.Relative_Value_Selection.path.L => ['list result', p.with.change_context($['value'], ($) => null)])
                        case 'option constraint': return p.option($s, ($): s_target.resolver.Relative_Value_Selection.path.L => ['option constraint', p.with.change_context($['value'], ($) => p.initialize.group(() => {
                            const $property_option: s_target.resolver.Relative_Value_Selection.path.L.option_constraint.option = p.with.change_context($['option'], ($) => $['l id'])
                            const $property_constraint: s_target.resolver.Relative_Value_Selection.path.L.option_constraint.constraint = p.with.change_context($['constraint'], ($) => $['l id'])
                            return {
                                'option': $property_option,
                                'constraint': $property_constraint,
                            }
                        }))])
                        case 'optional': return p.option($s, ($): s_target.resolver.Relative_Value_Selection.path.L => ['optional', p.with.change_context($['value'], ($) => null)])
                        case 'optional value constraint': return p.option($s, ($): s_target.resolver.Relative_Value_Selection.path.L => ['optional value constraint', p.with.change_context($['value'], ($) => $['l id'])])
                        case 'reference constraint': return p.option($s, ($): s_target.resolver.Relative_Value_Selection.path.L => ['reference constraint', p.with.change_context($['value'], ($) => $['l id'])])
                        case 'reference': return p.option($s, ($): s_target.resolver.Relative_Value_Selection.path.L => ['reference', p.with.change_context($['value'], ($) => null)])
                        case 'expect resolved': return p.option($s, ($): s_target.resolver.Relative_Value_Selection.path.L => ['expect resolved', p.with.change_context($['value'], ($) => null)])
                        case 'state result': return p.option($s, ($): s_target.resolver.Relative_Value_Selection.path.L => ['state result', p.with.change_context($['value'], ($) => null)])
                        default: return p.exhaustive($s[0])
                    }
                },
            ))),
        )))
        return {
            'path': $property_path,
        }
    })
    
    export const Possible_Value_Branches: d.resolver.Possible_Value_Branches = ($) => p.with.map_dictionary(
        $,
        ($, $id): s_target.resolver.Possible_Value_Branches.D => p.with.change_context($['value'], ($) => p.with.decide_state(
            $,
            ($s): s_target.resolver.Possible_Value_Branches.D => {
                switch ($s[0]) {
                    case 'not set': return p.option($s, ($): s_target.resolver.Possible_Value_Branches.D => ['not set', null])
                    case 'set': return p.option($s, ($): s_target.resolver.Possible_Value_Branches.D => ['set', Relative_Value_Selection(
                        $,
                    )])
                    default: return p.exhaustive($s[0])
                }
            },
        )),
    )
    
    export const Possible_Value_Selection: d.resolver.Possible_Value_Selection = ($) => p.with.change_context($['value'], ($) => p.with.decide_state(
        $,
        ($s): s_target.resolver.Possible_Value_Selection => {
            switch ($s[0]) {
                case 'decide state': return p.option($s, ($): s_target.resolver.Possible_Value_Selection => ['decide state', p.initialize.group(() => {
                    const $property_target: s_target.resolver.Possible_Value_Selection.decide_state.target = p.with.change_context($['target'], ($) => Value_Reference(
                        $,
                    ))
                    const $property_selection: s_target.resolver.Possible_Value_Selection.decide_state.selection = p.with.change_context($['selection'], ($) => p.with.change_context($['value'], ($) => Guaranteed_Value_Selection(
                        $,
                    )))
                    const $property_options: s_target.resolver.Possible_Value_Selection.decide_state.options = p.with.change_context($['options'], ($) => Possible_Value_Branches(
                        $,
                    ))
                    return {
                        'target': $property_target,
                        'selection': $property_selection,
                        'options': $property_options,
                    }
                })])
                case 'optional value': return p.option($s, ($): s_target.resolver.Possible_Value_Selection => ['optional value', p.initialize.group(() => {
                    const $property_selection: s_target.resolver.Possible_Value_Selection.optional_value.selection = p.with.change_context($['selection'], ($) => p.with.change_context($['value'], ($) => Guaranteed_Value_Selection(
                        $,
                    )))
                    const $property_tail: s_target.resolver.Possible_Value_Selection.optional_value.tail = p.with.change_context($['tail'], ($) => Relative_Value_Selection(
                        $,
                    ))
                    return {
                        'selection': $property_selection,
                        'tail': $property_tail,
                    }
                })])
                case 'parameter': return p.option($s, ($): s_target.resolver.Possible_Value_Selection => ['parameter', $['l id']])
                case 'result': return p.option($s, ($): s_target.resolver.Possible_Value_Selection => ['result', p.with.change_context($['value'], ($) => p.with.decide_state(
                    $,
                    ($s): s_target.resolver.Possible_Value_Selection.result => {
                        switch ($s[0]) {
                            case 'state': return p.option($s, ($): s_target.resolver.Possible_Value_Selection.result => ['state', p.initialize.group(() => {
                                const $property_property: s_target.resolver.Possible_Value_Selection.result.state.property = p.with.change_context($['property'], ($) => $['value']['l id'])
                                return {
                                    'property': $property_property,
                                }
                            })])
                            case 'optional value': return p.option($s, ($): s_target.resolver.Possible_Value_Selection.result => ['optional value', p.initialize.group(() => {
                                const $property_property: s_target.resolver.Possible_Value_Selection.result.optional_value.property = p.with.change_context($['property'], ($) => $['value']['l id'])
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
    
    export const Option_Constraints: d.resolver.Option_Constraints = ($) => p.with.map_optional(
        $,
        ($): s_target.resolver.Option_Constraints.O => p.with.change_context($['value'], ($) => p.with.map_dictionary(
            $,
            ($, $id): s_target.resolver.Option_Constraints.O.D => p.with.change_context($['value'], ($) => p.with.change_context($['value'], ($) => p.with.decide_state(
                $,
                ($s): s_target.resolver.Option_Constraints.O.D => {
                    switch ($s[0]) {
                        case 'state': return p.option($s, ($): s_target.resolver.Option_Constraints.O.D => ['state', p.initialize.group(() => {
                            const $property_selection: s_target.resolver.Option_Constraints.O.D.state.selection = p.with.change_context($['selection'], ($) => p.with.change_context($['value'], ($) => Guaranteed_Value_Selection(
                                $,
                            )))
                            const $property_option: s_target.resolver.Option_Constraints.O.D.state.option = p.with.change_context($['option'], ($) => $['l id'])
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
    
    export const Guaranteed_Value_Selection: d.resolver.Guaranteed_Value_Selection = ($) => p.initialize.group(() => {
        const $property_start: s_target.resolver.Guaranteed_Value_Selection.start = p.with.change_context($['start'], ($) => p.with.change_context($['value'], ($) => p.with.decide_state(
            $,
            ($s): s_target.resolver.Guaranteed_Value_Selection.start => {
                switch ($s[0]) {
                    case 'optional fallback': return p.option($s, ($): s_target.resolver.Guaranteed_Value_Selection.start => ['optional fallback', p.initialize.group(() => {
                        const $property_selection: s_target.resolver.Guaranteed_Value_Selection.start.optional_fallback.selection = p.with.change_context($['selection'], ($) => Possible_Value_Selection(
                            $,
                        ))
                        const $property_fallback: s_target.resolver.Guaranteed_Value_Selection.start.optional_fallback.fallback = p.with.change_context($['fallback'], ($) => Guaranteed_Value_Selection(
                            $,
                        ))
                        return {
                            'selection': $property_selection,
                            'fallback': $property_fallback,
                        }
                    })])
                    case 'sibling property': return p.option($s, ($): s_target.resolver.Guaranteed_Value_Selection.start => ['sibling property', $['l id']])
                    case 'parent sibling': return p.option($s, ($): s_target.resolver.Guaranteed_Value_Selection.start => ['parent sibling', $['l id']])
                    case 'option constraint': return p.option($s, ($): s_target.resolver.Guaranteed_Value_Selection.start => ['option constraint', p.with.change_context($['value'], ($) => $['l id'])])
                    case 'sibling option constraint': return p.option($s, ($): s_target.resolver.Guaranteed_Value_Selection.start => ['sibling option constraint', $['l id']])
                    case 'list cursor': return p.option($s, ($): s_target.resolver.Guaranteed_Value_Selection.start => ['list cursor', p.with.change_context($['value'], ($) => null)])
                    case 'linked entry': return p.option($s, ($): s_target.resolver.Guaranteed_Value_Selection.start => ['linked entry', p.with.change_context($['value'], ($) => null)])
                    case 'constraint': return p.option($s, ($): s_target.resolver.Guaranteed_Value_Selection.start => ['constraint', p.with.change_context($['value'], ($) => p.with.decide_state(
                        $,
                        ($s): s_target.resolver.Guaranteed_Value_Selection.start.constraint => {
                            switch ($s[0]) {
                                case 'component': return p.option($s, ($): s_target.resolver.Guaranteed_Value_Selection.start.constraint => ['component', p.initialize.group(() => {
                                    const $property_property: s_target.resolver.Guaranteed_Value_Selection.start.constraint.component.property = p.with.change_context($['property'], ($) => $['value']['l id'])
                                    const $property_constraint: s_target.resolver.Guaranteed_Value_Selection.start.constraint.component.constraint = p.with.change_context($['constraint'], ($) => $['l id'])
                                    return {
                                        'property': $property_property,
                                        'constraint': $property_constraint,
                                    }
                                })])
                                case 'reference': return p.option($s, ($): s_target.resolver.Guaranteed_Value_Selection.start.constraint => ['reference', p.initialize.group(() => {
                                    const $property_property: s_target.resolver.Guaranteed_Value_Selection.start.constraint.reference.property = p.with.change_context($['property'], ($) => $['value']['l id'])
                                    const $property_constraint: s_target.resolver.Guaranteed_Value_Selection.start.constraint.reference.constraint = p.with.change_context($['constraint'], ($) => $['l id'])
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
                    case 'result': return p.option($s, ($): s_target.resolver.Guaranteed_Value_Selection.start => ['result', p.with.change_context($['value'], ($) => p.with.decide_state(
                        $,
                        ($s): s_target.resolver.Guaranteed_Value_Selection.start.result => {
                            switch ($s[0]) {
                                case 'list': return p.option($s, ($): s_target.resolver.Guaranteed_Value_Selection.start.result => ['list', p.initialize.group(() => {
                                    const $property_property: s_target.resolver.Guaranteed_Value_Selection.start.result.list.property = p.with.change_context($['property'], ($) => $['value']['l id'])
                                    return {
                                        'property': $property_property,
                                    }
                                })])
                                case 'state': return p.option($s, ($): s_target.resolver.Guaranteed_Value_Selection.start.result => ['state', p.initialize.group(() => {
                                    const $property_property: s_target.resolver.Guaranteed_Value_Selection.start.result.state.property = p.with.change_context($['property'], ($) => $['value']['l id'])
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
        const $property_tail: s_target.resolver.Guaranteed_Value_Selection.tail = p.with.change_context($['tail'], ($) => Relative_Value_Selection(
            $,
        ))
        return {
            'start': $property_start,
            'tail': $property_tail,
        }
    })
    
    export const Lookup_Selection: d.resolver.Lookup_Selection = ($) => p.initialize.group(() => {
        const $property_type: s_target.resolver.Lookup_Selection.type_ = p.with.change_context($['type'], ($) => p.with.change_context($['value'], ($) => p.with.decide_state(
            $,
            ($s): s_target.resolver.Lookup_Selection.type_ => {
                switch ($s[0]) {
                    case 'acyclic': return p.option($s, ($): s_target.resolver.Lookup_Selection.type_ => ['acyclic', p.with.change_context($['value'], ($) => p.with.decide_state(
                        $,
                        ($s): s_target.resolver.Lookup_Selection.type_.acyclic => {
                            switch ($s[0]) {
                                case 'siblings': return p.option($s, ($): s_target.resolver.Lookup_Selection.type_.acyclic => ['siblings', p.with.change_context($['value'], ($) => null)])
                                case 'resolved dictionary': return p.option($s, ($): s_target.resolver.Lookup_Selection.type_.acyclic => ['resolved dictionary', p.initialize.group(() => {
                                    const $property_selection: s_target.resolver.Lookup_Selection.type_.acyclic.resolved_dictionary.selection = p.with.change_context($['selection'], ($) => p.with.change_context($['value'], ($) => Guaranteed_Value_Selection(
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
                    case 'cyclic': return p.option($s, ($): s_target.resolver.Lookup_Selection.type_ => ['cyclic', p.with.change_context($['value'], ($) => p.with.decide_state(
                        $,
                        ($s): s_target.resolver.Lookup_Selection.type_.cyclic => {
                            switch ($s[0]) {
                                case 'siblings': return p.option($s, ($): s_target.resolver.Lookup_Selection.type_.cyclic => ['siblings', p.with.change_context($['value'], ($) => null)])
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
            'type': $property_type,
        }
    })
    
    export const Reference_Constraints: d.resolver.Reference_Constraints = ($) => p.with.map_optional(
        $,
        ($): s_target.resolver.Reference_Constraints.O => p.with.change_context($['value'], ($) => p.with.map_dictionary(
            $,
            ($, $id): s_target.resolver.Reference_Constraints.O.D => p.with.change_context($['value'], ($) => p.initialize.group(() => {
                const $property_start: s_target.resolver.Reference_Constraints.O.D.start = p.with.change_context($['start'], ($) => p.with.change_context($['value'], ($) => p.with.decide_state(
                    $,
                    ($s): s_target.resolver.Reference_Constraints.O.D.start => {
                        switch ($s[0]) {
                            case 'value': return p.option($s, ($): s_target.resolver.Reference_Constraints.O.D.start => ['value', null])
                            case 'sibling': return p.option($s, ($): s_target.resolver.Reference_Constraints.O.D.start => ['sibling', $['l id']])
                            default: return p.exhaustive($s[0])
                        }
                    },
                )))
                const $property_constraint: s_target.resolver.Reference_Constraints.O.D.constraint = p.with.change_context($['constraint'], ($) => p.initialize.group(() => {
                    const $property_selection: s_target.resolver.Reference_Constraints.O.D.constraint.selection = p.with.change_context($['selection'], ($) => Relative_Value_Selection(
                        $,
                    ))
                    const $property_type: s_target.resolver.Reference_Constraints.O.D.constraint.type_ = p.with.change_context($['type'], ($) => p.with.change_context($['value'], ($) => p.with.decide_state(
                        $,
                        ($s): s_target.resolver.Reference_Constraints.O.D.constraint.type_ => {
                            switch ($s[0]) {
                                case 'state': return p.option($s, ($): s_target.resolver.Reference_Constraints.O.D.constraint.type_ => ['state', p.with.change_context($['value'], ($) => p.initialize.group(() => {
                                    const $property_option: s_target.resolver.Reference_Constraints.O.D.constraint.type_.state.option = p.with.change_context($['option'], ($) => $['l id'])
                                    return {
                                        'option': $property_option,
                                    }
                                }))])
                                case 'optional value': return p.option($s, ($): s_target.resolver.Reference_Constraints.O.D.constraint.type_ => ['optional value', p.with.change_context($['value'], ($) => null)])
                                default: return p.exhaustive($s[0])
                            }
                        },
                    )))
                    return {
                        'selection': $property_selection,
                        'type': $property_type,
                    }
                }))
                return {
                    'start': $property_start,
                    'constraint': $property_constraint,
                }
            })),
        )),
    )
    
    export const Resolver: d.resolver.Resolver = ($) => p.initialize.group(() => {
        const $property_namespaces: s_target.resolver.Resolver.namespaces = p.with.change_context($['namespaces'], ($) => p.with.map_dictionary(
            $,
            ($, $id): s_target.resolver.Resolver.namespaces.D => p.with.change_context($['value'], ($) => Resolver(
                $,
            )),
        ))
        const $property_types: s_target.resolver.Resolver.types = p.with.change_context($['types'], ($) => p.with.map_dictionary(
            $,
            ($, $id): s_target.resolver.Resolver.types.D => p.with.change_context($['value'], ($) => p.initialize.group(() => {
                const $property_root_value_resolver: s_target.resolver.Resolver.types.D.root_value_resolver = p.with.change_context($['root value resolver'], ($) => Value(
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
    
    export const Result_Selection: d.resolver.Result_Selection = ($) => p.with.change_context($['value'], ($) => p.with.decide_state(
        $,
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
    
    export const Checks: d.resolver.Checks = ($) => p.with.map_optional(
        $,
        ($): s_target.resolver.Checks.O => p.with.map_dictionary(
            $,
            ($, $id): s_target.resolver.Checks.O.D => p.initialize.group(() => {
                const $property_expected: s_target.resolver.Checks.O.D.expected = p.with.change_context($['expected'], ($) => Result_Selection(
                    $,
                ))
                const $property_actual: s_target.resolver.Checks.O.D.actual = p.with.change_context($['actual'], ($) => Result_Selection(
                    $,
                ))
                return {
                    'expected': $property_expected,
                    'actual': $property_actual,
                }
            }),
        ),
    )
    
    export const Value: d.resolver.Value = ($) => p.with.decide_state(
        $,
        ($s): s_target.resolver.Value => {
            switch ($s[0]) {
                case 'component': return p.option($s, ($): s_target.resolver.Value => ['component', p.with.change_context($['value'], ($) => p.initialize.group(() => {
                    const $property_location: s_target.resolver.Value.component.location = p.with.change_context($['location'], ($) => p.with.change_context($['value'], ($) => p.with.decide_state(
                        $,
                        ($s): s_target.resolver.Value.component.location => {
                            switch ($s[0]) {
                                case 'local': return p.option($s, ($): s_target.resolver.Value.component.location => ['local', $['l id']])
                                case 'child namespace': return p.option($s, ($): s_target.resolver.Value.component.location => ['child namespace', p.initialize.group(() => {
                                    const $property_namespace: s_target.resolver.Value.component.location.child_namespace.namespace = p.with.change_context($['namespace'], ($) => $['l id'])
                                    const $property_resolver: s_target.resolver.Value.component.location.child_namespace.resolver = p.with.change_context($['resolver'], ($) => $['value']['l id'])
                                    return {
                                        'namespace': $property_namespace,
                                        'resolver': $property_resolver,
                                    }
                                })])
                                case 'sibling namespace': return p.option($s, ($): s_target.resolver.Value.component.location => ['sibling namespace', p.with.change_context($['value'], ($) => p.initialize.group(() => {
                                    const $property_namespace: s_target.resolver.Value.component.location.sibling_namespace.namespace = p.with.change_context($['namespace'], ($) => $['l id'])
                                    const $property_resolver: s_target.resolver.Value.component.location.sibling_namespace.resolver = p.with.change_context($['resolver'], ($) => $['value']['l id'])
                                    return {
                                        'namespace': $property_namespace,
                                        'resolver': $property_resolver,
                                    }
                                }))])
                                default: return p.exhaustive($s[0])
                            }
                        },
                    )))
                    const $property_arguments: s_target.resolver.Value.component.arguments_ = p.with.change_context($['arguments'], ($) => p.with.map_optional(
                        $,
                        ($): s_target.resolver.Value.component.arguments_.O => p.initialize.group(() => {
                            const $property_types: s_target.resolver.Value.component.arguments_.O.types = p.with.change_context($['types'], ($) => p.with.map_optional(
                                $,
                                ($): s_target.resolver.Value.component.arguments_.O.types.O => p.with.map_dictionary(
                                    $,
                                    ($, $id): s_target.resolver.Value.component.arguments_.O.types.O.D => p.with.change_context($['value'], ($) => p.with.decide_state(
                                        $,
                                        ($s): s_target.resolver.Value.component.arguments_.O.types.O.D => {
                                            switch ($s[0]) {
                                                case 'optional': return p.option($s, ($): s_target.resolver.Value.component.arguments_.O.types.O.D => ['optional', p.with.decide_state(
                                                    $,
                                                    ($s): s_target.resolver.Value.component.arguments_.O.types.O.D.optional => {
                                                        switch ($s[0]) {
                                                            case 'not set': return p.option($s, ($): s_target.resolver.Value.component.arguments_.O.types.O.D.optional => ['not set', null])
                                                            case 'set': return p.option($s, ($): s_target.resolver.Value.component.arguments_.O.types.O.D.optional => ['set', Guaranteed_Value_Selection(
                                                                $,
                                                            )])
                                                            case 'selection': return p.option($s, ($): s_target.resolver.Value.component.arguments_.O.types.O.D.optional => ['selection', Possible_Value_Selection(
                                                                $,
                                                            )])
                                                            default: return p.exhaustive($s[0])
                                                        }
                                                    },
                                                )])
                                                case 'required': return p.option($s, ($): s_target.resolver.Value.component.arguments_.O.types.O.D => ['required', Guaranteed_Value_Selection(
                                                    $,
                                                )])
                                                case 'parameter': return p.option($s, ($): s_target.resolver.Value.component.arguments_.O.types.O.D => ['parameter', $['l id']])
                                                default: return p.exhaustive($s[0])
                                            }
                                        },
                                    )),
                                ),
                            ))
                            const $property_lookups: s_target.resolver.Value.component.arguments_.O.lookups = p.with.change_context($['lookups'], ($) => p.with.map_optional(
                                $,
                                ($): s_target.resolver.Value.component.arguments_.O.lookups.O => p.with.map_dictionary(
                                    $,
                                    ($, $id): s_target.resolver.Value.component.arguments_.O.lookups.O.D => p.with.change_context($['value'], ($) => p.with.decide_state(
                                        $,
                                        ($s): s_target.resolver.Value.component.arguments_.O.lookups.O.D => {
                                            switch ($s[0]) {
                                                case 'acyclic': return p.option($s, ($): s_target.resolver.Value.component.arguments_.O.lookups.O.D => ['acyclic', null])
                                                case 'cyclic': return p.option($s, ($): s_target.resolver.Value.component.arguments_.O.lookups.O.D => ['cyclic', null])
                                                case 'selection': return p.option($s, ($): s_target.resolver.Value.component.arguments_.O.lookups.O.D => ['selection', Lookup_Selection(
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
                    const $property_constraints: s_target.resolver.Value.component.constraints = p.with.change_context($['constraints'], ($) => Reference_Constraints(
                        $,
                    ))
                    return {
                        'location': $property_location,
                        'arguments': $property_arguments,
                        'constraints': $property_constraints,
                    }
                }))])
                case 'dictionary': return p.option($s, ($): s_target.resolver.Value => ['dictionary', p.with.change_context($['value'], ($) => p.initialize.group(() => {
                    const $property_resolver: s_target.resolver.Value.dictionary.resolver = p.with.change_context($['resolver'], ($) => Value(
                        $,
                    ))
                    const $property_benchmark: s_target.resolver.Value.dictionary.benchmark = p.with.change_context($['benchmark'], ($) => p.with.map_optional(
                        $,
                        ($): s_target.resolver.Value.dictionary.benchmark.O => p.with.change_context($['value'], ($) => p.initialize.group(() => {
                            const $property_selection: s_target.resolver.Value.dictionary.benchmark.O.selection = p.with.change_context($['selection'], ($) => p.with.change_context($['value'], ($) => Guaranteed_Value_Selection(
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
                case 'group': return p.option($s, ($): s_target.resolver.Value => ['group', p.with.change_context($['value'], ($) => p.with.map_dictionary(
                    $,
                    ($, $id): s_target.resolver.Value.group.D => p.with.change_context($['value'], ($) => p.initialize.group(() => {
                        const $property_resolver: s_target.resolver.Value.group.D.resolver = p.with.change_context($['resolver'], ($) => Value(
                            $,
                        ))
                        return {
                            'resolver': $property_resolver,
                        }
                    })),
                ))])
                case 'list': return p.option($s, ($): s_target.resolver.Value => ['list', p.with.change_context($['value'], ($) => p.initialize.group(() => {
                    const $property_resolver: s_target.resolver.Value.list.resolver = p.with.change_context($['resolver'], ($) => Value(
                        $,
                    ))
                    const $property_result: s_target.resolver.Value.list.result = p.with.change_context($['result'], ($) => p.with.map_optional(
                        $,
                        ($): s_target.resolver.Value.list.result.O => p.with.change_context($['value'], ($) => p.initialize.group(() => {
                            const $property_initial: s_target.resolver.Value.list.result.O.initial = p.with.change_context($['initial'], ($) => Guaranteed_Value_Selection(
                                $,
                            ))
                            const $property_next: s_target.resolver.Value.list.result.O.next = p.with.change_context($['next'], ($) => Result_Selection(
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
                case 'nothing': return p.option($s, ($): s_target.resolver.Value => ['nothing', p.with.change_context($['value'], ($) => null)])
                case 'simple': return p.option($s, ($): s_target.resolver.Value => ['simple', p.with.change_context($['value'], ($) => null)])
                case 'optional': return p.option($s, ($): s_target.resolver.Value => ['optional', p.with.change_context($['value'], ($) => p.initialize.group(() => {
                    const $property_presence: s_target.resolver.Value.optional.presence = p.with.change_context($['presence'], ($) => p.with.map_optional(
                        $,
                        ($): s_target.resolver.Value.optional.presence.O => Possible_Value_Selection(
                            $,
                        ),
                    ))
                    const $property_constraints: s_target.resolver.Value.optional.constraints = p.with.change_context($['constraints'], ($) => Option_Constraints(
                        $,
                    ))
                    const $property_resolver: s_target.resolver.Value.optional.resolver = p.with.change_context($['resolver'], ($) => Value(
                        $,
                    ))
                    const $property_not_set_constraints: s_target.resolver.Value.optional.not_set_constraints = p.with.change_context($['not set constraints'], ($) => p.with.map_optional(
                        $,
                        ($): s_target.resolver.Value.optional.not_set_constraints.O => p.with.map_dictionary(
                            $,
                            ($, $id): s_target.resolver.Value.optional.not_set_constraints.O.D => Possible_Value_Selection(
                                $,
                            ),
                        ),
                    ))
                    const $property_result: s_target.resolver.Value.optional.result = p.with.change_context($['result'], ($) => p.with.map_optional(
                        $,
                        ($): s_target.resolver.Value.optional.result.O => p.with.change_context($['value'], ($) => Result_Selection(
                            $,
                        )),
                    ))
                    const $property_checks: s_target.resolver.Value.optional.checks = p.with.change_context($['checks'], ($) => Checks(
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
                case 'reference': return p.option($s, ($): s_target.resolver.Value => ['reference', p.with.change_context($['value'], ($) => p.initialize.group(() => {
                    const $property_type: s_target.resolver.Value.reference.type_ = p.with.change_context($['type'], ($) => p.initialize.group(() => {
                        const $property_lookup: s_target.resolver.Value.reference.type_.lookup = p.with.change_context($['lookup'], ($) => Lookup_Selection(
                            $,
                        ))
                        const $property_constraints: s_target.resolver.Value.reference.type_.constraints = p.with.change_context($['constraints'], ($) => Reference_Constraints(
                            $,
                        ))
                        return {
                            'lookup': $property_lookup,
                            'constraints': $property_constraints,
                        }
                    }))
                    return {
                        'type': $property_type,
                    }
                }))])
                case 'state': return p.option($s, ($): s_target.resolver.Value => ['state', p.with.change_context($['value'], ($) => p.initialize.group(() => {
                    const $property_options: s_target.resolver.Value.state.options = p.with.change_context($['options'], ($) => p.with.map_dictionary(
                        $,
                        ($, $id): s_target.resolver.Value.state.options.D => p.with.change_context($['value'], ($) => p.initialize.group(() => {
                            const $property_constraints: s_target.resolver.Value.state.options.D.constraints = p.with.change_context($['constraints'], ($) => Option_Constraints(
                                $,
                            ))
                            const $property_resolver: s_target.resolver.Value.state.options.D.resolver = p.with.change_context($['resolver'], ($) => Value(
                                $,
                            ))
                            const $property_result: s_target.resolver.Value.state.options.D.result = p.with.change_context($['result'], ($) => p.with.map_optional(
                                $,
                                ($): s_target.resolver.Value.state.options.D.result.O => p.with.change_context($['value'], ($) => Result_Selection(
                                    $,
                                )),
                            ))
                            const $property_checks: s_target.resolver.Value.state.options.D.checks = p.with.change_context($['checks'], ($) => Checks(
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

export const Directory: d.Directory = ($) => p.with.decide_state(
    $,
    ($s): s_target.Directory => {
        switch ($s[0]) {
            case 'group': return p.option($s, ($): s_target.Directory => ['group', p.initialize.group(() => {
                const $property_nodes: s_target.Directory.group.nodes = p.with.change_context($['nodes'], ($) => p.with.map_dictionary(
                    $,
                    ($, $id): s_target.Directory.group.nodes.D => Node(
                        $,
                    ),
                ))
                return {
                    'nodes': $property_nodes,
                }
            })])
            case 'dictionary': return p.option($s, ($): s_target.Directory => ['dictionary', p.initialize.group(() => {
                const $property_node: s_target.Directory.dictionary.node = p.with.change_context($['node'], ($) => Node(
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

export const Node: d.Node = ($) => p.with.decide_state(
    $,
    ($s): s_target.Node => {
        switch ($s[0]) {
            case 'file': return p.option($s, ($): s_target.Node => ['file', p.initialize.group(() => {
                const $property_type: s_target.Node.file.type_ = p.with.change_context($['type'], ($) => $['value']['l id'])
                return {
                    'type': $property_type,
                }
            })])
            case 'directory': return p.option($s, ($): s_target.Node => ['directory', Directory(
                $,
            )])
            default: return p.exhaustive($s[0])
        }
    },
)

export const Schema: d.Schema = ($) => p.initialize.group(() => {
    const $property_structure: s_target.Schema.structure = p.with.change_context($['structure'], ($) => structure.Structure(
        $,
    ))
    const $property_resolver: s_target.Schema.resolver = p.with.change_context($['resolver'], ($) => p.initialize.group(() => {
        const $property_declarations: s_target.Schema.resolver.declarations = p.with.change_context($['declarations'], ($) => declarations.Namespace(
            $,
        ))
        const $property_implementations: s_target.Schema.resolver.implementations = p.with.change_context($['implementations'], ($) => resolver.Resolver(
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
})

export const Authoring_Specification: d.Authoring_Specification = ($) => p.initialize.group(() => {
    const $property_schema: s_target.Authoring_Specification.schema = p.with.change_context($['schema'], ($) => Schema(
        $,
    ))
    const $property_directory: s_target.Authoring_Specification.directory = p.with.change_context($['directory'], ($) => Directory(
        $,
    ))
    return {
        'schema': $property_schema,
        'directory': $property_directory,
    }
})

export const Document_Specification: d.Document_Specification = ($) => p.initialize.group(() => {
    const $property_schema: s_target.Document_Specification.schema = p.with.change_context($['schema'], ($) => Schema(
        $,
    ))
    const $property_root_type: s_target.Document_Specification.root_type = p.with.change_context($['root type'], ($) => $['value']['l id'])
    return {
        'schema': $property_schema,
        'root type': $property_root_type,
    }
})
