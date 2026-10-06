const r = require("raylib");
const geometry = require("./geometry");
const scanner = require("./scanner");
const particle = require("./particle");

const SCREEN_WIDTH = 1700;
const SCREEN_HEIGHT = 1000;

// const firstScanner = scanner.createScanner(
//     0,
//     0,
//     30,
//     SCREEN_HEIGHT,
//     0,
//     SCREEN_WIDTH / 2,
//     7,
//     true,
// );

const firstScanner = scanner.createScanner(0, 30, 0, SCREEN_WIDTH / 2, 7, true);

// const secondScanner = scanner.createScanner(
//     SCREEN_WIDTH / 2,
//     0,
//     20,
//     SCREEN_HEIGHT,
//     SCREEN_WIDTH / 2,
//     SCREEN_WIDTH,
//     5,
//     true,
// );
const secondScanner = scanner.createScanner(
    SCREEN_WIDTH / 2,
    20,
    SCREEN_WIDTH / 2,
    SCREEN_WIDTH,
    5,
    true,
);

// const thirdScanner = scanner.createScanner(
//     0,
//     0,
//     SCREEN_WIDTH,
//     20,
//     0,
//     SCREEN_HEIGHT,
//     8,
//     false,
// );
const thirdScanner = scanner.createScanner(0, 20, 0, SCREEN_HEIGHT, 8, false);

function setup() {
    r.SetTraceLogLevel(r.LOG_ERROR);
    r.InitWindow(SCREEN_WIDTH, SCREEN_HEIGHT, "Particle Detector");
    r.SetTargetFPS(60);
}

function update() {
    firstScanner.velocity = geometry.updateVelocity(firstScanner);
    secondScanner.velocity = geometry.updateVelocity(secondScanner);
    thirdScanner.velocity = geometry.updateVelocity(thirdScanner);

    firstScanner.start += firstScanner.velocity;
    secondScanner.start += secondScanner.velocity;
    thirdScanner.start += thirdScanner.velocity;
}

function chooseColour(decision) {
    return decision ? r.RED : r.WHITE;
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    const firstParticleField = particle.getParticle(
        300,
        0,
        200,
        SCREEN_HEIGHT,
        true,
    );
    const secondParticleField = particle.getParticle(
        1100,
        0,
        70,
        SCREEN_HEIGHT,
        true,
    );

    const thirdParticleField = particle.getParticle(
        0,
        600,
        SCREEN_WIDTH,
        50,
        false,
    );

    firstScanner.colour = chooseColour(
        geometry.isAnyOneOverlapping(
            firstParticleField,
            secondParticleField,
            firstScanner,
        ),
    );
    secondScanner.colour = chooseColour(
        geometry.isAnyOneOverlapping(
            firstParticleField,
            secondParticleField,
            secondScanner,
        ),
    );
    thirdScanner.colour = chooseColour(
        geometry.areOverlapping(thirdParticleField, thirdScanner),
    );

    particle.drawParticleField(firstParticleField);
    particle.drawParticleField(secondParticleField);
    particle.drawParticleField(thirdParticleField);

    scanner.drawScanner(firstScanner);
    scanner.drawScanner(secondScanner);
    scanner.drawScanner(thirdScanner);

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
