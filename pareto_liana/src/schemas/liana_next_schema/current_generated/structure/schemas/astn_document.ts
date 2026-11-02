import type * as p_ from "pareto-core/schema"

import type * as self from "./astn_document.js"


export namespace Value {
    
    export namespace type_ {
        
        export namespace dictionary {
            
            export namespace entries {
                
                export type D = self.Value
            }
            
            export type entries = p_.Dictionary<self.Value.type_.dictionary.entries.D>
        }
        
        export type dictionary = {
            readonly 'entries': self.Value.type_.dictionary.entries
        }
        
        export namespace group {
            
            export namespace properties {
                
                export type D = self.Value
            }
            
            export type properties = p_.Dictionary<self.Value.type_.group.properties.D>
        }
        
        export type group = {
            readonly 'properties': self.Value.type_.group.properties
        }
        
        export namespace list {
            
            export namespace items {
                
                export type L = self.Value
            }
            
            export type items = p_.List<self.Value.type_.list.items.L>
        }
        
        export type list = {
            readonly 'items': self.Value.type_.list.items
        }
        
        export type nothing = null
        
        export namespace optional {
            
            export type O = self.Value
        }
        
        export type optional = p_.Optional_Value<self.Value.type_.optional.O>
        
        export type reference = string
        
        export namespace state {
            
            export type option = string
            
            export type value = self.Value
        }
        
        export type state = {
            readonly 'option': self.Value.type_.state.option
            readonly 'value': self.Value.type_.state.value
        }
        
        export type text = string
    }
    
    export type type_ =
        | readonly ['dictionary', self.Value.type_.dictionary]
        | readonly ['group', self.Value.type_.group]
        | readonly ['list', self.Value.type_.list]
        | readonly ['nothing', self.Value.type_.nothing]
        | readonly ['optional', self.Value.type_.optional]
        | readonly ['reference', self.Value.type_.reference]
        | readonly ['state', self.Value.type_.state]
        | readonly ['text', self.Value.type_.text]
}

export type Value = {
    readonly 'type': self.Value.type_
}
