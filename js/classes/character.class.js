class Character extends MoveableObject {
    y = 243;
    width = 610 / 5;
    height = 1200 / 5;
    IMAGES_IDLE = [
        "img/2_character_pepe/1_idle/idle/I-01.png",
        "img/2_character_pepe/1_idle/idle/I-02.png",
        "img/2_character_pepe/1_idle/idle/I-03.png",
        "img/2_character_pepe/1_idle/idle/I-04.png",
        "img/2_character_pepe/1_idle/idle/I-05.png",
        "img/2_character_pepe/1_idle/idle/I-06.png",
        "img/2_character_pepe/1_idle/idle/I-07.png",
        "img/2_character_pepe/1_idle/idle/I-08.png",
        "img/2_character_pepe/1_idle/idle/I-09.png",
        "img/2_character_pepe/1_idle/idle/I-10.png"
    ];

    IMAGES_LONG_IDLE = [
        "img/2_character_pepe/1_idle/long_idle/LI-01.png",
        "img/2_character_pepe/1_idle/long_idle/LI-02.png",
        "img/2_character_pepe/1_idle/long_idle/LI-03.png",
        "img/2_character_pepe/1_idle/long_idle/LI-04.png",
        "img/2_character_pepe/1_idle/long_idle/LI-05.png",
        "img/2_character_pepe/1_idle/long_idle/LI-06.png",
        "img/2_character_pepe/1_idle/long_idle/LI-07.png",
        "img/2_character_pepe/1_idle/long_idle/LI-08.png",
        "img/2_character_pepe/1_idle/long_idle/LI-09.png",
        "img/2_character_pepe/1_idle/long_idle/LI-10.png"
    ];

    IMAGES_HURT_IDLE = [
        "img/2_character_pepe/1_idle/hurt_idle/HI-01.png",
        "img/2_character_pepe/1_idle/hurt_idle/HI-02.png",
        "img/2_character_pepe/1_idle/hurt_idle/HI-03.png",
        "img/2_character_pepe/1_idle/hurt_idle/HI-04.png",
        "img/2_character_pepe/1_idle/hurt_idle/HI-05.png",
        "img/2_character_pepe/1_idle/hurt_idle/HI-06.png",
        "img/2_character_pepe/1_idle/hurt_idle/HI-07.png",
        "img/2_character_pepe/1_idle/hurt_idle/HI-08.png",
        "img/2_character_pepe/1_idle/hurt_idle/HI-09.png",
        "img/2_character_pepe/1_idle/hurt_idle/HI-10.png"
    ];

    IMAGES_WALKING = [
        "img/2_character_pepe/2_walk/walk/W-01.png",
        "img/2_character_pepe/2_walk/walk/W-02.png",
        "img/2_character_pepe/2_walk/walk/W-03.png",
        "img/2_character_pepe/2_walk/walk/W-04.png",
        "img/2_character_pepe/2_walk/walk/W-05.png",
        "img/2_character_pepe/2_walk/walk/W-06.png"
    ];

    IMAGES_HURT_WALKING = [
        "img/2_character_pepe/2_walk/hurt_walk/HW-01.png",
        "img/2_character_pepe/2_walk/hurt_walk/HW-02.png",
        "img/2_character_pepe/2_walk/hurt_walk/HW-03.png",
        "img/2_character_pepe/2_walk/hurt_walk/HW-04.png",
        "img/2_character_pepe/2_walk/hurt_walk/HW-05.png",
        "img/2_character_pepe/2_walk/hurt_walk/HW-06.png"
    ];

    IMAGES_JUMPING = [
        "img/2_character_pepe/3_jump/jump/J-01.png",
        "img/2_character_pepe/3_jump/jump/J-02.png",
        "img/2_character_pepe/3_jump/jump/J-03.png",
        "img/2_character_pepe/3_jump/jump/J-04.png",
        "img/2_character_pepe/3_jump/jump/J-05.png"
    ]

    IMAGES_HURT_JUMPING = [
        "img/2_character_pepe/3_jump/hurt_jump/HJ-01.png",
        "img/2_character_pepe/3_jump/hurt_jump/HJ-02.png",
        "img/2_character_pepe/3_jump/hurt_jump/HJ-03.png",
        "img/2_character_pepe/3_jump/hurt_jump/HJ-04.png",
        "img/2_character_pepe/3_jump/hurt_jump/HJ-05.png"
    ]

    IMAGES_DEAD = [
        "img/2_character_pepe/4_dead/D-01.png",
        "img/2_character_pepe/4_dead/D-02.png",
        "img/2_character_pepe/4_dead/D-03.png",
        "img/2_character_pepe/4_dead/D-04.png",
        "img/2_character_pepe/4_dead/D-05.png",
        "img/2_character_pepe/4_dead/D-06.png"
    ]


    jumpStartTime = 0;
    isJumping = false;
    isIdle = false;
    idleStartTime = Date.now();
    timeTillLongIdle = 7000;
    world;
    speed = 15;
    //walking_sound = new Audio("audio/character/walking.mp3"); // TODO: Switch Sounds on
    life = 100;
    

    constructor() {
        super().loadImage("img/2_character_pepe/1_idle/idle/I-10.png");
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
        console.log(this.height);
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
            if (!this.longIdleTimeReached() && !this.isJumping && !this.isMoving() && !this.isHurt() && !this.isDead() || this.x == 0) {
                this.playAnimation(this.IMAGES_IDLE);
                console.log("Idle")
            }
            if (!this.longIdleTimeReached() && !this.isJumping && !this.isMoving() && this.isHurt() && !this.isDead()) {
                this.playAnimation(this.IMAGES_HURT_IDLE);
                console.log("Hurt: Idle")
            }
        }, 1000 / 5);
    }

    longIdleAnimation() {
        setInterval(() => {
            if (this.longIdleTimeReached() && !this.isJumping && !this.isMoving() && !this.isHurt() && !this.isDead()) {
                this.playAnimation(this.IMAGES_LONG_IDLE);
                console.log("Long Idle")
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
                console.log("Move Right")
            }
            if (this.world.keyboard.LEFT && this.x > 0  && !this.isHurt() && !this.isDead() && !this.isJumping) {
                this.playAnimation(this.IMAGES_WALKING);
                console.log("Move Left")
            }
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && this.isHurt() && !this.isDead() && !this.isJumping && this.x < 2) {
                this.playAnimation(this.IMAGES_HURT_WALKING);
                console.log("Hurt: Move Right")
            }
            if (this.world.keyboard.LEFT && this.x > 0  && this.isHurt() && !this.isDead() && !this.isJumping) {
                this.playAnimation(this.IMAGES_HURT_WALKING);
                console.log("Hurt: Move Left")
            }
        }, 1000 / 20);
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
        const jumpDuration = 1000;
        const elapsedTime = Date.now() - this.jumpStartTime;
        const phase = elapsedTime / jumpDuration;
        if (!this.isHurt()) {
            console.log("Jumping")
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
                this.setImage(this.IMAGES_IDLE[9]); 
            }
        }
        if (this.isHurt()) {
            console.log("Hurt: Jumping")
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