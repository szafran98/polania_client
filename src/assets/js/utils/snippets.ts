/*
ŹRÓDŁO ŚWIATŁA

let radius = 50;

        CTX.save();
        CTX.globalCompositeOperation = 'lighter';
        var rnd = 0.05 * Math.sin((1.1 * Date.now()) / 1000);
        radius = radius * (1 + rnd);
        var radialGradient = CTX.createRadialGradient(
            this.x + game.draw.margin.horizontal + 16,
            this.y + game.draw.margin.vertical + 24,
            0,
            this.x + game.draw.margin.horizontal + 16,
            this.y + game.draw.margin.vertical + 24,
            radius
        );
        radialGradient.addColorStop(0.0, '#BB9');
        radialGradient.addColorStop(0.2 + rnd, '#AA8');
        radialGradient.addColorStop(0.7 + rnd, '#330');
        radialGradient.addColorStop(0.9, '#110');
        radialGradient.addColorStop(1, '#000');
        CTX.fillStyle = radialGradient;
        CTX.beginPath();
        CTX.arc(
            this.x + game.draw.margin.horizontal + 16,
            this.y + game.draw.margin.vertical + 24,
            radius,
            0,
            2 * 3.14
        );
        CTX.fill();
        CTX.restore();
 */

/*
CIEMNOŚĆ, NOC

CTX.fillStyle = 'rgba(0,0,0,0.7)';
CTX.fillRect(0, 0, 544, 544);
 */
