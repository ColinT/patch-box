import { Patch, PatchType } from '../patch.class';

export class BlockerPatch extends Patch {
  constructor() {
    super();
  }

  get ends() {
    return {
      'UP': false,
      'DOWN': false,
      'LEFT': false,
      'RIGHT': false,
    };
  }

  get isLoose() {
    return false;
  }

  get type() {
    return PatchType.Blocker;
  }

  get imageUrl() {
    return `assets/patches/blocker/disconnected.svg`;
  }

  readonly rotation = 0;

  rotateCw() {
    // Blockers cannot be rotated
  }

  rotateCcw() {
    // Blockers cannot be rotated
  }

  clone(): BlockerPatch {
    return new BlockerPatch();
  }
}
