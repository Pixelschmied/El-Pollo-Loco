/**
 * Class representing the game world.
 */
class World {
  character = new Character();
  gameStarted = false;
  level = new Level(8, 5, 15, 8, 20, new Endboss(this.character));
  canvas;
  ctx;
  keyboard;
  cameraX = 0;
  characterHealthBar = new CharacterHealthBar();
  endbossHealthBar = new EndbossHealthBar();
  chickenDiesSound = new Audio('assets/audio/chickenDies.mp3');
  alertBorder = new AlertBorder();
  bottleCount = new BottleCounter();
  bottleCountDown = Date.now();
  lastBottleBroke = Date.now();
  bottlePickupSound = new Audio('assets/audio/bottle.mp3');
  coinCounter = new CoinCounter();
  coinPickupSound = new Audio('assets/audio/coin.mp3');
  throwableObjects = [];

  /**
   * Create a new game world.
   * @param {HTMLCanvasElement} canvas - The canvas element.
   * @param {Keyboard} keyboard - The keyboard input handler.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.update();
  }

  /**
   * Set the world for the character and enemies.
   */
  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach(enemy => {
      if (enemy instanceof Chicken || enemy instanceof Chick) {
        enemy.world = this;
      }
    });
  }

  /**
   * Update the game state.
   */
  update() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowableObjects();
      this.removeOffScreenObjects();
    }, 1000 / 60);
  }

  /**
   * Check and handle throwable objects.
   */
  checkThrowableObjects() {
    if (this.keyboard.e && DrawableObject.bottleCount > 0 && Date.now() - this.bottleCountDown > 1700) {
      this.bottleCountDown = Date.now();
      this.character.resetIdleStartTime();
      const bottle = new ThrowableObject(
        this.character,
        this.character.x + this.character.width / 2,
        this.character.y + this.character.height / 2,
        this.character.mirrored,
        this.throwableObjects
      );
      this.throwableObjects.push(bottle);
      DrawableObject.bottleCount--;
    }
  }

  /**
   * Remove objects that are off-screen.
   */
  removeOffScreenObjects() {
    this.level.enemies = this.level.enemies.filter(enemy => enemy.y <= 1000);
  }

  /**
   * Check for collisions between various objects.
   */
  checkCollisions() {
    this.checkCharacterEnemyCollisions();
    this.checkHeadJumpCollisions();
    this.checkBottleEnemyCollisions();
    this.checkCharacterBottleCollisions();
    this.checkCharacterCoinCollisions();
  }

  /**
   * Check collisions between the character and enemies.
   */
  checkCharacterEnemyCollisions() {
    this.level.enemies.forEach(enemy => {
      if ((this.character.isColliding(enemy) && !this.character.isFalling() && !enemy.died && !this.character.possibleHeadJump) || (this.character.isColliding(enemy) && enemy instanceof Endboss)) {
        this.character.hit();
      }
    });
  }

  /**
   * Check head jump collisions between the character and enemies.
   */
  checkHeadJumpCollisions() {
    this.level.enemies.forEach(enemy => {
      if (!this.character.died && this.character.isColliding(enemy) && (enemy instanceof Chicken || enemy instanceof Chick) && !enemy.died && this.character.possibleHeadJump) {
        this.playChickenDeadSound();
        this.character.isJumping = false;
        this.character.jump();
        enemy.died = true;
      }
    });
  }

  /**
   * Check collisions between bottles and enemies.
   */
  checkBottleEnemyCollisions() {
    this.throwableObjects.forEach(throwableObject => {
      this.level.enemies.forEach(enemy => {
        if (throwableObject.isColliding(enemy) && !(enemy instanceof Endboss)) {
          this.handleBottleCollisionWithEnemy(throwableObject, enemy);
        }
        if (throwableObject.isColliding(enemy) && enemy instanceof Endboss) {
          this.handleBottleCollisionWithEndboss(throwableObject, enemy);
        }
      });
    });
  }

  /**
   * Handle collision between a bottle and an enemy.
   * @param {ThrowableObject} throwableObject - The throwable object.
   * @param {MoveableObject} enemy - The enemy.
   */
  handleBottleCollisionWithEnemy(throwableObject, enemy) {
    if (this.lastBottleBroke < (Date.now() - 1000)) {
      this.lastBottleBroke = Date.now();
      this.playChickenDeadSound();
    }
    throwableObject.bottleBroken = true;
    enemy.died = true;
  }

  /**
   * Handle collision between a bottle and the end boss.
   * @param {ThrowableObject} throwableObject - The throwable object.
   * @param {Endboss} enemy - The end boss.
   */
  handleBottleCollisionWithEndboss(throwableObject, enemy) {
    if (this.lastBottleBroke < (Date.now() - 1000)) {
      this.lastBottleBroke = Date.now();
    }
    throwableObject.bottleBroken = true;
    enemy.endbossHit();
  }

  /**
   * Check collisions between the character and bottles.
   */
  checkCharacterBottleCollisions() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.playCollectBottleSound();
        DrawableObject.bottleCount++;
        this.level.bottles.splice(index, 1);
      }
    });
  }

  /**
   * Check collisions between the character and coins.
   */
  checkCharacterCoinCollisions() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.playCollectCoinSound();
        DrawableObject.coinCount++;
        this.level.coins.splice(index, 1);
      }
    });
  }

  /**
   * Kill all enemies in the level.
   */
  killAllEnemies() {
    this.level.enemies.forEach(enemy => {
      enemy.died = true;
    });
  }

  /**
   * Draw the game world.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.cameraX, 0);

    this.addToMap(this.level.backgroundObjects);
    this.addToMap(this.level.clouds);
    this.addToMap(this.level.enemies);
    this.addToMap(this.level.bottles);
    this.addToMap(this.throwableObjects);
    this.addToMap(this.level.coins);
    this.drawToMap(this.character);

    this.ctx.translate(-this.cameraX, 0);

    this.drawToMap(this.alertBorder);
    this.drawToMap(this.characterHealthBar);
    this.drawToMap(this.endbossHealthBar);
    this.drawToMap(this.bottleCount);
    this.drawToMap(this.coinCounter);

    requestAnimationFrame(() => this.draw());
  }

  /**
   * Add objects to the map.
   * @param {MoveableObject[]} objects - The objects to add.
   */
  addToMap(objects) {
    objects.forEach(o => this.drawToMap(o));
  }

  /**
   * Draw a moveable object to the map.
   * @param {MoveableObject} mo - The moveable object to draw.
   */
  drawToMap(mo) {
    if (mo.mirrored) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);

    if (mo.mirrored) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flip the image horizontally.
   * @param {MoveableObject} mo - The moveable object to flip.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Flip the image back to its original state.
   * @param {MoveableObject} mo - The moveable object to flip back.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
   * Play the chicken dead sound.
   */
  playChickenDeadSound() {
    if (!soundMuted) {
      this.chickenDiesSound.currentTime = 0;
      this.chickenDiesSound.play();
    }
  }

  /**
   * Play the collect bottle sound.
   */
  playCollectBottleSound() {
    if (!soundMuted) {
      this.bottlePickupSound.currentTime = 0;
      this.bottlePickupSound.play();
    }
  }

  /**
   * Play the bottle collision sound.
   */
  playBottleCollisionSound() {
    if (!soundMuted) {
      this.bottleBreakSound.currentTime = 0;
      this.bottleBreakSound.play();
    }
  }

  /**
   * Play the collect coin sound.
   */
  playCollectCoinSound() {
    if (!soundMuted) {
      this.coinPickupSound.currentTime = 0;
      this.coinPickupSound.play();
    }
  }
}
