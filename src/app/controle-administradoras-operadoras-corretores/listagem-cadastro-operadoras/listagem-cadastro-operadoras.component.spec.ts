import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemCadastroOperadorasComponent } from './listagem-cadastro-operadoras.component';

describe('ListagemCadastroOperadorasComponent', () => {
  let component: ListagemCadastroOperadorasComponent;
  let fixture: ComponentFixture<ListagemCadastroOperadorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListagemCadastroOperadorasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListagemCadastroOperadorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
