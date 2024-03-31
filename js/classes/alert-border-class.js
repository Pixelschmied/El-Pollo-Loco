class AlertBorder extends MoveableObject {

    IMAGES = [
        "img/10_hurt_border/HurtBorder000.png",
        "img/10_hurt_border/HurtBorder010.png",
        "img/10_hurt_border/HurtBorder020.png",
        "img/10_hurt_border/HurtBorder030.png",
        "img/10_hurt_border/HurtBorder040.png",
        "img/10_hurt_border/HurtBorder050.png",
        "img/10_hurt_border/HurtBorder060.png",
        "img/10_hurt_border/HurtBorder070.png",
        "img/10_hurt_border/HurtBorder080.png",
        "img/10_hurt_border/HurtBorder090.png",
        "img/10_hurt_border/HurtBorder100.png",
        "img/10_hurt_border/HurtBorder090.png",
        "img/10_hurt_border/HurtBorder080.png",
        "img/10_hurt_border/HurtBorder070.png",
        "img/10_hurt_border/HurtBorder060.png",
        "img/10_hurt_border/HurtBorder050.png",
        "img/10_hurt_border/HurtBorder040.png",
        "img/10_hurt_border/HurtBorder030.png",
        "img/10_hurt_border/HurtBorder020.png",
        "img/10_hurt_border/HurtBorder010.png",
        "img/10_hurt_border/HurtBorder000.png"
    ];


    constructor() {
        super().loadImage("img/10_hurt_border/HurtBorder000.png");
        this.loadImages(this.IMAGES);
        this.width = 960;;
        this.height = 540;
        this.x = 0;
        this.y = 0;
        this.hurtAlert();
    }

    hurtAlert() {
        setInterval(() => {
            if (world.character.isHurt()) {
                this.playAnimation(this.IMAGES);
            } else {
                this.setImage("img/10_hurt_border/HurtBorder000.png");
            }
        }, 1000 / 20);
    }

}