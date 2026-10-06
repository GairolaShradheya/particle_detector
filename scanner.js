const r = require("raylib");

function createScanner(
    startX,
    startY,
    width,
    height,
    rangeStart,
    rangeEnd,
    velocity,
    horizontal,
) {
    return {
        position: {
            startX: startX,
            startY: startY,
        },
        size: {
            width: width,
            height: height,
        },
        range: {
            start: rangeStart,
            end: rangeEnd,
        },
        velocity: velocity,
        horizontal: horizontal,
    };
}

function createHScanner(start, thickness, rangeStart, rangeEnd, velocity) {
    return {
        start: start,
        thickness: thickness,
        rangeStart: rangeStart,
        rangeEnd: rangeEnd,
        velocity: velocity,
        horizontal: true,
    };
}

function drawScanner(scanner) {
    r.DrawRectangle(
        scanner.position.startX,
        scanner.position.startY,
        scanner.size.width,
        scanner.size.height,
        scanner.colour,
    );
}
function drawHScanner(scanner) {
    r.DrawRectangle(
        scanner.position.startX,
        scanner.position.startY,
        scanner.size.width,
        scanner.size.height,
        scanner.colour,
    );
}

module.exports = {
    createScanner,
    drawScanner,
    createHScanner,
    drawHScanner,
};
