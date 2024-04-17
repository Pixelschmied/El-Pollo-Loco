class Bottle extends DrawableObject {
    y = 425;
    bottleIcons = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]

    constructor() {
        super().loadImage(this.bottleIcons[Math.round(Math.random())]);
        this.loadImages(this.bottleIcons);
        this.x = this.getBottleX();
        this.width = 57;
        this.height = 57;
    }

    getBottleX() {
        DrawableObject.lastBottleLocation += 100 + (Math.round(Math.random() * 300));
        return DrawableObject.lastBottleLocation;
    }
}