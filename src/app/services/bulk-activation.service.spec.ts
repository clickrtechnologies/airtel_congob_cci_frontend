import { TestBed } from '@angular/core/testing';

import { BulkActivationService } from './bulk-activation.service';

describe('BulkActivationService', () => {
  let service: BulkActivationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BulkActivationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
