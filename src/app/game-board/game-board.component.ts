import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';

import { Patch, PatchType } from './patches/patch.class';
import { GameBoard } from './game-board.class';

@Component({
  selector: 'pbx-game-board',
  templateUrl: './game-board.component.html',
})
export class GameBoardComponent implements AfterViewInit {

  constructor() {
    this._board = new GameBoard();
  }

  public get board(): GameBoard { return this._board; }

  @Input() set rows(value: number) {
    this.board.rows = value;
  }
  @Input() set columns(value: number) {
    this.board.columns = value;
  }

  @ViewChild('canvas') canvas: HTMLCanvasElement;

  // Dimensions of a patch img
  public readonly PATCH_WIDTH = 56;
  public readonly PATCH_HEIGHT = 56;

  private _board: GameBoard;

  draggableTypes = [
    PatchType.LineTear,
    PatchType.CornerTear,
    PatchType.TeeTear,
    PatchType.CrossTear,
    PatchType.Grommet,
  ];

  ngAfterViewInit() {
    this.updateConnections(this.board);
  }

  getUpPatchOf(index: number): Patch | void {
    return this.board.patches[index - this.board.columns];
  }

  getDownPatchOf(index: number): Patch | void {
    return this.board.patches[index + this.board.columns];
  }

  getLeftPatchOf(index: number): Patch | void {
    if (index % this.board.columns === 0) {
      return;
    } else {
      return this.board.patches[index - 1];
    }
  }

  getRightPatchOf(index: number): Patch | void {
    if ((index + 1) % this.board.columns === 0) {
      return;
    } else {
      return this.board.patches[index + 1];
    }
  }

  onPatchDrag(event: DragEvent, dragIndex: number) {
    const dragPatch = this.board.patches[dragIndex];
    if (this.draggableTypes.includes(dragPatch.type)) {
      event.dataTransfer.setData('pbx/patch-index', dragIndex + '');
    } else {
      event.preventDefault();
    }
  }

  onPatchDrop(event: DragEvent, dropIndex: number) {
    const dragIndex = parseInt(event.dataTransfer.getData('pbx/patch-index'), 10);

    if (dragIndex === dropIndex) {
      // Interpret drags to the same location as left clicks
      this.board.patches[dragIndex].rotateCcw();
    } else {
      const dragPatch = this.board.patches[dragIndex];
      const dropPatch = this.board.patches[dropIndex];

      if (
        this.draggableTypes.includes(dragPatch.type) &&
        this.draggableTypes.includes(dropPatch.type)
      ) {
        // Swap the patches
        this.board.patches[dragIndex] = dropPatch.clone();
        this.board.patches[dropIndex] = dragPatch.clone();
        setTimeout(() => { // Wait for bindings to update
          this.updateConnections(this.board);
        });
      }
    }
  }

  onPatchDragOver(event: DragEvent, patchIndex: number) {
    if (this.draggableTypes.includes(this.board.patches[patchIndex].type)) {
      event.preventDefault(); // Droppable
    }
  }

  updateConnections(board: GameBoard) {
    board.patches.forEach(patch => patch.isConnected = false);
    const spool = board.spool;
    this.spreadConnections(spool);
  }

  spreadConnections(patch: Patch, fromSide?: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'): void {
    patch.isConnected = true;
    // Spread upwards
    if (!(fromSide === 'UP') && !!patch.upPatch && !!patch.tiedEnds.UP) {
      this.spreadConnections(patch.upPatch, 'DOWN');
    }
    // Spread downwards
    if (!(fromSide === 'DOWN') && !!patch.downPatch && !!patch.tiedEnds.DOWN) {
      this.spreadConnections(patch.downPatch, 'UP');
    }
    // Spread leftwards
    if (!(fromSide === 'LEFT') && !!patch.leftPatch && !!patch.tiedEnds.LEFT) {
      this.spreadConnections(patch.leftPatch, 'RIGHT');
    }
    // Spread rightwards
    if (!(fromSide === 'RIGHT') && !!patch.rightPatch && !!patch.tiedEnds.RIGHT) {
      this.spreadConnections(patch.rightPatch, 'LEFT');
    }
  }

}
