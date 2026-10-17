
import * as p_ from 'pareto-core/transformer'

import type * as s_in from "../schema.js"
import type * as s_out from "pareto-fountain-pen/modules/paragraph/schemas/paragraph/schema"

namespace t_signatures {
    export type Package = p_.Transformer<
        s_in.Package,
        s_out.Paragraph
    >
    export type Schemas = p_.Transformer<
        s_in.Schemas,
        s_out.Paragraph
    >
    export type Schema = p_.Transformer<
        s_in.Schema,
        s_out.Paragraph
    >
    export type Schema_Imports = p_.Transformer<
        s_in.Schema_Imports,
        s_out.Paragraph
    >
    export type Modules = p_.Transformer<
        s_in.Modules,
        s_out.Paragraph
    >
    export type Globals = p_.Transformer<
        s_in.Globals,
        s_out.Paragraph
    >
    export type Dictionary = p_.Transformer<
        s_in.Dictionary,
        s_out.Paragraph
    >
    export type Value = p_.Transformer<
        s_in.Value,
        s_out.Paragraph
    >
    export type Resolver = p_.Transformer<
        s_in.Resolver,
        s_out.Paragraph
    >
    export type Resolver_Imports = p_.Transformer<
        s_in.Resolver_Imports,
        s_out.Paragraph
    >
    export type Resolver_Signatures = p_.Transformer<
        s_in.Resolver_Signatures,
        s_out.Paragraph
    >
    export type Resolver_Signature_Parameters = p_.Transformer<
        s_in.Resolver_Signature_Parameters,
        s_out.Paragraph
    >
    export type Resolver_Value = p_.Transformer<
        s_in.Resolver_Value,
        s_out.Paragraph
    >
    export type Module_Specification = p_.Transformer<
        s_in.Module_Specification,
        s_out.Paragraph
    >
    export type Schema_Tree = p_.Transformer<
        s_in.Schema_Tree,
        s_out.Paragraph
    >
    export type Text_Type = p_.Transformer<
        s_in.Text_Type,
        s_out.Paragraph
    >
    export type Simple_Type = p_.Transformer<
        s_in.Simple_Type,
        s_out.Paragraph
    >
    export type Module = p_.Transformer<
        s_in.Module,
        s_out.Paragraph
    >
    export type Presence = p_.Transformer<
        s_in.Presence,
        s_out.Paragraph
    >
    export type Resolver_Modules = p_.Transformer<
        s_in.Resolver_Modules,
        s_out.Paragraph
    >
    export type Resolver_Benchmark = p_.Transformer<
        s_in.Resolver_Benchmark,
        s_out.Paragraph
    >
    export type Group = p_.Transformer<
        s_in.Group,
        s_out.Paragraph
    >
    export type Value_Reference = p_.Transformer<
        s_in.Value_Reference,
        s_out.Paragraph
    >
    export type Value_Path = p_.Transformer<
        s_in.Value_Path,
        s_out.Paragraph
    >
    export type Module_Reference = p_.Transformer<
        s_in.Module_Reference,
        s_out.Paragraph
    >
    export type Resolver_Signature = p_.Transformer<
        s_in.Resolver_Signature,
        s_out.Paragraph
    >
    export type Resolver_Relative_Value_Selection = p_.Transformer<
        s_in.Resolver_Relative_Value_Selection,
        s_out.Paragraph
    >
    export type Resolver_Lookup_Selection = p_.Transformer<
        s_in.Resolver_Lookup_Selection,
        s_out.Paragraph
    >
    export type Resolver_Constraint = p_.Transformer<
        s_in.Resolver_Constraint,
        s_out.Paragraph
    >
    export type Resolver_Option_Constraints = p_.Transformer<
        s_in.Resolver_Option_Constraints,
        s_out.Paragraph
    >
    export type Resolver_Optional_Value_Constraints = p_.Transformer<
        s_in.Resolver_Optional_Value_Constraints,
        s_out.Paragraph
    >
    export type Resolver_Value_Constraints = p_.Transformer<
        s_in.Resolver_Value_Constraints,
        s_out.Paragraph
    >
    export type Resolver_Reference_To_Value_Constraint = p_.Transformer<
        s_in.Resolver_Reference_To_Value_Constraint,
        s_out.Paragraph
    >
    export type Resolver_Value_Constraint = p_.Transformer<
        s_in.Resolver_Value_Constraint,
        s_out.Paragraph
    >
    export type Resolver_Optional_Value_Initialization = p_.Transformer<
        s_in.Resolver_Optional_Value_Initialization,
        s_out.Paragraph
    >
    export type Resolver_Value_Group = p_.Transformer<
        s_in.Resolver_Value_Group,
        s_out.Paragraph
    >
    export type Resolver_Value_List_Result = p_.Transformer<
        s_in.Resolver_Value_List_Result,
        s_out.Paragraph
    >
    export type Value_Results = p_.Transformer<
        s_in.Value_Results,
        s_out.Paragraph
    >
    export type Option_Constraints = p_.Transformer<
        s_in.Option_Constraints,
        s_out.Paragraph
    >
    export type Resolver_Guaranteed_Value_Selection = p_.Transformer<
        s_in.Resolver_Guaranteed_Value_Selection,
        s_out.Paragraph
    >
    export type Resolver_Possible_Value_Selection = p_.Transformer<
        s_in.Resolver_Possible_Value_Selection,
        s_out.Paragraph
    >
}

import * as v_serialize from "astn-runtime/modules/serialization/schemas/sealed_target/transformers/paragraph"

import * as v_marshall from "./astn_sealed_target.js"

export const Package: t_signatures.Package = ($) => v_serialize.Document(
    v_marshall.Package(
        $,
    ),
)

export const Schemas: t_signatures.Schemas = ($) => v_serialize.Document(
    v_marshall.Schemas(
        $,
    ),
)

export const Schema: t_signatures.Schema = ($) => v_serialize.Document(
    v_marshall.Schema(
        $,
    ),
)

export const Schema_Imports: t_signatures.Schema_Imports = ($) => v_serialize.Document(
    v_marshall.Schema_Imports(
        $,
    ),
)

export const Modules: t_signatures.Modules = ($) => v_serialize.Document(
    v_marshall.Modules(
        $,
    ),
)

export const Globals: t_signatures.Globals = ($) => v_serialize.Document(
    v_marshall.Globals(
        $,
    ),
)

export const Dictionary: t_signatures.Dictionary = ($) => v_serialize.Document(
    v_marshall.Dictionary(
        $,
    ),
)

export const Value: t_signatures.Value = ($) => v_serialize.Document(
    v_marshall.Value(
        $,
    ),
)

export const Resolver: t_signatures.Resolver = ($) => v_serialize.Document(
    v_marshall.Resolver(
        $,
    ),
)

export const Resolver_Imports: t_signatures.Resolver_Imports = ($) => v_serialize.Document(
    v_marshall.Resolver_Imports(
        $,
    ),
)

export const Resolver_Signatures: t_signatures.Resolver_Signatures = ($) => v_serialize.Document(
    v_marshall.Resolver_Signatures(
        $,
    ),
)

export const Resolver_Signature_Parameters: t_signatures.Resolver_Signature_Parameters = ($) => v_serialize.Document(
    v_marshall.Resolver_Signature_Parameters(
        $,
    ),
)

export const Resolver_Value: t_signatures.Resolver_Value = ($) => v_serialize.Document(
    v_marshall.Resolver_Value(
        $,
    ),
)

export const Module_Specification: t_signatures.Module_Specification = ($) => v_serialize.Document(
    v_marshall.Module_Specification(
        $,
    ),
)

export const Schema_Tree: t_signatures.Schema_Tree = ($) => v_serialize.Document(
    v_marshall.Schema_Tree(
        $,
    ),
)

export const Text_Type: t_signatures.Text_Type = ($) => v_serialize.Document(
    v_marshall.Text_Type(
        $,
    ),
)

export const Simple_Type: t_signatures.Simple_Type = ($) => v_serialize.Document(
    v_marshall.Simple_Type(
        $,
    ),
)

export const Module: t_signatures.Module = ($) => v_serialize.Document(
    v_marshall.Module(
        $,
    ),
)

export const Presence: t_signatures.Presence = ($) => v_serialize.Document(
    v_marshall.Presence(
        $,
    ),
)

export const Resolver_Modules: t_signatures.Resolver_Modules = ($) => v_serialize.Document(
    v_marshall.Resolver_Modules(
        $,
    ),
)

export const Resolver_Benchmark: t_signatures.Resolver_Benchmark = ($) => v_serialize.Document(
    v_marshall.Resolver_Benchmark(
        $,
    ),
)

export const Group: t_signatures.Group = ($) => v_serialize.Document(
    v_marshall.Group(
        $,
    ),
)

export const Value_Reference: t_signatures.Value_Reference = ($) => v_serialize.Document(
    v_marshall.Value_Reference(
        $,
    ),
)

export const Value_Path: t_signatures.Value_Path = ($) => v_serialize.Document(
    v_marshall.Value_Path(
        $,
    ),
)

export const Module_Reference: t_signatures.Module_Reference = ($) => v_serialize.Document(
    v_marshall.Module_Reference(
        $,
    ),
)

export const Resolver_Signature: t_signatures.Resolver_Signature = ($) => v_serialize.Document(
    v_marshall.Resolver_Signature(
        $,
    ),
)

export const Resolver_Relative_Value_Selection: t_signatures.Resolver_Relative_Value_Selection = ($) => v_serialize.Document(
    v_marshall.Resolver_Relative_Value_Selection(
        $,
    ),
)

export const Resolver_Lookup_Selection: t_signatures.Resolver_Lookup_Selection = ($) => v_serialize.Document(
    v_marshall.Resolver_Lookup_Selection(
        $,
    ),
)

export const Resolver_Constraint: t_signatures.Resolver_Constraint = ($) => v_serialize.Document(
    v_marshall.Resolver_Constraint(
        $,
    ),
)

export const Resolver_Option_Constraints: t_signatures.Resolver_Option_Constraints = ($) => v_serialize.Document(
    v_marshall.Resolver_Option_Constraints(
        $,
    ),
)

export const Resolver_Optional_Value_Constraints: t_signatures.Resolver_Optional_Value_Constraints = ($) => v_serialize.Document(
    v_marshall.Resolver_Optional_Value_Constraints(
        $,
    ),
)

export const Resolver_Value_Constraints: t_signatures.Resolver_Value_Constraints = ($) => v_serialize.Document(
    v_marshall.Resolver_Value_Constraints(
        $,
    ),
)

export const Resolver_Reference_To_Value_Constraint: t_signatures.Resolver_Reference_To_Value_Constraint = ($) => v_serialize.Document(
    v_marshall.Resolver_Reference_To_Value_Constraint(
        $,
    ),
)

export const Resolver_Value_Constraint: t_signatures.Resolver_Value_Constraint = ($) => v_serialize.Document(
    v_marshall.Resolver_Value_Constraint(
        $,
    ),
)

export const Resolver_Optional_Value_Initialization: t_signatures.Resolver_Optional_Value_Initialization = ($) => v_serialize.Document(
    v_marshall.Resolver_Optional_Value_Initialization(
        $,
    ),
)

export const Resolver_Value_Group: t_signatures.Resolver_Value_Group = ($) => v_serialize.Document(
    v_marshall.Resolver_Value_Group(
        $,
    ),
)

export const Resolver_Value_List_Result: t_signatures.Resolver_Value_List_Result = ($) => v_serialize.Document(
    v_marshall.Resolver_Value_List_Result(
        $,
    ),
)

export const Value_Results: t_signatures.Value_Results = ($) => v_serialize.Document(
    v_marshall.Value_Results(
        $,
    ),
)

export const Option_Constraints: t_signatures.Option_Constraints = ($) => v_serialize.Document(
    v_marshall.Option_Constraints(
        $,
    ),
)

export const Resolver_Guaranteed_Value_Selection: t_signatures.Resolver_Guaranteed_Value_Selection = ($) => v_serialize.Document(
    v_marshall.Resolver_Guaranteed_Value_Selection(
        $,
    ),
)

export const Resolver_Possible_Value_Selection: t_signatures.Resolver_Possible_Value_Selection = ($) => v_serialize.Document(
    v_marshall.Resolver_Possible_Value_Selection(
        $,
    ),
)
