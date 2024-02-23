import { NgModule } from '@angular/core';
import { BankAccountCardComponent } from './bank-account-card.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [BankAccountCardComponent],
  imports: [CommonModule],
  exports: [BankAccountCardComponent],
})
export class BankAccountCardModule {}
