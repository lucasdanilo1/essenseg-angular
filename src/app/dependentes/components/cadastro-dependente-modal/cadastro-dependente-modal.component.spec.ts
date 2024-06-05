import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDependenteModalComponent } from './cadastro-dependente-modal.component';

describe('CadastroDependenteModalComponent', () => {
  let component: CadastroDependenteModalComponent;
  let fixture: ComponentFixture<CadastroDependenteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroDependenteModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastroDependenteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
