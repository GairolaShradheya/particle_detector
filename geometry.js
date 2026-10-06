const SCREEN_WIDTH = 1700;
const SCREEN_HEIGHT = 1000;

function isOutOfBound(scanner) {
    return (
        scanner.start < scanner.rangeStart ||
        scanner.start >= scanner.rangeEnd - scanner.thickness
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
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
};
