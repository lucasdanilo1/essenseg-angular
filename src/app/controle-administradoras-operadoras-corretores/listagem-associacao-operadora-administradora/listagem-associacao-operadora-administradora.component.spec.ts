import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemAssociacaoOperadoraAdministradoraComponent } from './listagem-associacao-operadora-administradora.component';

describe('ListagemAssociacaoOperadoraAdministradoraComponent', () => {
  let component: ListagemAssociacaoOperadoraAdministradoraComponent;
  let fixture: ComponentFixture<ListagemAssociacaoOperadoraAdministradoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListagemAssociacaoOperadoraAdministradoraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListagemAssociacaoOperadoraAdministradoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
