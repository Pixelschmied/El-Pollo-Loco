class ThrowableObject extends MoveableObject {

    IMAGES_THROWN = [
        "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png"
    ];
    IMAGES_SPLASH = [
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png"
    ]
    bottleBroken = false;
    breakStartTime = 0;

    constructor(x, y, mirrored, throwableObjects) {
        super().loadImage("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
        this.loadImages(this.IMAGES_THROWN);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.mirrored = mirrored;
        this.throwableObjects = throwableObjects;
        this.height = 400 / 6;
        this.width = 400 / 6;
        this.applyGravity();
        this.throw();
        this.animate();
    }

    throw() {
        if (this.mirrored && !this.bottleBroken) {
            this.speedY = 25;
            setInterval(() => {
                if (!this.bottleBroken) {
                    this.x += 6;
                }
                this.updateThrowable();
            }, 1000 / 60);
        }
        if (!this.mirrored && !this.bottleBroken) {
            this.speedY = 25;
            setInterval(() => {
                if (!this.bottleBroken) {
                    this.x += 6;
                }
                this.updateThrowable();
            }, 1000 / 60);
        }
    }

    animate() {
        this.breakAnimation();
        this.throwAnimation();
    }

    throwAnimation() {
        setInterval(() => {
            if (!this.bottleBroken) {
                this.playAnimation(this.IMAGES_THROWN);
            }
        }, 1000 / 10);
    }

    breakAnimation() {
        setInterval(() => {
            if (this.bottleBroken) {
                this.breakBottle();
            }
        }, 1000 / 3);
    }

    breakBottle() {
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
            this.throwableObjects.pop();
            this.breakStartTime = null;
        }
    }
    updateThrowable() {
        if (this.bottleBroken || this.throwableObjects[0] && this.throwableObjects[0].y > 418) {
            this.bottleBroken = true;
            this.breakBottle();
            this.speedY = 0;
            //console.log("Bottle removed")
            //this.throwableObjects.pop();
        }
    }
}