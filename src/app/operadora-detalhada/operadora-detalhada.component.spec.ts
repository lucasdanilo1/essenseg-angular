import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperadoraDetalhadaComponent } from './operadora-detalhada.component';

describe('OperadoraDetalhadaComponent', () => {
  let component: OperadoraDetalhadaComponent;
  let fixture: ComponentFixture<OperadoraDetalhadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperadoraDetalhadaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OperadoraDetalhadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
