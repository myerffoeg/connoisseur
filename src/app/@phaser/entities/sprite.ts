export class Sprite extends Phaser.Physics.Matter.Sprite {

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene.matter.world, x, y, texture);
    }
}
