import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GameBoardModule } from './game-board/game-board.module';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        GameBoardModule,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeDefined();
  });
});
