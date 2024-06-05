import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleAdministradorasOperadorasCorretoresComponent } from './controle-administradoras-operadoras-corretores.component';

describe('ControleAdministradorasOperadorasCorretoresComponent', () => {
  let component: ControleAdministradorasOperadorasCorretoresComponent;
  let fixture: ComponentFixture<ControleAdministradorasOperadorasCorretoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControleAdministradorasOperadorasCorretoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ControleAdministradorasOperadorasCorretoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
