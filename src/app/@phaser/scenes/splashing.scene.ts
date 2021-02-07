
import { Create } from '../interfaces/create.interface';
import { Preload } from '../interfaces/preload.interface';
import { Scene } from './scene';
import { SplashScene } from './splash.scene';

/**
 * Splashing scene is the splash screen preloading its assets before showing the splash screen to the user.
 */
export class SplashingScene extends Scene implements Preload, Create {

    /**
     * Creates an instance of splashing scene.
     */
    constructor() {
        super({ key: SplashingScene.name });
    }

    /**
     * Preloads splashing scene.
     */
    preload(): void {
        this.load.bitmapFont('carrier_command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');
    }

    /**
     * Creates splashing scene.
     */
    create(): void {
        this.scene.stop();
        this.scene.switch(SplashScene.name);
    }
}
