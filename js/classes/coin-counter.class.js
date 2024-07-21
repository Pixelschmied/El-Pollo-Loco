/**
 * Class representing a coin counter.
 * @extends DrawableObject
 */
class CoinCounter extends DrawableObject {
    coinIcon = 'assets/images/hud/coinIcon.png';
    textX = 178;
    textY = 96;

    /**
     * Create a coin counter.
     */
    constructor() {
        super();
        this.loadImages(this.coinIcon);
        this.width = 300 / 2.2;
        this.height = 301 / 2.2;
        this.x = 80;
        this.y = 15;
        this.img = this.imageCache[this.coinIcon];
    }

    /**
     * Load the coin icon image.
     * @param {string} path - The path to the image.
     */
    loadImages(path) {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
    }

    /**
     * Draw the coin counter on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        this.drawCoinIcon(ctx);
        this.drawText(ctx);
    }

    /**
     * Draw the coin icon.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawCoinIcon(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draw the text showing the coin count.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawText(ctx) {
        ctx.font = '40px boogaloo';
        const gradient = this.createGradient(ctx);
        ctx.fillStyle = gradient;
        ctx.strokeStyle = 'black';
        ctx.fillText(DrawableObject.coinCount, this.textX, this.textY);
        ctx.strokeText(DrawableObject.coinCount, this.textX, this.textY);
    }

    /**
     * Create a gradient for the coin count text.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @returns {CanvasGradient} The created gradient.
     */
    createGradient(ctx) {
        const gradient = ctx.createLinearGradient(185, 70, 218, 95);
        gradient.addColorStop(0.15, 'yellow');
        gradient.addColorStop(0.75, 'orange');
        gradient.addColorStop(1.0, 'yellow');
        return gradient;
    }
}
