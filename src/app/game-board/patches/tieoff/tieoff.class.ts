import { Patch, PatchType } from '../patch.class';

export class TieoffPatch extends Patch {
  constructor(orientation?: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') {
    super();
    // Initialize with a read only orientation
    // TODO make sure tieoff has a valid spawn orientation
    const possibleOrientations = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
    // this._orientation = possibleOrientations[Math.floor(Math.random() * possibleOrientations.length)];
    // For demonstration purposes, always make the tieoff face right
    this._orientation = orientation || possibleOrientations[3];
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
    return PatchType.Tieoff;
  }

  get imageUrl() {
    return `assets/patches/tieoff/${this.isConnected ? 'connected' : 'disconnected'}.svg`;
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
    // The tieoff cannot be rotated
  }

  rotateCcw() {
    // The tieoff cannot be rotated
  }

  clone(): TieoffPatch {
    return new TieoffPatch(this.orientation);
  }

}
