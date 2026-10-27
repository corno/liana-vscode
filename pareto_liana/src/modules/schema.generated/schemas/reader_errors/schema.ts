import * as p_ from 'pareto-core/schema'
import type * as __schema from "./schema.js"

// imports
import * as s_value from "liana-runtime/modules/value_unmarshalling/schemas/unmarshalling/schema"
import * as s_location from "astn-runtime/modules/deserialization/schemas/location/schema"
import * as s_parser from "astn-runtime/modules/deserialization/schemas/parse_tree_deserialization/schema"
import * as s_resolver from "liana-runtime/modules/resolved_document_deserialization/schemas/resolving/schema"
export namespace types {
    
    export namespace Unmarshalling_Error {
        
        export type value = s_value.Error
        
        export namespace token_syntax {
            
            export type type_ = string
            
            export type expected = string
            
            export type found = string
            
            export type range = s_location.Range
        }
        
        export type token_syntax = {
            readonly 'type': token_syntax.type_
            readonly 'expected': token_syntax.expected
            readonly 'found': token_syntax.found
            readonly 'range': token_syntax.range
        }
        
        export namespace token_regular_expression {
            
            export type type_ = string
            
            export type pattern = string
            
            export type value = string
            
            export type range = s_location.Range
        }
        
        export type token_regular_expression = {
            readonly 'type': token_regular_expression.type_
            readonly 'pattern': token_regular_expression.pattern
            readonly 'value': token_regular_expression.value
            readonly 'range': token_regular_expression.range
        }
    }
    
    export type Unmarshalling_Error = 
        | readonly ['value', Unmarshalling_Error.value]
        | readonly ['token syntax', Unmarshalling_Error.token_syntax]
        | readonly ['token regular expression', Unmarshalling_Error.token_regular_expression]
    
    export namespace Unresolved_Error {
        
        export type parse_tree_deserialization = s_parser.Error
        
        export type unmarshalling = __schema.types.Unmarshalling_Error
    }
    
    export type Unresolved_Error = 
        | readonly ['parse tree deserialization', Unresolved_Error.parse_tree_deserialization]
        | readonly ['unmarshalling', Unresolved_Error.unmarshalling]
    
    export type Resolving_Error = import('../../../../schemas/liana_next_schema/resolving_error.js').Resolving_Error & {
        readonly location: s_location.Range
    }
    
    export namespace Resolved_Error {
        
        export type unresolved_document_deserialization = __schema.types.Unresolved_Error
        
        export type resolving = __schema.types.Resolving_Error
    }
    
    export type Resolved_Error = 
        | readonly ['unresolved document deserialization', Resolved_Error.unresolved_document_deserialization]
        | readonly ['resolving', Resolved_Error.resolving]
}
export namespace namespaces {}
