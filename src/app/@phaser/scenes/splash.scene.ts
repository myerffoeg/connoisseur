
import { Create, Preload } from '../interfaces';
import { PlayerManager } from '../managers';
import { GameScene } from './game.scene';
import { Scene } from './scene';

/**
 * Splash scene is a splash screen where you see the progress of the assets being loaded.
 */
export class SplashScene extends Scene implements Preload, Create {

    static PROGRESS_BAR: Phaser.GameObjects.Graphics;
    static TITLE: Phaser.GameObjects.BitmapText;

    /**
     * Creates an instance of splash scene.
     */
    constructor() {
        super({ key: SplashScene.name });
    }

    /**
     * Preloads splash scene.
     */
    preload(): void {
        SplashScene.PROGRESS_BAR = this.add.graphics();
        this.load.on('progress', (value) => {
            SplashScene.PROGRESS_BAR.clear().fillStyle(0xffffff, 0.95).fillRect(
                0,
                this.cameras.main.worldView.x + this.cameras.main.height / 2 + this.cameras.main.height / 12,
                this.cameras.main.width * value,
                this.cameras.main.height / 64
            );
        });

        SplashScene.TITLE = this.add.bitmapText(
            this.cameras.main.worldView.x + this.cameras.main.width / 2,
            this.cameras.main.worldView.x + this.cameras.main.height / 2,
            'carrier_command',
            'CONNOISSEUR',
            this.cameras.main.height / 12
        ).setOrigin(0.5).setScrollFactor(0).setAlpha(0.95);

        this.load.image('connoisseur_village', 'assets/tilesets/connoisseur_village.png');
        this.load.tilemapTiledJSON('connoisseur', 'assets/scenes/connoisseur.json');

        PlayerManager.preload(this);
    }

    /**
     * Creates splash scene.
     */
    create(): void {
        this.tweens.add({
            targets: [SplashScene.PROGRESS_BAR, SplashScene.TITLE],
            alpha: 0,
            duration: 1500,
            ease: 'Cubic.easeOut',
            onComplete: () => {
                this.scene.stop();
                this.scene.run(GameScene.name);
            },
        });
    }
}
