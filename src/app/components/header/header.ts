import { Component, inject, OnInit, signal } from '@angular/core';
import { DinamicCard } from "../dinamic-card/dinamic-card";
import { AuthService } from '../../auth/service/login-service/auth.service';

@Component({
  selector: 'app-header',
  imports: [DinamicCard],
  templateUrl: './header.html',
})
export class Header implements OnInit {

  authService = inject(AuthService);
  isOpen = signal(false);
  isLoggedIn = signal(false)
  
    ngOnInit(): void {

    this.authService.customer$.subscribe((user) => {
      this.isLoggedIn.set(!!user);
    });
    
  }


  toggleIsMenuMobile() {
    this.isOpen.update((current) => !current);
  }
}
