class Cloud extends MoveableObject {

    y = 0;
    width = 500;
    height = 500;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png')

        this.x = Math.random() * 500;
    }
}