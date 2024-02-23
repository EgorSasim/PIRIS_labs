import { NgModule } from '@angular/core';
import { CreditPageComponent } from './credit-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [CreditPageComponent],
  imports: [
    MatButtonModule,
    MatCardModule,
    CommonModule,
    MatIconModule,
    MatListModule,
  ],
  exports: [CreditPageComponent],
})
export class CreditPageModule {}
