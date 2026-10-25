import * as __operations from "./astn_sealed_target.js"
import * as p_ from 'pareto-core/transformer'
import p_unreachable_code_path from 'pareto-core/transformer/specials/unreachable_code_path'

// schemas
import * as s_source from "../schema.js"
import * as s_target from "astn-runtime/modules/serialization/schemas/sealed_target/schema"

// serializer dependencies
import * as ser_primitives from "liana-runtime/modules/serialization/schemas/primitives/serializers"

export namespace declarations {
    
    export type Directory = p_.Transformer<
        s_source.types.Directory,
        s_target.Value
    >
    
    export type Node = p_.Transformer<
        s_source.types.Node,
        s_target.Value
    >
    
    export type Schema = p_.Transformer<
        s_source.types.Schema,
        s_target.Value
    >
    
    export type Type_Specification = p_.Transformer<
        s_source.types.Type_Specification,
        s_target.Value
    >
}

// implementations

export const Directory: declarations.Directory = ($) => ['state', p_.from.state($).decide(($): s_target.Value.state => {
    switch ($[0]) {
        case 'group': return p_.option($, ($): s_target.Value.state => ({
            'option': 'group',
            'value': ['group', ['verbose', p_.literal.dictionary({
                "nodes": p_.change_context($['nodes'], ($) => ['dictionary', p_.from.dictionary($).map(
                    ($, id) => __operations.Node(
                        $,
                    ),
                )]),
            })]],
        }))
        case 'dictionary': return p_.option($, ($): s_target.Value.state => ({
            'option': 'dictionary',
            'value': ['group', ['verbose', p_.literal.dictionary({
                "node": p_.change_context($['node'], ($) => __operations.Node(
                    $,
                )),
            })]],
        }))
        default: return p_.exhaustive($[0])
    }
})]

export const Node: declarations.Node = ($) => ['state', p_.from.state($).decide(($): s_target.Value.state => {
    switch ($[0]) {
        case 'file': return p_.option($, ($): s_target.Value.state => ({
            'option': 'file',
            'value': ['group', ['verbose', p_.literal.dictionary({
                "file extension": p_.change_context($['file extension'], ($) => ['text', {
                    'delimiter': ['quote', null],
                    'value': $,
                }]),
                "type": p_.change_context($['type'], ($) => ['reference', {
                    'value': $['l id'],
                }]),
            })]],
        }))
        case 'directory': return p_.option($, ($): s_target.Value.state => ({
            'option': 'directory',
            'value': __operations.Directory(
                $,
            ),
        }))
        default: return p_.exhaustive($[0])
    }
})]

export const Schema: declarations.Schema = ($) => ['group', ['verbose', p_.literal.dictionary({
    "structure": p_.change_context($['structure'], ($) => __operations.namespaces.structure.Structure(
        $,
    )),
    "resolver": p_.change_context($['resolver'], ($) => ['group', ['verbose', p_.literal.dictionary({
        "declarations": p_.change_context($['declarations'], ($) => __operations.namespaces.declarations.Declaration_Namespace(
            $,
        )),
        "implementations": p_.change_context($['implementations'], ($) => __operations.namespaces.resolver.Resolver(
            $,
        )),
    })]]),
})]]

export const Type_Specification: declarations.Type_Specification = ($) => ['group', ['verbose', p_.literal.dictionary({
    "schema": p_.change_context($['schema'], ($) => __operations.Schema(
        $,
    )),
    "directory": p_.change_context($['directory'], ($) => __operations.Directory(
        $,
    )),
})]]
export namespace namespaces {
    export namespace structure {
        
        export namespace declarations {
            
            export type Regular_Expression = p_.Transformer<
                s_source.namespaces.structure.types.Regular_Expression,
                s_target.Value
            >
            
            export type Basic_Type = p_.Transformer<
                s_source.namespaces.structure.types.Basic_Type,
                s_target.Value
            >
            
            export type Basic_Types = p_.Transformer<
                s_source.namespaces.structure.types.Basic_Types,
                s_target.Value
            >
            
            export type Dictionary = p_.Transformer<
                s_source.namespaces.structure.types.Dictionary,
                s_target.Value
            >
            
            export type Group = p_.Transformer<
                s_source.namespaces.structure.types.Group,
                s_target.Value
            >
            
            export type Namespaces = p_.Transformer<
                s_source.namespaces.structure.types.Namespaces,
                s_target.Value
            >
            
            export type Types = p_.Transformer<
                s_source.namespaces.structure.types.Types,
                s_target.Value
            >
            
            export type Type = p_.Transformer<
                s_source.namespaces.structure.types.Type,
                s_target.Value
            >
            
            export type Type_Reference = p_.Transformer<
                s_source.namespaces.structure.types.Type_Reference,
                s_target.Value
            >
            
            export type Value = p_.Transformer<
                s_source.namespaces.structure.types.Value,
                s_target.Value
            >
            
            export type Value_Subselection = p_.Transformer<
                s_source.namespaces.structure.types.Value_Subselection,
                s_target.Value
            >
            
            export type Value_Reference = p_.Transformer<
                s_source.namespaces.structure.types.Value_Reference,
                s_target.Value
            >
            
            export type Option_Constraints = p_.Transformer<
                s_source.namespaces.structure.types.Option_Constraints,
                s_target.Value
            >
            
            export type Reference = p_.Transformer<
                s_source.namespaces.structure.types.Reference,
                s_target.Value
            >
            
            export type Reference_Constraints = p_.Transformer<
                s_source.namespaces.structure.types.Reference_Constraints,
                s_target.Value
            >
            
            export type Structure = p_.Transformer<
                s_source.namespaces.structure.types.Structure,
                s_target.Value
            >
            
            export type Value_Result = p_.Transformer<
                s_source.namespaces.structure.types.Value_Result,
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
                        ($) => __operations.namespaces.structure.Regular_Expression(
                            $,
                        ),
                    )],
                }))
                case 'choice': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'choice',
                    'value': ['list', p_.from.list($).map(
                        ($) => __operations.namespaces.structure.Regular_Expression(
                            $,
                        ),
                    )],
                }))
                case 'repetition': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'repetition',
                    'value': ['group', ['verbose', p_.literal.dictionary({
                        "expression": p_.change_context($['expression'], ($) => __operations.namespaces.structure.Regular_Expression(
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
            "regular expression": p_.change_context($['regular expression'], ($) => ['optional', p_.from.optional($).decide(($): s_target.Value.optional => ['set', __operations.namespaces.structure.Regular_Expression(
                $,
            )], (): s_target.Value.optional => ['not set', null])]),
            "hyperlink": p_.change_context($['hyperlink'], ($) => ['optional', p_.from.optional($).decide(($): s_target.Value.optional => ['set', ['group', ['verbose', p_.literal.dictionary({
                "prefix": p_.change_context($['prefix'], ($) => ['text', {
                    'delimiter': ['quote', null],
                    'value': $,
                }]),
                "suffix": p_.change_context($['suffix'], ($) => ['text', {
                    'delimiter': ['quote', null],
                    'value': $,
                }]),
            })]]], (): s_target.Value.optional => ['not set', null])]),
        })]]
        
        export const Basic_Types: declarations.Basic_Types = ($) => ['dictionary', p_.from.dictionary($).map(
            ($, id) => __operations.namespaces.structure.Basic_Type(
                $,
            ),
        )]
        
        export const Dictionary: declarations.Dictionary = ($) => ['group', ['verbose', p_.literal.dictionary({
            "value": p_.change_context($['value'], ($) => __operations.namespaces.structure.Value(
                $,
            )),
        })]]
        
        export const Group: declarations.Group = ($) => ['dictionary', p_.from.dictionary($).map(
            ($, id) => ['group', ['verbose', p_.literal.dictionary({
                "description": p_.change_context($['description'], ($) => ['optional', p_.from.optional($).decide(($): s_target.Value.optional => ['set', ['text', {
                    'delimiter': ['quote', null],
                    'value': $,
                }]], (): s_target.Value.optional => ['not set', null])]),
                "value": p_.change_context($['value'], ($) => __operations.namespaces.structure.Value(
                    $,
                )),
            })]],
        )]
        
        export const Namespaces: declarations.Namespaces = ($) => ['dictionary', p_.from.dictionary($).map(
            ($, id) => __operations.namespaces.structure.Structure(
                $,
            ),
        )]
        
        export const Types: declarations.Types = ($) => ['dictionary', p_.from.dictionary($).map(
            ($, id) => __operations.namespaces.structure.Type(
                $,
            ),
        )]
        
        export const Type: declarations.Type = ($) => ['group', ['verbose', p_.literal.dictionary({
            "root value": p_.change_context($['root value'], ($) => __operations.namespaces.structure.Value(
                $,
            )),
        })]]
        
        export const Type_Reference: declarations.Type_Reference = ($) => ['group', ['verbose', p_.literal.dictionary({
            "location": p_.change_context($['location'], ($) => ['state', p_.from.state($['value']).decide(($): s_target.Value.state => {
                switch ($[0]) {
                    case 'local': return p_.option($, ($): s_target.Value.state => ({
                        'option': 'local',
                        'value': ['reference', {
                            'value': $['l id'],
                        }],
                    }))
                    case 'child namespace': return p_.option($, ($): s_target.Value.state => ({
                        'option': 'child namespace',
                        'value': ['group', ['verbose', p_.literal.dictionary({
                            "namespace": p_.change_context($['namespace'], ($) => ['reference', {
                                'value': $['l id'],
                            }]),
                            "type": p_.change_context($['type'], ($) => ['reference', {
                                'value': $['l id'],
                            }]),
                        })]],
                    }))
                    case 'sibling namespace': return p_.option($, ($): s_target.Value.state => ({
                        'option': 'sibling namespace',
                        'value': ['group', ['verbose', p_.literal.dictionary({
                            "namespace": p_.change_context($['namespace'], ($) => ['reference', {
                                'value': $['l id'],
                            }]),
                            "type": p_.change_context($['type'], ($) => ['reference', {
                                'value': $['l id'],
                            }]),
                        })]],
                    }))
                    default: return p_.exhaustive($[0])
                }
            })]),
        })]]
        
        export const Value: declarations.Value = ($) => ['state', p_.from.state($).decide(($): s_target.Value.state => {
            switch ($[0]) {
                case 'component': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'component',
                    'value': ['group', ['verbose', p_.literal.dictionary({
                        "type": p_.change_context($['type'], ($) => ['state', p_.from.state($['value']).decide(($): s_target.Value.state => {
                            switch ($[0]) {
                                case 'local': return p_.option($, ($): s_target.Value.state => ({
                                    'option': 'local',
                                    'value': ['reference', {
                                        'value': $['l id'],
                                    }],
                                }))
                                case 'child namespace': return p_.option($, ($): s_target.Value.state => ({
                                    'option': 'child namespace',
                                    'value': ['group', ['verbose', p_.literal.dictionary({
                                        "namespace": p_.change_context($['namespace'], ($) => ['reference', {
                                            'value': $['l id'],
                                        }]),
                                        "type": p_.change_context($['type'], ($) => ['reference', {
                                            'value': $['l id'],
                                        }]),
                                    })]],
                                }))
                                case 'local cyclic': return p_.option($, ($): s_target.Value.state => ({
                                    'option': 'local cyclic',
                                    'value': ['reference', {
                                        'value': $['l id'],
                                    }],
                                }))
                                case 'sibling namespace': return p_.option($, ($): s_target.Value.state => ({
                                    'option': 'sibling namespace',
                                    'value': ['group', ['verbose', p_.literal.dictionary({
                                        "namespace": p_.change_context($['namespace'], ($) => ['reference', {
                                            'value': $['l id'],
                                        }]),
                                        "type": p_.change_context($['type'], ($) => ['reference', {
                                            'value': $['l id'],
                                        }]),
                                    })]],
                                }))
                                default: return p_.exhaustive($[0])
                            }
                        })]),
                        "constraints": p_.change_context($['constraints'], ($) => __operations.namespaces.structure.Reference_Constraints(
                            $,
                        )),
                    })]],
                }))
                case 'dictionary': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'dictionary',
                    'value': __operations.namespaces.structure.Dictionary(
                        $,
                    ),
                }))
                case 'group': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'group',
                    'value': __operations.namespaces.structure.Group(
                        $,
                    ),
                }))
                case 'list': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'list',
                    'value': ['group', ['verbose', p_.literal.dictionary({
                        "value": p_.change_context($['value'], ($) => __operations.namespaces.structure.Value(
                            $,
                        )),
                        "result": p_.change_context($['result'], ($) => __operations.namespaces.structure.Value_Result(
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
                    'value': p_.change_context($['value'], ($) => ['reference', {
                        'value': $['l id'],
                    }]),
                }))
                case 'optional': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'optional',
                    'value': ['group', ['verbose', p_.literal.dictionary({
                        "constraints": p_.change_context($['constraints'], ($) => __operations.namespaces.structure.Option_Constraints(
                            $,
                        )),
                        "value": p_.change_context($['value'], ($) => __operations.namespaces.structure.Value(
                            $,
                        )),
                        "result": p_.change_context($['result'], ($) => __operations.namespaces.structure.Value_Result(
                            $,
                        )),
                    })]],
                }))
                case 'reference': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'reference',
                    'value': __operations.namespaces.structure.Reference(
                        $,
                    ),
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
                                "constraints": p_.change_context($['constraints'], ($) => __operations.namespaces.structure.Option_Constraints(
                                    $,
                                )),
                                "value": p_.change_context($['value'], ($) => __operations.namespaces.structure.Value(
                                    $,
                                )),
                            })]],
                        )]),
                        "result": p_.change_context($['result'], ($) => __operations.namespaces.structure.Value_Result(
                            $,
                        )),
                    })]],
                }))
                default: return p_.exhaustive($[0])
            }
        })]
        
        export const Value_Subselection: declarations.Value_Subselection = ($) => ['group', ['verbose', p_.literal.dictionary({
            "tail": p_.change_context($['tail'], ($) => ['list', p_.from.list($['value']).map(
                ($) => p_.change_context($['value'], ($) => ['state', p_.from.state($['value']).decide(($): s_target.Value.state => {
                    switch ($[0]) {
                        case 'dictionary': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'dictionary',
                            'value': p_.change_context($['value'], ($) => ['nothing', null]),
                        }))
                        case 'group': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'group',
                            'value': p_.change_context($['value'], ($) => ['reference', {
                                'value': $['l id'],
                            }]),
                        }))
                        case 'list': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'list',
                            'value': p_.change_context($['value'], ($) => ['nothing', null]),
                        }))
                        case 'optional': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'optional',
                            'value': p_.change_context($['value'], ($) => ['nothing', null]),
                        }))
                        case 'state': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'state',
                            'value': p_.change_context($['value'], ($) => ['reference', {
                                'value': $['l id'],
                            }]),
                        }))
                        default: return p_.exhaustive($[0])
                    }
                })]),
            )]),
        })]]
        
        export const Value_Reference: declarations.Value_Reference = ($) => ['group', ['verbose', p_.literal.dictionary({
            "type": p_.change_context($['type'], ($) => __operations.namespaces.structure.Type_Reference(
                $,
            )),
            "path": p_.change_context($['path'], ($) => __operations.namespaces.structure.Value_Subselection(
                $,
            )),
        })]]
        
        export const Option_Constraints: declarations.Option_Constraints = ($) => ['optional', p_.from.optional($).decide(($): s_target.Value.optional => ['set', ['dictionary', p_.from.dictionary($).map(
            ($, id) => __operations.namespaces.structure.Value_Reference(
                $,
            ),
        )]], (): s_target.Value.optional => ['not set', null])]
        
        export const Reference: declarations.Reference = ($) => ['group', ['verbose', p_.literal.dictionary({
            "referent": p_.change_context($['referent'], ($) => p_.change_context($['value'], ($) => __operations.namespaces.structure.Value_Reference(
                $,
            ))),
            "type": p_.change_context($['type'], ($) => ['group', ['verbose', p_.literal.dictionary({
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
                "constraints": p_.change_context($['constraints'], ($) => __operations.namespaces.structure.Reference_Constraints(
                    $,
                )),
            })]]),
        })]]
        
        export const Reference_Constraints: declarations.Reference_Constraints = ($) => ['optional', p_.from.optional($).decide(($): s_target.Value.optional => ['set', ['dictionary', p_.from.dictionary($).map(
            ($, id) => __operations.namespaces.structure.Value_Reference(
                $,
            ),
        )]], (): s_target.Value.optional => ['not set', null])]
        
        export const Structure: declarations.Structure = ($) => ['group', ['verbose', p_.literal.dictionary({
            "namespaces": p_.change_context($['namespaces'], ($) => __operations.namespaces.structure.Namespaces(
                $,
            )),
            "basic types": p_.change_context($['basic types'], ($) => __operations.namespaces.structure.Basic_Types(
                $,
            )),
            "types": p_.change_context($['types'], ($) => __operations.namespaces.structure.Types(
                $,
            )),
        })]]
        
        export const Value_Result: declarations.Value_Result = ($) => ['optional', p_.from.optional($).decide(($): s_target.Value.optional => ['set', __operations.namespaces.structure.Value_Reference(
            $,
        )], (): s_target.Value.optional => ['not set', null])]
        export namespace namespaces {}
    }
    export namespace declarations {
        
        export namespace declarations {
            
            export type Presence = p_.Transformer<
                s_source.namespaces.declarations.types.Presence,
                s_target.Value
            >
            
            export type Signature_Type_Reference = p_.Transformer<
                s_source.namespaces.declarations.types.Signature_Type_Reference,
                s_target.Value
            >
            
            export type Signature_Value_Subselection = p_.Transformer<
                s_source.namespaces.declarations.types.Signature_Value_Subselection,
                s_target.Value
            >
            
            export type Signature_Value_Reference = p_.Transformer<
                s_source.namespaces.declarations.types.Signature_Value_Reference,
                s_target.Value
            >
            
            export type Signature = p_.Transformer<
                s_source.namespaces.declarations.types.Signature,
                s_target.Value
            >
            
            export type Declarations = p_.Transformer<
                s_source.namespaces.declarations.types.Declarations,
                s_target.Value
            >
            
            export type Declaration = p_.Transformer<
                s_source.namespaces.declarations.types.Declaration,
                s_target.Value
            >
            
            export type Namespaces = p_.Transformer<
                s_source.namespaces.declarations.types.Namespaces,
                s_target.Value
            >
            
            export type Declaration_Namespace = p_.Transformer<
                s_source.namespaces.declarations.types.Declaration_Namespace,
                s_target.Value
            >
        }
        
        // implementations
        
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
        
        export const Signature_Type_Reference: declarations.Signature_Type_Reference = ($) => ['group', ['verbose', p_.literal.dictionary({
            "location": p_.change_context($['location'], ($) => ['state', p_.from.state($['value']).decide(($): s_target.Value.state => {
                switch ($[0]) {
                    case 'local': return p_.option($, ($): s_target.Value.state => ({
                        'option': 'local',
                        'value': ['reference', {
                            'value': $['l id'],
                        }],
                    }))
                    case 'child namespace': return p_.option($, ($): s_target.Value.state => ({
                        'option': 'child namespace',
                        'value': ['group', ['verbose', p_.literal.dictionary({
                            "namespace": p_.change_context($['namespace'], ($) => ['reference', {
                                'value': $['l id'],
                            }]),
                            "type": p_.change_context($['type'], ($) => ['reference', {
                                'value': $['l id'],
                            }]),
                        })]],
                    }))
                    case 'sibling namespace': return p_.option($, ($): s_target.Value.state => ({
                        'option': 'sibling namespace',
                        'value': ['group', ['verbose', p_.literal.dictionary({
                            "namespace": p_.change_context($['namespace'], ($) => ['reference', {
                                'value': $['l id'],
                            }]),
                            "type": p_.change_context($['type'], ($) => ['reference', {
                                'value': $['l id'],
                            }]),
                        })]],
                    }))
                    default: return p_.exhaustive($[0])
                }
            })]),
        })]]
        
        export const Signature_Value_Subselection: declarations.Signature_Value_Subselection = ($) => ['group', ['verbose', p_.literal.dictionary({
            "tail": p_.change_context($['tail'], ($) => ['list', p_.from.list($['value']).map(
                ($) => p_.change_context($['value'], ($) => ['state', p_.from.state($['value']).decide(($): s_target.Value.state => {
                    switch ($[0]) {
                        case 'dictionary': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'dictionary',
                            'value': p_.change_context($['value'], ($) => ['nothing', null]),
                        }))
                        case 'group': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'group',
                            'value': p_.change_context($['value'], ($) => ['reference', {
                                'value': $['l id'],
                            }]),
                        }))
                        case 'list': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'list',
                            'value': p_.change_context($['value'], ($) => ['nothing', null]),
                        }))
                        case 'optional': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'optional',
                            'value': p_.change_context($['value'], ($) => ['nothing', null]),
                        }))
                        case 'state': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'state',
                            'value': p_.change_context($['value'], ($) => ['reference', {
                                'value': $['l id'],
                            }]),
                        }))
                        default: return p_.exhaustive($[0])
                    }
                })]),
            )]),
        })]]
        
        export const Signature_Value_Reference: declarations.Signature_Value_Reference = ($) => ['group', ['verbose', p_.literal.dictionary({
            "type": p_.change_context($['type'], ($) => __operations.namespaces.declarations.Signature_Type_Reference(
                $,
            )),
            "subselection": p_.change_context($['subselection'], ($) => __operations.namespaces.declarations.Signature_Value_Subselection(
                $,
            )),
        })]]
        
        export const Signature: declarations.Signature = ($) => ['group', ['verbose', p_.literal.dictionary({
            "values": p_.change_context($['values'], ($) => ['dictionary', p_.from.dictionary($).map(
                ($, id) => ['group', ['verbose', p_.literal.dictionary({
                    "value": p_.change_context($['value'], ($) => __operations.namespaces.declarations.Signature_Value_Reference(
                        $,
                    )),
                    "presence": p_.change_context($['presence'], ($) => __operations.namespaces.declarations.Presence(
                        $,
                    )),
                })]],
            )]),
            "lookups": p_.change_context($['lookups'], ($) => ['dictionary', p_.from.dictionary($).map(
                ($, id) => ['group', ['verbose', p_.literal.dictionary({
                    "referent": p_.change_context($['referent'], ($) => p_.change_context($['value'], ($) => __operations.namespaces.declarations.Signature_Value_Reference(
                        $,
                    ))),
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
                    "presence": p_.change_context($['presence'], ($) => __operations.namespaces.declarations.Presence(
                        $,
                    )),
                })]],
            )]),
        })]]
        
        export const Declarations: declarations.Declarations = ($) => ['dictionary', p_.from.dictionary($).map(
            ($, id) => p_.change_context($['value'], ($) => __operations.namespaces.declarations.Declaration(
                $,
            )),
        )]
        
        export const Declaration: declarations.Declaration = ($) => ['group', ['verbose', p_.literal.dictionary({
            "signature": p_.change_context($['signature'], ($) => ['state', p_.from.state($['value']).decide(($): s_target.Value.state => {
                switch ($[0]) {
                    case 'local': return p_.option($, ($): s_target.Value.state => ({
                        'option': 'local',
                        'value': __operations.namespaces.declarations.Signature(
                            $,
                        ),
                    }))
                    case 'same as': return p_.option($, ($): s_target.Value.state => ({
                        'option': 'same as',
                        'value': ['reference', {
                            'value': $['l id'],
                        }],
                    }))
                    default: return p_.exhaustive($[0])
                }
            })]),
        })]]
        
        export const Namespaces: declarations.Namespaces = ($) => ['dictionary', p_.from.dictionary($).map(
            ($, id) => p_.change_context($['value'], ($) => __operations.namespaces.declarations.Declaration_Namespace(
                $,
            )),
        )]
        
        export const Declaration_Namespace: declarations.Declaration_Namespace = ($) => ['group', ['verbose', p_.literal.dictionary({
            "namespaces": p_.change_context($['namespaces'], ($) => __operations.namespaces.declarations.Namespaces(
                $,
            )),
            "types": p_.change_context($['types'], ($) => __operations.namespaces.declarations.Declarations(
                $,
            )),
        })]]
        export namespace namespaces {}
    }
    export namespace resolver {
        
        export namespace declarations {
            
            export type Absence_Constraints = p_.Transformer<
                s_source.namespaces.resolver.types.Absence_Constraints,
                s_target.Value
            >
            
            export type Type_Reference = p_.Transformer<
                s_source.namespaces.resolver.types.Type_Reference,
                s_target.Value
            >
            
            export type Value_Subselection = p_.Transformer<
                s_source.namespaces.resolver.types.Value_Subselection,
                s_target.Value
            >
            
            export type Value_Reference = p_.Transformer<
                s_source.namespaces.resolver.types.Value_Reference,
                s_target.Value
            >
            
            export type Relative_Value_Selection = p_.Transformer<
                s_source.namespaces.resolver.types.Relative_Value_Selection,
                s_target.Value
            >
            
            export type Guaranteed_Value_Selection = p_.Transformer<
                s_source.namespaces.resolver.types.Guaranteed_Value_Selection,
                s_target.Value
            >
            
            export type Benchmark = p_.Transformer<
                s_source.namespaces.resolver.types.Benchmark,
                s_target.Value
            >
            
            export type Constraint = p_.Transformer<
                s_source.namespaces.resolver.types.Constraint,
                s_target.Value
            >
            
            export type Lookup_Selection = p_.Transformer<
                s_source.namespaces.resolver.types.Lookup_Selection,
                s_target.Value
            >
            
            export type Namespaces = p_.Transformer<
                s_source.namespaces.resolver.types.Namespaces,
                s_target.Value
            >
            
            export type Possible_Value_Selection = p_.Transformer<
                s_source.namespaces.resolver.types.Possible_Value_Selection,
                s_target.Value
            >
            
            export type Option_Constraints = p_.Transformer<
                s_source.namespaces.resolver.types.Option_Constraints,
                s_target.Value
            >
            
            export type Optional_Value_Initialization = p_.Transformer<
                s_source.namespaces.resolver.types.Optional_Value_Initialization,
                s_target.Value
            >
            
            export type Reference_Constraints = p_.Transformer<
                s_source.namespaces.resolver.types.Reference_Constraints,
                s_target.Value
            >
            
            export type Reference_To_Value_Constraint = p_.Transformer<
                s_source.namespaces.resolver.types.Reference_To_Value_Constraint,
                s_target.Value
            >
            
            export type Resolver = p_.Transformer<
                s_source.namespaces.resolver.types.Resolver,
                s_target.Value
            >
            
            export type Result_Selection = p_.Transformer<
                s_source.namespaces.resolver.types.Result_Selection,
                s_target.Value
            >
            
            export type Value_Group = p_.Transformer<
                s_source.namespaces.resolver.types.Value_Group,
                s_target.Value
            >
            
            export type Value_List_Result = p_.Transformer<
                s_source.namespaces.resolver.types.Value_List_Result,
                s_target.Value
            >
            
            export type Value = p_.Transformer<
                s_source.namespaces.resolver.types.Value,
                s_target.Value
            >
            
            export type Types = p_.Transformer<
                s_source.namespaces.resolver.types.Types,
                s_target.Value
            >
            
            export type Value_Constraint = p_.Transformer<
                s_source.namespaces.resolver.types.Value_Constraint,
                s_target.Value
            >
            
            export type Value_Constraints = p_.Transformer<
                s_source.namespaces.resolver.types.Value_Constraints,
                s_target.Value
            >
        }
        
        // implementations
        
        export const Absence_Constraints: declarations.Absence_Constraints = ($) => ['optional', p_.from.optional($).decide(($): s_target.Value.optional => ['set', ['dictionary', p_.from.dictionary($).map(
            ($, id) => __operations.namespaces.resolver.Possible_Value_Selection(
                $,
            ),
        )]], (): s_target.Value.optional => ['not set', null])]
        
        export const Type_Reference: declarations.Type_Reference = ($) => ['group', ['verbose', p_.literal.dictionary({
            "location": p_.change_context($['location'], ($) => ['state', p_.from.state($['value']).decide(($): s_target.Value.state => {
                switch ($[0]) {
                    case 'local': return p_.option($, ($): s_target.Value.state => ({
                        'option': 'local',
                        'value': ['reference', {
                            'value': $['l id'],
                        }],
                    }))
                    case 'child namespace': return p_.option($, ($): s_target.Value.state => ({
                        'option': 'child namespace',
                        'value': ['group', ['verbose', p_.literal.dictionary({
                            "namespace": p_.change_context($['namespace'], ($) => ['reference', {
                                'value': $['l id'],
                            }]),
                            "type": p_.change_context($['type'], ($) => ['reference', {
                                'value': $['l id'],
                            }]),
                        })]],
                    }))
                    case 'sibling namespace': return p_.option($, ($): s_target.Value.state => ({
                        'option': 'sibling namespace',
                        'value': ['group', ['verbose', p_.literal.dictionary({
                            "namespace": p_.change_context($['namespace'], ($) => ['reference', {
                                'value': $['l id'],
                            }]),
                            "type": p_.change_context($['type'], ($) => ['reference', {
                                'value': $['l id'],
                            }]),
                        })]],
                    }))
                    default: return p_.exhaustive($[0])
                }
            })]),
        })]]
        
        export const Value_Subselection: declarations.Value_Subselection = ($) => ['group', ['verbose', p_.literal.dictionary({
            "tail": p_.change_context($['tail'], ($) => ['list', p_.from.list($['value']).map(
                ($) => p_.change_context($['value'], ($) => ['state', p_.from.state($['value']).decide(($): s_target.Value.state => {
                    switch ($[0]) {
                        case 'dictionary': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'dictionary',
                            'value': p_.change_context($['value'], ($) => ['nothing', null]),
                        }))
                        case 'group': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'group',
                            'value': p_.change_context($['value'], ($) => ['reference', {
                                'value': $['l id'],
                            }]),
                        }))
                        case 'list': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'list',
                            'value': p_.change_context($['value'], ($) => ['nothing', null]),
                        }))
                        case 'optional': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'optional',
                            'value': p_.change_context($['value'], ($) => ['nothing', null]),
                        }))
                        case 'state': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'state',
                            'value': p_.change_context($['value'], ($) => ['reference', {
                                'value': $['l id'],
                            }]),
                        }))
                        default: return p_.exhaustive($[0])
                    }
                })]),
            )]),
        })]]
        
        export const Value_Reference: declarations.Value_Reference = ($) => ['group', ['verbose', p_.literal.dictionary({
            "type": p_.change_context($['type'], ($) => __operations.namespaces.resolver.Type_Reference(
                $,
            )),
            "path": p_.change_context($['path'], ($) => __operations.namespaces.resolver.Value_Subselection(
                $,
            )),
        })]]
        
        export const Relative_Value_Selection: declarations.Relative_Value_Selection = ($) => ['group', ['verbose', p_.literal.dictionary({
            "path": p_.change_context($['path'], ($) => ['list', p_.from.list($['value']).map(
                ($) => p_.change_context($['value'], ($) => ['state', p_.from.state($['value']).decide(($): s_target.Value.state => {
                    switch ($[0]) {
                        case 'benchmark link': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'benchmark link',
                            'value': __operations.namespaces.resolver.Value_Reference(
                                $,
                            ),
                        }))
                        case 'component constraint': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'component constraint',
                            'value': p_.change_context($['value'], ($) => ['group', ['verbose', p_.literal.dictionary({
                                "name": p_.change_context($['name'], ($) => ['text', {
                                    'delimiter': ['quote', null],
                                    'value': $,
                                }]),
                                "target": p_.change_context($['target'], ($) => __operations.namespaces.resolver.Value_Reference(
                                    $,
                                )),
                            })]]),
                        }))
                        case 'component': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'component',
                            'value': p_.change_context($['value'], ($) => ['nothing', null]),
                        }))
                        case 'group': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'group',
                            'value': p_.change_context($['value'], ($) => ['reference', {
                                'value': $['l id'],
                            }]),
                        }))
                        case 'list result': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'list result',
                            'value': p_.change_context($['value'], ($) => ['nothing', null]),
                        }))
                        case 'option constraint': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'option constraint',
                            'value': p_.change_context($['value'], ($) => ['group', ['verbose', p_.literal.dictionary({
                                "option": p_.change_context($['option'], ($) => ['reference', {
                                    'value': $['l id'],
                                }]),
                                "constraint": p_.change_context($['constraint'], ($) => ['reference', {
                                    'value': $['l id'],
                                }]),
                            })]]),
                        }))
                        case 'optional': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'optional',
                            'value': p_.change_context($['value'], ($) => ['nothing', null]),
                        }))
                        case 'optional value constraint': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'optional value constraint',
                            'value': p_.change_context($['value'], ($) => ['reference', {
                                'value': $['l id'],
                            }]),
                        }))
                        case 'reference constraint': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'reference constraint',
                            'value': p_.change_context($['value'], ($) => ['reference', {
                                'value': $['l id'],
                            }]),
                        }))
                        case 'reference': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'reference',
                            'value': p_.change_context($['value'], ($) => ['group', ['verbose', p_.literal.dictionary({})]]),
                        }))
                        case 'state result': return p_.option($, ($): s_target.Value.state => ({
                            'option': 'state result',
                            'value': p_.change_context($['value'], ($) => ['nothing', null]),
                        }))
                        default: return p_.exhaustive($[0])
                    }
                })]),
            )]),
        })]]
        
        export const Guaranteed_Value_Selection: declarations.Guaranteed_Value_Selection = ($) => ['group', ['verbose', p_.literal.dictionary({
            "start": p_.change_context($['start'], ($) => ['state', p_.from.state($['value']).decide(($): s_target.Value.state => {
                switch ($[0]) {
                    case 'optional fallback': return p_.option($, ($): s_target.Value.state => ({
                        'option': 'optional fallback',
                        'value': ['group', ['verbose', p_.literal.dictionary({
                            "selection": p_.change_context($['selection'], ($) => __operations.namespaces.resolver.Possible_Value_Selection(
                                $,
                            )),
                            "fallback": p_.change_context($['fallback'], ($) => __operations.namespaces.resolver.Guaranteed_Value_Selection(
                                $,
                            )),
                        })]],
                    }))
                    case 'sibling': return p_.option($, ($): s_target.Value.state => ({
                        'option': 'sibling',
                        'value': ['reference', {
                            'value': $['l id'],
                        }],
                    }))
                    case 'parent sibling': return p_.option($, ($): s_target.Value.state => ({
                        'option': 'parent sibling',
                        'value': ['reference', {
                            'value': $['l id'],
                        }],
                    }))
                    case 'option constraint': return p_.option($, ($): s_target.Value.state => ({
                        'option': 'option constraint',
                        'value': p_.change_context($['value'], ($) => ['reference', {
                            'value': $['l id'],
                        }]),
                    }))
                    case 'list cursor': return p_.option($, ($): s_target.Value.state => ({
                        'option': 'list cursor',
                        'value': p_.change_context($['value'], ($) => ['nothing', null]),
                    }))
                    case 'linked entry': return p_.option($, ($): s_target.Value.state => ({
                        'option': 'linked entry',
                        'value': p_.change_context($['value'], ($) => ['nothing', null]),
                    }))
                    case 'constraint': return p_.option($, ($): s_target.Value.state => ({
                        'option': 'constraint',
                        'value': ['state', p_.from.state($['value']).decide(($): s_target.Value.state => {
                            switch ($[0]) {
                                case 'component': return p_.option($, ($): s_target.Value.state => ({
                                    'option': 'component',
                                    'value': ['group', ['verbose', p_.literal.dictionary({
                                        "property": p_.change_context($['property'], ($) => p_.change_context($['value'], ($) => ['reference', {
                                            'value': $['l id'],
                                        }])),
                                        "constraint": p_.change_context($['constraint'], ($) => ['reference', {
                                            'value': $['l id'],
                                        }]),
                                    })]],
                                }))
                                case 'reference': return p_.option($, ($): s_target.Value.state => ({
                                    'option': 'reference',
                                    'value': ['group', ['verbose', p_.literal.dictionary({
                                        "property": p_.change_context($['property'], ($) => p_.change_context($['value'], ($) => ['reference', {
                                            'value': $['l id'],
                                        }])),
                                        "constraint": p_.change_context($['constraint'], ($) => ['reference', {
                                            'value': $['l id'],
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
                            'value': $['l id'],
                        }],
                    }))
                    case 'result': return p_.option($, ($): s_target.Value.state => ({
                        'option': 'result',
                        'value': ['state', p_.from.state($['value']).decide(($): s_target.Value.state => {
                            switch ($[0]) {
                                case 'list': return p_.option($, ($): s_target.Value.state => ({
                                    'option': 'list',
                                    'value': ['group', ['verbose', p_.literal.dictionary({
                                        "property": p_.change_context($['property'], ($) => p_.change_context($['value'], ($) => ['reference', {
                                            'value': $['l id'],
                                        }])),
                                    })]],
                                }))
                                case 'state': return p_.option($, ($): s_target.Value.state => ({
                                    'option': 'state',
                                    'value': ['group', ['verbose', p_.literal.dictionary({
                                        "property": p_.change_context($['property'], ($) => p_.change_context($['value'], ($) => ['reference', {
                                            'value': $['l id'],
                                        }])),
                                    })]],
                                }))
                                case 'optional value': return p_.option($, ($): s_target.Value.state => ({
                                    'option': 'optional value',
                                    'value': ['group', ['verbose', p_.literal.dictionary({
                                        "property": p_.change_context($['property'], ($) => p_.change_context($['value'], ($) => ['reference', {
                                            'value': $['l id'],
                                        }])),
                                    })]],
                                }))
                                default: return p_.exhaustive($[0])
                            }
                        })],
                    }))
                    default: return p_.exhaustive($[0])
                }
            })]),
            "tail": p_.change_context($['tail'], ($) => __operations.namespaces.resolver.Relative_Value_Selection(
                $,
            )),
        })]]
        
        export const Benchmark: declarations.Benchmark = ($) => ['group', ['verbose', p_.literal.dictionary({
            "selection": p_.change_context($['selection'], ($) => p_.change_context($['value'], ($) => __operations.namespaces.resolver.Guaranteed_Value_Selection(
                $,
            ))),
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
        
        export const Constraint: declarations.Constraint = ($) => ['group', ['verbose', p_.literal.dictionary({
            "selection": p_.change_context($['selection'], ($) => __operations.namespaces.resolver.Relative_Value_Selection(
                $,
            )),
            "type": p_.change_context($['type'], ($) => ['state', p_.from.state($['value']).decide(($): s_target.Value.state => {
                switch ($[0]) {
                    case 'state': return p_.option($, ($): s_target.Value.state => ({
                        'option': 'state',
                        'value': p_.change_context($['value'], ($) => ['group', ['verbose', p_.literal.dictionary({
                            "option": p_.change_context($['option'], ($) => ['reference', {
                                'value': $['l id'],
                            }]),
                        })]]),
                    }))
                    case 'optional value': return p_.option($, ($): s_target.Value.state => ({
                        'option': 'optional value',
                        'value': p_.change_context($['value'], ($) => ['group', ['verbose', p_.literal.dictionary({})]]),
                    }))
                    default: return p_.exhaustive($[0])
                }
            })]),
        })]]
        
        export const Lookup_Selection: declarations.Lookup_Selection = ($) => ['group', ['verbose', p_.literal.dictionary({
            "type": p_.change_context($['type'], ($) => ['state', p_.from.state($['value']).decide(($): s_target.Value.state => {
                switch ($[0]) {
                    case 'acyclic': return p_.option($, ($): s_target.Value.state => ({
                        'option': 'acyclic',
                        'value': ['state', p_.from.state($['value']).decide(($): s_target.Value.state => {
                            switch ($[0]) {
                                case 'siblings': return p_.option($, ($): s_target.Value.state => ({
                                    'option': 'siblings',
                                    'value': p_.change_context($['value'], ($) => ['nothing', null]),
                                }))
                                case 'resolved dictionary': return p_.option($, ($): s_target.Value.state => ({
                                    'option': 'resolved dictionary',
                                    'value': ['group', ['verbose', p_.literal.dictionary({
                                        "selection": p_.change_context($['selection'], ($) => p_.change_context($['value'], ($) => __operations.namespaces.resolver.Guaranteed_Value_Selection(
                                            $,
                                        ))),
                                    })]],
                                }))
                                default: return p_.exhaustive($[0])
                            }
                        })],
                    }))
                    case 'cyclic': return p_.option($, ($): s_target.Value.state => ({
                        'option': 'cyclic',
                        'value': ['state', p_.from.state($['value']).decide(($): s_target.Value.state => {
                            switch ($[0]) {
                                case 'siblings': return p_.option($, ($): s_target.Value.state => ({
                                    'option': 'siblings',
                                    'value': p_.change_context($['value'], ($) => ['nothing', null]),
                                }))
                                default: return p_.exhaustive($[0])
                            }
                        })],
                    }))
                    case 'parameter': return p_.option($, ($): s_target.Value.state => ({
                        'option': 'parameter',
                        'value': ['reference', {
                            'value': $['l id'],
                        }],
                    }))
                    default: return p_.exhaustive($[0])
                }
            })]),
        })]]
        
        export const Namespaces: declarations.Namespaces = ($) => ['dictionary', p_.from.dictionary($).map(
            ($, id) => p_.change_context($['value'], ($) => __operations.namespaces.resolver.Resolver(
                $,
            )),
        )]
        
        export const Possible_Value_Selection: declarations.Possible_Value_Selection = ($) => ['state', p_.from.state($['value']).decide(($): s_target.Value.state => {
            switch ($[0]) {
                case 'optional value': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'optional value',
                    'value': ['group', ['verbose', p_.literal.dictionary({
                        "selection": p_.change_context($['selection'], ($) => p_.change_context($['value'], ($) => __operations.namespaces.resolver.Guaranteed_Value_Selection(
                            $,
                        ))),
                        "tail": p_.change_context($['tail'], ($) => __operations.namespaces.resolver.Relative_Value_Selection(
                            $,
                        )),
                    })]],
                }))
                case 'parameter': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'parameter',
                    'value': ['reference', {
                        'value': $['l id'],
                    }],
                }))
                case 'result': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'result',
                    'value': ['state', p_.from.state($['value']).decide(($): s_target.Value.state => {
                        switch ($[0]) {
                            case 'state': return p_.option($, ($): s_target.Value.state => ({
                                'option': 'state',
                                'value': ['group', ['verbose', p_.literal.dictionary({
                                    "property": p_.change_context($['property'], ($) => p_.change_context($['value'], ($) => ['reference', {
                                        'value': $['l id'],
                                    }])),
                                })]],
                            }))
                            case 'optional value': return p_.option($, ($): s_target.Value.state => ({
                                'option': 'optional value',
                                'value': ['group', ['verbose', p_.literal.dictionary({
                                    "property": p_.change_context($['property'], ($) => p_.change_context($['value'], ($) => ['reference', {
                                        'value': $['l id'],
                                    }])),
                                })]],
                            }))
                            default: return p_.exhaustive($[0])
                        }
                    })],
                }))
                default: return p_.exhaustive($[0])
            }
        })]
        
        export const Option_Constraints: declarations.Option_Constraints = ($) => ['optional', p_.from.optional($).decide(($): s_target.Value.optional => ['set', p_.change_context($['value'], ($) => ['dictionary', p_.from.dictionary($).map(
            ($, id) => p_.change_context($['value'], ($) => ['state', p_.from.state($['value']).decide(($): s_target.Value.state => {
                switch ($[0]) {
                    case 'state': return p_.option($, ($): s_target.Value.state => ({
                        'option': 'state',
                        'value': ['group', ['verbose', p_.literal.dictionary({
                            "selection": p_.change_context($['selection'], ($) => p_.change_context($['value'], ($) => __operations.namespaces.resolver.Guaranteed_Value_Selection(
                                $,
                            ))),
                            "option": p_.change_context($['option'], ($) => ['reference', {
                                'value': $['l id'],
                            }]),
                        })]],
                    }))
                    case 'assert is set': return p_.option($, ($): s_target.Value.state => ({
                        'option': 'assert is set',
                        'value': __operations.namespaces.resolver.Possible_Value_Selection(
                            $,
                        ),
                    }))
                    default: return p_.exhaustive($[0])
                }
            })]),
        )])], (): s_target.Value.optional => ['not set', null])]
        
        export const Optional_Value_Initialization: declarations.Optional_Value_Initialization = ($) => ['state', p_.from.state($).decide(($): s_target.Value.state => {
            switch ($[0]) {
                case 'not set': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'not set',
                    'value': ['nothing', null],
                }))
                case 'set': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'set',
                    'value': __operations.namespaces.resolver.Guaranteed_Value_Selection(
                        $,
                    ),
                }))
                case 'selection': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'selection',
                    'value': __operations.namespaces.resolver.Possible_Value_Selection(
                        $,
                    ),
                }))
                default: return p_.exhaustive($[0])
            }
        })]
        
        export const Reference_Constraints: declarations.Reference_Constraints = ($) => ['optional', p_.from.optional($).decide(($): s_target.Value.optional => ['set', p_.change_context($['value'], ($) => ['dictionary', p_.from.dictionary($).map(
            ($, id) => p_.change_context($['value'], ($) => __operations.namespaces.resolver.Value_Constraint(
                $,
            )),
        )])], (): s_target.Value.optional => ['not set', null])]
        
        export const Reference_To_Value_Constraint: declarations.Reference_To_Value_Constraint = ($) => ['reference', {
            'value': $['l id'],
        }]
        
        export const Resolver: declarations.Resolver = ($) => ['group', ['verbose', p_.literal.dictionary({
            "namespaces": p_.change_context($['namespaces'], ($) => __operations.namespaces.resolver.Namespaces(
                $,
            )),
            "types": p_.change_context($['types'], ($) => __operations.namespaces.resolver.Types(
                $,
            )),
        })]]
        
        export const Result_Selection: declarations.Result_Selection = ($) => ['state', p_.from.state($).decide(($): s_target.Value.state => {
            switch ($[0]) {
                case 'context': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'context',
                    'value': __operations.namespaces.resolver.Guaranteed_Value_Selection(
                        $,
                    ),
                }))
                case 'value': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'value',
                    'value': __operations.namespaces.resolver.Relative_Value_Selection(
                        $,
                    ),
                }))
                default: return p_.exhaustive($[0])
            }
        })]
        
        export const Value_Group: declarations.Value_Group = ($) => ['dictionary', p_.from.dictionary($).map(
            ($, id) => p_.change_context($['value'], ($) => ['group', ['verbose', p_.literal.dictionary({
                "resolver": p_.change_context($['resolver'], ($) => __operations.namespaces.resolver.Value(
                    $,
                )),
            })]]),
        )]
        
        export const Value_List_Result: declarations.Value_List_Result = ($) => ['group', ['verbose', p_.literal.dictionary({
            "initial": p_.change_context($['initial'], ($) => __operations.namespaces.resolver.Guaranteed_Value_Selection(
                $,
            )),
            "next": p_.change_context($['next'], ($) => __operations.namespaces.resolver.Result_Selection(
                $,
            )),
        })]]
        
        export const Value: declarations.Value = ($) => ['state', p_.from.state($).decide(($): s_target.Value.state => {
            switch ($[0]) {
                case 'component': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'component',
                    'value': p_.change_context($['value'], ($) => ['group', ['verbose', p_.literal.dictionary({
                        "location": p_.change_context($['location'], ($) => ['state', p_.from.state($['value']).decide(($): s_target.Value.state => {
                            switch ($[0]) {
                                case 'local': return p_.option($, ($): s_target.Value.state => ({
                                    'option': 'local',
                                    'value': ['reference', {
                                        'value': $['l id'],
                                    }],
                                }))
                                case 'child namespace': return p_.option($, ($): s_target.Value.state => ({
                                    'option': 'child namespace',
                                    'value': ['group', ['verbose', p_.literal.dictionary({
                                        "namespace": p_.change_context($['namespace'], ($) => ['reference', {
                                            'value': $['l id'],
                                        }]),
                                        "resolver": p_.change_context($['resolver'], ($) => ['reference', {
                                            'value': $['l id'],
                                        }]),
                                    })]],
                                }))
                                case 'sibling namespace': return p_.option($, ($): s_target.Value.state => ({
                                    'option': 'sibling namespace',
                                    'value': p_.change_context($['value'], ($) => ['group', ['verbose', p_.literal.dictionary({
                                        "namespace": p_.change_context($['namespace'], ($) => ['reference', {
                                            'value': $['l id'],
                                        }]),
                                        "resolver": p_.change_context($['resolver'], ($) => ['reference', {
                                            'value': $['l id'],
                                        }]),
                                    })]]),
                                }))
                                default: return p_.exhaustive($[0])
                            }
                        })]),
                        "arguments": p_.change_context($['arguments'], ($) => ['optional', p_.from.optional($).decide(($): s_target.Value.optional => ['set', ['group', ['verbose', p_.literal.dictionary({
                            "types": p_.change_context($['types'], ($) => ['optional', p_.from.optional($).decide(($): s_target.Value.optional => ['set', ['dictionary', p_.from.dictionary($).map(
                                ($, id) => p_.change_context($['value'], ($) => ['state', p_.from.state($).decide(($): s_target.Value.state => {
                                    switch ($[0]) {
                                        case 'optional': return p_.option($, ($): s_target.Value.state => ({
                                            'option': 'optional',
                                            'value': __operations.namespaces.resolver.Optional_Value_Initialization(
                                                $,
                                            ),
                                        }))
                                        case 'required': return p_.option($, ($): s_target.Value.state => ({
                                            'option': 'required',
                                            'value': __operations.namespaces.resolver.Guaranteed_Value_Selection(
                                                $,
                                            ),
                                        }))
                                        case 'parameter': return p_.option($, ($): s_target.Value.state => ({
                                            'option': 'parameter',
                                            'value': ['reference', {
                                                'value': $['l id'],
                                            }],
                                        }))
                                        default: return p_.exhaustive($[0])
                                    }
                                })]),
                            )]], (): s_target.Value.optional => ['not set', null])]),
                            "lookups": p_.change_context($['lookups'], ($) => ['optional', p_.from.optional($).decide(($): s_target.Value.optional => ['set', ['dictionary', p_.from.dictionary($).map(
                                ($, id) => p_.change_context($['value'], ($) => ['state', p_.from.state($).decide(($): s_target.Value.state => {
                                    switch ($[0]) {
                                        case 'acyclic': return p_.option($, ($): s_target.Value.state => ({
                                            'option': 'acyclic',
                                            'value': ['nothing', null],
                                        }))
                                        case 'cyclic': return p_.option($, ($): s_target.Value.state => ({
                                            'option': 'cyclic',
                                            'value': ['nothing', null],
                                        }))
                                        case 'selection': return p_.option($, ($): s_target.Value.state => ({
                                            'option': 'selection',
                                            'value': __operations.namespaces.resolver.Lookup_Selection(
                                                $,
                                            ),
                                        }))
                                        default: return p_.exhaustive($[0])
                                    }
                                })]),
                            )]], (): s_target.Value.optional => ['not set', null])]),
                        })]]], (): s_target.Value.optional => ['not set', null])]),
                        "constraints": p_.change_context($['constraints'], ($) => __operations.namespaces.resolver.Reference_Constraints(
                            $,
                        )),
                    })]]),
                }))
                case 'dictionary': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'dictionary',
                    'value': p_.change_context($['value'], ($) => ['group', ['verbose', p_.literal.dictionary({
                        "resolver": p_.change_context($['resolver'], ($) => __operations.namespaces.resolver.Value(
                            $,
                        )),
                        "benchmark": p_.change_context($['benchmark'], ($) => ['optional', p_.from.optional($).decide(($): s_target.Value.optional => ['set', __operations.namespaces.resolver.Benchmark(
                            $,
                        )], (): s_target.Value.optional => ['not set', null])]),
                    })]]),
                }))
                case 'group': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'group',
                    'value': p_.change_context($['value'], ($) => __operations.namespaces.resolver.Value_Group(
                        $,
                    )),
                }))
                case 'list': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'list',
                    'value': p_.change_context($['value'], ($) => ['group', ['verbose', p_.literal.dictionary({
                        "resolver": p_.change_context($['resolver'], ($) => __operations.namespaces.resolver.Value(
                            $,
                        )),
                        "result": p_.change_context($['result'], ($) => ['optional', p_.from.optional($).decide(($): s_target.Value.optional => ['set', p_.change_context($['value'], ($) => __operations.namespaces.resolver.Value_List_Result(
                            $,
                        ))], (): s_target.Value.optional => ['not set', null])]),
                    })]]),
                }))
                case 'nothing': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'nothing',
                    'value': p_.change_context($['value'], ($) => ['nothing', null]),
                }))
                case 'simple': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'simple',
                    'value': p_.change_context($['value'], ($) => ['nothing', null]),
                }))
                case 'optional': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'optional',
                    'value': p_.change_context($['value'], ($) => ['group', ['verbose', p_.literal.dictionary({
                        "presence": p_.change_context($['presence'], ($) => ['optional', p_.from.optional($).decide(($): s_target.Value.optional => ['set', __operations.namespaces.resolver.Possible_Value_Selection(
                            $,
                        )], (): s_target.Value.optional => ['not set', null])]),
                        "constraints": p_.change_context($['constraints'], ($) => __operations.namespaces.resolver.Option_Constraints(
                            $,
                        )),
                        "resolver": p_.change_context($['resolver'], ($) => __operations.namespaces.resolver.Value(
                            $,
                        )),
                        "not set constraints": p_.change_context($['not set constraints'], ($) => __operations.namespaces.resolver.Absence_Constraints(
                            $,
                        )),
                        "result": p_.change_context($['result'], ($) => ['optional', p_.from.optional($).decide(($): s_target.Value.optional => ['set', p_.change_context($['value'], ($) => __operations.namespaces.resolver.Result_Selection(
                            $,
                        ))], (): s_target.Value.optional => ['not set', null])]),
                    })]]),
                }))
                case 'reference': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'reference',
                    'value': p_.change_context($['value'], ($) => ['group', ['verbose', p_.literal.dictionary({
                        "type": p_.change_context($['type'], ($) => ['group', ['verbose', p_.literal.dictionary({
                            "lookup": p_.change_context($['lookup'], ($) => __operations.namespaces.resolver.Lookup_Selection(
                                $,
                            )),
                            "constraints": p_.change_context($['constraints'], ($) => __operations.namespaces.resolver.Reference_Constraints(
                                $,
                            )),
                        })]]),
                    })]]),
                }))
                case 'state': return p_.option($, ($): s_target.Value.state => ({
                    'option': 'state',
                    'value': p_.change_context($['value'], ($) => ['group', ['verbose', p_.literal.dictionary({
                        "options": p_.change_context($['options'], ($) => ['dictionary', p_.from.dictionary($).map(
                            ($, id) => p_.change_context($['value'], ($) => ['group', ['verbose', p_.literal.dictionary({
                                "constraints": p_.change_context($['constraints'], ($) => __operations.namespaces.resolver.Option_Constraints(
                                    $,
                                )),
                                "resolver": p_.change_context($['resolver'], ($) => __operations.namespaces.resolver.Value(
                                    $,
                                )),
                                "result": p_.change_context($['result'], ($) => ['optional', p_.from.optional($).decide(($): s_target.Value.optional => ['set', __operations.namespaces.resolver.Result_Selection(
                                    $,
                                )], (): s_target.Value.optional => ['not set', null])]),
                            })]]),
                        )]),
                    })]]),
                }))
                default: return p_.exhaustive($[0])
            }
        })]
        
        export const Types: declarations.Types = ($) => ['dictionary', p_.from.dictionary($).map(
            ($, id) => p_.change_context($['value'], ($) => ['group', ['verbose', p_.literal.dictionary({
                "root value resolver": p_.change_context($['root value resolver'], ($) => __operations.namespaces.resolver.Value(
                    $,
                )),
            })]]),
        )]
        
        export const Value_Constraint: declarations.Value_Constraint = ($) => ['group', ['verbose', p_.literal.dictionary({
            "start": p_.change_context($['start'], ($) => ['state', p_.from.state($['value']).decide(($): s_target.Value.state => {
                switch ($[0]) {
                    case 'value': return p_.option($, ($): s_target.Value.state => ({
                        'option': 'value',
                        'value': ['nothing', null],
                    }))
                    case 'sibling': return p_.option($, ($): s_target.Value.state => ({
                        'option': 'sibling',
                        'value': __operations.namespaces.resolver.Reference_To_Value_Constraint(
                            $,
                        ),
                    }))
                    default: return p_.exhaustive($[0])
                }
            })]),
            "constraint": p_.change_context($['constraint'], ($) => __operations.namespaces.resolver.Constraint(
                $,
            )),
        })]]
        
        export const Value_Constraints: declarations.Value_Constraints = ($) => ['dictionary', p_.from.dictionary($).map(
            ($, id) => p_.change_context($['value'], ($) => __operations.namespaces.resolver.Value_Constraint(
                $,
            )),
        )]
        export namespace namespaces {}
    }
}
