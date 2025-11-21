import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { AuthService } from '../../auth/service/login-service/auth.service';
import { Customer } from '../../models/customer/entities/customer';
import { CustomerService } from '../../services/customer/customer.service';
import { UserLoggedDTO } from '../../models/customer/dtos/userlogged-dto';
import { faUser, faMoneyBillTransfer, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { faPix } from '@fortawesome/free-brands-svg-icons';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [FaIconComponent, CurrencyPipe],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit, OnDestroy {


  customerAuthenticated = signal<UserLoggedDTO | null>(null)
  customerDetails = signal<Customer | null>(null)
  authService = inject(AuthService);
  service = inject(CustomerService);
  router = inject(Router);
  faUser = faUser
  faMoneyBillTransfer = faMoneyBillTransfer
  faPix = faPix
  faCreditCard = faCreditCard


  ngOnInit(): void {
    this.authService.customer$.subscribe((loggedUser) => {
      this.customerAuthenticated.set(loggedUser);

      if (loggedUser) {
        this.service.getCustomer(loggedUser.id).subscribe((customer) => {
          this.customerDetails.set(customer);
        });
      } else {
        this.customerDetails.set(null);
        this.router.navigate(['/']);
      }
    });
  }
  ngOnDestroy(): void {
    this.customerAuthenticated.set(null);
    this.customerDetails.set(null);
    this.authService.logout();
  }
}
