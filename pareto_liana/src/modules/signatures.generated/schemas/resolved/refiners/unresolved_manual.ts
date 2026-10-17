import * as p_ from 'pareto-core/refiner'
import * as p_sl from 'pareto-core/refiner/specials/lookup'
import p_variables from 'pareto-core/refiner/specials/variables'
import p_change_context from 'pareto-core/refiner/specials/change_context'


import * as p_i from 'pareto-core/__internal/Abort'
import * as p_di from 'pareto-core/schema'
import * as p_ri from 'pareto-core/refiner'

import * as i_generic from "liana-runtime/modules/resolved_document_deserialization/schemas/resolving/schema"

import * as s_out from "../schema.js"
import * as s_in from "../../../../schema.generated/schemas/unresolved/schema.js"

namespace declarations {
export namespace Package_ {
    
    export type I = s_in.Package
    
    export type O = s_out.Package
    
    export type E = i_generic.Error
    
    export namespace P {
        
    }
    
}

export type Package_ = (
    context: Package_.I,
    abort: p_i.Abort<Package_.E>,
    lookups: symbol,
    parameters: symbol,
) => Package_.O

export namespace Presence_ {
    
    export type I = s_in.Presence
    
    export type O = s_out.Presence
    
    export type E = i_generic.Error
    
    export namespace P {
        
    }
    
}

export type Presence_ = (
    context: Presence_.I,
    abort: p_i.Abort<Presence_.E>,
    lookups: symbol,
    parameters: symbol,
) => Presence_.O

export namespace Simple_Type_ {
    
    export type I = s_in.Simple_Type
    
    export type O = s_out.Simple_Type
    
    export type E = i_generic.Error
    
    export namespace P {
        
    }
    
}

export type Simple_Type_ = (
    context: Simple_Type_.I,
    abort: p_i.Abort<Simple_Type_.E>,
    lookups: symbol,
    parameters: symbol,
) => Simple_Type_.O

export namespace Text_Type_ {
    
    export type I = s_in.Text_Type
    
    export type O = s_out.Text_Type
    
    export type E = i_generic.Error
    
    export namespace P {
        
    }
    
}

export type Text_Type_ = (
    context: Text_Type_.I,
    abort: p_i.Abort<Text_Type_.E>,
    lookups: symbol,
    parameters: symbol,
) => Text_Type_.O

export namespace Globals_ {
    
    export type I = s_in.Globals
    
    export type O = s_out.Globals
    
    export type E = i_generic.Error
    
    export namespace P {
        
    }
    
}

export type Globals_ = (
    context: Globals_.I,
    abort: p_i.Abort<Globals_.E>,
    lookups: symbol,
    parameters: symbol,
) => Globals_.O

export namespace Group_ {
    
    export type I = s_in.Group
    
    export type O = s_out.Group
    
    export type E = i_generic.Error
    
    export namespace L {
        
        export type noncircular_sibling_modules = s_out.Modules_.D
        
    }
    
    export namespace L {
        
        export type possibly_circular_dependent_sibling_modules = s_out.Modules_.D
        
    }
    
    export namespace P {
        
        export namespace globals {
            
            export type O = s_out.Globals_
            
        }
        
        export type globals = p_di.Optional_Value<globals.O>
        
        export namespace imports {
            
            export type O = s_out.Schema_Imports_
            
        }
        
        export type imports = p_di.Optional_Value<imports.O>
        
    }
    
}

export type Group_ = (
    context: Group_.I,
    abort: p_i.Abort<Group_.E>,
    lookups: {
        readonly 'noncircular sibling modules': p_ri.lookup.Acyclic<Group_.L.noncircular_sibling_modules>
        readonly 'possibly circular dependent sibling modules': p_ri.lookup.Cyclic<Group_.L.possibly_circular_dependent_sibling_modules>
    },
    parameters: {
        readonly 'globals': Group_.P.globals
        readonly 'imports': Group_.P.imports
    },
) => Group_.O

export namespace Dictionary_ {
    
    export type I = s_in.Dictionary
    
    export type O = s_out.Dictionary
    
    export type E = i_generic.Error
    
    export namespace L {
        
        export type noncircular_sibling_modules = s_out.Modules_.D
        
    }
    
    export namespace L {
        
        export type possibly_circular_dependent_sibling_modules = s_out.Modules_.D
        
    }
    
    export namespace P {
        
        export namespace globals {
            
            export type O = s_out.Globals_
            
        }
        
        export type globals = p_di.Optional_Value<globals.O>
        
        export namespace imports {
            
            export type O = s_out.Schema_Imports_
            
        }
        
        export type imports = p_di.Optional_Value<imports.O>
        
    }
    
}

export type Dictionary_ = (
    context: Dictionary_.I,
    abort: p_i.Abort<Dictionary_.E>,
    lookups: {
        readonly 'noncircular sibling modules': p_ri.lookup.Acyclic<Dictionary_.L.noncircular_sibling_modules>
        readonly 'possibly circular dependent sibling modules': p_ri.lookup.Cyclic<Dictionary_.L.possibly_circular_dependent_sibling_modules>
    },
    parameters: {
        readonly 'globals': Dictionary_.P.globals
        readonly 'imports': Dictionary_.P.imports
    },
) => Dictionary_.O

export namespace Value_ {
    
    export type I = s_in.Value
    
    export type O = s_out.Value
    
    export type E = i_generic.Error
    
    export namespace L {
        
        export type noncircular_sibling_modules = s_out.Modules_.D
        
    }
    
    export namespace L {
        
        export type possibly_circular_dependent_sibling_modules = s_out.Modules_.D
        
    }
    
    export namespace P {
        
        export namespace globals {
            
            export type O = s_out.Globals_
            
        }
        
        export type globals = p_di.Optional_Value<globals.O>
        
        export namespace imports {
            
            export type O = s_out.Schema_Imports_
            
        }
        
        export type imports = p_di.Optional_Value<imports.O>
        
    }
    
}

export type Value_ = (
    context: Value_.I,
    abort: p_i.Abort<Value_.E>,
    lookups: {
        readonly 'noncircular sibling modules': p_ri.lookup.Acyclic<Value_.L.noncircular_sibling_modules>
        readonly 'possibly circular dependent sibling modules': p_ri.lookup.Cyclic<Value_.L.possibly_circular_dependent_sibling_modules>
    },
    parameters: {
        readonly 'globals': Value_.P.globals
        readonly 'imports': Value_.P.imports
    },
) => Value_.O

export namespace Module_Reference_ {
    
    export type I = s_in.Module_Reference
    
    export type O = s_out.Module_Reference
    
    export type E = i_generic.Error
    
    export namespace L {
        
        export type modules = s_out.Modules_.D
        
    }
    
    export namespace P {
        
        export namespace imports {
            
            export type O = s_out.Schema_Imports_
            
        }
        
        export type imports = p_di.Optional_Value<imports.O>
        
    }
    
}

export type Module_Reference_ = (
    context: Module_Reference_.I,
    abort: p_i.Abort<Module_Reference_.E>,
    lookups: {
        readonly 'modules': p_ri.lookup.Acyclic<Module_Reference_.L.modules>
    },
    parameters: {
        readonly 'imports': Module_Reference_.P.imports
    },
) => Module_Reference_.O

export namespace Value_Reference_ {
    
    export type I = s_in.Value_Reference
    
    export type O = s_out.Value_Reference
    
    export type E = i_generic.Error
    
    export namespace L {
        
        export type modules = s_out.Modules_.D
        
    }
    
    export namespace P {
        
        export namespace imports {
            
            export type O = s_out.Schema_Imports_
            
        }
        
        export type imports = p_di.Optional_Value<imports.O>
        
    }
    
}

export type Value_Reference_ = (
    context: Value_Reference_.I,
    abort: p_i.Abort<Value_Reference_.E>,
    lookups: {
        readonly 'modules': p_ri.lookup.Acyclic<Value_Reference_.L.modules>
    },
    parameters: {
        readonly 'imports': Value_Reference_.P.imports
    },
) => Value_Reference_.O

export namespace Value_Results_ {
    
    export type I = s_in.Value_Results
    
    export type O = s_out.Value_Results
    
    export type E = i_generic.Error
    
    export namespace L {
        
        export type modules = s_out.Modules_.D
        
    }
    
    export namespace P {
        
        export namespace imports {
            
            export type O = s_out.Schema_Imports_
            
        }
        
        export type imports = p_di.Optional_Value<imports.O>
        
    }
    
}

export type Value_Results_ = (
    context: Value_Results_.I,
    abort: p_i.Abort<Value_Results_.E>,
    lookups: {
        readonly 'modules': p_ri.lookup.Acyclic<Value_Results_.L.modules>
    },
    parameters: {
        readonly 'imports': Value_Results_.P.imports
    },
) => Value_Results_.O

export namespace Option_Constraints_ {
    
    export type I = s_in.Option_Constraints
    
    export type O = s_out.Option_Constraints
    
    export type E = i_generic.Error
    
    export namespace L {
        
        export type modules = s_out.Modules_.D
        
    }
    
    export namespace P {
        
        export namespace imports {
            
            export type O = s_out.Schema_Imports_
            
        }
        
        export type imports = p_di.Optional_Value<imports.O>
        
    }
    
}

export type Option_Constraints_ = (
    context: Option_Constraints_.I,
    abort: p_i.Abort<Option_Constraints_.E>,
    lookups: {
        readonly 'modules': p_ri.lookup.Acyclic<Option_Constraints_.L.modules>
    },
    parameters: {
        readonly 'imports': Option_Constraints_.P.imports
    },
) => Option_Constraints_.O

export namespace Module_ {
    
    export type I = s_in.Module
    
    export type O = s_out.Module
    
    export type E = i_generic.Error
    
    export namespace L {
        
        export type noncircular_sibling_modules = s_out.Modules_.D
        
    }
    
    export namespace L {
        
        export type possibly_circular_dependent_sibling_modules = s_out.Modules_.D
        
    }
    
    export namespace P {
        
        export namespace globals {
            
            export type O = s_out.Globals_
            
        }
        
        export type globals = p_di.Optional_Value<globals.O>
        
        export namespace imports {
            
            export type O = s_out.Schema_Imports_
            
        }
        
        export type imports = p_di.Optional_Value<imports.O>
        
    }
    
}

export type Module_ = (
    context: Module_.I,
    abort: p_i.Abort<Module_.E>,
    lookups: {
        readonly 'noncircular sibling modules': p_ri.lookup.Acyclic<Module_.L.noncircular_sibling_modules>
        readonly 'possibly circular dependent sibling modules': p_ri.lookup.Cyclic<Module_.L.possibly_circular_dependent_sibling_modules>
    },
    parameters: {
        readonly 'globals': Module_.P.globals
        readonly 'imports': Module_.P.imports
    },
) => Module_.O

export namespace Value_Path_ {
    
    export type I = s_in.Value_Path
    
    export type O = s_out.Value_Path
    
    export type E = i_generic.Error
    
    export namespace P {
        
        export type module_ = s_out.Module_
        
    }
    
}

export type Value_Path_ = (
    context: Value_Path_.I,
    abort: p_i.Abort<Value_Path_.E>,
    lookups: symbol,
    parameters: {
        readonly 'module': Value_Path_.P.module_
    },
) => Value_Path_.O

export namespace Schemas_ {
    
    export type I = s_in.Schemas
    
    export type O = s_out.Schemas
    
    export type E = i_generic.Error
    
    export namespace L {
        
        export type sibling_schemas = s_out.Schemas_.D
        
    }
    
    export namespace P {
        
    }
    
}

export type Schemas_ = (
    context: Schemas_.I,
    abort: p_i.Abort<Schemas_.E>,
    lookups: {
        readonly 'sibling schemas': p_ri.lookup.Stack<Schemas_.L.sibling_schemas>
    },
    parameters: symbol,
) => Schemas_.O

export namespace Resolver_Value_ {
    
    export type I = s_in.Resolver_Value
    
    export type O = s_out.Resolver_Value
    
    export type E = i_generic.Error
    
    export namespace L {
        
        export type sibling_property_resolvers = s_out.Resolver_Value_Group_.D
        
    }
    
    export namespace L {
        
        export type parent_sibling_property_resolvers = s_out.Resolver_Value_Group_.D
        
    }
    
    export namespace P {
        
        export type definition = s_out.Value_
        
        export namespace list_cursor {
            
            export type O = s_out.Resolver_Value_List_Result_
            
        }
        
        export type list_cursor = p_di.Optional_Value<list_cursor.O>
        
        export namespace linked_entry {
            
            export type O = s_out.Resolver_Benchmark_
            
        }
        
        export type linked_entry = p_di.Optional_Value<linked_entry.O>
        
        export namespace current_dictionary {
            
            export type O = s_out.Dictionary_
            
        }
        
        export type current_dictionary = p_di.Optional_Value<current_dictionary.O>
        
        export namespace current_ordered_dictionary {
            
            export type O = s_out.Dictionary_
            
        }
        
        export type current_ordered_dictionary = p_di.Optional_Value<current_ordered_dictionary.O>
        
        export type signature = s_out.Resolver_Signature_
        
        export namespace schema_imports {
            
            export type O = s_out.Schema_Imports_
            
        }
        
        export type schema_imports = p_di.Optional_Value<schema_imports.O>
        
        export namespace resolver_imports {
            
            export type O = s_out.Resolver_Imports_
            
        }
        
        export type resolver_imports = p_di.Optional_Value<resolver_imports.O>
        
        export type signatures = s_out.Resolver_Signatures_
        
        export type modules = s_out.Modules_
        
        export namespace option_constraints {
            
            export type O = s_out.Resolver_Option_Constraints_
            
        }
        
        export type option_constraints = p_di.Optional_Value<option_constraints.O>
        
    }
    
}

export type Resolver_Value_ = (
    context: Resolver_Value_.I,
    abort: p_i.Abort<Resolver_Value_.E>,
    lookups: {
        readonly 'sibling property resolvers': p_ri.lookup.Acyclic<Resolver_Value_.L.sibling_property_resolvers>
        readonly 'parent sibling property resolvers': p_ri.lookup.Acyclic<Resolver_Value_.L.parent_sibling_property_resolvers>
    },
    parameters: {
        readonly 'definition': Resolver_Value_.P.definition
        readonly 'list cursor': Resolver_Value_.P.list_cursor
        readonly 'linked entry': Resolver_Value_.P.linked_entry
        readonly 'current dictionary': Resolver_Value_.P.current_dictionary
        readonly 'current ordered dictionary': Resolver_Value_.P.current_ordered_dictionary
        readonly 'signature': Resolver_Value_.P.signature
        readonly 'schema imports': Resolver_Value_.P.schema_imports
        readonly 'resolver imports': Resolver_Value_.P.resolver_imports
        readonly 'signatures': Resolver_Value_.P.signatures
        readonly 'modules': Resolver_Value_.P.modules
        readonly 'option constraints': Resolver_Value_.P.option_constraints
    },
) => Resolver_Value_.O

export namespace Resolver_Possible_Value_Selection_ {
    
    export type I = s_in.Resolver_Possible_Value_Selection
    
    export type O = s_out.Resolver_Possible_Value_Selection
    
    export type E = i_generic.Error
    
    export namespace L {
        
        export type sibling_property_resolvers = s_out.Resolver_Value_Group_.D
        
    }
    
    export namespace L {
        
        export type parent_sibling_property_resolvers = s_out.Resolver_Value_Group_.D
        
    }
    
    export namespace P {
        
        export type definition = s_out.Value_
        
        export namespace list_cursor {
            
            export type O = s_out.Resolver_Value_List_Result_
            
        }
        
        export type list_cursor = p_di.Optional_Value<list_cursor.O>
        
        export namespace linked_entry {
            
            export type O = s_out.Resolver_Benchmark_
            
        }
        
        export type linked_entry = p_di.Optional_Value<linked_entry.O>
        
        export namespace current_dictionary {
            
            export type O = s_out.Dictionary_
            
        }
        
        export type current_dictionary = p_di.Optional_Value<current_dictionary.O>
        
        export namespace current_ordered_dictionary {
            
            export type O = s_out.Dictionary_
            
        }
        
        export type current_ordered_dictionary = p_di.Optional_Value<current_ordered_dictionary.O>
        
        export type signature = s_out.Resolver_Signature_
        
        export namespace schema_imports {
            
            export type O = s_out.Schema_Imports_
            
        }
        
        export type schema_imports = p_di.Optional_Value<schema_imports.O>
        
        export namespace resolver_imports {
            
            export type O = s_out.Resolver_Imports_
            
        }
        
        export type resolver_imports = p_di.Optional_Value<resolver_imports.O>
        
        export type signatures = s_out.Resolver_Signatures_
        
        export type modules = s_out.Modules_
        
        export namespace option_constraints {
            
            export type O = s_out.Resolver_Option_Constraints_
            
        }
        
        export type option_constraints = p_di.Optional_Value<option_constraints.O>
        
    }
    
}

export type Resolver_Possible_Value_Selection_ = (
    context: Resolver_Possible_Value_Selection_.I,
    abort: p_i.Abort<Resolver_Possible_Value_Selection_.E>,
    lookups: {
        readonly 'sibling property resolvers': p_ri.lookup.Acyclic<Resolver_Possible_Value_Selection_.L.sibling_property_resolvers>
        readonly 'parent sibling property resolvers': p_ri.lookup.Acyclic<Resolver_Possible_Value_Selection_.L.parent_sibling_property_resolvers>
    },
    parameters: {
        readonly 'definition': Resolver_Possible_Value_Selection_.P.definition
        readonly 'list cursor': Resolver_Possible_Value_Selection_.P.list_cursor
        readonly 'linked entry': Resolver_Possible_Value_Selection_.P.linked_entry
        readonly 'current dictionary': Resolver_Possible_Value_Selection_.P.current_dictionary
        readonly 'current ordered dictionary': Resolver_Possible_Value_Selection_.P.current_ordered_dictionary
        readonly 'signature': Resolver_Possible_Value_Selection_.P.signature
        readonly 'schema imports': Resolver_Possible_Value_Selection_.P.schema_imports
        readonly 'resolver imports': Resolver_Possible_Value_Selection_.P.resolver_imports
        readonly 'signatures': Resolver_Possible_Value_Selection_.P.signatures
        readonly 'modules': Resolver_Possible_Value_Selection_.P.modules
        readonly 'option constraints': Resolver_Possible_Value_Selection_.P.option_constraints
    },
) => Resolver_Possible_Value_Selection_.O

export namespace Resolver_Guaranteed_Value_Selection_ {
    
    export type I = s_in.Resolver_Guaranteed_Value_Selection
    
    export type O = s_out.Resolver_Guaranteed_Value_Selection
    
    export type E = i_generic.Error
    
    export namespace L {
        
        export type sibling_property_resolvers = s_out.Resolver_Value_Group_.D
        
    }
    
    export namespace L {
        
        export type parent_sibling_property_resolvers = s_out.Resolver_Value_Group_.D
        
    }
    
    export namespace P {
        
        export type definition = s_out.Value_
        
        export namespace list_cursor {
            
            export type O = s_out.Resolver_Value_List_Result_
            
        }
        
        export type list_cursor = p_di.Optional_Value<list_cursor.O>
        
        export namespace linked_entry {
            
            export type O = s_out.Resolver_Benchmark_
            
        }
        
        export type linked_entry = p_di.Optional_Value<linked_entry.O>
        
        export namespace current_dictionary {
            
            export type O = s_out.Dictionary_
            
        }
        
        export type current_dictionary = p_di.Optional_Value<current_dictionary.O>
        
        export namespace current_ordered_dictionary {
            
            export type O = s_out.Dictionary_
            
        }
        
        export type current_ordered_dictionary = p_di.Optional_Value<current_ordered_dictionary.O>
        
        export type signature = s_out.Resolver_Signature_
        
        export namespace schema_imports {
            
            export type O = s_out.Schema_Imports_
            
        }
        
        export type schema_imports = p_di.Optional_Value<schema_imports.O>
        
        export namespace resolver_imports {
            
            export type O = s_out.Resolver_Imports_
            
        }
        
        export type resolver_imports = p_di.Optional_Value<resolver_imports.O>
        
        export type signatures = s_out.Resolver_Signatures_
        
        export type modules = s_out.Modules_
        
        export namespace option_constraints {
            
            export type O = s_out.Resolver_Option_Constraints_
            
        }
        
        export type option_constraints = p_di.Optional_Value<option_constraints.O>
        
    }
    
}

export type Resolver_Guaranteed_Value_Selection_ = (
    context: Resolver_Guaranteed_Value_Selection_.I,
    abort: p_i.Abort<Resolver_Guaranteed_Value_Selection_.E>,
    lookups: {
        readonly 'sibling property resolvers': p_ri.lookup.Acyclic<Resolver_Guaranteed_Value_Selection_.L.sibling_property_resolvers>
        readonly 'parent sibling property resolvers': p_ri.lookup.Acyclic<Resolver_Guaranteed_Value_Selection_.L.parent_sibling_property_resolvers>
    },
    parameters: {
        readonly 'definition': Resolver_Guaranteed_Value_Selection_.P.definition
        readonly 'list cursor': Resolver_Guaranteed_Value_Selection_.P.list_cursor
        readonly 'linked entry': Resolver_Guaranteed_Value_Selection_.P.linked_entry
        readonly 'current dictionary': Resolver_Guaranteed_Value_Selection_.P.current_dictionary
        readonly 'current ordered dictionary': Resolver_Guaranteed_Value_Selection_.P.current_ordered_dictionary
        readonly 'signature': Resolver_Guaranteed_Value_Selection_.P.signature
        readonly 'schema imports': Resolver_Guaranteed_Value_Selection_.P.schema_imports
        readonly 'resolver imports': Resolver_Guaranteed_Value_Selection_.P.resolver_imports
        readonly 'signatures': Resolver_Guaranteed_Value_Selection_.P.signatures
        readonly 'modules': Resolver_Guaranteed_Value_Selection_.P.modules
        readonly 'option constraints': Resolver_Guaranteed_Value_Selection_.P.option_constraints
    },
) => Resolver_Guaranteed_Value_Selection_.O

export namespace Resolver_Benchmark_ {
    
    export type I = s_in.Resolver_Benchmark
    
    export type O = s_out.Resolver_Benchmark
    
    export type E = i_generic.Error
    
    export namespace L {
        
        export type sibling_property_resolvers = s_out.Resolver_Value_Group_.D
        
    }
    
    export namespace L {
        
        export type parent_sibling_property_resolvers = s_out.Resolver_Value_Group_.D
        
    }
    
    export namespace P {
        
        export type definition = s_out.Value_
        
        export namespace list_cursor {
            
            export type O = s_out.Resolver_Value_List_Result_
            
        }
        
        export type list_cursor = p_di.Optional_Value<list_cursor.O>
        
        export namespace linked_entry {
            
            export type O = s_out.Resolver_Benchmark_
            
        }
        
        export type linked_entry = p_di.Optional_Value<linked_entry.O>
        
        export namespace current_dictionary {
            
            export type O = s_out.Dictionary_
            
        }
        
        export type current_dictionary = p_di.Optional_Value<current_dictionary.O>
        
        export namespace current_ordered_dictionary {
            
            export type O = s_out.Dictionary_
            
        }
        
        export type current_ordered_dictionary = p_di.Optional_Value<current_ordered_dictionary.O>
        
        export type signature = s_out.Resolver_Signature_
        
        export namespace schema_imports {
            
            export type O = s_out.Schema_Imports_
            
        }
        
        export type schema_imports = p_di.Optional_Value<schema_imports.O>
        
        export namespace resolver_imports {
            
            export type O = s_out.Resolver_Imports_
            
        }
        
        export type resolver_imports = p_di.Optional_Value<resolver_imports.O>
        
        export type signatures = s_out.Resolver_Signatures_
        
        export type modules = s_out.Modules_
        
        export namespace option_constraints {
            
            export type O = s_out.Resolver_Option_Constraints_
            
        }
        
        export type option_constraints = p_di.Optional_Value<option_constraints.O>
        
    }
    
}

export type Resolver_Benchmark_ = (
    context: Resolver_Benchmark_.I,
    abort: p_i.Abort<Resolver_Benchmark_.E>,
    lookups: {
        readonly 'sibling property resolvers': p_ri.lookup.Acyclic<Resolver_Benchmark_.L.sibling_property_resolvers>
        readonly 'parent sibling property resolvers': p_ri.lookup.Acyclic<Resolver_Benchmark_.L.parent_sibling_property_resolvers>
    },
    parameters: {
        readonly 'definition': Resolver_Benchmark_.P.definition
        readonly 'list cursor': Resolver_Benchmark_.P.list_cursor
        readonly 'linked entry': Resolver_Benchmark_.P.linked_entry
        readonly 'current dictionary': Resolver_Benchmark_.P.current_dictionary
        readonly 'current ordered dictionary': Resolver_Benchmark_.P.current_ordered_dictionary
        readonly 'signature': Resolver_Benchmark_.P.signature
        readonly 'schema imports': Resolver_Benchmark_.P.schema_imports
        readonly 'resolver imports': Resolver_Benchmark_.P.resolver_imports
        readonly 'signatures': Resolver_Benchmark_.P.signatures
        readonly 'modules': Resolver_Benchmark_.P.modules
        readonly 'option constraints': Resolver_Benchmark_.P.option_constraints
    },
) => Resolver_Benchmark_.O

export namespace Resolver_Optional_Value_Initialization_ {
    
    export type I = s_in.Resolver_Optional_Value_Initialization
    
    export type O = s_out.Resolver_Optional_Value_Initialization
    
    export type E = i_generic.Error
    
    export namespace L {
        
        export type sibling_property_resolvers = s_out.Resolver_Value_Group_.D
        
    }
    
    export namespace L {
        
        export type parent_sibling_property_resolvers = s_out.Resolver_Value_Group_.D
        
    }
    
    export namespace P {
        
        export type definition = s_out.Value_
        
        export namespace list_cursor {
            
            export type O = s_out.Resolver_Value_List_Result_
            
        }
        
        export type list_cursor = p_di.Optional_Value<list_cursor.O>
        
        export namespace linked_entry {
            
            export type O = s_out.Resolver_Benchmark_
            
        }
        
        export type linked_entry = p_di.Optional_Value<linked_entry.O>
        
        export namespace current_dictionary {
            
            export type O = s_out.Dictionary_
            
        }
        
        export type current_dictionary = p_di.Optional_Value<current_dictionary.O>
        
        export namespace current_ordered_dictionary {
            
            export type O = s_out.Dictionary_
            
        }
        
        export type current_ordered_dictionary = p_di.Optional_Value<current_ordered_dictionary.O>
        
        export type signature = s_out.Resolver_Signature_
        
        export namespace schema_imports {
            
            export type O = s_out.Schema_Imports_
            
        }
        
        export type schema_imports = p_di.Optional_Value<schema_imports.O>
        
        export namespace resolver_imports {
            
            export type O = s_out.Resolver_Imports_
            
        }
        
        export type resolver_imports = p_di.Optional_Value<resolver_imports.O>
        
        export type signatures = s_out.Resolver_Signatures_
        
        export type modules = s_out.Modules_
        
        export namespace option_constraints {
            
            export type O = s_out.Resolver_Option_Constraints_
            
        }
        
        export type option_constraints = p_di.Optional_Value<option_constraints.O>
        
    }
    
}

export type Resolver_Optional_Value_Initialization_ = (
    context: Resolver_Optional_Value_Initialization_.I,
    abort: p_i.Abort<Resolver_Optional_Value_Initialization_.E>,
    lookups: {
        readonly 'sibling property resolvers': p_ri.lookup.Acyclic<Resolver_Optional_Value_Initialization_.L.sibling_property_resolvers>
        readonly 'parent sibling property resolvers': p_ri.lookup.Acyclic<Resolver_Optional_Value_Initialization_.L.parent_sibling_property_resolvers>
    },
    parameters: {
        readonly 'definition': Resolver_Optional_Value_Initialization_.P.definition
        readonly 'list cursor': Resolver_Optional_Value_Initialization_.P.list_cursor
        readonly 'linked entry': Resolver_Optional_Value_Initialization_.P.linked_entry
        readonly 'current dictionary': Resolver_Optional_Value_Initialization_.P.current_dictionary
        readonly 'current ordered dictionary': Resolver_Optional_Value_Initialization_.P.current_ordered_dictionary
        readonly 'signature': Resolver_Optional_Value_Initialization_.P.signature
        readonly 'schema imports': Resolver_Optional_Value_Initialization_.P.schema_imports
        readonly 'resolver imports': Resolver_Optional_Value_Initialization_.P.resolver_imports
        readonly 'signatures': Resolver_Optional_Value_Initialization_.P.signatures
        readonly 'modules': Resolver_Optional_Value_Initialization_.P.modules
        readonly 'option constraints': Resolver_Optional_Value_Initialization_.P.option_constraints
    },
) => Resolver_Optional_Value_Initialization_.O

export namespace Resolver_Lookup_Selection_ {
    
    export type I = s_in.Resolver_Lookup_Selection
    
    export type O = s_out.Resolver_Lookup_Selection
    
    export type E = i_generic.Error
    
    export namespace L {
        
        export type sibling_property_resolvers = s_out.Resolver_Value_Group_.D
        
    }
    
    export namespace L {
        
        export type parent_sibling_property_resolvers = s_out.Resolver_Value_Group_.D
        
    }
    
    export namespace P {
        
        export type definition = s_out.Value_
        
        export namespace list_cursor {
            
            export type O = s_out.Resolver_Value_List_Result_
            
        }
        
        export type list_cursor = p_di.Optional_Value<list_cursor.O>
        
        export namespace linked_entry {
            
            export type O = s_out.Resolver_Benchmark_
            
        }
        
        export type linked_entry = p_di.Optional_Value<linked_entry.O>
        
        export namespace current_dictionary {
            
            export type O = s_out.Dictionary_
            
        }
        
        export type current_dictionary = p_di.Optional_Value<current_dictionary.O>
        
        export namespace current_ordered_dictionary {
            
            export type O = s_out.Dictionary_
            
        }
        
        export type current_ordered_dictionary = p_di.Optional_Value<current_ordered_dictionary.O>
        
        export type signature = s_out.Resolver_Signature_
        
        export namespace schema_imports {
            
            export type O = s_out.Schema_Imports_
            
        }
        
        export type schema_imports = p_di.Optional_Value<schema_imports.O>
        
        export namespace resolver_imports {
            
            export type O = s_out.Resolver_Imports_
            
        }
        
        export type resolver_imports = p_di.Optional_Value<resolver_imports.O>
        
        export type signatures = s_out.Resolver_Signatures_
        
        export type modules = s_out.Modules_
        
        export namespace option_constraints {
            
            export type O = s_out.Resolver_Option_Constraints_
            
        }
        
        export type option_constraints = p_di.Optional_Value<option_constraints.O>
        
    }
    
}

export type Resolver_Lookup_Selection_ = (
    context: Resolver_Lookup_Selection_.I,
    abort: p_i.Abort<Resolver_Lookup_Selection_.E>,
    lookups: {
        readonly 'sibling property resolvers': p_ri.lookup.Acyclic<Resolver_Lookup_Selection_.L.sibling_property_resolvers>
        readonly 'parent sibling property resolvers': p_ri.lookup.Acyclic<Resolver_Lookup_Selection_.L.parent_sibling_property_resolvers>
    },
    parameters: {
        readonly 'definition': Resolver_Lookup_Selection_.P.definition
        readonly 'list cursor': Resolver_Lookup_Selection_.P.list_cursor
        readonly 'linked entry': Resolver_Lookup_Selection_.P.linked_entry
        readonly 'current dictionary': Resolver_Lookup_Selection_.P.current_dictionary
        readonly 'current ordered dictionary': Resolver_Lookup_Selection_.P.current_ordered_dictionary
        readonly 'signature': Resolver_Lookup_Selection_.P.signature
        readonly 'schema imports': Resolver_Lookup_Selection_.P.schema_imports
        readonly 'resolver imports': Resolver_Lookup_Selection_.P.resolver_imports
        readonly 'signatures': Resolver_Lookup_Selection_.P.signatures
        readonly 'modules': Resolver_Lookup_Selection_.P.modules
        readonly 'option constraints': Resolver_Lookup_Selection_.P.option_constraints
    },
) => Resolver_Lookup_Selection_.O

export namespace Resolver_Option_Constraints_ {
    
    export type I = s_in.Resolver_Option_Constraints
    
    export type O = s_out.Resolver_Option_Constraints
    
    export type E = i_generic.Error
    
    export namespace L {
        
        export type sibling_property_resolvers = s_out.Resolver_Value_Group_.D
        
    }
    
    export namespace L {
        
        export type parent_sibling_property_resolvers = s_out.Resolver_Value_Group_.D
        
    }
    
    export namespace P {
        
        export type definition = s_out.Value_
        
        export namespace list_cursor {
            
            export type O = s_out.Resolver_Value_List_Result_
            
        }
        
        export type list_cursor = p_di.Optional_Value<list_cursor.O>
        
        export namespace linked_entry {
            
            export type O = s_out.Resolver_Benchmark_
            
        }
        
        export type linked_entry = p_di.Optional_Value<linked_entry.O>
        
        export namespace current_dictionary {
            
            export type O = s_out.Dictionary_
            
        }
        
        export type current_dictionary = p_di.Optional_Value<current_dictionary.O>
        
        export namespace current_ordered_dictionary {
            
            export type O = s_out.Dictionary_
            
        }
        
        export type current_ordered_dictionary = p_di.Optional_Value<current_ordered_dictionary.O>
        
        export type signature = s_out.Resolver_Signature_
        
        export namespace schema_imports {
            
            export type O = s_out.Schema_Imports_
            
        }
        
        export type schema_imports = p_di.Optional_Value<schema_imports.O>
        
        export namespace resolver_imports {
            
            export type O = s_out.Resolver_Imports_
            
        }
        
        export type resolver_imports = p_di.Optional_Value<resolver_imports.O>
        
        export type signatures = s_out.Resolver_Signatures_
        
        export type modules = s_out.Modules_
        
        export namespace option_constraints {
            
            export type O = s_out.Resolver_Option_Constraints_
            
        }
        
        export type option_constraints = p_di.Optional_Value<option_constraints.O>
        
    }
    
}

export type Resolver_Option_Constraints_ = (
    context: Resolver_Option_Constraints_.I,
    abort: p_i.Abort<Resolver_Option_Constraints_.E>,
    lookups: {
        readonly 'sibling property resolvers': p_ri.lookup.Acyclic<Resolver_Option_Constraints_.L.sibling_property_resolvers>
        readonly 'parent sibling property resolvers': p_ri.lookup.Acyclic<Resolver_Option_Constraints_.L.parent_sibling_property_resolvers>
    },
    parameters: {
        readonly 'definition': Resolver_Option_Constraints_.P.definition
        readonly 'list cursor': Resolver_Option_Constraints_.P.list_cursor
        readonly 'linked entry': Resolver_Option_Constraints_.P.linked_entry
        readonly 'current dictionary': Resolver_Option_Constraints_.P.current_dictionary
        readonly 'current ordered dictionary': Resolver_Option_Constraints_.P.current_ordered_dictionary
        readonly 'signature': Resolver_Option_Constraints_.P.signature
        readonly 'schema imports': Resolver_Option_Constraints_.P.schema_imports
        readonly 'resolver imports': Resolver_Option_Constraints_.P.resolver_imports
        readonly 'signatures': Resolver_Option_Constraints_.P.signatures
        readonly 'modules': Resolver_Option_Constraints_.P.modules
        readonly 'option constraints': Resolver_Option_Constraints_.P.option_constraints
    },
) => Resolver_Option_Constraints_.O

export namespace Resolver_Value_List_Result_ {
    
    export type I = s_in.Resolver_Value_List_Result
    
    export type O = s_out.Resolver_Value_List_Result
    
    export type E = i_generic.Error
    
    export namespace L {
        
        export type modules = s_out.Modules_.D
        
    }
    
    export namespace P {
        
        export namespace imports {
            
            export type O = s_out.Schema_Imports_
            
        }
        
        export type imports = p_di.Optional_Value<imports.O>
        
    }
    
}

export type Resolver_Value_List_Result_ = (
    context: Resolver_Value_List_Result_.I,
    abort: p_i.Abort<Resolver_Value_List_Result_.E>,
    lookups: {
        readonly 'modules': p_ri.lookup.Acyclic<Resolver_Value_List_Result_.L.modules>
    },
    parameters: {
        readonly 'imports': Resolver_Value_List_Result_.P.imports
    },
) => Resolver_Value_List_Result_.O

export namespace Resolver_Value_Group_ {
    
    export type I = s_in.Resolver_Value_Group
    
    export type O = s_out.Resolver_Value_Group
    
    export type E = i_generic.Error
    
    export namespace L {
        
        export type sibling_property_resolvers = s_out.Resolver_Value_Group_.D
        
    }
    
    export namespace L {
        
        export type parent_sibling_property_resolvers = s_out.Resolver_Value_Group_.D
        
    }
    
    export namespace P {
        
        export type definition = s_out.Group_
        
        export namespace list_cursor {
            
            export type O = s_out.Resolver_Value_List_Result_
            
        }
        
        export type list_cursor = p_di.Optional_Value<list_cursor.O>
        
        export namespace linked_entry {
            
            export type O = s_out.Resolver_Benchmark_
            
        }
        
        export type linked_entry = p_di.Optional_Value<linked_entry.O>
        
        export namespace current_dictionary {
            
            export type O = s_out.Dictionary_
            
        }
        
        export type current_dictionary = p_di.Optional_Value<current_dictionary.O>
        
        export namespace current_ordered_dictionary {
            
            export type O = s_out.Dictionary_
            
        }
        
        export type current_ordered_dictionary = p_di.Optional_Value<current_ordered_dictionary.O>
        
        export type signature = s_out.Resolver_Signature_
        
        export namespace schema_imports {
            
            export type O = s_out.Schema_Imports_
            
        }
        
        export type schema_imports = p_di.Optional_Value<schema_imports.O>
        
        export namespace resolver_imports {
            
            export type O = s_out.Resolver_Imports_
            
        }
        
        export type resolver_imports = p_di.Optional_Value<resolver_imports.O>
        
        export type signatures = s_out.Resolver_Signatures_
        
        export type modules = s_out.Modules_
        
        export namespace option_constraints {
            
            export type O = s_out.Resolver_Option_Constraints_
            
        }
        
        export type option_constraints = p_di.Optional_Value<option_constraints.O>
        
    }
    
}

export type Resolver_Value_Group_ = (
    context: Resolver_Value_Group_.I,
    abort: p_i.Abort<Resolver_Value_Group_.E>,
    lookups: {
        readonly 'sibling property resolvers': p_ri.lookup.Acyclic<Resolver_Value_Group_.L.sibling_property_resolvers>
        readonly 'parent sibling property resolvers': p_ri.lookup.Acyclic<Resolver_Value_Group_.L.parent_sibling_property_resolvers>
    },
    parameters: {
        readonly 'definition': Resolver_Value_Group_.P.definition
        readonly 'list cursor': Resolver_Value_Group_.P.list_cursor
        readonly 'linked entry': Resolver_Value_Group_.P.linked_entry
        readonly 'current dictionary': Resolver_Value_Group_.P.current_dictionary
        readonly 'current ordered dictionary': Resolver_Value_Group_.P.current_ordered_dictionary
        readonly 'signature': Resolver_Value_Group_.P.signature
        readonly 'schema imports': Resolver_Value_Group_.P.schema_imports
        readonly 'resolver imports': Resolver_Value_Group_.P.resolver_imports
        readonly 'signatures': Resolver_Value_Group_.P.signatures
        readonly 'modules': Resolver_Value_Group_.P.modules
        readonly 'option constraints': Resolver_Value_Group_.P.option_constraints
    },
) => Resolver_Value_Group_.O

export namespace Resolver_Relative_Value_Selection_ {
    
    export type I = s_in.Resolver_Relative_Value_Selection
    
    export type O = s_out.Resolver_Relative_Value_Selection
    
    export type E = i_generic.Error
    
    export namespace P {
        
        export type value = s_out.Value_
        
    }
    
}

export type Resolver_Relative_Value_Selection_ = (
    context: Resolver_Relative_Value_Selection_.I,
    abort: p_i.Abort<Resolver_Relative_Value_Selection_.E>,
    lookups: symbol,
    parameters: {
        readonly 'value': Resolver_Relative_Value_Selection_.P.value
    },
) => Resolver_Relative_Value_Selection_.O

export namespace Resolver_Constraint_ {
    
    export type I = s_in.Resolver_Constraint
    
    export type O = s_out.Resolver_Constraint
    
    export type E = i_generic.Error
    
    export namespace P {
        
        export type value = s_out.Value_
        
    }
    
}

export type Resolver_Constraint_ = (
    context: Resolver_Constraint_.I,
    abort: p_i.Abort<Resolver_Constraint_.E>,
    lookups: symbol,
    parameters: {
        readonly 'value': Resolver_Constraint_.P.value
    },
) => Resolver_Constraint_.O

export namespace Resolver_Optional_Value_Constraints_ {
    
    export type I = s_in.Resolver_Optional_Value_Constraints
    
    export type O = s_out.Resolver_Optional_Value_Constraints
    
    export type E = i_generic.Error
    
    export namespace P {
        
        export type value = s_out.Value_
        
    }
    
}

export type Resolver_Optional_Value_Constraints_ = (
    context: Resolver_Optional_Value_Constraints_.I,
    abort: p_i.Abort<Resolver_Optional_Value_Constraints_.E>,
    lookups: symbol,
    parameters: {
        readonly 'value': Resolver_Optional_Value_Constraints_.P.value
    },
) => Resolver_Optional_Value_Constraints_.O

export namespace Resolver_Value_Constraints_ {
    
    export type I = s_in.Resolver_Value_Constraints
    
    export type O = s_out.Resolver_Value_Constraints
    
    export type E = i_generic.Error
    
    export namespace P {
        
        export type value = s_out.Value_
        
    }
    
}

export type Resolver_Value_Constraints_ = (
    context: Resolver_Value_Constraints_.I,
    abort: p_i.Abort<Resolver_Value_Constraints_.E>,
    lookups: symbol,
    parameters: {
        readonly 'value': Resolver_Value_Constraints_.P.value
    },
) => Resolver_Value_Constraints_.O

export namespace Resolver_Value_Constraint_ {
    
    export type I = s_in.Resolver_Value_Constraint
    
    export type O = s_out.Resolver_Value_Constraint
    
    export type E = i_generic.Error
    
    export namespace L {
        
        export type property_constraints = s_out.Resolver_Value_Constraints_.D
        
    }
    
    export namespace P {
        
    }
    
}

export type Resolver_Value_Constraint_ = (
    context: Resolver_Value_Constraint_.I,
    abort: p_i.Abort<Resolver_Value_Constraint_.E>,
    lookups: {
        readonly 'property constraints': p_ri.lookup.Acyclic<Resolver_Value_Constraint_.L.property_constraints>
    },
    parameters: symbol,
) => Resolver_Value_Constraint_.O

export namespace Resolver_ {
    
    export type I = s_in.Resolver
    
    export type O = s_out.Resolver
    
    export type E = i_generic.Error
    
    export namespace P {
        
        export type modules = s_out.Modules_
        
        export type resolver_imports = s_out.Resolver_Imports_
        
        export type schema_imports = s_out.Schema_Imports_
        
    }
    
}

export type Resolver_ = (
    context: Resolver_.I,
    abort: p_i.Abort<Resolver_.E>,
    lookups: symbol,
    parameters: {
        readonly 'modules': Resolver_.P.modules
        readonly 'resolver imports': Resolver_.P.resolver_imports
        readonly 'schema imports': Resolver_.P.schema_imports
    },
) => Resolver_.O

export namespace Resolver_Signature_Parameters_ {
    
    export type I = s_in.Resolver_Signature_Parameters
    
    export type O = s_out.Resolver_Signature_Parameters
    
    export type E = i_generic.Error
    
    export namespace P {
        
        export type modules = s_out.Modules_
        
        export type imports = s_out.Schema_Imports_
        
    }
    
}

export type Resolver_Signature_Parameters_ = (
    context: Resolver_Signature_Parameters_.I,
    abort: p_i.Abort<Resolver_Signature_Parameters_.E>,
    lookups: symbol,
    parameters: {
        readonly 'modules': Resolver_Signature_Parameters_.P.modules
        readonly 'imports': Resolver_Signature_Parameters_.P.imports
    },
) => Resolver_Signature_Parameters_.O

export namespace Resolver_Signature_ {
    
    export type I = s_in.Resolver_Signature
    
    export type O = s_out.Resolver_Signature
    
    export type E = i_generic.Error
    
    export namespace L {
        
        export type sibling_signatures = s_out.Resolver_Signatures_.D
        
    }
    
    export namespace P {
        
        export type modules = s_out.Modules_
        
        export type module_ = s_out.Module_
        
        export type imports = s_out.Schema_Imports_
        
    }
    
}

export type Resolver_Signature_ = (
    context: Resolver_Signature_.I,
    abort: p_i.Abort<Resolver_Signature_.E>,
    lookups: {
        readonly 'sibling signatures': p_ri.lookup.Acyclic<Resolver_Signature_.L.sibling_signatures>
    },
    parameters: {
        readonly 'modules': Resolver_Signature_.P.modules
        readonly 'module': Resolver_Signature_.P.module_
        readonly 'imports': Resolver_Signature_.P.imports
    },
) => Resolver_Signature_.O

export namespace Resolver_Signatures_ {
    
    export type I = s_in.Resolver_Signatures
    
    export type O = s_out.Resolver_Signatures
    
    export type E = i_generic.Error
    
    export namespace P {
        
        export type modules = s_out.Modules_
        
        export type imports = s_out.Schema_Imports_
        
    }
    
}

export type Resolver_Signatures_ = (
    context: Resolver_Signatures_.I,
    abort: p_i.Abort<Resolver_Signatures_.E>,
    lookups: symbol,
    parameters: {
        readonly 'modules': Resolver_Signatures_.P.modules
        readonly 'imports': Resolver_Signatures_.P.imports
    },
) => Resolver_Signatures_.O

export namespace Resolver_Modules_ {
    
    export type I = s_in.Resolver_Modules
    
    export type O = s_out.Resolver_Modules
    
    export type E = i_generic.Error
    
    export namespace P {
        
        export type signatures = s_out.Resolver_Signatures_
        
        export type modules = s_out.Modules_
        
        export type schema_imports = s_out.Schema_Imports_
        
        export type resolver_imports = s_out.Resolver_Imports_
        
    }
    
}

export type Resolver_Modules_ = (
    context: Resolver_Modules_.I,
    abort: p_i.Abort<Resolver_Modules_.E>,
    lookups: symbol,
    parameters: {
        readonly 'signatures': Resolver_Modules_.P.signatures
        readonly 'modules': Resolver_Modules_.P.modules
        readonly 'schema imports': Resolver_Modules_.P.schema_imports
        readonly 'resolver imports': Resolver_Modules_.P.resolver_imports
    },
) => Resolver_Modules_.O

export namespace Resolver_Reference_To_Value_Constraint_ {
    
    export type I = s_in.Resolver_Reference_To_Value_Constraint
    
    export type O = s_out.Resolver_Reference_To_Value_Constraint
    
    export type E = i_generic.Error
    
    export namespace L {
        
        export type property_constraints = s_out.Resolver_Value_Constraints_.D
        
    }
    
    export namespace P {
        
    }
    
}

export type Resolver_Reference_To_Value_Constraint_ = (
    context: Resolver_Reference_To_Value_Constraint_.I,
    abort: p_i.Abort<Resolver_Reference_To_Value_Constraint_.E>,
    lookups: {
        readonly 'property constraints': p_ri.lookup.Acyclic<Resolver_Reference_To_Value_Constraint_.L.property_constraints>
    },
    parameters: symbol,
) => Resolver_Reference_To_Value_Constraint_.O

export namespace Resolver_Imports_ {
    
    export type I = s_in.Resolver_Imports
    
    export type O = s_out.Resolver_Imports
    
    export type E = i_generic.Error
    
    export namespace L {
        
        export type sibling_schemas = s_out.Schemas_.D
        
    }
    
    export namespace P {
        
    }
    
}

export type Resolver_Imports_ = (
    context: Resolver_Imports_.I,
    abort: p_i.Abort<Resolver_Imports_.E>,
    lookups: {
        readonly 'sibling schemas': p_ri.lookup.Stack<Resolver_Imports_.L.sibling_schemas>
    },
    parameters: symbol,
) => Resolver_Imports_.O

export namespace Module_Specification_ {
    
    export type I = s_in.Module_Specification
    
    export type O = s_out.Module_Specification
    
    export type E = i_generic.Error
    
    export namespace P {
        
    }
    
}

export type Module_Specification_ = (
    context: Module_Specification_.I,
    abort: p_i.Abort<Module_Specification_.E>,
    lookups: symbol,
    parameters: symbol,
) => Module_Specification_.O

export namespace Schema_Tree_ {
    
    export type I = s_in.Schema_Tree
    
    export type O = s_out.Schema_Tree
    
    export type E = i_generic.Error
    
    export namespace L {
        
        export type sibling_schemas = s_out.Schemas_.D
        
    }
    
    export namespace P {
        
    }
    
}

export type Schema_Tree_ = (
    context: Schema_Tree_.I,
    abort: p_i.Abort<Schema_Tree_.E>,
    lookups: {
        readonly 'sibling schemas': p_ri.lookup.Stack<Schema_Tree_.L.sibling_schemas>
    },
    parameters: symbol,
) => Schema_Tree_.O

export namespace Schema_ {
    
    export type I = s_in.Schema
    
    export type O = s_out.Schema
    
    export type E = i_generic.Error
    
    export namespace L {
        
        export type sibling_schemas = s_out.Schemas_.D
        
    }
    
    export namespace P {
        
    }
    
}

export type Schema_ = (
    context: Schema_.I,
    abort: p_i.Abort<Schema_.E>,
    lookups: {
        readonly 'sibling schemas': p_ri.lookup.Stack<Schema_.L.sibling_schemas>
    },
    parameters: symbol,
) => Schema_.O

export namespace Schema_Imports_ {
    
    export type I = s_in.Schema_Imports
    
    export type O = s_out.Schema_Imports
    
    export type E = i_generic.Error
    
    export namespace L {
        
        export type sibling_schemas = s_out.Schemas_.D
        
    }
    
    export namespace P {
        
    }
    
}

export type Schema_Imports_ = (
    context: Schema_Imports_.I,
    abort: p_i.Abort<Schema_Imports_.E>,
    lookups: {
        readonly 'sibling schemas': p_ri.lookup.Stack<Schema_Imports_.L.sibling_schemas>
    },
    parameters: symbol,
) => Schema_Imports_.O

export namespace Modules_ {
    
    export type I = s_in.Modules
    
    export type O = s_out.Modules
    
    export type E = i_generic.Error
    
    export namespace P {
        
        export namespace globals {
            
            export type O = s_out.Globals_
            
        }
        
        export type globals = p_di.Optional_Value<globals.O>
        
        export namespace imports {
            
            export type O = s_out.Schema_Imports_
            
        }
        
        export type imports = p_di.Optional_Value<imports.O>
        
    }
    
}

export type Modules_ = (
    context: Modules_.I,
    abort: p_i.Abort<Modules_.E>,
    lookups: symbol,
    parameters: {
        readonly 'globals': Modules_.P.globals
        readonly 'imports': Modules_.P.imports
    },
) => Modules_.O
}


import * as i_generic2 from "../../../../../temp/resolve_generic.js"

import { Module_Reference } from "../../../../modules.generated/schemas/resolved/refiners/unresolved_manual.js"

export const Signatures: declarations.Resolver_Signatures_ = ($, abort, $l, $p) => {
    return i_generic2.resolve_dense_dictionary(
        $['l dictionary'],
        $['l location'],
        abort,
        $p.modules,
        ($, id, $acyclic, $cyclic) => {
            const p_linked_entry = i_generic2.get_entry_acyclic(
                p_sl.acyclic.from_resolved_dictionary($p.modules),
                {
                    'l reference': id,
                    'l location': $['l location'],
                },
                abort,
            )

            return Signature(
                $['l entry'],
                abort,
                {
                    'sibling signatures': $acyclic,
                },
                {
                    'imports': $p.imports,
                    'modules': $p.modules,
                    'module': p_linked_entry['l entry'],
                },
            )
        },

    )
}

export const Signature: declarations.Resolver_Signature_ = ($, abort, $l, $p) => {
    const p_parameters: s_out.Resolver_Signature.parameters = p_change_context($.parameters['l state'], ($): s_out.Resolver_Signature.parameters => {
        switch ($[0]) {
            case 'local': return p_.option($, ($) => ['local', Signature_Parameters(
                $,
                abort,
                p_.literal.nothing(),
                {
                    'imports': $p.imports,
                    'modules': $p.modules,
                },
            )])
            case 'same as': return p_.option($, ($) => ['same as', i_generic2.get_entry_acyclic(
                $l['sibling signatures'],
                $,
                abort,
            )])
            default: return p_.exhaustive($[0])
        }
    })
    return {
        'module': $p.module,
        'parameters': p_parameters,
        'resolved parameters': p_change_context(p_parameters, ($) => {
            switch ($[0]) {
                case 'local': return p_.option($, ($) => $)
                case 'same as': return p_.option($, ($) => $['l entry']['resolved parameters'])
                default: return p_.exhaustive($[0])
            }
        })
    }
}

export const Signature_Parameters: declarations.Resolver_Signature_Parameters_ = ($, abort, $l, $p) => {

    const p_parameters_values: s_out.Resolver_Signature_Parameters.modules = i_generic2.temp_resolve(
        $.modules['l dictionary'],
        ($, id, $acyclic, $cyclic) => {

            const p_schema_type = Module_Reference(
                $['l entry'].module,
                abort,
                {
                    'modules': p_sl.acyclic.from_resolved_dictionary($p.modules),
                },
                {
                    'imports': p_.literal.not_set(),
                },

            )
            const p_presence = $['l entry'].presence['l state']

            return {
                'module': p_schema_type,
                'presence': p_presence,
            }
        },
    )
    const lookups_loc = $.lookups['l location']
    const p_parameters_lookups: s_out.Resolver_Signature_Parameters.lookups = i_generic2.temp_resolve(
        $.lookups['l dictionary'],
        ($, id, $acyclic, $cyclic) => {
            const p_referent = Module_Reference(
                $['l entry'].referent,
                abort,
                {
                    'modules': p_sl.acyclic.from_resolved_dictionary($p.modules),
                },
                {
                    'imports': p_.literal.not_set(),
                },

            )

            const p_type: s_out.Resolver_Signature_Parameters.lookups.D.type_ = p_change_context($['l entry'].type['l state'], ($) => {
                switch ($[0]) {
                    case 'acyclic': return p_.option($, ($) => ['acyclic', null])
                    case 'cyclic': return p_.option($, ($) => ['cyclic', null])
                    case 'stack': return p_.option($, ($) => ['stack', $])
                    default: return p_.exhaustive($[0])
                }
            })
            const p_presence = $['l entry'].presence['l state']
            return {
                'referent': p_referent,
                'dictionary': p_change_context(p_referent['resulting module']['root value'], ($) => { // component constraint (referent)
                    switch ($[0]) {
                        case 'dictionary': return p_.option($, ($) => $)
                        default: return i_generic2.abort.state_constraint_found_expected(
                            "dictionary",
                            $,
                            lookups_loc,
                            abort,
                        )

                    }
                }),
                'type': p_type,
                'presence': p_presence,
            }
        },
    )
    return {
        'lookups': p_parameters_lookups,
        'modules': p_parameters_values,
    }
}
