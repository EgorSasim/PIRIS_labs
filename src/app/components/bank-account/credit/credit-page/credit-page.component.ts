import { Router } from '@angular/router';
import { CreditPageService } from './credit-page.service';
import { Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CreditContractWithAccounts } from './credit-page.typings';
import { getMonthDifference } from '../../../../common/helpers/dates';

@Component({
  selector: 'app-credit-page',
  templateUrl: './credit-page.component.html',
  styleUrl: './credit-page.component.scss',
  providers: [CreditPageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreditPageComponent {
  public creditData$: Observable<CreditContractWithAccounts> =
    this.creditPageService.handleCreditIdChange();

  constructor(
    private creditPageService: CreditPageService,
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
}
