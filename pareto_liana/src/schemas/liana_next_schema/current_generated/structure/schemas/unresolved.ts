import type * as p_ from 'pareto-core/schema'

import type * as s_self from "./unresolved.js"

export type Directory =
    | readonly ['group', s_self.Directory.type_.group]
    | readonly ['dictionary', s_self.Directory.type_.dictionary]

export namespace Directory {
    export namespace type_ {
        
        export type group = {
            readonly 'nodes': s_self.Directory.type_.group.nodes
        }
        
        export namespace group {
            
            export type nodes = p_.Dictionary<s_self.Directory.type_.group.nodes.D>
            
            export namespace nodes {
                
                export type D = s_self.Node
                
            }
            
        }
        
        export type dictionary = {
            readonly 'node': s_self.Directory.type_.dictionary.node
        }
        
        export namespace dictionary {
            
            export type node = s_self.Node
            
        }
        
    }
    
}

export type Node =
    | readonly ['file', s_self.Node.type_.file]
    | readonly ['directory', s_self.Node.type_.directory]

export namespace Node {
    export namespace type_ {
        
        export type file = {
            readonly 'file extension': s_self.Node.type_.file.file_extension
            readonly 'type': s_self.Node.type_.file.type_
        }
        
        export namespace file {
            
            export type file_extension = string
            
            export type type_ = string
            
        }
        
        export type directory = s_self.Directory
        
    }
    
}

export type Type_Specification = {
    readonly 'schema': s_self.Type_Specification.schema
    readonly 'directory': s_self.Type_Specification.directory
}

export namespace Type_Specification {
    
    export type schema = {
        readonly 'structure': s_self.Type_Specification.schema.structure
        readonly 'resolver': s_self.Type_Specification.schema.resolver
    }
    
    export namespace schema {
        
        export type structure = s_self.structure.Structure
        
        export type resolver = {
            readonly 'declarations': s_self.Type_Specification.schema.resolver.declarations
            readonly 'implementations': s_self.Type_Specification.schema.resolver.implementations
        }
        
        export namespace resolver {
            
            export type declarations = s_self.declarations.Declaration_Namespace
            
            export type implementations = s_self.resolver.Resolver
            
        }
        
    }
    
    export type directory = s_self.Directory
    
}

export namespace structure {
    
    export type Basic_Types = p_.Dictionary<s_self.structure.Basic_Types.D>
    
    export namespace Basic_Types {
        
        export type D = {
            readonly 'type': s_self.structure.Basic_Types.D.type_
            readonly 'regular expression': s_self.structure.Basic_Types.D.regular_expression
            readonly 'hyperlink': s_self.structure.Basic_Types.D.hyperlink
        }
        
        export namespace D {
            
            export type type_ =
                | readonly ['double quoted', s_self.structure.Basic_Types.D.type_.type_.double_quoted]
                | readonly ['undelimited', s_self.structure.Basic_Types.D.type_.type_.undelimited]
            
            export namespace type_ {
                export namespace type_ {
                    
                    export type double_quoted = null
                    
                    export type undelimited = null
                    
                }
                
            }
            
            export type regular_expression = p_.Optional_Value<s_self.structure.Basic_Types.D.regular_expression.O>
            
            export namespace regular_expression {
                
                export type O = s_self.structure.Regular_Expression
                
            }
            
            export type hyperlink = p_.Optional_Value<s_self.structure.Basic_Types.D.hyperlink.O>
            
            export namespace hyperlink {
                
                export type O = {
                    readonly 'prefix': s_self.structure.Basic_Types.D.hyperlink.O.prefix
                    readonly 'suffix': s_self.structure.Basic_Types.D.hyperlink.O.suffix
                }
                
                export namespace O {
                    
                    export type prefix = string
                    
                    export type suffix = string
                    
                }
                
            }
            
        }
        
    }
    
    export type Types = p_.Dictionary<s_self.structure.Types.D>
    
    export namespace Types {
        
        export type D = s_self.structure.Type
        
    }
    
    export type Namespaces = p_.Dictionary<s_self.structure.Namespaces.D>
    
    export namespace Namespaces {
        
        export type D = s_self.structure.Structure
        
    }
    
    export type Type = {
        readonly 'visibility': s_self.structure.Type.visibility
        readonly 'root value': s_self.structure.Type.root_value
    }
    
    export namespace Type {
        
        export type visibility =
            | readonly ['private', s_self.structure.Type.visibility.type_.private_]
            | readonly ['private single use', s_self.structure.Type.visibility.type_.private_single_use]
            | readonly ['public', s_self.structure.Type.visibility.type_.public_]
        
        export namespace visibility {
            export namespace type_ {
                
                export type private_ = null
                
                export type private_single_use = null
                
                export type public_ = null
                
            }
            
        }
        
        export type root_value = s_self.structure.Value
        
    }
    
    export type Group = p_.Dictionary<s_self.structure.Group.D>
    
    export namespace Group {
        
        export type D = {
            readonly 'description': s_self.structure.Group.D.description
            readonly 'value': s_self.structure.Group.D.value
        }
        
        export namespace D {
            
            export type description = p_.Optional_Value<s_self.structure.Group.D.description.O>
            
            export namespace description {
                
                export type O = string
                
            }
            
            export type value = s_self.structure.Value
            
        }
        
    }
    
    export type Value =
        | readonly ['component', s_self.structure.Value.type_.component]
        | readonly ['dictionary', s_self.structure.Value.type_.dictionary]
        | readonly ['group', s_self.structure.Value.type_.group]
        | readonly ['list', s_self.structure.Value.type_.list]
        | readonly ['nothing', s_self.structure.Value.type_.nothing]
        | readonly ['simple', s_self.structure.Value.type_.simple]
        | readonly ['optional', s_self.structure.Value.type_.optional]
        | readonly ['reference', s_self.structure.Value.type_.reference]
        | readonly ['state', s_self.structure.Value.type_.state]
    
    export namespace Value {
        export namespace type_ {
            
            export type component = {
                readonly 'type': s_self.structure.Value.type_.component.type_
                readonly 'constraints': s_self.structure.Value.type_.component.constraints
            }
            
            export namespace component {
                
                export type type_ =
                    | readonly ['simple', s_self.structure.Value.type_.component.type_.type_.simple]
                    | readonly ['navigable', s_self.structure.Value.type_.component.type_.type_.navigable]
                
                export namespace type_ {
                    export namespace type_ {
                        
                        export type simple =
                            | readonly ['local', s_self.structure.Value.type_.component.type_.type_.simple.type_.local]
                            | readonly ['child namespace', s_self.structure.Value.type_.component.type_.type_.simple.type_.child_namespace]
                            | readonly ['sibling namespace', s_self.structure.Value.type_.component.type_.type_.simple.type_.sibling_namespace]
                        
                        export namespace simple {
                            export namespace type_ {
                                
                                export type local = string
                                
                                export type child_namespace = {
                                    readonly 'namespace': s_self.structure.Value.type_.component.type_.type_.simple.type_.child_namespace.namespace
                                    readonly 'type': s_self.structure.Value.type_.component.type_.type_.simple.type_.child_namespace.type_
                                }
                                
                                export namespace child_namespace {
                                    
                                    export type namespace = string
                                    
                                    export type type_ = string
                                    
                                }
                                
                                export type sibling_namespace = {
                                    readonly 'namespace': s_self.structure.Value.type_.component.type_.type_.simple.type_.sibling_namespace.namespace
                                    readonly 'type': s_self.structure.Value.type_.component.type_.type_.simple.type_.sibling_namespace.type_
                                }
                                
                                export namespace sibling_namespace {
                                    
                                    export type namespace = string
                                    
                                    export type type_ = string
                                    
                                }
                                
                            }
                            
                        }
                        
                        export type navigable =
                            | readonly ['local', s_self.structure.Value.type_.component.type_.type_.navigable.type_.local]
                            | readonly ['child namespace', s_self.structure.Value.type_.component.type_.type_.navigable.type_.child_namespace]
                            | readonly ['sibling namespace', s_self.structure.Value.type_.component.type_.type_.navigable.type_.sibling_namespace]
                        
                        export namespace navigable {
                            export namespace type_ {
                                
                                export type local = string
                                
                                export type child_namespace = {
                                    readonly 'namespace': s_self.structure.Value.type_.component.type_.type_.navigable.type_.child_namespace.namespace
                                    readonly 'type': s_self.structure.Value.type_.component.type_.type_.navigable.type_.child_namespace.type_
                                }
                                
                                export namespace child_namespace {
                                    
                                    export type namespace = string
                                    
                                    export type type_ = string
                                    
                                }
                                
                                export type sibling_namespace = {
                                    readonly 'namespace': s_self.structure.Value.type_.component.type_.type_.navigable.type_.sibling_namespace.namespace
                                    readonly 'type': s_self.structure.Value.type_.component.type_.type_.navigable.type_.sibling_namespace.type_
                                }
                                
                                export namespace sibling_namespace {
                                    
                                    export type namespace = string
                                    
                                    export type type_ = string
                                    
                                }
                                
                            }
                            
                        }
                        
                    }
                    
                }
                
                export type constraints = s_self.structure.Reference_Constraints
                
            }
            
            export type dictionary = s_self.structure.Dictionary
            
            export type group = s_self.structure.Group
            
            export type list = {
                readonly 'value': s_self.structure.Value.type_.list.value
                readonly 'result': s_self.structure.Value.type_.list.result
            }
            
            export namespace list {
                
                export type value = s_self.structure.Value
                
                export type result = s_self.structure.Value_Result
                
            }
            
            export type nothing = null
            
            export type simple = string
            
            export type optional = {
                readonly 'constraints': s_self.structure.Value.type_.optional.constraints
                readonly 'value': s_self.structure.Value.type_.optional.value
                readonly 'result': s_self.structure.Value.type_.optional.result
            }
            
            export namespace optional {
                
                export type constraints = s_self.structure.Option_Constraints
                
                export type value = s_self.structure.Value
                
                export type result = s_self.structure.Value_Result
                
            }
            
            export type reference = s_self.structure.Reference
            
            export type state = {
                readonly 'options': s_self.structure.Value.type_.state.options
                readonly 'result': s_self.structure.Value.type_.state.result
            }
            
            export namespace state {
                
                export type options = p_.Dictionary<s_self.structure.Value.type_.state.options.D>
                
                export namespace options {
                    
                    export type D = {
                        readonly 'description': s_self.structure.Value.type_.state.options.D.description
                        readonly 'constraints': s_self.structure.Value.type_.state.options.D.constraints
                        readonly 'value': s_self.structure.Value.type_.state.options.D.value
                    }
                    
                    export namespace D {
                        
                        export type description = p_.Optional_Value<s_self.structure.Value.type_.state.options.D.description.O>
                        
                        export namespace description {
                            
                            export type O = string
                            
                        }
                        
                        export type constraints = s_self.structure.Option_Constraints
                        
                        export type value = s_self.structure.Value
                        
                    }
                    
                }
                
                export type result = s_self.structure.Value_Result
                
            }
            
        }
        
    }
    
    export type Dictionary = {
        readonly 'benchmark': s_self.structure.Dictionary.benchmark
        readonly 'value': s_self.structure.Dictionary.value
    }
    
    export namespace Dictionary {
        
        export type benchmark = p_.Optional_Value<s_self.structure.Dictionary.benchmark.O>
        
        export namespace benchmark {
            
            export type O = {
                readonly 'selection': s_self.structure.Dictionary.benchmark.O.selection
                readonly 'coverage': s_self.structure.Dictionary.benchmark.O.coverage
            }
            
            export namespace O {
                
                export type selection = s_self.structure.Value_Reference
                
                export type coverage =
                    | readonly ['dense', s_self.structure.Dictionary.benchmark.O.coverage.type_.dense]
                    | readonly ['sparse', s_self.structure.Dictionary.benchmark.O.coverage.type_.sparse]
                
                export namespace coverage {
                    export namespace type_ {
                        
                        export type dense = null
                        
                        export type sparse = null
                        
                    }
                    
                }
                
            }
            
        }
        
        export type value = s_self.structure.Value
        
    }
    
    export type Value_Reference = {
        readonly 'type': s_self.structure.Value_Reference.type_
        readonly 'path': s_self.structure.Value_Reference.path
    }
    
    export namespace Value_Reference {
        
        export type type_ = {
            readonly 'location': s_self.structure.Value_Reference.type_.location
        }
        
        export namespace type_ {
            
            export type location =
                | readonly ['local', s_self.structure.Value_Reference.type_.location.type_.local]
                | readonly ['child namespace', s_self.structure.Value_Reference.type_.location.type_.child_namespace]
                | readonly ['sibling namespace', s_self.structure.Value_Reference.type_.location.type_.sibling_namespace]
            
            export namespace location {
                export namespace type_ {
                    
                    export type local = string
                    
                    export type child_namespace = {
                        readonly 'namespace': s_self.structure.Value_Reference.type_.location.type_.child_namespace.namespace
                        readonly 'type': s_self.structure.Value_Reference.type_.location.type_.child_namespace.type_
                    }
                    
                    export namespace child_namespace {
                        
                        export type namespace = string
                        
                        export type type_ = string
                        
                    }
                    
                    export type sibling_namespace = {
                        readonly 'namespace': s_self.structure.Value_Reference.type_.location.type_.sibling_namespace.namespace
                        readonly 'type': s_self.structure.Value_Reference.type_.location.type_.sibling_namespace.type_
                    }
                    
                    export namespace sibling_namespace {
                        
                        export type namespace = string
                        
                        export type type_ = string
                        
                    }
                    
                }
                
            }
            
        }
        
        export type path = {
            readonly 'tail': s_self.structure.Value_Reference.path.tail
        }
        
        export namespace path {
            
            export type tail = p_.List<s_self.structure.Value_Reference.path.tail.L>
            
            export namespace tail {
                
                export type L =
                    | readonly ['benchmark', s_self.structure.Value_Reference.path.tail.L.type_.benchmark]
                    | readonly ['dictionary', s_self.structure.Value_Reference.path.tail.L.type_.dictionary]
                    | readonly ['group', s_self.structure.Value_Reference.path.tail.L.type_.group]
                    | readonly ['list', s_self.structure.Value_Reference.path.tail.L.type_.list]
                    | readonly ['optional', s_self.structure.Value_Reference.path.tail.L.type_.optional]
                    | readonly ['state', s_self.structure.Value_Reference.path.tail.L.type_.state]
                
                export namespace L {
                    export namespace type_ {
                        
                        export type benchmark = null
                        
                        export type dictionary = null
                        
                        export type group = string
                        
                        export type list = null
                        
                        export type optional = null
                        
                        export type state = string
                        
                    }
                    
                }
                
            }
            
        }
        
    }
    
    export type Option_Constraints = p_.Optional_Value<s_self.structure.Option_Constraints.O>
    
    export namespace Option_Constraints {
        
        export type O = p_.Dictionary<s_self.structure.Option_Constraints.O.D>
        
        export namespace O {
            
            export type D = s_self.structure.Value_Reference
            
        }
        
    }
    
    export type Reference = {
        readonly 'referent': s_self.structure.Reference.referent
        readonly 'type': s_self.structure.Reference.type_
    }
    
    export namespace Reference {
        
        export type referent = s_self.structure.Value_Reference
        
        export type type_ = {
            readonly 'dependency': s_self.structure.Reference.type_.dependency
            readonly 'constraints': s_self.structure.Reference.type_.constraints
        }
        
        export namespace type_ {
            
            export type dependency =
                | readonly ['acyclic', s_self.structure.Reference.type_.dependency.type_.acyclic]
                | readonly ['cyclic', s_self.structure.Reference.type_.dependency.type_.cyclic]
            
            export namespace dependency {
                export namespace type_ {
                    
                    export type acyclic = null
                    
                    export type cyclic = null
                    
                }
                
            }
            
            export type constraints = s_self.structure.Reference_Constraints
            
        }
        
    }
    
    export type Reference_Constraints = p_.Optional_Value<s_self.structure.Reference_Constraints.O>
    
    export namespace Reference_Constraints {
        
        export type O = p_.Dictionary<s_self.structure.Reference_Constraints.O.D>
        
        export namespace O {
            
            export type D = s_self.structure.Value_Reference
            
        }
        
    }
    
    export type Regular_Expression =
        | readonly ['any character', s_self.structure.Regular_Expression.type_.any_character]
        | readonly ['literal', s_self.structure.Regular_Expression.type_.literal]
        | readonly ['character set', s_self.structure.Regular_Expression.type_.character_set]
        | readonly ['sequence', s_self.structure.Regular_Expression.type_.sequence]
        | readonly ['choice', s_self.structure.Regular_Expression.type_.choice]
        | readonly ['repetition', s_self.structure.Regular_Expression.type_.repetition]
    
    export namespace Regular_Expression {
        export namespace type_ {
            
            export type any_character = null
            
            export type literal = string
            
            export type character_set = string
            
            export type sequence = p_.List<s_self.structure.Regular_Expression.type_.sequence.L>
            
            export namespace sequence {
                
                export type L = s_self.structure.Regular_Expression
                
            }
            
            export type choice = p_.List<s_self.structure.Regular_Expression.type_.choice.L>
            
            export namespace choice {
                
                export type L = s_self.structure.Regular_Expression
                
            }
            
            export type repetition = {
                readonly 'expression': s_self.structure.Regular_Expression.type_.repetition.expression
                readonly 'quantity': s_self.structure.Regular_Expression.type_.repetition.quantity
            }
            
            export namespace repetition {
                
                export type expression = s_self.structure.Regular_Expression
                
                export type quantity =
                    | readonly ['optional', s_self.structure.Regular_Expression.type_.repetition.quantity.type_.optional]
                    | readonly ['zero or more', s_self.structure.Regular_Expression.type_.repetition.quantity.type_.zero_or_more]
                    | readonly ['one or more', s_self.structure.Regular_Expression.type_.repetition.quantity.type_.one_or_more]
                
                export namespace quantity {
                    export namespace type_ {
                        
                        export type optional = null
                        
                        export type zero_or_more = null
                        
                        export type one_or_more = null
                        
                    }
                    
                }
                
            }
            
        }
        
    }
    
    export type Structure = {
        readonly 'namespaces': s_self.structure.Structure.namespaces
        readonly 'basic types': s_self.structure.Structure.basic_types
        readonly 'types': s_self.structure.Structure.types
    }
    
    export namespace Structure {
        
        export type namespaces = s_self.structure.Namespaces
        
        export type basic_types = s_self.structure.Basic_Types
        
        export type types = s_self.structure.Types
        
    }
    
    export type Value_Result = p_.Optional_Value<s_self.structure.Value_Result.O>
    
    export namespace Value_Result {
        
        export type O = s_self.structure.Value_Reference
        
    }
    
}

export namespace declarations {
    
    export type Presence =
        | readonly ['optional', s_self.declarations.Presence.type_.optional]
        | readonly ['required', s_self.declarations.Presence.type_.required]
    
    export namespace Presence {
        export namespace type_ {
            
            export type optional = null
            
            export type required = null
            
        }
        
    }
    
    export type Signature_Value_Reference = {
        readonly 'type': s_self.declarations.Signature_Value_Reference.type_
        readonly 'subselection': s_self.declarations.Signature_Value_Reference.subselection
    }
    
    export namespace Signature_Value_Reference {
        
        export type type_ = {
            readonly 'location': s_self.declarations.Signature_Value_Reference.type_.location
        }
        
        export namespace type_ {
            
            export type location =
                | readonly ['local', s_self.declarations.Signature_Value_Reference.type_.location.type_.local]
                | readonly ['child namespace', s_self.declarations.Signature_Value_Reference.type_.location.type_.child_namespace]
                | readonly ['sibling namespace', s_self.declarations.Signature_Value_Reference.type_.location.type_.sibling_namespace]
            
            export namespace location {
                export namespace type_ {
                    
                    export type local = string
                    
                    export type child_namespace = {
                        readonly 'namespace': s_self.declarations.Signature_Value_Reference.type_.location.type_.child_namespace.namespace
                        readonly 'type': s_self.declarations.Signature_Value_Reference.type_.location.type_.child_namespace.type_
                    }
                    
                    export namespace child_namespace {
                        
                        export type namespace = string
                        
                        export type type_ = string
                        
                    }
                    
                    export type sibling_namespace = {
                        readonly 'namespace': s_self.declarations.Signature_Value_Reference.type_.location.type_.sibling_namespace.namespace
                        readonly 'type': s_self.declarations.Signature_Value_Reference.type_.location.type_.sibling_namespace.type_
                    }
                    
                    export namespace sibling_namespace {
                        
                        export type namespace = string
                        
                        export type type_ = string
                        
                    }
                    
                }
                
            }
            
        }
        
        export type subselection = {
            readonly 'tail': s_self.declarations.Signature_Value_Reference.subselection.tail
        }
        
        export namespace subselection {
            
            export type tail = p_.List<s_self.declarations.Signature_Value_Reference.subselection.tail.L>
            
            export namespace tail {
                
                export type L =
                    | readonly ['dictionary', s_self.declarations.Signature_Value_Reference.subselection.tail.L.type_.dictionary]
                    | readonly ['group', s_self.declarations.Signature_Value_Reference.subselection.tail.L.type_.group]
                    | readonly ['list', s_self.declarations.Signature_Value_Reference.subselection.tail.L.type_.list]
                    | readonly ['optional', s_self.declarations.Signature_Value_Reference.subselection.tail.L.type_.optional]
                    | readonly ['state', s_self.declarations.Signature_Value_Reference.subselection.tail.L.type_.state]
                
                export namespace L {
                    export namespace type_ {
                        
                        export type dictionary = null
                        
                        export type group = string
                        
                        export type list = null
                        
                        export type optional = null
                        
                        export type state = string
                        
                    }
                    
                }
                
            }
            
        }
        
    }
    
    export type Signature = {
        readonly 'values': s_self.declarations.Signature.values
        readonly 'lookups': s_self.declarations.Signature.lookups
    }
    
    export namespace Signature {
        
        export type values = p_.Dictionary<s_self.declarations.Signature.values.D>
        
        export namespace values {
            
            export type D = {
                readonly 'value': s_self.declarations.Signature.values.D.value
                readonly 'presence': s_self.declarations.Signature.values.D.presence
            }
            
            export namespace D {
                
                export type value = s_self.declarations.Signature_Value_Reference
                
                export type presence = s_self.declarations.Presence
                
            }
            
        }
        
        export type lookups = p_.Dictionary<s_self.declarations.Signature.lookups.D>
        
        export namespace lookups {
            
            export type D = {
                readonly 'referent': s_self.declarations.Signature.lookups.D.referent
                readonly 'type': s_self.declarations.Signature.lookups.D.type_
                readonly 'presence': s_self.declarations.Signature.lookups.D.presence
            }
            
            export namespace D {
                
                export type referent = s_self.declarations.Signature_Value_Reference
                
                export type type_ =
                    | readonly ['cyclic', s_self.declarations.Signature.lookups.D.type_.type_.cyclic]
                    | readonly ['acyclic', s_self.declarations.Signature.lookups.D.type_.type_.acyclic]
                
                export namespace type_ {
                    export namespace type_ {
                        
                        export type cyclic = null
                        
                        export type acyclic = null
                        
                    }
                    
                }
                
                export type presence = s_self.declarations.Presence
                
            }
            
        }
        
    }
    
    export type Declarations = p_.Dictionary<s_self.declarations.Declarations.D>
    
    export namespace Declarations {
        
        export type D = s_self.declarations.Declaration
        
    }
    
    export type Declaration = {
        readonly 'signature': s_self.declarations.Declaration.signature
    }
    
    export namespace Declaration {
        
        export type signature =
            | readonly ['local', s_self.declarations.Declaration.signature.type_.local]
            | readonly ['same as', s_self.declarations.Declaration.signature.type_.same_as]
        
        export namespace signature {
            export namespace type_ {
                
                export type local = s_self.declarations.Signature
                
                export type same_as = string
                
            }
            
        }
        
    }
    
    export type Namespaces = p_.Dictionary<s_self.declarations.Namespaces.D>
    
    export namespace Namespaces {
        
        export type D = s_self.declarations.Declaration_Namespace
        
    }
    
    export type Declaration_Namespace = {
        readonly 'namespaces': s_self.declarations.Declaration_Namespace.namespaces
        readonly 'types': s_self.declarations.Declaration_Namespace.types
    }
    
    export namespace Declaration_Namespace {
        
        export type namespaces = s_self.declarations.Namespaces
        
        export type types = s_self.declarations.Declarations
        
    }
    
}

export namespace resolver {
    
    export type Value_Reference = {
        readonly 'type': s_self.resolver.Value_Reference.type_
        readonly 'path': s_self.resolver.Value_Reference.path
    }
    
    export namespace Value_Reference {
        
        export type type_ = {
            readonly 'location': s_self.resolver.Value_Reference.type_.location
        }
        
        export namespace type_ {
            
            export type location =
                | readonly ['local', s_self.resolver.Value_Reference.type_.location.type_.local]
                | readonly ['child namespace', s_self.resolver.Value_Reference.type_.location.type_.child_namespace]
                | readonly ['sibling namespace', s_self.resolver.Value_Reference.type_.location.type_.sibling_namespace]
            
            export namespace location {
                export namespace type_ {
                    
                    export type local = string
                    
                    export type child_namespace = {
                        readonly 'namespace': s_self.resolver.Value_Reference.type_.location.type_.child_namespace.namespace
                        readonly 'type': s_self.resolver.Value_Reference.type_.location.type_.child_namespace.type_
                    }
                    
                    export namespace child_namespace {
                        
                        export type namespace = string
                        
                        export type type_ = string
                        
                    }
                    
                    export type sibling_namespace = {
                        readonly 'namespace': s_self.resolver.Value_Reference.type_.location.type_.sibling_namespace.namespace
                        readonly 'type': s_self.resolver.Value_Reference.type_.location.type_.sibling_namespace.type_
                    }
                    
                    export namespace sibling_namespace {
                        
                        export type namespace = string
                        
                        export type type_ = string
                        
                    }
                    
                }
                
            }
            
        }
        
        export type path = {
            readonly 'tail': s_self.resolver.Value_Reference.path.tail
        }
        
        export namespace path {
            
            export type tail = p_.List<s_self.resolver.Value_Reference.path.tail.L>
            
            export namespace tail {
                
                export type L =
                    | readonly ['dictionary', s_self.resolver.Value_Reference.path.tail.L.type_.dictionary]
                    | readonly ['group', s_self.resolver.Value_Reference.path.tail.L.type_.group]
                    | readonly ['list', s_self.resolver.Value_Reference.path.tail.L.type_.list]
                    | readonly ['optional', s_self.resolver.Value_Reference.path.tail.L.type_.optional]
                    | readonly ['state', s_self.resolver.Value_Reference.path.tail.L.type_.state]
                
                export namespace L {
                    export namespace type_ {
                        
                        export type dictionary = null
                        
                        export type group = string
                        
                        export type list = null
                        
                        export type optional = null
                        
                        export type state = string
                        
                    }
                    
                }
                
            }
            
        }
        
    }
    
    export type Simple_Component_Selection =
        | readonly ['local', s_self.resolver.Simple_Component_Selection.type_.local]
        | readonly ['child namespace', s_self.resolver.Simple_Component_Selection.type_.child_namespace]
        | readonly ['sibling namespace', s_self.resolver.Simple_Component_Selection.type_.sibling_namespace]
    
    export namespace Simple_Component_Selection {
        export namespace type_ {
            
            export type local = string
            
            export type child_namespace = {
                readonly 'namespace': s_self.resolver.Simple_Component_Selection.type_.child_namespace.namespace
                readonly 'type': s_self.resolver.Simple_Component_Selection.type_.child_namespace.type_
            }
            
            export namespace child_namespace {
                
                export type namespace = string
                
                export type type_ = string
                
            }
            
            export type sibling_namespace = {
                readonly 'namespace': s_self.resolver.Simple_Component_Selection.type_.sibling_namespace.namespace
                readonly 'type': s_self.resolver.Simple_Component_Selection.type_.sibling_namespace.type_
            }
            
            export namespace sibling_namespace {
                
                export type namespace = string
                
                export type type_ = string
                
            }
            
        }
        
    }
    
    export type Relative_Value_Selection = {
        readonly 'path': s_self.resolver.Relative_Value_Selection.path
    }
    
    export namespace Relative_Value_Selection {
        
        export type path = p_.List<s_self.resolver.Relative_Value_Selection.path.L>
        
        export namespace path {
            
            export type L =
                | readonly ['benchmark link', s_self.resolver.Relative_Value_Selection.path.L.type_.benchmark_link]
                | readonly ['simple component', s_self.resolver.Relative_Value_Selection.path.L.type_.simple_component]
                | readonly ['component constraint', s_self.resolver.Relative_Value_Selection.path.L.type_.component_constraint]
                | readonly ['navigable component', s_self.resolver.Relative_Value_Selection.path.L.type_.navigable_component]
                | readonly ['group', s_self.resolver.Relative_Value_Selection.path.L.type_.group]
                | readonly ['list result', s_self.resolver.Relative_Value_Selection.path.L.type_.list_result]
                | readonly ['option constraint', s_self.resolver.Relative_Value_Selection.path.L.type_.option_constraint]
                | readonly ['optional', s_self.resolver.Relative_Value_Selection.path.L.type_.optional]
                | readonly ['optional value constraint', s_self.resolver.Relative_Value_Selection.path.L.type_.optional_value_constraint]
                | readonly ['reference constraint', s_self.resolver.Relative_Value_Selection.path.L.type_.reference_constraint]
                | readonly ['reference', s_self.resolver.Relative_Value_Selection.path.L.type_.reference]
                | readonly ['state result', s_self.resolver.Relative_Value_Selection.path.L.type_.state_result]
            
            export namespace L {
                export namespace type_ {
                    
                    export type benchmark_link = s_self.resolver.Value_Reference
                    
                    export type simple_component = s_self.resolver.Simple_Component_Selection
                    
                    export type component_constraint = {
                        readonly 'name': s_self.resolver.Relative_Value_Selection.path.L.type_.component_constraint.name
                        readonly 'target': s_self.resolver.Relative_Value_Selection.path.L.type_.component_constraint.target
                    }
                    
                    export namespace component_constraint {
                        
                        export type name = string
                        
                        export type target = s_self.resolver.Value_Reference
                        
                    }
                    
                    export type navigable_component = null
                    
                    export type group = string
                    
                    export type list_result = null
                    
                    export type option_constraint = {
                        readonly 'option': s_self.resolver.Relative_Value_Selection.path.L.type_.option_constraint.option
                        readonly 'constraint': s_self.resolver.Relative_Value_Selection.path.L.type_.option_constraint.constraint
                    }
                    
                    export namespace option_constraint {
                        
                        export type option = string
                        
                        export type constraint = string
                        
                    }
                    
                    export type optional = null
                    
                    export type optional_value_constraint = string
                    
                    export type reference_constraint = string
                    
                    export type reference = null
                    
                    export type state_result = null
                    
                }
                
            }
            
        }
        
    }
    
    export type Possible_Value_Selection =
        | readonly ['optional value', s_self.resolver.Possible_Value_Selection.type_.optional_value]
        | readonly ['parameter', s_self.resolver.Possible_Value_Selection.type_.parameter]
        | readonly ['result', s_self.resolver.Possible_Value_Selection.type_.result]
    
    export namespace Possible_Value_Selection {
        export namespace type_ {
            
            export type optional_value = {
                readonly 'selection': s_self.resolver.Possible_Value_Selection.type_.optional_value.selection
                readonly 'tail': s_self.resolver.Possible_Value_Selection.type_.optional_value.tail
            }
            
            export namespace optional_value {
                
                export type selection = s_self.resolver.Guaranteed_Value_Selection
                
                export type tail = s_self.resolver.Relative_Value_Selection
                
            }
            
            export type parameter = string
            
            export type result =
                | readonly ['state', s_self.resolver.Possible_Value_Selection.type_.result.type_.state]
                | readonly ['optional value', s_self.resolver.Possible_Value_Selection.type_.result.type_.optional_value]
            
            export namespace result {
                export namespace type_ {
                    
                    export type state = {
                        readonly 'property': s_self.resolver.Possible_Value_Selection.type_.result.type_.state.property
                    }
                    
                    export namespace state {
                        
                        export type property = string
                        
                    }
                    
                    export type optional_value = {
                        readonly 'property': s_self.resolver.Possible_Value_Selection.type_.result.type_.optional_value.property
                    }
                    
                    export namespace optional_value {
                        
                        export type property = string
                        
                    }
                    
                }
                
            }
            
        }
        
    }
    
    export type Option_Constraints = p_.Optional_Value<s_self.resolver.Option_Constraints.O>
    
    export namespace Option_Constraints {
        
        export type O = p_.Dictionary<s_self.resolver.Option_Constraints.O.D>
        
        export namespace O {
            
            export type D =
                | readonly ['state', s_self.resolver.Option_Constraints.O.D.type_.state]
                | readonly ['assert is set', s_self.resolver.Option_Constraints.O.D.type_.assert_is_set]
            
            export namespace D {
                export namespace type_ {
                    
                    export type state = {
                        readonly 'selection': s_self.resolver.Option_Constraints.O.D.type_.state.selection
                        readonly 'option': s_self.resolver.Option_Constraints.O.D.type_.state.option
                    }
                    
                    export namespace state {
                        
                        export type selection = s_self.resolver.Guaranteed_Value_Selection
                        
                        export type option = string
                        
                    }
                    
                    export type assert_is_set = s_self.resolver.Possible_Value_Selection
                    
                }
                
            }
            
        }
        
    }
    
    export type Guaranteed_Value_Selection = {
        readonly 'start': s_self.resolver.Guaranteed_Value_Selection.start
        readonly 'tail': s_self.resolver.Guaranteed_Value_Selection.tail
    }
    
    export namespace Guaranteed_Value_Selection {
        
        export type start =
            | readonly ['optional fallback', s_self.resolver.Guaranteed_Value_Selection.start.type_.optional_fallback]
            | readonly ['sibling property', s_self.resolver.Guaranteed_Value_Selection.start.type_.sibling_property]
            | readonly ['parent sibling', s_self.resolver.Guaranteed_Value_Selection.start.type_.parent_sibling]
            | readonly ['option constraint', s_self.resolver.Guaranteed_Value_Selection.start.type_.option_constraint]
            | readonly ['sibling option constraint', s_self.resolver.Guaranteed_Value_Selection.start.type_.sibling_option_constraint]
            | readonly ['list cursor', s_self.resolver.Guaranteed_Value_Selection.start.type_.list_cursor]
            | readonly ['linked entry', s_self.resolver.Guaranteed_Value_Selection.start.type_.linked_entry]
            | readonly ['constraint', s_self.resolver.Guaranteed_Value_Selection.start.type_.constraint]
            | readonly ['parameter', s_self.resolver.Guaranteed_Value_Selection.start.type_.parameter]
            | readonly ['result', s_self.resolver.Guaranteed_Value_Selection.start.type_.result]
        
        export namespace start {
            export namespace type_ {
                
                export type optional_fallback = {
                    readonly 'selection': s_self.resolver.Guaranteed_Value_Selection.start.type_.optional_fallback.selection
                    readonly 'fallback': s_self.resolver.Guaranteed_Value_Selection.start.type_.optional_fallback.fallback
                }
                
                export namespace optional_fallback {
                    
                    export type selection = s_self.resolver.Possible_Value_Selection
                    
                    export type fallback = s_self.resolver.Guaranteed_Value_Selection
                    
                }
                
                export type sibling_property = string
                
                export type parent_sibling = string
                
                export type option_constraint = string
                
                export type sibling_option_constraint = string
                
                export type list_cursor = null
                
                export type linked_entry = null
                
                export type constraint =
                    | readonly ['component', s_self.resolver.Guaranteed_Value_Selection.start.type_.constraint.type_.component]
                    | readonly ['reference', s_self.resolver.Guaranteed_Value_Selection.start.type_.constraint.type_.reference]
                
                export namespace constraint {
                    export namespace type_ {
                        
                        export type component = {
                            readonly 'property': s_self.resolver.Guaranteed_Value_Selection.start.type_.constraint.type_.component.property
                            readonly 'constraint': s_self.resolver.Guaranteed_Value_Selection.start.type_.constraint.type_.component.constraint
                        }
                        
                        export namespace component {
                            
                            export type property = string
                            
                            export type constraint = string
                            
                        }
                        
                        export type reference = {
                            readonly 'property': s_self.resolver.Guaranteed_Value_Selection.start.type_.constraint.type_.reference.property
                            readonly 'constraint': s_self.resolver.Guaranteed_Value_Selection.start.type_.constraint.type_.reference.constraint
                        }
                        
                        export namespace reference {
                            
                            export type property = string
                            
                            export type constraint = string
                            
                        }
                        
                    }
                    
                }
                
                export type parameter = string
                
                export type result =
                    | readonly ['list', s_self.resolver.Guaranteed_Value_Selection.start.type_.result.type_.list]
                    | readonly ['state', s_self.resolver.Guaranteed_Value_Selection.start.type_.result.type_.state]
                    | readonly ['optional value', s_self.resolver.Guaranteed_Value_Selection.start.type_.result.type_.optional_value]
                
                export namespace result {
                    export namespace type_ {
                        
                        export type list = {
                            readonly 'property': s_self.resolver.Guaranteed_Value_Selection.start.type_.result.type_.list.property
                        }
                        
                        export namespace list {
                            
                            export type property = string
                            
                        }
                        
                        export type state = {
                            readonly 'property': s_self.resolver.Guaranteed_Value_Selection.start.type_.result.type_.state.property
                        }
                        
                        export namespace state {
                            
                            export type property = string
                            
                        }
                        
                        export type optional_value = {
                            readonly 'property': s_self.resolver.Guaranteed_Value_Selection.start.type_.result.type_.optional_value.property
                        }
                        
                        export namespace optional_value {
                            
                            export type property = string
                            
                        }
                        
                    }
                    
                }
                
            }
            
        }
        
        export type tail = s_self.resolver.Relative_Value_Selection
        
    }
    
    export type Lookup_Selection = {
        readonly 'type': s_self.resolver.Lookup_Selection.type_
    }
    
    export namespace Lookup_Selection {
        
        export type type_ =
            | readonly ['acyclic', s_self.resolver.Lookup_Selection.type_.type_.acyclic]
            | readonly ['cyclic', s_self.resolver.Lookup_Selection.type_.type_.cyclic]
            | readonly ['parameter', s_self.resolver.Lookup_Selection.type_.type_.parameter]
        
        export namespace type_ {
            export namespace type_ {
                
                export type acyclic =
                    | readonly ['siblings', s_self.resolver.Lookup_Selection.type_.type_.acyclic.type_.siblings]
                    | readonly ['resolved dictionary', s_self.resolver.Lookup_Selection.type_.type_.acyclic.type_.resolved_dictionary]
                
                export namespace acyclic {
                    export namespace type_ {
                        
                        export type siblings = null
                        
                        export type resolved_dictionary = {
                            readonly 'selection': s_self.resolver.Lookup_Selection.type_.type_.acyclic.type_.resolved_dictionary.selection
                        }
                        
                        export namespace resolved_dictionary {
                            
                            export type selection = s_self.resolver.Guaranteed_Value_Selection
                            
                        }
                        
                    }
                    
                }
                
                export type cyclic =
                    | readonly ['siblings', s_self.resolver.Lookup_Selection.type_.type_.cyclic.type_.siblings]
                
                export namespace cyclic {
                    export namespace type_ {
                        
                        export type siblings = null
                        
                    }
                    
                }
                
                export type parameter = string
                
            }
            
        }
        
    }
    
    export type Reference_Constraints = p_.Optional_Value<s_self.resolver.Reference_Constraints.O>
    
    export namespace Reference_Constraints {
        
        export type O = p_.Dictionary<s_self.resolver.Reference_Constraints.O.D>
        
        export namespace O {
            
            export type D = {
                readonly 'start': s_self.resolver.Reference_Constraints.O.D.start
                readonly 'constraint': s_self.resolver.Reference_Constraints.O.D.constraint
            }
            
            export namespace D {
                
                export type start =
                    | readonly ['value', s_self.resolver.Reference_Constraints.O.D.start.type_.value]
                    | readonly ['sibling', s_self.resolver.Reference_Constraints.O.D.start.type_.sibling]
                
                export namespace start {
                    export namespace type_ {
                        
                        export type value = null
                        
                        export type sibling = string
                        
                    }
                    
                }
                
                export type constraint = {
                    readonly 'selection': s_self.resolver.Reference_Constraints.O.D.constraint.selection
                    readonly 'type': s_self.resolver.Reference_Constraints.O.D.constraint.type_
                }
                
                export namespace constraint {
                    
                    export type selection = s_self.resolver.Relative_Value_Selection
                    
                    export type type_ =
                        | readonly ['state', s_self.resolver.Reference_Constraints.O.D.constraint.type_.type_.state]
                        | readonly ['optional value', s_self.resolver.Reference_Constraints.O.D.constraint.type_.type_.optional_value]
                    
                    export namespace type_ {
                        export namespace type_ {
                            
                            export type state = {
                                readonly 'option': s_self.resolver.Reference_Constraints.O.D.constraint.type_.type_.state.option
                            }
                            
                            export namespace state {
                                
                                export type option = string
                                
                            }
                            
                            export type optional_value = null
                            
                        }
                        
                    }
                    
                }
                
            }
            
        }
        
    }
    
    export type Resolver = {
        readonly 'namespaces': s_self.resolver.Resolver.namespaces
        readonly 'types': s_self.resolver.Resolver.types
    }
    
    export namespace Resolver {
        
        export type namespaces = p_.Dictionary<s_self.resolver.Resolver.namespaces.D>
        
        export namespace namespaces {
            
            export type D = s_self.resolver.Resolver
            
        }
        
        export type types = p_.Dictionary<s_self.resolver.Resolver.types.D>
        
        export namespace types {
            
            export type D = {
                readonly 'root value resolver': s_self.resolver.Resolver.types.D.root_value_resolver
            }
            
            export namespace D {
                
                export type root_value_resolver = s_self.resolver.Value
                
            }
            
        }
        
    }
    
    export type Result_Selection =
        | readonly ['context', s_self.resolver.Result_Selection.type_.context]
        | readonly ['value', s_self.resolver.Result_Selection.type_.value]
    
    export namespace Result_Selection {
        export namespace type_ {
            
            export type context = s_self.resolver.Guaranteed_Value_Selection
            
            export type value = s_self.resolver.Relative_Value_Selection
            
        }
        
    }
    
    export type Checks = p_.Optional_Value<s_self.resolver.Checks.O>
    
    export namespace Checks {
        
        export type O = p_.Dictionary<s_self.resolver.Checks.O.D>
        
        export namespace O {
            
            export type D = {
                readonly 'expected': s_self.resolver.Checks.O.D.expected
                readonly 'actual': s_self.resolver.Checks.O.D.actual
            }
            
            export namespace D {
                
                export type expected = s_self.resolver.Result_Selection
                
                export type actual = s_self.resolver.Result_Selection
                
            }
            
        }
        
    }
    
    export type Value =
        | readonly ['component', s_self.resolver.Value.type_.component]
        | readonly ['dictionary', s_self.resolver.Value.type_.dictionary]
        | readonly ['group', s_self.resolver.Value.type_.group]
        | readonly ['list', s_self.resolver.Value.type_.list]
        | readonly ['nothing', s_self.resolver.Value.type_.nothing]
        | readonly ['simple', s_self.resolver.Value.type_.simple]
        | readonly ['optional', s_self.resolver.Value.type_.optional]
        | readonly ['reference', s_self.resolver.Value.type_.reference]
        | readonly ['state', s_self.resolver.Value.type_.state]
    
    export namespace Value {
        export namespace type_ {
            
            export type component = {
                readonly 'location': s_self.resolver.Value.type_.component.location
                readonly 'arguments': s_self.resolver.Value.type_.component.arguments_
                readonly 'constraints': s_self.resolver.Value.type_.component.constraints
            }
            
            export namespace component {
                
                export type location =
                    | readonly ['local', s_self.resolver.Value.type_.component.location.type_.local]
                    | readonly ['child namespace', s_self.resolver.Value.type_.component.location.type_.child_namespace]
                    | readonly ['sibling namespace', s_self.resolver.Value.type_.component.location.type_.sibling_namespace]
                
                export namespace location {
                    export namespace type_ {
                        
                        export type local = string
                        
                        export type child_namespace = {
                            readonly 'namespace': s_self.resolver.Value.type_.component.location.type_.child_namespace.namespace
                            readonly 'resolver': s_self.resolver.Value.type_.component.location.type_.child_namespace.resolver
                        }
                        
                        export namespace child_namespace {
                            
                            export type namespace = string
                            
                            export type resolver = string
                            
                        }
                        
                        export type sibling_namespace = {
                            readonly 'namespace': s_self.resolver.Value.type_.component.location.type_.sibling_namespace.namespace
                            readonly 'resolver': s_self.resolver.Value.type_.component.location.type_.sibling_namespace.resolver
                        }
                        
                        export namespace sibling_namespace {
                            
                            export type namespace = string
                            
                            export type resolver = string
                            
                        }
                        
                    }
                    
                }
                
                export type arguments_ = p_.Optional_Value<s_self.resolver.Value.type_.component.arguments_.O>
                
                export namespace arguments_ {
                    
                    export type O = {
                        readonly 'types': s_self.resolver.Value.type_.component.arguments_.O.types
                        readonly 'lookups': s_self.resolver.Value.type_.component.arguments_.O.lookups
                    }
                    
                    export namespace O {
                        
                        export type types = p_.Optional_Value<s_self.resolver.Value.type_.component.arguments_.O.types.O>
                        
                        export namespace types {
                            
                            export type O = p_.Dictionary<s_self.resolver.Value.type_.component.arguments_.O.types.O.D>
                            
                            export namespace O {
                                
                                export type D =
                                    | readonly ['optional', s_self.resolver.Value.type_.component.arguments_.O.types.O.D.type_.optional]
                                    | readonly ['required', s_self.resolver.Value.type_.component.arguments_.O.types.O.D.type_.required]
                                    | readonly ['parameter', s_self.resolver.Value.type_.component.arguments_.O.types.O.D.type_.parameter]
                                
                                export namespace D {
                                    export namespace type_ {
                                        
                                        export type optional =
                                            | readonly ['not set', s_self.resolver.Value.type_.component.arguments_.O.types.O.D.type_.optional.type_.not_set]
                                            | readonly ['set', s_self.resolver.Value.type_.component.arguments_.O.types.O.D.type_.optional.type_.set_]
                                            | readonly ['selection', s_self.resolver.Value.type_.component.arguments_.O.types.O.D.type_.optional.type_.selection]
                                        
                                        export namespace optional {
                                            export namespace type_ {
                                                
                                                export type not_set = null
                                                
                                                export type set_ = s_self.resolver.Guaranteed_Value_Selection
                                                
                                                export type selection = s_self.resolver.Possible_Value_Selection
                                                
                                            }
                                            
                                        }
                                        
                                        export type required = s_self.resolver.Guaranteed_Value_Selection
                                        
                                        export type parameter = string
                                        
                                    }
                                    
                                }
                                
                            }
                            
                        }
                        
                        export type lookups = p_.Optional_Value<s_self.resolver.Value.type_.component.arguments_.O.lookups.O>
                        
                        export namespace lookups {
                            
                            export type O = p_.Dictionary<s_self.resolver.Value.type_.component.arguments_.O.lookups.O.D>
                            
                            export namespace O {
                                
                                export type D =
                                    | readonly ['acyclic', s_self.resolver.Value.type_.component.arguments_.O.lookups.O.D.type_.acyclic]
                                    | readonly ['cyclic', s_self.resolver.Value.type_.component.arguments_.O.lookups.O.D.type_.cyclic]
                                    | readonly ['selection', s_self.resolver.Value.type_.component.arguments_.O.lookups.O.D.type_.selection]
                                
                                export namespace D {
                                    export namespace type_ {
                                        
                                        export type acyclic = null
                                        
                                        export type cyclic = null
                                        
                                        export type selection = s_self.resolver.Lookup_Selection
                                        
                                    }
                                    
                                }
                                
                            }
                            
                        }
                        
                    }
                    
                }
                
                export type constraints = s_self.resolver.Reference_Constraints
                
            }
            
            export type dictionary = {
                readonly 'resolver': s_self.resolver.Value.type_.dictionary.resolver
                readonly 'benchmark': s_self.resolver.Value.type_.dictionary.benchmark
            }
            
            export namespace dictionary {
                
                export type resolver = s_self.resolver.Value
                
                export type benchmark = p_.Optional_Value<s_self.resolver.Value.type_.dictionary.benchmark.O>
                
                export namespace benchmark {
                    
                    export type O = {
                        readonly 'selection': s_self.resolver.Value.type_.dictionary.benchmark.O.selection
                    }
                    
                    export namespace O {
                        
                        export type selection = s_self.resolver.Guaranteed_Value_Selection
                        
                    }
                    
                }
                
            }
            
            export type group = p_.Dictionary<s_self.resolver.Value.type_.group.D>
            
            export namespace group {
                
                export type D = {
                    readonly 'resolver': s_self.resolver.Value.type_.group.D.resolver
                }
                
                export namespace D {
                    
                    export type resolver = s_self.resolver.Value
                    
                }
                
            }
            
            export type list = {
                readonly 'resolver': s_self.resolver.Value.type_.list.resolver
                readonly 'result': s_self.resolver.Value.type_.list.result
            }
            
            export namespace list {
                
                export type resolver = s_self.resolver.Value
                
                export type result = p_.Optional_Value<s_self.resolver.Value.type_.list.result.O>
                
                export namespace result {
                    
                    export type O = {
                        readonly 'initial': s_self.resolver.Value.type_.list.result.O.initial
                        readonly 'next': s_self.resolver.Value.type_.list.result.O.next
                    }
                    
                    export namespace O {
                        
                        export type initial = s_self.resolver.Guaranteed_Value_Selection
                        
                        export type next = s_self.resolver.Result_Selection
                        
                    }
                    
                }
                
            }
            
            export type nothing = null
            
            export type simple = null
            
            export type optional = {
                readonly 'presence': s_self.resolver.Value.type_.optional.presence
                readonly 'constraints': s_self.resolver.Value.type_.optional.constraints
                readonly 'resolver': s_self.resolver.Value.type_.optional.resolver
                readonly 'not set constraints': s_self.resolver.Value.type_.optional.not_set_constraints
                readonly 'result': s_self.resolver.Value.type_.optional.result
                readonly 'checks': s_self.resolver.Value.type_.optional.checks
            }
            
            export namespace optional {
                
                export type presence = p_.Optional_Value<s_self.resolver.Value.type_.optional.presence.O>
                
                export namespace presence {
                    
                    export type O = s_self.resolver.Possible_Value_Selection
                    
                }
                
                export type constraints = s_self.resolver.Option_Constraints
                
                export type resolver = s_self.resolver.Value
                
                export type not_set_constraints = p_.Optional_Value<s_self.resolver.Value.type_.optional.not_set_constraints.O>
                
                export namespace not_set_constraints {
                    
                    export type O = p_.Dictionary<s_self.resolver.Value.type_.optional.not_set_constraints.O.D>
                    
                    export namespace O {
                        
                        export type D = s_self.resolver.Possible_Value_Selection
                        
                    }
                    
                }
                
                export type result = p_.Optional_Value<s_self.resolver.Value.type_.optional.result.O>
                
                export namespace result {
                    
                    export type O = s_self.resolver.Result_Selection
                    
                }
                
                export type checks = s_self.resolver.Checks
                
            }
            
            export type reference = {
                readonly 'type': s_self.resolver.Value.type_.reference.type_
            }
            
            export namespace reference {
                
                export type type_ = {
                    readonly 'lookup': s_self.resolver.Value.type_.reference.type_.lookup
                    readonly 'constraints': s_self.resolver.Value.type_.reference.type_.constraints
                }
                
                export namespace type_ {
                    
                    export type lookup = s_self.resolver.Lookup_Selection
                    
                    export type constraints = s_self.resolver.Reference_Constraints
                    
                }
                
            }
            
            export type state = {
                readonly 'options': s_self.resolver.Value.type_.state.options
            }
            
            export namespace state {
                
                export type options = p_.Dictionary<s_self.resolver.Value.type_.state.options.D>
                
                export namespace options {
                    
                    export type D = {
                        readonly 'constraints': s_self.resolver.Value.type_.state.options.D.constraints
                        readonly 'resolver': s_self.resolver.Value.type_.state.options.D.resolver
                        readonly 'result': s_self.resolver.Value.type_.state.options.D.result
                        readonly 'checks': s_self.resolver.Value.type_.state.options.D.checks
                    }
                    
                    export namespace D {
                        
                        export type constraints = s_self.resolver.Option_Constraints
                        
                        export type resolver = s_self.resolver.Value
                        
                        export type result = p_.Optional_Value<s_self.resolver.Value.type_.state.options.D.result.O>
                        
                        export namespace result {
                            
                            export type O = s_self.resolver.Result_Selection
                            
                        }
                        
                        export type checks = s_self.resolver.Checks
                        
                    }
                    
                }
                
            }
            
        }
        
    }
    
}
