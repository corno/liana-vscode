import type { Selection, Value } from './schema.js'
import { weak_metadata } from 'pareto-liana/weak_metadata'
import type * as core from 'pareto-core/schema'

export type Blocker = { value?: Value, definition?: core.Value & object }
const blockers = weak_metadata<Selection, Blocker>()

export const blocker = (selection: Selection): Blocker | undefined => blockers.get(selection)
export const with_blocker = (selection: Selection, detail: Blocker): Selection => {
    if (selection[0] === 'constraint failed' || selection[0] === 'not set') {
        blockers.set(selection, { ...blockers.get(selection), ...detail })
    }
    return selection
}
