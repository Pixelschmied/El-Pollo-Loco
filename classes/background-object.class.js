class BackgroundObject extends MoveableObject {
    height = 540
    width = 960

    constructor(imagePath, x) {
        super().loadImage(imagePath)
        this.x = x;
        this.y = canvasHeight - this.height;
    }

}