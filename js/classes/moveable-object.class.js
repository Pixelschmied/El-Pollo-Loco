class MoveableObject {
    x = 120;
    y = 250;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    mirrored = false;
    speedY = 0;
    acceleration = 1.8;

    applyGravity() {
        setInterval(() => {
            if (this.isJumping() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 30);
    }

    isJumping() {
        return this.y < 243;
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height) 
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.strokeStyle = 'blue'
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        }

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
        }
    }

    isDead() {
        return this.life == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
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