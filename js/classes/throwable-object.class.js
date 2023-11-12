class ThrowableObject extends MoveableObject {

    IMAGES_THROWN = [
        "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png"
    ]

    constructor(x, y, mirrored) {
        super().loadImage("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
        this.loadImages(this.IMAGES_THROWN);
        this.x = x;
        this.y = y;
        this.mirrored = mirrored;
        this.height = 400 / 6;
        this.width = 400 / 6;
        this.applyGravity();
        this.throw();
        this.animate();
    }

    throw() {
        if (this.mirrored) {
            this.speedY = 25;
            setInterval(() => {
                this.x -= 7.5;
            }, 1000 / 60);
        }
        if (!this.mirrored) {
            this.speedY = 25;
            setInterval(() => {
                this.x += 7.5;
            }, 1000 / 60);
        }
    }

    animate() {
        this.rotateAnimation();
    }

    rotateAnimation() {
        setInterval(() => {
                this.playAnimation(this.IMAGES_THROWN);
        }, 1000 / 10);
    }

}