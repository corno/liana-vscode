import * as p_ from 'pareto-core/schema'

// types

namespace Basic_Type_ {
    
    export namespace type_ {
        
        export type boolean_ = null
        
        export type date = null
        
        export namespace number_ {
            
            export namespace precision {
                
                export namespace approximation {
                    
                    export type significant_digits = number
                }
                
                export type approximation = {
                    readonly 'significant digits': approximation.significant_digits
                }
                
                export namespace exact {
                    
                    export namespace number_of_fractional_digits {
                        
                        export type O = number
                    }
                    
                    export type number_of_fractional_digits = p_.Optional_Value<
                        number_of_fractional_digits.O
                    >
                    
                    export namespace type_ {
                        
                        export type integer = null
                        
                        export type natural = null
                        
                        export type positive_natural = null
                    }
                    
                    export type type_ = 
                        | readonly ['integer', type_.integer]
                        | readonly ['natural', type_.natural]
                        | readonly ['positive natural', type_.positive_natural]
                }
                
                export type exact = {
                    readonly 'number of fractional digits': exact.number_of_fractional_digits
                    readonly 'type': exact.type_
                }
            }
            
            export type precision = 
                | readonly ['approximation', precision.approximation]
                | readonly ['exact', precision.exact]
        }
        
        export type number_ = {
            readonly 'precision': number_.precision
        }
        
        export namespace text {
            
            export namespace type_ {
                
                export type multi_line = null
                
                export type single_line = null
            }
            
            export type type_ = 
                | readonly ['multi line', type_.multi_line]
                | readonly ['single line', type_.single_line]
            
            export namespace link {
                
                export type no = null
                
                export namespace yes {
                    
                    export type path_prefix = string
                    
                    export type path_suffix = string
                }
                
                export type yes = {
                    readonly 'path prefix': yes.path_prefix
                    readonly 'path suffix': yes.path_suffix
                }
            }
            
            export type link = 
                | readonly ['no', link.no]
                | readonly ['yes', link.yes]
        }
        
        export type text = {
            readonly 'type': text.type_
            readonly 'link': text.link
        }
    }
    
    export type type_ = 
        | readonly ['boolean', type_.boolean_]
        | readonly ['date', type_.date]
        | readonly ['number', type_.number_]
        | readonly ['text', type_.text]
}

type Basic_Type_ = {
    readonly 'type': Basic_Type_.type_
}

namespace Basic_Types_ {
    
    export type D = Basic_Type_
}

type Basic_Types_ = p_.Dictionary<
    Basic_Types_.D
>

namespace Dictionary_ {
    
    export type value = Value_
}

type Dictionary_ = {
    readonly 'value': Dictionary_.value
}

namespace Group_ {
    
    export namespace D {
        
        export namespace description {
            
            export type O = string
        }
        
        export type description = p_.Optional_Value<
            description.O
        >
        
        export type value = Value_
    }
    
    export type D = {
        readonly 'description': D.description
        readonly 'value': D.value
    }
}

type Group_ = p_.Dictionary<
    Group_.D
>

namespace Types_ {
    
    export type D = Type_
}

type Types_ = p_.Dictionary<
    Types_.D
>

namespace Value_ {
    
    export namespace component {
        
        export namespace type_ {
            
            export type internal = string
            
            export type internal_acyclic = string
        }
        
        export type type_ = 
            | readonly ['internal', type_.internal]
            | readonly ['internal acyclic', type_.internal_acyclic]
        
        export type results = Value_Results_
    }
    
    export type component = {
        readonly 'type': component.type_
        readonly 'results': component.results
    }
    
    export type dictionary = Dictionary_
    
    export type group = Group_
    
    export namespace list {
        
        export type value = Value_
        
        export type results = Value_Results_
    }
    
    export type list = {
        readonly 'value': list.value
        readonly 'results': list.results
    }
    
    export type nothing = null
    
    export type simple = string
    
    export type optional = Value_
    
    export namespace reference {
        
        export type referent = Value_Reference_
        
        export namespace type_ {
            
            export type derived = null
            
            export namespace selected {
                
                export type dictionary = null
                
                export namespace dependency {
                    
                    export type acyclic = null
                    
                    export type cyclic = null
                }
                
                export type dependency = 
                    | readonly ['acyclic', dependency.acyclic]
                    | readonly ['cyclic', dependency.cyclic]
                
                export type results = Value_Results_
            }
            
            export type selected = {
                readonly 'dictionary': selected.dictionary
                readonly 'dependency': selected.dependency
                readonly 'results': selected.results
            }
        }
        
        export type type_ = 
            | readonly ['derived', type_.derived]
            | readonly ['selected', type_.selected]
    }
    
    export type reference = {
        readonly 'referent': reference.referent
        readonly 'type': reference.type_
    }
    
    export namespace state {
        
        export namespace options {
            
            export namespace D {
                
                export type constraints = Option_Constraints_
                
                export namespace description {
                    
                    export type O = string
                }
                
                export type description = p_.Optional_Value<
                    description.O
                >
                
                export type value = Value_
            }
            
            export type D = {
                readonly 'constraints': D.constraints
                readonly 'description': D.description
                readonly 'value': D.value
            }
        }
        
        export type options = p_.Dictionary<
            options.D
        >
        
        export type results = Value_Results_
    }
    
    export type state = {
        readonly 'options': state.options
        readonly 'results': state.results
    }
}

type Value_ = 
    | readonly ['component', Value_.component]
    | readonly ['dictionary', Value_.dictionary]
    | readonly ['group', Value_.group]
    | readonly ['list', Value_.list]
    | readonly ['nothing', Value_.nothing]
    | readonly ['simple', Value_.simple]
    | readonly ['optional', Value_.optional]
    | readonly ['reference', Value_.reference]
    | readonly ['state', Value_.state]

namespace Type_ {
    
    export type root_value = Value_
}

type Type_ = {
    readonly 'root value': Type_.root_value
}

namespace Type_Reference_ {
    
    export namespace location {
        
        export type internal = string
    }
    
    export type location = 
        | readonly ['internal', location.internal]
    
    export type resulting_type = null
}

type Type_Reference_ = {
    readonly 'location': Type_Reference_.location
    readonly 'resulting type': Type_Reference_.resulting_type
}

namespace Value_Path_ {
    
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
    
    export type resulting_node = null
}

type Value_Path_ = {
    readonly 'tail': Value_Path_.tail
    readonly 'resulting node': Value_Path_.resulting_node
}

namespace Value_Reference_ {
    
    export type type_ = Type_Reference_
    
    export type path = Value_Path_
}

type Value_Reference_ = {
    readonly 'type': Value_Reference_.type_
    readonly 'path': Value_Reference_.path
}

namespace Option_Constraints_ {
    
    export namespace O {
        
        export type D = Value_Reference_
    }
    
    export type O = p_.Dictionary<
        O.D
    >
}

type Option_Constraints_ = p_.Optional_Value<
    Option_Constraints_.O
>

namespace Presence_ {
    
    export type optional = null
    
    export type required = null
}

type Presence_ = 
    | readonly ['optional', Presence_.optional]
    | readonly ['required', Presence_.required]

namespace Resolver_Value_Group_ {
    
    export namespace D {
        
        export type definition = null
        
        export type resolver = Resolver_Value_
    }
    
    export type D = {
        readonly 'definition': D.definition
        readonly 'resolver': D.resolver
    }
}

type Resolver_Value_Group_ = p_.Dictionary<
    Resolver_Value_Group_.D
>

namespace Resolver_Signature_Parameters_ {
    
    export namespace types {
        
        export namespace D {
            
            export type type_ = Type_Reference_
            
            export type presence = Presence_
        }
        
        export type D = {
            readonly 'type': D.type_
            readonly 'presence': D.presence
        }
    }
    
    export type types = p_.Dictionary<
        types.D
    >
    
    export namespace lookups {
        
        export namespace D {
            
            export type referent = Type_Reference_
            
            export type dictionary = null
            
            export namespace type_ {
                
                export type cyclic = null
                
                export type acyclic = null
            }
            
            export type type_ = 
                | readonly ['cyclic', type_.cyclic]
                | readonly ['acyclic', type_.acyclic]
            
            export type presence = Presence_
        }
        
        export type D = {
            readonly 'referent': D.referent
            readonly 'dictionary': D.dictionary
            readonly 'type': D.type_
            readonly 'presence': D.presence
        }
    }
    
    export type lookups = p_.Dictionary<
        lookups.D
    >
}

type Resolver_Signature_Parameters_ = {
    readonly 'types': Resolver_Signature_Parameters_.types
    readonly 'lookups': Resolver_Signature_Parameters_.lookups
}

namespace Resolver_Signatures_ {
    
    export type D = Resolver_Signature_
}

type Resolver_Signatures_ = p_.Dictionary<
    Resolver_Signatures_.D
>

namespace Resolver_Value_Constraints_ {
    
    export type D = Resolver_Value_Constraint_
}

type Resolver_Value_Constraints_ = p_.Dictionary<
    Resolver_Value_Constraints_.D
>

type Resolver_Value_List_Result_ = Type_Reference_

namespace Resolver_Value_ {
    
    export namespace component {
        
        export type definition = null
        
        export namespace location {
            
            export type internal = string
        }
        
        export type location = 
            | readonly ['internal', location.internal]
        
        export type signature = null
        
        export namespace arguments_ {
            
            export namespace O {
                
                export namespace types {
                    
                    export namespace O {
                        
                        export namespace D {
                            
                            export type optional = Resolver_Optional_Value_Initialization_
                            
                            export type required = Resolver_Guaranteed_Value_Selection_
                            
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
                            
                            export namespace acyclic {
                                
                                export type not_set = null
                            }
                            
                            export type acyclic = 
                                | readonly ['not set', acyclic.not_set]
                            
                            export namespace cyclic {
                                
                                export type not_set = null
                            }
                            
                            export type cyclic = 
                                | readonly ['not set', cyclic.not_set]
                            
                            export type selection = Resolver_Lookup_Selection_
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
        
        export type constraints = Resolver_Value_Constraints_
    }
    
    export type component = {
        readonly 'definition': component.definition
        readonly 'location': component.location
        readonly 'signature': component.signature
        readonly 'arguments': component.arguments_
        readonly 'constraints': component.constraints
    }
    
    export namespace dictionary {
        
        export type definition = null
        
        export type resolver = Resolver_Value_
        
        export namespace benchmark {
            
            export type O = Resolver_Benchmark_
        }
        
        export type benchmark = p_.Optional_Value<
            benchmark.O
        >
    }
    
    export type dictionary = {
        readonly 'definition': dictionary.definition
        readonly 'resolver': dictionary.resolver
        readonly 'benchmark': dictionary.benchmark
    }
    
    export type group = Resolver_Value_Group_
    
    export namespace list {
        
        export type definition = null
        
        export type resolver = Resolver_Value_
        
        export namespace result {
            
            export type O = Resolver_Value_List_Result_
        }
        
        export type result = p_.Optional_Value<
            result.O
        >
    }
    
    export type list = {
        readonly 'definition': list.definition
        readonly 'resolver': list.resolver
        readonly 'result': list.result
    }
    
    export type nothing = null
    
    export type simple = null
    
    export namespace optional {
        
        export type constraints = Resolver_Option_Constraints_
        
        export type resolver = Resolver_Value_
    }
    
    export type optional = {
        readonly 'constraints': optional.constraints
        readonly 'resolver': optional.resolver
    }
    
    export namespace reference {
        
        export type definition = null
        
        export namespace type_ {
            
            export namespace derived {
                
                export type value = Resolver_Guaranteed_Value_Selection_
            }
            
            export type derived = {
                readonly 'value': derived.value
            }
            
            export namespace selected {
                
                export type definition = null
                
                export type lookup = Resolver_Lookup_Selection_
                
                export type constraints = Resolver_Value_Constraints_
            }
            
            export type selected = {
                readonly 'definition': selected.definition
                readonly 'lookup': selected.lookup
                readonly 'constraints': selected.constraints
            }
        }
        
        export type type_ = 
            | readonly ['derived', type_.derived]
            | readonly ['selected', type_.selected]
    }
    
    export type reference = {
        readonly 'definition': reference.definition
        readonly 'type': reference.type_
    }
    
    export namespace state {
        
        export type definition = null
        
        export namespace options {
            
            export namespace D {
                
                export type constraints = Resolver_Option_Constraints_
                
                export type resolver = Resolver_Value_
            }
            
            export type D = {
                readonly 'constraints': D.constraints
                readonly 'resolver': D.resolver
            }
        }
        
        export type options = p_.Dictionary<
            options.D
        >
    }
    
    export type state = {
        readonly 'definition': state.definition
        readonly 'options': state.options
    }
}

type Resolver_Value_ = 
    | readonly ['component', Resolver_Value_.component]
    | readonly ['dictionary', Resolver_Value_.dictionary]
    | readonly ['group', Resolver_Value_.group]
    | readonly ['list', Resolver_Value_.list]
    | readonly ['nothing', Resolver_Value_.nothing]
    | readonly ['simple', Resolver_Value_.simple]
    | readonly ['optional', Resolver_Value_.optional]
    | readonly ['reference', Resolver_Value_.reference]
    | readonly ['state', Resolver_Value_.state]

namespace Resolver_Possible_Value_Selection_ {
    
    export type parameter = string
    
    export namespace result {
        
        export namespace state {
            
            export type property = string
            
            export type state = null
            
            export type result = Type_Reference_
        }
        
        export type state = {
            readonly 'property': state.property
            readonly 'state': state.state
            readonly 'result': state.result
        }
        
        export namespace optional_value {
            
            export type property = string
            
            export type optional_value = null
            
            export type result = Type_Reference_
        }
        
        export type optional_value = {
            readonly 'property': optional_value.property
            readonly 'optional value': optional_value.optional_value
            readonly 'result': optional_value.result
        }
    }
    
    export type result = 
        | readonly ['state', result.state]
        | readonly ['optional value', result.optional_value]
}

type Resolver_Possible_Value_Selection_ = 
    | readonly ['parameter', Resolver_Possible_Value_Selection_.parameter]
    | readonly ['result', Resolver_Possible_Value_Selection_.result]

namespace Resolver_Option_Constraints_ {
    
    export namespace D {
        
        export namespace state {
            
            export type selection = Resolver_Guaranteed_Value_Selection_
            
            export type selected_state = null
            
            export type option = string
        }
        
        export type state = {
            readonly 'selection': state.selection
            readonly 'selected state': state.selected_state
            readonly 'option': state.option
        }
        
        export type assert_is_set = Resolver_Possible_Value_Selection_
    }
    
    export type D = 
        | readonly ['state', D.state]
        | readonly ['assert is set', D.assert_is_set]
}

type Resolver_Option_Constraints_ = p_.Dictionary<
    Resolver_Option_Constraints_.D
>

namespace Resolver_Relative_Value_Selection_ {
    
    export namespace path {
        
        export namespace L {
            
            export type component = null
            
            export type group = string
            
            export namespace reference {
                
                export type definition = null
            }
            
            export type reference = {
                readonly 'definition': reference.definition
            }
        }
        
        export type L = 
            | readonly ['component', L.component]
            | readonly ['group', L.group]
            | readonly ['reference', L.reference]
    }
    
    export type path = p_.List<
        path.L
    >
    
    export type resulting_node = null
}

type Resolver_Relative_Value_Selection_ = {
    readonly 'path': Resolver_Relative_Value_Selection_.path
    readonly 'resulting node': Resolver_Relative_Value_Selection_.resulting_node
}

namespace Resolver_Guaranteed_Value_Selection_ {
    
    export namespace start {
        
        export type sibling = string
        
        export type parent_sibling = string
        
        export type option_constraint = string
        
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
                
                export type list_result = null
            }
            
            export type list = {
                readonly 'property': list.property
                readonly 'list result': list.list_result
            }
            
            export namespace state {
                
                export type property = string
                
                export type state = null
                
                export type result = Type_Reference_
            }
            
            export type state = {
                readonly 'property': state.property
                readonly 'state': state.state
                readonly 'result': state.result
            }
            
            export namespace optional_value {
                
                export type property = string
                
                export type optional_value = null
                
                export type result = Type_Reference_
            }
            
            export type optional_value = {
                readonly 'property': optional_value.property
                readonly 'optional value': optional_value.optional_value
                readonly 'result': optional_value.result
            }
        }
        
        export type result = 
            | readonly ['list', result.list]
            | readonly ['state', result.state]
            | readonly ['optional value', result.optional_value]
    }
    
    export type start = 
        | readonly ['sibling', start.sibling]
        | readonly ['parent sibling', start.parent_sibling]
        | readonly ['option constraint', start.option_constraint]
        | readonly ['list cursor', start.list_cursor]
        | readonly ['linked entry', start.linked_entry]
        | readonly ['constraint', start.constraint]
        | readonly ['parameter', start.parameter]
        | readonly ['result', start.result]
    
    export type tail = Resolver_Relative_Value_Selection_
    
    export type resulting_node = null
}

type Resolver_Guaranteed_Value_Selection_ = {
    readonly 'start': Resolver_Guaranteed_Value_Selection_.start
    readonly 'tail': Resolver_Guaranteed_Value_Selection_.tail
    readonly 'resulting node': Resolver_Guaranteed_Value_Selection_.resulting_node
}

namespace Resolver_Benchmark_ {
    
    export type selection = Resolver_Guaranteed_Value_Selection_
    
    export type resulting_dictionary = null
    
    export type dense = boolean
}

type Resolver_Benchmark_ = {
    readonly 'selection': Resolver_Benchmark_.selection
    readonly 'resulting dictionary': Resolver_Benchmark_.resulting_dictionary
    readonly 'dense': Resolver_Benchmark_.dense
}

namespace Resolver_Constraint_ {
    
    export type selection = Resolver_Relative_Value_Selection_
    
    export namespace type_ {
        
        export namespace state {
            
            export type selected_state = null
            
            export type option = string
        }
        
        export type state = {
            readonly 'selected state': state.selected_state
            readonly 'option': state.option
        }
        
        export namespace optional_value {
            
            export type selected_optional_value = null
        }
        
        export type optional_value = {
            readonly 'selected optional value': optional_value.selected_optional_value
        }
    }
    
    export type type_ = 
        | readonly ['state', type_.state]
        | readonly ['optional value', type_.optional_value]
}

type Resolver_Constraint_ = {
    readonly 'selection': Resolver_Constraint_.selection
    readonly 'type': Resolver_Constraint_.type_
}

namespace Resolver_Lookup_Selection_ {
    
    export namespace type_ {
        
        export namespace acyclic {
            
            export type siblings = null
            
            export namespace resolved_dictionary {
                
                export type selection = Resolver_Guaranteed_Value_Selection_
                
                export type selected_dictionary = null
            }
            
            export type resolved_dictionary = {
                readonly 'selection': resolved_dictionary.selection
                readonly 'selected dictionary': resolved_dictionary.selected_dictionary
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
    
    export type resulting_dictionary = null
}

type Resolver_Lookup_Selection_ = {
    readonly 'type': Resolver_Lookup_Selection_.type_
    readonly 'resulting dictionary': Resolver_Lookup_Selection_.resulting_dictionary
}

namespace Resolver_Optional_Value_Constraints_ {
    
    export type O = Resolver_Value_Constraints_
}

type Resolver_Optional_Value_Constraints_ = p_.Optional_Value<
    Resolver_Optional_Value_Constraints_.O
>

namespace Resolver_Optional_Value_Initialization_ {
    
    export type not_set = null
    
    export type set_ = Resolver_Guaranteed_Value_Selection_
    
    export type selection = Resolver_Possible_Value_Selection_
}

type Resolver_Optional_Value_Initialization_ = 
    | readonly ['not set', Resolver_Optional_Value_Initialization_.not_set]
    | readonly ['set', Resolver_Optional_Value_Initialization_.set_]
    | readonly ['selection', Resolver_Optional_Value_Initialization_.selection]

type Resolver_Reference_To_Value_Constraint_ = string

namespace Resolver_Signature_ {
    
    export type type_ = null
    
    export namespace parameters {
        
        export type local = Resolver_Signature_Parameters_
        
        export type same_as = string
    }
    
    export type parameters = 
        | readonly ['local', parameters.local]
        | readonly ['same as', parameters.same_as]
    
    export type resolved_parameters = null
}

type Resolver_Signature_ = {
    readonly 'type': Resolver_Signature_.type_
    readonly 'parameters': Resolver_Signature_.parameters
    readonly 'resolved parameters': Resolver_Signature_.resolved_parameters
}

namespace Resolver_Types_ {
    
    export namespace D {
        
        export type signature = null
        
        export type root_value_resolver = Resolver_Value_
    }
    
    export type D = {
        readonly 'signature': D.signature
        readonly 'root value resolver': D.root_value_resolver
    }
}

type Resolver_Types_ = p_.Dictionary<
    Resolver_Types_.D
>

namespace Resolver_Value_Constraint_ {
    
    export namespace start {
        
        export type value = null
        
        export type sibling = Resolver_Reference_To_Value_Constraint_
    }
    
    export type start = 
        | readonly ['value', start.value]
        | readonly ['sibling', start.sibling]
    
    export type constraint = Resolver_Constraint_
}

type Resolver_Value_Constraint_ = {
    readonly 'start': Resolver_Value_Constraint_.start
    readonly 'constraint': Resolver_Value_Constraint_.constraint
}

namespace Schema_ {
    
    export type basic_types = Basic_Types_
    
    export type types = Types_
    
    export type signatures = Resolver_Signatures_
    
    export type resolvers = Resolver_Types_
}

type Schema_ = {
    readonly 'basic types': Schema_.basic_types
    readonly 'types': Schema_.types
    readonly 'signatures': Schema_.signatures
    readonly 'resolvers': Schema_.resolvers
}

namespace Type_Specification_ {
    
    export type schema = Schema_
    
    export type root_type = string
}

type Type_Specification_ = {
    readonly 'schema': Type_Specification_.schema
    readonly 'root type': Type_Specification_.root_type
}

namespace Value_Results_ {
    
    export namespace O {
        
        export type D = Value_Reference_
    }
    
    export type O = p_.Dictionary<
        O.D
    >
}

type Value_Results_ = p_.Optional_Value<
    Value_Results_.O
>

// exported root types
export { 
    type Basic_Type_ as Basic_Type, 
    type Basic_Types_ as Basic_Types, 
    type Dictionary_ as Dictionary, 
    type Group_ as Group, 
    type Types_ as Types, 
    type Value_ as Value, 
    type Type_ as Type, 
    type Type_Reference_ as Type_Reference, 
    type Value_Path_ as Value_Path, 
    type Value_Reference_ as Value_Reference, 
    type Option_Constraints_ as Option_Constraints, 
    type Presence_ as Presence, 
    type Resolver_Value_Group_ as Resolver_Value_Group, 
    type Resolver_Signature_Parameters_ as Resolver_Signature_Parameters, 
    type Resolver_Signatures_ as Resolver_Signatures, 
    type Resolver_Value_Constraints_ as Resolver_Value_Constraints, 
    type Resolver_Value_List_Result_ as Resolver_Value_List_Result, 
    type Resolver_Value_ as Resolver_Value, 
    type Resolver_Possible_Value_Selection_ as Resolver_Possible_Value_Selection, 
    type Resolver_Option_Constraints_ as Resolver_Option_Constraints, 
    type Resolver_Relative_Value_Selection_ as Resolver_Relative_Value_Selection, 
    type Resolver_Guaranteed_Value_Selection_ as Resolver_Guaranteed_Value_Selection, 
    type Resolver_Benchmark_ as Resolver_Benchmark, 
    type Resolver_Constraint_ as Resolver_Constraint, 
    type Resolver_Lookup_Selection_ as Resolver_Lookup_Selection, 
    type Resolver_Optional_Value_Constraints_ as Resolver_Optional_Value_Constraints, 
    type Resolver_Optional_Value_Initialization_ as Resolver_Optional_Value_Initialization, 
    type Resolver_Reference_To_Value_Constraint_ as Resolver_Reference_To_Value_Constraint, 
    type Resolver_Signature_ as Resolver_Signature, 
    type Resolver_Types_ as Resolver_Types, 
    type Resolver_Value_Constraint_ as Resolver_Value_Constraint, 
    type Schema_ as Schema, 
    type Type_Specification_ as Type_Specification, 
    type Value_Results_ as Value_Results, 
}
