import { Sprite } from '.';
import { InterfaceScene } from '../scenes';

export interface PlayerKey {
  Z: Phaser.Input.Keyboard.Key;
  S: Phaser.Input.Keyboard.Key;
  Q: Phaser.Input.Keyboard.Key;
  D: Phaser.Input.Keyboard.Key;
  SHIFT: Phaser.Input.Keyboard.Key;
  SPACE: Phaser.Input.Keyboard.Key;
}

/**
 * A Player represent a player on the current scene.
 */
export class Player extends Sprite {

  static readonly PLAYER_SPEED = 0.85;
  static readonly PLAYER_SPRINT_SPEED = 1.25;

  inputs: PlayerKey;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    this.scene.add.existing(this);
    this.setExistingBody(
      this.scene.matter.body.create({
        parts: [
          this.scene.matter.bodies.rectangle(this.x, this.y, 12, 6, {
            isSensor: false,
            label: 'collides'
          }),
          this.scene.matter.bodies.rectangle(this.x, this.y, 38, 38, {
            isSensor: true,
            label: 'interact'
          })
        ],
      })
    );
    this.setDepth(3);
    this.setFixedRotation();
    this.setIgnoreGravity(true);
  }

  create(): void {
    this.scene.scene.launch(InterfaceScene.name);

    this.scene.cameras.main.setBounds(0, 0, 512 * 2, 512 * 2);
    this.scene.cameras.main.startFollow(this, false, 0.04, 0.04);
    this.scene.cameras.main.setZoom(3.75);
    this.scene.cameras.main.flash(2500, 20, 11, 40);

    this.inputs = this.scene.input.keyboard.addKeys({
      Z: Phaser.Input.Keyboard.KeyCodes.Z,
      S: Phaser.Input.Keyboard.KeyCodes.S,
      Q: Phaser.Input.Keyboard.KeyCodes.Q,
      D: Phaser.Input.Keyboard.KeyCodes.D,
      SHIFT: Phaser.Input.Keyboard.KeyCodes.SHIFT,
      SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE
    }) as PlayerKey;
  }

  update(): void {
    const velociy = new Phaser.Math.Vector2();

    this.setDepth(this.y);

    if (this.inputs.Q.isDown) {
      velociy.x = -1;
    } else if (this.inputs.D.isDown) {
      velociy.x = 1;
    }

    if (this.inputs.S.isDown) {
      velociy.y = 1;
    } else if (this.inputs.Z.isDown) {
      velociy.y = -1;
    }

    this.flipX = false;
    if (this.inputs.SPACE.isDown) {
      if (velociy.y < 0) {
        this.anims.play('strike_up', true);
      } else if (velociy.y > 0) {
        this.anims.play('strike_down', true);
      } else if (velociy.x < 0) {
        this.flipX = true;
        this.anims.play('strike_left', true);
      } else if (velociy.x > 0) {
        this.anims.play('strike_left', true);
      } else {
        this.anims.play('strike_down', true);
      }
      this.setVelocity(0, 0);
    } else {
      if (velociy.y < 0) {
        this.anims.play('walk_up', true);
      } else if (velociy.y > 0) {
        this.anims.play('walk_down', true);
      } else if (velociy.x < 0) {
        this.flipX = true;
        this.anims.play('walk_right', true);
      } else if (velociy.x > 0) {
        this.anims.play('walk_right', true);
      } else {
        this.anims.play('idle', true);
      }
      velociy.normalize().scale(this.inputs.SHIFT.isDown ? Player.PLAYER_SPRINT_SPEED : Player.PLAYER_SPEED);
      this.setVelocity(velociy.x, velociy.y);
    }
  }
}
