import { TestBed } from '@angular/core/testing';

import { ImmopricingService } from './immopricing.service';

describe('ImmopricingService', () => {
  let service: ImmopricingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImmopricingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
