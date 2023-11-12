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
    broken = false;
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
        if (this.mirrored && !this.broken) {
            this.speedY = 25;
            setInterval(() => {
                this.x -= 6;
                this.removeThrowable();
            }, 1000 / 60);
        }
        if (!this.mirrored && !this.broken) {
            this.speedY = 25;
            setInterval(() => {
                this.x += 6;
                this.removeThrowable();
            }, 1000 / 60);
        }
    }

    animate() {
        this.rotateAnimation();
        this.splashAnimation();
    }

    rotateAnimation() {
        if (!this.broken) {
            setInterval(() => {
                this.playAnimation(this.IMAGES_THROWN);
        }, 1000 / 10);
        }
    }

    splashAnimation() {
        if (this.broken) {
            setInterval(() => {
                this.playAnimation(this.IMAGES_SPLASH);
            }, 1000 / 10); 
        }
    }

    removeThrowable() {
        if (this.throwableObjects[0] && this.throwableObjects[0].y > 450) {
            this.breakBottle();
            //console.log("Bottle removed")
            //this.throwableObjects.pop();
        }
    }

    breakBottle() {
        this.broken = true;
        this.breakStartTime = Date.now();
        const breakDuration = 1000;
        const elapsedTime = Date.now() - this.breakStartTime;
        if (elapsedTime > breakDuration) {
        }
        console.log("Bottle broke!")
    }

}