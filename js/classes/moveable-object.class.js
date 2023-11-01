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
    acceleration = 2;

    applyGravity() {
        setInterval(() => {
            if (this.isJumping && !this.isFalling) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                console.log("Is Jumping")
            }
            //if (this.isFalling) {
            //    this.y = 0;
            //    console.log("Is Falling!")
            //}
        }, 1000 / 25);
    }

    isJumping() {
        return this.y < 243;
    }

    isFalling() {
        return this.y < 100;
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

    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
    

    moveRight() {
        console.log("Moving Right")
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60)
    }
}