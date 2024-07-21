/**
 * Class representing a cloud.
 * @extends MoveableObject
 */
class Cloud extends MoveableObject {
    y = 0;
    width = 1920 / 3;
    height = 1080 / 3;

    /**
     * Create a cloud.
     */
    constructor() {
        super().loadImage('assets/images/background/clouds.png');
        this.x = Math.random() * 15000;
        this.y = Math.random() * 80;
        this.speed = 0.1 + Math.random() * 0.5;
        this.animate();
    }

    /**
     * Animate the cloud by moving it to the left.
     */
    animate() {
        setInterval(() => this.moveLeft(), 1000 / 60);
    }
}
