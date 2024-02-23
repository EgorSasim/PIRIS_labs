import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  BankCreditAccountInfo,
  BankDepositAccountInfo,
} from './bank-account-list.typings';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bank-account-list',
  templateUrl: './bank-account-list.component.html',
  styleUrl: './bank-account-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BankAccountListComponent {
  constructor(private router: Router) {}

  @Input() public depositAccountsInfo: BankDepositAccountInfo[] = [];
  @Input() public creditAccountsInfo: BankCreditAccountInfo[] = [];

  public goToDepositPage(depositId: string, userId: string): void {
    this.router.navigate(['deposit', depositId], { queryParams: { userId } });
  }

  public goToCreditPage(creditId: string, userId: string): void {
    this.router.navigate(['credit', creditId], { queryParams: { userId } });
  }
}
