import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AuthorPageComponent } from './author-page.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AuthorPageComponent],
  imports: [MatCardModule, MatButtonModule],
})
export class AuthorPageModule {}
