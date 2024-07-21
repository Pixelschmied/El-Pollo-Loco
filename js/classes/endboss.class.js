/**
 * Class representing the end boss.
 * @extends MoveableObject
 */
class Endboss extends MoveableObject {
    y = 245;
    width = 1045 / 5;
    height = 1217 / 5;
    static life = 5;
    static x;
    enraged = false;
    attacking = false;
    bossStartPosition = 3800;
    character;
    died = false;
    bossUpForce = 0;
    deadAnimationIndex = 0;
    enrageSound = new Audio('assets/audio/bossEnrage.mp3');

    imagesWalking = [
        'assets/images/enemies/endboss/endbossWalk1.png',
        'assets/images/enemies/endboss/endbossWalk2.png',
        'assets/images/enemies/endboss/endbossWalk3.png',
        'assets/images/enemies/endboss/endbossWalk4.png'
    ];

    imagesAlert = [
        'assets/images/enemies/endboss/endbossAlert1.png',
        'assets/images/enemies/endboss/endbossAlert2.png',
        'assets/images/enemies/endboss/endbossAlert3.png',
        'assets/images/enemies/endboss/endbossAlert4.png',
        'assets/images/enemies/endboss/endbossAlert5.png',
        'assets/images/enemies/endboss/endbossAlert6.png',
        'assets/images/enemies/endboss/endbossAlert7.png',
        'assets/images/enemies/endboss/endbossAlert8.png'
    ];

    imagesAttack = [
        "assets/images/enemies/endboss/endbossAttack1.png",
        "assets/images/enemies/endboss/endbossAttack2.png",
        "assets/images/enemies/endboss/endbossAttack3.png",
        "assets/images/enemies/endboss/endbossAttack4.png",
        "assets/images/enemies/endboss/endbossAttack5.png"
    ];

    imagesHurt = [
        "assets/images/enemies/endboss/endbossHurt1.png",
        "assets/images/enemies/endboss/endbossHurt2.png",
        "assets/images/enemies/endboss/endbossHurt3.png"
    ];

    imagesDead = [
        "assets/images/enemies/endboss/endbossDead1.png",
        "assets/images/enemies/endboss/endbossDead2.png",
        "assets/images/enemies/endboss/endbossDead3.png",
        "assets/images/enemies/endboss/endbossDead3.png",
        "assets/images/enemies/endboss/endbossDead3.png",
        "assets/images/enemies/endboss/endbossDead3.png",
        "assets/images/enemies/endboss/endbossDead3.png",
        "assets/images/enemies/endboss/endbossDead3.png"
    ];

    /**
     * Create an end boss.
     * @param {Character} character - The character that the end boss will interact with.
     */
    constructor(character) {
        super().loadImage(this.imagesWalking[0]);
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesAlert);
        this.loadImages(this.imagesAttack);
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesDead);
        this.x = this.bossStartPosition;
        this.character = character;
        this.speed = 2;
        this.applyGravity();
        this.animate();
        this.enrageCheck();
    }

    /**
     * Animate the end boss.
     */
    animate() {
        this.moveEndboss();
        this.updateEndbossState();
    }

    /**
     * Move the end boss based on character's position.
     */
    moveEndboss() {
        setInterval(() => {
            if (this.enraged && this.character.x < this.x && !this.attacking && !this.died) {
                this.mirrored = false;
                this.moveLeft();
            }
            if (this.enraged && this.character.x > this.x && !this.attacking && !this.died) {
                this.mirrored = true;
                this.moveRight();
            }
        }, 1000 / 60);
    }

    /**
     * Update the state and animation of the end boss.
     */
    updateEndbossState() {
        setInterval(() => {
            this.handleDeath();
            this.handleAnimations();
            this.handleAttacks();
        }, 1000 / 4);
    }

    /**
     * Handle the death of the end boss.
     */
    handleDeath() {
        if (Endboss.life <= 0 && !this.died) {
            this.upForce = 17;
            this.died = true;
        }
        if (this.died) {
            this.playAnimation(this.imagesDead);
        }
    }

    /**
     * Handle the animations of the end boss based on its state.
     */
    handleAnimations() {
        if (Endboss.life >= 1 && this.endbossIsHurt()) {
            this.playAnimation(this.imagesHurt);
        }
        if (!this.endbossIsHurt() && this.enraged && !this.attacking && !this.died) {
            this.playAnimation(this.imagesWalking);
        }
        if (!this.endbossIsHurt() && !this.enraged && !this.attacking && !this.died) {
            this.playAnimation(this.imagesAlert);
        }
    }

    /**
     * Handle the attacks of the end boss.
     */
    handleAttacks() {
        if ((this.x - this.character.x) < 40 && this.x <= this.character.x && !this.died) {
            this.attacking = false;
        }
        if ((this.character.x - this.x) < 20 && this.x >= this.character.x && !this.died) {
            this.attacking = false;
        }
        if ((this.x - this.character.x) < 50 && this.x > this.character.x && !this.died) {
            this.mirrored = false;
            this.attacking = true;
            this.playAnimation(this.imagesAttack);
        }
        if ((this.character.x - this.x) < 150 && this.x < this.character.x) {
            this.mirrored = true;
            this.attacking = true;
            this.playAnimation(this.imagesAttack);
        }
    }

    /**
     * Check if the end boss should be enraged.
     */
    enrageCheck() {
        setInterval(() => {
            if (this.character.x > (this.bossStartPosition - 600) && !this.enraged) {
                this.playEnrageSound();
                this.enraged = true;
            }
        }, 1000 / 10);
    }

    /**
     * Play the enrage sound for the end boss.
     */
    playEnrageSound() {
        if (!soundMuted) {
            this.enrageSound.play();
        }
    }

    /**
     * Animate the death of the end boss.
     */
    endbossDeadAnimation() {
        setInterval(() => {
            if (this.deadAnimationIndex < 2) {
                this.img = this.imagesDead[this.deadAnimationIndex];
                this.deadAnimationIndex++;
            }
            if (this.deadAnimationIndex >= 2) {
                this.img = this.imageCache[this.imagesDead[2]];
            }
        }, 1000 / 5);
    }
}
