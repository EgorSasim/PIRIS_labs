import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { UserCardListComponent } from './user-card-list.component';
import { UserCardModule } from '../user-card/user-card.module';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [UserCardListComponent],
  imports: [MatListModule, UserCardModule, MatDividerModule, CommonModule],
  exports: [UserCardListComponent],
})
export class UserCardListModule {}
