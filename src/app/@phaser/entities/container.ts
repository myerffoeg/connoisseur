export class Container extends Phaser.GameObjects.Container {

    body: Phaser.Physics.Arcade.Body;

    constructor(scene: Phaser.Scene, x?: number, y?: number, children?: Phaser.GameObjects.GameObject[]) {
        super(scene, x, y, children);
        this.scene.physics.world.enableBody(this);
    }
}
