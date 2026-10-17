import * as vscode from 'vscode'

import * as types from "../types"

export default ((deps) => async () => {


	function find_containing_folding_range(
		folding_ranges: vscode.FoldingRange[],
		position: vscode.Position,
	): vscode.FoldingRange | undefined {
		const sorted_ranges = [...folding_ranges].sort((a, b) => {
			const aSize = a.end - a.start
			const bSize = b.end - b.start
			return aSize - bSize
		})

		for (const range of sorted_ranges) {
			if (position.line >= range.start && position.line <= range.end) {
				return range
			}
		}

		for (const range of sorted_ranges) {
			if (Math.abs(position.line - range.start) <= 2) {
				return range
			}
		}

		return undefined
	}
	
	function find_child_folding_ranges(
		folding_ranges: vscode.FoldingRange[],
		parent_range: vscode.FoldingRange,
	): vscode.FoldingRange[] {
		const candidate_ranges = folding_ranges.filter((range) => {
			return range !== parent_range
				&& range.start > parent_range.start
				&& range.end < parent_range.end
		})

		return candidate_ranges.filter((candidate) => {
			return !candidate_ranges.some((other) => {
				return other !== candidate
					&& other.start < candidate.start
					&& other.end > candidate.end
			})
		})
	}

	const editor = vscode.window.activeTextEditor
	if (!editor) {
		vscode.window.showInformationMessage('No active editor')
		return
	}

	const document = editor.document
	const cursorPosition = editor.selection.active

	try {
		const foldingRanges = await vscode.commands.executeCommand<vscode.FoldingRange[]>(
			'vscode.executeFoldingRangeProvider',
			document.uri,
		)

		if (!foldingRanges || foldingRanges.length === 0) {
			vscode.window.showInformationMessage('No foldable regions found')
			return
		}

		const containingRange = find_containing_folding_range(foldingRanges, cursorPosition)
		if (!containingRange) {
			vscode.window.showInformationMessage('No foldable structure found at cursor position')
			return
		}

		const childRanges = find_child_folding_ranges(foldingRanges, containingRange)
		if (childRanges.length === 0) {
			vscode.window.showInformationMessage('No entries found to collapse')
			return
		}

		for (const range of childRanges) {
			const startPosition = new vscode.Position(range.start, 0)
			editor.selection = new vscode.Selection(startPosition, startPosition)
			await vscode.commands.executeCommand('editor.fold')
		}

		vscode.window.showInformationMessage(`Collapsed ${childRanges.length} entries`)
	} catch (error) {
		console.error('Error collapsing entries:', error)
		vscode.window.showErrorMessage('Failed to collapse entries')
	}
}) satisfies types.Register_Command