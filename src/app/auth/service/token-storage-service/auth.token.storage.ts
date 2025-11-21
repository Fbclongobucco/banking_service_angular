import { Inject, Injectable } from '@angular/core';
import { LocalStorageToken } from '../../tokens/local.storage';
import { UserLoggedDTO } from '../../../models/customer/dtos/userlogged-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthTokenStorage {

  private readonly key: string = "access_token";
  private readonly refreshKey: string = "refresh_token";
  constructor(@Inject(LocalStorageToken) private localStorageToken: Storage) { }

  setAccessToken(token: string): void {
    this.localStorageToken.setItem(this.key, token);
  }

  getAccessToken(): string | null {
    return this.localStorageToken.getItem(this.key);
  }

  setRefreshToken(token: string): void {
    this.localStorageToken.setItem(this.refreshKey, token);
  }

  getRefreshToken(): string | null {
    return this.localStorageToken.getItem(this.refreshKey);
  }

  setUserLogged(customer: UserLoggedDTO): void {
    this.localStorageToken.setItem('customer', JSON.stringify(customer));
  }

  getUserLogged(): UserLoggedDTO | null {
    const customer = this.localStorageToken.getItem('customer');
    return customer ? JSON.parse(customer) : null;
  }

  clear(): void {
    this.localStorageToken.removeItem(this.key);
    this.localStorageToken.removeItem(this.refreshKey);
    this.localStorageToken.removeItem('customer');
  }

}
