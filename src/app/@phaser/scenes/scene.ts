/**
 * Scene class represent a scene used in Phaser, report to Phaser.Scene for more details.
 */
export class Scene extends Phaser.Scene {
    /**
     * Creates an instance of scene.
     * @param config Configuration of the scene.
     */
    constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
        super(config);
    }
}
