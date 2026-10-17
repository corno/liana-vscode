import * as p_ from 'pareto-core/refiner'
import * as p_sl from 'pareto-core/refiner/specials/lookup'
import p_variables from 'pareto-core/refiner/specials/variables'
import p_change_context from 'pareto-core/refiner/specials/change_context'


import * as p_i from 'pareto-core/__internal/Abort'
import * as p_di from 'pareto-core/schema'
import * as p_ri from 'pareto-core/refiner'

import * as i_generic from "liana-runtime/modules/resolved_document_deserialization/schemas/resolving/schema"

import * as i_resolved from "../schema.js"

import * as i_unresolved from "../../unresolved/schema.js"

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

import * as s_out from "../schema.js"

import * as i_generic2 from "../../../../../temp/resolve_generic.js"

import { Value as Resolver_Value } from "../../../../resolver.generated/schemas/resolved/refiners/unresolved_manual.js"
import { Signatures } from "../../../../signatures.generated/schemas/resolved/refiners/unresolved_manual.js"
import { Value, Globals } from "../../../../modules.generated/schemas/resolved/refiners/unresolved_manual.js"


export const Package: declarations.Package_ = ($, abort, $l, $p) => p_.literal.group_resolve(
    () => {

        const prop_omit_$po_de$pc_serializer = p_change_context(
            $['omit (de)serializer'],
            ($) => $,
        )

        const prop_schema_tree = p_change_context(
            $['schema tree'],
            ($) => Schema_Tree(
                $,
                ($) => abort(
                    $,
                ),
                {
                    'sibling schemas': p_sl.stack.empty(
                    ),
                },
                p_.literal.nothing(),
            ),
        )
        return {
            'omit (de)serializer': prop_omit_$po_de$pc_serializer,
            'schema tree': prop_schema_tree,
        }
    },
)


export const Schema_Imports: declarations.Schema_Imports_ = ($, abort, $l, $p) => p_variables(
    () => p_change_context($, ($) => i_generic2.temp_resolve(
        $['l dictionary'],
        ($, id) => p_change_context($, ($) => p_change_context($, ($): s_out.Schema_Imports.D => {
            const foo = p_change_context($['l entry']['schema set child'], ($) => i_generic2.get_entry_stack(
                $l['sibling schemas'],
                $,
                abort,
            ))
            const p_schema_set_child: s_out.Schema_Imports.D.schema_set_child = {
                'l value': foo,
                'l results': {
                    'schema': p_.from.state(foo['l entry']).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'schema': return p_.option($, ($) => $)
                                case 'set': return p_.option($, ($) => abort({
                                    'type': ['constraint', ['state', {
                                        'expected': "schema",
                                        'found': "set",
                                    }]],
                                    'location': loc
                                }))
                                default: return p_.exhaustive($[0])
                            }
                        })
                }
            }
            const loc = $['l entry']['schema set child']['l location']
            const p_schema: s_out.Schema_Imports.D.schema = p_change_context($['l entry']['schema'], ($) => p_schema_set_child['l results'].schema)
            return {
                'schema set child': p_schema_set_child,
                'schema': p_schema,
            }
        })),
    )))
export const Resolver_Imports: declarations.Resolver_Imports_ = ($, abort, $l, $p) => p_variables(
    () => p_change_context($, ($) => i_generic2.temp_resolve(
        $['l dictionary'],
        ($, id) => p_change_context($, ($) => p_change_context($, ($): s_out.Resolver_Imports.D => {
            const loc = $['l entry']['schema set child']['l location']
            const foo = p_change_context($['l entry']['schema set child'], ($) => i_generic2.get_entry_stack(
                $l['sibling schemas'],
                $,
                abort,
            ))
            const p_schema_set_child: s_out.Resolver_Imports.D.schema_set_child = {
                'l value': foo,
                'l results': {
                    'resolver': p_.from.state(foo['l entry']).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'schema': return p_.option($, ($) => p_.from.state($.complexity).decide(
                                    ($) => {
                                        switch ($[0]) {
                                            case 'constrained': return p_.option($, ($) => $)
                                            case 'unconstrained': return p_.option($, ($) => abort({
                                                'type': ['constraint', ['state', {
                                                    'expected': "constrained",
                                                    'found': "unconstrained",
                                                }]],
                                                'location': loc
                                            }))
                                            default: return p_.exhaustive($[0])
                                        }
                                    }))
                                case 'set': return p_.option($, ($) => abort({
                                    'type': ['constraint', ['state', {
                                        'expected': "schema",
                                        'found': "set",
                                    }]],
                                    'location': loc
                                }))
                                default: return p_.exhaustive($[0])
                            }
                        })
                }
            }
            const p_schema: s_out.Resolver_Imports.D.resolver = p_change_context($['l entry']['resolver'], ($) => p_schema_set_child['l results'].resolver)
            return {
                'schema set child': p_schema_set_child,
                'resolver': p_schema,
            }
        })),
    )))

export const Schema_Tree: declarations.Schema_Tree_ = ($, abort, $l, $p) => p_variables(
    () => p_change_context($['l state'], ($): s_out.Schemas.D => {
        switch ($[0]) {
            case 'schema': return p_.option($, ($) => ['schema', p_variables(
                () => {
                    const p_schema_imports = Schema_Imports(
                        $['schema imports'],
                        abort,
                        {
                            'sibling schemas': $l['sibling schemas'],

                        },
                        p_.literal.nothing(),

                    )
                    const p_resolver_imports = Resolver_Imports(
                        $['resolver imports'],
                        abort,
                        {
                            'sibling schemas': $l['sibling schemas'],

                        },
                        p_.literal.nothing(),

                    )
                    const p_globals: s_out.Schema.globals = p_change_context($['globals'], ($) => Globals(
                        $,
                        abort,
                        p_.literal.nothing(),
                        p_.literal.nothing(),
                    ))
                    const p_types: s_out.Modules = i_generic2.temp_resolve(
                        $.types['l dictionary'],
                        ($, id, $acyclic, $cyclic) => {
                            const p_type = Value(
                                $['l entry']['root value'],
                                abort,
                                {
                                    'noncircular sibling modules': $acyclic,
                                    'possibly circular dependent sibling modules': $cyclic,
                                },
                                {
                                    'imports': p_.literal.set(p_schema_imports),
                                    'globals': p_.literal.set(p_globals),
                                },

                            )
                            return {
                                'root value': p_type,

                            }
                        },
                    )
                    const p_complexity: s_out.Schema.complexity = p_change_context($.complexity['l state'], ($) => {
                        switch ($[0]) {
                            case 'constrained': return p_.option($, ($) => {

                                const p_signatures: s_out.Resolver.signatures = p_change_context($.signatures, ($) => {
                                    const p_types_2: s_out.Resolver.signatures.signatures = p_change_context($, ($) => Signatures(
                                        $.signatures,
                                        abort,
                                        p_.literal.nothing(),
                                        {
                                            'imports': p_schema_imports,
                                            'modules': p_types,
                                        },
                                    ))
                                    return {
                                        'signatures': p_types_2,
                                    }
                                })
                                const p_modules: s_out.Resolver.modules = i_generic2.resolve_dense_dictionary(
                                    $.modules['l dictionary'],
                                    $.modules['l location'],
                                    abort,
                                    p_signatures.signatures,
                                    ($, id, $acyclic, $cyclic) => {

                                        const p_linked_entry = i_generic2.get_entry_acyclic(
                                            p_sl.acyclic.from_resolved_dictionary(p_types),
                                            {
                                                'l reference': id,
                                                'l location': $['l location'],
                                            },
                                            abort,
                                        )
                                        const p_signature = i_generic2.get_entry_acyclic(
                                            p_sl.acyclic.from_resolved_dictionary(p_signatures.signatures),
                                            {
                                                'l reference': id,
                                                'l location': $['l location'],
                                            },
                                            abort,
                                        )

                                        const p_type_resolver = Resolver_Value(
                                            $['l entry']['root value resolver'],
                                            abort,
                                            {
                                                'sibling property resolvers': p_sl.acyclic.not_set(),
                                                'parent sibling property resolvers': p_sl.acyclic.not_set(),

                                            },
                                            {
                                                'list cursor': p_.literal.not_set(),
                                                'linked entry': p_.literal.not_set(),
                                                'current dictionary': p_.literal.not_set(),
                                                'current ordered dictionary': p_.literal.not_set(),
                                                'option constraints': p_.literal.not_set(),

                                                'definition': p_linked_entry['l entry']['root value'],
                                                'signature': p_signature['l entry'],

                                                'modules': p_types,
                                                'schema imports': p_.literal.set(p_schema_imports),
                                                'resolver imports': p_.literal.set(p_resolver_imports),
                                                'signatures': p_signatures.signatures
                                            },
                                        )
                                        return {
                                            'signature': p_signature['l entry'],
                                            'root value resolver': p_type_resolver,
                                        }
                                    },
                                )
                                return ['constrained', {
                                    'signatures': p_signatures,
                                    'modules': p_modules,
                                }]
                            })
                            case 'unconstrained': return p_.option($, ($) => ['unconstrained', null])
                            default: return p_.exhaustive($[0])
                        }
                    })
                    return ({
                        'schema imports': p_schema_imports,
                        'resolver imports': p_resolver_imports,
                        'globals': p_globals,
                        'types': p_types,
                        'complexity': p_complexity,
                    })
                })])
            case 'set': return p_.option($, ($) => ['set', Schemas(
                $,
                abort,
                $l,
                $p,
            )])
            default: return p_.exhaustive($[0])
        }
    }))

export const Schemas: declarations.Schemas_ = ($, abort, $l, $p) => p_variables(
    () => i_generic2.temp_resolve(
        $['l dictionary'],
        ($, id, $acyclic, $cyclic) => p_change_context($, ($) => Schema_Tree(
            $['l entry'],
            abort,
            {
                'sibling schemas': p_sl.stack.push($l['sibling schemas'], $acyclic)
            },
            p_.literal.nothing(),
        )),
    ))



export const Module_Specification: declarations.Module_Specification_ = ($, abort, $l, $p) => p_variables(
    () => ({
        'schema': Schema_Tree(
            $.schema,
            abort,
            {
                'sibling schemas': p_sl.stack.empty(),
            },
            $p,
        ),
        'schema path': p_.from.list($['schema path']['l list']).map(
            ($) => $['l item']),
        'complexity': p_.from.state($.complexity['l state']).decide(
            ($) => {
                switch ($[0]) {
                    case 'constrained': return p_.option($, ($) => ['constrained', {
                        'type resolver': $['type resolver']
                    }])
                    case 'unconstrained': return p_.option($, ($) => ['unconstrained', {
                        'module': $.module
                    }])
                    default: return p_.exhaustive($[0])
                }
            })
    }))