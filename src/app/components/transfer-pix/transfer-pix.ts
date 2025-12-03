import { Component, inject, OnInit, output, signal,} from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { AccountService } from '../../services/account/account.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccountResponseDTO } from '../../models/account/dtos/account-response-dto';
import { NgClass } from '@angular/common';
import { AuthService } from '../../auth/service/login-service/auth.service';
import { UserLoggedDTO } from '../../models/customer/dtos/userlogged-dto';



@Component({
  selector: 'app-transfer-pix',
  imports: [FaIconComponent, ReactiveFormsModule, NgClass],
  standalone: true,
  templateUrl: './transfer-pix.html',
})
export class TransferPix implements OnInit {

  service = inject(AccountService)
  authService = inject(AuthService)
  faClose = faClose
  event = output();
  currentAccount = signal<AccountResponseDTO| null>(null)
  accountFound = signal<AccountResponseDTO | null>(null)
  error = signal<boolean>(false)
  modalSuccess = signal<boolean>(false)
  dataForm = new FormGroup({
    key: new FormControl(''),
  })


  ngOnInit() {
    const customerLogged = this.authService.getCustomer();
    if (customerLogged) {
      this.service.getAccountById(customerLogged?.id).subscribe((account) => {
        this.currentAccount.set(account);
      });
    }
  }

  onClose() {
    this.dataForm.reset();
    this.modalSuccess.set(false);
    this.error.set(false);
    this.event.emit();
  }

  onSubmit() {
    const key = this.dataForm.get('key')?.value;
    if (key) {
      this.service.findPixKey(key).subscribe({
        next: (account) => {
          this.accountFound.set(account);
          this.modalSuccess.set(true);
          this.dataForm.reset();
        },
        error: (error) => {
          console.error('Account not found!', error);
          this.dataForm.reset();
          this.error.set(true);
        }
      });
    }
  }

}
