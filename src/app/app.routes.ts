import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { UserEditPageComponent } from './components/user/user-edit-page/user-edit-page.component';
import { UserPageComponent } from './components/user/user-page/user-page.component';
import { BankAccountPageComponent } from './components/bank-account/bank-account-page/bank-account-page.component';
import { DepositPageComponent } from './components/bank-account/deposit/deposit-page/deposit-page.component';
import { BankEmuPageComponent } from './components/bank-emu/bank-emu-page/bank-emu-page.component';
import { CreditPageComponent } from './components/bank-account/credit/credit-page/credit-page.component';
import { AtmComponent } from './components/atm/atm.component';
import { PinPageComponent } from './components/atm/pin-page/pin-page.component';
import { CardNumberPageComponent } from './components/atm/card-number-page/card-number-page.component';
import { AtmAccountComponent } from './components/atm/account/atm-account.component';
import { AuthorPageComponent } from './components/author-page/author-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePageComponent,
    loadChildren: () =>
      import('./components/home-page/home-page.module').then(
        (m) => m.HomePageModule
      ),
  },
  {
    path: 'user-page',
    component: UserPageComponent,
    loadChildren: () =>
      import('./components/user/user-page/user-page.module').then(
        (m) => m.UserPageModule
      ),
  },
  {
    path: 'user',
    children: [
      {
        path: ':id',
        component: UserEditPageComponent,
        loadChildren: () =>
          import('./components/user/user-edit-page/user-edit-page.module').then(
            (m) => m.UserEditPageModule
          ),
      },
    ],
  },

  {
    path: 'deposit',
    children: [
      {
        path: ':id',
        component: DepositPageComponent,
        loadChildren: () =>
          import(
            './components/bank-account/deposit/deposit-page/deposit-page.module'
          ).then((m) => m.DepositPageModule),
      },
    ],
  },
  {
    path: 'credit',
    children: [
      {
        path: ':id',
        component: CreditPageComponent,
        loadChildren: () =>
          import(
            './components/bank-account/credit/credit-page/credit-page.module'
          ).then((m) => m.CreditPageModule),
      },
    ],
  },
  {
    path: 'bank-account-page',
    component: BankAccountPageComponent,
    loadChildren: () =>
      import(
        './components/bank-account/bank-account-page/bank-account-page.module'
      ).then((m) => m.BankAccountPageModule),
  },
  {
    path: 'bank-emu',
    component: BankEmuPageComponent,
    loadChildren: () =>
      import('./components/bank-emu/bank-emu-page/bank-emu-page.module').then(
        (m) => m.BankEmuPageModule
      ),
  },
  {
    path: 'atm',
    component: AtmComponent,
    children: [
      {
        path: 'pin',
        component: PinPageComponent,
        loadChildren: () =>
          import('./components/atm/pin-page/pin-page.module').then(
            (m) => m.PinPageModule
          ),
      },
      {
        path: 'card-number',
        component: CardNumberPageComponent,
        loadChildren: () =>
          import(
            './components/atm/card-number-page/card-number-page.module'
          ).then((m) => m.CardNumberPageModule),
      },
      {
        path: 'account',
        component: AtmAccountComponent,
        loadChildren: () =>
          import('./components/atm/account/atm-account.module').then(
            (m) => m.AtmAccountModule
          ),
      },
    ],
  },
  {
    path: 'author',
    component: AuthorPageComponent,
    loadChildren: () =>
      import('./components/author-page/author-page.module').then(
        (m) => m.AuthorPageModule
      ),
  },
];
