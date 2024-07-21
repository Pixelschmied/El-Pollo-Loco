/**
 * Class representing a throwable object.
 * @extends MoveableObject
 */
class ThrowableObject extends MoveableObject {

    IMAGES_THROWN = [
        'assets/images/bottle/bottleRotation1.png',
        'assets/images/bottle/bottleRotation2.png',
        'assets/images/bottle/bottleRotation3.png',
        'assets/images/bottle/bottleRotation4.png'
    ];
    IMAGES_SPLASH = [
        'assets/images/bottle/bottleSplash1.png',
        'assets/images/bottle/bottleSplash2.png',
        'assets/images/bottle/bottleSplash3.png',
        'assets/images/bottle/bottleSplash4.png',
        'assets/images/bottle/bottleSplash5.png',
        'assets/images/bottle/bottleSplash6.png'
    ];
    bottleBroken = false;
    breakStartTime = 0;
    bottleBreakSound = new Audio('assets/audio/bottleBreak.mp3');
    bottleThrowSound = new Audio('assets/audio/throw.mp3');

    throwInterval;
    throwAnimationInterval;
    breakAnimationInterval;

    /**
     * Create a throwable object.
     * @param {Character} character - The character who throws the object.
     * @param {number} x - The x-coordinate of the object.
     * @param {number} y - The y-coordinate of the object.
     * @param {boolean} mirrored - Whether the object is mirrored.
     * @param {Array} flyingBottle - The array of flying bottles.
     */
    constructor(character, x, y, mirrored, flyingBottle) {
        super().loadImage(this.IMAGES_THROWN[0]);
        this.loadImages(this.IMAGES_THROWN);
        this.loadImages(this.IMAGES_SPLASH);
        this.character = character;
        this.x = x;
        this.y = y;
        this.mirrored = mirrored;
        this.flyingBottle = flyingBottle;
        this.height = 400 / 6;
        this.width = 400 / 6;
        this.applyGravity();
        this.throw();
        this.animate();
    }

    /**
     * Throw the object.
     */
    throw() {
        this.playThrowSound();
        if (this.throwInterval) clearInterval(this.throwInterval);
    
        this.upForce = 25;
        let throwSpeed = 6;
        if (this.mirrored) {
            throwSpeed = -throwSpeed;
            this.x -= this.character.width / 2;
        }
    
        this.throwInterval = setInterval(() => {
            if (!this.bottleBroken) {
                this.x += throwSpeed;
            }
            this.updateThrowable();
        }, 1000 / 60);
    }

    /**
     * Apply gravity to the object.
     */
    applyGravity() {
        setInterval(() => {
            if (this.y < 425 || this.upForce > 0) {
                this.y -= this.upForce;
                this.upForce -= this.gravity;
                if (this.y >= 425 && !this.bottleBroken) {
                    this.y = 425;
                    this.bottleBroken = true;
                }
            } else if (this.bottleBroken) {
                this.y -= this.upForce;
                this.upForce -= this.gravity;
            }
        }, 1000 / 30);
    }

    /**
     * Animate the object.
     */
    animate() {
        this.breakAnimation();
        this.throwAnimation();
    }

    /**
     * Handle the throw animation.
     */
    throwAnimation() {
        if (this.throwAnimationInterval) clearInterval(this.throwAnimationInterval);
    
        this.throwAnimationInterval = setInterval(() => {
            if (!this.bottleBroken) {
                this.playAnimation(this.IMAGES_THROWN);
            }
        }, 1000 / 10);
    }

    /**
     * Handle the break animation.
     */
    breakAnimation() {
        if (this.breakAnimationInterval) clearInterval(this.breakAnimationInterval);
    
        this.breakAnimationInterval = setInterval(() => {
            if (this.bottleBroken) {
                this.breakBottle();
            }
        }, 1000 / 3);
    }

    /**
     * Break the bottle and handle the splash animation.
     */
    breakBottle() {
        this.bottleCollisionSound();
        if (!this.breakStartTime) {
            this.breakStartTime = Date.now();
        }
    
        const breakDuration = 500;
        const elapsedTime = Date.now() - this.breakStartTime;
        const phase = elapsedTime / breakDuration;
    
        if (phase < 1/6) {
            this.setImage(this.IMAGES_SPLASH[0]);
        } else if (phase < 2/6) {
            this.setImage(this.IMAGES_SPLASH[1]);
        } else if (phase < 3/6) {
            this.setImage(this.IMAGES_SPLASH[2]);
        } else if (phase < 4/6) {
            this.setImage(this.IMAGES_SPLASH[3]);
        } else if (phase < 5/6) {
            this.setImage(this.IMAGES_SPLASH[4]);
        } else if (phase <= 1) {
            this.setImage(this.IMAGES_SPLASH[5]);
        } else {
            this.bottleBroken = false;
            clearInterval(this.throwInterval);
            clearInterval(this.breakAnimationInterval);
            clearInterval(this.throwAnimationInterval);
            this.flyingBottle.pop();
            this.breakStartTime = null;
        }
    }

    /**
     * Update the throwable object.
     */
    updateThrowable() {
        if (this.bottleBroken || this.flyingBottle[0] && this.flyingBottle[0].y > 418) {
            this.bottleBroken = true;
            this.breakBottle();
            this.upForce = 0;
        }
    }

    /**
     * Play the bottle collision sound.
     */
    bottleCollisionSound() {
        if (!soundMuted) {
          this.bottleBreakSound.play();
        }
    }

    /**
     * Play the throw sound.
     */
    playThrowSound() {
        if (!soundMuted) {
            this.bottleThrowSound.play();
        }
    }
}
