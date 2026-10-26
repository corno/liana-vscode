import * as __operations from "./astn_parse_tree.js"
import * as p_ from 'pareto-core/refiner'

// schemas
import * as s_target from "../schema.js"
import * as s_source from "astn-runtime/modules/deserialization/schemas/parse_tree/schema"
import * as s_error from "../../reader_errors/schema.js"

// refiner dependencies
import * as r_token_from_parse_tree from "astn-runtime/modules/unmarshalling/schemas/unmarshalled_value/refiners/parse_tree"
import * as r_unmarshalled_from_parse_tree from "liana-runtime/modules/value_unmarshalling/schemas/unmarshalled_value/refiners/astn_parse_tree"

export namespace declarations {
    
    export type Directory = p_.Refiner<
        s_target.types.Directory,
        s_error.types.Unmarshalling_Error,
        s_source.Value
    >
    
    export type Node = p_.Refiner<
        s_target.types.Node,
        s_error.types.Unmarshalling_Error,
        s_source.Value
    >
    
    export type Schema = p_.Refiner<
        s_target.types.Schema,
        s_error.types.Unmarshalling_Error,
        s_source.Value
    >
    
    export type Type_Specification = p_.Refiner<
        s_target.types.Type_Specification,
        s_error.types.Unmarshalling_Error,
        s_source.Value
    >
}

// implementations

export const Directory: declarations.Directory = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.State(
    $,
    ($) => abort(['value', $]),
), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.types.Directory => {
    switch ($text) {
        case "group": return p_.change_context($['value'], ($) => ['group', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            ($) => abort(['value', $]),
            {
                'expected properties': p_.literal.dictionary({
                    "nodes": null,
                }),
            },
        ), ($) => ({
            'nodes': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'nodes',
                },
            ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
                $,
                ($) => abort(['value', $]),
            ), ($) => p_.from.dictionary($['entries']).map(
                ($, id) => __operations.Node(
                    $,
                    abort,
                ),
            ))),
        }))])
        case "dictionary": return p_.change_context($['value'], ($) => ['dictionary', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            ($) => abort(['value', $]),
            {
                'expected properties': p_.literal.dictionary({
                    "node": null,
                }),
            },
        ), ($) => ({
            'node': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'node',
                },
            ), ($) => __operations.Node(
                $,
                abort,
            )),
        }))])
        default: return abort(
            ['value', ['liana', {
                'type': ['state', ['unknown option', $['option']['token']['value']]],
                'range': $['option']['range'],
            }]],
        )
    }
}))

export const Node: declarations.Node = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.State(
    $,
    ($) => abort(['value', $]),
), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.types.Node => {
    switch ($text) {
        case "file": return p_.change_context($['value'], ($) => ['file', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            ($) => abort(['value', $]),
            {
                'expected properties': p_.literal.dictionary({
                    "file extension": null,
                    "type": null,
                }),
            },
        ), ($) => ({
            'file extension': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'file extension',
                },
            ), ($) => p_.change_context(r_token_from_parse_tree.Text(
                $,
                ($) => abort(['value', ['astn value unmarshalling', $]]),
            ), ($) => (() => (($['token']['type'][0]) === ("quoted"))
                ? $['token']['value']
                : abort(
                    ['token syntax', {
                        'type': "text",
                        'expected': "double quoted",
                        'found': $['token']['type'][0],
                        'range': $['range'],
                    }],
                )
            )())),
            'type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'type',
                },
            ), ($) => r_unmarshalled_from_parse_tree.Text(
                $,
                ($) => abort(['value', $]),
            )),
        }))])
        case "directory": return p_.change_context($['value'], ($) => ['directory', __operations.Directory(
            $,
            abort,
        )])
        default: return abort(
            ['value', ['liana', {
                'type': ['state', ['unknown option', $['option']['token']['value']]],
                'range': $['option']['range'],
            }]],
        )
    }
}))

export const Schema: declarations.Schema = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
    $,
    ($) => abort(['value', $]),
    {
        'expected properties': p_.literal.dictionary({
            "structure": null,
            "resolver": null,
        }),
    },
), ($) => ({
    'structure': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        ($) => abort(['value', $]),
        {
            'id': 'structure',
        },
    ), ($) => __operations.namespaces.structure.Structure(
        $,
        abort,
    )),
    'resolver': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        ($) => abort(['value', $]),
        {
            'id': 'resolver',
        },
    ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
        $,
        ($) => abort(['value', $]),
        {
            'expected properties': p_.literal.dictionary({
                "declarations": null,
                "implementations": null,
            }),
        },
    ), ($) => ({
        'declarations': p_.change_context(r_unmarshalled_from_parse_tree.Property(
            $,
            ($) => abort(['value', $]),
            {
                'id': 'declarations',
            },
        ), ($) => __operations.namespaces.declarations.Declaration_Namespace(
            $,
            abort,
        )),
        'implementations': p_.change_context(r_unmarshalled_from_parse_tree.Property(
            $,
            ($) => abort(['value', $]),
            {
                'id': 'implementations',
            },
        ), ($) => __operations.namespaces.resolver.Resolver(
            $,
            abort,
        )),
    }))),
}))

export const Type_Specification: declarations.Type_Specification = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
    $,
    ($) => abort(['value', $]),
    {
        'expected properties': p_.literal.dictionary({
            "schema": null,
            "directory": null,
        }),
    },
), ($) => ({
    'schema': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        ($) => abort(['value', $]),
        {
            'id': 'schema',
        },
    ), ($) => __operations.Schema(
        $,
        abort,
    )),
    'directory': p_.change_context(r_unmarshalled_from_parse_tree.Property(
        $,
        ($) => abort(['value', $]),
        {
            'id': 'directory',
        },
    ), ($) => __operations.Directory(
        $,
        abort,
    )),
}))
export namespace namespaces {
    export namespace structure {
        
        export namespace declarations {
            
            export type Regular_Expression = p_.Refiner<
                s_target.namespaces.structure.types.Regular_Expression,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Basic_Type = p_.Refiner<
                s_target.namespaces.structure.types.Basic_Type,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Basic_Types = p_.Refiner<
                s_target.namespaces.structure.types.Basic_Types,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Dictionary = p_.Refiner<
                s_target.namespaces.structure.types.Dictionary,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Group = p_.Refiner<
                s_target.namespaces.structure.types.Group,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Namespaces = p_.Refiner<
                s_target.namespaces.structure.types.Namespaces,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Types = p_.Refiner<
                s_target.namespaces.structure.types.Types,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Type = p_.Refiner<
                s_target.namespaces.structure.types.Type,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Type_Reference = p_.Refiner<
                s_target.namespaces.structure.types.Type_Reference,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Value = p_.Refiner<
                s_target.namespaces.structure.types.Value,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Value_Subselection = p_.Refiner<
                s_target.namespaces.structure.types.Value_Subselection,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Value_Reference = p_.Refiner<
                s_target.namespaces.structure.types.Value_Reference,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Option_Constraints = p_.Refiner<
                s_target.namespaces.structure.types.Option_Constraints,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Reference = p_.Refiner<
                s_target.namespaces.structure.types.Reference,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Reference_Constraints = p_.Refiner<
                s_target.namespaces.structure.types.Reference_Constraints,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Structure = p_.Refiner<
                s_target.namespaces.structure.types.Structure,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Value_Result = p_.Refiner<
                s_target.namespaces.structure.types.Value_Result,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
        }
        
        // implementations
        
        export const Regular_Expression: declarations.Regular_Expression = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.State(
            $,
            ($) => abort(['value', $]),
        ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.namespaces.structure.types.Regular_Expression => {
            switch ($text) {
                case "any character": return p_.change_context($['value'], ($) => ['any character', r_unmarshalled_from_parse_tree.Nothing(
                    $,
                    ($) => abort(['value', $]),
                )])
                case "literal": return p_.change_context($['value'], ($) => ['literal', p_.change_context(r_token_from_parse_tree.Text(
                    $,
                    ($) => abort(['value', ['astn value unmarshalling', $]]),
                ), ($) => (() => (($['token']['type'][0]) === ("quoted"))
                    ? $['token']['value']
                    : abort(
                        ['token syntax', {
                            'type': "text",
                            'expected': "double quoted",
                            'found': $['token']['type'][0],
                            'range': $['range'],
                        }],
                    )
                )())])
                case "character set": return p_.change_context($['value'], ($) => ['character set', p_.change_context(r_token_from_parse_tree.Text(
                    $,
                    ($) => abort(['value', ['astn value unmarshalling', $]]),
                ), ($) => (() => (($['token']['type'][0]) === ("quoted"))
                    ? $['token']['value']
                    : abort(
                        ['token syntax', {
                            'type': "text",
                            'expected': "double quoted",
                            'found': $['token']['type'][0],
                            'range': $['range'],
                        }],
                    )
                )())])
                case "sequence": return p_.change_context($['value'], ($) => ['sequence', p_.from.list(r_unmarshalled_from_parse_tree.List(
                    $,
                    ($) => abort(['value', $]),
                )['items']).map(
                    ($) => p_.change_context($['value'], ($) => __operations.namespaces.structure.Regular_Expression(
                        $,
                        abort,
                    )),
                )])
                case "choice": return p_.change_context($['value'], ($) => ['choice', p_.from.list(r_unmarshalled_from_parse_tree.List(
                    $,
                    ($) => abort(['value', $]),
                )['items']).map(
                    ($) => p_.change_context($['value'], ($) => __operations.namespaces.structure.Regular_Expression(
                        $,
                        abort,
                    )),
                )])
                case "repetition": return p_.change_context($['value'], ($) => ['repetition', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                    $,
                    ($) => abort(['value', $]),
                    {
                        'expected properties': p_.literal.dictionary({
                            "expression": null,
                            "quantity": null,
                        }),
                    },
                ), ($) => ({
                    'expression': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'id': 'expression',
                        },
                    ), ($) => __operations.namespaces.structure.Regular_Expression(
                        $,
                        abort,
                    )),
                    'quantity': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'id': 'quantity',
                        },
                    ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
                        $,
                        ($) => abort(['value', $]),
                    ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.namespaces.structure.types.Regular_Expression.repetition.quantity => {
                        switch ($text) {
                            case "optional": return p_.change_context($['value'], ($) => ['optional', r_unmarshalled_from_parse_tree.Nothing(
                                $,
                                ($) => abort(['value', $]),
                            )])
                            case "zero or more": return p_.change_context($['value'], ($) => ['zero or more', r_unmarshalled_from_parse_tree.Nothing(
                                $,
                                ($) => abort(['value', $]),
                            )])
                            case "one or more": return p_.change_context($['value'], ($) => ['one or more', r_unmarshalled_from_parse_tree.Nothing(
                                $,
                                ($) => abort(['value', $]),
                            )])
                            default: return abort(
                                ['value', ['liana', {
                                    'type': ['state', ['unknown option', $['option']['token']['value']]],
                                    'range': $['option']['range'],
                                }]],
                            )
                        }
                    }))),
                }))])
                default: return abort(
                    ['value', ['liana', {
                        'type': ['state', ['unknown option', $['option']['token']['value']]],
                        'range': $['option']['range'],
                    }]],
                )
            }
        }))
        
        export const Basic_Type: declarations.Basic_Type = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            ($) => abort(['value', $]),
            {
                'expected properties': p_.literal.dictionary({
                    "type": null,
                    "regular expression": null,
                    "hyperlink": null,
                }),
            },
        ), ($) => ({
            'type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'type',
                },
            ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
                $,
                ($) => abort(['value', $]),
            ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.namespaces.structure.types.Basic_Type.type_ => {
                switch ($text) {
                    case "double quoted": return p_.change_context($['value'], ($) => ['double quoted', r_unmarshalled_from_parse_tree.Nothing(
                        $,
                        ($) => abort(['value', $]),
                    )])
                    case "undelimited": return p_.change_context($['value'], ($) => ['undelimited', r_unmarshalled_from_parse_tree.Nothing(
                        $,
                        ($) => abort(['value', $]),
                    )])
                    default: return abort(
                        ['value', ['liana', {
                            'type': ['state', ['unknown option', $['option']['token']['value']]],
                            'range': $['option']['range'],
                        }]],
                    )
                }
            }))),
            'regular expression': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'regular expression',
                },
            ), ($) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                $,
                ($) => abort(['value', $]),
            )['optional']).map(($) => __operations.namespaces.structure.Regular_Expression(
                $,
                abort,
            ))),
            'hyperlink': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'hyperlink',
                },
            ), ($) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                $,
                ($) => abort(['value', $]),
            )['optional']).map(($) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                $,
                ($) => abort(['value', $]),
                {
                    'expected properties': p_.literal.dictionary({
                        "prefix": null,
                        "suffix": null,
                    }),
                },
            ), ($) => ({
                'prefix': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                    $,
                    ($) => abort(['value', $]),
                    {
                        'id': 'prefix',
                    },
                ), ($) => p_.change_context(r_token_from_parse_tree.Text(
                    $,
                    ($) => abort(['value', ['astn value unmarshalling', $]]),
                ), ($) => (() => (($['token']['type'][0]) === ("quoted"))
                    ? $['token']['value']
                    : abort(
                        ['token syntax', {
                            'type': "text",
                            'expected': "double quoted",
                            'found': $['token']['type'][0],
                            'range': $['range'],
                        }],
                    )
                )())),
                'suffix': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                    $,
                    ($) => abort(['value', $]),
                    {
                        'id': 'suffix',
                    },
                ), ($) => p_.change_context(r_token_from_parse_tree.Text(
                    $,
                    ($) => abort(['value', ['astn value unmarshalling', $]]),
                ), ($) => (() => (($['token']['type'][0]) === ("quoted"))
                    ? $['token']['value']
                    : abort(
                        ['token syntax', {
                            'type': "text",
                            'expected': "double quoted",
                            'found': $['token']['type'][0],
                            'range': $['range'],
                        }],
                    )
                )())),
            })))),
        }))
        
        export const Basic_Types: declarations.Basic_Types = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
            $,
            ($) => abort(['value', $]),
        ), ($) => p_.from.dictionary($['entries']).map(
            ($, id) => __operations.namespaces.structure.Basic_Type(
                $,
                abort,
            ),
        ))
        
        export const Dictionary: declarations.Dictionary = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            ($) => abort(['value', $]),
            {
                'expected properties': p_.literal.dictionary({
                    "value": null,
                }),
            },
        ), ($) => ({
            'value': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'value',
                },
            ), ($) => __operations.namespaces.structure.Value(
                $,
                abort,
            )),
        }))
        
        export const Group: declarations.Group = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
            $,
            ($) => abort(['value', $]),
        ), ($) => p_.from.dictionary($['entries']).map(
            ($, id) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                $,
                ($) => abort(['value', $]),
                {
                    'expected properties': p_.literal.dictionary({
                        "description": null,
                        "value": null,
                    }),
                },
            ), ($) => ({
                'description': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                    $,
                    ($) => abort(['value', $]),
                    {
                        'id': 'description',
                    },
                ), ($) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                    $,
                    ($) => abort(['value', $]),
                )['optional']).map(($) => p_.change_context(r_token_from_parse_tree.Text(
                    $,
                    ($) => abort(['value', ['astn value unmarshalling', $]]),
                ), ($) => (() => (($['token']['type'][0]) === ("quoted"))
                    ? $['token']['value']
                    : abort(
                        ['token syntax', {
                            'type': "multi line text",
                            'expected': "double quoted",
                            'found': $['token']['type'][0],
                            'range': $['range'],
                        }],
                    )
                )()))),
                'value': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                    $,
                    ($) => abort(['value', $]),
                    {
                        'id': 'value',
                    },
                ), ($) => __operations.namespaces.structure.Value(
                    $,
                    abort,
                )),
            })),
        ))
        
        export const Namespaces: declarations.Namespaces = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
            $,
            ($) => abort(['value', $]),
        ), ($) => p_.from.dictionary($['entries']).map(
            ($, id) => __operations.namespaces.structure.Structure(
                $,
                abort,
            ),
        ))
        
        export const Types: declarations.Types = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
            $,
            ($) => abort(['value', $]),
        ), ($) => p_.from.dictionary($['entries']).map(
            ($, id) => __operations.namespaces.structure.Type(
                $,
                abort,
            ),
        ))
        
        export const Type: declarations.Type = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            ($) => abort(['value', $]),
            {
                'expected properties': p_.literal.dictionary({
                    "visibility": null,
                    "root value": null,
                }),
            },
        ), ($) => ({
            'visibility': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'visibility',
                },
            ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
                $,
                ($) => abort(['value', $]),
            ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.namespaces.structure.types.Type.visibility => {
                switch ($text) {
                    case "private": return p_.change_context($['value'], ($) => ['private', r_unmarshalled_from_parse_tree.Nothing(
                        $,
                        ($) => abort(['value', $]),
                    )])
                    case "private single use": return p_.change_context($['value'], ($) => ['private single use', r_unmarshalled_from_parse_tree.Nothing(
                        $,
                        ($) => abort(['value', $]),
                    )])
                    case "public": return p_.change_context($['value'], ($) => ['public', r_unmarshalled_from_parse_tree.Nothing(
                        $,
                        ($) => abort(['value', $]),
                    )])
                    default: return abort(
                        ['value', ['liana', {
                            'type': ['state', ['unknown option', $['option']['token']['value']]],
                            'range': $['option']['range'],
                        }]],
                    )
                }
            }))),
            'root value': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'root value',
                },
            ), ($) => __operations.namespaces.structure.Value(
                $,
                abort,
            )),
        }))
        
        export const Type_Reference: declarations.Type_Reference = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            ($) => abort(['value', $]),
            {
                'expected properties': p_.literal.dictionary({
                    "location": null,
                }),
            },
        ), ($) => ({
            'location': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'location',
                },
            ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
                $,
                ($) => abort(['value', $]),
            ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.namespaces.structure.types.Type_Reference.location => {
                switch ($text) {
                    case "local": return p_.change_context($['value'], ($) => ['local', r_unmarshalled_from_parse_tree.Text(
                        $,
                        ($) => abort(['value', $]),
                    )])
                    case "child namespace": return p_.change_context($['value'], ($) => ['child namespace', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'expected properties': p_.literal.dictionary({
                                "namespace": null,
                                "type": null,
                            }),
                        },
                    ), ($) => ({
                        'namespace': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            ($) => abort(['value', $]),
                            {
                                'id': 'namespace',
                            },
                        ), ($) => r_unmarshalled_from_parse_tree.Text(
                            $,
                            ($) => abort(['value', $]),
                        )),
                        'type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            ($) => abort(['value', $]),
                            {
                                'id': 'type',
                            },
                        ), ($) => r_unmarshalled_from_parse_tree.Text(
                            $,
                            ($) => abort(['value', $]),
                        )),
                    }))])
                    case "sibling namespace": return p_.change_context($['value'], ($) => ['sibling namespace', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'expected properties': p_.literal.dictionary({
                                "namespace": null,
                                "type": null,
                            }),
                        },
                    ), ($) => ({
                        'namespace': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            ($) => abort(['value', $]),
                            {
                                'id': 'namespace',
                            },
                        ), ($) => r_unmarshalled_from_parse_tree.Text(
                            $,
                            ($) => abort(['value', $]),
                        )),
                        'type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            ($) => abort(['value', $]),
                            {
                                'id': 'type',
                            },
                        ), ($) => r_unmarshalled_from_parse_tree.Text(
                            $,
                            ($) => abort(['value', $]),
                        )),
                    }))])
                    default: return abort(
                        ['value', ['liana', {
                            'type': ['state', ['unknown option', $['option']['token']['value']]],
                            'range': $['option']['range'],
                        }]],
                    )
                }
            }))),
        }))
        
        export const Value: declarations.Value = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.State(
            $,
            ($) => abort(['value', $]),
        ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.namespaces.structure.types.Value => {
            switch ($text) {
                case "component": return p_.change_context($['value'], ($) => ['component', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                    $,
                    ($) => abort(['value', $]),
                    {
                        'expected properties': p_.literal.dictionary({
                            "type": null,
                            "constraints": null,
                        }),
                    },
                ), ($) => ({
                    'type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'id': 'type',
                        },
                    ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
                        $,
                        ($) => abort(['value', $]),
                    ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.namespaces.structure.types.Value.component.type_ => {
                        switch ($text) {
                            case "local": return p_.change_context($['value'], ($) => ['local', r_unmarshalled_from_parse_tree.Text(
                                $,
                                ($) => abort(['value', $]),
                            )])
                            case "child namespace": return p_.change_context($['value'], ($) => ['child namespace', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                                $,
                                ($) => abort(['value', $]),
                                {
                                    'expected properties': p_.literal.dictionary({
                                        "namespace": null,
                                        "type": null,
                                    }),
                                },
                            ), ($) => ({
                                'namespace': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                                    $,
                                    ($) => abort(['value', $]),
                                    {
                                        'id': 'namespace',
                                    },
                                ), ($) => r_unmarshalled_from_parse_tree.Text(
                                    $,
                                    ($) => abort(['value', $]),
                                )),
                                'type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                                    $,
                                    ($) => abort(['value', $]),
                                    {
                                        'id': 'type',
                                    },
                                ), ($) => r_unmarshalled_from_parse_tree.Text(
                                    $,
                                    ($) => abort(['value', $]),
                                )),
                            }))])
                            case "local cyclic": return p_.change_context($['value'], ($) => ['local cyclic', r_unmarshalled_from_parse_tree.Text(
                                $,
                                ($) => abort(['value', $]),
                            )])
                            case "sibling namespace": return p_.change_context($['value'], ($) => ['sibling namespace', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                                $,
                                ($) => abort(['value', $]),
                                {
                                    'expected properties': p_.literal.dictionary({
                                        "namespace": null,
                                        "type": null,
                                    }),
                                },
                            ), ($) => ({
                                'namespace': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                                    $,
                                    ($) => abort(['value', $]),
                                    {
                                        'id': 'namespace',
                                    },
                                ), ($) => r_unmarshalled_from_parse_tree.Text(
                                    $,
                                    ($) => abort(['value', $]),
                                )),
                                'type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                                    $,
                                    ($) => abort(['value', $]),
                                    {
                                        'id': 'type',
                                    },
                                ), ($) => r_unmarshalled_from_parse_tree.Text(
                                    $,
                                    ($) => abort(['value', $]),
                                )),
                            }))])
                            default: return abort(
                                ['value', ['liana', {
                                    'type': ['state', ['unknown option', $['option']['token']['value']]],
                                    'range': $['option']['range'],
                                }]],
                            )
                        }
                    }))),
                    'constraints': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'id': 'constraints',
                        },
                    ), ($) => __operations.namespaces.structure.Reference_Constraints(
                        $,
                        abort,
                    )),
                }))])
                case "dictionary": return p_.change_context($['value'], ($) => ['dictionary', __operations.namespaces.structure.Dictionary(
                    $,
                    abort,
                )])
                case "group": return p_.change_context($['value'], ($) => ['group', __operations.namespaces.structure.Group(
                    $,
                    abort,
                )])
                case "list": return p_.change_context($['value'], ($) => ['list', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                    $,
                    ($) => abort(['value', $]),
                    {
                        'expected properties': p_.literal.dictionary({
                            "value": null,
                            "result": null,
                        }),
                    },
                ), ($) => ({
                    'value': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'id': 'value',
                        },
                    ), ($) => __operations.namespaces.structure.Value(
                        $,
                        abort,
                    )),
                    'result': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'id': 'result',
                        },
                    ), ($) => __operations.namespaces.structure.Value_Result(
                        $,
                        abort,
                    )),
                }))])
                case "nothing": return p_.change_context($['value'], ($) => ['nothing', r_unmarshalled_from_parse_tree.Nothing(
                    $,
                    ($) => abort(['value', $]),
                )])
                case "simple": return p_.change_context($['value'], ($) => ['simple', r_unmarshalled_from_parse_tree.Text(
                    $,
                    ($) => abort(['value', $]),
                )])
                case "optional": return p_.change_context($['value'], ($) => ['optional', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                    $,
                    ($) => abort(['value', $]),
                    {
                        'expected properties': p_.literal.dictionary({
                            "constraints": null,
                            "value": null,
                            "result": null,
                        }),
                    },
                ), ($) => ({
                    'constraints': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'id': 'constraints',
                        },
                    ), ($) => __operations.namespaces.structure.Option_Constraints(
                        $,
                        abort,
                    )),
                    'value': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'id': 'value',
                        },
                    ), ($) => __operations.namespaces.structure.Value(
                        $,
                        abort,
                    )),
                    'result': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'id': 'result',
                        },
                    ), ($) => __operations.namespaces.structure.Value_Result(
                        $,
                        abort,
                    )),
                }))])
                case "reference": return p_.change_context($['value'], ($) => ['reference', __operations.namespaces.structure.Reference(
                    $,
                    abort,
                )])
                case "state": return p_.change_context($['value'], ($) => ['state', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                    $,
                    ($) => abort(['value', $]),
                    {
                        'expected properties': p_.literal.dictionary({
                            "options": null,
                            "result": null,
                        }),
                    },
                ), ($) => ({
                    'options': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'id': 'options',
                        },
                    ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
                        $,
                        ($) => abort(['value', $]),
                    ), ($) => p_.from.dictionary($['entries']).map(
                        ($, id) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                            $,
                            ($) => abort(['value', $]),
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
                                ($) => abort(['value', $]),
                                {
                                    'id': 'description',
                                },
                            ), ($) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                                $,
                                ($) => abort(['value', $]),
                            )['optional']).map(($) => p_.change_context(r_token_from_parse_tree.Text(
                                $,
                                ($) => abort(['value', ['astn value unmarshalling', $]]),
                            ), ($) => (() => (($['token']['type'][0]) === ("quoted"))
                                ? $['token']['value']
                                : abort(
                                    ['token syntax', {
                                        'type': "multi line text",
                                        'expected': "double quoted",
                                        'found': $['token']['type'][0],
                                        'range': $['range'],
                                    }],
                                )
                            )()))),
                            'constraints': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                                $,
                                ($) => abort(['value', $]),
                                {
                                    'id': 'constraints',
                                },
                            ), ($) => __operations.namespaces.structure.Option_Constraints(
                                $,
                                abort,
                            )),
                            'value': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                                $,
                                ($) => abort(['value', $]),
                                {
                                    'id': 'value',
                                },
                            ), ($) => __operations.namespaces.structure.Value(
                                $,
                                abort,
                            )),
                        })),
                    ))),
                    'result': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'id': 'result',
                        },
                    ), ($) => __operations.namespaces.structure.Value_Result(
                        $,
                        abort,
                    )),
                }))])
                default: return abort(
                    ['value', ['liana', {
                        'type': ['state', ['unknown option', $['option']['token']['value']]],
                        'range': $['option']['range'],
                    }]],
                )
            }
        }))
        
        export const Value_Subselection: declarations.Value_Subselection = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            ($) => abort(['value', $]),
            {
                'expected properties': p_.literal.dictionary({
                    "tail": null,
                }),
            },
        ), ($) => ({
            'tail': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'tail',
                },
            ), ($) => p_.from.list(r_unmarshalled_from_parse_tree.List(
                $,
                ($) => abort(['value', $]),
            )['items']).map(
                ($) => p_.change_context($['value'], ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
                    $,
                    ($) => abort(['value', $]),
                ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.namespaces.structure.types.Value_Subselection.tail.L => {
                    switch ($text) {
                        case "dictionary": return p_.change_context($['value'], ($) => ['dictionary', r_unmarshalled_from_parse_tree.Nothing(
                            $,
                            ($) => abort(['value', $]),
                        )])
                        case "group": return p_.change_context($['value'], ($) => ['group', r_unmarshalled_from_parse_tree.Text(
                            $,
                            ($) => abort(['value', $]),
                        )])
                        case "list": return p_.change_context($['value'], ($) => ['list', r_unmarshalled_from_parse_tree.Nothing(
                            $,
                            ($) => abort(['value', $]),
                        )])
                        case "optional": return p_.change_context($['value'], ($) => ['optional', r_unmarshalled_from_parse_tree.Nothing(
                            $,
                            ($) => abort(['value', $]),
                        )])
                        case "state": return p_.change_context($['value'], ($) => ['state', r_unmarshalled_from_parse_tree.Text(
                            $,
                            ($) => abort(['value', $]),
                        )])
                        default: return abort(
                            ['value', ['liana', {
                                'type': ['state', ['unknown option', $['option']['token']['value']]],
                                'range': $['option']['range'],
                            }]],
                        )
                    }
                }))),
            )),
        }))
        
        export const Value_Reference: declarations.Value_Reference = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            ($) => abort(['value', $]),
            {
                'expected properties': p_.literal.dictionary({
                    "type": null,
                    "path": null,
                }),
            },
        ), ($) => ({
            'type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'type',
                },
            ), ($) => __operations.namespaces.structure.Type_Reference(
                $,
                abort,
            )),
            'path': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'path',
                },
            ), ($) => __operations.namespaces.structure.Value_Subselection(
                $,
                abort,
            )),
        }))
        
        export const Option_Constraints: declarations.Option_Constraints = ($, abort) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
            $,
            ($) => abort(['value', $]),
        )['optional']).map(($) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
            $,
            ($) => abort(['value', $]),
        ), ($) => p_.from.dictionary($['entries']).map(
            ($, id) => __operations.namespaces.structure.Value_Reference(
                $,
                abort,
            ),
        )))
        
        export const Reference: declarations.Reference = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            ($) => abort(['value', $]),
            {
                'expected properties': p_.literal.dictionary({
                    "referent": null,
                    "type": null,
                }),
            },
        ), ($) => ({
            'referent': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'referent',
                },
            ), ($) => __operations.namespaces.structure.Value_Reference(
                $,
                abort,
            )),
            'type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'type',
                },
            ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                $,
                ($) => abort(['value', $]),
                {
                    'expected properties': p_.literal.dictionary({
                        "dependency": null,
                        "constraints": null,
                    }),
                },
            ), ($) => ({
                'dependency': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                    $,
                    ($) => abort(['value', $]),
                    {
                        'id': 'dependency',
                    },
                ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
                    $,
                    ($) => abort(['value', $]),
                ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.namespaces.structure.types.Reference.type_.dependency => {
                    switch ($text) {
                        case "acyclic": return p_.change_context($['value'], ($) => ['acyclic', r_unmarshalled_from_parse_tree.Nothing(
                            $,
                            ($) => abort(['value', $]),
                        )])
                        case "cyclic": return p_.change_context($['value'], ($) => ['cyclic', r_unmarshalled_from_parse_tree.Nothing(
                            $,
                            ($) => abort(['value', $]),
                        )])
                        default: return abort(
                            ['value', ['liana', {
                                'type': ['state', ['unknown option', $['option']['token']['value']]],
                                'range': $['option']['range'],
                            }]],
                        )
                    }
                }))),
                'constraints': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                    $,
                    ($) => abort(['value', $]),
                    {
                        'id': 'constraints',
                    },
                ), ($) => __operations.namespaces.structure.Reference_Constraints(
                    $,
                    abort,
                )),
            }))),
        }))
        
        export const Reference_Constraints: declarations.Reference_Constraints = ($, abort) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
            $,
            ($) => abort(['value', $]),
        )['optional']).map(($) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
            $,
            ($) => abort(['value', $]),
        ), ($) => p_.from.dictionary($['entries']).map(
            ($, id) => __operations.namespaces.structure.Value_Reference(
                $,
                abort,
            ),
        )))
        
        export const Structure: declarations.Structure = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            ($) => abort(['value', $]),
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
                ($) => abort(['value', $]),
                {
                    'id': 'namespaces',
                },
            ), ($) => __operations.namespaces.structure.Namespaces(
                $,
                abort,
            )),
            'basic types': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'basic types',
                },
            ), ($) => __operations.namespaces.structure.Basic_Types(
                $,
                abort,
            )),
            'types': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'types',
                },
            ), ($) => __operations.namespaces.structure.Types(
                $,
                abort,
            )),
        }))
        
        export const Value_Result: declarations.Value_Result = ($, abort) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
            $,
            ($) => abort(['value', $]),
        )['optional']).map(($) => __operations.namespaces.structure.Value_Reference(
            $,
            abort,
        ))
        export namespace namespaces {}
    }
    export namespace declarations {
        
        export namespace declarations {
            
            export type Presence = p_.Refiner<
                s_target.namespaces.declarations.types.Presence,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Signature_Type_Reference = p_.Refiner<
                s_target.namespaces.declarations.types.Signature_Type_Reference,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Signature_Value_Subselection = p_.Refiner<
                s_target.namespaces.declarations.types.Signature_Value_Subselection,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Signature_Value_Reference = p_.Refiner<
                s_target.namespaces.declarations.types.Signature_Value_Reference,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Signature = p_.Refiner<
                s_target.namespaces.declarations.types.Signature,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Declarations = p_.Refiner<
                s_target.namespaces.declarations.types.Declarations,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Declaration = p_.Refiner<
                s_target.namespaces.declarations.types.Declaration,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Namespaces = p_.Refiner<
                s_target.namespaces.declarations.types.Namespaces,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Declaration_Namespace = p_.Refiner<
                s_target.namespaces.declarations.types.Declaration_Namespace,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
        }
        
        // implementations
        
        export const Presence: declarations.Presence = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.State(
            $,
            ($) => abort(['value', $]),
        ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.namespaces.declarations.types.Presence => {
            switch ($text) {
                case "optional": return p_.change_context($['value'], ($) => ['optional', r_unmarshalled_from_parse_tree.Nothing(
                    $,
                    ($) => abort(['value', $]),
                )])
                case "required": return p_.change_context($['value'], ($) => ['required', r_unmarshalled_from_parse_tree.Nothing(
                    $,
                    ($) => abort(['value', $]),
                )])
                default: return abort(
                    ['value', ['liana', {
                        'type': ['state', ['unknown option', $['option']['token']['value']]],
                        'range': $['option']['range'],
                    }]],
                )
            }
        }))
        
        export const Signature_Type_Reference: declarations.Signature_Type_Reference = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            ($) => abort(['value', $]),
            {
                'expected properties': p_.literal.dictionary({
                    "location": null,
                }),
            },
        ), ($) => ({
            'location': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'location',
                },
            ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
                $,
                ($) => abort(['value', $]),
            ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.namespaces.declarations.types.Signature_Type_Reference.location => {
                switch ($text) {
                    case "local": return p_.change_context($['value'], ($) => ['local', r_unmarshalled_from_parse_tree.Text(
                        $,
                        ($) => abort(['value', $]),
                    )])
                    case "child namespace": return p_.change_context($['value'], ($) => ['child namespace', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'expected properties': p_.literal.dictionary({
                                "namespace": null,
                                "type": null,
                            }),
                        },
                    ), ($) => ({
                        'namespace': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            ($) => abort(['value', $]),
                            {
                                'id': 'namespace',
                            },
                        ), ($) => r_unmarshalled_from_parse_tree.Text(
                            $,
                            ($) => abort(['value', $]),
                        )),
                        'type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            ($) => abort(['value', $]),
                            {
                                'id': 'type',
                            },
                        ), ($) => r_unmarshalled_from_parse_tree.Text(
                            $,
                            ($) => abort(['value', $]),
                        )),
                    }))])
                    case "sibling namespace": return p_.change_context($['value'], ($) => ['sibling namespace', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'expected properties': p_.literal.dictionary({
                                "namespace": null,
                                "type": null,
                            }),
                        },
                    ), ($) => ({
                        'namespace': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            ($) => abort(['value', $]),
                            {
                                'id': 'namespace',
                            },
                        ), ($) => r_unmarshalled_from_parse_tree.Text(
                            $,
                            ($) => abort(['value', $]),
                        )),
                        'type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            ($) => abort(['value', $]),
                            {
                                'id': 'type',
                            },
                        ), ($) => r_unmarshalled_from_parse_tree.Text(
                            $,
                            ($) => abort(['value', $]),
                        )),
                    }))])
                    default: return abort(
                        ['value', ['liana', {
                            'type': ['state', ['unknown option', $['option']['token']['value']]],
                            'range': $['option']['range'],
                        }]],
                    )
                }
            }))),
        }))
        
        export const Signature_Value_Subselection: declarations.Signature_Value_Subselection = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            ($) => abort(['value', $]),
            {
                'expected properties': p_.literal.dictionary({
                    "tail": null,
                }),
            },
        ), ($) => ({
            'tail': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'tail',
                },
            ), ($) => p_.from.list(r_unmarshalled_from_parse_tree.List(
                $,
                ($) => abort(['value', $]),
            )['items']).map(
                ($) => p_.change_context($['value'], ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
                    $,
                    ($) => abort(['value', $]),
                ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.namespaces.declarations.types.Signature_Value_Subselection.tail.L => {
                    switch ($text) {
                        case "dictionary": return p_.change_context($['value'], ($) => ['dictionary', r_unmarshalled_from_parse_tree.Nothing(
                            $,
                            ($) => abort(['value', $]),
                        )])
                        case "group": return p_.change_context($['value'], ($) => ['group', r_unmarshalled_from_parse_tree.Text(
                            $,
                            ($) => abort(['value', $]),
                        )])
                        case "list": return p_.change_context($['value'], ($) => ['list', r_unmarshalled_from_parse_tree.Nothing(
                            $,
                            ($) => abort(['value', $]),
                        )])
                        case "optional": return p_.change_context($['value'], ($) => ['optional', r_unmarshalled_from_parse_tree.Nothing(
                            $,
                            ($) => abort(['value', $]),
                        )])
                        case "state": return p_.change_context($['value'], ($) => ['state', r_unmarshalled_from_parse_tree.Text(
                            $,
                            ($) => abort(['value', $]),
                        )])
                        default: return abort(
                            ['value', ['liana', {
                                'type': ['state', ['unknown option', $['option']['token']['value']]],
                                'range': $['option']['range'],
                            }]],
                        )
                    }
                }))),
            )),
        }))
        
        export const Signature_Value_Reference: declarations.Signature_Value_Reference = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            ($) => abort(['value', $]),
            {
                'expected properties': p_.literal.dictionary({
                    "type": null,
                    "subselection": null,
                }),
            },
        ), ($) => ({
            'type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'type',
                },
            ), ($) => __operations.namespaces.declarations.Signature_Type_Reference(
                $,
                abort,
            )),
            'subselection': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'subselection',
                },
            ), ($) => __operations.namespaces.declarations.Signature_Value_Subselection(
                $,
                abort,
            )),
        }))
        
        export const Signature: declarations.Signature = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            ($) => abort(['value', $]),
            {
                'expected properties': p_.literal.dictionary({
                    "values": null,
                    "lookups": null,
                }),
            },
        ), ($) => ({
            'values': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'values',
                },
            ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
                $,
                ($) => abort(['value', $]),
            ), ($) => p_.from.dictionary($['entries']).map(
                ($, id) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                    $,
                    ($) => abort(['value', $]),
                    {
                        'expected properties': p_.literal.dictionary({
                            "value": null,
                            "presence": null,
                        }),
                    },
                ), ($) => ({
                    'value': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'id': 'value',
                        },
                    ), ($) => __operations.namespaces.declarations.Signature_Value_Reference(
                        $,
                        abort,
                    )),
                    'presence': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'id': 'presence',
                        },
                    ), ($) => __operations.namespaces.declarations.Presence(
                        $,
                        abort,
                    )),
                })),
            ))),
            'lookups': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'lookups',
                },
            ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
                $,
                ($) => abort(['value', $]),
            ), ($) => p_.from.dictionary($['entries']).map(
                ($, id) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                    $,
                    ($) => abort(['value', $]),
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
                        ($) => abort(['value', $]),
                        {
                            'id': 'referent',
                        },
                    ), ($) => __operations.namespaces.declarations.Signature_Value_Reference(
                        $,
                        abort,
                    )),
                    'type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'id': 'type',
                        },
                    ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
                        $,
                        ($) => abort(['value', $]),
                    ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.namespaces.declarations.types.Signature.lookups.D.type_ => {
                        switch ($text) {
                            case "cyclic": return p_.change_context($['value'], ($) => ['cyclic', r_unmarshalled_from_parse_tree.Nothing(
                                $,
                                ($) => abort(['value', $]),
                            )])
                            case "acyclic": return p_.change_context($['value'], ($) => ['acyclic', r_unmarshalled_from_parse_tree.Nothing(
                                $,
                                ($) => abort(['value', $]),
                            )])
                            default: return abort(
                                ['value', ['liana', {
                                    'type': ['state', ['unknown option', $['option']['token']['value']]],
                                    'range': $['option']['range'],
                                }]],
                            )
                        }
                    }))),
                    'presence': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'id': 'presence',
                        },
                    ), ($) => __operations.namespaces.declarations.Presence(
                        $,
                        abort,
                    )),
                })),
            ))),
        }))
        
        export const Declarations: declarations.Declarations = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
            $,
            ($) => abort(['value', $]),
        ), ($) => p_.from.dictionary($['entries']).map(
            ($, id) => __operations.namespaces.declarations.Declaration(
                $,
                abort,
            ),
        ))
        
        export const Declaration: declarations.Declaration = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            ($) => abort(['value', $]),
            {
                'expected properties': p_.literal.dictionary({
                    "signature": null,
                }),
            },
        ), ($) => ({
            'signature': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'signature',
                },
            ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
                $,
                ($) => abort(['value', $]),
            ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.namespaces.declarations.types.Declaration.signature => {
                switch ($text) {
                    case "local": return p_.change_context($['value'], ($) => ['local', __operations.namespaces.declarations.Signature(
                        $,
                        abort,
                    )])
                    case "same as": return p_.change_context($['value'], ($) => ['same as', r_unmarshalled_from_parse_tree.Text(
                        $,
                        ($) => abort(['value', $]),
                    )])
                    default: return abort(
                        ['value', ['liana', {
                            'type': ['state', ['unknown option', $['option']['token']['value']]],
                            'range': $['option']['range'],
                        }]],
                    )
                }
            }))),
        }))
        
        export const Namespaces: declarations.Namespaces = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
            $,
            ($) => abort(['value', $]),
        ), ($) => p_.from.dictionary($['entries']).map(
            ($, id) => __operations.namespaces.declarations.Declaration_Namespace(
                $,
                abort,
            ),
        ))
        
        export const Declaration_Namespace: declarations.Declaration_Namespace = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            ($) => abort(['value', $]),
            {
                'expected properties': p_.literal.dictionary({
                    "namespaces": null,
                    "types": null,
                }),
            },
        ), ($) => ({
            'namespaces': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'namespaces',
                },
            ), ($) => __operations.namespaces.declarations.Namespaces(
                $,
                abort,
            )),
            'types': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'types',
                },
            ), ($) => __operations.namespaces.declarations.Declarations(
                $,
                abort,
            )),
        }))
        export namespace namespaces {}
    }
    export namespace resolver {
        
        export namespace declarations {
            
            export type Absence_Constraints = p_.Refiner<
                s_target.namespaces.resolver.types.Absence_Constraints,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Type_Reference = p_.Refiner<
                s_target.namespaces.resolver.types.Type_Reference,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Value_Subselection = p_.Refiner<
                s_target.namespaces.resolver.types.Value_Subselection,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Value_Reference = p_.Refiner<
                s_target.namespaces.resolver.types.Value_Reference,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Relative_Value_Selection = p_.Refiner<
                s_target.namespaces.resolver.types.Relative_Value_Selection,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Guaranteed_Value_Selection = p_.Refiner<
                s_target.namespaces.resolver.types.Guaranteed_Value_Selection,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Benchmark = p_.Refiner<
                s_target.namespaces.resolver.types.Benchmark,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Constraint = p_.Refiner<
                s_target.namespaces.resolver.types.Constraint,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Lookup_Selection = p_.Refiner<
                s_target.namespaces.resolver.types.Lookup_Selection,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Namespaces = p_.Refiner<
                s_target.namespaces.resolver.types.Namespaces,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Possible_Value_Selection = p_.Refiner<
                s_target.namespaces.resolver.types.Possible_Value_Selection,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Option_Constraints = p_.Refiner<
                s_target.namespaces.resolver.types.Option_Constraints,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Optional_Value_Initialization = p_.Refiner<
                s_target.namespaces.resolver.types.Optional_Value_Initialization,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Reference_Constraints = p_.Refiner<
                s_target.namespaces.resolver.types.Reference_Constraints,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Reference_To_Value_Constraint = p_.Refiner<
                s_target.namespaces.resolver.types.Reference_To_Value_Constraint,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Resolver = p_.Refiner<
                s_target.namespaces.resolver.types.Resolver,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Result_Selection = p_.Refiner<
                s_target.namespaces.resolver.types.Result_Selection,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Value_Group = p_.Refiner<
                s_target.namespaces.resolver.types.Value_Group,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Value_List_Result = p_.Refiner<
                s_target.namespaces.resolver.types.Value_List_Result,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Value = p_.Refiner<
                s_target.namespaces.resolver.types.Value,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Types = p_.Refiner<
                s_target.namespaces.resolver.types.Types,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Value_Constraint = p_.Refiner<
                s_target.namespaces.resolver.types.Value_Constraint,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
            
            export type Value_Constraints = p_.Refiner<
                s_target.namespaces.resolver.types.Value_Constraints,
                s_error.types.Unmarshalling_Error,
                s_source.Value
            >
        }
        
        // implementations
        
        export const Absence_Constraints: declarations.Absence_Constraints = ($, abort) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
            $,
            ($) => abort(['value', $]),
        )['optional']).map(($) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
            $,
            ($) => abort(['value', $]),
        ), ($) => p_.from.dictionary($['entries']).map(
            ($, id) => __operations.namespaces.resolver.Possible_Value_Selection(
                $,
                abort,
            ),
        )))
        
        export const Type_Reference: declarations.Type_Reference = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            ($) => abort(['value', $]),
            {
                'expected properties': p_.literal.dictionary({
                    "location": null,
                }),
            },
        ), ($) => ({
            'location': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'location',
                },
            ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
                $,
                ($) => abort(['value', $]),
            ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.namespaces.resolver.types.Type_Reference.location => {
                switch ($text) {
                    case "local": return p_.change_context($['value'], ($) => ['local', r_unmarshalled_from_parse_tree.Text(
                        $,
                        ($) => abort(['value', $]),
                    )])
                    case "child namespace": return p_.change_context($['value'], ($) => ['child namespace', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'expected properties': p_.literal.dictionary({
                                "namespace": null,
                                "type": null,
                            }),
                        },
                    ), ($) => ({
                        'namespace': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            ($) => abort(['value', $]),
                            {
                                'id': 'namespace',
                            },
                        ), ($) => r_unmarshalled_from_parse_tree.Text(
                            $,
                            ($) => abort(['value', $]),
                        )),
                        'type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            ($) => abort(['value', $]),
                            {
                                'id': 'type',
                            },
                        ), ($) => r_unmarshalled_from_parse_tree.Text(
                            $,
                            ($) => abort(['value', $]),
                        )),
                    }))])
                    case "sibling namespace": return p_.change_context($['value'], ($) => ['sibling namespace', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'expected properties': p_.literal.dictionary({
                                "namespace": null,
                                "type": null,
                            }),
                        },
                    ), ($) => ({
                        'namespace': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            ($) => abort(['value', $]),
                            {
                                'id': 'namespace',
                            },
                        ), ($) => r_unmarshalled_from_parse_tree.Text(
                            $,
                            ($) => abort(['value', $]),
                        )),
                        'type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            ($) => abort(['value', $]),
                            {
                                'id': 'type',
                            },
                        ), ($) => r_unmarshalled_from_parse_tree.Text(
                            $,
                            ($) => abort(['value', $]),
                        )),
                    }))])
                    default: return abort(
                        ['value', ['liana', {
                            'type': ['state', ['unknown option', $['option']['token']['value']]],
                            'range': $['option']['range'],
                        }]],
                    )
                }
            }))),
        }))
        
        export const Value_Subselection: declarations.Value_Subselection = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            ($) => abort(['value', $]),
            {
                'expected properties': p_.literal.dictionary({
                    "tail": null,
                }),
            },
        ), ($) => ({
            'tail': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'tail',
                },
            ), ($) => p_.from.list(r_unmarshalled_from_parse_tree.List(
                $,
                ($) => abort(['value', $]),
            )['items']).map(
                ($) => p_.change_context($['value'], ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
                    $,
                    ($) => abort(['value', $]),
                ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.namespaces.resolver.types.Value_Subselection.tail.L => {
                    switch ($text) {
                        case "dictionary": return p_.change_context($['value'], ($) => ['dictionary', r_unmarshalled_from_parse_tree.Nothing(
                            $,
                            ($) => abort(['value', $]),
                        )])
                        case "group": return p_.change_context($['value'], ($) => ['group', r_unmarshalled_from_parse_tree.Text(
                            $,
                            ($) => abort(['value', $]),
                        )])
                        case "list": return p_.change_context($['value'], ($) => ['list', r_unmarshalled_from_parse_tree.Nothing(
                            $,
                            ($) => abort(['value', $]),
                        )])
                        case "optional": return p_.change_context($['value'], ($) => ['optional', r_unmarshalled_from_parse_tree.Nothing(
                            $,
                            ($) => abort(['value', $]),
                        )])
                        case "state": return p_.change_context($['value'], ($) => ['state', r_unmarshalled_from_parse_tree.Text(
                            $,
                            ($) => abort(['value', $]),
                        )])
                        default: return abort(
                            ['value', ['liana', {
                                'type': ['state', ['unknown option', $['option']['token']['value']]],
                                'range': $['option']['range'],
                            }]],
                        )
                    }
                }))),
            )),
        }))
        
        export const Value_Reference: declarations.Value_Reference = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            ($) => abort(['value', $]),
            {
                'expected properties': p_.literal.dictionary({
                    "type": null,
                    "path": null,
                }),
            },
        ), ($) => ({
            'type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'type',
                },
            ), ($) => __operations.namespaces.resolver.Type_Reference(
                $,
                abort,
            )),
            'path': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'path',
                },
            ), ($) => __operations.namespaces.resolver.Value_Subselection(
                $,
                abort,
            )),
        }))
        
        export const Relative_Value_Selection: declarations.Relative_Value_Selection = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            ($) => abort(['value', $]),
            {
                'expected properties': p_.literal.dictionary({
                    "path": null,
                }),
            },
        ), ($) => ({
            'path': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'path',
                },
            ), ($) => p_.from.list(r_unmarshalled_from_parse_tree.List(
                $,
                ($) => abort(['value', $]),
            )['items']).map(
                ($) => p_.change_context($['value'], ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
                    $,
                    ($) => abort(['value', $]),
                ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.namespaces.resolver.types.Relative_Value_Selection.path.L => {
                    switch ($text) {
                        case "benchmark link": return p_.change_context($['value'], ($) => ['benchmark link', __operations.namespaces.resolver.Value_Reference(
                            $,
                            abort,
                        )])
                        case "component constraint": return p_.change_context($['value'], ($) => ['component constraint', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                            $,
                            ($) => abort(['value', $]),
                            {
                                'expected properties': p_.literal.dictionary({
                                    "name": null,
                                    "target": null,
                                }),
                            },
                        ), ($) => ({
                            'name': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                                $,
                                ($) => abort(['value', $]),
                                {
                                    'id': 'name',
                                },
                            ), ($) => p_.change_context(r_token_from_parse_tree.Text(
                                $,
                                ($) => abort(['value', ['astn value unmarshalling', $]]),
                            ), ($) => (() => (($['token']['type'][0]) === ("quoted"))
                                ? $['token']['value']
                                : abort(
                                    ['token syntax', {
                                        'type': "text",
                                        'expected': "double quoted",
                                        'found': $['token']['type'][0],
                                        'range': $['range'],
                                    }],
                                )
                            )())),
                            'target': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                                $,
                                ($) => abort(['value', $]),
                                {
                                    'id': 'target',
                                },
                            ), ($) => __operations.namespaces.resolver.Value_Reference(
                                $,
                                abort,
                            )),
                        }))])
                        case "component": return p_.change_context($['value'], ($) => ['component', r_unmarshalled_from_parse_tree.Nothing(
                            $,
                            ($) => abort(['value', $]),
                        )])
                        case "group": return p_.change_context($['value'], ($) => ['group', r_unmarshalled_from_parse_tree.Text(
                            $,
                            ($) => abort(['value', $]),
                        )])
                        case "list result": return p_.change_context($['value'], ($) => ['list result', r_unmarshalled_from_parse_tree.Nothing(
                            $,
                            ($) => abort(['value', $]),
                        )])
                        case "option constraint": return p_.change_context($['value'], ($) => ['option constraint', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                            $,
                            ($) => abort(['value', $]),
                            {
                                'expected properties': p_.literal.dictionary({
                                    "option": null,
                                    "constraint": null,
                                }),
                            },
                        ), ($) => ({
                            'option': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                                $,
                                ($) => abort(['value', $]),
                                {
                                    'id': 'option',
                                },
                            ), ($) => r_unmarshalled_from_parse_tree.Text(
                                $,
                                ($) => abort(['value', $]),
                            )),
                            'constraint': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                                $,
                                ($) => abort(['value', $]),
                                {
                                    'id': 'constraint',
                                },
                            ), ($) => r_unmarshalled_from_parse_tree.Text(
                                $,
                                ($) => abort(['value', $]),
                            )),
                        }))])
                        case "optional": return p_.change_context($['value'], ($) => ['optional', r_unmarshalled_from_parse_tree.Nothing(
                            $,
                            ($) => abort(['value', $]),
                        )])
                        case "optional value constraint": return p_.change_context($['value'], ($) => ['optional value constraint', r_unmarshalled_from_parse_tree.Text(
                            $,
                            ($) => abort(['value', $]),
                        )])
                        case "reference constraint": return p_.change_context($['value'], ($) => ['reference constraint', r_unmarshalled_from_parse_tree.Text(
                            $,
                            ($) => abort(['value', $]),
                        )])
                        case "reference": return p_.change_context($['value'], ($) => ['reference', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                            $,
                            ($) => abort(['value', $]),
                            {
                                'expected properties': p_.literal.dictionary({}),
                            },
                        ), ($) => ({}))])
                        case "state result": return p_.change_context($['value'], ($) => ['state result', r_unmarshalled_from_parse_tree.Nothing(
                            $,
                            ($) => abort(['value', $]),
                        )])
                        default: return abort(
                            ['value', ['liana', {
                                'type': ['state', ['unknown option', $['option']['token']['value']]],
                                'range': $['option']['range'],
                            }]],
                        )
                    }
                }))),
            )),
        }))
        
        export const Guaranteed_Value_Selection: declarations.Guaranteed_Value_Selection = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            ($) => abort(['value', $]),
            {
                'expected properties': p_.literal.dictionary({
                    "start": null,
                    "tail": null,
                }),
            },
        ), ($) => ({
            'start': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'start',
                },
            ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
                $,
                ($) => abort(['value', $]),
            ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.namespaces.resolver.types.Guaranteed_Value_Selection.start => {
                switch ($text) {
                    case "optional fallback": return p_.change_context($['value'], ($) => ['optional fallback', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'expected properties': p_.literal.dictionary({
                                "selection": null,
                                "fallback": null,
                            }),
                        },
                    ), ($) => ({
                        'selection': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            ($) => abort(['value', $]),
                            {
                                'id': 'selection',
                            },
                        ), ($) => __operations.namespaces.resolver.Possible_Value_Selection(
                            $,
                            abort,
                        )),
                        'fallback': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            ($) => abort(['value', $]),
                            {
                                'id': 'fallback',
                            },
                        ), ($) => __operations.namespaces.resolver.Guaranteed_Value_Selection(
                            $,
                            abort,
                        )),
                    }))])
                    case "sibling": return p_.change_context($['value'], ($) => ['sibling', r_unmarshalled_from_parse_tree.Text(
                        $,
                        ($) => abort(['value', $]),
                    )])
                    case "parent sibling": return p_.change_context($['value'], ($) => ['parent sibling', r_unmarshalled_from_parse_tree.Text(
                        $,
                        ($) => abort(['value', $]),
                    )])
                    case "option constraint": return p_.change_context($['value'], ($) => ['option constraint', r_unmarshalled_from_parse_tree.Text(
                        $,
                        ($) => abort(['value', $]),
                    )])
                    case "list cursor": return p_.change_context($['value'], ($) => ['list cursor', r_unmarshalled_from_parse_tree.Nothing(
                        $,
                        ($) => abort(['value', $]),
                    )])
                    case "linked entry": return p_.change_context($['value'], ($) => ['linked entry', r_unmarshalled_from_parse_tree.Nothing(
                        $,
                        ($) => abort(['value', $]),
                    )])
                    case "constraint": return p_.change_context($['value'], ($) => ['constraint', p_.change_context(r_unmarshalled_from_parse_tree.State(
                        $,
                        ($) => abort(['value', $]),
                    ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.namespaces.resolver.types.Guaranteed_Value_Selection.start.constraint => {
                        switch ($text) {
                            case "component": return p_.change_context($['value'], ($) => ['component', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                                $,
                                ($) => abort(['value', $]),
                                {
                                    'expected properties': p_.literal.dictionary({
                                        "property": null,
                                        "constraint": null,
                                    }),
                                },
                            ), ($) => ({
                                'property': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                                    $,
                                    ($) => abort(['value', $]),
                                    {
                                        'id': 'property',
                                    },
                                ), ($) => r_unmarshalled_from_parse_tree.Text(
                                    $,
                                    ($) => abort(['value', $]),
                                )),
                                'constraint': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                                    $,
                                    ($) => abort(['value', $]),
                                    {
                                        'id': 'constraint',
                                    },
                                ), ($) => r_unmarshalled_from_parse_tree.Text(
                                    $,
                                    ($) => abort(['value', $]),
                                )),
                            }))])
                            case "reference": return p_.change_context($['value'], ($) => ['reference', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                                $,
                                ($) => abort(['value', $]),
                                {
                                    'expected properties': p_.literal.dictionary({
                                        "property": null,
                                        "constraint": null,
                                    }),
                                },
                            ), ($) => ({
                                'property': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                                    $,
                                    ($) => abort(['value', $]),
                                    {
                                        'id': 'property',
                                    },
                                ), ($) => r_unmarshalled_from_parse_tree.Text(
                                    $,
                                    ($) => abort(['value', $]),
                                )),
                                'constraint': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                                    $,
                                    ($) => abort(['value', $]),
                                    {
                                        'id': 'constraint',
                                    },
                                ), ($) => r_unmarshalled_from_parse_tree.Text(
                                    $,
                                    ($) => abort(['value', $]),
                                )),
                            }))])
                            default: return abort(
                                ['value', ['liana', {
                                    'type': ['state', ['unknown option', $['option']['token']['value']]],
                                    'range': $['option']['range'],
                                }]],
                            )
                        }
                    }))])
                    case "parameter": return p_.change_context($['value'], ($) => ['parameter', r_unmarshalled_from_parse_tree.Text(
                        $,
                        ($) => abort(['value', $]),
                    )])
                    case "result": return p_.change_context($['value'], ($) => ['result', p_.change_context(r_unmarshalled_from_parse_tree.State(
                        $,
                        ($) => abort(['value', $]),
                    ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.namespaces.resolver.types.Guaranteed_Value_Selection.start.result => {
                        switch ($text) {
                            case "list": return p_.change_context($['value'], ($) => ['list', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                                $,
                                ($) => abort(['value', $]),
                                {
                                    'expected properties': p_.literal.dictionary({
                                        "property": null,
                                    }),
                                },
                            ), ($) => ({
                                'property': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                                    $,
                                    ($) => abort(['value', $]),
                                    {
                                        'id': 'property',
                                    },
                                ), ($) => r_unmarshalled_from_parse_tree.Text(
                                    $,
                                    ($) => abort(['value', $]),
                                )),
                            }))])
                            case "state": return p_.change_context($['value'], ($) => ['state', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                                $,
                                ($) => abort(['value', $]),
                                {
                                    'expected properties': p_.literal.dictionary({
                                        "property": null,
                                    }),
                                },
                            ), ($) => ({
                                'property': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                                    $,
                                    ($) => abort(['value', $]),
                                    {
                                        'id': 'property',
                                    },
                                ), ($) => r_unmarshalled_from_parse_tree.Text(
                                    $,
                                    ($) => abort(['value', $]),
                                )),
                            }))])
                            case "optional value": return p_.change_context($['value'], ($) => ['optional value', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                                $,
                                ($) => abort(['value', $]),
                                {
                                    'expected properties': p_.literal.dictionary({
                                        "property": null,
                                    }),
                                },
                            ), ($) => ({
                                'property': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                                    $,
                                    ($) => abort(['value', $]),
                                    {
                                        'id': 'property',
                                    },
                                ), ($) => r_unmarshalled_from_parse_tree.Text(
                                    $,
                                    ($) => abort(['value', $]),
                                )),
                            }))])
                            default: return abort(
                                ['value', ['liana', {
                                    'type': ['state', ['unknown option', $['option']['token']['value']]],
                                    'range': $['option']['range'],
                                }]],
                            )
                        }
                    }))])
                    default: return abort(
                        ['value', ['liana', {
                            'type': ['state', ['unknown option', $['option']['token']['value']]],
                            'range': $['option']['range'],
                        }]],
                    )
                }
            }))),
            'tail': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'tail',
                },
            ), ($) => __operations.namespaces.resolver.Relative_Value_Selection(
                $,
                abort,
            )),
        }))
        
        export const Benchmark: declarations.Benchmark = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            ($) => abort(['value', $]),
            {
                'expected properties': p_.literal.dictionary({
                    "selection": null,
                    "coverage": null,
                }),
            },
        ), ($) => ({
            'selection': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'selection',
                },
            ), ($) => __operations.namespaces.resolver.Guaranteed_Value_Selection(
                $,
                abort,
            )),
            'coverage': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'coverage',
                },
            ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
                $,
                ($) => abort(['value', $]),
            ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.namespaces.resolver.types.Benchmark.coverage => {
                switch ($text) {
                    case "dense": return p_.change_context($['value'], ($) => ['dense', r_unmarshalled_from_parse_tree.Nothing(
                        $,
                        ($) => abort(['value', $]),
                    )])
                    case "sparse": return p_.change_context($['value'], ($) => ['sparse', r_unmarshalled_from_parse_tree.Nothing(
                        $,
                        ($) => abort(['value', $]),
                    )])
                    default: return abort(
                        ['value', ['liana', {
                            'type': ['state', ['unknown option', $['option']['token']['value']]],
                            'range': $['option']['range'],
                        }]],
                    )
                }
            }))),
        }))
        
        export const Constraint: declarations.Constraint = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            ($) => abort(['value', $]),
            {
                'expected properties': p_.literal.dictionary({
                    "selection": null,
                    "type": null,
                }),
            },
        ), ($) => ({
            'selection': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'selection',
                },
            ), ($) => __operations.namespaces.resolver.Relative_Value_Selection(
                $,
                abort,
            )),
            'type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'type',
                },
            ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
                $,
                ($) => abort(['value', $]),
            ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.namespaces.resolver.types.Constraint.type_ => {
                switch ($text) {
                    case "state": return p_.change_context($['value'], ($) => ['state', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'expected properties': p_.literal.dictionary({
                                "option": null,
                            }),
                        },
                    ), ($) => ({
                        'option': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            ($) => abort(['value', $]),
                            {
                                'id': 'option',
                            },
                        ), ($) => r_unmarshalled_from_parse_tree.Text(
                            $,
                            ($) => abort(['value', $]),
                        )),
                    }))])
                    case "optional value": return p_.change_context($['value'], ($) => ['optional value', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'expected properties': p_.literal.dictionary({}),
                        },
                    ), ($) => ({}))])
                    default: return abort(
                        ['value', ['liana', {
                            'type': ['state', ['unknown option', $['option']['token']['value']]],
                            'range': $['option']['range'],
                        }]],
                    )
                }
            }))),
        }))
        
        export const Lookup_Selection: declarations.Lookup_Selection = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            ($) => abort(['value', $]),
            {
                'expected properties': p_.literal.dictionary({
                    "type": null,
                }),
            },
        ), ($) => ({
            'type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'type',
                },
            ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
                $,
                ($) => abort(['value', $]),
            ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.namespaces.resolver.types.Lookup_Selection.type_ => {
                switch ($text) {
                    case "acyclic": return p_.change_context($['value'], ($) => ['acyclic', p_.change_context(r_unmarshalled_from_parse_tree.State(
                        $,
                        ($) => abort(['value', $]),
                    ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.namespaces.resolver.types.Lookup_Selection.type_.acyclic => {
                        switch ($text) {
                            case "siblings": return p_.change_context($['value'], ($) => ['siblings', r_unmarshalled_from_parse_tree.Nothing(
                                $,
                                ($) => abort(['value', $]),
                            )])
                            case "resolved dictionary": return p_.change_context($['value'], ($) => ['resolved dictionary', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                                $,
                                ($) => abort(['value', $]),
                                {
                                    'expected properties': p_.literal.dictionary({
                                        "selection": null,
                                    }),
                                },
                            ), ($) => ({
                                'selection': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                                    $,
                                    ($) => abort(['value', $]),
                                    {
                                        'id': 'selection',
                                    },
                                ), ($) => __operations.namespaces.resolver.Guaranteed_Value_Selection(
                                    $,
                                    abort,
                                )),
                            }))])
                            default: return abort(
                                ['value', ['liana', {
                                    'type': ['state', ['unknown option', $['option']['token']['value']]],
                                    'range': $['option']['range'],
                                }]],
                            )
                        }
                    }))])
                    case "cyclic": return p_.change_context($['value'], ($) => ['cyclic', p_.change_context(r_unmarshalled_from_parse_tree.State(
                        $,
                        ($) => abort(['value', $]),
                    ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.namespaces.resolver.types.Lookup_Selection.type_.cyclic => {
                        switch ($text) {
                            case "siblings": return p_.change_context($['value'], ($) => ['siblings', r_unmarshalled_from_parse_tree.Nothing(
                                $,
                                ($) => abort(['value', $]),
                            )])
                            default: return abort(
                                ['value', ['liana', {
                                    'type': ['state', ['unknown option', $['option']['token']['value']]],
                                    'range': $['option']['range'],
                                }]],
                            )
                        }
                    }))])
                    case "parameter": return p_.change_context($['value'], ($) => ['parameter', r_unmarshalled_from_parse_tree.Text(
                        $,
                        ($) => abort(['value', $]),
                    )])
                    default: return abort(
                        ['value', ['liana', {
                            'type': ['state', ['unknown option', $['option']['token']['value']]],
                            'range': $['option']['range'],
                        }]],
                    )
                }
            }))),
        }))
        
        export const Namespaces: declarations.Namespaces = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
            $,
            ($) => abort(['value', $]),
        ), ($) => p_.from.dictionary($['entries']).map(
            ($, id) => __operations.namespaces.resolver.Resolver(
                $,
                abort,
            ),
        ))
        
        export const Possible_Value_Selection: declarations.Possible_Value_Selection = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.State(
            $,
            ($) => abort(['value', $]),
        ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.namespaces.resolver.types.Possible_Value_Selection => {
            switch ($text) {
                case "optional value": return p_.change_context($['value'], ($) => ['optional value', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                    $,
                    ($) => abort(['value', $]),
                    {
                        'expected properties': p_.literal.dictionary({
                            "selection": null,
                            "tail": null,
                        }),
                    },
                ), ($) => ({
                    'selection': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'id': 'selection',
                        },
                    ), ($) => __operations.namespaces.resolver.Guaranteed_Value_Selection(
                        $,
                        abort,
                    )),
                    'tail': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'id': 'tail',
                        },
                    ), ($) => __operations.namespaces.resolver.Relative_Value_Selection(
                        $,
                        abort,
                    )),
                }))])
                case "parameter": return p_.change_context($['value'], ($) => ['parameter', r_unmarshalled_from_parse_tree.Text(
                    $,
                    ($) => abort(['value', $]),
                )])
                case "result": return p_.change_context($['value'], ($) => ['result', p_.change_context(r_unmarshalled_from_parse_tree.State(
                    $,
                    ($) => abort(['value', $]),
                ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.namespaces.resolver.types.Possible_Value_Selection.result => {
                    switch ($text) {
                        case "state": return p_.change_context($['value'], ($) => ['state', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                            $,
                            ($) => abort(['value', $]),
                            {
                                'expected properties': p_.literal.dictionary({
                                    "property": null,
                                }),
                            },
                        ), ($) => ({
                            'property': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                                $,
                                ($) => abort(['value', $]),
                                {
                                    'id': 'property',
                                },
                            ), ($) => r_unmarshalled_from_parse_tree.Text(
                                $,
                                ($) => abort(['value', $]),
                            )),
                        }))])
                        case "optional value": return p_.change_context($['value'], ($) => ['optional value', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                            $,
                            ($) => abort(['value', $]),
                            {
                                'expected properties': p_.literal.dictionary({
                                    "property": null,
                                }),
                            },
                        ), ($) => ({
                            'property': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                                $,
                                ($) => abort(['value', $]),
                                {
                                    'id': 'property',
                                },
                            ), ($) => r_unmarshalled_from_parse_tree.Text(
                                $,
                                ($) => abort(['value', $]),
                            )),
                        }))])
                        default: return abort(
                            ['value', ['liana', {
                                'type': ['state', ['unknown option', $['option']['token']['value']]],
                                'range': $['option']['range'],
                            }]],
                        )
                    }
                }))])
                default: return abort(
                    ['value', ['liana', {
                        'type': ['state', ['unknown option', $['option']['token']['value']]],
                        'range': $['option']['range'],
                    }]],
                )
            }
        }))
        
        export const Option_Constraints: declarations.Option_Constraints = ($, abort) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
            $,
            ($) => abort(['value', $]),
        )['optional']).map(($) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
            $,
            ($) => abort(['value', $]),
        ), ($) => p_.from.dictionary($['entries']).map(
            ($, id) => p_.change_context(r_unmarshalled_from_parse_tree.State(
                $,
                ($) => abort(['value', $]),
            ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.namespaces.resolver.types.Option_Constraints.O.D => {
                switch ($text) {
                    case "state": return p_.change_context($['value'], ($) => ['state', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'expected properties': p_.literal.dictionary({
                                "selection": null,
                                "option": null,
                            }),
                        },
                    ), ($) => ({
                        'selection': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            ($) => abort(['value', $]),
                            {
                                'id': 'selection',
                            },
                        ), ($) => __operations.namespaces.resolver.Guaranteed_Value_Selection(
                            $,
                            abort,
                        )),
                        'option': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            ($) => abort(['value', $]),
                            {
                                'id': 'option',
                            },
                        ), ($) => r_unmarshalled_from_parse_tree.Text(
                            $,
                            ($) => abort(['value', $]),
                        )),
                    }))])
                    case "assert is set": return p_.change_context($['value'], ($) => ['assert is set', __operations.namespaces.resolver.Possible_Value_Selection(
                        $,
                        abort,
                    )])
                    default: return abort(
                        ['value', ['liana', {
                            'type': ['state', ['unknown option', $['option']['token']['value']]],
                            'range': $['option']['range'],
                        }]],
                    )
                }
            })),
        )))
        
        export const Optional_Value_Initialization: declarations.Optional_Value_Initialization = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.State(
            $,
            ($) => abort(['value', $]),
        ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.namespaces.resolver.types.Optional_Value_Initialization => {
            switch ($text) {
                case "not set": return p_.change_context($['value'], ($) => ['not set', r_unmarshalled_from_parse_tree.Nothing(
                    $,
                    ($) => abort(['value', $]),
                )])
                case "set": return p_.change_context($['value'], ($) => ['set', __operations.namespaces.resolver.Guaranteed_Value_Selection(
                    $,
                    abort,
                )])
                case "selection": return p_.change_context($['value'], ($) => ['selection', __operations.namespaces.resolver.Possible_Value_Selection(
                    $,
                    abort,
                )])
                default: return abort(
                    ['value', ['liana', {
                        'type': ['state', ['unknown option', $['option']['token']['value']]],
                        'range': $['option']['range'],
                    }]],
                )
            }
        }))
        
        export const Reference_Constraints: declarations.Reference_Constraints = ($, abort) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
            $,
            ($) => abort(['value', $]),
        )['optional']).map(($) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
            $,
            ($) => abort(['value', $]),
        ), ($) => p_.from.dictionary($['entries']).map(
            ($, id) => __operations.namespaces.resolver.Value_Constraint(
                $,
                abort,
            ),
        )))
        
        export const Reference_To_Value_Constraint: declarations.Reference_To_Value_Constraint = ($, abort) => r_unmarshalled_from_parse_tree.Text(
            $,
            ($) => abort(['value', $]),
        )
        
        export const Resolver: declarations.Resolver = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            ($) => abort(['value', $]),
            {
                'expected properties': p_.literal.dictionary({
                    "namespaces": null,
                    "types": null,
                }),
            },
        ), ($) => ({
            'namespaces': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'namespaces',
                },
            ), ($) => __operations.namespaces.resolver.Namespaces(
                $,
                abort,
            )),
            'types': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'types',
                },
            ), ($) => __operations.namespaces.resolver.Types(
                $,
                abort,
            )),
        }))
        
        export const Result_Selection: declarations.Result_Selection = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.State(
            $,
            ($) => abort(['value', $]),
        ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.namespaces.resolver.types.Result_Selection => {
            switch ($text) {
                case "context": return p_.change_context($['value'], ($) => ['context', __operations.namespaces.resolver.Guaranteed_Value_Selection(
                    $,
                    abort,
                )])
                case "value": return p_.change_context($['value'], ($) => ['value', __operations.namespaces.resolver.Relative_Value_Selection(
                    $,
                    abort,
                )])
                default: return abort(
                    ['value', ['liana', {
                        'type': ['state', ['unknown option', $['option']['token']['value']]],
                        'range': $['option']['range'],
                    }]],
                )
            }
        }))
        
        export const Value_Group: declarations.Value_Group = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
            $,
            ($) => abort(['value', $]),
        ), ($) => p_.from.dictionary($['entries']).map(
            ($, id) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                $,
                ($) => abort(['value', $]),
                {
                    'expected properties': p_.literal.dictionary({
                        "resolver": null,
                    }),
                },
            ), ($) => ({
                'resolver': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                    $,
                    ($) => abort(['value', $]),
                    {
                        'id': 'resolver',
                    },
                ), ($) => __operations.namespaces.resolver.Value(
                    $,
                    abort,
                )),
            })),
        ))
        
        export const Value_List_Result: declarations.Value_List_Result = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            ($) => abort(['value', $]),
            {
                'expected properties': p_.literal.dictionary({
                    "initial": null,
                    "next": null,
                }),
            },
        ), ($) => ({
            'initial': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'initial',
                },
            ), ($) => __operations.namespaces.resolver.Guaranteed_Value_Selection(
                $,
                abort,
            )),
            'next': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'next',
                },
            ), ($) => __operations.namespaces.resolver.Result_Selection(
                $,
                abort,
            )),
        }))
        
        export const Value: declarations.Value = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.State(
            $,
            ($) => abort(['value', $]),
        ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.namespaces.resolver.types.Value => {
            switch ($text) {
                case "component": return p_.change_context($['value'], ($) => ['component', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                    $,
                    ($) => abort(['value', $]),
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
                        ($) => abort(['value', $]),
                        {
                            'id': 'location',
                        },
                    ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
                        $,
                        ($) => abort(['value', $]),
                    ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.namespaces.resolver.types.Value.component.location => {
                        switch ($text) {
                            case "local": return p_.change_context($['value'], ($) => ['local', r_unmarshalled_from_parse_tree.Text(
                                $,
                                ($) => abort(['value', $]),
                            )])
                            case "child namespace": return p_.change_context($['value'], ($) => ['child namespace', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                                $,
                                ($) => abort(['value', $]),
                                {
                                    'expected properties': p_.literal.dictionary({
                                        "namespace": null,
                                        "resolver": null,
                                    }),
                                },
                            ), ($) => ({
                                'namespace': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                                    $,
                                    ($) => abort(['value', $]),
                                    {
                                        'id': 'namespace',
                                    },
                                ), ($) => r_unmarshalled_from_parse_tree.Text(
                                    $,
                                    ($) => abort(['value', $]),
                                )),
                                'resolver': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                                    $,
                                    ($) => abort(['value', $]),
                                    {
                                        'id': 'resolver',
                                    },
                                ), ($) => r_unmarshalled_from_parse_tree.Text(
                                    $,
                                    ($) => abort(['value', $]),
                                )),
                            }))])
                            case "sibling namespace": return p_.change_context($['value'], ($) => ['sibling namespace', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                                $,
                                ($) => abort(['value', $]),
                                {
                                    'expected properties': p_.literal.dictionary({
                                        "namespace": null,
                                        "resolver": null,
                                    }),
                                },
                            ), ($) => ({
                                'namespace': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                                    $,
                                    ($) => abort(['value', $]),
                                    {
                                        'id': 'namespace',
                                    },
                                ), ($) => r_unmarshalled_from_parse_tree.Text(
                                    $,
                                    ($) => abort(['value', $]),
                                )),
                                'resolver': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                                    $,
                                    ($) => abort(['value', $]),
                                    {
                                        'id': 'resolver',
                                    },
                                ), ($) => r_unmarshalled_from_parse_tree.Text(
                                    $,
                                    ($) => abort(['value', $]),
                                )),
                            }))])
                            default: return abort(
                                ['value', ['liana', {
                                    'type': ['state', ['unknown option', $['option']['token']['value']]],
                                    'range': $['option']['range'],
                                }]],
                            )
                        }
                    }))),
                    'arguments': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'id': 'arguments',
                        },
                    ), ($) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                        $,
                        ($) => abort(['value', $]),
                    )['optional']).map(($) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'expected properties': p_.literal.dictionary({
                                "types": null,
                                "lookups": null,
                            }),
                        },
                    ), ($) => ({
                        'types': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            ($) => abort(['value', $]),
                            {
                                'id': 'types',
                            },
                        ), ($) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                            $,
                            ($) => abort(['value', $]),
                        )['optional']).map(($) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
                            $,
                            ($) => abort(['value', $]),
                        ), ($) => p_.from.dictionary($['entries']).map(
                            ($, id) => p_.change_context(r_unmarshalled_from_parse_tree.State(
                                $,
                                ($) => abort(['value', $]),
                            ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.namespaces.resolver.types.Value.component.arguments_.O.types.O.D => {
                                switch ($text) {
                                    case "optional": return p_.change_context($['value'], ($) => ['optional', __operations.namespaces.resolver.Optional_Value_Initialization(
                                        $,
                                        abort,
                                    )])
                                    case "required": return p_.change_context($['value'], ($) => ['required', __operations.namespaces.resolver.Guaranteed_Value_Selection(
                                        $,
                                        abort,
                                    )])
                                    case "parameter": return p_.change_context($['value'], ($) => ['parameter', r_unmarshalled_from_parse_tree.Text(
                                        $,
                                        ($) => abort(['value', $]),
                                    )])
                                    default: return abort(
                                        ['value', ['liana', {
                                            'type': ['state', ['unknown option', $['option']['token']['value']]],
                                            'range': $['option']['range'],
                                        }]],
                                    )
                                }
                            })),
                        )))),
                        'lookups': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            ($) => abort(['value', $]),
                            {
                                'id': 'lookups',
                            },
                        ), ($) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                            $,
                            ($) => abort(['value', $]),
                        )['optional']).map(($) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
                            $,
                            ($) => abort(['value', $]),
                        ), ($) => p_.from.dictionary($['entries']).map(
                            ($, id) => p_.change_context(r_unmarshalled_from_parse_tree.State(
                                $,
                                ($) => abort(['value', $]),
                            ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.namespaces.resolver.types.Value.component.arguments_.O.lookups.O.D => {
                                switch ($text) {
                                    case "acyclic": return p_.change_context($['value'], ($) => ['acyclic', r_unmarshalled_from_parse_tree.Nothing(
                                        $,
                                        ($) => abort(['value', $]),
                                    )])
                                    case "cyclic": return p_.change_context($['value'], ($) => ['cyclic', r_unmarshalled_from_parse_tree.Nothing(
                                        $,
                                        ($) => abort(['value', $]),
                                    )])
                                    case "selection": return p_.change_context($['value'], ($) => ['selection', __operations.namespaces.resolver.Lookup_Selection(
                                        $,
                                        abort,
                                    )])
                                    default: return abort(
                                        ['value', ['liana', {
                                            'type': ['state', ['unknown option', $['option']['token']['value']]],
                                            'range': $['option']['range'],
                                        }]],
                                    )
                                }
                            })),
                        )))),
                    })))),
                    'constraints': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'id': 'constraints',
                        },
                    ), ($) => __operations.namespaces.resolver.Reference_Constraints(
                        $,
                        abort,
                    )),
                }))])
                case "dictionary": return p_.change_context($['value'], ($) => ['dictionary', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                    $,
                    ($) => abort(['value', $]),
                    {
                        'expected properties': p_.literal.dictionary({
                            "resolver": null,
                            "benchmark": null,
                        }),
                    },
                ), ($) => ({
                    'resolver': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'id': 'resolver',
                        },
                    ), ($) => __operations.namespaces.resolver.Value(
                        $,
                        abort,
                    )),
                    'benchmark': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'id': 'benchmark',
                        },
                    ), ($) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                        $,
                        ($) => abort(['value', $]),
                    )['optional']).map(($) => __operations.namespaces.resolver.Benchmark(
                        $,
                        abort,
                    ))),
                }))])
                case "group": return p_.change_context($['value'], ($) => ['group', __operations.namespaces.resolver.Value_Group(
                    $,
                    abort,
                )])
                case "list": return p_.change_context($['value'], ($) => ['list', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                    $,
                    ($) => abort(['value', $]),
                    {
                        'expected properties': p_.literal.dictionary({
                            "resolver": null,
                            "result": null,
                        }),
                    },
                ), ($) => ({
                    'resolver': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'id': 'resolver',
                        },
                    ), ($) => __operations.namespaces.resolver.Value(
                        $,
                        abort,
                    )),
                    'result': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'id': 'result',
                        },
                    ), ($) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                        $,
                        ($) => abort(['value', $]),
                    )['optional']).map(($) => __operations.namespaces.resolver.Value_List_Result(
                        $,
                        abort,
                    ))),
                }))])
                case "nothing": return p_.change_context($['value'], ($) => ['nothing', r_unmarshalled_from_parse_tree.Nothing(
                    $,
                    ($) => abort(['value', $]),
                )])
                case "simple": return p_.change_context($['value'], ($) => ['simple', r_unmarshalled_from_parse_tree.Nothing(
                    $,
                    ($) => abort(['value', $]),
                )])
                case "optional": return p_.change_context($['value'], ($) => ['optional', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                    $,
                    ($) => abort(['value', $]),
                    {
                        'expected properties': p_.literal.dictionary({
                            "presence": null,
                            "constraints": null,
                            "resolver": null,
                            "not set constraints": null,
                            "result": null,
                        }),
                    },
                ), ($) => ({
                    'presence': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'id': 'presence',
                        },
                    ), ($) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                        $,
                        ($) => abort(['value', $]),
                    )['optional']).map(($) => __operations.namespaces.resolver.Possible_Value_Selection(
                        $,
                        abort,
                    ))),
                    'constraints': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'id': 'constraints',
                        },
                    ), ($) => __operations.namespaces.resolver.Option_Constraints(
                        $,
                        abort,
                    )),
                    'resolver': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'id': 'resolver',
                        },
                    ), ($) => __operations.namespaces.resolver.Value(
                        $,
                        abort,
                    )),
                    'not set constraints': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'id': 'not set constraints',
                        },
                    ), ($) => __operations.namespaces.resolver.Absence_Constraints(
                        $,
                        abort,
                    )),
                    'result': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'id': 'result',
                        },
                    ), ($) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                        $,
                        ($) => abort(['value', $]),
                    )['optional']).map(($) => __operations.namespaces.resolver.Result_Selection(
                        $,
                        abort,
                    ))),
                }))])
                case "reference": return p_.change_context($['value'], ($) => ['reference', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                    $,
                    ($) => abort(['value', $]),
                    {
                        'expected properties': p_.literal.dictionary({
                            "type": null,
                        }),
                    },
                ), ($) => ({
                    'type': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'id': 'type',
                        },
                    ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'expected properties': p_.literal.dictionary({
                                "lookup": null,
                                "constraints": null,
                            }),
                        },
                    ), ($) => ({
                        'lookup': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            ($) => abort(['value', $]),
                            {
                                'id': 'lookup',
                            },
                        ), ($) => __operations.namespaces.resolver.Lookup_Selection(
                            $,
                            abort,
                        )),
                        'constraints': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                            $,
                            ($) => abort(['value', $]),
                            {
                                'id': 'constraints',
                            },
                        ), ($) => __operations.namespaces.resolver.Reference_Constraints(
                            $,
                            abort,
                        )),
                    }))),
                }))])
                case "state": return p_.change_context($['value'], ($) => ['state', p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                    $,
                    ($) => abort(['value', $]),
                    {
                        'expected properties': p_.literal.dictionary({
                            "options": null,
                        }),
                    },
                ), ($) => ({
                    'options': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                        $,
                        ($) => abort(['value', $]),
                        {
                            'id': 'options',
                        },
                    ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
                        $,
                        ($) => abort(['value', $]),
                    ), ($) => p_.from.dictionary($['entries']).map(
                        ($, id) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                            $,
                            ($) => abort(['value', $]),
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
                                ($) => abort(['value', $]),
                                {
                                    'id': 'constraints',
                                },
                            ), ($) => __operations.namespaces.resolver.Option_Constraints(
                                $,
                                abort,
                            )),
                            'resolver': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                                $,
                                ($) => abort(['value', $]),
                                {
                                    'id': 'resolver',
                                },
                            ), ($) => __operations.namespaces.resolver.Value(
                                $,
                                abort,
                            )),
                            'result': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                                $,
                                ($) => abort(['value', $]),
                                {
                                    'id': 'result',
                                },
                            ), ($) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                                $,
                                ($) => abort(['value', $]),
                            )['optional']).map(($) => __operations.namespaces.resolver.Result_Selection(
                                $,
                                abort,
                            ))),
                        })),
                    ))),
                }))])
                default: return abort(
                    ['value', ['liana', {
                        'type': ['state', ['unknown option', $['option']['token']['value']]],
                        'range': $['option']['range'],
                    }]],
                )
            }
        }))
        
        export const Types: declarations.Types = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
            $,
            ($) => abort(['value', $]),
        ), ($) => p_.from.dictionary($['entries']).map(
            ($, id) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
                $,
                ($) => abort(['value', $]),
                {
                    'expected properties': p_.literal.dictionary({
                        "root value resolver": null,
                    }),
                },
            ), ($) => ({
                'root value resolver': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                    $,
                    ($) => abort(['value', $]),
                    {
                        'id': 'root value resolver',
                    },
                ), ($) => __operations.namespaces.resolver.Value(
                    $,
                    abort,
                )),
            })),
        ))
        
        export const Value_Constraint: declarations.Value_Constraint = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Verbose_Group(
            $,
            ($) => abort(['value', $]),
            {
                'expected properties': p_.literal.dictionary({
                    "start": null,
                    "constraint": null,
                }),
            },
        ), ($) => ({
            'start': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'start',
                },
            ), ($) => p_.change_context(r_unmarshalled_from_parse_tree.State(
                $,
                ($) => abort(['value', $]),
            ), ($) => p_.from.text($['option']['token']['value']).to_state(($text): s_target.namespaces.resolver.types.Value_Constraint.start => {
                switch ($text) {
                    case "value": return p_.change_context($['value'], ($) => ['value', r_unmarshalled_from_parse_tree.Nothing(
                        $,
                        ($) => abort(['value', $]),
                    )])
                    case "sibling": return p_.change_context($['value'], ($) => ['sibling', __operations.namespaces.resolver.Reference_To_Value_Constraint(
                        $,
                        abort,
                    )])
                    default: return abort(
                        ['value', ['liana', {
                            'type': ['state', ['unknown option', $['option']['token']['value']]],
                            'range': $['option']['range'],
                        }]],
                    )
                }
            }))),
            'constraint': p_.change_context(r_unmarshalled_from_parse_tree.Property(
                $,
                ($) => abort(['value', $]),
                {
                    'id': 'constraint',
                },
            ), ($) => __operations.namespaces.resolver.Constraint(
                $,
                abort,
            )),
        }))
        
        export const Value_Constraints: declarations.Value_Constraints = ($, abort) => p_.change_context(r_unmarshalled_from_parse_tree.Dictionary(
            $,
            ($) => abort(['value', $]),
        ), ($) => p_.from.dictionary($['entries']).map(
            ($, id) => __operations.namespaces.resolver.Value_Constraint(
                $,
                abort,
            ),
        ))
        export namespace namespaces {}
    }
}
