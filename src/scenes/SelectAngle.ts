import Scene from './Scene.js';
import KeyListener from '../utilities/KeyListener.js';
import MouseListener from '../ui/MouseListener.js';
import CanvasUtil from '../utilities/CanvasUtil.js';
import Player from '../drawables/Player.js';
import Launch from './Launch.js';
import BackgroundItems from '../background items/BackgroundItems.js';
import Background from '../background items/Background.js';

export default class SelectAngle extends Scene {
  private player: Player;

  private backgrounds: BackgroundItems[];

  private angleReady: boolean = false;

  private launchAngle: number = -70;

  private rotationSpeed: number = 0;

  private launchPower: number = 0;

  private launchSpeed: number = 0;

  private totalTime: number = 0;

  private powerReady: boolean = false;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    this.player = new Player();
    this.backgrounds = [];
    this.backgrounds.push(new Background(0, window.innerHeight - 302 * 4, 1));
  }

  /**
   * Process user input.
   *
   * @param keyListener KeyListener instance to check key presses
   * @param mouseListener MouseListener instance for mouse input
   */
  public processInput(keyListener: KeyListener, mouseListener: MouseListener): void {
    if (this.angleReady && keyListener.keyPressed('Space')) {
      this.powerReady = true;
    }
    if (keyListener.keyPressed('Space')) {
      this.angleReady = true;
    }
  }

  /**
   * Update the scene based on elapsed time.
   *
   * @param elapsed Elapsed time since the last update
   * @returns New scene, or null if not changing scenes
   */
  public update(elapsed: number): Scene {
    if (!this.angleReady) {
      this.updateRotation();
    } else {
      this.handlePowerSelection();
    }
    if (this.powerReady) {
      this.totalTime += elapsed;
      if (this.totalTime >= 400) {
        return new Launch(
          window.innerWidth,
          window.innerHeight,
          this.launchAngle,
          this.launchPower,
        );
      }
    }
    return null;
  }

  /**
   * Update rotation parameters for the player.
   */
  private updateRotation(): void {
    if (this.launchAngle >= -70 && this.launchAngle <= -35) {
      this.rotationSpeed += 0.01;
    } else if (this.launchAngle >= -35) {
      this.rotationSpeed -= 0.01;
    }
    this.launchAngle += this.rotationSpeed;
    this.player.angle = this.launchAngle;
  }

  /**
   * Handle power selection
   */
  private handlePowerSelection(): void {
    if (!this.powerReady) {
      if (this.launchPower >= 200) {
        this.launchSpeed *= -1;
        this.launchSpeed -= 0.07;
      } else if (this.launchPower >= 0) {
        this.launchSpeed += 0.07;
      } else {
        this.launchSpeed = 0;
        this.launchPower = 0.01;
      }
      this.launchPower += this.launchSpeed;
    }
  }

  /**
   *
   * @param canvas the selected canvas objects are rendered to
   */
  public render(canvas: HTMLCanvasElement): void {
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
