import * as p_ from 'pareto-core/schema'
import type * as __schema from "./schema.js"
export namespace types {
    
    export namespace Directory {
        
        export namespace group {
            
            export namespace nodes {
                
                export type D = __schema.types.Node
            }
            
            export type nodes = p_.Dictionary<
                nodes.D
            >
        }
        
        export type group = {
            readonly 'nodes': group.nodes
        }
        
        export namespace dictionary {
            
            export type node = __schema.types.Node
        }
        
        export type dictionary = {
            readonly 'node': dictionary.node
        }
    }
    
    export type Directory = 
        | readonly ['group', Directory.group]
        | readonly ['dictionary', Directory.dictionary]
    
    export namespace Node {
        
        export namespace file {
            
            export type file_extension = string
            
            export namespace type_ {
                
                export type l_entry = __schema.namespaces.structure.types.Types.D
                
                export type l_id = string
            }
            
            export type type_ = {
                readonly 'l entry': type_.l_entry
                readonly 'l id': type_.l_id
            }
        }
        
        export type file = {
            readonly 'file extension': file.file_extension
            readonly 'type': file.type_
        }
        
        export type directory = __schema.types.Directory
    }
    
    export type Node = 
        | readonly ['file', Node.file]
        | readonly ['directory', Node.directory]
    
    export namespace Schema {
        
        export type structure = __schema.namespaces.structure.types.Structure
        
        export namespace resolver {
            
            export type declarations = __schema.namespaces.declarations.types.Declaration_Namespace
            
            export type implementations = __schema.namespaces.resolver.types.Resolver
        }
        
        export type resolver = {
            readonly 'declarations': resolver.declarations
            readonly 'implementations': resolver.implementations
        }
    }
    
    export type Schema = {
        readonly 'structure': Schema.structure
        readonly 'resolver': Schema.resolver
    }
    
    export namespace Type_Specification {
        
        export type schema = __schema.types.Schema
        
        export type directory = __schema.types.Directory
    }
    
    export type Type_Specification = {
        readonly 'schema': Type_Specification.schema
        readonly 'directory': Type_Specification.directory
    }
}
export namespace namespaces {
    export namespace structure {
        export namespace types {
            
            export namespace Regular_Expression {
                
                export type any_character = null
                
                export type literal = string
                
                export type character_set = string
                
                export namespace sequence {
                    
                    export type L = __schema.namespaces.structure.types.Regular_Expression
                }
                
                export type sequence = p_.List<
                    sequence.L
                >
                
                export namespace choice {
                    
                    export type L = __schema.namespaces.structure.types.Regular_Expression
                }
                
                export type choice = p_.List<
                    choice.L
                >
                
                export namespace repetition {
                    
                    export type expression = __schema.namespaces.structure.types.Regular_Expression
                    
                    export namespace quantity {
                        
                        export type optional = null
                        
                        export type zero_or_more = null
                        
                        export type one_or_more = null
                    }
                    
                    export type quantity = 
                        | readonly ['optional', quantity.optional]
                        | readonly ['zero or more', quantity.zero_or_more]
                        | readonly ['one or more', quantity.one_or_more]
                }
                
                export type repetition = {
                    readonly 'expression': repetition.expression
                    readonly 'quantity': repetition.quantity
                }
            }
            
            export type Regular_Expression = 
                | readonly ['any character', Regular_Expression.any_character]
                | readonly ['literal', Regular_Expression.literal]
                | readonly ['character set', Regular_Expression.character_set]
                | readonly ['sequence', Regular_Expression.sequence]
                | readonly ['choice', Regular_Expression.choice]
                | readonly ['repetition', Regular_Expression.repetition]
            
            export namespace Basic_Type {
                
                export namespace type_ {
                    
                    export type double_quoted = null
                    
                    export type undelimited = null
                }
                
                export type type_ = 
                    | readonly ['double quoted', type_.double_quoted]
                    | readonly ['undelimited', type_.undelimited]
                
                export namespace regular_expression {
                    
                    export type O = __schema.namespaces.structure.types.Regular_Expression
                }
                
                export type regular_expression = p_.Optional_Value<
                    regular_expression.O
                >
                
                export namespace hyperlink {
                    
                    export namespace O {
                        
                        export type prefix = string
                        
                        export type suffix = string
                    }
                    
                    export type O = {
                        readonly 'prefix': O.prefix
                        readonly 'suffix': O.suffix
                    }
                }
                
                export type hyperlink = p_.Optional_Value<
                    hyperlink.O
                >
            }
            
            export type Basic_Type = {
                readonly 'type': Basic_Type.type_
                readonly 'regular expression': Basic_Type.regular_expression
                readonly 'hyperlink': Basic_Type.hyperlink
            }
            
            export namespace Basic_Types {
                
                export type D = __schema.namespaces.structure.types.Basic_Type
            }
            
            export type Basic_Types = p_.Dictionary<
                Basic_Types.D
            >
            
            export namespace Dictionary {
                
                export type value = __schema.namespaces.structure.types.Value
            }
            
            export type Dictionary = {
                readonly 'value': Dictionary.value
            }
            
            export namespace Group {
                
                export namespace D {
                    
                    export namespace description {
                        
                        export type O = string
                    }
                    
                    export type description = p_.Optional_Value<
                        description.O
                    >
                    
                    export type value = __schema.namespaces.structure.types.Value
                }
                
                export type D = {
                    readonly 'description': D.description
                    readonly 'value': D.value
                }
            }
            
            export type Group = p_.Dictionary<
                Group.D
            >
            
            export namespace Namespaces {
                
                export type D = __schema.namespaces.structure.types.Structure
            }
            
            export type Namespaces = p_.Dictionary<
                Namespaces.D
            >
            
            export namespace Types {
                
                export type D = __schema.namespaces.structure.types.Type
            }
            
            export type Types = p_.Dictionary<
                Types.D
            >
            
            export namespace Type {
                
                export type root_value = __schema.namespaces.structure.types.Value
            }
            
            export type Type = {
                readonly 'root value': Type.root_value
            }
            
            export namespace Type_Reference {
                
                export namespace location {
                    
                    export namespace value {
                        
                        export namespace internal {
                            
                            export type l_entry = __schema.namespaces.structure.types.Types.D
                            
                            export type l_id = string
                        }
                        
                        export type internal = {
                            readonly 'l entry': internal.l_entry
                            readonly 'l id': internal.l_id
                        }
                        
                        export namespace child {
                            
                            export namespace namespace {
                                
                                export type l_entry = __schema.namespaces.structure.types.Namespaces.D
                                
                                export type l_id = string
                            }
                            
                            export type namespace = {
                                readonly 'l entry': namespace.l_entry
                                readonly 'l id': namespace.l_id
                            }
                            
                            export namespace type_ {
                                
                                export type l_entry = __schema.namespaces.structure.types.Types.D
                                
                                export type l_id = string
                            }
                            
                            export type type_ = {
                                readonly 'l entry': type_.l_entry
                                readonly 'l id': type_.l_id
                            }
                        }
                        
                        export type child = {
                            readonly 'namespace': child.namespace
                            readonly 'type': child.type_
                        }
                        
                        export namespace sibling {
                            
                            export namespace namespace {
                                
                                export type l_entry = __schema.namespaces.structure.types.Namespaces.D
                                
                                export type l_id = string
                            }
                            
                            export type namespace = {
                                readonly 'l entry': namespace.l_entry
                                readonly 'l id': namespace.l_id
                            }
                            
                            export namespace type_ {
                                
                                export type l_entry = __schema.namespaces.structure.types.Types.D
                                
                                export type l_id = string
                            }
                            
                            export type type_ = {
                                readonly 'l entry': type_.l_entry
                                readonly 'l id': type_.l_id
                            }
                        }
                        
                        export type sibling = {
                            readonly 'namespace': sibling.namespace
                            readonly 'type': sibling.type_
                        }
                    }
                    
                    export type value = 
                        | readonly ['internal', value.internal]
                        | readonly ['child', value.child]
                        | readonly ['sibling', value.sibling]
                    
                    export type result = __schema.namespaces.structure.types.Type
                }
                
                export type location = {
                    readonly 'value': location.value
                    readonly 'result': location.result
                }
            }
            
            export type Type_Reference = {
                readonly 'location': Type_Reference.location
            }
            
            export namespace Value {
                
                export namespace component {
                    
                    export namespace type_ {
                        
                        export namespace value {
                            
                            export namespace internal {
                                
                                export type l_entry = __schema.namespaces.structure.types.Types.D
                                
                                export type l_id = string
                            }
                            
                            export type internal = {
                                readonly 'l entry': internal.l_entry
                                readonly 'l id': internal.l_id
                            }
                            
                            export namespace child {
                                
                                export namespace namespace {
                                    
                                    export type l_entry = __schema.namespaces.structure.types.Namespaces.D
                                    
                                    export type l_id = string
                                }
                                
                                export type namespace = {
                                    readonly 'l entry': namespace.l_entry
                                    readonly 'l id': namespace.l_id
                                }
                                
                                export namespace type_ {
                                    
                                    export type l_entry = __schema.namespaces.structure.types.Types.D
                                    
                                    export type l_id = string
                                }
                                
                                export type type_ = {
                                    readonly 'l entry': type_.l_entry
                                    readonly 'l id': type_.l_id
                                }
                            }
                            
                            export type child = {
                                readonly 'namespace': child.namespace
                                readonly 'type': child.type_
                            }
                            
                            export namespace internal_cyclic {
                                
                                export type l_entry = p_.Circular_Dependency<
                                    __schema.namespaces.structure.types.Types.D
                                >
                                
                                export type l_id = string
                            }
                            
                            export type internal_cyclic = {
                                readonly 'l entry': internal_cyclic.l_entry
                                readonly 'l id': internal_cyclic.l_id
                            }
                        }
                        
                        export type value = 
                            | readonly ['internal', value.internal]
                            | readonly ['child', value.child]
                            | readonly ['internal cyclic', value.internal_cyclic]
                        
                        export type result = __schema.namespaces.structure.types.Type
                    }
                    
                    export type type_ = {
                        readonly 'value': type_.value
                        readonly 'result': type_.result
                    }
                    
                    export type constraints = __schema.namespaces.structure.types.Reference_Constraints
                }
                
                export type component = {
                    readonly 'type': component.type_
                    readonly 'constraints': component.constraints
                }
                
                export type dictionary = __schema.namespaces.structure.types.Dictionary
                
                export type group = __schema.namespaces.structure.types.Group
                
                export namespace list {
                    
                    export type value = __schema.namespaces.structure.types.Value
                    
                    export type result = __schema.namespaces.structure.types.Value_Result
                }
                
                export type list = {
                    readonly 'value': list.value
                    readonly 'result': list.result
                }
                
                export type nothing = null
                
                export namespace simple {
                    
                    export namespace constraints {
                        
                        export type basic_types = __schema.namespaces.structure.types.Basic_Types
                    }
                    
                    export type constraints = {
                        readonly 'basic types': constraints.basic_types
                    }
                    
                    export namespace value {
                        
                        export type l_entry = __schema.namespaces.structure.types.Basic_Types.D
                        
                        export type l_id = string
                    }
                    
                    export type value = {
                        readonly 'l entry': value.l_entry
                        readonly 'l id': value.l_id
                    }
                }
                
                export type simple = {
                    readonly 'constraints': simple.constraints
                    readonly 'value': simple.value
                }
                
                export namespace optional {
                    
                    export type constraints = __schema.namespaces.structure.types.Option_Constraints
                    
                    export type value = __schema.namespaces.structure.types.Value
                    
                    export type result = __schema.namespaces.structure.types.Value_Result
                }
                
                export type optional = {
                    readonly 'constraints': optional.constraints
                    readonly 'value': optional.value
                    readonly 'result': optional.result
                }
                
                export type reference = __schema.namespaces.structure.types.Reference
                
                export namespace state {
                    
                    export namespace options {
                        
                        export namespace D {
                            
                            export namespace description {
                                
                                export type O = string
                            }
                            
                            export type description = p_.Optional_Value<
                                description.O
                            >
                            
                            export type constraints = __schema.namespaces.structure.types.Option_Constraints
                            
                            export type value = __schema.namespaces.structure.types.Value
                        }
                        
                        export type D = {
                            readonly 'description': D.description
                            readonly 'constraints': D.constraints
                            readonly 'value': D.value
                        }
                    }
                    
                    export type options = p_.Dictionary<
                        options.D
                    >
                    
                    export type result = __schema.namespaces.structure.types.Value_Result
                }
                
                export type state = {
                    readonly 'options': state.options
                    readonly 'result': state.result
                }
            }
            
            export type Value = 
                | readonly ['component', Value.component]
                | readonly ['dictionary', Value.dictionary]
                | readonly ['group', Value.group]
                | readonly ['list', Value.list]
                | readonly ['nothing', Value.nothing]
                | readonly ['simple', Value.simple]
                | readonly ['optional', Value.optional]
                | readonly ['reference', Value.reference]
                | readonly ['state', Value.state]
            
            export namespace Value_Subselection {
                
                export namespace tail {
                    
                    export namespace value {
                        
                        export namespace L {
                            
                            export namespace value {
                                
                                export namespace value {
                                    
                                    export namespace dictionary {
                                        
                                        export namespace constraints {
                                            
                                            export type definition = __schema.namespaces.structure.types.Value.dictionary
                                        }
                                        
                                        export type constraints = {
                                            readonly 'definition': constraints.definition
                                        }
                                        
                                        export type value = null
                                    }
                                    
                                    export type dictionary = {
                                        readonly 'constraints': dictionary.constraints
                                        readonly 'value': dictionary.value
                                    }
                                    
                                    export namespace group {
                                        
                                        export namespace constraints {
                                            
                                            export type definition = __schema.namespaces.structure.types.Value.group
                                        }
                                        
                                        export type constraints = {
                                            readonly 'definition': constraints.definition
                                        }
                                        
                                        export namespace value {
                                            
                                            export type l_entry = __schema.namespaces.structure.types.Group.D
                                            
                                            export type l_id = string
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': value.l_entry
                                            readonly 'l id': value.l_id
                                        }
                                    }
                                    
                                    export type group = {
                                        readonly 'constraints': group.constraints
                                        readonly 'value': group.value
                                    }
                                    
                                    export namespace list {
                                        
                                        export namespace constraints {
                                            
                                            export type definition = __schema.namespaces.structure.types.Value.list
                                        }
                                        
                                        export type constraints = {
                                            readonly 'definition': constraints.definition
                                        }
                                        
                                        export type value = null
                                    }
                                    
                                    export type list = {
                                        readonly 'constraints': list.constraints
                                        readonly 'value': list.value
                                    }
                                    
                                    export namespace optional {
                                        
                                        export namespace constraints {
                                            
                                            export type definition = __schema.namespaces.structure.types.Value.optional
                                        }
                                        
                                        export type constraints = {
                                            readonly 'definition': constraints.definition
                                        }
                                        
                                        export type value = null
                                    }
                                    
                                    export type optional = {
                                        readonly 'constraints': optional.constraints
                                        readonly 'value': optional.value
                                    }
                                    
                                    export namespace state {
                                        
                                        export namespace constraints {
                                            
                                            export type definition = __schema.namespaces.structure.types.Value.state
                                        }
                                        
                                        export type constraints = {
                                            readonly 'definition': constraints.definition
                                        }
                                        
                                        export namespace value {
                                            
                                            export type l_entry = __schema.namespaces.structure.types.Value.state.options.D
                                            
                                            export type l_id = string
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': value.l_entry
                                            readonly 'l id': value.l_id
                                        }
                                    }
                                    
                                    export type state = {
                                        readonly 'constraints': state.constraints
                                        readonly 'value': state.value
                                    }
                                }
                                
                                export type value = 
                                    | readonly ['dictionary', value.dictionary]
                                    | readonly ['group', value.group]
                                    | readonly ['list', value.list]
                                    | readonly ['optional', value.optional]
                                    | readonly ['state', value.state]
                                
                                export type result = __schema.namespaces.structure.types.Value
                            }
                            
                            export type value = {
                                readonly 'value': value.value
                                readonly 'result': value.result
                            }
                            
                            export type result = __schema.namespaces.structure.types.Value
                        }
                        
                        export type L = {
                            readonly 'value': L.value
                            readonly 'result': L.result
                        }
                    }
                    
                    export type value = p_.List<
                        value.L
                    >
                    
                    export type result = __schema.namespaces.structure.types.Value
                }
                
                export type tail = {
                    readonly 'value': tail.value
                    readonly 'result': tail.result
                }
            }
            
            export type Value_Subselection = {
                readonly 'tail': Value_Subselection.tail
            }
            
            export namespace Value_Reference {
                
                export type type_ = __schema.namespaces.structure.types.Type_Reference
                
                export type path = __schema.namespaces.structure.types.Value_Subselection
            }
            
            export type Value_Reference = {
                readonly 'type': Value_Reference.type_
                readonly 'path': Value_Reference.path
            }
            
            export namespace Option_Constraints {
                
                export namespace O {
                    
                    export type D = __schema.namespaces.structure.types.Value_Reference
                }
                
                export type O = p_.Dictionary<
                    O.D
                >
            }
            
            export type Option_Constraints = p_.Optional_Value<
                Option_Constraints.O
            >
            
            export namespace Reference {
                
                export namespace referent {
                    
                    export namespace constraints {
                        
                        export type dictionary = __schema.namespaces.structure.types.Value.dictionary
                    }
                    
                    export type constraints = {
                        readonly 'dictionary': constraints.dictionary
                    }
                    
                    export type value = __schema.namespaces.structure.types.Value_Reference
                }
                
                export type referent = {
                    readonly 'constraints': referent.constraints
                    readonly 'value': referent.value
                }
                
                export namespace type_ {
                    
                    export namespace dependency {
                        
                        export type acyclic = null
                        
                        export type cyclic = null
                    }
                    
                    export type dependency = 
                        | readonly ['acyclic', dependency.acyclic]
                        | readonly ['cyclic', dependency.cyclic]
                    
                    export type constraints = __schema.namespaces.structure.types.Reference_Constraints
                }
                
                export type type_ = {
                    readonly 'dependency': type_.dependency
                    readonly 'constraints': type_.constraints
                }
            }
            
            export type Reference = {
                readonly 'referent': Reference.referent
                readonly 'type': Reference.type_
            }
            
            export namespace Reference_Constraints {
                
                export namespace O {
                    
                    export type D = __schema.namespaces.structure.types.Value_Reference
                }
                
                export type O = p_.Dictionary<
                    O.D
                >
            }
            
            export type Reference_Constraints = p_.Optional_Value<
                Reference_Constraints.O
            >
            
            export namespace Structure {
                
                export type namespaces = __schema.namespaces.structure.types.Namespaces
                
                export type basic_types = __schema.namespaces.structure.types.Basic_Types
                
                export type types = __schema.namespaces.structure.types.Types
            }
            
            export type Structure = {
                readonly 'namespaces': Structure.namespaces
                readonly 'basic types': Structure.basic_types
                readonly 'types': Structure.types
            }
            
            export namespace Value_Result {
                
                export type O = __schema.namespaces.structure.types.Value_Reference
            }
            
            export type Value_Result = p_.Optional_Value<
                Value_Result.O
            >
        }
        export namespace namespaces {}
    }
    export namespace declarations {
        export namespace types {
            
            export namespace Presence {
                
                export type optional = null
                
                export type required = null
            }
            
            export type Presence = 
                | readonly ['optional', Presence.optional]
                | readonly ['required', Presence.required]
            
            export namespace Signature_Type_Reference {
                
                export namespace location {
                    
                    export namespace value {
                        
                        export namespace internal {
                            
                            export type l_entry = __schema.namespaces.structure.types.Types.D
                            
                            export type l_id = string
                        }
                        
                        export type internal = {
                            readonly 'l entry': internal.l_entry
                            readonly 'l id': internal.l_id
                        }
                        
                        export namespace child {
                            
                            export namespace namespace {
                                
                                export type l_entry = __schema.namespaces.structure.types.Namespaces.D
                                
                                export type l_id = string
                            }
                            
                            export type namespace = {
                                readonly 'l entry': namespace.l_entry
                                readonly 'l id': namespace.l_id
                            }
                            
                            export namespace type_ {
                                
                                export type l_entry = __schema.namespaces.structure.types.Types.D
                                
                                export type l_id = string
                            }
                            
                            export type type_ = {
                                readonly 'l entry': type_.l_entry
                                readonly 'l id': type_.l_id
                            }
                        }
                        
                        export type child = {
                            readonly 'namespace': child.namespace
                            readonly 'type': child.type_
                        }
                        
                        export namespace sibling {
                            
                            export namespace namespace {
                                
                                export type l_entry = __schema.namespaces.structure.types.Namespaces.D
                                
                                export type l_id = string
                            }
                            
                            export type namespace = {
                                readonly 'l entry': namespace.l_entry
                                readonly 'l id': namespace.l_id
                            }
                            
                            export namespace type_ {
                                
                                export type l_entry = __schema.namespaces.structure.types.Types.D
                                
                                export type l_id = string
                            }
                            
                            export type type_ = {
                                readonly 'l entry': type_.l_entry
                                readonly 'l id': type_.l_id
                            }
                        }
                        
                        export type sibling = {
                            readonly 'namespace': sibling.namespace
                            readonly 'type': sibling.type_
                        }
                    }
                    
                    export type value = 
                        | readonly ['internal', value.internal]
                        | readonly ['child', value.child]
                        | readonly ['sibling', value.sibling]
                    
                    export type result = __schema.namespaces.structure.types.Type
                }
                
                export type location = {
                    readonly 'value': location.value
                    readonly 'result': location.result
                }
            }
            
            export type Signature_Type_Reference = {
                readonly 'location': Signature_Type_Reference.location
            }
            
            export namespace Signature_Value_Subselection {
                
                export namespace tail {
                    
                    export namespace value {
                        
                        export namespace L {
                            
                            export namespace value {
                                
                                export namespace value {
                                    
                                    export namespace dictionary {
                                        
                                        export namespace constraints {
                                            
                                            export type definition = __schema.namespaces.structure.types.Value.dictionary
                                        }
                                        
                                        export type constraints = {
                                            readonly 'definition': constraints.definition
                                        }
                                        
                                        export type value = null
                                    }
                                    
                                    export type dictionary = {
                                        readonly 'constraints': dictionary.constraints
                                        readonly 'value': dictionary.value
                                    }
                                    
                                    export namespace group {
                                        
                                        export namespace constraints {
                                            
                                            export type definition = __schema.namespaces.structure.types.Value.group
                                        }
                                        
                                        export type constraints = {
                                            readonly 'definition': constraints.definition
                                        }
                                        
                                        export namespace value {
                                            
                                            export type l_entry = __schema.namespaces.structure.types.Group.D
                                            
                                            export type l_id = string
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': value.l_entry
                                            readonly 'l id': value.l_id
                                        }
                                    }
                                    
                                    export type group = {
                                        readonly 'constraints': group.constraints
                                        readonly 'value': group.value
                                    }
                                    
                                    export namespace list {
                                        
                                        export namespace constraints {
                                            
                                            export type definition = __schema.namespaces.structure.types.Value.list
                                        }
                                        
                                        export type constraints = {
                                            readonly 'definition': constraints.definition
                                        }
                                        
                                        export type value = null
                                    }
                                    
                                    export type list = {
                                        readonly 'constraints': list.constraints
                                        readonly 'value': list.value
                                    }
                                    
                                    export namespace optional {
                                        
                                        export namespace constraints {
                                            
                                            export type definition = __schema.namespaces.structure.types.Value.optional
                                        }
                                        
                                        export type constraints = {
                                            readonly 'definition': constraints.definition
                                        }
                                        
                                        export type value = null
                                    }
                                    
                                    export type optional = {
                                        readonly 'constraints': optional.constraints
                                        readonly 'value': optional.value
                                    }
                                    
                                    export namespace state {
                                        
                                        export namespace constraints {
                                            
                                            export type definition = __schema.namespaces.structure.types.Value.state
                                        }
                                        
                                        export type constraints = {
                                            readonly 'definition': constraints.definition
                                        }
                                        
                                        export namespace value {
                                            
                                            export type l_entry = __schema.namespaces.structure.types.Value.state.options.D
                                            
                                            export type l_id = string
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': value.l_entry
                                            readonly 'l id': value.l_id
                                        }
                                    }
                                    
                                    export type state = {
                                        readonly 'constraints': state.constraints
                                        readonly 'value': state.value
                                    }
                                }
                                
                                export type value = 
                                    | readonly ['dictionary', value.dictionary]
                                    | readonly ['group', value.group]
                                    | readonly ['list', value.list]
                                    | readonly ['optional', value.optional]
                                    | readonly ['state', value.state]
                                
                                export type result = __schema.namespaces.structure.types.Value
                            }
                            
                            export type value = {
                                readonly 'value': value.value
                                readonly 'result': value.result
                            }
                            
                            export type result = __schema.namespaces.structure.types.Value
                        }
                        
                        export type L = {
                            readonly 'value': L.value
                            readonly 'result': L.result
                        }
                    }
                    
                    export type value = p_.List<
                        value.L
                    >
                    
                    export type result = __schema.namespaces.structure.types.Value
                }
                
                export type tail = {
                    readonly 'value': tail.value
                    readonly 'result': tail.result
                }
            }
            
            export type Signature_Value_Subselection = {
                readonly 'tail': Signature_Value_Subselection.tail
            }
            
            export namespace Signature_Value_Reference {
                
                export type type_ = __schema.namespaces.declarations.types.Signature_Type_Reference
                
                export type subselection = __schema.namespaces.declarations.types.Signature_Value_Subselection
            }
            
            export type Signature_Value_Reference = {
                readonly 'type': Signature_Value_Reference.type_
                readonly 'subselection': Signature_Value_Reference.subselection
            }
            
            export namespace Signature {
                
                export namespace values {
                    
                    export namespace D {
                        
                        export type value = __schema.namespaces.declarations.types.Signature_Value_Reference
                        
                        export type presence = __schema.namespaces.declarations.types.Presence
                    }
                    
                    export type D = {
                        readonly 'value': D.value
                        readonly 'presence': D.presence
                    }
                }
                
                export type values = p_.Dictionary<
                    values.D
                >
                
                export namespace lookups {
                    
                    export namespace D {
                        
                        export namespace referent {
                            
                            export namespace constraints {
                                
                                export type dictionary = __schema.namespaces.structure.types.Value.dictionary
                            }
                            
                            export type constraints = {
                                readonly 'dictionary': constraints.dictionary
                            }
                            
                            export type value = __schema.namespaces.declarations.types.Signature_Value_Reference
                        }
                        
                        export type referent = {
                            readonly 'constraints': referent.constraints
                            readonly 'value': referent.value
                        }
                        
                        export namespace type_ {
                            
                            export type cyclic = null
                            
                            export type acyclic = null
                        }
                        
                        export type type_ = 
                            | readonly ['cyclic', type_.cyclic]
                            | readonly ['acyclic', type_.acyclic]
                        
                        export type presence = __schema.namespaces.declarations.types.Presence
                    }
                    
                    export type D = {
                        readonly 'referent': D.referent
                        readonly 'type': D.type_
                        readonly 'presence': D.presence
                    }
                }
                
                export type lookups = p_.Dictionary<
                    lookups.D
                >
            }
            
            export type Signature = {
                readonly 'values': Signature.values
                readonly 'lookups': Signature.lookups
            }
            
            export namespace Declarations {
                
                export namespace D {
                    
                    export type benchmark = __schema.namespaces.structure.types.Types.D
                    
                    export type value = __schema.namespaces.declarations.types.Declaration
                }
                
                export type D = {
                    readonly 'benchmark': D.benchmark
                    readonly 'value': D.value
                }
            }
            
            export type Declarations = p_.Dictionary<
                Declarations.D
            >
            
            export namespace Declaration {
                
                export namespace signature {
                    
                    export namespace value {
                        
                        export type local = __schema.namespaces.declarations.types.Signature
                        
                        export namespace same_as {
                            
                            export type l_entry = __schema.namespaces.declarations.types.Declarations.D
                            
                            export type l_id = string
                        }
                        
                        export type same_as = {
                            readonly 'l entry': same_as.l_entry
                            readonly 'l id': same_as.l_id
                        }
                    }
                    
                    export type value = 
                        | readonly ['local', value.local]
                        | readonly ['same as', value.same_as]
                    
                    export type result = __schema.namespaces.declarations.types.Signature
                }
                
                export type signature = {
                    readonly 'value': signature.value
                    readonly 'result': signature.result
                }
            }
            
            export type Declaration = {
                readonly 'signature': Declaration.signature
            }
            
            export namespace Namespaces {
                
                export namespace D {
                    
                    export type benchmark = __schema.namespaces.structure.types.Namespaces.D
                    
                    export type value = __schema.namespaces.declarations.types.Declaration_Namespace
                }
                
                export type D = {
                    readonly 'benchmark': D.benchmark
                    readonly 'value': D.value
                }
            }
            
            export type Namespaces = p_.Dictionary<
                Namespaces.D
            >
            
            export namespace Declaration_Namespace {
                
                export type namespaces = __schema.namespaces.declarations.types.Namespaces
                
                export type types = __schema.namespaces.declarations.types.Declarations
            }
            
            export type Declaration_Namespace = {
                readonly 'namespaces': Declaration_Namespace.namespaces
                readonly 'types': Declaration_Namespace.types
            }
        }
        export namespace namespaces {}
    }
    export namespace resolver {
        export namespace types {
            
            export namespace Absence_Constraints {
                
                export namespace O {
                    
                    export type D = __schema.namespaces.resolver.types.Possible_Value_Selection
                }
                
                export type O = p_.Dictionary<
                    O.D
                >
            }
            
            export type Absence_Constraints = p_.Optional_Value<
                Absence_Constraints.O
            >
            
            export namespace Type_Reference {
                
                export namespace location {
                    
                    export namespace value {
                        
                        export namespace internal {
                            
                            export type l_entry = __schema.namespaces.structure.types.Types.D
                            
                            export type l_id = string
                        }
                        
                        export type internal = {
                            readonly 'l entry': internal.l_entry
                            readonly 'l id': internal.l_id
                        }
                        
                        export namespace child {
                            
                            export namespace namespace {
                                
                                export type l_entry = __schema.namespaces.structure.types.Namespaces.D
                                
                                export type l_id = string
                            }
                            
                            export type namespace = {
                                readonly 'l entry': namespace.l_entry
                                readonly 'l id': namespace.l_id
                            }
                            
                            export namespace type_ {
                                
                                export type l_entry = __schema.namespaces.structure.types.Types.D
                                
                                export type l_id = string
                            }
                            
                            export type type_ = {
                                readonly 'l entry': type_.l_entry
                                readonly 'l id': type_.l_id
                            }
                        }
                        
                        export type child = {
                            readonly 'namespace': child.namespace
                            readonly 'type': child.type_
                        }
                        
                        export namespace sibling {
                            
                            export namespace namespace {
                                
                                export type l_entry = __schema.namespaces.structure.types.Namespaces.D
                                
                                export type l_id = string
                            }
                            
                            export type namespace = {
                                readonly 'l entry': namespace.l_entry
                                readonly 'l id': namespace.l_id
                            }
                            
                            export namespace type_ {
                                
                                export type l_entry = __schema.namespaces.structure.types.Types.D
                                
                                export type l_id = string
                            }
                            
                            export type type_ = {
                                readonly 'l entry': type_.l_entry
                                readonly 'l id': type_.l_id
                            }
                        }
                        
                        export type sibling = {
                            readonly 'namespace': sibling.namespace
                            readonly 'type': sibling.type_
                        }
                    }
                    
                    export type value = 
                        | readonly ['internal', value.internal]
                        | readonly ['child', value.child]
                        | readonly ['sibling', value.sibling]
                    
                    export type result = __schema.namespaces.structure.types.Type
                }
                
                export type location = {
                    readonly 'value': location.value
                    readonly 'result': location.result
                }
            }
            
            export type Type_Reference = {
                readonly 'location': Type_Reference.location
            }
            
            export namespace Value_Subselection {
                
                export namespace tail {
                    
                    export namespace value {
                        
                        export namespace L {
                            
                            export namespace value {
                                
                                export namespace value {
                                    
                                    export namespace dictionary {
                                        
                                        export namespace constraints {
                                            
                                            export type definition = __schema.namespaces.structure.types.Value.dictionary
                                        }
                                        
                                        export type constraints = {
                                            readonly 'definition': constraints.definition
                                        }
                                        
                                        export type value = null
                                    }
                                    
                                    export type dictionary = {
                                        readonly 'constraints': dictionary.constraints
                                        readonly 'value': dictionary.value
                                    }
                                    
                                    export namespace group {
                                        
                                        export namespace constraints {
                                            
                                            export type definition = __schema.namespaces.structure.types.Value.group
                                        }
                                        
                                        export type constraints = {
                                            readonly 'definition': constraints.definition
                                        }
                                        
                                        export namespace value {
                                            
                                            export type l_entry = __schema.namespaces.structure.types.Group.D
                                            
                                            export type l_id = string
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': value.l_entry
                                            readonly 'l id': value.l_id
                                        }
                                    }
                                    
                                    export type group = {
                                        readonly 'constraints': group.constraints
                                        readonly 'value': group.value
                                    }
                                    
                                    export namespace list {
                                        
                                        export namespace constraints {
                                            
                                            export type definition = __schema.namespaces.structure.types.Value.list
                                        }
                                        
                                        export type constraints = {
                                            readonly 'definition': constraints.definition
                                        }
                                        
                                        export type value = null
                                    }
                                    
                                    export type list = {
                                        readonly 'constraints': list.constraints
                                        readonly 'value': list.value
                                    }
                                    
                                    export namespace optional {
                                        
                                        export namespace constraints {
                                            
                                            export type definition = __schema.namespaces.structure.types.Value.optional
                                        }
                                        
                                        export type constraints = {
                                            readonly 'definition': constraints.definition
                                        }
                                        
                                        export type value = null
                                    }
                                    
                                    export type optional = {
                                        readonly 'constraints': optional.constraints
                                        readonly 'value': optional.value
                                    }
                                    
                                    export namespace state {
                                        
                                        export namespace constraints {
                                            
                                            export type definition = __schema.namespaces.structure.types.Value.state
                                        }
                                        
                                        export type constraints = {
                                            readonly 'definition': constraints.definition
                                        }
                                        
                                        export namespace value {
                                            
                                            export type l_entry = __schema.namespaces.structure.types.Value.state.options.D
                                            
                                            export type l_id = string
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': value.l_entry
                                            readonly 'l id': value.l_id
                                        }
                                    }
                                    
                                    export type state = {
                                        readonly 'constraints': state.constraints
                                        readonly 'value': state.value
                                    }
                                }
                                
                                export type value = 
                                    | readonly ['dictionary', value.dictionary]
                                    | readonly ['group', value.group]
                                    | readonly ['list', value.list]
                                    | readonly ['optional', value.optional]
                                    | readonly ['state', value.state]
                                
                                export type result = __schema.namespaces.structure.types.Value
                            }
                            
                            export type value = {
                                readonly 'value': value.value
                                readonly 'result': value.result
                            }
                            
                            export type result = __schema.namespaces.structure.types.Value
                        }
                        
                        export type L = {
                            readonly 'value': L.value
                            readonly 'result': L.result
                        }
                    }
                    
                    export type value = p_.List<
                        value.L
                    >
                    
                    export type result = __schema.namespaces.structure.types.Value
                }
                
                export type tail = {
                    readonly 'value': tail.value
                    readonly 'result': tail.result
                }
            }
            
            export type Value_Subselection = {
                readonly 'tail': Value_Subselection.tail
            }
            
            export namespace Value_Reference {
                
                export type type_ = __schema.namespaces.resolver.types.Type_Reference
                
                export type path = __schema.namespaces.resolver.types.Value_Subselection
            }
            
            export type Value_Reference = {
                readonly 'type': Value_Reference.type_
                readonly 'path': Value_Reference.path
            }
            
            export namespace Relative_Value_Selection {
                
                export namespace path {
                    
                    export namespace value {
                        
                        export namespace L {
                            
                            export namespace value {
                                
                                export namespace value {
                                    
                                    export type benchmark_link = __schema.namespaces.resolver.types.Value_Reference
                                    
                                    export namespace component_constraint {
                                        
                                        export namespace constraints {
                                            
                                            export type definition = __schema.namespaces.structure.types.Value.component
                                        }
                                        
                                        export type constraints = {
                                            readonly 'definition': constraints.definition
                                        }
                                        
                                        export namespace value {
                                            
                                            export type name = string
                                            
                                            export type target = __schema.namespaces.resolver.types.Value_Reference
                                        }
                                        
                                        export type value = {
                                            readonly 'name': value.name
                                            readonly 'target': value.target
                                        }
                                    }
                                    
                                    export type component_constraint = {
                                        readonly 'constraints': component_constraint.constraints
                                        readonly 'value': component_constraint.value
                                    }
                                    
                                    export namespace component {
                                        
                                        export namespace constraints {
                                            
                                            export type definition = __schema.namespaces.structure.types.Value.component
                                        }
                                        
                                        export type constraints = {
                                            readonly 'definition': constraints.definition
                                        }
                                        
                                        export type value = null
                                    }
                                    
                                    export type component = {
                                        readonly 'constraints': component.constraints
                                        readonly 'value': component.value
                                    }
                                    
                                    export namespace group {
                                        
                                        export namespace constraints {
                                            
                                            export type definition = __schema.namespaces.structure.types.Value.group
                                        }
                                        
                                        export type constraints = {
                                            readonly 'definition': constraints.definition
                                        }
                                        
                                        export namespace value {
                                            
                                            export type l_entry = __schema.namespaces.structure.types.Group.D
                                            
                                            export type l_id = string
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': value.l_entry
                                            readonly 'l id': value.l_id
                                        }
                                    }
                                    
                                    export type group = {
                                        readonly 'constraints': group.constraints
                                        readonly 'value': group.value
                                    }
                                    
                                    export namespace list_result {
                                        
                                        export namespace constraints {
                                            
                                            export type definition = __schema.namespaces.structure.types.Value.list
                                        }
                                        
                                        export type constraints = {
                                            readonly 'definition': constraints.definition
                                        }
                                        
                                        export type value = null
                                    }
                                    
                                    export type list_result = {
                                        readonly 'constraints': list_result.constraints
                                        readonly 'value': list_result.value
                                    }
                                    
                                    export namespace option_constraint {
                                        
                                        export namespace constraints {
                                            
                                            export type definition = __schema.namespaces.structure.types.Value.state
                                        }
                                        
                                        export type constraints = {
                                            readonly 'definition': constraints.definition
                                        }
                                        
                                        export namespace value {
                                            
                                            export namespace option {
                                                
                                                export type l_entry = __schema.namespaces.structure.types.Value.state.options.D
                                                
                                                export type l_id = string
                                            }
                                            
                                            export type option = {
                                                readonly 'l entry': option.l_entry
                                                readonly 'l id': option.l_id
                                            }
                                            
                                            export namespace constraint {
                                                
                                                export type l_entry = __schema.namespaces.structure.types.Option_Constraints.O.D
                                                
                                                export type l_id = string
                                            }
                                            
                                            export type constraint = {
                                                readonly 'l entry': constraint.l_entry
                                                readonly 'l id': constraint.l_id
                                            }
                                        }
                                        
                                        export type value = {
                                            readonly 'option': value.option
                                            readonly 'constraint': value.constraint
                                        }
                                    }
                                    
                                    export type option_constraint = {
                                        readonly 'constraints': option_constraint.constraints
                                        readonly 'value': option_constraint.value
                                    }
                                    
                                    export namespace optional {
                                        
                                        export namespace constraints {
                                            
                                            export type definition = __schema.namespaces.structure.types.Value.optional
                                        }
                                        
                                        export type constraints = {
                                            readonly 'definition': constraints.definition
                                        }
                                        
                                        export type value = null
                                    }
                                    
                                    export type optional = {
                                        readonly 'constraints': optional.constraints
                                        readonly 'value': optional.value
                                    }
                                    
                                    export namespace optional_value_constraint {
                                        
                                        export namespace constraints {
                                            
                                            export type definition = __schema.namespaces.structure.types.Value.optional
                                        }
                                        
                                        export type constraints = {
                                            readonly 'definition': constraints.definition
                                        }
                                        
                                        export namespace value {
                                            
                                            export type l_entry = __schema.namespaces.structure.types.Option_Constraints.O.D
                                            
                                            export type l_id = string
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': value.l_entry
                                            readonly 'l id': value.l_id
                                        }
                                    }
                                    
                                    export type optional_value_constraint = {
                                        readonly 'constraints': optional_value_constraint.constraints
                                        readonly 'value': optional_value_constraint.value
                                    }
                                    
                                    export namespace reference_constraint {
                                        
                                        export namespace constraints {
                                            
                                            export type definition = __schema.namespaces.structure.types.Value.reference
                                        }
                                        
                                        export type constraints = {
                                            readonly 'definition': constraints.definition
                                        }
                                        
                                        export namespace value {
                                            
                                            export type l_entry = __schema.namespaces.structure.types.Reference_Constraints.O.D
                                            
                                            export type l_id = string
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': value.l_entry
                                            readonly 'l id': value.l_id
                                        }
                                    }
                                    
                                    export type reference_constraint = {
                                        readonly 'constraints': reference_constraint.constraints
                                        readonly 'value': reference_constraint.value
                                    }
                                    
                                    export namespace reference {
                                        
                                        export namespace constraints {
                                            
                                            export type definition = __schema.namespaces.structure.types.Value.reference
                                        }
                                        
                                        export type constraints = {
                                            readonly 'definition': constraints.definition
                                        }
                                        
                                        export namespace value {}
                                        
                                        export type value = {}
                                    }
                                    
                                    export type reference = {
                                        readonly 'constraints': reference.constraints
                                        readonly 'value': reference.value
                                    }
                                    
                                    export namespace state_result {
                                        
                                        export namespace constraints {
                                            
                                            export type definition = __schema.namespaces.structure.types.Value.state
                                        }
                                        
                                        export type constraints = {
                                            readonly 'definition': constraints.definition
                                        }
                                        
                                        export type value = null
                                    }
                                    
                                    export type state_result = {
                                        readonly 'constraints': state_result.constraints
                                        readonly 'value': state_result.value
                                    }
                                }
                                
                                export type value = 
                                    | readonly ['benchmark link', value.benchmark_link]
                                    | readonly ['component constraint', value.component_constraint]
                                    | readonly ['component', value.component]
                                    | readonly ['group', value.group]
                                    | readonly ['list result', value.list_result]
                                    | readonly ['option constraint', value.option_constraint]
                                    | readonly ['optional', value.optional]
                                    | readonly ['optional value constraint', value.optional_value_constraint]
                                    | readonly ['reference constraint', value.reference_constraint]
                                    | readonly ['reference', value.reference]
                                    | readonly ['state result', value.state_result]
                                
                                export type result = __schema.namespaces.structure.types.Value
                            }
                            
                            export type value = {
                                readonly 'value': value.value
                                readonly 'result': value.result
                            }
                            
                            export type result = __schema.namespaces.structure.types.Value
                        }
                        
                        export type L = {
                            readonly 'value': L.value
                            readonly 'result': L.result
                        }
                    }
                    
                    export type value = p_.List<
                        value.L
                    >
                    
                    export type result = __schema.namespaces.structure.types.Value
                }
                
                export type path = {
                    readonly 'value': path.value
                    readonly 'result': path.result
                }
            }
            
            export type Relative_Value_Selection = {
                readonly 'path': Relative_Value_Selection.path
            }
            
            export namespace Guaranteed_Value_Selection {
                
                export namespace start {
                    
                    export namespace value {
                        
                        export namespace optional_fallback {
                            
                            export type selection = __schema.namespaces.resolver.types.Possible_Value_Selection
                            
                            export type fallback = __schema.namespaces.resolver.types.Guaranteed_Value_Selection
                        }
                        
                        export type optional_fallback = {
                            readonly 'selection': optional_fallback.selection
                            readonly 'fallback': optional_fallback.fallback
                        }
                        
                        export namespace sibling {
                            
                            export type l_entry = __schema.namespaces.structure.types.Group.D
                            
                            export type l_id = string
                        }
                        
                        export type sibling = {
                            readonly 'l entry': sibling.l_entry
                            readonly 'l id': sibling.l_id
                        }
                        
                        export namespace parent_sibling {
                            
                            export type l_entry = __schema.namespaces.structure.types.Group.D
                            
                            export type l_id = string
                        }
                        
                        export type parent_sibling = {
                            readonly 'l entry': parent_sibling.l_entry
                            readonly 'l id': parent_sibling.l_id
                        }
                        
                        export namespace option_constraint {
                            
                            export namespace constraints {
                                
                                export type oc = __schema.namespaces.structure.types.Option_Constraints
                            }
                            
                            export type constraints = {
                                readonly 'oc': constraints.oc
                            }
                            
                            export namespace value {
                                
                                export type l_entry = __schema.namespaces.structure.types.Option_Constraints.O.D
                                
                                export type l_id = string
                            }
                            
                            export type value = {
                                readonly 'l entry': value.l_entry
                                readonly 'l id': value.l_id
                            }
                        }
                        
                        export type option_constraint = {
                            readonly 'constraints': option_constraint.constraints
                            readonly 'value': option_constraint.value
                        }
                        
                        export namespace list_cursor {
                            
                            export namespace constraints {
                                
                                export type result = __schema.namespaces.structure.types.Value_Result.O
                            }
                            
                            export type constraints = {
                                readonly 'result': constraints.result
                            }
                            
                            export type value = null
                        }
                        
                        export type list_cursor = {
                            readonly 'constraints': list_cursor.constraints
                            readonly 'value': list_cursor.value
                        }
                        
                        export namespace linked_entry {
                            
                            export namespace constraints {
                                
                                export type entry = __schema.namespaces.structure.types.Value
                            }
                            
                            export type constraints = {
                                readonly 'entry': constraints.entry
                            }
                            
                            export type value = null
                        }
                        
                        export type linked_entry = {
                            readonly 'constraints': linked_entry.constraints
                            readonly 'value': linked_entry.value
                        }
                        
                        export namespace constraint {
                            
                            export namespace value {
                                
                                export namespace component {
                                    
                                    export namespace property {
                                        
                                        export namespace constraints {
                                            
                                            export type component = __schema.namespaces.structure.types.Value.component
                                        }
                                        
                                        export type constraints = {
                                            readonly 'component': constraints.component
                                        }
                                        
                                        export namespace value {
                                            
                                            export type l_entry = __schema.namespaces.structure.types.Group.D
                                            
                                            export type l_id = string
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': value.l_entry
                                            readonly 'l id': value.l_id
                                        }
                                    }
                                    
                                    export type property = {
                                        readonly 'constraints': property.constraints
                                        readonly 'value': property.value
                                    }
                                    
                                    export namespace constraint {
                                        
                                        export type l_entry = __schema.namespaces.structure.types.Reference_Constraints.O.D
                                        
                                        export type l_id = string
                                    }
                                    
                                    export type constraint = {
                                        readonly 'l entry': constraint.l_entry
                                        readonly 'l id': constraint.l_id
                                    }
                                }
                                
                                export type component = {
                                    readonly 'property': component.property
                                    readonly 'constraint': component.constraint
                                }
                                
                                export namespace reference {
                                    
                                    export namespace property {
                                        
                                        export namespace constraints {
                                            
                                            export type reference = __schema.namespaces.structure.types.Value.reference
                                        }
                                        
                                        export type constraints = {
                                            readonly 'reference': constraints.reference
                                        }
                                        
                                        export namespace value {
                                            
                                            export type l_entry = __schema.namespaces.structure.types.Group.D
                                            
                                            export type l_id = string
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': value.l_entry
                                            readonly 'l id': value.l_id
                                        }
                                    }
                                    
                                    export type property = {
                                        readonly 'constraints': property.constraints
                                        readonly 'value': property.value
                                    }
                                    
                                    export namespace constraint {
                                        
                                        export type l_entry = __schema.namespaces.structure.types.Reference_Constraints.O.D
                                        
                                        export type l_id = string
                                    }
                                    
                                    export type constraint = {
                                        readonly 'l entry': constraint.l_entry
                                        readonly 'l id': constraint.l_id
                                    }
                                }
                                
                                export type reference = {
                                    readonly 'property': reference.property
                                    readonly 'constraint': reference.constraint
                                }
                            }
                            
                            export type value = 
                                | readonly ['component', value.component]
                                | readonly ['reference', value.reference]
                            
                            export type result = __schema.namespaces.structure.types.Value
                        }
                        
                        export type constraint = {
                            readonly 'value': constraint.value
                            readonly 'result': constraint.result
                        }
                        
                        export namespace parameter {
                            
                            export type l_entry = __schema.namespaces.declarations.types.Signature.values.D
                            
                            export type l_id = string
                        }
                        
                        export type parameter = {
                            readonly 'l entry': parameter.l_entry
                            readonly 'l id': parameter.l_id
                        }
                        
                        export namespace result {
                            
                            export namespace value {
                                
                                export namespace list {
                                    
                                    export namespace property {
                                        
                                        export namespace constraints {
                                            
                                            export type list = __schema.namespaces.structure.types.Value.list
                                            
                                            export type result = __schema.namespaces.structure.types.Value_Result.O
                                        }
                                        
                                        export type constraints = {
                                            readonly 'list': constraints.list
                                            readonly 'result': constraints.result
                                        }
                                        
                                        export namespace value {
                                            
                                            export type l_entry = __schema.namespaces.structure.types.Group.D
                                            
                                            export type l_id = string
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': value.l_entry
                                            readonly 'l id': value.l_id
                                        }
                                    }
                                    
                                    export type property = {
                                        readonly 'constraints': property.constraints
                                        readonly 'value': property.value
                                    }
                                }
                                
                                export type list = {
                                    readonly 'property': list.property
                                }
                                
                                export namespace state {
                                    
                                    export namespace property {
                                        
                                        export namespace constraints {
                                            
                                            export type state = __schema.namespaces.structure.types.Value.state
                                            
                                            export type result = __schema.namespaces.structure.types.Value_Result.O
                                        }
                                        
                                        export type constraints = {
                                            readonly 'state': constraints.state
                                            readonly 'result': constraints.result
                                        }
                                        
                                        export namespace value {
                                            
                                            export type l_entry = __schema.namespaces.structure.types.Group.D
                                            
                                            export type l_id = string
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': value.l_entry
                                            readonly 'l id': value.l_id
                                        }
                                    }
                                    
                                    export type property = {
                                        readonly 'constraints': property.constraints
                                        readonly 'value': property.value
                                    }
                                }
                                
                                export type state = {
                                    readonly 'property': state.property
                                }
                                
                                export namespace optional_value {
                                    
                                    export namespace property {
                                        
                                        export namespace constraints {
                                            
                                            export type optional = __schema.namespaces.structure.types.Value.optional
                                            
                                            export type result = __schema.namespaces.structure.types.Value_Result.O
                                        }
                                        
                                        export type constraints = {
                                            readonly 'optional': constraints.optional
                                            readonly 'result': constraints.result
                                        }
                                        
                                        export namespace value {
                                            
                                            export type l_entry = __schema.namespaces.structure.types.Group.D
                                            
                                            export type l_id = string
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': value.l_entry
                                            readonly 'l id': value.l_id
                                        }
                                    }
                                    
                                    export type property = {
                                        readonly 'constraints': property.constraints
                                        readonly 'value': property.value
                                    }
                                }
                                
                                export type optional_value = {
                                    readonly 'property': optional_value.property
                                }
                            }
                            
                            export type value = 
                                | readonly ['list', value.list]
                                | readonly ['state', value.state]
                                | readonly ['optional value', value.optional_value]
                            
                            export type result = __schema.namespaces.structure.types.Value
                        }
                        
                        export type result = {
                            readonly 'value': result.value
                            readonly 'result': result.result
                        }
                    }
                    
                    export type value = 
                        | readonly ['optional fallback', value.optional_fallback]
                        | readonly ['sibling', value.sibling]
                        | readonly ['parent sibling', value.parent_sibling]
                        | readonly ['option constraint', value.option_constraint]
                        | readonly ['list cursor', value.list_cursor]
                        | readonly ['linked entry', value.linked_entry]
                        | readonly ['constraint', value.constraint]
                        | readonly ['parameter', value.parameter]
                        | readonly ['result', value.result]
                    
                    export type result = __schema.namespaces.structure.types.Value
                }
                
                export type start = {
                    readonly 'value': start.value
                    readonly 'result': start.result
                }
                
                export type tail = __schema.namespaces.resolver.types.Relative_Value_Selection
            }
            
            export type Guaranteed_Value_Selection = {
                readonly 'start': Guaranteed_Value_Selection.start
                readonly 'tail': Guaranteed_Value_Selection.tail
            }
            
            export namespace Benchmark {
                
                export namespace selection {
                    
                    export namespace constraints {
                        
                        export type dictionary = __schema.namespaces.structure.types.Value.dictionary
                    }
                    
                    export type constraints = {
                        readonly 'dictionary': constraints.dictionary
                    }
                    
                    export type value = __schema.namespaces.resolver.types.Guaranteed_Value_Selection
                }
                
                export type selection = {
                    readonly 'constraints': selection.constraints
                    readonly 'value': selection.value
                }
                
                export namespace coverage {
                    
                    export type dense = null
                    
                    export type sparse = null
                }
                
                export type coverage = 
                    | readonly ['dense', coverage.dense]
                    | readonly ['sparse', coverage.sparse]
            }
            
            export type Benchmark = {
                readonly 'selection': Benchmark.selection
                readonly 'coverage': Benchmark.coverage
            }
            
            export namespace Constraint {
                
                export type selection = __schema.namespaces.resolver.types.Relative_Value_Selection
                
                export namespace type_ {
                    
                    export namespace value {
                        
                        export namespace state {
                            
                            export namespace constraints {
                                
                                export type state = __schema.namespaces.structure.types.Value.state
                            }
                            
                            export type constraints = {
                                readonly 'state': constraints.state
                            }
                            
                            export namespace value {
                                
                                export namespace option {
                                    
                                    export type l_entry = __schema.namespaces.structure.types.Value.state.options.D
                                    
                                    export type l_id = string
                                }
                                
                                export type option = {
                                    readonly 'l entry': option.l_entry
                                    readonly 'l id': option.l_id
                                }
                            }
                            
                            export type value = {
                                readonly 'option': value.option
                            }
                        }
                        
                        export type state = {
                            readonly 'constraints': state.constraints
                            readonly 'value': state.value
                        }
                        
                        export namespace optional_value {
                            
                            export namespace constraints {
                                
                                export type optional = __schema.namespaces.structure.types.Value.optional
                            }
                            
                            export type constraints = {
                                readonly 'optional': constraints.optional
                            }
                            
                            export namespace value {}
                            
                            export type value = {}
                        }
                        
                        export type optional_value = {
                            readonly 'constraints': optional_value.constraints
                            readonly 'value': optional_value.value
                        }
                    }
                    
                    export type value = 
                        | readonly ['state', value.state]
                        | readonly ['optional value', value.optional_value]
                    
                    export type result = __schema.namespaces.structure.types.Value
                }
                
                export type type_ = {
                    readonly 'value': type_.value
                    readonly 'result': type_.result
                }
            }
            
            export type Constraint = {
                readonly 'selection': Constraint.selection
                readonly 'type': Constraint.type_
            }
            
            export namespace Lookup_Selection {
                
                export namespace type_ {
                    
                    export namespace value {
                        
                        export namespace acyclic {
                            
                            export namespace value {
                                
                                export namespace siblings {
                                    
                                    export namespace constraints {
                                        
                                        export type cd = __schema.namespaces.structure.types.Dictionary
                                    }
                                    
                                    export type constraints = {
                                        readonly 'cd': constraints.cd
                                    }
                                    
                                    export type value = null
                                }
                                
                                export type siblings = {
                                    readonly 'constraints': siblings.constraints
                                    readonly 'value': siblings.value
                                }
                                
                                export namespace resolved_dictionary {
                                    
                                    export namespace selection {
                                        
                                        export namespace constraints {
                                            
                                            export type dictionary = __schema.namespaces.structure.types.Value.dictionary
                                        }
                                        
                                        export type constraints = {
                                            readonly 'dictionary': constraints.dictionary
                                        }
                                        
                                        export type value = __schema.namespaces.resolver.types.Guaranteed_Value_Selection
                                    }
                                    
                                    export type selection = {
                                        readonly 'constraints': selection.constraints
                                        readonly 'value': selection.value
                                    }
                                }
                                
                                export type resolved_dictionary = {
                                    readonly 'selection': resolved_dictionary.selection
                                }
                            }
                            
                            export type value = 
                                | readonly ['siblings', value.siblings]
                                | readonly ['resolved dictionary', value.resolved_dictionary]
                            
                            export type result = __schema.namespaces.structure.types.Dictionary
                        }
                        
                        export type acyclic = {
                            readonly 'value': acyclic.value
                            readonly 'result': acyclic.result
                        }
                        
                        export namespace cyclic {
                            
                            export namespace value {
                                
                                export namespace siblings {
                                    
                                    export namespace constraints {
                                        
                                        export type cd = __schema.namespaces.structure.types.Dictionary
                                    }
                                    
                                    export type constraints = {
                                        readonly 'cd': constraints.cd
                                    }
                                    
                                    export type value = null
                                }
                                
                                export type siblings = {
                                    readonly 'constraints': siblings.constraints
                                    readonly 'value': siblings.value
                                }
                            }
                            
                            export type value = 
                                | readonly ['siblings', value.siblings]
                            
                            export type result = __schema.namespaces.structure.types.Dictionary
                        }
                        
                        export type cyclic = {
                            readonly 'value': cyclic.value
                            readonly 'result': cyclic.result
                        }
                        
                        export namespace parameter {
                            
                            export type l_entry = __schema.namespaces.declarations.types.Signature.lookups.D
                            
                            export type l_id = string
                        }
                        
                        export type parameter = {
                            readonly 'l entry': parameter.l_entry
                            readonly 'l id': parameter.l_id
                        }
                    }
                    
                    export type value = 
                        | readonly ['acyclic', value.acyclic]
                        | readonly ['cyclic', value.cyclic]
                        | readonly ['parameter', value.parameter]
                    
                    export type result = __schema.namespaces.structure.types.Dictionary
                }
                
                export type type_ = {
                    readonly 'value': type_.value
                    readonly 'result': type_.result
                }
            }
            
            export type Lookup_Selection = {
                readonly 'type': Lookup_Selection.type_
            }
            
            export namespace Namespaces {
                
                export namespace D {
                    
                    export type benchmark = __schema.namespaces.declarations.types.Namespaces.D
                    
                    export type value = __schema.namespaces.resolver.types.Resolver
                }
                
                export type D = {
                    readonly 'benchmark': D.benchmark
                    readonly 'value': D.value
                }
            }
            
            export type Namespaces = p_.Dictionary<
                Namespaces.D
            >
            
            export namespace Possible_Value_Selection {
                
                export namespace value {
                    
                    export namespace optional_value {
                        
                        export namespace selection {
                            
                            export namespace constraints {
                                
                                export type optional = __schema.namespaces.structure.types.Value.optional
                            }
                            
                            export type constraints = {
                                readonly 'optional': constraints.optional
                            }
                            
                            export type value = __schema.namespaces.resolver.types.Guaranteed_Value_Selection
                        }
                        
                        export type selection = {
                            readonly 'constraints': selection.constraints
                            readonly 'value': selection.value
                        }
                        
                        export type tail = __schema.namespaces.resolver.types.Relative_Value_Selection
                    }
                    
                    export type optional_value = {
                        readonly 'selection': optional_value.selection
                        readonly 'tail': optional_value.tail
                    }
                    
                    export namespace parameter {
                        
                        export type l_entry = __schema.namespaces.declarations.types.Signature.values.D
                        
                        export type l_id = string
                    }
                    
                    export type parameter = {
                        readonly 'l entry': parameter.l_entry
                        readonly 'l id': parameter.l_id
                    }
                    
                    export namespace result {
                        
                        export namespace value {
                            
                            export namespace state {
                                
                                export namespace property {
                                    
                                    export namespace constraints {
                                        
                                        export type state = __schema.namespaces.structure.types.Value.state
                                        
                                        export type result = __schema.namespaces.structure.types.Value_Result.O
                                    }
                                    
                                    export type constraints = {
                                        readonly 'state': constraints.state
                                        readonly 'result': constraints.result
                                    }
                                    
                                    export namespace value {
                                        
                                        export type l_entry = __schema.namespaces.structure.types.Group.D
                                        
                                        export type l_id = string
                                    }
                                    
                                    export type value = {
                                        readonly 'l entry': value.l_entry
                                        readonly 'l id': value.l_id
                                    }
                                }
                                
                                export type property = {
                                    readonly 'constraints': property.constraints
                                    readonly 'value': property.value
                                }
                            }
                            
                            export type state = {
                                readonly 'property': state.property
                            }
                            
                            export namespace optional_value {
                                
                                export namespace property {
                                    
                                    export namespace constraints {
                                        
                                        export type optional = __schema.namespaces.structure.types.Value.optional
                                        
                                        export type result = __schema.namespaces.structure.types.Value_Result.O
                                    }
                                    
                                    export type constraints = {
                                        readonly 'optional': constraints.optional
                                        readonly 'result': constraints.result
                                    }
                                    
                                    export namespace value {
                                        
                                        export type l_entry = __schema.namespaces.structure.types.Group.D
                                        
                                        export type l_id = string
                                    }
                                    
                                    export type value = {
                                        readonly 'l entry': value.l_entry
                                        readonly 'l id': value.l_id
                                    }
                                }
                                
                                export type property = {
                                    readonly 'constraints': property.constraints
                                    readonly 'value': property.value
                                }
                            }
                            
                            export type optional_value = {
                                readonly 'property': optional_value.property
                            }
                        }
                        
                        export type value = 
                            | readonly ['state', value.state]
                            | readonly ['optional value', value.optional_value]
                        
                        export type result = __schema.namespaces.structure.types.Value
                    }
                    
                    export type result = {
                        readonly 'value': result.value
                        readonly 'result': result.result
                    }
                }
                
                export type value = 
                    | readonly ['optional value', value.optional_value]
                    | readonly ['parameter', value.parameter]
                    | readonly ['result', value.result]
                
                export type result = __schema.namespaces.structure.types.Value
            }
            
            export type Possible_Value_Selection = {
                readonly 'value': Possible_Value_Selection.value
                readonly 'result': Possible_Value_Selection.result
            }
            
            export namespace Option_Constraints {
                
                export namespace O {
                    
                    export namespace constraints {
                        
                        export type declarations = __schema.namespaces.structure.types.Option_Constraints.O
                    }
                    
                    export type constraints = {
                        readonly 'declarations': constraints.declarations
                    }
                    
                    export namespace value {
                        
                        export namespace D {
                            
                            export type benchmark = __schema.namespaces.structure.types.Option_Constraints.O.D
                            
                            export namespace value {
                                
                                export namespace value {
                                    
                                    export namespace state {
                                        
                                        export namespace selection {
                                            
                                            export namespace constraints {
                                                
                                                export type state = __schema.namespaces.structure.types.Value.state
                                            }
                                            
                                            export type constraints = {
                                                readonly 'state': constraints.state
                                            }
                                            
                                            export type value = __schema.namespaces.resolver.types.Guaranteed_Value_Selection
                                        }
                                        
                                        export type selection = {
                                            readonly 'constraints': selection.constraints
                                            readonly 'value': selection.value
                                        }
                                        
                                        export namespace option {
                                            
                                            export type l_entry = __schema.namespaces.structure.types.Value.state.options.D
                                            
                                            export type l_id = string
                                        }
                                        
                                        export type option = {
                                            readonly 'l entry': option.l_entry
                                            readonly 'l id': option.l_id
                                        }
                                    }
                                    
                                    export type state = {
                                        readonly 'selection': state.selection
                                        readonly 'option': state.option
                                    }
                                    
                                    export type assert_is_set = __schema.namespaces.resolver.types.Possible_Value_Selection
                                }
                                
                                export type value = 
                                    | readonly ['state', value.state]
                                    | readonly ['assert is set', value.assert_is_set]
                                
                                export type result = __schema.namespaces.structure.types.Value
                            }
                            
                            export type value = {
                                readonly 'value': value.value
                                readonly 'result': value.result
                            }
                        }
                        
                        export type D = {
                            readonly 'benchmark': D.benchmark
                            readonly 'value': D.value
                        }
                    }
                    
                    export type value = p_.Dictionary<
                        value.D
                    >
                }
                
                export type O = {
                    readonly 'constraints': O.constraints
                    readonly 'value': O.value
                }
            }
            
            export type Option_Constraints = p_.Optional_Value<
                Option_Constraints.O
            >
            
            export namespace Optional_Value_Initialization {
                
                export type not_set = null
                
                export type set_ = __schema.namespaces.resolver.types.Guaranteed_Value_Selection
                
                export type selection = __schema.namespaces.resolver.types.Possible_Value_Selection
            }
            
            export type Optional_Value_Initialization = 
                | readonly ['not set', Optional_Value_Initialization.not_set]
                | readonly ['set', Optional_Value_Initialization.set_]
                | readonly ['selection', Optional_Value_Initialization.selection]
            
            export namespace Reference_Constraints {
                
                export namespace O {
                    
                    export namespace constraints {
                        
                        export type declarations = __schema.namespaces.structure.types.Reference_Constraints.O
                    }
                    
                    export type constraints = {
                        readonly 'declarations': constraints.declarations
                    }
                    
                    export namespace value {
                        
                        export namespace D {
                            
                            export type benchmark = __schema.namespaces.structure.types.Reference_Constraints.O.D
                            
                            export type value = __schema.namespaces.resolver.types.Value_Constraint
                        }
                        
                        export type D = {
                            readonly 'benchmark': D.benchmark
                            readonly 'value': D.value
                        }
                    }
                    
                    export type value = p_.Dictionary<
                        value.D
                    >
                }
                
                export type O = {
                    readonly 'constraints': O.constraints
                    readonly 'value': O.value
                }
            }
            
            export type Reference_Constraints = p_.Optional_Value<
                Reference_Constraints.O
            >
            
            export namespace Reference_To_Value_Constraint {
                
                export type l_entry = __schema.namespaces.structure.types.Reference_Constraints.O.D
                
                export type l_id = string
            }
            
            export type Reference_To_Value_Constraint = {
                readonly 'l entry': Reference_To_Value_Constraint.l_entry
                readonly 'l id': Reference_To_Value_Constraint.l_id
            }
            
            export namespace Resolver {
                
                export type namespaces = __schema.namespaces.resolver.types.Namespaces
                
                export type types = __schema.namespaces.resolver.types.Types
            }
            
            export type Resolver = {
                readonly 'namespaces': Resolver.namespaces
                readonly 'types': Resolver.types
            }
            
            export namespace Result_Selection {
                
                export type context = __schema.namespaces.resolver.types.Guaranteed_Value_Selection
                
                export type value = __schema.namespaces.resolver.types.Relative_Value_Selection
            }
            
            export type Result_Selection = 
                | readonly ['context', Result_Selection.context]
                | readonly ['value', Result_Selection.value]
            
            export namespace Value_Group {
                
                export namespace D {
                    
                    export type benchmark = __schema.namespaces.structure.types.Group.D
                    
                    export namespace value {
                        
                        export type resolver = __schema.namespaces.resolver.types.Value
                    }
                    
                    export type value = {
                        readonly 'resolver': value.resolver
                    }
                }
                
                export type D = {
                    readonly 'benchmark': D.benchmark
                    readonly 'value': D.value
                }
            }
            
            export type Value_Group = p_.Dictionary<
                Value_Group.D
            >
            
            export namespace Value_List_Result {
                
                export type initial = __schema.namespaces.resolver.types.Guaranteed_Value_Selection
                
                export type next = __schema.namespaces.resolver.types.Result_Selection
            }
            
            export type Value_List_Result = {
                readonly 'initial': Value_List_Result.initial
                readonly 'next': Value_List_Result.next
            }
            
            export namespace Value {
                
                export namespace component {
                    
                    export namespace constraints {
                        
                        export type definition = __schema.namespaces.structure.types.Value.component
                    }
                    
                    export type constraints = {
                        readonly 'definition': constraints.definition
                    }
                    
                    export namespace value {
                        
                        export namespace location {
                            
                            export namespace value {
                                
                                export namespace internal {
                                    
                                    export type l_entry = __schema.namespaces.declarations.types.Declarations.D
                                    
                                    export type l_id = string
                                }
                                
                                export type internal = {
                                    readonly 'l entry': internal.l_entry
                                    readonly 'l id': internal.l_id
                                }
                                
                                export namespace child {
                                    
                                    export namespace namespace {
                                        
                                        export type l_entry = __schema.namespaces.declarations.types.Namespaces.D
                                        
                                        export type l_id = string
                                    }
                                    
                                    export type namespace = {
                                        readonly 'l entry': namespace.l_entry
                                        readonly 'l id': namespace.l_id
                                    }
                                    
                                    export namespace resolver {
                                        
                                        export type l_entry = __schema.namespaces.declarations.types.Declarations.D
                                        
                                        export type l_id = string
                                    }
                                    
                                    export type resolver = {
                                        readonly 'l entry': resolver.l_entry
                                        readonly 'l id': resolver.l_id
                                    }
                                }
                                
                                export type child = {
                                    readonly 'namespace': child.namespace
                                    readonly 'resolver': child.resolver
                                }
                            }
                            
                            export type value = 
                                | readonly ['internal', value.internal]
                                | readonly ['child', value.child]
                            
                            export type result = __schema.namespaces.declarations.types.Declaration
                        }
                        
                        export type location = {
                            readonly 'value': location.value
                            readonly 'result': location.result
                        }
                        
                        export namespace arguments_ {
                            
                            export namespace O {
                                
                                export namespace types {
                                    
                                    export namespace O {
                                        
                                        export namespace D {
                                            
                                            export type benchmark = __schema.namespaces.declarations.types.Signature.values.D
                                            
                                            export namespace value {
                                                
                                                export type optional = __schema.namespaces.resolver.types.Optional_Value_Initialization
                                                
                                                export type required = __schema.namespaces.resolver.types.Guaranteed_Value_Selection
                                                
                                                export namespace parameter {
                                                    
                                                    export type l_entry = __schema.namespaces.declarations.types.Signature.values.D
                                                    
                                                    export type l_id = string
                                                }
                                                
                                                export type parameter = {
                                                    readonly 'l entry': parameter.l_entry
                                                    readonly 'l id': parameter.l_id
                                                }
                                            }
                                            
                                            export type value = 
                                                | readonly ['optional', value.optional]
                                                | readonly ['required', value.required]
                                                | readonly ['parameter', value.parameter]
                                        }
                                        
                                        export type D = {
                                            readonly 'benchmark': D.benchmark
                                            readonly 'value': D.value
                                        }
                                    }
                                    
                                    export type O = p_.Dictionary<
                                        O.D
                                    >
                                }
                                
                                export type types = p_.Optional_Value<
                                    types.O
                                >
                                
                                export namespace lookups {
                                    
                                    export namespace O {
                                        
                                        export namespace D {
                                            
                                            export type benchmark = __schema.namespaces.declarations.types.Signature.lookups.D
                                            
                                            export namespace value {
                                                
                                                export type acyclic = null
                                                
                                                export type cyclic = null
                                                
                                                export type selection = __schema.namespaces.resolver.types.Lookup_Selection
                                            }
                                            
                                            export type value = 
                                                | readonly ['acyclic', value.acyclic]
                                                | readonly ['cyclic', value.cyclic]
                                                | readonly ['selection', value.selection]
                                        }
                                        
                                        export type D = {
                                            readonly 'benchmark': D.benchmark
                                            readonly 'value': D.value
                                        }
                                    }
                                    
                                    export type O = p_.Dictionary<
                                        O.D
                                    >
                                }
                                
                                export type lookups = p_.Optional_Value<
                                    lookups.O
                                >
                            }
                            
                            export type O = {
                                readonly 'types': O.types
                                readonly 'lookups': O.lookups
                            }
                        }
                        
                        export type arguments_ = p_.Optional_Value<
                            arguments_.O
                        >
                        
                        export type constraints = __schema.namespaces.resolver.types.Reference_Constraints
                    }
                    
                    export type value = {
                        readonly 'location': value.location
                        readonly 'arguments': value.arguments_
                        readonly 'constraints': value.constraints
                    }
                }
                
                export type component = {
                    readonly 'constraints': component.constraints
                    readonly 'value': component.value
                }
                
                export namespace dictionary {
                    
                    export namespace constraints {
                        
                        export type definition = __schema.namespaces.structure.types.Value.dictionary
                    }
                    
                    export type constraints = {
                        readonly 'definition': constraints.definition
                    }
                    
                    export namespace value {
                        
                        export type resolver = __schema.namespaces.resolver.types.Value
                        
                        export namespace benchmark {
                            
                            export type O = __schema.namespaces.resolver.types.Benchmark
                        }
                        
                        export type benchmark = p_.Optional_Value<
                            benchmark.O
                        >
                    }
                    
                    export type value = {
                        readonly 'resolver': value.resolver
                        readonly 'benchmark': value.benchmark
                    }
                }
                
                export type dictionary = {
                    readonly 'constraints': dictionary.constraints
                    readonly 'value': dictionary.value
                }
                
                export namespace group {
                    
                    export namespace constraints {
                        
                        export type definition = __schema.namespaces.structure.types.Value.group
                    }
                    
                    export type constraints = {
                        readonly 'definition': constraints.definition
                    }
                    
                    export type value = __schema.namespaces.resolver.types.Value_Group
                }
                
                export type group = {
                    readonly 'constraints': group.constraints
                    readonly 'value': group.value
                }
                
                export namespace list {
                    
                    export namespace constraints {
                        
                        export type definition = __schema.namespaces.structure.types.Value.list
                    }
                    
                    export type constraints = {
                        readonly 'definition': constraints.definition
                    }
                    
                    export namespace value {
                        
                        export type resolver = __schema.namespaces.resolver.types.Value
                        
                        export namespace result {
                            
                            export namespace O {
                                
                                export namespace constraints {
                                    
                                    export type definition = __schema.namespaces.structure.types.Value.list
                                    
                                    export type result = __schema.namespaces.structure.types.Value_Result.O
                                }
                                
                                export type constraints = {
                                    readonly 'definition': constraints.definition
                                    readonly 'result': constraints.result
                                }
                                
                                export type value = __schema.namespaces.resolver.types.Value_List_Result
                            }
                            
                            export type O = {
                                readonly 'constraints': O.constraints
                                readonly 'value': O.value
                            }
                        }
                        
                        export type result = p_.Optional_Value<
                            result.O
                        >
                    }
                    
                    export type value = {
                        readonly 'resolver': value.resolver
                        readonly 'result': value.result
                    }
                }
                
                export type list = {
                    readonly 'constraints': list.constraints
                    readonly 'value': list.value
                }
                
                export namespace nothing {
                    
                    export namespace constraints {
                        
                        export type definition = __schema.namespaces.structure.types.Value.nothing
                    }
                    
                    export type constraints = {
                        readonly 'definition': constraints.definition
                    }
                    
                    export type value = null
                }
                
                export type nothing = {
                    readonly 'constraints': nothing.constraints
                    readonly 'value': nothing.value
                }
                
                export namespace simple {
                    
                    export namespace constraints {
                        
                        export type definition = __schema.namespaces.structure.types.Value.simple.value
                    }
                    
                    export type constraints = {
                        readonly 'definition': constraints.definition
                    }
                    
                    export type value = null
                }
                
                export type simple = {
                    readonly 'constraints': simple.constraints
                    readonly 'value': simple.value
                }
                
                export namespace optional {
                    
                    export namespace constraints {
                        
                        export type definition = __schema.namespaces.structure.types.Value.optional
                    }
                    
                    export type constraints = {
                        readonly 'definition': constraints.definition
                    }
                    
                    export namespace value {
                        
                        export namespace presence {
                            
                            export type O = __schema.namespaces.resolver.types.Possible_Value_Selection
                        }
                        
                        export type presence = p_.Optional_Value<
                            presence.O
                        >
                        
                        export type constraints = __schema.namespaces.resolver.types.Option_Constraints
                        
                        export type resolver = __schema.namespaces.resolver.types.Value
                        
                        export type not_set_constraints = __schema.namespaces.resolver.types.Absence_Constraints
                        
                        export namespace result {
                            
                            export namespace O {
                                
                                export namespace constraints {
                                    
                                    export type definition = __schema.namespaces.structure.types.Value.optional
                                    
                                    export type result = __schema.namespaces.structure.types.Value_Result.O
                                }
                                
                                export type constraints = {
                                    readonly 'definition': constraints.definition
                                    readonly 'result': constraints.result
                                }
                                
                                export type value = __schema.namespaces.resolver.types.Result_Selection
                            }
                            
                            export type O = {
                                readonly 'constraints': O.constraints
                                readonly 'value': O.value
                            }
                        }
                        
                        export type result = p_.Optional_Value<
                            result.O
                        >
                    }
                    
                    export type value = {
                        readonly 'presence': value.presence
                        readonly 'constraints': value.constraints
                        readonly 'resolver': value.resolver
                        readonly 'not set constraints': value.not_set_constraints
                        readonly 'result': value.result
                    }
                }
                
                export type optional = {
                    readonly 'constraints': optional.constraints
                    readonly 'value': optional.value
                }
                
                export namespace reference {
                    
                    export namespace constraints {
                        
                        export type definition = __schema.namespaces.structure.types.Value.reference
                    }
                    
                    export type constraints = {
                        readonly 'definition': constraints.definition
                    }
                    
                    export namespace value {
                        
                        export namespace type_ {
                            
                            export type lookup = __schema.namespaces.resolver.types.Lookup_Selection
                            
                            export type constraints = __schema.namespaces.resolver.types.Reference_Constraints
                        }
                        
                        export type type_ = {
                            readonly 'lookup': type_.lookup
                            readonly 'constraints': type_.constraints
                        }
                    }
                    
                    export type value = {
                        readonly 'type': value.type_
                    }
                }
                
                export type reference = {
                    readonly 'constraints': reference.constraints
                    readonly 'value': reference.value
                }
                
                export namespace state {
                    
                    export namespace constraints {
                        
                        export type definition = __schema.namespaces.structure.types.Value.state
                    }
                    
                    export type constraints = {
                        readonly 'definition': constraints.definition
                    }
                    
                    export namespace value {
                        
                        export namespace options {
                            
                            export namespace D {
                                
                                export type benchmark = __schema.namespaces.structure.types.Value.state.options.D
                                
                                export namespace value {
                                    
                                    export type constraints = __schema.namespaces.resolver.types.Option_Constraints
                                    
                                    export type resolver = __schema.namespaces.resolver.types.Value
                                    
                                    export namespace result {
                                        
                                        export type O = __schema.namespaces.resolver.types.Result_Selection
                                    }
                                    
                                    export type result = p_.Optional_Value<
                                        result.O
                                    >
                                }
                                
                                export type value = {
                                    readonly 'constraints': value.constraints
                                    readonly 'resolver': value.resolver
                                    readonly 'result': value.result
                                }
                            }
                            
                            export type D = {
                                readonly 'benchmark': D.benchmark
                                readonly 'value': D.value
                            }
                        }
                        
                        export type options = p_.Dictionary<
                            options.D
                        >
                    }
                    
                    export type value = {
                        readonly 'options': value.options
                    }
                }
                
                export type state = {
                    readonly 'constraints': state.constraints
                    readonly 'value': state.value
                }
            }
            
            export type Value = 
                | readonly ['component', Value.component]
                | readonly ['dictionary', Value.dictionary]
                | readonly ['group', Value.group]
                | readonly ['list', Value.list]
                | readonly ['nothing', Value.nothing]
                | readonly ['simple', Value.simple]
                | readonly ['optional', Value.optional]
                | readonly ['reference', Value.reference]
                | readonly ['state', Value.state]
            
            export namespace Types {
                
                export namespace D {
                    
                    export type benchmark = __schema.namespaces.declarations.types.Declarations.D
                    
                    export namespace value {
                        
                        export type root_value_resolver = __schema.namespaces.resolver.types.Value
                    }
                    
                    export type value = {
                        readonly 'root value resolver': value.root_value_resolver
                    }
                }
                
                export type D = {
                    readonly 'benchmark': D.benchmark
                    readonly 'value': D.value
                }
            }
            
            export type Types = p_.Dictionary<
                Types.D
            >
            
            export namespace Value_Constraint {
                
                export namespace start {
                    
                    export namespace value {
                        
                        export type value = null
                        
                        export type sibling = __schema.namespaces.resolver.types.Reference_To_Value_Constraint
                    }
                    
                    export type value = 
                        | readonly ['value', value.value]
                        | readonly ['sibling', value.sibling]
                    
                    export type result = __schema.namespaces.structure.types.Value
                }
                
                export type start = {
                    readonly 'value': start.value
                    readonly 'result': start.result
                }
                
                export type constraint = __schema.namespaces.resolver.types.Constraint
            }
            
            export type Value_Constraint = {
                readonly 'start': Value_Constraint.start
                readonly 'constraint': Value_Constraint.constraint
            }
            
            export namespace Value_Constraints {
                
                export namespace D {
                    
                    export type benchmark = __schema.namespaces.structure.types.Reference_Constraints.O.D
                    
                    export type value = __schema.namespaces.resolver.types.Value_Constraint
                }
                
                export type D = {
                    readonly 'benchmark': D.benchmark
                    readonly 'value': D.value
                }
            }
            
            export type Value_Constraints = p_.Dictionary<
                Value_Constraints.D
            >
        }
        export namespace namespaces {}
    }
}
