import Scene from './Scene.js';
import CanvasUtil from '../utilities/CanvasUtil.js';
import Player from '../drawables/Player.js';
import Launch from './Launch.js';
import Background from '../background items/Background.js';
export default class SelectAngle extends Scene {
    player;
    backgrounds;
    angleReady = false;
    launchAngle = -70;
    rotationSpeed = 0;
    launchPower = 0;
    launchSpeed = 0;
    totalTime = 0;
    powerReady = false;
    constructor(maxX, maxY) {
        super(maxX, maxY);
        this.player = new Player();
        this.backgrounds = [];
        this.backgrounds.push(new Background(0, window.innerHeight - 302 * 4, 1));
    }
    processInput(keyListener, mouseListener) {
        if (this.angleReady && keyListener.keyPressed('Space')) {
            this.powerReady = true;
        }
        if (keyListener.keyPressed('Space')) {
            this.angleReady = true;
        }
    }
    update(elapsed) {
        if (!this.angleReady) {
            this.updateRotation();
        }
        else {
            this.handlePowerSelection();
        }
        if (this.powerReady) {
            this.totalTime += elapsed;
            if (this.totalTime >= 400) {
                return new Launch(window.innerWidth, window.innerHeight, this.launchAngle, this.launchPower);
            }
        }
        return null;
    }
    updateRotation() {
        if (this.launchAngle >= -70 && this.launchAngle <= -35) {
            this.rotationSpeed += 0.01;
        }
        else if (this.launchAngle >= -35) {
            this.rotationSpeed -= 0.01;
        }
        this.launchAngle += this.rotationSpeed;
        this.player.angle = this.launchAngle;
    }
    handlePowerSelection() {
        if (!this.powerReady) {
            if (this.launchPower >= 200) {
                this.launchSpeed *= -1;
                this.launchSpeed -= 0.07;
            }
            else if (this.launchPower >= 0) {
                this.launchSpeed += 0.07;
            }
            else {
                this.launchSpeed = 0;
                this.launchPower = 0.01;
            }
            this.launchPower += this.launchSpeed;
        }
    }
    render(canvas) {
        this.backgrounds.forEach((background) => {
            background.render(canvas);
        });
        this.player.render(canvas);
        CanvasUtil.drawCircle(canvas, this.player.posX + this.player.image.width / 2, this.player.posY + this.player.image.height / 2, window.innerHeight / 5, 'lightgreen');
        const lineLength = 200;
        const lineEndX = this.player.posX + this.player.image.width
            / 2 + lineLength * Math.cos((this.launchAngle * Math.PI) / 180);
        const lineEndY = this.player.posY + this.player.image.height
            / 2 + lineLength * Math.sin((this.launchAngle * Math.PI) / 180);
        CanvasUtil.drawLine(canvas, this.player.posX + this.player.image.width / 2, this.player.posY + this.player.image.height / 2, lineEndX, lineEndY, 'lightgreen');
        if (this.angleReady) {
            CanvasUtil.drawRectangle(canvas, window.innerWidth / 100, window.innerHeight / 1.5, window.innerWidth / 50, this.maxY / 10 - 280, 'red');
            CanvasUtil.fillRectangle(canvas, window.innerWidth / 100, window.innerHeight / 1.5 - this.launchPower, window.innerWidth / 50, this.launchPower, 'red');
        }
    }
}
//# sourceMappingURL=SelectAngle.js.map