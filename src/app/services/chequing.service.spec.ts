import { TestBed } from '@angular/core/testing';

import { ChequingService } from './chequing.service';

describe('ChequingService', () => {
  let service: ChequingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChequingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
