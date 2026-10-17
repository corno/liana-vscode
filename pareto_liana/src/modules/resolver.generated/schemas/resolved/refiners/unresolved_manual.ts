import * as p_ from 'pareto-core/refiner'
import * as p_sl from 'pareto-core/refiner/specials/lookup'
import p_variables from 'pareto-core/refiner/specials/variables'
import p_change_context from 'pareto-core/refiner/specials/change_context'


import * as p_i from 'pareto-core/__internal/Abort'
import * as p_di from 'pareto-core/schema'
import * as p_ri from 'pareto-core/refiner'

import * as i_generic from "liana-runtime/modules/resolved_document_deserialization/schemas/resolving/schema"

import * as i_resolved from "../schema.js"

import * as i_unresolved from "../../../../schema.generated/schemas/unresolved/schema.js"

namespace declarations {
    export namespace Package_ {

        export type I = i_unresolved.Package

        export type O = i_resolved.Package

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

        export type I = i_unresolved.Presence

        export type O = i_resolved.Presence

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

        export type I = i_unresolved.Simple_Type

        export type O = i_resolved.Simple_Type

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

        export type I = i_unresolved.Text_Type

        export type O = i_resolved.Text_Type

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

        export type I = i_unresolved.Globals

        export type O = i_resolved.Globals

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

        export type I = i_unresolved.Group

        export type O = i_resolved.Group

        export type E = i_generic.Error

        export namespace L {

            export type noncircular_sibling_modules = i_resolved.Modules_.D

        }

        export namespace L {

            export type possibly_circular_dependent_sibling_modules = i_resolved.Modules_.D

        }

        export namespace P {

            export namespace globals {

                export type O = i_resolved.Globals_

            }

            export type globals = p_di.Optional_Value<globals.O>

            export namespace imports {

                export type O = i_resolved.Schema_Imports_

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

        export type I = i_unresolved.Dictionary

        export type O = i_resolved.Dictionary

        export type E = i_generic.Error

        export namespace L {

            export type noncircular_sibling_modules = i_resolved.Modules_.D

        }

        export namespace L {

            export type possibly_circular_dependent_sibling_modules = i_resolved.Modules_.D

        }

        export namespace P {

            export namespace globals {

                export type O = i_resolved.Globals_

            }

            export type globals = p_di.Optional_Value<globals.O>

            export namespace imports {

                export type O = i_resolved.Schema_Imports_

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

        export type I = i_unresolved.Value

        export type O = i_resolved.Value

        export type E = i_generic.Error

        export namespace L {

            export type noncircular_sibling_modules = i_resolved.Modules_.D

        }

        export namespace L {

            export type possibly_circular_dependent_sibling_modules = i_resolved.Modules_.D

        }

        export namespace P {

            export namespace globals {

                export type O = i_resolved.Globals_

            }

            export type globals = p_di.Optional_Value<globals.O>

            export namespace imports {

                export type O = i_resolved.Schema_Imports_

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

        export type I = i_unresolved.Module_Reference

        export type O = i_resolved.Module_Reference

        export type E = i_generic.Error

        export namespace L {

            export type modules = i_resolved.Modules_.D

        }

        export namespace P {

            export namespace imports {

                export type O = i_resolved.Schema_Imports_

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

        export type I = i_unresolved.Value_Reference

        export type O = i_resolved.Value_Reference

        export type E = i_generic.Error

        export namespace L {

            export type modules = i_resolved.Modules_.D

        }

        export namespace P {

            export namespace imports {

                export type O = i_resolved.Schema_Imports_

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

        export type I = i_unresolved.Value_Results

        export type O = i_resolved.Value_Results

        export type E = i_generic.Error

        export namespace L {

            export type modules = i_resolved.Modules_.D

        }

        export namespace P {

            export namespace imports {

                export type O = i_resolved.Schema_Imports_

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

        export type I = i_unresolved.Option_Constraints

        export type O = i_resolved.Option_Constraints

        export type E = i_generic.Error

        export namespace L {

            export type modules = i_resolved.Modules_.D

        }

        export namespace P {

            export namespace imports {

                export type O = i_resolved.Schema_Imports_

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

        export type I = i_unresolved.Module

        export type O = i_resolved.Module

        export type E = i_generic.Error

        export namespace L {

            export type noncircular_sibling_modules = i_resolved.Modules_.D

        }

        export namespace L {

            export type possibly_circular_dependent_sibling_modules = i_resolved.Modules_.D

        }

        export namespace P {

            export namespace globals {

                export type O = i_resolved.Globals_

            }

            export type globals = p_di.Optional_Value<globals.O>

            export namespace imports {

                export type O = i_resolved.Schema_Imports_

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

        export type I = i_unresolved.Value_Path

        export type O = i_resolved.Value_Path

        export type E = i_generic.Error

        export namespace P {

            export type module_ = i_resolved.Module_

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

        export type I = i_unresolved.Schemas

        export type O = i_resolved.Schemas

        export type E = i_generic.Error

        export namespace L {

            export type sibling_schemas = i_resolved.Schemas_.D

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

        export type I = i_unresolved.Resolver_Value

        export type O = i_resolved.Resolver_Value

        export type E = i_generic.Error

        export namespace L {

            export type sibling_property_resolvers = i_resolved.Resolver_Value_Group_.D

        }

        export namespace L {

            export type parent_sibling_property_resolvers = i_resolved.Resolver_Value_Group_.D

        }

        export namespace P {

            export type definition = i_resolved.Value_

            export namespace list_cursor {

                export type O = i_resolved.Resolver_Value_List_Result_

            }

            export type list_cursor = p_di.Optional_Value<list_cursor.O>

            export namespace linked_entry {

                export type O = i_resolved.Resolver_Benchmark_

            }

            export type linked_entry = p_di.Optional_Value<linked_entry.O>

            export namespace current_dictionary {

                export type O = i_resolved.Dictionary_

            }

            export type current_dictionary = p_di.Optional_Value<current_dictionary.O>

            export namespace current_ordered_dictionary {

                export type O = i_resolved.Dictionary_

            }

            export type current_ordered_dictionary = p_di.Optional_Value<current_ordered_dictionary.O>

            export type signature = i_resolved.Resolver_Signature_

            export namespace schema_imports {

                export type O = i_resolved.Schema_Imports_

            }

            export type schema_imports = p_di.Optional_Value<schema_imports.O>

            export namespace resolver_imports {

                export type O = i_resolved.Resolver_Imports_

            }

            export type resolver_imports = p_di.Optional_Value<resolver_imports.O>

            export type signatures = i_resolved.Resolver_Signatures_

            export type modules = i_resolved.Modules_

            export namespace option_constraints {

                export type O = i_resolved.Resolver_Option_Constraints_

            }

            export type option_constraints = p_di.Optional_Value<option_constraints.O>

        }

    }

    export type Resolver_Value_ = (
        context: Resolver_Value_.I,
        abort: p_i.Abort<Resolver_Value_.E>,
        lookups: {
            readonly 'previous item definition'?: s_out.Value
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

        export type I = i_unresolved.Resolver_Possible_Value_Selection

        export type O = i_resolved.Resolver_Possible_Value_Selection

        export type E = i_generic.Error

        export namespace L {

            export type sibling_property_resolvers = i_resolved.Resolver_Value_Group_.D

        }

        export namespace L {

            export type parent_sibling_property_resolvers = i_resolved.Resolver_Value_Group_.D

        }

        export namespace P {

            export type definition = i_resolved.Value_

            export namespace list_cursor {

                export type O = i_resolved.Resolver_Value_List_Result_

            }

            export type list_cursor = p_di.Optional_Value<list_cursor.O>

            export namespace linked_entry {

                export type O = i_resolved.Resolver_Benchmark_

            }

            export type linked_entry = p_di.Optional_Value<linked_entry.O>

            export namespace current_dictionary {

                export type O = i_resolved.Dictionary_

            }

            export type current_dictionary = p_di.Optional_Value<current_dictionary.O>

            export namespace current_ordered_dictionary {

                export type O = i_resolved.Dictionary_

            }

            export type current_ordered_dictionary = p_di.Optional_Value<current_ordered_dictionary.O>

            export type signature = i_resolved.Resolver_Signature_

            export namespace schema_imports {

                export type O = i_resolved.Schema_Imports_

            }

            export type schema_imports = p_di.Optional_Value<schema_imports.O>

            export namespace resolver_imports {

                export type O = i_resolved.Resolver_Imports_

            }

            export type resolver_imports = p_di.Optional_Value<resolver_imports.O>

            export type signatures = i_resolved.Resolver_Signatures_

            export type modules = i_resolved.Modules_

            export namespace option_constraints {

                export type O = i_resolved.Resolver_Option_Constraints_

            }

            export type option_constraints = p_di.Optional_Value<option_constraints.O>

        }

    }

    export type Resolver_Possible_Value_Selection_ = (
        context: Resolver_Possible_Value_Selection_.I,
        abort: p_i.Abort<Resolver_Possible_Value_Selection_.E>,
        lookups: {
            readonly 'previous item definition'?: s_out.Value
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

        export type I = i_unresolved.Resolver_Guaranteed_Value_Selection

        export type O = i_resolved.Resolver_Guaranteed_Value_Selection

        export type E = i_generic.Error

        export namespace L {

            export type sibling_property_resolvers = i_resolved.Resolver_Value_Group_.D

        }

        export namespace L {

            export type parent_sibling_property_resolvers = i_resolved.Resolver_Value_Group_.D

        }

        export namespace P {

            export type definition = i_resolved.Value_

            export namespace list_cursor {

                export type O = i_resolved.Resolver_Value_List_Result_

            }

            export type list_cursor = p_di.Optional_Value<list_cursor.O>

            export namespace linked_entry {

                export type O = i_resolved.Resolver_Benchmark_

            }

            export type linked_entry = p_di.Optional_Value<linked_entry.O>

            export namespace current_dictionary {

                export type O = i_resolved.Dictionary_

            }

            export type current_dictionary = p_di.Optional_Value<current_dictionary.O>

            export namespace current_ordered_dictionary {

                export type O = i_resolved.Dictionary_

            }

            export type current_ordered_dictionary = p_di.Optional_Value<current_ordered_dictionary.O>

            export type signature = i_resolved.Resolver_Signature_

            export namespace schema_imports {

                export type O = i_resolved.Schema_Imports_

            }

            export type schema_imports = p_di.Optional_Value<schema_imports.O>

            export namespace resolver_imports {

                export type O = i_resolved.Resolver_Imports_

            }

            export type resolver_imports = p_di.Optional_Value<resolver_imports.O>

            export type signatures = i_resolved.Resolver_Signatures_

            export type modules = i_resolved.Modules_

            export namespace option_constraints {

                export type O = i_resolved.Resolver_Option_Constraints_

            }

            export type option_constraints = p_di.Optional_Value<option_constraints.O>

        }

    }

    export type Resolver_Guaranteed_Value_Selection_ = (
        context: Resolver_Guaranteed_Value_Selection_.I,
        abort: p_i.Abort<Resolver_Guaranteed_Value_Selection_.E>,
        lookups: {
            readonly 'previous item definition'?: s_out.Value
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

        export type I = i_unresolved.Resolver_Benchmark

        export type O = i_resolved.Resolver_Benchmark

        export type E = i_generic.Error

        export namespace L {

            export type sibling_property_resolvers = i_resolved.Resolver_Value_Group_.D

        }

        export namespace L {

            export type parent_sibling_property_resolvers = i_resolved.Resolver_Value_Group_.D

        }

        export namespace P {

            export type definition = i_resolved.Value_

            export namespace list_cursor {

                export type O = i_resolved.Resolver_Value_List_Result_

            }

            export type list_cursor = p_di.Optional_Value<list_cursor.O>

            export namespace linked_entry {

                export type O = i_resolved.Resolver_Benchmark_

            }

            export type linked_entry = p_di.Optional_Value<linked_entry.O>

            export namespace current_dictionary {

                export type O = i_resolved.Dictionary_

            }

            export type current_dictionary = p_di.Optional_Value<current_dictionary.O>

            export namespace current_ordered_dictionary {

                export type O = i_resolved.Dictionary_

            }

            export type current_ordered_dictionary = p_di.Optional_Value<current_ordered_dictionary.O>

            export type signature = i_resolved.Resolver_Signature_

            export namespace schema_imports {

                export type O = i_resolved.Schema_Imports_

            }

            export type schema_imports = p_di.Optional_Value<schema_imports.O>

            export namespace resolver_imports {

                export type O = i_resolved.Resolver_Imports_

            }

            export type resolver_imports = p_di.Optional_Value<resolver_imports.O>

            export type signatures = i_resolved.Resolver_Signatures_

            export type modules = i_resolved.Modules_

            export namespace option_constraints {

                export type O = i_resolved.Resolver_Option_Constraints_

            }

            export type option_constraints = p_di.Optional_Value<option_constraints.O>

        }

    }

    export type Resolver_Benchmark_ = (
        context: Resolver_Benchmark_.I,
        abort: p_i.Abort<Resolver_Benchmark_.E>,
        lookups: {
            readonly 'previous item definition'?: s_out.Value
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

        export type I = i_unresolved.Resolver_Optional_Value_Initialization

        export type O = i_resolved.Resolver_Optional_Value_Initialization

        export type E = i_generic.Error

        export namespace L {

            export type sibling_property_resolvers = i_resolved.Resolver_Value_Group_.D

        }

        export namespace L {

            export type parent_sibling_property_resolvers = i_resolved.Resolver_Value_Group_.D

        }

        export namespace P {

            export type definition = i_resolved.Value_

            export namespace list_cursor {

                export type O = i_resolved.Resolver_Value_List_Result_

            }

            export type list_cursor = p_di.Optional_Value<list_cursor.O>

            export namespace linked_entry {

                export type O = i_resolved.Resolver_Benchmark_

            }

            export type linked_entry = p_di.Optional_Value<linked_entry.O>

            export namespace current_dictionary {

                export type O = i_resolved.Dictionary_

            }

            export type current_dictionary = p_di.Optional_Value<current_dictionary.O>

            export namespace current_ordered_dictionary {

                export type O = i_resolved.Dictionary_

            }

            export type current_ordered_dictionary = p_di.Optional_Value<current_ordered_dictionary.O>

            export type signature = i_resolved.Resolver_Signature_

            export namespace schema_imports {

                export type O = i_resolved.Schema_Imports_

            }

            export type schema_imports = p_di.Optional_Value<schema_imports.O>

            export namespace resolver_imports {

                export type O = i_resolved.Resolver_Imports_

            }

            export type resolver_imports = p_di.Optional_Value<resolver_imports.O>

            export type signatures = i_resolved.Resolver_Signatures_

            export type modules = i_resolved.Modules_

            export namespace option_constraints {

                export type O = i_resolved.Resolver_Option_Constraints_

            }

            export type option_constraints = p_di.Optional_Value<option_constraints.O>

        }

    }

    export type Resolver_Optional_Value_Initialization_ = (
        context: Resolver_Optional_Value_Initialization_.I,
        abort: p_i.Abort<Resolver_Optional_Value_Initialization_.E>,
        lookups: {
            readonly 'previous item definition'?: s_out.Value
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

        export type I = i_unresolved.Resolver_Lookup_Selection

        export type O = i_resolved.Resolver_Lookup_Selection

        export type E = i_generic.Error

        export namespace L {

            export type sibling_property_resolvers = i_resolved.Resolver_Value_Group_.D

        }

        export namespace L {

            export type parent_sibling_property_resolvers = i_resolved.Resolver_Value_Group_.D

        }

        export namespace P {

            export type definition = i_resolved.Value_

            export namespace list_cursor {

                export type O = i_resolved.Resolver_Value_List_Result_

            }

            export type list_cursor = p_di.Optional_Value<list_cursor.O>

            export namespace linked_entry {

                export type O = i_resolved.Resolver_Benchmark_

            }

            export type linked_entry = p_di.Optional_Value<linked_entry.O>

            export namespace current_dictionary {

                export type O = i_resolved.Dictionary_

            }

            export type current_dictionary = p_di.Optional_Value<current_dictionary.O>

            export namespace current_ordered_dictionary {

                export type O = i_resolved.Dictionary_

            }

            export type current_ordered_dictionary = p_di.Optional_Value<current_ordered_dictionary.O>

            export type signature = i_resolved.Resolver_Signature_

            export namespace schema_imports {

                export type O = i_resolved.Schema_Imports_

            }

            export type schema_imports = p_di.Optional_Value<schema_imports.O>

            export namespace resolver_imports {

                export type O = i_resolved.Resolver_Imports_

            }

            export type resolver_imports = p_di.Optional_Value<resolver_imports.O>

            export type signatures = i_resolved.Resolver_Signatures_

            export type modules = i_resolved.Modules_

            export namespace option_constraints {

                export type O = i_resolved.Resolver_Option_Constraints_

            }

            export type option_constraints = p_di.Optional_Value<option_constraints.O>

        }

    }

    export type Resolver_Lookup_Selection_ = (
        context: Resolver_Lookup_Selection_.I,
        abort: p_i.Abort<Resolver_Lookup_Selection_.E>,
        lookups: {
            readonly 'previous item definition'?: s_out.Value
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

        export type I = i_unresolved.Resolver_Option_Constraints

        export type O = i_resolved.Resolver_Option_Constraints

        export type E = i_generic.Error

        export namespace L {

            export type sibling_property_resolvers = i_resolved.Resolver_Value_Group_.D

        }

        export namespace L {

            export type parent_sibling_property_resolvers = i_resolved.Resolver_Value_Group_.D

        }

        export namespace P {

            export type definition = i_resolved.Value_

            export namespace list_cursor {

                export type O = i_resolved.Resolver_Value_List_Result_

            }

            export type list_cursor = p_di.Optional_Value<list_cursor.O>

            export namespace linked_entry {

                export type O = i_resolved.Resolver_Benchmark_

            }

            export type linked_entry = p_di.Optional_Value<linked_entry.O>

            export namespace current_dictionary {

                export type O = i_resolved.Dictionary_

            }

            export type current_dictionary = p_di.Optional_Value<current_dictionary.O>

            export namespace current_ordered_dictionary {

                export type O = i_resolved.Dictionary_

            }

            export type current_ordered_dictionary = p_di.Optional_Value<current_ordered_dictionary.O>

            export type signature = i_resolved.Resolver_Signature_

            export namespace schema_imports {

                export type O = i_resolved.Schema_Imports_

            }

            export type schema_imports = p_di.Optional_Value<schema_imports.O>

            export namespace resolver_imports {

                export type O = i_resolved.Resolver_Imports_

            }

            export type resolver_imports = p_di.Optional_Value<resolver_imports.O>

            export type signatures = i_resolved.Resolver_Signatures_

            export type modules = i_resolved.Modules_

            export namespace option_constraints {

                export type O = i_resolved.Resolver_Option_Constraints_

            }

            export type option_constraints = p_di.Optional_Value<option_constraints.O>

        }

    }

    export type Resolver_Option_Constraints_ = (
        context: Resolver_Option_Constraints_.I,
        abort: p_i.Abort<Resolver_Option_Constraints_.E>,
        lookups: {
            readonly 'previous item definition'?: s_out.Value
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

        export type I = i_unresolved.Resolver_Value_List_Result

        export type O = i_resolved.Resolver_Value_List_Result

        export type E = i_generic.Error

        export namespace L {

            export type modules = i_resolved.Modules_.D

        }

        export namespace P {

            export namespace imports {

                export type O = i_resolved.Schema_Imports_

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

        export type I = i_unresolved.Resolver_Value_Group

        export type O = i_resolved.Resolver_Value_Group

        export type E = i_generic.Error

        export namespace L {

            export type sibling_property_resolvers = i_resolved.Resolver_Value_Group_.D

        }

        export namespace L {

            export type parent_sibling_property_resolvers = i_resolved.Resolver_Value_Group_.D

        }

        export namespace P {

            export type definition = i_resolved.Group_

            export namespace list_cursor {

                export type O = i_resolved.Resolver_Value_List_Result_

            }

            export type list_cursor = p_di.Optional_Value<list_cursor.O>

            export namespace linked_entry {

                export type O = i_resolved.Resolver_Benchmark_

            }

            export type linked_entry = p_di.Optional_Value<linked_entry.O>

            export namespace current_dictionary {

                export type O = i_resolved.Dictionary_

            }

            export type current_dictionary = p_di.Optional_Value<current_dictionary.O>

            export namespace current_ordered_dictionary {

                export type O = i_resolved.Dictionary_

            }

            export type current_ordered_dictionary = p_di.Optional_Value<current_ordered_dictionary.O>

            export type signature = i_resolved.Resolver_Signature_

            export namespace schema_imports {

                export type O = i_resolved.Schema_Imports_

            }

            export type schema_imports = p_di.Optional_Value<schema_imports.O>

            export namespace resolver_imports {

                export type O = i_resolved.Resolver_Imports_

            }

            export type resolver_imports = p_di.Optional_Value<resolver_imports.O>

            export type signatures = i_resolved.Resolver_Signatures_

            export type modules = i_resolved.Modules_

            export namespace option_constraints {

                export type O = i_resolved.Resolver_Option_Constraints_

            }

            export type option_constraints = p_di.Optional_Value<option_constraints.O>

        }

    }

    export type Resolver_Value_Group_ = (
        context: Resolver_Value_Group_.I,
        abort: p_i.Abort<Resolver_Value_Group_.E>,
        lookups: {
            readonly 'previous item definition'?: s_out.Value
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

        export type I = i_unresolved.Resolver_Relative_Value_Selection

        export type O = i_resolved.Resolver_Relative_Value_Selection

        export type E = i_generic.Error

        export namespace P {

            export type value = i_resolved.Value_

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

        export type I = i_unresolved.Resolver_Constraint

        export type O = i_resolved.Resolver_Constraint

        export type E = i_generic.Error

        export namespace P {

            export type value = i_resolved.Value_

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

        export type I = i_unresolved.Resolver_Optional_Value_Constraints

        export type O = i_resolved.Resolver_Optional_Value_Constraints

        export type E = i_generic.Error

        export namespace P {

            export type value = i_resolved.Value_

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

        export type I = i_unresolved.Resolver_Value_Constraints

        export type O = i_resolved.Resolver_Value_Constraints

        export type E = i_generic.Error

        export namespace P {

            export type value = i_resolved.Value_

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

        export type I = i_unresolved.Resolver_Value_Constraint

        export type O = i_resolved.Resolver_Value_Constraint

        export type E = i_generic.Error

        export namespace L {

            export type property_constraints = i_resolved.Resolver_Value_Constraints_.D

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

        export type I = i_unresolved.Resolver

        export type O = i_resolved.Resolver

        export type E = i_generic.Error

        export namespace P {

            export type modules = i_resolved.Modules_

            export type resolver_imports = i_resolved.Resolver_Imports_

            export type schema_imports = i_resolved.Schema_Imports_

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

        export type I = i_unresolved.Resolver_Signature_Parameters

        export type O = i_resolved.Resolver_Signature_Parameters

        export type E = i_generic.Error

        export namespace P {

            export type modules = i_resolved.Modules_

            export type imports = i_resolved.Schema_Imports_

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

        export type I = i_unresolved.Resolver_Signature

        export type O = i_resolved.Resolver_Signature

        export type E = i_generic.Error

        export namespace L {

            export type sibling_signatures = i_resolved.Resolver_Signatures_.D

        }

        export namespace P {

            export type modules = i_resolved.Modules_

            export type module_ = i_resolved.Module_

            export type imports = i_resolved.Schema_Imports_

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

        export type I = i_unresolved.Resolver_Signatures

        export type O = i_resolved.Resolver_Signatures

        export type E = i_generic.Error

        export namespace P {

            export type modules = i_resolved.Modules_

            export type imports = i_resolved.Schema_Imports_

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

        export type I = i_unresolved.Resolver_Modules

        export type O = i_resolved.Resolver_Modules

        export type E = i_generic.Error

        export namespace P {

            export type signatures = i_resolved.Resolver_Signatures_

            export type modules = i_resolved.Modules_

            export type schema_imports = i_resolved.Schema_Imports_

            export type resolver_imports = i_resolved.Resolver_Imports_

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

        export type I = i_unresolved.Resolver_Reference_To_Value_Constraint

        export type O = i_resolved.Resolver_Reference_To_Value_Constraint

        export type E = i_generic.Error

        export namespace L {

            export type property_constraints = i_resolved.Resolver_Value_Constraints_.D

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

        export type I = i_unresolved.Resolver_Imports

        export type O = i_resolved.Resolver_Imports

        export type E = i_generic.Error

        export namespace L {

            export type sibling_schemas = i_resolved.Schemas_.D

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

        export type I = i_unresolved.Module_Specification

        export type O = i_resolved.Module_Specification

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

        export type I = i_unresolved.Schema_Tree

        export type O = i_resolved.Schema_Tree

        export type E = i_generic.Error

        export namespace L {

            export type sibling_schemas = i_resolved.Schemas_.D

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

        export type I = i_unresolved.Schema

        export type O = i_resolved.Schema

        export type E = i_generic.Error

        export namespace L {

            export type sibling_schemas = i_resolved.Schemas_.D

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

        export type I = i_unresolved.Schema_Imports

        export type O = i_resolved.Schema_Imports

        export type E = i_generic.Error

        export namespace L {

            export type sibling_schemas = i_resolved.Schemas_.D

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

        export type I = i_unresolved.Modules

        export type O = i_resolved.Modules

        export type E = i_generic.Error

        export namespace P {

            export namespace globals {

                export type O = i_resolved.Globals_

            }

            export type globals = p_di.Optional_Value<globals.O>

            export namespace imports {

                export type O = i_resolved.Schema_Imports_

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

import * as s_out from "../../../../schema.generated/schemas/resolved/schema.js"

import * as i_generic2 from "../../../../../temp/resolve_generic.js"


export const Value: declarations.Resolver_Value_ = ($, abort, $l, $p) => {
    const loc = $['l location']
    const p_type = p_change_context($['l state'], ($): s_out.Resolver_Value => {
        switch ($[0]) {
            case 'component': return p_.option($, ($): s_out.Resolver_Value => {
                const x = $p.definition[0] !== 'component'
                    ? i_generic2.abort.state_constraint_found_expected(
                        "component",
                        $p.definition,
                        loc,
                        abort,
                    )
                    : $p.definition[1]
                const p_location = p_change_context($.location['l state'], ($): s_out.Resolver_Value.component.location => {
                    switch ($[0]) {
                        case 'external': return p_.option($, ($) => {
                            const sc_schema_import = p_.from.optional($p['schema imports']).decide(
                                ($) => $,
                                () => i_generic2.abort.parameter_is_set_assertion("imports", loc, abort)
                            )
                            const sc_resolver_import = p_.from.optional($p['resolver imports']).decide(
                                ($) => $,
                                () => i_generic2.abort.parameter_is_set_assertion("imports", loc, abort)
                            )
                            const p_schema_import = i_generic2.get_entry_acyclic(
                                p_sl.acyclic.from_resolved_dictionary(sc_schema_import),
                                $['schema import'],
                                abort,
                            )
                            const p_resolver_import = i_generic2.get_entry_acyclic(
                                p_sl.acyclic.from_resolved_dictionary(sc_resolver_import),
                                $['resolver import'],
                                abort,
                            )
                            const pc_constrained: s_out.Schema.complexity.constrained = p_change_context(p_schema_import['l entry'].schema.complexity, ($) => {
                                switch ($[0]) {
                                    case 'constrained': return p_.option($, ($) => $)
                                    default: return i_generic2.abort.state_constraint_found_expected("constrained", $, loc, abort)
                                }
                            })
                            return ['external', {
                                'schema import': p_schema_import,
                                'resolver import': p_resolver_import,
                                'signature': i_generic2.get_entry_acyclic(
                                    p_sl.acyclic.from_resolved_dictionary(pc_constrained.signatures.signatures),
                                    $.signature,
                                    abort,
                                )
                            }]
                        })
                        case 'internal': return p_.option($, ($) => ['internal', i_generic2.get_entry_acyclic(
                            p_sl.acyclic.from_resolved_dictionary(
                                $p['signatures'],
                            ),
                            $,
                            abort,
                        )])
                        default: return p_.exhaustive($[0])
                    }
                })
                const p_signature: s_out.Resolver_Value.component.signature = p_change_context(p_location, ($) => {
                    switch ($[0]) {
                        case 'external': return p_.option($, ($) => $.signature['l entry'])
                        case 'internal': return p_.option($, ($) => $['l entry'])
                        default: return p_.exhaustive($[0])
                    }
                })
                const x_type: s_out.Modules.D = p_change_context(x.type, ($) => {
                    switch ($[0]) {
                        case 'external': return p_.option($, ($) => $.module['l entry'])
                        case 'internal acyclic': return p_.option($, ($) => $['l entry'])
                        case 'internal': return p_.option($, ($) => $['l entry'].get_circular_dependent())
                        default: return p_.exhaustive($[0])
                    }
                })
                if (p_signature.module !== x_type) {
                    i_generic2.abort.same_node_constraint("module.value", loc, abort)
                }
                const p_arguments: s_out.Resolver_Value.component.arguments_ = p_.from.optional($.arguments).decide(
                    ($) => {
                        const x: s_out.Resolver_Value.component.arguments_.O = {
                            'lookups': p_.from.optional($.lookups).decide(
                                ($) => p_.literal.set(i_generic2.resolve_dense_dictionary(
                                    $['l dictionary'],
                                    $['l location'],
                                    abort,
                                    p_signature['resolved parameters'].lookups,
                                    ($, id, $acyclic, $cyclic) => p_change_context($, ($) => {
                                        //do additional validation
                                        return p_change_context($['l entry']['l state'], ($): s_out.Resolver_Value.component.arguments_.O.lookups.O.D => {
                                            switch ($[0]) {
                                                case 'acyclic': return p_.option($, ($): s_out.Resolver_Value.component.arguments_.O.lookups.O.D => ['acyclic', p_.from.state($['l state']).decide(
                                                    ($): s_out.Resolver_Value.component.arguments_.O.lookups.O.D.acyclic => {
                                                        switch ($[0]) {
                                                            case 'not set': return p_.option($, ($) => ['not set', null])
                                                            default: return p_.exhaustive($[0])
                                                        }
                                                    })])
                                                case 'cyclic': return p_.option($, ($): s_out.Resolver_Value.component.arguments_.O.lookups.O.D => ['cyclic', p_.from.state($['l state']).decide(
                                                    ($): s_out.Resolver_Value.component.arguments_.O.lookups.O.D.cyclic => {
                                                        switch ($[0]) {
                                                            case 'not set': return p_.option($, ($) => ['not set', null])
                                                            default: return p_.exhaustive($[0])
                                                        }
                                                    })])
                                                case 'stack': return p_.option($, ($) => ['stack', p_.from.state($['l state']).decide(
                                                    ($): s_out.Resolver_Value.component.arguments_.O.lookups.O.D.stack => {
                                                        switch ($[0]) {
                                                            case 'empty': return p_.option($, ($) => ['empty', null])
                                                            case 'push': return p_.option($, ($) => {
                                                                const p_stack = Lookup_Selection(
                                                                    $.stack,
                                                                    abort,
                                                                    $l,
                                                                    $p,
                                                                )
                                                                const p_element = Lookup_Selection(
                                                                    $.item,
                                                                    abort,
                                                                    $l,
                                                                    $p,
                                                                )
                                                                return ['push', {
                                                                    'stack': p_stack,
                                                                    'item': p_element
                                                                }]
                                                            })
                                                            default: return p_.exhaustive($[0])
                                                        }
                                                    })])
                                                case 'selection': return p_.option($, ($) => ['selection', Lookup_Selection(
                                                    $,
                                                    abort,
                                                    $l,
                                                    $p,
                                                )])
                                                default: return p_.exhaustive($[0])
                                            }
                                        })
                                    }),
                                )),
                                () => {
                                    //additional validation
                                    if (p_signature['resolved parameters'].lookups !== $p.signature['resolved parameters'].lookups) {

                                        i_generic2.abort.same_node_constraint("lookups", loc, abort)
                                    }
                                    return p_.literal.not_set()
                                }
                            ),
                            'modules': p_.from.optional($.modules).decide(
                                ($) => {
                                    const values_location = $['l location']

                                    return p_.literal.set(i_generic2.resolve_dense_dictionary(
                                        $['l dictionary'],
                                        $['l location'],
                                        abort,
                                        p_signature['resolved parameters'].modules,
                                        ($, id, $acyclic, $cyclic) => p_change_context($, ($) => {
                                            const linked_entry = i_generic2.get_entry_acyclic(
                                                p_sl.acyclic.from_resolved_dictionary(p_signature['resolved parameters'].modules),
                                                {
                                                    'l reference': id,
                                                    'l location': $['l location'],
                                                },
                                                abort,
                                            )
                                            const out = p_change_context($['l entry']['l state'], ($): s_out.Resolver_Value.component.arguments_.O.modules.O.D => {
                                                switch ($[0]) {
                                                    case 'optional': return p_.option($, ($) => ['optional', Optional_Value_Initialization(
                                                        $,
                                                        abort,
                                                        $l,
                                                        $p,
                                                    )])
                                                    case 'parameter': return p_.option($, ($) => ['parameter', i_generic2.get_entry_acyclic(
                                                        p_sl.acyclic.from_resolved_dictionary($p.signature['resolved parameters'].modules),
                                                        $,
                                                        abort,
                                                    )])
                                                    case 'required': return p_.option($, ($) => ['required', Guaranteed_Value_Selection(
                                                        $,
                                                        abort,
                                                        $l,
                                                        $p,
                                                    )])
                                                    default: return p_.exhaustive($[0])
                                                }
                                            })
                                            //additional validation
                                            const benchmark = linked_entry['l entry']
                                            const focus = out

                                            p_change_context(focus, ($) => {
                                                switch ($[0]) {
                                                    case 'optional': return p_.option($, ($) => {

                                                        if (benchmark.presence[0] !== 'optional') {
                                                            i_generic2.abort.state_constraint_found_expected("optional", benchmark.presence, values_location, abort)
                                                        }

                                                        p_change_context($, ($) => {
                                                            switch ($[0]) {
                                                                case 'not set': return p_.option($, ($) => {
                                                                    return null
                                                                })
                                                                case 'selection': return p_.option($, ($) => {
                                                                    //FIXME
                                                                    p_change_context($, ($) => {
                                                                        switch ($[0]) {
                                                                            case 'parameter': return p_.option($, ($) => {
                                                                                return null
                                                                            })
                                                                            case 'result': return p_.option($, ($) => {
                                                                                return null
                                                                            })
                                                                            default: return p_.exhaustive($[0])
                                                                        }
                                                                    })
                                                                    return null
                                                                })
                                                                case 'set': return p_.option($, ($) => {

                                                                    if (walk_path_till_end(benchmark.module['resulting module']['root value']) !== walk_path_till_end($.tail['resulting node'])) {
                                                                        return i_generic2.abort.same_node_constraint(
                                                                            "required argument data type",
                                                                            values_location,
                                                                            abort,
                                                                        )
                                                                    }
                                                                    return null
                                                                })
                                                                default: return p_.exhaustive($[0])
                                                            }
                                                        })
                                                        return null

                                                        //FIX validate that modules are the same
                                                    })
                                                    case 'parameter': return p_.option($, ($) => {
                                                        if ($['l entry'].presence[0] !== benchmark.presence[0]) {
                                                            return i_generic2.abort.same_node_constraint(
                                                                "parameter presence",
                                                                values_location,
                                                                abort,
                                                            )
                                                        }
                                                        if ($['l entry'].module['resulting module'] !== benchmark.module['resulting module']) {
                                                            return i_generic2.abort.same_node_constraint(
                                                                "parameter data type",
                                                                values_location,
                                                                abort,
                                                            )
                                                        }
                                                        return null
                                                    })
                                                    case 'required': return p_.option($, ($) => {
                                                        if (benchmark.presence[0] !== 'required') {
                                                            i_generic2.abort.state_constraint_found_expected("required", benchmark.presence, values_location, abort)
                                                        }
                                                        if (walk_path_till_end(benchmark.module['resulting module']['root value']) !== walk_path_till_end($.tail['resulting node'])) {
                                                            return i_generic2.abort.same_node_constraint(
                                                                "required argument data type",
                                                                values_location,
                                                                abort,
                                                            )
                                                        }
                                                        return null
                                                    })
                                                    default: return p_.exhaustive($[0])
                                                }
                                            })
                                            return out
                                        }),
                                    ))
                                },
                                () => {
                                    //additional validation

                                    if (p_signature['resolved parameters'].modules !== $p.signature['resolved parameters'].modules) {
                                        return i_generic2.abort.same_node_constraint(
                                            "value parameters",
                                            loc,
                                            abort,
                                        )
                                    }
                                    return p_.literal.not_set()
                                }
                            ),
                        }
                        return p_.literal.set(x)
                    },
                    () => {

                        //additional validation
                        if (p_signature['resolved parameters'].lookups !== $p.signature['resolved parameters'].lookups) {
                            return i_generic2.abort.same_node_constraint(
                                "lookup parameters",
                                loc,
                                abort,
                            )
                        }
                        if (p_signature['resolved parameters'].modules !== $p.signature['resolved parameters'].modules) {
                            return i_generic2.abort.same_node_constraint(
                                "value parameters",
                                loc,
                                abort,
                            )
                        }

                        return p_.literal.not_set()
                    }
                )
                const p_constraints = Value_Constraints(
                    $.constraints,
                    abort,
                    p_.literal.nothing(),
                    {
                        'value': p_change_context(p_location, ($): s_out.Value => {
                            switch ($[0]) {
                                case 'external': return p_.option($, ($) => $.signature['l entry'].module['root value'])
                                case 'internal': return p_.option($, ($) => $['l entry'].module['root value'])
                                default: return p_.exhaustive($[0])
                            }
                        })
                    }
                )
                return ['component', {
                    'definition': x,
                    'location': p_location,
                    'signature': p_signature,
                    'arguments': p_arguments,
                    'constraints': p_constraints,
                }]
            })
            case 'dictionary': return p_.option($, ($) => {
                const p_definition = $p.definition[0] !== 'dictionary'
                    ? i_generic2.abort.state_constraint_found_expected("dictionary", $p.definition, loc, abort)
                    : $p.definition[1]

                const p_benchmark = i_generic2.temp_optional_map(
                    $.benchmark,
                    ($): s_out.Resolver_Value.dictionary.benchmark.O => {
                        const p_selection = Guaranteed_Value_Selection(
                            $.selection,
                            abort,
                            $l,
                            $p,
                        )

                        const p_resulting_dictionary = p_selection['resulting node'][0] !== 'dictionary' // component constraint ('selection')
                            ? i_generic2.abort.state_constraint_found_expected("dictionary", p_selection['resulting node'], loc, abort)
                            : p_selection['resulting node'][1]
                        return {
                            'selection': {
                                'l value': p_selection,
                                'l results': {
                                    'dictionary': p_resulting_dictionary,
                                }
                                // 'l constraints': {

                                // }
                            },
                            'resulting dictionary': p_resulting_dictionary,
                            'dense': $.dense
                        }
                    }
                )
                return ['dictionary', {
                    'definition': p_definition,
                    'benchmark': p_benchmark,
                    'resolver': Value(
                        $.resolver,
                        abort,
                        $l,
                        {
                            'linked entry': p_.from.optional(p_benchmark).decide(
                                ($) => p_.literal.set($),
                                () => $p['linked entry']
                            ),
                            'definition': p_definition.value,
                            'current dictionary': p_.literal.set(p_definition),
                            'current ordered dictionary': p_.literal.set(p_definition),//FIXME: is it ordered

                            'modules': $p.modules,
                            'schema imports': $p['schema imports'],
                            'resolver imports': $p['resolver imports'],
                            'signature': $p.signature,
                            'signatures': $p.signatures,
                            'list cursor': $p['list cursor'],
                            'option constraints': $p['option constraints'],
                        },
                    ),
                }]
            })
            case 'group': return p_.option($, ($) => {
                const x = $p.definition[0] !== 'group'
                    ? i_generic2.abort.state_constraint_found_expected("group", $p.definition, loc, abort)
                    : $p.definition[1]

                const p_properties = i_generic2.resolve_dense_dictionary(
                    $['l dictionary'],
                    $['l location'],
                    abort,
                    x,
                    ($, id, $acyclic, $cyclic): s_out.Resolver_Value_Group.D => {

                        const p_definition = i_generic2.get_entry_acyclic(
                            p_sl.acyclic.from_resolved_dictionary(x),
                            {
                                'l reference': id,
                                'l location': $['l location'],
                            },
                            abort,
                        )
                        const p_resolver = Value(
                            $['l entry'].resolver,
                            abort,
                            {
                                //special
                                ...$l,
                                'sibling property resolvers': $acyclic,
                                'parent sibling property resolvers': $l['sibling property resolvers'],

                                //copy
                            },
                            {
                                'definition': p_definition['l entry'].value,

                                'modules': $p.modules,
                                'schema imports': $p['schema imports'],
                                'resolver imports': $p['resolver imports'],
                                'signature': $p.signature,
                                'signatures': $p.signatures,
                                'list cursor': $p['list cursor'],
                                'linked entry': $p['linked entry'],
                                'current dictionary': $p['current dictionary'],
                                'option constraints': $p['option constraints'],
                                'current ordered dictionary': $p['current ordered dictionary'],
                            },
                        )
                        return {
                            'definition': p_definition['l entry'],
                            'resolver': p_resolver,
                        }
                    },
                )
                return ['group', p_properties]
            })
            case 'list': return p_.option($, ($) => {
                const p_definition = $p.definition[0] !== 'list'
                    ? i_generic2.abort.state_constraint_found_expected("list", $p.definition, loc, abort)
                    : $p.definition[1]
                const p_result = i_generic2.temp_optional_map(
                    $.result,
                    ($) => Module_Reference(
                        $,
                        abort,
                        {
                            'modules': p_sl.acyclic.from_resolved_dictionary($p.modules),
                        },
                        {
                            'imports': $p['schema imports'],
                        },
                    )
                )
                const p_resolver = Value(
                    $.resolver,
                    abort,
                    { ...$l, 'previous item definition': p_definition.value },
                    {
                        'definition': p_definition.value,
                        'list cursor': p_.from.optional(p_result).decide(
                            ($) => p_.literal.set($),
                            () => $p['list cursor']
                        ), //setting the cursor

                        'modules': $p.modules,
                        'schema imports': $p['schema imports'],
                        'resolver imports': $p['resolver imports'],
                        'signature': $p.signature,
                        'signatures': $p.signatures,
                        'linked entry': $p['linked entry'],
                        'current dictionary': $p['current dictionary'],
                        'option constraints': $p['option constraints'],
                        'current ordered dictionary': $p['current ordered dictionary'],
                    },
                )
                return ['list', {
                    'result': p_result,
                    'definition': p_definition,
                    'resolver': p_resolver,
                }]
            })
            case 'nothing': return p_.option($, ($) => {
                // const x = $p.definition[0] !== 'nothing'
                //     ? i_generic2.abort.state_constraint_found_expected("nothing", $p.definition, loc, abort)
                //     : $p.definition[1]
                return ['nothing', null]
            })
            case 'simple': return p_.option($, ($) => {
                // const x = $p.definition[0] !== 'simple'
                //     ? i_generic2.abort.state_constraint_found_expected("simple", $p.definition, loc, abort)
                //     : $p.definition[1]
                return ['simple', null]
            })
            case 'optional': return p_.option($, ($) => {
                const x = $p.definition[0] !== 'optional'
                    ? i_generic2.abort.state_constraint_found_expected("optional", $p.definition, loc, abort)
                    : $p.definition[1]

                const p_constraints: s_out.Resolver_Value.state.options.D.constraints = Option_Constraints(
                    $.constraints,
                    abort,
                    $l,
                    $p,
                )
                const p_resolver = Value(
                    $.resolver,
                    abort,
                    {
                        ...$l,
                        'sibling property resolvers': $l['sibling property resolvers'],
                        'parent sibling property resolvers': $l['parent sibling property resolvers'],
                    },
                    {
                        'definition': x,
                        'option constraints': p_.literal.set(p_constraints),

                        'modules': $p.modules,
                        'schema imports': $p['schema imports'],
                        'resolver imports': $p['resolver imports'],
                        'signature': $p.signature,
                        'signatures': $p.signatures,
                        'list cursor': $p['list cursor'],
                        'linked entry': $p['linked entry'],
                        'current dictionary': $p['current dictionary'],
                        'current ordered dictionary': $p['current ordered dictionary'],
                    },
                )
                return ['optional', {
                    'constraints': p_constraints,
                    'resolver': p_resolver,
                }]
            })
            case 'reference': return p_.option($, ($): s_out.Resolver_Value => {
                const p_definition = $p.definition[0] !== 'reference'
                    ? i_generic2.abort.state_constraint_found_expected("reference", $p.definition, loc, abort)
                    : $p.definition[1]
                return ['reference', {
                    'definition': p_definition,
                    'type': p_change_context($.type['l state'], ($): s_out.Resolver_Value.reference.type_ => {
                        switch ($[0]) {
                            case 'derived': return p_.option($, ($) => {
                                // const p_definition_2 = p_definition.type[0] !== 'derived'
                                //     ? i_generic2.abort.state_constraint_found_expected("derived", p_definition.type, loc, abort)
                                //     : p_definition.type[1]
                                return ['derived', {
                                    'value': Guaranteed_Value_Selection(
                                        $.value,
                                        abort,
                                        $l,
                                        $p,
                                    )
                                }]
                            })
                            case 'selected': return p_.option($, ($) => {
                                const p_definition_2 = p_definition.type[0] !== 'selected'
                                    ? i_generic2.abort.state_constraint_found_expected("selected", p_definition.type, loc, abort)
                                    : p_definition.type[1]
                                const p_lookup = Lookup_Selection(
                                    $.lookup,
                                    abort,
                                    $l,
                                    $p,
                                )
                                const p_constraints = Value_Constraints(
                                    $.constraints,
                                    abort,
                                    p_.literal.nothing(),
                                    {
                                        'value': p_lookup['resulting dictionary'].value
                                    }
                                )
                                return ['selected', {
                                    'definition': p_definition_2,
                                    'lookup': p_lookup,
                                    'constraints': p_constraints,
                                }]
                            })
                            default: return p_.exhaustive($[0])
                        }
                    })
                }]
            })
            case 'state': return p_.option($, ($): s_out.Resolver_Value => {
                const p_definition = $p.definition[0] !== 'state'
                    ? i_generic2.abort.state_constraint_found_expected("state", $p.definition, loc, abort)
                    : $p.definition[1]

                const p_states: s_out.Resolver_Value.state.options = i_generic2.resolve_dense_dictionary(
                    $.options['l dictionary'],
                    $.options['l location'],
                    abort,
                    p_definition.options,
                    ($, id, $acyclic, $cyclic) => {

                        const x2 = i_generic2.get_entry_acyclic(
                            p_sl.acyclic.from_resolved_dictionary(p_definition.options),
                            {
                                'l reference': id,
                                'l location': $['l location'],
                            },
                            abort,
                        )
                        const p_constraints: s_out.Resolver_Value.state.options.D.constraints = Option_Constraints(
                            $['l entry'].constraints,
                            abort,
                            $l,
                            $p,
                        )
                        const vr = Value(
                            $['l entry']['resolver'],
                            abort,
                            {
                                ...$l,
                        'sibling property resolvers': $l['sibling property resolvers'],
                                'parent sibling property resolvers': $l['parent sibling property resolvers'],
                            },
                            {
                                'definition': x2['l entry'].value,
                                'option constraints': p_.literal.set(p_constraints),

                                'modules': $p.modules,
                                'schema imports': $p['schema imports'],
                                'resolver imports': $p['resolver imports'],
                                'signature': $p.signature,
                                'signatures': $p.signatures,
                                'list cursor': $p['list cursor'],
                                'linked entry': $p['linked entry'],
                                'current dictionary': $p['current dictionary'],
                                'current ordered dictionary': $p['current ordered dictionary'],
                            },
                        )
                        return {
                            'constraints': p_constraints,
                            //'referenced entry': x2.entry,
                            'resolver': vr,
                        }
                    },
                )


                // case 'state': return pa.option($, ($): _i_generic.Resolved_Step<_i_out.Resolver_Relative_Value_Selection.tail.L, _i_out.Value> => pa.deprecated_block(
                // () => {
                //     return pa.deprecated_block(
                // () => {

                //         const sc_definition: _i_out.Value.state = pa.deprecated_cc(current, ($) => {
                //             if ($[0] !== 'state') {
                //                 return pa.panic(`not a 'state' but a '${$[0]}' @ ${$p['location 2 string'](sg_loc)}`)
                //             }
                //             return $[1]
                //         })
                //         const p_type: _i_out.Resolver_Relative_Value_Selection.tail.L.state.type_ = pa.deprecated_cc($['type'], ($) => Module_Reference(
                //             $,
                //             {
                //                 'location 2 string': l2s,
                //                 'parameters': ({
                //                     'lookups': ({
                //                         'imports': $l.imports,
                //                         'modules': $l.modules,
                //                     }),
                //                     'modules': p_.literal.nothing(),
                //                 }),
                //             }
                //         ))
                //         const p_states: _i_out.Resolver_Relative_Value_Selection.tail.L.state.states = pa.deprecated_cc($['states'], ($) => _i_generic.resolve_dense_dictionary(
                //             $,
                //             {
                //                 'location 2 string': l2s,
                //                 'map': ($, $p) => {
                //                     const linked_entry = _i_generic.get_ entry(
                //                         _p_temp.dictionary_to_lookup(sc_definition, null),
                //                         {
                //                             'location 2 string': l2s,
                //                             'reference': {
                //                                 'key': $.key,
                //                                 'location': $['l location']
                //                             },
                //                         }
                //                     )
                //                     return p_.from.dictionary($.value).map(
                // ($) => Value_Selection_Tail(
                //                         $,
                //                         {
                //                             'location 2 string': l2s,
                //                             'parameters': {
                //                                 'lookups': $l,
                //                                 'modules': {
                //                                     'type': linked_entry.entry
                //                                 }
                //                             },
                //                         }
                //                     ))
                //                 },
                //                 'denseness benchmark': sc_definition,
                //             }
                //         ))
                //         return {
                //             'result': p_type['resulting node'],
                //             'element': ['state', ({
                //                 'definition': sc_definition,
                //                 'states': p_states,
                //                 'type': p_type,
                //             })]
                //         }
                //     })
                // }))
                return ['state', {
                    'definition': p_definition,
                    'options': p_states,
                }]
            })
            case 'text': return p_.option($, ($) => {
                // const x = $p.definition[0] !== 'text'
                //     ? i_generic2.abort.state_constraint_found_expected("text", $p.definition, loc, abort)
                //     : $p.definition[1]
                return ['text', null]
            })
            // case 'type parameter': return _pt.option($, ($) => {

            //     const x = $p.definition[0] !== 'type parameter'
            //         ? _pt.fixme_abort("not a 'type parameter' but a '", $p.definition, "' @ ", $p['location 2 string'](loc))
            //         : $p.definition[1]
            //     return ['type parameter', null]
            // })
            default: return p_.exhaustive($[0])
        }
    })
    return p_type
}
export const Relative_Value_Selection: declarations.Resolver_Relative_Value_Selection_ = ($, abort, $l, $p) => p_variables(
    () => {

        const p_path: s_out.Resolver_Relative_Value_Selection.path = i_generic2.temp_map_list_with_state(
            $.path['l list'],
            $p.value,
            ($, current): s_out.Resolver_Relative_Value_Selection.path.l_value.L => {
                const sg_loc = $['l location']
                return p_change_context($['l item']['l state'], ($): s_out.Resolver_Relative_Value_Selection.path.l_value.L => {
                    switch ($[0]) {
                        case 'state': return p_.option($, ($) => {
                            if (current[0] !== 'state') return i_generic2.abort.state_constraint_expected_found('state', current, sg_loc, abort)
                            const option = i_generic2.get_entry_acyclic(p_sl.acyclic.from_resolved_dictionary(current[1].options), $, abort)
                            return { 'l item': ['state', option], 'l results': { result: option['l entry'].value } }
                        })
                        case 'component': return p_.option($, ($): s_out.Resolver_Relative_Value_Selection.path.l_value.L => {

                            const sc_definition: s_out.Value.component = p_change_context(current, ($) => {
                                if ($[0] !== 'component') {
                                    return i_generic2.abort.state_constraint_expected_found("component", $, sg_loc, abort)
                                }
                                return $[1]
                            })
                            return {
                                'l item': ['component', null],
                                'l results': {
                                    'result': p_change_context(sc_definition.type, ($) => {
                                        switch ($[0]) {
                                            case 'external': return p_.option($, ($) => $.module['l entry']['root value'])
                                            case 'internal acyclic': return p_.option($, ($) => $['l entry']['root value'])
                                            case 'internal': return p_.option($, ($) => $['l entry'].get_circular_dependent()['root value']) //this is safe, the modules have been resolved at this stage
                                            default: return p_.exhaustive($[0])
                                        }
                                    })
                                }
                            }
                        })
                        case 'group': return p_.option($, ($) => {
                            const sc_definition: s_out.Value.group = p_change_context(current, ($) => {
                                if ($[0] !== 'group') {
                                    return i_generic2.abort.state_constraint_expected_found("group", $, sg_loc, abort)
                                }
                                return $[1]
                            })
                            const p_child = i_generic2.get_entry_acyclic(
                                p_sl.acyclic.from_resolved_dictionary(sc_definition,),
                                $,
                                abort,
                            )
                            return {
                                'l item': ['group', p_child],
                                'l results': {
                                    'result': p_child['l entry'].value
                                }
                            }
                        })
                        case 'reference': return p_.option($, ($): s_out.Resolver_Relative_Value_Selection.path.l_value.L => {

                            const sc_definition: s_out.Value.reference = p_change_context(current, ($) => {
                                if ($[0] !== 'reference') {
                                    return i_generic2.abort.state_constraint_expected_found("reference", $, sg_loc, abort)
                                }
                                return $[1]
                            })
                            const referent: s_out.Value_Reference = sc_definition.referent
                            const x: s_out.Value = p_change_context(sc_definition.type, ($) => {
                                switch ($[0]) {
                                    case 'derived': return p_.option($, ($) => referent.path['resulting node'])
                                    case 'selected': return p_.option($, ($) => p_change_context(referent.path['resulting node'], ($) => {
                                        switch ($[0]) {
                                            case 'dictionary': return p_.option($, ($) => $.value)
                                            default: return i_generic2.abort.state_constraint_found_expected("dictionary", $, sg_loc, abort)
                                        }
                                    }))
                                    default: return p_.exhaustive($[0])
                                }
                            })
                            return {
                                'l item': ['reference', {
                                    'definition': sc_definition
                                }],
                                'l results': {
                                    'result': x
                                }
                            }
                        })
                        default: return p_.exhaustive($[0])
                    }
                })
            },
            ($) => $['l results'].result,
            (list, result) => ({
                'l value': list,
                'l results': {
                    'result': result,
                }
            }),
        )
        return {
            'path': p_path,
            'resulting node': p_path['l results'].result, // list result
        }
    })

export const Value_Constraints: declarations.Resolver_Value_Constraints_ = ($, abort, $l, $p) => {
    return p_change_context($, ($) => i_generic2.temp_resolve(
        $['l dictionary'],
        ($, id, $acyclic, $cyclic) => p_change_context($, ($) => p_variables(
            () => {
                const p_start: s_out.Resolver_Value_Constraint.start = p_change_context($['l entry'].start['l state'], ($) => {
                    switch ($[0]) {
                        case 'value': return p_.option($, ($) => ['value', null])
                        case 'sibling': return p_.option($, ($) => ['sibling', i_generic2.get_entry_acyclic(
                            $acyclic,
                            $,
                            abort,
                        )])
                        default: return p_.exhaustive($[0])
                    }
                })
                const p_constraint: s_out.Resolver_Value_Constraint.constraint = Constraint(
                    $['l entry'].constraint,
                    abort,
                    p_.literal.nothing(),
                    {

                        'value': p_change_context(p_start, ($) => {
                            switch ($[0]) {
                                case 'value': return p_.option($, ($) => $p.value)
                                case 'sibling': return p_.option($, ($) => p_change_context($['l entry'].constraint.type, ($) => {
                                    switch ($[0]) {
                                        case 'state': return p_.option($, ($) => $.option['l entry'].value)
                                        case 'optional value': return p_.option($, ($) => $['selected optional value'])
                                        default: return p_.exhaustive($[0])
                                    }
                                }))
                                default: return p_.exhaustive($[0])
                            }
                        }),
                    },
                )
                return ({
                    'start': p_start,
                    'constraint': p_constraint,
                })
            })),
    ))
}

export const Guaranteed_Value_Selection: declarations.Resolver_Guaranteed_Value_Selection_ = ($, abort, $l, $p) => p_variables(
    () => p_variables(
        () => {
            const start_location = $.start['l location']
            const p_start: s_out.Resolver_Guaranteed_Value_Selection.start = p_change_context($.start['l state'], ($): s_out.Resolver_Guaranteed_Value_Selection.start => {
                switch ($[0]) {
                    case 'previous item': return p_.option($, ($) => {
                        if ($l['previous item definition'] === undefined)
                            return i_generic2.abort.parameter_is_set_assertion('previous item', start_location, abort)
                        return ['previous item', { initial: Guaranteed_Value_Selection($.initial, abort, $l, $p) }]
                    })
                    case 'last item': return p_.option($, ($) => {
                        const property = i_generic2.get_entry_acyclic($l['sibling property resolvers'], $.property, abort)
                        if (property['l entry'].resolver[0] !== 'list')
                            return i_generic2.abort.state_constraint_expected_found('list', property['l entry'].resolver, start_location, abort)
                        return ['last item', { property, initial: Guaranteed_Value_Selection($.initial, abort, $l, $p) }]
                    })
                    case 'constraint': return p_.option($, ($): s_out.Resolver_Guaranteed_Value_Selection.start => ['constraint', p_change_context($['l state'], ($): s_out.Resolver_Guaranteed_Value_Selection.start.constraint => {
                        switch ($[0]) {
                            case 'component': return p_.option($, ($) => {
                                const loc = $['property']['l location']
                                const p_sibling = p_change_context($['property'], ($) => i_generic2.get_entry_acyclic(
                                    $l['sibling property resolvers'],
                                    $,
                                    abort,
                                ))

                                const x_component = p_sibling['l entry'].resolver[0] !== 'component'
                                    ? i_generic2.abort.state_constraint_found_expected("component", p_sibling['l entry'].resolver, loc, abort)
                                    : p_sibling['l entry'].resolver[1]

                                const p_constraint = p_change_context($['constraint'], ($) => i_generic2.get_entry_acyclic(
                                    p_sl.acyclic.from_resolved_dictionary(x_component.constraints),
                                    $,
                                    abort,
                                ))
                                return ['component', {
                                    'property': p_sibling,
                                    'constraint': p_constraint
                                }]
                            })
                            case 'reference': return p_.option($, ($) => {
                                const loc = $['property']['l location']
                                const p_sibling = p_change_context($['property'], ($) => i_generic2.get_entry_acyclic(
                                    $l['sibling property resolvers'],
                                    $,
                                    abort,
                                ))

                                const x_reference = p_sibling['l entry'].resolver[0] !== 'reference'
                                    ? i_generic2.abort.state_constraint_found_expected("reference", p_sibling['l entry'].resolver, loc, abort)
                                    : p_sibling['l entry'].resolver[1]

                                const x_reference_selected = x_reference.type[0] !== 'selected'
                                    ? i_generic2.abort.state_constraint_expected_found("selected", x_reference.type, loc, abort)
                                    : x_reference.type[1]

                                const p_constraint = p_change_context($['constraint'], ($) => i_generic2.get_entry_acyclic(
                                    p_sl.acyclic.from_resolved_dictionary(x_reference_selected.constraints),
                                    $,
                                    abort,
                                ))
                                return ['reference', {
                                    'property': p_sibling,
                                    'constraint': p_constraint
                                }]
                            })
                            default: return p_.exhaustive($[0])
                        }
                    })])
                    case 'list cursor': return p_.option($, ($) => ['list cursor', null])
                    case 'linked entry': return p_.option($, ($) => ['linked entry', null])
                    case 'option constraint': return p_.option($, ($): s_out.Resolver_Guaranteed_Value_Selection.start => {
                        const sc = p_.from.optional($p['option constraints']).decide(
                            ($) => $,
                            () => i_generic2.abort.parameter_is_set_assertion("option constraints", start_location, abort)
                        )
                        return ['option constraint', i_generic2.get_entry_acyclic(
                            p_sl.acyclic.from_resolved_dictionary(sc),
                            $,
                            abort,
                        )]
                    })
                    case 'parameter': return p_.option($, ($) => ['parameter', i_generic2.get_entry_acyclic(
                        p_sl.acyclic.from_resolved_dictionary($p.signature['resolved parameters'].modules),
                        $,
                        abort,
                    )])
                    case 'result': return p_.option($, ($) => ['result', p_change_context($['l state'], ($): s_out.Resolver_Guaranteed_Value_Selection.start.result => {
                        switch ($[0]) {
                            case 'list': return p_.option($, ($) => {
                                const loc = $['property']['l location']
                                const p_sibling: s_out.Resolver_Guaranteed_Value_Selection.start.result.list.property = p_change_context($['property'], ($) => i_generic2.get_entry_acyclic(
                                    $l['sibling property resolvers'],
                                    $,
                                    abort,
                                ))
                                const p_list_result_a = p_change_context($['list result'], ($) => p_sibling['l entry'].resolver[0] !== 'list'
                                    ? i_generic2.abort.state_constraint_found_expected("list", p_sibling['l entry'].resolver, loc, abort)
                                    : p_sibling['l entry'].resolver[1])
                                const p_list_result: s_out.Resolver_Guaranteed_Value_Selection.start.result.list.list_result = p_.from.optional(p_list_result_a.result).decide(
                                    ($) => $,
                                    () => i_generic2.abort.is_set_assertion("list result", loc, abort)
                                )
                                return ['list', {
                                    'property': p_sibling,
                                    'list result': p_list_result,
                                }]
                            })
                            case 'state': return p_.option($, ($) => {
                                const loc = $['property']['l location']
                                const p_sibling: s_out.Resolver_Guaranteed_Value_Selection.start.result.state.property = p_change_context($['property'], ($) => i_generic2.get_entry_acyclic(
                                    $l['sibling property resolvers'],
                                    $,
                                    abort,
                                ))
                                const P_state = p_change_context($['state'], ($) => p_sibling['l entry'].resolver[0] !== 'state'
                                    ? i_generic2.abort.state_constraint_found_expected("state", p_sibling['l entry'].resolver, loc, abort)
                                    : p_sibling['l entry'].resolver[1])
                                return ['state', {
                                    'property': p_sibling,
                                    'state': P_state,
                                    'result': Module_Reference(
                                        $.result,
                                        abort,
                                        {
                                            'modules': p_sl.acyclic.from_resolved_dictionary($p.modules),
                                        },
                                        {
                                            'imports': $p['schema imports'],
                                        },
                                    )
                                }]
                            })
                            case 'optional value': return p_.option($, ($) => {
                                const loc = $['property']['l location']
                                const p_sibling: s_out.Resolver_Guaranteed_Value_Selection.start.result.optional_value.property = p_change_context($['property'], ($) => i_generic2.get_entry_acyclic(
                                    $l['sibling property resolvers'],
                                    $,
                                    abort,
                                ))
                                const p_optional_value = p_change_context($['optional value'], ($) => p_sibling['l entry'].resolver[0] !== 'optional'
                                    ? i_generic2.abort.state_constraint_found_expected("optional", p_sibling['l entry'].resolver, loc, abort)
                                    : p_sibling['l entry'].resolver[1])
                                return ['optional value', {
                                    'property': p_sibling,
                                    'optional value': p_optional_value,
                                    'result': Module_Reference(
                                        $.result,
                                        abort,
                                        {
                                            'modules': p_sl.acyclic.from_resolved_dictionary($p.modules),
                                        },
                                        {
                                            'imports': $p['schema imports'],
                                        },
                                    )
                                }]
                            })
                            default: return p_.exhaustive($[0])
                        }
                    })])
                    case 'sibling': return p_.option($, ($): s_out.Resolver_Guaranteed_Value_Selection.start => ['sibling', i_generic2.get_entry_acyclic(
                        $l['sibling property resolvers'],
                        $,
                        abort,
                    )])
                    case 'parent sibling': return p_.option($, ($): s_out.Resolver_Guaranteed_Value_Selection.start => ['parent sibling', i_generic2.get_entry_acyclic(
                        $l['parent sibling property resolvers'],
                        $,
                        abort,
                    )])
                    default: return p_.exhaustive($[0])
                }
            })
            const p_tail = Relative_Value_Selection(
                $.tail,
                abort,
                p_.literal.nothing(),
                {
                    'value': p_variables(
                        () => {
                            const pvs = ($: s_out.Resolver_Possible_Value_Selection) => p_change_context($, ($): s_out.Module => {
                                return p_change_context($, ($) => {
                                    switch ($[0]) {
                                        case 'parameter': return p_.option($, ($) => $['l entry'].module['resulting module'])
                                        case 'result': return p_.option($, ($) => p_change_context($, ($) => {
                                            switch ($[0]) {
                                                case 'state': return p_.option($, ($) => $.result['resulting module'])
                                                case 'optional value': return p_.option($, ($) => $.result['resulting module'])
                                                default: return p_.exhaustive($[0])
                                            }
                                        }))
                                        default: return p_.exhaustive($[0])
                                    }
                                })
                            })['root value']
                            const start_loc = $.start['l location']
                            const gvs_start = ($: s_out.Resolver_Guaranteed_Value_Selection.start) => p_change_context($, ($): s_out.Value => {
                                switch ($[0]) {
                                    case 'previous item': return $l['previous item definition'] === undefined
                                        ? i_generic2.abort.parameter_is_set_assertion('previous item', start_loc, abort) : $l['previous item definition']
                                    case 'last item': {
                                        const resolver = $[1].property['l entry'].resolver
                                        return resolver[0] === 'list' ? resolver[1].definition.value
                                            : i_generic2.abort.state_constraint_expected_found('list', resolver, start_loc, abort)
                                    }
                                    case 'constraint': return p_.option($, ($) => p_change_context($, ($) => {
                                        switch ($[0]) {
                                            case 'component': return p_.option($, ($) => p_change_context($.constraint['l entry'].constraint.type, ($) => {
                                                switch ($[0]) {
                                                    case 'state': return p_.option($, ($) => $.option['l entry'].value)
                                                    case 'optional value': return p_.option($, ($) => $['selected optional value'])
                                                    default: return p_.exhaustive($[0])
                                                }
                                            }))
                                            case 'reference': return p_.option($, ($) => p_change_context($.constraint['l entry'].constraint.type, ($) => {
                                                switch ($[0]) {
                                                    case 'state': return p_.option($, ($) => $.option['l entry'].value)
                                                    case 'optional value': return p_.option($, ($) => $['selected optional value'])

                                                    default: return p_.exhaustive($[0])
                                                }
                                            }))

                                            default: return p_.exhaustive($[0])
                                        }
                                    }))
                                    case 'parameter': return p_.option($, ($) => $['l entry'].module['resulting module']['root value'])
                                    case 'result': return p_.option($, ($) => p_change_context($, ($) => {
                                        switch ($[0]) {
                                            case 'state': return p_.option($, ($) => $.result['resulting module']['root value'])
                                            case 'optional value': return p_.option($, ($) => $.result['resulting module']['root value'])
                                            case 'list': return p_.option($, ($) => $['list result']['resulting module']['root value'])
                                            default: return p_.exhaustive($[0])
                                        }
                                    }))
                                    case 'list cursor': return p_.option($, ($) => p_.from.optional($p['list cursor']).decide(
                                        ($) => $['resulting module']['root value'],
                                        () => i_generic2.abort.parameter_is_set_assertion("list cursor", start_loc, abort)
                                    ))
                                    case 'linked entry': return p_.option($, ($) => p_.from.optional($p['linked entry']).decide(
                                        ($) => $['resulting dictionary'].value,
                                        () => i_generic2.abort.parameter_is_set_assertion("linked entry", start_loc, abort)
                                    ))
                                    case 'option constraint': return p_.option($, ($) => p_change_context($['l entry'], ($) => {
                                        switch ($[0]) {
                                            case 'state': return p_.option($, ($) => $.option['l entry'].value)
                                            case 'assert is set': return p_.option($, ($) => pvs($))
                                            default: return p_.exhaustive($[0])
                                        }
                                    }))
                                    case 'sibling': return p_.option($, ($) => $['l entry'].definition.value)
                                    case 'parent sibling': return p_.option($, ($) => $['l entry'].definition.value)
                                    default: return p_.exhaustive($[0])
                                }
                            })
                            return gvs_start(p_start)
                        })
                },
            )
            const p_resulting_type: s_out.Value = p_tail['resulting node']
            if ((p_start[0] === 'previous item' || p_start[0] === 'last item')
                && walk_path_till_end(p_start[1].initial['resulting node']) !== walk_path_till_end(p_resulting_type)) {
                return i_generic2.abort.same_node_constraint('initial selection data type', start_location, abort)
            }
            return ({
                'start': p_start,
                'tail': p_tail,
                'resulting node': p_resulting_type,
            })
        }))

const walk_path_till_end = ($: s_out.Value): s_out.Value => {
    switch ($[0]) {
        case 'component':
            switch ($[1].type[0]) {
                case 'external': return $[1].type[1].module['l entry']['root value']
                case 'internal acyclic': return $[1].type[1]['l entry']['root value']
                case 'internal': return $[1].type[1]['l entry'].get_circular_dependent()['root value']
                default: return p_.exhaustive($[1].type[0])
            }
        case 'reference': return $[1].referent.path['resulting node']
        default: return $
    }
}

export const Option_Constraints: declarations.Resolver_Option_Constraints_ = ($, abort, $l, $p) => {
    return p_change_context($, ($) => i_generic2.temp_resolve(
        $['l dictionary'],
        ($, id, $acyclic, $cyclic) => p_change_context($, ($) => p_change_context($['l entry']['l state'], ($) => {
            switch ($[0]) {
                case 'state': return p_.option($, ($) => ['state', p_variables(
                    () => {
                        const loc = $.selection.start['l location']
                        const p_selection: s_out.Resolver_Option_Constraints.D.state.selection = p_change_context($['selection'], ($) => Guaranteed_Value_Selection(
                            $,
                            abort,
                            $l,
                            $p,
                        ))
                        const p_selected_state = p_selection['resulting node'][0] !== 'state' // component constraint ('selection')
                            ? i_generic2.abort.state_constraint_found_expected(
                                "state",
                                p_selection['resulting node'],
                                loc,
                                abort,
                            )
                            : p_selection['resulting node'][1]
                        const p_option: s_out.Resolver_Option_Constraints.D.state.option = p_change_context($['option'], ($) => i_generic2.get_entry_acyclic(
                            p_sl.acyclic.from_resolved_dictionary(p_selected_state.options),
                            $,
                            abort,
                        ))
                        return ({
                            'selected state': p_selected_state,
                            'selection': p_selection,
                            'option': p_option,
                        })
                    })])
                case 'assert is set': return p_.option($, ($) => ['assert is set', Possibly_Optional(
                    $,
                    abort,
                    $l,
                    $p,
                )])
                default: return p_.exhaustive($[0])
            }
        })),
    ))
}

export const Constraint: declarations.Resolver_Constraint_ = ($, abort, $l, $p) => {
    const p_selection: s_out.Resolver_Constraint.selection = p_change_context($['selection'], ($) => Relative_Value_Selection(
        $,
        abort,
        p_.literal.nothing(),
        {
            'value': $p.value,
        }
    ))
    const loc = $.type['l location']
    const p_type: s_out.Resolver_Constraint.type_ = p_change_context($.type, ($) => p_change_context($['l state'], ($) => {
        switch ($[0]) {
            case 'state': return p_.option($, ($) => {
                const p_selected_state = p_selection['resulting node'][0] !== 'state' // component constraint ('selection')
                    ? i_generic2.abort.state_constraint_found_expected(
                        "state",
                        p_selection['resulting node'],
                        loc,
                        abort,
                    )
                    : p_selection['resulting node'][1]
                const p_option: s_out.Resolver_Constraint.type_.state.option = p_change_context($['option'], ($) => i_generic2.get_entry_acyclic(
                    p_sl.acyclic.from_resolved_dictionary(p_selected_state.options),
                    $,
                    abort,
                ))
                return ['state', {
                    'selected state': p_selected_state,
                    'option': p_option,
                }]
            })
            case 'optional value': return p_.option($, ($) => {
                const p_selected_optional_value = p_selection['resulting node'][0] !== 'optional' // component constraint ('selection')
                    ? i_generic2.abort.state_constraint_found_expected(
                        "optional",
                        p_selection['resulting node'],
                        loc,
                        abort,
                    )
                    : p_selection['resulting node'][1]
                return ['optional value', {
                    'selected optional value': p_selected_optional_value,
                }]
            })
            default: return p_.exhaustive($[0])
        }
    }))
    return {
        'selection': p_selection,
        'type': p_type,
    }
}

export const Optional_Value_Initialization: declarations.Resolver_Optional_Value_Initialization_ = ($, abort, $l, $p) => p_variables(
    () => p_change_context($['l state'], ($) => {
        switch ($[0]) {
            case 'not set': return p_.option($, ($) => ['not set', null])
            case 'set': return p_.option($, ($) => ['set', Guaranteed_Value_Selection($, abort, $l, $p)])
            case 'selection': return p_.option($, ($): s_out.Resolver_Optional_Value_Initialization => {
                return ['selection', Possibly_Optional($, abort, $l, $p)]
            })
            default: return p_.exhaustive($[0])
        }
    }))

export const Possibly_Optional: declarations.Resolver_Possible_Value_Selection_ = ($, abort, $l, $p) => p_variables(
    () => {
        return p_change_context($['l state'], ($) => {
            switch ($[0]) {
                case 'parameter': return p_.option($, ($) => ['parameter', i_generic2.get_entry_acyclic(
                    p_sl.acyclic.from_resolved_dictionary($p.signature['resolved parameters'].modules),
                    $,
                    abort,
                )])
                case 'result': return p_.option($, ($) => ['result', p_change_context($['l state'], ($): s_out.Resolver_Possible_Value_Selection.result => {
                    switch ($[0]) {
                        case 'state': return p_.option($, ($) => {
                            const loc = $['property']['l location']
                            const p_sibling: s_out.Resolver_Possible_Value_Selection.result.state.property = p_change_context($['property'], ($) => i_generic2.get_entry_acyclic(
                                $l['sibling property resolvers'],
                                $,
                                abort,
                            ))
                            const P_state = p_change_context($['state'], ($) => p_sibling['l entry'].resolver[0] !== 'state'
                                ? i_generic2.abort.state_constraint_found_expected("state", p_sibling['l entry'].resolver, loc, abort)
                                : p_sibling['l entry'].resolver[1])

                            const p_result = Module_Reference(
                                $.result,
                                abort,
                                {
                                    'modules': p_sl.acyclic.from_resolved_dictionary($p.modules),
                                },
                                {
                                    'imports': $p['schema imports'],
                                },
                            )
                            return ['state', {
                                'property': p_sibling,
                                'state': P_state,
                                'result': p_result,
                            }]
                        })
                        case 'optional value': return p_.option($, ($) => {
                            const loc = $['property']['l location']
                            const p_sibling: s_out.Resolver_Possible_Value_Selection.result.optional_value.property = p_change_context($['property'], ($) => i_generic2.get_entry_acyclic(
                                $l['sibling property resolvers'],
                                $,
                                abort,
                            ))
                            const p_optional_value = p_change_context($['optional value'], ($) => p_sibling['l entry'].resolver[0] !== 'optional'
                                ? i_generic2.abort.state_constraint_found_expected("optional", p_sibling['l entry'].resolver, loc, abort)
                                : p_sibling['l entry'].resolver[1])
                            const p_result = Module_Reference(
                                $.result,
                                abort,
                                {
                                    'modules': p_sl.acyclic.from_resolved_dictionary($p.modules),
                                },
                                {
                                    'imports': $p['schema imports'],
                                },
                            )
                            return ['optional value', {
                                'property': p_sibling,
                                'optional value': p_optional_value,
                                'result': p_result,
                            }]
                        })
                        default: return p_.exhaustive($[0])
                    }
                })])
                default: return p_.exhaustive($[0])
            }
        })
    })

export const Lookup_Selection: declarations.Resolver_Lookup_Selection_ = ($, abort, $l, $p) => p_variables(
    () => p_variables(
        () => {
            const loc = $.type['l location']
            const p_type: s_out.Resolver_Lookup_Selection.type_ = p_change_context($['type'], ($) => p_change_context($['l state'], ($): s_out.Resolver_Lookup_Selection.type_ => {
                switch ($[0]) {
                    case 'acyclic': return p_.option($, ($): s_out.Resolver_Lookup_Selection.type_ => ['acyclic', p_.from.state($['l state']).decide(
                        ($): s_out.Resolver_Lookup_Selection.type_.acyclic => {
                            switch ($[0]) {
                                case 'resolved dictionary': return p_.option($, ($) => {
                                    const p_selection = Guaranteed_Value_Selection(
                                        $.selection,
                                        abort,
                                        $l,
                                        $p,
                                    )

                                    const p_selected_dictionary = p_selection['resulting node'][0] !== 'dictionary' // component constraint (selection)
                                        ? i_generic2.abort.state_constraint_found_expected(
                                            "dictionary",
                                            p_selection['resulting node'],
                                            $.selection.start['l location'], //$['selected dictionary'].location,
                                            abort,
                                        )
                                        : p_selection['resulting node'][1]

                                    return ['resolved dictionary', {
                                        'selection': p_selection,
                                        'selected dictionary': p_selected_dictionary,
                                    }]
                                })
                                case 'siblings': return p_.option($, ($) => ['siblings', p_.from.optional($p['current dictionary']).decide(
                                    ($) => $,
                                    () => i_generic2.abort.parameter_is_set_assertion("current directory", loc, abort)
                                )])
                                default: return p_.exhaustive($[0])
                            }
                        })])
                    case 'cyclic': return p_.option($, ($) => ['cyclic', p_.from.state($['l state']).decide(
                        ($): s_out.Resolver_Lookup_Selection.type_.cyclic => {
                            switch ($[0]) {
                                case 'siblings': return p_.option($, ($) => ['siblings', p_.from.optional($p['current dictionary']).decide(
                                    ($) => $,
                                    () => i_generic2.abort.parameter_is_set_assertion("current directory", loc, abort)
                                )])
                                default: return p_.exhaustive($[0])
                            }
                        })])
                    case 'parameter': return p_.option($, ($) => ['parameter', i_generic2.get_entry_acyclic(
                        p_sl.acyclic.from_resolved_dictionary($p.signature['resolved parameters'].lookups),
                        $,
                        abort
                    )])
                    default: return p_.exhaustive($[0])
                }
            }))
            const p_resulting_dictionary = p_change_context(p_type, ($): s_out.Value.dictionary => {
                switch ($[0]) {
                    case 'acyclic': return p_.option($, ($) => p_.from.state($).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'siblings': return p_.option($, ($) => $)
                                case 'resolved dictionary': return p_.option($, ($) => $['selected dictionary'])
                                default: return p_.exhaustive($[0])
                            }
                        }))
                    case 'cyclic': return p_.option($, ($) => p_.from.state($).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'siblings': return p_.option($, ($) => $)
                                default: return p_.exhaustive($[0])
                            }
                        }))
                    case 'parameter': return p_.option($, ($) => $['l entry'].dictionary)
                    default: return p_.exhaustive($[0])
                }
            })
            return ({
                'type': p_type,
                'resulting dictionary': p_resulting_dictionary,
            })
        }))

export const Module_Reference: declarations.Module_Reference_ = ($, abort, $l, $p) => {
    const x: s_out.Module_Reference.location = p_change_context($.location['l state'], ($) => {
        switch ($[0]) {
            case 'external': return p_.option($, ($): s_out.Module_Reference.location => {
                const sc_import = p_.from.optional($p.imports).decide(
                    ($) => $,
                    () => i_generic2.abort.parameter_is_set_assertion("imports", $.import['l location'], abort)
                )
                const p_import = i_generic2.get_entry_acyclic(
                    p_sl.acyclic.from_resolved_dictionary(sc_import),
                    $.import,
                    abort
                )
                return ['external', {
                    'import': p_import,
                    'module': i_generic2.get_entry_acyclic(
                        p_sl.acyclic.from_resolved_dictionary(p_import['l entry'].schema.modules),
                        $.module,
                        abort,
                    )
                }]
            })
            case 'internal': return p_.option($, ($) => ['internal', i_generic2.get_entry_acyclic(
                $l['modules'],
                $,
                abort,
            )])
            default: return p_.exhaustive($[0])
        }
    })
    const p_resulting_type = p_change_context(x, ($): s_out.Module => {
        switch ($[0]) {
            case 'external': return p_.option($, ($) => $.module['l entry'])
            case 'internal': return p_.option($, ($) => $['l entry'])
            default: return p_.exhaustive($[0])
        }
    })
    return {
        'location': x,
        'resulting module': p_resulting_type,
        'resulting value': p_resulting_type['root value'],
    }
}