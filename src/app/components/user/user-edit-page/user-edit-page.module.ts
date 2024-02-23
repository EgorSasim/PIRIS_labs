import { NgModule } from '@angular/core';
import { UserEditPageComponent } from './user-edit-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [UserEditPageComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
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
  exports: [UserEditPageComponent],
})
export class UserEditPageModule {
  constructor() {}
}
