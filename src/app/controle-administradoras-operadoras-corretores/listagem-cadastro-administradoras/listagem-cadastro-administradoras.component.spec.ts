import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemCadastroAdministradorasComponent } from './listagem-cadastro-administradoras.component';

describe('ListagemCadastroAdministradorasComponent', () => {
  let component: ListagemCadastroAdministradorasComponent;
  let fixture: ComponentFixture<ListagemCadastroAdministradorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListagemCadastroAdministradorasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListagemCadastroAdministradorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
