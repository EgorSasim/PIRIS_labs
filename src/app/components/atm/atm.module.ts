import { NgModule } from '@angular/core';
import { AtmComponent } from './atm.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AtmComponent],
  imports: [MatIconModule, MatButtonModule, RouterModule, MatButtonModule],
})
export class AtmModule {}
