export abstract class Patch {

  public upPatch: Patch | void;
  public downPatch: Patch | void;
  public leftPatch: Patch | void;
  public rightPatch: Patch | void;

  // Whether or not each side of the patch is open (true) or closed (false), e.g. a Cross-Tear would have true for all sides
  abstract ends: {
    'UP': boolean,
    'DOWN': boolean,
    'LEFT': boolean,
    'RIGHT': boolean,
  };
  public readonly abstract isLoose: boolean; // Whether the patch has any loose ends
  public readonly abstract type: PatchType; // The type of patch
  public readonly abstract imageUrl: string; // Path to patch image
  public readonly abstract rotation: 0 | 90 | 180 | 270; // Degrees to rotate the image

  // Whether the patch is connected to the spool (directly or indirectly). Controlled by the game board.
  public isConnected: boolean;

  // Whether or not each side of the patch is tied up (not loose)
  public get tiedEnds() {
    return {
      'UP': !!this.upPatch && this.ends.UP && this.upPatch.ends.DOWN,
      'DOWN': !!this.downPatch && this.ends.DOWN && this.downPatch.ends.UP,
      'LEFT': !!this.leftPatch && this.ends.LEFT && this.leftPatch.ends.RIGHT,
      'RIGHT': !!this.rightPatch && this.ends.RIGHT && this.rightPatch.ends.LEFT,
    };
  }

  public abstract rotateCw(): void; // Rotate clockwise
  public abstract rotateCcw(): void; // Rotate counterclockwise
  public abstract clone(): Patch;

}

export enum PatchType {
  Spool = 'SPOOL',
  Tieoff = 'TIEOFF',
  Blocker = 'BLOCKER',
  Grommet = 'GROMMET',
  LineTear = 'LINE',
  CornerTear = 'CORNER',
  TeeTear = 'TEE',
  CrossTear = 'CROSS',
  Border = 'BORDER',
}
