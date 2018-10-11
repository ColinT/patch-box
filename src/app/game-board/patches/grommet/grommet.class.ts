import { Patch, PatchType } from '../patch.class';

export class GrommetPatch extends Patch {
  constructor(orientation?: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') {
    super();
    // Initialize with a read only orientation
    const possibleOrientations = ['UP', 'DOWN', 'LEFT', 'RIGHT']; // The direction the odd end is pointing
    this._orientation = orientation || possibleOrientations[Math.floor(Math.random() * possibleOrientations.length)];
  }

  private _orientation;
  get orientation() {
    return this._orientation;
  }

  get ends() {
    return {
      'UP': this.orientation === 'UP',
      'DOWN': this.orientation === 'DOWN',
      'LEFT': this.orientation === 'LEFT',
      'RIGHT': this.orientation === 'RIGHT',
    };
  }

  get isLoose() {
    return !(
      (this.orientation === 'UP' && this.upPatch && this.upPatch.ends.DOWN) ||
      (this.orientation === 'LEFT' && this.leftPatch && this.leftPatch.ends.RIGHT) ||
      (this.orientation === 'RIGHT' && this.rightPatch && this.rightPatch.ends.LEFT) ||
      (this.orientation === 'DOWN' && this.downPatch && this.downPatch.ends.UP)
    );
  }

  get type() {
    return PatchType.Grommet;
  }

  get imageUrl() {
    return `assets/patches/grommet/${this.isConnected ? 'connected' : 'disconnected'}.svg`;
  }

  get rotation() {
    switch (this.orientation) {
      case 'UP': return 270;
      case 'DOWN': return 90;
      case 'LEFT': return 180;
      case 'RIGHT': return 0;
    }
  }

  rotateCw() {
    switch (this.orientation) {
      case 'UP': this._orientation = 'RIGHT'; return;
      case 'DOWN': this._orientation = 'LEFT'; return;
      case 'LEFT': this._orientation = 'UP'; return;
      case 'RIGHT': this._orientation = 'DOWN'; return;
    }
  }

  rotateCcw() {
    switch (this.orientation) {
      case 'UP': this._orientation = 'LEFT'; return;
      case 'DOWN': this._orientation = 'RIGHT'; return;
      case 'LEFT': this._orientation = 'DOWN'; return;
      case 'RIGHT': this._orientation = 'UP'; return;
    }
  }

  clone(): GrommetPatch {
    return new GrommetPatch();
  }
}
