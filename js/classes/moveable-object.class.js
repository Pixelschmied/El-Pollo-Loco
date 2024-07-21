/**
 * Class representing a moveable object.
 * @extends DrawableObject
 */
class MoveableObject extends DrawableObject {
    speed = 0.15;
    mirrored = false;
    upForce = 0;
    gravity = 1.8;
    lastHit = 0;
    endbossLastHit = 0;
    groundLevel = 240;
    possibleHeadJump = false;
    died = false;
    defaultMovementDirection = true;
    lastDirectionChange = Date.now();
    lastAnimationUpdate = 0;
    animationInterval = 100; // Zeit in Millisekunden zwischen Animations-Frames

    soundsHurt = [
        'assets/audio/hurt1.wav',
        'assets/audio/hurt2.wav',
        'assets/audio/hurt3.wav',
        'assets/audio/hurt4.wav',
        'assets/audio/hurt5.wav'
    ];

    /**
     * Make the object jump.
     */
    jump() {
        this.upForce = 20;
    }

    /**
     * Apply gravity to the object.
     */
    applyGravity() {
        setInterval(() => {
            if (!this.isFalling() && !this.isAboveGround() && !this.died && this instanceof Character) {
                this.possibleHeadJump = false;
            }
            if (this.isFalling() && this instanceof Character) {
                this.possibleHeadJump = true;
            }
            if (this.isAboveGround() || this.upForce > 0) {
                this.updatePosition();
            } else if (this.died) {
                this.updatePosition();
            }
        }, 1000 / 30);
    }

    /**
     * Update the position of the object based on gravity.
     */
    updatePosition() {
        this.y -= this.upForce;
        this.upForce -= this.gravity;
        if (this.y >= this.groundLevel && (this instanceof Character || this instanceof Endboss) && !this.died) {
            this.y = this.groundLevel;
            this.upForce = 0;
        }
    }

    /**
     * Check if the object is falling.
     * @returns {boolean} True if the object is falling, otherwise false.
     */
    isFalling() {
        return this.upForce <= 0 && this.y < this.groundLevel;
    }

    /**
     * Check if the object is above ground.
     * @returns {boolean} True if the object is above ground, otherwise false.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 240;
        }
    }

    /**
     * Check if the object is moving.
     * @returns {boolean} True if the object is moving, otherwise false.
     */
    isMoving() {
        return (this.world.keyboard.left ||
            this.world.keyboard.right ||
            this.world.keyboard.up ||
            this.world.keyboard.down ||
            this.world.keyboard.e);
    }

    /**
     * Play an animation.
     * @param {string[]} images - Array of image paths.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Check if the object is colliding with another object.
     * @param {MoveableObject} mo - The other moveable object.
     * @returns {boolean} True if the objects are colliding, otherwise false.
     */
    isColliding(mo) {
        let thisFrame = this.getObjectCollisionFrame(this);
        let otherFrame = mo.getObjectCollisionFrame(mo);

        return thisFrame.x < otherFrame.x + otherFrame.width && thisFrame.x + thisFrame.width > otherFrame.x &&
            thisFrame.y < otherFrame.y + otherFrame.height && thisFrame.y + thisFrame.height > otherFrame.y;
    }

    /**
     * Handle when the object is hit.
     */
    hit() {
        if (!this.isHurt()) {
            this.lastHit = new Date().getTime();
            Character.life--;
            this.playHurtSound();
        }
    }

    /**
     * Check if the object is hurt.
     * @returns {boolean} True if the object is hurt, otherwise false.
     */
    isHurt() {
        let timeSinceLastHit = new Date().getTime() - this.lastHit;
        return timeSinceLastHit < 1500;
    }

    /**
     * Play the hurt sound.
     */
    playHurtSound() {
        if (!soundMuted) {
            let sound = new Audio(this.soundsHurt[Math.floor(Math.random() * this.soundsHurt.length)]);
            sound.volume = 0.5;
            sound.play();
        }
    }

    /**
     * Handle when the end boss is hit.
     */
    endbossHit() {
        if (!this.endbossIsHurt()) {
            this.endbossLastHit = new Date().getTime();
            Endboss.life--;
        }
    }

    /**
     * Check if the end boss is hurt.
     * @returns {boolean} True if the end boss is hurt, otherwise false.
     */
    endbossIsHurt() {
        let timeSinceLastHit = new Date().getTime() - this.endbossLastHit;
        return timeSinceLastHit < 1500;
    }

    /**
     * Check if the character is dead.
     * @returns {boolean} True if the character is dead, otherwise false.
     */
    isDead() {
        return Character.life <= 0;
    }

    /**
     * Move the object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Move the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Move the object randomly.
     */
    randomMove() { // TODO: Dont let Chicken move out of canvas
        if (this.defaultMovementDirection) {
            this.mirrored = false;
            this.moveLeft();
        } else {
            this.mirrored = true;
            this.moveRight();
        }
        this.getNewMovementDirection();
    }

    /**
     * Get a new movement direction.
     */
    getNewMovementDirection() {
        if (this.directionChangerTimeReached()) {
            this.timeTillDirectionChange = Math.random() * 15000;
            this.defaultMovementDirection = !this.defaultMovementDirection;
            this.resetDirectionChangerTime();
        }
    }

    /**
     * Reset the time for changing direction.
     */
    resetDirectionChangerTime() {
        this.lastDirectionChange = Date.now();
    }

    /**
     * Check if the time to change direction has been reached.
     * @returns {boolean} True if the time to change direction has been reached, otherwise false.
     */
    directionChangerTimeReached() {
        return Date.now() - this.lastDirectionChange > this.timeTillDirectionChange;
    }
}
