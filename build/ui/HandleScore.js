import Mushroom from '../drawables/Mushroom.js';
export default class HandleScore {
    static height = 0;
    static distance = 0;
    static maxHeight = 0;
    static maxSpeed = 0;
    static bronzeCoins = 0;
    static silverCoins = 0;
    static goldCoins = 0;
    static totalCoins = 0;
    static duckDollars = 999999;
    static hitMushroom = 0;
    static enemiesHit = 0;
    static score = 0;
    static totalTime = 0;
    static fTime = '';
    static isFirstTimeTriggered = false;
    static calculateDistances(xSpeed, height, ySpeed) {
        this.distance += xSpeed / 200;
        this.height = height / 200;
        if (this.height >= this.maxHeight) {
            this.maxHeight = this.height;
        }
        if (Math.sqrt(xSpeed ** 2 + ySpeed ** 2) >= this.maxSpeed) {
            this.maxSpeed = xSpeed ** 2 + ySpeed ** 2;
        }
    }
    static hitObject(object) {
        if (object instanceof Mushroom) {
            this.hitMushroom += 1;
        }
    }
    static reset() {
        this.height = 0;
        this.distance = 0;
        this.maxHeight = 0;
        this.maxSpeed = 0;
        this.bronzeCoins = 0;
        this.silverCoins = 0;
        this.goldCoins = 0;
        this.totalCoins = 0;
        this.enemiesHit = 0;
        this.hitMushroom = 0;
        this.score = 0;
        this.totalTime = 0;
        this.isFirstTimeTriggered = false;
    }
    static calculateScore() {
        if (!this.isFirstTimeTriggered) {
            this.score = (this.distance / 2) * ((this.maxHeight / 10) + 1);
            const minutes = Math.floor((this.totalTime / 1000) / 60);
            const seconds = Math.floor((this.totalTime / 1000) % 60);
            const miliSeconds = Math.floor(this.totalTime % 1000);
            this.fTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${miliSeconds.toString().padStart(3, '0')}`;
            this.isFirstTimeTriggered = true;
        }
    }
    static addCoin(coinType) {
        if (coinType === 1) {
            this.bronzeCoins += 1;
        }
        else if (coinType === 2) {
            this.silverCoins += 1;
        }
        else {
            this.goldCoins += 1;
        }
    }
}
//# sourceMappingURL=HandleScore.js.map