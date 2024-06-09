class Character extends MoveableObject {
    y = 243;
    width = 610 / 5;
    height = 1200 / 5;
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-01.png',
        'img/2_character_pepe/1_idle/idle/I-02.png',
        'img/2_character_pepe/1_idle/idle/I-03.png',
        'img/2_character_pepe/1_idle/idle/I-04.png',
        'img/2_character_pepe/1_idle/idle/I-05.png',
        'img/2_character_pepe/1_idle/idle/I-06.png',
        'img/2_character_pepe/1_idle/idle/I-07.png',
        'img/2_character_pepe/1_idle/idle/I-08.png',
        'img/2_character_pepe/1_idle/idle/I-09.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/LI-01.png',
        'img/2_character_pepe/1_idle/long_idle/LI-02.png',
        'img/2_character_pepe/1_idle/long_idle/LI-03.png',
        'img/2_character_pepe/1_idle/long_idle/LI-04.png',
        'img/2_character_pepe/1_idle/long_idle/LI-05.png',
        'img/2_character_pepe/1_idle/long_idle/LI-06.png',
        'img/2_character_pepe/1_idle/long_idle/LI-07.png',
        'img/2_character_pepe/1_idle/long_idle/LI-08.png',
        'img/2_character_pepe/1_idle/long_idle/LI-09.png',
        'img/2_character_pepe/1_idle/long_idle/LI-10.png'
    ];

    IMAGES_HURT_IDLE = [
        'img/2_character_pepe/1_idle/hurt_idle/HI-01.png',
        'img/2_character_pepe/1_idle/hurt_idle/HI-02.png',
        'img/2_character_pepe/1_idle/hurt_idle/HI-03.png',
        'img/2_character_pepe/1_idle/hurt_idle/HI-04.png',
        'img/2_character_pepe/1_idle/hurt_idle/HI-05.png',
        'img/2_character_pepe/1_idle/hurt_idle/HI-06.png',
        'img/2_character_pepe/1_idle/hurt_idle/HI-07.png',
        'img/2_character_pepe/1_idle/hurt_idle/HI-08.png',
        'img/2_character_pepe/1_idle/hurt_idle/HI-09.png',
        'img/2_character_pepe/1_idle/hurt_idle/HI-10.png'
    ];

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/walk/W-01.png',
        'img/2_character_pepe/2_walk/walk/W-02.png',
        'img/2_character_pepe/2_walk/walk/W-03.png',
        'img/2_character_pepe/2_walk/walk/W-04.png',
        'img/2_character_pepe/2_walk/walk/W-05.png',
        'img/2_character_pepe/2_walk/walk/W-06.png'
    ];

    IMAGES_HURT_WALKING = [
        'img/2_character_pepe/2_walk/hurt_walk/HW-01.png',
        'img/2_character_pepe/2_walk/hurt_walk/HW-02.png',
        'img/2_character_pepe/2_walk/hurt_walk/HW-03.png',
        'img/2_character_pepe/2_walk/hurt_walk/HW-04.png',
        'img/2_character_pepe/2_walk/hurt_walk/HW-05.png',
        'img/2_character_pepe/2_walk/hurt_walk/HW-06.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/jump/J-01.png',
        'img/2_character_pepe/3_jump/jump/J-02.png',
        'img/2_character_pepe/3_jump/jump/J-03.png',
        'img/2_character_pepe/3_jump/jump/J-04.png',
        'img/2_character_pepe/3_jump/jump/J-05.png'
    ]

    IMAGES_HURT_JUMPING = [
        'img/2_character_pepe/3_jump/hurt_jump/HJ-01.png',
        'img/2_character_pepe/3_jump/hurt_jump/HJ-02.png',
        'img/2_character_pepe/3_jump/hurt_jump/HJ-03.png',
        'img/2_character_pepe/3_jump/hurt_jump/HJ-04.png',
        'img/2_character_pepe/3_jump/hurt_jump/HJ-05.png'
    ]

    IMAGES_DEAD = [
        'img/2_character_pepe/4_dead/D-01.png',
        'img/2_character_pepe/4_dead/D-02.png',
        'img/2_character_pepe/4_dead/D-03.png',
        'img/2_character_pepe/4_dead/D-04.png',
        'img/2_character_pepe/4_dead/D-05.png',
        'img/2_character_pepe/4_dead/D-06.png'
    ]

    jumpStartTime = 0;
    isJumping = false;
    isIdle = false;
    idleStartTime = Date.now();
    timeTillLongIdle = 7000;
    world;
    speed = 10;
    //walking_sound = new Audio('audio/character/walking.mp3'); // TODO: Switch Sounds on
    static life = 5;
    targetCameraX = 0;
    smoothFactor = 0.15;

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-10.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_HURT_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT_JUMPING);
        this.loadImages(this.IMAGES_HURT_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
    }


    animate() {
        this.idleAnimation();
        this.longIdleAnimation();
        this.walkingAnimation();
        this.jumpAnimation();
        this.deadAnimation();
    }

    idleAnimation() {
        setInterval(() => {
            if (!this.longIdleTimeReached() && !this.isJumping && !this.isMoving() && !this.isHurt() && !this.isDead()
                || this.x == 0 && !this.longIdleTimeReached()
                || this.x == 4200 && !this.longIdleTimeReached()
                || !this.isMoving() && this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.isDead()
                || this.world.keyboard.LEFT && this.world.keyboard.RIGHT) {
                this.playAnimation(this.IMAGES_IDLE);
            }
            if (!this.longIdleTimeReached() && !this.isJumping && !this.isMoving() && this.isHurt() && !this.isDead()
                || this.x == 0 && !this.longIdleTimeReached() && this.isHurt()
                || this.x == 4200 && !this.longIdleTimeReached() && this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT_IDLE);
            }
        }, 1000 / 5);
    }

    longIdleAnimation() {
        setInterval(() => {
            if (this.longIdleTimeReached() && !this.isJumping && !this.isMoving() && !this.isHurt() && !this.isDead()) {
                this.playAnimation(this.IMAGES_LONG_IDLE);
            }
        }, 1000 / 6);
    }


    walkingAnimation() {
        setInterval(() => {
            // MOVEMENT
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.isDead()) {
                this.mirrored = false;
                this.moveRight();
                this.resetIdleStartTime();
                //this.walking_sound.play(); // TODO: Switch Sounds on (Maybe Switch to moveRight() Function?!)
            }
            if (this.world.keyboard.LEFT && this.x > 0 && !this.isDead()) {
                this.mirrored = true;
                this.moveLeft();
                this.resetIdleStartTime();
                //this.walking_sound.play(); // TODO: Switch Sounds on (Maybe Switch to moveLeft() Function?!)
            }
            
            // ANIMATIONS
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.isHurt() && !this.isDead() && !this.isJumping && !this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
            if (this.world.keyboard.LEFT && this.x > 0 && !this.isHurt() && !this.isDead() && !this.isJumping && !this.world.keyboard.RIGHT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && this.isHurt() && !this.isDead() && !this.isJumping) {
                this.playAnimation(this.IMAGES_HURT_WALKING);
            }
            if (this.world.keyboard.LEFT && this.x > 0 && this.isHurt() && !this.isDead() && !this.isJumping) {
                this.playAnimation(this.IMAGES_HURT_WALKING);
            }

            // CAMERA LOCK
            this.cameraControl();
        }, 1000 / 30);
    }

    cameraControl() {
        let cameraTargetX = this.getNewCameraTarget();
        let distance = cameraTargetX - this.world.cameraX;
        let step = this.calculateStep(distance);
        this.updateCameraPosition(distance, step);
    }
    
    getNewCameraTarget() {
        let cameraTargetX;
        cameraTargetX = -this.x + 100; // default camera position

        //focuses the camera on the endboss location
        if (world.character.x > world.level.enemies[world.level.enemies.length -1].x) {
            cameraTargetX = -this.x + 760; // 
        }
    
        // limits the cameraTargetX to the range between -3360 and 0
        cameraTargetX = Math.max(-3360, Math.min(cameraTargetX, 0));
    
        return cameraTargetX;
    }
    
    calculateStep(distance) {
        let maxStep = 15; // maximum step per frame
        let absDistance = Math.abs(distance); // absolute value to prevent subpixel-rendering
        let t = Math.min(absDistance / 100, 1); // linear interpolation between 0 and 1
        t = t * t * (3 - 2 * t); // smoothstep function
        return maxStep * t;
    }
    
    updateCameraPosition(distance, step) {
        this.world.cameraX += Math.sign(distance) * step;
        this.world.cameraX = Math.round(this.world.cameraX);  // Sicherstellen, dass die Kameraposition immer eine ganze Zahl ist
    
        // Begrenzung der Kameraposition auf den Bereich zwischen 0 und 3600 Pixel
        this.world.cameraX = Math.max(-3360, Math.min(this.world.cameraX, 0));
    }
    

    jumpAnimation() {
        setInterval(() => {
            if (this.world.keyboard.UP && !this.isAboveGround() && !this.died) {
                this.jump();
                this.resetIdleStartTime();
            }
            if (this.isJumping && !this.isDead()) {
                this.jumpAnimationTimer();
            }
        }, 1000 / 60);
    }

    deadAnimation() {
        if (!this.checkDeadInterval) {
            this.checkDeadInterval = setInterval(() => {
                if (this.isDead()) {
                    if (!this.deadAnimationInterval) {
                        this.deadAnimationInterval = true;
                        setInterval(() => {
                            if (this.isDead()) {
                                this.playAnimation(this.IMAGES_DEAD);
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


    jump() {
        if (!this.isJumping) {
            this.isJumping = true;
            this.jumpStartTime = Date.now();
            this.upForce = 22;
        }
    }


    jumpAnimationTimer() {
        let jumpDuration = 1000;
        let elapsedTime = Date.now() - this.jumpStartTime;
        let phase = elapsedTime / jumpDuration;
        if (!this.isHurt()) {
            if (phase < 300 / 1000) {
                this.setImage(this.IMAGES_JUMPING[0]);
            } else if (phase < 400 / 1000) {
                this.setImage(this.IMAGES_JUMPING[1]);
            } else if (phase < 500 / 1000) {
                this.setImage(this.IMAGES_JUMPING[2]);
            } else if (phase < 750 / 1000) {
                this.setImage(this.IMAGES_JUMPING[3]);
            } else if (phase <= 800 / 1000) {
                this.setImage(this.IMAGES_JUMPING[4]);
            } else {
                this.isJumping = false;
                this.setImage(this.IMAGES_IDLE[9]);
            }
        }
        if (this.isHurt()) {
            if (phase < 300 / 1000) {
                this.setImage(this.IMAGES_HURT_JUMPING[0]);
            } else if (phase < 400 / 1000) {
                this.setImage(this.IMAGES_HURT_JUMPING[1]);
            } else if (phase < 500 / 1000) {
                this.setImage(this.IMAGES_HURT_JUMPING[2]);
            } else if (phase < 750 / 1000) {
                this.setImage(this.IMAGES_HURT_JUMPING[3]);
            } else if (phase <= 1000 / 1000) {
                this.setImage(this.IMAGES_HURT_JUMPING[4]);
            } else {
                this.isJumping = false;
                this.setImage(this.IMAGES_HURT_IDLE[9]);
            }
        }
    }

    resetIdleStartTime() {
        this.idleStartTime = Date.now();
    }

    longIdleTimeReached() {
        return Date.now() - this.idleStartTime > this.timeTillLongIdle;
    }
}