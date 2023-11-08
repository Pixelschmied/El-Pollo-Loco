class MoveableObject extends DrawableObject {
    
    speed = 0.15;
    mirrored = false;
    speedY = 0;
    acceleration = 1.8;
    lastHit = 0;

    //applyGravity() {
    //    setInterval(() => {
    //        if (this.isAboveGround() || this.speedY > 0) {
    //            this.y -= this.speedY;
    //            this.speedY -= this.acceleration;
    //        }
    //    }, 1000 / 25);
    //}

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                // Wenn der Charakter den Boden erreicht, setzen Sie die Geschwindigkeit auf 0 und korrigieren Sie die Y-Position
                this.speedY = 0;
                this.y = 240; // Stellen Sie sicher, dass dies die korrekte Bodenhöhe ist
            }
        }, 1000 / 30);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
          return true;
        } else {
          return this.y < 240;
        }
      }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
    }

    Hit() {
        this.life -= 1;
        if (this.life < 0) {
            this.life = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timeSinceLastHit = new Date().getTime() - this.lastHit;
        return timeSinceLastHit < 1500;
    }
    isDead() {
        return this.life == 0;
    }    

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }
    
    jump() {
        this.speedY = 20;
    }
}