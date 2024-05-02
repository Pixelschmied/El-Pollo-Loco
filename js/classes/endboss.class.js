class Endboss extends MoveableObject {
    y = 245
    width = 1045 / 5
    height = 1217 / 5
    static life = 5;
    enraged = false;
    character;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_IDLE = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png'
    ]

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ]
    constructor(character) {
        super().loadImage(this.IMAGES_WALKING[0])
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_ALERT);
        this.x = 3800;
        this.character = character;
        this.animate();
        this.enrageCheck();
        this.speed = 2;
    }

    animate() {
        setInterval(() => {
            if(this.enraged && this.character.x < this.x) {
                this.moveLeft();
            }
            if (this.enraged && this.character.x > this.x) {
                this.moveRight();
            }
        }, 1000 / 60)


        setInterval(() => {
            this.playAnimation(this.IMAGES_IDLE);
        }, 1000 / 1)
    }

    enrageCheck() {
        setInterval(() => {
            if (this.character.x > 3200) {
                this.enraged = true;
                console.log("ENRAGED!");
            }
        }, 1000 / 10)    
    }
}