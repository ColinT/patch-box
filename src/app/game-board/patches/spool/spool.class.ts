import { Patch, PatchType } from '../patch.class';

export class SpoolPatch extends Patch {
  constructor(orientation?: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') {
    super();
    // Initialize with a read only orientation
    // TODO make sure spool has a valid spawn orientation
    const possibleOrientations = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
    // this._orientation = possibleOrientations[Math.floor(Math.random() * possibleOrientations.length)];
    // For demonstration purposes, always make the spool face right
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
    return PatchType.Spool;
  }

  get imageUrl() {
    return 'https://yppedia.puzzlepirates.com/images/0/08/Official-Patchingspool.png';
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
    // The spool cannot be rotated
  }

  rotateCcw() {
    // The spool cannot be rotated, instead it has different behaviour for left clicks
    this.submitSolution.emit();
    /**
     * if no loose ends {
     *   if tieoffs connected {
     *     complete
     *   } else {
     *     convert grommets to line-tears (unravel)
     *     reset gust meter
     *   }
     * } else {
     *   throw incomplete error
     * }
     */
  }

  clone(): SpoolPatch {
    return new SpoolPatch(this.orientation);
  }

}
