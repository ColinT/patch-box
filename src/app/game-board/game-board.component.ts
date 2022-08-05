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
    setTimeout(() => {
      this.updateConnections(this.board);
    });
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
        // It is faster to clone the patches for change detection updates
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

  spreadConnections(patch: Patch, checkedList?: Patch[]): void {
    if (!checkedList) {
      checkedList = [];
    }
    checkedList.push(patch);

    patch.isConnected = true;
    // Spread upwards
    if (!!patch.upPatch && !checkedList.includes(patch.upPatch) && !!patch.tiedEnds.UP) {
      this.spreadConnections(patch.upPatch, checkedList);
    }
    // Spread downwards
    if (!!patch.downPatch && !checkedList.includes(patch.downPatch) && !!patch.tiedEnds.DOWN) {
      this.spreadConnections(patch.downPatch, checkedList);
    }
    // Spread leftwards
    if (!!patch.leftPatch && !checkedList.includes(patch.leftPatch) && !!patch.tiedEnds.LEFT) {
      this.spreadConnections(patch.leftPatch, checkedList);
    }
    // Spread rightwards
    if (!!patch.rightPatch && !checkedList.includes(patch.rightPatch) && !!patch.tiedEnds.RIGHT) {
      this.spreadConnections(patch.rightPatch, checkedList);
    }
  }

  checkSubmission() {
    // TODO implement unravelling if no loose ends but not all tieoffs are included

    // Check if all connected ends are tied (not loose) and all tieoffs are included
    if (this.checkLooseConnections(this.board.spool) && this.checkTieoffConnections(this.board)) {
      this._board = new GameBoard();
      setTimeout(() => {
        this.updateConnections(this.board);
      });
    }
  }

  /**
   * Recursive check for whether or not all connected (spooled) patches are tied up (not loose)
   * @param patch Patch to start at (should be the spool)
   * @param checkedList List of alrady traced patches to prevent infinite loop
   */
  checkLooseConnections(patch: Patch, checkedList?: Patch[]): boolean {
    if (!checkedList) {
      checkedList = [];
    }

    checkedList.push(patch);

    if (!patch.isConnected) {
      return false;
    } else if (patch.isLoose) {
      return false;
    } else {
      // Check upwards
      if (!!patch.upPatch && !checkedList.includes(patch.upPatch) && !!patch.tiedEnds.UP
        && !this.checkLooseConnections(patch.upPatch, checkedList)) {
        return false;
      }
      // Check downwards
      if (!!patch.downPatch && !checkedList.includes(patch.downPatch) && !!patch.tiedEnds.DOWN
        && !this.checkLooseConnections(patch.downPatch, checkedList)) {
        return false;
      }
      // Check downwards
      if (!!patch.leftPatch && !checkedList.includes(patch.leftPatch) && !!patch.tiedEnds.LEFT
        && !this.checkLooseConnections(patch.leftPatch, checkedList)) {
        return false;
      }
      // Check rightwards
      if (!!patch.rightPatch && !checkedList.includes(patch.rightPatch) && !!patch.tiedEnds.RIGHT
        && !this.checkLooseConnections(patch.rightPatch, checkedList)) {
        return false;
      }
      // All sides connected and tied
      return true;
    }
  }

  /**
   * Checks if all the tieoffs on the board are connected
   * @param board The board to check
   */
  checkTieoffConnections(board: GameBoard): boolean {
    for (const tieoff of board.patches.filter(patch => patch.type === PatchType.Tieoff)) {
      if (!tieoff.isConnected) {
        return false;
      }
    }
    return true;
  }

}
