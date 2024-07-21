/**
 * Class representing a chicken enemy.
 * @extends MoveableObject
 */
class Chicken extends MoveableObject {
    y = 415;
    width = 248 / 4;
    height = 248 / 4;

    imagesWalking = [
        'assets/images/enemies/chicken/chickenWalk1.png',
        'assets/images/enemies/chicken/chickenWalk2.png',
        'assets/images/enemies/chicken/chickenWalk3.png'
    ];

    imagesDead = [
        'assets/images/enemies/chicken/chickenDead.png'
    ];

    timeTillDirectionChange = Math.random() * 10000;

    /**
     * Create a chicken.
     */
    constructor() {
        super().loadImage(this.imagesWalking[0]);
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesDead);
        this.x = 250 + Math.random() * 3800;
        this.speed = 0.2 + Math.random() * 0.3;
        this.applyGravity();
        this.animate();
    }

    /**
     * Animate the chicken.
     */
    animate() {
        this.moveChicken();
        this.animateChicken();
        this.checkIfDead();
    }

    /**
     * Move the chicken randomly.
     */
    moveChicken() {
        setInterval(() => {
            if (this.world.gameStarted && !this.died) {
                this.randomMove();
            }
        }, 1000 / 60);
    }

    /**
     * Play walking animation for the chicken.
     */
    animateChicken() {
        setInterval(() => {
            if (this.world.gameStarted && !this.died) {
                this.playAnimation(this.imagesWalking);
            }
        }, 1000 / 5);
    }

    /**
     * Check if the chicken is dead and update the image.
     */
    checkIfDead() {
        setInterval(() => {
            if (this.died) {
                this.loadImage(this.imagesDead[0]);
            }
        }, 1000 / 60);
    }

    /**
     * Apply gravity to the chicken when dead.
     */
    applyGravity() {
        setInterval(() => {
            if (this.died) {
                this.y -= this.upForce;
                this.upForce -= this.gravity;
            }
        }, 1000 / 30);
    }
}
