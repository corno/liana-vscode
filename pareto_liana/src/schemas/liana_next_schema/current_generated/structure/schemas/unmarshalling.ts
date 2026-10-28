import type * as p_ from 'pareto-core/schema'

import type * as s_self from "./unmarshalling.js"

export type Error =
    | readonly ['type mismatch', s_self.Error.type_.type_mismatch]
    | readonly ['unknown state option', s_self.Error.type_.unknown_state_option]
    | readonly ['missing property', s_self.Error.type_.missing_property]

export namespace Error {
    export namespace type_ {
        
        export type type_mismatch = {
            readonly 'expected': s_self.Error.type_.type_mismatch.expected
            readonly 'found': s_self.Error.type_.type_mismatch.found
        }
        
        export namespace type_mismatch {
            
            export type expected = s_self.Value_Type
            
            export type found = s_self.Value_Type
            
        }
        
        export type unknown_state_option = {
            readonly 'identifier': s_self.Error.type_.unknown_state_option.identifier
        }
        
        export namespace unknown_state_option {
            
            export type identifier = string
            
        }
        
        export type missing_property = {
            readonly 'identifier': s_self.Error.type_.missing_property.identifier
        }
        
        export namespace missing_property {
            
            export type identifier = string
            
        }
        
    }
    
}

export type Value_Type =
    | readonly ['dictionary', s_self.Value_Type.type_.dictionary]
    | readonly ['group', s_self.Value_Type.type_.group]
    | readonly ['list', s_self.Value_Type.type_.list]
    | readonly ['nothing', s_self.Value_Type.type_.nothing]
    | readonly ['optional', s_self.Value_Type.type_.optional]
    | readonly ['reference', s_self.Value_Type.type_.reference]
    | readonly ['state', s_self.Value_Type.type_.state]
    | readonly ['text', s_self.Value_Type.type_.text]

export namespace Value_Type {
    export namespace type_ {
        
        export type dictionary = null
        
        export type group = null
        
        export type list = null
        
        export type nothing = null
        
        export type optional = null
        
        export type reference = null
        
        export type state = null
        
        export type text = null
        
    }
    
}
