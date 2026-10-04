const r = require("raylib");

const SCREEN_WIDTH = 1920;
const SCREEN_HEIGHT = 1000;

let rectPosX = 1;
let velocity = 10;

function setup() {
    r.InitWindow(SCREEN_WIDTH, SCREEN_HEIGHT, "Particle Detector");
    r.SetTargetFPS(60);
}

function update() {
    if (rectPosX <= 0 || rectPosX >= SCREEN_WIDTH) {
        velocity *= -1;
    }
    rectPosX += velocity;
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    r.DrawRectangle(rectPosX, 0, 30, SCREEN_HEIGHT, r.WHITE);

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