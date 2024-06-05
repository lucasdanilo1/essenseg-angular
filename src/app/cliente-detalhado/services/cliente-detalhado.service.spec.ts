import { TestBed } from '@angular/core/testing';

import { ClienteDetalhadoService } from './cliente-detalhado.service';

describe('ClienteDetalhadoService', () => {
  let service: ClienteDetalhadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteDetalhadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
