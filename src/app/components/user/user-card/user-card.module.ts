import { NgModule } from '@angular/core';
import { UserCardComponent } from './user-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [UserCardComponent],
  imports: [MatIconModule, MatButtonModule],
  exports: [UserCardComponent],
})
export class UserCardModule {}
