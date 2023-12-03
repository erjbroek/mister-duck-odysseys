export default class CanvasUtil {
    static getCanvasContext(canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx === null)
            throw new Error('Canvas Rendering Context is null');
        return ctx;
    }
    static fillCanvas(canvas, colour = '#FF10F0') {
        const ctx = CanvasUtil.getCanvasContext(canvas);
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = colour;
        ctx.fill();
    }
    static loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
    static loadNewImages(sources, folder) {
        const images = [];
        for (const source of sources) {
            images.push(CanvasUtil.loadNewImage(folder ? folder + source : source));
        }
        return images;
    }
    static drawImage(canvas, image, dx, dy, width = 0, height = 0, rotation = 0) {
        const ctx = CanvasUtil.getCanvasContext(canvas);
        if (width === 0)
            width = image.width;
        if (height === 0)
            height = image.height;
        ctx.save();
        ctx.translate(dx + width / 2, dy + height / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.drawImage(image, -width / 2, -height / 2, width, height);
        ctx.restore();
    }
    static clearCanvas(canvas) {
        const ctx = CanvasUtil.getCanvasContext(canvas);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    static writeTextToCanvas(canvas, text, xCoordinate, yCoordinate, alignment = 'center', fontFamily = 'sans-serif', fontSize = 20, color = 'red') {
        CanvasUtil.writeText(canvas, text, xCoordinate, yCoordinate, alignment, fontFamily, fontSize, color);
    }
    static writeText(canvas, text, xCoordinate, yCoordinate, alignment = 'center', fontFamily = 'sans-serif', fontSize = 20, color = 'red') {
        const ctx = CanvasUtil.getCanvasContext(canvas);
        ctx.font = `${fontSize}px ${fontFamily}`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }
    static drawCircle(canvas, centerX, centerY, radius, color = 'red') {
        const ctx = CanvasUtil.getCanvasContext(canvas);
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
    static drawRectangle(canvas, dx, dy, width, height, color = 'red') {
        const ctx = CanvasUtil.getCanvasContext(canvas);
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.rect(dx, dy, width, height);
        ctx.stroke();
    }
    static fillCircle(canvas, centerX, centerY, radius, color = 'red') {
        const ctx = CanvasUtil.getCanvasContext(canvas);
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fill();
    }
    static fillRectangle(canvas, dx, dy, width, height, color = 'red') {
        const ctx = CanvasUtil.getCanvasContext(canvas);
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.rect(dx, dy, width, height);
        ctx.fill();
    }
    static rotateImage(canvas, image, degrees) {
        const ctx = CanvasUtil.getCanvasContext(canvas);
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((degrees * Math.PI) / 180);
        ctx.drawImage(image, -image.width / 2, -image.height / 2);
        ctx.restore();
    }
    static collidesWith(object1X, object1Y, object1Width, object1Height, object2X, object2Y, object2Width, object2Height) {
        if (object1X < object2X + object2Width
            && object1X + object1Width > object2X
            && object1Y < object2Y + object2Height
            && object1Y + object1Height > object2Y) {
            return true;
        }
        return false;
    }
    static mouseHover(objectX, objectY, objectWidth, objectHeight, mouseX, mouseY) {
        if (mouseX > objectX
            && mouseY > objectY
            && mouseX < objectX + objectWidth
            && mouseY < objectY + objectHeight) {
            return true;
        }
        return false;
    }
}
//# sourceMappingURL=CanvasUtil.js.map