import * as vscode from 'vscode'

export function findContainingFoldingRange(
	foldingRanges: vscode.FoldingRange[],
	position: vscode.Position,
): vscode.FoldingRange | undefined {
	const sortedRanges = [...foldingRanges].sort((a, b) => {
		const aSize = a.end - a.start;
		const bSize = b.end - b.start;
		return aSize - bSize;
	})

	for (const range of sortedRanges) {
		if (position.line >= range.start && position.line <= range.end) {
			return range;
		}
	}

	for (const range of sortedRanges) {
		if (Math.abs(position.line - range.start) <= 2) {
			return range;
		}
	}

	return undefined;
}

export function findChildFoldingRanges(
	foldingRanges: vscode.FoldingRange[],
	parentRange: vscode.FoldingRange,
): vscode.FoldingRange[] {
	const candidateRanges = foldingRanges.filter((range) => {
		return range !== parentRange
			&& range.start > parentRange.start
			&& range.end < parentRange.end;
	})

	return candidateRanges.filter((candidate) => {
		return !candidateRanges.some((other) => {
			return other !== candidate
				&& other.start < candidate.start
				&& other.end > candidate.end;
		})
	})
}