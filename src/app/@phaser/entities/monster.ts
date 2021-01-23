import { Container } from './container';

export class Monster extends Container {

    // @todo const data for every monster types maybe add specialized class maybe?
    static readonly MONSTER_SPEED = 2.5;
    static readonly MONSTER_SPRINT_SPEED = 3.5;

    monster: Phaser.Physics.Arcade.Sprite;

    constructor(scene: Phaser.Scene, texture: string, x?: number, y?: number, children?: Phaser.GameObjects.GameObject[]) {
        super(scene, x, y, children);

        this.monster = (new Phaser.Physics.Arcade.Sprite(scene, 0, 0, texture));
        this.add([
            this.monster
        ]);
        this.setDepth(3);

        this.body.setSize(12, 4).setOffset(-6, 4);
        this.body.setImmovable(true).setCollideWorldBounds(true).setAllowRotation(false);
    }

    preload(scene: Phaser.Scene): void {
        scene.load.atlas('slime', 'assets/sprites/slime.png', 'assets/sprites/slime_atlas.json');
        scene.load.animation('slime_anim', 'assets/sprites/slime_anim.json');
    }

    create(): void {
        this.scene.add.existing(this);
    }

    update(): void {
        this.monster.anims.play('slime_idle', true);
    }
}
