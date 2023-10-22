class BackgroundObject extends MoveableObject {
    height = 540
    width = 960

    constructor(imagePath) {
        super().loadImage(imagePath)
        this.x = canvasWidth - this.width;
        this.y = canvasHeight - this.height;
    }

}