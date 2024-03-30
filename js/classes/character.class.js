class Character extends MoveableObject {
    y = 243;
    width = 610 / 5;
    height = 1200 / 5;
    IMAGES_IDLE = [
        "img/2_character_pepe/1_idle/idle/I-1.png",
        "img/2_character_pepe/1_idle/idle/I-2.png",
        "img/2_character_pepe/1_idle/idle/I-3.png",
        "img/2_character_pepe/1_idle/idle/I-4.png",
        "img/2_character_pepe/1_idle/idle/I-5.png",
        "img/2_character_pepe/1_idle/idle/I-6.png",
        "img/2_character_pepe/1_idle/idle/I-7.png",
        "img/2_character_pepe/1_idle/idle/I-8.png",
        "img/2_character_pepe/1_idle/idle/I-9.png",
        "img/2_character_pepe/1_idle/idle/I-10.png",
    ];

    IMAGES_LONG_IDLE = [
        "img/2_character_pepe/1_idle/long_idle/I-11.png",
        "img/2_character_pepe/1_idle/long_idle/I-12.png",
        "img/2_character_pepe/1_idle/long_idle/I-13.png",
        "img/2_character_pepe/1_idle/long_idle/I-14.png",
        "img/2_character_pepe/1_idle/long_idle/I-15.png",
        "img/2_character_pepe/1_idle/long_idle/I-16.png",
        "img/2_character_pepe/1_idle/long_idle/I-17.png",
        "img/2_character_pepe/1_idle/long_idle/I-18.png",
        "img/2_character_pepe/1_idle/long_idle/I-19.png",
        "img/2_character_pepe/1_idle/long_idle/I-20.png",
    ];

    IMAGES_HURT_IDLE = [
        "img/2_character_pepe/7_hurt_idle/HI-01.png",
        "img/2_character_pepe/7_hurt_idle/HI-02.png",
        "img/2_character_pepe/7_hurt_idle/HI-03.png",
        "img/2_character_pepe/7_hurt_idle/HI-04.png",
        "img/2_character_pepe/7_hurt_idle/HI-05.png",
        "img/2_character_pepe/7_hurt_idle/HI-06.png",
        "img/2_character_pepe/7_hurt_idle/HI-07.png",
        "img/2_character_pepe/7_hurt_idle/HI-08.png",
        "img/2_character_pepe/7_hurt_idle/HI-09.png",
        "img/2_character_pepe/7_hurt_idle/HI-10.png"
    ];

    IMAGES_WALKING = [
        "img/2_character_pepe/2_walk/W-21.png",
        "img/2_character_pepe/2_walk/W-22.png",
        "img/2_character_pepe/2_walk/W-23.png",
        "img/2_character_pepe/2_walk/W-24.png",
        "img/2_character_pepe/2_walk/W-25.png",
        "img/2_character_pepe/2_walk/W-26.png"
    ];

    IMAGES_JUMPING = [
        "img/2_character_pepe/3_jump/J-34.png",
        "img/2_character_pepe/3_jump/J-35.png",
        "img/2_character_pepe/3_jump/J-36.png",
        "img/2_character_pepe/3_jump/J-37.png",
        "img/2_character_pepe/3_jump/J-38.png"
    ]

    IMAGES_HURT_JUMPING = [
        "img/2_character_pepe/8_hurt_jump/HJ-01.png",
        "img/2_character_pepe/8_hurt_jump/HJ-02.png",
        "img/2_character_pepe/8_hurt_jump/HJ-03.png",
        "img/2_character_pepe/8_hurt_jump/HJ-04.png",
        "img/2_character_pepe/8_hurt_jump/HJ-05.png"
    ]

    IMAGES_DEAD = [
        "img/2_character_pepe/5_dead/D-51.png",
        "img/2_character_pepe/5_dead/D-52.png",
        "img/2_character_pepe/5_dead/D-53.png",
        "img/2_character_pepe/5_dead/D-54.png",
        "img/2_character_pepe/5_dead/D-55.png",
        "img/2_character_pepe/5_dead/D-56.png",
        "img/2_character_pepe/5_dead/D-57.png"
    ]

    IMAGES_HURT = [
        "img/2_character_pepe/4_hurt/H-41.png",
        "img/2_character_pepe/4_hurt/H-42.png",
        "img/2_character_pepe/4_hurt/H-43.png"
    ]

    IMAGES_HURT_WALKING = [
        "img/2_character_pepe/6_hurt_walking/HW-01.png",
        "img/2_character_pepe/6_hurt_walking/HW-02.png",
        "img/2_character_pepe/6_hurt_walking/HW-03.png",
        "img/2_character_pepe/6_hurt_walking/HW-04.png",
        "img/2_character_pepe/6_hurt_walking/HW-05.png",
        "img/2_character_pepe/6_hurt_walking/HW-06.png"
    ]


    jumpStartTime = 0;
    isJumping = false;
    isIdle = false;
    idleStartTime = Date.now();
    timeTillLongIdle = 7000;
    world;
    speed = 10;
    //walking_sound = new Audio("audio/character/walking.mp3"); // TODO: Switch Sounds on
    life = 100;
    died = false;
    

    constructor() {
        super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_HURT_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_HURT_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
        console.log(this.height);
    }

    
    animate() {
        this.idleAnimation();
        this.longIdleAnimation();
        this.walkingAnimation();
        this.jumpAnimation();
        //this.hurtAnimation();
        this.deadAnimation();
    }

    idleAnimation() {
        setInterval(() => {
            if (!this.longIdleTimeReached() && !this.isJumping && !this.isMoving() && !this.isHurt() && !this.isDead()) {
                this.playAnimation(this.IMAGES_IDLE);
                console.log("Idle")
            }
            if (!this.longIdleTimeReached() && !this.isJumping && !this.isMoving() && this.isHurt() && !this.isDead()) {
                this.playAnimation(this.IMAGES_HURT_IDLE);
                console.log("Idle")
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
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.isHurt() && !this.isDead() && !this.isJumping) {
                this.playAnimation(this.IMAGES_WALKING);
            }
            if (this.world.keyboard.LEFT && this.x > 0  && !this.isHurt() && !this.isDead() && !this.isJumping) {
                this.playAnimation(this.IMAGES_WALKING);
            }
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && this.isHurt() && !this.isDead() && !this.isJumping) {
                this.playAnimation(this.IMAGES_HURT_WALKING);
            }
            if (this.world.keyboard.LEFT && this.x > 0  && this.isHurt() && !this.isDead() && !this.isJumping) {
                this.playAnimation(this.IMAGES_HURT_WALKING);
            }
        }, 1000 / 17);
    }

    jumpAnimation() {
        setInterval(() => {
            if (this.world.keyboard.UP && !this.isAboveGround() && !this.died) {
                this.jump();
                this.resetIdleStartTime();
            }
            if (this.isJumping && !this.isDead()) {
                this.jumpAnimationTimer();
                console.log("Jumping")
            }
        }, 1000 / 60);
    }

    hurtAnimation() { // TODO: Setup!
        setInterval(() => {
            if (!this.isMoving && this.isHurt() && !this.isDead()) {
                this.playAnimation(this.IMAGES_HURT);
            }
        }, 1000 / 20);
    }

    deadAnimation() { // TODO: Possible Animation Bug (Pictures skipped)
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                setInterval(() => {
                    if (!this.died) {
                        this.upForce = 22;
                        this.died = true;
                    }
                    this.falling();
                }, 1000 / 8);
            }
        }, 1000 / 3);
    }

    jump() {
        if (!this.isJumping) {
            this.isJumping = true;
            this.jumpStartTime = Date.now();
            this.upForce = 22;
        }
    }


    jumpAnimationTimer() { //TODO: Timings need to be adjusted
        const jumpDuration = 1000;
        const elapsedTime = Date.now() - this.jumpStartTime;
        const phase = elapsedTime / jumpDuration;
        if (!this.isHurt()) {
            if (phase < 300/1000) {
                this.setImage(this.IMAGES_JUMPING[0]);
            } else if (phase < 400/1000) {
                this.setImage(this.IMAGES_JUMPING[1]);
            } else if (phase < 500/1000) {
                this.setImage(this.IMAGES_JUMPING[2]);
            } else if (phase < 750/1000) {
                this.setImage(this.IMAGES_JUMPING[3]);
            } else if (phase <= 1000/1000) {
                this.setImage(this.IMAGES_JUMPING[4]);
            } else {
                this.isJumping = false;
                this.setImage(this.IMAGES_IDLE[0]); 
            }
        }
        if (this.isHurt()) {
            if (phase < 300/1000) {
                this.setImage(this.IMAGES_HURT_JUMPING[0]);
            } else if (phase < 400/1000) {
                this.setImage(this.IMAGES_HURT_JUMPING[1]);
            } else if (phase < 500/1000) {
                this.setImage(this.IMAGES_HURT_JUMPING[2]);
            } else if (phase < 750/1000) {
                this.setImage(this.IMAGES_HURT_JUMPING[3]);
            } else if (phase <= 1000/1000) {
                this.setImage(this.IMAGES_HURT_JUMPING[4]);
            } else {
                this.isJumping = false;
                this.setImage(this.IMAGES_IDLE[0]); 
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