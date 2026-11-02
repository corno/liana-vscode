import type * as p_ from "pareto-core/schema"

import type * as self from "./resolved.js"


export namespace structure {
    
    export namespace Basic_Types {
        
        export namespace D {
            
            export namespace type_ {
                
                export type double_quoted = null
                
                export type undelimited = null
            }
            
            export type type_ =
                | readonly ['double quoted', self.structure.Basic_Types.D.type_.double_quoted]
                | readonly ['undelimited', self.structure.Basic_Types.D.type_.undelimited]
            
            export namespace regular_expression {
                
                export type O = self.structure.Regular_Expression
            }
            
            export type regular_expression = p_.Optional_Value<self.structure.Basic_Types.D.regular_expression.O>
            
            export namespace hyperlink {
                
                export namespace O {
                    
                    export type prefix = string
                    
                    export type suffix = string
                }
                
                export type O = {
                    readonly 'prefix': self.structure.Basic_Types.D.hyperlink.O.prefix
                    readonly 'suffix': self.structure.Basic_Types.D.hyperlink.O.suffix
                }
            }
            
            export type hyperlink = p_.Optional_Value<self.structure.Basic_Types.D.hyperlink.O>
        }
        
        export type D = {
            readonly 'type': self.structure.Basic_Types.D.type_
            readonly 'regular expression': self.structure.Basic_Types.D.regular_expression
            readonly 'hyperlink': self.structure.Basic_Types.D.hyperlink
        }
    }
    
    export type Basic_Types = p_.Dictionary<self.structure.Basic_Types.D>
    
    export namespace Types {
        
        export type D = self.structure.Type
    }
    
    export type Types = p_.Dictionary<self.structure.Types.D>
    
    export namespace Namespaces {
        
        export type D = self.structure.Structure
    }
    
    export type Namespaces = p_.Dictionary<self.structure.Namespaces.D>
    
    export namespace Type {
        
        export namespace visibility {
            
            export type private_ = null
            
            export type private_single_use = null
            
            export type public_ = null
        }
        
        export type visibility =
            | readonly ['private', self.structure.Type.visibility.private_]
            | readonly ['private single use', self.structure.Type.visibility.private_single_use]
            | readonly ['public', self.structure.Type.visibility.public_]
        
        export type root_value = self.structure.Value
    }
    
    export type Type = {
        readonly 'visibility': self.structure.Type.visibility
        readonly 'root value': self.structure.Type.root_value
    }
    
    export namespace Group {
        
        export namespace D {
            
            export namespace description {
                
                export type O = string
            }
            
            export type description = p_.Optional_Value<self.structure.Group.D.description.O>
            
            export type value = self.structure.Value
        }
        
        export type D = {
            readonly 'description': self.structure.Group.D.description
            readonly 'value': self.structure.Group.D.value
        }
    }
    
    export type Group = p_.Dictionary<self.structure.Group.D>
    
    export namespace Value {
        
        export namespace component {
            
            export namespace type_ {
                
                export namespace simple {
                    
                    export namespace value {
                        
                        export namespace local {
                            
                            export type l_entry = self.structure.Types.D
                            
                            export type l_id = string
                        }
                        
                        export type local = {
                            readonly 'l entry': self.structure.Value.component.type_.simple.value.local.l_entry
                            readonly 'l id': self.structure.Value.component.type_.simple.value.local.l_id
                        }
                        
                        export namespace child_namespace {
                            
                            export namespace namespace {
                                
                                export type l_entry = self.structure.Namespaces.D
                                
                                export type l_id = string
                            }
                            
                            export type namespace = {
                                readonly 'l entry': self.structure.Value.component.type_.simple.value.child_namespace.namespace.l_entry
                                readonly 'l id': self.structure.Value.component.type_.simple.value.child_namespace.namespace.l_id
                            }
                            
                            export namespace type_ {
                                
                                export namespace constraints {
                                    
                                    export type public_ = self.structure.Type.visibility.public_
                                }
                                
                                export type constraints = {
                                    readonly 'public': self.structure.Value.component.type_.simple.value.child_namespace.type_.constraints.public_
                                }
                                
                                export namespace value {
                                    
                                    export type l_entry = self.structure.Types.D
                                    
                                    export type l_id = string
                                }
                                
                                export type value = {
                                    readonly 'l entry': self.structure.Value.component.type_.simple.value.child_namespace.type_.value.l_entry
                                    readonly 'l id': self.structure.Value.component.type_.simple.value.child_namespace.type_.value.l_id
                                }
                            }
                            
                            export type type_ = {
                                readonly 'constraints': self.structure.Value.component.type_.simple.value.child_namespace.type_.constraints
                                readonly 'value': self.structure.Value.component.type_.simple.value.child_namespace.type_.value
                            }
                        }
                        
                        export type child_namespace = {
                            readonly 'namespace': self.structure.Value.component.type_.simple.value.child_namespace.namespace
                            readonly 'type': self.structure.Value.component.type_.simple.value.child_namespace.type_
                        }
                        
                        export namespace sibling_namespace {
                            
                            export namespace namespace {
                                
                                export type l_entry = self.structure.Namespaces.D
                                
                                export type l_id = string
                            }
                            
                            export type namespace = {
                                readonly 'l entry': self.structure.Value.component.type_.simple.value.sibling_namespace.namespace.l_entry
                                readonly 'l id': self.structure.Value.component.type_.simple.value.sibling_namespace.namespace.l_id
                            }
                            
                            export namespace type_ {
                                
                                export namespace constraints {
                                    
                                    export type public_ = self.structure.Type.visibility.public_
                                }
                                
                                export type constraints = {
                                    readonly 'public': self.structure.Value.component.type_.simple.value.sibling_namespace.type_.constraints.public_
                                }
                                
                                export namespace value {
                                    
                                    export type l_entry = self.structure.Types.D
                                    
                                    export type l_id = string
                                }
                                
                                export type value = {
                                    readonly 'l entry': self.structure.Value.component.type_.simple.value.sibling_namespace.type_.value.l_entry
                                    readonly 'l id': self.structure.Value.component.type_.simple.value.sibling_namespace.type_.value.l_id
                                }
                            }
                            
                            export type type_ = {
                                readonly 'constraints': self.structure.Value.component.type_.simple.value.sibling_namespace.type_.constraints
                                readonly 'value': self.structure.Value.component.type_.simple.value.sibling_namespace.type_.value
                            }
                        }
                        
                        export type sibling_namespace = {
                            readonly 'namespace': self.structure.Value.component.type_.simple.value.sibling_namespace.namespace
                            readonly 'type': self.structure.Value.component.type_.simple.value.sibling_namespace.type_
                        }
                    }
                    
                    export type value =
                        | readonly ['local', self.structure.Value.component.type_.simple.value.local]
                        | readonly ['child namespace', self.structure.Value.component.type_.simple.value.child_namespace]
                        | readonly ['sibling namespace', self.structure.Value.component.type_.simple.value.sibling_namespace]
                    
                    export type result = self.structure.Type
                }
                
                export type simple = {
                    readonly 'value': self.structure.Value.component.type_.simple.value
                    readonly 'result': self.structure.Value.component.type_.simple.result
                }
                
                export namespace cyclic {
                    
                    export type l_entry = p_.Circular_Dependency<self.structure.Types.D>
                    
                    export type l_id = string
                }
                
                export type cyclic = {
                    readonly 'l entry': self.structure.Value.component.type_.cyclic.l_entry
                    readonly 'l id': self.structure.Value.component.type_.cyclic.l_id
                }
            }
            
            export type type_ =
                | readonly ['simple', self.structure.Value.component.type_.simple]
                | readonly ['cyclic', self.structure.Value.component.type_.cyclic]
            
            export type constraints = self.structure.Reference_Constraints
        }
        
        export type component = {
            readonly 'type': self.structure.Value.component.type_
            readonly 'constraints': self.structure.Value.component.constraints
        }
        
        export type dictionary = self.structure.Dictionary
        
        export type group = self.structure.Group
        
        export namespace list {
            
            export type value = self.structure.Value
            
            export type result = self.structure.Optional_Result
        }
        
        export type list = {
            readonly 'value': self.structure.Value.list.value
            readonly 'result': self.structure.Value.list.result
        }
        
        export type nothing = null
        
        export namespace simple {
            
            export namespace constraints {
                
                export type basic_types = self.structure.Basic_Types
            }
            
            export type constraints = {
                readonly 'basic types': self.structure.Value.simple.constraints.basic_types
            }
            
            export namespace value {
                
                export type l_entry = self.structure.Basic_Types.D
                
                export type l_id = string
            }
            
            export type value = {
                readonly 'l entry': self.structure.Value.simple.value.l_entry
                readonly 'l id': self.structure.Value.simple.value.l_id
            }
        }
        
        export type simple = {
            readonly 'constraints': self.structure.Value.simple.constraints
            readonly 'value': self.structure.Value.simple.value
        }
        
        export namespace optional {
            
            export type constraints = self.structure.Option_Constraints
            
            export type value = self.structure.Value
            
            export type result = self.structure.Optional_Result
        }
        
        export type optional = {
            readonly 'constraints': self.structure.Value.optional.constraints
            readonly 'value': self.structure.Value.optional.value
            readonly 'result': self.structure.Value.optional.result
        }
        
        export type reference = self.structure.Reference
        
        export namespace state {
            
            export namespace options {
                
                export namespace D {
                    
                    export namespace description {
                        
                        export type O = string
                    }
                    
                    export type description = p_.Optional_Value<self.structure.Value.state.options.D.description.O>
                    
                    export type constraints = self.structure.Option_Constraints
                    
                    export type value = self.structure.Value
                }
                
                export type D = {
                    readonly 'description': self.structure.Value.state.options.D.description
                    readonly 'constraints': self.structure.Value.state.options.D.constraints
                    readonly 'value': self.structure.Value.state.options.D.value
                }
            }
            
            export type options = p_.Dictionary<self.structure.Value.state.options.D>
            
            export type result = self.structure.Optional_Result
        }
        
        export type state = {
            readonly 'options': self.structure.Value.state.options
            readonly 'result': self.structure.Value.state.result
        }
    }
    
    export type Value =
        | readonly ['component', self.structure.Value.component]
        | readonly ['dictionary', self.structure.Value.dictionary]
        | readonly ['group', self.structure.Value.group]
        | readonly ['list', self.structure.Value.list]
        | readonly ['nothing', self.structure.Value.nothing]
        | readonly ['simple', self.structure.Value.simple]
        | readonly ['optional', self.structure.Value.optional]
        | readonly ['reference', self.structure.Value.reference]
        | readonly ['state', self.structure.Value.state]
    
    export namespace Dictionary {
        
        export namespace benchmark {
            
            export namespace O {
                
                export namespace selection {
                    
                    export namespace constraints {
                        
                        export type dictionary = self.structure.Value.dictionary
                    }
                    
                    export type constraints = {
                        readonly 'dictionary': self.structure.Dictionary.benchmark.O.selection.constraints.dictionary
                    }
                    
                    export type value = self.structure.Value_Reference
                }
                
                export type selection = {
                    readonly 'constraints': self.structure.Dictionary.benchmark.O.selection.constraints
                    readonly 'value': self.structure.Dictionary.benchmark.O.selection.value
                }
                
                export namespace coverage {
                    
                    export type dense = null
                    
                    export type sparse = null
                }
                
                export type coverage =
                    | readonly ['dense', self.structure.Dictionary.benchmark.O.coverage.dense]
                    | readonly ['sparse', self.structure.Dictionary.benchmark.O.coverage.sparse]
            }
            
            export type O = {
                readonly 'selection': self.structure.Dictionary.benchmark.O.selection
                readonly 'coverage': self.structure.Dictionary.benchmark.O.coverage
            }
        }
        
        export type benchmark = p_.Optional_Value<self.structure.Dictionary.benchmark.O>
        
        export type value = self.structure.Value
    }
    
    export type Dictionary = {
        readonly 'benchmark': self.structure.Dictionary.benchmark
        readonly 'value': self.structure.Dictionary.value
    }
    
    export namespace Value_Reference {
        
        export namespace type_ {
            
            export namespace location {
                
                export namespace value {
                    
                    export namespace local {
                        
                        export type l_entry = self.structure.Types.D
                        
                        export type l_id = string
                    }
                    
                    export type local = {
                        readonly 'l entry': self.structure.Value_Reference.type_.location.value.local.l_entry
                        readonly 'l id': self.structure.Value_Reference.type_.location.value.local.l_id
                    }
                    
                    export namespace child_namespace {
                        
                        export namespace namespace {
                            
                            export type l_entry = self.structure.Namespaces.D
                            
                            export type l_id = string
                        }
                        
                        export type namespace = {
                            readonly 'l entry': self.structure.Value_Reference.type_.location.value.child_namespace.namespace.l_entry
                            readonly 'l id': self.structure.Value_Reference.type_.location.value.child_namespace.namespace.l_id
                        }
                        
                        export namespace type_ {
                            
                            export type l_entry = self.structure.Types.D
                            
                            export type l_id = string
                        }
                        
                        export type type_ = {
                            readonly 'l entry': self.structure.Value_Reference.type_.location.value.child_namespace.type_.l_entry
                            readonly 'l id': self.structure.Value_Reference.type_.location.value.child_namespace.type_.l_id
                        }
                    }
                    
                    export type child_namespace = {
                        readonly 'namespace': self.structure.Value_Reference.type_.location.value.child_namespace.namespace
                        readonly 'type': self.structure.Value_Reference.type_.location.value.child_namespace.type_
                    }
                    
                    export namespace sibling_namespace {
                        
                        export namespace namespace {
                            
                            export type l_entry = self.structure.Namespaces.D
                            
                            export type l_id = string
                        }
                        
                        export type namespace = {
                            readonly 'l entry': self.structure.Value_Reference.type_.location.value.sibling_namespace.namespace.l_entry
                            readonly 'l id': self.structure.Value_Reference.type_.location.value.sibling_namespace.namespace.l_id
                        }
                        
                        export namespace type_ {
                            
                            export type l_entry = self.structure.Types.D
                            
                            export type l_id = string
                        }
                        
                        export type type_ = {
                            readonly 'l entry': self.structure.Value_Reference.type_.location.value.sibling_namespace.type_.l_entry
                            readonly 'l id': self.structure.Value_Reference.type_.location.value.sibling_namespace.type_.l_id
                        }
                    }
                    
                    export type sibling_namespace = {
                        readonly 'namespace': self.structure.Value_Reference.type_.location.value.sibling_namespace.namespace
                        readonly 'type': self.structure.Value_Reference.type_.location.value.sibling_namespace.type_
                    }
                }
                
                export type value =
                    | readonly ['local', self.structure.Value_Reference.type_.location.value.local]
                    | readonly ['child namespace', self.structure.Value_Reference.type_.location.value.child_namespace]
                    | readonly ['sibling namespace', self.structure.Value_Reference.type_.location.value.sibling_namespace]
                
                export type result = self.structure.Type
            }
            
            export type location = {
                readonly 'value': self.structure.Value_Reference.type_.location.value
                readonly 'result': self.structure.Value_Reference.type_.location.result
            }
        }
        
        export type type_ = {
            readonly 'location': self.structure.Value_Reference.type_.location
        }
        
        export namespace path {
            
            export namespace tail {
                
                export namespace value {
                    
                    export namespace L {
                        
                        export namespace value {
                            
                            export namespace value {
                                
                                export namespace dictionary {
                                    
                                    export namespace constraints {
                                        
                                        export type definition = self.structure.Value.dictionary
                                    }
                                    
                                    export type constraints = {
                                        readonly 'definition': self.structure.Value_Reference.path.tail.value.L.value.value.dictionary.constraints.definition
                                    }
                                    
                                    export type value = null
                                }
                                
                                export type dictionary = {
                                    readonly 'constraints': self.structure.Value_Reference.path.tail.value.L.value.value.dictionary.constraints
                                    readonly 'value': self.structure.Value_Reference.path.tail.value.L.value.value.dictionary.value
                                }
                                
                                export namespace group {
                                    
                                    export namespace constraints {
                                        
                                        export type definition = self.structure.Value.group
                                    }
                                    
                                    export type constraints = {
                                        readonly 'definition': self.structure.Value_Reference.path.tail.value.L.value.value.group.constraints.definition
                                    }
                                    
                                    export namespace value {
                                        
                                        export type l_entry = self.structure.Group.D
                                        
                                        export type l_id = string
                                    }
                                    
                                    export type value = {
                                        readonly 'l entry': self.structure.Value_Reference.path.tail.value.L.value.value.group.value.l_entry
                                        readonly 'l id': self.structure.Value_Reference.path.tail.value.L.value.value.group.value.l_id
                                    }
                                }
                                
                                export type group = {
                                    readonly 'constraints': self.structure.Value_Reference.path.tail.value.L.value.value.group.constraints
                                    readonly 'value': self.structure.Value_Reference.path.tail.value.L.value.value.group.value
                                }
                                
                                export namespace list {
                                    
                                    export namespace constraints {
                                        
                                        export type definition = self.structure.Value.list
                                    }
                                    
                                    export type constraints = {
                                        readonly 'definition': self.structure.Value_Reference.path.tail.value.L.value.value.list.constraints.definition
                                    }
                                    
                                    export type value = null
                                }
                                
                                export type list = {
                                    readonly 'constraints': self.structure.Value_Reference.path.tail.value.L.value.value.list.constraints
                                    readonly 'value': self.structure.Value_Reference.path.tail.value.L.value.value.list.value
                                }
                                
                                export namespace optional {
                                    
                                    export namespace constraints {
                                        
                                        export type definition = self.structure.Value.optional
                                    }
                                    
                                    export type constraints = {
                                        readonly 'definition': self.structure.Value_Reference.path.tail.value.L.value.value.optional.constraints.definition
                                    }
                                    
                                    export type value = null
                                }
                                
                                export type optional = {
                                    readonly 'constraints': self.structure.Value_Reference.path.tail.value.L.value.value.optional.constraints
                                    readonly 'value': self.structure.Value_Reference.path.tail.value.L.value.value.optional.value
                                }
                                
                                export namespace state {
                                    
                                    export namespace constraints {
                                        
                                        export type definition = self.structure.Value.state
                                    }
                                    
                                    export type constraints = {
                                        readonly 'definition': self.structure.Value_Reference.path.tail.value.L.value.value.state.constraints.definition
                                    }
                                    
                                    export namespace value {
                                        
                                        export type l_entry = self.structure.Value.state.options.D
                                        
                                        export type l_id = string
                                    }
                                    
                                    export type value = {
                                        readonly 'l entry': self.structure.Value_Reference.path.tail.value.L.value.value.state.value.l_entry
                                        readonly 'l id': self.structure.Value_Reference.path.tail.value.L.value.value.state.value.l_id
                                    }
                                }
                                
                                export type state = {
                                    readonly 'constraints': self.structure.Value_Reference.path.tail.value.L.value.value.state.constraints
                                    readonly 'value': self.structure.Value_Reference.path.tail.value.L.value.value.state.value
                                }
                            }
                            
                            export type value =
                                | readonly ['dictionary', self.structure.Value_Reference.path.tail.value.L.value.value.dictionary]
                                | readonly ['group', self.structure.Value_Reference.path.tail.value.L.value.value.group]
                                | readonly ['list', self.structure.Value_Reference.path.tail.value.L.value.value.list]
                                | readonly ['optional', self.structure.Value_Reference.path.tail.value.L.value.value.optional]
                                | readonly ['state', self.structure.Value_Reference.path.tail.value.L.value.value.state]
                            
                            export type result = self.structure.Value
                        }
                        
                        export type value = {
                            readonly 'value': self.structure.Value_Reference.path.tail.value.L.value.value
                            readonly 'result': self.structure.Value_Reference.path.tail.value.L.value.result
                        }
                        
                        export type result = self.structure.Value
                    }
                    
                    export type L = {
                        readonly 'value': self.structure.Value_Reference.path.tail.value.L.value
                        readonly 'result': self.structure.Value_Reference.path.tail.value.L.result
                    }
                }
                
                export type value = p_.List<self.structure.Value_Reference.path.tail.value.L>
                
                export type result = self.structure.Value
            }
            
            export type tail = {
                readonly 'value': self.structure.Value_Reference.path.tail.value
                readonly 'result': self.structure.Value_Reference.path.tail.result
            }
        }
        
        export type path = {
            readonly 'tail': self.structure.Value_Reference.path.tail
        }
    }
    
    export type Value_Reference = {
        readonly 'type': self.structure.Value_Reference.type_
        readonly 'path': self.structure.Value_Reference.path
    }
    
    export namespace Option_Constraints {
        
        export namespace O {
            
            export type D = self.structure.Value_Reference
        }
        
        export type O = p_.Dictionary<self.structure.Option_Constraints.O.D>
    }
    
    export type Option_Constraints = p_.Optional_Value<self.structure.Option_Constraints.O>
    
    export namespace Reference {
        
        export namespace referent {
            
            export namespace constraints {
                
                export type dictionary = self.structure.Value.dictionary
            }
            
            export type constraints = {
                readonly 'dictionary': self.structure.Reference.referent.constraints.dictionary
            }
            
            export type value = self.structure.Value_Reference
        }
        
        export type referent = {
            readonly 'constraints': self.structure.Reference.referent.constraints
            readonly 'value': self.structure.Reference.referent.value
        }
        
        export namespace type_ {
            
            export namespace dependency {
                
                export type acyclic = null
                
                export type cyclic = null
            }
            
            export type dependency =
                | readonly ['acyclic', self.structure.Reference.type_.dependency.acyclic]
                | readonly ['cyclic', self.structure.Reference.type_.dependency.cyclic]
            
            export type constraints = self.structure.Reference_Constraints
        }
        
        export type type_ = {
            readonly 'dependency': self.structure.Reference.type_.dependency
            readonly 'constraints': self.structure.Reference.type_.constraints
        }
    }
    
    export type Reference = {
        readonly 'referent': self.structure.Reference.referent
        readonly 'type': self.structure.Reference.type_
    }
    
    export namespace Reference_Constraints {
        
        export namespace O {
            
            export type D = self.structure.Value_Reference
        }
        
        export type O = p_.Dictionary<self.structure.Reference_Constraints.O.D>
    }
    
    export type Reference_Constraints = p_.Optional_Value<self.structure.Reference_Constraints.O>
    
    export namespace Regular_Expression {
        
        export type any_character = null
        
        export type literal = string
        
        export type character_set = string
        
        export namespace sequence {
            
            export type L = self.structure.Regular_Expression
        }
        
        export type sequence = p_.List<self.structure.Regular_Expression.sequence.L>
        
        export namespace choice {
            
            export type L = self.structure.Regular_Expression
        }
        
        export type choice = p_.List<self.structure.Regular_Expression.choice.L>
        
        export namespace repetition {
            
            export type expression = self.structure.Regular_Expression
            
            export namespace quantity {
                
                export type optional = null
                
                export type zero_or_more = null
                
                export type one_or_more = null
            }
            
            export type quantity =
                | readonly ['optional', self.structure.Regular_Expression.repetition.quantity.optional]
                | readonly ['zero or more', self.structure.Regular_Expression.repetition.quantity.zero_or_more]
                | readonly ['one or more', self.structure.Regular_Expression.repetition.quantity.one_or_more]
        }
        
        export type repetition = {
            readonly 'expression': self.structure.Regular_Expression.repetition.expression
            readonly 'quantity': self.structure.Regular_Expression.repetition.quantity
        }
    }
    
    export type Regular_Expression =
        | readonly ['any character', self.structure.Regular_Expression.any_character]
        | readonly ['literal', self.structure.Regular_Expression.literal]
        | readonly ['character set', self.structure.Regular_Expression.character_set]
        | readonly ['sequence', self.structure.Regular_Expression.sequence]
        | readonly ['choice', self.structure.Regular_Expression.choice]
        | readonly ['repetition', self.structure.Regular_Expression.repetition]
    
    export namespace Structure {
        
        export type namespaces = self.structure.Namespaces
        
        export type basic_types = self.structure.Basic_Types
        
        export type types = self.structure.Types
    }
    
    export type Structure = {
        readonly 'namespaces': self.structure.Structure.namespaces
        readonly 'basic types': self.structure.Structure.basic_types
        readonly 'types': self.structure.Structure.types
    }
    
    export namespace Optional_Result {
        
        export type O = self.structure.Value_Reference
    }
    
    export type Optional_Result = p_.Optional_Value<self.structure.Optional_Result.O>
}

export namespace declarations {
    
    export namespace Presence {
        
        export type optional = null
        
        export type required = null
    }
    
    export type Presence =
        | readonly ['optional', self.declarations.Presence.optional]
        | readonly ['required', self.declarations.Presence.required]
    
    export namespace Signature_Value_Reference {
        
        export namespace type_ {
            
            export namespace location {
                
                export namespace value {
                    
                    export namespace local {
                        
                        export type l_entry = self.structure.Types.D
                        
                        export type l_id = string
                    }
                    
                    export type local = {
                        readonly 'l entry': self.declarations.Signature_Value_Reference.type_.location.value.local.l_entry
                        readonly 'l id': self.declarations.Signature_Value_Reference.type_.location.value.local.l_id
                    }
                    
                    export namespace child_namespace {
                        
                        export namespace namespace {
                            
                            export type l_entry = self.structure.Namespaces.D
                            
                            export type l_id = string
                        }
                        
                        export type namespace = {
                            readonly 'l entry': self.declarations.Signature_Value_Reference.type_.location.value.child_namespace.namespace.l_entry
                            readonly 'l id': self.declarations.Signature_Value_Reference.type_.location.value.child_namespace.namespace.l_id
                        }
                        
                        export namespace type_ {
                            
                            export type l_entry = self.structure.Types.D
                            
                            export type l_id = string
                        }
                        
                        export type type_ = {
                            readonly 'l entry': self.declarations.Signature_Value_Reference.type_.location.value.child_namespace.type_.l_entry
                            readonly 'l id': self.declarations.Signature_Value_Reference.type_.location.value.child_namespace.type_.l_id
                        }
                    }
                    
                    export type child_namespace = {
                        readonly 'namespace': self.declarations.Signature_Value_Reference.type_.location.value.child_namespace.namespace
                        readonly 'type': self.declarations.Signature_Value_Reference.type_.location.value.child_namespace.type_
                    }
                    
                    export namespace sibling_namespace {
                        
                        export namespace namespace {
                            
                            export type l_entry = self.structure.Namespaces.D
                            
                            export type l_id = string
                        }
                        
                        export type namespace = {
                            readonly 'l entry': self.declarations.Signature_Value_Reference.type_.location.value.sibling_namespace.namespace.l_entry
                            readonly 'l id': self.declarations.Signature_Value_Reference.type_.location.value.sibling_namespace.namespace.l_id
                        }
                        
                        export namespace type_ {
                            
                            export type l_entry = self.structure.Types.D
                            
                            export type l_id = string
                        }
                        
                        export type type_ = {
                            readonly 'l entry': self.declarations.Signature_Value_Reference.type_.location.value.sibling_namespace.type_.l_entry
                            readonly 'l id': self.declarations.Signature_Value_Reference.type_.location.value.sibling_namespace.type_.l_id
                        }
                    }
                    
                    export type sibling_namespace = {
                        readonly 'namespace': self.declarations.Signature_Value_Reference.type_.location.value.sibling_namespace.namespace
                        readonly 'type': self.declarations.Signature_Value_Reference.type_.location.value.sibling_namespace.type_
                    }
                }
                
                export type value =
                    | readonly ['local', self.declarations.Signature_Value_Reference.type_.location.value.local]
                    | readonly ['child namespace', self.declarations.Signature_Value_Reference.type_.location.value.child_namespace]
                    | readonly ['sibling namespace', self.declarations.Signature_Value_Reference.type_.location.value.sibling_namespace]
                
                export type result = self.structure.Type
            }
            
            export type location = {
                readonly 'value': self.declarations.Signature_Value_Reference.type_.location.value
                readonly 'result': self.declarations.Signature_Value_Reference.type_.location.result
            }
        }
        
        export type type_ = {
            readonly 'location': self.declarations.Signature_Value_Reference.type_.location
        }
        
        export namespace subselection {
            
            export namespace tail {
                
                export namespace value {
                    
                    export namespace L {
                        
                        export namespace value {
                            
                            export namespace value {
                                
                                export namespace dictionary {
                                    
                                    export namespace constraints {
                                        
                                        export type definition = self.structure.Value.dictionary
                                    }
                                    
                                    export type constraints = {
                                        readonly 'definition': self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.dictionary.constraints.definition
                                    }
                                    
                                    export type value = null
                                }
                                
                                export type dictionary = {
                                    readonly 'constraints': self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.dictionary.constraints
                                    readonly 'value': self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.dictionary.value
                                }
                                
                                export namespace group {
                                    
                                    export namespace constraints {
                                        
                                        export type definition = self.structure.Value.group
                                    }
                                    
                                    export type constraints = {
                                        readonly 'definition': self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.group.constraints.definition
                                    }
                                    
                                    export namespace value {
                                        
                                        export type l_entry = self.structure.Group.D
                                        
                                        export type l_id = string
                                    }
                                    
                                    export type value = {
                                        readonly 'l entry': self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.group.value.l_entry
                                        readonly 'l id': self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.group.value.l_id
                                    }
                                }
                                
                                export type group = {
                                    readonly 'constraints': self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.group.constraints
                                    readonly 'value': self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.group.value
                                }
                                
                                export namespace list {
                                    
                                    export namespace constraints {
                                        
                                        export type definition = self.structure.Value.list
                                    }
                                    
                                    export type constraints = {
                                        readonly 'definition': self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.list.constraints.definition
                                    }
                                    
                                    export type value = null
                                }
                                
                                export type list = {
                                    readonly 'constraints': self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.list.constraints
                                    readonly 'value': self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.list.value
                                }
                                
                                export namespace optional {
                                    
                                    export namespace constraints {
                                        
                                        export type definition = self.structure.Value.optional
                                    }
                                    
                                    export type constraints = {
                                        readonly 'definition': self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.optional.constraints.definition
                                    }
                                    
                                    export type value = null
                                }
                                
                                export type optional = {
                                    readonly 'constraints': self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.optional.constraints
                                    readonly 'value': self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.optional.value
                                }
                                
                                export namespace state {
                                    
                                    export namespace constraints {
                                        
                                        export type definition = self.structure.Value.state
                                    }
                                    
                                    export type constraints = {
                                        readonly 'definition': self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.state.constraints.definition
                                    }
                                    
                                    export namespace value {
                                        
                                        export type l_entry = self.structure.Value.state.options.D
                                        
                                        export type l_id = string
                                    }
                                    
                                    export type value = {
                                        readonly 'l entry': self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.state.value.l_entry
                                        readonly 'l id': self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.state.value.l_id
                                    }
                                }
                                
                                export type state = {
                                    readonly 'constraints': self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.state.constraints
                                    readonly 'value': self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.state.value
                                }
                            }
                            
                            export type value =
                                | readonly ['dictionary', self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.dictionary]
                                | readonly ['group', self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.group]
                                | readonly ['list', self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.list]
                                | readonly ['optional', self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.optional]
                                | readonly ['state', self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.state]
                            
                            export type result = self.structure.Value
                        }
                        
                        export type value = {
                            readonly 'value': self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value
                            readonly 'result': self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.result
                        }
                        
                        export type result = self.structure.Value
                    }
                    
                    export type L = {
                        readonly 'value': self.declarations.Signature_Value_Reference.subselection.tail.value.L.value
                        readonly 'result': self.declarations.Signature_Value_Reference.subselection.tail.value.L.result
                    }
                }
                
                export type value = p_.List<self.declarations.Signature_Value_Reference.subselection.tail.value.L>
                
                export type result = self.structure.Value
            }
            
            export type tail = {
                readonly 'value': self.declarations.Signature_Value_Reference.subselection.tail.value
                readonly 'result': self.declarations.Signature_Value_Reference.subselection.tail.result
            }
        }
        
        export type subselection = {
            readonly 'tail': self.declarations.Signature_Value_Reference.subselection.tail
        }
    }
    
    export type Signature_Value_Reference = {
        readonly 'type': self.declarations.Signature_Value_Reference.type_
        readonly 'subselection': self.declarations.Signature_Value_Reference.subselection
    }
    
    export namespace Signature {
        
        export namespace values {
            
            export namespace D {
                
                export type value = self.declarations.Signature_Value_Reference
                
                export type presence = self.declarations.Presence
            }
            
            export type D = {
                readonly 'value': self.declarations.Signature.values.D.value
                readonly 'presence': self.declarations.Signature.values.D.presence
            }
        }
        
        export type values = p_.Dictionary<self.declarations.Signature.values.D>
        
        export namespace lookups {
            
            export namespace D {
                
                export namespace referent {
                    
                    export namespace constraints {
                        
                        export type dictionary = self.structure.Value.dictionary
                    }
                    
                    export type constraints = {
                        readonly 'dictionary': self.declarations.Signature.lookups.D.referent.constraints.dictionary
                    }
                    
                    export type value = self.declarations.Signature_Value_Reference
                }
                
                export type referent = {
                    readonly 'constraints': self.declarations.Signature.lookups.D.referent.constraints
                    readonly 'value': self.declarations.Signature.lookups.D.referent.value
                }
                
                export namespace type_ {
                    
                    export type cyclic = null
                    
                    export type acyclic = null
                }
                
                export type type_ =
                    | readonly ['cyclic', self.declarations.Signature.lookups.D.type_.cyclic]
                    | readonly ['acyclic', self.declarations.Signature.lookups.D.type_.acyclic]
                
                export type presence = self.declarations.Presence
            }
            
            export type D = {
                readonly 'referent': self.declarations.Signature.lookups.D.referent
                readonly 'type': self.declarations.Signature.lookups.D.type_
                readonly 'presence': self.declarations.Signature.lookups.D.presence
            }
        }
        
        export type lookups = p_.Dictionary<self.declarations.Signature.lookups.D>
    }
    
    export type Signature = {
        readonly 'values': self.declarations.Signature.values
        readonly 'lookups': self.declarations.Signature.lookups
    }
    
    export namespace Declarations {
        
        export namespace D {
            
            export type benchmark = self.structure.Types.D
            
            export type value = self.declarations.Declaration
        }
        
        export type D = {
            readonly 'benchmark': self.declarations.Declarations.D.benchmark
            readonly 'value': self.declarations.Declarations.D.value
        }
    }
    
    export type Declarations = p_.Dictionary<self.declarations.Declarations.D>
    
    export namespace Declaration {
        
        export namespace signature {
            
            export namespace value {
                
                export type local = self.declarations.Signature
                
                export namespace same_as {
                    
                    export type l_entry = self.declarations.Declarations.D
                    
                    export type l_id = string
                }
                
                export type same_as = {
                    readonly 'l entry': self.declarations.Declaration.signature.value.same_as.l_entry
                    readonly 'l id': self.declarations.Declaration.signature.value.same_as.l_id
                }
            }
            
            export type value =
                | readonly ['local', self.declarations.Declaration.signature.value.local]
                | readonly ['same as', self.declarations.Declaration.signature.value.same_as]
            
            export type result = self.declarations.Signature
        }
        
        export type signature = {
            readonly 'value': self.declarations.Declaration.signature.value
            readonly 'result': self.declarations.Declaration.signature.result
        }
    }
    
    export type Declaration = {
        readonly 'signature': self.declarations.Declaration.signature
    }
    
    export namespace Namespaces {
        
        export namespace D {
            
            export type benchmark = self.structure.Namespaces.D
            
            export type value = self.declarations.Namespace
        }
        
        export type D = {
            readonly 'benchmark': self.declarations.Namespaces.D.benchmark
            readonly 'value': self.declarations.Namespaces.D.value
        }
    }
    
    export type Namespaces = p_.Dictionary<self.declarations.Namespaces.D>
    
    export namespace Namespace {
        
        export type namespaces = self.declarations.Namespaces
        
        export type types = self.declarations.Declarations
    }
    
    export type Namespace = {
        readonly 'namespaces': self.declarations.Namespace.namespaces
        readonly 'types': self.declarations.Namespace.types
    }
}

export namespace resolver {
    
    export namespace Value_Reference {
        
        export namespace type_ {
            
            export namespace location {
                
                export namespace value {
                    
                    export namespace local {
                        
                        export type l_entry = self.structure.Types.D
                        
                        export type l_id = string
                    }
                    
                    export type local = {
                        readonly 'l entry': self.resolver.Value_Reference.type_.location.value.local.l_entry
                        readonly 'l id': self.resolver.Value_Reference.type_.location.value.local.l_id
                    }
                    
                    export namespace child_namespace {
                        
                        export namespace namespace {
                            
                            export type l_entry = self.structure.Namespaces.D
                            
                            export type l_id = string
                        }
                        
                        export type namespace = {
                            readonly 'l entry': self.resolver.Value_Reference.type_.location.value.child_namespace.namespace.l_entry
                            readonly 'l id': self.resolver.Value_Reference.type_.location.value.child_namespace.namespace.l_id
                        }
                        
                        export namespace type_ {
                            
                            export type l_entry = self.structure.Types.D
                            
                            export type l_id = string
                        }
                        
                        export type type_ = {
                            readonly 'l entry': self.resolver.Value_Reference.type_.location.value.child_namespace.type_.l_entry
                            readonly 'l id': self.resolver.Value_Reference.type_.location.value.child_namespace.type_.l_id
                        }
                    }
                    
                    export type child_namespace = {
                        readonly 'namespace': self.resolver.Value_Reference.type_.location.value.child_namespace.namespace
                        readonly 'type': self.resolver.Value_Reference.type_.location.value.child_namespace.type_
                    }
                    
                    export namespace sibling_namespace {
                        
                        export namespace namespace {
                            
                            export type l_entry = self.structure.Namespaces.D
                            
                            export type l_id = string
                        }
                        
                        export type namespace = {
                            readonly 'l entry': self.resolver.Value_Reference.type_.location.value.sibling_namespace.namespace.l_entry
                            readonly 'l id': self.resolver.Value_Reference.type_.location.value.sibling_namespace.namespace.l_id
                        }
                        
                        export namespace type_ {
                            
                            export type l_entry = self.structure.Types.D
                            
                            export type l_id = string
                        }
                        
                        export type type_ = {
                            readonly 'l entry': self.resolver.Value_Reference.type_.location.value.sibling_namespace.type_.l_entry
                            readonly 'l id': self.resolver.Value_Reference.type_.location.value.sibling_namespace.type_.l_id
                        }
                    }
                    
                    export type sibling_namespace = {
                        readonly 'namespace': self.resolver.Value_Reference.type_.location.value.sibling_namespace.namespace
                        readonly 'type': self.resolver.Value_Reference.type_.location.value.sibling_namespace.type_
                    }
                }
                
                export type value =
                    | readonly ['local', self.resolver.Value_Reference.type_.location.value.local]
                    | readonly ['child namespace', self.resolver.Value_Reference.type_.location.value.child_namespace]
                    | readonly ['sibling namespace', self.resolver.Value_Reference.type_.location.value.sibling_namespace]
                
                export type result = self.structure.Type
            }
            
            export type location = {
                readonly 'value': self.resolver.Value_Reference.type_.location.value
                readonly 'result': self.resolver.Value_Reference.type_.location.result
            }
        }
        
        export type type_ = {
            readonly 'location': self.resolver.Value_Reference.type_.location
        }
        
        export namespace path {
            
            export namespace tail {
                
                export namespace value {
                    
                    export namespace L {
                        
                        export namespace value {
                            
                            export namespace value {
                                
                                export namespace dictionary {
                                    
                                    export namespace constraints {
                                        
                                        export type definition = self.structure.Value.dictionary
                                    }
                                    
                                    export type constraints = {
                                        readonly 'definition': self.resolver.Value_Reference.path.tail.value.L.value.value.dictionary.constraints.definition
                                    }
                                    
                                    export type value = null
                                }
                                
                                export type dictionary = {
                                    readonly 'constraints': self.resolver.Value_Reference.path.tail.value.L.value.value.dictionary.constraints
                                    readonly 'value': self.resolver.Value_Reference.path.tail.value.L.value.value.dictionary.value
                                }
                                
                                export namespace group {
                                    
                                    export namespace constraints {
                                        
                                        export type definition = self.structure.Value.group
                                    }
                                    
                                    export type constraints = {
                                        readonly 'definition': self.resolver.Value_Reference.path.tail.value.L.value.value.group.constraints.definition
                                    }
                                    
                                    export namespace value {
                                        
                                        export type l_entry = self.structure.Group.D
                                        
                                        export type l_id = string
                                    }
                                    
                                    export type value = {
                                        readonly 'l entry': self.resolver.Value_Reference.path.tail.value.L.value.value.group.value.l_entry
                                        readonly 'l id': self.resolver.Value_Reference.path.tail.value.L.value.value.group.value.l_id
                                    }
                                }
                                
                                export type group = {
                                    readonly 'constraints': self.resolver.Value_Reference.path.tail.value.L.value.value.group.constraints
                                    readonly 'value': self.resolver.Value_Reference.path.tail.value.L.value.value.group.value
                                }
                                
                                export namespace list {
                                    
                                    export namespace constraints {
                                        
                                        export type definition = self.structure.Value.list
                                    }
                                    
                                    export type constraints = {
                                        readonly 'definition': self.resolver.Value_Reference.path.tail.value.L.value.value.list.constraints.definition
                                    }
                                    
                                    export type value = null
                                }
                                
                                export type list = {
                                    readonly 'constraints': self.resolver.Value_Reference.path.tail.value.L.value.value.list.constraints
                                    readonly 'value': self.resolver.Value_Reference.path.tail.value.L.value.value.list.value
                                }
                                
                                export namespace optional {
                                    
                                    export namespace constraints {
                                        
                                        export type definition = self.structure.Value.optional
                                    }
                                    
                                    export type constraints = {
                                        readonly 'definition': self.resolver.Value_Reference.path.tail.value.L.value.value.optional.constraints.definition
                                    }
                                    
                                    export type value = null
                                }
                                
                                export type optional = {
                                    readonly 'constraints': self.resolver.Value_Reference.path.tail.value.L.value.value.optional.constraints
                                    readonly 'value': self.resolver.Value_Reference.path.tail.value.L.value.value.optional.value
                                }
                                
                                export namespace state {
                                    
                                    export namespace constraints {
                                        
                                        export type definition = self.structure.Value.state
                                    }
                                    
                                    export type constraints = {
                                        readonly 'definition': self.resolver.Value_Reference.path.tail.value.L.value.value.state.constraints.definition
                                    }
                                    
                                    export namespace value {
                                        
                                        export type l_entry = self.structure.Value.state.options.D
                                        
                                        export type l_id = string
                                    }
                                    
                                    export type value = {
                                        readonly 'l entry': self.resolver.Value_Reference.path.tail.value.L.value.value.state.value.l_entry
                                        readonly 'l id': self.resolver.Value_Reference.path.tail.value.L.value.value.state.value.l_id
                                    }
                                }
                                
                                export type state = {
                                    readonly 'constraints': self.resolver.Value_Reference.path.tail.value.L.value.value.state.constraints
                                    readonly 'value': self.resolver.Value_Reference.path.tail.value.L.value.value.state.value
                                }
                            }
                            
                            export type value =
                                | readonly ['dictionary', self.resolver.Value_Reference.path.tail.value.L.value.value.dictionary]
                                | readonly ['group', self.resolver.Value_Reference.path.tail.value.L.value.value.group]
                                | readonly ['list', self.resolver.Value_Reference.path.tail.value.L.value.value.list]
                                | readonly ['optional', self.resolver.Value_Reference.path.tail.value.L.value.value.optional]
                                | readonly ['state', self.resolver.Value_Reference.path.tail.value.L.value.value.state]
                            
                            export type result = self.structure.Value
                        }
                        
                        export type value = {
                            readonly 'value': self.resolver.Value_Reference.path.tail.value.L.value.value
                            readonly 'result': self.resolver.Value_Reference.path.tail.value.L.value.result
                        }
                        
                        export type result = self.structure.Value
                    }
                    
                    export type L = {
                        readonly 'value': self.resolver.Value_Reference.path.tail.value.L.value
                        readonly 'result': self.resolver.Value_Reference.path.tail.value.L.result
                    }
                }
                
                export type value = p_.List<self.resolver.Value_Reference.path.tail.value.L>
                
                export type result = self.structure.Value
            }
            
            export type tail = {
                readonly 'value': self.resolver.Value_Reference.path.tail.value
                readonly 'result': self.resolver.Value_Reference.path.tail.result
            }
        }
        
        export type path = {
            readonly 'tail': self.resolver.Value_Reference.path.tail
        }
    }
    
    export type Value_Reference = {
        readonly 'type': self.resolver.Value_Reference.type_
        readonly 'path': self.resolver.Value_Reference.path
    }
    
    export namespace Relative_Value_Selection {
        
        export namespace path {
            
            export namespace value {
                
                export namespace L {
                    
                    export namespace value {
                        
                        export namespace value {
                            
                            export type benchmark_link = self.resolver.Value_Reference
                            
                            export namespace component_constraint {
                                
                                export namespace constraints {
                                    
                                    export type definition = self.structure.Value.component
                                    
                                    export type constraints = self.structure.Reference_Constraints.O
                                }
                                
                                export type constraints = {
                                    readonly 'definition': self.resolver.Relative_Value_Selection.path.value.L.value.value.component_constraint.constraints.definition
                                    readonly 'constraints': self.resolver.Relative_Value_Selection.path.value.L.value.value.component_constraint.constraints.constraints
                                }
                                
                                export namespace value {
                                    
                                    export namespace name {
                                        
                                        export type l_entry = self.structure.Reference_Constraints.O.D
                                        
                                        export type l_id = string
                                    }
                                    
                                    export type name = {
                                        readonly 'l entry': self.resolver.Relative_Value_Selection.path.value.L.value.value.component_constraint.value.name.l_entry
                                        readonly 'l id': self.resolver.Relative_Value_Selection.path.value.L.value.value.component_constraint.value.name.l_id
                                    }
                                    
                                    export type target = self.resolver.Value_Reference
                                }
                                
                                export type value = {
                                    readonly 'name': self.resolver.Relative_Value_Selection.path.value.L.value.value.component_constraint.value.name
                                    readonly 'target': self.resolver.Relative_Value_Selection.path.value.L.value.value.component_constraint.value.target
                                }
                            }
                            
                            export type component_constraint = {
                                readonly 'constraints': self.resolver.Relative_Value_Selection.path.value.L.value.value.component_constraint.constraints
                                readonly 'value': self.resolver.Relative_Value_Selection.path.value.L.value.value.component_constraint.value
                            }
                            
                            export namespace component {
                                
                                export namespace constraints {
                                    
                                    export type component = self.structure.Value.component
                                    
                                    export type definition = self.structure.Value.component.type_.simple
                                }
                                
                                export type constraints = {
                                    readonly 'component': self.resolver.Relative_Value_Selection.path.value.L.value.value.component.constraints.component
                                    readonly 'definition': self.resolver.Relative_Value_Selection.path.value.L.value.value.component.constraints.definition
                                }
                                
                                export type value = null
                            }
                            
                            export type component = {
                                readonly 'constraints': self.resolver.Relative_Value_Selection.path.value.L.value.value.component.constraints
                                readonly 'value': self.resolver.Relative_Value_Selection.path.value.L.value.value.component.value
                            }
                            
                            export namespace cyclic_component {
                                
                                export namespace constraints {
                                    
                                    export type component = self.structure.Value.component
                                    
                                    export type definition = self.structure.Value.component.type_.cyclic
                                }
                                
                                export type constraints = {
                                    readonly 'component': self.resolver.Relative_Value_Selection.path.value.L.value.value.cyclic_component.constraints.component
                                    readonly 'definition': self.resolver.Relative_Value_Selection.path.value.L.value.value.cyclic_component.constraints.definition
                                }
                                
                                export type value = null
                            }
                            
                            export type cyclic_component = {
                                readonly 'constraints': self.resolver.Relative_Value_Selection.path.value.L.value.value.cyclic_component.constraints
                                readonly 'value': self.resolver.Relative_Value_Selection.path.value.L.value.value.cyclic_component.value
                            }
                            
                            export namespace group {
                                
                                export namespace constraints {
                                    
                                    export type definition = self.structure.Value.group
                                }
                                
                                export type constraints = {
                                    readonly 'definition': self.resolver.Relative_Value_Selection.path.value.L.value.value.group.constraints.definition
                                }
                                
                                export namespace value {
                                    
                                    export type l_entry = self.structure.Group.D
                                    
                                    export type l_id = string
                                }
                                
                                export type value = {
                                    readonly 'l entry': self.resolver.Relative_Value_Selection.path.value.L.value.value.group.value.l_entry
                                    readonly 'l id': self.resolver.Relative_Value_Selection.path.value.L.value.value.group.value.l_id
                                }
                            }
                            
                            export type group = {
                                readonly 'constraints': self.resolver.Relative_Value_Selection.path.value.L.value.value.group.constraints
                                readonly 'value': self.resolver.Relative_Value_Selection.path.value.L.value.value.group.value
                            }
                            
                            export namespace list_result {
                                
                                export namespace constraints {
                                    
                                    export type definition = self.structure.Value.list
                                }
                                
                                export type constraints = {
                                    readonly 'definition': self.resolver.Relative_Value_Selection.path.value.L.value.value.list_result.constraints.definition
                                }
                                
                                export type value = null
                            }
                            
                            export type list_result = {
                                readonly 'constraints': self.resolver.Relative_Value_Selection.path.value.L.value.value.list_result.constraints
                                readonly 'value': self.resolver.Relative_Value_Selection.path.value.L.value.value.list_result.value
                            }
                            
                            export namespace option_constraint {
                                
                                export namespace constraints {
                                    
                                    export type definition = self.structure.Value.state
                                }
                                
                                export type constraints = {
                                    readonly 'definition': self.resolver.Relative_Value_Selection.path.value.L.value.value.option_constraint.constraints.definition
                                }
                                
                                export namespace value {
                                    
                                    export namespace option {
                                        
                                        export type l_entry = self.structure.Value.state.options.D
                                        
                                        export type l_id = string
                                    }
                                    
                                    export type option = {
                                        readonly 'l entry': self.resolver.Relative_Value_Selection.path.value.L.value.value.option_constraint.value.option.l_entry
                                        readonly 'l id': self.resolver.Relative_Value_Selection.path.value.L.value.value.option_constraint.value.option.l_id
                                    }
                                    
                                    export namespace constraint {
                                        
                                        export type l_entry = self.structure.Option_Constraints.O.D
                                        
                                        export type l_id = string
                                    }
                                    
                                    export type constraint = {
                                        readonly 'l entry': self.resolver.Relative_Value_Selection.path.value.L.value.value.option_constraint.value.constraint.l_entry
                                        readonly 'l id': self.resolver.Relative_Value_Selection.path.value.L.value.value.option_constraint.value.constraint.l_id
                                    }
                                }
                                
                                export type value = {
                                    readonly 'option': self.resolver.Relative_Value_Selection.path.value.L.value.value.option_constraint.value.option
                                    readonly 'constraint': self.resolver.Relative_Value_Selection.path.value.L.value.value.option_constraint.value.constraint
                                }
                            }
                            
                            export type option_constraint = {
                                readonly 'constraints': self.resolver.Relative_Value_Selection.path.value.L.value.value.option_constraint.constraints
                                readonly 'value': self.resolver.Relative_Value_Selection.path.value.L.value.value.option_constraint.value
                            }
                            
                            export namespace optional {
                                
                                export namespace constraints {
                                    
                                    export type definition = self.structure.Value.optional
                                }
                                
                                export type constraints = {
                                    readonly 'definition': self.resolver.Relative_Value_Selection.path.value.L.value.value.optional.constraints.definition
                                }
                                
                                export type value = null
                            }
                            
                            export type optional = {
                                readonly 'constraints': self.resolver.Relative_Value_Selection.path.value.L.value.value.optional.constraints
                                readonly 'value': self.resolver.Relative_Value_Selection.path.value.L.value.value.optional.value
                            }
                            
                            export namespace optional_value_constraint {
                                
                                export namespace constraints {
                                    
                                    export type definition = self.structure.Value.optional
                                }
                                
                                export type constraints = {
                                    readonly 'definition': self.resolver.Relative_Value_Selection.path.value.L.value.value.optional_value_constraint.constraints.definition
                                }
                                
                                export namespace value {
                                    
                                    export type l_entry = self.structure.Option_Constraints.O.D
                                    
                                    export type l_id = string
                                }
                                
                                export type value = {
                                    readonly 'l entry': self.resolver.Relative_Value_Selection.path.value.L.value.value.optional_value_constraint.value.l_entry
                                    readonly 'l id': self.resolver.Relative_Value_Selection.path.value.L.value.value.optional_value_constraint.value.l_id
                                }
                            }
                            
                            export type optional_value_constraint = {
                                readonly 'constraints': self.resolver.Relative_Value_Selection.path.value.L.value.value.optional_value_constraint.constraints
                                readonly 'value': self.resolver.Relative_Value_Selection.path.value.L.value.value.optional_value_constraint.value
                            }
                            
                            export namespace reference_constraint {
                                
                                export namespace constraints {
                                    
                                    export type definition = self.structure.Value.reference
                                }
                                
                                export type constraints = {
                                    readonly 'definition': self.resolver.Relative_Value_Selection.path.value.L.value.value.reference_constraint.constraints.definition
                                }
                                
                                export namespace value {
                                    
                                    export type l_entry = self.structure.Reference_Constraints.O.D
                                    
                                    export type l_id = string
                                }
                                
                                export type value = {
                                    readonly 'l entry': self.resolver.Relative_Value_Selection.path.value.L.value.value.reference_constraint.value.l_entry
                                    readonly 'l id': self.resolver.Relative_Value_Selection.path.value.L.value.value.reference_constraint.value.l_id
                                }
                            }
                            
                            export type reference_constraint = {
                                readonly 'constraints': self.resolver.Relative_Value_Selection.path.value.L.value.value.reference_constraint.constraints
                                readonly 'value': self.resolver.Relative_Value_Selection.path.value.L.value.value.reference_constraint.value
                            }
                            
                            export namespace reference {
                                
                                export namespace constraints {
                                    
                                    export type definition = self.structure.Value.reference
                                    
                                    export type acyclic = self.structure.Reference.type_.dependency.acyclic
                                }
                                
                                export type constraints = {
                                    readonly 'definition': self.resolver.Relative_Value_Selection.path.value.L.value.value.reference.constraints.definition
                                    readonly 'acyclic': self.resolver.Relative_Value_Selection.path.value.L.value.value.reference.constraints.acyclic
                                }
                                
                                export namespace value {}
                                
                                export type value = null
                            }
                            
                            export type reference = {
                                readonly 'constraints': self.resolver.Relative_Value_Selection.path.value.L.value.value.reference.constraints
                                readonly 'value': self.resolver.Relative_Value_Selection.path.value.L.value.value.reference.value
                            }
                            
                            export namespace expect_resolved {
                                
                                export namespace constraints {
                                    
                                    export type definition = self.structure.Value.reference
                                    
                                    export type cyclic = self.structure.Reference.type_.dependency.cyclic
                                }
                                
                                export type constraints = {
                                    readonly 'definition': self.resolver.Relative_Value_Selection.path.value.L.value.value.expect_resolved.constraints.definition
                                    readonly 'cyclic': self.resolver.Relative_Value_Selection.path.value.L.value.value.expect_resolved.constraints.cyclic
                                }
                                
                                export namespace value {}
                                
                                export type value = null
                            }
                            
                            export type expect_resolved = {
                                readonly 'constraints': self.resolver.Relative_Value_Selection.path.value.L.value.value.expect_resolved.constraints
                                readonly 'value': self.resolver.Relative_Value_Selection.path.value.L.value.value.expect_resolved.value
                            }
                            
                            export namespace state_result {
                                
                                export namespace constraints {
                                    
                                    export type definition = self.structure.Value.state
                                }
                                
                                export type constraints = {
                                    readonly 'definition': self.resolver.Relative_Value_Selection.path.value.L.value.value.state_result.constraints.definition
                                }
                                
                                export type value = null
                            }
                            
                            export type state_result = {
                                readonly 'constraints': self.resolver.Relative_Value_Selection.path.value.L.value.value.state_result.constraints
                                readonly 'value': self.resolver.Relative_Value_Selection.path.value.L.value.value.state_result.value
                            }
                        }
                        
                        export type value =
                            | readonly ['benchmark link', self.resolver.Relative_Value_Selection.path.value.L.value.value.benchmark_link]
                            | readonly ['component constraint', self.resolver.Relative_Value_Selection.path.value.L.value.value.component_constraint]
                            | readonly ['component', self.resolver.Relative_Value_Selection.path.value.L.value.value.component]
                            | readonly ['cyclic component', self.resolver.Relative_Value_Selection.path.value.L.value.value.cyclic_component]
                            | readonly ['group', self.resolver.Relative_Value_Selection.path.value.L.value.value.group]
                            | readonly ['list result', self.resolver.Relative_Value_Selection.path.value.L.value.value.list_result]
                            | readonly ['option constraint', self.resolver.Relative_Value_Selection.path.value.L.value.value.option_constraint]
                            | readonly ['optional', self.resolver.Relative_Value_Selection.path.value.L.value.value.optional]
                            | readonly ['optional value constraint', self.resolver.Relative_Value_Selection.path.value.L.value.value.optional_value_constraint]
                            | readonly ['reference constraint', self.resolver.Relative_Value_Selection.path.value.L.value.value.reference_constraint]
                            | readonly ['reference', self.resolver.Relative_Value_Selection.path.value.L.value.value.reference]
                            | readonly ['expect resolved', self.resolver.Relative_Value_Selection.path.value.L.value.value.expect_resolved]
                            | readonly ['state result', self.resolver.Relative_Value_Selection.path.value.L.value.value.state_result]
                        
                        export type result = self.structure.Value
                    }
                    
                    export type value = {
                        readonly 'value': self.resolver.Relative_Value_Selection.path.value.L.value.value
                        readonly 'result': self.resolver.Relative_Value_Selection.path.value.L.value.result
                    }
                    
                    export type result = self.structure.Value
                }
                
                export type L = {
                    readonly 'value': self.resolver.Relative_Value_Selection.path.value.L.value
                    readonly 'result': self.resolver.Relative_Value_Selection.path.value.L.result
                }
            }
            
            export type value = p_.List<self.resolver.Relative_Value_Selection.path.value.L>
            
            export type result = self.structure.Value
        }
        
        export type path = {
            readonly 'value': self.resolver.Relative_Value_Selection.path.value
            readonly 'result': self.resolver.Relative_Value_Selection.path.result
        }
    }
    
    export type Relative_Value_Selection = {
        readonly 'path': self.resolver.Relative_Value_Selection.path
    }
    
    export namespace Possible_Value_Branches {
        
        export namespace D {
            
            export type benchmark = self.structure.Value.state.options.D
            
            export namespace value {
                
                export type not_set = null
                
                export type set_ = self.resolver.Relative_Value_Selection
            }
            
            export type value =
                | readonly ['not set', self.resolver.Possible_Value_Branches.D.value.not_set]
                | readonly ['set', self.resolver.Possible_Value_Branches.D.value.set_]
        }
        
        export type D = {
            readonly 'benchmark': self.resolver.Possible_Value_Branches.D.benchmark
            readonly 'value': self.resolver.Possible_Value_Branches.D.value
        }
    }
    
    export type Possible_Value_Branches = p_.Dictionary<self.resolver.Possible_Value_Branches.D>
    
    export namespace Possible_Value_Selection {
        
        export namespace value {
            
            export namespace decide_state {
                
                export type target = self.resolver.Value_Reference
                
                export namespace selection {
                    
                    export namespace constraints {
                        
                        export type state = self.structure.Value.state
                    }
                    
                    export type constraints = {
                        readonly 'state': self.resolver.Possible_Value_Selection.value.decide_state.selection.constraints.state
                    }
                    
                    export type value = self.resolver.Guaranteed_Value_Selection
                }
                
                export type selection = {
                    readonly 'constraints': self.resolver.Possible_Value_Selection.value.decide_state.selection.constraints
                    readonly 'value': self.resolver.Possible_Value_Selection.value.decide_state.selection.value
                }
                
                export type options = self.resolver.Possible_Value_Branches
            }
            
            export type decide_state = {
                readonly 'target': self.resolver.Possible_Value_Selection.value.decide_state.target
                readonly 'selection': self.resolver.Possible_Value_Selection.value.decide_state.selection
                readonly 'options': self.resolver.Possible_Value_Selection.value.decide_state.options
            }
            
            export namespace optional_value {
                
                export namespace selection {
                    
                    export namespace constraints {
                        
                        export type optional = self.structure.Value.optional
                    }
                    
                    export type constraints = {
                        readonly 'optional': self.resolver.Possible_Value_Selection.value.optional_value.selection.constraints.optional
                    }
                    
                    export type value = self.resolver.Guaranteed_Value_Selection
                }
                
                export type selection = {
                    readonly 'constraints': self.resolver.Possible_Value_Selection.value.optional_value.selection.constraints
                    readonly 'value': self.resolver.Possible_Value_Selection.value.optional_value.selection.value
                }
                
                export type tail = self.resolver.Relative_Value_Selection
            }
            
            export type optional_value = {
                readonly 'selection': self.resolver.Possible_Value_Selection.value.optional_value.selection
                readonly 'tail': self.resolver.Possible_Value_Selection.value.optional_value.tail
            }
            
            export namespace parameter {
                
                export type l_entry = self.declarations.Signature.values.D
                
                export type l_id = string
            }
            
            export type parameter = {
                readonly 'l entry': self.resolver.Possible_Value_Selection.value.parameter.l_entry
                readonly 'l id': self.resolver.Possible_Value_Selection.value.parameter.l_id
            }
            
            export namespace result {
                
                export namespace value {
                    
                    export namespace state {
                        
                        export namespace property {
                            
                            export namespace constraints {
                                
                                export type state = self.structure.Value.state
                                
                                export type result = self.structure.Optional_Result.O
                            }
                            
                            export type constraints = {
                                readonly 'state': self.resolver.Possible_Value_Selection.value.result.value.state.property.constraints.state
                                readonly 'result': self.resolver.Possible_Value_Selection.value.result.value.state.property.constraints.result
                            }
                            
                            export namespace value {
                                
                                export type l_entry = self.structure.Group.D
                                
                                export type l_id = string
                            }
                            
                            export type value = {
                                readonly 'l entry': self.resolver.Possible_Value_Selection.value.result.value.state.property.value.l_entry
                                readonly 'l id': self.resolver.Possible_Value_Selection.value.result.value.state.property.value.l_id
                            }
                        }
                        
                        export type property = {
                            readonly 'constraints': self.resolver.Possible_Value_Selection.value.result.value.state.property.constraints
                            readonly 'value': self.resolver.Possible_Value_Selection.value.result.value.state.property.value
                        }
                    }
                    
                    export type state = {
                        readonly 'property': self.resolver.Possible_Value_Selection.value.result.value.state.property
                    }
                    
                    export namespace optional_value {
                        
                        export namespace property {
                            
                            export namespace constraints {
                                
                                export type optional = self.structure.Value.optional
                                
                                export type result = self.structure.Optional_Result.O
                            }
                            
                            export type constraints = {
                                readonly 'optional': self.resolver.Possible_Value_Selection.value.result.value.optional_value.property.constraints.optional
                                readonly 'result': self.resolver.Possible_Value_Selection.value.result.value.optional_value.property.constraints.result
                            }
                            
                            export namespace value {
                                
                                export type l_entry = self.structure.Group.D
                                
                                export type l_id = string
                            }
                            
                            export type value = {
                                readonly 'l entry': self.resolver.Possible_Value_Selection.value.result.value.optional_value.property.value.l_entry
                                readonly 'l id': self.resolver.Possible_Value_Selection.value.result.value.optional_value.property.value.l_id
                            }
                        }
                        
                        export type property = {
                            readonly 'constraints': self.resolver.Possible_Value_Selection.value.result.value.optional_value.property.constraints
                            readonly 'value': self.resolver.Possible_Value_Selection.value.result.value.optional_value.property.value
                        }
                    }
                    
                    export type optional_value = {
                        readonly 'property': self.resolver.Possible_Value_Selection.value.result.value.optional_value.property
                    }
                }
                
                export type value =
                    | readonly ['state', self.resolver.Possible_Value_Selection.value.result.value.state]
                    | readonly ['optional value', self.resolver.Possible_Value_Selection.value.result.value.optional_value]
                
                export type result = self.structure.Value
            }
            
            export type result = {
                readonly 'value': self.resolver.Possible_Value_Selection.value.result.value
                readonly 'result': self.resolver.Possible_Value_Selection.value.result.result
            }
        }
        
        export type value =
            | readonly ['decide state', self.resolver.Possible_Value_Selection.value.decide_state]
            | readonly ['optional value', self.resolver.Possible_Value_Selection.value.optional_value]
            | readonly ['parameter', self.resolver.Possible_Value_Selection.value.parameter]
            | readonly ['result', self.resolver.Possible_Value_Selection.value.result]
        
        export type result = self.structure.Value
    }
    
    export type Possible_Value_Selection = {
        readonly 'value': self.resolver.Possible_Value_Selection.value
        readonly 'result': self.resolver.Possible_Value_Selection.result
    }
    
    export namespace Option_Constraints {
        
        export namespace O {
            
            export namespace constraints {
                
                export type declarations = self.structure.Option_Constraints.O
            }
            
            export type constraints = {
                readonly 'declarations': self.resolver.Option_Constraints.O.constraints.declarations
            }
            
            export namespace value {
                
                export namespace D {
                    
                    export type benchmark = self.structure.Option_Constraints.O.D
                    
                    export namespace value {
                        
                        export namespace value {
                            
                            export namespace state {
                                
                                export namespace selection {
                                    
                                    export namespace constraints {
                                        
                                        export type state = self.structure.Value.state
                                    }
                                    
                                    export type constraints = {
                                        readonly 'state': self.resolver.Option_Constraints.O.value.D.value.value.state.selection.constraints.state
                                    }
                                    
                                    export type value = self.resolver.Guaranteed_Value_Selection
                                }
                                
                                export type selection = {
                                    readonly 'constraints': self.resolver.Option_Constraints.O.value.D.value.value.state.selection.constraints
                                    readonly 'value': self.resolver.Option_Constraints.O.value.D.value.value.state.selection.value
                                }
                                
                                export namespace option {
                                    
                                    export type l_entry = self.structure.Value.state.options.D
                                    
                                    export type l_id = string
                                }
                                
                                export type option = {
                                    readonly 'l entry': self.resolver.Option_Constraints.O.value.D.value.value.state.option.l_entry
                                    readonly 'l id': self.resolver.Option_Constraints.O.value.D.value.value.state.option.l_id
                                }
                            }
                            
                            export type state = {
                                readonly 'selection': self.resolver.Option_Constraints.O.value.D.value.value.state.selection
                                readonly 'option': self.resolver.Option_Constraints.O.value.D.value.value.state.option
                            }
                            
                            export type assert_is_set = self.resolver.Possible_Value_Selection
                        }
                        
                        export type value =
                            | readonly ['state', self.resolver.Option_Constraints.O.value.D.value.value.state]
                            | readonly ['assert is set', self.resolver.Option_Constraints.O.value.D.value.value.assert_is_set]
                        
                        export type result = self.structure.Value
                    }
                    
                    export type value = {
                        readonly 'value': self.resolver.Option_Constraints.O.value.D.value.value
                        readonly 'result': self.resolver.Option_Constraints.O.value.D.value.result
                    }
                }
                
                export type D = {
                    readonly 'benchmark': self.resolver.Option_Constraints.O.value.D.benchmark
                    readonly 'value': self.resolver.Option_Constraints.O.value.D.value
                }
            }
            
            export type value = p_.Dictionary<self.resolver.Option_Constraints.O.value.D>
        }
        
        export type O = {
            readonly 'constraints': self.resolver.Option_Constraints.O.constraints
            readonly 'value': self.resolver.Option_Constraints.O.value
        }
    }
    
    export type Option_Constraints = p_.Optional_Value<self.resolver.Option_Constraints.O>
    
    export namespace Guaranteed_Value_Selection {
        
        export namespace start {
            
            export namespace value {
                
                export namespace optional_fallback {
                    
                    export type selection = self.resolver.Possible_Value_Selection
                    
                    export type fallback = self.resolver.Guaranteed_Value_Selection
                }
                
                export type optional_fallback = {
                    readonly 'selection': self.resolver.Guaranteed_Value_Selection.start.value.optional_fallback.selection
                    readonly 'fallback': self.resolver.Guaranteed_Value_Selection.start.value.optional_fallback.fallback
                }
                
                export namespace sibling_property {
                    
                    export type l_entry = self.structure.Group.D
                    
                    export type l_id = string
                }
                
                export type sibling_property = {
                    readonly 'l entry': self.resolver.Guaranteed_Value_Selection.start.value.sibling_property.l_entry
                    readonly 'l id': self.resolver.Guaranteed_Value_Selection.start.value.sibling_property.l_id
                }
                
                export namespace parent_sibling {
                    
                    export type l_entry = self.structure.Group.D
                    
                    export type l_id = string
                }
                
                export type parent_sibling = {
                    readonly 'l entry': self.resolver.Guaranteed_Value_Selection.start.value.parent_sibling.l_entry
                    readonly 'l id': self.resolver.Guaranteed_Value_Selection.start.value.parent_sibling.l_id
                }
                
                export namespace option_constraint {
                    
                    export namespace constraints {
                        
                        export type oc = self.structure.Option_Constraints
                    }
                    
                    export type constraints = {
                        readonly 'oc': self.resolver.Guaranteed_Value_Selection.start.value.option_constraint.constraints.oc
                    }
                    
                    export namespace value {
                        
                        export type l_entry = self.structure.Option_Constraints.O.D
                        
                        export type l_id = string
                    }
                    
                    export type value = {
                        readonly 'l entry': self.resolver.Guaranteed_Value_Selection.start.value.option_constraint.value.l_entry
                        readonly 'l id': self.resolver.Guaranteed_Value_Selection.start.value.option_constraint.value.l_id
                    }
                }
                
                export type option_constraint = {
                    readonly 'constraints': self.resolver.Guaranteed_Value_Selection.start.value.option_constraint.constraints
                    readonly 'value': self.resolver.Guaranteed_Value_Selection.start.value.option_constraint.value
                }
                
                export namespace sibling_option_constraint {
                    
                    export type l_entry = self.resolver.Option_Constraints.O.value.D
                    
                    export type l_id = string
                }
                
                export type sibling_option_constraint = {
                    readonly 'l entry': self.resolver.Guaranteed_Value_Selection.start.value.sibling_option_constraint.l_entry
                    readonly 'l id': self.resolver.Guaranteed_Value_Selection.start.value.sibling_option_constraint.l_id
                }
                
                export namespace list_cursor {
                    
                    export namespace constraints {
                        
                        export type result = self.structure.Optional_Result.O
                    }
                    
                    export type constraints = {
                        readonly 'result': self.resolver.Guaranteed_Value_Selection.start.value.list_cursor.constraints.result
                    }
                    
                    export type value = null
                }
                
                export type list_cursor = {
                    readonly 'constraints': self.resolver.Guaranteed_Value_Selection.start.value.list_cursor.constraints
                    readonly 'value': self.resolver.Guaranteed_Value_Selection.start.value.list_cursor.value
                }
                
                export namespace linked_entry {
                    
                    export namespace constraints {
                        
                        export type entry = self.structure.Value
                    }
                    
                    export type constraints = {
                        readonly 'entry': self.resolver.Guaranteed_Value_Selection.start.value.linked_entry.constraints.entry
                    }
                    
                    export type value = null
                }
                
                export type linked_entry = {
                    readonly 'constraints': self.resolver.Guaranteed_Value_Selection.start.value.linked_entry.constraints
                    readonly 'value': self.resolver.Guaranteed_Value_Selection.start.value.linked_entry.value
                }
                
                export namespace constraint {
                    
                    export namespace value {
                        
                        export namespace component {
                            
                            export namespace property {
                                
                                export namespace constraints {
                                    
                                    export type component = self.structure.Value.component
                                }
                                
                                export type constraints = {
                                    readonly 'component': self.resolver.Guaranteed_Value_Selection.start.value.constraint.value.component.property.constraints.component
                                }
                                
                                export namespace value {
                                    
                                    export type l_entry = self.structure.Group.D
                                    
                                    export type l_id = string
                                }
                                
                                export type value = {
                                    readonly 'l entry': self.resolver.Guaranteed_Value_Selection.start.value.constraint.value.component.property.value.l_entry
                                    readonly 'l id': self.resolver.Guaranteed_Value_Selection.start.value.constraint.value.component.property.value.l_id
                                }
                            }
                            
                            export type property = {
                                readonly 'constraints': self.resolver.Guaranteed_Value_Selection.start.value.constraint.value.component.property.constraints
                                readonly 'value': self.resolver.Guaranteed_Value_Selection.start.value.constraint.value.component.property.value
                            }
                            
                            export namespace constraint {
                                
                                export type l_entry = self.structure.Reference_Constraints.O.D
                                
                                export type l_id = string
                            }
                            
                            export type constraint = {
                                readonly 'l entry': self.resolver.Guaranteed_Value_Selection.start.value.constraint.value.component.constraint.l_entry
                                readonly 'l id': self.resolver.Guaranteed_Value_Selection.start.value.constraint.value.component.constraint.l_id
                            }
                        }
                        
                        export type component = {
                            readonly 'property': self.resolver.Guaranteed_Value_Selection.start.value.constraint.value.component.property
                            readonly 'constraint': self.resolver.Guaranteed_Value_Selection.start.value.constraint.value.component.constraint
                        }
                        
                        export namespace reference {
                            
                            export namespace property {
                                
                                export namespace constraints {
                                    
                                    export type reference = self.structure.Value.reference
                                }
                                
                                export type constraints = {
                                    readonly 'reference': self.resolver.Guaranteed_Value_Selection.start.value.constraint.value.reference.property.constraints.reference
                                }
                                
                                export namespace value {
                                    
                                    export type l_entry = self.structure.Group.D
                                    
                                    export type l_id = string
                                }
                                
                                export type value = {
                                    readonly 'l entry': self.resolver.Guaranteed_Value_Selection.start.value.constraint.value.reference.property.value.l_entry
                                    readonly 'l id': self.resolver.Guaranteed_Value_Selection.start.value.constraint.value.reference.property.value.l_id
                                }
                            }
                            
                            export type property = {
                                readonly 'constraints': self.resolver.Guaranteed_Value_Selection.start.value.constraint.value.reference.property.constraints
                                readonly 'value': self.resolver.Guaranteed_Value_Selection.start.value.constraint.value.reference.property.value
                            }
                            
                            export namespace constraint {
                                
                                export type l_entry = self.structure.Reference_Constraints.O.D
                                
                                export type l_id = string
                            }
                            
                            export type constraint = {
                                readonly 'l entry': self.resolver.Guaranteed_Value_Selection.start.value.constraint.value.reference.constraint.l_entry
                                readonly 'l id': self.resolver.Guaranteed_Value_Selection.start.value.constraint.value.reference.constraint.l_id
                            }
                        }
                        
                        export type reference = {
                            readonly 'property': self.resolver.Guaranteed_Value_Selection.start.value.constraint.value.reference.property
                            readonly 'constraint': self.resolver.Guaranteed_Value_Selection.start.value.constraint.value.reference.constraint
                        }
                    }
                    
                    export type value =
                        | readonly ['component', self.resolver.Guaranteed_Value_Selection.start.value.constraint.value.component]
                        | readonly ['reference', self.resolver.Guaranteed_Value_Selection.start.value.constraint.value.reference]
                    
                    export type result = self.structure.Value
                }
                
                export type constraint = {
                    readonly 'value': self.resolver.Guaranteed_Value_Selection.start.value.constraint.value
                    readonly 'result': self.resolver.Guaranteed_Value_Selection.start.value.constraint.result
                }
                
                export namespace parameter {
                    
                    export type l_entry = self.declarations.Signature.values.D
                    
                    export type l_id = string
                }
                
                export type parameter = {
                    readonly 'l entry': self.resolver.Guaranteed_Value_Selection.start.value.parameter.l_entry
                    readonly 'l id': self.resolver.Guaranteed_Value_Selection.start.value.parameter.l_id
                }
                
                export namespace result {
                    
                    export namespace value {
                        
                        export namespace list {
                            
                            export namespace property {
                                
                                export namespace constraints {
                                    
                                    export type list = self.structure.Value.list
                                    
                                    export type result = self.structure.Optional_Result.O
                                }
                                
                                export type constraints = {
                                    readonly 'list': self.resolver.Guaranteed_Value_Selection.start.value.result.value.list.property.constraints.list
                                    readonly 'result': self.resolver.Guaranteed_Value_Selection.start.value.result.value.list.property.constraints.result
                                }
                                
                                export namespace value {
                                    
                                    export type l_entry = self.structure.Group.D
                                    
                                    export type l_id = string
                                }
                                
                                export type value = {
                                    readonly 'l entry': self.resolver.Guaranteed_Value_Selection.start.value.result.value.list.property.value.l_entry
                                    readonly 'l id': self.resolver.Guaranteed_Value_Selection.start.value.result.value.list.property.value.l_id
                                }
                            }
                            
                            export type property = {
                                readonly 'constraints': self.resolver.Guaranteed_Value_Selection.start.value.result.value.list.property.constraints
                                readonly 'value': self.resolver.Guaranteed_Value_Selection.start.value.result.value.list.property.value
                            }
                        }
                        
                        export type list = {
                            readonly 'property': self.resolver.Guaranteed_Value_Selection.start.value.result.value.list.property
                        }
                        
                        export namespace state {
                            
                            export namespace property {
                                
                                export namespace constraints {
                                    
                                    export type state = self.structure.Value.state
                                    
                                    export type result = self.structure.Optional_Result.O
                                }
                                
                                export type constraints = {
                                    readonly 'state': self.resolver.Guaranteed_Value_Selection.start.value.result.value.state.property.constraints.state
                                    readonly 'result': self.resolver.Guaranteed_Value_Selection.start.value.result.value.state.property.constraints.result
                                }
                                
                                export namespace value {
                                    
                                    export type l_entry = self.structure.Group.D
                                    
                                    export type l_id = string
                                }
                                
                                export type value = {
                                    readonly 'l entry': self.resolver.Guaranteed_Value_Selection.start.value.result.value.state.property.value.l_entry
                                    readonly 'l id': self.resolver.Guaranteed_Value_Selection.start.value.result.value.state.property.value.l_id
                                }
                            }
                            
                            export type property = {
                                readonly 'constraints': self.resolver.Guaranteed_Value_Selection.start.value.result.value.state.property.constraints
                                readonly 'value': self.resolver.Guaranteed_Value_Selection.start.value.result.value.state.property.value
                            }
                        }
                        
                        export type state = {
                            readonly 'property': self.resolver.Guaranteed_Value_Selection.start.value.result.value.state.property
                        }
                    }
                    
                    export type value =
                        | readonly ['list', self.resolver.Guaranteed_Value_Selection.start.value.result.value.list]
                        | readonly ['state', self.resolver.Guaranteed_Value_Selection.start.value.result.value.state]
                    
                    export type result = self.structure.Value
                }
                
                export type result = {
                    readonly 'value': self.resolver.Guaranteed_Value_Selection.start.value.result.value
                    readonly 'result': self.resolver.Guaranteed_Value_Selection.start.value.result.result
                }
            }
            
            export type value =
                | readonly ['optional fallback', self.resolver.Guaranteed_Value_Selection.start.value.optional_fallback]
                | readonly ['sibling property', self.resolver.Guaranteed_Value_Selection.start.value.sibling_property]
                | readonly ['parent sibling', self.resolver.Guaranteed_Value_Selection.start.value.parent_sibling]
                | readonly ['option constraint', self.resolver.Guaranteed_Value_Selection.start.value.option_constraint]
                | readonly ['sibling option constraint', self.resolver.Guaranteed_Value_Selection.start.value.sibling_option_constraint]
                | readonly ['list cursor', self.resolver.Guaranteed_Value_Selection.start.value.list_cursor]
                | readonly ['linked entry', self.resolver.Guaranteed_Value_Selection.start.value.linked_entry]
                | readonly ['constraint', self.resolver.Guaranteed_Value_Selection.start.value.constraint]
                | readonly ['parameter', self.resolver.Guaranteed_Value_Selection.start.value.parameter]
                | readonly ['result', self.resolver.Guaranteed_Value_Selection.start.value.result]
            
            export type result = self.structure.Value
        }
        
        export type start = {
            readonly 'value': self.resolver.Guaranteed_Value_Selection.start.value
            readonly 'result': self.resolver.Guaranteed_Value_Selection.start.result
        }
        
        export type tail = self.resolver.Relative_Value_Selection
    }
    
    export type Guaranteed_Value_Selection = {
        readonly 'start': self.resolver.Guaranteed_Value_Selection.start
        readonly 'tail': self.resolver.Guaranteed_Value_Selection.tail
    }
    
    export namespace Lookup_Selection {
        
        export namespace type_ {
            
            export namespace value {
                
                export namespace acyclic {
                    
                    export namespace value {
                        
                        export namespace siblings {
                            
                            export namespace constraints {
                                
                                export type cd = self.structure.Dictionary
                            }
                            
                            export type constraints = {
                                readonly 'cd': self.resolver.Lookup_Selection.type_.value.acyclic.value.siblings.constraints.cd
                            }
                            
                            export type value = null
                        }
                        
                        export type siblings = {
                            readonly 'constraints': self.resolver.Lookup_Selection.type_.value.acyclic.value.siblings.constraints
                            readonly 'value': self.resolver.Lookup_Selection.type_.value.acyclic.value.siblings.value
                        }
                        
                        export namespace resolved_dictionary {
                            
                            export namespace selection {
                                
                                export namespace constraints {
                                    
                                    export type dictionary = self.structure.Value.dictionary
                                }
                                
                                export type constraints = {
                                    readonly 'dictionary': self.resolver.Lookup_Selection.type_.value.acyclic.value.resolved_dictionary.selection.constraints.dictionary
                                }
                                
                                export type value = self.resolver.Guaranteed_Value_Selection
                            }
                            
                            export type selection = {
                                readonly 'constraints': self.resolver.Lookup_Selection.type_.value.acyclic.value.resolved_dictionary.selection.constraints
                                readonly 'value': self.resolver.Lookup_Selection.type_.value.acyclic.value.resolved_dictionary.selection.value
                            }
                        }
                        
                        export type resolved_dictionary = {
                            readonly 'selection': self.resolver.Lookup_Selection.type_.value.acyclic.value.resolved_dictionary.selection
                        }
                    }
                    
                    export type value =
                        | readonly ['siblings', self.resolver.Lookup_Selection.type_.value.acyclic.value.siblings]
                        | readonly ['resolved dictionary', self.resolver.Lookup_Selection.type_.value.acyclic.value.resolved_dictionary]
                    
                    export type result = self.structure.Dictionary
                }
                
                export type acyclic = {
                    readonly 'value': self.resolver.Lookup_Selection.type_.value.acyclic.value
                    readonly 'result': self.resolver.Lookup_Selection.type_.value.acyclic.result
                }
                
                export namespace cyclic {
                    
                    export namespace value {
                        
                        export namespace siblings {
                            
                            export namespace constraints {
                                
                                export type cd = self.structure.Dictionary
                            }
                            
                            export type constraints = {
                                readonly 'cd': self.resolver.Lookup_Selection.type_.value.cyclic.value.siblings.constraints.cd
                            }
                            
                            export type value = null
                        }
                        
                        export type siblings = {
                            readonly 'constraints': self.resolver.Lookup_Selection.type_.value.cyclic.value.siblings.constraints
                            readonly 'value': self.resolver.Lookup_Selection.type_.value.cyclic.value.siblings.value
                        }
                    }
                    
                    export type value =
                        | readonly ['siblings', self.resolver.Lookup_Selection.type_.value.cyclic.value.siblings]
                    
                    export type result = self.structure.Dictionary
                }
                
                export type cyclic = {
                    readonly 'value': self.resolver.Lookup_Selection.type_.value.cyclic.value
                    readonly 'result': self.resolver.Lookup_Selection.type_.value.cyclic.result
                }
                
                export namespace parameter {
                    
                    export type l_entry = self.declarations.Signature.lookups.D
                    
                    export type l_id = string
                }
                
                export type parameter = {
                    readonly 'l entry': self.resolver.Lookup_Selection.type_.value.parameter.l_entry
                    readonly 'l id': self.resolver.Lookup_Selection.type_.value.parameter.l_id
                }
            }
            
            export type value =
                | readonly ['acyclic', self.resolver.Lookup_Selection.type_.value.acyclic]
                | readonly ['cyclic', self.resolver.Lookup_Selection.type_.value.cyclic]
                | readonly ['parameter', self.resolver.Lookup_Selection.type_.value.parameter]
            
            export type result = self.structure.Dictionary
        }
        
        export type type_ = {
            readonly 'value': self.resolver.Lookup_Selection.type_.value
            readonly 'result': self.resolver.Lookup_Selection.type_.result
        }
    }
    
    export type Lookup_Selection = {
        readonly 'type': self.resolver.Lookup_Selection.type_
    }
    
    export namespace Reference_Constraints {
        
        export namespace O {
            
            export namespace constraints {
                
                export type declarations = self.structure.Reference_Constraints.O
            }
            
            export type constraints = {
                readonly 'declarations': self.resolver.Reference_Constraints.O.constraints.declarations
            }
            
            export namespace value {
                
                export namespace D {
                    
                    export type benchmark = self.structure.Reference_Constraints.O.D
                    
                    export namespace value {
                        
                        export namespace start {
                            
                            export namespace value {
                                
                                export type value = null
                                
                                export namespace sibling {
                                    
                                    export type l_entry = self.structure.Reference_Constraints.O.D
                                    
                                    export type l_id = string
                                }
                                
                                export type sibling = {
                                    readonly 'l entry': self.resolver.Reference_Constraints.O.value.D.value.start.value.sibling.l_entry
                                    readonly 'l id': self.resolver.Reference_Constraints.O.value.D.value.start.value.sibling.l_id
                                }
                            }
                            
                            export type value =
                                | readonly ['value', self.resolver.Reference_Constraints.O.value.D.value.start.value.value]
                                | readonly ['sibling', self.resolver.Reference_Constraints.O.value.D.value.start.value.sibling]
                            
                            export type result = self.structure.Value
                        }
                        
                        export type start = {
                            readonly 'value': self.resolver.Reference_Constraints.O.value.D.value.start.value
                            readonly 'result': self.resolver.Reference_Constraints.O.value.D.value.start.result
                        }
                        
                        export namespace constraint {
                            
                            export type selection = self.resolver.Relative_Value_Selection
                            
                            export namespace type_ {
                                
                                export namespace value {
                                    
                                    export namespace state {
                                        
                                        export namespace constraints {
                                            
                                            export type state = self.structure.Value.state
                                        }
                                        
                                        export type constraints = {
                                            readonly 'state': self.resolver.Reference_Constraints.O.value.D.value.constraint.type_.value.state.constraints.state
                                        }
                                        
                                        export namespace value {
                                            
                                            export namespace option {
                                                
                                                export type l_entry = self.structure.Value.state.options.D
                                                
                                                export type l_id = string
                                            }
                                            
                                            export type option = {
                                                readonly 'l entry': self.resolver.Reference_Constraints.O.value.D.value.constraint.type_.value.state.value.option.l_entry
                                                readonly 'l id': self.resolver.Reference_Constraints.O.value.D.value.constraint.type_.value.state.value.option.l_id
                                            }
                                        }
                                        
                                        export type value = {
                                            readonly 'option': self.resolver.Reference_Constraints.O.value.D.value.constraint.type_.value.state.value.option
                                        }
                                    }
                                    
                                    export type state = {
                                        readonly 'constraints': self.resolver.Reference_Constraints.O.value.D.value.constraint.type_.value.state.constraints
                                        readonly 'value': self.resolver.Reference_Constraints.O.value.D.value.constraint.type_.value.state.value
                                    }
                                    
                                    export namespace optional_value {
                                        
                                        export namespace constraints {
                                            
                                            export type optional = self.structure.Value.optional
                                        }
                                        
                                        export type constraints = {
                                            readonly 'optional': self.resolver.Reference_Constraints.O.value.D.value.constraint.type_.value.optional_value.constraints.optional
                                        }
                                        
                                        export namespace value {}
                                        
                                        export type value = null
                                    }
                                    
                                    export type optional_value = {
                                        readonly 'constraints': self.resolver.Reference_Constraints.O.value.D.value.constraint.type_.value.optional_value.constraints
                                        readonly 'value': self.resolver.Reference_Constraints.O.value.D.value.constraint.type_.value.optional_value.value
                                    }
                                }
                                
                                export type value =
                                    | readonly ['state', self.resolver.Reference_Constraints.O.value.D.value.constraint.type_.value.state]
                                    | readonly ['optional value', self.resolver.Reference_Constraints.O.value.D.value.constraint.type_.value.optional_value]
                                
                                export type result = self.structure.Value
                            }
                            
                            export type type_ = {
                                readonly 'value': self.resolver.Reference_Constraints.O.value.D.value.constraint.type_.value
                                readonly 'result': self.resolver.Reference_Constraints.O.value.D.value.constraint.type_.result
                            }
                        }
                        
                        export type constraint = {
                            readonly 'selection': self.resolver.Reference_Constraints.O.value.D.value.constraint.selection
                            readonly 'type': self.resolver.Reference_Constraints.O.value.D.value.constraint.type_
                        }
                    }
                    
                    export type value = {
                        readonly 'start': self.resolver.Reference_Constraints.O.value.D.value.start
                        readonly 'constraint': self.resolver.Reference_Constraints.O.value.D.value.constraint
                    }
                }
                
                export type D = {
                    readonly 'benchmark': self.resolver.Reference_Constraints.O.value.D.benchmark
                    readonly 'value': self.resolver.Reference_Constraints.O.value.D.value
                }
            }
            
            export type value = p_.Dictionary<self.resolver.Reference_Constraints.O.value.D>
        }
        
        export type O = {
            readonly 'constraints': self.resolver.Reference_Constraints.O.constraints
            readonly 'value': self.resolver.Reference_Constraints.O.value
        }
    }
    
    export type Reference_Constraints = p_.Optional_Value<self.resolver.Reference_Constraints.O>
    
    export namespace Resolver {
        
        export namespace namespaces {
            
            export namespace D {
                
                export type benchmark = self.declarations.Namespaces.D
                
                export type value = self.resolver.Resolver
            }
            
            export type D = {
                readonly 'benchmark': self.resolver.Resolver.namespaces.D.benchmark
                readonly 'value': self.resolver.Resolver.namespaces.D.value
            }
        }
        
        export type namespaces = p_.Dictionary<self.resolver.Resolver.namespaces.D>
        
        export namespace types {
            
            export namespace D {
                
                export type benchmark = self.declarations.Declarations.D
                
                export namespace value {
                    
                    export type root_value_resolver = self.resolver.Value
                }
                
                export type value = {
                    readonly 'root value resolver': self.resolver.Resolver.types.D.value.root_value_resolver
                }
            }
            
            export type D = {
                readonly 'benchmark': self.resolver.Resolver.types.D.benchmark
                readonly 'value': self.resolver.Resolver.types.D.value
            }
        }
        
        export type types = p_.Dictionary<self.resolver.Resolver.types.D>
    }
    
    export type Resolver = {
        readonly 'namespaces': self.resolver.Resolver.namespaces
        readonly 'types': self.resolver.Resolver.types
    }
    
    export namespace Result_Selection {
        
        export namespace value {
            
            export type context = self.resolver.Guaranteed_Value_Selection
            
            export type value = self.resolver.Relative_Value_Selection
        }
        
        export type value =
            | readonly ['context', self.resolver.Result_Selection.value.context]
            | readonly ['value', self.resolver.Result_Selection.value.value]
        
        export type result = self.structure.Value
    }
    
    export type Result_Selection = {
        readonly 'value': self.resolver.Result_Selection.value
        readonly 'result': self.resolver.Result_Selection.result
    }
    
    export namespace Checks {
        
        export namespace O {
            
            export namespace D {
                
                export type expected = self.resolver.Result_Selection
                
                export type actual = self.resolver.Result_Selection
            }
            
            export type D = {
                readonly 'expected': self.resolver.Checks.O.D.expected
                readonly 'actual': self.resolver.Checks.O.D.actual
            }
        }
        
        export type O = p_.Dictionary<self.resolver.Checks.O.D>
    }
    
    export type Checks = p_.Optional_Value<self.resolver.Checks.O>
    
    export namespace Value {
        
        export namespace component {
            
            export namespace constraints {
                
                export type definition = self.structure.Value.component
            }
            
            export type constraints = {
                readonly 'definition': self.resolver.Value.component.constraints.definition
            }
            
            export namespace value {
                
                export namespace location {
                    
                    export namespace value {
                        
                        export namespace local {
                            
                            export type l_entry = self.declarations.Declarations.D
                            
                            export type l_id = string
                        }
                        
                        export type local = {
                            readonly 'l entry': self.resolver.Value.component.value.location.value.local.l_entry
                            readonly 'l id': self.resolver.Value.component.value.location.value.local.l_id
                        }
                        
                        export namespace child_namespace {
                            
                            export namespace namespace {
                                
                                export type l_entry = self.declarations.Namespaces.D
                                
                                export type l_id = string
                            }
                            
                            export type namespace = {
                                readonly 'l entry': self.resolver.Value.component.value.location.value.child_namespace.namespace.l_entry
                                readonly 'l id': self.resolver.Value.component.value.location.value.child_namespace.namespace.l_id
                            }
                            
                            export namespace resolver {
                                
                                export namespace constraints {
                                    
                                    export type public_ = self.structure.Type.visibility.public_
                                }
                                
                                export type constraints = {
                                    readonly 'public': self.resolver.Value.component.value.location.value.child_namespace.resolver.constraints.public_
                                }
                                
                                export namespace value {
                                    
                                    export type l_entry = self.declarations.Declarations.D
                                    
                                    export type l_id = string
                                }
                                
                                export type value = {
                                    readonly 'l entry': self.resolver.Value.component.value.location.value.child_namespace.resolver.value.l_entry
                                    readonly 'l id': self.resolver.Value.component.value.location.value.child_namespace.resolver.value.l_id
                                }
                            }
                            
                            export type resolver = {
                                readonly 'constraints': self.resolver.Value.component.value.location.value.child_namespace.resolver.constraints
                                readonly 'value': self.resolver.Value.component.value.location.value.child_namespace.resolver.value
                            }
                        }
                        
                        export type child_namespace = {
                            readonly 'namespace': self.resolver.Value.component.value.location.value.child_namespace.namespace
                            readonly 'resolver': self.resolver.Value.component.value.location.value.child_namespace.resolver
                        }
                        
                        export namespace sibling_namespace {
                            
                            export namespace constraints {
                                
                                export type declarations = self.declarations.Namespaces
                            }
                            
                            export type constraints = {
                                readonly 'declarations': self.resolver.Value.component.value.location.value.sibling_namespace.constraints.declarations
                            }
                            
                            export namespace value {
                                
                                export namespace namespace {
                                    
                                    export type l_entry = self.declarations.Namespaces.D
                                    
                                    export type l_id = string
                                }
                                
                                export type namespace = {
                                    readonly 'l entry': self.resolver.Value.component.value.location.value.sibling_namespace.value.namespace.l_entry
                                    readonly 'l id': self.resolver.Value.component.value.location.value.sibling_namespace.value.namespace.l_id
                                }
                                
                                export namespace resolver {
                                    
                                    export namespace constraints {
                                        
                                        export type public_ = self.structure.Type.visibility.public_
                                    }
                                    
                                    export type constraints = {
                                        readonly 'public': self.resolver.Value.component.value.location.value.sibling_namespace.value.resolver.constraints.public_
                                    }
                                    
                                    export namespace value {
                                        
                                        export type l_entry = self.declarations.Declarations.D
                                        
                                        export type l_id = string
                                    }
                                    
                                    export type value = {
                                        readonly 'l entry': self.resolver.Value.component.value.location.value.sibling_namespace.value.resolver.value.l_entry
                                        readonly 'l id': self.resolver.Value.component.value.location.value.sibling_namespace.value.resolver.value.l_id
                                    }
                                }
                                
                                export type resolver = {
                                    readonly 'constraints': self.resolver.Value.component.value.location.value.sibling_namespace.value.resolver.constraints
                                    readonly 'value': self.resolver.Value.component.value.location.value.sibling_namespace.value.resolver.value
                                }
                            }
                            
                            export type value = {
                                readonly 'namespace': self.resolver.Value.component.value.location.value.sibling_namespace.value.namespace
                                readonly 'resolver': self.resolver.Value.component.value.location.value.sibling_namespace.value.resolver
                            }
                        }
                        
                        export type sibling_namespace = {
                            readonly 'constraints': self.resolver.Value.component.value.location.value.sibling_namespace.constraints
                            readonly 'value': self.resolver.Value.component.value.location.value.sibling_namespace.value
                        }
                    }
                    
                    export type value =
                        | readonly ['local', self.resolver.Value.component.value.location.value.local]
                        | readonly ['child namespace', self.resolver.Value.component.value.location.value.child_namespace]
                        | readonly ['sibling namespace', self.resolver.Value.component.value.location.value.sibling_namespace]
                    
                    export type result = self.declarations.Declarations.D
                }
                
                export type location = {
                    readonly 'value': self.resolver.Value.component.value.location.value
                    readonly 'result': self.resolver.Value.component.value.location.result
                }
                
                export namespace arguments_ {
                    
                    export namespace O {
                        
                        export namespace types {
                            
                            export namespace O {
                                
                                export namespace D {
                                    
                                    export type benchmark = self.declarations.Signature.values.D
                                    
                                    export namespace value {
                                        
                                        export namespace optional {
                                            
                                            export type not_set = null
                                            
                                            export type set_ = self.resolver.Guaranteed_Value_Selection
                                            
                                            export type selection = self.resolver.Possible_Value_Selection
                                        }
                                        
                                        export type optional =
                                            | readonly ['not set', self.resolver.Value.component.value.arguments_.O.types.O.D.value.optional.not_set]
                                            | readonly ['set', self.resolver.Value.component.value.arguments_.O.types.O.D.value.optional.set_]
                                            | readonly ['selection', self.resolver.Value.component.value.arguments_.O.types.O.D.value.optional.selection]
                                        
                                        export type required = self.resolver.Guaranteed_Value_Selection
                                        
                                        export namespace parameter {
                                            
                                            export type l_entry = self.declarations.Signature.values.D
                                            
                                            export type l_id = string
                                        }
                                        
                                        export type parameter = {
                                            readonly 'l entry': self.resolver.Value.component.value.arguments_.O.types.O.D.value.parameter.l_entry
                                            readonly 'l id': self.resolver.Value.component.value.arguments_.O.types.O.D.value.parameter.l_id
                                        }
                                    }
                                    
                                    export type value =
                                        | readonly ['optional', self.resolver.Value.component.value.arguments_.O.types.O.D.value.optional]
                                        | readonly ['required', self.resolver.Value.component.value.arguments_.O.types.O.D.value.required]
                                        | readonly ['parameter', self.resolver.Value.component.value.arguments_.O.types.O.D.value.parameter]
                                }
                                
                                export type D = {
                                    readonly 'benchmark': self.resolver.Value.component.value.arguments_.O.types.O.D.benchmark
                                    readonly 'value': self.resolver.Value.component.value.arguments_.O.types.O.D.value
                                }
                            }
                            
                            export type O = p_.Dictionary<self.resolver.Value.component.value.arguments_.O.types.O.D>
                        }
                        
                        export type types = p_.Optional_Value<self.resolver.Value.component.value.arguments_.O.types.O>
                        
                        export namespace lookups {
                            
                            export namespace O {
                                
                                export namespace D {
                                    
                                    export type benchmark = self.declarations.Signature.lookups.D
                                    
                                    export namespace value {
                                        
                                        export type acyclic = null
                                        
                                        export type cyclic = null
                                        
                                        export type selection = self.resolver.Lookup_Selection
                                    }
                                    
                                    export type value =
                                        | readonly ['acyclic', self.resolver.Value.component.value.arguments_.O.lookups.O.D.value.acyclic]
                                        | readonly ['cyclic', self.resolver.Value.component.value.arguments_.O.lookups.O.D.value.cyclic]
                                        | readonly ['selection', self.resolver.Value.component.value.arguments_.O.lookups.O.D.value.selection]
                                }
                                
                                export type D = {
                                    readonly 'benchmark': self.resolver.Value.component.value.arguments_.O.lookups.O.D.benchmark
                                    readonly 'value': self.resolver.Value.component.value.arguments_.O.lookups.O.D.value
                                }
                            }
                            
                            export type O = p_.Dictionary<self.resolver.Value.component.value.arguments_.O.lookups.O.D>
                        }
                        
                        export type lookups = p_.Optional_Value<self.resolver.Value.component.value.arguments_.O.lookups.O>
                    }
                    
                    export type O = {
                        readonly 'types': self.resolver.Value.component.value.arguments_.O.types
                        readonly 'lookups': self.resolver.Value.component.value.arguments_.O.lookups
                    }
                }
                
                export type arguments_ = p_.Optional_Value<self.resolver.Value.component.value.arguments_.O>
                
                export type constraints = self.resolver.Reference_Constraints
            }
            
            export type value = {
                readonly 'location': self.resolver.Value.component.value.location
                readonly 'arguments': self.resolver.Value.component.value.arguments_
                readonly 'constraints': self.resolver.Value.component.value.constraints
            }
        }
        
        export type component = {
            readonly 'constraints': self.resolver.Value.component.constraints
            readonly 'value': self.resolver.Value.component.value
        }
        
        export namespace dictionary {
            
            export namespace constraints {
                
                export type definition = self.structure.Value.dictionary
            }
            
            export type constraints = {
                readonly 'definition': self.resolver.Value.dictionary.constraints.definition
            }
            
            export namespace value {
                
                export type resolver = self.resolver.Value
                
                export namespace benchmark {
                    
                    export namespace O {
                        
                        export namespace constraints {
                            
                            export type benchmark = self.structure.Dictionary.benchmark.O
                        }
                        
                        export type constraints = {
                            readonly 'benchmark': self.resolver.Value.dictionary.value.benchmark.O.constraints.benchmark
                        }
                        
                        export namespace value {
                            
                            export namespace selection {
                                
                                export namespace constraints {
                                    
                                    export type dictionary = self.structure.Value.dictionary
                                }
                                
                                export type constraints = {
                                    readonly 'dictionary': self.resolver.Value.dictionary.value.benchmark.O.value.selection.constraints.dictionary
                                }
                                
                                export type value = self.resolver.Guaranteed_Value_Selection
                            }
                            
                            export type selection = {
                                readonly 'constraints': self.resolver.Value.dictionary.value.benchmark.O.value.selection.constraints
                                readonly 'value': self.resolver.Value.dictionary.value.benchmark.O.value.selection.value
                            }
                        }
                        
                        export type value = {
                            readonly 'selection': self.resolver.Value.dictionary.value.benchmark.O.value.selection
                        }
                    }
                    
                    export type O = {
                        readonly 'constraints': self.resolver.Value.dictionary.value.benchmark.O.constraints
                        readonly 'value': self.resolver.Value.dictionary.value.benchmark.O.value
                    }
                }
                
                export type benchmark = p_.Optional_Value<self.resolver.Value.dictionary.value.benchmark.O>
            }
            
            export type value = {
                readonly 'resolver': self.resolver.Value.dictionary.value.resolver
                readonly 'benchmark': self.resolver.Value.dictionary.value.benchmark
            }
        }
        
        export type dictionary = {
            readonly 'constraints': self.resolver.Value.dictionary.constraints
            readonly 'value': self.resolver.Value.dictionary.value
        }
        
        export namespace group {
            
            export namespace constraints {
                
                export type definition = self.structure.Value.group
            }
            
            export type constraints = {
                readonly 'definition': self.resolver.Value.group.constraints.definition
            }
            
            export namespace value {
                
                export namespace D {
                    
                    export type benchmark = self.structure.Group.D
                    
                    export namespace value {
                        
                        export type resolver = self.resolver.Value
                    }
                    
                    export type value = {
                        readonly 'resolver': self.resolver.Value.group.value.D.value.resolver
                    }
                }
                
                export type D = {
                    readonly 'benchmark': self.resolver.Value.group.value.D.benchmark
                    readonly 'value': self.resolver.Value.group.value.D.value
                }
            }
            
            export type value = p_.Dictionary<self.resolver.Value.group.value.D>
        }
        
        export type group = {
            readonly 'constraints': self.resolver.Value.group.constraints
            readonly 'value': self.resolver.Value.group.value
        }
        
        export namespace list {
            
            export namespace constraints {
                
                export type definition = self.structure.Value.list
            }
            
            export type constraints = {
                readonly 'definition': self.resolver.Value.list.constraints.definition
            }
            
            export namespace value {
                
                export type resolver = self.resolver.Value
                
                export namespace result {
                    
                    export namespace O {
                        
                        export namespace constraints {
                            
                            export type definition = self.structure.Value.list
                            
                            export type result = self.structure.Optional_Result.O
                        }
                        
                        export type constraints = {
                            readonly 'definition': self.resolver.Value.list.value.result.O.constraints.definition
                            readonly 'result': self.resolver.Value.list.value.result.O.constraints.result
                        }
                        
                        export namespace value {
                            
                            export type initial = self.resolver.Guaranteed_Value_Selection
                            
                            export type next = self.resolver.Result_Selection
                        }
                        
                        export type value = {
                            readonly 'initial': self.resolver.Value.list.value.result.O.value.initial
                            readonly 'next': self.resolver.Value.list.value.result.O.value.next
                        }
                    }
                    
                    export type O = {
                        readonly 'constraints': self.resolver.Value.list.value.result.O.constraints
                        readonly 'value': self.resolver.Value.list.value.result.O.value
                    }
                }
                
                export type result = p_.Optional_Value<self.resolver.Value.list.value.result.O>
            }
            
            export type value = {
                readonly 'resolver': self.resolver.Value.list.value.resolver
                readonly 'result': self.resolver.Value.list.value.result
            }
        }
        
        export type list = {
            readonly 'constraints': self.resolver.Value.list.constraints
            readonly 'value': self.resolver.Value.list.value
        }
        
        export namespace nothing {
            
            export namespace constraints {
                
                export type definition = self.structure.Value.nothing
            }
            
            export type constraints = {
                readonly 'definition': self.resolver.Value.nothing.constraints.definition
            }
            
            export type value = null
        }
        
        export type nothing = {
            readonly 'constraints': self.resolver.Value.nothing.constraints
            readonly 'value': self.resolver.Value.nothing.value
        }
        
        export namespace simple {
            
            export namespace constraints {
                
                export type definition = self.structure.Value.simple.value
            }
            
            export type constraints = {
                readonly 'definition': self.resolver.Value.simple.constraints.definition
            }
            
            export type value = null
        }
        
        export type simple = {
            readonly 'constraints': self.resolver.Value.simple.constraints
            readonly 'value': self.resolver.Value.simple.value
        }
        
        export namespace optional {
            
            export namespace constraints {
                
                export type definition = self.structure.Value.optional
            }
            
            export type constraints = {
                readonly 'definition': self.resolver.Value.optional.constraints.definition
            }
            
            export namespace value {
                
                export namespace presence {
                    
                    export type O = self.resolver.Possible_Value_Selection
                }
                
                export type presence = p_.Optional_Value<self.resolver.Value.optional.value.presence.O>
                
                export type constraints = self.resolver.Option_Constraints
                
                export type resolver = self.resolver.Value
                
                export namespace not_set_constraints {
                    
                    export namespace O {
                        
                        export type D = self.resolver.Possible_Value_Selection
                    }
                    
                    export type O = p_.Dictionary<self.resolver.Value.optional.value.not_set_constraints.O.D>
                }
                
                export type not_set_constraints = p_.Optional_Value<self.resolver.Value.optional.value.not_set_constraints.O>
                
                export namespace result {
                    
                    export namespace O {
                        
                        export namespace constraints {
                            
                            export type definition = self.structure.Value.optional
                            
                            export type result = self.structure.Optional_Result.O
                        }
                        
                        export type constraints = {
                            readonly 'definition': self.resolver.Value.optional.value.result.O.constraints.definition
                            readonly 'result': self.resolver.Value.optional.value.result.O.constraints.result
                        }
                        
                        export type value = self.resolver.Result_Selection
                    }
                    
                    export type O = {
                        readonly 'constraints': self.resolver.Value.optional.value.result.O.constraints
                        readonly 'value': self.resolver.Value.optional.value.result.O.value
                    }
                }
                
                export type result = p_.Optional_Value<self.resolver.Value.optional.value.result.O>
                
                export type checks = self.resolver.Checks
            }
            
            export type value = {
                readonly 'presence': self.resolver.Value.optional.value.presence
                readonly 'constraints': self.resolver.Value.optional.value.constraints
                readonly 'resolver': self.resolver.Value.optional.value.resolver
                readonly 'not set constraints': self.resolver.Value.optional.value.not_set_constraints
                readonly 'result': self.resolver.Value.optional.value.result
                readonly 'checks': self.resolver.Value.optional.value.checks
            }
        }
        
        export type optional = {
            readonly 'constraints': self.resolver.Value.optional.constraints
            readonly 'value': self.resolver.Value.optional.value
        }
        
        export namespace reference {
            
            export namespace constraints {
                
                export type definition = self.structure.Value.reference
            }
            
            export type constraints = {
                readonly 'definition': self.resolver.Value.reference.constraints.definition
            }
            
            export namespace value {
                
                export namespace type_ {
                    
                    export type lookup = self.resolver.Lookup_Selection
                    
                    export type constraints = self.resolver.Reference_Constraints
                }
                
                export type type_ = {
                    readonly 'lookup': self.resolver.Value.reference.value.type_.lookup
                    readonly 'constraints': self.resolver.Value.reference.value.type_.constraints
                }
            }
            
            export type value = {
                readonly 'type': self.resolver.Value.reference.value.type_
            }
        }
        
        export type reference = {
            readonly 'constraints': self.resolver.Value.reference.constraints
            readonly 'value': self.resolver.Value.reference.value
        }
        
        export namespace state {
            
            export namespace constraints {
                
                export type definition = self.structure.Value.state
            }
            
            export type constraints = {
                readonly 'definition': self.resolver.Value.state.constraints.definition
            }
            
            export namespace value {
                
                export namespace options {
                    
                    export namespace D {
                        
                        export type benchmark = self.structure.Value.state.options.D
                        
                        export namespace value {
                            
                            export type constraints = self.resolver.Option_Constraints
                            
                            export type resolver = self.resolver.Value
                            
                            export namespace result {
                                
                                export namespace O {
                                    
                                    export namespace constraints {
                                        
                                        export type result = self.structure.Optional_Result.O
                                    }
                                    
                                    export type constraints = {
                                        readonly 'result': self.resolver.Value.state.value.options.D.value.result.O.constraints.result
                                    }
                                    
                                    export type value = self.resolver.Result_Selection
                                }
                                
                                export type O = {
                                    readonly 'constraints': self.resolver.Value.state.value.options.D.value.result.O.constraints
                                    readonly 'value': self.resolver.Value.state.value.options.D.value.result.O.value
                                }
                            }
                            
                            export type result = p_.Optional_Value<self.resolver.Value.state.value.options.D.value.result.O>
                            
                            export type checks = self.resolver.Checks
                        }
                        
                        export type value = {
                            readonly 'constraints': self.resolver.Value.state.value.options.D.value.constraints
                            readonly 'resolver': self.resolver.Value.state.value.options.D.value.resolver
                            readonly 'result': self.resolver.Value.state.value.options.D.value.result
                            readonly 'checks': self.resolver.Value.state.value.options.D.value.checks
                        }
                    }
                    
                    export type D = {
                        readonly 'benchmark': self.resolver.Value.state.value.options.D.benchmark
                        readonly 'value': self.resolver.Value.state.value.options.D.value
                    }
                }
                
                export type options = p_.Dictionary<self.resolver.Value.state.value.options.D>
            }
            
            export type value = {
                readonly 'options': self.resolver.Value.state.value.options
            }
        }
        
        export type state = {
            readonly 'constraints': self.resolver.Value.state.constraints
            readonly 'value': self.resolver.Value.state.value
        }
    }
    
    export type Value =
        | readonly ['component', self.resolver.Value.component]
        | readonly ['dictionary', self.resolver.Value.dictionary]
        | readonly ['group', self.resolver.Value.group]
        | readonly ['list', self.resolver.Value.list]
        | readonly ['nothing', self.resolver.Value.nothing]
        | readonly ['simple', self.resolver.Value.simple]
        | readonly ['optional', self.resolver.Value.optional]
        | readonly ['reference', self.resolver.Value.reference]
        | readonly ['state', self.resolver.Value.state]
}

export namespace Directory {
    
    export namespace group {
        
        export namespace nodes {
            
            export type D = self.Node
        }
        
        export type nodes = p_.Dictionary<self.Directory.group.nodes.D>
    }
    
    export type group = {
        readonly 'nodes': self.Directory.group.nodes
    }
    
    export namespace dictionary {
        
        export type node = self.Node
    }
    
    export type dictionary = {
        readonly 'node': self.Directory.dictionary.node
    }
}

export type Directory =
    | readonly ['group', self.Directory.group]
    | readonly ['dictionary', self.Directory.dictionary]

export namespace Node {
    
    export namespace file {
        
        export namespace type_ {
            
            export namespace constraints {
                
                export type public_ = self.structure.Type.visibility.public_
            }
            
            export type constraints = {
                readonly 'public': self.Node.file.type_.constraints.public_
            }
            
            export namespace value {
                
                export type l_entry = self.structure.Types.D
                
                export type l_id = string
            }
            
            export type value = {
                readonly 'l entry': self.Node.file.type_.value.l_entry
                readonly 'l id': self.Node.file.type_.value.l_id
            }
        }
        
        export type type_ = {
            readonly 'constraints': self.Node.file.type_.constraints
            readonly 'value': self.Node.file.type_.value
        }
    }
    
    export type file = {
        readonly 'type': self.Node.file.type_
    }
    
    export type directory = self.Directory
}

export type Node =
    | readonly ['file', self.Node.file]
    | readonly ['directory', self.Node.directory]

export namespace Schema {
    
    export type structure = self.structure.Structure
    
    export namespace resolver {
        
        export type declarations = self.declarations.Namespace
        
        export type implementations = self.resolver.Resolver
    }
    
    export type resolver = {
        readonly 'declarations': self.Schema.resolver.declarations
        readonly 'implementations': self.Schema.resolver.implementations
    }
}

export type Schema = {
    readonly 'structure': self.Schema.structure
    readonly 'resolver': self.Schema.resolver
}

export namespace Authoring_Specification {
    
    export type schema = self.Schema
    
    export type directory = self.Directory
}

export type Authoring_Specification = {
    readonly 'schema': self.Authoring_Specification.schema
    readonly 'directory': self.Authoring_Specification.directory
}

export namespace Document_Specification {
    
    export type schema = self.Schema
    
    export namespace root_type {
        
        export namespace constraints {
            
            export type public_ = self.structure.Type.visibility.public_
        }
        
        export type constraints = {
            readonly 'public': self.Document_Specification.root_type.constraints.public_
        }
        
        export namespace value {
            
            export type l_entry = self.structure.Types.D
            
            export type l_id = string
        }
        
        export type value = {
            readonly 'l entry': self.Document_Specification.root_type.value.l_entry
            readonly 'l id': self.Document_Specification.root_type.value.l_id
        }
    }
    
    export type root_type = {
        readonly 'constraints': self.Document_Specification.root_type.constraints
        readonly 'value': self.Document_Specification.root_type.value
    }
}

export type Document_Specification = {
    readonly 'schema': self.Document_Specification.schema
    readonly 'root type': self.Document_Specification.root_type
}
