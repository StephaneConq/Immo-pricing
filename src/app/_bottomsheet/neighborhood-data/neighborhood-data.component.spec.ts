import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeighborhoodDataComponent } from './neighborhood-data.component';

describe('NeighborhoodDataComponent', () => {
  let component: NeighborhoodDataComponent;
  let fixture: ComponentFixture<NeighborhoodDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeighborhoodDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeighborhoodDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
