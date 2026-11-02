import type * as p_ from "pareto-core/schema"

import type * as self from "./resolving.js"


export namespace Error {
    
    export namespace type_ {
        
        export namespace option_constraint_failed {
            
            export type constraint = string
        }
        
        export type option_constraint_failed = {
            readonly 'constraint': self.Error.type_.option_constraint_failed.constraint
        }
        
        export namespace reference_constraint_failed {
            
            export type constraint = string
        }
        
        export type reference_constraint_failed = {
            readonly 'constraint': self.Error.type_.reference_constraint_failed.constraint
        }
        
        export namespace missing_component_value_argument {
            
            export type argument = string
        }
        
        export type missing_component_value_argument = {
            readonly 'argument': self.Error.type_.missing_component_value_argument.argument
        }
        
        export type selection_has_no_context = null
        
        export namespace missing_reference {
            
            export type identifier = string
        }
        
        export type missing_reference = {
            readonly 'identifier': self.Error.type_.missing_reference.identifier
        }
        
        export type reference_lookup_has_no_context = null
        
        export namespace cyclic_reference_dependency {
            
            export type identifier = string
        }
        
        export type cyclic_reference_dependency = {
            readonly 'identifier': self.Error.type_.cyclic_reference_dependency.identifier
        }
        
        export namespace premature_reference_access {
            
            export type identifier = string
        }
        
        export type premature_reference_access = {
            readonly 'identifier': self.Error.type_.premature_reference_access.identifier
        }
        
        export namespace missing_benchmark_entry {
            
            export type identifier = string
        }
        
        export type missing_benchmark_entry = {
            readonly 'identifier': self.Error.type_.missing_benchmark_entry.identifier
        }
        
        export type benchmark_lookup_has_no_context = null
        
        export namespace cyclic_benchmark_dependency {
            
            export type identifier = string
        }
        
        export type cyclic_benchmark_dependency = {
            readonly 'identifier': self.Error.type_.cyclic_benchmark_dependency.identifier
        }
        
        export namespace premature_benchmark_access {
            
            export type identifier = string
        }
        
        export type premature_benchmark_access = {
            readonly 'identifier': self.Error.type_.premature_benchmark_access.identifier
        }
        
        export type missing_dense_dictionary_entry = null
    }
    
    export type type_ =
        | readonly ['option constraint failed', self.Error.type_.option_constraint_failed]
        | readonly ['reference constraint failed', self.Error.type_.reference_constraint_failed]
        | readonly ['missing component value argument', self.Error.type_.missing_component_value_argument]
        | readonly ['selection has no context', self.Error.type_.selection_has_no_context]
        | readonly ['missing reference', self.Error.type_.missing_reference]
        | readonly ['reference lookup has no context', self.Error.type_.reference_lookup_has_no_context]
        | readonly ['cyclic reference dependency', self.Error.type_.cyclic_reference_dependency]
        | readonly ['premature reference access', self.Error.type_.premature_reference_access]
        | readonly ['missing benchmark entry', self.Error.type_.missing_benchmark_entry]
        | readonly ['benchmark lookup has no context', self.Error.type_.benchmark_lookup_has_no_context]
        | readonly ['cyclic benchmark dependency', self.Error.type_.cyclic_benchmark_dependency]
        | readonly ['premature benchmark access', self.Error.type_.premature_benchmark_access]
        | readonly ['missing dense dictionary entry', self.Error.type_.missing_dense_dictionary_entry]
}

export type Error = {
    readonly 'type': self.Error.type_
}
