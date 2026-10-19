import * as p_ from 'pareto-core/refiner'

// schemas
import * as s_target from "../schema.js"
import * as s_source from "astn-runtime/modules/deserialization/schemas/parse_tree/schema"
import * as s_error from "liana-runtime/modules/value_unmarshalling/schemas/unmarshalling/schema"

// refiner dependencies
import * as r_unmarshalled_from_parse_tree from "liana-runtime/modules/value_unmarshalling/schemas/unmarshalled_value/refiners/astn_parse_tree"

export namespace declarations {
    
    export type Regular_Expression = p_.Refiner<
        s_target.Regular_Expression,
        s_error.Error,
        s_source.Value
    >

    export type Basic_Type = p_.Refiner<
        s_target.Basic_Type,
        s_error.Error,
        s_source.Value
    >
    
    export type Basic_Types = p_.Refiner<
        s_target.Basic_Types,
        s_error.Error,
        s_source.Value
    >
    
    export type Dictionary = p_.Refiner<
        s_target.Dictionary,
        s_error.Error,
        s_source.Value
    >
    
    export type Group = p_.Refiner<
        s_target.Group,
        s_error.Error,
        s_source.Value
    >
    
    export type Namespaces = p_.Refiner<
        s_target.Namespaces,
        s_error.Error,
        s_source.Value
    >

    export type Types = p_.Refiner<
        s_target.Types,
        s_error.Error,
        s_source.Value
    >
    
    export type Value = p_.Refiner<
        s_target.Value,
        s_error.Error,
        s_source.Value
    >
    
    export type Type = p_.Refiner<
        s_target.Type,
        s_error.Error,
        s_source.Value
    >
    
    export type Type_Reference = p_.Refiner<
        s_target.Type_Reference,
        s_error.Error,
        s_source.Value
    >
    
    export type Value_Path = p_.Refiner<
        s_target.Value_Path,
        s_error.Error,
        s_source.Value
    >
    
    export type Value_Reference = p_.Refiner<
        s_target.Value_Reference,
        s_error.Error,
        s_source.Value
    >
    
    export type Option_Constraints = p_.Refiner<
        s_target.Option_Constraints,
        s_error.Error,
        s_source.Value
    >
    
    export type Option_Constraint_Source = p_.Refiner<
        s_target.Option_Constraint_Source,
        s_error.Error,
        s_source.Value
    >

    export type Reference_Constraints = p_.Refiner<
        s_target.Reference_Constraints,
        s_error.Error,
        s_source.Value
    >

    export type Reference_Constraint_Source = p_.Refiner<
        s_target.Reference_Constraint_Source,
        s_error.Error,
        s_source.Value
    >

    export type Structure = p_.Refiner<
        s_target.Structure,
        s_error.Error,
        s_source.Value
    >

    export type Value_Result = p_.Refiner<
        s_target.Value_Result,
        s_error.Error,
        s_source.Value
    >

    export type Presence = p_.Refiner<
        s_target.Presence,
        s_error.Error,
        s_source.Value
    >
    
    export type Signatures_Type_Reference = p_.Refiner<
        s_target.Signatures_Type_Reference,
        s_error.Error,
        s_source.Value
    >
    
    export type Resolver_Signature_Parameters = p_.Refiner<
        s_target.Resolver_Signature_Parameters,
        s_error.Error,
        s_source.Value
    >
    
    export type Resolver_Signatures = p_.Refiner<
        s_target.Resolver_Signatures,
        s_error.Error,
        s_source.Value
    >
    
    export type Resolver_Signature = p_.Refiner<
        s_target.Resolver_Signature,
        s_error.Error,
        s_source.Value
    >

    export type Resolver_Namespaces = p_.Refiner<
        s_target.Resolver_Namespaces,
        s_error.Error,
        s_source.Value
    >

    export type Resolver = p_.Refiner<
        s_target.Resolver,
        s_error.Error,
        s_source.Value
    >

    export type Resolver_Absence_Constraints = p_.Refiner<
        s_target.Resolver_Absence_Constraints,
        s_error.Error,
        s_source.Value
    >

    export type Resolver_Value_Group = p_.Refiner<
        s_target.Resolver_Value_Group,
        s_error.Error,
        s_source.Value
    >

    export type Resolver_Value_Constraints = p_.Refiner<
        s_target.Resolver_Value_Constraints,
        s_error.Error,
        s_source.Value
    >
    
    export type Resolver_Type_Reference = p_.Refiner<
        s_target.Resolver_Type_Reference,
        s_error.Error,
        s_source.Value
    >

    export type Resolver_Value_Path = p_.Refiner<
        s_target.Resolver_Value_Path,
        s_error.Error,
        s_source.Value
    >

    export type Resolver_Value_Reference = p_.Refiner<
        s_target.Resolver_Value_Reference,
        s_error.Error,
        s_source.Value
    >

    export type Resolver_Relative_Value_Selection = p_.Refiner<
        s_target.Resolver_Relative_Value_Selection,
        s_error.Error,
        s_source.Value
    >

    export type Resolver_Result_Selection = p_.Refiner<
        s_target.Resolver_Result_Selection,
        s_error.Error,
        s_source.Value
    >

    export type Resolver_Value_List_Result = p_.Refiner<
        s_target.Resolver_Value_List_Result,
        s_error.Error,
        s_source.Value
    >
    
    export type Resolver_Reference_Constraints = p_.Refiner<
        s_target.Resolver_Reference_Constraints,
        s_error.Error,
        s_source.Value
    >

    export type Resolver_Value = p_.Refiner<
        s_target.Resolver_Value,
        s_error.Error,
        s_source.Value
    >
    
    export type Resolver_Possible_Value_Selection = p_.Refiner<
        s_target.Resolver_Possible_Value_Selection,
        s_error.Error,
        s_source.Value
    >
    
    export type Resolver_Option_Constraints = p_.Refiner<
        s_target.Resolver_Option_Constraints,
        s_error.Error,
        s_source.Value
    >
    
    export type Resolver_Guaranteed_Value_Selection = p_.Refiner<
        s_target.Resolver_Guaranteed_Value_Selection,
        s_error.Error,
        s_source.Value
    >
    
    export type Resolver_Benchmark = p_.Refiner<
        s_target.Resolver_Benchmark,
        s_error.Error,
        s_source.Value
    >
    
    export type Resolver_Constraint = p_.Refiner<
        s_target.Resolver_Constraint,
        s_error.Error,
        s_source.Value
    >
    
    export type Resolver_Lookup_Selection = p_.Refiner<
        s_target.Resolver_Lookup_Selection,
        s_error.Error,
        s_source.Value
    >
    
    export type Resolver_Option_Constraint_Source = p_.Refiner<
        s_target.Resolver_Option_Constraint_Source,
        s_error.Error,
        s_source.Value
    >

    export type Resolver_Optional_Value_Constraints = p_.Refiner<
        s_target.Resolver_Optional_Value_Constraints,
        s_error.Error,
        s_source.Value
    >
    
    export type Resolver_Optional_Value_Initialization = p_.Refiner<
        s_target.Resolver_Optional_Value_Initialization,
        s_error.Error,
        s_source.Value
    >
    
    export type Resolver_Reference_Constraint_Source = p_.Refiner<
        s_target.Resolver_Reference_Constraint_Source,
        s_error.Error,
        s_source.Value
    >
    
    export type Resolver_Reference_To_Value_Constraint = p_.Refiner<
        s_target.Resolver_Reference_To_Value_Constraint,
        s_error.Error,
        s_source.Value
    >
    
    export type Resolver_Types = p_.Refiner<
        s_target.Resolver_Types,
        s_error.Error,
        s_source.Value
    >
    
    export type Resolver_Value_Constraint = p_.Refiner<
        s_target.Resolver_Value_Constraint,
        s_error.Error,
        s_source.Value
    >
    
    export type Schema = p_.Refiner<
        s_target.Schema,
        s_error.Error,
        s_source.Value
    >
    
    export type Type_Specification = p_.Refiner<
        s_target.Type_Specification,
        s_error.Error,
        s_source.Value
    >
}

// implementations

export const Regular_Expression: declarations.Regular_Expression = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.State(
    $,
    abort,
), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Regular_Expression => {
    switch ($text) {
        case "any character": return p_.change_context($['value'], ($) => ['any character', r_unmarshalled_from_parse_tree.Nothing(
            $,
            abort,
        )])
        case "literal": return p_.change_context($['value'], ($) => ['literal', r_unmarshalled_from_parse_tree.Text(
            $,
            abort,
        )])
        case "character set": return p_.change_context($['value'], ($) => ['character set', r_unmarshalled_from_parse_tree.Text(
            $,
            abort,
        )])
        case "sequence": return p_.change_context($['value'], ($) => ['sequence', p_.from.list(r_unmarshalled_from_parse_tree.List(
            $,
            abort,
        )['items']).map(
            ($) => p_.change_context($['value'], ($) => Regular_Expression(
                $,
                abort,
            )),
        )])
        case "choice": return p_.change_context($['value'], ($) => ['choice', p_.from.list(r_unmarshalled_from_parse_tree.List(
            $,
            abort,
        )['items']).map(
            ($) => p_.change_context($['value'], ($) => Regular_Expression(
                $,
                abort,
            )),
        )])
        case "repetition": return p_.change_context($['value'], ($) => ['repetition', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            abort,
            {
                'expected properties': p_.literal.dictionary({
                    "expression": null,
                    "quantity": null,
                }),
            },
        ), ($) => ({
            'expression': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'expression',
                },
            ), ($) => Regular_Expression(
                $,
                abort,
            )),
            'quantity': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'quantity',
                },
            ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
                $,
                abort,
            ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Regular_Expression.repetition.quantity => {
                switch ($text) {
                    case "optional": return p_.change_context($['value'], ($) => ['optional', r_unmarshalled_from_parse_tree.Nothing(
                        $,
                        abort,
                    )])
                    case "zero or more": return p_.change_context($['value'], ($) => ['zero or more', r_unmarshalled_from_parse_tree.Nothing(
                        $,
                        abort,
                    )])
                    case "one or more": return p_.change_context($['value'], ($) => ['one or more', r_unmarshalled_from_parse_tree.Nothing(
                        $,
                        abort,
                    )])
                    default: return abort(
                        ['liana', {
                            'type': ['state', ['unknown option', $['option']['token']['value']]],
                            'range': $['option']['range'],
                        }],
                    )
                }
            }))),
        }))])
        default: return abort(
            ['liana', {
                'type': ['state', ['unknown option', $['option']['token']['value']]],
                'range': $['option']['range'],
            }],
        )
    }
}))

export const Basic_Type: declarations.Basic_Type = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
    $,
    abort,
    {
        'expected properties': p_.literal.dictionary({
            "type": null,
            "regular expression": null,
        }),
    },
), ($) => ({
    'type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'type',
        },
    ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
        $,
        abort,
    ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Basic_Type.type_ => {
        switch ($text) {
            case "double quoted": return p_.change_context($['value'], ($) => ['double quoted', r_unmarshalled_from_parse_tree.Nothing(
                $,
                abort,
            )])
            case "undelimited": return p_.change_context($['value'], ($) => ['undelimited', r_unmarshalled_from_parse_tree.Nothing(
                $,
                abort,
            )])
            default: return abort(
                ['liana', {
                    'type': ['state', ['unknown option', $['option']['token']['value']]],
                    'range': $['option']['range'],
                }],
            )
        }
    }))),
    'regular expression': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'regular expression',
        },
    ), ($) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
        $,
        abort,
    )['optional']).map(($) => Regular_Expression(
        $,
        abort,
    ))),
}))

export const Basic_Types: declarations.Basic_Types = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
    $,
    abort,
), ($) => p_.from.dictionary($['entries']).map(
    ($, id) => Basic_Type(
        $,
        abort,
    ),
))

export const Dictionary: declarations.Dictionary = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
    $,
    abort,
    {
        'expected properties': p_.literal.dictionary({
            "value": null,
        }),
    },
), ($) => ({
    'value': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'value',
        },
    ), ($) => Value(
        $,
        abort,
    )),
}))

export const Group: declarations.Group = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
    $,
    abort,
), ($) => p_.from.dictionary($['entries']).map(
    ($, id) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
        $,
        abort,
        {
            'expected properties': p_.literal.dictionary({
                "description": null,
                "value": null,
            }),
        },
    ), ($) => ({
        'description': p_.change_context(r_unmarshalled_from_parse_tree.Property(
            $,
            abort,
            {
                'id': 'description',
            },
        ), ($) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
            $,
            abort,
        )['optional']).map(($) => r_unmarshalled_from_parse_tree.Text(
            $,
            abort,
        ))),
        'value': p_.change_context(r_unmarshalled_from_parse_tree.Property(
            $,
            abort,
            {
                'id': 'value',
            },
        ), ($) => Value(
            $,
            abort,
        )),
    })),
))

export const Namespaces: declarations.Namespaces = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
    $,
    abort,
), ($) => p_.from.dictionary($['entries']).map(
    ($, id) => Structure(
        $,
        abort,
    ),
))

export const Types: declarations.Types = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
    $,
    abort,
), ($) => p_.from.dictionary($['entries']).map(
    ($, id) => Type(
        $,
        abort,
    ),
))

export const Value: declarations.Value = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.State(
    $,
    abort,
), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Value => {
    switch ($text) {
        case "component": return p_.change_context($['value'], ($) => ['component', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            abort,
            {
                'expected properties': p_.literal.dictionary({
                    "type": null,
                }),
            },
        ), ($) => ({
            'type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'type',
                },
            ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
                $,
                abort,
            ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Value.component.type_ => {
                switch ($text) {
                    case "internal": return p_.change_context($['value'], ($) => ['internal', r_unmarshalled_from_parse_tree.Text(
                        $,
                        abort,
                    )])
                    case "internal cyclic": return p_.change_context($['value'], ($) => ['internal cyclic', r_unmarshalled_from_parse_tree.Text(
                        $,
                        abort,
                    )])
                    case "child": return p_.change_context($['value'], ($) => ['child', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                        $,
                        abort,
                        {
                            'expected properties': p_.literal.dictionary({
                                "namespace": null,
                                "type": null,
                            }),
                        },
                    ), ($) => ({
                        'namespace': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            abort,
                            {
                                'id': 'namespace',
                            },
                        ), ($) => r_unmarshalled_from_parse_tree.Text(
                            $,
                            abort,
                        )),
                        'type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            abort,
                            {
                                'id': 'type',
                            },
                        ), ($) => r_unmarshalled_from_parse_tree.Text(
                            $,
                            abort,
                        )),
                    }))])
                    default: return abort(
                        ['liana', {
                            'type': ['state', ['unknown option', $['option']['token']['value']]],
                            'range': $['option']['range'],
                        }],
                    )
                }
            }))),
        }))])
        case "dictionary": return p_.change_context($['value'], ($) => ['dictionary', Dictionary(
            $,
            abort,
        )])
        case "group": return p_.change_context($['value'], ($) => ['group', Group(
            $,
            abort,
        )])
        case "list": return p_.change_context($['value'], ($) => ['list', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            abort,
            {
                'expected properties': p_.literal.dictionary({
                    "value": null,
                    "result": null,
                }),
            },
        ), ($) => ({
            'value': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'value',
                },
            ), ($) => Value(
                $,
                abort,
            )),
            'result': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'result',
                },
            ), ($) => Value_Result(
                $,
                abort,
            )),
        }))])
        case "nothing": return p_.change_context($['value'], ($) => ['nothing', r_unmarshalled_from_parse_tree.Nothing(
            $,
            abort,
        )])
        case "simple": return p_.change_context($['value'], ($) => ['simple', r_unmarshalled_from_parse_tree.Text(
            $,
            abort,
        )])
        case "optional": return p_.change_context($['value'], ($) => ['optional', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            abort,
            {
                'expected properties': p_.literal.dictionary({
                    "constraints": null,
                    "value": null,
                }),
            },
        ), ($) => ({
            'constraints': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'constraints',
                },
            ), ($) => Option_Constraints(
                $,
                abort,
            )),
            'value': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'value',
                },
            ), ($) => Value(
                $,
                abort,
            )),
        }))])
        case "reference": return p_.change_context($['value'], ($) => ['reference', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            abort,
            {
                'expected properties': p_.literal.dictionary({
                    "referent": null,
                    "type": null,
                }),
            },
        ), ($) => ({
            'referent': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'referent',
                },
            ), ($) => Value_Reference(
                $,
                abort,
            )),
            'type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'type',
                },
            ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
                $,
                abort,
            ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Value.reference.type_ => {
                switch ($text) {
                    case "selected": return p_.change_context($['value'], ($) => ['selected', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                        $,
                        abort,
                        {
                            'expected properties': p_.literal.dictionary({
                                "dependency": null,
                                "constraints": null,
                            }),
                        },
                    ), ($) => ({
                        'dependency': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            abort,
                            {
                                'id': 'dependency',
                            },
                        ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
                            $,
                            abort,
                        ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Value.reference.type_.selected.dependency => {
                            switch ($text) {
                                case "acyclic": return p_.change_context($['value'], ($) => ['acyclic', r_unmarshalled_from_parse_tree.Nothing(
                                    $,
                                    abort,
                                )])
                                case "cyclic": return p_.change_context($['value'], ($) => ['cyclic', r_unmarshalled_from_parse_tree.Nothing(
                                    $,
                                    abort,
                                )])
                                default: return abort(
                                    ['liana', {
                                        'type': ['state', ['unknown option', $['option']['token']['value']]],
                                        'range': $['option']['range'],
                                    }],
                                )
                            }
                        }))),
                        'constraints': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            abort,
                            {
                                'id': 'constraints',
                            },
                        ), ($) => Reference_Constraints(
                            $,
                            abort,
                        )),
                    }))])
                    default: return abort(
                        ['liana', {
                            'type': ['state', ['unknown option', $['option']['token']['value']]],
                            'range': $['option']['range'],
                        }],
                    )
                }
            }))),
        }))])
        case "state": return p_.change_context($['value'], ($) => ['state', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            abort,
            {
                'expected properties': p_.literal.dictionary({
                    "options": null,
                    "result": null,
                }),
            },
        ), ($) => ({
            'options': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'options',
                },
            ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
                $,
                abort,
            ), ($) => p_.from.dictionary($['entries']).map(
                ($, id) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                    $,
                    abort,
                    {
                        'expected properties': p_.literal.dictionary({
                            "description": null,
                            "constraints": null,
                            "value": null,
                        }),
                    },
                ), ($) => ({
                    'description': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        abort,
                        {
                            'id': 'description',
                        },
                    ), ($) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                        $,
                        abort,
                    )['optional']).map(($) => r_unmarshalled_from_parse_tree.Text(
                        $,
                        abort,
                    ))),
                    'constraints': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        abort,
                        {
                            'id': 'constraints',
                        },
                    ), ($) => Option_Constraints(
                        $,
                        abort,
                    )),
                    'value': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        abort,
                        {
                            'id': 'value',
                        },
                    ), ($) => Value(
                        $,
                        abort,
                    )),
                })),
            ))),
            'result': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'result',
                },
            ), ($) => Value_Result(
                $,
                abort,
            )),
        }))])
        default: return abort(
            ['liana', {
                'type': ['state', ['unknown option', $['option']['token']['value']]],
                'range': $['option']['range'],
            }],
        )
    }
}))

export const Type: declarations.Type = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
    $,
    abort,
    {
        'expected properties': p_.literal.dictionary({
            "root value": null,
        }),
    },
), ($) => ({
    'root value': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'root value',
        },
    ), ($) => Value(
        $,
        abort,
    )),
}))

export const Type_Reference: declarations.Type_Reference = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
    $,
    abort,
    {
        'expected properties': p_.literal.dictionary({
            "location": null,
        }),
    },
), ($) => ({
    'location': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'location',
        },
    ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
        $,
        abort,
    ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Type_Reference.location => {
        switch ($text) {
            case "internal": return p_.change_context($['value'], ($) => ['internal', r_unmarshalled_from_parse_tree.Text(
                $,
                abort,
            )])
            case "child": return p_.change_context($['value'], ($) => ['child', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                $,
                abort,
                {
                    'expected properties': p_.literal.dictionary({
                        "namespace": null,
                        "type": null,
                    }),
                },
            ), ($) => ({
                'namespace': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                    $,
                    abort,
                    {
                        'id': 'namespace',
                    },
                ), ($) => r_unmarshalled_from_parse_tree.Text(
                    $,
                    abort,
                )),
                'type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                    $,
                    abort,
                    {
                        'id': 'type',
                    },
                ), ($) => r_unmarshalled_from_parse_tree.Text(
                    $,
                    abort,
                )),
            }))])
            case "sibling": return p_.change_context($['value'], ($) => ['sibling', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                $,
                abort,
                {
                    'expected properties': p_.literal.dictionary({
                        "namespace": null,
                        "type": null,
                    }),
                },
            ), ($) => ({
                'namespace': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                    $,
                    abort,
                    {
                        'id': 'namespace',
                    },
                ), ($) => r_unmarshalled_from_parse_tree.Text(
                    $,
                    abort,
                )),
                'type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                    $,
                    abort,
                    {
                        'id': 'type',
                    },
                ), ($) => r_unmarshalled_from_parse_tree.Text(
                    $,
                    abort,
                )),
            }))])
            default: return abort(
                ['liana', {
                    'type': ['state', ['unknown option', $['option']['token']['value']]],
                    'range': $['option']['range'],
                }],
            )
        }
    }))),
}))

export const Value_Path: declarations.Value_Path = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
    $,
    abort,
    {
        'expected properties': p_.literal.dictionary({
            "tail": null,
        }),
    },
), ($) => ({
    'tail': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'tail',
        },
    ), ($) => p_.from.list(r_unmarshalled_from_parse_tree.List(
        $,
        abort,
    )['items']).map(
        ($) => p_.change_context($['value'], ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
            $,
            abort,
        ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Value_Path.tail.L => {
            switch ($text) {
                case "dictionary": return p_.change_context($['value'], ($) => ['dictionary', r_unmarshalled_from_parse_tree.Nothing(
                    $,
                    abort,
                )])
                case "group": return p_.change_context($['value'], ($) => ['group', r_unmarshalled_from_parse_tree.Text(
                    $,
                    abort,
                )])
                case "list": return p_.change_context($['value'], ($) => ['list', r_unmarshalled_from_parse_tree.Nothing(
                    $,
                    abort,
                )])
                case "optional": return p_.change_context($['value'], ($) => ['optional', r_unmarshalled_from_parse_tree.Nothing(
                    $,
                    abort,
                )])
                case "state": return p_.change_context($['value'], ($) => ['state', r_unmarshalled_from_parse_tree.Text(
                    $,
                    abort,
                )])
                default: return abort(
                    ['liana', {
                        'type': ['state', ['unknown option', $['option']['token']['value']]],
                        'range': $['option']['range'],
                    }],
                )
            }
        }))),
    )),
}))

export const Value_Reference: declarations.Value_Reference = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
    $,
    abort,
    {
        'expected properties': p_.literal.dictionary({
            "type": null,
            "path": null,
        }),
    },
), ($) => ({
    'type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'type',
        },
    ), ($) => Type_Reference(
        $,
        abort,
    )),
    'path': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'path',
        },
    ), ($) => Value_Path(
        $,
        abort,
    )),
}))

export const Option_Constraints: declarations.Option_Constraints = ($, abort) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
    $,
    abort,
)['optional']).map(($) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
    $,
    abort,
), ($) => p_.from.dictionary($['entries']).map(
    ($, id) => Value_Reference(
        $,
        abort,
    ),
)))

export const Option_Constraint_Source: declarations.Option_Constraint_Source = ($, abort) => r_unmarshalled_from_parse_tree.Nothing(
    $,
    abort,
)

export const Reference_Constraints: declarations.Reference_Constraints = ($, abort) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
    $,
    abort,
)['optional']).map(($) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
    $,
    abort,
), ($) => p_.from.dictionary($['entries']).map(
    ($, id) => Value_Reference(
        $,
        abort,
    ),
)))

export const Reference_Constraint_Source: declarations.Reference_Constraint_Source = ($, abort) => r_unmarshalled_from_parse_tree.Nothing(
    $,
    abort,
)

export const Structure: declarations.Structure = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
    $,
    abort,
    {
        'expected properties': p_.literal.dictionary({
            "namespaces": null,
            "basic types": null,
            "types": null,
        }),
    },
), ($) => ({
    'namespaces': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'namespaces',
        },
    ), ($) => Namespaces(
        $,
        abort,
    )),
    'basic types': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'basic types',
        },
    ), ($) => Basic_Types(
        $,
        abort,
    )),
    'types': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'types',
        },
    ), ($) => Types(
        $,
        abort,
    )),
}))

export const Value_Result: declarations.Value_Result = ($, abort) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
    $,
    abort,
)['optional']).map(($) => Value_Reference(
    $,
    abort,
))

export const Presence: declarations.Presence = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.State(
    $,
    abort,
), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Presence => {
    switch ($text) {
        case "optional": return p_.change_context($['value'], ($) => ['optional', r_unmarshalled_from_parse_tree.Nothing(
            $,
            abort,
        )])
        case "required": return p_.change_context($['value'], ($) => ['required', r_unmarshalled_from_parse_tree.Nothing(
            $,
            abort,
        )])
        default: return abort(
            ['liana', {
                'type': ['state', ['unknown option', $['option']['token']['value']]],
                'range': $['option']['range'],
            }],
        )
    }
}))

export const Signatures_Type_Reference: declarations.Signatures_Type_Reference = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
    $,
    abort,
    {
        'expected properties': p_.literal.dictionary({
            "location": null,
        }),
    },
), ($) => ({
    'location': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'location',
        },
    ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
        $,
        abort,
    ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Signatures_Type_Reference.location => {
        switch ($text) {
            case "internal": return p_.change_context($['value'], ($) => ['internal', r_unmarshalled_from_parse_tree.Text(
                $,
                abort,
            )])
            case "child": return p_.change_context($['value'], ($) => ['child', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                $,
                abort,
                {
                    'expected properties': p_.literal.dictionary({
                        "namespace": null,
                        "type": null,
                    }),
                },
            ), ($) => ({
                'namespace': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                    $,
                    abort,
                    {
                        'id': 'namespace',
                    },
                ), ($) => r_unmarshalled_from_parse_tree.Text(
                    $,
                    abort,
                )),
                'type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                    $,
                    abort,
                    {
                        'id': 'type',
                    },
                ), ($) => r_unmarshalled_from_parse_tree.Text(
                    $,
                    abort,
                )),
            }))])
            case "sibling": return p_.change_context($['value'], ($) => ['sibling', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                $,
                abort,
                {
                    'expected properties': p_.literal.dictionary({
                        "namespace": null,
                        "type": null,
                    }),
                },
            ), ($) => ({
                'namespace': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                    $,
                    abort,
                    {
                        'id': 'namespace',
                    },
                ), ($) => r_unmarshalled_from_parse_tree.Text(
                    $,
                    abort,
                )),
                'type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                    $,
                    abort,
                    {
                        'id': 'type',
                    },
                ), ($) => r_unmarshalled_from_parse_tree.Text(
                    $,
                    abort,
                )),
            }))])
            default: return abort(
                ['liana', {
                    'type': ['state', ['unknown option', $['option']['token']['value']]],
                    'range': $['option']['range'],
                }],
            )
        }
    }))),
}))

export const Resolver_Signature_Parameters: declarations.Resolver_Signature_Parameters = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
    $,
    abort,
    {
        'expected properties': p_.literal.dictionary({
            "types": null,
            "lookups": null,
        }),
    },
), ($) => ({
    'types': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'types',
        },
    ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
        $,
        abort,
    ), ($) => p_.from.dictionary($['entries']).map(
        ($, id) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            abort,
            {
                'expected properties': p_.literal.dictionary({
                    "type": null,
                    "presence": null,
                }),
            },
        ), ($) => ({
            'type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'type',
                },
            ), ($) => Signatures_Type_Reference(
                $,
                abort,
            )),
            'presence': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'presence',
                },
            ), ($) => Presence(
                $,
                abort,
            )),
        })),
    ))),
    'lookups': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'lookups',
        },
    ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
        $,
        abort,
    ), ($) => p_.from.dictionary($['entries']).map(
        ($, id) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            abort,
            {
                'expected properties': p_.literal.dictionary({
                    "referent": null,
                    "type": null,
                    "presence": null,
                }),
            },
        ), ($) => ({
            'referent': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'referent',
                },
            ), ($) => Signatures_Type_Reference(
                $,
                abort,
            )),
            'type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'type',
                },
            ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
                $,
                abort,
            ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Resolver_Signature_Parameters.lookups.D.type_ => {
                switch ($text) {
                    case "cyclic": return p_.change_context($['value'], ($) => ['cyclic', r_unmarshalled_from_parse_tree.Nothing(
                        $,
                        abort,
                    )])
                    case "acyclic": return p_.change_context($['value'], ($) => ['acyclic', r_unmarshalled_from_parse_tree.Nothing(
                        $,
                        abort,
                    )])
                    default: return abort(
                        ['liana', {
                            'type': ['state', ['unknown option', $['option']['token']['value']]],
                            'range': $['option']['range'],
                        }],
                    )
                }
            }))),
            'presence': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'presence',
                },
            ), ($) => Presence(
                $,
                abort,
            )),
        })),
    ))),
}))

export const Resolver_Signatures: declarations.Resolver_Signatures = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
    $,
    abort,
), ($) => p_.from.dictionary($['entries']).map(
    ($, id) => Resolver_Signature(
        $,
        abort,
    ),
))

export const Resolver_Signature: declarations.Resolver_Signature = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
    $,
    abort,
    {
        'expected properties': p_.literal.dictionary({
            "parameters": null,
        }),
    },
), ($) => ({
    'parameters': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'parameters',
        },
    ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
        $,
        abort,
    ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Resolver_Signature.parameters => {
        switch ($text) {
            case "local": return p_.change_context($['value'], ($) => ['local', Resolver_Signature_Parameters(
                $,
                abort,
            )])
            case "same as": return p_.change_context($['value'], ($) => ['same as', r_unmarshalled_from_parse_tree.Text(
                $,
                abort,
            )])
            default: return abort(
                ['liana', {
                    'type': ['state', ['unknown option', $['option']['token']['value']]],
                    'range': $['option']['range'],
                }],
            )
        }
    }))),
}))

export const Resolver_Namespaces: declarations.Resolver_Namespaces = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
    $,
    abort,
), ($) => p_.from.dictionary($['entries']).map(
    ($, id) => Resolver(
        $,
        abort,
    ),
))

export const Resolver: declarations.Resolver = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
    $,
    abort,
    {
        'expected properties': p_.literal.dictionary({
            "namespaces": null,
            "signatures": null,
            "types": null,
        }),
    },
), ($) => ({
    'namespaces': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'namespaces',
        },
    ), ($) => Resolver_Namespaces(
        $,
        abort,
    )),
    'signatures': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'signatures',
        },
    ), ($) => Resolver_Signatures(
        $,
        abort,
    )),
    'types': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'types',
        },
    ), ($) => Resolver_Types(
        $,
        abort,
    )),
}))

export const Resolver_Absence_Constraints: declarations.Resolver_Absence_Constraints = ($, abort) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
    $,
    abort,
)['optional']).map(($) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
    $,
    abort,
), ($) => p_.from.dictionary($['entries']).map(
    ($, id) => Resolver_Possible_Value_Selection(
        $,
        abort,
    ),
)))

export const Resolver_Value_Group: declarations.Resolver_Value_Group = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
    $,
    abort,
), ($) => p_.from.dictionary($['entries']).map(
    ($, id) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
        $,
        abort,
        {
            'expected properties': p_.literal.dictionary({
                "resolver": null,
            }),
        },
    ), ($) => ({
        'resolver': p_.change_context(r_unmarshalled_from_parse_tree.Property(
            $,
            abort,
            {
                'id': 'resolver',
            },
        ), ($) => Resolver_Value(
            $,
            abort,
        )),
    })),
))

export const Resolver_Value_Constraints: declarations.Resolver_Value_Constraints = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
    $,
    abort,
), ($) => p_.from.dictionary($['entries']).map(
    ($, id) => Resolver_Value_Constraint(
        $,
        abort,
    ),
))

export const Resolver_Type_Reference: declarations.Resolver_Type_Reference = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
    $,
    abort,
    {
        'expected properties': p_.literal.dictionary({
            "location": null,
        }),
    },
), ($) => ({
    'location': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'location',
        },
    ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
        $,
        abort,
    ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Resolver_Type_Reference.location => {
        switch ($text) {
            case "internal": return p_.change_context($['value'], ($) => ['internal', r_unmarshalled_from_parse_tree.Text(
                $,
                abort,
            )])
            case "child": return p_.change_context($['value'], ($) => ['child', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                $,
                abort,
                {
                    'expected properties': p_.literal.dictionary({
                        "namespace": null,
                        "type": null,
                    }),
                },
            ), ($) => ({
                'namespace': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                    $,
                    abort,
                    {
                        'id': 'namespace',
                    },
                ), ($) => r_unmarshalled_from_parse_tree.Text(
                    $,
                    abort,
                )),
                'type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                    $,
                    abort,
                    {
                        'id': 'type',
                    },
                ), ($) => r_unmarshalled_from_parse_tree.Text(
                    $,
                    abort,
                )),
            }))])
            case "sibling": return p_.change_context($['value'], ($) => ['sibling', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                $,
                abort,
                {
                    'expected properties': p_.literal.dictionary({
                        "namespace": null,
                        "type": null,
                    }),
                },
            ), ($) => ({
                'namespace': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                    $,
                    abort,
                    {
                        'id': 'namespace',
                    },
                ), ($) => r_unmarshalled_from_parse_tree.Text(
                    $,
                    abort,
                )),
                'type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                    $,
                    abort,
                    {
                        'id': 'type',
                    },
                ), ($) => r_unmarshalled_from_parse_tree.Text(
                    $,
                    abort,
                )),
            }))])
            default: return abort(
                ['liana', {
                    'type': ['state', ['unknown option', $['option']['token']['value']]],
                    'range': $['option']['range'],
                }],
            )
        }
    }))),
}))

export const Resolver_Value_Path: declarations.Resolver_Value_Path = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
    $,
    abort,
    {
        'expected properties': p_.literal.dictionary({
            "tail": null,
        }),
    },
), ($) => ({
    'tail': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'tail',
        },
    ), ($) => p_.from.list(r_unmarshalled_from_parse_tree.List(
        $,
        abort,
    )['items']).map(
        ($) => p_.change_context($['value'], ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
            $,
            abort,
        ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Resolver_Value_Path.tail.L => {
            switch ($text) {
                case "dictionary": return p_.change_context($['value'], ($) => ['dictionary', r_unmarshalled_from_parse_tree.Nothing(
                    $,
                    abort,
                )])
                case "group": return p_.change_context($['value'], ($) => ['group', r_unmarshalled_from_parse_tree.Text(
                    $,
                    abort,
                )])
                case "list": return p_.change_context($['value'], ($) => ['list', r_unmarshalled_from_parse_tree.Nothing(
                    $,
                    abort,
                )])
                case "optional": return p_.change_context($['value'], ($) => ['optional', r_unmarshalled_from_parse_tree.Nothing(
                    $,
                    abort,
                )])
                case "state": return p_.change_context($['value'], ($) => ['state', r_unmarshalled_from_parse_tree.Text(
                    $,
                    abort,
                )])
                default: return abort(
                    ['liana', {
                        'type': ['state', ['unknown option', $['option']['token']['value']]],
                        'range': $['option']['range'],
                    }],
                )
            }
        }))),
    )),
}))

export const Resolver_Value_Reference: declarations.Resolver_Value_Reference = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
    $,
    abort,
    {
        'expected properties': p_.literal.dictionary({
            "type": null,
            "path": null,
        }),
    },
), ($) => ({
    'type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'type',
        },
    ), ($) => Resolver_Type_Reference(
        $,
        abort,
    )),
    'path': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'path',
        },
    ), ($) => Resolver_Value_Path(
        $,
        abort,
    )),
}))

export const Resolver_Relative_Value_Selection: declarations.Resolver_Relative_Value_Selection = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
    $,
    abort,
    {
        'expected properties': p_.literal.dictionary({
            "path": null,
        }),
    },
), ($) => ({
    'path': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'path',
        },
    ), ($) => p_.from.list(r_unmarshalled_from_parse_tree.List(
        $,
        abort,
    )['items']).map(
        ($) => p_.change_context($['value'], ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
            $,
            abort,
        ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Resolver_Relative_Value_Selection.path.L => {
            switch ($text) {
                case "benchmark link": return p_.change_context($['value'], ($) => ['benchmark link', Resolver_Value_Reference(
                    $,
                    abort,
                )])
                case "component constraint": return p_.change_context($['value'], ($) => ['component constraint', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                    $,
                    abort,
                    {
                        'expected properties': p_.literal.dictionary({
                            "name": null,
                            "target": null,
                        }),
                    },
                ), ($) => ({
                    'name': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        abort,
                        {
                            'id': 'name',
                        },
                    ), ($) => r_unmarshalled_from_parse_tree.Text(
                        $,
                        abort,
                    )),
                    'target': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        abort,
                        {
                            'id': 'target',
                        },
                    ), ($) => Resolver_Value_Reference(
                        $,
                        abort,
                    )),
                }))])
                case "component": return p_.change_context($['value'], ($) => ['component', r_unmarshalled_from_parse_tree.Nothing(
                    $,
                    abort,
                )])
                case "group": return p_.change_context($['value'], ($) => ['group', r_unmarshalled_from_parse_tree.Text(
                    $,
                    abort,
                )])
                case "list result": return p_.change_context($['value'], ($) => ['list result', Resolver_Type_Reference(
                    $,
                    abort,
                )])
                case "option constraint": return p_.change_context($['value'], ($) => ['option constraint', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                    $,
                    abort,
                    {
                        'expected properties': p_.literal.dictionary({
                            "option": null,
                            "constraint": null,
                        }),
                    },
                ), ($) => ({
                    'option': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        abort,
                        {
                            'id': 'option',
                        },
                    ), ($) => r_unmarshalled_from_parse_tree.Text(
                        $,
                        abort,
                    )),
                    'constraint': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        abort,
                        {
                            'id': 'constraint',
                        },
                    ), ($) => r_unmarshalled_from_parse_tree.Text(
                        $,
                        abort,
                    )),
                }))])
                case "optional": return p_.change_context($['value'], ($) => ['optional', r_unmarshalled_from_parse_tree.Nothing(
                    $,
                    abort,
                )])
                case "optional value constraint": return ['optional value constraint', r_unmarshalled_from_parse_tree.Text($['value'], abort)]
                case "reference": return p_.change_context($['value'], ($) => ['reference', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                    $,
                    abort,
                    {
                        'expected properties': p_.literal.dictionary({
                        }),
                    },
                ), ($) => ({
                }))])
                case "reference constraint": return p_.change_context($['value'], ($) => ['reference constraint', p_.change_context(r_unmarshalled_from_parse_tree.State(
                    $,
                    abort,
                ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Resolver_Relative_Value_Selection.path.L.reference_constraint => {
                    switch ($text) {
                        case "selected": return ['selected', r_unmarshalled_from_parse_tree.Text($['value'], abort)]
                        default: return abort(
                            ['liana', {
                                'type': ['state', ['unknown option', $['option']['token']['value']]],
                                'range': $['option']['range'],
                            }],
                        )
                    }
                }))])
                case "state result": return p_.change_context($['value'], ($) => ['state result', Resolver_Type_Reference(
                    $,
                    abort,
                )])
                default: return abort(
                    ['liana', {
                        'type': ['state', ['unknown option', $['option']['token']['value']]],
                        'range': $['option']['range'],
                    }],
                )
            }
        }))),
    )),
}))

export const Resolver_Result_Selection: declarations.Resolver_Result_Selection = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.State(
    $,
    abort,
), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Resolver_Result_Selection => {
    switch ($text) {
        case "context": return p_.change_context($['value'], ($) => ['context', Resolver_Guaranteed_Value_Selection(
            $,
            abort,
        )])
        case "value": return p_.change_context($['value'], ($) => ['value', Resolver_Relative_Value_Selection(
            $,
            abort,
        )])
        default: return abort(
            ['liana', {
                'type': ['state', ['unknown option', $['option']['token']['value']]],
                'range': $['option']['range'],
            }],
        )
    }
}))

export const Resolver_Value_List_Result: declarations.Resolver_Value_List_Result = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
    $,
    abort,
    {
        'expected properties': p_.literal.dictionary({
            "type": null,
            "initial": null,
            "next": null,
        }),
    },
), ($) => ({
    'type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'type',
        },
    ), ($) => Resolver_Type_Reference(
        $,
        abort,
    )),
    'initial': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'initial',
        },
    ), ($) => Resolver_Guaranteed_Value_Selection(
        $,
        abort,
    )),
    'next': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'next',
        },
    ), ($) => Resolver_Result_Selection(
        $,
        abort,
    )),
}))

export const Resolver_Reference_Constraints: declarations.Resolver_Reference_Constraints = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
    $,
    abort,
), ($) => p_.from.dictionary($['entries']).map(
    ($, id) => Resolver_Value_Constraint(
        $,
        abort,
    ),
))

export const Resolver_Value: declarations.Resolver_Value = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.State(
    $,
    abort,
), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Resolver_Value => {
    switch ($text) {
        case "component": return p_.change_context($['value'], ($) => ['component', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            abort,
            {
                'expected properties': p_.literal.dictionary({
                    "location": null,
                    "arguments": null,
                    "constraints": null,
                }),
            },
        ), ($) => ({
            'location': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'location',
                },
            ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
                $,
                abort,
            ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Resolver_Value.component.location => {
                switch ($text) {
                    case "internal": return p_.change_context($['value'], ($) => ['internal', r_unmarshalled_from_parse_tree.Text(
                        $,
                        abort,
                    )])
                    case "child": return p_.change_context($['value'], ($) => ['child', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                        $,
                        abort,
                        {
                            'expected properties': p_.literal.dictionary({
                                "namespace": null,
                                "resolver": null,
                            }),
                        },
                    ), ($) => ({
                        'namespace': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            abort,
                            {
                                'id': 'namespace',
                            },
                        ), ($) => r_unmarshalled_from_parse_tree.Text(
                            $,
                            abort,
                        )),
                        'resolver': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            abort,
                            {
                                'id': 'resolver',
                            },
                        ), ($) => r_unmarshalled_from_parse_tree.Text(
                            $,
                            abort,
                        )),
                    }))])
                    default: return abort(
                        ['liana', {
                            'type': ['state', ['unknown option', $['option']['token']['value']]],
                            'range': $['option']['range'],
                        }],
                    )
                }
            }))),
            'arguments': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'arguments',
                },
            ), ($) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                $,
                abort,
            )['optional']).map(($) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                $,
                abort,
                {
                    'expected properties': p_.literal.dictionary({
                        "types": null,
                        "lookups": null,
                    }),
                },
            ), ($) => ({
                'types': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                    $,
                    abort,
                    {
                        'id': 'types',
                    },
                ), ($) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                    $,
                    abort,
                )['optional']).map(($) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
                    $,
                    abort,
                ), ($) => p_.from.dictionary($['entries']).map(
                    ($, id) => p_.change_context(r_unmarshalled_from_parse_tree.State(
                        $,
                        abort,
                    ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Resolver_Value.component.arguments_.O.types.O.D => {
                        switch ($text) {
                            case "optional": return p_.change_context($['value'], ($) => ['optional', Resolver_Optional_Value_Initialization(
                                $,
                                abort,
                            )])
                            case "required": return p_.change_context($['value'], ($) => ['required', Resolver_Guaranteed_Value_Selection(
                                $,
                                abort,
                            )])
                            case "parameter": return p_.change_context($['value'], ($) => ['parameter', r_unmarshalled_from_parse_tree.Text(
                                $,
                                abort,
                            )])
                            default: return abort(
                                ['liana', {
                                    'type': ['state', ['unknown option', $['option']['token']['value']]],
                                    'range': $['option']['range'],
                                }],
                            )
                        }
                    })),
                )))),
                'lookups': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                    $,
                    abort,
                    {
                        'id': 'lookups',
                    },
                ), ($) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                    $,
                    abort,
                )['optional']).map(($) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
                    $,
                    abort,
                ), ($) => p_.from.dictionary($['entries']).map(
                    ($, id) => p_.change_context(r_unmarshalled_from_parse_tree.State(
                        $,
                        abort,
                    ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Resolver_Value.component.arguments_.O.lookups.O.D => {
                        switch ($text) {
                            case "acyclic": return p_.change_context($['value'], ($) => ['acyclic', p_.change_context(r_unmarshalled_from_parse_tree.State(
                                $,
                                abort,
                            ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Resolver_Value.component.arguments_.O.lookups.O.D.acyclic => {
                                switch ($text) {
                                    case "not set": return p_.change_context($['value'], ($) => ['not set', r_unmarshalled_from_parse_tree.Nothing(
                                        $,
                                        abort,
                                    )])
                                    default: return abort(
                                        ['liana', {
                                            'type': ['state', ['unknown option', $['option']['token']['value']]],
                                            'range': $['option']['range'],
                                        }],
                                    )
                                }
                            }))])
                            case "cyclic": return p_.change_context($['value'], ($) => ['cyclic', p_.change_context(r_unmarshalled_from_parse_tree.State(
                                $,
                                abort,
                            ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Resolver_Value.component.arguments_.O.lookups.O.D.cyclic => {
                                switch ($text) {
                                    case "not set": return p_.change_context($['value'], ($) => ['not set', r_unmarshalled_from_parse_tree.Nothing(
                                        $,
                                        abort,
                                    )])
                                    default: return abort(
                                        ['liana', {
                                            'type': ['state', ['unknown option', $['option']['token']['value']]],
                                            'range': $['option']['range'],
                                        }],
                                    )
                                }
                            }))])
                            case "selection": return p_.change_context($['value'], ($) => ['selection', Resolver_Lookup_Selection(
                                $,
                                abort,
                            )])
                            default: return abort(
                                ['liana', {
                                    'type': ['state', ['unknown option', $['option']['token']['value']]],
                                    'range': $['option']['range'],
                                }],
                            )
                        }
                    })),
                )))),
            })))),
            'constraints': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'constraints',
                },
            ), ($) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                $,
                abort,
            )['optional']).map(($) => Resolver_Value_Constraints(
                $,
                abort,
            ))),
        }))])
        case "dictionary": return p_.change_context($['value'], ($) => ['dictionary', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            abort,
            {
                'expected properties': p_.literal.dictionary({
                    "resolver": null,
                    "benchmark": null,
                }),
            },
        ), ($) => ({
            'resolver': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'resolver',
                },
            ), ($) => Resolver_Value(
                $,
                abort,
            )),
            'benchmark': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'benchmark',
                },
            ), ($) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                $,
                abort,
            )['optional']).map(($) => Resolver_Benchmark(
                $,
                abort,
            ))),
        }))])
        case "group": return p_.change_context($['value'], ($) => ['group', Resolver_Value_Group(
            $,
            abort,
        )])
        case "list": return p_.change_context($['value'], ($) => ['list', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            abort,
            {
                'expected properties': p_.literal.dictionary({
                    "resolver": null,
                    "result": null,
                }),
            },
        ), ($) => ({
            'resolver': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'resolver',
                },
            ), ($) => Resolver_Value(
                $,
                abort,
            )),
            'result': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'result',
                },
            ), ($) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                $,
                abort,
            )['optional']).map(($) => Resolver_Value_List_Result(
                $,
                abort,
            ))),
        }))])
        case "nothing": return p_.change_context($['value'], ($) => ['nothing', r_unmarshalled_from_parse_tree.Nothing(
            $,
            abort,
        )])
        case "simple": return p_.change_context($['value'], ($) => ['simple', r_unmarshalled_from_parse_tree.Nothing(
            $,
            abort,
        )])
        case "optional": return p_.change_context($['value'], ($) => ['optional', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            abort,
            {
                'expected properties': p_.literal.dictionary({
                    "constraints": null,
                    "resolver": null,
                    "not set constraints": null,
                }),
            },
        ), ($) => ({
            'constraints': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'constraints',
                },
            ), ($) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                $,
                abort,
            )['optional']).map(($) => Resolver_Option_Constraints(
                $,
                abort,
            ))),
            'resolver': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'resolver',
                },
            ), ($) => Resolver_Value(
                $,
                abort,
            )),
            'not set constraints': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'not set constraints',
                },
            ), ($) => Resolver_Absence_Constraints(
                $,
                abort,
            )),
        }))])
        case "reference": return p_.change_context($['value'], ($) => ['reference', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            abort,
            {
                'expected properties': p_.literal.dictionary({
                    "type": null,
                }),
            },
        ), ($) => ({
            'type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'type',
                },
            ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
                $,
                abort,
            ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Resolver_Value.reference.type_ => {
                switch ($text) {
                    case "selected": return p_.change_context($['value'], ($) => ['selected', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                        $,
                        abort,
                        {
                            'expected properties': p_.literal.dictionary({
                                "lookup": null,
                                "constraints": null,
                            }),
                        },
                    ), ($) => ({
                        'lookup': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            abort,
                            {
                                'id': 'lookup',
                            },
                        ), ($) => Resolver_Lookup_Selection(
                            $,
                            abort,
                        )),
                        'constraints': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            abort,
                            {
                                'id': 'constraints',
                            },
                        ), ($) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                            $,
                            abort,
                        )['optional']).map(($) => Resolver_Reference_Constraints(
                            $,
                            abort,
                        ))),
                    }))])
                    default: return abort(
                        ['liana', {
                            'type': ['state', ['unknown option', $['option']['token']['value']]],
                            'range': $['option']['range'],
                        }],
                    )
                }
            }))),
        }))])
        case "state": return p_.change_context($['value'], ($) => ['state', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            abort,
            {
                'expected properties': p_.literal.dictionary({
                    "result": null,
                    "options": null,
                }),
            },
        ), ($) => ({
            'result': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'result',
                },
            ), ($) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                $,
                abort,
            )['optional']).map(($) => Resolver_Type_Reference(
                $,
                abort,
            ))),
            'options': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'options',
                },
            ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
                $,
                abort,
            ), ($) => p_.from.dictionary($['entries']).map(
                ($, id) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                    $,
                    abort,
                    {
                        'expected properties': p_.literal.dictionary({
                            "constraints": null,
                            "resolver": null,
                            "result": null,
                        }),
                    },
                ), ($) => ({
                    'constraints': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        abort,
                        {
                            'id': 'constraints',
                        },
                    ), ($) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                        $,
                        abort,
                    )['optional']).map(($) => Resolver_Option_Constraints(
                        $,
                        abort,
                    ))),
                    'resolver': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        abort,
                        {
                            'id': 'resolver',
                        },
                    ), ($) => Resolver_Value(
                        $,
                        abort,
                    )),
                    'result': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        abort,
                        {
                            'id': 'result',
                        },
                    ), ($) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                        $,
                        abort,
                    )['optional']).map(($) => Resolver_Result_Selection(
                        $,
                        abort,
                    ))),
                })),
            ))),
        }))])
        default: return abort(
            ['liana', {
                'type': ['state', ['unknown option', $['option']['token']['value']]],
                'range': $['option']['range'],
            }],
        )
    }
}))

export const Resolver_Possible_Value_Selection: declarations.Resolver_Possible_Value_Selection = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.State(
    $,
    abort,
), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Resolver_Possible_Value_Selection => {
    switch ($text) {
        case "optional value": return p_.change_context($['value'], ($) => ['optional value', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            abort,
            {
                'expected properties': p_.literal.dictionary({
                    "selection": null,
                }),
            },
        ), ($) => ({
            'selection': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'selection',
                },
            ), ($) => Resolver_Guaranteed_Value_Selection(
                $,
                abort,
            )),
        }))])
        case "parameter": return p_.change_context($['value'], ($) => ['parameter', r_unmarshalled_from_parse_tree.Text(
            $,
            abort,
        )])
        case "result": return p_.change_context($['value'], ($) => ['result', p_.change_context(r_unmarshalled_from_parse_tree.State(
            $,
            abort,
        ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Resolver_Possible_Value_Selection.result => {
            switch ($text) {
                case "state": return p_.change_context($['value'], ($) => ['state', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                    $,
                    abort,
                    {
                        'expected properties': p_.literal.dictionary({
                            "property": null,
                            "result": null,
                        }),
                    },
                ), ($) => ({
                    'property': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        abort,
                        {
                            'id': 'property',
                        },
                    ), ($) => r_unmarshalled_from_parse_tree.Text(
                        $,
                        abort,
                    )),
                    'result': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        abort,
                        {
                            'id': 'result',
                        },
                    ), ($) => Resolver_Type_Reference(
                        $,
                        abort,
                    )),
                }))])
                case "optional value": return p_.change_context($['value'], ($) => ['optional value', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                    $,
                    abort,
                    {
                        'expected properties': p_.literal.dictionary({
                            "property": null,
                            "result": null,
                        }),
                    },
                ), ($) => ({
                    'property': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        abort,
                        {
                            'id': 'property',
                        },
                    ), ($) => r_unmarshalled_from_parse_tree.Text(
                        $,
                        abort,
                    )),
                    'result': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        abort,
                        {
                            'id': 'result',
                        },
                    ), ($) => Resolver_Type_Reference(
                        $,
                        abort,
                    )),
                }))])
                default: return abort(
                    ['liana', {
                        'type': ['state', ['unknown option', $['option']['token']['value']]],
                        'range': $['option']['range'],
                    }],
                )
            }
        }))])
        default: return abort(
            ['liana', {
                'type': ['state', ['unknown option', $['option']['token']['value']]],
                'range': $['option']['range'],
            }],
        )
    }
}))

export const Resolver_Option_Constraints: declarations.Resolver_Option_Constraints = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
    $,
    abort,
), ($) => p_.from.dictionary($['entries']).map(
    ($, id) => p_.change_context(r_unmarshalled_from_parse_tree.State(
        $,
        abort,
    ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Resolver_Option_Constraints.D => {
        switch ($text) {
            case "state": return p_.change_context($['value'], ($) => ['state', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                $,
                abort,
                {
                    'expected properties': p_.literal.dictionary({
                        "selection": null,
                        "option": null,
                    }),
                },
            ), ($) => ({
                'selection': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                    $,
                    abort,
                    {
                        'id': 'selection',
                    },
                ), ($) => Resolver_Guaranteed_Value_Selection(
                    $,
                    abort,
                )),
                'option': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                    $,
                    abort,
                    {
                        'id': 'option',
                    },
                ), ($) => r_unmarshalled_from_parse_tree.Text(
                    $,
                    abort,
                )),
            }))])
            case "assert is set": return p_.change_context($['value'], ($) => ['assert is set', Resolver_Possible_Value_Selection(
                $,
                abort,
            )])
            default: return abort(
                ['liana', {
                    'type': ['state', ['unknown option', $['option']['token']['value']]],
                    'range': $['option']['range'],
                }],
            )
        }
    })),
))

export const Resolver_Guaranteed_Value_Selection: declarations.Resolver_Guaranteed_Value_Selection = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
    $,
    abort,
    {
        'expected properties': p_.literal.dictionary({
            "start": null,
            "tail": null,
        }),
    },
), ($) => ({
    'start': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'start',
        },
    ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
        $,
        abort,
    ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Resolver_Guaranteed_Value_Selection.start => {
        switch ($text) {
            case "sibling": return p_.change_context($['value'], ($) => ['sibling', r_unmarshalled_from_parse_tree.Text(
                $,
                abort,
            )])
            case "parent sibling": return p_.change_context($['value'], ($) => ['parent sibling', r_unmarshalled_from_parse_tree.Text(
                $,
                abort,
            )])
            case "option constraint": return p_.change_context($['value'], ($) => ['option constraint', r_unmarshalled_from_parse_tree.Text(
                $,
                abort,
            )])
            case "list cursor": return p_.change_context($['value'], ($) => ['list cursor', r_unmarshalled_from_parse_tree.Nothing(
                $,
                abort,
            )])
            case "linked entry": return p_.change_context($['value'], ($) => ['linked entry', r_unmarshalled_from_parse_tree.Nothing(
                $,
                abort,
            )])
            case "constraint": return p_.change_context($['value'], ($) => ['constraint', p_.change_context(r_unmarshalled_from_parse_tree.State(
                $,
                abort,
            ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Resolver_Guaranteed_Value_Selection.start.constraint => {
                switch ($text) {
                    case "component": return p_.change_context($['value'], ($) => ['component', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                        $,
                        abort,
                        {
                            'expected properties': p_.literal.dictionary({
                                "property": null,
                                "constraint": null,
                            }),
                        },
                    ), ($) => ({
                        'property': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            abort,
                            {
                                'id': 'property',
                            },
                        ), ($) => r_unmarshalled_from_parse_tree.Text(
                            $,
                            abort,
                        )),
                        'constraint': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            abort,
                            {
                                'id': 'constraint',
                            },
                        ), ($) => r_unmarshalled_from_parse_tree.Text(
                            $,
                            abort,
                        )),
                    }))])
                    case "reference": return p_.change_context($['value'], ($) => ['reference', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                        $,
                        abort,
                        {
                            'expected properties': p_.literal.dictionary({
                                "property": null,
                                "constraint": null,
                            }),
                        },
                    ), ($) => ({
                        'property': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            abort,
                            {
                                'id': 'property',
                            },
                        ), ($) => r_unmarshalled_from_parse_tree.Text(
                            $,
                            abort,
                        )),
                        'constraint': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            abort,
                            {
                                'id': 'constraint',
                            },
                        ), ($) => r_unmarshalled_from_parse_tree.Text(
                            $,
                            abort,
                        )),
                    }))])
                    default: return abort(
                        ['liana', {
                            'type': ['state', ['unknown option', $['option']['token']['value']]],
                            'range': $['option']['range'],
                        }],
                    )
                }
            }))])
            case "parameter": return p_.change_context($['value'], ($) => ['parameter', r_unmarshalled_from_parse_tree.Text(
                $,
                abort,
            )])
            case "result": return p_.change_context($['value'], ($) => ['result', p_.change_context(r_unmarshalled_from_parse_tree.State(
                $,
                abort,
            ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Resolver_Guaranteed_Value_Selection.start.result => {
                switch ($text) {
                    case "list": return p_.change_context($['value'], ($) => ['list', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                        $,
                        abort,
                        {
                            'expected properties': p_.literal.dictionary({
                                "property": null,
                            }),
                        },
                    ), ($) => ({
                        'property': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            abort,
                            {
                                'id': 'property',
                            },
                        ), ($) => r_unmarshalled_from_parse_tree.Text(
                            $,
                            abort,
                        )),
                    }))])
                    case "state": return p_.change_context($['value'], ($) => ['state', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                        $,
                        abort,
                        {
                            'expected properties': p_.literal.dictionary({
                                "property": null,
                                "result": null,
                            }),
                        },
                    ), ($) => ({
                        'property': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            abort,
                            {
                                'id': 'property',
                            },
                        ), ($) => r_unmarshalled_from_parse_tree.Text(
                            $,
                            abort,
                        )),
                        'result': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            abort,
                            {
                                'id': 'result',
                            },
                        ), ($) => Resolver_Type_Reference(
                            $,
                            abort,
                        )),
                    }))])
                    case "optional value": return p_.change_context($['value'], ($) => ['optional value', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                        $,
                        abort,
                        {
                            'expected properties': p_.literal.dictionary({
                                "property": null,
                                "result": null,
                            }),
                        },
                    ), ($) => ({
                        'property': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            abort,
                            {
                                'id': 'property',
                            },
                        ), ($) => r_unmarshalled_from_parse_tree.Text(
                            $,
                            abort,
                        )),
                        'result': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            abort,
                            {
                                'id': 'result',
                            },
                        ), ($) => Resolver_Type_Reference(
                            $,
                            abort,
                        )),
                    }))])
                    default: return abort(
                        ['liana', {
                            'type': ['state', ['unknown option', $['option']['token']['value']]],
                            'range': $['option']['range'],
                        }],
                    )
                }
            }))])
            default: return abort(
                ['liana', {
                    'type': ['state', ['unknown option', $['option']['token']['value']]],
                    'range': $['option']['range'],
                }],
            )
        }
    }))),
    'tail': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'tail',
        },
    ), ($) => Resolver_Relative_Value_Selection(
        $,
        abort,
    )),
}))

export const Resolver_Benchmark: declarations.Resolver_Benchmark = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
    $,
    abort,
    {
        'expected properties': p_.literal.dictionary({
            "selection": null,
            "coverage": null,
        }),
    },
), ($) => ({
    'selection': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'selection',
        },
    ), ($) => Resolver_Guaranteed_Value_Selection(
        $,
        abort,
    )),
    'coverage': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'coverage',
        },
    ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
        $,
        abort,
    ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Resolver_Benchmark.coverage => {
        switch ($text) {
            case "dense": return p_.change_context($['value'], ($) => ['dense', r_unmarshalled_from_parse_tree.Nothing(
                $,
                abort,
            )])
            case "sparse": return p_.change_context($['value'], ($) => ['sparse', r_unmarshalled_from_parse_tree.Nothing(
                $,
                abort,
            )])
            default: return abort(
                ['liana', {
                    'type': ['state', ['unknown option', $['option']['token']['value']]],
                    'range': $['option']['range'],
                }],
            )
        }
    }))),
}))

export const Resolver_Constraint: declarations.Resolver_Constraint = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
    $,
    abort,
    {
        'expected properties': p_.literal.dictionary({
            "selection": null,
            "type": null,
        }),
    },
), ($) => ({
    'selection': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'selection',
        },
    ), ($) => Resolver_Relative_Value_Selection(
        $,
        abort,
    )),
    'type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'type',
        },
    ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
        $,
        abort,
    ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Resolver_Constraint.type_ => {
        switch ($text) {
            case "state": return p_.change_context($['value'], ($) => ['state', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                $,
                abort,
                {
                    'expected properties': p_.literal.dictionary({
                        "option": null,
                    }),
                },
            ), ($) => ({
                'option': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                    $,
                    abort,
                    {
                        'id': 'option',
                    },
                ), ($) => r_unmarshalled_from_parse_tree.Text(
                    $,
                    abort,
                )),
            }))])
            case "optional value": return p_.change_context($['value'], ($) => ['optional value', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                $,
                abort,
                {
                    'expected properties': p_.literal.dictionary({
                    }),
                },
            ), ($) => ({
            }))])
            default: return abort(
                ['liana', {
                    'type': ['state', ['unknown option', $['option']['token']['value']]],
                    'range': $['option']['range'],
                }],
            )
        }
    }))),
}))

export const Resolver_Lookup_Selection: declarations.Resolver_Lookup_Selection = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
    $,
    abort,
    {
        'expected properties': p_.literal.dictionary({
            "type": null,
        }),
    },
), ($) => ({
    'type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'type',
        },
    ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
        $,
        abort,
    ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Resolver_Lookup_Selection.type_ => {
        switch ($text) {
            case "acyclic": return p_.change_context($['value'], ($) => ['acyclic', p_.change_context(r_unmarshalled_from_parse_tree.State(
                $,
                abort,
            ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Resolver_Lookup_Selection.type_.acyclic => {
                switch ($text) {
                    case "siblings": return p_.change_context($['value'], ($) => ['siblings', r_unmarshalled_from_parse_tree.Nothing(
                        $,
                        abort,
                    )])
                    case "resolved dictionary": return p_.change_context($['value'], ($) => ['resolved dictionary', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                        $,
                        abort,
                        {
                            'expected properties': p_.literal.dictionary({
                                "selection": null,
                            }),
                        },
                    ), ($) => ({
                        'selection': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            abort,
                            {
                                'id': 'selection',
                            },
                        ), ($) => Resolver_Guaranteed_Value_Selection(
                            $,
                            abort,
                        )),
                    }))])
                    default: return abort(
                        ['liana', {
                            'type': ['state', ['unknown option', $['option']['token']['value']]],
                            'range': $['option']['range'],
                        }],
                    )
                }
            }))])
            case "cyclic": return p_.change_context($['value'], ($) => ['cyclic', p_.change_context(r_unmarshalled_from_parse_tree.State(
                $,
                abort,
            ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Resolver_Lookup_Selection.type_.cyclic => {
                switch ($text) {
                    case "siblings": return p_.change_context($['value'], ($) => ['siblings', r_unmarshalled_from_parse_tree.Nothing(
                        $,
                        abort,
                    )])
                    default: return abort(
                        ['liana', {
                            'type': ['state', ['unknown option', $['option']['token']['value']]],
                            'range': $['option']['range'],
                        }],
                    )
                }
            }))])
            case "parameter": return p_.change_context($['value'], ($) => ['parameter', r_unmarshalled_from_parse_tree.Text(
                $,
                abort,
            )])
            default: return abort(
                ['liana', {
                    'type': ['state', ['unknown option', $['option']['token']['value']]],
                    'range': $['option']['range'],
                }],
            )
        }
    }))),
}))

export const Resolver_Option_Constraint_Source: declarations.Resolver_Option_Constraint_Source = ($, abort) => r_unmarshalled_from_parse_tree.Nothing(
    $,
    abort,
)

export const Resolver_Optional_Value_Constraints: declarations.Resolver_Optional_Value_Constraints = ($, abort) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
    $,
    abort,
)['optional']).map(($) => Resolver_Value_Constraints(
    $,
    abort,
))

export const Resolver_Optional_Value_Initialization: declarations.Resolver_Optional_Value_Initialization = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.State(
    $,
    abort,
), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Resolver_Optional_Value_Initialization => {
    switch ($text) {
        case "not set": return p_.change_context($['value'], ($) => ['not set', r_unmarshalled_from_parse_tree.Nothing(
            $,
            abort,
        )])
        case "set": return p_.change_context($['value'], ($) => ['set', Resolver_Guaranteed_Value_Selection(
            $,
            abort,
        )])
        case "selection": return p_.change_context($['value'], ($) => ['selection', Resolver_Possible_Value_Selection(
            $,
            abort,
        )])
        default: return abort(
            ['liana', {
                'type': ['state', ['unknown option', $['option']['token']['value']]],
                'range': $['option']['range'],
            }],
        )
    }
}))

export const Resolver_Reference_Constraint_Source: declarations.Resolver_Reference_Constraint_Source = ($, abort) => r_unmarshalled_from_parse_tree.Nothing(
    $,
    abort,
)

export const Resolver_Reference_To_Value_Constraint: declarations.Resolver_Reference_To_Value_Constraint = ($, abort) => r_unmarshalled_from_parse_tree.Text(
    $,
    abort,
)

export const Resolver_Types: declarations.Resolver_Types = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
    $,
    abort,
), ($) => p_.from.dictionary($['entries']).map(
    ($, id) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
        $,
        abort,
        {
            'expected properties': p_.literal.dictionary({
                "root value resolver": null,
            }),
        },
    ), ($) => ({
        'root value resolver': p_.change_context(r_unmarshalled_from_parse_tree.Property(
            $,
            abort,
            {
                'id': 'root value resolver',
            },
        ), ($) => Resolver_Value(
            $,
            abort,
        )),
    })),
))

export const Resolver_Value_Constraint: declarations.Resolver_Value_Constraint = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
    $,
    abort,
    {
        'expected properties': p_.literal.dictionary({
            "start": null,
            "constraint": null,
        }),
    },
), ($) => ({
    'start': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'start',
        },
    ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
        $,
        abort,
    ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Resolver_Value_Constraint.start => {
        switch ($text) {
            case "value": return p_.change_context($['value'], ($) => ['value', r_unmarshalled_from_parse_tree.Nothing(
                $,
                abort,
            )])
            case "sibling": return p_.change_context($['value'], ($) => ['sibling', Resolver_Reference_To_Value_Constraint(
                $,
                abort,
            )])
            default: return abort(
                ['liana', {
                    'type': ['state', ['unknown option', $['option']['token']['value']]],
                    'range': $['option']['range'],
                }],
            )
        }
    }))),
    'constraint': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'constraint',
        },
    ), ($) => Resolver_Constraint(
        $,
        abort,
    )),
}))

export const Schema: declarations.Schema = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
    $,
    abort,
    {
        'expected properties': p_.literal.dictionary({
            "structure": null,
            "resolver": null,
        }),
    },
), ($) => ({
    'structure': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'structure',
        },
    ), ($) => Structure(
        $,
        abort,
    )),
    'resolver': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'resolver',
        },
    ), ($) => Resolver(
        $,
        abort,
    )),
}))

export const Type_Specification: declarations.Type_Specification = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
    $,
    abort,
    {
        'expected properties': p_.literal.dictionary({
            "file extension": null,
            "schema": null,
            "root type": null,
        }),
    },
), ($) => ({
    'file extension': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'file extension',
        },
    ), ($) => r_unmarshalled_from_parse_tree.Text(
        $,
        abort,
    )),
    'schema': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'schema',
        },
    ), ($) => Schema(
        $,
        abort,
    )),
    'root type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'root type',
        },
    ), ($) => r_unmarshalled_from_parse_tree.Text(
        $,
        abort,
    )),
}))
