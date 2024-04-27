class CharacterHealthBar extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.width = 595 / 3;
        this.height = 158 / 3;
        this.x = 30;
        this.y = 0;
        this.img = this.imageCache[this.IMAGES[Character.life]]
        this.update();
    }

    update() {
        setInterval(() => {
        this.img = this.imageCache[this.IMAGES[Character.life]];
        }, 1000 / 30);
    }
}