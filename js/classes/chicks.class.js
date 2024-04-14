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

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0])
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 250 + Math.random() * 3800;
        this.animate();
        this.speed = 0.2 + Math.random() * 0.3;
    }

    animate() {
        setInterval(() => {
            if (!this.died) {
                this.randomMove();
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
                if (this.y < 600) {
                    this.y += 2;
                }
            }
        }, 1000 / 60);
    }


}