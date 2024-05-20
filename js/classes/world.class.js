class World {
  character = new Character();
  //chicken, chicks, bottles, coins, clouds, endboss
  level = new Level(8, 5, 15, 8, 20, new Endboss(this.character));
  canvas;
  ctx;
  keyboard;
  cameraX = 0;
  characterHealthBar = new CharacterHealthBar();
  endbossHealthBar = new EndbossHealthBar();
  alertBorder = new AlertBorder();
  bottleCount = new BottleCounter();
  bottleCountDown = Date.now();
  coinCounter = new CoinCounter();
  throwableObjects = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
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
      this.removeOffScreenObjects();
    }, 1000 / 60);
  }

  checkThrowableObjects() {
    if (this.keyboard.E && DrawableObject.bottleCount > 0 && Date.now() - this.bottleCountDown > 1500) {
      let mirrored = this.character.mirrored;
      this.bottleCountDown = Date.now();
      this.character.resetIdleStartTime();
      let bottle = new ThrowableObject(this.character, this.character.x + this.character.width / 2, this.character.y + this.character.height / 2, mirrored, this.throwableObjects);
      this.throwableObjects.push(bottle);
      DrawableObject.bottleCount--;
    }
  }

  removeOffScreenObjects() {
    // Bereinige die Liste der Feinde
    this.level.enemies = this.level.enemies.filter(enemy => enemy.y <= 1000);
    
    // Bereinige die Liste der Wolken
    //this.level.clouds = this.level.clouds.filter(cloud => cloud.y <= 1000);
    //
    // Bereinige die Liste der Flaschen
    //this.level.bottles = this.level.bottles.filter(bottle => bottle.y <= 1000);
    //
    // Bereinige die Liste der Münzen
    //this.level.coins = this.level.coins.filter(coin => coin.y <= 1000);
  }

  checkCollisions() {
    // Character Collision with Enemies
    this.level.enemies.forEach((enemy) => {
      if ((this.character.isColliding(enemy) && !this.character.isFalling() && enemy.died == false && this.character.possibleHeadJump == false) || (this.character.isColliding(enemy) && enemy instanceof Endboss)) {
        this.character.hit();
      }
    });
    // Character Headjump Collision with Enemies
    this.level.enemies.forEach((enemy) => {
      if (!this.character.died && this.character.isColliding(enemy) && (enemy instanceof Chicken || enemy instanceof Chick) && enemy.died == false && this.character.possibleHeadJump == true) {
        this.character.isJumping = false;
        this.character.jump();
        enemy.died = true;
      }
    });
    // Throwable Collision with Enemies
    this.throwableObjects.forEach((throwableObject) => {
      this.level.enemies.forEach((enemy) => {
        if (throwableObject.isColliding(enemy) && !(enemy instanceof Endboss)) {
          throwableObject.bottleBroken = true;
          enemy.died = true;
        }
        if (throwableObject.isColliding(enemy) && enemy instanceof Endboss) {
          throwableObject.bottleBroken = true;
          enemy.endbossHit();
        }
      });
    });
    // Character Collision with Bottles
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        DrawableObject.bottleCount++;
        this.level.bottles.splice(index, 1);
      }
    });
    // Character Collision with Coins
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        DrawableObject.coinCount++;
        this.level.coins.splice(index, 1);
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.cameraX, 0);
    // Dynamic Objects
    this.addToMap(this.level.backgroundObjects);
    this.addToMap(this.level.clouds);
    this.addToMap(this.level.enemies);
    this.addToMap(this.level.bottles);
    this.addToMap(this.throwableObjects);
    this.addToMap(this.level.coins);
    this.drawToMap(this.character);
    this.ctx.translate(-this.cameraX, 0);

    // Static Objects
    this.drawToMap(this.alertBorder);
    this.drawToMap(this.characterHealthBar);
    this.drawToMap(this.endbossHealthBar);
    this.drawToMap(this.bottleCount);
    this.drawToMap(this.coinCounter);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addToMap(objects) {
    objects.forEach((o) => {
      this.drawToMap(o);
    });
  }

  drawToMap(mo) {
    if (mo.mirrored) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    //mo.drawFrame(this.ctx); // TODO: Frame Function (delete if not needed)
    //mo.debugText(this.ctx); // TODO: Debug Text Function (delete if not needed)
    //mo.drawXDot(this.ctx) // TODO: Dot Function (delete if not needed)

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
