import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer/customer.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { RegisterRequestDto } from '../../models/customer/dtos/register-request-dto';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
})
export class Register {

  service = inject(CustomerService)
  router = inject(Router)

  formRegister = new FormGroup({
    name: new FormControl("", [
      Validators.required
    ]),

    email: new FormControl("", [
      Validators.required,
      Validators.email
    ]),

    cpf: new FormControl("", [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
      Validators.pattern(/^\d+$/),
    ]),

    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
    ]),

    phone: new FormControl("", [
      Validators.required,
      Validators.pattern(/^\d+$/),
      Validators.minLength(11),
      Validators.maxLength(11), 
    ]),
  });


  onSubmit() {
    const newCustomer: RegisterRequestDto = {
      name: this.formRegister.get('name')?.value ?? undefined,
      email: this.formRegister.get('email')?.value ?? undefined,
      password: this.formRegister.get('password')?.value ?? undefined,
      cpf: this.formRegister.get('cpf')?.value ?? undefined,
      phone: this.formRegister.get('phone')?.value ?? undefined,
    };

    this.service.register(newCustomer).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }
}
