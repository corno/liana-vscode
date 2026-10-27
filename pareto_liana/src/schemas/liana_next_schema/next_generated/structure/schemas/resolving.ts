import type * as p_ from 'pareto-core/schema'

import type * as s_self from "./resolving.js"

export type Error = {
    readonly 'type':
        | readonly ['option constraint failed', {
            readonly 'constraint': string
        }]
        | readonly ['reference constraint failed', {
            readonly 'constraint': string
        }]
        | readonly ['missing component value argument', {
            readonly 'argument': string
        }]
        | readonly ['selection has no context', null]
        | readonly ['missing reference', {
            readonly 'identifier': string
        }]
        | readonly ['reference lookup has no context', null]
        | readonly ['cyclic reference dependency', {
            readonly 'identifier': string
        }]
        | readonly ['premature reference access', {
            readonly 'identifier': string
        }]
        | readonly ['missing benchmark entry', {
            readonly 'identifier': string
        }]
        | readonly ['benchmark lookup has no context', null]
        | readonly ['cyclic benchmark dependency', {
            readonly 'identifier': string
        }]
        | readonly ['premature benchmark access', {
            readonly 'identifier': string
        }]
        | readonly ['missing dense dictionary entry', null]
}

export namespace Error {
    
    export type type_ =
        | readonly ['option constraint failed', {
            readonly 'constraint': string
        }]
        | readonly ['reference constraint failed', {
            readonly 'constraint': string
        }]
        | readonly ['missing component value argument', {
            readonly 'argument': string
        }]
        | readonly ['selection has no context', null]
        | readonly ['missing reference', {
            readonly 'identifier': string
        }]
        | readonly ['reference lookup has no context', null]
        | readonly ['cyclic reference dependency', {
            readonly 'identifier': string
        }]
        | readonly ['premature reference access', {
            readonly 'identifier': string
        }]
        | readonly ['missing benchmark entry', {
            readonly 'identifier': string
        }]
        | readonly ['benchmark lookup has no context', null]
        | readonly ['cyclic benchmark dependency', {
            readonly 'identifier': string
        }]
        | readonly ['premature benchmark access', {
            readonly 'identifier': string
        }]
        | readonly ['missing dense dictionary entry', null]
    
    export namespace type_ {
        export namespace type_ {
            
            export type option_constraint_failed = {
                readonly 'constraint': string
            }
            
            export namespace option_constraint_failed {
                
                export type constraint = string
                
            }
            
            export type reference_constraint_failed = {
                readonly 'constraint': string
            }
            
            export namespace reference_constraint_failed {
                
                export type constraint = string
                
            }
            
            export type missing_component_value_argument = {
                readonly 'argument': string
            }
            
            export namespace missing_component_value_argument {
                
                export type argument = string
                
            }
            
            export type selection_has_no_context = null
            
            export type missing_reference = {
                readonly 'identifier': string
            }
            
            export namespace missing_reference {
                
                export type identifier = string
                
            }
            
            export type reference_lookup_has_no_context = null
            
            export type cyclic_reference_dependency = {
                readonly 'identifier': string
            }
            
            export namespace cyclic_reference_dependency {
                
                export type identifier = string
                
            }
            
            export type premature_reference_access = {
                readonly 'identifier': string
            }
            
            export namespace premature_reference_access {
                
                export type identifier = string
                
            }
            
            export type missing_benchmark_entry = {
                readonly 'identifier': string
            }
            
            export namespace missing_benchmark_entry {
                
                export type identifier = string
                
            }
            
            export type benchmark_lookup_has_no_context = null
            
            export type cyclic_benchmark_dependency = {
                readonly 'identifier': string
            }
            
            export namespace cyclic_benchmark_dependency {
                
                export type identifier = string
                
            }
            
            export type premature_benchmark_access = {
                readonly 'identifier': string
            }
            
            export namespace premature_benchmark_access {
                
                export type identifier = string
                
            }
            
            export type missing_dense_dictionary_entry = null
            
        }
        
    }
    
}
