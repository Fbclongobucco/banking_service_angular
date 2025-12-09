import { Component, inject, OnInit, output, signal, } from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { AccountService } from '../../services/account/account.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccountResponseDTO } from '../../models/account/dtos/account-response-dto';
import { CurrencyPipe} from '@angular/common';
import { AuthService } from '../../auth/service/login-service/auth.service';



@Component({
  selector: 'app-transfer-pix',
  imports: [FaIconComponent, ReactiveFormsModule, CurrencyPipe],
  standalone: true,
  templateUrl: './transfer-pix.html',
})
export class TransferPix implements OnInit {

  service = inject(AccountService)
  authService = inject(AuthService)
  faClose = faClose
  event = output();
  currentAccount = signal<AccountResponseDTO | null>(null)
  accountFound = signal<AccountResponseDTO | null>(null)
  error = signal<boolean>(false)
  modalSearchSucess = signal<boolean>(false)
  modalTransferSucess = signal<boolean>(false)
  confirmTransfer = signal<boolean>(false)
  dataForm = new FormGroup({
    key: new FormControl(''),
  })
  dataTransfer = new FormGroup({
    amount: new FormControl<number>(0),
    amountDisplay: new FormControl<string>('')
  })




  ngOnInit() {
    const accountLogged = this.authService.getCustomer();
    if (accountLogged) {
      this.service.getAccountById(accountLogged?.id).subscribe((account) => {
        this.currentAccount.set(account);
      });
    }
  }

  onClose() {
    this.modalSearchSucess
      .set(false);
    this.error.set(false);
    this.confirmTransfer.set(false);
    this.dataForm.reset();
    this.modalTransferSucess.set(false);
    this.dataTransfer.reset();
    this.reloadAccount();
    this.event.emit();
  }

  onSubmit() {
    const key = this.dataForm.get('key')?.value;
    if (key) {
      this.service.findPixKey(key).subscribe({
        next: (account) => {
          this.accountFound.set(account);
          this.modalSearchSucess
            .set(true);
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

  onTransferRequest() {
    this.confirmTransfer.set(true);

  }

  onConfirmTransfer() {

    const amount = this.dataTransfer.get('amount')?.value;
    if (!this.accountFound() || !amount) {
      this.error.set(true);
      return;
    }

    this.service.transferByPix(this.currentAccount()!.id, this.accountFound()!.pixKey, amount).subscribe({
      next: () => {
        this.modalTransferSucess.set(true);
        this.confirmTransfer.set(false);
        this.dataTransfer.reset();
   

        setTimeout(() => {
            
            this.confirmTransfer.set(false);
            this.dataTransfer.reset();
            this.event.emit();
          }, 111000);

      },
      error: (error) => {
        throw new Error(error);
      }, 
    
    });
  }

  onAmountInput(raw: string) {
    const displayControl = this.dataTransfer.get('amountDisplay');
    const valueControl = this.dataTransfer.get('amount');

    const digits = (raw || '').replaceAll(/\D/g, '');

    if (digits === '') {
      displayControl?.setValue('', { emitEvent: false });
      valueControl?.setValue(null, { emitEvent: false });
      return;
    }

    const numberValue = Number.parseInt(digits, 10) / 100;

    const formatted = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(numberValue);

    displayControl?.setValue(formatted, { emitEvent: false });
    valueControl?.setValue(numberValue, { emitEvent: false });
  }

  private reloadAccount() {
  const accountLogged = this.authService.getCustomer();
  if (!accountLogged) return;

  this.service.getAccountById(accountLogged.id).subscribe(account => {
    this.currentAccount.set(account);
  });
}

}
