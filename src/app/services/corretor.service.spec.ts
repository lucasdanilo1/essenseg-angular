import { TestBed } from '@angular/core/testing';

import { CorretorService } from './corretor.service';

describe('CorretorService', () => {
  let service: CorretorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorretorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
