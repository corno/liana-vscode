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
            
            export type type_ = string
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
    
    export namespace Type_Specification {
        
        export namespace schema {
            
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
        
        export type schema = {
            readonly 'structure': schema.structure
            readonly 'resolver': schema.resolver
        }
        
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
            
            export namespace Basic_Types {
                
                export namespace D {
                    
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
                
                export type D = {
                    readonly 'type': D.type_
                    readonly 'regular expression': D.regular_expression
                    readonly 'hyperlink': D.hyperlink
                }
            }
            
            export type Basic_Types = p_.Dictionary<
                Basic_Types.D
            >
            
            export namespace Types {
                
                export type D = __schema.namespaces.structure.types.Type
            }
            
            export type Types = p_.Dictionary<
                Types.D
            >
            
            export namespace Namespaces {
                
                export type D = __schema.namespaces.structure.types.Structure
            }
            
            export type Namespaces = p_.Dictionary<
                Namespaces.D
            >
            
            export namespace Type {
                
                export namespace visibility {
                    
                    export type private_ = null
                    
                    export type private_single_use = null
                    
                    export type public_ = null
                }
                
                export type visibility = 
                    | readonly ['private', visibility.private_]
                    | readonly ['private single use', visibility.private_single_use]
                    | readonly ['public', visibility.public_]
                
                export type root_value = __schema.namespaces.structure.types.Value
            }
            
            export type Type = {
                readonly 'visibility': Type.visibility
                readonly 'root value': Type.root_value
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
            
            export namespace Value {
                
                export namespace component {
                    
                    export namespace type_ {
                        
                        export namespace simple {
                            
                            export type local = string
                            
                            export namespace child_namespace {

                                export type namespace = string

                                export type type_ = string
                            }

                            export type child_namespace = {
                                readonly 'namespace': child_namespace.namespace
                                readonly 'type': child_namespace.type_
                            }

                            export namespace sibling_namespace {

                                export type namespace = string

                                export type type_ = string
                            }

                            export type sibling_namespace = {
                                readonly 'namespace': sibling_namespace.namespace
                                readonly 'type': sibling_namespace.type_
                            }
                        }
                        
                        export type simple =
                            | readonly ['local', simple.local]
                            | readonly ['child namespace', simple.child_namespace]
                            | readonly ['sibling namespace', simple.sibling_namespace]
                        
                        export namespace navigable {
                            
                            export type local = string
                            
                            export namespace child_namespace {

                                export type namespace = string

                                export type type_ = string
                            }

                            export type child_namespace = {
                                readonly 'namespace': child_namespace.namespace
                                readonly 'type': child_namespace.type_
                            }

                            export namespace sibling_namespace {

                                export type namespace = string

                                export type type_ = string
                            }

                            export type sibling_namespace = {
                                readonly 'namespace': sibling_namespace.namespace
                                readonly 'type': sibling_namespace.type_
                            }
                        }
                        
                        export type navigable =
                            | readonly ['local', navigable.local]
                            | readonly ['child namespace', navigable.child_namespace]
                            | readonly ['sibling namespace', navigable.sibling_namespace]
                    }
                    
                    export type type_ = 
                        | readonly ['simple', type_.simple]
                        | readonly ['navigable', type_.navigable]
                    
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
                
                export type simple = string
                
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
            
            export namespace Dictionary {
                
                export namespace benchmark {
                    
                    export type O = __schema.namespaces.structure.types.Value_Reference
                }

                export type benchmark = p_.Optional_Value<
                    benchmark.O
                >

                export type value = __schema.namespaces.structure.types.Value
            }

            export type Dictionary = {
                readonly 'benchmark': Dictionary.benchmark
                readonly 'value': Dictionary.value
            }

            export namespace Value_Reference {

                export namespace type_ {

                    export namespace location {
                        
                        export type local = string
                        
                        export namespace child_namespace {

                            export type namespace = string

                            export type type_ = string
                        }
                        
                        export type child_namespace = {
                            readonly 'namespace': child_namespace.namespace
                            readonly 'type': child_namespace.type_
                        }
                        
                        export namespace sibling_namespace {

                            export type namespace = string

                            export type type_ = string
                        }
                        
                        export type sibling_namespace = {
                            readonly 'namespace': sibling_namespace.namespace
                            readonly 'type': sibling_namespace.type_
                        }
                    }
                    
                    export type location =
                        | readonly ['local', location.local]
                        | readonly ['child namespace', location.child_namespace]
                        | readonly ['sibling namespace', location.sibling_namespace]
                }
                
                export type type_ = {
                    readonly 'location': type_.location
                }
                
                export namespace path {

                    export namespace tail {

                        export namespace L {

                            export type benchmark = null

                            export type dictionary = null

                            export type group = string

                            export type list = null

                            export type optional = null

                            export type state = string
                        }

                        export type L =
                            | readonly ['benchmark', L.benchmark]
                            | readonly ['dictionary', L.dictionary]
                            | readonly ['group', L.group]
                            | readonly ['list', L.list]
                            | readonly ['optional', L.optional]
                            | readonly ['state', L.state]
                    }

                    export type tail = p_.List<
                        tail.L
                    >
                }
                
                export type path = {
                    readonly 'tail': path.tail
                }
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
                
                export type referent = __schema.namespaces.structure.types.Value_Reference
                
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
            
            export namespace Signature_Value_Reference {
                
                export namespace type_ {
                    
                    export namespace location {
                        
                        export type local = string
                        
                        export namespace child_namespace {

                            export type namespace = string

                            export type type_ = string
                        }
                        
                        export type child_namespace = {
                            readonly 'namespace': child_namespace.namespace
                            readonly 'type': child_namespace.type_
                        }

                        export namespace sibling_namespace {

                            export type namespace = string

                            export type type_ = string
                        }
                        
                        export type sibling_namespace = {
                            readonly 'namespace': sibling_namespace.namespace
                            readonly 'type': sibling_namespace.type_
                        }
                    }
                    
                    export type location =
                        | readonly ['local', location.local]
                        | readonly ['child namespace', location.child_namespace]
                        | readonly ['sibling namespace', location.sibling_namespace]
                }
                
                export type type_ = {
                    readonly 'location': type_.location
                }
                
                export namespace subselection {

                    export namespace tail {

                        export namespace L {

                            export type dictionary = null

                            export type group = string

                            export type list = null

                            export type optional = null

                            export type state = string
                        }
                        
                        export type L =
                            | readonly ['dictionary', L.dictionary]
                            | readonly ['group', L.group]
                            | readonly ['list', L.list]
                            | readonly ['optional', L.optional]
                            | readonly ['state', L.state]
                    }
                    
                    export type tail = p_.List<
                        tail.L
                    >
                }
                
                export type subselection = {
                    readonly 'tail': subselection.tail
                }
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
                        
                        export type referent = __schema.namespaces.declarations.types.Signature_Value_Reference
                        
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
                
                export type D = __schema.namespaces.declarations.types.Declaration
            }
            
            export type Declarations = p_.Dictionary<
                Declarations.D
            >
            
            export namespace Declaration {
                
                export namespace signature {
                    
                    export type local = __schema.namespaces.declarations.types.Signature
                    
                    export type same_as = string
                }
                
                export type signature = 
                    | readonly ['local', signature.local]
                    | readonly ['same as', signature.same_as]
            }
            
            export type Declaration = {
                readonly 'signature': Declaration.signature
            }
            
            export namespace Namespaces {
                
                export type D = __schema.namespaces.declarations.types.Declaration_Namespace
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
            
            export namespace Value_Reference {
                
                export namespace type_ {
                    
                    export namespace location {
                        
                        export type local = string
                        
                        export namespace child_namespace {

                            export type namespace = string

                            export type type_ = string
                        }
                        
                        export type child_namespace = {
                            readonly 'namespace': child_namespace.namespace
                            readonly 'type': child_namespace.type_
                        }
                        
                        export namespace sibling_namespace {

                            export type namespace = string

                            export type type_ = string
                        }

                        export type sibling_namespace = {
                            readonly 'namespace': sibling_namespace.namespace
                            readonly 'type': sibling_namespace.type_
                        }
                    }
                    
                    export type location =
                        | readonly ['local', location.local]
                        | readonly ['child namespace', location.child_namespace]
                        | readonly ['sibling namespace', location.sibling_namespace]
                }
                
                export type type_ = {
                    readonly 'location': type_.location
                }
                
                export namespace path {
                    
                    export namespace tail {

                        export namespace L {

                            export type dictionary = null

                            export type group = string

                            export type list = null

                            export type optional = null

                            export type state = string
                        }
                        
                        export type L =
                            | readonly ['dictionary', L.dictionary]
                            | readonly ['group', L.group]
                            | readonly ['list', L.list]
                            | readonly ['optional', L.optional]
                            | readonly ['state', L.state]
                    }
                    
                    export type tail = p_.List<
                        tail.L
                    >
                }
                
                export type path = {
                    readonly 'tail': path.tail
                }
            }
            
            export type Value_Reference = {
                readonly 'type': Value_Reference.type_
                readonly 'path': Value_Reference.path
            }

            export namespace Simple_Component_Selection {

                export type local = string

                export namespace child_namespace {

                    export type namespace = string

                    export type type_ = string
                }

                export type child_namespace = {
                    readonly 'namespace': child_namespace.namespace
                    readonly 'type': child_namespace.type_
                }

                export namespace sibling_namespace {

                    export type namespace = string

                    export type type_ = string
                }

                export type sibling_namespace = {
                    readonly 'namespace': sibling_namespace.namespace
                    readonly 'type': sibling_namespace.type_
                }
            }

            export type Simple_Component_Selection =
                | readonly ['local', Simple_Component_Selection.local]
                | readonly ['child namespace', Simple_Component_Selection.child_namespace]
                | readonly ['sibling namespace', Simple_Component_Selection.sibling_namespace]

            export namespace Relative_Value_Selection {
                
                export namespace path {
                    
                    export namespace L {
                        
                        export type benchmark_link = __schema.namespaces.resolver.types.Value_Reference
                        
                        export type simple_component = __schema.namespaces.resolver.types.Simple_Component_Selection

                        export namespace component_constraint {
                            
                            export type name = string
                            
                            export type target = __schema.namespaces.resolver.types.Value_Reference
                        }
                        
                        export type component_constraint = {
                            readonly 'name': component_constraint.name
                            readonly 'target': component_constraint.target
                        }
                        
                        export type navigable_component = null
                        
                        export type group = string
                        
                        export type list_result = null
                        
                        export namespace option_constraint {
                            
                            export type option = string
                            
                            export type constraint = string
                        }
                        
                        export type option_constraint = {
                            readonly 'option': option_constraint.option
                            readonly 'constraint': option_constraint.constraint
                        }
                        
                        export type optional = null
                        
                        export type optional_value_constraint = string
                        
                        export type reference_constraint = string
                        
                        export namespace reference {}
                        
                        export type reference = null

                        export type state_result = null
                    }

                    export type L =
                        | readonly ['benchmark link', L.benchmark_link]
                        | readonly ['simple component', L.simple_component]
                        | readonly ['component constraint', L.component_constraint]
                        | readonly ['navigable component', L.navigable_component]
                        | readonly ['group', L.group]
                        | readonly ['list result', L.list_result]
                        | readonly ['option constraint', L.option_constraint]
                        | readonly ['optional', L.optional]
                        | readonly ['optional value constraint', L.optional_value_constraint]
                        | readonly ['reference constraint', L.reference_constraint]
                        | readonly ['reference', L.reference]
                        | readonly ['state result', L.state_result]
                }

                export type path = p_.List<
                    path.L
                >
            }

            export type Relative_Value_Selection = {
                readonly 'path': Relative_Value_Selection.path
            }

            export namespace Possible_Value_Selection {

                export namespace optional_value {

                    export type selection = __schema.namespaces.resolver.types.Guaranteed_Value_Selection

                    export type tail = __schema.namespaces.resolver.types.Relative_Value_Selection
                }

                export type optional_value = {
                    readonly 'selection': optional_value.selection
                    readonly 'tail': optional_value.tail
                }

                export type parameter = string

                export namespace result {

                    export namespace state {

                        export type property = string
                    }

                    export type state = {
                        readonly 'property': state.property
                    }

                    export namespace optional_value {

                        export type property = string
                    }

                    export type optional_value = {
                        readonly 'property': optional_value.property
                    }
                }

                export type result =
                    | readonly ['state', result.state]
                    | readonly ['optional value', result.optional_value]
            }

            export type Possible_Value_Selection =
                | readonly ['optional value', Possible_Value_Selection.optional_value]
                | readonly ['parameter', Possible_Value_Selection.parameter]
                | readonly ['result', Possible_Value_Selection.result]

            export namespace Option_Constraints {

                export namespace O {

                    export namespace D {

                        export namespace state {

                            export type selection = __schema.namespaces.resolver.types.Guaranteed_Value_Selection

                            export type option = string
                        }

                        export type state = {
                            readonly 'selection': state.selection
                            readonly 'option': state.option
                        }

                        export type assert_is_set = __schema.namespaces.resolver.types.Possible_Value_Selection
                    }

                    export type D =
                        | readonly ['state', D.state]
                        | readonly ['assert is set', D.assert_is_set]
                }

                export type O = p_.Dictionary<
                    O.D
                >
            }

            export type Option_Constraints = p_.Optional_Value<
                Option_Constraints.O
            >
            
            export namespace Guaranteed_Value_Selection {
                
                export namespace start {
                    
                    export namespace optional_fallback {
                        
                        export type selection = __schema.namespaces.resolver.types.Possible_Value_Selection
                        
                        export type fallback = __schema.namespaces.resolver.types.Guaranteed_Value_Selection
                    }
                    
                    export type optional_fallback = {
                        readonly 'selection': optional_fallback.selection
                        readonly 'fallback': optional_fallback.fallback
                    }
                    
                    export type sibling_property = string
                    
                    export type parent_sibling = string
                    
                    export type option_constraint = string
                    
                    export type sibling_option_constraint = string

                    export type list_cursor = null
                    
                    export type linked_entry = null
                    
                    export namespace constraint {
                        
                        export namespace component {
                            
                            export type property = string
                            
                            export type constraint = string
                        }
                        
                        export type component = {
                            readonly 'property': component.property
                            readonly 'constraint': component.constraint
                        }
                        
                        export namespace reference {
                            
                            export type property = string
                            
                            export type constraint = string
                        }
                        
                        export type reference = {
                            readonly 'property': reference.property
                            readonly 'constraint': reference.constraint
                        }
                    }
                    
                    export type constraint = 
                        | readonly ['component', constraint.component]
                        | readonly ['reference', constraint.reference]
                    
                    export type parameter = string
                    
                    export namespace result {
                        
                        export namespace list {
                            
                            export type property = string
                        }
                        
                        export type list = {
                            readonly 'property': list.property
                        }
                        
                        export namespace state {
                            
                            export type property = string
                        }
                        
                        export type state = {
                            readonly 'property': state.property
                        }
                        
                        export namespace optional_value {
                            
                            export type property = string
                        }
                        
                        export type optional_value = {
                            readonly 'property': optional_value.property
                        }
                    }
                    
                    export type result = 
                        | readonly ['list', result.list]
                        | readonly ['state', result.state]
                        | readonly ['optional value', result.optional_value]
                }
                
                export type start = 
                    | readonly ['optional fallback', start.optional_fallback]
                    | readonly ['sibling property', start.sibling_property]
                    | readonly ['parent sibling', start.parent_sibling]
                    | readonly ['option constraint', start.option_constraint]
                    | readonly ['sibling option constraint', start.sibling_option_constraint]
                    | readonly ['list cursor', start.list_cursor]
                    | readonly ['linked entry', start.linked_entry]
                    | readonly ['constraint', start.constraint]
                    | readonly ['parameter', start.parameter]
                    | readonly ['result', start.result]
                
                export type tail = __schema.namespaces.resolver.types.Relative_Value_Selection
            }
            
            export type Guaranteed_Value_Selection = {
                readonly 'start': Guaranteed_Value_Selection.start
                readonly 'tail': Guaranteed_Value_Selection.tail
            }
            
            export namespace Lookup_Selection {
                
                export namespace type_ {
                    
                    export namespace acyclic {
                        
                        export type siblings = null
                        
                        export namespace resolved_dictionary {
                            
                            export type selection = __schema.namespaces.resolver.types.Guaranteed_Value_Selection
                        }
                        
                        export type resolved_dictionary = {
                            readonly 'selection': resolved_dictionary.selection
                        }
                    }
                    
                    export type acyclic = 
                        | readonly ['siblings', acyclic.siblings]
                        | readonly ['resolved dictionary', acyclic.resolved_dictionary]
                    
                    export namespace cyclic {
                        
                        export type siblings = null
                    }
                    
                    export type cyclic = 
                        | readonly ['siblings', cyclic.siblings]
                    
                    export type parameter = string
                }
                
                export type type_ = 
                    | readonly ['acyclic', type_.acyclic]
                    | readonly ['cyclic', type_.cyclic]
                    | readonly ['parameter', type_.parameter]
            }
            
            export type Lookup_Selection = {
                readonly 'type': Lookup_Selection.type_
            }
            
            export namespace Reference_Constraints {
                
                export namespace O {
                    
                    export namespace D {
                        
                        export namespace start {
                            
                            export type value = null
                            
                            export type sibling = string
                        }
                        
                        export type start =
                            | readonly ['value', start.value]
                            | readonly ['sibling', start.sibling]

                        export namespace constraint {

                            export type selection = __schema.namespaces.resolver.types.Relative_Value_Selection

                            export namespace type_ {

                                export namespace state {

                                    export type option = string
                                }

                                export type state = {
                                    readonly 'option': state.option
                                }

                                export namespace optional_value {}

                                export type optional_value = null
                            }

                            export type type_ =
                                | readonly ['state', type_.state]
                                | readonly ['optional value', type_.optional_value]
                        }
                        
                        export type constraint = {
                            readonly 'selection': constraint.selection
                            readonly 'type': constraint.type_
                        }
                    }
                    
                    export type D = {
                        readonly 'start': D.start
                        readonly 'constraint': D.constraint
                    }
                }
                
                export type O = p_.Dictionary<
                    O.D
                >
            }
            
            export type Reference_Constraints = p_.Optional_Value<
                Reference_Constraints.O
            >
            
            export namespace Result_Selection {
                
                export type context = __schema.namespaces.resolver.types.Guaranteed_Value_Selection
                
                export type value = __schema.namespaces.resolver.types.Relative_Value_Selection
            }
            
            export type Result_Selection = 
                | readonly ['context', Result_Selection.context]
                | readonly ['value', Result_Selection.value]
            
            export namespace Value {
                
                export namespace component {
                    
                    export namespace location {
                        
                        export type local = string
                        
                        export namespace child_namespace {
                            
                            export type namespace = string
                            
                            export type resolver = string
                        }
                        
                        export type child_namespace = {
                            readonly 'namespace': child_namespace.namespace
                            readonly 'resolver': child_namespace.resolver
                        }
                        
                        export namespace sibling_namespace {
                            
                            export type namespace = string
                            
                            export type resolver = string
                        }
                        
                        export type sibling_namespace = {
                            readonly 'namespace': sibling_namespace.namespace
                            readonly 'resolver': sibling_namespace.resolver
                        }
                    }
                    
                    export type location = 
                        | readonly ['local', location.local]
                        | readonly ['child namespace', location.child_namespace]
                        | readonly ['sibling namespace', location.sibling_namespace]
                    
                    export namespace arguments_ {
                        
                        export namespace O {
                            
                            export namespace types {
                                
                                export namespace O {
                                    
                                    export namespace D {
                                        
                                        export namespace optional {

                                            export type not_set = null

                                            export type set_ = __schema.namespaces.resolver.types.Guaranteed_Value_Selection

                                            export type selection = __schema.namespaces.resolver.types.Possible_Value_Selection
                                        }

                                        export type optional =
                                            | readonly ['not set', optional.not_set]
                                            | readonly ['set', optional.set_]
                                            | readonly ['selection', optional.selection]
                                        
                                        export type required = __schema.namespaces.resolver.types.Guaranteed_Value_Selection
                                        
                                        export type parameter = string
                                    }
                                    
                                    export type D = 
                                        | readonly ['optional', D.optional]
                                        | readonly ['required', D.required]
                                        | readonly ['parameter', D.parameter]
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
                                        
                                        export type acyclic = null
                                        
                                        export type cyclic = null
                                        
                                        export type selection = __schema.namespaces.resolver.types.Lookup_Selection
                                    }
                                    
                                    export type D = 
                                        | readonly ['acyclic', D.acyclic]
                                        | readonly ['cyclic', D.cyclic]
                                        | readonly ['selection', D.selection]
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
                
                export type component = {
                    readonly 'location': component.location
                    readonly 'arguments': component.arguments_
                    readonly 'constraints': component.constraints
                }
                
                export namespace dictionary {
                    
                    export type resolver = __schema.namespaces.resolver.types.Value
                    
                    export namespace benchmark {
                        
                        export namespace O {

                            export type selection = __schema.namespaces.resolver.types.Guaranteed_Value_Selection

                            export namespace coverage {

                                export type dense = null

                                export type sparse = null
                            }

                            export type coverage =
                                | readonly ['dense', coverage.dense]
                                | readonly ['sparse', coverage.sparse]
                        }

                        export type O = {
                            readonly 'selection': O.selection
                            readonly 'coverage': O.coverage
                        }
                    }
                    
                    export type benchmark = p_.Optional_Value<
                        benchmark.O
                    >
                }
                
                export type dictionary = {
                    readonly 'resolver': dictionary.resolver
                    readonly 'benchmark': dictionary.benchmark
                }
                
                export namespace group {

                    export namespace D {

                        export type resolver = __schema.namespaces.resolver.types.Value
                    }

                    export type D = {
                        readonly 'resolver': D.resolver
                    }
                }

                export type group = p_.Dictionary<
                    group.D
                >
                
                export namespace list {
                    
                    export type resolver = __schema.namespaces.resolver.types.Value
                    
                    export namespace result {
                        
                        export namespace O {

                            export type initial = __schema.namespaces.resolver.types.Guaranteed_Value_Selection

                            export type next = __schema.namespaces.resolver.types.Result_Selection
                        }

                        export type O = {
                            readonly 'initial': O.initial
                            readonly 'next': O.next
                        }
                    }
                    
                    export type result = p_.Optional_Value<
                        result.O
                    >
                }
                
                export type list = {
                    readonly 'resolver': list.resolver
                    readonly 'result': list.result
                }
                
                export type nothing = null
                
                export type simple = null
                
                export namespace optional {
                    
                    export namespace presence {
                        
                        export type O = __schema.namespaces.resolver.types.Possible_Value_Selection
                    }
                    
                    export type presence = p_.Optional_Value<
                        presence.O
                    >
                    
                    export type constraints = __schema.namespaces.resolver.types.Option_Constraints
                    
                    export type resolver = __schema.namespaces.resolver.types.Value
                    
                    export namespace not_set_constraints {

                        export namespace O {

                            export type D = __schema.namespaces.resolver.types.Possible_Value_Selection
                        }

                        export type O = p_.Dictionary<
                            O.D
                        >
                    }

                    export type not_set_constraints = p_.Optional_Value<
                        not_set_constraints.O
                    >
                    
                    export namespace result {
                        
                        export type O = __schema.namespaces.resolver.types.Result_Selection
                    }
                    
                    export type result = p_.Optional_Value<
                        result.O
                    >
                }
                
                export type optional = {
                    readonly 'presence': optional.presence
                    readonly 'constraints': optional.constraints
                    readonly 'resolver': optional.resolver
                    readonly 'not set constraints': optional.not_set_constraints
                    readonly 'result': optional.result
                }
                
                export namespace reference {
                    
                    export namespace type_ {
                        
                        export type lookup = __schema.namespaces.resolver.types.Lookup_Selection
                        
                        export type constraints = __schema.namespaces.resolver.types.Reference_Constraints
                    }
                    
                    export type type_ = {
                        readonly 'lookup': type_.lookup
                        readonly 'constraints': type_.constraints
                    }
                }
                
                export type reference = {
                    readonly 'type': reference.type_
                }
                
                export namespace state {
                    
                    export namespace options {
                        
                        export namespace D {
                            
                            export type constraints = __schema.namespaces.resolver.types.Option_Constraints
                            
                            export type resolver = __schema.namespaces.resolver.types.Value
                            
                            export namespace result {
                                
                                export type O = __schema.namespaces.resolver.types.Result_Selection
                            }
                            
                            export type result = p_.Optional_Value<
                                result.O
                            >
                        }
                        
                        export type D = {
                            readonly 'constraints': D.constraints
                            readonly 'resolver': D.resolver
                            readonly 'result': D.result
                        }
                    }
                    
                    export type options = p_.Dictionary<
                        options.D
                    >
                }
                
                export type state = {
                    readonly 'options': state.options
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
            
            export namespace Resolver {
                
                export namespace namespaces {
                    
                    export type D = __schema.namespaces.resolver.types.Resolver
                }
                
                export type namespaces = p_.Dictionary<
                    namespaces.D
                >
                
                export namespace types {
                    
                    export namespace D {

                        export type root_value_resolver = __schema.namespaces.resolver.types.Value
                    }
                    
                    export type D = {
                        readonly 'root value resolver': D.root_value_resolver
                    }
                }
                
                export type types = p_.Dictionary<
                    types.D
                >
            }
            
            export type Resolver = {
                readonly 'namespaces': Resolver.namespaces
                readonly 'types': Resolver.types
            }
        }
        export namespace namespaces {}
    }
}
