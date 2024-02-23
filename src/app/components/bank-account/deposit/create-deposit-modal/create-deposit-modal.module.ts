import { NgModule } from '@angular/core';
import { CreateDepositModalComponent } from './create-deposit-modal.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [CreateDepositModalComponent],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [CreateDepositModalComponent],
})
export class CreateDepositModalModule {}
