import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [HomePageComponent],
  imports: [MatGridListModule, CommonModule],
})
export class HomePageModule {}
