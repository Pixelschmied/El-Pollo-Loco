class Level {
    enemies = [];
    clouds = [];
    bottles = [];
    coins = [];
    backgroundObjects = [
        new BackgroundObject('img/5_background/layers/air.png', -959), // Sky Layer
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -959), // Third Layer
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -959), // Second Layer
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -959), // First Layer
        new BackgroundObject('img/5_background/layers/air.png', 0), // Sky Layer
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0), // Third Layer
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0), // Second Layer
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0), // First Layer
        new BackgroundObject('img/5_background/layers/air.png', 959), // Sky Layer
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 959), // Third Layer
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 959), // Second Layer
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 959), // First Layer
        new BackgroundObject('img/5_background/layers/air.png', 959 * 2), // Sky Layer
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 959 * 2), // Third Layer
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 959 * 2), // Second Layer
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 959 * 2), // First Layer
        new BackgroundObject('img/5_background/layers/air.png', 959 * 3), // Sky Layer
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 959 * 3), // Third Layer
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 959 * 3), // Second Layer
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 959 * 3), // First Layer
        new BackgroundObject('img/5_background/layers/air.png', 959 * 4), // Sky Layer
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 959 * 4), // Third Layer
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 959 * 4), // Second Layer
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 959 * 4), // First Layer
    ];
    level_end_x = 4200;

    constructor(chicken, chicks, bottles, coins, clouds, endboss) {
        for (let i = 0; i < chicken; i++) {
            this.enemies.push(new Chicken());
        }
        for (let i = 0; i < chicks; i++) {
            this.enemies.push(new Chick());
        }
        this.enemies.push(endboss);
        for (let i = 0; i < bottles; i++) {
            this.bottles.push(new Bottle());
        }
        for (let i = 0; i < coins; i++) {
            this.coins.push(new Coin());
        }
        for (let i = 0; i < clouds; i++) {
            this.clouds.push(new Cloud());
        }
    }


}