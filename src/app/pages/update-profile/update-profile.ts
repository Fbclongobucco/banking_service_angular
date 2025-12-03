import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer/customer.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Customer } from '../../models/customer/entities/customer';
import { AuthService } from '../../auth/service/login-service/auth.service';
import { UpdateRequestDto } from '../../models/customer/dtos/update-request-dto';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent} from '@fortawesome/angular-fontawesome';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-update-profile',
  imports: [ReactiveFormsModule, FaIconComponent, NgClass],
  templateUrl: './update-profile.html',
})
export class UpdateProfile implements OnInit {


  service = inject(CustomerService)
  authService = inject(AuthService)
  router = inject(Router)
  customerLogged = signal<Customer | null>(null)
  isSubmitting = signal(false)
  faCloded = faClose

  formRegister = new FormGroup({
    name: new FormControl(this.customerLogged()?.name, [
      Validators.required
    ]),

    phone: new FormControl(this.customerLogged()?.phone, [
      Validators.required,
      Validators.pattern(/^\d+$/),
      Validators.minLength(11),
      Validators.maxLength(11),
    ]),
  });

  ngOnInit(): void {
    const customerLogged = this.authService.getCustomer();

    if (customerLogged) {
      this.service.getCustomer(customerLogged?.id).subscribe((customer) => {
        this.customerLogged.set(customer);
        this.formRegister.patchValue({
          name: customer?.name,
          phone: customer?.phone
        });
      });
    }


  }

  onSubmit() {
    if (this.formRegister.invalid) {
      this.formRegister.markAllAsTouched();
      return;
    }

    const customerUpdateData: UpdateRequestDto = {
      name: this.formRegister.get('name')?.value!,
      phone: this.formRegister.get('phone')?.value!,
    };

    this.service.update(this.customerLogged()!.id, customerUpdateData)
      .subscribe({
        next: () => {
          this.isSubmitting.update(() => true);
        },
        error: (err) => {
          console.error("Erro ao atualizar:", err);
          alert("Erro ao atualizar perfil.");
        }
      });
  }

  closedCardUpdate() {
    this.isSubmitting.update(() => false);
    this.router.navigate(['/dashboard']);
  }


}


