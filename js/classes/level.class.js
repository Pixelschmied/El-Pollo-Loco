class Level {
    enemies = [];
    clouds = [];
    bottles = [];
    backgroundObjects = [];
    level_end_x = 4200;

    constructor(chicken, chicks, bottles, clouds, backgroundObjects) {
        for (let i = 0; i < chicken; i++) {
            this.enemies.push(new Chicken());
        }
        for (let i = 0; i < chicks; i++) {
            this.enemies.push(new Chick());
        }
        this.enemies.push(new Endboss());
        for (let i = 0; i < bottles; i++) {
            this.bottles.push(new Bottle());
        }
        for (let i = 0; i < clouds; i++) {
            this.clouds.push(new Cloud());
        }
        this.backgroundObjects = backgroundObjects;
    }


}