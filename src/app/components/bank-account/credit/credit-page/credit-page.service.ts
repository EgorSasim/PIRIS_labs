import { ActivatedRoute } from '@angular/router';
import { CreditAccountApiService } from '../../../../api/credit/account/account-api.service';
import { CreditApiService } from '../../../../api/credit/credit-api.service';
import { Injectable } from '@angular/core';
import { CreditSearchParams } from '../../../../api/credit/credit-api.typings';
import { Observable, combineLatest, forkJoin, map, switchMap } from 'rxjs';
import { CreditContract } from '../credit.typings';
import { CreditContractWithAccounts } from './credit-page.typings';

@Injectable()
export class CreditPageService {
  constructor(
    private creditApiService: CreditApiService,
    private activatedRoute: ActivatedRoute,
    private creditAccountApiService: CreditAccountApiService
  ) {}

  private getCredit(
    searchParams: CreditSearchParams
  ): Observable<CreditContract> {
    return this.creditApiService.getCredit(searchParams);
  }

  public handleCreditIdChange(): Observable<CreditContractWithAccounts> {
    return combineLatest({
      creditId: this.activatedRoute.params.pipe(map((params) => params['id'])),
      userId: this.activatedRoute.queryParamMap.pipe(
        map((params) => params.get('userId'))
      ),
    }).pipe(
      switchMap(({ creditId, userId }) =>
        forkJoin({
          creditContract: this.getCredit({ creditId, userId }),
          accounts: this.creditAccountApiService.getAccounts({
            creditId,
            userId,
          }),
        })
      )
    );
  }

  public removeCredit(userId: string, id: string): Observable<void> {
    return this.creditApiService.removeCredit(userId, id);
  }
}
