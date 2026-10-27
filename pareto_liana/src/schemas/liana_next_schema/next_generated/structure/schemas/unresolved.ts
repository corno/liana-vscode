import type * as p_ from 'pareto-core/schema'

import type * as s_self from "./unresolved.js"

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
        readonly 'type': string
    }]
    | readonly ['directory', s_self.Directory]

export namespace Node {
    export namespace type_ {
        
        export type file = {
            readonly 'file extension': string
            readonly 'type': string
        }
        
        export namespace file {
            
            export type file_extension = string
            
            export type type_ = string
            
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
                    | readonly ['local', string]
                    | readonly ['child namespace', {
                        readonly 'namespace': string
                        readonly 'type': string
                    }]
                    | readonly ['sibling namespace', {
                        readonly 'namespace': string
                        readonly 'type': string
                    }]
                ]
                | readonly ['navigable', 
                    | readonly ['local', string]
                    | readonly ['child namespace', {
                        readonly 'namespace': string
                        readonly 'type': string
                    }]
                    | readonly ['sibling namespace', {
                        readonly 'namespace': string
                        readonly 'type': string
                    }]
                ]
            readonly 'constraints': s_self.structure.Reference_Constraints
        }]
        | readonly ['dictionary', s_self.structure.Dictionary]
        | readonly ['group', s_self.structure.Group]
        | readonly ['list', {
            readonly 'value': s_self.structure.Value
            readonly 'result': s_self.structure.Value_Result
        }]
        | readonly ['nothing', null]
        | readonly ['simple', string]
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
                        | readonly ['local', string]
                        | readonly ['child namespace', {
                            readonly 'namespace': string
                            readonly 'type': string
                        }]
                        | readonly ['sibling namespace', {
                            readonly 'namespace': string
                            readonly 'type': string
                        }]
                    ]
                    | readonly ['navigable', 
                        | readonly ['local', string]
                        | readonly ['child namespace', {
                            readonly 'namespace': string
                            readonly 'type': string
                        }]
                        | readonly ['sibling namespace', {
                            readonly 'namespace': string
                            readonly 'type': string
                        }]
                    ]
                readonly 'constraints': s_self.structure.Reference_Constraints
            }
            
            export namespace component {
                
                export type type_ =
                    | readonly ['simple', 
                        | readonly ['local', string]
                        | readonly ['child namespace', {
                            readonly 'namespace': string
                            readonly 'type': string
                        }]
                        | readonly ['sibling namespace', {
                            readonly 'namespace': string
                            readonly 'type': string
                        }]
                    ]
                    | readonly ['navigable', 
                        | readonly ['local', string]
                        | readonly ['child namespace', {
                            readonly 'namespace': string
                            readonly 'type': string
                        }]
                        | readonly ['sibling namespace', {
                            readonly 'namespace': string
                            readonly 'type': string
                        }]
                    ]
                
                export namespace type_ {
                    export namespace type_ {
                        
                        export type simple =
                            | readonly ['local', string]
                            | readonly ['child namespace', {
                                readonly 'namespace': string
                                readonly 'type': string
                            }]
                            | readonly ['sibling namespace', {
                                readonly 'namespace': string
                                readonly 'type': string
                            }]
                        
                        export namespace simple {
                            export namespace type_ {
                                
                                export type local = string
                                
                                export type child_namespace = {
                                    readonly 'namespace': string
                                    readonly 'type': string
                                }
                                
                                export namespace child_namespace {
                                    
                                    export type namespace = string
                                    
                                    export type type_ = string
                                    
                                }
                                
                                export type sibling_namespace = {
                                    readonly 'namespace': string
                                    readonly 'type': string
                                }
                                
                                export namespace sibling_namespace {
                                    
                                    export type namespace = string
                                    
                                    export type type_ = string
                                    
                                }
                                
                            }
                            
                        }
                        
                        export type navigable =
                            | readonly ['local', string]
                            | readonly ['child namespace', {
                                readonly 'namespace': string
                                readonly 'type': string
                            }]
                            | readonly ['sibling namespace', {
                                readonly 'namespace': string
                                readonly 'type': string
                            }]
                        
                        export namespace navigable {
                            export namespace type_ {
                                
                                export type local = string
                                
                                export type child_namespace = {
                                    readonly 'namespace': string
                                    readonly 'type': string
                                }
                                
                                export namespace child_namespace {
                                    
                                    export type namespace = string
                                    
                                    export type type_ = string
                                    
                                }
                                
                                export type sibling_namespace = {
                                    readonly 'namespace': string
                                    readonly 'type': string
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
                readonly 'value': s_self.structure.Value
                readonly 'result': s_self.structure.Value_Result
            }
            
            export namespace list {
                
                export type value = s_self.structure.Value
                
                export type result = s_self.structure.Value_Result
                
            }
            
            export type nothing = null
            
            export type simple = string
            
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
        readonly 'benchmark': p_.Optional_Value<s_self.structure.Value_Reference>
        readonly 'value': s_self.structure.Value
    }
    
    export namespace Dictionary {
        
        export type benchmark = p_.Optional_Value<s_self.structure.Value_Reference>
        
        export namespace benchmark {
            
            export type O = s_self.structure.Value_Reference
            
        }
        
        export type value = s_self.structure.Value
        
    }
    
    export type Value_Reference = {
        readonly 'type': {
            readonly 'location':
                | readonly ['local', string]
                | readonly ['child namespace', {
                    readonly 'namespace': string
                    readonly 'type': string
                }]
                | readonly ['sibling namespace', {
                    readonly 'namespace': string
                    readonly 'type': string
                }]
        }
        readonly 'path': {
            readonly 'tail': p_.List<
                | readonly ['benchmark', null]
                | readonly ['dictionary', null]
                | readonly ['group', string]
                | readonly ['list', null]
                | readonly ['optional', null]
                | readonly ['state', string]
            >
        }
    }
    
    export namespace Value_Reference {
        
        export type type_ = {
            readonly 'location':
                | readonly ['local', string]
                | readonly ['child namespace', {
                    readonly 'namespace': string
                    readonly 'type': string
                }]
                | readonly ['sibling namespace', {
                    readonly 'namespace': string
                    readonly 'type': string
                }]
        }
        
        export namespace type_ {
            
            export type location =
                | readonly ['local', string]
                | readonly ['child namespace', {
                    readonly 'namespace': string
                    readonly 'type': string
                }]
                | readonly ['sibling namespace', {
                    readonly 'namespace': string
                    readonly 'type': string
                }]
            
            export namespace location {
                export namespace type_ {
                    
                    export type local = string
                    
                    export type child_namespace = {
                        readonly 'namespace': string
                        readonly 'type': string
                    }
                    
                    export namespace child_namespace {
                        
                        export type namespace = string
                        
                        export type type_ = string
                        
                    }
                    
                    export type sibling_namespace = {
                        readonly 'namespace': string
                        readonly 'type': string
                    }
                    
                    export namespace sibling_namespace {
                        
                        export type namespace = string
                        
                        export type type_ = string
                        
                    }
                    
                }
                
            }
            
        }
        
        export type path = {
            readonly 'tail': p_.List<
                | readonly ['benchmark', null]
                | readonly ['dictionary', null]
                | readonly ['group', string]
                | readonly ['list', null]
                | readonly ['optional', null]
                | readonly ['state', string]
            >
        }
        
        export namespace path {
            
            export type tail = p_.List<
                | readonly ['benchmark', null]
                | readonly ['dictionary', null]
                | readonly ['group', string]
                | readonly ['list', null]
                | readonly ['optional', null]
                | readonly ['state', string]
            >
            
            export namespace tail {
                
                export type L =
                    | readonly ['benchmark', null]
                    | readonly ['dictionary', null]
                    | readonly ['group', string]
                    | readonly ['list', null]
                    | readonly ['optional', null]
                    | readonly ['state', string]
                
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
    
    export type Option_Constraints = p_.Optional_Value<p_.Dictionary<s_self.structure.Value_Reference>>
    
    export namespace Option_Constraints {
        
        export type O = p_.Dictionary<s_self.structure.Value_Reference>
        
        export namespace O {
            
            export type D = s_self.structure.Value_Reference
            
        }
        
    }
    
    export type Reference = {
        readonly 'referent': s_self.structure.Value_Reference
        readonly 'type': {
            readonly 'dependency':
                | readonly ['acyclic', null]
                | readonly ['cyclic', null]
            readonly 'constraints': s_self.structure.Reference_Constraints
        }
    }
    
    export namespace Reference {
        
        export type referent = s_self.structure.Value_Reference
        
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
            readonly 'location':
                | readonly ['local', string]
                | readonly ['child namespace', {
                    readonly 'namespace': string
                    readonly 'type': string
                }]
                | readonly ['sibling namespace', {
                    readonly 'namespace': string
                    readonly 'type': string
                }]
        }
        readonly 'subselection': {
            readonly 'tail': p_.List<
                | readonly ['dictionary', null]
                | readonly ['group', string]
                | readonly ['list', null]
                | readonly ['optional', null]
                | readonly ['state', string]
            >
        }
    }
    
    export namespace Signature_Value_Reference {
        
        export type type_ = {
            readonly 'location':
                | readonly ['local', string]
                | readonly ['child namespace', {
                    readonly 'namespace': string
                    readonly 'type': string
                }]
                | readonly ['sibling namespace', {
                    readonly 'namespace': string
                    readonly 'type': string
                }]
        }
        
        export namespace type_ {
            
            export type location =
                | readonly ['local', string]
                | readonly ['child namespace', {
                    readonly 'namespace': string
                    readonly 'type': string
                }]
                | readonly ['sibling namespace', {
                    readonly 'namespace': string
                    readonly 'type': string
                }]
            
            export namespace location {
                export namespace type_ {
                    
                    export type local = string
                    
                    export type child_namespace = {
                        readonly 'namespace': string
                        readonly 'type': string
                    }
                    
                    export namespace child_namespace {
                        
                        export type namespace = string
                        
                        export type type_ = string
                        
                    }
                    
                    export type sibling_namespace = {
                        readonly 'namespace': string
                        readonly 'type': string
                    }
                    
                    export namespace sibling_namespace {
                        
                        export type namespace = string
                        
                        export type type_ = string
                        
                    }
                    
                }
                
            }
            
        }
        
        export type subselection = {
            readonly 'tail': p_.List<
                | readonly ['dictionary', null]
                | readonly ['group', string]
                | readonly ['list', null]
                | readonly ['optional', null]
                | readonly ['state', string]
            >
        }
        
        export namespace subselection {
            
            export type tail = p_.List<
                | readonly ['dictionary', null]
                | readonly ['group', string]
                | readonly ['list', null]
                | readonly ['optional', null]
                | readonly ['state', string]
            >
            
            export namespace tail {
                
                export type L =
                    | readonly ['dictionary', null]
                    | readonly ['group', string]
                    | readonly ['list', null]
                    | readonly ['optional', null]
                    | readonly ['state', string]
                
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
        readonly 'values': p_.Dictionary<{
            readonly 'value': s_self.declarations.Signature_Value_Reference
            readonly 'presence': s_self.declarations.Presence
        }>
        readonly 'lookups': p_.Dictionary<{
            readonly 'referent': s_self.declarations.Signature_Value_Reference
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
            readonly 'referent': s_self.declarations.Signature_Value_Reference
            readonly 'type':
                | readonly ['cyclic', null]
                | readonly ['acyclic', null]
            readonly 'presence': s_self.declarations.Presence
        }>
        
        export namespace lookups {
            
            export type D = {
                readonly 'referent': s_self.declarations.Signature_Value_Reference
                readonly 'type':
                    | readonly ['cyclic', null]
                    | readonly ['acyclic', null]
                readonly 'presence': s_self.declarations.Presence
            }
            
            export namespace D {
                
                export type referent = s_self.declarations.Signature_Value_Reference
                
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
    
    export type Declarations = p_.Dictionary<s_self.declarations.Declaration>
    
    export namespace Declarations {
        
        export type D = s_self.declarations.Declaration
        
    }
    
    export type Declaration = {
        readonly 'signature':
            | readonly ['local', s_self.declarations.Signature]
            | readonly ['same as', string]
    }
    
    export namespace Declaration {
        
        export type signature =
            | readonly ['local', s_self.declarations.Signature]
            | readonly ['same as', string]
        
        export namespace signature {
            export namespace type_ {
                
                export type local = s_self.declarations.Signature
                
                export type same_as = string
                
            }
            
        }
        
    }
    
    export type Namespaces = p_.Dictionary<s_self.declarations.Declaration_Namespace>
    
    export namespace Namespaces {
        
        export type D = s_self.declarations.Declaration_Namespace
        
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
            readonly 'location':
                | readonly ['local', string]
                | readonly ['child namespace', {
                    readonly 'namespace': string
                    readonly 'type': string
                }]
                | readonly ['sibling namespace', {
                    readonly 'namespace': string
                    readonly 'type': string
                }]
        }
        readonly 'path': {
            readonly 'tail': p_.List<
                | readonly ['dictionary', null]
                | readonly ['group', string]
                | readonly ['list', null]
                | readonly ['optional', null]
                | readonly ['state', string]
            >
        }
    }
    
    export namespace Value_Reference {
        
        export type type_ = {
            readonly 'location':
                | readonly ['local', string]
                | readonly ['child namespace', {
                    readonly 'namespace': string
                    readonly 'type': string
                }]
                | readonly ['sibling namespace', {
                    readonly 'namespace': string
                    readonly 'type': string
                }]
        }
        
        export namespace type_ {
            
            export type location =
                | readonly ['local', string]
                | readonly ['child namespace', {
                    readonly 'namespace': string
                    readonly 'type': string
                }]
                | readonly ['sibling namespace', {
                    readonly 'namespace': string
                    readonly 'type': string
                }]
            
            export namespace location {
                export namespace type_ {
                    
                    export type local = string
                    
                    export type child_namespace = {
                        readonly 'namespace': string
                        readonly 'type': string
                    }
                    
                    export namespace child_namespace {
                        
                        export type namespace = string
                        
                        export type type_ = string
                        
                    }
                    
                    export type sibling_namespace = {
                        readonly 'namespace': string
                        readonly 'type': string
                    }
                    
                    export namespace sibling_namespace {
                        
                        export type namespace = string
                        
                        export type type_ = string
                        
                    }
                    
                }
                
            }
            
        }
        
        export type path = {
            readonly 'tail': p_.List<
                | readonly ['dictionary', null]
                | readonly ['group', string]
                | readonly ['list', null]
                | readonly ['optional', null]
                | readonly ['state', string]
            >
        }
        
        export namespace path {
            
            export type tail = p_.List<
                | readonly ['dictionary', null]
                | readonly ['group', string]
                | readonly ['list', null]
                | readonly ['optional', null]
                | readonly ['state', string]
            >
            
            export namespace tail {
                
                export type L =
                    | readonly ['dictionary', null]
                    | readonly ['group', string]
                    | readonly ['list', null]
                    | readonly ['optional', null]
                    | readonly ['state', string]
                
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
        | readonly ['local', string]
        | readonly ['child namespace', {
            readonly 'namespace': string
            readonly 'type': string
        }]
        | readonly ['sibling namespace', {
            readonly 'namespace': string
            readonly 'type': string
        }]
    
    export namespace Simple_Component_Selection {
        export namespace type_ {
            
            export type local = string
            
            export type child_namespace = {
                readonly 'namespace': string
                readonly 'type': string
            }
            
            export namespace child_namespace {
                
                export type namespace = string
                
                export type type_ = string
                
            }
            
            export type sibling_namespace = {
                readonly 'namespace': string
                readonly 'type': string
            }
            
            export namespace sibling_namespace {
                
                export type namespace = string
                
                export type type_ = string
                
            }
            
        }
        
    }
    
    export type Relative_Value_Selection = {
        readonly 'path': p_.List<
            | readonly ['benchmark link', s_self.resolver.Value_Reference]
            | readonly ['simple component', s_self.resolver.Simple_Component_Selection]
            | readonly ['component constraint', {
                readonly 'name': string
                readonly 'target': s_self.resolver.Value_Reference
            }]
            | readonly ['navigable component', null]
            | readonly ['group', string]
            | readonly ['list result', null]
            | readonly ['option constraint', {
                readonly 'option': string
                readonly 'constraint': string
            }]
            | readonly ['optional', null]
            | readonly ['optional value constraint', string]
            | readonly ['reference constraint', string]
            | readonly ['reference', null]
            | readonly ['state result', null]
        >
    }
    
    export namespace Relative_Value_Selection {
        
        export type path = p_.List<
            | readonly ['benchmark link', s_self.resolver.Value_Reference]
            | readonly ['simple component', s_self.resolver.Simple_Component_Selection]
            | readonly ['component constraint', {
                readonly 'name': string
                readonly 'target': s_self.resolver.Value_Reference
            }]
            | readonly ['navigable component', null]
            | readonly ['group', string]
            | readonly ['list result', null]
            | readonly ['option constraint', {
                readonly 'option': string
                readonly 'constraint': string
            }]
            | readonly ['optional', null]
            | readonly ['optional value constraint', string]
            | readonly ['reference constraint', string]
            | readonly ['reference', null]
            | readonly ['state result', null]
        >
        
        export namespace path {
            
            export type L =
                | readonly ['benchmark link', s_self.resolver.Value_Reference]
                | readonly ['simple component', s_self.resolver.Simple_Component_Selection]
                | readonly ['component constraint', {
                    readonly 'name': string
                    readonly 'target': s_self.resolver.Value_Reference
                }]
                | readonly ['navigable component', null]
                | readonly ['group', string]
                | readonly ['list result', null]
                | readonly ['option constraint', {
                    readonly 'option': string
                    readonly 'constraint': string
                }]
                | readonly ['optional', null]
                | readonly ['optional value constraint', string]
                | readonly ['reference constraint', string]
                | readonly ['reference', null]
                | readonly ['state result', null]
            
            export namespace L {
                export namespace type_ {
                    
                    export type benchmark_link = s_self.resolver.Value_Reference
                    
                    export type simple_component = s_self.resolver.Simple_Component_Selection
                    
                    export type component_constraint = {
                        readonly 'name': string
                        readonly 'target': s_self.resolver.Value_Reference
                    }
                    
                    export namespace component_constraint {
                        
                        export type name = string
                        
                        export type target = s_self.resolver.Value_Reference
                        
                    }
                    
                    export type navigable_component = null
                    
                    export type group = string
                    
                    export type list_result = null
                    
                    export type option_constraint = {
                        readonly 'option': string
                        readonly 'constraint': string
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
        | readonly ['optional value', {
            readonly 'selection': s_self.resolver.Guaranteed_Value_Selection
            readonly 'tail': s_self.resolver.Relative_Value_Selection
        }]
        | readonly ['parameter', string]
        | readonly ['result', 
            | readonly ['state', {
                readonly 'property': string
            }]
            | readonly ['optional value', {
                readonly 'property': string
            }]
        ]
    
    export namespace Possible_Value_Selection {
        export namespace type_ {
            
            export type optional_value = {
                readonly 'selection': s_self.resolver.Guaranteed_Value_Selection
                readonly 'tail': s_self.resolver.Relative_Value_Selection
            }
            
            export namespace optional_value {
                
                export type selection = s_self.resolver.Guaranteed_Value_Selection
                
                export type tail = s_self.resolver.Relative_Value_Selection
                
            }
            
            export type parameter = string
            
            export type result =
                | readonly ['state', {
                    readonly 'property': string
                }]
                | readonly ['optional value', {
                    readonly 'property': string
                }]
            
            export namespace result {
                export namespace type_ {
                    
                    export type state = {
                        readonly 'property': string
                    }
                    
                    export namespace state {
                        
                        export type property = string
                        
                    }
                    
                    export type optional_value = {
                        readonly 'property': string
                    }
                    
                    export namespace optional_value {
                        
                        export type property = string
                        
                    }
                    
                }
                
            }
            
        }
        
    }
    
    export type Option_Constraints = p_.Optional_Value<p_.Dictionary<
        | readonly ['state', {
            readonly 'selection': s_self.resolver.Guaranteed_Value_Selection
            readonly 'option': string
        }]
        | readonly ['assert is set', s_self.resolver.Possible_Value_Selection]
    >>
    
    export namespace Option_Constraints {
        
        export type O = p_.Dictionary<
            | readonly ['state', {
                readonly 'selection': s_self.resolver.Guaranteed_Value_Selection
                readonly 'option': string
            }]
            | readonly ['assert is set', s_self.resolver.Possible_Value_Selection]
        >
        
        export namespace O {
            
            export type D =
                | readonly ['state', {
                    readonly 'selection': s_self.resolver.Guaranteed_Value_Selection
                    readonly 'option': string
                }]
                | readonly ['assert is set', s_self.resolver.Possible_Value_Selection]
            
            export namespace D {
                export namespace type_ {
                    
                    export type state = {
                        readonly 'selection': s_self.resolver.Guaranteed_Value_Selection
                        readonly 'option': string
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
        readonly 'start':
            | readonly ['optional fallback', {
                readonly 'selection': s_self.resolver.Possible_Value_Selection
                readonly 'fallback': s_self.resolver.Guaranteed_Value_Selection
            }]
            | readonly ['sibling property', string]
            | readonly ['parent sibling', string]
            | readonly ['option constraint', string]
            | readonly ['sibling option constraint', string]
            | readonly ['list cursor', null]
            | readonly ['linked entry', null]
            | readonly ['constraint', 
                | readonly ['component', {
                    readonly 'property': string
                    readonly 'constraint': string
                }]
                | readonly ['reference', {
                    readonly 'property': string
                    readonly 'constraint': string
                }]
            ]
            | readonly ['parameter', string]
            | readonly ['result', 
                | readonly ['list', {
                    readonly 'property': string
                }]
                | readonly ['state', {
                    readonly 'property': string
                }]
                | readonly ['optional value', {
                    readonly 'property': string
                }]
            ]
        readonly 'tail': s_self.resolver.Relative_Value_Selection
    }
    
    export namespace Guaranteed_Value_Selection {
        
        export type start =
            | readonly ['optional fallback', {
                readonly 'selection': s_self.resolver.Possible_Value_Selection
                readonly 'fallback': s_self.resolver.Guaranteed_Value_Selection
            }]
            | readonly ['sibling property', string]
            | readonly ['parent sibling', string]
            | readonly ['option constraint', string]
            | readonly ['sibling option constraint', string]
            | readonly ['list cursor', null]
            | readonly ['linked entry', null]
            | readonly ['constraint', 
                | readonly ['component', {
                    readonly 'property': string
                    readonly 'constraint': string
                }]
                | readonly ['reference', {
                    readonly 'property': string
                    readonly 'constraint': string
                }]
            ]
            | readonly ['parameter', string]
            | readonly ['result', 
                | readonly ['list', {
                    readonly 'property': string
                }]
                | readonly ['state', {
                    readonly 'property': string
                }]
                | readonly ['optional value', {
                    readonly 'property': string
                }]
            ]
        
        export namespace start {
            export namespace type_ {
                
                export type optional_fallback = {
                    readonly 'selection': s_self.resolver.Possible_Value_Selection
                    readonly 'fallback': s_self.resolver.Guaranteed_Value_Selection
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
                    | readonly ['component', {
                        readonly 'property': string
                        readonly 'constraint': string
                    }]
                    | readonly ['reference', {
                        readonly 'property': string
                        readonly 'constraint': string
                    }]
                
                export namespace constraint {
                    export namespace type_ {
                        
                        export type component = {
                            readonly 'property': string
                            readonly 'constraint': string
                        }
                        
                        export namespace component {
                            
                            export type property = string
                            
                            export type constraint = string
                            
                        }
                        
                        export type reference = {
                            readonly 'property': string
                            readonly 'constraint': string
                        }
                        
                        export namespace reference {
                            
                            export type property = string
                            
                            export type constraint = string
                            
                        }
                        
                    }
                    
                }
                
                export type parameter = string
                
                export type result =
                    | readonly ['list', {
                        readonly 'property': string
                    }]
                    | readonly ['state', {
                        readonly 'property': string
                    }]
                    | readonly ['optional value', {
                        readonly 'property': string
                    }]
                
                export namespace result {
                    export namespace type_ {
                        
                        export type list = {
                            readonly 'property': string
                        }
                        
                        export namespace list {
                            
                            export type property = string
                            
                        }
                        
                        export type state = {
                            readonly 'property': string
                        }
                        
                        export namespace state {
                            
                            export type property = string
                            
                        }
                        
                        export type optional_value = {
                            readonly 'property': string
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
        readonly 'type':
            | readonly ['acyclic', 
                | readonly ['siblings', null]
                | readonly ['resolved dictionary', {
                    readonly 'selection': s_self.resolver.Guaranteed_Value_Selection
                }]
            ]
            | readonly ['cyclic', 
                | readonly ['siblings', null]
            ]
            | readonly ['parameter', string]
    }
    
    export namespace Lookup_Selection {
        
        export type type_ =
            | readonly ['acyclic', 
                | readonly ['siblings', null]
                | readonly ['resolved dictionary', {
                    readonly 'selection': s_self.resolver.Guaranteed_Value_Selection
                }]
            ]
            | readonly ['cyclic', 
                | readonly ['siblings', null]
            ]
            | readonly ['parameter', string]
        
        export namespace type_ {
            export namespace type_ {
                
                export type acyclic =
                    | readonly ['siblings', null]
                    | readonly ['resolved dictionary', {
                        readonly 'selection': s_self.resolver.Guaranteed_Value_Selection
                    }]
                
                export namespace acyclic {
                    export namespace type_ {
                        
                        export type siblings = null
                        
                        export type resolved_dictionary = {
                            readonly 'selection': s_self.resolver.Guaranteed_Value_Selection
                        }
                        
                        export namespace resolved_dictionary {
                            
                            export type selection = s_self.resolver.Guaranteed_Value_Selection
                            
                        }
                        
                    }
                    
                }
                
                export type cyclic =
                    | readonly ['siblings', null]
                
                export namespace cyclic {
                    export namespace type_ {
                        
                        export type siblings = null
                        
                    }
                    
                }
                
                export type parameter = string
                
            }
            
        }
        
    }
    
    export type Reference_Constraints = p_.Optional_Value<p_.Dictionary<{
        readonly 'start':
            | readonly ['value', null]
            | readonly ['sibling', string]
        readonly 'constraint': {
            readonly 'selection': s_self.resolver.Relative_Value_Selection
            readonly 'type':
                | readonly ['state', {
                    readonly 'option': string
                }]
                | readonly ['optional value', null]
        }
    }>>
    
    export namespace Reference_Constraints {
        
        export type O = p_.Dictionary<{
            readonly 'start':
                | readonly ['value', null]
                | readonly ['sibling', string]
            readonly 'constraint': {
                readonly 'selection': s_self.resolver.Relative_Value_Selection
                readonly 'type':
                    | readonly ['state', {
                        readonly 'option': string
                    }]
                    | readonly ['optional value', null]
            }
        }>
        
        export namespace O {
            
            export type D = {
                readonly 'start':
                    | readonly ['value', null]
                    | readonly ['sibling', string]
                readonly 'constraint': {
                    readonly 'selection': s_self.resolver.Relative_Value_Selection
                    readonly 'type':
                        | readonly ['state', {
                            readonly 'option': string
                        }]
                        | readonly ['optional value', null]
                }
            }
            
            export namespace D {
                
                export type start =
                    | readonly ['value', null]
                    | readonly ['sibling', string]
                
                export namespace start {
                    export namespace type_ {
                        
                        export type value = null
                        
                        export type sibling = string
                        
                    }
                    
                }
                
                export type constraint = {
                    readonly 'selection': s_self.resolver.Relative_Value_Selection
                    readonly 'type':
                        | readonly ['state', {
                            readonly 'option': string
                        }]
                        | readonly ['optional value', null]
                }
                
                export namespace constraint {
                    
                    export type selection = s_self.resolver.Relative_Value_Selection
                    
                    export type type_ =
                        | readonly ['state', {
                            readonly 'option': string
                        }]
                        | readonly ['optional value', null]
                    
                    export namespace type_ {
                        export namespace type_ {
                            
                            export type state = {
                                readonly 'option': string
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
            readonly 'location':
                | readonly ['local', string]
                | readonly ['child namespace', {
                    readonly 'namespace': string
                    readonly 'resolver': string
                }]
                | readonly ['sibling namespace', {
                    readonly 'namespace': string
                    readonly 'resolver': string
                }]
            readonly 'arguments': p_.Optional_Value<{
                readonly 'types': p_.Optional_Value<p_.Dictionary<
                    | readonly ['optional', 
                        | readonly ['not set', null]
                        | readonly ['set', s_self.resolver.Guaranteed_Value_Selection]
                        | readonly ['selection', s_self.resolver.Possible_Value_Selection]
                    ]
                    | readonly ['required', s_self.resolver.Guaranteed_Value_Selection]
                    | readonly ['parameter', string]
                >>
                readonly 'lookups': p_.Optional_Value<p_.Dictionary<
                    | readonly ['acyclic', null]
                    | readonly ['cyclic', null]
                    | readonly ['selection', s_self.resolver.Lookup_Selection]
                >>
            }>
            readonly 'constraints': s_self.resolver.Reference_Constraints
        }]
        | readonly ['dictionary', {
            readonly 'resolver': s_self.resolver.Value
            readonly 'benchmark': p_.Optional_Value<{
                readonly 'selection': s_self.resolver.Guaranteed_Value_Selection
                readonly 'coverage':
                    | readonly ['dense', null]
                    | readonly ['sparse', null]
            }>
        }]
        | readonly ['group', p_.Dictionary<{
            readonly 'resolver': s_self.resolver.Value
        }>]
        | readonly ['list', {
            readonly 'resolver': s_self.resolver.Value
            readonly 'result': p_.Optional_Value<{
                readonly 'initial': s_self.resolver.Guaranteed_Value_Selection
                readonly 'next': s_self.resolver.Result_Selection
            }>
        }]
        | readonly ['nothing', null]
        | readonly ['simple', null]
        | readonly ['optional', {
            readonly 'presence': p_.Optional_Value<s_self.resolver.Possible_Value_Selection>
            readonly 'constraints': s_self.resolver.Option_Constraints
            readonly 'resolver': s_self.resolver.Value
            readonly 'not set constraints': p_.Optional_Value<p_.Dictionary<s_self.resolver.Possible_Value_Selection>>
            readonly 'result': p_.Optional_Value<s_self.resolver.Result_Selection>
        }]
        | readonly ['reference', {
            readonly 'type': {
                readonly 'lookup': s_self.resolver.Lookup_Selection
                readonly 'constraints': s_self.resolver.Reference_Constraints
            }
        }]
        | readonly ['state', {
            readonly 'options': p_.Dictionary<{
                readonly 'constraints': s_self.resolver.Option_Constraints
                readonly 'resolver': s_self.resolver.Value
                readonly 'result': p_.Optional_Value<s_self.resolver.Result_Selection>
            }>
        }]
    
    export namespace Value {
        export namespace type_ {
            
            export type component = {
                readonly 'location':
                    | readonly ['local', string]
                    | readonly ['child namespace', {
                        readonly 'namespace': string
                        readonly 'resolver': string
                    }]
                    | readonly ['sibling namespace', {
                        readonly 'namespace': string
                        readonly 'resolver': string
                    }]
                readonly 'arguments': p_.Optional_Value<{
                    readonly 'types': p_.Optional_Value<p_.Dictionary<
                        | readonly ['optional', 
                            | readonly ['not set', null]
                            | readonly ['set', s_self.resolver.Guaranteed_Value_Selection]
                            | readonly ['selection', s_self.resolver.Possible_Value_Selection]
                        ]
                        | readonly ['required', s_self.resolver.Guaranteed_Value_Selection]
                        | readonly ['parameter', string]
                    >>
                    readonly 'lookups': p_.Optional_Value<p_.Dictionary<
                        | readonly ['acyclic', null]
                        | readonly ['cyclic', null]
                        | readonly ['selection', s_self.resolver.Lookup_Selection]
                    >>
                }>
                readonly 'constraints': s_self.resolver.Reference_Constraints
            }
            
            export namespace component {
                
                export type location =
                    | readonly ['local', string]
                    | readonly ['child namespace', {
                        readonly 'namespace': string
                        readonly 'resolver': string
                    }]
                    | readonly ['sibling namespace', {
                        readonly 'namespace': string
                        readonly 'resolver': string
                    }]
                
                export namespace location {
                    export namespace type_ {
                        
                        export type local = string
                        
                        export type child_namespace = {
                            readonly 'namespace': string
                            readonly 'resolver': string
                        }
                        
                        export namespace child_namespace {
                            
                            export type namespace = string
                            
                            export type resolver = string
                            
                        }
                        
                        export type sibling_namespace = {
                            readonly 'namespace': string
                            readonly 'resolver': string
                        }
                        
                        export namespace sibling_namespace {
                            
                            export type namespace = string
                            
                            export type resolver = string
                            
                        }
                        
                    }
                    
                }
                
                export type arguments_ = p_.Optional_Value<{
                    readonly 'types': p_.Optional_Value<p_.Dictionary<
                        | readonly ['optional', 
                            | readonly ['not set', null]
                            | readonly ['set', s_self.resolver.Guaranteed_Value_Selection]
                            | readonly ['selection', s_self.resolver.Possible_Value_Selection]
                        ]
                        | readonly ['required', s_self.resolver.Guaranteed_Value_Selection]
                        | readonly ['parameter', string]
                    >>
                    readonly 'lookups': p_.Optional_Value<p_.Dictionary<
                        | readonly ['acyclic', null]
                        | readonly ['cyclic', null]
                        | readonly ['selection', s_self.resolver.Lookup_Selection]
                    >>
                }>
                
                export namespace arguments_ {
                    
                    export type O = {
                        readonly 'types': p_.Optional_Value<p_.Dictionary<
                            | readonly ['optional', 
                                | readonly ['not set', null]
                                | readonly ['set', s_self.resolver.Guaranteed_Value_Selection]
                                | readonly ['selection', s_self.resolver.Possible_Value_Selection]
                            ]
                            | readonly ['required', s_self.resolver.Guaranteed_Value_Selection]
                            | readonly ['parameter', string]
                        >>
                        readonly 'lookups': p_.Optional_Value<p_.Dictionary<
                            | readonly ['acyclic', null]
                            | readonly ['cyclic', null]
                            | readonly ['selection', s_self.resolver.Lookup_Selection]
                        >>
                    }
                    
                    export namespace O {
                        
                        export type types = p_.Optional_Value<p_.Dictionary<
                            | readonly ['optional', 
                                | readonly ['not set', null]
                                | readonly ['set', s_self.resolver.Guaranteed_Value_Selection]
                                | readonly ['selection', s_self.resolver.Possible_Value_Selection]
                            ]
                            | readonly ['required', s_self.resolver.Guaranteed_Value_Selection]
                            | readonly ['parameter', string]
                        >>
                        
                        export namespace types {
                            
                            export type O = p_.Dictionary<
                                | readonly ['optional', 
                                    | readonly ['not set', null]
                                    | readonly ['set', s_self.resolver.Guaranteed_Value_Selection]
                                    | readonly ['selection', s_self.resolver.Possible_Value_Selection]
                                ]
                                | readonly ['required', s_self.resolver.Guaranteed_Value_Selection]
                                | readonly ['parameter', string]
                            >
                            
                            export namespace O {
                                
                                export type D =
                                    | readonly ['optional', 
                                        | readonly ['not set', null]
                                        | readonly ['set', s_self.resolver.Guaranteed_Value_Selection]
                                        | readonly ['selection', s_self.resolver.Possible_Value_Selection]
                                    ]
                                    | readonly ['required', s_self.resolver.Guaranteed_Value_Selection]
                                    | readonly ['parameter', string]
                                
                                export namespace D {
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
                                        
                                        export type parameter = string
                                        
                                    }
                                    
                                }
                                
                            }
                            
                        }
                        
                        export type lookups = p_.Optional_Value<p_.Dictionary<
                            | readonly ['acyclic', null]
                            | readonly ['cyclic', null]
                            | readonly ['selection', s_self.resolver.Lookup_Selection]
                        >>
                        
                        export namespace lookups {
                            
                            export type O = p_.Dictionary<
                                | readonly ['acyclic', null]
                                | readonly ['cyclic', null]
                                | readonly ['selection', s_self.resolver.Lookup_Selection]
                            >
                            
                            export namespace O {
                                
                                export type D =
                                    | readonly ['acyclic', null]
                                    | readonly ['cyclic', null]
                                    | readonly ['selection', s_self.resolver.Lookup_Selection]
                                
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
                readonly 'resolver': s_self.resolver.Value
                readonly 'benchmark': p_.Optional_Value<{
                    readonly 'selection': s_self.resolver.Guaranteed_Value_Selection
                    readonly 'coverage':
                        | readonly ['dense', null]
                        | readonly ['sparse', null]
                }>
            }
            
            export namespace dictionary {
                
                export type resolver = s_self.resolver.Value
                
                export type benchmark = p_.Optional_Value<{
                    readonly 'selection': s_self.resolver.Guaranteed_Value_Selection
                    readonly 'coverage':
                        | readonly ['dense', null]
                        | readonly ['sparse', null]
                }>
                
                export namespace benchmark {
                    
                    export type O = {
                        readonly 'selection': s_self.resolver.Guaranteed_Value_Selection
                        readonly 'coverage':
                            | readonly ['dense', null]
                            | readonly ['sparse', null]
                    }
                    
                    export namespace O {
                        
                        export type selection = s_self.resolver.Guaranteed_Value_Selection
                        
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
            
            export type group = p_.Dictionary<{
                readonly 'resolver': s_self.resolver.Value
            }>
            
            export namespace group {
                
                export type D = {
                    readonly 'resolver': s_self.resolver.Value
                }
                
                export namespace D {
                    
                    export type resolver = s_self.resolver.Value
                    
                }
                
            }
            
            export type list = {
                readonly 'resolver': s_self.resolver.Value
                readonly 'result': p_.Optional_Value<{
                    readonly 'initial': s_self.resolver.Guaranteed_Value_Selection
                    readonly 'next': s_self.resolver.Result_Selection
                }>
            }
            
            export namespace list {
                
                export type resolver = s_self.resolver.Value
                
                export type result = p_.Optional_Value<{
                    readonly 'initial': s_self.resolver.Guaranteed_Value_Selection
                    readonly 'next': s_self.resolver.Result_Selection
                }>
                
                export namespace result {
                    
                    export type O = {
                        readonly 'initial': s_self.resolver.Guaranteed_Value_Selection
                        readonly 'next': s_self.resolver.Result_Selection
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
                readonly 'presence': p_.Optional_Value<s_self.resolver.Possible_Value_Selection>
                readonly 'constraints': s_self.resolver.Option_Constraints
                readonly 'resolver': s_self.resolver.Value
                readonly 'not set constraints': p_.Optional_Value<p_.Dictionary<s_self.resolver.Possible_Value_Selection>>
                readonly 'result': p_.Optional_Value<s_self.resolver.Result_Selection>
            }
            
            export namespace optional {
                
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
                
                export type result = p_.Optional_Value<s_self.resolver.Result_Selection>
                
                export namespace result {
                    
                    export type O = s_self.resolver.Result_Selection
                    
                }
                
            }
            
            export type reference = {
                readonly 'type': {
                    readonly 'lookup': s_self.resolver.Lookup_Selection
                    readonly 'constraints': s_self.resolver.Reference_Constraints
                }
            }
            
            export namespace reference {
                
                export type type_ = {
                    readonly 'lookup': s_self.resolver.Lookup_Selection
                    readonly 'constraints': s_self.resolver.Reference_Constraints
                }
                
                export namespace type_ {
                    
                    export type lookup = s_self.resolver.Lookup_Selection
                    
                    export type constraints = s_self.resolver.Reference_Constraints
                    
                }
                
            }
            
            export type state = {
                readonly 'options': p_.Dictionary<{
                    readonly 'constraints': s_self.resolver.Option_Constraints
                    readonly 'resolver': s_self.resolver.Value
                    readonly 'result': p_.Optional_Value<s_self.resolver.Result_Selection>
                }>
            }
            
            export namespace state {
                
                export type options = p_.Dictionary<{
                    readonly 'constraints': s_self.resolver.Option_Constraints
                    readonly 'resolver': s_self.resolver.Value
                    readonly 'result': p_.Optional_Value<s_self.resolver.Result_Selection>
                }>
                
                export namespace options {
                    
                    export type D = {
                        readonly 'constraints': s_self.resolver.Option_Constraints
                        readonly 'resolver': s_self.resolver.Value
                        readonly 'result': p_.Optional_Value<s_self.resolver.Result_Selection>
                    }
                    
                    export namespace D {
                        
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
    
    export type Resolver = {
        readonly 'namespaces': p_.Dictionary<s_self.resolver.Resolver>
        readonly 'types': p_.Dictionary<{
            readonly 'root value resolver': s_self.resolver.Value
        }>
    }
    
    export namespace Resolver {
        
        export type namespaces = p_.Dictionary<s_self.resolver.Resolver>
        
        export namespace namespaces {
            
            export type D = s_self.resolver.Resolver
            
        }
        
        export type types = p_.Dictionary<{
            readonly 'root value resolver': s_self.resolver.Value
        }>
        
        export namespace types {
            
            export type D = {
                readonly 'root value resolver': s_self.resolver.Value
            }
            
            export namespace D {
                
                export type root_value_resolver = s_self.resolver.Value
                
            }
            
        }
        
    }
    
}
