import { BehaviorSubject, tap } from 'rxjs';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthTokenStorage } from '../token-storage-service/auth.token.storage';
import { isPlatformBrowser } from '@angular/common';
import { LoginResponseDTO } from '../../../models/customer/dtos/login-response-dto';
import { UserLoggedDTO } from '../../../models/customer/dtos/userlogged-dto';


@Injectable({ providedIn: 'root' })
export class AuthService {

  private API = 'http://localhost:8080';
  private isBrowser: boolean;

  private subject = new BehaviorSubject<UserLoggedDTO | null>(null);
  customer$ = this.subject.asObservable();

  constructor(
    private http: HttpClient,
    private authStorageToken: AuthTokenStorage,
    @Inject(PLATFORM_ID) platformId: object 
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      const customer = this.authStorageToken.getUserLogged();
      this.subject.next(customer);
    }
  }

  login(credentials: { email: string; password: string }) {
    return this.http.post<LoginResponseDTO>(`${this.API}/auth/login`, credentials).pipe(
      tap((response) => {
        if (this.isBrowser) {
          this.authStorageToken.setAccessToken(response.token);
          this.authStorageToken.setRefreshToken(response.refreshToken);
          this.authStorageToken.setUserLogged(response.userLogged);
          this.subject.next(response.userLogged);
        }
      })
    );
  }

  logout() {
    if (this.isBrowser) {
      this.authStorageToken.clear();
      this.subject.next(null); 
    }
  }

  getCustomer() {
    return this.subject.value;
  }
}
