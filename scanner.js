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

function drawScanner(scanner) {
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
};
