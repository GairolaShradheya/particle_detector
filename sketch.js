const r = require("raylib");
const geometry = require("./geometry");

const SCREEN_WIDTH = 1700;
const SCREEN_HEIGHT = 1000;

let firstScannerStart = 0;
const firstScannerWidth = 30;
const firstScannerEnd = SCREEN_WIDTH / 2;
let firstScannerVelocity = 7;

let secondScannerStart = SCREEN_WIDTH / 2;
const secondScannerWidth = 20;
const secondScannerEnd = SCREEN_WIDTH;
let secondScannerVelocity = 5;

let thirdScannerStart = 0;
const thirdScannerHeight = 20;
const thirdScannerEnd = SCREEN_HEIGHT;
let thirdScannerVelocity = 8;

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
    thirdScannerVelocity = geometry.giveDirection(
        thirdScannerStart,
        thirdScannerHeight,
        0,
        thirdScannerEnd,
        thirdScannerVelocity,
    );

    firstScannerStart += firstScannerVelocity;
    secondScannerStart += secondScannerVelocity;
    thirdScannerStart += thirdScannerVelocity;
}

function chooseColour(decision) {
    return decision ? r.RED : r.WHITE;
}

function drawParticleField(fieldStartX, fieldStartY, fieldWidth, fieldHeight) {
    r.DrawRectangle(fieldStartX, fieldStartY, fieldWidth, fieldHeight, r.BLUE);
}

function drawScanner(
    scanStartX,
    scanStartY,
    scanWidth,
    scanHeight,
    scanColour,
) {
    r.DrawRectangle(scanStartX, scanStartY, scanWidth, scanHeight, scanColour);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    const firstParticleFieldStart = 300;
    const firstParticleFieldWidth = 200;
    const secondParticleFieldStart = 1100;
    const secondParticleFieldWidth = 70;
    const thirdParticleFieldStart = 600;
    const thirdParticleFieldHeight = 50;

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
    const thirdScannerColour = chooseColour(
        geometry.areOverlapping(
            thirdParticleFieldStart,
            thirdParticleFieldHeight,
            thirdScannerStart,
            thirdScannerHeight,
        ),
    );

    drawParticleField(
        firstParticleFieldStart,
        0,
        firstParticleFieldWidth,
        SCREEN_HEIGHT,
    );
    drawParticleField(
        secondParticleFieldStart,
        0,
        secondParticleFieldWidth,
        SCREEN_HEIGHT,
    );
    drawParticleField(
        0,
        thirdParticleFieldStart,
        SCREEN_WIDTH,
        thirdParticleFieldHeight,
    );

    drawScanner(
        firstScannerStart,
        0,
        firstScannerWidth,
        SCREEN_HEIGHT,
        firstScannerColour,
    );
    drawScanner(
        secondScannerStart,
        0,
        secondScannerWidth,
        SCREEN_HEIGHT,
        secondScannerColour,
    );
    drawScanner(
        0,
        thirdScannerStart,
        SCREEN_WIDTH,
        thirdScannerHeight,
        thirdScannerColour,
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
