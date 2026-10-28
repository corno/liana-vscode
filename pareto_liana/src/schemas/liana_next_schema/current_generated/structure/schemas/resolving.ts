import type * as p_ from 'pareto-core/schema'

import type * as s_self from "./resolving.js"

export type Error = {
    readonly 'type': s_self.Error.type_
}

export namespace Error {
    
    export type type_ =
        | readonly ['option constraint failed', s_self.Error.type_.type_.option_constraint_failed]
        | readonly ['reference constraint failed', s_self.Error.type_.type_.reference_constraint_failed]
        | readonly ['missing component value argument', s_self.Error.type_.type_.missing_component_value_argument]
        | readonly ['selection has no context', s_self.Error.type_.type_.selection_has_no_context]
        | readonly ['missing reference', s_self.Error.type_.type_.missing_reference]
        | readonly ['reference lookup has no context', s_self.Error.type_.type_.reference_lookup_has_no_context]
        | readonly ['cyclic reference dependency', s_self.Error.type_.type_.cyclic_reference_dependency]
        | readonly ['premature reference access', s_self.Error.type_.type_.premature_reference_access]
        | readonly ['missing benchmark entry', s_self.Error.type_.type_.missing_benchmark_entry]
        | readonly ['benchmark lookup has no context', s_self.Error.type_.type_.benchmark_lookup_has_no_context]
        | readonly ['cyclic benchmark dependency', s_self.Error.type_.type_.cyclic_benchmark_dependency]
        | readonly ['premature benchmark access', s_self.Error.type_.type_.premature_benchmark_access]
        | readonly ['missing dense dictionary entry', s_self.Error.type_.type_.missing_dense_dictionary_entry]
    
    export namespace type_ {
        export namespace type_ {
            
            export type option_constraint_failed = {
                readonly 'constraint': s_self.Error.type_.type_.option_constraint_failed.constraint
            }
            
            export namespace option_constraint_failed {
                
                export type constraint = string
                
            }
            
            export type reference_constraint_failed = {
                readonly 'constraint': s_self.Error.type_.type_.reference_constraint_failed.constraint
            }
            
            export namespace reference_constraint_failed {
                
                export type constraint = string
                
            }
            
            export type missing_component_value_argument = {
                readonly 'argument': s_self.Error.type_.type_.missing_component_value_argument.argument
            }
            
            export namespace missing_component_value_argument {
                
                export type argument = string
                
            }
            
            export type selection_has_no_context = null
            
            export type missing_reference = {
                readonly 'identifier': s_self.Error.type_.type_.missing_reference.identifier
            }
            
            export namespace missing_reference {
                
                export type identifier = string
                
            }
            
            export type reference_lookup_has_no_context = null
            
            export type cyclic_reference_dependency = {
                readonly 'identifier': s_self.Error.type_.type_.cyclic_reference_dependency.identifier
            }
            
            export namespace cyclic_reference_dependency {
                
                export type identifier = string
                
            }
            
            export type premature_reference_access = {
                readonly 'identifier': s_self.Error.type_.type_.premature_reference_access.identifier
            }
            
            export namespace premature_reference_access {
                
                export type identifier = string
                
            }
            
            export type missing_benchmark_entry = {
                readonly 'identifier': s_self.Error.type_.type_.missing_benchmark_entry.identifier
            }
            
            export namespace missing_benchmark_entry {
                
                export type identifier = string
                
            }
            
            export type benchmark_lookup_has_no_context = null
            
            export type cyclic_benchmark_dependency = {
                readonly 'identifier': s_self.Error.type_.type_.cyclic_benchmark_dependency.identifier
            }
            
            export namespace cyclic_benchmark_dependency {
                
                export type identifier = string
                
            }
            
            export type premature_benchmark_access = {
                readonly 'identifier': s_self.Error.type_.type_.premature_benchmark_access.identifier
            }
            
            export namespace premature_benchmark_access {
                
                export type identifier = string
                
            }
            
            export type missing_dense_dictionary_entry = null
            
        }
        
    }
    
}
