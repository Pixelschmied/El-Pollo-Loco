class Endboss extends MoveableObject {
    y = 245
    width = 1045 / 5
    height = 1217 / 5
    static life = 5;
    static x;
    enraged = false;
    attacking = false;
    bossStartPosition = 3800;
    character;
    died = false;
    bossUpForce = 0;
    deadAnimationIndex = 0;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        "img/4_enemie_boss_chicken/3_attack/G13.png",
        "img/4_enemie_boss_chicken/3_attack/G17.png",
        "img/4_enemie_boss_chicken/3_attack/G18.png",
        "img/4_enemie_boss_chicken/3_attack/G19.png",
        "img/4_enemie_boss_chicken/3_attack/G20.png"
    ];

    IMAGES_HURT = [
        "img/4_enemie_boss_chicken/4_hurt/G21.png",
        "img/4_enemie_boss_chicken/4_hurt/G22.png",
        "img/4_enemie_boss_chicken/4_hurt/G23.png"
    ];

    IMAGES_DEAD = [
        "img/4_enemie_boss_chicken/5_dead/G24.png",
        "img/4_enemie_boss_chicken/5_dead/G25.png",
        "img/4_enemie_boss_chicken/5_dead/G26.png",
        "img/4_enemie_boss_chicken/5_dead/G26.png",
        "img/4_enemie_boss_chicken/5_dead/G26.png",
        "img/4_enemie_boss_chicken/5_dead/G26.png",
        "img/4_enemie_boss_chicken/5_dead/G26.png",
        "img/4_enemie_boss_chicken/5_dead/G26.png"
    ]

    constructor(character) {
        super().loadImage(this.IMAGES_WALKING[0])
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = this.bossStartPosition;
        this.character = character;
        this.animate();
        this.enrageCheck();
        this.applyGravity();
        this.speed = 2;
    }

    animate() {
        setInterval(() => {
            if(this.enraged && this.character.x < this.x && !this.attacking && !this.died) {
                this.mirrored = false;
                this.moveLeft();
            }
            if (this.enraged && this.character.x > this.x && !this.attacking && !this.died) {
                this.mirrored = true;
                this.moveRight();
            }
        }, 1000 / 60)


        setInterval(() => {
            if (Endboss.life <= 0 && !this.died) {
                this.upForce = 17;
                if (!this.died) {
                    this.died = true;
                }
            }
            if (this.died) { //Bilder im Photoshop erstellen für Todesanimation
                this.playAnimation(this.IMAGES_DEAD);
            }
            if (Endboss.life >= 1 && this.endbossIsHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }
            if (!this.endbossIsHurt() && this.enraged && !this.attacking && !this.died) {
                this.playAnimation(this.IMAGES_WALKING);
            }
            if (!this.endbossIsHurt() && !this.enraged && !this.attacking && !this.died) {
                this.playAnimation(this.IMAGES_ALERT);
            }
            // CHICKEN FOLLOWS PLAYER TO THE RIGHT
            if ((this.x - this.character.x) < 40 && this.x <= this.character.x && !this.died) {
                this.attacking = false;
            }
            // CHICKEN FOLLOWS PLAYER TO THE LEFT
            if ((this.character.x - this.x) < 20 && this.x >= this.character.x && !this.died) {
                this.attacking = false;
            }
            // CHICKEN STOPS LEFT MOVEMENT FOR ATTACK
            if ((this.x - this.character.x) < 50 && this.x > this.character.x && !this.died){
                this.mirrored = false;
                this.attacking = true;
                this.playAnimation(this.IMAGES_ATTACK);
            }
            // CHICKEN STOPS RIGHT MOVEMENT FOR ATTACK
            if ((this.character.x - this.x) < 150 && this.x < this.character.x) {
                this.mirrored = true;
                this.attacking = true;
                this.playAnimation(this.IMAGES_ATTACK);
            }
        }, 1000 / 4)
    }

    enrageCheck() {
        setInterval(() => {
            if (this.character.x > (this.bossStartPosition - 600) && !this.enraged) {
                this.enraged = true;
            }
        }, 1000 / 10)    
    }


    endbossDeadAnimation() {
        setInterval(() => {
            if (this.deadAnimationIndex < 2) {
                console.log("Index: " + this.deadAnimationIndex);
                this.img = this.IMAGES_DEAD[this.deadAnimationIndex];
                this.deadAnimationIndex++;
            }
            if (this.deadAnimationIndex >= 2) {
                this.img = this.imageCache[this.IMAGES_DEAD[2]];
            }
        }, 1000 / 5);
    }

}