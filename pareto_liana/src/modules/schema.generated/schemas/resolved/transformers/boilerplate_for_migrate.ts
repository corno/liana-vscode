
import * as p_ from 'pareto-core/transformer'

import * as p_di from 'pareto-core/schema'

import p_change_context from 'pareto-core/refiner/specials/change_context'

import type * as s_in from "../schema.js"
namespace t_signatures {
    export type Package = p_.Transformer<
        s_in.Package,
        s_out.Package
    >
    export type Schemas = p_.Transformer<
        s_in.Schemas,
        s_out.Schemas
    >
    export type Schema = p_.Transformer<
        s_in.Schema,
        s_out.Schema
    >
    export type Schema_Imports = p_.Transformer<
        s_in.Schema_Imports,
        s_out.Schema_Imports
    >
    export type Modules = p_.Transformer<
        s_in.Modules,
        s_out.Modules
    >
    export type Globals = p_.Transformer<
        s_in.Globals,
        s_out.Globals
    >
    export type Dictionary = p_.Transformer<
        s_in.Dictionary,
        s_out.Dictionary
    >
    export type Value = p_.Transformer<
        s_in.Value,
        s_out.Value
    >
    export type Resolver = p_.Transformer<
        s_in.Resolver,
        s_out.Resolver
    >
    export type Resolver_Imports = p_.Transformer<
        s_in.Resolver_Imports,
        s_out.Resolver_Imports
    >
    export type Resolver_Signatures = p_.Transformer<
        s_in.Resolver_Signatures,
        s_out.Resolver_Signatures
    >
    export type Resolver_Signature_Parameters = p_.Transformer<
        s_in.Resolver_Signature_Parameters,
        s_out.Resolver_Signature_Parameters
    >
    export type Resolver_Value = p_.Transformer<
        s_in.Resolver_Value,
        s_out.Resolver_Value
    >
    export type Module_Specification = p_.Transformer<
        s_in.Module_Specification,
        s_out.Module_Specification
    >
    export type Schema_Tree = p_.Transformer<
        s_in.Schema_Tree,
        s_out.Schema_Tree
    >
    export type Text_Type = p_.Transformer<
        s_in.Text_Type,
        s_out.Text_Type
    >
    export type Simple_Type = p_.Transformer<
        s_in.Simple_Type,
        s_out.Simple_Type
    >
    export type Module = p_.Transformer<
        s_in.Module,
        s_out.Module
    >
    export type Presence = p_.Transformer<
        s_in.Presence,
        s_out.Presence
    >
    export type Resolver_Modules = p_.Transformer<
        s_in.Resolver_Modules,
        s_out.Resolver_Modules
    >
    export type Resolver_Benchmark = p_.Transformer<
        s_in.Resolver_Benchmark,
        s_out.Resolver_Benchmark
    >
    export type Group = p_.Transformer<
        s_in.Group,
        s_out.Group
    >
    export type Value_Reference = p_.Transformer<
        s_in.Value_Reference,
        s_out.Value_Reference
    >
    export type Value_Path = p_.Transformer<
        s_in.Value_Path,
        s_out.Value_Path
    >
    export type Module_Reference = p_.Transformer<
        s_in.Module_Reference,
        s_out.Module_Reference
    >
    export type Resolver_Signature = p_.Transformer<
        s_in.Resolver_Signature,
        s_out.Resolver_Signature
    >
    export type Resolver_Relative_Value_Selection = p_.Transformer<
        s_in.Resolver_Relative_Value_Selection,
        s_out.Resolver_Relative_Value_Selection
    >
    export type Resolver_Lookup_Selection = p_.Transformer<
        s_in.Resolver_Lookup_Selection,
        s_out.Resolver_Lookup_Selection
    >
    export type Resolver_Constraint = p_.Transformer<
        s_in.Resolver_Constraint,
        s_out.Resolver_Constraint
    >
    export type Resolver_Option_Constraints = p_.Transformer<
        s_in.Resolver_Option_Constraints,
        s_out.Resolver_Option_Constraints
    >
    export type Resolver_Optional_Value_Constraints = p_.Transformer<
        s_in.Resolver_Optional_Value_Constraints,
        s_out.Resolver_Optional_Value_Constraints
    >
    export type Resolver_Value_Constraints = p_.Transformer<
        s_in.Resolver_Value_Constraints,
        s_out.Resolver_Value_Constraints
    >
    export type Resolver_Reference_To_Value_Constraint = p_.Transformer<
        s_in.Resolver_Reference_To_Value_Constraint,
        s_out.Resolver_Reference_To_Value_Constraint
    >
    export type Resolver_Value_Constraint = p_.Transformer<
        s_in.Resolver_Value_Constraint,
        s_out.Resolver_Value_Constraint
    >
    export type Resolver_Optional_Value_Initialization = p_.Transformer<
        s_in.Resolver_Optional_Value_Initialization,
        s_out.Resolver_Optional_Value_Initialization
    >
    export type Resolver_Value_Group = p_.Transformer<
        s_in.Resolver_Value_Group,
        s_out.Resolver_Value_Group
    >
    export type Resolver_Value_List_Result = p_.Transformer<
        s_in.Resolver_Value_List_Result,
        s_out.Resolver_Value_List_Result
    >
    export type Value_Results = p_.Transformer<
        s_in.Value_Results,
        s_out.Value_Results
    >
    export type Option_Constraints = p_.Transformer<
        s_in.Option_Constraints,
        s_out.Option_Constraints
    >
    export type Resolver_Guaranteed_Value_Selection = p_.Transformer<
        s_in.Resolver_Guaranteed_Value_Selection,
        s_out.Resolver_Guaranteed_Value_Selection
    >
    export type Resolver_Possible_Value_Selection = p_.Transformer<
        s_in.Resolver_Possible_Value_Selection,
        s_out.Resolver_Possible_Value_Selection
    >
}

import * as s_out from "../../unresolved/schema.js"

export const Package: t_signatures.Package = ($) => ({
    'omit (de)serializer': p_change_context(
        $['omit (de)serializer'],
        ($) => $,
    ),
    'schema tree': p_change_context(
        $['schema tree'],
        ($) => Schema_Tree(
            $,
        ),
    ),
})

export const Schemas: t_signatures.Schemas = ($) => ({
    'l location': {
        'start': {
            'absolute': 42,
            'relative': {
                'line': 42,
                'column': 42,
            },
        },
        'end': {
            'absolute': 42,
            'relative': {
                'line': 42,
                'column': 42,
            },
        },
    },
    'l dictionary': p_.from.dictionary($,
    ).map(
        ($, id) => ({
            'l entry': Schema_Tree(
                $,
            ),
            'l location': {
                'start': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
                'end': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
            },
        }),
    ),
})

export const Schema: t_signatures.Schema = ($) => ({
    'schema imports': p_change_context(
        $['schema imports'],
        ($) => Schema_Imports(
            $,
        ),
    ),
    'resolver imports': p_change_context(
        $['resolver imports'],
        ($) => Resolver_Imports(
            $,
        ),
    ),
    'globals': p_change_context(
        $['globals'],
        ($) => Globals(
            $,
        ),
    ),
    'types': p_change_context(
        $['types'],
        ($) => Modules(
            $,
        ),
    ),
    'complexity': p_change_context(
        $['complexity'],
        ($) => ({
            'l location': {
                'start': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
                'end': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
            },
            'l state': p_.from.state($).decide(
                ($): s_out.Schema.complexity.l_state => {
                    switch ($[0]) {
                        case 'constrained': return p_.option(
                                $,
                                ($) => ['constrained', Resolver(
                                    $,
                                )],
                            )
                        case 'unconstrained': return p_.option(
                                $,
                                ($) => ['unconstrained', null],
                            )
                        default: return p_.exhaustive(
                                $[0],
                            )
                    }
                },
            ),
        }),
    ),
})

export const Schema_Imports: t_signatures.Schema_Imports = ($) => ({
    'l location': {
        'start': {
            'absolute': 42,
            'relative': {
                'line': 42,
                'column': 42,
            },
        },
        'end': {
            'absolute': 42,
            'relative': {
                'line': 42,
                'column': 42,
            },
        },
    },
    'l dictionary': p_.from.dictionary($,
    ).map(
        ($, id) => ({
            'l entry': {
                'schema set child': p_change_context(
                    $['schema set child'],
                    ($) => ({
                        'l location': {
                            'start': {
                                'absolute': 42,
                                'relative': {
                                    'line': 42,
                                    'column': 42,
                                },
                            },
                            'end': {
                                'absolute': 42,
                                'relative': {
                                    'line': 42,
                                    'column': 42,
                                },
                            },
                        },
                        'l reference': $['l value']['l id'],
                    }),
                ),
                'schema': p_change_context(
                    $['schema'],
                    ($) => null,
                ),
            },
            'l location': {
                'start': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
                'end': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
            },
        }),
    ),
})

export const Modules: t_signatures.Modules = ($) => ({
    'l location': {
        'start': {
            'absolute': 42,
            'relative': {
                'line': 42,
                'column': 42,
            },
        },
        'end': {
            'absolute': 42,
            'relative': {
                'line': 42,
                'column': 42,
            },
        },
    },
    'l dictionary': p_.from.dictionary($,
    ).map(
        ($, id) => ({
            'l entry': Module(
                $,
            ),
            'l location': {
                'start': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
                'end': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
            },
        }),
    ),
})

export const Globals: t_signatures.Globals = ($) => ({
    'complexity': p_change_context(
        $['complexity'],
        ($) => ({
            'l location': {
                'start': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
                'end': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
            },
            'l state': p_.from.state($).decide(
                ($): s_out.Globals.complexity.l_state => {
                    switch ($[0]) {
                        case 'constrained': return p_.option(
                                $,
                                ($) => ['constrained', null],
                            )
                        case 'unconstrained': return p_.option(
                                $,
                                ($) => ['unconstrained', null],
                            )
                        default: return p_.exhaustive(
                                $[0],
                            )
                    }
                },
            ),
        }),
    ),
    'text types': p_change_context(
        $['text types'],
        ($) => ({
            'l location': {
                'start': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
                'end': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
            },
            'l dictionary': p_.from.dictionary($,
            ).map(
                ($, id) => ({
                    'l entry': Text_Type(
                        $,
                    ),
                    'l location': {
                        'start': {
                            'absolute': 42,
                            'relative': {
                                'line': 42,
                                'column': 42,
                            },
                        },
                        'end': {
                            'absolute': 42,
                            'relative': {
                                'line': 42,
                                'column': 42,
                            },
                        },
                    },
                }),
            ),
        }),
    ),
    'simple types': p_change_context(
        $['simple types'],
        ($) => ({
            'l location': {
                'start': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
                'end': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
            },
            'l dictionary': p_.from.dictionary($,
            ).map(
                ($, id) => ({
                    'l entry': Simple_Type(
                        $,
                    ),
                    'l location': {
                        'start': {
                            'absolute': 42,
                            'relative': {
                                'line': 42,
                                'column': 42,
                            },
                        },
                        'end': {
                            'absolute': 42,
                            'relative': {
                                'line': 42,
                                'column': 42,
                            },
                        },
                    },
                }),
            ),
        }),
    ),
})

export const Dictionary: t_signatures.Dictionary = ($) => ({
    'value': p_change_context(
        $['value'],
        ($) => Value(
            $,
        ),
    ),
})

export const Value: t_signatures.Value = ($) => ({
    'l location': {
        'start': {
            'absolute': 42,
            'relative': {
                'line': 42,
                'column': 42,
            },
        },
        'end': {
            'absolute': 42,
            'relative': {
                'line': 42,
                'column': 42,
            },
        },
    },
    'l state': p_.from.state($).decide(
        ($): s_out.Value.l_state => {
            switch ($[0]) {
                case 'component': return p_.option(
                        $,
                        ($) => ['component', {
                            'type': p_change_context(
                                $['type'],
                                ($) => ({
                                    'l location': {
                                        'start': {
                                            'absolute': 42,
                                            'relative': {
                                                'line': 42,
                                                'column': 42,
                                            },
                                        },
                                        'end': {
                                            'absolute': 42,
                                            'relative': {
                                                'line': 42,
                                                'column': 42,
                                            },
                                        },
                                    },
                                    'l state': p_.from.state($).decide(
                                        ($): s_out.Value.l_state.component.type_.l_state => {
                                            switch ($[0]) {
                                                case 'external': return p_.option(
                                                        $,
                                                        ($) => ['external', {
                                                            'import': p_change_context(
                                                                $['import'],
                                                                ($) => ({
                                                                    'l location': {
                                                                        'start': {
                                                                            'absolute': 42,
                                                                            'relative': {
                                                                                'line': 42,
                                                                                'column': 42,
                                                                            },
                                                                        },
                                                                        'end': {
                                                                            'absolute': 42,
                                                                            'relative': {
                                                                                'line': 42,
                                                                                'column': 42,
                                                                            },
                                                                        },
                                                                    },
                                                                    'l reference': $['l id'],
                                                                }),
                                                            ),
                                                            'module': p_change_context(
                                                                $['module'],
                                                                ($) => ({
                                                                    'l location': {
                                                                        'start': {
                                                                            'absolute': 42,
                                                                            'relative': {
                                                                                'line': 42,
                                                                                'column': 42,
                                                                            },
                                                                        },
                                                                        'end': {
                                                                            'absolute': 42,
                                                                            'relative': {
                                                                                'line': 42,
                                                                                'column': 42,
                                                                            },
                                                                        },
                                                                    },
                                                                    'l reference': $['l id'],
                                                                }),
                                                            ),
                                                        }],
                                                    )
                                                case 'internal': return p_.option(
                                                        $,
                                                        ($) => ['internal', {
                                                            'l location': {
                                                                'start': {
                                                                    'absolute': 42,
                                                                    'relative': {
                                                                        'line': 42,
                                                                        'column': 42,
                                                                    },
                                                                },
                                                                'end': {
                                                                    'absolute': 42,
                                                                    'relative': {
                                                                        'line': 42,
                                                                        'column': 42,
                                                                    },
                                                                },
                                                            },
                                                            'l reference': $['l id'],
                                                        }],
                                                    )
                                                case 'internal acyclic': return p_.option(
                                                        $,
                                                        ($) => ['internal acyclic', {
                                                            'l location': {
                                                                'start': {
                                                                    'absolute': 42,
                                                                    'relative': {
                                                                        'line': 42,
                                                                        'column': 42,
                                                                    },
                                                                },
                                                                'end': {
                                                                    'absolute': 42,
                                                                    'relative': {
                                                                        'line': 42,
                                                                        'column': 42,
                                                                    },
                                                                },
                                                            },
                                                            'l reference': $['l id'],
                                                        }],
                                                    )
                                                default: return p_.exhaustive(
                                                        $[0],
                                                    )
                                            }
                                        },
                                    ),
                                }),
                            ),
                            'results': p_change_context(
                                $['results'],
                                ($) => Value_Results(
                                    $,
                                ),
                            ),
                        }],
                    )
                case 'dictionary': return p_.option(
                        $,
                        ($) => ['dictionary', Dictionary(
                            $,
                        )],
                    )
                case 'group': return p_.option(
                        $,
                        ($) => ['group', Group(
                            $,
                        )],
                    )
                case 'list': return p_.option(
                        $,
                        ($) => ['list', {
                            'value': p_change_context(
                                $['value'],
                                ($) => Value(
                                    $,
                                ),
                            ),
                            'results': p_change_context(
                                $['results'],
                                ($) => Value_Results(
                                    $,
                                ),
                            ),
                        }],
                    )
                case 'nothing': return p_.option(
                        $,
                        ($) => ['nothing', null],
                    )
                case 'simple': return p_.option(
                        $,
                        ($) => ['simple', {
                            'l location': {
                                'start': {
                                    'absolute': 42,
                                    'relative': {
                                        'line': 42,
                                        'column': 42,
                                    },
                                },
                                'end': {
                                    'absolute': 42,
                                    'relative': {
                                        'line': 42,
                                        'column': 42,
                                    },
                                },
                            },
                            'l state': p_.from.state($).decide(
                                ($): s_out.Value.l_state.simple.l_state => {
                                    switch ($[0]) {
                                        case 'global': return p_.option(
                                                $,
                                                ($) => ['global', {
                                                    'l location': {
                                                        'start': {
                                                            'absolute': 42,
                                                            'relative': {
                                                                'line': 42,
                                                                'column': 42,
                                                            },
                                                        },
                                                        'end': {
                                                            'absolute': 42,
                                                            'relative': {
                                                                'line': 42,
                                                                'column': 42,
                                                            },
                                                        },
                                                    },
                                                    'l reference': $['l id'],
                                                }],
                                            )
                                        default: return p_.exhaustive(
                                                $[0],
                                            )
                                    }
                                },
                            ),
                        }],
                    )
                case 'optional': return p_.option(
                        $,
                        ($) => ['optional', Value(
                            $,
                        )],
                    )
                case 'reference': return p_.option(
                        $,
                        ($) => ['reference', {
                            'referent': p_change_context(
                                $['referent'],
                                ($) => Value_Reference(
                                    $,
                                ),
                            ),
                            'type': p_change_context(
                                $['type'],
                                ($) => ({
                                    'l location': {
                                        'start': {
                                            'absolute': 42,
                                            'relative': {
                                                'line': 42,
                                                'column': 42,
                                            },
                                        },
                                        'end': {
                                            'absolute': 42,
                                            'relative': {
                                                'line': 42,
                                                'column': 42,
                                            },
                                        },
                                    },
                                    'l state': p_.from.state($).decide(
                                        ($): s_out.Value.l_state.reference.type_.l_state => {
                                            switch ($[0]) {
                                                case 'derived': return p_.option(
                                                        $,
                                                        ($) => ['derived', null],
                                                    )
                                                case 'selected': return p_.option(
                                                        $,
                                                        ($) => ['selected', {
                                                            'dictionary': p_change_context(
                                                                $['dictionary'],
                                                                ($) => null,
                                                            ),
                                                            'dependency': p_change_context(
                                                                $['dependency'],
                                                                ($) => ({
                                                                    'l location': {
                                                                        'start': {
                                                                            'absolute': 42,
                                                                            'relative': {
                                                                                'line': 42,
                                                                                'column': 42,
                                                                            },
                                                                        },
                                                                        'end': {
                                                                            'absolute': 42,
                                                                            'relative': {
                                                                                'line': 42,
                                                                                'column': 42,
                                                                            },
                                                                        },
                                                                    },
                                                                    'l state': p_.from.state($).decide(
                                                                        ($): s_out.Value.l_state.reference.type_.l_state.selected.dependency.l_state => {
                                                                            switch ($[0]) {
                                                                                case 'acyclic': return p_.option(
                                                                                        $,
                                                                                        ($) => ['acyclic', null],
                                                                                    )
                                                                                case 'cyclic': return p_.option(
                                                                                        $,
                                                                                        ($) => ['cyclic', null],
                                                                                    )
                                                                                case 'stack': return p_.option(
                                                                                        $,
                                                                                        ($) => ['stack', null],
                                                                                    )
                                                                                default: return p_.exhaustive(
                                                                                        $[0],
                                                                                    )
                                                                            }
                                                                        },
                                                                    ),
                                                                }),
                                                            ),
                                                            'results': p_change_context(
                                                                $['results'],
                                                                ($) => Value_Results(
                                                                    $,
                                                                ),
                                                            ),
                                                        }],
                                                    )
                                                default: return p_.exhaustive(
                                                        $[0],
                                                    )
                                            }
                                        },
                                    ),
                                }),
                            ),
                        }],
                    )
                case 'state': return p_.option(
                        $,
                        ($) => ['state', {
                            'options': p_change_context(
                                $['options'],
                                ($) => ({
                                    'l location': {
                                        'start': {
                                            'absolute': 42,
                                            'relative': {
                                                'line': 42,
                                                'column': 42,
                                            },
                                        },
                                        'end': {
                                            'absolute': 42,
                                            'relative': {
                                                'line': 42,
                                                'column': 42,
                                            },
                                        },
                                    },
                                    'l dictionary': p_.from.dictionary($,
                                    ).map(
                                        ($, id) => ({
                                            'l entry': {
                                                'constraints': p_change_context(
                                                    $['constraints'],
                                                    ($) => Option_Constraints(
                                                        $,
                                                    ),
                                                ),
                                                'description': p_change_context(
                                                    $['description'],
                                                    ($) => p_.from.optional($,
                                                    ).map(
                                                        ($) => $,
                                                    ),
                                                ),
                                                'value': p_change_context(
                                                    $['value'],
                                                    ($) => Value(
                                                        $,
                                                    ),
                                                ),
                                            },
                                            'l location': {
                                                'start': {
                                                    'absolute': 42,
                                                    'relative': {
                                                        'line': 42,
                                                        'column': 42,
                                                    },
                                                },
                                                'end': {
                                                    'absolute': 42,
                                                    'relative': {
                                                        'line': 42,
                                                        'column': 42,
                                                    },
                                                },
                                            },
                                        }),
                                    ),
                                }),
                            ),
                            'results': p_change_context(
                                $['results'],
                                ($) => Value_Results(
                                    $,
                                ),
                            ),
                        }],
                    )
                case 'text': return p_.option(
                        $,
                        ($) => ['text', {
                            'l location': {
                                'start': {
                                    'absolute': 42,
                                    'relative': {
                                        'line': 42,
                                        'column': 42,
                                    },
                                },
                                'end': {
                                    'absolute': 42,
                                    'relative': {
                                        'line': 42,
                                        'column': 42,
                                    },
                                },
                            },
                            'l state': p_.from.state($).decide(
                                ($): s_out.Value.l_state.text.l_state => {
                                    switch ($[0]) {
                                        case 'global': return p_.option(
                                                $,
                                                ($) => ['global', {
                                                    'l location': {
                                                        'start': {
                                                            'absolute': 42,
                                                            'relative': {
                                                                'line': 42,
                                                                'column': 42,
                                                            },
                                                        },
                                                        'end': {
                                                            'absolute': 42,
                                                            'relative': {
                                                                'line': 42,
                                                                'column': 42,
                                                            },
                                                        },
                                                    },
                                                    'l reference': $['l id'],
                                                }],
                                            )
                                        case 'local': return p_.option(
                                                $,
                                                ($) => ['local', Text_Type(
                                                    $,
                                                )],
                                            )
                                        default: return p_.exhaustive(
                                                $[0],
                                            )
                                    }
                                },
                            ),
                        }],
                    )
                default: return p_.exhaustive(
                        $[0],
                    )
            }
        },
    ),
})

export const Resolver: t_signatures.Resolver = ($) => ({
    'signatures': p_change_context(
        $['signatures'],
        ($) => ({
            'signatures': p_change_context(
                $['signatures'],
                ($) => Resolver_Signatures(
                    $,
                ),
            ),
        }),
    ),
    'modules': p_change_context(
        $['modules'],
        ($) => Resolver_Modules(
            $,
        ),
    ),
})

export const Resolver_Imports: t_signatures.Resolver_Imports = ($) => ({
    'l location': {
        'start': {
            'absolute': 42,
            'relative': {
                'line': 42,
                'column': 42,
            },
        },
        'end': {
            'absolute': 42,
            'relative': {
                'line': 42,
                'column': 42,
            },
        },
    },
    'l dictionary': p_.from.dictionary($,
    ).map(
        ($, id) => ({
            'l entry': {
                'schema set child': p_change_context(
                    $['schema set child'],
                    ($) => ({
                        'l location': {
                            'start': {
                                'absolute': 42,
                                'relative': {
                                    'line': 42,
                                    'column': 42,
                                },
                            },
                            'end': {
                                'absolute': 42,
                                'relative': {
                                    'line': 42,
                                    'column': 42,
                                },
                            },
                        },
                        'l reference': $['l value']['l id'],
                    }),
                ),
                'resolver': p_change_context(
                    $['resolver'],
                    ($) => null,
                ),
            },
            'l location': {
                'start': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
                'end': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
            },
        }),
    ),
})

export const Resolver_Signatures: t_signatures.Resolver_Signatures = ($) => ({
    'l location': {
        'start': {
            'absolute': 42,
            'relative': {
                'line': 42,
                'column': 42,
            },
        },
        'end': {
            'absolute': 42,
            'relative': {
                'line': 42,
                'column': 42,
            },
        },
    },
    'l dictionary': p_.from.dictionary($,
    ).map(
        ($, id) => ({
            'l entry': Resolver_Signature(
                $,
            ),
            'l location': {
                'start': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
                'end': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
            },
        }),
    ),
})

export const Resolver_Signature_Parameters: t_signatures.Resolver_Signature_Parameters = ($) => ({
    'modules': p_change_context(
        $['modules'],
        ($) => ({
            'l location': {
                'start': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
                'end': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
            },
            'l dictionary': p_.from.dictionary($,
            ).map(
                ($, id) => ({
                    'l entry': {
                        'module': p_change_context(
                            $['module'],
                            ($) => Module_Reference(
                                $,
                            ),
                        ),
                        'presence': p_change_context(
                            $['presence'],
                            ($) => Presence(
                                $,
                            ),
                        ),
                    },
                    'l location': {
                        'start': {
                            'absolute': 42,
                            'relative': {
                                'line': 42,
                                'column': 42,
                            },
                        },
                        'end': {
                            'absolute': 42,
                            'relative': {
                                'line': 42,
                                'column': 42,
                            },
                        },
                    },
                }),
            ),
        }),
    ),
    'lookups': p_change_context(
        $['lookups'],
        ($) => ({
            'l location': {
                'start': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
                'end': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
            },
            'l dictionary': p_.from.dictionary($,
            ).map(
                ($, id) => ({
                    'l entry': {
                        'referent': p_change_context(
                            $['referent'],
                            ($) => Module_Reference(
                                $,
                            ),
                        ),
                        'dictionary': p_change_context(
                            $['dictionary'],
                            ($) => null,
                        ),
                        'type': p_change_context(
                            $['type'],
                            ($) => ({
                                'l location': {
                                    'start': {
                                        'absolute': 42,
                                        'relative': {
                                            'line': 42,
                                            'column': 42,
                                        },
                                    },
                                    'end': {
                                        'absolute': 42,
                                        'relative': {
                                            'line': 42,
                                            'column': 42,
                                        },
                                    },
                                },
                                'l state': p_.from.state($).decide(
                                    ($): s_out.Resolver_Signature_Parameters.lookups.l_dictionary.D.l_entry.type_.l_state => {
                                        switch ($[0]) {
                                            case 'cyclic': return p_.option(
                                                    $,
                                                    ($) => ['cyclic', null],
                                                )
                                            case 'acyclic': return p_.option(
                                                    $,
                                                    ($) => ['acyclic', null],
                                                )
                                            case 'stack': return p_.option(
                                                    $,
                                                    ($) => ['stack', null],
                                                )
                                            default: return p_.exhaustive(
                                                    $[0],
                                                )
                                        }
                                    },
                                ),
                            }),
                        ),
                        'presence': p_change_context(
                            $['presence'],
                            ($) => Presence(
                                $,
                            ),
                        ),
                    },
                    'l location': {
                        'start': {
                            'absolute': 42,
                            'relative': {
                                'line': 42,
                                'column': 42,
                            },
                        },
                        'end': {
                            'absolute': 42,
                            'relative': {
                                'line': 42,
                                'column': 42,
                            },
                        },
                    },
                }),
            ),
        }),
    ),
})

export const Resolver_Value: t_signatures.Resolver_Value = ($) => ({
    'l location': {
        'start': {
            'absolute': 42,
            'relative': {
                'line': 42,
                'column': 42,
            },
        },
        'end': {
            'absolute': 42,
            'relative': {
                'line': 42,
                'column': 42,
            },
        },
    },
    'l state': p_.from.state($).decide(
        ($): s_out.Resolver_Value.l_state => {
            switch ($[0]) {
                case 'component': return p_.option(
                        $,
                        ($) => ['component', {
                            'definition': p_change_context(
                                $['definition'],
                                ($) => null,
                            ),
                            'location': p_change_context(
                                $['location'],
                                ($) => ({
                                    'l location': {
                                        'start': {
                                            'absolute': 42,
                                            'relative': {
                                                'line': 42,
                                                'column': 42,
                                            },
                                        },
                                        'end': {
                                            'absolute': 42,
                                            'relative': {
                                                'line': 42,
                                                'column': 42,
                                            },
                                        },
                                    },
                                    'l state': p_.from.state($).decide(
                                        ($): s_out.Resolver_Value.l_state.component.location.l_state => {
                                            switch ($[0]) {
                                                case 'external': return p_.option(
                                                        $,
                                                        ($) => ['external', {
                                                            'schema import': p_change_context(
                                                                $['schema import'],
                                                                ($) => ({
                                                                    'l location': {
                                                                        'start': {
                                                                            'absolute': 42,
                                                                            'relative': {
                                                                                'line': 42,
                                                                                'column': 42,
                                                                            },
                                                                        },
                                                                        'end': {
                                                                            'absolute': 42,
                                                                            'relative': {
                                                                                'line': 42,
                                                                                'column': 42,
                                                                            },
                                                                        },
                                                                    },
                                                                    'l reference': $['l id'],
                                                                }),
                                                            ),
                                                            'resolver import': p_change_context(
                                                                $['resolver import'],
                                                                ($) => ({
                                                                    'l location': {
                                                                        'start': {
                                                                            'absolute': 42,
                                                                            'relative': {
                                                                                'line': 42,
                                                                                'column': 42,
                                                                            },
                                                                        },
                                                                        'end': {
                                                                            'absolute': 42,
                                                                            'relative': {
                                                                                'line': 42,
                                                                                'column': 42,
                                                                            },
                                                                        },
                                                                    },
                                                                    'l reference': $['l id'],
                                                                }),
                                                            ),
                                                            'signature': p_change_context(
                                                                $['signature'],
                                                                ($) => ({
                                                                    'l location': {
                                                                        'start': {
                                                                            'absolute': 42,
                                                                            'relative': {
                                                                                'line': 42,
                                                                                'column': 42,
                                                                            },
                                                                        },
                                                                        'end': {
                                                                            'absolute': 42,
                                                                            'relative': {
                                                                                'line': 42,
                                                                                'column': 42,
                                                                            },
                                                                        },
                                                                    },
                                                                    'l reference': $['l id'],
                                                                }),
                                                            ),
                                                        }],
                                                    )
                                                case 'internal': return p_.option(
                                                        $,
                                                        ($) => ['internal', {
                                                            'l location': {
                                                                'start': {
                                                                    'absolute': 42,
                                                                    'relative': {
                                                                        'line': 42,
                                                                        'column': 42,
                                                                    },
                                                                },
                                                                'end': {
                                                                    'absolute': 42,
                                                                    'relative': {
                                                                        'line': 42,
                                                                        'column': 42,
                                                                    },
                                                                },
                                                            },
                                                            'l reference': $['l id'],
                                                        }],
                                                    )
                                                default: return p_.exhaustive(
                                                        $[0],
                                                    )
                                            }
                                        },
                                    ),
                                }),
                            ),
                            'signature': p_change_context(
                                $['signature'],
                                ($) => null,
                            ),
                            'arguments': p_change_context(
                                $['arguments'],
                                ($) => p_.from.optional($,
                                ).map(
                                    ($) => ({
                                        'modules': p_change_context(
                                            $['modules'],
                                            ($) => p_.from.optional($,
                                            ).map(
                                                ($) => ({
                                                    'l location': {
                                                        'start': {
                                                            'absolute': 42,
                                                            'relative': {
                                                                'line': 42,
                                                                'column': 42,
                                                            },
                                                        },
                                                        'end': {
                                                            'absolute': 42,
                                                            'relative': {
                                                                'line': 42,
                                                                'column': 42,
                                                            },
                                                        },
                                                    },
                                                    'l dictionary': p_.from.dictionary($,
                                                    ).map(
                                                        ($, id) => ({
                                                            'l entry': {
                                                                'l location': {
                                                                    'start': {
                                                                        'absolute': 42,
                                                                        'relative': {
                                                                            'line': 42,
                                                                            'column': 42,
                                                                        },
                                                                    },
                                                                    'end': {
                                                                        'absolute': 42,
                                                                        'relative': {
                                                                            'line': 42,
                                                                            'column': 42,
                                                                        },
                                                                    },
                                                                },
                                                                'l state': p_.from.state($).decide(
                                                                    ($): s_out.Resolver_Value.l_state.component.arguments_.O.modules.O.l_dictionary.D.l_entry.l_state => {
                                                                        switch ($[0]) {
                                                                            case 'optional': return p_.option(
                                                                                    $,
                                                                                    ($) => ['optional', Resolver_Optional_Value_Initialization(
                                                                                        $,
                                                                                    )],
                                                                                )
                                                                            case 'required': return p_.option(
                                                                                    $,
                                                                                    ($) => ['required', Resolver_Guaranteed_Value_Selection(
                                                                                        $,
                                                                                    )],
                                                                                )
                                                                            case 'parameter': return p_.option(
                                                                                    $,
                                                                                    ($) => ['parameter', {
                                                                                        'l location': {
                                                                                            'start': {
                                                                                                'absolute': 42,
                                                                                                'relative': {
                                                                                                    'line': 42,
                                                                                                    'column': 42,
                                                                                                },
                                                                                            },
                                                                                            'end': {
                                                                                                'absolute': 42,
                                                                                                'relative': {
                                                                                                    'line': 42,
                                                                                                    'column': 42,
                                                                                                },
                                                                                            },
                                                                                        },
                                                                                        'l reference': $['l id'],
                                                                                    }],
                                                                                )
                                                                            default: return p_.exhaustive(
                                                                                    $[0],
                                                                                )
                                                                        }
                                                                    },
                                                                ),
                                                            },
                                                            'l location': {
                                                                'start': {
                                                                    'absolute': 42,
                                                                    'relative': {
                                                                        'line': 42,
                                                                        'column': 42,
                                                                    },
                                                                },
                                                                'end': {
                                                                    'absolute': 42,
                                                                    'relative': {
                                                                        'line': 42,
                                                                        'column': 42,
                                                                    },
                                                                },
                                                            },
                                                        }),
                                                    ),
                                                }),
                                            ),
                                        ),
                                        'lookups': p_change_context(
                                            $['lookups'],
                                            ($) => p_.from.optional($,
                                            ).map(
                                                ($) => ({
                                                    'l location': {
                                                        'start': {
                                                            'absolute': 42,
                                                            'relative': {
                                                                'line': 42,
                                                                'column': 42,
                                                            },
                                                        },
                                                        'end': {
                                                            'absolute': 42,
                                                            'relative': {
                                                                'line': 42,
                                                                'column': 42,
                                                            },
                                                        },
                                                    },
                                                    'l dictionary': p_.from.dictionary($,
                                                    ).map(
                                                        ($, id) => ({
                                                            'l entry': {
                                                                'l location': {
                                                                    'start': {
                                                                        'absolute': 42,
                                                                        'relative': {
                                                                            'line': 42,
                                                                            'column': 42,
                                                                        },
                                                                    },
                                                                    'end': {
                                                                        'absolute': 42,
                                                                        'relative': {
                                                                            'line': 42,
                                                                            'column': 42,
                                                                        },
                                                                    },
                                                                },
                                                                'l state': p_.from.state($).decide(
                                                                    ($): s_out.Resolver_Value.l_state.component.arguments_.O.lookups.O.l_dictionary.D.l_entry.l_state => {
                                                                        switch ($[0]) {
                                                                            case 'stack': return p_.option(
                                                                                    $,
                                                                                    ($) => ['stack', {
                                                                                        'l location': {
                                                                                            'start': {
                                                                                                'absolute': 42,
                                                                                                'relative': {
                                                                                                    'line': 42,
                                                                                                    'column': 42,
                                                                                                },
                                                                                            },
                                                                                            'end': {
                                                                                                'absolute': 42,
                                                                                                'relative': {
                                                                                                    'line': 42,
                                                                                                    'column': 42,
                                                                                                },
                                                                                            },
                                                                                        },
                                                                                        'l state': p_.from.state($).decide(
                                                                                            ($): s_out.Resolver_Value.l_state.component.arguments_.O.lookups.O.l_dictionary.D.l_entry.l_state.stack.l_state => {
                                                                                                switch ($[0]) {
                                                                                                    case 'empty': return p_.option(
                                                                                                            $,
                                                                                                            ($) => ['empty', null],
                                                                                                        )
                                                                                                    case 'push': return p_.option(
                                                                                                            $,
                                                                                                            ($) => ['push', {
                                                                                                                'stack': p_change_context(
                                                                                                                    $['stack'],
                                                                                                                    ($) => Resolver_Lookup_Selection(
                                                                                                                        $,
                                                                                                                    ),
                                                                                                                ),
                                                                                                                'item': p_change_context(
                                                                                                                    $['item'],
                                                                                                                    ($) => Resolver_Lookup_Selection(
                                                                                                                        $,
                                                                                                                    ),
                                                                                                                ),
                                                                                                            }],
                                                                                                        )
                                                                                                    default: return p_.exhaustive(
                                                                                                            $[0],
                                                                                                        )
                                                                                                }
                                                                                            },
                                                                                        ),
                                                                                    }],
                                                                                )
                                                                            case 'acyclic': return p_.option(
                                                                                    $,
                                                                                    ($) => ['acyclic', {
                                                                                        'l location': {
                                                                                            'start': {
                                                                                                'absolute': 42,
                                                                                                'relative': {
                                                                                                    'line': 42,
                                                                                                    'column': 42,
                                                                                                },
                                                                                            },
                                                                                            'end': {
                                                                                                'absolute': 42,
                                                                                                'relative': {
                                                                                                    'line': 42,
                                                                                                    'column': 42,
                                                                                                },
                                                                                            },
                                                                                        },
                                                                                        'l state': p_.from.state($).decide(
                                                                                            ($): s_out.Resolver_Value.l_state.component.arguments_.O.lookups.O.l_dictionary.D.l_entry.l_state.acyclic.l_state => {
                                                                                                switch ($[0]) {
                                                                                                    case 'not set': return p_.option(
                                                                                                            $,
                                                                                                            ($) => ['not set', null],
                                                                                                        )
                                                                                                    default: return p_.exhaustive(
                                                                                                            $[0],
                                                                                                        )
                                                                                                }
                                                                                            },
                                                                                        ),
                                                                                    }],
                                                                                )
                                                                            case 'cyclic': return p_.option(
                                                                                    $,
                                                                                    ($) => ['cyclic', {
                                                                                        'l location': {
                                                                                            'start': {
                                                                                                'absolute': 42,
                                                                                                'relative': {
                                                                                                    'line': 42,
                                                                                                    'column': 42,
                                                                                                },
                                                                                            },
                                                                                            'end': {
                                                                                                'absolute': 42,
                                                                                                'relative': {
                                                                                                    'line': 42,
                                                                                                    'column': 42,
                                                                                                },
                                                                                            },
                                                                                        },
                                                                                        'l state': p_.from.state($).decide(
                                                                                            ($): s_out.Resolver_Value.l_state.component.arguments_.O.lookups.O.l_dictionary.D.l_entry.l_state.cyclic.l_state => {
                                                                                                switch ($[0]) {
                                                                                                    case 'not set': return p_.option(
                                                                                                            $,
                                                                                                            ($) => ['not set', null],
                                                                                                        )
                                                                                                    default: return p_.exhaustive(
                                                                                                            $[0],
                                                                                                        )
                                                                                                }
                                                                                            },
                                                                                        ),
                                                                                    }],
                                                                                )
                                                                            case 'selection': return p_.option(
                                                                                    $,
                                                                                    ($) => ['selection', Resolver_Lookup_Selection(
                                                                                        $,
                                                                                    )],
                                                                                )
                                                                            default: return p_.exhaustive(
                                                                                    $[0],
                                                                                )
                                                                        }
                                                                    },
                                                                ),
                                                            },
                                                            'l location': {
                                                                'start': {
                                                                    'absolute': 42,
                                                                    'relative': {
                                                                        'line': 42,
                                                                        'column': 42,
                                                                    },
                                                                },
                                                                'end': {
                                                                    'absolute': 42,
                                                                    'relative': {
                                                                        'line': 42,
                                                                        'column': 42,
                                                                    },
                                                                },
                                                            },
                                                        }),
                                                    ),
                                                }),
                                            ),
                                        ),
                                    }),
                                ),
                            ),
                            'constraints': p_change_context(
                                $['constraints'],
                                ($) => Resolver_Value_Constraints(
                                    $,
                                ),
                            ),
                        }],
                    )
                case 'dictionary': return p_.option(
                        $,
                        ($) => ['dictionary', {
                            'definition': p_change_context(
                                $['definition'],
                                ($) => null,
                            ),
                            'resolver': p_change_context(
                                $['resolver'],
                                ($) => Resolver_Value(
                                    $,
                                ),
                            ),
                            'benchmark': p_change_context(
                                $['benchmark'],
                                ($) => p_.from.optional($,
                                ).map(
                                    ($) => Resolver_Benchmark(
                                        $,
                                    ),
                                ),
                            ),
                        }],
                    )
                case 'group': return p_.option(
                        $,
                        ($) => ['group', Resolver_Value_Group(
                            $,
                        )],
                    )
                case 'list': return p_.option(
                        $,
                        ($) => ['list', {
                            'definition': p_change_context(
                                $['definition'],
                                ($) => null,
                            ),
                            'resolver': p_change_context(
                                $['resolver'],
                                ($) => Resolver_Value(
                                    $,
                                ),
                            ),
                            'result': p_change_context(
                                $['result'],
                                ($) => p_.from.optional($,
                                ).map(
                                    ($) => Resolver_Value_List_Result(
                                        $,
                                    ),
                                ),
                            ),
                        }],
                    )
                case 'nothing': return p_.option(
                        $,
                        ($) => ['nothing', null],
                    )
                case 'simple': return p_.option(
                        $,
                        ($) => ['simple', null],
                    )
                case 'optional': return p_.option(
                        $,
                        ($) => ['optional', {
                            'constraints': p_change_context(
                                $['constraints'],
                                ($) => Resolver_Option_Constraints(
                                    $,
                                ),
                            ),
                            'resolver': p_change_context(
                                $['resolver'],
                                ($) => Resolver_Value(
                                    $,
                                ),
                            ),
                        }],
                    )
                case 'reference': return p_.option(
                        $,
                        ($) => ['reference', {
                            'definition': p_change_context(
                                $['definition'],
                                ($) => null,
                            ),
                            'type': p_change_context(
                                $['type'],
                                ($) => ({
                                    'l location': {
                                        'start': {
                                            'absolute': 42,
                                            'relative': {
                                                'line': 42,
                                                'column': 42,
                                            },
                                        },
                                        'end': {
                                            'absolute': 42,
                                            'relative': {
                                                'line': 42,
                                                'column': 42,
                                            },
                                        },
                                    },
                                    'l state': p_.from.state($).decide(
                                        ($): s_out.Resolver_Value.l_state.reference.type_.l_state => {
                                            switch ($[0]) {
                                                case 'derived': return p_.option(
                                                        $,
                                                        ($) => ['derived', {
                                                            'value': p_change_context(
                                                                $['value'],
                                                                ($) => Resolver_Guaranteed_Value_Selection(
                                                                    $,
                                                                ),
                                                            ),
                                                        }],
                                                    )
                                                case 'selected': return p_.option(
                                                        $,
                                                        ($) => ['selected', {
                                                            'definition': p_change_context(
                                                                $['definition'],
                                                                ($) => null,
                                                            ),
                                                            'lookup': p_change_context(
                                                                $['lookup'],
                                                                ($) => Resolver_Lookup_Selection(
                                                                    $,
                                                                ),
                                                            ),
                                                            'constraints': p_change_context(
                                                                $['constraints'],
                                                                ($) => Resolver_Value_Constraints(
                                                                    $,
                                                                ),
                                                            ),
                                                        }],
                                                    )
                                                default: return p_.exhaustive(
                                                        $[0],
                                                    )
                                            }
                                        },
                                    ),
                                }),
                            ),
                        }],
                    )
                case 'state': return p_.option(
                        $,
                        ($) => ['state', {
                            'definition': p_change_context(
                                $['definition'],
                                ($) => null,
                            ),
                            'options': p_change_context(
                                $['options'],
                                ($) => ({
                                    'l location': {
                                        'start': {
                                            'absolute': 42,
                                            'relative': {
                                                'line': 42,
                                                'column': 42,
                                            },
                                        },
                                        'end': {
                                            'absolute': 42,
                                            'relative': {
                                                'line': 42,
                                                'column': 42,
                                            },
                                        },
                                    },
                                    'l dictionary': p_.from.dictionary($,
                                    ).map(
                                        ($, id) => ({
                                            'l entry': {
                                                'constraints': p_change_context(
                                                    $['constraints'],
                                                    ($) => Resolver_Option_Constraints(
                                                        $,
                                                    ),
                                                ),
                                                'resolver': p_change_context(
                                                    $['resolver'],
                                                    ($) => Resolver_Value(
                                                        $,
                                                    ),
                                                ),
                                            },
                                            'l location': {
                                                'start': {
                                                    'absolute': 42,
                                                    'relative': {
                                                        'line': 42,
                                                        'column': 42,
                                                    },
                                                },
                                                'end': {
                                                    'absolute': 42,
                                                    'relative': {
                                                        'line': 42,
                                                        'column': 42,
                                                    },
                                                },
                                            },
                                        }),
                                    ),
                                }),
                            ),
                        }],
                    )
                case 'text': return p_.option(
                        $,
                        ($) => ['text', null],
                    )
                default: return p_.exhaustive(
                        $[0],
                    )
            }
        },
    ),
})

export const Module_Specification: t_signatures.Module_Specification = ($) => ({
    'schema': p_change_context(
        $['schema'],
        ($) => Schema_Tree(
            $,
        ),
    ),
    'schema path': p_change_context(
        $['schema path'],
        ($) => ({
            'l location': {
                'start': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
                'end': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
            },
            'l list': p_.from.list($,
            ).map(
                ($) => ({
                    'l item': $,
                    'l location': {
                        'start': {
                            'absolute': 42,
                            'relative': {
                                'line': 42,
                                'column': 42,
                            },
                        },
                        'end': {
                            'absolute': 42,
                            'relative': {
                                'line': 42,
                                'column': 42,
                            },
                        },
                    },
                }),
            ),
        }),
    ),
    'complexity': p_change_context(
        $['complexity'],
        ($) => ({
            'l location': {
                'start': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
                'end': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
            },
            'l state': p_.from.state($).decide(
                ($): s_out.Module_Specification.complexity.l_state => {
                    switch ($[0]) {
                        case 'constrained': return p_.option(
                                $,
                                ($) => ['constrained', {
                                    'type resolver': p_change_context(
                                        $['type resolver'],
                                        ($) => $,
                                    ),
                                }],
                            )
                        case 'unconstrained': return p_.option(
                                $,
                                ($) => ['unconstrained', {
                                    'module': p_change_context(
                                        $['module'],
                                        ($) => $,
                                    ),
                                }],
                            )
                        default: return p_.exhaustive(
                                $[0],
                            )
                    }
                },
            ),
        }),
    ),
})

export const Schema_Tree: t_signatures.Schema_Tree = ($) => ({
    'l location': {
        'start': {
            'absolute': 42,
            'relative': {
                'line': 42,
                'column': 42,
            },
        },
        'end': {
            'absolute': 42,
            'relative': {
                'line': 42,
                'column': 42,
            },
        },
    },
    'l state': p_.from.state($).decide(
        ($): s_out.Schema_Tree.l_state => {
            switch ($[0]) {
                case 'schema': return p_.option(
                        $,
                        ($) => ['schema', Schema(
                            $,
                        )],
                    )
                case 'set': return p_.option(
                        $,
                        ($) => ['set', Schemas(
                            $,
                        )],
                    )
                default: return p_.exhaustive(
                        $[0],
                    )
            }
        },
    ),
})

export const Text_Type: t_signatures.Text_Type = ($) => ({
    'type': p_change_context(
        $['type'],
        ($) => ({
            'l location': {
                'start': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
                'end': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
            },
            'l state': p_.from.state($).decide(
                ($): s_out.Text_Type.type_.l_state => {
                    switch ($[0]) {
                        case 'multi line': return p_.option(
                                $,
                                ($) => ['multi line', null],
                            )
                        case 'single line': return p_.option(
                                $,
                                ($) => ['single line', null],
                            )
                        default: return p_.exhaustive(
                                $[0],
                            )
                    }
                },
            ),
        }),
    ),
    'link': p_change_context(
        $['link'],
        ($) => ({
            'l location': {
                'start': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
                'end': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
            },
            'l state': p_.from.state($).decide(
                ($): s_out.Text_Type.link.l_state => {
                    switch ($[0]) {
                        case 'no': return p_.option(
                                $,
                                ($) => ['no', null],
                            )
                        case 'yes': return p_.option(
                                $,
                                ($) => ['yes', {
                                    'path prefix': p_change_context(
                                        $['path prefix'],
                                        ($) => $,
                                    ),
                                    'path suffix': p_change_context(
                                        $['path suffix'],
                                        ($) => $,
                                    ),
                                }],
                            )
                        default: return p_.exhaustive(
                                $[0],
                            )
                    }
                },
            ),
        }),
    ),
})

export const Simple_Type: t_signatures.Simple_Type = ($) => ({
    'type': p_change_context(
        $['type'],
        ($) => ({
            'l location': {
                'start': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
                'end': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
            },
            'l state': p_.from.state($).decide(
                ($): s_out.Simple_Type.type_.l_state => {
                    switch ($[0]) {
                        case 'boolean': return p_.option(
                                $,
                                ($) => ['boolean', null],
                            )
                        case 'date': return p_.option(
                                $,
                                ($) => ['date', null],
                            )
                        case 'number': return p_.option(
                                $,
                                ($) => ['number', {
                                    'precision': p_change_context(
                                        $['precision'],
                                        ($) => ({
                                            'l location': {
                                                'start': {
                                                    'absolute': 42,
                                                    'relative': {
                                                        'line': 42,
                                                        'column': 42,
                                                    },
                                                },
                                                'end': {
                                                    'absolute': 42,
                                                    'relative': {
                                                        'line': 42,
                                                        'column': 42,
                                                    },
                                                },
                                            },
                                            'l state': p_.from.state($).decide(
                                                ($): s_out.Simple_Type.type_.l_state.number_.precision.l_state => {
                                                    switch ($[0]) {
                                                        case 'approximation': return p_.option(
                                                                $,
                                                                ($) => ['approximation', {
                                                                    'significant digits': p_change_context(
                                                                        $['significant digits'],
                                                                        ($) => $,
                                                                    ),
                                                                }],
                                                            )
                                                        case 'exact': return p_.option(
                                                                $,
                                                                ($) => ['exact', {
                                                                    'number of fractional digits': p_change_context(
                                                                        $['number of fractional digits'],
                                                                        ($) => p_.from.optional($,
                                                                        ).map(
                                                                            ($) => $,
                                                                        ),
                                                                    ),
                                                                    'type': p_change_context(
                                                                        $['type'],
                                                                        ($) => ({
                                                                            'l location': {
                                                                                'start': {
                                                                                    'absolute': 42,
                                                                                    'relative': {
                                                                                        'line': 42,
                                                                                        'column': 42,
                                                                                    },
                                                                                },
                                                                                'end': {
                                                                                    'absolute': 42,
                                                                                    'relative': {
                                                                                        'line': 42,
                                                                                        'column': 42,
                                                                                    },
                                                                                },
                                                                            },
                                                                            'l state': p_.from.state($).decide(
                                                                                ($): s_out.Simple_Type.type_.l_state.number_.precision.l_state.exact.type_.l_state => {
                                                                                    switch ($[0]) {
                                                                                        case 'integer': return p_.option(
                                                                                                $,
                                                                                                ($) => ['integer', null],
                                                                                            )
                                                                                        case 'natural': return p_.option(
                                                                                                $,
                                                                                                ($) => ['natural', null],
                                                                                            )
                                                                                        case 'positive natural': return p_.option(
                                                                                                $,
                                                                                                ($) => ['positive natural', null],
                                                                                            )
                                                                                        default: return p_.exhaustive(
                                                                                                $[0],
                                                                                            )
                                                                                    }
                                                                                },
                                                                            ),
                                                                        }),
                                                                    ),
                                                                }],
                                                            )
                                                        default: return p_.exhaustive(
                                                                $[0],
                                                            )
                                                    }
                                                },
                                            ),
                                        }),
                                    ),
                                }],
                            )
                        default: return p_.exhaustive(
                                $[0],
                            )
                    }
                },
            ),
        }),
    ),
})

export const Module: t_signatures.Module = ($) => ({
    'root value': p_change_context(
        $['root value'],
        ($) => Value(
            $,
        ),
    ),
})

export const Presence: t_signatures.Presence = ($) => ({
    'l location': {
        'start': {
            'absolute': 42,
            'relative': {
                'line': 42,
                'column': 42,
            },
        },
        'end': {
            'absolute': 42,
            'relative': {
                'line': 42,
                'column': 42,
            },
        },
    },
    'l state': p_.from.state($).decide(
        ($): s_out.Presence.l_state => {
            switch ($[0]) {
                case 'optional': return p_.option(
                        $,
                        ($) => ['optional', null],
                    )
                case 'required': return p_.option(
                        $,
                        ($) => ['required', null],
                    )
                default: return p_.exhaustive(
                        $[0],
                    )
            }
        },
    ),
})

export const Resolver_Modules: t_signatures.Resolver_Modules = ($) => ({
    'l location': {
        'start': {
            'absolute': 42,
            'relative': {
                'line': 42,
                'column': 42,
            },
        },
        'end': {
            'absolute': 42,
            'relative': {
                'line': 42,
                'column': 42,
            },
        },
    },
    'l dictionary': p_.from.dictionary($,
    ).map(
        ($, id) => ({
            'l entry': {
                'signature': p_change_context(
                    $['signature'],
                    ($) => null,
                ),
                'root value resolver': p_change_context(
                    $['root value resolver'],
                    ($) => Resolver_Value(
                        $,
                    ),
                ),
            },
            'l location': {
                'start': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
                'end': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
            },
        }),
    ),
})

export const Resolver_Benchmark: t_signatures.Resolver_Benchmark = ($) => ({
    'selection': p_change_context(
        $['selection'],
        ($) => Resolver_Guaranteed_Value_Selection(
            $['l value'],
        ),
    ),
    'resulting dictionary': p_change_context(
        $['resulting dictionary'],
        ($) => null,
    ),
    'dense': p_change_context(
        $['dense'],
        ($) => $,
    ),
})

export const Group: t_signatures.Group = ($) => ({
    'l location': {
        'start': {
            'absolute': 42,
            'relative': {
                'line': 42,
                'column': 42,
            },
        },
        'end': {
            'absolute': 42,
            'relative': {
                'line': 42,
                'column': 42,
            },
        },
    },
    'l dictionary': p_.from.dictionary($,
    ).map(
        ($, id) => ({
            'l entry': {
                'description': p_change_context(
                    $['description'],
                    ($) => p_.from.optional($,
                    ).map(
                        ($) => $,
                    ),
                ),
                'value': p_change_context(
                    $['value'],
                    ($) => Value(
                        $,
                    ),
                ),
            },
            'l location': {
                'start': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
                'end': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
            },
        }),
    ),
})

export const Value_Reference: t_signatures.Value_Reference = ($) => ({
    'module': p_change_context(
        $['module'],
        ($) => Module_Reference(
            $,
        ),
    ),
    'path': p_change_context(
        $['path'],
        ($) => Value_Path(
            $,
        ),
    ),
})

export const Value_Path: t_signatures.Value_Path = ($) => ({
    'tail': p_change_context(
        $['tail'],
        ($) => ({
            'l location': {
                'start': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
                'end': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
            },
            'l list': p_.from.list($['l value'],
            ).map(
                ($) => ({
                    'l item': p_change_context(
                        $['l item'],
                        ($) => ({
                            'l location': {
                                'start': {
                                    'absolute': 42,
                                    'relative': {
                                        'line': 42,
                                        'column': 42,
                                    },
                                },
                                'end': {
                                    'absolute': 42,
                                    'relative': {
                                        'line': 42,
                                        'column': 42,
                                    },
                                },
                            },
                            'l state': p_.from.state($['l value']).decide(
                                ($): s_out.Value_Path.tail.l_list.L.l_item.l_state => {
                                    switch ($[0]) {
                                        case 'dictionary': return p_.option(
                                                $,
                                                ($) => ['dictionary', null],
                                            )
                                        case 'group': return p_.option(
                                                $,
                                                ($) => ['group', {
                                                    'l location': {
                                                        'start': {
                                                            'absolute': 42,
                                                            'relative': {
                                                                'line': 42,
                                                                'column': 42,
                                                            },
                                                        },
                                                        'end': {
                                                            'absolute': 42,
                                                            'relative': {
                                                                'line': 42,
                                                                'column': 42,
                                                            },
                                                        },
                                                    },
                                                    'l reference': $['l id'],
                                                }],
                                            )
                                        case 'list': return p_.option(
                                                $,
                                                ($) => ['list', null],
                                            )
                                        case 'optional': return p_.option(
                                                $,
                                                ($) => ['optional', null],
                                            )
                                        case 'state': return p_.option(
                                                $,
                                                ($) => ['state', {
                                                    'l location': {
                                                        'start': {
                                                            'absolute': 42,
                                                            'relative': {
                                                                'line': 42,
                                                                'column': 42,
                                                            },
                                                        },
                                                        'end': {
                                                            'absolute': 42,
                                                            'relative': {
                                                                'line': 42,
                                                                'column': 42,
                                                            },
                                                        },
                                                    },
                                                    'l reference': $['l id'],
                                                }],
                                            )
                                        default: return p_.exhaustive(
                                                $[0],
                                            )
                                    }
                                },
                            ),
                        }),
                    ),
                    'l location': {
                        'start': {
                            'absolute': 42,
                            'relative': {
                                'line': 42,
                                'column': 42,
                            },
                        },
                        'end': {
                            'absolute': 42,
                            'relative': {
                                'line': 42,
                                'column': 42,
                            },
                        },
                    },
                }),
            ),
        }),
    ),
    'resulting node': p_change_context(
        $['resulting node'],
        ($) => null,
    ),
})

export const Module_Reference: t_signatures.Module_Reference = ($) => ({
    'location': p_change_context(
        $['location'],
        ($) => ({
            'l location': {
                'start': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
                'end': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
            },
            'l state': p_.from.state($).decide(
                ($): s_out.Module_Reference.location.l_state => {
                    switch ($[0]) {
                        case 'internal': return p_.option(
                                $,
                                ($) => ['internal', {
                                    'l location': {
                                        'start': {
                                            'absolute': 42,
                                            'relative': {
                                                'line': 42,
                                                'column': 42,
                                            },
                                        },
                                        'end': {
                                            'absolute': 42,
                                            'relative': {
                                                'line': 42,
                                                'column': 42,
                                            },
                                        },
                                    },
                                    'l reference': $['l id'],
                                }],
                            )
                        case 'external': return p_.option(
                                $,
                                ($) => ['external', {
                                    'import': p_change_context(
                                        $['import'],
                                        ($) => ({
                                            'l location': {
                                                'start': {
                                                    'absolute': 42,
                                                    'relative': {
                                                        'line': 42,
                                                        'column': 42,
                                                    },
                                                },
                                                'end': {
                                                    'absolute': 42,
                                                    'relative': {
                                                        'line': 42,
                                                        'column': 42,
                                                    },
                                                },
                                            },
                                            'l reference': $['l id'],
                                        }),
                                    ),
                                    'module': p_change_context(
                                        $['module'],
                                        ($) => ({
                                            'l location': {
                                                'start': {
                                                    'absolute': 42,
                                                    'relative': {
                                                        'line': 42,
                                                        'column': 42,
                                                    },
                                                },
                                                'end': {
                                                    'absolute': 42,
                                                    'relative': {
                                                        'line': 42,
                                                        'column': 42,
                                                    },
                                                },
                                            },
                                            'l reference': $['l id'],
                                        }),
                                    ),
                                }],
                            )
                        default: return p_.exhaustive(
                                $[0],
                            )
                    }
                },
            ),
        }),
    ),
    'resulting module': p_change_context(
        $['resulting module'],
        ($) => null,
    ),
})

export const Resolver_Signature: t_signatures.Resolver_Signature = ($) => ({
    'module': p_change_context(
        $['module'],
        ($) => null,
    ),
    'parameters': p_change_context(
        $['parameters'],
        ($) => ({
            'l location': {
                'start': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
                'end': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
            },
            'l state': p_.from.state($).decide(
                ($): s_out.Resolver_Signature.parameters.l_state => {
                    switch ($[0]) {
                        case 'local': return p_.option(
                                $,
                                ($) => ['local', Resolver_Signature_Parameters(
                                    $,
                                )],
                            )
                        case 'same as': return p_.option(
                                $,
                                ($) => ['same as', {
                                    'l location': {
                                        'start': {
                                            'absolute': 42,
                                            'relative': {
                                                'line': 42,
                                                'column': 42,
                                            },
                                        },
                                        'end': {
                                            'absolute': 42,
                                            'relative': {
                                                'line': 42,
                                                'column': 42,
                                            },
                                        },
                                    },
                                    'l reference': $['l id'],
                                }],
                            )
                        default: return p_.exhaustive(
                                $[0],
                            )
                    }
                },
            ),
        }),
    ),
    'resolved parameters': p_change_context(
        $['resolved parameters'],
        ($) => null,
    ),
})

export const Resolver_Relative_Value_Selection: t_signatures.Resolver_Relative_Value_Selection = ($) => ({
    'path': p_change_context(
        $['path'],
        ($) => ({
            'l location': {
                'start': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
                'end': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
            },
            'l list': p_.from.list($['l value'],
            ).map(
                ($) => ({
                    'l item': p_change_context(
                        $['l item'],
                        ($) => ({
                            'l location': {
                                'start': {
                                    'absolute': 42,
                                    'relative': {
                                        'line': 42,
                                        'column': 42,
                                    },
                                },
                                'end': {
                                    'absolute': 42,
                                    'relative': {
                                        'line': 42,
                                        'column': 42,
                                    },
                                },
                            },
                            'l state': p_.from.state($).decide(
                                ($): s_out.Resolver_Relative_Value_Selection.path.l_list.L.l_item.l_state => {
                                    switch ($[0]) {
                                        case 'state': return ['state', {
                                            'l location': { start: { absolute: 42, relative: { line: 42, column: 42 } }, end: { absolute: 42, relative: { line: 42, column: 42 } } },
                                            'l reference': $[1]['l id'],
                                        }]
                                        case 'component': return p_.option(
                                                $,
                                                ($) => ['component', null],
                                            )
                                        case 'group': return p_.option(
                                                $,
                                                ($) => ['group', {
                                                    'l location': {
                                                        'start': {
                                                            'absolute': 42,
                                                            'relative': {
                                                                'line': 42,
                                                                'column': 42,
                                                            },
                                                        },
                                                        'end': {
                                                            'absolute': 42,
                                                            'relative': {
                                                                'line': 42,
                                                                'column': 42,
                                                            },
                                                        },
                                                    },
                                                    'l reference': $['l id'],
                                                }],
                                            )
                                        case 'reference': return p_.option(
                                                $,
                                                ($) => ['reference', {
                                                    'definition': p_change_context(
                                                        $['definition'],
                                                        ($) => null,
                                                    ),
                                                }],
                                            )
                                        default: return p_.exhaustive(
                                                $[0],
                                            )
                                    }
                                },
                            ),
                        }),
                    ),
                    'l location': {
                        'start': {
                            'absolute': 42,
                            'relative': {
                                'line': 42,
                                'column': 42,
                            },
                        },
                        'end': {
                            'absolute': 42,
                            'relative': {
                                'line': 42,
                                'column': 42,
                            },
                        },
                    },
                }),
            ),
        }),
    ),
    'resulting node': p_change_context(
        $['resulting node'],
        ($) => null,
    ),
})

export const Resolver_Lookup_Selection: t_signatures.Resolver_Lookup_Selection = ($) => ({
    'type': p_change_context(
        $['type'],
        ($) => ({
            'l location': {
                'start': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
                'end': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
            },
            'l state': p_.from.state($).decide(
                ($): s_out.Resolver_Lookup_Selection.type_.l_state => {
                    switch ($[0]) {
                        case 'acyclic': return p_.option(
                                $,
                                ($) => ['acyclic', {
                                    'l location': {
                                        'start': {
                                            'absolute': 42,
                                            'relative': {
                                                'line': 42,
                                                'column': 42,
                                            },
                                        },
                                        'end': {
                                            'absolute': 42,
                                            'relative': {
                                                'line': 42,
                                                'column': 42,
                                            },
                                        },
                                    },
                                    'l state': p_.from.state($).decide(
                                        ($): s_out.Resolver_Lookup_Selection.type_.l_state.acyclic.l_state => {
                                            switch ($[0]) {
                                                case 'siblings': return p_.option(
                                                        $,
                                                        ($) => ['siblings', null],
                                                    )
                                                case 'resolved dictionary': return p_.option(
                                                        $,
                                                        ($) => ['resolved dictionary', {
                                                            'selection': p_change_context(
                                                                $['selection'],
                                                                ($) => Resolver_Guaranteed_Value_Selection(
                                                                    $,
                                                                ),
                                                            ),
                                                            'selected dictionary': p_change_context(
                                                                $['selected dictionary'],
                                                                ($) => null,
                                                            ),
                                                        }],
                                                    )
                                                default: return p_.exhaustive(
                                                        $[0],
                                                    )
                                            }
                                        },
                                    ),
                                }],
                            )
                        case 'cyclic': return p_.option(
                                $,
                                ($) => ['cyclic', {
                                    'l location': {
                                        'start': {
                                            'absolute': 42,
                                            'relative': {
                                                'line': 42,
                                                'column': 42,
                                            },
                                        },
                                        'end': {
                                            'absolute': 42,
                                            'relative': {
                                                'line': 42,
                                                'column': 42,
                                            },
                                        },
                                    },
                                    'l state': p_.from.state($).decide(
                                        ($): s_out.Resolver_Lookup_Selection.type_.l_state.cyclic.l_state => {
                                            switch ($[0]) {
                                                case 'siblings': return p_.option(
                                                        $,
                                                        ($) => ['siblings', null],
                                                    )
                                                default: return p_.exhaustive(
                                                        $[0],
                                                    )
                                            }
                                        },
                                    ),
                                }],
                            )
                        case 'parameter': return p_.option(
                                $,
                                ($) => ['parameter', {
                                    'l location': {
                                        'start': {
                                            'absolute': 42,
                                            'relative': {
                                                'line': 42,
                                                'column': 42,
                                            },
                                        },
                                        'end': {
                                            'absolute': 42,
                                            'relative': {
                                                'line': 42,
                                                'column': 42,
                                            },
                                        },
                                    },
                                    'l reference': $['l id'],
                                }],
                            )
                        default: return p_.exhaustive(
                                $[0],
                            )
                    }
                },
            ),
        }),
    ),
    'resulting dictionary': p_change_context(
        $['resulting dictionary'],
        ($) => null,
    ),
})

export const Resolver_Constraint: t_signatures.Resolver_Constraint = ($) => ({
    'selection': p_change_context(
        $['selection'],
        ($) => Resolver_Relative_Value_Selection(
            $,
        ),
    ),
    'type': p_change_context(
        $['type'],
        ($) => ({
            'l location': {
                'start': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
                'end': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
            },
            'l state': p_.from.state($).decide(
                ($): s_out.Resolver_Constraint.type_.l_state => {
                    switch ($[0]) {
                        case 'state': return p_.option(
                                $,
                                ($) => ['state', {
                                    'selected state': p_change_context(
                                        $['selected state'],
                                        ($) => null,
                                    ),
                                    'option': p_change_context(
                                        $['option'],
                                        ($) => ({
                                            'l location': {
                                                'start': {
                                                    'absolute': 42,
                                                    'relative': {
                                                        'line': 42,
                                                        'column': 42,
                                                    },
                                                },
                                                'end': {
                                                    'absolute': 42,
                                                    'relative': {
                                                        'line': 42,
                                                        'column': 42,
                                                    },
                                                },
                                            },
                                            'l reference': $['l id'],
                                        }),
                                    ),
                                }],
                            )
                        case 'optional value': return p_.option(
                                $,
                                ($) => ['optional value', {
                                    'selected optional value': p_change_context(
                                        $['selected optional value'],
                                        ($) => null,
                                    ),
                                }],
                            )
                        default: return p_.exhaustive(
                                $[0],
                            )
                    }
                },
            ),
        }),
    ),
})

export const Resolver_Option_Constraints: t_signatures.Resolver_Option_Constraints = ($) => ({
    'l location': {
        'start': {
            'absolute': 42,
            'relative': {
                'line': 42,
                'column': 42,
            },
        },
        'end': {
            'absolute': 42,
            'relative': {
                'line': 42,
                'column': 42,
            },
        },
    },
    'l dictionary': p_.from.dictionary($,
    ).map(
        ($, id) => ({
            'l entry': {
                'l location': {
                    'start': {
                        'absolute': 42,
                        'relative': {
                            'line': 42,
                            'column': 42,
                        },
                    },
                    'end': {
                        'absolute': 42,
                        'relative': {
                            'line': 42,
                            'column': 42,
                        },
                    },
                },
                'l state': p_.from.state($).decide(
                    ($): s_out.Resolver_Option_Constraints.l_dictionary.D.l_entry.l_state => {
                        switch ($[0]) {
                            case 'state': return p_.option(
                                    $,
                                    ($) => ['state', {
                                        'selection': p_change_context(
                                            $['selection'],
                                            ($) => Resolver_Guaranteed_Value_Selection(
                                                $,
                                            ),
                                        ),
                                        'selected state': p_change_context(
                                            $['selected state'],
                                            ($) => null,
                                        ),
                                        'option': p_change_context(
                                            $['option'],
                                            ($) => ({
                                                'l location': {
                                                    'start': {
                                                        'absolute': 42,
                                                        'relative': {
                                                            'line': 42,
                                                            'column': 42,
                                                        },
                                                    },
                                                    'end': {
                                                        'absolute': 42,
                                                        'relative': {
                                                            'line': 42,
                                                            'column': 42,
                                                        },
                                                    },
                                                },
                                                'l reference': $['l id'],
                                            }),
                                        ),
                                    }],
                                )
                            case 'assert is set': return p_.option(
                                    $,
                                    ($) => ['assert is set', Resolver_Possible_Value_Selection(
                                        $,
                                    )],
                                )
                            default: return p_.exhaustive(
                                    $[0],
                                )
                        }
                    },
                ),
            },
            'l location': {
                'start': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
                'end': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
            },
        }),
    ),
})

export const Resolver_Optional_Value_Constraints: t_signatures.Resolver_Optional_Value_Constraints = ($) => p_.from.optional($,
).map(
    ($) => Resolver_Value_Constraints(
        $,
    ),
)

export const Resolver_Value_Constraints: t_signatures.Resolver_Value_Constraints = ($) => ({
    'l location': {
        'start': {
            'absolute': 42,
            'relative': {
                'line': 42,
                'column': 42,
            },
        },
        'end': {
            'absolute': 42,
            'relative': {
                'line': 42,
                'column': 42,
            },
        },
    },
    'l dictionary': p_.from.dictionary($,
    ).map(
        ($, id) => ({
            'l entry': Resolver_Value_Constraint(
                $,
            ),
            'l location': {
                'start': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
                'end': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
            },
        }),
    ),
})

export const Resolver_Reference_To_Value_Constraint: t_signatures.Resolver_Reference_To_Value_Constraint = ($) => ({
    'l location': {
        'start': {
            'absolute': 42,
            'relative': {
                'line': 42,
                'column': 42,
            },
        },
        'end': {
            'absolute': 42,
            'relative': {
                'line': 42,
                'column': 42,
            },
        },
    },
    'l reference': $['l id'],
})

export const Resolver_Value_Constraint: t_signatures.Resolver_Value_Constraint = ($) => ({
    'start': p_change_context(
        $['start'],
        ($) => ({
            'l location': {
                'start': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
                'end': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
            },
            'l state': p_.from.state($).decide(
                ($): s_out.Resolver_Value_Constraint.start.l_state => {
                    switch ($[0]) {
                        case 'value': return p_.option(
                                $,
                                ($) => ['value', null],
                            )
                        case 'sibling': return p_.option(
                                $,
                                ($) => ['sibling', Resolver_Reference_To_Value_Constraint(
                                    $,
                                )],
                            )
                        default: return p_.exhaustive(
                                $[0],
                            )
                    }
                },
            ),
        }),
    ),
    'constraint': p_change_context(
        $['constraint'],
        ($) => Resolver_Constraint(
            $,
        ),
    ),
})

export const Resolver_Optional_Value_Initialization: t_signatures.Resolver_Optional_Value_Initialization = ($) => ({
    'l location': {
        'start': {
            'absolute': 42,
            'relative': {
                'line': 42,
                'column': 42,
            },
        },
        'end': {
            'absolute': 42,
            'relative': {
                'line': 42,
                'column': 42,
            },
        },
    },
    'l state': p_.from.state($).decide(
        ($): s_out.Resolver_Optional_Value_Initialization.l_state => {
            switch ($[0]) {
                case 'not set': return p_.option(
                        $,
                        ($) => ['not set', null],
                    )
                case 'set': return p_.option(
                        $,
                        ($) => ['set', Resolver_Guaranteed_Value_Selection(
                            $,
                        )],
                    )
                case 'selection': return p_.option(
                        $,
                        ($) => ['selection', Resolver_Possible_Value_Selection(
                            $,
                        )],
                    )
                default: return p_.exhaustive(
                        $[0],
                    )
            }
        },
    ),
})

export const Resolver_Value_Group: t_signatures.Resolver_Value_Group = ($) => ({
    'l location': {
        'start': {
            'absolute': 42,
            'relative': {
                'line': 42,
                'column': 42,
            },
        },
        'end': {
            'absolute': 42,
            'relative': {
                'line': 42,
                'column': 42,
            },
        },
    },
    'l dictionary': p_.from.dictionary($,
    ).map(
        ($, id) => ({
            'l entry': {
                'definition': p_change_context(
                    $['definition'],
                    ($) => null,
                ),
                'resolver': p_change_context(
                    $['resolver'],
                    ($) => Resolver_Value(
                        $,
                    ),
                ),
            },
            'l location': {
                'start': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
                'end': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
            },
        }),
    ),
})

export const Resolver_Value_List_Result: t_signatures.Resolver_Value_List_Result = ($) => Module_Reference(
    $,
)

export const Value_Results: t_signatures.Value_Results = ($) => p_.from.optional($,
).map(
    ($) => ({
        'l location': {
            'start': {
                'absolute': 42,
                'relative': {
                    'line': 42,
                    'column': 42,
                },
            },
            'end': {
                'absolute': 42,
                'relative': {
                    'line': 42,
                    'column': 42,
                },
            },
        },
        'l dictionary': p_.from.dictionary($,
        ).map(
            ($, id) => ({
                'l entry': Value_Reference(
                    $,
                ),
                'l location': {
                    'start': {
                        'absolute': 42,
                        'relative': {
                            'line': 42,
                            'column': 42,
                        },
                    },
                    'end': {
                        'absolute': 42,
                        'relative': {
                            'line': 42,
                            'column': 42,
                        },
                    },
                },
            }),
        ),
    }),
)

export const Option_Constraints: t_signatures.Option_Constraints = ($) => p_.from.optional($,
).map(
    ($) => ({
        'l location': {
            'start': {
                'absolute': 42,
                'relative': {
                    'line': 42,
                    'column': 42,
                },
            },
            'end': {
                'absolute': 42,
                'relative': {
                    'line': 42,
                    'column': 42,
                },
            },
        },
        'l dictionary': p_.from.dictionary($,
        ).map(
            ($, id) => ({
                'l entry': Value_Reference(
                    $,
                ),
                'l location': {
                    'start': {
                        'absolute': 42,
                        'relative': {
                            'line': 42,
                            'column': 42,
                        },
                    },
                    'end': {
                        'absolute': 42,
                        'relative': {
                            'line': 42,
                            'column': 42,
                        },
                    },
                },
            }),
        ),
    }),
)

export const Resolver_Guaranteed_Value_Selection: t_signatures.Resolver_Guaranteed_Value_Selection = ($) => ({
    'start': p_change_context(
        $['start'],
        ($) => ({
            'l location': {
                'start': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
                'end': {
                    'absolute': 42,
                    'relative': {
                        'line': 42,
                        'column': 42,
                    },
                },
            },
            'l state': p_.from.state($).decide(
                ($): s_out.Resolver_Guaranteed_Value_Selection.start.l_state => {
                    switch ($[0]) {
                        case 'previous item': return ['previous item', { initial: Resolver_Guaranteed_Value_Selection($[1].initial) }]
                        case 'last item': return ['last item', {
                            initial: Resolver_Guaranteed_Value_Selection($[1].initial),
                            property: {
                                'l location': { start: { absolute: 42, relative: { line: 42, column: 42 } }, end: { absolute: 42, relative: { line: 42, column: 42 } } },
                                'l reference': $[1].property['l id'],
                            },
                        }]
                        case 'sibling': return p_.option(
                                $,
                                ($) => ['sibling', {
                                    'l location': {
                                        'start': {
                                            'absolute': 42,
                                            'relative': {
                                                'line': 42,
                                                'column': 42,
                                            },
                                        },
                                        'end': {
                                            'absolute': 42,
                                            'relative': {
                                                'line': 42,
                                                'column': 42,
                                            },
                                        },
                                    },
                                    'l reference': $['l id'],
                                }],
                            )
                        case 'parent sibling': return p_.option(
                                $,
                                ($) => ['parent sibling', {
                                    'l location': {
                                        'start': {
                                            'absolute': 42,
                                            'relative': {
                                                'line': 42,
                                                'column': 42,
                                            },
                                        },
                                        'end': {
                                            'absolute': 42,
                                            'relative': {
                                                'line': 42,
                                                'column': 42,
                                            },
                                        },
                                    },
                                    'l reference': $['l id'],
                                }],
                            )
                        case 'option constraint': return p_.option(
                                $,
                                ($) => ['option constraint', {
                                    'l location': {
                                        'start': {
                                            'absolute': 42,
                                            'relative': {
                                                'line': 42,
                                                'column': 42,
                                            },
                                        },
                                        'end': {
                                            'absolute': 42,
                                            'relative': {
                                                'line': 42,
                                                'column': 42,
                                            },
                                        },
                                    },
                                    'l reference': $['l id'],
                                }],
                            )
                        case 'list cursor': return p_.option(
                                $,
                                ($) => ['list cursor', null],
                            )
                        case 'linked entry': return p_.option(
                                $,
                                ($) => ['linked entry', null],
                            )
                        case 'constraint': return p_.option(
                                $,
                                ($) => ['constraint', {
                                    'l location': {
                                        'start': {
                                            'absolute': 42,
                                            'relative': {
                                                'line': 42,
                                                'column': 42,
                                            },
                                        },
                                        'end': {
                                            'absolute': 42,
                                            'relative': {
                                                'line': 42,
                                                'column': 42,
                                            },
                                        },
                                    },
                                    'l state': p_.from.state($).decide(
                                        ($): s_out.Resolver_Guaranteed_Value_Selection.start.l_state.constraint.l_state => {
                                            switch ($[0]) {
                                                case 'component': return p_.option(
                                                        $,
                                                        ($) => ['component', {
                                                            'property': p_change_context(
                                                                $['property'],
                                                                ($) => ({
                                                                    'l location': {
                                                                        'start': {
                                                                            'absolute': 42,
                                                                            'relative': {
                                                                                'line': 42,
                                                                                'column': 42,
                                                                            },
                                                                        },
                                                                        'end': {
                                                                            'absolute': 42,
                                                                            'relative': {
                                                                                'line': 42,
                                                                                'column': 42,
                                                                            },
                                                                        },
                                                                    },
                                                                    'l reference': $['l id'],
                                                                }),
                                                            ),
                                                            'constraint': p_change_context(
                                                                $['constraint'],
                                                                ($) => ({
                                                                    'l location': {
                                                                        'start': {
                                                                            'absolute': 42,
                                                                            'relative': {
                                                                                'line': 42,
                                                                                'column': 42,
                                                                            },
                                                                        },
                                                                        'end': {
                                                                            'absolute': 42,
                                                                            'relative': {
                                                                                'line': 42,
                                                                                'column': 42,
                                                                            },
                                                                        },
                                                                    },
                                                                    'l reference': $['l id'],
                                                                }),
                                                            ),
                                                        }],
                                                    )
                                                case 'reference': return p_.option(
                                                        $,
                                                        ($) => ['reference', {
                                                            'property': p_change_context(
                                                                $['property'],
                                                                ($) => ({
                                                                    'l location': {
                                                                        'start': {
                                                                            'absolute': 42,
                                                                            'relative': {
                                                                                'line': 42,
                                                                                'column': 42,
                                                                            },
                                                                        },
                                                                        'end': {
                                                                            'absolute': 42,
                                                                            'relative': {
                                                                                'line': 42,
                                                                                'column': 42,
                                                                            },
                                                                        },
                                                                    },
                                                                    'l reference': $['l id'],
                                                                }),
                                                            ),
                                                            'constraint': p_change_context(
                                                                $['constraint'],
                                                                ($) => ({
                                                                    'l location': {
                                                                        'start': {
                                                                            'absolute': 42,
                                                                            'relative': {
                                                                                'line': 42,
                                                                                'column': 42,
                                                                            },
                                                                        },
                                                                        'end': {
                                                                            'absolute': 42,
                                                                            'relative': {
                                                                                'line': 42,
                                                                                'column': 42,
                                                                            },
                                                                        },
                                                                    },
                                                                    'l reference': $['l id'],
                                                                }),
                                                            ),
                                                        }],
                                                    )
                                                default: return p_.exhaustive(
                                                        $[0],
                                                    )
                                            }
                                        },
                                    ),
                                }],
                            )
                        case 'parameter': return p_.option(
                                $,
                                ($) => ['parameter', {
                                    'l location': {
                                        'start': {
                                            'absolute': 42,
                                            'relative': {
                                                'line': 42,
                                                'column': 42,
                                            },
                                        },
                                        'end': {
                                            'absolute': 42,
                                            'relative': {
                                                'line': 42,
                                                'column': 42,
                                            },
                                        },
                                    },
                                    'l reference': $['l id'],
                                }],
                            )
                        case 'result': return p_.option(
                                $,
                                ($) => ['result', {
                                    'l location': {
                                        'start': {
                                            'absolute': 42,
                                            'relative': {
                                                'line': 42,
                                                'column': 42,
                                            },
                                        },
                                        'end': {
                                            'absolute': 42,
                                            'relative': {
                                                'line': 42,
                                                'column': 42,
                                            },
                                        },
                                    },
                                    'l state': p_.from.state($).decide(
                                        ($): s_out.Resolver_Guaranteed_Value_Selection.start.l_state.result.l_state => {
                                            switch ($[0]) {
                                                case 'list': return p_.option(
                                                        $,
                                                        ($) => ['list', {
                                                            'property': p_change_context(
                                                                $['property'],
                                                                ($) => ({
                                                                    'l location': {
                                                                        'start': {
                                                                            'absolute': 42,
                                                                            'relative': {
                                                                                'line': 42,
                                                                                'column': 42,
                                                                            },
                                                                        },
                                                                        'end': {
                                                                            'absolute': 42,
                                                                            'relative': {
                                                                                'line': 42,
                                                                                'column': 42,
                                                                            },
                                                                        },
                                                                    },
                                                                    'l reference': $['l id'],
                                                                }),
                                                            ),
                                                            'list result': p_change_context(
                                                                $['list result'],
                                                                ($) => null,
                                                            ),
                                                        }],
                                                    )
                                                case 'state': return p_.option(
                                                        $,
                                                        ($) => ['state', {
                                                            'property': p_change_context(
                                                                $['property'],
                                                                ($) => ({
                                                                    'l location': {
                                                                        'start': {
                                                                            'absolute': 42,
                                                                            'relative': {
                                                                                'line': 42,
                                                                                'column': 42,
                                                                            },
                                                                        },
                                                                        'end': {
                                                                            'absolute': 42,
                                                                            'relative': {
                                                                                'line': 42,
                                                                                'column': 42,
                                                                            },
                                                                        },
                                                                    },
                                                                    'l reference': $['l id'],
                                                                }),
                                                            ),
                                                            'state': p_change_context(
                                                                $['state'],
                                                                ($) => null,
                                                            ),
                                                            'result': p_change_context(
                                                                $['result'],
                                                                ($) => Module_Reference(
                                                                    $,
                                                                ),
                                                            ),
                                                        }],
                                                    )
                                                case 'optional value': return p_.option(
                                                        $,
                                                        ($) => ['optional value', {
                                                            'property': p_change_context(
                                                                $['property'],
                                                                ($) => ({
                                                                    'l location': {
                                                                        'start': {
                                                                            'absolute': 42,
                                                                            'relative': {
                                                                                'line': 42,
                                                                                'column': 42,
                                                                            },
                                                                        },
                                                                        'end': {
                                                                            'absolute': 42,
                                                                            'relative': {
                                                                                'line': 42,
                                                                                'column': 42,
                                                                            },
                                                                        },
                                                                    },
                                                                    'l reference': $['l id'],
                                                                }),
                                                            ),
                                                            'optional value': p_change_context(
                                                                $['optional value'],
                                                                ($) => null,
                                                            ),
                                                            'result': p_change_context(
                                                                $['result'],
                                                                ($) => Module_Reference(
                                                                    $,
                                                                ),
                                                            ),
                                                        }],
                                                    )
                                                default: return p_.exhaustive(
                                                        $[0],
                                                    )
                                            }
                                        },
                                    ),
                                }],
                            )
                        default: return p_.exhaustive(
                                $[0],
                            )
                    }
                },
            ),
        }),
    ),
    'tail': p_change_context(
        $['tail'],
        ($) => Resolver_Relative_Value_Selection(
            $,
        ),
    ),
    'resulting node': p_change_context(
        $['resulting node'],
        ($) => null,
    ),
})

export const Resolver_Possible_Value_Selection: t_signatures.Resolver_Possible_Value_Selection = ($) => ({
    'l location': {
        'start': {
            'absolute': 42,
            'relative': {
                'line': 42,
                'column': 42,
            },
        },
        'end': {
            'absolute': 42,
            'relative': {
                'line': 42,
                'column': 42,
            },
        },
    },
    'l state': p_.from.state($).decide(
        ($): s_out.Resolver_Possible_Value_Selection.l_state => {
            switch ($[0]) {
                case 'parameter': return p_.option(
                        $,
                        ($) => ['parameter', {
                            'l location': {
                                'start': {
                                    'absolute': 42,
                                    'relative': {
                                        'line': 42,
                                        'column': 42,
                                    },
                                },
                                'end': {
                                    'absolute': 42,
                                    'relative': {
                                        'line': 42,
                                        'column': 42,
                                    },
                                },
                            },
                            'l reference': $['l id'],
                        }],
                    )
                case 'result': return p_.option(
                        $,
                        ($) => ['result', {
                            'l location': {
                                'start': {
                                    'absolute': 42,
                                    'relative': {
                                        'line': 42,
                                        'column': 42,
                                    },
                                },
                                'end': {
                                    'absolute': 42,
                                    'relative': {
                                        'line': 42,
                                        'column': 42,
                                    },
                                },
                            },
                            'l state': p_.from.state($).decide(
                                ($): s_out.Resolver_Possible_Value_Selection.l_state.result.l_state => {
                                    switch ($[0]) {
                                        case 'state': return p_.option(
                                                $,
                                                ($) => ['state', {
                                                    'property': p_change_context(
                                                        $['property'],
                                                        ($) => ({
                                                            'l location': {
                                                                'start': {
                                                                    'absolute': 42,
                                                                    'relative': {
                                                                        'line': 42,
                                                                        'column': 42,
                                                                    },
                                                                },
                                                                'end': {
                                                                    'absolute': 42,
                                                                    'relative': {
                                                                        'line': 42,
                                                                        'column': 42,
                                                                    },
                                                                },
                                                            },
                                                            'l reference': $['l id'],
                                                        }),
                                                    ),
                                                    'state': p_change_context(
                                                        $['state'],
                                                        ($) => null,
                                                    ),
                                                    'result': p_change_context(
                                                        $['result'],
                                                        ($) => Module_Reference(
                                                            $,
                                                        ),
                                                    ),
                                                }],
                                            )
                                        case 'optional value': return p_.option(
                                                $,
                                                ($) => ['optional value', {
                                                    'property': p_change_context(
                                                        $['property'],
                                                        ($) => ({
                                                            'l location': {
                                                                'start': {
                                                                    'absolute': 42,
                                                                    'relative': {
                                                                        'line': 42,
                                                                        'column': 42,
                                                                    },
                                                                },
                                                                'end': {
                                                                    'absolute': 42,
                                                                    'relative': {
                                                                        'line': 42,
                                                                        'column': 42,
                                                                    },
                                                                },
                                                            },
                                                            'l reference': $['l id'],
                                                        }),
                                                    ),
                                                    'optional value': p_change_context(
                                                        $['optional value'],
                                                        ($) => null,
                                                    ),
                                                    'result': p_change_context(
                                                        $['result'],
                                                        ($) => Module_Reference(
                                                            $,
                                                        ),
                                                    ),
                                                }],
                                            )
                                        default: return p_.exhaustive(
                                                $[0],
                                            )
                                    }
                                },
                            ),
                        }],
                    )
                default: return p_.exhaustive(
                        $[0],
                    )
            }
        },
    ),
})
