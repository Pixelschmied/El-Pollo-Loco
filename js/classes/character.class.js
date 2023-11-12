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
    IMAGES_WALKING = [
        "img/2_character_pepe/2_walk/W-21.png",
        "img/2_character_pepe/2_walk/W-22.png",
        "img/2_character_pepe/2_walk/W-23.png",
        "img/2_character_pepe/2_walk/W-24.png",
        "img/2_character_pepe/2_walk/W-25.png",
        "img/2_character_pepe/2_walk/W-26.png"
    ];

    IMAGES_JUMPING = [
        "img/2_character_pepe/3_jump/J-34.png", //3
        "img/2_character_pepe/3_jump/J-35.png", //4
        "img/2_character_pepe/3_jump/J-36.png", //5
        "img/2_character_pepe/3_jump/J-37.png", //6
        "img/2_character_pepe/3_jump/J-38.png", //7
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
    jumpStartTime = 0;
    isJumping = false;
    isIdle = false;
    idleStartTime = 0;
    world;
    speed = 10;
    //walking_sound = new Audio("audio/character/walking.mp3");
    life = 100;
    

    constructor() {
        super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
    }

    setImage(imagePath) {
        const cachedImage = this.imageCache[imagePath];
        if (cachedImage) {
            this.img = cachedImage;
        } else {
            console.error('Bild nicht im Cache gefunden:', imagePath);
        }
    }
    
    animate() {
        this.idleAnimation();
        //this.longIdleAnimation(); // WIP
        this.walkingAnimation();
        this.jumpAnimation();
        this.hurtAnimation();
        this.deadAnimation();
    }

    idleAnimation() {
        setInterval(() => {
            if (!this.isJumping && !this.isMoving() && !this.isHurt() && !this.isDead()) {
                this.playAnimation(this.IMAGES_IDLE);
                console.log("Idle")
            }
        }, 1000 / 5);
    }

    //longIdleAnimation() {
    //    setInterval(() => {
    //        if (!this.isJumping && !this.isMoving()) {
    //            this.playAnimation(this.IMAGES_IDLE);
    //        }
    //    }, 1000 / 6);
    //}


    walkingAnimation() {
        setInterval(() => {
            // MOVEMENT
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.mirrored = false;
                this.moveRight();
                //this.walking_sound.play(); // TODO: Switch Sounds on (Maybe Switch to moveRight() Function?!)
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.mirrored = true;
                this.moveLeft();
                //this.walking_sound.play(); // TODO: Switch Sounds on (Maybe Switch to moveLeft() Function?!)
            }
            // ANIMATIONS
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.isHurt() && !this.isDead() && !this.isJumping) {
                this.playAnimation(this.IMAGES_WALKING);
            }
            if (this.world.keyboard.LEFT && this.x > 0  && !this.isHurt() && !this.isDead() && !this.isJumping) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 1000 / 20);
    }

    jumpAnimation() {
        setInterval(() => {
            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
            }
            if (this.isJumping && !this.isHurt() && !this.isDead()) {
                this.jumpAnimationTimer();
                console.log("Jumping")
            }
        }, 1000 / 60);
    }

    hurtAnimation() { // TODO: Setup!
        setInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }
        }, 1000 / 5);
    }

    deadAnimation() { // TODO: Setup!
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 1000 / 3);
    }

    jump() {
        if (!this.isJumping) {
            this.isJumping = true;
            this.jumpStartTime = Date.now(); // Jump-Timer start
            this.speedY = 22; // set Y-speed for jump
        }
    }


    jumpAnimationTimer() {
        const jumpDuration = 1000; // total jump animation duration in ms
        const elapsedTime = Date.now() - this.jumpStartTime;
        const phase = elapsedTime / jumpDuration;
        if (phase < 1/5) {
            this.setImage(this.IMAGES_JUMPING[0]);
        } else if (phase < 2/5) {
            this.setImage(this.IMAGES_JUMPING[1]);
        } else if (phase < 3/5) {
            this.setImage(this.IMAGES_JUMPING[2]);
        } else if (phase < 4/5) {
            this.setImage(this.IMAGES_JUMPING[3]);
        } else if (phase <= 1) {
            this.setImage(this.IMAGES_JUMPING[4]);

        } else {
            this.isJumping = false; // Sprung ist vorbei
            this.setImage(this.IMAGES_IDLE[0]); // Zurück zur Standbildanimation
        }
    }
}