import * as p_ from "pareto-core/implementation/transformer"

import * as d_astn_location from "astn-core/modules/deserialization/schemas/location"

import * as vscode_node from 'vscode-languageserver/node'

export const create_range_from_range = (
	$: d_astn_location.Range
): vscode_node.Range => {
	return vscode_node.Range.create(
		$.start.relative.line,
		$.start.relative.column,
		$.end.relative.line,
		$.end.relative.column
	)
}

export const create_position_from_location = (
	$: d_astn_location.Location
): vscode_node.Position => {
	return vscode_node.Position.create(
		$.relative.line,
		$.relative.column
	)
}
export const create_range_from_possible_range = (
	$: d_astn_location.Possible_Range,
): vscode_node.Range => {
	return p_.from.state($).decide(($) => {
		switch ($[0]) {
			case 'range': return p_.ss($, ($) => create_range_from_range($))
			case 'end of document': return p_.ss($, ($) => {

				return vscode_node.Range.create(
					vscode_node.Position.create($.end.relative.line, $.end.relative.column),
					vscode_node.Position.create($.end.relative.line, $.end.relative.column),
				)
			})
			default: return p_.au($[0])
		}
	})
}
