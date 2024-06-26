import HandleStats from '../ui/HandleStats.js';
import CanvasUtil from '../utilities/CanvasUtil.js';
import Drawable from './Drawable.js';
export default class Player extends Drawable {
    rotationSpeed = 0;
    touchedGround = false;
    totalEnergy;
    energy;
    boost;
    totalBoost;
    boostPower;
    boostEfficiency;
    xSpeed;
    ySpeed;
    hat;
    constructor() {
        super();
        if (HandleStats.launchPowerTier > 0) {
            this.image = CanvasUtil.loadNewImage(`./assets/player${HandleStats.launchPowerTier}.png`);
        }
        else {
            this.image = CanvasUtil.loadNewImage('./assets/player.png');
        }
        if (HandleStats.airResistanceTier >= 5) {
            this.hat = CanvasUtil.loadNewImage('./assets/hat3.png');
        }
        else if (HandleStats.airResistanceTier >= 3) {
            this.hat = CanvasUtil.loadNewImage('./assets/hat2.png');
        }
        else if (HandleStats.airResistanceTier >= 1) {
            this.hat = CanvasUtil.loadNewImage('./assets/hat1.png');
        }
        this.totalEnergy = 200;
        this.energy = 200;
        this.totalBoost = HandleStats.fuel;
        this.boost = this.totalBoost;
        this.boostPower = HandleStats.fuelPower;
        this.image.width = window.innerWidth / 15;
        this.image.height = window.innerWidth / 15;
        this.posX = window.innerWidth / 10 - this.image.width / 2;
        this.posY = window.innerHeight / 1.1 - this.image.height / 3;
    }
    move(ySpeed) {
        this.posY += ySpeed;
    }
    rotate() {
        this.angle += this.rotationSpeed;
    }
    activateBoost(xSpeed, ySpeed) {
        if (this.boost > 0) {
            const addedX = xSpeed * (this.boostPower / 150);
            const addedY = ySpeed * (this.boostPower / 150);
            this.boost -= 1 / (this.totalBoost / HandleStats.fuel);
            return [xSpeed + addedX, ySpeed + addedY];
        }
        return [xSpeed, ySpeed];
    }
    setAngle(xSpeed, ySpeed) {
        let angle = Math.atan2(xSpeed, ySpeed) * (180 / Math.PI);
        angle *= -1;
        angle += 90;
        this.angle = angle;
    }
    renderHat(canvas) {
        if (this.hat) {
            const center = [this.posX + this.image.width / 2, this.posY + this.image.height / 2];
            const lineLength = 28;
            const endX = center[0] + Math.cos(((this.angle - canvas.width / 50) * Math.PI) / 180) * lineLength;
            const endY = center[1] + Math.sin(((this.angle - canvas.width / 50) * Math.PI) / 180) * lineLength;
            const hatPosX = endX - this.hat.width / 4;
            const hatPosY = endY - this.hat.height / 4;
            CanvasUtil.drawImage(canvas, this.hat, hatPosX, hatPosY, this.hat.width / 2, this.hat.height / 2, this.angle);
        }
    }
    renderPower(canvas) {
        if (this.energy > 0) {
            CanvasUtil.drawRectangle(canvas, this.posX, this.posY - canvas.width / 50, this.image.width + 2 * (this.posX - canvas.width / 15), canvas.height / 100, 0, 200, 0);
            CanvasUtil.fillRectangle(canvas, this.posX, this.posY - canvas.width / 50, (this.image.width + 2 * (this.posX - canvas.width / 15)) * (this.energy / this.totalEnergy), canvas.height / 100, 0, 200, 0);
        }
        if (this.boost > 0) {
            CanvasUtil.drawRectangle(canvas, this.posX, this.posY - canvas.width / 30, this.image.width + 2 * (this.posX - canvas.width / 15), canvas.height / 100, 255, 0, 0);
            CanvasUtil.fillRectangle(canvas, this.posX, this.posY - canvas.width / 30, (this.image.width + 2 * (this.posX - canvas.width / 15)) * (this.boost / this.totalBoost), canvas.height / 100, 255, 0, 0);
        }
    }
}
//# sourceMappingURL=Player.js.map