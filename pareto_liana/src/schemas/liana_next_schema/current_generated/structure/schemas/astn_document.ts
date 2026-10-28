import type * as p_ from 'pareto-core/schema'

import type * as s_self from "./astn_document.js"

export type Value = {
    readonly 'type': s_self.Value.type_
}

export namespace Value {
    
    export type type_ =
        | readonly ['dictionary', s_self.Value.type_.type_.dictionary]
        | readonly ['group', s_self.Value.type_.type_.group]
        | readonly ['list', s_self.Value.type_.type_.list]
        | readonly ['nothing', s_self.Value.type_.type_.nothing]
        | readonly ['optional', s_self.Value.type_.type_.optional]
        | readonly ['reference', s_self.Value.type_.type_.reference]
        | readonly ['state', s_self.Value.type_.type_.state]
        | readonly ['text', s_self.Value.type_.type_.text]
    
    export namespace type_ {
        export namespace type_ {
            
            export type dictionary = {
                readonly 'entries': s_self.Value.type_.type_.dictionary.entries
            }
            
            export namespace dictionary {
                
                export type entries = p_.Dictionary<s_self.Value.type_.type_.dictionary.entries.D>
                
                export namespace entries {
                    
                    export type D = s_self.Value
                    
                }
                
            }
            
            export type group = {
                readonly 'properties': s_self.Value.type_.type_.group.properties
            }
            
            export namespace group {
                
                export type properties = p_.Dictionary<s_self.Value.type_.type_.group.properties.D>
                
                export namespace properties {
                    
                    export type D = s_self.Value
                    
                }
                
            }
            
            export type list = {
                readonly 'items': s_self.Value.type_.type_.list.items
            }
            
            export namespace list {
                
                export type items = p_.List<s_self.Value.type_.type_.list.items.L>
                
                export namespace items {
                    
                    export type L = s_self.Value
                    
                }
                
            }
            
            export type nothing = null
            
            export type optional = p_.Optional_Value<s_self.Value.type_.type_.optional.O>
            
            export namespace optional {
                
                export type O = s_self.Value
                
            }
            
            export type reference = string
            
            export type state = {
                readonly 'option': s_self.Value.type_.type_.state.option
                readonly 'value': s_self.Value.type_.type_.state.value
            }
            
            export namespace state {
                
                export type option = string
                
                export type value = s_self.Value
                
            }
            
            export type text = string
            
        }
        
    }
    
}
