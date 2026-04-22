"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findContainingFoldingRange = findContainingFoldingRange;
exports.findChildFoldingRanges = findChildFoldingRanges;
function findContainingFoldingRange(foldingRanges, position) {
    const sortedRanges = [...foldingRanges].sort((a, b) => {
        const aSize = a.end - a.start;
        const bSize = b.end - b.start;
        return aSize - bSize;
    });
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
function findChildFoldingRanges(foldingRanges, parentRange) {
    const candidateRanges = foldingRanges.filter((range) => {
        return range !== parentRange
            && range.start > parentRange.start
            && range.end < parentRange.end;
    });
    return candidateRanges.filter((candidate) => {
        return !candidateRanges.some((other) => {
            return other !== candidate
                && other.start < candidate.start
                && other.end > candidate.end;
        });
    });
}
//# sourceMappingURL=folding.js.map