import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingTableReducedComponent } from './drawing-table-reduced.component';

describe('DrawingTableReducedComponent', () => {
  let component: DrawingTableReducedComponent;
  let fixture: ComponentFixture<DrawingTableReducedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawingTableReducedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawingTableReducedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
