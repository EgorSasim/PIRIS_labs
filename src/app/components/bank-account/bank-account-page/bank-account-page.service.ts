import { Injectable } from '@angular/core';
import { DepositApiService } from '../../../api/deposit/deposit-api.service';
import { Observable, filter, forkJoin, map, of, switchMap } from 'rxjs';
import { DepositContract } from '../deposit/deposit.typings';
import { UserApiService } from '../../../api/user/user-api.service';
import {
  BankCreditAccountInfo,
  BankDepositAccountInfo,
} from '../bank-account-list/bank-account-list.typings';
import { CreditContract } from '../credit/credit.typings';
import { CreditApiService } from '../../../api/credit/credit-api.service';

@Injectable()
export class BankAccountPageService {
  constructor(
    private depositApiService: DepositApiService,
    private creditApiService: CreditApiService,
    private userApiService: UserApiService
  ) {}

  public createDepositContract(
    depositContract: DepositContract
  ): Observable<void> {
    return this.depositApiService.createDepositContract(depositContract);
  }

  public createCreditContract(
    creditContract: CreditContract
  ): Observable<void> {
    return this.creditApiService.createCreditContract(creditContract);
  }

  public getDepositAccountsInfo(): Observable<BankDepositAccountInfo[]> {
    return this.userApiService.getUsers().pipe(
      switchMap((users) =>
        forkJoin(
          users.map((user) =>
            forkJoin({
              depositContracts: this.depositApiService.getAllUsersDeposits(
                user.id
              ),
              userData: of({
                firstName: user.firstName,
                lastName: user.lastName,
                identificationNumber: user.identificationNumber,
                id: user.id,
              }),
            })
          )
        )
      ),
      map((data) =>
        data.filter((dataItem) => dataItem.depositContracts.length)
      ),
      map((data) =>
        data.map((dataItem) => ({
          user: {
            firstName: dataItem.userData.firstName,
            lastName: dataItem.userData.lastName,
            identificationNumber: dataItem.userData.identificationNumber,
            id: dataItem.userData.id,
          },
          depositContracts: dataItem.depositContracts.map((contract) => ({
            serialNumber: contract.serialNumber,
            name: contract.deposit.name,
            id: contract.id,
          })),
        }))
      )
    );
  }

  public getCreditAccountsInfo(): Observable<BankCreditAccountInfo[]> {
    return this.userApiService.getUsers().pipe(
      switchMap((users) =>
        forkJoin(
          users.map((user) =>
            forkJoin({
              creditContracts: this.creditApiService.getAllUsersCredits(
                user.id
              ),
              userData: of({
                firstName: user.firstName,
                lastName: user.lastName,
                identificationNumber: user.identificationNumber,
                id: user.id,
              }),
            })
          )
        )
      ),
      map((data) => data.filter((dataItem) => dataItem.creditContracts.length)),
      map((data) =>
        data.map((dataItem) => ({
          user: {
            firstName: dataItem.userData.firstName,
            lastName: dataItem.userData.lastName,
            identificationNumber: dataItem.userData.identificationNumber,
            id: dataItem.userData.id,
          },
          creditContracts: dataItem.creditContracts.map((contract) => ({
            serialNumber: contract.serialNumber,
            name: contract.credit.name,
            id: contract.id,
          })),
        }))
      )
    );
  }
}
