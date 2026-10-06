const r = require("raylib");
const geometry = require("./geometry");
const scanner = require("./scanner");
const particle = require("./particle");

const firstScanner = scanner.createScanner(
    0,
    30,
    0,
    geometry.SCREEN_WIDTH / 2,
    7,
    true,
);

const secondScanner = scanner.createScanner(
    geometry.SCREEN_WIDTH / 2,
    20,
    geometry.SCREEN_WIDTH / 2,
    geometry.SCREEN_WIDTH,
    5,
    true,
);

const thirdScanner = scanner.createScanner(
    0,
    20,
    0,
    geometry.SCREEN_HEIGHT,
    8,
    false,
);

function setup() {
    r.SetTraceLogLevel(r.LOG_ERROR);
    r.InitWindow(
        geometry.SCREEN_WIDTH,
        geometry.SCREEN_HEIGHT,
        "Particle Detector",
    );
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

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    const firstParticleField = particle.getParticle(300, 200, true);
    const secondParticleField = particle.getParticle(1100, 70, true);

    const thirdParticleField = particle.getParticle(600, 50, false);

    firstScanner.isOverlapping = geometry.isAnyOneOverlapping(
        firstParticleField,
        secondParticleField,
        firstScanner,
    );
    secondScanner.isOverlapping = geometry.isAnyOneOverlapping(
        firstParticleField,
        secondParticleField,
        secondScanner,
    );
    thirdScanner.isOverlapping = geometry.areOverlapping(
        thirdParticleField,
        thirdScanner,
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
