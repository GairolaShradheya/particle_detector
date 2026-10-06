function isOutOfBound(scanner) {
    const scanStart = scanner.horizontal
        ? scanner.position.startX
        : scanner.position.startY;
    const scanThick = scanner.horizontal
        ? scanner.size.width
        : scanner.size.height;
    return (
        scanStart < scanner.range.start ||
        scanStart >= scanner.range.end - scanThick
    );
}

function updateVelocity(scanner) {
    return isOutOfBound(scanner) ? -scanner.velocity : scanner.velocity;
}

function areOverlapping(field, scanner) {
    const fieldStart = field.horizontal ? field.startX : field.startY;
    const fieldWidth = field.horizontal ? field.width : field.height;
    return !(
        fieldStart - scanner.start >= scanner.thickness ||
        scanner.start - fieldStart > fieldWidth
    );
}

function isAnyOneOverlapping(field1, field2, scanner) {
    return areOverlapping(field1, scanner) || areOverlapping(field2, scanner);
}

module.exports = {
    isAnyOneOverlapping,
    areOverlapping,
    isOutOfBound,
    updateVelocity,
};
