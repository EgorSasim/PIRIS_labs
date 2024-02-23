import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BankEmuPageService } from './bank-emu-page.service';
import { Router } from '@angular/router';
import { DepositType } from '../../bank-account/deposit/deposit.typings';
import { CurrencyType } from '../../../common/typings/currency.typings';
import { Observable, ReplaySubject } from 'rxjs';
import { DepositContractWithAccounts } from '../../bank-account/deposit/deposit-page/deposit-page.typings';
import { CreditContractWithAccounts } from '../../bank-account/credit/credit-page/credit-page.typings';

@Component({
  selector: 'app-bank-emu-page',
  templateUrl: './bank-emu-page.component.html',
  styleUrl: './bank-emu-page.component.scss',
  providers: [BankEmuPageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BankEmuPageComponent {
  public readonly currentDate$ = this.bankEmuPageService.currentDate$;
  public readonly bankAccountVal$ = this.bankEmuPageService.bankAccountVal$;
  public readonly isLoading$ = this.bankEmuPageService.isLoading$;
  public readonly totalDebits$ = this.bankEmuPageService.totalDebits$;
  public readonly totalCredits$ = this.bankEmuPageService.totalCredits$;

  public depositContractsWithAccounts$: Observable<
    DepositContractWithAccounts[]
  > = this.bankEmuPageService.depositContractWithAccounts$;
  public creditContractsWithAccounts$: Observable<
    CreditContractWithAccounts[]
  > = this.bankEmuPageService.creditContractWithAccounts$;

  constructor(
    private bankEmuPageService: BankEmuPageService,
    private router: Router
  ) {
    this.bankEmuPageService.calculateInitialValues();
  }

  public goToHomePage(): void {
    this.router.navigate(['home']);
  }

  public handleTick(): void {
    this.bankEmuPageService.recalculateValues();
  }
}
