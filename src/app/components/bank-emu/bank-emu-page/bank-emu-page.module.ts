import { NgModule } from '@angular/core';
import { BankEmuPageComponent } from './bank-emu-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [BankEmuPageComponent],
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
})
export class BankEmuPageModule {}
