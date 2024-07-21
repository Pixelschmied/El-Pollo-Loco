/**
 * Class representing a bottle.
 * @extends DrawableObject
 */
class Bottle extends DrawableObject {
    y = 425;
    bottleIcons = [
        'assets/images/bottle/bottleOnGround1.png',
        'assets/images/bottle/bottleOnGround2.png'
    ];

    /**
     * Create a bottle.
     */
    constructor() {
        super().loadImage(this.bottleIcons[Math.round(Math.random())]);
        this.loadImages(this.bottleIcons);
        this.x = this.getBottleX();
        this.width = 57;
        this.height = 57;
    }

    /**
     * Get the x-coordinate for the bottle.
     * @returns {number} The x-coordinate.
     */
    getBottleX() {
        DrawableObject.lastBottleLocation += 100 + (Math.round(Math.random() * 300));
        return DrawableObject.lastBottleLocation;
    }
}
