import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { HeaderModule } from './components/header/header.module';
import { UserPageModule } from './components/user/user-page/user-page.module';
import { AtmModule } from './components/atm/atm.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    HeaderModule,
    UserPageModule,
    AtmModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
