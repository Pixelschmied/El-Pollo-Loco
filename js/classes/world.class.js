class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    throwableObjects = [];
    lastFrameTime = 0; // Zeitpunkt des letzten Frames
    fpsArray = []; // Speichert die FPS-Werte für die Berechnung des Durchschnitts
    lastFpsUpdate = 0; // Zeitpunkt der letzten FPS-Aktualisierung
    fpsUpdateInterval = 500; // Intervall in Millisekunden für die Aktualisierung der FPS-Anzeige
    averageFps = 0;

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
        if (this.keyboard.E) {
            let mirrored = this.character.mirrored;
            let bottle = new ThrowableObject(this.character.x + (this.character.width / 2), this.character.y + (this.character.height / 2), mirrored)
            this.throwableObjects.push(bottle);
        }
    }

    checkCollisions() {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                        this.character.Hit();
                        this.statusBar.setPercentage(this.character.life);
                        console.log("Character Life: ", this.character.life);
                }
            })
    }

    draw() {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height); // Leert den Canvas

        this.ctx.translate(this.camera_x, 0); // translate(x, y) <- Verschiebt die Kamera auf 0,0
        // Dynamic Objects
        this.addToMap(this.level.backgroundObjects);    // Zeichnet die Hintergrundbilder
        this.addToMap(this.level.clouds);               // Zeichnet die Wolkenbilder
        this.addToMap(this.level.enemies);              // Zeichnet die Gegner
        this.addToMap(this.throwableObjects);           // Zeichnet die Werfbaren Gegenstände (Flaschen z.b.)
        this.drawToMap(this.character);                 // Zeichnet den Character

        this.ctx.translate(-this.camera_x, 0);          // Kamera wird zurück
        // Static Objects
        this.drawToMap(this.statusBar);

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