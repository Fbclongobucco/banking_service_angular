import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/service/login-service/auth.service';
import { faEnvelope, faLock, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './login.html',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  forgotPasswordOpen = signal(false);

  faEnvelope = faEnvelope;
  faLock = faLock;
  faClose = faClose;

  private emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  loginForm: FormGroup = this.fb.group({
    email: ['', [
      Validators.required, 
      Validators.pattern(this.emailPattern)
    ]],
    password: ['', [
      Validators.required, 
      Validators.minLength(6)
    ]]
  });

  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }


    const credentials = this.loginForm.getRawValue();

    this.authService.login(credentials).subscribe({
      next: () => {
        this.authService.getCustomer?.(); 
        this.router.navigate(['/dashboard']);
        
        this.loginForm.reset();
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.loginForm.get('password')?.reset();
      }
    });
  }

  forgotPassword() {
   this.forgotPasswordOpen.set(true);
  }

  closeForgotPassword() {
    this.forgotPasswordOpen.update((current) => !current);
  }
}