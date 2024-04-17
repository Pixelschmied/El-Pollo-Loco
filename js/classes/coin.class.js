class Coin extends MoveableObject {
    y = 200;
    coinIcons = [
        'img/8_coin/rotate/coin_1.png',
        'img/8_coin/rotate/coin_1.png',
        'img/8_coin/rotate/coin_1.png',
        'img/8_coin/rotate/coin_1.png',
        'img/8_coin/rotate/coin_1.png',
        'img/8_coin/rotate/coin_2.png',
        'img/8_coin/rotate/coin_3.png',
        'img/8_coin/rotate/coin_4.png',
        'img/8_coin/rotate/coin_5.png',
        'img/8_coin/rotate/coin_6.png',
        'img/8_coin/rotate/coin_7.png',
        'img/8_coin/rotate/coin_8.png',
        'img/8_coin/rotate/coin_9.png',
        'img/8_coin/rotate/coin_10.png',
        //'img/8_coin/rotate/coin_11.png',
        'img/8_coin/rotate/coin_10.png',
        'img/8_coin/rotate/coin_9.png',
        'img/8_coin/rotate/coin_8.png',
        'img/8_coin/rotate/coin_7.png',
        'img/8_coin/rotate/coin_6.png',
        'img/8_coin/rotate/coin_5.png',
        'img/8_coin/rotate/coin_4.png',
        'img/8_coin/rotate/coin_3.png',
        'img/8_coin/rotate/coin_2.png',
    ]

    coinLocations = [
        400, 500, 600, 1000, 1100, 1200, 1800, 1900, 2000, 2100, 3000, 3100, 3200
    ]

    constructor() {
        super().loadImage(this.coinIcons[0]);
        this.loadImages(this.coinIcons);
        this.x = this.getCoinX();
        this.width = 175;
        this.height = 175;
        this.animate();
    }

    getCoinX() {
        for (let i = 0; i < this.coinLocations.length; i++) {
                DrawableObject.coinsPlaced++;           
                return this.coinLocations[DrawableObject.coinsPlaced - 1];
        }
    }

    animate() {
        setInterval(() => {
                this.playAnimation(this.coinIcons);
        }, 1000 / 12)
    }
}