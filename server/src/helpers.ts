import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'
import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'

import * as d_astn_location from "astn-core/dist/interface/generated/liana/schemas/location/data"

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
	return _p.decide.state($, ($) => {
		switch ($[0]) {
			case 'range': return _p.ss($, ($) => create_range_from_range($))
			case 'end of document': return _p.ss($, ($) => {

				return vscode_node.Range.create(
					vscode_node.Position.create($.end.relative.line, $.end.relative.column),
					vscode_node.Position.create($.end.relative.line, $.end.relative.column),
				)
			})
			default: return _p.au($[0])
		}
	})
}
