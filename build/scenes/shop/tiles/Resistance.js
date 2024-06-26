import HandleStats from '../../../ui/HandleStats.js';
import HandleScore from '../../../ui/HandleScore.js';
import CanvasUtil from '../../../utilities/CanvasUtil.js';
import ShopTile from './ShopTile.js';
export default class Resistance extends ShopTile {
    constructor() {
        super();
        this.tier = HandleStats.airResistanceTier;
        this.maxTier = 5;
        this.blueValue = (255 / this.maxTier) * this.tier;
        this.opacity = 0.6;
        this.title = 'Air resistance';
        this.description = 'Whenever flying, mister duck will experience ait resistance. Upgrading this<br>makes mister duck more aerodynamic resulting in further flight.';
        this.image = CanvasUtil.loadNewImage('./assets/hat1.png');
        this.emptySlot = CanvasUtil.loadNewImage('./assets/emptyslot.png');
        this.upgradeCost = 100;
        this.upgradeMultiplier = 1.9;
        this.tileSize = window.innerWidth / 7.5;
        this.posX = window.innerWidth / 10 + this.tileSize + window.innerWidth / 32;
        this.posY = window.innerHeight / 1.6 + 30;
        this.statTiers = [1, 0.9, 0.75, 0.65, 0.5, 0.4];
    }
    level() {
        if (HandleScore.duckDollars >= this.upgradeCost) {
            if (this.tier < this.maxTier) {
                HandleStats.airResistanceTier += 1;
                HandleStats.airResistance = this.statTiers[HandleStats.airResistanceTier];
                this.tier += 1;
                this.blueValue = (255 / this.maxTier) * this.tier;
                this.upgradeCost *= this.upgradeMultiplier;
            }
        }
    }
    render(canvas) {
        CanvasUtil.fillRectangle(canvas, this.posX, this.posY, this.tileSize, this.tileSize, 30, 175, this.blueValue, this.opacity, 20);
        CanvasUtil.fillRectangle(canvas, this.posX + window.innerWidth / 64, this.posY + window.innerWidth / 64, this.tileSize - window.innerWidth / 32, this.tileSize - window.innerWidth / 32, 255, 255, 255, this.opacity);
        CanvasUtil.writeText(canvas, 'air resistance', this.posX, this.posY);
        CanvasUtil.drawImage(canvas, this.emptySlot, this.posX + this.tileSize / 2 - this.emptySlot.width / 4, this.posY + this.tileSize / 2 - this.emptySlot.height / 4 + canvas.height / 30, this.emptySlot.width / 2, this.emptySlot.height / 2, 0, 0.3);
        if (HandleStats.airResistanceTier >= 5) {
            this.image = CanvasUtil.loadNewImage('./assets/hat3.png');
            CanvasUtil.drawImage(canvas, this.image, this.posX + this.tileSize / 2 - this.image.width / 2, this.posY + this.tileSize / 2 - this.image.height / 2, this.image.width, this.image.height, 0, 1);
        }
        else if (HandleStats.airResistanceTier >= 3) {
            this.image = CanvasUtil.loadNewImage('./assets/hat2.png');
            CanvasUtil.drawImage(canvas, this.image, this.posX + this.tileSize / 2 - this.image.width / 2, this.posY + this.tileSize / 2 - this.image.height / 2, this.image.width, this.image.height, 0, 1);
        }
        else if (HandleStats.airResistanceTier >= 1) {
            this.image = CanvasUtil.loadNewImage('./assets/hat1.png');
            CanvasUtil.drawImage(canvas, this.image, this.posX + this.tileSize / 2 - this.image.width / 2, this.posY + this.tileSize / 2 - this.image.height / 2, this.image.width, this.image.height, 0, 1);
        }
    }
}
//# sourceMappingURL=Resistance.js.map