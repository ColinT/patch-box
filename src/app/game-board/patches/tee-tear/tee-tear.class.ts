import { Patch, PatchType } from '../patch.class';

export class TeeTearPatch extends Patch {
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
      'UP': this.orientation === 'UP' || this.orientation === 'LEFT' || this.orientation === 'RIGHT',
      'DOWN': this.orientation === 'DOWN' || this.orientation === 'LEFT' || this.orientation === 'RIGHT',
      'LEFT': this.orientation === 'LEFT' || this.orientation === 'UP' || this.orientation === 'DOWN',
      'RIGHT': this.orientation === 'RIGHT' || this.orientation === 'UP' || this.orientation === 'DOWN',
    };
  }

  get isLoose() {
    switch (this.orientation) {
      case 'UP': {
        return !(
          !!this.upPatch && this.upPatch.ends.DOWN &&
          !!this.leftPatch && this.leftPatch.ends.RIGHT &&
          !!this.rightPatch && this.rightPatch.ends.LEFT
        );
      }
      case 'DOWN': {
        return !(
          !!this.downPatch && this.downPatch.ends.UP &&
          !!this.leftPatch && this.leftPatch.ends.RIGHT &&
          !!this.rightPatch && this.rightPatch.ends.LEFT
        );
      }
      case 'LEFT': {
        return !(
          !!this.leftPatch && this.leftPatch.ends.RIGHT &&
          !!this.upPatch && this.upPatch.ends.DOWN &&
          !!this.downPatch && this.downPatch.ends.UP
        );
      }
      case 'RIGHT': {
        return !(
          !!this.rightPatch && this.rightPatch.ends.LEFT &&
          !!this.upPatch && this.upPatch.ends.DOWN &&
          !!this.downPatch && this.downPatch.ends.UP
        );
      }
    }
  }

  get type() {
    return PatchType.TeeTear;
  }

  get imageUrl() {
    return `assets/patches/tee-tear/${this.isConnected ? 'connected' : 'disconnected'}.svg`;
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

  clone(): TeeTearPatch {
    return new TeeTearPatch(this.orientation);
  }

}
