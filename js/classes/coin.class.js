/**
 * Class representing a coin.
 * @extends MoveableObject
 */
class Coin extends MoveableObject {
    y = 200;
    coinIcons = [
        'assets/images/coin/coin1.png',
        'assets/images/coin/coin1.png',
        'assets/images/coin/coin1.png',
        'assets/images/coin/coin1.png',
        'assets/images/coin/coin1.png',
        'assets/images/coin/coin2.png',
        'assets/images/coin/coin3.png',
        'assets/images/coin/coin4.png',
        'assets/images/coin/coin5.png',
        'assets/images/coin/coin6.png',
        'assets/images/coin/coin7.png',
        'assets/images/coin/coin8.png',
        'assets/images/coin/coin9.png',
        'assets/images/coin/coin10.png',
        'assets/images/coin/coin10.png',
        'assets/images/coin/coin9.png',
        'assets/images/coin/coin8.png',
        'assets/images/coin/coin7.png',
        'assets/images/coin/coin6.png',
        'assets/images/coin/coin5.png',
        'assets/images/coin/coin4.png',
        'assets/images/coin/coin3.png',
        'assets/images/coin/coin2.png'
    ];

    coinLocations = [
        400, 500, 600, 1000, 1100, 1200, 1800, 1900, 2000, 2100, 3000, 3100, 3200
    ];

    /**
     * Create a coin.
     */
    constructor() {
        super().loadImage(this.coinIcons[0]);
        this.loadImages(this.coinIcons);
        this.x = this.getCoinX();
        this.width = 175;
        this.height = 175;
        this.animate();
    }

    /**
     * Get the x-coordinate for the coin.
     * @returns {number} The x-coordinate.
     */
    getCoinX() {
        DrawableObject.coinsPlaced++;
        return this.coinLocations[DrawableObject.coinsPlaced - 1];
    }

    /**
     * Animate the coin by playing its animation.
     */
    animate() {
        setInterval(() => this.playAnimation(this.coinIcons), 1000 / 12);
    }
}
