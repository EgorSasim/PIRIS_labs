import { ChangeDetectorRef, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  combineLatest,
  defaultIfEmpty,
  forkJoin,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { UserApiService } from '../../../api/user/user-api.service';
import { DepositApiService } from '../../../api/deposit/deposit-api.service';
import { DepositContractWithAccounts } from '../../bank-account/deposit/deposit-page/deposit-page.typings';
import {
  AVERAGE_DAY_PER_MONTH,
  HOUR_PER_DAY,
  MILLISECONDS_PER_SECOND,
  MINUTES_PER_HOUR,
  SECONDS_PER_MINUTE,
} from '../../../common/constants/time';
import { DepositAccountApiService } from '../../../api/deposit/account/account-api.service';
import { DepositPercentageAccount } from '../../../api/deposit/account/account-api.typings';
import { CreditContractWithAccounts } from '../../bank-account/credit/credit-page/credit-page.typings';
import { CreditApiService } from '../../../api/credit/credit-api.service';
import { CreditAccountApiService } from '../../../api/credit/account/account-api.service';
import { CreditPercentageAccount } from '../../../api/credit/account/account-api.typings';

@Injectable()
export class BankEmuPageService {
  public isLoading$: BehaviorSubject<Boolean> = new BehaviorSubject(false);
  private readonly initialBankAccountVal: number = 10_000_000_000;
  public bankAccountVal$: BehaviorSubject<number> = new BehaviorSubject(
    this.initialBankAccountVal
  );
  public currentDate$: BehaviorSubject<Date> = new BehaviorSubject(new Date());
  public depositContractWithAccounts$: ReplaySubject<
    DepositContractWithAccounts[]
  > = new ReplaySubject(1);
  public creditContractWithAccounts$: ReplaySubject<
    CreditContractWithAccounts[]
  > = new ReplaySubject(1);
  public totalCredits$: ReplaySubject<number> = new ReplaySubject(1);
  public totalDebits$: ReplaySubject<number> = new ReplaySubject(1);

  constructor(
    private userApiService: UserApiService,
    private depositApiService: DepositApiService,
    private depositAccountApiService: DepositAccountApiService,
    private creditApiService: CreditApiService,
    private creditAccountApiService: CreditAccountApiService
  ) {}

  public calculateInitialValues(): void {
    this.isLoading$.next(true);
    combineLatest({
      credits: this.calculateInitialCreditValues(),
      deposits: this.calculateInitialDepositValues(),
    }).subscribe(({ credits, deposits }) => {
      this.creditContractWithAccounts$.next(credits);
      this.depositContractWithAccounts$.next(deposits);
      this.calculateBankAccountValue(deposits, credits);
      this.isLoading$.next(false);
    });
  }

  public recalculateValues(): void {
    this.isLoading$.next(true);
    this.increaseCurrentDate();
    combineLatest({
      credits: this.recalculateCreditValues(),
      deposits: this.recalculateDepositValues(),
    }).subscribe(({ credits, deposits }) => {
      this.creditContractWithAccounts$.next(credits);
      this.depositContractWithAccounts$.next(deposits);
      this.calculateBankAccountValue(deposits, credits);
      this.isLoading$.next(false);
    });
  }

  private calculateInitialCreditValues(): Observable<
    CreditContractWithAccounts[]
  > {
    return this.getCreditContractsWithAccounts().pipe(
      switchMap((creditContractsWithAccounts) =>
        forkJoin([
          ...creditContractsWithAccounts.map((creditContractWithAccounts) =>
            this.updateCreditContractAccountsData({
              accounts: {
                ...creditContractWithAccounts.accounts,
                percents: {
                  ...creditContractWithAccounts.accounts.percents,
                  ...this.getCreditPercentAccountInitialAmountAndCredit(
                    creditContractWithAccounts.accounts.main.credit,
                    creditContractWithAccounts.creditContract.credit.percent,
                    creditContractWithAccounts.creditContract.startDate
                  ),
                },
              },
              creditContract: creditContractWithAccounts.creditContract,
            })
          ),
        ]).pipe(defaultIfEmpty([]))
      ),
      switchMap(() => this.getCreditContractsWithAccounts())
    );
  }

  private calculateInitialDepositValues(): Observable<
    DepositContractWithAccounts[]
  > {
    return this.getDepositContractsWithAccounts().pipe(
      switchMap((depositContractsWithAccounts) =>
        forkJoin([
          ...depositContractsWithAccounts.map((depositContractWithAccounts) =>
            this.updateDepositContractAccountsData({
              accounts: {
                ...depositContractWithAccounts.accounts,
                percents: {
                  ...depositContractWithAccounts.accounts.percents,
                  ...this.getDepositPercentAccountInitialAmountAndDebit(
                    depositContractWithAccounts.accounts.main.debit,
                    depositContractWithAccounts.depositContract.deposit.percent,
                    depositContractWithAccounts.depositContract.startDate
                  ),
                },
              },
              depositContract: depositContractWithAccounts.depositContract,
            })
          ),
        ]).pipe(defaultIfEmpty([]))
      ),
      switchMap(() => this.getDepositContractsWithAccounts())
    );
  }

  private recalculateCreditValues(): Observable<CreditContractWithAccounts[]> {
    return this.getCreditContractsWithAccounts().pipe(
      tap(() => this.isLoading$.next(true)),
      switchMap((creditContractsWithAccounts) =>
        forkJoin([
          ...creditContractsWithAccounts.map((creditContractWithAccounts) =>
            this.updateCreditContractAccountsData({
              accounts: {
                ...creditContractWithAccounts.accounts,
                percents: {
                  ...creditContractWithAccounts.accounts.percents,
                  ...this.getCreditPercentAccountTickAmountAndCredit(
                    creditContractWithAccounts.accounts.main.credit,
                    creditContractWithAccounts.creditContract.credit.percent,
                    creditContractWithAccounts.creditContract.startDate,
                    creditContractWithAccounts.accounts.percents
                  ),
                },
              },
              creditContract: creditContractWithAccounts.creditContract,
            })
          ),
        ])
      ),
      switchMap(() => this.getCreditContractsWithAccounts())
    );
  }

  private recalculateDepositValues(): Observable<
    DepositContractWithAccounts[]
  > {
    return this.getDepositContractsWithAccounts().pipe(
      tap(() => this.isLoading$.next(true)),
      switchMap((depositContractsWithAccounts) =>
        forkJoin([
          ...depositContractsWithAccounts.map((depositContractWithAccounts) =>
            this.updateDepositContractAccountsData({
              accounts: {
                ...depositContractWithAccounts.accounts,
                percents: {
                  ...depositContractWithAccounts.accounts.percents,
                  ...this.getDepositPercentAccountTickAmountAndDebit(
                    depositContractWithAccounts.accounts.main.debit,
                    depositContractWithAccounts.depositContract.deposit.percent,
                    depositContractWithAccounts.depositContract.startDate,
                    depositContractWithAccounts.accounts.percents
                  ),
                },
              },
              depositContract: depositContractWithAccounts.depositContract,
            })
          ),
        ])
      ),
      switchMap(() => this.getDepositContractsWithAccounts())
    );
  }

  private getCreditPercentAccountTickAmountAndCredit(
    amount,
    percent,
    startDate,
    prevValue: CreditPercentageAccount
  ): {
    totalAmount: CreditPercentageAccount['totalAmount'];
    credit: CreditPercentageAccount['credit'];
  } {
    if (this.currentDate$.value.getTime() < startDate.getTime()) {
      return { totalAmount: 0, credit: 0 };
    }

    const daysBeforeNow = Math.floor(
      (this.currentDate$.value.getTime() - startDate.getTime()) /
        MILLISECONDS_PER_SECOND /
        SECONDS_PER_MINUTE /
        MINUTES_PER_HOUR /
        HOUR_PER_DAY
    );

    const daysInMonthBeforeNow = daysBeforeNow % AVERAGE_DAY_PER_MONTH;

    if (daysInMonthBeforeNow === 0) {
      return {
        totalAmount: prevValue.totalAmount + prevValue.credit,
        credit: 0,
      };
    }

    const daylyIncome = (amount * percent) / 100 / 12 / AVERAGE_DAY_PER_MONTH;

    return {
      totalAmount: prevValue.totalAmount,
      credit: prevValue.credit + daylyIncome,
    };
  }

  private getDepositPercentAccountTickAmountAndDebit(
    amount,
    percent,
    startDate,
    prevValue: DepositPercentageAccount
  ): {
    totalAmount: DepositPercentageAccount['totalAmount'];
    debit: DepositPercentageAccount['debit'];
  } {
    if (this.currentDate$.value.getTime() < startDate.getTime()) {
      return { totalAmount: 0, debit: 0 };
    }

    const daysBeforeNow = Math.floor(
      (this.currentDate$.value.getTime() - startDate.getTime()) /
        MILLISECONDS_PER_SECOND /
        SECONDS_PER_MINUTE /
        MINUTES_PER_HOUR /
        HOUR_PER_DAY
    );

    const daysInMonthBeforeNow = daysBeforeNow % AVERAGE_DAY_PER_MONTH;

    if (daysInMonthBeforeNow === 0) {
      return { totalAmount: prevValue.totalAmount + prevValue.debit, debit: 0 };
    }

    const daylyIncome = (amount * percent) / 100 / 12 / AVERAGE_DAY_PER_MONTH;

    return {
      totalAmount: prevValue.totalAmount,
      debit: prevValue.debit + daylyIncome,
    };
  }

  private getCreditPercentAccountInitialAmountAndCredit(
    amount: number,
    percent: number,
    startDate: Date
  ): {
    totalAmount: CreditPercentageAccount['totalAmount'];
    credit: CreditPercentageAccount['credit'];
  } {
    if (Date.now() < startDate.getTime()) {
      return { totalAmount: 0, credit: 0 };
    }
    let credit = 0;
    const daysBeforeNow = Math.floor(
      (Date.now() - startDate.getTime()) /
        MILLISECONDS_PER_SECOND /
        SECONDS_PER_MINUTE /
        MINUTES_PER_HOUR /
        HOUR_PER_DAY
    );
    const daysInMonthBeforeNow = daysBeforeNow % AVERAGE_DAY_PER_MONTH;
    const monthsBeforeNow = Math.floor(daysBeforeNow / AVERAGE_DAY_PER_MONTH);
    const totalAmount =
      monthsBeforeNow * AVERAGE_DAY_PER_MONTH * ((amount * percent) / 100);

    for (let i = 0; i < daysInMonthBeforeNow; ++i) {
      credit += (amount * percent) / 100 / 12 / AVERAGE_DAY_PER_MONTH;
    }

    return { credit, totalAmount };
  }

  private getDepositPercentAccountInitialAmountAndDebit(
    amount: number,
    percent: number,
    startDate: Date
  ): {
    totalAmount: DepositPercentageAccount['totalAmount'];
    debit: DepositPercentageAccount['debit'];
  } {
    if (Date.now() < startDate.getTime()) {
      return { totalAmount: 0, debit: 0 };
    }
    let debit = 0;
    const daysBeforeNow = Math.floor(
      (Date.now() - startDate.getTime()) /
        MILLISECONDS_PER_SECOND /
        SECONDS_PER_MINUTE /
        MINUTES_PER_HOUR /
        HOUR_PER_DAY
    );
    const daysInMonthBeforeNow = daysBeforeNow % AVERAGE_DAY_PER_MONTH;
    const monthsBeforeNow = Math.floor(daysBeforeNow / AVERAGE_DAY_PER_MONTH);
    const totalAmount =
      monthsBeforeNow * AVERAGE_DAY_PER_MONTH * ((amount * percent) / 100);

    for (let i = 0; i < daysInMonthBeforeNow; ++i) {
      debit += (amount * percent) / 100 / 12 / AVERAGE_DAY_PER_MONTH;
    }

    return { debit, totalAmount };
  }

  private getDepositContractsWithAccounts(): Observable<
    DepositContractWithAccounts[]
  > {
    return this.userApiService.getUsers().pipe(
      switchMap((users) =>
        forkJoin(
          users.map((user) =>
            this.depositApiService.getAllUsersDeposits(user.id)
          )
        )
      ),
      map((deposits) => deposits.flat(1)),
      switchMap((deposits) =>
        forkJoin(
          deposits.map((deposit) =>
            forkJoin({
              accounts: this.depositAccountApiService.getAccounts({
                depositId: deposit.id,
                userId: deposit.userId,
              }),
              depositContract: of(deposit),
            })
          )
        ).pipe(defaultIfEmpty([]))
      ),
      map((data) =>
        data.filter(
          (dataItem) =>
            dataItem.depositContract.endDate > this.currentDate$.value
        )
      )
    );
  }

  private getCreditContractsWithAccounts(): Observable<
    CreditContractWithAccounts[]
  > {
    return this.userApiService.getUsers().pipe(
      switchMap((users) =>
        forkJoin(
          users.map((user) => this.creditApiService.getAllUsersCredits(user.id))
        )
      ),

      map((credits) => credits.flat(1)),
      switchMap((credits) =>
        forkJoin(
          credits.map((credit) =>
            forkJoin({
              accounts: this.creditAccountApiService.getAccounts({
                creditId: credit.id,
                userId: credit.userId,
              }),
              creditContract: of(credit),
            })
          )
        ).pipe(defaultIfEmpty([]))
      ),
      map((data) =>
        data.filter(
          (dataItem) =>
            dataItem.creditContract.endDate > this.currentDate$.value
        )
      )
    );
  }

  private updateCreditContractAccountsData(
    contract: CreditContractWithAccounts
  ): Observable<void> {
    return this.creditAccountApiService.updateCreditContractAccountsData({
      userId: contract.creditContract.userId,
      creditId: contract.creditContract.id,
      creditAccounts: contract.accounts,
    });
  }

  private updateDepositContractAccountsData(
    contract: DepositContractWithAccounts
  ): Observable<void> {
    return this.depositAccountApiService.updateDepositContractAccountsData({
      userId: contract.depositContract.userId,
      depositId: contract.depositContract.id,
      depositAccounts: contract.accounts,
    });
  }

  private increaseCurrentDate(): void {
    const newDate = new Date(this.currentDate$.getValue());
    newDate.setDate(newDate.getDate() + 1);
    this.currentDate$.next(newDate);
  }

  private calculateBankAccountValue(
    deposits: DepositContractWithAccounts[],
    credits: CreditContractWithAccounts[]
  ): void {
    const totalDeposits = deposits.reduce(
      (acc, deposit) => (acc += deposit.accounts.percents.totalAmount),
      0
    );
    const totalCredits = credits.reduce(
      (acc, credit) => (acc += credit.accounts.percents.totalAmount),
      0
    );
    this.totalDebits$.next(totalDeposits);
    this.totalCredits$.next(totalCredits);
    this.bankAccountVal$.next(
      this.initialBankAccountVal + totalDeposits - totalCredits
    );
  }
}
