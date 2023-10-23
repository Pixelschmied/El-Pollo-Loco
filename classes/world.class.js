class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = [
        new Cloud(),
        new Cloud()
    ];
    backgroundObjects = [
        new BackgroundObject('img/5_background/layers/air.png'), // Sky Layer
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png'), // Third Layer
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png'), // Second Layer
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png') // First Layer
    ];

    canvas;
    ctx;
    keyboard;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);

        this.addToMap(this.backgroundObjects)
        this.addToMap(this.clouds)
        this.addToMap(this.enemies)
        this.drawToMap(this.character)

        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addToMap(objects) {
        objects.forEach(o => {
            this.drawToMap(o)
        })
    }

    drawToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height) 
    }
}