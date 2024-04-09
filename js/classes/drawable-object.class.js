class DrawableObject {
    x = 120;
    y = 250;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;


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

    setImage(imagePath) {
        const cachedImage = this.imageCache[imagePath];
        if (cachedImage) {
            this.img = cachedImage;
        } else {
            console.log("Error while loading Image from Image Cache")
        }
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height) 
    }

    debugText(ctx) {
        if (this instanceof Character) {
            ctx.font = "30px Arial";
            ctx.fillStyle = "red";
            ctx.fillText(this.x, this.x, 150);
        }
    }

    getObjectCollisionFrame(object) {
        let rect;
        switch (object.constructor) {
            case Character:
                rect = { x: object.x + 23, y: object.y + 100, width: object.width - 61, height: object.height - 110};
                break;
            case Chicken:
                rect = { x: object.x + 2, y: object.y + 2, width: object.width - 3, height: object.height - 5 };
                break;
            case Endboss:
                rect = { x: object.x + 40, y: object.y + 95, width: object.width - 80, height: object.height - 110};
                break;
            case ThrowableObject:
                rect = { x: object.x + 10, y: object.y + 10, width: object.width - 20, height: object.height - 20 };
                break;
            default:
                rect = null;
        }
        return rect;
    }

    getObjectHeadjumpCollisionFrame(object) {
        let rect;
        switch (object.constructor) {
            case Character:
                rect = { x: object.x + 23, y: object.y + 220, width: object.width - 61, height: object.height - 230};
                break;
            case Chicken:
                rect = { x: object.x + 2, y: object.y + 2, width: object.width - 3, height: object.height - 40 };
                break;
            default:
                rect = null;
        }
        return rect;
    }

    //getObjectXYDots(object) {
    //    let xDot = object.x;
    //    let yDot = object.y;
    //    return {xDot, yDot};
    //}
    //drawXDot(ctx) {
    //    let xDot = this.getObjectXYDots(this).xDot;
    //    let yDot = this.getObjectXYDots(this).yDot;
    //    ctx.fillRect(xDot, yDot,5,5); // fill in the pixel at (10,10)
    //}

    drawFrame(ctx) { // TODO: Frame Function (delete if not needed)
        let frame = this.getObjectCollisionFrame(this);
        if (frame) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(frame.x, frame.y, frame.width, frame.height);
            ctx.stroke();
        }
    }

    drawHeadjumpFrame(ctx) { // TODO: Frame Function (delete if not needed)
        let frame = this.getObjectHeadjumpCollisionFrame(this);
        if (frame) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'red';
            ctx.rect(frame.x, frame.y, frame.width, frame.height);
            ctx.stroke();
        }
    }
}