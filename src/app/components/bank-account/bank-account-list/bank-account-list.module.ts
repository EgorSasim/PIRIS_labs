import { NgModule } from '@angular/core';
import { BankAccountListComponent } from './bank-account-list.component';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { BankAccountCardModule } from '../bank-account-card/bank-account-card.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [BankAccountListComponent],
  imports: [
    MatTableModule,
    CommonModule,
    BankAccountCardModule,
    MatDividerModule,
    MatListModule,
  ],
  exports: [BankAccountListComponent],
})
export class BankAccountListModule {}
