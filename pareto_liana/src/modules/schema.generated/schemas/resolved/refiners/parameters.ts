import type * as p_schema from 'pareto-core/schema'

import type * as s_target from "../schema.js"

export namespace s_parameters {
    export type Types = {
        readonly 'basic types': p_schema.Optional_Value<s_target.Basic_Types>
        
    }

    export type Dictionary = {
        readonly 'basic types': p_schema.Optional_Value<s_target.Basic_Types>
        
    }

    export type Value = {
        readonly 'basic types': p_schema.Optional_Value<s_target.Basic_Types>
        
    }

    

    export type Resolver_Signatures = {
        readonly 'types': s_target.Types
        
    }

    export type Resolver_Signature_Parameters = {
        readonly 'types': s_target.Types
        
    }

    export type Resolver_Value = {
        readonly 'definition': s_target.Value
        readonly 'list cursor': p_schema.Optional_Value<s_target.Resolver_Value_List_Result>
        readonly 'linked entry': p_schema.Optional_Value<s_target.Resolver_Benchmark>
        readonly 'current dictionary': p_schema.Optional_Value<s_target.Dictionary>
        readonly 'current ordered dictionary': p_schema.Optional_Value<s_target.Dictionary>
        readonly 'signature': s_target.Resolver_Signature
        readonly 'signatures': s_target.Resolver_Signatures
        readonly 'types': s_target.Types
        readonly 'option constraints': p_schema.Optional_Value<s_target.Resolver_Option_Constraints>
    }

    export type Type = {
        readonly 'basic types': p_schema.Optional_Value<s_target.Basic_Types>
        
    }

    export type Resolver_Types = {
        readonly 'signatures': s_target.Resolver_Signatures
        readonly 'types': s_target.Types
        
    }

    export type Resolver_Benchmark = {
        readonly 'definition': s_target.Value
        readonly 'list cursor': p_schema.Optional_Value<s_target.Resolver_Value_List_Result>
        readonly 'linked entry': p_schema.Optional_Value<s_target.Resolver_Benchmark>
        readonly 'current dictionary': p_schema.Optional_Value<s_target.Dictionary>
        readonly 'current ordered dictionary': p_schema.Optional_Value<s_target.Dictionary>
        readonly 'signature': s_target.Resolver_Signature
        readonly 'signatures': s_target.Resolver_Signatures
        readonly 'types': s_target.Types
        readonly 'option constraints': p_schema.Optional_Value<s_target.Resolver_Option_Constraints>
    }

    export type Group = {
        readonly 'basic types': p_schema.Optional_Value<s_target.Basic_Types>
        
    }

    export type Value_Reference = {
        
    }

    export type Value_Path = {
        readonly 'type': s_target.Type
    }

    export type Type_Reference = {
        
    }

    export type Resolver_Signature = {
        readonly 'types': s_target.Types
        readonly 'type': s_target.Type
        
    }

    export type Resolver_Relative_Value_Selection = {
        readonly 'value': s_target.Value
    }

    export type Resolver_Lookup_Selection = {
        readonly 'definition': s_target.Value
        readonly 'list cursor': p_schema.Optional_Value<s_target.Resolver_Value_List_Result>
        readonly 'linked entry': p_schema.Optional_Value<s_target.Resolver_Benchmark>
        readonly 'current dictionary': p_schema.Optional_Value<s_target.Dictionary>
        readonly 'current ordered dictionary': p_schema.Optional_Value<s_target.Dictionary>
        readonly 'signature': s_target.Resolver_Signature
        readonly 'signatures': s_target.Resolver_Signatures
        readonly 'types': s_target.Types
        readonly 'option constraints': p_schema.Optional_Value<s_target.Resolver_Option_Constraints>
    }

    export type Resolver_Constraint = {
        readonly 'value': s_target.Value
    }

    export type Resolver_Option_Constraints = {
        readonly 'definition': s_target.Value
        readonly 'list cursor': p_schema.Optional_Value<s_target.Resolver_Value_List_Result>
        readonly 'linked entry': p_schema.Optional_Value<s_target.Resolver_Benchmark>
        readonly 'current dictionary': p_schema.Optional_Value<s_target.Dictionary>
        readonly 'current ordered dictionary': p_schema.Optional_Value<s_target.Dictionary>
        readonly 'signature': s_target.Resolver_Signature
        readonly 'signatures': s_target.Resolver_Signatures
        readonly 'types': s_target.Types
        readonly 'option constraints': p_schema.Optional_Value<s_target.Resolver_Option_Constraints>
    }

    export type Resolver_Optional_Value_Constraints = {
        readonly 'value': s_target.Value
    }

    export type Resolver_Value_Constraints = {
        readonly 'value': s_target.Value
    }

    export type Resolver_Value_Constraint = {
        readonly 'value': s_target.Value
    }

    export type Resolver_Optional_Value_Initialization = {
        readonly 'definition': s_target.Value
        readonly 'list cursor': p_schema.Optional_Value<s_target.Resolver_Value_List_Result>
        readonly 'linked entry': p_schema.Optional_Value<s_target.Resolver_Benchmark>
        readonly 'current dictionary': p_schema.Optional_Value<s_target.Dictionary>
        readonly 'current ordered dictionary': p_schema.Optional_Value<s_target.Dictionary>
        readonly 'signature': s_target.Resolver_Signature
        readonly 'signatures': s_target.Resolver_Signatures
        readonly 'types': s_target.Types
        readonly 'option constraints': p_schema.Optional_Value<s_target.Resolver_Option_Constraints>
    }

    export type Resolver_Value_Group = {
        readonly 'definition': s_target.Group
        readonly 'list cursor': p_schema.Optional_Value<s_target.Resolver_Value_List_Result>
        readonly 'linked entry': p_schema.Optional_Value<s_target.Resolver_Benchmark>
        readonly 'current dictionary': p_schema.Optional_Value<s_target.Dictionary>
        readonly 'current ordered dictionary': p_schema.Optional_Value<s_target.Dictionary>
        readonly 'signature': s_target.Resolver_Signature
        readonly 'signatures': s_target.Resolver_Signatures
        readonly 'types': s_target.Types
        readonly 'option constraints': p_schema.Optional_Value<s_target.Resolver_Option_Constraints>
    }

    export type Resolver_Value_List_Result = {
        
    }

    export type Value_Results = {
        
    }

    export type Option_Constraints = {
        
    }

    export type Resolver_Guaranteed_Value_Selection = {
        readonly 'definition': s_target.Value
        readonly 'list cursor': p_schema.Optional_Value<s_target.Resolver_Value_List_Result>
        readonly 'linked entry': p_schema.Optional_Value<s_target.Resolver_Benchmark>
        readonly 'current dictionary': p_schema.Optional_Value<s_target.Dictionary>
        readonly 'current ordered dictionary': p_schema.Optional_Value<s_target.Dictionary>
        readonly 'signature': s_target.Resolver_Signature
        readonly 'signatures': s_target.Resolver_Signatures
        readonly 'types': s_target.Types
        readonly 'option constraints': p_schema.Optional_Value<s_target.Resolver_Option_Constraints>
    }

    export type Resolver_Possible_Value_Selection = {
        readonly 'definition': s_target.Value
        readonly 'list cursor': p_schema.Optional_Value<s_target.Resolver_Value_List_Result>
        readonly 'linked entry': p_schema.Optional_Value<s_target.Resolver_Benchmark>
        readonly 'current dictionary': p_schema.Optional_Value<s_target.Dictionary>
        readonly 'current ordered dictionary': p_schema.Optional_Value<s_target.Dictionary>
        readonly 'signature': s_target.Resolver_Signature
        readonly 'signatures': s_target.Resolver_Signatures
        readonly 'types': s_target.Types
        readonly 'option constraints': p_schema.Optional_Value<s_target.Resolver_Option_Constraints>
    }
}
