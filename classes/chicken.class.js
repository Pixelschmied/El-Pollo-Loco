class Chicken extends MoveableObject {
    y = 425
    width = 248 / 5
    height = 248 / 5

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')

        this.x = 250 + Math.random() * 500;
    }

}