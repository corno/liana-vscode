// The backend uses noLib; keep the host WeakMap API local to this adapter.
declare const WeakMap: {
    new <K extends object, V>(): {
        get(key: K): V | undefined
        set(key: K, value: V): void
    }
}

export const weak_metadata = <K extends object, V>() => new WeakMap<K, V>()
