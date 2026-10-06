const r = require("raylib");
const geometry = require("./geometry");

function getParticle(start, thickness, horizontal) {
    return {
        start: start,
        thickness: thickness,
        horizontal: horizontal,
    };
}

function drawParticleField(field) {
    r.DrawRectangle(
        field.horizontal ? field.start : 0,
        field.horizontal ? 0 : field.start,
        field.horizontal ? field.thickness : geometry.SCREEN_WIDTH,
        field.horizontal ? geometry.SCREEN_HEIGHT : field.thickness,
        r.BLUE,
    );
}

module.exports = {
    getParticle,
    drawParticleField,
};
