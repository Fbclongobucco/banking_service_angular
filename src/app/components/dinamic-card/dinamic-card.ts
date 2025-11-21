import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../auth/service/login-service/auth.service';
import { Customer } from '../../models/customer/entities/customer';
import { Router, NavigationEnd } from '@angular/router';
import { NgClass } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dinamic-card',
  standalone: true,
  templateUrl: './dinamic-card.html',
  imports: [NgClass],
})
export class DinamicCard implements OnInit {

  customer: Customer | null = null;
  isRegisterLocator = signal(false);

  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit() {
    this.authService.customer$.subscribe((user) => {
      this.customer = user;
    });

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.isRegisterLocator.set(event.url === '/register');
      });

    this.isRegisterLocator.set(this.router.url === '/register');
  }

  logout() {
    this.authService.logout();
    this.customer = null;
    this.router.navigate(['/']);
  }
}
