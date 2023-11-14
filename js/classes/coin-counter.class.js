class CoinCounter extends DrawableObject {
    bottleIcon = "img/8_coin/coin_2.png";
    bottleCount = 0;

    constructor() {
        super();
        this.loadImages(this.bottleIcon);
        this.width = 300 / 2.2;
        this.height = 301 / 2.2;
        this.x = 80;
        this.y = 13;
        this.img = this.imageCache[this.bottleIcon];
    }

    loadImages(path) {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
    }
}