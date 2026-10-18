import * as p_ from '../../../../../temp/pareto_core_refiner.js'
import * as p_transformer from 'pareto-core/transformer'

// schemas
import type * as s_target from "../schema.js"
import type * as s_source from "../../unresolved/schema.js"
import type * as s_error from "../../../../../temp/liana_runtime_resolving_schema.js"
import type { s_parameters } from "./parameters.js"

export namespace declarations {
    export type Basic_Types = p_.Refiner<s_target.Basic_Types, s_error.Error, s_source.Basic_Types>

    
    
    
    
    
    export type Schema = p_.Refiner<s_target.Schema, s_error.Error, s_source.Schema>
    
    
    
    export type Types = p_.Refiner_With_Parameter<
        s_target.Types,
        s_error.Error,
        s_source.Types,
        s_parameters.Types
    >
    
    
    
    export type Dictionary = p_.Refiner_With_Lookups_And_Parameter<
        s_target.Dictionary,
        s_error.Error,
        s_source.Dictionary,
        {
            readonly 'noncircular sibling types': p_.lookup.Acyclic<
                s_target.Types.D
            >
            readonly 'possibly circular dependent sibling types': p_.lookup.Cyclic<
                s_target.Types.D
            >
        },
        s_parameters.Dictionary
    >
    
    export type Value = p_.Refiner_With_Lookups_And_Parameter<
        s_target.Value,
        s_error.Error,
        s_source.Value,
        {
            readonly 'noncircular sibling types': p_.lookup.Acyclic<
                s_target.Types.D
            >
            readonly 'possibly circular dependent sibling types': p_.lookup.Cyclic<
                s_target.Types.D
            >
        },
        s_parameters.Value
    >
    
    
    
    
    
    export type Resolver_Signatures = p_.Refiner_With_Parameter<
        s_target.Resolver_Signatures,
        s_error.Error,
        s_source.Resolver_Signatures,
        s_parameters.Resolver_Signatures
    >
    
    export type Resolver_Signature_Parameters = p_.Refiner_With_Parameter<
        s_target.Resolver_Signature_Parameters,
        s_error.Error,
        s_source.Resolver_Signature_Parameters,
        s_parameters.Resolver_Signature_Parameters
    >
    
    export type Resolver_Value = p_.Refiner_With_Lookups_And_Parameter<
        s_target.Resolver_Value,
        s_error.Error,
        s_source.Resolver_Value,
        {
            readonly 'sibling property resolvers': p_.lookup.Acyclic<
                s_target.Resolver_Value_Group.D
            >
            readonly 'parent sibling property resolvers': p_.lookup.Acyclic<
                s_target.Resolver_Value_Group.D
            >
        },
        s_parameters.Resolver_Value
    >
    
    export type Type_Specification = p_.Refiner<
        s_target.Type_Specification,
        s_error.Error,
        s_source.Type_Specification
    >
    
    
    
    
    
    export type Basic_Type = p_.Refiner<
        s_target.Basic_Type,
        s_error.Error,
        s_source.Basic_Type
    >
    
    export type Type = p_.Refiner_With_Lookups_And_Parameter<
        s_target.Type,
        s_error.Error,
        s_source.Type,
        {
            readonly 'noncircular sibling types': p_.lookup.Acyclic<
                s_target.Types.D
            >
            readonly 'possibly circular dependent sibling types': p_.lookup.Cyclic<
                s_target.Types.D
            >
        },
        s_parameters.Type
    >
    
    export type Presence = p_.Refiner<
        s_target.Presence,
        s_error.Error,
        s_source.Presence
    >
    
    export type Resolver_Types = p_.Refiner_With_Parameter<
        s_target.Resolver_Types,
        s_error.Error,
        s_source.Resolver_Types,
        s_parameters.Resolver_Types
    >
    
    export type Resolver_Benchmark = p_.Refiner_With_Lookups_And_Parameter<
        s_target.Resolver_Benchmark,
        s_error.Error,
        s_source.Resolver_Benchmark,
        {
            readonly 'sibling property resolvers': p_.lookup.Acyclic<
                s_target.Resolver_Value_Group.D
            >
            readonly 'parent sibling property resolvers': p_.lookup.Acyclic<
                s_target.Resolver_Value_Group.D
            >
        },
        s_parameters.Resolver_Benchmark
    >
    
    export type Group = p_.Refiner_With_Lookups_And_Parameter<
        s_target.Group,
        s_error.Error,
        s_source.Group,
        {
            readonly 'noncircular sibling types': p_.lookup.Acyclic<
                s_target.Types.D
            >
            readonly 'possibly circular dependent sibling types': p_.lookup.Cyclic<
                s_target.Types.D
            >
        },
        s_parameters.Group
    >
    
    export type Value_Reference = p_.Refiner_With_Lookups_And_Parameter<
        s_target.Value_Reference,
        s_error.Error,
        s_source.Value_Reference,
        {
            readonly 'types': p_.lookup.Acyclic<
                s_target.Types.D
            >
        },
        s_parameters.Value_Reference
    >
    
    export type Value_Path = p_.Refiner_With_Parameter<
        s_target.Value_Path,
        s_error.Error,
        s_source.Value_Path,
        s_parameters.Value_Path
    >
    
    export type Type_Reference = p_.Refiner_With_Lookups_And_Parameter<
        s_target.Type_Reference,
        s_error.Error,
        s_source.Type_Reference,
        {
            readonly 'types': p_.lookup.Acyclic<
                s_target.Types.D
            >
        },
        s_parameters.Type_Reference
    >
    
    export type Resolver_Signature = p_.Refiner_With_Lookups_And_Parameter<
        s_target.Resolver_Signature,
        s_error.Error,
        s_source.Resolver_Signature,
        {
            readonly 'sibling signatures': p_.lookup.Acyclic<
                s_target.Resolver_Signatures.D
            >
        },
        s_parameters.Resolver_Signature
    >
    
    export type Resolver_Relative_Value_Selection = p_.Refiner_With_Parameter<
        s_target.Resolver_Relative_Value_Selection,
        s_error.Error,
        s_source.Resolver_Relative_Value_Selection,
        s_parameters.Resolver_Relative_Value_Selection
    >
    
    export type Resolver_Lookup_Selection = p_.Refiner_With_Lookups_And_Parameter<
        s_target.Resolver_Lookup_Selection,
        s_error.Error,
        s_source.Resolver_Lookup_Selection,
        {
            readonly 'sibling property resolvers': p_.lookup.Acyclic<
                s_target.Resolver_Value_Group.D
            >
            readonly 'parent sibling property resolvers': p_.lookup.Acyclic<
                s_target.Resolver_Value_Group.D
            >
        },
        s_parameters.Resolver_Lookup_Selection
    >
    
    export type Resolver_Constraint = p_.Refiner_With_Parameter<
        s_target.Resolver_Constraint,
        s_error.Error,
        s_source.Resolver_Constraint,
        s_parameters.Resolver_Constraint
    >
    
    export type Resolver_Option_Constraints = p_.Refiner_With_Lookups_And_Parameter<
        s_target.Resolver_Option_Constraints,
        s_error.Error,
        s_source.Resolver_Option_Constraints,
        {
            readonly 'sibling property resolvers': p_.lookup.Acyclic<
                s_target.Resolver_Value_Group.D
            >
            readonly 'parent sibling property resolvers': p_.lookup.Acyclic<
                s_target.Resolver_Value_Group.D
            >
        },
        s_parameters.Resolver_Option_Constraints
    >
    
    export type Resolver_Optional_Value_Constraints = p_.Refiner_With_Parameter<
        s_target.Resolver_Optional_Value_Constraints,
        s_error.Error,
        s_source.Resolver_Optional_Value_Constraints,
        s_parameters.Resolver_Optional_Value_Constraints
    >
    
    export type Resolver_Value_Constraints = p_.Refiner_With_Parameter<
        s_target.Resolver_Value_Constraints,
        s_error.Error,
        s_source.Resolver_Value_Constraints,
        s_parameters.Resolver_Value_Constraints
    >
    
    export type Resolver_Reference_To_Value_Constraint = p_.Refiner_With_Error_And_Lookups<
        s_target.Resolver_Reference_To_Value_Constraint,
        s_error.Error,
        s_source.Resolver_Reference_To_Value_Constraint,
        {
            readonly 'property constraints': p_.lookup.Acyclic<
                s_target.Resolver_Value_Constraints.D
            >
        }
    >
    
    export type Resolver_Value_Constraint = p_.Refiner_With_Lookups_And_Parameter<
        s_target.Resolver_Value_Constraint,
        s_error.Error,
        s_source.Resolver_Value_Constraint,
        {
            readonly 'property constraints': p_.lookup.Acyclic<
                s_target.Resolver_Value_Constraints.D
            >
        },
        s_parameters.Resolver_Value_Constraint
    >
    
    export type Resolver_Optional_Value_Initialization = p_.Refiner_With_Lookups_And_Parameter<
        s_target.Resolver_Optional_Value_Initialization,
        s_error.Error,
        s_source.Resolver_Optional_Value_Initialization,
        {
            readonly 'sibling property resolvers': p_.lookup.Acyclic<
                s_target.Resolver_Value_Group.D
            >
            readonly 'parent sibling property resolvers': p_.lookup.Acyclic<
                s_target.Resolver_Value_Group.D
            >
        },
        s_parameters.Resolver_Optional_Value_Initialization
    >
    
    export type Resolver_Value_Group = p_.Refiner_With_Lookups_And_Parameter<
        s_target.Resolver_Value_Group,
        s_error.Error,
        s_source.Resolver_Value_Group,
        {
            readonly 'sibling property resolvers': p_.lookup.Acyclic<
                s_target.Resolver_Value_Group.D
            >
            readonly 'parent sibling property resolvers': p_.lookup.Acyclic<
                s_target.Resolver_Value_Group.D
            >
        },
        s_parameters.Resolver_Value_Group
    >
    
    export type Resolver_Value_List_Result = p_.Refiner_With_Lookups_And_Parameter<
        s_target.Resolver_Value_List_Result,
        s_error.Error,
        s_source.Resolver_Value_List_Result,
        {
            readonly 'sibling property resolvers': p_.lookup.Acyclic<s_target.Resolver_Value_Group.D>
            readonly 'parent sibling property resolvers': p_.lookup.Acyclic<s_target.Resolver_Value_Group.D>
        },
        s_parameters.Resolver_Value
    >
    
    export type Value_Results = p_.Refiner_With_Lookups_And_Parameter<
        s_target.Value_Results,
        s_error.Error,
        s_source.Value_Results,
        {
            readonly 'types': p_.lookup.Acyclic<
                s_target.Types.D
            >
        },
        s_parameters.Value_Results
    >
    
    export type Option_Constraints = p_.Refiner_With_Lookups_And_Parameter<
        s_target.Option_Constraints,
        s_error.Error,
        s_source.Option_Constraints,
        {
            readonly 'types': p_.lookup.Acyclic<
                s_target.Types.D
            >
        },
        s_parameters.Option_Constraints
    >
    
    export type Resolver_Guaranteed_Value_Selection = p_.Refiner_With_Lookups_And_Parameter<
        s_target.Resolver_Guaranteed_Value_Selection,
        s_error.Error,
        s_source.Resolver_Guaranteed_Value_Selection,
        {
            readonly 'sibling property resolvers': p_.lookup.Acyclic<
                s_target.Resolver_Value_Group.D
            >
            readonly 'parent sibling property resolvers': p_.lookup.Acyclic<
                s_target.Resolver_Value_Group.D
            >
        },
        s_parameters.Resolver_Guaranteed_Value_Selection
    >
    
    export type Resolver_Possible_Value_Selection = p_.Refiner_With_Lookups_And_Parameter<
        s_target.Resolver_Possible_Value_Selection,
        s_error.Error,
        s_source.Resolver_Possible_Value_Selection,
        {
            readonly 'sibling property resolvers': p_.lookup.Acyclic<
                s_target.Resolver_Value_Group.D
            >
            readonly 'parent sibling property resolvers': p_.lookup.Acyclic<
                s_target.Resolver_Value_Group.D
            >
        },
        s_parameters.Resolver_Possible_Value_Selection
    >
}

// implementations





export const Schema: declarations.Schema = ($, abort) => {
    const basic_types = Basic_Types($['basic types'], abort);
    const types = Types($['types'], abort, { 'basic types': p_.literal.set(basic_types) });
    const signatures = Resolver_Signatures($['signatures'], abort, { types });
    return {
        'basic types': basic_types,
        types,
        signatures,
        resolvers: Resolver_Types($.resolvers, abort, { types, signatures }),
    };
}



export const Types: declarations.Types = ($, abort, $p) => p_.from.dictionary(
    $,
).resolve(
    ($, id, $acyclic, $cyclic) => Type(
        $,
        abort,
        {
            'noncircular sibling types': $acyclic,
            'possibly circular dependent sibling types': $cyclic,
        },
        $p,
    ),
)



export const Dictionary: declarations.Dictionary = ($, abort, $l, $p) => ({
    'value': p_.change_context(
        $['value'],
        ($) => Value(
            $,
            abort,
            $l,
            $p,
        ),
    ),
})

export const Value: declarations.Value = ($, abort, $l, $p) => p_.change_context($, ($) => p_.from.state($).decide(($): s_target.Value => {
    switch ($[0]) {
        case 'component': return p_.option($, ($): s_target.Value => p_.change_context(
            $,
            ($) => ['component', {
                'type': p_.change_context(
                    $['type'],
                    ($) => p_.change_context($, ($) => p_.from.state($).decide(($): s_target.Value.component.type_ => {
                        switch ($[0]) {
                            
                            case 'internal': return p_.option($, ($): s_target.Value.component.type_ => p_.change_context(
                                $,
                                ($) => ['internal', {
                                    'l id': $,
                                    'l entry': ((v_lookup_context_6) => $l['possibly circular dependent sibling types'].get_entry(
                                        $,
                                        {
                                            no_such_entry: ($) => abort(
                                                {
                                                    'type': ['lookup', ['no such entry', v_lookup_context_6]],
                                                },
                                            ),
                                            no_context_lookup: ($) => abort(
                                                {
                                                    'type': ['lookup', ['no context lookup', null]],
                                                },
                                            ),
                                            accessing_cyclic_sibling_before_it_is_resolved: ($) => abort(
                                                {
                                                    'type': ['lookup', ['cycle detected', null]],
                                                },
                                            ),
                                        },
                                    ))(
                                        $,
                                    ),
                                }],
                            ))
                            case 'internal acyclic': return p_.option($, ($): s_target.Value.component.type_ => p_.change_context(
                                $,
                                ($) => ['internal acyclic', {
                                    'l id': $,
                                    'l entry': ((v_lookup_context_7) => $l['noncircular sibling types'].get_entry(
                                        $,
                                        {
                                            no_such_entry: ($) => abort(
                                                {
                                                    'type': ['lookup', ['no such entry', v_lookup_context_7]],
                                                },
                                            ),
                                            no_context_lookup: ($) => abort(
                                                {
                                                    'type': ['lookup', ['no context lookup', null]],
                                                },
                                            ),
                                            cycle_detected: ($) => abort(
                                                {
                                                    'type': ['lookup', ['cycle detected', null]],
                                                },
                                            ),
                                        },
                                    ))(
                                        $,
                                    ),
                                }],
                            ))
                            default: return p_.exhaustive($[0])
                        }
                    })),
                ),
                'results': p_.change_context(
                    $['results'],
                    ($) => Value_Results(
                        $,
                        abort,
                        {
                            'types': $l['noncircular sibling types'],
                        },
                        {
                            
                        },
                    ),
                ),
            }],
        ))
        case 'dictionary': return p_.option($, ($): s_target.Value => p_.change_context(
            $,
            ($) => ['dictionary', Dictionary(
                $,
                abort,
                $l,
                $p,
            )],
        ))
        case 'group': return p_.option($, ($): s_target.Value => p_.change_context(
            $,
            ($) => ['group', Group(
                $,
                abort,
                $l,
                $p,
            )],
        ))
        case 'list': return p_.option($, ($): s_target.Value => p_.change_context(
            $,
            ($) => ['list', {
                'value': p_.change_context(
                    $['value'],
                    ($) => Value(
                        $,
                        abort,
                        $l,
                        $p,
                    ),
                ),
                'results': p_.change_context(
                    $['results'],
                    ($) => Value_Results(
                        $,
                        abort,
                        {
                            'types': $l['noncircular sibling types'],
                        },
                        {
                            
                        },
                    ),
                ),
            }],
        ))
        case 'nothing': return p_.option($, ($): s_target.Value => p_.change_context(
            $,
            ($) => ['nothing', null],
        ))
        case 'simple': return p_.option($, ($): s_target.Value => ['simple', {
                'l id': $,
                'l entry': p_.from.optional($p['basic types']).decide(
                    (basic_types) => p_.from.dictionary(basic_types).get_entry($, {
                        no_such_entry: () => abort({ type: ['lookup', ['no such entry', $]] }),
                    }),
                    () => abort({ type: ['constraint', ['optional value is not set', null]] }),
                ),
            }])
        case 'optional': return p_.option($, ($): s_target.Value => p_.change_context(
            $,
            ($) => ['optional', Value(
                $,
                abort,
                $l,
                $p,
            )],
        ))
        case 'reference': return p_.option($, ($): s_target.Value => p_.change_context(
            $,
            ($) => ((v_referent) => ['reference', {
                'referent': p_.change_context(
                    $['referent'],
                    ($) => v_referent,
                ),
                'type': p_.change_context(
                    $['type'],
                    ($) => p_.change_context($, ($) => p_.from.state($).decide(($): s_target.Value.reference.type_ => {
                        switch ($[0]) {
                            case 'derived': return p_.option($, ($): s_target.Value.reference.type_ => p_.change_context(
                                $,
                                ($) => ['derived', null],
                            ))
                            case 'selected': return p_.option($, ($): s_target.Value.reference.type_ => p_.change_context(
                                $,
                                ($) => ['selected', {
                                    'dictionary': p_.change_context(
                                        $['dictionary'],
                                        ($) => p_.change_context(v_referent['path']['resulting node'], ($) => p_.from.state(
                                            $,
                                        ).decide(
                                            ($) => {
                                                switch ($[0]) {
                                                    case 'dictionary': return p_.option(
                                                        $,
                                                        ($) => $,
                                                    )
                                                    default: return abort(
                                                        {
                                                            'type': ['constraint', ['state', {
                                                                'expected': "dictionary",
                                                                'found': $[0],
                                                            }]],
                                                        },
                                                    )
                                                }
                                            },
                                        )),
                                    ),
                                    'dependency': p_.change_context(
                                        $['dependency'],
                                        ($) => p_.change_context($, ($) => p_.from.state($).decide(($): s_target.Value.reference.type_.selected.dependency => {
                                            switch ($[0]) {
                                                case 'acyclic': return p_.option($, ($): s_target.Value.reference.type_.selected.dependency => p_.change_context(
                                                    $,
                                                    ($) => ['acyclic', null],
                                                ))
                                                case 'cyclic': return p_.option($, ($): s_target.Value.reference.type_.selected.dependency => p_.change_context(
                                                    $,
                                                    ($) => ['cyclic', null],
                                                ))
                                                
                                                default: return p_.exhaustive($[0])
                                            }
                                        })),
                                    ),
                                    'results': p_.change_context(
                                        $['results'],
                                        ($) => Value_Results(
                                            $,
                                            abort,
                                            {
                                                'types': $l['noncircular sibling types'],
                                            },
                                            {
                                                
                                            },
                                        ),
                                    ),
                                }],
                            ))
                            default: return p_.exhaustive($[0])
                        }
                    })),
                ),
            }])(
                Value_Reference(
                    $['referent'],
                    abort,
                    {
                        'types': $l['noncircular sibling types'],
                    },
                    {
                        
                    },
                ),
            ),
        ))
        case 'state': return p_.option($, ($): s_target.Value => p_.change_context(
            $,
            ($) => ['state', {
                'options': p_.change_context(
                    $['options'],
                    ($) => p_.from.dictionary($).map(
                        ($, id) => ({
                            'constraints': p_.change_context(
                                $['constraints'],
                                ($) => Option_Constraints(
                                    $,
                                    abort,
                                    {
                                        'types': $l['noncircular sibling types'],
                                    },
                                    {
                                        
                                    },
                                ),
                            ),
                            'description': p_.change_context(
                                $['description'],
                                ($) => p_.from.optional($).map(($) => $),
                            ),
                            'value': p_.change_context(
                                $['value'],
                                ($) => Value(
                                    $,
                                    abort,
                                    $l,
                                    $p,
                                ),
                            ),
                        }),
                    ),
                ),
                'results': p_.change_context(
                    $['results'],
                    ($) => Value_Results(
                        $,
                        abort,
                        {
                            'types': $l['noncircular sibling types'],
                        },
                        {
                            
                        },
                    ),
                ),
            }],
        ))
        
        default: return p_.exhaustive($[0])
    }
}))





export const Resolver_Signatures: declarations.Resolver_Signatures = ($, abort, $p) => ((v_required) => p_.from.dictionary(
    $,
).resolve(
    ($, id, $acyclic, $cyclic) => Resolver_Signature(
        $,
        abort,
        {
            'sibling signatures': $acyclic,
        },
        {
            'types': $p['types'],
            'type': ((v_lookup_context_4) => p_.from.dictionary(
                $p['types'],
            ).get_entry(
                id,
                {
                    no_such_entry: ($) => abort(
                        {
                            'type': ['lookup', ['no such entry', id]],
                        },
                    ),
                },
            ))(
                $,
            ),
        },
    ),
))(
    p_.from.dictionary($p['types']).map(
        (entry, id) => p_.from.dictionary($).get_entry(id, {
            no_such_entry: () => abort({
                'type': ['missing required entries', p_.literal.dictionary({ [id]: null })],
            }),
        }),
    ),
)

export const Resolver_Signature_Parameters: declarations.Resolver_Signature_Parameters = ($, abort, $p) => ({
    'types': p_.change_context(
        $['types'],
        ($) => p_.from.dictionary($).map(
            ($, id) => ({
                'type': p_.change_context(
                    $['type'],
                    ($) => Type_Reference(
                        $,
                        abort,
                        {
                            'types': p_.select_lookup.acyclic.from_resolved_dictionary(
                                $p['types'],
                            ),
                        },
                        {
                            
                        },
                    ),
                ),
                'presence': p_.change_context(
                    $['presence'],
                    ($) => Presence(
                        $,
                        abort,
                    ),
                ),
            }),
        ),
    ),
    'lookups': p_.change_context(
        $['lookups'],
        ($) => p_.from.dictionary($).map(
            ($, id) => ((v_referent) => ({
                'referent': p_.change_context(
                    $['referent'],
                    ($) => v_referent,
                ),
                'dictionary': p_.change_context(
                    $['dictionary'],
                    ($) => p_.change_context(v_referent['resulting type']['root value'], ($) => p_.from.state(
                        $,
                    ).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'dictionary': return p_.option(
                                    $,
                                    ($) => $,
                                )
                                default: return abort(
                                    {
                                        'type': ['constraint', ['state', {
                                            'expected': "dictionary",
                                            'found': $[0],
                                        }]],
                                    },
                                )
                            }
                        },
                    )),
                ),
                'type': p_.change_context(
                    $['type'],
                    ($) => p_.change_context($, ($) => p_.from.state($).decide(($): s_target.Resolver_Signature_Parameters.lookups.D.type_ => {
                        switch ($[0]) {
                            case 'cyclic': return p_.option($, ($): s_target.Resolver_Signature_Parameters.lookups.D.type_ => p_.change_context(
                                $,
                                ($) => ['cyclic', null],
                            ))
                            case 'acyclic': return p_.option($, ($): s_target.Resolver_Signature_Parameters.lookups.D.type_ => p_.change_context(
                                $,
                                ($) => ['acyclic', null],
                            ))
                            
                            default: return p_.exhaustive($[0])
                        }
                    })),
                ),
                'presence': p_.change_context(
                    $['presence'],
                    ($) => Presence(
                        $,
                        abort,
                    ),
                ),
            }))(
                Type_Reference(
                    $['referent'],
                    abort,
                    {
                        'types': p_.select_lookup.acyclic.from_resolved_dictionary(
                            $p['types'],
                        ),
                    },
                    {
                        
                    },
                ),
            ),
        ),
    ),
})

export const Resolver_Value: declarations.Resolver_Value = ($, abort, $l, $p) => p_.change_context($, ($) => p_.from.state($).decide(($): s_target.Resolver_Value => {
    switch ($[0]) {
        case 'component': return p_.option($, ($): s_target.Resolver_Value => ((v_location) => ((v_signature) => p_.from.boolean(
            (($p['definition'][0]) !== ("component")),
        ).decide(
            () => abort(
                {
                    'type': ['constraint', ['state', {
                        'expected': "component",
                        'found': $p['definition'][0],
                    }]],
                },
            ),
            () => p_.from.boolean(
                ((v_signature['type']) !== (p_.change_context(p_.from.state(
                    $p['definition'],
                ).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'component': return p_.option(
                                $,
                                ($) => $['type'],
                            )
                            default: return abort(
                                {
                                    'type': ['constraint', ['state', {
                                        'expected': "component",
                                        'found': $p['definition'][0],
                                    }]],
                                },
                            )
                        }
                    },
                ), ($) => p_.from.state($).decide(($): s_target.Type => {
                    switch ($[0]) {
                        
                        case 'internal acyclic': return p_.option($, ($): s_target.Type => $['l entry'])
                        case 'internal': return p_.option($, ($): s_target.Type => $['l entry'].get_circular_dependent())
                        default: return p_.exhaustive($[0])
                    }
                })))),
            ).decide(
                () => abort(
                    {
                        'type': ['constraint', ['same node', "type.value"]],
                    },
                ),
                () => ['component', {
                    'definition': p_.change_context(
                        $['definition'],
                        ($) => ((v_constraint_context_19) => p_.from.state(
                            $p['definition'],
                        ).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'component': return p_.option(
                                        $,
                                        ($) => $,
                                    )
                                    default: return abort(
                                        {
                                            'type': ['constraint', ['state', {
                                                'expected': "component",
                                                'found': $p['definition'][0],
                                            }]],
                                        },
                                    )
                                }
                            },
                        ))(
                            $,
                        ),
                    ),
                    'location': p_.change_context(
                        $['location'],
                        ($) => v_location,
                    ),
                    'signature': p_.change_context(
                        $['signature'],
                        ($) => v_signature,
                    ),
                    'arguments': p_.change_context(
                        $['arguments'],
                        ($) => p_.from.optional($).map(($) => ({
                            'types': p_.change_context(
                                $['types'],
                                ($) => p_.from.optional($).map(($) => p_.from.dictionary($).map(
                                    ($, id) => p_.change_context($, ($) => p_.from.state($).decide(($): s_target.Resolver_Value.component.arguments_.O.types.O.D => {
                                        switch ($[0]) {
                                            case 'optional': return p_.option($, ($): s_target.Resolver_Value.component.arguments_.O.types.O.D => p_.change_context(
                                                $,
                                                ($) => ['optional', Resolver_Optional_Value_Initialization(
                                                    $,
                                                    abort,
                                                    $l,
                                                    $p,
                                                )],
                                            ))
                                            case 'required': return p_.option($, ($): s_target.Resolver_Value.component.arguments_.O.types.O.D => p_.change_context(
                                                $,
                                                ($) => ['required', Resolver_Guaranteed_Value_Selection(
                                                    $,
                                                    abort,
                                                    $l,
                                                    $p,
                                                )],
                                            ))
                                            case 'parameter': return p_.option($, ($): s_target.Resolver_Value.component.arguments_.O.types.O.D => p_.change_context(
                                                {
                                                    'l id': $,
                                                    'l entry': ((v_lookup_context_25) => p_.from.dictionary(
                                                        $p['signature']['resolved parameters']['types'],
                                                    ).get_entry(
                                                        $,
                                                        {
                                                            no_such_entry: ($) => abort(
                                                                {
                                                                    'type': ['lookup', ['no such entry', v_lookup_context_25]],
                                                                },
                                                            ),
                                                        },
                                                    ))(
                                                        $,
                                                    ),
                                                },
                                                ($) => ((v_benchmark) => p_.from.boolean(
                                                    (($['l entry']['presence'][0]) !== (v_benchmark['presence'][0])),
                                                ).decide(
                                                    () => abort(
                                                        {
                                                            'type': ['constraint', ['same node', "parameter presence"]],
                                                        },
                                                    ),
                                                    () => p_.from.boolean(
                                                        (($['l entry']['type']['resulting type']) !== (v_benchmark['type']['resulting type'])),
                                                    ).decide(
                                                        () => abort(
                                                            {
                                                                'type': ['constraint', ['same node', "parameter data type"]],
                                                            },
                                                        ),
                                                        () => ['parameter', $],
                                                    ),
                                                ))(
                                                    ((v_lookup_context_26) => p_.from.dictionary(
                                                        v_signature['resolved parameters']['types'],
                                                    ).get_entry(
                                                        id,
                                                        {
                                                            no_such_entry: ($) => abort(
                                                                {
                                                                    'type': ['lookup', ['no such entry', id]],
                                                                },
                                                            ),
                                                        },
                                                    ))(
                                                        $,
                                                    ),
                                                ),
                                            ))
                                            default: return p_.exhaustive($[0])
                                        }
                                    })),
                                )),
                            ),
                            'lookups': p_.change_context(
                                $['lookups'],
                                ($) => p_.from.optional($).map(($) => p_.from.dictionary($).map(
                                    ($, id) => p_.change_context($, ($) => p_.from.state($).decide(($): s_target.Resolver_Value.component.arguments_.O.lookups.O.D => {
                                        switch ($[0]) {
                                            
                                            case 'acyclic': return p_.option($, ($): s_target.Resolver_Value.component.arguments_.O.lookups.O.D => p_.change_context(
                                                $,
                                                ($) => ['acyclic', p_.change_context($, ($) => p_.from.state($).decide(($): s_target.Resolver_Value.component.arguments_.O.lookups.O.D.acyclic => {
                                                    switch ($[0]) {
                                                        case 'not set': return p_.option($, ($): s_target.Resolver_Value.component.arguments_.O.lookups.O.D.acyclic => p_.change_context(
                                                            $,
                                                            ($) => ['not set', null],
                                                        ))
                                                        default: return p_.exhaustive($[0])
                                                    }
                                                }))],
                                            ))
                                            case 'cyclic': return p_.option($, ($): s_target.Resolver_Value.component.arguments_.O.lookups.O.D => p_.change_context(
                                                $,
                                                ($) => ['cyclic', p_.change_context($, ($) => p_.from.state($).decide(($): s_target.Resolver_Value.component.arguments_.O.lookups.O.D.cyclic => {
                                                    switch ($[0]) {
                                                        case 'not set': return p_.option($, ($): s_target.Resolver_Value.component.arguments_.O.lookups.O.D.cyclic => p_.change_context(
                                                            $,
                                                            ($) => ['not set', null],
                                                        ))
                                                        default: return p_.exhaustive($[0])
                                                    }
                                                }))],
                                            ))
                                            case 'selection': return p_.option($, ($): s_target.Resolver_Value.component.arguments_.O.lookups.O.D => p_.change_context(
                                                $,
                                                ($) => ['selection', Resolver_Lookup_Selection(
                                                    $,
                                                    abort,
                                                    $l,
                                                    $p,
                                                )],
                                            ))
                                            default: return p_.exhaustive($[0])
                                        }
                                    })),
                                )),
                            ),
                        })),
                    ),
                    'constraints': p_.change_context(
                        $['constraints'],
                        ($) => Resolver_Value_Constraints(
                            $,
                            abort,
                            {
                                'value': v_signature['type']['root value'],
                                'types': $p.types,
                            },
                        ),
                    ),
                }],
            ),
        ))(
            p_.change_context(v_location, ($) => p_.from.state($).decide(($): s_target.Resolver_Signature => {
                switch ($[0]) {
                    case 'internal': return p_.option($, ($): s_target.Resolver_Signature => $['l entry'])
                    
                    default: return p_.exhaustive($[0])
                }
            })),
        ))(
            p_.change_context($['location'], ($) => p_.from.state($).decide(($): s_target.Resolver_Value.component.location => {
                switch ($[0]) {
                    case 'internal': return p_.option($, ($): s_target.Resolver_Value.component.location => ['internal', {
                        'l id': $,
                        'l entry': ((v_lookup_context_5) => p_.from.dictionary(
                            $p['signatures'],
                        ).get_entry(
                            $,
                            {
                                no_such_entry: ($) => abort(
                                    {
                                        'type': ['lookup', ['no such entry', v_lookup_context_5]],
                                    },
                                ),
                            },
                        ))(
                            $,
                        ),
                    }])
                    
                    default: return p_.exhaustive($[0])
                }
            })),
        ))
        case 'dictionary': return p_.option($, ($): s_target.Resolver_Value => p_.change_context(
            $,
            ($) => ((v_definition) => ((v_benchmark) => ['dictionary', {
                'definition': p_.change_context(
                    $['definition'],
                    ($) => v_definition,
                ),
                'resolver': p_.change_context(
                    $['resolver'],
                    ($) => Resolver_Value(
                        $,
                        abort,
                        $l,
                        {
                            'definition': v_definition['value'],
                            'list cursor': $p['list cursor'],
                            'linked entry': ((v_context_39) => p_.from.optional(v_benchmark).decide(($) => p_.literal.set($), () => $p['linked entry']))(
                                $,
                            ),
                            'current dictionary': p_.literal.set(v_definition),
                            'current ordered dictionary': p_.literal.set(v_definition),
                            'signature': $p['signature'],
                            'signatures': $p['signatures'],
                            'types': $p['types'],
                            'option constraints': $p['option constraints'],
                        },
                    ),
                ),
                'benchmark': p_.change_context(
                    $['benchmark'],
                    ($) => v_benchmark,
                ),
            }])(
                p_.from.optional($['benchmark']).map(($) => Resolver_Benchmark(
                    $,
                    abort,
                    $l,
                    $p,
                )),
            ))(
                ((v_constraint_context_37) => p_.from.state(
                    $p['definition'],
                ).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'dictionary': return p_.option(
                                $,
                                ($) => $,
                            )
                            default: return abort(
                                {
                                    'type': ['constraint', ['state', {
                                        'expected': "dictionary",
                                        'found': $p['definition'][0],
                                    }]],
                                },
                            )
                        }
                    },
                ))(
                    $,
                ),
            ),
        ))
        case 'group': return p_.option($, ($): s_target.Resolver_Value => p_.change_context(
            $,
            ($) => ['group', Resolver_Value_Group(
                $,
                abort,
                {
                    'sibling property resolvers': $l['sibling property resolvers'],
                    'parent sibling property resolvers': $l['sibling property resolvers'],
                },
                {
                    'definition': ((v_constraint_context_41) => p_.from.state(
                        $p['definition'],
                    ).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'group': return p_.option(
                                    $,
                                    ($) => $,
                                )
                                default: return abort(
                                    {
                                        'type': ['constraint', ['state', {
                                            'expected': "group",
                                            'found': $p['definition'][0],
                                        }]],
                                    },
                                )
                            }
                        },
                    ))(
                        $,
                    ),
                    'list cursor': $p['list cursor'],
                    'linked entry': $p['linked entry'],
                    'current dictionary': $p['current dictionary'],
                    'current ordered dictionary': $p['current ordered dictionary'],
                    'signature': $p['signature'],
                    'signatures': $p['signatures'],
                    'types': $p['types'],
                    'option constraints': $p['option constraints'],
                },
            )],
        ))
        case 'list': return p_.option($, (source): s_target.Resolver_Value => {
            if ($p.definition[0] !== 'list') return abort({
                type: ['constraint', ['state', { expected: 'list', found: $p.definition[0] }]],
            })
            const definition = $p.definition[1]
            const declaration = p_.from.optional(source.result).map((result) => {
                const type = Type_Reference(result.type, abort, {
                    types: p_.select_lookup.acyclic.from_resolved_dictionary($p.types),
                }, {})
                const initial = Resolver_Guaranteed_Value_Selection(result.initial, abort, $l, $p)
                Result_Type(initial['resulting node'], type, abort)
                return { type, initial, next: result.next }
            })
            const parameters = {
                ...$p,
                definition: definition.value,
                'list cursor': p_.from.optional(declaration).decide(
                    (result) => p_.literal.set(result.type),
                    () => $p['list cursor'],
                ),
            }
            const resolver = Resolver_Value(source.resolver, abort, $l, parameters)
            return ['list', {
                definition,
                resolver,
                result: p_.from.optional(declaration).map((result) => ({
                    type: result.type,
                    initial: result.initial,
                    next: Resolver_Result_Selection(result.next, abort, $l, parameters, result.type),
                })),
            }]
        })
        case 'nothing': return p_.option($, ($): s_target.Resolver_Value => p_.change_context(
            $,
            ($) => ['nothing', null],
        ))
        case 'simple': return p_.option($, ($): s_target.Resolver_Value => p_.change_context(
            $,
            ($) => ['simple', null],
        ))
        case 'optional': return p_.option($, ($): s_target.Resolver_Value => p_.change_context(
            $,
            ($) => ((v_constraints) => ['optional', {
                'constraints': p_.change_context(
                    $['constraints'],
                    ($) => v_constraints,
                ),
                'resolver': p_.change_context(
                    $['resolver'],
                    ($) => Resolver_Value(
                        $,
                        abort,
                        $l,
                        {
                            'definition': ((v_constraint_context_46) => p_.from.state(
                                $p['definition'],
                            ).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'optional': return p_.option(
                                            $,
                                            ($) => $,
                                        )
                                        default: return abort(
                                            {
                                                'type': ['constraint', ['state', {
                                                    'expected': "optional",
                                                    'found': $p['definition'][0],
                                                }]],
                                            },
                                        )
                                    }
                                },
                            ))(
                                $,
                            ),
                            'list cursor': $p['list cursor'],
                            'linked entry': $p['linked entry'],
                            'current dictionary': $p['current dictionary'],
                            'current ordered dictionary': $p['current ordered dictionary'],
                            'signature': $p['signature'],
                            'signatures': $p['signatures'],
                            'types': $p['types'],
                            'option constraints': p_.literal.set(v_constraints),
                        },
                    ),
                ),
            }])(
                Resolver_Option_Constraints(
                    $['constraints'],
                    abort,
                    $l,
                    $p,
                ),
            ),
        ))
        case 'reference': return p_.option($, ($): s_target.Resolver_Value => p_.change_context(
            $,
            ($) => ((v_definition) => ['reference', {
                'definition': p_.change_context(
                    $['definition'],
                    ($) => v_definition,
                ),
                'type': p_.change_context(
                    $['type'],
                    ($) => p_.change_context($, ($) => p_.from.state($).decide(($): s_target.Resolver_Value.reference.type_ => {
                        switch ($[0]) {
                            case 'derived': return p_.option($, ($): s_target.Resolver_Value.reference.type_ => p_.change_context(
                                $,
                                ($) => ['derived', {
                                    'value': p_.change_context(
                                        $['value'],
                                        ($) => Resolver_Guaranteed_Value_Selection(
                                            $,
                                            abort,
                                            $l,
                                            $p,
                                        ),
                                    ),
                                }],
                            ))
                            case 'selected': return p_.option($, ($): s_target.Resolver_Value.reference.type_ => p_.change_context(
                                $,
                                ($) => ((v_lookup) => ['selected', {
                                    'definition': p_.change_context(
                                        $['definition'],
                                        ($) => ((v_constraint_context_50) => p_.from.state(
                                            v_definition['type'],
                                        ).decide(
                                            ($) => {
                                                switch ($[0]) {
                                                    case 'selected': return p_.option(
                                                        $,
                                                        ($) => $,
                                                    )
                                                    default: return abort(
                                                        {
                                                            'type': ['constraint', ['state', {
                                                                'expected': "selected",
                                                                'found': v_definition['type'][0],
                                                            }]],
                                                        },
                                                    )
                                                }
                                            },
                                        ))(
                                            $,
                                        ),
                                    ),
                                    'lookup': p_.change_context(
                                        $['lookup'],
                                        ($) => v_lookup,
                                    ),
                                    'constraints': p_.change_context(
                                        $['constraints'],
                                        ($) => Resolver_Value_Constraints(
                                            $,
                                            abort,
                                            {
                                                'value': v_lookup['resulting dictionary']['value'],
                                                'types': $p.types,
                                            },
                                        ),
                                    ),
                                }])(
                                    Resolver_Lookup_Selection(
                                        $['lookup'],
                                        abort,
                                        $l,
                                        $p,
                                    ),
                                ),
                            ))
                            default: return p_.exhaustive($[0])
                        }
                    })),
                ),
            }])(
                ((v_constraint_context_47) => p_.from.state(
                    $p['definition'],
                ).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'reference': return p_.option(
                                $,
                                ($) => $,
                            )
                            default: return abort(
                                {
                                    'type': ['constraint', ['state', {
                                        'expected': "reference",
                                        'found': $p['definition'][0],
                                    }]],
                                },
                            )
                        }
                    },
                ))(
                    $,
                ),
            ),
        ))
        case 'state': return p_.option($, (source): s_target.Resolver_Value => p_.change_context(
            source,
            ($) => ((v_definition) => ['state', {
                'definition': p_.change_context(
                    $['definition'],
                    ($) => v_definition,
                ),
                'result': p_.from.optional($.result).map((type) => {
                    p_.from.dictionary($.options).map((option) => p_.from.optional(option.result).decide(
                        () => null,
                        () => abort({ type: ['constraint', ['optional value is not set', null]] }),
                    ))
                    return Type_Reference(type, abort, { types: p_.select_lookup.acyclic.from_resolved_dictionary($p.types) }, {})
                }),
                'options': p_.change_context(
                    $['options'],
                    ($) => ((v_required) => p_.from.dictionary($).map(
                        ($, id) => ((v_option) => ((v_constraints) => ({
                            'constraints': p_.change_context(
                                $['constraints'],
                                ($) => v_constraints,
                            ),
                            'resolver': p_.change_context(
                                $['resolver'],
                                ($) => Resolver_Value(
                                    $,
                                    abort,
                                    $l,
                                    {
                                        'definition': v_option['value'],
                                        'list cursor': $p['list cursor'],
                                        'linked entry': $p['linked entry'],
                                        'current dictionary': $p['current dictionary'],
                                        'current ordered dictionary': $p['current ordered dictionary'],
                                        'signature': $p['signature'],
                                        'signatures': $p['signatures'],
                                        'types': $p['types'],
                                        'option constraints': p_.literal.set(v_constraints),
                                    },
                                ),
                            ),
                            'result': p_.from.optional($.result).map((selection) => {
                                const expected = p_.from.optional(source.result).decide(
                                    (type) => Type_Reference(type, abort, {
                                        types: p_.select_lookup.acyclic.from_resolved_dictionary($p.types),
                                    }, {}),
                                    () => abort({ type: ['constraint', ['optional value is not set', null]] }),
                                )
                                return Resolver_Result_Selection(selection, abort, $l, {
                                    ...$p, definition: v_option.value, 'option constraints': p_.literal.set(v_constraints),
                                }, expected)
                            }),
                        }))(
                            Resolver_Option_Constraints(
                                $['constraints'],
                                abort,
                                $l,
                                $p,
                            ),
                        ))(
                            ((v_lookup_context_55) => p_.from.dictionary(
                                v_definition['options'],
                            ).get_entry(
                                id,
                                {
                                    no_such_entry: ($) => abort(
                                        {
                                            'type': ['lookup', ['no such entry', id]],
                                        },
                                    ),
                                },
                            ))(
                                $,
                            ),
                        ),
                    ))(
                        p_.from.dictionary(v_definition['options']).map(
                            (entry, id) => p_.from.dictionary($).get_entry(id, {
                                no_such_entry: () => abort({
                                    'type': ['missing required entries', p_.literal.dictionary({ [id]: null })],
                                }),
                            }),
                        ),
                    ),
                ),
            }])(
                ((v_constraint_context_51) => p_.from.state(
                    $p['definition'],
                ).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'state': return p_.option(
                                $,
                                ($) => $,
                            )
                            default: return abort(
                                {
                                    'type': ['constraint', ['state', {
                                        'expected': "state",
                                        'found': $p['definition'][0],
                                    }]],
                                },
                            )
                        }
                    },
                ))(
                    $,
                ),
            ),
        ))
        
        default: return p_.exhaustive($[0])
    }
}))

export const Type_Specification: declarations.Type_Specification = ($, abort) => {
    const schema = Schema($.schema, abort);
    return {
        schema,
        'root type': {
            'l id': $['root type'],
            'l entry': p_.from.dictionary(schema.resolvers).get_entry($['root type'], {
                no_such_entry: () => abort({ type: ['lookup', ['no such entry', $['root type']]] }),
            }),
        },
    };
}





export const Basic_Type: declarations.Basic_Type = ($, abort) => ({
    'type': p_.change_context(
        $['type'],
        ($) => p_.change_context($, ($) => p_.from.state($).decide(($): s_target.Basic_Type.type_ => {
            switch ($[0]) {
                case 'boolean': return p_.option($, ($): s_target.Basic_Type.type_ => p_.change_context(
                    $,
                    ($) => ['boolean', null],
                ))
                case 'date': return p_.option($, ($): s_target.Basic_Type.type_ => p_.change_context(
                    $,
                    ($) => ['date', null],
                ))
                case 'number': return p_.option($, ($): s_target.Basic_Type.type_ => p_.change_context(
                    $,
                    ($) => ['number', {
                        'precision': p_.change_context(
                            $['precision'],
                            ($) => p_.change_context($, ($) => p_.from.state($).decide(($): s_target.Basic_Type.type_.number_.precision => {
                                switch ($[0]) {
                                    case 'approximation': return p_.option($, ($): s_target.Basic_Type.type_.number_.precision => p_.change_context(
                                        $,
                                        ($) => ['approximation', {
                                            'significant digits': p_.change_context(
                                                $['significant digits'],
                                                ($) => $,
                                            ),
                                        }],
                                    ))
                                    case 'exact': return p_.option($, ($): s_target.Basic_Type.type_.number_.precision => p_.change_context(
                                        $,
                                        ($) => ['exact', {
                                            'number of fractional digits': p_.change_context(
                                                $['number of fractional digits'],
                                                ($) => p_.from.optional($).map(($) => $),
                                            ),
                                            'type': p_.change_context(
                                                $['type'],
                                                ($) => p_.change_context($, ($) => p_.from.state($).decide(($): s_target.Basic_Type.type_.number_.precision.exact.type_ => {
                                                    switch ($[0]) {
                                                        case 'integer': return p_.option($, ($): s_target.Basic_Type.type_.number_.precision.exact.type_ => p_.change_context(
                                                            $,
                                                            ($) => ['integer', null],
                                                        ))
                                                        case 'natural': return p_.option($, ($): s_target.Basic_Type.type_.number_.precision.exact.type_ => p_.change_context(
                                                            $,
                                                            ($) => ['natural', null],
                                                        ))
                                                        case 'positive natural': return p_.option($, ($): s_target.Basic_Type.type_.number_.precision.exact.type_ => p_.change_context(
                                                            $,
                                                            ($) => ['positive natural', null],
                                                        ))
                                                                                        default: return p_.exhaustive($[0])
                                                    }
                                                })),
                                            ),
                                        }],
                                    ))
                                    default: return p_.exhaustive($[0])
                                }
                            })),
                        ),
                    }],
                ))
                case 'text': return p_.option($, ($): s_target.Basic_Type.type_ => ['text', $])
            default: return p_.exhaustive($[0])
            }
        })),
    ),
})

export const Type: declarations.Type = ($, abort, $l, $p) => ({
    'root value': p_.change_context(
        $['root value'],
        ($) => Value(
            $,
            abort,
            $l,
            $p,
        ),
    ),
})

export const Presence: declarations.Presence = ($, abort) => p_.change_context($, ($) => p_.from.state($).decide(($): s_target.Presence => {
    switch ($[0]) {
        case 'optional': return p_.option($, ($): s_target.Presence => p_.change_context(
            $,
            ($) => ['optional', null],
        ))
        case 'required': return p_.option($, ($): s_target.Presence => p_.change_context(
            $,
            ($) => ['required', null],
        ))
        default: return p_.exhaustive($[0])
    }
}))

export const Resolver_Types: declarations.Resolver_Types = ($, abort, $p) => ((v_required) => p_.from.dictionary($).map(
    ($, id) => ((v_signature) => ({
        'signature': p_.change_context(
            $['signature'],
            ($) => v_signature,
        ),
        'root value resolver': p_.change_context(
            $['root value resolver'],
            ($) => Resolver_Value(
                $,
                abort,
                {
                    'sibling property resolvers': ((): p_.lookup.Acyclic<
                        s_target.Resolver_Value_Group.D
                    > => p_.select_lookup.acyclic.not_set())(),
                    'parent sibling property resolvers': ((): p_.lookup.Acyclic<
                        s_target.Resolver_Value_Group.D
                    > => p_.select_lookup.acyclic.not_set())(),
                },
                {
                    'definition': v_signature['type']['root value'],
                    'signature': v_signature,
                    'types': $p['types'],
                    'signatures': $p['signatures'],
                    'list cursor': p_.literal.not_set(),
                    'linked entry': p_.literal.not_set(),
                    'current dictionary': p_.literal.not_set(),
                    'current ordered dictionary': p_.literal.not_set(),
                    'option constraints': p_.literal.not_set(),
                },
            ),
        ),
    }))(
        ((v_lookup_context_4) => p_.from.dictionary(
            $p['signatures'],
        ).get_entry(
            id,
            {
                no_such_entry: ($) => abort(
                    {
                        'type': ['lookup', ['no such entry', id]],
                    },
                ),
            },
        ))(
            $,
        ),
    ),
))(
    p_.from.dictionary($p['signatures']).map(
        (entry, id) => p_.from.dictionary($).get_entry(id, {
            no_such_entry: () => abort({
                'type': ['missing required entries', p_.literal.dictionary({ [id]: null })],
            }),
        }),
    ),
)

export const Resolver_Benchmark: declarations.Resolver_Benchmark = ($, abort, $l, $p) => ((v_selection) => ({
    'selection': p_.change_context(
        $['selection'],
        ($) => v_selection,
    ),
    'resulting dictionary': p_.change_context(
        $['resulting dictionary'],
        ($) => p_.change_context(v_selection['resulting node'], ($) => p_.from.state(
            $,
        ).decide(
            ($) => {
                switch ($[0]) {
                    case 'dictionary': return p_.option(
                        $,
                        ($) => $,
                    )
                    default: return abort(
                        {
                            'type': ['constraint', ['state', {
                                'expected': "dictionary",
                                'found': $[0],
                            }]],
                        },
                    )
                }
            },
        )),
    ),
    'dense': p_.change_context(
        $['dense'],
        ($) => $,
    ),
}))(
    Resolver_Guaranteed_Value_Selection(
        $['selection'],
        abort,
        $l,
        $p,
    ),
)

export const Group: declarations.Group = ($, abort, $l, $p) => p_.from.dictionary($).map(
    ($, id) => ({
        'description': p_.change_context(
            $['description'],
            ($) => p_.from.optional($).map(($) => $),
        ),
        'value': p_.change_context(
            $['value'],
            ($) => Value(
                $,
                abort,
                $l,
                $p,
            ),
        ),
    }),
)

export const Value_Reference: declarations.Value_Reference = ($, abort, $l, $p) => ((v_type$_) => ({
    'type': p_.change_context(
        $['type'],
        ($) => v_type$_,
    ),
    'path': p_.change_context(
        $['path'],
        ($) => Value_Path(
            $,
            abort,
            {
                'type': v_type$_['resulting type'],
            },
        ),
    ),
}))(
    Type_Reference(
        $['type'],
        abort,
        $l,
        $p,
    ),
)

export const Value_Path: declarations.Value_Path = ($, abort, $p) => p_.change_context(
    $['tail'],
    ($) => p_.change_context(
        p_.from.list($).resolve(
            ($, preceding): { readonly 'item': s_target.Value_Path.tail.L; readonly 'node': s_target.Value } => p_.change_context(
                p_.from.optional(preceding).decide(
                    (previous) => previous['node'],
                    () => $p['type']['root value'],
                ),
                (current) => p_.change_context($, ($) => p_.from.state($).decide(($) => {
                    switch ($[0]) {
                        case 'dictionary': return p_.option($, ($) => p_.change_context(
                            $,
                            ($) => ((v_constraint_context_4) => p_.from.state(
                                current,
                            ).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'dictionary': return p_.option(
                                            $,
                                            ($) => ({
                                                'item': ['dictionary', null],
                                                'node': $['value'],
                                            }),
                                        )
                                        default: return abort(
                                            {
                                                'type': ['constraint', ['state', {
                                                    'expected': "dictionary",
                                                    'found': current[0],
                                                }]],
                                            },
                                        )
                                    }
                                },
                            ))(
                                $,
                            ),
                        ))
                        case 'group': return p_.option($, ($) => p_.change_context(
                            $,
                            ($) => ((v_constraint_context_5) => p_.from.state(
                                current,
                            ).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'group': return p_.option(
                                            $,
                                            ($) => p_.change_context(
                                                {
                                                    'l id': v_constraint_context_5,
                                                    'l entry': ((v_lookup_context_6) => p_.from.dictionary(
                                                        $,
                                                    ).get_entry(
                                                        v_constraint_context_5,
                                                        {
                                                            no_such_entry: ($) => abort(
                                                                {
                                                                    'type': ['lookup', ['no such entry', v_lookup_context_6]],
                                                                },
                                                            ),
                                                        },
                                                    ))(
                                                        v_constraint_context_5,
                                                    ),
                                                },
                                                ($) => ({
                                                    'item': ['group', $],
                                                    'node': $['l entry']['value'],
                                                }),
                                            ),
                                        )
                                        default: return abort(
                                            {
                                                'type': ['constraint', ['state', {
                                                    'expected': "group",
                                                    'found': current[0],
                                                }]],
                                            },
                                        )
                                    }
                                },
                            ))(
                                $,
                            ),
                        ))
                        case 'list': return p_.option($, ($) => p_.change_context(
                            $,
                            ($) => ((v_constraint_context_7) => p_.from.state(
                                current,
                            ).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'list': return p_.option(
                                            $,
                                            ($) => ({
                                                'item': ['list', null],
                                                'node': $['value'],
                                            }),
                                        )
                                        default: return abort(
                                            {
                                                'type': ['constraint', ['state', {
                                                    'expected': "list",
                                                    'found': current[0],
                                                }]],
                                            },
                                        )
                                    }
                                },
                            ))(
                                $,
                            ),
                        ))
                        case 'optional': return p_.option($, ($) => p_.change_context(
                            $,
                            ($) => ((v_constraint_context_8) => p_.from.state(
                                current,
                            ).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'optional': return p_.option(
                                            $,
                                            ($) => ({
                                                'item': ['optional', null],
                                                'node': $,
                                            }),
                                        )
                                        default: return abort(
                                            {
                                                'type': ['constraint', ['state', {
                                                    'expected': "optional",
                                                    'found': current[0],
                                                }]],
                                            },
                                        )
                                    }
                                },
                            ))(
                                $,
                            ),
                        ))
                        case 'state': return p_.option($, ($) => p_.change_context(
                            $,
                            ($) => ((v_constraint_context_9) => p_.from.state(
                                current,
                            ).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'state': return p_.option(
                                            $,
                                            ($) => p_.change_context(
                                                {
                                                    'l id': v_constraint_context_9,
                                                    'l entry': ((v_lookup_context_10) => p_.from.dictionary(
                                                        $['options'],
                                                    ).get_entry(
                                                        v_constraint_context_9,
                                                        {
                                                            no_such_entry: ($) => abort(
                                                                {
                                                                    'type': ['lookup', ['no such entry', v_lookup_context_10]],
                                                                },
                                                            ),
                                                        },
                                                    ))(
                                                        v_constraint_context_9,
                                                    ),
                                                },
                                                ($) => ({
                                                    'item': ['state', $],
                                                    'node': $['l entry']['value'],
                                                }),
                                            ),
                                        )
                                        default: return abort(
                                            {
                                                'type': ['constraint', ['state', {
                                                    'expected': "state",
                                                    'found': current[0],
                                                }]],
                                            },
                                        )
                                    }
                                },
                            ))(
                                $,
                            ),
                        ))
                        default: return p_.exhaustive($[0])
                    }
                })),
            ),
        ),
        (v_tail) => p_.change_context(
            p_transformer.from.list(v_tail).on_has_last_item(
                (previous) => previous['node'],
                () => $p['type']['root value'],
            ),
            (v_node) => ({
                'tail': p_.from.list(v_tail).map(
                    ($) => $['item'],
                ),
                'resulting node': v_node,
            }),
        ),
    ),
)

export const Type_Reference: declarations.Type_Reference = ($, abort, $l, $p) => ((v_location) => ({
    'location': v_location,
    'resulting type': p_.change_context(
        v_location,
        ($) => p_.change_context($, ($) => p_.from.state($).decide(($) => {
            switch ($[0]) {
                case 'internal': return p_.option($, ($) => $['l entry'])
                
                default: return p_.exhaustive($[0])
            }
        })),
    ),
}))(
    p_.change_context(
        $['location'],
        ($) => p_.change_context($, ($) => p_.from.state($).decide(($): s_target.Type_Reference.location => {
            switch ($[0]) {
                case 'internal': return p_.option($, ($): s_target.Type_Reference.location => p_.change_context(
                    $,
                    ($) => ['internal', {
                        'l id': $,
                        'l entry': ((v_lookup_context_3) => $l['types'].get_entry(
                            $,
                            {
                                no_such_entry: ($) => abort(
                                    {
                                        'type': ['lookup', ['no such entry', v_lookup_context_3]],
                                    },
                                ),
                                no_context_lookup: ($) => abort(
                                    {
                                        'type': ['lookup', ['no context lookup', null]],
                                    },
                                ),
                                cycle_detected: ($) => abort(
                                    {
                                        'type': ['lookup', ['cycle detected', null]],
                                    },
                                ),
                            },
                        ))(
                            $,
                        ),
                    }],
                ))
                
                default: return p_.exhaustive($[0])
            }
        })),
    ),
)

export const Resolver_Signature: declarations.Resolver_Signature = ($, abort, $l, $p) => ((v_parameters) => ({
    'type': p_.change_context(
        $['type'],
        ($) => $p['type'],
    ),
    'parameters': p_.change_context(
        $['parameters'],
        ($) => v_parameters,
    ),
    'resolved parameters': p_.change_context(
        $['resolved parameters'],
        ($) => p_.change_context(v_parameters, ($) => p_.from.state($).decide(($) => {
            switch ($[0]) {
                case 'local': return p_.option($, ($) => $)
                case 'same as': return p_.option($, ($) => $['l entry']['resolved parameters'])
                default: return p_.exhaustive($[0])
            }
        })),
    ),
}))(
    p_.change_context($['parameters'], ($) => p_.from.state($).decide(($): s_target.Resolver_Signature.parameters => {
        switch ($[0]) {
            case 'local': return p_.option($, ($): s_target.Resolver_Signature.parameters => ['local', Resolver_Signature_Parameters(
                $,
                abort,
                {
                    'types': $p['types'],
                    
                },
            )])
            case 'same as': return p_.option($, ($): s_target.Resolver_Signature.parameters => ['same as', {
                'l id': $,
                'l entry': ((v_lookup_context_3) => $l['sibling signatures'].get_entry(
                    $,
                    {
                        no_such_entry: ($) => abort(
                            {
                                'type': ['lookup', ['no such entry', v_lookup_context_3]],
                            },
                        ),
                        no_context_lookup: ($) => abort(
                            {
                                'type': ['lookup', ['no context lookup', null]],
                            },
                        ),
                        cycle_detected: ($) => abort(
                            {
                                'type': ['lookup', ['cycle detected', null]],
                            },
                        ),
                    },
                ))(
                    $,
                ),
            }])
            default: return p_.exhaustive($[0])
        }
    })),
)

export const Resolver_Relative_Value_Selection: declarations.Resolver_Relative_Value_Selection = ($, abort, $p) => p_.change_context(
    $['path'],
    ($) => p_.change_context(
        p_.from.list($).resolve(
            ($, preceding): { readonly 'item': s_target.Resolver_Relative_Value_Selection.path.L; readonly 'node': s_target.Value } => p_.change_context(
                p_.from.optional(preceding).decide(
                    (previous) => previous['node'],
                    () => $p['value'],
                ),
                (current) => p_.change_context($, ($) => p_.from.state($).decide(($) => {
                    switch ($[0]) {
                        case 'component': return p_.option($, ($) => p_.change_context(
                            $,
                            ($) => ((v_constraint_context_4) => p_.from.state(
                                current,
                            ).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'component': return p_.option(
                                            $,
                                            ($) => ({
                                                'item': ['component', null],
                                                'node': p_.change_context($['type'], ($) => p_.from.state($).decide(($) => {
                                                    switch ($[0]) {
                                                        
                                                        case 'internal acyclic': return p_.option($, ($) => $['l entry']['root value'])
                                                        case 'internal': return p_.option($, ($) => $['l entry'].get_circular_dependent()['root value'])
                                                        default: return p_.exhaustive($[0])
                                                    }
                                                })),
                                            }),
                                        )
                                        default: return abort(
                                            {
                                                'type': ['constraint', ['state', {
                                                    'expected': "component",
                                                    'found': current[0],
                                                }]],
                                            },
                                        )
                                    }
                                },
                            ))(
                                $,
                            ),
                        ))
                        case 'group': return p_.option($, ($) => p_.change_context(
                            $,
                            ($) => ((v_constraint_context_7) => p_.from.state(
                                current,
                            ).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'group': return p_.option(
                                            $,
                                            ($) => p_.change_context(
                                                {
                                                    'l id': v_constraint_context_7,
                                                    'l entry': ((v_lookup_context_8) => p_.from.dictionary(
                                                        $,
                                                    ).get_entry(
                                                        v_constraint_context_7,
                                                        {
                                                            no_such_entry: ($) => abort(
                                                                {
                                                                    'type': ['lookup', ['no such entry', v_lookup_context_8]],
                                                                },
                                                            ),
                                                        },
                                                    ))(
                                                        v_constraint_context_7,
                                                    ),
                                                },
                                                ($) => ({
                                                    'item': ['group', $],
                                                    'node': $['l entry']['value'],
                                                }),
                                            ),
                                        )
                                        default: return abort(
                                            {
                                                'type': ['constraint', ['state', {
                                                    'expected': "group",
                                                    'found': current[0],
                                                }]],
                                            },
                                        )
                                    }
                                },
                            ))(
                                $,
                            ),
                        ))
                        case 'reference': return p_.option($, ($) => p_.change_context(
                            $,
                            ($) => ((v_constraint_context_9) => p_.from.state(
                                current,
                            ).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'reference': return p_.option(
                                            $,
                                            ($) => ({
                                                'item': ['reference', {
                                                    'definition': $,
                                                }],
                                                'node': ((v_reference_definition) => p_.change_context(v_reference_definition['type'], ($) => ((v_state_context_11) => p_.from.state($).decide(($) => {
                                                    switch ($[0]) {
                                                        case 'derived': return p_.option($, ($) => v_reference_definition['referent']['path']['resulting node'])
                                                        case 'selected': return p_.option($, ($) => p_.change_context(
                                                            v_reference_definition['referent']['path']['resulting node'],
                                                            ($) => ((v_constraint_context_12) => p_.from.state(
                                                                $,
                                                            ).decide(
                                                                ($) => {
                                                                    switch ($[0]) {
                                                                        case 'dictionary': return p_.option(
                                                                            $,
                                                                            ($) => $['value'],
                                                                        )
                                                                        default: return abort(
                                                                            {
                                                                                'type': ['constraint', ['state', {
                                                                                    'expected': "dictionary",
                                                                                    'found': v_constraint_context_12[0],
                                                                                }]],
                                                                            },
                                                                        )
                                                                    }
                                                                },
                                                            ))(
                                                                $,
                                                            ),
                                                        ))
                                                        default: return p_.exhaustive($[0])
                                                    }
                                                }))(
                                                    $,
                                                )))(
                                                    $,
                                                ),
                                            }),
                                        )
                                        default: return abort(
                                            {
                                                'type': ['constraint', ['state', {
                                                    'expected': "reference",
                                                    'found': current[0],
                                                }]],
                                            },
                                        )
                                    }
                                },
                            ))(
                                $,
                            ),
                        ))
                        case 'state result': return p_.option($, (source) => {
                            if (current[0] !== 'state') return abort({
                                type: ['constraint', ['state', { expected: 'state', found: current[0] }]],
                            })
                            const type = Type_Reference(source, abort, {
                                types: p_.select_lookup.acyclic.from_resolved_dictionary($p.types),
                            }, {})
                            return { item: ['state result', type], node: type['resulting type']['root value'] }
                        })
                        default: return p_.exhaustive($[0])
                    }
                })),
            ),
        ),
        (v_path) => p_.change_context(
            p_transformer.from.list(v_path).on_has_last_item(
                (previous) => previous['node'],
                () => $p['value'],
            ),
            (v_node) => ({
                'path': p_.from.list(v_path).map(
                    ($) => $['item'],
                ),
                'resulting node': v_node,
            }),
        ),
    ),
)

export const Resolver_Lookup_Selection: declarations.Resolver_Lookup_Selection = ($, abort, $l, $p) => ((v_type) => ({
    'type': v_type,
    'resulting dictionary': p_.change_context(v_type, ($) => p_.from.state($).decide(($) => {
        switch ($[0]) {
            case 'acyclic': return p_.option($, ($) => p_.change_context($, ($) => p_.from.state($).decide(($) => {
                switch ($[0]) {
                    case 'siblings': return p_.option($, ($) => $)
                    case 'resolved dictionary': return p_.option($, ($) => $['selected dictionary'])
                    default: return p_.exhaustive($[0])
                }
            })))
            case 'cyclic': return p_.option($, ($) => p_.from.state($).decide(($) => {
                switch ($[0]) {
                    case 'siblings': return p_.option($, ($) => $)
                    default: return p_.exhaustive($[0])
                }
            }))
            case 'parameter': return p_.option($, ($) => $['l entry']['dictionary'])
            default: return p_.exhaustive($[0])
        }
    })),
}))(
    p_.change_context(
        $['type'],
        ($) => p_.change_context($, ($) => p_.from.state($).decide(($): s_target.Resolver_Lookup_Selection.type_ => {
            switch ($[0]) {
                case 'acyclic': return p_.option($, ($): s_target.Resolver_Lookup_Selection.type_ => p_.change_context(
                    $,
                    ($) => ['acyclic', p_.change_context($, ($) => p_.from.state($).decide(($): s_target.Resolver_Lookup_Selection.type_.acyclic => {
                        switch ($[0]) {
                            case 'siblings': return p_.option($, ($): s_target.Resolver_Lookup_Selection.type_.acyclic => p_.change_context(
                                $,
                                ($) => ['siblings', ((v_context_5) => p_.from.optional($p['current dictionary']).decide(($) => $, () => abort(
                                    {
                                        'type': ['constraint', ['optional value is not set', null]],
                                    },
                                )))(
                                    $,
                                )],
                            ))
                            case 'resolved dictionary': return p_.option($, ($): s_target.Resolver_Lookup_Selection.type_.acyclic => p_.change_context(
                                $,
                                ($) => ((v_selection) => ['resolved dictionary', {
                                    'selection': p_.change_context(
                                        $['selection'],
                                        ($) => v_selection,
                                    ),
                                    'selected dictionary': p_.change_context(
                                        $['selected dictionary'],
                                        ($) => p_.change_context(v_selection['resulting node'], ($) => p_.from.state(
                                            $,
                                        ).decide(
                                            ($) => {
                                                switch ($[0]) {
                                                    case 'dictionary': return p_.option(
                                                        $,
                                                        ($) => $,
                                                    )
                                                    default: return abort(
                                                        {
                                                            'type': ['constraint', ['state', {
                                                                'expected': "dictionary",
                                                                'found': $[0],
                                                            }]],
                                                        },
                                                    )
                                                }
                                            },
                                        )),
                                    ),
                                }])(
                                    Resolver_Guaranteed_Value_Selection(
                                        $['selection'],
                                        abort,
                                        $l,
                                        $p,
                                    ),
                                ),
                            ))
                            default: return p_.exhaustive($[0])
                        }
                    }))],
                ))
                case 'cyclic': return p_.option($, ($): s_target.Resolver_Lookup_Selection.type_ => p_.change_context(
                    $,
                    ($) => ['cyclic', p_.change_context($, ($) => p_.from.state($).decide(($): s_target.Resolver_Lookup_Selection.type_.cyclic => {
                        switch ($[0]) {
                            case 'siblings': return p_.option($, ($): s_target.Resolver_Lookup_Selection.type_.cyclic => p_.change_context(
                                $,
                                ($) => ['siblings', ((v_context_11) => p_.from.optional($p['current dictionary']).decide(($) => $, () => abort(
                                    {
                                        'type': ['constraint', ['optional value is not set', null]],
                                    },
                                )))(
                                    $,
                                )],
                            ))
                            default: return p_.exhaustive($[0])
                        }
                    }))],
                ))
                case 'parameter': return p_.option($, ($): s_target.Resolver_Lookup_Selection.type_ => p_.change_context(
                    $,
                    ($) => ['parameter', {
                        'l id': $,
                        'l entry': ((v_lookup_context_13) => p_.from.dictionary(
                            $p['signature']['resolved parameters']['lookups'],
                        ).get_entry(
                            $,
                            {
                                no_such_entry: ($) => abort(
                                    {
                                        'type': ['lookup', ['no such entry', v_lookup_context_13]],
                                    },
                                ),
                            },
                        ))(
                            $,
                        ),
                    }],
                ))
                default: return p_.exhaustive($[0])
            }
        })),
    ),
)

export const Resolver_Constraint: declarations.Resolver_Constraint = ($, abort, $p) => ((v_selection) => ({
    'selection': p_.change_context(
        $['selection'],
        ($) => v_selection,
    ),
    'type': p_.change_context(
        $['type'],
        ($) => p_.change_context($, ($) => p_.from.state($).decide(($): s_target.Resolver_Constraint.type_ => {
            switch ($[0]) {
                case 'state': return p_.option($, ($): s_target.Resolver_Constraint.type_ => p_.change_context(
                    $,
                    ($) => ((v_selected) => ((v_constraint_context_3) => p_.from.state(
                        v_selected,
                    ).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'state': return p_.option(
                                    $,
                                    ($) => ((v_selected_state) => ['state', {
                                        'selected state': p_.change_context(
                                            v_constraint_context_3['selected state'],
                                            ($) => v_selected_state,
                                        ),
                                        'option': p_.change_context(
                                            v_constraint_context_3['option'],
                                            ($) => ({
                                                'l id': $,
                                                'l entry': ((v_lookup_context_4) => p_.from.dictionary(
                                                    v_selected_state['options'],
                                                ).get_entry(
                                                    $,
                                                    {
                                                        no_such_entry: ($) => abort(
                                                            {
                                                                'type': ['lookup', ['no such entry', v_lookup_context_4]],
                                                            },
                                                        ),
                                                    },
                                                ))(
                                                    $,
                                                ),
                                            }),
                                        ),
                                    }])(
                                        $,
                                    ),
                                )
                                default: return abort(
                                    {
                                        'type': ['constraint', ['state', {
                                            'expected': "state",
                                            'found': v_selected[0],
                                        }]],
                                    },
                                )
                            }
                        },
                    ))(
                        $,
                    ))(
                        v_selection['resulting node'],
                    ),
                ))
                case 'optional value': return p_.option($, ($): s_target.Resolver_Constraint.type_ => p_.change_context(
                    $,
                    ($) => ['optional value', {
                        'selected optional value': p_.change_context(
                            $['selected optional value'],
                            ($) => p_.change_context(
                                v_selection['resulting node'],
                                ($) => ((v_constraint_context_5) => p_.from.state(
                                    $,
                                ).decide(
                                    ($) => {
                                        switch ($[0]) {
                                            case 'optional': return p_.option(
                                                $,
                                                ($) => $,
                                            )
                                            default: return abort(
                                                {
                                                    'type': ['constraint', ['state', {
                                                        'expected': "optional",
                                                        'found': v_constraint_context_5[0],
                                                    }]],
                                                },
                                            )
                                        }
                                    },
                                ))(
                                    $,
                                ),
                            ),
                        ),
                    }],
                ))
                default: return p_.exhaustive($[0])
            }
        })),
    ),
}))(
    Resolver_Relative_Value_Selection(
        $['selection'],
        abort,
        $p,
    ),
)

export const Resolver_Option_Constraints: declarations.Resolver_Option_Constraints = ($, abort, $l, $p) => p_.from.dictionary($).map(
    ($, id) => p_.change_context($, ($) => p_.from.state($).decide(($): s_target.Resolver_Option_Constraints.D => {
        switch ($[0]) {
            case 'state': return p_.option($, ($): s_target.Resolver_Option_Constraints.D => p_.change_context(
                $,
                ($) => ((v_selection) => ((v_selected) => ((v_constraint_context_4) => p_.from.state(
                    v_selected,
                ).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'state': return p_.option(
                                $,
                                ($) => ((v_selected_state) => ['state', {
                                    'selection': p_.change_context(
                                        v_constraint_context_4['selection'],
                                        ($) => v_selection,
                                    ),
                                    'selected state': p_.change_context(
                                        v_constraint_context_4['selected state'],
                                        ($) => v_selected_state,
                                    ),
                                    'option': p_.change_context(
                                        v_constraint_context_4['option'],
                                        ($) => ({
                                            'l id': $,
                                            'l entry': ((v_lookup_context_5) => p_.from.dictionary(
                                                v_selected_state['options'],
                                            ).get_entry(
                                                $,
                                                {
                                                    no_such_entry: ($) => abort(
                                                        {
                                                            'type': ['lookup', ['no such entry', v_lookup_context_5]],
                                                        },
                                                    ),
                                                },
                                            ))(
                                                $,
                                            ),
                                        }),
                                    ),
                                }])(
                                    $,
                                ),
                            )
                            default: return abort(
                                {
                                    'type': ['constraint', ['state', {
                                        'expected': "state",
                                        'found': v_selected[0],
                                    }]],
                                },
                            )
                        }
                    },
                ))(
                    $,
                ))(
                    v_selection['resulting node'],
                ))(
                    Resolver_Guaranteed_Value_Selection(
                        $['selection'],
                        abort,
                        $l,
                        $p,
                    ),
                ),
            ))
            case 'assert is set': return p_.option($, ($): s_target.Resolver_Option_Constraints.D => p_.change_context(
                $,
                ($) => ['assert is set', Resolver_Possible_Value_Selection(
                    $,
                    abort,
                    $l,
                    $p,
                )],
            ))
            default: return p_.exhaustive($[0])
        }
    })),
)

export const Resolver_Optional_Value_Constraints: declarations.Resolver_Optional_Value_Constraints = ($, abort, $p) => p_.from.optional($).map(($) => Resolver_Value_Constraints(
    $,
    abort,
    $p,
))

export const Resolver_Value_Constraints: declarations.Resolver_Value_Constraints = ($, abort, $p) => p_.from.dictionary(
    $,
).resolve(
    ($, id, $acyclic, $cyclic) => Resolver_Value_Constraint(
        $,
        abort,
        {
            'property constraints': $acyclic,
        },
        $p,
    ),
)

export const Resolver_Reference_To_Value_Constraint: declarations.Resolver_Reference_To_Value_Constraint = ($, abort, $l) => ({
    'l id': $,
    'l entry': ((v_lookup_context_1) => $l['property constraints'].get_entry(
        $,
        {
            no_such_entry: ($) => abort(
                {
                    'type': ['lookup', ['no such entry', v_lookup_context_1]],
                },
            ),
            no_context_lookup: ($) => abort(
                {
                    'type': ['lookup', ['no context lookup', null]],
                },
            ),
            cycle_detected: ($) => abort(
                {
                    'type': ['lookup', ['cycle detected', null]],
                },
            ),
        },
    ))(
        $,
    ),
})

export const Resolver_Value_Constraint: declarations.Resolver_Value_Constraint = ($, abort, $l, $p) => ((v_start) => ({
    'start': p_.change_context(
        $['start'],
        ($) => v_start,
    ),
    'constraint': p_.change_context(
        $['constraint'],
        ($) => Resolver_Constraint(
            $,
            abort,
            {
                'types': $p.types,
                'value': p_.change_context(v_start, ($) => p_.from.state($).decide(($): s_target.Value => {
                    switch ($[0]) {
                        case 'value': return p_.option($, ($): s_target.Value => $p['value'])
                        case 'sibling': return p_.option($, ($): s_target.Value => p_.change_context($['l entry']['constraint']['type'], ($) => p_.from.state($).decide(($): s_target.Value => {
                            switch ($[0]) {
                                case 'state': return p_.option($, ($): s_target.Value => $['option']['l entry']['value'])
                                case 'optional value': return p_.option($, ($): s_target.Value => $['selected optional value'])
                                default: return p_.exhaustive($[0])
                            }
                        })))
                        default: return p_.exhaustive($[0])
                    }
                })),
            },
        ),
    ),
}))(
    p_.change_context(
        $['start'],
        ($) => p_.change_context($, ($) => p_.from.state($).decide(($): s_target.Resolver_Value_Constraint.start => {
            switch ($[0]) {
                case 'value': return p_.option($, ($): s_target.Resolver_Value_Constraint.start => p_.change_context(
                    $,
                    ($) => ['value', null],
                ))
                case 'sibling': return p_.option($, ($): s_target.Resolver_Value_Constraint.start => p_.change_context(
                    $,
                    ($) => ['sibling', Resolver_Reference_To_Value_Constraint(
                        $,
                        abort,
                        $l,
                    )],
                ))
                default: return p_.exhaustive($[0])
            }
        })),
    ),
)

export const Resolver_Optional_Value_Initialization: declarations.Resolver_Optional_Value_Initialization = ($, abort, $l, $p) => p_.change_context($, ($) => p_.from.state($).decide(($): s_target.Resolver_Optional_Value_Initialization => {
    switch ($[0]) {
        case 'not set': return p_.option($, ($): s_target.Resolver_Optional_Value_Initialization => p_.change_context(
            $,
            ($) => ['not set', null],
        ))
        case 'set': return p_.option($, ($): s_target.Resolver_Optional_Value_Initialization => p_.change_context(
            $,
            ($) => ['set', Resolver_Guaranteed_Value_Selection(
                $,
                abort,
                $l,
                $p,
            )],
        ))
        case 'selection': return p_.option($, ($): s_target.Resolver_Optional_Value_Initialization => p_.change_context(
            $,
            ($) => ['selection', Resolver_Possible_Value_Selection(
                $,
                abort,
                $l,
                $p,
            )],
        ))
        default: return p_.exhaustive($[0])
    }
}))

export const Resolver_Value_Group: declarations.Resolver_Value_Group = ($, abort, $l, $p) => ((v_required) => p_.from.dictionary(
    $,
).resolve(
    ($, id, $acyclic, $cyclic) => ((v_definition) => ({
        'definition': p_.change_context(
            $['definition'],
            ($) => v_definition,
        ),
        'resolver': p_.change_context(
            $['resolver'],
            ($) => Resolver_Value(
                $,
                abort,
                {
                    'sibling property resolvers': $acyclic,
                    'parent sibling property resolvers': $l['parent sibling property resolvers'],
                },
                {
                    'definition': v_definition['value'],
                    'list cursor': $p['list cursor'],
                    'linked entry': $p['linked entry'],
                    'current dictionary': $p['current dictionary'],
                    'current ordered dictionary': $p['current ordered dictionary'],
                    'signature': $p['signature'],
                    'signatures': $p['signatures'],
                    'types': $p['types'],
                    'option constraints': $p['option constraints'],
                },
            ),
        ),
    }))(
        ((v_lookup_context_4) => p_.from.dictionary(
            $p['definition'],
        ).get_entry(
            id,
            {
                no_such_entry: ($) => abort(
                    {
                        'type': ['lookup', ['no such entry', id]],
                    },
                ),
            },
        ))(
            $,
        ),
    ),
))(
    p_.from.dictionary($p['definition']).map(
        (entry, id) => p_.from.dictionary($).get_entry(id, {
            no_such_entry: () => abort({
                'type': ['missing required entries', p_.literal.dictionary({ [id]: null })],
            }),
        }),
    ),
)

const Result_Type = (
    value: s_target.Value,
    expected: s_target.Type_Reference,
    abort: ($: s_error.Error) => never,
): void => {
    if (value !== expected['resulting type']['root value']) abort({
        type: ['constraint', ['same node', 'result selection must produce the declared result type']],
    })
}

export const Resolver_Result_Selection = (
    $: s_source.Resolver_Result_Selection,
    abort: ($: s_error.Error) => never,
    $l: {
        readonly 'sibling property resolvers': p_.lookup.Acyclic<s_target.Resolver_Value_Group.D>
        readonly 'parent sibling property resolvers': p_.lookup.Acyclic<s_target.Resolver_Value_Group.D>
    },
    $p: s_parameters.Resolver_Value,
    expected: s_target.Type_Reference,
): s_target.Resolver_Result_Selection => {
    switch ($[0]) {
        case 'value': {
            const selection = Resolver_Relative_Value_Selection($[1], abort, { value: $p.definition, types: $p.types })
            Result_Type(selection['resulting node'], expected, abort)
            return ['value', selection]
        }
        case 'context': {
            const selection = Resolver_Guaranteed_Value_Selection($[1], abort, $l, $p)
            Result_Type(selection['resulting node'], expected, abort)
            return ['context', selection]
        }
        default: return p_.exhaustive($[0])
    }
}

export const Resolver_Value_List_Result: declarations.Resolver_Value_List_Result = ($, abort, $l, $p) => {
    const type = Type_Reference($.type, abort, { types: p_.select_lookup.acyclic.from_resolved_dictionary($p.types) }, {})
    const initial = Resolver_Guaranteed_Value_Selection($.initial, abort, $l, $p)
    Result_Type(initial['resulting node'], type, abort)
    return {
        type,
        initial,
        next: Resolver_Result_Selection($.next, abort, $l, { ...$p, 'list cursor': p_.literal.set(type) }, type),
    }
}

export const Value_Results: declarations.Value_Results = ($, abort, $l, $p) => p_.from.optional($).map(($) => p_.from.dictionary($).map(
    ($, id) => Value_Reference(
        $,
        abort,
        $l,
        $p,
    ),
))

export const Option_Constraints: declarations.Option_Constraints = ($, abort, $l, $p) => p_.from.optional($).map(($) => p_.from.dictionary($).map(
    ($, id) => Value_Reference(
        $,
        abort,
        $l,
        $p,
    ),
))

export const Resolver_Guaranteed_Value_Selection: declarations.Resolver_Guaranteed_Value_Selection = ($, abort, $l, $p) => ((v_start) => ((v_tail) => ({
    'start': v_start,
    'tail': v_tail,
    'resulting node': v_tail['resulting node'],
}))(
    Resolver_Relative_Value_Selection(
        $['tail'],
        abort,
        {
            'types': $p.types,
            'value': p_.change_context(v_start, ($) => ((v_state_context_29) => p_.from.state($).decide(($) => {
                switch ($[0]) {
                    case 'sibling': return p_.option($, ($) => $['l entry']['definition']['value'])
                    case 'parent sibling': return p_.option($, ($) => $['l entry']['definition']['value'])
                    case 'parameter': return p_.option($, ($) => $['l entry']['type']['resulting type']['root value'])
                    case 'result': return p_.option($, ($) => p_.change_context($, ($) => p_.from.state($).decide(($) => {
                        switch ($[0]) {
                            case 'list': return p_.option($, ($) => $['list result']['type']['resulting type']['root value'])
                            case 'state': return p_.option($, ($) => $['result']['resulting type']['root value'])
                            case 'optional value': return p_.option($, ($) => $['result']['resulting type']['root value'])
                            default: return p_.exhaustive($[0])
                        }
                    })))
                    case 'list cursor': return p_.option($, ($) => ((v_context_32) => p_.from.optional($p['list cursor']).decide(($) => $['resulting type']['root value'], () => abort(
                        {
                            'type': ['constraint', ['optional value is not set', null]],
                        },
                    )))(
                        v_state_context_29,
                    ))
                    case 'linked entry': return p_.option($, ($) => ((v_context_34) => p_.from.optional($p['linked entry']).decide(($) => $['resulting dictionary']['value'], () => abort(
                        {
                            'type': ['constraint', ['optional value is not set', null]],
                        },
                    )))(
                        v_state_context_29,
                    ))
                    case 'constraint': return p_.option($, ($) => p_.change_context($, ($) => p_.from.state($).decide(($) => {
                        switch ($[0]) {
                            case 'component': return p_.option($, ($) => p_.change_context($['constraint']['l entry']['constraint']['type'], ($) => p_.from.state($).decide(($) => {
                                switch ($[0]) {
                                    case 'state': return p_.option($, ($) => $['option']['l entry']['value'])
                                    case 'optional value': return p_.option($, ($) => $['selected optional value'])
                                    default: return p_.exhaustive($[0])
                                }
                            })))
                            case 'reference': return p_.option($, ($) => p_.change_context($['constraint']['l entry']['constraint']['type'], ($) => p_.from.state($).decide(($) => {
                                switch ($[0]) {
                                    case 'state': return p_.option($, ($) => $['option']['l entry']['value'])
                                    case 'optional value': return p_.option($, ($) => $['selected optional value'])
                                    default: return p_.exhaustive($[0])
                                }
                            })))
                            default: return p_.exhaustive($[0])
                        }
                    })))
                    case 'option constraint': return p_.option($, ($) => p_.change_context($['l entry'], ($) => p_.from.state($).decide(($) => {
                        switch ($[0]) {
                            case 'state': return p_.option($, ($) => $['option']['l entry']['value'])
                            case 'assert is set': return p_.option($, ($) => p_.change_context($, ($) => p_.from.state($).decide(($) => {
                                switch ($[0]) {
                                    case 'parameter': return p_.option($, ($) => $['l entry']['type']['resulting type']['root value'])
                                    case 'result': return p_.option($, ($) => p_.change_context($, ($) => p_.from.state($).decide(($) => {
                                        switch ($[0]) {
                                            case 'state': return p_.option($, ($) => $['result']['resulting type']['root value'])
                                            case 'optional value': return p_.option($, ($) => $['result']['resulting type']['root value'])
                                            default: return p_.exhaustive($[0])
                                        }
                                    })))
                                    default: return p_.exhaustive($[0])
                                }
                            })))
                            default: return p_.exhaustive($[0])
                        }
                    })))
                    default: return p_.exhaustive($[0])
                }
            }))(
                $,
            )),
        },
    ),
))(
    p_.change_context(
        $['start'],
        ($) => p_.change_context($, ($) => p_.from.state($).decide(($): s_target.Resolver_Guaranteed_Value_Selection.start => {
            switch ($[0]) {
                case 'sibling': return p_.option($, ($): s_target.Resolver_Guaranteed_Value_Selection.start => p_.change_context(
                    $,
                    ($) => ['sibling', {
                        'l id': $,
                        'l entry': ((v_lookup_context_3) => $l['sibling property resolvers'].get_entry(
                            $,
                            {
                                no_such_entry: ($) => abort(
                                    {
                                        'type': ['lookup', ['no such entry', v_lookup_context_3]],
                                    },
                                ),
                                no_context_lookup: ($) => abort(
                                    {
                                        'type': ['lookup', ['no context lookup', null]],
                                    },
                                ),
                                cycle_detected: ($) => abort(
                                    {
                                        'type': ['lookup', ['cycle detected', null]],
                                    },
                                ),
                            },
                        ))(
                            $,
                        ),
                    }],
                ))
                case 'parent sibling': return p_.option($, ($): s_target.Resolver_Guaranteed_Value_Selection.start => p_.change_context(
                    $,
                    ($) => ['parent sibling', {
                        'l id': $,
                        'l entry': ((v_lookup_context_4) => $l['parent sibling property resolvers'].get_entry(
                            $,
                            {
                                no_such_entry: ($) => abort(
                                    {
                                        'type': ['lookup', ['no such entry', v_lookup_context_4]],
                                    },
                                ),
                                no_context_lookup: ($) => abort(
                                    {
                                        'type': ['lookup', ['no context lookup', null]],
                                    },
                                ),
                                cycle_detected: ($) => abort(
                                    {
                                        'type': ['lookup', ['cycle detected', null]],
                                    },
                                ),
                            },
                        ))(
                            $,
                        ),
                    }],
                ))
                case 'option constraint': return p_.option($, ($): s_target.Resolver_Guaranteed_Value_Selection.start => p_.change_context(
                    $,
                    ($) => ['option constraint', {
                        'l id': $,
                        'l entry': ((v_lookup_context_7) => p_.from.dictionary(
                            ((v_context_5) => p_.from.optional($p['option constraints']).decide(($) => $, () => abort(
                                {
                                    'type': ['constraint', ['optional value is not set', null]],
                                },
                            )))(
                                $,
                            ),
                        ).get_entry(
                            $,
                            {
                                no_such_entry: ($) => abort(
                                    {
                                        'type': ['lookup', ['no such entry', v_lookup_context_7]],
                                    },
                                ),
                            },
                        ))(
                            $,
                        ),
                    }],
                ))
                case 'list cursor': return p_.option($, ($): s_target.Resolver_Guaranteed_Value_Selection.start => p_.change_context(
                    $,
                    ($) => ['list cursor', null],
                ))
                case 'linked entry': return p_.option($, ($): s_target.Resolver_Guaranteed_Value_Selection.start => p_.change_context(
                    $,
                    ($) => ['linked entry', null],
                ))
                case 'constraint': return p_.option($, ($): s_target.Resolver_Guaranteed_Value_Selection.start => p_.change_context(
                    $,
                    ($) => ['constraint', p_.change_context($, ($) => p_.from.state($).decide(($): s_target.Resolver_Guaranteed_Value_Selection.start.constraint => {
                        switch ($[0]) {
                            case 'component': return p_.option($, ($): s_target.Resolver_Guaranteed_Value_Selection.start.constraint => p_.change_context(
                                $,
                                ($) => ((v_property) => ['component', {
                                    'property': p_.change_context(
                                        $['property'],
                                        ($) => v_property,
                                    ),
                                    'constraint': p_.change_context(
                                        $['constraint'],
                                        ($) => ({
                                            'l id': $,
                                            'l entry': ((v_lookup_context_12) => p_.from.dictionary(
                                                p_.change_context(
                                                    v_property['l entry']['resolver'],
                                                    ($) => ((v_constraint_context_11) => p_.from.state(
                                                        $,
                                                    ).decide(
                                                        ($) => {
                                                            switch ($[0]) {
                                                                case 'component': return p_.option(
                                                                    $,
                                                                    ($) => $['constraints'],
                                                                )
                                                                default: return abort(
                                                                    {
                                                                        'type': ['constraint', ['state', {
                                                                            'expected': "component",
                                                                            'found': v_constraint_context_11[0],
                                                                        }]],
                                                                    },
                                                                )
                                                            }
                                                        },
                                                    ))(
                                                        $,
                                                    ),
                                                ),
                                            ).get_entry(
                                                $,
                                                {
                                                    no_such_entry: ($) => abort(
                                                        {
                                                            'type': ['lookup', ['no such entry', v_lookup_context_12]],
                                                        },
                                                    ),
                                                },
                                            ))(
                                                $,
                                            ),
                                        }),
                                    ),
                                }])(
                                    {
                                        'l id': $['property'],
                                        'l entry': ((v_lookup_context_10) => $l['sibling property resolvers'].get_entry(
                                            $['property'],
                                            {
                                                no_such_entry: ($) => abort(
                                                    {
                                                        'type': ['lookup', ['no such entry', v_lookup_context_10['property']]],
                                                    },
                                                ),
                                                no_context_lookup: ($) => abort(
                                                    {
                                                        'type': ['lookup', ['no context lookup', null]],
                                                    },
                                                ),
                                                cycle_detected: ($) => abort(
                                                    {
                                                        'type': ['lookup', ['cycle detected', null]],
                                                    },
                                                ),
                                            },
                                        ))(
                                            $,
                                        ),
                                    },
                                ),
                            ))
                            case 'reference': return p_.option($, ($): s_target.Resolver_Guaranteed_Value_Selection.start.constraint => p_.change_context(
                                $,
                                ($) => ((v_property) => ['reference', {
                                    'property': p_.change_context(
                                        $['property'],
                                        ($) => v_property,
                                    ),
                                    'constraint': p_.change_context(
                                        $['constraint'],
                                        ($) => ({
                                            'l id': $,
                                            'l entry': ((v_lookup_context_16) => p_.from.dictionary(
                                                p_.change_context(
                                                    v_property['l entry']['resolver'],
                                                    ($) => ((v_constraint_context_14) => p_.from.state(
                                                        $,
                                                    ).decide(
                                                        ($) => {
                                                            switch ($[0]) {
                                                                case 'reference': return p_.option(
                                                                    $,
                                                                    ($) => p_.change_context(
                                                                        $['type'],
                                                                        ($) => ((v_constraint_context_15) => p_.from.state(
                                                                            $,
                                                                        ).decide(
                                                                            ($) => {
                                                                                switch ($[0]) {
                                                                                    case 'selected': return p_.option(
                                                                                        $,
                                                                                        ($) => $['constraints'],
                                                                                    )
                                                                                    default: return abort(
                                                                                        {
                                                                                            'type': ['constraint', ['state', {
                                                                                                'expected': "selected",
                                                                                                'found': v_constraint_context_15[0],
                                                                                            }]],
                                                                                        },
                                                                                    )
                                                                                }
                                                                            },
                                                                        ))(
                                                                            $,
                                                                        ),
                                                                    ),
                                                                )
                                                                default: return abort(
                                                                    {
                                                                        'type': ['constraint', ['state', {
                                                                            'expected': "reference",
                                                                            'found': v_constraint_context_14[0],
                                                                        }]],
                                                                    },
                                                                )
                                                            }
                                                        },
                                                    ))(
                                                        $,
                                                    ),
                                                ),
                                            ).get_entry(
                                                $,
                                                {
                                                    no_such_entry: ($) => abort(
                                                        {
                                                            'type': ['lookup', ['no such entry', v_lookup_context_16]],
                                                        },
                                                    ),
                                                },
                                            ))(
                                                $,
                                            ),
                                        }),
                                    ),
                                }])(
                                    {
                                        'l id': $['property'],
                                        'l entry': ((v_lookup_context_13) => $l['sibling property resolvers'].get_entry(
                                            $['property'],
                                            {
                                                no_such_entry: ($) => abort(
                                                    {
                                                        'type': ['lookup', ['no such entry', v_lookup_context_13['property']]],
                                                    },
                                                ),
                                                no_context_lookup: ($) => abort(
                                                    {
                                                        'type': ['lookup', ['no context lookup', null]],
                                                    },
                                                ),
                                                cycle_detected: ($) => abort(
                                                    {
                                                        'type': ['lookup', ['cycle detected', null]],
                                                    },
                                                ),
                                            },
                                        ))(
                                            $,
                                        ),
                                    },
                                ),
                            ))
                            default: return p_.exhaustive($[0])
                        }
                    }))],
                ))
                case 'parameter': return p_.option($, ($): s_target.Resolver_Guaranteed_Value_Selection.start => p_.change_context(
                    $,
                    ($) => ['parameter', {
                        'l id': $,
                        'l entry': ((v_lookup_context_17) => p_.from.dictionary(
                            $p['signature']['resolved parameters']['types'],
                        ).get_entry(
                            $,
                            {
                                no_such_entry: ($) => abort(
                                    {
                                        'type': ['lookup', ['no such entry', v_lookup_context_17]],
                                    },
                                ),
                            },
                        ))(
                            $,
                        ),
                    }],
                ))
                case 'result': return p_.option($, ($): s_target.Resolver_Guaranteed_Value_Selection.start => p_.change_context(
                    $,
                    ($) => ['result', p_.change_context($, ($) => p_.from.state($).decide(($): s_target.Resolver_Guaranteed_Value_Selection.start.result => {
                        switch ($[0]) {
                            case 'list': return p_.option($, ($): s_target.Resolver_Guaranteed_Value_Selection.start.result => p_.change_context(
                                $,
                                ($) => ((v_property) => ['list', {
                                    'property': p_.change_context(
                                        $['property'],
                                        ($) => v_property,
                                    ),
                                    'list result': p_.change_context(
                                        $['list result'],
                                        ($) => p_.change_context(
                                            v_property['l entry']['resolver'],
                                            ($) => ((v_constraint_context_21) => p_.from.state(
                                                $,
                                            ).decide(
                                                ($) => {
                                                    switch ($[0]) {
                                                        case 'list': return p_.option(
                                                            $,
                                                            ($) => ((v_context_22) => p_.from.optional($['result']).decide(($) => $, () => abort(
                                                                {
                                                                    'type': ['constraint', ['optional value is not set', null]],
                                                                },
                                                            )))(
                                                                v_constraint_context_21,
                                                            ),
                                                        )
                                                        default: return abort(
                                                            {
                                                                'type': ['constraint', ['state', {
                                                                    'expected': "list",
                                                                    'found': v_constraint_context_21[0],
                                                                }]],
                                                            },
                                                        )
                                                    }
                                                },
                                            ))(
                                                $,
                                            ),
                                        ),
                                    ),
                                }])(
                                    {
                                        'l id': $['property'],
                                        'l entry': ((v_lookup_context_20) => $l['sibling property resolvers'].get_entry(
                                            $['property'],
                                            {
                                                no_such_entry: ($) => abort(
                                                    {
                                                        'type': ['lookup', ['no such entry', v_lookup_context_20['property']]],
                                                    },
                                                ),
                                                no_context_lookup: ($) => abort(
                                                    {
                                                        'type': ['lookup', ['no context lookup', null]],
                                                    },
                                                ),
                                                cycle_detected: ($) => abort(
                                                    {
                                                        'type': ['lookup', ['cycle detected', null]],
                                                    },
                                                ),
                                            },
                                        ))(
                                            $,
                                        ),
                                    },
                                ),
                            ))
                            case 'state': return p_.option($, ($): s_target.Resolver_Guaranteed_Value_Selection.start.result => p_.change_context(
                                $,
                                ($) => p_.change_context(Resolver_Possible_Value_Selection(
                                    ['result', ['state', $]],
                                    abort,
                                    $l,
                                    $p,
                                ), ($) => ((v_constraint_context_25) => p_.from.state(
                                    $,
                                ).decide(
                                    ($) => {
                                        switch ($[0]) {
                                            case 'result': return p_.option(
                                                $,
                                                ($) => $,
                                            )
                                            default: return abort(
                                                {
                                                    'type': ['constraint', ['state', {
                                                        'expected': "result",
                                                        'found': v_constraint_context_25[0],
                                                    }]],
                                                },
                                            )
                                        }
                                    },
                                ))(
                                    $,
                                )),
                            ))
                            case 'optional value': return p_.option($, ($): s_target.Resolver_Guaranteed_Value_Selection.start.result => p_.change_context(
                                $,
                                ($) => p_.change_context(Resolver_Possible_Value_Selection(
                                    ['result', ['optional value', $]],
                                    abort,
                                    $l,
                                    $p,
                                ), ($) => ((v_constraint_context_27) => p_.from.state(
                                    $,
                                ).decide(
                                    ($) => {
                                        switch ($[0]) {
                                            case 'result': return p_.option(
                                                $,
                                                ($) => $,
                                            )
                                            default: return abort(
                                                {
                                                    'type': ['constraint', ['state', {
                                                        'expected': "result",
                                                        'found': v_constraint_context_27[0],
                                                    }]],
                                                },
                                            )
                                        }
                                    },
                                ))(
                                    $,
                                )),
                            ))
                            default: return p_.exhaustive($[0])
                        }
                    }))],
                ))
                default: return p_.exhaustive($[0])
            }
        })),
    ),
)

export const Resolver_Possible_Value_Selection: declarations.Resolver_Possible_Value_Selection = ($, abort, $l, $p) => p_.change_context($, ($) => p_.from.state($).decide(($): s_target.Resolver_Possible_Value_Selection => {
    switch ($[0]) {
        case 'parameter': return p_.option($, ($): s_target.Resolver_Possible_Value_Selection => p_.change_context(
            $,
            ($) => ['parameter', {
                'l id': $,
                'l entry': ((v_lookup_context_3) => p_.from.dictionary(
                    $p['signature']['resolved parameters']['types'],
                ).get_entry(
                    $,
                    {
                        no_such_entry: ($) => abort(
                            {
                                'type': ['lookup', ['no such entry', v_lookup_context_3]],
                            },
                        ),
                    },
                ))(
                    $,
                ),
            }],
        ))
        case 'result': return p_.option($, ($): s_target.Resolver_Possible_Value_Selection => p_.change_context(
            $,
            ($) => ['result', p_.change_context($, ($) => p_.from.state($).decide(($): s_target.Resolver_Possible_Value_Selection.result => {
                switch ($[0]) {
                    case 'state': return p_.option($, ($): s_target.Resolver_Possible_Value_Selection.result => p_.change_context(
                        $,
                        ($) => ((v_property) => ['state', {
                            'property': p_.change_context(
                                $['property'],
                                ($) => v_property,
                            ),
                            'state': p_.change_context(
                                $['state'],
                                ($) => p_.change_context(
                                    v_property['l entry']['resolver'],
                                    ($) => ((v_constraint_context_7) => p_.from.state(
                                        $,
                                    ).decide(
                                        ($) => {
                                            switch ($[0]) {
                                                case 'state': return p_.option(
                                                    $,
                                                    ($) => $,
                                                )
                                                default: return abort(
                                                    {
                                                        'type': ['constraint', ['state', {
                                                            'expected': "state",
                                                            'found': v_constraint_context_7[0],
                                                        }]],
                                                    },
                                                )
                                            }
                                        },
                                    ))(
                                        $,
                                    ),
                                ),
                            ),
                            'result': p_.change_context(
                                $['result'],
                                ($) => Type_Reference(
                                    $,
                                    abort,
                                    {
                                        'types': p_.select_lookup.acyclic.from_resolved_dictionary(
                                            $p['types'],
                                        ),
                                    },
                                    {
                                        
                                    },
                                ),
                            ),
                        }])(
                            {
                                'l id': $['property'],
                                'l entry': ((v_lookup_context_6) => $l['sibling property resolvers'].get_entry(
                                    $['property'],
                                    {
                                        no_such_entry: ($) => abort(
                                            {
                                                'type': ['lookup', ['no such entry', v_lookup_context_6['property']]],
                                            },
                                        ),
                                        no_context_lookup: ($) => abort(
                                            {
                                                'type': ['lookup', ['no context lookup', null]],
                                            },
                                        ),
                                        cycle_detected: ($) => abort(
                                            {
                                                'type': ['lookup', ['cycle detected', null]],
                                            },
                                        ),
                                    },
                                ))(
                                    $,
                                ),
                            },
                        ),
                    ))
                    case 'optional value': return p_.option($, ($): s_target.Resolver_Possible_Value_Selection.result => p_.change_context(
                        $,
                        ($) => ((v_property) => ['optional value', {
                            'property': p_.change_context(
                                $['property'],
                                ($) => v_property,
                            ),
                            'optional value': p_.change_context(
                                $['optional value'],
                                ($) => p_.change_context(
                                    v_property['l entry']['resolver'],
                                    ($) => ((v_constraint_context_9) => p_.from.state(
                                        $,
                                    ).decide(
                                        ($) => {
                                            switch ($[0]) {
                                                case 'optional': return p_.option(
                                                    $,
                                                    ($) => $,
                                                )
                                                default: return abort(
                                                    {
                                                        'type': ['constraint', ['state', {
                                                            'expected': "optional",
                                                            'found': v_constraint_context_9[0],
                                                        }]],
                                                    },
                                                )
                                            }
                                        },
                                    ))(
                                        $,
                                    ),
                                ),
                            ),
                            'result': p_.change_context(
                                $['result'],
                                ($) => Type_Reference(
                                    $,
                                    abort,
                                    {
                                        'types': p_.select_lookup.acyclic.from_resolved_dictionary(
                                            $p['types'],
                                        ),
                                    },
                                    {
                                        
                                    },
                                ),
                            ),
                        }])(
                            {
                                'l id': $['property'],
                                'l entry': ((v_lookup_context_8) => $l['sibling property resolvers'].get_entry(
                                    $['property'],
                                    {
                                        no_such_entry: ($) => abort(
                                            {
                                                'type': ['lookup', ['no such entry', v_lookup_context_8['property']]],
                                            },
                                        ),
                                        no_context_lookup: ($) => abort(
                                            {
                                                'type': ['lookup', ['no context lookup', null]],
                                            },
                                        ),
                                        cycle_detected: ($) => abort(
                                            {
                                                'type': ['lookup', ['cycle detected', null]],
                                            },
                                        ),
                                    },
                                ))(
                                    $,
                                ),
                            },
                        ),
                    ))
                    default: return p_.exhaustive($[0])
                }
            }))],
        ))
        default: return p_.exhaustive($[0])
    }
}))

export const Basic_Types: declarations.Basic_Types = ($, abort) =>
    p_.from.dictionary($).map(($) => Basic_Type($, abort));
