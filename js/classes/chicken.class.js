class Chicken extends MoveableObject {
    y = 425
    width = 248 / 5
    height = 248 / 5
    IMAGES_WALKING = [
        "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
    ];
    IMAGES_DEAD = [
        "img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
    ];

    constructor() {
        super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png")
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 250 + Math.random() * 500;
        this.animate();
        this.speed = 0.2 + Math.random() * 0.3;
    }

    animate() {
            setInterval(() => {
                if (!this.died) {
                    this.moveLeft();
                }
            }, 1000 / 60);

            setInterval(() => {
                if (!this.died) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }, 1000 / 5)

            setInterval(() => {
                if (this.died) {
                    this.loadImage("img/3_enemies_chicken/chicken_normal/2_dead/dead.png");
                    this.y += 2;
                }
            }, 1000 / 60);
    }


}