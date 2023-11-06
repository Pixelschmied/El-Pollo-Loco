class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                        this.character.Hit();
                        console.log("Colliosion! Character Life: ", this.character.life)
                }
            })
        }, 1000 / 60);
    }

    draw() {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.level.backgroundObjects);
        this.addToMap(this.statusBar);
        this.addToMap(this.level.clouds);
        this.addToMap(this.level.enemies);
        this.drawToMap(this.character);

        this.ctx.translate(-this.camera_x, 0)

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
        if (mo.mirrored) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx)
        mo.drawFrame(this.ctx)

        if (mo.mirrored) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}