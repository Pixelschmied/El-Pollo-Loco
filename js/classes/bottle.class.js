class Bottle extends DrawableObject {
    y = 300;
    bottleIcons = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]

    constructor() {
        //super().loadImage(this.bottleIcons[Math.round(Math.random())]);
        super().loadImage(this.bottleIcons[0]);
        this.loadImages(this.bottleIcons);
        this.x = 250 + Math.round(Math.random() * 500);
        this.width = 57;
        this.height = 57;
        //this.img = this.bottleIcons[Math.round(Math.random())]
        console.log("Bottle created: ")
        console.log("X: ", this.x, ", Y: ", this.y, "Width: ", this.width, "Height: ", this.height)
        console.log("Image: ", this.img)
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}