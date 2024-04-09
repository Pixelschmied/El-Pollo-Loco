class MoveableObject extends DrawableObject {
    
    speed = 0.15;
    mirrored = false;
    upForce = 0;
    gravity = 1.8;
    lastHit = 0;
    groundLevel = 240;
    possibleHeadJump = false;
    died = false;

    jump() {
        this.upForce = 20;
    }


    applyGravity() {
        setInterval(() => {
            if (!this.isFalling() && !this.isAboveGround() && !this.died) {
                this.possibleHeadJump = false;
            }
            if (this.isFalling()) {
                this.possibleHeadJump = true;
            }
            if (this.isAboveGround() || this.upForce > 0) {
                this.y -= this.upForce;
                this.upForce -= this.gravity;
                if (this.y >= this.groundLevel && this instanceof Character && !this.died) {
                    this.y = this.groundLevel;
                    this.upForce = 0;
                }
            } else if (this.died) {
                this.y -= this.upForce;
                this.upForce -= this.gravity;
            }
        }, 1000 / 30);
    }
    
    
    

    isFalling() {
        return this.upForce <= 0 && this.y < this.groundLevel;
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

    isColliding(mo) {
        let thisFrame = this.getObjectCollisionFrame(this);
        let otherFrame = mo.getObjectCollisionFrame(mo);
    
        return  thisFrame.x < otherFrame.x + otherFrame.width && thisFrame.x + thisFrame.width > otherFrame.x &&
                thisFrame.y < otherFrame.y + otherFrame.height && thisFrame.y + thisFrame.height > otherFrame.y;
    }    

    isHeadjumping(mo) {
        if (mo instanceof Chicken) {
            let thisFrame = this.getObjectHeadjumpCollisionFrame(this);
            let otherFrame = mo.getObjectHeadjumpCollisionFrame(mo);
        
            return  thisFrame.x < otherFrame.x + otherFrame.width && thisFrame.x + thisFrame.width > otherFrame.x &&
                    thisFrame.y < otherFrame.y + otherFrame.height && thisFrame.y + thisFrame.height > otherFrame.y;
        }
    }

    hit() {
        //this.life -= 10;
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

    
}