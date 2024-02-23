import { NgModule } from '@angular/core';
import { BankAccountPageComponent } from './bank-account-page.component';
import { MatButtonModule } from '@angular/material/button';
import { CreateDepositModalModule } from '../deposit/create-deposit-modal/create-deposit-modal.module';
import { MatIconModule } from '@angular/material/icon';
import { BankAccountListModule } from '../bank-account-list/bank-account-list.module';
import { CommonModule } from '@angular/common';
import { CreateCreditModalModule } from '../credit/create-credit-modal/create-credit-modal.module';

@NgModule({
  declarations: [BankAccountPageComponent],
  imports: [
    MatButtonModule,
    CreateDepositModalModule,
    MatIconModule,
    MatButtonModule,
    BankAccountListModule,
    CommonModule,
    CreateCreditModalModule,
  ],
})
export class BankAccountPageModule {}
