class Chick extends MoveableObject {
    y = 425
    width = 248 / 5
    height = 248 / 5
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    ];
    timeTillDirectionChange = Math.random() * 10000;
    lastJump = Date.now();
    groundLevel = 425;

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0])
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 250 + Math.random() * 3800;
        this.animate();
        this.speed = 0.2 + Math.random() * 0.3;
        this.applyGravity();
        this.deleteAfterDead();
    }

    animate() {
        setInterval(() => {
            if (!this.died) {
                this.randomMove();
                this.randomJump();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.died) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 1000 / 5)

        setInterval(() => {
            if (this.died) {
                this.loadImage(this.IMAGES_DEAD[0]);
            }
        }, 1000 / 60);
    }

    randomJump() {
        if (Math.random() < 0.01 && Date.now() - this.lastJump > 3000) {
            this.lastJump = Date.now();
            this.upForce = 17;
        }
    }

    applyGravity() {
        setInterval(() => {
            if (this.y < 425 || this.upForce > 0) {
                this.y -= this.upForce;
                this.upForce -= this.gravity;
                if (this.y >= this.groundLevel && !this.died) {
                    this.y = this.groundLevel;
                    this.upForce = 0;
                }
            } else if (this.died) {
                this.y -= this.upForce;
                this.upForce -= this.gravity;
            }
        }, 1000 / 30);
    }

    deleteAfterDead() {
        setInterval(() => {
            if (this.died && this.y > 1000) {
                delete this;
            }
        }, 1000);
    }
}