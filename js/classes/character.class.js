/**
 * Class representing the character.
 * @extends MoveableObject
 */
class Character extends MoveableObject {
    y = 243;
    width = 610 / 5;
    height = 1200 / 5;

    imagesIdle = [
        'assets/images/character/characterIdle1.png',
        'assets/images/character/characterIdle2.png',
        'assets/images/character/characterIdle3.png',
        'assets/images/character/characterIdle4.png',
        'assets/images/character/characterIdle5.png',
        'assets/images/character/characterIdle6.png',
        'assets/images/character/characterIdle7.png',
        'assets/images/character/characterIdle8.png',
        'assets/images/character/characterIdle9.png',
        'assets/images/character/characterIdle10.png'
    ];

    imagesLongIdle = [
        'assets/images/character/characterIdleLong1.png',
        'assets/images/character/characterIdleLong2.png',
        'assets/images/character/characterIdleLong3.png',
        'assets/images/character/characterIdleLong4.png',
        'assets/images/character/characterIdleLong5.png',
        'assets/images/character/characterIdleLong6.png',
        'assets/images/character/characterIdleLong7.png',
        'assets/images/character/characterIdleLong8.png',
        'assets/images/character/characterIdleLong9.png',
        'assets/images/character/characterIdleLong10.png'
    ];

    imagesHurtIdle = [
        'assets/images/character/characterIdleHurt1.png',
        'assets/images/character/characterIdleHurt2.png',
        'assets/images/character/characterIdleHurt3.png',
        'assets/images/character/characterIdleHurt4.png',
        'assets/images/character/characterIdleHurt5.png',
        'assets/images/character/characterIdleHurt6.png',
        'assets/images/character/characterIdleHurt7.png',
        'assets/images/character/characterIdleHurt8.png',
        'assets/images/character/characterIdleHurt9.png',
        'assets/images/character/characterIdleHurt10.png'
    ];

    imagesWalking = [
        'assets/images/character/characterWalk1.png',
        'assets/images/character/characterWalk2.png',
        'assets/images/character/characterWalk3.png',
        'assets/images/character/characterWalk4.png',
        'assets/images/character/characterWalk5.png',
        'assets/images/character/characterWalk6.png'
    ];

    imagesHurtWalking = [
        'assets/images/character/characterWalkHurt1.png',
        'assets/images/character/characterWalkHurt2.png',
        'assets/images/character/characterWalkHurt3.png',
        'assets/images/character/characterWalkHurt4.png',
        'assets/images/character/characterWalkHurt5.png',
        'assets/images/character/characterWalkHurt6.png'
    ];

    imagesJumping = [
        'assets/images/character/characterJump1.png',
        'assets/images/character/characterJump2.png',
        'assets/images/character/characterJump3.png',
        'assets/images/character/characterJump4.png',
        'assets/images/character/characterJump5.png'
    ];

    imagesHurtJumping = [
        'assets/images/character/characterJumpHurt1.png',
        'assets/images/character/characterJumpHurt2.png',
        'assets/images/character/characterJumpHurt3.png',
        'assets/images/character/characterJumpHurt4.png',
        'assets/images/character/characterJumpHurt5.png'
    ];

    imagesDead = [
        'assets/images/character/characerDead1.png',
        'assets/images/character/characerDead2.png',
        'assets/images/character/characerDead3.png',
        'assets/images/character/characerDead4.png',
        'assets/images/character/characerDead5.png',
        'assets/images/character/characerDead6.png'
    ];

    soundsJump = [
        'assets/audio/jump1.wav',
        'assets/audio/jump2.wav',
        'assets/audio/jump3.wav',
        'assets/audio/jump4.wav',
        'assets/audio/jump5.wav'
    ];

    soundsWalk = [
        'assets/audio/steps1.wav',
        'assets/audio/steps2.wav',
        'assets/audio/steps3.wav',
        'assets/audio/steps4.wav',
        'assets/audio/steps5.wav'
    ];

    jumpStartTime = 0;
    isJumping = false;
    isIdle = false;
    idleStartTime = Date.now();
    timeTillLongIdle = 7000;
    world;
    speed = 10;
    static life = 5;
    targetCameraX = 0;
    smoothFactor = 0.15;
    lastWalkSoundUpdate = 0;
    walkSoundInterval = 300; // Zeit in Millisekunden zwischen Sounds

    /**
     * Create a character.
     */
    constructor() {
        super().loadImage('assets/images/character/characterIdle10.png');
        this.loadImages(this.imagesIdle);
        this.loadImages(this.imagesLongIdle);
        this.loadImages(this.imagesHurtIdle);
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesJumping);
        this.loadImages(this.imagesHurtJumping);
        this.loadImages(this.imagesHurtWalking);
        this.loadImages(this.imagesDead);
        this.applyGravity();
        this.animate();
        this.checkGameStatus();
    }

    /**
     * Animate the character.
     */
    animate() {
        this.idleAnimation();
        this.longIdleAnimation();
        this.walkingAnimation();
        this.jumpAnimation();
        this.deadAnimation();
    }

    /**
     * Check the game status and display appropriate overlays.
     */
    checkGameStatus() {
        if (this.gameStatusInterval) {
            clearInterval(this.gameStatusInterval);
        }
        this.gameStatusInterval = setInterval(() => {
            if (Character.life <= 0 && !checkIfElementExists('loseOverlay')) {
                setTimeout(() => {
                    if (!checkIfElementExists('loseOverlay')) {
                        showLoseOverlay();
                    }
                }, 2000);
            } else if (Endboss.life <= 0 && !checkIfElementExists('winOverlay')) {
                setTimeout(() => {
                    if (!checkIfElementExists('winOverlay')) {
                        showWinOverlay();
                        world.killAllEnemies();
                    }
                }, 2000);
            }
        }, 1000);
    }

    /**
     * Handle idle animation.
     */
    idleAnimation() {
        setInterval(() => {
            if (!this.longIdleTimeReached() && !this.isJumping && !this.isMoving() && !this.isHurt() && !this.isDead()
                || this.x == 0 && !this.longIdleTimeReached()
                || this.x == 4200 && !this.longIdleTimeReached()
                || !this.isMoving() && this.world.keyboard.right && this.x < this.world.level.levelEndX && !this.isDead()
                || this.world.keyboard.left && this.world.keyboard.right) {
                this.playAnimation(this.imagesIdle);
            }
            if (!this.longIdleTimeReached() && !this.isJumping && !this.isMoving() && this.isHurt() && !this.isDead()
                || this.x == 0 && !this.longIdleTimeReached() && this.isHurt()
                || this.x == 4200 && !this.longIdleTimeReached() && this.isHurt()) {
                this.playAnimation(this.imagesHurtIdle);
            }
        }, 1000 / 5);
    }

    /**
     * Handle long idle animation.
     */
    longIdleAnimation() {
        setInterval(() => {
            if (this.longIdleTimeReached() && !this.isJumping && !this.isMoving() && !this.isHurt() && !this.isDead()) {
                this.playAnimation(this.imagesLongIdle);
            }
        }, 1000 / 6);
    }

    /**
     * Handle walking animation.
     */
    walkingAnimation() {
        setInterval(() => {
            let now = Date.now();
            if (this.world.keyboard.right && this.x < this.world.level.levelEndX && !this.isDead()) {
                this.mirrored = false;
                this.moveRight();
                this.resetIdleStartTime();
            }
            if (this.world.keyboard.left && this.x > 0 && !this.isDead()) {
                this.mirrored = true;
                this.moveLeft();
                this.resetIdleStartTime();
            }

            if (now - this.lastAnimationUpdate > this.animationInterval) {
                this.handleWalkingAnimation(now);
                this.lastAnimationUpdate = now;
            }

            this.cameraControl();
        }, 1000 / 30);
    }

    /**
     * Handle the walking animation based on the character's state.
     * @param {number} now - The current time.
     */
    handleWalkingAnimation(now) {
        if (this.world.keyboard.right && this.x < this.world.level.levelEndX && !this.isHurt() && !this.isDead() && !this.isJumping && !this.world.keyboard.left) {
            this.playAnimation(this.imagesWalking);
            this.playWalkSound(now);
        }
        if (this.world.keyboard.left && this.x > 0 && !this.isHurt() && !this.isDead() && !this.isJumping && !this.world.keyboard.right) {
            this.playAnimation(this.imagesWalking);
            this.playWalkSound(now);
        }
        if (this.world.keyboard.right && this.x < this.world.level.levelEndX && this.isHurt() && !this.isDead() && !this.isJumping) {
            this.playAnimation(this.imagesHurtWalking);
            this.playWalkSound(now);
        }
        if (this.world.keyboard.left && this.x > 0 && this.isHurt() && !this.isDead() && !this.isJumping) {
            this.playAnimation(this.imagesHurtWalking);
            this.playWalkSound(now);
        }
    }

    /**
     * Play the walking sound at appropriate intervals.
     * @param {number} now - The current time.
     */
    playWalkSound(now) {
        if (now - this.lastWalkSoundUpdate > this.walkSoundInterval) {
            this.playWalkingSound();
            this.lastWalkSoundUpdate = now;
        }
    }

    /**
     * Set the animation interval.
     * @param {number} interval - The interval in milliseconds.
     */
    setAnimationInterval(interval) {
        this.animationInterval = interval;
    }

    /**
     * Set the sound interval.
     * @param {number} interval - The interval in milliseconds.
     */
    setSoundInterval(interval) {
        this.walkSoundInterval = interval;
    }

    /**
     * Control the camera to follow the character.
     */
    cameraControl() {
        let cameraTargetX = this.getNewCameraTarget();
        let distance = cameraTargetX - this.world.cameraX;
        let step = this.calculateStep(distance);
        this.updateCameraPosition(distance, step);
    }

    /**
     * Get the new camera target x-coordinate.
     * @returns {number} The new camera target x-coordinate.
     */
    getNewCameraTarget() {
        let cameraTargetX = -this.x + 100;

        if (world.level.enemies[world.level.enemies.length - 1] && world.character.x > world.level.enemies[world.level.enemies.length - 1].x) {
            cameraTargetX = -this.x + 760;
        }

        cameraTargetX = Math.max(-3360, Math.min(cameraTargetX, 0));

        return cameraTargetX;
    }

    /**
     * Calculate the step size for camera movement.
     * @param {number} distance - The distance to the target.
     * @returns {number} The calculated step size.
     */
    calculateStep(distance) {
        let maxStep = 15;
        let absDistance = Math.abs(distance);
        let t = Math.min(absDistance / 100, 1);
        t = t * t * (3 - 2 * t);
        return maxStep * t;
    }

    /**
     * Update the camera position.
     * @param {number} distance - The distance to the target.
     * @param {number} step - The step size.
     */
    updateCameraPosition(distance, step) {
        this.world.cameraX += Math.sign(distance) * step;
        this.world.cameraX = Math.round(this.world.cameraX);
        this.world.cameraX = Math.max(-3360, Math.min(this.world.cameraX, 0));
    }

    /**
     * Handle jump animation.
     */
    jumpAnimation() {
        setInterval(() => {
            if (this.world.keyboard.up && !this.isAboveGround() && !this.died) {
                this.jump();
                this.resetIdleStartTime();
            }
            if (this.isJumping && !this.isDead()) {
                this.jumpAnimationTimer();
            }
        }, 1000 / 60);
    }

    /**
     * Handle dead animation.
     */
    deadAnimation() {
        if (!this.checkDeadInterval) {
            this.checkDeadInterval = setInterval(() => {
                if (this.isDead()) {
                    if (!this.deadAnimationInterval) {
                        this.deadAnimationInterval = true;
                        setInterval(() => {
                            if (this.isDead()) {
                                this.playAnimation(this.imagesDead);
                            }
                            if (!this.died) {
                                this.upForce = 17;
                                this.died = true;
                            }
                        }, 1000 / 2);
                    }
                }
            }, 1000 / 10);
        }
    }

    /**
     * Make the character jump.
     */
    jump() {
        if (!this.isJumping) {
            this.playJumpSound();
            this.isJumping = true;
            this.jumpStartTime = Date.now();
            this.upForce = 22;
        }
    }

    /**
     * Play the jump sound.
     */
    playJumpSound() {
        if (!soundMuted) {
            let sound = new Audio(this.soundsJump[Math.floor(Math.random() * this.soundsJump.length)]);
            sound.volume = 0.5;
            sound.play();
        }
    }

    /**
     * Play the walking sound.
     */
    playWalkingSound() {
        if (!soundMuted) {
            let sound = new Audio(this.soundsWalk[Math.floor(Math.random() * this.soundsWalk.length)]);
            sound.volume = 0.5;
            sound.play();
        }
    }

    /**
     * Handle the jump animation timer.
     */
    jumpAnimationTimer() {
        let jumpDuration = 1000;
        let elapsedTime = Date.now() - this.jumpStartTime;
        let phase = elapsedTime / jumpDuration;
        this.setJumpImage(phase);
    }

    /**
     * Set the appropriate image during jump based on the phase.
     * @param {number} phase - The current phase of the jump.
     */
    setJumpImage(phase) {
        if (!this.isHurt()) {
            this.setJumpingImage(phase, this.imagesJumping, this.imagesIdle);
        } else {
            this.setJumpingImage(phase, this.imagesHurtJumping, this.imagesHurtIdle);
        }
    }

    /**
     * Set the jumping image based on the phase and image arrays.
     * @param {number} phase - The current phase of the jump.
     * @param {Array} jumpingImages - The array of jumping images.
     * @param {Array} idleImages - The array of idle images.
     */
    setJumpingImage(phase, jumpingImages, idleImages) {
        if (phase < 300 / 1000) {
            this.setImage(jumpingImages[0]);
        } else if (phase < 400 / 1000) {
            this.setImage(jumpingImages[1]);
        } else if (phase < 500 / 1000) {
            this.setImage(jumpingImages[2]);
        } else if (phase < 750 / 1000) {
            this.setImage(jumpingImages[3]);
        } else if (phase <= 800 / 1000) {
            this.setImage(jumpingImages[4]);
        } else {
            this.isJumping = false;
            this.setImage(idleImages[9]);
        }
    }

    /**
     * Reset the idle start time.
     */
    resetIdleStartTime() {
        this.idleStartTime = Date.now();
    }

    /**
     * Check if long idle time is reached.
     * @returns {boolean} True if long idle time is reached, false otherwise.
     */
    longIdleTimeReached() {
        return Date.now() - this.idleStartTime > this.timeTillLongIdle;
    }
}
