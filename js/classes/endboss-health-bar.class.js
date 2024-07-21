/**
 * Class representing the health bar of the end boss.
 * @extends DrawableObject
 */
class EndbossHealthBar extends DrawableObject {
    images = [
        'assets/images/statusbars/healthbarEndboss000.png',
        'assets/images/statusbars/healthbarEndboss020.png',
        'assets/images/statusbars/healthbarEndboss040.png',
        'assets/images/statusbars/healthbarEndboss060.png',
        'assets/images/statusbars/healthbarEndboss080.png',
        'assets/images/statusbars/healthbarEndboss100.png'
    ];

    /**
     * Create an end boss health bar.
     */
    constructor() {
        super();
        this.loadImages(this.images);
        this.width = 595 / 3;
        this.height = 127 / 3;
        this.x = 730;
        this.y = 13;
        this.img = this.imageCache[this.images[Endboss.life]];
        this.update();
    }

    /**
     * Update the health bar image based on the end boss's life.
     */
    update() {
        setInterval(() => this.setImage(), 1000 / 30);
    }

    /**
     * Set the appropriate health bar image based on the end boss's life.
     */
    setImage() {
        if (Endboss.life <= 0) {
            this.img = this.imageCache[this.images[0]];
        } else {
            this.img = this.imageCache[this.images[Endboss.life]];
        }
    }
}
