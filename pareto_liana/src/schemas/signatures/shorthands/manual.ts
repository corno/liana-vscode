import * as sh from '../../../temp/shorthands.js'

import type * as s_target from "../schema.js"


export const signatures = (
    signatures: sh.Raw_Or_Normal_Dictionary<s_target.namespaces.signatures.types.Signatures.D>,
): s_target.namespaces.signatures.types.Signatures => {
    return sh.dictionary(signatures)
}

export const sig_params = (
    types: sh.Raw_Or_Normal_Dictionary<s_target.namespaces.signatures.types.Signature_Parameters.types.D>,
    lookups: sh.Raw_Or_Normal_Dictionary<s_target.namespaces.signatures.types.Signature_Parameters.lookups.D>,
): s_target.namespaces.signatures.types.Signature_Parameters => {
    return {
        'types': sh.dictionary(types),
        'lookups': sh.dictionary(lookups),
    }
}

/**
 * signature
 */
export namespace sig {

    export const local = (
        types: sh.Raw_Or_Normal_Dictionary<s_target.namespaces.signatures.types.Signature_Parameters.types.D>,
        lookups: sh.Raw_Or_Normal_Dictionary<s_target.namespaces.signatures.types.Signature_Parameters.lookups.D>,
    ): s_target.namespaces.signatures.types.Signatures.D => {
        return {
            'parameters': sh.state(['local', {
                'types': sh.dictionary(types),
                'lookups': sh.dictionary(lookups),
            }]),
        }
    }

    export const same_as = (
        name: string
    ): s_target.namespaces.signatures.types.Signatures.D => {
        return {
            'parameters': sh.state(['same as', sh.reference(name)]),
        }
    }
}

export namespace parameter {


    export const type = (
        name: string,
        presence?: 'optional' | 'required',
    ): s_target.namespaces.signatures.types.Signature_Parameters.types.D => {
        return {
            'type': {
                'location': sh.state(['internal', sh.reference(name)]),
            },
            'presence': presence === 'optional'
                ? sh.state(['optional', null])
                : sh.state(['required', null]),
        }
    }

    export const lookup = (
        name: string,
        type?: 'acyclic' | 'cyclic',
        presence?: 'optional' | 'required',
    ): s_target.namespaces.signatures.types.Signature_Parameters.lookups.D => {
        return {
            'referent': {
                'location': sh.state(['internal', sh.reference(name)]),
            },
            'type': type === 'cyclic'
                ? sh.state(['cyclic', null])
                : sh.state(['acyclic', null]),
            'presence': presence === 'optional'
                ? sh.state(['optional', null])
                : sh.state(['required', null]),
        }
    }


}