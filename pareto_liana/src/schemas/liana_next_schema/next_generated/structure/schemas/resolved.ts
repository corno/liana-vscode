import type * as p_ from 'pareto-core/schema'

import type * as s_self from "./resolved.js"

export type Directory =
    | readonly ['group', {
        readonly 'nodes': p_.Dictionary<s_self.Node>
    }]
    | readonly ['dictionary', {
        readonly 'node': s_self.Node
    }]

export namespace Directory {
    export namespace type_ {
        
        export type group = {
            readonly 'nodes': p_.Dictionary<s_self.Node>
        }
        
        export namespace group {
            
            export type nodes = p_.Dictionary<s_self.Node>
            
            export namespace nodes {
                
                export type D = s_self.Node
                
            }
            
        }
        
        export type dictionary = {
            readonly 'node': s_self.Node
        }
        
        export namespace dictionary {
            
            export type node = s_self.Node
            
        }
        
    }
    
}

export type Node =
    | readonly ['file', {
        readonly 'file extension': string
        readonly 'type': {
            readonly 'constraints': {
                readonly 'public': s_self.structure.Type.visibility.type_.public_
            }
            readonly 'value': {
                readonly 'l entry': s_self.structure.Types.D
                readonly 'l id': string
            }
        }
    }]
    | readonly ['directory', s_self.Directory]

export namespace Node {
    export namespace type_ {
        
        export type file = {
            readonly 'file extension': string
            readonly 'type': {
                readonly 'constraints': {
                    readonly 'public': s_self.structure.Type.visibility.type_.public_
                }
                readonly 'value': {
                    readonly 'l entry': s_self.structure.Types.D
                    readonly 'l id': string
                }
            }
        }
        
        export namespace file {
            
            export type file_extension = string
            
            export type type_ = {
                readonly 'constraints': {
                    readonly 'public': s_self.structure.Type.visibility.type_.public_
                }
                readonly 'value': {
                    readonly 'l entry': s_self.structure.Types.D
                    readonly 'l id': string
                }
            }
            
            export namespace type_ {
                
                export type constraints = {
                    readonly 'public': s_self.structure.Type.visibility.type_.public_
                }
                
                export namespace constraints {
                    
                    export type public_ = s_self.structure.Type.visibility.type_.public_
                    
                }
                
                export type value = {
                    readonly 'l entry': s_self.structure.Types.D
                    readonly 'l id': string
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
    readonly 'schema': {
        readonly 'structure': s_self.structure.Structure
        readonly 'resolver': {
            readonly 'declarations': s_self.declarations.Declaration_Namespace
            readonly 'implementations': s_self.resolver.Resolver
        }
    }
    readonly 'directory': s_self.Directory
}

export namespace Type_Specification {
    
    export type schema = {
        readonly 'structure': s_self.structure.Structure
        readonly 'resolver': {
            readonly 'declarations': s_self.declarations.Declaration_Namespace
            readonly 'implementations': s_self.resolver.Resolver
        }
    }
    
    export namespace schema {
        
        export type structure = s_self.structure.Structure
        
        export type resolver = {
            readonly 'declarations': s_self.declarations.Declaration_Namespace
            readonly 'implementations': s_self.resolver.Resolver
        }
        
        export namespace resolver {
            
            export type declarations = s_self.declarations.Declaration_Namespace
            
            export type implementations = s_self.resolver.Resolver
            
        }
        
    }
    
    export type directory = s_self.Directory
    
}

export namespace structure {
    
    export type Regular_Expression =
        | readonly ['any character', null]
        | readonly ['literal', string]
        | readonly ['character set', string]
        | readonly ['sequence', p_.List<s_self.structure.Regular_Expression>]
        | readonly ['choice', p_.List<s_self.structure.Regular_Expression>]
        | readonly ['repetition', {
            readonly 'expression': s_self.structure.Regular_Expression
            readonly 'quantity':
                | readonly ['optional', null]
                | readonly ['zero or more', null]
                | readonly ['one or more', null]
        }]
    
    export namespace Regular_Expression {
        export namespace type_ {
            
            export type any_character = null
            
            export type literal = string
            
            export type character_set = string
            
            export type sequence = p_.List<s_self.structure.Regular_Expression>
            
            export namespace sequence {
                
                export type L = s_self.structure.Regular_Expression
                
            }
            
            export type choice = p_.List<s_self.structure.Regular_Expression>
            
            export namespace choice {
                
                export type L = s_self.structure.Regular_Expression
                
            }
            
            export type repetition = {
                readonly 'expression': s_self.structure.Regular_Expression
                readonly 'quantity':
                    | readonly ['optional', null]
                    | readonly ['zero or more', null]
                    | readonly ['one or more', null]
            }
            
            export namespace repetition {
                
                export type expression = s_self.structure.Regular_Expression
                
                export type quantity =
                    | readonly ['optional', null]
                    | readonly ['zero or more', null]
                    | readonly ['one or more', null]
                
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
    
    export type Basic_Types = p_.Dictionary<{
        readonly 'type':
            | readonly ['double quoted', null]
            | readonly ['undelimited', null]
        readonly 'regular expression': p_.Optional_Value<s_self.structure.Regular_Expression>
        readonly 'hyperlink': p_.Optional_Value<{
            readonly 'prefix': string
            readonly 'suffix': string
        }>
    }>
    
    export namespace Basic_Types {
        
        export type D = {
            readonly 'type':
                | readonly ['double quoted', null]
                | readonly ['undelimited', null]
            readonly 'regular expression': p_.Optional_Value<s_self.structure.Regular_Expression>
            readonly 'hyperlink': p_.Optional_Value<{
                readonly 'prefix': string
                readonly 'suffix': string
            }>
        }
        
        export namespace D {
            
            export type type_ =
                | readonly ['double quoted', null]
                | readonly ['undelimited', null]
            
            export namespace type_ {
                export namespace type_ {
                    
                    export type double_quoted = null
                    
                    export type undelimited = null
                    
                }
                
            }
            
            export type regular_expression = p_.Optional_Value<s_self.structure.Regular_Expression>
            
            export namespace regular_expression {
                
                export type O = s_self.structure.Regular_Expression
                
            }
            
            export type hyperlink = p_.Optional_Value<{
                readonly 'prefix': string
                readonly 'suffix': string
            }>
            
            export namespace hyperlink {
                
                export type O = {
                    readonly 'prefix': string
                    readonly 'suffix': string
                }
                
                export namespace O {
                    
                    export type prefix = string
                    
                    export type suffix = string
                    
                }
                
            }
            
        }
        
    }
    
    export type Types = p_.Dictionary<s_self.structure.Type>
    
    export namespace Types {
        
        export type D = s_self.structure.Type
        
    }
    
    export type Namespaces = p_.Dictionary<s_self.structure.Structure>
    
    export namespace Namespaces {
        
        export type D = s_self.structure.Structure
        
    }
    
    export type Type = {
        readonly 'visibility':
            | readonly ['private', null]
            | readonly ['private single use', null]
            | readonly ['public', null]
        readonly 'root value': s_self.structure.Value
    }
    
    export namespace Type {
        
        export type visibility =
            | readonly ['private', null]
            | readonly ['private single use', null]
            | readonly ['public', null]
        
        export namespace visibility {
            export namespace type_ {
                
                export type private_ = null
                
                export type private_single_use = null
                
                export type public_ = null
                
            }
            
        }
        
        export type root_value = s_self.structure.Value
        
    }
    
    export type Group = p_.Dictionary<{
        readonly 'description': p_.Optional_Value<string>
        readonly 'value': s_self.structure.Value
    }>
    
    export namespace Group {
        
        export type D = {
            readonly 'description': p_.Optional_Value<string>
            readonly 'value': s_self.structure.Value
        }
        
        export namespace D {
            
            export type description = p_.Optional_Value<string>
            
            export namespace description {
                
                export type O = string
                
            }
            
            export type value = s_self.structure.Value
            
        }
        
    }
    
    export type Value =
        | readonly ['component', {
            readonly 'type':
                | readonly ['simple', 
                    | readonly ['local', {
                        readonly 'l entry': p_.Circular_Dependency<s_self.structure.Types.D>
                        readonly 'l id': string
                    }]
                    | readonly ['child namespace', {
                        readonly 'namespace': {
                            readonly 'l entry': s_self.structure.Namespaces.D
                            readonly 'l id': string
                        }
                        readonly 'type': {
                            readonly 'constraints': {
                                readonly 'public': s_self.structure.Type.visibility.type_.public_
                            }
                            readonly 'value': {
                                readonly 'l entry': s_self.structure.Types.D
                                readonly 'l id': string
                            }
                        }
                    }]
                    | readonly ['sibling namespace', {
                        readonly 'namespace': {
                            readonly 'l entry': s_self.structure.Namespaces.D
                            readonly 'l id': string
                        }
                        readonly 'type': {
                            readonly 'constraints': {
                                readonly 'public': s_self.structure.Type.visibility.type_.public_
                            }
                            readonly 'value': {
                                readonly 'l entry': s_self.structure.Types.D
                                readonly 'l id': string
                            }
                        }
                    }]
                ]
                | readonly ['navigable', {
                    readonly 'value':
                        | readonly ['local', {
                            readonly 'l entry': s_self.structure.Types.D
                            readonly 'l id': string
                        }]
                        | readonly ['child namespace', {
                            readonly 'namespace': {
                                readonly 'l entry': s_self.structure.Namespaces.D
                                readonly 'l id': string
                            }
                            readonly 'type': {
                                readonly 'constraints': {
                                    readonly 'public': s_self.structure.Type.visibility.type_.public_
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Types.D
                                    readonly 'l id': string
                                }
                            }
                        }]
                        | readonly ['sibling namespace', {
                            readonly 'namespace': {
                                readonly 'l entry': s_self.structure.Namespaces.D
                                readonly 'l id': string
                            }
                            readonly 'type': {
                                readonly 'constraints': {
                                    readonly 'public': s_self.structure.Type.visibility.type_.public_
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Types.D
                                    readonly 'l id': string
                                }
                            }
                        }]
                    readonly 'result': s_self.structure.Type
                }]
            readonly 'constraints': s_self.structure.Reference_Constraints
        }]
        | readonly ['dictionary', s_self.structure.Dictionary]
        | readonly ['group', s_self.structure.Group]
        | readonly ['list', {
            readonly 'value': s_self.structure.Value
            readonly 'result': s_self.structure.Value_Result
        }]
        | readonly ['nothing', null]
        | readonly ['simple', {
            readonly 'constraints': {
                readonly 'basic types': s_self.structure.Basic_Types
            }
            readonly 'value': {
                readonly 'l entry': s_self.structure.Basic_Types.D
                readonly 'l id': string
            }
        }]
        | readonly ['optional', {
            readonly 'constraints': s_self.structure.Option_Constraints
            readonly 'value': s_self.structure.Value
            readonly 'result': s_self.structure.Value_Result
        }]
        | readonly ['reference', s_self.structure.Reference]
        | readonly ['state', {
            readonly 'options': p_.Dictionary<{
                readonly 'description': p_.Optional_Value<string>
                readonly 'constraints': s_self.structure.Option_Constraints
                readonly 'value': s_self.structure.Value
            }>
            readonly 'result': s_self.structure.Value_Result
        }]
    
    export namespace Value {
        export namespace type_ {
            
            export type component = {
                readonly 'type':
                    | readonly ['simple', 
                        | readonly ['local', {
                            readonly 'l entry': p_.Circular_Dependency<s_self.structure.Types.D>
                            readonly 'l id': string
                        }]
                        | readonly ['child namespace', {
                            readonly 'namespace': {
                                readonly 'l entry': s_self.structure.Namespaces.D
                                readonly 'l id': string
                            }
                            readonly 'type': {
                                readonly 'constraints': {
                                    readonly 'public': s_self.structure.Type.visibility.type_.public_
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Types.D
                                    readonly 'l id': string
                                }
                            }
                        }]
                        | readonly ['sibling namespace', {
                            readonly 'namespace': {
                                readonly 'l entry': s_self.structure.Namespaces.D
                                readonly 'l id': string
                            }
                            readonly 'type': {
                                readonly 'constraints': {
                                    readonly 'public': s_self.structure.Type.visibility.type_.public_
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Types.D
                                    readonly 'l id': string
                                }
                            }
                        }]
                    ]
                    | readonly ['navigable', {
                        readonly 'value':
                            | readonly ['local', {
                                readonly 'l entry': s_self.structure.Types.D
                                readonly 'l id': string
                            }]
                            | readonly ['child namespace', {
                                readonly 'namespace': {
                                    readonly 'l entry': s_self.structure.Namespaces.D
                                    readonly 'l id': string
                                }
                                readonly 'type': {
                                    readonly 'constraints': {
                                        readonly 'public': s_self.structure.Type.visibility.type_.public_
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Types.D
                                        readonly 'l id': string
                                    }
                                }
                            }]
                            | readonly ['sibling namespace', {
                                readonly 'namespace': {
                                    readonly 'l entry': s_self.structure.Namespaces.D
                                    readonly 'l id': string
                                }
                                readonly 'type': {
                                    readonly 'constraints': {
                                        readonly 'public': s_self.structure.Type.visibility.type_.public_
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Types.D
                                        readonly 'l id': string
                                    }
                                }
                            }]
                        readonly 'result': s_self.structure.Type
                    }]
                readonly 'constraints': s_self.structure.Reference_Constraints
            }
            
            export namespace component {
                
                export type type_ =
                    | readonly ['simple', 
                        | readonly ['local', {
                            readonly 'l entry': p_.Circular_Dependency<s_self.structure.Types.D>
                            readonly 'l id': string
                        }]
                        | readonly ['child namespace', {
                            readonly 'namespace': {
                                readonly 'l entry': s_self.structure.Namespaces.D
                                readonly 'l id': string
                            }
                            readonly 'type': {
                                readonly 'constraints': {
                                    readonly 'public': s_self.structure.Type.visibility.type_.public_
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Types.D
                                    readonly 'l id': string
                                }
                            }
                        }]
                        | readonly ['sibling namespace', {
                            readonly 'namespace': {
                                readonly 'l entry': s_self.structure.Namespaces.D
                                readonly 'l id': string
                            }
                            readonly 'type': {
                                readonly 'constraints': {
                                    readonly 'public': s_self.structure.Type.visibility.type_.public_
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Types.D
                                    readonly 'l id': string
                                }
                            }
                        }]
                    ]
                    | readonly ['navigable', {
                        readonly 'value':
                            | readonly ['local', {
                                readonly 'l entry': s_self.structure.Types.D
                                readonly 'l id': string
                            }]
                            | readonly ['child namespace', {
                                readonly 'namespace': {
                                    readonly 'l entry': s_self.structure.Namespaces.D
                                    readonly 'l id': string
                                }
                                readonly 'type': {
                                    readonly 'constraints': {
                                        readonly 'public': s_self.structure.Type.visibility.type_.public_
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Types.D
                                        readonly 'l id': string
                                    }
                                }
                            }]
                            | readonly ['sibling namespace', {
                                readonly 'namespace': {
                                    readonly 'l entry': s_self.structure.Namespaces.D
                                    readonly 'l id': string
                                }
                                readonly 'type': {
                                    readonly 'constraints': {
                                        readonly 'public': s_self.structure.Type.visibility.type_.public_
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Types.D
                                        readonly 'l id': string
                                    }
                                }
                            }]
                        readonly 'result': s_self.structure.Type
                    }]
                
                export namespace type_ {
                    export namespace type_ {
                        
                        export type simple =
                            | readonly ['local', {
                                readonly 'l entry': p_.Circular_Dependency<s_self.structure.Types.D>
                                readonly 'l id': string
                            }]
                            | readonly ['child namespace', {
                                readonly 'namespace': {
                                    readonly 'l entry': s_self.structure.Namespaces.D
                                    readonly 'l id': string
                                }
                                readonly 'type': {
                                    readonly 'constraints': {
                                        readonly 'public': s_self.structure.Type.visibility.type_.public_
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Types.D
                                        readonly 'l id': string
                                    }
                                }
                            }]
                            | readonly ['sibling namespace', {
                                readonly 'namespace': {
                                    readonly 'l entry': s_self.structure.Namespaces.D
                                    readonly 'l id': string
                                }
                                readonly 'type': {
                                    readonly 'constraints': {
                                        readonly 'public': s_self.structure.Type.visibility.type_.public_
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Types.D
                                        readonly 'l id': string
                                    }
                                }
                            }]
                        
                        export namespace simple {
                            export namespace type_ {
                                
                                export type local = {
                                    readonly 'l entry': p_.Circular_Dependency<s_self.structure.Types.D>
                                    readonly 'l id': string
                                }
                                
                                export namespace local {
                                    
                                    export type l_entry = p_.Circular_Dependency<s_self.structure.Types.D>
                                    
                                    export type l_id = string
                                    
                                }
                                
                                export type child_namespace = {
                                    readonly 'namespace': {
                                        readonly 'l entry': s_self.structure.Namespaces.D
                                        readonly 'l id': string
                                    }
                                    readonly 'type': {
                                        readonly 'constraints': {
                                            readonly 'public': s_self.structure.Type.visibility.type_.public_
                                        }
                                        readonly 'value': {
                                            readonly 'l entry': s_self.structure.Types.D
                                            readonly 'l id': string
                                        }
                                    }
                                }
                                
                                export namespace child_namespace {
                                    
                                    export type namespace = {
                                        readonly 'l entry': s_self.structure.Namespaces.D
                                        readonly 'l id': string
                                    }
                                    
                                    export namespace namespace {
                                        
                                        export type l_entry = s_self.structure.Namespaces.D
                                        
                                        export type l_id = string
                                        
                                    }
                                    
                                    export type type_ = {
                                        readonly 'constraints': {
                                            readonly 'public': s_self.structure.Type.visibility.type_.public_
                                        }
                                        readonly 'value': {
                                            readonly 'l entry': s_self.structure.Types.D
                                            readonly 'l id': string
                                        }
                                    }
                                    
                                    export namespace type_ {
                                        
                                        export type constraints = {
                                            readonly 'public': s_self.structure.Type.visibility.type_.public_
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type public_ = s_self.structure.Type.visibility.type_.public_
                                            
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': s_self.structure.Types.D
                                            readonly 'l id': string
                                        }
                                        
                                        export namespace value {
                                            
                                            export type l_entry = s_self.structure.Types.D
                                            
                                            export type l_id = string
                                            
                                        }
                                        
                                    }
                                    
                                }
                                
                                export type sibling_namespace = {
                                    readonly 'namespace': {
                                        readonly 'l entry': s_self.structure.Namespaces.D
                                        readonly 'l id': string
                                    }
                                    readonly 'type': {
                                        readonly 'constraints': {
                                            readonly 'public': s_self.structure.Type.visibility.type_.public_
                                        }
                                        readonly 'value': {
                                            readonly 'l entry': s_self.structure.Types.D
                                            readonly 'l id': string
                                        }
                                    }
                                }
                                
                                export namespace sibling_namespace {
                                    
                                    export type namespace = {
                                        readonly 'l entry': s_self.structure.Namespaces.D
                                        readonly 'l id': string
                                    }
                                    
                                    export namespace namespace {
                                        
                                        export type l_entry = s_self.structure.Namespaces.D
                                        
                                        export type l_id = string
                                        
                                    }
                                    
                                    export type type_ = {
                                        readonly 'constraints': {
                                            readonly 'public': s_self.structure.Type.visibility.type_.public_
                                        }
                                        readonly 'value': {
                                            readonly 'l entry': s_self.structure.Types.D
                                            readonly 'l id': string
                                        }
                                    }
                                    
                                    export namespace type_ {
                                        
                                        export type constraints = {
                                            readonly 'public': s_self.structure.Type.visibility.type_.public_
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type public_ = s_self.structure.Type.visibility.type_.public_
                                            
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': s_self.structure.Types.D
                                            readonly 'l id': string
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
                            readonly 'value':
                                | readonly ['local', {
                                    readonly 'l entry': s_self.structure.Types.D
                                    readonly 'l id': string
                                }]
                                | readonly ['child namespace', {
                                    readonly 'namespace': {
                                        readonly 'l entry': s_self.structure.Namespaces.D
                                        readonly 'l id': string
                                    }
                                    readonly 'type': {
                                        readonly 'constraints': {
                                            readonly 'public': s_self.structure.Type.visibility.type_.public_
                                        }
                                        readonly 'value': {
                                            readonly 'l entry': s_self.structure.Types.D
                                            readonly 'l id': string
                                        }
                                    }
                                }]
                                | readonly ['sibling namespace', {
                                    readonly 'namespace': {
                                        readonly 'l entry': s_self.structure.Namespaces.D
                                        readonly 'l id': string
                                    }
                                    readonly 'type': {
                                        readonly 'constraints': {
                                            readonly 'public': s_self.structure.Type.visibility.type_.public_
                                        }
                                        readonly 'value': {
                                            readonly 'l entry': s_self.structure.Types.D
                                            readonly 'l id': string
                                        }
                                    }
                                }]
                            readonly 'result': s_self.structure.Type
                        }
                        
                        export namespace navigable {
                            
                            export type value =
                                | readonly ['local', {
                                    readonly 'l entry': s_self.structure.Types.D
                                    readonly 'l id': string
                                }]
                                | readonly ['child namespace', {
                                    readonly 'namespace': {
                                        readonly 'l entry': s_self.structure.Namespaces.D
                                        readonly 'l id': string
                                    }
                                    readonly 'type': {
                                        readonly 'constraints': {
                                            readonly 'public': s_self.structure.Type.visibility.type_.public_
                                        }
                                        readonly 'value': {
                                            readonly 'l entry': s_self.structure.Types.D
                                            readonly 'l id': string
                                        }
                                    }
                                }]
                                | readonly ['sibling namespace', {
                                    readonly 'namespace': {
                                        readonly 'l entry': s_self.structure.Namespaces.D
                                        readonly 'l id': string
                                    }
                                    readonly 'type': {
                                        readonly 'constraints': {
                                            readonly 'public': s_self.structure.Type.visibility.type_.public_
                                        }
                                        readonly 'value': {
                                            readonly 'l entry': s_self.structure.Types.D
                                            readonly 'l id': string
                                        }
                                    }
                                }]
                            
                            export namespace value {
                                export namespace type_ {
                                    
                                    export type local = {
                                        readonly 'l entry': s_self.structure.Types.D
                                        readonly 'l id': string
                                    }
                                    
                                    export namespace local {
                                        
                                        export type l_entry = s_self.structure.Types.D
                                        
                                        export type l_id = string
                                        
                                    }
                                    
                                    export type child_namespace = {
                                        readonly 'namespace': {
                                            readonly 'l entry': s_self.structure.Namespaces.D
                                            readonly 'l id': string
                                        }
                                        readonly 'type': {
                                            readonly 'constraints': {
                                                readonly 'public': s_self.structure.Type.visibility.type_.public_
                                            }
                                            readonly 'value': {
                                                readonly 'l entry': s_self.structure.Types.D
                                                readonly 'l id': string
                                            }
                                        }
                                    }
                                    
                                    export namespace child_namespace {
                                        
                                        export type namespace = {
                                            readonly 'l entry': s_self.structure.Namespaces.D
                                            readonly 'l id': string
                                        }
                                        
                                        export namespace namespace {
                                            
                                            export type l_entry = s_self.structure.Namespaces.D
                                            
                                            export type l_id = string
                                            
                                        }
                                        
                                        export type type_ = {
                                            readonly 'constraints': {
                                                readonly 'public': s_self.structure.Type.visibility.type_.public_
                                            }
                                            readonly 'value': {
                                                readonly 'l entry': s_self.structure.Types.D
                                                readonly 'l id': string
                                            }
                                        }
                                        
                                        export namespace type_ {
                                            
                                            export type constraints = {
                                                readonly 'public': s_self.structure.Type.visibility.type_.public_
                                            }
                                            
                                            export namespace constraints {
                                                
                                                export type public_ = s_self.structure.Type.visibility.type_.public_
                                                
                                            }
                                            
                                            export type value = {
                                                readonly 'l entry': s_self.structure.Types.D
                                                readonly 'l id': string
                                            }
                                            
                                            export namespace value {
                                                
                                                export type l_entry = s_self.structure.Types.D
                                                
                                                export type l_id = string
                                                
                                            }
                                            
                                        }
                                        
                                    }
                                    
                                    export type sibling_namespace = {
                                        readonly 'namespace': {
                                            readonly 'l entry': s_self.structure.Namespaces.D
                                            readonly 'l id': string
                                        }
                                        readonly 'type': {
                                            readonly 'constraints': {
                                                readonly 'public': s_self.structure.Type.visibility.type_.public_
                                            }
                                            readonly 'value': {
                                                readonly 'l entry': s_self.structure.Types.D
                                                readonly 'l id': string
                                            }
                                        }
                                    }
                                    
                                    export namespace sibling_namespace {
                                        
                                        export type namespace = {
                                            readonly 'l entry': s_self.structure.Namespaces.D
                                            readonly 'l id': string
                                        }
                                        
                                        export namespace namespace {
                                            
                                            export type l_entry = s_self.structure.Namespaces.D
                                            
                                            export type l_id = string
                                            
                                        }
                                        
                                        export type type_ = {
                                            readonly 'constraints': {
                                                readonly 'public': s_self.structure.Type.visibility.type_.public_
                                            }
                                            readonly 'value': {
                                                readonly 'l entry': s_self.structure.Types.D
                                                readonly 'l id': string
                                            }
                                        }
                                        
                                        export namespace type_ {
                                            
                                            export type constraints = {
                                                readonly 'public': s_self.structure.Type.visibility.type_.public_
                                            }
                                            
                                            export namespace constraints {
                                                
                                                export type public_ = s_self.structure.Type.visibility.type_.public_
                                                
                                            }
                                            
                                            export type value = {
                                                readonly 'l entry': s_self.structure.Types.D
                                                readonly 'l id': string
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
                readonly 'value': s_self.structure.Value
                readonly 'result': s_self.structure.Value_Result
            }
            
            export namespace list {
                
                export type value = s_self.structure.Value
                
                export type result = s_self.structure.Value_Result
                
            }
            
            export type nothing = null
            
            export type simple = {
                readonly 'constraints': {
                    readonly 'basic types': s_self.structure.Basic_Types
                }
                readonly 'value': {
                    readonly 'l entry': s_self.structure.Basic_Types.D
                    readonly 'l id': string
                }
            }
            
            export namespace simple {
                
                export type constraints = {
                    readonly 'basic types': s_self.structure.Basic_Types
                }
                
                export namespace constraints {
                    
                    export type basic_types = s_self.structure.Basic_Types
                    
                }
                
                export type value = {
                    readonly 'l entry': s_self.structure.Basic_Types.D
                    readonly 'l id': string
                }
                
                export namespace value {
                    
                    export type l_entry = s_self.structure.Basic_Types.D
                    
                    export type l_id = string
                    
                }
                
            }
            
            export type optional = {
                readonly 'constraints': s_self.structure.Option_Constraints
                readonly 'value': s_self.structure.Value
                readonly 'result': s_self.structure.Value_Result
            }
            
            export namespace optional {
                
                export type constraints = s_self.structure.Option_Constraints
                
                export type value = s_self.structure.Value
                
                export type result = s_self.structure.Value_Result
                
            }
            
            export type reference = s_self.structure.Reference
            
            export type state = {
                readonly 'options': p_.Dictionary<{
                    readonly 'description': p_.Optional_Value<string>
                    readonly 'constraints': s_self.structure.Option_Constraints
                    readonly 'value': s_self.structure.Value
                }>
                readonly 'result': s_self.structure.Value_Result
            }
            
            export namespace state {
                
                export type options = p_.Dictionary<{
                    readonly 'description': p_.Optional_Value<string>
                    readonly 'constraints': s_self.structure.Option_Constraints
                    readonly 'value': s_self.structure.Value
                }>
                
                export namespace options {
                    
                    export type D = {
                        readonly 'description': p_.Optional_Value<string>
                        readonly 'constraints': s_self.structure.Option_Constraints
                        readonly 'value': s_self.structure.Value
                    }
                    
                    export namespace D {
                        
                        export type description = p_.Optional_Value<string>
                        
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
        readonly 'benchmark': p_.Optional_Value<{
            readonly 'constraints': {
                readonly 'dictionary': s_self.structure.Value.type_.dictionary
            }
            readonly 'value': s_self.structure.Value_Reference
        }>
        readonly 'value': s_self.structure.Value
    }
    
    export namespace Dictionary {
        
        export type benchmark = p_.Optional_Value<{
            readonly 'constraints': {
                readonly 'dictionary': s_self.structure.Value.type_.dictionary
            }
            readonly 'value': s_self.structure.Value_Reference
        }>
        
        export namespace benchmark {
            
            export type O = {
                readonly 'constraints': {
                    readonly 'dictionary': s_self.structure.Value.type_.dictionary
                }
                readonly 'value': s_self.structure.Value_Reference
            }
            
            export namespace O {
                
                export type constraints = {
                    readonly 'dictionary': s_self.structure.Value.type_.dictionary
                }
                
                export namespace constraints {
                    
                    export type dictionary = s_self.structure.Value.type_.dictionary
                    
                }
                
                export type value = s_self.structure.Value_Reference
                
            }
            
        }
        
        export type value = s_self.structure.Value
        
    }
    
    export type Value_Reference = {
        readonly 'type': {
            readonly 'location': {
                readonly 'value':
                    | readonly ['local', {
                        readonly 'l entry': s_self.structure.Types.D
                        readonly 'l id': string
                    }]
                    | readonly ['child namespace', {
                        readonly 'namespace': {
                            readonly 'l entry': s_self.structure.Namespaces.D
                            readonly 'l id': string
                        }
                        readonly 'type': {
                            readonly 'l entry': s_self.structure.Types.D
                            readonly 'l id': string
                        }
                    }]
                    | readonly ['sibling namespace', {
                        readonly 'namespace': {
                            readonly 'l entry': s_self.structure.Namespaces.D
                            readonly 'l id': string
                        }
                        readonly 'type': {
                            readonly 'l entry': s_self.structure.Types.D
                            readonly 'l id': string
                        }
                    }]
                readonly 'result': s_self.structure.Type
            }
        }
        readonly 'path': {
            readonly 'tail': {
                readonly 'value': p_.List<{
                    readonly 'value': {
                        readonly 'value':
                            | readonly ['benchmark', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.dictionary
                                }
                                readonly 'value': null
                            }]
                            | readonly ['dictionary', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.dictionary
                                }
                                readonly 'value': null
                            }]
                            | readonly ['group', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.group
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Group.D
                                    readonly 'l id': string
                                }
                            }]
                            | readonly ['list', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.list
                                }
                                readonly 'value': null
                            }]
                            | readonly ['optional', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.optional
                                }
                                readonly 'value': null
                            }]
                            | readonly ['state', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.state
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                    readonly 'l id': string
                                }
                            }]
                        readonly 'result': s_self.structure.Value
                    }
                    readonly 'result': s_self.structure.Value
                }>
                readonly 'result': s_self.structure.Value
            }
        }
    }
    
    export namespace Value_Reference {
        
        export type type_ = {
            readonly 'location': {
                readonly 'value':
                    | readonly ['local', {
                        readonly 'l entry': s_self.structure.Types.D
                        readonly 'l id': string
                    }]
                    | readonly ['child namespace', {
                        readonly 'namespace': {
                            readonly 'l entry': s_self.structure.Namespaces.D
                            readonly 'l id': string
                        }
                        readonly 'type': {
                            readonly 'l entry': s_self.structure.Types.D
                            readonly 'l id': string
                        }
                    }]
                    | readonly ['sibling namespace', {
                        readonly 'namespace': {
                            readonly 'l entry': s_self.structure.Namespaces.D
                            readonly 'l id': string
                        }
                        readonly 'type': {
                            readonly 'l entry': s_self.structure.Types.D
                            readonly 'l id': string
                        }
                    }]
                readonly 'result': s_self.structure.Type
            }
        }
        
        export namespace type_ {
            
            export type location = {
                readonly 'value':
                    | readonly ['local', {
                        readonly 'l entry': s_self.structure.Types.D
                        readonly 'l id': string
                    }]
                    | readonly ['child namespace', {
                        readonly 'namespace': {
                            readonly 'l entry': s_self.structure.Namespaces.D
                            readonly 'l id': string
                        }
                        readonly 'type': {
                            readonly 'l entry': s_self.structure.Types.D
                            readonly 'l id': string
                        }
                    }]
                    | readonly ['sibling namespace', {
                        readonly 'namespace': {
                            readonly 'l entry': s_self.structure.Namespaces.D
                            readonly 'l id': string
                        }
                        readonly 'type': {
                            readonly 'l entry': s_self.structure.Types.D
                            readonly 'l id': string
                        }
                    }]
                readonly 'result': s_self.structure.Type
            }
            
            export namespace location {
                
                export type value =
                    | readonly ['local', {
                        readonly 'l entry': s_self.structure.Types.D
                        readonly 'l id': string
                    }]
                    | readonly ['child namespace', {
                        readonly 'namespace': {
                            readonly 'l entry': s_self.structure.Namespaces.D
                            readonly 'l id': string
                        }
                        readonly 'type': {
                            readonly 'l entry': s_self.structure.Types.D
                            readonly 'l id': string
                        }
                    }]
                    | readonly ['sibling namespace', {
                        readonly 'namespace': {
                            readonly 'l entry': s_self.structure.Namespaces.D
                            readonly 'l id': string
                        }
                        readonly 'type': {
                            readonly 'l entry': s_self.structure.Types.D
                            readonly 'l id': string
                        }
                    }]
                
                export namespace value {
                    export namespace type_ {
                        
                        export type local = {
                            readonly 'l entry': s_self.structure.Types.D
                            readonly 'l id': string
                        }
                        
                        export namespace local {
                            
                            export type l_entry = s_self.structure.Types.D
                            
                            export type l_id = string
                            
                        }
                        
                        export type child_namespace = {
                            readonly 'namespace': {
                                readonly 'l entry': s_self.structure.Namespaces.D
                                readonly 'l id': string
                            }
                            readonly 'type': {
                                readonly 'l entry': s_self.structure.Types.D
                                readonly 'l id': string
                            }
                        }
                        
                        export namespace child_namespace {
                            
                            export type namespace = {
                                readonly 'l entry': s_self.structure.Namespaces.D
                                readonly 'l id': string
                            }
                            
                            export namespace namespace {
                                
                                export type l_entry = s_self.structure.Namespaces.D
                                
                                export type l_id = string
                                
                            }
                            
                            export type type_ = {
                                readonly 'l entry': s_self.structure.Types.D
                                readonly 'l id': string
                            }
                            
                            export namespace type_ {
                                
                                export type l_entry = s_self.structure.Types.D
                                
                                export type l_id = string
                                
                            }
                            
                        }
                        
                        export type sibling_namespace = {
                            readonly 'namespace': {
                                readonly 'l entry': s_self.structure.Namespaces.D
                                readonly 'l id': string
                            }
                            readonly 'type': {
                                readonly 'l entry': s_self.structure.Types.D
                                readonly 'l id': string
                            }
                        }
                        
                        export namespace sibling_namespace {
                            
                            export type namespace = {
                                readonly 'l entry': s_self.structure.Namespaces.D
                                readonly 'l id': string
                            }
                            
                            export namespace namespace {
                                
                                export type l_entry = s_self.structure.Namespaces.D
                                
                                export type l_id = string
                                
                            }
                            
                            export type type_ = {
                                readonly 'l entry': s_self.structure.Types.D
                                readonly 'l id': string
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
            readonly 'tail': {
                readonly 'value': p_.List<{
                    readonly 'value': {
                        readonly 'value':
                            | readonly ['benchmark', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.dictionary
                                }
                                readonly 'value': null
                            }]
                            | readonly ['dictionary', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.dictionary
                                }
                                readonly 'value': null
                            }]
                            | readonly ['group', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.group
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Group.D
                                    readonly 'l id': string
                                }
                            }]
                            | readonly ['list', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.list
                                }
                                readonly 'value': null
                            }]
                            | readonly ['optional', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.optional
                                }
                                readonly 'value': null
                            }]
                            | readonly ['state', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.state
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                    readonly 'l id': string
                                }
                            }]
                        readonly 'result': s_self.structure.Value
                    }
                    readonly 'result': s_self.structure.Value
                }>
                readonly 'result': s_self.structure.Value
            }
        }
        
        export namespace path {
            
            export type tail = {
                readonly 'value': p_.List<{
                    readonly 'value': {
                        readonly 'value':
                            | readonly ['benchmark', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.dictionary
                                }
                                readonly 'value': null
                            }]
                            | readonly ['dictionary', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.dictionary
                                }
                                readonly 'value': null
                            }]
                            | readonly ['group', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.group
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Group.D
                                    readonly 'l id': string
                                }
                            }]
                            | readonly ['list', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.list
                                }
                                readonly 'value': null
                            }]
                            | readonly ['optional', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.optional
                                }
                                readonly 'value': null
                            }]
                            | readonly ['state', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.state
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                    readonly 'l id': string
                                }
                            }]
                        readonly 'result': s_self.structure.Value
                    }
                    readonly 'result': s_self.structure.Value
                }>
                readonly 'result': s_self.structure.Value
            }
            
            export namespace tail {
                
                export type value = p_.List<{
                    readonly 'value': {
                        readonly 'value':
                            | readonly ['benchmark', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.dictionary
                                }
                                readonly 'value': null
                            }]
                            | readonly ['dictionary', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.dictionary
                                }
                                readonly 'value': null
                            }]
                            | readonly ['group', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.group
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Group.D
                                    readonly 'l id': string
                                }
                            }]
                            | readonly ['list', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.list
                                }
                                readonly 'value': null
                            }]
                            | readonly ['optional', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.optional
                                }
                                readonly 'value': null
                            }]
                            | readonly ['state', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.state
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                    readonly 'l id': string
                                }
                            }]
                        readonly 'result': s_self.structure.Value
                    }
                    readonly 'result': s_self.structure.Value
                }>
                
                export namespace value {
                    
                    export type L = {
                        readonly 'value': {
                            readonly 'value':
                                | readonly ['benchmark', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.dictionary
                                    }
                                    readonly 'value': null
                                }]
                                | readonly ['dictionary', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.dictionary
                                    }
                                    readonly 'value': null
                                }]
                                | readonly ['group', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.group
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Group.D
                                        readonly 'l id': string
                                    }
                                }]
                                | readonly ['list', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.list
                                    }
                                    readonly 'value': null
                                }]
                                | readonly ['optional', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.optional
                                    }
                                    readonly 'value': null
                                }]
                                | readonly ['state', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.state
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                        readonly 'l id': string
                                    }
                                }]
                            readonly 'result': s_self.structure.Value
                        }
                        readonly 'result': s_self.structure.Value
                    }
                    
                    export namespace L {
                        
                        export type value = {
                            readonly 'value':
                                | readonly ['benchmark', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.dictionary
                                    }
                                    readonly 'value': null
                                }]
                                | readonly ['dictionary', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.dictionary
                                    }
                                    readonly 'value': null
                                }]
                                | readonly ['group', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.group
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Group.D
                                        readonly 'l id': string
                                    }
                                }]
                                | readonly ['list', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.list
                                    }
                                    readonly 'value': null
                                }]
                                | readonly ['optional', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.optional
                                    }
                                    readonly 'value': null
                                }]
                                | readonly ['state', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.state
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                        readonly 'l id': string
                                    }
                                }]
                            readonly 'result': s_self.structure.Value
                        }
                        
                        export namespace value {
                            
                            export type value =
                                | readonly ['benchmark', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.dictionary
                                    }
                                    readonly 'value': null
                                }]
                                | readonly ['dictionary', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.dictionary
                                    }
                                    readonly 'value': null
                                }]
                                | readonly ['group', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.group
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Group.D
                                        readonly 'l id': string
                                    }
                                }]
                                | readonly ['list', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.list
                                    }
                                    readonly 'value': null
                                }]
                                | readonly ['optional', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.optional
                                    }
                                    readonly 'value': null
                                }]
                                | readonly ['state', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.state
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                        readonly 'l id': string
                                    }
                                }]
                            
                            export namespace value {
                                export namespace type_ {
                                    
                                    export type benchmark = {
                                        readonly 'constraints': {
                                            readonly 'definition': s_self.structure.Value.type_.dictionary
                                        }
                                        readonly 'value': null
                                    }
                                    
                                    export namespace benchmark {
                                        
                                        export type constraints = {
                                            readonly 'definition': s_self.structure.Value.type_.dictionary
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type definition = s_self.structure.Value.type_.dictionary
                                            
                                        }
                                        
                                        export type value = null
                                        
                                    }
                                    
                                    export type dictionary = {
                                        readonly 'constraints': {
                                            readonly 'definition': s_self.structure.Value.type_.dictionary
                                        }
                                        readonly 'value': null
                                    }
                                    
                                    export namespace dictionary {
                                        
                                        export type constraints = {
                                            readonly 'definition': s_self.structure.Value.type_.dictionary
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type definition = s_self.structure.Value.type_.dictionary
                                            
                                        }
                                        
                                        export type value = null
                                        
                                    }
                                    
                                    export type group = {
                                        readonly 'constraints': {
                                            readonly 'definition': s_self.structure.Value.type_.group
                                        }
                                        readonly 'value': {
                                            readonly 'l entry': s_self.structure.Group.D
                                            readonly 'l id': string
                                        }
                                    }
                                    
                                    export namespace group {
                                        
                                        export type constraints = {
                                            readonly 'definition': s_self.structure.Value.type_.group
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type definition = s_self.structure.Value.type_.group
                                            
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': s_self.structure.Group.D
                                            readonly 'l id': string
                                        }
                                        
                                        export namespace value {
                                            
                                            export type l_entry = s_self.structure.Group.D
                                            
                                            export type l_id = string
                                            
                                        }
                                        
                                    }
                                    
                                    export type list = {
                                        readonly 'constraints': {
                                            readonly 'definition': s_self.structure.Value.type_.list
                                        }
                                        readonly 'value': null
                                    }
                                    
                                    export namespace list {
                                        
                                        export type constraints = {
                                            readonly 'definition': s_self.structure.Value.type_.list
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type definition = s_self.structure.Value.type_.list
                                            
                                        }
                                        
                                        export type value = null
                                        
                                    }
                                    
                                    export type optional = {
                                        readonly 'constraints': {
                                            readonly 'definition': s_self.structure.Value.type_.optional
                                        }
                                        readonly 'value': null
                                    }
                                    
                                    export namespace optional {
                                        
                                        export type constraints = {
                                            readonly 'definition': s_self.structure.Value.type_.optional
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type definition = s_self.structure.Value.type_.optional
                                            
                                        }
                                        
                                        export type value = null
                                        
                                    }
                                    
                                    export type state = {
                                        readonly 'constraints': {
                                            readonly 'definition': s_self.structure.Value.type_.state
                                        }
                                        readonly 'value': {
                                            readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                            readonly 'l id': string
                                        }
                                    }
                                    
                                    export namespace state {
                                        
                                        export type constraints = {
                                            readonly 'definition': s_self.structure.Value.type_.state
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type definition = s_self.structure.Value.type_.state
                                            
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                            readonly 'l id': string
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
    
    export type Option_Constraints = p_.Optional_Value<p_.Dictionary<s_self.structure.Value_Reference>>
    
    export namespace Option_Constraints {
        
        export type O = p_.Dictionary<s_self.structure.Value_Reference>
        
        export namespace O {
            
            export type D = s_self.structure.Value_Reference
            
        }
        
    }
    
    export type Reference = {
        readonly 'referent': {
            readonly 'constraints': {
                readonly 'dictionary': s_self.structure.Value.type_.dictionary
            }
            readonly 'value': s_self.structure.Value_Reference
        }
        readonly 'type': {
            readonly 'dependency':
                | readonly ['acyclic', null]
                | readonly ['cyclic', null]
            readonly 'constraints': s_self.structure.Reference_Constraints
        }
    }
    
    export namespace Reference {
        
        export type referent = {
            readonly 'constraints': {
                readonly 'dictionary': s_self.structure.Value.type_.dictionary
            }
            readonly 'value': s_self.structure.Value_Reference
        }
        
        export namespace referent {
            
            export type constraints = {
                readonly 'dictionary': s_self.structure.Value.type_.dictionary
            }
            
            export namespace constraints {
                
                export type dictionary = s_self.structure.Value.type_.dictionary
                
            }
            
            export type value = s_self.structure.Value_Reference
            
        }
        
        export type type_ = {
            readonly 'dependency':
                | readonly ['acyclic', null]
                | readonly ['cyclic', null]
            readonly 'constraints': s_self.structure.Reference_Constraints
        }
        
        export namespace type_ {
            
            export type dependency =
                | readonly ['acyclic', null]
                | readonly ['cyclic', null]
            
            export namespace dependency {
                export namespace type_ {
                    
                    export type acyclic = null
                    
                    export type cyclic = null
                    
                }
                
            }
            
            export type constraints = s_self.structure.Reference_Constraints
            
        }
        
    }
    
    export type Reference_Constraints = p_.Optional_Value<p_.Dictionary<s_self.structure.Value_Reference>>
    
    export namespace Reference_Constraints {
        
        export type O = p_.Dictionary<s_self.structure.Value_Reference>
        
        export namespace O {
            
            export type D = s_self.structure.Value_Reference
            
        }
        
    }
    
    export type Structure = {
        readonly 'namespaces': s_self.structure.Namespaces
        readonly 'basic types': s_self.structure.Basic_Types
        readonly 'types': s_self.structure.Types
    }
    
    export namespace Structure {
        
        export type namespaces = s_self.structure.Namespaces
        
        export type basic_types = s_self.structure.Basic_Types
        
        export type types = s_self.structure.Types
        
    }
    
    export type Value_Result = p_.Optional_Value<s_self.structure.Value_Reference>
    
    export namespace Value_Result {
        
        export type O = s_self.structure.Value_Reference
        
    }
    
}

export namespace declarations {
    
    export type Presence =
        | readonly ['optional', null]
        | readonly ['required', null]
    
    export namespace Presence {
        export namespace type_ {
            
            export type optional = null
            
            export type required = null
            
        }
        
    }
    
    export type Signature_Value_Reference = {
        readonly 'type': {
            readonly 'location': {
                readonly 'value':
                    | readonly ['local', {
                        readonly 'l entry': s_self.structure.Types.D
                        readonly 'l id': string
                    }]
                    | readonly ['child namespace', {
                        readonly 'namespace': {
                            readonly 'l entry': s_self.structure.Namespaces.D
                            readonly 'l id': string
                        }
                        readonly 'type': {
                            readonly 'l entry': s_self.structure.Types.D
                            readonly 'l id': string
                        }
                    }]
                    | readonly ['sibling namespace', {
                        readonly 'namespace': {
                            readonly 'l entry': s_self.structure.Namespaces.D
                            readonly 'l id': string
                        }
                        readonly 'type': {
                            readonly 'l entry': s_self.structure.Types.D
                            readonly 'l id': string
                        }
                    }]
                readonly 'result': s_self.structure.Type
            }
        }
        readonly 'subselection': {
            readonly 'tail': {
                readonly 'value': p_.List<{
                    readonly 'value': {
                        readonly 'value':
                            | readonly ['dictionary', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.dictionary
                                }
                                readonly 'value': null
                            }]
                            | readonly ['group', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.group
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Group.D
                                    readonly 'l id': string
                                }
                            }]
                            | readonly ['list', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.list
                                }
                                readonly 'value': null
                            }]
                            | readonly ['optional', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.optional
                                }
                                readonly 'value': null
                            }]
                            | readonly ['state', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.state
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                    readonly 'l id': string
                                }
                            }]
                        readonly 'result': s_self.structure.Value
                    }
                    readonly 'result': s_self.structure.Value
                }>
                readonly 'result': s_self.structure.Value
            }
        }
    }
    
    export namespace Signature_Value_Reference {
        
        export type type_ = {
            readonly 'location': {
                readonly 'value':
                    | readonly ['local', {
                        readonly 'l entry': s_self.structure.Types.D
                        readonly 'l id': string
                    }]
                    | readonly ['child namespace', {
                        readonly 'namespace': {
                            readonly 'l entry': s_self.structure.Namespaces.D
                            readonly 'l id': string
                        }
                        readonly 'type': {
                            readonly 'l entry': s_self.structure.Types.D
                            readonly 'l id': string
                        }
                    }]
                    | readonly ['sibling namespace', {
                        readonly 'namespace': {
                            readonly 'l entry': s_self.structure.Namespaces.D
                            readonly 'l id': string
                        }
                        readonly 'type': {
                            readonly 'l entry': s_self.structure.Types.D
                            readonly 'l id': string
                        }
                    }]
                readonly 'result': s_self.structure.Type
            }
        }
        
        export namespace type_ {
            
            export type location = {
                readonly 'value':
                    | readonly ['local', {
                        readonly 'l entry': s_self.structure.Types.D
                        readonly 'l id': string
                    }]
                    | readonly ['child namespace', {
                        readonly 'namespace': {
                            readonly 'l entry': s_self.structure.Namespaces.D
                            readonly 'l id': string
                        }
                        readonly 'type': {
                            readonly 'l entry': s_self.structure.Types.D
                            readonly 'l id': string
                        }
                    }]
                    | readonly ['sibling namespace', {
                        readonly 'namespace': {
                            readonly 'l entry': s_self.structure.Namespaces.D
                            readonly 'l id': string
                        }
                        readonly 'type': {
                            readonly 'l entry': s_self.structure.Types.D
                            readonly 'l id': string
                        }
                    }]
                readonly 'result': s_self.structure.Type
            }
            
            export namespace location {
                
                export type value =
                    | readonly ['local', {
                        readonly 'l entry': s_self.structure.Types.D
                        readonly 'l id': string
                    }]
                    | readonly ['child namespace', {
                        readonly 'namespace': {
                            readonly 'l entry': s_self.structure.Namespaces.D
                            readonly 'l id': string
                        }
                        readonly 'type': {
                            readonly 'l entry': s_self.structure.Types.D
                            readonly 'l id': string
                        }
                    }]
                    | readonly ['sibling namespace', {
                        readonly 'namespace': {
                            readonly 'l entry': s_self.structure.Namespaces.D
                            readonly 'l id': string
                        }
                        readonly 'type': {
                            readonly 'l entry': s_self.structure.Types.D
                            readonly 'l id': string
                        }
                    }]
                
                export namespace value {
                    export namespace type_ {
                        
                        export type local = {
                            readonly 'l entry': s_self.structure.Types.D
                            readonly 'l id': string
                        }
                        
                        export namespace local {
                            
                            export type l_entry = s_self.structure.Types.D
                            
                            export type l_id = string
                            
                        }
                        
                        export type child_namespace = {
                            readonly 'namespace': {
                                readonly 'l entry': s_self.structure.Namespaces.D
                                readonly 'l id': string
                            }
                            readonly 'type': {
                                readonly 'l entry': s_self.structure.Types.D
                                readonly 'l id': string
                            }
                        }
                        
                        export namespace child_namespace {
                            
                            export type namespace = {
                                readonly 'l entry': s_self.structure.Namespaces.D
                                readonly 'l id': string
                            }
                            
                            export namespace namespace {
                                
                                export type l_entry = s_self.structure.Namespaces.D
                                
                                export type l_id = string
                                
                            }
                            
                            export type type_ = {
                                readonly 'l entry': s_self.structure.Types.D
                                readonly 'l id': string
                            }
                            
                            export namespace type_ {
                                
                                export type l_entry = s_self.structure.Types.D
                                
                                export type l_id = string
                                
                            }
                            
                        }
                        
                        export type sibling_namespace = {
                            readonly 'namespace': {
                                readonly 'l entry': s_self.structure.Namespaces.D
                                readonly 'l id': string
                            }
                            readonly 'type': {
                                readonly 'l entry': s_self.structure.Types.D
                                readonly 'l id': string
                            }
                        }
                        
                        export namespace sibling_namespace {
                            
                            export type namespace = {
                                readonly 'l entry': s_self.structure.Namespaces.D
                                readonly 'l id': string
                            }
                            
                            export namespace namespace {
                                
                                export type l_entry = s_self.structure.Namespaces.D
                                
                                export type l_id = string
                                
                            }
                            
                            export type type_ = {
                                readonly 'l entry': s_self.structure.Types.D
                                readonly 'l id': string
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
            readonly 'tail': {
                readonly 'value': p_.List<{
                    readonly 'value': {
                        readonly 'value':
                            | readonly ['dictionary', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.dictionary
                                }
                                readonly 'value': null
                            }]
                            | readonly ['group', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.group
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Group.D
                                    readonly 'l id': string
                                }
                            }]
                            | readonly ['list', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.list
                                }
                                readonly 'value': null
                            }]
                            | readonly ['optional', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.optional
                                }
                                readonly 'value': null
                            }]
                            | readonly ['state', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.state
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                    readonly 'l id': string
                                }
                            }]
                        readonly 'result': s_self.structure.Value
                    }
                    readonly 'result': s_self.structure.Value
                }>
                readonly 'result': s_self.structure.Value
            }
        }
        
        export namespace subselection {
            
            export type tail = {
                readonly 'value': p_.List<{
                    readonly 'value': {
                        readonly 'value':
                            | readonly ['dictionary', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.dictionary
                                }
                                readonly 'value': null
                            }]
                            | readonly ['group', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.group
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Group.D
                                    readonly 'l id': string
                                }
                            }]
                            | readonly ['list', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.list
                                }
                                readonly 'value': null
                            }]
                            | readonly ['optional', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.optional
                                }
                                readonly 'value': null
                            }]
                            | readonly ['state', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.state
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                    readonly 'l id': string
                                }
                            }]
                        readonly 'result': s_self.structure.Value
                    }
                    readonly 'result': s_self.structure.Value
                }>
                readonly 'result': s_self.structure.Value
            }
            
            export namespace tail {
                
                export type value = p_.List<{
                    readonly 'value': {
                        readonly 'value':
                            | readonly ['dictionary', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.dictionary
                                }
                                readonly 'value': null
                            }]
                            | readonly ['group', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.group
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Group.D
                                    readonly 'l id': string
                                }
                            }]
                            | readonly ['list', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.list
                                }
                                readonly 'value': null
                            }]
                            | readonly ['optional', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.optional
                                }
                                readonly 'value': null
                            }]
                            | readonly ['state', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.state
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                    readonly 'l id': string
                                }
                            }]
                        readonly 'result': s_self.structure.Value
                    }
                    readonly 'result': s_self.structure.Value
                }>
                
                export namespace value {
                    
                    export type L = {
                        readonly 'value': {
                            readonly 'value':
                                | readonly ['dictionary', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.dictionary
                                    }
                                    readonly 'value': null
                                }]
                                | readonly ['group', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.group
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Group.D
                                        readonly 'l id': string
                                    }
                                }]
                                | readonly ['list', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.list
                                    }
                                    readonly 'value': null
                                }]
                                | readonly ['optional', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.optional
                                    }
                                    readonly 'value': null
                                }]
                                | readonly ['state', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.state
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                        readonly 'l id': string
                                    }
                                }]
                            readonly 'result': s_self.structure.Value
                        }
                        readonly 'result': s_self.structure.Value
                    }
                    
                    export namespace L {
                        
                        export type value = {
                            readonly 'value':
                                | readonly ['dictionary', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.dictionary
                                    }
                                    readonly 'value': null
                                }]
                                | readonly ['group', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.group
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Group.D
                                        readonly 'l id': string
                                    }
                                }]
                                | readonly ['list', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.list
                                    }
                                    readonly 'value': null
                                }]
                                | readonly ['optional', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.optional
                                    }
                                    readonly 'value': null
                                }]
                                | readonly ['state', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.state
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                        readonly 'l id': string
                                    }
                                }]
                            readonly 'result': s_self.structure.Value
                        }
                        
                        export namespace value {
                            
                            export type value =
                                | readonly ['dictionary', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.dictionary
                                    }
                                    readonly 'value': null
                                }]
                                | readonly ['group', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.group
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Group.D
                                        readonly 'l id': string
                                    }
                                }]
                                | readonly ['list', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.list
                                    }
                                    readonly 'value': null
                                }]
                                | readonly ['optional', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.optional
                                    }
                                    readonly 'value': null
                                }]
                                | readonly ['state', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.state
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                        readonly 'l id': string
                                    }
                                }]
                            
                            export namespace value {
                                export namespace type_ {
                                    
                                    export type dictionary = {
                                        readonly 'constraints': {
                                            readonly 'definition': s_self.structure.Value.type_.dictionary
                                        }
                                        readonly 'value': null
                                    }
                                    
                                    export namespace dictionary {
                                        
                                        export type constraints = {
                                            readonly 'definition': s_self.structure.Value.type_.dictionary
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type definition = s_self.structure.Value.type_.dictionary
                                            
                                        }
                                        
                                        export type value = null
                                        
                                    }
                                    
                                    export type group = {
                                        readonly 'constraints': {
                                            readonly 'definition': s_self.structure.Value.type_.group
                                        }
                                        readonly 'value': {
                                            readonly 'l entry': s_self.structure.Group.D
                                            readonly 'l id': string
                                        }
                                    }
                                    
                                    export namespace group {
                                        
                                        export type constraints = {
                                            readonly 'definition': s_self.structure.Value.type_.group
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type definition = s_self.structure.Value.type_.group
                                            
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': s_self.structure.Group.D
                                            readonly 'l id': string
                                        }
                                        
                                        export namespace value {
                                            
                                            export type l_entry = s_self.structure.Group.D
                                            
                                            export type l_id = string
                                            
                                        }
                                        
                                    }
                                    
                                    export type list = {
                                        readonly 'constraints': {
                                            readonly 'definition': s_self.structure.Value.type_.list
                                        }
                                        readonly 'value': null
                                    }
                                    
                                    export namespace list {
                                        
                                        export type constraints = {
                                            readonly 'definition': s_self.structure.Value.type_.list
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type definition = s_self.structure.Value.type_.list
                                            
                                        }
                                        
                                        export type value = null
                                        
                                    }
                                    
                                    export type optional = {
                                        readonly 'constraints': {
                                            readonly 'definition': s_self.structure.Value.type_.optional
                                        }
                                        readonly 'value': null
                                    }
                                    
                                    export namespace optional {
                                        
                                        export type constraints = {
                                            readonly 'definition': s_self.structure.Value.type_.optional
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type definition = s_self.structure.Value.type_.optional
                                            
                                        }
                                        
                                        export type value = null
                                        
                                    }
                                    
                                    export type state = {
                                        readonly 'constraints': {
                                            readonly 'definition': s_self.structure.Value.type_.state
                                        }
                                        readonly 'value': {
                                            readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                            readonly 'l id': string
                                        }
                                    }
                                    
                                    export namespace state {
                                        
                                        export type constraints = {
                                            readonly 'definition': s_self.structure.Value.type_.state
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type definition = s_self.structure.Value.type_.state
                                            
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                            readonly 'l id': string
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
        readonly 'values': p_.Dictionary<{
            readonly 'value': s_self.declarations.Signature_Value_Reference
            readonly 'presence': s_self.declarations.Presence
        }>
        readonly 'lookups': p_.Dictionary<{
            readonly 'referent': {
                readonly 'constraints': {
                    readonly 'dictionary': s_self.structure.Value.type_.dictionary
                }
                readonly 'value': s_self.declarations.Signature_Value_Reference
            }
            readonly 'type':
                | readonly ['cyclic', null]
                | readonly ['acyclic', null]
            readonly 'presence': s_self.declarations.Presence
        }>
    }
    
    export namespace Signature {
        
        export type values = p_.Dictionary<{
            readonly 'value': s_self.declarations.Signature_Value_Reference
            readonly 'presence': s_self.declarations.Presence
        }>
        
        export namespace values {
            
            export type D = {
                readonly 'value': s_self.declarations.Signature_Value_Reference
                readonly 'presence': s_self.declarations.Presence
            }
            
            export namespace D {
                
                export type value = s_self.declarations.Signature_Value_Reference
                
                export type presence = s_self.declarations.Presence
                
            }
            
        }
        
        export type lookups = p_.Dictionary<{
            readonly 'referent': {
                readonly 'constraints': {
                    readonly 'dictionary': s_self.structure.Value.type_.dictionary
                }
                readonly 'value': s_self.declarations.Signature_Value_Reference
            }
            readonly 'type':
                | readonly ['cyclic', null]
                | readonly ['acyclic', null]
            readonly 'presence': s_self.declarations.Presence
        }>
        
        export namespace lookups {
            
            export type D = {
                readonly 'referent': {
                    readonly 'constraints': {
                        readonly 'dictionary': s_self.structure.Value.type_.dictionary
                    }
                    readonly 'value': s_self.declarations.Signature_Value_Reference
                }
                readonly 'type':
                    | readonly ['cyclic', null]
                    | readonly ['acyclic', null]
                readonly 'presence': s_self.declarations.Presence
            }
            
            export namespace D {
                
                export type referent = {
                    readonly 'constraints': {
                        readonly 'dictionary': s_self.structure.Value.type_.dictionary
                    }
                    readonly 'value': s_self.declarations.Signature_Value_Reference
                }
                
                export namespace referent {
                    
                    export type constraints = {
                        readonly 'dictionary': s_self.structure.Value.type_.dictionary
                    }
                    
                    export namespace constraints {
                        
                        export type dictionary = s_self.structure.Value.type_.dictionary
                        
                    }
                    
                    export type value = s_self.declarations.Signature_Value_Reference
                    
                }
                
                export type type_ =
                    | readonly ['cyclic', null]
                    | readonly ['acyclic', null]
                
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
    
    export type Declarations = p_.Dictionary<{
        readonly 'benchmark': s_self.structure.Types.D
        readonly 'value': s_self.declarations.Declaration
    }>
    
    export namespace Declarations {
        
        export type D = {
            readonly 'benchmark': s_self.structure.Types.D
            readonly 'value': s_self.declarations.Declaration
        }
        
        export namespace D {
            
            export type benchmark = s_self.structure.Types.D
            
            export type value = s_self.declarations.Declaration
            
        }
        
    }
    
    export type Declaration = {
        readonly 'signature': {
            readonly 'value':
                | readonly ['local', s_self.declarations.Signature]
                | readonly ['same as', {
                    readonly 'l entry': s_self.declarations.Declarations.D
                    readonly 'l id': string
                }]
            readonly 'result': s_self.declarations.Signature
        }
    }
    
    export namespace Declaration {
        
        export type signature = {
            readonly 'value':
                | readonly ['local', s_self.declarations.Signature]
                | readonly ['same as', {
                    readonly 'l entry': s_self.declarations.Declarations.D
                    readonly 'l id': string
                }]
            readonly 'result': s_self.declarations.Signature
        }
        
        export namespace signature {
            
            export type value =
                | readonly ['local', s_self.declarations.Signature]
                | readonly ['same as', {
                    readonly 'l entry': s_self.declarations.Declarations.D
                    readonly 'l id': string
                }]
            
            export namespace value {
                export namespace type_ {
                    
                    export type local = s_self.declarations.Signature
                    
                    export type same_as = {
                        readonly 'l entry': s_self.declarations.Declarations.D
                        readonly 'l id': string
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
    
    export type Namespaces = p_.Dictionary<{
        readonly 'benchmark': s_self.structure.Namespaces.D
        readonly 'value': s_self.declarations.Declaration_Namespace
    }>
    
    export namespace Namespaces {
        
        export type D = {
            readonly 'benchmark': s_self.structure.Namespaces.D
            readonly 'value': s_self.declarations.Declaration_Namespace
        }
        
        export namespace D {
            
            export type benchmark = s_self.structure.Namespaces.D
            
            export type value = s_self.declarations.Declaration_Namespace
            
        }
        
    }
    
    export type Declaration_Namespace = {
        readonly 'namespaces': s_self.declarations.Namespaces
        readonly 'types': s_self.declarations.Declarations
    }
    
    export namespace Declaration_Namespace {
        
        export type namespaces = s_self.declarations.Namespaces
        
        export type types = s_self.declarations.Declarations
        
    }
    
}

export namespace resolver {
    
    export type Value_Reference = {
        readonly 'type': {
            readonly 'location': {
                readonly 'value':
                    | readonly ['local', {
                        readonly 'l entry': s_self.structure.Types.D
                        readonly 'l id': string
                    }]
                    | readonly ['child namespace', {
                        readonly 'namespace': {
                            readonly 'l entry': s_self.structure.Namespaces.D
                            readonly 'l id': string
                        }
                        readonly 'type': {
                            readonly 'l entry': s_self.structure.Types.D
                            readonly 'l id': string
                        }
                    }]
                    | readonly ['sibling namespace', {
                        readonly 'namespace': {
                            readonly 'l entry': s_self.structure.Namespaces.D
                            readonly 'l id': string
                        }
                        readonly 'type': {
                            readonly 'l entry': s_self.structure.Types.D
                            readonly 'l id': string
                        }
                    }]
                readonly 'result': s_self.structure.Type
            }
        }
        readonly 'path': {
            readonly 'tail': {
                readonly 'value': p_.List<{
                    readonly 'value': {
                        readonly 'value':
                            | readonly ['dictionary', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.dictionary
                                }
                                readonly 'value': null
                            }]
                            | readonly ['group', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.group
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Group.D
                                    readonly 'l id': string
                                }
                            }]
                            | readonly ['list', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.list
                                }
                                readonly 'value': null
                            }]
                            | readonly ['optional', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.optional
                                }
                                readonly 'value': null
                            }]
                            | readonly ['state', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.state
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                    readonly 'l id': string
                                }
                            }]
                        readonly 'result': s_self.structure.Value
                    }
                    readonly 'result': s_self.structure.Value
                }>
                readonly 'result': s_self.structure.Value
            }
        }
    }
    
    export namespace Value_Reference {
        
        export type type_ = {
            readonly 'location': {
                readonly 'value':
                    | readonly ['local', {
                        readonly 'l entry': s_self.structure.Types.D
                        readonly 'l id': string
                    }]
                    | readonly ['child namespace', {
                        readonly 'namespace': {
                            readonly 'l entry': s_self.structure.Namespaces.D
                            readonly 'l id': string
                        }
                        readonly 'type': {
                            readonly 'l entry': s_self.structure.Types.D
                            readonly 'l id': string
                        }
                    }]
                    | readonly ['sibling namespace', {
                        readonly 'namespace': {
                            readonly 'l entry': s_self.structure.Namespaces.D
                            readonly 'l id': string
                        }
                        readonly 'type': {
                            readonly 'l entry': s_self.structure.Types.D
                            readonly 'l id': string
                        }
                    }]
                readonly 'result': s_self.structure.Type
            }
        }
        
        export namespace type_ {
            
            export type location = {
                readonly 'value':
                    | readonly ['local', {
                        readonly 'l entry': s_self.structure.Types.D
                        readonly 'l id': string
                    }]
                    | readonly ['child namespace', {
                        readonly 'namespace': {
                            readonly 'l entry': s_self.structure.Namespaces.D
                            readonly 'l id': string
                        }
                        readonly 'type': {
                            readonly 'l entry': s_self.structure.Types.D
                            readonly 'l id': string
                        }
                    }]
                    | readonly ['sibling namespace', {
                        readonly 'namespace': {
                            readonly 'l entry': s_self.structure.Namespaces.D
                            readonly 'l id': string
                        }
                        readonly 'type': {
                            readonly 'l entry': s_self.structure.Types.D
                            readonly 'l id': string
                        }
                    }]
                readonly 'result': s_self.structure.Type
            }
            
            export namespace location {
                
                export type value =
                    | readonly ['local', {
                        readonly 'l entry': s_self.structure.Types.D
                        readonly 'l id': string
                    }]
                    | readonly ['child namespace', {
                        readonly 'namespace': {
                            readonly 'l entry': s_self.structure.Namespaces.D
                            readonly 'l id': string
                        }
                        readonly 'type': {
                            readonly 'l entry': s_self.structure.Types.D
                            readonly 'l id': string
                        }
                    }]
                    | readonly ['sibling namespace', {
                        readonly 'namespace': {
                            readonly 'l entry': s_self.structure.Namespaces.D
                            readonly 'l id': string
                        }
                        readonly 'type': {
                            readonly 'l entry': s_self.structure.Types.D
                            readonly 'l id': string
                        }
                    }]
                
                export namespace value {
                    export namespace type_ {
                        
                        export type local = {
                            readonly 'l entry': s_self.structure.Types.D
                            readonly 'l id': string
                        }
                        
                        export namespace local {
                            
                            export type l_entry = s_self.structure.Types.D
                            
                            export type l_id = string
                            
                        }
                        
                        export type child_namespace = {
                            readonly 'namespace': {
                                readonly 'l entry': s_self.structure.Namespaces.D
                                readonly 'l id': string
                            }
                            readonly 'type': {
                                readonly 'l entry': s_self.structure.Types.D
                                readonly 'l id': string
                            }
                        }
                        
                        export namespace child_namespace {
                            
                            export type namespace = {
                                readonly 'l entry': s_self.structure.Namespaces.D
                                readonly 'l id': string
                            }
                            
                            export namespace namespace {
                                
                                export type l_entry = s_self.structure.Namespaces.D
                                
                                export type l_id = string
                                
                            }
                            
                            export type type_ = {
                                readonly 'l entry': s_self.structure.Types.D
                                readonly 'l id': string
                            }
                            
                            export namespace type_ {
                                
                                export type l_entry = s_self.structure.Types.D
                                
                                export type l_id = string
                                
                            }
                            
                        }
                        
                        export type sibling_namespace = {
                            readonly 'namespace': {
                                readonly 'l entry': s_self.structure.Namespaces.D
                                readonly 'l id': string
                            }
                            readonly 'type': {
                                readonly 'l entry': s_self.structure.Types.D
                                readonly 'l id': string
                            }
                        }
                        
                        export namespace sibling_namespace {
                            
                            export type namespace = {
                                readonly 'l entry': s_self.structure.Namespaces.D
                                readonly 'l id': string
                            }
                            
                            export namespace namespace {
                                
                                export type l_entry = s_self.structure.Namespaces.D
                                
                                export type l_id = string
                                
                            }
                            
                            export type type_ = {
                                readonly 'l entry': s_self.structure.Types.D
                                readonly 'l id': string
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
            readonly 'tail': {
                readonly 'value': p_.List<{
                    readonly 'value': {
                        readonly 'value':
                            | readonly ['dictionary', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.dictionary
                                }
                                readonly 'value': null
                            }]
                            | readonly ['group', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.group
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Group.D
                                    readonly 'l id': string
                                }
                            }]
                            | readonly ['list', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.list
                                }
                                readonly 'value': null
                            }]
                            | readonly ['optional', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.optional
                                }
                                readonly 'value': null
                            }]
                            | readonly ['state', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.state
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                    readonly 'l id': string
                                }
                            }]
                        readonly 'result': s_self.structure.Value
                    }
                    readonly 'result': s_self.structure.Value
                }>
                readonly 'result': s_self.structure.Value
            }
        }
        
        export namespace path {
            
            export type tail = {
                readonly 'value': p_.List<{
                    readonly 'value': {
                        readonly 'value':
                            | readonly ['dictionary', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.dictionary
                                }
                                readonly 'value': null
                            }]
                            | readonly ['group', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.group
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Group.D
                                    readonly 'l id': string
                                }
                            }]
                            | readonly ['list', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.list
                                }
                                readonly 'value': null
                            }]
                            | readonly ['optional', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.optional
                                }
                                readonly 'value': null
                            }]
                            | readonly ['state', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.state
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                    readonly 'l id': string
                                }
                            }]
                        readonly 'result': s_self.structure.Value
                    }
                    readonly 'result': s_self.structure.Value
                }>
                readonly 'result': s_self.structure.Value
            }
            
            export namespace tail {
                
                export type value = p_.List<{
                    readonly 'value': {
                        readonly 'value':
                            | readonly ['dictionary', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.dictionary
                                }
                                readonly 'value': null
                            }]
                            | readonly ['group', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.group
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Group.D
                                    readonly 'l id': string
                                }
                            }]
                            | readonly ['list', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.list
                                }
                                readonly 'value': null
                            }]
                            | readonly ['optional', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.optional
                                }
                                readonly 'value': null
                            }]
                            | readonly ['state', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.state
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                    readonly 'l id': string
                                }
                            }]
                        readonly 'result': s_self.structure.Value
                    }
                    readonly 'result': s_self.structure.Value
                }>
                
                export namespace value {
                    
                    export type L = {
                        readonly 'value': {
                            readonly 'value':
                                | readonly ['dictionary', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.dictionary
                                    }
                                    readonly 'value': null
                                }]
                                | readonly ['group', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.group
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Group.D
                                        readonly 'l id': string
                                    }
                                }]
                                | readonly ['list', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.list
                                    }
                                    readonly 'value': null
                                }]
                                | readonly ['optional', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.optional
                                    }
                                    readonly 'value': null
                                }]
                                | readonly ['state', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.state
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                        readonly 'l id': string
                                    }
                                }]
                            readonly 'result': s_self.structure.Value
                        }
                        readonly 'result': s_self.structure.Value
                    }
                    
                    export namespace L {
                        
                        export type value = {
                            readonly 'value':
                                | readonly ['dictionary', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.dictionary
                                    }
                                    readonly 'value': null
                                }]
                                | readonly ['group', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.group
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Group.D
                                        readonly 'l id': string
                                    }
                                }]
                                | readonly ['list', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.list
                                    }
                                    readonly 'value': null
                                }]
                                | readonly ['optional', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.optional
                                    }
                                    readonly 'value': null
                                }]
                                | readonly ['state', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.state
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                        readonly 'l id': string
                                    }
                                }]
                            readonly 'result': s_self.structure.Value
                        }
                        
                        export namespace value {
                            
                            export type value =
                                | readonly ['dictionary', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.dictionary
                                    }
                                    readonly 'value': null
                                }]
                                | readonly ['group', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.group
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Group.D
                                        readonly 'l id': string
                                    }
                                }]
                                | readonly ['list', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.list
                                    }
                                    readonly 'value': null
                                }]
                                | readonly ['optional', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.optional
                                    }
                                    readonly 'value': null
                                }]
                                | readonly ['state', {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.state
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                        readonly 'l id': string
                                    }
                                }]
                            
                            export namespace value {
                                export namespace type_ {
                                    
                                    export type dictionary = {
                                        readonly 'constraints': {
                                            readonly 'definition': s_self.structure.Value.type_.dictionary
                                        }
                                        readonly 'value': null
                                    }
                                    
                                    export namespace dictionary {
                                        
                                        export type constraints = {
                                            readonly 'definition': s_self.structure.Value.type_.dictionary
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type definition = s_self.structure.Value.type_.dictionary
                                            
                                        }
                                        
                                        export type value = null
                                        
                                    }
                                    
                                    export type group = {
                                        readonly 'constraints': {
                                            readonly 'definition': s_self.structure.Value.type_.group
                                        }
                                        readonly 'value': {
                                            readonly 'l entry': s_self.structure.Group.D
                                            readonly 'l id': string
                                        }
                                    }
                                    
                                    export namespace group {
                                        
                                        export type constraints = {
                                            readonly 'definition': s_self.structure.Value.type_.group
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type definition = s_self.structure.Value.type_.group
                                            
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': s_self.structure.Group.D
                                            readonly 'l id': string
                                        }
                                        
                                        export namespace value {
                                            
                                            export type l_entry = s_self.structure.Group.D
                                            
                                            export type l_id = string
                                            
                                        }
                                        
                                    }
                                    
                                    export type list = {
                                        readonly 'constraints': {
                                            readonly 'definition': s_self.structure.Value.type_.list
                                        }
                                        readonly 'value': null
                                    }
                                    
                                    export namespace list {
                                        
                                        export type constraints = {
                                            readonly 'definition': s_self.structure.Value.type_.list
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type definition = s_self.structure.Value.type_.list
                                            
                                        }
                                        
                                        export type value = null
                                        
                                    }
                                    
                                    export type optional = {
                                        readonly 'constraints': {
                                            readonly 'definition': s_self.structure.Value.type_.optional
                                        }
                                        readonly 'value': null
                                    }
                                    
                                    export namespace optional {
                                        
                                        export type constraints = {
                                            readonly 'definition': s_self.structure.Value.type_.optional
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type definition = s_self.structure.Value.type_.optional
                                            
                                        }
                                        
                                        export type value = null
                                        
                                    }
                                    
                                    export type state = {
                                        readonly 'constraints': {
                                            readonly 'definition': s_self.structure.Value.type_.state
                                        }
                                        readonly 'value': {
                                            readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                            readonly 'l id': string
                                        }
                                    }
                                    
                                    export namespace state {
                                        
                                        export type constraints = {
                                            readonly 'definition': s_self.structure.Value.type_.state
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type definition = s_self.structure.Value.type_.state
                                            
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                            readonly 'l id': string
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
        readonly 'value':
            | readonly ['local', {
                readonly 'l entry': s_self.structure.Types.D
                readonly 'l id': string
            }]
            | readonly ['child namespace', {
                readonly 'namespace': {
                    readonly 'l entry': s_self.structure.Namespaces.D
                    readonly 'l id': string
                }
                readonly 'type': {
                    readonly 'l entry': s_self.structure.Types.D
                    readonly 'l id': string
                }
            }]
            | readonly ['sibling namespace', {
                readonly 'namespace': {
                    readonly 'l entry': s_self.structure.Namespaces.D
                    readonly 'l id': string
                }
                readonly 'type': {
                    readonly 'l entry': s_self.structure.Types.D
                    readonly 'l id': string
                }
            }]
        readonly 'result': s_self.structure.Type
    }
    
    export namespace Simple_Component_Selection {
        
        export type value =
            | readonly ['local', {
                readonly 'l entry': s_self.structure.Types.D
                readonly 'l id': string
            }]
            | readonly ['child namespace', {
                readonly 'namespace': {
                    readonly 'l entry': s_self.structure.Namespaces.D
                    readonly 'l id': string
                }
                readonly 'type': {
                    readonly 'l entry': s_self.structure.Types.D
                    readonly 'l id': string
                }
            }]
            | readonly ['sibling namespace', {
                readonly 'namespace': {
                    readonly 'l entry': s_self.structure.Namespaces.D
                    readonly 'l id': string
                }
                readonly 'type': {
                    readonly 'l entry': s_self.structure.Types.D
                    readonly 'l id': string
                }
            }]
        
        export namespace value {
            export namespace type_ {
                
                export type local = {
                    readonly 'l entry': s_self.structure.Types.D
                    readonly 'l id': string
                }
                
                export namespace local {
                    
                    export type l_entry = s_self.structure.Types.D
                    
                    export type l_id = string
                    
                }
                
                export type child_namespace = {
                    readonly 'namespace': {
                        readonly 'l entry': s_self.structure.Namespaces.D
                        readonly 'l id': string
                    }
                    readonly 'type': {
                        readonly 'l entry': s_self.structure.Types.D
                        readonly 'l id': string
                    }
                }
                
                export namespace child_namespace {
                    
                    export type namespace = {
                        readonly 'l entry': s_self.structure.Namespaces.D
                        readonly 'l id': string
                    }
                    
                    export namespace namespace {
                        
                        export type l_entry = s_self.structure.Namespaces.D
                        
                        export type l_id = string
                        
                    }
                    
                    export type type_ = {
                        readonly 'l entry': s_self.structure.Types.D
                        readonly 'l id': string
                    }
                    
                    export namespace type_ {
                        
                        export type l_entry = s_self.structure.Types.D
                        
                        export type l_id = string
                        
                    }
                    
                }
                
                export type sibling_namespace = {
                    readonly 'namespace': {
                        readonly 'l entry': s_self.structure.Namespaces.D
                        readonly 'l id': string
                    }
                    readonly 'type': {
                        readonly 'l entry': s_self.structure.Types.D
                        readonly 'l id': string
                    }
                }
                
                export namespace sibling_namespace {
                    
                    export type namespace = {
                        readonly 'l entry': s_self.structure.Namespaces.D
                        readonly 'l id': string
                    }
                    
                    export namespace namespace {
                        
                        export type l_entry = s_self.structure.Namespaces.D
                        
                        export type l_id = string
                        
                    }
                    
                    export type type_ = {
                        readonly 'l entry': s_self.structure.Types.D
                        readonly 'l id': string
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
        readonly 'path': {
            readonly 'value': p_.List<{
                readonly 'value': {
                    readonly 'value':
                        | readonly ['benchmark link', s_self.resolver.Value_Reference]
                        | readonly ['simple component', {
                            readonly 'constraints': {
                                readonly 'component': s_self.structure.Value.type_.component
                                readonly 'definition': s_self.structure.Value.type_.component.type_.type_.simple
                            }
                            readonly 'value': s_self.resolver.Simple_Component_Selection
                        }]
                        | readonly ['component constraint', {
                            readonly 'constraints': {
                                readonly 'definition': s_self.structure.Value.type_.component
                            }
                            readonly 'value': {
                                readonly 'name': string
                                readonly 'target': s_self.resolver.Value_Reference
                            }
                        }]
                        | readonly ['navigable component', {
                            readonly 'constraints': {
                                readonly 'component': s_self.structure.Value.type_.component
                                readonly 'definition': s_self.structure.Value.type_.component.type_.type_.navigable
                            }
                            readonly 'value': null
                        }]
                        | readonly ['group', {
                            readonly 'constraints': {
                                readonly 'definition': s_self.structure.Value.type_.group
                            }
                            readonly 'value': {
                                readonly 'l entry': s_self.structure.Group.D
                                readonly 'l id': string
                            }
                        }]
                        | readonly ['list result', {
                            readonly 'constraints': {
                                readonly 'definition': s_self.structure.Value.type_.list
                            }
                            readonly 'value': null
                        }]
                        | readonly ['option constraint', {
                            readonly 'constraints': {
                                readonly 'definition': s_self.structure.Value.type_.state
                            }
                            readonly 'value': {
                                readonly 'option': {
                                    readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                    readonly 'l id': string
                                }
                                readonly 'constraint': {
                                    readonly 'l entry': s_self.structure.Option_Constraints.O.D
                                    readonly 'l id': string
                                }
                            }
                        }]
                        | readonly ['optional', {
                            readonly 'constraints': {
                                readonly 'definition': s_self.structure.Value.type_.optional
                            }
                            readonly 'value': null
                        }]
                        | readonly ['optional value constraint', {
                            readonly 'constraints': {
                                readonly 'definition': s_self.structure.Value.type_.optional
                            }
                            readonly 'value': {
                                readonly 'l entry': s_self.structure.Option_Constraints.O.D
                                readonly 'l id': string
                            }
                        }]
                        | readonly ['reference constraint', {
                            readonly 'constraints': {
                                readonly 'definition': s_self.structure.Value.type_.reference
                            }
                            readonly 'value': {
                                readonly 'l entry': s_self.structure.Reference_Constraints.O.D
                                readonly 'l id': string
                            }
                        }]
                        | readonly ['reference', {
                            readonly 'constraints': {
                                readonly 'definition': s_self.structure.Value.type_.reference
                            }
                            readonly 'value': null
                        }]
                        | readonly ['state result', {
                            readonly 'constraints': {
                                readonly 'definition': s_self.structure.Value.type_.state
                            }
                            readonly 'value': null
                        }]
                    readonly 'result': s_self.structure.Value
                }
                readonly 'result': s_self.structure.Value
            }>
            readonly 'result': s_self.structure.Value
        }
    }
    
    export namespace Relative_Value_Selection {
        
        export type path = {
            readonly 'value': p_.List<{
                readonly 'value': {
                    readonly 'value':
                        | readonly ['benchmark link', s_self.resolver.Value_Reference]
                        | readonly ['simple component', {
                            readonly 'constraints': {
                                readonly 'component': s_self.structure.Value.type_.component
                                readonly 'definition': s_self.structure.Value.type_.component.type_.type_.simple
                            }
                            readonly 'value': s_self.resolver.Simple_Component_Selection
                        }]
                        | readonly ['component constraint', {
                            readonly 'constraints': {
                                readonly 'definition': s_self.structure.Value.type_.component
                            }
                            readonly 'value': {
                                readonly 'name': string
                                readonly 'target': s_self.resolver.Value_Reference
                            }
                        }]
                        | readonly ['navigable component', {
                            readonly 'constraints': {
                                readonly 'component': s_self.structure.Value.type_.component
                                readonly 'definition': s_self.structure.Value.type_.component.type_.type_.navigable
                            }
                            readonly 'value': null
                        }]
                        | readonly ['group', {
                            readonly 'constraints': {
                                readonly 'definition': s_self.structure.Value.type_.group
                            }
                            readonly 'value': {
                                readonly 'l entry': s_self.structure.Group.D
                                readonly 'l id': string
                            }
                        }]
                        | readonly ['list result', {
                            readonly 'constraints': {
                                readonly 'definition': s_self.structure.Value.type_.list
                            }
                            readonly 'value': null
                        }]
                        | readonly ['option constraint', {
                            readonly 'constraints': {
                                readonly 'definition': s_self.structure.Value.type_.state
                            }
                            readonly 'value': {
                                readonly 'option': {
                                    readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                    readonly 'l id': string
                                }
                                readonly 'constraint': {
                                    readonly 'l entry': s_self.structure.Option_Constraints.O.D
                                    readonly 'l id': string
                                }
                            }
                        }]
                        | readonly ['optional', {
                            readonly 'constraints': {
                                readonly 'definition': s_self.structure.Value.type_.optional
                            }
                            readonly 'value': null
                        }]
                        | readonly ['optional value constraint', {
                            readonly 'constraints': {
                                readonly 'definition': s_self.structure.Value.type_.optional
                            }
                            readonly 'value': {
                                readonly 'l entry': s_self.structure.Option_Constraints.O.D
                                readonly 'l id': string
                            }
                        }]
                        | readonly ['reference constraint', {
                            readonly 'constraints': {
                                readonly 'definition': s_self.structure.Value.type_.reference
                            }
                            readonly 'value': {
                                readonly 'l entry': s_self.structure.Reference_Constraints.O.D
                                readonly 'l id': string
                            }
                        }]
                        | readonly ['reference', {
                            readonly 'constraints': {
                                readonly 'definition': s_self.structure.Value.type_.reference
                            }
                            readonly 'value': null
                        }]
                        | readonly ['state result', {
                            readonly 'constraints': {
                                readonly 'definition': s_self.structure.Value.type_.state
                            }
                            readonly 'value': null
                        }]
                    readonly 'result': s_self.structure.Value
                }
                readonly 'result': s_self.structure.Value
            }>
            readonly 'result': s_self.structure.Value
        }
        
        export namespace path {
            
            export type value = p_.List<{
                readonly 'value': {
                    readonly 'value':
                        | readonly ['benchmark link', s_self.resolver.Value_Reference]
                        | readonly ['simple component', {
                            readonly 'constraints': {
                                readonly 'component': s_self.structure.Value.type_.component
                                readonly 'definition': s_self.structure.Value.type_.component.type_.type_.simple
                            }
                            readonly 'value': s_self.resolver.Simple_Component_Selection
                        }]
                        | readonly ['component constraint', {
                            readonly 'constraints': {
                                readonly 'definition': s_self.structure.Value.type_.component
                            }
                            readonly 'value': {
                                readonly 'name': string
                                readonly 'target': s_self.resolver.Value_Reference
                            }
                        }]
                        | readonly ['navigable component', {
                            readonly 'constraints': {
                                readonly 'component': s_self.structure.Value.type_.component
                                readonly 'definition': s_self.structure.Value.type_.component.type_.type_.navigable
                            }
                            readonly 'value': null
                        }]
                        | readonly ['group', {
                            readonly 'constraints': {
                                readonly 'definition': s_self.structure.Value.type_.group
                            }
                            readonly 'value': {
                                readonly 'l entry': s_self.structure.Group.D
                                readonly 'l id': string
                            }
                        }]
                        | readonly ['list result', {
                            readonly 'constraints': {
                                readonly 'definition': s_self.structure.Value.type_.list
                            }
                            readonly 'value': null
                        }]
                        | readonly ['option constraint', {
                            readonly 'constraints': {
                                readonly 'definition': s_self.structure.Value.type_.state
                            }
                            readonly 'value': {
                                readonly 'option': {
                                    readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                    readonly 'l id': string
                                }
                                readonly 'constraint': {
                                    readonly 'l entry': s_self.structure.Option_Constraints.O.D
                                    readonly 'l id': string
                                }
                            }
                        }]
                        | readonly ['optional', {
                            readonly 'constraints': {
                                readonly 'definition': s_self.structure.Value.type_.optional
                            }
                            readonly 'value': null
                        }]
                        | readonly ['optional value constraint', {
                            readonly 'constraints': {
                                readonly 'definition': s_self.structure.Value.type_.optional
                            }
                            readonly 'value': {
                                readonly 'l entry': s_self.structure.Option_Constraints.O.D
                                readonly 'l id': string
                            }
                        }]
                        | readonly ['reference constraint', {
                            readonly 'constraints': {
                                readonly 'definition': s_self.structure.Value.type_.reference
                            }
                            readonly 'value': {
                                readonly 'l entry': s_self.structure.Reference_Constraints.O.D
                                readonly 'l id': string
                            }
                        }]
                        | readonly ['reference', {
                            readonly 'constraints': {
                                readonly 'definition': s_self.structure.Value.type_.reference
                            }
                            readonly 'value': null
                        }]
                        | readonly ['state result', {
                            readonly 'constraints': {
                                readonly 'definition': s_self.structure.Value.type_.state
                            }
                            readonly 'value': null
                        }]
                    readonly 'result': s_self.structure.Value
                }
                readonly 'result': s_self.structure.Value
            }>
            
            export namespace value {
                
                export type L = {
                    readonly 'value': {
                        readonly 'value':
                            | readonly ['benchmark link', s_self.resolver.Value_Reference]
                            | readonly ['simple component', {
                                readonly 'constraints': {
                                    readonly 'component': s_self.structure.Value.type_.component
                                    readonly 'definition': s_self.structure.Value.type_.component.type_.type_.simple
                                }
                                readonly 'value': s_self.resolver.Simple_Component_Selection
                            }]
                            | readonly ['component constraint', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.component
                                }
                                readonly 'value': {
                                    readonly 'name': string
                                    readonly 'target': s_self.resolver.Value_Reference
                                }
                            }]
                            | readonly ['navigable component', {
                                readonly 'constraints': {
                                    readonly 'component': s_self.structure.Value.type_.component
                                    readonly 'definition': s_self.structure.Value.type_.component.type_.type_.navigable
                                }
                                readonly 'value': null
                            }]
                            | readonly ['group', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.group
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Group.D
                                    readonly 'l id': string
                                }
                            }]
                            | readonly ['list result', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.list
                                }
                                readonly 'value': null
                            }]
                            | readonly ['option constraint', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.state
                                }
                                readonly 'value': {
                                    readonly 'option': {
                                        readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                        readonly 'l id': string
                                    }
                                    readonly 'constraint': {
                                        readonly 'l entry': s_self.structure.Option_Constraints.O.D
                                        readonly 'l id': string
                                    }
                                }
                            }]
                            | readonly ['optional', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.optional
                                }
                                readonly 'value': null
                            }]
                            | readonly ['optional value constraint', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.optional
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Option_Constraints.O.D
                                    readonly 'l id': string
                                }
                            }]
                            | readonly ['reference constraint', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.reference
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Reference_Constraints.O.D
                                    readonly 'l id': string
                                }
                            }]
                            | readonly ['reference', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.reference
                                }
                                readonly 'value': null
                            }]
                            | readonly ['state result', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.state
                                }
                                readonly 'value': null
                            }]
                        readonly 'result': s_self.structure.Value
                    }
                    readonly 'result': s_self.structure.Value
                }
                
                export namespace L {
                    
                    export type value = {
                        readonly 'value':
                            | readonly ['benchmark link', s_self.resolver.Value_Reference]
                            | readonly ['simple component', {
                                readonly 'constraints': {
                                    readonly 'component': s_self.structure.Value.type_.component
                                    readonly 'definition': s_self.structure.Value.type_.component.type_.type_.simple
                                }
                                readonly 'value': s_self.resolver.Simple_Component_Selection
                            }]
                            | readonly ['component constraint', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.component
                                }
                                readonly 'value': {
                                    readonly 'name': string
                                    readonly 'target': s_self.resolver.Value_Reference
                                }
                            }]
                            | readonly ['navigable component', {
                                readonly 'constraints': {
                                    readonly 'component': s_self.structure.Value.type_.component
                                    readonly 'definition': s_self.structure.Value.type_.component.type_.type_.navigable
                                }
                                readonly 'value': null
                            }]
                            | readonly ['group', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.group
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Group.D
                                    readonly 'l id': string
                                }
                            }]
                            | readonly ['list result', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.list
                                }
                                readonly 'value': null
                            }]
                            | readonly ['option constraint', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.state
                                }
                                readonly 'value': {
                                    readonly 'option': {
                                        readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                        readonly 'l id': string
                                    }
                                    readonly 'constraint': {
                                        readonly 'l entry': s_self.structure.Option_Constraints.O.D
                                        readonly 'l id': string
                                    }
                                }
                            }]
                            | readonly ['optional', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.optional
                                }
                                readonly 'value': null
                            }]
                            | readonly ['optional value constraint', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.optional
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Option_Constraints.O.D
                                    readonly 'l id': string
                                }
                            }]
                            | readonly ['reference constraint', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.reference
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Reference_Constraints.O.D
                                    readonly 'l id': string
                                }
                            }]
                            | readonly ['reference', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.reference
                                }
                                readonly 'value': null
                            }]
                            | readonly ['state result', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.state
                                }
                                readonly 'value': null
                            }]
                        readonly 'result': s_self.structure.Value
                    }
                    
                    export namespace value {
                        
                        export type value =
                            | readonly ['benchmark link', s_self.resolver.Value_Reference]
                            | readonly ['simple component', {
                                readonly 'constraints': {
                                    readonly 'component': s_self.structure.Value.type_.component
                                    readonly 'definition': s_self.structure.Value.type_.component.type_.type_.simple
                                }
                                readonly 'value': s_self.resolver.Simple_Component_Selection
                            }]
                            | readonly ['component constraint', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.component
                                }
                                readonly 'value': {
                                    readonly 'name': string
                                    readonly 'target': s_self.resolver.Value_Reference
                                }
                            }]
                            | readonly ['navigable component', {
                                readonly 'constraints': {
                                    readonly 'component': s_self.structure.Value.type_.component
                                    readonly 'definition': s_self.structure.Value.type_.component.type_.type_.navigable
                                }
                                readonly 'value': null
                            }]
                            | readonly ['group', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.group
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Group.D
                                    readonly 'l id': string
                                }
                            }]
                            | readonly ['list result', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.list
                                }
                                readonly 'value': null
                            }]
                            | readonly ['option constraint', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.state
                                }
                                readonly 'value': {
                                    readonly 'option': {
                                        readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                        readonly 'l id': string
                                    }
                                    readonly 'constraint': {
                                        readonly 'l entry': s_self.structure.Option_Constraints.O.D
                                        readonly 'l id': string
                                    }
                                }
                            }]
                            | readonly ['optional', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.optional
                                }
                                readonly 'value': null
                            }]
                            | readonly ['optional value constraint', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.optional
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Option_Constraints.O.D
                                    readonly 'l id': string
                                }
                            }]
                            | readonly ['reference constraint', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.reference
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Reference_Constraints.O.D
                                    readonly 'l id': string
                                }
                            }]
                            | readonly ['reference', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.reference
                                }
                                readonly 'value': null
                            }]
                            | readonly ['state result', {
                                readonly 'constraints': {
                                    readonly 'definition': s_self.structure.Value.type_.state
                                }
                                readonly 'value': null
                            }]
                        
                        export namespace value {
                            export namespace type_ {
                                
                                export type benchmark_link = s_self.resolver.Value_Reference
                                
                                export type simple_component = {
                                    readonly 'constraints': {
                                        readonly 'component': s_self.structure.Value.type_.component
                                        readonly 'definition': s_self.structure.Value.type_.component.type_.type_.simple
                                    }
                                    readonly 'value': s_self.resolver.Simple_Component_Selection
                                }
                                
                                export namespace simple_component {
                                    
                                    export type constraints = {
                                        readonly 'component': s_self.structure.Value.type_.component
                                        readonly 'definition': s_self.structure.Value.type_.component.type_.type_.simple
                                    }
                                    
                                    export namespace constraints {
                                        
                                        export type component = s_self.structure.Value.type_.component
                                        
                                        export type definition = s_self.structure.Value.type_.component.type_.type_.simple
                                        
                                    }
                                    
                                    export type value = s_self.resolver.Simple_Component_Selection
                                    
                                }
                                
                                export type component_constraint = {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.component
                                    }
                                    readonly 'value': {
                                        readonly 'name': string
                                        readonly 'target': s_self.resolver.Value_Reference
                                    }
                                }
                                
                                export namespace component_constraint {
                                    
                                    export type constraints = {
                                        readonly 'definition': s_self.structure.Value.type_.component
                                    }
                                    
                                    export namespace constraints {
                                        
                                        export type definition = s_self.structure.Value.type_.component
                                        
                                    }
                                    
                                    export type value = {
                                        readonly 'name': string
                                        readonly 'target': s_self.resolver.Value_Reference
                                    }
                                    
                                    export namespace value {
                                        
                                        export type name = string
                                        
                                        export type target = s_self.resolver.Value_Reference
                                        
                                    }
                                    
                                }
                                
                                export type navigable_component = {
                                    readonly 'constraints': {
                                        readonly 'component': s_self.structure.Value.type_.component
                                        readonly 'definition': s_self.structure.Value.type_.component.type_.type_.navigable
                                    }
                                    readonly 'value': null
                                }
                                
                                export namespace navigable_component {
                                    
                                    export type constraints = {
                                        readonly 'component': s_self.structure.Value.type_.component
                                        readonly 'definition': s_self.structure.Value.type_.component.type_.type_.navigable
                                    }
                                    
                                    export namespace constraints {
                                        
                                        export type component = s_self.structure.Value.type_.component
                                        
                                        export type definition = s_self.structure.Value.type_.component.type_.type_.navigable
                                        
                                    }
                                    
                                    export type value = null
                                    
                                }
                                
                                export type group = {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.group
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Group.D
                                        readonly 'l id': string
                                    }
                                }
                                
                                export namespace group {
                                    
                                    export type constraints = {
                                        readonly 'definition': s_self.structure.Value.type_.group
                                    }
                                    
                                    export namespace constraints {
                                        
                                        export type definition = s_self.structure.Value.type_.group
                                        
                                    }
                                    
                                    export type value = {
                                        readonly 'l entry': s_self.structure.Group.D
                                        readonly 'l id': string
                                    }
                                    
                                    export namespace value {
                                        
                                        export type l_entry = s_self.structure.Group.D
                                        
                                        export type l_id = string
                                        
                                    }
                                    
                                }
                                
                                export type list_result = {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.list
                                    }
                                    readonly 'value': null
                                }
                                
                                export namespace list_result {
                                    
                                    export type constraints = {
                                        readonly 'definition': s_self.structure.Value.type_.list
                                    }
                                    
                                    export namespace constraints {
                                        
                                        export type definition = s_self.structure.Value.type_.list
                                        
                                    }
                                    
                                    export type value = null
                                    
                                }
                                
                                export type option_constraint = {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.state
                                    }
                                    readonly 'value': {
                                        readonly 'option': {
                                            readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                            readonly 'l id': string
                                        }
                                        readonly 'constraint': {
                                            readonly 'l entry': s_self.structure.Option_Constraints.O.D
                                            readonly 'l id': string
                                        }
                                    }
                                }
                                
                                export namespace option_constraint {
                                    
                                    export type constraints = {
                                        readonly 'definition': s_self.structure.Value.type_.state
                                    }
                                    
                                    export namespace constraints {
                                        
                                        export type definition = s_self.structure.Value.type_.state
                                        
                                    }
                                    
                                    export type value = {
                                        readonly 'option': {
                                            readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                            readonly 'l id': string
                                        }
                                        readonly 'constraint': {
                                            readonly 'l entry': s_self.structure.Option_Constraints.O.D
                                            readonly 'l id': string
                                        }
                                    }
                                    
                                    export namespace value {
                                        
                                        export type option = {
                                            readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                            readonly 'l id': string
                                        }
                                        
                                        export namespace option {
                                            
                                            export type l_entry = s_self.structure.Value.type_.state.options.D
                                            
                                            export type l_id = string
                                            
                                        }
                                        
                                        export type constraint = {
                                            readonly 'l entry': s_self.structure.Option_Constraints.O.D
                                            readonly 'l id': string
                                        }
                                        
                                        export namespace constraint {
                                            
                                            export type l_entry = s_self.structure.Option_Constraints.O.D
                                            
                                            export type l_id = string
                                            
                                        }
                                        
                                    }
                                    
                                }
                                
                                export type optional = {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.optional
                                    }
                                    readonly 'value': null
                                }
                                
                                export namespace optional {
                                    
                                    export type constraints = {
                                        readonly 'definition': s_self.structure.Value.type_.optional
                                    }
                                    
                                    export namespace constraints {
                                        
                                        export type definition = s_self.structure.Value.type_.optional
                                        
                                    }
                                    
                                    export type value = null
                                    
                                }
                                
                                export type optional_value_constraint = {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.optional
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Option_Constraints.O.D
                                        readonly 'l id': string
                                    }
                                }
                                
                                export namespace optional_value_constraint {
                                    
                                    export type constraints = {
                                        readonly 'definition': s_self.structure.Value.type_.optional
                                    }
                                    
                                    export namespace constraints {
                                        
                                        export type definition = s_self.structure.Value.type_.optional
                                        
                                    }
                                    
                                    export type value = {
                                        readonly 'l entry': s_self.structure.Option_Constraints.O.D
                                        readonly 'l id': string
                                    }
                                    
                                    export namespace value {
                                        
                                        export type l_entry = s_self.structure.Option_Constraints.O.D
                                        
                                        export type l_id = string
                                        
                                    }
                                    
                                }
                                
                                export type reference_constraint = {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.reference
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Reference_Constraints.O.D
                                        readonly 'l id': string
                                    }
                                }
                                
                                export namespace reference_constraint {
                                    
                                    export type constraints = {
                                        readonly 'definition': s_self.structure.Value.type_.reference
                                    }
                                    
                                    export namespace constraints {
                                        
                                        export type definition = s_self.structure.Value.type_.reference
                                        
                                    }
                                    
                                    export type value = {
                                        readonly 'l entry': s_self.structure.Reference_Constraints.O.D
                                        readonly 'l id': string
                                    }
                                    
                                    export namespace value {
                                        
                                        export type l_entry = s_self.structure.Reference_Constraints.O.D
                                        
                                        export type l_id = string
                                        
                                    }
                                    
                                }
                                
                                export type reference = {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.reference
                                    }
                                    readonly 'value': null
                                }
                                
                                export namespace reference {
                                    
                                    export type constraints = {
                                        readonly 'definition': s_self.structure.Value.type_.reference
                                    }
                                    
                                    export namespace constraints {
                                        
                                        export type definition = s_self.structure.Value.type_.reference
                                        
                                    }
                                    
                                    export type value = null
                                    
                                }
                                
                                export type state_result = {
                                    readonly 'constraints': {
                                        readonly 'definition': s_self.structure.Value.type_.state
                                    }
                                    readonly 'value': null
                                }
                                
                                export namespace state_result {
                                    
                                    export type constraints = {
                                        readonly 'definition': s_self.structure.Value.type_.state
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
        readonly 'value':
            | readonly ['optional value', {
                readonly 'selection': {
                    readonly 'constraints': {
                        readonly 'optional': s_self.structure.Value.type_.optional
                    }
                    readonly 'value': s_self.resolver.Guaranteed_Value_Selection
                }
                readonly 'tail': s_self.resolver.Relative_Value_Selection
            }]
            | readonly ['parameter', {
                readonly 'l entry': s_self.declarations.Signature.values.D
                readonly 'l id': string
            }]
            | readonly ['result', {
                readonly 'value':
                    | readonly ['state', {
                        readonly 'property': {
                            readonly 'constraints': {
                                readonly 'state': s_self.structure.Value.type_.state
                                readonly 'result': s_self.structure.Value_Result.O
                            }
                            readonly 'value': {
                                readonly 'l entry': s_self.structure.Group.D
                                readonly 'l id': string
                            }
                        }
                    }]
                    | readonly ['optional value', {
                        readonly 'property': {
                            readonly 'constraints': {
                                readonly 'optional': s_self.structure.Value.type_.optional
                                readonly 'result': s_self.structure.Value_Result.O
                            }
                            readonly 'value': {
                                readonly 'l entry': s_self.structure.Group.D
                                readonly 'l id': string
                            }
                        }
                    }]
                readonly 'result': s_self.structure.Value
            }]
        readonly 'result': s_self.structure.Value
    }
    
    export namespace Possible_Value_Selection {
        
        export type value =
            | readonly ['optional value', {
                readonly 'selection': {
                    readonly 'constraints': {
                        readonly 'optional': s_self.structure.Value.type_.optional
                    }
                    readonly 'value': s_self.resolver.Guaranteed_Value_Selection
                }
                readonly 'tail': s_self.resolver.Relative_Value_Selection
            }]
            | readonly ['parameter', {
                readonly 'l entry': s_self.declarations.Signature.values.D
                readonly 'l id': string
            }]
            | readonly ['result', {
                readonly 'value':
                    | readonly ['state', {
                        readonly 'property': {
                            readonly 'constraints': {
                                readonly 'state': s_self.structure.Value.type_.state
                                readonly 'result': s_self.structure.Value_Result.O
                            }
                            readonly 'value': {
                                readonly 'l entry': s_self.structure.Group.D
                                readonly 'l id': string
                            }
                        }
                    }]
                    | readonly ['optional value', {
                        readonly 'property': {
                            readonly 'constraints': {
                                readonly 'optional': s_self.structure.Value.type_.optional
                                readonly 'result': s_self.structure.Value_Result.O
                            }
                            readonly 'value': {
                                readonly 'l entry': s_self.structure.Group.D
                                readonly 'l id': string
                            }
                        }
                    }]
                readonly 'result': s_self.structure.Value
            }]
        
        export namespace value {
            export namespace type_ {
                
                export type optional_value = {
                    readonly 'selection': {
                        readonly 'constraints': {
                            readonly 'optional': s_self.structure.Value.type_.optional
                        }
                        readonly 'value': s_self.resolver.Guaranteed_Value_Selection
                    }
                    readonly 'tail': s_self.resolver.Relative_Value_Selection
                }
                
                export namespace optional_value {
                    
                    export type selection = {
                        readonly 'constraints': {
                            readonly 'optional': s_self.structure.Value.type_.optional
                        }
                        readonly 'value': s_self.resolver.Guaranteed_Value_Selection
                    }
                    
                    export namespace selection {
                        
                        export type constraints = {
                            readonly 'optional': s_self.structure.Value.type_.optional
                        }
                        
                        export namespace constraints {
                            
                            export type optional = s_self.structure.Value.type_.optional
                            
                        }
                        
                        export type value = s_self.resolver.Guaranteed_Value_Selection
                        
                    }
                    
                    export type tail = s_self.resolver.Relative_Value_Selection
                    
                }
                
                export type parameter = {
                    readonly 'l entry': s_self.declarations.Signature.values.D
                    readonly 'l id': string
                }
                
                export namespace parameter {
                    
                    export type l_entry = s_self.declarations.Signature.values.D
                    
                    export type l_id = string
                    
                }
                
                export type result = {
                    readonly 'value':
                        | readonly ['state', {
                            readonly 'property': {
                                readonly 'constraints': {
                                    readonly 'state': s_self.structure.Value.type_.state
                                    readonly 'result': s_self.structure.Value_Result.O
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Group.D
                                    readonly 'l id': string
                                }
                            }
                        }]
                        | readonly ['optional value', {
                            readonly 'property': {
                                readonly 'constraints': {
                                    readonly 'optional': s_self.structure.Value.type_.optional
                                    readonly 'result': s_self.structure.Value_Result.O
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Group.D
                                    readonly 'l id': string
                                }
                            }
                        }]
                    readonly 'result': s_self.structure.Value
                }
                
                export namespace result {
                    
                    export type value =
                        | readonly ['state', {
                            readonly 'property': {
                                readonly 'constraints': {
                                    readonly 'state': s_self.structure.Value.type_.state
                                    readonly 'result': s_self.structure.Value_Result.O
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Group.D
                                    readonly 'l id': string
                                }
                            }
                        }]
                        | readonly ['optional value', {
                            readonly 'property': {
                                readonly 'constraints': {
                                    readonly 'optional': s_self.structure.Value.type_.optional
                                    readonly 'result': s_self.structure.Value_Result.O
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Group.D
                                    readonly 'l id': string
                                }
                            }
                        }]
                    
                    export namespace value {
                        export namespace type_ {
                            
                            export type state = {
                                readonly 'property': {
                                    readonly 'constraints': {
                                        readonly 'state': s_self.structure.Value.type_.state
                                        readonly 'result': s_self.structure.Value_Result.O
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Group.D
                                        readonly 'l id': string
                                    }
                                }
                            }
                            
                            export namespace state {
                                
                                export type property = {
                                    readonly 'constraints': {
                                        readonly 'state': s_self.structure.Value.type_.state
                                        readonly 'result': s_self.structure.Value_Result.O
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Group.D
                                        readonly 'l id': string
                                    }
                                }
                                
                                export namespace property {
                                    
                                    export type constraints = {
                                        readonly 'state': s_self.structure.Value.type_.state
                                        readonly 'result': s_self.structure.Value_Result.O
                                    }
                                    
                                    export namespace constraints {
                                        
                                        export type state = s_self.structure.Value.type_.state
                                        
                                        export type result = s_self.structure.Value_Result.O
                                        
                                    }
                                    
                                    export type value = {
                                        readonly 'l entry': s_self.structure.Group.D
                                        readonly 'l id': string
                                    }
                                    
                                    export namespace value {
                                        
                                        export type l_entry = s_self.structure.Group.D
                                        
                                        export type l_id = string
                                        
                                    }
                                    
                                }
                                
                            }
                            
                            export type optional_value = {
                                readonly 'property': {
                                    readonly 'constraints': {
                                        readonly 'optional': s_self.structure.Value.type_.optional
                                        readonly 'result': s_self.structure.Value_Result.O
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Group.D
                                        readonly 'l id': string
                                    }
                                }
                            }
                            
                            export namespace optional_value {
                                
                                export type property = {
                                    readonly 'constraints': {
                                        readonly 'optional': s_self.structure.Value.type_.optional
                                        readonly 'result': s_self.structure.Value_Result.O
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Group.D
                                        readonly 'l id': string
                                    }
                                }
                                
                                export namespace property {
                                    
                                    export type constraints = {
                                        readonly 'optional': s_self.structure.Value.type_.optional
                                        readonly 'result': s_self.structure.Value_Result.O
                                    }
                                    
                                    export namespace constraints {
                                        
                                        export type optional = s_self.structure.Value.type_.optional
                                        
                                        export type result = s_self.structure.Value_Result.O
                                        
                                    }
                                    
                                    export type value = {
                                        readonly 'l entry': s_self.structure.Group.D
                                        readonly 'l id': string
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
    
    export type Option_Constraints = p_.Optional_Value<{
        readonly 'constraints': {
            readonly 'declarations': s_self.structure.Option_Constraints.O
        }
        readonly 'value': p_.Dictionary<{
            readonly 'benchmark': s_self.structure.Option_Constraints.O.D
            readonly 'value': {
                readonly 'value':
                    | readonly ['state', {
                        readonly 'selection': {
                            readonly 'constraints': {
                                readonly 'state': s_self.structure.Value.type_.state
                            }
                            readonly 'value': s_self.resolver.Guaranteed_Value_Selection
                        }
                        readonly 'option': {
                            readonly 'l entry': s_self.structure.Value.type_.state.options.D
                            readonly 'l id': string
                        }
                    }]
                    | readonly ['assert is set', s_self.resolver.Possible_Value_Selection]
                readonly 'result': s_self.structure.Value
            }
        }>
    }>
    
    export namespace Option_Constraints {
        
        export type O = {
            readonly 'constraints': {
                readonly 'declarations': s_self.structure.Option_Constraints.O
            }
            readonly 'value': p_.Dictionary<{
                readonly 'benchmark': s_self.structure.Option_Constraints.O.D
                readonly 'value': {
                    readonly 'value':
                        | readonly ['state', {
                            readonly 'selection': {
                                readonly 'constraints': {
                                    readonly 'state': s_self.structure.Value.type_.state
                                }
                                readonly 'value': s_self.resolver.Guaranteed_Value_Selection
                            }
                            readonly 'option': {
                                readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                readonly 'l id': string
                            }
                        }]
                        | readonly ['assert is set', s_self.resolver.Possible_Value_Selection]
                    readonly 'result': s_self.structure.Value
                }
            }>
        }
        
        export namespace O {
            
            export type constraints = {
                readonly 'declarations': s_self.structure.Option_Constraints.O
            }
            
            export namespace constraints {
                
                export type declarations = s_self.structure.Option_Constraints.O
                
            }
            
            export type value = p_.Dictionary<{
                readonly 'benchmark': s_self.structure.Option_Constraints.O.D
                readonly 'value': {
                    readonly 'value':
                        | readonly ['state', {
                            readonly 'selection': {
                                readonly 'constraints': {
                                    readonly 'state': s_self.structure.Value.type_.state
                                }
                                readonly 'value': s_self.resolver.Guaranteed_Value_Selection
                            }
                            readonly 'option': {
                                readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                readonly 'l id': string
                            }
                        }]
                        | readonly ['assert is set', s_self.resolver.Possible_Value_Selection]
                    readonly 'result': s_self.structure.Value
                }
            }>
            
            export namespace value {
                
                export type D = {
                    readonly 'benchmark': s_self.structure.Option_Constraints.O.D
                    readonly 'value': {
                        readonly 'value':
                            | readonly ['state', {
                                readonly 'selection': {
                                    readonly 'constraints': {
                                        readonly 'state': s_self.structure.Value.type_.state
                                    }
                                    readonly 'value': s_self.resolver.Guaranteed_Value_Selection
                                }
                                readonly 'option': {
                                    readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                    readonly 'l id': string
                                }
                            }]
                            | readonly ['assert is set', s_self.resolver.Possible_Value_Selection]
                        readonly 'result': s_self.structure.Value
                    }
                }
                
                export namespace D {
                    
                    export type benchmark = s_self.structure.Option_Constraints.O.D
                    
                    export type value = {
                        readonly 'value':
                            | readonly ['state', {
                                readonly 'selection': {
                                    readonly 'constraints': {
                                        readonly 'state': s_self.structure.Value.type_.state
                                    }
                                    readonly 'value': s_self.resolver.Guaranteed_Value_Selection
                                }
                                readonly 'option': {
                                    readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                    readonly 'l id': string
                                }
                            }]
                            | readonly ['assert is set', s_self.resolver.Possible_Value_Selection]
                        readonly 'result': s_self.structure.Value
                    }
                    
                    export namespace value {
                        
                        export type value =
                            | readonly ['state', {
                                readonly 'selection': {
                                    readonly 'constraints': {
                                        readonly 'state': s_self.structure.Value.type_.state
                                    }
                                    readonly 'value': s_self.resolver.Guaranteed_Value_Selection
                                }
                                readonly 'option': {
                                    readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                    readonly 'l id': string
                                }
                            }]
                            | readonly ['assert is set', s_self.resolver.Possible_Value_Selection]
                        
                        export namespace value {
                            export namespace type_ {
                                
                                export type state = {
                                    readonly 'selection': {
                                        readonly 'constraints': {
                                            readonly 'state': s_self.structure.Value.type_.state
                                        }
                                        readonly 'value': s_self.resolver.Guaranteed_Value_Selection
                                    }
                                    readonly 'option': {
                                        readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                        readonly 'l id': string
                                    }
                                }
                                
                                export namespace state {
                                    
                                    export type selection = {
                                        readonly 'constraints': {
                                            readonly 'state': s_self.structure.Value.type_.state
                                        }
                                        readonly 'value': s_self.resolver.Guaranteed_Value_Selection
                                    }
                                    
                                    export namespace selection {
                                        
                                        export type constraints = {
                                            readonly 'state': s_self.structure.Value.type_.state
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type state = s_self.structure.Value.type_.state
                                            
                                        }
                                        
                                        export type value = s_self.resolver.Guaranteed_Value_Selection
                                        
                                    }
                                    
                                    export type option = {
                                        readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                        readonly 'l id': string
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
        readonly 'start': {
            readonly 'value':
                | readonly ['optional fallback', {
                    readonly 'selection': s_self.resolver.Possible_Value_Selection
                    readonly 'fallback': s_self.resolver.Guaranteed_Value_Selection
                }]
                | readonly ['sibling property', {
                    readonly 'l entry': s_self.structure.Group.D
                    readonly 'l id': string
                }]
                | readonly ['parent sibling', {
                    readonly 'l entry': s_self.structure.Group.D
                    readonly 'l id': string
                }]
                | readonly ['option constraint', {
                    readonly 'constraints': {
                        readonly 'oc': s_self.structure.Option_Constraints
                    }
                    readonly 'value': {
                        readonly 'l entry': s_self.structure.Option_Constraints.O.D
                        readonly 'l id': string
                    }
                }]
                | readonly ['sibling option constraint', {
                    readonly 'l entry': s_self.resolver.Option_Constraints.O.value.D
                    readonly 'l id': string
                }]
                | readonly ['list cursor', {
                    readonly 'constraints': {
                        readonly 'result': s_self.structure.Value_Result.O
                    }
                    readonly 'value': null
                }]
                | readonly ['linked entry', {
                    readonly 'constraints': {
                        readonly 'entry': s_self.structure.Value
                    }
                    readonly 'value': null
                }]
                | readonly ['constraint', {
                    readonly 'value':
                        | readonly ['component', {
                            readonly 'property': {
                                readonly 'constraints': {
                                    readonly 'component': s_self.structure.Value.type_.component
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Group.D
                                    readonly 'l id': string
                                }
                            }
                            readonly 'constraint': {
                                readonly 'l entry': s_self.structure.Reference_Constraints.O.D
                                readonly 'l id': string
                            }
                        }]
                        | readonly ['reference', {
                            readonly 'property': {
                                readonly 'constraints': {
                                    readonly 'reference': s_self.structure.Value.type_.reference
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Group.D
                                    readonly 'l id': string
                                }
                            }
                            readonly 'constraint': {
                                readonly 'l entry': s_self.structure.Reference_Constraints.O.D
                                readonly 'l id': string
                            }
                        }]
                    readonly 'result': s_self.structure.Value
                }]
                | readonly ['parameter', {
                    readonly 'l entry': s_self.declarations.Signature.values.D
                    readonly 'l id': string
                }]
                | readonly ['result', {
                    readonly 'value':
                        | readonly ['list', {
                            readonly 'property': {
                                readonly 'constraints': {
                                    readonly 'list': s_self.structure.Value.type_.list
                                    readonly 'result': s_self.structure.Value_Result.O
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Group.D
                                    readonly 'l id': string
                                }
                            }
                        }]
                        | readonly ['state', {
                            readonly 'property': {
                                readonly 'constraints': {
                                    readonly 'state': s_self.structure.Value.type_.state
                                    readonly 'result': s_self.structure.Value_Result.O
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Group.D
                                    readonly 'l id': string
                                }
                            }
                        }]
                        | readonly ['optional value', {
                            readonly 'property': {
                                readonly 'constraints': {
                                    readonly 'optional': s_self.structure.Value.type_.optional
                                    readonly 'result': s_self.structure.Value_Result.O
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Group.D
                                    readonly 'l id': string
                                }
                            }
                        }]
                    readonly 'result': s_self.structure.Value
                }]
            readonly 'result': s_self.structure.Value
        }
        readonly 'tail': s_self.resolver.Relative_Value_Selection
    }
    
    export namespace Guaranteed_Value_Selection {
        
        export type start = {
            readonly 'value':
                | readonly ['optional fallback', {
                    readonly 'selection': s_self.resolver.Possible_Value_Selection
                    readonly 'fallback': s_self.resolver.Guaranteed_Value_Selection
                }]
                | readonly ['sibling property', {
                    readonly 'l entry': s_self.structure.Group.D
                    readonly 'l id': string
                }]
                | readonly ['parent sibling', {
                    readonly 'l entry': s_self.structure.Group.D
                    readonly 'l id': string
                }]
                | readonly ['option constraint', {
                    readonly 'constraints': {
                        readonly 'oc': s_self.structure.Option_Constraints
                    }
                    readonly 'value': {
                        readonly 'l entry': s_self.structure.Option_Constraints.O.D
                        readonly 'l id': string
                    }
                }]
                | readonly ['sibling option constraint', {
                    readonly 'l entry': s_self.resolver.Option_Constraints.O.value.D
                    readonly 'l id': string
                }]
                | readonly ['list cursor', {
                    readonly 'constraints': {
                        readonly 'result': s_self.structure.Value_Result.O
                    }
                    readonly 'value': null
                }]
                | readonly ['linked entry', {
                    readonly 'constraints': {
                        readonly 'entry': s_self.structure.Value
                    }
                    readonly 'value': null
                }]
                | readonly ['constraint', {
                    readonly 'value':
                        | readonly ['component', {
                            readonly 'property': {
                                readonly 'constraints': {
                                    readonly 'component': s_self.structure.Value.type_.component
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Group.D
                                    readonly 'l id': string
                                }
                            }
                            readonly 'constraint': {
                                readonly 'l entry': s_self.structure.Reference_Constraints.O.D
                                readonly 'l id': string
                            }
                        }]
                        | readonly ['reference', {
                            readonly 'property': {
                                readonly 'constraints': {
                                    readonly 'reference': s_self.structure.Value.type_.reference
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Group.D
                                    readonly 'l id': string
                                }
                            }
                            readonly 'constraint': {
                                readonly 'l entry': s_self.structure.Reference_Constraints.O.D
                                readonly 'l id': string
                            }
                        }]
                    readonly 'result': s_self.structure.Value
                }]
                | readonly ['parameter', {
                    readonly 'l entry': s_self.declarations.Signature.values.D
                    readonly 'l id': string
                }]
                | readonly ['result', {
                    readonly 'value':
                        | readonly ['list', {
                            readonly 'property': {
                                readonly 'constraints': {
                                    readonly 'list': s_self.structure.Value.type_.list
                                    readonly 'result': s_self.structure.Value_Result.O
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Group.D
                                    readonly 'l id': string
                                }
                            }
                        }]
                        | readonly ['state', {
                            readonly 'property': {
                                readonly 'constraints': {
                                    readonly 'state': s_self.structure.Value.type_.state
                                    readonly 'result': s_self.structure.Value_Result.O
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Group.D
                                    readonly 'l id': string
                                }
                            }
                        }]
                        | readonly ['optional value', {
                            readonly 'property': {
                                readonly 'constraints': {
                                    readonly 'optional': s_self.structure.Value.type_.optional
                                    readonly 'result': s_self.structure.Value_Result.O
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Group.D
                                    readonly 'l id': string
                                }
                            }
                        }]
                    readonly 'result': s_self.structure.Value
                }]
            readonly 'result': s_self.structure.Value
        }
        
        export namespace start {
            
            export type value =
                | readonly ['optional fallback', {
                    readonly 'selection': s_self.resolver.Possible_Value_Selection
                    readonly 'fallback': s_self.resolver.Guaranteed_Value_Selection
                }]
                | readonly ['sibling property', {
                    readonly 'l entry': s_self.structure.Group.D
                    readonly 'l id': string
                }]
                | readonly ['parent sibling', {
                    readonly 'l entry': s_self.structure.Group.D
                    readonly 'l id': string
                }]
                | readonly ['option constraint', {
                    readonly 'constraints': {
                        readonly 'oc': s_self.structure.Option_Constraints
                    }
                    readonly 'value': {
                        readonly 'l entry': s_self.structure.Option_Constraints.O.D
                        readonly 'l id': string
                    }
                }]
                | readonly ['sibling option constraint', {
                    readonly 'l entry': s_self.resolver.Option_Constraints.O.value.D
                    readonly 'l id': string
                }]
                | readonly ['list cursor', {
                    readonly 'constraints': {
                        readonly 'result': s_self.structure.Value_Result.O
                    }
                    readonly 'value': null
                }]
                | readonly ['linked entry', {
                    readonly 'constraints': {
                        readonly 'entry': s_self.structure.Value
                    }
                    readonly 'value': null
                }]
                | readonly ['constraint', {
                    readonly 'value':
                        | readonly ['component', {
                            readonly 'property': {
                                readonly 'constraints': {
                                    readonly 'component': s_self.structure.Value.type_.component
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Group.D
                                    readonly 'l id': string
                                }
                            }
                            readonly 'constraint': {
                                readonly 'l entry': s_self.structure.Reference_Constraints.O.D
                                readonly 'l id': string
                            }
                        }]
                        | readonly ['reference', {
                            readonly 'property': {
                                readonly 'constraints': {
                                    readonly 'reference': s_self.structure.Value.type_.reference
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Group.D
                                    readonly 'l id': string
                                }
                            }
                            readonly 'constraint': {
                                readonly 'l entry': s_self.structure.Reference_Constraints.O.D
                                readonly 'l id': string
                            }
                        }]
                    readonly 'result': s_self.structure.Value
                }]
                | readonly ['parameter', {
                    readonly 'l entry': s_self.declarations.Signature.values.D
                    readonly 'l id': string
                }]
                | readonly ['result', {
                    readonly 'value':
                        | readonly ['list', {
                            readonly 'property': {
                                readonly 'constraints': {
                                    readonly 'list': s_self.structure.Value.type_.list
                                    readonly 'result': s_self.structure.Value_Result.O
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Group.D
                                    readonly 'l id': string
                                }
                            }
                        }]
                        | readonly ['state', {
                            readonly 'property': {
                                readonly 'constraints': {
                                    readonly 'state': s_self.structure.Value.type_.state
                                    readonly 'result': s_self.structure.Value_Result.O
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Group.D
                                    readonly 'l id': string
                                }
                            }
                        }]
                        | readonly ['optional value', {
                            readonly 'property': {
                                readonly 'constraints': {
                                    readonly 'optional': s_self.structure.Value.type_.optional
                                    readonly 'result': s_self.structure.Value_Result.O
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.structure.Group.D
                                    readonly 'l id': string
                                }
                            }
                        }]
                    readonly 'result': s_self.structure.Value
                }]
            
            export namespace value {
                export namespace type_ {
                    
                    export type optional_fallback = {
                        readonly 'selection': s_self.resolver.Possible_Value_Selection
                        readonly 'fallback': s_self.resolver.Guaranteed_Value_Selection
                    }
                    
                    export namespace optional_fallback {
                        
                        export type selection = s_self.resolver.Possible_Value_Selection
                        
                        export type fallback = s_self.resolver.Guaranteed_Value_Selection
                        
                    }
                    
                    export type sibling_property = {
                        readonly 'l entry': s_self.structure.Group.D
                        readonly 'l id': string
                    }
                    
                    export namespace sibling_property {
                        
                        export type l_entry = s_self.structure.Group.D
                        
                        export type l_id = string
                        
                    }
                    
                    export type parent_sibling = {
                        readonly 'l entry': s_self.structure.Group.D
                        readonly 'l id': string
                    }
                    
                    export namespace parent_sibling {
                        
                        export type l_entry = s_self.structure.Group.D
                        
                        export type l_id = string
                        
                    }
                    
                    export type option_constraint = {
                        readonly 'constraints': {
                            readonly 'oc': s_self.structure.Option_Constraints
                        }
                        readonly 'value': {
                            readonly 'l entry': s_self.structure.Option_Constraints.O.D
                            readonly 'l id': string
                        }
                    }
                    
                    export namespace option_constraint {
                        
                        export type constraints = {
                            readonly 'oc': s_self.structure.Option_Constraints
                        }
                        
                        export namespace constraints {
                            
                            export type oc = s_self.structure.Option_Constraints
                            
                        }
                        
                        export type value = {
                            readonly 'l entry': s_self.structure.Option_Constraints.O.D
                            readonly 'l id': string
                        }
                        
                        export namespace value {
                            
                            export type l_entry = s_self.structure.Option_Constraints.O.D
                            
                            export type l_id = string
                            
                        }
                        
                    }
                    
                    export type sibling_option_constraint = {
                        readonly 'l entry': s_self.resolver.Option_Constraints.O.value.D
                        readonly 'l id': string
                    }
                    
                    export namespace sibling_option_constraint {
                        
                        export type l_entry = s_self.resolver.Option_Constraints.O.value.D
                        
                        export type l_id = string
                        
                    }
                    
                    export type list_cursor = {
                        readonly 'constraints': {
                            readonly 'result': s_self.structure.Value_Result.O
                        }
                        readonly 'value': null
                    }
                    
                    export namespace list_cursor {
                        
                        export type constraints = {
                            readonly 'result': s_self.structure.Value_Result.O
                        }
                        
                        export namespace constraints {
                            
                            export type result = s_self.structure.Value_Result.O
                            
                        }
                        
                        export type value = null
                        
                    }
                    
                    export type linked_entry = {
                        readonly 'constraints': {
                            readonly 'entry': s_self.structure.Value
                        }
                        readonly 'value': null
                    }
                    
                    export namespace linked_entry {
                        
                        export type constraints = {
                            readonly 'entry': s_self.structure.Value
                        }
                        
                        export namespace constraints {
                            
                            export type entry = s_self.structure.Value
                            
                        }
                        
                        export type value = null
                        
                    }
                    
                    export type constraint = {
                        readonly 'value':
                            | readonly ['component', {
                                readonly 'property': {
                                    readonly 'constraints': {
                                        readonly 'component': s_self.structure.Value.type_.component
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Group.D
                                        readonly 'l id': string
                                    }
                                }
                                readonly 'constraint': {
                                    readonly 'l entry': s_self.structure.Reference_Constraints.O.D
                                    readonly 'l id': string
                                }
                            }]
                            | readonly ['reference', {
                                readonly 'property': {
                                    readonly 'constraints': {
                                        readonly 'reference': s_self.structure.Value.type_.reference
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Group.D
                                        readonly 'l id': string
                                    }
                                }
                                readonly 'constraint': {
                                    readonly 'l entry': s_self.structure.Reference_Constraints.O.D
                                    readonly 'l id': string
                                }
                            }]
                        readonly 'result': s_self.structure.Value
                    }
                    
                    export namespace constraint {
                        
                        export type value =
                            | readonly ['component', {
                                readonly 'property': {
                                    readonly 'constraints': {
                                        readonly 'component': s_self.structure.Value.type_.component
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Group.D
                                        readonly 'l id': string
                                    }
                                }
                                readonly 'constraint': {
                                    readonly 'l entry': s_self.structure.Reference_Constraints.O.D
                                    readonly 'l id': string
                                }
                            }]
                            | readonly ['reference', {
                                readonly 'property': {
                                    readonly 'constraints': {
                                        readonly 'reference': s_self.structure.Value.type_.reference
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Group.D
                                        readonly 'l id': string
                                    }
                                }
                                readonly 'constraint': {
                                    readonly 'l entry': s_self.structure.Reference_Constraints.O.D
                                    readonly 'l id': string
                                }
                            }]
                        
                        export namespace value {
                            export namespace type_ {
                                
                                export type component = {
                                    readonly 'property': {
                                        readonly 'constraints': {
                                            readonly 'component': s_self.structure.Value.type_.component
                                        }
                                        readonly 'value': {
                                            readonly 'l entry': s_self.structure.Group.D
                                            readonly 'l id': string
                                        }
                                    }
                                    readonly 'constraint': {
                                        readonly 'l entry': s_self.structure.Reference_Constraints.O.D
                                        readonly 'l id': string
                                    }
                                }
                                
                                export namespace component {
                                    
                                    export type property = {
                                        readonly 'constraints': {
                                            readonly 'component': s_self.structure.Value.type_.component
                                        }
                                        readonly 'value': {
                                            readonly 'l entry': s_self.structure.Group.D
                                            readonly 'l id': string
                                        }
                                    }
                                    
                                    export namespace property {
                                        
                                        export type constraints = {
                                            readonly 'component': s_self.structure.Value.type_.component
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type component = s_self.structure.Value.type_.component
                                            
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': s_self.structure.Group.D
                                            readonly 'l id': string
                                        }
                                        
                                        export namespace value {
                                            
                                            export type l_entry = s_self.structure.Group.D
                                            
                                            export type l_id = string
                                            
                                        }
                                        
                                    }
                                    
                                    export type constraint = {
                                        readonly 'l entry': s_self.structure.Reference_Constraints.O.D
                                        readonly 'l id': string
                                    }
                                    
                                    export namespace constraint {
                                        
                                        export type l_entry = s_self.structure.Reference_Constraints.O.D
                                        
                                        export type l_id = string
                                        
                                    }
                                    
                                }
                                
                                export type reference = {
                                    readonly 'property': {
                                        readonly 'constraints': {
                                            readonly 'reference': s_self.structure.Value.type_.reference
                                        }
                                        readonly 'value': {
                                            readonly 'l entry': s_self.structure.Group.D
                                            readonly 'l id': string
                                        }
                                    }
                                    readonly 'constraint': {
                                        readonly 'l entry': s_self.structure.Reference_Constraints.O.D
                                        readonly 'l id': string
                                    }
                                }
                                
                                export namespace reference {
                                    
                                    export type property = {
                                        readonly 'constraints': {
                                            readonly 'reference': s_self.structure.Value.type_.reference
                                        }
                                        readonly 'value': {
                                            readonly 'l entry': s_self.structure.Group.D
                                            readonly 'l id': string
                                        }
                                    }
                                    
                                    export namespace property {
                                        
                                        export type constraints = {
                                            readonly 'reference': s_self.structure.Value.type_.reference
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type reference = s_self.structure.Value.type_.reference
                                            
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': s_self.structure.Group.D
                                            readonly 'l id': string
                                        }
                                        
                                        export namespace value {
                                            
                                            export type l_entry = s_self.structure.Group.D
                                            
                                            export type l_id = string
                                            
                                        }
                                        
                                    }
                                    
                                    export type constraint = {
                                        readonly 'l entry': s_self.structure.Reference_Constraints.O.D
                                        readonly 'l id': string
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
                        readonly 'l entry': s_self.declarations.Signature.values.D
                        readonly 'l id': string
                    }
                    
                    export namespace parameter {
                        
                        export type l_entry = s_self.declarations.Signature.values.D
                        
                        export type l_id = string
                        
                    }
                    
                    export type result = {
                        readonly 'value':
                            | readonly ['list', {
                                readonly 'property': {
                                    readonly 'constraints': {
                                        readonly 'list': s_self.structure.Value.type_.list
                                        readonly 'result': s_self.structure.Value_Result.O
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Group.D
                                        readonly 'l id': string
                                    }
                                }
                            }]
                            | readonly ['state', {
                                readonly 'property': {
                                    readonly 'constraints': {
                                        readonly 'state': s_self.structure.Value.type_.state
                                        readonly 'result': s_self.structure.Value_Result.O
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Group.D
                                        readonly 'l id': string
                                    }
                                }
                            }]
                            | readonly ['optional value', {
                                readonly 'property': {
                                    readonly 'constraints': {
                                        readonly 'optional': s_self.structure.Value.type_.optional
                                        readonly 'result': s_self.structure.Value_Result.O
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Group.D
                                        readonly 'l id': string
                                    }
                                }
                            }]
                        readonly 'result': s_self.structure.Value
                    }
                    
                    export namespace result {
                        
                        export type value =
                            | readonly ['list', {
                                readonly 'property': {
                                    readonly 'constraints': {
                                        readonly 'list': s_self.structure.Value.type_.list
                                        readonly 'result': s_self.structure.Value_Result.O
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Group.D
                                        readonly 'l id': string
                                    }
                                }
                            }]
                            | readonly ['state', {
                                readonly 'property': {
                                    readonly 'constraints': {
                                        readonly 'state': s_self.structure.Value.type_.state
                                        readonly 'result': s_self.structure.Value_Result.O
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Group.D
                                        readonly 'l id': string
                                    }
                                }
                            }]
                            | readonly ['optional value', {
                                readonly 'property': {
                                    readonly 'constraints': {
                                        readonly 'optional': s_self.structure.Value.type_.optional
                                        readonly 'result': s_self.structure.Value_Result.O
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.structure.Group.D
                                        readonly 'l id': string
                                    }
                                }
                            }]
                        
                        export namespace value {
                            export namespace type_ {
                                
                                export type list = {
                                    readonly 'property': {
                                        readonly 'constraints': {
                                            readonly 'list': s_self.structure.Value.type_.list
                                            readonly 'result': s_self.structure.Value_Result.O
                                        }
                                        readonly 'value': {
                                            readonly 'l entry': s_self.structure.Group.D
                                            readonly 'l id': string
                                        }
                                    }
                                }
                                
                                export namespace list {
                                    
                                    export type property = {
                                        readonly 'constraints': {
                                            readonly 'list': s_self.structure.Value.type_.list
                                            readonly 'result': s_self.structure.Value_Result.O
                                        }
                                        readonly 'value': {
                                            readonly 'l entry': s_self.structure.Group.D
                                            readonly 'l id': string
                                        }
                                    }
                                    
                                    export namespace property {
                                        
                                        export type constraints = {
                                            readonly 'list': s_self.structure.Value.type_.list
                                            readonly 'result': s_self.structure.Value_Result.O
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type list = s_self.structure.Value.type_.list
                                            
                                            export type result = s_self.structure.Value_Result.O
                                            
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': s_self.structure.Group.D
                                            readonly 'l id': string
                                        }
                                        
                                        export namespace value {
                                            
                                            export type l_entry = s_self.structure.Group.D
                                            
                                            export type l_id = string
                                            
                                        }
                                        
                                    }
                                    
                                }
                                
                                export type state = {
                                    readonly 'property': {
                                        readonly 'constraints': {
                                            readonly 'state': s_self.structure.Value.type_.state
                                            readonly 'result': s_self.structure.Value_Result.O
                                        }
                                        readonly 'value': {
                                            readonly 'l entry': s_self.structure.Group.D
                                            readonly 'l id': string
                                        }
                                    }
                                }
                                
                                export namespace state {
                                    
                                    export type property = {
                                        readonly 'constraints': {
                                            readonly 'state': s_self.structure.Value.type_.state
                                            readonly 'result': s_self.structure.Value_Result.O
                                        }
                                        readonly 'value': {
                                            readonly 'l entry': s_self.structure.Group.D
                                            readonly 'l id': string
                                        }
                                    }
                                    
                                    export namespace property {
                                        
                                        export type constraints = {
                                            readonly 'state': s_self.structure.Value.type_.state
                                            readonly 'result': s_self.structure.Value_Result.O
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type state = s_self.structure.Value.type_.state
                                            
                                            export type result = s_self.structure.Value_Result.O
                                            
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': s_self.structure.Group.D
                                            readonly 'l id': string
                                        }
                                        
                                        export namespace value {
                                            
                                            export type l_entry = s_self.structure.Group.D
                                            
                                            export type l_id = string
                                            
                                        }
                                        
                                    }
                                    
                                }
                                
                                export type optional_value = {
                                    readonly 'property': {
                                        readonly 'constraints': {
                                            readonly 'optional': s_self.structure.Value.type_.optional
                                            readonly 'result': s_self.structure.Value_Result.O
                                        }
                                        readonly 'value': {
                                            readonly 'l entry': s_self.structure.Group.D
                                            readonly 'l id': string
                                        }
                                    }
                                }
                                
                                export namespace optional_value {
                                    
                                    export type property = {
                                        readonly 'constraints': {
                                            readonly 'optional': s_self.structure.Value.type_.optional
                                            readonly 'result': s_self.structure.Value_Result.O
                                        }
                                        readonly 'value': {
                                            readonly 'l entry': s_self.structure.Group.D
                                            readonly 'l id': string
                                        }
                                    }
                                    
                                    export namespace property {
                                        
                                        export type constraints = {
                                            readonly 'optional': s_self.structure.Value.type_.optional
                                            readonly 'result': s_self.structure.Value_Result.O
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type optional = s_self.structure.Value.type_.optional
                                            
                                            export type result = s_self.structure.Value_Result.O
                                            
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': s_self.structure.Group.D
                                            readonly 'l id': string
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
        readonly 'type': {
            readonly 'value':
                | readonly ['acyclic', {
                    readonly 'value':
                        | readonly ['siblings', {
                            readonly 'constraints': {
                                readonly 'cd': s_self.structure.Dictionary
                            }
                            readonly 'value': null
                        }]
                        | readonly ['resolved dictionary', {
                            readonly 'selection': {
                                readonly 'constraints': {
                                    readonly 'dictionary': s_self.structure.Value.type_.dictionary
                                }
                                readonly 'value': s_self.resolver.Guaranteed_Value_Selection
                            }
                        }]
                    readonly 'result': s_self.structure.Dictionary
                }]
                | readonly ['cyclic', {
                    readonly 'value':
                        | readonly ['siblings', {
                            readonly 'constraints': {
                                readonly 'cd': s_self.structure.Dictionary
                            }
                            readonly 'value': null
                        }]
                    readonly 'result': s_self.structure.Dictionary
                }]
                | readonly ['parameter', {
                    readonly 'l entry': s_self.declarations.Signature.lookups.D
                    readonly 'l id': string
                }]
            readonly 'result': s_self.structure.Dictionary
        }
    }
    
    export namespace Lookup_Selection {
        
        export type type_ = {
            readonly 'value':
                | readonly ['acyclic', {
                    readonly 'value':
                        | readonly ['siblings', {
                            readonly 'constraints': {
                                readonly 'cd': s_self.structure.Dictionary
                            }
                            readonly 'value': null
                        }]
                        | readonly ['resolved dictionary', {
                            readonly 'selection': {
                                readonly 'constraints': {
                                    readonly 'dictionary': s_self.structure.Value.type_.dictionary
                                }
                                readonly 'value': s_self.resolver.Guaranteed_Value_Selection
                            }
                        }]
                    readonly 'result': s_self.structure.Dictionary
                }]
                | readonly ['cyclic', {
                    readonly 'value':
                        | readonly ['siblings', {
                            readonly 'constraints': {
                                readonly 'cd': s_self.structure.Dictionary
                            }
                            readonly 'value': null
                        }]
                    readonly 'result': s_self.structure.Dictionary
                }]
                | readonly ['parameter', {
                    readonly 'l entry': s_self.declarations.Signature.lookups.D
                    readonly 'l id': string
                }]
            readonly 'result': s_self.structure.Dictionary
        }
        
        export namespace type_ {
            
            export type value =
                | readonly ['acyclic', {
                    readonly 'value':
                        | readonly ['siblings', {
                            readonly 'constraints': {
                                readonly 'cd': s_self.structure.Dictionary
                            }
                            readonly 'value': null
                        }]
                        | readonly ['resolved dictionary', {
                            readonly 'selection': {
                                readonly 'constraints': {
                                    readonly 'dictionary': s_self.structure.Value.type_.dictionary
                                }
                                readonly 'value': s_self.resolver.Guaranteed_Value_Selection
                            }
                        }]
                    readonly 'result': s_self.structure.Dictionary
                }]
                | readonly ['cyclic', {
                    readonly 'value':
                        | readonly ['siblings', {
                            readonly 'constraints': {
                                readonly 'cd': s_self.structure.Dictionary
                            }
                            readonly 'value': null
                        }]
                    readonly 'result': s_self.structure.Dictionary
                }]
                | readonly ['parameter', {
                    readonly 'l entry': s_self.declarations.Signature.lookups.D
                    readonly 'l id': string
                }]
            
            export namespace value {
                export namespace type_ {
                    
                    export type acyclic = {
                        readonly 'value':
                            | readonly ['siblings', {
                                readonly 'constraints': {
                                    readonly 'cd': s_self.structure.Dictionary
                                }
                                readonly 'value': null
                            }]
                            | readonly ['resolved dictionary', {
                                readonly 'selection': {
                                    readonly 'constraints': {
                                        readonly 'dictionary': s_self.structure.Value.type_.dictionary
                                    }
                                    readonly 'value': s_self.resolver.Guaranteed_Value_Selection
                                }
                            }]
                        readonly 'result': s_self.structure.Dictionary
                    }
                    
                    export namespace acyclic {
                        
                        export type value =
                            | readonly ['siblings', {
                                readonly 'constraints': {
                                    readonly 'cd': s_self.structure.Dictionary
                                }
                                readonly 'value': null
                            }]
                            | readonly ['resolved dictionary', {
                                readonly 'selection': {
                                    readonly 'constraints': {
                                        readonly 'dictionary': s_self.structure.Value.type_.dictionary
                                    }
                                    readonly 'value': s_self.resolver.Guaranteed_Value_Selection
                                }
                            }]
                        
                        export namespace value {
                            export namespace type_ {
                                
                                export type siblings = {
                                    readonly 'constraints': {
                                        readonly 'cd': s_self.structure.Dictionary
                                    }
                                    readonly 'value': null
                                }
                                
                                export namespace siblings {
                                    
                                    export type constraints = {
                                        readonly 'cd': s_self.structure.Dictionary
                                    }
                                    
                                    export namespace constraints {
                                        
                                        export type cd = s_self.structure.Dictionary
                                        
                                    }
                                    
                                    export type value = null
                                    
                                }
                                
                                export type resolved_dictionary = {
                                    readonly 'selection': {
                                        readonly 'constraints': {
                                            readonly 'dictionary': s_self.structure.Value.type_.dictionary
                                        }
                                        readonly 'value': s_self.resolver.Guaranteed_Value_Selection
                                    }
                                }
                                
                                export namespace resolved_dictionary {
                                    
                                    export type selection = {
                                        readonly 'constraints': {
                                            readonly 'dictionary': s_self.structure.Value.type_.dictionary
                                        }
                                        readonly 'value': s_self.resolver.Guaranteed_Value_Selection
                                    }
                                    
                                    export namespace selection {
                                        
                                        export type constraints = {
                                            readonly 'dictionary': s_self.structure.Value.type_.dictionary
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
                        readonly 'value':
                            | readonly ['siblings', {
                                readonly 'constraints': {
                                    readonly 'cd': s_self.structure.Dictionary
                                }
                                readonly 'value': null
                            }]
                        readonly 'result': s_self.structure.Dictionary
                    }
                    
                    export namespace cyclic {
                        
                        export type value =
                            | readonly ['siblings', {
                                readonly 'constraints': {
                                    readonly 'cd': s_self.structure.Dictionary
                                }
                                readonly 'value': null
                            }]
                        
                        export namespace value {
                            export namespace type_ {
                                
                                export type siblings = {
                                    readonly 'constraints': {
                                        readonly 'cd': s_self.structure.Dictionary
                                    }
                                    readonly 'value': null
                                }
                                
                                export namespace siblings {
                                    
                                    export type constraints = {
                                        readonly 'cd': s_self.structure.Dictionary
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
                        readonly 'l entry': s_self.declarations.Signature.lookups.D
                        readonly 'l id': string
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
    
    export type Reference_Constraints = p_.Optional_Value<{
        readonly 'constraints': {
            readonly 'declarations': s_self.structure.Reference_Constraints.O
        }
        readonly 'value': p_.Dictionary<{
            readonly 'benchmark': s_self.structure.Reference_Constraints.O.D
            readonly 'value': {
                readonly 'start': {
                    readonly 'value':
                        | readonly ['value', null]
                        | readonly ['sibling', {
                            readonly 'l entry': s_self.structure.Reference_Constraints.O.D
                            readonly 'l id': string
                        }]
                    readonly 'result': s_self.structure.Value
                }
                readonly 'constraint': {
                    readonly 'selection': s_self.resolver.Relative_Value_Selection
                    readonly 'type': {
                        readonly 'value':
                            | readonly ['state', {
                                readonly 'constraints': {
                                    readonly 'state': s_self.structure.Value.type_.state
                                }
                                readonly 'value': {
                                    readonly 'option': {
                                        readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                        readonly 'l id': string
                                    }
                                }
                            }]
                            | readonly ['optional value', {
                                readonly 'constraints': {
                                    readonly 'optional': s_self.structure.Value.type_.optional
                                }
                                readonly 'value': null
                            }]
                        readonly 'result': s_self.structure.Value
                    }
                }
            }
        }>
    }>
    
    export namespace Reference_Constraints {
        
        export type O = {
            readonly 'constraints': {
                readonly 'declarations': s_self.structure.Reference_Constraints.O
            }
            readonly 'value': p_.Dictionary<{
                readonly 'benchmark': s_self.structure.Reference_Constraints.O.D
                readonly 'value': {
                    readonly 'start': {
                        readonly 'value':
                            | readonly ['value', null]
                            | readonly ['sibling', {
                                readonly 'l entry': s_self.structure.Reference_Constraints.O.D
                                readonly 'l id': string
                            }]
                        readonly 'result': s_self.structure.Value
                    }
                    readonly 'constraint': {
                        readonly 'selection': s_self.resolver.Relative_Value_Selection
                        readonly 'type': {
                            readonly 'value':
                                | readonly ['state', {
                                    readonly 'constraints': {
                                        readonly 'state': s_self.structure.Value.type_.state
                                    }
                                    readonly 'value': {
                                        readonly 'option': {
                                            readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                            readonly 'l id': string
                                        }
                                    }
                                }]
                                | readonly ['optional value', {
                                    readonly 'constraints': {
                                        readonly 'optional': s_self.structure.Value.type_.optional
                                    }
                                    readonly 'value': null
                                }]
                            readonly 'result': s_self.structure.Value
                        }
                    }
                }
            }>
        }
        
        export namespace O {
            
            export type constraints = {
                readonly 'declarations': s_self.structure.Reference_Constraints.O
            }
            
            export namespace constraints {
                
                export type declarations = s_self.structure.Reference_Constraints.O
                
            }
            
            export type value = p_.Dictionary<{
                readonly 'benchmark': s_self.structure.Reference_Constraints.O.D
                readonly 'value': {
                    readonly 'start': {
                        readonly 'value':
                            | readonly ['value', null]
                            | readonly ['sibling', {
                                readonly 'l entry': s_self.structure.Reference_Constraints.O.D
                                readonly 'l id': string
                            }]
                        readonly 'result': s_self.structure.Value
                    }
                    readonly 'constraint': {
                        readonly 'selection': s_self.resolver.Relative_Value_Selection
                        readonly 'type': {
                            readonly 'value':
                                | readonly ['state', {
                                    readonly 'constraints': {
                                        readonly 'state': s_self.structure.Value.type_.state
                                    }
                                    readonly 'value': {
                                        readonly 'option': {
                                            readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                            readonly 'l id': string
                                        }
                                    }
                                }]
                                | readonly ['optional value', {
                                    readonly 'constraints': {
                                        readonly 'optional': s_self.structure.Value.type_.optional
                                    }
                                    readonly 'value': null
                                }]
                            readonly 'result': s_self.structure.Value
                        }
                    }
                }
            }>
            
            export namespace value {
                
                export type D = {
                    readonly 'benchmark': s_self.structure.Reference_Constraints.O.D
                    readonly 'value': {
                        readonly 'start': {
                            readonly 'value':
                                | readonly ['value', null]
                                | readonly ['sibling', {
                                    readonly 'l entry': s_self.structure.Reference_Constraints.O.D
                                    readonly 'l id': string
                                }]
                            readonly 'result': s_self.structure.Value
                        }
                        readonly 'constraint': {
                            readonly 'selection': s_self.resolver.Relative_Value_Selection
                            readonly 'type': {
                                readonly 'value':
                                    | readonly ['state', {
                                        readonly 'constraints': {
                                            readonly 'state': s_self.structure.Value.type_.state
                                        }
                                        readonly 'value': {
                                            readonly 'option': {
                                                readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                                readonly 'l id': string
                                            }
                                        }
                                    }]
                                    | readonly ['optional value', {
                                        readonly 'constraints': {
                                            readonly 'optional': s_self.structure.Value.type_.optional
                                        }
                                        readonly 'value': null
                                    }]
                                readonly 'result': s_self.structure.Value
                            }
                        }
                    }
                }
                
                export namespace D {
                    
                    export type benchmark = s_self.structure.Reference_Constraints.O.D
                    
                    export type value = {
                        readonly 'start': {
                            readonly 'value':
                                | readonly ['value', null]
                                | readonly ['sibling', {
                                    readonly 'l entry': s_self.structure.Reference_Constraints.O.D
                                    readonly 'l id': string
                                }]
                            readonly 'result': s_self.structure.Value
                        }
                        readonly 'constraint': {
                            readonly 'selection': s_self.resolver.Relative_Value_Selection
                            readonly 'type': {
                                readonly 'value':
                                    | readonly ['state', {
                                        readonly 'constraints': {
                                            readonly 'state': s_self.structure.Value.type_.state
                                        }
                                        readonly 'value': {
                                            readonly 'option': {
                                                readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                                readonly 'l id': string
                                            }
                                        }
                                    }]
                                    | readonly ['optional value', {
                                        readonly 'constraints': {
                                            readonly 'optional': s_self.structure.Value.type_.optional
                                        }
                                        readonly 'value': null
                                    }]
                                readonly 'result': s_self.structure.Value
                            }
                        }
                    }
                    
                    export namespace value {
                        
                        export type start = {
                            readonly 'value':
                                | readonly ['value', null]
                                | readonly ['sibling', {
                                    readonly 'l entry': s_self.structure.Reference_Constraints.O.D
                                    readonly 'l id': string
                                }]
                            readonly 'result': s_self.structure.Value
                        }
                        
                        export namespace start {
                            
                            export type value =
                                | readonly ['value', null]
                                | readonly ['sibling', {
                                    readonly 'l entry': s_self.structure.Reference_Constraints.O.D
                                    readonly 'l id': string
                                }]
                            
                            export namespace value {
                                export namespace type_ {
                                    
                                    export type value = null
                                    
                                    export type sibling = {
                                        readonly 'l entry': s_self.structure.Reference_Constraints.O.D
                                        readonly 'l id': string
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
                            readonly 'selection': s_self.resolver.Relative_Value_Selection
                            readonly 'type': {
                                readonly 'value':
                                    | readonly ['state', {
                                        readonly 'constraints': {
                                            readonly 'state': s_self.structure.Value.type_.state
                                        }
                                        readonly 'value': {
                                            readonly 'option': {
                                                readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                                readonly 'l id': string
                                            }
                                        }
                                    }]
                                    | readonly ['optional value', {
                                        readonly 'constraints': {
                                            readonly 'optional': s_self.structure.Value.type_.optional
                                        }
                                        readonly 'value': null
                                    }]
                                readonly 'result': s_self.structure.Value
                            }
                        }
                        
                        export namespace constraint {
                            
                            export type selection = s_self.resolver.Relative_Value_Selection
                            
                            export type type_ = {
                                readonly 'value':
                                    | readonly ['state', {
                                        readonly 'constraints': {
                                            readonly 'state': s_self.structure.Value.type_.state
                                        }
                                        readonly 'value': {
                                            readonly 'option': {
                                                readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                                readonly 'l id': string
                                            }
                                        }
                                    }]
                                    | readonly ['optional value', {
                                        readonly 'constraints': {
                                            readonly 'optional': s_self.structure.Value.type_.optional
                                        }
                                        readonly 'value': null
                                    }]
                                readonly 'result': s_self.structure.Value
                            }
                            
                            export namespace type_ {
                                
                                export type value =
                                    | readonly ['state', {
                                        readonly 'constraints': {
                                            readonly 'state': s_self.structure.Value.type_.state
                                        }
                                        readonly 'value': {
                                            readonly 'option': {
                                                readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                                readonly 'l id': string
                                            }
                                        }
                                    }]
                                    | readonly ['optional value', {
                                        readonly 'constraints': {
                                            readonly 'optional': s_self.structure.Value.type_.optional
                                        }
                                        readonly 'value': null
                                    }]
                                
                                export namespace value {
                                    export namespace type_ {
                                        
                                        export type state = {
                                            readonly 'constraints': {
                                                readonly 'state': s_self.structure.Value.type_.state
                                            }
                                            readonly 'value': {
                                                readonly 'option': {
                                                    readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                                    readonly 'l id': string
                                                }
                                            }
                                        }
                                        
                                        export namespace state {
                                            
                                            export type constraints = {
                                                readonly 'state': s_self.structure.Value.type_.state
                                            }
                                            
                                            export namespace constraints {
                                                
                                                export type state = s_self.structure.Value.type_.state
                                                
                                            }
                                            
                                            export type value = {
                                                readonly 'option': {
                                                    readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                                    readonly 'l id': string
                                                }
                                            }
                                            
                                            export namespace value {
                                                
                                                export type option = {
                                                    readonly 'l entry': s_self.structure.Value.type_.state.options.D
                                                    readonly 'l id': string
                                                }
                                                
                                                export namespace option {
                                                    
                                                    export type l_entry = s_self.structure.Value.type_.state.options.D
                                                    
                                                    export type l_id = string
                                                    
                                                }
                                                
                                            }
                                            
                                        }
                                        
                                        export type optional_value = {
                                            readonly 'constraints': {
                                                readonly 'optional': s_self.structure.Value.type_.optional
                                            }
                                            readonly 'value': null
                                        }
                                        
                                        export namespace optional_value {
                                            
                                            export type constraints = {
                                                readonly 'optional': s_self.structure.Value.type_.optional
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
    
    export type Result_Selection =
        | readonly ['context', s_self.resolver.Guaranteed_Value_Selection]
        | readonly ['value', s_self.resolver.Relative_Value_Selection]
    
    export namespace Result_Selection {
        export namespace type_ {
            
            export type context = s_self.resolver.Guaranteed_Value_Selection
            
            export type value = s_self.resolver.Relative_Value_Selection
            
        }
        
    }
    
    export type Value =
        | readonly ['component', {
            readonly 'constraints': {
                readonly 'definition': s_self.structure.Value.type_.component
            }
            readonly 'value': {
                readonly 'location': {
                    readonly 'value':
                        | readonly ['local', {
                            readonly 'l entry': s_self.declarations.Declarations.D
                            readonly 'l id': string
                        }]
                        | readonly ['child namespace', {
                            readonly 'namespace': {
                                readonly 'l entry': s_self.declarations.Namespaces.D
                                readonly 'l id': string
                            }
                            readonly 'resolver': {
                                readonly 'constraints': {
                                    readonly 'public': s_self.structure.Type.visibility.type_.public_
                                }
                                readonly 'value': {
                                    readonly 'l entry': s_self.declarations.Declarations.D
                                    readonly 'l id': string
                                }
                            }
                        }]
                        | readonly ['sibling namespace', {
                            readonly 'constraints': {
                                readonly 'declarations': s_self.declarations.Namespaces
                            }
                            readonly 'value': {
                                readonly 'namespace': {
                                    readonly 'l entry': s_self.declarations.Namespaces.D
                                    readonly 'l id': string
                                }
                                readonly 'resolver': {
                                    readonly 'constraints': {
                                        readonly 'public': s_self.structure.Type.visibility.type_.public_
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.declarations.Declarations.D
                                        readonly 'l id': string
                                    }
                                }
                            }
                        }]
                    readonly 'result': s_self.declarations.Declarations.D
                }
                readonly 'arguments': p_.Optional_Value<{
                    readonly 'types': p_.Optional_Value<p_.Dictionary<{
                        readonly 'benchmark': s_self.declarations.Signature.values.D
                        readonly 'value':
                            | readonly ['optional', 
                                | readonly ['not set', null]
                                | readonly ['set', s_self.resolver.Guaranteed_Value_Selection]
                                | readonly ['selection', s_self.resolver.Possible_Value_Selection]
                            ]
                            | readonly ['required', s_self.resolver.Guaranteed_Value_Selection]
                            | readonly ['parameter', {
                                readonly 'l entry': s_self.declarations.Signature.values.D
                                readonly 'l id': string
                            }]
                    }>>
                    readonly 'lookups': p_.Optional_Value<p_.Dictionary<{
                        readonly 'benchmark': s_self.declarations.Signature.lookups.D
                        readonly 'value':
                            | readonly ['acyclic', null]
                            | readonly ['cyclic', null]
                            | readonly ['selection', s_self.resolver.Lookup_Selection]
                    }>>
                }>
                readonly 'constraints': s_self.resolver.Reference_Constraints
            }
        }]
        | readonly ['dictionary', {
            readonly 'constraints': {
                readonly 'definition': s_self.structure.Value.type_.dictionary
            }
            readonly 'value': {
                readonly 'resolver': s_self.resolver.Value
                readonly 'benchmark': p_.Optional_Value<{
                    readonly 'constraints': {
                        readonly 'benchmark': s_self.structure.Dictionary.benchmark.O
                    }
                    readonly 'value': {
                        readonly 'selection': {
                            readonly 'constraints': {
                                readonly 'dictionary': s_self.structure.Value.type_.dictionary
                            }
                            readonly 'value': s_self.resolver.Guaranteed_Value_Selection
                        }
                        readonly 'coverage':
                            | readonly ['dense', null]
                            | readonly ['sparse', null]
                    }
                }>
            }
        }]
        | readonly ['group', {
            readonly 'constraints': {
                readonly 'definition': s_self.structure.Value.type_.group
            }
            readonly 'value': p_.Dictionary<{
                readonly 'benchmark': s_self.structure.Group.D
                readonly 'value': {
                    readonly 'resolver': s_self.resolver.Value
                }
            }>
        }]
        | readonly ['list', {
            readonly 'constraints': {
                readonly 'definition': s_self.structure.Value.type_.list
            }
            readonly 'value': {
                readonly 'resolver': s_self.resolver.Value
                readonly 'result': p_.Optional_Value<{
                    readonly 'constraints': {
                        readonly 'definition': s_self.structure.Value.type_.list
                        readonly 'result': s_self.structure.Value_Result.O
                    }
                    readonly 'value': {
                        readonly 'initial': s_self.resolver.Guaranteed_Value_Selection
                        readonly 'next': s_self.resolver.Result_Selection
                    }
                }>
            }
        }]
        | readonly ['nothing', {
            readonly 'constraints': {
                readonly 'definition': s_self.structure.Value.type_.nothing
            }
            readonly 'value': null
        }]
        | readonly ['simple', {
            readonly 'constraints': {
                readonly 'definition': s_self.structure.Value.type_.simple.value
            }
            readonly 'value': null
        }]
        | readonly ['optional', {
            readonly 'constraints': {
                readonly 'definition': s_self.structure.Value.type_.optional
            }
            readonly 'value': {
                readonly 'presence': p_.Optional_Value<s_self.resolver.Possible_Value_Selection>
                readonly 'constraints': s_self.resolver.Option_Constraints
                readonly 'resolver': s_self.resolver.Value
                readonly 'not set constraints': p_.Optional_Value<p_.Dictionary<s_self.resolver.Possible_Value_Selection>>
                readonly 'result': p_.Optional_Value<{
                    readonly 'constraints': {
                        readonly 'definition': s_self.structure.Value.type_.optional
                        readonly 'result': s_self.structure.Value_Result.O
                    }
                    readonly 'value': s_self.resolver.Result_Selection
                }>
            }
        }]
        | readonly ['reference', {
            readonly 'constraints': {
                readonly 'definition': s_self.structure.Value.type_.reference
            }
            readonly 'value': {
                readonly 'type': {
                    readonly 'lookup': s_self.resolver.Lookup_Selection
                    readonly 'constraints': s_self.resolver.Reference_Constraints
                }
            }
        }]
        | readonly ['state', {
            readonly 'constraints': {
                readonly 'definition': s_self.structure.Value.type_.state
            }
            readonly 'value': {
                readonly 'options': p_.Dictionary<{
                    readonly 'benchmark': s_self.structure.Value.type_.state.options.D
                    readonly 'value': {
                        readonly 'constraints': s_self.resolver.Option_Constraints
                        readonly 'resolver': s_self.resolver.Value
                        readonly 'result': p_.Optional_Value<s_self.resolver.Result_Selection>
                    }
                }>
            }
        }]
    
    export namespace Value {
        export namespace type_ {
            
            export type component = {
                readonly 'constraints': {
                    readonly 'definition': s_self.structure.Value.type_.component
                }
                readonly 'value': {
                    readonly 'location': {
                        readonly 'value':
                            | readonly ['local', {
                                readonly 'l entry': s_self.declarations.Declarations.D
                                readonly 'l id': string
                            }]
                            | readonly ['child namespace', {
                                readonly 'namespace': {
                                    readonly 'l entry': s_self.declarations.Namespaces.D
                                    readonly 'l id': string
                                }
                                readonly 'resolver': {
                                    readonly 'constraints': {
                                        readonly 'public': s_self.structure.Type.visibility.type_.public_
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.declarations.Declarations.D
                                        readonly 'l id': string
                                    }
                                }
                            }]
                            | readonly ['sibling namespace', {
                                readonly 'constraints': {
                                    readonly 'declarations': s_self.declarations.Namespaces
                                }
                                readonly 'value': {
                                    readonly 'namespace': {
                                        readonly 'l entry': s_self.declarations.Namespaces.D
                                        readonly 'l id': string
                                    }
                                    readonly 'resolver': {
                                        readonly 'constraints': {
                                            readonly 'public': s_self.structure.Type.visibility.type_.public_
                                        }
                                        readonly 'value': {
                                            readonly 'l entry': s_self.declarations.Declarations.D
                                            readonly 'l id': string
                                        }
                                    }
                                }
                            }]
                        readonly 'result': s_self.declarations.Declarations.D
                    }
                    readonly 'arguments': p_.Optional_Value<{
                        readonly 'types': p_.Optional_Value<p_.Dictionary<{
                            readonly 'benchmark': s_self.declarations.Signature.values.D
                            readonly 'value':
                                | readonly ['optional', 
                                    | readonly ['not set', null]
                                    | readonly ['set', s_self.resolver.Guaranteed_Value_Selection]
                                    | readonly ['selection', s_self.resolver.Possible_Value_Selection]
                                ]
                                | readonly ['required', s_self.resolver.Guaranteed_Value_Selection]
                                | readonly ['parameter', {
                                    readonly 'l entry': s_self.declarations.Signature.values.D
                                    readonly 'l id': string
                                }]
                        }>>
                        readonly 'lookups': p_.Optional_Value<p_.Dictionary<{
                            readonly 'benchmark': s_self.declarations.Signature.lookups.D
                            readonly 'value':
                                | readonly ['acyclic', null]
                                | readonly ['cyclic', null]
                                | readonly ['selection', s_self.resolver.Lookup_Selection]
                        }>>
                    }>
                    readonly 'constraints': s_self.resolver.Reference_Constraints
                }
            }
            
            export namespace component {
                
                export type constraints = {
                    readonly 'definition': s_self.structure.Value.type_.component
                }
                
                export namespace constraints {
                    
                    export type definition = s_self.structure.Value.type_.component
                    
                }
                
                export type value = {
                    readonly 'location': {
                        readonly 'value':
                            | readonly ['local', {
                                readonly 'l entry': s_self.declarations.Declarations.D
                                readonly 'l id': string
                            }]
                            | readonly ['child namespace', {
                                readonly 'namespace': {
                                    readonly 'l entry': s_self.declarations.Namespaces.D
                                    readonly 'l id': string
                                }
                                readonly 'resolver': {
                                    readonly 'constraints': {
                                        readonly 'public': s_self.structure.Type.visibility.type_.public_
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.declarations.Declarations.D
                                        readonly 'l id': string
                                    }
                                }
                            }]
                            | readonly ['sibling namespace', {
                                readonly 'constraints': {
                                    readonly 'declarations': s_self.declarations.Namespaces
                                }
                                readonly 'value': {
                                    readonly 'namespace': {
                                        readonly 'l entry': s_self.declarations.Namespaces.D
                                        readonly 'l id': string
                                    }
                                    readonly 'resolver': {
                                        readonly 'constraints': {
                                            readonly 'public': s_self.structure.Type.visibility.type_.public_
                                        }
                                        readonly 'value': {
                                            readonly 'l entry': s_self.declarations.Declarations.D
                                            readonly 'l id': string
                                        }
                                    }
                                }
                            }]
                        readonly 'result': s_self.declarations.Declarations.D
                    }
                    readonly 'arguments': p_.Optional_Value<{
                        readonly 'types': p_.Optional_Value<p_.Dictionary<{
                            readonly 'benchmark': s_self.declarations.Signature.values.D
                            readonly 'value':
                                | readonly ['optional', 
                                    | readonly ['not set', null]
                                    | readonly ['set', s_self.resolver.Guaranteed_Value_Selection]
                                    | readonly ['selection', s_self.resolver.Possible_Value_Selection]
                                ]
                                | readonly ['required', s_self.resolver.Guaranteed_Value_Selection]
                                | readonly ['parameter', {
                                    readonly 'l entry': s_self.declarations.Signature.values.D
                                    readonly 'l id': string
                                }]
                        }>>
                        readonly 'lookups': p_.Optional_Value<p_.Dictionary<{
                            readonly 'benchmark': s_self.declarations.Signature.lookups.D
                            readonly 'value':
                                | readonly ['acyclic', null]
                                | readonly ['cyclic', null]
                                | readonly ['selection', s_self.resolver.Lookup_Selection]
                        }>>
                    }>
                    readonly 'constraints': s_self.resolver.Reference_Constraints
                }
                
                export namespace value {
                    
                    export type location = {
                        readonly 'value':
                            | readonly ['local', {
                                readonly 'l entry': s_self.declarations.Declarations.D
                                readonly 'l id': string
                            }]
                            | readonly ['child namespace', {
                                readonly 'namespace': {
                                    readonly 'l entry': s_self.declarations.Namespaces.D
                                    readonly 'l id': string
                                }
                                readonly 'resolver': {
                                    readonly 'constraints': {
                                        readonly 'public': s_self.structure.Type.visibility.type_.public_
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.declarations.Declarations.D
                                        readonly 'l id': string
                                    }
                                }
                            }]
                            | readonly ['sibling namespace', {
                                readonly 'constraints': {
                                    readonly 'declarations': s_self.declarations.Namespaces
                                }
                                readonly 'value': {
                                    readonly 'namespace': {
                                        readonly 'l entry': s_self.declarations.Namespaces.D
                                        readonly 'l id': string
                                    }
                                    readonly 'resolver': {
                                        readonly 'constraints': {
                                            readonly 'public': s_self.structure.Type.visibility.type_.public_
                                        }
                                        readonly 'value': {
                                            readonly 'l entry': s_self.declarations.Declarations.D
                                            readonly 'l id': string
                                        }
                                    }
                                }
                            }]
                        readonly 'result': s_self.declarations.Declarations.D
                    }
                    
                    export namespace location {
                        
                        export type value =
                            | readonly ['local', {
                                readonly 'l entry': s_self.declarations.Declarations.D
                                readonly 'l id': string
                            }]
                            | readonly ['child namespace', {
                                readonly 'namespace': {
                                    readonly 'l entry': s_self.declarations.Namespaces.D
                                    readonly 'l id': string
                                }
                                readonly 'resolver': {
                                    readonly 'constraints': {
                                        readonly 'public': s_self.structure.Type.visibility.type_.public_
                                    }
                                    readonly 'value': {
                                        readonly 'l entry': s_self.declarations.Declarations.D
                                        readonly 'l id': string
                                    }
                                }
                            }]
                            | readonly ['sibling namespace', {
                                readonly 'constraints': {
                                    readonly 'declarations': s_self.declarations.Namespaces
                                }
                                readonly 'value': {
                                    readonly 'namespace': {
                                        readonly 'l entry': s_self.declarations.Namespaces.D
                                        readonly 'l id': string
                                    }
                                    readonly 'resolver': {
                                        readonly 'constraints': {
                                            readonly 'public': s_self.structure.Type.visibility.type_.public_
                                        }
                                        readonly 'value': {
                                            readonly 'l entry': s_self.declarations.Declarations.D
                                            readonly 'l id': string
                                        }
                                    }
                                }
                            }]
                        
                        export namespace value {
                            export namespace type_ {
                                
                                export type local = {
                                    readonly 'l entry': s_self.declarations.Declarations.D
                                    readonly 'l id': string
                                }
                                
                                export namespace local {
                                    
                                    export type l_entry = s_self.declarations.Declarations.D
                                    
                                    export type l_id = string
                                    
                                }
                                
                                export type child_namespace = {
                                    readonly 'namespace': {
                                        readonly 'l entry': s_self.declarations.Namespaces.D
                                        readonly 'l id': string
                                    }
                                    readonly 'resolver': {
                                        readonly 'constraints': {
                                            readonly 'public': s_self.structure.Type.visibility.type_.public_
                                        }
                                        readonly 'value': {
                                            readonly 'l entry': s_self.declarations.Declarations.D
                                            readonly 'l id': string
                                        }
                                    }
                                }
                                
                                export namespace child_namespace {
                                    
                                    export type namespace = {
                                        readonly 'l entry': s_self.declarations.Namespaces.D
                                        readonly 'l id': string
                                    }
                                    
                                    export namespace namespace {
                                        
                                        export type l_entry = s_self.declarations.Namespaces.D
                                        
                                        export type l_id = string
                                        
                                    }
                                    
                                    export type resolver = {
                                        readonly 'constraints': {
                                            readonly 'public': s_self.structure.Type.visibility.type_.public_
                                        }
                                        readonly 'value': {
                                            readonly 'l entry': s_self.declarations.Declarations.D
                                            readonly 'l id': string
                                        }
                                    }
                                    
                                    export namespace resolver {
                                        
                                        export type constraints = {
                                            readonly 'public': s_self.structure.Type.visibility.type_.public_
                                        }
                                        
                                        export namespace constraints {
                                            
                                            export type public_ = s_self.structure.Type.visibility.type_.public_
                                            
                                        }
                                        
                                        export type value = {
                                            readonly 'l entry': s_self.declarations.Declarations.D
                                            readonly 'l id': string
                                        }
                                        
                                        export namespace value {
                                            
                                            export type l_entry = s_self.declarations.Declarations.D
                                            
                                            export type l_id = string
                                            
                                        }
                                        
                                    }
                                    
                                }
                                
                                export type sibling_namespace = {
                                    readonly 'constraints': {
                                        readonly 'declarations': s_self.declarations.Namespaces
                                    }
                                    readonly 'value': {
                                        readonly 'namespace': {
                                            readonly 'l entry': s_self.declarations.Namespaces.D
                                            readonly 'l id': string
                                        }
                                        readonly 'resolver': {
                                            readonly 'constraints': {
                                                readonly 'public': s_self.structure.Type.visibility.type_.public_
                                            }
                                            readonly 'value': {
                                                readonly 'l entry': s_self.declarations.Declarations.D
                                                readonly 'l id': string
                                            }
                                        }
                                    }
                                }
                                
                                export namespace sibling_namespace {
                                    
                                    export type constraints = {
                                        readonly 'declarations': s_self.declarations.Namespaces
                                    }
                                    
                                    export namespace constraints {
                                        
                                        export type declarations = s_self.declarations.Namespaces
                                        
                                    }
                                    
                                    export type value = {
                                        readonly 'namespace': {
                                            readonly 'l entry': s_self.declarations.Namespaces.D
                                            readonly 'l id': string
                                        }
                                        readonly 'resolver': {
                                            readonly 'constraints': {
                                                readonly 'public': s_self.structure.Type.visibility.type_.public_
                                            }
                                            readonly 'value': {
                                                readonly 'l entry': s_self.declarations.Declarations.D
                                                readonly 'l id': string
                                            }
                                        }
                                    }
                                    
                                    export namespace value {
                                        
                                        export type namespace = {
                                            readonly 'l entry': s_self.declarations.Namespaces.D
                                            readonly 'l id': string
                                        }
                                        
                                        export namespace namespace {
                                            
                                            export type l_entry = s_self.declarations.Namespaces.D
                                            
                                            export type l_id = string
                                            
                                        }
                                        
                                        export type resolver = {
                                            readonly 'constraints': {
                                                readonly 'public': s_self.structure.Type.visibility.type_.public_
                                            }
                                            readonly 'value': {
                                                readonly 'l entry': s_self.declarations.Declarations.D
                                                readonly 'l id': string
                                            }
                                        }
                                        
                                        export namespace resolver {
                                            
                                            export type constraints = {
                                                readonly 'public': s_self.structure.Type.visibility.type_.public_
                                            }
                                            
                                            export namespace constraints {
                                                
                                                export type public_ = s_self.structure.Type.visibility.type_.public_
                                                
                                            }
                                            
                                            export type value = {
                                                readonly 'l entry': s_self.declarations.Declarations.D
                                                readonly 'l id': string
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
                    
                    export type arguments_ = p_.Optional_Value<{
                        readonly 'types': p_.Optional_Value<p_.Dictionary<{
                            readonly 'benchmark': s_self.declarations.Signature.values.D
                            readonly 'value':
                                | readonly ['optional', 
                                    | readonly ['not set', null]
                                    | readonly ['set', s_self.resolver.Guaranteed_Value_Selection]
                                    | readonly ['selection', s_self.resolver.Possible_Value_Selection]
                                ]
                                | readonly ['required', s_self.resolver.Guaranteed_Value_Selection]
                                | readonly ['parameter', {
                                    readonly 'l entry': s_self.declarations.Signature.values.D
                                    readonly 'l id': string
                                }]
                        }>>
                        readonly 'lookups': p_.Optional_Value<p_.Dictionary<{
                            readonly 'benchmark': s_self.declarations.Signature.lookups.D
                            readonly 'value':
                                | readonly ['acyclic', null]
                                | readonly ['cyclic', null]
                                | readonly ['selection', s_self.resolver.Lookup_Selection]
                        }>>
                    }>
                    
                    export namespace arguments_ {
                        
                        export type O = {
                            readonly 'types': p_.Optional_Value<p_.Dictionary<{
                                readonly 'benchmark': s_self.declarations.Signature.values.D
                                readonly 'value':
                                    | readonly ['optional', 
                                        | readonly ['not set', null]
                                        | readonly ['set', s_self.resolver.Guaranteed_Value_Selection]
                                        | readonly ['selection', s_self.resolver.Possible_Value_Selection]
                                    ]
                                    | readonly ['required', s_self.resolver.Guaranteed_Value_Selection]
                                    | readonly ['parameter', {
                                        readonly 'l entry': s_self.declarations.Signature.values.D
                                        readonly 'l id': string
                                    }]
                            }>>
                            readonly 'lookups': p_.Optional_Value<p_.Dictionary<{
                                readonly 'benchmark': s_self.declarations.Signature.lookups.D
                                readonly 'value':
                                    | readonly ['acyclic', null]
                                    | readonly ['cyclic', null]
                                    | readonly ['selection', s_self.resolver.Lookup_Selection]
                            }>>
                        }
                        
                        export namespace O {
                            
                            export type types = p_.Optional_Value<p_.Dictionary<{
                                readonly 'benchmark': s_self.declarations.Signature.values.D
                                readonly 'value':
                                    | readonly ['optional', 
                                        | readonly ['not set', null]
                                        | readonly ['set', s_self.resolver.Guaranteed_Value_Selection]
                                        | readonly ['selection', s_self.resolver.Possible_Value_Selection]
                                    ]
                                    | readonly ['required', s_self.resolver.Guaranteed_Value_Selection]
                                    | readonly ['parameter', {
                                        readonly 'l entry': s_self.declarations.Signature.values.D
                                        readonly 'l id': string
                                    }]
                            }>>
                            
                            export namespace types {
                                
                                export type O = p_.Dictionary<{
                                    readonly 'benchmark': s_self.declarations.Signature.values.D
                                    readonly 'value':
                                        | readonly ['optional', 
                                            | readonly ['not set', null]
                                            | readonly ['set', s_self.resolver.Guaranteed_Value_Selection]
                                            | readonly ['selection', s_self.resolver.Possible_Value_Selection]
                                        ]
                                        | readonly ['required', s_self.resolver.Guaranteed_Value_Selection]
                                        | readonly ['parameter', {
                                            readonly 'l entry': s_self.declarations.Signature.values.D
                                            readonly 'l id': string
                                        }]
                                }>
                                
                                export namespace O {
                                    
                                    export type D = {
                                        readonly 'benchmark': s_self.declarations.Signature.values.D
                                        readonly 'value':
                                            | readonly ['optional', 
                                                | readonly ['not set', null]
                                                | readonly ['set', s_self.resolver.Guaranteed_Value_Selection]
                                                | readonly ['selection', s_self.resolver.Possible_Value_Selection]
                                            ]
                                            | readonly ['required', s_self.resolver.Guaranteed_Value_Selection]
                                            | readonly ['parameter', {
                                                readonly 'l entry': s_self.declarations.Signature.values.D
                                                readonly 'l id': string
                                            }]
                                    }
                                    
                                    export namespace D {
                                        
                                        export type benchmark = s_self.declarations.Signature.values.D
                                        
                                        export type value =
                                            | readonly ['optional', 
                                                | readonly ['not set', null]
                                                | readonly ['set', s_self.resolver.Guaranteed_Value_Selection]
                                                | readonly ['selection', s_self.resolver.Possible_Value_Selection]
                                            ]
                                            | readonly ['required', s_self.resolver.Guaranteed_Value_Selection]
                                            | readonly ['parameter', {
                                                readonly 'l entry': s_self.declarations.Signature.values.D
                                                readonly 'l id': string
                                            }]
                                        
                                        export namespace value {
                                            export namespace type_ {
                                                
                                                export type optional =
                                                    | readonly ['not set', null]
                                                    | readonly ['set', s_self.resolver.Guaranteed_Value_Selection]
                                                    | readonly ['selection', s_self.resolver.Possible_Value_Selection]
                                                
                                                export namespace optional {
                                                    export namespace type_ {
                                                        
                                                        export type not_set = null
                                                        
                                                        export type set_ = s_self.resolver.Guaranteed_Value_Selection
                                                        
                                                        export type selection = s_self.resolver.Possible_Value_Selection
                                                        
                                                    }
                                                    
                                                }
                                                
                                                export type required = s_self.resolver.Guaranteed_Value_Selection
                                                
                                                export type parameter = {
                                                    readonly 'l entry': s_self.declarations.Signature.values.D
                                                    readonly 'l id': string
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
                            
                            export type lookups = p_.Optional_Value<p_.Dictionary<{
                                readonly 'benchmark': s_self.declarations.Signature.lookups.D
                                readonly 'value':
                                    | readonly ['acyclic', null]
                                    | readonly ['cyclic', null]
                                    | readonly ['selection', s_self.resolver.Lookup_Selection]
                            }>>
                            
                            export namespace lookups {
                                
                                export type O = p_.Dictionary<{
                                    readonly 'benchmark': s_self.declarations.Signature.lookups.D
                                    readonly 'value':
                                        | readonly ['acyclic', null]
                                        | readonly ['cyclic', null]
                                        | readonly ['selection', s_self.resolver.Lookup_Selection]
                                }>
                                
                                export namespace O {
                                    
                                    export type D = {
                                        readonly 'benchmark': s_self.declarations.Signature.lookups.D
                                        readonly 'value':
                                            | readonly ['acyclic', null]
                                            | readonly ['cyclic', null]
                                            | readonly ['selection', s_self.resolver.Lookup_Selection]
                                    }
                                    
                                    export namespace D {
                                        
                                        export type benchmark = s_self.declarations.Signature.lookups.D
                                        
                                        export type value =
                                            | readonly ['acyclic', null]
                                            | readonly ['cyclic', null]
                                            | readonly ['selection', s_self.resolver.Lookup_Selection]
                                        
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
                readonly 'constraints': {
                    readonly 'definition': s_self.structure.Value.type_.dictionary
                }
                readonly 'value': {
                    readonly 'resolver': s_self.resolver.Value
                    readonly 'benchmark': p_.Optional_Value<{
                        readonly 'constraints': {
                            readonly 'benchmark': s_self.structure.Dictionary.benchmark.O
                        }
                        readonly 'value': {
                            readonly 'selection': {
                                readonly 'constraints': {
                                    readonly 'dictionary': s_self.structure.Value.type_.dictionary
                                }
                                readonly 'value': s_self.resolver.Guaranteed_Value_Selection
                            }
                            readonly 'coverage':
                                | readonly ['dense', null]
                                | readonly ['sparse', null]
                        }
                    }>
                }
            }
            
            export namespace dictionary {
                
                export type constraints = {
                    readonly 'definition': s_self.structure.Value.type_.dictionary
                }
                
                export namespace constraints {
                    
                    export type definition = s_self.structure.Value.type_.dictionary
                    
                }
                
                export type value = {
                    readonly 'resolver': s_self.resolver.Value
                    readonly 'benchmark': p_.Optional_Value<{
                        readonly 'constraints': {
                            readonly 'benchmark': s_self.structure.Dictionary.benchmark.O
                        }
                        readonly 'value': {
                            readonly 'selection': {
                                readonly 'constraints': {
                                    readonly 'dictionary': s_self.structure.Value.type_.dictionary
                                }
                                readonly 'value': s_self.resolver.Guaranteed_Value_Selection
                            }
                            readonly 'coverage':
                                | readonly ['dense', null]
                                | readonly ['sparse', null]
                        }
                    }>
                }
                
                export namespace value {
                    
                    export type resolver = s_self.resolver.Value
                    
                    export type benchmark = p_.Optional_Value<{
                        readonly 'constraints': {
                            readonly 'benchmark': s_self.structure.Dictionary.benchmark.O
                        }
                        readonly 'value': {
                            readonly 'selection': {
                                readonly 'constraints': {
                                    readonly 'dictionary': s_self.structure.Value.type_.dictionary
                                }
                                readonly 'value': s_self.resolver.Guaranteed_Value_Selection
                            }
                            readonly 'coverage':
                                | readonly ['dense', null]
                                | readonly ['sparse', null]
                        }
                    }>
                    
                    export namespace benchmark {
                        
                        export type O = {
                            readonly 'constraints': {
                                readonly 'benchmark': s_self.structure.Dictionary.benchmark.O
                            }
                            readonly 'value': {
                                readonly 'selection': {
                                    readonly 'constraints': {
                                        readonly 'dictionary': s_self.structure.Value.type_.dictionary
                                    }
                                    readonly 'value': s_self.resolver.Guaranteed_Value_Selection
                                }
                                readonly 'coverage':
                                    | readonly ['dense', null]
                                    | readonly ['sparse', null]
                            }
                        }
                        
                        export namespace O {
                            
                            export type constraints = {
                                readonly 'benchmark': s_self.structure.Dictionary.benchmark.O
                            }
                            
                            export namespace constraints {
                                
                                export type benchmark = s_self.structure.Dictionary.benchmark.O
                                
                            }
                            
                            export type value = {
                                readonly 'selection': {
                                    readonly 'constraints': {
                                        readonly 'dictionary': s_self.structure.Value.type_.dictionary
                                    }
                                    readonly 'value': s_self.resolver.Guaranteed_Value_Selection
                                }
                                readonly 'coverage':
                                    | readonly ['dense', null]
                                    | readonly ['sparse', null]
                            }
                            
                            export namespace value {
                                
                                export type selection = {
                                    readonly 'constraints': {
                                        readonly 'dictionary': s_self.structure.Value.type_.dictionary
                                    }
                                    readonly 'value': s_self.resolver.Guaranteed_Value_Selection
                                }
                                
                                export namespace selection {
                                    
                                    export type constraints = {
                                        readonly 'dictionary': s_self.structure.Value.type_.dictionary
                                    }
                                    
                                    export namespace constraints {
                                        
                                        export type dictionary = s_self.structure.Value.type_.dictionary
                                        
                                    }
                                    
                                    export type value = s_self.resolver.Guaranteed_Value_Selection
                                    
                                }
                                
                                export type coverage =
                                    | readonly ['dense', null]
                                    | readonly ['sparse', null]
                                
                                export namespace coverage {
                                    export namespace type_ {
                                        
                                        export type dense = null
                                        
                                        export type sparse = null
                                        
                                    }
                                    
                                }
                                
                            }
                            
                        }
                        
                    }
                    
                }
                
            }
            
            export type group = {
                readonly 'constraints': {
                    readonly 'definition': s_self.structure.Value.type_.group
                }
                readonly 'value': p_.Dictionary<{
                    readonly 'benchmark': s_self.structure.Group.D
                    readonly 'value': {
                        readonly 'resolver': s_self.resolver.Value
                    }
                }>
            }
            
            export namespace group {
                
                export type constraints = {
                    readonly 'definition': s_self.structure.Value.type_.group
                }
                
                export namespace constraints {
                    
                    export type definition = s_self.structure.Value.type_.group
                    
                }
                
                export type value = p_.Dictionary<{
                    readonly 'benchmark': s_self.structure.Group.D
                    readonly 'value': {
                        readonly 'resolver': s_self.resolver.Value
                    }
                }>
                
                export namespace value {
                    
                    export type D = {
                        readonly 'benchmark': s_self.structure.Group.D
                        readonly 'value': {
                            readonly 'resolver': s_self.resolver.Value
                        }
                    }
                    
                    export namespace D {
                        
                        export type benchmark = s_self.structure.Group.D
                        
                        export type value = {
                            readonly 'resolver': s_self.resolver.Value
                        }
                        
                        export namespace value {
                            
                            export type resolver = s_self.resolver.Value
                            
                        }
                        
                    }
                    
                }
                
            }
            
            export type list = {
                readonly 'constraints': {
                    readonly 'definition': s_self.structure.Value.type_.list
                }
                readonly 'value': {
                    readonly 'resolver': s_self.resolver.Value
                    readonly 'result': p_.Optional_Value<{
                        readonly 'constraints': {
                            readonly 'definition': s_self.structure.Value.type_.list
                            readonly 'result': s_self.structure.Value_Result.O
                        }
                        readonly 'value': {
                            readonly 'initial': s_self.resolver.Guaranteed_Value_Selection
                            readonly 'next': s_self.resolver.Result_Selection
                        }
                    }>
                }
            }
            
            export namespace list {
                
                export type constraints = {
                    readonly 'definition': s_self.structure.Value.type_.list
                }
                
                export namespace constraints {
                    
                    export type definition = s_self.structure.Value.type_.list
                    
                }
                
                export type value = {
                    readonly 'resolver': s_self.resolver.Value
                    readonly 'result': p_.Optional_Value<{
                        readonly 'constraints': {
                            readonly 'definition': s_self.structure.Value.type_.list
                            readonly 'result': s_self.structure.Value_Result.O
                        }
                        readonly 'value': {
                            readonly 'initial': s_self.resolver.Guaranteed_Value_Selection
                            readonly 'next': s_self.resolver.Result_Selection
                        }
                    }>
                }
                
                export namespace value {
                    
                    export type resolver = s_self.resolver.Value
                    
                    export type result = p_.Optional_Value<{
                        readonly 'constraints': {
                            readonly 'definition': s_self.structure.Value.type_.list
                            readonly 'result': s_self.structure.Value_Result.O
                        }
                        readonly 'value': {
                            readonly 'initial': s_self.resolver.Guaranteed_Value_Selection
                            readonly 'next': s_self.resolver.Result_Selection
                        }
                    }>
                    
                    export namespace result {
                        
                        export type O = {
                            readonly 'constraints': {
                                readonly 'definition': s_self.structure.Value.type_.list
                                readonly 'result': s_self.structure.Value_Result.O
                            }
                            readonly 'value': {
                                readonly 'initial': s_self.resolver.Guaranteed_Value_Selection
                                readonly 'next': s_self.resolver.Result_Selection
                            }
                        }
                        
                        export namespace O {
                            
                            export type constraints = {
                                readonly 'definition': s_self.structure.Value.type_.list
                                readonly 'result': s_self.structure.Value_Result.O
                            }
                            
                            export namespace constraints {
                                
                                export type definition = s_self.structure.Value.type_.list
                                
                                export type result = s_self.structure.Value_Result.O
                                
                            }
                            
                            export type value = {
                                readonly 'initial': s_self.resolver.Guaranteed_Value_Selection
                                readonly 'next': s_self.resolver.Result_Selection
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
                readonly 'constraints': {
                    readonly 'definition': s_self.structure.Value.type_.nothing
                }
                readonly 'value': null
            }
            
            export namespace nothing {
                
                export type constraints = {
                    readonly 'definition': s_self.structure.Value.type_.nothing
                }
                
                export namespace constraints {
                    
                    export type definition = s_self.structure.Value.type_.nothing
                    
                }
                
                export type value = null
                
            }
            
            export type simple = {
                readonly 'constraints': {
                    readonly 'definition': s_self.structure.Value.type_.simple.value
                }
                readonly 'value': null
            }
            
            export namespace simple {
                
                export type constraints = {
                    readonly 'definition': s_self.structure.Value.type_.simple.value
                }
                
                export namespace constraints {
                    
                    export type definition = s_self.structure.Value.type_.simple.value
                    
                }
                
                export type value = null
                
            }
            
            export type optional = {
                readonly 'constraints': {
                    readonly 'definition': s_self.structure.Value.type_.optional
                }
                readonly 'value': {
                    readonly 'presence': p_.Optional_Value<s_self.resolver.Possible_Value_Selection>
                    readonly 'constraints': s_self.resolver.Option_Constraints
                    readonly 'resolver': s_self.resolver.Value
                    readonly 'not set constraints': p_.Optional_Value<p_.Dictionary<s_self.resolver.Possible_Value_Selection>>
                    readonly 'result': p_.Optional_Value<{
                        readonly 'constraints': {
                            readonly 'definition': s_self.structure.Value.type_.optional
                            readonly 'result': s_self.structure.Value_Result.O
                        }
                        readonly 'value': s_self.resolver.Result_Selection
                    }>
                }
            }
            
            export namespace optional {
                
                export type constraints = {
                    readonly 'definition': s_self.structure.Value.type_.optional
                }
                
                export namespace constraints {
                    
                    export type definition = s_self.structure.Value.type_.optional
                    
                }
                
                export type value = {
                    readonly 'presence': p_.Optional_Value<s_self.resolver.Possible_Value_Selection>
                    readonly 'constraints': s_self.resolver.Option_Constraints
                    readonly 'resolver': s_self.resolver.Value
                    readonly 'not set constraints': p_.Optional_Value<p_.Dictionary<s_self.resolver.Possible_Value_Selection>>
                    readonly 'result': p_.Optional_Value<{
                        readonly 'constraints': {
                            readonly 'definition': s_self.structure.Value.type_.optional
                            readonly 'result': s_self.structure.Value_Result.O
                        }
                        readonly 'value': s_self.resolver.Result_Selection
                    }>
                }
                
                export namespace value {
                    
                    export type presence = p_.Optional_Value<s_self.resolver.Possible_Value_Selection>
                    
                    export namespace presence {
                        
                        export type O = s_self.resolver.Possible_Value_Selection
                        
                    }
                    
                    export type constraints = s_self.resolver.Option_Constraints
                    
                    export type resolver = s_self.resolver.Value
                    
                    export type not_set_constraints = p_.Optional_Value<p_.Dictionary<s_self.resolver.Possible_Value_Selection>>
                    
                    export namespace not_set_constraints {
                        
                        export type O = p_.Dictionary<s_self.resolver.Possible_Value_Selection>
                        
                        export namespace O {
                            
                            export type D = s_self.resolver.Possible_Value_Selection
                            
                        }
                        
                    }
                    
                    export type result = p_.Optional_Value<{
                        readonly 'constraints': {
                            readonly 'definition': s_self.structure.Value.type_.optional
                            readonly 'result': s_self.structure.Value_Result.O
                        }
                        readonly 'value': s_self.resolver.Result_Selection
                    }>
                    
                    export namespace result {
                        
                        export type O = {
                            readonly 'constraints': {
                                readonly 'definition': s_self.structure.Value.type_.optional
                                readonly 'result': s_self.structure.Value_Result.O
                            }
                            readonly 'value': s_self.resolver.Result_Selection
                        }
                        
                        export namespace O {
                            
                            export type constraints = {
                                readonly 'definition': s_self.structure.Value.type_.optional
                                readonly 'result': s_self.structure.Value_Result.O
                            }
                            
                            export namespace constraints {
                                
                                export type definition = s_self.structure.Value.type_.optional
                                
                                export type result = s_self.structure.Value_Result.O
                                
                            }
                            
                            export type value = s_self.resolver.Result_Selection
                            
                        }
                        
                    }
                    
                }
                
            }
            
            export type reference = {
                readonly 'constraints': {
                    readonly 'definition': s_self.structure.Value.type_.reference
                }
                readonly 'value': {
                    readonly 'type': {
                        readonly 'lookup': s_self.resolver.Lookup_Selection
                        readonly 'constraints': s_self.resolver.Reference_Constraints
                    }
                }
            }
            
            export namespace reference {
                
                export type constraints = {
                    readonly 'definition': s_self.structure.Value.type_.reference
                }
                
                export namespace constraints {
                    
                    export type definition = s_self.structure.Value.type_.reference
                    
                }
                
                export type value = {
                    readonly 'type': {
                        readonly 'lookup': s_self.resolver.Lookup_Selection
                        readonly 'constraints': s_self.resolver.Reference_Constraints
                    }
                }
                
                export namespace value {
                    
                    export type type_ = {
                        readonly 'lookup': s_self.resolver.Lookup_Selection
                        readonly 'constraints': s_self.resolver.Reference_Constraints
                    }
                    
                    export namespace type_ {
                        
                        export type lookup = s_self.resolver.Lookup_Selection
                        
                        export type constraints = s_self.resolver.Reference_Constraints
                        
                    }
                    
                }
                
            }
            
            export type state = {
                readonly 'constraints': {
                    readonly 'definition': s_self.structure.Value.type_.state
                }
                readonly 'value': {
                    readonly 'options': p_.Dictionary<{
                        readonly 'benchmark': s_self.structure.Value.type_.state.options.D
                        readonly 'value': {
                            readonly 'constraints': s_self.resolver.Option_Constraints
                            readonly 'resolver': s_self.resolver.Value
                            readonly 'result': p_.Optional_Value<s_self.resolver.Result_Selection>
                        }
                    }>
                }
            }
            
            export namespace state {
                
                export type constraints = {
                    readonly 'definition': s_self.structure.Value.type_.state
                }
                
                export namespace constraints {
                    
                    export type definition = s_self.structure.Value.type_.state
                    
                }
                
                export type value = {
                    readonly 'options': p_.Dictionary<{
                        readonly 'benchmark': s_self.structure.Value.type_.state.options.D
                        readonly 'value': {
                            readonly 'constraints': s_self.resolver.Option_Constraints
                            readonly 'resolver': s_self.resolver.Value
                            readonly 'result': p_.Optional_Value<s_self.resolver.Result_Selection>
                        }
                    }>
                }
                
                export namespace value {
                    
                    export type options = p_.Dictionary<{
                        readonly 'benchmark': s_self.structure.Value.type_.state.options.D
                        readonly 'value': {
                            readonly 'constraints': s_self.resolver.Option_Constraints
                            readonly 'resolver': s_self.resolver.Value
                            readonly 'result': p_.Optional_Value<s_self.resolver.Result_Selection>
                        }
                    }>
                    
                    export namespace options {
                        
                        export type D = {
                            readonly 'benchmark': s_self.structure.Value.type_.state.options.D
                            readonly 'value': {
                                readonly 'constraints': s_self.resolver.Option_Constraints
                                readonly 'resolver': s_self.resolver.Value
                                readonly 'result': p_.Optional_Value<s_self.resolver.Result_Selection>
                            }
                        }
                        
                        export namespace D {
                            
                            export type benchmark = s_self.structure.Value.type_.state.options.D
                            
                            export type value = {
                                readonly 'constraints': s_self.resolver.Option_Constraints
                                readonly 'resolver': s_self.resolver.Value
                                readonly 'result': p_.Optional_Value<s_self.resolver.Result_Selection>
                            }
                            
                            export namespace value {
                                
                                export type constraints = s_self.resolver.Option_Constraints
                                
                                export type resolver = s_self.resolver.Value
                                
                                export type result = p_.Optional_Value<s_self.resolver.Result_Selection>
                                
                                export namespace result {
                                    
                                    export type O = s_self.resolver.Result_Selection
                                    
                                }
                                
                            }
                            
                        }
                        
                    }
                    
                }
                
            }
            
        }
        
    }
    
    export type Resolver = {
        readonly 'namespaces': p_.Dictionary<{
            readonly 'benchmark': s_self.declarations.Namespaces.D
            readonly 'value': s_self.resolver.Resolver
        }>
        readonly 'types': p_.Dictionary<{
            readonly 'benchmark': s_self.declarations.Declarations.D
            readonly 'value': {
                readonly 'root value resolver': s_self.resolver.Value
            }
        }>
    }
    
    export namespace Resolver {
        
        export type namespaces = p_.Dictionary<{
            readonly 'benchmark': s_self.declarations.Namespaces.D
            readonly 'value': s_self.resolver.Resolver
        }>
        
        export namespace namespaces {
            
            export type D = {
                readonly 'benchmark': s_self.declarations.Namespaces.D
                readonly 'value': s_self.resolver.Resolver
            }
            
            export namespace D {
                
                export type benchmark = s_self.declarations.Namespaces.D
                
                export type value = s_self.resolver.Resolver
                
            }
            
        }
        
        export type types = p_.Dictionary<{
            readonly 'benchmark': s_self.declarations.Declarations.D
            readonly 'value': {
                readonly 'root value resolver': s_self.resolver.Value
            }
        }>
        
        export namespace types {
            
            export type D = {
                readonly 'benchmark': s_self.declarations.Declarations.D
                readonly 'value': {
                    readonly 'root value resolver': s_self.resolver.Value
                }
            }
            
            export namespace D {
                
                export type benchmark = s_self.declarations.Declarations.D
                
                export type value = {
                    readonly 'root value resolver': s_self.resolver.Value
                }
                
                export namespace value {
                    
                    export type root_value_resolver = s_self.resolver.Value
                    
                }
                
            }
            
        }
        
    }
    
}
