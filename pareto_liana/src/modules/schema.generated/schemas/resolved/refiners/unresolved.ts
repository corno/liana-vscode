import * as __operations from "./unresolved.js"
import * as p_ from 'pareto-core/refiner'
import p_implement_me from 'pareto-core-dev/implement_me'

// schemas
import * as s_target from "../schema.js"
import * as s_source from "../../unresolved/schema.js"
import * as s_error from "../../reader_errors/schema.js"

export namespace declarations {
    
    export type Directory = p_.Refiner<
        s_target.types.Directory,
        s_error.types.Resolving_Error,
        s_source.types.Directory
    >
    
    export type Node = p_.Refiner<
        s_target.types.Node,
        s_error.types.Resolving_Error,
        s_source.types.Node
    >
    
    export type Schema = p_.Refiner<
        s_target.types.Schema,
        s_error.types.Resolving_Error,
        s_source.types.Schema
    >
    
    export type Type_Specification = p_.Refiner<
        s_target.types.Type_Specification,
        s_error.types.Resolving_Error,
        s_source.types.Type_Specification
    >
}

// implementations

export const Directory: declarations.Directory = ($, abort) => p_.from.state($).decide(($): s_target.types.Directory => {
    switch ($[0]) {
        case 'group': return p_.option($, ($): s_target.types.Directory => p_.change_context($, ($) => ['group', {
            'nodes': p_.change_context($['nodes'], ($) => p_.from.dictionary($).map(
                ($, id) => __operations.Node(
                    $,
                    abort,
                ),
            )),
        }]))
        case 'dictionary': return p_.option($, ($): s_target.types.Directory => p_.change_context($, ($) => ['dictionary', {
            'node': p_.change_context($['node'], ($) => __operations.Node(
                $,
                abort,
            )),
        }]))
        default: return p_.exhaustive($[0])
    }
})

export const Node: declarations.Node = ($, abort) => p_.from.state($).decide(($): s_target.types.Node => {
    switch ($[0]) {
        case 'file': return p_.option($, ($): s_target.types.Node => p_.change_context($, ($) => ['file', {
            'file extension': p_.change_context($['file extension'], ($) => $),
            'type': p_.change_context($['type'], ($) => p_implement_me("SELECTED REF")),
        }]))
        case 'directory': return p_.option($, ($): s_target.types.Node => p_.change_context($, ($) => ['directory', __operations.Directory(
            $,
            abort,
        )]))
        default: return p_.exhaustive($[0])
    }
})

export const Schema: declarations.Schema = ($, abort) => ({
    'structure': p_.change_context($['structure'], ($) => __operations.namespaces.structure.Structure(
        $,
        abort,
    )),
    'resolver': p_.change_context($['resolver'], ($) => ({
        'declarations': p_.change_context($['declarations'], ($) => __operations.namespaces.declarations.Declaration_Namespace(
            $,
            abort,
        )),
        'implementations': p_.change_context($['implementations'], ($) => __operations.namespaces.resolver.Resolver(
            $,
            abort,
        )),
    })),
})

export const Type_Specification: declarations.Type_Specification = ($, abort) => ({
    'schema': p_.change_context($['schema'], ($) => __operations.Schema(
        $,
        abort,
    )),
    'directory': p_.change_context($['directory'], ($) => __operations.Directory(
        $,
        abort,
    )),
})
export namespace namespaces {
    export namespace structure {
        
        export namespace declarations {
            
            export type Regular_Expression = p_.Refiner<
                s_target.namespaces.structure.types.Regular_Expression,
                s_error.types.Resolving_Error,
                s_source.namespaces.structure.types.Regular_Expression
            >
            
            export type Basic_Type = p_.Refiner<
                s_target.namespaces.structure.types.Basic_Type,
                s_error.types.Resolving_Error,
                s_source.namespaces.structure.types.Basic_Type
            >
            
            export type Basic_Types = p_.Refiner<
                s_target.namespaces.structure.types.Basic_Types,
                s_error.types.Resolving_Error,
                s_source.namespaces.structure.types.Basic_Types
            >
            
            export type Dictionary = p_.Refiner<
                s_target.namespaces.structure.types.Dictionary,
                s_error.types.Resolving_Error,
                s_source.namespaces.structure.types.Dictionary
            >
            
            export type Group = p_.Refiner<
                s_target.namespaces.structure.types.Group,
                s_error.types.Resolving_Error,
                s_source.namespaces.structure.types.Group
            >
            
            export type Namespaces = p_.Refiner<
                s_target.namespaces.structure.types.Namespaces,
                s_error.types.Resolving_Error,
                s_source.namespaces.structure.types.Namespaces
            >
            
            export type Types = p_.Refiner<
                s_target.namespaces.structure.types.Types,
                s_error.types.Resolving_Error,
                s_source.namespaces.structure.types.Types
            >
            
            export type Type = p_.Refiner<
                s_target.namespaces.structure.types.Type,
                s_error.types.Resolving_Error,
                s_source.namespaces.structure.types.Type
            >
            
            export type Type_Reference = p_.Refiner<
                s_target.namespaces.structure.types.Type_Reference,
                s_error.types.Resolving_Error,
                s_source.namespaces.structure.types.Type_Reference
            >
            
            export type Value = p_.Refiner<
                s_target.namespaces.structure.types.Value,
                s_error.types.Resolving_Error,
                s_source.namespaces.structure.types.Value
            >
            
            export type Value_Subselection = p_.Refiner<
                s_target.namespaces.structure.types.Value_Subselection,
                s_error.types.Resolving_Error,
                s_source.namespaces.structure.types.Value_Subselection
            >
            
            export type Value_Reference = p_.Refiner<
                s_target.namespaces.structure.types.Value_Reference,
                s_error.types.Resolving_Error,
                s_source.namespaces.structure.types.Value_Reference
            >
            
            export type Option_Constraints = p_.Refiner<
                s_target.namespaces.structure.types.Option_Constraints,
                s_error.types.Resolving_Error,
                s_source.namespaces.structure.types.Option_Constraints
            >
            
            export type Reference = p_.Refiner<
                s_target.namespaces.structure.types.Reference,
                s_error.types.Resolving_Error,
                s_source.namespaces.structure.types.Reference
            >
            
            export type Reference_Constraints = p_.Refiner<
                s_target.namespaces.structure.types.Reference_Constraints,
                s_error.types.Resolving_Error,
                s_source.namespaces.structure.types.Reference_Constraints
            >
            
            export type Structure = p_.Refiner<
                s_target.namespaces.structure.types.Structure,
                s_error.types.Resolving_Error,
                s_source.namespaces.structure.types.Structure
            >
            
            export type Value_Result = p_.Refiner<
                s_target.namespaces.structure.types.Value_Result,
                s_error.types.Resolving_Error,
                s_source.namespaces.structure.types.Value_Result
            >
        }
        
        // implementations
        
        export const Regular_Expression: declarations.Regular_Expression = ($, abort) => p_.from.state($).decide(($): s_target.namespaces.structure.types.Regular_Expression => {
            switch ($[0]) {
                case 'any character': return p_.option($, ($): s_target.namespaces.structure.types.Regular_Expression => p_.change_context($, ($) => ['any character', null]))
                case 'literal': return p_.option($, ($): s_target.namespaces.structure.types.Regular_Expression => p_.change_context($, ($) => ['literal', $]))
                case 'character set': return p_.option($, ($): s_target.namespaces.structure.types.Regular_Expression => p_.change_context($, ($) => ['character set', $]))
                case 'sequence': return p_.option($, ($): s_target.namespaces.structure.types.Regular_Expression => p_.change_context($, ($) => ['sequence', p_.from.list($).map(
                    ($) => __operations.namespaces.structure.Regular_Expression(
                        $,
                        abort,
                    ),
                )]))
                case 'choice': return p_.option($, ($): s_target.namespaces.structure.types.Regular_Expression => p_.change_context($, ($) => ['choice', p_.from.list($).map(
                    ($) => __operations.namespaces.structure.Regular_Expression(
                        $,
                        abort,
                    ),
                )]))
                case 'repetition': return p_.option($, ($): s_target.namespaces.structure.types.Regular_Expression => p_.change_context($, ($) => ['repetition', {
                    'expression': p_.change_context($['expression'], ($) => __operations.namespaces.structure.Regular_Expression(
                        $,
                        abort,
                    )),
                    'quantity': p_.change_context($['quantity'], ($) => p_.from.state($).decide(($): s_target.namespaces.structure.types.Regular_Expression.repetition.quantity => {
                        switch ($[0]) {
                            case 'optional': return p_.option($, ($): s_target.namespaces.structure.types.Regular_Expression.repetition.quantity => p_.change_context($, ($) => ['optional', null]))
                            case 'zero or more': return p_.option($, ($): s_target.namespaces.structure.types.Regular_Expression.repetition.quantity => p_.change_context($, ($) => ['zero or more', null]))
                            case 'one or more': return p_.option($, ($): s_target.namespaces.structure.types.Regular_Expression.repetition.quantity => p_.change_context($, ($) => ['one or more', null]))
                            default: return p_.exhaustive($[0])
                        }
                    })),
                }]))
                default: return p_.exhaustive($[0])
            }
        })
        
        export const Basic_Type: declarations.Basic_Type = ($, abort) => ({
            'type': p_.change_context($['type'], ($) => p_.from.state($).decide(($): s_target.namespaces.structure.types.Basic_Type.type_ => {
                switch ($[0]) {
                    case 'double quoted': return p_.option($, ($): s_target.namespaces.structure.types.Basic_Type.type_ => p_.change_context($, ($) => ['double quoted', null]))
                    case 'undelimited': return p_.option($, ($): s_target.namespaces.structure.types.Basic_Type.type_ => p_.change_context($, ($) => ['undelimited', null]))
                    default: return p_.exhaustive($[0])
                }
            })),
            'regular expression': p_.change_context($['regular expression'], ($) => p_.from.optional($).map(($) => __operations.namespaces.structure.Regular_Expression(
                $,
                abort,
            ))),
            'hyperlink': p_.change_context($['hyperlink'], ($) => p_.from.optional($).map(($) => ({
                'prefix': p_.change_context($['prefix'], ($) => $),
                'suffix': p_.change_context($['suffix'], ($) => $),
            }))),
        })
        
        export const Basic_Types: declarations.Basic_Types = ($, abort) => p_.from.dictionary($).map(
            ($, id) => __operations.namespaces.structure.Basic_Type(
                $,
                abort,
            ),
        )
        
        export const Dictionary: declarations.Dictionary = ($, abort) => ({
            'value': p_.change_context($['value'], ($) => __operations.namespaces.structure.Value(
                $,
                abort,
            )),
        })
        
        export const Group: declarations.Group = ($, abort) => p_.from.dictionary($).map(
            ($, id) => ({
                'description': p_.change_context($['description'], ($) => p_.from.optional($).map(($) => $)),
                'value': p_.change_context($['value'], ($) => __operations.namespaces.structure.Value(
                    $,
                    abort,
                )),
            }),
        )
        
        export const Namespaces: declarations.Namespaces = ($, abort) => p_.from.dictionary($).map(
            ($, id) => __operations.namespaces.structure.Structure(
                $,
                abort,
            ),
        )
        
        export const Types: declarations.Types = ($, abort) => p_.from.dictionary($).map(
            ($, id) => __operations.namespaces.structure.Type(
                $,
                abort,
            ),
        )
        
        export const Type: declarations.Type = ($, abort) => ({
            'root value': p_.change_context($['root value'], ($) => __operations.namespaces.structure.Value(
                $,
                abort,
            )),
        })
        
        export const Type_Reference: declarations.Type_Reference = ($, abort) => ({
            'location': p_.change_context($['location'], ($) => ({
                'value': p_.from.state($).decide(($): s_target.namespaces.structure.types.Type_Reference.location.value => {
                    switch ($[0]) {
                        case 'local': return p_.option($, ($): s_target.namespaces.structure.types.Type_Reference.location.value => p_.change_context($, ($) => ['local', p_implement_me("SELECTED REF")]))
                        case 'child namespace': return p_.option($, ($): s_target.namespaces.structure.types.Type_Reference.location.value => p_.change_context($, ($) => ['child namespace', {
                            'namespace': p_.change_context($['namespace'], ($) => p_implement_me("SELECTED REF")),
                            'type': p_.change_context($['type'], ($) => p_implement_me("SELECTED REF")),
                        }]))
                        case 'sibling namespace': return p_.option($, ($): s_target.namespaces.structure.types.Type_Reference.location.value => p_.change_context($, ($) => ['sibling namespace', {
                            'namespace': p_.change_context($['namespace'], ($) => p_implement_me("SELECTED REF")),
                            'type': p_.change_context($['type'], ($) => p_implement_me("SELECTED REF")),
                        }]))
                        default: return p_.exhaustive($[0])
                    }
                }),
                'result': p_implement_me("STATE RESULT"),
            })),
        })
        
        export const Value: declarations.Value = ($, abort) => p_.from.state($).decide(($): s_target.namespaces.structure.types.Value => {
            switch ($[0]) {
                case 'component': return p_.option($, ($): s_target.namespaces.structure.types.Value => p_.change_context($, ($) => ['component', {
                    'type': p_.change_context($['type'], ($) => ({
                        'value': p_.from.state($).decide(($): s_target.namespaces.structure.types.Value.component.type_.value => {
                            switch ($[0]) {
                                case 'local': return p_.option($, ($): s_target.namespaces.structure.types.Value.component.type_.value => p_.change_context($, ($) => ['local', p_implement_me("SELECTED REF")]))
                                case 'child namespace': return p_.option($, ($): s_target.namespaces.structure.types.Value.component.type_.value => p_.change_context($, ($) => ['child namespace', {
                                    'namespace': p_.change_context($['namespace'], ($) => p_implement_me("SELECTED REF")),
                                    'type': p_.change_context($['type'], ($) => p_implement_me("SELECTED REF")),
                                }]))
                                case 'local cyclic': return p_.option($, ($): s_target.namespaces.structure.types.Value.component.type_.value => p_.change_context($, ($) => ['local cyclic', p_implement_me("SELECTED REF")]))
                                case 'sibling namespace': return p_.option($, ($): s_target.namespaces.structure.types.Value.component.type_.value => p_.change_context($, ($) => ['sibling namespace', {
                                    'namespace': p_.change_context($['namespace'], ($) => p_implement_me("SELECTED REF")),
                                    'type': p_.change_context($['type'], ($) => p_implement_me("SELECTED REF")),
                                }]))
                                default: return p_.exhaustive($[0])
                            }
                        }),
                        'result': p_implement_me("STATE RESULT"),
                    })),
                    'constraints': p_.change_context($['constraints'], ($) => __operations.namespaces.structure.Reference_Constraints(
                        $,
                        abort,
                    )),
                }]))
                case 'dictionary': return p_.option($, ($): s_target.namespaces.structure.types.Value => p_.change_context($, ($) => ['dictionary', __operations.namespaces.structure.Dictionary(
                    $,
                    abort,
                )]))
                case 'group': return p_.option($, ($): s_target.namespaces.structure.types.Value => p_.change_context($, ($) => ['group', __operations.namespaces.structure.Group(
                    $,
                    abort,
                )]))
                case 'list': return p_.option($, ($): s_target.namespaces.structure.types.Value => p_.change_context($, ($) => ['list', {
                    'value': p_.change_context($['value'], ($) => __operations.namespaces.structure.Value(
                        $,
                        abort,
                    )),
                    'result': p_.change_context($['result'], ($) => __operations.namespaces.structure.Value_Result(
                        $,
                        abort,
                    )),
                }]))
                case 'nothing': return p_.option($, ($): s_target.namespaces.structure.types.Value => p_.change_context($, ($) => ['nothing', null]))
                case 'simple': return p_.option($, ($): s_target.namespaces.structure.types.Value => p_.change_context($, ($) => ['simple', {
                    'constraints': {
                        'basic types': p_implement_me("OPTION CONSTRAINT: basic types"),
                    },
                    'value': p_implement_me("SELECTED REF"),
                }]))
                case 'optional': return p_.option($, ($): s_target.namespaces.structure.types.Value => p_.change_context($, ($) => ['optional', {
                    'constraints': p_.change_context($['constraints'], ($) => __operations.namespaces.structure.Option_Constraints(
                        $,
                        abort,
                    )),
                    'value': p_.change_context($['value'], ($) => __operations.namespaces.structure.Value(
                        $,
                        abort,
                    )),
                    'result': p_.change_context($['result'], ($) => __operations.namespaces.structure.Value_Result(
                        $,
                        abort,
                    )),
                }]))
                case 'reference': return p_.option($, ($): s_target.namespaces.structure.types.Value => p_.change_context($, ($) => ['reference', __operations.namespaces.structure.Reference(
                    $,
                    abort,
                )]))
                case 'state': return p_.option($, ($): s_target.namespaces.structure.types.Value => p_.change_context($, ($) => ['state', {
                    'options': p_.change_context($['options'], ($) => p_.from.dictionary($).map(
                        ($, id) => ({
                            'description': p_.change_context($['description'], ($) => p_.from.optional($).map(($) => $)),
                            'constraints': p_.change_context($['constraints'], ($) => __operations.namespaces.structure.Option_Constraints(
                                $,
                                abort,
                            )),
                            'value': p_.change_context($['value'], ($) => __operations.namespaces.structure.Value(
                                $,
                                abort,
                            )),
                        }),
                    )),
                    'result': p_.change_context($['result'], ($) => __operations.namespaces.structure.Value_Result(
                        $,
                        abort,
                    )),
                }]))
                default: return p_.exhaustive($[0])
            }
        })
        
        export const Value_Subselection: declarations.Value_Subselection = ($, abort) => ({
            'tail': p_.change_context($['tail'], ($) => ({
                'value': p_.from.list($).map(
                    ($) => ({
                        'value': {
                            'value': p_.from.state($).decide(($): s_target.namespaces.structure.types.Value_Subselection.tail.value.L.value.value => {
                                switch ($[0]) {
                                    case 'dictionary': return p_.option($, ($): s_target.namespaces.structure.types.Value_Subselection.tail.value.L.value.value => p_.change_context($, ($) => ['dictionary', {
                                        'constraints': {
                                            'definition': p_implement_me("OPTION CONSTRAINT: definition"),
                                        },
                                        'value': null,
                                    }]))
                                    case 'group': return p_.option($, ($): s_target.namespaces.structure.types.Value_Subselection.tail.value.L.value.value => p_.change_context($, ($) => ['group', {
                                        'constraints': {
                                            'definition': p_implement_me("OPTION CONSTRAINT: definition"),
                                        },
                                        'value': p_implement_me("SELECTED REF"),
                                    }]))
                                    case 'list': return p_.option($, ($): s_target.namespaces.structure.types.Value_Subselection.tail.value.L.value.value => p_.change_context($, ($) => ['list', {
                                        'constraints': {
                                            'definition': p_implement_me("OPTION CONSTRAINT: definition"),
                                        },
                                        'value': null,
                                    }]))
                                    case 'optional': return p_.option($, ($): s_target.namespaces.structure.types.Value_Subselection.tail.value.L.value.value => p_.change_context($, ($) => ['optional', {
                                        'constraints': {
                                            'definition': p_implement_me("OPTION CONSTRAINT: definition"),
                                        },
                                        'value': null,
                                    }]))
                                    case 'state': return p_.option($, ($): s_target.namespaces.structure.types.Value_Subselection.tail.value.L.value.value => p_.change_context($, ($) => ['state', {
                                        'constraints': {
                                            'definition': p_implement_me("OPTION CONSTRAINT: definition"),
                                        },
                                        'value': p_implement_me("SELECTED REF"),
                                    }]))
                                    default: return p_.exhaustive($[0])
                                }
                            }),
                            'result': p_implement_me("STATE RESULT"),
                        },
                        'result': p_implement_me("LIST ITEM RESULT"),
                    }),
                ),
                'result': p_implement_me("LIST RESULT"),
            })),
        })
        
        export const Value_Reference: declarations.Value_Reference = ($, abort) => ({
            'type': p_.change_context($['type'], ($) => __operations.namespaces.structure.Type_Reference(
                $,
                abort,
            )),
            'path': p_.change_context($['path'], ($) => __operations.namespaces.structure.Value_Subselection(
                $,
                abort,
            )),
        })
        
        export const Option_Constraints: declarations.Option_Constraints = ($, abort) => p_.from.optional($).map(($) => p_.from.dictionary($).map(
            ($, id) => __operations.namespaces.structure.Value_Reference(
                $,
                abort,
            ),
        ))
        
        export const Reference: declarations.Reference = ($, abort) => ({
            'referent': p_.change_context($['referent'], ($) => ({
                'constraints': {
                    'dictionary': p_implement_me("VALUE CONSTRAINT: dictionary"),
                },
                'value': __operations.namespaces.structure.Value_Reference(
                    $,
                    abort,
                ),
            })),
            'type': p_.change_context($['type'], ($) => ({
                'dependency': p_.change_context($['dependency'], ($) => p_.from.state($).decide(($): s_target.namespaces.structure.types.Reference.type_.dependency => {
                    switch ($[0]) {
                        case 'acyclic': return p_.option($, ($): s_target.namespaces.structure.types.Reference.type_.dependency => p_.change_context($, ($) => ['acyclic', null]))
                        case 'cyclic': return p_.option($, ($): s_target.namespaces.structure.types.Reference.type_.dependency => p_.change_context($, ($) => ['cyclic', null]))
                        default: return p_.exhaustive($[0])
                    }
                })),
                'constraints': p_.change_context($['constraints'], ($) => __operations.namespaces.structure.Reference_Constraints(
                    $,
                    abort,
                )),
            })),
        })
        
        export const Reference_Constraints: declarations.Reference_Constraints = ($, abort) => p_.from.optional($).map(($) => p_.from.dictionary($).map(
            ($, id) => __operations.namespaces.structure.Value_Reference(
                $,
                abort,
            ),
        ))
        
        export const Structure: declarations.Structure = ($, abort) => ({
            'namespaces': p_.change_context($['namespaces'], ($) => __operations.namespaces.structure.Namespaces(
                $,
                abort,
            )),
            'basic types': p_.change_context($['basic types'], ($) => __operations.namespaces.structure.Basic_Types(
                $,
                abort,
            )),
            'types': p_.change_context($['types'], ($) => __operations.namespaces.structure.Types(
                $,
                abort,
            )),
        })
        
        export const Value_Result: declarations.Value_Result = ($, abort) => p_.from.optional($).map(($) => __operations.namespaces.structure.Value_Reference(
            $,
            abort,
        ))
        export namespace namespaces {}
    }
    export namespace declarations {
        
        export namespace declarations {
            
            export type Presence = p_.Refiner<
                s_target.namespaces.declarations.types.Presence,
                s_error.types.Resolving_Error,
                s_source.namespaces.declarations.types.Presence
            >
            
            export type Signature_Type_Reference = p_.Refiner<
                s_target.namespaces.declarations.types.Signature_Type_Reference,
                s_error.types.Resolving_Error,
                s_source.namespaces.declarations.types.Signature_Type_Reference
            >
            
            export type Signature_Value_Subselection = p_.Refiner<
                s_target.namespaces.declarations.types.Signature_Value_Subselection,
                s_error.types.Resolving_Error,
                s_source.namespaces.declarations.types.Signature_Value_Subselection
            >
            
            export type Signature_Value_Reference = p_.Refiner<
                s_target.namespaces.declarations.types.Signature_Value_Reference,
                s_error.types.Resolving_Error,
                s_source.namespaces.declarations.types.Signature_Value_Reference
            >
            
            export type Signature = p_.Refiner<
                s_target.namespaces.declarations.types.Signature,
                s_error.types.Resolving_Error,
                s_source.namespaces.declarations.types.Signature
            >
            
            export type Declarations = p_.Refiner<
                s_target.namespaces.declarations.types.Declarations,
                s_error.types.Resolving_Error,
                s_source.namespaces.declarations.types.Declarations
            >
            
            export type Declaration = p_.Refiner<
                s_target.namespaces.declarations.types.Declaration,
                s_error.types.Resolving_Error,
                s_source.namespaces.declarations.types.Declaration
            >
            
            export type Namespaces = p_.Refiner<
                s_target.namespaces.declarations.types.Namespaces,
                s_error.types.Resolving_Error,
                s_source.namespaces.declarations.types.Namespaces
            >
            
            export type Declaration_Namespace = p_.Refiner<
                s_target.namespaces.declarations.types.Declaration_Namespace,
                s_error.types.Resolving_Error,
                s_source.namespaces.declarations.types.Declaration_Namespace
            >
        }
        
        // implementations
        
        export const Presence: declarations.Presence = ($, abort) => p_.from.state($).decide(($): s_target.namespaces.declarations.types.Presence => {
            switch ($[0]) {
                case 'optional': return p_.option($, ($): s_target.namespaces.declarations.types.Presence => p_.change_context($, ($) => ['optional', null]))
                case 'required': return p_.option($, ($): s_target.namespaces.declarations.types.Presence => p_.change_context($, ($) => ['required', null]))
                default: return p_.exhaustive($[0])
            }
        })
        
        export const Signature_Type_Reference: declarations.Signature_Type_Reference = ($, abort) => ({
            'location': p_.change_context($['location'], ($) => ({
                'value': p_.from.state($).decide(($): s_target.namespaces.declarations.types.Signature_Type_Reference.location.value => {
                    switch ($[0]) {
                        case 'local': return p_.option($, ($): s_target.namespaces.declarations.types.Signature_Type_Reference.location.value => p_.change_context($, ($) => ['local', p_implement_me("SELECTED REF")]))
                        case 'child namespace': return p_.option($, ($): s_target.namespaces.declarations.types.Signature_Type_Reference.location.value => p_.change_context($, ($) => ['child namespace', {
                            'namespace': p_.change_context($['namespace'], ($) => p_implement_me("SELECTED REF")),
                            'type': p_.change_context($['type'], ($) => p_implement_me("SELECTED REF")),
                        }]))
                        case 'sibling namespace': return p_.option($, ($): s_target.namespaces.declarations.types.Signature_Type_Reference.location.value => p_.change_context($, ($) => ['sibling namespace', {
                            'namespace': p_.change_context($['namespace'], ($) => p_implement_me("SELECTED REF")),
                            'type': p_.change_context($['type'], ($) => p_implement_me("SELECTED REF")),
                        }]))
                        default: return p_.exhaustive($[0])
                    }
                }),
                'result': p_implement_me("STATE RESULT"),
            })),
        })
        
        export const Signature_Value_Subselection: declarations.Signature_Value_Subselection = ($, abort) => ({
            'tail': p_.change_context($['tail'], ($) => ({
                'value': p_.from.list($).map(
                    ($) => ({
                        'value': {
                            'value': p_.from.state($).decide(($): s_target.namespaces.declarations.types.Signature_Value_Subselection.tail.value.L.value.value => {
                                switch ($[0]) {
                                    case 'dictionary': return p_.option($, ($): s_target.namespaces.declarations.types.Signature_Value_Subselection.tail.value.L.value.value => p_.change_context($, ($) => ['dictionary', {
                                        'constraints': {
                                            'definition': p_implement_me("OPTION CONSTRAINT: definition"),
                                        },
                                        'value': null,
                                    }]))
                                    case 'group': return p_.option($, ($): s_target.namespaces.declarations.types.Signature_Value_Subselection.tail.value.L.value.value => p_.change_context($, ($) => ['group', {
                                        'constraints': {
                                            'definition': p_implement_me("OPTION CONSTRAINT: definition"),
                                        },
                                        'value': p_implement_me("SELECTED REF"),
                                    }]))
                                    case 'list': return p_.option($, ($): s_target.namespaces.declarations.types.Signature_Value_Subselection.tail.value.L.value.value => p_.change_context($, ($) => ['list', {
                                        'constraints': {
                                            'definition': p_implement_me("OPTION CONSTRAINT: definition"),
                                        },
                                        'value': null,
                                    }]))
                                    case 'optional': return p_.option($, ($): s_target.namespaces.declarations.types.Signature_Value_Subselection.tail.value.L.value.value => p_.change_context($, ($) => ['optional', {
                                        'constraints': {
                                            'definition': p_implement_me("OPTION CONSTRAINT: definition"),
                                        },
                                        'value': null,
                                    }]))
                                    case 'state': return p_.option($, ($): s_target.namespaces.declarations.types.Signature_Value_Subselection.tail.value.L.value.value => p_.change_context($, ($) => ['state', {
                                        'constraints': {
                                            'definition': p_implement_me("OPTION CONSTRAINT: definition"),
                                        },
                                        'value': p_implement_me("SELECTED REF"),
                                    }]))
                                    default: return p_.exhaustive($[0])
                                }
                            }),
                            'result': p_implement_me("STATE RESULT"),
                        },
                        'result': p_implement_me("LIST ITEM RESULT"),
                    }),
                ),
                'result': p_implement_me("LIST RESULT"),
            })),
        })
        
        export const Signature_Value_Reference: declarations.Signature_Value_Reference = ($, abort) => ({
            'type': p_.change_context($['type'], ($) => __operations.namespaces.declarations.Signature_Type_Reference(
                $,
                abort,
            )),
            'subselection': p_.change_context($['subselection'], ($) => __operations.namespaces.declarations.Signature_Value_Subselection(
                $,
                abort,
            )),
        })
        
        export const Signature: declarations.Signature = ($, abort) => ({
            'values': p_.change_context($['values'], ($) => p_.from.dictionary($).map(
                ($, id) => ({
                    'value': p_.change_context($['value'], ($) => __operations.namespaces.declarations.Signature_Value_Reference(
                        $,
                        abort,
                    )),
                    'presence': p_.change_context($['presence'], ($) => __operations.namespaces.declarations.Presence(
                        $,
                        abort,
                    )),
                }),
            )),
            'lookups': p_.change_context($['lookups'], ($) => p_.from.dictionary($).map(
                ($, id) => ({
                    'referent': p_.change_context($['referent'], ($) => ({
                        'constraints': {
                            'dictionary': p_implement_me("VALUE CONSTRAINT: dictionary"),
                        },
                        'value': __operations.namespaces.declarations.Signature_Value_Reference(
                            $,
                            abort,
                        ),
                    })),
                    'type': p_.change_context($['type'], ($) => p_.from.state($).decide(($): s_target.namespaces.declarations.types.Signature.lookups.D.type_ => {
                        switch ($[0]) {
                            case 'cyclic': return p_.option($, ($): s_target.namespaces.declarations.types.Signature.lookups.D.type_ => p_.change_context($, ($) => ['cyclic', null]))
                            case 'acyclic': return p_.option($, ($): s_target.namespaces.declarations.types.Signature.lookups.D.type_ => p_.change_context($, ($) => ['acyclic', null]))
                            default: return p_.exhaustive($[0])
                        }
                    })),
                    'presence': p_.change_context($['presence'], ($) => __operations.namespaces.declarations.Presence(
                        $,
                        abort,
                    )),
                }),
            )),
        })
        
        export const Declarations: declarations.Declarations = ($, abort) => p_.from.dictionary($).map(
            ($, id) => ({
                'benchmark': p_implement_me("BENCHMARK ENTRY"),
                'value': __operations.namespaces.declarations.Declaration(
                    $,
                    abort,
                ),
            }),
        )
        
        export const Declaration: declarations.Declaration = ($, abort) => ({
            'signature': p_.change_context($['signature'], ($) => ({
                'value': p_.from.state($).decide(($): s_target.namespaces.declarations.types.Declaration.signature.value => {
                    switch ($[0]) {
                        case 'local': return p_.option($, ($): s_target.namespaces.declarations.types.Declaration.signature.value => p_.change_context($, ($) => ['local', __operations.namespaces.declarations.Signature(
                            $,
                            abort,
                        )]))
                        case 'same as': return p_.option($, ($): s_target.namespaces.declarations.types.Declaration.signature.value => p_.change_context($, ($) => ['same as', p_implement_me("SELECTED REF")]))
                        default: return p_.exhaustive($[0])
                    }
                }),
                'result': p_implement_me("STATE RESULT"),
            })),
        })
        
        export const Namespaces: declarations.Namespaces = ($, abort) => p_.from.dictionary($).map(
            ($, id) => ({
                'benchmark': p_implement_me("BENCHMARK ENTRY"),
                'value': __operations.namespaces.declarations.Declaration_Namespace(
                    $,
                    abort,
                ),
            }),
        )
        
        export const Declaration_Namespace: declarations.Declaration_Namespace = ($, abort) => ({
            'namespaces': p_.change_context($['namespaces'], ($) => __operations.namespaces.declarations.Namespaces(
                $,
                abort,
            )),
            'types': p_.change_context($['types'], ($) => __operations.namespaces.declarations.Declarations(
                $,
                abort,
            )),
        })
        export namespace namespaces {}
    }
    export namespace resolver {
        
        export namespace declarations {
            
            export type Absence_Constraints = p_.Refiner<
                s_target.namespaces.resolver.types.Absence_Constraints,
                s_error.types.Resolving_Error,
                s_source.namespaces.resolver.types.Absence_Constraints
            >
            
            export type Type_Reference = p_.Refiner<
                s_target.namespaces.resolver.types.Type_Reference,
                s_error.types.Resolving_Error,
                s_source.namespaces.resolver.types.Type_Reference
            >
            
            export type Value_Subselection = p_.Refiner<
                s_target.namespaces.resolver.types.Value_Subselection,
                s_error.types.Resolving_Error,
                s_source.namespaces.resolver.types.Value_Subselection
            >
            
            export type Value_Reference = p_.Refiner<
                s_target.namespaces.resolver.types.Value_Reference,
                s_error.types.Resolving_Error,
                s_source.namespaces.resolver.types.Value_Reference
            >
            
            export type Relative_Value_Selection = p_.Refiner<
                s_target.namespaces.resolver.types.Relative_Value_Selection,
                s_error.types.Resolving_Error,
                s_source.namespaces.resolver.types.Relative_Value_Selection
            >
            
            export type Guaranteed_Value_Selection = p_.Refiner<
                s_target.namespaces.resolver.types.Guaranteed_Value_Selection,
                s_error.types.Resolving_Error,
                s_source.namespaces.resolver.types.Guaranteed_Value_Selection
            >
            
            export type Benchmark = p_.Refiner<
                s_target.namespaces.resolver.types.Benchmark,
                s_error.types.Resolving_Error,
                s_source.namespaces.resolver.types.Benchmark
            >
            
            export type Constraint = p_.Refiner<
                s_target.namespaces.resolver.types.Constraint,
                s_error.types.Resolving_Error,
                s_source.namespaces.resolver.types.Constraint
            >
            
            export type Lookup_Selection = p_.Refiner<
                s_target.namespaces.resolver.types.Lookup_Selection,
                s_error.types.Resolving_Error,
                s_source.namespaces.resolver.types.Lookup_Selection
            >
            
            export type Namespaces = p_.Refiner<
                s_target.namespaces.resolver.types.Namespaces,
                s_error.types.Resolving_Error,
                s_source.namespaces.resolver.types.Namespaces
            >
            
            export type Possible_Value_Selection = p_.Refiner<
                s_target.namespaces.resolver.types.Possible_Value_Selection,
                s_error.types.Resolving_Error,
                s_source.namespaces.resolver.types.Possible_Value_Selection
            >
            
            export type Option_Constraints = p_.Refiner<
                s_target.namespaces.resolver.types.Option_Constraints,
                s_error.types.Resolving_Error,
                s_source.namespaces.resolver.types.Option_Constraints
            >
            
            export type Optional_Value_Initialization = p_.Refiner<
                s_target.namespaces.resolver.types.Optional_Value_Initialization,
                s_error.types.Resolving_Error,
                s_source.namespaces.resolver.types.Optional_Value_Initialization
            >
            
            export type Reference_Constraints = p_.Refiner<
                s_target.namespaces.resolver.types.Reference_Constraints,
                s_error.types.Resolving_Error,
                s_source.namespaces.resolver.types.Reference_Constraints
            >
            
            export type Reference_To_Value_Constraint = p_.Refiner<
                s_target.namespaces.resolver.types.Reference_To_Value_Constraint,
                s_error.types.Resolving_Error,
                s_source.namespaces.resolver.types.Reference_To_Value_Constraint
            >
            
            export type Resolver = p_.Refiner<
                s_target.namespaces.resolver.types.Resolver,
                s_error.types.Resolving_Error,
                s_source.namespaces.resolver.types.Resolver
            >
            
            export type Result_Selection = p_.Refiner<
                s_target.namespaces.resolver.types.Result_Selection,
                s_error.types.Resolving_Error,
                s_source.namespaces.resolver.types.Result_Selection
            >
            
            export type Value_Group = p_.Refiner<
                s_target.namespaces.resolver.types.Value_Group,
                s_error.types.Resolving_Error,
                s_source.namespaces.resolver.types.Value_Group
            >
            
            export type Value_List_Result = p_.Refiner<
                s_target.namespaces.resolver.types.Value_List_Result,
                s_error.types.Resolving_Error,
                s_source.namespaces.resolver.types.Value_List_Result
            >
            
            export type Value = p_.Refiner<
                s_target.namespaces.resolver.types.Value,
                s_error.types.Resolving_Error,
                s_source.namespaces.resolver.types.Value
            >
            
            export type Types = p_.Refiner<
                s_target.namespaces.resolver.types.Types,
                s_error.types.Resolving_Error,
                s_source.namespaces.resolver.types.Types
            >
            
            export type Value_Constraint = p_.Refiner<
                s_target.namespaces.resolver.types.Value_Constraint,
                s_error.types.Resolving_Error,
                s_source.namespaces.resolver.types.Value_Constraint
            >
            
            export type Value_Constraints = p_.Refiner<
                s_target.namespaces.resolver.types.Value_Constraints,
                s_error.types.Resolving_Error,
                s_source.namespaces.resolver.types.Value_Constraints
            >
        }
        
        // implementations
        
        export const Absence_Constraints: declarations.Absence_Constraints = ($, abort) => p_.from.optional($).map(($) => p_.from.dictionary($).map(
            ($, id) => __operations.namespaces.resolver.Possible_Value_Selection(
                $,
                abort,
            ),
        ))
        
        export const Type_Reference: declarations.Type_Reference = ($, abort) => ({
            'location': p_.change_context($['location'], ($) => ({
                'value': p_.from.state($).decide(($): s_target.namespaces.resolver.types.Type_Reference.location.value => {
                    switch ($[0]) {
                        case 'local': return p_.option($, ($): s_target.namespaces.resolver.types.Type_Reference.location.value => p_.change_context($, ($) => ['local', p_implement_me("SELECTED REF")]))
                        case 'child namespace': return p_.option($, ($): s_target.namespaces.resolver.types.Type_Reference.location.value => p_.change_context($, ($) => ['child namespace', {
                            'namespace': p_.change_context($['namespace'], ($) => p_implement_me("SELECTED REF")),
                            'type': p_.change_context($['type'], ($) => p_implement_me("SELECTED REF")),
                        }]))
                        case 'sibling namespace': return p_.option($, ($): s_target.namespaces.resolver.types.Type_Reference.location.value => p_.change_context($, ($) => ['sibling namespace', {
                            'namespace': p_.change_context($['namespace'], ($) => p_implement_me("SELECTED REF")),
                            'type': p_.change_context($['type'], ($) => p_implement_me("SELECTED REF")),
                        }]))
                        default: return p_.exhaustive($[0])
                    }
                }),
                'result': p_implement_me("STATE RESULT"),
            })),
        })
        
        export const Value_Subselection: declarations.Value_Subselection = ($, abort) => ({
            'tail': p_.change_context($['tail'], ($) => ({
                'value': p_.from.list($).map(
                    ($) => ({
                        'value': {
                            'value': p_.from.state($).decide(($): s_target.namespaces.resolver.types.Value_Subselection.tail.value.L.value.value => {
                                switch ($[0]) {
                                    case 'dictionary': return p_.option($, ($): s_target.namespaces.resolver.types.Value_Subselection.tail.value.L.value.value => p_.change_context($, ($) => ['dictionary', {
                                        'constraints': {
                                            'definition': p_implement_me("OPTION CONSTRAINT: definition"),
                                        },
                                        'value': null,
                                    }]))
                                    case 'group': return p_.option($, ($): s_target.namespaces.resolver.types.Value_Subselection.tail.value.L.value.value => p_.change_context($, ($) => ['group', {
                                        'constraints': {
                                            'definition': p_implement_me("OPTION CONSTRAINT: definition"),
                                        },
                                        'value': p_implement_me("SELECTED REF"),
                                    }]))
                                    case 'list': return p_.option($, ($): s_target.namespaces.resolver.types.Value_Subselection.tail.value.L.value.value => p_.change_context($, ($) => ['list', {
                                        'constraints': {
                                            'definition': p_implement_me("OPTION CONSTRAINT: definition"),
                                        },
                                        'value': null,
                                    }]))
                                    case 'optional': return p_.option($, ($): s_target.namespaces.resolver.types.Value_Subselection.tail.value.L.value.value => p_.change_context($, ($) => ['optional', {
                                        'constraints': {
                                            'definition': p_implement_me("OPTION CONSTRAINT: definition"),
                                        },
                                        'value': null,
                                    }]))
                                    case 'state': return p_.option($, ($): s_target.namespaces.resolver.types.Value_Subselection.tail.value.L.value.value => p_.change_context($, ($) => ['state', {
                                        'constraints': {
                                            'definition': p_implement_me("OPTION CONSTRAINT: definition"),
                                        },
                                        'value': p_implement_me("SELECTED REF"),
                                    }]))
                                    default: return p_.exhaustive($[0])
                                }
                            }),
                            'result': p_implement_me("STATE RESULT"),
                        },
                        'result': p_implement_me("LIST ITEM RESULT"),
                    }),
                ),
                'result': p_implement_me("LIST RESULT"),
            })),
        })
        
        export const Value_Reference: declarations.Value_Reference = ($, abort) => ({
            'type': p_.change_context($['type'], ($) => __operations.namespaces.resolver.Type_Reference(
                $,
                abort,
            )),
            'path': p_.change_context($['path'], ($) => __operations.namespaces.resolver.Value_Subselection(
                $,
                abort,
            )),
        })
        
        export const Relative_Value_Selection: declarations.Relative_Value_Selection = ($, abort) => ({
            'path': p_.change_context($['path'], ($) => ({
                'value': p_.from.list($).map(
                    ($) => ({
                        'value': {
                            'value': p_.from.state($).decide(($): s_target.namespaces.resolver.types.Relative_Value_Selection.path.value.L.value.value => {
                                switch ($[0]) {
                                    case 'benchmark link': return p_.option($, ($): s_target.namespaces.resolver.types.Relative_Value_Selection.path.value.L.value.value => p_.change_context($, ($) => ['benchmark link', __operations.namespaces.resolver.Value_Reference(
                                        $,
                                        abort,
                                    )]))
                                    case 'component constraint': return p_.option($, ($): s_target.namespaces.resolver.types.Relative_Value_Selection.path.value.L.value.value => p_.change_context($, ($) => ['component constraint', {
                                        'constraints': {
                                            'definition': p_implement_me("OPTION CONSTRAINT: definition"),
                                        },
                                        'value': {
                                            'name': p_.change_context($['name'], ($) => $),
                                            'target': p_.change_context($['target'], ($) => __operations.namespaces.resolver.Value_Reference(
                                                $,
                                                abort,
                                            )),
                                        },
                                    }]))
                                    case 'component': return p_.option($, ($): s_target.namespaces.resolver.types.Relative_Value_Selection.path.value.L.value.value => p_.change_context($, ($) => ['component', {
                                        'constraints': {
                                            'definition': p_implement_me("OPTION CONSTRAINT: definition"),
                                        },
                                        'value': null,
                                    }]))
                                    case 'group': return p_.option($, ($): s_target.namespaces.resolver.types.Relative_Value_Selection.path.value.L.value.value => p_.change_context($, ($) => ['group', {
                                        'constraints': {
                                            'definition': p_implement_me("OPTION CONSTRAINT: definition"),
                                        },
                                        'value': p_implement_me("SELECTED REF"),
                                    }]))
                                    case 'list result': return p_.option($, ($): s_target.namespaces.resolver.types.Relative_Value_Selection.path.value.L.value.value => p_.change_context($, ($) => ['list result', {
                                        'constraints': {
                                            'definition': p_implement_me("OPTION CONSTRAINT: definition"),
                                        },
                                        'value': null,
                                    }]))
                                    case 'option constraint': return p_.option($, ($): s_target.namespaces.resolver.types.Relative_Value_Selection.path.value.L.value.value => p_.change_context($, ($) => ['option constraint', {
                                        'constraints': {
                                            'definition': p_implement_me("OPTION CONSTRAINT: definition"),
                                        },
                                        'value': {
                                            'option': p_.change_context($['option'], ($) => p_implement_me("SELECTED REF")),
                                            'constraint': p_.change_context($['constraint'], ($) => p_implement_me("SELECTED REF")),
                                        },
                                    }]))
                                    case 'optional': return p_.option($, ($): s_target.namespaces.resolver.types.Relative_Value_Selection.path.value.L.value.value => p_.change_context($, ($) => ['optional', {
                                        'constraints': {
                                            'definition': p_implement_me("OPTION CONSTRAINT: definition"),
                                        },
                                        'value': null,
                                    }]))
                                    case 'optional value constraint': return p_.option($, ($): s_target.namespaces.resolver.types.Relative_Value_Selection.path.value.L.value.value => p_.change_context($, ($) => ['optional value constraint', {
                                        'constraints': {
                                            'definition': p_implement_me("OPTION CONSTRAINT: definition"),
                                        },
                                        'value': p_implement_me("SELECTED REF"),
                                    }]))
                                    case 'reference constraint': return p_.option($, ($): s_target.namespaces.resolver.types.Relative_Value_Selection.path.value.L.value.value => p_.change_context($, ($) => ['reference constraint', {
                                        'constraints': {
                                            'definition': p_implement_me("OPTION CONSTRAINT: definition"),
                                        },
                                        'value': p_implement_me("SELECTED REF"),
                                    }]))
                                    case 'reference': return p_.option($, ($): s_target.namespaces.resolver.types.Relative_Value_Selection.path.value.L.value.value => p_.change_context($, ($) => ['reference', {
                                        'constraints': {
                                            'definition': p_implement_me("OPTION CONSTRAINT: definition"),
                                        },
                                        'value': {},
                                    }]))
                                    case 'state result': return p_.option($, ($): s_target.namespaces.resolver.types.Relative_Value_Selection.path.value.L.value.value => p_.change_context($, ($) => ['state result', {
                                        'constraints': {
                                            'definition': p_implement_me("OPTION CONSTRAINT: definition"),
                                        },
                                        'value': null,
                                    }]))
                                    default: return p_.exhaustive($[0])
                                }
                            }),
                            'result': p_implement_me("STATE RESULT"),
                        },
                        'result': p_implement_me("LIST ITEM RESULT"),
                    }),
                ),
                'result': p_implement_me("LIST RESULT"),
            })),
        })
        
        export const Guaranteed_Value_Selection: declarations.Guaranteed_Value_Selection = ($, abort) => ({
            'start': p_.change_context($['start'], ($) => ({
                'value': p_.from.state($).decide(($): s_target.namespaces.resolver.types.Guaranteed_Value_Selection.start.value => {
                    switch ($[0]) {
                        case 'optional fallback': return p_.option($, ($): s_target.namespaces.resolver.types.Guaranteed_Value_Selection.start.value => p_.change_context($, ($) => ['optional fallback', {
                            'selection': p_.change_context($['selection'], ($) => __operations.namespaces.resolver.Possible_Value_Selection(
                                $,
                                abort,
                            )),
                            'fallback': p_.change_context($['fallback'], ($) => __operations.namespaces.resolver.Guaranteed_Value_Selection(
                                $,
                                abort,
                            )),
                        }]))
                        case 'sibling': return p_.option($, ($): s_target.namespaces.resolver.types.Guaranteed_Value_Selection.start.value => p_.change_context($, ($) => ['sibling', p_implement_me("SELECTED REF")]))
                        case 'parent sibling': return p_.option($, ($): s_target.namespaces.resolver.types.Guaranteed_Value_Selection.start.value => p_.change_context($, ($) => ['parent sibling', p_implement_me("SELECTED REF")]))
                        case 'option constraint': return p_.option($, ($): s_target.namespaces.resolver.types.Guaranteed_Value_Selection.start.value => p_.change_context($, ($) => ['option constraint', {
                            'constraints': {
                                'oc': p_implement_me("OPTION CONSTRAINT: oc"),
                            },
                            'value': p_implement_me("SELECTED REF"),
                        }]))
                        case 'list cursor': return p_.option($, ($): s_target.namespaces.resolver.types.Guaranteed_Value_Selection.start.value => p_.change_context($, ($) => ['list cursor', {
                            'constraints': {
                                'result': p_implement_me("OPTION CONSTRAINT: result"),
                            },
                            'value': null,
                        }]))
                        case 'linked entry': return p_.option($, ($): s_target.namespaces.resolver.types.Guaranteed_Value_Selection.start.value => p_.change_context($, ($) => ['linked entry', {
                            'constraints': {
                                'entry': p_implement_me("OPTION CONSTRAINT: entry"),
                            },
                            'value': null,
                        }]))
                        case 'constraint': return p_.option($, ($): s_target.namespaces.resolver.types.Guaranteed_Value_Selection.start.value => p_.change_context($, ($) => ['constraint', {
                            'value': p_.from.state($).decide(($): s_target.namespaces.resolver.types.Guaranteed_Value_Selection.start.value.constraint.value => {
                                switch ($[0]) {
                                    case 'component': return p_.option($, ($): s_target.namespaces.resolver.types.Guaranteed_Value_Selection.start.value.constraint.value => p_.change_context($, ($) => ['component', {
                                        'property': p_.change_context($['property'], ($) => ({
                                            'constraints': {
                                                'component': p_implement_me("VALUE CONSTRAINT: component"),
                                            },
                                            'value': p_implement_me("SELECTED REF"),
                                        })),
                                        'constraint': p_.change_context($['constraint'], ($) => p_implement_me("SELECTED REF")),
                                    }]))
                                    case 'reference': return p_.option($, ($): s_target.namespaces.resolver.types.Guaranteed_Value_Selection.start.value.constraint.value => p_.change_context($, ($) => ['reference', {
                                        'property': p_.change_context($['property'], ($) => ({
                                            'constraints': {
                                                'reference': p_implement_me("VALUE CONSTRAINT: reference"),
                                            },
                                            'value': p_implement_me("SELECTED REF"),
                                        })),
                                        'constraint': p_.change_context($['constraint'], ($) => p_implement_me("SELECTED REF")),
                                    }]))
                                    default: return p_.exhaustive($[0])
                                }
                            }),
                            'result': p_implement_me("STATE RESULT"),
                        }]))
                        case 'parameter': return p_.option($, ($): s_target.namespaces.resolver.types.Guaranteed_Value_Selection.start.value => p_.change_context($, ($) => ['parameter', p_implement_me("SELECTED REF")]))
                        case 'result': return p_.option($, ($): s_target.namespaces.resolver.types.Guaranteed_Value_Selection.start.value => p_.change_context($, ($) => ['result', {
                            'value': p_.from.state($).decide(($): s_target.namespaces.resolver.types.Guaranteed_Value_Selection.start.value.result.value => {
                                switch ($[0]) {
                                    case 'list': return p_.option($, ($): s_target.namespaces.resolver.types.Guaranteed_Value_Selection.start.value.result.value => p_.change_context($, ($) => ['list', {
                                        'property': p_.change_context($['property'], ($) => ({
                                            'constraints': {
                                                'list': p_implement_me("VALUE CONSTRAINT: list"),
                                                'result': p_implement_me("VALUE CONSTRAINT: result"),
                                            },
                                            'value': p_implement_me("SELECTED REF"),
                                        })),
                                    }]))
                                    case 'state': return p_.option($, ($): s_target.namespaces.resolver.types.Guaranteed_Value_Selection.start.value.result.value => p_.change_context($, ($) => ['state', {
                                        'property': p_.change_context($['property'], ($) => ({
                                            'constraints': {
                                                'state': p_implement_me("VALUE CONSTRAINT: state"),
                                                'result': p_implement_me("VALUE CONSTRAINT: result"),
                                            },
                                            'value': p_implement_me("SELECTED REF"),
                                        })),
                                    }]))
                                    case 'optional value': return p_.option($, ($): s_target.namespaces.resolver.types.Guaranteed_Value_Selection.start.value.result.value => p_.change_context($, ($) => ['optional value', {
                                        'property': p_.change_context($['property'], ($) => ({
                                            'constraints': {
                                                'optional': p_implement_me("VALUE CONSTRAINT: optional"),
                                                'result': p_implement_me("VALUE CONSTRAINT: result"),
                                            },
                                            'value': p_implement_me("SELECTED REF"),
                                        })),
                                    }]))
                                    default: return p_.exhaustive($[0])
                                }
                            }),
                            'result': p_implement_me("STATE RESULT"),
                        }]))
                        default: return p_.exhaustive($[0])
                    }
                }),
                'result': p_implement_me("STATE RESULT"),
            })),
            'tail': p_.change_context($['tail'], ($) => __operations.namespaces.resolver.Relative_Value_Selection(
                $,
                abort,
            )),
        })
        
        export const Benchmark: declarations.Benchmark = ($, abort) => ({
            'selection': p_.change_context($['selection'], ($) => ({
                'constraints': {
                    'dictionary': p_implement_me("VALUE CONSTRAINT: dictionary"),
                },
                'value': __operations.namespaces.resolver.Guaranteed_Value_Selection(
                    $,
                    abort,
                ),
            })),
            'coverage': p_.change_context($['coverage'], ($) => p_.from.state($).decide(($): s_target.namespaces.resolver.types.Benchmark.coverage => {
                switch ($[0]) {
                    case 'dense': return p_.option($, ($): s_target.namespaces.resolver.types.Benchmark.coverage => p_.change_context($, ($) => ['dense', null]))
                    case 'sparse': return p_.option($, ($): s_target.namespaces.resolver.types.Benchmark.coverage => p_.change_context($, ($) => ['sparse', null]))
                    default: return p_.exhaustive($[0])
                }
            })),
        })
        
        export const Constraint: declarations.Constraint = ($, abort) => ({
            'selection': p_.change_context($['selection'], ($) => __operations.namespaces.resolver.Relative_Value_Selection(
                $,
                abort,
            )),
            'type': p_.change_context($['type'], ($) => ({
                'value': p_.from.state($).decide(($): s_target.namespaces.resolver.types.Constraint.type_.value => {
                    switch ($[0]) {
                        case 'state': return p_.option($, ($): s_target.namespaces.resolver.types.Constraint.type_.value => p_.change_context($, ($) => ['state', {
                            'constraints': {
                                'state': p_implement_me("OPTION CONSTRAINT: state"),
                            },
                            'value': {
                                'option': p_.change_context($['option'], ($) => p_implement_me("SELECTED REF")),
                            },
                        }]))
                        case 'optional value': return p_.option($, ($): s_target.namespaces.resolver.types.Constraint.type_.value => p_.change_context($, ($) => ['optional value', {
                            'constraints': {
                                'optional': p_implement_me("OPTION CONSTRAINT: optional"),
                            },
                            'value': {},
                        }]))
                        default: return p_.exhaustive($[0])
                    }
                }),
                'result': p_implement_me("STATE RESULT"),
            })),
        })
        
        export const Lookup_Selection: declarations.Lookup_Selection = ($, abort) => ({
            'type': p_.change_context($['type'], ($) => ({
                'value': p_.from.state($).decide(($): s_target.namespaces.resolver.types.Lookup_Selection.type_.value => {
                    switch ($[0]) {
                        case 'acyclic': return p_.option($, ($): s_target.namespaces.resolver.types.Lookup_Selection.type_.value => p_.change_context($, ($) => ['acyclic', {
                            'value': p_.from.state($).decide(($): s_target.namespaces.resolver.types.Lookup_Selection.type_.value.acyclic.value => {
                                switch ($[0]) {
                                    case 'siblings': return p_.option($, ($): s_target.namespaces.resolver.types.Lookup_Selection.type_.value.acyclic.value => p_.change_context($, ($) => ['siblings', {
                                        'constraints': {
                                            'cd': p_implement_me("OPTION CONSTRAINT: cd"),
                                        },
                                        'value': null,
                                    }]))
                                    case 'resolved dictionary': return p_.option($, ($): s_target.namespaces.resolver.types.Lookup_Selection.type_.value.acyclic.value => p_.change_context($, ($) => ['resolved dictionary', {
                                        'selection': p_.change_context($['selection'], ($) => ({
                                            'constraints': {
                                                'dictionary': p_implement_me("VALUE CONSTRAINT: dictionary"),
                                            },
                                            'value': __operations.namespaces.resolver.Guaranteed_Value_Selection(
                                                $,
                                                abort,
                                            ),
                                        })),
                                    }]))
                                    default: return p_.exhaustive($[0])
                                }
                            }),
                            'result': p_implement_me("STATE RESULT"),
                        }]))
                        case 'cyclic': return p_.option($, ($): s_target.namespaces.resolver.types.Lookup_Selection.type_.value => p_.change_context($, ($) => ['cyclic', {
                            'value': p_.from.state($).decide(($): s_target.namespaces.resolver.types.Lookup_Selection.type_.value.cyclic.value => {
                                switch ($[0]) {
                                    case 'siblings': return p_.option($, ($): s_target.namespaces.resolver.types.Lookup_Selection.type_.value.cyclic.value => p_.change_context($, ($) => ['siblings', {
                                        'constraints': {
                                            'cd': p_implement_me("OPTION CONSTRAINT: cd"),
                                        },
                                        'value': null,
                                    }]))
                                    default: return p_.exhaustive($[0])
                                }
                            }),
                            'result': p_implement_me("STATE RESULT"),
                        }]))
                        case 'parameter': return p_.option($, ($): s_target.namespaces.resolver.types.Lookup_Selection.type_.value => p_.change_context($, ($) => ['parameter', p_implement_me("SELECTED REF")]))
                        default: return p_.exhaustive($[0])
                    }
                }),
                'result': p_implement_me("STATE RESULT"),
            })),
        })
        
        export const Namespaces: declarations.Namespaces = ($, abort) => p_.from.dictionary($).map(
            ($, id) => ({
                'benchmark': p_implement_me("BENCHMARK ENTRY"),
                'value': __operations.namespaces.resolver.Resolver(
                    $,
                    abort,
                ),
            }),
        )
        
        export const Possible_Value_Selection: declarations.Possible_Value_Selection = ($, abort) => ({
            'value': p_.from.state($).decide(($): s_target.namespaces.resolver.types.Possible_Value_Selection.value => {
                switch ($[0]) {
                    case 'optional value': return p_.option($, ($): s_target.namespaces.resolver.types.Possible_Value_Selection.value => p_.change_context($, ($) => ['optional value', {
                        'selection': p_.change_context($['selection'], ($) => ({
                            'constraints': {
                                'optional': p_implement_me("VALUE CONSTRAINT: optional"),
                            },
                            'value': __operations.namespaces.resolver.Guaranteed_Value_Selection(
                                $,
                                abort,
                            ),
                        })),
                        'tail': p_.change_context($['tail'], ($) => __operations.namespaces.resolver.Relative_Value_Selection(
                            $,
                            abort,
                        )),
                    }]))
                    case 'parameter': return p_.option($, ($): s_target.namespaces.resolver.types.Possible_Value_Selection.value => p_.change_context($, ($) => ['parameter', p_implement_me("SELECTED REF")]))
                    case 'result': return p_.option($, ($): s_target.namespaces.resolver.types.Possible_Value_Selection.value => p_.change_context($, ($) => ['result', {
                        'value': p_.from.state($).decide(($): s_target.namespaces.resolver.types.Possible_Value_Selection.value.result.value => {
                            switch ($[0]) {
                                case 'state': return p_.option($, ($): s_target.namespaces.resolver.types.Possible_Value_Selection.value.result.value => p_.change_context($, ($) => ['state', {
                                    'property': p_.change_context($['property'], ($) => ({
                                        'constraints': {
                                            'state': p_implement_me("VALUE CONSTRAINT: state"),
                                            'result': p_implement_me("VALUE CONSTRAINT: result"),
                                        },
                                        'value': p_implement_me("SELECTED REF"),
                                    })),
                                }]))
                                case 'optional value': return p_.option($, ($): s_target.namespaces.resolver.types.Possible_Value_Selection.value.result.value => p_.change_context($, ($) => ['optional value', {
                                    'property': p_.change_context($['property'], ($) => ({
                                        'constraints': {
                                            'optional': p_implement_me("VALUE CONSTRAINT: optional"),
                                            'result': p_implement_me("VALUE CONSTRAINT: result"),
                                        },
                                        'value': p_implement_me("SELECTED REF"),
                                    })),
                                }]))
                                default: return p_.exhaustive($[0])
                            }
                        }),
                        'result': p_implement_me("STATE RESULT"),
                    }]))
                    default: return p_.exhaustive($[0])
                }
            }),
            'result': p_implement_me("STATE RESULT"),
        })
        
        export const Option_Constraints: declarations.Option_Constraints = ($, abort) => p_.from.optional($).map(($) => ({
            'constraints': {
                'declarations': p_implement_me("VALUE CONSTRAINT: declarations"),
            },
            'value': p_.from.dictionary($).map(
                ($, id) => ({
                    'benchmark': p_implement_me("BENCHMARK ENTRY"),
                    'value': {
                        'value': p_.from.state($).decide(($): s_target.namespaces.resolver.types.Option_Constraints.O.value.D.value.value => {
                            switch ($[0]) {
                                case 'state': return p_.option($, ($): s_target.namespaces.resolver.types.Option_Constraints.O.value.D.value.value => p_.change_context($, ($) => ['state', {
                                    'selection': p_.change_context($['selection'], ($) => ({
                                        'constraints': {
                                            'state': p_implement_me("VALUE CONSTRAINT: state"),
                                        },
                                        'value': __operations.namespaces.resolver.Guaranteed_Value_Selection(
                                            $,
                                            abort,
                                        ),
                                    })),
                                    'option': p_.change_context($['option'], ($) => p_implement_me("SELECTED REF")),
                                }]))
                                case 'assert is set': return p_.option($, ($): s_target.namespaces.resolver.types.Option_Constraints.O.value.D.value.value => p_.change_context($, ($) => ['assert is set', __operations.namespaces.resolver.Possible_Value_Selection(
                                    $,
                                    abort,
                                )]))
                                default: return p_.exhaustive($[0])
                            }
                        }),
                        'result': p_implement_me("STATE RESULT"),
                    },
                }),
            ),
        }))
        
        export const Optional_Value_Initialization: declarations.Optional_Value_Initialization = ($, abort) => p_.from.state($).decide(($): s_target.namespaces.resolver.types.Optional_Value_Initialization => {
            switch ($[0]) {
                case 'not set': return p_.option($, ($): s_target.namespaces.resolver.types.Optional_Value_Initialization => p_.change_context($, ($) => ['not set', null]))
                case 'set': return p_.option($, ($): s_target.namespaces.resolver.types.Optional_Value_Initialization => p_.change_context($, ($) => ['set', __operations.namespaces.resolver.Guaranteed_Value_Selection(
                    $,
                    abort,
                )]))
                case 'selection': return p_.option($, ($): s_target.namespaces.resolver.types.Optional_Value_Initialization => p_.change_context($, ($) => ['selection', __operations.namespaces.resolver.Possible_Value_Selection(
                    $,
                    abort,
                )]))
                default: return p_.exhaustive($[0])
            }
        })
        
        export const Reference_Constraints: declarations.Reference_Constraints = ($, abort) => p_.from.optional($).map(($) => ({
            'constraints': {
                'declarations': p_implement_me("VALUE CONSTRAINT: declarations"),
            },
            'value': p_.from.dictionary($).map(
                ($, id) => ({
                    'benchmark': p_implement_me("BENCHMARK ENTRY"),
                    'value': __operations.namespaces.resolver.Value_Constraint(
                        $,
                        abort,
                    ),
                }),
            ),
        }))
        
        export const Reference_To_Value_Constraint: declarations.Reference_To_Value_Constraint = ($, abort) => p_implement_me("SELECTED REF")
        
        export const Resolver: declarations.Resolver = ($, abort) => ({
            'namespaces': p_.change_context($['namespaces'], ($) => __operations.namespaces.resolver.Namespaces(
                $,
                abort,
            )),
            'types': p_.change_context($['types'], ($) => __operations.namespaces.resolver.Types(
                $,
                abort,
            )),
        })
        
        export const Result_Selection: declarations.Result_Selection = ($, abort) => p_.from.state($).decide(($): s_target.namespaces.resolver.types.Result_Selection => {
            switch ($[0]) {
                case 'context': return p_.option($, ($): s_target.namespaces.resolver.types.Result_Selection => p_.change_context($, ($) => ['context', __operations.namespaces.resolver.Guaranteed_Value_Selection(
                    $,
                    abort,
                )]))
                case 'value': return p_.option($, ($): s_target.namespaces.resolver.types.Result_Selection => p_.change_context($, ($) => ['value', __operations.namespaces.resolver.Relative_Value_Selection(
                    $,
                    abort,
                )]))
                default: return p_.exhaustive($[0])
            }
        })
        
        export const Value_Group: declarations.Value_Group = ($, abort) => p_.from.dictionary($).map(
            ($, id) => ({
                'benchmark': p_implement_me("BENCHMARK ENTRY"),
                'value': {
                    'resolver': p_.change_context($['resolver'], ($) => __operations.namespaces.resolver.Value(
                        $,
                        abort,
                    )),
                },
            }),
        )
        
        export const Value_List_Result: declarations.Value_List_Result = ($, abort) => ({
            'initial': p_.change_context($['initial'], ($) => __operations.namespaces.resolver.Guaranteed_Value_Selection(
                $,
                abort,
            )),
            'next': p_.change_context($['next'], ($) => __operations.namespaces.resolver.Result_Selection(
                $,
                abort,
            )),
        })
        
        export const Value: declarations.Value = ($, abort) => p_.from.state($).decide(($): s_target.namespaces.resolver.types.Value => {
            switch ($[0]) {
                case 'component': return p_.option($, ($): s_target.namespaces.resolver.types.Value => p_.change_context($, ($) => ['component', {
                    'constraints': {
                        'definition': p_implement_me("OPTION CONSTRAINT: definition"),
                    },
                    'value': {
                        'location': p_.change_context($['location'], ($) => ({
                            'value': p_.from.state($).decide(($): s_target.namespaces.resolver.types.Value.component.value.location.value => {
                                switch ($[0]) {
                                    case 'local': return p_.option($, ($): s_target.namespaces.resolver.types.Value.component.value.location.value => p_.change_context($, ($) => ['local', p_implement_me("SELECTED REF")]))
                                    case 'child namespace': return p_.option($, ($): s_target.namespaces.resolver.types.Value.component.value.location.value => p_.change_context($, ($) => ['child namespace', {
                                        'namespace': p_.change_context($['namespace'], ($) => p_implement_me("SELECTED REF")),
                                        'resolver': p_.change_context($['resolver'], ($) => p_implement_me("SELECTED REF")),
                                    }]))
                                    case 'sibling namespace': return p_.option($, ($): s_target.namespaces.resolver.types.Value.component.value.location.value => p_.change_context($, ($) => ['sibling namespace', {
                                        'constraints': {
                                            'declarations': p_implement_me("OPTION CONSTRAINT: declarations"),
                                        },
                                        'value': {
                                            'namespace': p_.change_context($['namespace'], ($) => p_implement_me("SELECTED REF")),
                                            'resolver': p_.change_context($['resolver'], ($) => p_implement_me("SELECTED REF")),
                                        },
                                    }]))
                                    default: return p_.exhaustive($[0])
                                }
                            }),
                            'result': p_implement_me("STATE RESULT"),
                        })),
                        'arguments': p_.change_context($['arguments'], ($) => p_.from.optional($).map(($) => ({
                            'types': p_.change_context($['types'], ($) => p_.from.optional($).map(($) => p_.from.dictionary($).map(
                                ($, id) => ({
                                    'benchmark': p_implement_me("BENCHMARK ENTRY"),
                                    'value': p_.from.state($).decide(($): s_target.namespaces.resolver.types.Value.component.value.arguments_.O.types.O.D.value => {
                                        switch ($[0]) {
                                            case 'optional': return p_.option($, ($): s_target.namespaces.resolver.types.Value.component.value.arguments_.O.types.O.D.value => p_.change_context($, ($) => ['optional', __operations.namespaces.resolver.Optional_Value_Initialization(
                                                $,
                                                abort,
                                            )]))
                                            case 'required': return p_.option($, ($): s_target.namespaces.resolver.types.Value.component.value.arguments_.O.types.O.D.value => p_.change_context($, ($) => ['required', __operations.namespaces.resolver.Guaranteed_Value_Selection(
                                                $,
                                                abort,
                                            )]))
                                            case 'parameter': return p_.option($, ($): s_target.namespaces.resolver.types.Value.component.value.arguments_.O.types.O.D.value => p_.change_context($, ($) => ['parameter', p_implement_me("SELECTED REF")]))
                                            default: return p_.exhaustive($[0])
                                        }
                                    }),
                                }),
                            ))),
                            'lookups': p_.change_context($['lookups'], ($) => p_.from.optional($).map(($) => p_.from.dictionary($).map(
                                ($, id) => ({
                                    'benchmark': p_implement_me("BENCHMARK ENTRY"),
                                    'value': p_.from.state($).decide(($): s_target.namespaces.resolver.types.Value.component.value.arguments_.O.lookups.O.D.value => {
                                        switch ($[0]) {
                                            case 'acyclic': return p_.option($, ($): s_target.namespaces.resolver.types.Value.component.value.arguments_.O.lookups.O.D.value => p_.change_context($, ($) => ['acyclic', null]))
                                            case 'cyclic': return p_.option($, ($): s_target.namespaces.resolver.types.Value.component.value.arguments_.O.lookups.O.D.value => p_.change_context($, ($) => ['cyclic', null]))
                                            case 'selection': return p_.option($, ($): s_target.namespaces.resolver.types.Value.component.value.arguments_.O.lookups.O.D.value => p_.change_context($, ($) => ['selection', __operations.namespaces.resolver.Lookup_Selection(
                                                $,
                                                abort,
                                            )]))
                                            default: return p_.exhaustive($[0])
                                        }
                                    }),
                                }),
                            ))),
                        }))),
                        'constraints': p_.change_context($['constraints'], ($) => __operations.namespaces.resolver.Reference_Constraints(
                            $,
                            abort,
                        )),
                    },
                }]))
                case 'dictionary': return p_.option($, ($): s_target.namespaces.resolver.types.Value => p_.change_context($, ($) => ['dictionary', {
                    'constraints': {
                        'definition': p_implement_me("OPTION CONSTRAINT: definition"),
                    },
                    'value': {
                        'resolver': p_.change_context($['resolver'], ($) => __operations.namespaces.resolver.Value(
                            $,
                            abort,
                        )),
                        'benchmark': p_.change_context($['benchmark'], ($) => p_.from.optional($).map(($) => __operations.namespaces.resolver.Benchmark(
                            $,
                            abort,
                        ))),
                    },
                }]))
                case 'group': return p_.option($, ($): s_target.namespaces.resolver.types.Value => p_.change_context($, ($) => ['group', {
                    'constraints': {
                        'definition': p_implement_me("OPTION CONSTRAINT: definition"),
                    },
                    'value': __operations.namespaces.resolver.Value_Group(
                        $,
                        abort,
                    ),
                }]))
                case 'list': return p_.option($, ($): s_target.namespaces.resolver.types.Value => p_.change_context($, ($) => ['list', {
                    'constraints': {
                        'definition': p_implement_me("OPTION CONSTRAINT: definition"),
                    },
                    'value': {
                        'resolver': p_.change_context($['resolver'], ($) => __operations.namespaces.resolver.Value(
                            $,
                            abort,
                        )),
                        'result': p_.change_context($['result'], ($) => p_.from.optional($).map(($) => ({
                            'constraints': {
                                'definition': p_implement_me("VALUE CONSTRAINT: definition"),
                                'result': p_implement_me("VALUE CONSTRAINT: result"),
                            },
                            'value': __operations.namespaces.resolver.Value_List_Result(
                                $,
                                abort,
                            ),
                        }))),
                    },
                }]))
                case 'nothing': return p_.option($, ($): s_target.namespaces.resolver.types.Value => p_.change_context($, ($) => ['nothing', {
                    'constraints': {
                        'definition': p_implement_me("OPTION CONSTRAINT: definition"),
                    },
                    'value': null,
                }]))
                case 'simple': return p_.option($, ($): s_target.namespaces.resolver.types.Value => p_.change_context($, ($) => ['simple', {
                    'constraints': {
                        'definition': p_implement_me("OPTION CONSTRAINT: definition"),
                    },
                    'value': null,
                }]))
                case 'optional': return p_.option($, ($): s_target.namespaces.resolver.types.Value => p_.change_context($, ($) => ['optional', {
                    'constraints': {
                        'definition': p_implement_me("OPTION CONSTRAINT: definition"),
                    },
                    'value': {
                        'presence': p_.change_context($['presence'], ($) => p_.from.optional($).map(($) => __operations.namespaces.resolver.Possible_Value_Selection(
                            $,
                            abort,
                        ))),
                        'constraints': p_.change_context($['constraints'], ($) => __operations.namespaces.resolver.Option_Constraints(
                            $,
                            abort,
                        )),
                        'resolver': p_.change_context($['resolver'], ($) => __operations.namespaces.resolver.Value(
                            $,
                            abort,
                        )),
                        'not set constraints': p_.change_context($['not set constraints'], ($) => __operations.namespaces.resolver.Absence_Constraints(
                            $,
                            abort,
                        )),
                        'result': p_.change_context($['result'], ($) => p_.from.optional($).map(($) => ({
                            'constraints': {
                                'definition': p_implement_me("VALUE CONSTRAINT: definition"),
                                'result': p_implement_me("VALUE CONSTRAINT: result"),
                            },
                            'value': __operations.namespaces.resolver.Result_Selection(
                                $,
                                abort,
                            ),
                        }))),
                    },
                }]))
                case 'reference': return p_.option($, ($): s_target.namespaces.resolver.types.Value => p_.change_context($, ($) => ['reference', {
                    'constraints': {
                        'definition': p_implement_me("OPTION CONSTRAINT: definition"),
                    },
                    'value': {
                        'type': p_.change_context($['type'], ($) => ({
                            'lookup': p_.change_context($['lookup'], ($) => __operations.namespaces.resolver.Lookup_Selection(
                                $,
                                abort,
                            )),
                            'constraints': p_.change_context($['constraints'], ($) => __operations.namespaces.resolver.Reference_Constraints(
                                $,
                                abort,
                            )),
                        })),
                    },
                }]))
                case 'state': return p_.option($, ($): s_target.namespaces.resolver.types.Value => p_.change_context($, ($) => ['state', {
                    'constraints': {
                        'definition': p_implement_me("OPTION CONSTRAINT: definition"),
                    },
                    'value': {
                        'options': p_.change_context($['options'], ($) => p_.from.dictionary($).map(
                            ($, id) => ({
                                'benchmark': p_implement_me("BENCHMARK ENTRY"),
                                'value': {
                                    'constraints': p_.change_context($['constraints'], ($) => __operations.namespaces.resolver.Option_Constraints(
                                        $,
                                        abort,
                                    )),
                                    'resolver': p_.change_context($['resolver'], ($) => __operations.namespaces.resolver.Value(
                                        $,
                                        abort,
                                    )),
                                    'result': p_.change_context($['result'], ($) => p_.from.optional($).map(($) => __operations.namespaces.resolver.Result_Selection(
                                        $,
                                        abort,
                                    ))),
                                },
                            }),
                        )),
                    },
                }]))
                default: return p_.exhaustive($[0])
            }
        })
        
        export const Types: declarations.Types = ($, abort) => p_.from.dictionary($).map(
            ($, id) => ({
                'benchmark': p_implement_me("BENCHMARK ENTRY"),
                'value': {
                    'root value resolver': p_.change_context($['root value resolver'], ($) => __operations.namespaces.resolver.Value(
                        $,
                        abort,
                    )),
                },
            }),
        )
        
        export const Value_Constraint: declarations.Value_Constraint = ($, abort) => ({
            'start': p_.change_context($['start'], ($) => ({
                'value': p_.from.state($).decide(($): s_target.namespaces.resolver.types.Value_Constraint.start.value => {
                    switch ($[0]) {
                        case 'value': return p_.option($, ($): s_target.namespaces.resolver.types.Value_Constraint.start.value => p_.change_context($, ($) => ['value', null]))
                        case 'sibling': return p_.option($, ($): s_target.namespaces.resolver.types.Value_Constraint.start.value => p_.change_context($, ($) => ['sibling', __operations.namespaces.resolver.Reference_To_Value_Constraint(
                            $,
                            abort,
                        )]))
                        default: return p_.exhaustive($[0])
                    }
                }),
                'result': p_implement_me("STATE RESULT"),
            })),
            'constraint': p_.change_context($['constraint'], ($) => __operations.namespaces.resolver.Constraint(
                $,
                abort,
            )),
        })
        
        export const Value_Constraints: declarations.Value_Constraints = ($, abort) => p_.from.dictionary($).map(
            ($, id) => ({
                'benchmark': p_implement_me("BENCHMARK ENTRY"),
                'value': __operations.namespaces.resolver.Value_Constraint(
                    $,
                    abort,
                ),
            }),
        )
        export namespace namespaces {}
    }
}
