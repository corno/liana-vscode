//core
import * as p_ from 'pareto-core/command'

//interface dependencies
import type * as command_interfaces_pareto_application_api from "pareto-application-api/commands/interfaces"
import type * as command_interfaces_pareto_filesystem_unrestricted_api from "pareto-filesystem-unrestricted-api/modules/unrestricted/commands/interfaces"
import type * as command_interfaces_pareto_stream_api from "pareto-stream-api/commands/interfaces"

//schemas
import type * as s_main from "pareto-application-api/schemas/main/schema"
import type * as s_packages from "../../schemas/packages/schema.js"
import type * as s_serialize_schemas from "../../schemas/schema_serialization/schema.js"

//dependencies
import * as deser_path from "pareto-filesystem-unrestricted-api/modules/unrestricted/schemas/path/deserializers"
import * as r_schema_resolved_from_unresolved from "../../modules/schema.generated/schemas/resolved/refiners/unresolved_manual.js"
import * as sh from "pareto-fountain-pen/modules/paragraph/schemas/paragraph/shorthands/deprecated"
import * as t_path_to_path from "pareto-filesystem-unrestricted-api/modules/unrestricted/schemas/path/transformers/path_extended_with_single_step"
import * as t_schema_to_paragraph from "../../modules/schema.generated/schemas/resolved/transformers/paragraph.js"
import * as t_serialize_schemas_to_paragraph from "../../schemas/schema_serialization/transformers/paragraph.js"


export const $$: p_.Command_Implementation<
    command_interfaces_pareto_application_api.main,
    {
        'packages': s_packages.Packages
        'newline': string
        'indentation': string
    },
    null,
    {
        'write file': command_interfaces_pareto_filesystem_unrestricted_api.write_file
        'log error paragraph': command_interfaces_pareto_stream_api.log_error_paragraph
    }
> = p_.command(
    ($d, $s, $q, $c) => [
        p_.s.dictionary(
            $s.packages,
            ($, id) => [

                p_.s.handle_error<s_main.Error, s_serialize_schemas.Error>(
                    [

                        p_.s.refine(
                            (abort) => r_schema_resolved_from_unresolved.Package(
                                $.package,
                                ($) => abort(['resolving', $]),
                                p_.literal.nothing(),
                                p_.literal.nothing(),
                            ),
                            ($v) => [
                                $c['write file'].execute(
                                    {
                                        'path': {
                                            'context': t_path_to_path.Context_Path(
                                                deser_path.Context_Path($['target path']),
                                                {
                                                    'addition': "liana"
                                                }
                                            ),
                                            'node': "module.liana.lna"
                                        },
                                        // 'data': p_list_from_text(
                                        //     "IMPLEMENT SERIALIZATION HERE",
                                        //     ($) => $,
                                        // )
                                        'content': {
                                            'paragraph': t_schema_to_paragraph.Package($v),
                                            'parameters': {
                                                'indentation': $s.indentation,
                                                'newline': $s.newline,
                                            }
                                        },
                                    },
                                    ($) => ['error writing file', $]
                                )

                            ]
                        )
                    ],
                    ($) => [
                        $c['log error paragraph'].execute(
                            {
                                'paragraph': sh.pg.sentences([sh.sentence([
                                    t_serialize_schemas_to_paragraph.Error(
                                        $,
                                        {
                                            'id': id,
                                        }
                                    ),
                                ])]),
                                'indentation': $s.indentation,
                                'newline': $s.newline,
                            },
                            ($) => ({
                                'exit code': 2,
                            })
                        )
                    ],
                    () => ({
                        'exit code': 2,
                    })
                )

            ],
            ($) => ({
                'exit code': 1
            })

        )
    ]
)