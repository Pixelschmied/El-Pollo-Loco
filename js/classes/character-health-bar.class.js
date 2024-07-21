/**
 * Class representing a character health bar.
 * @extends DrawableObject
 */
class CharacterHealthBar extends DrawableObject {

    images = [
        'assets/images/statusbars/healthbar000.png',
        'assets/images/statusbars/healthbar020.png',
        'assets/images/statusbars/healthbar040.png',
        'assets/images/statusbars/healthbar060.png',
        'assets/images/statusbars/healthbar080.png',
        'assets/images/statusbars/healthbar100.png'
    ];

    /**
     * Create a character health bar.
     */
    constructor() {
        super();
        this.loadImages(this.images);
        this.width = 595 / 3;
        this.height = 158 / 3;
        this.x = 30;
        this.y = 0;
        this.img = this.imageCache[this.images[Character.life]];
        this.startUpdating();
    }

    /**
     * Start the interval to update the health bar image.
     */
    startUpdating() {
        setInterval(() => this.updateImage(), 1000 / 30);
    }

    /**
     * Update the health bar image based on the character's life.
     */
    updateImage() {
        this.img = this.imageCache[this.images[Character.life]];
    }
}
