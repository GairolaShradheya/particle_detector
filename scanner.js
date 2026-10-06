const r = require("raylib");
const geometry = require("./geometry");

function createScanner(
    start,
    thickness,
    rangeStart,
    rangeEnd,
    velocity,
    horizontal,
) {
    return {
        start: start,
        thickness: thickness,
        rangeStart: rangeStart,
        rangeEnd: rangeEnd,
        velocity: velocity,
        horizontal: horizontal,
    };
}

function chooseColour(decision) {
    return decision ? r.RED : r.WHITE;
}

function drawScanner(scanner) {
    r.DrawRectangle(
        scanner.horizontal ? scanner.start : 0,
        scanner.horizontal ? 0 : scanner.start,
        scanner.horizontal ? scanner.thickness : geometry.SCREEN_WIDTH,
        scanner.horizontal ? geometry.SCREEN_HEIGHT : scanner.thickness,
        chooseColour(scanner.isOverlapping),
    );
}

module.exports = {
    createScanner,
    drawScanner,
};
