import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './user-page.component';
import { HeaderModule } from '../../header/header.module';
import { UserCardListModule } from '../user-card-list/user-card-list.module';
import { CreateUserModalModule } from '../create-user-modal/create-user-modal.module';

@NgModule({
  declarations: [UserPageComponent],
  imports: [
    HeaderModule,
    UserCardListModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    CreateUserModalModule,
  ],
})
export class UserPageModule {}
