import { Patch } from './patches/patch.class';

import { SpoolPatch } from './patches/spool/spool.class';
import { TieoffPatch } from './patches/tieoff/tieoff.class';

import { LineTearPatch } from './patches/line-tear/line-tear.class';
import { CornerTearPatch } from './patches/corner-tear/corner-tear.class';
import { TeeTearPatch } from './patches/tee-tear/tee-tear.class';
import { CrossTearPatch } from './patches/cross-tear/cross-tear.class';
import { GrommetPatch } from './patches/grommet/grommet.class';
import { BlockerPatch } from './patches/blocker/blocker.class';

export class GameBoard {

  // Default board size is 6 by 7
  private _rows = 6;
  public get rows(): number { return this._rows; }
  public set rows(value: number) { this._rows = value; }

  private _columns = 7;
  public get columns(): number { return this._columns; }
  public set columns(value: number) { this._columns = value; }

  private _patches: Patch[];
  public get patches(): Patch[] { return this._patches; }

  // The spool. Currently all boards must have one and only one spool. The spool is used to source connections.
  private _spool: SpoolPatch;
  public get spool(): SpoolPatch { return this._spool; }

  constructor() {
    this._spool = new SpoolPatch();
    this._patches = this.generatePatches(this._spool);
  }

  generatePatches(spool: SpoolPatch): Patch[] { // TODO setup restrictions so that the board is always valid
    const board: Patch[] = [];
    const fillableTypes = [ // Adjust spawn rate via frequency; TODO use a better system for more complex spawn chances
      LineTearPatch, LineTearPatch,
      CornerTearPatch, CornerTearPatch,
      TeeTearPatch, TeeTearPatch,
      CrossTearPatch,
      GrommetPatch,
      BlockerPatch, // Yolo swag
    ];
    for (let index = 0; index < this.rows * this.columns; index++) {
      if (index === 0) {
        board.push(spool);
      } else if (index === this.columns) {
        board.push(new TieoffPatch('RIGHT'));
      } else {
        const random = Math.floor(Math.random() * fillableTypes.length);
        board.push(new (fillableTypes[random] as any));
      }
    }
    return board;
  }

}
