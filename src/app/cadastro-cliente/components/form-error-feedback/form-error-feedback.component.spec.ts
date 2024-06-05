import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormErrorFeedbackComponent } from './form-error-feedback.component';

describe('FormErrorFeedbackComponent', () => {
  let component: FormErrorFeedbackComponent;
  let fixture: ComponentFixture<FormErrorFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormErrorFeedbackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormErrorFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
