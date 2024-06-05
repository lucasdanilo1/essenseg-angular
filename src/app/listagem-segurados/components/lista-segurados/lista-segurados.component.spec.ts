import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSeguradosComponent } from './lista-segurados.component';

describe('ListaSeguradosComponent', () => {
  let component: ListaSeguradosComponent;
  let fixture: ComponentFixture<ListaSeguradosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaSeguradosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaSeguradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
