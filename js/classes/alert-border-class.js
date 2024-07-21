/**
 * Class representing an alert border.
 * @extends MoveableObject
 */
class AlertBorder extends MoveableObject {
    images = [
        'assets/images/hud/hurtBorder/hurtBorder000.png',
        'assets/images/hud/hurtBorder/hurtBorder010.png',
        'assets/images/hud/hurtBorder/hurtBorder020.png',
        'assets/images/hud/hurtBorder/hurtBorder030.png',
        'assets/images/hud/hurtBorder/hurtBorder040.png',
        'assets/images/hud/hurtBorder/hurtBorder050.png',
        'assets/images/hud/hurtBorder/hurtBorder060.png',
        'assets/images/hud/hurtBorder/hurtBorder070.png',
        'assets/images/hud/hurtBorder/hurtBorder080.png',
        'assets/images/hud/hurtBorder/hurtBorder090.png',
        'assets/images/hud/hurtBorder/hurtBorder100.png',
        'assets/images/hud/hurtBorder/hurtBorder090.png',
        'assets/images/hud/hurtBorder/hurtBorder080.png',
        'assets/images/hud/hurtBorder/hurtBorder070.png',
        'assets/images/hud/hurtBorder/hurtBorder060.png',
        'assets/images/hud/hurtBorder/hurtBorder050.png',
        'assets/images/hud/hurtBorder/hurtBorder040.png',
        'assets/images/hud/hurtBorder/hurtBorder030.png',
        'assets/images/hud/hurtBorder/hurtBorder020.png',
        'assets/images/hud/hurtBorder/hurtBorder010.png',
        'assets/images/hud/hurtBorder/hurtBorder000.png'
    ];

    /**
     * Create an alert border.
     */
    constructor() {
        super().loadImage(this.images[0]);
        this.loadImages(this.images);
        this.width = 960;
        this.height = 540;
        this.x = 0;
        this.y = 0;
        this.startHurtAlert();
    }

    /**
     * Start the hurt alert interval.
     */
    startHurtAlert() {
        setInterval(() => this.updateHurtAlert(), 1000 / 20);
    }

    /**
     * Update the hurt alert state.
     */
    updateHurtAlert() {
        if (world.character.isHurt()) {
            this.playAnimation(this.images);
        } else {
            this.setImage(this.images[0]);
        }
    }
}
