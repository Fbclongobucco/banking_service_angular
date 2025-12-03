import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AccountResponseDTO } from '../../models/account/dtos/account-response-dto';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  httpClient = inject(HttpClient);

  getAccountById(id: number) {
    return this.httpClient.get<AccountResponseDTO>(`http://localhost:8080/accounts/${id}`);
  }

  transerByNumberAccount(idOrigin: number, accountNumberDestination: string, value: number) {
    return this.httpClient.post<void>(`http://localhost:8080/accounts/transfer/${idOrigin}`, 
      {
        accountNumber: accountNumberDestination,
        amount: value
      });
  }

  findPixKey(key: string) {
    return this.httpClient.get<AccountResponseDTO>(`http://localhost:8080/accounts/get-by-pix-key/${key}`);
  }
  
}
