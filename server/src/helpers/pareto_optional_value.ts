import * as p_di from "pareto-core/interface/data"

export const optional_value_to_possibly_undefined = <T extends p_di.Value, RT>(
	$: p_di.Optional_Value<T>,
	callback: ($: T) => RT
): RT | undefined => {
	const raw = $.__get_raw()
	return raw === null
		? undefined
		: callback(raw[0])
}

export const optional_value_to_possibly_null = <T extends p_di.Value, RT>(
	$: p_di.Optional_Value<T>,
	callback: ($: T) => RT
): RT | null => {
	const raw = $.__get_raw()
	return raw === null
		? null
		: callback(raw[0])
}

export const optional_value_convert = <T extends p_di.Value, RT>(
	$: p_di.Optional_Value<T>,
	if_set: ($: T) => RT,
	if_not_set: () => RT
): RT => {
	const raw = $.__get_raw()
	return raw === null
		? if_not_set()
		: if_set(raw[0])
}


