import { TestBed } from '@angular/core/testing';

import { ListaSeguradosService } from './lista-segurados.service';

describe('ListaSeguradosService', () => {
  let service: ListaSeguradosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaSeguradosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
