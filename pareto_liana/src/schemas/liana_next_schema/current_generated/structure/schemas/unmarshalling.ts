import type * as p_ from "pareto-core/schema"

import type * as self from "./unmarshalling.js"


export namespace Value_Type {
    
    export type dictionary = null
    
    export type group = null
    
    export type list = null
    
    export type nothing = null
    
    export type optional = null
    
    export type reference = null
    
    export type state = null
    
    export type text = null
}

export type Value_Type =
    | readonly ['dictionary', self.Value_Type.dictionary]
    | readonly ['group', self.Value_Type.group]
    | readonly ['list', self.Value_Type.list]
    | readonly ['nothing', self.Value_Type.nothing]
    | readonly ['optional', self.Value_Type.optional]
    | readonly ['reference', self.Value_Type.reference]
    | readonly ['state', self.Value_Type.state]
    | readonly ['text', self.Value_Type.text]

export namespace Error {
    
    export namespace type_mismatch {
        
        export type expected = self.Value_Type
        
        export type found = self.Value_Type
    }
    
    export type type_mismatch = {
        readonly 'expected': self.Error.type_mismatch.expected
        readonly 'found': self.Error.type_mismatch.found
    }
    
    export namespace unknown_state_option {
        
        export type identifier = string
    }
    
    export type unknown_state_option = {
        readonly 'identifier': self.Error.unknown_state_option.identifier
    }
    
    export namespace missing_property {
        
        export type identifier = string
    }
    
    export type missing_property = {
        readonly 'identifier': self.Error.missing_property.identifier
    }
}

export type Error =
    | readonly ['type mismatch', self.Error.type_mismatch]
    | readonly ['unknown state option', self.Error.unknown_state_option]
    | readonly ['missing property', self.Error.missing_property]
