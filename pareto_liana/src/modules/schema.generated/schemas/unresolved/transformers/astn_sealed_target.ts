import * as p_ from 'pareto-core/transformer'
import p_unreachable_code_path from 'pareto-core/transformer/specials/unreachable_code_path'

// schemas
import * as s_source from "../schema.js"
import * as s_target from "astn-runtime/modules/serialization/schemas/sealed_target/schema"

// serializer dependencies
import * as ser_primitives from "liana-runtime/modules/serialization/schemas/primitives/serializers"

export namespace declarations {
    
    export type Regular_Expression = p_.Transformer<
        s_source.Regular_Expression,
        s_target.Value
    >

    export type Basic_Type = p_.Transformer<
        s_source.Basic_Type,
        s_target.Value
    >
    
    export type Basic_Types = p_.Transformer<
        s_source.Basic_Types,
        s_target.Value
    >
    
    export type Dictionary = p_.Transformer<
        s_source.Dictionary,
        s_target.Value
    >
    
    export type Group = p_.Transformer<
        s_source.Group,
        s_target.Value
    >
    
    export type Namespaces = p_.Transformer<
        s_source.Namespaces,
        s_target.Value
    >

    export type Types = p_.Transformer<
        s_source.Types,
        s_target.Value
    >
    
    export type Value = p_.Transformer<
        s_source.Value,
        s_target.Value
    >
    
    export type Type = p_.Transformer<
        s_source.Type,
        s_target.Value
    >
    
    export type Type_Reference = p_.Transformer<
        s_source.Type_Reference,
        s_target.Value
    >
    
    export type Value_Path = p_.Transformer<
        s_source.Value_Path,
        s_target.Value
    >
    
    export type Value_Reference = p_.Transformer<
        s_source.Value_Reference,
        s_target.Value
    >
    
    export type Option_Constraints = p_.Transformer<
        s_source.Option_Constraints,
        s_target.Value
    >
    
    export type Option_Constraint_Source = p_.Transformer<
        s_source.Option_Constraint_Source,
        s_target.Value
    >

    export type Reference_Constraints = p_.Transformer<
        s_source.Reference_Constraints,
        s_target.Value
    >

    export type Reference_Constraint_Source = p_.Transformer<
        s_source.Reference_Constraint_Source,
        s_target.Value
    >

    export type Structure = p_.Transformer<
        s_source.Structure,
        s_target.Value
    >

    export type Value_Result = p_.Transformer<
        s_source.Value_Result,
        s_target.Value
    >

    export type Presence = p_.Transformer<
        s_source.Presence,
        s_target.Value
    >
    
    export type Signatures_Type_Reference = p_.Transformer<
        s_source.Signatures_Type_Reference,
        s_target.Value
    >
    
    export type Resolver_Signature_Parameters = p_.Transformer<
        s_source.Resolver_Signature_Parameters,
        s_target.Value
    >
    
    export type Resolver_Signatures = p_.Transformer<
        s_source.Resolver_Signatures,
        s_target.Value
    >
    
    export type Resolver_Signature = p_.Transformer<
        s_source.Resolver_Signature,
        s_target.Value
    >

    export type Resolver_Namespaces = p_.Transformer<
        s_source.Resolver_Namespaces,
        s_target.Value
    >

    export type Resolver = p_.Transformer<
        s_source.Resolver,
        s_target.Value
    >

    export type Resolver_Absence_Constraints = p_.Transformer<
        s_source.Resolver_Absence_Constraints,
        s_target.Value
    >

    export type Resolver_Value_Group = p_.Transformer<
        s_source.Resolver_Value_Group,
        s_target.Value
    >

    export type Resolver_Value_Constraints = p_.Transformer<
        s_source.Resolver_Value_Constraints,
        s_target.Value
    >
    
    export type Resolver_Type_Reference = p_.Transformer<
        s_source.Resolver_Type_Reference,
        s_target.Value
    >

    export type Resolver_Value_Path = p_.Transformer<
        s_source.Resolver_Value_Path,
        s_target.Value
    >

    export type Resolver_Value_Reference = p_.Transformer<
        s_source.Resolver_Value_Reference,
        s_target.Value
    >

    export type Resolver_Relative_Value_Selection = p_.Transformer<
        s_source.Resolver_Relative_Value_Selection,
        s_target.Value
    >

    export type Resolver_Result_Selection = p_.Transformer<
        s_source.Resolver_Result_Selection,
        s_target.Value
    >

    export type Resolver_Value_List_Result = p_.Transformer<
        s_source.Resolver_Value_List_Result,
        s_target.Value
    >
    
    export type Resolver_Reference_Constraints = p_.Transformer<
        s_source.Resolver_Reference_Constraints,
        s_target.Value
    >

    export type Resolver_Value = p_.Transformer<
        s_source.Resolver_Value,
        s_target.Value
    >
    
    export type Resolver_Possible_Value_Selection = p_.Transformer<
        s_source.Resolver_Possible_Value_Selection,
        s_target.Value
    >
    
    export type Resolver_Option_Constraints = p_.Transformer<
        s_source.Resolver_Option_Constraints,
        s_target.Value
    >
    
    export type Resolver_Guaranteed_Value_Selection = p_.Transformer<
        s_source.Resolver_Guaranteed_Value_Selection,
        s_target.Value
    >
    
    export type Resolver_Benchmark = p_.Transformer<
        s_source.Resolver_Benchmark,
        s_target.Value
    >
    
    export type Resolver_Constraint = p_.Transformer<
        s_source.Resolver_Constraint,
        s_target.Value
    >
    
    export type Resolver_Lookup_Selection = p_.Transformer<
        s_source.Resolver_Lookup_Selection,
        s_target.Value
    >
    
    export type Resolver_Option_Constraint_Source = p_.Transformer<
        s_source.Resolver_Option_Constraint_Source,
        s_target.Value
    >

    export type Resolver_Optional_Value_Constraints = p_.Transformer<
        s_source.Resolver_Optional_Value_Constraints,
        s_target.Value
    >
    
    export type Resolver_Optional_Value_Initialization = p_.Transformer<
        s_source.Resolver_Optional_Value_Initialization,
        s_target.Value
    >
    
    export type Resolver_Reference_Constraint_Source = p_.Transformer<
        s_source.Resolver_Reference_Constraint_Source,
        s_target.Value
    >
    
    export type Resolver_Reference_To_Value_Constraint = p_.Transformer<
        s_source.Resolver_Reference_To_Value_Constraint,
        s_target.Value
    >
    
    export type Resolver_Types = p_.Transformer<
        s_source.Resolver_Types,
        s_target.Value
    >
    
    export type Resolver_Value_Constraint = p_.Transformer<
        s_source.Resolver_Value_Constraint,
        s_target.Value
    >
    
    export type Schema = p_.Transformer<
        s_source.Schema,
        s_target.Value
    >
    
    export type Type_Specification = p_.Transformer<
        s_source.Type_Specification,
        s_target.Value
    >
}

// implementations

export const Regular_Expression: declarations.Regular_Expression = ($) => ['state', p_.from.state($).decide(($): s_target.Value.state => {
    switch ($[0]) {
        case 'any character': return p_.option($, ($): s_target.Value.state => ({
            'option': 'any character',
            'value': ['nothing', null],
        }))
        case 'literal': return p_.option($, ($): s_target.Value.state => ({
            'option': 'literal',
            'value': ['text', {
                'delimiter': ['quote', null],
                'value': $,
            }],
        }))
        case 'character set': return p_.option($, ($): s_target.Value.state => ({
            'option': 'character set',
            'value': ['text', {
                'delimiter': ['quote', null],
                'value': $,
            }],
        }))
        case 'sequence': return p_.option($, ($): s_target.Value.state => ({
            'option': 'sequence',
            'value': ['list', p_.from.list($).map(
                ($) => Regular_Expression(
                    $,
                ),
            )],
        }))
        case 'choice': return p_.option($, ($): s_target.Value.state => ({
            'option': 'choice',
            'value': ['list', p_.from.list($).map(
                ($) => Regular_Expression(
                    $,
                ),
            )],
        }))
        case 'repetition': return p_.option($, ($): s_target.Value.state => ({
            'option': 'repetition',
            'value': ['group', ['verbose', p_.literal.dictionary({
                "expression": p_.change_context($['expression'], ($) => Regular_Expression(
                    $,
                )),
                "quantity": p_.change_context($['quantity'], ($) => ['state', p_.from.state($).decide(($): s_target.Value.state => {
                    switch ($[0]) {
                        case 'optional': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'optional',
                            'value': ['nothing', null],
                        }))
                        case 'zero or more': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'zero or more',
                            'value': ['nothing', null],
                        }))
                        case 'one or more': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'one or more',
                            'value': ['nothing', null],
                        }))
                        default: return p_.exhaustive($[0])
                    }
                })]),
            })]],
        }))
        default: return p_.exhaustive($[0])
    }
})]

export const Basic_Type: declarations.Basic_Type = ($) => ['group', ['verbose', p_.literal.dictionary({
    "type": p_.change_context($['type'], ($) => ['state', p_.from.state($).decide(($): s_target.Value.state => {
        switch ($[0]) {
            case 'double quoted': return p_.option($, ($): s_target.Value.state => ({
                'option': 'double quoted',
                'value': ['nothing', null],
            }))
            case 'undelimited': return p_.option($, ($): s_target.Value.state => ({
                'option': 'undelimited',
                'value': ['nothing', null],
            }))
            default: return p_.exhaustive($[0])
        }
    })]),
    "regular expression": p_.change_context($['regular expression'], ($) => ['optional', p_.from.optional($).decide(($): s_target.Value.optional => ['set', Regular_Expression(
        $,
    )], (): s_target.Value.optional => ['not set', null])]),
})]]

export const Basic_Types: declarations.Basic_Types = ($) => ['dictionary', p_.from.dictionary($).map(
    ($, id) => Basic_Type(
        $,
    ),
)]

export const Dictionary: declarations.Dictionary = ($) => ['group', ['verbose', p_.literal.dictionary({
    "value": p_.change_context($['value'], ($) => Value(
        $,
    )),
})]]

export const Group: declarations.Group = ($) => ['dictionary', p_.from.dictionary($).map(
    ($, id) => ['group', ['verbose', p_.literal.dictionary({
        "description": p_.change_context($['description'], ($) => ['optional', p_.from.optional($).decide(($): s_target.Value.optional => ['set', ['text', {
            'delimiter': ['quote', null],
            'value': $,
        }]], (): s_target.Value.optional => ['not set', null])]),
        "value": p_.change_context($['value'], ($) => Value(
            $,
        )),
    })]],
)]

export const Namespaces: declarations.Namespaces = ($) => ['dictionary', p_.from.dictionary($).map(
    ($, id) => Structure(
        $,
    ),
)]

export const Types: declarations.Types = ($) => ['dictionary', p_.from.dictionary($).map(
    ($, id) => Type(
        $,
    ),
)]

export const Value: declarations.Value = ($) => ['state', p_.from.state($).decide(($): s_target.Value.state => {
    switch ($[0]) {
        case 'component': return p_.option($, ($): s_target.Value.state => ({
            'option': 'component',
            'value': ['group', ['verbose', p_.literal.dictionary({
                "type": p_.change_context($['type'], ($) => ['state', p_.from.state($).decide(($): s_target.Value.state => {
                    switch ($[0]) {
                        case 'internal': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'internal',
                            'value': ['reference', {
                                'value': $,
                            }],
                        }))
                        case 'internal cyclic': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'internal cyclic',
                            'value': ['reference', {
                                'value': $,
                            }],
                        }))
                        case 'child': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'child',
                            'value': ['group', ['verbose', p_.literal.dictionary({
                                "namespace": p_.change_context($['namespace'], ($) => ['reference', {
                                    'value': $,
                                }]),
                                "type": p_.change_context($['type'], ($) => ['reference', {
                                    'value': $,
                                }]),
                            })]],
                        }))
                        default: return p_.exhaustive($[0])
                    }
                })]),
            })]],
        }))
        case 'dictionary': return p_.option($, ($): s_target.Value.state => ({
            'option': 'dictionary',
            'value': Dictionary(
                $,
            ),
        }))
        case 'group': return p_.option($, ($): s_target.Value.state => ({
            'option': 'group',
            'value': Group(
                $,
            ),
        }))
        case 'list': return p_.option($, ($): s_target.Value.state => ({
            'option': 'list',
            'value': ['group', ['verbose', p_.literal.dictionary({
                "value": p_.change_context($['value'], ($) => Value(
                    $,
                )),
                "result": p_.change_context($['result'], ($) => Value_Result(
                    $,
                )),
            })]],
        }))
        case 'nothing': return p_.option($, ($): s_target.Value.state => ({
            'option': 'nothing',
            'value': ['nothing', null],
        }))
        case 'simple': return p_.option($, ($): s_target.Value.state => ({
            'option': 'simple',
            'value': ['reference', {
                'value': $,
            }],
        }))
        case 'optional': return p_.option($, ($): s_target.Value.state => ({
            'option': 'optional',
            'value': ['group', ['verbose', p_.literal.dictionary({
                "constraints": p_.change_context($['constraints'], ($) => Option_Constraints(
                    $,
                )),
                "value": p_.change_context($['value'], ($) => Value(
                    $,
                )),
            })]],
        }))
        case 'reference': return p_.option($, ($): s_target.Value.state => ({
            'option': 'reference',
            'value': ['group', ['verbose', p_.literal.dictionary({
                "referent": p_.change_context($['referent'], ($) => Value_Reference(
                    $,
                )),
                "type": p_.change_context($['type'], ($) => ['state', p_.from.state($).decide(($): s_target.Value.state => {
                    switch ($[0]) {
                        case 'selected': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'selected',
                            'value': ['group', ['verbose', p_.literal.dictionary({
                                "dependency": p_.change_context($['dependency'], ($) => ['state', p_.from.state($).decide(($): s_target.Value.state => {
                                    switch ($[0]) {
                                        case 'acyclic': return p_.option($, ($): s_target.Value.state => ({
                                            'option': 'acyclic',
                                            'value': ['nothing', null],
                                        }))
                                        case 'cyclic': return p_.option($, ($): s_target.Value.state => ({
                                            'option': 'cyclic',
                                            'value': ['nothing', null],
                                        }))
                                        default: return p_.exhaustive($[0])
                                    }
                                })]),
                                "constraints": p_.change_context($['constraints'], ($) => Reference_Constraints(
                                    $,
                                )),
                            })]],
                        }))
                        default: return p_.exhaustive($[0])
                    }
                })]),
            })]],
        }))
        case 'state': return p_.option($, ($): s_target.Value.state => ({
            'option': 'state',
            'value': ['group', ['verbose', p_.literal.dictionary({
                "options": p_.change_context($['options'], ($) => ['dictionary', p_.from.dictionary($).map(
                    ($, id) => ['group', ['verbose', p_.literal.dictionary({
                        "description": p_.change_context($['description'], ($) => ['optional', p_.from.optional($).decide(($): s_target.Value.optional => ['set', ['text', {
                            'delimiter': ['quote', null],
                            'value': $,
                        }]], (): s_target.Value.optional => ['not set', null])]),
                        "constraints": p_.change_context($['constraints'], ($) => Option_Constraints(
                            $,
                        )),
                        "value": p_.change_context($['value'], ($) => Value(
                            $,
                        )),
                    })]],
                )]),
                "result": p_.change_context($['result'], ($) => Value_Result(
                    $,
                )),
            })]],
        }))
        default: return p_.exhaustive($[0])
    }
})]

export const Type: declarations.Type = ($) => ['group', ['verbose', p_.literal.dictionary({
    "root value": p_.change_context($['root value'], ($) => Value(
        $,
    )),
})]]

export const Type_Reference: declarations.Type_Reference = ($) => ['group', ['verbose', p_.literal.dictionary({
    "location": p_.change_context($['location'], ($) => ['state', p_.from.state($).decide(($): s_target.Value.state => {
        switch ($[0]) {
            case 'internal': return p_.option($, ($): s_target.Value.state => ({
                'option': 'internal',
                'value': ['reference', {
                    'value': $,
                }],
            }))
            case 'child': return p_.option($, ($): s_target.Value.state => ({
                'option': 'child',
                'value': ['group', ['verbose', p_.literal.dictionary({
                    "namespace": p_.change_context($['namespace'], ($) => ['reference', {
                        'value': $,
                    }]),
                    "type": p_.change_context($['type'], ($) => ['reference', {
                        'value': $,
                    }]),
                })]],
            }))
            case 'sibling': return p_.option($, ($): s_target.Value.state => ({
                'option': 'sibling',
                'value': ['group', ['verbose', p_.literal.dictionary({
                    "namespace": p_.change_context($['namespace'], ($) => ['reference', {
                        'value': $,
                    }]),
                    "type": p_.change_context($['type'], ($) => ['reference', {
                        'value': $,
                    }]),
                })]],
            }))
            default: return p_.exhaustive($[0])
        }
    })]),
})]]

export const Value_Path: declarations.Value_Path = ($) => ['group', ['verbose', p_.literal.dictionary({
    "tail": p_.change_context($['tail'], ($) => ['list', p_.from.list($).map(
        ($) => p_.change_context($, ($) => ['state', p_.from.state($).decide(($): s_target.Value.state => {
            switch ($[0]) {
                case 'dictionary': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'dictionary',
                    'value': ['nothing', null],
                }))
                case 'group': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'group',
                    'value': ['reference', {
                        'value': $,
                    }],
                }))
                case 'list': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'list',
                    'value': ['nothing', null],
                }))
                case 'optional': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'optional',
                    'value': ['nothing', null],
                }))
                case 'state': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'state',
                    'value': ['reference', {
                        'value': $,
                    }],
                }))
                default: return p_.exhaustive($[0])
            }
        })]),
    )]),
})]]

export const Value_Reference: declarations.Value_Reference = ($) => ['group', ['verbose', p_.literal.dictionary({
    "type": p_.change_context($['type'], ($) => Type_Reference(
        $,
    )),
    "path": p_.change_context($['path'], ($) => Value_Path(
        $,
    )),
})]]

export const Option_Constraints: declarations.Option_Constraints = ($) => ['optional', p_.from.optional($).decide(($): s_target.Value.optional => ['set', ['dictionary', p_.from.dictionary($).map(
    ($, id) => Value_Reference(
        $,
    ),
)]], (): s_target.Value.optional => ['not set', null])]

export const Option_Constraint_Source: declarations.Option_Constraint_Source = ($) => ['nothing', null]

export const Reference_Constraints: declarations.Reference_Constraints = ($) => ['optional', p_.from.optional($).decide(($): s_target.Value.optional => ['set', ['dictionary', p_.from.dictionary($).map(
    ($, id) => Value_Reference(
        $,
    ),
)]], (): s_target.Value.optional => ['not set', null])]

export const Reference_Constraint_Source: declarations.Reference_Constraint_Source = ($) => ['nothing', null]

export const Structure: declarations.Structure = ($) => ['group', ['verbose', p_.literal.dictionary({
    "namespaces": p_.change_context($['namespaces'], ($) => Namespaces(
        $,
    )),
    "basic types": p_.change_context($['basic types'], ($) => Basic_Types(
        $,
    )),
    "types": p_.change_context($['types'], ($) => Types(
        $,
    )),
})]]

export const Value_Result: declarations.Value_Result = ($) => ['optional', p_.from.optional($).decide(($): s_target.Value.optional => ['set', Value_Reference(
    $,
)], (): s_target.Value.optional => ['not set', null])]

export const Presence: declarations.Presence = ($) => ['state', p_.from.state($).decide(($): s_target.Value.state => {
    switch ($[0]) {
        case 'optional': return p_.option($, ($): s_target.Value.state => ({
            'option': 'optional',
            'value': ['nothing', null],
        }))
        case 'required': return p_.option($, ($): s_target.Value.state => ({
            'option': 'required',
            'value': ['nothing', null],
        }))
        default: return p_.exhaustive($[0])
    }
})]

export const Signatures_Type_Reference: declarations.Signatures_Type_Reference = ($) => ['group', ['verbose', p_.literal.dictionary({
    "location": p_.change_context($['location'], ($) => ['state', p_.from.state($).decide(($): s_target.Value.state => {
        switch ($[0]) {
            case 'internal': return p_.option($, ($): s_target.Value.state => ({
                'option': 'internal',
                'value': ['reference', {
                    'value': $,
                }],
            }))
            case 'child': return p_.option($, ($): s_target.Value.state => ({
                'option': 'child',
                'value': ['group', ['verbose', p_.literal.dictionary({
                    "namespace": p_.change_context($['namespace'], ($) => ['reference', {
                        'value': $,
                    }]),
                    "type": p_.change_context($['type'], ($) => ['reference', {
                        'value': $,
                    }]),
                })]],
            }))
            case 'sibling': return p_.option($, ($): s_target.Value.state => ({
                'option': 'sibling',
                'value': ['group', ['verbose', p_.literal.dictionary({
                    "namespace": p_.change_context($['namespace'], ($) => ['reference', {
                        'value': $,
                    }]),
                    "type": p_.change_context($['type'], ($) => ['reference', {
                        'value': $,
                    }]),
                })]],
            }))
            default: return p_.exhaustive($[0])
        }
    })]),
})]]

export const Resolver_Signature_Parameters: declarations.Resolver_Signature_Parameters = ($) => ['group', ['verbose', p_.literal.dictionary({
    "types": p_.change_context($['types'], ($) => ['dictionary', p_.from.dictionary($).map(
        ($, id) => ['group', ['verbose', p_.literal.dictionary({
            "type": p_.change_context($['type'], ($) => Signatures_Type_Reference(
                $,
            )),
            "presence": p_.change_context($['presence'], ($) => Presence(
                $,
            )),
        })]],
    )]),
    "lookups": p_.change_context($['lookups'], ($) => ['dictionary', p_.from.dictionary($).map(
        ($, id) => ['group', ['verbose', p_.literal.dictionary({
            "referent": p_.change_context($['referent'], ($) => Signatures_Type_Reference(
                $,
            )),
            "type": p_.change_context($['type'], ($) => ['state', p_.from.state($).decide(($): s_target.Value.state => {
                switch ($[0]) {
                    case 'cyclic': return p_.option($, ($): s_target.Value.state => ({
                        'option': 'cyclic',
                        'value': ['nothing', null],
                    }))
                    case 'acyclic': return p_.option($, ($): s_target.Value.state => ({
                        'option': 'acyclic',
                        'value': ['nothing', null],
                    }))
                    default: return p_.exhaustive($[0])
                }
            })]),
            "presence": p_.change_context($['presence'], ($) => Presence(
                $,
            )),
        })]],
    )]),
})]]

export const Resolver_Signatures: declarations.Resolver_Signatures = ($) => ['dictionary', p_.from.dictionary($).map(
    ($, id) => Resolver_Signature(
        $,
    ),
)]

export const Resolver_Signature: declarations.Resolver_Signature = ($) => ['group', ['verbose', p_.literal.dictionary({
    "parameters": p_.change_context($['parameters'], ($) => ['state', p_.from.state($).decide(($): s_target.Value.state => {
        switch ($[0]) {
            case 'local': return p_.option($, ($): s_target.Value.state => ({
                'option': 'local',
                'value': Resolver_Signature_Parameters(
                    $,
                ),
            }))
            case 'same as': return p_.option($, ($): s_target.Value.state => ({
                'option': 'same as',
                'value': ['reference', {
                    'value': $,
                }],
            }))
            default: return p_.exhaustive($[0])
        }
    })]),
})]]

export const Resolver_Namespaces: declarations.Resolver_Namespaces = ($) => ['dictionary', p_.from.dictionary($).map(
    ($, id) => Resolver(
        $,
    ),
)]

export const Resolver: declarations.Resolver = ($) => ['group', ['verbose', p_.literal.dictionary({
    "namespaces": p_.change_context($['namespaces'], ($) => Resolver_Namespaces(
        $,
    )),
    "signatures": p_.change_context($['signatures'], ($) => Resolver_Signatures(
        $,
    )),
    "types": p_.change_context($['types'], ($) => Resolver_Types(
        $,
    )),
})]]

export const Resolver_Absence_Constraints: declarations.Resolver_Absence_Constraints = ($) => ['optional', p_.from.optional($).decide(($): s_target.Value.optional => ['set', ['dictionary', p_.from.dictionary($).map(
    ($, id) => Resolver_Possible_Value_Selection(
        $,
    ),
)]], (): s_target.Value.optional => ['not set', null])]

export const Resolver_Value_Group: declarations.Resolver_Value_Group = ($) => ['dictionary', p_.from.dictionary($).map(
    ($, id) => ['group', ['verbose', p_.literal.dictionary({
        "resolver": p_.change_context($['resolver'], ($) => Resolver_Value(
            $,
        )),
    })]],
)]

export const Resolver_Value_Constraints: declarations.Resolver_Value_Constraints = ($) => ['dictionary', p_.from.dictionary($).map(
    ($, id) => Resolver_Value_Constraint(
        $,
    ),
)]

export const Resolver_Type_Reference: declarations.Resolver_Type_Reference = ($) => ['group', ['verbose', p_.literal.dictionary({
    "location": p_.change_context($['location'], ($) => ['state', p_.from.state($).decide(($): s_target.Value.state => {
        switch ($[0]) {
            case 'internal': return p_.option($, ($): s_target.Value.state => ({
                'option': 'internal',
                'value': ['reference', {
                    'value': $,
                }],
            }))
            case 'child': return p_.option($, ($): s_target.Value.state => ({
                'option': 'child',
                'value': ['group', ['verbose', p_.literal.dictionary({
                    "namespace": p_.change_context($['namespace'], ($) => ['reference', {
                        'value': $,
                    }]),
                    "type": p_.change_context($['type'], ($) => ['reference', {
                        'value': $,
                    }]),
                })]],
            }))
            case 'sibling': return p_.option($, ($): s_target.Value.state => ({
                'option': 'sibling',
                'value': ['group', ['verbose', p_.literal.dictionary({
                    "namespace": p_.change_context($['namespace'], ($) => ['reference', {
                        'value': $,
                    }]),
                    "type": p_.change_context($['type'], ($) => ['reference', {
                        'value': $,
                    }]),
                })]],
            }))
            default: return p_.exhaustive($[0])
        }
    })]),
})]]

export const Resolver_Value_Path: declarations.Resolver_Value_Path = ($) => ['group', ['verbose', p_.literal.dictionary({
    "tail": p_.change_context($['tail'], ($) => ['list', p_.from.list($).map(
        ($) => p_.change_context($, ($) => ['state', p_.from.state($).decide(($): s_target.Value.state => {
            switch ($[0]) {
                case 'dictionary': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'dictionary',
                    'value': ['nothing', null],
                }))
                case 'group': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'group',
                    'value': ['reference', {
                        'value': $,
                    }],
                }))
                case 'list': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'list',
                    'value': ['nothing', null],
                }))
                case 'optional': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'optional',
                    'value': ['nothing', null],
                }))
                case 'state': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'state',
                    'value': ['reference', {
                        'value': $,
                    }],
                }))
                default: return p_.exhaustive($[0])
            }
        })]),
    )]),
})]]

export const Resolver_Value_Reference: declarations.Resolver_Value_Reference = ($) => ['group', ['verbose', p_.literal.dictionary({
    "type": p_.change_context($['type'], ($) => Resolver_Type_Reference(
        $,
    )),
    "path": p_.change_context($['path'], ($) => Resolver_Value_Path(
        $,
    )),
})]]

export const Resolver_Relative_Value_Selection: declarations.Resolver_Relative_Value_Selection = ($) => ['group', ['verbose', p_.literal.dictionary({
    "path": p_.change_context($['path'], ($) => ['list', p_.from.list($).map(
        ($) => p_.change_context($, ($) => ['state', p_.from.state($).decide(($): s_target.Value.state => {
            switch ($[0]) {
                case 'benchmark link': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'benchmark link',
                    'value': Resolver_Value_Reference(
                        $,
                    ),
                }))
                case 'component constraint': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'component constraint',
                    'value': ['group', ['verbose', p_.literal.dictionary({
                        "name": p_.change_context($['name'], ($) => ['text', {
                            'delimiter': ['quote', null],
                            'value': $,
                        }]),
                        "target": p_.change_context($['target'], ($) => Resolver_Value_Reference(
                            $,
                        )),
                    })]],
                }))
                case 'component': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'component',
                    'value': ['nothing', null],
                }))
                case 'group': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'group',
                    'value': ['reference', {
                        'value': $,
                    }],
                }))
                case 'list result': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'list result',
                    'value': Resolver_Type_Reference(
                        $,
                    ),
                }))
                case 'option constraint': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'option constraint',
                    'value': ['group', ['verbose', p_.literal.dictionary({
                        "option": p_.change_context($['option'], ($) => ['reference', {
                            'value': $,
                        }]),
                        "constraint": p_.change_context($['constraint'], ($) => ['reference', {
                            'value': $,
                        }]),
                    })]],
                }))
                case 'optional': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'optional',
                    'value': ['nothing', null],
                }))
                case 'optional value constraint': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'optional value constraint',
                    'value': ['reference', { value: $ }],
                }))
                case 'reference': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'reference',
                    'value': ['group', ['verbose', p_.literal.dictionary({
                    })]],
                }))
                case 'reference constraint': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'reference constraint',
                    'value': ['state', p_.from.state($).decide(($): s_target.Value.state => {
                        switch ($[0]) {
                            case 'selected': return p_.option($, ($): s_target.Value.state => ({
                                'option': 'selected',
                                'value': ['reference', { value: $ }],
                            }))
                            default: return p_.exhaustive($[0])
                        }
                    })],
                }))
                case 'state result': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'state result',
                    'value': Resolver_Type_Reference(
                        $,
                    ),
                }))
                default: return p_.exhaustive($[0])
            }
        })]),
    )]),
})]]

export const Resolver_Result_Selection: declarations.Resolver_Result_Selection = ($) => ['state', p_.from.state($).decide(($): s_target.Value.state => {
    switch ($[0]) {
        case 'context': return p_.option($, ($): s_target.Value.state => ({
            'option': 'context',
            'value': Resolver_Guaranteed_Value_Selection(
                $,
            ),
        }))
        case 'value': return p_.option($, ($): s_target.Value.state => ({
            'option': 'value',
            'value': Resolver_Relative_Value_Selection(
                $,
            ),
        }))
        default: return p_.exhaustive($[0])
    }
})]

export const Resolver_Value_List_Result: declarations.Resolver_Value_List_Result = ($) => ['group', ['verbose', p_.literal.dictionary({
    "type": p_.change_context($['type'], ($) => Resolver_Type_Reference(
        $,
    )),
    "initial": p_.change_context($['initial'], ($) => Resolver_Guaranteed_Value_Selection(
        $,
    )),
    "next": p_.change_context($['next'], ($) => Resolver_Result_Selection(
        $,
    )),
})]]

export const Resolver_Reference_Constraints: declarations.Resolver_Reference_Constraints = ($) => ['dictionary', p_.from.dictionary($).map(
    ($, id) => Resolver_Value_Constraint(
        $,
    ),
)]

export const Resolver_Value: declarations.Resolver_Value = ($) => ['state', p_.from.state($).decide(($): s_target.Value.state => {
    switch ($[0]) {
        case 'component': return p_.option($, ($): s_target.Value.state => ({
            'option': 'component',
            'value': ['group', ['verbose', p_.literal.dictionary({
                "location": p_.change_context($['location'], ($) => ['state', p_.from.state($).decide(($): s_target.Value.state => {
                    switch ($[0]) {
                        case 'internal': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'internal',
                            'value': ['reference', {
                                'value': $,
                            }],
                        }))
                        case 'child': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'child',
                            'value': ['group', ['verbose', p_.literal.dictionary({
                                "namespace": p_.change_context($['namespace'], ($) => ['reference', {
                                    'value': $,
                                }]),
                                "resolver": p_.change_context($['resolver'], ($) => ['reference', {
                                    'value': $,
                                }]),
                            })]],
                        }))
                        default: return p_.exhaustive($[0])
                    }
                })]),
                "arguments": p_.change_context($['arguments'], ($) => ['optional', p_.from.optional($).decide(($): s_target.Value.optional => ['set', ['group', ['verbose', p_.literal.dictionary({
                    "types": p_.change_context($['types'], ($) => ['optional', p_.from.optional($).decide(($): s_target.Value.optional => ['set', ['dictionary', p_.from.dictionary($).map(
                        ($, id) => ['state', p_.from.state($).decide(($): s_target.Value.state => {
                            switch ($[0]) {
                                case 'optional': return p_.option($, ($): s_target.Value.state => ({
                                    'option': 'optional',
                                    'value': Resolver_Optional_Value_Initialization(
                                        $,
                                    ),
                                }))
                                case 'required': return p_.option($, ($): s_target.Value.state => ({
                                    'option': 'required',
                                    'value': Resolver_Guaranteed_Value_Selection(
                                        $,
                                    ),
                                }))
                                case 'parameter': return p_.option($, ($): s_target.Value.state => ({
                                    'option': 'parameter',
                                    'value': ['reference', {
                                        'value': $,
                                    }],
                                }))
                                default: return p_.exhaustive($[0])
                            }
                        })],
                    )]], (): s_target.Value.optional => ['not set', null])]),
                    "lookups": p_.change_context($['lookups'], ($) => ['optional', p_.from.optional($).decide(($): s_target.Value.optional => ['set', ['dictionary', p_.from.dictionary($).map(
                        ($, id) => ['state', p_.from.state($).decide(($): s_target.Value.state => {
                            switch ($[0]) {
                                case 'acyclic': return p_.option($, ($): s_target.Value.state => ({
                                    'option': 'acyclic',
                                    'value': ['state', p_.from.state($).decide(($): s_target.Value.state => {
                                        switch ($[0]) {
                                            case 'not set': return p_.option($, ($): s_target.Value.state => ({
                                                'option': 'not set',
                                                'value': ['nothing', null],
                                            }))
                                            default: return p_.exhaustive($[0])
                                        }
                                    })],
                                }))
                                case 'cyclic': return p_.option($, ($): s_target.Value.state => ({
                                    'option': 'cyclic',
                                    'value': ['state', p_.from.state($).decide(($): s_target.Value.state => {
                                        switch ($[0]) {
                                            case 'not set': return p_.option($, ($): s_target.Value.state => ({
                                                'option': 'not set',
                                                'value': ['nothing', null],
                                            }))
                                            default: return p_.exhaustive($[0])
                                        }
                                    })],
                                }))
                                case 'selection': return p_.option($, ($): s_target.Value.state => ({
                                    'option': 'selection',
                                    'value': Resolver_Lookup_Selection(
                                        $,
                                    ),
                                }))
                                default: return p_.exhaustive($[0])
                            }
                        })],
                    )]], (): s_target.Value.optional => ['not set', null])]),
                })]]], (): s_target.Value.optional => ['not set', null])]),
                "constraints": p_.change_context($['constraints'], ($) => ['optional', p_.from.optional($).decide(($): s_target.Value.optional => ['set', Resolver_Value_Constraints(
                    $,
                )], (): s_target.Value.optional => ['not set', null])]),
            })]],
        }))
        case 'dictionary': return p_.option($, ($): s_target.Value.state => ({
            'option': 'dictionary',
            'value': ['group', ['verbose', p_.literal.dictionary({
                "resolver": p_.change_context($['resolver'], ($) => Resolver_Value(
                    $,
                )),
                "benchmark": p_.change_context($['benchmark'], ($) => ['optional', p_.from.optional($).decide(($): s_target.Value.optional => ['set', Resolver_Benchmark(
                    $,
                )], (): s_target.Value.optional => ['not set', null])]),
            })]],
        }))
        case 'group': return p_.option($, ($): s_target.Value.state => ({
            'option': 'group',
            'value': Resolver_Value_Group(
                $,
            ),
        }))
        case 'list': return p_.option($, ($): s_target.Value.state => ({
            'option': 'list',
            'value': ['group', ['verbose', p_.literal.dictionary({
                "resolver": p_.change_context($['resolver'], ($) => Resolver_Value(
                    $,
                )),
                "result": p_.change_context($['result'], ($) => ['optional', p_.from.optional($).decide(($): s_target.Value.optional => ['set', Resolver_Value_List_Result(
                    $,
                )], (): s_target.Value.optional => ['not set', null])]),
            })]],
        }))
        case 'nothing': return p_.option($, ($): s_target.Value.state => ({
            'option': 'nothing',
            'value': ['nothing', null],
        }))
        case 'simple': return p_.option($, ($): s_target.Value.state => ({
            'option': 'simple',
            'value': ['nothing', null],
        }))
        case 'optional': return p_.option($, ($): s_target.Value.state => ({
            'option': 'optional',
            'value': ['group', ['verbose', p_.literal.dictionary({
                "constraints": p_.change_context($['constraints'], ($) => ['optional', p_.from.optional($).decide(($): s_target.Value.optional => ['set', Resolver_Option_Constraints(
                    $,
                )], (): s_target.Value.optional => ['not set', null])]),
                "resolver": p_.change_context($['resolver'], ($) => Resolver_Value(
                    $,
                )),
                "not set constraints": p_.change_context($['not set constraints'], ($) => Resolver_Absence_Constraints(
                    $,
                )),
            })]],
        }))
        case 'reference': return p_.option($, ($): s_target.Value.state => ({
            'option': 'reference',
            'value': ['group', ['verbose', p_.literal.dictionary({
                "type": p_.change_context($['type'], ($) => ['state', p_.from.state($).decide(($): s_target.Value.state => {
                    switch ($[0]) {
                        case 'selected': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'selected',
                            'value': ['group', ['verbose', p_.literal.dictionary({
                                "lookup": p_.change_context($['lookup'], ($) => Resolver_Lookup_Selection(
                                    $,
                                )),
                                "constraints": p_.change_context($['constraints'], ($) => ['optional', p_.from.optional($).decide(($): s_target.Value.optional => ['set', Resolver_Reference_Constraints(
                                    $,
                                )], (): s_target.Value.optional => ['not set', null])]),
                            })]],
                        }))
                        default: return p_.exhaustive($[0])
                    }
                })]),
            })]],
        }))
        case 'state': return p_.option($, ($): s_target.Value.state => ({
            'option': 'state',
            'value': ['group', ['verbose', p_.literal.dictionary({
                "result": p_.change_context($['result'], ($) => ['optional', p_.from.optional($).decide(($): s_target.Value.optional => ['set', Resolver_Type_Reference(
                    $,
                )], (): s_target.Value.optional => ['not set', null])]),
                "options": p_.change_context($['options'], ($) => ['dictionary', p_.from.dictionary($).map(
                    ($, id) => ['group', ['verbose', p_.literal.dictionary({
                        "constraints": p_.change_context($['constraints'], ($) => ['optional', p_.from.optional($).decide(($): s_target.Value.optional => ['set', Resolver_Option_Constraints(
                            $,
                        )], (): s_target.Value.optional => ['not set', null])]),
                        "resolver": p_.change_context($['resolver'], ($) => Resolver_Value(
                            $,
                        )),
                        "result": p_.change_context($['result'], ($) => ['optional', p_.from.optional($).decide(($): s_target.Value.optional => ['set', Resolver_Result_Selection(
                            $,
                        )], (): s_target.Value.optional => ['not set', null])]),
                    })]],
                )]),
            })]],
        }))
        default: return p_.exhaustive($[0])
    }
})]

export const Resolver_Possible_Value_Selection: declarations.Resolver_Possible_Value_Selection = ($) => ['state', p_.from.state($).decide(($): s_target.Value.state => {
    switch ($[0]) {
        case 'optional value': return p_.option($, ($): s_target.Value.state => ({
            'option': 'optional value',
            'value': ['group', ['verbose', p_.literal.dictionary({
                "selection": p_.change_context($['selection'], ($) => Resolver_Guaranteed_Value_Selection(
                    $,
                )),
            })]],
        }))
        case 'parameter': return p_.option($, ($): s_target.Value.state => ({
            'option': 'parameter',
            'value': ['reference', {
                'value': $,
            }],
        }))
        case 'result': return p_.option($, ($): s_target.Value.state => ({
            'option': 'result',
            'value': ['state', p_.from.state($).decide(($): s_target.Value.state => {
                switch ($[0]) {
                    case 'state': return p_.option($, ($): s_target.Value.state => ({
                        'option': 'state',
                        'value': ['group', ['verbose', p_.literal.dictionary({
                            "property": p_.change_context($['property'], ($) => ['reference', {
                                'value': $,
                            }]),
                            "result": p_.change_context($['result'], ($) => Resolver_Type_Reference(
                                $,
                            )),
                        })]],
                    }))
                    case 'optional value': return p_.option($, ($): s_target.Value.state => ({
                        'option': 'optional value',
                        'value': ['group', ['verbose', p_.literal.dictionary({
                            "property": p_.change_context($['property'], ($) => ['reference', {
                                'value': $,
                            }]),
                            "result": p_.change_context($['result'], ($) => Resolver_Type_Reference(
                                $,
                            )),
                        })]],
                    }))
                    default: return p_.exhaustive($[0])
                }
            })],
        }))
        default: return p_.exhaustive($[0])
    }
})]

export const Resolver_Option_Constraints: declarations.Resolver_Option_Constraints = ($) => ['dictionary', p_.from.dictionary($).map(
    ($, id) => ['state', p_.from.state($).decide(($): s_target.Value.state => {
        switch ($[0]) {
            case 'state': return p_.option($, ($): s_target.Value.state => ({
                'option': 'state',
                'value': ['group', ['verbose', p_.literal.dictionary({
                    "selection": p_.change_context($['selection'], ($) => Resolver_Guaranteed_Value_Selection(
                        $,
                    )),
                    "option": p_.change_context($['option'], ($) => ['reference', {
                        'value': $,
                    }]),
                })]],
            }))
            case 'assert is set': return p_.option($, ($): s_target.Value.state => ({
                'option': 'assert is set',
                'value': Resolver_Possible_Value_Selection(
                    $,
                ),
            }))
            default: return p_.exhaustive($[0])
        }
    })],
)]

export const Resolver_Guaranteed_Value_Selection: declarations.Resolver_Guaranteed_Value_Selection = ($) => ['group', ['verbose', p_.literal.dictionary({
    "start": p_.change_context($['start'], ($) => ['state', p_.from.state($).decide(($): s_target.Value.state => {
        switch ($[0]) {
            case 'sibling': return p_.option($, ($): s_target.Value.state => ({
                'option': 'sibling',
                'value': ['reference', {
                    'value': $,
                }],
            }))
            case 'parent sibling': return p_.option($, ($): s_target.Value.state => ({
                'option': 'parent sibling',
                'value': ['reference', {
                    'value': $,
                }],
            }))
            case 'option constraint': return p_.option($, ($): s_target.Value.state => ({
                'option': 'option constraint',
                'value': ['reference', {
                    'value': $,
                }],
            }))
            case 'list cursor': return p_.option($, ($): s_target.Value.state => ({
                'option': 'list cursor',
                'value': ['nothing', null],
            }))
            case 'linked entry': return p_.option($, ($): s_target.Value.state => ({
                'option': 'linked entry',
                'value': ['nothing', null],
            }))
            case 'constraint': return p_.option($, ($): s_target.Value.state => ({
                'option': 'constraint',
                'value': ['state', p_.from.state($).decide(($): s_target.Value.state => {
                    switch ($[0]) {
                        case 'component': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'component',
                            'value': ['group', ['verbose', p_.literal.dictionary({
                                "property": p_.change_context($['property'], ($) => ['reference', {
                                    'value': $,
                                }]),
                                "constraint": p_.change_context($['constraint'], ($) => ['reference', {
                                    'value': $,
                                }]),
                            })]],
                        }))
                        case 'reference': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'reference',
                            'value': ['group', ['verbose', p_.literal.dictionary({
                                "property": p_.change_context($['property'], ($) => ['reference', {
                                    'value': $,
                                }]),
                                "constraint": p_.change_context($['constraint'], ($) => ['reference', {
                                    'value': $,
                                }]),
                            })]],
                        }))
                        default: return p_.exhaustive($[0])
                    }
                })],
            }))
            case 'parameter': return p_.option($, ($): s_target.Value.state => ({
                'option': 'parameter',
                'value': ['reference', {
                    'value': $,
                }],
            }))
            case 'result': return p_.option($, ($): s_target.Value.state => ({
                'option': 'result',
                'value': ['state', p_.from.state($).decide(($): s_target.Value.state => {
                    switch ($[0]) {
                        case 'list': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'list',
                            'value': ['group', ['verbose', p_.literal.dictionary({
                                "property": p_.change_context($['property'], ($) => ['reference', {
                                    'value': $,
                                }]),
                            })]],
                        }))
                        case 'state': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'state',
                            'value': ['group', ['verbose', p_.literal.dictionary({
                                "property": p_.change_context($['property'], ($) => ['reference', {
                                    'value': $,
                                }]),
                                "result": p_.change_context($['result'], ($) => Resolver_Type_Reference(
                                    $,
                                )),
                            })]],
                        }))
                        case 'optional value': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'optional value',
                            'value': ['group', ['verbose', p_.literal.dictionary({
                                "property": p_.change_context($['property'], ($) => ['reference', {
                                    'value': $,
                                }]),
                                "result": p_.change_context($['result'], ($) => Resolver_Type_Reference(
                                    $,
                                )),
                            })]],
                        }))
                        default: return p_.exhaustive($[0])
                    }
                })],
            }))
            default: return p_.exhaustive($[0])
        }
    })]),
    "tail": p_.change_context($['tail'], ($) => Resolver_Relative_Value_Selection(
        $,
    )),
})]]

export const Resolver_Benchmark: declarations.Resolver_Benchmark = ($) => ['group', ['verbose', p_.literal.dictionary({
    "selection": p_.change_context($['selection'], ($) => Resolver_Guaranteed_Value_Selection(
        $,
    )),
    "coverage": p_.change_context($['coverage'], ($) => ['state', p_.from.state($).decide(($): s_target.Value.state => {
        switch ($[0]) {
            case 'dense': return p_.option($, ($): s_target.Value.state => ({
                'option': 'dense',
                'value': ['nothing', null],
            }))
            case 'sparse': return p_.option($, ($): s_target.Value.state => ({
                'option': 'sparse',
                'value': ['nothing', null],
            }))
            default: return p_.exhaustive($[0])
        }
    })]),
})]]

export const Resolver_Constraint: declarations.Resolver_Constraint = ($) => ['group', ['verbose', p_.literal.dictionary({
    "selection": p_.change_context($['selection'], ($) => Resolver_Relative_Value_Selection(
        $,
    )),
    "type": p_.change_context($['type'], ($) => ['state', p_.from.state($).decide(($): s_target.Value.state => {
        switch ($[0]) {
            case 'state': return p_.option($, ($): s_target.Value.state => ({
                'option': 'state',
                'value': ['group', ['verbose', p_.literal.dictionary({
                    "option": p_.change_context($['option'], ($) => ['reference', {
                        'value': $,
                    }]),
                })]],
            }))
            case 'optional value': return p_.option($, ($): s_target.Value.state => ({
                'option': 'optional value',
                'value': ['group', ['verbose', p_.literal.dictionary({
                })]],
            }))
            default: return p_.exhaustive($[0])
        }
    })]),
})]]

export const Resolver_Lookup_Selection: declarations.Resolver_Lookup_Selection = ($) => ['group', ['verbose', p_.literal.dictionary({
    "type": p_.change_context($['type'], ($) => ['state', p_.from.state($).decide(($): s_target.Value.state => {
        switch ($[0]) {
            case 'acyclic': return p_.option($, ($): s_target.Value.state => ({
                'option': 'acyclic',
                'value': ['state', p_.from.state($).decide(($): s_target.Value.state => {
                    switch ($[0]) {
                        case 'siblings': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'siblings',
                            'value': ['nothing', null],
                        }))
                        case 'resolved dictionary': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'resolved dictionary',
                            'value': ['group', ['verbose', p_.literal.dictionary({
                                "selection": p_.change_context($['selection'], ($) => Resolver_Guaranteed_Value_Selection(
                                    $,
                                )),
                            })]],
                        }))
                        default: return p_.exhaustive($[0])
                    }
                })],
            }))
            case 'cyclic': return p_.option($, ($): s_target.Value.state => ({
                'option': 'cyclic',
                'value': ['state', p_.from.state($).decide(($): s_target.Value.state => {
                    switch ($[0]) {
                        case 'siblings': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'siblings',
                            'value': ['nothing', null],
                        }))
                        default: return p_.exhaustive($[0])
                    }
                })],
            }))
            case 'parameter': return p_.option($, ($): s_target.Value.state => ({
                'option': 'parameter',
                'value': ['reference', {
                    'value': $,
                }],
            }))
            default: return p_.exhaustive($[0])
        }
    })]),
})]]

export const Resolver_Option_Constraint_Source: declarations.Resolver_Option_Constraint_Source = ($) => ['nothing', null]

export const Resolver_Optional_Value_Constraints: declarations.Resolver_Optional_Value_Constraints = ($) => ['optional', p_.from.optional($).decide(($): s_target.Value.optional => ['set', Resolver_Value_Constraints(
    $,
)], (): s_target.Value.optional => ['not set', null])]

export const Resolver_Optional_Value_Initialization: declarations.Resolver_Optional_Value_Initialization = ($) => ['state', p_.from.state($).decide(($): s_target.Value.state => {
    switch ($[0]) {
        case 'not set': return p_.option($, ($): s_target.Value.state => ({
            'option': 'not set',
            'value': ['nothing', null],
        }))
        case 'set': return p_.option($, ($): s_target.Value.state => ({
            'option': 'set',
            'value': Resolver_Guaranteed_Value_Selection(
                $,
            ),
        }))
        case 'selection': return p_.option($, ($): s_target.Value.state => ({
            'option': 'selection',
            'value': Resolver_Possible_Value_Selection(
                $,
            ),
        }))
        default: return p_.exhaustive($[0])
    }
})]

export const Resolver_Reference_Constraint_Source: declarations.Resolver_Reference_Constraint_Source = ($) => ['nothing', null]

export const Resolver_Reference_To_Value_Constraint: declarations.Resolver_Reference_To_Value_Constraint = ($) => ['reference', {
    'value': $,
}]

export const Resolver_Types: declarations.Resolver_Types = ($) => ['dictionary', p_.from.dictionary($).map(
    ($, id) => ['group', ['verbose', p_.literal.dictionary({
        "root value resolver": p_.change_context($['root value resolver'], ($) => Resolver_Value(
            $,
        )),
    })]],
)]

export const Resolver_Value_Constraint: declarations.Resolver_Value_Constraint = ($) => ['group', ['verbose', p_.literal.dictionary({
    "start": p_.change_context($['start'], ($) => ['state', p_.from.state($).decide(($): s_target.Value.state => {
        switch ($[0]) {
            case 'value': return p_.option($, ($): s_target.Value.state => ({
                'option': 'value',
                'value': ['nothing', null],
            }))
            case 'sibling': return p_.option($, ($): s_target.Value.state => ({
                'option': 'sibling',
                'value': Resolver_Reference_To_Value_Constraint(
                    $,
                ),
            }))
            default: return p_.exhaustive($[0])
        }
    })]),
    "constraint": p_.change_context($['constraint'], ($) => Resolver_Constraint(
        $,
    )),
})]]

export const Schema: declarations.Schema = ($) => ['group', ['verbose', p_.literal.dictionary({
    "structure": p_.change_context($['structure'], ($) => Structure(
        $,
    )),
    "resolver": p_.change_context($['resolver'], ($) => Resolver(
        $,
    )),
})]]

export const Type_Specification: declarations.Type_Specification = ($) => ['group', ['verbose', p_.literal.dictionary({
    "file extension": p_.change_context($['file extension'], ($) => ['text', {
        'delimiter': ['quote', null],
        'value': $,
    }]),
    "schema": p_.change_context($['schema'], ($) => Schema(
        $,
    )),
    "root type": p_.change_context($['root type'], ($) => ['reference', {
        'value': $,
    }]),
})]]
