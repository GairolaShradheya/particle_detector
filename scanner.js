const r = require("raylib");
const SCREEN_WIDTH = 1700;
const SCREEN_HEIGHT = 1000;

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
        scanner.horizontal ? scanner.thickness : SCREEN_WIDTH,
        scanner.horizontal ? SCREEN_HEIGHT : scanner.thickness,
        chooseColour(scanner.isOverlapping),
    );
}

module.exports = {
    createScanner,
    drawScanner,
};
