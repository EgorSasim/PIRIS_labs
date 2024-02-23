import { Injectable } from '@angular/core';
import { Observable, combineLatest, forkJoin, map, switchMap } from 'rxjs';
import { DepositContract } from '../deposit.typings';
import { DepositSearchParams } from '../../../../api/deposit/deposit-api.typings';
import { DepositApiService } from '../../../../api/deposit/deposit-api.service';
import { ActivatedRoute } from '@angular/router';
import { DepositContractWithAccounts } from './deposit-page.typings';
import { DepositAccountApiService } from '../../../../api/deposit/account/account-api.service';

@Injectable()
export class DepositPageService {
  constructor(
    private depositApiService: DepositApiService,
    private activatedRoute: ActivatedRoute,
    private accountApiService: DepositAccountApiService
  ) {}

  private getDeposit(
    searchParams: DepositSearchParams
  ): Observable<DepositContract> {
    return this.depositApiService.getDeposit(searchParams);
  }

  public handleDepositIdChange(): Observable<DepositContractWithAccounts> {
    return combineLatest({
      depositId: this.activatedRoute.params.pipe(map((params) => params['id'])),
      userId: this.activatedRoute.queryParamMap.pipe(
        map((params) => params.get('userId'))
      ),
    }).pipe(
      switchMap(({ depositId, userId }) =>
        forkJoin({
          depositContract: this.getDeposit({ depositId, userId }),
          accounts: this.accountApiService.getAccounts({ depositId, userId }),
        })
      )
    );
  }

  public removeDeposit(userId: string, id: string): Observable<void> {
    return this.depositApiService.removeDeposit(userId, id);
  }
}
