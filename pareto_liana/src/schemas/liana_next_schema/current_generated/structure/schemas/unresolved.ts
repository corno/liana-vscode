import type * as p_ from "pareto-core/schema"

import type * as self from "./unresolved.js"


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
                    
                    export type local = string
                    
                    export namespace child_namespace {
                        
                        export type namespace = string
                        
                        export type type_ = string
                    }
                    
                    export type child_namespace = {
                        readonly 'namespace': self.structure.Value.component.type_.simple.child_namespace.namespace
                        readonly 'type': self.structure.Value.component.type_.simple.child_namespace.type_
                    }
                    
                    export namespace sibling_namespace {
                        
                        export type namespace = string
                        
                        export type type_ = string
                    }
                    
                    export type sibling_namespace = {
                        readonly 'namespace': self.structure.Value.component.type_.simple.sibling_namespace.namespace
                        readonly 'type': self.structure.Value.component.type_.simple.sibling_namespace.type_
                    }
                }
                
                export type simple =
                    | readonly ['local', self.structure.Value.component.type_.simple.local]
                    | readonly ['child namespace', self.structure.Value.component.type_.simple.child_namespace]
                    | readonly ['sibling namespace', self.structure.Value.component.type_.simple.sibling_namespace]
                
                export type cyclic = string
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
        
        export type simple = string
        
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
                
                export type selection = self.structure.Value_Reference
                
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
                
                export type local = string
                
                export namespace child_namespace {
                    
                    export type namespace = string
                    
                    export type type_ = string
                }
                
                export type child_namespace = {
                    readonly 'namespace': self.structure.Value_Reference.type_.location.child_namespace.namespace
                    readonly 'type': self.structure.Value_Reference.type_.location.child_namespace.type_
                }
                
                export namespace sibling_namespace {
                    
                    export type namespace = string
                    
                    export type type_ = string
                }
                
                export type sibling_namespace = {
                    readonly 'namespace': self.structure.Value_Reference.type_.location.sibling_namespace.namespace
                    readonly 'type': self.structure.Value_Reference.type_.location.sibling_namespace.type_
                }
            }
            
            export type location =
                | readonly ['local', self.structure.Value_Reference.type_.location.local]
                | readonly ['child namespace', self.structure.Value_Reference.type_.location.child_namespace]
                | readonly ['sibling namespace', self.structure.Value_Reference.type_.location.sibling_namespace]
        }
        
        export type type_ = {
            readonly 'location': self.structure.Value_Reference.type_.location
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
                    | readonly ['dictionary', self.structure.Value_Reference.path.tail.L.dictionary]
                    | readonly ['group', self.structure.Value_Reference.path.tail.L.group]
                    | readonly ['list', self.structure.Value_Reference.path.tail.L.list]
                    | readonly ['optional', self.structure.Value_Reference.path.tail.L.optional]
                    | readonly ['state', self.structure.Value_Reference.path.tail.L.state]
            }
            
            export type tail = p_.List<self.structure.Value_Reference.path.tail.L>
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
        
        export type referent = self.structure.Value_Reference
        
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
                
                export type local = string
                
                export namespace child_namespace {
                    
                    export type namespace = string
                    
                    export type type_ = string
                }
                
                export type child_namespace = {
                    readonly 'namespace': self.declarations.Signature_Value_Reference.type_.location.child_namespace.namespace
                    readonly 'type': self.declarations.Signature_Value_Reference.type_.location.child_namespace.type_
                }
                
                export namespace sibling_namespace {
                    
                    export type namespace = string
                    
                    export type type_ = string
                }
                
                export type sibling_namespace = {
                    readonly 'namespace': self.declarations.Signature_Value_Reference.type_.location.sibling_namespace.namespace
                    readonly 'type': self.declarations.Signature_Value_Reference.type_.location.sibling_namespace.type_
                }
            }
            
            export type location =
                | readonly ['local', self.declarations.Signature_Value_Reference.type_.location.local]
                | readonly ['child namespace', self.declarations.Signature_Value_Reference.type_.location.child_namespace]
                | readonly ['sibling namespace', self.declarations.Signature_Value_Reference.type_.location.sibling_namespace]
        }
        
        export type type_ = {
            readonly 'location': self.declarations.Signature_Value_Reference.type_.location
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
                    | readonly ['dictionary', self.declarations.Signature_Value_Reference.subselection.tail.L.dictionary]
                    | readonly ['group', self.declarations.Signature_Value_Reference.subselection.tail.L.group]
                    | readonly ['list', self.declarations.Signature_Value_Reference.subselection.tail.L.list]
                    | readonly ['optional', self.declarations.Signature_Value_Reference.subselection.tail.L.optional]
                    | readonly ['state', self.declarations.Signature_Value_Reference.subselection.tail.L.state]
            }
            
            export type tail = p_.List<self.declarations.Signature_Value_Reference.subselection.tail.L>
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
                
                export type referent = self.declarations.Signature_Value_Reference
                
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
        
        export type D = self.declarations.Declaration
    }
    
    export type Declarations = p_.Dictionary<self.declarations.Declarations.D>
    
    export namespace Declaration {
        
        export namespace signature {
            
            export type local = self.declarations.Signature
            
            export type same_as = string
        }
        
        export type signature =
            | readonly ['local', self.declarations.Declaration.signature.local]
            | readonly ['same as', self.declarations.Declaration.signature.same_as]
    }
    
    export type Declaration = {
        readonly 'signature': self.declarations.Declaration.signature
    }
    
    export namespace Namespaces {
        
        export type D = self.declarations.Namespace
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
                
                export type local = string
                
                export namespace child_namespace {
                    
                    export type namespace = string
                    
                    export type type_ = string
                }
                
                export type child_namespace = {
                    readonly 'namespace': self.resolver.Value_Reference.type_.location.child_namespace.namespace
                    readonly 'type': self.resolver.Value_Reference.type_.location.child_namespace.type_
                }
                
                export namespace sibling_namespace {
                    
                    export type namespace = string
                    
                    export type type_ = string
                }
                
                export type sibling_namespace = {
                    readonly 'namespace': self.resolver.Value_Reference.type_.location.sibling_namespace.namespace
                    readonly 'type': self.resolver.Value_Reference.type_.location.sibling_namespace.type_
                }
            }
            
            export type location =
                | readonly ['local', self.resolver.Value_Reference.type_.location.local]
                | readonly ['child namespace', self.resolver.Value_Reference.type_.location.child_namespace]
                | readonly ['sibling namespace', self.resolver.Value_Reference.type_.location.sibling_namespace]
        }
        
        export type type_ = {
            readonly 'location': self.resolver.Value_Reference.type_.location
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
                    | readonly ['dictionary', self.resolver.Value_Reference.path.tail.L.dictionary]
                    | readonly ['group', self.resolver.Value_Reference.path.tail.L.group]
                    | readonly ['list', self.resolver.Value_Reference.path.tail.L.list]
                    | readonly ['optional', self.resolver.Value_Reference.path.tail.L.optional]
                    | readonly ['state', self.resolver.Value_Reference.path.tail.L.state]
            }
            
            export type tail = p_.List<self.resolver.Value_Reference.path.tail.L>
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
            
            export namespace L {
                
                export type benchmark_link = self.resolver.Value_Reference
                
                export namespace component_constraint {
                    
                    export type name = string
                    
                    export type target = self.resolver.Value_Reference
                }
                
                export type component_constraint = {
                    readonly 'name': self.resolver.Relative_Value_Selection.path.L.component_constraint.name
                    readonly 'target': self.resolver.Relative_Value_Selection.path.L.component_constraint.target
                }
                
                export type component = null
                
                export type cyclic_component = null
                
                export type group = string
                
                export type list_result = null
                
                export namespace option_constraint {
                    
                    export type option = string
                    
                    export type constraint = string
                }
                
                export type option_constraint = {
                    readonly 'option': self.resolver.Relative_Value_Selection.path.L.option_constraint.option
                    readonly 'constraint': self.resolver.Relative_Value_Selection.path.L.option_constraint.constraint
                }
                
                export type optional = null
                
                export type optional_value_constraint = string
                
                export type reference_constraint = string
                
                export namespace reference {}
                
                export type reference = null
                
                export namespace expect_resolved {}
                
                export type expect_resolved = null
                
                export type state_result = null
            }
            
            export type L =
                | readonly ['benchmark link', self.resolver.Relative_Value_Selection.path.L.benchmark_link]
                | readonly ['component constraint', self.resolver.Relative_Value_Selection.path.L.component_constraint]
                | readonly ['component', self.resolver.Relative_Value_Selection.path.L.component]
                | readonly ['cyclic component', self.resolver.Relative_Value_Selection.path.L.cyclic_component]
                | readonly ['group', self.resolver.Relative_Value_Selection.path.L.group]
                | readonly ['list result', self.resolver.Relative_Value_Selection.path.L.list_result]
                | readonly ['option constraint', self.resolver.Relative_Value_Selection.path.L.option_constraint]
                | readonly ['optional', self.resolver.Relative_Value_Selection.path.L.optional]
                | readonly ['optional value constraint', self.resolver.Relative_Value_Selection.path.L.optional_value_constraint]
                | readonly ['reference constraint', self.resolver.Relative_Value_Selection.path.L.reference_constraint]
                | readonly ['reference', self.resolver.Relative_Value_Selection.path.L.reference]
                | readonly ['expect resolved', self.resolver.Relative_Value_Selection.path.L.expect_resolved]
                | readonly ['state result', self.resolver.Relative_Value_Selection.path.L.state_result]
        }
        
        export type path = p_.List<self.resolver.Relative_Value_Selection.path.L>
    }
    
    export type Relative_Value_Selection = {
        readonly 'path': self.resolver.Relative_Value_Selection.path
    }
    
    export namespace Possible_Value_Branches {
        
        export namespace D {
            
            export type not_set = null
            
            export type set_ = self.resolver.Relative_Value_Selection
        }
        
        export type D =
            | readonly ['not set', self.resolver.Possible_Value_Branches.D.not_set]
            | readonly ['set', self.resolver.Possible_Value_Branches.D.set_]
    }
    
    export type Possible_Value_Branches = p_.Dictionary<self.resolver.Possible_Value_Branches.D>
    
    export namespace Possible_Value_Selection {
        
        export namespace decide_state {
            
            export type target = self.resolver.Value_Reference
            
            export type selection = self.resolver.Guaranteed_Value_Selection
            
            export type options = self.resolver.Possible_Value_Branches
        }
        
        export type decide_state = {
            readonly 'target': self.resolver.Possible_Value_Selection.decide_state.target
            readonly 'selection': self.resolver.Possible_Value_Selection.decide_state.selection
            readonly 'options': self.resolver.Possible_Value_Selection.decide_state.options
        }
        
        export namespace optional_value {
            
            export type selection = self.resolver.Guaranteed_Value_Selection
            
            export type tail = self.resolver.Relative_Value_Selection
        }
        
        export type optional_value = {
            readonly 'selection': self.resolver.Possible_Value_Selection.optional_value.selection
            readonly 'tail': self.resolver.Possible_Value_Selection.optional_value.tail
        }
        
        export type parameter = string
        
        export namespace result {
            
            export namespace state {
                
                export type property = string
            }
            
            export type state = {
                readonly 'property': self.resolver.Possible_Value_Selection.result.state.property
            }
            
            export namespace optional_value {
                
                export type property = string
            }
            
            export type optional_value = {
                readonly 'property': self.resolver.Possible_Value_Selection.result.optional_value.property
            }
        }
        
        export type result =
            | readonly ['state', self.resolver.Possible_Value_Selection.result.state]
            | readonly ['optional value', self.resolver.Possible_Value_Selection.result.optional_value]
    }
    
    export type Possible_Value_Selection =
        | readonly ['decide state', self.resolver.Possible_Value_Selection.decide_state]
        | readonly ['optional value', self.resolver.Possible_Value_Selection.optional_value]
        | readonly ['parameter', self.resolver.Possible_Value_Selection.parameter]
        | readonly ['result', self.resolver.Possible_Value_Selection.result]
    
    export namespace Option_Constraints {
        
        export namespace O {
            
            export namespace D {
                
                export namespace state {
                    
                    export type selection = self.resolver.Guaranteed_Value_Selection
                    
                    export type option = string
                }
                
                export type state = {
                    readonly 'selection': self.resolver.Option_Constraints.O.D.state.selection
                    readonly 'option': self.resolver.Option_Constraints.O.D.state.option
                }
                
                export type assert_is_set = self.resolver.Possible_Value_Selection
            }
            
            export type D =
                | readonly ['state', self.resolver.Option_Constraints.O.D.state]
                | readonly ['assert is set', self.resolver.Option_Constraints.O.D.assert_is_set]
        }
        
        export type O = p_.Dictionary<self.resolver.Option_Constraints.O.D>
    }
    
    export type Option_Constraints = p_.Optional_Value<self.resolver.Option_Constraints.O>
    
    export namespace Guaranteed_Value_Selection {
        
        export namespace start {
            
            export namespace optional_fallback {
                
                export type selection = self.resolver.Possible_Value_Selection
                
                export type fallback = self.resolver.Guaranteed_Value_Selection
            }
            
            export type optional_fallback = {
                readonly 'selection': self.resolver.Guaranteed_Value_Selection.start.optional_fallback.selection
                readonly 'fallback': self.resolver.Guaranteed_Value_Selection.start.optional_fallback.fallback
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
                    readonly 'property': self.resolver.Guaranteed_Value_Selection.start.constraint.component.property
                    readonly 'constraint': self.resolver.Guaranteed_Value_Selection.start.constraint.component.constraint
                }
                
                export namespace reference {
                    
                    export type property = string
                    
                    export type constraint = string
                }
                
                export type reference = {
                    readonly 'property': self.resolver.Guaranteed_Value_Selection.start.constraint.reference.property
                    readonly 'constraint': self.resolver.Guaranteed_Value_Selection.start.constraint.reference.constraint
                }
            }
            
            export type constraint =
                | readonly ['component', self.resolver.Guaranteed_Value_Selection.start.constraint.component]
                | readonly ['reference', self.resolver.Guaranteed_Value_Selection.start.constraint.reference]
            
            export type parameter = string
            
            export namespace result {
                
                export namespace list {
                    
                    export type property = string
                }
                
                export type list = {
                    readonly 'property': self.resolver.Guaranteed_Value_Selection.start.result.list.property
                }
                
                export namespace state {
                    
                    export type property = string
                }
                
                export type state = {
                    readonly 'property': self.resolver.Guaranteed_Value_Selection.start.result.state.property
                }
            }
            
            export type result =
                | readonly ['list', self.resolver.Guaranteed_Value_Selection.start.result.list]
                | readonly ['state', self.resolver.Guaranteed_Value_Selection.start.result.state]
        }
        
        export type start =
            | readonly ['optional fallback', self.resolver.Guaranteed_Value_Selection.start.optional_fallback]
            | readonly ['sibling property', self.resolver.Guaranteed_Value_Selection.start.sibling_property]
            | readonly ['parent sibling', self.resolver.Guaranteed_Value_Selection.start.parent_sibling]
            | readonly ['option constraint', self.resolver.Guaranteed_Value_Selection.start.option_constraint]
            | readonly ['sibling option constraint', self.resolver.Guaranteed_Value_Selection.start.sibling_option_constraint]
            | readonly ['list cursor', self.resolver.Guaranteed_Value_Selection.start.list_cursor]
            | readonly ['linked entry', self.resolver.Guaranteed_Value_Selection.start.linked_entry]
            | readonly ['constraint', self.resolver.Guaranteed_Value_Selection.start.constraint]
            | readonly ['parameter', self.resolver.Guaranteed_Value_Selection.start.parameter]
            | readonly ['result', self.resolver.Guaranteed_Value_Selection.start.result]
        
        export type tail = self.resolver.Relative_Value_Selection
    }
    
    export type Guaranteed_Value_Selection = {
        readonly 'start': self.resolver.Guaranteed_Value_Selection.start
        readonly 'tail': self.resolver.Guaranteed_Value_Selection.tail
    }
    
    export namespace Lookup_Selection {
        
        export namespace type_ {
            
            export namespace acyclic {
                
                export type siblings = null
                
                export namespace resolved_dictionary {
                    
                    export type selection = self.resolver.Guaranteed_Value_Selection
                }
                
                export type resolved_dictionary = {
                    readonly 'selection': self.resolver.Lookup_Selection.type_.acyclic.resolved_dictionary.selection
                }
            }
            
            export type acyclic =
                | readonly ['siblings', self.resolver.Lookup_Selection.type_.acyclic.siblings]
                | readonly ['resolved dictionary', self.resolver.Lookup_Selection.type_.acyclic.resolved_dictionary]
            
            export namespace cyclic {
                
                export type siblings = null
            }
            
            export type cyclic =
                | readonly ['siblings', self.resolver.Lookup_Selection.type_.cyclic.siblings]
            
            export type parameter = string
        }
        
        export type type_ =
            | readonly ['acyclic', self.resolver.Lookup_Selection.type_.acyclic]
            | readonly ['cyclic', self.resolver.Lookup_Selection.type_.cyclic]
            | readonly ['parameter', self.resolver.Lookup_Selection.type_.parameter]
    }
    
    export type Lookup_Selection = {
        readonly 'type': self.resolver.Lookup_Selection.type_
    }
    
    export namespace Reference_Constraints {
        
        export namespace O {
            
            export namespace D {
                
                export namespace start {
                    
                    export type value = null
                    
                    export type sibling = string
                }
                
                export type start =
                    | readonly ['value', self.resolver.Reference_Constraints.O.D.start.value]
                    | readonly ['sibling', self.resolver.Reference_Constraints.O.D.start.sibling]
                
                export namespace constraint {
                    
                    export type selection = self.resolver.Relative_Value_Selection
                    
                    export namespace type_ {
                        
                        export namespace state {
                            
                            export type option = string
                        }
                        
                        export type state = {
                            readonly 'option': self.resolver.Reference_Constraints.O.D.constraint.type_.state.option
                        }
                        
                        export namespace optional_value {}
                        
                        export type optional_value = null
                    }
                    
                    export type type_ =
                        | readonly ['state', self.resolver.Reference_Constraints.O.D.constraint.type_.state]
                        | readonly ['optional value', self.resolver.Reference_Constraints.O.D.constraint.type_.optional_value]
                }
                
                export type constraint = {
                    readonly 'selection': self.resolver.Reference_Constraints.O.D.constraint.selection
                    readonly 'type': self.resolver.Reference_Constraints.O.D.constraint.type_
                }
            }
            
            export type D = {
                readonly 'start': self.resolver.Reference_Constraints.O.D.start
                readonly 'constraint': self.resolver.Reference_Constraints.O.D.constraint
            }
        }
        
        export type O = p_.Dictionary<self.resolver.Reference_Constraints.O.D>
    }
    
    export type Reference_Constraints = p_.Optional_Value<self.resolver.Reference_Constraints.O>
    
    export namespace Resolver {
        
        export namespace namespaces {
            
            export type D = self.resolver.Resolver
        }
        
        export type namespaces = p_.Dictionary<self.resolver.Resolver.namespaces.D>
        
        export namespace types {
            
            export namespace D {
                
                export type root_value_resolver = self.resolver.Value
            }
            
            export type D = {
                readonly 'root value resolver': self.resolver.Resolver.types.D.root_value_resolver
            }
        }
        
        export type types = p_.Dictionary<self.resolver.Resolver.types.D>
    }
    
    export type Resolver = {
        readonly 'namespaces': self.resolver.Resolver.namespaces
        readonly 'types': self.resolver.Resolver.types
    }
    
    export namespace Result_Selection {
        
        export type context = self.resolver.Guaranteed_Value_Selection
        
        export type value = self.resolver.Relative_Value_Selection
    }
    
    export type Result_Selection =
        | readonly ['context', self.resolver.Result_Selection.context]
        | readonly ['value', self.resolver.Result_Selection.value]
    
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
            
            export namespace location {
                
                export type local = string
                
                export namespace child_namespace {
                    
                    export type namespace = string
                    
                    export type resolver = string
                }
                
                export type child_namespace = {
                    readonly 'namespace': self.resolver.Value.component.location.child_namespace.namespace
                    readonly 'resolver': self.resolver.Value.component.location.child_namespace.resolver
                }
                
                export namespace sibling_namespace {
                    
                    export type namespace = string
                    
                    export type resolver = string
                }
                
                export type sibling_namespace = {
                    readonly 'namespace': self.resolver.Value.component.location.sibling_namespace.namespace
                    readonly 'resolver': self.resolver.Value.component.location.sibling_namespace.resolver
                }
            }
            
            export type location =
                | readonly ['local', self.resolver.Value.component.location.local]
                | readonly ['child namespace', self.resolver.Value.component.location.child_namespace]
                | readonly ['sibling namespace', self.resolver.Value.component.location.sibling_namespace]
            
            export namespace arguments_ {
                
                export namespace O {
                    
                    export namespace types {
                        
                        export namespace O {
                            
                            export namespace D {
                                
                                export namespace optional {
                                    
                                    export type not_set = null
                                    
                                    export type set_ = self.resolver.Guaranteed_Value_Selection
                                    
                                    export type selection = self.resolver.Possible_Value_Selection
                                }
                                
                                export type optional =
                                    | readonly ['not set', self.resolver.Value.component.arguments_.O.types.O.D.optional.not_set]
                                    | readonly ['set', self.resolver.Value.component.arguments_.O.types.O.D.optional.set_]
                                    | readonly ['selection', self.resolver.Value.component.arguments_.O.types.O.D.optional.selection]
                                
                                export type required = self.resolver.Guaranteed_Value_Selection
                                
                                export type parameter = string
                            }
                            
                            export type D =
                                | readonly ['optional', self.resolver.Value.component.arguments_.O.types.O.D.optional]
                                | readonly ['required', self.resolver.Value.component.arguments_.O.types.O.D.required]
                                | readonly ['parameter', self.resolver.Value.component.arguments_.O.types.O.D.parameter]
                        }
                        
                        export type O = p_.Dictionary<self.resolver.Value.component.arguments_.O.types.O.D>
                    }
                    
                    export type types = p_.Optional_Value<self.resolver.Value.component.arguments_.O.types.O>
                    
                    export namespace lookups {
                        
                        export namespace O {
                            
                            export namespace D {
                                
                                export type acyclic = null
                                
                                export type cyclic = null
                                
                                export type selection = self.resolver.Lookup_Selection
                            }
                            
                            export type D =
                                | readonly ['acyclic', self.resolver.Value.component.arguments_.O.lookups.O.D.acyclic]
                                | readonly ['cyclic', self.resolver.Value.component.arguments_.O.lookups.O.D.cyclic]
                                | readonly ['selection', self.resolver.Value.component.arguments_.O.lookups.O.D.selection]
                        }
                        
                        export type O = p_.Dictionary<self.resolver.Value.component.arguments_.O.lookups.O.D>
                    }
                    
                    export type lookups = p_.Optional_Value<self.resolver.Value.component.arguments_.O.lookups.O>
                }
                
                export type O = {
                    readonly 'types': self.resolver.Value.component.arguments_.O.types
                    readonly 'lookups': self.resolver.Value.component.arguments_.O.lookups
                }
            }
            
            export type arguments_ = p_.Optional_Value<self.resolver.Value.component.arguments_.O>
            
            export type constraints = self.resolver.Reference_Constraints
        }
        
        export type component = {
            readonly 'location': self.resolver.Value.component.location
            readonly 'arguments': self.resolver.Value.component.arguments_
            readonly 'constraints': self.resolver.Value.component.constraints
        }
        
        export namespace dictionary {
            
            export type resolver = self.resolver.Value
            
            export namespace benchmark {
                
                export namespace O {
                    
                    export type selection = self.resolver.Guaranteed_Value_Selection
                }
                
                export type O = {
                    readonly 'selection': self.resolver.Value.dictionary.benchmark.O.selection
                }
            }
            
            export type benchmark = p_.Optional_Value<self.resolver.Value.dictionary.benchmark.O>
        }
        
        export type dictionary = {
            readonly 'resolver': self.resolver.Value.dictionary.resolver
            readonly 'benchmark': self.resolver.Value.dictionary.benchmark
        }
        
        export namespace group {
            
            export namespace D {
                
                export type resolver = self.resolver.Value
            }
            
            export type D = {
                readonly 'resolver': self.resolver.Value.group.D.resolver
            }
        }
        
        export type group = p_.Dictionary<self.resolver.Value.group.D>
        
        export namespace list {
            
            export type resolver = self.resolver.Value
            
            export namespace result {
                
                export namespace O {
                    
                    export type initial = self.resolver.Guaranteed_Value_Selection
                    
                    export type next = self.resolver.Result_Selection
                }
                
                export type O = {
                    readonly 'initial': self.resolver.Value.list.result.O.initial
                    readonly 'next': self.resolver.Value.list.result.O.next
                }
            }
            
            export type result = p_.Optional_Value<self.resolver.Value.list.result.O>
        }
        
        export type list = {
            readonly 'resolver': self.resolver.Value.list.resolver
            readonly 'result': self.resolver.Value.list.result
        }
        
        export type nothing = null
        
        export type simple = null
        
        export namespace optional {
            
            export namespace presence {
                
                export type O = self.resolver.Possible_Value_Selection
            }
            
            export type presence = p_.Optional_Value<self.resolver.Value.optional.presence.O>
            
            export type constraints = self.resolver.Option_Constraints
            
            export type resolver = self.resolver.Value
            
            export namespace not_set_constraints {
                
                export namespace O {
                    
                    export type D = self.resolver.Possible_Value_Selection
                }
                
                export type O = p_.Dictionary<self.resolver.Value.optional.not_set_constraints.O.D>
            }
            
            export type not_set_constraints = p_.Optional_Value<self.resolver.Value.optional.not_set_constraints.O>
            
            export namespace result {
                
                export type O = self.resolver.Result_Selection
            }
            
            export type result = p_.Optional_Value<self.resolver.Value.optional.result.O>
            
            export type checks = self.resolver.Checks
        }
        
        export type optional = {
            readonly 'presence': self.resolver.Value.optional.presence
            readonly 'constraints': self.resolver.Value.optional.constraints
            readonly 'resolver': self.resolver.Value.optional.resolver
            readonly 'not set constraints': self.resolver.Value.optional.not_set_constraints
            readonly 'result': self.resolver.Value.optional.result
            readonly 'checks': self.resolver.Value.optional.checks
        }
        
        export namespace reference {
            
            export namespace type_ {
                
                export type lookup = self.resolver.Lookup_Selection
                
                export type constraints = self.resolver.Reference_Constraints
            }
            
            export type type_ = {
                readonly 'lookup': self.resolver.Value.reference.type_.lookup
                readonly 'constraints': self.resolver.Value.reference.type_.constraints
            }
        }
        
        export type reference = {
            readonly 'type': self.resolver.Value.reference.type_
        }
        
        export namespace state {
            
            export namespace options {
                
                export namespace D {
                    
                    export type constraints = self.resolver.Option_Constraints
                    
                    export type resolver = self.resolver.Value
                    
                    export namespace result {
                        
                        export type O = self.resolver.Result_Selection
                    }
                    
                    export type result = p_.Optional_Value<self.resolver.Value.state.options.D.result.O>
                    
                    export type checks = self.resolver.Checks
                }
                
                export type D = {
                    readonly 'constraints': self.resolver.Value.state.options.D.constraints
                    readonly 'resolver': self.resolver.Value.state.options.D.resolver
                    readonly 'result': self.resolver.Value.state.options.D.result
                    readonly 'checks': self.resolver.Value.state.options.D.checks
                }
            }
            
            export type options = p_.Dictionary<self.resolver.Value.state.options.D>
        }
        
        export type state = {
            readonly 'options': self.resolver.Value.state.options
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
        
        export type file_extension = string
        
        export type type_ = string
    }
    
    export type file = {
        readonly 'file extension': self.Node.file.file_extension
        readonly 'type': self.Node.file.type_
    }
    
    export type directory = self.Directory
}

export type Node =
    | readonly ['file', self.Node.file]
    | readonly ['directory', self.Node.directory]

export namespace Type_Specification {
    
    export namespace schema {
        
        export type structure = self.structure.Structure
        
        export namespace resolver {
            
            export type declarations = self.declarations.Namespace
            
            export type implementations = self.resolver.Resolver
        }
        
        export type resolver = {
            readonly 'declarations': self.Type_Specification.schema.resolver.declarations
            readonly 'implementations': self.Type_Specification.schema.resolver.implementations
        }
    }
    
    export type schema = {
        readonly 'structure': self.Type_Specification.schema.structure
        readonly 'resolver': self.Type_Specification.schema.resolver
    }
    
    export type directory = self.Directory
}

export type Type_Specification = {
    readonly 'schema': self.Type_Specification.schema
    readonly 'directory': self.Type_Specification.directory
}
