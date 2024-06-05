import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemSeguradosComponent } from './listagem-segurados.component';

describe('ListagemSeguradosComponent', () => {
  let component: ListagemSeguradosComponent;
  let fixture: ComponentFixture<ListagemSeguradosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListagemSeguradosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListagemSeguradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
