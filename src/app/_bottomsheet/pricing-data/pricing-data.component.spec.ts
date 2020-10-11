import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingDataComponent } from './pricing-data.component';

describe('PricingDataComponent', () => {
  let component: PricingDataComponent;
  let fixture: ComponentFixture<PricingDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
