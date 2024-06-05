import { TestBed } from '@angular/core/testing';

import { EmpresaDetalhadaService } from './empresa-detalhada.service';

describe('EmpresaDetalhadaService', () => {
  let service: EmpresaDetalhadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpresaDetalhadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
