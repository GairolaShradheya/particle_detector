const r = require("raylib");

const SCREEN_WIDTH = 1920;
const SCREEN_HEIGHT = 1000;

let scannerPosX = 1;
let velocity = 7;

function setup() {
    r.InitWindow(SCREEN_WIDTH, SCREEN_HEIGHT, "Particle Detector");
    r.SetTargetFPS(60);
}

function update() {
    if (scannerPosX <= 0 || scannerPosX >= SCREEN_WIDTH) {
        velocity *= -1;
    }
    scannerPosX += velocity;
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    
    const particleFieldStart = 600;
    const particleFieldWidth = 100;

    r.DrawRectangle(particleFieldStart, 0, particleFieldWidth, SCREEN_HEIGHT, r.BLUE);
    r.DrawRectangle(scannerPosX, 0, 30, SCREEN_HEIGHT, r.WHITE);

    r.EndDrawing();
}

function running() {
    return !r.WindowShouldClose()
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
}