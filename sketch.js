const r = require("raylib");
const geometry = require("./geometry");

const SCREEN_WIDTH = 1700;
const SCREEN_HEIGHT = 1000;

let firstScannerStart = 0;
const firstScannerWidth = 50;
const firstScannerEnd = SCREEN_WIDTH / 2;
let firstScannerVelocity = 7;

let secondScannerStart = SCREEN_WIDTH / 2;
const secondScannerWidth = 50;
const secondScannerEnd = SCREEN_WIDTH;
let secondScannerVelocity = 4;

function setup() {
    r.SetTraceLogLevel(r.LOG_ERROR);
    r.InitWindow(SCREEN_WIDTH, SCREEN_HEIGHT, "Particle Detector");
    r.SetTargetFPS(60);
}

function update() {
    firstScannerVelocity = geometry.giveDirection(
        firstScannerStart,
        firstScannerWidth,
        0,
        firstScannerEnd,
        firstScannerVelocity,
    );
    secondScannerVelocity = geometry.giveDirection(
        secondScannerStart,
        secondScannerWidth,
        SCREEN_WIDTH / 2,
        secondScannerEnd,
        secondScannerVelocity,
    );

    firstScannerStart += firstScannerVelocity;
    secondScannerStart += secondScannerVelocity;
}

function chooseColour(decision) {
    return decision ? r.RED : r.WHITE;
}

function drawParticleField(fieldStart, fieldWidth) {
    r.DrawRectangle(fieldStart, 0, fieldWidth, SCREEN_HEIGHT, r.BLUE);
}

function drawScanner(scanStart, scanWidth, scanColour) {
    r.DrawRectangle(scanStart, 0, scanWidth, SCREEN_HEIGHT, scanColour);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    const firstParticleFieldStart = 300;
    const firstParticleFieldWidth = 300;
    const secondParticleFieldStart = 1000;
    const secondParticleFieldWidth = 80;

    const firstScannerColour = chooseColour(
        geometry.isAnyOneOverlapping(
            firstParticleFieldStart,
            firstParticleFieldWidth,
            secondParticleFieldStart,
            secondParticleFieldWidth,
            firstScannerStart,
            firstScannerWidth,
        ),
    );
    const secondScannerColour = chooseColour(
        geometry.isAnyOneOverlapping(
            firstParticleFieldStart,
            firstParticleFieldWidth,
            secondParticleFieldStart,
            secondParticleFieldWidth,
            secondScannerStart,
            secondScannerWidth,
        ),
    );

    drawParticleField(firstParticleFieldStart, firstParticleFieldWidth);
    drawParticleField(secondParticleFieldStart, secondParticleFieldWidth);

    drawScanner(firstScannerStart, firstScannerWidth, firstScannerColour);
    drawScanner(
        secondScannerStart,
        secondParticleFieldWidth,
        secondScannerColour,
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
