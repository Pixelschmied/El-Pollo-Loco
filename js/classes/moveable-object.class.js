class MoveableObject extends DrawableObject {
    
    speed = 0.15;
    mirrored = false;
    speedY = 0;
    acceleration = 1.8;
    lastHit = 0;


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.speedY = 0;
                this.y = 240;
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

    isMoving() {
        return (this.world.keyboard.LEFT ||
                this.world.keyboard.RIGHT ||
                this.world.keyboard.UP ||
                this.world.keyboard.DOWN ||
                this.world.keyboard.E)
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    //isColliding(mo) {
    //    return this.x + this.width > mo.x &&
    //        this.y + this.height > mo.y &&
    //        this.x < mo.x &&
    //        this.y < mo.y + mo.height
    //}

    isColliding(mo) {
        let thisFrame = this.getObjectCollisionFrame(this);
        let otherFrame = mo.getObjectCollisionFrame(mo);
    
        return thisFrame.x < otherFrame.x + otherFrame.width &&
               thisFrame.x + thisFrame.width > otherFrame.x &&
               thisFrame.y < otherFrame.y + otherFrame.height &&
               thisFrame.y + thisFrame.height > otherFrame.y;
    }    

    hit() {
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