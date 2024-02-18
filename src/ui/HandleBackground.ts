import Background from '../background items/Background.js';
import BackgroundItems from '../background items/BackgroundItems.js';
import CanvasUtil from '../utilities/CanvasUtil.js';
import Player from '../drawables/Player.js';
import Coin from '../drawables/Coin.js';
import HandleScore from './handleScore.js';
import Tree from '../background items/Tree.js';

export default class HandleBackground {
  private space: HTMLImageElement;

  public backgrounds: BackgroundItems[];

  public trees: Tree[];

  private items: (Coin)[];

  public touchingGround: boolean;

  public touchedGround: boolean = false;

  public constructor() {
    this.backgrounds = [];
    this.items = [];
    this.trees = [];
    this.backgrounds.push(new Background(0, window.innerHeight - 302 * 4, 1));
    this.space = CanvasUtil.loadNewImage('./assets/space.png');
    this.touchingGround = false;
  }

  /**
   * moves all items rendered.
   *
   * @param player the character (mister duck) that you play with
   * @param xSpeed horizontal speed
   * @param ySpeed vertical speed
   */
  public moveItems(player: Player, xSpeed: number, ySpeed: number) {
    // if the player should move up or down
    if (player.posY >= window.innerHeight / 2
    || this.backgrounds[0].getPosY() + this.backgrounds[0].getHeight() < window.innerHeight) {
      this.backgrounds.forEach((background) => {
        background.move(xSpeed, 0);
        background.setPosY(window.innerHeight - background.getHeight());
      });
      this.items.forEach((item) => {
        item.move(xSpeed * 1.1, 0);
      });
      player.move(ySpeed);
    } else {
      // just the background moves
      this.backgrounds.forEach((background) => {
        background.move(xSpeed, ySpeed);
      });
      this.items.forEach((item) => {
        item.move(xSpeed * 1.2, ySpeed * 1.2);
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

    while (this.items.filter((obj) => obj instanceof Coin).length < 15) {
      this.items.push(new Coin(
        window.innerWidth + (
          window.innerWidth + Math.random() * (window.innerWidth * 3)),
        (this.backgrounds[0].getPosY() + this.backgrounds[0].getHeight()),
      ));
    }

    while (this.trees.filter((obj) => obj instanceof Tree).length < 5) {
      this.trees.push(new Tree(
        window.innerWidth + window.innerWidth * Math.random(),
        (this.backgrounds[0].getPosY() + this.backgrounds[0].getHeight()),
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
  public collision(player: Player, elapsed: number) {
    this.items.forEach((item) => {
      if (CanvasUtil.collidesWith(player, item)) {
        if (item instanceof Coin) {
          HandleScore.totalCoins += item.value;
          HandleScore.addCoin(item.coinType);
        }
        this.items.splice(this.items.indexOf(item), 1);
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
    CanvasUtil.drawImage(canvas, this.space, 0, this.backgrounds[0].getPosY() - window.innerHeight * 5, window.innerWidth, window.innerHeight * 5, 0);
    this.items.forEach((item) => {
      item.render(canvas);
    });
  }
}
