import { Component, inject, OnInit, signal } from '@angular/core';
import { DinamicCard } from "../dinamic-card/dinamic-card";
import { AuthService } from '../../auth/service/login-service/auth.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [DinamicCard, NgClass],
  templateUrl: './header.html',
})
export class Header implements OnInit {

  authService = inject(AuthService);
  isOpen = signal(false);
  isLoggedIn = signal(false)

  ngOnInit(): void {
    const customerLogged = this.authService.getCustomer();
    if (customerLogged) {
      this.isLoggedIn.set(true)
    }
  }



  toggleIsMenuMobile() {
    this.isOpen.update((current) => !current);
  }
}
