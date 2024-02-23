import { NgModule } from '@angular/core';
import { CardNumberPageComponent } from './card-number-page.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CardNumberPageComponent],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    CommonModule,
  ],
  exports: [CardNumberPageComponent],
})
export class CardNumberPageModule {}
