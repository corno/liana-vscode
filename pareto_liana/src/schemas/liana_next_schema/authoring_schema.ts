import type * as current from './current_generated/structure/schemas/resolved.js'

export * from './current_generated/structure/schemas/resolved.js'

export namespace types {
    export type Type_Specification = current.Type_Specification
    export namespace Type_Specification {
        export type schema = current.Type_Specification.schema
    }
}

export namespace namespaces {
    export namespace structure {
        export namespace types {
            export type Type = current.structure.Type
            export type Types = current.structure.Types
            export namespace Types {
                export type D = current.structure.Types.D
            }
            export type Value = current.structure.Value
            export namespace Value {
                export type component = current.structure.Value.type_.component
                export namespace component {
                    export type type_ = current.structure.Value.type_.component.type_
                }
                export type dictionary = current.structure.Value.type_.dictionary
                export type group = current.structure.Value.type_.group
                export type list = current.structure.Value.type_.list
                export type nothing = current.structure.Value.type_.nothing
                export type optional = current.structure.Value.type_.optional
                export type reference = current.structure.Value.type_.reference
                export type simple = current.structure.Value.type_.simple
                export type state = current.structure.Value.type_.state
                export namespace state {
                    export type options = current.structure.Value.type_.state.options
                    export namespace options {
                        export type D = current.structure.Value.type_.state.options.D
                    }
                }
            }
            export type Group = current.structure.Group
            export namespace Group {
                export type D = current.structure.Group.D
            }
            export type Reference = current.structure.Reference
            export namespace Reference {
                export type type_ = current.structure.Reference.type_
            }
            export type Basic_Types = current.structure.Basic_Types
            export namespace Basic_Types {
                export type D = current.structure.Basic_Types.D
            }
            export type Dictionary = current.structure.Dictionary
            export type Regular_Expression = current.structure.Regular_Expression
        }
    }

    export namespace declarations {
        export namespace types {
            export type Declaration = current.declarations.Declaration
            export type Signature = current.declarations.Signature
        }
    }

    export namespace resolver {
        export namespace types {
            export type Resolver = current.resolver.Resolver
            export namespace Resolver {
                export type types = current.resolver.Resolver.types
                export namespace types {
                    export type D = current.resolver.Resolver.types.D
                }
            }
            export type Relative_Value_Selection = current.resolver.Relative_Value_Selection
            export namespace Relative_Value_Selection {
                export type path = current.resolver.Relative_Value_Selection.path
                export namespace path {
                    export type value = current.resolver.Relative_Value_Selection.path.value
                    export namespace value {
                        export type L = current.resolver.Relative_Value_Selection.path.value.L
                        export namespace L {
                            export type value = current.resolver.Relative_Value_Selection.path.value.L.value
                        }
                    }
                }
            }
            export type Possible_Value_Selection = current.resolver.Possible_Value_Selection
            export type Guaranteed_Value_Selection = current.resolver.Guaranteed_Value_Selection
            export type Lookup_Selection = current.resolver.Lookup_Selection
            export type Option_Constraints = current.resolver.Option_Constraints
            export type Result_Selection = current.resolver.Result_Selection
            export type Reference_Constraints = current.resolver.Reference_Constraints
            export namespace Reference_Constraints {
                export type O = current.resolver.Reference_Constraints.O
                export namespace O {
                    export type value = current.resolver.Reference_Constraints.O.value
                    export namespace value {
                        export type D = current.resolver.Reference_Constraints.O.value.D
                        export namespace D {
                            export type value = current.resolver.Reference_Constraints.O.value.D.value
                            export namespace value {
                                export type start = current.resolver.Reference_Constraints.O.value.D.value.start
                                export namespace start {
                                    export type value = current.resolver.Reference_Constraints.O.value.D.value.start.value
                                }
                                export type constraint = current.resolver.Reference_Constraints.O.value.D.value.constraint
                            }
                        }
                    }
                }
            }
            export type Value = current.resolver.Value
            export namespace Value {
                export type component = current.resolver.Value.type_.component
                export namespace component {
                    export type value = current.resolver.Value.type_.component.value
                    export namespace value {
                        export type arguments_ = current.resolver.Value.type_.component.value.arguments_
                        export namespace arguments_ {
                            export type O = current.resolver.Value.type_.component.value.arguments_.O
                            export namespace O {
                                export type types = current.resolver.Value.type_.component.value.arguments_.O.types
                                export namespace types {
                                    export type O = current.resolver.Value.type_.component.value.arguments_.O.types.O
                                    export namespace O {
                                        export type D = current.resolver.Value.type_.component.value.arguments_.O.types.O.D
                                        export namespace D {
                                            export namespace value {
                                                export type optional = current.resolver.Value.type_.component.value.arguments_.O.types.O.D.value.type_.optional
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            export type Value_Reference = current.resolver.Value_Reference
        }
    }
}
