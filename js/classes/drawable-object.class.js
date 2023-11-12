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
                rect = { x: object.x, y: object.y, width: object.width, height: object.height };
                break;
            case Endboss:
                rect = { x: object.x, y: object.y, width: object.width, height: object.height };
                break;
            case ThrowableObject:
                rect = { x: object.x, y: object.y, width: object.width, height: object.height };
                break;
            default:
                // Standardverhalten oder Fehlerbehandlung
                rect = null;
        }
        return rect;
    }

    drawFrame(ctx) {
        let frame = getObjectCollisionFrame(this);
        if (frame) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(frame.x, frame.y, frame.width, frame.height);
            ctx.stroke();
        }
    }

    



    //drawFrame(ctx) {
    //    if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof ThrowableObject) {
    //    ctx.beginPath();
    //    ctx.lineWidth = '2';
    //    ctx.strokeStyle = 'blue'
    //    ctx.rect(getObjectFrame());
    //    ctx.stroke();
    //    }
    //}
//
    //getObjectFrame() {
    //    switch (InstanceOf) {
    //        case this instanceof Character:
    //            return this.x + 20, this.y + 100, this.width - 55, this.height -110
    //        case this instanceof Chicken:
    //            return this.x + 20, this.y + 100, this.width - 55, this.height -110
    //    
    //        default:
    //            break;
    //    }
    //
    //}
}