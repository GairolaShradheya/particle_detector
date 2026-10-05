const r = require("raylib");
const geometry = require("./geometry");

const SCREEN_WIDTH = 1700;
const SCREEN_HEIGHT = 1000;

const firstScanner = {
    position: {
        startX: 0,
        startY: 0,
    },
    size: {
        width: 30,
        height: SCREEN_HEIGHT,
    },
    range: {
        start: 0,
        end: SCREEN_WIDTH / 2,
    },
    velocity: 7,
    horizontal: true,
}

const secondScanner = {
    position: {
        startX: SCREEN_WIDTH / 2,
        startY: 0,
    },
    size: {
        width: 20,
        height: SCREEN_HEIGHT,
    },
    range: {
        start: SCREEN_WIDTH / 2,
        end: SCREEN_WIDTH,
    },
    velocity: 5,
    horizontal: true,
}

const thirdScanner = {
    position: {
        startX: 0,
        startY: 0,
    },
    size: {
        width: SCREEN_WIDTH,
        height: 20,
    },
    range: {
        start: 0,
        end: SCREEN_HEIGHT,
    },
    velocity: 8,
    horizontal: false,
}


function setup() {
    r.SetTraceLogLevel(r.LOG_ERROR);
    r.InitWindow(SCREEN_WIDTH, SCREEN_HEIGHT, "Particle Detector");
    r.SetTargetFPS(60);
}

function update() {
    firstScanner.velocity = geometry.giveDirection(firstScanner);
    secondScanner.velocity = geometry.giveDirection(secondScanner);
    thirdScanner.velocity = geometry.giveDirection(thirdScanner);

    firstScanner.position.startX += firstScanner.velocity;
    secondScanner.position.startX += secondScanner.velocity;
    thirdScanner.position.startY += thirdScanner.velocity;
}

function chooseColour(decision) {
    return decision ? r.RED : r.WHITE;
}

function drawParticleField(field) {
    r.DrawRectangle(field.startX, field.startY, field.width, field.height, r.BLUE);
}

function drawScanner(scanner) {
    r.DrawRectangle(scanner.position.startX, scanner.position.startY, scanner.size.width, scanner.size.height, scanner.colour);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    const firstParticleField = {
        startX: 300,
        startY: 0,
        width: 200,
        height: SCREEN_HEIGHT,
    }
    const secondParticleField = {
        startX: 1100,
        startY: 0,
        width: 70,
        height: SCREEN_HEIGHT,
    }
    const thirdParticleField = {
        startX: 0,
        startY: 600,
        width: SCREEN_WIDTH,
        height: 50,
    }

    firstScanner.colour = chooseColour(
        geometry.isAnyOneOverlapping(
            firstParticleField.startX,
            firstParticleField.width,
            secondParticleField.startX,
            secondParticleField.width,
            firstScanner.position.startX,
            firstScanner.size.width,
        ),
    );
    secondScanner.colour = chooseColour(
        geometry.isAnyOneOverlapping(
            firstParticleField.startX,
            firstParticleField.width,
            secondParticleField.startX,
            secondParticleField.width,
            secondScanner.position.startX,
            secondScanner.size.width,
        ),
    );
    thirdScanner.colour = chooseColour(
        geometry.areOverlapping(
            thirdParticleField.startY,
            thirdParticleField.height,
            thirdScanner.position.startY,
            thirdScanner.size.height,
        ),
    );

    drawParticleField(firstParticleField);
    drawParticleField(secondParticleField);
    drawParticleField(thirdParticleField);

    drawScanner(firstScanner);
    drawScanner(secondScanner);
    drawScanner(thirdScanner);

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
