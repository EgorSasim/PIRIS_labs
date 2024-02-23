import { Injectable } from '@angular/core';
import { Observable, combineLatest, forkJoin, map, of, switchMap } from 'rxjs';
import { CreditApiService } from '../../../api/credit/credit-api.service';
import { CreditAccountApiService } from '../../../api/credit/account/account-api.service';

@Injectable()
export class AtmAccountService {
  constructor(
    private creditApiService: CreditApiService,
    private creditAccountApiService: CreditAccountApiService
  ) {}
  public getCurrentBalance(userId: string): Observable<number> {
    return this.creditApiService
      .getAllUsersCredits(userId)
      .pipe(map((credits) => credits[0]?.amount));
  }

  public getMoney(userId, amount): Observable<void> {
    return this.creditApiService
      .getAllUsersCredits(userId)
      .pipe(map((credits) => credits[0].amount))
      .pipe(
        switchMap((creditAmount) =>
          this.setAmount(userId, creditAmount - amount)
        )
      );
  }

  public putMoney(userId, amount): Observable<void> {
    return this.creditApiService
      .getAllUsersCredits(userId)
      .pipe(map((credits) => credits[0].amount))
      .pipe(
        switchMap((creditAmount) =>
          this.setAmount(userId, creditAmount + amount)
        )
      );
  }

  private setAmount(userId: string, amount: number): Observable<void> {
    const credit$ = this.creditApiService
      .getAllUsersCredits(userId)
      .pipe(map((credits) => credits[0]));
    const updateCredit$ = credit$.pipe(
      switchMap((credit) =>
        this.creditApiService.updateCredit(userId, credit.id, {
          ...credit,
          amount,
        })
      )
    );
    const updateCreditAccounts$ = credit$.pipe(
      switchMap((credit) =>
        forkJoin({
          accounts: this.creditAccountApiService.getAccounts({
            userId: userId,
            creditId: credit.id,
          }),
          creditId: of(credit.id),
        })
      ),
      switchMap((data) =>
        this.creditAccountApiService.updateCreditContractAccountsData({
          userId,
          creditId: data.creditId,
          creditAccounts: {
            ...data.accounts,
            main: { ...data.accounts.main, credit: amount },
          },
        })
      )
    );

    return forkJoin([updateCredit$, updateCreditAccounts$]).pipe(
      map((res) => null)
    );
  }
}
