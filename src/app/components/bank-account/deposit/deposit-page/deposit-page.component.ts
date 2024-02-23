import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DepositPageService } from './deposit-page.service';
import { DepositContractWithAccounts } from './deposit-page.typings';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { getMonthDifference } from '../../../../common/helpers/dates';

@Component({
  selector: 'app-deposit-page',
  templateUrl: './deposit-page.component.html',
  styleUrl: './deposit-page.component.scss',
  providers: [DepositPageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepositPageComponent {
  public depositData$: Observable<DepositContractWithAccounts> =
    this.depositPageService.handleDepositIdChange();

  constructor(
    private depositPageService: DepositPageService,
    private router: Router
  ) {}

  public goToBankAccountPage(): void {
    this.router.navigate(['/bank-account-page']);
  }

  public getDateByTimeStamp(date: Date): Date {
    return new Date(date);
  }

  public getMonthDifference(date: Date): number {
    return getMonthDifference(date, new Date());
  }

  public revoceDeposit(userId: string, id: string): void {
    this.depositPageService.removeDeposit(userId, id).subscribe(() => {
      this.goToBankAccountPage();
    });
  }
}
