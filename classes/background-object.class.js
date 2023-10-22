class BackgroundObject extends MoveableObject {
    height = 500
    width = 1000

    constructor(imagePath, x, y) {
        super().loadImage(imagePath)
        this.x = x
        this.y = y
    }

}