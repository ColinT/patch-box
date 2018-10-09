import { Patch, PatchType } from '../patch.class';

export class CrossTearPatch extends Patch {
  constructor() {
    super();
  }

  get ends() {
    return {
      'UP': true,
      'DOWN': true,
      'LEFT': true,
      'RIGHT': true,
    };
  }

  get isLoose() {
    return !(
      (this.upPatch && this.upPatch.ends.DOWN && this.downPatch && this.downPatch.ends.UP) &&
      (this.downPatch && this.downPatch.ends.UP && this.upPatch && this.upPatch.ends.DOWN) &&
      (this.leftPatch && this.leftPatch.ends.RIGHT && this.rightPatch && this.rightPatch.ends.LEFT) &&
      (this.rightPatch && this.rightPatch.ends.LEFT && this.leftPatch && this.leftPatch.ends.RIGHT)
    );
  }

  get type() {
    return PatchType.CrossTear;
  }

  get imageUrl() {
    return `assets/patches/cross-tear/${this.isConnected ? 'connected' : 'disconnected'}.svg`;
  }

  get rotation(): 0 {
    return 0;
  }

  rotateCw() {
    // Cross tears cannot be rotated
  }

  rotateCcw() {
    // Cross tears cannot be rotated
  }

  clone(): CrossTearPatch {
    return new CrossTearPatch();
  }
}
