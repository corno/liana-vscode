import * as p_ from 'pareto-core/schema'

// types

namespace Regular_Expression_ {

    export type any_character = null

    export type literal = string

    export type character_set = string

    export namespace sequence {

        export type L = Regular_Expression_
    }

    export type sequence = p_.List<
        sequence.L
    >

    export namespace choice {

        export type L = Regular_Expression_
    }

    export type choice = p_.List<
        choice.L
    >

    export namespace repetition {

        export type expression = Regular_Expression_

        export namespace quantity {

            export type optional = null

            export type zero_or_more = null

            export type one_or_more = null
        }

        export type quantity =
            | readonly ['optional', quantity.optional]
            | readonly ['zero or more', quantity.zero_or_more]
            | readonly ['one or more', quantity.one_or_more]
    }

    export type repetition = {
        readonly 'expression': repetition.expression
        readonly 'quantity': repetition.quantity
    }
}

type Regular_Expression_ =
    | readonly ['any character', Regular_Expression_.any_character]
    | readonly ['literal', Regular_Expression_.literal]
    | readonly ['character set', Regular_Expression_.character_set]
    | readonly ['sequence', Regular_Expression_.sequence]
    | readonly ['choice', Regular_Expression_.choice]
    | readonly ['repetition', Regular_Expression_.repetition]

namespace Basic_Type_ {

    export namespace type_ {

        export type double_quoted = null

        export type undelimited = null
    }

    export type type_ =
        | readonly ['double quoted', type_.double_quoted]
        | readonly ['undelimited', type_.undelimited]

    export namespace regular_expression {

        export type O = Regular_Expression_
    }

    export type regular_expression = p_.Optional_Value<
        regular_expression.O
    >
}

type Basic_Type_ = {
    readonly 'type': Basic_Type_.type_
    readonly 'regular expression': Basic_Type_.regular_expression
}

namespace Basic_Types_ {

    export type D = Basic_Type_
}

type Basic_Types_ = p_.Dictionary<
    Basic_Types_.D
>

namespace Dictionary_ {

    export type value = Value_
}

type Dictionary_ = {
    readonly 'value': Dictionary_.value
}

namespace Group_ {

    export namespace D {

        export namespace description {

            export type O = string
        }

        export type description = p_.Optional_Value<
            description.O
        >

        export type value = Value_
    }

    export type D = {
        readonly 'description': D.description
        readonly 'value': D.value
    }
}

type Group_ = p_.Dictionary<
    Group_.D
>

namespace Namespaces_ {

    export type D = Structure_
}

type Namespaces_ = p_.Dictionary<
    Namespaces_.D
>

namespace Types_ {

    export type D = Type_
}

type Types_ = p_.Dictionary<
    Types_.D
>

namespace Value_ {

    export namespace component {

        export namespace type_ {

            export type internal = string

            export type internal_cyclic = string

            export namespace child {

                export type namespace = string

                export type type_ = string
            }

            export type child = {
                readonly 'namespace': child.namespace
                readonly 'type': child.type_
            }
        }

        export type type_ =
            | readonly ['internal', type_.internal]
            | readonly ['internal cyclic', type_.internal_cyclic]
            | readonly ['child', type_.child]
    }

    export type component = {
        readonly 'type': component.type_
    }

    export type dictionary = Dictionary_

    export type group = Group_

    export namespace list {

        export type value = Value_

        export type result = Value_Result_
    }

    export type list = {
        readonly 'value': list.value
        readonly 'result': list.result
    }

    export type nothing = null

    export type simple = string

    export namespace optional {

        export type constraints = Option_Constraints_

        export type value = Value_
    }

    export type optional = {
        readonly 'constraints': optional.constraints
        readonly 'value': optional.value
    }

    export namespace reference {

        export type referent = Value_Reference_

        export namespace type_ {

            export namespace selected {

                export type dictionary = null

                export namespace dependency {

                    export type acyclic = null

                    export type cyclic = null
                }

                export type dependency =
                    | readonly ['acyclic', dependency.acyclic]
                    | readonly ['cyclic', dependency.cyclic]

                export type constraints = Reference_Constraints_
            }

            export type selected = {
                readonly 'dependency': selected.dependency
                readonly 'constraints': selected.constraints
            }
        }

        export type type_ =
            | readonly ['selected', type_.selected]
    }

    export type reference = {
        readonly 'referent': reference.referent
        readonly 'type': reference.type_
    }

    export namespace state {

        export namespace options {

            export namespace D {

                export namespace description {

                    export type O = string
                }

                export type description = p_.Optional_Value<
                    description.O
                >

                export type constraints = Option_Constraints_

                export type value = Value_
            }

            export type D = {
                readonly 'description': D.description
                readonly 'constraints': D.constraints
                readonly 'value': D.value
            }
        }

        export type options = p_.Dictionary<
            options.D
        >

        export type result = Value_Result_
    }

    export type state = {
        readonly 'options': state.options
        readonly 'result': state.result
    }
}

type Value_ =
    | readonly ['component', Value_.component]
    | readonly ['dictionary', Value_.dictionary]
    | readonly ['group', Value_.group]
    | readonly ['list', Value_.list]
    | readonly ['nothing', Value_.nothing]
    | readonly ['simple', Value_.simple]
    | readonly ['optional', Value_.optional]
    | readonly ['reference', Value_.reference]
    | readonly ['state', Value_.state]

namespace Type_ {

    export type root_value = Value_
}

type Type_ = {
    readonly 'root value': Type_.root_value
}

namespace Type_Reference_ {

    export namespace location {

        export type internal = string

        export namespace child {

            export type namespace = string

            export type type_ = string
        }

        export type child = {
            readonly 'namespace': child.namespace
            readonly 'type': child.type_
        }

        export namespace sibling {

            export type namespace = string

            export type type_ = string
        }

        export type sibling = {
            readonly 'namespace': sibling.namespace
            readonly 'type': sibling.type_
        }
    }

    export type location =
        | readonly ['internal', location.internal]
        | readonly ['child', location.child]
        | readonly ['sibling', location.sibling]

    export type resulting_type = null
}

type Type_Reference_ = {
    readonly 'location': Type_Reference_.location
}

namespace Value_Path_ {

    export namespace tail {

        export namespace L {

            export type dictionary = null

            export type group = string

            export type list = null

            export type optional = null

            export type state = string
        }

        export type L =
            | readonly ['dictionary', L.dictionary]
            | readonly ['group', L.group]
            | readonly ['list', L.list]
            | readonly ['optional', L.optional]
            | readonly ['state', L.state]
    }

    export type tail = p_.List<
        tail.L
    >

    export type resulting_node = null
}

type Value_Path_ = {
    readonly 'tail': Value_Path_.tail
}

namespace Value_Reference_ {

    export type type_ = Type_Reference_

    export type path = Value_Path_
}

type Value_Reference_ = {
    readonly 'type': Value_Reference_.type_
    readonly 'path': Value_Reference_.path
}

namespace Option_Constraints_ {

    export namespace O {

        export type D = Value_Reference_
    }

    export type O = p_.Dictionary<
        O.D
    >
}

type Option_Constraints_ = p_.Optional_Value<
    Option_Constraints_.O
>

type Option_Constraint_Source_ = null

namespace Reference_Constraints_ {

    export namespace O {

        export type D = Value_Reference_
    }

    export type O = p_.Dictionary<
        O.D
    >
}

type Reference_Constraints_ = p_.Optional_Value<
    Reference_Constraints_.O
>

type Reference_Constraint_Source_ = null

namespace Structure_ {

    export type namespaces = Namespaces_

    export type basic_types = Basic_Types_

    export type types = Types_
}

type Structure_ = {
    readonly 'namespaces': Structure_.namespaces
    readonly 'basic types': Structure_.basic_types
    readonly 'types': Structure_.types
}

namespace Value_Result_ {

    export type O = Value_Reference_
}

type Value_Result_ = p_.Optional_Value<
    Value_Result_.O
>

namespace Presence_ {

    export type optional = null

    export type required = null
}

type Presence_ =
    | readonly ['optional', Presence_.optional]
    | readonly ['required', Presence_.required]

namespace Signatures_Type_Reference_ {

    export namespace location {

        export type internal = string

        export namespace child {

            export type namespace = string

            export type type_ = string
        }

        export type child = {
            readonly 'namespace': child.namespace
            readonly 'type': child.type_
        }

        export namespace sibling {

            export type namespace = string

            export type type_ = string
        }

        export type sibling = {
            readonly 'namespace': sibling.namespace
            readonly 'type': sibling.type_
        }
    }

    export type location =
        | readonly ['internal', location.internal]
        | readonly ['child', location.child]
        | readonly ['sibling', location.sibling]

    export type resulting_type = null
}

type Signatures_Type_Reference_ = {
    readonly 'location': Signatures_Type_Reference_.location
}

namespace Resolver_Signature_Parameters_ {

    export namespace types {

        export namespace D {

            export type type_ = Signatures_Type_Reference_

            export type presence = Presence_
        }

        export type D = {
            readonly 'type': D.type_
            readonly 'presence': D.presence
        }
    }

    export type types = p_.Dictionary<
        types.D
    >

    export namespace lookups {

        export namespace D {

            export type referent = Signatures_Type_Reference_

            export type dictionary = null

            export namespace type_ {

                export type cyclic = null

                export type acyclic = null
            }

            export type type_ =
                | readonly ['cyclic', type_.cyclic]
                | readonly ['acyclic', type_.acyclic]

            export type presence = Presence_
        }

        export type D = {
            readonly 'referent': D.referent
            readonly 'type': D.type_
            readonly 'presence': D.presence
        }
    }

    export type lookups = p_.Dictionary<
        lookups.D
    >
}

type Resolver_Signature_Parameters_ = {
    readonly 'types': Resolver_Signature_Parameters_.types
    readonly 'lookups': Resolver_Signature_Parameters_.lookups
}

namespace Resolver_Signatures_ {

    export type D = Resolver_Signature_
}

type Resolver_Signatures_ = p_.Dictionary<
    Resolver_Signatures_.D
>

namespace Resolver_Signature_ {

    export type type_ = null

    export namespace parameters {

        export type local = Resolver_Signature_Parameters_

        export type same_as = string
    }

    export type parameters =
        | readonly ['local', parameters.local]
        | readonly ['same as', parameters.same_as]

    export type resolved_parameters = null
}

type Resolver_Signature_ = {
    readonly 'parameters': Resolver_Signature_.parameters
}

namespace Resolver_Namespaces_ {

    export type D = Resolver_
}

type Resolver_Namespaces_ = p_.Dictionary<
    Resolver_Namespaces_.D
>

namespace Resolver_ {

    export type namespaces = Resolver_Namespaces_

    export type signatures = Resolver_Signatures_

    export type types = Resolver_Types_
}

type Resolver_ = {
    readonly 'namespaces': Resolver_.namespaces
    readonly 'signatures': Resolver_.signatures
    readonly 'types': Resolver_.types
}

namespace Resolver_Absence_Constraints_ {

    export namespace O {

        export type D = Resolver_Possible_Value_Selection_
    }

    export type O = p_.Dictionary<
        O.D
    >
}

type Resolver_Absence_Constraints_ = p_.Optional_Value<
    Resolver_Absence_Constraints_.O
>

namespace Resolver_Value_Group_ {

    export namespace D {

        export type definition = null

        export type resolver = Resolver_Value_
    }

    export type D = {
        readonly 'resolver': D.resolver
    }
}

type Resolver_Value_Group_ = p_.Dictionary<
    Resolver_Value_Group_.D
>

namespace Resolver_Value_Constraints_ {

    export type D = Resolver_Value_Constraint_
}

type Resolver_Value_Constraints_ = p_.Dictionary<
    Resolver_Value_Constraints_.D
>

namespace Resolver_Type_Reference_ {

    export namespace location {

        export type internal = string

        export namespace child {

            export type namespace = string

            export type type_ = string
        }

        export type child = {
            readonly 'namespace': child.namespace
            readonly 'type': child.type_
        }

        export namespace sibling {

            export type namespace = string

            export type type_ = string
        }

        export type sibling = {
            readonly 'namespace': sibling.namespace
            readonly 'type': sibling.type_
        }
    }

    export type location =
        | readonly ['internal', location.internal]
        | readonly ['child', location.child]
        | readonly ['sibling', location.sibling]

    export type resulting_type = null
}

type Resolver_Type_Reference_ = {
    readonly 'location': Resolver_Type_Reference_.location
}

namespace Resolver_Value_Path_ {

    export namespace tail {

        export namespace L {

            export type dictionary = null

            export type group = string

            export type list = null

            export type optional = null

            export type state = string
        }

        export type L =
            | readonly ['dictionary', L.dictionary]
            | readonly ['group', L.group]
            | readonly ['list', L.list]
            | readonly ['optional', L.optional]
            | readonly ['state', L.state]
    }

    export type tail = p_.List<
        tail.L
    >

    export type resulting_node = null
}

type Resolver_Value_Path_ = {
    readonly 'tail': Resolver_Value_Path_.tail
}

namespace Resolver_Value_Reference_ {

    export type type_ = Resolver_Type_Reference_

    export type path = Resolver_Value_Path_
}

type Resolver_Value_Reference_ = {
    readonly 'type': Resolver_Value_Reference_.type_
    readonly 'path': Resolver_Value_Reference_.path
}

namespace Resolver_Relative_Value_Selection_ {

    export namespace path {

        export namespace L {

            export type benchmark_link = Resolver_Value_Reference_

            export namespace component_constraint {

                export type name = string

                export type target = Resolver_Value_Reference_
            }

            export type component_constraint = {
                readonly 'name': component_constraint.name
                readonly 'target': component_constraint.target
            }

            export type component = null

            export type group = string

            export type list_result = Resolver_Type_Reference_

            export namespace option_constraint {

                export type option = string

                export type constraint = string
            }

            export type option_constraint = {
                readonly 'option': option_constraint.option
                readonly 'constraint': option_constraint.constraint
            }

            export type optional = null

            export namespace optional_value_constraint {

                export type source = Resolver_Option_Constraint_Source_

                export type constraint = string
            }

            export type optional_value_constraint = string

            export namespace reference {

                export type definition = null
            }

            export type reference = {
            }

            export namespace reference_constraint {

                export namespace selected {

                    export type source = Resolver_Reference_Constraint_Source_

                    export type constraint = string
                }

                export type selected = string
            }

            export type reference_constraint =
                | readonly ['selected', reference_constraint.selected]

            export type state_result = Resolver_Type_Reference_
        }

        export type L =
            | readonly ['benchmark link', L.benchmark_link]
            | readonly ['component constraint', L.component_constraint]
            | readonly ['component', L.component]
            | readonly ['group', L.group]
            | readonly ['list result', L.list_result]
            | readonly ['option constraint', L.option_constraint]
            | readonly ['optional', L.optional]
            | readonly ['optional value constraint', L.optional_value_constraint]
            | readonly ['reference', L.reference]
            | readonly ['reference constraint', L.reference_constraint]
            | readonly ['state result', L.state_result]
    }

    export type path = p_.List<
        path.L
    >

    export type resulting_node = null
}

type Resolver_Relative_Value_Selection_ = {
    readonly 'path': Resolver_Relative_Value_Selection_.path
}

namespace Resolver_Result_Selection_ {

    export type context = Resolver_Guaranteed_Value_Selection_

    export type value = Resolver_Relative_Value_Selection_
}

type Resolver_Result_Selection_ =
    | readonly ['context', Resolver_Result_Selection_.context]
    | readonly ['value', Resolver_Result_Selection_.value]

namespace Resolver_Value_List_Result_ {

    export type type_ = Resolver_Type_Reference_

    export type initial = Resolver_Guaranteed_Value_Selection_

    export type next = Resolver_Result_Selection_
}

type Resolver_Value_List_Result_ = {
    readonly 'type': Resolver_Value_List_Result_.type_
    readonly 'initial': Resolver_Value_List_Result_.initial
    readonly 'next': Resolver_Value_List_Result_.next
}

namespace Resolver_Reference_Constraints_ {

    export type D = Resolver_Value_Constraint_
}

type Resolver_Reference_Constraints_ = p_.Dictionary<
    Resolver_Reference_Constraints_.D
>

namespace Resolver_Value_ {

    export namespace component {

        export type definition = null

        export namespace location {

            export type internal = string

            export namespace child {

                export type namespace = string

                export type resolver = string
            }

            export type child = {
                readonly 'namespace': child.namespace
                readonly 'resolver': child.resolver
            }
        }

        export type location =
            | readonly ['internal', location.internal]
            | readonly ['child', location.child]

        export type signature = null

        export namespace arguments_ {

            export namespace O {

                export namespace types {

                    export namespace O {

                        export namespace D {

                            export type optional = Resolver_Optional_Value_Initialization_

                            export type required = Resolver_Guaranteed_Value_Selection_

                            export type parameter = string
                        }

                        export type D =
                            | readonly ['optional', D.optional]
                            | readonly ['required', D.required]
                            | readonly ['parameter', D.parameter]
                    }

                    export type O = p_.Dictionary<
                        O.D
                    >
                }

                export type types = p_.Optional_Value<
                    types.O
                >

                export namespace lookups {

                    export namespace O {

                        export namespace D {

                            export namespace acyclic {

                                export type not_set = null
                            }

                            export type acyclic =
                                | readonly ['not set', acyclic.not_set]

                            export namespace cyclic {

                                export type not_set = null
                            }

                            export type cyclic =
                                | readonly ['not set', cyclic.not_set]

                            export type selection = Resolver_Lookup_Selection_
                        }

                        export type D =
                            | readonly ['acyclic', D.acyclic]
                            | readonly ['cyclic', D.cyclic]
                            | readonly ['selection', D.selection]
                    }

                    export type O = p_.Dictionary<
                        O.D
                    >
                }

                export type lookups = p_.Optional_Value<
                    lookups.O
                >
            }

            export type O = {
                readonly 'types': O.types
                readonly 'lookups': O.lookups
            }
        }

        export type arguments_ = p_.Optional_Value<
            arguments_.O
        >

        export namespace constraints {

            export type O = Resolver_Value_Constraints_
        }

        export type constraints = p_.Optional_Value<
            constraints.O
        >
    }

    export type component = {
        readonly 'location': component.location
        readonly 'arguments': component.arguments_
        readonly 'constraints': component.constraints
    }

    export namespace dictionary {

        export type definition = null

        export type resolver = Resolver_Value_

        export namespace benchmark {

            export type O = Resolver_Benchmark_
        }

        export type benchmark = p_.Optional_Value<
            benchmark.O
        >
    }

    export type dictionary = {
        readonly 'resolver': dictionary.resolver
        readonly 'benchmark': dictionary.benchmark
    }

    export type group = Resolver_Value_Group_

    export namespace list {

        export type definition = null

        export type resolver = Resolver_Value_

        export namespace result {

            export type O = Resolver_Value_List_Result_
        }

        export type result = p_.Optional_Value<
            result.O
        >
    }

    export type list = {
        readonly 'resolver': list.resolver
        readonly 'result': list.result
    }

    export type nothing = null

    export type simple = null

    export namespace optional {

        export namespace constraints {

            export type O = Resolver_Option_Constraints_
        }

        export type constraints = p_.Optional_Value<
            constraints.O
        >

        export type resolver = Resolver_Value_

        export type not_set_constraints = Resolver_Absence_Constraints_
    }

    export type optional = {
        readonly 'constraints': optional.constraints
        readonly 'resolver': optional.resolver
        readonly 'not set constraints': optional.not_set_constraints
    }

    export namespace reference {

        export type definition = null

        export namespace type_ {

            export namespace selected {

                export type definition = null

                export type lookup = Resolver_Lookup_Selection_

                export namespace constraints {

                    export type O = Resolver_Reference_Constraints_
                }

                export type constraints = p_.Optional_Value<
                    constraints.O
                >
            }

            export type selected = {
                readonly 'lookup': selected.lookup
                readonly 'constraints': selected.constraints
            }
        }

        export type type_ =
            | readonly ['selected', type_.selected]
    }

    export type reference = {
        readonly 'type': reference.type_
    }

    export namespace state {

        export type definition = null

        export namespace result {

            export type O = Resolver_Type_Reference_
        }

        export type result = p_.Optional_Value<
            result.O
        >

        export namespace options {

            export namespace D {

                export namespace constraints {

                    export type O = Resolver_Option_Constraints_
                }

                export type constraints = p_.Optional_Value<
                    constraints.O
                >

                export type resolver = Resolver_Value_

                export namespace result {

                    export type O = Resolver_Result_Selection_
                }

                export type result = p_.Optional_Value<
                    result.O
                >
            }

            export type D = {
                readonly 'constraints': D.constraints
                readonly 'resolver': D.resolver
                readonly 'result': D.result
            }
        }

        export type options = p_.Dictionary<
            options.D
        >
    }

    export type state = {
        readonly 'result': state.result
        readonly 'options': state.options
    }
}

type Resolver_Value_ =
    | readonly ['component', Resolver_Value_.component]
    | readonly ['dictionary', Resolver_Value_.dictionary]
    | readonly ['group', Resolver_Value_.group]
    | readonly ['list', Resolver_Value_.list]
    | readonly ['nothing', Resolver_Value_.nothing]
    | readonly ['simple', Resolver_Value_.simple]
    | readonly ['optional', Resolver_Value_.optional]
    | readonly ['reference', Resolver_Value_.reference]
    | readonly ['state', Resolver_Value_.state]

namespace Resolver_Possible_Value_Selection_ {

    export namespace optional_value {

        export type selection = Resolver_Guaranteed_Value_Selection_

        export type optional = null
    }

    export type optional_value = {
        readonly 'selection': optional_value.selection
    }

    export type parameter = string

    export namespace result {

        export namespace state {

            export type property = string

            export type state = null

            export type result = Resolver_Type_Reference_
        }

        export type state = {
            readonly 'property': state.property
            readonly 'result': state.result
        }

        export namespace optional_value {

            export type property = string

            export type optional_value = null

            export type result = Resolver_Type_Reference_
        }

        export type optional_value = {
            readonly 'property': optional_value.property
            readonly 'result': optional_value.result
        }
    }

    export type result =
        | readonly ['state', result.state]
        | readonly ['optional value', result.optional_value]
}

type Resolver_Possible_Value_Selection_ =
    | readonly ['optional value', Resolver_Possible_Value_Selection_.optional_value]
    | readonly ['parameter', Resolver_Possible_Value_Selection_.parameter]
    | readonly ['result', Resolver_Possible_Value_Selection_.result]

namespace Resolver_Option_Constraints_ {

    export namespace D {

        export namespace state {

            export type selection = Resolver_Guaranteed_Value_Selection_

            export type selected_state = null

            export type option = string
        }

        export type state = {
            readonly 'selection': state.selection
            readonly 'option': state.option
        }

        export type assert_is_set = Resolver_Possible_Value_Selection_
    }

    export type D =
        | readonly ['state', D.state]
        | readonly ['assert is set', D.assert_is_set]
}

type Resolver_Option_Constraints_ = p_.Dictionary<
    Resolver_Option_Constraints_.D
>

namespace Resolver_Guaranteed_Value_Selection_ {

    export namespace start {

        export type sibling = string

        export type parent_sibling = string

        export type option_constraint = string

        export type list_cursor = null

        export type linked_entry = null

        export namespace constraint {

            export namespace component {

                export type property = string

                export type constraint = string
            }

            export type component = {
                readonly 'property': component.property
                readonly 'constraint': component.constraint
            }

            export namespace reference {

                export type property = string

                export type constraint = string
            }

            export type reference = {
                readonly 'property': reference.property
                readonly 'constraint': reference.constraint
            }
        }

        export type constraint =
            | readonly ['component', constraint.component]
            | readonly ['reference', constraint.reference]

        export type parameter = string

        export namespace result {

            export namespace list {

                export type property = string

                export type list_result = null
            }

            export type list = {
                readonly 'property': list.property
            }

            export namespace state {

                export type property = string

                export type state = null

                export type result = Resolver_Type_Reference_
            }

            export type state = {
                readonly 'property': state.property
                readonly 'result': state.result
            }

            export namespace optional_value {

                export type property = string

                export type optional_value = null

                export type result = Resolver_Type_Reference_
            }

            export type optional_value = {
                readonly 'property': optional_value.property
                readonly 'result': optional_value.result
            }
        }

        export type result =
            | readonly ['list', result.list]
            | readonly ['state', result.state]
            | readonly ['optional value', result.optional_value]
    }

    export type start =
        | readonly ['sibling', start.sibling]
        | readonly ['parent sibling', start.parent_sibling]
        | readonly ['option constraint', start.option_constraint]
        | readonly ['list cursor', start.list_cursor]
        | readonly ['linked entry', start.linked_entry]
        | readonly ['constraint', start.constraint]
        | readonly ['parameter', start.parameter]
        | readonly ['result', start.result]

    export type tail = Resolver_Relative_Value_Selection_

    export type resulting_node = null
}

type Resolver_Guaranteed_Value_Selection_ = {
    readonly 'start': Resolver_Guaranteed_Value_Selection_.start
    readonly 'tail': Resolver_Guaranteed_Value_Selection_.tail
}

namespace Resolver_Benchmark_ {

    export type selection = Resolver_Guaranteed_Value_Selection_

    export type resulting_dictionary = null

    export namespace coverage {

        export type dense = null

        export type sparse = null
    }

    export type coverage =
        | readonly ['dense', coverage.dense]
        | readonly ['sparse', coverage.sparse]
}

type Resolver_Benchmark_ = {
    readonly 'selection': Resolver_Benchmark_.selection
    readonly 'coverage': Resolver_Benchmark_.coverage
}

namespace Resolver_Constraint_ {

    export type selection = Resolver_Relative_Value_Selection_

    export namespace type_ {

        export namespace state {

            export type selected_state = null

            export type option = string
        }

        export type state = {
            readonly 'option': state.option
        }

        export namespace optional_value {

            export type selected_optional_value = null
        }

        export type optional_value = {
        }
    }

    export type type_ =
        | readonly ['state', type_.state]
        | readonly ['optional value', type_.optional_value]
}

type Resolver_Constraint_ = {
    readonly 'selection': Resolver_Constraint_.selection
    readonly 'type': Resolver_Constraint_.type_
}

namespace Resolver_Lookup_Selection_ {

    export namespace type_ {

        export namespace acyclic {

            export type siblings = null

            export namespace resolved_dictionary {

                export type selection = Resolver_Guaranteed_Value_Selection_

                export type selected_dictionary = null
            }

            export type resolved_dictionary = {
                readonly 'selection': resolved_dictionary.selection
            }
        }

        export type acyclic =
            | readonly ['siblings', acyclic.siblings]
            | readonly ['resolved dictionary', acyclic.resolved_dictionary]

        export namespace cyclic {

            export type siblings = null
        }

        export type cyclic =
            | readonly ['siblings', cyclic.siblings]

        export type parameter = string
    }

    export type type_ =
        | readonly ['acyclic', type_.acyclic]
        | readonly ['cyclic', type_.cyclic]
        | readonly ['parameter', type_.parameter]

    export type resulting_dictionary = null
}

type Resolver_Lookup_Selection_ = {
    readonly 'type': Resolver_Lookup_Selection_.type_
}

type Resolver_Option_Constraint_Source_ = null

namespace Resolver_Optional_Value_Constraints_ {

    export type O = Resolver_Value_Constraints_
}

type Resolver_Optional_Value_Constraints_ = p_.Optional_Value<
    Resolver_Optional_Value_Constraints_.O
>

namespace Resolver_Optional_Value_Initialization_ {

    export type not_set = null

    export type set_ = Resolver_Guaranteed_Value_Selection_

    export type selection = Resolver_Possible_Value_Selection_
}

type Resolver_Optional_Value_Initialization_ =
    | readonly ['not set', Resolver_Optional_Value_Initialization_.not_set]
    | readonly ['set', Resolver_Optional_Value_Initialization_.set_]
    | readonly ['selection', Resolver_Optional_Value_Initialization_.selection]

type Resolver_Reference_Constraint_Source_ = null

type Resolver_Reference_To_Value_Constraint_ = string

namespace Resolver_Types_ {

    export namespace D {

        export type signature = null

        export type root_value_resolver = Resolver_Value_
    }

    export type D = {
        readonly 'root value resolver': D.root_value_resolver
    }
}

type Resolver_Types_ = p_.Dictionary<
    Resolver_Types_.D
>

namespace Resolver_Value_Constraint_ {

    export namespace start {

        export type value = null

        export type sibling = Resolver_Reference_To_Value_Constraint_
    }

    export type start =
        | readonly ['value', start.value]
        | readonly ['sibling', start.sibling]

    export type constraint = Resolver_Constraint_
}

type Resolver_Value_Constraint_ = {
    readonly 'start': Resolver_Value_Constraint_.start
    readonly 'constraint': Resolver_Value_Constraint_.constraint
}

namespace Schema_ {

    export type structure = Structure_

    export type resolver = Resolver_
}

type Schema_ = {
    readonly 'structure': Schema_.structure
    readonly 'resolver': Schema_.resolver
}

namespace Type_Specification_ {

    export type file_extension = string

    export type schema = Schema_

    export type root_type = string
}

type Type_Specification_ = {
    readonly 'file extension': Type_Specification_.file_extension
    readonly 'schema': Type_Specification_.schema
    readonly 'root type': Type_Specification_.root_type
}

// exported root types
export {
    type Regular_Expression_ as Regular_Expression,
    type Basic_Type_ as Basic_Type,
    type Basic_Types_ as Basic_Types,
    type Dictionary_ as Dictionary,
    type Group_ as Group,
    type Namespaces_ as Namespaces,
    type Types_ as Types,
    type Value_ as Value,
    type Type_ as Type,
    type Type_Reference_ as Type_Reference,
    type Value_Path_ as Value_Path,
    type Value_Reference_ as Value_Reference,
    type Option_Constraints_ as Option_Constraints,
    type Option_Constraint_Source_ as Option_Constraint_Source,
    type Reference_Constraints_ as Reference_Constraints,
    type Reference_Constraint_Source_ as Reference_Constraint_Source,
    type Structure_ as Structure,
    type Value_Result_ as Value_Result,
    type Presence_ as Presence,
    type Signatures_Type_Reference_ as Signatures_Type_Reference,
    type Resolver_Signature_Parameters_ as Resolver_Signature_Parameters,
    type Resolver_Signatures_ as Resolver_Signatures,
    type Resolver_Signature_ as Resolver_Signature,
    type Resolver_Namespaces_ as Resolver_Namespaces,
    type Resolver_ as Resolver,
    type Resolver_Absence_Constraints_ as Resolver_Absence_Constraints,
    type Resolver_Value_Group_ as Resolver_Value_Group,
    type Resolver_Value_Constraints_ as Resolver_Value_Constraints,
    type Resolver_Type_Reference_ as Resolver_Type_Reference,
    type Resolver_Value_Path_ as Resolver_Value_Path,
    type Resolver_Value_Reference_ as Resolver_Value_Reference,
    type Resolver_Relative_Value_Selection_ as Resolver_Relative_Value_Selection,
    type Resolver_Result_Selection_ as Resolver_Result_Selection,
    type Resolver_Value_List_Result_ as Resolver_Value_List_Result,
    type Resolver_Reference_Constraints_ as Resolver_Reference_Constraints,
    type Resolver_Value_ as Resolver_Value,
    type Resolver_Possible_Value_Selection_ as Resolver_Possible_Value_Selection,
    type Resolver_Option_Constraints_ as Resolver_Option_Constraints,
    type Resolver_Guaranteed_Value_Selection_ as Resolver_Guaranteed_Value_Selection,
    type Resolver_Benchmark_ as Resolver_Benchmark,
    type Resolver_Constraint_ as Resolver_Constraint,
    type Resolver_Lookup_Selection_ as Resolver_Lookup_Selection,
    type Resolver_Option_Constraint_Source_ as Resolver_Option_Constraint_Source,
    type Resolver_Optional_Value_Constraints_ as Resolver_Optional_Value_Constraints,
    type Resolver_Optional_Value_Initialization_ as Resolver_Optional_Value_Initialization,
    type Resolver_Reference_Constraint_Source_ as Resolver_Reference_Constraint_Source,
    type Resolver_Reference_To_Value_Constraint_ as Resolver_Reference_To_Value_Constraint,
    type Resolver_Types_ as Resolver_Types,
    type Resolver_Value_Constraint_ as Resolver_Value_Constraint,
    type Schema_ as Schema,
    type Type_Specification_ as Type_Specification,
}
