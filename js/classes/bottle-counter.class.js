class BottleCounter extends DrawableObject {

    bottleIcon = 'img/6_salsa_bottle/salsa_bottle.png';
    textX = 75;
    textY = 96;

    constructor() {
        super().loadImage(this.bottleIcon);
        this.loadImages(this.bottleIcon);
        this.width = 400 / 7;
        this.height = 400 / 7;
        this.x = 30;
        this.y = 54;
        this.img = this.imageCache[this.bottleIcon];
    }

    loadImages(path) {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.font = '40px boogaloo';
        const gradient = ctx.createLinearGradient(76, 70, 108, 95);
        gradient.addColorStop(0.15, 'yellow');
        gradient.addColorStop(0.75, 'orange');
        gradient.addColorStop(1.0, 'yellow');
        ctx.fillStyle = gradient;
        ctx.strokeStyle = 'black';
        ctx.fillText(this.bottleCount, this.textX, this.textY);
        ctx.strokeText(this.bottleCount, this.textX, this.textY);
    }

}