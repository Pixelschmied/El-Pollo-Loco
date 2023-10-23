class Cloud extends MoveableObject {

    y = 0;
    width = 1920 / 3;
    height = 1080 / 3;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500;
        this.y = Math.random() * 50;
        this.animate();
        this.speed = 0.1 + Math.random() * 0.5;
    }

    animate() {
            this.moveLeft();
        }
        
        

}