const r = require("raylib");

const SCREEN_WIDTH = 1700;
const SCREEN_HEIGHT = 1000;

let scannerStart = 1;
const scannerWidth = 50;
let velocity = 7;

function setup() {
    r.SetTraceLogLevel(r.LOG_ERROR);
    r.InitWindow(SCREEN_WIDTH, SCREEN_HEIGHT, "Particle Detector");
    r.SetTargetFPS(60);
}
function isOutOfBound() {
    return scannerStart <= 0 || scannerStart >= SCREEN_WIDTH - scannerWidth;
}

function update() {
    if (isOutOfBound()) {
        velocity *= -1;
    }
    scannerStart += velocity;
}

function areOverlapping(rangeStart, rangeWidth) {
    if (
        rangeStart - scannerStart >= scannerWidth ||
        scannerStart - rangeStart > rangeWidth
    ) {
        return false;
    }
    return true;
}

function chooseColour(decision) {
    return decision ? r.RED : r.WHITE;
}

function isAnyOneOverlapping(
    range1Start,
    range1Width,
    range2Start,
    range2Width,
) {
    return (
        areOverlapping(range1Start, range1Width) ||
        areOverlapping(range2Start, range2Width)
    );
}

function drawParticleField(fieldStart, fieldWidth) {
    r.DrawRectangle(fieldStart, 0, fieldWidth, SCREEN_HEIGHT, r.BLUE);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    const firstParticleFieldStart = 300;
    const firstParticleFieldWidth = 300;
    const secondParticleFieldStart = 1000;
    const secondParticleFieldWidth = 80;

    const scannerColour = chooseColour(
        isAnyOneOverlapping(
            firstParticleFieldStart,
            firstParticleFieldWidth,
            secondParticleFieldStart,
            secondParticleFieldWidth,
        ),
    );

    drawParticleField(firstParticleFieldStart, firstParticleFieldWidth);
    drawParticleField(secondParticleFieldStart, secondParticleFieldWidth);

    r.DrawRectangle(
        scannerStart,
        0,
        scannerWidth,
        SCREEN_HEIGHT,
        scannerColour,
    );

    r.EndDrawing();
}

function running() {
    return !r.WindowShouldClose();
}

function tearDown() {
    r.CloseWindow();
}

module.exports = {
    setup,
    update,
    draw,
    running,
    tearDown,
};
