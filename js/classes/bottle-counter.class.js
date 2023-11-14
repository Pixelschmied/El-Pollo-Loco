class BottleCounter extends DrawableObject {

    bottleIcon = "img/6_salsa_bottle/salsa_bottle.png";
    bottleCount = 0;

    constructor() {
        super();
        this.loadImages(this.bottleIcon);
        this.width = 400 / 7;
        this.height = 400 / 7;
        this.x = 30;
        this.y = 50;
        this.img = this.imageCache[this.bottleIcon];
    }

    loadImages(path) {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
    }

}