import CanvasUtil from '../utilities/CanvasUtil.js';
import Drawable from './Drawable.js';

export default class Player extends Drawable {
  public rotationSpeed: number = 0;

  public touchedGround: boolean = false;

  public totalEnergy: number;

  public energy: number;

  public boost: number;

  public totalBoost: number;

  public boostPower: number;

  public boostEfficiency: number;

  public xSpeed: number;

  public ySpeed: number;

  public constructor() {
    super();
    this.image = CanvasUtil.loadNewImage('./assets/player.png');
    this.totalEnergy = 200;
    this.energy = 200;
    this.totalBoost = 100;
    this.boost = this.totalBoost;
    this.boostPower = 1;

    this.image.width = window.innerWidth / 15;
    this.image.height = window.innerWidth / 15;
    this.posX = window.innerWidth / 10 - this.image.width / 2;
    this.posY = window.innerHeight / 1.1 - this.image.height / 3;
  }

  /**
   * moves the player up or down depening on the ySpeed
   *
   * @param ySpeed the chosen ySpeed the player has to move
   */
  public move(ySpeed: number) {
    this.posY += ySpeed;
  }

  /**
   * rotates the player
   */
  public rotate() {
    this.angle += this.rotationSpeed;
  }

  /**
   * @param xSpeed is the horizontal speed of the player
   * @param ySpeed is the vertical speed of the player
   * @returns array with xSpeed and ySpeed
   */
  public activateBoost(xSpeed: number, ySpeed: number) {
    if (this.boost > 0) {
      const addedX = xSpeed * (this.boostPower / 100);
      const addedY = ySpeed * (this.boostPower / 100);
      this.boost -= 1 / (this.totalBoost / 100);
      return [xSpeed + addedX, ySpeed + addedY];
    } return [xSpeed, ySpeed];
  }

  /**
   * rotates the player based on the xSpeed and ySpeed;
   * @param xSpeed is the horizontal speed of the player
   * @param ySpeed is the vertical speed of the player
   */
  public setAngle(xSpeed: number, ySpeed: number) {
    let angle = Math.atan2(xSpeed, ySpeed) * (180 / Math.PI);
    angle *= -1;
    angle += 90;

    this.angle = angle;
  }

  /**
   * @param canvas the selected canvas to render to
   */
  public renderPower(canvas: HTMLCanvasElement) {
    if (this.energy > 0) {
      CanvasUtil.drawRectangle(canvas, this.posX, this.posY - canvas.width / 50, this.image.width + 2 * (this.posX - canvas.width / 15), canvas.height / 100, 'green');
      CanvasUtil.fillRectangle(canvas, this.posX, this.posY - canvas.width / 50, (this.image.width + 2 * (this.posX - canvas.width / 15)) * (this.energy / this.totalEnergy), canvas.height / 100, 'green');
    }
    if (this.boost > 0) {
      CanvasUtil.drawRectangle(canvas, this.posX, this.posY - canvas.width / 30, this.image.width + 2 * (this.posX - canvas.width / 15), canvas.height / 100, 'red');
      CanvasUtil.fillRectangle(canvas, this.posX, this.posY - canvas.width / 30, (this.image.width + 2 * (this.posX - canvas.width / 15)) * (this.boost / this.totalBoost), canvas.height / 100, 'red');
    }
  }
}
