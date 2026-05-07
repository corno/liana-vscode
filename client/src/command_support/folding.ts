import * as vscode from 'vscode'

export function findContainingFoldingRange(
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

export function findChildFoldingRanges(
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