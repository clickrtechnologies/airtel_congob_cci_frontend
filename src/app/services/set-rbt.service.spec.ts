import { TestBed } from '@angular/core/testing';

import { SetRbtService } from './set-rbt.service';

describe('SetRbtService', () => {
  let service: SetRbtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetRbtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
