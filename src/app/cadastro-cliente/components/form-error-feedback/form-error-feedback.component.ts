import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-error-feedback',
  standalone: true,
  imports: [],
  templateUrl: './form-error-feedback.component.html',
  styleUrl: './form-error-feedback.component.scss'
})
export class FormErrorFeedbackComponent {

  @Input() errorMessage: string = "";
  @Input() showError: boolean = false;

  shouldShowError(): boolean {
    if(this.showError){
      return true;
    } else{
      return false;
    }
  }
}
