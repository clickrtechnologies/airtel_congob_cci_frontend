import { TestBed } from '@angular/core/testing';

import { SearchTonesService } from './search-tones.service';

describe('SearchTonesService', () => {
  let service: SearchTonesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchTonesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
