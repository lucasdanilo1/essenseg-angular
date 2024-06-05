import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemCadastroCorretoresComponent } from './listagem-cadastro-corretores.component';

describe('ListagemCadastroCorretoresComponent', () => {
  let component: ListagemCadastroCorretoresComponent;
  let fixture: ComponentFixture<ListagemCadastroCorretoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListagemCadastroCorretoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListagemCadastroCorretoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
