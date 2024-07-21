/**
 * Class representing a level in the game.
 */
class Level {
    enemies = [];
    clouds = [];
    bottles = [];
    coins = [];
    backgroundObjects = [
        new BackgroundObject('assets/images/background/air.png', -959),
        new BackgroundObject('assets/images/background/thirdLayer2.png', -959),
        new BackgroundObject('assets/images/background/secondLayer2.png', -959),
        new BackgroundObject('assets/images/background/firstLayer2.png', -959),
        new BackgroundObject('assets/images/background/air.png', 0),
        new BackgroundObject('assets/images/background/thirdLayer1.png', 0),
        new BackgroundObject('assets/images/background/secondLayer1.png', 0),
        new BackgroundObject('assets/images/background/firstLayer1.png', 0),
        new BackgroundObject('assets/images/background/air.png', 959), 
        new BackgroundObject('assets/images/background/thirdLayer2.png', 959),
        new BackgroundObject('assets/images/background/secondLayer2.png', 959),
        new BackgroundObject('assets/images/background/firstLayer2.png', 959),
        new BackgroundObject('assets/images/background/air.png', 959 * 2), 
        new BackgroundObject('assets/images/background/thirdLayer1.png', 959 * 2),
        new BackgroundObject('assets/images/background/secondLayer1.png', 959 * 2),
        new BackgroundObject('assets/images/background/firstLayer1.png', 959 * 2),
        new BackgroundObject('assets/images/background/air.png', 959 * 3), 
        new BackgroundObject('assets/images/background/thirdLayer2.png', 959 * 3),
        new BackgroundObject('assets/images/background/secondLayer2.png', 959 * 3),
        new BackgroundObject('assets/images/background/firstLayer2.png', 959 * 3),
        new BackgroundObject('assets/images/background/air.png', 959 * 4), 
        new BackgroundObject('assets/images/background/thirdLayer1.png', 959 * 4),
        new BackgroundObject('assets/images/background/secondLayer1.png', 959 * 4),
        new BackgroundObject('assets/images/background/firstLayer1.png', 959 * 4)
    ];
    levelEndX = 4200;

    /**
     * Create a level.
     * @param {number} chicken - Number of chickens in the level.
     * @param {number} chicks - Number of chicks in the level.
     * @param {number} bottles - Number of bottles in the level.
     * @param {number} coins - Number of coins in the level.
     * @param {number} clouds - Number of clouds in the level.
     * @param {Endboss} endboss - The end boss of the level.
     */
    constructor(chicken, chicks, bottles, coins, clouds, endboss) {
        this.addEnemies(chicken, chicks, endboss);
        this.addBottles(bottles);
        this.addCoins(coins);
        this.addClouds(clouds);
    }

    /**
     * Add enemies to the level.
     * @param {number} chicken - Number of chickens.
     * @param {number} chicks - Number of chicks.
     * @param {Endboss} endboss - The end boss.
     */
    addEnemies(chicken, chicks, endboss) {
        for (let i = 0; i < chicken; i++) {
            this.enemies.push(new Chicken());
        }
        for (let i = 0; i < chicks; i++) {
            this.enemies.push(new Chick());
        }
        this.enemies.push(endboss);
    }

    /**
     * Add bottles to the level.
     * @param {number} bottles - Number of bottles.
     */
    addBottles(bottles) {
        for (let i = 0; i < bottles; i++) {
            this.bottles.push(new Bottle());
        }
    }

    /**
     * Add coins to the level.
     * @param {number} coins - Number of coins.
     */
    addCoins(coins) {
        for (let i = 0; i < coins; i++) {
            this.coins.push(new Coin());
        }
    }

    /**
     * Add clouds to the level.
     * @param {number} clouds - Number of clouds.
     */
    addClouds(clouds) {
        for (let i = 0; i < clouds; i++) {
            this.clouds.push(new Cloud());
        }
    }
}
