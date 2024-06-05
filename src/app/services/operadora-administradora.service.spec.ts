import { TestBed } from '@angular/core/testing';

import { OperadoraAdministradoraService } from './operadora-administradora.service';

describe('OperadoraAdministradoraService', () => {
  let service: OperadoraAdministradoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperadoraAdministradoraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
