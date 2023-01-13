import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasAndSideToolbarComponent } from './canvas-and-side-toolbar.component';

describe('CanvasAndSideToolbarComponent', () => {
  let component: CanvasAndSideToolbarComponent;
  let fixture: ComponentFixture<CanvasAndSideToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasAndSideToolbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanvasAndSideToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
