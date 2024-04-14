class CoinCounter extends DrawableObject {
    coinIcon = 'img/8_coin/coin_2.png';
    textX = 178;
    textY = 96;

    constructor() {
        super();
        this.loadImages(this.coinIcon);
        this.width = 300 / 2.2;
        this.height = 301 / 2.2;
        this.x = 80;
        this.y = 15;
        this.img = this.imageCache[this.coinIcon];
    }

    loadImages(path) {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.font = '40px boogaloo';
        const gradient = ctx.createLinearGradient(185, 70, 218, 95);
        gradient.addColorStop(0.15, 'yellow');
        gradient.addColorStop(0.75, 'orange');
        gradient.addColorStop(1.0, 'yellow');
        ctx.fillStyle = gradient;
        ctx.strokeStyle = 'black';
        ctx.fillText(this.coinCount, this.textX, this.textY);
        ctx.strokeText(this.coinCount, this.textX, this.textY);

    }
}