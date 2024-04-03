import HandleStats from '../../../ui/HandleStats.js';
import CanvasUtil from '../../../utilities/CanvasUtil.js';
import ShopTile from './ShopTile.js';
export default class Fuel extends ShopTile {
    constructor() {
        super();
        this.tier = HandleStats.fuelTier;
        this.maxTier = 5;
        this.title = 'Fuel capacity';
        this.description = 'This upgrades the efficiency of the jetpack, so you can boost longer';
        this.blueValue = 50 * HandleStats.fuelTier;
        this.opacity = 0.6;
        this.upgradeCost = 50;
        this.upgradeMultiplier *= 2.5;
        this.tileSize = window.innerWidth / 7.5;
        this.posX = window.innerWidth / 10 + window.innerWidth / 64 + (this.tileSize + window.innerWidth / 64) * 2;
        this.posY = window.innerHeight / 3.3 + 30;
    }
    level() {
        if (this.tier <= this.maxTier) {
            HandleStats.fuelTier += 1;
            this.tier += 1;
            this.blueValue += 50;
            this.upgradeCost *= this.upgradeMultiplier;
        }
    }
    render(canvas) {
        CanvasUtil.fillRectangle(canvas, this.posX, this.posY, this.tileSize, this.tileSize, 30, 175, this.blueValue, this.opacity);
        if (this.selectTile) {
            CanvasUtil.drawRectangle(canvas, this.posX, this.posY, this.tileSize, this.tileSize, 30, 30, 30, 0.4, 4);
        }
        CanvasUtil.fillRectangle(canvas, this.posX + window.innerWidth / 64, this.posY + window.innerWidth / 64, this.tileSize - window.innerWidth / 32, this.tileSize - window.innerWidth / 32, 255, 255, 255, this.opacity);
        CanvasUtil.writeText(canvas, 'fuel', this.posX, this.posY);
    }
    renderSelect(canvas) {
        CanvasUtil.drawRectangle(canvas, this.posX, this.posY, this.tileSize, this.tileSize, 30, 30, 30, 0.4, 4);
    }
}
//# sourceMappingURL=Fuel.js.map