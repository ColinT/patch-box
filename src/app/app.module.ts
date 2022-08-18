import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { GameBoardModule } from './game-board/game-board.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    GameBoardModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
