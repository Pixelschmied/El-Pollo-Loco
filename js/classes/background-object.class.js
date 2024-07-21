/**
 * Class representing a background object.
 * @extends MoveableObject
 */
class BackgroundObject extends MoveableObject {
    height = 540;
    width = 960;

    /**
     * Create a background object.
     * @param {string} imagePath - The path to the image.
     * @param {number} x - The x-coordinate of the object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = this.calculateY();
    }

    /**
     * Calculate the y-coordinate of the object.
     * @returns {number} The y-coordinate.
     */
    calculateY() {
        return this.height - this.height;
    }
}
