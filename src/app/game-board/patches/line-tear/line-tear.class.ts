import { Patch, PatchType } from '../patch.class';

export class LineTearPatch extends Patch {
  constructor(orientation?: 'VERTICAL' | 'HORIZONTAL') {
    super();
    const possibleOrientations: Array<'VERTICAL' | 'HORIZONTAL'> = ['VERTICAL', 'HORIZONTAL'];
    this.orientation = orientation || possibleOrientations[Math.floor(Math.random() * possibleOrientations.length)];
  }

  private orientation: 'VERTICAL' | 'HORIZONTAL';

  get ends() {
    return {
      'UP': this.orientation === 'VERTICAL',
      'DOWN': this.orientation === 'VERTICAL',
      'LEFT': this.orientation === 'HORIZONTAL',
      'RIGHT': this.orientation === 'HORIZONTAL',
    };
  }

  get isLoose() {
    return !(
      (this.orientation === 'VERTICAL' && (this.upPatch && this.upPatch.ends.DOWN && this.downPatch && this.downPatch.ends.UP)) ||
      (this.orientation === 'HORIZONTAL' && (this.leftPatch && this.leftPatch.ends.RIGHT && this.rightPatch && this.rightPatch.ends.LEFT))
    );
  }

  get type() {
    return PatchType.LineTear;
  }

  get imageUrl() {
    return `assets/patches/line-tear/${this.isConnected ? 'connected' : 'disconnected'}.svg`;
  }

  get rotation() {
    switch (this.orientation) {
      case 'HORIZONTAL': return 90;
      case 'VERTICAL': return 0;
    }
  }

  rotateCw() {
    if (this.orientation === 'VERTICAL') {
      this.orientation = 'HORIZONTAL';
    } else {
      this.orientation = 'VERTICAL';
    }
  }

  rotateCcw() {
    this.rotateCw();
  }

  clone(): LineTearPatch {
    return new LineTearPatch(this.orientation);
  }
}
