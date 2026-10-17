
import * as p_i from 'pareto-core/__internal/Abort'
import * as p_di from 'pareto-core/schema'

import * as i_location from "astn-runtime/modules/deserialization/schemas/location/schema"

export namespace Package_ {
    
    export type omit_$po_de$pc_serializer = boolean
    
    export type schema_tree = Schema_Tree_
    
}

export type Package_ = {
    readonly 'omit (de)serializer': Package_.omit_$po_de$pc_serializer
    readonly 'schema tree': Package_.schema_tree
}

export namespace Schemas_ {
    
    export type l_location = i_location.Range
    
    export namespace l_dictionary {
        
        export namespace D {
            
            export type l_location = i_location.Range
            
            export type l_entry = Schema_Tree_
            
        }
        
        export type D = {
            readonly 'l location': D.l_location
            readonly 'l entry': D.l_entry
        }
        
    }
    
    export type l_dictionary = p_di.Dictionary<l_dictionary.D>
    
}

export type Schemas_ = {
    readonly 'l location': Schemas_.l_location
    readonly 'l dictionary': Schemas_.l_dictionary
}

export namespace Schema_ {
    
    export type schema_imports = Schema_Imports_
    
    export type resolver_imports = Resolver_Imports_
    
    export type globals = Globals_
    
    export type modules = Modules_
    
    export namespace complexity {
        
        export type l_location = i_location.Range
        
        export namespace l_state {
            
            export type constrained = Resolver_
            
            export type unconstrained = null
            
        }
        
        export type l_state = 
            | readonly ['constrained', l_state.constrained]
            | readonly ['unconstrained', l_state.unconstrained]
        
    }
    
    export type complexity = {
        readonly 'l location': complexity.l_location
        readonly 'l state': complexity.l_state
    }
    
}

export type Schema_ = {
    readonly 'schema imports': Schema_.schema_imports
    readonly 'resolver imports': Schema_.resolver_imports
    readonly 'globals': Schema_.globals
    readonly 'modules': Schema_.modules
    readonly 'complexity': Schema_.complexity
}

export namespace Schema_Imports_ {
    
    export type l_location = i_location.Range
    
    export namespace l_dictionary {
        
        export namespace D {
            
            export type l_location = i_location.Range
            
            export namespace l_entry {
                
                export namespace schema_set_child {
                    
                    export type l_location = i_location.Range
                    
                    export type l_reference = string
                    
                }
                
                export type schema_set_child = {
                    readonly 'l location': schema_set_child.l_location
                    readonly 'l reference': schema_set_child.l_reference
                }
                
                export type schema = null
                
            }
            
            export type l_entry = {
                readonly 'schema set child': l_entry.schema_set_child
                readonly 'schema': l_entry.schema
            }
            
        }
        
        export type D = {
            readonly 'l location': D.l_location
            readonly 'l entry': D.l_entry
        }
        
    }
    
    export type l_dictionary = p_di.Dictionary<l_dictionary.D>
    
}

export type Schema_Imports_ = {
    readonly 'l location': Schema_Imports_.l_location
    readonly 'l dictionary': Schema_Imports_.l_dictionary
}

export namespace Modules_ {
    
    export type l_location = i_location.Range
    
    export namespace l_dictionary {
        
        export namespace D {
            
            export type l_location = i_location.Range
            
            export type l_entry = Module_
            
        }
        
        export type D = {
            readonly 'l location': D.l_location
            readonly 'l entry': D.l_entry
        }
        
    }
    
    export type l_dictionary = p_di.Dictionary<l_dictionary.D>
    
}

export type Modules_ = {
    readonly 'l location': Modules_.l_location
    readonly 'l dictionary': Modules_.l_dictionary
}

export namespace Globals_ {
    
    export namespace complexity {
        
        export type l_location = i_location.Range
        
        export namespace l_state {
            
            export type constrained = null
            
            export type unconstrained = null
            
        }
        
        export type l_state = 
            | readonly ['constrained', l_state.constrained]
            | readonly ['unconstrained', l_state.unconstrained]
        
    }
    
    export type complexity = {
        readonly 'l location': complexity.l_location
        readonly 'l state': complexity.l_state
    }
    
    export namespace text_types {
        
        export type l_location = i_location.Range
        
        export namespace l_dictionary {
            
            export namespace D {
                
                export type l_location = i_location.Range
                
                export type l_entry = Text_Type_
                
            }
            
            export type D = {
                readonly 'l location': D.l_location
                readonly 'l entry': D.l_entry
            }
            
        }
        
        export type l_dictionary = p_di.Dictionary<l_dictionary.D>
        
    }
    
    export type text_types = {
        readonly 'l location': text_types.l_location
        readonly 'l dictionary': text_types.l_dictionary
    }
    
    export namespace simple_types {
        
        export type l_location = i_location.Range
        
        export namespace l_dictionary {
            
            export namespace D {
                
                export type l_location = i_location.Range
                
                export type l_entry = Simple_Type_
                
            }
            
            export type D = {
                readonly 'l location': D.l_location
                readonly 'l entry': D.l_entry
            }
            
        }
        
        export type l_dictionary = p_di.Dictionary<l_dictionary.D>
        
    }
    
    export type simple_types = {
        readonly 'l location': simple_types.l_location
        readonly 'l dictionary': simple_types.l_dictionary
    }
    
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
    
    export type l_location = i_location.Range
    
    export namespace l_state {
        
        export namespace component {
            
            export namespace type_ {
                
                export type l_location = i_location.Range
                
                export namespace l_state {
                    
                    export namespace external {
                        
                        export namespace import_ {
                            
                            export type l_location = i_location.Range
                            
                            export type l_reference = string
                            
                        }
                        
                        export type import_ = {
                            readonly 'l location': import_.l_location
                            readonly 'l reference': import_.l_reference
                        }
                        
                        export namespace module_ {
                            
                            export type l_location = i_location.Range
                            
                            export type l_reference = string
                            
                        }
                        
                        export type module_ = {
                            readonly 'l location': module_.l_location
                            readonly 'l reference': module_.l_reference
                        }
                        
                    }
                    
                    export type external = {
                        readonly 'import': external.import_
                        readonly 'module': external.module_
                    }
                    
                    export namespace internal {
                        
                        export type l_location = i_location.Range
                        
                        export type l_reference = string
                        
                    }
                    
                    export type internal = {
                        readonly 'l location': internal.l_location
                        readonly 'l reference': internal.l_reference
                    }
                    
                    export namespace internal_acyclic {
                        
                        export type l_location = i_location.Range
                        
                        export type l_reference = string
                        
                    }
                    
                    export type internal_acyclic = {
                        readonly 'l location': internal_acyclic.l_location
                        readonly 'l reference': internal_acyclic.l_reference
                    }
                    
                }
                
                export type l_state = 
                    | readonly ['external', l_state.external]
                    | readonly ['internal', l_state.internal]
                    | readonly ['internal acyclic', l_state.internal_acyclic]
                
            }
            
            export type type_ = {
                readonly 'l location': type_.l_location
                readonly 'l state': type_.l_state
            }
            
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
            
            export type l_location = i_location.Range
            
            export namespace l_state {
                
                export namespace global {
                    
                    export type l_location = i_location.Range
                    
                    export type l_reference = string
                    
                }
                
                export type global = {
                    readonly 'l location': global.l_location
                    readonly 'l reference': global.l_reference
                }
                
            }
            
            export type l_state = 
                | readonly ['global', l_state.global]
            
        }
        
        export type simple = {
            readonly 'l location': simple.l_location
            readonly 'l state': simple.l_state
        }
        
        export type optional = Value_
        
        export namespace reference {
            
            export type referent = Value_Reference_
            
            export namespace type_ {
                
                export type l_location = i_location.Range
                
                export namespace l_state {
                    
                    export type derived = null
                    
                    export namespace selected {
                        
                        export type dictionary = null
                        
                        export namespace dependency {
                            
                            export type l_location = i_location.Range
                            
                            export namespace l_state {
                                
                                export type acyclic = null
                                
                                export type cyclic = null
                                
                                export type stack = null
                                
                            }
                            
                            export type l_state = 
                                | readonly ['acyclic', l_state.acyclic]
                                | readonly ['cyclic', l_state.cyclic]
                                | readonly ['stack', l_state.stack]
                            
                        }
                        
                        export type dependency = {
                            readonly 'l location': dependency.l_location
                            readonly 'l state': dependency.l_state
                        }
                        
                        export type results = Value_Results_
                        
                    }
                    
                    export type selected = {
                        readonly 'dictionary': selected.dictionary
                        readonly 'dependency': selected.dependency
                        readonly 'results': selected.results
                    }
                    
                }
                
                export type l_state = 
                    | readonly ['derived', l_state.derived]
                    | readonly ['selected', l_state.selected]
                
            }
            
            export type type_ = {
                readonly 'l location': type_.l_location
                readonly 'l state': type_.l_state
            }
            
        }
        
        export type reference = {
            readonly 'referent': reference.referent
            readonly 'type': reference.type_
        }
        
        export namespace state {
            
            export namespace options {
                
                export type l_location = i_location.Range
                
                export namespace l_dictionary {
                    
                    export namespace D {
                        
                        export type l_location = i_location.Range
                        
                        export namespace l_entry {
                            
                            export type constraints = Option_Constraints_
                            
                            export namespace description {
                                
                                export type O = string
                                
                            }
                            
                            export type description = p_di.Optional_Value<description.O>
                            
                            export type value = Value_
                            
                        }
                        
                        export type l_entry = {
                            readonly 'constraints': l_entry.constraints
                            readonly 'description': l_entry.description
                            readonly 'value': l_entry.value
                        }
                        
                    }
                    
                    export type D = {
                        readonly 'l location': D.l_location
                        readonly 'l entry': D.l_entry
                    }
                    
                }
                
                export type l_dictionary = p_di.Dictionary<l_dictionary.D>
                
            }
            
            export type options = {
                readonly 'l location': options.l_location
                readonly 'l dictionary': options.l_dictionary
            }
            
            export type results = Value_Results_
            
        }
        
        export type state = {
            readonly 'options': state.options
            readonly 'results': state.results
        }
        
        export namespace text {
            
            export type l_location = i_location.Range
            
            export namespace l_state {
                
                export namespace global {
                    
                    export type l_location = i_location.Range
                    
                    export type l_reference = string
                    
                }
                
                export type global = {
                    readonly 'l location': global.l_location
                    readonly 'l reference': global.l_reference
                }
                
                export type local = Text_Type_
                
            }
            
            export type l_state = 
                | readonly ['global', l_state.global]
                | readonly ['local', l_state.local]
            
        }
        
        export type text = {
            readonly 'l location': text.l_location
            readonly 'l state': text.l_state
        }
        
    }
    
    export type l_state = 
        | readonly ['component', l_state.component]
        | readonly ['dictionary', l_state.dictionary]
        | readonly ['group', l_state.group]
        | readonly ['list', l_state.list]
        | readonly ['nothing', l_state.nothing]
        | readonly ['simple', l_state.simple]
        | readonly ['optional', l_state.optional]
        | readonly ['reference', l_state.reference]
        | readonly ['state', l_state.state]
        | readonly ['text', l_state.text]
    
}

export type Value_ = {
    readonly 'l location': Value_.l_location
    readonly 'l state': Value_.l_state
}

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
    
    export type l_location = i_location.Range
    
    export namespace l_dictionary {
        
        export namespace D {
            
            export type l_location = i_location.Range
            
            export namespace l_entry {
                
                export namespace schema_set_child {
                    
                    export type l_location = i_location.Range
                    
                    export type l_reference = string
                    
                }
                
                export type schema_set_child = {
                    readonly 'l location': schema_set_child.l_location
                    readonly 'l reference': schema_set_child.l_reference
                }
                
                export type resolver = null
                
            }
            
            export type l_entry = {
                readonly 'schema set child': l_entry.schema_set_child
                readonly 'resolver': l_entry.resolver
            }
            
        }
        
        export type D = {
            readonly 'l location': D.l_location
            readonly 'l entry': D.l_entry
        }
        
    }
    
    export type l_dictionary = p_di.Dictionary<l_dictionary.D>
    
}

export type Resolver_Imports_ = {
    readonly 'l location': Resolver_Imports_.l_location
    readonly 'l dictionary': Resolver_Imports_.l_dictionary
}

export namespace Resolver_Signatures_ {
    
    export type l_location = i_location.Range
    
    export namespace l_dictionary {
        
        export namespace D {
            
            export type l_location = i_location.Range
            
            export type l_entry = Resolver_Signature_
            
        }
        
        export type D = {
            readonly 'l location': D.l_location
            readonly 'l entry': D.l_entry
        }
        
    }
    
    export type l_dictionary = p_di.Dictionary<l_dictionary.D>
    
}

export type Resolver_Signatures_ = {
    readonly 'l location': Resolver_Signatures_.l_location
    readonly 'l dictionary': Resolver_Signatures_.l_dictionary
}

export namespace Resolver_Signature_Parameters_ {
    
    export namespace modules {
        
        export type l_location = i_location.Range
        
        export namespace l_dictionary {
            
            export namespace D {
                
                export type l_location = i_location.Range
                
                export namespace l_entry {
                    
                    export type module_ = Module_Reference_
                    
                    export type presence = Presence_
                    
                }
                
                export type l_entry = {
                    readonly 'module': l_entry.module_
                    readonly 'presence': l_entry.presence
                }
                
            }
            
            export type D = {
                readonly 'l location': D.l_location
                readonly 'l entry': D.l_entry
            }
            
        }
        
        export type l_dictionary = p_di.Dictionary<l_dictionary.D>
        
    }
    
    export type modules = {
        readonly 'l location': modules.l_location
        readonly 'l dictionary': modules.l_dictionary
    }
    
    export namespace lookups {
        
        export type l_location = i_location.Range
        
        export namespace l_dictionary {
            
            export namespace D {
                
                export type l_location = i_location.Range
                
                export namespace l_entry {
                    
                    export type referent = Module_Reference_
                    
                    export type dictionary = null
                    
                    export namespace type_ {
                        
                        export type l_location = i_location.Range
                        
                        export namespace l_state {
                            
                            export type cyclic = null
                            
                            export type acyclic = null
                            
                            export type stack = null
                            
                        }
                        
                        export type l_state = 
                            | readonly ['cyclic', l_state.cyclic]
                            | readonly ['acyclic', l_state.acyclic]
                            | readonly ['stack', l_state.stack]
                        
                    }
                    
                    export type type_ = {
                        readonly 'l location': type_.l_location
                        readonly 'l state': type_.l_state
                    }
                    
                    export type presence = Presence_
                    
                }
                
                export type l_entry = {
                    readonly 'referent': l_entry.referent
                    readonly 'dictionary': l_entry.dictionary
                    readonly 'type': l_entry.type_
                    readonly 'presence': l_entry.presence
                }
                
            }
            
            export type D = {
                readonly 'l location': D.l_location
                readonly 'l entry': D.l_entry
            }
            
        }
        
        export type l_dictionary = p_di.Dictionary<l_dictionary.D>
        
    }
    
    export type lookups = {
        readonly 'l location': lookups.l_location
        readonly 'l dictionary': lookups.l_dictionary
    }
    
}

export type Resolver_Signature_Parameters_ = {
    readonly 'modules': Resolver_Signature_Parameters_.modules
    readonly 'lookups': Resolver_Signature_Parameters_.lookups
}

export namespace Resolver_Value_ {
    
    export type l_location = i_location.Range
    
    export namespace l_state {
        
        export namespace component {
            
            export type definition = null
            
            export namespace location {
                
                export type l_location = i_location.Range
                
                export namespace l_state {
                    
                    export namespace external {
                        
                        export namespace schema_import {
                            
                            export type l_location = i_location.Range
                            
                            export type l_reference = string
                            
                        }
                        
                        export type schema_import = {
                            readonly 'l location': schema_import.l_location
                            readonly 'l reference': schema_import.l_reference
                        }
                        
                        export namespace resolver_import {
                            
                            export type l_location = i_location.Range
                            
                            export type l_reference = string
                            
                        }
                        
                        export type resolver_import = {
                            readonly 'l location': resolver_import.l_location
                            readonly 'l reference': resolver_import.l_reference
                        }
                        
                        export namespace signature {
                            
                            export type l_location = i_location.Range
                            
                            export type l_reference = string
                            
                        }
                        
                        export type signature = {
                            readonly 'l location': signature.l_location
                            readonly 'l reference': signature.l_reference
                        }
                        
                    }
                    
                    export type external = {
                        readonly 'schema import': external.schema_import
                        readonly 'resolver import': external.resolver_import
                        readonly 'signature': external.signature
                    }
                    
                    export namespace internal {
                        
                        export type l_location = i_location.Range
                        
                        export type l_reference = string
                        
                    }
                    
                    export type internal = {
                        readonly 'l location': internal.l_location
                        readonly 'l reference': internal.l_reference
                    }
                    
                }
                
                export type l_state = 
                    | readonly ['external', l_state.external]
                    | readonly ['internal', l_state.internal]
                
            }
            
            export type location = {
                readonly 'l location': location.l_location
                readonly 'l state': location.l_state
            }
            
            export type signature = null
            
            export namespace arguments_ {
                
                export namespace O {
                    
                    export namespace modules {
                        
                        export namespace O {
                            
                            export type l_location = i_location.Range
                            
                            export namespace l_dictionary {
                                
                                export namespace D {
                                    
                                    export type l_location = i_location.Range
                                    
                                    export namespace l_entry {
                                        
                                        export type l_location = i_location.Range
                                        
                                        export namespace l_state {
                                            
                                            export type optional = Resolver_Optional_Value_Initialization_
                                            
                                            export type required = Resolver_Guaranteed_Value_Selection_
                                            
                                            export namespace parameter {
                                                
                                                export type l_location = i_location.Range
                                                
                                                export type l_reference = string
                                                
                                            }
                                            
                                            export type parameter = {
                                                readonly 'l location': parameter.l_location
                                                readonly 'l reference': parameter.l_reference
                                            }
                                            
                                        }
                                        
                                        export type l_state = 
                                            | readonly ['optional', l_state.optional]
                                            | readonly ['required', l_state.required]
                                            | readonly ['parameter', l_state.parameter]
                                        
                                    }
                                    
                                    export type l_entry = {
                                        readonly 'l location': l_entry.l_location
                                        readonly 'l state': l_entry.l_state
                                    }
                                    
                                }
                                
                                export type D = {
                                    readonly 'l location': D.l_location
                                    readonly 'l entry': D.l_entry
                                }
                                
                            }
                            
                            export type l_dictionary = p_di.Dictionary<l_dictionary.D>
                            
                        }
                        
                        export type O = {
                            readonly 'l location': O.l_location
                            readonly 'l dictionary': O.l_dictionary
                        }
                        
                    }
                    
                    export type modules = p_di.Optional_Value<modules.O>
                    
                    export namespace lookups {
                        
                        export namespace O {
                            
                            export type l_location = i_location.Range
                            
                            export namespace l_dictionary {
                                
                                export namespace D {
                                    
                                    export type l_location = i_location.Range
                                    
                                    export namespace l_entry {
                                        
                                        export type l_location = i_location.Range
                                        
                                        export namespace l_state {
                                            
                                            export namespace stack {
                                                
                                                export type l_location = i_location.Range
                                                
                                                export namespace l_state {
                                                    
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
                                                
                                                export type l_state = 
                                                    | readonly ['empty', l_state.empty]
                                                    | readonly ['push', l_state.push]
                                                
                                            }
                                            
                                            export type stack = {
                                                readonly 'l location': stack.l_location
                                                readonly 'l state': stack.l_state
                                            }
                                            
                                            export namespace acyclic {
                                                
                                                export type l_location = i_location.Range
                                                
                                                export namespace l_state {
                                                    
                                                    export type not_set = null
                                                    
                                                }
                                                
                                                export type l_state = 
                                                    | readonly ['not set', l_state.not_set]
                                                
                                            }
                                            
                                            export type acyclic = {
                                                readonly 'l location': acyclic.l_location
                                                readonly 'l state': acyclic.l_state
                                            }
                                            
                                            export namespace cyclic {
                                                
                                                export type l_location = i_location.Range
                                                
                                                export namespace l_state {
                                                    
                                                    export type not_set = null
                                                    
                                                }
                                                
                                                export type l_state = 
                                                    | readonly ['not set', l_state.not_set]
                                                
                                            }
                                            
                                            export type cyclic = {
                                                readonly 'l location': cyclic.l_location
                                                readonly 'l state': cyclic.l_state
                                            }
                                            
                                            export type selection = Resolver_Lookup_Selection_
                                            
                                        }
                                        
                                        export type l_state = 
                                            | readonly ['stack', l_state.stack]
                                            | readonly ['acyclic', l_state.acyclic]
                                            | readonly ['cyclic', l_state.cyclic]
                                            | readonly ['selection', l_state.selection]
                                        
                                    }
                                    
                                    export type l_entry = {
                                        readonly 'l location': l_entry.l_location
                                        readonly 'l state': l_entry.l_state
                                    }
                                    
                                }
                                
                                export type D = {
                                    readonly 'l location': D.l_location
                                    readonly 'l entry': D.l_entry
                                }
                                
                            }
                            
                            export type l_dictionary = p_di.Dictionary<l_dictionary.D>
                            
                        }
                        
                        export type O = {
                            readonly 'l location': O.l_location
                            readonly 'l dictionary': O.l_dictionary
                        }
                        
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
            
            export type definition = null
            
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
            
            export type definition = null
            
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
            
            export type definition = null
            
            export namespace type_ {
                
                export type l_location = i_location.Range
                
                export namespace l_state {
                    
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
                
                export type l_state = 
                    | readonly ['derived', l_state.derived]
                    | readonly ['selected', l_state.selected]
                
            }
            
            export type type_ = {
                readonly 'l location': type_.l_location
                readonly 'l state': type_.l_state
            }
            
        }
        
        export type reference = {
            readonly 'definition': reference.definition
            readonly 'type': reference.type_
        }
        
        export namespace state {
            
            export type definition = null
            
            export namespace options {
                
                export type l_location = i_location.Range
                
                export namespace l_dictionary {
                    
                    export namespace D {
                        
                        export type l_location = i_location.Range
                        
                        export namespace l_entry {
                            
                            export type constraints = Resolver_Option_Constraints_
                            
                            export type resolver = Resolver_Value_
                            
                        }
                        
                        export type l_entry = {
                            readonly 'constraints': l_entry.constraints
                            readonly 'resolver': l_entry.resolver
                        }
                        
                    }
                    
                    export type D = {
                        readonly 'l location': D.l_location
                        readonly 'l entry': D.l_entry
                    }
                    
                }
                
                export type l_dictionary = p_di.Dictionary<l_dictionary.D>
                
            }
            
            export type options = {
                readonly 'l location': options.l_location
                readonly 'l dictionary': options.l_dictionary
            }
            
        }
        
        export type state = {
            readonly 'definition': state.definition
            readonly 'options': state.options
        }
        
        export type text = null
        
    }
    
    export type l_state = 
        | readonly ['component', l_state.component]
        | readonly ['dictionary', l_state.dictionary]
        | readonly ['group', l_state.group]
        | readonly ['list', l_state.list]
        | readonly ['nothing', l_state.nothing]
        | readonly ['simple', l_state.simple]
        | readonly ['optional', l_state.optional]
        | readonly ['reference', l_state.reference]
        | readonly ['state', l_state.state]
        | readonly ['text', l_state.text]
    
}

export type Resolver_Value_ = {
    readonly 'l location': Resolver_Value_.l_location
    readonly 'l state': Resolver_Value_.l_state
}

export namespace Module_Specification_ {
    
    export type schema = Schema_Tree_
    
    export namespace schema_path {
        
        export type l_location = i_location.Range
        
        export namespace l_list {
            
            export namespace L {
                
                export type l_location = i_location.Range
                
                export type l_item = string
                
            }
            
            export type L = {
                readonly 'l location': L.l_location
                readonly 'l item': L.l_item
            }
            
        }
        
        export type l_list = p_di.List<l_list.L>
        
    }
    
    export type schema_path = {
        readonly 'l location': schema_path.l_location
        readonly 'l list': schema_path.l_list
    }
    
    export namespace complexity {
        
        export type l_location = i_location.Range
        
        export namespace l_state {
            
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
        
        export type l_state = 
            | readonly ['constrained', l_state.constrained]
            | readonly ['unconstrained', l_state.unconstrained]
        
    }
    
    export type complexity = {
        readonly 'l location': complexity.l_location
        readonly 'l state': complexity.l_state
    }
    
}

export type Module_Specification_ = {
    readonly 'schema': Module_Specification_.schema
    readonly 'schema path': Module_Specification_.schema_path
    readonly 'complexity': Module_Specification_.complexity
}

export namespace Schema_Tree_ {
    
    export type l_location = i_location.Range
    
    export namespace l_state {
        
        export type schema = Schema_
        
        export type set_ = Schemas_
        
    }
    
    export type l_state = 
        | readonly ['schema', l_state.schema]
        | readonly ['set', l_state.set_]
    
}

export type Schema_Tree_ = {
    readonly 'l location': Schema_Tree_.l_location
    readonly 'l state': Schema_Tree_.l_state
}

export namespace Text_Type_ {
    
    export namespace type_ {
        
        export type l_location = i_location.Range
        
        export namespace l_state {
            
            export type multi_line = null
            
            export type single_line = null
            
        }
        
        export type l_state = 
            | readonly ['multi line', l_state.multi_line]
            | readonly ['single line', l_state.single_line]
        
    }
    
    export type type_ = {
        readonly 'l location': type_.l_location
        readonly 'l state': type_.l_state
    }
    
    export namespace link {
        
        export type l_location = i_location.Range
        
        export namespace l_state {
            
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
        
        export type l_state = 
            | readonly ['no', l_state.no]
            | readonly ['yes', l_state.yes]
        
    }
    
    export type link = {
        readonly 'l location': link.l_location
        readonly 'l state': link.l_state
    }
    
}

export type Text_Type_ = {
    readonly 'type': Text_Type_.type_
    readonly 'link': Text_Type_.link
}

export namespace Simple_Type_ {
    
    export namespace type_ {
        
        export type l_location = i_location.Range
        
        export namespace l_state {
            
            export type boolean_ = null
            
            export type date = null
            
            export namespace number_ {
                
                export namespace precision {
                    
                    export type l_location = i_location.Range
                    
                    export namespace l_state {
                        
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
                                
                                export type l_location = i_location.Range
                                
                                export namespace l_state {
                                    
                                    export type integer = null
                                    
                                    export type natural = null
                                    
                                    export type positive_natural = null
                                    
                                }
                                
                                export type l_state = 
                                    | readonly ['integer', l_state.integer]
                                    | readonly ['natural', l_state.natural]
                                    | readonly ['positive natural', l_state.positive_natural]
                                
                            }
                            
                            export type type_ = {
                                readonly 'l location': type_.l_location
                                readonly 'l state': type_.l_state
                            }
                            
                        }
                        
                        export type exact = {
                            readonly 'number of fractional digits': exact.number_of_fractional_digits
                            readonly 'type': exact.type_
                        }
                        
                    }
                    
                    export type l_state = 
                        | readonly ['approximation', l_state.approximation]
                        | readonly ['exact', l_state.exact]
                    
                }
                
                export type precision = {
                    readonly 'l location': precision.l_location
                    readonly 'l state': precision.l_state
                }
                
            }
            
            export type number_ = {
                readonly 'precision': number_.precision
            }
            
        }
        
        export type l_state = 
            | readonly ['boolean', l_state.boolean_]
            | readonly ['date', l_state.date]
            | readonly ['number', l_state.number_]
        
    }
    
    export type type_ = {
        readonly 'l location': type_.l_location
        readonly 'l state': type_.l_state
    }
    
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
    
    export type l_location = i_location.Range
    
    export namespace l_state {
        
        export type optional = null
        
        export type required = null
        
    }
    
    export type l_state = 
        | readonly ['optional', l_state.optional]
        | readonly ['required', l_state.required]
    
}

export type Presence_ = {
    readonly 'l location': Presence_.l_location
    readonly 'l state': Presence_.l_state
}

export namespace Resolver_Modules_ {
    
    export type l_location = i_location.Range
    
    export namespace l_dictionary {
        
        export namespace D {
            
            export type l_location = i_location.Range
            
            export namespace l_entry {
                
                export type signature = null
                
                export type root_value_resolver = Resolver_Value_
                
            }
            
            export type l_entry = {
                readonly 'signature': l_entry.signature
                readonly 'root value resolver': l_entry.root_value_resolver
            }
            
        }
        
        export type D = {
            readonly 'l location': D.l_location
            readonly 'l entry': D.l_entry
        }
        
    }
    
    export type l_dictionary = p_di.Dictionary<l_dictionary.D>
    
}

export type Resolver_Modules_ = {
    readonly 'l location': Resolver_Modules_.l_location
    readonly 'l dictionary': Resolver_Modules_.l_dictionary
}

export namespace Resolver_Benchmark_ {
    
    export type selection = Resolver_Guaranteed_Value_Selection_
    
    export type resulting_dictionary = null
    
    export type dense = boolean
    
}

export type Resolver_Benchmark_ = {
    readonly 'selection': Resolver_Benchmark_.selection
    readonly 'resulting dictionary': Resolver_Benchmark_.resulting_dictionary
    readonly 'dense': Resolver_Benchmark_.dense
}

export namespace Group_ {
    
    export type l_location = i_location.Range
    
    export namespace l_dictionary {
        
        export namespace D {
            
            export type l_location = i_location.Range
            
            export namespace l_entry {
                
                export namespace description {
                    
                    export type O = string
                    
                }
                
                export type description = p_di.Optional_Value<description.O>
                
                export type value = Value_
                
            }
            
            export type l_entry = {
                readonly 'description': l_entry.description
                readonly 'value': l_entry.value
            }
            
        }
        
        export type D = {
            readonly 'l location': D.l_location
            readonly 'l entry': D.l_entry
        }
        
    }
    
    export type l_dictionary = p_di.Dictionary<l_dictionary.D>
    
}

export type Group_ = {
    readonly 'l location': Group_.l_location
    readonly 'l dictionary': Group_.l_dictionary
}

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
        
        export type l_location = i_location.Range
        
        export namespace l_list {
            
            export namespace L {
                
                export type l_location = i_location.Range
                
                export namespace l_item {
                    
                    export type l_location = i_location.Range
                    
                    export namespace l_state {
                        
                        export type dictionary = null
                        
                        export namespace group {
                            
                            export type l_location = i_location.Range
                            
                            export type l_reference = string
                            
                        }
                        
                        export type group = {
                            readonly 'l location': group.l_location
                            readonly 'l reference': group.l_reference
                        }
                        
                        export type list = null
                        
                        export type optional = null
                        
                        export namespace state {
                            
                            export type l_location = i_location.Range
                            
                            export type l_reference = string
                            
                        }
                        
                        export type state = {
                            readonly 'l location': state.l_location
                            readonly 'l reference': state.l_reference
                        }
                        
                    }
                    
                    export type l_state = 
                        | readonly ['dictionary', l_state.dictionary]
                        | readonly ['group', l_state.group]
                        | readonly ['list', l_state.list]
                        | readonly ['optional', l_state.optional]
                        | readonly ['state', l_state.state]
                    
                }
                
                export type l_item = {
                    readonly 'l location': l_item.l_location
                    readonly 'l state': l_item.l_state
                }
                
            }
            
            export type L = {
                readonly 'l location': L.l_location
                readonly 'l item': L.l_item
            }
            
        }
        
        export type l_list = p_di.List<l_list.L>
        
    }
    
    export type tail = {
        readonly 'l location': tail.l_location
        readonly 'l list': tail.l_list
    }
    
    export type resulting_node = null
    
}

export type Value_Path_ = {
    readonly 'tail': Value_Path_.tail
    readonly 'resulting node': Value_Path_.resulting_node
}

export namespace Module_Reference_ {
    
    export namespace location {
        
        export type l_location = i_location.Range
        
        export namespace l_state {
            
            export namespace internal {
                
                export type l_location = i_location.Range
                
                export type l_reference = string
                
            }
            
            export type internal = {
                readonly 'l location': internal.l_location
                readonly 'l reference': internal.l_reference
            }
            
            export namespace external {
                
                export namespace import_ {
                    
                    export type l_location = i_location.Range
                    
                    export type l_reference = string
                    
                }
                
                export type import_ = {
                    readonly 'l location': import_.l_location
                    readonly 'l reference': import_.l_reference
                }
                
                export namespace module_ {
                    
                    export type l_location = i_location.Range
                    
                    export type l_reference = string
                    
                }
                
                export type module_ = {
                    readonly 'l location': module_.l_location
                    readonly 'l reference': module_.l_reference
                }
                
            }
            
            export type external = {
                readonly 'import': external.import_
                readonly 'module': external.module_
            }
            
        }
        
        export type l_state = 
            | readonly ['internal', l_state.internal]
            | readonly ['external', l_state.external]
        
    }
    
    export type location = {
        readonly 'l location': location.l_location
        readonly 'l state': location.l_state
    }
    
    export type resulting_module = null
    
}

export type Module_Reference_ = {
    readonly 'location': Module_Reference_.location
    readonly 'resulting module': Module_Reference_.resulting_module
}

export namespace Resolver_Signature_ {
    
    export type module_ = null
    
    export namespace parameters {
        
        export type l_location = i_location.Range
        
        export namespace l_state {
            
            export type local = Resolver_Signature_Parameters_
            
            export namespace same_as {
                
                export type l_location = i_location.Range
                
                export type l_reference = string
                
            }
            
            export type same_as = {
                readonly 'l location': same_as.l_location
                readonly 'l reference': same_as.l_reference
            }
            
        }
        
        export type l_state = 
            | readonly ['local', l_state.local]
            | readonly ['same as', l_state.same_as]
        
    }
    
    export type parameters = {
        readonly 'l location': parameters.l_location
        readonly 'l state': parameters.l_state
    }
    
    export type resolved_parameters = null
    
}

export type Resolver_Signature_ = {
    readonly 'module': Resolver_Signature_.module_
    readonly 'parameters': Resolver_Signature_.parameters
    readonly 'resolved parameters': Resolver_Signature_.resolved_parameters
}

export namespace Resolver_Relative_Value_Selection_ {
    
    export namespace path {
        
        export type l_location = i_location.Range
        
        export namespace l_list {
            
            export namespace L {
                
                export type l_location = i_location.Range
                
                export namespace l_item {
                    
                    export type l_location = i_location.Range
                    
                    export namespace l_state {
                        export type state = { readonly 'l location': i_location.Range; readonly 'l reference': string }
                        
                        export type component = null
                        
                        export namespace group {
                            
                            export type l_location = i_location.Range
                            
                            export type l_reference = string
                            
                        }
                        
                        export type group = {
                            readonly 'l location': group.l_location
                            readonly 'l reference': group.l_reference
                        }
                        
                        export namespace reference {
                            
                            export type definition = null
                            
                        }
                        
                        export type reference = {
                            readonly 'definition': reference.definition
                        }
                        
                    }
                    
                    export type l_state = 
                        | readonly ['state', l_state.state]
                        | readonly ['component', l_state.component]
                        | readonly ['group', l_state.group]
                        | readonly ['reference', l_state.reference]
                    
                }
                
                export type l_item = {
                    readonly 'l location': l_item.l_location
                    readonly 'l state': l_item.l_state
                }
                
            }
            
            export type L = {
                readonly 'l location': L.l_location
                readonly 'l item': L.l_item
            }
            
        }
        
        export type l_list = p_di.List<l_list.L>
        
    }
    
    export type path = {
        readonly 'l location': path.l_location
        readonly 'l list': path.l_list
    }
    
    export type resulting_node = null
    
}

export type Resolver_Relative_Value_Selection_ = {
    readonly 'path': Resolver_Relative_Value_Selection_.path
    readonly 'resulting node': Resolver_Relative_Value_Selection_.resulting_node
}

export namespace Resolver_Lookup_Selection_ {
    
    export namespace type_ {
        
        export type l_location = i_location.Range
        
        export namespace l_state {
            
            export namespace acyclic {
                
                export type l_location = i_location.Range
                
                export namespace l_state {
                    
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
                
                export type l_state = 
                    | readonly ['siblings', l_state.siblings]
                    | readonly ['resolved dictionary', l_state.resolved_dictionary]
                
            }
            
            export type acyclic = {
                readonly 'l location': acyclic.l_location
                readonly 'l state': acyclic.l_state
            }
            
            export namespace cyclic {
                
                export type l_location = i_location.Range
                
                export namespace l_state {
                    
                    export type siblings = null
                    
                }
                
                export type l_state = 
                    | readonly ['siblings', l_state.siblings]
                
            }
            
            export type cyclic = {
                readonly 'l location': cyclic.l_location
                readonly 'l state': cyclic.l_state
            }
            
            export namespace parameter {
                
                export type l_location = i_location.Range
                
                export type l_reference = string
                
            }
            
            export type parameter = {
                readonly 'l location': parameter.l_location
                readonly 'l reference': parameter.l_reference
            }
            
        }
        
        export type l_state = 
            | readonly ['acyclic', l_state.acyclic]
            | readonly ['cyclic', l_state.cyclic]
            | readonly ['parameter', l_state.parameter]
        
    }
    
    export type type_ = {
        readonly 'l location': type_.l_location
        readonly 'l state': type_.l_state
    }
    
    export type resulting_dictionary = null
    
}

export type Resolver_Lookup_Selection_ = {
    readonly 'type': Resolver_Lookup_Selection_.type_
    readonly 'resulting dictionary': Resolver_Lookup_Selection_.resulting_dictionary
}

export namespace Resolver_Constraint_ {
    
    export type selection = Resolver_Relative_Value_Selection_
    
    export namespace type_ {
        
        export type l_location = i_location.Range
        
        export namespace l_state {
            
            export namespace state {
                
                export type selected_state = null
                
                export namespace option {
                    
                    export type l_location = i_location.Range
                    
                    export type l_reference = string
                    
                }
                
                export type option = {
                    readonly 'l location': option.l_location
                    readonly 'l reference': option.l_reference
                }
                
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
        
        export type l_state = 
            | readonly ['state', l_state.state]
            | readonly ['optional value', l_state.optional_value]
        
    }
    
    export type type_ = {
        readonly 'l location': type_.l_location
        readonly 'l state': type_.l_state
    }
    
}

export type Resolver_Constraint_ = {
    readonly 'selection': Resolver_Constraint_.selection
    readonly 'type': Resolver_Constraint_.type_
}

export namespace Resolver_Option_Constraints_ {
    
    export type l_location = i_location.Range
    
    export namespace l_dictionary {
        
        export namespace D {
            
            export type l_location = i_location.Range
            
            export namespace l_entry {
                
                export type l_location = i_location.Range
                
                export namespace l_state {
                    
                    export namespace state {
                        
                        export type selection = Resolver_Guaranteed_Value_Selection_
                        
                        export type selected_state = null
                        
                        export namespace option {
                            
                            export type l_location = i_location.Range
                            
                            export type l_reference = string
                            
                        }
                        
                        export type option = {
                            readonly 'l location': option.l_location
                            readonly 'l reference': option.l_reference
                        }
                        
                    }
                    
                    export type state = {
                        readonly 'selection': state.selection
                        readonly 'selected state': state.selected_state
                        readonly 'option': state.option
                    }
                    
                    export type assert_is_set = Resolver_Possible_Value_Selection_
                    
                }
                
                export type l_state = 
                    | readonly ['state', l_state.state]
                    | readonly ['assert is set', l_state.assert_is_set]
                
            }
            
            export type l_entry = {
                readonly 'l location': l_entry.l_location
                readonly 'l state': l_entry.l_state
            }
            
        }
        
        export type D = {
            readonly 'l location': D.l_location
            readonly 'l entry': D.l_entry
        }
        
    }
    
    export type l_dictionary = p_di.Dictionary<l_dictionary.D>
    
}

export type Resolver_Option_Constraints_ = {
    readonly 'l location': Resolver_Option_Constraints_.l_location
    readonly 'l dictionary': Resolver_Option_Constraints_.l_dictionary
}

export namespace Resolver_Optional_Value_Constraints_ {
    
    export type O = Resolver_Value_Constraints_
    
}

export type Resolver_Optional_Value_Constraints_ = p_di.Optional_Value<Resolver_Optional_Value_Constraints_.O>

export namespace Resolver_Value_Constraints_ {
    
    export type l_location = i_location.Range
    
    export namespace l_dictionary {
        
        export namespace D {
            
            export type l_location = i_location.Range
            
            export type l_entry = Resolver_Value_Constraint_
            
        }
        
        export type D = {
            readonly 'l location': D.l_location
            readonly 'l entry': D.l_entry
        }
        
    }
    
    export type l_dictionary = p_di.Dictionary<l_dictionary.D>
    
}

export type Resolver_Value_Constraints_ = {
    readonly 'l location': Resolver_Value_Constraints_.l_location
    readonly 'l dictionary': Resolver_Value_Constraints_.l_dictionary
}

export namespace Resolver_Reference_To_Value_Constraint_ {
    
    export type l_location = i_location.Range
    
    export type l_reference = string
    
}

export type Resolver_Reference_To_Value_Constraint_ = {
    readonly 'l location': Resolver_Reference_To_Value_Constraint_.l_location
    readonly 'l reference': Resolver_Reference_To_Value_Constraint_.l_reference
}

export namespace Resolver_Value_Constraint_ {
    
    export namespace start {
        
        export type l_location = i_location.Range
        
        export namespace l_state {
            
            export type value = null
            
            export type sibling = Resolver_Reference_To_Value_Constraint_
            
        }
        
        export type l_state = 
            | readonly ['value', l_state.value]
            | readonly ['sibling', l_state.sibling]
        
    }
    
    export type start = {
        readonly 'l location': start.l_location
        readonly 'l state': start.l_state
    }
    
    export type constraint = Resolver_Constraint_
    
}

export type Resolver_Value_Constraint_ = {
    readonly 'start': Resolver_Value_Constraint_.start
    readonly 'constraint': Resolver_Value_Constraint_.constraint
}

export namespace Resolver_Optional_Value_Initialization_ {
    
    export type l_location = i_location.Range
    
    export namespace l_state {
        
        export type not_set = null
        
        export type set_ = Resolver_Guaranteed_Value_Selection_
        
        export type selection = Resolver_Possible_Value_Selection_
        
    }
    
    export type l_state = 
        | readonly ['not set', l_state.not_set]
        | readonly ['set', l_state.set_]
        | readonly ['selection', l_state.selection]
    
}

export type Resolver_Optional_Value_Initialization_ = {
    readonly 'l location': Resolver_Optional_Value_Initialization_.l_location
    readonly 'l state': Resolver_Optional_Value_Initialization_.l_state
}

export namespace Resolver_Value_Group_ {
    
    export type l_location = i_location.Range
    
    export namespace l_dictionary {
        
        export namespace D {
            
            export type l_location = i_location.Range
            
            export namespace l_entry {
                
                export type definition = null
                
                export type resolver = Resolver_Value_
                
            }
            
            export type l_entry = {
                readonly 'definition': l_entry.definition
                readonly 'resolver': l_entry.resolver
            }
            
        }
        
        export type D = {
            readonly 'l location': D.l_location
            readonly 'l entry': D.l_entry
        }
        
    }
    
    export type l_dictionary = p_di.Dictionary<l_dictionary.D>
    
}

export type Resolver_Value_Group_ = {
    readonly 'l location': Resolver_Value_Group_.l_location
    readonly 'l dictionary': Resolver_Value_Group_.l_dictionary
}

export type Resolver_Value_List_Result_ = Module_Reference_

export namespace Value_Results_ {
    
    export namespace O {
        
        export type l_location = i_location.Range
        
        export namespace l_dictionary {
            
            export namespace D {
                
                export type l_location = i_location.Range
                
                export type l_entry = Value_Reference_
                
            }
            
            export type D = {
                readonly 'l location': D.l_location
                readonly 'l entry': D.l_entry
            }
            
        }
        
        export type l_dictionary = p_di.Dictionary<l_dictionary.D>
        
    }
    
    export type O = {
        readonly 'l location': O.l_location
        readonly 'l dictionary': O.l_dictionary
    }
    
}

export type Value_Results_ = p_di.Optional_Value<Value_Results_.O>

export namespace Option_Constraints_ {
    
    export namespace O {
        
        export type l_location = i_location.Range
        
        export namespace l_dictionary {
            
            export namespace D {
                
                export type l_location = i_location.Range
                
                export type l_entry = Value_Reference_
                
            }
            
            export type D = {
                readonly 'l location': D.l_location
                readonly 'l entry': D.l_entry
            }
            
        }
        
        export type l_dictionary = p_di.Dictionary<l_dictionary.D>
        
    }
    
    export type O = {
        readonly 'l location': O.l_location
        readonly 'l dictionary': O.l_dictionary
    }
    
}

export type Option_Constraints_ = p_di.Optional_Value<Option_Constraints_.O>

export namespace Resolver_Guaranteed_Value_Selection_ {
    
    export namespace start {
        
        export type l_location = i_location.Range
        
        export namespace l_state {
            export type previous_item = { readonly initial: Resolver_Guaranteed_Value_Selection_ }
            export type last_item = {
                readonly property: { readonly 'l location': i_location.Range; readonly 'l reference': string }
                readonly initial: Resolver_Guaranteed_Value_Selection_
            }
            
            export namespace sibling {
                
                export type l_location = i_location.Range
                
                export type l_reference = string
                
            }
            
            export type sibling = {
                readonly 'l location': sibling.l_location
                readonly 'l reference': sibling.l_reference
            }
            
            export namespace parent_sibling {
                
                export type l_location = i_location.Range
                
                export type l_reference = string
                
            }
            
            export type parent_sibling = {
                readonly 'l location': parent_sibling.l_location
                readonly 'l reference': parent_sibling.l_reference
            }
            
            export namespace option_constraint {
                
                export type l_location = i_location.Range
                
                export type l_reference = string
                
            }
            
            export type option_constraint = {
                readonly 'l location': option_constraint.l_location
                readonly 'l reference': option_constraint.l_reference
            }
            
            export type list_cursor = null
            
            export type linked_entry = null
            
            export namespace constraint {
                
                export type l_location = i_location.Range
                
                export namespace l_state {
                    
                    export namespace component {
                        
                        export namespace property {
                            
                            export type l_location = i_location.Range
                            
                            export type l_reference = string
                            
                        }
                        
                        export type property = {
                            readonly 'l location': property.l_location
                            readonly 'l reference': property.l_reference
                        }
                        
                        export namespace constraint {
                            
                            export type l_location = i_location.Range
                            
                            export type l_reference = string
                            
                        }
                        
                        export type constraint = {
                            readonly 'l location': constraint.l_location
                            readonly 'l reference': constraint.l_reference
                        }
                        
                    }
                    
                    export type component = {
                        readonly 'property': component.property
                        readonly 'constraint': component.constraint
                    }
                    
                    export namespace reference {
                        
                        export namespace property {
                            
                            export type l_location = i_location.Range
                            
                            export type l_reference = string
                            
                        }
                        
                        export type property = {
                            readonly 'l location': property.l_location
                            readonly 'l reference': property.l_reference
                        }
                        
                        export namespace constraint {
                            
                            export type l_location = i_location.Range
                            
                            export type l_reference = string
                            
                        }
                        
                        export type constraint = {
                            readonly 'l location': constraint.l_location
                            readonly 'l reference': constraint.l_reference
                        }
                        
                    }
                    
                    export type reference = {
                        readonly 'property': reference.property
                        readonly 'constraint': reference.constraint
                    }
                    
                }
                
                export type l_state = 
                    | readonly ['component', l_state.component]
                    | readonly ['reference', l_state.reference]
                
            }
            
            export type constraint = {
                readonly 'l location': constraint.l_location
                readonly 'l state': constraint.l_state
            }
            
            export namespace parameter {
                
                export type l_location = i_location.Range
                
                export type l_reference = string
                
            }
            
            export type parameter = {
                readonly 'l location': parameter.l_location
                readonly 'l reference': parameter.l_reference
            }
            
            export namespace result {
                
                export type l_location = i_location.Range
                
                export namespace l_state {
                    
                    export namespace list {
                        
                        export namespace property {
                            
                            export type l_location = i_location.Range
                            
                            export type l_reference = string
                            
                        }
                        
                        export type property = {
                            readonly 'l location': property.l_location
                            readonly 'l reference': property.l_reference
                        }
                        
                        export type list_result = null
                        
                    }
                    
                    export type list = {
                        readonly 'property': list.property
                        readonly 'list result': list.list_result
                    }
                    
                    export namespace state {
                        
                        export namespace property {
                            
                            export type l_location = i_location.Range
                            
                            export type l_reference = string
                            
                        }
                        
                        export type property = {
                            readonly 'l location': property.l_location
                            readonly 'l reference': property.l_reference
                        }
                        
                        export type state = null
                        
                        export type result = Module_Reference_
                        
                    }
                    
                    export type state = {
                        readonly 'property': state.property
                        readonly 'state': state.state
                        readonly 'result': state.result
                    }
                    
                    export namespace optional_value {
                        
                        export namespace property {
                            
                            export type l_location = i_location.Range
                            
                            export type l_reference = string
                            
                        }
                        
                        export type property = {
                            readonly 'l location': property.l_location
                            readonly 'l reference': property.l_reference
                        }
                        
                        export type optional_value = null
                        
                        export type result = Module_Reference_
                        
                    }
                    
                    export type optional_value = {
                        readonly 'property': optional_value.property
                        readonly 'optional value': optional_value.optional_value
                        readonly 'result': optional_value.result
                    }
                    
                }
                
                export type l_state = 
                    | readonly ['list', l_state.list]
                    | readonly ['state', l_state.state]
                    | readonly ['optional value', l_state.optional_value]
                
            }
            
            export type result = {
                readonly 'l location': result.l_location
                readonly 'l state': result.l_state
            }
            
        }
        
        export type l_state = 
            | readonly ['previous item', l_state.previous_item]
            | readonly ['last item', l_state.last_item]
            | readonly ['sibling', l_state.sibling]
            | readonly ['parent sibling', l_state.parent_sibling]
            | readonly ['option constraint', l_state.option_constraint]
            | readonly ['list cursor', l_state.list_cursor]
            | readonly ['linked entry', l_state.linked_entry]
            | readonly ['constraint', l_state.constraint]
            | readonly ['parameter', l_state.parameter]
            | readonly ['result', l_state.result]
        
    }
    
    export type start = {
        readonly 'l location': start.l_location
        readonly 'l state': start.l_state
    }
    
    export type tail = Resolver_Relative_Value_Selection_
    
    export type resulting_node = null
    
}

export type Resolver_Guaranteed_Value_Selection_ = {
    readonly 'start': Resolver_Guaranteed_Value_Selection_.start
    readonly 'tail': Resolver_Guaranteed_Value_Selection_.tail
    readonly 'resulting node': Resolver_Guaranteed_Value_Selection_.resulting_node
}

export namespace Resolver_Possible_Value_Selection_ {
    
    export type l_location = i_location.Range
    
    export namespace l_state {
        
        export namespace parameter {
            
            export type l_location = i_location.Range
            
            export type l_reference = string
            
        }
        
        export type parameter = {
            readonly 'l location': parameter.l_location
            readonly 'l reference': parameter.l_reference
        }
        
        export namespace result {
            
            export type l_location = i_location.Range
            
            export namespace l_state {
                
                export namespace state {
                    
                    export namespace property {
                        
                        export type l_location = i_location.Range
                        
                        export type l_reference = string
                        
                    }
                    
                    export type property = {
                        readonly 'l location': property.l_location
                        readonly 'l reference': property.l_reference
                    }
                    
                    export type state = null
                    
                    export type result = Module_Reference_
                    
                }
                
                export type state = {
                    readonly 'property': state.property
                    readonly 'state': state.state
                    readonly 'result': state.result
                }
                
                export namespace optional_value {
                    
                    export namespace property {
                        
                        export type l_location = i_location.Range
                        
                        export type l_reference = string
                        
                    }
                    
                    export type property = {
                        readonly 'l location': property.l_location
                        readonly 'l reference': property.l_reference
                    }
                    
                    export type optional_value = null
                    
                    export type result = Module_Reference_
                    
                }
                
                export type optional_value = {
                    readonly 'property': optional_value.property
                    readonly 'optional value': optional_value.optional_value
                    readonly 'result': optional_value.result
                }
                
            }
            
            export type l_state = 
                | readonly ['state', l_state.state]
                | readonly ['optional value', l_state.optional_value]
            
        }
        
        export type result = {
            readonly 'l location': result.l_location
            readonly 'l state': result.l_state
        }
        
    }
    
    export type l_state = 
        | readonly ['parameter', l_state.parameter]
        | readonly ['result', l_state.result]
    
}

export type Resolver_Possible_Value_Selection_ = {
    readonly 'l location': Resolver_Possible_Value_Selection_.l_location
    readonly 'l state': Resolver_Possible_Value_Selection_.l_state
}

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
