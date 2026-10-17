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

import * as s_out from "../../../../schema.generated/schemas/resolved/schema.js"

import * as i_generic2 from "../../../../../temp/resolve_generic.js"

export const Value: declarations.Value_ = ($, abort, $l, $p) => {
    return p_change_context($['l state'], ($): s_out.Value => {
        switch ($[0]) {
            case 'simple': return p_.option($, ($): s_out.Value => ['simple', p_change_context($['l state'], ($): s_out.Value.simple => {
                switch ($[0]) {
                    case 'global': return p_.option($, ($): s_out.Value.simple => ['global', i_generic2.get_entry_acyclic(
                        p_sl.acyclic.from_resolved_dictionary(
                            p_.from.optional($p.globals).decide(
                                ($) => $['simple types'],
                                () => i_generic2.abort.parameter_is_set_assertion("globals", $['l location'], abort)
                            ),
                        ),
                        $,
                        abort,
                    )])
                    default: return p_.exhaustive($[0])
                }
            })])
            case 'text': return p_.option($, ($): s_out.Value => ['text', p_change_context($['l state'], ($): s_out.Value.text => {
                switch ($[0]) {
                    case 'global': return p_.option($, ($): s_out.Value.text => ['global', i_generic2.get_entry_acyclic(
                        p_sl.acyclic.from_resolved_dictionary(
                            p_.from.optional($p.globals).decide(
                                ($) => $['text types'],
                                () => i_generic2.abort.parameter_is_set_assertion("globals", $['l location'], abort)
                            ),
                        ),
                        $,
                        abort
                    )])
                    case 'local': return p_.option($, ($) => ['local', Text_Type(
                        $,
                        abort,
                        p_.literal.nothing(),
                        p_.literal.nothing(),
                    )])
                    default: return p_.exhaustive($[0])
                }
            })])
            case 'component': return p_.option($, ($): s_out.Value => ['component', {
                'type': p_change_context($.type['l state'], ($): s_out.Value.component.type_ => {
                    switch ($[0]) {
                        case 'external': return p_.option($, ($) => {
                            const sc_import = p_.from.optional($p.imports).decide(
                                ($) => $,
                                () => i_generic2.abort.parameter_is_set_assertion("imports", $.import['l location'], abort)
                            )
                            const p_import = i_generic2.get_entry_acyclic(
                                p_sl.acyclic.from_resolved_dictionary(sc_import),
                                $.import,
                                abort,
                            )
                            return ['external', {
                                'import': p_import,
                                'module': i_generic2.get_entry_acyclic(
                                    p_sl.acyclic.from_resolved_dictionary(p_import['l entry'].schema.types),
                                    $.module,
                                    abort,
                                )
                            }]
                        })
                        case 'internal acyclic': return p_.option($, ($) => ['internal acyclic', i_generic2.get_entry_acyclic(
                            $l['noncircular sibling modules'],
                            $,
                            abort,
                        )])
                        case 'internal': return p_.option($, ($) => ['internal', i_generic2.get_entry_cyclic(
                            $l['possibly circular dependent sibling modules'],
                            $,
                            abort
                        )])
                        default: return p_.exhaustive($[0])
                    }
                }),
                'results': Value_Results(
                    $.results,
                    abort,
                    {
                        'modules': $l['noncircular sibling modules'],
                    },
                    {
                        'imports': $p.imports,
                    },
                )
            }])
            case 'dictionary': return p_.option($, ($) => {
                const p_type = Value(
                    $.value,
                    abort,
                    $l,
                    $p,
                )
                return ['dictionary', {
                    'value': p_type,
                }]
            })
            case 'group': return p_.option($, ($) => ['group', i_generic2.temp_resolve(
                $['l dictionary'],
                ($, id, $acyclic, $cyclic) => ({
                    'description': $['l entry'].description,
                    'value': Value(
                        $['l entry'].value,
                        abort,
                        $l,
                        $p,
                    )
                }),
            )])
            case 'list': return p_.option($, ($): s_out.Value => {
                const p_type = Value(
                    $.value,
                    abort,
                    $l,
                    $p,
                )
                return ['list', {
                    'value': p_type,
                    'results': Value_Results(
                        $.results,
                        abort,
                        {
                            'modules': $l['noncircular sibling modules'],
                        },
                        {
                            'imports': $p.imports,
                        },
                    )
                }]
            })
            case 'nothing': return p_.option($, ($) => ['nothing', null])
            case 'optional': return p_.option($, ($) => ['optional', Value(
                $,
                abort,
                $l,
                $p,
            )])

            case 'reference': return p_.option($, ($): s_out.Value => {
                const loc = $.referent['module'].location['l location']
                // $p.globals.__deprecated_extract_data(
                //     ($) => {
                //         $.complexity[0] === 'unconstrained'
                //             ? i_generic.abort.state_constraint_found_expected("constrained", $.complexity, loc, abort)
                //             : $.complexity[1]

                //     },
                //     () => i_generic.abort.parameter_is_set_assertion("globals", loc, abort)
                // )
                const p_referent = Value_Reference(
                    $.referent,
                    abort,
                    {
                        'modules': $l['noncircular sibling modules'],
                    },
                    {
                        'imports': $p.imports,
                    },
                )
                const p_type: s_out.Value.reference.type_ = p_change_context($.type['l state'], ($) => {
                    switch ($[0]) {
                        case 'selected': return p_.option($, ($) => {
                            return ['selected', {
                                'dictionary': p_change_context(p_referent.path['resulting node'], ($) => { // component constraint (referent)
                                    switch ($[0]) {
                                        case 'dictionary': return p_.option($, ($) => $)
                                        default: return i_generic2.abort.state_constraint_found_expected(
                                            "dictionary",
                                            $,
                                            loc,
                                            abort,
                                        )

                                    }
                                }),
                                'dependency': p_change_context($.dependency['l state'], ($) => {
                                    switch ($[0]) {
                                        case 'cyclic': return p_.option($, ($) => ['cyclic', null])
                                        case 'acyclic': return p_.option($, ($) => ['acyclic', null])
                                        case 'stack': return p_.option($, ($) => ['stack', $])
                                        default: return p_.exhaustive($[0])
                                    }
                                }),
                                'results': Value_Results(
                                    $.results,
                                    abort,
                                    {
                                        'modules': $l['noncircular sibling modules'],
                                    },
                                    {
                                        'imports': $p.imports,
                                    },
                                )
                            }]
                        })
                        case 'derived': return p_.option($, ($) => ['derived', null])
                        default: return p_.exhaustive($[0])
                    }
                })

                return ['reference', {
                    'referent': p_referent,
                    'type': p_type,
                }]

                // case 'derived reference': return pa.option($, ($) => ['derived reference', Module_Reference(
                //     $,
                //     $p
                // )])
                // : resolved.Value => {
                //     const p_type = Module_Reference(
                //         $.type,
                //         $p,
                //     )
                //     const p_dictionary = p_type.tail.result[0] !== 'dictionary'
                //         ? pa.panic(`not a dictionary @ ${$p['location 2 string'](loc)}`)
                //         : p_type.tail.result[1]

                //     return ['reference', {
                //         'type': p_type,
                //         // 'resulting dictionary': p_dictionary,
                //         'dependency': $.dependency.state
                //     }]
                // }
            })
            case 'state': return p_.option($, ($) => ['state', {
                'options': i_generic2.temp_resolve(
                    $.options['l dictionary'],
                    ($, id, $acyclic, $cyclic) => ({
                        'constraints': Option_Constraints(
                            $['l entry'].constraints,
                            abort,
                            {
                                'modules': $l['noncircular sibling modules'],
                            },
                            {
                                'imports': $p.imports,
                            },
                        ),
                        'description': $['l entry'].description,
                        'value': Value(
                            $['l entry'].value,
                            abort,
                            $l,
                            $p,
                        ),
                    }),
                ),
                'results': Value_Results(
                    $.results,
                    abort,
                    {
                        'modules': $l['noncircular sibling modules'],
                    },
                    {
                        'imports': $p.imports,
                    },
                )
            }])
            // case 'type parameter': return _pt.option($, ($) => ['type parameter', _i_generic.get_ entry(
            //     _p_temp.dictionary_to_lookup(
            //         $p['type parameters'],
            //         p_.literal.nothing(),
            //     ),
            //     {
            //         'reference': $,
            //         'location 2 string': $p['location 2 string']
            //     }
            // )])
            default: return p_.exhaustive($[0])
        }
    })
}

export const Value_Results: declarations.Value_Results_ = ($, abort, $l, $p) => {
    return i_generic2.temp_optional_map(
        $,
        ($) => i_generic2.temp_resolve(
            $['l dictionary'],
            ($) => Value_Reference(
                $['l entry'],
                abort,
                {
                    'modules': $l.modules,
                },
                {
                    'imports': $p.imports,
                },
            )
        )
    )
}

export const Simple_Type: declarations.Simple_Type_ = ($, abort, $l, $p) => {
    return {
        'type': p_change_context($.type['l state'], ($): s_out.Simple_Type.type_ => {
            switch ($[0]) {
                case 'boolean': return p_.option($, ($) => ['boolean', null])
                case 'date': return p_.option($, ($) => ['date', null])
                case 'number': return p_.option($, ($) => ['number', {

                    'precision': p_change_context($.precision['l state'], ($): s_out.Simple_Type.type_.number_.precision => {
                        switch ($[0]) {
                            case 'exact': return p_.option($, ($) => {
                                return ['exact', {
                                    'type': p_change_context($.type['l state'], ($) => {
                                        switch ($[0]) {
                                            case 'integer': return p_.option($, ($) => ['integer', null])
                                            case 'natural': return p_.option($, ($) => ['natural', null])
                                            case 'positive natural': return p_.option($, ($) => ['positive natural', null])
                                            default: return p_.exhaustive($[0])
                                        }
                                    }),
                                    'number of fractional digits': p_change_context($['number of fractional digits'], ($) => {
                                        return $
                                    })
                                }]
                            })
                            case 'approximation': return p_.option($, ($) => ['approximation', {
                                'significant digits': $['significant digits']
                            }])
                            default: return p_.exhaustive($[0])
                        }
                    }),
                }])
                default: return p_.exhaustive($[0])
            }
        }),
    }
}

export const Option_Constraints: declarations.Option_Constraints_ = ($, abort, $l, $p) => {
    return i_generic2.temp_optional_map(
        $,
        ($) => i_generic2.temp_resolve(
            $['l dictionary'],
            ($) => Value_Reference(
                $['l entry'],
                abort,
                {
                    'modules': $l.modules,
                },
                {
                    'imports': $p.imports,
                },
            )
        )
    )
}

export const Value_Reference: declarations.Value_Reference_ = ($, abort, $l, $p) => {
    const p_module_location = Module_Reference(
        $['module'],
        abort,
        $l,
        $p,
    )
    return {
        'module': p_module_location,
        'path': Value_Path(
            $.path,
            abort,
            p_.literal.nothing(),
            {
                'module': p_module_location['resulting module']
            },
        ),
    }
}

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
                        p_sl.acyclic.from_resolved_dictionary(p_import['l entry'].schema.types),
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

export const Text_Type: declarations.Text_Type_ = ($, abort, $l, $p) => {
    return {
        'type': p_change_context($.type['l state'], ($): s_out.Text_Type.type_ => {
            switch ($[0]) {
                case 'single line': return p_.option($, ($) => ['single line', null])
                case 'multi line': return p_.option($, ($) => ['multi line', null])
                default: return p_.exhaustive($[0])
            }
        }),
        'link': p_change_context($.link['l state'], ($): s_out.Text_Type.link => {
            switch ($[0]) {
                case 'no': return p_.option($, ($) => ['no', null])
                case 'yes': return p_.option($, ($) => ['yes', {
                    'path prefix': $['path prefix'],
                    'path suffix': $['path suffix'],
                }])
                default: return p_.exhaustive($[0])
            }
        }),
    }
}
export const Value_Path: declarations.Value_Path_ = ($, abort, $l, $p) => {
    const p_tail_x: s_out.Value_Path.tail = i_generic2.temp_map_list_with_state(
        $.tail['l list'],
        $p.module['root value'],
        ($, current): s_out.Value_Path.tail.l_value.L => {
            const sg_loc = $['l location']
            return p_change_context($['l item']['l state'], ($): s_out.Value_Path.tail.l_value.L => {
                switch ($[0]) {
                    case 'dictionary': return p_.option($, ($): s_out.Value_Path.tail.l_value.L => {
                        const sc_definition: s_out.Value.dictionary = p_change_context(current, ($) => {
                            if ($[0] !== 'dictionary') {
                                return i_generic2.abort.state_constraint_found_expected("dictionary", $, sg_loc, abort)
                            }
                            return $[1]
                        })
                        return {
                            'l item': {
                                'l value': ['dictionary', null],
                                'l results': {
                                    'value': sc_definition.value,
                                }
                            },
                            'l results': {
                                'result': sc_definition.value
                            }
                        }
                    })
                    case 'group': return p_.option($, ($) => {
                        const sc_definition: s_out.Value.group = p_change_context(current, ($) => {
                            if ($[0] !== 'group') {
                                return i_generic2.abort.state_constraint_found_expected("group", $, sg_loc, abort)
                            }
                            return $[1]
                        })
                        const p_child = i_generic2.get_entry_acyclic(
                            p_sl.acyclic.from_resolved_dictionary(sc_definition),
                            $,
                            abort,
                        )
                        return {
                            'l item': {
                                'l value': ['group', p_child],
                                'l results': {
                                    'value': p_child['l entry'].value,
                                }
                            },
                            'l results': {
                                'result': p_child['l entry'].value
                            }
                        }
                    })
                    case 'list': return p_.option($, ($) => {
                        const sc_definition: s_out.Value.list = p_change_context(current, ($) => {
                            if ($[0] !== 'list') {
                                return i_generic2.abort.state_constraint_found_expected("list", $, sg_loc, abort)
                            }
                            return $[1]
                        })
                        return {
                            'l item': {
                                'l value': ['list', null],
                                'l results': {
                                    'value': sc_definition.value
                                }
                            },
                            'l results': {
                                'result': sc_definition.value
                            }
                        }
                    })
                    case 'optional': return p_.option($, ($): s_out.Value_Path.tail.l_value.L => {
                        const sc_definition: s_out.Value.optional = p_change_context(current, ($) => {
                            if ($[0] !== 'optional') {
                                return i_generic2.abort.state_constraint_found_expected("optional", $, sg_loc, abort)
                            }
                            return $[1]
                        })
                        return {
                            'l item': {
                                'l value': ['optional', null],
                                'l results': {
                                    'value': sc_definition
                                }
                            },
                            'l results': {
                                'result': sc_definition
                            }
                        }
                    })
                    case 'state': return p_.option($, ($): s_out.Value_Path.tail.l_value.L => {
                        const P_state: s_out.Value.state = p_change_context(current, ($) => {
                            if ($[0] !== 'state') {
                                return i_generic2.abort.state_constraint_found_expected("state", $, sg_loc, abort)
                            }
                            return $[1]
                        })
                        const p_child = i_generic2.get_entry_acyclic(
                            p_sl.acyclic.from_resolved_dictionary(P_state.options),
                            $,
                            abort,
                        )
                        return {
                            'l item': {
                                'l value': ['state', p_child],
                                'l results': {
                                    'value': p_child['l entry'].value
                                }
                            },
                            'l results': {
                                'result': p_child['l entry'].value
                            }
                        }
                    })
                    default: return p_.exhaustive($[0])
                }
            })
        },
        ($, current) => $['l results'].result,
        (list, result) => ({
            'l value': list,
            'l results': {
                'result': result,
            },
        })
    )
    return {
        'tail': p_tail_x,
        'resulting node': p_tail_x['l results'].result
    }
}
export const Globals: declarations.Globals_ = ($, abort, $l, $p) => {
    const p_simple_types: s_out.Globals.simple_types = i_generic2.temp_resolve(
        $['simple types']['l dictionary'],
        ($, id, $acyclic, $cyclic) => Simple_Type(
            $['l entry'],
            abort,
            p_.literal.nothing(),
            p_.literal.nothing(),
        ),
    )
    const p_text_types: s_out.Globals.text_types = i_generic2.temp_resolve(
        $['text types']['l dictionary'],
        ($, id, $acyclic, $cyclic) => Text_Type(
            $['l entry'],
            abort,
            p_.literal.nothing(),
            p_.literal.nothing(),
        ),
    )
    return {
        'simple types': p_simple_types,
        'text types': p_text_types,
        'complexity': $['complexity']['l state'],
    }
}