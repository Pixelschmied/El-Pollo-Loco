class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    bottleCount = new BottleCounter();
    coinCounter = new CoinCounter();
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas; // Speichert den von der init() übergebenen Canvas in der lokalen Variable
        this.keyboard = keyboard; // Speichert das von der init() übergebenen Keyboard in der lokalen Variable
        this.draw();
        this.setWorld();
        this.update();
    }

    setWorld() {
        this.character.world = this;
    }

    update() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowableObjects();
        }, 1000 / 60);
    }

    checkThrowableObjects() {
        if (this.keyboard.E && this.throwableObjects.length < 1) {
            let mirrored = this.character.mirrored;
            let bottle = new ThrowableObject(this.character.x + (this.character.width / 2), this.character.y + (this.character.height / 2), mirrored, this.throwableObjects)
            this.throwableObjects.push(bottle);
        }
    }

    checkCollisions() {
        // Character Collision with Enemies
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.life);
                console.log("Character Life: ", this.character.life);
            }
        });
        // Throwable Collision with Enemies
        this.throwableObjects.forEach((throwableObject) => {
            this.level.enemies.forEach((enemy) => {
                if (throwableObject.isColliding(enemy)) {
                    throwableObject.bottleBroken = true;
                }
            });
        });
    }

    draw() {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        // Dynamic Objects
        this.addToMap(this.level.backgroundObjects);
        this.addToMap(this.level.clouds);
        this.addToMap(this.level.enemies);
        this.addToMap(this.throwableObjects);
        this.drawToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);

        // Static Objects
        this.drawToMap(this.statusBar);
        this.drawToMap(this.bottleCount);
        this.drawToMap(this.coinCounter);
        let self = this;
        requestAnimationFrame(function() {self.draw();});
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
        //mo.drawFrame(this.ctx) // TODO: Frame Function (delete if not needed)

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