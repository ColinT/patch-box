import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameBoardComponent } from './game-board.component';
import { PatchComponent } from './patches/patch.component';

@NgModule({
  declarations: [
    GameBoardComponent,
    PatchComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    GameBoardComponent,
  ],
})
export class GameBoardModule { }
