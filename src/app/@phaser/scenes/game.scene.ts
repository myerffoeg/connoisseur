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

        GameScene.tiles = GameScene.map.addTilesetImage('connoisseur_village', 'connoisseur_village');
        GameScene.map.layers.forEach((layer: Phaser.Tilemaps.LayerData, index: number) => {
            this.matter.world.convertTilemapLayer(
                GameScene.map
                    .createLayer(layer.name, GameScene.tiles, 0, 0)
                    .setCollisionByProperty({ collides: true })
                    .setDepth(index)
            );
        });

        this.matter.world.setBounds(0, 0, 512 * 2, 512 * 2);
    }

    update(): void {
        // MonsterManager.update();
        PlayerManager.update();
    }
}
