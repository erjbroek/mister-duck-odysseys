import Background from '../background items/Background.js';
import BackgroundItems from '../background items/BackgroundItems.js';
import CanvasUtil from '../utilities/CanvasUtil.js';
import Player from '../drawables/Player.js';
import Coin from '../drawables/Coin.js';
import HandleScore from './handleScore.js';

export default class HandleItems {
  private space: HTMLImageElement;

  public backgrounds: BackgroundItems[];

  private items: (Coin)[];

  public touchingGround: boolean;

  private scoreHandler: HandleScore;

  public touchedGround: boolean = false;

  public constructor(scoreHandler: HandleScore) {
    this.backgrounds = [];
    this.items = [];
    this.scoreHandler = scoreHandler;
    this.backgrounds.push(new Background(0, window.innerHeight - 302 * 4, 1));
    this.space = CanvasUtil.loadNewImage('./assets/space.png');
    this.touchingGround = false;
  }

  /**
   * @param player the character (mister duck) that you play with
   * @param xSpeed horizontal speed
   * @param ySpeed vertical speed
   */
  public moveItems(player: Player, xSpeed: number, ySpeed: number) {
    if (player.posY >= window.innerHeight / 2
    || this.backgrounds[0].getPosY() + this.backgrounds[0].getHeight() < window.innerHeight) {
      this.backgrounds.forEach((background) => {
        background.move(xSpeed * 0.9, 0);
        background.setPosY(window.innerHeight - background.getHeight());
      });
      this.items.forEach((item) => {
        item.move(xSpeed, 0);
      });
      player.move(ySpeed);
    } else {
      this.backgrounds.forEach((background) => {
        background.move(xSpeed * 0.9, ySpeed * 0.8);
      });
      this.items.forEach((item) => {
        item.move(xSpeed, ySpeed);
      });
    }

    if (player.posY + player.image.height > window.innerHeight) {
      this.touchingGround = true;
    } else {
      this.touchingGround = false;
    }
  }

  /**
   *
   */
  public addItems() {
    if (this.backgrounds.length < 2) {
      if (this.backgrounds[0].getPosX() + this.backgrounds[0].getWidth() <= window.innerWidth) {
        this.backgrounds.push(new Background(this.backgrounds[0].getPosX()
        + this.backgrounds[0].getWidth(), this.backgrounds[0].getPosY(), Math.random()));
      }
    }

    if (this.items.filter((obj) => obj instanceof Coin).length < 6) {
      this.items.push(new Coin(
        window.innerWidth + (
          window.innerWidth + Math.random() * (window.innerWidth * 3)),
        (this.backgrounds[0].posY + this.backgrounds[0].image.height)
        - Math.random() * (window.innerHeight * (4 / 3)) - window.innerHeight / 10,
      ));
    }
  }

  /**
   *
   */
  public removeUnusedItems() {
    this.items.forEach((item) => {
      if (item.posX <= -1000) {
        this.items.splice(this.items.indexOf(item), 1);
      }
    });

    if (this.backgrounds[0].getPosX() + this.backgrounds[0].getWidth() <= 0) {
      this.backgrounds.splice(0, 1);
    }
  }


  /**
   *
   */
  public collision(player: Player) {
    this.items.forEach((item) => {
      if (CanvasUtil.collidesWith(player, item)) {
        this.items.splice(this.items.indexOf(item), 1);
        if (item instanceof Coin) {
          this.scoreHandler.coins += item.value;
        }
      }
    });
  }

  /**
   * renders the objects to the canvas
   * @param canvas the selected canvas objects are rendered to
   */
  public render(canvas: HTMLCanvasElement) {
    this.backgrounds.forEach((item) => {
      item.render(canvas);
    });
    this.items.forEach((item) => {
      item.render(canvas);
    });
    CanvasUtil.drawImage(canvas, this.space, 0, this.backgrounds[0].getPosY() - window.innerHeight * 5, window.innerWidth, window.innerHeight * 5, 0);
  }
}
