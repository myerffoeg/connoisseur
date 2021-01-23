import { Monster } from '../entities/monster';

export class MonsterManager {

    static monsters: Monster[] = [];

    static preload(scene: Phaser.Scene): void {
        scene.load.atlas('slime', 'assets/sprites/slime.png', 'assets/sprites/slime_atlas.json');
        scene.load.animation('slime_anim', 'assets/sprites/slime_anim.json');
    }

    static create(scene: Phaser.Scene): void {
        const monster = new Monster(
            scene,
            'slime',
            75,
            75
        );
        MonsterManager.monsters.push(monster);
        monster.create();
    }

    static update(): void {
        MonsterManager.monsters.forEach(monster => {
            monster.update();
        });
    }
}
