import { Component, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { AccountService } from '../../services/account/account.service';
import { AuthService } from '../../auth/service/login-service/auth.service';
import { Account } from '../../models/account/entity/account';
import { CurrencyPipe, NgClass } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-transfer-account',
  imports: [FaIconComponent, CurrencyPipe, ReactiveFormsModule, NgClass],
  standalone: true,
  templateUrl: './transfer-account.html',
})
export class TransferAccount implements OnInit {

  faClose = faClose
  @Output() closeEvent = new EventEmitter<void>();
  service = inject(AccountService)
  authService = inject(AuthService)
  account = signal<Account | null>(null)
  modalSuccess = signal(false)
  dataTransfer = new FormGroup({
    amount: new FormControl<number | null>(null),
    amountDisplay: new FormControl<string>(''),
    numAccountReceiver: new FormControl(''),
    numDvReceiver: new FormControl('')
  })


  ngOnInit(): void {
    const customerLogged = this.authService.getCustomer();
    if (customerLogged) {
      this.service.getAccountById(customerLogged?.id).subscribe((account) => {
        this.account.set(account);
      });
    }
  }

  onSubmit() {
    const data = this.dataTransfer.getRawValue();
    if (this.account() && data.numAccountReceiver && data.amount) {
      const accountReceiver = data.numAccountReceiver + "-" + data.numDvReceiver
      this.service.transerByNumberAccount(this.account()!.id, accountReceiver, data.amount)
        .subscribe({
          next: () => {
          this.onTransferSuccess(); 
          this.dataTransfer.reset(); 

          setTimeout(() => {
            this.modalSuccess.set(false);
            this.closeEvent.emit();
          }, 2000);
        },
        error: (error) => {
          console.error('Login failed:', error);
        }
      });
    }


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

  onTransferSuccess() {
    this.modalSuccess.update((current) => !current);
  }
  

  onClose() {
    this.closeEvent.emit();
  }

}
