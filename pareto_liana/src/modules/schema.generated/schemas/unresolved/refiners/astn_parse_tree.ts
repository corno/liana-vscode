import * as p_ from 'pareto-core/refiner'

// schemas
import * as s_target from "../schema.js"
import * as s_source from "astn-runtime/modules/deserialization/schemas/parse_tree/schema"
import * as s_error from "liana-runtime/modules/value_unmarshalling/schemas/unmarshalling/schema"

// refiner dependencies
import * as r_unmarshalled_from_parse_tree from "liana-runtime/modules/value_unmarshalling/schemas/unmarshalled_value/refiners/astn_parse_tree"

export namespace declarations {
    
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
    
    export type Presence = p_.Refiner<
        s_target.Presence,
        s_error.Error,
        s_source.Value
    >
    
    export type Resolver_Value_Group = p_.Refiner<
        s_target.Resolver_Value_Group,
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
    
    export type Resolver_Value_Constraints = p_.Refiner<
        s_target.Resolver_Value_Constraints,
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
    
    export type Resolver_Reference_To_Value_Constraint = p_.Refiner<
        s_target.Resolver_Reference_To_Value_Constraint,
        s_error.Error,
        s_source.Value
    >
    
    export type Resolver_Signature = p_.Refiner<
        s_target.Resolver_Signature,
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
    
    export type Value_Results = p_.Refiner<
        s_target.Value_Results,
        s_error.Error,
        s_source.Value
    >
}

// implementations

export const Basic_Type: declarations.Basic_Type = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
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
    ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Basic_Type.type_ => {
        switch ($text) {
            case "boolean": return p_.change_context($['value'], ($) => ['boolean', r_unmarshalled_from_parse_tree.Nothing(
                $,
                abort,
            )])
            case "date": return p_.change_context($['value'], ($) => ['date', r_unmarshalled_from_parse_tree.Nothing(
                $,
                abort,
            )])
            case "number": return p_.change_context($['value'], ($) => ['number', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                $,
                abort,
                {
                    'expected properties': p_.literal.dictionary({
                        "precision": null,
                    }),
                },
            ), ($) => ({
                'precision': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                    $,
                    abort,
                    {
                        'id': 'precision',
                    },
                ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
                    $,
                    abort,
                ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Basic_Type.type_.number_.precision => {
                    switch ($text) {
                        case "approximation": return p_.change_context($['value'], ($) => ['approximation', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                            $,
                            abort,
                            {
                                'expected properties': p_.literal.dictionary({
                                    "significant digits": null,
                                }),
                            },
                        ), ($) => ({
                            'significant digits': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                                $,
                                abort,
                                {
                                    'id': 'significant digits',
                                },
                            ), ($) => r_unmarshalled_from_parse_tree.Number(
                                $,
                                abort,
                                {
                                    'type': ['decimal', null],
                                },
                            )),
                        }))])
                        case "exact": return p_.change_context($['value'], ($) => ['exact', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                            $,
                            abort,
                            {
                                'expected properties': p_.literal.dictionary({
                                    "number of fractional digits": null,
                                    "type": null,
                                }),
                            },
                        ), ($) => ({
                            'number of fractional digits': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                                $,
                                abort,
                                {
                                    'id': 'number of fractional digits',
                                },
                            ), ($) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                                $,
                                abort,
                            )['optional']).map(($) => r_unmarshalled_from_parse_tree.Number(
                                $,
                                abort,
                                {
                                    'type': ['decimal', null],
                                },
                            ))),
                            'type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                                $,
                                abort,
                                {
                                    'id': 'type',
                                },
                            ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
                                $,
                                abort,
                            ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Basic_Type.type_.number_.precision.exact.type_ => {
                                switch ($text) {
                                    case "integer": return p_.change_context($['value'], ($) => ['integer', r_unmarshalled_from_parse_tree.Nothing(
                                        $,
                                        abort,
                                    )])
                                    case "natural": return p_.change_context($['value'], ($) => ['natural', r_unmarshalled_from_parse_tree.Nothing(
                                        $,
                                        abort,
                                    )])
                                    case "positive natural": return p_.change_context($['value'], ($) => ['positive natural', r_unmarshalled_from_parse_tree.Nothing(
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
                }))),
            }))])
            case "text": return p_.change_context($['value'], ($) => ['text', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                $,
                abort,
                {
                    'expected properties': p_.literal.dictionary({
                        "type": null,
                        "link": null,
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
                ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Basic_Type.type_.text.type_ => {
                    switch ($text) {
                        case "multi line": return p_.change_context($['value'], ($) => ['multi line', r_unmarshalled_from_parse_tree.Nothing(
                            $,
                            abort,
                        )])
                        case "single line": return p_.change_context($['value'], ($) => ['single line', r_unmarshalled_from_parse_tree.Nothing(
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
                'link': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                    $,
                    abort,
                    {
                        'id': 'link',
                    },
                ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
                    $,
                    abort,
                ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Basic_Type.type_.text.link => {
                    switch ($text) {
                        case "no": return p_.change_context($['value'], ($) => ['no', r_unmarshalled_from_parse_tree.Nothing(
                            $,
                            abort,
                        )])
                        case "yes": return p_.change_context($['value'], ($) => ['yes', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                            $,
                            abort,
                            {
                                'expected properties': p_.literal.dictionary({
                                    "path prefix": null,
                                    "path suffix": null,
                                }),
                            },
                        ), ($) => ({
                            'path prefix': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                                $,
                                abort,
                                {
                                    'id': 'path prefix',
                                },
                            ), ($) => r_unmarshalled_from_parse_tree.Text(
                                $,
                                abort,
                            )),
                            'path suffix': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                                $,
                                abort,
                                {
                                    'id': 'path suffix',
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
            default: return abort(
                ['liana', {
                    'type': ['state', ['unknown option', $['option']['token']['value']]],
                    'range': $['option']['range'],
                }],
            )
        }
    }))),
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
                    "results": null,
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
                    case "internal acyclic": return p_.change_context($['value'], ($) => ['internal acyclic', r_unmarshalled_from_parse_tree.Text(
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
            'results': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'results',
                },
            ), ($) => Value_Results(
                $,
                abort,
            )),
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
                    "results": null,
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
            'results': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'results',
                },
            ), ($) => Value_Results(
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
        case "optional": return p_.change_context($['value'], ($) => ['optional', Value(
            $,
            abort,
        )])
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
                    case "derived": return p_.change_context($['value'], ($) => ['derived', r_unmarshalled_from_parse_tree.Nothing(
                        $,
                        abort,
                    )])
                    case "selected": return p_.change_context($['value'], ($) => ['selected', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                        $,
                        abort,
                        {
                            'expected properties': p_.literal.dictionary({
                                "dictionary": null,
                                "dependency": null,
                                "results": null,
                            }),
                        },
                    ), ($) => ({
                        'dictionary': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            abort,
                            {
                                'id': 'dictionary',
                            },
                        ), ($) => r_unmarshalled_from_parse_tree.Nothing(
                            $,
                            abort,
                        )),
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
                        'results': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            abort,
                            {
                                'id': 'results',
                            },
                        ), ($) => Value_Results(
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
                    "results": null,
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
                            "constraints": null,
                            "description": null,
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
            ))),
            'results': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'results',
                },
            ), ($) => Value_Results(
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
            "resulting type": null,
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
            default: return abort(
                ['liana', {
                    'type': ['state', ['unknown option', $['option']['token']['value']]],
                    'range': $['option']['range'],
                }],
            )
        }
    }))),
    'resulting type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'resulting type',
        },
    ), ($) => r_unmarshalled_from_parse_tree.Nothing(
        $,
        abort,
    )),
}))

export const Value_Path: declarations.Value_Path = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
    $,
    abort,
    {
        'expected properties': p_.literal.dictionary({
            "tail": null,
            "resulting node": null,
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
    'resulting node': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'resulting node',
        },
    ), ($) => r_unmarshalled_from_parse_tree.Nothing(
        $,
        abort,
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

export const Resolver_Value_Group: declarations.Resolver_Value_Group = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
    $,
    abort,
), ($) => p_.from.dictionary($['entries']).map(
    ($, id) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
        $,
        abort,
        {
            'expected properties': p_.literal.dictionary({
                "definition": null,
                "resolver": null,
            }),
        },
    ), ($) => ({
        'definition': p_.change_context(r_unmarshalled_from_parse_tree.Property(
            $,
            abort,
            {
                'id': 'definition',
            },
        ), ($) => r_unmarshalled_from_parse_tree.Nothing(
            $,
            abort,
        )),
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
            ), ($) => Type_Reference(
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
                    "dictionary": null,
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
            ), ($) => Type_Reference(
                $,
                abort,
            )),
            'dictionary': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'dictionary',
                },
            ), ($) => r_unmarshalled_from_parse_tree.Nothing(
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

export const Resolver_Value_Constraints: declarations.Resolver_Value_Constraints = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
    $,
    abort,
), ($) => p_.from.dictionary($['entries']).map(
    ($, id) => Resolver_Value_Constraint(
        $,
        abort,
    ),
))

export const Resolver_Relative_Value_Selection: declarations.Resolver_Relative_Value_Selection = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
    $,
    abort,
    {
        'expected properties': p_.literal.dictionary({
            "path": null,
            "resulting node": null,
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
                case "component": return p_.change_context($['value'], ($) => ['component', r_unmarshalled_from_parse_tree.Nothing(
                    $,
                    abort,
                )])
                case "group": return p_.change_context($['value'], ($) => ['group', r_unmarshalled_from_parse_tree.Text(
                    $,
                    abort,
                )])
                case "reference": return p_.change_context($['value'], ($) => ['reference', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                    $,
                    abort,
                    {
                        'expected properties': p_.literal.dictionary({
                            "definition": null,
                        }),
                    },
                ), ($) => ({
                    'definition': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        abort,
                        {
                            'id': 'definition',
                        },
                    ), ($) => r_unmarshalled_from_parse_tree.Nothing(
                        $,
                        abort,
                    )),
                }))])
                case "state result": return p_.change_context($['value'], ($) => ['state result', Type_Reference(
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
    'resulting node': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'resulting node',
        },
    ), ($) => r_unmarshalled_from_parse_tree.Nothing(
        $,
        abort,
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
    ), ($) => Type_Reference(
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
                    "definition": null,
                    "location": null,
                    "signature": null,
                    "arguments": null,
                    "constraints": null,
                }),
            },
        ), ($) => ({
            'definition': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'definition',
                },
            ), ($) => r_unmarshalled_from_parse_tree.Nothing(
                $,
                abort,
            )),
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
                    default: return abort(
                        ['liana', {
                            'type': ['state', ['unknown option', $['option']['token']['value']]],
                            'range': $['option']['range'],
                        }],
                    )
                }
            }))),
            'signature': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'signature',
                },
            ), ($) => r_unmarshalled_from_parse_tree.Nothing(
                $,
                abort,
            )),
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
            ), ($) => Resolver_Value_Constraints(
                $,
                abort,
            )),
        }))])
        case "dictionary": return p_.change_context($['value'], ($) => ['dictionary', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            abort,
            {
                'expected properties': p_.literal.dictionary({
                    "definition": null,
                    "resolver": null,
                    "benchmark": null,
                }),
            },
        ), ($) => ({
            'definition': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'definition',
                },
            ), ($) => r_unmarshalled_from_parse_tree.Nothing(
                $,
                abort,
            )),
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
                    "definition": null,
                    "resolver": null,
                    "result": null,
                }),
            },
        ), ($) => ({
            'definition': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'definition',
                },
            ), ($) => r_unmarshalled_from_parse_tree.Nothing(
                $,
                abort,
            )),
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
                }),
            },
        ), ($) => ({
            'constraints': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'constraints',
                },
            ), ($) => Resolver_Option_Constraints(
                $,
                abort,
            )),
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
        }))])
        case "reference": return p_.change_context($['value'], ($) => ['reference', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            abort,
            {
                'expected properties': p_.literal.dictionary({
                    "definition": null,
                    "type": null,
                }),
            },
        ), ($) => ({
            'definition': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'definition',
                },
            ), ($) => r_unmarshalled_from_parse_tree.Nothing(
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
            ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.Resolver_Value.reference.type_ => {
                switch ($text) {
                    case "derived": return p_.change_context($['value'], ($) => ['derived', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
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
                        ), ($) => Resolver_Guaranteed_Value_Selection(
                            $,
                            abort,
                        )),
                    }))])
                    case "selected": return p_.change_context($['value'], ($) => ['selected', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                        $,
                        abort,
                        {
                            'expected properties': p_.literal.dictionary({
                                "definition": null,
                                "lookup": null,
                                "constraints": null,
                            }),
                        },
                    ), ($) => ({
                        'definition': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            abort,
                            {
                                'id': 'definition',
                            },
                        ), ($) => r_unmarshalled_from_parse_tree.Nothing(
                            $,
                            abort,
                        )),
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
                        ), ($) => Resolver_Value_Constraints(
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
                    "definition": null,
                    "result": null,
                    "options": null,
                }),
            },
        ), ($) => ({
            'definition': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'definition',
                },
            ), ($) => r_unmarshalled_from_parse_tree.Nothing(
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
            )['optional']).map(($) => Type_Reference(
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
                    ), ($) => Resolver_Option_Constraints(
                        $,
                        abort,
                    )),
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
                            "state": null,
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
                    'state': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        abort,
                        {
                            'id': 'state',
                        },
                    ), ($) => r_unmarshalled_from_parse_tree.Nothing(
                        $,
                        abort,
                    )),
                    'result': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        abort,
                        {
                            'id': 'result',
                        },
                    ), ($) => Type_Reference(
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
                            "optional value": null,
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
                    'optional value': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        abort,
                        {
                            'id': 'optional value',
                        },
                    ), ($) => r_unmarshalled_from_parse_tree.Nothing(
                        $,
                        abort,
                    )),
                    'result': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        abort,
                        {
                            'id': 'result',
                        },
                    ), ($) => Type_Reference(
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
                        "selected state": null,
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
                'selected state': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                    $,
                    abort,
                    {
                        'id': 'selected state',
                    },
                ), ($) => r_unmarshalled_from_parse_tree.Nothing(
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
            "resulting node": null,
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
                                "list result": null,
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
                        'list result': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            abort,
                            {
                                'id': 'list result',
                            },
                        ), ($) => r_unmarshalled_from_parse_tree.Nothing(
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
                                "state": null,
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
                        'state': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            abort,
                            {
                                'id': 'state',
                            },
                        ), ($) => r_unmarshalled_from_parse_tree.Nothing(
                            $,
                            abort,
                        )),
                        'result': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            abort,
                            {
                                'id': 'result',
                            },
                        ), ($) => Type_Reference(
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
                                "optional value": null,
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
                        'optional value': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            abort,
                            {
                                'id': 'optional value',
                            },
                        ), ($) => r_unmarshalled_from_parse_tree.Nothing(
                            $,
                            abort,
                        )),
                        'result': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            abort,
                            {
                                'id': 'result',
                            },
                        ), ($) => Type_Reference(
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
    'resulting node': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'resulting node',
        },
    ), ($) => r_unmarshalled_from_parse_tree.Nothing(
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
            "resulting dictionary": null,
            "dense": null,
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
    'resulting dictionary': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'resulting dictionary',
        },
    ), ($) => r_unmarshalled_from_parse_tree.Nothing(
        $,
        abort,
    )),
    'dense': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'dense',
        },
    ), ($) => r_unmarshalled_from_parse_tree.Boolean(
        $,
        abort,
        {
            'type': ['true/false', null],
        },
    )),
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
                        "selected state": null,
                        "option": null,
                    }),
                },
            ), ($) => ({
                'selected state': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                    $,
                    abort,
                    {
                        'id': 'selected state',
                    },
                ), ($) => r_unmarshalled_from_parse_tree.Nothing(
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
            case "optional value": return p_.change_context($['value'], ($) => ['optional value', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                $,
                abort,
                {
                    'expected properties': p_.literal.dictionary({
                        "selected optional value": null,
                    }),
                },
            ), ($) => ({
                'selected optional value': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                    $,
                    abort,
                    {
                        'id': 'selected optional value',
                    },
                ), ($) => r_unmarshalled_from_parse_tree.Nothing(
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

export const Resolver_Lookup_Selection: declarations.Resolver_Lookup_Selection = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
    $,
    abort,
    {
        'expected properties': p_.literal.dictionary({
            "type": null,
            "resulting dictionary": null,
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
                                "selected dictionary": null,
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
                        'selected dictionary': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            abort,
                            {
                                'id': 'selected dictionary',
                            },
                        ), ($) => r_unmarshalled_from_parse_tree.Nothing(
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
    'resulting dictionary': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'resulting dictionary',
        },
    ), ($) => r_unmarshalled_from_parse_tree.Nothing(
        $,
        abort,
    )),
}))

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

export const Resolver_Reference_To_Value_Constraint: declarations.Resolver_Reference_To_Value_Constraint = ($, abort) => r_unmarshalled_from_parse_tree.Text(
    $,
    abort,
)

export const Resolver_Signature: declarations.Resolver_Signature = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
    $,
    abort,
    {
        'expected properties': p_.literal.dictionary({
            "type": null,
            "parameters": null,
            "resolved parameters": null,
        }),
    },
), ($) => ({
    'type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'type',
        },
    ), ($) => r_unmarshalled_from_parse_tree.Nothing(
        $,
        abort,
    )),
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
    'resolved parameters': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'resolved parameters',
        },
    ), ($) => r_unmarshalled_from_parse_tree.Nothing(
        $,
        abort,
    )),
}))

export const Resolver_Types: declarations.Resolver_Types = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
    $,
    abort,
), ($) => p_.from.dictionary($['entries']).map(
    ($, id) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
        $,
        abort,
        {
            'expected properties': p_.literal.dictionary({
                "signature": null,
                "root value resolver": null,
            }),
        },
    ), ($) => ({
        'signature': p_.change_context(r_unmarshalled_from_parse_tree.Property(
            $,
            abort,
            {
                'id': 'signature',
            },
        ), ($) => r_unmarshalled_from_parse_tree.Nothing(
            $,
            abort,
        )),
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
            "basic types": null,
            "types": null,
            "signatures": null,
            "resolvers": null,
        }),
    },
), ($) => ({
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
    'resolvers': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        abort,
        {
            'id': 'resolvers',
        },
    ), ($) => Resolver_Types(
        $,
        abort,
    )),
}))

export const Type_Specification: declarations.Type_Specification = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
    $,
    abort,
    {
        'expected properties': p_.literal.dictionary({
            "schema": null,
            "root type": null,
        }),
    },
), ($) => ({
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

export const Value_Results: declarations.Value_Results = ($, abort) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
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
