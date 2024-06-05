import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormErrorFeedbackComponent } from '../cadastro-cliente/components/form-error-feedback/form-error-feedback.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormErrorFeedbackComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;

  public submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      login: [null, Validators.required],
      senha: [null, Validators.required]
    })
  }

  login() {

    this.submitted = true;

    const login = this.loginForm.get('login')?.value;
    const senha = this.loginForm.get('senha')?.value;

    this.authService.autenticar(login, senha).subscribe(
      () => {
        this.router.navigateByUrl('/segurados')
      }
    )
  }

}
