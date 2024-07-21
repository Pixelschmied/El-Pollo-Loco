/**
 * Class representing a chick enemy.
 * @extends MoveableObject
 */
class Chick extends MoveableObject {
    y = 425;
    width = 248 / 5;
    height = 248 / 5;

    imagesWalking = [
        'assets/images/enemies/chick/chickWalk1.png',
        'assets/images/enemies/chick/chickWalk1.png',
        'assets/images/enemies/chick/chickWalk1.png'
    ];

    imagesDead = [
        'assets/images/enemies/chick/chickDead.png',
    ];

    timeTillDirectionChange = Math.random() * 10000;
    lastJump = Date.now();
    groundLevel = 425;

    /**
     * Create a chick.
     */
    constructor() {
        super().loadImage(this.imagesWalking[0]);
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesDead);
        this.x = 250 + Math.random() * 3800;
        this.speed = 0.2 + Math.random() * 0.3;
        this.applyGravity();
        this.animate();
        this.deleteAfterDead();
    }

    /**
     * Animate the chick.
     */
    animate() {
        this.moveChick();
        this.animateChick();
        this.checkIfDead();
    }

    /**
     * Move the chick randomly.
     */
    moveChick() {
        setInterval(() => {
            if (this.world.gameStarted && !this.died) {
                this.randomMove();
                this.randomJump();
            }
        }, 1000 / 60);
    }

    /**
     * Play walking animation for the chick.
     */
    animateChick() {
        setInterval(() => {
            if (this.world.gameStarted && !this.died) {
                this.playAnimation(this.imagesWalking);
            }
        }, 1000 / 5);
    }

    /**
     * Check if the chick is dead and update the image.
     */
    checkIfDead() {
        setInterval(() => {
            if (this.died) {
                this.loadImage(this.imagesDead[0]);
            }
        }, 1000 / 60);
    }

    /**
     * Make the chick jump randomly.
     */
    randomJump() {
        if (Math.random() < 0.01 && Date.now() - this.lastJump > 3000) {
            this.lastJump = Date.now();
            this.upForce = 17;
        }
    }

    /**
     * Apply gravity to the chick.
     */
    applyGravity() {
        setInterval(() => {
            if (this.y < this.groundLevel || this.upForce > 0) {
                this.updatePosition();
            } else if (this.died) {
                this.applyDeadGravity();
            }
        }, 1000 / 30);
    }

    /**
     * Update the position of the chick based on gravity.
     */
    updatePosition() {
        this.y -= this.upForce;
        this.upForce -= this.gravity;
        if (this.y >= this.groundLevel && !this.died) {
            this.y = this.groundLevel;
            this.upForce = 0;
        }
    }

    /**
     * Apply gravity when the chick is dead.
     */
    applyDeadGravity() {
        this.y -= this.upForce;
        this.upForce -= this.gravity;
    }

    /**
     * Delete the chick after it is dead and out of view.
     */
    deleteAfterDead() {
        setInterval(() => {
            if (this.died && this.y > 1000) {
                delete this;
            }
        }, 1000);
    }
}
