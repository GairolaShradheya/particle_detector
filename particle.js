const r = require("raylib");

function getParticle(startX, startY, width, height, horizontal) {
    return {
        startX: startX,
        startY: startY,
        width: width,
        height: height,
        horizontal: horizontal,
    };
}

function drawParticleField(field) {
    r.DrawRectangle(
        field.startX,
        field.startY,
        field.width,
        field.height,
        r.BLUE,
    );
}

module.exports = {
    getParticle,
    drawParticleField,
};
