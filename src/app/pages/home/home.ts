import { Component, inject, OnInit } from '@angular/core';

import { AuthService } from '../../auth/service/login-service/auth.service';
import { Customer } from '../../models/customer/entities/customer';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
})
export class Home implements OnInit {

  user: Customer | null = null;

 authService = inject(AuthService);
 router = inject(Router);

  ngOnInit() {
    this.user = this.authService.getCustomer();
    
    if (this.user) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
