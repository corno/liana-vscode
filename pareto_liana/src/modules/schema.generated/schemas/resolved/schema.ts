
import * as p_i from 'pareto-core/__internal/Abort'
import * as p_di from 'pareto-core/schema'

export namespace Package_ {
    
    export type omit_$po_de$pc_serializer = boolean
    
    export type schema_tree = Schema_Tree_
    
}

export type Package_ = {
    readonly 'omit (de)serializer': Package_.omit_$po_de$pc_serializer
    readonly 'schema tree': Package_.schema_tree
}

export namespace Schemas_ {
    
    export type D = Schema_Tree_
    
}

export type Schemas_ = p_di.Dictionary<Schemas_.D>

export namespace Schema_ {
    
    export type schema_imports = Schema_Imports_
    
    export type resolver_imports = Resolver_Imports_
    
    export type globals = Globals_
    
    export type modules = Modules_
    
    export namespace complexity {
        
        export type constrained = Resolver_
        
        export type unconstrained = null
        
    }
    
    export type complexity = 
        | readonly ['constrained', complexity.constrained]
        | readonly ['unconstrained', complexity.unconstrained]
    
}

export type Schema_ = {
    readonly 'schema imports': Schema_.schema_imports
    readonly 'resolver imports': Schema_.resolver_imports
    readonly 'globals': Schema_.globals
    readonly 'modules': Schema_.modules
    readonly 'complexity': Schema_.complexity
}

export namespace Schema_Imports_ {
    
    export namespace D {
        
        export namespace schema_set_child {
            
            export namespace l_results {
                
                export type schema = Schema_
                
            }
            
            export type l_results = {
                readonly 'schema': l_results.schema
            }
            
            export namespace l_value {
                
                export type l_entry = Schemas_.D
                
                export type l_id = string
                
                export type l_up_steps = number
                
            }
            
            export type l_value = {
                readonly 'l entry': l_value.l_entry
                readonly 'l id': l_value.l_id
                readonly 'l up steps': l_value.l_up_steps
            }
            
        }
        
        export type schema_set_child = {
            readonly 'l results': schema_set_child.l_results
            readonly 'l value': schema_set_child.l_value
        }
        
        export type schema = Schema_
        
    }
    
    export type D = {
        readonly 'schema set child': D.schema_set_child
        readonly 'schema': D.schema
    }
    
}

export type Schema_Imports_ = p_di.Dictionary<Schema_Imports_.D>

export namespace Modules_ {
    
    export type D = Module_
    
}

export type Modules_ = p_di.Dictionary<Modules_.D>

export namespace Globals_ {
    
    export namespace complexity {
        
        export type constrained = null
        
        export type unconstrained = null
        
    }
    
    export type complexity = 
        | readonly ['constrained', complexity.constrained]
        | readonly ['unconstrained', complexity.unconstrained]
    
    export namespace text_types {
        
        export type D = Text_Type_
        
    }
    
    export type text_types = p_di.Dictionary<text_types.D>
    
    export namespace simple_types {
        
        export type D = Simple_Type_
        
    }
    
    export type simple_types = p_di.Dictionary<simple_types.D>
    
}

export type Globals_ = {
    readonly 'complexity': Globals_.complexity
    readonly 'text types': Globals_.text_types
    readonly 'simple types': Globals_.simple_types
}

export namespace Dictionary_ {
    
    export type value = Value_
    
}

export type Dictionary_ = {
    readonly 'value': Dictionary_.value
}

export namespace Value_ {
    
    export namespace component {
        
        export namespace type_ {
            
            export namespace external {
                
                export namespace import_ {
                    
                    export type l_entry = Schema_Imports_.D
                    
                    export type l_id = string
                    
                }
                
                export type import_ = {
                    readonly 'l entry': import_.l_entry
                    readonly 'l id': import_.l_id
                }
                
                export namespace module_ {
                    
                    export type l_entry = Modules_.D
                    
                    export type l_id = string
                    
                }
                
                export type module_ = {
                    readonly 'l entry': module_.l_entry
                    readonly 'l id': module_.l_id
                }
                
            }
            
            export type external = {
                readonly 'import': external.import_
                readonly 'module': external.module_
            }
            
            export namespace internal {
                
                export type l_entry = p_di.Circular_Dependency<Modules_.D>
                
                export type l_id = string
                
            }
            
            export type internal = {
                readonly 'l entry': internal.l_entry
                readonly 'l id': internal.l_id
            }
            
            export namespace internal_acyclic {
                
                export type l_entry = Modules_.D
                
                export type l_id = string
                
            }
            
            export type internal_acyclic = {
                readonly 'l entry': internal_acyclic.l_entry
                readonly 'l id': internal_acyclic.l_id
            }
            
        }
        
        export type type_ = 
            | readonly ['external', type_.external]
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
    
    export namespace simple {
        
        export namespace global {
            
            export type l_entry = Globals_.simple_types.D
            
            export type l_id = string
            
        }
        
        export type global = {
            readonly 'l entry': global.l_entry
            readonly 'l id': global.l_id
        }
        
    }
    
    export type simple = 
        | readonly ['global', simple.global]
    
    export type optional = Value_
    
    export namespace reference {
        
        export type referent = Value_Reference_
        
        export namespace type_ {
            
            export type derived = null
            
            export namespace selected {
                
                export type dictionary = Dictionary_
                
                export namespace dependency {
                    
                    export type acyclic = null
                    
                    export type cyclic = null
                    
                    export type stack = null
                    
                }
                
                export type dependency = 
                    | readonly ['acyclic', dependency.acyclic]
                    | readonly ['cyclic', dependency.cyclic]
                    | readonly ['stack', dependency.stack]
                
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
                
                export type description = p_di.Optional_Value<description.O>
                
                export type value = Value_
                
            }
            
            export type D = {
                readonly 'constraints': D.constraints
                readonly 'description': D.description
                readonly 'value': D.value
            }
            
        }
        
        export type options = p_di.Dictionary<options.D>
        
        export type results = Value_Results_
        
    }
    
    export type state = {
        readonly 'options': state.options
        readonly 'results': state.results
    }
    
    export namespace text {
        
        export namespace global {
            
            export type l_entry = Globals_.text_types.D
            
            export type l_id = string
            
        }
        
        export type global = {
            readonly 'l entry': global.l_entry
            readonly 'l id': global.l_id
        }
        
        export type local = Text_Type_
        
    }
    
    export type text = 
        | readonly ['global', text.global]
        | readonly ['local', text.local]
    
}

export type Value_ = 
    | readonly ['component', Value_.component]
    | readonly ['dictionary', Value_.dictionary]
    | readonly ['group', Value_.group]
    | readonly ['list', Value_.list]
    | readonly ['nothing', Value_.nothing]
    | readonly ['simple', Value_.simple]
    | readonly ['optional', Value_.optional]
    | readonly ['reference', Value_.reference]
    | readonly ['state', Value_.state]
    | readonly ['text', Value_.text]

export namespace Resolver_ {
    
    export namespace signatures {
        
        export type signatures = Resolver_Signatures_
        
    }
    
    export type signatures = {
        readonly 'signatures': signatures.signatures
    }
    
    export type modules = Resolver_Modules_
    
}

export type Resolver_ = {
    readonly 'signatures': Resolver_.signatures
    readonly 'modules': Resolver_.modules
}

export namespace Resolver_Imports_ {
    
    export namespace D {
        
        export namespace schema_set_child {
            
            export namespace l_results {
                
                export type resolver = Resolver_
                
            }
            
            export type l_results = {
                readonly 'resolver': l_results.resolver
            }
            
            export namespace l_value {
                
                export type l_entry = Schemas_.D
                
                export type l_id = string
                
                export type l_up_steps = number
                
            }
            
            export type l_value = {
                readonly 'l entry': l_value.l_entry
                readonly 'l id': l_value.l_id
                readonly 'l up steps': l_value.l_up_steps
            }
            
        }
        
        export type schema_set_child = {
            readonly 'l results': schema_set_child.l_results
            readonly 'l value': schema_set_child.l_value
        }
        
        export type resolver = Resolver_
        
    }
    
    export type D = {
        readonly 'schema set child': D.schema_set_child
        readonly 'resolver': D.resolver
    }
    
}

export type Resolver_Imports_ = p_di.Dictionary<Resolver_Imports_.D>

export namespace Resolver_Signatures_ {
    
    export type D = Resolver_Signature_
    
}

export type Resolver_Signatures_ = p_di.Dictionary<Resolver_Signatures_.D>

export namespace Resolver_Signature_Parameters_ {
    
    export namespace modules {
        
        export namespace D {
            
            export type module_ = Module_Reference_
            
            export type presence = Presence_
            
        }
        
        export type D = {
            readonly 'module': D.module_
            readonly 'presence': D.presence
        }
        
    }
    
    export type modules = p_di.Dictionary<modules.D>
    
    export namespace lookups {
        
        export namespace D {
            
            export type referent = Module_Reference_
            
            export type dictionary = Dictionary_
            
            export namespace type_ {
                
                export type cyclic = null
                
                export type acyclic = null
                
                export type stack = null
                
            }
            
            export type type_ = 
                | readonly ['cyclic', type_.cyclic]
                | readonly ['acyclic', type_.acyclic]
                | readonly ['stack', type_.stack]
            
            export type presence = Presence_
            
        }
        
        export type D = {
            readonly 'referent': D.referent
            readonly 'dictionary': D.dictionary
            readonly 'type': D.type_
            readonly 'presence': D.presence
        }
        
    }
    
    export type lookups = p_di.Dictionary<lookups.D>
    
}

export type Resolver_Signature_Parameters_ = {
    readonly 'modules': Resolver_Signature_Parameters_.modules
    readonly 'lookups': Resolver_Signature_Parameters_.lookups
}

export namespace Resolver_Value_ {
    
    export namespace component {
        
        export type definition = Value_.component
        
        export namespace location {
            
            export namespace external {
                
                export namespace schema_import {
                    
                    export type l_entry = Schema_Imports_.D
                    
                    export type l_id = string
                    
                }
                
                export type schema_import = {
                    readonly 'l entry': schema_import.l_entry
                    readonly 'l id': schema_import.l_id
                }
                
                export namespace resolver_import {
                    
                    export type l_entry = Resolver_Imports_.D
                    
                    export type l_id = string
                    
                }
                
                export type resolver_import = {
                    readonly 'l entry': resolver_import.l_entry
                    readonly 'l id': resolver_import.l_id
                }
                
                export namespace signature {
                    
                    export type l_entry = Resolver_Signatures_.D
                    
                    export type l_id = string
                    
                }
                
                export type signature = {
                    readonly 'l entry': signature.l_entry
                    readonly 'l id': signature.l_id
                }
                
            }
            
            export type external = {
                readonly 'schema import': external.schema_import
                readonly 'resolver import': external.resolver_import
                readonly 'signature': external.signature
            }
            
            export namespace internal {
                
                export type l_entry = Resolver_Signatures_.D
                
                export type l_id = string
                
            }
            
            export type internal = {
                readonly 'l entry': internal.l_entry
                readonly 'l id': internal.l_id
            }
            
        }
        
        export type location = 
            | readonly ['external', location.external]
            | readonly ['internal', location.internal]
        
        export type signature = Resolver_Signatures_.D
        
        export namespace arguments_ {
            
            export namespace O {
                
                export namespace modules {
                    
                    export namespace O {
                        
                        export namespace D {
                            
                            export type optional = Resolver_Optional_Value_Initialization_
                            
                            export type required = Resolver_Guaranteed_Value_Selection_
                            
                            export namespace parameter {
                                
                                export type l_entry = Resolver_Signature_Parameters_.modules.D
                                
                                export type l_id = string
                                
                            }
                            
                            export type parameter = {
                                readonly 'l entry': parameter.l_entry
                                readonly 'l id': parameter.l_id
                            }
                            
                        }
                        
                        export type D = 
                            | readonly ['optional', D.optional]
                            | readonly ['required', D.required]
                            | readonly ['parameter', D.parameter]
                        
                    }
                    
                    export type O = p_di.Dictionary<O.D>
                    
                }
                
                export type modules = p_di.Optional_Value<modules.O>
                
                export namespace lookups {
                    
                    export namespace O {
                        
                        export namespace D {
                            
                            export namespace stack {
                                
                                export type empty = null
                                
                                export namespace push {
                                    
                                    export type stack = Resolver_Lookup_Selection_
                                    
                                    export type item = Resolver_Lookup_Selection_
                                    
                                }
                                
                                export type push = {
                                    readonly 'stack': push.stack
                                    readonly 'item': push.item
                                }
                                
                            }
                            
                            export type stack = 
                                | readonly ['empty', stack.empty]
                                | readonly ['push', stack.push]
                            
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
                            | readonly ['stack', D.stack]
                            | readonly ['acyclic', D.acyclic]
                            | readonly ['cyclic', D.cyclic]
                            | readonly ['selection', D.selection]
                        
                    }
                    
                    export type O = p_di.Dictionary<O.D>
                    
                }
                
                export type lookups = p_di.Optional_Value<lookups.O>
                
            }
            
            export type O = {
                readonly 'modules': O.modules
                readonly 'lookups': O.lookups
            }
            
        }
        
        export type arguments_ = p_di.Optional_Value<arguments_.O>
        
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
        
        export type definition = Dictionary_
        
        export type resolver = Resolver_Value_
        
        export namespace benchmark {
            
            export type O = Resolver_Benchmark_
            
        }
        
        export type benchmark = p_di.Optional_Value<benchmark.O>
        
    }
    
    export type dictionary = {
        readonly 'definition': dictionary.definition
        readonly 'resolver': dictionary.resolver
        readonly 'benchmark': dictionary.benchmark
    }
    
    export type group = Resolver_Value_Group_
    
    export namespace list {
        
        export type definition = Value_.list
        
        export type resolver = Resolver_Value_
        
        export namespace result {
            
            export type O = Resolver_Value_List_Result_
            
        }
        
        export type result = p_di.Optional_Value<result.O>
        
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
        
        export type definition = Value_.reference
        
        export namespace type_ {
            
            export namespace derived {
                
                export type value = Resolver_Guaranteed_Value_Selection_
                
            }
            
            export type derived = {
                readonly 'value': derived.value
            }
            
            export namespace selected {
                
                export type definition = Value_.reference.type_.selected
                
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
        
        export type definition = Value_.state
        
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
        
        export type options = p_di.Dictionary<options.D>
        
    }
    
    export type state = {
        readonly 'definition': state.definition
        readonly 'options': state.options
    }
    
    export type text = null
    
}

export type Resolver_Value_ = 
    | readonly ['component', Resolver_Value_.component]
    | readonly ['dictionary', Resolver_Value_.dictionary]
    | readonly ['group', Resolver_Value_.group]
    | readonly ['list', Resolver_Value_.list]
    | readonly ['nothing', Resolver_Value_.nothing]
    | readonly ['simple', Resolver_Value_.simple]
    | readonly ['optional', Resolver_Value_.optional]
    | readonly ['reference', Resolver_Value_.reference]
    | readonly ['state', Resolver_Value_.state]
    | readonly ['text', Resolver_Value_.text]

export namespace Module_Specification_ {
    
    export type schema = Schema_Tree_
    
    export namespace schema_path {
        
        export type L = string
        
    }
    
    export type schema_path = p_di.List<schema_path.L>
    
    export namespace complexity {
        
        export namespace constrained {
            
            export type module_resolver = string
            
        }
        
        export type constrained = {
            readonly 'module resolver': constrained.module_resolver
        }
        
        export namespace unconstrained {
            
            export type module_ = string
            
        }
        
        export type unconstrained = {
            readonly 'module': unconstrained.module_
        }
        
    }
    
    export type complexity = 
        | readonly ['constrained', complexity.constrained]
        | readonly ['unconstrained', complexity.unconstrained]
    
}

export type Module_Specification_ = {
    readonly 'schema': Module_Specification_.schema
    readonly 'schema path': Module_Specification_.schema_path
    readonly 'complexity': Module_Specification_.complexity
}

export namespace Schema_Tree_ {
    
    export type schema = Schema_
    
    export type set_ = Schemas_
    
}

export type Schema_Tree_ = 
    | readonly ['schema', Schema_Tree_.schema]
    | readonly ['set', Schema_Tree_.set_]

export namespace Text_Type_ {
    
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

export type Text_Type_ = {
    readonly 'type': Text_Type_.type_
    readonly 'link': Text_Type_.link
}

export namespace Simple_Type_ {
    
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
                    
                    export type number_of_fractional_digits = p_di.Optional_Value<number_of_fractional_digits.O>
                    
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
        
    }
    
    export type type_ = 
        | readonly ['boolean', type_.boolean_]
        | readonly ['date', type_.date]
        | readonly ['number', type_.number_]
    
}

export type Simple_Type_ = {
    readonly 'type': Simple_Type_.type_
}

export namespace Module_ {
    
    export type root_value = Value_
    
}

export type Module_ = {
    readonly 'root value': Module_.root_value
}

export namespace Presence_ {
    
    export type optional = null
    
    export type required = null
    
}

export type Presence_ = 
    | readonly ['optional', Presence_.optional]
    | readonly ['required', Presence_.required]

export namespace Resolver_Modules_ {
    
    export namespace D {
        
        export type signature = Resolver_Signatures_.D
        
        export type root_value_resolver = Resolver_Value_
        
    }
    
    export type D = {
        readonly 'signature': D.signature
        readonly 'root value resolver': D.root_value_resolver
    }
    
}

export type Resolver_Modules_ = p_di.Dictionary<Resolver_Modules_.D>

export namespace Resolver_Benchmark_ {
    
    export namespace selection {
        
        export namespace l_results {
            
            export type dictionary = Value_.dictionary
            
        }
        
        export type l_results = {
            readonly 'dictionary': l_results.dictionary
        }
        
        export type l_value = Resolver_Guaranteed_Value_Selection_
        
    }
    
    export type selection = {
        readonly 'l results': selection.l_results
        readonly 'l value': selection.l_value
    }
    
    export type resulting_dictionary = Dictionary_
    
    export type dense = boolean
    
}

export type Resolver_Benchmark_ = {
    readonly 'selection': Resolver_Benchmark_.selection
    readonly 'resulting dictionary': Resolver_Benchmark_.resulting_dictionary
    readonly 'dense': Resolver_Benchmark_.dense
}

export namespace Group_ {
    
    export namespace D {
        
        export namespace description {
            
            export type O = string
            
        }
        
        export type description = p_di.Optional_Value<description.O>
        
        export type value = Value_
        
    }
    
    export type D = {
        readonly 'description': D.description
        readonly 'value': D.value
    }
    
}

export type Group_ = p_di.Dictionary<Group_.D>

export namespace Value_Reference_ {
    
    export type module_ = Module_Reference_
    
    export type path = Value_Path_
    
}

export type Value_Reference_ = {
    readonly 'module': Value_Reference_.module_
    readonly 'path': Value_Reference_.path
}

export namespace Value_Path_ {
    
    export namespace tail {
        
        export namespace l_results {
            
            export type result = Value_
            
        }
        
        export type l_results = {
            readonly 'result': l_results.result
        }
        
        export namespace l_value {
            
            export namespace L {
                
                export namespace l_results {
                    
                    export type result = Value_
                    
                }
                
                export type l_results = {
                    readonly 'result': l_results.result
                }
                
                export namespace l_item {
                    
                    export namespace l_results {
                        
                        export type value = Value_
                        
                    }
                    
                    export type l_results = {
                        readonly 'value': l_results.value
                    }
                    
                    export namespace l_value {
                        
                        export type dictionary = null
                        
                        export namespace group {
                            
                            export type l_entry = Group_.D
                            
                            export type l_id = string
                            
                        }
                        
                        export type group = {
                            readonly 'l entry': group.l_entry
                            readonly 'l id': group.l_id
                        }
                        
                        export type list = null
                        
                        export type optional = null
                        
                        export namespace state {
                            
                            export type l_entry = Value_.state.options.D
                            
                            export type l_id = string
                            
                        }
                        
                        export type state = {
                            readonly 'l entry': state.l_entry
                            readonly 'l id': state.l_id
                        }
                        
                    }
                    
                    export type l_value = 
                        | readonly ['dictionary', l_value.dictionary]
                        | readonly ['group', l_value.group]
                        | readonly ['list', l_value.list]
                        | readonly ['optional', l_value.optional]
                        | readonly ['state', l_value.state]
                    
                }
                
                export type l_item = {
                    readonly 'l results': l_item.l_results
                    readonly 'l value': l_item.l_value
                }
                
            }
            
            export type L = {
                readonly 'l results': L.l_results
                readonly 'l item': L.l_item
            }
            
        }
        
        export type l_value = p_di.List<l_value.L>
        
    }
    
    export type tail = {
        readonly 'l results': tail.l_results
        readonly 'l value': tail.l_value
    }
    
    export type resulting_node = Value_
    
}

export type Value_Path_ = {
    readonly 'tail': Value_Path_.tail
    readonly 'resulting node': Value_Path_.resulting_node
}

export namespace Module_Reference_ {
    
    export namespace location {
        
        export namespace internal {
            
            export type l_entry = Modules_.D
            
            export type l_id = string
            
        }
        
        export type internal = {
            readonly 'l entry': internal.l_entry
            readonly 'l id': internal.l_id
        }
        
        export namespace external {
            
            export namespace import_ {
                
                export type l_entry = Schema_Imports_.D
                
                export type l_id = string
                
            }
            
            export type import_ = {
                readonly 'l entry': import_.l_entry
                readonly 'l id': import_.l_id
            }
            
            export namespace module_ {
                
                export type l_entry = Modules_.D
                
                export type l_id = string
                
            }
            
            export type module_ = {
                readonly 'l entry': module_.l_entry
                readonly 'l id': module_.l_id
            }
            
        }
        
        export type external = {
            readonly 'import': external.import_
            readonly 'module': external.module_
        }
        
    }
    
    export type location = 
        | readonly ['internal', location.internal]
        | readonly ['external', location.external]
    
    export type resulting_module = Module_
    
}

export type Module_Reference_ = {
    readonly 'location': Module_Reference_.location
    readonly 'resulting module': Module_Reference_.resulting_module
}

export namespace Resolver_Signature_ {
    
    export type module_ = Module_
    
    export namespace parameters {
        
        export type local = Resolver_Signature_Parameters_
        
        export namespace same_as {
            
            export type l_entry = Resolver_Signatures_.D
            
            export type l_id = string
            
        }
        
        export type same_as = {
            readonly 'l entry': same_as.l_entry
            readonly 'l id': same_as.l_id
        }
        
    }
    
    export type parameters = 
        | readonly ['local', parameters.local]
        | readonly ['same as', parameters.same_as]
    
    export type resolved_parameters = Resolver_Signature_Parameters_
    
}

export type Resolver_Signature_ = {
    readonly 'module': Resolver_Signature_.module_
    readonly 'parameters': Resolver_Signature_.parameters
    readonly 'resolved parameters': Resolver_Signature_.resolved_parameters
}

export namespace Resolver_Relative_Value_Selection_ {
    
    export namespace path {
        
        export namespace l_results {
            
            export type result = Value_
            
        }
        
        export type l_results = {
            readonly 'result': l_results.result
        }
        
        export namespace l_value {
            
            export namespace L {
                
                export namespace l_results {
                    
                    export type result = Value_
                    
                }
                
                export type l_results = {
                    readonly 'result': l_results.result
                }
                
                export namespace l_item {
                    export type state = { readonly 'l id': string; readonly 'l entry': Value_.state.options.D }
                    
                    export type component = null
                    
                    export namespace group {
                        
                        export type l_entry = Group_.D
                        
                        export type l_id = string
                        
                    }
                    
                    export type group = {
                        readonly 'l entry': group.l_entry
                        readonly 'l id': group.l_id
                    }
                    
                    export namespace reference {
                        
                        export type definition = Value_.reference
                        
                    }
                    
                    export type reference = {
                        readonly 'definition': reference.definition
                    }
                    
                }
                
                export type l_item = 
                    | readonly ['state', l_item.state]
                    | readonly ['component', l_item.component]
                    | readonly ['group', l_item.group]
                    | readonly ['reference', l_item.reference]
                
            }
            
            export type L = {
                readonly 'l results': L.l_results
                readonly 'l item': L.l_item
            }
            
        }
        
        export type l_value = p_di.List<l_value.L>
        
    }
    
    export type path = {
        readonly 'l results': path.l_results
        readonly 'l value': path.l_value
    }
    
    export type resulting_node = Value_
    
}

export type Resolver_Relative_Value_Selection_ = {
    readonly 'path': Resolver_Relative_Value_Selection_.path
    readonly 'resulting node': Resolver_Relative_Value_Selection_.resulting_node
}

export namespace Resolver_Lookup_Selection_ {
    
    export namespace type_ {
        
        export namespace acyclic {
            
            export type siblings = Dictionary_
            
            export namespace resolved_dictionary {
                
                export type selection = Resolver_Guaranteed_Value_Selection_
                
                export type selected_dictionary = Dictionary_
                
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
            
            export type siblings = Dictionary_
            
        }
        
        export type cyclic = 
            | readonly ['siblings', cyclic.siblings]
        
        export namespace parameter {
            
            export type l_entry = Resolver_Signature_Parameters_.lookups.D
            
            export type l_id = string
            
        }
        
        export type parameter = {
            readonly 'l entry': parameter.l_entry
            readonly 'l id': parameter.l_id
        }
        
    }
    
    export type type_ = 
        | readonly ['acyclic', type_.acyclic]
        | readonly ['cyclic', type_.cyclic]
        | readonly ['parameter', type_.parameter]
    
    export type resulting_dictionary = Dictionary_
    
}

export type Resolver_Lookup_Selection_ = {
    readonly 'type': Resolver_Lookup_Selection_.type_
    readonly 'resulting dictionary': Resolver_Lookup_Selection_.resulting_dictionary
}

export namespace Resolver_Constraint_ {
    
    export type selection = Resolver_Relative_Value_Selection_
    
    export namespace type_ {
        
        export namespace state {
            
            export type selected_state = Value_.state
            
            export namespace option {
                
                export type l_entry = Value_.state.options.D
                
                export type l_id = string
                
            }
            
            export type option = {
                readonly 'l entry': option.l_entry
                readonly 'l id': option.l_id
            }
            
        }
        
        export type state = {
            readonly 'selected state': state.selected_state
            readonly 'option': state.option
        }
        
        export namespace optional_value {
            
            export type selected_optional_value = Value_.optional
            
        }
        
        export type optional_value = {
            readonly 'selected optional value': optional_value.selected_optional_value
        }
        
    }
    
    export type type_ = 
        | readonly ['state', type_.state]
        | readonly ['optional value', type_.optional_value]
    
}

export type Resolver_Constraint_ = {
    readonly 'selection': Resolver_Constraint_.selection
    readonly 'type': Resolver_Constraint_.type_
}

export namespace Resolver_Option_Constraints_ {
    
    export namespace D {
        
        export namespace state {
            
            export type selection = Resolver_Guaranteed_Value_Selection_
            
            export type selected_state = Value_.state
            
            export namespace option {
                
                export type l_entry = Value_.state.options.D
                
                export type l_id = string
                
            }
            
            export type option = {
                readonly 'l entry': option.l_entry
                readonly 'l id': option.l_id
            }
            
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

export type Resolver_Option_Constraints_ = p_di.Dictionary<Resolver_Option_Constraints_.D>

export namespace Resolver_Optional_Value_Constraints_ {
    
    export type O = Resolver_Value_Constraints_
    
}

export type Resolver_Optional_Value_Constraints_ = p_di.Optional_Value<Resolver_Optional_Value_Constraints_.O>

export namespace Resolver_Value_Constraints_ {
    
    export type D = Resolver_Value_Constraint_
    
}

export type Resolver_Value_Constraints_ = p_di.Dictionary<Resolver_Value_Constraints_.D>

export namespace Resolver_Reference_To_Value_Constraint_ {
    
    export type l_entry = Resolver_Value_Constraints_.D
    
    export type l_id = string
    
}

export type Resolver_Reference_To_Value_Constraint_ = {
    readonly 'l entry': Resolver_Reference_To_Value_Constraint_.l_entry
    readonly 'l id': Resolver_Reference_To_Value_Constraint_.l_id
}

export namespace Resolver_Value_Constraint_ {
    
    export namespace start {
        
        export type value = null
        
        export type sibling = Resolver_Reference_To_Value_Constraint_
        
    }
    
    export type start = 
        | readonly ['value', start.value]
        | readonly ['sibling', start.sibling]
    
    export type constraint = Resolver_Constraint_
    
}

export type Resolver_Value_Constraint_ = {
    readonly 'start': Resolver_Value_Constraint_.start
    readonly 'constraint': Resolver_Value_Constraint_.constraint
}

export namespace Resolver_Optional_Value_Initialization_ {
    
    export type not_set = null
    
    export type set_ = Resolver_Guaranteed_Value_Selection_
    
    export type selection = Resolver_Possible_Value_Selection_
    
}

export type Resolver_Optional_Value_Initialization_ = 
    | readonly ['not set', Resolver_Optional_Value_Initialization_.not_set]
    | readonly ['set', Resolver_Optional_Value_Initialization_.set_]
    | readonly ['selection', Resolver_Optional_Value_Initialization_.selection]

export namespace Resolver_Value_Group_ {
    
    export namespace D {
        
        export type definition = Group_.D
        
        export type resolver = Resolver_Value_
        
    }
    
    export type D = {
        readonly 'definition': D.definition
        readonly 'resolver': D.resolver
    }
    
}

export type Resolver_Value_Group_ = p_di.Dictionary<Resolver_Value_Group_.D>

export type Resolver_Value_List_Result_ = Module_Reference_

export namespace Value_Results_ {
    
    export namespace O {
        
        export type D = Value_Reference_
        
    }
    
    export type O = p_di.Dictionary<O.D>
    
}

export type Value_Results_ = p_di.Optional_Value<Value_Results_.O>

export namespace Option_Constraints_ {
    
    export namespace O {
        
        export type D = Value_Reference_
        
    }
    
    export type O = p_di.Dictionary<O.D>
    
}

export type Option_Constraints_ = p_di.Optional_Value<Option_Constraints_.O>

export namespace Resolver_Guaranteed_Value_Selection_ {
    
    export namespace start {
        export type previous_item = { readonly initial: Resolver_Guaranteed_Value_Selection_ }
        export type last_item = {
            readonly property: { readonly 'l id': string; readonly 'l entry': Resolver_Value_Group_.D }
            readonly initial: Resolver_Guaranteed_Value_Selection_
        }
        
        export namespace sibling {
            
            export type l_entry = Resolver_Value_Group_.D
            
            export type l_id = string
            
        }
        
        export type sibling = {
            readonly 'l entry': sibling.l_entry
            readonly 'l id': sibling.l_id
        }
        
        export namespace parent_sibling {
            
            export type l_entry = Resolver_Value_Group_.D
            
            export type l_id = string
            
        }
        
        export type parent_sibling = {
            readonly 'l entry': parent_sibling.l_entry
            readonly 'l id': parent_sibling.l_id
        }
        
        export namespace option_constraint {
            
            export type l_entry = Resolver_Option_Constraints_.D
            
            export type l_id = string
            
        }
        
        export type option_constraint = {
            readonly 'l entry': option_constraint.l_entry
            readonly 'l id': option_constraint.l_id
        }
        
        export type list_cursor = null
        
        export type linked_entry = null
        
        export namespace constraint {
            
            export namespace component {
                
                export namespace property {
                    
                    export type l_entry = Resolver_Value_Group_.D
                    
                    export type l_id = string
                    
                }
                
                export type property = {
                    readonly 'l entry': property.l_entry
                    readonly 'l id': property.l_id
                }
                
                export namespace constraint {
                    
                    export type l_entry = Resolver_Value_Constraints_.D
                    
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
                    
                    export type l_entry = Resolver_Value_Group_.D
                    
                    export type l_id = string
                    
                }
                
                export type property = {
                    readonly 'l entry': property.l_entry
                    readonly 'l id': property.l_id
                }
                
                export namespace constraint {
                    
                    export type l_entry = Resolver_Value_Constraints_.D
                    
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
        
        export type constraint = 
            | readonly ['component', constraint.component]
            | readonly ['reference', constraint.reference]
        
        export namespace parameter {
            
            export type l_entry = Resolver_Signature_Parameters_.modules.D
            
            export type l_id = string
            
        }
        
        export type parameter = {
            readonly 'l entry': parameter.l_entry
            readonly 'l id': parameter.l_id
        }
        
        export namespace result {
            
            export namespace list {
                
                export namespace property {
                    
                    export type l_entry = Resolver_Value_Group_.D
                    
                    export type l_id = string
                    
                }
                
                export type property = {
                    readonly 'l entry': property.l_entry
                    readonly 'l id': property.l_id
                }
                
                export type list_result = Resolver_Value_.list.result.O
                
            }
            
            export type list = {
                readonly 'property': list.property
                readonly 'list result': list.list_result
            }
            
            export namespace state {
                
                export namespace property {
                    
                    export type l_entry = Resolver_Value_Group_.D
                    
                    export type l_id = string
                    
                }
                
                export type property = {
                    readonly 'l entry': property.l_entry
                    readonly 'l id': property.l_id
                }
                
                export type state = Resolver_Value_.state
                
                export type result = Module_Reference_
                
            }
            
            export type state = {
                readonly 'property': state.property
                readonly 'state': state.state
                readonly 'result': state.result
            }
            
            export namespace optional_value {
                
                export namespace property {
                    
                    export type l_entry = Resolver_Value_Group_.D
                    
                    export type l_id = string
                    
                }
                
                export type property = {
                    readonly 'l entry': property.l_entry
                    readonly 'l id': property.l_id
                }
                
                export type optional_value = Resolver_Value_.optional
                
                export type result = Module_Reference_
                
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
        | readonly ['previous item', start.previous_item]
        | readonly ['last item', start.last_item]
        | readonly ['parent sibling', start.parent_sibling]
        | readonly ['option constraint', start.option_constraint]
        | readonly ['list cursor', start.list_cursor]
        | readonly ['linked entry', start.linked_entry]
        | readonly ['constraint', start.constraint]
        | readonly ['parameter', start.parameter]
        | readonly ['result', start.result]
    
    export type tail = Resolver_Relative_Value_Selection_
    
    export type resulting_node = Value_
    
}

export type Resolver_Guaranteed_Value_Selection_ = {
    readonly 'start': Resolver_Guaranteed_Value_Selection_.start
    readonly 'tail': Resolver_Guaranteed_Value_Selection_.tail
    readonly 'resulting node': Resolver_Guaranteed_Value_Selection_.resulting_node
}

export namespace Resolver_Possible_Value_Selection_ {
    
    export namespace parameter {
        
        export type l_entry = Resolver_Signature_Parameters_.modules.D
        
        export type l_id = string
        
    }
    
    export type parameter = {
        readonly 'l entry': parameter.l_entry
        readonly 'l id': parameter.l_id
    }
    
    export namespace result {
        
        export namespace state {
            
            export namespace property {
                
                export type l_entry = Resolver_Value_Group_.D
                
                export type l_id = string
                
            }
            
            export type property = {
                readonly 'l entry': property.l_entry
                readonly 'l id': property.l_id
            }
            
            export type state = Resolver_Value_.state
            
            export type result = Module_Reference_
            
        }
        
        export type state = {
            readonly 'property': state.property
            readonly 'state': state.state
            readonly 'result': state.result
        }
        
        export namespace optional_value {
            
            export namespace property {
                
                export type l_entry = Resolver_Value_Group_.D
                
                export type l_id = string
                
            }
            
            export type property = {
                readonly 'l entry': property.l_entry
                readonly 'l id': property.l_id
            }
            
            export type optional_value = Resolver_Value_.optional
            
            export type result = Module_Reference_
            
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

export type Resolver_Possible_Value_Selection_ = 
    | readonly ['parameter', Resolver_Possible_Value_Selection_.parameter]
    | readonly ['result', Resolver_Possible_Value_Selection_.result]

export type { 
    Package_ as Package, 
    Schemas_ as Schemas, 
    Schema_ as Schema, 
    Schema_Imports_ as Schema_Imports, 
    Modules_ as Modules, 
    Globals_ as Globals, 
    Dictionary_ as Dictionary, 
    Value_ as Value, 
    Resolver_ as Resolver, 
    Resolver_Imports_ as Resolver_Imports, 
    Resolver_Signatures_ as Resolver_Signatures, 
    Resolver_Signature_Parameters_ as Resolver_Signature_Parameters, 
    Resolver_Value_ as Resolver_Value, 
    Module_Specification_ as Module_Specification, 
    Schema_Tree_ as Schema_Tree, 
    Text_Type_ as Text_Type, 
    Simple_Type_ as Simple_Type, 
    Module_ as Module, 
    Presence_ as Presence, 
    Resolver_Modules_ as Resolver_Modules, 
    Resolver_Benchmark_ as Resolver_Benchmark, 
    Group_ as Group, 
    Value_Reference_ as Value_Reference, 
    Value_Path_ as Value_Path, 
    Module_Reference_ as Module_Reference, 
    Resolver_Signature_ as Resolver_Signature, 
    Resolver_Relative_Value_Selection_ as Resolver_Relative_Value_Selection, 
    Resolver_Lookup_Selection_ as Resolver_Lookup_Selection, 
    Resolver_Constraint_ as Resolver_Constraint, 
    Resolver_Option_Constraints_ as Resolver_Option_Constraints, 
    Resolver_Optional_Value_Constraints_ as Resolver_Optional_Value_Constraints, 
    Resolver_Value_Constraints_ as Resolver_Value_Constraints, 
    Resolver_Reference_To_Value_Constraint_ as Resolver_Reference_To_Value_Constraint, 
    Resolver_Value_Constraint_ as Resolver_Value_Constraint, 
    Resolver_Optional_Value_Initialization_ as Resolver_Optional_Value_Initialization, 
    Resolver_Value_Group_ as Resolver_Value_Group, 
    Resolver_Value_List_Result_ as Resolver_Value_List_Result, 
    Value_Results_ as Value_Results, 
    Option_Constraints_ as Option_Constraints, 
    Resolver_Guaranteed_Value_Selection_ as Resolver_Guaranteed_Value_Selection, 
    Resolver_Possible_Value_Selection_ as Resolver_Possible_Value_Selection, 
}
