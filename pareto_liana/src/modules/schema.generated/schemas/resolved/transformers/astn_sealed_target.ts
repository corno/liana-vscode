
import * as p_ from 'pareto-core/transformer'


import p_change_context from 'pareto-core/refiner/specials/change_context'

import _p_text_from_list from 'pareto-core/transformer/specials/text_from_list'

import type * as s_in from "../schema.js"
namespace t_signatures {
    export type Package = p_.Transformer<
        s_in.Package,
        s_out.Value
    >
    export type Schemas = p_.Transformer<
        s_in.Schemas,
        s_out.Value
    >
    export type Schema = p_.Transformer<
        s_in.Schema,
        s_out.Value
    >
    export type Schema_Imports = p_.Transformer<
        s_in.Schema_Imports,
        s_out.Value
    >
    export type Modules = p_.Transformer<
        s_in.Modules,
        s_out.Value
    >
    export type Globals = p_.Transformer<
        s_in.Globals,
        s_out.Value
    >
    export type Dictionary = p_.Transformer<
        s_in.Dictionary,
        s_out.Value
    >
    export type Value = p_.Transformer<
        s_in.Value,
        s_out.Value
    >
    export type Resolver = p_.Transformer<
        s_in.Resolver,
        s_out.Value
    >
    export type Resolver_Imports = p_.Transformer<
        s_in.Resolver_Imports,
        s_out.Value
    >
    export type Resolver_Signatures = p_.Transformer<
        s_in.Resolver_Signatures,
        s_out.Value
    >
    export type Resolver_Signature_Parameters = p_.Transformer<
        s_in.Resolver_Signature_Parameters,
        s_out.Value
    >
    export type Resolver_Value = p_.Transformer<
        s_in.Resolver_Value,
        s_out.Value
    >
    export type Module_Specification = p_.Transformer<
        s_in.Module_Specification,
        s_out.Value
    >
    export type Schema_Tree = p_.Transformer<
        s_in.Schema_Tree,
        s_out.Value
    >
    export type Text_Type = p_.Transformer<
        s_in.Text_Type,
        s_out.Value
    >
    export type Simple_Type = p_.Transformer<
        s_in.Simple_Type,
        s_out.Value
    >
    export type Module = p_.Transformer<
        s_in.Module,
        s_out.Value
    >
    export type Presence = p_.Transformer<
        s_in.Presence,
        s_out.Value
    >
    export type Resolver_Modules = p_.Transformer<
        s_in.Resolver_Modules,
        s_out.Value
    >
    export type Resolver_Benchmark = p_.Transformer<
        s_in.Resolver_Benchmark,
        s_out.Value
    >
    export type Group = p_.Transformer<
        s_in.Group,
        s_out.Value
    >
    export type Value_Reference = p_.Transformer<
        s_in.Value_Reference,
        s_out.Value
    >
    export type Value_Path = p_.Transformer<
        s_in.Value_Path,
        s_out.Value
    >
    export type Module_Reference = p_.Transformer<
        s_in.Module_Reference,
        s_out.Value
    >
    export type Resolver_Signature = p_.Transformer<
        s_in.Resolver_Signature,
        s_out.Value
    >
    export type Resolver_Relative_Value_Selection = p_.Transformer<
        s_in.Resolver_Relative_Value_Selection,
        s_out.Value
    >
    export type Resolver_Lookup_Selection = p_.Transformer<
        s_in.Resolver_Lookup_Selection,
        s_out.Value
    >
    export type Resolver_Constraint = p_.Transformer<
        s_in.Resolver_Constraint,
        s_out.Value
    >
    export type Resolver_Option_Constraints = p_.Transformer<
        s_in.Resolver_Option_Constraints,
        s_out.Value
    >
    export type Resolver_Optional_Value_Constraints = p_.Transformer<
        s_in.Resolver_Optional_Value_Constraints,
        s_out.Value
    >
    export type Resolver_Value_Constraints = p_.Transformer<
        s_in.Resolver_Value_Constraints,
        s_out.Value
    >
    export type Resolver_Reference_To_Value_Constraint = p_.Transformer<
        s_in.Resolver_Reference_To_Value_Constraint,
        s_out.Value
    >
    export type Resolver_Value_Constraint = p_.Transformer<
        s_in.Resolver_Value_Constraint,
        s_out.Value
    >
    export type Resolver_Optional_Value_Initialization = p_.Transformer<
        s_in.Resolver_Optional_Value_Initialization,
        s_out.Value
    >
    export type Resolver_Value_Group = p_.Transformer<
        s_in.Resolver_Value_Group,
        s_out.Value
    >
    export type Resolver_Value_List_Result = p_.Transformer<
        s_in.Resolver_Value_List_Result,
        s_out.Value
    >
    export type Value_Results = p_.Transformer<
        s_in.Value_Results,
        s_out.Value
    >
    export type Option_Constraints = p_.Transformer<
        s_in.Option_Constraints,
        s_out.Value
    >
    export type Resolver_Guaranteed_Value_Selection = p_.Transformer<
        s_in.Resolver_Guaranteed_Value_Selection,
        s_out.Value
    >
    export type Resolver_Possible_Value_Selection = p_.Transformer<
        s_in.Resolver_Possible_Value_Selection,
        s_out.Value
    >
}

import * as s_out from "astn-runtime/modules/serialization/schemas/sealed_target/schema"

import * as v_primitives_to_text from "liana-runtime/modules/serialization/schemas/primitives/serializers"

export const Package: t_signatures.Package = ($) => ['group', ['verbose', p_.literal.dictionary(
    {
        "omit (de)serializer": p_change_context(
            $['omit (de)serializer'],
            ($) => ['text', {
                'delimiter': ['none', null],
                'value': v_primitives_to_text.true_false(
                    $,
                ),
            }],
        ),
        "schema tree": p_change_context(
            $['schema tree'],
            ($) => Schema_Tree(
                $,
            ),
        ),
    },
)]]

export const Schemas: t_signatures.Schemas = ($) => ['dictionary', p_.from.dictionary($,
).map(
    ($, id) => Schema_Tree(
        $,
    ),
)]

export const Schema: t_signatures.Schema = ($) => ['group', ['verbose', p_.literal.dictionary(
    {
        "schema imports": p_change_context(
            $['schema imports'],
            ($) => Schema_Imports(
                $,
            ),
        ),
        "resolver imports": p_change_context(
            $['resolver imports'],
            ($) => Resolver_Imports(
                $,
            ),
        ),
        "globals": p_change_context(
            $['globals'],
            ($) => Globals(
                $,
            ),
        ),
        "types": p_change_context(
            $['types'],
            ($) => Modules(
                $,
            ),
        ),
        "complexity": p_change_context(
            $['complexity'],
            ($) => ['state', p_.from.state($).decide(
                ($): s_out.Value.state => {
                    switch ($[0]) {
                        case 'constrained': return p_.option(
                            $,
                            ($) => ({
                                'option': 'constrained',
                                'value': Resolver(
                                    $,
                                ),
                            }),
                        )
                        case 'unconstrained': return p_.option(
                            $,
                            ($) => ({
                                'option': 'unconstrained',
                                'value': ['nothing', null],
                            }),
                        )
                        default: return p_.exhaustive(
                            $[0],
                        )
                    }
                },
            )],
        ),
    },
)]]

export const Schema_Imports: t_signatures.Schema_Imports = ($) => ['dictionary', p_.from.dictionary($,
).map(
    ($, id): s_out.Value => ['group', ['verbose', p_.literal.dictionary(
        {
            "schema set child": p_change_context(
                $['schema set child'],
                ($) => ['reference', {
                    'delimiter': ['apostrophe', null],
                    'value': $['l value']['l id'],
                }],
            ),
            "schema": p_change_context(
                $['schema'],
                ($) => ['nothing', null],
            ),
        },
    )]],
)]

export const Modules: t_signatures.Modules = ($) => ['dictionary', p_.from.dictionary($,
).map(
    ($, id) => Module(
        $,
    ),
)]

export const Globals: t_signatures.Globals = ($) => ['group', ['verbose', p_.literal.dictionary(
    {
        "complexity": p_change_context(
            $['complexity'],
            ($) => ['state', p_.from.state($).decide(
                ($): s_out.Value.state => {
                    switch ($[0]) {
                        case 'constrained': return p_.option(
                            $,
                            ($) => ({
                                'option': 'constrained',
                                'value': ['nothing', null],
                            }),
                        )
                        case 'unconstrained': return p_.option(
                            $,
                            ($) => ({
                                'option': 'unconstrained',
                                'value': ['nothing', null],
                            }),
                        )
                        default: return p_.exhaustive(
                            $[0],
                        )
                    }
                },
            )],
        ),
        "text types": p_change_context(
            $['text types'],
            ($) => ['dictionary', p_.from.dictionary($,
            ).map(
                ($, id) => Text_Type(
                    $,
                ),
            )],
        ),
        "simple types": p_change_context(
            $['simple types'],
            ($) => ['dictionary', p_.from.dictionary($,
            ).map(
                ($, id) => Simple_Type(
                    $,
                ),
            )],
        ),
    },
)]]

export const Dictionary: t_signatures.Dictionary = ($) => ['group', ['verbose', p_.literal.dictionary(
    {
        "value": p_change_context(
            $['value'],
            ($) => Value(
                $,
            ),
        ),
    },
)]]

export const Value: t_signatures.Value = ($) => ['state', p_.from.state($).decide(
    ($): s_out.Value.state => {
        switch ($[0]) {
            case 'component': return p_.option(
                $,
                ($) => ({
                    'option': 'component',
                    'value': ['group', ['verbose', p_.literal.dictionary(
                        {
                            "type": p_change_context(
                                $['type'],
                                ($) => ['state', p_.from.state($).decide(
                                    ($): s_out.Value.state => {
                                        switch ($[0]) {
                                            case 'external': return p_.option(
                                                $,
                                                ($) => ({
                                                    'option': 'external',
                                                    'value': ['group', ['verbose', p_.literal.dictionary(
                                                        {
                                                            "import": p_change_context(
                                                                $['import'],
                                                                ($) => ['reference', {
                                                                    'delimiter': ['apostrophe', null],
                                                                    'value': $['l id'],
                                                                }],
                                                            ),
                                                            "module": p_change_context(
                                                                $['module'],
                                                                ($) => ['reference', {
                                                                    'delimiter': ['apostrophe', null],
                                                                    'value': $['l id'],
                                                                }],
                                                            ),
                                                        },
                                                    )]],
                                                }),
                                            )
                                            case 'internal': return p_.option(
                                                $,
                                                ($) => ({
                                                    'option': 'internal',
                                                    'value': ['reference', {
                                                        'value': $['l id'],
                                                    }],
                                                }),
                                            )
                                            case 'internal acyclic': return p_.option(
                                                $,
                                                ($) => ({
                                                    'option': 'internal acyclic',
                                                    'value': ['reference', {
                                                        'value': $['l id'],
                                                    }],
                                                }),
                                            )
                                            default: return p_.exhaustive(
                                                $[0],
                                            )
                                        }
                                    },
                                )],
                            ),
                            "results": p_change_context(
                                $['results'],
                                ($) => Value_Results(
                                    $,
                                ),
                            ),
                        },
                    )]],
                }),
            )
            case 'dictionary': return p_.option(
                $,
                ($) => ({
                    'option': 'dictionary',
                    'value': Dictionary(
                        $,
                    ),
                }),
            )
            case 'group': return p_.option(
                $,
                ($) => ({
                    'option': 'group',
                    'value': Group(
                        $,
                    ),
                }),
            )
            case 'list': return p_.option(
                $,
                ($) => ({
                    'option': 'list',
                    'value': ['group', ['verbose', p_.literal.dictionary(
                        {
                            "value": p_change_context(
                                $['value'],
                                ($) => Value(
                                    $,
                                ),
                            ),
                            "results": p_change_context(
                                $['results'],
                                ($) => Value_Results(
                                    $,
                                ),
                            ),
                        },
                    )]],
                }),
            )
            case 'nothing': return p_.option(
                $,
                ($) => ({
                    'option': 'nothing',
                    'value': ['nothing', null],
                }),
            )
            case 'simple': return p_.option(
                $,
                ($) => ({
                    'option': 'simple',
                    'value': ['state', p_.from.state($).decide(
                        ($): s_out.Value.state => {
                            switch ($[0]) {
                                case 'global': return p_.option(
                                    $,
                                    ($) => ({
                                        'option': 'global',
                                        'value': ['reference', {
                                            'value': $['l id'],
                                        }],
                                    }),
                                )
                                default: return p_.exhaustive(
                                    $[0],
                                )
                            }
                        },
                    )],
                }),
            )
            case 'optional': return p_.option(
                $,
                ($) => ({
                    'option': 'optional',
                    'value': Value(
                        $,
                    ),
                }),
            )
            case 'reference': return p_.option(
                $,
                ($) => ({
                    'option': 'reference',
                    'value': ['group', ['verbose', p_.literal.dictionary(
                        {
                            "referent": p_change_context(
                                $['referent'],
                                ($) => Value_Reference(
                                    $,
                                ),
                            ),
                            "type": p_change_context(
                                $['type'],
                                ($) => ['state', p_.from.state($).decide(
                                    ($): s_out.Value.state => {
                                        switch ($[0]) {
                                            case 'derived': return p_.option(
                                                $,
                                                ($) => ({
                                                    'option': 'derived',
                                                    'value': ['nothing', null],
                                                }),
                                            )
                                            case 'selected': return p_.option(
                                                $,
                                                ($) => ({
                                                    'option': 'selected',
                                                    'value': ['group', ['verbose', p_.literal.dictionary(
                                                        {
                                                            "dictionary": p_change_context(
                                                                $['dictionary'],
                                                                ($) => ['nothing', null],
                                                            ),
                                                            "dependency": p_change_context(
                                                                $['dependency'],
                                                                ($) => ['state', p_.from.state($).decide(
                                                                    ($): s_out.Value.state => {
                                                                        switch ($[0]) {
                                                                            case 'acyclic': return p_.option(
                                                                                $,
                                                                                ($) => ({
                                                                                    'option': 'acyclic',
                                                                                    'value': ['nothing', null],
                                                                                }),
                                                                            )
                                                                            case 'cyclic': return p_.option(
                                                                                $,
                                                                                ($) => ({
                                                                                    'option': 'cyclic',
                                                                                    'value': ['nothing', null],
                                                                                }),
                                                                            )
                                                                            case 'stack': return p_.option(
                                                                                $,
                                                                                ($) => ({
                                                                                    'option': 'stack',
                                                                                    'value': ['nothing', null],
                                                                                }),
                                                                            )
                                                                            default: return p_.exhaustive(
                                                                                $[0],
                                                                            )
                                                                        }
                                                                    },
                                                                )],
                                                            ),
                                                            "results": p_change_context(
                                                                $['results'],
                                                                ($) => Value_Results(
                                                                    $,
                                                                ),
                                                            ),
                                                        },
                                                    )]],
                                                }),
                                            )
                                            default: return p_.exhaustive(
                                                $[0],
                                            )
                                        }
                                    },
                                )],
                            ),
                        },
                    )]],
                }),
            )
            case 'state': return p_.option(
                $,
                ($) => ({
                    'option': 'state',
                    'value': ['group', ['verbose', p_.literal.dictionary(
                        {
                            "options": p_change_context(
                                $['options'],
                                ($) => ['dictionary', p_.from.dictionary($,
                                ).map(
                                    ($, id): s_out.Value => ['group', ['verbose', p_.literal.dictionary(
                                        {
                                            "constraints": p_change_context(
                                                $['constraints'],
                                                ($) => Option_Constraints(
                                                    $,
                                                ),
                                            ),
                                            "description": p_change_context(
                                                $['description'],
                                                ($) => ['optional', p_.from.optional($).decide(
                                                    ($): s_out.Value.optional => ['set', ['text', {
                                                        'delimiter': ['quote', null],
                                                        'value': $,
                                                    }]],
                                                    () => ['not set', null],
                                                )],
                                            ),
                                            "value": p_change_context(
                                                $['value'],
                                                ($) => Value(
                                                    $,
                                                ),
                                            ),
                                        },
                                    )]],
                                )],
                            ),
                            "results": p_change_context(
                                $['results'],
                                ($) => Value_Results(
                                    $,
                                ),
                            ),
                        },
                    )]],
                }),
            )
            case 'text': return p_.option(
                $,
                ($) => ({
                    'option': 'text',
                    'value': ['state', p_.from.state($).decide(
                        ($): s_out.Value.state => {
                            switch ($[0]) {
                                case 'global': return p_.option(
                                    $,
                                    ($) => ({
                                        'option': 'global',
                                        'value': ['reference', {
                                            'value': $['l id'],
                                        }],
                                    }),
                                )
                                case 'local': return p_.option(
                                    $,
                                    ($) => ({
                                        'option': 'local',
                                        'value': Text_Type(
                                            $,
                                        ),
                                    }),
                                )
                                default: return p_.exhaustive(
                                    $[0],
                                )
                            }
                        },
                    )],
                }),
            )
            default: return p_.exhaustive(
                $[0],
            )
        }
    },
)]

export const Resolver: t_signatures.Resolver = ($) => ['group', ['verbose', p_.literal.dictionary(
    {
        "signatures": p_change_context(
            $['signatures'],
            ($) => ['group', ['verbose', p_.literal.dictionary(
                {
                    "signatures": p_change_context(
                        $['signatures'],
                        ($) => Resolver_Signatures(
                            $,
                        ),
                    ),
                },
            )]],
        ),
        "modules": p_change_context(
            $['modules'],
            ($) => Resolver_Modules(
                $,
            ),
        ),
    },
)]]

export const Resolver_Imports: t_signatures.Resolver_Imports = ($) => ['dictionary', p_.from.dictionary($,
).map(
    ($, id): s_out.Value => ['group', ['verbose', p_.literal.dictionary(
        {
            "schema set child": p_change_context(
                $['schema set child'],
                ($) => ['reference', {
                    'delimiter': ['apostrophe', null],
                    'value': $['l value']['l id'],
                }],
            ),
            "resolver": p_change_context(
                $['resolver'],
                ($) => ['nothing', null],
            ),
        },
    )]],
)]

export const Resolver_Signatures: t_signatures.Resolver_Signatures = ($) => ['dictionary', p_.from.dictionary($,
).map(
    ($, id) => Resolver_Signature(
        $,
    ),
)]

export const Resolver_Signature_Parameters: t_signatures.Resolver_Signature_Parameters = ($) => ['group', ['verbose', p_.literal.dictionary(
    {
        "modules": p_change_context(
            $['modules'],
            ($) => ['dictionary', p_.from.dictionary($,
            ).map(
                ($, id): s_out.Value => ['group', ['verbose', p_.literal.dictionary(
                    {
                        "module": p_change_context(
                            $['module'],
                            ($) => Module_Reference(
                                $,
                            ),
                        ),
                        "presence": p_change_context(
                            $['presence'],
                            ($) => Presence(
                                $,
                            ),
                        ),
                    },
                )]],
            )],
        ),
        "lookups": p_change_context(
            $['lookups'],
            ($) => ['dictionary', p_.from.dictionary($,
            ).map(
                ($, id): s_out.Value => ['group', ['verbose', p_.literal.dictionary(
                    {
                        "referent": p_change_context(
                            $['referent'],
                            ($) => Module_Reference(
                                $,
                            ),
                        ),
                        "dictionary": p_change_context(
                            $['dictionary'],
                            ($) => ['nothing', null],
                        ),
                        "type": p_change_context(
                            $['type'],
                            ($) => ['state', p_.from.state($).decide(
                                ($): s_out.Value.state => {
                                    switch ($[0]) {
                                        case 'cyclic': return p_.option(
                                            $,
                                            ($) => ({
                                                'option': 'cyclic',
                                                'value': ['nothing', null],
                                            }),
                                        )
                                        case 'acyclic': return p_.option(
                                            $,
                                            ($) => ({
                                                'option': 'acyclic',
                                                'value': ['nothing', null],
                                            }),
                                        )
                                        case 'stack': return p_.option(
                                            $,
                                            ($) => ({
                                                'option': 'stack',
                                                'value': ['nothing', null],
                                            }),
                                        )
                                        default: return p_.exhaustive(
                                            $[0],
                                        )
                                    }
                                },
                            )],
                        ),
                        "presence": p_change_context(
                            $['presence'],
                            ($) => Presence(
                                $,
                            ),
                        ),
                    },
                )]],
            )],
        ),
    },
)]]

export const Resolver_Value: t_signatures.Resolver_Value = ($) => ['state', p_.from.state($).decide(
    ($): s_out.Value.state => {
        switch ($[0]) {
            case 'component': return p_.option(
                $,
                ($) => ({
                    'option': 'component',
                    'value': ['group', ['verbose', p_.literal.dictionary(
                        {
                            "definition": p_change_context(
                                $['definition'],
                                ($) => ['nothing', null],
                            ),
                            "location": p_change_context(
                                $['location'],
                                ($) => ['state', p_.from.state($).decide(
                                    ($): s_out.Value.state => {
                                        switch ($[0]) {
                                            case 'external': return p_.option(
                                                $,
                                                ($) => ({
                                                    'option': 'external',
                                                    'value': ['group', ['verbose', p_.literal.dictionary(
                                                        {
                                                            "schema import": p_change_context(
                                                                $['schema import'],
                                                                ($) => ['reference', {
                                                                    'delimiter': ['apostrophe', null],
                                                                    'value': $['l id'],
                                                                }],
                                                            ),
                                                            "resolver import": p_change_context(
                                                                $['resolver import'],
                                                                ($) => ['reference', {
                                                                    'delimiter': ['apostrophe', null],
                                                                    'value': $['l id'],
                                                                }],
                                                            ),
                                                            "signature": p_change_context(
                                                                $['signature'],
                                                                ($) => ['reference', {
                                                                    'delimiter': ['apostrophe', null],
                                                                    'value': $['l id'],
                                                                }],
                                                            ),
                                                        },
                                                    )]],
                                                }),
                                            )
                                            case 'internal': return p_.option(
                                                $,
                                                ($) => ({
                                                    'option': 'internal',
                                                    'value': ['reference', {
                                                        'value': $['l id'],
                                                    }],
                                                }),
                                            )
                                            default: return p_.exhaustive(
                                                $[0],
                                            )
                                        }
                                    },
                                )],
                            ),
                            "signature": p_change_context(
                                $['signature'],
                                ($) => ['nothing', null],
                            ),
                            "arguments": p_change_context(
                                $['arguments'],
                                ($) => ['optional', p_.from.optional($).decide(
                                    ($): s_out.Value.optional => ['set', ['group', ['verbose', p_.literal.dictionary(
                                        {
                                            "modules": p_change_context(
                                                $['modules'],
                                                ($) => ['optional', p_.from.optional($).decide(
                                                    ($): s_out.Value.optional => ['set', ['dictionary', p_.from.dictionary($,
                                                    ).map(
                                                        ($, id): s_out.Value => ['state', p_.from.state($).decide(
                                                            ($): s_out.Value.state => {
                                                                switch ($[0]) {
                                                                    case 'optional': return p_.option(
                                                                        $,
                                                                        ($) => ({
                                                                            'option': 'optional',
                                                                            'value': Resolver_Optional_Value_Initialization(
                                                                                $,
                                                                            ),
                                                                        }),
                                                                    )
                                                                    case 'required': return p_.option(
                                                                        $,
                                                                        ($) => ({
                                                                            'option': 'required',
                                                                            'value': Resolver_Guaranteed_Value_Selection(
                                                                                $,
                                                                            ),
                                                                        }),
                                                                    )
                                                                    case 'parameter': return p_.option(
                                                                        $,
                                                                        ($) => ({
                                                                            'option': 'parameter',
                                                                            'value': ['reference', {
                                                                                'value': $['l id'],
                                                                            }],
                                                                        }),
                                                                    )
                                                                    default: return p_.exhaustive(
                                                                        $[0],
                                                                    )
                                                                }
                                                            },
                                                        )],
                                                    )]],
                                                    () => ['not set', null],
                                                )],
                                            ),
                                            "lookups": p_change_context(
                                                $['lookups'],
                                                ($) => ['optional', p_.from.optional($).decide(
                                                    ($): s_out.Value.optional => ['set', ['dictionary', p_.from.dictionary($,
                                                    ).map(
                                                        ($, id): s_out.Value => ['state', p_.from.state($).decide(
                                                            ($): s_out.Value.state => {
                                                                switch ($[0]) {
                                                                    case 'stack': return p_.option(
                                                                        $,
                                                                        ($) => ({
                                                                            'option': 'stack',
                                                                            'value': ['state', p_.from.state($).decide(
                                                                                ($): s_out.Value.state => {
                                                                                    switch ($[0]) {
                                                                                        case 'empty': return p_.option(
                                                                                            $,
                                                                                            ($) => ({
                                                                                                'option': 'empty',
                                                                                                'value': ['nothing', null],
                                                                                            }),
                                                                                        )
                                                                                        case 'push': return p_.option(
                                                                                            $,
                                                                                            ($) => ({
                                                                                                'option': 'push',
                                                                                                'value': ['group', ['verbose', p_.literal.dictionary(
                                                                                                    {
                                                                                                        "stack": p_change_context(
                                                                                                            $['stack'],
                                                                                                            ($) => Resolver_Lookup_Selection(
                                                                                                                $,
                                                                                                            ),
                                                                                                        ),
                                                                                                        "item": p_change_context(
                                                                                                            $['item'],
                                                                                                            ($) => Resolver_Lookup_Selection(
                                                                                                                $,
                                                                                                            ),
                                                                                                        ),
                                                                                                    },
                                                                                                )]],
                                                                                            }),
                                                                                        )
                                                                                        default: return p_.exhaustive(
                                                                                            $[0],
                                                                                        )
                                                                                    }
                                                                                },
                                                                            )],
                                                                        }),
                                                                    )
                                                                    case 'acyclic': return p_.option(
                                                                        $,
                                                                        ($) => ({
                                                                            'option': 'acyclic',
                                                                            'value': ['state', p_.from.state($).decide(
                                                                                ($): s_out.Value.state => {
                                                                                    switch ($[0]) {
                                                                                        case 'not set': return p_.option(
                                                                                            $,
                                                                                            ($) => ({
                                                                                                'option': 'not set',
                                                                                                'value': ['nothing', null],
                                                                                            }),
                                                                                        )
                                                                                        default: return p_.exhaustive(
                                                                                            $[0],
                                                                                        )
                                                                                    }
                                                                                },
                                                                            )],
                                                                        }),
                                                                    )
                                                                    case 'cyclic': return p_.option(
                                                                        $,
                                                                        ($) => ({
                                                                            'option': 'cyclic',
                                                                            'value': ['state', p_.from.state($).decide(
                                                                                ($): s_out.Value.state => {
                                                                                    switch ($[0]) {
                                                                                        case 'not set': return p_.option(
                                                                                            $,
                                                                                            ($) => ({
                                                                                                'option': 'not set',
                                                                                                'value': ['nothing', null],
                                                                                            }),
                                                                                        )
                                                                                        default: return p_.exhaustive(
                                                                                            $[0],
                                                                                        )
                                                                                    }
                                                                                },
                                                                            )],
                                                                        }),
                                                                    )
                                                                    case 'selection': return p_.option(
                                                                        $,
                                                                        ($) => ({
                                                                            'option': 'selection',
                                                                            'value': Resolver_Lookup_Selection(
                                                                                $,
                                                                            ),
                                                                        }),
                                                                    )
                                                                    default: return p_.exhaustive(
                                                                        $[0],
                                                                    )
                                                                }
                                                            },
                                                        )],
                                                    )]],
                                                    () => ['not set', null],
                                                )],
                                            ),
                                        },
                                    )]]],
                                    () => ['not set', null],
                                )],
                            ),
                            "constraints": p_change_context(
                                $['constraints'],
                                ($) => Resolver_Value_Constraints(
                                    $,
                                ),
                            ),
                        },
                    )]],
                }),
            )
            case 'dictionary': return p_.option(
                $,
                ($) => ({
                    'option': 'dictionary',
                    'value': ['group', ['verbose', p_.literal.dictionary(
                        {
                            "definition": p_change_context(
                                $['definition'],
                                ($) => ['nothing', null],
                            ),
                            "resolver": p_change_context(
                                $['resolver'],
                                ($) => Resolver_Value(
                                    $,
                                ),
                            ),
                            "benchmark": p_change_context(
                                $['benchmark'],
                                ($) => ['optional', p_.from.optional($).decide(
                                    ($): s_out.Value.optional => ['set', Resolver_Benchmark(
                                        $,
                                    )],
                                    () => ['not set', null],
                                )],
                            ),
                        },
                    )]],
                }),
            )
            case 'group': return p_.option(
                $,
                ($) => ({
                    'option': 'group',
                    'value': Resolver_Value_Group(
                        $,
                    ),
                }),
            )
            case 'list': return p_.option(
                $,
                ($) => ({
                    'option': 'list',
                    'value': ['group', ['verbose', p_.literal.dictionary(
                        {
                            "definition": p_change_context(
                                $['definition'],
                                ($) => ['nothing', null],
                            ),
                            "resolver": p_change_context(
                                $['resolver'],
                                ($) => Resolver_Value(
                                    $,
                                ),
                            ),
                            "result": p_change_context(
                                $['result'],
                                ($) => ['optional', p_.from.optional($).decide(
                                    ($): s_out.Value.optional => ['set', Resolver_Value_List_Result(
                                        $,
                                    )],
                                    () => ['not set', null],
                                )],
                            ),
                        },
                    )]],
                }),
            )
            case 'nothing': return p_.option(
                $,
                ($) => ({
                    'option': 'nothing',
                    'value': ['nothing', null],
                }),
            )
            case 'simple': return p_.option(
                $,
                ($) => ({
                    'option': 'simple',
                    'value': ['nothing', null],
                }),
            )
            case 'optional': return p_.option(
                $,
                ($) => ({
                    'option': 'optional',
                    'value': ['group', ['verbose', p_.literal.dictionary(
                        {
                            "constraints": p_change_context(
                                $['constraints'],
                                ($) => Resolver_Option_Constraints(
                                    $,
                                ),
                            ),
                            "resolver": p_change_context(
                                $['resolver'],
                                ($) => Resolver_Value(
                                    $,
                                ),
                            ),
                        },
                    )]],
                }),
            )
            case 'reference': return p_.option(
                $,
                ($) => ({
                    'option': 'reference',
                    'value': ['group', ['verbose', p_.literal.dictionary(
                        {
                            "definition": p_change_context(
                                $['definition'],
                                ($) => ['nothing', null],
                            ),
                            "type": p_change_context(
                                $['type'],
                                ($) => ['state', p_.from.state($).decide(
                                    ($): s_out.Value.state => {
                                        switch ($[0]) {
                                            case 'derived': return p_.option(
                                                $,
                                                ($) => ({
                                                    'option': 'derived',
                                                    'value': ['group', ['verbose', p_.literal.dictionary(
                                                        {
                                                            "value": p_change_context(
                                                                $['value'],
                                                                ($) => Resolver_Guaranteed_Value_Selection(
                                                                    $,
                                                                ),
                                                            ),
                                                        },
                                                    )]],
                                                }),
                                            )
                                            case 'selected': return p_.option(
                                                $,
                                                ($) => ({
                                                    'option': 'selected',
                                                    'value': ['group', ['verbose', p_.literal.dictionary(
                                                        {
                                                            "definition": p_change_context(
                                                                $['definition'],
                                                                ($) => ['nothing', null],
                                                            ),
                                                            "lookup": p_change_context(
                                                                $['lookup'],
                                                                ($) => Resolver_Lookup_Selection(
                                                                    $,
                                                                ),
                                                            ),
                                                            "constraints": p_change_context(
                                                                $['constraints'],
                                                                ($) => Resolver_Value_Constraints(
                                                                    $,
                                                                ),
                                                            ),
                                                        },
                                                    )]],
                                                }),
                                            )
                                            default: return p_.exhaustive(
                                                $[0],
                                            )
                                        }
                                    },
                                )],
                            ),
                        },
                    )]],
                }),
            )
            case 'state': return p_.option(
                $,
                ($) => ({
                    'option': 'state',
                    'value': ['group', ['verbose', p_.literal.dictionary(
                        {
                            "definition": p_change_context(
                                $['definition'],
                                ($) => ['nothing', null],
                            ),
                            "options": p_change_context(
                                $['options'],
                                ($) => ['dictionary', p_.from.dictionary($,
                                ).map(
                                    ($, id): s_out.Value => ['group', ['verbose', p_.literal.dictionary(
                                        {
                                            "constraints": p_change_context(
                                                $['constraints'],
                                                ($) => Resolver_Option_Constraints(
                                                    $,
                                                ),
                                            ),
                                            "resolver": p_change_context(
                                                $['resolver'],
                                                ($) => Resolver_Value(
                                                    $,
                                                ),
                                            ),
                                        },
                                    )]],
                                )],
                            ),
                        },
                    )]],
                }),
            )
            case 'text': return p_.option(
                $,
                ($) => ({
                    'option': 'text',
                    'value': ['nothing', null],
                }),
            )
            default: return p_.exhaustive(
                $[0],
            )
        }
    },
)]

export const Module_Specification: t_signatures.Module_Specification = ($) => ['group', ['verbose', p_.literal.dictionary(
    {
        "schema": p_change_context(
            $['schema'],
            ($) => Schema_Tree(
                $,
            ),
        ),
        "schema path": p_change_context(
            $['schema path'],
            ($) => ['list', p_.from.list($,
            ).map(
                ($) => ['text', {
                    'delimiter': ['quote', null],
                    'value': $,
                }],
            )],
        ),
        "complexity": p_change_context(
            $['complexity'],
            ($) => ['state', p_.from.state($).decide(
                ($): s_out.Value.state => {
                    switch ($[0]) {
                        case 'constrained': return p_.option(
                            $,
                            ($) => ({
                                'option': 'constrained',
                                'value': ['group', ['verbose', p_.literal.dictionary(
                                    {
                                        "type resolver": p_change_context(
                                            $['type resolver'],
                                            ($) => ['text', {
                                                'delimiter': ['quote', null],
                                                'value': $,
                                            }],
                                        ),
                                    },
                                )]],
                            }),
                        )
                        case 'unconstrained': return p_.option(
                            $,
                            ($) => ({
                                'option': 'unconstrained',
                                'value': ['group', ['verbose', p_.literal.dictionary(
                                    {
                                        "module": p_change_context(
                                            $['module'],
                                            ($) => ['text', {
                                                'delimiter': ['quote', null],
                                                'value': $,
                                            }],
                                        ),
                                    },
                                )]],
                            }),
                        )
                        default: return p_.exhaustive(
                            $[0],
                        )
                    }
                },
            )],
        ),
    },
)]]

export const Schema_Tree: t_signatures.Schema_Tree = ($) => ['state', p_.from.state($).decide(
    ($): s_out.Value.state => {
        switch ($[0]) {
            case 'schema': return p_.option(
                $,
                ($) => ({
                    'option': 'schema',
                    'value': Schema(
                        $,
                    ),
                }),
            )
            case 'set': return p_.option(
                $,
                ($) => ({
                    'option': 'set',
                    'value': Schemas(
                        $,
                    ),
                }),
            )
            default: return p_.exhaustive(
                $[0],
            )
        }
    },
)]

export const Text_Type: t_signatures.Text_Type = ($) => ['group', ['verbose', p_.literal.dictionary(
    {
        "type": p_change_context(
            $['type'],
            ($) => ['state', p_.from.state($).decide(
                ($): s_out.Value.state => {
                    switch ($[0]) {
                        case 'multi line': return p_.option(
                            $,
                            ($) => ({
                                'option': 'multi line',
                                'value': ['nothing', null],
                            }),
                        )
                        case 'single line': return p_.option(
                            $,
                            ($) => ({
                                'option': 'single line',
                                'value': ['nothing', null],
                            }),
                        )
                        default: return p_.exhaustive(
                            $[0],
                        )
                    }
                },
            )],
        ),
        "link": p_change_context(
            $['link'],
            ($) => ['state', p_.from.state($).decide(
                ($): s_out.Value.state => {
                    switch ($[0]) {
                        case 'no': return p_.option(
                            $,
                            ($) => ({
                                'option': 'no',
                                'value': ['nothing', null],
                            }),
                        )
                        case 'yes': return p_.option(
                            $,
                            ($) => ({
                                'option': 'yes',
                                'value': ['group', ['verbose', p_.literal.dictionary(
                                    {
                                        "path prefix": p_change_context(
                                            $['path prefix'],
                                            ($) => ['text', {
                                                'delimiter': ['quote', null],
                                                'value': $,
                                            }],
                                        ),
                                        "path suffix": p_change_context(
                                            $['path suffix'],
                                            ($) => ['text', {
                                                'delimiter': ['quote', null],
                                                'value': $,
                                            }],
                                        ),
                                    },
                                )]],
                            }),
                        )
                        default: return p_.exhaustive(
                            $[0],
                        )
                    }
                },
            )],
        ),
    },
)]]

export const Simple_Type: t_signatures.Simple_Type = ($) => ['group', ['verbose', p_.literal.dictionary(
    {
        "type": p_change_context(
            $['type'],
            ($) => ['state', p_.from.state($).decide(
                ($): s_out.Value.state => {
                    switch ($[0]) {
                        case 'boolean': return p_.option(
                            $,
                            ($) => ({
                                'option': 'boolean',
                                'value': ['nothing', null],
                            }),
                        )
                        case 'date': return p_.option(
                            $,
                            ($) => ({
                                'option': 'date',
                                'value': ['nothing', null],
                            }),
                        )
                        case 'number': return p_.option(
                            $,
                            ($) => ({
                                'option': 'number',
                                'value': ['group', ['verbose', p_.literal.dictionary(
                                    {
                                        "precision": p_change_context(
                                            $['precision'],
                                            ($) => ['state', p_.from.state($).decide(
                                                ($): s_out.Value.state => {
                                                    switch ($[0]) {
                                                        case 'approximation': return p_.option(
                                                            $,
                                                            ($) => ({
                                                                'option': 'approximation',
                                                                'value': ['group', ['verbose', p_.literal.dictionary(
                                                                    {
                                                                        "significant digits": p_change_context(
                                                                            $['significant digits'],
                                                                            ($) => ['text', {
                                                                                'delimiter': ['none', null],
                                                                                'value': v_primitives_to_text.decimal(
                                                                                    $,
                                                                                ),
                                                                            }],
                                                                        ),
                                                                    },
                                                                )]],
                                                            }),
                                                        )
                                                        case 'exact': return p_.option(
                                                            $,
                                                            ($) => ({
                                                                'option': 'exact',
                                                                'value': ['group', ['verbose', p_.literal.dictionary(
                                                                    {
                                                                        "number of fractional digits": p_change_context(
                                                                            $['number of fractional digits'],
                                                                            ($) => ['optional', p_.from.optional($).decide(
                                                                                ($): s_out.Value.optional => ['set', ['text', {
                                                                                    'delimiter': ['none', null],
                                                                                    'value': v_primitives_to_text.decimal(
                                                                                        $,
                                                                                    ),
                                                                                }]],
                                                                                () => ['not set', null],
                                                                            )],
                                                                        ),
                                                                        "type": p_change_context(
                                                                            $['type'],
                                                                            ($) => ['state', p_.from.state($).decide(
                                                                                ($): s_out.Value.state => {
                                                                                    switch ($[0]) {
                                                                                        case 'integer': return p_.option(
                                                                                            $,
                                                                                            ($) => ({
                                                                                                'option': 'integer',
                                                                                                'value': ['nothing', null],
                                                                                            }),
                                                                                        )
                                                                                        case 'natural': return p_.option(
                                                                                            $,
                                                                                            ($) => ({
                                                                                                'option': 'natural',
                                                                                                'value': ['nothing', null],
                                                                                            }),
                                                                                        )
                                                                                        case 'positive natural': return p_.option(
                                                                                            $,
                                                                                            ($) => ({
                                                                                                'option': 'positive natural',
                                                                                                'value': ['nothing', null],
                                                                                            }),
                                                                                        )
                                                                                        default: return p_.exhaustive(
                                                                                            $[0],
                                                                                        )
                                                                                    }
                                                                                },
                                                                            )],
                                                                        ),
                                                                    },
                                                                )]],
                                                            }),
                                                        )
                                                        default: return p_.exhaustive(
                                                            $[0],
                                                        )
                                                    }
                                                },
                                            )],
                                        ),
                                    },
                                )]],
                            }),
                        )
                        default: return p_.exhaustive(
                            $[0],
                        )
                    }
                },
            )],
        ),
    },
)]]

export const Module: t_signatures.Module = ($) => ['group', ['verbose', p_.literal.dictionary(
    {
        "root value": p_change_context(
            $['root value'],
            ($) => Value(
                $,
            ),
        ),
    },
)]]

export const Presence: t_signatures.Presence = ($) => ['state', p_.from.state($).decide(
    ($): s_out.Value.state => {
        switch ($[0]) {
            case 'optional': return p_.option(
                $,
                ($) => ({
                    'option': 'optional',
                    'value': ['nothing', null],
                }),
            )
            case 'required': return p_.option(
                $,
                ($) => ({
                    'option': 'required',
                    'value': ['nothing', null],
                }),
            )
            default: return p_.exhaustive(
                $[0],
            )
        }
    },
)]

export const Resolver_Modules: t_signatures.Resolver_Modules = ($) => ['dictionary', p_.from.dictionary($,
).map(
    ($, id): s_out.Value => ['group', ['verbose', p_.literal.dictionary(
        {
            "signature": p_change_context(
                $['signature'],
                ($) => ['nothing', null],
            ),
            "root value resolver": p_change_context(
                $['root value resolver'],
                ($) => Resolver_Value(
                    $,
                ),
            ),
        },
    )]],
)]

export const Resolver_Benchmark: t_signatures.Resolver_Benchmark = ($) => ['group', ['verbose', p_.literal.dictionary(
    {
        "selection": p_change_context(
            $['selection'],
            ($) => Resolver_Guaranteed_Value_Selection(
                $['l value'],
            ),
        ),
        "resulting dictionary": p_change_context(
            $['resulting dictionary'],
            ($) => ['nothing', null],
        ),
        "dense": p_change_context(
            $['dense'],
            ($) => ['text', {
                'delimiter': ['none', null],
                'value': v_primitives_to_text.true_false(
                    $,
                ),
            }],
        ),
    },
)]]

export const Group: t_signatures.Group = ($) => ['dictionary', p_.from.dictionary($,
).map(
    ($, id): s_out.Value => ['group', ['verbose', p_.literal.dictionary(
        {
            "description": p_change_context(
                $['description'],
                ($) => ['optional', p_.from.optional($).decide(
                    ($): s_out.Value.optional => ['set', ['text', {
                        'delimiter': ['quote', null],
                        'value': $,
                    }]],
                    () => ['not set', null],
                )],
            ),
            "value": p_change_context(
                $['value'],
                ($) => Value(
                    $,
                ),
            ),
        },
    )]],
)]

export const Value_Reference: t_signatures.Value_Reference = ($) => ['group', ['verbose', p_.literal.dictionary(
    {
        "module": p_change_context(
            $['module'],
            ($) => Module_Reference(
                $,
            ),
        ),
        "path": p_change_context(
            $['path'],
            ($) => Value_Path(
                $,
            ),
        ),
    },
)]]

export const Value_Path: t_signatures.Value_Path = ($) => ['group', ['verbose', p_.literal.dictionary(
    {
        "tail": p_change_context(
            $['tail'],
            ($) => ['list', p_.from.list($['l value'],
            ).map(
                ($) => p_change_context(
                    $['l item'],
                    ($) => ['state', p_.from.state($['l value']).decide(
                        ($): s_out.Value.state => {
                            switch ($[0]) {
                                case 'dictionary': return p_.option(
                                    $,
                                    ($) => ({
                                        'option': 'dictionary',
                                        'value': ['nothing', null],
                                    }),
                                )
                                case 'group': return p_.option(
                                    $,
                                    ($) => ({
                                        'option': 'group',
                                        'value': ['reference', {
                                            'value': $['l id'],
                                        }],
                                    }),
                                )
                                case 'list': return p_.option(
                                    $,
                                    ($) => ({
                                        'option': 'list',
                                        'value': ['nothing', null],
                                    }),
                                )
                                case 'optional': return p_.option(
                                    $,
                                    ($) => ({
                                        'option': 'optional',
                                        'value': ['nothing', null],
                                    }),
                                )
                                case 'state': return p_.option(
                                    $,
                                    ($) => ({
                                        'option': 'state',
                                        'value': ['reference', {
                                            'value': $['l id'],
                                        }],
                                    }),
                                )
                                default: return p_.exhaustive(
                                    $[0],
                                )
                            }
                        },
                    )],
                ),
            )],
        ),
        "resulting node": p_change_context(
            $['resulting node'],
            ($) => ['nothing', null],
        ),
    },
)]]

export const Module_Reference: t_signatures.Module_Reference = ($) => ['group', ['verbose', p_.literal.dictionary(
    {
        "location": p_change_context(
            $['location'],
            ($) => ['state', p_.from.state($).decide(
                ($): s_out.Value.state => {
                    switch ($[0]) {
                        case 'internal': return p_.option(
                            $,
                            ($) => ({
                                'option': 'internal',
                                'value': ['reference', {
                                    'value': $['l id'],
                                }],
                            }),
                        )
                        case 'external': return p_.option(
                            $,
                            ($) => ({
                                'option': 'external',
                                'value': ['group', ['verbose', p_.literal.dictionary(
                                    {
                                        "import": p_change_context(
                                            $['import'],
                                            ($) => ['reference', {
                                                'delimiter': ['apostrophe', null],
                                                'value': $['l id'],
                                            }],
                                        ),
                                        "module": p_change_context(
                                            $['module'],
                                            ($) => ['reference', {
                                                'delimiter': ['apostrophe', null],
                                                'value': $['l id'],
                                            }],
                                        ),
                                    },
                                )]],
                            }),
                        )
                        default: return p_.exhaustive(
                            $[0],
                        )
                    }
                },
            )],
        ),
        "resulting module": p_change_context(
            $['resulting module'],
            ($) => ['nothing', null],
        ),
    },
)]]

export const Resolver_Signature: t_signatures.Resolver_Signature = ($) => ['group', ['verbose', p_.literal.dictionary(
    {
        "module": p_change_context(
            $['module'],
            ($) => ['nothing', null],
        ),
        "parameters": p_change_context(
            $['parameters'],
            ($) => ['state', p_.from.state($).decide(
                ($): s_out.Value.state => {
                    switch ($[0]) {
                        case 'local': return p_.option(
                            $,
                            ($) => ({
                                'option': 'local',
                                'value': Resolver_Signature_Parameters(
                                    $,
                                ),
                            }),
                        )
                        case 'same as': return p_.option(
                            $,
                            ($) => ({
                                'option': 'same as',
                                'value': ['reference', {
                                    'value': $['l id'],
                                }],
                            }),
                        )
                        default: return p_.exhaustive(
                            $[0],
                        )
                    }
                },
            )],
        ),
        "resolved parameters": p_change_context(
            $['resolved parameters'],
            ($) => ['nothing', null],
        ),
    },
)]]

export const Resolver_Relative_Value_Selection: t_signatures.Resolver_Relative_Value_Selection = ($) => ['group', ['verbose', p_.literal.dictionary(
    {
        "path": p_change_context(
            $['path'],
            ($) => ['list', p_.from.list($['l value'],
            ).map(
                ($) => p_change_context(
                    $['l item'],
                    ($) => ['state', p_.from.state($).decide(
                        ($): s_out.Value.state => {
                            switch ($[0]) {
                                case 'state': return { option: 'state', value: ['reference', { value: $[1]['l id'] }] }
                                case 'component': return p_.option(
                                    $,
                                    ($) => ({
                                        'option': 'component',
                                        'value': ['nothing', null],
                                    }),
                                )
                                case 'group': return p_.option(
                                    $,
                                    ($) => ({
                                        'option': 'group',
                                        'value': ['reference', {
                                            'value': $['l id'],
                                        }],
                                    }),
                                )
                                case 'reference': return p_.option(
                                    $,
                                    ($) => ({
                                        'option': 'reference',
                                        'value': ['group', ['verbose', p_.literal.dictionary(
                                            {
                                                "definition": p_change_context(
                                                    $['definition'],
                                                    ($) => ['nothing', null],
                                                ),
                                            },
                                        )]],
                                    }),
                                )
                                default: return p_.exhaustive(
                                    $[0],
                                )
                            }
                        },
                    )],
                ),
            )],
        ),
        "resulting node": p_change_context(
            $['resulting node'],
            ($) => ['nothing', null],
        ),
    },
)]]

export const Resolver_Lookup_Selection: t_signatures.Resolver_Lookup_Selection = ($) => ['group', ['verbose', p_.literal.dictionary(
    {
        "type": p_change_context(
            $['type'],
            ($) => ['state', p_.from.state($).decide(
                ($): s_out.Value.state => {
                    switch ($[0]) {
                        case 'acyclic': return p_.option(
                            $,
                            ($) => ({
                                'option': 'acyclic',
                                'value': ['state', p_.from.state($).decide(
                                    ($): s_out.Value.state => {
                                        switch ($[0]) {
                                            case 'siblings': return p_.option(
                                                $,
                                                ($) => ({
                                                    'option': 'siblings',
                                                    'value': ['nothing', null],
                                                }),
                                            )
                                            case 'resolved dictionary': return p_.option(
                                                $,
                                                ($) => ({
                                                    'option': 'resolved dictionary',
                                                    'value': ['group', ['verbose', p_.literal.dictionary(
                                                        {
                                                            "selection": p_change_context(
                                                                $['selection'],
                                                                ($) => Resolver_Guaranteed_Value_Selection(
                                                                    $,
                                                                ),
                                                            ),
                                                            "selected dictionary": p_change_context(
                                                                $['selected dictionary'],
                                                                ($) => ['nothing', null],
                                                            ),
                                                        },
                                                    )]],
                                                }),
                                            )
                                            default: return p_.exhaustive(
                                                $[0],
                                            )
                                        }
                                    },
                                )],
                            }),
                        )
                        case 'cyclic': return p_.option(
                            $,
                            ($) => ({
                                'option': 'cyclic',
                                'value': ['state', p_.from.state($).decide(
                                    ($): s_out.Value.state => {
                                        switch ($[0]) {
                                            case 'siblings': return p_.option(
                                                $,
                                                ($) => ({
                                                    'option': 'siblings',
                                                    'value': ['nothing', null],
                                                }),
                                            )
                                            default: return p_.exhaustive(
                                                $[0],
                                            )
                                        }
                                    },
                                )],
                            }),
                        )
                        case 'parameter': return p_.option(
                            $,
                            ($) => ({
                                'option': 'parameter',
                                'value': ['reference', {
                                    'value': $['l id'],
                                }],
                            }),
                        )
                        default: return p_.exhaustive(
                            $[0],
                        )
                    }
                },
            )],
        ),
        "resulting dictionary": p_change_context(
            $['resulting dictionary'],
            ($) => ['nothing', null],
        ),
    },
)]]

export const Resolver_Constraint: t_signatures.Resolver_Constraint = ($) => ['group', ['verbose', p_.literal.dictionary(
    {
        "selection": p_change_context(
            $['selection'],
            ($) => Resolver_Relative_Value_Selection(
                $,
            ),
        ),
        "type": p_change_context(
            $['type'],
            ($) => ['state', p_.from.state($).decide(
                ($): s_out.Value.state => {
                    switch ($[0]) {
                        case 'state': return p_.option(
                            $,
                            ($) => ({
                                'option': 'state',
                                'value': ['group', ['verbose', p_.literal.dictionary(
                                    {
                                        "selected state": p_change_context(
                                            $['selected state'],
                                            ($) => ['nothing', null],
                                        ),
                                        "option": p_change_context(
                                            $['option'],
                                            ($) => ['reference', {
                                                'delimiter': ['apostrophe', null],
                                                'value': $['l id'],
                                            }],
                                        ),
                                    },
                                )]],
                            }),
                        )
                        case 'optional value': return p_.option(
                            $,
                            ($) => ({
                                'option': 'optional value',
                                'value': ['group', ['verbose', p_.literal.dictionary(
                                    {
                                        "selected optional value": p_change_context(
                                            $['selected optional value'],
                                            ($) => ['nothing', null],
                                        ),
                                    },
                                )]],
                            }),
                        )
                        default: return p_.exhaustive(
                            $[0],
                        )
                    }
                },
            )],
        ),
    },
)]]

export const Resolver_Option_Constraints: t_signatures.Resolver_Option_Constraints = ($) => ['dictionary', p_.from.dictionary($,
).map(
    ($, id): s_out.Value => ['state', p_.from.state($).decide(
        ($): s_out.Value.state => {
            switch ($[0]) {
                case 'state': return p_.option(
                    $,
                    ($) => ({
                        'option': 'state',
                        'value': ['group', ['verbose', p_.literal.dictionary(
                            {
                                "selection": p_change_context(
                                    $['selection'],
                                    ($) => Resolver_Guaranteed_Value_Selection(
                                        $,
                                    ),
                                ),
                                "selected state": p_change_context(
                                    $['selected state'],
                                    ($) => ['nothing', null],
                                ),
                                "option": p_change_context(
                                    $['option'],
                                    ($) => ['reference', {
                                        'delimiter': ['apostrophe', null],
                                        'value': $['l id'],
                                    }],
                                ),
                            },
                        )]],
                    }),
                )
                case 'assert is set': return p_.option(
                    $,
                    ($) => ({
                        'option': 'assert is set',
                        'value': Resolver_Possible_Value_Selection(
                            $,
                        ),
                    }),
                )
                default: return p_.exhaustive(
                    $[0],
                )
            }
        },
    )],
)]

export const Resolver_Optional_Value_Constraints: t_signatures.Resolver_Optional_Value_Constraints = ($) => ['optional', p_.from.optional($).decide(
    ($): s_out.Value.optional => ['set', Resolver_Value_Constraints(
        $,
    )],
    () => ['not set', null],
)]

export const Resolver_Value_Constraints: t_signatures.Resolver_Value_Constraints = ($) => ['dictionary', p_.from.dictionary($,
).map(
    ($, id) => Resolver_Value_Constraint(
        $,
    ),
)]

export const Resolver_Reference_To_Value_Constraint: t_signatures.Resolver_Reference_To_Value_Constraint = ($) => ['reference', {
    'delimiter': ['apostrophe', null],
    'value': $['l id'],
}]

export const Resolver_Value_Constraint: t_signatures.Resolver_Value_Constraint = ($) => ['group', ['verbose', p_.literal.dictionary(
    {
        "start": p_change_context(
            $['start'],
            ($) => ['state', p_.from.state($).decide(
                ($): s_out.Value.state => {
                    switch ($[0]) {
                        case 'value': return p_.option(
                            $,
                            ($) => ({
                                'option': 'value',
                                'value': ['nothing', null],
                            }),
                        )
                        case 'sibling': return p_.option(
                            $,
                            ($) => ({
                                'option': 'sibling',
                                'value': Resolver_Reference_To_Value_Constraint(
                                    $,
                                ),
                            }),
                        )
                        default: return p_.exhaustive(
                            $[0],
                        )
                    }
                },
            )],
        ),
        "constraint": p_change_context(
            $['constraint'],
            ($) => Resolver_Constraint(
                $,
            ),
        ),
    },
)]]

export const Resolver_Optional_Value_Initialization: t_signatures.Resolver_Optional_Value_Initialization = ($) => ['state', p_.from.state($).decide(
    ($): s_out.Value.state => {
        switch ($[0]) {
            case 'not set': return p_.option(
                $,
                ($) => ({
                    'option': 'not set',
                    'value': ['nothing', null],
                }),
            )
            case 'set': return p_.option(
                $,
                ($) => ({
                    'option': 'set',
                    'value': Resolver_Guaranteed_Value_Selection(
                        $,
                    ),
                }),
            )
            case 'selection': return p_.option(
                $,
                ($) => ({
                    'option': 'selection',
                    'value': Resolver_Possible_Value_Selection(
                        $,
                    ),
                }),
            )
            default: return p_.exhaustive(
                $[0],
            )
        }
    },
)]

export const Resolver_Value_Group: t_signatures.Resolver_Value_Group = ($) => ['dictionary', p_.from.dictionary($,
).map(
    ($, id): s_out.Value => ['group', ['verbose', p_.literal.dictionary(
        {
            "definition": p_change_context(
                $['definition'],
                ($) => ['nothing', null],
            ),
            "resolver": p_change_context(
                $['resolver'],
                ($) => Resolver_Value(
                    $,
                ),
            ),
        },
    )]],
)]

export const Resolver_Value_List_Result: t_signatures.Resolver_Value_List_Result = ($) => Module_Reference(
    $,
)

export const Value_Results: t_signatures.Value_Results = ($) => ['optional', p_.from.optional($).decide(
    ($): s_out.Value.optional => ['set', ['dictionary', p_.from.dictionary($,
    ).map(
        ($, id) => Value_Reference(
            $,
        ),
    )]],
    () => ['not set', null],
)]

export const Option_Constraints: t_signatures.Option_Constraints = ($) => ['optional', p_.from.optional($).decide(
    ($): s_out.Value.optional => ['set', ['dictionary', p_.from.dictionary($,
    ).map(
        ($, id) => Value_Reference(
            $,
        ),
    )]],
    () => ['not set', null],
)]

export const Resolver_Guaranteed_Value_Selection: t_signatures.Resolver_Guaranteed_Value_Selection = ($) => ['group', ['verbose', p_.literal.dictionary(
    {
        "start": p_change_context(
            $['start'],
            ($) => ['state', p_.from.state($).decide(
                ($): s_out.Value.state => {
                    switch ($[0]) {
                        case 'previous item': return {
                            option: 'previous item', value: ['group', ['verbose', p_.literal.dictionary({
                                initial: Resolver_Guaranteed_Value_Selection($[1].initial),
                            })]],
                        }
                        case 'last item': return {
                            option: 'last item', value: ['group', ['verbose', p_.literal.dictionary({
                                initial: Resolver_Guaranteed_Value_Selection($[1].initial),
                                property: ['reference', { value: $[1].property['l id'] }],
                            })]],
                        }
                        case 'sibling': return p_.option(
                            $,
                            ($) => ({
                                'option': 'sibling',
                                'value': ['reference', {
                                    'value': $['l id'],
                                }],
                            }),
                        )
                        case 'parent sibling': return p_.option(
                            $,
                            ($) => ({
                                'option': 'parent sibling',
                                'value': ['reference', {
                                    'value': $['l id'],
                                }],
                            }),
                        )
                        case 'option constraint': return p_.option(
                            $,
                            ($) => ({
                                'option': 'option constraint',
                                'value': ['reference', {
                                    'value': $['l id'],
                                }],
                            }),
                        )
                        case 'list cursor': return p_.option(
                            $,
                            ($) => ({
                                'option': 'list cursor',
                                'value': ['nothing', null],
                            }),
                        )
                        case 'linked entry': return p_.option(
                            $,
                            ($) => ({
                                'option': 'linked entry',
                                'value': ['nothing', null],
                            }),
                        )
                        case 'constraint': return p_.option(
                            $,
                            ($) => ({
                                'option': 'constraint',
                                'value': ['state', p_.from.state($).decide(
                                    ($): s_out.Value.state => {
                                        switch ($[0]) {
                                            case 'component': return p_.option(
                                                $,
                                                ($) => ({
                                                    'option': 'component',
                                                    'value': ['group', ['verbose', p_.literal.dictionary(
                                                        {
                                                            "property": p_change_context(
                                                                $['property'],
                                                                ($) => ['reference', {
                                                                    'delimiter': ['apostrophe', null],
                                                                    'value': $['l id'],
                                                                }],
                                                            ),
                                                            "constraint": p_change_context(
                                                                $['constraint'],
                                                                ($) => ['reference', {
                                                                    'delimiter': ['apostrophe', null],
                                                                    'value': $['l id'],
                                                                }],
                                                            ),
                                                        },
                                                    )]],
                                                }),
                                            )
                                            case 'reference': return p_.option(
                                                $,
                                                ($) => ({
                                                    'option': 'reference',
                                                    'value': ['group', ['verbose', p_.literal.dictionary(
                                                        {
                                                            "property": p_change_context(
                                                                $['property'],
                                                                ($) => ['reference', {
                                                                    'delimiter': ['apostrophe', null],
                                                                    'value': $['l id'],
                                                                }],
                                                            ),
                                                            "constraint": p_change_context(
                                                                $['constraint'],
                                                                ($) => ['reference', {
                                                                    'delimiter': ['apostrophe', null],
                                                                    'value': $['l id'],
                                                                }],
                                                            ),
                                                        },
                                                    )]],
                                                }),
                                            )
                                            default: return p_.exhaustive(
                                                $[0],
                                            )
                                        }
                                    },
                                )],
                            }),
                        )
                        case 'parameter': return p_.option(
                            $,
                            ($) => ({
                                'option': 'parameter',
                                'value': ['reference', {
                                    'value': $['l id'],
                                }],
                            }),
                        )
                        case 'result': return p_.option(
                            $,
                            ($) => ({
                                'option': 'result',
                                'value': ['state', p_.from.state($).decide(
                                    ($): s_out.Value.state => {
                                        switch ($[0]) {
                                            case 'list': return p_.option(
                                                $,
                                                ($) => ({
                                                    'option': 'list',
                                                    'value': ['group', ['verbose', p_.literal.dictionary(
                                                        {
                                                            "property": p_change_context(
                                                                $['property'],
                                                                ($) => ['reference', {
                                                                    'delimiter': ['apostrophe', null],
                                                                    'value': $['l id'],
                                                                }],
                                                            ),
                                                            "list result": p_change_context(
                                                                $['list result'],
                                                                ($) => ['nothing', null],
                                                            ),
                                                        },
                                                    )]],
                                                }),
                                            )
                                            case 'state': return p_.option(
                                                $,
                                                ($) => ({
                                                    'option': 'state',
                                                    'value': ['group', ['verbose', p_.literal.dictionary(
                                                        {
                                                            "property": p_change_context(
                                                                $['property'],
                                                                ($) => ['reference', {
                                                                    'delimiter': ['apostrophe', null],
                                                                    'value': $['l id'],
                                                                }],
                                                            ),
                                                            "state": p_change_context(
                                                                $['state'],
                                                                ($) => ['nothing', null],
                                                            ),
                                                            "result": p_change_context(
                                                                $['result'],
                                                                ($) => Module_Reference(
                                                                    $,
                                                                ),
                                                            ),
                                                        },
                                                    )]],
                                                }),
                                            )
                                            case 'optional value': return p_.option(
                                                $,
                                                ($) => ({
                                                    'option': 'optional value',
                                                    'value': ['group', ['verbose', p_.literal.dictionary(
                                                        {
                                                            "property": p_change_context(
                                                                $['property'],
                                                                ($) => ['reference', {
                                                                    'delimiter': ['apostrophe', null],
                                                                    'value': $['l id'],
                                                                }],
                                                            ),
                                                            "optional value": p_change_context(
                                                                $['optional value'],
                                                                ($) => ['nothing', null],
                                                            ),
                                                            "result": p_change_context(
                                                                $['result'],
                                                                ($) => Module_Reference(
                                                                    $,
                                                                ),
                                                            ),
                                                        },
                                                    )]],
                                                }),
                                            )
                                            default: return p_.exhaustive(
                                                $[0],
                                            )
                                        }
                                    },
                                )],
                            }),
                        )
                        default: return p_.exhaustive(
                            $[0],
                        )
                    }
                },
            )],
        ),
        "tail": p_change_context(
            $['tail'],
            ($) => Resolver_Relative_Value_Selection(
                $,
            ),
        ),
        "resulting node": p_change_context(
            $['resulting node'],
            ($) => ['nothing', null],
        ),
    },
)]]

export const Resolver_Possible_Value_Selection: t_signatures.Resolver_Possible_Value_Selection = ($) => ['state', p_.from.state($).decide(
    ($): s_out.Value.state => {
        switch ($[0]) {
            case 'parameter': return p_.option(
                $,
                ($) => ({
                    'option': 'parameter',
                    'value': ['reference', {
                        'value': $['l id'],
                    }],
                }),
            )
            case 'result': return p_.option(
                $,
                ($) => ({
                    'option': 'result',
                    'value': ['state', p_.from.state($).decide(
                        ($): s_out.Value.state => {
                            switch ($[0]) {
                                case 'state': return p_.option(
                                    $,
                                    ($) => ({
                                        'option': 'state',
                                        'value': ['group', ['verbose', p_.literal.dictionary(
                                            {
                                                "property": p_change_context(
                                                    $['property'],
                                                    ($) => ['reference', {
                                                        'delimiter': ['apostrophe', null],
                                                        'value': $['l id'],
                                                    }],
                                                ),
                                                "state": p_change_context(
                                                    $['state'],
                                                    ($) => ['nothing', null],
                                                ),
                                                "result": p_change_context(
                                                    $['result'],
                                                    ($) => Module_Reference(
                                                        $,
                                                    ),
                                                ),
                                            },
                                        )]],
                                    }),
                                )
                                case 'optional value': return p_.option(
                                    $,
                                    ($) => ({
                                        'option': 'optional value',
                                        'value': ['group', ['verbose', p_.literal.dictionary(
                                            {
                                                "property": p_change_context(
                                                    $['property'],
                                                    ($) => ['reference', {
                                                        'delimiter': ['apostrophe', null],
                                                        'value': $['l id'],
                                                    }],
                                                ),
                                                "optional value": p_change_context(
                                                    $['optional value'],
                                                    ($) => ['nothing', null],
                                                ),
                                                "result": p_change_context(
                                                    $['result'],
                                                    ($) => Module_Reference(
                                                        $,
                                                    ),
                                                ),
                                            },
                                        )]],
                                    }),
                                )
                                default: return p_.exhaustive(
                                    $[0],
                                )
                            }
                        },
                    )],
                }),
            )
            default: return p_.exhaustive(
                $[0],
            )
        }
    },
)]
