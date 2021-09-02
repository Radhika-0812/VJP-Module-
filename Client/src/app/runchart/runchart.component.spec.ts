import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunchartComponent } from './runchart.component';

describe('RunchartComponent', () => {
  let component: RunchartComponent;
  let fixture: ComponentFixture<RunchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
