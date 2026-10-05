function isOutOfBound(scanStart, scanWidth, rangeStart, rangeEnd) {
    return scanStart < rangeStart || scanStart >= rangeEnd - scanWidth;
}

function giveDirection(
    scanStart,
    scanWidth,
    rangeStart,
    rangeEnd,
    scanVelocity,
) {
    return isOutOfBound(scanStart, scanWidth, rangeStart, rangeEnd)
        ? -scanVelocity
        : scanVelocity;
}

function areOverlapping(rangeStart, rangeWidth, scanStart, scanWidth) {
    if (
        rangeStart - scanStart >= scanWidth ||
        scanStart - rangeStart > rangeWidth
    ) {
        return false;
    }
    return true;
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
