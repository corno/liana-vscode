
import * as p_i from 'pareto-core/__internal/Abort'

import * as i_generic from "liana-runtime/modules/unresolved_document_deserialization/schemas/unresolved_document_deserialization/schema"

import * as i_in from "astn-runtime/modules/deserialization/schemas/list_of_characters/schema"

import * as i_out from "../../../schemas/unresolved/schema.js"
import { normalize } from "../../../../../schemas/temp_module_specifier/refiners/schema_selection.js"

namespace declarations {
    export namespace Package_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Package

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Package_ = (
        context: Package_.I,
        abort: p_i.Abort<Package_.E>,
        parameters: {
            readonly 'tab size': Package_.P.tab_size
        },
    ) => Package_.O

    export namespace Schemas_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Schemas

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Schemas_ = (
        context: Schemas_.I,
        abort: p_i.Abort<Schemas_.E>,
        parameters: {
            readonly 'tab size': Schemas_.P.tab_size
        },
    ) => Schemas_.O

    export namespace Schema_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Schema

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Schema_ = (
        context: Schema_.I,
        abort: p_i.Abort<Schema_.E>,
        parameters: {
            readonly 'tab size': Schema_.P.tab_size
        },
    ) => Schema_.O

    export namespace Schema_Imports_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Schema_Imports

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Schema_Imports_ = (
        context: Schema_Imports_.I,
        abort: p_i.Abort<Schema_Imports_.E>,
        parameters: {
            readonly 'tab size': Schema_Imports_.P.tab_size
        },
    ) => Schema_Imports_.O

    export namespace Modules_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Modules

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Modules_ = (
        context: Modules_.I,
        abort: p_i.Abort<Modules_.E>,
        parameters: {
            readonly 'tab size': Modules_.P.tab_size
        },
    ) => Modules_.O

    export namespace Globals_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Globals

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Globals_ = (
        context: Globals_.I,
        abort: p_i.Abort<Globals_.E>,
        parameters: {
            readonly 'tab size': Globals_.P.tab_size
        },
    ) => Globals_.O

    export namespace Dictionary_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Dictionary

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Dictionary_ = (
        context: Dictionary_.I,
        abort: p_i.Abort<Dictionary_.E>,
        parameters: {
            readonly 'tab size': Dictionary_.P.tab_size
        },
    ) => Dictionary_.O

    export namespace Value_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Value

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Value_ = (
        context: Value_.I,
        abort: p_i.Abort<Value_.E>,
        parameters: {
            readonly 'tab size': Value_.P.tab_size
        },
    ) => Value_.O

    export namespace Resolver_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Resolver

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Resolver_ = (
        context: Resolver_.I,
        abort: p_i.Abort<Resolver_.E>,
        parameters: {
            readonly 'tab size': Resolver_.P.tab_size
        },
    ) => Resolver_.O

    export namespace Resolver_Imports_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Resolver_Imports

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Resolver_Imports_ = (
        context: Resolver_Imports_.I,
        abort: p_i.Abort<Resolver_Imports_.E>,
        parameters: {
            readonly 'tab size': Resolver_Imports_.P.tab_size
        },
    ) => Resolver_Imports_.O

    export namespace Resolver_Signatures_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Resolver_Signatures

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Resolver_Signatures_ = (
        context: Resolver_Signatures_.I,
        abort: p_i.Abort<Resolver_Signatures_.E>,
        parameters: {
            readonly 'tab size': Resolver_Signatures_.P.tab_size
        },
    ) => Resolver_Signatures_.O

    export namespace Resolver_Signature_Parameters_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Resolver_Signature_Parameters

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Resolver_Signature_Parameters_ = (
        context: Resolver_Signature_Parameters_.I,
        abort: p_i.Abort<Resolver_Signature_Parameters_.E>,
        parameters: {
            readonly 'tab size': Resolver_Signature_Parameters_.P.tab_size
        },
    ) => Resolver_Signature_Parameters_.O

    export namespace Resolver_Value_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Resolver_Value

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Resolver_Value_ = (
        context: Resolver_Value_.I,
        abort: p_i.Abort<Resolver_Value_.E>,
        parameters: {
            readonly 'tab size': Resolver_Value_.P.tab_size
        },
    ) => Resolver_Value_.O

    export namespace Module_Specification_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Module_Specification

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Module_Specification_ = (
        context: Module_Specification_.I,
        abort: p_i.Abort<Module_Specification_.E>,
        parameters: {
            readonly 'tab size': Module_Specification_.P.tab_size
        },
    ) => Module_Specification_.O

    export namespace Schema_Tree_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Schema_Tree

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Schema_Tree_ = (
        context: Schema_Tree_.I,
        abort: p_i.Abort<Schema_Tree_.E>,
        parameters: {
            readonly 'tab size': Schema_Tree_.P.tab_size
        },
    ) => Schema_Tree_.O

    export namespace Text_Type_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Text_Type

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Text_Type_ = (
        context: Text_Type_.I,
        abort: p_i.Abort<Text_Type_.E>,
        parameters: {
            readonly 'tab size': Text_Type_.P.tab_size
        },
    ) => Text_Type_.O

    export namespace Simple_Type_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Simple_Type

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Simple_Type_ = (
        context: Simple_Type_.I,
        abort: p_i.Abort<Simple_Type_.E>,
        parameters: {
            readonly 'tab size': Simple_Type_.P.tab_size
        },
    ) => Simple_Type_.O

    export namespace Module_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Module

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Module_ = (
        context: Module_.I,
        abort: p_i.Abort<Module_.E>,
        parameters: {
            readonly 'tab size': Module_.P.tab_size
        },
    ) => Module_.O

    export namespace Presence_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Presence

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Presence_ = (
        context: Presence_.I,
        abort: p_i.Abort<Presence_.E>,
        parameters: {
            readonly 'tab size': Presence_.P.tab_size
        },
    ) => Presence_.O

    export namespace Resolver_Modules_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Resolver_Modules

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Resolver_Modules_ = (
        context: Resolver_Modules_.I,
        abort: p_i.Abort<Resolver_Modules_.E>,
        parameters: {
            readonly 'tab size': Resolver_Modules_.P.tab_size
        },
    ) => Resolver_Modules_.O

    export namespace Resolver_Benchmark_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Resolver_Benchmark

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Resolver_Benchmark_ = (
        context: Resolver_Benchmark_.I,
        abort: p_i.Abort<Resolver_Benchmark_.E>,
        parameters: {
            readonly 'tab size': Resolver_Benchmark_.P.tab_size
        },
    ) => Resolver_Benchmark_.O

    export namespace Group_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Group

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Group_ = (
        context: Group_.I,
        abort: p_i.Abort<Group_.E>,
        parameters: {
            readonly 'tab size': Group_.P.tab_size
        },
    ) => Group_.O

    export namespace Value_Reference_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Value_Reference

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Value_Reference_ = (
        context: Value_Reference_.I,
        abort: p_i.Abort<Value_Reference_.E>,
        parameters: {
            readonly 'tab size': Value_Reference_.P.tab_size
        },
    ) => Value_Reference_.O

    export namespace Value_Path_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Value_Path

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Value_Path_ = (
        context: Value_Path_.I,
        abort: p_i.Abort<Value_Path_.E>,
        parameters: {
            readonly 'tab size': Value_Path_.P.tab_size
        },
    ) => Value_Path_.O

    export namespace Module_Reference_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Module_Reference

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Module_Reference_ = (
        context: Module_Reference_.I,
        abort: p_i.Abort<Module_Reference_.E>,
        parameters: {
            readonly 'tab size': Module_Reference_.P.tab_size
        },
    ) => Module_Reference_.O

    export namespace Resolver_Signature_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Resolver_Signature

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Resolver_Signature_ = (
        context: Resolver_Signature_.I,
        abort: p_i.Abort<Resolver_Signature_.E>,
        parameters: {
            readonly 'tab size': Resolver_Signature_.P.tab_size
        },
    ) => Resolver_Signature_.O

    export namespace Resolver_Relative_Value_Selection_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Resolver_Relative_Value_Selection

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Resolver_Relative_Value_Selection_ = (
        context: Resolver_Relative_Value_Selection_.I,
        abort: p_i.Abort<Resolver_Relative_Value_Selection_.E>,
        parameters: {
            readonly 'tab size': Resolver_Relative_Value_Selection_.P.tab_size
        },
    ) => Resolver_Relative_Value_Selection_.O

    export namespace Resolver_Lookup_Selection_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Resolver_Lookup_Selection

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Resolver_Lookup_Selection_ = (
        context: Resolver_Lookup_Selection_.I,
        abort: p_i.Abort<Resolver_Lookup_Selection_.E>,
        parameters: {
            readonly 'tab size': Resolver_Lookup_Selection_.P.tab_size
        },
    ) => Resolver_Lookup_Selection_.O

    export namespace Resolver_Constraint_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Resolver_Constraint

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Resolver_Constraint_ = (
        context: Resolver_Constraint_.I,
        abort: p_i.Abort<Resolver_Constraint_.E>,
        parameters: {
            readonly 'tab size': Resolver_Constraint_.P.tab_size
        },
    ) => Resolver_Constraint_.O

    export namespace Resolver_Option_Constraints_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Resolver_Option_Constraints

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Resolver_Option_Constraints_ = (
        context: Resolver_Option_Constraints_.I,
        abort: p_i.Abort<Resolver_Option_Constraints_.E>,
        parameters: {
            readonly 'tab size': Resolver_Option_Constraints_.P.tab_size
        },
    ) => Resolver_Option_Constraints_.O

    export namespace Resolver_Optional_Value_Constraints_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Resolver_Optional_Value_Constraints

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Resolver_Optional_Value_Constraints_ = (
        context: Resolver_Optional_Value_Constraints_.I,
        abort: p_i.Abort<Resolver_Optional_Value_Constraints_.E>,
        parameters: {
            readonly 'tab size': Resolver_Optional_Value_Constraints_.P.tab_size
        },
    ) => Resolver_Optional_Value_Constraints_.O

    export namespace Resolver_Value_Constraints_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Resolver_Value_Constraints

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Resolver_Value_Constraints_ = (
        context: Resolver_Value_Constraints_.I,
        abort: p_i.Abort<Resolver_Value_Constraints_.E>,
        parameters: {
            readonly 'tab size': Resolver_Value_Constraints_.P.tab_size
        },
    ) => Resolver_Value_Constraints_.O

    export namespace Resolver_Reference_To_Value_Constraint_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Resolver_Reference_To_Value_Constraint

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Resolver_Reference_To_Value_Constraint_ = (
        context: Resolver_Reference_To_Value_Constraint_.I,
        abort: p_i.Abort<Resolver_Reference_To_Value_Constraint_.E>,
        parameters: {
            readonly 'tab size': Resolver_Reference_To_Value_Constraint_.P.tab_size
        },
    ) => Resolver_Reference_To_Value_Constraint_.O

    export namespace Resolver_Value_Constraint_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Resolver_Value_Constraint

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Resolver_Value_Constraint_ = (
        context: Resolver_Value_Constraint_.I,
        abort: p_i.Abort<Resolver_Value_Constraint_.E>,
        parameters: {
            readonly 'tab size': Resolver_Value_Constraint_.P.tab_size
        },
    ) => Resolver_Value_Constraint_.O

    export namespace Resolver_Optional_Value_Initialization_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Resolver_Optional_Value_Initialization

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Resolver_Optional_Value_Initialization_ = (
        context: Resolver_Optional_Value_Initialization_.I,
        abort: p_i.Abort<Resolver_Optional_Value_Initialization_.E>,
        parameters: {
            readonly 'tab size': Resolver_Optional_Value_Initialization_.P.tab_size
        },
    ) => Resolver_Optional_Value_Initialization_.O

    export namespace Resolver_Value_Group_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Resolver_Value_Group

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Resolver_Value_Group_ = (
        context: Resolver_Value_Group_.I,
        abort: p_i.Abort<Resolver_Value_Group_.E>,
        parameters: {
            readonly 'tab size': Resolver_Value_Group_.P.tab_size
        },
    ) => Resolver_Value_Group_.O

    export namespace Resolver_Value_List_Result_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Resolver_Value_List_Result

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Resolver_Value_List_Result_ = (
        context: Resolver_Value_List_Result_.I,
        abort: p_i.Abort<Resolver_Value_List_Result_.E>,
        parameters: {
            readonly 'tab size': Resolver_Value_List_Result_.P.tab_size
        },
    ) => Resolver_Value_List_Result_.O

    export namespace Value_Results_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Value_Results

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Value_Results_ = (
        context: Value_Results_.I,
        abort: p_i.Abort<Value_Results_.E>,
        parameters: {
            readonly 'tab size': Value_Results_.P.tab_size
        },
    ) => Value_Results_.O

    export namespace Option_Constraints_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Option_Constraints

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Option_Constraints_ = (
        context: Option_Constraints_.I,
        abort: p_i.Abort<Option_Constraints_.E>,
        parameters: {
            readonly 'tab size': Option_Constraints_.P.tab_size
        },
    ) => Option_Constraints_.O

    export namespace Resolver_Guaranteed_Value_Selection_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Resolver_Guaranteed_Value_Selection

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Resolver_Guaranteed_Value_Selection_ = (
        context: Resolver_Guaranteed_Value_Selection_.I,
        abort: p_i.Abort<Resolver_Guaranteed_Value_Selection_.E>,
        parameters: {
            readonly 'tab size': Resolver_Guaranteed_Value_Selection_.P.tab_size
        },
    ) => Resolver_Guaranteed_Value_Selection_.O

    export namespace Resolver_Possible_Value_Selection_ {

        export type I = i_in.List_Of_Characters

        export type O = i_out.Resolver_Possible_Value_Selection

        export type E = i_generic.Error

        export namespace P {

            export type tab_size = number

        }

    }

    export type Resolver_Possible_Value_Selection_ = (
        context: Resolver_Possible_Value_Selection_.I,
        abort: p_i.Abort<Resolver_Possible_Value_Selection_.E>,
        parameters: {
            readonly 'tab size': Resolver_Possible_Value_Selection_.P.tab_size
        },
    ) => Resolver_Possible_Value_Selection_.O
}

import * as v_deserialize from "astn-runtime/modules/deserialization/schemas/parse_tree/refiners/list_of_characters"

import * as v_unmarshall from "./astn_parse_tree.js"

export const Package: declarations.Package_ = ($, abort, $p) => v_unmarshall.Package(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshalling', $],
    ),
)

export const Schemas: declarations.Schemas_ = ($, abort, $p) => v_unmarshall.Schemas(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshalling', $],
    ),
)

export const Schema: declarations.Schema_ = ($, abort, $p) => v_unmarshall.Schema(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshalling', $],
    ),
)

export const Schema_Imports: declarations.Schema_Imports_ = ($, abort, $p) => v_unmarshall.Schema_Imports(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshalling', $],
    ),
)

export const Modules: declarations.Modules_ = ($, abort, $p) => v_unmarshall.Modules(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshalling', $],
    ),
)

export const Globals: declarations.Globals_ = ($, abort, $p) => v_unmarshall.Globals(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshalling', $],
    ),
)

export const Dictionary: declarations.Dictionary_ = ($, abort, $p) => v_unmarshall.Dictionary(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshalling', $],
    ),
)

export const Value: declarations.Value_ = ($, abort, $p) => v_unmarshall.Value(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshalling', $],
    ),
)

export const Resolver: declarations.Resolver_ = ($, abort, $p) => v_unmarshall.Resolver(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshalling', $],
    ),
)

export const Resolver_Imports: declarations.Resolver_Imports_ = ($, abort, $p) => v_unmarshall.Resolver_Imports(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshalling', $],
    ),
)

export const Resolver_Signatures: declarations.Resolver_Signatures_ = ($, abort, $p) => v_unmarshall.Resolver_Signatures(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshalling', $],
    ),
)

export const Resolver_Signature_Parameters: declarations.Resolver_Signature_Parameters_ = ($, abort, $p) => v_unmarshall.Resolver_Signature_Parameters(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshalling', $],
    ),
)

export const Resolver_Value: declarations.Resolver_Value_ = ($, abort, $p) => v_unmarshall.Resolver_Value(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshalling', $],
    ),
)

export const Module_Specification: declarations.Module_Specification_ = ($, abort, $p) => v_unmarshall.Module_Specification(
    normalize(v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'], ($) => abort(['unmarshalling', $])),
    ($) => abort(
        ['unmarshalling', $],
    ),
)

export const Schema_Tree: declarations.Schema_Tree_ = ($, abort, $p) => v_unmarshall.Schema_Tree(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshalling', $],
    ),
)

export const Text_Type: declarations.Text_Type_ = ($, abort, $p) => v_unmarshall.Text_Type(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshalling', $],
    ),
)

export const Simple_Type: declarations.Simple_Type_ = ($, abort, $p) => v_unmarshall.Simple_Type(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshalling', $],
    ),
)

export const Module: declarations.Module_ = ($, abort, $p) => v_unmarshall.Module(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshalling', $],
    ),
)

export const Presence: declarations.Presence_ = ($, abort, $p) => v_unmarshall.Presence(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshalling', $],
    ),
)

export const Resolver_Modules: declarations.Resolver_Modules_ = ($, abort, $p) => v_unmarshall.Resolver_Modules(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshalling', $],
    ),
)

export const Resolver_Benchmark: declarations.Resolver_Benchmark_ = ($, abort, $p) => v_unmarshall.Resolver_Benchmark(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshalling', $],
    ),
)

export const Group: declarations.Group_ = ($, abort, $p) => v_unmarshall.Group(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshalling', $],
    ),
)

export const Value_Reference: declarations.Value_Reference_ = ($, abort, $p) => v_unmarshall.Value_Reference(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshalling', $],
    ),
)

export const Value_Path: declarations.Value_Path_ = ($, abort, $p) => v_unmarshall.Value_Path(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshalling', $],
    ),
)

export const Module_Reference: declarations.Module_Reference_ = ($, abort, $p) => v_unmarshall.Module_Reference(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshalling', $],
    ),
)

export const Resolver_Signature: declarations.Resolver_Signature_ = ($, abort, $p) => v_unmarshall.Resolver_Signature(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshalling', $],
    ),
)

export const Resolver_Relative_Value_Selection: declarations.Resolver_Relative_Value_Selection_ = ($, abort, $p) => v_unmarshall.Resolver_Relative_Value_Selection(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshalling', $],
    ),
)

export const Resolver_Lookup_Selection: declarations.Resolver_Lookup_Selection_ = ($, abort, $p) => v_unmarshall.Resolver_Lookup_Selection(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshalling', $],
    ),
)

export const Resolver_Constraint: declarations.Resolver_Constraint_ = ($, abort, $p) => v_unmarshall.Resolver_Constraint(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshalling', $],
    ),
)

export const Resolver_Option_Constraints: declarations.Resolver_Option_Constraints_ = ($, abort, $p) => v_unmarshall.Resolver_Option_Constraints(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshalling', $],
    ),
)

export const Resolver_Optional_Value_Constraints: declarations.Resolver_Optional_Value_Constraints_ = ($, abort, $p) => v_unmarshall.Resolver_Optional_Value_Constraints(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshalling', $],
    ),
)

export const Resolver_Value_Constraints: declarations.Resolver_Value_Constraints_ = ($, abort, $p) => v_unmarshall.Resolver_Value_Constraints(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshalling', $],
    ),
)

export const Resolver_Reference_To_Value_Constraint: declarations.Resolver_Reference_To_Value_Constraint_ = ($, abort, $p) => v_unmarshall.Resolver_Reference_To_Value_Constraint(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshalling', $],
    ),
)

export const Resolver_Value_Constraint: declarations.Resolver_Value_Constraint_ = ($, abort, $p) => v_unmarshall.Resolver_Value_Constraint(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshalling', $],
    ),
)

export const Resolver_Optional_Value_Initialization: declarations.Resolver_Optional_Value_Initialization_ = ($, abort, $p) => v_unmarshall.Resolver_Optional_Value_Initialization(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshalling', $],
    ),
)

export const Resolver_Value_Group: declarations.Resolver_Value_Group_ = ($, abort, $p) => v_unmarshall.Resolver_Value_Group(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshalling', $],
    ),
)

export const Resolver_Value_List_Result: declarations.Resolver_Value_List_Result_ = ($, abort, $p) => v_unmarshall.Resolver_Value_List_Result(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshalling', $],
    ),
)

export const Value_Results: declarations.Value_Results_ = ($, abort, $p) => v_unmarshall.Value_Results(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshalling', $],
    ),
)

export const Option_Constraints: declarations.Option_Constraints_ = ($, abort, $p) => v_unmarshall.Option_Constraints(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshalling', $],
    ),
)

export const Resolver_Guaranteed_Value_Selection: declarations.Resolver_Guaranteed_Value_Selection_ = ($, abort, $p) => v_unmarshall.Resolver_Guaranteed_Value_Selection(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshalling', $],
    ),
)

export const Resolver_Possible_Value_Selection: declarations.Resolver_Possible_Value_Selection_ = ($, abort, $p) => v_unmarshall.Resolver_Possible_Value_Selection(
    v_deserialize.Document(
        $,
        ($) => abort(
            ['parse tree deserialization', $],
        ),
        {
            'tab size': $p['tab size'],
        },
    )['content'],
    ($) => abort(
        ['unmarshalling', $],
    ),
)
