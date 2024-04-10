import Mushroom from '../drawables/Mushroom.js';
import Obstacle from '../drawables/Obstacle.js';

export default class HandleScore {
  public static height: number = 0;

  public static distance: number = 0;

  public static maxHeight: number = 0;

  public static maxSpeed: number = 0;

  public static bronzeCoins: number = 0;

  public static silverCoins: number = 0;

  public static goldCoins: number = 0;

  public static totalCoins: number = 0;

  public static duckDollars: number = 999999;

  public static hitMushroom: number = 0;

  public static enemiesHit: number = 0;

  public static score: number = 0;

  public static totalTime: number = 0;

  public static fTime: string = '';

  private static isFirstTimeTriggered: boolean = false;

  /**
   * @param xSpeed is the xSpeed, the horizontal distance the player flies each frame
   * @param height is the current height the player is at in pixels / 10
   * @param ySpeed is the ySpeed, the vertical distance the player flies each frame
   */
  public static calculateDistances(xSpeed: number, height: number, ySpeed: number) {
    this.distance += xSpeed / 200;
    this.height = height / 200;
    if (this.height >= this.maxHeight) {
      this.maxHeight = this.height;
    }
    if (Math.sqrt(xSpeed ** 2 + ySpeed ** 2) >= this.maxSpeed) {
      this.maxSpeed = xSpeed ** 2 + ySpeed ** 2;
    }
  }

  /**
   * updates all objects hit during the run for score calculation
   *
   * @param object is the object the player hit
   */
  public static hitObject(object: Obstacle) {
    if (object instanceof Mushroom) {
      this.hitMushroom += 1;
    }
  }

  public static reset() {
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

  /**
   *
   */
  public static calculateScore() {
    // the formula for calculating the score, based on distance and height
    if (!this.isFirstTimeTriggered) {
      this.score = (this.distance / 2) * ((this.maxHeight / 10) + 1);
      const minutes = Math.floor((this.totalTime / 1000) / 60);
      const seconds = Math.floor((this.totalTime / 1000) % 60);
      const miliSeconds = Math.floor(this.totalTime % 1000);
      this.fTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${miliSeconds.toString().padStart(3, '0')}`;
      this.isFirstTimeTriggered = true;
    }
  }

  /**
   * @param coinType is the type of coin that is added
   */
  public static addCoin(coinType: number) {
    if (coinType === 1) {
      this.bronzeCoins += 1;
    } else if (coinType === 2) {
      this.silverCoins += 1;
    } else {
      this.goldCoins += 1;
    }
  }
}
