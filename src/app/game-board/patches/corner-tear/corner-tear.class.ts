import { Patch, PatchType } from '../patch.class';

export class CornerTearPatch extends Patch {
  constructor(orientation?: 'UPLEFT' | 'UPRIGHT' | 'DOWNLEFT' | 'DOWNRIGHT') {
    super();
    const possibleOrientations: Array<'UPLEFT' | 'UPRIGHT' | 'DOWNLEFT' | 'DOWNRIGHT'> = ['UPLEFT', 'UPRIGHT', 'DOWNLEFT', 'DOWNRIGHT'];
    this.orientation = orientation || possibleOrientations[Math.floor(Math.random() * possibleOrientations.length)];
  }

  private orientation: 'UPLEFT' | 'UPRIGHT' | 'DOWNLEFT' | 'DOWNRIGHT';

  get ends() {
    return {
      'UP': this.orientation === 'UPLEFT' || this.orientation === 'UPRIGHT',
      'DOWN': this.orientation === 'DOWNLEFT' || this.orientation === 'DOWNRIGHT',
      'LEFT': this.orientation === 'UPLEFT' || this.orientation === 'DOWNLEFT',
      'RIGHT': this.orientation === 'UPRIGHT' || this.orientation === 'DOWNRIGHT',
    };
  }

  get isLoose() {
    return !(
      (this.orientation === 'UPLEFT' && (this.upPatch && this.upPatch.ends.DOWN && this.leftPatch && this.leftPatch.ends.RIGHT)) ||
      (this.orientation === 'UPRIGHT' && (this.upPatch && this.upPatch.ends.DOWN && this.rightPatch && this.rightPatch.ends.LEFT)) ||
      (this.orientation === 'DOWNLEFT' && (this.downPatch && this.downPatch.ends.UP && this.leftPatch && this.leftPatch.ends.RIGHT)) ||
      (this.orientation === 'DOWNRIGHT' && (this.downPatch && this.downPatch.ends.UP && this.rightPatch && this.rightPatch.ends.LEFT))
    );
  }

  get type() {
    return PatchType.CornerTear;
  }

  get imageUrl() {
    return `assets/patches/corner-tear/${this.isConnected ? 'connected' : 'disconnected'}.svg`;
  }

  get rotation() {
    switch (this.orientation) {
      case 'UPRIGHT': return 0;
      case 'DOWNRIGHT': return 90;
      case 'DOWNLEFT': return 180;
      case 'UPLEFT': return 270;
    }
  }

  rotateCw() {
    switch (this.orientation) {
      case 'UPRIGHT': this.orientation = 'DOWNRIGHT'; break;
      case 'DOWNRIGHT': this.orientation = 'DOWNLEFT'; break;
      case 'DOWNLEFT': this.orientation = 'UPLEFT'; break;
      case 'UPLEFT': this.orientation = 'UPRIGHT'; break;
    }
  }

  rotateCcw() {
    switch (this.orientation) {
      case 'UPRIGHT': this.orientation = 'UPLEFT'; break;
      case 'DOWNRIGHT': this.orientation = 'UPRIGHT'; break;
      case 'DOWNLEFT': this.orientation = 'DOWNRIGHT'; break;
      case 'UPLEFT': this.orientation = 'DOWNLEFT'; break;
    }
  }

  clone(): CornerTearPatch {
    return new CornerTearPatch(this.orientation);
  }

}
