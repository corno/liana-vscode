import type * as schema from './current_generated/structure/schemas/resolved.js'
import { Document_Specification as Unresolve } from './current_generated/implementations/schemas/resolved/downtransformers/unresolve.js'
import { Document_Specification as Marshal } from './current_generated/implementations/schemas/unresolved/downtransformers/marshal.js'
import { Value as Sealed_Target } from '../../shared/sealed_artifact/document_to_sealed_target.js'
import { Signature } from '../../shared/sealed_artifact/index.js'

export const document_specification_signature = (specification: schema.Document_Specification): string =>
    Signature(Sealed_Target(Marshal(Unresolve(specification))))
