class Bottle extends DrawableObject {
    y = 150;
    bottleIcons = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]

    constructor() {
        //super().loadImage(this.bottleIcons[Math.round(Math.random())]);
        super().loadImage(this.bottleIcons[0]);
        this.loadImages(this.bottleIcons);
        this.x = 250// + Math.random() * 3800;
        this.width = 400 / 7;
        this.height = 400 / 7;
        this.img = this.bottleIcons[Math.round(Math.random())]
    }

    //draw(ctx) {
    //    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    //}
}