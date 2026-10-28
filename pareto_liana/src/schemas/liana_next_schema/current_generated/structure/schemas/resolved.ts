import type * as p_ from 'pareto-core/schema'

import type * as s_self from "./resolved.js"

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
            
            export type type_ = {
                readonly 'constraints': s_self.Node.type_.file.type_.constraints
                readonly 'value': s_self.Node.type_.file.type_.value
            }
            
            export namespace type_ {
                
                export type constraints = {
                    readonly 'public': s_self.Node.type_.file.type_.constraints.public_
                }
                
                export namespace constraints {
                    
                    export type public_ = s_self.structure.Type.visibility.type_.public_
                    
                }
                
                export type value = {
                    readonly 'l entry': s_self.Node.type_.file.type_.value.l_entry
                    readonly 'l id': s_self.Node.type_.file.type_.value.l_id
                }
                
                export namespace value {
                    
                    export type l_entry = s_self.structure.Types.D
                    
                    export type l_id = string
                    
                }
                
            }
            
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
                                
                                export type local = {
                                    readonly 'l entry': s_self.structure.Value.type_.component.type_.type_.simple.type_.local.l_entry
                                    readonly 'l id': s_self.structure.Value.type_.component.type_.type_.simple.type_.local.l_id
                                }
                                
                                export namespace local {
                                    
                                    export type l_entry = p_.Circular_Dependency<s_self.structure.Types.D>
                                    
                                    export type l_id = string
                                    
                                }
                                
                                export type child_namespace = {
                                    readonly 'namespace': s_self.structure.Value.type_.component.type_.type_.simple.type_.child_namespace.namespace
                                    readonly 'type': s_self.structure.Value.type_.component.type_.type_.simple.type_.child_namespace.type_
                                }
                                
                                export namespace child_namespace {
                                    
                                    export type namespace = {
                                        readonly 'l entry': s_self.structure.Value.type_.component.type_.type_.simple.type_.child_namespace.namespace.l_entry
                                        readonly 'l id': s_self.structure.Value.type_.component.type_.type_.simple.type_.child_namespace.namespace.l_id
                                    }
                                    
                                    export namespace namespace {
                                        
                                        export type l_entry = s_self.structure.Namespaces.D
                                        
                                        export type l_id = string
                                        
                                    }
                                    
                                    export type type_ = {
                                        readonly 'constraints': s_self.structure.Value.type_.component.type_.type_.simple.type_.child_namespace.type_.constraints
                                        readonly 'value': s_self.structure.Value.type_.component.type_.type_.simple.type_.child_namespace.type_.value
                                    }
                                    
                                    export namespace type_ {
                                        
                                        export type constraints = {
                                            readonly 'public': s_self.structure.Value.type_.component.type_.type_.simple.type_.child_namespace.type_.constraints.public_
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type public_ = s_self.structure.Type.visibility.type_.public_
                                            
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': s_self.structure.Value.type_.component.type_.type_.simple.type_.child_namespace.type_.value.l_entry
                                            readonly 'l id': s_self.structure.Value.type_.component.type_.type_.simple.type_.child_namespace.type_.value.l_id
                                        }
                                        
                                        export namespace value {
                                            
                                            export type l_entry = s_self.structure.Types.D
                                            
                                            export type l_id = string
                                            
                                        }
                                        
                                    }
                                    
                                }
                                
                                export type sibling_namespace = {
                                    readonly 'namespace': s_self.structure.Value.type_.component.type_.type_.simple.type_.sibling_namespace.namespace
                                    readonly 'type': s_self.structure.Value.type_.component.type_.type_.simple.type_.sibling_namespace.type_
                                }
                                
                                export namespace sibling_namespace {
                                    
                                    export type namespace = {
                                        readonly 'l entry': s_self.structure.Value.type_.component.type_.type_.simple.type_.sibling_namespace.namespace.l_entry
                                        readonly 'l id': s_self.structure.Value.type_.component.type_.type_.simple.type_.sibling_namespace.namespace.l_id
                                    }
                                    
                                    export namespace namespace {
                                        
                                        export type l_entry = s_self.structure.Namespaces.D
                                        
                                        export type l_id = string
                                        
                                    }
                                    
                                    export type type_ = {
                                        readonly 'constraints': s_self.structure.Value.type_.component.type_.type_.simple.type_.sibling_namespace.type_.constraints
                                        readonly 'value': s_self.structure.Value.type_.component.type_.type_.simple.type_.sibling_namespace.type_.value
                                    }
                                    
                                    export namespace type_ {
                                        
                                        export type constraints = {
                                            readonly 'public': s_self.structure.Value.type_.component.type_.type_.simple.type_.sibling_namespace.type_.constraints.public_
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type public_ = s_self.structure.Type.visibility.type_.public_
                                            
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': s_self.structure.Value.type_.component.type_.type_.simple.type_.sibling_namespace.type_.value.l_entry
                                            readonly 'l id': s_self.structure.Value.type_.component.type_.type_.simple.type_.sibling_namespace.type_.value.l_id
                                        }
                                        
                                        export namespace value {
                                            
                                            export type l_entry = s_self.structure.Types.D
                                            
                                            export type l_id = string
                                            
                                        }
                                        
                                    }
                                    
                                }
                                
                            }
                            
                        }
                        
                        export type navigable = {
                            readonly 'value': s_self.structure.Value.type_.component.type_.type_.navigable.value
                            readonly 'result': s_self.structure.Value.type_.component.type_.type_.navigable.result
                        }
                        
                        export namespace navigable {
                            
                            export type value =
                                | readonly ['local', s_self.structure.Value.type_.component.type_.type_.navigable.value.type_.local]
                                | readonly ['child namespace', s_self.structure.Value.type_.component.type_.type_.navigable.value.type_.child_namespace]
                                | readonly ['sibling namespace', s_self.structure.Value.type_.component.type_.type_.navigable.value.type_.sibling_namespace]
                            
                            export namespace value {
                                export namespace type_ {
                                    
                                    export type local = {
                                        readonly 'l entry': s_self.structure.Value.type_.component.type_.type_.navigable.value.type_.local.l_entry
                                        readonly 'l id': s_self.structure.Value.type_.component.type_.type_.navigable.value.type_.local.l_id
                                    }
                                    
                                    export namespace local {
                                        
                                        export type l_entry = s_self.structure.Types.D
                                        
                                        export type l_id = string
                                        
                                    }
                                    
                                    export type child_namespace = {
                                        readonly 'namespace': s_self.structure.Value.type_.component.type_.type_.navigable.value.type_.child_namespace.namespace
                                        readonly 'type': s_self.structure.Value.type_.component.type_.type_.navigable.value.type_.child_namespace.type_
                                    }
                                    
                                    export namespace child_namespace {
                                        
                                        export type namespace = {
                                            readonly 'l entry': s_self.structure.Value.type_.component.type_.type_.navigable.value.type_.child_namespace.namespace.l_entry
                                            readonly 'l id': s_self.structure.Value.type_.component.type_.type_.navigable.value.type_.child_namespace.namespace.l_id
                                        }
                                        
                                        export namespace namespace {
                                            
                                            export type l_entry = s_self.structure.Namespaces.D
                                            
                                            export type l_id = string
                                            
                                        }
                                        
                                        export type type_ = {
                                            readonly 'constraints': s_self.structure.Value.type_.component.type_.type_.navigable.value.type_.child_namespace.type_.constraints
                                            readonly 'value': s_self.structure.Value.type_.component.type_.type_.navigable.value.type_.child_namespace.type_.value
                                        }
                                        
                                        export namespace type_ {
                                            
                                            export type constraints = {
                                                readonly 'public': s_self.structure.Value.type_.component.type_.type_.navigable.value.type_.child_namespace.type_.constraints.public_
                                            }
                                            
                                            export namespace constraints {
                                                
                                                export type public_ = s_self.structure.Type.visibility.type_.public_
                                                
                                            }
                                            
                                            export type value = {
                                                readonly 'l entry': s_self.structure.Value.type_.component.type_.type_.navigable.value.type_.child_namespace.type_.value.l_entry
                                                readonly 'l id': s_self.structure.Value.type_.component.type_.type_.navigable.value.type_.child_namespace.type_.value.l_id
                                            }
                                            
                                            export namespace value {
                                                
                                                export type l_entry = s_self.structure.Types.D
                                                
                                                export type l_id = string
                                                
                                            }
                                            
                                        }
                                        
                                    }
                                    
                                    export type sibling_namespace = {
                                        readonly 'namespace': s_self.structure.Value.type_.component.type_.type_.navigable.value.type_.sibling_namespace.namespace
                                        readonly 'type': s_self.structure.Value.type_.component.type_.type_.navigable.value.type_.sibling_namespace.type_
                                    }
                                    
                                    export namespace sibling_namespace {
                                        
                                        export type namespace = {
                                            readonly 'l entry': s_self.structure.Value.type_.component.type_.type_.navigable.value.type_.sibling_namespace.namespace.l_entry
                                            readonly 'l id': s_self.structure.Value.type_.component.type_.type_.navigable.value.type_.sibling_namespace.namespace.l_id
                                        }
                                        
                                        export namespace namespace {
                                            
                                            export type l_entry = s_self.structure.Namespaces.D
                                            
                                            export type l_id = string
                                            
                                        }
                                        
                                        export type type_ = {
                                            readonly 'constraints': s_self.structure.Value.type_.component.type_.type_.navigable.value.type_.sibling_namespace.type_.constraints
                                            readonly 'value': s_self.structure.Value.type_.component.type_.type_.navigable.value.type_.sibling_namespace.type_.value
                                        }
                                        
                                        export namespace type_ {
                                            
                                            export type constraints = {
                                                readonly 'public': s_self.structure.Value.type_.component.type_.type_.navigable.value.type_.sibling_namespace.type_.constraints.public_
                                            }
                                            
                                            export namespace constraints {
                                                
                                                export type public_ = s_self.structure.Type.visibility.type_.public_
                                                
                                            }
                                            
                                            export type value = {
                                                readonly 'l entry': s_self.structure.Value.type_.component.type_.type_.navigable.value.type_.sibling_namespace.type_.value.l_entry
                                                readonly 'l id': s_self.structure.Value.type_.component.type_.type_.navigable.value.type_.sibling_namespace.type_.value.l_id
                                            }
                                            
                                            export namespace value {
                                                
                                                export type l_entry = s_self.structure.Types.D
                                                
                                                export type l_id = string
                                                
                                            }
                                            
                                        }
                                        
                                    }
                                    
                                }
                                
                            }
                            
                            export type result = s_self.structure.Type
                            
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
            
            export type simple = {
                readonly 'constraints': s_self.structure.Value.type_.simple.constraints
                readonly 'value': s_self.structure.Value.type_.simple.value
            }
            
            export namespace simple {
                
                export type constraints = {
                    readonly 'basic types': s_self.structure.Value.type_.simple.constraints.basic_types
                }
                
                export namespace constraints {
                    
                    export type basic_types = s_self.structure.Basic_Types
                    
                }
                
                export type value = {
                    readonly 'l entry': s_self.structure.Value.type_.simple.value.l_entry
                    readonly 'l id': s_self.structure.Value.type_.simple.value.l_id
                }
                
                export namespace value {
                    
                    export type l_entry = s_self.structure.Basic_Types.D
                    
                    export type l_id = string
                    
                }
                
            }
            
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
                
                export type selection = {
                    readonly 'constraints': s_self.structure.Dictionary.benchmark.O.selection.constraints
                    readonly 'value': s_self.structure.Dictionary.benchmark.O.selection.value
                }
                
                export namespace selection {
                    
                    export type constraints = {
                        readonly 'dictionary': s_self.structure.Dictionary.benchmark.O.selection.constraints.dictionary
                    }
                    
                    export namespace constraints {
                        
                        export type dictionary = s_self.structure.Value.type_.dictionary
                        
                    }
                    
                    export type value = s_self.structure.Value_Reference
                    
                }
                
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
            
            export type location = {
                readonly 'value': s_self.structure.Value_Reference.type_.location.value
                readonly 'result': s_self.structure.Value_Reference.type_.location.result
            }
            
            export namespace location {
                
                export type value =
                    | readonly ['local', s_self.structure.Value_Reference.type_.location.value.type_.local]
                    | readonly ['child namespace', s_self.structure.Value_Reference.type_.location.value.type_.child_namespace]
                    | readonly ['sibling namespace', s_self.structure.Value_Reference.type_.location.value.type_.sibling_namespace]
                
                export namespace value {
                    export namespace type_ {
                        
                        export type local = {
                            readonly 'l entry': s_self.structure.Value_Reference.type_.location.value.type_.local.l_entry
                            readonly 'l id': s_self.structure.Value_Reference.type_.location.value.type_.local.l_id
                        }
                        
                        export namespace local {
                            
                            export type l_entry = s_self.structure.Types.D
                            
                            export type l_id = string
                            
                        }
                        
                        export type child_namespace = {
                            readonly 'namespace': s_self.structure.Value_Reference.type_.location.value.type_.child_namespace.namespace
                            readonly 'type': s_self.structure.Value_Reference.type_.location.value.type_.child_namespace.type_
                        }
                        
                        export namespace child_namespace {
                            
                            export type namespace = {
                                readonly 'l entry': s_self.structure.Value_Reference.type_.location.value.type_.child_namespace.namespace.l_entry
                                readonly 'l id': s_self.structure.Value_Reference.type_.location.value.type_.child_namespace.namespace.l_id
                            }
                            
                            export namespace namespace {
                                
                                export type l_entry = s_self.structure.Namespaces.D
                                
                                export type l_id = string
                                
                            }
                            
                            export type type_ = {
                                readonly 'l entry': s_self.structure.Value_Reference.type_.location.value.type_.child_namespace.type_.l_entry
                                readonly 'l id': s_self.structure.Value_Reference.type_.location.value.type_.child_namespace.type_.l_id
                            }
                            
                            export namespace type_ {
                                
                                export type l_entry = s_self.structure.Types.D
                                
                                export type l_id = string
                                
                            }
                            
                        }
                        
                        export type sibling_namespace = {
                            readonly 'namespace': s_self.structure.Value_Reference.type_.location.value.type_.sibling_namespace.namespace
                            readonly 'type': s_self.structure.Value_Reference.type_.location.value.type_.sibling_namespace.type_
                        }
                        
                        export namespace sibling_namespace {
                            
                            export type namespace = {
                                readonly 'l entry': s_self.structure.Value_Reference.type_.location.value.type_.sibling_namespace.namespace.l_entry
                                readonly 'l id': s_self.structure.Value_Reference.type_.location.value.type_.sibling_namespace.namespace.l_id
                            }
                            
                            export namespace namespace {
                                
                                export type l_entry = s_self.structure.Namespaces.D
                                
                                export type l_id = string
                                
                            }
                            
                            export type type_ = {
                                readonly 'l entry': s_self.structure.Value_Reference.type_.location.value.type_.sibling_namespace.type_.l_entry
                                readonly 'l id': s_self.structure.Value_Reference.type_.location.value.type_.sibling_namespace.type_.l_id
                            }
                            
                            export namespace type_ {
                                
                                export type l_entry = s_self.structure.Types.D
                                
                                export type l_id = string
                                
                            }
                            
                        }
                        
                    }
                    
                }
                
                export type result = s_self.structure.Type
                
            }
            
        }
        
        export type path = {
            readonly 'tail': s_self.structure.Value_Reference.path.tail
        }
        
        export namespace path {
            
            export type tail = {
                readonly 'value': s_self.structure.Value_Reference.path.tail.value
                readonly 'result': s_self.structure.Value_Reference.path.tail.result
            }
            
            export namespace tail {
                
                export type value = p_.List<s_self.structure.Value_Reference.path.tail.value.L>
                
                export namespace value {
                    
                    export type L = {
                        readonly 'value': s_self.structure.Value_Reference.path.tail.value.L.value
                        readonly 'result': s_self.structure.Value_Reference.path.tail.value.L.result
                    }
                    
                    export namespace L {
                        
                        export type value = {
                            readonly 'value': s_self.structure.Value_Reference.path.tail.value.L.value.value
                            readonly 'result': s_self.structure.Value_Reference.path.tail.value.L.value.result
                        }
                        
                        export namespace value {
                            
                            export type value =
                                | readonly ['benchmark', s_self.structure.Value_Reference.path.tail.value.L.value.value.type_.benchmark]
                                | readonly ['dictionary', s_self.structure.Value_Reference.path.tail.value.L.value.value.type_.dictionary]
                                | readonly ['group', s_self.structure.Value_Reference.path.tail.value.L.value.value.type_.group]
                                | readonly ['list', s_self.structure.Value_Reference.path.tail.value.L.value.value.type_.list]
                                | readonly ['optional', s_self.structure.Value_Reference.path.tail.value.L.value.value.type_.optional]
                                | readonly ['state', s_self.structure.Value_Reference.path.tail.value.L.value.value.type_.state]
                            
                            export namespace value {
                                export namespace type_ {
                                    
                                    export type benchmark = {
                                        readonly 'constraints': s_self.structure.Value_Reference.path.tail.value.L.value.value.type_.benchmark.constraints
                                        readonly 'value': s_self.structure.Value_Reference.path.tail.value.L.value.value.type_.benchmark.value
                                    }
                                    
                                    export namespace benchmark {
                                        
                                        export type constraints = {
                                            readonly 'definition': s_self.structure.Value_Reference.path.tail.value.L.value.value.type_.benchmark.constraints.definition
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type definition = s_self.structure.Value.type_.dictionary
                                            
                                        }
                                        
                                        export type value = null
                                        
                                    }
                                    
                                    export type dictionary = {
                                        readonly 'constraints': s_self.structure.Value_Reference.path.tail.value.L.value.value.type_.dictionary.constraints
                                        readonly 'value': s_self.structure.Value_Reference.path.tail.value.L.value.value.type_.dictionary.value
                                    }
                                    
                                    export namespace dictionary {
                                        
                                        export type constraints = {
                                            readonly 'definition': s_self.structure.Value_Reference.path.tail.value.L.value.value.type_.dictionary.constraints.definition
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type definition = s_self.structure.Value.type_.dictionary
                                            
                                        }
                                        
                                        export type value = null
                                        
                                    }
                                    
                                    export type group = {
                                        readonly 'constraints': s_self.structure.Value_Reference.path.tail.value.L.value.value.type_.group.constraints
                                        readonly 'value': s_self.structure.Value_Reference.path.tail.value.L.value.value.type_.group.value
                                    }
                                    
                                    export namespace group {
                                        
                                        export type constraints = {
                                            readonly 'definition': s_self.structure.Value_Reference.path.tail.value.L.value.value.type_.group.constraints.definition
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type definition = s_self.structure.Value.type_.group
                                            
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': s_self.structure.Value_Reference.path.tail.value.L.value.value.type_.group.value.l_entry
                                            readonly 'l id': s_self.structure.Value_Reference.path.tail.value.L.value.value.type_.group.value.l_id
                                        }
                                        
                                        export namespace value {
                                            
                                            export type l_entry = s_self.structure.Group.D
                                            
                                            export type l_id = string
                                            
                                        }
                                        
                                    }
                                    
                                    export type list = {
                                        readonly 'constraints': s_self.structure.Value_Reference.path.tail.value.L.value.value.type_.list.constraints
                                        readonly 'value': s_self.structure.Value_Reference.path.tail.value.L.value.value.type_.list.value
                                    }
                                    
                                    export namespace list {
                                        
                                        export type constraints = {
                                            readonly 'definition': s_self.structure.Value_Reference.path.tail.value.L.value.value.type_.list.constraints.definition
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type definition = s_self.structure.Value.type_.list
                                            
                                        }
                                        
                                        export type value = null
                                        
                                    }
                                    
                                    export type optional = {
                                        readonly 'constraints': s_self.structure.Value_Reference.path.tail.value.L.value.value.type_.optional.constraints
                                        readonly 'value': s_self.structure.Value_Reference.path.tail.value.L.value.value.type_.optional.value
                                    }
                                    
                                    export namespace optional {
                                        
                                        export type constraints = {
                                            readonly 'definition': s_self.structure.Value_Reference.path.tail.value.L.value.value.type_.optional.constraints.definition
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type definition = s_self.structure.Value.type_.optional
                                            
                                        }
                                        
                                        export type value = null
                                        
                                    }
                                    
                                    export type state = {
                                        readonly 'constraints': s_self.structure.Value_Reference.path.tail.value.L.value.value.type_.state.constraints
                                        readonly 'value': s_self.structure.Value_Reference.path.tail.value.L.value.value.type_.state.value
                                    }
                                    
                                    export namespace state {
                                        
                                        export type constraints = {
                                            readonly 'definition': s_self.structure.Value_Reference.path.tail.value.L.value.value.type_.state.constraints.definition
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type definition = s_self.structure.Value.type_.state
                                            
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': s_self.structure.Value_Reference.path.tail.value.L.value.value.type_.state.value.l_entry
                                            readonly 'l id': s_self.structure.Value_Reference.path.tail.value.L.value.value.type_.state.value.l_id
                                        }
                                        
                                        export namespace value {
                                            
                                            export type l_entry = s_self.structure.Value.type_.state.options.D
                                            
                                            export type l_id = string
                                            
                                        }
                                        
                                    }
                                    
                                }
                                
                            }
                            
                            export type result = s_self.structure.Value
                            
                        }
                        
                        export type result = s_self.structure.Value
                        
                    }
                    
                }
                
                export type result = s_self.structure.Value
                
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
        
        export type referent = {
            readonly 'constraints': s_self.structure.Reference.referent.constraints
            readonly 'value': s_self.structure.Reference.referent.value
        }
        
        export namespace referent {
            
            export type constraints = {
                readonly 'dictionary': s_self.structure.Reference.referent.constraints.dictionary
            }
            
            export namespace constraints {
                
                export type dictionary = s_self.structure.Value.type_.dictionary
                
            }
            
            export type value = s_self.structure.Value_Reference
            
        }
        
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
            
            export type location = {
                readonly 'value': s_self.declarations.Signature_Value_Reference.type_.location.value
                readonly 'result': s_self.declarations.Signature_Value_Reference.type_.location.result
            }
            
            export namespace location {
                
                export type value =
                    | readonly ['local', s_self.declarations.Signature_Value_Reference.type_.location.value.type_.local]
                    | readonly ['child namespace', s_self.declarations.Signature_Value_Reference.type_.location.value.type_.child_namespace]
                    | readonly ['sibling namespace', s_self.declarations.Signature_Value_Reference.type_.location.value.type_.sibling_namespace]
                
                export namespace value {
                    export namespace type_ {
                        
                        export type local = {
                            readonly 'l entry': s_self.declarations.Signature_Value_Reference.type_.location.value.type_.local.l_entry
                            readonly 'l id': s_self.declarations.Signature_Value_Reference.type_.location.value.type_.local.l_id
                        }
                        
                        export namespace local {
                            
                            export type l_entry = s_self.structure.Types.D
                            
                            export type l_id = string
                            
                        }
                        
                        export type child_namespace = {
                            readonly 'namespace': s_self.declarations.Signature_Value_Reference.type_.location.value.type_.child_namespace.namespace
                            readonly 'type': s_self.declarations.Signature_Value_Reference.type_.location.value.type_.child_namespace.type_
                        }
                        
                        export namespace child_namespace {
                            
                            export type namespace = {
                                readonly 'l entry': s_self.declarations.Signature_Value_Reference.type_.location.value.type_.child_namespace.namespace.l_entry
                                readonly 'l id': s_self.declarations.Signature_Value_Reference.type_.location.value.type_.child_namespace.namespace.l_id
                            }
                            
                            export namespace namespace {
                                
                                export type l_entry = s_self.structure.Namespaces.D
                                
                                export type l_id = string
                                
                            }
                            
                            export type type_ = {
                                readonly 'l entry': s_self.declarations.Signature_Value_Reference.type_.location.value.type_.child_namespace.type_.l_entry
                                readonly 'l id': s_self.declarations.Signature_Value_Reference.type_.location.value.type_.child_namespace.type_.l_id
                            }
                            
                            export namespace type_ {
                                
                                export type l_entry = s_self.structure.Types.D
                                
                                export type l_id = string
                                
                            }
                            
                        }
                        
                        export type sibling_namespace = {
                            readonly 'namespace': s_self.declarations.Signature_Value_Reference.type_.location.value.type_.sibling_namespace.namespace
                            readonly 'type': s_self.declarations.Signature_Value_Reference.type_.location.value.type_.sibling_namespace.type_
                        }
                        
                        export namespace sibling_namespace {
                            
                            export type namespace = {
                                readonly 'l entry': s_self.declarations.Signature_Value_Reference.type_.location.value.type_.sibling_namespace.namespace.l_entry
                                readonly 'l id': s_self.declarations.Signature_Value_Reference.type_.location.value.type_.sibling_namespace.namespace.l_id
                            }
                            
                            export namespace namespace {
                                
                                export type l_entry = s_self.structure.Namespaces.D
                                
                                export type l_id = string
                                
                            }
                            
                            export type type_ = {
                                readonly 'l entry': s_self.declarations.Signature_Value_Reference.type_.location.value.type_.sibling_namespace.type_.l_entry
                                readonly 'l id': s_self.declarations.Signature_Value_Reference.type_.location.value.type_.sibling_namespace.type_.l_id
                            }
                            
                            export namespace type_ {
                                
                                export type l_entry = s_self.structure.Types.D
                                
                                export type l_id = string
                                
                            }
                            
                        }
                        
                    }
                    
                }
                
                export type result = s_self.structure.Type
                
            }
            
        }
        
        export type subselection = {
            readonly 'tail': s_self.declarations.Signature_Value_Reference.subselection.tail
        }
        
        export namespace subselection {
            
            export type tail = {
                readonly 'value': s_self.declarations.Signature_Value_Reference.subselection.tail.value
                readonly 'result': s_self.declarations.Signature_Value_Reference.subselection.tail.result
            }
            
            export namespace tail {
                
                export type value = p_.List<s_self.declarations.Signature_Value_Reference.subselection.tail.value.L>
                
                export namespace value {
                    
                    export type L = {
                        readonly 'value': s_self.declarations.Signature_Value_Reference.subselection.tail.value.L.value
                        readonly 'result': s_self.declarations.Signature_Value_Reference.subselection.tail.value.L.result
                    }
                    
                    export namespace L {
                        
                        export type value = {
                            readonly 'value': s_self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value
                            readonly 'result': s_self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.result
                        }
                        
                        export namespace value {
                            
                            export type value =
                                | readonly ['dictionary', s_self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.type_.dictionary]
                                | readonly ['group', s_self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.type_.group]
                                | readonly ['list', s_self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.type_.list]
                                | readonly ['optional', s_self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.type_.optional]
                                | readonly ['state', s_self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.type_.state]
                            
                            export namespace value {
                                export namespace type_ {
                                    
                                    export type dictionary = {
                                        readonly 'constraints': s_self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.type_.dictionary.constraints
                                        readonly 'value': s_self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.type_.dictionary.value
                                    }
                                    
                                    export namespace dictionary {
                                        
                                        export type constraints = {
                                            readonly 'definition': s_self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.type_.dictionary.constraints.definition
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type definition = s_self.structure.Value.type_.dictionary
                                            
                                        }
                                        
                                        export type value = null
                                        
                                    }
                                    
                                    export type group = {
                                        readonly 'constraints': s_self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.type_.group.constraints
                                        readonly 'value': s_self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.type_.group.value
                                    }
                                    
                                    export namespace group {
                                        
                                        export type constraints = {
                                            readonly 'definition': s_self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.type_.group.constraints.definition
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type definition = s_self.structure.Value.type_.group
                                            
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': s_self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.type_.group.value.l_entry
                                            readonly 'l id': s_self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.type_.group.value.l_id
                                        }
                                        
                                        export namespace value {
                                            
                                            export type l_entry = s_self.structure.Group.D
                                            
                                            export type l_id = string
                                            
                                        }
                                        
                                    }
                                    
                                    export type list = {
                                        readonly 'constraints': s_self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.type_.list.constraints
                                        readonly 'value': s_self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.type_.list.value
                                    }
                                    
                                    export namespace list {
                                        
                                        export type constraints = {
                                            readonly 'definition': s_self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.type_.list.constraints.definition
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type definition = s_self.structure.Value.type_.list
                                            
                                        }
                                        
                                        export type value = null
                                        
                                    }
                                    
                                    export type optional = {
                                        readonly 'constraints': s_self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.type_.optional.constraints
                                        readonly 'value': s_self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.type_.optional.value
                                    }
                                    
                                    export namespace optional {
                                        
                                        export type constraints = {
                                            readonly 'definition': s_self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.type_.optional.constraints.definition
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type definition = s_self.structure.Value.type_.optional
                                            
                                        }
                                        
                                        export type value = null
                                        
                                    }
                                    
                                    export type state = {
                                        readonly 'constraints': s_self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.type_.state.constraints
                                        readonly 'value': s_self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.type_.state.value
                                    }
                                    
                                    export namespace state {
                                        
                                        export type constraints = {
                                            readonly 'definition': s_self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.type_.state.constraints.definition
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type definition = s_self.structure.Value.type_.state
                                            
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': s_self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.type_.state.value.l_entry
                                            readonly 'l id': s_self.declarations.Signature_Value_Reference.subselection.tail.value.L.value.value.type_.state.value.l_id
                                        }
                                        
                                        export namespace value {
                                            
                                            export type l_entry = s_self.structure.Value.type_.state.options.D
                                            
                                            export type l_id = string
                                            
                                        }
                                        
                                    }
                                    
                                }
                                
                            }
                            
                            export type result = s_self.structure.Value
                            
                        }
                        
                        export type result = s_self.structure.Value
                        
                    }
                    
                }
                
                export type result = s_self.structure.Value
                
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
                
                export type referent = {
                    readonly 'constraints': s_self.declarations.Signature.lookups.D.referent.constraints
                    readonly 'value': s_self.declarations.Signature.lookups.D.referent.value
                }
                
                export namespace referent {
                    
                    export type constraints = {
                        readonly 'dictionary': s_self.declarations.Signature.lookups.D.referent.constraints.dictionary
                    }
                    
                    export namespace constraints {
                        
                        export type dictionary = s_self.structure.Value.type_.dictionary
                        
                    }
                    
                    export type value = s_self.declarations.Signature_Value_Reference
                    
                }
                
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
        
        export type D = {
            readonly 'benchmark': s_self.declarations.Declarations.D.benchmark
            readonly 'value': s_self.declarations.Declarations.D.value
        }
        
        export namespace D {
            
            export type benchmark = s_self.structure.Types.D
            
            export type value = s_self.declarations.Declaration
            
        }
        
    }
    
    export type Declaration = {
        readonly 'signature': s_self.declarations.Declaration.signature
    }
    
    export namespace Declaration {
        
        export type signature = {
            readonly 'value': s_self.declarations.Declaration.signature.value
            readonly 'result': s_self.declarations.Declaration.signature.result
        }
        
        export namespace signature {
            
            export type value =
                | readonly ['local', s_self.declarations.Declaration.signature.value.type_.local]
                | readonly ['same as', s_self.declarations.Declaration.signature.value.type_.same_as]
            
            export namespace value {
                export namespace type_ {
                    
                    export type local = s_self.declarations.Signature
                    
                    export type same_as = {
                        readonly 'l entry': s_self.declarations.Declaration.signature.value.type_.same_as.l_entry
                        readonly 'l id': s_self.declarations.Declaration.signature.value.type_.same_as.l_id
                    }
                    
                    export namespace same_as {
                        
                        export type l_entry = s_self.declarations.Declarations.D
                        
                        export type l_id = string
                        
                    }
                    
                }
                
            }
            
            export type result = s_self.declarations.Signature
            
        }
        
    }
    
    export type Namespaces = p_.Dictionary<s_self.declarations.Namespaces.D>
    
    export namespace Namespaces {
        
        export type D = {
            readonly 'benchmark': s_self.declarations.Namespaces.D.benchmark
            readonly 'value': s_self.declarations.Namespaces.D.value
        }
        
        export namespace D {
            
            export type benchmark = s_self.structure.Namespaces.D
            
            export type value = s_self.declarations.Declaration_Namespace
            
        }
        
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
            
            export type location = {
                readonly 'value': s_self.resolver.Value_Reference.type_.location.value
                readonly 'result': s_self.resolver.Value_Reference.type_.location.result
            }
            
            export namespace location {
                
                export type value =
                    | readonly ['local', s_self.resolver.Value_Reference.type_.location.value.type_.local]
                    | readonly ['child namespace', s_self.resolver.Value_Reference.type_.location.value.type_.child_namespace]
                    | readonly ['sibling namespace', s_self.resolver.Value_Reference.type_.location.value.type_.sibling_namespace]
                
                export namespace value {
                    export namespace type_ {
                        
                        export type local = {
                            readonly 'l entry': s_self.resolver.Value_Reference.type_.location.value.type_.local.l_entry
                            readonly 'l id': s_self.resolver.Value_Reference.type_.location.value.type_.local.l_id
                        }
                        
                        export namespace local {
                            
                            export type l_entry = s_self.structure.Types.D
                            
                            export type l_id = string
                            
                        }
                        
                        export type child_namespace = {
                            readonly 'namespace': s_self.resolver.Value_Reference.type_.location.value.type_.child_namespace.namespace
                            readonly 'type': s_self.resolver.Value_Reference.type_.location.value.type_.child_namespace.type_
                        }
                        
                        export namespace child_namespace {
                            
                            export type namespace = {
                                readonly 'l entry': s_self.resolver.Value_Reference.type_.location.value.type_.child_namespace.namespace.l_entry
                                readonly 'l id': s_self.resolver.Value_Reference.type_.location.value.type_.child_namespace.namespace.l_id
                            }
                            
                            export namespace namespace {
                                
                                export type l_entry = s_self.structure.Namespaces.D
                                
                                export type l_id = string
                                
                            }
                            
                            export type type_ = {
                                readonly 'l entry': s_self.resolver.Value_Reference.type_.location.value.type_.child_namespace.type_.l_entry
                                readonly 'l id': s_self.resolver.Value_Reference.type_.location.value.type_.child_namespace.type_.l_id
                            }
                            
                            export namespace type_ {
                                
                                export type l_entry = s_self.structure.Types.D
                                
                                export type l_id = string
                                
                            }
                            
                        }
                        
                        export type sibling_namespace = {
                            readonly 'namespace': s_self.resolver.Value_Reference.type_.location.value.type_.sibling_namespace.namespace
                            readonly 'type': s_self.resolver.Value_Reference.type_.location.value.type_.sibling_namespace.type_
                        }
                        
                        export namespace sibling_namespace {
                            
                            export type namespace = {
                                readonly 'l entry': s_self.resolver.Value_Reference.type_.location.value.type_.sibling_namespace.namespace.l_entry
                                readonly 'l id': s_self.resolver.Value_Reference.type_.location.value.type_.sibling_namespace.namespace.l_id
                            }
                            
                            export namespace namespace {
                                
                                export type l_entry = s_self.structure.Namespaces.D
                                
                                export type l_id = string
                                
                            }
                            
                            export type type_ = {
                                readonly 'l entry': s_self.resolver.Value_Reference.type_.location.value.type_.sibling_namespace.type_.l_entry
                                readonly 'l id': s_self.resolver.Value_Reference.type_.location.value.type_.sibling_namespace.type_.l_id
                            }
                            
                            export namespace type_ {
                                
                                export type l_entry = s_self.structure.Types.D
                                
                                export type l_id = string
                                
                            }
                            
                        }
                        
                    }
                    
                }
                
                export type result = s_self.structure.Type
                
            }
            
        }
        
        export type path = {
            readonly 'tail': s_self.resolver.Value_Reference.path.tail
        }
        
        export namespace path {
            
            export type tail = {
                readonly 'value': s_self.resolver.Value_Reference.path.tail.value
                readonly 'result': s_self.resolver.Value_Reference.path.tail.result
            }
            
            export namespace tail {
                
                export type value = p_.List<s_self.resolver.Value_Reference.path.tail.value.L>
                
                export namespace value {
                    
                    export type L = {
                        readonly 'value': s_self.resolver.Value_Reference.path.tail.value.L.value
                        readonly 'result': s_self.resolver.Value_Reference.path.tail.value.L.result
                    }
                    
                    export namespace L {
                        
                        export type value = {
                            readonly 'value': s_self.resolver.Value_Reference.path.tail.value.L.value.value
                            readonly 'result': s_self.resolver.Value_Reference.path.tail.value.L.value.result
                        }
                        
                        export namespace value {
                            
                            export type value =
                                | readonly ['dictionary', s_self.resolver.Value_Reference.path.tail.value.L.value.value.type_.dictionary]
                                | readonly ['group', s_self.resolver.Value_Reference.path.tail.value.L.value.value.type_.group]
                                | readonly ['list', s_self.resolver.Value_Reference.path.tail.value.L.value.value.type_.list]
                                | readonly ['optional', s_self.resolver.Value_Reference.path.tail.value.L.value.value.type_.optional]
                                | readonly ['state', s_self.resolver.Value_Reference.path.tail.value.L.value.value.type_.state]
                            
                            export namespace value {
                                export namespace type_ {
                                    
                                    export type dictionary = {
                                        readonly 'constraints': s_self.resolver.Value_Reference.path.tail.value.L.value.value.type_.dictionary.constraints
                                        readonly 'value': s_self.resolver.Value_Reference.path.tail.value.L.value.value.type_.dictionary.value
                                    }
                                    
                                    export namespace dictionary {
                                        
                                        export type constraints = {
                                            readonly 'definition': s_self.resolver.Value_Reference.path.tail.value.L.value.value.type_.dictionary.constraints.definition
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type definition = s_self.structure.Value.type_.dictionary
                                            
                                        }
                                        
                                        export type value = null
                                        
                                    }
                                    
                                    export type group = {
                                        readonly 'constraints': s_self.resolver.Value_Reference.path.tail.value.L.value.value.type_.group.constraints
                                        readonly 'value': s_self.resolver.Value_Reference.path.tail.value.L.value.value.type_.group.value
                                    }
                                    
                                    export namespace group {
                                        
                                        export type constraints = {
                                            readonly 'definition': s_self.resolver.Value_Reference.path.tail.value.L.value.value.type_.group.constraints.definition
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type definition = s_self.structure.Value.type_.group
                                            
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': s_self.resolver.Value_Reference.path.tail.value.L.value.value.type_.group.value.l_entry
                                            readonly 'l id': s_self.resolver.Value_Reference.path.tail.value.L.value.value.type_.group.value.l_id
                                        }
                                        
                                        export namespace value {
                                            
                                            export type l_entry = s_self.structure.Group.D
                                            
                                            export type l_id = string
                                            
                                        }
                                        
                                    }
                                    
                                    export type list = {
                                        readonly 'constraints': s_self.resolver.Value_Reference.path.tail.value.L.value.value.type_.list.constraints
                                        readonly 'value': s_self.resolver.Value_Reference.path.tail.value.L.value.value.type_.list.value
                                    }
                                    
                                    export namespace list {
                                        
                                        export type constraints = {
                                            readonly 'definition': s_self.resolver.Value_Reference.path.tail.value.L.value.value.type_.list.constraints.definition
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type definition = s_self.structure.Value.type_.list
                                            
                                        }
                                        
                                        export type value = null
                                        
                                    }
                                    
                                    export type optional = {
                                        readonly 'constraints': s_self.resolver.Value_Reference.path.tail.value.L.value.value.type_.optional.constraints
                                        readonly 'value': s_self.resolver.Value_Reference.path.tail.value.L.value.value.type_.optional.value
                                    }
                                    
                                    export namespace optional {
                                        
                                        export type constraints = {
                                            readonly 'definition': s_self.resolver.Value_Reference.path.tail.value.L.value.value.type_.optional.constraints.definition
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type definition = s_self.structure.Value.type_.optional
                                            
                                        }
                                        
                                        export type value = null
                                        
                                    }
                                    
                                    export type state = {
                                        readonly 'constraints': s_self.resolver.Value_Reference.path.tail.value.L.value.value.type_.state.constraints
                                        readonly 'value': s_self.resolver.Value_Reference.path.tail.value.L.value.value.type_.state.value
                                    }
                                    
                                    export namespace state {
                                        
                                        export type constraints = {
                                            readonly 'definition': s_self.resolver.Value_Reference.path.tail.value.L.value.value.type_.state.constraints.definition
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type definition = s_self.structure.Value.type_.state
                                            
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': s_self.resolver.Value_Reference.path.tail.value.L.value.value.type_.state.value.l_entry
                                            readonly 'l id': s_self.resolver.Value_Reference.path.tail.value.L.value.value.type_.state.value.l_id
                                        }
                                        
                                        export namespace value {
                                            
                                            export type l_entry = s_self.structure.Value.type_.state.options.D
                                            
                                            export type l_id = string
                                            
                                        }
                                        
                                    }
                                    
                                }
                                
                            }
                            
                            export type result = s_self.structure.Value
                            
                        }
                        
                        export type result = s_self.structure.Value
                        
                    }
                    
                }
                
                export type result = s_self.structure.Value
                
            }
            
        }
        
    }
    
    export type Simple_Component_Selection = {
        readonly 'value': s_self.resolver.Simple_Component_Selection.value
        readonly 'result': s_self.resolver.Simple_Component_Selection.result
    }
    
    export namespace Simple_Component_Selection {
        
        export type value =
            | readonly ['local', s_self.resolver.Simple_Component_Selection.value.type_.local]
            | readonly ['child namespace', s_self.resolver.Simple_Component_Selection.value.type_.child_namespace]
            | readonly ['sibling namespace', s_self.resolver.Simple_Component_Selection.value.type_.sibling_namespace]
        
        export namespace value {
            export namespace type_ {
                
                export type local = {
                    readonly 'l entry': s_self.resolver.Simple_Component_Selection.value.type_.local.l_entry
                    readonly 'l id': s_self.resolver.Simple_Component_Selection.value.type_.local.l_id
                }
                
                export namespace local {
                    
                    export type l_entry = s_self.structure.Types.D
                    
                    export type l_id = string
                    
                }
                
                export type child_namespace = {
                    readonly 'namespace': s_self.resolver.Simple_Component_Selection.value.type_.child_namespace.namespace
                    readonly 'type': s_self.resolver.Simple_Component_Selection.value.type_.child_namespace.type_
                }
                
                export namespace child_namespace {
                    
                    export type namespace = {
                        readonly 'l entry': s_self.resolver.Simple_Component_Selection.value.type_.child_namespace.namespace.l_entry
                        readonly 'l id': s_self.resolver.Simple_Component_Selection.value.type_.child_namespace.namespace.l_id
                    }
                    
                    export namespace namespace {
                        
                        export type l_entry = s_self.structure.Namespaces.D
                        
                        export type l_id = string
                        
                    }
                    
                    export type type_ = {
                        readonly 'l entry': s_self.resolver.Simple_Component_Selection.value.type_.child_namespace.type_.l_entry
                        readonly 'l id': s_self.resolver.Simple_Component_Selection.value.type_.child_namespace.type_.l_id
                    }
                    
                    export namespace type_ {
                        
                        export type l_entry = s_self.structure.Types.D
                        
                        export type l_id = string
                        
                    }
                    
                }
                
                export type sibling_namespace = {
                    readonly 'namespace': s_self.resolver.Simple_Component_Selection.value.type_.sibling_namespace.namespace
                    readonly 'type': s_self.resolver.Simple_Component_Selection.value.type_.sibling_namespace.type_
                }
                
                export namespace sibling_namespace {
                    
                    export type namespace = {
                        readonly 'l entry': s_self.resolver.Simple_Component_Selection.value.type_.sibling_namespace.namespace.l_entry
                        readonly 'l id': s_self.resolver.Simple_Component_Selection.value.type_.sibling_namespace.namespace.l_id
                    }
                    
                    export namespace namespace {
                        
                        export type l_entry = s_self.structure.Namespaces.D
                        
                        export type l_id = string
                        
                    }
                    
                    export type type_ = {
                        readonly 'l entry': s_self.resolver.Simple_Component_Selection.value.type_.sibling_namespace.type_.l_entry
                        readonly 'l id': s_self.resolver.Simple_Component_Selection.value.type_.sibling_namespace.type_.l_id
                    }
                    
                    export namespace type_ {
                        
                        export type l_entry = s_self.structure.Types.D
                        
                        export type l_id = string
                        
                    }
                    
                }
                
            }
            
        }
        
        export type result = s_self.structure.Type
        
    }
    
    export type Relative_Value_Selection = {
        readonly 'path': s_self.resolver.Relative_Value_Selection.path
    }
    
    export namespace Relative_Value_Selection {
        
        export type path = {
            readonly 'value': s_self.resolver.Relative_Value_Selection.path.value
            readonly 'result': s_self.resolver.Relative_Value_Selection.path.result
        }
        
        export namespace path {
            
            export type value = p_.List<s_self.resolver.Relative_Value_Selection.path.value.L>
            
            export namespace value {
                
                export type L = {
                    readonly 'value': s_self.resolver.Relative_Value_Selection.path.value.L.value
                    readonly 'result': s_self.resolver.Relative_Value_Selection.path.value.L.result
                }
                
                export namespace L {
                    
                    export type value = {
                        readonly 'value': s_self.resolver.Relative_Value_Selection.path.value.L.value.value
                        readonly 'result': s_self.resolver.Relative_Value_Selection.path.value.L.value.result
                    }
                    
                    export namespace value {
                        
                        export type value =
                            | readonly ['benchmark link', s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.benchmark_link]
                            | readonly ['simple component', s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.simple_component]
                            | readonly ['component constraint', s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.component_constraint]
                            | readonly ['navigable component', s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.navigable_component]
                            | readonly ['group', s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.group]
                            | readonly ['list result', s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.list_result]
                            | readonly ['option constraint', s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.option_constraint]
                            | readonly ['optional', s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.optional]
                            | readonly ['optional value constraint', s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.optional_value_constraint]
                            | readonly ['reference constraint', s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.reference_constraint]
                            | readonly ['reference', s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.reference]
                            | readonly ['state result', s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.state_result]
                        
                        export namespace value {
                            export namespace type_ {
                                
                                export type benchmark_link = s_self.resolver.Value_Reference
                                
                                export type simple_component = {
                                    readonly 'constraints': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.simple_component.constraints
                                    readonly 'value': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.simple_component.value
                                }
                                
                                export namespace simple_component {
                                    
                                    export type constraints = {
                                        readonly 'component': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.simple_component.constraints.component
                                        readonly 'definition': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.simple_component.constraints.definition
                                    }
                                    
                                    export namespace constraints {
                                        
                                        export type component = s_self.structure.Value.type_.component
                                        
                                        export type definition = s_self.structure.Value.type_.component.type_.type_.simple
                                        
                                    }
                                    
                                    export type value = s_self.resolver.Simple_Component_Selection
                                    
                                }
                                
                                export type component_constraint = {
                                    readonly 'constraints': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.component_constraint.constraints
                                    readonly 'value': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.component_constraint.value
                                }
                                
                                export namespace component_constraint {
                                    
                                    export type constraints = {
                                        readonly 'definition': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.component_constraint.constraints.definition
                                        readonly 'constraints': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.component_constraint.constraints.constraints
                                    }
                                    
                                    export namespace constraints {
                                        
                                        export type definition = s_self.structure.Value.type_.component
                                        
                                        export type constraints = s_self.structure.Reference_Constraints.O
                                        
                                    }
                                    
                                    export type value = {
                                        readonly 'name': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.component_constraint.value.name
                                        readonly 'target': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.component_constraint.value.target
                                    }
                                    
                                    export namespace value {
                                        
                                        export type name = {
                                            readonly 'l entry': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.component_constraint.value.name.l_entry
                                            readonly 'l id': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.component_constraint.value.name.l_id
                                        }
                                        
                                        export namespace name {
                                            
                                            export type l_entry = s_self.structure.Reference_Constraints.O.D
                                            
                                            export type l_id = string
                                            
                                        }
                                        
                                        export type target = s_self.resolver.Value_Reference
                                        
                                    }
                                    
                                }
                                
                                export type navigable_component = {
                                    readonly 'constraints': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.navigable_component.constraints
                                    readonly 'value': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.navigable_component.value
                                }
                                
                                export namespace navigable_component {
                                    
                                    export type constraints = {
                                        readonly 'component': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.navigable_component.constraints.component
                                        readonly 'definition': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.navigable_component.constraints.definition
                                    }
                                    
                                    export namespace constraints {
                                        
                                        export type component = s_self.structure.Value.type_.component
                                        
                                        export type definition = s_self.structure.Value.type_.component.type_.type_.navigable
                                        
                                    }
                                    
                                    export type value = null
                                    
                                }
                                
                                export type group = {
                                    readonly 'constraints': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.group.constraints
                                    readonly 'value': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.group.value
                                }
                                
                                export namespace group {
                                    
                                    export type constraints = {
                                        readonly 'definition': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.group.constraints.definition
                                    }
                                    
                                    export namespace constraints {
                                        
                                        export type definition = s_self.structure.Value.type_.group
                                        
                                    }
                                    
                                    export type value = {
                                        readonly 'l entry': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.group.value.l_entry
                                        readonly 'l id': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.group.value.l_id
                                    }
                                    
                                    export namespace value {
                                        
                                        export type l_entry = s_self.structure.Group.D
                                        
                                        export type l_id = string
                                        
                                    }
                                    
                                }
                                
                                export type list_result = {
                                    readonly 'constraints': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.list_result.constraints
                                    readonly 'value': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.list_result.value
                                }
                                
                                export namespace list_result {
                                    
                                    export type constraints = {
                                        readonly 'definition': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.list_result.constraints.definition
                                    }
                                    
                                    export namespace constraints {
                                        
                                        export type definition = s_self.structure.Value.type_.list
                                        
                                    }
                                    
                                    export type value = null
                                    
                                }
                                
                                export type option_constraint = {
                                    readonly 'constraints': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.option_constraint.constraints
                                    readonly 'value': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.option_constraint.value
                                }
                                
                                export namespace option_constraint {
                                    
                                    export type constraints = {
                                        readonly 'definition': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.option_constraint.constraints.definition
                                    }
                                    
                                    export namespace constraints {
                                        
                                        export type definition = s_self.structure.Value.type_.state
                                        
                                    }
                                    
                                    export type value = {
                                        readonly 'option': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.option_constraint.value.option
                                        readonly 'constraint': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.option_constraint.value.constraint
                                    }
                                    
                                    export namespace value {
                                        
                                        export type option = {
                                            readonly 'l entry': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.option_constraint.value.option.l_entry
                                            readonly 'l id': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.option_constraint.value.option.l_id
                                        }
                                        
                                        export namespace option {
                                            
                                            export type l_entry = s_self.structure.Value.type_.state.options.D
                                            
                                            export type l_id = string
                                            
                                        }
                                        
                                        export type constraint = {
                                            readonly 'l entry': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.option_constraint.value.constraint.l_entry
                                            readonly 'l id': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.option_constraint.value.constraint.l_id
                                        }
                                        
                                        export namespace constraint {
                                            
                                            export type l_entry = s_self.structure.Option_Constraints.O.D
                                            
                                            export type l_id = string
                                            
                                        }
                                        
                                    }
                                    
                                }
                                
                                export type optional = {
                                    readonly 'constraints': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.optional.constraints
                                    readonly 'value': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.optional.value
                                }
                                
                                export namespace optional {
                                    
                                    export type constraints = {
                                        readonly 'definition': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.optional.constraints.definition
                                    }
                                    
                                    export namespace constraints {
                                        
                                        export type definition = s_self.structure.Value.type_.optional
                                        
                                    }
                                    
                                    export type value = null
                                    
                                }
                                
                                export type optional_value_constraint = {
                                    readonly 'constraints': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.optional_value_constraint.constraints
                                    readonly 'value': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.optional_value_constraint.value
                                }
                                
                                export namespace optional_value_constraint {
                                    
                                    export type constraints = {
                                        readonly 'definition': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.optional_value_constraint.constraints.definition
                                    }
                                    
                                    export namespace constraints {
                                        
                                        export type definition = s_self.structure.Value.type_.optional
                                        
                                    }
                                    
                                    export type value = {
                                        readonly 'l entry': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.optional_value_constraint.value.l_entry
                                        readonly 'l id': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.optional_value_constraint.value.l_id
                                    }
                                    
                                    export namespace value {
                                        
                                        export type l_entry = s_self.structure.Option_Constraints.O.D
                                        
                                        export type l_id = string
                                        
                                    }
                                    
                                }
                                
                                export type reference_constraint = {
                                    readonly 'constraints': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.reference_constraint.constraints
                                    readonly 'value': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.reference_constraint.value
                                }
                                
                                export namespace reference_constraint {
                                    
                                    export type constraints = {
                                        readonly 'definition': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.reference_constraint.constraints.definition
                                    }
                                    
                                    export namespace constraints {
                                        
                                        export type definition = s_self.structure.Value.type_.reference
                                        
                                    }
                                    
                                    export type value = {
                                        readonly 'l entry': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.reference_constraint.value.l_entry
                                        readonly 'l id': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.reference_constraint.value.l_id
                                    }
                                    
                                    export namespace value {
                                        
                                        export type l_entry = s_self.structure.Reference_Constraints.O.D
                                        
                                        export type l_id = string
                                        
                                    }
                                    
                                }
                                
                                export type reference = {
                                    readonly 'constraints': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.reference.constraints
                                    readonly 'value': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.reference.value
                                }
                                
                                export namespace reference {
                                    
                                    export type constraints = {
                                        readonly 'definition': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.reference.constraints.definition
                                        readonly 'acyclic': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.reference.constraints.acyclic
                                    }
                                    
                                    export namespace constraints {
                                        
                                        export type definition = s_self.structure.Value.type_.reference
                                        
                                        export type acyclic = s_self.structure.Reference.type_.dependency.type_.acyclic
                                        
                                    }
                                    
                                    export type value = null
                                    
                                }
                                
                                export type state_result = {
                                    readonly 'constraints': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.state_result.constraints
                                    readonly 'value': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.state_result.value
                                }
                                
                                export namespace state_result {
                                    
                                    export type constraints = {
                                        readonly 'definition': s_self.resolver.Relative_Value_Selection.path.value.L.value.value.type_.state_result.constraints.definition
                                    }
                                    
                                    export namespace constraints {
                                        
                                        export type definition = s_self.structure.Value.type_.state
                                        
                                    }
                                    
                                    export type value = null
                                    
                                }
                                
                            }
                            
                        }
                        
                        export type result = s_self.structure.Value
                        
                    }
                    
                    export type result = s_self.structure.Value
                    
                }
                
            }
            
            export type result = s_self.structure.Value
            
        }
        
    }
    
    export type Possible_Value_Selection = {
        readonly 'value': s_self.resolver.Possible_Value_Selection.value
        readonly 'result': s_self.resolver.Possible_Value_Selection.result
    }
    
    export namespace Possible_Value_Selection {
        
        export type value =
            | readonly ['optional value', s_self.resolver.Possible_Value_Selection.value.type_.optional_value]
            | readonly ['parameter', s_self.resolver.Possible_Value_Selection.value.type_.parameter]
            | readonly ['result', s_self.resolver.Possible_Value_Selection.value.type_.result]
        
        export namespace value {
            export namespace type_ {
                
                export type optional_value = {
                    readonly 'selection': s_self.resolver.Possible_Value_Selection.value.type_.optional_value.selection
                    readonly 'tail': s_self.resolver.Possible_Value_Selection.value.type_.optional_value.tail
                }
                
                export namespace optional_value {
                    
                    export type selection = {
                        readonly 'constraints': s_self.resolver.Possible_Value_Selection.value.type_.optional_value.selection.constraints
                        readonly 'value': s_self.resolver.Possible_Value_Selection.value.type_.optional_value.selection.value
                    }
                    
                    export namespace selection {
                        
                        export type constraints = {
                            readonly 'optional': s_self.resolver.Possible_Value_Selection.value.type_.optional_value.selection.constraints.optional
                        }
                        
                        export namespace constraints {
                            
                            export type optional = s_self.structure.Value.type_.optional
                            
                        }
                        
                        export type value = s_self.resolver.Guaranteed_Value_Selection
                        
                    }
                    
                    export type tail = s_self.resolver.Relative_Value_Selection
                    
                }
                
                export type parameter = {
                    readonly 'l entry': s_self.resolver.Possible_Value_Selection.value.type_.parameter.l_entry
                    readonly 'l id': s_self.resolver.Possible_Value_Selection.value.type_.parameter.l_id
                }
                
                export namespace parameter {
                    
                    export type l_entry = s_self.declarations.Signature.values.D
                    
                    export type l_id = string
                    
                }
                
                export type result = {
                    readonly 'value': s_self.resolver.Possible_Value_Selection.value.type_.result.value
                    readonly 'result': s_self.resolver.Possible_Value_Selection.value.type_.result.result
                }
                
                export namespace result {
                    
                    export type value =
                        | readonly ['state', s_self.resolver.Possible_Value_Selection.value.type_.result.value.type_.state]
                        | readonly ['optional value', s_self.resolver.Possible_Value_Selection.value.type_.result.value.type_.optional_value]
                    
                    export namespace value {
                        export namespace type_ {
                            
                            export type state = {
                                readonly 'property': s_self.resolver.Possible_Value_Selection.value.type_.result.value.type_.state.property
                            }
                            
                            export namespace state {
                                
                                export type property = {
                                    readonly 'constraints': s_self.resolver.Possible_Value_Selection.value.type_.result.value.type_.state.property.constraints
                                    readonly 'value': s_self.resolver.Possible_Value_Selection.value.type_.result.value.type_.state.property.value
                                }
                                
                                export namespace property {
                                    
                                    export type constraints = {
                                        readonly 'state': s_self.resolver.Possible_Value_Selection.value.type_.result.value.type_.state.property.constraints.state
                                        readonly 'result': s_self.resolver.Possible_Value_Selection.value.type_.result.value.type_.state.property.constraints.result
                                    }
                                    
                                    export namespace constraints {
                                        
                                        export type state = s_self.structure.Value.type_.state
                                        
                                        export type result = s_self.structure.Value_Result.O
                                        
                                    }
                                    
                                    export type value = {
                                        readonly 'l entry': s_self.resolver.Possible_Value_Selection.value.type_.result.value.type_.state.property.value.l_entry
                                        readonly 'l id': s_self.resolver.Possible_Value_Selection.value.type_.result.value.type_.state.property.value.l_id
                                    }
                                    
                                    export namespace value {
                                        
                                        export type l_entry = s_self.structure.Group.D
                                        
                                        export type l_id = string
                                        
                                    }
                                    
                                }
                                
                            }
                            
                            export type optional_value = {
                                readonly 'property': s_self.resolver.Possible_Value_Selection.value.type_.result.value.type_.optional_value.property
                            }
                            
                            export namespace optional_value {
                                
                                export type property = {
                                    readonly 'constraints': s_self.resolver.Possible_Value_Selection.value.type_.result.value.type_.optional_value.property.constraints
                                    readonly 'value': s_self.resolver.Possible_Value_Selection.value.type_.result.value.type_.optional_value.property.value
                                }
                                
                                export namespace property {
                                    
                                    export type constraints = {
                                        readonly 'optional': s_self.resolver.Possible_Value_Selection.value.type_.result.value.type_.optional_value.property.constraints.optional
                                        readonly 'result': s_self.resolver.Possible_Value_Selection.value.type_.result.value.type_.optional_value.property.constraints.result
                                    }
                                    
                                    export namespace constraints {
                                        
                                        export type optional = s_self.structure.Value.type_.optional
                                        
                                        export type result = s_self.structure.Value_Result.O
                                        
                                    }
                                    
                                    export type value = {
                                        readonly 'l entry': s_self.resolver.Possible_Value_Selection.value.type_.result.value.type_.optional_value.property.value.l_entry
                                        readonly 'l id': s_self.resolver.Possible_Value_Selection.value.type_.result.value.type_.optional_value.property.value.l_id
                                    }
                                    
                                    export namespace value {
                                        
                                        export type l_entry = s_self.structure.Group.D
                                        
                                        export type l_id = string
                                        
                                    }
                                    
                                }
                                
                            }
                            
                        }
                        
                    }
                    
                    export type result = s_self.structure.Value
                    
                }
                
            }
            
        }
        
        export type result = s_self.structure.Value
        
    }
    
    export type Option_Constraints = p_.Optional_Value<s_self.resolver.Option_Constraints.O>
    
    export namespace Option_Constraints {
        
        export type O = {
            readonly 'constraints': s_self.resolver.Option_Constraints.O.constraints
            readonly 'value': s_self.resolver.Option_Constraints.O.value
        }
        
        export namespace O {
            
            export type constraints = {
                readonly 'declarations': s_self.resolver.Option_Constraints.O.constraints.declarations
            }
            
            export namespace constraints {
                
                export type declarations = s_self.structure.Option_Constraints.O
                
            }
            
            export type value = p_.Dictionary<s_self.resolver.Option_Constraints.O.value.D>
            
            export namespace value {
                
                export type D = {
                    readonly 'benchmark': s_self.resolver.Option_Constraints.O.value.D.benchmark
                    readonly 'value': s_self.resolver.Option_Constraints.O.value.D.value
                }
                
                export namespace D {
                    
                    export type benchmark = s_self.structure.Option_Constraints.O.D
                    
                    export type value = {
                        readonly 'value': s_self.resolver.Option_Constraints.O.value.D.value.value
                        readonly 'result': s_self.resolver.Option_Constraints.O.value.D.value.result
                    }
                    
                    export namespace value {
                        
                        export type value =
                            | readonly ['state', s_self.resolver.Option_Constraints.O.value.D.value.value.type_.state]
                            | readonly ['assert is set', s_self.resolver.Option_Constraints.O.value.D.value.value.type_.assert_is_set]
                        
                        export namespace value {
                            export namespace type_ {
                                
                                export type state = {
                                    readonly 'selection': s_self.resolver.Option_Constraints.O.value.D.value.value.type_.state.selection
                                    readonly 'option': s_self.resolver.Option_Constraints.O.value.D.value.value.type_.state.option
                                }
                                
                                export namespace state {
                                    
                                    export type selection = {
                                        readonly 'constraints': s_self.resolver.Option_Constraints.O.value.D.value.value.type_.state.selection.constraints
                                        readonly 'value': s_self.resolver.Option_Constraints.O.value.D.value.value.type_.state.selection.value
                                    }
                                    
                                    export namespace selection {
                                        
                                        export type constraints = {
                                            readonly 'state': s_self.resolver.Option_Constraints.O.value.D.value.value.type_.state.selection.constraints.state
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type state = s_self.structure.Value.type_.state
                                            
                                        }
                                        
                                        export type value = s_self.resolver.Guaranteed_Value_Selection
                                        
                                    }
                                    
                                    export type option = {
                                        readonly 'l entry': s_self.resolver.Option_Constraints.O.value.D.value.value.type_.state.option.l_entry
                                        readonly 'l id': s_self.resolver.Option_Constraints.O.value.D.value.value.type_.state.option.l_id
                                    }
                                    
                                    export namespace option {
                                        
                                        export type l_entry = s_self.structure.Value.type_.state.options.D
                                        
                                        export type l_id = string
                                        
                                    }
                                    
                                }
                                
                                export type assert_is_set = s_self.resolver.Possible_Value_Selection
                                
                            }
                            
                        }
                        
                        export type result = s_self.structure.Value
                        
                    }
                    
                }
                
            }
            
        }
        
    }
    
    export type Guaranteed_Value_Selection = {
        readonly 'start': s_self.resolver.Guaranteed_Value_Selection.start
        readonly 'tail': s_self.resolver.Guaranteed_Value_Selection.tail
    }
    
    export namespace Guaranteed_Value_Selection {
        
        export type start = {
            readonly 'value': s_self.resolver.Guaranteed_Value_Selection.start.value
            readonly 'result': s_self.resolver.Guaranteed_Value_Selection.start.result
        }
        
        export namespace start {
            
            export type value =
                | readonly ['optional fallback', s_self.resolver.Guaranteed_Value_Selection.start.value.type_.optional_fallback]
                | readonly ['sibling property', s_self.resolver.Guaranteed_Value_Selection.start.value.type_.sibling_property]
                | readonly ['parent sibling', s_self.resolver.Guaranteed_Value_Selection.start.value.type_.parent_sibling]
                | readonly ['option constraint', s_self.resolver.Guaranteed_Value_Selection.start.value.type_.option_constraint]
                | readonly ['sibling option constraint', s_self.resolver.Guaranteed_Value_Selection.start.value.type_.sibling_option_constraint]
                | readonly ['list cursor', s_self.resolver.Guaranteed_Value_Selection.start.value.type_.list_cursor]
                | readonly ['linked entry', s_self.resolver.Guaranteed_Value_Selection.start.value.type_.linked_entry]
                | readonly ['constraint', s_self.resolver.Guaranteed_Value_Selection.start.value.type_.constraint]
                | readonly ['parameter', s_self.resolver.Guaranteed_Value_Selection.start.value.type_.parameter]
                | readonly ['result', s_self.resolver.Guaranteed_Value_Selection.start.value.type_.result]
            
            export namespace value {
                export namespace type_ {
                    
                    export type optional_fallback = {
                        readonly 'selection': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.optional_fallback.selection
                        readonly 'fallback': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.optional_fallback.fallback
                    }
                    
                    export namespace optional_fallback {
                        
                        export type selection = s_self.resolver.Possible_Value_Selection
                        
                        export type fallback = s_self.resolver.Guaranteed_Value_Selection
                        
                    }
                    
                    export type sibling_property = {
                        readonly 'l entry': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.sibling_property.l_entry
                        readonly 'l id': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.sibling_property.l_id
                    }
                    
                    export namespace sibling_property {
                        
                        export type l_entry = s_self.structure.Group.D
                        
                        export type l_id = string
                        
                    }
                    
                    export type parent_sibling = {
                        readonly 'l entry': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.parent_sibling.l_entry
                        readonly 'l id': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.parent_sibling.l_id
                    }
                    
                    export namespace parent_sibling {
                        
                        export type l_entry = s_self.structure.Group.D
                        
                        export type l_id = string
                        
                    }
                    
                    export type option_constraint = {
                        readonly 'constraints': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.option_constraint.constraints
                        readonly 'value': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.option_constraint.value
                    }
                    
                    export namespace option_constraint {
                        
                        export type constraints = {
                            readonly 'oc': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.option_constraint.constraints.oc
                        }
                        
                        export namespace constraints {
                            
                            export type oc = s_self.structure.Option_Constraints
                            
                        }
                        
                        export type value = {
                            readonly 'l entry': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.option_constraint.value.l_entry
                            readonly 'l id': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.option_constraint.value.l_id
                        }
                        
                        export namespace value {
                            
                            export type l_entry = s_self.structure.Option_Constraints.O.D
                            
                            export type l_id = string
                            
                        }
                        
                    }
                    
                    export type sibling_option_constraint = {
                        readonly 'l entry': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.sibling_option_constraint.l_entry
                        readonly 'l id': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.sibling_option_constraint.l_id
                    }
                    
                    export namespace sibling_option_constraint {
                        
                        export type l_entry = s_self.resolver.Option_Constraints.O.value.D
                        
                        export type l_id = string
                        
                    }
                    
                    export type list_cursor = {
                        readonly 'constraints': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.list_cursor.constraints
                        readonly 'value': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.list_cursor.value
                    }
                    
                    export namespace list_cursor {
                        
                        export type constraints = {
                            readonly 'result': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.list_cursor.constraints.result
                        }
                        
                        export namespace constraints {
                            
                            export type result = s_self.structure.Value_Result.O
                            
                        }
                        
                        export type value = null
                        
                    }
                    
                    export type linked_entry = {
                        readonly 'constraints': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.linked_entry.constraints
                        readonly 'value': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.linked_entry.value
                    }
                    
                    export namespace linked_entry {
                        
                        export type constraints = {
                            readonly 'entry': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.linked_entry.constraints.entry
                        }
                        
                        export namespace constraints {
                            
                            export type entry = s_self.structure.Value
                            
                        }
                        
                        export type value = null
                        
                    }
                    
                    export type constraint = {
                        readonly 'value': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.constraint.value
                        readonly 'result': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.constraint.result
                    }
                    
                    export namespace constraint {
                        
                        export type value =
                            | readonly ['component', s_self.resolver.Guaranteed_Value_Selection.start.value.type_.constraint.value.type_.component]
                            | readonly ['reference', s_self.resolver.Guaranteed_Value_Selection.start.value.type_.constraint.value.type_.reference]
                        
                        export namespace value {
                            export namespace type_ {
                                
                                export type component = {
                                    readonly 'property': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.constraint.value.type_.component.property
                                    readonly 'constraint': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.constraint.value.type_.component.constraint
                                }
                                
                                export namespace component {
                                    
                                    export type property = {
                                        readonly 'constraints': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.constraint.value.type_.component.property.constraints
                                        readonly 'value': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.constraint.value.type_.component.property.value
                                    }
                                    
                                    export namespace property {
                                        
                                        export type constraints = {
                                            readonly 'component': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.constraint.value.type_.component.property.constraints.component
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type component = s_self.structure.Value.type_.component
                                            
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.constraint.value.type_.component.property.value.l_entry
                                            readonly 'l id': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.constraint.value.type_.component.property.value.l_id
                                        }
                                        
                                        export namespace value {
                                            
                                            export type l_entry = s_self.structure.Group.D
                                            
                                            export type l_id = string
                                            
                                        }
                                        
                                    }
                                    
                                    export type constraint = {
                                        readonly 'l entry': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.constraint.value.type_.component.constraint.l_entry
                                        readonly 'l id': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.constraint.value.type_.component.constraint.l_id
                                    }
                                    
                                    export namespace constraint {
                                        
                                        export type l_entry = s_self.structure.Reference_Constraints.O.D
                                        
                                        export type l_id = string
                                        
                                    }
                                    
                                }
                                
                                export type reference = {
                                    readonly 'property': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.constraint.value.type_.reference.property
                                    readonly 'constraint': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.constraint.value.type_.reference.constraint
                                }
                                
                                export namespace reference {
                                    
                                    export type property = {
                                        readonly 'constraints': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.constraint.value.type_.reference.property.constraints
                                        readonly 'value': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.constraint.value.type_.reference.property.value
                                    }
                                    
                                    export namespace property {
                                        
                                        export type constraints = {
                                            readonly 'reference': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.constraint.value.type_.reference.property.constraints.reference
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type reference = s_self.structure.Value.type_.reference
                                            
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.constraint.value.type_.reference.property.value.l_entry
                                            readonly 'l id': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.constraint.value.type_.reference.property.value.l_id
                                        }
                                        
                                        export namespace value {
                                            
                                            export type l_entry = s_self.structure.Group.D
                                            
                                            export type l_id = string
                                            
                                        }
                                        
                                    }
                                    
                                    export type constraint = {
                                        readonly 'l entry': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.constraint.value.type_.reference.constraint.l_entry
                                        readonly 'l id': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.constraint.value.type_.reference.constraint.l_id
                                    }
                                    
                                    export namespace constraint {
                                        
                                        export type l_entry = s_self.structure.Reference_Constraints.O.D
                                        
                                        export type l_id = string
                                        
                                    }
                                    
                                }
                                
                            }
                            
                        }
                        
                        export type result = s_self.structure.Value
                        
                    }
                    
                    export type parameter = {
                        readonly 'l entry': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.parameter.l_entry
                        readonly 'l id': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.parameter.l_id
                    }
                    
                    export namespace parameter {
                        
                        export type l_entry = s_self.declarations.Signature.values.D
                        
                        export type l_id = string
                        
                    }
                    
                    export type result = {
                        readonly 'value': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.result.value
                        readonly 'result': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.result.result
                    }
                    
                    export namespace result {
                        
                        export type value =
                            | readonly ['list', s_self.resolver.Guaranteed_Value_Selection.start.value.type_.result.value.type_.list]
                            | readonly ['state', s_self.resolver.Guaranteed_Value_Selection.start.value.type_.result.value.type_.state]
                            | readonly ['optional value', s_self.resolver.Guaranteed_Value_Selection.start.value.type_.result.value.type_.optional_value]
                        
                        export namespace value {
                            export namespace type_ {
                                
                                export type list = {
                                    readonly 'property': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.result.value.type_.list.property
                                }
                                
                                export namespace list {
                                    
                                    export type property = {
                                        readonly 'constraints': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.result.value.type_.list.property.constraints
                                        readonly 'value': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.result.value.type_.list.property.value
                                    }
                                    
                                    export namespace property {
                                        
                                        export type constraints = {
                                            readonly 'list': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.result.value.type_.list.property.constraints.list
                                            readonly 'result': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.result.value.type_.list.property.constraints.result
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type list = s_self.structure.Value.type_.list
                                            
                                            export type result = s_self.structure.Value_Result.O
                                            
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.result.value.type_.list.property.value.l_entry
                                            readonly 'l id': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.result.value.type_.list.property.value.l_id
                                        }
                                        
                                        export namespace value {
                                            
                                            export type l_entry = s_self.structure.Group.D
                                            
                                            export type l_id = string
                                            
                                        }
                                        
                                    }
                                    
                                }
                                
                                export type state = {
                                    readonly 'property': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.result.value.type_.state.property
                                }
                                
                                export namespace state {
                                    
                                    export type property = {
                                        readonly 'constraints': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.result.value.type_.state.property.constraints
                                        readonly 'value': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.result.value.type_.state.property.value
                                    }
                                    
                                    export namespace property {
                                        
                                        export type constraints = {
                                            readonly 'state': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.result.value.type_.state.property.constraints.state
                                            readonly 'result': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.result.value.type_.state.property.constraints.result
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type state = s_self.structure.Value.type_.state
                                            
                                            export type result = s_self.structure.Value_Result.O
                                            
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.result.value.type_.state.property.value.l_entry
                                            readonly 'l id': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.result.value.type_.state.property.value.l_id
                                        }
                                        
                                        export namespace value {
                                            
                                            export type l_entry = s_self.structure.Group.D
                                            
                                            export type l_id = string
                                            
                                        }
                                        
                                    }
                                    
                                }
                                
                                export type optional_value = {
                                    readonly 'property': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.result.value.type_.optional_value.property
                                }
                                
                                export namespace optional_value {
                                    
                                    export type property = {
                                        readonly 'constraints': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.result.value.type_.optional_value.property.constraints
                                        readonly 'value': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.result.value.type_.optional_value.property.value
                                    }
                                    
                                    export namespace property {
                                        
                                        export type constraints = {
                                            readonly 'optional': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.result.value.type_.optional_value.property.constraints.optional
                                            readonly 'result': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.result.value.type_.optional_value.property.constraints.result
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type optional = s_self.structure.Value.type_.optional
                                            
                                            export type result = s_self.structure.Value_Result.O
                                            
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.result.value.type_.optional_value.property.value.l_entry
                                            readonly 'l id': s_self.resolver.Guaranteed_Value_Selection.start.value.type_.result.value.type_.optional_value.property.value.l_id
                                        }
                                        
                                        export namespace value {
                                            
                                            export type l_entry = s_self.structure.Group.D
                                            
                                            export type l_id = string
                                            
                                        }
                                        
                                    }
                                    
                                }
                                
                            }
                            
                        }
                        
                        export type result = s_self.structure.Value
                        
                    }
                    
                }
                
            }
            
            export type result = s_self.structure.Value
            
        }
        
        export type tail = s_self.resolver.Relative_Value_Selection
        
    }
    
    export type Lookup_Selection = {
        readonly 'type': s_self.resolver.Lookup_Selection.type_
    }
    
    export namespace Lookup_Selection {
        
        export type type_ = {
            readonly 'value': s_self.resolver.Lookup_Selection.type_.value
            readonly 'result': s_self.resolver.Lookup_Selection.type_.result
        }
        
        export namespace type_ {
            
            export type value =
                | readonly ['acyclic', s_self.resolver.Lookup_Selection.type_.value.type_.acyclic]
                | readonly ['cyclic', s_self.resolver.Lookup_Selection.type_.value.type_.cyclic]
                | readonly ['parameter', s_self.resolver.Lookup_Selection.type_.value.type_.parameter]
            
            export namespace value {
                export namespace type_ {
                    
                    export type acyclic = {
                        readonly 'value': s_self.resolver.Lookup_Selection.type_.value.type_.acyclic.value
                        readonly 'result': s_self.resolver.Lookup_Selection.type_.value.type_.acyclic.result
                    }
                    
                    export namespace acyclic {
                        
                        export type value =
                            | readonly ['siblings', s_self.resolver.Lookup_Selection.type_.value.type_.acyclic.value.type_.siblings]
                            | readonly ['resolved dictionary', s_self.resolver.Lookup_Selection.type_.value.type_.acyclic.value.type_.resolved_dictionary]
                        
                        export namespace value {
                            export namespace type_ {
                                
                                export type siblings = {
                                    readonly 'constraints': s_self.resolver.Lookup_Selection.type_.value.type_.acyclic.value.type_.siblings.constraints
                                    readonly 'value': s_self.resolver.Lookup_Selection.type_.value.type_.acyclic.value.type_.siblings.value
                                }
                                
                                export namespace siblings {
                                    
                                    export type constraints = {
                                        readonly 'cd': s_self.resolver.Lookup_Selection.type_.value.type_.acyclic.value.type_.siblings.constraints.cd
                                    }
                                    
                                    export namespace constraints {
                                        
                                        export type cd = s_self.structure.Dictionary
                                        
                                    }
                                    
                                    export type value = null
                                    
                                }
                                
                                export type resolved_dictionary = {
                                    readonly 'selection': s_self.resolver.Lookup_Selection.type_.value.type_.acyclic.value.type_.resolved_dictionary.selection
                                }
                                
                                export namespace resolved_dictionary {
                                    
                                    export type selection = {
                                        readonly 'constraints': s_self.resolver.Lookup_Selection.type_.value.type_.acyclic.value.type_.resolved_dictionary.selection.constraints
                                        readonly 'value': s_self.resolver.Lookup_Selection.type_.value.type_.acyclic.value.type_.resolved_dictionary.selection.value
                                    }
                                    
                                    export namespace selection {
                                        
                                        export type constraints = {
                                            readonly 'dictionary': s_self.resolver.Lookup_Selection.type_.value.type_.acyclic.value.type_.resolved_dictionary.selection.constraints.dictionary
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type dictionary = s_self.structure.Value.type_.dictionary
                                            
                                        }
                                        
                                        export type value = s_self.resolver.Guaranteed_Value_Selection
                                        
                                    }
                                    
                                }
                                
                            }
                            
                        }
                        
                        export type result = s_self.structure.Dictionary
                        
                    }
                    
                    export type cyclic = {
                        readonly 'value': s_self.resolver.Lookup_Selection.type_.value.type_.cyclic.value
                        readonly 'result': s_self.resolver.Lookup_Selection.type_.value.type_.cyclic.result
                    }
                    
                    export namespace cyclic {
                        
                        export type value =
                            | readonly ['siblings', s_self.resolver.Lookup_Selection.type_.value.type_.cyclic.value.type_.siblings]
                        
                        export namespace value {
                            export namespace type_ {
                                
                                export type siblings = {
                                    readonly 'constraints': s_self.resolver.Lookup_Selection.type_.value.type_.cyclic.value.type_.siblings.constraints
                                    readonly 'value': s_self.resolver.Lookup_Selection.type_.value.type_.cyclic.value.type_.siblings.value
                                }
                                
                                export namespace siblings {
                                    
                                    export type constraints = {
                                        readonly 'cd': s_self.resolver.Lookup_Selection.type_.value.type_.cyclic.value.type_.siblings.constraints.cd
                                    }
                                    
                                    export namespace constraints {
                                        
                                        export type cd = s_self.structure.Dictionary
                                        
                                    }
                                    
                                    export type value = null
                                    
                                }
                                
                            }
                            
                        }
                        
                        export type result = s_self.structure.Dictionary
                        
                    }
                    
                    export type parameter = {
                        readonly 'l entry': s_self.resolver.Lookup_Selection.type_.value.type_.parameter.l_entry
                        readonly 'l id': s_self.resolver.Lookup_Selection.type_.value.type_.parameter.l_id
                    }
                    
                    export namespace parameter {
                        
                        export type l_entry = s_self.declarations.Signature.lookups.D
                        
                        export type l_id = string
                        
                    }
                    
                }
                
            }
            
            export type result = s_self.structure.Dictionary
            
        }
        
    }
    
    export type Reference_Constraints = p_.Optional_Value<s_self.resolver.Reference_Constraints.O>
    
    export namespace Reference_Constraints {
        
        export type O = {
            readonly 'constraints': s_self.resolver.Reference_Constraints.O.constraints
            readonly 'value': s_self.resolver.Reference_Constraints.O.value
        }
        
        export namespace O {
            
            export type constraints = {
                readonly 'declarations': s_self.resolver.Reference_Constraints.O.constraints.declarations
            }
            
            export namespace constraints {
                
                export type declarations = s_self.structure.Reference_Constraints.O
                
            }
            
            export type value = p_.Dictionary<s_self.resolver.Reference_Constraints.O.value.D>
            
            export namespace value {
                
                export type D = {
                    readonly 'benchmark': s_self.resolver.Reference_Constraints.O.value.D.benchmark
                    readonly 'value': s_self.resolver.Reference_Constraints.O.value.D.value
                }
                
                export namespace D {
                    
                    export type benchmark = s_self.structure.Reference_Constraints.O.D
                    
                    export type value = {
                        readonly 'start': s_self.resolver.Reference_Constraints.O.value.D.value.start
                        readonly 'constraint': s_self.resolver.Reference_Constraints.O.value.D.value.constraint
                    }
                    
                    export namespace value {
                        
                        export type start = {
                            readonly 'value': s_self.resolver.Reference_Constraints.O.value.D.value.start.value
                            readonly 'result': s_self.resolver.Reference_Constraints.O.value.D.value.start.result
                        }
                        
                        export namespace start {
                            
                            export type value =
                                | readonly ['value', s_self.resolver.Reference_Constraints.O.value.D.value.start.value.type_.value]
                                | readonly ['sibling', s_self.resolver.Reference_Constraints.O.value.D.value.start.value.type_.sibling]
                            
                            export namespace value {
                                export namespace type_ {
                                    
                                    export type value = null
                                    
                                    export type sibling = {
                                        readonly 'l entry': s_self.resolver.Reference_Constraints.O.value.D.value.start.value.type_.sibling.l_entry
                                        readonly 'l id': s_self.resolver.Reference_Constraints.O.value.D.value.start.value.type_.sibling.l_id
                                    }
                                    
                                    export namespace sibling {
                                        
                                        export type l_entry = s_self.structure.Reference_Constraints.O.D
                                        
                                        export type l_id = string
                                        
                                    }
                                    
                                }
                                
                            }
                            
                            export type result = s_self.structure.Value
                            
                        }
                        
                        export type constraint = {
                            readonly 'selection': s_self.resolver.Reference_Constraints.O.value.D.value.constraint.selection
                            readonly 'type': s_self.resolver.Reference_Constraints.O.value.D.value.constraint.type_
                        }
                        
                        export namespace constraint {
                            
                            export type selection = s_self.resolver.Relative_Value_Selection
                            
                            export type type_ = {
                                readonly 'value': s_self.resolver.Reference_Constraints.O.value.D.value.constraint.type_.value
                                readonly 'result': s_self.resolver.Reference_Constraints.O.value.D.value.constraint.type_.result
                            }
                            
                            export namespace type_ {
                                
                                export type value =
                                    | readonly ['state', s_self.resolver.Reference_Constraints.O.value.D.value.constraint.type_.value.type_.state]
                                    | readonly ['optional value', s_self.resolver.Reference_Constraints.O.value.D.value.constraint.type_.value.type_.optional_value]
                                
                                export namespace value {
                                    export namespace type_ {
                                        
                                        export type state = {
                                            readonly 'constraints': s_self.resolver.Reference_Constraints.O.value.D.value.constraint.type_.value.type_.state.constraints
                                            readonly 'value': s_self.resolver.Reference_Constraints.O.value.D.value.constraint.type_.value.type_.state.value
                                        }
                                        
                                        export namespace state {
                                            
                                            export type constraints = {
                                                readonly 'state': s_self.resolver.Reference_Constraints.O.value.D.value.constraint.type_.value.type_.state.constraints.state
                                            }
                                            
                                            export namespace constraints {
                                                
                                                export type state = s_self.structure.Value.type_.state
                                                
                                            }
                                            
                                            export type value = {
                                                readonly 'option': s_self.resolver.Reference_Constraints.O.value.D.value.constraint.type_.value.type_.state.value.option
                                            }
                                            
                                            export namespace value {
                                                
                                                export type option = {
                                                    readonly 'l entry': s_self.resolver.Reference_Constraints.O.value.D.value.constraint.type_.value.type_.state.value.option.l_entry
                                                    readonly 'l id': s_self.resolver.Reference_Constraints.O.value.D.value.constraint.type_.value.type_.state.value.option.l_id
                                                }
                                                
                                                export namespace option {
                                                    
                                                    export type l_entry = s_self.structure.Value.type_.state.options.D
                                                    
                                                    export type l_id = string
                                                    
                                                }
                                                
                                            }
                                            
                                        }
                                        
                                        export type optional_value = {
                                            readonly 'constraints': s_self.resolver.Reference_Constraints.O.value.D.value.constraint.type_.value.type_.optional_value.constraints
                                            readonly 'value': s_self.resolver.Reference_Constraints.O.value.D.value.constraint.type_.value.type_.optional_value.value
                                        }
                                        
                                        export namespace optional_value {
                                            
                                            export type constraints = {
                                                readonly 'optional': s_self.resolver.Reference_Constraints.O.value.D.value.constraint.type_.value.type_.optional_value.constraints.optional
                                            }
                                            
                                            export namespace constraints {
                                                
                                                export type optional = s_self.structure.Value.type_.optional
                                                
                                            }
                                            
                                            export type value = null
                                            
                                        }
                                        
                                    }
                                    
                                }
                                
                                export type result = s_self.structure.Value
                                
                            }
                            
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
            
            export type D = {
                readonly 'benchmark': s_self.resolver.Resolver.namespaces.D.benchmark
                readonly 'value': s_self.resolver.Resolver.namespaces.D.value
            }
            
            export namespace D {
                
                export type benchmark = s_self.declarations.Namespaces.D
                
                export type value = s_self.resolver.Resolver
                
            }
            
        }
        
        export type types = p_.Dictionary<s_self.resolver.Resolver.types.D>
        
        export namespace types {
            
            export type D = {
                readonly 'benchmark': s_self.resolver.Resolver.types.D.benchmark
                readonly 'value': s_self.resolver.Resolver.types.D.value
            }
            
            export namespace D {
                
                export type benchmark = s_self.declarations.Declarations.D
                
                export type value = {
                    readonly 'root value resolver': s_self.resolver.Resolver.types.D.value.root_value_resolver
                }
                
                export namespace value {
                    
                    export type root_value_resolver = s_self.resolver.Value
                    
                }
                
            }
            
        }
        
    }
    
    export type Result_Selection = {
        readonly 'value': s_self.resolver.Result_Selection.value
        readonly 'result': s_self.resolver.Result_Selection.result
    }
    
    export namespace Result_Selection {
        
        export type value =
            | readonly ['context', s_self.resolver.Result_Selection.value.type_.context]
            | readonly ['value', s_self.resolver.Result_Selection.value.type_.value]
        
        export namespace value {
            export namespace type_ {
                
                export type context = s_self.resolver.Guaranteed_Value_Selection
                
                export type value = s_self.resolver.Relative_Value_Selection
                
            }
            
        }
        
        export type result = s_self.structure.Value
        
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
                readonly 'constraints': s_self.resolver.Value.type_.component.constraints
                readonly 'value': s_self.resolver.Value.type_.component.value
            }
            
            export namespace component {
                
                export type constraints = {
                    readonly 'definition': s_self.resolver.Value.type_.component.constraints.definition
                }
                
                export namespace constraints {
                    
                    export type definition = s_self.structure.Value.type_.component
                    
                }
                
                export type value = {
                    readonly 'location': s_self.resolver.Value.type_.component.value.location
                    readonly 'arguments': s_self.resolver.Value.type_.component.value.arguments_
                    readonly 'constraints': s_self.resolver.Value.type_.component.value.constraints
                }
                
                export namespace value {
                    
                    export type location = {
                        readonly 'value': s_self.resolver.Value.type_.component.value.location.value
                        readonly 'result': s_self.resolver.Value.type_.component.value.location.result
                    }
                    
                    export namespace location {
                        
                        export type value =
                            | readonly ['local', s_self.resolver.Value.type_.component.value.location.value.type_.local]
                            | readonly ['child namespace', s_self.resolver.Value.type_.component.value.location.value.type_.child_namespace]
                            | readonly ['sibling namespace', s_self.resolver.Value.type_.component.value.location.value.type_.sibling_namespace]
                        
                        export namespace value {
                            export namespace type_ {
                                
                                export type local = {
                                    readonly 'l entry': s_self.resolver.Value.type_.component.value.location.value.type_.local.l_entry
                                    readonly 'l id': s_self.resolver.Value.type_.component.value.location.value.type_.local.l_id
                                }
                                
                                export namespace local {
                                    
                                    export type l_entry = s_self.declarations.Declarations.D
                                    
                                    export type l_id = string
                                    
                                }
                                
                                export type child_namespace = {
                                    readonly 'namespace': s_self.resolver.Value.type_.component.value.location.value.type_.child_namespace.namespace
                                    readonly 'resolver': s_self.resolver.Value.type_.component.value.location.value.type_.child_namespace.resolver
                                }
                                
                                export namespace child_namespace {
                                    
                                    export type namespace = {
                                        readonly 'l entry': s_self.resolver.Value.type_.component.value.location.value.type_.child_namespace.namespace.l_entry
                                        readonly 'l id': s_self.resolver.Value.type_.component.value.location.value.type_.child_namespace.namespace.l_id
                                    }
                                    
                                    export namespace namespace {
                                        
                                        export type l_entry = s_self.declarations.Namespaces.D
                                        
                                        export type l_id = string
                                        
                                    }
                                    
                                    export type resolver = {
                                        readonly 'constraints': s_self.resolver.Value.type_.component.value.location.value.type_.child_namespace.resolver.constraints
                                        readonly 'value': s_self.resolver.Value.type_.component.value.location.value.type_.child_namespace.resolver.value
                                    }
                                    
                                    export namespace resolver {
                                        
                                        export type constraints = {
                                            readonly 'public': s_self.resolver.Value.type_.component.value.location.value.type_.child_namespace.resolver.constraints.public_
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type public_ = s_self.structure.Type.visibility.type_.public_
                                            
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': s_self.resolver.Value.type_.component.value.location.value.type_.child_namespace.resolver.value.l_entry
                                            readonly 'l id': s_self.resolver.Value.type_.component.value.location.value.type_.child_namespace.resolver.value.l_id
                                        }
                                        
                                        export namespace value {
                                            
                                            export type l_entry = s_self.declarations.Declarations.D
                                            
                                            export type l_id = string
                                            
                                        }
                                        
                                    }
                                    
                                }
                                
                                export type sibling_namespace = {
                                    readonly 'constraints': s_self.resolver.Value.type_.component.value.location.value.type_.sibling_namespace.constraints
                                    readonly 'value': s_self.resolver.Value.type_.component.value.location.value.type_.sibling_namespace.value
                                }
                                
                                export namespace sibling_namespace {
                                    
                                    export type constraints = {
                                        readonly 'declarations': s_self.resolver.Value.type_.component.value.location.value.type_.sibling_namespace.constraints.declarations
                                    }
                                    
                                    export namespace constraints {
                                        
                                        export type declarations = s_self.declarations.Namespaces
                                        
                                    }
                                    
                                    export type value = {
                                        readonly 'namespace': s_self.resolver.Value.type_.component.value.location.value.type_.sibling_namespace.value.namespace
                                        readonly 'resolver': s_self.resolver.Value.type_.component.value.location.value.type_.sibling_namespace.value.resolver
                                    }
                                    
                                    export namespace value {
                                        
                                        export type namespace = {
                                            readonly 'l entry': s_self.resolver.Value.type_.component.value.location.value.type_.sibling_namespace.value.namespace.l_entry
                                            readonly 'l id': s_self.resolver.Value.type_.component.value.location.value.type_.sibling_namespace.value.namespace.l_id
                                        }
                                        
                                        export namespace namespace {
                                            
                                            export type l_entry = s_self.declarations.Namespaces.D
                                            
                                            export type l_id = string
                                            
                                        }
                                        
                                        export type resolver = {
                                            readonly 'constraints': s_self.resolver.Value.type_.component.value.location.value.type_.sibling_namespace.value.resolver.constraints
                                            readonly 'value': s_self.resolver.Value.type_.component.value.location.value.type_.sibling_namespace.value.resolver.value
                                        }
                                        
                                        export namespace resolver {
                                            
                                            export type constraints = {
                                                readonly 'public': s_self.resolver.Value.type_.component.value.location.value.type_.sibling_namespace.value.resolver.constraints.public_
                                            }
                                            
                                            export namespace constraints {
                                                
                                                export type public_ = s_self.structure.Type.visibility.type_.public_
                                                
                                            }
                                            
                                            export type value = {
                                                readonly 'l entry': s_self.resolver.Value.type_.component.value.location.value.type_.sibling_namespace.value.resolver.value.l_entry
                                                readonly 'l id': s_self.resolver.Value.type_.component.value.location.value.type_.sibling_namespace.value.resolver.value.l_id
                                            }
                                            
                                            export namespace value {
                                                
                                                export type l_entry = s_self.declarations.Declarations.D
                                                
                                                export type l_id = string
                                                
                                            }
                                            
                                        }
                                        
                                    }
                                    
                                }
                                
                            }
                            
                        }
                        
                        export type result = s_self.declarations.Declarations.D
                        
                    }
                    
                    export type arguments_ = p_.Optional_Value<s_self.resolver.Value.type_.component.value.arguments_.O>
                    
                    export namespace arguments_ {
                        
                        export type O = {
                            readonly 'types': s_self.resolver.Value.type_.component.value.arguments_.O.types
                            readonly 'lookups': s_self.resolver.Value.type_.component.value.arguments_.O.lookups
                        }
                        
                        export namespace O {
                            
                            export type types = p_.Optional_Value<s_self.resolver.Value.type_.component.value.arguments_.O.types.O>
                            
                            export namespace types {
                                
                                export type O = p_.Dictionary<s_self.resolver.Value.type_.component.value.arguments_.O.types.O.D>
                                
                                export namespace O {
                                    
                                    export type D = {
                                        readonly 'benchmark': s_self.resolver.Value.type_.component.value.arguments_.O.types.O.D.benchmark
                                        readonly 'value': s_self.resolver.Value.type_.component.value.arguments_.O.types.O.D.value
                                    }
                                    
                                    export namespace D {
                                        
                                        export type benchmark = s_self.declarations.Signature.values.D
                                        
                                        export type value =
                                            | readonly ['optional', s_self.resolver.Value.type_.component.value.arguments_.O.types.O.D.value.type_.optional]
                                            | readonly ['required', s_self.resolver.Value.type_.component.value.arguments_.O.types.O.D.value.type_.required]
                                            | readonly ['parameter', s_self.resolver.Value.type_.component.value.arguments_.O.types.O.D.value.type_.parameter]
                                        
                                        export namespace value {
                                            export namespace type_ {
                                                
                                                export type optional =
                                                    | readonly ['not set', s_self.resolver.Value.type_.component.value.arguments_.O.types.O.D.value.type_.optional.type_.not_set]
                                                    | readonly ['set', s_self.resolver.Value.type_.component.value.arguments_.O.types.O.D.value.type_.optional.type_.set_]
                                                    | readonly ['selection', s_self.resolver.Value.type_.component.value.arguments_.O.types.O.D.value.type_.optional.type_.selection]
                                                
                                                export namespace optional {
                                                    export namespace type_ {
                                                        
                                                        export type not_set = null
                                                        
                                                        export type set_ = s_self.resolver.Guaranteed_Value_Selection
                                                        
                                                        export type selection = s_self.resolver.Possible_Value_Selection
                                                        
                                                    }
                                                    
                                                }
                                                
                                                export type required = s_self.resolver.Guaranteed_Value_Selection
                                                
                                                export type parameter = {
                                                    readonly 'l entry': s_self.resolver.Value.type_.component.value.arguments_.O.types.O.D.value.type_.parameter.l_entry
                                                    readonly 'l id': s_self.resolver.Value.type_.component.value.arguments_.O.types.O.D.value.type_.parameter.l_id
                                                }
                                                
                                                export namespace parameter {
                                                    
                                                    export type l_entry = s_self.declarations.Signature.values.D
                                                    
                                                    export type l_id = string
                                                    
                                                }
                                                
                                            }
                                            
                                        }
                                        
                                    }
                                    
                                }
                                
                            }
                            
                            export type lookups = p_.Optional_Value<s_self.resolver.Value.type_.component.value.arguments_.O.lookups.O>
                            
                            export namespace lookups {
                                
                                export type O = p_.Dictionary<s_self.resolver.Value.type_.component.value.arguments_.O.lookups.O.D>
                                
                                export namespace O {
                                    
                                    export type D = {
                                        readonly 'benchmark': s_self.resolver.Value.type_.component.value.arguments_.O.lookups.O.D.benchmark
                                        readonly 'value': s_self.resolver.Value.type_.component.value.arguments_.O.lookups.O.D.value
                                    }
                                    
                                    export namespace D {
                                        
                                        export type benchmark = s_self.declarations.Signature.lookups.D
                                        
                                        export type value =
                                            | readonly ['acyclic', s_self.resolver.Value.type_.component.value.arguments_.O.lookups.O.D.value.type_.acyclic]
                                            | readonly ['cyclic', s_self.resolver.Value.type_.component.value.arguments_.O.lookups.O.D.value.type_.cyclic]
                                            | readonly ['selection', s_self.resolver.Value.type_.component.value.arguments_.O.lookups.O.D.value.type_.selection]
                                        
                                        export namespace value {
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
                        
                    }
                    
                    export type constraints = s_self.resolver.Reference_Constraints
                    
                }
                
            }
            
            export type dictionary = {
                readonly 'constraints': s_self.resolver.Value.type_.dictionary.constraints
                readonly 'value': s_self.resolver.Value.type_.dictionary.value
            }
            
            export namespace dictionary {
                
                export type constraints = {
                    readonly 'definition': s_self.resolver.Value.type_.dictionary.constraints.definition
                }
                
                export namespace constraints {
                    
                    export type definition = s_self.structure.Value.type_.dictionary
                    
                }
                
                export type value = {
                    readonly 'resolver': s_self.resolver.Value.type_.dictionary.value.resolver
                    readonly 'benchmark': s_self.resolver.Value.type_.dictionary.value.benchmark
                }
                
                export namespace value {
                    
                    export type resolver = s_self.resolver.Value
                    
                    export type benchmark = p_.Optional_Value<s_self.resolver.Value.type_.dictionary.value.benchmark.O>
                    
                    export namespace benchmark {
                        
                        export type O = {
                            readonly 'constraints': s_self.resolver.Value.type_.dictionary.value.benchmark.O.constraints
                            readonly 'value': s_self.resolver.Value.type_.dictionary.value.benchmark.O.value
                        }
                        
                        export namespace O {
                            
                            export type constraints = {
                                readonly 'benchmark': s_self.resolver.Value.type_.dictionary.value.benchmark.O.constraints.benchmark
                            }
                            
                            export namespace constraints {
                                
                                export type benchmark = s_self.structure.Dictionary.benchmark.O
                                
                            }
                            
                            export type value = {
                                readonly 'selection': s_self.resolver.Value.type_.dictionary.value.benchmark.O.value.selection
                            }
                            
                            export namespace value {
                                
                                export type selection = {
                                    readonly 'constraints': s_self.resolver.Value.type_.dictionary.value.benchmark.O.value.selection.constraints
                                    readonly 'value': s_self.resolver.Value.type_.dictionary.value.benchmark.O.value.selection.value
                                }
                                
                                export namespace selection {
                                    
                                    export type constraints = {
                                        readonly 'dictionary': s_self.resolver.Value.type_.dictionary.value.benchmark.O.value.selection.constraints.dictionary
                                    }
                                    
                                    export namespace constraints {
                                        
                                        export type dictionary = s_self.structure.Value.type_.dictionary
                                        
                                    }
                                    
                                    export type value = s_self.resolver.Guaranteed_Value_Selection
                                    
                                }
                                
                            }
                            
                        }
                        
                    }
                    
                }
                
            }
            
            export type group = {
                readonly 'constraints': s_self.resolver.Value.type_.group.constraints
                readonly 'value': s_self.resolver.Value.type_.group.value
            }
            
            export namespace group {
                
                export type constraints = {
                    readonly 'definition': s_self.resolver.Value.type_.group.constraints.definition
                }
                
                export namespace constraints {
                    
                    export type definition = s_self.structure.Value.type_.group
                    
                }
                
                export type value = p_.Dictionary<s_self.resolver.Value.type_.group.value.D>
                
                export namespace value {
                    
                    export type D = {
                        readonly 'benchmark': s_self.resolver.Value.type_.group.value.D.benchmark
                        readonly 'value': s_self.resolver.Value.type_.group.value.D.value
                    }
                    
                    export namespace D {
                        
                        export type benchmark = s_self.structure.Group.D
                        
                        export type value = {
                            readonly 'resolver': s_self.resolver.Value.type_.group.value.D.value.resolver
                        }
                        
                        export namespace value {
                            
                            export type resolver = s_self.resolver.Value
                            
                        }
                        
                    }
                    
                }
                
            }
            
            export type list = {
                readonly 'constraints': s_self.resolver.Value.type_.list.constraints
                readonly 'value': s_self.resolver.Value.type_.list.value
            }
            
            export namespace list {
                
                export type constraints = {
                    readonly 'definition': s_self.resolver.Value.type_.list.constraints.definition
                }
                
                export namespace constraints {
                    
                    export type definition = s_self.structure.Value.type_.list
                    
                }
                
                export type value = {
                    readonly 'resolver': s_self.resolver.Value.type_.list.value.resolver
                    readonly 'result': s_self.resolver.Value.type_.list.value.result
                }
                
                export namespace value {
                    
                    export type resolver = s_self.resolver.Value
                    
                    export type result = p_.Optional_Value<s_self.resolver.Value.type_.list.value.result.O>
                    
                    export namespace result {
                        
                        export type O = {
                            readonly 'constraints': s_self.resolver.Value.type_.list.value.result.O.constraints
                            readonly 'value': s_self.resolver.Value.type_.list.value.result.O.value
                        }
                        
                        export namespace O {
                            
                            export type constraints = {
                                readonly 'definition': s_self.resolver.Value.type_.list.value.result.O.constraints.definition
                                readonly 'result': s_self.resolver.Value.type_.list.value.result.O.constraints.result
                            }
                            
                            export namespace constraints {
                                
                                export type definition = s_self.structure.Value.type_.list
                                
                                export type result = s_self.structure.Value_Result.O
                                
                            }
                            
                            export type value = {
                                readonly 'initial': s_self.resolver.Value.type_.list.value.result.O.value.initial
                                readonly 'next': s_self.resolver.Value.type_.list.value.result.O.value.next
                            }
                            
                            export namespace value {
                                
                                export type initial = s_self.resolver.Guaranteed_Value_Selection
                                
                                export type next = s_self.resolver.Result_Selection
                                
                            }
                            
                        }
                        
                    }
                    
                }
                
            }
            
            export type nothing = {
                readonly 'constraints': s_self.resolver.Value.type_.nothing.constraints
                readonly 'value': s_self.resolver.Value.type_.nothing.value
            }
            
            export namespace nothing {
                
                export type constraints = {
                    readonly 'definition': s_self.resolver.Value.type_.nothing.constraints.definition
                }
                
                export namespace constraints {
                    
                    export type definition = s_self.structure.Value.type_.nothing
                    
                }
                
                export type value = null
                
            }
            
            export type simple = {
                readonly 'constraints': s_self.resolver.Value.type_.simple.constraints
                readonly 'value': s_self.resolver.Value.type_.simple.value
            }
            
            export namespace simple {
                
                export type constraints = {
                    readonly 'definition': s_self.resolver.Value.type_.simple.constraints.definition
                }
                
                export namespace constraints {
                    
                    export type definition = s_self.structure.Value.type_.simple.value
                    
                }
                
                export type value = null
                
            }
            
            export type optional = {
                readonly 'constraints': s_self.resolver.Value.type_.optional.constraints
                readonly 'value': s_self.resolver.Value.type_.optional.value
            }
            
            export namespace optional {
                
                export type constraints = {
                    readonly 'definition': s_self.resolver.Value.type_.optional.constraints.definition
                }
                
                export namespace constraints {
                    
                    export type definition = s_self.structure.Value.type_.optional
                    
                }
                
                export type value = {
                    readonly 'presence': s_self.resolver.Value.type_.optional.value.presence
                    readonly 'constraints': s_self.resolver.Value.type_.optional.value.constraints
                    readonly 'resolver': s_self.resolver.Value.type_.optional.value.resolver
                    readonly 'not set constraints': s_self.resolver.Value.type_.optional.value.not_set_constraints
                    readonly 'result': s_self.resolver.Value.type_.optional.value.result
                    readonly 'checks': s_self.resolver.Value.type_.optional.value.checks
                }
                
                export namespace value {
                    
                    export type presence = p_.Optional_Value<s_self.resolver.Value.type_.optional.value.presence.O>
                    
                    export namespace presence {
                        
                        export type O = s_self.resolver.Possible_Value_Selection
                        
                    }
                    
                    export type constraints = s_self.resolver.Option_Constraints
                    
                    export type resolver = s_self.resolver.Value
                    
                    export type not_set_constraints = p_.Optional_Value<s_self.resolver.Value.type_.optional.value.not_set_constraints.O>
                    
                    export namespace not_set_constraints {
                        
                        export type O = p_.Dictionary<s_self.resolver.Value.type_.optional.value.not_set_constraints.O.D>
                        
                        export namespace O {
                            
                            export type D = s_self.resolver.Possible_Value_Selection
                            
                        }
                        
                    }
                    
                    export type result = p_.Optional_Value<s_self.resolver.Value.type_.optional.value.result.O>
                    
                    export namespace result {
                        
                        export type O = {
                            readonly 'constraints': s_self.resolver.Value.type_.optional.value.result.O.constraints
                            readonly 'value': s_self.resolver.Value.type_.optional.value.result.O.value
                        }
                        
                        export namespace O {
                            
                            export type constraints = {
                                readonly 'definition': s_self.resolver.Value.type_.optional.value.result.O.constraints.definition
                                readonly 'result': s_self.resolver.Value.type_.optional.value.result.O.constraints.result
                            }
                            
                            export namespace constraints {
                                
                                export type definition = s_self.structure.Value.type_.optional
                                
                                export type result = s_self.structure.Value_Result.O
                                
                            }
                            
                            export type value = s_self.resolver.Result_Selection
                            
                        }
                        
                    }
                    
                    export type checks = s_self.resolver.Checks
                    
                }
                
            }
            
            export type reference = {
                readonly 'constraints': s_self.resolver.Value.type_.reference.constraints
                readonly 'value': s_self.resolver.Value.type_.reference.value
            }
            
            export namespace reference {
                
                export type constraints = {
                    readonly 'definition': s_self.resolver.Value.type_.reference.constraints.definition
                }
                
                export namespace constraints {
                    
                    export type definition = s_self.structure.Value.type_.reference
                    
                }
                
                export type value = {
                    readonly 'type': s_self.resolver.Value.type_.reference.value.type_
                }
                
                export namespace value {
                    
                    export type type_ = {
                        readonly 'lookup': s_self.resolver.Value.type_.reference.value.type_.lookup
                        readonly 'constraints': s_self.resolver.Value.type_.reference.value.type_.constraints
                    }
                    
                    export namespace type_ {
                        
                        export type lookup = s_self.resolver.Lookup_Selection
                        
                        export type constraints = s_self.resolver.Reference_Constraints
                        
                    }
                    
                }
                
            }
            
            export type state = {
                readonly 'constraints': s_self.resolver.Value.type_.state.constraints
                readonly 'value': s_self.resolver.Value.type_.state.value
            }
            
            export namespace state {
                
                export type constraints = {
                    readonly 'definition': s_self.resolver.Value.type_.state.constraints.definition
                }
                
                export namespace constraints {
                    
                    export type definition = s_self.structure.Value.type_.state
                    
                }
                
                export type value = {
                    readonly 'options': s_self.resolver.Value.type_.state.value.options
                }
                
                export namespace value {
                    
                    export type options = p_.Dictionary<s_self.resolver.Value.type_.state.value.options.D>
                    
                    export namespace options {
                        
                        export type D = {
                            readonly 'benchmark': s_self.resolver.Value.type_.state.value.options.D.benchmark
                            readonly 'value': s_self.resolver.Value.type_.state.value.options.D.value
                        }
                        
                        export namespace D {
                            
                            export type benchmark = s_self.structure.Value.type_.state.options.D
                            
                            export type value = {
                                readonly 'constraints': s_self.resolver.Value.type_.state.value.options.D.value.constraints
                                readonly 'resolver': s_self.resolver.Value.type_.state.value.options.D.value.resolver
                                readonly 'result': s_self.resolver.Value.type_.state.value.options.D.value.result
                                readonly 'checks': s_self.resolver.Value.type_.state.value.options.D.value.checks
                            }
                            
                            export namespace value {
                                
                                export type constraints = s_self.resolver.Option_Constraints
                                
                                export type resolver = s_self.resolver.Value
                                
                                export type result = p_.Optional_Value<s_self.resolver.Value.type_.state.value.options.D.value.result.O>
                                
                                export namespace result {
                                    
                                    export type O = {
                                        readonly 'constraints': s_self.resolver.Value.type_.state.value.options.D.value.result.O.constraints
                                        readonly 'value': s_self.resolver.Value.type_.state.value.options.D.value.result.O.value
                                    }
                                    
                                    export namespace O {
                                        
                                        export type constraints = {
                                            readonly 'result': s_self.resolver.Value.type_.state.value.options.D.value.result.O.constraints.result
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type result = s_self.structure.Value_Result.O
                                            
                                        }
                                        
                                        export type value = s_self.resolver.Result_Selection
                                        
                                    }
                                    
                                }
                                
                                export type checks = s_self.resolver.Checks
                                
                            }
                            
                        }
                        
                    }
                    
                }
                
            }
            
        }
        
    }
    
}
