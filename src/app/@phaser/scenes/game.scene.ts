import { Scene } from 'phaser';
import { Create, Update } from '../interfaces';
import { PlayerManager } from '../managers';

export class GameScene extends Scene implements Create, Update {

  static map: Phaser.Tilemaps.Tilemap;
  static tiles: Phaser.Tilemaps.Tileset;

  constructor() {
    super({ key: GameScene.name });
  }

  create(): void {
    // MonsterManager.create(this);
    PlayerManager.create(this);

    GameScene.map = this.make.tilemap({
      key: 'connoisseur'
    });

    GameScene.tiles = GameScene.map.addTilesetImage('connoisseur_village', 'connoisseur_village', 16, 16, 1, 2);
    GameScene.map.layers.forEach((layer: Phaser.Tilemaps.LayerData, index: number) => {
      this.matter.world.convertTilemapLayer(
        GameScene.map
          .createLayer(layer.name, GameScene.tiles, 0, 0)
          .setCollisionByProperty({ collides: true })
          .setCollisionFromCollisionGroup()
          .setDepth(index)
      );
    });

    GameScene.map.getObjectLayer('objects').objects.forEach(object => {
      const sprite = new Phaser.Physics.Matter.Sprite(this.matter.world, object.x, object.y, 'connoisseur_objects', object.type);
      sprite.x += object.width;
      sprite.y -= object.height;

      sprite.setExistingBody(
        this.matter.body.create({
          parts: [
            this.matter.bodies.rectangle(sprite.x, sprite.y, 6, 6, {
              isSensor: false,
              label: 'collides'
            }),
            this.matter.bodies.rectangle(sprite.x, sprite.y, 38, 38, {
              isSensor: true,
              label: 'interact'
            })
          ],
        })
      );

      sprite.setStatic(true);
      sprite.setDepth(object.y - (object.height / 2));
      sprite.setOrigin(0.5, 0.5);

      this.add.existing(sprite);
    });
    // table_food
    this.matter.world.setBounds(0, 0, 512 * 2, 512 * 2);
  }

  update(): void {
    // MonsterManager.update();
    PlayerManager.update();
  }
}
