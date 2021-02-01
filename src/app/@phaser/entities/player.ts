import { InterfaceScene } from '../scenes';
import { Container } from './container';

/**
 * A Player represent the current playing player on the map.
 */
export class Player extends Container {

    static readonly PLAYER_SPEED = 80;
    static readonly PLAYER_SPRINT_SPEED = 100;

    character: Phaser.Physics.Arcade.Sprite;

    // @todo move inputs somewhere else?
    inputs: any;

    constructor(scene: Phaser.Scene, texture: string, x?: number, y?: number, children?: Phaser.GameObjects.GameObject[]) {
        super(scene, x, y, children);

        this.character = (new Phaser.Physics.Arcade.Sprite(scene, 32, 32, texture));
        this.add([
            this.character
        ]);
        this.setDepth(1);

        this.body.setSize(12, 4).setOffset(26, 30);
        this.body.setImmovable(true).setCollideWorldBounds(true).setAllowRotation(false);
    }

    create(): void {
        this.scene.add.existing(this);
        this.scene.cameras.main.setBounds(0, 0, 512 * 2, 512 * 2).startFollow(this, false).setZoom(4).flash(2500, 20, 11, 40);

        this.scene.scene.launch(InterfaceScene.name);

        this.inputs = this.scene.input.keyboard.addKeys({
            Z: Phaser.Input.Keyboard.KeyCodes.Z,
            S: Phaser.Input.Keyboard.KeyCodes.S,
            Q: Phaser.Input.Keyboard.KeyCodes.Q,
            D: Phaser.Input.Keyboard.KeyCodes.D,
            SHIFT: Phaser.Input.Keyboard.KeyCodes.SHIFT,
            SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE
        });
    }

    update(): void {
        const velociy = new Phaser.Math.Vector2();

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

        this.character.flipX = false;
        if (this.inputs.SPACE.isDown) {
            if (velociy.y < 0) {
                this.character.anims.play('strike_up', true);
            } else if (velociy.y > 0) {
                this.character.anims.play('strike_down', true);
            } else if (velociy.x < 0) {
                this.character.flipX = true;
                this.character.anims.play('strike_left', true);
            } else if (velociy.x > 0) {
                this.character.anims.play('strike_left', true);
            } else {
                this.character.anims.play('strike_down', true);
            }
            this.body.setVelocity(0, 0);
        } else {
            if (velociy.y < 0) {
                this.character.anims.play('walk_up', true);
            } else if (velociy.y > 0) {
                this.character.anims.play('walk_down', true);
            } else if (velociy.x < 0) {
                this.character.flipX = true;
                this.character.anims.play('walk_right', true);
            } else if (velociy.x > 0) {
                this.character.anims.play('walk_right', true);
            } else {
                this.character.anims.play('idle', true);
            }
            velociy.normalize().scale(this.inputs.SHIFT.isDown ? Player.PLAYER_SPRINT_SPEED : Player.PLAYER_SPEED);
            this.body.setVelocity(velociy.x, velociy.y);
        }
    }
}
