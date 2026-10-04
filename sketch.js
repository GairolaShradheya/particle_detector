const r = require("raylib");

const SCREEN_WIDTH = 1920;
const SCREEN_HEIGHT = 1000;

let scannerStart = 1;
const scannerWidth = 50;
let velocity = 7;

function setup() {
    r.InitWindow(SCREEN_WIDTH, SCREEN_HEIGHT, "Particle Detector");
    r.SetTargetFPS(60);
}

function update() {
    if (scannerStart <= 0 || scannerStart >= SCREEN_WIDTH-scannerWidth) {
        velocity *= -1;
    }
    scannerStart += velocity;
}

function areOverlapping(range1Start,range1Width,range2Start,range2Width){
    if (((range2Start-range1Start) >= range1Width) || ((range1Start-range2Start) > range2Width)){
        return false
    }
    return true;
}

function chooseColour(range1Start,range1Width,range2Start,range2Width){
    return areOverlapping(range1Start,range1Width,range2Start,range2Width) ? r.RED : r.WHITE;
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    
    const particleFieldStart = 700;
    const particleFieldWidth = 600;
    const scannerColour = chooseColour(scannerStart,scannerWidth,particleFieldStart,particleFieldWidth);

    r.DrawRectangle(particleFieldStart, 0, particleFieldWidth, SCREEN_HEIGHT, r.BLUE);
    r.DrawRectangle(scannerStart, 0, scannerWidth, SCREEN_HEIGHT, scannerColour);

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