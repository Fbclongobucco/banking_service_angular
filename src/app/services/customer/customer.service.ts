import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerResponseDTO } from '../../models/customer/dtos/customer-response-dto';
import { Customer } from '../../models/customer/entities/customer';
import { map, Observable } from 'rxjs';
import { RegisterRequestDto } from '../../models/customer/dtos/register-request-dto';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<CustomerResponseDTO>(`http://localhost:8080/customers/${id}`)
      .pipe(
        map((response: CustomerResponseDTO) => ({
          id: response.id,
          name: response.name,
          email: response.email,
          cpf: response.cpf,
          phone: response.phone,
          account: {
            id: response.account.id,
            accountNumber: response.account.accountNumber,
            balance: response.account.balance,
            creditLimit: response.account.creditLimit,
            pixKey: response.account.pixKey ? response.account.pixKey : "sem chave cadastrada",
            card: {
              id: response.account.card.id,
              cardNumber: response.account.card.cardNumber,
              cvv: response.account.card.cvv,
              expirationDate: response.account.card.expirationDate
            }
          }
        }))
      );
  }

  register(customer: RegisterRequestDto ) {
    return this.http.post<CustomerResponseDTO>('http://localhost:8080/customers', customer);
  }

}
