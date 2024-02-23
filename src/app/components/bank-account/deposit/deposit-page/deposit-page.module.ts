import { NgModule } from '@angular/core';
import { DepositPageComponent } from './deposit-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [DepositPageComponent],
  imports: [
    MatButtonModule,
    MatCardModule,
    CommonModule,
    MatIconModule,
    MatListModule,
  ],
})
export class DepositPageModule {}
