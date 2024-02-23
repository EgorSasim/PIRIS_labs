import { NgModule } from '@angular/core';
import { CreateUserModalComponent } from './create-user-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [CreateUserModalComponent],
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
  ],
  exports: [CreateUserModalComponent],
})
export class CreateUserModalModule {}
