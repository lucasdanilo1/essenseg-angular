import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaDetalhadaComponent } from './empresa-detalhada.component';

describe('EmpresaDetalhadaComponent', () => {
  let component: EmpresaDetalhadaComponent;
  let fixture: ComponentFixture<EmpresaDetalhadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresaDetalhadaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpresaDetalhadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
