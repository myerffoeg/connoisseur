import { Create } from '../interfaces/create.interface';
import { Preload } from '../interfaces/preload.interface';
import { Scene } from './scene';

/**
 * Interface scene is where information to the player is being displayed.
 */
export class InterfaceScene extends Scene implements Preload, Create {

    constructor() {
        super({ key: InterfaceScene.name });
    }

    preload(): void {
    }

    create(): void {
        // this.scale.on('resize', (gameSize, baseSize, displaySize, resolution) => {
        //     var width = gameSize.width;
        //     var height = gameSize.height;
        //     console.log({ gameSize, baseSize, displaySize, resolution });
        //     this.cameras.resize(width, height);
        //     // this.game.scale.setGameSize(width, height);
        // }, this);
        // InterfaceScene.PLAYER_NAME = this.add.bitmapText(0, 0, 'carrier_command', 'JEAN-CHARLES', 2.5)
        // .setOrigin(0.5)
        // .setPosition(0, -19);
        // this.tweens.add({
        //     targets: InterfaceScene.PLAYER_NAME,
        //     duration: 750,
        //     y: -20,
        //     ease: 'Cubic.easeOut',
        //     yoyo: true,
        //     repeat: -1
        // });
        // PlayerManager.player.add(
        //     InterfaceScene.PLAYER_NAME
        // );
    }

    location(location: string): void {
        // this.tweens.add({
        //     targets: this.add
        //         .bitmapText(
        //             InterfaceScene.CENTER_SCREEN_X,
        //             InterfaceScene.CENTER_SCREEN_Y,
        //             'carrier_command',
        //             location,
        //             64
        //         ).setOrigin(0.5).setScrollFactor(0),
        //     alpha: 0,
        //     duration: 2500,
        //     ease: 'Cubic.easeOut'
        // });
    }
}
