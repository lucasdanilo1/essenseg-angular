import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFiltrosComponent } from './card-filtros.component';

describe('CardFiltrosComponent', () => {
  let component: CardFiltrosComponent;
  let fixture: ComponentFixture<CardFiltrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardFiltrosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardFiltrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
