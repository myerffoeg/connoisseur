import { Player } from '../entities/player';

export class PlayerManager {

    static player: Player;

    static preload(scene: Phaser.Scene): void {
        scene.load.atlas('character', 'assets/sprites/character.png', 'assets/sprites/character_atlas.json');
        scene.load.animation('character_anim', 'assets/sprites/character_anim.json');
    }

    static create(scene: Phaser.Scene): void {
        PlayerManager.player = new Player(
            scene,
            151.5,
            152,
            'character'
        );
        PlayerManager.player.create();
    }

    static update(): void {
        PlayerManager.player.update();
    }
}
