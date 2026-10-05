function isOutOfBound(scanner) {
    const scanStart = scanner.horizontal ? scanner.position.startX : scanner.position.startY;
    const scanThick = scanner.horizontal ? scanner.size.width : scanner.size.height;
    return scanStart < scanner.range.start || scanStart >= scanner.range.end - scanThick;
}

function giveDirection(scanner) {
    return isOutOfBound(scanner)
        ? -scanner.velocity
        : scanner.velocity;
}

function areOverlapping(rangeStart, rangeWidth, scanStart, scanWidth) {
    return !(
        rangeStart - scanStart >= scanWidth ||
        scanStart - rangeStart > rangeWidth
    )
}

function isAnyOneOverlapping(
    range1Start,
    range1Width,
    range2Start,
    range2Width,
    scanStart,
    scanWidth,
) {
    return (
        areOverlapping(range1Start, range1Width, scanStart, scanWidth) ||
        areOverlapping(range2Start, range2Width, scanStart, scanWidth)
    );
}

module.exports = {
    isAnyOneOverlapping,
    areOverlapping,
    isOutOfBound,
    giveDirection,
};
