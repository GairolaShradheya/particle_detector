const r = require("raylib");

function setup(){
    r.InitWindow();
}

function update(){}

function draw(){
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    r.EndDrawing();
}

function running(){
    return !r.WindowShouldClose()
}

function tearDown(){
    r.CloseWindow();
}

module.exports = {
    setup,
    update,
    draw,
    running,
    tearDown,
}