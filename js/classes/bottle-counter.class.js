/**
 * Class representing a bottle counter.
 * @extends DrawableObject
 */
class BottleCounter extends DrawableObject {
    bottleIcon = 'assets/images/bottle/bottleIcon.png';
    textX = 75;
    textY = 96;

    /**
     * Create a bottle counter.
     */
    constructor() {
        super().loadImage(this.bottleIcon);
        this.loadImages(this.bottleIcon);
        this.width = 400 / 7;
        this.height = 400 / 7;
        this.x = 30;
        this.y = 54;
        this.img = this.imageCache[this.bottleIcon];
    }

    /**
     * Load images for the bottle counter.
     * @param {string} path - The path to the image.
     */
    loadImages(path) {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
    }

    /**
     * Draw the bottle counter on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.font = '40px boogaloo';
        const gradient = this.createGradient(ctx);
        ctx.fillStyle = gradient;
        ctx.strokeStyle = 'black';
        this.drawText(ctx);
    }

    /**
     * Create a gradient for the bottle counter text.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @returns {CanvasGradient} The created gradient.
     */
    createGradient(ctx) {
        const gradient = ctx.createLinearGradient(76, 70, 108, 95);
        gradient.addColorStop(0.15, 'yellow');
        gradient.addColorStop(0.75, 'orange');
        gradient.addColorStop(1.0, 'yellow');
        return gradient;
    }

    /**
     * Draw the text for the bottle counter.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawText(ctx) {
        ctx.fillText(DrawableObject.bottleCount, this.textX, this.textY);
        ctx.strokeText(DrawableObject.bottleCount, this.textX, this.textY);
    }
}
