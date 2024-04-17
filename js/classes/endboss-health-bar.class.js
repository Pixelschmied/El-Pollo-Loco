class EndbossHealthBar extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/statusbar-boss/statusbar_boss_00.png',
        'img/7_statusbars/2_statusbar_endboss/statusbar-boss/statusbar_boss_20.png',
        'img/7_statusbars/2_statusbar_endboss/statusbar-boss/statusbar_boss_40.png',
        'img/7_statusbars/2_statusbar_endboss/statusbar-boss/statusbar_boss_60.png',
        'img/7_statusbars/2_statusbar_endboss/statusbar-boss/statusbar_boss_80.png',
        'img/7_statusbars/2_statusbar_endboss/statusbar-boss/statusbar_boss_100.png'
    ]


    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.width = 595 / 3;
        this.height = 127 / 3;
        this.x = 730;
        this.y = 13;
        this.img = this.imageCache[this.IMAGES[Endboss.life]];
    }
}