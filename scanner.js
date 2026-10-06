const r = require("raylib");
const SCREEN_WIDTH = 1700;
const SCREEN_HEIGHT = 1000;
// function createScanner(
//     startX,
//     startY,
//     width,
//     height,
//     rangeStart,
//     rangeEnd,
//     velocity,
//     horizontal,
// ) {
//     return {
//         position: {
//             startX: startX,
//             startY: startY,
//         },
//         size: {
//             width: width,
//             height: height,
//         },
//         range: {
//             start: rangeStart,
//             end: rangeEnd,
//         },
//         velocity: velocity,
//         horizontal: horizontal,
//     };
// }

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

function drawScanner(scanner) {
    r.DrawRectangle(
        scanner.horizontal ? scanner.start : 0,
        scanner.horizontal ? 0 : scanner.start,
        scanner.horizontal ? scanner.thickness : SCREEN_WIDTH,
        scanner.horizontal ? SCREEN_HEIGHT : scanner.thickness,
        scanner.colour,
    );
}

module.exports = {
    createScanner,
    drawScanner,
};
