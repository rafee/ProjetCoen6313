import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThyroidInfoComponent } from './thyroid-info.component';

describe('ThyroidInfoComponent', () => {
  let component: ThyroidInfoComponent;
  let fixture: ComponentFixture<ThyroidInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThyroidInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThyroidInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
