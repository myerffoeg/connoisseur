import { Injectable } from '@angular/core';
import Phaser from 'phaser';
import { SplashingScene } from 'src/app/@phaser/scenes/splashing.scene';
import { environment } from 'src/environments/environment';
import { GameScene, InterfaceScene, SplashScene } from '../../@phaser/scenes';

@Injectable({
  providedIn: 'root'
})
export class ConnoisseurService {

  configuration: Phaser.Types.Core.GameConfig = {
    title: 'Connoisseur',
    scene: [
      SplashingScene,
      SplashScene,
      GameScene,
      InterfaceScene
    ],
    disableContextMenu: true,
    fps: {
      min: 30,
      target: 60
    },
    render: {
      pixelArt: true,
      antialias: false,
      roundPixels: false
    },
    backgroundColor: '#140B28',
    physics: {
      default: 'matter',
      matter: {
        gravity: {
          x: 0,
          y: 0
        },
        debug: !environment.production
      },
    },
    scale: {
      width: '100%',
      height: '100%',
      autoCenter: Phaser.Scale.CENTER_BOTH,
      mode: Phaser.Scale.RESIZE
    },
  };
  connoisseur: Phaser.Game;

  initialization(): void {
    this.connoisseur = new Phaser.Game(this.configuration);
  }
}
