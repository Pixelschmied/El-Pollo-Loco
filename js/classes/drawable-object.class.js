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
        }
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height) 
    }

    getObjectCollisionFrame(object) {
        let rect;
        switch (object.constructor) {
            case Character:
                rect = { x: object.x + 20, y: object.y + 100, width: object.width - 55, height: object.height - 110};
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
}